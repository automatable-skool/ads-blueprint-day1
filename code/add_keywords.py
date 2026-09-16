"""Add approved harvest keywords to EXISTING ad groups, always PAUSED.

The push half of step 4 of /search-terms. A search term that converted at or
under target and is not already a keyword gets promoted into the ad group that
caught it. This is the incremental adder - build_campaigns.py builds whole
campaign trees from scratch and is the wrong tool once an account is live.

What it refuses to do:
  - Enable anything. Every keyword lands PAUSED, per the repo rule. You flip it
    on in the UI yourself. There is deliberately no --enable flag.
  - Add a keyword one of your own negatives already blocks. That is the reverse
    conflict check: campaign negatives, ad group negatives and every shared
    (account) list attached to the campaign are tested before the write, and a
    blocked keyword is reported with the exact negative that kills it.
  - Add a duplicate. Same text and match type already in the ad group is skipped.

Staged file format, one keyword per line, ad group ID first:
  1234567890  [emergency drain cleaning]  # EXACT (bracketed) - the harvest default
  1234567890  "emergency plumber"        # PHRASE (quoted)
  1234567890  water heater repair        # BROAD (bare) - rarely what you want
Lines starting with # are ignored. Same file can mix ad groups.

Usage (from the project root):
  python3 code/add_keywords.py --file code/cache/keywords-approved.txt --dry-run
  python3 code/add_keywords.py --file code/cache/keywords-approved.txt
  python3 code/add_keywords.py --ad-group 1234567890 --term "drain cleaning" --match exact
  python3 code/add_keywords.py --file ... --cpc-bid 4.50     # optional, else inherits the ad group default
"""

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402

LINE = re.compile(r"^\s*(\d{6,12})\s+(.+?)\s*(?:#.*)?$")
WORD = re.compile(r"[a-z0-9]+")


def parse_term(raw):
    t = raw.strip()
    if t.startswith('"') and t.endswith('"'):
        return t[1:-1].strip(), "PHRASE"
    if t.startswith("[") and t.endswith("]"):
        return t[1:-1].strip(), "EXACT"
    return t, "BROAD"


def parse_file(path):
    if not os.path.exists(path):
        sys.exit(f"No staged keywords file at {path} - run /search-terms step 4 to write one first.")
    out = []
    with open(path) as f:
        for n, line in enumerate(f, 1):
            if not line.strip() or line.lstrip().startswith("#"):
                continue
            m = LINE.match(line)
            if not m:
                sys.exit(f"{path}:{n}: expected '<ad group id> <term>', got: {line.rstrip()}")
            text, mt = parse_term(m.group(2))
            if not text:
                sys.exit(f"{path}:{n}: empty keyword text")
            out.append((m.group(1), text, mt))
    return out


def toks(s):
    return WORD.findall(s.lower())


def blocks(neg_text, neg_match, kw_text):
    """Does this negative keyword block this keyword? Negatives ignore close variants."""
    n, k = toks(neg_text), toks(kw_text)
    if not n:
        return False
    if neg_match == "EXACT":
        return n == k
    if neg_match == "PHRASE":
        return any(k[i:i + len(n)] == n for i in range(len(k) - len(n) + 1))
    return set(n).issubset(set(k))  # BROAD: every word present, any order


def ad_group_info(ga, customer_id, ad_group_id):
    q = f"""
      SELECT ad_group.id, ad_group.name, ad_group.status, campaign.id, campaign.name
      FROM ad_group
      WHERE ad_group.id = {ad_group_id} AND ad_group.status != 'REMOVED'
    """
    for r in ga.search(customer_id=customer_id, query=q):
        return {"ag_name": r.ad_group.name, "ag_status": r.ad_group.status.name,
                "campaign_id": str(r.campaign.id), "campaign_name": r.campaign.name}
    return None


def ad_group_criteria(ga, customer_id, ad_group_id):
    """Return (existing positives, ad-group-level negatives)."""
    q = f"""
      SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
             ad_group_criterion.negative
      FROM ad_group_criterion
      WHERE ad_group.id = {ad_group_id}
        AND ad_group_criterion.type = 'KEYWORD'
        AND ad_group_criterion.status != 'REMOVED'
    """
    have, negs = set(), []
    for r in ga.search(customer_id=customer_id, query=q):
        kw = r.ad_group_criterion.keyword
        if r.ad_group_criterion.negative:
            negs.append((kw.text, kw.match_type.name, "ad group"))
        else:
            have.add((kw.text.lower(), kw.match_type.name))
    return have, negs


def campaign_negatives(ga, customer_id, campaign_id):
    q = f"""
      SELECT campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
      FROM campaign_criterion
      WHERE campaign.id = {campaign_id}
        AND campaign_criterion.type = 'KEYWORD'
        AND campaign_criterion.negative = TRUE
        AND campaign_criterion.status != 'REMOVED'
    """
    return [(r.campaign_criterion.keyword.text, r.campaign_criterion.keyword.match_type.name, "campaign")
            for r in ga.search(customer_id=customer_id, query=q)]


