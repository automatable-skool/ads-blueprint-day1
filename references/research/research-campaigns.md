# Research dossier - building Google Ads Search campaigns for local lead gen, 2025-2026
Built 28 August 2026 · 62 sources read · 31 rules for /campaign-plan to enforce
Next: merge into references/campaigns.md (draft at ref-campaigns.md), then re-check code/build_campaigns.py against the API rules in section D.

**Grading used everywhere in this file**
- (a) Google official help or API documentation, or Google staff on record
- (b) two or more independent practitioners, or one large dataset (10,000+ campaigns)
- (c) one practitioner, one case, or a claim whose number nobody has sourced

---

## Sources (numbered, cited by number below)

**Google official - help centre**
1. About the Google Search Network - support.google.com/google-ads/answer/1722047 · search partners "included by default", "clicks from these sites may not always reflect highly targeted traffic"
2. About the broad match keywords campaign setting - support.google.com/google-ads/answer/13389795 · converts every phrase and exact keyword to broad on save, only shown with conversion-based Smart Bidding, auto-upgrades to AI Max from September 2026
3. Grow your Smart Bidding campaigns with broad match - support.google.com/google-ads/answer/10195720
4. About Smart Bidding - support.google.com/google-ads/answer/7065882
5. About overdelivery and your average daily budget - support.google.com/google-ads/answer/1704443 · up to 2x daily, never more than 30.4x in a month
6. About spending limits - support.google.com/google-ads/answer/10486637 · ad-schedule campaigns still pace to 30.4x, mid-month budget changes pace on remaining days
7. About Target CPA bidding - support.google.com/google-ads/answer/6268632 · evaluate on 30 days with at least 30 conversions, recommended target = last-30-day CPA adjusted for lag
8. Determine a bid strategy based on your goals - support.google.com/google-ads/answer/2472725
9. How AI Max for Search campaigns works - support.google.com/google-ads/answer/15910187 · enabling turns on search term matching and text customisation, each can be toggled off
10. About final URL expansion in Search - support.google.com/google-ads/answer/16230205 · on by default when AI Max is opted in, needs text customisation, URL exclusions available
11. About text customization in Search campaigns - support.google.com/google-ads/answer/11259373 · legacy automatically created assets became "text customization" from 27 May 2025, once disabled it cannot be re-enabled
12. Exclude ads from geographic locations - support.google.com/google-ads/answer/1722040
13. About your Google Ads account limits - support.google.com/google-ads/answer/6372658 · 10,500 location targets per campaign, 10,000 negatives per campaign, 5,000 per shared negative list
14. About shared budgets - support.google.com/google-ads/answer/10487241 · Google's data: shared budget + portfolio bidding = about 13% more Search conversions
15. Manage a shared budget across campaigns - support.google.com/google-ads/answer/2517512
16. Using conversion goals to guide new campaigns - support.google.com/google-ads/answer/10995481 · account-default recommended, campaign-specific loses cross-campaign learning
17. About campaign-specific conversion goals - support.google.com/google-ads/answer/9143218
18. About account-default conversion goals - support.google.com/google-ads/answer/4677036
19. Keyword close variants - support.google.com/google-ads/answer/9342105 · all match types, no opt-out, exact includes synonyms and same-intent rewrites
20. About bid adjustments - support.google.com/google-ads/answer/2732132 · under Smart Bidding only device -100% is honoured, location and schedule adjustments are not
21. Use ad rotation - support.google.com/google-ads/answer/112876 · Optimise is default and forced under Smart Bidding
22. About language targeting - support.google.com/google-ads/answer/1722078
23. Local Services Ads transition to Performance Max with pay-per-lead goals - support.google.com/google-ads/answer/17213585 · US home services from August 2026, wider late 2026, non-US 2027
24. Google Display Network integration with Demand Gen - support.google.com/google-ads/answer/15890515

