"""Score every live landing page on the 13-point conversion checklist, headless.
Sources: references/cro-cheatsheet.md (7 rules) + the Agency Website cro-checks (15 machine checks),
merged and deduped to 18 items. Proof items count double (Jono, 12 Sep 2026: "mostly social proof").
Usage: python3 code/cro_score.py code/cache/<final-urls>.json code/cache/<out>.json
         [--service "drain cleaning,plumber"] [--cities "dallas,plano,frisco"]
--service and --cities are THIS account's words. Pass them from context/business.md, or leave
them off and the script reads "## What we do" and "## Service area" from that file itself.
No service words anywhere = the script stops; the headline check is meaningless without them.
Without cities the city is read from the URL path only if the page names one it can find,
so a business with no service area sees the three city checks fail - by design, not by accident.
Reads a {url: [ad groups]} map, loads each page in headless Chromium at phone size, writes per-page
checks, score (0-100) and proof score. Never opens a window.
"""
import json, re, sys, time
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
import _business as biz

src, out = sys.argv[1], sys.argv[2]
def _arg(flag, default):
    return sys.argv[sys.argv.index(flag) + 1] if flag in sys.argv else default

service = [s.strip().lower() for s in _arg('--service', '').split(',') if s.strip()] or biz.sells()
if not service:
    sys.exit('cro_score: pass --service "a,b" or fill "## What we do" in context/business.md - '
             'the headline check needs this account\'s own service words, never a default')
raw = json.load(open(src)); urls = {}
for u, g in raw.items():
    k = re.sub(r'\?.*$', '', u).rstrip('/'); urls.setdefault(k, set()).update(g)
urls = {k: sorted(v) for k, v in urls.items()}
# The account's service areas. Pass --cities "dallas,plano,frisco", or the script reads
# "## Service area" from context/business.md. Never a built-in list of somebody else's cities.
CITIES = [c.strip().lower() for c in _arg('--cities', '').split(',') if c.strip()] or biz.service_areas()
if not CITIES:
    print("cro_score: no --cities and no '## Service area' in context/business.md - the city checks will fail", file=sys.stderr)

def city_of(u):
    """The city this page is for: from the URL path, else from its slug or host."""
    p = urlparse(u).path.lower()
    hit = next((c for c in CITIES if c in p), '')
    if hit:
        return hit
    return next((c for c in CITIES if c in urlparse(u).netloc.lower()), '')

W = {"proof": 2}   # checklist weights: proof counts double

def with_lighthouse(r):
    """The same row with its speed check judged by Lighthouse LCP (mobile) instead of the stopwatch, rescored."""
    lcp = (r.get("psi") or {}).get("lcp_s")
    if "error" in r or lcp is None: return r
    checks = [{"t": f"Largest Contentful Paint under {LCP_GOOD_S} seconds (Lighthouse, mobile)", "pass": lcp <= LCP_GOOD_S, "kind": "speed"} if c["kind"] == "speed" else c for c in r["checks"]]
    tot = sum(W.get(c["kind"], 1) for c in checks); got = sum(W.get(c["kind"], 1) for c in checks if c["pass"])
    return {**r, "checks": checks, "score": round(100 * got / tot)}

