"""The CSV lane for /keywords - read a Keyword Planner export, write candidates.csv.

No API access needed. In the Google Ads UI: Tools > Keyword Planner > Discover new
keywords > paste the seeds > set location + language > Download keyword ideas.
Drop the file at code/cache/keyword-planner.csv and run:

  python3 code/planner_csv.py                                  # default paths
  python3 code/planner_csv.py --in code/cache/keyword-planner.csv --out candidates.csv

Output has the SAME columns as code/pull_keywords.py (keyword, v, comp, cpc) plus
v_range, so every later step of /keywords runs identically on either lane.

Handles what Google actually exports: UTF-16 or UTF-8, tab- or comma-separated,
two title lines before the header, bucketed volumes like "1K - 10K" on accounts
with no spend (v = the low end of the bucket, v_range keeps the bucket), and the
"Top of page bid (high range)" column as the click cost. Junk terms (jobs, DIY,
parts, free) are dropped with the same filter the API lane uses.
"""

import argparse
import csv
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import ACCOUNT_NEG  # noqa: E402

MULT = {"k": 1_000, "m": 1_000_000}


def read_text(path):
    raw = open(path, "rb").read()
    if raw[:2] in (b"\xff\xfe", b"\xfe\xff"):
        return raw.decode("utf-16")
    for enc in ("utf-8-sig", "utf-16", "latin-1"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    sys.exit(f"could not decode {path}")


def find_header(lines):
    """Google puts 1-2 title lines first. The header is the first line naming Keyword."""
    for i, line in enumerate(lines[:10]):
        if re.search(r"\bkeyword\b", line, re.I) and re.search(r"search|volume", line, re.I):
            return i
    sys.exit("no header row found - is this a Keyword Planner export? Expected a 'Keyword' column.")


def parse_number(s):
    """'1,900' -> 1900 · '1K' -> 1000 · '' -> 0"""
    s = (s or "").strip().replace(",", "").replace(" ", "")
    if not s or s in ("-", "–"):
        return 0
    m = re.fullmatch(r"([\d.]+)\s*([kKmM])?", s)
    if not m:
        return 0
    n = float(m.group(1)) * MULT.get((m.group(2) or "").lower(), 1)
    return int(round(n))


def parse_volume(s):
    """Exact ('1,900') or bucketed ('1K - 10K' / '100 – 1K'). Returns (low, range_label)."""
    s = (s or "").strip()
    parts = re.split(r"\s*[-–—]\s*", s)
    if len(parts) == 2 and parts[0] and parts[1]:
        return parse_number(parts[0]), f"{parts[0].strip()}-{parts[1].strip()}"
    return parse_number(s), ""


def pick(cols, *patterns):
    for p in patterns:
        for c in cols:
            if re.search(p, c, re.I):
                return c
    return None


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--in", dest="src", default="code/cache/keyword-planner.csv")
    ap.add_argument("--out", default="candidates.csv")
    ap.add_argument("--floor", type=int, default=1, help="drop keywords under this monthly volume")
    ap.add_argument("--keep-junk", action="store_true", help="skip the account-negative filter")
    args = ap.parse_args()

    if not os.path.exists(args.src):
        sys.exit(f"{args.src} not found. Download it from Keyword Planner (Discover new keywords > "
                 f"Download keyword ideas) and drop it there.")

    text = read_text(args.src)
    lines = text.splitlines()
    start = find_header(lines)
    body = "\n".join(lines[start:])
    delim = "\t" if lines[start].count("\t") >= lines[start].count(",") else ","
    reader = csv.DictReader(io.StringIO(body), delimiter=delim)
    cols = reader.fieldnames or []

    k_col = pick(cols, r"^keyword$", r"keyword")
    v_col = pick(cols, r"avg\.? monthly searches", r"monthly searches", r"searches", r"volume")
    comp_col = pick(cols, r"^competition$", r"competition(?! \()", r"competition")
    cpc_col = pick(cols, r"top of page bid \(high", r"high range", r"top of page bid", r"cpc", r"bid")
    if not k_col or not v_col:
        sys.exit(f"could not find the keyword/volume columns in: {cols}")

    rows, seen, dropped_junk, dropped_floor = [], set(), 0, 0
    for r in reader:
        kw = (r.get(k_col) or "").strip().lower()
        if not kw or kw in seen:
            continue
        seen.add(kw)
        if not args.keep_junk and ACCOUNT_NEG.search(kw):
            dropped_junk += 1
            continue
        v, v_range = parse_volume(r.get(v_col))
        if v < args.floor:
            dropped_floor += 1
            continue
        comp = (r.get(comp_col) or "").strip().upper() if comp_col else ""
        cpc_raw = (r.get(cpc_col) or "").strip() if cpc_col else ""
        cpc = round(float(re.sub(r"[^\d.]", "", cpc_raw) or 0), 2)
        rows.append({"keyword": kw, "v": v, "comp": comp or "UNKNOWN", "cpc": cpc, "v_range": v_range})

    rows.sort(key=lambda x: x["v"], reverse=True)
    os.makedirs(os.path.dirname(os.path.abspath(args.out)) or ".", exist_ok=True)
    with open(args.out, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["keyword", "v", "comp", "cpc", "v_range"])
        w.writeheader()
        w.writerows(rows)

    bucketed = sum(1 for r in rows if r["v_range"])
    print(f"read {args.src}: {len(rows)} candidates written to {args.out} "
          f"({dropped_junk} junk dropped, {dropped_floor} under the floor)")
    if bucketed:
        print(f"{bucketed} volumes are Planner buckets (no spend on the account yet) - v is the low end, "
              f"v_range keeps the bucket. Re-run /keywords volume when Basic access lands.")
    print("Next: Claude clusters candidates.csv under the confirmed services (same as the API lane).")


if __name__ == "__main__":
    main()
