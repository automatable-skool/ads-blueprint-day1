# How to build Single Theme Ad Groups that actually work
Revised 28 August 2026 · thirteen sections, one test, one worked example at the end · every claim graded (a) official, (b) multi-source, (c) single source or judgment
Next: run the same-ad test on your keyword dump (section 1), then follow the eight-step process in section 5.

A STAG (Single Theme Ad Group) is one ad group built around one search intent. It holds every keyword a searcher might type when they want the same thing, served by one ad written to mirror that intent.

This assumes **phrase match keywords** for a local service business (it works for any niche), and that **Claude Code is connected to your Google Ads account** (OAuth credentials from a Cloud project with Explorer access or better). Claude executes the heavy steps - the Google searches, the Keyword Planner pulls, the pairwise results-page comparisons. Your job is the judgment calls it flags.

Grades: (a) Google documentation or a named Google spokesperson · (b) two or more independent practitioners agreeing, or one with a real dataset · (c) one source, or a judgment call this repo has chosen to make.

---

## 1. The one test that decides everything

Forget word similarity. Forget "these keywords look alike." There is exactly one test for whether two keywords belong in the same ad group.

> **Would you write the identical ad for both searches?**
>
> Same ad = same STAG. Different ad = separate STAGs.

(a) This is Google's own instruction, not folklore. The Quality Score help page says: "Look for ad groups with many different keywords that can't be easily addressed by the same ad. Split these ad groups into multiple ad groups."

**The landing page is NOT part of the test.** (b) Quality Score judges ad relevance keyword-to-ad, and landing page experience separately; the landing page does not move expected CTR or ad relevance. One strong page can serve ten STAGs. Never split an ad group because "the page is different" and never merge one because "the page is the same."

(a) One caveat added in this revision: the landing pages inside an ad group ARE a routing signal. Since September 2021 Google picks between your ad groups for a non-identical search by reading the search meaning, all the keywords in the ad group, and the ad group's landing pages. So each ad group carries **one final URL**. Different ad groups may share that URL. One ad group must never mix URLs.

**How similar the words look is NOT part of the test.** Word similarity is a trap in both directions, as the examples in section 4 prove.

This test survives every framework rename. SKAG, STAG, SIAG and IBAG are all different people relabelling the same question. Learn the test, ignore the acronyms.

## 2. Why STAGs and not SKAGs

SKAGs (one keyword per ad group) died when Google loosened match types. (a) Close variants arrived in 2014 (misspellings, plurals, stemming), took reordered and function words in 2017, took same-meaning synonyms and same-intent paraphrases for exact match in September 2018 and for phrase match in July 2019, and broad match modifier was retired into an expanded phrase match in February 2021. There is no opt-out. Google's own example: [bathing suits] matches "swimming suits".

"plumber toronto" already matches "toronto plumbers", "plumber in toronto", and "plumbers near toronto". Splitting those into separate groups gains nothing and costs a lot.

**Data starvation.** (b) Smart Bidding learns from conversions at the campaign level. Ten campaigns each getting two conversions a month learn nothing. Documented consolidations: 44 non-brand campaigns into 7 gave a 345% lift in conversion value (PPC Mastery, July 2025); a lead-gen account went 19 into 4 for 253% more conversions at 60% lower cost per lead; Catawiki went from over 100 campaigns to about ten for 40% more conversions at the same cost (Google, February 2023); a 208-ad-group account consolidated in 2025 gained 40 to 47% more conversions with cost per lead down 13 to 37% (HopSkip, June 2026).

**Negative keyword starvation.** Over-sculpting stops keywords getting enough impressions to ever prove themselves.

**Maintenance hell.** Every ad test, every negative, every change multiplied by 50 ad groups.

**RSA starvation.** (b) A responsive search ad needs about 2,000 impressions a month before Google will even label its assets. Fifty tiny groups means fifty ads that never get graded.

What phrase match will NOT reliably bridge is **synonyms that are different concepts** - "emergency plumber" against "24 hour plumber". Those you group by hand. That hand-built synonym cluster is the STAG.

**The honest counter-argument.** (b) Some large agencies still run SKAGs and report they win on Quality Score and cost per click (Logical Position, July 2024, across 6,000 accounts, while conceding close variants and broad match have made them weaker than in 2019). Their own condition is 30 conversions a month per campaign, ideally 100. That is why this spec keeps tight ad groups inside few campaigns: bidding learns at the campaign level, so tight groups cost bidding nothing as long as the campaign clears its floor.

**Where SKAGs still earn their place:** your top one or two money keywords, once they carry real standalone volume. Earn the split with data, never guess it on day one.

## 3. Which axis do you split on?

"Intent" gets used loosely. There are twelve axes people split on, and only some of them are intent. Getting this right is the whole game.

### Axes you SPLIT on

**Job or service** - drain cleaning against water heater. This is your main axis.
**Symptom or problem** - burst pipe against no hot water. Different problem, different ad.
**Urgency** - "emergency plumber" against "book a plumber". Different cost per click, different conversion rate, and often its own campaign.
**Customer type** - residential against commercial. Split if you serve both. Often a campaign.
**Problem-aware against solution-aware** - "no hot water" against "water heater replacement". Split when the ad genuinely differs.

### Axes that get their OWN CAMPAIGN

**Brand** - your business name against generic. (a) Always its own campaign, never mixed in.
**Competitor** - a rival's name. Its own campaign, if you run it at all.

### Axes you NEGATE instead of splitting

**Buying stage** - "plumbing costs" against "hire a plumber". Mostly negate, not split. See below.
**DIY against hire** - "how to unclog a drain". Negate.
**Price shopper** - "cheap plumber", "free quote". Negate unless you compete on price.

### Axes you NEVER split on

**Synonyms** - "emergency" against "urgent" against "24 hour". This is what a STAG is.
**City** - Toronto against Mississauga. Never split by default. See section 6.
**Match type** - (b) one keyword in three ad groups by match type is the SKAG habit in disguise. Not a valid reason to split.
**Device** - bid adjustments, not structure.

