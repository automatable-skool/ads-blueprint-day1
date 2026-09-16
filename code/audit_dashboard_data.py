"""Read everything the audit dashboard needs from one Google Ads account, in one run, into one JSON.
Read-only. Pair with code/cro_score.py (pages) and code/build_audit_dashboard.py (assembles the page).
Usage: python3 code/audit_dashboard_data.py --config code/cache/<customer>-audit-config.json [--days 30] [--long 365]
Writes code/cache/<customer>-dashboard-<date>.json. Every query names campaign.status in SELECT when it filters on it (v24).
"""
import argparse, datetime, json, os, re, sys
from collections import defaultdict
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402

ap = argparse.ArgumentParser(); ap.add_argument("--config", required=True); ap.add_argument("--days", type=int, default=30); ap.add_argument("--long", type=int, default=365)
args = ap.parse_args(); CFG = json.load(open(args.config))
client, cid = load_client(); ga = client.get_service("GoogleAdsService")
end = datetime.date.today(); s30 = end - datetime.timedelta(days=args.days); s365 = end - datetime.timedelta(days=args.long); sprev = s30 - datetime.timedelta(days=args.days)
W30 = f"segments.date BETWEEN '{s30}' AND '{end}'"; W365 = f"segments.date BETWEEN '{s365}' AND '{end}'"; WPREV = f"segments.date BETWEEN '{sprev}' AND '{s30 - datetime.timedelta(days=1)}'"
CITIES = [c.lower() for c in CFG.get("cities", [])]
Q = lambda q: ga.search(customer_id=cid, query=q)
def _common_prefix(names):
    """The naming prefix every live campaign shares ("Brand - ", "Leads-"), cut back to a separator - read from the
    account itself so short() never carries a trade, a city or a brand."""
    names = [n for n in names if n]
    if len(names) < 2: return ""
    m = re.match(r"^(.*(?: - | \| | : |: |-|_| ))", os.path.commonprefix(names))
    return m.group(1) if m else ""
PREFIX = _common_prefix([r.campaign.name for r in Q("SELECT campaign.name, campaign.status FROM campaign WHERE campaign.status='ENABLED'")])
GEOCACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache", "geocode-cache.json")
def place_name(lat, lng):
    """Reverse-geocode a radius centre to a town name (OpenStreetMap Nominatim, cached, one call a second)."""
    import time, urllib.request, urllib.parse
    key = f"{lat:.3f},{lng:.3f}"
    cache = json.load(open(GEOCACHE)) if os.path.exists(GEOCACHE) else {}
    if key in cache: return cache[key]
    try:
        req = urllib.request.Request(f"https://nominatim.openstreetmap.org/reverse?{urllib.parse.urlencode({'lat': lat, 'lon': lng, 'format': 'json', 'zoom': 10})}", headers={"User-Agent": "ads-audit-dashboard/1.0"})
        a = json.load(urllib.request.urlopen(req, timeout=20)).get("address", {})
        name = a.get("city") or a.get("town") or a.get("village") or a.get("municipality") or a.get("county") or f"{lat:.2f}, {lng:.2f}"
        if a.get("state"): name += f", {a['state']}"
        time.sleep(1.1)
    except Exception: name = f"{lat:.2f}, {lng:.2f}"
    cache[key] = name; json.dump(cache, open(GEOCACHE, "w"), indent=1); return name
city_of = lambda n: next((c for c in CITIES if c in n.lower()), "")
short = lambda n: re.sub(r' - Ads \d.*$', '', n[len(PREFIX):] if PREFIX and n.startswith(PREFIX) else n)  # drops the shared naming prefix and a trailing " - Ads N" counter
out = {"customer": cid, "namePrefix": PREFIX, "generated": str(end), "window": f"{s30} to {end}", "long_window": f"{s365} to {end}", "config": CFG}

# ---------- account ----------
cu = next(iter(Q("SELECT customer.id, customer.descriptive_name, customer.currency_code, customer.time_zone, customer.auto_tagging_enabled, customer.call_reporting_setting.call_reporting_enabled, customer.call_reporting_setting.call_conversion_reporting_enabled, customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled FROM customer")))
out["account"] = {"name": cu.customer.descriptive_name, "currency": cu.customer.currency_code, "time_zone": cu.customer.time_zone, "auto_tagging": cu.customer.auto_tagging_enabled,
                  "call_reporting": cu.customer.call_reporting_setting.call_reporting_enabled, "call_conversion_reporting": cu.customer.call_reporting_setting.call_conversion_reporting_enabled,
                  "enhanced_conversions": cu.customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled}
acts = []
for r in Q(f"SELECT conversion_action.id, conversion_action.name, conversion_action.status, conversion_action.primary_for_goal, conversion_action.category, conversion_action.origin, conversion_action.type, conversion_action.include_in_conversions_metric, conversion_action.counting_type, conversion_action.click_through_lookback_window_days, conversion_action.phone_call_duration_seconds, metrics.all_conversions FROM conversion_action WHERE conversion_action.status='ENABLED' AND {W30}"):
    a = r.conversion_action; acts.append({"id": a.id, "name": a.name, "primary": a.primary_for_goal, "category": a.category.name, "origin": a.origin.name, "type": a.type_.name, "counted": a.include_in_conversions_metric, "counting": a.counting_type.name, "window_days": a.click_through_lookback_window_days, "call_seconds": a.phone_call_duration_seconds, "conv30": round(r.metrics.all_conversions, 1)})
