# Keyword patterns - the buyer-intent buckets for any service business
Trade-agnostic template · ten buckets of keyword patterns, the account-level negative lists, and the 2025-2026 rules on match types, ad groups and money · revised 28 August 2026
Next: swap `[service]` for the trade, expand every bucket, then pull real volume with the Keyword Planner API geo-targeted to the whole service area.

---

## How claims are graded in this file

- **(a)** Google's own documentation or API reference, or a study across thousands of accounts.
- **(b)** A named practitioner or vendor with a date, a method and some data.
- **(c)** Single-practitioner opinion or a re-quoted number whose source could not be checked.
- **Jono's ruling** - a decision made for this repo. It stays until Jono changes it, whatever a blog says.

The evidence behind every grade is in `references/research/research-keywords.md`.

---

## Before you expand anything - keywords never contain the city

This library is for keyword DISCOVERY. `references/stag.md` section 6 governs STRUCTURE, and where the two disagree, stag.md wins. Reconciled below.

**Do not build city keywords.** Jono's ruling. Close variants already merge `[toronto plumber]`, `[plumber toronto]` and `[plumber in toronto]` into one thing, and city ad groups can only ever catch explicitly geo-modified searches, which are the minority of local intent. Someone in Toronto typing "emergency plumber" can never land in an ad group built on "toronto plumber".

**Keep the bare local terms from bucket 2.** "near me", "nearby", "local [service]", "in my area", "closest [service]". These carry no city and fire on device location. They are real keywords.

**Location is a campaign setting, not a keyword.** Target the whole service area, set to **Presence** and never "Presence or interest". City goes in the AD via location insertion, and on the page via a URL parameter.

**Cities are a research input, not a keyword source.** Step 3 of the flow at the bottom is repurposed: do not cross-join services with cities to make keywords. Check cities only to set the geo-target boundary, to rank which cities may deserve location bid adjustments later, and to flag demand outside the current service area.

**A city earns its own ad group by graduating**, not by being pre-built. The bar is 50 or more clicks, or 20 or more conversions a month, on its own city terms after 60 to 90 days live. Promote, never pre-build.

**Step 4 is the load-bearing instruction.** Set the Keyword Planner location filter to the real service area, then pull BARE service terms. That volume is the true local number, and it is bigger than the city-modified one because it includes every implicit local search.

### Why the rule holds - the evidence

- Exact match shows on searches with "the same meaning or same intent as the keyword", phrase on searches that "include the meaning of your keyword" · (a). "Plumber" does not mean "toronto plumber", so an exact or phrase city keyword cannot be reached by a Toronto searcher who leaves the city out. Only broad could, and broad gets there by ignoring the city word.
- Keyword Planner volume is counted for the location you select and includes close variants · (a). A bare term pulled with the service area as the geo already contains every searcher in that area, city-typers included. The city-modified term is a subset by construction.
- Per-location volumes are rounded, and Google says that "when you get keyword ideas for multiple locations, the search volumes might not add up as you'd expect" · (a). Summing city pulls gives a wrong number twice.
- "Presence or interest" is the default and reaches people "who have shown interest in your targeted locations", inferred partly from "terms used in their searches" · (a). A city keyword plus the default setting is how a plumber in Vancouver pays for clicks from Calgary. Interest-only targeting was removed in 2023, so Presence is the only clean option · (b).
- Google's own uplift claim for "Presence or interest" (+5% conversions) is made for Travel, Real Estate and Education · (c) re-quoting Google. Nobody claims it for a trade.
- Smart Bidding already uses "physical location and location intent" as a bid signal · (a). Paying more for a hot suburb is a bid adjustment, not a keyword.
- Under AI Max, Adalysis watched "near me" queries land in a pricing ad group even though a location ad group held the identical keyword · (b), December 2025. City ad groups never gave routing control, and now they give less.
- You still need the city in front of the searcher. Location insertion in responsive search ads writes the matched city, region or country into the headline with a fallback text · (b). That is the job the keyword was pretending to do.

