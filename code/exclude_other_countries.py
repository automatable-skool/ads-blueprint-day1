"""Exclude every country except yours from a campaign (Jono's rule for local and national businesses).

Adds one negative location criterion per country, skipping the country you keep.
Presence-only targeting already limits who sees the ads; this closes the gaps it
leaves (VPNs, bots, mis-located traffic) so the campaign can never serve abroad.
Idempotent: countries already excluded are skipped, so re-running is safe.

Usage (from the project root, so .env resolves):
  python3 code/exclude_other_countries.py --campaign 1234567890 --keep CA
  python3 code/exclude_other_countries.py --campaign 1234567890 --keep US --dry-run
  python3 code/exclude_other_countries.py --all-search --keep GB   # every enabled Search campaign

--keep is the two-letter country code of the market in context/business.md.
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from _business import country as home_country  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402


def all_countries(ga, customer_id):
    q = """
      SELECT geo_target_constant.id, geo_target_constant.name, geo_target_constant.country_code
      FROM geo_target_constant
      WHERE geo_target_constant.target_type = 'Country' AND geo_target_constant.status = 'ENABLED'
    """
    out = {}
    for r in ga.search(customer_id=customer_id, query=q):
        g = r.geo_target_constant
        out[f"geoTargetConstants/{g.id}"] = (g.name, g.country_code)
    return out


def already_excluded(ga, customer_id, campaign_id):
    q = f"""
      SELECT campaign_criterion.location.geo_target_constant
      FROM campaign_criterion
      WHERE campaign.id = {campaign_id} AND campaign_criterion.type = 'LOCATION'
        AND campaign_criterion.negative = TRUE AND campaign_criterion.status != 'REMOVED'
    """
    return {r.campaign_criterion.location.geo_target_constant for r in ga.search(customer_id=customer_id, query=q)}


def search_campaigns(ga, customer_id):
    q = """
      SELECT campaign.id, campaign.name FROM campaign
      WHERE campaign.advertising_channel_type = 'SEARCH' AND campaign.status != 'REMOVED'
    """
    return [(str(r.campaign.id), r.campaign.name) for r in ga.search(customer_id=customer_id, query=q)]


def exclude(client, ga, customer_id, campaign_id, keep_code, countries, dry_run):
    keep = [res for res, (_, code) in countries.items() if code.upper() == keep_code]
    if not keep:
        sys.exit(f"no country with code {keep_code!r} found - use the two-letter code, e.g. CA, US, GB, AU")
    have = already_excluded(ga, customer_id, campaign_id)
    todo = [res for res in countries if res not in keep and res not in have]
    print(f"campaign {campaign_id}: keep {countries[keep[0]][0]} · {len(have)} already excluded · {len(todo)} to add")
    if dry_run or not todo:
        return 0
    svc = client.get_service("CampaignCriterionService")
    req = client.get_type("MutateCampaignCriteriaRequest")
    req.customer_id = customer_id
    req.partial_failure = True
    for res in todo:
        op = client.get_type("CampaignCriterionOperation")
        c = op.create
        c.campaign = ga.campaign_path(customer_id, campaign_id)
        c.negative = True
        c.location.geo_target_constant = res
        req.operations.append(op)
    resp = svc.mutate_campaign_criteria(request=req)
    added = sum(1 for r in resp.results if r.resource_name)
    if resp.partial_failure_error and resp.partial_failure_error.code:
        print(f"  partial failures: {resp.partial_failure_error.message}")
    print(f"  excluded {added} countries")
    return added


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campaign", help="numeric campaign ID")
    ap.add_argument("--all-search", action="store_true", help="every non-removed Search campaign in the account")
    ap.add_argument("--keep", default=None, help="two-letter country code to keep, e.g. CA. Default: the country in context/business.md")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    if not args.campaign and not args.all_search:
        sys.exit("give --campaign <id> or --all-search")
    args.keep = (args.keep or home_country() or "").upper()
    if not args.keep:
        sys.exit("no country to keep - set it in context/business.md (Country customers search from) or pass --keep XX")

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    countries = all_countries(ga, customer_id)
    print(f"{len(countries)} countries known to Google")
    targets = search_campaigns(ga, customer_id) if args.all_search else [(args.campaign.replace("-", ""), "")]
    total = 0
    for cid, name in targets:
        if name:
            print(f"\n{name}")
        total += exclude(client, ga, customer_id, cid, args.keep.upper(), countries, args.dry_run)
    print("\ndry run - nothing pushed" if args.dry_run else f"\ndone - {total} exclusions added across {len(targets)} campaign(s)")


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"Google Ads API error (request_id {e.request_id}):", file=sys.stderr)
        for err in e.failure.errors:
            print(f"  - {err.error_code}: {err.message}", file=sys.stderr)
        sys.exit(1)
