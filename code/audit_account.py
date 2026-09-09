"""
Audit a Google Ads account and surface top issues ranked by estimated $ recoverable.

Usage:
  python3 audit_account.py --customer <10-digit-customer-id> --days 30
"""
import argparse
import os
import pathlib
import sys
from collections import defaultdict
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

ROOT = pathlib.Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")


def get_client(login_cid: str) -> GoogleAdsClient:
    config = {
        "developer_token": os.environ["GOOGLE_ADS_DEVELOPER_TOKEN"],
        "client_id":       os.environ["GOOGLE_ADS_CLIENT_ID"],
        "client_secret":   os.environ["GOOGLE_ADS_CLIENT_SECRET"],
        "refresh_token":   os.environ["GOOGLE_ADS_REFRESH_TOKEN"],
        "login_customer_id": login_cid,
        "use_proto_plus": True,
    }
    return GoogleAdsClient.load_from_dict(config)


def micros(v):
    return (v or 0) / 1_000_000


def search(client, cid, query):
    svc = client.get_service("GoogleAdsService")
    return list(svc.search(customer_id=cid, query=query))


def audit_wasted_search_terms(client, cid, days):
    """Search terms with high cost and zero conversions."""
    query = f"""
      SELECT
        search_term_view.search_term,
        metrics.cost_micros,
        metrics.conversions,
        metrics.clicks,
        campaign.name,
        ad_group.name
      FROM search_term_view
      WHERE segments.date DURING LAST_{days}_DAYS
        AND metrics.cost_micros > 0
        AND metrics.conversions = 0
      ORDER BY metrics.cost_micros DESC
      LIMIT 20
    """
    rows = search(client, cid, query)
    findings = []
    for r in rows:
        cost = micros(r.metrics.cost_micros)
        if cost >= 5:  # only flag $5+ wasted
            findings.append({
                "term": r.search_term_view.search_term,
                "wasted": cost,
                "clicks": r.metrics.clicks,
                "campaign": r.campaign.name,
                "ad_group": r.ad_group.name,
            })
    return findings


def audit_low_quality_keywords(client, cid):
    """Keywords with quality score <= 4."""
    query = """
      SELECT
        ad_group_criterion.keyword.text,
        ad_group_criterion.quality_info.quality_score,
        campaign.name,
        ad_group.name,
        ad_group_criterion.status
      FROM keyword_view
      WHERE ad_group_criterion.quality_info.quality_score <= 4
        AND ad_group_criterion.status = 'ENABLED'
      ORDER BY ad_group_criterion.quality_info.quality_score ASC
      LIMIT 20
    """
    try:
        rows = search(client, cid, query)
    except Exception as e:
        return [{"error": str(e)[:100]}]
    findings = []
    for r in rows:
        findings.append({
            "keyword": r.ad_group_criterion.keyword.text,
            "qs": r.ad_group_criterion.quality_info.quality_score,
            "campaign": r.campaign.name,
            "ad_group": r.ad_group.name,
        })
    return findings


def audit_disapproved_ads(client, cid):
    """Disapproved or limited ads."""
    query = """
      SELECT
        ad_group_ad.ad.id,
        ad_group_ad.policy_summary.approval_status,
        ad_group_ad.policy_summary.review_status,
        ad_group_ad.ad.responsive_search_ad.headlines,
        campaign.name,
        ad_group.name
      FROM ad_group_ad
      WHERE ad_group_ad.policy_summary.approval_status IN ('DISAPPROVED','APPROVED_LIMITED','SITE_SUSPENDED')
        AND ad_group_ad.status != 'REMOVED'
      LIMIT 20
    """
    try:
        rows = search(client, cid, query)
    except Exception as e:
        return [{"error": str(e)[:100]}]
    findings = []
    for r in rows:
        headlines = [h.text for h in r.ad_group_ad.ad.responsive_search_ad.headlines[:2]]
        findings.append({
            "ad_id": r.ad_group_ad.ad.id,
            "status": r.ad_group_ad.policy_summary.approval_status.name,
            "campaign": r.campaign.name,
            "ad_group": r.ad_group.name,
            "first_headlines": headlines,
        })
    return findings


def audit_campaign_settings(client, cid):
    """Campaigns violating the 'never on' defaults: search partners, display network."""
    query = """
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        campaign.advertising_channel_type,
        campaign.network_settings.target_search_network,
        campaign.network_settings.target_content_network,
        campaign.network_settings.target_partner_search_network,
        campaign.network_settings.target_google_search
      FROM campaign
      WHERE campaign.status = 'ENABLED'
        AND campaign.advertising_channel_type = 'SEARCH'
    """
    rows = search(client, cid, query)
    findings = []
    for r in rows:
        violations = []
        ns = r.campaign.network_settings
        if ns.target_search_network:
            violations.append("Search Partners ON")
        if ns.target_content_network:
            violations.append("Display Network ON")
        if violations:
            findings.append({
                "campaign": r.campaign.name,
                "violations": violations,
            })
    return findings


