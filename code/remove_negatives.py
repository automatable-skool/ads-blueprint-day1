"""Remove negative keywords at campaign or ad-group level - the fix for an account
whose own negatives block its keywords (the Calgary/Edmonton class of fault).

Dry run by DEFAULT: prints exactly what would be removed and why. Nothing is
touched without --apply. A removed negative is reversible - re-add it with
add_campaign_negatives.py / add_adgroup_negatives.py.

Usage (from the project root):
  python3 code/remove_negatives.py --campaign 1234567890 --term calgary
  python3 code/remove_negatives.py --campaign 1234567890 --term calgary --apply
  python3 code/remove_negatives.py --file code/cache/negatives-remove.txt --apply

File format, one per line, campaign ID first (same shapes as the add script):
  1234567890  "plumber jobs"        # PHRASE
  1234567890  [home depot]          # EXACT
  1234567890  calgary               # matches ANY match type of that text
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
        return t[1:-1].strip().lower(), "PHRASE"
    if t.startswith("[") and t.endswith("]"):
        return t[1:-1].strip().lower(), "EXACT"
    return t.lower(), None  # None = any match type


def find_targets(ga, customer_id, campaign_id, want):
    q = f"""
      SELECT campaign.name, campaign_criterion.resource_name,
             campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
      FROM campaign_criterion
      WHERE campaign.id = {campaign_id}
        AND campaign_criterion.type = 'KEYWORD'
        AND campaign_criterion.negative = TRUE
        AND campaign_criterion.status != 'REMOVED'
    """
    hits = []
    for r in ga.search(customer_id=customer_id, query=q):
        text = r.campaign_criterion.keyword.text.lower()
        mt = r.campaign_criterion.keyword.match_type.name
        for term, want_mt in want:
            if text == term and (want_mt is None or want_mt == mt):
                hits.append((r.campaign.name, text, mt, r.campaign_criterion.resource_name))
    return hits


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campaign", help="campaign ID (with --term)")
    ap.add_argument("--term", action="append", default=[], help="negative text to remove (repeatable)")
    ap.add_argument("--file", help="staged removals file (see format above)")
    ap.add_argument("--apply", action="store_true", help="actually remove - default is a dry run")
    a = ap.parse_args()

    jobs = {}  # campaign_id -> [(term, match_or_None)]
    if a.file:
        with open(a.file) as f:
            for n, line in enumerate(f, 1):
                if not line.strip() or line.lstrip().startswith("#"):
                    continue
                m = LINE.match(line)
                if not m:
                    sys.exit(f"{a.file}:{n}: expected '<campaign id> <term>', got: {line.rstrip()}")
                jobs.setdefault(m.group(1), []).append(parse_term(m.group(2)))
    if a.campaign and a.term:
        jobs.setdefault(a.campaign, []).extend(parse_term(t) for t in a.term)
    if not jobs:
        sys.exit("Nothing to do - give --campaign + --term, or --file.")

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    svc = client.get_service("CampaignCriterionService")

    all_hits = []
    for cid, want in jobs.items():
        hits = find_targets(ga, customer_id, cid, want)
        if not hits:
            print(f"campaign {cid}: no matching negatives found for {[t for t, _ in want]}")
        all_hits.extend(hits)

    for name, text, mt, _ in all_hits:
        print(f"{'REMOVE' if a.apply else 'would remove'} · {name} · \"{text}\" · {mt}")
    if not all_hits:
        return
    if not a.apply:
        print(f"\nDry run - {len(all_hits)} negative(s) found. Re-run with --apply to remove them.")
        return

    ops = []
    for _, _, _, rn in all_hits:
        op = client.get_type("CampaignCriterionOperation")
        op.remove = rn
        ops.append(op)
    try:
        svc.mutate_campaign_criteria(customer_id=customer_id, operations=ops)
    except GoogleAdsException as e:
        sys.exit(f"API refused: {e.failure.errors[0].message}")
    print(f"\nRemoved {len(ops)} negative(s).")
    print(f"Check them: https://ads.google.com/aw/keywords/negative?__c={customer_id}")


if __name__ == "__main__":
    main()
