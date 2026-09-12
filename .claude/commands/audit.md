---
description: The account audit, find AND fix - find everything, the owner reviews the report, then one approval fixes it all. `/audit` reads; the owner's go on the report starts part two
argument-hint: [account ID or name] [focus: waste | structure | relevancy | tracking | budget | hygiene]
---

Audit an account: $ARGUMENTS. Read-only - change nothing, push nothing.

## ⛔ FIRST: which account? Never assume.

**Ask which account to audit before pulling a single number, and confirm it back before reporting anything.**

Most people connected to this repo can see more than one account - their own, a client's, a manager (MCC) account with a dozen underneath it. Auditing the wrong one wastes the run, and worse, it produces a confident report about somebody else's money.

1. Run `code/list_accounts.py` to show every account the connection can reach: **account name, account ID, currency, and last 30 days of spend** - the spend figure is what lets me recognise mine at a glance.
2. If there's exactly one, name it and confirm: *"Auditing Smith Plumbing (123-456-7890), $4,180 spent last 30 days - right one?"*
3. If there's more than one, list them and **stop until I pick**. Never default to the first, never default to the manager account.
4. If the ID was given in `$ARGUMENTS`, still confirm the NAME back to me - digits are easy to mistype and a transposed ID is a silent wrong answer.
5. Record the chosen account in CLAUDE.md "## My setup" so it's the default next time - but still say which account you're using at the top of every report.

**Put the account name, ID and date range in the first line of the report.** A report that doesn't say whose account it is can't be trusted or filed.

If the connection reaches a manager account with several underneath it, ask whether I want one account or a comparison across all of them. Never silently roll them together - blended numbers across accounts hide the one that's bleeding.

## Then: how much of it? Never assume the whole account.

Once the account is confirmed, list its campaigns with last-30-days spend each, then ask:

> **"Audit all N campaigns, or a slice? 1) Everything · 2) Just the top spenders (where the wasted dollars actually are) · 3) Specific campaigns you name."**

Recommend by shape: under about 5 campaigns, everything is quick and worth it. More than that, recommend option 2 and say why - waste ranks by dollars, so the campaign spending $40 last month cannot produce a finding that matters next to the one spending $4,000.

**The account-level checks ALWAYS run in full, whatever scope I pick.** Conversion tracking (Tier 0), billing, account structure, shared budgets, account-level negative lists and audience settings are properties of the ACCOUNT, not of a campaign. Scoping those to two campaigns produces a confident wrong verdict. Only the per-campaign layers (waste, relevancy, search terms, ad strength) narrow. Say that distinction plainly when I pick a slice, and put the scope in the first line of the report next to the account name.

---

Then audit it in full. Every finding ranked by DOLLARS, then routed to the command that fixes it.

**Read `references/google-ads-audit.md` FIRST** - it holds every check, threshold, evidence grade, and the **Tier 2.5 pricing model** that turns each finding into dollars per month. Do not invent audit items, thresholds, or dollar formulas. Every finding in the output carries a price tag derived from Tier 2.5, and the headline splits PROVEN WASTE (counted) from RECOVERABLE SPEND (estimated). Three rules from it that change the shape of this report:
- Run **Tier 0** before anything else. If conversion tracking is broken, say so and stop - the rest of the audit is measuring fiction.
- Report the **hidden search-terms share** (keyword clicks minus search-term clicks, per campaign). Above ~40%, downgrade confidence in every negative-keyword conclusion.
- Quote a figure only if that file grades it (a) official or (b) stated-sample. If it is (c), call it practitioner convention out loud rather than stating it as fact. The file also lists what NOT to flag - stale advice that still appears in most audit templates.
- For anything touching search terms, negatives, or promoting terms to keywords, **`references/search-terms.md`** is the authority - the weekly pass, negation thresholds, the local-service junk taxonomy with its over-blocking warnings, and what changed in 2025-2026.


**The copy rule.** This command never rewrites an ad or a landing page - it reports what's underperforming and why. When ad copy or page copy is the problem, say so and route it; the rewrite happens in `/write-ads` or `/landing-page`, where the voice and proof files load and I approve the result. An audit that quietly "improves" the owner's words has broken the one thing competitors can't copy.

**The deletion rule.** This command pauses, removes or deletes nothing - not a keyword, an ad, an ad group, a campaign, an asset or a landing page. Wasteful things get REPORTED with the dollars attached and wait for an explicit yes, grouped at the end under **"Needs your approval to remove."** A keyword with no conversions in 30 days is often a keyword with not enough data yet - say which one it is rather than killing it.

**Focus mode:** name a layer (`/audit waste`, `/audit tracking`) and run only that one, at full depth.

**Requires the API connection** (run `code/test_connection.py` first). If it's not live yet and the account is new with no spend, say so - this command earns its keep once traffic flows. Pull the last 30 days for waste, 90 days for structure and trends (or all time if the account is younger).

**Scripts first:** `code/audit_account.py` pulls the account-wide data, `code/find_campaign_negatives.py` surfaces search-term leakage, `code/check_conversion_setup.py` checks tracking, `code/check_autopilot.py` checks the auto-apply settings. Run them, then translate their output into the legible report below - never dump raw script output.

---

## The six layers

