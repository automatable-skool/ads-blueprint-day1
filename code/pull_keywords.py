"""Stage 1 — wide keyword pull for service discovery.

Geo-targets the user's city, pulls keyword ideas for the seed terms (1,000+
candidates), drops junk (account negatives) and zero-volume, writes
candidates.csv ranked by volume. Claude then clusters these into the top 10-20
services to present at checkpoint 1.

Usage:
  python3 pull_keywords.py --seeds-file seeds.txt [--floor 50]        # city = MAIN_CITY in .env
  python3 pull_keywords.py --city "<main city>" --seeds "<service one>,<service two>,..."
"""

import argparse
import csv
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client, chunks, resolve_city_geo, keyword_ideas, ACCOUNT_NEG


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--city", default=None, help="the city to pull volume for. Default: MAIN_CITY in .env")
    ap.add_argument("--seeds", help="comma-separated seed keywords")
    ap.add_argument("--seeds-file", help="file with one seed per line")
    ap.add_argument("--floor", type=int, default=50)
    ap.add_argument("--out", default="candidates.csv")
    args = ap.parse_args()

    if args.seeds_file:
        seeds = [s.strip() for s in open(args.seeds_file) if s.strip()]
    elif args.seeds:
        seeds = [s.strip() for s in args.seeds.split(",") if s.strip()]
    else:
        sys.exit("Provide --seeds or --seeds-file")

    client, customer_id = load_client()
    args.city = args.city or os.getenv("MAIN_CITY", "")
    if not args.city or args.city.lower() == "none":
        sys.exit("no city - pass --city or set MAIN_CITY in .env (a remote or national business runs stem_metrics.py on the country instead)")
    geo, cc = resolve_city_geo(client, args.city)
    print(f"City {args.city} -> {geo} ({cc}); {len(seeds)} seeds")

    rows, seen = [], set()
    for n, batch in enumerate(chunks(seeds, 20), 1):
        for d in keyword_ideas(client, customer_id, geo, batch):
            kw = d["keyword"].lower()
            if kw in seen or d["v"] < 1 or ACCOUNT_NEG.search(kw):
                continue
            seen.add(kw)
            rows.append(d)
        print(f"  batch {n} ok ({len(rows)} kept)")
        time.sleep(3)

    rows.sort(key=lambda r: r["v"], reverse=True)
    with open(args.out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["keyword", "v", "comp", "cpc"])
        w.writeheader()
        w.writerows(rows)

    n_floor = sum(1 for r in rows if r["v"] >= args.floor)
    print(f"\n✓ {len(rows)} candidates (>=1/mo) written to {args.out}; "
          f"{n_floor} are >= {args.floor}/mo")
    print("Next: Claude clusters candidates.csv into the top 10-20 services "
          "(checkpoint 1).")


if __name__ == "__main__":
    main()
