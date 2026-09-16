# Search terms - the daily pass, and what to negate
Researched August 2026 across 70 sources (29 Google official and API pages, the rest Optmyzr, Adalysis, Search Engine Land, ZATO, Karooya, Adthena, Nils Rooijmans, Hero Conf 2026) · the daily workflow, the thresholds and the math behind them, the local-service junk taxonomy, and what changed in 2024-2026
Next: run `/search-terms` - lifetime pull by default, already-handled terms filtered out, judged as a filter with a leave-it-alone default.

Read this before touching a search terms report or a negative keyword list.

## How every claim in this file is graded

**(a)** Official Google documentation or API reference.
**(b)** A study with a stated sample size.
**(c)** Practitioner opinion or convention.
**(d)** Derived from the math in this file.
**[V]** Published by a company selling the thing the claim supports.

**Be honest about the evidence.** The mechanics (what a negative blocks, what the report hides, the limits) are (a) and solid. Almost every "X% of your budget is wasted" figure is (c) from a company selling a negative-keyword tool. Report the account's own numbers, never a headline stat.

---

## The pass - lifetime by default, filtered not bucketed

**Why yesterday and never today (a).** Clicks and cost land within about an hour, but search-term rows are filled in LATER - Google's own example has Sunday's search terms complete by about 6am local on Monday - and conversions that were not last-click arrive up to 15 hours late. A pass on today's data scores half a day. Score yesterday, and re-check the trailing three days so a late conversion can rescue a term flagged the day before.

**Why daily (c, convergent).** Every 2025-2026 practitioner source puts the floor at weekly for accounts over about $5,000 a month and calls monthly insufficient. Daily is the norm for the first week of any new campaign, after enabling the broad-match toggle, and after AI Max is switched on. Cost of waiting: a junk term found on day 1 cost one click; found on Sunday it cost a week of clicks plus a week of Smart Bidding learning to want it. **Jono's ruling (2026-08-26): daily, not weekly.** The Monday run covers Friday to Sunday.

**The two passes, in this order:**

1. **A FILTER, not a taxonomy. The default answer is LEAVE IT ALONE.** Do NOT bucket every term - at lifetime scale that means labelling thousands to act on a few dozen, and most terms are neither junk nor winners, they just are. A term gets a label only when it is about to become a negative or a keyword. Run these gates in order and stop at the first hit:

   1. **Known junk patterns** (free, no search) - the taxonomy below: jobs, salary, apprentice, course, training, licence exam, how to, DIY, parts, supplies, wholesale, other-trade, out-of-area. A clear hit is negated at one click, no SERP check and no cost threshold needed. Most negatives come from here and it costs nothing.
   2. **Winner conditions** (free, from the pull) - converted at or under target, or misrouted. Goes to the harvest. A converting term is never negated.
   3. **Has it actually spent without converting?** Under about 1x target cost per lead with no conversions is noise: no label, no search, no tokens. This gate is what makes a lifetime pull affordable.
   4. **The SERP check** - only for survivors. Scored, per the rule below.
   5. **The cost math** - for whatever is still unresolved.

   The intent categories (hire · research · DIY · job seeker · education · parts and supplies · other trade · competitor · out of area) are the vocabulary for LABELLING something you are already acting on - they are not a sorting exercise to run over the whole report. Report the funnel counts at the end so the cost of the run is visible.
2. **Then the money.** Sort the unknowns by cost, biggest first, and apply the threshold below.

**Add the Keyword column** (`segments.keyword.info.text` in the API). Without it you cannot see which keyword triggered the term, and often the keyword is the problem, not the term - pause a bad keyword instead of negating a hundred of its children.

**Batch, then push once.** Decide everything into three buckets - universal junk (account list) · campaign-specific (campaign negatives) · promote to keyword - and apply each bucket in one push. Row-by-row is what turns five minutes into an hour.

### Judging intent - how to actually do it

Google the term. The results page is the intent, and it costs nothing:
- **Ads plus a map pack** at the top → a buyer. Keep it.
- **Job boards** (Indeed, LinkedIn, Glassdoor) → a job seeker. Negate.
- **wikiHow, YouTube, forum threads, "how to" guides** → DIY. Negate the pattern, not the query.
- **Product listings, Home Depot, Amazon** → parts shopper. Negate.
- **Course providers, licensing boards** → a student. Negate the phrase ("license exam"), never the bare word.
- **Wikipedia, news, definitions** → research. Judge per client.

