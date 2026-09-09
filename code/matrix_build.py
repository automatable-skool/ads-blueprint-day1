"""Build the [service] x [city] matrix for Toronto-area plumbing.

For every service (top-10 from keyword-list.md, "near me" flattened into
"plumber") x every candidate GTA municipality, pull the real Google Ads Keyword
Planner volume for both phrasings ("{service} {city}" and "{city} {service}"),
keep the higher-volume phrasing, drop anything < 50/mo, rank by search volume.

Writes:
  - matrix.csv         every combo with volume >= 1 (full data)
  - keyword-list.md    top 50 (>=50/mo) + a drafts section (next up to 500)
"""

import csv
import os
import time
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.api_core.exceptions import ResourceExhausted

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
HERE = os.path.dirname(__file__)

CANADA = "geoTargetConstants/2124"
ENGLISH = "languageConstants/1000"
MIN = 50

# 9 distinct service stems (top-10 services; "plumber near me" -> "plumber").
SERVICES = [
    "plumber",
    "emergency plumber",
    "drain cleaning",
    "garbage disposal repair",
    "water softener installation",
    "sump pump installation",
    "septic tank pumping",
    "toilet installation",
    "water heater installation",
]

# All candidate municipalities (incl. Toronto sub-districts). The >=50 per-combo
# filter decides which actually survive per service.
CITIES = [
    "toronto", "north york", "scarborough", "etobicoke", "east york", "york",
    "downtown toronto", "mississauga", "brampton", "caledon", "vaughan",
    "markham", "richmond hill", "newmarket", "aurora", "thornhill", "woodbridge",
    "maple", "king city", "stouffville", "georgina", "east gwillimbury",
    "pickering", "ajax", "whitby", "oshawa", "clarington", "bowmanville",
    "oakville", "burlington", "milton", "halton hills", "georgetown", "hamilton",
]

svc = client.get_service("KeywordPlanIdeaService")
comp_enum = client.enums.KeywordPlanCompetitionLevelEnum

# Build the exact phrasings we want metrics for.
wanted = {}  # phrase -> (service, city)
for s in SERVICES:
    for c in CITIES:
        wanted[f"{s} {c}"] = (s, c)
        wanted[f"{c} {s}"] = (s, c)

seeds = list(wanted.keys())


def chunks(xs, n):
    for i in range(0, len(xs), n):
        yield xs[i:i + n]


def fetch(batch, attempt=0):
    """One GenerateKeywordIdeas call with exponential backoff on rate limits."""
    req = client.get_type("GenerateKeywordIdeasRequest")
    req.customer_id = customer_id
    req.language = ENGLISH
    req.geo_target_constants = [CANADA]
    req.include_adult_keywords = False
    req.keyword_plan_network = client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
    req.keyword_seed.keywords.extend(batch)
    try:
        return list(svc.generate_keyword_ideas(request=req))
    except ResourceExhausted:
        if attempt >= 6:
            raise
        wait = 5 * (attempt + 1)
        print(f"  rate-limited, retrying in {wait}s …")
        time.sleep(wait)
        return fetch(batch, attempt + 1)


metrics = {}  # phrase -> (volume, competition)
batches = list(chunks(seeds, 20))
for n, batch in enumerate(batches, 1):
    for idea in fetch(batch):
        m = idea.keyword_idea_metrics
        metrics[idea.text.lower()] = (
            m.avg_monthly_searches or 0,
            comp_enum(m.competition).name,
        )
    print(f"  batch {n}/{len(batches)} ok ({len(metrics)} phrases)")
    time.sleep(3)  # pace under the per-method rate limit

# Collapse the two phrasings per (service, city) -> best volume + its phrase.
combos = {}  # (service, city) -> dict
for s in SERVICES:
    for c in CITIES:
        best = None
        for phrase in (f"{s} {c}", f"{c} {s}"):
            if phrase in metrics:
                v, comp = metrics[phrase]
                if best is None or v > best["volume"]:
                    best = {"keyword": phrase, "volume": v, "competition": comp}
        if best and best["volume"] > 0:
            best.update(service=s, city=c)
            combos[(s, c)] = best

rows = sorted(combos.values(), key=lambda r: r["volume"], reverse=True)

# Full data dump
with open(os.path.join(HERE, "matrix.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["keyword", "service", "city", "volume", "competition"])
    w.writeheader()
    for r in rows:
        w.writerow({k: r[k] for k in w.fieldnames})

kept = [r for r in rows if r["volume"] >= MIN]
top = kept[:50]
drafts = kept[50:550]  # next up to 500


def fmt(r):
    return (f"| {r['keyword']} | {r['service']} | {r['city'].title()} | "
            f"{r['volume']:,} | {r['competition'].title()} |")


lines = [
    "# Toronto Plumbing — Service × City Matrix (Google Ads Keyword Planner)",
    "",
    "Source: Google Ads Keyword Planner (`KeywordPlanIdeaService`), language = "
    "English, network = Google Search, keyword-string volume (Canada geo).",
    "",
    f"9 service stems × {len(CITIES)} GTA municipalities. Both phrasings "
    "(`service city` / `city service`) pulled; higher-volume phrasing kept. "
    "Flattened *near me*, duplicates and brands. Kept combos ≥ "
    f"{MIN}/mo, ranked by search volume. {len(kept)} keywords cleared the floor.",
    "",
    "## Top 50",
    "",
    "| # | Keyword | Service | City | Volume (/mo) | Competition |",
    "|---|---------|---------|------|-------------:|-------------|",
]
for i, r in enumerate(top, 1):
    lines.append(f"| {i} " + fmt(r))

lines += [
    "",
    f"## Drafts (next {len(drafts)}, still ≥ {MIN}/mo)",
    "",
    "| Keyword | Service | City | Volume (/mo) | Competition |",
    "|---------|---------|------|-------------:|-------------|",
]
for r in drafts:
    lines.append(fmt(r))
lines.append("")

with open(os.path.join(HERE, "keyword-list.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"✓ combos with volume: {len(rows)} | ≥{MIN}/mo: {len(kept)} | "
      f"top 50 + {len(drafts)} drafts written to keyword-list.md\n")
for i, r in enumerate(top[:25], 1):
    print(f"{i:>2}. {r['volume']:>5}/mo | {r['competition']:<6} | {r['keyword']}")
