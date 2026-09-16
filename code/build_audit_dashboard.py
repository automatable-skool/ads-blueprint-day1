"""Assemble the audit dashboard from the reads: data JSON (audit_dashboard_data.py) + page scores (cro_score.py)
+ the account config, into a copy of references/audit-report-template.html with its JSON replaced.
Usage: python3 code/build_audit_dashboard.py --data code/cache/<c>-dashboard-<date>.json --pages code/cache/<c>-cro-<date>.json
         --out assets/audit-report.html [--previous <older dashboard json>] [--anonymise]
--previous sets the BEFORE state of every check from an earlier run (same check text); without it before = after.
Rules: references/audit-dashboard-spec.md. Never edits the template itself.
"""
import argparse, json, re, datetime, shutil
ap = argparse.ArgumentParser(); ap.add_argument("--data", required=True); ap.add_argument("--pages"); ap.add_argument("--out", required=True); ap.add_argument("--previous"); ap.add_argument("--anonymise", action="store_true"); ap.add_argument("--template", default="references/audit-report-template.html")
A = ap.parse_args(); D = json.load(open(A.data)); C = D["config"]; P = json.load(open(A.pages)) if A.pages else []; PREV = json.load(open(A.previous)) if A.previous else None
money = lambda n: f"${n:,.0f}" if n is not None else "-"
T = D["totals"]; AVG = T["cpl"]; camps = D["campaigns"]; live = {c["id"]: c for c in camps}
JUNK_CATS = {"DOWNLOAD", "PAGE_VIEW", "ENGAGEMENT", "GET_DIRECTIONS", "YOUTUBE_FOLLOW_ON_VIEWS", "UNKNOWN"}
def chk(t, ok, **kw): return {"t": t, "b": "pass" if ok else "fail", "a": "pass" if ok else "fail", "certainty": kw.pop("certainty", "measured"), **kw}
def x(cpl): return (cpl / AVG) if (cpl and AVG) else None

# ---------- account checks ----------
acts = D["conversions"]["actions"]; goals = D["conversions"]["goals"]
primaries = [a for a in acts if a["primary"] and a["counted"]]
recording = all(a["conv30"] > 0 for a in primaries) if primaries else False
call_acts = [a for a in primaries if a["category"] in ("PHONE_CALL_LEAD", "CONTACT") or a["type"] in ("WEBSITE_CALL", "CLICK_TO_CALL", "AD_CALL")]
calls_counted = any(a["conv30"] > 0 for a in call_acts) if call_acts else True
junk_biddable = [g for g in goals if g["category"] in JUNK_CATS and g["biddable"]]
by_origin = {}
for a in call_acts: by_origin[a["origin"]] = by_origin.get(a["origin"], 0) + 1
LEAD_CATS = {"SUBMIT_LEAD_FORM", "PHONE_CALL_LEAD", "CONTACT", "BOOK_APPOINTMENT", "REQUEST_QUOTE", "LEAD", "SIGNUP", "IMPORTED_LEAD", "CONVERTED_LEAD", "QUALIFIED_LEAD", "PURCHASE"}
lead_acts = [a for a in primaries if a["category"] in LEAD_CATS]
no_dur = [a for a in call_acts if (a.get("call_seconds") or 0) < 30]; many_per = [a for a in lead_acts if a.get("counting") == "MANY_PER_CLICK"]; short_win = [a for a in lead_acts if (a.get("window_days") or 0) < 30]
ga4_any = [a for a in acts if a["type"].startswith("GOOGLE_ANALYTICS") or "ga4" in a["name"].lower()]; ga4_primary = [a for a in ga4_any if a["primary"] and a["counted"]]
thank_you = [a for a in acts if a["type"] == "WEBPAGE" and a["category"] in LEAD_CATS and a["conv30"] > 0]
tracking = [chk("Every primary conversion action is actually recording", recording, tag=None if recording else "website access", sub=None if recording else f"{len(primaries)} primary actions; {sum(1 for a in primaries if a['conv30']==0)} recorded nothing in the window" + (" - every phone-call action reads zero while the pages carry tap-to-call, so calls are not being counted" if not calls_counted else "")),
            chk("No junk category (page view, download, engagement) is primary and biddable", not junk_biddable, sub=None if not junk_biddable else "Out of bidding by API: " + ", ".join(f"{g['category']}/{g['origin']}" for g in junk_biddable)),
            chk("Calls are not triple-counted", all(v <= 1 for v in by_origin.values()) or len(call_acts) <= 2, sub=None if len(call_acts) <= 2 else f"{len(call_acts)} primary call actions"),
            chk("Enhanced conversions are on", D["account"]["enhanced_conversions"], tag=None if D["account"]["enhanced_conversions"] else "click needed"),
            chk("Auto-tagging is on", D["account"]["auto_tagging"]), chk("Call reporting and call conversion reporting are on", D["account"]["call_reporting"] and D["account"]["call_conversion_reporting"], tag=None if D["account"]["call_reporting"] else "click needed"),
            chk("Call actions carry a duration threshold", not no_dur, tag=None if not no_dur else "bigger build", sub=None if not no_dur else ", ".join(f"{a['name']} ({a.get('call_seconds') or 0}s)" for a in no_dur)),
            chk("Lead actions count once per click, not every time", not many_per, tag=None if not many_per else "bigger build", sub=None if not many_per else ", ".join(a["name"] for a in many_per)),
            chk("The GA4 import is secondary, not primary", not ga4_primary, tag=None if not ga4_primary else "bigger build", sub=("No GA4 import on the account." if not ga4_any else (None if not ga4_primary else ", ".join(a["name"] for a in ga4_primary)))),
            chk("Conversion window suits the sales cycle", not short_win, tag=None if not short_win else "bigger build", sub=None if not short_win else "Under 30 days: " + ", ".join(f"{a['name']} ({a.get('window_days')} day{'s' if a.get('window_days')!=1 else ''})" for a in short_win)),
            chk("Conversion rate is not implausibly high (page views counted as leads)", (T.get("cvr") or 0) <= 25, sub=f"{T.get('cvr')}% of clicks become a lead")]
