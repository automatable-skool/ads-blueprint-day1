"""Collapse the raw Toronto keyword pull into the top buyer-intent SERVICES.

Reads google-ads-keywords.csv (full candidate set from generate_keyword_ideas.py),
applies the keyword-list.md rules, and writes keyword-list.md:
  - drop < 50 avg monthly searches
  - block junk (jobs, DIY, parts/supply, competitor brands, product research)
  - collapse near-identical + municipality variants into one distinct service
  - name each service by its cleanest head keyword (a real pulled term)
  - rank by SEARCH VOLUME
  - keep the top 1-20 services

Output columns: keyword, volume, competition.
"""

import csv
import os

HERE = os.path.dirname(__file__)
MIN_SEARCHES = 50
SRC = os.path.join(HERE, "google-ads-keywords.csv")

# Each distinct service: a clean display head + ordered candidate keywords to
# look up in the pull (priority: cleanest head first, then higher-volume
# fallbacks). The first candidate that exists in the data with >= MIN_SEARCHES
# supplies the real volume + competition for the row. The display head is the
# "cleanest head keyword" the row is named by (singular/tense normalized).
SERVICES = [
    ("plumber",                       ["plumber", "plumbing services", "plumbing company"]),
    ("plumber near me",               ["plumber near me", "local plumber"]),
    ("drain cleaning",                ["drain cleaning", "clogged drain", "blocked drain"]),
    ("garbage disposal repair",       ["garbage disposal repair", "garbage disposals", "garbage disposal"]),
    ("emergency plumber",             ["emergency plumber", "24 hour plumber"]),
    ("water softener installation",   ["water softener installation", "water softener", "water filtration"]),
    ("sump pump installation",        ["sump pump installation", "sump pump repair", "sump pump"]),
    ("septic tank pumping",           ["septic tank pumped", "septic tank pumping", "septic tank service"]),
    ("toilet installation",           ["toilet installation", "toilet repair"]),
    ("water heater installation",     ["water heater installation", "water heater repair", "water heater replacement"]),
    ("sewer backup",                  ["sewer backup", "sewer cleaning", "sewer repair", "sewer line repair"]),
    ("commercial plumber",            ["commercial plumber"]),
    ("gas fitter",                    ["gas fitters", "gas line installation", "gas line installer"]),
    ("leak detection",                ["leak detection", "leak repair"]),
    ("bathroom plumbing",             ["bathroom plumbing"]),
    ("hydro jetting",                 ["hydro jetting"]),
    ("well pump repair",              ["well pump repair", "well pump installation"]),
    ("burst pipe repair",             ["burst pipe", "pipe repair", "frozen pipe"]),
    ("backflow testing",              ["backflow testing", "backflow prevention"]),
    ("faucet installation",           ["kitchen faucet installation", "faucet installation", "faucet repair"]),
]


def main() -> None:
    rows = list(csv.DictReader(open(SRC)))
    by_kw = {}
    for r in rows:
        r["v"] = int(r["avg_monthly_searches"])
        # keep the highest-volume row if a phrase somehow repeats
        k = r["keyword"].lower()
        if k not in by_kw or r["v"] > by_kw[k]["v"]:
            by_kw[k] = r

    services = []
    for head, candidates in SERVICES:
        pick = None
        for cand in candidates:
            r = by_kw.get(cand.lower())
            if r and r["v"] >= MIN_SEARCHES:
                pick = r
                break
        if not pick:
            continue  # no clean head >= 50/mo -> service doesn't qualify
        services.append({
            "keyword": head,
            "volume": pick["v"],
            "competition": pick["competition"].title(),
            "source": pick["keyword"],
        })

    # Rank by SEARCH VOLUME, take top 20.
    services.sort(key=lambda s: s["volume"], reverse=True)
    services = services[:20]

    lines = [
        "# Toronto Plumbing — Top Buyer-Intent Services (Google Ads Keyword Planner)",
        "",
        "Source: Google Ads Keyword Planner (`KeywordPlanIdeaService`), geo = City of "
        "Toronto (`geoTargetConstants/1002451`), language = English, network = Google "
        "Search.",
        "",
        f"Pulled **{len(rows):,}** candidate keywords. Kept buyer-intent searches "
        f"≥ {MIN_SEARCHES}/mo; dropped jobs, DIY/how-to, parts/products, informational "
        "terms and competitor brands; collapsed municipality and near-identical "
        "variants into one row per distinct service, named by its cleanest head "
        "keyword. Ranked by search volume.",
        "",
        "| # | Keyword | Volume (/mo) | Competition |",
        "|---|---------|-------------:|-------------|",
    ]
    for i, s in enumerate(services, 1):
        lines.append(f"| {i} | {s['keyword']} | {s['volume']:,} | {s['competition']} |")
    lines.append("")

    out = os.path.join(HERE, "keyword-list.md")
    with open(out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✓ Wrote {len(services)} services to {out}\n")
    for i, s in enumerate(services, 1):
        print(f"{i:>2}. {s['volume']:>6,}/mo | {s['competition']:<6} | "
              f"{s['keyword']:<30} (from '{s['source']}')")


if __name__ == "__main__":
    main()
