# What to audit in a Google Ads account
Researched August 2026 across about 60 sources, revised 28 August 2026 against 61 more · seven tiers, worked in order
Next: run Tier 0. If conversion tracking is broken, report that and stop.

Read this before running `/audit`. Findings are ranked by dollars recoverable, never by category.

## How every claim in this file is graded

Every claim carries a grade. Keep the grade when you quote the claim.

**(a)** Official Google documentation.
**(b)** A study with a stated sample size.
**(c)** Practitioner opinion or convention.
**[V]** Published by a company selling the thing the claim supports.

**The standard:** grade findings on mechanism - does this ad serve, does this URL work, is this setting wrong - not on contested performance percentages. Almost every number in this space comes from a vendor. Where a figure is load-bearing and unverifiable, this file says so, and the audit should too.

**"Not re-verified 28 Aug 2026"** marks a claim carried forward from the previous revision that this pass could not reach. Quote it with that caveat or verify it first.

---

## The eight things the audit reads - the labels the report uses

The course teaches the audit as eight reads. The tiers below are the working order; the report groups every finding under one of these eight names so the file matches the video.

1. **Keywords that never converted** - Tier 2.4
2. **Search terms that never convert** (the biggest leak) - Tier 2.1, bounded by Tier 0.2
3. **Hours that lose money** - Tier 2, dayparts
4. **Calls not being counted** - Tier 0.1
5. **Broad match quietly on** - Tier 1 and Tier 4.4
6. **Spend outside the service area** - Tier 2.2
7. **Google auto-applying its own changes** - Tier 1, autopilot
8. **Search Partners and Display bleed** - Tier 2.3

Reads 4, 5 and 7 are settings, not dollars: flagged, never priced. The other five carry a Tier 2.5 price tag.

---

## TIER 0 - Check these first, they bound everything else

Two checks decide how much the rest of the audit can be trusted. Run them before anything.

### 0.1 Is conversion tracking telling the truth?

If tracking is wrong, every cost per acquisition in the account is fiction and Smart Bidding has been optimising toward garbage. Nothing else in this file matters until this passes. Every 2025-2026 audit framework read for this revision opens here, and Brad Geddes ranks inconsistent conversion tracking the number one Google Ads mistake of 2026 **(c)**.

**Conversion actions with zero conversions in 30 days while campaigns spend**
Wrong when any primary action is dead. Smart Bidding is bidding on a dead signal. Also wrong when the action status is anything other than Recording.

**Conversion rate against the category benchmark**
Wrong when above 25-30% for a local service. Almost always page views or button clicks being counted as conversions.

**Google conversions against the client's actual booked jobs**
Wrong when the variance is over 15% either way. Roughly double Google versus the CRM means double counting. Google far below the CRM means missing tracking.

**The same action counted twice**
Wrong when a web tag and a GA4 import are both set as primary for the goal. This is the single most common double-count. Set the GA4 import to secondary.

**Why the GA4 import is never the primary, even on its own (c).** GA4 attributes across every channel while Google Ads attributes to Ads clicks only, so the imported count is always lower and shifts credit away from paid. GA4 posts on the event date, Ads on the click date, which is the date Smart Bidding expects. Safari expires JavaScript-set cookies at seven days, so an eight-day lead becomes "direct" in GA4 while the native tag still recovers it through the click ID. Šutarík, 30 July 2026.

**Counting type on a lead action**
Wrong when a form or call is set to Every. Google's own guidance is One for leads, Every for sales **(a)**. Lead actions on Every count page refreshes as leads.

**Junk actions promoted to primary**
Wrong when the category is page view, download or engagement. Smart Bidding chases the cheapest action and traffic shifts to people who scroll and bounce.

**Call conversions triple-counted**
Wrong when ad call, website call and click-to-call are all primary. One phone call recorded three times. The duration threshold is set per action **(a)**; the practitioner screen is 45-60 seconds **(c)**, but this repo's ruling is 1 second - any connected call counts (see `conversion-tracking.md`), so a 1-second setting is correct, not a finding.

**Conversion window against the real sales cycle**
Wrong when an emergency trade sits on 90 days, or a roofer sits on the 30-day default. The default click-through window is 30 days and the allowed range is 1 to 90 **(a)**. Run the Time Lag report. Windows are prospective only - changing one never recounts history **(a)**.

**Enhanced Conversions**
Wrong when off, or on but unverified in the Diagnostics tab. Report the match rate; the "40% and above is healthy" floor is practitioner convention **(c)**, Google publishes no number. For lead gen the click ID (GCLID, GBRAID, WBRAID) must be captured at the form and stored with the lead in the CRM, or offline conversions can never be matched **(c)**.

**Consent mode, where any traffic is EEA or UK**
Wrong when any of the four signals is missing: ad_storage, analytics_storage, ad_user_data, ad_personalization **(a)**. Conversion modelling needs 700 ad clicks over 7 days per country and domain grouping plus a correct consent mode or TCF v2.0 implementation before it starts **(a)**. Below that, promise nothing.

**The trap most auditors miss (a).** A conversion action marked primary for the goal does not on its own tell you what a campaign bids toward. Resolve the whole chain: the goal config level on `ConversionGoalCampaignConfig`, then `CampaignConversionGoal` where biddable is true, then `CustomConversionGoal` members. A secondary action inside a custom goal IS used for bidding.

**Say out loud what the API cannot see.** GTM double-firing, Conversion Linker presence, click ID survival through redirects and cross-domain hops, and consent state after the banner. Those need a tag pass with Tag Assistant on the live site.

### 0.2 How much of the search terms report can you even see?

**About 40-51% of search-term spend is hidden** behind Google's privacy thresholds, with per-account ranges reported from 10% to 85%.

Graded **(b)** for the largest measurement: Slattery/Taikun, $20M spend, 14M clicks, 933 campaigns, July 2025. The methodology was not published, so treat the headline "$0.85 per dollar" framing as the author's, not a result. Graded **(a)** for Google confirming thresholds exist and are privacy-driven: a term is reported only when it "meets sufficient search volume across all Google searches", and the threshold increase was "solely privacy-driven" (Ginny Marvin, July 2025). A single-campaign check by Marlin SEM the same month found 51% of clicks hidden **(b, one campaign)**.

**Smart Bidding is not blind where you are (a).** Marvin's statement: bidding does not depend on whether a query clears the reporting threshold. So the hidden share is a limit on YOUR negatives, not on the algorithm. Say that to the owner, it changes the recommendation.

**Compute it:** keyword-level clicks minus the sum of search-term-view clicks, per campaign. Report the hidden share as a finding in its own right.

**If the hidden share is over 40%, downgrade confidence in every negative-keyword conclusion below.** Shift weight to n-gram analysis and match-type restriction, which act on traffic you cannot see. Any audit implying the search terms report shows you everything is teaching a 2019 workflow.

---

## TIER 1 - Settings faults: binary, official, fix unconditionally

These need no data to justify. The setting is either right or wrong.

**Display Network on a Search campaign**
Wrong when `network_settings.target_content_network` is true on a Search campaign. No legitimate reason for a local service.

**Location targeting**
Wrong when `geo_target_type_setting.positive_geo_target_type` is presence-or-interest on a local business. Google confirms this is the default **(a)**. It should be presence. Do not attach a "saves 12-25%" figure to this: every such number in circulation is unsourced **(c)**. Price it from the account's own area-of-interest rows in Tier 2.2.

**Bid strategy misconfiguration**
Wrong on any misconfigured `campaign.bidding_strategy_system_status`. It means the campaign shares a budget with campaigns not all on the same portfolio strategy. A hard error, not an opinion **(a)**.

**Dead bid modifiers under automation**
Wrong when any `bid_modifier` on ad schedule, location, user list, age range or gender is not 1.0 while the campaign runs target CPA, target ROAS, Maximise Conversions or Maximise Clicks. Google's compatibility chart marks all of these as not supported under every automated strategy **(a)**. Device is the one exception: under target CPA and Maximise Conversions only a -100% exclusion applies; under target ROAS a device adjustment is treated as a target adjustment, not a bid **(a)**.

