"""Lighthouse page speed through the PageSpeed Insights API (mobile, performance category).
Reads PAGESPEED_API_KEY from .env. Raw reports are cached in code/cache/psi/ and reused for
--max-age-days (default 7) so a re-run of the audit does not burn a fresh Lighthouse pass.
Usage: python3 code/psi_speed.py --pages code/cache/<c>-cro-<date>.json        # attaches "psi" to every row, rewrites the file
       python3 code/psi_speed.py --urls https://a.com/x,https://a.com/y          # prints a table
Importable: attach_psi(rows) -> new rows list with a "psi" dict per row (never mutates the input).
"""
import argparse, hashlib, json, os, sys, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "code", "cache", "psi")
API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
AUDITS = {"lcp_s": ("largest-contentful-paint", 1000), "fcp_s": ("first-contentful-paint", 1000), "si_s": ("speed-index", 1000),
          "tbt_ms": ("total-blocking-time", 1), "cls": ("cumulative-layout-shift", 1)}
LCP_GOOD_S = 2.5      # Core Web Vitals "good" threshold
PERF_FLOOR = 50       # Lighthouse's orange/red boundary; 90 is green


def _key() -> str:
    load_dotenv(os.path.join(ROOT, ".env"))
    k = os.environ.get("PAGESPEED_API_KEY", "")
    if not k:
        raise SystemExit("PAGESPEED_API_KEY missing from .env")
    return k


def _cache_path(url: str, strategy: str) -> str:
    return os.path.join(CACHE, hashlib.sha1(f"{strategy} {url}".encode()).hexdigest()[:16] + ".json")


def _fresh(path: str, max_age_days: int) -> bool:
    if not os.path.exists(path):
        return False
    age = datetime.now(timezone.utc) - datetime.fromtimestamp(os.path.getmtime(path), timezone.utc)
    return age < timedelta(days=max_age_days)


def fetch_raw(url: str, strategy: str = "mobile", max_age_days: int = 7, tries: int = 3) -> dict:
    """Raw PSI response for one URL, from cache when fresh, else from the API with retries."""
    os.makedirs(CACHE, exist_ok=True)
    path = _cache_path(url, strategy)
    if _fresh(path, max_age_days):
        return json.load(open(path))
    q = urllib.parse.urlencode({"url": url, "strategy": strategy, "category": "performance", "key": _key()})
    last = None
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(f"{API}?{q}", timeout=120) as r:
                raw = json.load(r)
            json.dump(raw, open(path, "w"))
            return raw
        except Exception as e:  # PSI is flaky under load; back off and retry
            last = e; time.sleep(10 * (attempt + 1))
    return {"error": str(last)[:160]}


def summarise(raw: dict) -> dict:
    """The handful of numbers the audit uses, from a raw PSI response."""
    if "error" in raw or "lighthouseResult" not in raw:
        return {"error": raw.get("error") or "no lighthouseResult in the response"}
    L = raw["lighthouseResult"]; a = L.get("audits", {})
    out = {"perf": round(100 * (L.get("categories", {}).get("performance", {}).get("score") or 0)),
           "strategy": L.get("configSettings", {}).get("formFactor", "mobile"), "version": L.get("lighthouseVersion"),
           "fetched": (raw.get("analysisUTCTimestamp") or "")[:10]}
    for k, (audit, div) in AUDITS.items():
        v = (a.get(audit) or {}).get("numericValue")
        out[k] = None if v is None else round(v / div, 3 if k == "cls" else 2)
    field = (raw.get("loadingExperience") or {}).get("metrics") or {}
    if field.get("LARGEST_CONTENTFUL_PAINT_MS"):
        out["field_lcp_s"] = round(field["LARGEST_CONTENTFUL_PAINT_MS"]["percentile"] / 1000, 2)
        out["field_verdict"] = (raw.get("loadingExperience") or {}).get("overall_category")
    return out


def attach_psi(rows: list, strategy: str = "mobile", max_age_days: int = 7, workers: int = 3) -> list:
    """New list of page rows, each carrying a 'psi' summary. Rows that errored on fetch are left as they are."""
    live = [r for r in rows if "error" not in r]
    with ThreadPoolExecutor(max_workers=workers) as ex:
        got = dict(zip([r["url"] for r in live], ex.map(lambda r: summarise(fetch_raw(r["url"], strategy, max_age_days)), live)))
    return [{**r, "psi": got[r["url"]]} if r["url"] in got else dict(r) for r in rows]


def line(r: dict) -> str:
    p = r.get("psi") or {}
    if "error" in p or not p:
        return f"  ERR  {r['url']}  {p.get('error', 'not fetched')}"
    return f"  {p['perf']:>3}  LCP {p['lcp_s']:>5}s  FCP {p['fcp_s']:>5}s  SI {p['si_s']:>5}s  TBT {p['tbt_ms']:>5}ms  CLS {p['cls']:<5}  {r['url']}"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pages"); ap.add_argument("--urls", default=""); ap.add_argument("--strategy", default="mobile", choices=["mobile", "desktop"])
    ap.add_argument("--max-age-days", type=int, default=7); ap.add_argument("--workers", type=int, default=3)
    a = ap.parse_args()
    if a.pages:
        rows = json.load(open(a.pages))
        rows = attach_psi(rows, a.strategy, a.max_age_days, a.workers)
        json.dump(rows, open(a.pages, "w"), indent=1)
        print(f"wrote {a.pages} · Lighthouse {a.strategy}")
    elif a.urls:
        rows = attach_psi([{"url": u.strip()} for u in a.urls.split(",") if u.strip()], a.strategy, a.max_age_days, a.workers)
    else:
        raise SystemExit("pass --pages or --urls")
    print("  perf  LCP        FCP        SI         TBT         CLS")
    for r in rows: print(line(r))
    bad = [r for r in rows if "error" in (r.get("psi") or {"error": 1})]
    if bad: print(f"{len(bad)} page(s) without a Lighthouse result", file=sys.stderr)


if __name__ == "__main__":
    main()
