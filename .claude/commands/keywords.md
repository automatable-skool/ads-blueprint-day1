---
description: The service keywords worth bidding on - real volume and click costs for your whole service area, into keyword-list.md
argument-hint: [service or industry, optional] [focus: volume | stag | serp-check | negatives]
---

Build my keyword list. Service + area: $ARGUMENTS (if empty, read `context/business.md`; if that's empty too, run `/context-layer` first - advertising services I don't offer in cities I don't serve is the fastest way to burn a budget).

Two parts, one file. **Part 1** finds and prices every keyword worth bidding on. **Part 2 (the STAG stage - the day-7 machine)** turns them into the account structure and writes it at the TOP of `keyword-list.md`, so the file opens on the decision. Run end to end by default; `/keywords stag` re-runs only Part 2.

## ⛔ Keywords do NOT contain the city - except the main 1-2, inside the service group

**Read `references/stag.md` section 6 before you pull anything.** The rule, and it is not negotiable:

- **Keywords are service terms only:** "emergency plumber", "drain cleaning", "gas fitting". Never "emergency plumber vancouver".
- **Geo-targeting does the location work,** at campaign level, set to **Presence** (never the default "Presence or interest", which shows ads to people anywhere who merely searched about your city - Google confirms this is the default and recommends it, which is why nearly every account has it wrong). Quantify the leak from the account's own geographic report - spend in locations outside the service area - rather than quoting a percentage; the "20-35% of budget" figure circulating in agency blogs has no traceable methodology.
- **City goes in the AD** via location insertion, and on the page via a URL parameter.
- **The one exception (Jono, 2026-08-29): the main city, 1-2 at most, as extra keywords INSIDE the service's ad group.** "emergency plumber" is the core; "emergency plumber toronto" and "emergency plumber mississauga" sit next to it, phrase match, same ad, same page. The bare keyword already catches those searches - the city variant adds separate stats, a bid lever, and the city in the DKI headline. Only cities with real Planner volume, never more than two, never their own ad group.

Why this matters more than it looks: you cannot geo-target an ad group. An ad group called "Toronto" is not shown only to Toronto - it just holds the keyword "toronto plumber". **Someone in Toronto searching "emergency plumber" or "plumber near me" can never land in it.** Most local intent is implicit, so city-modified keywords are the minority of local search, and building the account around them means missing the majority.

**So how do you get local volume?** Set the Keyword Planner's geo target to the service area, then query the BARE service term. Planner returns volume for that area. That is the real number - and it is bigger than the city-modified one, because it includes every implicit local search.

**What the cities are actually for.** You still check them, but only to:
1. Decide the service area to geo-target
2. Spot which cities deserve **location bid adjustments** later, once real cost-per-lead data exists
3. Flag any city with real demand that is outside the current service area, so I can decide whether to add it

Never to create keywords, and never to create ad groups. A city earns its own ad group only by graduating - 50+ clicks or 20+ conversions a month on its own city terms after 60-90 days live. Promote, never pre-build.

---

## ⛔ REQUIRED, ON EVERY GROUP: does this serve an audience you actually serve?

**One question, asked of every group before it goes in the file:**

> **Do you serve this audience, and is this aligned with your business?**

That is the whole test. Not a business-model taxonomy, not a lane you pick once - a relevance check run per group, every time.

Read `context/business.md` first: who the customer is, the verticals, the DON'T list, the revenue gate. Answer from that where you can and say which line you read it from. **Where the file genuinely does not answer it, stop and ask about that specific group. Do not infer it and do not run the pull first.**

**Why this is the blocking question.** A run that skipped it produced six polished ad groups - `seo agency`, `seo audit`, `local seo`, `seo consultant` - for a business whose customers are roofers and HVAC companies. Every group aimed at those customers sat on HOLD. The file looked immaculate and nobody reviewing it would have caught the problem, because an aligned account and a misaligned one look identical on the page. The keywords were all real. They were just pointed at the wrong people.

**Two things the question catches, and they pull in opposite directions:**

- **Out of scope.** The group serves someone you do not sell to - under your revenue gate, a service on the DON'T list, a different buyer entirely. Cut it, and say in one line why. `seo specialist` and `seo expert` are largely people looking for a JOB, not hiring.
- **Missing entirely.** Your audience is real but no group speaks to them, because the seeds only described what you sell rather than what your customer calls their problem. That is the next requirement.

---

## ⛔ REQUIRED: seed from the customer's words, not only from your services

**Every run seeds from TWO lists.** Seeding only from services is why a whole class of keyword never appears at all.

1. **What you sell**, in your words - already in `context/business.md`.
2. **What your customer calls their problem**, before they know what to buy.

**Where list 2 comes from depends on who you serve.** If your customer is a business, build it from every vertical named in `context/business.md`: `marketing for <vertical>` · `marketing agency for <vertical>` · `lead generation for <vertical>` · `leads for <vertical>` · `<vertical> marketing agency` · `advertising for <vertical>` · `get more <vertical> customers`. If your customer is a consumer, build it from symptoms - `burst pipe`, `no hot water`, `water in basement`. `stag.md` section 4 covers symptoms: each is its own STAG and never mixes into a service group.

Both lists go in the same Planner pull. **Report what list 2 found and its volume even when you recommend benching all of it** - a member who cannot see those terms cannot choose them. Skipping this layer is a failed run, not a style choice.

---

## ⛔ REQUIRED: the approval gate

**Stop twice. Never run end to end and hand over a finished file.**

**Gate 1 - after the pull, before grouping.** Show both seed lists, the headline volumes, the groups you intend to build, and your answer to the alignment question for each one. Then stop and ask. This is the cheap moment to catch a misaligned account; after the groups are built it is an hour of rework.

**Gate 2 - after the structure is written, before pointing at `/campaign-plan`.** Show the group tree with keyword counts, anything tagged WATCH or HOLD, the checker's PASS line, and what the budget can honestly test. Then stop.

**A gate is a real stop.** Print the question, end the turn, wait. "I'll assume yes and continue" is not a gate, and neither is asking on the way past.

---

## ⛔ Aligned does NOT mean narrow - read this before recommending anything

The alignment question tells you WHO a group serves. It does not tell you what to launch, and confusing the two is how an account gets wrecked.

**The generic service terms are the backbone and they launch.** `seo agency`, `ppc management`, `marketing agency` carry the volume, and volume is what Smart Bidding needs. Competition on a term is evidence other people are making money there, not a reason to avoid it.

**⛔ THE GUARDRAIL - read this before you recommend anything.** The vertical layer is the one that can wreck an account, precisely because it looks smarter. Narrow terms have better intent, cheaper clicks and a tidier story, and every one of those is true right up until the group cannot gather enough data to learn anything. Then it sits in the account spending slowly, proving nothing, and the owner concludes Google Ads does not work.

Three hard rules, no exceptions:

1. **A vertical or buyer-intent group NEVER launches an account.** It is group 3 onward in build priority. It earns its way up once the generic group has data. **The list's order is build priority ONLY - by default things get built in that order, and that is the list's whole job.** It never dictates what is paused or enabled; no command reads it as status authority, and the owner decides every switch. (Jono, 2026-09-01)
2. **A launch group needs roughly 5,000 searches a month or more.** Below that, at a realistic click cost, it cannot buy the ~50 clicks a month an ad group needs before its numbers mean anything - let alone the 15 conversions in 30 days Google's own bidding wants. If the biggest group in the file is under that, say so plainly: the honest answer is a bigger budget or a different channel, not a cleverer keyword.
3. **Never present narrow-and-cheap as the smart play.** If you find yourself writing "better intent, lower cost per click" about a 2,000-a-month group, you are about to steer someone into a corner. Say what it actually is: a bench group that will not produce a verdict on its own.

**The failure to avoid is not picking the wrong keyword - it is a member running a technically perfect account that never gathers enough data to tell them anything.** Volume first, precision second. Competition on a term is evidence other people are making money there, not a reason to avoid it.

**And expect the generic group to WIN, not merely to survive.** (Jono, 1 September 2026.) The instinct that a tightly aligned vertical group must outperform a broad one is usually wrong, and it is wrong for a mechanical reason: Smart Bidding sorts a large pool of auctions better than a human sorts a small one in advance. Alignment is your theory about who converts. Volume is what lets the machine find out. A big generic group hands it thousands of chances to learn which searches actually pay; a narrow group hands it a few dozen and a hypothesis.

So do not write "this vertical group is more aligned, so it should do better" - that is a guess dressed as a plan. **Say instead: the generic group is expected to win, and the search terms report is what proves or kills the vertical case.** If a vertical genuinely converts better, it shows up in the search terms of the generic group first, with real numbers attached, and THAT is when it earns its own group. Build it from evidence, never from the theory.

---

## ⛔ REQUIRED: the buyer-intent seed layer

**Every run seeds from TWO lists, not one.** Seeding only from services is why a whole class of keyword never appears.

1. **Service seeds** - what you sell, in your words. Already in `context/business.md`.
2. **Buyer-problem seeds** - how your customer describes the problem in THEIR words, before they know what to buy.

**Lane 2 must build list 2 from the verticals in `context/business.md`.** For every industry named there, seed all of these and pull them:

- `marketing for <vertical>` · `marketing agency for <vertical>`
- `lead generation for <vertical>` · `leads for <vertical>`
- `<vertical> marketing agency` · `advertising for <vertical>`
- `get more <vertical> customers` · `grow my <vertical> business`

**Lane 1 builds list 2 from symptoms** - `burst pipe`, `no hot water`, `water in basement`. `stag.md` section 4 covers these: a symptom is always its own STAG and never mixes into a service group.

Both lists go into the same Planner pull. **Report the buyer-intent terms found and their volume even when you recommend benching them** - a member who cannot see them cannot choose them. Skipping this layer is a failed run, not a style choice.

---

## ⛔ REQUIRED: the approval gate

**Stop twice. Do not run the whole command end to end and hand over a finished file.**

**Gate 1 - after the pull, before grouping.** Show the lane you are in and why, the seed lists both, the headline volumes, and the shortlist of groups you intend to build. Then stop and ask to proceed. This is the cheap moment to catch a wrong lane; after the groups are built it is an hour of rework.

**Gate 2 - after the structure is written, before pointing at `/campaign-plan`.** Show the group tree with keyword counts, anything tagged WATCH or HOLD, the checker's PASS line, and what the budget can honestly test. Then stop.

**A gate is a real stop.** Print the question, end the turn, wait for an answer. "I'll assume yes and continue" is not a gate, and neither is asking on the way past.

---

**0. Read `context/business.md` - do not ask what it already knows.** Market (country and language customers search in), business type (ecommerce / local or national brand / internet business), the service list and the DON'T list all live there. If any of the four is missing, that is a `/context-layer` gap: ask the ONE missing thing, write it back to `context/business.md`, and move on. Never open this command with a quiz.

Set the Planner geo target and language from the market before any pull, and **say on screen which market and language you're using** so I can catch a wrong one early. **CPCs are wildly different between markets** for the same service, and the trade word changes by country ("eavestrough" in parts of Canada, "boiler" vs "water heater" in the UK) - the vocabulary the owner recorded is the vocabulary that gets searched.

**0a. Confirm the services - this is the only stop before the pull.** Show the service list from `context/business.md` as one short list and ask: "These are the services I'll research. Add any I'm missing, or say **search** and I'll look for more." Two optional paths, both the owner's call, neither required:
- **They add their own** - type the missing ones; they go into `context/business.md` "What we do" first, then into the seeds.
- **They say search** - run ONE web search on the industry's full service taxonomy ("services a [trade] business offers [country]") and show only what is NOT already listed and NOT on the DON'T list, as candidates to tick. Ticked ones go into `context/business.md`, unticked are never mentioned again. Never add a service the owner did not confirm - advertising something they don't sell is the fastest way to burn a budget.

Then the business type shapes the matrix:

**Ecommerce** - products and categories, not services. Category terms are broad and expensive; product terms (brand + model + attribute) convert far better. Skip the city axis in step 2. Flag clearly that Shopping/PMax is usually the stronger channel for pure ecom and Search alone leaves money on the table - this repo builds the Search side.

**Local / national brand** - the flow below is built for the local case: bare service keywords, geo-targeted to the service area, Presence only. **If they're national, the only change is the geo target** - keywords stay bare either way. Expect materially higher click costs and more competitors nationally, so the affordability read matters even more.

**Internet business** - SaaS, agency, info products, courses. Skip the city axis. The matrix is problem terms × use-case segments ("for agencies", "for Shopify"), plus the competitor and comparison lane - "[competitor] alternative", "best X for [use case]", "X vs Y", "X pricing" - which is where the intent and the margin both live. **Expect the highest CPCs in this repo**; software and B2B terms routinely run several times a local service click, so run step 5's affordability read before anything else and be honest if the budget can't buy enough clicks to learn.

If they're more than one, ask which is the priority and build that first. Don't blend two business types into one matrix - the intent probe in Part 2 can't cluster them coherently.

**Two lanes, same map.** The Keyword Planner volume pull through the API needs **Basic access** (Explorer access, which most new tokens get instantly, cannot call the Planner). Check with `code/test_connection.py` and the access level recorded in "## My setup":

- **Basic access live → the API lane** (steps 0b-3 below, the scripts pull volume and click cost directly).
- **Basic still baking → the CSV lane.** Chances are this is where a new member is. Same seeds, same map, rounder numbers: open Keyword Planner in the Google Ads UI (free, no API) → "Discover new keywords" → paste the seed list from `seeds.txt` → set the location to the service area and the language → **Download keyword ideas** as CSV → drop it at `code/cache/keyword-planner.csv`. Then run `python3 code/planner_csv.py` - it reads Google's export (UTF-16 or UTF-8, tab or comma, the two title lines, bucketed volumes) and writes the same `candidates.csv` the API lane produces, so everything from step 0b point 3 onward runs identically. Volumes come bucketed (1K-10K) on an account with no spend; that is fine, because ranking is **intent tier first, volume only breaks ties** - the STAGs and the pages come out identical. Stamp line two of `keyword-list.md` with "Keyword Planner CSV, [date] - re-run `/keywords volume` when Basic access lands" so the upgrade is never forgotten.
- **`/keywords volume`** - the re-pull once Basic lands: exact volume and top-of-page bids for every stem already in `keyword-list.md`, re-rank, remove the stamp. Structure never changes on a re-pull; only the numbers sharpen.

**Read `context/audit-results.md` if it exists** - the "For /keywords" section lists every keyword sitting in more than one ad group, every ad group under 1,000 impressions a week, and every converting search term that is not a keyword anywhere. Those are structure decisions the audit already made; do not rediscover them.

**Read `references/keyword-redundancy.md` before writing the list** - the four tests that decide whether a keyword earns its own line. Two of them were overruled on 1 September 2026 and the file now says so; both rulings are repeated here because they are the ones that get got wrong:

**⛔ Ruling 1 - every keyword gets its own line, with its match type and its numbers.** Close variants included. No shared unnumbered "close variants" line, no "spellings folded in", no tail of three terms on one bullet. Every keyword in this file is going into a live account and will spend money, so every keyword is shown the same way. If a term is not worth looking its numbers up, it is not worth bidding on and it does not go in the file.

**⛔ Ruling 2 - `near me` always goes in. Never tested against the head term's volume.** Weigh it once and it is not close:
- Adding it when Google would have merged them anyway costs **zero** - Google's own wording is that duplicates "don't compete with each other in the auction". No extra bid, no extra spend.
- Leaving it out when Google does NOT merge them costs the identical-to-query preference, so another ad group can win the search, and it costs per-term reporting on a phrase people genuinely type - permanently, because the search terms report is privacy-throttled.

A free bet against a real loss is not a decision. Add it. The volume figure cannot settle it either way: Keyword Planner rounds into about 60 buckets and aggregates similar terms, so two keywords reading the same number proves nothing about how Google treats them.

**The one test that DOES split a group is Test 4, the modifier test** - `best` / `top` / `rated`, `cheap` / `affordable` / `budget`, `cost` / `price` / `quote` (these three merge with each other and nothing else), `emergency` / `24 hour` / `open now`, `book` / `hire` / `schedule`. Each is a different searcher who needs a different ad, so each is its own group. `near me` is NOT on that list - it does not change who is searching. `code/check_keyword_list.py` fails a group holding more than one of these. Google's own wording: when several of your keywords could match one search *"they don't compete with each other in the auction"* and *"only one of those keywords can trigger an ad"*. Close variants of the primary still go in the ad group (free insurance, and you cannot verify the variant fired because Google hides roughly half of search-term spend) - **and they get their own line with their own numbers, exactly like every other keyword.** `best` / `cheap` / `affordable` always split into their own STAG.

**Read `references/keyword-patterns.md` FIRST** for the buyer-intent buckets, the evidence behind the no-city rule, Planner and API semantics, and the rules at the bottom.

---

**0b. The wide pull, one stop for me (the service area).** Cast wide inside the confirmed services and let the data show what people actually search:
1. Write `seeds.txt` from the CONFIRMED service list in step 0a - one seed per service, plus the two or three phrasings customers actually use for it ("water heater repair", "no hot water", "hot water tank"). However many services they sell is however many seeds there are; the Planner does the expanding. Never a service the owner did not confirm.
2. `python3 code/pull_keywords.py --city "<city>" --seeds-file seeds.txt --floor 50` writes `candidates.csv` - 1,000+ buyer-intent candidates, junk already filtered, ranked.
3. Cluster them under the services confirmed in step 0a, each named by its cleanest head keyword ("drain cleaning", not "snaking a drain", no brands). If the pull surfaces a service with real volume that is NOT on the confirmed list and NOT on the DON'T list, ask about that one only - never re-open the whole list.
4. Propose the municipalities around my city, then `python3 code/check_municipalities.py --probe "<core service>" --munis "<m1,m2>" --country <CC>` for real volume per place. ⛔ **STOP: show me the ranked list and let me approve the set.** Fold obvious sub-districts into their parent; flag thin ones.

**1. Expand the patterns.** **Read `references/keyword-patterns.md` FIRST** - it holds every bucket, sorted by buyer intent, plus the reconciliation on how the city buckets are used. Work top down: urgent/emergency, bare local ("near me", "local", "in my area" - never city-modified), hire/commercial, buy/compare/price, symptom/problem, qualifier/trust, audience/segment. Substitution is free and instant, so expand widely before cutting.

Then add the **service-specific layer** the generic template can't guess: sub-services, the crisis phrasings people actually type, trade jargon. **No misspellings** - close variants already match them on keywords, and negatives have auto-covered misspellings since 2024. Plurals and synonyms still need their own entries on the negative side.

**1b. The service axis - what I actually sell.** From `context/business.md`, list every service as a **stem** (the searchable phrase, not my internal name): "emergency plumber", "drain cleaning", "water heater repair". Then widen each stem with how customers actually say it - the trade word, the layman word, the symptom word ("burst pipe" not just "pipe repair"). `code/generate_keyword_ideas.py` pulls Planner's related terms per stem.

Cut against the DON'T list in `context/business.md` immediately. A service I don't offer never enters the matrix.

**2. The service area - where I actually serve.** *(Local brands only.)* List every municipality inside the service area and travel radius, then run `code/check_municipalities.py` to see which carry real demand. **This does NOT create keywords.** It does three things: confirms the geo-target boundary, ranks which cities may deserve bid adjustments later, and flags any city with real demand that ISN'T in my service area so I can decide whether to add it. Cities with no volume get listed as dropped, so I can see the call was made.

**3. Pull the numbers.** Set the Keyword Planner's geo target to the whole service area, then pull each BARE service stem - never stem + city. For each one:
- Monthly search volume
- Advertiser competition
- Top-of-page bid (low and high)

Then render it into `keyword-list.md`. Volume is for the whole service area, which is the number that actually matters.

**Write `keyword-list.md` in EXACTLY this shape. Copy it.**

```markdown
# Your keyword list

118 searches across 12 cities · 19,650 a month · Canada, English.
Google Keyword Planner, 13 Aug 2026. Click costs are Google's estimate to sit top of page.

---

# Build first · 1

**emergency plumber** · 1,180 a month across the area · about $12 a click
Water through the ceiling. Strongest buying signal on the page, and cheaper than "plumber". The whole budget goes here until it passes the gate.


# What $2,000 a month buys

About $15 a click, so **130 clicks**. At 6 in 100 converting, about **8 booked jobs**.

Enough to test **two ad groups properly**. Switch on all 12 cities and each gets
11 clicks a month, which tells you nothing.

Avoid "24 hour plumber vancouver" for now: $44 to $88 a click for 50 searches a month.

---

# Every service, by city · 51 searches

## Plumber

- Vancouver · 4,400 a month · $9.37
- Surrey · 2,400 a month · $13.76
- Coquitlam · 1,600 a month · $13.74
- North Vancouver · 1,300 a month · $17.22

**14,050 a month across 12 cities.**

## Emergency plumber

- Vancouver · 590 a month · $12.07
- North Vancouver · 140 a month · $19.73
- Surrey · 140 a month · $17.33

**1,180 a month across 9 cities.**

## Gas fitting

- Vancouver · 210 a month · $10.07
- Surrey · 90 a month · $9.11

**350 a month across 4 cities.**

---

# Too small for Google to price · 67

Water heater repair, tankless, blocked drain, burst pipe, sewer line, leak
detection, toilet repair, repiping, 24 hour plumber. 10 to 30 searches a month each.

Kept, not cut. Their parent terms cost $9 to $62 a click, so the intent is
commercial - Google just has too little data to price the small version.
`/keywords stag` folds each into its service group.

---

# Block these · 389 searches

**Commercial and new build · 78** commercial plumbing · restaurant plumbers · new construction plumbing
**Septic, wells, pools · 72** septic tank pumped · well pump repair · hot tub plumbing
**Heating and appliances · 83** furnace pvc pipe leaking · dishwasher not heating · heat pump
**Water treatment · 11** water softener installation · reverse osmosis
**Irrigation and outdoor · 55** sprinkler pipe repair · unclog gutter
**Parts, not a plumber · 90** plumbing wholesale · drain snake rental · toilet replacement home depot

Job hunters and how-to searches are already in account-negatives.md.

---

# Cities dropped · 3

Cloverdale · Pitt Meadows · Downtown Vancouver. Under 50 a month each.

---

# Needs your call · 2

**Port Moody and White Rock** - 260 a month each, not in your service area. Add them?
**"plumber delta"** - Delta is also a faucet brand. Kept, but unproven until real search terms come in.
```

**Hard caps. These are not suggestions:**
- **Group by SERVICE, then cities inside it.** NEVER group by city. `/keywords stag` clusters service stems, so a city-grouped file makes the next step harder.
- **One line of explanation per item. Maximum two.** No paragraphs, no "Step 1 / Step 2", no essays justifying a decision. If it needs a paragraph, it needs a shorter sentence.
- **NO `## How to use this` section.** Banned on this file. The next step is in the header.
- **Header is two lines.** Everything about where the data came from goes on line two, or gets cut.
- **Every number labelled** ("590 a month", "$12.07 a click"), no abbreviations (no CPC, SV, Vol, comp).
- **Only write sections that have content.**
- **Under about 4 services, drop the section headings** and just list them.

The whole file should be scannable in under a minute. If it reads like an essay with data in it, it is wrong.


**4. Qualify.** Keep the cells worth bidding on:
- **The commercial signal is Planner data, not a live search.** Keep keywords showing advertiser competition AND a top-of-page bid. If businesses are paying for the click, it converts for somebody. No competition and no CPC estimate usually means informational or dead traffic.
- **Exception:** ultra-local, low-volume terms ("burst pipe [small suburb]") show thin Planner data and can still be gold. Judge those by the pattern of their parent term, never cut them on volume alone.
- **Auto-cut the low intent:** how to, what is, diy, average cost of, calculator, salary, jobs, career, course, training, license, certification, tools, free, cheap, wholesale, supplier, parts.
- **Don't delete - quarantine.** Every cut keyword goes to a "cut - low intent" section at the bottom of `keyword-list.md` so I can review it. A wrong cut is invisible forever; a quarantined keyword gets a second look.

**5. The affordability line - one line, not a section.** The budget is in `context/business.md` (if it isn't, that's the one thing to ask, and write it there). At these top-of-page bids it buys roughly N clicks a month, which at a typical conversion rate is about N leads - said once, so nobody gets excited about a big matrix the budget can't test. The decision about how many campaigns and ad groups that supports is `/campaign-plan`'s job, not this one's.


**Read `references/search-terms.md` before adding any negative keyword.** It holds the local-service junk taxonomy and, more importantly, the over-blocking warnings. The expensive mistakes are blocking `free` (kills "free estimate"), `how to` (kills "how to hire a plumber"), bare `license` (kills "licensed plumber near me"), and `cheap` for a business that actually competes on price. Negating a buyer costs more than paying for a bad click.

**5b. Negatives do not go in `keyword-list.md`.** The universal list is `/account-setup`'s job (done once, video 7). The industry-specific junk this pull turns up - tools, courses, freebie hunters, other trades, wrong buyer size - is real and has to be found before a single click is bought, because `/search-terms` cannot see it until 30 days of spend exist. But it belongs in **`negatives-staged.md`**, alongside the account list, not in the keyword file. Append it there under its own dated heading and say so in one line on screen.

The ONLY negatives that stay in `keyword-list.md` are the cross-group ones, because they are structure rather than junk: they decide which ad group a search lands in, and `code/build_campaigns.py` reads them from that file.

**⛔ Sections that must NEVER appear in `keyword-list.md`** (Jono, 1 September 2026). This list is closed - if a section is not in the allowed shape above, it does not go in the file:
- **`# Block these`** - goes to `negatives-staged.md` as above
- **`# Held back`** - the near-misses you decided against. Just leave them out; a list of things that are not in the account is not a keyword list
- **`# Needs your call`** - open questions belong on screen where they get answered, not parked in a file where they rot
- **`# What was not checked`** - caveats about the run. Say them on screen; a file that lists what it did not do is padding
- **`**Missing, add on the next build:**`** and every variant of it - "to add later", "not included yet", "consider adding". **A keyword is either in the group or it is not.** If it belongs, put it in the list now, in volume order, and let it take the primary slot if it is the biggest. If it does not belong, leave it out. Naming a keyword you agree should be there and then not adding it is the worst of both: the group is wrong AND the file admits it. (Jono, 1 September 2026, on `seo services` at 74,000 a month being footnoted out of the group it obviously belonged in.)

Every one of these is you talking about the work instead of doing it. The file is a keyword list.

**6. Report - IN CHAT, not in the file.** The file stays tight. The reasoning goes here, in plain English, so I understand the thinking rather than just receiving a list.

Cover five things, short:

**Why these services.** What they have in common and why they suit THIS business. "All five are jobs people call about the same day. I skipped the planned-renovation terms because those people get three quotes and compare for a fortnight, which is a different sale and a different budget."

**Name the one to build first. Only the one.** One service gets the whole budget at launch (see `references/scaling.md` - one group's worth of verdict-grade data is all most budgets buy). Name it, with one line on what earned it - volume, click cost, or how ready-to-buy the searcher is. Say plainly when a cheap click beats a big number.

**⛔ No "on deck", no "next up", no runner-up list.** Never write a line like `**On deck, in order:** Local SEO (group 3), then SEO services (group 1)`. The Pending section is already in build order and every group already carries its own marker, so a second ranking restates the file back to itself and pushes the one decision that matters further down the page. One pick, then move on.

**Why I cut what I cut, grouped by reason with counts and DOLLARS.** Never a raw list. "78 searches were commercial and new-build work you don't do. 90 were people buying parts, not hiring anyone. 72 were septic and wells. Left unblocked, those show your ad about 240 times a month and you pay for every click."

**Which cities didn't make it and why.** Name them and give the number. Also name any city with real demand that ISN'T in their service area - that's free demand sitting unclaimed, and it's their call.

**What the budget actually supports.** Clicks a month, likely leads, and how many ad groups that can honestly test. Be blunt if the budget is too thin to learn anything - that's the most useful thing you can tell someone before they spend.

Then straight into Part 2 - how these get grouped decides whether the account works.

---

**No Google Ads account at all yet:** Google autocomplete, People Also Ask, and competitor ads via `/scrape-competitors` still build the seed list and the service axis. Volumes are marked ESTIMATE until the CSV lane or the API lane runs - the qualification rule in step 4 can't run on guesses, so say so at the top of `keyword-list.md`.

---

# Part 2 - the account structure (the STAG stage)

Turn the research in `keyword-list.md` into the account architecture: the `# Your account structure` section at the top of `keyword-list.md`. This is the step that decides whether the account works - structure leaks show up later as low Quality Scores everywhere, and no amount of ad writing fixes a badly drawn group.

**Read `references/stag.md` FIRST and follow its process exactly.** What follows is the running order, not a replacement for the spec.

**Requires:** the research sections of this file (Part 1 above). If they are thin or unqualified, say so before clustering - clustering bad input just produces a tidy bad account.

**Focus mode:** `/keywords stag` runs only this part; `/keywords serp-check` or `/keywords negatives` runs one stage of it.

---

**The one test that decides everything - apply it at every step:**

> **Would you write the identical ad for both searches?** Same ad = same STAG. Different ad = separate STAGs.

**⛔ This test is the authority. Nothing overrides it - not volume, not SERP overlap, not a tidy-looking group.** If the honest answer is "no, those need different ads", they are different groups, full stop. Two failures to watch for, both of which have already happened:

- **Different SERVICES never merge, however similar the words look.** "seo agency" and "local seo services" share a word and nothing else. One is national organic SEO; the other is Google Business Profile, the map pack and citations. Different work, different buyer, different ad, different landing page - so different groups, and usually different campaigns' worth of thinking. Same trap: "google ads management" vs "google ads audit", "web design" vs "website maintenance". **Before merging any two keywords, say what service each one is asking for.** If the two answers are different services, stop - no amount of SERP overlap makes them one group.
- **A shared modifier is not a shared intent.** "local", "best", "cheap", "near me" attach to a service; they do not create one. Fold `near me` and `best` variants into the group whose SERVICE they modify, never into a group named after the modifier.

When the same-ad test and the SERP check disagree, **the same-ad test wins and the SERP result gets discarded.** The SERP check is a tiebreaker for pairs that are genuinely 50/50 on the same-ad test - it is not evidence that can merge two different services, and it has produced exactly that error off a bad cache. If a SERP result is telling you to merge two things you would write different ads for, the SERP data is wrong or wrongly located. Check it before believing it.

**1. Cluster the SERVICE STEMS, not the full keyword strings.** The matrix is service × city. City is NOT an ad group axis (spec section 6) - running the same-ad test on 62 city combos instead of 6 stems is wasted work. Synonym expansion happens per stem too: find the synonyms of "emergency plumber" once, reuse everywhere.

**2. Run the intent probe on every keyword** (spec section 5, step 2). Two keywords only share a STAG if all four answers match:
1. **Price expectation** - what do they expect to pay?
2. **Urgency** - now, this week, or researching?
3. **Job size** - does the job I'd sell differ?
4. **Stage** - ready to hire, comparing, or just learning?

When I genuinely can't tell: put them together, tag the group **"watch"**, and let the search terms report split it later with data. Never guess a split - guessed splits starve data for nothing.

**3. The SERP check - OPTIONAL, OPT-IN, AND IT RUNS LAST.** Do not run it inline. Finish steps 1, 2 and 4 through 7, write `keyword-list.md` in full, then offer it.

**What it is for:** not research - a lie detector on your own grouping. You borrow Google's opinion of "are these two searches the same question?" instead of guessing. It earns its place only on pairs the same-ad test in step 1 could honestly call either way - "seo agency" vs "seo company", "local seo services" vs "local seo agency". A pair that is obviously the same intent, or obviously not, does not need it.

**The reading, once you have the results:**
- **3 or more of the top 10 URLs the same → Google treats them as the same intent → keep them together**
- Barely overlapping, or one shows informational results (guides, cost articles, calculators) while the other shows service pages → split them, or drop the informational one
- Competitors running visibly different ad angles across the two → the market is telling you the intents diverge

---

**⛔ One search per KEYWORD, never one per pair.** This is what keeps the count survivable. Ten groups of four keywords is 40 searches, not 780 pair-searches. Pull each unique keyword's top 10 **once**, cache it, then do every pairwise comparison offline against the cache. Never re-search a keyword you already have. If the count still runs past **40 searches, stop and ask** before pulling - a bigger sweep needs Jono's say-so, not a longer loop.

**⛔ Ask before you pull, with the number on screen.** Never start the searches on your own. Say exactly this shape and wait:

> Structure is done and `keyword-list.md` is written. I found N ambiguous pairs, covering M unique keywords - so M searches against Google.
> This is the only step that scrapes google.com, and Google rate-limits it. It may CAPTCHA partway through, in which case I stop and you get partial results.
> The structure stands without it. Run the check? (yes / no / just the top few pairs)

A "no" is a complete answer. Ship the file with those pairs tagged **unverified** and move on - the structure is not blocked on this.

**⛔ Location: set it, or ask.** Read `context/business.md` first. If it names a service area, use it. If it does not, or the business is national/remote with no city, **stop and ask which location to search from** - never pick one, never run unlocated. Google ignores the `uule` parameter in favour of the exit IP, so a Vancouver machine returns the Canadian auction for a US campaign. Route the pull through a server-side geo source (the Apify actor with a residential proxy in the target country) rather than a local browser, which is both the geo fix and the rate-limit fix.

**⛔ Validate the country, never just the row count.** A pull is not clean because rows came back. Check the returned domains actually look like the target market before writing a single overlap score. A pull that reports "success" with `.co.uk`, `.co.za` and `.in` domains on a US campaign is a failed pull, and it has happened. Presence is not correctness. Name the location and the date next to every overlap claim you write into `keyword-list.md`.

**⛔ A block STOPS the run - it does not get logged 40 times.** Google's bot protection serves a CAPTCHA or a `/sorry` redirect. Detect both, plus an empty ad block, which is a failure until a second method confirms it. On the first block:
1. **Stop immediately.** Do not continue the loop, do not retry in a tighter loop, do not write a new scraper to get around it
2. Keep what you already pulled - partial results are fine and useful
3. Write the unfinished pairs into `keyword-list.md` under `# SERP check outstanding · N pairs` and tag those groups **unverified**
4. Tell Jono on screen: how many completed, how many are outstanding, and that it can be re-run later
5. **Never swap in Semrush, another SERP API, or any other index.** That is a different dataset answering a different question. If a substitute genuinely looks right, ask - it is Jono's call

The rest of the run never blocks on this. The structure ships either way.

**4. Resolve cannibalization before building anything.** A keyword that could live in two clusters ("cheap emergency plumber" touches Price and Urgent):
1. Assign it to the single best-fit cluster - the searcher's dominant need (someone with a flood cares about speed first)
2. Add it as a **negative** in the losing cluster(s), so only one ad group can ever serve it
3. If two clusters keep fighting over keywords, they're one intent wearing two names - **merge them**

One search must route to exactly one ad group. Since 23 September 2021 Google routes a non-identical query by reading each ad group's keywords AND landing pages first, then Ad Rank - the relevance guess is silent and can be wrong, so cross-group negatives are still the only thing that makes the routing certain. This also means **every ad group carries one final URL**: a shared page across groups gives Google nothing to route on.

**5. Size each group. 3 to 15 keywords, 3-8 being the comfortable middle.** Over 15 means two intents got merged - go back to step 2.

**⛔ Under 3 keywords is not a group and must never ship.** (Jono, 1 September 2026, on a two-keyword "Google Ads audit" group.) Two keywords cannot pull enough impressions to prove anything, so the group sits in the account forever looking like a decision somebody made. There are exactly three endings and you must pick one before the file is written:

1. **Top it up.** Run it - do not eyeball the pull:

   ```
   python3 code/topup_group.py "<the group's primary keyword>"
   ```

   It searches the candidate pull you already paid for, drops anything already in `keyword-list.md`, drops tool/job/course/named-competitor junk, and prints paste-ready lines with the bid range where the metrics pull has one. **Only keep the ones you would write the same ad for** - it ranks by volume, it does not judge intent. If it prints nothing, the pull is exhausted and the answer is 2 or 3.
2. **Merge it** into its nearest sibling intent
3. **Cut it**, and say in one line why it was cut

A keyword the top-up finds with no bid data is still fine to add - volume is what decides the group is viable, and the bid range fills in on the next `stem_metrics.py` run.

**Circle back at the end of the run and check every group again.** Thin groups appear after cannibalisation resolution moves keywords out in step 4, so a group that was fine at step 2 can be down to two by step 6. Re-count before writing the file. `code/check_keyword_list.py` fails the run on any group under 3, so this is not optional.

**6. Cross-group negatives - this is what makes the structure real.** On an all-phrase build, keywords alone do NOT enforce the structure: phrase match will happily serve the generic "plumber [city]" ad to someone searching "emergency plumber [city]". Google's keyword prioritization only protects identical searches; the long tail falls back to Ad Rank.

**Every specific STAG's trigger words become negatives on the generic group.** Rule of thumb: any word that defines one STAG is a negative on every STAG it doesn't define. Build the full negative list into the account structure section - day one, not after the search terms report shows the bleed.

**7. Volume floor.** Tight for relevance, then merge thin groups UPWARD - never start loose. Any group that can't pull roughly 1,000 impressions a week is a merge candidate; fold it into its nearest sibling intent. Mark these in the map rather than silently dropping them.

---

**⛔ Ask for the city BEFORE any volume pull, on a local service business.** "Which city or service area should I pull volume for?" National volume for a plumber is a meaningless number - it counts searches in cities they will never drive to, and it is usually 10-30x the real figure. Set the Planner geo target to that area, pull volume and top-of-page bid for it, and **name the location, the language and the date at the top of the file** so nobody mistakes it for national data. Ecommerce and internet businesses skip this and pull nationally - say which lane you are in on screen.

**The primary keyword is the highest-volume term in the group**, listed on its own, with the rest of the STAG under it in volume order. If the biggest term is not the one that names the group, two intents got merged - split it.

**⛔ Keep the group blocks bare.** A group is its heading, `**Primary keyword**`, `**The rest of the group**`, and at most one `**Notes:**` line if something genuinely needs saying.

**⛔ `Notes:` is ONE line. Never two, never a wrapped paragraph, never a sub-list.** Keep the decision, drop the reasoning that led to it - "a consultant hunter may expect an hourly rate, not a $9,500 build. The search terms report settles it." is finished. If it will not fit on one line, the extra sentences are working notes and they belong in chat, not in a file someone has to scan for keywords. Most groups need no note at all.

**⛔ EVERY keyword line carries its match type, its volume and its click cost. No exceptions, ever.** Not close variants, not "spellings folded in", not a tail of three terms sharing one bullet. A line like `- local seo services near me · local seo companies near me · local seo optimization` is banned (Jono, 1 September 2026): three keywords, no match type, no volume, no cost. Every one of those is going into a live account and will spend money, so every one gets its own line and its own numbers - and if a term is not worth looking its numbers up, it is not worth bidding on and it does not go in the file. There is no "close variants" bullet and no heading for one. `code/check_keyword_list.py` fails any keyword line missing a match type or a volume. **No `Service:` line, no `Same ad because:` line, no `Why these belong together`, no `The catch`.** Every extra labelled block is another thing between the reader and the keywords, and a file nobody reads is a file that never gets checked.

**Split the file into `# Built · N` and `# Pending · N`**, the same way the SEO `keyword-map.md` splits into Written and To build. Built is verified against the API on every run - the account is the source of truth, not the file. If they disagree, the account wins and the file gets corrected.

**⛔ Both headings stand alone. No preamble under either.** Not "verified against the API on <date>", not "the account is the source of truth, not this file", not a paragraph describing which campaign already exists and how many negatives it holds. The count is in the heading and the groups are underneath - that is the whole message. Verification is something you DO before writing the file, not something you narrate inside it. This is a keyword list, not a diary: if a sentence does not change which keyword gets bid on, it does not go in.

**Every keyword ships with its match type and its own numbers.** Match type second, right after the keyword - `keyword · phrase · volume · click cost` - then volume and click cost for the targeted location, on its own line, one keyword per line. **Phrase is the default and gets written out on every single line**, never implied by a heading and never dropped because the whole group happens to be phrase. It is the setting that decides how wide each keyword casts, so the owner reads it next to the keyword or not at all. A `·`-separated run-on list with no numbers is not research - the whole point of the pull is that the owner can compare terms, and they cannot compare what is not on the page.

**Never write ad copy, angles or positioning into this file.** What the ad should say is `/write-ads`, which runs after `/scrape-competitors` has found what nobody in the market is claiming. A keyword file that pre-writes the angle has guessed it before any competitor data exists.

**Write the `# Your account structure` section at the top of `keyword-list.md`** - the account architecture, above the research sections, so the file opens on the decision, per `references/output-format.md`:
- Campaigns = service · Ad groups = STAG, service only, **never city** · Keywords = the cluster's synonyms, phrase match, **plus the service with the 1-2 biggest cities inside the same group** (Jono, 2026-08-29 - same ad, same page, cities with real volume only) · Location = campaign level, whole service area, Presence
- The cross-group negative table from step 6, as **ONE table in this section** - never repeated inside each ad group block, where it reads as though something is already being blocked. Head it with the line that nothing is blocked yet: `/campaign-plan` attaches these at build time.
- "Watch" tags from step 2 and merge candidates from step 7, flagged
- Nothing else. No cut list, no held-back list, no open questions

This file is what `/campaign-plan` builds from, so it has to be exact.

**Then generate `keyword-list.html` - the build-off-it table view. Every time `keyword-list.md` is written or updated.**

The markdown is for reading and deciding. The HTML table is for BUILDING: one screen where someone scans the account in build priority order without opening the file. The no-tables rule bans tables in markdown deliverables; this HTML file is the one sanctioned table.

- **One file, `keyword-list.html`, saved next to `keyword-list.md`.** Self-contained: inline CSS, no external scripts or images. Opens in any browser.
- **The house style, exactly - same as the SEO `keyword-map.html`:** cream canvas (`#f5f4ed`) with one ivory card (`#faf9f5`, 16px radius, hairline border, soft shadow) holding the table. Primary rows sit on sand (`#eeece3`) with a serif group number, a coral (`#d97757`) uppercase mono label naming the ad group plus small status pills (Built/Pending flat grey, Launch green, Watch amber, Hold red), and bold keyword. The rest of the group indents with a `↳` arrow in muted grey. Match type in a small muted column; volume and click cost right-aligned in mono. If a `keyword-list.html` already exists in the repo, copy its CSS verbatim.
- **One table, ad groups in build priority order** - same order and numbering as the file. Nothing re-sorted.
- **Each ad group is a group of rows:** the primary keyword row first (bold with a shaded background), the rest of the group beneath it. Columns: **# · Ad group · Status (Built / Pending, plus LAUNCH / WATCH / HOLD tags) · Keyword · Match type · Searches a month · Click cost**. Primary vs rest must be obvious at a glance.
- **Built groups visibly marked** (muted row style plus the tag). Cross-group negatives and the money section stay out - this is the keyword view, not the whole file.
- **Same labelling rules:** every number labelled in the header, no abbreviations, no CPC/Vol.
- **Regenerate the WHOLE file from `keyword-list.md` every time.** The markdown is the single source of truth - never hand-edit or patch the HTML.
- **End the chat report with the clickable absolute path on its own line:** `file:///.../keyword-list.html`.

---

**⛔ RUN THE CHECKER BEFORE YOU REPORT ANYTHING. The run is not done until it passes.**

```
python3 code/check_keyword_list.py keyword-list.md
```

It exits 1 and prints a FAIL for every structural rule the file breaks: a keyword with no match type, a keyword with no volume, two services merged into one group, more than one campaign, a group over 15 keywords, and any SERP-overlap claim written without the location and date it was pulled for.

**A FAIL means the file is not finished. Fix it and run it again.** Do not report the run as complete, do not point at `/campaign-plan`, and do not explain away a failure in chat - the checker is the gate, not a suggestion. Paste the final PASS line into the report so it is visible that it ran.

**The one it exists for:** a group holding two different services. `seo agency` and `local seo services` share a word and are not the same job - local SEO is Google Business Profile and the map pack, not organic SEO.

**How it decides:** it strips the seller words (agency, company, firm, services, near me, best) off every keyword, leaving the job actually being bought, and **fails any group left holding more than one.** That is deliberately blunt. No word list can separate `ppc` / `sem` (one job) from `drain cleaning` / `water heater repair` (two jobs) - they are the same shape. So it does not try to guess: it flags every one and makes you answer.

**WARN lines do not block.** They list groups whose keywords read as synonyms - `ppc` / `sem` / `paid search` - and just want you to ask once whether the same ad really covers all of them.

**⛔ Nothing gets added to the file to satisfy the checker.** No `Service:` line, no `Same ad because:` line, no justification block. `keyword-list.md` is a document a human reads, not a form. If a FAIL is wrong, say so on screen and move on - never pad the file to turn a light green.

---

**Report:** the account tree as designed (one campaign → ad groups → keyword counts), every SERP-check split or merge with its evidence, anything tagged watch, the checker's PASS line, and the honest note on which groups the budget can genuinely test at once. Then point me at `/campaign-plan`.