**Language targeting**
Wrong when a language campaign criterion is not explicitly set on an English-only business. Do NOT assert that "All languages is the default" - Google's doc does not say it and it is unverified.

**Settings drift between campaigns**
Wrong when campaigns in the same account disagree on excluded locations, ad schedule, networks or bid strategy family without a stated reason. Campaigns built years apart drift, and nobody notices until the audit lines them up **(c)** Geddes, January 2026.

**Ad groups with zero enabled ads**
Wrong on any. Silent zero-serve: the keywords look enabled and no impressions are possible.

**Disapproved and limited ads**
Wrong when the ad's policy approval status is disapproved, and especially approved-limited or area-of-interest-only, which serve quietly restricted.

**Broken final URLs**
Wrong when a final URL returns a 404 or 5xx, redirects cross-domain, or is plain http. Burns 100% of that ad's spend.

**Expired promotion assets still enabled**
Wrong when the promotion end date is in the past. Worse than having none.

**Negative list not attached**
Wrong when a shared negative list exists and a spending Search campaign is not in `campaign_shared_set` for it. The list protects nothing it is not attached to **(a mechanism)**.

**Orphan budgets and unshared intent**
Wrong when a shared budget has `reference_count` of one (it is not sharing anything, it is hiding a setting), or when campaigns with divergent cost per acquisition share one budget. Unshare before diagnosing budget in Tier 3.

**On dead bid modifiers, report honestly.** They cost nothing directly because Google ignores them. The real cost is diagnostic: the owner believes a lever is working that isn't. Call it cleanup, not recovered spend.

### Autopilot - now readable from the API, still confirm on screen

**Auto-apply recommendations are opt-in (a).** Google's doc shows nothing enabled by default and a History tab records who enrolled and when. "Google enables them by default" is an unverified practitioner claim - do not repeat it. What IS true is that the two bundles (Maintain your ads, Grow your business) enrol many types at once, and the dangerous ones sit under Keywords and Targeting, including one that silently re-enables Search Partners and Display expansion. That is how Tier 1 faults come back after you fix them **(a)**.

**Read it from the API, then verify on screen.** `recommendation_subscription` lists every enrolled type. `change_event` filtered to `client_type = GOOGLE_ADS_RECOMMENDATIONS_SUBSCRIPTION` lists every change auto-apply actually made, 30 days back **(a)**. Report both: what is switched on, and what it has already done. Recommend every box off; Jyll Saskin Gales (December 2025) and Brad Geddes (January 2026) both land there, and Optmyzr's PMax study found auto-apply stripping the exact keywords that protect Search from PMax **(c)**.

**Text customization and AI Max (a).** "Automatically created assets" no longer exists as a name: from 27 May 2025 legacy ACA campaigns upgraded into "text customization" inside the AI Max panel. Text customization is opt-in. Turning on AI Max turns on all three parts - search term matching, text customization, final URL expansion - and each can be turned off individually. Turning off text customization also turns off final URL expansion. Once the legacy ACA setting is off it can never be re-enabled. Report the state of all three parts, per campaign, as separate lines.

**Two AI Max side effects to say before recommending it off (a).** Negative keywords are respected under AI Max. But turning AI Max off disables brand exclusions on that campaign, and pinned assets can be overridden while it is on.

---

## TIER 2 - Wasted spend, ranked by recoverable dollars

### 2.1 Zero-conversion search terms

Floor before negating: **the greater of $50 or 3x target cost per acquisition, AND at least n_min clicks from Tier 2.5.** The $50 and the 3x are practitioner **(c)**; the click gate is derived from the account's own conversion rate. Terms with 0-10 clicks are not decision-grade.

Honest ceiling: true waste recoverable by negatives is around **4-8% of spend in a well-managed account (c)**. If an audit claims 30-50% recoverable, either the account is a mess or the number is inflated.

**Do not quote a headline "X% wasted" figure.** The widely-repeated 20-40%, 76%, "18-27% typical", "one third leaks" and "94% of keywords produce zero conversions" numbers have no traceable primary source. Measure this account's own waste and report that.

### 2.2 Geo waste

Spend outside the service area, from the geographic report. Act on any location with **$200 or more in spend and zero conversions (c)**, and on any spend outside the target radius above 5% of total. Use `user_location_view` for where people physically were, and compare it against `geographic_view` to isolate the area-of-interest tax.

The commonly cited "presence-only targeting cuts cost per acquisition 23-38%" figures have no methodology. The setting is still a real fault; the quantification isn't evidenced.

### 2.3 Search Partners

Segment by ad network type. Act when Search Partners cost per acquisition is over 1.3x Search, or its conversion rate is under half of Search, across at least 500 Search Partners clicks.

Three things changed in 2025-2026.

**Parked domains were removed as a Search Partners surface on 10 February 2026 (a).** This retires the old "opt out because of parked domains" advice, and means any comparison data from before that date is contaminated.

**Google's uplift claim is conditional (a).** December 2025: 11% more conversions with volume-focused Smart Bidding, 7% more conversion value with value-focused, for campaigns with 5% or more of spend on Search Partners. The general help page on search partners makes no performance claim at all. So quote the 11% only where the 5% condition holds, and never on a campaign that is budget-capped - the previous revision's reading that the claim is scoped to budget-unconstrained campaigns stands but is not re-verified 28 Aug 2026.

**Placement and invalid-click visibility exist now (a).** Full placement reporting for Search since August 2025 and an Invalid Activity Credit report with adjusted metrics since April 2026. Pull both before judging the network; "we can't see where it serves" is no longer true.

### 2.4 Dead keywords

Cost of at least 5x target cost per acquisition with zero conversions over 180 days. Under that it is noise. Check the system serving status for rarely-served.

Cross-check against Optmyzr's June 2025 rule **(c)[V]**: 2-3x target cost per acquisition in spend for direct response, 4-5x for long cycles, and only after checking match type, search terms, ad copy and the offer. Both rules approximate the n_min floor in Tier 2.5; at a 1% conversion rate the spend rules fire too early, at 10% they fire late. Use n_min as the gate and the spend multiple as the tie-break.

### 2.5 Brand cannibalisation

Google's own meta-analysis of **390 search-ad pause studies** found only **about 50% of ad clicks were incremental when the advertiser already held the top organic result**, against 82% at ranks two to four and 96% below rank four. Graded **(b) reported secondhand** - verify the primary paper before quoting it to a client.

Flag brand spend above 15% of the account where the business ranks first organically and Auction Insights shows no competitor bidding. **Test with a geo holdout, don't just cut.**

---

## TIER 2.5 - Putting a dollar on every leak

Researched August 2026. This is the half of the audit that turns findings into a number the owner
feels. Everything above tells you what is broken. This tells you what it costs, and how to say it
so it survives being argued with.

### The headline is MONEY AT RISK, not proven waste

**Proven waste alone is the wrong headline and it makes a clean account look like a broken audit.**
A real run on a 10% conversion-rate account returned "$7.01 of proven waste" while $1,368 a month was
being bid blind and $1,602 was landing on pages that did not repeat the ad. The maths was right. The
headline was useless. (Jono, 31 August 2026)

**Lead with MONEY AT RISK - the sum of four components, each labelled with its own confidence:**

| Component | What it is | Confidence |
|---|---|---|
| Proven waste | Counted spend that got a fair test and returned nothing | Counted fact |
| Blind spend | Spend optimised against a signal that cannot see a whole lead type (calls uncounted, conversions missing) | Assumption, and the assumption is stated |
| Mismatched spend | Spend landing on a page that does not repeat the ad's promise | Counted spend, judged fault |
| Capped opportunity | Leads not bought because a campaign beating target cost per lead ran out of budget | Modelled, from Google's own lost-impression-share |