goals = [{"category": g.customer_conversion_goal.category.name, "origin": g.customer_conversion_goal.origin.name, "biddable": g.customer_conversion_goal.biddable} for g in Q("SELECT customer_conversion_goal.category, customer_conversion_goal.origin, customer_conversion_goal.biddable FROM customer_conversion_goal")]
out["conversions"] = {"actions": acts, "goals": goals}
subs = [(r.recommendation_subscription.type_.name, r.recommendation_subscription.status.name) for r in Q("SELECT recommendation_subscription.type, recommendation_subscription.status FROM recommendation_subscription")]
google_changes = 0; google_changes_last = None
try:
    _ev = list(Q(f"SELECT change_event.change_date_time, change_event.client_type FROM change_event WHERE change_event.client_type='GOOGLE_ADS_RECOMMENDATIONS_SUBSCRIPTION' AND change_event.change_date_time >= '{max(s30, end - datetime.timedelta(days=29))} 00:00:00' AND change_event.change_date_time <= '{end} 23:59:59' LIMIT 500")); google_changes = len(_ev); google_changes_last = max((e.change_event.change_date_time[:10] for e in _ev), default=None)
except Exception: google_changes = -1
out["autoApply"] = {"enabled": sum(1 for _, s in subs if s == 'ENABLED'), "unknown_enabled": sum(1 for t, s in subs if s == 'ENABLED' and t == 'UNKNOWN'), "total": len(subs), "google_changes_30d": google_changes, "google_changes_last": google_changes_last}

# ---------- live campaigns with settings and money ----------
live = {}
for r in Q(f"""SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type, campaign.bidding_strategy_type, campaign.maximize_conversions.target_cpa_micros,
  campaign.network_settings.target_search_network, campaign.network_settings.target_content_network, campaign.network_settings.target_partner_search_network,
  campaign.geo_target_type_setting.positive_geo_target_type, campaign.asset_automation_settings, campaign.bidding_strategy_system_status, campaign.ad_serving_optimization_status, campaign_budget.amount_micros, campaign_budget.explicitly_shared,
  metrics.cost_micros, metrics.conversions, metrics.clicks, metrics.impressions, metrics.search_budget_lost_impression_share
  FROM campaign WHERE campaign.status='ENABLED' AND {W30}"""):
    c = r.campaign; m = r.metrics
    auto = {s.asset_automation_type.name: s.asset_automation_status.name for s in c.asset_automation_settings}
    live[c.id] = {"id": c.id, "name": c.name, "short": short(c.name), "type": c.advertising_channel_type.name, "bidding": c.bidding_strategy_type.name, "target_cpa": (c.maximize_conversions.target_cpa_micros or 0) / 1e6,
                  "search_partners": c.network_settings.target_partner_search_network, "display": c.network_settings.target_content_network, "geo": c.geo_target_type_setting.positive_geo_target_type.name,
                  "text_auto_off": auto.get('TEXT_ASSET_AUTOMATION') == 'OPTED_OUT', "url_expansion_off": auto.get('FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION') == 'OPTED_OUT',
                  "budget_day": r.campaign_budget.amount_micros / 1e6, "budget_shared": r.campaign_budget.explicitly_shared, "spend": round(m.cost_micros / 1e6, 2), "conv": round(m.conversions, 1), "clicks": m.clicks, "impressions": m.impressions,
                  "budget_lost_share": round(100 * (m.search_budget_lost_impression_share or 0), 1), "city": city_of(c.name), "bid_status": c.bidding_strategy_system_status.name, "ad_rotation": c.ad_serving_optimization_status.name}
for r in Q(f"SELECT campaign.id, campaign.status, metrics.cost_micros, metrics.conversions, metrics.clicks FROM campaign WHERE campaign.status='ENABLED' AND {WPREV}"):
    if r.campaign.id in live: live[r.campaign.id].update(prev_spend=round(r.metrics.cost_micros / 1e6, 2), prev_conv=round(r.metrics.conversions, 1), prev_clicks=r.metrics.clicks)
