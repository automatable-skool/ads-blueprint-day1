# Research dossier - Google Ads Search structure for local lead gen, Smart Bidding era
Built 28 August 2026 · 72 sources read · 33 rules graded at the end
Next: use this to revise references/stag.md (draft in ref-stag.md beside this file).

Grades used everywhere below:
- (a) Google official documentation or a named Google spokesperson, or a fact confirmed by three or more independent practitioners with data
- (b) two or more independent practitioner sources agreeing, or one source with a real dataset
- (c) a single source, an opinion, or a number that could not be traced to data

Method note: WebSearch hit the session cap after the first sixteen queries, so the remaining sources were fetched directly by URL. Everything fetched is listed in the source register. Pages that returned 403 or 404 (WordStream, PPC Hero, Zato Marketing, Optmyzr naming, Supermetrics, Reddit) are noted as not read and nothing is cited from them.

---

## Findings by area

### 1. SKAGs are dead as a default - and why

- (a) Close variants timeline: introduced 2014 (misspellings, plurals, stemming); 2017 exact match adds reordered and function words; September 2018 exact match adds same-meaning synonyms and intent; July 2019 same-meaning matching extended to phrase and broad match modifier; February 2021 broad match modifier retired and folded into an expanded phrase match. Sources 2, 9, 17, 42, 72.
- (a) Google's current close-variant definition for exact and phrase includes "synonyms and paraphrases" and "words that have the same search intent". Exact match example: [bathing suits] matches "swimming suits". Source 2.
- (a) The one-keyword-per-ad-group premise (control the exact query) no longer exists because you cannot opt out of close variants. Source 43 (Google quoted: "no opt out option").
- (b) Smart Bidding pools learning at the campaign level, not the ad group level, so SKAG ad groups mainly cost management time and RSA asset data rather than bid learning. Sources 8, 15, 29.
- (b) Practitioner consensus 2024-2026 against SKAGs: Store Growers (2026), Unbounce (2019), Jyll Saskin Gales ex-Google ("the anti-machine learning", 2024), Oxedent (2023), sitecentre (Jan 2026), Store Growers match types (Mar 2026), SavvyRevenue (Jan 2026). Sources 9, 33, 34, 45, 72, 66, 15.
- (b) The SKAG defence still exists: Matt Bowen of Logical Position (SEL, 19 July 2024) says across 6,000 managed accounts SKAGs "consistently win" on Quality Score and CPC, concedes close variants and broad match made them worse than in 2019, and says signal liquidity matters only at the campaign level with a floor of 30 conversions a month per campaign, ideally 100. KlientBoost (the SKAG originators) still recommend one keyword in phrase plus exact. Sources 8, 68.
- (c) Kirk Williams' public reversal on SKAGs could not be fetched from any URL tried, so it is NOT cited. Do not attribute a recant to him in the spec without a live link.

### 2. STAG / single-intent ad groups - definition, sizing, the test

- (a) Google's own version of the same-ad test, from the Quality Score help page: "Look for ad groups with many different keywords that can't be easily addressed by the same ad. Split these ad groups into multiple ad groups." Source 7. This makes the spec's one test official guidance, not folklore.
- (a) Google's ad group guidance gives no keyword count. "Use ad groups to organize your ads by a common theme... the different product or service types you offer." Source 24.
- (a) Brad Geddes (Adalysis, 22 October 2025): "every keyword and every asset in an ad group should work together"; split when assets serve only part of the group. Hotel case: Google paired pet keywords with irrelevant headlines until the group was split. Source 13.
- (b) Keywords per ad group, practitioner range 2025-2026: Groas 5 to 15; Omologist 5 to 10 with a restructure trigger at 50+; Store Growers 5 to 10; LeadsBridge 5 to 15; sitecentre 3 to 20; Oxedent 3 to 5 for STAG, 5 to 20 as the Google-aligned upper bound. Sources 31, 32, 66, 53, 72, 45.
- (b) Ad groups per campaign: Groas and Omologist say 7 to 10 is the effective range; SEL (Brousell, 1 July 2026) says 3 to 5 tightly themed ad groups per campaign for accounts under 30 to 50 conversions a month. Sources 31, 32, 11.
- (b) Tenscores (2023): group by intent, not by semantic family; intent grouping needs fewer keywords for the same coverage. Source 44.
- (c) The existing spec's 3 to 8 working range sits inside every published range and is safe to keep. The 15+ "two intents merged" trigger matches Groas' upper bound.

### 3. Consolidation (Hagakure) - the data, and the counter-argument