**Score it, never just call it (c).** The method above is standard in intent-mapping literature but no PPC source quantifies its accuracy, so put a number on every read and keep a human on the yes. Read the top 10 results and count how many point at ONE intent:

- **7 or more of 10 agree** - that is the intent. Act on it: negate the wrong ones, keep the buyers.
- **5 or 6 agree** - weak. It cannot carry a negative on its own; the term falls through to the ambiguous-term math below.
- **Fewer than 5 agree** - genuinely ambiguous. Leave it alone and let spend decide; unresolved is a valid, cheap outcome.
- **Ads plus a map pack outweigh organic count** for buyer intent - somebody paid to be there, which is a stronger signal than ten blue links. Two or more ads plus a map pack reads as a buyer even at a 5 or 6 score.

Record the score with the verdict ("8/10 job boards"), in the batch line and in `negatives-log.md`. A bare label cannot be argued with six weeks later; a number can.

### The threshold for ambiguous terms - and the math behind it (d)

The odds of seeing zero conversions in N clicks when the term really does convert at rate p are (1-p)^N. Set that to 5% and solve:

**N = ln(0.05) / ln(1 - p)** - roughly **3 divided by the conversion rate**.

- 2% conversion rate → 148 clicks before zero means anything
- 3% → 98 clicks (this is where the folk "100 clicks" rule comes from)
- 5% → 58 clicks
- 7% → 39 clicks
- 10% → 28 clicks

Three-over-the-conversion-rate clicks costs exactly **three times the target cost per lead**. So **"spent 3x your target cost per lead with nothing to show" is the rule of three written in money** - defensible at 95% confidence, and it scales itself to the account. Use the campaign's trailing-90-day conversion rate, never a flat 100 clicks: an account converting at 1% flagged on 100 clicks generates false positives, and the owner will find one and discard the whole list.

Cross-checks from practice (c): Adalysis defaults to 150 clicks, zero conversions, 90 days. Nils Rooijmans' script uses 60 clicks. Search Engine Land's 2026 growth-mode rule is "more than 3x target cost per lead with zero conversions over 90 days."

**Two guardrails on the threshold:**
- A term with **one conversion at or under 1.5x target** is never negated. Above 3x target on two or more conversions → a bid or ad-group problem, not a negative.
- **If the day's proposed negatives exceed about 10% of a campaign's search terms, stop.** The keywords or match types are wrong; negatives are mopping up a leak at the source. (c) Jyll Saskin Gales, and Search Engine Land 2024: adjust match types first.

### Brand and non-brand are judged on separate thresholds (c)

**One blended target mis-grades both sides.** Branded searches convert far better than cold ones, because
the person already knows the business - so a blended cost per lead is brand traffic flattering cold
acquisition. Judge non-brand terms against the non-brand number, never the blend.

Two failures follow from using the blend, and they pull in opposite directions:
- **Non-brand winners look like losers.** A term at the true non-brand cost per lead reads as over target
  against a blend the brand pulled down, so it never gets harvested.
- **Brand junk survives.** A misspelling or a review search sitting well above the *brand* cost per lead
  still clears the blended bar, so it never gets looked at.

`code/search_terms_report.py --brand "<name>,<variants>"` computes both sides. Without the flag the pull
returns `brand_split.available: false`, and **every threshold in the run is blended and must say so** -
that is an `Assumed` grade, not a silent approximation. Brand detection is substring-based on purpose, so
a name written solid ("acmeplumbing") and spaced ("acme plumbing") both count.

**Do not convert this into brand negatives.** Per the brand-exclusions note below, exclusions are the
supported mechanism. This split is for calibrating thresholds, nothing else.

---

## What the report cannot show you

**Roughly half the spend is hidden (b).** Since September 2020 the report only lists terms "a significant number of users searched for"; the rest roll into one "Other search terms" row. Adthena measured an average **51% of spend** in "Other" across accounts (October 2024), practitioners quote about 40% on phrase and above 80% on broad match, and one exact-match account reported 80% of spend and 90% of conversions hidden. Hidden terms also perform worse: **+38% cost per click and -35% click-through** versus visible ones (Hero Conf UK 2026, sample not published).