sched = defaultdict(int); langs = defaultdict(int); negcountries = defaultdict(int); userlists_obs = defaultdict(int); camp_locs = defaultdict(set); device_mods = defaultdict(list); loc_text = defaultdict(list); loc_ids = defaultdict(list); neg_ids = defaultdict(list); points = defaultdict(list)
for r in Q("SELECT campaign.id, campaign.status, campaign_criterion.type, campaign_criterion.negative, campaign_criterion.location.geo_target_constant, campaign_criterion.bid_modifier, campaign_criterion.device.type, campaign_criterion.proximity.geo_point.latitude_in_micro_degrees, campaign_criterion.proximity.geo_point.longitude_in_micro_degrees, campaign_criterion.proximity.radius, campaign_criterion.proximity.radius_units, campaign_criterion.proximity.address.city_name FROM campaign_criterion WHERE campaign.status='ENABLED' AND campaign_criterion.type IN ('AD_SCHEDULE','LANGUAGE','LOCATION','USER_LIST','DEVICE','PROXIMITY')"):
    t = r.campaign_criterion.type.name
    if t == 'AD_SCHEDULE': sched[r.campaign.id] += 1
    elif t == 'LANGUAGE': langs[r.campaign.id] += 1
    elif t == 'LOCATION' and r.campaign_criterion.negative: negcountries[r.campaign.id] += 1; neg_ids[r.campaign.id].append(r.campaign_criterion.location.geo_target_constant.split('/')[-1])
    elif t == 'LOCATION': gid = r.campaign_criterion.location.geo_target_constant.split('/')[-1]; camp_locs[r.campaign.id].add(gid); loc_ids[r.campaign.id].append(gid)
    elif t == 'PROXIMITY': px = r.campaign_criterion.proximity; camp_locs[r.campaign.id].add(f"radius {px.geo_point.latitude_in_micro_degrees},{px.geo_point.longitude_in_micro_degrees},{px.radius}"); points[r.campaign.id].append((px.geo_point.latitude_in_micro_degrees / 1e6, px.geo_point.longitude_in_micro_degrees / 1e6, px.radius, 'km' if px.radius_units.name == 'KILOMETERS' else 'mi', px.address.city_name))
    elif t == 'DEVICE' and r.campaign_criterion.bid_modifier not in (0.0, 1.0): device_mods[r.campaign.id].append(f"{r.campaign_criterion.device.type_.name} {r.campaign_criterion.bid_modifier:+.0%}".replace('+-', '-'))
    elif t == 'USER_LIST' and not r.campaign_criterion.negative: userlists_obs[r.campaign.id] += 1
_all_ids = sorted({g for v in list(loc_ids.values()) + list(neg_ids.values()) for g in v})
_geo = {str(r.geo_target_constant.id): r.geo_target_constant.name for r in Q(f"SELECT geo_target_constant.id, geo_target_constant.name FROM geo_target_constant WHERE geo_target_constant.id IN ({','.join(_all_ids[:500])})")} if _all_ids else {}
for k, ids_ in loc_ids.items(): loc_text[k] = [_geo.get(g, g) for g in ids_] + loc_text[k]
for k, pts in points.items():
    for lat, lng, rad, unit, cityname in pts: loc_text[k].append(f"radius {rad:g} {unit} around {cityname or place_name(lat, lng)}")
neg_text = {k: [_geo.get(g, g) for g in ids_] for k, ids_ in neg_ids.items()}
goal_level = {}; custom_goal = {}
for r in Q("SELECT conversion_goal_campaign_config.campaign, conversion_goal_campaign_config.goal_config_level, conversion_goal_campaign_config.custom_conversion_goal, campaign.status FROM conversion_goal_campaign_config WHERE campaign.status='ENABLED'"):
    k = int(r.conversion_goal_campaign_config.campaign.split('/')[-1]); goal_level[k] = r.conversion_goal_campaign_config.goal_config_level.name; custom_goal[k] = r.conversion_goal_campaign_config.custom_conversion_goal
act_cat = {a["id"]: a["category"] for a in acts}
custom_cats = {r.custom_conversion_goal.resource_name: {act_cat.get(int(a.split('/')[-1])) for a in r.custom_conversion_goal.conversion_actions} for r in Q("SELECT custom_conversion_goal.resource_name, custom_conversion_goal.conversion_actions FROM custom_conversion_goal")}
LEAD_GOALS = ('SUBMIT_LEAD_FORM', 'PHONE_CALL_LEAD', 'CONTACT', 'BOOK_APPOINTMENT', 'REQUEST_QUOTE', 'LEAD'); goal_bid = defaultdict(lambda: defaultdict(bool))
for r in Q("SELECT campaign.id, campaign.status, campaign_conversion_goal.category, campaign_conversion_goal.biddable FROM campaign_conversion_goal WHERE campaign.status='ENABLED'"):
    g = r.campaign_conversion_goal; goal_bid[r.campaign.id][g.category.name] = goal_bid[r.campaign.id][g.category.name] or g.biddable
acct_bid = {g["category"] for g in goals if g["biddable"]}
for cid_, c in live.items():
    bids_on = custom_cats.get(custom_goal.get(cid_) or '', None) if custom_goal.get(cid_) else {k for k, v in goal_bid[cid_].items() if v}
    dropped = [k.replace('_', ' ').lower() for k in LEAD_GOALS if k in acct_bid and cid_ in goal_level and k not in bids_on]
    c.update(schedule_rows=sched[cid_], languages=langs[cid_], excluded_locations=negcountries[cid_], lists_attached=userlists_obs[cid_], device_mods=device_mods.get(cid_, []), goal_level=goal_level.get(cid_, 'CUSTOMER'), goals_dropped=dropped, locations=loc_text.get(cid_, []), excluded_names=neg_text.get(cid_, []))
out["campaigns"] = list(live.values())
tot_spend = sum(c["spend"] for c in live.values()); tot_conv = sum(c["conv"] for c in live.values()); tot_clicks = sum(c["clicks"] for c in live.values()); tot_impr = sum(c["impressions"] for c in live.values())
out["totals"] = {"spend": round(tot_spend, 2), "conv": round(tot_conv, 1), "clicks": tot_clicks, "impressions": tot_impr, "cpl": round(tot_spend / tot_conv, 2) if tot_conv else None, "cvr": round(100 * tot_conv / tot_clicks, 2) if tot_clicks else None, "ctr": round(100 * tot_clicks / tot_impr, 2) if tot_impr else None,
                 "prev_spend": round(sum(c.get("prev_spend", 0) for c in live.values()), 2), "prev_conv": round(sum(c.get("prev_conv", 0) for c in live.values()), 1), "prev_clicks": sum(c.get("prev_clicks", 0) for c in live.values())}

