"""Stage 4 — push the account-level negative keyword list to Google Ads.

Reads a terms file (one per line; bare = BROAD, "quoted" = PHRASE, [bracket] =
EXACT), creates/updates a SHARED Negative Keyword List in the account, and
optionally attaches it to every enabled Search campaign. Idempotent &
safe to re-run (find-or-create set; only adds missing terms).

Build the terms file from universal-negative-keywords.md first (Claude does this:
dedupe, match-type, drop serviced cities), then:

  python3 push_negatives.py --name "Universal Service Business Negatives v1" \
      --terms-file account-negatives.txt [--attach]
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client
from google.ads.googleads.errors import GoogleAdsException


def parse_terms(path):
    """Return [(text, MATCH_TYPE)]. bare=BROAD, "x"=PHRASE, [x]=EXACT."""
    out = []
    for line in open(path):
        t = line.strip()
        if not t or t.startswith("#"):
            continue
        if t.startswith('"') and t.endswith('"'):
            out.append((t[1:-1].strip(), "PHRASE"))
        elif t.startswith("[") and t.endswith("]"):
            out.append((t[1:-1].strip(), "EXACT"))
        else:
            out.append((t, "BROAD"))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--name", required=True)
    ap.add_argument("--terms-file", required=True)
    ap.add_argument("--attach", action="store_true",
                    help="attach to all enabled Search campaigns")
    args = ap.parse_args()

    want = parse_terms(args.terms_file)
    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    mt_enum = client.enums.KeywordMatchTypeEnum

    # find-or-create shared set
    q = (f"SELECT shared_set.resource_name FROM shared_set WHERE "
         f"shared_set.type = 'NEGATIVE_KEYWORDS' AND shared_set.name = '{args.name}' "
         f"AND shared_set.status != 'REMOVED'")
    rn = next((r.shared_set.resource_name for r in ga.search(customer_id=customer_id, query=q)), None)
    if rn:
        print(f"• shared set exists: {rn}")
    else:
        svc = client.get_service("SharedSetService")
        op = client.get_type("SharedSetOperation")
        op.create.name = args.name
        op.create.type_ = client.enums.SharedSetTypeEnum.NEGATIVE_KEYWORDS
        rn = svc.mutate_shared_sets(customer_id=customer_id, operations=[op]).results[0].resource_name
        print(f"• created shared set: {rn}")

    # existing terms
    q = (f"SELECT shared_criterion.keyword.text, shared_criterion.keyword.match_type "
         f"FROM shared_criterion WHERE shared_criterion.shared_set = '{rn}' "
         f"AND shared_criterion.type = 'KEYWORD'")
    have = {(r.shared_criterion.keyword.text.lower(), r.shared_criterion.keyword.match_type.name)
            for r in ga.search(customer_id=customer_id, query=q)}
    todo = [(t, mt) for (t, mt) in want if (t.lower(), mt) not in have]

    if todo:
        svc = client.get_service("SharedCriterionService")
        ops = []
        for text, mt in todo:
            op = client.get_type("SharedCriterionOperation")
            op.create.shared_set = rn
            op.create.keyword.text = text
            op.create.keyword.match_type = getattr(mt_enum, mt)
            ops.append(op)
        added = 0
        for i in range(0, len(ops), 1000):
            added += len(svc.mutate_shared_criteria(
                customer_id=customer_id, operations=ops[i:i + 1000]).results)
        print(f"• added {added} negatives ({len(want)} in file, {len(have)} already present)")
    else:
        print("• all terms already present")

    if args.attach:
        q = ("SELECT campaign.id, campaign.name, campaign.resource_name FROM campaign "
             "WHERE campaign.status = 'ENABLED' "
             "AND campaign.advertising_channel_type = 'SEARCH'")
        camps = [(r.campaign.name, r.campaign.resource_name)
                 for r in ga.search(customer_id=customer_id, query=q)]
        if not camps:
            print("• no enabled Search campaigns to attach to yet")
        else:
            q = (f"SELECT campaign_shared_set.campaign FROM campaign_shared_set WHERE "
                 f"campaign_shared_set.shared_set = '{rn}' "
                 f"AND campaign_shared_set.status != 'REMOVED'")
            attached = {r.campaign_shared_set.campaign for r in ga.search(customer_id=customer_id, query=q)}
            todo_c = [(nm, crn) for nm, crn in camps if crn not in attached]
            if todo_c:
                svc = client.get_service("CampaignSharedSetService")
                ops = []
                for _nm, crn in todo_c:
                    op = client.get_type("CampaignSharedSetOperation")
                    op.create.campaign = crn
                    op.create.shared_set = rn
                    ops.append(op)
                svc.mutate_campaign_shared_sets(customer_id=customer_id, operations=ops)
            print(f"• attached to {len(todo_c)} campaign(s) "
                  f"({len(camps) - len(todo_c)} already attached)")

    print(f"\n✓ '{args.name}' is live in account {customer_id}.")


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"\n✗ Google Ads API error (request_id {e.request_id}):")
        for err in e.failure.errors:
            print(f"  - {err.error_code}: {err.message}")
        raise
