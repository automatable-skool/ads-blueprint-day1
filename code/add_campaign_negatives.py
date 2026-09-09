"""Push approved negative keywords at CAMPAIGN level (or one term ad hoc).

The push half of /search-terms. Reads a staged file of approved negatives and
adds each one to its campaign, skipping anything already present. Account-level
(universal) negatives go through push_negatives.py instead - that one manages
the shared list.

Staged file format, one negative per line, campaign ID first:
  1234567890  "plumber jobs"          # PHRASE (quoted)
  1234567890  [plumber salary]        # EXACT (bracketed)
  1234567890  apprenticeship          # BROAD (bare) - use sparingly
Lines starting with # are ignored. Same file can mix campaigns.

Usage (from the project root):
  python3 code/add_campaign_negatives.py --file code/cache/negatives-approved.txt
  python3 code/add_campaign_negatives.py --campaign 1234567890 --term "plumber jobs" --match phrase
  python3 code/add_campaign_negatives.py --file ... --dry-run     # show what would be added
"""

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402

LINE = re.compile(r"^\s*(\d{10})\s+(.+?)\s*(?:#.*)?$")


def parse_term(raw):
    t = raw.strip()
    if t.startswith('"') and t.endswith('"'):
        return t[1:-1].strip(), "PHRASE"
    if t.startswith("[") and t.endswith("]"):
        return t[1:-1].strip(), "EXACT"
    return t, "BROAD"


def parse_file(path):
    out = []
    with open(path) as f:
        for n, line in enumerate(f, 1):
            if not line.strip() or line.lstrip().startswith("#"):
                continue
            m = LINE.match(line)
            if not m:
                sys.exit(f"{path}:{n}: expected '<campaign id> <term>', got: {line.rstrip()}")
            text, mt = parse_term(m.group(2))
            out.append((m.group(1), text, mt))
    return out


def existing_negatives(ga, customer_id, campaign_id):
    q = f"""
      SELECT campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
      FROM campaign_criterion
      WHERE campaign.id = {campaign_id}
        AND campaign_criterion.type = 'KEYWORD'
        AND campaign_criterion.negative = TRUE
        AND campaign_criterion.status != 'REMOVED'
    """
    return {(r.campaign_criterion.keyword.text.lower(), r.campaign_criterion.keyword.match_type.name)
            for r in ga.search(customer_id=customer_id, query=q)}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--file", help="staged negatives file (see format above)")
    ap.add_argument("--campaign", help="numeric campaign ID (single-term mode)")
    ap.add_argument("--term", help="the negative keyword (single-term mode)")
    ap.add_argument("--match", choices=["exact", "phrase", "broad"], default="phrase")
    ap.add_argument("--dry-run", action="store_true", help="print the plan, push nothing")
    args = ap.parse_args()

    if args.file:
        wanted = parse_file(args.file)
    elif args.campaign and args.term:
        wanted = [(args.campaign.replace("-", ""), args.term, args.match.upper())]
    else:
        sys.exit("give --file, or --campaign and --term")

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    mt_enum = client.enums.KeywordMatchTypeEnum

    by_campaign = {}
    for cid, text, mt in wanted:
        by_campaign.setdefault(cid, []).append((text, mt))

    total_added = total_skipped = 0
    for cid, items in by_campaign.items():
        have = existing_negatives(ga, customer_id, cid)
        todo = [(t, mt) for t, mt in items if (t.lower(), mt) not in have]
        skipped = len(items) - len(todo)
        total_skipped += skipped
        print(f"campaign {cid}: {len(todo)} to add, {skipped} already there")
        for t, mt in todo:
            print(f"  + {mt:6} {t}")
        if args.dry_run or not todo:
            continue
        svc = client.get_service("CampaignCriterionService")
        ops = []
        for t, mt in todo:
            op = client.get_type("CampaignCriterionOperation")
            c = op.create
            c.campaign = ga.campaign_path(customer_id, cid)
            c.negative = True
            c.keyword.text = t
            c.keyword.match_type = getattr(mt_enum, mt)
            ops.append(op)
        res = svc.mutate_campaign_criteria(customer_id=customer_id, operations=ops)
        total_added += len(res.results)

    if args.dry_run:
        print("\ndry run - nothing pushed")
    else:
        print(f"\nadded {total_added} negative(s), skipped {total_skipped} duplicate(s)")


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"Google Ads API error (request_id {e.request_id}):", file=sys.stderr)
        for err in e.failure.errors:
            print(f"  - {err.error_code}: {err.message}", file=sys.stderr)
        sys.exit(1)