# ---------- spend breakdown: ad group, location, device (30 days) ----------
ag30 = []
for r in Q(f"SELECT campaign.name, campaign.status, ad_group.name, ad_group.status, metrics.cost_micros, metrics.conversions FROM ad_group WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND {W30}"):
    ag30.append({"name": f"{short(r.campaign.name)} / {r.ad_group.name}", "spend": round(r.metrics.cost_micros / 1e6, 2), "conv": round(r.metrics.conversions, 1)})
loc = defaultdict(lambda: [0.0, 0.0])
for r in Q(f"SELECT campaign.status, geographic_view.country_criterion_id, segments.geo_target_city, metrics.cost_micros, metrics.conversions FROM geographic_view WHERE campaign.status='ENABLED' AND geographic_view.location_type='LOCATION_OF_PRESENCE' AND {W30}"):
    k = r.segments.geo_target_city or f"country {r.geographic_view.country_criterion_id}"; loc[k][0] += r.metrics.cost_micros / 1e6; loc[k][1] += r.metrics.conversions
names = {}
ids = [k.split('/')[-1] for k in loc if k.startswith('geoTargetConstants/')]
if ids:
    for r in Q(f"SELECT geo_target_constant.id, geo_target_constant.name, geo_target_constant.canonical_name FROM geo_target_constant WHERE geo_target_constant.id IN ({','.join(ids[:200])})"):
        names[str(r.geo_target_constant.id)] = r.geo_target_constant.name
loc_rows = [{"name": names.get(k.split('/')[-1], k), "spend": round(v[0], 2), "conv": round(v[1], 1)} for k, v in loc.items()]
dev = defaultdict(lambda: [0.0, 0.0])
for r in Q(f"SELECT campaign.status, segments.device, metrics.cost_micros, metrics.conversions FROM campaign WHERE campaign.status='ENABLED' AND {W30}"):
    dev[r.segments.device.name.title()][0] += r.metrics.cost_micros / 1e6; dev[r.segments.device.name.title()][1] += r.metrics.conversions
out["spendBreakdown"] = {"byAdGroup": ag30, "byLocation": loc_rows, "byDevice": [{"name": k, "spend": round(v[0], 2), "conv": round(v[1], 1)} for k, v in dev.items()]}

# ---------- keywords: match type, serving, counts, grades, duplicates ----------
kws = defaultdict(set); kwrows = []; grades = defaultdict(lambda: {"ctr": [0, 0], "rel": [0, 0], "lp": [0, 0], "qs": [0, 0], "ctr3": [0, 0, 0], "rel3": [0, 0, 0], "lp3": [0, 0, 0]}); gnames = {}; targeting = defaultdict(set)
for r in Q("SELECT campaign.name, campaign.status, ad_group.id, ad_group.name, ad_group_criterion.gender.type, ad_group_criterion.negative, ad_group_criterion.type FROM ad_group_criterion WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_criterion.type IN ('GENDER','AGE_RANGE','INCOME_RANGE','PARENTAL_STATUS','USER_LIST')"):
    targeting[r.ad_group.id].add(f"{r.ad_group_criterion.type.name}:{r.ad_group_criterion.gender.type.name if r.ad_group_criterion.type.name=='GENDER' else ''}:{'neg' if r.ad_group_criterion.negative else 'pos'}")
for r in Q(f"""SELECT campaign.id, campaign.name, campaign.status, ad_group.id, ad_group.name, ad_group_criterion.criterion_id, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.system_serving_status,
  ad_group_criterion.quality_info.quality_score, ad_group_criterion.quality_info.creative_quality_score, ad_group_criterion.quality_info.search_predicted_ctr, ad_group_criterion.quality_info.post_click_quality_score,
  metrics.cost_micros, metrics.conversions, metrics.clicks FROM keyword_view WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_criterion.status='ENABLED' AND ad_group_criterion.negative=FALSE AND {W30}"""):
    k = r.ad_group_criterion; t = re.sub(r'[+\[\]"]', '', k.keyword.text.lower()); kws[r.ad_group.id].add(t); gnames[r.ad_group.id] = (short(r.campaign.name), r.ad_group.name, r.campaign.id)
    kwrows.append({"campaign": short(r.campaign.name), "ad_group": r.ad_group.name, "ad_group_id": r.ad_group.id, "text": k.keyword.text, "match": k.keyword.match_type.name, "serving": k.system_serving_status.name, "spend": round(r.metrics.cost_micros / 1e6, 2), "conv": round(r.metrics.conversions, 1), "clicks": r.metrics.clicks})
    q = k.quality_info
    if q.quality_score:
        g = grades[r.ad_group.id]
        for key, v in (("ctr", q.search_predicted_ctr.name), ("rel", q.creative_quality_score.name), ("lp", q.post_click_quality_score.name)):
            g[key][1] += 1; g[key][0] += 1 if v == 'BELOW_AVERAGE' else 0; g[key + '3'][{'BELOW_AVERAGE': 0, 'AVERAGE': 1, 'ABOVE_AVERAGE': 2}.get(v, 1)] += 1
        g['qs'][0] += q.quality_score; g['qs'][1] += 1