def score_page(pg, url, groups):
    t0 = time.time()
    try: pg.goto(url, wait_until='load', timeout=30000)
    except Exception as e: return {"url": url, "groups": groups, "error": str(e)[:120]}
    load_s = round(time.time() - t0, 2)
    try: pg.wait_for_load_state('networkidle', timeout=8000)
    except Exception: pass
    pg.wait_for_timeout(500)
    try: html = pg.content(); text = re.sub(r'\s+', ' ', pg.inner_text('body')).lower()
    except Exception as e: return {"url": url, "groups": groups, "error": 'page kept navigating: ' + str(e)[:80]}
    if re.search(r'sgcaptcha|captcha|cf-challenge|just a moment|attention required', html, re.I) and len(html) < 20000:
        return {"url": url, "groups": groups, "error": "blocked by the host's bot check (captcha)"}
    city = city_of(url)
    h1 = (pg.locator('h1').first.inner_text() if pg.locator('h1').count() else '').strip()
    title = pg.title()
    fold = pg.evaluate("""() => { const H = window.innerHeight; const els = [...document.querySelectorAll('a,button,input[type=submit]')];
      const vis = e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.top < H && r.width > 0 && r.height > 0; };
      const cta = els.filter(e => vis(e) && /call|quote|book|contact|get |request|start|check|reserve|price|talk/i.test(e.innerText || e.value || ''));
      const tel = els.filter(e => vis(e) && /^tel:/i.test(e.getAttribute('href') || ''));
      return { cta: cta.length, tel: tel.length, navLinks: [...document.querySelectorAll('header a, nav a')].filter(vis).length }; }""")
    forms = pg.evaluate("""() => [...document.querySelectorAll('form')].map(f => ({ fields: [...f.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]),select,textarea')].length,
      button: (f.querySelector('button, input[type=submit]') || {}).innerText || (f.querySelector('input[type=submit]') || {}).value || '' }))""")
    real_forms = [f for f in forms if f['fields'] >= 2]
    popup = pg.evaluate("""() => [...document.querySelectorAll('[role=dialog], .modal, .popup, [class*=popup], [class*=modal], [id*=popup]')].some(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 200 && r.height > 150 && s.display !== 'none' && s.visibility !== 'hidden'; })""")
    imgs = pg.evaluate("() => [...document.images].filter(i => i.naturalWidth > 200 && i.naturalHeight > 150).length")
    stars = bool(re.search(r'(\d\.\d\s*(stars?|/\s*5|out of 5))|★|⭐|(\d+)\+?\s*(google\s+)?reviews|\b(5|five)[\s-]*stars?\b|5[\s-]*star[\s-]*rated|rated\s+5', text))
    numbers = bool(re.search(r'\b(\d{1,3}(,\d{3})+|\d+\+)\s*(customers|clients|jobs|projects|homes|patients|members|students|events|weddings|couples|reviews|installs|repairs|cases|years)', text)) or bool(re.search(r'\b\d+\+?\s*years', text))
    checks = [
      ("Headline names the service and the city, in a line that sells", any(x in (h1 or '').lower() for x in service) and bool(city) and city in (h1 or '').lower(), "match"),
      ("One call to action above the fold on a phone", 1 <= fold['cta'] <= 3, "cta"),
      ("Tap-to-call number above the fold", fold['tel'] >= 1, "cta"),
      ("Lead form on the page", len(real_forms) >= 1, "form"),
      ("Form has 8 fields or fewer", bool(real_forms) and min(f['fields'] for f in real_forms) <= 8, "form"),
      ("Review stars with a count", stars, "proof"),
      ("Social proof numbers (jobs, years, clients)", numbers, "proof"),
      ("Testimonials section", bool(re.search(r'testimonial|what (our )?(clients|couples|customers) say|review', text)), "proof"),
      ("Real photos on the page (3 or more)", imgs >= 3, "proof"),
      ("Guarantee stated", bool(re.search(r'guarantee|money.?back|satisfaction', text)), "proof"),
      ("FAQ answers price, timing, guarantee", bool(re.search(r'\bfaq\b|frequently asked|questions', text)), "friction"),
      ("Loads in under 2 seconds", load_s < 2.0, "speed"),
      ("No popup on arrival, few nav exits", (not popup) and fold['navLinks'] <= 6, "friction"),
    ]
    tot = sum(W.get(k, 1) for _, _, k in checks); got = sum(W.get(k, 1) for _, ok, k in checks if ok)
    pt = sum(1 for _, _, k in checks if k == 'proof'); pg_ = sum(1 for _, ok, k in checks if k == 'proof' and ok)
    ab = bool(re.search(r'optimizely|vwo\.com|visualwebsiteoptimizer|convert\.com/js|abtasty|unbounce|instapage|splitbee|posthog.*feature|growthbook|launchdarkly|kameleoon|google_optimize|optimize\.js', html, re.I))
    return {"url": url, "groups": groups, "city": city, "h1": h1, "title": title, "load_s": load_s, "ab_script": ab, "form_fields": min([f['fields'] for f in real_forms], default=None),
            "score": round(100 * got / tot), "proof": f"{pg_}/{pt}", "checks": [{"t": t, "pass": bool(ok), "kind": k} for t, ok, k in checks]}

res = []
with sync_playwright() as p:
    b = p.chromium.launch(headless=True); ctx = b.new_context(viewport={'width': 390, 'height': 844}, user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1')
    pg = ctx.new_page()
    for u, groups in urls.items():
        clean = re.sub(r'\?.*$', '', u).rstrip('/') or u
        path = clean.split('//', 1)[-1].split('/', 1)[1] if '/' in clean.split('//', 1)[-1] else ''
        fetch = clean if (not path or '.' in path.split('/')[-1]) else clean + '/'   # WordPress wants the trailing slash
        r = score_page(pg, fetch, groups)
        for attempt in range(3):   # a page that errors, is bot-checked or comes back nearly empty gets three more tries, slower each time
            if 'error' not in r and r.get('score', 0) >= 20: break
            pg.wait_for_timeout(8000 * (attempt + 1)); r = score_page(pg, fetch, groups)
        pg.wait_for_timeout(1500)   # be polite between pages
        r['url'] = clean; res.append(r)
        print(f"{r.get('score','ERR'):>3} · proof {r.get('proof','-'):5s} · {r.get('load_s','-')}s · {clean}  {('ERROR '+r['error']) if 'error' in r else ''}")
    b.close()
try:   # Lighthouse (PageSpeed Insights API, mobile) is the speed verdict; the stopwatch stays as load_s for reference
    from psi_speed import attach_psi, LCP_GOOD_S, line
    res = [with_lighthouse(r) for r in attach_psi(res)]
    for r in res: print(line(r))
except SystemExit as e: print("Lighthouse skipped:", e)
json.dump(res, open(out, 'w'), indent=1); print("wrote", out)
