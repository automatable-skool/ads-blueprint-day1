#!/usr/bin/env python3
"""Fail the build if a page is missing voice, proof, or renders broken.

    python3 code/check_page_quality.py            # all pages
    python3 code/check_page_quality.py /blog/x    # one route

Three gates. Any failure exits 1, which means the page is not finished
and does not get shown to the owner.
"""
import json, re, subprocess, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "website"
# Numbers are approved in context/proof.md; the phone number and address live in context/business.md.
PROOF_FILES = [ROOT / "context" / "proof.md", ROOT / "context" / "proof" / "proof-inventory.md", ROOT / "context" / "business.md"]
BASE = "http://localhost:3000"

BANNED = ["in today's world", "in the fast-paced", "we strive to", "unfortunately",
          "in conclusion", "it is important to note", "when it comes to",
          "in the ever-evolving", "look no further", "rest assured"]
PERSONALITY = [r"\bI\b", r"\bwe\b", r"\byou\b", r"\?", r"n't\b", r"\bactually\b",
               r"\bhonestly\b", r"\bnobody\b", r"\bmost people\b"]

def routes():
    if len(sys.argv) > 1: return [sys.argv[1]]
    out = []
    for p in (SITE/"app").rglob("page.tsx"):
        r = "/" + p.relative_to(SITE/"app").parent.as_posix()
        if r == "/.": r = "/"
        if "[" in r: continue
        out.append(r)
    return sorted(out)

def text_of(html):
    html = re.sub(r"<(script|style|nav|footer)[^>]*>.*?</\1>", " ", html, flags=re.S|re.I)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html)).strip()

def proof_numbers():
    text = "\n".join(f.read_text(encoding="utf-8", errors="ignore") for f in PROOF_FILES if f.exists())
    raw = re.findall(r"[\d][\d,\.]*\+?%?", text)
    # "604," and "22,000+" must match "604" and "22,000" on the page.
    known = set()
    for n in raw:
        n = n.rstrip(",.")
        known.add(n); known.add(n.rstrip("+")); known.add(n.rstrip("%"))
    return known

def main():
    if not SITE.exists(): print("No website/ folder."); return 0
    known = proof_numbers()
    fails = []
    for r in routes():
        url = BASE + r
        # GATE 1 - it must actually render
        try:
            with urllib.request.urlopen(url, timeout=15) as resp:
                code, html = resp.status, resp.read().decode("utf-8", "ignore")
        except Exception as e:
            code, html = getattr(e, "code", 0), ""
        if code != 200:
            fails.append((r, "RENDER", f"returns {code or 'no response'}. A page that does not load is not built."))
            continue
        body = text_of(html)
        words = len(body.split())
        if words < 120: continue  # nav-only pages

        # GATE 2 - proof
        nums = re.findall(r"\b[\d][\d,\.]*\+?%?\b", body)
        real = [n for n in nums if n in known]
        imgs = len(re.findall(r"<img|background-image", html, re.I))
        touches = len(real) + imgs + len(re.findall(r"[""“]", html))
        if touches < 5:
            fails.append((r, "PROOF", f"{touches} proof touches, target 5+. Real numbers found: {len(real)} of {len(nums)} on the page. Images: {imgs}."))
        invented = [n for n in set(nums) if n not in known and len(n) > 2 and not n.startswith("20")]
        if invented:
            fails.append((r, "INVENTED", f"{len(invented)} numbers not in context/proof.md: {', '.join(sorted(invented)[:6])}. Every number on a page must exist in the proof file."))

        # GATE 3 - voice
        low = body.lower()
        hits = [b for b in BANNED if b in low]
        if hits: fails.append((r, "VOICE", f"banned phrases: {', '.join(hits)}"))
        if "—" in body: fails.append((r, "VOICE", "em-dash on the page. Regular hyphens only."))
        marks = sum(len(re.findall(p, body, re.I)) for p in PERSONALITY)
        per_100 = marks / max(words/100, 1)
        if per_100 < 4:
            fails.append((r, "VOICE", f"{per_100:.1f} personality markers per 100 words, expected 4+. This reads as generic reference text, not a person."))
        sents = [s for s in re.split(r"[.!?]+", body) if s.strip()]
        if sents:
            avg = sum(len(s.split()) for s in sents)/len(sents)
            if avg > 26: fails.append((r, "VOICE", f"average sentence {avg:.0f} words, target 14-17. Long sentences read as a manual."))

    if not fails:
        print("PASS - every page renders, carries proof, and sounds like a person."); return 0
    print("PAGE QUALITY FAILED\n")
    cur = None
    for route, kind, why in fails:
        if route != cur: print(f"{route}"); cur = route
        print(f"  [{kind}] {why}")
    print("\nFix these before showing the pages. A page that fails here is not finished.")
    return 1

if __name__ == "__main__": sys.exit(main())
