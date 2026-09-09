"""Validate which GTA municipalities have real plumbing search volume.

Pulls Google Ads Keyword Planner volume for "plumber {muni}" / "{muni} plumber"
across candidate municipalities so we only build the matrix on places with
genuine demand. Geo = Canada (keyword-string volume), language = English.
Writes municipalities.csv (muni, best_volume, competition) sorted by volume.
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

CANADA = "geoTargetConstants/2124"
ENGLISH = "languageConstants/1000"

# Candidate municipalities: Toronto's former boroughs/districts + the 905 belt
# (Peel, York, Durham, Halton) + Hamilton.
MUNIS = [
    # City of Toronto districts
    "toronto", "north york", "scarborough", "etobicoke", "east york", "york",
    "downtown toronto",
    # Peel
    "mississauga", "brampton", "caledon",
    # York Region
    "vaughan", "markham", "richmond hill", "newmarket", "aurora", "thornhill",
    "woodbridge", "maple", "king city", "stouffville", "georgina",
    "east gwillimbury",
    # Durham
    "pickering", "ajax", "whitby", "oshawa", "clarington", "bowmanville",
    # Halton
    "oakville", "burlington", "milton", "halton hills", "georgetown",
    # Nearby
    "hamilton",
]

seeds = []
for m in MUNIS:
    seeds.append(f"plumber {m}")
    seeds.append(f"{m} plumber")

svc = client.get_service("KeywordPlanIdeaService")
comp_enum = client.enums.KeywordPlanCompetitionLevelEnum


def chunks(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]


metrics_by_kw = {}
for batch in chunks(seeds, 20):
    req = client.get_type("GenerateKeywordIdeasRequest")
    req.customer_id = customer_id
    req.language = ENGLISH
    req.geo_target_constants = [CANADA]
    req.include_adult_keywords = False
    req.keyword_plan_network = client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
    req.keyword_seed.keywords.extend(batch)
    for idea in svc.generate_keyword_ideas(request=req):
        m = idea.keyword_idea_metrics
        metrics_by_kw[idea.text.lower()] = (
            m.avg_monthly_searches or 0,
            comp_enum(m.competition).name,
        )


rows = []
for m in MUNIS:
    best_v, best_c = 0, "UNSPECIFIED"
    for variant in (f"plumber {m}", f"{m} plumber"):
        if variant in metrics_by_kw:
            v, c = metrics_by_kw[variant]
            if v > best_v:
                best_v, best_c = v, c
    rows.append({"muni": m, "volume": best_v, "competition": best_c})

rows.sort(key=lambda r: r["volume"], reverse=True)

out = os.path.join(os.path.dirname(__file__), "municipalities.csv")
with open(out, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["muni", "volume", "competition"])
    w.writeheader()
    w.writerows(rows)

print(f"✓ {len(rows)} municipalities (plumber + city volume), Canada geo:\n")
for r in rows:
    print(f"  {r['volume']:>5} | {r['competition']:<6} | {r['muni']}")
