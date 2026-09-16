"""Shared helpers for the /keyword-research skill scripts.

Runs in the CURRENT project directory: reads ./.env for Google Ads credentials.
"""

import os
import re
import sys
import time

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.api_core.exceptions import ResourceExhausted

ENGLISH = "languageConstants/1000"

# ISO country code -> Google Ads country geo target constant (keyword-string volume)
COUNTRY_GEO = {
    "CA": "geoTargetConstants/2124", "US": "geoTargetConstants/2840",
    "GB": "geoTargetConstants/2826", "AU": "geoTargetConstants/2036",
    "NZ": "geoTargetConstants/2554", "IE": "geoTargetConstants/2372",
}

# Account-level junk filter (buyer-intent safety net): jobs / DIY / parts / info / free.
ACCOUNT_NEG = re.compile(
    r"\b("
    r"job|jobs|hiring|career|careers|salary|salaries|wage|wages|apprentice|"
    r"apprenticeship|union|school|schools|college|course|courses|training|"
    r"certification|certificate|exam|"
    r"diy|how to|howto|yourself|tutorial|tutorials|guide|guides|youtube|video|"
    r"videos|template|meaning|definition|wikipedia|wiki|reddit|quora|forum|"
    r"forums|blog|review|reviews|rating|ratings|"
    r"free|cheap|coupon|coupons|voucher|discount|sample|samples|clearance|"
    r"part|parts|supply|supplies|wholesale|fitting|fittings|diagram|schematic|"
    r"manual|complaint|refund|cancel|login|"
    r"home depot|lowes|rona|canadian tire|amazon|wayfair|ikea"
    r")\b"
)


def load_client():
    load_dotenv(os.path.join(os.getcwd(), ".env"))
    cfg = {
        "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
        "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
        "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
        "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
        "use_proto_plus": True,
    }
    miss = [k for k, v in cfg.items() if v is None and k != "login_customer_id"]
    if miss:
        sys.exit(f"Missing Google Ads credentials in ./.env: {miss}")
    return GoogleAdsClient.load_from_dict(cfg), os.getenv("GOOGLE_ADS_CUSTOMER_ID")


def chunks(xs, n):
    for i in range(0, len(xs), n):
        yield xs[i:i + n]


def resolve_city_geo(client, city, country_code=None):
    """Return (geo_resource_name, country_code) for a city name."""
    s = client.get_service("GeoTargetConstantService")
    req = client.get_type("SuggestGeoTargetConstantsRequest")
    req.locale = "en"
    if country_code:
        req.country_code = country_code
    req.location_names.names.append(city)
    resp = s.suggest_geo_target_constants(req)
    best, best_score = None, -1
    for g in resp.geo_target_constant_suggestions:
        gt = g.geo_target_constant
        if gt.status.name != "ENABLED":
            continue
        name_match = gt.name.lower() == city.lower()
        type_pref = gt.target_type in ("City", "Municipality", "Postal Code")
        score = (2 if name_match else 0) + (1 if type_pref else 0)
        if score > best_score:
            best, best_score = gt, score
    if not best:
        sys.exit(f"Could not resolve a geo target for city: {city!r}")
    return best.resource_name, best.country_code


def country_geo(country_code):
    return COUNTRY_GEO.get((country_code or "").upper())


def keyword_ideas(client, customer_id, geo, seeds, attempt=0):
    """Yield keyword ideas for up-to-20 seeds, with exponential backoff."""
    svc = client.get_service("KeywordPlanIdeaService")
    comp = client.enums.KeywordPlanCompetitionLevelEnum
    req = client.get_type("GenerateKeywordIdeasRequest")
    req.customer_id = customer_id
    req.language = ENGLISH
    req.geo_target_constants = [geo]
    req.include_adult_keywords = False
    req.keyword_plan_network = client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
    req.keyword_seed.keywords.extend(seeds)
    try:
        ideas = list(svc.generate_keyword_ideas(request=req))
    except ResourceExhausted:
        if attempt >= 6:
            raise
        wait = 5 * (attempt + 1)
        print(f"  rate-limited, retrying in {wait}s …")
        time.sleep(wait)
        yield from keyword_ideas(client, customer_id, geo, seeds, attempt + 1)
        return
    for idea in ideas:
        m = idea.keyword_idea_metrics
        yield {
            "keyword": idea.text,
            "v": m.avg_monthly_searches or 0,
            "comp": comp(m.competition).name,
            "cpc": (m.high_top_of_page_bid_micros or 0) / 1_000_000,
        }