- (a) Google, February 2026 (Brandon Ervin, Director of Product Management, via SEJ): "Consolidation is not necessarily the goal itself"; keep segmentation where budgets, bidding objectives, reporting, or real regional operations differ; consolidate when the structure only exists from legacy best practice or dilutes signals. Benchmark quoted: 15 conversions over 30 days, which can be met across campaigns via shared budgets or portfolio bid strategies. Source 12.
- (a) Google Smart Bidding help: at least 30 conversions in a month for accurate measurement; 50 for Target ROAS; portfolio strategies let new campaigns borrow data. Source 25.
- (b) Hagakure prescriptions (Adchieve, May 2021; Google Think, Feb 2023): one landing page per ad group, ad groups need 3,000+ impressions a week, DSA ad group inside the same campaign, Smart Bidding, RSAs. Catawiki went from 100+ campaigns to a little over ten: +40% conversions at the same CPA. Adchieve cases: UK 100 SKAG campaigns to 1, +16% conversions, -22% CPA; Germany +37% conversions, -24% CPA; Netherlands 25 to 1, +52%, -20%; Belgium 40 to 1, +29%, -18%; Sweden slight underperformance in a small, data-poor account. Sources 36, 35.
- (b) PPC Mastery (Miles McNair, 16 July 2025): 44 non-brand Search campaigns merged into 7 gave +345% conversion value and +22% ROAS; a lead-gen account 19 to 4 gave +253% conversions at -60% CPA; another lead-gen +94% conversions, -17% CPA. Also: 2,000+ impressions a month per ad group is the floor for RSA asset performance labels. Source 29.
- (b) HopSkip (17 June 2026): 208 ad groups consolidated; November 2025 vs 2024 +40% conversions, CPA $5.39 to $4.68; December +47% conversions, CPA -37%. Source 30.
- (b) SEL (Brousell, July 2026): Smart Bidding "typically 30 to 50 conversions per campaign per month" to leave learning; 12 campaigns at 8 to 12 conversions each never exit learning. Source 11.
- (b) tripledart (Apr 2026) and Adchieve: 50+ conversions per campaign per month and 3,000+ impressions per ad group per week as the Hagakure-grade floors. Sources 54, 36.
- (b) The counter-argument, stated by people who consolidate: Andrew Lolk (Jan 2026) "Smart Bidding can enter the same auction from multiple places in the account. It gets confused" - the fix is fewer overlapping groups, not more; SEL Hagakure piece (Wenner, May 2025) lists loss of control, broad match drift, and budget drain when inventory depth is thin. Sources 15, 10.
- (b) Where practitioners still split campaigns: brand vs non-brand always; materially different CPA targets; different budgets; different geography with different economics; different languages. Not valid reasons: match type alone, device alone, funnel micro-stages. Sources 32, 12, 3.
- (c) Matt Bowen's counter: signal liquidity matters at the campaign level only, so granular ad groups inside a consolidated campaign cost nothing for bidding. This is the strongest argument for keeping STAGs inside few campaigns rather than going full Hagakure. Source 8.

### 4. Intent clustering methods

- (a) Google decides intent for you at match time. Since 23 September 2021, when a search is not identical to any keyword, Google picks the ad group using "the meaning of the search term, the meaning of all the keywords in the ad group, and the landing pages within the ad group", and a more relevant keyword can win even with lower Ad Rank. Sources 17, 16, 18. Consequence: the keywords and final URL you put in a group are routing signals, not just targets.
- (b) SERP-overlap clustering (an SEO method, adapted here): 3 or more shared URLs in the top 10 is the common "same intent" threshold (mcp-serp-clustering, HubSpot, keywordly). Stricter tools use bands: 7 to 10 shared = strong, 4 to 6 = moderate, 2 to 3 = weak, 0 to 1 = separate (claude-seo). keywordly: 6 to 8 shared for "highly related", 3 to 4 for loose grouping. WriteIntent makes the threshold configurable per niche. Sources 58, 59, 60, 61.
- (c) No source applies SERP overlap to ad-group design. The spec's use is an adaptation. Safe reading for ads: 3+ shared URLs is a "do not split" signal (Google already collapses them); 0 to 1 shared plus a visibly different result type (guides vs service pages) is split evidence. Between 2 and 3 is undecided - use the "watch" tag.
- (a) Close variants are Google's own same-intent grouping, so any two keywords that are close variants of each other are already one keyword. Listing them separately gains nothing. Source 2, 43 (Google's Redundant Keywords recommendation exists for exactly this).
- (b) Keyword grouping tools: intent-first grouping (Tenscores), SERP-overlap tools (keywordly, WriteIntent, the open MCP server). None replace the same-ad test. Sources 44, 59, 60, 58.

### 5. Campaign axis - service vs region vs intent temperature

