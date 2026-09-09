"""Build a plumber x city keyword matrix for the Core GTA.

Uses KeywordPlanIdeaService.generate_keyword_historical_metrics to get exact
avg monthly search volume for each [template] [city] combo. Keeps cells with
>= 10 searches/mo. Any city whose cells are all < 10 is folded into Toronto.

Outputs matrix.json (raw) for the markdown writer.
"""

import json
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
MIN_SEARCHES = 10

# Core GTA, approved. Toronto is the root; the rest fold into it if too thin.
ROOT = "Toronto"
CITIES = [
    "Toronto", "Scarborough", "North York", "Etobicoke", "East York", "York",
    "Mississauga", "Brampton", "Vaughan", "Markham", "Richmond Hill",
    "Oakville", "Pickering", "Ajax",
]

# Major high-intent keyword templates. {city} gets substituted.
TEMPLATES = [
    "plumber {city}",
    "plumbing {city}",
    "{city} plumber",
    "emergency plumber {city}",
    "24 hour plumber {city}",
    "plumbing company {city}",
    "plumbing companies {city}",
    "plumbing services {city}",
    "plumbing contractor {city}",
    "plumbers {city}",
    "drain cleaning {city}",
    "water heater repair {city}",
    "residential plumber {city}",
    "commercial plumber {city}",
]

# Build full combo list + reverse map keyword -> (city, template)
combos = []
meta = {}
for city in CITIES:
    for tpl in TEMPLATES:
        kw = tpl.format(city=city).lower()
        combos.append(kw)
        meta[kw] = {"city": city, "template": tpl}

svc = client.get_service("KeywordPlanIdeaService")
comp_enum = client.enums.KeywordPlanCompetitionLevelEnum


def chunks(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]


results = {}  # keyword -> metrics dict
for batch in chunks(combos, 100):
    request = client.get_type("GenerateKeywordHistoricalMetricsRequest")
    request.customer_id = customer_id
    request.language = ENGLISH
    request.geo_target_constants = [CANADA]
    request.keyword_plan_network = client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
    request.keywords.extend(batch)

    response = svc.generate_keyword_historical_metrics(request=request)
    for r in response.results:
        m = r.keyword_metrics
        vol = m.avg_monthly_searches or 0
        results[r.text.lower()] = {
            "volume": vol,
            "competition": comp_enum(m.competition).name,
            "cpc_low": round((m.low_top_of_page_bid_micros or 0) / 1_000_000, 2),
            "cpc_high": round((m.high_top_of_page_bid_micros or 0) / 1_000_000, 2),
        }

# Assemble per-city, applying the >=10 filter and Toronto-fold rule.
by_city = {c: [] for c in CITIES}
folded = []  # (keyword, volume) folded into Toronto because < 10

for kw, info in meta.items():
    data = results.get(kw)
    if not data:
        continue
    vol = data["volume"]
    row = {"keyword": kw, **data}
    if vol >= MIN_SEARCHES:
        by_city[info["city"]].append(row)
    else:
        folded.append({"keyword": kw, "volume": vol, "from_city": info["city"]})

# A city with zero surviving cells = "too few results" -> note it folds into Toronto.
empty_cities = [c for c in CITIES if c != ROOT and not by_city[c]]

# Sort each city's keywords by volume desc
for c in by_city:
    by_city[c].sort(key=lambda r: r["volume"], reverse=True)

out = {
    "by_city": by_city,
    "folded": sorted(folded, key=lambda r: -r["volume"]),
    "empty_cities": empty_cities,
    "min_searches": MIN_SEARCHES,
    "root": ROOT,
}
with open(os.path.join(os.path.dirname(__file__), "matrix.json"), "w") as f:
    json.dump(out, f, indent=2)

kept = sum(len(v) for v in by_city.values())
print(f"\n✓ {kept} keywords >= {MIN_SEARCHES}/mo kept | {len(folded)} folded (<10) | "
      f"{len(empty_cities)} thin cities -> Toronto\n")
for c in CITIES:
    rows = by_city[c]
    if rows:
        top = rows[0]
        print(f"  {c:<14} {len(rows):>2} kw  | top: {top['keyword']} ({top['volume']})")
    else:
        print(f"  {c:<14}  0 kw  -> folds into {ROOT}")