out["keywords"] = kwrows
out["gradesByGroup"] = {str(k): {"campaign": gnames[k][0], "ad_group": gnames[k][1], **{kk: list(vv) for kk, vv in v.items()}} for k, v in grades.items() if k in gnames}
out["keywordCounts"] = [{"campaign": v[0], "ad_group": v[1], "count": len(kws[k])} for k, v in gnames.items()]
# duplicates only count when the ad groups share targeting (segmentation rule)
by_text = defaultdict(list)
for k, texts in kws.items():
    for t in texts: by_text[t].append(k)
dups = []
for t, groups in by_text.items():
    if len(groups) < 2: continue
    tkey = lambda g: (frozenset(camp_locs.get(gnames[g][2], set())), frozenset(targeting[g]))
    same = [g for g in groups if tkey(g) == tkey(groups[0])]
    if len(same) > 1: dups.append({"text": t, "groups": [f"{gnames[g][0]} / {gnames[g][1]}" for g in same]})
out["duplicateKeywords"] = dups

# ---------- negatives: lists, conflicts, universal coverage ----------
acct_lists = {r.customer_negative_criterion.negative_keyword_list.shared_set for r in Q("SELECT customer_negative_criterion.negative_keyword_list.shared_set, customer_negative_criterion.type FROM customer_negative_criterion WHERE customer_negative_criterion.type='NEGATIVE_KEYWORD_LIST'")}
list_camps = defaultdict(set)
for r in Q("SELECT campaign_shared_set.shared_set, campaign_shared_set.campaign, campaign_shared_set.status FROM campaign_shared_set WHERE campaign_shared_set.status='ENABLED'"): list_camps[r.campaign_shared_set.shared_set].add(int(r.campaign_shared_set.campaign.split('/')[-1]))
negs = []  # (text, match, scope, reaches(campaign_id, ad_group_id))
acct_terms = set()
for r in Q("SELECT shared_criterion.keyword.text, shared_criterion.keyword.match_type, shared_criterion.shared_set, shared_set.name, shared_set.type FROM shared_criterion WHERE shared_set.type IN ('NEGATIVE_KEYWORDS','ACCOUNT_LEVEL_NEGATIVE_KEYWORDS')"):
    sc = r.shared_criterion
    if sc.shared_set in acct_lists: acct_terms.add(sc.keyword.text.lower()); negs.append((sc.keyword.text.lower(), sc.keyword.match_type.name, 'ACCOUNT', lambda c, g: True))
    else:
        cs = list_camps.get(sc.shared_set, set()); negs.append((sc.keyword.text.lower(), sc.keyword.match_type.name, f"list {r.shared_set.name}", (lambda cs: (lambda c, g: c in cs))(cs)))
for r in Q("SELECT campaign.id, campaign.status, campaign_criterion.keyword.text, campaign_criterion.keyword.match_type FROM campaign_criterion WHERE campaign.status='ENABLED' AND campaign_criterion.negative=TRUE AND campaign_criterion.type='KEYWORD'"):
    negs.append((r.campaign_criterion.keyword.text.lower(), r.campaign_criterion.keyword.match_type.name, 'campaign', (lambda c0: (lambda c, g: c == c0))(r.campaign.id)))
for r in Q("SELECT campaign.status, ad_group.id, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type FROM ad_group_criterion WHERE campaign.status='ENABLED' AND ad_group_criterion.negative=TRUE AND ad_group_criterion.type='KEYWORD'"):
    negs.append((r.ad_group_criterion.keyword.text.lower(), r.ad_group_criterion.keyword.match_type.name, 'ad group', (lambda g0: (lambda c, g: g == g0))(r.ad_group.id)))
def blocks(neg, match, kw):
    n = neg.split(); k = kw.split()
    if match == 'EXACT': return n == k
    if match == 'PHRASE': return any(k[i:i + len(n)] == n for i in range(len(k) - len(n) + 1))
    return all(w in k for w in n)
conflicts = []
for row in kwrows:
    kt = re.sub(r'[+\[\]"]', '', row["text"].lower()); c_id = gnames[row["ad_group_id"]][2]
    for text, match, scope, reaches in negs:
        if reaches(c_id, row["ad_group_id"]) and blocks(text, match, kt): conflicts.append({"keyword": row["text"], "campaign": row["campaign"], "ad_group": row["ad_group"], "negative": text, "match": match, "scope": scope}); break
own_city = [c for c in conflicts if c["negative"] in CITIES and c["negative"] in c["campaign"].lower()]
uni = CFG.get("universal_junk", []); covered = [u for u in uni if u in acct_terms]
out["negatives"] = {"account_terms": sorted(acct_terms), "conflicts": conflicts, "own_city_blocks": own_city, "universal_total": len(uni), "universal_covered": len(covered), "universal_missing": [u for u in uni if u not in acct_terms],
                    "phrase_share": round(100 * sum(1 for n in negs if n[1] == 'PHRASE') / max(1, len(negs))), "count": len(negs), "unattached_lists": [r.shared_set.name for r in Q("SELECT shared_set.name, shared_set.type, shared_set.status FROM shared_set WHERE shared_set.type='NEGATIVE_KEYWORDS' AND shared_set.status='ENABLED'") if r.shared_set.name and not any(True for _ in [1])] }