**Compute the hidden share per campaign every run:** campaign clicks minus the sum of visible search-term clicks. Above about 40%, row-by-row review is fighting a minority of the problem - shift weight to n-grams, tighter match types, and feeding real lead quality back through offline conversions so Smart Bidding self-corrects on the junk you cannot see. Above 50%, say so in the report and route the campaign to Search Terms Insights, which is built from ALL queries including hidden ones but is "processed differently" and will not reconcile with the report (a).

Two things that helped: misspellings are now folded under the correctly spelled term (about 9% of hidden volume surfaced, 2024, (a)), and the 2021 change showed impression-only terms again.

---

## N-grams - what row-by-row review misses

Split every term into its one-, two- and three-word sequences and aggregate cost, clicks and conversions per gram over 90 days. Patterns spread thin across hundreds of low-click terms - and across the hidden ones sharing the same token - become obvious, and you **negate the root token once** instead of a thousand exact variations. One documented example: "lawn and leisure" appeared across 265 search terms, invisible on any single row. **(c)[V]** Adalysis.

Rule of thumb: **one- and two-word grams surface negatives, three- and four-word grams surface new keywords.** A token with more than 3-over-conversion-rate clicks (or 150 in a 2% world) and zero conversions is a negative candidate at the token level.

Free tool: the Brainlabs Search Query Mining script, maintained by Nils Rooijmans, updated March 2025 with a 10-impression floor.

Geddes' caution (c): a high-cost n-gram that is really a comparison intent ("vs", "cost") may deserve its own ad group instead of a negative. Do not negate an intent you could serve better.

---

## Negative keyword mechanics - what actually blocks what (a)

- **Negative broad** (the default when you type one by hand): blocks when every word is present, in any order.
- **Negative phrase**: the words in that order, extra words allowed either side.
- **Negative exact**: that identical query only.
- **Negatives do NOT expand.** "Negative keywords won't match to close variants or other expansions." Blocking `flowers` still serves "red flower". Plurals, stems, reorderings and synonyms each need their own negative. Generate the singular and plural pair for every new negative and add both.
- **The one exception (since mid-2024): misspellings and casing are covered automatically.** One negative blocks roughly 1.5 million misspelling variants. Stop maintaining misspelling lists. It is one-way: a misspelled negative blocks its own variants, not the correct spelling.
- Only the **first 16 words** of a query are evaluated for negatives.
- Plus signs are invalid in negatives and fail silently. Modified broad died in 2021.
- **"Add as negative" from the search terms screen defaults to EXACT.** That is why so many accounts have enormous exact-negative lists with almost no blocking power. Phrase is the everyday default; broad only for single tokens never wanted anywhere (jobs, apprenticeship, DIY).

### The limits (a, as of 2025-2026)

- Account-level negatives: **1,000**. Apply to Search, Performance Max, Shopping, App and Local on search and shopping inventory only.
- Shared lists: **20 per account, 5,000 per list**, attachable to Search, Shopping and (since 2025) Performance Max. Lists slightly over 5,000 have been accepted since September 2025; treat 5,000 as the design limit.
- Performance Max campaign-level negatives: **10,000 per campaign** (March 2025). They touch Search and Shopping inventory only - YouTube, Display, Gmail, Discover and Maps ignore them. One case: 847 negatives cut irrelevant PMax traffic by 8%. Use brand exclusions and content exclusions for the rest.
- API: 10,000 operations per mutate request.

### Where the negative goes

- **Account level** - the small universal set only: jobs, DIY, free-as-a-phrase, training. Highest-risk placement: one over-broad phrase silently kills a valid theme in every campaign at once. Keep it to 40-60 genuinely universal words.
- **Shared lists** - category blocks: job seekers, DIY, education, other trades, suppliers. Target 3 to 7 well-named lists.
- **Campaign level** - intent boundaries and geography: brand negatives on non-brand campaigns, cities you do not serve, the specific STAG's trigger words on the generic campaign.
- **Ad group level** - sculpting only. Needing many of these means restructure instead.

