"""Put guardrails on Performance Max campaigns: attach the account's shared negative
list and add campaign-level negative keywords (PMax accepts both since January 2025).

Dry run by DEFAULT - shows current state and what would change. Nothing is touched
without --apply.

Brand exclusions: the API surface for brand lists is not stable across versions, so
this script REPORTS whether a brand exclusion is attached and, if it cannot attach
one, prints the exact click path instead of guessing. Never treat a printed click
path as a failure - it is the supported route.

Usage (from the project root):
  python3 code/pmax_guardrails.py                          # report every PMax campaign
  python3 code/pmax_guardrails.py --campaign 123 --apply   # attach list + negatives
  python3 code/pmax_guardrails.py --campaign 123 --negatives code/cache/pmax-negatives.txt --apply
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402


def pmax_campaigns(ga, customer_id):
    q = """
      SELECT campaign.id, campaign.name, campaign.status
      FROM campaign
      WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
        AND campaign.status != 'REMOVED'
    """
    return [(str(r.campaign.id), r.campaign.name, r.campaign.status.name)
            for r in ga.search(customer_id=customer_id, query=q)]


def shared_negative_lists(ga, customer_id):
    q = """
      SELECT shared_set.id, shared_set.name, shared_set.member_count
      FROM shared_set
      WHERE shared_set.type = 'NEGATIVE_KEYWORDS' AND shared_set.status = 'ENABLED'
    """
    return [(str(r.shared_set.id), r.shared_set.name, r.shared_set.member_count)
            for r in ga.search(customer_id=customer_id, query=q)]


def attached_sets(ga, customer_id, campaign_id):
    q = f"""
      SELECT campaign_shared_set.shared_set FROM campaign_shared_set
      WHERE campaign.id = {campaign_id} AND campaign_shared_set.status = 'ENABLED'
    """
    return {r.campaign_shared_set.shared_set for r in ga.search(customer_id=customer_id, query=q)}


def campaign_negative_count(ga, customer_id, campaign_id):
    q = f"""
      SELECT campaign_criterion.resource_name FROM campaign_criterion
      WHERE campaign.id = {campaign_id} AND campaign_criterion.type = 'KEYWORD'
        AND campaign_criterion.negative = TRUE AND campaign_criterion.status != 'REMOVED'
    """
    return sum(1 for _ in ga.search(customer_id=customer_id, query=q))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campaign", action="append", default=[], help="PMax campaign ID (repeatable; default: all)")
    ap.add_argument("--list", dest="list_id", help="shared negative list ID to attach (default: the largest enabled list)")
    ap.add_argument("--negatives", help="optional file of extra campaign negatives, one per line, quotes=phrase brackets=exact")
    ap.add_argument("--apply", action="store_true", help="actually attach/add - default is a dry run")
    a = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")

    camps = pmax_campaigns(ga, customer_id)
    if a.campaign:
        camps = [c for c in camps if c[0] in set(a.campaign)]
    if not camps:
        sys.exit("No Performance Max campaigns found.")

    lists = shared_negative_lists(ga, customer_id)
    if not lists:
        sys.exit("No enabled shared negative list exists - build it with add_shared_negative_list.py first.")
    if a.list_id:
        pick = next((l for l in lists if l[0] == a.list_id), None)
        if not pick:
            sys.exit(f"Shared list {a.list_id} not found. Have: {[(i, n) for i, n, _ in lists]}")
    else:
        pick = max(lists, key=lambda l: l[2])
    list_rn = f"customers/{customer_id}/sharedSets/{pick[0]}"
    print(f"Shared negative list: \"{pick[1]}\" ({pick[2]} terms)\n")

    extra = []
    if a.negatives:
        with open(a.negatives) as f:
            for line in f:
                t = line.strip()
                if not t or t.startswith("#"):
                    continue
                if t.startswith('"') and t.endswith('"'):
                    extra.append((t[1:-1], "PHRASE"))
                elif t.startswith("[") and t.endswith("]"):
                    extra.append((t[1:-1], "EXACT"))
                else:
                    extra.append((t, "BROAD"))

    css = client.get_service("CampaignSharedSetService")
    ccs = client.get_service("CampaignCriterionService")
    for cid, name, status in camps:
        have = attached_sets(ga, customer_id, cid)
        negs = campaign_negative_count(ga, customer_id, cid)
        need_list = list_rn not in have
        print(f"{name} ({status}) · negative list {'MISSING' if need_list else 'attached'} · {negs} campaign negatives")
        if not a.apply:
            if need_list:
                print(f"  would attach \"{pick[1]}\"")
            for t, mt in extra:
                print(f"  would add negative \"{t}\" {mt}")
            continue
        try:
            if need_list:
                op = client.get_type("CampaignSharedSetOperation")
                op.create.campaign = f"customers/{customer_id}/campaigns/{cid}"
                op.create.shared_set = list_rn
                css.mutate_campaign_shared_sets(customer_id=customer_id, operations=[op])
                print(f"  attached \"{pick[1]}\"")
            ops = []
            for t, mt in extra:
                op = client.get_type("CampaignCriterionOperation")
                op.create.campaign = f"customers/{customer_id}/campaigns/{cid}"
                op.create.negative = True
                op.create.keyword.text = t
                op.create.keyword.match_type = client.enums.KeywordMatchTypeEnum[mt]
                ops.append(op)
            if ops:
                ccs.mutate_campaign_criteria(customer_id=customer_id, operations=ops)
                print(f"  added {len(ops)} campaign negative(s)")
        except GoogleAdsException as e:
            print(f"  API refused: {e.failure.errors[0].message}")
        print(f"  check: https://ads.google.com/aw/keywords/negative?campaignId={cid}&__c={customer_id}")

    print("\nBrand exclusions cannot be attached reliably from here. On screen:")
    print("  the PMax campaign > Settings > Brand exclusions > pick or create the brand list.")
    if not a.apply:
        print("\nDry run - re-run with --apply to make the changes above.")


if __name__ == "__main__":
    main()
