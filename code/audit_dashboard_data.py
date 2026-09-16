"""Gather every read the audit dashboard needs, in one run, into one JSON.
Read-only. Produces code/cache/<customer>-dashboard-<date>.json with the blocks the
report template consumes (see references/audit-dashboard-spec.md):
  adTable · assetTable · adBuild · adGroups · finalUrls · retargeting · adTypes · autoApply · gbp
Usage: python3 code/audit_dashboard_data.py [--days 365] [--cities <city one>,<city two>,...]
Every query names campaign.status in SELECT when it filters on it (API v24 rule).
"""
import argparse, datetime, json, os, re, sys
from collections import defaultdict
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402

ap = argparse.ArgumentParser(); ap.add_argument("--days", type=int, default=365); ap.add_argument("--cities", default="")
args = ap.parse_args()
client, cid = load_client(); ga = client.get_service("GoogleAdsService")
end = datetime.date.today(); start = end - datetime.timedelta(days=args.days); WIN = f"segments.date BETWEEN '{start}' AND '{end}'"
CITIES = [c.strip().lower() for c in args.cities.split(",") if c.strip()]
Q = lambda q: ga.search(customer_id=cid, query=q)
out = {"customer": cid, "window": f"{start} to {end}", "generated": str(end)}

# ---- live campaigns
live = {}
for r in Q("SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type FROM campaign WHERE campaign.status='ENABLED'"):
    live[r.campaign.id] = {"name": r.campaign.name, "type": r.campaign.advertising_channel_type.name}
out["campaigns"] = live
city_of = lambda n: next((c for c in CITIES if c in n.lower()), "")

# ---- keywords per ad group (for the build checks)
kws = defaultdict(set)
for r in Q("SELECT ad_group.id, ad_group_criterion.keyword.text FROM ad_group_criterion WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_criterion.status='ENABLED' AND ad_group_criterion.negative=FALSE AND ad_group_criterion.type='KEYWORD'"):
    kws[r.ad_group.id].add(re.sub(r'[+\[\]"]', '', r.ad_group_criterion.keyword.text.lower()))

# ---- ads: table rows + build checks + ad groups
ads, build, groups, ads_checks = [], [], defaultdict(lambda: {"enabled_ads": 0}), []
perf = {}
for r in Q(f"SELECT ad_group_ad.ad.id, ad_group_ad.status, campaign.status, metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros FROM ad_group_ad WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_ad.status='ENABLED' AND campaign.advertising_channel_type='SEARCH' AND {WIN}"):
    m = r.metrics; perf[r.ad_group_ad.ad.id] = {"impressions": m.impressions, "clicks": m.clicks, "conv": round(m.conversions, 1), "cost": round(m.cost_micros / 1e6, 2)}
for r in Q("""SELECT campaign.name, campaign.status, ad_group.id, ad_group.name, ad_group_ad.ad.id, ad_group_ad.status, ad_group_ad.ad.final_urls, ad_group_ad.ad_strength,
  ad_group_ad.ad.responsive_search_ad.headlines, ad_group_ad.ad.responsive_search_ad.descriptions, ad_group_ad.ad.responsive_search_ad.path1
  FROM ad_group_ad WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_ad.status='ENABLED' AND campaign.advertising_channel_type='SEARCH' AND ad_group_ad.ad.type='RESPONSIVE_SEARCH_AD'"""):
    a = r.ad_group_ad.ad; rsa = a.responsive_search_ad; hs, ds = rsa.headlines, rsa.descriptions; city = city_of(r.campaign.name)
    h1 = [h.text for h in hs if h.pinned_field.name == 'HEADLINE_1']; pinned = sum(1 for h in hs if h.pinned_field.name not in ('UNSPECIFIED', 'UNKNOWN'))
    url = list(a.final_urls)[0] if a.final_urls else ''; path = re.sub(r'https?://[^/]+', '', url).split('?')[0].strip('/')
    htext = ' '.join(h.text.lower() for h in hs)
    checks = {"15 headlines": len(hs) >= 15, "4 descriptions": len(ds) >= 4,
              "city in pinned headline 1": bool(h1) and any(('{location' in x.lower()) or (city and city in x.lower()) for x in h1),
              "pinned headline 1 exists": bool(h1), "not over-pinned (3 or fewer pins)": pinned <= 3,
              "keyword in a headline": any(all(w in htext for w in k.split()) for k in kws.get(r.ad_group.id, set())),
              "dedicated landing page, not the homepage": bool(path), "page names the city": bool(city) and city in path.lower(), "display path filled": bool(rsa.path1)}
    ads_checks.append({"campaign": r.campaign.name, "ad_group": r.ad_group.name, "ad_id": a.id, "checks": checks})
    fails = [k for k, v in checks.items() if not v]
    if fails: build.append({"campaign": r.campaign.name, "what": f"{r.ad_group.name} ad {a.id}: " + '; '.join(fails), "tag": 'your proof' if any(x in ('15 headlines', '4 descriptions') for x in fails) else 'bigger build', "fails": fails})
    p = perf.get(a.id, {"impressions": 0, "clicks": 0, "conv": 0, "cost": 0})
    ads.append({"campaign": r.campaign.name, "ad_group": r.ad_group.name, "ad_id": a.id, "score": r.ad_group_ad.ad_strength.name.title(), **p})
    groups[(r.campaign.name, r.ad_group.name)]["enabled_ads"] += 1; groups[(r.campaign.name, r.ad_group.name)]["ad_group_id"] = r.ad_group.id
