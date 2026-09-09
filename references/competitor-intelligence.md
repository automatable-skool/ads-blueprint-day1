# Competitor intelligence - how the scout reads the market
Built 28 August 2026 · 78 sources, graded (a) Google or first-hand, (b) reputable secondary, (c) working rule
Next: `/scrape-competitors` reads this before gathering; `competitor-proof-audit.md` still owns proof scoring.

This file answers one question: **what can a stranger learn about a competitor's Google Search ads, and how sure can they be?** The output of the scout is a claims list, a gap list and a swipe file. Never a spend number.

---

## The four sources, and what each cannot tell you

### Google Ads Transparency Center - the anchor

**What it gives:** every creative Google chooses to disclose for an advertiser - format, first shown, last shown, regions, a rendered preview, and the advertiser's verified name and location. In the EU it also gives targeting and a reach range. (a)

**What it hides:** spend, impressions, clicks, keywords, which RSA combination actually served, and the text as fields - headlines and descriptions must be transcribed from the preview. Ad counts are approximate and can exceed the creatives you can fetch. (a)/(b)

**Traps:**
- The payer name can be an agency or a holding company since May 2025. Match by domain, never by name alone. (a)
- A wrong region value returns zero ads with no error. An empty result is a failure until a second method confirms it. (b)
- About 25 requests from one IP earned a 429 in August 2026 testing. Read at human pace and cache. (b)
- There is no public API for commercial ads and Google's terms restrict automated access. Prefer a paid actor and say which one; none has been run from this repo yet. (a)/(b)

### Live SERPs - the only place you see the whole block

**What it gives:** who is actually paying for the money keyword right now, in what position, with what assets, and the landing page URL. (b)

**What it hides:** everything about why. One capture is one sample of a rotating RSA, at one hour, from one estimated location, possibly after a competitor's budget has run out for the day. (a)

**Traps:**
- Google itself says not to search for your own ads; use the Ad Preview tool or a SERP API. A hand search in a browser is not data. (a)
- Location is estimated from device, account, history and IP, resolved to an area of at least 3 sq km. Set it explicitly. (a)
- Since 26 August 2026 search result links route through google.com/goto redirects, which makes cheap SERP capture slower and dearer. Expect API prices and failure rates to move. (b)

### Auction Insights - only once an account exists

**What it gives:** impression share, overlap, outranking, position above, top and absolute-top rates per competitor domain, and it is in the Google Ads API as `segments.auction_insight_domain` with six metrics. (a)

**What it hides:** competitors under 10% impression share, search partners, and anything before the account had impressions. For an outside-in audit it does not exist. (a)

**Run it first when the account has spend.** `code/auction_insights.py` pulls it through the API. It beats every scraped source because it is Google telling you who you actually shared an auction with, and it needs no scraping budget. Empty output on a new account is the expected result, not a failure. (a)

### Third-party spy tools - sampled, not observed

**What they give:** estimated paid keywords, ad copy history, estimated traffic cost, landing pages. Semrush history reaches to 2012; SpyFu now samples "hundreds of times per day". (b)

**What they hide:** the truth for local advertisers. On 28 August 2026 Semrush returned nothing for two Toronto plumbing advertisers that have dozens of live creatives in the Transparency Center. SpyFu says its own history before December 2025 has blanks that are not absences. Nobody has published a validation study of estimated spend. (a)/(b)

**Traps:**
- A zero from a spy tool is a coverage gap, not evidence. (a)
- iSpionage closed on 9 July 2025. Do not cite it. (a)
- Label every spy-tool number "estimated" and treat it as order of magnitude. (c)

---

## The live-SERP sampling method

**Set the location explicitly.** UULE or the SERP API's location parameter, at city level. Never rely on being in the city, and never a signed-in browser. (a)

**One pass, mobile and desktop, then move on.** The whole sweep is minutes, not days. Capture each money keyword once on mobile and once on desktop at the time you run it. That is enough to see who is in the auction, what they claim and where they land.

