"""Ask Google for the real variations of every keyword in an ad group.

ONE REQUEST PER KEYWORD, on purpose (Jono, 1 September 2026).

Two reasons, and the second is the one that matters:

  1. Batching 20 seeds into one request returns a single merged pool, so you
     cannot tell which seed produced which idea. Per-keyword requests keep the
     attribution, and attribution is the whole point - you are deciding whether
     a term belongs in THIS group.
  2. A group is somebody's entire account. The daily quota is ~15,000 operations
     and a whole account costs about 50. Saving calls you will never spend, at
     the price of a worse account, is a bad trade.

Why not just grep the candidate CSV: a substring search only returns keywords
that literally contain the seed's words. It can never find "adwords account
review" from "google ads audit", and those are exactly the variations a STAG
needs. Google's idea service returns semantic neighbours, not string matches.

    python3 code/stag_variations.py --group 5
    python3 code/stag_variations.py --keywords "google ads audit,ppc audit"
    python3 code/stag_variations.py --all --min-volume 20
"""
import argparse
import os
import re
from pathlib import Path

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

JUNK = {"tool", "tools", "software", "checker", "analyzer", "analyser", "generator",
        "plugin", "extension", "template", "course", "certification", "training",
        "jobs", "job", "salary", "tutorial", "pdf", "reddit", "youtube", "vs",
        "alternative", "alternatives", "reviews", "cheap", "semrush", "ahrefs",
        "moz", "ubersuggest", "yoast", "surfer", "screaming", "wikipedia"}
STOP = {"and", "the", "a", "an", "of", "for", "in", "to", "your", "my"}


def sig(kw):
    return frozenset(w for w in re.sub(r"[^a-z0-9 ]", " ", kw.lower()).split()
                     if w and w not in STOP)


def read_groups(path):
    groups, cur = [], None
    for line in Path(path).read_text().splitlines():
        m = re.match(r"^###\s+(\d+)\.\s+(.+)$", line)
        if m:
            cur = {"n": m.group(1), "name": m.group(2).split("·")[0].strip(), "kws": []}
            groups.append(cur)
        elif cur is not None and line.startswith("- ") and "·" in line:
            if any(c.isdigit() for c in line):
                cur["kws"].append(line[2:].split("·")[0].strip().lower())
    return groups


def ideas_for(svc, client, customer_id, seed, geo, lang):
    req = client.get_type("GenerateKeywordIdeasRequest")
    req.customer_id = customer_id
    req.language = lang
    req.geo_target_constants = [geo]
    req.include_adult_keywords = False
    req.keyword_plan_network = client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
    req.keyword_seed.keywords.append(seed)
    out = {}
    for idea in svc.generate_keyword_ideas(request=req):
        m = idea.keyword_idea_metrics
        out[idea.text.lower()] = (
            m.avg_monthly_searches or 0,
            (m.low_top_of_page_bid_micros or 0) / 1e6,
            (m.high_top_of_page_bid_micros or 0) / 1e6,
        )
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", default="keyword-list.md")
    ap.add_argument("--group", help="group number from keyword-list.md")
    ap.add_argument("--keywords", help="comma-separated, instead of a group")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--min-volume", type=int, default=10)
    ap.add_argument("--limit", type=int, default=12)
    ap.add_argument("--geo", default="geoTargetConstants/2840", help="default: United States")
    ap.add_argument("--language", default="languageConstants/1000")
    args = ap.parse_args()

    load_dotenv()
    client = GoogleAdsClient.load_from_dict({
        "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
        "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
        "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
        "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
        "use_proto_plus": True,
    })
    customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
    svc = client.get_service("KeywordPlanIdeaService")

    if args.keywords:
        targets = [{"n": "-", "name": "ad hoc",
                    "kws": [k.strip().lower() for k in args.keywords.split(",") if k.strip()]}]
    else:
        groups = read_groups(args.file)
        targets = groups if args.all else [g for g in groups if g["n"] == args.group]
    if not targets:
        raise SystemExit("No matching group. Use --group N, --all, or --keywords.")

    calls = 0
    for g in targets:
        have = {sig(k) for k in g["kws"]}
        pool = {}
        for seed in g["kws"]:
            calls += 1
            try:
                found = ideas_for(svc, client, customer_id, seed, args.geo, args.language)
            except Exception as e:
                if "RESOURCE_EXHAUSTED" in str(e) or "exhausted" in str(e).lower():
                    raise SystemExit(
                        f"\nGoogle Ads Planner quota is exhausted after {calls} request(s).\n"
                        f"This is the daily keyword-ideas limit, not an account problem, and it "
                        f"resets at midnight Pacific.\nWhat is already in keyword-list.md is "
                        f"unaffected. Re-run tomorrow.")
                print(f"  ! {seed}: {str(e)[:90]}")
                continue
            for kw, (vol, lo, hi) in found.items():
                if vol < args.min_volume or set(kw.split()) & JUNK or sig(kw) in have:
                    continue
                # keep the seed that found it - that is the attribution batching loses
                prev = pool.get(kw)
                if prev is None or vol > prev[0]:
                    pool[kw] = (vol, lo, hi, seed)

        # Deliberately NOT deduped by volume+bid. "seo firm" and "seo agency"
        # both read 22,200 at $13.86 - Google prices them as one cluster - but
        # they are different words for the same intent and both belong in the
        # group. Collapsing them would throw away the new avenues this exists
        # to find. The word-set filter above already killed the real junk.
        rows = sorted(((kw, v, lo, hi, sd) for kw, (v, lo, hi, sd) in pool.items()),
                      key=lambda r: -r[1])[:args.limit]
        print(f"\n## {g['name']} · {len(g['kws'])} keywords now · "
              f"{len(g['kws'])} requests · {len(rows)} real variations")
        if not rows:
            print("  Google has nothing new for this one. Merge the group or cut it.")
        for kw, vol, lo, hi, seed in rows:
            cost = f"${lo:.2f} to ${hi:.2f}" if hi else "no bid data yet"
            print(f"- {kw} · phrase · {vol:,} a month · {cost}")
            print(f"    found by: {seed}")

    print(f"\n{calls} request(s). Keep only what you would write the SAME ad for.")


if __name__ == "__main__":
    main()