Typical local-service account: 150-400 negatives in total, or 300-500 universal plus 200-400 search-specific (c).

### Conflicts - the silent killer

A negative that matches one of your own keywords makes that keyword show Active with zero impressions. **Google's "remove conflicting negative keywords" recommendation misses shared-list conflicts and does not always find ad-group ones** (a, c). So before every push, test each new negative against every enabled keyword **in the whole account** yourself, and block the write on any match. Account-wide is the point: a negative applies at the level you attach it, and an account-list entry reaches every campaign, so checking only the campaign the search term came from misses the conflicts that cost the most. Scope the test to the landing level - account list against every keyword in the account, campaign negative against every ad group in that campaign, ad group negative against that group - and report the blocked keyword with its ad group and campaign named, so the fix is obvious. Fix order: tighten the match type (broad to phrase) before deleting; move the negative down to the specific ad group; never auto-apply the recommendation. The two most common conflict sources: copy-pasted industry lists and legacy negatives left behind after a restructure.

### Auditing the negatives already in the account

Everything above points forward at negatives about to be added. The reverse question - **what are the
existing negatives already blocking?** - is asked far less and costs more, because the damage is silent
and compounding. A blocked keyword shows Active with zero impressions; nothing errors and no report
flags it.

Run the same match semantics backwards, at all three levels, on every pass:

- **Against every enabled keyword.** Any match is money switched off. Name the keyword, its ad group and
  its campaign.
- **Against terms that already converted.** A term with status `EXCLUDED` that has recorded conversions
  was earning before it was blocked. Only the owner knows whether that was deliberate.

**Report, never remove.** Negatives are also sculpting, and a keen cleanup undoes deliberate routing - a
term negated in one ad group because it was promoted into another is correct and must not be "fixed".
Removal is always a separate human decision. **State a clean result explicitly** - "0 of 137 existing
negatives block a keyword you bid on" - because silence reads as skipped.

The two usual sources of damage: copy-pasted industry negative lists, and legacy negatives left behind
after a restructure.

### Brand exclusions replace brand negatives (a)

A whole brand goes in a brand exclusion list (Search and Performance Max), which auto-covers misspellings, variants and other languages. A specific phrase stays a negative keyword. Negatives that overlap a brand INCLUSION hurt performance. Both migrated into AI Max from 27 May 2025.

---

## Promoting a search term into a keyword

Most content skips this half. The positive side is where the money is, so it runs **every pass**, never "when there is time" - negatives save pennies, a converting keyword you were not bidding on makes dollars. A run that reports negatives and says nothing about the harvest is an unfinished run; when nothing qualifies, say that explicitly.

Google's position is that close variants mean you do not need exhaustive keyword lists (a) - the term is already matching. But close variants route to the wrong keyword often enough to matter: one documented case had "car hire" matched by the "car rental" keyword and cost per lead tripled from $12.84 to $38.52. **(c)[V]** Adalysis.

**Check value, not just count (c).** A term hitting target cost per lead on half the average job value
is a loser that reads as a winner, and a term slightly over target on triple the value is a winner that
reads as a loser. The pull carries `value_per_conversion` and `roas` per term wherever conversion value is
tracked. Where it is missing, judge on lead count and **say the value was not available** rather than
implying the term was checked on value and passed. Never harvest above target cost per lead on lead count
alone when value is present and below average.

**Promote to exact match when one of these is true:**
1. The term converted at or below target cost per lead and its status is NONE (not already ADDED) - "Google found a winner you didn't bid on"
2. The variant's cost per lead trails the true keyword by more than 10%
3. The intent genuinely differs from the keyword catching it
4. Multiple ad groups are competing for the same term

Skip when the campaign-level broad-match setting is on and an identical keyword already exists - Google already prioritises it "as if exact" and adding it again buys nothing (a). Volume floor is TIERED by risk (Jono, 2026-08-31): case A (new keyword, adds new spend) needs 2+ conversions at or under target; cases B (misrouted - reroutes spend already happening) and C (writes a candidate note, builds nothing) need only 1 at or under target. Nothing above target is ever harvested regardless of count.