**The one carve-out.** Reverse location targeting - a separate campaign that shows city keywords to people OUTSIDE the area who typed the city - is a real technique for hotels, relocators and destination services · (b), July 2025. It is not a local trade case and never shares a campaign with the local one.

**The "20 to 35% of budget leaks" figure** in agency blogs has no method behind it · (c). Measure the leak from the account's own location report instead of quoting it.

---

## 1. Urgent, emergency and time

Highest intent - someone is mid-crisis with a card out.

- emergency [service]
- [service] emergency  *(reversed - "plumbing emergency")*
- urgent [service]
- 24/7 [service] / 24 hour [service] / 24 hr [service]
- same day [service] / same day [service] appointment
- after hours [service]
- [service] open now / [service] open today
- [service] available now
- [service] today / [service] now / [service] right now
- [service] tonight / late night [service] / overnight [service]
- early morning [service]
- weekend [service] / [service] on weekends
- Sunday [service] / Saturday [service]
- holiday [service]  *(seasonal, low volume)*
- fast [service] / immediate [service]
- mobile [service] / on demand [service]

These carry the **highest cost per click but the best conversion rate** - searchers are price-insensitive. Give them their own ad group, a "call now" ad, a 24/7 schedule, and higher bids. No large study ranks modifiers by conversion rate; this is structural reasoning plus practitioner consensus · (b). Whether "emergency" out-converts "repair" in a given account is a test variable, not a production rule.

---

## 2. Local and geo

High intent, and the workhorse of local service. Only the bare local terms are keywords.

- [service] near me  *(the gold-standard term - highest volume and intent; fires on device location, not typed words)*
- [service] nearby / [service] near my location / [service] near you / [service] around me
- [service] closest to me / closest [service]
- [service] in my area
- local [service] / local [service] company / local [service] near me

Every city, suburb, neighbourhood, county, region, zip code and landmark shape has been removed from this bucket. They exist in the wild and they are already inside the bare-term volume when the Planner geo is set to the service area. Do not type them.

### The highest-value phrase shape: stack the buckets

The single most valuable keywords combine urgency, service and the bare local term:

- emergency [service] near me
- 24 hour [service] near me
- same day [service] near me
- [service] near me open now

---

## 3. Hire and commercial

High intent - the searcher wants to engage a provider.

- [service] company / [service] companies / [service] companies near me
- [service] contractor / [service] contractors / [service] contractors near me
- [service] services
- [service] provider / [service] providers
- [service] specialist / [service] specialists
- [service] expert / [service] experts / [service] pros
- [service] professional
- hire a [service] / hire [service]
- find a [service] / get a [service]
- book a [service] / schedule [service] / [service] appointment / [service] consultation
- best [service] company / top [service] company
- [service] business
- [service] agency / [service] firm  *(professional services - law, accounting, marketing; not home trades)*
- [service] consultant  *(advisory trades only)*
- independent [service] / [service] for hire

Pick the right noun for the trade. "Company" and "contractor" fit home trades; "agency", "firm" and "consultant" fit professional and digital services.

---

## 4. Buy, compare and price

Commercial and decision intent.

