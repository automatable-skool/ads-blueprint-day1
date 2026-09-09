"""Render matrix.json into keyword-list.md as a [service] x [city] matrix."""

import json
import os

here = os.path.dirname(__file__)
with open(os.path.join(here, "matrix.json")) as f:
    data = json.load(f)

by_city = data["by_city"]
root = data["root"]
minv = data["min_searches"]

# Order cities by their top-keyword volume, root first.
order = sorted(
    by_city.keys(),
    key=lambda c: (c != root, -(by_city[c][0]["volume"] if by_city[c] else 0)),
)

total_kw = sum(len(v) for v in by_city.values())
total_vol = sum(r["volume"] for v in by_city.values() for r in v)


def cpc(r):
    if r["cpc_high"] == 0:
        return "—"
    return f"${r['cpc_low']:.2f}–${r['cpc_high']:.2f}"


lines = []
lines.append("# Plumber × City Keyword Matrix — Core GTA")
lines.append("")
lines.append("> Live Google Ads Keyword Planner data (`generate_keyword_historical_metrics`), "
             "geo: Canada, network: Google Search. Volume = avg monthly searches.")
lines.append(f"> Filter: **≥ {minv} searches/mo** (anything below is dropped/folded into "
             f"{root}). CPC = top-of-page bid range (CAD).")
lines.append(f"> **{total_kw} keywords** across **{len(order)} municipalities**, "
             f"~**{total_vol:,}** combined monthly searches.")
lines.append("")
lines.append("Root city: **Toronto**. Per the fold rule, every Core-GTA municipality "
             "cleared the ≥10 bar on at least one keyword, so **no city fully folded** "
             "into Toronto — only individual sub-10 keyword cells were dropped (listed at the bottom).")
lines.append("")
lines.append("---")
lines.append("")

# Summary table: top keyword per city
lines.append("## City summary (sorted by demand)")
lines.append("")
lines.append("| Rank | City | Keywords ≥10 | Anchor keyword | Anchor volume |")
lines.append("|------|------|--------------|----------------|---------------|")
for i, c in enumerate(order, 1):
    rows = by_city[c]
    if not rows:
        continue
    top = rows[0]
    lines.append(f"| {i} | {c} | {len(rows)} | {top['keyword']} | {top['volume']:,} |")
lines.append("")
lines.append("---")
lines.append("")

# Per-city detail tables
lines.append("## Full matrix (per city)")
lines.append("")
for c in order:
    rows = by_city[c]
    if not rows:
        continue
    sub = sum(r["volume"] for r in rows)
    lines.append(f"### {c} — {len(rows)} keywords · {sub:,} searches/mo")
    lines.append("")
    lines.append("| Keyword | Volume | Competition | CPC (CAD) |")
    lines.append("|---------|-------:|-------------|-----------|")
    for r in rows:
        lines.append(f"| {r['keyword']} | {r['volume']:,} | {r['competition'].title()} | {cpc(r)} |")
    lines.append("")

# Folded / dropped
folded = data["folded"]
if folded:
    lines.append("---")
    lines.append("")
    lines.append(f"## Dropped — below {minv} searches/mo ({len(folded)} keywords)")
    lines.append("")
    lines.append("These keyword cells came back under the threshold (mostly 0-volume "
                 "templates like `residential plumber [city]` and `plumbing contractor [city]` "
                 "that have no real local demand). Per the fold rule they roll up into the "
                 "corresponding city's main `plumber [city]` term rather than getting their own "
                 "ad group / page.")
    lines.append("")
    lines.append("| Keyword | Volume | Would fold into |")
    lines.append("|---------|-------:|-----------------|")
    for r in folded:
        lines.append(f"| {r['keyword']} | {r['volume']} | plumber {r['from_city'].lower()} |")
    lines.append("")

lines.append("---")
lines.append("")
lines.append("## How to use this")
lines.append("1. Build top-down: each **anchor keyword** (`plumber [city]`) is its own campaign / "
            "ad group / landing page — start with Toronto, Mississauga, Brampton (highest demand).")
lines.append("2. The service-modifier rows (`emergency plumber [city]`, `drain cleaning [city]`, "
            "`water heater repair [city]`) become tightly-themed ad groups under each city.")
lines.append("3. High CPC + High competition (emergency, 24 hour) = expensive but highest intent — "
            "bid here only once conversion tracking is live (Module 4).")
lines.append("4. Re-run `build_matrix.py` monthly; volumes and the fold list will shift.")
lines.append("")

with open(os.path.join(here, "keyword-list.md"), "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"✓ Wrote keyword-list.md — {total_kw} keywords, {len(order)} cities, {len(folded)} dropped")
