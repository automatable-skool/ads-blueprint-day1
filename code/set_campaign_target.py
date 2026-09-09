"""Set, change or clear the optional cost-per-lead target on a Maximise Conversions
campaign - the fix for a target nobody can explain (the Montreal $93 class).

Dry run by DEFAULT: shows the campaign's bidding today and what it would become.
Nothing is touched without --apply. Reversible in one run.

Usage (from the project root):
  python3 code/set_campaign_target.py                          # report every campaign's bidding
  python3 code/set_campaign_target.py --campaign 123 --target 43 --apply
  python3 code/set_campaign_target.py --campaign 123 --clear --apply
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402


def bidding_report(ga, customer_id):
    q = """
      SELECT campaign.id, campaign.name, campaign.status, campaign.bidding_strategy_type,
             campaign.maximize_conversions.target_cpa_micros,
             campaign.target_cpa.target_cpa_micros
      FROM campaign WHERE campaign.status != 'REMOVED'
      ORDER BY campaign.status
    """
    rows = []
    for r in ga.search(customer_id=customer_id, query=q):
        t = r.campaign.maximize_conversions.target_cpa_micros or r.campaign.target_cpa.target_cpa_micros
        rows.append((str(r.campaign.id), r.campaign.name, r.campaign.status.name,
                     r.campaign.bidding_strategy_type.name, t / 1e6 if t else None))
    return rows


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campaign", help="campaign ID to change")
    ap.add_argument("--target", type=float, help="new cost-per-lead target in account currency")
    ap.add_argument("--clear", action="store_true", help="remove the optional target entirely")
    ap.add_argument("--apply", action="store_true", help="actually change it - default is a dry run")
    a = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    rows = bidding_report(ga, customer_id)

    if not a.campaign:
        for cid, name, status, strat, tgt in rows:
            t = f"target ${tgt:,.2f}" if tgt else "no target"
            print(f"- {name} ({status}) · {strat} · {t}")
        print("\nReport only. Give --campaign with --target or --clear to change one.")
        return

    row = next((r for r in rows if r[0] == a.campaign), None)
    if not row:
        sys.exit(f"Campaign {a.campaign} not found.")
    cid, name, status, strat, tgt = row
    if strat != "MAXIMIZE_CONVERSIONS":
        sys.exit(f"{name} runs {strat} - this script only edits the Maximise Conversions optional target.")
    if a.clear == bool(a.target):
        sys.exit("Give exactly one of --target or --clear.")

    now = f"${tgt:,.2f}" if tgt else "none"
    new = "none" if a.clear else f"${a.target:,.2f}"
    print(f"{name} ({status}) · target today: {now} · would become: {new}")
    if not a.apply:
        print("\nDry run - re-run with --apply to change it.")
        return

    svc = client.get_service("CampaignService")
    op = client.get_type("CampaignOperation")
    op.update.resource_name = f"customers/{customer_id}/campaigns/{cid}"
    op.update.maximize_conversions.target_cpa_micros = 0 if a.clear else int(round(a.target * 1e6))
    op.update_mask.paths.append("maximize_conversions.target_cpa_micros")
    try:
        svc.mutate_campaigns(customer_id=customer_id, operations=[op])
    except GoogleAdsException as e:
        sys.exit(f"API refused: {e.failure.errors[0].message}")
    print(f"\nDone: target is now {new}.")
    print(f"  https://ads.google.com/aw/settings?campaignId={cid}&__c={customer_id}")


if __name__ == "__main__":
    main()
