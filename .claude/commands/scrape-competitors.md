---
description: Their live ads - table stakes, gaps, and a swipe file grouped by angle
---

Scout the competition. Only for the top 3 clusters in `keyword-list.md` - depth beats breadth here.

**⛔ NO TABLES IN THIS FILE. EVER.** `context/competitor-ads.md` is read by a human on a phone. Every count, claim and keyword goes on its own line with its own labels, `·` separated - never a markdown table, never pipe rows, never a CSV block. This file has shipped as tables twice and it is not acceptable. See the no-tables rule in CLAUDE.md for the shape.

**Read `references/file-examples.md` for the exact finished shape of `competitor-ads.md` - copy it, do not reinvent it. Then `references/competitor-intelligence.md` FIRST** - the four sources and their blind spots, the live-SERP sampling method, the claim buckets, the swipe rubric, the copy and trademark line, and the rules at the bottom.

**0. Already spending? Start with Google's own data.** If the account has impressions, run `python3 code/auction_insights.py --customer <id> --days 30` FIRST. Impression share, overlap and who outranks me is Google's first-party answer to "who do I actually lose to" - better than anything scraped. It is empty on a new account and hides anyone under 10% impression share, so a short list is not a small market. Then carry on below for the outside-in view.

**⛔ Before any scraping starts: say the number, then ask.** This command hits google.com harder than anything else in the repo, and Google rate-limits it. Count the searches first - keywords x devices, plus one Transparency Center request per advertiser - and put it on screen before pulling anything:

> This sweep needs N Google searches and M Transparency Center lookups. Google rate-limits both; the Transparency Center caps around 25 requests per IP. It may CAPTCHA partway, in which case I stop and you get partial results. Go?

Keep the sweep to the top 3 clusters. If the count runs past **40 searches**, cut the keyword list rather than the pause between requests, and say what you cut.

**⛔ Route through server-side geo, not a local browser.** Google ignores the `uule` parameter in favour of the exit IP, so a Vancouver machine captures the Canadian auction while the campaign buys the American one - different advertisers, different ad text, and the screenshots are pictures of the wrong market. Pull through the Apify actor with a residential proxy in the target country, then render its saved HTML locally for the per-advertiser screenshots. Verify the country in the returned domains before believing anything; a pull with `.co.uk` or `.co.za` domains on a US sweep is a failed pull, not a finding.

**⛔ A block STOPS the sweep.** Detect the CAPTCHA form, the `/sorry` redirect, AND an empty ad block - empty is a failure until a second method confirms it, never a "thin auction" finding. On the first block: stop, keep the partial results, say how many keywords completed and how many are outstanding, and leave it for a re-run. Do not loop through the remaining keywords logging the same error, do not retry in a tighter loop, and do not write a new scraper to get around it. Never substitute a different data source without asking.

**⛔ Check the advertiser parser before you trust a single row.** If the advertiser column comes back as `google.com`, as a stringified dict, or as two URLs concatenated with no separator, the parser is broken and the sweep has captured nothing - say so and fix it rather than writing a claims table on garbage. Sanity test: every advertiser must be a plain domain that is not google.com.

**1. Gather.** Pull my competitors' live ads two ways:
- Google Ads Transparency Center (adstransparency.google.com) - search each competitor's name; use the Apify actor `solidcode/ads-transparency-scraper` if available, otherwise fetch and read directly. Know its limits: no API, about 25 requests per IP before it rate-limits, unverified advertisers don't appear at all ("no ads" means "not verified or not advertising"), and since May 2025 the payer name can be the agency rather than the business. Ad longevity is the signal - an ad running 200+ days is an ad that pays.
- Live SERPs: search my top keywords with the location set inside the service area, **one pass, mobile and desktop** - the whole sweep is minutes, not days. Record every ad that shows (advertiser, headlines, descriptions, sitelinks, call button, offers). **Screenshot the whole ad block on every keyword** and save it to `context/competitor-ads/serp-<keyword-slug>-<desktop|mobile>.png`. Transcribed text loses everything that actually wins the click: sitelinks, callouts, star ratings, the call button, image and location extensions, how much vertical space each ad eats, and who sits above whom. Ads render client-side now, so take the shot after the block has painted, not on first load. Ads rotate and run on schedules, so an advertiser seen once is labelled "seen once" and one seen twice is "running" - both count. If I want fuller coverage, I re-run this in a few days and it only adds new advertisers; it never blocks the build. Spy tools (Semrush, SpyFu) under-count local advertisers - use them as a cross-check, never the source.