def pull_existing_negatives(client, customer_id):
    """Every negative keyword in the account at every level, plus the enabled keywords.
    The shape /search-terms caches as code/cache/negatives-existing.json - the conflict
    check in build_search_terms_report.py reads it, and the command reports the live
    campaign-negative count per campaign from it. Read-only."""
    ga = client.get_service("GoogleAdsService")

    def rows(q):
        return ga.search(customer_id=customer_id, query=q)

    out = {"campaign_negs": [], "adgroup_negs": [], "shared": [], "attached": [], "keywords": []}
    for r in rows("""
        SELECT campaign.id, campaign.name, campaign.status,
               campaign_criterion.keyword.text, campaign_criterion.keyword.match_type
        FROM campaign_criterion
        WHERE campaign_criterion.negative = TRUE AND campaign_criterion.type = 'KEYWORD'"""):
        out["campaign_negs"].append({
            "cid": str(r.campaign.id), "campaign": r.campaign.name, "status": r.campaign.status.name,
            "text": r.campaign_criterion.keyword.text, "match": r.campaign_criterion.keyword.match_type.name})
    for r in rows("""
        SELECT campaign.id, campaign.name, campaign.status, ad_group.id, ad_group.name, ad_group.status,
               ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type
        FROM ad_group_criterion
        WHERE ad_group_criterion.negative = TRUE AND ad_group_criterion.type = 'KEYWORD'"""):
        out["adgroup_negs"].append({
            "cid": str(r.campaign.id), "campaign": r.campaign.name, "cstatus": r.campaign.status.name,
            "ag": r.ad_group.name, "agid": str(r.ad_group.id), "agstatus": r.ad_group.status.name,
            "text": r.ad_group_criterion.keyword.text, "match": r.ad_group_criterion.keyword.match_type.name})
    for r in rows("""
        SELECT shared_set.id, shared_set.name, shared_set.type, shared_set.status,
               shared_criterion.keyword.text, shared_criterion.keyword.match_type
        FROM shared_criterion
        WHERE shared_set.type = 'NEGATIVE_KEYWORDS'"""):
        out["shared"].append({
            "set": r.shared_set.name, "setid": str(r.shared_set.id), "type": r.shared_set.type_.name,
            "status": r.shared_set.status.name,
            "text": r.shared_criterion.keyword.text, "match": r.shared_criterion.keyword.match_type.name})
    for r in rows("""
        SELECT campaign.id, campaign.name, campaign.status, shared_set.id, shared_set.name
        FROM campaign_shared_set
        WHERE campaign_shared_set.status = 'ENABLED' AND shared_set.type = 'NEGATIVE_KEYWORDS'"""):
        out["attached"].append({
            "cid": str(r.campaign.id), "campaign": r.campaign.name, "cstatus": r.campaign.status.name,
            "setid": str(r.shared_set.id), "set": r.shared_set.name})
    for r in rows("""
        SELECT customer_negative_criterion.negative_keyword_list.shared_set
        FROM customer_negative_criterion
        WHERE customer_negative_criterion.type = 'NEGATIVE_KEYWORD_LIST'"""):
        ss = r.customer_negative_criterion.negative_keyword_list.shared_set
        if ss:
            out["attached"].append({"cid": "account", "campaign": "ACCOUNT LEVEL", "cstatus": "ENABLED",
                                    "setid": ss.split("/")[-1], "set": ss})
    for r in rows("""
        SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
               ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type
        FROM ad_group_criterion
        WHERE ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = FALSE
          AND ad_group_criterion.status = 'ENABLED' AND ad_group.status = 'ENABLED'
          AND campaign.status = 'ENABLED'"""):
        out["keywords"].append({
            "cid": str(r.campaign.id), "campaign": r.campaign.name, "ag": r.ad_group.name,
            "agid": str(r.ad_group.id), "text": r.ad_group_criterion.keyword.text,
            "match": r.ad_group_criterion.keyword.match_type.name, "status": "ENABLED"})
    return out
