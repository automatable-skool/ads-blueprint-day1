"""Make a BEFORE-state page in the current dashboard style from an AFTER page (Jono, 15 Sep 2026).
The after page stores both states on every check (b = before, a = after). This writes a new file where
every row shows its before state, findings read as open recommendations, and the scorecard shows
"Projected after the fixes". The source file is never touched.
Usage: python3 code/derive_before_state.py assets/audit-report-filming.html assets/audit-report-filming-before.html [--date "1 September 2026"]
"""
import argparse, json, re

TAG = '<script id="audit-data" type="application/json">'
SECTIONS = ("settings", "structure", "creative", "pages", "keywords")
FIXED = ("fixed", "partly fixed")


def progress_for(who):
    w = (who or "").lower()
    if w.startswith("me"): return "bigger build"
    if "you decide" in w or "your number" in w: return "your number"
    return "click needed"


def revert_check(c):
    if c["a"] != c["b"]:
        c["a"] = c["b"]
        if c.get("why"): c["sub"] = c["why"]
        elif c.get("was"): c["sub"] = c["was"]
        else: c.pop("sub", None)
        c.pop("note", None)
        if c.get("tag") in FIXED or not c.get("tag"): c["tag"] = "bigger build" if c["b"] == "fail" else None
    if c.get("tag") in FIXED: c["tag"] = "bigger build" if c["b"] == "fail" else None
    if c["b"] == "fail": c.pop("note", None)
    return c


def derive(D, date):
    for sec in SECTIONS:
        for g in D.get(sec, {}).get("groups", []):
            g["checks"] = [revert_check(c) for c in g["checks"]]
    for l in D.get("leaks", []):
        if l.get("progress") in FIXED: l["progress"] = progress_for(l.get("who"))
        if l.get("status") == "stopped": l["status"] = "open" if l.get("monthly") else "settings"
        for k in ("done", "result", "readBack", "readback", "after", "fixedOn"): l.pop(k, None)
    for cp in D.get("campaigns", []):
        for i in cp.get("issues", []):
            if i.get("done"): i["done"] = False
            if i.get("tag") in FIXED: i["tag"] = "bigger build"
    for row in D.get("assetTable", []):
        if row.get("tag") in FIXED: row["tag"] = "bigger build"
    for b in D.get("adBuild", []): b["done"] = False
    for k, items in D.get("googleGrades", {}).items():
        for it in items: it["done"] = False
    for it in D.get("keywordCounts", []): it["done"] = False
    for par in D.get("settingsByCampaign", []):
        for it in par.get("subs", []):
            if it.get("done"): it["t"] = re.sub(r",\s*(optimised|cleared|fixed|removed|added|now)\b.*$", "", it["t"])
            it["done"] = False
    for it in D.get("tightness", {}).get("themes", []): it["done"] = False
    for r in D.get("negatives", {}).get("ready", []): r["status"] = "staged, needs your yes"
    if isinstance(D.get("adTable"), dict): D["adTable"]["recentFix"] = {}
    for o in D.get("other", []): o["after"] = o["before"]
    if date: D["date"] = date
    D["after"] = D["before"]; D["issuesAfter"] = D["issuesBefore"]; D["passes"] = 0; D["rawAfter"] = None
    D["scoreMath"] = re.sub(r" After the fixes:.*$", f" Every item I can fix by API, fixed, would take it to {D.get('projectedAfter')}.", D.get("scoreMath", ""))
    return D


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("src"); ap.add_argument("out"); ap.add_argument("--date", default=None)
    a = ap.parse_args()
    html = open(a.src).read(); s = html.index(TAG) + len(TAG); e = html.index("</script>", s)
    D = derive(json.loads(html[s:e]), a.date)
    open(a.out, "w").write(html[:s] + json.dumps(D, ensure_ascii=False, indent=1) + html[e:])
    stray = json.dumps(D).count('"fixed"')
    print(f"wrote {a.out} · before {D['before']} · projected {D.get('projectedAfter')} · {D['issuesBefore']} checks open · stray 'fixed' strings: {stray}")


if __name__ == "__main__":
    main()
