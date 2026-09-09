"""Generate Google Ads keyword ideas for a plumbing business in Toronto.

Calls KeywordPlanIdeaService.generate_keyword_ideas, geo-targeted to Toronto,
filters to >= 10 avg monthly searches, and writes keyword / volume / competition
/ CPC to google-ads-keywords.csv.
"""

import csv
import os
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

load_dotenv()

config = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
    "use_proto_plus": True,
}

client = GoogleAdsClient.load_from_dict(config)
customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")

# Geo target: City of Toronto, Ontario, Canada = criterion 1002451 ; language English = 1000
# (1002005 was Lundar, Manitoba — wrong city; verified via GeoTargetConstantService.)
TORONTO = "geoTargetConstants/1002451"
ENGLISH = "languageConstants/1000"
# Pull the full candidate set (1,000+) so collapsing/ranking happens downstream.
MIN_SEARCHES = 1

# Seed keywords drawn from keyword-list.md (highest-intent buckets + service layer).
SEEDS = [
    "plumber", "plumbing", "emergency plumber", "24 hour plumber", "plumber near me",
    "local plumber", "plumbing company", "plumbing services", "plumbing contractor",
    "drain cleaning", "blocked drain", "clogged drain", "water heater repair",
    "water heater installation", "hot water tank replacement", "leak detection",
    "burst pipe", "sewer backup", "sewer line repair", "pipe repair", "repiping",
    "toilet repair", "toilet installation", "faucet repair", "sump pump installation",
    "gas line installation", "backflow testing", "hydro jetting", "trenchless sewer repair",
    "garbage disposal repair", "tankless water heater installation", "bathroom plumbing",
    "commercial plumber", "residential plumber", "affordable plumber", "best plumber",
]

keyword_plan_idea_service = client.get_service("KeywordPlanIdeaService")
keyword_competition_enum = client.enums.KeywordPlanCompetitionLevelEnum


def chunks(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]


rows = []
seen = set()
# generate_keyword_ideas allows max 20 seed keywords per request -> batch them.
for batch in chunks(SEEDS, 20):
    request = client.get_type("GenerateKeywordIdeasRequest")
    request.customer_id = customer_id
    request.language = ENGLISH
    request.geo_target_constants = [TORONTO]
    request.include_adult_keywords = False
    request.keyword_plan_network = (
        client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
    )
    request.keyword_seed.keywords.extend(batch)

    response = keyword_plan_idea_service.generate_keyword_ideas(request=request)

    for idea in response:
        metrics = idea.keyword_idea_metrics
        volume = metrics.avg_monthly_searches or 0
        if volume < MIN_SEARCHES:
            continue
        kw = idea.text.lower()
        if kw in seen:
            continue
        seen.add(kw)
        competition = keyword_competition_enum(metrics.competition).name
        # Micros -> CAD dollars
        cpc_low = (metrics.low_top_of_page_bid_micros or 0) / 1_000_000
        cpc_high = (metrics.high_top_of_page_bid_micros or 0) / 1_000_000
        rows.append({
            "keyword": idea.text,
            "avg_monthly_searches": volume,
            "competition": competition,
            "cpc_low_cad": round(cpc_low, 2),
            "cpc_high_cad": round(cpc_high, 2),
        })

# Sort by volume desc
rows.sort(key=lambda r: r["avg_monthly_searches"], reverse=True)

out_path = os.path.join(os.path.dirname(__file__), "google-ads-keywords.csv")
with open(out_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["keyword", "avg_monthly_searches", "competition", "cpc_low_cad", "cpc_high_cad"],
    )
    writer.writeheader()
    writer.writerows(rows)

print(f"\n✓ Wrote {len(rows)} candidate keywords (>= {MIN_SEARCHES} searches/mo, Toronto) to {out_path}")
print(f"  Candidates >= 50/mo: {sum(1 for r in rows if r['avg_monthly_searches'] >= 50)}\n")
for r in rows[:25]:
    print(f"  {r['avg_monthly_searches']:>7} | {r['competition']:<6} | "
          f"${r['cpc_low_cad']}-${r['cpc_high_cad']} | {r['keyword']}")