**1a2. Screenshot each advertiser's ads in the Transparency Center.** While you are in adstransparency.google.com for step 1, capture the rendered ad preview for every advertiser worth swiping and save it to `context/competitor-ads/<advertiser-slug>.png`. The Transparency Center is the only place that shows the ad assembled the way Google actually served it, and it is the only capture that survives the ad being turned off. Grab the ad's run dates in the same shot where they are visible - an ad running 200+ days is an ad that pays, and that is the single strongest signal in the sweep. Note in the file which shots came from the Transparency Center and which came off a live SERP; they are not the same evidence.

**⛔ 1a. Do NOT report auction density. Removed 1 September 2026 (Jono's ruling).** No advertiser-count-per-keyword section, no "thinnest first" ranking, no START HERE flag based on how busy an auction looks. The capture ceilings out at about 6 advertisers per device, so a keyword with 6 and a keyword with 25 come back looking identical, and the resulting table reads as precise while the dense end is guesswork. It also changed no decision: `/campaign-plan` picks the launch ad group from `keyword-list.md` order, which `/keywords` already ranked. **If you find yourself counting advertisers per keyword, stop - that is not this command's job.** Real competitive pressure comes from Auction Insights once the account is spending (`code/auction_insights.py`), which is Google's own first-party answer rather than a scrape.

**⛔ THE SHAPE. Copy `keyword-list.md`, not a run-on line.** Every competitor, every ad, every page gets a heading and **Bold label:** lines under it. One kind of fact per line, four facts a line maximum. This is what gets shipped and rejected every time:

```
- **SavClicks** · `savclicks.com` · [shot](x.png) · "Marketing Built For Home
  Service Companies" · five stars, 500+ clients, 3000+ #1 rankings · Google,
  Meta and Webflow badges · 100% Satisfaction Guaranteed · no price, no speed
  · button above the fold, no form · closest page in the market to your buyer
```

Ten facts on one line is not a line, it is a paragraph with dots in it. Nobody reads it. This is the shape:

```
## SavClicks · savclicks.com

- Screenshot: [savclicks.png](competitor-pages/savclicks.png)
- Headline: "Marketing Built For Home Service Companies"
- Proof:
  - five stars
  - 500+ clients
  - 3,000+ #1 rankings
  - 15,000+ leads
- Badges:
  - Google
  - Meta
  - Webflow
- Guarantee: 100% Satisfaction Guaranteed
- Not there:
  - no price
  - no speed claim
  - no form, just a button above the fold
- Why it matters: the closest page in the market to your buyer. Only 7 days old
  in Google's library despite claiming 3 years trading.
```

**Plain labels, never bold** - a page of bold labels is shouting, and nothing stands out when everything does. **A label with more than one value NESTS**, one value per sub-bullet. Never `Proof: five stars · 500+ clients · 3,000+ rankings` - that is the wall of text the table was replaced to avoid. One thing per line is the whole point.

**Run `python3 code/check_readable.py context/competitor-ads.md` before reporting.** It exits 1 on any table and any bullet carrying more than four facts. A FAIL means the file is not finished - fix it and run it again. Do not report the sweep done on a red check.

**1b. Their pages - the most exploitable finding in the whole sweep.** For every advertiser in step 1, fetch the page the ad lands on (Apify `apify/website-content-crawler`, or WebFetch when the token is missing) and record above the fold, per competitor:
- **Homepage or matched page** - lead with this. Most local advertisers send paid traffic to their homepage; every one that does is beaten by a matched page alone. Give me the count.
- **Message match** - does the page headline keep the ad's promise
- **Social proof** - star rating, review count and source, testimonials present, client logos
- **Credentials** - licence number, insured, bonded, BBB, trade badges, years in business
- **Offer** - what it is, and whether the ad's offer actually appears on the page
- **Price** - a real number, a range, or "request a quote"
- **Risk-reversal** - the guarantee in their words
- **Speed promise** - response time, arrival window, availability
- **CTA** - form / call / booking, above the fold or not, how many form fields
- **Photos** - real job photos or stock

**Inventory only - record what they show, never how to beat it.** Building and testing pages is the month 2 CRO track; proof scoring is `competitor-proof-audit.md`. Write it as a **Their pages** section in `context/competitor-ads.md` - `/landing-page` reads it to know what its page has to beat.
**1c. The LSA block (local service lane only). Check it, but only WRITE it when there is something to say.** On the same searches, record whether **Local Services Ads sit above everything** and how many competitors carry the green Google Guaranteed badge. If most of the market is badged and I am not, say so loudly and point me at `/lsa-setup` - it takes days to weeks to verify, so it needs starting early. **If no LSA block appeared, that is ONE LINE in the coverage header - `no LSA block on any keyword` - never a section.** A heading, a bolded "Not applicable" and three sentences explaining that the lane is closed to everyone is four lines spent saying nothing (Jono, 1 September 2026).

**⛔ THIS FILE IS EVIDENCE, NOT ADVICE (Jono's ruling, 1 September 2026).** `context/competitor-ads.md` exists to do exactly four things and nothing else:

1. **THE ADS - the market's best lines, grouped by angle with their counts. THIS IS THE POINT OF THE FILE.**
2. **The landing pages**, ranked by proof density - where those lines lead

Written in three sections: the read, the ads, the pages. Anything that pushes the ads down the page is wrong.

**It does not tell me what to do about any of it.** No "match this", no "ignore that", no "usable / blocked", no gaps analysis, no pairing a competitor's angle with my proof, no "matching costs you nothing", no verdict of any kind. Every error this file has produced came from the same root: a scraper making judgment calls it has no standing to make. It cannot see my proof file, my margins or my capacity, so its opinion on what I should run is worth nothing and it crowds out the data I actually came for.

**The judgment happens later, where it belongs.** `/write-ads` gate 2 ranks my line against the market's best three in the same angle, with `context/proof.md` and `context/compliance.md` open. That is the step equipped to decide. This one just gets the data.

**⛔ THE COUNTS LIVE INSIDE THE SWIPE FILE. There is no separate angles section (Jono, 1 September 2026).** A count section and a lines section name the same angles twice. Each angle heading in the swipe file carries its own sub-counts, and the quoted lines nest underneath the count they belong to.

The shape, exactly:

**⛔ ENTRY FORMAT, exactly this (Jono, 1 September 2026).** The quoted line stays clean. Pictures and notes drop to their own nested bullets underneath, never trailing on the entry line and never as indented prose:

```
## Offer

- Shown 5/22 ads · 23% · A free audit, quote or plan
  - "Free Audit" · Black Propeller · 1,421 days · sitelink on the longest-running ad in the market
  - "Get A Free Quote Today" · Local Mighty · 26 days
    - [picture](context/competitor-ads/localmighty.png)
- Shown 5/22 ads · 23% · Book a call or talk to a person
  - "Talk to an Expert" · Adtaxi · 178 days
    - [picture](context/competitor-ads/adtaxi.png)
    - Notes: A person, not a form. Adtaxi is the only image-format ad found in the sweep.
  - "Let's Talk" · Workshop Digital · 221 days · sitelink
```

Three levels, no more. Count line · quoted entry · then `[picture]`, `[desktop]`, `[mobile]` and a single `Notes:` bullet. **One `Notes:` line per entry**, holding both what the line does mechanically and anything the picture shows the text cannot. No bold anywhere except the headings. An entry with nothing worth noting gets no `Notes:` bullet at all - do not pad it.

**Every count line reads `Shown N/M ads · X% · what it is`.** Both numbers and the percentage, always - `7/21` alone makes me do arithmetic, `33%` alone hides the sample size. A zero still gets a line: `Shown 0/21 ads · 0% · <the thing> · NOBODY RUNS THIS`.

**Every count line has quoted lines nested under it**, except a zero, which has nothing to quote. A count with nothing beneath it is a failed entry - `/write-ads` gate 2 cannot rank my line against a percentage.

Sort entries by days running inside each count.

**Split an angle into two headings when the lines split** - "Identity · naming the buyer" and "Identity · the disqualifier" are different moves. A heading with one member is a finding.

**Two counting rules, both learned the hard way:**
- **Never bucket puffery with proof.** Unproven superlatives (#1, best, top-rated) are a policy violation and go in NOISE. A real star rating or review count is third-party proof. Merging them once made a nearly-empty proof bucket look like the most crowded angle in the market and buried the finding.
- **Junk goes in NOISE, counted once, never an angle.** "Full service", "results that matter", "grow your business". Nobody ever chose a contractor for them.

**⛔ No appendix. No every-ad dump (Jono, 1 September 2026).** A full list of every advertiser found is the same content as the swipe file with the judgement taken out, and it always ends up longer. Only the best make the file. If an ad is not good enough to quote in the swipe file, it does not appear anywhere. Where the whole ad matters - the sitelink set, a second line worth having - put it under that ad's own swipe entry, not in a second list at the bottom.
**4. The swipe file - TWO sections, not three.** Lines and ads are the same evidence in two costumes, so they merge into one list. Do NOT write a "lines worth stealing" section and an "ads ranked" section - they name the same advertisers twice and I read the same thing twice.

- **THE LINES · grouped by angle, longest-running first inside each angle.**

  **⛔ THIS IS THE MOST IMPORTANT SECTION IN THE FILE AND IT GOES FIRST (Jono's ruling, 1 September 2026).** Not after the angle counts, not near the end - **first, straight under the header.** Everything else in this file is supporting context for it. The angle counts exist to tell me which angles these lines sit in; the landing pages exist to tell me where they lead. If I only read one section, it is this one, so it gets the most room and the most care. One entry per creative, and every entry carries all five things together:

  `"the actual line" · Advertiser · N days running · [picture](context/competitor-ads/slug.png) · what it does mechanically`

  **Group by angle** (offer / price / speed / trust / risk-reversal / identity / method) because that is what `/write-ads` gate 2 consumes - it ranks my line against the market's best three *in the same angle*. **Sort by days running inside each angle**, because that is the only honest grade here: an advertiser who has paid to keep a creative alive for 900 days has tested it against everything else they tried and it won. Nobody keeps a loser running. Print the days on every line so the order is checkable.

  **Split an angle when the lines split.** One identity line that disqualifies a buyer and three that name one? Give the disqualifier its own sub-heading. A category with one member is a finding.

  **When the Transparency Center gives no run dates**, say so on the line and fall back to: appears on the most keywords · sits in the top block rather than the bottom · carries the most assets. Mark those `no dates - ranked by coverage`. **This is never a score out of 10** - days running is a measurement, not an opinion (`references/google-ads.md` section 9).

  **The "what it does" note is about the LINE, never about me.** "A plan sounds like work already done, an audit sounds like a sales call" teaches me to write. "You should run this because you have no reviews" is advice about me, and that is banned. Judge the line, never the owner.

  **Where the picture shows something the text cannot, say it on that line** - the sitelink set, an image extension, a star rating, the size of the block, or that the advertiser is visibly a PR firm rather than an ads agency. That is the whole reason the screenshot is there.

  **The SERP block shots attach to the entry too**, as `[desktop]` / `[mobile]` links on the same line, never as a separate section of bare keyword links. A standalone list of `keyword · [desktop] · [mobile]` is a file listing, not a finding.

  **Say the coverage out loud in one line, then stop.** "12 creatives captured of 98 in the library; 54 have run 200+ days, so roughly 86 remain for a second pass." Never pad to a target and never claim a number you did not capture.

  **Open with the pattern**, one or two sentences on what the longest-running lines have in common. Still about the lines, never about me.

- **THE PAGES · pages worth copying, RANKED BEST FIRST.** Same job as the lines: this is a build reference for `/landing-page`, not a survey. Five or so, best first.

  **The grade is proof density** - how much verifiable proof the page puts above the fold, and how many kinds. That is the copyable asset and it is the one thing a new advertiser is always short of. A page with five stars, a client count, a ranking count, a lead count and three platform badges beats a prettier page with a headline and a button. Say the count so the ranking is checkable.

  Each page, in this shape:

  ```
  ## 1. SavClicks · savclicks.com · 9 proof elements
  [screenshot](context/competitor-pages/savclicks.png)
  - Headline: "Marketing Built For Home Service Companies"
  - Proof stack: five stars · 500+ clients · 3,000+ #1 rankings · 15,000+ leads
  - Badges: Google · Meta · Webflow
  - Offer: -    - Guarantee: 100% Satisfaction Guaranteed
  - Action: one button above the fold, no form
  - Missing: no price, no speed claim
  - Worth copying: the proof stack is four different KINDS of number, not four of the same.
  ```

  **The proof stack is the point of the entry** - write it out in full, every element, because that is the list `/landing-page` builds against. **"Missing" is as useful as "present"**: a whole market with no price above the fold is a finding.

  **`⛔` NEVER follow a `/goto` redirect to reach a destination.** Since 26 August 2026 Google routes ad links through `google.com/goto`, and clicking one fires a real click and charges the competitor for it. Reach the page another way or record it as unread. The displayed URL is not the destination, so never infer homepage-versus-matched from it.

  **Do not write a paragraph explaining the `/goto` problem, and do not write a "could not be read" section.** Both go in the header coverage line as a number: `8 of 12 landing pages read`. Name the unread ones in a single trailing line only if one of them matters - "Strategy New Media unread, and it is the one running the guarantee" - never a list with a reason each.

Never put a number, credential or result in an ad unless it is in `context/proof.md`.

## ⛔ No commentary anywhere in the file (1 September 2026)

A run produced a file where every swipe line carried a "why it works" tail, every angle block had an explanatory paragraph, and each limitation ran three sentences. All of it was cut. The rules:

- **Swipe lines are `"the line" · advertiser` and nothing else.** No trailing explanation. Twenty lines with twenty explanations is forty things to read for twenty facts. If the whole file needs one sentence on what the good lines have in common, it gets exactly one, at the bottom of the swipe file.
- **No standalone observation blocks.** "Method wins on longevity", "What the pictures show that the text does not" - these are the writer thinking out loud. If an observation changes what I write, it is a row in the reading table. If it does not, it is deleted.
- **⛔ No "what this sweep could not see" section (Jono's ruling, 1 September 2026).** It became a changelog of the scraper's own problems - a browser reading the wrong country, captures deleted, a mobile pull slipping to India, how the payer name differs from the business name. None of that is one of the four jobs and none of it changes anything I do.

  **Replace it with ONE coverage line in the header**, so I can see how complete the data is without reading a post-mortem: `22 advertisers · 12 of 98 Transparency Center creatives · 8 of 12 landing pages · desktop + mobile · US, server-side geo · 1 September 2026`.

  That line is the only place incompleteness gets reported, and it is a **number, not a narrative**. "12 of 98 creatives" tells me the swipe file is thin. Four sentences on rate limits tell me nothing.

  **The one exception, and it stays hard:** a BLOCKED capture is not a finding. If the sweep was stopped - CAPTCHA, `/sorry` redirect, an empty ad block - say it plainly and say how many keywords are outstanding, per the block rule above. That is a failed run needing a re-run, not a coverage number to bury in a header.
- **Screenshot lists carry no prose.** Keyword, desktop link, mobile link. The heading already says what they are.
- **Never explain a number twice.** If the count is in the reading table, it does not get restated in the swipe file or the pictures section.

**The delete test:** read any sentence and ask what changes if it is gone. If the answer is "nothing, I just would not know why", delete it. The owner does not need the reasoning, they need the move.

**⛔ WRITE IT SHORT.** (Jono, 1 September 2026, on a 694-line scout file: *"bloated as fuck. No one will ever read this."*)

The test is not a line count, it is whether a sentence earns its place. **Every line either changes what I write or changes where I spend. If it does not, cut it.** Around 150 lines is what that usually produces; if yours is much longer you are explaining rather than deciding, and if a section could be deleted without changing a single decision, delete it. No finding appears twice under a different heading. No section restates another. The ad library at the bottom is exempt - a picture reference is not reading.

Show me the swipe file first, then the angle counts and the pages, then stop - no ads, and no advice on what to do with any of it. The LSA read only appears if there was an LSA block. `/write-ads` consumes this file.


**⛔ No bold on the quoted line or the days running (Jono, 1 September 2026).** Plain text. Bolding every entry means nothing stands out and it makes the file harder to scan, not easier. Bold is for the section headings only.


**⛔ NOISE and the pattern go at the TOP of the swipe file, not the bottom (Jono, 1 September 2026).** Straight under the swipe-file header, before the first angle. The pattern is the headline read of the whole sweep, so it is the first thing seen, not a footnote after ten angles. NOISE sits beside it so the junk is dismissed once, up front, and never confused with an angle further down.


**⛔ FILE STRUCTURE, three top-level sections in this order (Jono, 1 September 2026):**

1. **`# The read`** - the intro. The coverage line, how days-running is used as the grade, the NOISE list dismissed once up front, and the pattern: one or two sentences on what the longest-running lines have in common. This is the headline read of the whole sweep and it goes FIRST, never as a footnote after ten angles.
2. **`# THE ADS`** - the swipe file. Angles, counts, quoted entries. The bulk of the file.
3. **`# THE PAGES`** - landing pages, ranked by proof density.

Nothing else at the top level. No appendix, no gaps section, no auction table, no "what this sweep could not see".

**⛔ Every entry carries its ASSET TYPE and CHARACTER COUNT (Jono, 1 September 2026).**

`"the line" · Advertiser · headline|description|sitelink|callout · N chars · N days`

**Why it is not optional.** `/write-ads` gate 2 ranks my 30-character headline against the market's best three in the same angle. Without the type and the count it ranks a headline against a 103-character description, which is apples to oranges - that line could never BE a headline. Gate 2 compares like with like: headlines against headlines, descriptions against descriptions.

Count the characters of the quoted text and print it. Where a line exceeds the limit for its type, say so on the line - `description, over the 90-char limit · 103 chars` - because that tells me Google is truncating it and the advertiser has not noticed.

**⛔ Days running is per-CREATIVE where the Transparency Center gives it per-creative.** Do not credit a sitelink with the advertiser's longest-running creative and imply that specific line is 1,421 days old. Where only an advertiser-level maximum is known, write it as `1,421 days on the longest-running ad in the market` rather than a bare `1,421 days`, so the claim stays honest.


---

## Selecting the swipe file · pull 100, then judge them

**⛔ Step 1: pull AT LEAST 100 creatives. This is required, not best-effort (Jono, 1 September 2026).** One creative per advertiser is not a swipe file, it is a sample. The Transparency Center rate-limits around 25 requests per IP, so this takes **multiple passes** - pace them, rotate the proxy, and keep going until the count is 100+ or the library is exhausted. Say the real number against the library size: `104 of 118 creatives pulled`. A run that stops at 12 and calls it the market's best has not done this step.

**⛔ Step 2: score all 100 against `references/persuasion.md`, keep the best ~20.** Days running tells you the market kept paying for it. It does not tell you the line is worth learning from - a funded agency can run a mediocre ad for four years. So days running becomes a **displayed signal, not the selector**.

Judge each line on the persuasion.md criteria, in this order:
1. **Specificity** (section 3) - an exact number beats a round one beats none. A claim expensive to fake beats one that is free to write
2. **Does it answer one of the six fears** (section 4) - a line that kills an objection beats a line that asserts a quality
3. **Awareness match** (section 1) - does it assume what a searcher on that keyword already knows, or waste the line explaining it
4. **Compression** (section 6) - shorter wins, sentence case wins, one idea per line
5. **Second person and plain words** (section 5) - written to the reader, in the reader's vocabulary

**This does NOT reverse the 29 August ruling that killed numeric scoring.** That ban is on scoring MY OWN lines while writing, because grading my own copy converges everything into one shape. This is a **filter on other people's copy**, to decide which 20 of 100 I learn from. It shapes nothing I write. Do not produce a score out of 10 here either - rank them, take the top ~20, and say in one line why the cut fell where it did.

**⛔ A strong line is never discarded because I cannot use it yet.** "Trusted by 250+ brands" is specific, countable and exactly the shape persuasion.md section 3 asks for. That I have not counted my own clients is a proof gap, not a verdict on the line. **"This line is weak" and "I cannot back this line yet" are different findings.** A strong line I cannot substantiate goes in the swipe file as the benchmark to beat, and into `context/proof/competitor-gaps.md` as proof to go and collect. Judge the line on the line; my ability to run it is a separate question and is not this file's business.

**Step 3: show days running beside every survivor**, and where a line scored well but has run only days, say so. A brand-new ad that is well built is worth watching; a four-year-old ad that is badly built tells you the advertiser has budget, not skill. Both are useful, and they are different facts.
