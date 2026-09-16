"""Exact-stem metrics: volume + LOW and HIGH top-of-page bid for a given stem list.

candidates.csv only carries the high-end bid. This pulls both ends for the
shortlist so keyword-list.md can quote an honest range.

Usage: python3 code/stem_metrics.py --stems-file stems.txt --country US
"""
import argparse, csv, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client, chunks, country_geo, resolve_city_geo, ENGLISH
from _business import country as home_country


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--stems-file", required=True)
    ap.add_argument("--country", default=None, help="ISO code. Default: the country in context/business.md")
    ap.add_argument("--city", help="pin volumes to one city instead of the whole country")
    ap.add_argument("--out", default="stem-metrics.csv")
    args = ap.parse_args()
    args.country = (args.country or home_country() or "").upper()
    if not args.country:
        sys.exit("no country - set 'Country customers search from' in context/business.md, or pass --country XX")

    stems = [s.strip() for s in open(args.stems_file) if s.strip()]
    client, cid = load_client()
    geo = (resolve_city_geo(client, args.city, args.country)[0] if args.city
           else country_geo(args.country))
    print(f"geo target: {args.city or args.country} -> {geo}")
    svc = client.get_service("KeywordPlanIdeaService")
    comp = client.enums.KeywordPlanCompetitionLevelEnum

    rows = []
    for n, batch in enumerate(chunks(stems, 20), 1):
        req = client.get_type("GenerateKeywordHistoricalMetricsRequest")
        req.customer_id = cid
        req.language = ENGLISH
        req.geo_target_constants = [geo]
        req.include_adult_keywords = False
        req.keyword_plan_network = client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
        req.keywords.extend(batch)
        resp = svc.generate_keyword_historical_metrics(request=req)
        for r in resp.results:
            m = r.keyword_metrics
            rows.append({
                "keyword": r.text,
                "v": m.avg_monthly_searches or 0,
                "comp": comp(m.competition).name,
                "cpc_low": round((m.low_top_of_page_bid_micros or 0) / 1_000_000, 2),
                "cpc_high": round((m.high_top_of_page_bid_micros or 0) / 1_000_000, 2),
            })
        print(f"  batch {n} ok ({len(rows)} rows)")
        time.sleep(2)

    with open(args.out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["keyword", "v", "comp", "cpc_low", "cpc_high"])
        w.writeheader(); w.writerows(rows)
    print(f"\n✓ {len(rows)} stems written to {args.out}")


if __name__ == "__main__":
    main()