**The thing that trips everyone up:** in local service lead gen you are not segmenting by buying intent. You are **filtering down to one buying intent** (ready to hire, right now) and then segmenting by job and urgency.

E-commerce and SaaS genuinely split by buying stage, because "best running shoes" and "buy Nike Pegasus 41" are both worth money at different prices. A plumber has exactly one buyer.

Everything upstream of "ready to hire" - "how much does it cost", "how to fix a leaking tap", "plumbing school" - is not a different ad group. It is a negative keyword. (b) That is where 20 to 40% of the average account's waste lives.

## 4. The trap: similar-looking words, different intent

Here is why word similarity fails as a test. Both of these lists look uniform. One is a single STAG, the other is four.

### List A - looks varied, is ONE STAG

These five all take the same ad, "Trusted [Service] Company - Free Quotes":

`[service] company` · `[service] contractors` · `[service] services` · `hire a [service]` · `[service] specialist`

Every one is the same person with the same need: find me a professional to do this job. One ad serves all five perfectly. One STAG.

Judgment call: if in your market "contractors" searchers expect different pricing or positioning than "company" searchers, and you would genuinely pitch them differently, split it. You know your market. When unsure, start together and let the search terms report decide (section 10).

### List B - looks uniform, is FOUR STAGs

**best [service]** - a comparison shopper. The ad is "Rated 4.9 Stars - 500+ Reviews".
**affordable [service]** - price sensitive. The ad is "Fair Upfront Pricing - No Hidden Fees".
**[service] quote** and **[service] cost** - both want a price, and both take the same ad, "Get a Free Quote in 60 Seconds". This is the only pair that merges, and only because the ad is identical.
**book a [service]** - ready to buy. The ad is "Book Online in 2 Minutes - Same-Day Availability".

Five keywords, four different ads, four STAGs.

**Symptoms are always separate.** "burst pipe", "clogged drain" and "no hot water" are different problems. Each gets its own STAG with its own ad ("Burst Pipe? We're On Our Way") because a person with a burst pipe ignores an ad about drains.

And never mix a symptom keyword into a service STAG. "drain cleaning" is shopping for a service; "clogged drain" is a person with a problem right now. They need different ads.

## 5. The process, start to finish

### Step 1 - Dump every keyword

List every way someone could search for the service. Use Google Keyword Planner, autocomplete, competitor ads, and your own customer language. Do not filter yet.

**If your input is a service-by-city matrix** (rows of service stem plus city, with volume and competition), cluster the **service stems**, not the full keyword strings. The city column is handled in section 6 and is not an ad group axis.

Running the same-ad test on 62 city combinations instead of 6 stems is wasted work. Synonym expansion also happens per stem: find the synonyms of "emergency plumber" once, then reuse them everywhere.

**Strip close variants before clustering.** (a) Any two keywords that differ only by plural, word order, a function word, a misspelling, or a same-meaning synonym are one keyword. Keep the one with the most volume and drop the rest. Google's own Redundant Keywords recommendation exists for this reason.

### Step 2 - Cluster by the ad, not the words

For each keyword, write the headline you would want the searcher to see. Keywords that get the same headline go in the same pile. When a keyword could go two ways, ask what this person needs to read in order to click. Different answer means a different pile.

**The intent probe.** For every keyword, answer these four questions before assigning it to a pile. Two keywords only share a STAG if all four answers match.

1. **Price expectation** - what do they expect to pay? "handyman", "contractor" and "company" can carry different price anchors in the same trade. If your pitch changes, the group changes.
2. **Urgency** - do they need it now, this week, or are they researching?
3. **Job size** - "contractors" can imply a bigger or commercial job; "specialist" implies a complex one. If the job you would sell differs, the ad differs.
4. **Stage** - are they ready to hire, comparing options, or just learning? Only the first two belong in your account at all. Step 4 cuts the rest.

These are judgment calls that depend on YOUR market. When you genuinely cannot tell, put the keywords together, tag the group as "watch", and let the search terms report split it later with data. Never guess a split - guessed splits starve data for nothing.

### Step 3 - Verify the clusters against Google (the results-page check)

This is the step almost nobody does, and it removes the guesswork. Google has already decided what intent each keyword carries. You can read its decision straight off the results page.

For each pair of keywords you plan to group together:

1. Search both keywords on Google, in a private window, with the location set to the target city, since local results are location dependent.
2. Compare the top ten organic results and the ads that show.
3. **If three or more of the top ten URLs are the same, Google treats them as the same intent. Keep them together.** (b) Three-of-ten is the common threshold in SERP-clustering tools; stricter tools call 4 to 6 shared "moderate" and 7 or more "strong".
4. **If zero or one URL is shared**, or one keyword shows informational results (guides, "how much does X cost" articles, calculators) while the other shows service pages, Google sees different intent. Split them, or drop the informational one.
5. **Two shared URLs is undecided.** Keep them together and tag "watch". Do not split on a two.
6. Look at the ads too. If competitors are showing visibly different ad angles for the two searches, that is the market telling you the intents diverge.

(c) This is an SEO clustering method adapted to ad groups; no published source applies it to ad structure. That is why the three-of-ten result is a "do not split" signal and never a reason to split on its own - the same-ad test still decides.

The results-page check catches two failure modes: keywords you thought were synonyms but aren't (split them), and keywords you thought were different but Google already collapses (merge them and save the structure).

This is Claude's job, not yours. Claude searches every keyword, compares the top ten URLs pairwise across each cluster, and reports which pairs pass the three-of-ten overlap test and which need a split.

### Step 4 - Cut the low-intent keywords, and verify with Keyword Planner

You only want people ready to hire. Cut anything informational before it ever enters a STAG.

**Auto-cut patterns:** how to · what is · diy · average cost of · calculator · salary · jobs · career · course · training · license · certification · tools · free · cheap · near me free · wholesale · supplier · parts