**Google official - API and product announcements**
25. Mutate best practices - developers.google.com/google-ads/api/docs/mutating/best-practices · temp IDs negative and unique per request, group by resource type, MUTABLE_RESOURCE response
26. Create Search campaigns - developers.google.com/google-ads/api/docs/campaigns/create-campaigns · the sample sets target_content_network TRUE, contains_eu_political_advertising required
27. Location targeting - developers.google.com/google-ads/api/docs/targeting/location-targeting · positive_geo_target_type default PRESENCE_OR_INTEREST, GeoTargetConstantService.SuggestGeoTargetConstants
28. Support for EU political ads regulation - developers.google.com/google-ads/api/docs/api-policy/eu-par · FieldError.REQUIRED on create without it, account-wide enforcement from 1 April 2026
29. Sharing campaign budgets - developers.google.com/google-ads/api/docs/campaigns/budgets/share-budgets
30. Google Ads Developer Blog via blog.google, DSA upgrade to AI Max - blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026 · DSA moved to February 2027, ACA and campaign-level broad match still September 2026, "7% more conversions" claim
31. AI Max for Search campaigns announcement - business.google.com/us/accelerate/announcements/ai-max-for-search-campaigns
32. Ads Decoded S1E2, is your Search campaign structure holding back performance - business.google.com/en-all/accelerate/podcasts/ads-decoded-s1e2
33. The Hagakure method, Think with Google - business.google.com/en-all/think/search-and-video/catawiki-hagakure-google-ads
34. Google Ads highlights of 2025 - support.google.com/google-ads/answer/16756291
35. Google Ads API v21 release, ad rotation thread - groups.google.com/g/adwords-api/c/bGu4mYWyWzw · campaign-level ad rotation not supported since v201806

**Trade press**
36. ppc.land, broad match campaigns face AI Max auto-upgrade on September 1 - ppc.land/google-ads-broad-match-campaigns-face-ai-max-auto-upgrade-on-september-1 · notification email 5 August 2026, upgrade window 1 to 30 September 2026, no third option
37. ppc.land, Google Ads API enforces EU political advertising declarations · announced 7 August 2025, enforced 3 September 2025
38. ppc.land, Google Ads drops language targeting in September, nine months past deadline
39. ppc.land, Google's Smart Bidding secrets, what advertisers get wrong in 2026 · 11 March 2026, "trains and learns across all conversions in an entire account"
40. Search Engine Journal, Google clarifies its stance on campaign consolidation - 12 February 2026 · Brandon Ervin, 15 conversions in 30 days benchmark
41. Search Engine Journal, Google Ads is retiring language targeting in Search campaigns - 13 August 2026 · removal late September 2026, API developers "stop sending language criteria"
42. Search Engine Land, Google Ads now limits country-level location exclusions - 7 March 2024 · about 120 cap, Ginny Marvin "use positive geographic targeting instead"
43. Search Engine Land, Google Ads to end manual language targeting in Search campaigns (2025 announcement that slipped)
44. Search Engine Land, How campaign structure shapes Google Ads performance · "30 to 50 conversions per campaign per month", 3 to 5 ad groups per campaign
45. Search Engine Land, The Hagakure method for Google Ads management · 450 campaigns to 3, max 20 keywords per ad group
46. Search Engine Land, How to use broad match without losing control
47. Search Engine Land, Why campaign-specific goals matter in Google Ads
48. Search Engine Land, Google Local Services Ads vs Search Ads, which drives better local leads - 3 November 2025
49. Search Engine Land, Ginny Marvin on Smart Bidding, AI and why PPC fundamentals still matter - 17 August 2026
50. Search Engine Land, Data: PMax performance stable but Search CPCs increasing (Optmyzr data)
51. Search Engine Land, Google to enforce EU political ads rules in Ads API and Scripts