- best [service] / best [service] near me
- top [service] / top rated [service] / highly rated [service]
- [service] reviews / [service] ratings
- [service] cost / how much does [service] cost / how much is [service]
- [service] cost per [unit]  *(per hour / per visit / per sq ft - trade-specific)*
- [service] price / [service] prices / [service] pricing
- [service] rates / [service] hourly rate
- [service] quote / get a [service] quote / free [service] quote
- [service] estimate
- [service] packages / [service] deals / [service] specials
- affordable [service]
- cheap [service] / cheapest [service] / budget [service]  *(price-shoppers - negative these out if you're premium)*
- [service] vs [competitor]  *(brand-vs-brand OR method-vs-method - "repair vs replace")*
- [service] alternative / alternatives to [service]
- compare [service] / [service] comparison

`cheap`, `cheapest` and bare `[service] cost` pull tire-kickers, and many premium accounts block these. "Quote" and "estimate" can hide real buyers - test before negating. Practitioners now warn that over-blocking is the more common mistake: "people are just overusing negative keywords" · (b), Optmyzr, February 2026.

---

## 5. Symptom and problem

High intent when urgent, and service-specific, so Claude generates these per trade rather than pulling them from a template. People search the **crisis before they know the service name**.

**URGENT symptoms convert.** Bid up, route to a "call now" ad and an emergency landing page.

**RESEARCH symptoms become negatives.** They start with "how to", "why is my", "what causes", "cost", "best", "DIY" or "fix it yourself", and their top results are tutorials (iFixit, Family Handyman, manufacturer blogs), not service providers.

### Urgent symptom searches that convert, by trade

**Plumbing**
burst pipe · no hot water · blocked drain · toilet overflowing · water heater leaking · frozen pipes · sewer backup

**HVAC**
ac not cooling · ac blowing warm air · no heat · furnace not working · ac freezing up · furnace loud noise

**Electrical**
breaker keeps tripping · power out in one room · outlet not working · outlet sparking · burning smell from outlet · lights flickering

**Roofing**
roof leaking now · shingles blown off · missing shingles after storm · hail damage roof · ceiling water stain · emergency roof tarp

**Locksmith**
locked out of house · locked keys in car · key fob not working · broken key in lock · lost house keys · rekey home

**Pest control**
bed bugs in mattress · mice in walls · rats in attic · wasp nest · cockroach infestation · termites

**Garage door**
garage door won't open · garage door won't close · off track · broken spring · stuck · grinding noise

**Appliance repair**
fridge not cooling · washer won't drain · dryer not heating · oven not heating · dishwasher not draining

**Auto repair**
car won't start · car overheating · check engine light on · grinding brakes · clicking won't start · flat tire

**Dental**
severe toothache · broken tooth · knocked out tooth · tooth abscess · lost filling · crown fell off

**Legal**
car accident lawyer · injured at work · slip and fall · arrested need lawyer fast · wrongful termination · dog bite injury

**Water damage and restoration**
flooded basement · water in basement · ceiling leaking water · black mold · sewage backup cleanup

**Towing**
tow truck now · car broke down · stuck in ditch · need a jump start · accident recovery tow

**Cleaning**
move out cleaning · deep cleaning today · post construction cleaning · carpet stain removal · one time house cleaning

**Landscaping and lawn**
lawn mowing near me · overgrown lawn cleanup · tree fell on house · leaf removal · weed control service

---

## 6. Qualifier and trust

Pre-filters buyers from browsers.

- licensed [service]
- insured [service] / licensed and insured [service]
- bonded [service] / licensed bonded insured [service]
- certified [service] / accredited [service]
- [manufacturer] certified [service]  *(authorized-dealer badge - "Carrier certified"; strong, low volume)*
- BBB accredited [service] / A+ BBB [service]  *(thin as a keyword, strong in ad copy)*
- [service] free estimate / [service] free quote / [service] free consultation
- [service] with financing / [service] financing available / [service] payment plans
- [service] warranty / [service] guarantee / [service] satisfaction guarantee
- family owned [service]
- trusted [service] / reliable [service]
- experienced [service] / [X] years experience [service]
- award winning [service] / 5 star [service]

---

## 7. Audience and segment

Splits the same service by buyer type.

- residential [service] / commercial [service] / industrial [service]
- [service] for small business / small business [service]
- [service] for homeowners
- [service] for landlords / [service] for property managers
- [service] for seniors
- [service] for businesses / [service] for offices
- [service] for startups / [service] for enterprise / enterprise [service]
- [service] for [property type]  *(apartments / restaurants / HOAs / old houses)*
- [service] for [audience condition]  *(new construction / rentals)*

---

## 8. Online, digital and B2B

For services delivered remotely - design, dev, marketing, bookkeeping, VA work, consulting - the geo buckets thin out and these take over.

### Online, digital and remote

- freelance [service] / [service] freelancer / freelance [service] for hire  *(high volume, low-budget one-off buyers)*
- hire a [service] / hire freelance [service]
- remote [service] / virtual [service]
- [service] online / online [service] / online [service] services
- outsource [service] / outsourced [service]
- [service] agency / [service] company / [service] studio
- done for you [service] / managed [service]
- [service] as a service / [service] subscription

### B2B and professional

- [service] for startups / for ecommerce / for SaaS / for [industry]
- best [service] for [industry / use case]  *(one of the highest-intent B2B shapes)*
- outsourced [service]  *("outsourced CFO / marketing")*
- [service] consultant / [service] consulting / [service] firm
- [service] provider / [service] vendor
- white label [service] / [service] reseller  *(buyer is another agency)*
- fractional [service]  *("fractional CMO / CFO" - high value)*
- [service] retainer / monthly [service] retainer  *(recurring-revenue buyer, high LTV)*
- [service] partner / [service] solution / [service] platform

The profitable cluster for digital services is **agency, firm, fractional, retainer, consultant and white label** - higher budget, recurring.

The **freelance, cheap and affordable** cluster has volume but poor lifetime value. Bid lower and separate it out. "Software", "tool" and "platform" can pull DIY-product seekers - qualify or negative them.

---

## 9. Competitor and brand - use with caution

- [competitor]
- [competitor] reviews / [competitor] alternative / [competitor] vs
- [competitor] competitors / alternative to [competitor]

**Local-service caveat, from real testing.** People searching a competitor's brand are usually already that competitor's referral or returning customer - they're navigating, not shopping. You win the click but rarely the customer. Judge conquesting on **cost per booked job, never clicks**, and expect it to underperform what click volume implies.

**Where competitor keywords come from.** Keyword Planner takes a URL or a whole site as the seed, so the top three local competitors' service pages are a free keyword source · (a). Semrush Advertising Research lists a domain's paid keywords, ad copy and cost per click · (b). Auction Insights only tells you who overlaps with you on your own keywords; it never lists theirs · (b).

---

## 10. Negatives - block before you spend

The other half of keyword research. Add buckets 1 to 9 at the **account level** (Tools -> Shared Library -> Negative keyword lists), on broad match. This list of roughly 220 words blocks every major non-buyer group before they cost you a click. Accounts using negative keywords saw conversion rates up to three times higher than accounts without them · (a), WordStream 2025 benchmarks, 16,000+ campaigns. A Search negative list holds up to 5,000 terms and an account holds 20 lists · (b), so there is room.

**Negatives do not match close variants.** Google's help page says plurals, synonyms and variations must be added by hand · (a). Google reportedly added automatic misspelling coverage for negatives in 2025 · (b); until that shows in the help page, misspelling negatives cost nothing to keep. Plurals and synonyms are always on you.

**1. Job seekers**
job, jobs, career, careers, hiring, employment, employer, recruiter, recruiting, recruitment, headhunter, resume, cv, cover letter, salary, wage, wages, compensation, vacancy, opening, openings, internship, intern, apprentice, apprenticeship, "work from home", "looking for work", "job description", "job listing", "apply now", application, interview, indeed, glassdoor, ziprecruiter, staffing, temp

**2. DIY and how-to**
diy, "do it yourself", "how to", "how do i", "how to make", "how to build", "how to fix", homemade, handmade, "step by step", instructions, tutorial, "self taught", craft, crafts, "fix it yourself"

**3. Education, research and students**
course, courses, class, classes, training, certification, certificate, degree, diploma, university, college, school, academy, student, students, learn, lesson, teacher, tutor, seminar, workshop, webinar, textbook, syllabus, curriculum, exam, quiz, thesis, dissertation, scholarship, udemy, coursera, "what is", "what are", definition, define, meaning, example, examples, basics, fundamentals, beginner, 101, explained, introduction, "intro to", versus, "pros and cons", "types of", "list of", statistics, history, "case study", "white paper"

**4. Free and cheap freebie hunters**
free, freebie, "no cost", "no charge", complimentary, cheap, cheapest, inexpensive, "low cost", discount, discounted, coupon, "promo code", deal, deals, bargain, clearance, liquidation, rebate, giveaway, sample, samples, "free trial", trial, voucher, "on sale", "for free", "pro bono", "legal aid"

**5. Information and non-commercial**
reddit, quora, wikipedia, wiki, forum, forums, blog, blogs, article, articles, news, newsletter, magazine, journal, info, information, faq, guide, guides, podcast, discussion, "case studies", report, advice, theory

**6. Media, file and asset seekers**
pdf, template, templates, worksheet, printable, checklist, "cheat sheet", download, downloads, downloadable, ebook, image, images, photo, photos, picture, jpeg, jpg, png, logo, icon, graphic, font, mockup, video, videos, youtube, vimeo, mp3

**7. Existing customers and support**
login, "log in", "sign in", account, "my account", password, "customer service", "customer support", "help desk", support, contact, "phone number", "tracking number", refund, cancel, cancellation, complaint, warranty, "warranty claim", return, returns, recall, hours, "opening hours", directions

**8. Restricted and brand-safety**
porn, xxx, sex, nude, adult, escort, webcam, dating, gambling, casino, betting, poker, lottery, crypto, cryptocurrency, bitcoin, nft, mlm, "pyramid scheme", "get rich quick", torrent, pirated, crack, keygen, "license key", hack, cheat, freeware, github, illegal, scam

**9. Adjacent intent mismatch**
used, "second hand", refurbished, vintage, antique, rent, rental, lease, borrow, parts, "spare parts", supplies, wholesale, bulk, distributor, "factory direct", manufacturer, retail, retailer, "near me jobs", software, app, api, plugin

**10. Price and quote shoppers** *(test before adding - can hide real buyers)*
quote, quotes, price, pricing, "how much", cost, calculator, estimate, estimator

Add buckets 1 to 9 immediately, then **read `references/search-terms.md` for the over-blocking traps** before pushing: bare `free` kills "free estimate", bare `license` kills "licensed plumber", `warranty` kills "water heater warranty repair", and `cheap` is a real buyer for a business that competes on price. Remove every serviced city from any geo list. **Hold bucket 10** and watch the search-terms report for 30 to 60 days first. Then add account-specific negatives on top: competitor brand names plus their misspellings, and any city or region you don't serve.

**The search terms report only shows part of the picture.** Since 1 September 2020 Google hides queries under a privacy threshold · (a). At the time that hid about 28% of spend and 20% of clicks, and hidden queries carried higher costs per click · (b). Review search terms weekly for the first 60 days, then run n-grams on what is visible.

---

## How to apply - the four-step flow

1. **Expand the patterns.** Swap `[service]` into every bucket. Free, instant substitution. Output: 100 to 200 candidate keywords. No city substitution - see the top of this file.
2. **Add the service-specific layer.** Claude generates the sub-services, symptoms and trade jargon a generic template can't guess. **Do not add misspelled keywords** - exact and phrase already match misspellings, plurals, stems and reordered words · (a). Misspellings only matter on the negative side.
3. **Check the cities, don't cross-join them.** Review every suburb, neighborhood and region you cover to set the geo-target boundary and spot demand outside it. Keyword Planner forecasts can be split by city, region, DMA and device since July 2025 · (b), which is how you see which places carry the demand without building city keywords. Expand by **conversion data, not ambition** - add areas adjacent to your proven winners, not "everywhere."
4. **Filter to winners.** Run the Keyword Planner API (`GenerateKeywordIdeas` for expansion, `GenerateKeywordHistoricalMetrics` for the final list), **pass the whole service area as one `geo_target_constants` set and match the language** because national volume is misleading and per-city pulls are rounded and don't add · (a). Pull `GOOGLE_SEARCH` only. Drop everything matching a negative, quarantine rather than delete the rest, then rank by **buyer-intent tier first, search volume second.**

"Winning" means real buyer intent AND either volume or a priced parent. Steps 1 to 3 are free; only step 4 needs Google's data.

### What the Planner numbers actually are

- **Average monthly searches** is a 12-month average for the keyword and its close variants, exact-match stats regardless of the match type you type, for the location and network you picked · (a). It updates monthly.
- **Ranges versus exact numbers.** Accounts with no or low spend see buckets like 1K to 10K; accounts with a live campaign and spend see exact averages · (b). Google has never published the spend threshold · (b), and accounts with live campaigns sometimes still see ranges · (c). Mark any ranged number ESTIMATE and say so at the top of the file. Do not promise that a dollar a month fixes it.
- **Top of page bid, low and high** is the 20th and 80th percentile of what advertisers paid for top-of-page in the last 30 days, assuming the query exactly matches the keyword · (a). It is a range of what the auction has cost other people, not a forecast of your click. The API returns both as micros, plus `average_cpc_micros` when asked.
- **Competition** is LOW, MEDIUM or HIGH plus a 0 to 100 index · (a). Competition and a top-of-page bid together are the hire-intent signal: businesses pay for that click because it converts for somebody.
- **Monthly search volumes** come back as 12 monthly points · (a). Read them before calling a term small - a furnace term in July is not small, it is out of season.
- **Forecasts** take bid, budget, seasonality and match type into account; historical metrics do not · (a). Use forecasts for a budget read, historical for "is there demand".
- **Low search volume** status means near-zero worldwide history over 12 months; the keyword goes inactive and reactivates on its own within about a week when searches return · (a). Practitioners see it under roughly 10 to 20 searches a month · (c). It does no harm sitting there.

---

## Structure rules so the keywords actually perform

### Match types in 2026

**Exact is not exact.** Exact match triggers on misspellings, plurals, stems, abbreviations, accents, reordered words, added or dropped function words, implied words, synonyms and paraphrases, and searches with "the same intent" · (a). Close variants apply to every match type and cannot be switched off · (a). Phrase match shows on searches that "include the meaning" of the keyword, with words before or after and reordering, since it absorbed modified broad in July 2021 · (a), (b). Broad shows on "related" searches that may not contain the keyword's meaning, and reads the landing page, the other keywords in the ad group and the searcher's recent history · (a).

**Phrase is the default for a new lead-gen account.** The three large independent studies of 2024 and 2025 all have exact winning on conversion rate and cost per lead, phrase as the widest safe net, and broad as a volume lever · (a):

- Adalysis, September 2025, 16,825 non-brand campaigns: exact is 54% of keywords, 23% of impressions and 40% of conversions. Under Maximize Conversions and Target CPA, the lead-gen strategies, exact wins, phrase brings the most conversions but the worst cost per lead, and broad takes half the impressions at the lowest conversion rate. Their recommended path is exact, then phrase, then broad.
- Optmyzr, March 2024, 4,000+ accounts: exact beat broad on conversion rate in 62% of accounts and on cost per lead in 74%, with the gap "closing".
- Optmyzr, November 2024, 992,028 keywords: exact ROAS 415%, phrase 313%, broad 277%.

Google's own position is that broad is the default match type and that Smart Bidding is critical with it · (a). Google claims about 25% more conversions moving phrase to broad under Target CPA · (a) as a claim. Independent relays of the same claim put it nearer 10% · (b). Phrase costs have risen faster than broad, 43% versus 29% between June 2023 and June 2025 across 7,000 accounts · (a), which is the real pressure toward broad - but only once the account can steer it.

**Broad match needs all five of these, or it burns budget:**

- A conversion-based Smart Bidding strategy (Maximize Conversions, Target CPA, Target ROAS) · (a)
- At least 30 conversions a month at campaign level, 50 for Target ROAS · (a)
- Shared negative lists live and someone reading search terms weekly · (b)
- Brand exclusions set, and ideally qualified-lead or offline conversions imported so it optimises to booked jobs, not form spam · (b)
- Enough budget that a bad week is survivable; thin budgets and high click costs are the two stated reasons to avoid it · (b)

**Ramp into it.** New accounts start on phrase with proven queries promoted to exact, then introduce broad as a capped experiment once Smart Bidding has signal. Keep broad in the same ad group as its exact and phrase siblings, or add the group's exact keywords as exact negatives on the broad group, so the identical-query rule routes each search to the tightest keyword · (a) for the matching hierarchy, (b) for the tactic.

**After any bid strategy change, re-check match types.** In December 2024 advertisers reported broad being switched on automatically when they moved to conversion bidding; Google's Ads Liaison called it "not expected" · (b). Audit, don't assume.

### Ad group structure - STAG, not SKAG

Group **5 to 15 close synonyms** that share ONE ad and ONE landing page. That is a Single Theme Ad Group. Over 15 in a group means two themes or padding · (b). The old one-keyword-per-group approach is dead - close-variant matching made it pointless, and it starves Smart Bidding by fragmenting conversion data · (b), Kirk Williams, 2022.

Never segment by match type across ad groups or campaigns; one theme holds all its match types · (b).

Keep tight **keyword to ad to landing-page** relevancy. That is what lifts Quality Score, which lowers cost per click. Quality Score has three parts, expected click-through rate, ad relevance and landing page experience; Google publishes no weights, and the "39/39/22" figure in circulation has no source · (c). Since February 2025 a landing page can be rated below average before it has any traffic, on navigational clarity, transparency and whether the ad's promise matches the page · (c), single vendor. Same page, different keyword, different rating.

Keep distinct intents in separate groups. Emergency repair, planned installation and price-shopping each get their own message, even within one trade.

### Avoid cannibalization

One ad group "owns" each theme. When a term could trigger two groups, add it as an **exact-match negative** in the group that shouldn't own it.

Use shared negative lists for account-wide exclusions, and review the search-terms report weekly to catch internal-auction overlap.

---

## Money - what a keyword list has to say before launch

- **Click cost guess** = the midpoint of top-of-page low and high, rounded up for a new account because Quality Score starts low · (c) for the midpoint, (a) for what the numbers are. Label it as Google's 20th to 80th percentile, not "the CPC".
- **Clicks a month** = budget divided by the click cost guess.
- **Leads a month** = clicks times the subcategory conversion rate until the account has its own. 2025 home services priors, 3,211 US campaigns · (a): cleaning 17.7%, handyman 13.5%, painting 10.8%, electrical 9.1%, plumbing 7.6%, heating 7.5%, air conditioning 6.6%, roofing 3.7%, general contracting 2.6%. Overall 7.3%. Cross-industry 2025: 8.2%, with legal at 2.6% and automotive repair at 14.7%.
- **Cost per lead priors, same study**: cleaning $47, handyman $54, electrical $94, plumbing and heating $129, roofing $228. Overall $91. Click costs: painting $13.74, electrical $12.18, roofing $10.70, plumbing $10.49, HVAC $9.30 to $9.68. Costs rose for 75% of home services businesses year on year, so refresh these every year.
- **Local Services Ads floor**, 100+ clients, August 2025 · (b): plumbing $69 a lead, HVAC $80, roofing $162, locksmith $34. If the Search estimate lands far above these, say so. LSA moves inside Google Ads as Performance Max with pay-per-lead goals from August 2026 for US home services, wider late 2026, non-US in 2027; it stays keywordless and targets by service category and area · (a).
- **How many ad groups a budget can test.** Smart Bidding wants 30 conversions a month at campaign level · (a). An ad group needs roughly 50 clicks a month before its numbers mean anything · derived. Count the groups the budget can feed at that rate and put the answer in the file. Splitting a small budget across many campaigns is the named failure mode · (c); one campaign with ten ad groups at five conversions each still trains on fifty.
- **Volume floors.** About 50 searches a month per typed keyword is the practitioner convention · (b). Under phrase match the parent term catches the thin children, so the floor applies to what you type, not to what you capture. Quarantine the thin ones under their parent; never delete them.

---

## AI Max and Performance Max - what they do to a keyword list

- **AI Max for Search**, launched 6 May 2025, is a campaign setting, not a campaign type. It adds broad-match-plus-keywordless matching from your keywords, assets and landing pages, generated headlines, final URL expansion, brand inclusions and exclusions, and an ad-group "location of interest" control. The search terms report gains an "AI Max" match type value · (a). Google claims 14% more conversions at similar cost, 27% for accounts mostly on exact and phrase · (a) as a claim.
- **What independent tests found**, December 2025 to June 2026 · (b): it treats your exact and phrase keywords as broad too, so match-type performance can no longer be read; it often takes credit for queries your keywords already matched; brand terms trigger non-brand queries and the reverse; across tests the median cost per lead rose 16% and invalid traffic went from 3.7% to 5%; one account saw 69% of impressions on competitor brand terms.
- **The rule for this repo**: launch without AI Max. Test it only on a campaign with history, with brand exclusions set, and read the "AI Max" rows in the search terms report on their own · (b).
- **AI Overviews and AI Mode** placements only serve from broad match · (b), and trigger on 3 to 7% of local and shopping queries versus 74% of research queries · (b). For a trade that is not yet a reason to go broad.
- **Keywords are less central, not gone.** Exact keywords "remain powerful across most scenarios"; start exact, layer phrase, and keep a keyword list as the foundation even where automation runs · (b), March 2026.

*(See the keyword-research and account-structure track videos for each step.)*

---

## What changed in this revision

- Added a grading key at the top and graded every claim (a), (b), (c) or Jono's ruling. Evidence lives in `references/research/research-keywords.md`.
- The no-city rule keeps every one of Jono's ruling lines verbatim and gains an evidence section: Google's match type and Keyword Planner wording, the 2023 removal of interest-only targeting, Google's +5% claim being limited to travel, real estate and education, Smart Bidding's location signal, and Adalysis' December 2025 "near me" misrouting under AI Max. The reverse-location carve-out is named so nobody reinvents city keywords for it.
- Bucket 2 no longer lists the city, suburb, county, zip and landmark shapes it told you to skip. Documenting a retired shape is a trap. The stacked examples now use "near me", never a city.
- Match types section rewritten. "Broad match plus Smart Bidding is the best-performing default" is replaced by "phrase is the default for a new lead-gen account", on the Adalysis September 2025, Optmyzr March 2024 and Optmyzr November 2024 studies. Broad's five preconditions are listed with grades, the 30 and 50 conversion baselines are cited to Google, and the December 2024 auto-toggle incident is recorded.
- Ad group size tightened from "3 to 20" and "10 to 20" to 5 to 15, and match-type segmentation across groups is banned.
- "Add misspellings as keywords" removed: exact and phrase already match misspellings per Google. Misspellings stay relevant only as negatives, with the 2025 automatic-coverage report noted and graded (b) against Google's help page (a).
- "The one-dollar hack" replaced with the honest position: Google has never published a spend threshold for exact volumes, and live accounts sometimes still see ranges.
- Negative list limit corrected: 1,000 is the Display and Video account cap; Search lists take 5,000 each, 20 per account. The untraceable "cuts wasted spend by 20 to 30%" line replaced with WordStream's "up to three times higher conversion rate" and Optmyzr's finding that account-level exclusions barely moved PMax cost per lead.
- New "What the Planner numbers actually are" section: 12-month average of close variants, exact-match stats regardless of match type, rounding across locations, 20th and 80th percentile bids over 30 days, competition index, monthly volumes for seasonality, forecast versus historical, low search volume status, the API field names, and the July 2025 localized forecasting feature.
- New "Money" section with 2025 LocaliQ home services conversion, cost per lead and click cost priors, LSA cost per lead floors, the LSA to Performance Max migration dates, the 30-conversion Smart Bidding baseline, the 50-clicks-per-ad-group reading floor, and the 50-searches keyword floor.
- New "AI Max and Performance Max" section with Google's claims, the independent findings from Adalysis, Search Engine Land and Connective, and the rule to launch without it.
- Search terms privacy threshold (1 September 2020, about 28% of spend hidden) added to the negatives section, with weekly review and n-grams as the response.
- Competitor keyword sources added to bucket 9: Keyword Planner URL and site seeds, Semrush Advertising Research, and what Auction Insights does and does not show.
- Bucket 1 now says plainly that no large study ranks modifiers by conversion rate; modifier-level conversion is a test variable per account.
- Bucket 4 and bucket 10 carry the over-blocking warning from Optmyzr, February 2026, and point to `references/search-terms.md`.
- Hyphens throughout; no em-dashes, no tables.