out["negatives"]["unattached_lists"] = []  # kept for shape; the audit reads unattached lists by hand

# ---------- search terms: junk classification and harvest ----------
terms = defaultdict(lambda: [0, 0.0, 0.0, set()])
for r in Q(f"SELECT campaign.name, campaign.status, search_term_view.search_term, metrics.clicks, metrics.cost_micros, metrics.conversions FROM search_term_view WHERE campaign.status='ENABLED' AND {W365}"):
    t = terms[r.search_term_view.search_term.lower()]; t[0] += r.metrics.clicks; t[1] += r.metrics.cost_micros / 1e6; t[2] += r.metrics.conversions; t[3].add(short(r.campaign.name))
FAR = [f.lower() for f in CFG.get("far_places", [])]; NOTSOLD = [n.lower() for n in CFG.get("not_sold", [])]; HELD = [h.lower() for h in CFG.get("held_places", [])]
block_rows = []; junk_cost = 0.0
for term, (c, cost, conv, camps) in terms.items():
    if conv > 0: continue
    far = next((f for f in FAR if f in term and not any(s in term for s in CITIES)), None)
    nd = next((n for n in NOTSOLD if re.search(r'\b' + re.escape(n) + r'\b', term)), None)
    why = far or nd
    if not why: continue
    status = 'held: how far do you travel?' if (far and far in HELD) else ('covered by the account list' if why in acct_terms else 'stage as a phrase negative')
    if status != 'held: how far do you travel?': junk_cost += cost
    for cp in camps: block_rows.append({"campaign": cp, "term": term, "clicks": c, "cost": round(cost, 2), "why": why, "status": status})
all_kw_texts = {re.sub(r'[+\[\]"]', '', k["text"].lower()) for k in kwrows}
harvest = [{"term": t, "conv": round(v[2], 1), "cost": round(v[1], 2)} for t, v in terms.items() if v[2] >= 2 and t not in all_kw_texts]
zero_terms = sorted([{"term": t, "clicks": v[0], "cost": round(v[1], 2)} for t, v in terms.items() if v[2] == 0], key=lambda x: -x["cost"])[:10]
visible_clicks = sum(v[0] for v in terms.values())
out["searchTerms"] = {"count": len(terms), "blockRows": block_rows, "junk_cost_365": round(junk_cost, 2), "harvest": sorted(harvest, key=lambda x: -x["conv"])[:10], "top_zero": zero_terms, "visible_clicks_365": visible_clicks}

# ---------- ads: table rows, build checks, ad groups, winning lines ----------
ads, build, allb, groups = [], [], [], defaultdict(lambda: {"enabled_ads": 0})
perf = {}
for r in Q(f"SELECT ad_group_ad.ad.id, ad_group_ad.status, campaign.status, metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros FROM ad_group_ad WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_ad.status='ENABLED' AND campaign.advertising_channel_type='SEARCH' AND {W365}"):
    m = r.metrics; perf[r.ad_group_ad.ad.id] = {"impressions": m.impressions, "clicks": m.clicks, "conv": round(m.conversions, 1), "cost": round(m.cost_micros / 1e6, 2)}
for r in Q("""SELECT campaign.name, campaign.status, ad_group.id, ad_group.name, ad_group_ad.ad.id, ad_group_ad.status, ad_group_ad.ad.final_urls,
  ad_group_ad.ad.responsive_search_ad.headlines, ad_group_ad.ad.responsive_search_ad.descriptions, ad_group_ad.ad.responsive_search_ad.path1, ad_group_ad.policy_summary.approval_status
  FROM ad_group_ad WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_ad.status='ENABLED' AND campaign.advertising_channel_type='SEARCH' AND ad_group_ad.ad.type='RESPONSIVE_SEARCH_AD'"""):
    a = r.ad_group_ad.ad; rsa = a.responsive_search_ad; hs, ds = rsa.headlines, rsa.descriptions; city = city_of(r.campaign.name)
    h1 = [h.text for h in hs if h.pinned_field.name == 'HEADLINE_1']; pinned = sum(1 for h in hs if h.pinned_field.name not in ('UNSPECIFIED', 'UNKNOWN'))
    url = list(a.final_urls)[0] if a.final_urls else ''; path = re.sub(r'https?://[^/]+', '', url).split('?')[0].strip('/'); htext = ' '.join(h.text.lower() for h in hs)
    checks = {"15 headlines": len(hs) >= 15, "4 descriptions": len(ds) >= 4, "city in pinned headline 1": bool(h1) and any(('{location' in x.lower()) or (city and city in x.lower()) for x in h1),
              "pinned headline 1 exists": bool(h1), "not over-pinned (3 or fewer pins)": pinned <= 3, "keyword in a headline": any(all(w in htext for w in k.split()) for k in kws.get(r.ad_group.id, set())),
              "dedicated landing page, not the homepage": bool(path), "page names the city": bool(city) and city in path.lower(), "display path filled": bool(rsa.path1)}
    fails = [k for k, v in checks.items() if not v]
    allb.append({"campaign": r.campaign.name, "ad_group": r.ad_group.name, "ad_id": a.id, "checks": checks})
    if fails: build.append({"campaign": r.campaign.name, "what": f"{r.ad_group.name} ad {a.id}: " + '; '.join(fails), "tag": 'your proof' if any(x in ('15 headlines', '4 descriptions') for x in fails) else 'bigger build', "fails": fails})
    p = perf.get(a.id, {"impressions": 0, "clicks": 0, "conv": 0, "cost": 0}); ads.append({"campaign": r.campaign.name, "ad_group": r.ad_group.name, "ad_id": a.id, "approval": r.ad_group_ad.policy_summary.approval_status.name, **p})
    groups[(r.campaign.name, r.ad_group.name)]["enabled_ads"] += 1; groups[(r.campaign.name, r.ad_group.name)]["ad_group_id"] = r.ad_group.id
