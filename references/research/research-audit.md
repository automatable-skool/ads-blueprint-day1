# Research dossier: auditing a Google Ads Search account for lead-gen and local service, 2025-2026
Built 28 August 2026 · 61 sources read · 33 operational rules extracted
Next: review ref-google-ads-audit.md (the merged draft) against this dossier, then replace references/google-ads-audit.md.

Grades used throughout: **(a)** Google official · **(b)** study with a stated sample · **(c)** practitioner convention · **[V]** published by a vendor selling the thing the claim supports.

---

## Sources (numbered, 61)

Google official first, then API docs, then practitioners and studies. "Read" means fetched in full unless marked "snippet", which means the search excerpt only.

### Google help and announcements

1. **About Quality Score for Search campaigns** · https://support.google.com/google-ads/answer/6167118 · current · "Quality Score is not an input in the ad auction" and "should not be optimized or aggregated". Read in full.
2. **About bid adjustments** · https://support.google.com/google-ads/answer/2732132 · current · compatibility chart: under tCPA and Max Conversions only a -100% device adjustment applies; tROAS treats device as a target adjustment; location, schedule, audience and demographic adjustments are not supported under any automated strategy including Maximize Clicks. Read in full.
3. **Duration of the learning period** · https://support.google.com/google-ads/answer/13020501 · current · up to 3 weeks or 1-2 conversion cycles, four triggers, no conversion count published, Manual CPC has none. Read in full.
4. **How AI Max for Search works** · https://support.google.com/google-ads/answer/15910187 · current · three parts (search term matching, text customization, final URL expansion), all on when AI Max is on, each can be turned off individually; brand and location-of-interest controls; "AI Max" appears as a match type in reporting with a source column. Read in full.
5. **AI Max FAQ** · https://support.google.com/google-ads/answer/15913066 · current · negatives are respected under AI Max; turning AI Max off also disables brand exclusions; a standard ad group with one broad keyword gets keywordless recall. Read in full.
6. **About Final URL expansion in Search** · https://support.google.com/google-ads/answer/16230205 · current · on by default inside AI Max; URL exclusions exist but only work with both text customization and expansion on. Read in full.
7. **Turn text customization on or off** · https://support.google.com/google-ads/answer/16738708 · current · text customization is opt-in via the AI Max panel; disabling it also disables final URL expansion; legacy automatically created assets began upgrading to text customization on 27 May 2025 and once the legacy setting is off it cannot be re-enabled. Read in full.
8. **Manage auto-apply recommendations** · https://support.google.com/google-ads/answer/10276359 · current · two bundles (Maintain your ads, Grow your business); nothing shown as on by default, users opt in; a History tab shows who enrolled and when; change history can be filtered by enrolment date. Read in full.
9. **Search partner network announcements** · https://support.google.com/google-ads/answer/16286960 · updated April 2026 · parked domains cease as a surface 10 February 2026; December 2025 claim of 11% conversion uplift (volume bidding) and 7% (value bidding) for campaigns with 5%+ SPN spend; PMax SPN split in channel reporting January 2026; Invalid Activity Credit report April 2026. Read in full.
10. **About search partners** · https://support.google.com/google-ads/answer/2616017 · current · describes the network, no performance claim on this page, no statement of default. Read in full.
11. **Improving the search terms report while maintaining privacy** · https://support.google.com/google-ads/answer/11127882 · 2021 · thresholds are volume-based across all Google searches; dates 1 Sept 2020 and 1 Feb 2021. Read in full.
12. **About the search terms report** · https://support.google.com/google-ads/answer/2472708 · current · terms appear only when used by "a significant number of people"; the rest is aggregated as other queries. Read in full.
13. **Conversion counting options** · https://support.google.com/google-ads/answer/6270625 · current · "Every" for sales, "One" for leads. Read in full.
14. **About conversion windows** · https://support.google.com/google-ads/answer/3123169 · current · default 30 days click-through, 1 to 90 allowed, changes apply going forward only, view-through default 1 day. Read in full.
15. **About conversion lag reporting** · https://support.google.com/google-ads/answer/9347141 · current · conversions are reported by click date, so recent CPA reads high. Read in full.
16. **Consent mode conversion modeling eligibility** · https://support.google.com/google-ads/answer/10548233 · current · 700 ad clicks over 7 days per country and domain grouping plus a correct consent mode or TCF v2.0 implementation. Read in full.
17. **Ad-level asset report for RSAs** · https://support.google.com/google-ads/answer/9564897 · 2025 · performance label column deprecated; full per-asset stats from 5 June 2025. Snippet.
18. **Local Services Ads transition to PMax pay-per-lead** · https://support.google.com/google-ads/answer/17213585 · 2026 · August 2026 first wave (US home and storefront services), late 2026 wider, 2027 non-US; 14-day notice; manual bidding, vertical tCPA and BBB callouts gone; lead history and badge migrate, performance reports do not; weekly budget divided by 7. Read in full.
19. **Unlock more visibility and control in Performance Max** · https://business.google.com/us/accelerate/announcements/unlock-more-visibility-and-control-in-performance-max/ · 7 August 2025 · search terms reporting for all PMax campaigns and via API; campaign-level negative keyword lists; search themes 25 to 50; device and demographic controls. Read in full.
20. **Your guide to broad match** · https://support.google.com/google-ads/answer/12159290 · current · broad match positioned as a system with Smart Bidding. Snippet.
21. **About the broad match keywords campaign setting** · https://support.google.com/google-ads/answer/13389795 · current · campaign-level broad match only with conversion-based Smart Bidding, changes keyword prioritisation. Snippet.
22. **About Smart Bidding** · https://support.google.com/google-ads/answer/7065882 · current · auction-time signals include device, location, time. Snippet.
23. **Set up and apply negative keyword lists** · https://support.google.com/google-ads/answer/7449003 · current · lists must be applied per campaign. Snippet.
24. **About shared budgets** · https://support.google.com/google-ads/answer/10487241 · current. Snippet.