**The reliable commercial signal is Keyword Planner data, not a live search.** Whether ads happen to show on your one search proves nothing - time of day, budgets and your location all change it.

Pull each keyword through Keyword Planner and keep the ones showing **advertiser competition and a top-of-page bid**. If businesses are paying for the click, it converts for somebody. No competition and no cost-per-click estimate usually means informational or dead traffic.

**Exception:** ultra-local, low-volume terms such as "burst pipe [small suburb]" can show thin Planner data and still be gold. Judge those by the pattern of the parent term instead of cutting them.

**Don't delete, quarantine.** Move every cut keyword to a "cut - low intent" list so a human can review it. A wrong cut is invisible forever; a quarantined keyword gets a second look.

Keyword Planner is also your synonym source in reverse. When a verified cluster is thin, pull the cluster's primary keyword through Planner's related-terms suggestions and add anything that passes the same-ad test and the intent probe.

### Step 5 - Resolve cannibalization before you build

If a keyword could plausibly live in two clusters ("cheap emergency plumber" touches both Price and Urgent), do not put it in both.

1. **Assign it to the single best-fit cluster** - the one matching the searcher's dominant need. In that example it is Urgent: someone with a flood cares about speed first, price second.
2. **Add it as a negative in the losing cluster or clusters** so only one ad group can ever serve it.
3. **Flag clusters that overlap heavily.** If two clusters keep fighting over keywords, they are probably one intent wearing two names. Merge them.

One search must route to exactly one ad group. Anything else splits your data and hands Google the choice of which ad shows.

(a) How Google actually chooses, in order: an exact match keyword identical to the search; then a phrase or broad keyword identical to the search; then, for everything else, relevance - the meaning of the search against all the keywords and landing pages in each ad group; and only then Ad Rank. The relevance layer has existed since 23 September 2021 (this spec previously said Ad Rank decided; that was stale). Relevance helps a tight STAG, but it is a prediction Google makes silently, so negatives still enforce the design.

### Step 6 - Build the group

- **Keywords:** every verified synonym, phrase match. **Three to eight keywords per STAG** is the working range; (b) the published range is five to fifteen. If you have fifteen or more, you almost certainly merged two intents.
- **One responsive search ad** to start, three enabled at most. See section 8 for the asset and pinning spec.
- **One final URL per ad group.** Multiple STAGs sharing a page is fine.
- **Name** the ad group after its intent stem ("Emergency plumber", "Drain cleaning"), nothing else. Section 7 has the campaign naming rule.

### Step 7 - Cross-group negatives, which is what makes the structure real

On an all-phrase build, your keywords alone do NOT enforce your structure. Phrase match matches any search that contains your keyword's meaning, so the generic keyword "plumber [city]" will happily match "emergency plumber [city]" and "best plumber [city]", showing the generic ad to searchers your specific STAGs were built for.

(a) Google's keyword prioritization only guarantees routing when the search is IDENTICAL to one of your keywords. For the long tail it predicts relevance and then falls back to Ad Rank, and routing is not guaranteed.

The fix: **every specific STAG's trigger words become negative keywords on the generic group.**

**On the generic group ("plumber")** add: emergency · 24 hour · urgent · best · affordable · cheap · cost · quote · book, plus every symptom term.

**On the urgent group ("emergency plumber")** add: best · affordable · cost · quote

**On the buy and compare groups** add: emergency · 24 hour

Rule of thumb: any word that defines one STAG is a negative on every STAG it does not define. Do this on day one, not after the search terms report shows the bleed.

**Negatives have no close variants.** (a) A negative "drain" does not block "drains", and "hydro jetting" does not block "hydrojetting". Every routing negative goes in with its plural (or singular) and its common misspelling. Positive keywords get this for free; negatives never do.

**Where each negative lives.** (a) Routing negatives sit on the ad group or campaign they protect. Hygiene negatives (diy, jobs, salary, free, how to, the job-hunting set) go in ONE shared negative list applied to every campaign - a list holds 5,000 terms, a campaign holds 10,000 negatives, and the account-level list is capped at 1,000 so it is skipped.

### Step 8 - Volume check: tight for relevance, merge up for volume

The failure mode of tight groups is a STAG so thin it never serves - low impressions, no data, wasted structure. The fix is never to start loose. Start tight, then **merge thin groups upward**. If a group cannot pull enough impressions or clicks to judge after a few weeks, fold it into its nearest sibling intent.

Floors, from low to high:
- (b) Under about 2,000 impressions a month the responsive search ad never gets asset labels. Merge candidate.
- (c) Under about 1,000 impressions a week is this repo's merge line - flag it in the map.
- (b) 3,000 impressions a week is the Hagakure-grade floor for a group that is meant to learn on its own.

(a) A keyword marked "Low search volume" is checked again by Google about weekly and does no harm sitting there; a keyword with zero impressions for 13 months is paused by Google automatically. Neither status touches Quality Score.

---

## 6. City: the axis you do NOT split on

This is the most common expensive mistake in local accounts, and it is the SKAG instinct wearing a new hat. Three reasons it fails.

**1. You cannot geo-target an ad group.** (a) Location targeting is a campaign-level setting, full stop. An ad group named "Toronto" is not shown only to Toronto. It just holds the keyword "toronto plumber", and a Toronto user searching "emergency plumber" or "plumber near me" cannot land in it, ever. (The single ad-group-level location control Google has added, "locations of interest", is an AI Max feature about geographic intent in keywordless matches. It does not change this rule.)

So city ad groups only ever capture **explicitly geo-modified queries**, which are the minority of local search. Most local intent is implicit.

**2. Close variants already merged the keywords you would be splitting.** (a) "toronto plumber", "plumber toronto" and "plumber in toronto" are functionally one keyword now.

**3. The ad barely changes.** City swaps one word. That is what location insertion is for.

### What to do instead