T = [sum(x["impressions"] for x in ads), sum(x["clicks"] for x in ads), sum(x["conv"] for x in ads), sum(x["cost"] for x in ads)]
out["adTable"] = {"window": out["long_window"], "avg": {"ctr": round(100 * T[1] / T[0], 2) if T[0] else 0, "cvr": round(100 * T[2] / T[1], 2) if T[1] else 0, "cpl": round(T[3] / T[2], 2) if T[2] else 0}, "ads": ads, "recentFix": {}}
for r in Q(f"SELECT campaign.name, campaign.status, ad_group.id, ad_group.name, metrics.impressions, metrics.clicks FROM ad_group WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND campaign.advertising_channel_type='SEARCH' AND {W30}"):
    g = groups[(r.campaign.name, r.ad_group.name)]; g["ad_group_id"] = r.ad_group.id; g["impressions30"] = g.get("impressions30", 0) + r.metrics.impressions; g["clicks30"] = g.get("clicks30", 0) + r.metrics.clicks
for r in Q("SELECT campaign.name, campaign.status, ad_group.id, ad_group.name FROM ad_group WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND campaign.advertising_channel_type='SEARCH'"):
    g = groups[(r.campaign.name, r.ad_group.name)]; g["ad_group_id"] = r.ad_group.id; g.setdefault("impressions30", 0); g.setdefault("clicks30", 0); g["keywords"] = len(kws.get(r.ad_group.id, set()))
out["adBuild"] = build; out["adBuildAll"] = allb; out["adGroups"] = [{"campaign": c, "ad_group": g, **v} for (c, g), v in groups.items()]
paused_challengers = defaultdict(int)
for r in Q("SELECT campaign.name, campaign.status, ad_group.name, ad_group_ad.status FROM ad_group_ad WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_ad.status='PAUSED' AND campaign.advertising_channel_type='SEARCH' AND ad_group_ad.ad.type='RESPONSIVE_SEARCH_AD'"):
    paused_challengers[(r.campaign.name, r.ad_group.name)] += 1
for g in out["adGroups"]: g["paused_ads"] = paused_challengers.get((g["campaign"], g["ad_group"]), 0)

# ---------- assets ----------
TYPES = ['SITELINK', 'CALLOUT', 'STRUCTURED_SNIPPET', 'CALL', 'LEAD_FORM', 'BUSINESS_MESSAGE', 'LOCATION', 'AD_IMAGE', 'BUSINESS_NAME', 'BUSINESS_LOGO', 'PRICE', 'MOBILE_APP', 'PROMOTION']
acct = defaultdict(int)
for r in Q("SELECT customer_asset.field_type, customer_asset.status FROM customer_asset WHERE customer_asset.status='ENABLED'"): acct[r.customer_asset.field_type.name] += 1
camp = defaultdict(lambda: defaultdict(int))
for r in Q("SELECT campaign.id, campaign.status, campaign_asset.field_type, campaign_asset.status FROM campaign_asset WHERE campaign.status='ENABLED' AND campaign_asset.status='ENABLED'"): camp[r.campaign.id][r.campaign_asset.field_type.name] += 1
for r in Q("SELECT campaign.id, campaign.status, ad_group_asset.field_type, ad_group_asset.status FROM ad_group_asset WHERE campaign.status='ENABLED' AND ad_group_asset.status='ENABLED'"): camp[r.campaign.id][r.ad_group_asset.field_type.name] += 1
fperf = defaultdict(lambda: [0, 0, 0.0])
for r in Q(f"SELECT asset_field_type_view.field_type, metrics.impressions, metrics.clicks, metrics.conversions FROM asset_field_type_view WHERE {W365}"):
    p = fperf[r.asset_field_type_view.field_type.name]; p[0] += r.metrics.impressions; p[1] += r.metrics.clicks; p[2] += r.metrics.conversions