- (b) By service is the default for local lead gen in every 2026 local guide read: bspkn (June 2026) "one campaign per core service"; Groas local services (April 2026) "separate campaigns for roof repair, roof replacement, and roof inspection"; Omologist. Sources 51, 55, 32.
- (b) By region only when the regions have different economics or different operations (Google Feb 2026; Omologist; Groas multi-location May 2026 says campaign per location for 3 to 15 genuinely distinct markets, location ad groups for 15 to 50). Button Block (July 2026): $500 to $800 a month per location campaign as a practical floor; add competing cities as negatives across location campaigns. Sources 12, 32, 56, 64.
- (b) Intent temperature (urgent vs planned) is a campaign axis only when it needs its own budget, schedule, or CPA target. Every source that names emergency work says it runs 24/7 with a higher CPA and therefore earns a campaign. Sources 51, 55, existing spec.
- (a) The rule that resolves it: budget, bid strategy, location targeting, and ad schedule are campaign-level settings (Google location targeting help; broad match campaign setting help). Sources 19, 5.
- (b) Brand always separate from non-brand. Sources 32, 3, 12.

### 6. City as an axis

- (a) Location targeting is set at campaign level. The only ad-group-level location feature is "Locations of interest", an AI Max option that targets geographic intent in keywordless matches. Source 19.
- (a) Location insertion in RSAs supports City, State, Country; needs default text; needs at least 3 headlines without insertion; draws on the user's location, regular location, or location of interest, not on the query text. Source 21.
- (a) "Presence or interest" is the default and Google calls it recommended. "Presence" is the alternative. Exclusions are always presence-based. Source 20.
- (b) Every local practitioner source read recommends switching to Presence for service-area businesses: Groas local (Apr 2026), Adcumen (Apr 2026, example: 60 Tacoma clicks over 90 days, zero conversions, for a Seattle cleaner), Button Block (Jul 2026). Sources 55, 46, 64.
- (c) The "20 to 35% of budget burned by Presence or interest" figure in the existing spec could not be traced to data in any fetched source. Keep as (c) or drop the number.
- (c) Thin city landing pages: "manual action penalties for as few as 30 to 40 doorway pages" (Search Foundry, May 2026, no dataset). Source 63.
- (c) The one dissent: Groas multi-location says dynamic location insertion produces "generic-feeling ads" and recommends market-specific messaging where a location is a real market. This applies to multi-location businesses with distinct stores, not a single service-area business. Source 56.
- (c) The city-in-keyword habit (SEO carryover) is not endorsed by any source read; the close-variant rules mean "plumber toronto", "toronto plumber", and "plumber in toronto" are one keyword, and implicit local intent (no city typed) can never land in a city ad group. Sources 2, 19.
- Inconsistency to fix: references/examples/stag-map-example.md builds 54 city ad groups and appends the city to every keyword, directly contradicting stag.md section 6 and the /stag command ("never city"). It also contains a markdown table (budget), which output-format.md bans. Either the example is rewritten or it stops being the shape to copy.

### 7. Routing: prioritization, cross-group negatives, cannibalization