**1. Waste - the headline number.** Rank by dollars, biggest first:
- **Search-term leakage** - queries that spent money with zero conversions and visibly wrong intent (jobs, DIY, other cities, services I don't offer per `context/business.md`). Sum the spend.
- **Geo waste** - spend outside my service area (the "Presence or interest" tax). Check the location setting itself while there.
- **Display/partners leakage** - spend on networks that should be unticked.
- **Zero-conversion keywords** - keywords with meaningful spend and nothing to show, vs their ad group's average.
- **Day/hour/device waste** - segments spending with conversion rates far below account average.

**2. Structure vs the spec.** Read `references/stag.md` + `references/campaigns.md` and grade the real account against them: mixed-intent ad groups (the same-ad test), campaigns stealing each other's searches, keywords in the wrong match type, orphan ad groups with no traffic. Structure leaks show up as low Quality Scores everywhere.

**3. The relevancy triangle, per ad group:** keyword → ad → landing page. Quality Score components (expected CTR, ad relevance, landing page experience) tell me which leg is broken per ad group. Cheap clicks live here.
- **The landing page itself** (reference Tier 6): fetch every final URL - dead or redirecting URL, homepage instead of a matched page, H1 that doesn't repeat the ad group's promise, no tap-to-call above the fold on mobile, form over five fields, load over three seconds, no distinct thank-you page (so conversions are unreliable), popups, final URL expansion on without exclusions. Route fixes to `/landing-page`.
- **Ads and assets - structure only** (reference Tier 5): fewer than two RSAs in a group, headline or description slots unfilled, every slot pinned, no keyword in headline 1, fewer than four sitelinks, no callouts, no business name and logo, no call asset on a service business, disapproved or limited ads, text customization on. Flag them and route to `/write-ads`. **Which line is winning and what to swap is NOT an audit finding** - that read lives in `/ad-tests` and stays there.

**4. Tracking integrity.** Are conversions firing? Are the primaries actually the money actions? Is Enhanced Conversions on? Is anything double-counting? A broken conversion setup silently mistrains Smart Bidding for months.

**5. Budget allocation.** Spend vs conversion share per campaign - what's starved, what's bloated, and what the reallocation is worth in conversions per month.

**6. Autopilot + hygiene.** Auto-apply recommendations and auto-created assets sneaking back ON, disapproved ads, paused-but-should-be-running items, dead URLs, missing assets, the negative list actually attached.

---

**Auditing is read-only.** The audit itself never pushes, pauses or edits - it looks, then it writes the report. Fixing happens afterwards, item by item, out of the checklist below, and every item gets its own yes before anything is pushed to the account.

**The report - one screen:**
- **The headline:** total estimated monthly waste, and total $ recoverable per month
- Every finding: what it is, how much it costs, the fix in one line - ranked by dollars
- Each one tagged with how it gets fixed: search-term waste, geo, network and autopilot settings are fixed from the checklist itself using the scripts in `code/` · structure → `/keywords stag` (recluster) · page problems → `/landing-page` + `references/cro-cheatsheet.md` · tracking → `/landing-page` · weak ads → `/write-ads` · thin proof → `/context-layer`
- Search-term waste and ad testing are ongoing engines, not one-time fixes - note what needs a weekly rhythm rather than a single pass
- Finish with **"your next 3 moves, in order"** - plus an honest note on anything that just needs more data before touching

**Prospect mode.** If this is someone else's account, the API won't be connected - a prospect won't grant OAuth before a call. Switch to the outside-in read per the "outside-in audit" section of `references/google-ads-audit.md`: their live ads via the Ads Transparency Center and `/scrape-competitors` (note: since May 2025 the payer name shown can be their agency, not the business), their landing pages graded against `references/cro-cheatsheet.md`, and what their ad copy reveals about their targeting and offer. End with a one-page report in plain English - the top 5 observations and one line each on what the inside audit would confirm. **No dollar figures, ever, outside-in.** A guessed number is the line the prospect finds wrong and uses to discard the whole thing. The gap list earns the call; the counted number comes after read-only access. That's the pitch, not the delivery.

**The eight labels.** The course teaches the audit as eight reads (keywords that never converted · search terms that never convert · hours that lose money · calls not being counted · broad match quietly on · spend outside the service area · Google auto-applying its own changes · Search Partners and Display bleed). Every finding in `audit-report.md` sits under one of those eight names, so the file matches the video. The tier order in the reference is how you WORK; the eight names are how you REPORT. Reads 4, 5 and 7 are settings - flagged, never priced.

**Autopilot is readable from the API now.** `recommendation_subscription` lists every auto-apply subscription, and `change_event` filtered to client type `GOOGLE_ADS_RECOMMENDATIONS_SUBSCRIPTION` lists what Google already applied. Pull both; never say "check the screen" when the API can answer.

---

## ⛔ THE ONE RULE: it answers "what do I fix", and nothing else

(Jono, 1 September 2026: *"There's just too much here - I don't need the fluff or the BS. Just a straight
answer to what needs fixing. Anything else that doesn't directly say that needs to be cut."*)

**Every block on the page names something to fix, or it does not ship.** Before writing any section, ask:
*does this tell the owner to do something?* If it does not, it is diagnostics, and diagnostics live in
`audit-report.md` and `context/audit-results.md` where the work happens - not on the page they read.

**CUT from the report entirely:**
- **Score dials, before/after, passes, minutes, "+48".** A score is not a fix. The owner does not act on 38 becoming 86.
- **The eight-read before/after strip.** It restates the leaks with a number attached to each. One or the other, and the leaks win because they carry the fix.
- **Checklist rows that PASS.** Nobody needs to read sixteen ticks. Show the failures; say "12 of 16 other checks passed" in one line and stop.
- **The watch list.** "Not yet conclusive" is the definition of nothing to do. One line: "6 terms are close to the bar, none conclusive yet - recheck at 90 days."
- **What else changed, waived, raw score.** Housekeeping.

**KEEP - one section per area of the account, each answering the same two questions: what is working, and what to change.** (Jono's structure, 1 September 2026.)

| # | Section | What it answers |
|---|---|---|
| 1 | **Tracking** | Is it set up properly or not. **First, because if calls are not counted every number below is wrong.** |
| 2 | **Search terms** | What to add as a keyword, what to block. **Carries the waste-category matrix** - the thirteen gate-0 categories with count, spend and examples. |
| 3 | **Keywords** | What to add, what to remove. Anything that names the service and got clicks with no leads is NOT here - it is a landing page finding. |
| 4 | **Broad match** | How much spend runs on it and how junky it is against the other match types, side by side. Its own section because it is usually the single biggest source of the terms in section 2. |
| 5 | **Campaigns and ad groups** | Merged, one table. What is working, what is not. |
| 6 | **Ads** | Which are pulling their weight and which are not - CTR and conversion rate against the account average, named. |
| 7 | **Ad assets** | Present, missing, or never set up. Call asset, sitelinks, callouts, business name and logo. |
| 8 | **Split tests** | How many ads are actually running and being compared. **The bar is 100+ ads across the account**; below that, say how far off and what it costs in learning speed. |
| 9 | **Landing pages** | What is converting and what is not, page by page, with the keywords that land on each. |
| 10 | **Ad types** | Search, Display, Performance Max, Local Services Ads, Maps - only the ones this account runs. Which surface earns and which bleeds. |
| 11 | **Brand traffic** | Your own brand terms, and anyone poaching them. Both directions. |
| 12 | **Hours** | When the ads run against when someone answers. Outside business hours is the finding. |
| 13 | **Google's auto recommendations** | What it switched on by itself, and what it changed without asking. |
| 14 | **Budget and bidding** | Where budget is capped on a winner, and where the bid strategy does not match the data. |
| 15 | **Device** | Last, and briefly. Real but secondary. |

**Every section is the same shape: what is working (one line, or omitted if nothing is), then what to change - each row naming what is wrong, what it costs, what to do and who does it.** A section with nothing wrong gets one line saying so and takes no more space than that. Sections for surfaces the account does not run are omitted entirely, not shown empty.

**Order is deliberate.** Tracking first because it invalidates everything. Search terms and keywords next because that is where the money leaks. Everything after that is smaller, and device is last because it is the least actionable.

## Group waste by CAUSE, and route each cause to the right fix

**Waste is not one pile.** `code/search_terms_report.py` gate 0 already sorts every search term into thirteen categories on intent alone - `no_service_named` · `other_service` · `not_offered` · `out_of_area` · `out_of_country` · `niche` · `combo` · `informational` · `marketplace` · `unrelated` · `practitioner` · `practitioner_verify` · price questions. **The report shows those categories, with the count, the spend and two or three real examples each**, because "you wasted $4,078" tells the owner nothing while "5,579 searches never named your service" tells them exactly what kind of problem they have.

**Then the split that decides the fix (Jono, 1 September 2026):**

| The term | What it means | Where it routes |
|---|---|---|
| Does NOT name your service | wrong searcher - gate 0 caught it | **Negatives.** Block it. |
| DOES name your service, clicks, zero leads | right searcher, and something after the click is broken | **NOT a keyword problem.** |

**A buyer-intent keyword with no leads is a landing page or tracking finding, never a "pause the keyword" one.** `water heater install cost`, `plumbing quote online` and `24 hour plumbing service` are all people trying to buy. Forty clicks with no lead on those means the page did not convert them, or the conversion was never counted - and pausing them removes the traffic instead of fixing the cause. Report them under **landing page performance**, with the page each one lands on, and route to `/landing-page`, which owns both.

**Only pause a keyword when gate 0 says the searcher was wrong.** If the term names the service, it stays and the page gets the finding. Say which page, and say whether calls are even being counted before blaming the page for a lead you cannot see.

## Write it for someone who has never run Google Ads

(Jono, 1 September 2026: *"imagine reading this as someone new to google ads - is this really going to help? Fuck no. It's going to confuse them."*)

- **No jargon on the page.** Not impression share - "how often you show up when someone searches". Not match type - "how loosely Google matches what people type". Not n_min, not Tier 2.5, not quality score components. The tier numbers are how YOU work, never what THEY read.
- **No score, no grade, no percentage-of-spend headline.** A number they cannot act on is noise.
- **One idea per row.** If a row needs a semicolon, it is two rows.
- **Say the consequence, not the mechanism.** "You are paying for clicks from cities you do not drive to" beats "geo targeting is set to presence-or-interest".
- **The test:** could someone who has never opened Google Ads read a row and know what to do next? If not, rewrite it.

**Diagnostics keep their place, just not on the page:** spend breakdown, ad performance, what is working,
benchmark, trend and the economics all still get COMPUTED and written to `context/audit-results.md`, and
`/write-ads`, `/keywords` and `/landing-page` read them there. **One exception survives onto the page:**
the single best "spend more here" line, when a campaign beating target cost per lead is budget-capped -
because that IS an instruction. One line, in the fix list, not its own section.

**The test before saving:** read the page start to finish and count the sentences that do not tell the
owner to do something. That number should be near zero.

## The sections that run on EVERY audit, even a clean one

Added 31 August 2026. A live run found nothing above the significance bar, wrote "there is no junk pile
here", and stopped. That is a third of an audit. **Tier 2.9 in `references/google-ads-audit.md` is not
optional and does not depend on finding waste.** Every one of these appears in both deliverables:

1. **Money at risk, not proven waste, as the headline.** Four components, each with its confidence
   label: proven waste (counted) · blind spend (assumption, stated) · mismatched spend (counted spend,
   judged fault) · capped opportunity (modelled). Proven waste of $7 stays $7 - it just sits inside a
   total that tells the truth.
2. **The watch list when nothing clears the bar.** Top 10 search terms and top 10 keywords by spend with
   zero conversions, each showing "8 of 29 clicks", headed "Not yet conclusive". Never "nothing to report".
3. **Where the money went.** Spend by campaign, by ad group, by location, biggest first, with share of
   total and cost per lead per row.
4. **Ad performance.** Account CTR and conversion rate as numbers, then the outliers by name: ads 30%+
   below average CTR, ads with good CTR and bad conversion rate, ad groups running only one ad.
5. **What is working.** Top 5 keywords and search terms by conversions, the best campaign by cost per
   lead, and whether it is budget-capped. An owner cannot double down on what they cannot see.
6. **The negative keyword starter list, ready to paste**, with match type and level, and an "ask first"
   block for anything ambiguous. Empty is fine; silence is not.
7. **Quality Score, all three components** - expected CTR, ad relevance, landing page experience.
   Reporting only landing page experience is a third of the job. Plus **the Business Profile link check**.

8. **Every number compares to the account average.** Report `avgCpl`, then express every campaign, ad group, location and winner as a multiple of it. The campaign table AND the ad group, location and device tables are SORTED best cost per lead first, no-lead rows last, so the winners sit at the top and the bleeders at the bottom. Colour: green at 0.85x or better (15% cheaper), red at 1.25x or worse, yellow in between as "about average" (Jono, 12 Sep 2026 - $32 against a $43 average was reading as average). The bleeding box uses 1.5x as its bar for an action row. **Never list something above the account cost per lead under "double down"** - it produces volume, not efficiency, and scaling it makes the average worse.
9. **Score all seven categories for every campaign** - budget, tracking, ads, assets, landing page, structure, settings. A campaign with one flag and a campaign never checked must not look the same. Then list the actual issues per campaign, each tagged with its category and its cost.
10. **Check whether anything is being split-tested.** Ad groups with fewer than two enabled ads cannot test. If zero ad groups are testing, that is a finding in its own right - you cannot improve what you are not comparing.
11. **Say what the negative list already covers.** A five-row "ready to paste" list is what THIS window newly justifies, not the whole answer. State how many negatives exist, how much of the universal starter list is already covered, and what is still missing.

12. **Every count carries its items.** "5 searches for things you do not sell" must be followed by the five terms with their spend. "30 of 83 keywords sit in more than one ad group" lists all 30 with the ad groups each appears in. "146 negatives ready to paste" lists all 146. **A count with no list anywhere is a bug** - a member who cannot see what is changing cannot approve it, and the rule that every fix gets its own yes is impossible to follow otherwise. `audit-report.md` and `context/audit-results.md` carry the FULL list always; the HTML shows the top 10 by cost behind a "Show all N" toggle.
13. **Every finding carries a certainty grade** - see below. A number is only as strong as its weakest input.

**Never say "nothing to report" for any of these.**

## The certainty grade - on every finding, every run

| Grade | Means | The rule it carries |
|---|---|---|
| **Measured** | Counted from the account. Re-running the query reproduces it. | May be stated as fact |
| **Inferred** | The data supports it but one reasoning step is involved - a threshold, a comparison, a benchmark | Name the reasoning step |
| **Assumed** | Depends on an input we do not have (phone share, job value, close rate) | **The assumption appears inline, in words, every time the number does** |
| **Not measured** | Could not see it | Say what would close it. Goes in `notMeasured`, never omitted |

**A finding is only as strong as its weakest input, and an `Assumed` number may never appear in a headline
total without its assumption beside it.** That is the exact failure of the DJNorth.ca run: a $1,368 figure
resting on an unstated 50% phone-share guess, sitting beside a $7.01 counted figure with nothing to tell
them apart.

This is a different axis from the (a)/(b)/(c) evidence grades in `references/google-ads-audit.md`. Those
grade **where a rule came from**. This grades **how sure we are about this account**. Both appear. A clean result is written out as a clean
result. If a section genuinely cannot run, it goes in `notMeasured` with what would close it.

## The third deliverable: `context/audit-results.md` - what the other commands read

**Write it every run.** `context/` is the shared brain - `business.md`, `compliance.md`, `proof.md` - and
until now audit findings were not in it, so nothing downstream ever knew what the audit found. A run that
finds "every ad lands on the homepage" and does not write it here means `/landing-page` rebuilds pages
blind.

Structure it **by the command that consumes each section**, not by tier, so each one greps its own heading:
`/landing-page` · `/write-ads` · `/keywords` · `/search-terms` · `/campaign-plan`. The
starter file carries the headings; fill them, do not restructure them.

Three rules:
- **Full lists, never counts.** This is the file the fixes are built from, so truncation here becomes a
  silently incomplete fix later.
- **Head it with the trust section.** If tracking is broken, every consuming command must know that before
  it acts on anything below.
- **⛔ `/proposal` never reads it.** That command is zero-access by design and everything here came from
  inside an account.

## The second deliverable: `audit-report.html` - the thing you show

**Every run also writes one self-contained HTML page, in the Automatable design theme, and opens it.** The markdown checklist is the working file; the HTML is what you show - on a call, on a screen recording, or to a prospect.

**⛔ The standard is `references/audit-dashboard-spec.md` (12 Sep 2026). Read it before building the page.**
It fixes the layout, the tags, the nesting, the sorting, the colours and every rule from the DJing.ca fix
pass, so the next thousand runs produce the same dashboard. The data comes from two read-only scripts:
`python3 code/audit_dashboard_data.py --cities <the account's cities>` (ads table, ad build checks, assets
coverage and performance, ad groups, final URLs, retargeting, ad types, Maps impressions, auto-apply state)
and `python3 code/cro_score.py <final-urls json> <out json> --service "<the account's services>"
--cities "<the account's service areas>"` (the 18-point page scores). Both word lists come from
`context/business.md` - without them the service and city checks can never pass. Never re-derive
those reads with one-off queries.

**How it is built - never hand-write the HTML:**
1. Copy `references/audit-report-template.html` to `audit-report.html` in the project root.
2. Replace ONLY the JSON inside `<script id="audit-data" type="application/json">` at the top of the file. Every field in the template's sample JSON is required; keep the same keys and shapes. **Do not touch the markup, the CSS or the script.**
3. Open it: `open audit-report.html` (Mac). Say the path in chat so the owner can open it themselves.
4. **Re-write the JSON after every fix pass** - `after`, `issuesAfter`, `passes`, `minutes`, `wasteAfter`, each layer's `after` and `fixed` line, each leak's `status`, and each fix's `status` - then say "report refreshed" so the owner reloads.

**The report's shape (Jono's ruling, 2 September 2026).** The page is organised by WHERE things live, not by kind of analysis: report card with the benchmark table at the top, then a one-line-per-finding "what to fix first" index, then five sections - **the account** (tracking, setup, integrations, economics) · **the campaigns and ad groups** · **the ads** · **the landing pages** · **the keywords and search terms** - then "what we could not see". Every finding card renders INSIDE its section; the index at the top only links down. Five hard rules the renderer enforces and the JSON must feed:
- **Say every number once.** The at-risk figure, the benchmark row, the tracking caveat - each appears in exactly one place. Never write a JSON field that restates another section's number.
- **No question marks.** Prospect mode shows `projectedAfter` (the score if every fixable item were fixed, waived items still failing) instead of a `?` dial. If it cannot be projected, the scorecard is dropped entirely.
- **Money at risk never exceeds spend in the window.** `atRisk.total` is counted waste plus mismatched spend only - phone-blind measurement belongs to Tracking, capped opportunity is not risk. Overlapping figures are never summed.
- **One or two sentences per finding.** This audit is run by Claude and read next to Claude - the reader asks for depth, the page does not dump it. Item lists carry at most 6 rows in the JSON; the full list lives in audit-report.md.
- **Passed checks fold away.** Every checklist shows fails plus a "Show the N that pass" toggle, so a clean group is one line.

**The JSON, field by field:**
- `mode`: `"owner"` (report + fix, the after columns are real) or `"prospect"` (report only - nothing claims to have been fixed).
- `projectedAfter`: required in prospect mode - the projected score after every fixable item is fixed, waived items still counted as failures. Owner mode uses the real `after` instead.
- `atRisk`: `{ total, summary }`. `total` obeys the never-exceeds-spend rule above; `summary` is ONE plain sentence naming what the number is made of.
- `leaks[].section`: required - `account` | `campaigns` | `ads` | `pages` | `keywords`. Routes the finding card into its section. `leaks[].urgent: true` puts a red URGENT tag on it and sorts it to the top of the index regardless of dollars - reserve it for account-breaking faults (a campaign blocking its own city name, nine in ten clicks on broad match).
- `quality.components`: `{ expectedCtr:{below,avg,above}, adRelevance:{...}, landingPage:{...} }` plus `rated`. Rendered as distribution bars - CTR and relevance inside the ads section, landing page experience inside the pages section. Never a lone "N below average" without the average and above counts beside it: "74 of 74 below" is a finding, "27 below" with 47 at-or-above hidden is a distortion.
- `layers`, `fixes` and `costs` are GONE - do not write them. The eight reads live in audit-report.md; the fix list IS the leaks index; the prospect CTA renders on its own.
- `spendBreakdown`: `byAdGroup` / `byLocation` / `byDevice` render as tabs. `byCampaign` is not rendered - the campaign table already carries spend, share, leads and cost per lead in the same row as its seven check dots.
- `campaigns[]`: unchanged - `{ name, status, spend, conv, cpl, checks:{budget,tracking,ads,assets,page,structure,settings}, issues:[{cat,level,what,cost}] }`. Issues render as ONE flat scrolling list across all campaigns, never a checklist per campaign. Column meanings render as hover tooltips in plain words; rows color green/red by cost per lead vs the account average. Tracking is `warn`, not `bad`, when one lead type counts and another does not - a campaign showing a cost per lead cannot have zero tracking. Issue rows route by category: budget/structure/settings stay in the campaigns section, `ads` AND `assets` rows render in the ads section (a call asset or sitelink shows on the ad, so it lives with the ads - Jono, 12 Sep 2026), `page` rows in the landing-pages section, and `tracking` rows are never listed per campaign - the account says tracking once. What counts as a campaign/ad-group issue comes from `references/campaigns.md` (the nine switches: Presence-only locations, every other country excluded, networks, schedule, bidding) and `references/ad-assets.md` (the required asset roster per ad group: call, sitelinks, callouts, name and logo, snippets, lead form, messages). Never write an issue row that restates a finding card or an account check - each fact appears in exactly one list.
- `business`, `account` (the 10-digit customer ID), `domain`, `date`, `window` (the date range audited), `spend` (spend in the window), `currency`.
- `before` / `after`, `issuesBefore` / `issuesAfter`, `passes`, `minutes`: the whole-account numbers. Before is the first read. **`after` stays `null` until a fix pass has actually shipped** - the renderer shows `projectedAfter` until then. Writing `after` equal to `before` on a fresh audit is a bug: a report full of open findings whose two dials match says the fixes are worth nothing, which is the opposite of what the score is for.
- `leaks`: one entry per finding - `{ name, section, severity, monthly, status, detail, evidence, fix, who, urgent? }`. `severity` is REQUIRED: 1-10 urgency, drawn as a small ring on the fix-first index (8-10 red, 5-7 yellow, 1-4 green) and it drives the sort - severity first, then dollars. Score urgency, not dollars: a $7 leak can be a 3, a $0 self-blocking negative a 10.
- The account section is ONE grid of checklist groups (tracking groups first, the rest of `settings` after, and `economics` rendered as a group in the same shape - never its own card). GBP and GA4 status are check rows inside those groups; there is no Integrations block, and `gbp`/`other` are not rendered - anything worth showing becomes a check row, once. Account-level sitelinks are not a check - sitelinks are judged at campaign/ad-group level in the ads section. Account findings (`section: "account"`) never render a card - the checklist row is their one statement and the index links to #account; every account finding MUST have a matching fail row in the account groups. Any leak may carry `noCard: true`: it stays on the fix-first index (linking to its section) but renders no card - use it whenever a section block already tells the story, e.g. the split-test card in the ads section (never a testing card AND a testing finding back to back). The Quality Score bars carry hover tooltips naming the fix that moves each component above average - the audit's recommendations must actually target those components. `status` is `stopped` | `open` | `settings`; settings reads carry `monthly: null` - flagged, never priced. The renderer sorts urgent first, then dollars, so order in the JSON does not matter. `gbp`: `{ linked, autoGoalsSecondary, note }` renders under the account section's Integrations.
- `settings` / `keywords` / `creative` / `pages` / `structure`: `{ groups:[ { name, checks:[ { t, b, a } ] } ] }` where `b` and `a` are `"pass"` or `"fail"`. The check text comes straight from the tiers in this file - Tier 1 and Tier 0 into `settings`, Tier 4 into `keywords`, Tier 5 into `creative`, Tier 6 into `pages`, Tier 3 into `structure`.
- `other`: `[ { group, item, before, after } ]` - everything changed that is not a check on a list: billing caps, security, account links, asset settings.
- `notMeasured` and `waived` are GONE from the page (Jono's ruling, 2 Sep 2026) - they live in audit-report.md only. `waived` still feeds `projectedAfter` (waived items stay failed in the projection).
- `watchlist` is GONE from the page (Jono's ruling, 2 Sep 2026): the audit reports problems, not things to check back on - re-running the audit IS the check-back. Not-yet-conclusive terms stay in audit-report.md only.
- `adPerformance`: `{ accountCtr, accountCvr, ctrBenchmark, cvrBenchmark, outliers:[ { adGroup, issue, ctr, cvr, spend } ] }`.
- `working`: `{ keywords:[ { t, conv, cpl } ], terms:[ { t, conv, cpl } ], bestCampaign:{ name, cpl, capped }, note }`.
- `avgCpl`: the account cost per lead. **Required** - it is the reference every table compares against, and without it nothing can be called an outlier.
- `splitTests`: `{ adGroups:[ { name, ads, spend } ], oldestTestDays, experiments }`.
- `trust`: `{ verdict, notCounted, hiddenSearchTermShare, cvrUsed, cvrCaveat }` - renders as ONE note line under the account section's Tracking checklist. `verdict` is `healthy` / `partly blind` / `broken`. If tracking is broken enough to price, that is a leak with `section: "account"` - the note and the finding card are the only two places tracking is discussed.
- `economics`: `{ jobValue, closeRate, leadValue, breakEven, target, confidence }` read from `context/business.md` "The economics". `confidence` is `measured` / `estimated` / `guess`. Absent or `guess` → every profitability statement is graded `Assumed` and says so. **Never substitute an industry average for the owner's own job value.**
- `trend`: `{ window, previous, spend:{now,then}, cpl:{now,then}, cvr:{now,then}, conv:{now,then} }` - this window against the one before it, so a worsening account and a stable one stop looking identical.
- `benchmark`: `{ category, ctr, cpc, cvr, cpl }` - the row used from the 2026 benchmark table, named, so the comparison is auditable.
- **Every leak, every check and every table row carries `certainty`**: `"measured"` / `"inferred"` / `"assumed"` / `"notMeasured"`, plus `assumption` (a sentence) whenever `certainty` is `assumed`. The renderer prints the assumption inline; a finding graded `assumed` with no `assumption` string is a bug.
- **Every leak carries `items`**: `[ { name, spend, clicks, conv, note } ]` - the actual search terms, keywords or ad groups behind the count. `itemsTotal` gives the true count when `items` is capped for display. A leak with a count in its `detail` and an empty `items` fails the count-without-a-list check.
- `negatives.coverage`: `{ existing, universalCovered, universalTotal, universalMissing:[], note }` - so a short new-negatives list never reads as "these are the only negatives you need". Each `ready` row also carries `why`. Pull `ready` deep - up to 100 rows render (the rest are counted with a pointer to audit-report.md); a window with hundreds of junk terms must not show 14. Blocking rules come from `/search-terms` and `references/search-terms.md` - read them before staging a single row: the junk taxonomy (jobs, courses, DIY, parts, other-trade, out-of-area) fills most of the list free, no cost threshold needed; every candidate is conflict-checked ACCOUNT-WIDE against every enabled keyword (a campaign negative hits every ad group in it, an account negative hits everything); each row lands at the NARROWEST level where it is still true - ad group by default, campaign or account only when honestly account-wide; city campaigns get non-drivable towns and never-offered services staged, but a converting town is NEVER negated without the owner; junk goes PHRASE, names (brands, rivals, directories, performers) go EXACT never phrase, one-word phrase negatives are the most dangerous write in the account, and never a bare common word. Winner verdicts never say "double down" on a keyword - budget lives at campaign level, so the action is protecting the keyword and feeding its campaign.

**Rules:** plain English in every string, no Google Ads jargon, no em-dashes (hyphens only), real numbers only - never a placeholder that looks like data. The sample JSON in the template is Dave's Plumbing, a made-up account: replace every value. **Never show a green number for work that did not ship** - queued, routed and by-hand items never count as fixed.

**Less text, every time.** The page is scanned, not read, and it is read NEXT TO Claude - whoever runs this can ask for depth, so the page never dumps it. Section titles are two or three words and a leak's `detail` is one or two sentences a plumber understands.

**Prospect mode is the honest one.** With no account access there is no audit at all - `/proposal` covers that case from public data. Prospect mode here means you have read-only access but have not fixed anything yet.

---

## The deliverable: `audit-report.md` - a checklist we work through together

**The audit does not end in chat. It ends in a file.** Write every finding to `audit-report.md` as a checklist item, then work down it with me one item at a time. A wall of findings in chat gets read once and lost; a file survives the session, and I can stop halfway and come back.

**The file is the checklist and nothing else. No intro, no methodology, no summary at the bottom, no "next steps" section - the next step is the top unticked box.** One line at the top with the account and date. That is all the header you get.

```markdown
# Audit: Smith Plumbing (123-456-7890) · 13 Aug 2026 · $1,340/mo recoverable

### [ ] 1. Block job-seeker searches · saves $610 a month

312 clicks on searches like "plumber jobs toronto". No leads.

**Who:** me, through the API
**Time:** 10 min
**Changes:** adds 14 negative keywords. Nothing else touched. Reversible.

### [ ] 2. Fix location targeting · saves $380 a month

Set to "presence or interest", so your ads show to people merely
reading about Toronto, including from other countries.

**Who:** you, in Google Ads
**Time:** 1 min
**Changes:** Settings > Locations > Location options > "Presence"

### [x] 3. Untick search partners · saves $210 a month
Done 13 Aug. Was showing ads on other websites, not Google search.
```

**Write it that tight.** Two or three lines of explanation per item, maximum. If an item needs more, it is two items. No paragraph explaining what an audit is, no glossary, no closing summary.

**Then work it.** Top unticked item, do it, tick it, next. One at a time, **each with its own yes** - never batch approvals, never run ahead. When done: tick the box, add the date, replace the item's body with one line on what changed.

**"Who" is on every item.** Some I push through the API; some are clicks only you can make (billing, verification, confirm dialogs). For yours, give the exact click path - never leave someone stuck on an item they can't action.

**The scripts that back the fixes - every finding class has one. Run them; never hand-build what a script already does.** All of the mutating ones dry-run by default and change nothing without `--apply`:
- Negatives: `find_campaign_negatives.py` surfaces them · `add_account_negatives.py` / `add_campaign_negatives.py` / `add_adgroup_negatives.py` / `add_shared_negative_list.py` / `push_negatives.py` add · **`remove_negatives.py` removes** (the self-blocking class) · `find_negative_conflicts.py` checks
- Tracking: `setup_conversion_tracking.py` · `apply_conversion_tracking.py` · `demote_conversion_goals.py` (junk goals like app installs) · `check_conversion_setup.py`
- Autopilot and assets: `check_autopilot.py` · **`pause_auto_apply.py`** (pauses every auto-apply type the API can name) · `disable_auto_assets.py` (text automation AND final URL expansion, PMax included) · `build_assets.py` / `push_assets.py`
- Ads and tests: `build_ads.py` / `push_ads.py` · `ad_test_report.py` / `ad_test_apply.py`
- Campaigns: **`pmax_guardrails.py`** (negative list + negatives onto Performance Max; brand exclusions stay on-screen) · **`exclude_placements.py`** (account-level YouTube/site placement junk) · **`attach_audiences.py`** (lists in observation mode) · **`set_campaign_target.py`** (unexplained cost-per-lead targets) · `exclude_other_countries.py`
- Keywords: `add_keywords.py` · **`pause_keywords.py`** (duplicate cleanup - pause, never remove)
- Left on-screen because the API genuinely refuses (confirmed 11-12 Sep 2026 on v24 and v25): the auto-apply types Google returns as UNKNOWN (retired types still ticked - read their names off the screen), and picking a brand exclusion list (no brand asset-set type exists). Everything else on that old "screen only" list is scriptable.

**Re-running `/audit`** updates this file, never replaces it. Ticked items keep their dates, returning problems re-open with a note, new findings append. Never wipe the history.

**Deletions and pauses still need approval per the rules above** - a checklist item that removes something says so in its "What changes" line, and ticking it is the approval.

---


## Part two - working the report to done

The audit finds the problems. The same command fixes them - ALL of them, not the top three.
It walks `audit-report.md` top to bottom and drives every open item to one of four
states: **fixed** (script ran, verified) · **waiting on owner** (a question only they
can answer) · **on-screen** (a click path handed over) · **routed** (a bigger command
owns it - /landing-page, /keywords stag, /write-ads).

Read `audit-report.md` FIRST. If it does not exist or is stale, run part one first -
the fix half never invents findings, and it never starts before the owner has reviewed the report and said go.

## Ground rules (all CRITICAL)

- **ONE review gate, on the report itself.** The flow is: find everything, the owner
  READS the report, then their go covers every scripted fix in it. Never start fixing
  before that review; never re-ask per batch once it is given.
- **Dry-run first, every time, even under the blanket yes.** Every mutating script
  defaults to a dry run - show its output, then apply. The dry-run is the receipt the
  owner can interrupt on, not a question.
- **The owner's numbers still stop the line.** Budget moves, bid targets, answered
  hours, service area, job value, destination-vs-local geo, and anything the report
  marked ask-first - the blanket yes never covers these. Ask, log, move on.
- **Verify after apply.** Re-run the script's report mode (or the matching check) and
  show the changed state. A mutate call that returned is not a fix until re-read.
- **Nothing gets ENABLED.** Fixing never turns campaigns, ads or keywords on. Created
  things land paused, paused things stay paused.
- **Tick the box.** After each verified fix, tick its item in `audit-report.md` with a
  one-line note (what ran, when). The file is the state - a re-run of `/audit fix`
  resumes from the first unticked box.
- **By-hand items are walked one at a time** per the by-hand queue below - one recipe
  per message, wait for done, verify by API or screenshot, tick. Never paste them all at once.
- **Owner questions block their item, not the run.** Log the question under the item,
  move on, and list every open question at the end.
- **`python3 code/test_connection.py` before the first mutation of the session.**

## The fix map - every audit check routes to exactly one of these

**THE ACCOUNT**
- Conversion actions missing or junk-primary (app installs, page views) →
  `setup_conversion_tracking.py` to create · `demote_conversion_goals.py` to demote/off
- Call reporting / call conversions → `apply_conversion_tracking.py`; the website tag
  itself is `/landing-page`'s tracking layer (ROUTED) - and verified in a real browser,
  `window.gtag` + a test conversion, never by reading the component
- Calls triple-counted (several primary call actions) → `demote_conversion_goals.py`,
  keep ONE primary per money event
- Auto-apply recommendations ON → **`pause_auto_apply.py --apply`** pauses every type the
  API can name. Types returned as UNKNOWN (Google retired them from the API, they stay
  ticked on screen - on DJNorth.ca: Remove redundant keywords · Remove non-serving keywords ·
  Remove conflicting negative keywords · Upgrade your conversion tracking · Target impression
  share) are ON-SCREEN: Admin > Recommendations auto-apply > untick > Save. Verify with
  `pause_auto_apply.py` (expect 0 ENABLED). All 21 types off, both bundles, no exceptions
- Auto-created assets / AI Max text customization / final URL expansion → `disable_auto_assets.py`
  (dry run by default; on Performance Max it opts out FINAL_URL_EXPANSION and TEXT automation
  in ONE operation - a second call for text alone is refused while URL expansion is on)
- Audience lists attached to nothing → `attach_audiences.py` (observation only)
- Enhanced Conversions → ON-SCREEN (API cannot switch it): Goals > Settings
- GBP link → READABLE by API: an `asset_set` of type LOCATION_SYNC exists only when a
  Business Profile is linked. Never say "could not be read". GA4 link → ON-SCREEN
- Economics missing (job value, close rate) → READ CLAUDE.md "## My setup" and
  `context/business.md` FIRST - DJNorth.ca's $1,200 booking and 2-in-10 close rate were on
  file since 1 Sep and the 11 Sep run still asked. Only then an OWNER QUESTION, two lines

**THE CAMPAIGNS AND AD GROUPS**
- A campaign blocks its own city / negatives block live keywords →
  `find_negative_conflicts.py` to list · **`remove_negatives.py`** to clear. The
  self-blocking class is always the FIRST batch of the run
- Dormant ad groups (enabled, barely serving) → NEVER an automatic change. Report why it is dormant
  (usually an untargeted sibling group winning the same searcher), compare the groups on the widest
  window that is conclusive, and recommend in order: second ad in the starved group first, then a
  targeting exclusion on the untargeted group in ONE campaign as a test, re-read at 30 days, then roll
  out. The owner picks. (Jono, 12 Sep 2026, DJNorth Brides vs Regular)
- Presence-or-interest targeting → **`set_locations.py --presence`** (ASK FIRST if the
  business could be destination-based - hotels and tours stay presence-or-interest)
- Other countries not excluded → `exclude_other_countries.py --keep <CC>`
- No ad schedule / overnight voicemail spend → OWNER QUESTION (answered hours), then
  **`set_ad_schedule.py`** - say the account time zone out loud both times
- Unexplained bid targets → OWNER QUESTION (what number), then **`set_campaign_target.py`**
- PMax with no negatives or brand exclusions → an ACCOUNT-level negative list reaches PMax
  (add it with `add_account_negatives.py --terms-file`), so that is the negatives fix.
  ⛔ `pmax_guardrails.py` attaches "the largest enabled list" by default - on DJNorth.ca that
  was "Out Of Service Locations" holding broad `montreal`, `toronto`, every live city. Never
  run it without `--list`, never attach a list you have not read. Brand list is ON-SCREEN
  (no API surface on v24 or v25)
- Junk placements (YouTube etc.) → **`exclude_placements.py --report`**, pick, apply
- Duplicate keywords across ad groups → FIRST compare every targeting dimension of the ad
  groups (gender, age, household income, parental status, audience lists and segments in
  targeting mode, location and exclusions, language, device, schedule, and the ad copy). If
  anything differs it is SEGMENTATION BY DESIGN - report it as such, flag only overlap with
  the untargeted group, never recommend a recluster on keyword text alone (Jono, 12 Sep 2026:
  DJNorth's Brides = women only, Grooms = men only, Regular = everyone). Only when nothing
  differs: recluster ROUTED to `/keywords stag`, cleanup **`pause_keywords.py`**
- Zombie experiments on paused bases → read `experiment.end_date` first. Expired: `end_experiment`
  and pausing the trial campaign are both REFUSED; the route is `ExperimentOperation.remove`,
  which removes the trial campaign with it. ⛔ A remove is not reversible and ALWAYS gets its
  own yes - print what it is (base campaign, end date, spend, impressions) and stop, even under
  a blanket go. Live experiment: Campaigns > Experiments > End on screen
- Budget moves (feeding a capped winner) → the math is ONE SWAP PER CAMPAIGN TYPE: search
  funds search, Performance Max funds Performance Max, LSA funds LSA, never across (Jono,
  12 Sep 2026: a PMax lead is less likely to become a paying customer, so the two are not
  comparable per lead - and a PMax cost per lead that looks best is suspect until brand
  exclusions are on). Show the trim and the feed with three figures each, walk the owner through it, then OWNER
  QUESTION, then ON-SCREEN (one number) - budget is never scripted silently. A starved winner is
  always SHOWN and explained even when the owner decides to leave it; it is never an auto-fix

**THE ADS**
- Single-ad groups → ROUTED to `/write-ads` (`build_ads.py` /
  `push_ads.py` do the writes, everything lands PAUSED)
- Missing sitelinks, callouts, snippets, call asset, logo → reuse first: attach existing
  assets with `asset.source = ADVERTISER` only (Google's AUTOMATICALLY_CREATED ones refuse
  campaign linking: "Advertiser links cannot link to automatically created asset"), every
  final URL curl-checked 200; else `build_assets.py` then `push_assets.py`; Advertiser
  Verification for name/logo is ON-SCREEN
- Stale champion/challenger tests → `ad_test_report.py` then `ad_test_apply.py`

**THE LANDING PAGES**
- Message match, headline, page titles, speed, tap-to-call → ROUTED to `/landing-page`
  (page work is a build, not an API mutate). Never "fixed" until the page is live and
  the tracking gate passed
- Final URL expansion ON → `disable_auto_assets.py --apply` (v24 field: `asset_automation_settings`
  type FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION; `campaign.url_expansion_opt_out` is gone)

**THE KEYWORDS AND SEARCH TERMS**
- Universal junk list gaps → `add_account_negatives.py --terms-file <per-account file> --name <list> --apply`
  (dry run by default). ⛔ Its built-in list is Automatable's and carries "school", "class",
  "video", "sample", "contact" - buyer words for most trades. Stage a per-account file, conflict-
  check it against every enabled keyword text, and hold buyer-adjacent words (free, review,
  reviews) for the owner's yes
- New negatives from the window's traffic → the staging comes from `/search-terms`
  (its taxonomy, its conflict check, its levels); the push is `push_negatives.py` /
  `add_campaign_negatives.py` / `add_adgroup_negatives.py`
- Broad match takeover → **`change_match_type.py`** (creates phrase twins, pauses the
  broads, removes nothing) - ASK FIRST when broad has real conversion history
- Dead duplicates → **`pause_keywords.py`**

## ⛔ THE BY-HAND QUEUE - walked one at a time, never dumped as a list

Some fixes the API cannot touch: they need the owner's hands in the browser. Jono's rule
(2 Sep 2026): these get their own section of the report, and part two walks them
**one at a time** - present one item, wait for "done", verify, tick, then the next.
A pasted wall of ten click paths gets skimmed and abandoned; one clear recipe at a time
gets done.

**Every by-hand item is written as a recipe with all four parts:**

1. **WHY, in one line with the dollar.** "Auto-apply is rewriting your keywords behind
   your back - it cost $340 last month."
2. **THE EXACT CLICK PATH, from the very top.** Start at ads.google.com, name every
   click: "Admin (left sidebar, bottom) → Recommendations auto-apply → untick every box
   under both bundles → Save." Never "go to settings and turn it off" - the owner has
   never seen these screens.
3. **WHAT IT LOOKS LIKE WHEN DONE.** One sentence describing the after-state on screen,
   so they know they are finished: "every checkbox empty, header says Not applying."
4. **HOW I VERIFY.** The check I run the moment they say done (`check_autopilot.py`,
   re-read via API, or a read-back query). If I cannot verify by API, say so and ask for
   a screenshot instead. An unverified by-hand item stays unticked.

**The recurring by-hand items and their paths (keep current - screens move):**
- **Auto-apply recommendations OFF** → Admin → Recommendations auto-apply → untick all,
  both bundles → verify `check_autopilot.py`
- **Enhanced Conversions ON** → Goals → Conversions → Settings → Enhanced conversions →
  turn on, tag method → verify via conversion action read-back
- **GBP / GA4 links** → Tools & settings → Data manager (or Linked accounts) → connect →
  verify via API links query
- **PMax brand exclusions** → the campaign → Settings → Brand exclusions → attach list →
  `pmax_guardrails.py` prints this path itself
- **Ending zombie experiments** → Campaigns → Experiments → End → verify campaigns query
- **Budget changes** → the campaign → Budget pencil → one number, typed by the owner →
  verify via campaign read-back (budget is ALWAYS by-hand, never scripted silently)
- **Advertiser Verification / business name + logo** → Billing → Advertiser verification
  → follow Google's flow → verify `build_assets.py` report mode

**In `audit-report.md` these live under their own heading - "Needs your hands - N items,
walked together at the end"** - each with its four-part recipe already written, so the
owner can also do them alone from the file. The HTML report shows the same section with
one recipe per card, never a bare list of paths. In part two they come AFTER the scripted
batch: scripts first (they need no one), then the walk, one recipe per message, wait for
done, verify, tick.

## The run, in order

1. `test_connection.py` · confirm the account in `.env` is the one being fixed - say
   its name and ID out loud before anything mutates.
2. Self-inflicted blocks first (`remove_negatives.py`) - they cost money every hour.
3. Tracking (nothing else can be judged until leads count).
4. Autopilot off (or Google undoes the rest).
5. The remaining account items, then campaigns, ads, pages, keywords - each batch:
   dry-run → apply → verify → tick (the report review was the yes; only owner-number
   items stop and ask).
6. Finish: re-run the audit read. The new report's before/after IS the receipt. List every
   "waiting on owner" question in one block at the end.

## What this command never does

Never enables anything. Never removes a keyword (pause only). Never invents a budget,
a target, answered hours, a service area or a job value - those are the owner's five
numbers. Never fixes on a stale audit. Never claims "fixed" without the verify read.

## Learned on the DJNorth.ca fix pass, 11-12 September 2026 (Jono's rulings, all binding)

**The dashboard.**
- Every finding carries a tag by who can fix it: `fixed` · `partly fixed · click needed` · `bigger build`
  (API, needs a yes) · `website access` · `click needed` (API refuses) · `your proof` / `your number`.
  A legend above the fix-first index explains them. Partial work is never shown as plain open.
- **No "no action" rows on the page.** Waived findings and things with nothing to do live in
  audit-report.md only. The page lists fixes.
- **One grid per section, no duplicate lists.** Per-campaign and per-ad-group issues are a box in the
  same checkbox grid ("By campaign and ad group", "By ad group") and the section's findings are another
  box ("Findings in this section"). Every finding is ONE checkbox row there; the index links to that row
  and highlights it. The old "Found in this section" cards and "issues by ad group" lists are gone.
- **Fixed rows fold** like passing checks ("Show the N fixed"), so a box shows only what is still open.
  A row shows its name, tag, cost, who and the fix; the longer "why" sits behind a `why` toggle.
- **Three columns the rows flow through.** `.groups{columns:3}` with boxes allowed to break and rows never
  split, so a long box continues into the next column and the columns end level (Jono, 12 Sep 2026; box-level
  masonry and grids were tried and left one column towering or empty).
- **"Needs your hands" renders on the HTML as a SHORT checklist** (Jono, 12 Sep 2026): a heading "N things
  need your hands", one line "The API cannot do these. Message Claude when you are ready and we walk through
  every step together, one at a time.", then one checkbox line per item with the first three clicks of its
  path. The full four-part recipes (why, path, done, verify) live in audit-report.md and are walked one per
  message in part two. `byHand[]` keeps all four fields; the page shows the title and a path hint only.
- **Rebuild, never edit, the before state.** Lock `assets/before-<date>/` first; write the fixed
  dashboard as a new file (`audit-report-fixed.html`) built from the before copy; the sample JSON gains
  `leaks[].progress` and `byHand[]`. The template carries all of the above since 12 Sep 2026.
- A check whose cause is removed passes: "Google has made no changes on its own" passes once every
  auto-apply type is off, even if a change happened inside the window.
- A finding that is mostly fixed with one click left is marked FIXED; the remaining click lives in the
  matching check row (tag `click needed`, sub line pointing at its recipe) and in the recipe card, nowhere
  else. Never a finding card AND a check row AND a recipe all saying the same thing (Jono, 12 Sep 2026).
- A box where every row passes gets a green tick in its heading and a green count ("7 / 7 pass"), so the
  owner sees at a glance what is working and skips it (Jono, 12 Sep 2026).
- Landing page split testing is DETECTED, never run (Jono, 12 Sep 2026): `cro_score.py` reads the page source for
  a testing script (Optimizely, VWO, Convert, AB Tasty, Unbounce, Instapage, GrowthBook, Kameleoon) and the
  final-URL map for an ad group whose ads land on two different pages. Either signal passes the check; neither
  means a fail with a one-line note that page testing is outside this audit.

**The money box in the campaigns section (Jono, 12 Sep 2026).** Its purpose is two lists: "Bleeding
money - fix these" (campaigns above your average cost per lead, each with the cause and the action:
fix the cause first, re-read, then trim and move the money within the same campaign type) and "Cheap
leads - protect these" (campaigns well under average, whether they are capped, and where their feed
comes from). A budget cap on its own is a fact, not a row. "1.3x your average, do not add money" is
not a row either - it tells the owner to do nothing. Every row names an action or it does not ship.

**Cross-reference every row against what this run already wrote (Jono, 12 Sep 2026).** Before the
page ships, walk every check row, issue row and finding and ask: did a write in this run remove its
cause? If yes it is DONE - ticked, tagged fixed, one line saying what shipped - never an open
instruction that reads "cause found and fixed, re-read in 30 days". Edmonton and Calgary were left
reading as work after their own negatives had already been removed; that is the failure.

**Audits are iterative.** Nobody clears an account in one pass. A row whose only follow-up is "the next
audit reads it again" is not open work and is not shown as such; the re-read happens by re-running
`/audit` in 30 days. The page shows what shipped (fixed, folded under "Show the N fixed" so the owner
can see it was done), what is open now, and nothing that only exists to be re-checked later.

**The campaign table has NO check dots (Jono, 12 Sep 2026, superseding the dots).** A coloured dot that
folds five facts into one tells the owner nothing they can act on and repeats what the boxes already
say. The money lives in ONE card with four tabs - by campaign, by ad group, by location, by device - each
sorted best cost per lead first with the same colour bands (Jono, 12 Sep 2026: two tables for the same
thing were merged). The campaign tab is campaign, spend, share, leads, cost per lead against the average - and nothing else - no dots, no "open now" column (Jono, 12 Sep 2026, both tried and dropped). The
work lives in the boxes below it, ONE CHECKBOX PER INSTANCE, generated from the API pull, never from
prose: one row per ad group short of two ads, one per campaign without a call
button, one per campaign under four sitelinks (account-level assets count), one per page fault. A
summary line like "all four ad groups are single-ad - the only campaign where that is true" is a half
truth that hides the campaign next door; the count is the number of rows, and the section finding
points at the rows instead of restating them. The old dot columns were: budget (not starving a winner, not feeding a loser) · ads (two full ads in every ad
group) · assets (sitelinks, callouts, call button, logo attached) · landing page (the page repeats the
ad's promise) · structure (one theme per ad group, own city not blocked, segmentation by design counts
as ok) · settings (networks, locations, schedule, bid targets, URL expansion, brand list). Tracking is
NOT a column: it is the same answer for every campaign, so it is an account fact said once in the
account section. Any column that would read the same for every row comes out of the table for the same
reason, and anything the API cannot read is never shown as a dot. The dots are recomputed after the fix
pass from the account as it now stands, never carried over from the first read.

**Ad strength: never a goal, and a HIGH score is the flag (Jono, 12 Sep 2026).** Never write a check, row
or count that asks for a better ad score. Google says the score is not used in Ad Rank, Quality Score or
auction wins (a); Optmyzr's sample (22,000 accounts, 1 million ads) found no correlation between ad
score and cost per lead or conversion rate (b); Adalysis found lower-scored ads converting better (c).
Optimising toward the score rewards interchangeable headlines and punishes an ad written to one
audience (a Grooms ad that says groom fifteen ways with the city pinned reads Poor and is right). The
ads check is therefore ONE thing: "No live ad converts below the account average on a conclusive
window" - one row per ad that fails it, with its clicks, its rate and the average, widened to 365 days
or all time as needed. Where a failing ad is rated Excellent, say so in the row: the score is the tell,
the number is the finding. Cite the three sources in the check's sub line every run. Disapproved or
limited ads (policy) are a separate check and stay.

**Ad types, every run (Jono, 12 Sep 2026).** An "Ad types" box in the account section with one row per
surface: Search · Performance Max (with guardrails) · Maps ads · Local Services Ads. Maps is READABLE:
Maps placement is on when the linked Business Profile's LOCATION_SYNC asset set is attached at account
level (`customer_asset_set`) or to the campaigns (`campaign_asset_set`); linked but not attached is a
fail with the click path. Local Services Ads are NOT readable through the Google Ads API, so the row is
eligibility: country plus category against `references/lsa-setup.md` (Canada: 14 home-service trades
only; US: the 114 categories). Eligible → fail, tag `click needed`, "confirm at ads.google.com/localservices,
else run /lsa-setup". Not eligible → pass with the reason in one line, and say when to re-check.

**The ad assets table, every run (Jono, 12 Sep 2026).** In the ads section, one row per asset type -
sitelinks, callouts, structured snippets, call button, lead form, message, location, images, business
name, business logo, price, app, promotion - with: required or optional - REQUIRED: sitelinks, callouts, structured snippets, call button, lead form,
message, location, images, business name, business logo; OPTIONAL: price, app, promotion (Jono, 12 Sep 2026);
anything required that is not on every live campaign reads INCOMPLETE, never partial; how many of the live campaigns carry it (account-level assets count for all, ad-group
assets count too); impressions, clicks and leads on a 365-day window from `asset_field_type_view`; a
status dot and a tag. Missing on some campaigns is a `bigger build` row (reuse ADVERTISER assets by API);
missing images is `your proof` unless the owner's site carries real photos of their own work, which may be cropped to 1200x628 and 1200x1200 and attached by API (field type AD_IMAGE on Search; MARKETING_IMAGE only on Display and PMax); the scan counts AD_IMAGE too; an asset that is attached but served 0 impressions in a year is a fail
with the reason (DJNorth's location asset: attached through the profile sync, 0 impressions, so Maps is
set up but not showing). JSON: `assetTable[]`.

**The ads table, every run (Jono, 12 Sep 2026).** In the ads section, one row per live ad, sorted best
cost per lead first with ads under 29 clicks listed after the proven ones, on the widest conclusive
window: campaign, ad group, clicks, leads, click-through, conversion rate, cost per click, cost per lead against the account's
ad average (cost per lead is cost per click divided by conversion rate: the click price and the page in one
number, which is why it is the default sort), both cost columns clickable to re-sort, campaign and ad group dropdowns above the table to narrow it,
the same green / yellow / red bands as the campaign table, and a "What to do" column of two or three short bullets, never a paragraph and never a verdict alone (no headline column: one line of fifteen says nothing): "Keep it" (champion, never pause, test against it) · "Leave it for now" (about
average, next candidate) · "Replace it" (15% or more below average on 29+ clicks: a challenger is written
from the owner's proof, lands paused, the loser pauses at 30 days, tag `your proof`) · "Leave it" (under
29 clicks, the next audit re-reads it). Money shows two decimals or none. Every table and long list on the
page is capped at a scrollable height with a sticky header (Jono, 12 Sep 2026). Google's expected click-through and ad relevance grades for the ad's group sit as two columns (ticked when
no keyword is rated below average, else "3 of 9 below"); no ad-strength column (Jono, 12 Sep 2026). The underperformers are NOT repeated as prose rows in the ad-group box; the table row is
their one statement, and the "no live ad converts below average" check points at the table. JSON:
`adTable{window, avg{ctr,cvr,cpl}, ads[]}`.

**Landing pages are SCORED, per page, every run (Jono, 12 Sep 2026).** `code/cro_score.py` loads every
distinct final URL from the live ad groups and asset groups in a headless phone-sized browser and runs the
16-point checklist built from `references/cro-cheatsheet.md` and the agency CRO checks: headline names the
service · headline names the city · title names the city · one call to action above the fold · tap-to-call
above the fold · click-to-call anywhere · lead form · 4 fields or fewer · button says the outcome · review
stars with a count · social-proof numbers · testimonials · 3+ real photos · guarantee · FAQ · service area ·
under 2 seconds · no popup and few nav exits. The five proof items count double. Removed 12 Sep: the button-wording check and the two-headline split (now one line: service and city in a line that sells); the form bar is 8 fields; review stars also match "5 star rated" and "five star". The pages section is built like the ads
section (Jono, 12 Sep 2026): a table with one row per page, best first, and a nested box with one line per
check and the pages as the tick-cross sub-line - never one block per page. JSON: `pageScores[]`. The old per-campaign page rows are gone; the block is the one
statement. Never run it headed; never call a page "done" from this score alone - the tracking gate still applies.

**An ad's verdict checks for a fix that changed its traffic (Jono, 12 Sep 2026).** Before the ads table
says "replace it", ask whether a write in this run (or in the last 30 days) changed what that ad's campaign
serves on - a removed self-block, a match-type change, a location or schedule change, a big negative batch.
If yes, the year's numbers describe traffic the ad no longer gets: the row reads "Re-read after the fix"
with the reason and the date, and no rewrite is offered until 30 days of new traffic exist. JSON:
`adTable.recentFix{ campaign prefix: reason }`. Calgary and Edmonton were the case: their own city
negatives were removed 11 Sep, so their ads had never been judged on a Calgary or Edmonton search.

**Pace of change: bleeders get everything at once, winners get one change at a time (Jono, 12 Sep 2026).**
A campaign at 1.5x the account cost per lead or worse has nothing worth protecting, so every fix that applies
ships on it in one pass - negatives, ad rewrite, page, budget trim, targeting - and nobody needs to know
which one moved the number. A campaign at or better than average gets one traffic-changing move per 30
days (ad rewrite, budget, match type, targeting) and a re-run of `/audit` before the next, because there a
wrong move breaks something real. Fault removals that cannot interact (self-blocks, auto-apply, junk
goals, observation audiences) always ship together regardless. The page says which kind each item is.

**Retargeting, every run (Jono, 12 Sep 2026).** A "Retargeting" box in the account section, four checks
read from the API: visitor and enquiry lists exist and clear 1,000 members for search (`user_list.size_for_search`)
· those lists are attached in observation to every live search campaign · a retargeting campaign is LIVE
that targets the warmest list (people who started an enquiry and left) - read `campaign_criterion` type
USER_LIST on enabled campaigns with the AUDIENCE restriction not bid-only; none live is a `bigger build`
(one fresh campaign on that list via /campaign-plan, lands paused; never re-enable old retargeting
campaigns as they are) · past customers (the converters list) are excluded from prospecting - a negative
user-list criterion on the live campaigns, by API.

**Split testing is per ad group, credited where it runs (Jono, 12 Sep 2026).** The "Ads by ad group" box
lists EVERY live ad group: a ticked row where two or more ads compete ("split test running, 2 ads"), a
red row tagged `your proof` where one ad runs alone. The heading count says the whole picture ("6 / 17
pass"). No generic finding line ("nothing is being split-tested") and no separate "is anything being
tested" card - the box is the one statement; the ads check sums it in a sub line.

**No catch-all rows (Jono, 12 Sep 2026).** A check that summarises rows listed elsewhere on the page
("every ad group runs two ads", "every ad is built to the spec", "no ad converts below average") is
not shown; the itemised rows and the table are the statement, and the box heading carries the count.
"What does this mean?" must never answer "twenty-three things merged into one line".

**Per-instance boxes are NESTED, never flat (Jono, 12 Sep 2026).** "One checkbox per instance" does not
mean ninety lines of the same sentence. Each box is one line per thing (an asset type, a campaign, a build
check) with the instances as a compact sub-line of ticks and crosses: "Lead form: 2 of 9 missing" then
"✓ Montreal · ✓ Ottawa · ✗ PMax Toronto · ✗ PMax Montreal". Fully ticked lines fold; partly ticked lines
show their sub-line. Renderer: `nestedGroup()`, fed by `assetsNested()`, `adsNested()`, `buildNested()`.

**The city-in-headline fix is scriptable and in place (12 Sep 2026).** For every live RSA without the city in a
pinned first headline: add `{LOCATION(City):<campaign city>} <root keyword>` pinned to HEADLINE_1 via
`AdService.mutate_ads` with update mask `responsive_search_ad.headlines`, keeping every existing headline and
pin; if the ad is already at 15, drop the unpinned headline with the fewest impressions on 365 days
(`ad_group_ad_asset_view`). The root keyword is "Wedding DJ" when any keyword in the group contains it,
else "DJ". Print the dry run (added line, dropped line per ad) before applying; say that an in-place edit
restarts Google's learning on that ad.

**A paused draft is not a fix (Jono, 12 Sep 2026).** A challenger ad, an asset or a campaign created PAUSED
reads `click needed` with the switch-on step in "Needs your hands"; it turns green only when it is enabled and
read back. Green means live, never staged.

**A lead form is never attached without delivery (Jono, 12 Sep 2026).** Building the asset is fine; attaching it
to a campaign needs `lead_form_asset.delivery_methods` pointing at the owner's webhook (CRM or automation URL,
with its key) first. Without it Google holds each lead 30 days in a download nobody opens. Until the webhook
exists the row reads `your number`.

**Anything that routes a lead is verified by the owner before it is attached (Jono, 12 Sep 2026).** A call
asset (which number rings for THIS city - businesses carry different numbers per area code), a lead form
(where the leads are delivered), a message asset (WhatsApp, text or Messenger, and to whom), a webhook, a
final URL change. The audit may BUILD the asset, but attaching it is an owner-verified step: the row reads
`your number` until the owner confirms, then it ships and is read back. Never reuse an existing asset on a
new campaign on the assumption the number is national.

**Challenger ads are written from the account's own winning lines first (Jono, 12 Sep 2026).** Before writing
a single new headline, read every headline and description in the account with its 365-day impressions,
clicks and Google's performance label (`ad_group_ad_asset_view`), rank them, and build the challenger from
what already wins there: the city and root keyword pinned in headline 1, the top city lines, the top
generic lines, the audience-specific lines the group already uses (Brides, Grooms), the four best
descriptions. Only when no context exists for a claim does `your proof` gate a line. The challenger lands
PAUSED and reads `click needed` until the owner switches it on. Three traps from that run: with the city pinned in headline 1, at most ONE other headline names the city (Google shows three headlines at once and a city said twice reads as filler), and every line reads as a sentence ("Book an Edmonton DJ now", never "Book Edmonton DJ Now"); the 30-character limit counts a tag's FALLBACK text (`{LOCATION(City):Edmonton} Wedding DJ` is 19, not 35), and every line must be an existing winner or a city or audience variant of one - never an invented line. Script pattern: the 12 Sep DJing.ca run
(`code/cache/<account>-winning-lines-<date>.json` → `AdGroupAdService` create, status PAUSED).

**Every check always shows (Jono, 12 Sep 2026).** No box, table or check is dropped because the account
passes it. A clean box renders with a green heading, a green count and its rows folded under "Show the
N that pass"; a clean table renders all green. What the owner sees unfolded is what is open; what is
folded is what was checked and passed. This applies to every section of the audit.

**Ad group tightness, every run (Jono, 12 Sep 2026).** Two checkbox lines per ad group in the ads section, Google's own grades only (the invented
"one theme" line was dropped 12 Sep: ad relevance is the measured outcome of a loose group), because they set the click price (Jono, 12 Sep 2026: "Google already gives
scores"): expected click-through and ad relevance from `ad_group_criterion.quality_info` per keyword, rolled
up per ad group - a group passes when no keyword is rated BELOW_AVERAGE; landing page experience rolled up
per final URL in the pages section. No distribution bars, no invented match score. JSON:
`tightness{themes[]}`, `googleGrades{ctr[],rel[],lp_pages[]}`. Fixes: relevance and themes `bigger build`
(headline or recluster, needs a yes), click-through `your proof`, page experience `website access`.

**Keywords per ad group, every run (Jono, 12 Sep 2026).** One nested line in the keywords section: at least 5
keywords per ad group (grade (c)), ad groups as the sub-line with their count. No upper limit (Jono, 12 Sep
2026: it is relevance that matters, and Google's ad relevance grade judges that); one keyword is single-keyword
debt, `bigger build`.
JSON: `keywordCounts[]`.

**Pages checks (Jono, 12 Sep 2026).** No "page title matches the campaign" check - it is the headline check
said twice. The homepage check names the exact ad or asset group that lands on the homepage in its sub line
(on DJing.ca: Performance Max Montreal asset group 2), never a bare fail.

**No finding card that restates a check row (Jono, 12 Sep 2026).** If a check row already says it ("the
headline names the service and the city", tagged website access, with the fix in its sub line), there is no
separate finding in the section or the fix-first index for the same fact. The pages section is the scored
pages plus the check rows; the old "every page hides what you sell" card is the example that was removed.

**Match type is one actionable line (Jono, 12 Sep 2026).** "Keywords run on phrase match; broad only where a
conversion history justifies it", tagged `bigger build`, fixed by `change_match_type.py` (phrase twin, broad
paused, nothing removed). No separate "broad watched against a baseline" row.

**No "every negative list is attached" check (Jono, 12 Sep 2026).** Attaching a shared list wholesale is how a
campaign ends up blocking its own city (item 16). The audit reads unattached lists, names what is in them, and
stages terms one by one; it never scores attachment as a pass.

**Every fix pass writes a revert sheet (Jono, 12 Sep 2026).** `assets/revert-<account>-<date>.md`: every
account write, its ids, the exact reverse action, and the cache file holding the before state (headline lists,
negative terms, challenger ids, keyword counts). Removed things are marked not reversible. Written before the
session ends, never after.

**The keywords section (Jono, 12 Sep 2026).** No "what is winning" table and no "ask first" block on the page:
borderline items are asked in chat before anything changes. "Searches to block" is one table with tabs per
campaign (All + each), each row a search term with clicks, spend, why, and a status (blocked on a date, or held
with the question). Checks: phrase match is the one actionable line · converting search terms exist as
keywords · most keywords serve · no negative blocks a keyword you bid on (own-city block is a case of it, not
a second row) · the universal junk list is covered · negatives are mostly phrase · search terms are visible
enough to act on · at least 5 keywords per ad group. No Lin-Rodnitzky row: a diagnostic without an action.

**Never negate a competitor, a brand or a rival's name (Jono, 12 Sep 2026).** Conquest and competitor searches
are wanted traffic: the business should show for every rival's name. The junk taxonomy covers jobs, DIY,
how-to, far-away places and services not sold - never a person, a company or a venue. If the account already
carries competitor-name negatives, list them and ask before removing; never add one.

**The reads.**
**The window widens by itself until the answer is conclusive (Jono, 12 Sep 2026).** Every comparison
that ends in a verdict - ad group against ad group, keyword, search term, campaign, device, hour - is
read at 30 days first; if the sample is under the significance bar (`n_min` from Tier 2.9.1), re-pull
at 90 days, then 180, then 365, then the whole account history, automatically, without being asked.
Report the window that produced the verdict next to every number ("Brides: 228 clicks, 365 days").
Never write "not yet conclusive" while a wider window exists that has not been read. Two widths can
disagree: say both (Brides converted at 29% on 17 clicks this month and 19% on 228 clicks this year).
The GAQL literal is `segments.date BETWEEN 'YYYY-MM-DD' AND 'YYYY-MM-DD'`; `LAST_90_DAYS` does not exist.

- `find_negative_conflicts.py` must exclude negatives from the keyword side
  (`ad_group_criterion.negative = FALSE`). The 1 Sep run reported 27 keywords "blocked by their own
  negatives"; 22 were ad-group negatives read as keywords. Only the 8 city rows were real.
- Account-level negatives on v24 are only reachable through the attached shared set
  (`customer_negative_criterion.negative_keyword_list`); `customer_negative_criterion.keyword.*` is gone.
- `demote_conversion_goals.py` dry run must read `goal.biddable` first and say "already off" - it
  listed 6 to demote that were already non-biddable.
- `attach_audiences.py` default scope ("every enabled Search campaign") includes trial campaigns from
  experiments. Name the campaigns with `--campaign` instead.
- `exclude_placements.py --report` on `group_placement_view` returned nothing for a window where the
  audit had priced $7.43 of YouTube. Say "cannot be re-found" and move on; never invent an exclusion.
- `audit_account.py` throws three v24 GAQL faults (SITE_SUSPENDED enum, budget-lost share at AD_GROUP,
  missing campaign.status in SELECT) - pin every query to the API version in use.

**The environment.**
- A revoked refresh token reads `invalid_grant: Token has been expired or revoked`; the developer
  token is a different credential and is never the cause. `get_refresh_token.py` opens a consent tab
  and never writes `.env`; if the old OAuth client cannot issue a token, a new Desktop client goes in
  `credentials.json` AND its id/secret into `.env` before the flow is re-run. Back up both with the date.
- Auditing a second account means switching `GOOGLE_ADS_CUSTOMER_ID` in `.env`; say so in CLAUDE.md
  "## My setup" and switch it back before any run on the first account.

**The line I crossed once.** "Is this not something you can solve?" is not a yes to remove something.
Print what it is and stop. Every remove, on anything, gets its own yes.