**Geo-targeting** goes at campaign level across the whole service area. (a) Set it to **Presence**, not the default "Presence or interest" - Google's default and recommended setting also reaches anyone who has shown interest in your area. (b) Every local practitioner source read in 2026 recommends Presence for a service-area business; one documented example is a Seattle cleaner paying for 60 Tacoma clicks over 90 days with zero bookings. (c) The "20 to 35% of budget" figure sometimes quoted for this waste could not be traced to data.

**City in the ad** comes from location insertion in one or two responsive search ad headlines, with default text set. (a) Google requires at least three headlines without insertion.

**City on the page** comes from passing the city as a URL parameter and swapping it into the H1. One strong page, not forty thin ones.

**City-level control** comes from location bid adjustments, which run from minus 90% to plus 900%, based on actual cost per lead by city.

### When a city DOES earn its own structure

Promote, don't pre-build. Run the shell for 60 to 90 days, then pull the search terms report filtered to geo-modified queries.

(c) A city graduates into its own **ad group** (with hand-written copy and a real city page) when it clears roughly **50 or more clicks, or 20 or more conversions a month, on its own city terms**. It graduates to its own **campaign** only when it needs its own budget, its own phone number, or a materially different cost per lead. (b) Multi-location businesses with genuinely separate stores are the one case where campaign-per-location is the published default (3 to 15 distinct markets, with a practical floor of about $500 to $800 a month per location campaign). A single business serving one area is not that case.

You will almost always find it is two or three cities carrying it, not ten. That way you get SKAG-style precision exactly where it pays and never build the seven ad groups that would have got 40 clicks each.

**On city landing pages:** (c) thin, near-duplicate city pages have reportedly triggered manual actions at as few as 30 to 40 pages, and they are a maintenance tax you will abandon in three months. Dynamic insertion into one strong page beats a page farm. If you do build real city pages, they need genuine local content - reviews, service area, local number, real photos - not a find-and-replace on the city name.

---

## 7. Where STAGs sit in the account

```
CAMPAIGN  = the service            (budget + bid strategy + GEO + schedule live here)
  AD GROUP = one STAG               (one intent, one ad, one final URL)
    KEYWORDS  = verified synonyms (phrase match)
    AD        = one RSA, keyword-relevant headlines pinned to pos 1
    NEGATIVES = every other STAG's trigger words, with plurals
```

### Shape A - consolidated, the default for most local businesses

One campaign. Ad groups by job. Use this when no single service clears about 30 conversions a month on its own.

```
CAMPAIGN: Plumbing  (geo: service area, Presence)
  Emergency / 24 hour     emergency, burst pipe, flooding, after hours
  Drain cleaning          clogged drain, drain snake, blocked toilet
  Water heater            water heater repair / replace / no hot water
  Leak repair             pipe leak, leaking tap
  Generic (catch-all)     plumber, plumber near me, plumbing company
                          ↳ negate: emergency, drain, water heater, leak
```

"Plumbing" is not a peer ad group. It is a **deliberate catch-all** and it carries the negatives for every specific group you split out. Without that, it absorbs everything.

(b) Three to ten ad groups per campaign is the published range. Past ten in a campaign under 50 conversions a month, you are splitting hairs the bidding cannot see.

### Shape B - split by service, once you have volume

One campaign per service, each with its own budget and cost-per-acquisition target. Move here service by service as each clears about 30 conversions a month. Emergency is usually the first to earn it: it runs around the clock while the rest run business hours, and it justifies a higher cost per acquisition.

(a) Google's own floor, February 2026: 15 conversions in 30 days per campaign, which may be met across campaigns through a shared budget or a portfolio bid strategy. 30 in 30 days is Google's baseline for a Target CPA; 50 for Target ROAS. So: 15 is the hard floor for a standalone campaign, 30 is when it can carry its own target.

If you want per-service campaigns before you have per-service volume, use a **portfolio bid strategy** across them. It pools the conversion data while keeping the campaigns split, which is the best of both.

### The rule for campaign against ad group

Budget, bid strategy, geo-targeting and ad schedule are **campaign-level settings**. So:

> If it needs its own budget, bid target, schedule, or geography, it is a **campaign**. Otherwise it is an **ad group**.

That single line resolves nearly every structure argument. (a) Google said the same thing in February 2026: keep a split where budgets, bidding goals or real regional operations differ; merge anything that only exists because an old best practice said so.

### Naming

(c) No authoritative convention exists, so this repo uses the simplest one that reads in a report. A campaign name states only what differs at campaign level: "Search - Emergency plumber", "Search - Plumbing", "Search - Brand". An ad group name is its intent stem: "Emergency plumber", "Symptom - burst pipe". Nothing that is the same everywhere (match type, Presence, the service area) goes in a name.

Two build notes when Claude pushes this through the Google Ads API:

- The keywords alone are NOT the account. The push also needs the **ads** (one responsive search ad per ad group) and the **negatives** from step 7, or the structure leaks from day one. Everything lands **paused** - you review it in Google Ads and enable it yourself.
- Always separate **brand** from non-brand. Mixed campaigns inflate your metrics and hide your true acquisition cost.
- (a) Limits you will never hit but should know: 20,000 ad groups per campaign, 20,000 keywords per ad group, 10,000 negatives per campaign, 5,000 per shared list, 20 lists, 1,000 account-level negatives, 50 ads per ad group with 3 responsive search ads enabled.

---

## 8. The ad: responsive search ad spec

One responsive search ad per STAG. The asset spec that current testing supports:

- **Pin two to three keyword-relevant headlines to position 1.** This guarantees the searcher sees their own words. Leave position 2 completely unpinned so Google can test your benefit lines - Licensed, Same-Day, Free Quote. Optionally pin one call-to-action headline to position 3. (b) Adalysis (October 2025) pins proven headlines to positions 1 and 2 to shrink the 47,000-combination space and speed learning.
- **Two to three headlines should contain the keyword.** The remaining headlines carry distinct messages. Do not write fifteen variations of the same sentence.
- **Location insertion** in one or two headlines with default text set, to carry the city (section 6).
- **Ad Strength is a diagnostic, not a goal.** "Excellent" just means you gave Google enough variety to test. Judge on conversions, not on the badge.
- (b) **Three enabled responsive search ads per ad group is the cap.** Extra variants sit paused as a bench.