Show the total big, then the four components as one line each with the confidence beside them. **Never
merge them into one undifferentiated number** - that is how an audit gets torn apart on the call. And
never inflate proven waste to make the headline bigger: if proven waste is $7, it says $7, sitting
inside a total that tells the truth about the account.

**A clean account is a finding, not a failure.** When nothing clears the significance bar, say so
plainly - "there is no junk pile here, your problem is elsewhere" - and let the other three components
carry the report.

### The split that makes each number defensible

Report **every component with its own confidence label, never one merged number**. This is the single
highest-leverage credibility move in the whole deliverable.

**PROVEN WASTE - a counted fact.**
Money already spent on targets that got a fair test and returned nothing. Reproducible: anyone
re-running the query gets the same answer. This number does not need a projection or an
assumption, which is exactly why it carries the audit.

```
Proven waste = SUM of spend where
                 clicks >= n_min
                 AND conversions = 0
                 AND the window excludes the trailing 7 days
```

**RECOVERABLE SPEND - an upper-bound estimate.**
Money on targets that DO convert, but above the target cost per acquisition. Real, but a
projection. Label it as one, every time.

Say the honest ceiling out loud: **you will not fix 100% of waste. 60-70% is realistic.** Saying
that raises credibility, it does not lower it.

### How many clicks before zero conversions means anything

Do not use a flat 100 clicks. Derive it from the account's own conversion rate:

```
n_min = ln(0.05) / ln(1 - account_conversion_rate)
```

That is the click count at which "zero conversions" has under a 5% chance of being luck.
At 1% conversion rate that is 299 clicks. At 3% it is 98 - which is where the folk "100 clicks"
rule comes from. At 10% it is 29. An account at 1% conversion rate flagged on 100 clicks is
generating false positives, and the owner will find one and discard the whole report.

### The monthly-recovery shape

Every finding converts to dollars per month the same way:

```
$/month = (recoverable spend in the window) x (30 / lookback_days) x (recovery_rate)
```

`recovery_rate` is below 1.0 because suppressed spend partly reallocates rather than disappearing.
These haircuts are a synthesis, not a sourced constant **(c)** - they exist so the model does not
produce a number that collapses under scrutiny. Tune them once real before/after data exists.

- **Zero-conversion search terms · recovery rate 0.85** - some negated volume re-matches to a better keyword
- **Dead keywords, budget NOT capped · 0.90** - genuinely stops being spent
- **Dead keywords, budget capped · 0.70** - money returns to the pool and gets re-spent
- **Daypart and schedule waste · 0.60** - demand shifts into adjacent hours
- **Geo waste, outside the service area · 0.90** - close to pure elimination
- **Search Partners and Display on a Search campaign · 1.00** - switch it off, the spend is gone

**Order matters: evaluate budget caps BEFORE dead keywords.** If lost impression share to budget is
over 10%, pausing a wasteful keyword recovers nothing - it re-spends. The recovery is the cost per
acquisition differential on reallocated spend, not the spend itself.

### Per-finding formulas

**Zero-conversion search terms and n-grams**
`SUM(cost of flagged terms) x (30/L) x 0.85`. De-duplicate n-grams against term-level findings or
you will count the same click twice.

**Non-converting keywords**
`SUM(spend on flagged keywords) x (30/L) x recovery_rate` using the budget-cap table above.

**Non-converting geography**
`SUM(cost where conversions = 0 AND clicks >= 50) x (30/L) x 0.90`, plus 100% of any spend
attributed to area-of-interest rows on a presence-only business.

**Device**
`device_spend x (30/L) x (1 - device_CVR / blended_CVR)`. That is the share of the device's spend
buying below-average outcomes. Under Smart Bidding the only actionable output is a full exclusion,
because modifiers other than -100% are ignored.

**Dayparts**
`SUM(spend in flagged cells) x (30/L) x 0.60`. 168 hour-of-week cells needs 90 days. Under about
5,000 account clicks in the window, collapse to 7 day-of-week cells instead or you are reading noise.

**Search Partners / Display expansion**
`network_spend x (30/L) x (1 - network_CVR / search_CVR)`. Resolves to roughly the whole network
spend when its conversion rate is zero.

**Brand and non-brand mixed in one campaign**
Back-solve what the non-brand half is really running at:
`blended_target = (brand_share x brand_CPA) + (nonbrand_share x nonbrand_CPA)`
A "$40 blended cost per acquisition" hiding $8 brand and $95 non-brand means the non-brand half is
2.4x over target and nobody could see it.

**Budget-capped winners - an OPPORTUNITY, not a recovery. Report it in its own column.**
```
available_impressions = impressions / search_impression_share
lost_to_budget        = available_impressions x search_budget_lost_impression_share
missed_clicks         = lost_to_budget x CTR
missed_conversions    = missed_clicks x CVR x 0.7    <- diminishing-returns haircut
extra_spend           = missed_clicks x CPC
monthly_opportunity   = (missed_conversions x value_per_conversion) - extra_spend
```
The 0.7 is there because incremental impressions are lower quality than the ones already won.

**Broken conversion tracking - price it as blind spend, not as a conversion-rate gain.**
`monthly_spend x W`, where W is the share of budget allocated with no usable feedback signal.
Practitioner range **(c)**: 0.20-0.40 for a previously-manual account, 0.50+ for Smart Bidding
running on a dead signal. Use **0.30** as the conservative default and present it as a range.

**Conversion double-counting - a restatement multiplier, not a line item.**
```
inflation = reported_conversions / verified_conversions (CRM)
true_CPA  = reported_CPA x inflation
```
Run this FIRST. At an inflation factor of 2, a lot of "profitable" campaigns become findings. It
changes every other number in the audit rather than adding to the total.

**Missing call tracking - usually the biggest single number for a service business.**
```
p = share of true leads arriving by phone (0.4-0.7 for service; default 0.5)
invisible_leads   = tracked_form_leads x p/(1-p)
invisible_revenue = invisible_leads x call_close_rate x average_job_value
misoptimised      = monthly_spend x p
```
That last line is the one to say out loud: **that share of the budget is being judged on a signal
that cannot see the leads.**

**Homepage instead of a matched landing page**
`clicks x CVR x (uplift - 1) x close_rate x value`. Use the client's own best matched page versus
homepage gap where it exists. Where it does not, model 1.3x-2x and **state the assumption on the
slide**.

**Slow speed to lead**
`clicks x CVR x close_rate x (multiplier - 1) x value`, multiplier 1.5-3. Do NOT use 21x on
revenue - see the citation warning below.

**Unrated junk LSA leads - free money nobody claims**
`bad_leads_per_month x cost_per_lead x credit_rate`. Agencies report a low credit rate (~20%,
single-source **(c)**), but an account rating nothing is both losing credits and starving the
model that filters future junk. One of the fastest wins in a local audit.

### Three rules that stop the number collapsing

**1. Never multiply the deltas together.** Message match, page speed and form length all move the
same conversion rate. Stacking them invents a fantasy number. Take the largest single lever at
100%, the next at 50%, the third at 25%.

**2. Assign every click to exactly one category.** A single wasted click can appear under
irrelevant search term, broad match, non-converting keyword and auto-applied recommendation at the
same time. Pick one owner by priority - network/settings, then geo, then term, then keyword, then
strategy - and report the rest as root cause with $0 attached.

**3. Sanity ceiling: if the total claims more than about 35% of spend is recoverable, you have
double-counted.** Go back to rule 2. And never state a headline percentage borrowed from a blog -
measure this account and report that.

### Guards against the most common false positives

- **Assisted conversions.** Exclude anything where all-conversions is above zero while conversions
  is zero. A last-click-zero keyword can be the top of every path.
- **Conversion lag.** Always drop the trailing 3-7 days. For long-cycle work drop 30 and use
  conversions-by-conversion-date.
- **Seasonality.** Compare year over year, never month over month, before flagging a dead term.
- **Learning phase.** Suppress performance findings on any campaign with a bid strategy or target
  change in the trailing 14-21 days.
