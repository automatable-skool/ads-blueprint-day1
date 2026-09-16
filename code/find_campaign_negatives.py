"""
Find negative keyword candidates for a specific campaign.

Filters search terms by:
  - minimum impressions (statistical floor — default 100)
  - minimum cost (waste floor — default $10)
  - either zero conversions OR cost-per-conv ≥ 2× campaign average

Output: JSON list ranked by waste, ready for SOP intent check.

Usage:
  python3 find_campaign_negatives.py --customer <customer-id> --campaign <campaign-id> --days 30
"""
import argparse
import json
import os
import pathlib
import sys
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

ROOT = pathlib.Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")


def get_client() -> GoogleAdsClient:
    config = {
        "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
        "client_id": os.environ["GOOGLE_ADS_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_ADS_CLIENT_SECRET"],
        "refresh_token": os.environ["GOOGLE_ADS_REFRESH_TOKEN"],
        "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") or None,
        "use_proto_plus": True,
    }
    return GoogleAdsClient.load_from_dict(config)


def micros(v):
    return (v or 0) / 1_000_000


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--customer", required=True)
    p.add_argument("--campaign", required=True, help="numeric campaign ID")
    p.add_argument("--days", type=int, default=30)
    p.add_argument("--min-impressions", type=int, default=100)
    p.add_argument("--min-cost", type=float, default=10.0)
    p.add_argument("--limit", type=int, default=20)
    args = p.parse_args()

    cid = args.customer.replace("-", "")
    client = get_client()
    svc = client.get_service("GoogleAdsService")

    # First: get campaign-wide average cost-per-conv (the bar candidates must clear)
    avg_query = f"""
      SELECT
        metrics.cost_micros,
        metrics.conversions
      FROM campaign
      WHERE campaign.id = {args.campaign}
        AND segments.date DURING LAST_{args.days}_DAYS
    """
    avg_cpa = 0.0
    for r in svc.search(customer_id=cid, query=avg_query):
        c = micros(r.metrics.cost_micros)
        n = r.metrics.conversions
        if n > 0:
            avg_cpa = c / n
        break

    bar = avg_cpa * 2 if avg_cpa > 0 else 0
    print(f"# Campaign {args.campaign} avg CPA: ${avg_cpa:.2f} · candidate bar: ${bar:.2f}", file=sys.stderr)

    # Pull search terms
    query = f"""
      SELECT
        search_term_view.search_term,
        metrics.cost_micros,
        metrics.conversions,
        metrics.clicks,
        metrics.impressions,
        ad_group.name
      FROM search_term_view
      WHERE campaign.id = {args.campaign}
        AND segments.date DURING LAST_{args.days}_DAYS
        AND metrics.impressions >= {args.min_impressions}
      ORDER BY metrics.cost_micros DESC
      LIMIT 50
    """

    candidates = []
    for r in svc.search(customer_id=cid, query=query):
        cost = micros(r.metrics.cost_micros)
        convs = r.metrics.conversions
        clicks = r.metrics.clicks
        imps = r.metrics.impressions

        # Filter: either zero conversions OR very expensive per conv
        is_wasteful = (convs == 0 and cost >= args.min_cost) or (
            convs > 0 and cost >= bar > 0 and cost >= args.min_cost
        )
        if not is_wasteful:
            continue

        ctr = (clicks / imps) if imps else 0
        candidates.append({
            "term": r.search_term_view.search_term,
            "wasted": round(cost, 2),
            "impressions": imps,
            "clicks": clicks,
            "conversions": round(convs, 1),
            "ctr_pct": round(ctr * 100, 2),
            "ad_group": r.ad_group.name,
        })

    candidates.sort(key=lambda x: x["wasted"], reverse=True)
    candidates = candidates[: args.limit]

    print(json.dumps({
        "campaign_id": args.campaign,
        "days": args.days,
        "avg_cpa": round(avg_cpa, 2),
        "candidate_count": len(candidates),
        "candidates": candidates,
    }, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