**On keyword insertion.** The `{KeyWord:Default Text}` tag is safe on a tight phrase-match STAG where you control every keyword, and it is the only way to guarantee the top headline mirrors the search. It becomes dangerous on broad match, where it can pull a competitor's trademark into your headline and get ads disapproved. (b) A UK debt firm was ruled misleading by the ASA in 2018 for exactly this.

Rule: keyword insertion only on phrase or exact, never on broad, and always with a clean default.

**Location insertion is a different feature and much safer.** (a) It pulls from the user's location, regular location or location of interest, not from the query, so it cannot inject a trademark. Worst case is an awkward city or the default text. Keep it to one or two of your headlines so a failed insert just means a different headline serves.

**Ad relevance is the structure alarm.** (a) Quality Score is a diagnostic, not an auction input, but its ad relevance component says whether the ad fits every keyword in the group. (b) Any keyword rated "below average" on ad relevance is a structure fault: move the keyword to a group whose ad fits it, or rewrite the ad. Never leave it.

---

## 9. Settings that decide whether the structure works

Structure is half the job. These campaign settings are the other half.

**Location** - Presence, not "Presence or interest". Whole service area.

**Match type** - Phrase as the default. (a) Broad only once you have conversion-based Smart Bidding running, 30 or more conversions a month, and a mature negative list. Exact for your top money terms. (a) A keyword typed without quotes or brackets is broad - check every import.

**The campaign-level broad match setting** - (a) never enable it on a STAG build. It converts every phrase and exact keyword to broad, and from 1 September 2026 any campaign using it is auto-upgraded to AI Max.

**AI Max** - (a) an optional layer inside an existing Search campaign, not a campaign type. Search term matching uses broad match plus keywordless technology, so your phrase keywords behave as broad the moment it is on. Google says it is ineffective in a budget-limited campaign. (b) Independent 2026 data: median revenue up 13% but median cost per lead up 16% across 250+ campaigns, and one lead-gen account went from $493 to $850 a lead. Rule: off at launch; if enabled later, enable search term matching per ad group, set brand exclusions first, and read results at account level because it moves traffic between campaigns.

**Dynamic Search Ads** - (b) a catch-all only. If run, add every live keyword as a negative to the DSA ad group so it catches gaps, not your own traffic - on non-identical queries Google picks DSA against your keyword ads by Ad Rank. (a) DSA ad groups convert to standard AI Max ad groups from February 2027. Do not stack DSA, Performance Max and AI Max at once.

**Bid strategy, new account** - Start on **Maximize Conversions with no target**. You have no data to set a target from. (b) Some local practitioners start on manual CPC or Maximize Clicks until 30 conversions; Google says Smart Bidding can start without data. Either way, no target on day one.

**Bid strategy, mature account** - Add a Target CPA once you clear **30 conversions in 30 days**. Also add a Target CPA as a guardrail before any big budget increase, or costs per click spike.

**Conversion tracking** - Only count outcomes you actually want. If you count every form fill and 15-second call, Smart Bidding will faithfully go find you more junk.