- **New entities.** Exclude anything with under 30 days of serving history.
- **Hidden search terms.** Never claim you reviewed 100% of search terms. Report visible coverage
  as `SUM(search_term_view cost) / campaign cost`. Under 60%, switch the recommendation from
  term-level negatives to match-type restructuring - you cannot negate what you cannot see.

### One number for negative-keyword health

**Lin-Rodnitzky ratio** = average cost per acquisition across all terms / average cost per
acquisition across converting terms only.

Under 1.5 = over-negated, you are choking growth. 1.5-2.0 = healthy. 2.0-3.0 = prune.
Over 3.0 = fail. Graded **(c)**, but it is a single defensible diagnostic and it catches
over-negation, which the "add more negatives" reflex never does.

### How to present it

- **Executive summary is slide 2, never slide 25.** It must survive being forwarded on its own to
  someone who will never see the rest.
- **Absolute dollars, not percentages.** "$4,180/month" beats "18% of spend."
- **Attach a dollar figure to each finding**, not just the total. The total is the headline, the
  line items are the proof.
- **Show the arithmetic and label every assumption as an assumption.**
- **Praise what is working.** An audit that finds only problems reads as a sales document.
- **Rank by dollars, then break ties on effort.** Do not group the output by category.
- Never end on "book a call" as the recommendation. Generic observations plus a call booking are
  the two reliable tells of a pitch audit.

### Citation warnings for this section

- **Speed to lead is NOT a Harvard study.** The 21x qualification figure is Oldroyd (MIT) via the
  Lead Response Management study - 6 companies, 15,000+ leads, 100,000+ call attempts, vendor
  published, ~20 years old **(b)[V]**. The separate HBR 2011 paper audited 2,241 companies and
  found a 42-hour average first response and 23% never responding. Anyone citing "Harvard: 21x" has
  merged two different studies.
- **"1 second delay = 7% fewer conversions" has no traceable methodology.** Use Portent's curve
  instead - ~100M pageviews, conversion rate 3.05% at 1s falling to 0.67% at 4s, and B2B lead gen
  is *more* speed-sensitive than ecommerce **(b)**.
- **"Fewer form fields always wins" is false.** CXL documents a test where cutting fields dropped
  conversions 14%. Recommend a test, not an unconditional cut. Baymard's defensible number: most
  flows need no more than 8 fields.
- **"Message match = 66% lift" is one agency case study**, not a benchmark.
- **The Quality Score to cost-per-click multiplier table is folklore** - 2009/2013 origin,
  correlational, and Google now states Quality Score is not an auction input. Already covered in
  Tier 4.5; do not reintroduce it here.

### Two LSA facts that are stale in most templates

- **"Google Guaranteed" no longer exists.** On 20 October 2025 Google consolidated Google
  Guaranteed, Google Screened and License Verified into one **"Google Verified"** badge, and
  **discontinued the money-back guarantee** **(a)**. Any deliverable using the old term reads as
  out of date to a client already running LSAs.
- **You can no longer "dispute" a bad lead.** The manual dispute button was removed in July 2024.
  It is now the **"Rate this lead"** flow, automated and ML-driven, with a **30-day window** from
  lead receipt **(a)**.

### Consent mode: the threshold that decides if modelling ever starts

Google requires **700 ad clicks over 7 days, per country and domain grouping**, plus correctly
implemented consent mode sending cookieless pings, before conversion modelling is even eligible
**(a)**. Below that, modelling will never activate - so do not promise recovered conversions.
The widely repeated "20%+ consent rate" threshold is **not a Google number (c)**.


---

## TIER 2.9 - The sections that report even when nothing is broken

Added 31 August 2026 after a live run reported "there is no junk pile here" and stopped. Every section
below runs on EVERY audit. A clean result is written out, never omitted.

### 2.9.1 The significance gate DEGRADES, it never silences

`n_min` decides whether zero conversions is meaningful. When nothing clears it, the section still
renders as a **watch list**:

- Take the top 10 search terms and top 10 keywords by spend with **zero conversions**, whatever their
  click count.
- Show spend, clicks, and `clicks / n_min` as "8 of 29 clicks" so the owner can see exactly how far
  off conclusive it is.
- Head the list **"Not yet conclusive - watch these"**, never "waste".
- Say the bar out loud: "at your 10.1% conversion rate a term needs 29 clicks with no lead before zero
  means anything rather than bad luck."

An owner who can see the watch list can act on their own judgement. An owner told "nothing to report"
cannot. (Jono, 31 August 2026)

### 2.9.2 Where the money actually went - always

A spend breakdown runs on every audit, three cuts, biggest first, with the share of total beside each:
**by campaign · by ad group · by location**. Add cost per lead per row and mark any row spending more
than 10% of the account with no conversions. Without this the owner cannot see where their money went,
which is the first question every one of them asks.

### 2.9.3 Ad performance - what the searcher actually did

Per ad group, report **CTR and conversion rate against the account average**, and name the outliers:

- Ads with CTR **more than 30% below** the account average, with their spend - these are losing the
  auction on relevance before anything else matters.
- Ads with CTR above average but conversion rate below - the ad is writing a cheque the page does not cash.
- Ad groups with only one ad running - no test is possible there.
- **State the account conversion rate and CTR as numbers**, and say whether each is high or low against
  the 2026 benchmark table in this file, with the caveat that benchmarks are a prompt to investigate,
  never a verdict.

### 2.9.4 What is WORKING - the read that has never existed

Every other read hunts for waste. This one finds the winners, because an owner cannot double down on
what they cannot see:

- The **top 5 keywords and top 5 search terms by conversions**, with cost per lead.
- The **best campaign by cost per lead**, and whether it is budget-capped (if it is, that is the single
  clearest "spend more here" recommendation in the whole audit).
- Any ad group beating the account cost per lead by more than 25%.
- One line naming what these have in common, if anything - match type, intent, city, page.

### 2.9.4b Everything is measured against the account average

Report the account cost per lead once, then express every row as a multiple of it. **1.5x worse or more is an outlier and is flagged; 0.7x or better is a winner.** Without the reference number a table of dollar figures is just a list, and the owner has to do the arithmetic that the audit exists to do.

**The trap this closes (Jono, 31 August 2026):** a "what is working" table ranked by conversion count listed a keyword at $63 a lead under "double down" while the account average was $43. It produced leads, so it looked like a winner; it cost half as much again as everything else, so scaling it would make the account worse. **Rank winners on efficiency, never on volume, and never label an above-average row "double down".** Volume without efficiency gets its own verdict: "not where the next dollar goes".

### 2.9.4c Campaign health is scored by category, never by a flag list

Seven categories, scored for EVERY campaign, every run: **budget · tracking · ads · assets · landing page · structure · settings.** Each is `ok`, `warn`, `bad`, or explicitly not-checked.

A free-text flag column ("budget capped, one ad only, Poor ads") is banned. It reads as complete when it is not, it hides which categories were clean, and it makes a campaign nobody checked look identical to a campaign that passed. The matrix makes an unchecked category visible as an absence. Under it, list the real issues per campaign, each tagged with its category and its monthly cost where one exists.

### 2.9.4d Is anything being split-tested?

An ad group with fewer than two enabled ads cannot test anything. Report how many ad groups are testing out of the total, name the single-ad groups with their spend, and note the oldest running test - a test past 60 days that has not been called is a decision nobody made. **If zero ad groups are testing, that is a headline finding**: nothing in the account is being learned, and Google has nothing to rotate.

### 2.9.5 The negative keyword starter list - always handed over

The audit never ends without a list the owner can actually use:

- Every search term flagged in 2.1, plus every term on the 2.9.1 watch list that is obviously
  off-intent (jobs, courses, DIY, free, salary, how to).
- Written **ready to paste**: one per line, with the match type and the level it belongs at
  (account-level for universal junk, campaign or ad group for category blocks).