### Google Ads API

25. **Optimization score and recommendations** · https://developers.google.com/google-ads/api/docs/recommendations · v25 · `recommendation_subscription` resource exposes auto-apply enrolment by type; `change_event.client_type = GOOGLE_ADS_RECOMMENDATIONS_SUBSCRIPTION` isolates auto-applied changes; `customer.optimization_score`, `campaign.optimization_score`, `metrics.optimization_score_uplift`. Read in full.
26. **Change Event** · https://developers.google.com/google-ads/api/docs/change-event · current · date range must be within 30 days, LIMIT required at 10,000 max, fields `user_email`, `client_type`, `change_resource_type`, `changed_fields`, old and new resource. Read in full.
27. **Shared sets** · https://developers.google.com/google-ads/api/docs/targeting/shared-sets · current · negative lists attach via `campaign_shared_set`. Snippet.
28. **Remove a campaign budget** · https://developers.google.com/google-ads/api/docs/campaigns/budgets/remove-budgets · current · `campaign_budget.reference_count` shows attached campaigns. Snippet.
29. **Query cookbook** · https://developers.google.com/google-ads/api/docs/query/cookbook · current. Snippet.
30. **GAQL explained, ppc.io** · https://ppc.io/blog/google-ads-query-language · 2026 · v23 has 181 queryable resources; search_term_view and keyword_view examples. Snippet.

### Studies with a stated sample