**Conflict check in reverse (c).** Before proposing a keyword, test it against the account and campaign negative lists, including the shared lists. `code/add_keywords.py --dry-run` does exactly this and names the negative that would kill each blocked keyword; it also writes every keyword PAUSED, since the ad group it joins is already live. Proposing a keyword you are already blocking is the most common way this half of the pass wastes a run, and it is the same check as the negative-side one, pointed the other way.

Secondary output: feed the converting terms' exact language back into RSA headlines and landing-page H1s.

---

## The local-service junk taxonomy

Every category below is a real spend leak in trades accounts. **Every one also has an over-blocking risk, and the over-blocks cost more than the junk does** - blocking a buyer is worse than paying for one bad click.

### Job seekers - negate freely
`jobs · careers · hiring · employment · salary · wage · apprentice · apprenticeship · union · resume · apply`
Warning: `hiring` is ambiguous - "hiring a plumber" is buying intent. Phrase-negate `"hiring for"`, `"near me hiring"`, not the bare word.

### DIY and how-to
`diy · do it yourself · tutorial · step by step · fix myself · youtube · reddit · forum · tools needed`
Warning: **do not broad-negate `how to`.** It kills "how to hire a plumber" and "how to choose a roofing contractor", both late-funnel. Phrase negatives: `"how to fix"`, `"how to install"`, `"how to unclog"`, `"how do i"`.

### Parts and supplies, when you sell service and not parts
- **Plumbing:** pvc pipe, copper pipe, pex, fitting, valve, faucet aerator, showerhead, teflon tape, drano, plunger, snake rental, home depot, lowes, amazon
- **HVAC:** refrigerant, r410a, r22, window unit, portable ac, space heater, thermostat manual, nest troubleshoot, filters
- **Electrical:** wire, outlet cover, light bulb, extension cord, surge protector, multimeter, voltage tester
- **Roofing:** shingles for sale, roofing nails, underlayment, materials, wholesale, supplier
- **Landscaping:** mulch, rocks, seed, equipment, nursery, best weed killer
- **Cleaning:** supplies, products, vacuum, mop, chemicals, disinfectant
Plus: `rental · rent · lease · used · refurbished`

### Training, courses and business-starters
`school · training · certification · course · class · exam · degree · how to become · franchise cost · business plan · start a business`
Warning: never negate the bare word `license`. "licensed plumber near me" is a great query. Phrase-negate `"license exam"`, `"license requirements"`, `"get a license"`.

### Free and price-shopping
`coupon · promo code · groupon · discount code · pro bono · volunteer`
**The two most expensive over-blocks in this whole file:**
- Negating bare `free` blocks **"free estimate"** and **"free quote"** - straightforward buyer intent. One documented shared-list `-free` killed an entire free-trial campaign. Phrase pairs only: `"free download"`, `"free course"`.
- `cheap` and `affordable` are only negatives if the business does **not** compete on price. "cheap plumber near me" is genuine hire intent for a budget operator. Decide per client, never by default.

### Warranty and manufacturer support
Directional, not a word list:
- `[brand] + warranty / claim / recall / manual / support` → negative
- `[brand] + repair / service + city` → positive keyword, these convert
Material brands (GAF, CertainTeed, Owens Corning, Leviton, Lutron, Square D) in generic campaigns are product research - negate.

### Wrong-service adjacency
A plumber does not want `electrician · hvac · roofer · carpenter · pest control` clicks. Watch homonyms - roofing accounts collect "roof rack", "roof of mouth", "car roof". Commercial versus residential mismatches belong here too.
Warning: blanket other-trade negatives block combo queries like "plumber and electrician". Check before applying.

### Noise
Complaints (`sue · lawsuit · bbb · scam · ripoff · yelp`), pop culture (`white house plumbers`), and for roofing, `storm chaser`.

### Not in any published list - add these yourself
Municipal and utility queries (`water department · utility · outage · bill pay · city of [x]`) and landlord-tenant disputes. **This is a synthesis, not sourced** - verify in the account's own report first.

### Per-client judgement calls - never default
- `near me` → almost always keep; only `"near me hiring"` and `"near me jobs"` go
- `reviews` and `best` → early research; block for direct-response campaigns, keep for brand-aware ones
- `cost` and `how much` → commercial intent for services; keep, and answer it on the landing page
- `emergency` and `24 hour` → keep unless you genuinely do not offer it
- Symptom queries: "burst pipe repair", "no hot water", "flooded basement" convert; "why is my faucet dripping" does not - but do not blanket-negate `"why is my"`, low-bid it after data