**Practitioners and studies**
52. Adalysis, The complete match types data study · 16,825 non-brand Search campaigns, 3 months: exact wins CPA under tCPA, broad beat phrase for low-data accounts on Max Conversions
53. Adalysis, How to evaluate search partners · partners usually under 5% of clicks, lower conversion rate, block when budget-limited
54. Optmyzr, Google listened: 5 PMax fixes (24,702 campaigns) · PMax underperformed when run alongside Search, keep PMax to 10 to 25% of budget
55. Optmyzr PPC Town Hall, GML 2025 with Ginny Marvin (page blocked, cited from search summary)
56. Kirk Williams / ZATO, Google Ads match type strategy for SMBs, when broad match is too broad - 16 June 2026 · start exact, expand carefully
57. Kirk Williams / ZATO, Keyword match type segmentation is dead
58. Amalia Fowler, LinkedIn "check your settings" and PPC Zone talk · presence-or-interest, combined search and display, no negatives are the top audit findings
59. Pete Bowen, Should you run Google Ads 24/7 or only during working hours · judge on cost per converted lead, worked example $500 vs $625
60. FouAnalytics, Your campaign objective matters · Max Conversions served zero impressions for 7 days on a new campaign, Max Clicks spent $100 a day immediately
61. 30chars, All the things that can start the learning phase · about 7 days, 20% rule per week
62. Groas, bidding strategies 2026 · Max Conversions first, tCPA at 15 to 30 conversions, lower tCPA 10 to 15% every two weeks, tROAS only with real values
63. Keywordme, how many conversions do Google Ads need · 30 in 30 for tCPA, 15 to 20 minimum for Max Conversions
64. Get-Ryze, location targeting not working fix · claims 20 to 35% waste and 23 to 38% lower CPA on presence-only, own client data, no external source
65. Dotidot, keyword cannibalisation detect and fix - 29 June 2026 · Ad Rank picks the winner, negatives are the durable fix
66. Dotidot, learning period tips · budget changes over 20% reset learning
67. WhiteSharkMedia, location targeting for service-area businesses · zip for dense metros, county for legal and medical, radius when drive time matters
68. WordStream, AI Max vs broad match
69. Digital Position, Google Ads is automatically switching you to broad match · new Search campaigns pre-tick broad match from July 2024
70. Jonny Swift PPC, how to turn off search partners (2025 UI walkthrough)
71. IceBoxDesigns, 5 default settings wasting your budget
72. StubGroup, Google Ads for small business 2026
73. PPC Hero, The complete guide to PPC naming conventions
74. Bigeye, bid adjustments in 2026, what still works
75. Nils Rooijmans, what happens to your spending limit when you add an ad schedule
76. SearchEnginesMarketer, pros and cons of shared budgets · one campaign can eat $48 of a $50 shared budget

---

## A. The switches Google pre-ticks wrong, and the opposite setting

**Search partners** - (a) included by default [1]. (a) Google's own doc says partner clicks "may not always reflect highly targeted traffic" [1]. (b) partners usually deliver under 5% of clicks at a lower conversion rate, and Adalysis says block them when the campaign is budget-limited, which every local account is [53]. (c) the "5 to 15% of impressions for 2 to 5% of conversions" numbers repeated on agency blogs are unsourced. Set: OFF (target_partner_search_network = false).

**Display expansion on Search** - (a) the official API create-campaign sample sets target_content_network = true [26]. (b) Amalia Fowler lists "combined search and display" among her top audit findings [58]. Set: OFF (target_content_network = false).

**Presence or interest** - (a) API default positive_geo_target_type is PRESENCE_OR_INTEREST [27]. (a) Google recommends positive targeting over exclusion lists [42]. (c) the "20 to 35% of budget" waste figure comes from one vendor's client data with no external source [64]; the direction is (b), the number is (c). Set: PRESENCE.

**Broad match keywords toggle** - (a) converts every phrase and exact keyword to broad on save and only appears with conversion-based Smart Bidding [2]. (b) the new-campaign UI pre-ticks it since July 2024 [69]; the API field defaults false. (a) any campaign with it on is auto-upgraded to AI Max between 1 and 30 September 2026 [30][36]. Set: OFF, explicitly, not by omission.

**Automatically created assets** - (a) renamed "text customization" inside AI Max from 27 May 2025, and once disabled it cannot be turned back on [11]. (a) campaigns still using ACA are auto-upgraded to AI Max in September 2026 with search term matching AND text customisation on [36]. Set: OFF.