31. **Optmyzr, does Optimization Score affect performance** · https://www.optmyzr.com/blog/does-optimization-score-affect-google-ads-performance/ · 23 August 2024 · 17,380 accounts; 90-100 score bracket had the cheapest CPA and beat sub-70 on ROAS by 186%; lower brackets had better conversion rates; authors say correlation reflects active management and "OptiScore is not and should never be a KPI". Read in full. (b)[V]
32. **Optmyzr, is PMax cannibalizing Search** · https://www.optmyzr.com/blog/is-pmax-cannibalizing-search/ · Feb 2025 data, 503 accounts · 91.45% overlap; where conversion rate differed by more than 10%, Search won 18.91% of cases and PMax 6.17%. Read in full. (b)[V]
33. **Optmyzr, State of PPC study** · https://www.optmyzr.com/blog/optmyzr-state-of-ppc-study/ · 13 March 2024 · 4,000+ accounts running both broad and exact: 74.1% had better ROAS on exact, median gap 100.59%; PMax sample 7,100 accounts, 18,000+ campaigns. Read in full. (b)[V]
34. **Optmyzr match type analysis, November 2024** · via https://www.optmyzr.com/blog/choose-best-google-ads-keyword-match-type/ · 992,028 keywords, 15,491 accounts · lead gen: exact ROAS 415% and CTR 21.6%, phrase 314% and 11.4%. Snippet. (b)[V]
35. **Slattery hidden search terms study** · reported at https://www.seroundtable.com/google-ads-hidden-search-terms-privacy-driven-39731.html · 9 July 2025 · $20M spend, 933 campaigns, "$0.85 per $1" framing; Ginny Marvin: threshold increase "solely privacy-driven", Smart Bidding does not depend on reporting thresholds. Read in full. (b) with unpublished method
36. **Marlin SEM, how much search term data is hidden** · https://marlinsem.com/google-ads-missing-search-terms/ · 9 July 2025 · one 7-day campaign: 54% of impressions and 51% of clicks hidden. Read in full. (b) tiny sample
37. **WordStream / LocaliQ 2026 search benchmarks** · https://localiq.com/blog/search-advertising-benchmarks/ (WordStream mirror returned 403) · updated 1 June 2026 · all-industry medians CTR 6.64%, CPC $5.42, CVR 8.18%, CPL $66.69; rows for home services, personal services, auto repair, dentists, attorneys, real estate, physicians. Read in full. (b)[V]
38. **Optmyzr, keywords not converting** · https://www.optmyzr.com/blog/google-ads-keywords-not-converting/ · 6 June 2025 · pause after 2-3x target CPA spent with zero conversions for direct response, 4-5x for long cycles; check match type, terms, copy, offer first. Read in full. (c)[V]

### Practitioner articles, 2025-2026