---

## Geography in the query

**Presence targeting does not solve this.** With location set to Presence, out-of-area searchers are filtered - but someone physically inside your area searching "plumber in Fort Worth" when you only cover Dallas still gets through. **City negatives are needed even with Presence set correctly.** Add neighbouring cities you do not serve as campaign-level negatives, and exclude postcodes with zero booked jobs. (c)

## Competitors - bid, negate, or ignore

For local trades, someone searching a competitor's name is usually a warranty customer, an estimate callback, a maintenance-plan member (all unconvertible), or a new customer with no loyalty (convertible). The ratio decides it.
- **Established competitor** with a large installed base → ignore; you are paying to reach their customer base
- **Newer competitor** → worth a test in a separate campaign, own budget
- **Franchise brands** (Roto-Rooter, Mr. Rooter) in generic campaigns → negate; the traffic is navigational
- **Small accounts** → skip competitor bidding until the core campaign is winning
If you do bid, negate the loyalty modifiers: `login · customer service · warranty · appointment · phone number · hours · my account`.

---

## What changed in 2024, 2025 and 2026

- **Misspellings and casing auto-blocked, and misspelled queries reported under the correct spelling** (mid-2024, a). Stop maintaining misspelling lists.
- **New Search campaigns on Smart Bidding launch with the broad-match toggle ON** (since July 2024, c with a corroboration). Turning it on converts every phrase and exact keyword to broad on save. Check it at build time, every campaign.
- **Performance Max got a search terms report (March 2025, data back to March 2023) and campaign-level negatives (10,000 per campaign, March 2025), with shared lists supported** (a).
- **AI Max for Search (May 2025, a):** its own search terms view with a Source column, negatives respected, Google asks for a two-week ramp before adding negatives. **The AI Max source column is attribution-polluted (c, Adalysis):** it claims impressions your exact and phrase keywords would have matched anyway, and some AI Max terms show no keyword at all. De-dupe against existing keywords before judging incrementality. The AI Max filter excludes "Other search terms", so its totals understate.
- **Auto-upgrade schedule (a):** campaigns using the broad-match setting or automatically-created assets upgrade to AI Max on 1 September 2026; Dynamic Search Ads follow in February 2027. No "keep old settings" option - opt out before the date or upgrade manually.
- **Brand inclusions and exclusions migrated into AI Max** from 27 May 2025 (a).

---

## Myths that still circulate

1. "Add every misspelling by hand" - stale since mid-2024.
2. "+modified +broad negatives" - never valid, and BMM died in 2021.
3. "Negatives only read the first 10 words" - 16 since October 2019.
4. "PMax has no negatives / only 100" - 10,000 per campaign since March 2025.
5. "PMax has no search terms report" - added March 2025.
6. "Exact match is exact, so exact campaigns don't need review" - close variants apply to every match type with no opt-out; one exact-match account had 80% of spend hidden.
7. "Match-type-segmented ad groups control where terms land" - dead since close-variant expansion.
8. "New campaigns default to keyword match types" - the broad toggle is on by default under Smart Bidding since July 2024.
9. "Google's conflict recommendation is a complete audit" - it misses shared lists.
10. "More negatives always equals less waste" - see over-negation below.
11. "Monthly review is fine" - weekly is the floor, daily at launch.
12. "The report is real-time" - search-term rows and conversions lag; today is incomplete.
13. "Search Terms Insights should reconcile with the report" - Google says they will not.

---

## Do NOT do these

- **Over-negate.** The largest sample available (Optmyzr, 7,100 accounts, 2024, (b)[V], PMax not Search) found campaigns WITH account-level exclusions had a **worse median cost per lead ($21.45 against $18.55)** and a conversion-rate difference of 0.24 points; a 2025 set of 24,702 PMax campaigns showed 58% doing flat or better with no exclusions at all. Mechanism: Smart Bidding already bids losing terms down to pennies; a manual negative removes the term at ANY price, including the one where it converts. Use negatives for intent, bids for efficiency. **The tell is impression share dropping with no cost-per-lead gain - roll the batch back.**
- Add low-search-volume terms as exact negatives - thousands of variations where one root gram would do.
- Negate on today's data.
- Add negatives to an AI Max campaign in its first two weeks.
- Leave `+` signs in negatives.
- Maintain brand-term negative lists - use brand exclusions.
- Quote any "% of budget wasted" figure. Measure this account.
- Assume the search terms report shows you everything.

