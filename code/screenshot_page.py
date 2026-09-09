"""Screenshot a landing page at desktop and mobile widths, so the build gets LOOKED at.

    python3 code/screenshot_page.py http://localhost:3000/lp/seo-agency
    python3 code/screenshot_page.py https://example.com/lp/plumber --name plumber

A page built blind is the biggest quality risk in /landing-page: a header that survived the
delete, a placeholder that reads as broken rather than deliberate, the mobile CTA bar sitting on
top of the last section, a section that collapses at 390px. None of that shows up in the code.
`check_css_integrity.py` and `check_page_quality.py` cover the non-visual half; this is the other
half, and the agent is expected to OPEN the images and say what is wrong. (Jono, 2 September 2026.)

First run installs what it needs - the pip package and the Chromium build - and says so. Nothing
else to set up.
"""

import argparse
import os
import subprocess
import sys
from datetime import date

DESKTOP = {"width": 1440, "height": 900}
MOBILE = {"width": 390, "height": 844}          # iPhone 15 class, the traffic that matters
OUT_DIR = "screenshots"


def ensure_playwright():
    """Install the package and the browser on first run rather than failing with a stack trace."""
    try:
        import playwright  # noqa: F401
    except ImportError:
        print("Installing Playwright (one time, about 30 seconds)...")
        subprocess.run([sys.executable, "-m", "pip", "install", "--quiet", "playwright"], check=True)

    from playwright.sync_api import sync_playwright
    try:
        with sync_playwright() as p:
            p.chromium.launch().close()
    except Exception:
        print("Downloading Chromium (one time, about 150MB)...")
        subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"], check=True)


def shoot(url, name):
    from playwright.sync_api import sync_playwright

    os.makedirs(OUT_DIR, exist_ok=True)
    stamp = date.today().isoformat()
    written = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for label, size in (("desktop", DESKTOP), ("mobile", MOBILE)):
            page = browser.new_page(viewport=size, device_scale_factor=2,
                                    is_mobile=(label == "mobile"), has_touch=(label == "mobile"))
            try:
                page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception as exc:
                print(f"✗ {label}: could not load {url} - {exc}")
                page.close()
                continue
            page.wait_for_timeout(600)          # let fonts settle so the type is not measured mid-swap
            path = os.path.join(OUT_DIR, f"{name}-{label}-{stamp}.png")
            page.screenshot(path=path, full_page=True)
            written.append((label, path, page.evaluate("document.body.scrollHeight")))

            # The two failures that are invisible in code and fatal on the page.
            if page.query_selector("header") or page.query_selector("footer"):
                print(f"!  {label}: a <header> or <footer> survived - an ad page has neither, "
                      "and every link in them is an exit")
            if label == "mobile" and not page.query_selector(".lp-mobile-cta"):
                print("!  mobile: no fixed CTA bar found (.lp-mobile-cta)")
            page.close()
        browser.close()
    return written


def main():
    ap = argparse.ArgumentParser(description="Screenshot a page at desktop and mobile widths.")
    ap.add_argument("url")
    ap.add_argument("--name", help="file name stem. Defaults to the last part of the URL path.")
    args = ap.parse_args()
    name = args.name or (args.url.rstrip("/").rsplit("/", 1)[-1] or "page")

    ensure_playwright()
    shots = shoot(args.url, name)
    if not shots:
        sys.exit("Nothing captured. Is the dev server running? cd website && npm run dev")

    print()
    for label, path, height in shots:
        print(f"✓ {label:8} {path}  (page is {height}px tall)")
    print("\nNow OPEN both images and look at them. Reading the code is not the same as seeing the")
    print("page. Check against the blueprint: no header or footer, the proof bar above the fold,")
    print("placeholders that read as deliberate rather than broken, the mobile bar clear of the")
    print("last section, and a CTA visible at every scroll position.")


if __name__ == "__main__":
    main()