39. **Jay Stampfl, Search Engine Land, "Google Search Ads in 2026 require a different kind of audit"** · https://searchengineland.com/google-search-ads-require-different-audit-471457 · 13 March 2026 · five checks: signal architecture, incrementality, marginal returns, query resolution by intent tier and match-type drift, network economics. Read in full. (c)
40. **Jyll Saskin Gales, Search Engine Land, "The truth about Google Ads recommendations"** · https://searchengineland.com/google-ads-recommendations-auto-apply-465909 · 10 December 2025 · turn every auto-apply box off; optimisation score measures whether you review recommendations, dismissing counts the same as accepting; split recommendations into "reach and spend" vs "ROI and hygiene". Read in full. (c)
41. **Brad Geddes, Search Engine Land, "Top 10 Google Ads mistakes to avoid in 2026"** · https://searchengineland.com/google-ads-mistakes-avoid-449288 · 9 January 2026 · inconsistent conversion tracking, ignoring exact match ("highest-converting match type for the vast majority of accounts"), inconsistent campaign settings, caring about Ad Strength, not adding top terms as keywords, broad match without target bidding, decade-old negative lists, blind acceptance of recommendations, auto-apply on. Read in full. (c)
42. **Leigh Buttrey, Search Engine Land, "How to use broad match without losing control"** · https://searchengineland.com/broad-match-control-466444 · 19 December 2025 · broad match default since July 2024; Google's 10% uplift claim; four guardrails. Read in full. (c)
43. **Christine Askew, Search Engine Land, "AI Max for Search: everything you need to know"** · https://searchengineland.com/ai-max-for-search-everything-you-need-to-know-462923 · 3 October 2025 · Google's 14% more conversions claim; pinned assets may be overridden; final URL expansion on by default. Read in full. (c) with (a) quotes
44. **PPCChat, GML 2026 Q&A with Ginny Marvin** · https://officialppcchat.com/2026/06/09/all-your-google-marketing-live-2026-questions-answered-with-ginny-marvin/ · 9 June 2026 · no AI Max auto-upgrade date given; no DSA deprecation date given; AI Mode and AI Overview ads reported as top ads with no segmented reporting; "AI Brief" rolling out. Read in full. (a) quotes
45. **Brooke Osmundson, Search Engine Journal, LSA moving into Google Ads** · https://www.searchenginejournal.com/google-is-bringing-local-services-ads-into-google-ads/582816/ · 20 July 2026 · 14-day notice then 7-day reminder; six alternative callouts; download historical reports first. Read in full. (c) reporting (a)
46. **Optmyzr audit guide** · https://www.optmyzr.com/blog/google-ads-audit/ · 25 August 2025 · nine-area checklist, quarterly cadence, duplicate keyword check, automation validation. Read in full. (c)[V]
47. **Adalysis, how to audit a Google Ads account** · https://adalysis.com/blog/how-to-audit-a-google-ads-account-the-ultimate-ppc-audit-checklist/ · 13 October 2021, still linked as the 2025 edition · structure vs performance split, 2-3 ads per group, under 50 keywords per group. Read in full. (c)[V]
48. **Sarah Vlietstra, ZATO, bid adjustments** · https://zatomarketing.com/blog/google-ads-bid-adjustments-when-they-work-when-they-dont-and-when-to-just-let-go · 16 April 2026 · under Smart Bidding only device adjustments are honoured. Read in full. (c)
49. **Jyll Saskin Gales, location bid adjustments with Smart Bidding** · https://learn.jyll.ca/blog/can-you-use-location-bid-adjustments-with-smart-bidding-in-google-ads · 17 July 2025 · only -100% device survives; workaround is separate campaigns or value rules. Read in full. (c)
50. **Peter Šutarík, the GA4 import trap** · https://petersutarik.com/blog/import-ga4-conversions-google-ads/ · 30 July 2026 · GA4 attributes across all channels, Ads attributes to Ads clicks only; GA4 reports by event date not click date; Safari expires JS cookies after 7 days. Read in full. (c)
51. **Miles McNair, PPC Mastery, 2025 guide to conversion tracking** · https://www.ppcmastery.com/blog/tpe-121-tracking · 23 January 2025 · server-side tagging, native pixel over GA4-only, offline conversions with GCLID/GBRAID/WBRAID, enhanced conversions, consent mode v2. Read in full. (c)
52. **Groas, conversion tracking audit guide 2026** · https://www.groas.com/post/google-ads-conversion-tracking-ga4-enhanced-conversions-audit-guide-2026 · 26 April 2026 · 10-point checklist; four consent signals. Read in full. (c)[V]
53. **Pixis, what the Ads Transparency Center cannot tell you** · https://pixis.ai/blog/what-the-google-ad-transparency-center-cannot-tell-you-and-how-to-fill-the-gap/ · 2026 · shows creatives, format, last-shown date, broad regions, 24-48h refresh; no spend, keywords, audiences, performance. Read in full. (c)[V]
54. **ppc.land, parked domains removed** · https://ppc.land/google-quietly-kills-parked-domain-ads-from-search-partner-network/ · 10 February 2026. Read in full. (c) reporting (a)
55. **Digital Applied, 105-item audit checklist** · https://www.digitalapplied.com/blog/google-ads-audit-checklist-100-items · 10 April 2026 · thresholds: 5-15 keywords per group, QS 3 or under review, 30 days before pausing, 30+ conversions per 30 days, sitelinks 4+, target changes 20%, "18-27% typical waste" with no method. Read in full. (c)[V]
56. **Petar Arshinkov, presence vs interest** · https://arshinkov.com/presence-vs-interest-the-google-ads-location-setting-you-should-not-ignore/ · 14 May 2025 · no data, setting path confirmed. Read in full. (c)
57. **WordStream, 2025 query matching updates** · https://www.wordstream.com/blog/google-ads-query-matching-updates · 2025 · negatives block misspellings (announced June 2024). Snippet (403 on fetch). (c) reporting (a)
58. **Karooya, keywords and negatives in 2025** · https://www.karooya.com/blog/keywords-negative-keywords-in-google-ads-2025/ · 2025 · misspelling coverage confirmed. Snippet.
59. **Analyzify, PMax search terms update** · https://analyzify.com/hub/performance-max-search-terms-in-google-ads · 2025 · campaign-level negatives 23 January 2025; limit raised to 10,000 on 11 March 2025 (Ginny Marvin); full search terms March 2025. Snippet.
60. **Google Ads Help, Measure the calls you receive** · https://support.google.com/google-ads/answer/6197479 · current · call duration threshold set per action; practitioners use 45-60 seconds. Snippet. (a) for mechanism, (c) for the 60-second figure
61. **Search Engine Land, search partner parked domain monetization 2026** · https://searchengineland.com/parked-domain-monetization-2026-adapting-to-the-changes-475960 · 2026 · corroborates removal. Snippet.