**The 48-hour sample is optional and never blocks anything.** Ads rotate and run on schedules, so a competitor missing at 4pm may just have spent their daily budget. If you want that coverage, re-run the scout a few days later and it only adds advertisers it had not seen. Do not hold up campaign builds waiting for it - the marginal advertiser you catch on the second pass almost never changes what you write. (c)

**Sightings are labelled, not gated.** One sighting is "seen once", two or more is "running". A "seen once" advertiser still counts for the claims table; the label just says how sure you are. (c)

**Record per sighting:** advertiser, domain, headline as shown, description as shown, sitelinks and other assets, block position (top or bottom), device, time, and the landing URL. (b)

**Do not count the auction.** Advertiser-count-per-keyword was removed on 1 September 2026 (Jono's ruling). The SERP capture ceilings out around 6 advertisers per device, so a genuinely busy keyword and a capped one are indistinguishable, and a count presented as exact is worse than no count. It also drove no decision - the launch ad group comes from `keyword-list.md` order. Competitive pressure is read from Auction Insights once the account has impressions, which is Google's own data. (c)

**Check the LSA block on local-service searches.** Note whether Local Services Ads render above the paid block and how many competitors carry the Google Guaranteed badge. LSA sits above everything a Search ad can reach, verification takes days to weeks, and no amount of Search work substitutes for it - so a badged market is an early flag, not a later one. (a)

**Then reconcile with the Transparency Center.** A SERP sighting with no Center creative means the Center pull missed something - re-run by domain with region unset. A Center creative never seen on the SERP is dormant or targeted elsewhere. (c)

---

## The claim taxonomy

Every claim in every live ad and asset is deduplicated into one of seven buckets, then counted by how many competitors run it.

- **Offer** - a coupon, a rebate, a free estimate, a bundled extra
- **Price** - a real number, flat rate, no hidden fees, no trip charge, no overtime
- **Speed** - 24/7, same day, arrival time, response time
- **Trust** - years in business, licensed and insured, BBB, reviews and stars, named licensing body
- **Risk-reversal** - guarantee, money back, fixed-or-free, named warranty
- **Identity** - locally owned, family run, Canadian, veteran owned
- **Method** - camera inspection, no-dig, named process or equipment. The most underrated bucket: specific and provable is exactly where a real gap lives.

**The junk drawer.** "No job too big or small", "full-service", "quality workmanship", "your satisfaction is our priority" go in a NOISE row at the bottom of the table, counted once, never treated as an angle. Nobody has ever chosen a contractor for them, and counting them as claims makes a crowded market look busier than it is. (c)

Order matters: **Offer and Price sit at the top** because they are the two that change what you sell, not just how you word it.

Assets count as claims. A "$25 Off Today" sitelink joins the offer count. A local listing with 1,633 reviews joins the trust count, marked as an account asset rather than copy. (a)

**Three readings from the counts:**
**⛔ The file records what the market shows. It does not say what to do about it (Jono's ruling, 1 September 2026).** No table stakes verdict, no overcrowded verdict, no gaps analysis, no usable/blocked marks, no pairing an angle with the owner's proof. Four jobs only: the swipe file, the best ads written out, the angles and hooks with counts, and the landing pages. A scraper cannot see the owner's proof, margins or capacity, so its opinion on strategy is worthless and it displaces the data the file exists to carry. Judgment lives in `/write-ads` gate 2, which ranks the owner's line against the market's best three in the same angle with `context/proof.md` open.

**Two counting rules that survive, because they are about accuracy, not advice:**
- **Never bucket puffery with proof.** Unproven superlatives (#1, best, top-rated) go in NOISE. A real star rating or review count is third-party evidence. Merging them once made a nearly-empty bucket read as the most crowded angle in the market. (d)
- **A zero is data and gets listed.** `0 · NOBODY RUNS THIS`, with no theory attached about why. (c)

**Compliance notes, never lanes.** A phone number in ad text, an unverifiable superlative, an offer that is not on the landing page - record these as "do not copy", not as an open angle. (a)

---

## The swipe-file rubric

Benchmarks and calibration only. We never copy them. Read each line against the six qualities in `references/google-ads.md`: specific, differentiated, instantly clear, proof-backed, tight, true to its angle. **Do not score them out of 10** - numeric scoring was dropped on 29 August 2026 (Jono's ruling, google-ads.md section 9). Group the lines by angle instead, because that is the shape `/write-ads` gate 2 consumes: your line ranked against the market's best three in the *same* angle.

**Three swipe files, and the pictures matter more than the lines:**
- **Lines** - 10 to 20 is the useful range, grouped by angle. Calibration saturates fast; a hundred headlines is a file nobody re-opens.
- **Ads** - the 8 to 12 best ads in the market as pictures, saved in `context/competitor-ads/` and linked by relative path. Two sources, labelled separately because they are not the same evidence: a live-SERP block shot (`serp-<keyword>-<desktop|mobile>.png`), which shows position and how much space each ad eats, and a Transparency Center preview (`<advertiser>.png`), which shows the ad as Google assembled it plus its run dates. A transcript throws away the sitelinks, callouts, star rating, call button and image extensions - all of which win the click before a single headline is read. Ads get switched off with no warning and the Transparency Center only holds what is live, so the screenshot is the only copy that lasts. This is the half `/write-ads` benefits from.
**⛔ Write it short.** Every line either changes what gets written or where money goes; if it does not, cut it. Around 150 lines is what that usually produces, but the test is the sentence, not the count. Decisions only: what to match, what nobody says, where to start, what their pages do, what could not be seen. No section restates another. If a sentence does not change what gets written or where money goes, cut it.

- **Pages** - the 5 best landing pages in the market, each with its live URL, a screenshot saved beside it in `context/competitor-pages/`, the ad that led there, and one line on what it does well. Pages get redesigned and URLs rot, so the screenshot is the part that survives. This is the half `/landing-page` actually benefits from.

Two adjustments when scoring a competitor:
- **Proof-backed** is judged against the competitor's own visible proof, not ours. (c)
- **Differentiated** is judged against the claim list above, not against our library. (c)

Two things the published data says to reward:
- **Compression.** Headlines under 20 characters and descriptions of 61 to 70 characters had the best cost per acquisition across about 20,000 accounts. (b) Optmyzr, April 2026
- **One angle per line.** The same study found the most ad-like choices - title case, full pinning, "Excellent" ad strength - performed worst. (b)

Two things to ignore:
- **Ad strength.** "Excellent" had the worst cost per acquisition of the four ratings. (b)
- **Longevity as proof.** A long-running creative is a weak positive for copy that pays, and sometimes just an account nobody manages. Note it, never score it. (b)/(c)

---

## Landing pages

**The line: this file INVENTORIES what competitors show. It never teaches how to build or test it.** Construction, testing and optimisation belong to the CRO track in month 2, and proof scoring belongs to `competitor-proof-audit.md`. Record what is on the page; do not score it, rank it, or write "here is how to beat it".

**Where the ad lands** (the single most exploitable finding):
- **Homepage or matched page** - most local advertisers send paid traffic to their homepage. Every one that does is a competitor you beat with a matched page alone. Count them and say the number out loud. (a) Google's own Quality Score advice
- **Message match** - does the page headline keep the ad's promise (a)

**What they show above the fold** - inventory, one line each, no scoring:
- **Social proof** - star rating, review count, review source, testimonials present or not, named client logos
- **Credentials** - licence number printed, insured, bonded, BBB, manufacturer or trade badges, years in business
- **Offer** - what it is, and whether the ad's offer actually appears on the page (Google policy requires it) (a)
- **Price** - a real number, a range, or only "request a quote" (b)
- **Risk-reversal** - the guarantee, in their words
- **Speed promise** - response time, arrival window, availability
- **The call to action** - form, call button, or booking widget; above the fold or not; how many form fields
- **Photos** - real job photos or stock

That is the whole capture. If you find yourself writing an opinion about their page, stop - that is CRO's job in month 2.

Landing URLs come from SERP captures or from Semrush unique ads where coverage exists. The Transparency Center does not extract them. (a)/(b)

---

## Refresh rules

**Full re-scout every 30 days.** That matches the Transparency Center's date filter and Google's 30.4-day budget month. (c)

**Re-scout early when:**
- Auction Insights shows a new domain above 10% impression share (a)
- a top-3 competitor's live creative count moves by a third (c)
- the vertical crosses a seasonal boundary (b)
- a trademark complaint lands on either side (a)

**Every file carries two dates:** the scout date and the live window. Findings without a window are unusable next month. (c)

---

## The copy and trademark line

- **Short phrases are not copyrightable.** "Never copy a competitor line" is a quality and trademark rule, not a copyright one. (a) US Copyright Office Circular 33
- **A competitor's trademark never goes in ad text.** Google restricts a mark in ad text after the owner complains, per advertiser and per second-level domain, with 7 days' warning before suspension. Keywords are not restricted. (a)
- **Bidding on a competitor's brand keyword is lawful in the US** (Lens.com, 2013; the FTC lost against 1-800 Contacts in 2021). Record competitor brand terms as their own cluster with copy that names only us. (b)
- **Copying is a quality failure before it is a legal one.** A swapped-word copy of a rival headline scores zero on differentiated. (c)

---

## Scraping limits

- Google's terms ban automated access that ignores robots.txt and "bypassing our systems or protective measures". google.com disallows `/search`; adstransparency.google.com has no robots.txt. (a)
- Scraping public pages is not a computer-crime offence in the US (hiQ, Bright Data 2024), but contract terms can still bite. (b)
- In the EU, text and data mining is allowed unless the site opts out in machine-readable form, and personal data stays personal. (b)
- **House rule:** human pace, cached, no proxy rotation from this repo, no personal data stored, paid actor preferred. (c)

---

## What changed, 2024 to 2026

- **June 2024** - optional affiliation verification added to advertiser verification (a)
- **Since 2023** - trademark complaints handled per advertiser, not industry-wide; no trademark change in the 2024, 2025 or 2026 policy logs (a)
- **August 2023 onward** - EU targeting and reach data in the Center under the DSA; Google Search is a designated very large search engine (a)/(b)
- **May to June 2025** - payer name shown separately from verified name, editable from June (a)
- **9 July 2025** - iSpionage closed (a)
- **October 2025** - EU political ads restricted under Regulation 2024/900 (a)
- **December 2025 to February 2026** - SpyFu's PPC sampling moved from monthly to hundreds of times a day; earlier gaps are not absences (b)
- **April 2026** - Optmyzr's 20,000-account RSA study: ad strength does not predict performance (b)
- **July 2026** - AI-generated ad disclosure required; "How this ad was made" in the ad panel and on-ad labels in the EU, India and New York State (b)
- **26 August 2026** - google.com/goto redirects on search results, confirmed by Google, making SERP capture dearer (b)

---

## Myths the scout refuses

- "The Transparency Center shows spend." Only for political ads. (a)
- "It only keeps 30 days." Google publishes no window; creatives months old are still listed. (a)/(b)
- "Empty means no ads." Wrong region, a 429, or a declared count with zero fetchable creatives all look identical. (b)
- "Auction Insights has no API." It has had `segments.auction_insight_domain` since v14 era; the 2019 Data-Studio workaround is stale. (a)
- "Semrush knows their keywords." It returned nothing for two active Toronto plumbers on 28 August 2026. (a)
- "Excellent ad strength means a good ad." It had the worst CPA. (b)
- "Copying a headline is copyright infringement." Short phrases are not protected; trademark and sameness are the real problems. (a)
- "Bidding on a competitor's brand is illegal." Lawful as a keyword; the mark in ad text is what gets restricted. (a)/(b)
- "I searched it myself, I saw their ads." One personalised, IP-located sample of a rotating ad. (a)

---

## Rules the command enforces

1. Top 3 clusters only. (c)
2. Competitors come from the live SERP and the Places actor, not the owner's list. (b)
3. Center pulls by domain, never by name alone. (a)
4. Per creative: advertiser, domain, format, first shown, last shown, regions, transcribed text, assets. (b)
5. "Live" means last shown inside the current 30-day window; older is "dormant", never "running". (c)
6. Cap 12 live creatives per advertiser and say so. (c)
7. Empty is a failure until a second method confirms it. (b)
8. Human pace, cached, no proxy rotation, paid actor preferred, no personal data. (a)/(c)
9. SERP sample: one pass per money keyword, mobile and desktop, location set explicitly, never a signed-in browser. A repeat pass is optional and never blocks the build. (c)
9a. Advertiser count per money keyword, split top and bottom block, is recorded every run. Zero ads is checked against the location setting before it is called an opening. (c)
9b. On local-service lanes, LSA presence and the number of Google Guaranteed competitors is recorded and flagged early. (a)
10. Two or more sightings is labelled "running", one is "seen once". Both count for the claims table. (c)
11. Record block position and device per sighting. (b)
12. Seven claim buckets plus a NOISE row, assets count as claims. (a)/(c)
13. Table stakes at half or more, and they get MATCHED, never skipped; gaps at zero, each with a diagnosis of why it is empty; overcrowded is everyone with no number, fixed by adding a number. Puffery is never counted as an angle. (c)
14. Every gap is paired with proof from `context/proof.md` or marked unusable. (c)
15. Competitor policy breaches are "do not copy", never lanes. (a)
16. No competitor trademark in ad text; competitor brand terms are their own cluster. (a)
17. Never copy a line, even with one word changed. (c)
18. Swipe scoring on the `references/google-ads.md` rubric with the two competitor adjustments. 10-20 lines, plus the 5 best landing pages with live URLs. (c)
19. Reward compression; ignore ad strength; note longevity without scoring it. (b)
20. Spy-tool numbers are labelled "estimated"; a spy-tool zero is a coverage gap. (a)
21. Never cite iSpionage. (a)
22. Landing pages: inventory only - where the ad lands (homepage vs matched), message match, social proof, credentials, offer, price, risk-reversal, speed, CTA, photos. No scoring, no how-to-beat-it: that is the month 2 CRO track. Proof scoring stays in `competitor-proof-audit.md`. (c)
23. EU reach and targeting are recorded; outside the EU, reach is never claimed. (a)
24. Auction Insights runs FIRST whenever the account has impressions (`code/auction_insights.py`), pulled through the API and joined by domain. Empty on a new account is expected. (a)
25. Refresh at 30 days or on any of the four triggers. (c)
26. Every file carries the scout date and the live window. (c)
27. "No ads found" is written only with method, region setting and date beside it. (b)
28. Hand searches are never counted as data. (a)

Sources: the full graded list is in the research dossier. The load-bearing ones are Google's Ads transparency policy (answer 13733850), the Auction Insights help (answer 2579754), the Ad Preview tool help (answer 148778), the trademark and trademark-complaint policies (answers 6118 and 2562124), the Google Ads API v25 segments and metrics protos, the ducnhd Transparency Center scraper README measured 6 August 2026, the Semrush MCP runs of 28 August 2026, SpyFu's January and February 2026 data notes, Optmyzr's RSA study of 6 April 2026, US Copyright Office Circular 33, the FTC 1-800 Contacts case page, and Search Engine Roundtable's 26 August 2026 report on google.com/goto redirects.

**Swipe-file selection (1 September 2026):** pull 100+ creatives across multiple Transparency Center passes, then rank them against `references/persuasion.md` - specificity, does it answer one of the six fears, awareness match, compression, plain second person - and keep the best ~20. Days running is displayed beside each survivor as a separate signal, never the selector: it measures the advertiser's persistence and budget, not whether the line is worth learning from. (c)
