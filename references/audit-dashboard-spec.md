# The audit dashboard - the standard, fixed 12 September 2026

What every `/audit` run produces, in this exact shape, for every account. Jono's rulings from the
DJing.ca fix pass, 11-12 September 2026. When this file and `.claude/commands/audit.md` disagree,
this file wins on layout; audit.md wins on process.

## The two files

- `references/audit-report-template.html` is the page. Copy it, replace ONLY the JSON inside
  `<script id="audit-data">`, never touch markup, CSS or script. The renderer already draws
  everything below.
- `code/audit_dashboard_data.py` reads the account into one JSON (`code/cache/<customer>-dashboard-<date>.json`).
  `code/cro_score.py` scores the landing pages - always pass `--service` and `--cities` from
  `context/business.md`, or the service and city checks fail on every page. Both are read-only and headless.
- The before state is locked first: copy the report, the checklist and the results file into
  `assets/before-<date>/`. The fixed report is a NEW file (`audit-report-fixed.html`); the before copy
  is never edited.

## The page, top to bottom

1. Header: business, account, window, spend. Dials: before, after (real only once fixes shipped).
2. **What to fix first**: one line per finding, worst first. Legend above it. Each line carries a tag:
   `fixed` · `partly fixed · click needed` · `bigger build` (API, needs a yes) · `website access` ·
   `click needed` (the API refuses) · `your proof` / `your number`. Never `no action` - those rows do
   not exist on the page. Fixed lines strike through.
3. **N things need your hands**: a short checklist, one line per manual item with the first three
   clicks, and the sentence "The API cannot do these. Message Claude when you are ready and we walk
   through every step together, one at a time." Full recipes live in audit-report.md.
4. **The account**: three CSS columns that the ROWS flow through (`columns:3`, boxes allowed to break, rows and headings
   never split), so a 16-line box starts in column one and continues into column two and the three columns
   end level - tracking, networks, autopilot, budgets, economics,
   **Ad types** (Search · Performance Max with guardrails · Maps showing · Local Services Ads
   eligibility), **Retargeting** (lists big enough · watched on search · a live retargeting campaign ·
   past customers excluded), and the section's findings as checkbox rows.
5. **The campaigns and ad groups**: ONE card with four tabs - by campaign, by ad group, by location,
   by device - each sorted best cost per lead first, green at 0.85x or better, yellow about average,
   red at 1.25x or worse; no dot columns, no "open now" column. Then the grid: **Bleeding money - fix
   these** (above average, cause and action each) · **Cheap leads - protect these** · structure and
   settings boxes · findings rows.
6. **The ads**: **Every live ad, best first** (one row per ad: campaign, ad group, clicks, leads,
   click-through, conversion rate, cost per click, cost per lead, Google's expected click-through grade and ad relevance grade for the ad's
   group (ticked when no keyword is below average), no ad-strength column,
   "What to do" as two or three bullets; cost headers sort; campaign and ad group filters; proven
   ads above thin ones; a row whose campaign had a traffic-changing fix reads "Re-read after the
   fix"). **Asset performance** as a second tab on the same card: one row per asset type with 365-day impressions,
   clicks and leads, no status column (coverage and status live only in the "Assets by campaign" box). Then the nested boxes:
   **Ads by ad group** (one line per campaign, ad groups as a tick-cross sub-line) · **Assets by
   campaign** (one line per asset type, campaigns as the sub-line) · **Ad build, by ad** (one line
   per check, ads as the sub-line) · **Google's grades by ad group** (two lines: expected click-through and ad relevance, each with no keyword
   rated below average by Google; ad groups as the sub-line; a failing relevance group is the recluster or
   headline candidate - no separate invented "one theme" line). Google's Quality Score grades are the yardstick because
   they set the click price; the old distribution bars are gone. Landing page experience renders the same
   way in the pages section, one line, pages as the sub-line. No summary box, no catch-all row, no separate "ad performance outliers" table (the by-ad-group tab and
   the ads table carry it).
7. **The landing pages**: built like the ads section. A table with one row per live page, best score
   first: score on the 16-point checklist (proof counts double), proof count, load time, and per 100 clicks
   the leads, jobs at the close rate on file, money at the booking value on file, spend (jobs and money are
   labelled assumptions). Then a nested box **Landing pages, by check**: one line per check (headline names
   the service and the city in a line that sells · one call to action above the fold · tap-to-call above the
   fold · click-to-call · lead form · 8 fields or fewer · review stars · proof numbers · testimonials · 3+
   real photos · guarantee · FAQ · service area · under 2 seconds · no popup, few exits) with the pages as
   the tick-cross sub-line, every line tagged `website access`. One split-test check, detection only: a testing script in the page source or two ads in one group
   landing on different pages passes it; running page tests is out of scope.
8. **The keywords and search terms**: the check boxes (phrase match, converting terms as keywords, serving,
   no self-blocks, junk list covered, phrase negatives, visibility, at least 5 keywords per ad group), then
   **Searches to block** as one table with tabs per campaign. No winners table, no ask-first block.
   Search-term and ad-test depth stays in their own commands.

## Rules that apply to every box and table

- One checkbox per instance, NESTED: one line per thing, instances as a compact sub-line showing the
  crossed ones, with the ticked ones behind a "+ N pass" link (Jono, 12 Sep 2026). Never ninety lines saying one sentence; never one sentence hiding twenty-three things.
- Credit what was right from the start: ticked rows for what was already present, not only what got fixed.
- Green means live and read back. A paused draft, a staged file or a routed item is never green; it is
  `click needed` with the switch-on step under "needs your hands".
- Every check, box and table shows on EVERY run, whether the account passes it or not. A clean box
  never disappears: it shows a green tick in its heading, a green count ("9 / 9 pass") and its rows
  folded under "Show the N that pass". Fixed rows fold the same way. The owner always sees what was
  checked, and what is left is what is open (Jono, 12 Sep 2026).
- Every fact appears once. A finding mostly fixed with one click left is `fixed`; the click lives in
  the matching check row and the by-hand list, nowhere else.
- Every table and long list is capped at a scrollable height with a sticky header. Money shows two
  decimals or none.
- Every verdict is cross-referenced against what this run wrote: a row whose cause is fixed is done;
  an ad whose campaign's traffic changed is "re-read after the fix". Audits are iterative; "the next
  audit re-reads it" is not open work.
- Windows widen until conclusive: 30 → 90 → 180 → 365 days → all time; the window is printed beside
  every number.
- No ad-strength goal, ever. A high score is a tell on a failing ad, never a target.
- Budget moves stay inside one campaign type. Bleeders get every fix at once; winners get one
  traffic-changing move per 30 days.
- Duplicate keywords are only a finding when every targeting dimension of the ad groups matches.
- The business's own facts only. Never another account's context, proof, prices or negatives.

## The JSON blocks the template consumes (beyond the original fields)

- `leaks[].progress`, `byHand[]{title,why,path,done,verify}`, `campaigns[].issues[]{cat,what,ok,done,tag}`
- `adTable{window,avg{ctr,cvr,cpl},ads[],recentFix{}}` · `assetTable[]` · `adBuild[]` · `pageScores[]` (from
  `cro_score.py`, plus `per100{leads,jobs,money,cost,cpl}`) · `economics` from the account's own
  recorded facts · `settings.groups[]` includes "Ad types" and "Retargeting".