Not reached this pass (search quota exhausted): Reddit r/PPC threads with real data, the Optmyzr February 2026 30,000-account match-type study cited in the existing file, the Data Manager API offline-upload cutover, the Optmyzr 22,000-account Ad Strength study. Those claims are carried forward from the existing file unchanged and marked "not re-verified 28 Aug 2026".

---

## Findings by area

### 1. Audit frameworks practitioners actually use

- **Conversion tracking first, always.** Every 2025-2026 framework read (Optmyzr, Adalysis, Groas, Digital Applied, Geddes, Stampfl) opens with tracking. Geddes ranks "inconsistent conversion tracking" the number one mistake of 2026 (c). Source 41.
- **The 2026 shift is from settings to signals.** Stampfl (SEL, March 2026) argues automation removed direct control and the audit must rebuild economic visibility: signal architecture, incrementality, marginal returns, query resolution, network economics (c). Source 39.
- **Settings consistency is its own check.** Campaigns built years apart drift on excluded regions, schedules and bid strategies (Geddes, Jan 2026) (c). Source 41.
- **Cadence:** quarterly is the consensus, plus after any site migration, tag change or CMS change (c). Sources 46, 47, 52, 55.
- **Report shape owners respond to:** findings ranked by money attached, top fixes shippable in two weeks, not a 40-page PDF (c). Source 55 and search results on audit formats.

### 2. Conversion tracking integrity

- **Primary vs secondary double count.** A native tag and a GA4 import both primary for the same event counts every lead twice; Smart Bidding then sees inflated volume at fake-low CPA (c, widely repeated, mechanism sound). Sources 50, 52.
- **GA4 imports are not interchangeable with native tags** even as secondary references: GA4 attributes across all channels, Ads attributes to Ads clicks only; GA4 reports on event date, Ads on click date; Safari kills JS cookies at 7 days so an 8-day lead becomes "direct" in GA4 (c). Source 50, 30 July 2026.
- **Counting: One for leads, Every for sales (a).** Source 13.
- **Windows: default 30 days, 1 to 90 allowed, never retroactive (a).** Source 14.
- **Conversion lag: reported by click date, recent CPA reads high (a).** Source 15.
- **Enhanced Conversions:** verify via the Diagnostics tab; the "40%+ match rate is healthy" figure is practitioner (c). Source 52 and search results.
- **Consent mode:** four signals required (ad_storage, analytics_storage, ad_user_data, ad_personalization) (a via 52); modelling needs 700 ad clicks over 7 days per country and domain grouping (a). Source 16.
- **Call tracking:** duration thresholds are set per call action (a); 45-60 seconds is the practitioner screen (c). Source 60.
- **Offline conversions:** GCLID, GBRAID, WBRAID capture at the form and CRM storage are the lead-gen backbone (c). Source 51.

### 3. Wasted spend detection and pricing

- **Hidden search terms.** Google: terms appear only with "sufficient search volume across all Google searches" (a). Slattery: $20M, 933 campaigns, method unpublished (b). Marlin: one campaign, 51% of clicks hidden (b, n=1). Ginny Marvin: Smart Bidding does not depend on whether a query clears the reporting threshold (a). Sources 11, 12, 35, 36.
- **Geo: presence-or-interest is the default (a); no evidenced share-of-spend figure exists** - Arshinkov's May 2025 piece has none, and the "30-40% burned" and "12-25% saved" figures in search results are unsourced (c). Source 56.
- **Search Partners.** Parked domains gone 10 February 2026 (a). Google's December 2025 uplift claim is 11% conversions with volume bidding or 7% value with value bidding, conditioned on 5%+ of spend on SPN (a). The general help page carries no performance claim (a). Sources 9, 10, 54.
- **Bid adjustments under automation (a).** tCPA and Max Conversions honour device only at -100%; tROAS treats device as a target adjustment; location, schedule, audience and demographic adjustments are not supported under any automated strategy, Maximize Clicks included. Source 2, corroborated 48, 49.
- **Dead keywords.** Optmyzr June 2025: 2-3x target CPA in spend with zero conversions for direct response, 4-5x for long cycles, after checking match type, terms, copy and offer (c)[V]. Source 38. The n_min formula (below) is the statistical floor these heuristics approximate.
- **Dayparts:** 90+ days of hour-of-week data before acting (c). Search results, Omologist.
- **"Typical waste 18-27%" (Digital Applied) and "one third of budget leaks" (Bluepear) have no method (c)[V].** Sources 55 and search.