**Call tracking** - Minimum call duration **1 second** - any connected call counts, voicemail included (Jono's ruling, see `conversion-tracking.md`). A longer threshold only counts leads when the business happens to answer, and a fat-thumb tap never connects anyway. Raise it only if the call details report shows real junk connecting.

**Lead quality** - Feed booked jobs back with **offline conversion import**. (a) This is the single biggest lead-quality lever in a service account, and since August 2026 Target CPA can learn from later journey stages directly. It moves optimization from lead count to money.

**Ad schedule** - Do not hard-exclude overnight on emergency campaigns. One 2am burst pipe pays for the week. Use a negative bid adjustment instead of an exclusion.

**Campaign type** - Search wins for local lead gen. (a) A Search keyword identical to the query always beats Performance Max; otherwise Ad Rank decides. (c) Measured on cost per QUALIFIED lead, Search is reported to beat Performance Max by 25 to 45% across most service industries - agency figures, not audited. Run Performance Max as a small incremental test, not the main engine.

---

## 10. Maintenance: let the data re-draw the lines

The single highest-return recurring task in the account.

### How often to run each pass

- **Weekly** search terms review during launch and after any budget increase
- **Biweekly to monthly** once the account is mature
- **Extra review** after any landing page change, bid strategy change, or seasonal shift
- **Monthly** shared negative list audit
- **Quarterly** match type sweep and full account audit

### The n-gram method

Don't review whole queries, review **fragments**. Pull the search terms report, break every query into one, two and three-word fragments, and total cost and conversions per fragment.

"salary", "diy", "jobs" and "wholesale" light up instantly across hundreds of queries you would never read one by one. This is the analytical core of the weekly workflow, and it is exactly the kind of job Claude Code should be doing on the API rather than you in a spreadsheet.

### The routing check

(a) The search terms report shows which keyword and ad group served each query. Any query that served from the wrong ad group is a cannibalization: add it as a negative where it served, and if it was not identical to any keyword, ask why Google's relevance guess went the other way - usually a keyword or landing page in the wrong group.

### What to act on

**A search term converting at a very different rate than the rest of its group** - possible hidden intent. Break it into its own STAG. Now you have data justifying the split you didn't make on day one.

**Informational queries bleeding in** - add negatives: average · how to · diy · calculator · salary · jobs · course

**A group starving**, under about 1,000 impressions a week - merge it up into its nearest sibling.

**One keyword capturing 90% of the group's traffic** - fine. The others are redundant, not harmful. Leave them.

**A keyword at "below average" ad relevance** - move it or rewrite the ad (section 8).

**A city showing real standalone volume** - promote it, per section 6.

(b) Expect a mature negative program to recover 15 to 30% of spend in the first 30 days.

---

## 11. Common mistakes

1. **Splitting by city.** The single most expensive one. You cannot geo-target an ad group. See section 6.
2. **Grouping by word similarity instead of ad similarity.** Produces one junk "modifier" group with best, cheap, cost and book shoved together.
3. **Splitting by word difference instead of ad difference.** Rebuilds SKAGs by accident and starves the ads.
4. **Treating buying stage as a split instead of a filter.** In local service, "how much does it cost" is a negative, not an ad group.
5. **Skipping the results-page check.** You guess at intent when Google will show you its answer for free.
6. **No cross-group negatives.** Your generic phrase keyword silently eats the specific searches and your carefully built STAGs never serve.
7. **Negatives without plurals.** "drain" blocks nothing that says "drains".
8. **Splitting for the landing page.** The page is not the test. Ad relevance is keyword-to-ad.
9. **Mixing final URLs inside one ad group.** The URLs are a routing signal; two pages in one group confuses which group Google picks.
10. **Mixing symptoms into service groups.** "drain cleaning" plus "clogged drain" in one group means one of them always gets the wrong ad.
11. **Leaving location on "Presence or interest".** It is the default and it is wrong for you.
12. **Counting every form fill as a conversion.** You are training Smart Bidding to find you worse leads.
13. **Turning on the campaign-level broad match setting or AI Max at launch.** Both make every phrase keyword broad, and the first one auto-upgrades to AI Max in September 2026.

Three more that cost less but still cost: setting a Target CPA on day one when you have no data (start on Maximize Conversions) · chasing Excellent Ad Strength, which is a diagnostic and not a target · never revisiting, when a STAG is a hypothesis and the search terms report is the verdict.

---

## 12. Worked example: plumbing

Two campaigns. **Search - Plumbing** targets the GTA on Presence, runs Maximize Conversions, business hours and up. **Search - Emergency plumber** targets the GTA on Presence, has its own budget and a higher Target CPA once it clears 30 conversions in 30 days, and runs around the clock.

### Campaign: Search - Plumbing

**Ad group: Generic (catch-all)**
Keywords (phrase): "plumber" · "plumbing company" · "plumbing services" · "plumbing contractors"
Ad angle: trusted local plumber, free quotes
Negatives: every trigger word below, each with its plural

**Ad group: Drain cleaning**
Keywords (phrase): "drain cleaning" · "drain snaking" · "drain service"
Ad angle: "Drains Cleared Same Day"

**Ad group: Symptom - clogged drain**
Keywords (phrase): "clogged drain" · "blocked drain" · "drain unblocking" · "blocked toilet"
Ad angle: "Unclog Any Drain Today"

**Ad group: Water heater**
Keywords (phrase): "water heater repair" · "water heater replacement" · "hot water tank"
Ad angle: "Water Heater Repaired or Replaced"

**Ad group: Symptom - no hot water**
Keywords (phrase): "no hot water" · "hot water not working"
Ad angle: "No Hot Water? Fixed Today"

**Ad group: Leak repair**
Keywords (phrase): "pipe leak repair" · "leaking tap" · "leaking pipe"
Ad angle: "Leak Found and Fixed"

**Ad group: Price**
Keywords (phrase): "plumber quote" · "plumbing cost" · "plumber prices"
Ad angle: "Free Quote in 60 Seconds"

**Ad group: Reviews**
Keywords (phrase): "best plumber" · "top rated plumber"
Ad angle: "4.9 Stars - 500+ Reviews"

### Campaign: Search - Emergency plumber

**Ad group: Urgent**
Keywords (phrase): "emergency plumber" · "24 hour plumber" · "urgent plumber" · "after hours plumber"
Ad angle: "On Our Way in 30 Min"

**Ad group: Symptom - burst pipe**
Keywords (phrase): "burst pipe" · "burst pipe repair" · "flooding"
Ad angle: "Burst Pipe? Call Now"

City is handled by geo-targeting, location insertion and bid adjustments. Not by ad groups.

Note that "clogged drain" and "blocked drain" share a symptom STAG - same problem, same ad. But neither belongs in the "drain cleaning" service STAG, because a person with a blockage right now and a person shopping for drain cleaning respond to different ads.

---

## 13. Writing the account structure section of keyword-list.md

The map follows `references/output-format.md`. The block below is the shape, and the convention under it is copied from that file unchanged because a script depends on it.

```
# STAG map
Built 2026-08-12 · 1 campaign · 9 ad groups
Next: /campaign-plan to build these, everything lands PAUSED.

## Campaign: Emergency

### Ad group: Emergency plumber
**Keywords (phrase):** "emergency plumber" · "24 hour plumber" · "urgent plumber"
**Negatives:** free · diy · how to · jobs
**Ad angle:** speed - answered in 60 seconds, on site within the hour
```

**Load-bearing convention - do not change it.** `code/build_campaigns.py` parses this file: quoted terms become PHRASE match, bare single words become BROAD negatives. Keep the quoting exactly as shown.

One ad group per heading. Keywords on one line separated by ` · `. If an ad group needs more than about 8 keywords it is probably two STAGs - flag it rather than letting the line run long.

Two consequences of that convention, added in this revision:
- A bare word becomes a broad negative, and broad negatives have no close variants, so the Negatives line lists plural and singular forms side by side: `drain · drains · jet · jetting`.
- A multi-word negative must be quoted to become a phrase negative (`"hydro jetting"`), which also has no close variants; list its joined form too (`hydrojetting`).

Also in the map: the "watch" tags from step 2, merge candidates from step 8, the quarantined cut list carried from `/keywords`, and one final URL per ad group.

---

## Sources

**Google official**
- [About keyword matching options](https://support.google.com/google-ads/answer/7478529)
- [Keyword close variants](https://support.google.com/google-ads/answer/9342105)
- [About ad group and asset group prioritization](https://support.google.com/google-ads/answer/2756257)
- [A guide to keyword prioritization - Ginny Marvin, Google Ads Liaison, SEJ, July 2024](https://www.searchenginejournal.com/guide-keyword-prioritization-query-matching-controls-google-ads/522257/)
- [Google clarifies its stance on campaign consolidation - SEJ, February 2026](https://www.searchenginejournal.com/google-clarifies-its-stance-on-campaign-consolidation/567295/)
- [About your Google Ads account limits](https://support.google.com/google-ads/answer/6372658)
- [About Quality Score](https://support.google.com/google-ads/answer/7050591)
- [5 ways to use Quality Score](https://support.google.com/google-ads/answer/6167130)
- [About keyword status](https://support.google.com/google-ads/answer/2453978)
- [Low search volume](https://support.google.com/google-ads/answer/2616014)
- [About Smart Bidding](https://support.google.com/google-ads/answer/7065882)
- [Target ads to geographic locations](https://support.google.com/google-ads/answer/1722043)
- [About advanced location options](https://support.google.com/google-ads/answer/1722038)
- [About location insertion for RSAs](https://support.google.com/google-ads/answer/9773001)
- [Add negative keywords to campaigns](https://support.google.com/google-ads/answer/7102995)
- [About the broad match keywords campaign setting](https://support.google.com/google-ads/answer/13389795)
- [How AI Max for Search campaigns works](https://support.google.com/google-ads/answer/15910187)
- [Dynamic Search Ads are upgrading to AI Max - Google, April 2026](https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/)
- [The Hagakure method, Catawiki - Think with Google, February 2023](https://business.google.com/en-all/think/search-and-video/catawiki-hagakure-google-ads/)
- [About bid adjustments](https://support.google.com/google-ads/answer/2732132)
- [About Target CPA bidding](https://support.google.com/google-ads/answer/6268632)
- [About offline conversion imports](https://support.google.com/google-ads/answer/2998031)

**Structure: SKAG / STAG / consolidation**
- [Phrase and broad match identical to a query now preferred - SEL, September 2021](https://searchengineland.com/google-ads-phrase-and-broad-match-keywords-that-are-identical-to-a-query-are-now-preferred-374673)
- [Why SKAGs still matter in 2024 - Matt Bowen, SEL, July 2024](https://searchengineland.com/why-single-keyword-ad-groups-still-matter-in-2024-444260)
- [Single Keyword Ad Groups: still relevant in 2026? - Store Growers](https://www.storegrowers.com/single-keyword-ad-groups/)
- [Why SKAGs are no longer a PPC best practice - Unbounce, March 2019](https://unbounce.com/ppc/skags-ppc-best-practice/)
- [SKAGs: still effective? - Jyll Saskin Gales](https://jyll.ca/insidegoogleads/33)
- [STAG vs SKAG 2026 - sitecentre, January 2026](https://www.sitecentre.com.au/blog/stag-vs-skag-campaigns)
- [SKAG vs SIAG vs STAG - Oxedent](https://oxedent.co.uk/skag-vs-siag-vs-stag-in-google-ads/)
- [How to group keywords by search intent - Tenscores](https://tenscores.com/blog/how-to-group-keywords/)
- [Managing Google Ads accounts in the AI era - Brad Geddes, Adalysis, October 2025](https://adalysis.com/blog/managing-google-ads-accounts-ai/)
- [Stop over-segmenting - Andrew Lolk, SavvyRevenue, January 2026](https://savvyrevenue.com/blog/search-campaign-structure-2/)
- [How campaign structure shapes performance - SEL, July 2026](https://searchengineland.com/how-campaign-structure-shapes-google-ads-performance-481332)
- [The Hagakure method - SEL, May 2025](https://searchengineland.com/hagakure-method-google-ads-management-432867)
- [Hagakure structure results - Adchieve, May 2021](https://www.adchieve.com/en/blog/hagakure-structure-results/)
- [Why consolidation is the key - PPC Mastery, July 2025](https://www.ppcmastery.com/blog/tpe-94-why-consolidation-is-the-key-to-success-with-google-ads)
- [Consolidation outperforms expansion - HopSkip, June 2026](https://hopskipmedia.com/why-google-ads-consolidation-outperforms-campaign-expansion/)
- [Account structure in 2026 - Groas, February 2026](https://www.groas.com/post/google-ads-account-structure-in-2026-the-framework-that-actually-works)
- [Account structure best practices - Omologist, August 2026](https://omologist.com/google-ads/account-structure/)
- [Search structure 2026 - TripleDart, April 2026](https://www.tripledart.com/saas-ppc/google-ads-structure)
- [Campaign structure guide - LeadsBridge, June 2026](https://leadsbridge.com/blog/google-ads-campaign-structure/)

**Intent clustering and SERP overlap**
- [mcp-serp-clustering - SERP overlap clustering, 3 of top 10](https://github.com/dredozubov/mcp-serp-clustering)
- [SERP keyword clustering tool - keywordly, January 2026](https://keywordly.ai/blog/serp-keyword-clustering-tool)
- [Keyword clustering by SERP overlap - WriteIntent](https://writeintent.com/service/keyword-clustering)
- [SERP-overlap clustering bands - claude-seo](https://claude-seo.md/skills/seo-cluster)

**Match types, close variants, negatives**
- [Match types best practices - Cypress North, August 2020](https://cypressnorth.com/resources/guides/google-ads-search-keywords-match-types-best-practices/)
- [Close variants explained - Key Principles, March 2024](https://www.keyprinciples.co.uk/googleads-close-variants/)
- [Keyword match types 2026 - Store Growers, March 2026](https://www.storegrowers.com/keyword-match-types/)
- [Negative keywords - Optmyzr, February 2026](https://www.optmyzr.com/blog/negative-keywords/)
- [Negative keywords 2026 list - Groas, February 2026](https://www.groas.com/post/negative-keywords-for-google-ads-the-complete-2026-list-500-keywords-by-industry)
- [Low search volume keywords - Optmyzr](https://www.optmyzr.com/blog/low-search-volume-keywords/)
- [Beat low search volume - HopSkip, October 2024](https://hopskipmedia.com/low-search-volume/)

**Geo and local**
- [Location targeting - Optmyzr, June 2023](https://www.optmyzr.com/blog/location-targeting/)
- [Your location targeting is probably wrong - Adcumen, April 2026](https://adcumenco.com/blog/your-google-ads-location-targeting-is-probably-wrong)
- [Location targeting for service area businesses - White Shark Media, August 2026](https://whitesharkmedia.com/blog/google-ads/google-ads-location-targeting-service-area/)
- [Local PPC strategy for service businesses - bspkn, June 2026](https://www.bspkn.co/insights/local-ppc-strategy-guide-service-businesses-2026/)
- [Google Ads for local service businesses 2026 - Groas, April 2026](https://www.groas.com/post/google-ads-local-service-businesses-2026-complete-management-guide)
- [Multi-location businesses 2026 - Groas, May 2026](https://www.groas.com/post/google-ads-for-multi-location-businesses-2026-campaign-structure-bidding-scale)
- [Franchise and multi-location structure 2026 - Button Block, July 2026](https://buttonblock.com/blog/franchise-multi-location-google-ads-structure-2026)
- [Scaling local landing pages without spam penalties - Search Foundry, May 2026](https://searchfoundry.co.uk/blog/programmatic-seo-on-a-budget-scaling-local-landing-pages-without-spam-penalties/)

**Ads, Quality Score, message match**
- [Quality Score guide - Adalysis, 2026](https://adalysis.com/google-ads-quality-score/)
- [Does Quality Score still matter - Optmyzr, March 2026](https://www.optmyzr.com/blog/google-ads-quality-score/)
- [How landing pages impact Quality Score - Unbounce, August 2020](https://unbounce.com/ppc/how-landing-pages-impact-quality-score/)
- [Message match - Unbounce](https://unbounce.com/landing-pages/message-match/)
- [DKI: a cautionary tale - Tillison, January 2019](https://tillison.co.uk/blog/dynamic-keyword-insertion-cautionary-tale/)

**Automation: AI Max, DSA, PMax, bidding**
- [AI Max automatic upgrade September 2026 - Gruenberg Digital, August 2026](https://www.gruenberg-digital.de/en/ki-blog/google-ads-ai-max-automatic-upgrade-september-2026.html)
- [AI Max: what the data shows - PPC Live, April 2026](https://ppc.live/library/strategy/googles-ai-max-for-search-what-the-data-actually-shows-in-2026/)
- [AI Max: what changed - Connective, June 2026](https://connectivewebdesign.com/blog/google-ads-ai-max-what-changed)
- [DSA best practices - DataFeedWatch](https://www.datafeedwatch.com/blog/dynamic-search-ads-best-practices)
- [Smart Bidding strategies - Optmyzr, September 2025](https://www.optmyzr.com/blog/smart-bidding-strategies/)
- [Google Ads foundation for B2B lead gen - SEL, August 2026](https://searchengineland.com/google-ads-stronger-foundation-b2b-lead-gen-485288)
- [Search vs Performance Max: which drives better leads - Austin Bryant](https://austinbryantconsulting.com/blog/search-vs-performance-max-better-leads/)
- [PMax vs Search benchmarks 2026 - Riverstone](https://riverstonemarketingsolutions.com/pmax-vs-search-benchmarks/)

---

## What changed in this revision

- **Corrected: Ad Rank does not decide between your ad groups.** Since 23 September 2021 Google routes a non-identical search by relevance across each ad group's keywords and landing pages first, Ad Rank last. Steps 5 and 7 and section 10 now say so. The negatives rule stands, because the relevance guess is silent and not guaranteed.
- **Added: one final URL per ad group.** The landing pages in a group are a routing signal. The "landing page is not part of the test" rule is kept for Quality Score, with this caveat beside it.
- **Added: negatives have no close variants.** Every routing negative now carries its plural and joined form; the keyword-list.md quoting convention is quoted verbatim in section 13 with the consequence spelled out.
- **Added: Google's own same-ad instruction** from the Quality Score help page, so the one test is graded (a).
- **Added: campaign floors with dates.** Google's 15 conversions in 30 days (February 2026) as the hard floor, 30 for a Target CPA, 50 for Target ROAS; portfolio strategies to pool below that.
- **Added: ad group floors with sources.** 2,000 impressions a month for RSA asset labels, 3,000 a week for Hagakure-grade learning; the 1,000-a-week merge line is kept and graded (c).
- **Added: 2025-2026 automation changes.** AI Max as an ad-group-level layer that makes phrase behave as broad; the campaign-level broad match setting is opt-in and auto-upgrades to AI Max on 1 September 2026; DSA converts from February 2027. New mistake 13 and two new settings paragraphs.
- **Added: naming rule, API limits, three enabled RSAs per ad group, a routing check in maintenance, "below average ad relevance is a structure fault", and match type and device as axes you never split on.**
- **Re-graded, not removed:** the 20 to 35% Presence-or-interest waste figure, the 30 to 40 doorway-page penalty figure, the 25 to 45% Search-vs-PMax figure, and the city graduation thresholds are all marked (c) because no fetched source carries data for them.
- **Kept verbatim:** the one test and its two exclusions, the four-question intent probe, the "watch" tag rule, the quarantine rule, the city rule in section 6, the three-of-ten SERP check, the 3-to-8 keyword range, the campaign-versus-ad-group one-liner, and the keyword-list.md quoting convention. No lines in the previous file were explicitly marked as Jono's ruling, so every judgment call it contained was treated as one and preserved.
- **Flagged, not fixed here:** the old account structure section example built 54 city ad groups (rebuilt 29 August 2026 as the structure section of keyword-list-example.md) with the city appended to every keyword and contains a markdown table, which contradicts section 6, the /keywords stag command, and output-format.md. It needs a rewrite or it stops being the example.
- **Not cited:** Kirk Williams' reversal on SKAGs could not be fetched from any URL tried, so the SKAG counter-argument is credited to Logical Position (2024) and KlientBoost, and the case against to Store Growers, Unbounce, Jyll Saskin Gales, Oxedent, sitecentre and SavvyRevenue.
