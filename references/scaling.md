# Scaling - one proven ad group, then the whole map, without breaking what works
Researched August 2026 across 74 sources (Google help and API first, then Optmyzr's 2024-2026 datasets, Adalysis, Search Engine Land, Search Engine Journal, named agencies, r/googleads) · the budget-fit math, the four-check gate, what a template carries, when money goes up and when it does not
Next: run `/scale-account` only after one ad group has passed all four checks below.

Read this before enabling a second ad group or raising a budget.

## How every claim is graded

**(a)** Official Google documentation or API reference. **(b)** A study with a stated sample size. **(c)** Practitioner convention. **[V]** Vendor-published.

The budget caps, the 30-conversion floor and the learning triggers are (a) and firm. The 20% step, the 100-click read and the bench rules are (c) with (b) support. Where sources disagree the file says which number this repo uses and why.

---

## The budget-fit math - how many groups a budget can honestly test

Google fixes the pacing. Everything else is arithmetic.

- **Daily budget = monthly ÷ 30.4.** Google may spend up to 2x the daily figure on any one day and never more than 30.4x it in a month (a).
- **Clicks a month = monthly budget ÷ Planner cost per click.** Use the top-of-page bid from `keyword-map.md`, not the low estimate.
- **One ad group needs about 100 clicks per fortnightly read** to call its ad test at 80% confidence (Jono's ruling in `ad-testing.md`; the Adalysis low-traffic floor is 350 impressions, 300 clicks and 7 conversions per ad (c)). Call it 200 clicks a month per group under test.
- **One campaign needs 30 conversions in 30 days** before it earns a target cost per lead (a). Optmyzr's 14,584-account study puts the predictable floor at 50, with under 25 volatile (b)[V]. Google's 2026 benchmark for structure decisions is 15, poolable across campaigns by a portfolio strategy (a).
- **Groups the budget can test at once = monthly clicks ÷ 200, rounded down, minimum one.**

Worked at 2026 home-improvement medians - $8.33 a click, 8.05% conversion rate (b, LocalIQ):

- $3,000 a month is about $99 a day, about 360 clicks, about 29 leads. That is ONE ad group's worth of verdict-grade data and just under the 30-conversion floor. This is why the launch is one group with the whole budget, not five groups with $20 a day each.
- $6,000 a month is about 720 clicks, about 58 leads: three groups under test, and the campaign clears 50 conversions.
- $1,500 a month is about 180 clicks, about 14 leads: not even one group reaches a verdict inside a fortnight. Say so, and show the budget that gets to one (about $2,500 a month at these numbers).

**Budget spread across everything is the classic self-inflicted injury.** The consolidation cases all read the same way: 44 campaigns to 7 gave a 345% lift in conversion value; 19 to 4 gave 253% more conversions at 60% lower cost per lead; 208 ad groups on a fixed budget was the diagnosis in a 2026 case that gained 40-47% conversions after merging (c with case numbers). Groas' 2026 rule of thumb: 60 conversions a month total means two or three campaigns, maximum (c).

---

## The four-check gate - what "proven" means before anything is stamped

An ad group graduates when all four are true. Three of four is not a template, it is a guess with a spreadsheet.

**1. Search terms trimmed.** Four weekly passes done, the n-gram waste under about 10% of spend, cross-group negatives in place (repo `search-terms.md`). Adalysis lists "no budget-related impression loss" and a clean search-term picture as the prerequisite for widening anything (c). Untrimmed terms get copied into every stamped group and the waste multiplies.

**2. Ad test called.** About 100 clicks, 80% confidence, never before 7 days, judged on click-through with cost per click, conversion rate and cost per conversion as context (Jono's ruling 2026-08-31, `ad-testing.md`). Both ads must have real serving.

**3. The winning bar: two rates, over at least 500 clicks (Jono's ruling, 2026-09-08).** 10% of clicks become leads - that grades the page. 8% of impressions become clicks - that grades the ad and the keyword. Both must hold; a group can pass one and fail the other, and the fix differs (page under 10%: fix the page; ad under 8%: fix the ad). It is results-based on purpose - not budget, not lead count. 30 leads in a month can be $100 a day buying leads by accident; 10% over 500 clicks cannot. The 500 is the noise guard: 10% on 50 clicks is five leads and luck. Roofing and HVAC, where the ticket is big and pages convert at 3-7% (c), use 5% leads and 6% clicks. Why 10 and not 15: the gate asks for proven, not tuned - the month-2 CRO series takes a proven page to 15. Cost per lead at or under target still has to hold, and the 30-conversion floor still gates a tCPA target (a) - but the bar a member quotes is 10 and 8.

**4. Landing page A/B called.** On conversion rate with the same click floor, never on bounce rate. Benchmarks to sanity-check against: 8.05% median for home improvement search (b), 12-16% plumbing, 3-7% HVAC and roofing (c). A page under half its trade's median is a page problem, not a scaling problem.

**Zero conversions on 100+ clicks fails all four, and under 10% leads or 8% clicks on 500 clicks fails check 3.** Route to `/landing-page` - it owns both the page and the tracking. Never answer zero conversions with more budget or more groups.

---

## The template rule - what carries, what must be re-earned

No study covers "stamping" directly. The rule is inferred from what Google says restarts learning and what the datasets say transfers.

**Carries across services:**

- Campaign settings: Search only, Presence, schedule, language, EU political flag (repo `campaigns.md`)
- Bidding strategy type: Maximize Conversions with no target, as the launch group used (a)
- The RSA skeleton: keyword pinned to position 1 only, sentence case, 8-12 headlines, descriptions 61-70 characters (b, Optmyzr 2024 and 2026)
- The page blueprint and tracking layer (repo `landing-page-blueprint.md`)
- The universal negative list and the cross-group negative pattern (repo)
- Proof lines and offer from `context/proof.md`

**Re-earned by every stamped group:**

- **Keyword clusters.** The same-ad test and the results-page check run per intent (repo `stag.md`). Phrase match carries as the default - in lead gen it holds the largest share of spend and conversions across 30,000 accounts (b)[V].
- **Service-specific negatives.** From a fresh search-terms report, not copied - "furnace" is a negative in the AC campaign, not in the furnace one.
- **The ad library, gated fresh.** About 100 headlines and 24 descriptions per stamped group, written to the scout's gaps and culled by `/write-ads`' three gates. The template's survivor lines never copy across wholesale - the keywords and the rival ads differ per group, so gate 2's would-they-click-ours question has a different answer. The RSA skeleton carries; the lines do not. (repo, Jono 2026-09-01)
- **The asset set, built on the ad group.** Assets live at ad group level (repo `ad-assets.md`), so a stamped group has NO sitelinks, callouts, snippets, call asset or messages until `code/push_assets.py` creates them there. A stamped group without its assets is running naked ads. (a for the levels, repo for the ruling)
- **Its own landing page, built in the same run.** One per stamped group, H1 carrying that group's promise, tracking wired, fetched live before the ads are created. A stamped group never ships pointing at a home-page placeholder. (repo, Jono 2026-09-01)
- **The ad verdict.** A new pair starts at zero clicks and zero days.
- **The page conversion rate.** Same blueprint, different trade, different number.
- **The target cost per lead.** Not until the new campaign has 30 conversions on its own; until then a portfolio strategy pools it (a).
- **Quality Score.** Ad relevance is keyword-to-ad, so it is new per group.
- **Smart Bidding's learning.** Adding campaigns, ad groups or keywords to a strategy is a composition change and restarts Learning (a). Every stamp costs about seven days (c), during which Google says not to measure (a).

**The duplicate-search guard.** Google routes an identical keyword across ad groups by exact match first, then identical phrase or broad, then AI relevance, then Ad Rank (a). Nothing that is not identical is guaranteed a home. So every stamp adds its trigger words as negatives on every group it does not define, and the build refuses an identical keyword in two campaigns.

---

## The launch ramp and the bench

- **Month 1:** one ad group, the whole budget (about $100 a day at a typical local budget). Nothing else enabled.
- **Gate:** the four checks above. Expect 4-6 weeks at $100 a day; under 30 conversions a month the learning phase alone runs 4-6 weeks (c).
- **Stamp in waves.** Enable N groups where N is the budget-fit number, never all of them. Each wave starts its own learning clock; do not touch a target or a budget in the same week as a wave (a for the trigger, c for the spacing).
- **The bench** is every group built and paused beyond N, in map order - highest intent, highest volume first. **The bench is a recommendation about what to leave paused, never a status the command assigns** - the owner flips every switch, and `keyword-list.md`'s order is the default BUILD order, nothing more. (Jono 2026-09-01)
- **Bench activation:** one enabled group graduates (four checks passed and it keeps its budget) or fails out, and the next bench group takes its slot. Never activate on a calendar.
- **Fail-out criteria:** 100+ clicks and zero conversions after page and tracking are cleared; or cost per lead above 2x target on 30 conversions; or under 1,000 impressions a week for three weeks, which is a merge into its sibling intent, not a kill (repo `stag.md`).
- **Winners fund the bench by month 3.** Before any new money, move budget from campaigns above target cost per lead to campaigns under target that are losing impression share to budget (c, Adalysis).

---

## When to raise budget

All of these, on the same campaign, at the same time:

- Cost per lead at or under target on 30 or more conversions in 30 days (a)
- Bid strategy not in Learning (a)
- Tracking gap under about 10% between platform and CRM; browser-only tags lose 15-20% (c)
- Search lost impression share (budget) above about 10% and higher than lost impression share (rank) (c). Thresholds in the wild: 0-15% fine, 20-25% concerning, above 50% a pacing problem. Non-brand impression share above 80% is "excellent" and plenty of profitable accounts sit at 10-30% (c, Adalysis).
- On Maximize Conversions the campaign is "limited by budget by design" and Google says to use the budget simulator, not the lost-to-budget figure (a). The metric means more once a target is set.

**The step:** 20% maximum per move, 7-14 days between moves, one campaign at a time (c, near-unanimous across North Country, Opascope, LaunchCodex, Big Flare, Adalysis; r/googleads ranges from 15% every 3-4 days to 30% every 2-3 weeks). Doubling a budget this way takes 5-8 weeks. The API's own LEARNING_BUDGET_CHANGE status is the closest thing to official confirmation that a big move restarts learning (a, confirm in the v25 reference).

**The read after each step:** cost per lead at 14 days. Incremental spend flows to lower-intent queries, so some drift is normal (c): cost per click up 10-20% is expected, 50% is a problem; if a doubling-equivalent raises cost per lead more than 30% the campaign is saturated - roll back one step and scale horizontally instead (c). Past 80-90% impression share, cost rises and quality falls (c). Optmyzr's Q1 2026 read across 21,425 accounts: impressions down 11% year on year, so the pool itself shrank (b)[V].

**The budget-opportunity sum** when the owner asks "how much more": missed impressions = impressions ÷ impression share x lost (budget); x click-through = missed clicks; x cost per click = the extra spend that funds the campaign fully. Three months of data minimum (c).

---

## When NOT to raise budget

- **Lost to rank exceeds lost to budget.** Fix assets, ad relevance and the page; raise bids last (c). Money does not fix rank.
- **Cost per lead above target.** More money buys more of the same problem. Run `/search-terms` and `/ad-tests` first (c).
- **Under 30 conversions.** No target yet, no raise yet (a). Under 15 across the account: consolidate (a, Google 2026).
- **In Learning.** Do not measure, do not change (a).
- **Tracking gap above 10-15%.** Scaling amplifies whatever is broken (c).
- **Structure fragmented.** 20-40 campaigns where 6-10 would do; consolidate before spending (c).
- **A target and a budget in the same fortnight.** Two learning clocks at once, no readable result (c).

---

## Bidding as the account scales

- Maximize Conversions with no target to 30 conversions in 30 days. Optmyzr's 14,584-account study had no-target beating with-target on cost per lead (b)[V].
- Target cost per lead at 30 conversions, set 5-20% above the actual 30-day figure (a for the 30, c for the margin), stepped down about 10% at a time with a week between steps (c).
- Split campaigns share a portfolio strategy until each clears 30 on its own (a).
- **From 17 August 2026 the target is the price, not a ceiling.** Budget-limited target campaigns now deliver toward the target instead of beating it (a, Google via SEJ and Optmyzr). A campaign that was landing $35 leads on a $50 target will drift to $50. Reset every target to the cost per lead the owner actually wants, and give a campaign that was overperforming either a lower target or more budget - not both in one week.
- Value-based bidding is the next rung once booked jobs flow back by offline import; a home-services case scaled 30% while holding return (c).

---

## The expansion order once budget alone stops working

Vertical first, horizontal second, PMax last. Every practitioner list agrees on the order (c).

1. More budget on the winners, per the rules above.
2. More keywords inside the proven groups, from the search-terms report.
3. Wider match type - broad only with Smart Bidding (a), past 30-50 conversions a month and a mature negative list (c). Exact beat broad on cost per lead in 73.84% of accounts in 2024 (b); in 2026 lead gen, phrase carries the most spend and conversions and broad's efficiency gap widens without value signals (b)[V]. Never at $15-30 clicks without weekly review (c).
4. New intents and services - the bench.
5. New geos - a city earns its own campaign only for its own budget, number or cost per lead, and about 30 conversions a month on its own (c). Bid adjustments and location insertion before that (repo `stag.md`).
6. Performance Max as a layer, never the engine. Search wins the overlap 84% of the time on conversion rate in Adalysis data and in Optmyzr's 5,768-campaign set Search beat PMax on conversion rate 18.91% to 6.17% with no difference 74.92% (b). The 24,702-campaign sweet spot is 10-25% of budget and 60+ conversions a month (b)[V]. Only with offline conversions flowing, brand excluded, campaign negatives on (c).
7. AI Max as an opt-in layer on a Search campaign with 30-50 conversions a month, a six-week controlled test, text customization checked line by line (c). It treats every keyword as broad (c, Adalysis 2026).

---

## The status read - what `status` pulls from the live account

One GAQL pass, last 30 days, printed as blocks per campaign and per ad group (a for the fields):

- Enabled versus paused: `campaign.status`, `ad_group.status`
- Spend and results: `metrics.cost_micros`, `metrics.conversions`, `metrics.cost_per_conversion`, `metrics.clicks`, `metrics.impressions`
- Room to grow: `metrics.search_impression_share`, `metrics.search_rank_lost_impression_share` (campaign and ad group); `metrics.search_budget_lost_impression_share` (campaign only)
- The clock: `campaign.bidding_strategy_system_status` - any LEARNING_* value prints as a blocker; LIMITED_BY_BUDGET prints with the lost-to-budget figure beside it
- Budget: `campaign_budget.amount_micros` ÷ 1,000,000, with the 30.4x monthly cap spelled out

Confirm the impression-share field levels against the v25 reference before wiring; the reference page did not render during this research.

What the read decides, per group: **Graduated** (four checks passed) · **Under test** (enabled, clicks below the read floor) · **Bench** (built, paused) · **Failed out** (kill criteria met) · **Blocked** (Learning, tracking gap, or zero conversions on 100+ clicks). Every budget or target change is logged with its date so the learning clock is auditable.

---

## What changed 2024-2026

- **5 June 2025:** per-asset conversion data begins (`ad-testing.md`).
- **2025:** Performance Max gets campaign-level negatives (up to 10,000) and channel reporting (b)[V].
- **12 February 2026:** Google's structure benchmark is 15 conversions in 30 days, poolable by portfolio and shared budgets; "consolidation is not necessarily the goal itself" (a).
- **April 2026:** AI Max out of beta; Dynamic Search Ads migrating into it; text customization on by default with AI Max, force-upgrading September 2026 (c, a).
- **May 2026:** Optmyzr's 30,000-account match-type read - phrase is the lead-gen workhorse (b)[V]. Q1 2026 impressions down 11% year on year (b)[V].
- **17 August 2026:** budget-limited target campaigns deliver toward the target instead of beating it, Search included (a).
- **August 2026:** Local Services Ads migrate into Google Ads as Performance Max pay-per-lead campaigns, US home services first; weekly budget ÷ 7 becomes daily; manual cost-per-lead bidding removed; historical reports not carried - export them first (a).
- **September 2026:** multi-campaign budget and target experiments; Performance Planner one-click apply (a).

---

## Myths that still circulate

1. "Raise budget whenever Google says Limited by budget" - the flag can mean under 3% lost, and on Maximize Conversions it is on by design (a, c).
2. "Lost to budget means you need more money" - only if lost to rank is lower and cost per lead is at target (c).
3. "Doubling budget doubles leads" - only while impression share is low; past saturation cost per lead jumps more than 30% (c).
4. "Budget changes don't reset learning" - the API carries a LEARNING_BUDGET_CHANGE status; cap moves at about 20% (a, c).
5. "Set a low target to force cheap leads" - too low forgoes conversions (a), and since 17 August 2026 the target is what you get (a).
6. "More ad groups means more testing" - 208 ad groups on a fixed budget was the failure; the floor is per strategy, not per group (c, b).
7. "Broad match is the scaling lever for local" - phrase carries lead gen in 2026 (b).
8. "PMax should replace Search for lead gen" - Search wins the overlap and PMax caps at 10-25% of budget (b).
9. "LSAs are a separate weekly channel" - from August 2026 they are a PMax pay-per-lead campaign on a daily budget (a).
10. "Google wants everything in one campaign" - split on real budget, target or geo differences (a).
11. "Seasonality adjustments are for the busy season" - short spikes of days only, never a budget lever (c, Google's page could not be fetched this run - verify).
12. "A copied ad group inherits its verdict" - composition change restarts learning and the ad test starts at zero (a, repo).

---

## The rules the command enforces

**Budget fit**
1. Daily = monthly ÷ 30.4; print the 2x daily and 30.4x monthly caps on every budget line. (a)
2. Groups under test = (monthly budget ÷ cost per click) ÷ 200, rounded down, minimum one; if under one, say so and show the budget that reaches one. (c, derived)
3. Recommend no more groups under test than the math allows; the rest stay paused until the owner enables them. The command never pauses or enables anything, and `keyword-list.md` order is build priority only - it never dictates status. (c, Jono 2026-09-01)

**The gate**
4. Search terms trimmed, four weekly passes, cross-group negatives in place. (repo)
5. Ad test called at about 100 clicks, 80% confidence, 7 days minimum, on cost per conversion. (repo ruling)
6. Cost per lead at target on 30 or more conversions in 30 days. (a)
7. Landing page A/B called on conversion rate. (c)
8. Zero conversions on 100+ clicks routes to page and tracking, never to money or groups. (c)

**Stamping**
9. Carry settings, strategy type, RSA skeleton, page blueprint, universal negatives, proof. (c)
10. Re-earn keywords, service negatives, the ad verdict, the page rate, the target, Quality Score. (a, c)
10a. Every stamped group gets the FULL `/write-ads` flow: its own ~100-headline library, all three gates with the 30-survivor floor, 2 RSAs, and the complete asset set created on the ad group. (repo, Jono 2026-09-01)
10b. Every stamped group gets its own landing page, built AND published live via `/publish` in the same run, before its ads are created - the ad's final URL is the live domain, never localhost, never a home-page placeholder. (repo, Jono 2026-09-01)
10c. Every stamped group's tracking is hooked up and its webhook VERIFIED: a test lead submitted through the new page and confirmed arrived in the CRM, named. A 200 on the page is not verification. Nothing on an unverified page gets enabled. (repo, Jono 2026-09-01)
11. Stamp in waves; no target or budget change in the same week as a wave. (a, c)
12. One search, one ad group: trigger words negated across groups; identical keywords in two campaigns refused. (a)
13. Everything lands paused; the owner enables. (repo)

**Bench**
14. Activate a bench group only when an enabled group graduates or fails out. (c)
15. Fail-out: 100+ clicks and zero conversions after page and tracking are cleared; cost per lead above 2x target on 30 conversions; under 1,000 impressions a week for three weeks merges, never kills. (c)
16. Reallocate from above-target to below-target campaigns losing share to budget before adding money. (c)

**Raising budget**
17. Raise only when at target, 30+ conversions, not in Learning, tracking gap under 10%, lost to budget above 10% and above lost to rank. (a, c)
18. 20% per step, 7-14 days between, one campaign at a time. (c)
19. On Maximize Conversions, read the budget simulator, not lost to budget. (a)
20. Read cost per lead at 14 days; more than a 30% rise on a doubling-equivalent rolls back one step. (c)
21. Never a budget move and a target move inside the same 14 days. (c)

**Not raising**
22. Lost to rank above lost to budget: assets, relevance, page; bids last. (c)
23. Cost per lead above target: no new money. (c)
24. Under 15 conversions in 30 days across the account: consolidate. (a)

**Bidding**
25. Maximize Conversions, no target, to 30; then target 5-20% above actual; step down about 10% a week. (a, c)
26. Split campaigns share a portfolio until each clears 30. (a)
27. Targets are the price from 17 August 2026: set what you want, not a ceiling. (a)

**Expansion**
28. Vertical before horizontal: budget, keywords, match type, intents, geos, then PMax. (c)
29. Broad only past 30-50 conversions a month with Smart Bidding and a mature negative list; phrase stays the default. (a, b)
30. PMax at 10-25% of budget, offline conversions on, brand excluded, never before Search is saturated. (b, c)
31. A geo earns its own campaign only for its own budget, number or cost per lead, at about 30 conversions a month. (c)

**Status**
32. `status` prints enabled versus paused, 30-day spend, conversions, cost per lead, impression share, lost to budget and to rank, and bidding system status; any Learning state is a blocker. (a)
33. Every change is logged with its date. (c)