### 4. Structure checks

- **Duplicate keywords across campaigns:** Google picks one ad group per auction unpredictably; there is no priority setting for Search, only Shopping (c, mechanism widely described). Search results, Dotidot/Pixis.
- **Exact match is the highest-converting match type for the vast majority of accounts (Geddes, Jan 2026) (c);** Optmyzr March 2024: 74.1% of 4,000+ accounts had better ROAS on exact, though the gap has narrowed (b)[V]; Optmyzr Nov 2024 lead-gen slice: exact ROAS 415% and CTR 21.6% vs phrase 314% and 11.4% (b)[V]. Sources 33, 34, 41.
- **Broad match is default for new campaigns since July 2024 (a via 42).** Campaign-level broad match setting requires conversion-based Smart Bidding and changes keyword prioritisation (a). Sources 21, 42.
- **Add top converting terms as exact keywords** or PMax and AI Max outrank the Search campaign for them (Geddes; Optmyzr PMax study) (c)+(b)[V]. Sources 32, 41.
- **Quality Score:** not an auction input, diagnostic only, do not optimise or aggregate (a). Source 1.
- **Ad groups:** 5-15 keywords ideal, under 50 hard cap, 2-3 ads per group (c). Sources 47, 55.

### 5. Bidding and learning

- **Learning (a):** up to 3 weeks or 1-2 conversion cycles; four triggers; Manual CPC exempt; no conversion count published; learning continues after the label clears. Source 3.
- **"30 conversions in 30 days" is practitioner (c),** repeated in 46, 55 and search results, never in source 3.
- **Broad match with Max Clicks or Max Conversions without a target performs poorly; reasonable with tCPA/tROAS (Geddes) (c).** Source 41.

### 6. Budget-capped winners and impression share

- Search IS + lost to budget + lost to rank is roughly 100% (c, arithmetic). Lost-to-budget is modelled from pacing, directionally reliable (c). High lost-to-budget with CPA on target is the one clean "raise budget" case; high lost-to-rank means bids, relevance or page, budget does nothing (c). Search results, Adalysis/Dotidot.

### 7. Autopilot and optimisation score