def audit_low_impression_share(client, cid, days):
    """Ad groups losing impression share to budget or rank."""
    query = f"""
      SELECT
        campaign.name,
        ad_group.name,
        metrics.search_impression_share,
        metrics.search_budget_lost_impression_share,
        metrics.search_rank_lost_impression_share,
        metrics.cost_micros
      FROM ad_group
      WHERE segments.date DURING LAST_{days}_DAYS
        AND metrics.cost_micros > 0
      ORDER BY metrics.cost_micros DESC
      LIMIT 30
    """
    try:
        rows = search(client, cid, query)
    except Exception as e:
        return [{"error": str(e)[:100]}]
    findings = []
    for r in rows:
        lost_budget = r.metrics.search_budget_lost_impression_share or 0
        lost_rank = r.metrics.search_rank_lost_impression_share or 0
        if lost_budget > 0.10 or lost_rank > 0.20:
            findings.append({
                "campaign": r.campaign.name,
                "ad_group": r.ad_group.name,
                "lost_to_budget": f"{lost_budget*100:.0f}%",
                "lost_to_rank": f"{lost_rank*100:.0f}%",
                "cost": micros(r.metrics.cost_micros),
            })
    return findings


def audit_asset_coverage(client, cid):
    """Campaigns with no sitelinks or no callouts."""
    query = """
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        campaign.advertising_channel_type
      FROM campaign
      WHERE campaign.status = 'ENABLED'
        AND campaign.advertising_channel_type = 'SEARCH'
    """
    campaigns = search(client, cid, query)

    # Query attached assets per campaign
    asset_query = """
      SELECT
        campaign.id,
        campaign.name,
        campaign_asset.field_type
      FROM campaign_asset
      WHERE campaign.status = 'ENABLED'
    """
    try:
        asset_rows = search(client, cid, asset_query)
    except Exception:
        return []

    campaign_assets = defaultdict(set)
    for r in asset_rows:
        campaign_assets[r.campaign.id].add(r.campaign_asset.field_type.name)

    findings = []
    for c in campaigns:
        types = campaign_assets.get(c.campaign.id, set())
        missing = []
        if "SITELINK" not in types:
            missing.append("sitelinks")
        if "CALLOUT" not in types:
            missing.append("callouts")
        if "STRUCTURED_SNIPPET" not in types:
            missing.append("snippets")
        if missing:
            findings.append({
                "campaign": c.campaign.name,
                "missing": missing,
            })
    return findings


def print_section(title, findings, formatter):
    print(f"\n{'='*80}\n{title}\n{'='*80}")
    if not findings:
        print("  (none)")
        return
    if findings and isinstance(findings[0], dict) and findings[0].get("error"):
        print(f"  ⚠ Query error: {findings[0]['error']}")
        return
    for i, f in enumerate(findings[:10], 1):
        print(f"  {i}. {formatter(f)}")


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--customer", required=True, help="10-digit customer ID")
    p.add_argument("--days", type=int, default=30)
    args = p.parse_args()

    cid = args.customer.replace("-", "")
    mcc = os.environ["GOOGLE_ADS_LOGIN_CUSTOMER_ID"].replace("-", "")
    client = get_client(mcc)

    print(f"\n🔍 AUDITING CUSTOMER {cid} · LAST {args.days} DAYS\n")

    # 1. Wasted search terms
    print_section(
        "1 · WASTED SEARCH TERMS (high cost, zero conversions)",
        audit_wasted_search_terms(client, cid, args.days),
        lambda f: f'${f["wasted"]:>6.2f} · "{f["term"]}" · {f["clicks"]} clicks · {f["campaign"]}'
    )

    # 2. Campaign settings violations
    print_section(
        "2 · CAMPAIGN SETTINGS · violating defaults",
        audit_campaign_settings(client, cid),
        lambda f: f'{f["campaign"]} → {", ".join(f["violations"])}'
    )

    # 3. Low quality score keywords
    print_section(
        "3 · LOW QUALITY SCORE KEYWORDS (≤4)",
        audit_low_quality_keywords(client, cid),
        lambda f: f'QS {f["qs"]} · "{f["keyword"]}" · {f["ad_group"]}' if "error" not in f else f["error"]
    )

    # 4. Disapproved ads
    print_section(
        "4 · DISAPPROVED OR LIMITED ADS",
        audit_disapproved_ads(client, cid),
        lambda f: f'{f["status"]} · ad {f["ad_id"]} · {f["campaign"]} / {f["ad_group"]}' if "error" not in f else f["error"]
    )

    # 5. Impression share losses
    print_section(
        "5 · LOST IMPRESSION SHARE (>10% to budget, >20% to rank)",
        audit_low_impression_share(client, cid, args.days),
        lambda f: f'${f["cost"]:>7.2f} · {f["ad_group"]} · budget {f["lost_to_budget"]} · rank {f["lost_to_rank"]}'
    )

    # 6. Asset coverage gaps
    print_section(
        "6 · MISSING ASSETS (sitelinks, callouts, snippets)",
        audit_asset_coverage(client, cid),
        lambda f: f'{f["campaign"]} → missing: {", ".join(f["missing"])}'
    )

    print(f"\n{'='*80}\n  Audit complete.\n{'='*80}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