**Google's own warning (a):** "If you use too many negative keywords, your ads might reach fewer customers."

---

## The rules every pass enforces

**Pull**
1. Score yesterday and re-score the trailing 3 days; never today. (a)
2. Every row carries its triggering keyword, its variant type and its ADDED/EXCLUDED status. (a)
3. Compute the hidden share per campaign; above 40% downgrade confidence, above 50% say so. (b)

**Classify**
4. Judging is a FILTER with a default of leave-it-alone, not an exhaustive taxonomy. Gates run cheapest-first and stop at the first hit: known junk patterns (free) → winner conditions (free) → has it actually spent without converting (free) → SERP check (costly, only for survivors) → cost math. A term that has not spent meaningfully gets no bucket, no search and no label. Wrong-intent hits still go at one click. Report the funnel counts so the cost of the run is visible. (c, Jono 2026-08-31)
5. Score the SERP out of 10: 7+ acts, 5-6 falls through to the math, under 5 stays unknown; ads plus a map pack outweigh organic count. Log the score, never a bare verdict. (c)
6. Never negate a term triggered by a core service keyword without a human look. (c)
7. Run 1- and 2-gram aggregation on 90 days; negate tokens, not queries, where a token repeats. (b)

**Threshold**
8. Ambiguous terms: 3-over-conversion-rate clicks, or 3x target cost per lead, with zero conversions. (d)
9. One conversion at or under 1.5x target is untouchable. (c)
10. More than 10% of a campaign's terms proposed as negatives = fix the keywords, not the terms. (c)

**Match type and placement**
11. Phrase by default; exact for a one-off bad query; broad only for tokens never wanted anywhere. (a, c)
12. Never a bare broad negative for free, cheap, near me, license, reviews, cost, emergency. (c)
13. Add the singular and plural pair; never generate misspellings. (a)
14. Push to the NARROWEST true level: account list only for the universal 40-60, campaign for whole-service junk, ad group as the DEFAULT for everything else. A single-city account gets almost no extra precision from campaign level, so defaulting there over-blocks. (a, c, Jono 2026-08-31)

**Safety**
15. Test every new negative against every enabled keyword in the ACCOUNT and the brand-inclusion list before the push, scoped to the level the negative lands at; any match blocks the write and names the keyword, ad group and campaign. (a, c)
16. A human says yes to the batch. Every negative is logged with its reason, its threshold and its date. (c)
17. Watch impression share after each batch; a drop with no cost-per-lead gain means roll back. (c, b)

**Harvest**
18. A converting term at or under target with status NONE is proposed as an exact keyword in its ad group. (a, c)
19. The harvest runs every pass and reports even when empty; proposed keywords are checked against the negative lists first, and they get their own approval gate, separate from the negatives batch. (c)
19c. Case C creates nothing. /search-terms never builds or restructures an ad group; a STAG candidate is appended to keyword-list.md as a written note for /keywords stag to pick up later, and the run says so explicitly. (Jono 2026-08-31)
19a. Three kinds of winner, checked every run: (A) unbid, status NONE; (B) misrouted, already ADDED but caught by the wrong keyword - trailing the ad group's cost per lead by more than 10%; (C) intent differs from the whole ad group, so it is a STAG candidate and NOT a keyword bolted into a mismatched page. Status NONE alone finds only A. (c, Jono 2026-08-31)
19b. Every promotion into a different ad group is staged as a PAIR - the exact keyword in the new group AND a phrase negative in the old one. Without the negative both groups compete for the term and the routing gets worse, not better. A promotion staged without its negative is held back. (c, Jono 2026-08-31)

**Cadence**
20. Daily for the first 7 days of any new campaign, broad toggle or AI Max; twice weekly through day 30; weekly thereafter; Monday always covers Friday to Sunday. (c)
21. Quarterly: audit the shared lists for conflicts, dead entries and plus signs. (c)
