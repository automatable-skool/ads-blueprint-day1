"""Stage 2 — validate surrounding municipalities by real search volume.

Claude proposes the municipalities around the user's city (it knows the local
geography); this script pulls real "{probe} {muni}" volume for each so only
places with genuine demand are shown at checkpoint 2.

Usage:
  python3 check_municipalities.py --probe "plumber" \
      --munis "Toronto,Mississauga,Brampton,..." [--country CA]
  python3 check_municipalities.py --probe "plumber" --munis-file munis.txt
"""

import argparse
import csv
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import (load_client, chunks, resolve_city_geo, country_geo,
                     keyword_ideas)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--probe", required=True, help="core service term, e.g. 'plumber'")
    ap.add_argument("--munis", help="comma-separated municipality names")
    ap.add_argument("--munis-file", help="file with one municipality per line")
    ap.add_argument("--country", help="ISO code e.g. CA, US (else inferred from first muni)")
    ap.add_argument("--out", default="municipalities.csv")
    args = ap.parse_args()

    if args.munis_file:
        munis = [m.strip() for m in open(args.munis_file) if m.strip()]
    elif args.munis:
        munis = [m.strip() for m in args.munis.split(",") if m.strip()]
    else:
        sys.exit("Provide --munis or --munis-file")

    client, customer_id = load_client()
    cc = (args.country or "").upper()
    if not cc:
        _, cc = resolve_city_geo(client, munis[0])
    geo = country_geo(cc)
    if not geo:
        sys.exit(f"No country geo mapping for {cc!r}; pass --country with a supported code")
    print(f"Probe '{args.probe}' x {len(munis)} municipalities at country geo {geo} ({cc})")

    seeds = []
    for m in munis:
        seeds += [f"{args.probe} {m}", f"{m} {args.probe}"]

    metrics = {}
    for n, batch in enumerate(chunks(seeds, 20), 1):
        for d in keyword_ideas(client, customer_id, geo, batch):
            metrics[d["keyword"].lower()] = d
        print(f"  batch {n} ok")
        time.sleep(3)

    rows = []
    for m in munis:
        best = None
        for variant in (f"{args.probe} {m}", f"{m} {args.probe}"):
            d = metrics.get(variant.lower())
            if d and (best is None or d["v"] > best["v"]):
                best = d
        rows.append({"muni": m, "volume": best["v"] if best else 0,
                     "competition": best["comp"] if best else "UNSPECIFIED"})

    rows.sort(key=lambda r: r["volume"], reverse=True)
    with open(args.out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["muni", "volume", "competition"])
        w.writeheader()
        w.writerows(rows)

    print(f"\n✓ {len(rows)} municipalities written to {args.out}:\n")
    for r in rows:
        print(f"  {r['volume']:>6} | {r['competition']:<6} | {r['muni']}")
    print("\nNext: Claude shows this list for approval (checkpoint 2).")


if __name__ == "__main__":
    main()