- Anything ambiguous goes in a separate **"ask first"** block with the reason - never silently added.
- If the list is empty, say so and say why.

### 2.9.6 Quality Score - all three components, never the score

Google states Quality Score is a diagnostic and not an auction input, so the number is never the
finding. **Report all three components** per keyword, grouped: expected CTR, ad relevance, landing page
experience. A run that reports only landing page experience has done a third of the job. Count how many
rated keywords are "below average" on each, and name the worst ad groups.

### 2.9.6b Negatives already blocking keywords you bid on

**This failure is invisible in the UI: the blocked keyword shows Active with zero impressions.** Nothing warns you, and Google's own Recommendations check does not reliably scan shared lists. `/search-terms` runs a conflict check before ADDING a negative; nothing audits the negatives already in the account, which is where the damage already is.

Run `python3 code/find_negative_conflicts.py --customer <id>` every audit. It resolves scope properly - account level reaches everything, a shared list reaches only the campaigns it is attached to, campaign and ad group negatives reach only their own - and applies literal negative matching (negatives do not use close variants). It ranks by damage: keywords that CONVERTED and are now suppressed first, then the silently dead, then partial.

Report it even when clean, and state the limit out loud: it compares negatives against keyword TEXT. A negative can still block search terms a keyword would have matched, and only the search terms report shows that.

### 2.9.7 The Google Business Profile link

**Not previously checked anywhere in this file.** Flag it when the account has no linked Business
Profile: it is what switches on location assets and the Maps surface, and for a local service business
that is a whole surface missing. Check the linked-accounts state, and if GBP is linked, confirm the
auto-created "Clicks to call" and "Local actions" goals arrived as SECONDARY rather than primary -
Google creates them automatically and a primary one quietly reshapes bidding.

---

## TIER 3 - Structure and bidding

**Conversions per campaign per month**
Below 30 is fragmented. Below 25, all bid strategies were volatile in a 14,584-account study. Graded **(b)[V]** Optmyzr; the "30-50" convention has no primary Google source. Not re-verified 28 Aug 2026.

**Target CPA on too little volume**
Under 15 conversions in 30 days, move to Maximise Conversions or Manual CPC. Graded **(c)**. Google publishes no minimum and says target CPA works "for campaigns of all sizes" **(a)**.

**Target ROAS on lead gen**
Wrong when target ROAS runs with a default conversion value on every action. Mathematically identical to Maximise Conversions with an extra throttle. Act immediately.

**Maximise Clicks left running**
Wrong when the campaign has 30 or more conversions in 30 days and has run over 90 days. It is buying clicks, not customers.

**Broad match on the wrong bid strategy**
Wrong when broad match keywords run on Maximise Clicks, Manual CPC, or Maximise Conversions with no target. Broad match performs poorly without a target CPA or ROAS to constrain it **(c)** Geddes, January 2026; and the campaign-level broad match setting is only offered with conversion-based Smart Bidding **(a)**.

**Portfolio hiding a loser**
Wrong when the worst member's cost per acquisition is over 2x the best, with at least 20 conversions each. The blended target is met while one campaign runs at 3x.

**Shared budget**
Wrong when a budget is explicitly shared across campaigns with divergent cost per acquisition. **Unshare before diagnosing budget** - lost impression share to budget is uninterpretable until you do.

**Keywords per ad group**
One keyword at scale is SKAG debt. Target five to fifteen. Graded **(c)** consensus. Over 50 is the hard ceiling in every checklist read **(c)**.

**Duplicate keywords across campaigns**
Wrong when the same keyword and match type is active in two ad groups. Google picks one per auction, unpredictably, and there is no priority setting for Search **(c)**. One home per query.

⛔ **Never write "keywords bidding against each other" or "competing for the same auction".** It is factually wrong and Google says so directly: when several of your keywords could match one search, *"they don't compete with each other in the auction"* **(a)**. The real damage is that you cannot predict **which ad and which landing page** the searcher gets, and the performance data splits across every copy. Say that instead. See `references/keyword-redundancy.md`.

**Converting search terms not yet keywords**
Wrong when a search term has converted and is not an exact keyword anywhere. Without the exact keyword, PMax and AI Max outrank the Search campaign for that query, usually at a worse conversion rate **(c)** Geddes, backed by Optmyzr's 503-account overlap study **(b)[V]**.

**Ad groups under 1,000 impressions a week**
Consolidation candidate. Graded **(c)**.

**Change churn**
More than four bid-strategy or target changes in 90 days. Objective, and better than arguing about the 20% rule. The API's `change_event` reaches back 30 days only and caps at 10,000 rows a query **(a)**, so pair it with the UI change history for the 90-day view.

### 3.13 Remarketing and audience lists - the cheapest conversions nobody has

Wrong when the account has **no active remarketing list**, or lists that exist but sit under the serving
minimum. Most local accounts have none at all and nothing ever flags it. Search remarketing lists need
**1,000 members to serve** (a); Display 100. An All Visitors list at 30-90 days costs nothing to create
and is the cheapest traffic in the account.

Report three things: whether any list exists, whether it has enough members to serve, and whether any
campaign actually uses one (observation or targeting). A list that exists and is attached to nothing is
the same as no list. **(c)** practitioner convention on the value; **(a)** for the membership minimums.

### 3.14 Profitability, not just cost per lead

Read `context/business.md` "The economics". With average job value and close rate:

```
lead value        = job value x close rate
break-even CPL    = lead value
```

Then every cost per lead in the report becomes a verdict instead of a number: under target = good, between
target and break-even = thin, above break-even = **losing money on every lead**.

**If the economics block is empty or marked as a guess, say so and grade every profitability statement
`Assumed`.** Never substitute an industry average for a business's own job value - it is the one number
the owner knows cold, and getting it wrong ends the conversation.

### Impression share: the two numbers mean opposite things **(a)**

- **Lost impression share to budget over 10% on a campaign HITTING target cost per acquisition** - raise the budget. This is the one clean "spend more" recommendation in the whole audit.
- **Lost impression share to budget over 10% on a campaign MISSING target** - do NOT raise budget. Fix efficiency first.
- **Lost impression share to rank over 40%** - bids, ad relevance or landing page. Adding budget does nothing.

Lost impression share to budget is campaign-level only and is modelled, not measured. Google notes small fluctuations don't warrant action **(a)**. Search impression share plus lost to budget plus lost to rank comes to roughly 100%; if it does not, the row is mixing networks.

### Learning phase: what's official and what's folklore

**Official (a):** up to three weeks, or one to two conversion cycles. Four labelled triggers - new strategy, setting change, composition change, ad group target change. Manual CPC has no learning period. Google publishes no required conversion count, and says learning continues after the label disappears.

**Not official (c):** the "20% rule" - Google has never published a percentage, only "large changes." The "50 conversions to exit learning" figure is a Meta threshold that migrated into Google Ads discourse. Teach the mechanism, not the folklore.

---

## TIER 4 - Keywords, match types, negatives

### 4.1 Negatives do not expand - the silent gap **(a)**

Google's wording: "Negative keywords won't match to close variants or other expansions." Blocking broad `flowers` still serves on "flower." **Plurals and synonyms must each be added manually.**

**Misspellings and casing variants ARE auto-covered** since Google's announcement in June 2024 (one negative blocks its misspelling variants), so stop maintaining misspelling lists. Still scriptable: for every high-frequency negative, check the singular and plural pair exists.

Adding negatives from the search terms screen **defaults to exact match**, which blocks exactly one string. An account whose negatives are 90% or more exact has near-zero blocking power against broad traffic. Count them.

**Negatives still work under AI Max (a).** Google's FAQ states negative keywords are respected with AI Max on. Brand exclusions are the harder guardrail for AI Max traffic, and they switch off if AI Max is switched off.

### 4.2 Over-negation - negate irrelevance hard, performance softly