search = [c for c in camps if c["type"] == "SEARCH"]; pmax = [c for c in camps if c["type"] == "PERFORMANCE_MAX"]
FAR = [f.lower() for f in C.get("far_places", [])]; HELD = [h.lower() for h in C.get("held_places", [])]
far_rows = [r for r in D["spendBreakdown"]["byLocation"] if (r["name"].startswith("country ") or r["name"].lower() in FAR) and r["name"].lower() not in HELD]; held_rows = [r for r in D["spendBreakdown"]["byLocation"] if r["name"].lower() in HELD]
far_spend = sum(r["spend"] for r in far_rows)
SMART = {"MAXIMIZE_CONVERSIONS", "TARGET_CPA", "MAXIMIZE_CONVERSION_VALUE", "TARGET_ROAS"}
dead_mods = [(c["short"], m) for c in camps if c["bidding"] in SMART for m in c.get("device_mods", [])]
networks = [chk("Every search campaign targets people in the area, not people interested in it", all(c["geo"] == "PRESENCE" for c in search), tag=None if all(c["geo"] == "PRESENCE" for c in search) else "bigger build"),
            chk("Search Partners are off", not any(c["search_partners"] for c in search), tag=None if not any(c["search_partners"] for c in search) else "bigger build"),
            chk("The Display Network is off on search campaigns", not any(c["display"] for c in search), tag=None if not any(c["display"] for c in search) else "bigger build"),
            chk("Other countries are excluded", all(c["excluded_locations"] > 0 for c in search) if search else True, tag=None if all(c["excluded_locations"] > 0 for c in search) else "bigger build"),
            chk("A language is set on every campaign", all(c["languages"] > 0 for c in search) if search else True, tag=None if all(c["languages"] > 0 for c in search) else "bigger build"),
            chk("An ad schedule is set on every campaign", all(c["schedule_rows"] > 0 for c in search) if search else True, tag=None if all(c["schedule_rows"] > 0 for c in search) else "your number"),
            chk("All spend lands inside the service area", far_spend <= 0.02 * (T["spend"] or 1), tag=None if far_spend <= 0.02 * (T["spend"] or 1) else "bigger build", sub=(("Outside: " + ", ".join(f"{r['name']} {money(r['spend'])}" for r in far_rows[:6]) + ". ") if far_rows else "") + (("Held towns to ask about: " + ", ".join(f"{r['name']} {money(r['spend'])}" for r in held_rows[:6])) if held_rows else "") or None),
            chk("No dead bid modifiers under automated bidding", not dead_mods, tag=None if not dead_mods else "bigger build", sub=None if not dead_mods else "; ".join(f"{c} {m}" for c, m in dead_mods))]
aa = D["autoApply"]
autopilot = [chk("Auto-apply recommendations are all off", aa["enabled"] == 0, tag=None if aa["enabled"] == 0 else "click needed", sub=None if aa["enabled"] == 0 else f"{aa['enabled']} of {aa['total']} types still on" + (f"; {aa['unknown_enabled']} of them have no API name and need the screen: Admin, Recommendations auto-apply" if aa["unknown_enabled"] else "")),
             chk("Google has made no changes on its own", aa["google_changes_30d"] == 0 or (aa["enabled"] == 0 and aa["google_changes_30d"] >= 0), tag=None if (aa["google_changes_30d"] == 0 or aa["enabled"] == 0) else "click needed", sub=None if aa["google_changes_30d"] <= 0 else f"{aa['google_changes_30d']} changes by Google's own recommendations in the last 29 days (last on {aa.get('google_changes_last')})" + ("; auto-apply is now off, so no more can land" if aa["enabled"] == 0 else "")),
             chk("Google is not writing your ads for you (text automation off)", all(c["text_auto_off"] for c in camps), tag=None if all(c["text_auto_off"] for c in camps) else "bigger build"),
             chk("Google is not allowed to swap your landing page (final URL expansion off)", all(c["url_expansion_off"] for c in pmax) if pmax else True, tag=None if all(c["url_expansion_off"] for c in pmax) else "bigger build")]
goal_drop = [c for c in camps if c.get("goals_dropped")]; misconf = [c for c in camps if str(c.get("bid_status", "")).startswith("MISCONFIGURED")]; no_ad = [g for g in D["adGroups"] if not g.get("enabled_ads")]; bad_ads = [a for a in D["adTable"]["ads"] if a.get("approval") not in (None, "APPROVED")]
budgets = [chk("No bid strategy is in a misconfigured state", not misconf, tag=None if not misconf else "bigger build", sub=None if not misconf else ", ".join(f"{c['short']} ({c['bid_status']})" for c in misconf)),
           chk("Every ad group has at least one enabled ad", not no_ad, tag=None if not no_ad else "your proof", sub=None if not no_ad else ", ".join(f"{g['campaign']} / {g['ad_group']}" for g in no_ad[:6])),
           chk("No ad is disapproved or limited", not bad_ads, tag=None if not bad_ads else "click needed", sub=None if not bad_ads else ", ".join(f"{a['campaign']} / {a['ad_group']} ad {a['ad_id']} ({a['approval']})" for a in bad_ads[:6])),
           chk("Google Business Profile is linked", D["adTypes"]["gbp_linked"], tag=None if D["adTypes"]["gbp_linked"] else "click needed")]
maps_ok = D["adTypes"]["maps_attached"] and D["adTypes"]["maps_impressions_365d"] > 0
lsa = C.get("lsa", {}); adtypes = [chk("Search ads are running", D["adTypes"]["search"])]
if pmax: adtypes.append(chk("Performance Max is running with guardrails", all(c["url_expansion_off"] and c["text_auto_off"] for c in pmax) and bool(D["negatives"]["account_terms"]), tag="click needed", sub="Negatives, URL expansion and auto text are readable and set by API; the brand exclusion list has no API surface and is a click on each campaign."))
adtypes.append(chk("Maps ads are showing", maps_ok, tag=None if maps_ok else "click needed", sub=None if maps_ok else ("The Business Profile location set is attached, but the location asset served 0 impressions in a year: the link points at a dead or old profile. Tools and settings, Data manager, Google Business Profile: unlink it and link the live profile." if D["adTypes"]["maps_attached"] else "No Business Profile is linked, so nothing can show on Maps. Tools and settings, Data manager, link the profile.")))
adtypes.append(chk("Local Services Ads: eligible for this business in this country", (not lsa.get("eligible")) or lsa.get("running", False), certainty="inferred", tag=None if not lsa.get("eligible") else "click needed", sub=(("Not eligible, so nothing to run: " + lsa.get("reason", "")) if not lsa.get("eligible") else "Eligible; the Google Ads API cannot see an LSA account. Confirm at ads.google.com/localservices, else run /lsa-setup.")))
R = D["retargeting"]; big = R["big_lists"]
retarget = [chk("Visitor and enquiry lists exist and are big enough to use", bool(big), sub=", ".join(f"{l['name']} ({l['search']:,})" for l in big[:3]) if big else "No list over 1,000 members for search."),
            chk("Those lists are watched on every live search campaign", all(c["lists_attached"] > 0 for c in search) if search else True, tag=None if all(c["lists_attached"] > 0 for c in search) else "bigger build"),
            chk("A retargeting campaign is live for people who enquired and left", R["live_campaigns_targeting_a_list"] > 0, tag=None if R["live_campaigns_targeting_a_list"] else "bigger build"),
            chk("Past customers are excluded from the ads", R["converters_excluded"], tag=None if R["converters_excluded"] else "bigger build")]