- (a) Keyword prioritization, Ginny Marvin (SEJ, 24 July 2024) and Google help: 1) identical exact match keyword; 2) identical phrase or broad keyword or Performance Max search theme (Ad Rank between them); 3) AI relevance across ad groups using search meaning, all keywords in the ad group, and the ad group's landing pages; 4) Ad Rank. Identical keywords across campaigns: highest Ad Rank wins. DSA and Performance Max asset groups without search themes are chosen by Ad Rank against everything else in the account. Sources 16, 18, 1.
- (a) Correction to the existing spec: "Google resolves competing ad groups by Ad Rank, not relevance" has been wrong since September 2021. Relevance comes before Ad Rank for non-identical matches. Negatives are still required because relevance routing is not guaranteed and Google will not tell you which way a borderline query went until it has already served. Sources 17, 16.
- (a) Negative keywords do NOT use close variants. Plurals, misspellings, and stemmings must be added by hand. Sources 42 (quoting Google), 43. This directly affects the stag-map.md convention where a bare word becomes a broad negative: "drain" does not block "drains".
- (a) Negative match types: broad negative blocks any search containing all the words in any order; phrase negative needs the words in order; exact negative blocks only that query. Levels: ad group, campaign, account (1,000 cap), shared list. Sources 23, 27.
- (a) Cannibalization diagnosis (Ginny Marvin, July 2024): review keyword status, check whether another keyword already covers the traffic, and re-theme ad groups; "reorganizing around tighter ad group themes reduces unnecessary competition between your own keywords". Source 16.
- (b) Cross-group negatives to enforce routing (traffic sculpting) is still standard practice: Optmyzr (Feb 2026) Traffic Sculptor; datafeedwatch on DSA (add the account's keywords as DSA negatives). Sources 27, 50.
- (b) Wasted spend recovered by negatives: 20 to 40% of the average account goes to irrelevant queries; a maintained negative programme saves 15 to 30% (Groas, Feb 2026, house data). Source 73.
- (c) Optmyzr's 2024 study of 7,000 Performance Max campaigns found account-level exclusions made almost no CPA difference (0.24% conversion-rate gap). This is PMax, not Search, and argues that negatives must be placed at the level where routing happens (campaign and ad group), not sprayed at account level. Source 27.

### 8. Volume floors and keyword statuses

- (a) "Low search volume": very little or no search history over 12 months; rechecked about weekly; unrelated to Quality Score or bids; no harm in leaving it unless you hit account limits. Sources 6, 22.
- (a) "Paused (low activity)": Google auto-pauses a keyword with zero impressions in the past 13 months. Source 22.
- (a) Other limited statuses: "Below first page bid" and "Rarely shown due to low Quality Score". Source 22.
- (c) Monthly-search threshold for low search volume: Store Growers says keep 20 to 30 searches a month minimum; HopSkip (Oct 2024) says roughly 250 a month or fewer. Google publishes no number. Treat as unknown; use Keyword Planner ranges.
- (b) Ad group volume floors: 2,000+ impressions a month for RSA asset labels (PPC Mastery); 3,000+ impressions a week for Hagakure-grade learning (Adchieve, tripledart). The existing spec's 1,000 a week sits between them and is a reasonable merge line. Sources 29, 36, 54.
- (a) Campaign floors: 15 conversions in 30 days (Google, Feb 2026) as the minimum, 30 in 30 days for Target CPA stability, 50 for Target ROAS (Google Smart Bidding help; Optmyzr Sept 2025; Omologist). Sources 12, 25, 62, 32.

### 9. Quality Score and what structure does to it

- (a) Quality Score is a 1 to 10 keyword-level diagnostic with three components: expected CTR, ad relevance, landing page experience. "Quality Score is not an input in the ad auction." Broad and exact keywords in the same ad group can share a score when they serve the same searches. Source 41.
- (a) Ad relevance = how closely the ad matches the intent behind the keyword. Google's fix for low ad relevance is the same-ad split quoted in area 2. Source 7.
- (b) Adalysis: below-average ad relevance means the ad is not specific to every keyword in the group; fix by removing non-specific ads or moving keywords to a new ad group. Points model: above average 2, average 1, below 0, score = 1 + LP + relevance + CTR points. Source 57.
- (b) Landing pages affect only the landing page experience component, not expected CTR or ad relevance (Unbounce 2020). So the existing spec's "the landing page is not part of the same-ad test" holds for Quality Score. But per area 4 the landing page IS a routing signal for which ad group serves, so one ad group should carry one final URL. Sources 47, 17.
- (c) CPC effect claims: "below average to average ad relevance is about +3 Quality Score and up to -30% CPC" (Bowen); "Quality Score 5 to 8 cuts CPC 28%" (tripledart citing Adalysis-style curves). Directional only.
- (b) Optmyzr (Mar 2026): Quality Score still reflects relevance but matters less in broad-match, Smart-Bidding accounts; deprioritise it once CPA targets are met. Source 26.

### 10. DSA and Performance Max as structural complements

- (a) Google is upgrading DSA, automatically created assets, and the campaign-level broad match setting to AI Max. ACA and broad-match-setting campaigns upgrade 1 September 2026; DSA auto-upgrade was postponed to February 2027 (announced 11 June 2026). DSA ad groups become standard ad groups with settings ported. Google claims +7% conversions at similar CPA for the full AI Max suite. Sources 37, 40, 4.
- (b) DSA as catch-all: one DSA campaign or ad group is usually enough; add every keyword you already run as a DSA negative so it only catches gaps. DSA is chosen by Ad Rank against your keyword ads on non-identical queries, so without those negatives it will cannibalise. Sources 50, 18, 36.
- (a) Performance Max: a Search keyword identical to the query beats PMax; otherwise Ad Rank decides; PMax search themes identical to the query tie with phrase/broad keywords on Ad Rank. Source 16, 1.
- (c) "Search beats Performance Max by 25 to 45% on cost per qualified lead" (existing spec, from two agency blogs not re-fetched). Keep graded (c).
- (b) ppc.live (Apr 2026): half of accounts ran DSA, PMax, and AI Max concurrently with redundancy; avoid stacking all three. Source 38.

### 11. STAG - ad - landing page triangle, message match

- (a) Google Quality Score help: make ads more relevant to keywords, and update the landing page to match user intent. Source 7.
- (b) Message match definition (Unbounce): landing page copy matches the ad phrasing so the visitor knows they are in the right place. No conversion-lift dataset was found in any fetched source. Sources 48, 47.
- (a) Location insertion needs 3 insertion-free headlines; keyword insertion is unrestricted but risky on broad match (Tillison 2019: a UK debt firm inserted "Citizens Advice" and was ruled misleading by the ASA). Sources 21, 49.
- (b) RSA pinning: Adalysis (Oct 2025) recommends pinning proven headlines to positions 1 and 2 to cut the 47,000-combination space and speed learning; ignore Ad Strength. Source 13.
- (b) Max 3 enabled RSAs per ad group. Source 32.

### 12. Naming conventions

- (c) No authoritative convention exists. clicksgeek (Apr 2026) proposes "Search_Exact_Boston_DecisionStage_Plumbing"; LeadsBridge (June 2026) says include the segmentation details so anyone can read the purpose. Source 52, 53.
- (c) For this repo the useful rule is: the name states every campaign-level setting that differs (service, urgency, brand) and nothing that is the same everywhere. "Search - Emergency plumber" beats "Search_Phrase_GTA_Presence_Emergency".

### 13. API and account limits

- (a) 10,000 campaigns per account (active plus paused); 20,000 ad groups per campaign; 20,000 targeting items (keywords) per ad group; 50 active text ads per ad group; 10,000 negative keywords per campaign; 5,000 keywords per negative list; 20 negative lists per account; 1,000 account-level negatives; 5 million ad group targeting items per account; 1 million campaign targeting items per account. Sources 3, 23.
- (b) 3 enabled responsive search ads per ad group. Source 32.
- Practical reading: no local account ever hits these. The only limit that bites is the 1,000 account-level negatives, which is why hygiene negatives belong in a shared list (5,000 cap) and routing negatives sit on campaigns and ad groups.

### 14. 2025-2026 changes that affect structure

- (a) AI Max for Search: an optimization layer inside an existing Search campaign, not a campaign type. Search term matching uses "broad match and keywordless technology"; keywords are treated as broad for expansion. Search term matching and locations of interest are ad-group-level; text customization and final URL expansion are campaign-level. Brand inclusions and exclusions at campaign and ad group level. Google: "won't be effective if campaigns are limited by budget." Source 4.
- (a) The campaign-level broad match setting is NOT on by default; it requires conversion-based Smart Bidding and converts every phrase and exact keyword to broad. It auto-upgrades to AI Max on 1 September 2026. Source 5, 40.
- (a) Broad is the default match type for a keyword typed without syntax. Source 1.
- (b) Independent AI Max data: Smarter Ecommerce 250+ campaigns, median revenue +13%, median CPA +16%, only 22% hit their original ROAS target; Brainlabs 23 tests, all-three-features campaigns had 40% higher success rates; Lunio 900 campaigns, invalid traffic 3.7% to 5%; one lead-gen account, clicks tripled, CPC -59%, conversions -38%, CPL $493 to $850 and stayed above $800 after switching it off. Sources 38, 39.
- (b) Google's claims: +14% conversions at similar CPA, +27% for exact/phrase-heavy campaigns; +7% for the full suite (blog.google, Apr 2026). Sources 38, 37.
- (b) Brand exclusions for Search block competitor-brand matches including variants without manual misspelling lists. Source 16.
- (a) Journey-aware Target CPA bidding can learn from lead-to-sale stages, and offline conversion imports now have direct CRM integrations (SEL, 19 August 2026). Source 70.
- (b) AI Overviews trigger on only 3 to 7% of shopping and local queries vs 60 to 74% of informational ones, so local lead gen has less exposure to AI placements. Source 39.

---

## Myths, with the date they died

- "SKAGs give you control of the exact query" - died 17 September 2018 when exact match took same-meaning variants; finished July 2019 for phrase. Sources 9, 17, 2.
- "Broad match modifier is the safe middle" - retired February 2021, absorbed into phrase match. Source 42.
- "When two ad groups match, the higher Ad Rank always wins" - false since 23 September 2021; relevance across the ad group's keywords and landing pages comes first for non-identical queries. Source 17.
- "Quality Score is a bid multiplier in the auction" - Google: "Quality Score is not an input in the ad auction." Source 41.
- "Negative keywords catch plurals and misspellings like positive keywords do" - false; negatives have no close variants. Sources 42, 43.
- "More campaigns means more control" - Google Feb 2026: "Control still exists. It just looks different"; fragmentation below 15 conversions a month per campaign breaks bidding. Source 12.
- "A city ad group shows only to that city" - location targeting is campaign level; the only ad-group location control is AI Max locations of interest, and it is about intent, not presence. Source 19.
- "Google turned broad match on by default for everyone" - the campaign-level broad match setting is opt-in; what is true is that a keyword typed without syntax is broad, and opted-in campaigns auto-upgrade to AI Max on 1 September 2026. Sources 5, 1, 40.
- "DSA is a separate campaign type forever" - DSA ad groups convert to standard ad groups under AI Max from February 2027. Source 37.
- "Low search volume hurts Quality Score" - unrelated per Google. Source 6.
- "A keyword with no impressions stays live" - zero impressions for 13 months and Google pauses it. Source 22.

---

## Rules a structure command should enforce (33, graded)

Structure and the test
1. (a) Two keywords share an ad group only if the same ad serves both. Google's own wording: split any ad group whose keywords "can't be easily addressed by the same ad."
2. (a) Never add a keyword that is a close variant of one already in the group (plural, reorder, function word, same-meaning synonym). It is the same keyword.
3. (b) Working size 3 to 8 keywords per STAG, published range 5 to 15; 15 or more means two intents got merged.
4. (b) 3 to 10 ad groups per campaign; more than 10 in a sub-50-conversion campaign is a sign of over-splitting.
5. (a) One final URL per ad group. The landing pages in an ad group are a routing signal Google reads. Different ad groups may share a URL.
6. (b) Symptom keywords never share a group with service keywords.
7. (a) Brand keywords in their own campaign, always.

Campaign axis
8. (a) Campaign = anything that needs its own budget, bid target, schedule, or location targeting. Otherwise ad group.
9. (b) Default campaign axis for local lead gen is service. Urgency earns a campaign because it needs a 24/7 schedule and a different CPA.
10. (a) A campaign needs a path to 15 conversions in 30 days minimum (Google, Feb 2026) and 30 in 30 days before a Target CPA. Below 15, use a shared budget or portfolio strategy rather than a standalone campaign.
11. (b) Region is a campaign axis only when the regions have different economics or operations, never for one business serving one area.

City
12. (a) City is never an ad group axis and never appended to keywords; location targeting is campaign level and close variants already collapse the city phrasings.
13. (b) Location option set to Presence, not the default Presence or interest.
14. (a) City in the ad via location insertion with default text, at most two headlines, at least three headlines without it.
15. (c) A city graduates to its own ad group only on data: roughly 50 clicks or 20 conversions a month on its own geo-modified terms, over 60 to 90 days.

Routing and negatives
16. (a) One search routes to one ad group. Identical exact beats identical phrase/broad beats relevance beats Ad Rank; nothing below "identical" is guaranteed, so negatives enforce the design.
17. (a) Every word that defines one STAG is a negative on every STAG it does not define, built on day one.
18. (a) Negatives do not take close variants: add singular and plural, and common misspellings, for every routing negative.
19. (a) Hygiene negatives (diy, jobs, salary, free, how to) go in one shared list (5,000 cap); routing negatives go on the campaign or ad group they protect; account-level negatives are capped at 1,000 and skipped.
20. (a) A keyword touching two intents is assigned to the dominant need and negated in the other; two groups that keep fighting are one intent - merge.
21. (a) Cannibalization check after launch: search terms report by matched keyword; any query served by the wrong ad group becomes a negative there.

Volume
22. (b) Ad group floor: under about 2,000 impressions a month gets no RSA asset labels and is a merge candidate; about 1,000 a week is the comfortable line.
23. (a) Cut candidates: keywords marked Low search volume for 8+ weeks; keywords with zero impressions for 13 months are auto-paused anyway.
24. (a) Keyword Planner competition and top-of-page bid decide commercial intent; a single live search does not.
25. (b) Quarantine cut keywords in a list; never delete.

Match types and automation
26. (a) Phrase match default; broad only with conversion-based Smart Bidding, a mature negative set, and 30+ conversions a month.
27. (a) Never enable the campaign-level broad match setting on a STAG build: it converts every keyword to broad and auto-upgrades to AI Max on 1 September 2026.
28. (a) AI Max search term matching stays off at launch. If enabled later, enable it per ad group, set brand exclusions, and expect keywords to behave as broad.
29. (b) DSA, if run, gets every live keyword as a negative and is not stacked with Performance Max and AI Max at once.
30. (a) Keyword insertion only in phrase or exact ad groups with a clean default; location insertion is safe anywhere.

Ads and Quality Score
31. (b) Three enabled RSAs per ad group maximum; the ad's headlines mirror the group's keywords so ad relevance stays at or above average.
32. (a) Below-average ad relevance on any keyword is a structure fault: move the keyword or rewrite the ad, never leave it.
33. (c) Names state only what differs at campaign level (service, urgency, brand); ad group names are the intent stem.

---

## Source register (72 read)

Google official
1. About keyword matching options - https://support.google.com/google-ads/answer/7478529 - match definitions, broad is the no-syntax default, prioritization with PMax and AI Max
2. Keyword close variants definition - https://support.google.com/google-ads/answer/9342105 - same-meaning and same-intent variants for exact and phrase
3. About your Google Ads account limits - https://support.google.com/google-ads/answer/6372658 - every numeric limit used above
4. How AI Max for Search campaigns works - https://support.google.com/google-ads/answer/15910187 - layer inside Search, keywordless matching, ad-group-level controls
5. About the broad match keywords campaign setting - https://support.google.com/google-ads/answer/13389795 - opt-in, Smart Bidding required, Sept 2026 upgrade
6. Low search volume definition - https://support.google.com/google-ads/answer/2616014 - 12-month history, weekly recheck
7. 5 ways to use Quality Score - https://support.google.com/google-ads/answer/6167130 - the official same-ad split instruction
16. Ginny Marvin, A guide to keyword prioritization (SEJ, 24 July 2024) - https://www.searchenginejournal.com/guide-keyword-prioritization-query-matching-controls-google-ads/522257/
18. About ad group and asset group prioritization - https://support.google.com/google-ads/answer/2756257
19. Target ads to geographic locations - https://support.google.com/google-ads/answer/1722043 - campaign level; AI Max locations of interest
20. About advanced location options - https://support.google.com/google-ads/answer/1722038 - Presence or interest is default
21. About location insertion for RSAs - https://support.google.com/google-ads/answer/9773001
22. About keyword status - https://support.google.com/google-ads/answer/2453978 - Paused (low activity) at 13 months
23. Add negative keywords to campaigns - https://support.google.com/google-ads/answer/7102995 - levels and limits
24. About ad groups - https://support.google.com/google-ads/answer/6298 - theme by product or service, no count
25. About Smart Bidding - https://support.google.com/google-ads/answer/7065882 - 30 and 50 conversion baselines, portfolios
35. Think with Google, Catawiki and the Hagakure method (Feb 2023) - https://business.google.com/en-all/think/search-and-video/catawiki-hagakure-google-ads/
37. Google blog, DSA upgrading to AI Max (15 Apr 2026, updated 11 Jun 2026) - https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/
41. About Quality Score - https://support.google.com/google-ads/answer/7050591 - not an auction input
69. Search campaign Quality Score page (duplicate content of 41) - https://support.google.com/google-ads/answer/6167118

Industry press
8. Matt Bowen, Why SKAGs still matter in 2024 (SEL, 19 Jul 2024) - https://searchengineland.com/why-single-keyword-ad-groups-still-matter-in-2024-444260
10. Benjamin Wenner, The Hagakure method (SEL, 29 May 2025) - https://searchengineland.com/hagakure-method-google-ads-management-432867
11. Heather Brousell, How campaign structure shapes performance (SEL, 1 Jul 2026) - https://searchengineland.com/how-campaign-structure-shapes-google-ads-performance-481332
12. Google clarifies its stance on consolidation (SEJ, 12 Feb 2026) - https://www.searchenginejournal.com/google-clarifies-its-stance-on-campaign-consolidation/567295/
17. Phrase and broad match identical to a query now preferred (SEL, 23 Sep 2021) - https://searchengineland.com/google-ads-phrase-and-broad-match-keywords-that-are-identical-to-a-query-are-now-preferred-374673
70. Patrick Ortenzio, Google Ads foundation for B2B lead gen (SEL, 19 Aug 2026) - https://searchengineland.com/google-ads-stronger-foundation-b2b-lead-gen-485288
71. Andrea Cruz author page (SEL) - https://searchengineland.com/author/andrea-cruz - "keywords matter less" (27 Apr 2026)

Practitioners and tools
9. Store Growers, SKAGs still relevant in 2026 - https://www.storegrowers.com/single-keyword-ad-groups/
13. Brad Geddes, Managing accounts in the AI era (Adalysis, 22 Oct 2025) - https://adalysis.com/blog/managing-google-ads-accounts-ai/
14. Optmyzr, Low search volume keywords (2013, updated 2021) - https://www.optmyzr.com/blog/low-search-volume-keywords/
15. Andrew Lolk, Stop over-segmenting (SavvyRevenue, 6 Jan 2026) - https://savvyrevenue.com/blog/search-campaign-structure-2/
26. Optmyzr, Does Quality Score still matter (2 Mar 2026) - https://www.optmyzr.com/blog/google-ads-quality-score/
27. Optmyzr, Negative keywords (27 Feb 2026) - https://www.optmyzr.com/blog/negative-keywords/
28. Optmyzr, Location targeting (27 Jun 2023) - https://www.optmyzr.com/blog/location-targeting/
29. Miles McNair, Why consolidation is the key (PPC Mastery, 16 Jul 2025) - https://www.ppcmastery.com/blog/tpe-94-why-consolidation-is-the-key-to-success-with-google-ads
30. HopSkip, Consolidation outperforms expansion (17 Jun 2026) - https://hopskipmedia.com/why-google-ads-consolidation-outperforms-campaign-expansion/
31. Groas, Account structure in 2026 (14 Feb 2026) - https://www.groas.com/post/google-ads-account-structure-in-2026-the-framework-that-actually-works
32. Omologist, Account structure best practices (updated 6 Aug 2026) - https://omologist.com/google-ads/account-structure/
33. Emma Franks, SKAGs no longer best practice (Unbounce, 7 Mar 2019) - https://unbounce.com/ppc/skags-ppc-best-practice/
34. Jyll Saskin Gales, SKAGs still effective? (Inside Google Ads ep. 33) - https://jyll.ca/insidegoogleads/33
36. Adchieve, Hagakure structure results (11 May 2021) - https://www.adchieve.com/en/blog/hagakure-structure-results/
38. PPC Live, AI Max what the data shows (14 Apr 2026, updated 22 Jun 2026) - https://ppc.live/library/strategy/googles-ai-max-for-search-what-the-data-actually-shows-in-2026/
39. Connective, AI Max what changed (updated 22 Jun 2026) - https://connectivewebdesign.com/blog/google-ads-ai-max-what-changed
40. Gruenberg Digital, AI Max automatic upgrade (5 Aug 2026) - https://www.gruenberg-digital.de/en/ki-blog/google-ads-ai-max-automatic-upgrade-september-2026.html
42. Cypress North, Match types best practices (29 Aug 2020) - https://cypressnorth.com/resources/guides/google-ads-search-keywords-match-types-best-practices/
43. Key Principles, Close variants explained (6 Mar 2024) - https://www.keyprinciples.co.uk/googleads-close-variants/
44. Tenscores, How to group keywords by intent (1 Mar 2023) - https://tenscores.com/blog/how-to-group-keywords/
45. Oxedent, SKAG vs SIAG vs STAG (4 Oct 2023) - https://oxedent.co.uk/skag-vs-siag-vs-stag-in-google-ads/
46. Adcumen, Your location targeting is probably wrong (Apr 2026) - https://adcumenco.com/blog/your-google-ads-location-targeting-is-probably-wrong
47. Unbounce, How landing pages impact Quality Score (4 Aug 2020) - https://unbounce.com/ppc/how-landing-pages-impact-quality-score/
48. Unbounce, Message match - https://unbounce.com/landing-pages/message-match/
49. Tillison, DKI cautionary tale (Jan 2019) - https://tillison.co.uk/blog/dynamic-keyword-insertion-cautionary-tale/
50. DataFeedWatch, DSA best practices - https://www.datafeedwatch.com/blog/dynamic-search-ads-best-practices
51. bspkn, Local PPC strategy for service businesses (7 Jun 2026) - https://www.bspkn.co/insights/local-ppc-strategy-guide-service-businesses-2026/
52. ClicksGeek, PPC campaign structure (16 Apr 2026) - https://clicksgeek.com/ppc-campaign-structure-best-practices/ - note: still recommends SKAGs and city campaigns; cited only for the naming pattern
53. LeadsBridge, Campaign structure guide (18 Jun 2026) - https://leadsbridge.com/blog/google-ads-campaign-structure/
54. TripleDart, Search structure 2026 (13 Apr 2026) - https://www.tripledart.com/saas-ppc/google-ads-structure
55. Groas, Local service businesses 2026 (25 Apr 2026) - https://www.groas.com/post/google-ads-local-service-businesses-2026-complete-management-guide
56. Groas, Multi-location businesses 2026 (6 May 2026) - https://www.groas.com/post/google-ads-for-multi-location-businesses-2026-campaign-structure-bidding-scale
57. Adalysis, Quality Score guide (2026) - https://adalysis.com/google-ads-quality-score/
58. mcp-serp-clustering (GitHub) - https://github.com/dredozubov/mcp-serp-clustering - 3+ of top 10, greedy clustering
59. keywordly, SERP clustering tool (23 Jan 2026) - https://keywordly.ai/blog/serp-keyword-clustering-tool
60. WriteIntent, Keyword clustering - https://writeintent.com/service/keyword-clustering
61. claude-seo, SERP-overlap clustering skill - https://claude-seo.md/skills/seo-cluster - overlap bands
62. Optmyzr, Smart Bidding strategies (1 Sep 2025) - https://www.optmyzr.com/blog/smart-bidding-strategies/
63. Search Foundry, Scaling local pages without penalties (22 May 2026) - https://searchfoundry.co.uk/blog/programmatic-seo-on-a-budget-scaling-local-landing-pages-without-spam-penalties/
64. Button Block, Franchise and multi-location structure (13 Jul 2026) - https://buttonblock.com/blog/franchise-multi-location-google-ads-structure-2026
65. White Shark Media, Location targeting for service areas (3 Aug 2026) - https://whitesharkmedia.com/blog/google-ads/google-ads-location-targeting-service-area/
66. Store Growers, Match types (updated 9 Mar 2026) - https://www.storegrowers.com/keyword-match-types/
67. HopSkip, Beat low search volume (22 Oct 2024) - https://hopskipmedia.com/low-search-volume/
68. KlientBoost, Single keyword ad groups - https://www.klientboost.com/ppc/single-keyword-ad-groups/
72. sitecentre, STAG vs SKAG (13 Jan 2026) - https://www.sitecentre.com.au/blog/stag-vs-skag-campaigns
73. Groas, Negative keywords 2026 list (10 Feb 2026) - https://www.groas.com/post/negative-keywords-for-google-ads-the-complete-2026-list-500-keywords-by-industry

Search-result pages read for orientation only (no claims cited from them): SEL close variants 2018 announcement; WordStream keyword prioritization (403); Practical Ecommerce SKAG pieces; HubSpot keyword clustering; SEOcrawl; rankdots.

Not reachable, nothing cited: WordStream account structure and STAG 2019 (403), PPC Hero (403), Zato Marketing SKAG posts (404), Optmyzr naming conventions (404), Supermetrics naming (404), QueryClick Hagakure (page replaced), Reddit r/PPC (blocked), Amalia Fowler author page (profile only, no articles listed).