The largest available sample (**Optmyzr, 7,100 accounts, over 18,000 campaigns, Q4 2023**) found campaigns WITH account-level exclusions had a **worse median cost per acquisition ($21.45 against $18.55)** and effectively identical return on ad spend.

Graded **(b)[V]** - PMax not Search, correlational, vendor-published. But it is the best data that exists, and it runs directly against the industry's "add more negatives" reflex.

Mechanism: Smart Bidding already bids search terms down to pennies. A manual negative removes the term at ANY price, including the price at which it converts.

**Symptoms of over-negation:** lost impression share to rank rising while cost per acquisition is flat · Smart Bidding stuck in learning for weeks · adding negatives no longer improving cost per acquisition · negatives added on fewer than 10 clicks of data · a negative list never reviewed in 12 months or more. Geddes adds: lists over a decade old are common and silently block current keywords **(c)**.

**Do not cite** the "healthy accounts run 30-80 negatives" figure - vendor content, no sample, no method.

### 4.3 Conflicts and hygiene

- **Negative-versus-active-keyword conflicts are silent.** The keyword shows Active with zero impressions. Google's own Recommendations check does not reliably scan shared lists, so build this yourself from `ad_group_criterion`, `campaign_criterion`, and `shared_criterion` joined to `campaign_shared_set`, applying negative match-type logic.
- **Wrong-level negatives.** A term negated at campaign level to fix ad group A kills a converting keyword in ad group B. Account level is the highest-risk placement - reserve it for genuinely universal exclusions.
- **Malformed negatives.** Plus signs left over from modified broad are invalid and fail silently.
- **Low-volume exact negatives.** Thousands of query variations where one root term at phrase would do. Use n-grams to find the root.

### 4.4 Match types

Exact match no longer means exact **(a)**. Close variants include reordering, implied words and synonyms, and **there is no way to opt out.** You cannot audit an exact keyword by assuming its traffic matches it. Pull the actual terms and measure the drift.

**Broad match has been the default for new Search campaigns since July 2024 (a).** An account built after that date has broad match unless someone changed it. Google's stated uplift for broad match with Smart Bidding is 10% **(a)[V, Google's own]**.

What the samples say:
- Optmyzr, March 2024, 4,000+ accounts running both: exact beat broad on return on ad spend in 74.1% of accounts, median gap 100.59%, though narrower than the prior study **(b)[V]**.
- Optmyzr, November 2024, 992,028 keywords across 15,491 accounts, lead-gen slice: exact ROAS 415% and clickthrough 21.6%, phrase 314% and 11.4% **(b)[V]**.
- Optmyzr, February 2026, 30,000 accounts: phrase dominates lead gen on spend and conversion share, broad loses footing without conversion-value signals **(b)[V]**. Not re-verified 28 Aug 2026.
- Geddes, January 2026: exact "consistently remains the highest-converting match type for the vast majority of accounts" **(c)**.

Broad match is defensible only with all four of: solid conversion tracking, Smart Bidding with a target, a mature negative list, and real conversion volume. Missing any one, restrict to phrase.

Red flag: broad match over 40% of clicks on a campaign under 30 conversions a month.

**Performance Max and AI Max take the terms you did not keyword.** PMax has had campaign-level negatives since 23 January 2025 (limit raised to 10,000 on 11 March 2025), its own search terms report since March 2025, and both via the API plus campaign-level negative lists since 7 August 2025 **(a)**. So "PMax can't be controlled" is stale; audit its search terms exactly like a Search campaign.

### 4.5 Quality Score - report components, never the score **(a)**

Google states outright: "Quality Score is not an input in the ad auction. It's a diagnostic tool," and "should not be optimized or aggregated with the rest of your data."

So report which COMPONENT is Below Average and what that implies. Below Average ad relevance almost always means ad group bloat - disparate keywords in one group - which is a structural fix, not a copy fix.

**An audit that recommends "raise Quality Score from 5 to 8" is bad advice.** There is no official cost-per-click-per-point table; the widely-circulated one is 2013 data from a company that sold a Quality Score grading tool. Adalysis's own 2021 checklist still says "aim for seven or above" - treat that line as retired.

---

## TIER 5 - Ads and assets

**Responsive search ads per ad group**
Wrong when fewer than two. A second responsive search ad is worth **+6.6% conversions**, a third **+3.7%**. Graded **(a)** Google internal, no sample size published. Cap at three.

**Headlines and descriptions**
Wrong when a spending ad group has under 15 headlines or under 4 descriptions. Graded **(a)**, these are the limits.

**Fully-pinned responsive search ads**
Wrong when every position is pinned without a compliance reason. Google says pinning "isn't recommended for most advertisers" **(a)**. Partial pinning beat both full and none in a 268-account cut **(b)[V]**. Under AI Max, pins can be overridden anyway **(c reporting a)**.

**Sitelinks**
Wrong when under four at account level. Under two means **none serve at all**. Graded **(a)**. Six with descriptions now also feeds Ad Strength.

**Image assets**
Wrong when absent. Worth **+6% clickthrough (a)**. Gate first: the account must be 60 or more days old.

**Business logo and name**
Wrong when absent. Worth **+8% conversions (a)**. A near-universal gap and a trivial fix.

**Keyword in the ad**
Wrong when no headline contains the ad group's primary keyword. The only Ad Strength input with a plausible causal path to clickthrough.

**Ad Strength: fix Poor, ignore Excellent.** Google says it "isn't used to calculate Ad Rank, Quality Score, or auction wins" **(a)**.

The largest sample (**Optmyzr, over 22,000 accounts, over 1 million ads**) found **no correlation between Ad Strength and cost per acquisition or conversion rate** - clickthrough rises with it, conversion rate and cost per acquisition don't **(b)[V]**. Not re-verified 28 Aug 2026. Adalysis reports the same direction: lower Ad Strength ads converting better **(c)[V]**, Geddes, January 2026.

Poor genuinely means the ad is half-filled, so it is a real finding. "Good but not Excellent" is not a defect, and padding headlines to reach Excellent degrades the copy.

**The Low/Good/Best asset labels were retired on 5 June 2025 (a).** Full per-asset stats replaced them. Any checklist still saying "replace all Low assets" is stale.

Google's caveats are the guardrails. Asset-level clickthrough and cost per acquisition are directional only, because performance belongs to the combination. And asset stats will NOT sum to ad-level totals - never build a check that expects them to.

**Confounder:** a pinned asset gets impressions by force, not merit. Exclude pinned assets from any "top performer" ranking or you'll conclude your pins are your winners every time.

**Text customization on a service business (a mechanism, c judgement).** Google-written headlines pull from the landing page. On a site whose homepage lists eight services, the generated headline for an emergency-plumber query can be about bathroom renovations. Report whether it is on, and pull the AI Max asset report before judging the copy.

---

## TIER 6 - Landing pages and campaign types

These need the website loaded, not the account read.

**The homepage fault is the biggest single lever in most small local accounts.** Detect it when the final URL is the root domain or a generic hub. Dedicated landing pages convert at a **4.02% median against 2.35% for general website pages** - Unbounce 2026 **(b)[V]**.