loc_sync = any(r.asset_set.type_.name == 'LOCATION_SYNC' for r in Q("SELECT customer_asset_set.asset_set, customer_asset_set.status, asset_set.type FROM customer_asset_set WHERE customer_asset_set.status='ENABLED'"))
rows = []
for t in TYPES:
    have = [c for c in live if acct.get(t, 0) or camp[c].get(t, 0) or (t == 'AD_IMAGE' and (camp[c].get('MARKETING_IMAGE', 0) or acct.get('MARKETING_IMAGE', 0))) or (t == 'LOCATION' and loc_sync)]
    i, c, cv = fperf.get(t, [0, 0, 0.0]); i2, c2, cv2 = fperf.get('MARKETING_IMAGE', [0, 0, 0.0]) if t == 'AD_IMAGE' else (0, 0, 0.0)
    rows.append({"type": t, "account": acct.get(t, 0), "campaigns_with": len(have), "campaigns_total": len(live), "with": [live[x]["short"] for x in have], "missing": [live[x]["short"] for x in live if x not in have], "impressions": i + i2, "clicks": c + c2, "conv": round(cv + cv2, 1)})
out["assets"] = rows

# ---------- pages: final URLs, and Google's landing-page grade per URL ----------
urls = defaultdict(set); group_url = {}
for r in Q("SELECT campaign.name, campaign.status, ad_group.id, ad_group.name, ad_group_ad.ad.final_urls, ad_group_ad.status FROM ad_group_ad WHERE campaign.status='ENABLED' AND ad_group.status='ENABLED' AND ad_group_ad.status='ENABLED' AND campaign.advertising_channel_type='SEARCH'"):
    for u in r.ad_group_ad.ad.final_urls: k = re.sub(r"\?.*$", "", u).rstrip("/"); urls[k].add(f"{short(r.campaign.name)} / {r.ad_group.name}"); group_url[r.ad_group.id] = k
pmax_home = []
for r in Q("SELECT campaign.name, campaign.status, asset_group.name, asset_group.final_urls, asset_group.status FROM asset_group WHERE campaign.status='ENABLED' AND asset_group.status='ENABLED'"):
    for u in r.asset_group.final_urls:
        k = re.sub(r"\?.*$", "", u).rstrip("/"); urls[k].add(f"{short(r.campaign.name)} / {r.asset_group.name} (PMax)")
        if not re.sub(r'https?://[^/]+', '', k).strip('/'): pmax_home.append(f"{short(r.campaign.name)} / {r.asset_group.name}")
out["finalUrls"] = {u: sorted(v) for u, v in urls.items()}; out["pmaxHomepage"] = pmax_home
lp_pages = defaultdict(lambda: [0, 0])
for gid, g in grades.items():
    u = group_url.get(gid)
    if u: lp_pages[u][0] += g["lp"][0]; lp_pages[u][1] += g["lp"][1]
out["lpGradeByPage"] = {u: v for u, v in lp_pages.items()}
lp_below_spend = round(sum(k["spend"] for k in kwrows if grades.get(k["ad_group_id"], {}).get("lp", [0, 1])[0] > 0), 2)
out["lpBelowSpend30"] = lp_below_spend
# per-page money (365 days) from the ads that point at each page
page_perf = defaultdict(lambda: [0, 0, 0.0, 0.0])
for a in ads:
    key = f"{short(a['campaign'])} / {a['ad_group']}"
    for u, gs in out["finalUrls"].items():
        if key in gs: p = page_perf[u]; p[0] += a["impressions"]; p[1] += a["clicks"]; p[2] += a["conv"]; p[3] += a["cost"]
out["pagePerf365"] = {u: {"impressions": v[0], "clicks": v[1], "conv": round(v[2], 1), "cost": round(v[3], 2)} for u, v in page_perf.items()}

# ---------- retargeting, ad types, GBP ----------
lists = [{"name": r.user_list.name, "search": r.user_list.size_for_search} for r in Q("SELECT user_list.name, user_list.size_for_search, user_list.membership_status FROM user_list WHERE user_list.membership_status='OPEN'")]
targeting_live = 0; converter_excluded = False
for r in Q("SELECT campaign.name, campaign.status, campaign.targeting_setting.target_restrictions, campaign_criterion.user_list.user_list, campaign_criterion.negative FROM campaign_criterion WHERE campaign.status='ENABLED' AND campaign_criterion.type='USER_LIST'"):
    obs = any(t.bid_only for t in r.campaign.targeting_setting.target_restrictions if t.targeting_dimension.name == 'AUDIENCE')
    if not obs and not r.campaign_criterion.negative: targeting_live += 1
    if r.campaign_criterion.negative: converter_excluded = True
out["retargeting"] = {"lists": lists, "big_lists": [l for l in lists if l["search"] >= 1000], "live_campaigns_targeting_a_list": targeting_live, "converters_excluded": converter_excluded}
out["adTypes"] = {"search": any(v["type"] == 'SEARCH' for v in live.values()), "pmax": any(v["type"] == 'PERFORMANCE_MAX' for v in live.values()), "maps_attached": loc_sync, "maps_impressions_365d": fperf.get('LOCATION', [0])[0], "gbp_linked": loc_sync}

path = f"code/cache/{cid}-dashboard-{end}.json"; json.dump(out, open(path, "w"), indent=1, default=str)
print(f"wrote {path} · {len(live)} live campaigns · spend {out['totals']['spend']} · {len(kwrows)} keywords · {len(conflicts)} conflicts · {len(ads)} ads · {len(rows)} asset types · {len(urls)} pages · {len(block_rows)} block rows · maps impressions {out['adTypes']['maps_impressions_365d']}")
