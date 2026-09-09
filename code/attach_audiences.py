"""Attach remarketing lists to campaigns in OBSERVATION mode - reporting only, no bid
change, no targeting change. The fix for big audience lists attached to nothing.

Two things happen per campaign, both required for observation to mean observation:
1. The campaign's audience target restriction is set to bid_only (observation).
2. Each user list is added as a campaign criterion.

Dry run by DEFAULT. Nothing is touched without --apply.

Usage (from the project root):
  python3 code/attach_audiences.py                       # report lists + what is attached where
  python3 code/attach_audiences.py --campaign 123 --list 456 --apply
  python3 code/attach_audiences.py --campaign 123 --all-eligible --apply   # every list over 1,000 members
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402

MIN_SEARCH_SIZE = 1000  # Google will not serve a Search list under ~1,000 members


def user_lists(ga, customer_id):
    q = """
      SELECT user_list.id, user_list.name, user_list.size_for_search
      FROM user_list WHERE user_list.membership_status = 'OPEN'
    """
    return [(str(r.user_list.id), r.user_list.name, int(r.user_list.size_for_search))
            for r in ga.search(customer_id=customer_id, query=q)]


def attached(ga, customer_id):
    q = """
      SELECT campaign.id, campaign_criterion.user_list.user_list
      FROM campaign_criterion
      WHERE campaign_criterion.type = 'USER_LIST' AND campaign_criterion.status != 'REMOVED'
    """
    have = set()
    for r in ga.search(customer_id=customer_id, query=q):
        have.add((str(r.campaign.id), r.campaign_criterion.user_list.user_list))
    return have


def enabled_campaigns(ga, customer_id, include_paused=False):
    # include_paused only when campaigns are named explicitly - a pre-launch build is
    # PAUSED on purpose, and an observation attach there is safe. The no-argument
    # default stays enabled-only so the legacy paused fleet is never touched.
    statuses = "('ENABLED', 'PAUSED')" if include_paused else "('ENABLED')"
    q = f"""
      SELECT campaign.id, campaign.name, campaign.audience_setting.use_audience_grouped
      FROM campaign
      WHERE campaign.status IN {statuses} AND campaign.advertising_channel_type = 'SEARCH'
    """
    return [(str(r.campaign.id), r.campaign.name) for r in ga.search(customer_id=customer_id, query=q)]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campaign", action="append", default=[], help="campaign ID (repeatable; default: every enabled Search campaign)")
    ap.add_argument("--list", dest="lists", action="append", default=[], help="user list ID to attach (repeatable)")
    ap.add_argument("--all-eligible", action="store_true", help=f"attach every open list with {MIN_SEARCH_SIZE}+ Search members")
    ap.add_argument("--apply", action="store_true", help="actually attach - default is a dry run")
    a = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")

    lists = user_lists(ga, customer_id)
    camps = enabled_campaigns(ga, customer_id, include_paused=bool(a.campaign))
    if a.campaign:
        camps = [c for c in camps if c[0] in set(a.campaign)]
    have = attached(ga, customer_id)

    print("Lists on the account:")
    for lid, name, size in sorted(lists, key=lambda x: -x[2]):
        n = sum(1 for c, rn in have if rn.endswith(f"/{lid}"))
        ok = "eligible" if size >= MIN_SEARCH_SIZE else f"too small for Search ({size})"
        print(f"- {name} · {size:,} members · attached to {n} campaign(s) · {ok}")

    picks = [l for l in lists if l[0] in set(a.lists)] if a.lists else \
            ([l for l in lists if l[2] >= MIN_SEARCH_SIZE] if a.all_eligible else [])
    if not picks:
        print("\nReport only. Use --list or --all-eligible (plus --apply) to attach.")
        return

    todo = []
    for cid, cname in camps:
        for lid, lname, _ in picks:
            rn = f"customers/{customer_id}/userLists/{lid}"
            if (cid, rn) not in have:
                todo.append((cid, cname, lid, lname, rn))
    for cid, cname, lid, lname, _ in todo:
        print(f"{'ATTACH' if a.apply else 'would attach'} · \"{lname}\" -> {cname} · observation only")
    if not todo:
        print("\nEverything picked is already attached.")
        return
    if not a.apply:
        print(f"\nDry run - {len(todo)} attachment(s) staged. Re-run with --apply.")
        return

    camp_svc = client.get_service("CampaignService")
    crit_svc = client.get_service("CampaignCriterionService")
    done_restriction = set()
    try:
        for cid in {t[0] for t in todo}:
            # observation, not targeting: the audience target restriction must be bid_only
            op = client.get_type("CampaignOperation")
            op.update.resource_name = f"customers/{customer_id}/campaigns/{cid}"
            r = client.get_type("TargetRestriction")
            r.targeting_dimension = client.enums.TargetingDimensionEnum.AUDIENCE
            r.bid_only = True
            op.update.targeting_setting.target_restrictions.append(r)
            op.update_mask.paths.append("targeting_setting.target_restrictions")
            camp_svc.mutate_campaigns(customer_id=customer_id, operations=[op])
            done_restriction.add(cid)
        ops = []
        for cid, _, _, _, rn in todo:
            op = client.get_type("CampaignCriterionOperation")
            op.create.campaign = f"customers/{customer_id}/campaigns/{cid}"
            op.create.user_list.user_list = rn
            ops.append(op)
        crit_svc.mutate_campaign_criteria(customer_id=customer_id, operations=ops)
    except GoogleAdsException as e:
        sys.exit(f"API refused: {e.failure.errors[0].message}"
                 + (f" (observation flag already set on {len(done_restriction)} campaign(s), safe to re-run)" if done_restriction else ""))
    print(f"\nAttached {len(todo)} list-campaign pair(s), observation mode. No bids changed.")
    for cid in {t[0] for t in todo}:
        print(f"  https://ads.google.com/aw/audiences?campaignId={cid}&__c={customer_id}")


if __name__ == "__main__":
    main()