E = {"jobValue": C.get("job_value"), "closeRate": round(100 * C.get("close_rate", 0)) if C.get("close_rate") else None}
if E["jobValue"] and E["closeRate"]: E.update(leadValue=round(E["jobValue"] * E["closeRate"] / 100), breakEven=round(E["jobValue"] * E["closeRate"] / 100), target=None, confidence=C.get("economics_confidence", "estimated"), note=C.get("economics_note", ""))
settings = {"groups": [{"name": "Conversion tracking", "checks": tracking}, {"name": "Autopilot", "checks": autopilot}, {"name": "Budgets and structure", "checks": budgets}, {"name": "Ad types", "checks": adtypes}, {"name": "Retargeting", "checks": retarget}]}

# ---------- keywords ----------
K = D["keywords"]; N = D["negatives"]; S = D["searchTerms"]
broad_no_hist = [k for k in K if k["match"] == "BROAD" and k["conv"] == 0]; broad = [k for k in K if k["match"] == "BROAD"]
rarely = [k for k in K if k["serving"] == "RARELY_SERVED"]
n_min = max(10, round(100 / T["cvr"])) if T.get("cvr") else 29
burn_cost = 3 * (AVG or 0); kw_burn = [k for k in K if k["conv"] == 0 and (k["clicks"] >= 2 * n_min or (burn_cost and k["spend"] >= burn_cost))]; term_burn = [t for t in S["top_zero"] if t["clicks"] >= 2 * n_min or (burn_cost and t["cost"] >= burn_cost)]
burn_note = f"Over a year: {2 * n_min} clicks or {money(burn_cost)} with no lead. "
keywords = {"groups": [{"name": "Coverage and match type", "checks": [
    chk("Keywords run on phrase match; broad only where a conversion history justifies it", not broad_no_hist, tag=None if not broad_no_hist else "bigger build", sub=None if not broad_no_hist else f"{len(broad_no_hist)} broad keywords with no conversion; {len(broad)} broad in all. The fix creates a phrase twin and pauses the broad, nothing removed."),
    chk("Converting search terms exist as keywords", not S["harvest"], tag=None if not S["harvest"] else "bigger build", sub=None if not S["harvest"] else "Add as phrase keywords: " + ", ".join(h["term"] for h in S["harvest"][:5])),
    chk("Most keywords are serving, not rarely-served", len(rarely) <= max(2, len(K) // 10), sub=None if len(rarely) <= 2 else f"{len(rarely)} of {len(K)} rarely served")]},
  {"name": "Negatives", "checks": [
    chk("No negative is blocking a keyword you bid on", not N["conflicts"], tag=None if not N["conflicts"] else "bigger build", sub=None if not N["conflicts"] else "; ".join(f"{c['keyword']} ({c['campaign']} / {c['ad_group']}) blocked by {c['negative']} at {c['scope']}" for c in N["conflicts"][:6])),
    chk("The universal junk list is covered", N["universal_covered"] >= 0.8 * max(1, N["universal_total"]), tag=None if N["universal_covered"] >= 0.8 * N["universal_total"] else "bigger build", sub=f"{N['universal_covered']} of {N['universal_total']} universal junk words on the account list" + (("; missing: " + ", ".join(N["universal_missing"][:12])) if N["universal_missing"] else "")),
    chk("Negatives are mostly phrase, not exact", N["phrase_share"] >= 60, tag=None if N["phrase_share"] >= 60 else "bigger build", sub=f"{N['phrase_share']}% phrase of {N['count']} negatives in scope")]},
  {"name": "Waste", "checks": [
    chk("No search term has burned money with nothing to show", not term_burn, tag=None if not term_burn else "bigger build", sub=None if not term_burn else burn_note + "; ".join(f"{t['term']} ({t['clicks']} clicks, {money(t['cost'])})" for t in term_burn[:5])),
    chk("No keyword has burned money with nothing to show", not kw_burn, tag=None if not kw_burn else "bigger build", sub=None if not kw_burn else burn_note + "; ".join(f"{k['text']} ({k['clicks']} clicks, {money(k['spend'])})" for k in kw_burn[:5]))]}]}
keywordCounts = [{"t": f"{k['campaign']} {k['ad_group']} ({k['count']})", "ok": k["count"] >= 5, "done": False} for k in sorted(D["keywordCounts"], key=lambda z: (z["campaign"], z["ad_group"]))]

# ---------- structure ----------
grp_clicks = {}
for g in D["spendBreakdown"]["byAdGroup"]: grp_clicks[g["name"]] = g
starved = [c for c in camps if c["conv"] and x(c["spend"] / c["conv"]) and x(c["spend"] / c["conv"]) <= 0.85 and c["budget_lost_share"] >= 10]
SW = [w.lower() for w in C.get("service_words", [])]; off_theme = {}
for k in K:
    if SW and not any(w in k["text"].lower() for w in SW): off_theme.setdefault(f"{k['campaign']} {k['ad_group']}", []).append(k["text"])
dormant = [g for g in D["adGroups"] if g.get("enabled_ads") and g.get("keywords") and not g.get("impressions30")]
def bid_fit(c):
    if c["target_cpa"] and c["conv"] < 15: return f"{c['short']}: a cost-per-lead target on {c['conv']:.0f} leads a month, Google wants about 15 to steer"
    if c["bidding"] in ("MANUAL_CPC", "ENHANCED_CPC") and c["conv"] >= 15: return f"{c['short']}: manual bidding with {c['conv']:.0f} leads a month, enough for Maximise conversions"
    return None
bid_misfit = [m for m in (bid_fit(c) for c in camps) if m]
def settings_by_campaign(camps):
    def sub(c, ok, note=None): return {"t": c["short"] + (f" · {note}" if note else ""), "ok": bool(ok), "done": False}
    def locs(c):
        L = c.get("locations", []); return ", ".join(L[:6]) + (f" +{len(L)-6} more" if len(L) > 6 else "")
    def plain(t):
        import unicodedata; return "".join(ch for ch in unicodedata.normalize("NFKD", t) if not unicodedata.combining(ch)).lower()
    def own_city(c):
        L = plain(" ".join(c.get("locations", [])))
        return bool(L) and (plain(c.get("city") or "") in L if c.get("city") else True)
    MUST_EXCLUDE = C.get("must_exclude_countries", [])
    S_ = [c for c in camps if c["type"] == "SEARCH"]; GOOD_ROT = ("OPTIMIZE", "CONVERSION_OPTIMIZE")
    return [
        {"t": "Location option is \"presence in\", not \"presence or interest in\"", "tag": "bigger build", "subs": [sub(c, c["geo"] == "PRESENCE", "presence in" if c["geo"] == "PRESENCE" else c["geo"].replace("_", " ").lower()) for c in camps]},
        {"t": "Each campaign targets its own city (the places read back from the account)", "tag": "bigger build", "subs": [sub(c, own_city(c), locs(c) or "none set") for c in camps]},
        {"t": "Other countries are excluded (" + ", ".join(MUST_EXCLUDE) + " at least)", "tag": "bigger build", "subs": [sub(c, all(m.lower() in " ".join(c.get("excluded_names", [])).lower() for m in MUST_EXCLUDE) and c.get("excluded_names"), ("excludes " + ", ".join(c["excluded_names"][:6]) + (f" +{len(c['excluded_names'])-6} more" if len(c["excluded_names"]) > 6 else "")) if c.get("excluded_names") else "no country excluded") for c in camps]},
        {"t": "Search Partners are off", "tag": "bigger build", "subs": [sub(c, not c["search_partners"]) for c in S_]},
        {"t": "The Display Network is off", "tag": "bigger build", "subs": [sub(c, not c["display"]) for c in S_]},
        {"t": "A language is set", "tag": "bigger build", "subs": [sub(c, c["languages"] > 0) for c in camps]},
        {"t": "An ad schedule is set", "tag": "your number", "subs": [sub(c, c["schedule_rows"] > 0) for c in S_]},
        {"t": "Ad rotation is optimised, not rotate-indefinitely", "tag": "bigger build", "subs": [sub(c, c.get("ad_rotation") in GOOD_ROT, None if c.get("ad_rotation") in GOOD_ROT else str(c.get("ad_rotation", "")).replace("_", " ").lower()) for c in S_]},
        {"t": "Budget is its own, not shared", "tag": "bigger build", "subs": [sub(c, not c["budget_shared"], f"{money(c['budget_day'])} a day") for c in camps]},
        {"t": "Bidding suits the lead volume (Maximise conversions; a target only past about 15 leads a month)", "tag": "bigger build", "subs": [sub(c, not bid_fit(c), (bid_fit(c) or "").split(": ", 1)[-1] or (c["bidding"].replace("_", " ").title() + (f", target {money(c['target_cpa'])}" if c["target_cpa"] else ""))) for c in camps]},
        {"t": "No dead device bid modifiers under smart bidding", "tag": "bigger build", "subs": [sub(c, not (c["bidding"] in SMART and c.get("device_mods")), ", ".join(c.get("device_mods", [])) or None) for c in camps]},
        {"t": "Bids on every lead goal (no campaign-level override drops calls or forms)", "tag": "bigger build", "subs": [sub(c, not c.get("goals_dropped"), ("does not bid on " + ", ".join(c["goals_dropped"])) if c.get("goals_dropped") else None) for c in camps]},
    ]
settingsByCampaign = settings_by_campaign(camps)
structure = {"groups": [{"name": "Ad groups", "checks": [chk("No keyword lives in more than one ad group with the same targeting", not D["duplicateKeywords"], tag=None if not D["duplicateKeywords"] else "bigger build", sub=None if not D["duplicateKeywords"] else f"{len(D['duplicateKeywords'])} keywords repeat across ad groups that target the same people, e.g. " + ", ".join(d["text"] for d in D["duplicateKeywords"][:4])),
    chk("Ad groups hold a single theme", not off_theme, certainty="inferred", tag=None if not off_theme else "bigger build", sub=(f"Every keyword names the service ({', '.join(SW)})." if SW and not off_theme else (None if not off_theme else "Off-theme keywords: " + "; ".join(f"{g}: {', '.join(v[:3])}" for g, v in list(off_theme.items())[:4])))),
    chk("No ad group is dormant", not dormant, tag=None if not dormant else "bigger build", sub=None if not dormant else "Live with keywords and an ad, yet no impression in the window: " + ", ".join(f"{g['campaign']} / {g['ad_group']}" for g in dormant[:6]))]},
  {"name": "Campaigns and bidding", "checks": [
    chk("All spend lands inside the service area", far_spend <= 0.02 * (T["spend"] or 1), tag=None if far_spend <= 0.02 * (T["spend"] or 1) else "bigger build", sub=(("Outside: " + ", ".join(f"{r['name']} {money(r['spend'])}" for r in far_rows[:6]) + ". ") if far_rows else "") + (("Held towns to ask about: " + ", ".join(f"{r['name']} {money(r['spend'])}" for r in held_rows[:6])) if held_rows else "") or None),
    chk("No campaign is starved while beating your average", not starved, tag=None if not starved else "your number", sub=None if not starved else "; ".join(f"{c['short']} at {money(c['spend']/c['conv'])} a lead loses {c['budget_lost_share']}% of impressions to its {money(c['budget_day'])} a day budget" for c in starved)),
    *([chk("Performance Max has brand exclusions", False, tag="click needed", sub="No API surface for brand lists: the campaign, Settings, Brand exclusions, create a list with the brand names " + ", ".join(C.get("brand_terms", [])) + ", save, on each Performance Max campaign."),
       chk("Performance Max has negative keywords", bool(N["account_terms"]), tag=None if N["account_terms"] else "bigger build", sub="The account-level list reaches Performance Max." if N["account_terms"] else "No account-level list, so Performance Max runs with no negatives.")] if pmax else []),
    chk("Remarketing lists exist and are used", bool(big) and all(c["lists_attached"] > 0 for c in search), tag=None if (bool(big) and all(c["lists_attached"] > 0 for c in search)) else "bigger build"),
    *([chk("No campaign carries a cost-per-lead target above your average without a reason", not [c for c in camps if c["target_cpa"] and AVG and c["target_cpa"] > 1.5 * AVG], tag="your number", sub="; ".join(f"{c['short']} target {money(c['target_cpa'])} against a {money(AVG)} average" for c in camps if c["target_cpa"] and AVG and c["target_cpa"] > 1.5 * AVG))] if any(c["target_cpa"] and AVG and c["target_cpa"] > 1.5 * AVG for c in camps) else [])]}]}

# ---------- pages ----------
home_search = [u for u in D["finalUrls"] if not re.sub(r'https?://[^/]+', '', u).strip('/') and any('(PMax)' not in g for g in D["finalUrls"][u])]
homepage_ok = not D["pmaxHomepage"] and not home_search
psi_rows = [p for p in P if "error" not in p and (p.get("psi") or {}).get("perf") is not None]
lcp_slow = [p for p in psi_rows if (p["psi"].get("lcp_s") or 0) > 2.5]; perf_low = [p for p in psi_rows if p["psi"]["perf"] < 50]
slow = [p for p in P if (p.get("load_s") or 0) > 3]   # stopwatch, used only when no Lighthouse result exists
path_of = lambda u: re.sub(r'^https?://[^/]+', '', u).rstrip('/') or '/'
speed_checks = ([chk("Pages pass Lighthouse on mobile (performance 50 or more, Largest Contentful Paint under 2.5 seconds)", not (lcp_slow or perf_low), tag=None if not (lcp_slow or perf_low) else "website access",
    sub=f"Lighthouse mobile run {psi_rows[0]['psi'].get('fetched')}: performance {min(p['psi']['perf'] for p in psi_rows)} to {max(p['psi']['perf'] for p in psi_rows)}" + (f", slowest paint {max(p['psi']['lcp_s'] for p in psi_rows):.1f}s." if not (lcp_slow or perf_low) else f" (green needs 90), Largest Contentful Paint {min(p['psi']['lcp_s'] for p in psi_rows):.1f} to {max(p['psi']['lcp_s'] for p in psi_rows):.1f}s against a 2.5s bar, on {len({p['url'] for p in lcp_slow + perf_low})} of {len(psi_rows)} pages."))]
  if psi_rows else [chk("Pages load in under three seconds (stopwatch only: no Lighthouse result, set PAGESPEED_API_KEY)", not slow, tag=None if not slow else "website access", sub=(f"Slowest {max((p.get('load_s') or 0) for p in P):.1f}s" if P else None) if not slow else ", ".join(f"{p['url']} {p.get('load_s')}s" for p in slow[:5]))])
no_call = [p for p in P if "error" not in p and not any(ch["t"].startswith("Tap-to-call") and ch["pass"] for ch in p.get("checks", []))]
ab = any(p.get("ab_script") for p in P); multi = [g for g, s in {g: {re.sub(r'[?#].*$', '', u).rstrip('/') for u, gs in D["finalUrls"].items() if g in gs} for gs in D["finalUrls"].values() for g in gs}.items() if len(s) > 1]
pages = {"groups": [{"name": "Message match", "checks": [chk("Ads point at a matched page, not the homepage", homepage_ok, tag=None if homepage_ok else "bigger build", sub=None if homepage_ok else "Lands on the bare homepage: " + ", ".join(D["pmaxHomepage"] + [", ".join(D["finalUrls"][u]) for u in home_search]))]},
  {"name": "Mechanics", "checks": [chk("Every final URL returns 200", all("error" not in p for p in P) if P else True, tag=None if all("error" not in p for p in P) else "website access", sub=None if all("error" not in p for p in P) else ", ".join(p["url"] for p in P if "error" in p)),
    *speed_checks,
    chk("Tap-to-call above the fold", not no_call, tag=None if not no_call else "website access", sub=None if not no_call else ", ".join(p["url"] for p in no_call[:5])),
    chk("A distinct thank-you page exists", bool(thank_you), tag=None if thank_you else "website access", sub=(", ".join(f"{a['name']} ({a['conv30']:.0f} in the window)" for a in thank_you[:2]) if thank_you else "No page-load lead action fired in the window, so form leads are not landing on a thank-you page Google can count."))]},
  {"name": "Testing", "checks": [chk("Landing pages are being split-tested (a testing script on the page, or two ads in one ad group landing on different pages)", ab or bool(multi), sub=("Detected: " + ", ".join([p["url"] for p in P if p.get("ab_script")] + multi)) if (ab or multi) else "No testing script found on any landing page, and no ad group sends its ads to two different pages. Page testing is outside this audit.")]}]}
# page scores + per 100 clicks
JOB = C.get("job_value") or 0; CLOSE = C.get("close_rate") or 0
for p in P:
    pp = D["pagePerf365"].get(p["url"]) or D["pagePerf365"].get(p["url"].rstrip("/"))
    if pp and pp["clicks"]:
        l100 = 100 * pp["conv"] / pp["clicks"]; p["per100"] = {"clicks": pp["clicks"], "leads": round(l100, 1), "jobs": round(l100 * CLOSE, 2), "money": round(l100 * CLOSE * JOB), "cost": round(100 * pp["cost"] / pp["clicks"]), "cpl": round(pp["cost"] / pp["conv"], 2) if pp["conv"] else None}
    else: p["per100"] = None
lp_pages = [{"t": re.sub(r'^https?://(www\.)?', '', u).rstrip('/') + (f" ({b} of {n} keywords below)" if b else ""), "ok": b == 0, "done": False} for u, (b, n) in D["lpGradeByPage"].items() if n]

# ---------- campaigns table + issue rows ----------
G = D["gradesByGroup"]; groupGrades = {}
for gid, g in G.items():
    key = f"{g['campaign']} {g['ad_group']}"; groupGrades[key] = {k: ("" if g[k][0] == 0 else f"{g[k][0]} of {g[k][1]}") for k in ("ctr", "rel")}
qualityTable = sorted([{"group": f"{g['campaign']} {g['ad_group']}", "keywords": (g.get("qs") or [0, 0])[1], "qs": round(g["qs"][0] / g["qs"][1], 1) if g.get("qs") and g["qs"][1] else None, "ctr": g.get("ctr3"), "rel": g.get("rel3"), "lp": g.get("lp3")} for g in G.values()], key=lambda r: (r["qs"] is None, -(r["qs"] or 0)))
ad_groups_by_camp = {}
for g in D["adGroups"]: ad_groups_by_camp.setdefault(g["campaign"], []).append(g)
REQ = {'SITELINK': 'Sitelinks', 'CALLOUT': 'Callouts', 'STRUCTURED_SNIPPET': 'Structured snippets', 'CALL': 'Call button', 'LEAD_FORM': 'Lead form', 'BUSINESS_MESSAGE': 'Message', 'LOCATION': 'Location', 'AD_IMAGE': 'Images', 'BUSINESS_NAME': 'Business name', 'BUSINESS_LOGO': 'Business logo'}
OPT = {'PRICE': 'Price', 'MOBILE_APP': 'App', 'PROMOTION': 'Promotion'}
assets_by_type = {a["type"]: a for a in D["assets"]}
campaigns_out = []
for c in camps:
    cpl = (c["spend"] / c["conv"]) if c["conv"] else None; issues = []
    xx = x(cpl)
    if xx and xx >= 1.5: issues.append({"cat": "budget", "level": "bad", "what": f"Bleeding: {money(cpl)} a lead, {xx:.1f}x your average, on {money(c['spend'])} a month. Find the cause first (negatives, page, ads), re-read at 30 days; still over 1.5x, trim the budget and move it to a campaign of the same type that beats the average.", "cost": round(c["spend"]), "tag": "your number"})
    elif xx and xx <= 0.85: issues.append({"cat": "budget", "level": "good", "what": f"Cheap: {money(cpl)} a lead, {1/xx:.1f}x better than average" + (f", capped, losing {c['budget_lost_share']}% of impressions to its {money(c['budget_day'])} a day budget. Feed it from a bleeder of the same type." if c["budget_lost_share"] >= 10 else "."), "tag": "protect"})
    for g in ad_groups_by_camp.get(c["name"], []):
        if g["enabled_ads"] >= 2: issues.append({"cat": "ads", "level": "warn", "what": f"{g['ad_group']}: split test running, {g['enabled_ads']} ads competing", "ok": True})
        elif g.get("paused_ads"): issues.append({"cat": "ads", "level": "warn", "what": f"{g['ad_group']}: a challenger sits PAUSED. Switch it on to start the test.", "ok": False, "tag": "click needed"})
        else: issues.append({"cat": "ads", "level": "warn", "what": f"{g['ad_group']}: no split test, 1 ad. Needs a second ad written from the owner's proof, lands paused.", "ok": False, "tag": "your proof"})
    for t, label in REQ.items():
        a = assets_by_type.get(t); present = c["short"] in a["with"] if a else False
        if t == 'LOCATION' and not maps_ok: issues.append({"cat": "assets", "level": "warn", "what": f"{label}: attached through the profile sync but showing nothing", "ok": False, "tag": "click needed"})
        elif present: issues.append({"cat": "assets", "level": "warn", "what": f"{label}: on the campaign", "ok": True})
        else: issues.append({"cat": "assets", "level": "warn", "what": f"{label}: missing on this campaign", "ok": False, "tag": "your number" if t in ('CALL', 'LEAD_FORM', 'BUSINESS_MESSAGE') else ("your proof" if t == 'AD_IMAGE' else "bigger build")})
    campaigns_out.append({"name": c["short"], "status": "enabled", "spend": c["spend"], "conv": c["conv"], "cpl": round(cpl, 2) if cpl else None, "checks": {}, "issues": issues})
assetTable = []
for t, label in list(REQ.items()) + list(OPT.items()):
    a = assets_by_type[t]; on, n = a["campaigns_with"], a["campaigns_total"]; opt = t in OPT
    if opt: st, note, tag = "pass", ("Optional, not set up." if on == 0 else ""), None
    elif t == 'LOCATION' and not maps_ok: st, note, tag = "fail", "Attached through the Business Profile sync but served 0 impressions in a year: the link points at a dead or old profile.", "click needed"
    elif on < n: st, note, tag = "fail", ("Incomplete: missing on " + ", ".join(a["missing"]) + "."), ("your number" if t in ('CALL', 'LEAD_FORM', 'BUSINESS_MESSAGE') else ("your proof" if t == 'AD_IMAGE' else "bigger build"))
    elif a["impressions"] == 0: st, note, tag = "fail", "On every campaign but served nothing in a year.", "click needed"
    else: st, note, tag = "pass", "", None
    assetTable.append({"name": label, "need": "optional" if opt else "required", "on": on, "of": n, "account": a["account"], "impressions": a["impressions"], "clicks": a["clicks"], "conv": a["conv"], "status": st, "note": note, "tag": tag})

# ---------- findings (the fix-first index) ----------
leaks = []
def leak(name, section, sev, monthly, progress, detail, fix, who, urgent=False, status=None):
    leaks.append({"name": name, "section": section, "severity": sev, "monthly": monthly, "status": status or ("settings" if monthly is None else "open"), "progress": progress, "detail": detail, "fix": fix, "who": who, "urgent": urgent, "certainty": "measured", "items": []})
if N["own_city_blocks"]:
    leak("A campaign blocks its own city name", "campaigns", 10, None, "bigger build", "; ".join(f"{c['campaign']} carries '{c['negative']}' as a negative, so it cannot serve on its own city" for c in N["own_city_blocks"]), "Remove the negative by API (remove_negatives.py); reversible.", "me, through the API", urgent=True)
if D["adTypes"]["maps_attached"] and not maps_ok:
    leak("Your ads are not reaching Google Maps", "account", 9, None, "click needed", "The Business Profile is linked and its location set attached, yet the location asset served 0 impressions in the last 365 days: the link points at a dead or old profile.", "Tools and settings, Data manager, Google Business Profile: unlink the current profile and link the live one; the sync then replaces the dead location assets.", "you, in Google Ads · then I re-read", urgent=True)
if not calls_counted and call_acts:
    leak("No phone call is being counted", "account", 9, None, "website access", "Every phone-call action reads zero while the landing pages carry tap-to-call, so the account is judged on forms alone.", "With site access I fix the call tag so tap-to-call fires the conversion and verify it in a real browser. The Google Ads side is already set.", "you answer, then me")
if aa["enabled"]:
    leak("Google is changing your account by itself", "account", 8, None, "click needed" if aa["unknown_enabled"] == aa["enabled"] else "bigger build", f"{aa['enabled']} auto-apply types are on; Google can rewrite bids, keywords and ads without asking.", "pause_auto_apply.py pauses every type the API can name; the rest are unticked under Admin, Recommendations auto-apply.", "me, then you")
if junk_biddable:
    leak("Junk goals are steering the bidding", "account", 6, None, "bigger build", "Goals that are not leads are primary and biddable: " + ", ".join(f"{g['category']}/{g['origin']}" for g in junk_biddable), "demote_conversion_goals.py takes them out of bidding.", "me, through the API")
for c in camps:
    cpl = (c["spend"] / c["conv"]) if c["conv"] else None; xx = x(cpl)
    if xx and xx >= 1.5 and AVG: leak(f"{c['short']} costs {xx:.1f}x your average per lead", "campaigns", 7, round((cpl - AVG) * c["conv"]), "your number", f"{money(cpl)} a lead against {money(AVG)}, on {money(c['spend'])} a month; {money((cpl-AVG)*c['conv'])} of that is paid above your own average.", "Fix the cause first, re-read at 30 days, then trim and move the money within the same campaign type.", "you decide the number")
if pmax: leak("Performance Max runs without a brand list", "campaigns", 7, None, "click needed", "Without brand exclusions Performance Max buys searches for your own name and reports them as wins.", "The campaign, Settings, Brand exclusions, create the list, on each Performance Max campaign.", "you, in Google Ads")
if N["conflicts"] and not N["own_city_blocks"]: leak("Your own negatives block keywords you bid on", "keywords", 8, None, "bigger build", f"{len(N['conflicts'])} live keywords are blocked by a negative and show Active with zero impressions.", "Remove the negative or move it to a narrower level (remove_negatives.py).", "me, through the API")
if S["blockRows"]:
    staged = [r for r in S["blockRows"] if r["status"].startswith("stage")]
    if staged: leak("Searches that could never buy are getting clicks", "keywords", 5, round(S["junk_cost_365"] / 12), "bigger build", f"{len({r['term'] for r in staged})} far-away or not-sold searches took clicks with no lead over the year.", "Stage them as phrase negatives at account level after a conflict check; held towns get asked first.", "me, through the API")
if broad_no_hist: leak("Broad match keywords with no conversion history", "keywords", 6, None, "bigger build", f"{len(broad_no_hist)} broad keywords never converted; broad hides the most search terms.", "change_match_type.py: phrase twin created, broad paused, nothing removed.", "me, through the API")
if starved: leak("A winning campaign is capped by budget", "campaigns", 5, None, "your number", "; ".join(f"{c['short']} at {money(c['spend']/c['conv'])} a lead loses {c['budget_lost_share']}% of impressions to budget" for c in starved), "Feed it from a bleeder of the same campaign type; the number is yours.", "you decide the number")
byHand = [{"title": l["name"], "why": l["detail"], "path": l["fix"], "done": "The check row reads pass on the next run.", "verify": "I re-read it by API."} for l in leaks if l["progress"] == "click needed"]
if psi_rows and (lcp_slow or perf_low):
    byHand.append({"title": "Speed up the landing pages on mobile",
      "why": f"Lighthouse mobile puts the pages at performance {min(p['psi']['perf'] for p in psi_rows)} to {max(p['psi']['perf'] for p in psi_rows)}, with the main image painting after {min(p['psi']['lcp_s'] for p in psi_rows):.0f} to {max(p['psi']['lcp_s'] for p in psi_rows):.0f} seconds. Google grades landing page experience on mobile speed, so slow pages cost Quality Score and leads. This is website work, not a Google Ads click.",
      "path": "On the website: compress and resize the hero image on each page (WebP, under 200 KB), lazy-load every image below the fold, turn on page caching with script deferral, and remove unused page-builder widgets and font files. A developer does this in a day.",
      "done": "PageSpeed Insights, mobile, shows performance 50 or more and Largest Contentful Paint under 2.5 seconds on every page.",
      "verify": "I re-run the Lighthouse pass (python3 code/psi_speed.py --pages <cro json> --max-age-days 0) and the Lighthouse row in the pages section turns green."})

# ---------- before/after ----------
def apply_prev(groups_now, groups_prev):
    prev = {c["t"]: c["a"] for g in groups_prev for c in g["checks"]}
    for g in groups_now:
        for c in g["checks"]:
            if c["t"] in prev: c["b"] = prev[c["t"]]
def nested_as_checks(parents): return [{"t": p["t"], "b": "pass" if all(x["ok"] for x in p["subs"]) else "fail", "a": "pass" if all(x["ok"] or x.get("done") for x in p["subs"]) else "fail", "tag": None if all(x["ok"] for x in p["subs"]) else p.get("tag")} for p in parents if p["subs"]]
blocks = {"settings": settings, "keywords": keywords, "structure": structure, "pages": pages, "creative": {"groups": []}, "settingsByCampaign": {"groups": [{"name": "Settings, by campaign", "checks": nested_as_checks(settingsByCampaign)}]}}
if PREV and "built" in PREV:
    for k in blocks: apply_prev(blocks[k]["groups"], PREV["built"].get(k, {}).get("groups", []))
tb = pb = pa = 0
for k in blocks:
    for g in blocks[k]["groups"]:
        for c in g["checks"]: tb += 1; pb += c["b"] == "pass"; pa += c["a"] == "pass"
before, after = round(100 * pb / tb), round(100 * pa / tb)
OWNER_TAGS = {"click needed", "your proof", "your number", "website access"}
pp = sum(1 for k in blocks for g in blocks[k]["groups"] for c in g["checks"] if c["a"] == "pass" or c.get("tag") not in OWNER_TAGS)
projected = round(100 * pp / tb)
for l in leaks:
    if l["progress"] in ("bigger build",) and False: pass

# ---------- money at risk, trust, trend ----------
low = round(sum((c["spend"] / c["conv"] - AVG) * c["conv"] for c in camps if c["conv"] and AVG and c["spend"] / c["conv"] > AVG) + S["junk_cost_365"] / 12)
over = [(c["short"], (c["spend"] / c["conv"] - AVG) * c["conv"]) for c in camps if c["conv"] and AVG and c["spend"] / c["conv"] > AVG]
below_pages = {u for u, (b, n) in D["lpGradeByPage"].items() if n and b == n}; camp_below = {g.split(" / ")[0] for u in below_pages for g in D["finalUrls"].get(u, []) if "(PMax)" not in g}
ceiling = round(sum(c["spend"] for c in camps if c["short"] in camp_below))
high = max(min(ceiling, round(T["spend"])), low); low = min(low, round(T["spend"]))
hidden = round(100 * (1 - S["visible_clicks_365"] / max(1, D["adTable"]["avg"] and sum(a["clicks"] for a in D["adTable"]["ads"]) or 1))) if D["adTable"]["ads"] else None
verdict = "healthy" if calls_counted and recording else ("partly blind" if not calls_counted else "broken")
trust = {"verdict": verdict, "notCounted": ("Every phone call: the call actions read zero while pages carry tap-to-call." if not calls_counted else ""), "hiddenSearchTermShare": hidden, "cvrUsed": T["cvr"], "cvrCaveat": ("The conversion rate is understated because no phone call is counted." if not calls_counted else "")}
trend = {"window": D["window"], "previous": "the 30 days before", "spend": {"now": T["spend"], "then": T["prev_spend"]}, "conv": {"now": T["conv"], "then": T["prev_conv"]}, "cpl": {"now": T["cpl"], "then": round(T["prev_spend"] / T["prev_conv"], 2) if T["prev_conv"] else None}, "cvr": {"now": T["cvr"], "then": round(100 * T["prev_conv"] / T["prev_clicks"], 2) if T["prev_clicks"] else None}}
anon = A.anonymise
out = {"mode": "owner", "namePrefix": D.get("namePrefix", ""), "business": C.get("business", D["account"]["name"]) if anon else D["account"]["name"], "account": "XXX-XXX-XXXX" if anon else re.sub(r'(\d{3})(\d{3})(\d{4})', r'\1-\2-\3', str(D["customer"])), "domain": ("djcompany.example" if anon else C.get("domain", "")), "date": D["generated"], "window": D["window"], "spend": round(T["spend"]), "currency": C.get("currency", D["account"]["currency"]),
       "before": before, "after": after, "projectedAfter": projected, "issuesBefore": tb - pb, "issuesAfter": tb - pa, "passes": 1 if PREV else 0, "minutes": None, "avgCpl": AVG,
       "scoreMath": f"Score = checks passing out of all {tb} checks in the five sections, same formula before and after. Before: {pb} of {tb}. Now: {pa} of {tb}. Every check not tagged for your click, number, proof or website access, fixed: {pp} of {tb}.",
       "atRisk": {"total": low, "low": low, "high": high, "summary": f"{money(low)} a month is counted: {money(sum(v for _, v in over))} paid above your own cost per lead on {', '.join(n for n, _ in over) or 'no campaign'}, plus {money(S['junk_cost_365'] / 12)} of junk clicks. {money(high)} a month is the ceiling: every dollar landing on a page Google grades below average on all its keywords ({len(below_pages)} of {len(D['lpGradeByPage'])} pages), the most a better page could win back.", "math": "Low end, counted: for each campaign costing more than the account average per lead, (its cost per lead minus the average) times its leads, in the window; plus a twelfth of the year's clicks on searches that could never buy. High end, ceiling: the window's spend on keywords whose landing page Google rates below average. Never added together; never above the spend in the window; phone-blind spend left out, because unmeasured is not wasted."},
       "trust": trust, "economics": E, "trend": trend, "benchmark": C.get("benchmark", {}), "leaks": leaks, "byHand": byHand,
       "settings": settings, "keywords": keywords, "structure": structure, "pages": pages, "creative": {"groups": []}, "settingsByCampaign": settingsByCampaign,
       "campaigns": campaigns_out, "spendBreakdown": {k: [{"name": r["name"], "spend": r["spend"], "share": round(100 * r["spend"] / T["spend"]) if T["spend"] else 0, "conv": r["conv"], "cpl": round(r["spend"] / r["conv"], 2) if r["conv"] else None} for r in v] for k, v in D["spendBreakdown"].items()},
       "adTable": {**D["adTable"], "groupGrades": groupGrades}, "assetTable": assetTable, "adBuild": D["adBuild"], "adBuildAll": D["adBuildAll"],
       "googleGrades": {"ctr": [{"t": f"{g['campaign']} {g['ad_group']}" + (f" ({g['ctr'][0]} of {g['ctr'][1]} below)" if g['ctr'][0] else ""), "ok": g['ctr'][0] == 0, "done": False} for g in G.values()], "rel": [{"t": f"{g['campaign']} {g['ad_group']}" + (f" ({g['rel'][0]} of {g['rel'][1]} below)" if g['rel'][0] else ""), "ok": g['rel'][0] == 0, "done": False} for g in G.values()], "lp_pages": lp_pages},
       "keywordCounts": keywordCounts, "qualityTable": qualityTable, "blockRows": [{**r, "campaign": r["campaign"][:1].upper() + r["campaign"][1:]} for r in S["blockRows"]], "pageScores": P,
       "negatives": {"coverage": {"existing": N["count"], "universalCovered": N["universal_covered"], "universalTotal": N["universal_total"], "universalMissing": N["universal_missing"], "note": f"{N['count']} negatives reach at least one live campaign; {N['universal_covered']} of {N['universal_total']} universal junk words are on the account list."}, "ready": [], "askFirst": [{"term": h, "note": "how far do you travel?"} for h in C.get("held_places", [])]},
       "adPerformance": {"accountCtr": T["ctr"], "accountCvr": T["cvr"], "ctrBenchmark": C.get("benchmark", {}).get("ctr"), "cvrBenchmark": C.get("benchmark", {}).get("cvr"), "outliers": []},
       "working": {"keywords": [{"t": k["text"], "conv": k["conv"], "cpl": round(k["spend"] / k["conv"], 2)} for k in sorted([k for k in K if k["conv"] >= 2], key=lambda k: k["spend"] / k["conv"])[:5]], "terms": [], "bestCampaign": None, "note": ""},
       "splitTests": {"adGroups": [{"name": f"{g['campaign']} / {g['ad_group']}", "ads": g["enabled_ads"], "spend": 0} for g in D["adGroups"]], "oldestTestDays": None, "experiments": 0},
       "quality": {"components": {}, "rated": 0}, "gbp": {"linked": D["adTypes"]["gbp_linked"], "autoGoalsSecondary": not junk_biddable, "note": ""}, "other": [], "waived": [], "rawAfter": None, "built": blocks}
if anon:
    txt = json.dumps(out, ensure_ascii=False)
    for a_, b_ in [(C.get("domain", "zzz"), "djcompany.example"), (D["account"]["name"], C.get("business", "The business"))] + [(t, "your brand") for t in C.get("brand_terms", [])]:
        if a_: txt = re.sub(re.escape(a_), b_, txt, flags=re.I)
    out = json.loads(txt)
tpl = open(A.template).read(); m = re.search(r'(<script id="audit-data" type="application/json">)(.*?)(</script>)', tpl, re.S)
html = tpl[:m.start()] + m.group(1) + json.dumps(out, ensure_ascii=False, indent=1) + m.group(3) + tpl[m.end():]
if anon:
    for a_, b_ in [(C.get("domain", "zzz"), "djcompany.example"), (D["account"]["name"], C.get("business", "The business"))] + [(t, "your brand") for t in C.get("brand_terms", [])]:
        if a_: html = re.sub(re.escape(a_), b_, html, flags=re.I)
open(A.out, "w").write(html)
print(f"built {A.out} · {tb} checks · before {before} ({tb-pb} open) · after {after} ({tb-pa} open) · {len(leaks)} findings · money at risk {money(low)} to {money(high)}")
