"""Build the geo-target ID to city-name map the landing page needs.

    python3 code/build_geo_map.py --country CA --out website/lib/geo-map.json

Google's `{loc_physical_ms}` ValueTrack parameter puts a NUMERIC criterion id in the landing page
URL - `?loc=1002451` - never the city name. There is no API call that converts one to the other at
request time, so the map is pulled once and shipped with the site. (Field-verified 2 September
2026: the only source is `geo_target_constant`.)

The page then reads `?loc=` and swaps the headline: "Emergency Plumber in Hamilton" for somebody who
clicked in Hamilton. Message match is the single highest-lift change on a landing page - the ad
already says their city, and the page agreeing with it is worth more than any design work.
"""

import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402

# City and postal-town level only. Whole countries and provinces are useless in a headline, and
# neighbourhoods are too granular to read as a place people call home.
WANTED = {"City", "Postal Code", "Municipality", "Neighborhood"}


def main():
    ap = argparse.ArgumentParser(description="Pull geo target ids for one country.")
    ap.add_argument("--country", default="US", help="ISO country code, e.g. US or CA")
    ap.add_argument("--out", default="website/lib/geo-map.json")
    ap.add_argument("--types", nargs="*", default=["City"], help=f"target types to keep, from {sorted(WANTED)}")
    args = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    types = ", ".join(f"'{t}'" for t in args.types)
    query = f"""
        SELECT geo_target_constant.id, geo_target_constant.name,
               geo_target_constant.canonical_name, geo_target_constant.target_type
        FROM geo_target_constant
        WHERE geo_target_constant.country_code = '{args.country}'
          AND geo_target_constant.status = 'ENABLED'
          AND geo_target_constant.target_type IN ({types})
    """
    mapping = {}
    for row in ga.search(customer_id=customer_id, query=query):
        mapping[str(row.geo_target_constant.id)] = row.geo_target_constant.name

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as fh:
        json.dump(mapping, fh, ensure_ascii=False, separators=(",", ":"), sort_keys=True)

    size = os.path.getsize(args.out) / 1024
    print(f"✓ {len(mapping):,} places for {args.country} -> {args.out} ({size:.0f} KB)")
    print("  The page reads ?loc= and looks the id up here. Ships with the site - there is no")
    print("  API call that converts an id to a name at request time.")


if __name__ == "__main__":
    main()
