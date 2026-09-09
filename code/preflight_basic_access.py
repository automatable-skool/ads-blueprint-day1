"""Pre-submit checks for the Google Ads API Basic Access application.

Runs every denial reason that a script can actually verify, before the form is submitted.
The rest (contact inbox monitored, accounts linked under the MCC, no policy flags) is
printed as a manual checklist at the end.

Usage:
  python3 code/preflight_basic_access.py --url https://yoursite.com \
      --name "Acme Plumbing" --email you@acmeplumbing.com \
      --address "123 Main St" [--use-case use_case.txt] \
      [--design-doc references/api-application/design-doc.pdf]

Exit code 1 if any check FAILs. stdlib only; pypdf is optional for the design-doc word count.
"""

import argparse
import re
import sys
import urllib.error
import urllib.request
from html import unescape
from urllib.parse import urlparse

PAGES = ["/", "/about", "/privacy-policy", "/terms"]
VENDOR_WORDS = ["claude", "anthropic", "openai", "chatgpt", "gpt", "llm", "airbyte", "zapier", "make.com", "n8n"]
LOOP_WORDS = ["campaign", "negative", "report", "bid", "ad group", "budget"]
FREE_EMAIL = {"gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com"}
results = []


def record(status, name, detail):
    results.append((status, name, detail))


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (preflight check)"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status, resp.read().decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:  # noqa: BLE001 - any network failure is a FAIL for the reviewer too
        return 0, str(e)


def text_of(html):
    html = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.S | re.I)
    return unescape(re.sub(r"<[^>]+>", " ", html)).lower()


def check_site(base, name, address):
    base = base.rstrip("/")
    home_text = ""
    for path in PAGES:
        status, body = fetch(base + path)
        if status != 200:
            record("FAIL", f"page {path}", f"returned {status or 'no response'} - the reviewer opens this by hand")
            continue
        words = len(text_of(body).split())
        if words < 60:
            record("FAIL", f"page {path}", f"only {words} words - reads as a placeholder page")
        else:
            record("PASS", f"page {path}", f"200, {words} words")
        if path == "/":
            home_text = text_of(body)
        if path in ("/", "/about") and address:
            if address.lower() in text_of(body):
                record("PASS", f"address on {path}", "physical address is on the page")
            else:
                record("WARN" if path == "/" else "FAIL", f"address on {path}", f"'{address}' not found on the page")
    if home_text:
        if name.lower() in home_text:
            record("PASS", "name on site", f"'{name}' appears on the homepage")
        else:
            record("FAIL", "name on site", f"'{name}' is not on the homepage - form name and site must match")


def check_email(email, base):
    domain = email.split("@")[-1].lower()
    site_host = urlparse(base).netloc.lower().removeprefix("www.")
    if domain == site_host:
        record("PASS", "email matches site", f"{domain}")
    elif domain in FREE_EMAIL:
        record("WARN", "email matches site", f"{domain} is a free inbox - mild mismatch, approvals still happen; a domain email is safer")
    else:
        record("WARN", "email matches site", f"{domain} != {site_host} - be ready to explain the link")


def check_design_doc(path):
    try:
        data = open(path, "rb").read()
    except OSError:
        record("FAIL", "design doc", f"{path} not found - the PDF is the most important field")
        return
    if not data.startswith(b"%PDF"):
        record("FAIL", "design doc", "not a PDF")
        return
    has_image = b"/Image" in data
    record("PASS" if has_image else "WARN", "design doc mockup", "contains an image" if has_image else "no image found - Google's sample has one mockup")
    try:
        from pypdf import PdfReader  # optional
        reader = PdfReader(path)
        words = sum(len((p.extract_text() or "").split()) for p in reader.pages)
        pages = len(reader.pages)
        if 250 <= words <= 700 and pages <= 4:
            record("PASS", "design doc length", f"{pages} pages, {words} words (target ~400)")
        else:
            record("WARN", "design doc length", f"{pages} pages, {words} words - Google's sample is ~400 words, six short sections")
    except ImportError:
        record("WARN", "design doc length", "pypdf not installed - skipped word count (pip install pypdf)")


def check_use_case(path):
    try:
        text = open(path, encoding="utf-8").read()
    except OSError:
        record("FAIL", "use case", f"{path} not found")
        return
    low = text.lower()
    words = len(low.split())
    if words < 40:
        record("FAIL", "use case length", f"{words} words - too vague, say what it reads, what it writes, who uses it")
    else:
        record("PASS", "use case length", f"{words} words")
    if "keyword" in low and not any(w in low for w in LOOP_WORDS):
        record("FAIL", "use case scope", "reads as keyword research only - Google denies those by policy")
    else:
        record("PASS", "use case scope", "describes campaign management, not research only")
    vendors = [v for v in VENDOR_WORDS if v in low]
    if vendors:
        record("WARN", "use case vendors", f"mentions {', '.join(vendors)} - third-party tool names invite questions, describe it as your own tooling")
    scrubbed = low.replace("no third part", "").replace("not for clients", "")
    if any(w in scrubbed for w in ["client", "customers' accounts", "third part", "external user", "saas"]):
        record("WARN", "use case audience", "mentions clients / external users - that is the Standard Access lane with demo access + RMF. Own accounts only unless you mean it")
    if "paused" in low or "review" in low:
        record("PASS", "use case human review", "says changes land paused / reviewed")
    else:
        record("WARN", "use case human review", "add that every change lands paused for human review")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--name", required=True, help="company name exactly as typed on the form")
    ap.add_argument("--email", required=True, help="API contact email on the form")
    ap.add_argument("--address", default="", help="street address as written on the site")
    ap.add_argument("--use-case", default="", help="text file with the use-case answer")
    ap.add_argument("--design-doc", default="references/api-application/design-doc.pdf")
    args = ap.parse_args()

    check_site(args.url, args.name, args.address)
    check_email(args.email, args.url)
    check_design_doc(args.design_doc)
    if args.use_case:
        check_use_case(args.use_case)
    else:
        record("WARN", "use case", "no --use-case file given - paste the answer into a file and re-run")

    width = max(len(n) for _, n, _ in results)
    for status, name, detail in results:
        print(f"{status:4}  {name.ljust(width)}  {detail}")
    fails = sum(1 for s, _, _ in results if s == "FAIL")
    print("\nManual checks (no script can see these):")
    print("  [ ] API contact inbox is one you check daily - an unanswered clarification email is a denial")
    print("  [ ] every active Ads account is linked under the MCC that holds the token")
    print("  [ ] no account under the MCC has a policy suspension or open policy flag")
    print(f"\n{fails} FAIL" + ("" if fails == 1 else "S") + (" - fix before submitting" if fails else " - ready to submit"))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