Also check: mobile load under three seconds (Google's own research puts the average mobile landing page at about 15 seconds, with bounce probability rising 123% from one second to ten **(b)**) · no more than five required form fields · a real tap-to-call link above the fold · one primary call to action.

**Final URL expansion is a landing-page finding, not a settings one.** Under AI Max it is on by default and sends the click to whichever page Google picks; URL exclusions exist but only work while text customization is also on **(a)**. On a service business with a real landing page per service, recommend it off; on a business sending everything to the homepage, it may be the lesser evil until pages exist.

**Performance Max in a small local account: usually it shouldn't exist.** Two findings decide it.

PMax needs **30 or more conversions a month for stable performance. Below that, return on ad spend variance runs plus or minus 100-400%** (over 4,000 campaigns, over 500 accounts **(b)[V]**). Not re-verified 28 Aug 2026.

And **74-97% of PMax cost is feed-based Shopping, median around 90%**. A service business has no feed, so it is buying the Display, YouTube and Discover residue.

**Brand exclusions absent is the single most impactful PMax configuration error (c).** Without them PMax absorbs brand traffic, inflates its own reported ROAS on searches that would have converted anyway, and starves genuine prospecting - which then shows up as "PMax is our best campaign" when it is mostly harvesting your own name. Check them explicitly and report their absence as a finding in its own right, not as a footnote. Say it alongside the AI Max coupling: turning AI Max off on a campaign also disables brand exclusions there.

If PMax stays, check brand exclusions and the overlap. **91.45% of 503 accounts showed Search and PMax overlap** in February 2025, and where the two differed in conversion rate by more than 10%, **Search won 18.91% of the time against PMax's 6.17%** (Optmyzr **(b)[V]**). PMax channel reporting has split out Search Partners since January 2026 **(a)**, so the residue is now measurable.

**Optimisation score is not a performance metric.** Dismissing a recommendation raises it by exactly as much as accepting it. You can dismiss everything and hit 100%. Google's own liaison says not to make raising it a goal **(a)**. Optmyzr's 17,380-account cut (August 2024) did find the 90-100 bracket had the cheapest cost per acquisition, but lower brackets had better conversion rates and the authors call it a marker of active management, "not and never a KPI" **(b)[V]**. Report it as context. **An audit that recommends "raise optimisation score to 100%" is a red flag on the auditor.**

Triage the recommendation feed into two piles. Hygiene - fix tracking, fix disapprovals, add missing assets - usually do these. Reach and spend - raise budget, add broad match, opt into Display - these expand Google's revenue before yours.

**Local Services Ads is often the whole answer.** Two independent large samples agree: LSA runs about **$53 a lead against $104 blended Google Ads and $149 non-brand** (888 contractors, 1,774 campaigns, 126,650 leads, February 2026 **(b)[V]**), corroborated by a 3,211-campaign home-services benchmark at **$91 cost per lead (b)[V]**. Not re-verified 28 Aug 2026.

For an LSA-eligible business not on LSA, "you are buying leads at roughly twice the available rate" is a bigger finding than every Quality Score fix combined.

---

## The outside-in audit - what you can say without account access

Prospects do not grant OAuth before a call. This is what the public surface supports, and where it stops.

**What the Ads Transparency Center shows (c)[V].** Every verified advertiser's active and recently active creatives across Search, Display and YouTube; format; date last shown; broad regions; refreshed within 24-48 hours. Unverified advertisers do not appear at all, so "no ads found" means "not verified or not advertising", never "not advertising".

**What it does not show.** Spend, keywords, match types, bids, audiences, clicks, conversions, or whether anything works.

**Findings you CAN make from outside:**
- Whether the business is advertising at all, and whether ads went stale (last shown months ago).
- Which services and offers the copy leads with, and which competitors bid on the same terms on a live SERP from inside the service area.
- Whether the ad lands on the homepage or a matched page.
- Landing page faults: no tap-to-call above the fold, message mismatch with the headline, mobile load over three seconds, more than five required fields, no single call to action.
- Whether an LSA-eligible category is running LSA (visible on the SERP).

**Findings you CANNOT make from outside:** any dollar waste figure, any cost per acquisition, any "you are wasting X%", anything about search terms, negatives, bidding or tracking.

**How to present it.** Top five observations, ranked by how much they probably matter, each with one sentence on what the inside audit would confirm. **No dollar figures, ever, on an outside-in read** (Jono's ruling, 2026-08-29): a guessed number is the one line a prospect will find wrong and use to discard the whole document. The gap list earns the call; the counted number comes after read-only access is granted on it. That is the pitch, not the delivery.

---

## GAQL resources per check

Field names below match the API version current at revision date. Verify against the version in use before scripting; names drift between versions.

- **Tracking (Tier 0):** `conversion_action` (status, category, primary_for_goal, counting_type, click_through_lookback_window_days, include_in_conversions_metric) · `conversion_goal_campaign_config` · `campaign_conversion_goal` · `custom_conversion_goal` · `metrics.conversions` against `metrics.all_conversions` and `metrics.conversions_by_conversion_date` · `segments.conversion_lag_bucket` for the lag read.
- **Hidden share (Tier 0.2):** `keyword_view` clicks per campaign minus `search_term_view` clicks per campaign.
- **Settings (Tier 1):** `campaign.network_settings.*` · `campaign.geo_target_type_setting.positive_geo_target_type` · `campaign_criterion` (location, language, ad_schedule, device, with bid_modifier) · `campaign.bidding_strategy_system_status` · `ad_group_ad.policy_summary.approval_status` and `review_status` · `ad_group_ad.ad.final_urls` · `campaign_shared_set` joined to `shared_set` · `campaign_budget.explicitly_shared` and `reference_count`.
- **Autopilot (Tier 1):** `recommendation_subscription` · `change_event` where `client_type = GOOGLE_ADS_RECOMMENDATIONS_SUBSCRIPTION` · `customer.optimization_score` and `campaign.optimization_score` for context only.
- **Waste (Tier 2):** `search_term_view` · `geographic_view` and `user_location_view` · `segments.ad_network_type` · `segments.device` · `segments.hour` and `segments.day_of_week` · `ad_group_criterion.system_serving_status`.
- **Structure and bidding (Tier 3):** `campaign.bidding_strategy_type` · `bidding_strategy` · `metrics.search_impression_share`, `search_budget_lost_impression_share`, `search_rank_lost_impression_share` · `change_event` (30 days, LIMIT 10,000) plus `change_status` for completeness.
- **Keywords and negatives (Tier 4):** `ad_group_criterion` (keyword text, match_type, negative, quality_info.quality_score, creative_quality_score, post_click_quality_score, search_predicted_ctr) · `shared_criterion` · `campaign_criterion` negatives.
- **Ads and assets (Tier 5):** `ad_group_ad` (responsive_search_ad headlines, descriptions, pinned_field) · `ad_group_ad_asset_view` for per-asset stats since 5 June 2025 · `campaign_asset` and `ad_group_asset` for sitelinks, images, logo.

---

## Deadlines to check on any 2026 audit

**August 2026 - LSA migrates into Google Ads as pay-per-lead PMax (a)**
US home and storefront services first: plumbing, HVAC, electrical, appliance repair, cleaning, lawn care, roofing, pest control, moving. Late 2026 widens to service-area businesses and custom bidding setups; 2027 covers non-US and everything else. Admins get a 14-day notice email and a 7-day reminder. **Historical LSA performance reports do NOT migrate - download them before the date.** Lead history, verification status and the Google Verified badge do migrate. Manual bidding and vertical target CPA are deprecated (one target per campaign, so split campaigns to keep different bids), weekly budgets are divided by seven into daily, and BBB callouts are replaced by six structured callouts.

**AI Max auto-upgrade - date not confirmed by Google as of 9 June 2026**
The previous revision carried "1 September 2026 auto-upgrade for campaigns using automatically created assets or campaign-level broad match" and "Dynamic Search Ads pushed to February 2027". At Google Marketing Live 2026 (PPCChat Q&A, 9 June 2026) Google's liaison gave no auto-upgrade date and no DSA deprecation date, saying DSA ad groups will upgrade in place preserving IDs and history, and advising advertisers to keep their structure and use the upgrade tools as they arrive. Treat both dates as **not re-verified 28 Aug 2026** and check the AI Max help pages before quoting either. What is still true: an upgraded campaign gets final URL expansion and text customization on by default, so a service business can find emergency-intent clicks landing on an About page. Review the three toggles on every campaign.

**15 June 2026 - offline click conversion uploads blocked in the Ads API (a)**
The upload moves to the Data Manager API. Any custom offline-import integration is already broken. Standard CRM connectors are unaffected. Not re-verified 28 Aug 2026.

**January 2027 - no new standalone Display campaigns (c)**
Auto-migration to Demand Gen runs through 2027. **Export excluded placements and apps before migration** - don't assume exclusions carry over.

---

## Do NOT flag these

Common audit-template items that are wrong, stale, or unevidenced.

- "Raise Quality Score to 8" or "aim for 7+" - Quality Score is not an auction input **(a)**
- "Raise optimisation score to 100%" - dismissing counts the same as accepting
- "Replace all Low-rated assets" - those labels were retired 5 June 2025
- "Get Ad Strength to Excellent" - no correlation with cost per acquisition or conversion rate in the largest sample
- "Opt out of Search Partners because of parked domains" - removed as a surface 10 February 2026
- "Turn off automatically created assets" by that name - it is text customization inside AI Max since 27 May 2025; report the three toggles instead
- "PMax has no search terms and takes no negatives" - both exist since 2025
- "Add misspellings as negatives" - covered automatically since June 2024; plurals and synonyms still are not
- "Google switches auto-apply on by default" - opt-in per Google's doc; read `recommendation_subscription` instead of asserting
- "Use location or schedule bid adjustments to tune Smart Bidding" - not supported under any automated strategy **(a)**
- Any headline "X% of your budget is wasted" figure - 20-40%, 76%, 94%, "18-27% typical" and "one third leaks" all trace to nothing
- "Healthy accounts have 30-80 negatives" - vendor content, no sample
- "Never change budget more than 20%" - practitioner heuristic presented as Google policy
- "30 conversions to exit learning" - not in Google's learning doc
- Chasing position one or 100% impression share - average position was removed in 2019
- Expanded Text Ad workflows - sunset in June 2022
- "Smart Bidding evaluates 3,847 signals in 100ms" - appears nowhere in Google's docs, reads fabricated

---

## 2026 benchmarks - a prompt to investigate, never a verdict

WordStream/LocaliQ, **13,474 US search campaigns, April 2025 to March 2026, updated 1 June 2026**, medians, minimum 52 campaigns per subcategory **(b)[V]**. The sample is LocaliQ's own managed client base.

**All industries**
Clickthrough 6.64% · cost per click $5.42 · conversion rate 8.18% · cost per lead $66.69

**Home and home improvement**
Clickthrough 6.47% · cost per click $8.33 · conversion rate 8.05% · cost per lead $90.92

**Personal services**
Clickthrough 7.16% · cost per click $7.17 · conversion rate 12.34% · cost per lead $54.60

**Auto repair and service**
Clickthrough 5.56% · cost per click $4.35 · conversion rate 15.51% · cost per lead $29.96

**Dentists**
Clickthrough 5.66% · cost per click $8.00 · conversion rate 10.67% · cost per lead $72.97

**Attorneys and legal**
Clickthrough 5.87% · cost per click $9.87 · conversion rate 5.55% · cost per lead $131.63

**Real estate**
Clickthrough 7.61% · cost per click $3.22 · conversion rate 3.70% · cost per lead $102.51

**Physicians and surgeons**
Clickthrough 6.61% · cost per click $4.76 · conversion rate 12.43% · cost per lead $40.04

**Geography swamps these.** A plumber in Manhattan and a plumber in rural Iowa share a row and nothing else, and the study publishes no metro-level breakdown. **There is no evidenced way to adjust these to a city. Do not invent a regional multiplier.**

These are medians, so half of accounts are worse. Flag when the account exceeds its category cost per click by more than 50%, or falls below half the category conversion rate, over at least 200 clicks. Cost per lead fell year on year for the first time in five years, so a 2024 benchmark reads harsh against a 2026 account.

---

## How to use this

1. Run Tier 0 first and report its results before anything else. If tracking is broken, say so and stop - the rest of the audit is measuring fiction.
2. Work Tier 1 next. Those are binary and need no data to justify. Read auto-apply and AI Max state from the API, then confirm on screen.
3. Price every finding using **Tier 2.5**. Report PROVEN WASTE (counted) and RECOVERABLE SPEND (estimated) as two separate numbers - never merged. Apply the recovery-rate haircuts, assign each click to exactly one category, and stop if the total exceeds about 35% of spend.
4. Rank everything from Tier 2 onward BY DOLLARS, biggest first. Never group findings by category in the output.
5. Quote a figure only if this file grades it **(a)**, or **(b)** with a stated sample size. If it is **(c)**, say "practitioner convention" out loud rather than presenting it as fact. If it is marked "not re-verified 28 Aug 2026", verify it or caveat it.
6. When the client's own data contradicts a benchmark here, the client's data wins. These are prompts to investigate.
7. Without account access, use the outside-in section and never attach an unlabelled dollar figure.

---

## What changed in this revision

Corrections to stale lines:
- Auto-apply is no longer "a screen check, not an API one": `recommendation_subscription` and `change_event` client_type read it directly **(a)**. The "Google enables them by default" line is now explicitly retired; the doc shows opt-in.
- Misspelling coverage for negatives is dated to Google's June 2024 announcement, not "live through 2025".
- Bid modifier line now uses Google's compatibility chart: Maximise Clicks also ignores location, schedule, audience and demographic adjustments; target ROAS treats device as a target adjustment.
- Search Partners uplift claim now carries its real condition (5% or more of spend on SPN, December 2025) and the split 11% conversions / 7% value; the "budget-unconstrained" scoping is kept but flagged not re-verified.
- Parked domain removal dated precisely to 10 February 2026. Asset label retirement dated to 5 June 2025. Text customization rename dated to 27 May 2025.
- The 1 September 2026 AI Max auto-upgrade and February 2027 DSA dates are flagged: Google's liaison gave no dates at GML 2026 (9 June 2026). Kept, marked not re-verified.
- Counting type line upgraded from "use repeat rate" to Google's own "One for leads, Every for sales" **(a)**.

Additions:
- Tier 0: why the GA4 import is structurally different (attribution scope, event date vs click date, Safari 7-day cookie); Enhanced Conversions diagnostics and click-ID capture; four consent signals; Recording status; call duration threshold; Marvin's statement that Smart Bidding does not depend on the reporting threshold.
- Tier 1: settings drift between campaigns; negative list attachment; orphan and one-campaign shared budgets; AI Max three-toggle reporting; the two AI Max side effects (negatives respected, brand exclusions drop when AI Max is off, pins can be overridden).
- Tier 2.3: placement reporting (August 2025) and Invalid Activity Credit report (April 2026).
- Tier 2.4: Optmyzr's 2-3x / 4-5x spend rule as a tie-break under n_min.
- Tier 3: broad match on the wrong bid strategy; duplicate keywords across campaigns; converting terms not yet keywords; change_event 30-day limit; impression share sums to 100%.
- Tier 4: broad match default since July 2024; three Optmyzr samples plus Geddes on exact match; PMax negatives and search terms timeline; negatives under AI Max; Geddes on decade-old lists; Adalysis "aim for 7" retired.
- Tier 5: Adalysis corroboration on Ad Strength; text customization risk on multi-service sites.
- Tier 6: precise PMax overlap numbers (91.45%, 18.91% vs 6.17%); PMax SPN split; Optmyzr 17,380-account optimisation score correlation with the authors' own "not a KPI" caveat; final URL expansion as a landing-page finding.
- New section: the outside-in audit, what it can and cannot claim.
- New section: GAQL resources per check.
- Deadlines: fuller LSA migration detail (wave two, wave three, weekly-to-daily budget, 7-day reminder, six callouts).
- Do NOT flag: seven new stale items.
- Benchmarks: real estate and physicians rows; 1 June 2026 update date; the year-on-year cost per lead drop.
- Grading key: the "not re-verified 28 Aug 2026" marker.

Left untouched on purpose:
- All of Tier 2.5, verbatim, including its recovery-rate table. output-format.md bans tables in deliverables; this one was kept because the brief said verbatim. Convert to bullets in a later pass if the reviewer wants it.
- Every threshold in Tiers 2, 3, 4 and 5 from the previous revision, unless a source above changed it.