T = [sum(x["impressions"] for x in ads), sum(x["clicks"] for x in ads), sum(x["conv"] for x in ads), sum(x["cost"] for x in ads)]
out["adTable"] = {"window": out["window"], "avg": {"ctr": round(100 * T[1] / T[0], 2) if T[0] else 0, "cvr": round(100 * T[2] / T[1], 2) if T[1] else 0, "cpl": round(T[3] / T[2], 2) if T[2] else 0}, "ads": ads, "recentFix": {}}
out["adBuild"] = build
out["adBuildAll"] = [{"campaign": a["campaign"], "ad_group": a["ad_group"], "ad_id": a["ad_id"], "checks": a["checks"]} for a in ads_checks]
out["adGroups"] = [{"campaign": c, "ad_group": g, **v} for (c, g), v in groups.items()]

# ---- assets: coverage per campaign (account + campaign + ad group level) and 365-day performance
TYPES = ['SITELINK', 'CALLOUT', 'STRUCTURED_SNIPPET', 'CALL', 'LEAD_FORM', 'BUSINESS_MESSAGE', 'LOCATION', 'AD_IMAGE', 'MARKETING_IMAGE', 'BUSINESS_NAME', 'BUSINESS_LOGO', 'PRICE', 'MOBILE_APP', 'PROMOTION']
acct = defaultdict(int)
for r in Q("SELECT customer_asset.field_type, customer_asset.status FROM customer_asset WHERE customer_asset.status='ENABLED'"): acct[r.customer_asset.field_type.name] += 1
camp = defaultdict(lambda: defaultdict(int))
for r in Q("SELECT campaign.id, campaign.status, campaign_asset.field_type, campaign_asset.status FROM campaign_asset WHERE campaign.status='ENABLED' AND campaign_asset.status='ENABLED'"): camp[r.campaign.id][r.campaign_asset.field_type.name] += 1
for r in Q("SELECT campaign.id, campaign.status, ad_group_asset.field_type, ad_group_asset.status FROM ad_group_asset WHERE campaign.status='ENABLED' AND ad_group_asset.status='ENABLED'"): camp[r.campaign.id][r.ad_group_asset.field_type.name] += 1
fperf = defaultdict(lambda: [0, 0, 0.0])
for r in Q(f"SELECT asset_field_type_view.field_type, metrics.impressions, metrics.clicks, metrics.conversions FROM asset_field_type_view WHERE {WIN}"):
    p = fperf[r.asset_field_type_view.field_type.name]; p[0] += r.metrics.impressions; p[1] += r.metrics.clicks; p[2] += r.metrics.conversions