**AI Max for Search** - (a) opt-in; enabling switches on search term matching and text customisation, each toggle-able [9]. (a) final URL expansion is on by default once AI Max is on and needs text customisation [10]. (a) Google claims 7% more conversions with the full suite versus search term matching alone, internal 2026 data excluding retail [30]. Set: OFF at launch; revisit only with a mature negative list and 30+ conversions a month (Jono's existing rule, (c)).

**Final URL expansion** - (a) cannot exist without text customisation, so turning text customisation off kills it [10]. Set: OFF (falls out of AI Max OFF).

**Dynamic Search Ads** - (a) auto-migration to AI Max moved to February 2027 [30]. Set: none created.

**Auto-applied recommendations** - (b) universal practitioner advice to turn off [58][71][72]. Set: OFF at account level.

**Language** - (a) campaign-level language targeting is removed from Search in late September 2026; Google told API developers to "stop sending language criteria when creating or updating Search campaigns" [41]. (a) the 2025 version of this announcement slipped nine months [38]. Set: do not send a language criterion; write ads and pages in the market's language.

**Ad rotation** - (a) Optimise is the default and Smart Bidding forces it [21]. (a) campaign-level rotation is unsupported in the API [35]. Set: leave untouched.

**Devices** - (a) under Smart Bidding only -100% is honoured; tCPA treats device adjustments as target adjustments [20]. Set: no adjustments.

**Conversion goals** - (a) account-default recommended, campaign-specific loses cross-campaign learning [16]. (a) from 17 November 2025 a new conversion action only becomes account-default automatically if every other goal in its category already is; otherwise it must be marked biddable by hand [seoteric summary of Google's notice, via search]. Set: verify the lead action is primary and biddable BEFORE the build; use account-default unless the account also carries a purchase goal, then campaign-specific "Leads".

**EU political ads field** - (a) contains_eu_political_advertising required on every API create since 3 September 2025, account-wide mutate failures from 1 April 2026 without it [28][37]. Set: DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING.

## B. How many campaigns

- (a) Google, February 2026: consolidation is not the goal, but campaigns with the same goal should share data; benchmark 15 conversions in 30 days per campaign, achievable via shared budgets or portfolio bidding [40].
- (a) Google, March 2026: Smart Bidding "trains and learns across all conversions in an entire account", a new campaign inherits account signals from its first impression [39]. So "Smart Bidding learns per campaign" is overstated; per-campaign density still matters for the target, not for the model.
- (b) practitioner threshold for a campaign to stand on its own: 30 to 50 conversions a month [44]; 3 to 5 themed ad groups per campaign [44]; max 20 keywords per ad group [45].
- (b) Hagakure case: 450 campaigns to 3 [45]; other consolidations cited in stag.md (44 to 7, 19 to 4).
- (c) Jono's rule in stag.md: one campaign until a service clears about 30 conversions a month, brand always separate, emergency usually first to split. Consistent with (a) and (b) above.
- Implication for the "three campaigns" default: if the monthly budget split three ways cannot fund 3 to 5x CPL per campaign per day, build ONE campaign with three STAG ad groups (stag.md Shape A). Three underfunded campaigns each sit in learning forever.

## C. Budgets

- (a) daily spend can reach 2x the average daily budget; monthly billed spend never exceeds 30.4x [5][6].
- (a) ad-scheduled campaigns still pace to the full 30.4x across active days; mid-month budget changes pace on remaining calendar days [6].
- (a) Google: be "comfortable spending up to 2 times your average daily budget" when running tCPA [7].
- (b) daily budget at least 3 to 5x the expected cost per lead so Smart Bidding is not starved mid-day [62][63][storegrowers, 30chars via search]; one source says 10x [ppcpanos via search]. Verified as consensus, not as Google guidance.
- (b) clicks math: daily budget divided by average CPC should give at least 10 clicks a day [get-ryze budget guide, gbim via search].
- (a) shared budgets reallocate automatically, and Google's data says shared budget + portfolio strategy yields about 13% more Search conversions [14]. (b) pitfall: one campaign can swallow the whole shared budget, hiding a weak campaign [76]. Rule: shared budget only with a portfolio bid strategy, never as a way to avoid deciding a split.
- Monthly to daily: divide by 30.4, never by 30 [5].

## D. Bidding at launch and graduation

- (a) Google: "you no longer need to wait until you have a bank of conversion data to start using Smart Bidding" [39]; Google's help defaults new campaigns to Maximize Conversions.
- (a) Enhanced CPC gone since the week of 31 March 2025; un-migrated campaigns fell to Manual CPC [via search, Google announcement].
- (b) counter-evidence: a new campaign on Max Conversions served zero impressions for 7 days, Max Clicks spent $100 a day immediately [60]; several practitioners start with Max Clicks or Manual CPC until conversions exist [jyll, lineardesign, definedigital via search].
- (a) tCPA: evaluate on 30 days with at least 30 conversions; Google's recommended target is the last-30-day CPA adjusted for lag [7]. (b) set it 10 to 20% above actual CPA first, then lower 10 to 15% every two weeks [62][63].
- (b) tROAS for leads only when conversion values genuinely differ (offline import, lead to SQL to closed-won); flat values = use tCPA [62][leadup, northcountry via search].
- (b) learning period about 7 days, 1 to 2 weeks in practice; resets on strategy switch, target change, budget moves over 20% in a week, conversion action changes, pause and re-enable [61][66].
- (a) Google forces Optimise rotation and ignores schedule and location bid adjustments under Smart Bidding [20][21]. So the old SOP's "24/7 with -40% overnight" does nothing on Max Conversions or tCPA. On Maximize Clicks and Manual CPC the adjustment applies.

## E. Location targeting

- (a) Presence only; positive targeting instead of exclusion lists [27][42].
- (a) country-level exclusions capped at about 120 since March 2024; Google: "no need to exclude areas that you haven't already targeted" [42].
- (a) 10,500 location targets per campaign, up to 500 proximity targets [13].
- (b) radius versus city: pick the unit that matches how the business dispatches; zip codes for dense metros, county for legal and medical, radius when drive time is the limit; validate with booked-job data [67]. (c) "5 to 15 miles for service-area businesses" is agency rule of thumb.
- (a) location bid adjustments are ignored by Smart Bidding [20], so stag.md's "location bid adjustments from -90% to +900%" only works on Manual CPC or Max Clicks; under Smart Bidding, split a city into its own campaign if it needs a different target.
- Myth (old SOP, June 2026): "exclude every country except yours or Presence-only still leaks". (a) Contradicted by Google [42] and by the 120 cap; a Presence-only positive target does not serve elsewhere.

## F. Ad schedule

- (c) Jono's rule: 24/7 only if someone answers the phone. (b) supporting: after-hours leads that die in voicemail teach Smart Bidding to find more of them [59 and call-ads guides via search]; judge on cost per converted lead, worked example $500 in hours versus $625 after hours [59].
- (a) under Smart Bidding, ad schedule is honoured as a hard on/off but schedule bid adjustments are not [20]. So a hard schedule is the only lever that works on Max Conversions.
- (c) stag.md "do not hard-exclude overnight on emergency campaigns, use a negative bid adjustment" - only true on Max Clicks or Manual CPC. Under Smart Bidding the choice is binary: run overnight or not.

## G. Keywords and match types 2025-2026

- (a) close variants apply to every match type with no opt-out; exact includes synonyms and same-intent rewrites [19]. "Exact match" is not exact.
- (b) Adalysis, 16,825 campaigns: under tCPA exact had the lowest CPA and highest conversion rate; under Max Conversions on low-data accounts broad beat phrase on CPA; recommendation for small accounts "start with exact match" then add winners as broad [52].
- (b) Kirk Williams, June 2026: SMBs start exact, expand carefully, watch search terms daily [56].
- (c) Jono's ruling: phrase match default, 5 to 15 per STAG, no "near me" keywords, no match-type duplicates. Stands, but the Adalysis result says phrase is the weakest of the three under Max Conversions on thin data. Worth a documented exception: top money terms can be added as exact alongside phrase.
- (b) cannibalisation: Google picks by Ad Rank when several ad groups match [65][stag.md]; the durable fix is negatives, not pausing [65]; cross-campaign shared negative lists assigned at creation [pixis, segwise via search].
- (a) 10,000 negatives per campaign, 5,000 per shared list, 20 lists per manager [13].

## H. Performance Max, LSA, and the 2026 calendar

- (b) Optmyzr, 24,702 PMax campaigns: PMax underperformed when run alongside Search; keep it to 10 to 25% of budget if at all [54]. Optmyzr February 2025 on 503 accounts: 91% had Search and PMax keyword overlap, Search out-performed PMax about twice as often on CTR and conversion rate [50 and search summary].
- (c) stag.md "Search beats PMax by 25 to 45% on cost per qualified lead" is unsourced; direction agrees with [54].
- (a) LSA is becoming a Performance Max pay-per-lead campaign inside Google Ads for US home services from August 2026, manual and vertical tCPA bidding removed, weekly budgets divided by 7 [23]. LSA and Search are still complementary [48].
- Calendar (a): 3 September 2025 EU field required on create [28][37] · 17 November 2025 conversion goals no longer auto-default [seoteric] · 1 April 2026 account-wide EU enforcement [28] · 15 April 2026 AI Max leaves beta [36] · 11 June 2026 DSA migration pushed to February 2027 [30] · 5 August 2026 upgrade emails [36] · 1 to 30 September 2026 ACA and campaign-level broad match campaigns auto-upgraded to AI Max [30][36] · late September 2026 language targeting removed from Search [41] · February 2027 DSA sunset begins [30].

## I. API build order and specifics

- (a) one GoogleAdsService.Mutate per campaign tree with negative temp IDs, unique per request, defined before referenced; group operations by resource type; request MUTABLE_RESOURCE to get real IDs back [25].
- (a) order: campaign budget (-1) → campaign (-2, budget -1, SEARCH, PAUSED, network settings, geo_target_type_setting PRESENCE, bidding oneof, contains_eu_political_advertising) → campaign criteria (location geo_target_constant per city or proximity, ad schedule, campaign negatives) → ad groups (-3 onward, PAUSED) → ad group criteria (keywords PHRASE, ad group negatives) → ad group ads (RSA, PAUSED) [25][26][27].
- (a) GeoTargetConstantService.SuggestGeoTargetConstants for IDs; ProximityInfo for radius [27].
- (a) do not send a language criterion after September 2026 [41].
- (a) do not set campaign-level ad rotation [35].
- (b) partial_failure and temp IDs do not mix; keep each campaign atomic (existing rule, matches [25]'s ordering guarantees).
- (c) Python proto-plus quirks from the old SOP: declare the Maximize Conversions oneof via `target_cpa_micros = 0` or `_pb...SetInParent()`; `.append` not `.add`; path1 and path2 are 15 characters max; campaign names must be unique.

## J. Myths, dated

- "Exclude every country except yours" - dead since March 2024 (about 120 cap) and unnecessary with Presence-only positive targeting [42].
- "Smart Bidding learns inside the campaign, so 30 conversions per campaign is mandatory" - Google says it learns account-wide (March 2026) and gave a 15-in-30 benchmark (February 2026); 30 remains the practitioner comfort line for tCPA [39][40].
- "-40% overnight bid adjustment on emergency campaigns" - ignored under Smart Bidding [20]; only a hard schedule works there.
- "Exact match is exact" - false since 2018 close variants, now includes synonyms and same-intent rewrites [19].
- "Set language to English constant 1000" - retired late September 2026, API told to stop sending it [41].
- "The broad match toggle defaults off" - true in the API, false in the new-campaign UI since July 2024 [2][69].
- "Ad Strength affects the auction" - Google says it does not (existing file, unchanged).
- "Maximize Conversions always serves from day one" - Google says start there [39]; one documented case of zero impressions for 7 days on a new account [60]. Both can be true; the difference is whether the account already has conversion history.
- "Enhanced CPC is a launch option" - gone since March 2025.
- "Three RSAs per ad group" - existing rule of two stands; not re-researched here.

## K. Rules a campaign-build command should enforce (31, graded)

1. (a) Search only: target_google_search true, target_search_network false, target_content_network false, target_partner_search_network false.
2. (a) positive_geo_target_type = PRESENCE on every campaign.
3. (a) Broad match campaign setting explicitly false; keywords stay PHRASE (or EXACT for money terms).
4. (a) AI Max off, text customisation off, final URL expansion off, no DSA ad groups, no automatically created assets.
5. (a) contains_eu_political_advertising = DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING on every create.
6. (a) No language criterion sent (retired late September 2026).
7. (a) No campaign-level ad rotation field; leave Optimise.
8. (a) No device, location or schedule bid adjustments at launch; under Smart Bidding only -100% device would work anyway.
9. (a) Status PAUSED on campaign, every ad group and every ad in the same request.
10. (a) Daily budget = monthly ÷ 30.4; tell the owner spend can hit 2x daily on any day and never exceeds 30.4x in the month.
11. (b) Daily budget per campaign ≥ 3x (prefer 5x) expected cost per lead, AND ≥ 10 expected clicks a day at the market CPC; if the three-way split fails either test, build one campaign with three STAG ad groups instead.
12. (a) No shared budget unless a portfolio bid strategy is attached.
13. (b) Launch bidding: Maximize Conversions with no target if the account already has 15+ conversions in the last 30 days on the lead action; otherwise Maximize Clicks with a max CPC cap for the first 2 to 4 weeks, then Maximize Conversions.
14. (a) Add a Target CPA only after 30 conversions in 30 days on that campaign; first target = last-30-day CPA plus 10 to 20%; lower 10 to 15% every two weeks.
15. (b) Never tROAS for leads with flat values; only after offline conversion import assigns real, differing values.
16. (b) No changes to strategy, target or budget for 7 to 14 days after any change; budget moves capped at 20% a week.
17. (a) Lead conversion action verified as primary and biddable before the build (post-17 November 2025 behaviour); account-default goals unless the account also has a purchase goal, then campaign-specific "Leads".
18. (a) Locations as geo_target_constants or a proximity target, positive only; never a country exclusion list.
19. (b) Location unit matches dispatch reality (zip or radius for dense metros, county for legal and medical); tighten with booked-job data, never widen before it.
20. (c) Ad schedule from the phone-answering answer: 24/7 only if answered; otherwise a hard schedule, because schedule bid adjustments are ignored under Smart Bidding.
21. (c) One campaign per service, STAG ad groups, never city ad groups; city via location insertion in one or two headlines with fallback text, and a URL parameter on the page (stag.md section 6).
22. (b) A service earns its own campaign at about 30 conversions a month, or when it needs its own budget, schedule or geography; Google's floor is 15 in 30 days.
23. (c) Brand always in its own campaign, never mixed with generic.
24. (b) One search routes to one ad group: every STAG carries the other STAGs' trigger words as negatives; every campaign carries the other services' trigger words as negatives; shared negative list attached at creation.
25. (b) Negatives are the fix for cannibalisation; never pause a keyword to resolve overlap.
26. (a) Keyword count per ad group capped at 20 (Hagakure) and 5 to 15 by house rule; no match-type duplicates, no "near me" variants.
27. (b) Search terms reviewed daily for the first week, weekly after; junk added as negatives, not as new keywords.
28. (b) Performance Max not part of the launch build; if ever added, capped at 10 to 25% of budget with brand and Search terms excluded.
29. (a) One atomic Mutate per campaign tree, temp IDs negative and unique, operations grouped by resource, MUTABLE_RESOURCE requested, no partial_failure.
30. (c) Campaign name `Search | Service | Geo`, unique in the account; ad group name = the STAG theme; no dates or IDs in names.
31. (a) Before enabling, read back from the API and check: networks, presence, broad toggle, AI Max, EU field, budget, bidding, goals, schedule, negatives, PAUSED everywhere, final URLs load.
