"""Fix a campaign's location settings: switch to Presence-only targeting (the rule for
every local service business) and show what is targeted and excluded today. Pair with
exclude_other_countries.py for the country exclusion list.

Dry run by DEFAULT. Nothing is touched without --apply.

Do NOT flip a hotel, tour or destination business to Presence - their buyers search
from elsewhere on purpose. Ask before applying if the business model is unclear.

Usage (from the project root):
  python3 code/set_locations.py                          # report every enabled campaign
  python3 code/set_locations.py --campaign 123 --presence --apply
  python3 code/set_locations.py --all --presence --apply
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402


def campaigns(ga, customer_id, only=None):
    q = """
      SELECT campaign.id, campaign.name, campaign.status,
             campaign.geo_target_type_setting.positive_geo_target_type
      FROM campaign WHERE campaign.status != 'REMOVED'
    """
    rows = []
    for r in ga.search(customer_id=customer_id, query=q):
        cid = str(r.campaign.id)
        if only and cid not in only:
            continue
        rows.append((cid, r.campaign.name, r.campaign.status.name,
                     r.campaign.geo_target_type_setting.positive_geo_target_type.name))
    return rows


def locations(ga, customer_id, campaign_id):
    q = f"""
      SELECT campaign_criterion.location.geo_target_constant, campaign_criterion.negative
      FROM campaign_criterion
      WHERE campaign.id = {campaign_id} AND campaign_criterion.type = 'LOCATION'
        AND campaign_criterion.status != 'REMOVED'
    """
    pos, neg = 0, 0
    for r in ga.search(customer_id=customer_id, query=q):
        if r.campaign_criterion.negative:
            neg += 1
        else:
            pos += 1
    return pos, neg


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campaign", action="append", default=[], help="campaign ID (repeatable)")
    ap.add_argument("--all", action="store_true", help="every enabled campaign")
    ap.add_argument("--presence", action="store_true", help="set positive geo targeting to PRESENCE")
    ap.add_argument("--apply", action="store_true", help="actually change it - default is a dry run")
    a = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")

    rows = campaigns(ga, customer_id, set(a.campaign) if a.campaign else None)
    if a.all:
        rows = [r for r in rows if r[2] == "ENABLED"]
    if not rows:
        sys.exit("No matching campaigns.")

    todo = []
    for cid, name, status, geo in rows:
        pos, neg = locations(ga, customer_id, cid)
        flag = "" if geo == "PRESENCE" else "  <- presence-or-interest"
        print(f"- {name} ({status}) · geo type {geo}{flag} · {pos} targeted location(s) · {neg} excluded")
        if a.presence and geo != "PRESENCE" and (a.all or cid in set(a.campaign)):
            todo.append((cid, name))

    if not a.presence:
        print("\nReport only. Add --presence (with --campaign/--all and --apply) to fix the geo type.")
        return
    if not todo:
        print("\nEverything selected is already Presence-only.")
        return
    for cid, name in todo:
        print(f"{'SET PRESENCE' if a.apply else 'would set PRESENCE'} · {name}")
    if not a.apply:
        print(f"\nDry run - {len(todo)} campaign(s). Re-run with --apply.")
        return

    svc = client.get_service("CampaignService")
    ops = []
    for cid, _ in todo:
        op = client.get_type("CampaignOperation")
        op.update.resource_name = f"customers/{customer_id}/campaigns/{cid}"
        op.update.geo_target_type_setting.positive_geo_target_type = \
            client.enums.PositiveGeoTargetTypeEnum.PRESENCE
        op.update_mask.paths.append("geo_target_type_setting.positive_geo_target_type")
        ops.append(op)
    try:
        svc.mutate_campaigns(customer_id=customer_id, operations=ops)
    except GoogleAdsException as e:
        sys.exit(f"API refused: {e.failure.errors[0].message}")
    print(f"\nDone: {len(ops)} campaign(s) now Presence-only. "
          f"Country exclusions: python3 code/exclude_other_countries.py --keep <CC>")


if __name__ == "__main__":
    main()
