"""Push approved negative keywords at AD GROUP level - the narrowest level there is.

The third and final negative pusher, closing the set on 2 September 2026 (Jono:
"I wanna make sure that there's three levels"). Account-level negatives go through
push_negatives.py (shared list), campaign-level through add_campaign_negatives.py,
ad-group-level through this. The /search-terms rule is "every negative lands at the
narrowest true level, ad group by default" - until today no script could execute it.

An ad-group negative only bites inside its ad group, which makes it the right home
for routing pairs: promote a keyword into ad group B, negate the same term here in
ad group A, and the searcher stops getting whichever ad Google felt like.

Before pushing, every term is conflict-checked against the ENABLED positive keywords
of the SAME ad group (negative match semantics, close variants ignored). A negative
that would block a keyword in its own group is refused and named - that mistake shows
as Active-with-zero-impressions and nothing in the UI ever warns you.

Staged file format, one negative per line, ad group ID first:
  145683356556  "plumber jobs"          # PHRASE (quoted)
  145683356556  [plumber salary]        # EXACT (bracketed)
  145683356556  apprenticeship          # BROAD (bare) - use sparingly
Lines starting with # are ignored. Same file can mix ad groups.

Usage (from the project root):
  python3 code/add_adgroup_negatives.py --file code/cache/adgroup-negatives-approved.txt
  python3 code/add_adgroup_negatives.py --ad-group 145683356556 --term "plumber jobs" --match phrase
  python3 code/add_adgroup_negatives.py --file ... --dry-run     # show the plan, push nothing
"""

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402

LINE = re.compile(r"^\s*(\d{9,12})\s+(.+?)\s*(?:#.*)?$")


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
                sys.exit(f"{path}:{n}: expected '<ad group id> <term>', got: {line.rstrip()}")
            text, mt = parse_term(m.group(2))
            out.append((m.group(1), text, mt))
    return out


def negative_blocks(neg_text, neg_match, kw_text):
    """Negative match semantics - negatives ignore close variants."""
    nt, kt = neg_text.lower().strip(), kw_text.lower().strip()
    kw_words = kt.split()
    if neg_match == "EXACT":
        return nt == kt
    if neg_match == "PHRASE":
        nw = nt.split()
        return any(kw_words[i:i + len(nw)] == nw for i in range(len(kw_words) - len(nw) + 1))
    return set(nt.split()) <= set(kw_words)  # BROAD: all words present, any order


def group_state(ga, customer_id, ad_group_id):
    """Existing negatives + enabled positive keywords for one ad group."""
    q = f"""
      SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
             ad_group_criterion.negative, ad_group_criterion.status,
             ad_group.name, campaign.name
      FROM ad_group_criterion
      WHERE ad_group.id = {ad_group_id}
        AND ad_group_criterion.type = 'KEYWORD'
        AND ad_group_criterion.status != 'REMOVED'
    """
    have, positives, names = set(), [], ("", "")
    for r in ga.search(customer_id=customer_id, query=q):
        names = (r.campaign.name, r.ad_group.name)
        if r.ad_group_criterion.negative:
            have.add((r.ad_group_criterion.keyword.text.lower(),
                      r.ad_group_criterion.keyword.match_type.name))
        elif r.ad_group_criterion.status.name == "ENABLED":
            positives.append(r.ad_group_criterion.keyword.text)
    return have, positives, names


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--file", help="staged negatives file (see format above)")
    ap.add_argument("--ad-group", help="numeric ad group ID (single-term mode)")
    ap.add_argument("--term", help="the negative keyword (single-term mode)")
    ap.add_argument("--match", choices=["exact", "phrase", "broad"], default="phrase")
    ap.add_argument("--dry-run", action="store_true", help="print the plan, push nothing")
    args = ap.parse_args()

    if args.file:
        wanted = parse_file(args.file)
    elif args.ad_group and args.term:
        wanted = [(args.ad_group.replace("-", ""), args.term, args.match.upper())]
    else:
        sys.exit("give --file, or --ad-group and --term")

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    mt_enum = client.enums.KeywordMatchTypeEnum

    by_group = {}
    for gid, text, mt in wanted:
        by_group.setdefault(gid, []).append((text, mt))

    total_added = total_skipped = total_refused = 0
    for gid, items in by_group.items():
        have, positives, (camp_name, ag_name) = group_state(ga, customer_id, gid)
        label = f"{camp_name} > {ag_name}" if ag_name else f"ad group {gid}"
        todo, refused = [], []
        for t, mt in items:
            if (t.lower(), mt) in have:
                total_skipped += 1
                continue
            hits = [k for k in positives if negative_blocks(t, mt, k)]
            if hits:
                refused.append((t, mt, hits))
                continue
            todo.append((t, mt))
        total_refused += len(refused)
        print(f"{label}: {len(todo)} to add, {len(items) - len(todo) - len(refused)} already there, "
              f"{len(refused)} REFUSED")
        for t, mt in todo:
            print(f"  + {mt:6} {t}")
        for t, mt, hits in refused:
            print(f"  ⛔ {mt:6} {t} - would block your own keyword "
                  f"{', '.join(repr(h) for h in hits[:3])} in this ad group")
        if args.dry_run or not todo:
            continue
        svc = client.get_service("AdGroupCriterionService")
        ops = []
        for t, mt in todo:
            op = client.get_type("AdGroupCriterionOperation")
            c = op.create
            c.ad_group = ga.ad_group_path(customer_id, gid)
            c.negative = True
            c.keyword.text = t
            c.keyword.match_type = getattr(mt_enum, mt)
            ops.append(op)
        res = svc.mutate_ad_group_criteria(customer_id=customer_id, operations=ops)
        total_added += len(res.results)

    if args.dry_run:
        print("\ndry run - nothing pushed")
    else:
        print(f"\nadded {total_added} negative(s), skipped {total_skipped} duplicate(s), "
              f"refused {total_refused} conflict(s)")


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"Google Ads API error (request_id {e.request_id}):", file=sys.stderr)
        for err in e.failure.errors:
            print(f"  - {err.error_code}: {err.message}", file=sys.stderr)
        sys.exit(1)
