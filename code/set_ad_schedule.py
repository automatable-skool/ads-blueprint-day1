"""Set a campaign's ad schedule to the hours somebody actually answers - the fix for
overnight clicks going to voicemail.

Replaces the campaign's existing schedule with the one you give. REMEMBER: hours run
in the ACCOUNT's time zone, not the owner's - say both out loud before applying.

Dry run by DEFAULT. Nothing is touched without --apply.

Usage (from the project root):
  python3 code/set_ad_schedule.py --campaign 123                       # show today's schedule
  python3 code/set_ad_schedule.py --campaign 123 --days mon-fri --start 8 --end 18 --apply
  python3 code/set_ad_schedule.py --campaign 123 --days mon,tue,wed,thu,fri,sat --start 7 --end 20 --apply
  python3 code/set_ad_schedule.py --campaign 123 --clear --apply       # run 24/7 again
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402

DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
SHORT = {d[:3].lower(): d for d in DAYS}


def parse_days(spec):
    spec = spec.strip().lower()
    if "-" in spec and "," not in spec:
        a, b = spec.split("-", 1)
        i, j = DAYS.index(SHORT[a]), DAYS.index(SHORT[b])
        return DAYS[i:j + 1]
    return [SHORT[d.strip()] for d in spec.split(",")]


def current(ga, customer_id, campaign_id):
    q = f"""
      SELECT campaign.name, campaign_criterion.resource_name,
             campaign_criterion.ad_schedule.day_of_week,
             campaign_criterion.ad_schedule.start_hour, campaign_criterion.ad_schedule.end_hour
      FROM campaign_criterion
      WHERE campaign.id = {campaign_id} AND campaign_criterion.type = 'AD_SCHEDULE'
        AND campaign_criterion.status != 'REMOVED'
    """
    rows = list(ga.search(customer_id=customer_id, query=q))
    name = rows[0].campaign.name if rows else None
    scheds = [(r.campaign_criterion.ad_schedule.day_of_week.name,
               r.campaign_criterion.ad_schedule.start_hour,
               r.campaign_criterion.ad_schedule.end_hour,
               r.campaign_criterion.resource_name) for r in rows]
    return name, scheds


def account_tz(ga, customer_id):
    for r in ga.search(customer_id=customer_id, query="SELECT customer.time_zone FROM customer"):
        return r.customer.time_zone
    return "?"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campaign", required=True, help="campaign ID")
    ap.add_argument("--days", help="mon-fri or mon,wed,fri")
    ap.add_argument("--start", type=int, help="start hour, 0-23, account time zone")
    ap.add_argument("--end", type=int, help="end hour, 1-24, account time zone")
    ap.add_argument("--clear", action="store_true", help="remove the schedule - campaign runs all hours")
    ap.add_argument("--apply", action="store_true", help="actually change it - default is a dry run")
    a = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    tz = account_tz(ga, customer_id)
    name, scheds = current(ga, customer_id, a.campaign)
    if name is None and not scheds:
        # campaign may still exist with no schedule - fetch the name alone
        for r in ga.search(customer_id=customer_id,
                           query=f"SELECT campaign.name FROM campaign WHERE campaign.id = {a.campaign}"):
            name = r.campaign.name
    if name is None:
        sys.exit(f"Campaign {a.campaign} not found.")

    print(f"{name} · account time zone {tz}")
    print("Schedule today: " + (", ".join(f"{d} {s}-{e}" for d, s, e, _ in scheds) if scheds else "all hours, all days"))

    if not (a.clear or (a.days and a.start is not None and a.end is not None)):
        print("\nReport only. Give --days/--start/--end or --clear (plus --apply) to change it.")
        return
    if not a.clear and not (0 <= a.start < a.end <= 24):
        sys.exit("Hours must satisfy 0 <= start < end <= 24.")

    new = [] if a.clear else [(d, a.start, a.end) for d in parse_days(a.days)]
    print("Would become:  " + (", ".join(f"{d} {s}-{e}" for d, s, e in new) if new else "all hours, all days")
          + f"  (hours are {tz} time)")
    if not a.apply:
        print("\nDry run - re-run with --apply.")
        return

    svc = client.get_service("CampaignCriterionService")
    ops = []
    for _, _, _, rn in scheds:
        op = client.get_type("CampaignCriterionOperation")
        op.remove = rn
        ops.append(op)
    for d, s, e in new:
        op = client.get_type("CampaignCriterionOperation")
        op.create.campaign = f"customers/{customer_id}/campaigns/{a.campaign}"
        sched = op.create.ad_schedule
        sched.day_of_week = client.enums.DayOfWeekEnum[d]
        sched.start_hour = s
        sched.end_hour = e
        sched.start_minute = client.enums.MinuteOfHourEnum.ZERO
        sched.end_minute = client.enums.MinuteOfHourEnum.ZERO
        ops.append(op)
    try:
        svc.mutate_campaign_criteria(customer_id=customer_id, operations=ops)
    except GoogleAdsException as e:
        sys.exit(f"API refused: {e.failure.errors[0].message}")
    print(f"\nDone. https://ads.google.com/aw/settings?campaignId={a.campaign}&__c={customer_id}")


if __name__ == "__main__":
    main()
