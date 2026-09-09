#!/usr/bin/env python3
"""Pull a topical photo from Unsplash into website/public/photos/<slug>.jpg.

Why this exists: landing-page photo slots used to hot-link loremflickr.com, which goes
down for hours at a time and took every photo on the page with it (8 September 2026).
A photo that lives in the repo cannot go down. Needs UNSPLASH_ACCESS_KEY in .env
(free: https://unsplash.com/oauth/applications/new).

Usage (from the repo root):
  python3 code/fetch_photos.py "office desk with laptop"            # -> public/photos/office-desk-with-laptop.jpg
  python3 code/fetch_photos.py "meeting" --slug meeting --portrait  # tall crop, fixed file name
  python3 code/fetch_photos.py office laptop meeting desk workspace # several at once, slug = the query
"""
import argparse, json, os, re, sys, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "website", "public", "photos")

def env_key():
    for p in (os.path.join(ROOT, ".env"), os.path.join(ROOT, "website", ".env"), os.path.join(ROOT, "website", ".env.local")):
        if os.path.exists(p):
            for line in open(p):
                if line.startswith("UNSPLASH_ACCESS_KEY="):
                    v = line.split("=", 1)[1].strip().strip('"').strip("'")
                    if v: return v
    sys.exit("UNSPLASH_ACCESS_KEY is not set. Get a free key at https://unsplash.com/oauth/applications/new and add it to .env")

def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

def fetch(query, slug, portrait, key, width):
    q = urllib.parse.urlencode({"query": query, "per_page": 1, "orientation": "portrait" if portrait else "landscape", "content_filter": "high"})
    req = urllib.request.Request(f"https://api.unsplash.com/search/photos?{q}", headers={"Authorization": f"Client-ID {key}", "Accept-Version": "v1"})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.load(r)
    if not data.get("results"):
        print(f"  no result for {query!r}", file=sys.stderr); return None
    p = data["results"][0]
    # Unsplash API guideline: register the download when you use the file.
    try: urllib.request.urlopen(urllib.request.Request(p["links"]["download_location"], headers={"Authorization": f"Client-ID {key}"}), timeout=30).read()
    except Exception: pass
    url = p["urls"]["raw"] + f"&w={width}&q=80&fm=jpg&fit=max"
    os.makedirs(OUT, exist_ok=True)
    dest = os.path.join(OUT, f"{slug}.jpg")
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "ads-blueprint"}), timeout=60) as r, open(dest, "wb") as f:
        f.write(r.read())
    credit = f'{p["user"]["name"]} on Unsplash ({p["links"]["html"]})'
    print(f"  {os.path.relpath(dest, ROOT)}  <- {credit}")
    return credit

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("queries", nargs="+", help="what the photo should show")
    ap.add_argument("--slug", help="file name (without .jpg); only with a single query")
    ap.add_argument("--portrait", action="store_true", help="tall crop instead of wide")
    ap.add_argument("--width", type=int, default=1600)
    a = ap.parse_args()
    if a.slug and len(a.queries) > 1: sys.exit("--slug only works with one query")
    key = env_key()
    for q in a.queries:
        fetch(q, a.slug or slugify(q), a.portrait, key, a.width)

if __name__ == "__main__":
    main()
