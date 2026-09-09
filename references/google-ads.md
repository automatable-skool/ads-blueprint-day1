# Anatomy of a good Google Ads responsive search ad
Rebuilt 28 August 2026 from 81 sources (Google help, policy and API docs first, then Optmyzr's 2023, 2024 and 2026 datasets, Search Engine Land, SEJ, Ginny Marvin, Brad Geddes, Kirk Williams) · last validated against Google Ads API version 25 · the June 2026 swipe file folded in
Next: run `/write-ads`, score every line against section 9, dry-run the push with `validate_only`, and enable nothing until the pending file is read.

This is the spec Claude reads before writing ad copy, and the rubric the owner checks against before anything goes live. Testing what is already running lives in `references/ad-testing.md`; assets live in `references/ad-assets.md`.

**Read `references/persuasion.md` FIRST, then this file.** That one is the WHY - the awareness ladder that decides what a headline may assume, the six fears an ad is really answering, and why specificity is the whole game. This one is the WHAT - limits, pinning, angles, policy. Format rules applied to a line that was never going to persuade anyone produce a compliant ad nobody clicks.

## How every claim is graded

- **(a)** Google documentation, policy page or API reference
- **(b)** A study with a stated sample size - almost all Optmyzr, vendor-published
- **(c)** Practitioner convention
- **[F]** Field-verified against the live API in this repo, August 2026

---

## 1. What a responsive search ad is made of (a)

One ad slot holding a pool of assets. Every limit is Google's, not a preference.

- **Headlines:** up to 15, each 30 characters or fewer, minimum 3. Fill all 15.
- **Descriptions:** up to 4, each 90 characters or fewer, minimum 2. Fill all 4.
- **Final URL:** one per ad group, up to 1,024 characters, and it has to resolve today.
- **Display paths:** two, each 15 characters or fewer, optional. Fill path 1 with the service word and path 2 with the place.
- Double-width languages (Chinese, Japanese, Korean) count each character as two.

**What actually shows, since 20 February 2025.** Google's own wording is that Headline 1 and Description 1 "usually" appear and the rest "may". Asset flexibility means the system can show a single headline, put a headline at the start of a description, serve up to two unused headlines in the slots that used to belong to sitelinks (linking to the final URL), and borrow lines from the other RSA in the same ad group. There is no opt-out. Pinned lines keep behaving as pinned.

Three consequences for the writer:
- Every headline has to stand alone. Nothing can rely on a neighbour to make sense.
- Headlines double as sitelink text, so a weak line can now show up as a link under the ad.
- The two ads in a group can share a rendered ad sometimes. Never put a line in one that you would not want standing beside a line from the other.

**Campaign-level text (a).** A campaign can carry 3 extra headlines and 2 extra descriptions that ride on every enabled ad in it. Not counted in Ad Strength. Useful for a campaign-wide offer; not used by default here.

**The final URL must resolve, with no cross-domain redirect.** [F] Google policy-checks the URL at creation, so a placeholder domain fails the whole mutate with DESTINATION_NOT_WORKING or HOSTNAME_NOT_FOUND. If the landing page is not deployed yet, use a resolvable stand-in on the same domain and swap it before enabling.

**Why every slot is filled.** Google's diversity check for Ad Strength wants 15 distinct headlines and 4 descriptions (a); more distinct angles give the rotation more to learn from. There is no clean study tying "15 filled" to a click-through number - the "6% higher" figure that circulates has no source, and Google's own uplift numbers (a second ad plus 6.6% conversions, a third plus 3.7%, internal data August 2025) are about ad count, not headline count.

---

## 2. Sentence case, short lines, one idea each (b)

**Sentence case, always.** Optmyzr's April 2026 dataset (about 20,000 accounts) put sentence-case headlines at $7.46 cost per lead against $27.47 for Title Case, a 3.7x gap, and sentence case won every primary metric in the 2024 set too (22,000+ accounts, 1M+ ads). Descriptions the same, by a smaller margin.

Write "Free quote before any work", not "Free Quote Before Any Work". Proper nouns, brands and real acronyms (HVAC, GTA, TSSA) keep their caps. For keyword insertion use `{Keyword:fallback}` - capital K only - so the inserted term renders with a capital first letter and nothing else.

**Short beats full.** Headlines under 20 characters ran at $9.35 cost per lead against $18.27 for 21 to 30 (2026). Descriptions of 61 to 70 characters had the best click-through (12.3%) and cost per lead ($11.49); 81 to 90 was the worst bucket ($20.11). The cap is not the target.

**One idea per line.** Google's June 2026 pinning note adds: keep the keyword whole inside one headline, and if it runs past 30 characters put it in a description rather than splitting it.

---

## 3. The six angles - cover at least five of them

Fifteen rewordings of one promise give the rotation nothing to test (a - the Ad Strength diversity check; b - the 2024 finding that ETA habits carried into RSAs lost). Every ad's 15 headlines cover at least five of these six angles. The examples show structure; write the real lines in sentence case.

### 3.1 Keyword plus place - the only lines you pin

Two or three keyword variants, pinned to HEADLINE_1, never identical text. The search term in the first headline is the relevance signal Quality Score reads.

- `[Keyword] [city]` - "Emergency plumber Toronto"
- `[City] [keyword]` - "Toronto emergency plumber"
- `{Keyword:Emergency plumber}` - keyword insertion, only when it is the declared test variable (section 4)

### 3.2 The offer - unpinned

The thing that makes the business worth tapping over the one above it. Three variants.

- `[Price modifier] [offer]` - "No callout fee today"
- `[Time guarantee]` - "On site within 60 min"
- `[Bundle]` - "Camera inspection included"

Every offer has to be live and easy to find on the landing page the day the ad is enabled (a - misrepresentation policy, "unavailable offers").

### 3.3 Proof - unpinned

Numbers beat adjectives, and every number is a line in `proof.md`.

- `[Rating] from [count] reviews` - "4.9 stars from 482 reviews". Spell out "stars": the live API rejects the star glyph [F].
- `[Years] years [service] [area]` - "15 years plumbing the GTA"
- `[Licence or insurance]` - "TSSA licensed and insured"

The review count has to match a live public profile on the day of writing. The FTC's review rule (effective 21 October 2024, penalties up to $51,744 per violation, first warning letters 22 December 2025) makes an inflated or unsourced number a legal exposure, not just a policy one.

### 3.4 Speed and availability - unpinned

Service businesses have real urgency. Use the true version; never manufacture one, and never use fear. Google's misrepresentation policy names pressure through "negative life events such as death, accidents, illness" as a violation, so "water damage spreads fast" style agitation is out. Relief, not dread.

- `[Time] response` - "60-minute response"
- `[Day] service` - "Same-day service"
- `Open 24/7` - "Open 24/7, answered by a person"

### 3.5 Risk reversal - unpinned

Concrete promises that lower the fear of a bad decision. The guarantee text must be on the page (a).

- `[Years]-year [guarantee]` - "10-year warranty"
- `[Pricing promise]` - "Upfront pricing"
- `No [bad thing]` - "No hidden fees"

### 3.6 The ask - unpinned

Name the action the landing page actually offers. "Click here" and "Learn more" are on Google's editorial list as generic calls to action (a) and score zero on Specific.

- `Call now, [availability]` - "Call now, open 24/7"
- `Get a [thing] in [time]` - "Free quote in 2 min"
- `Book online [when]` - "Book online today"

**Two conventions with no data behind them but no downside (c):** lead with "you" and "your" rather than "we" and "our"; and a question hook ("Burst pipe in Toronto?") earns clicks but has a contested conversion record - use one at most, as a challenger line.

**One emotion per ad (c).** Pick the strongest for that searcher - relief for emergencies, trust for high-ticket, confidence for considered buys - and hold it across the 15.

---

## 4. Keyword insertion and customizers (a, b)

- Syntax `{KeyWord:Default}`. The default shows when the triggering keyword would push the line past 30 characters, so the default must fit on its own. The casing of the word "KeyWord" sets the casing of the inserted term: `keyword` all lower, `Keyword` first word capped (the house choice), `KeyWord` every word capped.
- The IF function is not supported in RSAs. Countdown and `{LOCATION(City):Default}` are.
- Ad customizers: a CustomizerAttribute with values linked at account, campaign or ad group level, referenced as `{CUSTOMIZER.name:default}`.
- The inserted text still has to pass policy. A loose keyword list can insert a competitor's trademark or a claim that is not in `proof.md`. Keyword insertion is therefore only allowed in a STAG whose every keyword reads correctly inside the line, and never in a healthcare or financial ad.
- The evidence is against it as a default: more impressions and fewer conversions per ad (2023, 432,343 ads), negligible gain (2024). Two large samples agreeing makes this a production rule, not a test variable - do not spend a test slot confirming an answered question.

---

## 5. What to pin and what to leave alone (a, b)

Pinning restricts rotation. Google's guidance: pin 2 or 3 unique lines per position when you must pin, never identical text to one slot, and run a hybrid - one or two keyword headlines pinned, everything else free.

- **The keyword headlines - pin to HEADLINE_1.** Two or three of them.
- **The other 12 or 13 headlines - no pin.**
- **All 4 descriptions - no pin.**

The data (Optmyzr 2026): partial pinning $13.68 cost per lead and the best click-through; full pinning $32.57 and, in the 268 accounts running all three strategies, $61.11 with a 4.48% conversion rate. Fully pinned ads also get about 3.9x fewer impressions (2023). Partial and unpinned were level in the controlled cut, so the pin on HEADLINE_1 costs nothing and buys relevance and STAG discipline.

Pinning lowers Ad Strength (a). That is fine - see section 8.

---

## 6. Format rules that get ads rejected (a, [F] where noted)

Google's editorial review is automated. Break a hard rule and the ad is disapproved within a business day; editorial violations get a warning at least 7 days before any suspension, an edit triggers re-review in 24 to 48 hours, and each ad gets 3 appeals.

### Hard rules

- **No phone number anywhere in ad text.** Use a call asset. Wrong: "Call 416-555-1234". Right: "Call now, open 24/7".
- **No exclamation marks in headlines, at most one in one description.** Google's current page says "used correctly"; the enforcement pattern has not changed and there is no upside to testing it.
- **No repeated punctuation or symbols.** "Save... today", "Now!!", "$$$".
- **No emoji, arrows, decorative symbols, or star glyphs.** "★" is rejected as SYMBOLS/PROHIBITED [F]. The one asterisk Google's page allows is a plain ASCII "5* hotel"; do not rely on it. Spell out "stars".
- **No ALL CAPS words** except real acronyms (HVAC, ASAP, GTA) and coupon codes. No FlOwErS, no F.L.O.W.E.R.S.
- **No gimmick spacing or letter swaps.** "F R E E", "FR33", "fl@wers".
- **Standard spelling and grammar.** Typos are disapproved.
- **No repeating a word or phrase inside the ad**, and no repeating the same asset text across the ad group's ads.
- **No superlative without third-party proof visible on the landing page.** Wrong: "#1 plumber Toronto". Right: "4.9 stars from 482 reviews".
- **No claim, price, offer or guarantee the landing page does not show.** Wrong: a seasonal offer still running after the promo ended. Right: the offer, the terms, and the guarantee on the page.
- **Nothing "free" that has strings.**
- **No competitor brand in the text.** Bidding on the name as a keyword is allowed; the name in the ad draws a trademark complaint that then follows the whole domain.
- **No fear pressure.** No accidents, illness or death as the reason to click.

### Vertical rules that stop the run

- **Healthcare:** LegitScript certification before any addiction, telehealth or pharmacy ad; no prescription drug names in ad or page (write "injectables", not the brand); no guaranteed results.
- **Financial:** loan ads show minimum and maximum repayment period, maximum APR and a representative example; loans at 36% APR or more are banned in the US; credit repair is banned; debt services need certification.
- **Locksmiths (US and Canada) and garage doors (US):** Advanced Verification before any Search ad. Do not write the ads until it is confirmed.
- **Any identity or business verification request:** 30 days, then the account pauses.

### Soft rules - not rejected, but they cost

- "Click here" and "Learn more" - generic calls to action, scored low.
- "We", "our", "us" leading a line - talk about them.
- A claim with no number - "Many happy customers".
- Padding to the character limit - the data says shorter wins.
- Title Case - 3.7x worse cost per lead.

---

## 7. The auto-rejection list - never write these

1. All caps words: FREE, BEST, URGENT
2. Multiple exclamation marks: "Sale!!", "Now!!!"
3. Symbols for attention: →, ★, 🔥, >>>
4. Gimmick spacing: "F R E E", "F-R-E-E"
5. Unverified claims: "#1", "best", "cheapest", "guaranteed" without proof on the page
6. Competitor brand names
7. Phone numbers in copy
8. Sensational words: "shocking", "amazing", "miracle", "unbeatable"
9. Promises of legality: "legal solution", "lawyer approved"
10. Health claims: "cures", "heals", "eliminates"
11. Fear framing: "before it floods", "don't risk your family"
12. A review count that is not on a live profile today

---

## 8. Quality Score and Ad Strength - what the copy can and cannot move

**Quality Score has three inputs.** Copy moves two.

- **Expected click-through (ad level).** Vary the six angles; fifteen near-identical lines are the bad signal.
- **Ad relevance (ad level).** The STAG keyword in the pinned headline and in at least one description.
- **Landing page experience (page level).** Copy cannot touch it. The page H1 has to match the pinned headline word for word; that is `/landing-page`'s job.

**Ad Strength is not Quality Score and not an auction factor (a).** Google: it "doesn't directly influence your ad's serving eligibility" and is not used in Ad Rank, Quality Score or auction wins. Google's own correlation (Poor to Excellent, 15% more conversions, internal data August 2025, no sample stated) sits next to Optmyzr's two datasets where Average beat Excellent on cost per lead ($12.43 against $28.68 in 2026) and click-through barely moved between labels. Ginny Marvin: "a feedback mechanism, not a KPI". Kirk Williams: "a functional guide, not a key performance indicator".

What raises it: 15 distinct headlines, 4 descriptions, keywords in the text, 6 or more sitelinks. What lowers it: pinning. The command logs the rating in the pending file and never writes to it.

---

## 9. The writing brief - aim at all six while you write

**This is what to aim at, not a score to grade with** (changed 29 August 2026, Jono's ruling). A ten-point rubric measures compliance rather than persuasion, and scoring every line against it quietly converges the whole pool toward one shape - a number plus an offer plus short - which destroys the angle range the ad needs in order to learn anything. The cull is three gates in `/write-ads` instead: mechanical, a forced ranking against the market's best line in the same angle, and a variety floor. Use the six below to write well; use the gates to decide what ships.

**Specific.** A number, a timeframe or a concrete claim. "On site in 60 min" lands it. "Fast service" does not.

**Differentiated.** Owns a gap or beats the table stakes in `context/competitor-ads.md`. A line every competitor also runs is a table stake, not a differentiator - write it to match them, and know it is not what wins.

**Instantly clear.** Understood in one glance by a stressed person on a phone, standing alone with no neighbour headline. No second-read cleverness.

**Proof-backed.** Leans on something real in `proof.md` - review count, years, licence, guarantee.

**Tight.** Headlines of 20 characters or fewer, descriptions inside 61 to 70 characters (both from Optmyzr's 2026 set).

**Angle-true.** Clearly expresses its tagged angle: keyword, offer, proof, speed, risk reversal or ask.

**Gate 1 kills these on sight, no judgement:** any claim not in `proof.md`, any section 6 or `compliance.md` CRITICAL violation, any fear framing, anything over the character limit, and near-duplicates (keep the best phrasing, kill the echoes).

**Gate 2 is the one that matters.** Drop your line in with the market's best three in the same angle from the scout's swipe file and rank all four for a person with water coming through the ceiling, on a phone, who has already read three competitors' ads. First or second survives. Third or fourth dies, however good it looked on its own. Forced ranking rather than a yes/no, because a yes/no drifts generous by the twentieth line and a comparison against real competitor copy cannot.

**Gate 3 is the variety floor:** at least four of the six angles keep survivors, and no angle holds more than a third of the pool.

---

## 10. Self-review checklist before the push

### Every one of the 15 headlines
- [ ] 30 characters or fewer, counted by script
- [ ] Sentence case; caps only on proper nouns, brands, real acronyms
- [ ] No exclamation mark, no phone number, no emoji or symbol beyond "&" and a comma
- [ ] No superlative without proof on the page; no competitor name; no fear framing
- [ ] Makes sense alone - it may render as the only headline or as a sitelink

### Every one of the 4 descriptions
- [ ] 90 characters or fewer; written to 61 to 70
- [ ] At most one exclamation mark across all four
- [ ] Ends on the ask or the benefit, not mid-thought
- [ ] The STAG keyword appears in at least one

### The ad as a whole
- [ ] 2 or 3 keyword headlines pinned to HEADLINE_1, distinct text, the only pins
- [ ] The rest unpinned and covering at least five of the six angles
- [ ] All 4 descriptions in distinct angles
- [ ] Final URL is the exact landing page path, resolves today, same domain as the display URL, no query parameters except tracking
- [ ] Paths 15 characters or fewer, lower case
- [ ] No two lines nearly identical, inside the ad or against the other ad in the group
- [ ] Every number and claim traced to a line in `proof.md`; review count checked against the live profile
- [ ] Keyword insertion only if it is the declared test, with a default that fits, and never in a healthcare or financial ad
- [ ] `compliance.md` CRITICAL list run over every line

### The ad group, across both ads
- [ ] Exactly 2 responsive search ads: the service's best lines, and the next untested batch. Never three enabled. (They become champion and challenger in `/ad-tests`, once there are clicks to judge them on.)
- [ ] Both share the same final URL and landing page. That is the STAG model.
- [ ] 30 headlines and 8 descriptions across the pair, fewer if Google flags duplicates.
- [ ] Text customization (AI Max) OFF for the campaign - `code/disable_auto_assets.py` - or text guidelines loaded with the NEVER SAY list if the client insists on leaving it on.

### The push
- [ ] Dry run with `validate_only` first; any PolicyFindingError is fixed, never exempted, before the real write
- [ ] Every ad created PAUSED; every asset link PAUSED or under a PAUSED campaign
- [ ] Pending file written: ad group, ad IDs, Ad Strength (logged, not chased), the lines, the pins, the compliance result
- [ ] Nothing enabled by Claude. The owner enables.

---

## 11. Pushing through the API (a, [F])

- **Create:** `AdGroupAdService.MutateAdGroupAds` with `status = PAUSED`, `ad.final_urls`, and `ad.responsive_search_ad.headlines` and `.descriptions` as `AdTextAsset {text, pinned_field}` plus `path1` and `path2`. Pin with `ServedAssetFieldType.HEADLINE_1`. Text assets are created inline; everything else needs `AssetService` first.
- **Dry run:** the same request with `validate_only = true` runs Google's full validation, including ad policy review, and commits nothing. Policy problems return as `PolicyFindingError` with `policy_topic_entries` (topic, type, evidences, constraints). Fix the line; do not use `ignorable_policy_topics` to push past a finding.
- **The errors you will meet:** LINE_TOO_WIDE (count first), INVALID_INPUT (a stray character in a URL), DESTINATION_NOT_WORKING or HOSTNAME_NOT_FOUND (the final URL does not resolve) [F], DUPLICATE_ASSET (create once, link many).
- **Edits:** `AdGroupAdService` only changes status after creation. `AdService.MutateAds` edits text but keeps the ad ID and merges the stats - which is why a change to a running ad is always a new ad, and the loser is paused, never edited, never deleted.
- **Approval:** read `ad_group_ad.policy_summary.approval_status` and `review_status` before enabling. About one business day; over two, check; over a week, support.
- **partial_failure** is fine for independent creates and wrong for anything referencing a temporary ID in the same request.

---

## 12. A complete worked example - emergency plumber Toronto

Every number below is a placeholder for a `proof.md` line. Do not ship it without the file.

### The 15 headlines

```
1.  Emergency plumber Toronto      [PIN HEADLINE_1] keyword
2.  Toronto emergency plumber      [PIN HEADLINE_1] keyword
3.  24/7 emergency plumber         [PIN HEADLINE_1] keyword
4.  No callout fee today           offer
5.  On site within 60 min          offer
6.  Drain camera included          offer
7.  TSSA licensed and insured      proof
8.  4.9 stars, 482 reviews         proof
9.  15 years plumbing the GTA      proof
10. Same-day service               speed
11. A person answers, 24/7         speed
12. 10-year warranty               risk reversal
13. Upfront pricing                risk reversal
14. Call now, open 24/7            ask
15. Free quote in 2 min            ask
```

All fifteen are 25 characters or fewer; five are under 20. The keyword and proof lines carry the length, the asks and speed lines stay short.

### The 4 descriptions

```
1. On site within 60 minutes. Licensed Toronto plumbers, upfront pricing.   (70)
2. Call now or book online. 24/7 emergency response, 10-year warranty.      (67)
3. No callout fee, no hidden charges, same-day service. Family-owned.       (66)
4. Free quote in 2 min. Emergency plumber Toronto, licensed, same-day.      (67)
```

### The display URL

```
automatable.com/emergency/toronto
```

path1 is `emergency`, path2 is `toronto`.

---

## 13. Related files and sources

**Related files**
- `references/ad-assets.md` - sitelinks, callouts, snippets, call, lead form, business name and logo, what to skip
- `references/ad-testing.md` - champion versus challenger, the asset report, the thresholds, Jono's 80% ruling
- `context/compliance.md` - the CRITICAL and MINOR lists the gate runs
- `context/proof.md` - the only claims allowed in an ad
- `Gads/setup/winning-ad-copy-patterns.md` - the June 2026 swipe file the angles in section 3 were mined from

**Google (a)**
- About responsive search ads - support.google.com/google-ads/answer/7684791
- Asset flexibility, 20 February 2025 - support.google.com/google-ads/answer/15967262
- Campaign-level headlines and descriptions - support.google.com/google-ads/answer/13548268
- About Ad Strength - support.google.com/google-ads/answer/9921843
- Keyword insertion - support.google.com/google-ads/answer/2454041
- RSAs with customized text - support.google.com/google-ads/answer/11559472
- Turn text customization off - support.google.com/google-ads/answer/16738708
- Editorial - support.google.com/adspolicy/answer/6021546
- Phone numbers - support.google.com/adspolicy/answer/14848200
- Capitalization - support.google.com/adspolicy/answer/14848295
- Punctuation and symbols - support.google.com/adspolicy/answer/14847994
- Misrepresentation - support.google.com/adspolicy/answer/6020955
- Trademarks - support.google.com/adspolicy/answer/6118
- Healthcare - support.google.com/adspolicy/answer/176031
- Financial products - support.google.com/adspolicy/answer/2464998
- Fix a disapproved ad - support.google.com/adspolicy/answer/1704381
- API: RSAs - developers.google.com/google-ads/api/docs/responsive-search-ads/overview
- API: assets - developers.google.com/google-ads/api/docs/assets/working-with-assets
- API: policy findings and exemptions - developers.google.com/google-ads/api/docs/policy-exemption/overview
- API: common errors - developers.google.com/google-ads/api/docs/common-errors
- API: partial failures - developers.google.com/google-ads/api/docs/best-practices/partial-failures

**Studies (b)**
- Optmyzr, 6 April 2026, about 20,000 accounts - optmyzr.com/blog/google-rsa-performance-study
- Optmyzr, 2 October 2024, 22,000+ accounts, 1M+ ads - optmyzr.com/blog/google-ad-strength-study
- Optmyzr, 2023, 13,671 accounts, 93,055 RSAs - optmyzr.com/blog/optmyzr-study-responsive-search-ad-performance
- Brad Geddes, AI Max text customization tested, Search Engine Land, 28 July 2026
- FTC Consumer Reviews and Testimonials Rule, effective 21 October 2024 - ftc.gov

**Practitioners (c)**
- Ginny Marvin, Ad Strength Q&A, SEJ, 22 April 2024
- Kirk Williams, ZATO, Ad Strength is a guide not a KPI
- Google's restated pinning tips, 24 June 2026 (ALM Corp)
- Adalysis, AI Max text guidelines, 21 April 2026
- auditsocials 2026 disapproval guide; hawksem healthcare restrictions, February 2026

---

## What changed in this revision

- **Serving model updated to February 2025.** The "slot 1 shows 100%, slot 2 about 90%" line is gone; Google now says "usually", and single-headline, headline-in-description, headline-as-sitelink and cross-ad borrowing are all documented. New rule: every headline stands alone.
- **The unsourced numbers are out.** "43,680 combinations" and "6% higher click-through for filling 15" had no source; Google's own uplift figures (second and third RSA) replace them with their date and caveat.
- **Sentence case, headline length and description length now carry the 2026 numbers** (about 20,000 accounts, 6 April 2026) alongside the 2024 ones.
- **Pinning rewritten to Google's June 2026 guidance:** 2 or 3 distinct keyword lines on HEADLINE_1, never identical text, nothing else pinned; keyword over 30 characters goes to a description. The "10 to 15% conversion volume" single-pin claim, which had no study, is replaced by Optmyzr's partial-versus-full figures.
- **Keyword insertion gets its own section** with the casing rules, the unsupported IF function, the policy warning about inserted text, and the evidence that it is a test variable, not a default.
- **Policy section rebuilt from the current pages:** the star-glyph field test kept, the "5* hotel" asterisk nuance added, the seven-day warning and three-appeal facts added, fear framing added from the misrepresentation policy, and vertical stoppers (healthcare, financial, locksmith and garage-door verification, 30-day verification deadline) added.
- **The FTC review rule and the live-profile check** are now part of the proof angle and the auto-kill list.
- **Ad Strength section corrected:** Google's 15% figure is kept with its source and dated caveat, next to Optmyzr's contradiction; the rubric logs Ad Strength and never writes to it.
- **New: the API push and the approval workflow** - `validate_only` dry run, the error list, edit-versus-replace, PAUSED everywhere, the pending file, owner enables.
- **New: text customization OFF** is on the ad-group checklist, with the 1 September 2026 auto-upgrade as the reason.
- **Swipe file folded in:** the six angles now carry the question hook, "you" first, and one-emotion conventions, marked (c); PAS agitation lines are rewritten as relief because fear framing is a policy violation.
- **Worked example rewritten** in sentence case with three distinct keyword pins, angle tags, and character counts.
- **House style:** tables replaced with bullets, grading on every section, hyphens throughout.