def shared_list_negatives(ga, customer_id, campaign_id):
    """Negatives from every shared (account) list attached to this campaign."""
    q = f"""
      SELECT campaign_shared_set.shared_set
      FROM campaign_shared_set
      WHERE campaign.id = {campaign_id} AND campaign_shared_set.status != 'REMOVED'
    """
    sets = [r.campaign_shared_set.shared_set for r in ga.search(customer_id=customer_id, query=q)]
    if not sets:
        return []
    ids = ", ".join(s.split("/")[-1] for s in sets)
    q2 = f"""
      SELECT shared_criterion.keyword.text, shared_criterion.keyword.match_type, shared_set.name
      FROM shared_criterion
      WHERE shared_set.id IN ({ids}) AND shared_criterion.type = 'KEYWORD'
    """
    return [(r.shared_criterion.keyword.text, r.shared_criterion.keyword.match_type.name,
             f"shared list '{r.shared_set.name}'")
            for r in ga.search(customer_id=customer_id, query=q2)]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--file", help="staged keywords file (see format above)")
    ap.add_argument("--ad-group", help="numeric ad group ID (single-term mode)")
    ap.add_argument("--term", help="the keyword text (single-term mode)")
    ap.add_argument("--match", choices=["exact", "phrase", "broad"], default="exact")
    ap.add_argument("--cpc-bid", type=float, help="optional max CPC in dollars; omit to inherit the ad group default")
    ap.add_argument("--dry-run", action="store_true", help="print the plan, push nothing")
    args = ap.parse_args()

    if args.file:
        wanted = parse_file(args.file)
    elif args.ad_group and args.term:
        wanted = [(args.ad_group.replace("-", ""), args.term, args.match.upper())]
    else:
        sys.exit("give --file, or --ad-group and --term")

    if not wanted:
        sys.exit("Nothing staged - no harvest to push this run.")

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    enums = client.enums

    by_ad_group = {}
    for agid, text, mt in wanted:
        by_ad_group.setdefault(agid, []).append((text, mt))

    total_added = total_dupe = total_blocked = 0
    for agid, items in by_ad_group.items():
        info = ad_group_info(ga, customer_id, agid)
        if not info:
            print(f"ad group {agid}: NOT FOUND or removed - skipping {len(items)} keyword(s)", file=sys.stderr)
            continue

        have, negs = ad_group_criteria(ga, customer_id, agid)
        negs += campaign_negatives(ga, customer_id, info["campaign_id"])
        negs += shared_list_negatives(ga, customer_id, info["campaign_id"])

        print(f"\nad group {agid} · {info['ag_name']} ({info['ag_status']}) "
              f"in campaign {info['campaign_name']} · {len(negs)} negative(s) checked")

        todo = []
        for text, mt in items:
            if (text.lower(), mt) in have:
                print(f"  = already there   {mt:6} {text}")
                total_dupe += 1
                continue
            hit = next(((nt, nm, src) for nt, nm, src in negs if blocks(nt, nm, text)), None)
            if hit:
                print(f"  x BLOCKED         {mt:6} {text}")
                print(f"      killed by {hit[1].lower()} negative '{hit[0]}' at {hit[2]} level")
                total_blocked += 1
                continue
            print(f"  + will add PAUSED {mt:6} {text}")
            todo.append((text, mt))

        if args.dry_run or not todo:
            continue

        svc = client.get_service("AdGroupCriterionService")
        ops = []
        for text, mt in todo:
            op = client.get_type("AdGroupCriterionOperation")
            c = op.create
            c.ad_group = ga.ad_group_path(customer_id, agid)
            c.status = enums.AdGroupCriterionStatusEnum.PAUSED
            c.keyword.text = text
            c.keyword.match_type = getattr(enums.KeywordMatchTypeEnum, mt)
            if args.cpc_bid:
                c.cpc_bid_micros = int(round(args.cpc_bid * 1_000_000))
            ops.append(op)
        res = svc.mutate_ad_group_criteria(customer_id=customer_id, operations=ops)
        total_added += len(res.results)

    print()
    if args.dry_run:
        print(f"dry run - nothing pushed. {total_blocked} blocked, {total_dupe} duplicate(s)")
    else:
        print(f"added {total_added} keyword(s) PAUSED · {total_blocked} blocked by a negative · "
              f"{total_dupe} already there")
        if total_added:
            print("Nothing is spending yet - enable them in the Google Ads UI when you are ready.")
    if total_blocked:
        print("Blocked keywords need the negative removed first, or they stay blocked after you enable them.")


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"Google Ads API error (request_id {e.request_id}):", file=sys.stderr)
        for err in e.failure.errors:
            print(f"  - {err.error_code}: {err.message}", file=sys.stderr)
        sys.exit(1)