- **Auto-apply is opt-in; nothing is documented as on by default (a).** History tab shows who enrolled and when. Source 8.
- **API can now read it:** `recommendation_subscription` lists enrolled types; `change_event.client_type = GOOGLE_ADS_RECOMMENDATIONS_SUBSCRIPTION` isolates auto-applied changes (a). Source 25. This corrects the existing reference, which said auto-apply is a screen-only check.
- **Text customization (ex automatically created assets) is opt-in inside AI Max; legacy ACA campaigns started upgrading 27 May 2025; disabling final URL expansion follows disabling text customization; a disabled legacy setting cannot be re-enabled (a).** Source 7.
- **AI Max:** all three parts on when AI Max is on, each can be turned off (a); negatives respected (a); turning AI Max off disables brand exclusions (a); pinned assets may be overridden (c reporting a); Google claims 14% more conversions at similar CPA (a)[V, Google's own]. Sources 4, 5, 6, 43.
- **Optimisation score:** Google says do not make raising it a goal; dismissing raises it (a via Ginny Marvin, and 40). Optmyzr 17,380 accounts (Aug 2024) found the 90-100 bracket had the cheapest CPA and 186% better ROAS than sub-70, but lower brackets had better conversion rates and the authors call it correlation with active management, "not and never a KPI" (b)[V]. Sources 31, 40.

### 8. Hygiene

- Disapproved and limited ads, dead URLs, negative lists not attached (`campaign_shared_set`), budgets with zero references, expired promotion assets (a for the mechanisms, c for the checklist). Sources 23, 27, 28, 47.
- Change history via API is capped at 30 days and 10,000 rows per query; not every UI change appears, use `change_status` for completeness (a). Source 26.

### 9. Statistical floor

- n_min = ln(0.05) / ln(1 - CVR) is the click count at which zero conversions has under 5% chance of being luck. 1% CVR: 299 clicks. 3%: 98. 5%: 58. 10%: 29. This is arithmetic, not a citation, and it explains why the Optmyzr 2-3x-CPA rule works at typical lead-gen CVRs and fails at 1%.

### 10. Outside-in prospect audit

- Transparency Center shows creatives, format, last-shown date, broad regions, 24-48h refresh; only verified advertisers appear; nothing on spend, keywords, match types, audiences, conversions (c)[V]. Source 53.
- What it CAN support: is the business advertising at all, which services and offers the copy pushes, whether ads are stale (last shown months ago), whether landing pages are the homepage, whether the page has tap-to-call, message match, speed. What it CANNOT support: any dollar waste figure, any CPA claim, any "you are wasting X%". Present it as observations plus what each likely costs, labelled as estimates.

### 11. 2025-2026 changes that alter audit checks

- 23 Jan 2025: PMax campaign-level negatives. 11 Mar 2025: limit 10,000. Mar 2025: PMax search terms visible. 7 Aug 2025: search terms for all PMax and via API, campaign-level lists, themes 25 to 50. (a) Sources 19, 59.
- 27 May 2025: ACA becomes text customization inside AI Max (a). Source 7.
- 5 Jun 2025: asset performance labels retired, full per-asset stats (a). Source 17.
- Dec 2025: SPN 11%/7% uplift claim with 5% SPN spend condition (a). Source 9.
- 10 Feb 2026: parked domains removed (a). Source 9, 54.
- Jan 2026: PMax channel reporting splits SPN (a). Source 9.
- Apr 2026: Invalid Activity Credit report with adjusted metrics (a). Source 9.
- Aug 2026: LSA migration wave one (a). Source 18.
- June 2026 GML Q&A: no AI Max auto-upgrade date, no DSA date given by Google's liaison (a). Source 44. This conflicts with the existing reference's "1 September 2026" and "February 2027" lines, which could not be re-verified this pass.

---

## Myths and stale advice, with the date each changed

- **"Auto-apply can only be checked on screen."** Stale since the `recommendation_subscription` resource shipped (documented at API v25, 2026). Source 25.
- **"Add every misspelling as a negative."** Stale since June 2024, negatives block misspellings and casing. Sources 57, 58. Plurals and synonyms are still NOT covered (a, existing file).
- **"Automatically created assets" as a setting name.** Renamed text customization inside AI Max from 27 May 2025. Source 7.
- **"Replace Low-rated assets."** Labels retired 5 June 2025. Source 17.
- **"PMax has no search terms and no negatives."** Negatives from 23 Jan 2025, search terms from March 2025, both via API from August 2025. Sources 19, 59.
- **"Opt out of Search Partners because of parked domains."** Removed 10 February 2026. Source 9.
- **"Google Guaranteed."** Consolidated into Google Verified 20 October 2025 (existing file, not re-verified this pass).
- **"Location bid modifiers fine-tune Smart Bidding."** Never true under automated strategies; the official chart says not supported. Source 2.
- **"Quality Score 7+ is the target."** Google: not an auction input, do not optimise it. Adalysis's 2021 checklist still says aim for 7; treat as retired. Sources 1, 47.
- **"Raise optimisation score."** Google: do not make it a goal. The Optmyzr correlation is management effort, not the score. Sources 31, 40.
- **"30 conversions per month to exit learning" / "20% rule".** Neither appears in Google's learning doc. Source 3.
- **"Search terms show what your ads matched."** Half or more can be hidden; Google confirms the threshold is volume across all Google searches. Sources 11, 12, 35.
- **"Broad match is off unless you turn it on."** Default for new Search campaigns since July 2024. Source 42.
- **"1 September 2026 AI Max auto-upgrade" and "DSA to February 2027".** Google's liaison gave no dates at GML 2026 (9 June 2026). Keep as "verify before quoting". Source 44.

---

## Rules that fell out - operational rules an audit command should enforce

1. Run tracking integrity before any performance finding; if a primary action is dead, double counted or a junk category, stop and report that (a mechanism, c ordering).
2. Two primaries for one business event is a double count; the GA4 import goes secondary, never the native tag (c, mechanism sound).
3. Lead actions count One per click; flag any lead action on Every (a).
4. Conversion window must match the Time Lag report; default 30 days is only right by accident; windows never recount history (a).
5. Drop the trailing 7 days from every performance window because conversions post by click date (a).
6. Enhanced Conversions must be on and verified in Diagnostics; report match rate, call 40% the practitioner floor (c).
7. In EEA/UK traffic, verify all four consent signals and the 700-clicks-per-7-days modelling floor before promising recovered conversions (a).
8. Call actions need a duration threshold, 45-60 seconds is the convention; ad-call, website-call and click-to-call must not all be primary (a mechanism, c number).
9. Compute hidden search-term share per campaign as keyword clicks minus search-term clicks; above 40%, downgrade every negative-keyword finding and shift to match-type restriction (b for the range, c for the 40% trigger).
10. Never state "X% of your budget is wasted" from a blog; measure this account (c, and no primary source exists for the folk numbers).
11. Presence-only on any local business; flag presence-or-interest as a Tier 1 fault; do not attach a saved-percentage claim (a for default, c for waste size).
12. Display on a Search campaign is a fault, no exceptions for local service (c consensus).
13. Search Partners: judge on segmented data with at least 500 SPN clicks; Google's own uplift claim applies only at 5%+ SPN spend, so quote it only when that holds (a).
14. Under tCPA, Max Conversions or tROAS, any non-1.0 location, schedule, audience or demographic modifier is dead weight; the only live lever is a -100% device exclusion (a).
15. Zero-conversion floor is n_min = ln(0.05)/ln(1-CVR) clicks using the account's own CVR, AND spend of at least 2-3x target CPA; never a flat 100 clicks (arithmetic + c).
16. Exclude keywords with all-conversions above zero or assisted credit before calling them dead (c).
17. Suppress performance findings on any campaign with a bid strategy or target change in the trailing 21 days (a for the 3-week learning window).
18. Change churn: count bid-strategy and target changes via change_event; the API sees 30 days only, so pair it with the UI change history for 90 (a).
19. Raise budget only when lost-IS-to-budget exceeds 10% AND the campaign is at or under target CPA; when over target, fix efficiency first (c, arithmetic).
20. Unshare budgets before diagnosing budget loss; lost-IS-to-budget is uninterpretable on a shared budget (c).
21. Every auto-apply subscription is a finding; read `recommendation_subscription` and list what has been applied via change_event client_type, then recommend all off (a for the read, c for the recommendation).
22. Optimisation score is context, never a finding or a target (a).
23. AI Max on: report search term matching, text customization and final URL expansion states separately; on a service business flag final URL expansion unless URL exclusions are set (a mechanism, c judgement).
24. Turning AI Max off drops brand exclusions; say so before recommending it (a).
25. Broad match on a campaign under 30 conversions a month, or on Max Clicks or Max Conversions without a target, is a red flag; require tracking, Smart Bidding with a target, a mature negative list and volume before accepting it (c, Geddes and Optmyzr).
26. Every converting search term that is not already an exact keyword is a structure finding, because PMax and AI Max will take it otherwise (b)[V] + (c).
27. Duplicate keywords across campaigns are cannibalisation; one home per query (c).
28. Report Quality Score components below average per ad group, never the 1-10 number, never a QS target (a).
29. Negative lists must be attached: join shared_set to campaign_shared_set and list campaigns with none (a mechanism).
30. Negatives at account level are the highest-risk placement; flag any account-level negative that conflicts with an active keyword (c, and Google's conflict check does not scan shared lists reliably).
31. Stop maintaining misspelling negatives (June 2024); keep maintaining plural and synonym pairs (a).
32. Ads: fewer than two RSAs, under 15 headlines or 4 descriptions, fully pinned, fewer than four sitelinks, no business logo, are all findings; "Good not Excellent" Ad Strength is not (a for limits, b[V] for the Ad Strength null result).
33. In prospect mode, never attach a dollar figure to anything derived from the Transparency Center or SERP; report observations and label every cost as an estimate (c).