loc_sync = any(r.asset_set.type_.name == 'LOCATION_SYNC' for r in Q("SELECT customer_asset_set.asset_set, customer_asset_set.status, asset_set.type FROM customer_asset_set WHERE customer_asset_set.status='ENABLED'"))
rows = []
for t in TYPES:
    if t == 'MARKETING_IMAGE': continue  # Search images are AD_IMAGE; MARKETING_IMAGE counts into the same row below
    have = [c for c in live if acct.get(t, 0) or camp[c].get(t, 0) or (t == 'AD_IMAGE' and (camp[c].get('MARKETING_IMAGE', 0) or acct.get('MARKETING_IMAGE', 0))) or (t == 'LOCATION' and loc_sync)]
    i, c, cv = fperf.get(t, [0, 0, 0.0]); i2, c2, cv2 = fperf.get('MARKETING_IMAGE', [0, 0, 0.0]) if t == 'AD_IMAGE' else (0, 0, 0.0)
    rows.append({"type": t, "account": acct.get(t, 0), "campaigns_with": len(have), "campaigns_total": len(live), "missing": [live[x]["name"] for x in live if x not in have], "impressions": i + i2, "clicks": c + c2, "conv": round(cv + cv2, 1)})
out["assets"] = rows

# ---- final URLs per ad group and asset group (for cro_score.py)
urls = defaultdict(set)
for r in Q("SELECT campaign.name, campaign.status, ad_group.name, ad_group_ad.ad.final_urls, ad_group_ad.status FROM ad_group_ad WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_ad.status='ENABLED' AND campaign.advertising_channel_type='SEARCH'"):
    for u in r.ad_group_ad.ad.final_urls: urls[re.sub(r"\?.*$", "", u).rstrip("/")].add(f"{r.campaign.name.split(' - Ads')[0]} / {r.ad_group.name}")
for r in Q("SELECT campaign.name, campaign.status, asset_group.name, asset_group.final_urls, asset_group.status FROM asset_group WHERE campaign.status='ENABLED' AND asset_group.status='ENABLED'"):
    for u in r.asset_group.final_urls: urls[re.sub(r"\?.*$", "", u).rstrip("/")].add(f"{r.campaign.name} / {r.asset_group.name} (PMax)")
out["finalUrls"] = {u: sorted(v) for u, v in urls.items()}

# ---- retargeting
lists = [{"name": r.user_list.name, "search": r.user_list.size_for_search} for r in Q("SELECT user_list.name, user_list.size_for_search, user_list.membership_status FROM user_list WHERE user_list.membership_status='OPEN'")]
targeting = 0
for r in Q("SELECT campaign.name, campaign.status, campaign.targeting_setting.target_restrictions, campaign_criterion.user_list.user_list, campaign_criterion.negative FROM campaign_criterion WHERE campaign.status='ENABLED' AND campaign_criterion.type='USER_LIST'"):
    obs = any(t.bid_only for t in r.campaign.targeting_setting.target_restrictions if t.targeting_dimension.name == 'AUDIENCE')
    if not obs and not r.campaign_criterion.negative: targeting += 1
out["retargeting"] = {"lists": lists, "big_lists": [l for l in lists if l["search"] >= 1000], "live_campaigns_targeting_a_list": targeting}

# ---- ad types, GBP, auto-apply
out["adTypes"] = {"search": any(v["type"] == 'SEARCH' for v in live.values()), "pmax": any(v["type"] == 'PERFORMANCE_MAX' for v in live.values()), "maps_attached": loc_sync, "maps_impressions_365d": fperf.get('LOCATION', [0])[0], "gbp_linked": loc_sync}
subs = [(r.recommendation_subscription.type_.name, r.recommendation_subscription.status.name) for r in Q("SELECT recommendation_subscription.type, recommendation_subscription.status FROM recommendation_subscription")]
out["autoApply"] = {"enabled": sum(1 for _, s in subs if s == 'ENABLED'), "unknown_enabled": sum(1 for t, s in subs if s == 'ENABLED' and t == 'UNKNOWN'), "total": len(subs)}

path = f"code/cache/{cid}-dashboard-{end}.json"; json.dump(out, open(path, "w"), indent=1)
print(f"wrote {path} · {len(live)} live campaigns · {len(ads)} ads · {len(build)} ads failing build checks · {len(rows)} asset types · {len(out['finalUrls'])} final URLs · maps impressions {out['adTypes']['maps_impressions_365d']} · auto-apply on {out['autoApply']['enabled']}")
