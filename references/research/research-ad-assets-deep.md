# Research dossier - Google Ads assets for local service and lead-gen advertisers, second deep pass
Researched 29 August 2026 · 87 sources read (Google help and policy pages first, then the Google Ads API reference and the installed client library, then practitioners) · this pass answers "which assets to build, in what order, and exactly what to write in them" - the first pass only named the types
Next: replace `references/ad-assets.md` with the draft in `ref-ad-assets-v2.md`, then fix the three bugs in `code/build_assets.py` listed at the bottom.

## How every claim is graded

- **(a)** Google documentation, policy page or API reference
- **(b)** A study or dataset with a stated sample size
- **(c)** Practitioner convention, or a single-account anecdote
- **[F]** Field-verified in this repo, 29 August 2026, against google-ads-python 31.0.0 (API v21)

Where a widely-quoted number turns out to be a Google marketing blog with no sample, it is graded (c) and dated, not (b).

---

## The one-paragraph answer

There is **no published study with a stated sample comparing lift across asset types**. Optmyzr, Adalysis, Search Engine Land, SEJ, WordStream, Klientboost and ppc.land were all searched; nobody has run it. Every "sitelinks add 10 to 20% click-through" figure in circulation is Google's Inside AdWords blog post of 24 January 2014, which describes a pre-RSA, pre-carousel, pre-AI-Max results page. So the priority order in this dossier is built from **mechanics that are documented** - what serves, what Google requires before an asset shows at all, what can capture a lead inside the results page, and what a trades buyer needs to see - not from lift tables. That is the honest position and the file should say so out loud.

---

## Sources

### Google help and policy pages (a) - all fetched and read 29 August 2026

1. About sitelink assets · support.google.com/google-ads/answer/2375416 · evergreen · 25-character link text, 2 minimum to serve, 6 desktop / 8 mobile carousel, account to ad group, scheduling, "up to 3.5% more conversions" at 6 sitelinks.
2. Sitelink asset requirements (policy) · support.google.com/adspolicy/answer/1054210 · evergreen · Reusing link text is banned even across different destinations; sitelink domain must match the ad's domain; no attention-grabbing punctuation.
3. About callout assets · support.google.com/google-ads/answer/6079510 · evergreen · 25 characters, up to 10 can show, desktop one dotted line / mobile wraps, and the key line: a more granular level **prevents** higher-level callouts from serving.
4. Callout asset requirements (policy) · support.google.com/adspolicy/answer/6084196 · evergreen · Callout text may not repeat other callouts, **ad text**, or **sitelink text** in the same ad group, campaign or account. This is a disapproval rule, not a tip.
5. About structured snippet assets · support.google.com/google-ads/answer/6280012 · evergreen · 13 fixed headers, 3 values minimum and 4 recommended, 2 headers on desktop and 1 on mobile, header-value mismatch is the top disapproval cause.
6. Structured snippet requirements (policy) · support.google.com/adspolicy/answer/6283300 · evergreen · Per-header definitions; no promotional text in values; one item per value field; no repeats within or across headers.
7. About call assets · support.google.com/google-ads/answer/2453991 · evergreen · Strict E.164, vanity/premium/fax rejected, number must be in the page source or the domain verified in Search Console, mobile call button, desktop number plus QR code, most specific level wins.
8. About call reporting · support.google.com/google-ads/answer/2454052 · evergreen · Account-level switch, swaps in a Google forwarding number, Search Network only.
9. Google forwarding number · support.google.com/google-ads/answer/2382961 · evergreen · 39 countries, free, Google's property, tries to match your area code, stays connected 60 days after a caller's first call.
10. About phone call conversion tracking · support.google.com/google-ads/answer/6100664 · evergreen · You set the minimum call length that counts; call conversions feed Smart Bidding.
11. View details of each call · support.google.com/google-ads/answer/9099302 · evergreen · The caller's phone number is shown only for calls over roughly 15 seconds, never in India and Japan.
12. Analyze call reporting data · support.google.com/google-ads/answer/7180997 · evergreen · Phone impressions, phone calls, phone-through rate.
13. About AI-qualified call leads · support.google.com/google-ads/answer/16913326 · live 2026 · Google AI reads the call recording and decides intent; duration becomes the fallback. US and Canada only.
14. Action required: transition from call ads to call assets · support.google.com/google-ads/answer/16598240 · 2025-2026 · The retirement notice.
15. How to transition from call ads to call assets · support.google.com/google-ads/answer/16619010 · 2026 · **February 2026** creation removed, **February 2027** impressions stop, no automatic migration.
16. Destination requirements, unverified phone number (policy) · support.google.com/adspolicy/answer/6368661 · updated August 2025 · The number must be in service in the targeted location and relate to the advertised company.
17. About lead form assets · support.google.com/google-ads/answer/9423234 · updated 20 July 2026 · Privacy policy link, conversion bid strategy, lead form goal, RSA only, 60-day storage, 30-day CSV, five delivery methods.
18. Lead form requirements (policy) · support.google.com/adspolicy/answer/9472930 · evergreen · First-party advertisers only, no lead resellers, vertical restrictions.
19. About business information · support.google.com/google-ads/answer/12497613 · evergreen · Advertiser verification plus **Search spend in the last 28 days**; logo 1200x1200 recommended, 128x128 minimum; placeholder globe until approved.
20. Business information requirements (policy) · support.google.com/adspolicy/answer/12499303 · evergreen · Business name 25 characters, must match the verified domain or legal name, must be on the landing page; logo square PNG/JPG under 5120 KB, must work in light and dark mode.
21. About brand verification for business information · support.google.com/google-ads/answer/13819790 · evergreen · The trademark route for a trading name that is not the domain.
22. Advertiser verification · support.google.com/adspolicy/answer/9703665 · evergreen · The programme business name and logo depend on.
23. Timelines for advertiser verification · support.google.com/adspolicy/answer/15588490 · evergreen · Up to 5 business days, up to 30 in rare cases; a missed assigned deadline pauses the account.
24. About location assets · support.google.com/google-ads/answer/2404182 · evergreen · Pulls address, phone, hours and photos from the linked Business Profile; a closed profile stops the asset; Business Profile edits take up to a day.
25. Location asset requirements (policy) · support.google.com/adspolicy/answer/144649 · evergreen · Owner approval, a recognised non-closed address, and the service must be available there.
26. Common issues linking Google Ads and Business Profile · support.google.com/google-ads/answer/14232717 · evergreen · 24 to 48 hours to sync; unverified locations never appear.
27. About affiliate location assets · support.google.com/google-ads/answer/7178291 · evergreen · Manufacturers selling through retail chains and auto dealers only. Not a trades format.
28. About image assets for Search campaigns · support.google.com/google-ads/answer/9566341 · evergreen · Account open 60 days, Search spend over $0 in the last 30 days, 1:1 required at 300x300 minimum, 1.91:1 optional at 600x314, 5120 KB cap, up to 20 per campaign, "6% increase in click-through rate on average" from Google internal data **2 to 29 April 2023**.
29. Image asset format requirements (policy) · support.google.com/adspolicy/answer/10347108 · updated 9 July 2026 · Eight rejection categories; text, logos and graphic overlays are disapproved on sight; AI disclosure labels carved out.
30. About price assets · support.google.com/google-ads/answer/7065415 · evergreen · 3 items minimum, 5+ recommended, up to 8 cards, 25 characters per header and per description, 10 languages and 20+ currencies, and at most two charged clicks per impression.
31. About promotion assets · support.google.com/google-ads/answer/7367521 · evergreen · Monetary or percentage discount, 40+ fixed occasions with Google-set windows, and the rule that an occasion asset must be created or edited **within 6 months of its start date** or it stops serving.
32. Promotion asset requirements (policy) · support.google.com/adspolicy/answer/7374309 · evergreen · The promo code field must contain a real code and nothing else.
33. About store ratings / seller ratings · support.google.com/google-ads/answer/2375474 · evergreen · Roughly 100+ eligible reviews within the last **24 months**, 3.5 stars minimum for text ads, Google Customer Reviews and approved partners only, display domain must match.
34. About account-level automated assets · support.google.com/google-ads/answer/7175034 · evergreen · Nine automated asset types, each individually switchable, with the exact navigation path.
35. About dynamic sitelink assets · support.google.com/google-ads/answer/6058574 · evergreen · "May show alongside or instead of manually created sitelinks"; the 3.5%-at-6-sitelinks figure; the off-switch is account-wide.
36. About dynamic callouts · support.google.com/google-ads/answer/6292940 · evergreen · Google writes callouts from the landing page; they may replace yours; they cannot be scheduled.
37. About dynamic structured snippet assets · support.google.com/google-ads/answer/6098371 · evergreen · Same pattern for snippets.
38. About assets (when assets show) · support.google.com/google-ads/answer/7331111 · evergreen · Assets are free, need a minimum Ad Rank before they show, are chosen per auction, and Google's own advice is "4 or more asset types."
39. Use as many asset types as possible · support.google.com/google-ads/answer/12073962 · evergreen · "At least four active sitelinks", up to 20 per level, and the business logo plus name figure: **8% more conversions at a similar cost per conversion**.
40. Create effective search ads · support.google.com/google-ads/answer/6167122 · evergreen · Carries the 8% logo/name figure and the HUGO BOSS image case study, and notably gives **no** figure for sitelinks, callouts or structured snippets.
41. About Ad Strength for responsive search ads · support.google.com/google-ads/answer/9921843 · Google internal data window 15 to 20 August 2025 · Ad Strength names headlines, descriptions and **sitelinks**; it does not name callouts or snippets. Ad Strength "doesn't directly influence your ad's serving eligibility" and is not used in Ad Rank or Quality Score. Poor to Excellent correlates with 15% more conversions.
42. Measure ad asset performance · support.google.com/google-ads/answer/2454049 · evergreen · Per-asset clicks, impressions, click-through rate, cost and average cost per click; the **Click type** segment separates asset clicks from headline clicks; total rows do not equal the sum of individual rows.
43. About your Google Ads account limits · support.google.com/google-ads/answer/6372658 · evergreen · 250,000 ad-group-level assets per account, 50,000 campaign-level per account, 10,000 ad-group-level per campaign. No published per-type cap.
44. Turn text customization on or off · support.google.com/google-ads/answer/16738708 · 2025-2026 · "Automatically created assets" renamed text customization and moved inside AI Max; the exact off-switch.
45. Text customization FAQ · support.google.com/google-ads/answer/16740321 · 2025 · Generative headlines and descriptions written per query.
46. Google Ads highlights of 2025 · support.google.com/google-ads/answer/16756291 · 2025-2026 · Official annual recap confirming the AI Max direction.
47. Create and edit callout assets · support.google.com/sa360/answer/13871413 · evergreen · Confirms date, day and hour scheduling, and that only a **mobile** device preference exists.
48. Create and apply sitelinks using a bulksheet · support.google.com/sa360/answer/14863541 · evergreen · The clearest official statement of override logic: sitelinks applied directly to a campaign or ad group **override** account-level sitelinks, with explicit "(inherited)" and "(disabled)" values.

### Google Ads API and the installed library (a, [F])

49. Assets overview · developers.google.com/google-ads/api/docs/assets/overview · current · Asset, CustomerAsset, CampaignAsset, AdGroupAsset, AssetSet; assets generated by text customization cannot be modified; AssetSource distinguishes user from system.
50. Working with assets · developers.google.com/google-ads/api/docs/assets/working-with-assets · current · Once uploaded an asset cannot be changed or removed programmatically; you unlink it and create a new one.
51. Automated assets (API) · developers.google.com/google-ads/api/docs/assets/automated-assets · current · Query with `AssetSource = AUTOMATICALLY_CREATED`; the opt-out toggle is web UI only and cannot be scripted.
52. Add sitelinks code sample · developers.google.com/google-ads/api/samples/add-sitelinks · current · `link_text` plus `description1` and `description2` always built together, then attached via `CampaignAsset` with field type `SITELINK`.
53. StructuredSnippetAsset RPC reference · developers.google.com/google-ads/api/reference/rpc/v20/StructuredSnippetAsset · v20 · `values` is 3 to 10 strings, each 1 to 25 characters.
54. SitelinkAsset RPC reference · developers.google.com/google-ads/api/reference/rpc/v20/SitelinkAsset · v20 · `description1` and `description2` are 1 to 35 characters each, and both must be set if either is.
55. Lead form webhook implementation · developers.google.com/google-ads/webhook/docs/implementation · current · The full JSON payload, `google_key` validation, `lead_id` de-duplication, HTTP 200 with `{}`, 4XX non-retryable and 5XX retryable.
56. **[F] Repo field verification, 29 August 2026** · google-ads-python 31.0.0 · Field names and enum values read directly out of the installed library; the library ships v21 to v24 only and cannot target v25. Listed in section 13 below.
75. About the ad-level asset report for responsive search ads · support.google.com/google-ads/answer/9564897 · updated 2025 · "Full performance statistics is only available for dates on or after June 5, 2025"; the performance label column is deprecated; per-instance attribution explains why rows do not sum.
76. About campaign-level asset reporting for responsive search ads · support.google.com/google-ads/answer/9781208 · updated 2025 · The Campaigns → Assets view, the metric list, the "Added by" filter including Google AI, and click-type segmentation.
77. Google Ads API field reference, v25 · developers.google.com/google-ads/api/fields/v25 · current · Exactly which metrics and segments are selectable per resource; the bare `asset` resource carries conversion metrics only.
78. Fetching assets (GAQL) · developers.google.com/google-ads/api/docs/assets/fetching-assets · current · Working queries for `asset`, `ad_group_asset` and `ad_group_ad_asset_view` including `performance_label`.
79. Deprecation and sunset dates · developers.google.com/google-ads/api/docs/sunset-dates · current · v25 released 22 July 2026 and sunsets August 2027; v22 sunsets October 2026.
80. Google Ads API release notes · developers.google.com/google-ads/api/docs/release-notes · v25.1, 19 August 2026 · `TEXT_DISCLAIMER` added to `AssetFieldType`; v24.2 added `GENERATE_LANDING_PAGE_TEXT`; v25 added `GENERATE_ANIMATED_IMAGES_FROM_OTHER_ASSETS`.
81. googleapis proto, v25 resources · github.com/googleapis/googleapis · v25 · Resource name patterns, `field_type` immutability, `status` and `primary_status`.
82. googleapis proto, v25 asset_service · v25 · `AssetOperation` has `create` and `update` with an `update_mask` but no `remove`.
83. googleapis proto, v25 asset_error · v25 · The full `AssetError` enum including `DUPLICATE_ASSET` and `CANNOT_MODIFY_AUTOMATICALLY_CREATED_ASSET`.
84. Partial failures best practice · developers.google.com/google-ads/api/docs/best-practices/partial-failures · current · Do not use partial failure when operations depend on temporary IDs.
85. Asset automation settings · developers.google.com/google-ads/api/docs/assets/asset-automation-settings · current · `TEXT_ASSET_AUTOMATION`, `FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION`, and `text_guidelines` - up to 25 term exclusions of 30 characters and 40 messaging restrictions of 300 characters.
86. Message asset requirements (policy) · support.google.com/adspolicy/answer/16578433 · September 2025 · Enforcement began 30 October 2025 over roughly four weeks; unverified message assets stop serving.
87. Updates to AI labeling requirements · support.google.com/adspolicy/answer/17257106 · July 2026 · AI disclosure labels are permitted inside image and video creatives without counting as prohibited overlays.

### Practitioners, studies and trade press (b, c)

57. Better Ads via Better Sitelinks · adwords.googleblog.com · **24 January 2014** · The original and only source of "sitelinks lift click-through 10 to 20%". No sample, no method, describes a results page that no longer exists.
58. How I increased CTR by 300% using AdWords callouts · InfoTrust · 6 October 2014 · The most-cited callout case study; ad copy changed at the same time, no sample size. Confounded and stale.
59. Google now serving RSA headlines as sitelinks · Cypress North · **24 February 2025** · Up to two unpinned RSA headlines serve in the sitelink slot, pointing at the ad's own final URL; the author notes this breaks Google's own duplicate-destination rule.
60. Google responsive search ads may show second headline in sitelinks · Search Engine Roundtable · **21 February 2025** · Google's wording: headlines may serve "in the space that previously only sitelinks were eligible for"; pinned headlines are not eligible.
61. Google gives responsive search ads more flexibility · Search Engine Land · February 2025 · Trade coverage of the same announcement.
62. Inside Google's search ad design engine · ppc.land · **25 February 2026** · Google's Abby Butler confirms headline-into-sitelink is permanent behaviour; assets are modular; **500+ impressions per asset and 2,000+ per ad over 30 days** before data is meaningful.
63. Sitelink assets: everything you need to know · Search Engine Journal, Pauline Jakober · 8 February 2023 · Send sitelinks to tightly correlated pages; argues explicitly against generic "Blog" and "Technical Support" sitelinks for lead gen.
64. Understanding and analyzing Google Ads extension data · Adalysis, Brad Geddes · 28 September 2021 · The "this extension vs other" segment is the only way to see real sitelink clicks; observed accounts where only three of six sitelinks got impressions.
65. How to audit ad extensions · Adalysis · 19 January 2017 · Treats a campaign missing sitelinks, callouts or structured snippets as an audit failure.
66. How to measure Google Ads sitelink performance · Portent · 9 November 2020 · Worked example: 41,604 apparent sitelink clicks were actually 307 real clicks on that sitelink.
67. Sitelink extensions: how to 2x your ad real estate · Store Growers · updated 8 January 2026 · 4+ recommended; descriptions "highly recommended"; a "22%+ CTR boost from descriptions" and a PPCHero "64% CTR" figure, both without stated samples.
68. Sitelink assets: structure, control and trade-offs · TwoSquares · 2 January 2026 · Descriptions show only when Google decides they are useful and are less likely on mobile; recommends 3 to 5 high-intent sitelinks; scheduling is underused.
69. Callout assets in Google Ads: how they work · TwoSquares · 7 January 2026 · Callouts are "clarifiers not persuasion tools"; realistic display is 2 to 6 on desktop.
70. Structured snippet assets: how they work · TwoSquares · 19 January 2026 · Snippets suit enumerable offerings and are weak where differentiation is narrative.
71. Google Ads callout extensions complete guide · AdNabu · updated 21 May 2026 · Up to 10 callouts can show; 20 per level is the UI convention; specificity beats vagueness.
72. Google Ads assets, complete guide to all asset types · Loves Data · updated 19 March 2026 · Up to 10 values per structured snippet; Google recommends at least four different asset types per campaign.
73. Account-level automated extensions: which to keep, which to cut · Phil Taylor, ppc-strategist · 20 February 2025 · Keep seller ratings; case-by-case on automated location and dynamic images; turn off dynamic sitelinks, callouts, snippets, longer headlines and dynamic business information.
74. Google Ads automated assets and how to turn them off · Olivia Lawson · 21 July 2024 · Same conclusion; cites a florist whose automated assets surfaced funeral arrangements.

**Also read, cited inline:** Google Ads assets and extensions best practices, Omologist, 22 August 2026 (lead-gen ordering, campaign-level sitelinks so roofing ads do not show plumbing links) · The complete guide to Google's ad extensions, TwoTrees PPC, 13 March 2024 updated May 2026 (priority order) · Sitelink examples 2026, Search Scientists, 6 August 2026 (the Specials vs Free Shipping single-account example) · Google to proactively police ad sitelinks for duplicate landing pages, Search Engine Land, 2012 · Google drops $50K ad spend requirement for lead form assets, Search Engine Land, July 2026 · Lead form assets open up, Digital Applied, 20 July 2026 · Your ads look profitable until you learn how Google counts call conversions, WhatConverts, 12 February 2026 · Google Ads now uses AI to qualify phone call leads, ppc.land, 21 April 2026 · Google Ads call recording default, ALM Corp, 3 May 2026 · Google's 42 GML 2026 lead gen launches, ppc.land, 21 May 2026 · Google Ads adds lead management dashboard, TechWyse, 2 June 2026 · Verify call extension phone numbers, CallRail help centre · Local SEO, DNI and NAP consistency, CallRail · Google Ads lead form extensions, North Country Consulting, 25 June 2026 · Google Ads call tracking vs third-party tools, Nimbata, 2026 · Google Ads bans blurry image assets, ppc.land, July 2026 · Google Ads to migrate automatically created assets to AI Max September 1, Search Engine Roundtable, 7 August 2026 · AI Max features complete list, groas.ai, November 2025 · 13 HVAC Google Ads tweaks, Hibu, 2025 · 2026 guide, Google Ads for plumbers, Built Right Digital, 2026.

---

## 1. Priority order, with the evidence that exists and the evidence that does not

**The absence is the finding (a, by omission - src 40).** Google's own "Create effective search ads" page publishes a lift number for the business logo plus name (8% more conversions at similar cost per conversion) and a named case study for images (HUGO BOSS, 2.5x return on ad spend, 5% click-through). It publishes **no number at all** for sitelinks, callouts or structured snippets on that page. The only sitelink figure Google publishes anywhere is on the dynamic sitelinks page: **up to 3.5% more conversions at a similar cost per conversion for campaigns that go to 6 sitelinks (a, src 35)** - and note that measures sitelink *count*, not manual versus dynamic.

**No cross-asset study exists (b, negative result).** Optmyzr, Adalysis, Search Engine Land, Search Engine Journal, WordStream, Klientboost and ppc.land were all searched. Optmyzr's large datasets (13,671 accounts on RSA adoption, 1M+ ads on Ad Strength) cover ad copy and pinning, not asset-type lift. Nobody has published the comparison.

**The mechanics that do justify an order (a):**
- Assets need a **minimum Ad Rank** before they serve at all, and Google chooses per auction from every eligible asset (src 38). More eligible formats is more chances, at zero incremental cost.
- Google charges **at most two clicks per impression** across the whole ad (src 30). An asset click costs a headline click.
- Only **three assets can capture a lead inside the results page**: the call asset (a tap that rings the phone), the lead form (a submit), and the sitelink (a click to a page built to convert). Callouts, snippets, price and promotion are non-clickable - they can only improve the odds of a click elsewhere.
- **Ad Strength names sitelinks and does not name callouts or snippets (a by omission, src 41)** - which is the only Google-side signal that ranks them against each other.

**The practitioner orders, three independent sources (c):**
- TwoTrees PPC (March 2024, updated May 2026): sitelinks, then callouts, then structured snippets, then business name and logo, then images, then location, then lead form.
- Adalysis (January 2017): sitelinks, callouts and structured snippets are a pass/fail audit item on every campaign.
- Omologist (22 August 2026), lead-gen specific: call assets, then lead form, then location, then callouts, then sitelinks.

**The ruling for a trade.** Call asset, sitelinks, callouts - in that order. The call asset goes first because trades leads are phone leads and it is the only asset that closes the loop inside the results page. Sitelinks second because they are the only asset Ad Strength counts, they are the only non-call asset that can be clicked, and Google publishes a real (if small) conversion figure for building six. Callouts third because the policy rule in src 4 makes them the only place to put a trust claim that will not fit in the RSA. Business name and logo is arguably the true third on Google's own 8% number, but it is gated behind verification plus 28 days of spend, so it is a parallel track, not a build step.

**Effective dead weight for lead gen (c):**
- **Price assets** unless a real published fee exists. A trade that quotes per job cannot populate them honestly, and the two-click cap means a browsing click costs double.
- **Promotion assets with an occasion.** The 40+ occasion list is retail; a furnace is not a Mother's Day purchase, and the 6-month expiry creates maintenance. A no-occasion promotion for a standing offer is fine.
- **App assets** unless the business has an app.
- **Affiliate location assets** - manufacturers and auto dealers only (a, src 27).
- **Seller ratings for a single-location trade.** Google Business Profile reviews do not feed seller ratings (a, src 33). Four hundred five-star Maps reviews earn nothing here. Put the effort into the Business Profile instead.
- **Structured snippets** are not dead weight but are demoted to fourth: non-clickable, one header on mobile, and not named in Ad Strength.

---

## 2. Sitelinks

**Counts (a, src 1).** Minimum 2 to serve on desktop and 2 on mobile - below that none show. Maximum shown is **6 on desktop and 8 on mobile in a carousel**. Video and Demand Gen show 4. Maximum you can create is 20 per level (a, src 39). Google recommends "at least four active sitelinks" (a, src 39) and its Ad Strength page wants 6 or more (a, src 41).

**What actually serves (c, src 64, 68).** Adalysis's routine observation is that with six sitelinks live, only three get impressions. TwoSquares recommends 3 to 5 high-intent sitelinks on the grounds that sitelinks simplify choice rather than multiply it. Build 6, expect 3 or 4 to render.

**Character limits (a).** Link text 25 characters, 12 in double-width languages (src 1). Descriptions are **1 to 35 characters each and both must be set if either is** (src 54, 52). Practitioner target is 12 to 15 characters of link text so the mobile carousel does not truncate (c, src 68).

**Are descriptions worth writing? Yes, with a caveat (a + c).** Google calls them optional but highly recommended. Adding them does not reduce the number of sitelinks shown (c, src 67 via equimedia). But TwoSquares (2 January 2026) is precise: descriptions appear only when Google predicts they are useful, and are **less likely to render on mobile** - which is where most trades traffic sits. Store Growers cites a "22%+ CTR boost" and a PPCHero "64% CTR increase", both **without stated sample sizes** (c). Verdict: write them, they are free and they are the only place to pre-qualify a click, but do not put the value proposition inside them.

**What they should point at.** The repo's six standard pages (Services, About, Contact, Quote, Reviews, Pricing) are **half wrong for a lead-gen ad**. Two independent practitioner sources argue against the navigation half: SEJ (src 63) dislikes generic destinations and calls a bare "Blog" sitelink insufficiently descriptive; TwoSquares (src 68) names "linking to low-intent pages such as blog indexes" as a top mistake; Search Scientists (August 2026) reports a single-account comparison where a "Specials" sitelink ran 0.11% click-through and 13.22% conversion rate against a "Free Shipping" sitelink at 0.01% and zero conversions - anecdote-grade, no sample, but a 10x direction. The intent-based set practitioners converge on for a trade is pricing, emergency or same-day, reviews, financing, service areas, and book now or free quote. **Contact and About should be dropped: the call asset already handles contact, and About is not what an emergency searcher is shopping for.** Services and Quote survive as Pricing and Book now. Reviews and Pricing were already right.

**Level (a, src 48).** Search Ads 360's help page is the clearest statement: sitelinks applied directly to a campaign or ad group **override** account-level sitelinks, and explicit "(inherited)" and "(disabled)" values exist. The main help page uses looser language about all levels in a branch being eligible together. Assume override. **Campaign level is right for a trade** - account level cross-contaminates a multi-service account (a roofing ad showing plumbing links), and ad group level splits data so thin that no sitelink clears the 500-impression threshold below.

**Scheduling (a, src 1).** Start and end dates, days of week, hours of day, plus a mobile device preference (c, src 67). Underused (c, src 68). For a trade: emergency sitelink on nights and weekends, book-online on business hours, seasonal offers with a hard end date.

**The mistakes that waste the slot:**
- **Reusing link text is a policy violation even when the destinations differ (a, src 2).** Not a style note.
- **Sitelink domain must match the ad's domain (a, src 2),** with narrow exceptions for named third parties like YouTube and LinkedIn, and then the link text must carry the full domain.
- **Two sitelinks pointing at the same page, or at pages with substantially the same content, are suppressed.** Google has enforced this since 2012.
- **Pointing a sitelink at the ad's own final URL** wastes the slot.
- **Attention-grabbing punctuation** - exclamation marks, leading punctuation, symbols like the arrow glyph - is banned (a, src 2).
- **404s.** A dead sitelink is a paid click into nothing and a disapproval risk.
- **Duplicating a headline verbatim** spends an extra line saying the same thing twice.
- **Misreading the report.** The unsegmented clicks column counts ad clicks while the sitelink was attached, not clicks on the sitelink. Portent's worked example: 41,604 apparent clicks were 307 real ones.

**Since 20 February 2025 (a, src 60, 61; c, src 59; confirmed permanent, src 62).** Up to **two unpinned RSA headlines** can serve in the sitelink slot, pointing at the ad's own final URL. Headlines already showing in the ad are not reused. **Pinned headlines are not eligible.** ppc.land confirmed with Google's Abby Butler on 25 February 2026 that this is permanent behaviour, not a test. Two consequences: every unpinned headline is now potential link copy and must read as one, and pinning is the only stated control for a headline that must never render as a link. There is no opt-out.

**AI Max (a, src 44, 46; c, groas.ai November 2025).** Under AI Max, sitelink and callout text can be generated at ad group level. Practitioner reports through November 2025 include irrelevant auto-generated assets. Supply the full manual set regardless.

---

## 3. Callouts

**Limits (a, src 3).** 25 characters, 12 double-width. **Up to 10 can show**, depending on character spacing, browser and device. Desktop renders them on a single line separated by dots; mobile and tablet wrap them in paragraph form. Realistic display is 2 to 6 on desktop (c, src 69). The widely repeated "20 per level" is a UI convention, not a documented cap - Google's published limits are only the account-wide asset ceilings (a, src 43).

**Minimum to serve:** 2 per campaign or ad group. Google's own callout page does not state a floor; Adobe's restatement of Google's rule does. Treat 2 as the floor and 4 as the working minimum (a via secondary).

**Level behaviour, and this is a correction to the previous file (a, src 3).** Google's callout page says it plainly: **a more granular level prevents higher-level callouts from serving. One ad-group callout makes every campaign-level callout ineligible for that ad group.** This is the opposite of sitelinks, where levels in the same branch can combine. Any ad-group callout set must therefore be complete on its own.

**The no-repeat rule is a policy, not a tip (a, src 4).** Verbatim: "The text can't repeat within a callout or from other callouts, ad text, or sitelink text within the same ad group, campaign, or account." Google's own example: if the ad text says "Free shipping", a callout saying "Free shipping" is **disapproved**. The previous file called this "Google's own rule" as advice; it is a disapproval trigger and it extends to sitelink text, which nothing in the repo currently checks.

**Also banned (a, src 4):** punctuation and symbols that exist only to draw attention - exclamation marks, punctuation at the start, decorative arrows.

**What job do they do?** They are not clickable, so they cannot be attributed a click. Two defensible functions: (1) they add vertical height, pushing the next advertiser down; (2) they carry trust and eligibility claims that will not fit in the RSA and pre-qualify the click. The Ad Rank argument is the strongest documented one - assets are an input to Ad Rank and an ad needs minimum Ad Rank before extra assets show (a, src 38). **Callouts are not named in Ad Strength (a by omission, src 41)** - do not tell a client they raise it.

**The lift evidence is bad (c).** The "10 to 20% click-through" figure is about all extensions combined and traces back to the 2014 Google blog. The most-cited callout case study is InfoTrust's 300% claim from 6 October 2014, which changed ad copy in the same period and states no sample size. Quote the mechanism, not a number.

**Scheduling and device (a, src 47).** Dates, days, hours. **Mobile preference only** - there is no desktop-only option. Dynamic callouts cannot be scheduled at all (a, src 36).

**Do callouts and snippets compete?** They occupy the same block below the description and Google selects per auction from all eligible assets, so in practice they compete for finite space. Google publishes no rule reserving separate lines (a for the selection mechanism, src 38; c for the framing).

---

## 4. Structured snippets

**The 13 headers are unchanged as of 29 August 2026 (a, src 5):** Amenities, Brands, Courses, Degree programs, Destinations, Featured hotels, Insurance coverage, Models, Neighborhoods, Service catalog, Shows, Styles, Types.

**"Services" is not a header. It is "Service catalog."** `code/build_assets.py` currently hard-codes `("Services", [...])` at line 66, which is a bug.

**Which headers a trade can honestly use (a, src 6):**
- **Service catalog** - Google's definition: "specific offerings of a service provider, meaning services performed in exchange for money." Cannot include product features. This is the primary one.
- **Types** - variations of a product category. A legitimate second.
- **Brands** - only brands the advertiser actually offers. Banned: descriptions of brand counts, promotional modifications of brand names.
- **Neighborhoods** - sub-regions or districts within a city. **City names are explicitly banned**, which is how most trades misuse it. Skip unless you truly serve named districts.
- The other nine are irrelevant to a trade.

**Values (a).** Minimum 3 to create, 4+ recommended (src 5), **maximum 10, each 1 to 25 characters** (src 53, corroborated by Loves Data src 72). No published total character limit; Google truncates to fit.

**Display (a, src 5).** Up to 2 headers on desktop, **1 on mobile**. Google picks. Not clickable. A more granular level overrides a higher one.

**Worth building? Medium-low priority, but cheap.** Against: one header on mobile caps the ceiling at a single line of three to six words, and trades traffic is mostly mobile; not named in Ad Strength; not clickable. For: it takes ten minutes once per account, costs nothing, and one more eligible format can only help under per-auction selection. **Verdict: build one Service catalog snippet, and a Brands or Types snippet if genuinely accurate. Do not build a per-ad-group snippet matrix** - the mobile single-header cap kills the return on that effort.

**How they differ from callouts in job.** Callouts sell the value, snippets enumerate the offering. A callout is a free-form claim about you and promotional wording is fine there. A snippet value must be a noun that is a genuine instance of its header, and **promotional language in a value is a policy violation (a, src 6)** - "Free estimates" belongs in a callout and would risk disapproval as a snippet value. Never the reverse.

**Disapproval causes (a, src 5, 6):** header-value mismatch (Google names this the most likely reason), repeating a value within or across headers, cramming multiple items into one value field (enter separately; Google adds the commas), promotional text, punctuation and emoticons, brands under Types, cities under Neighborhoods.

---

## 5. Call assets

**Setup (a, src 7).** Account, campaign or ad group; most specific wins. Search and Smart campaigns, not Display. Number must be strict **E.164** - `+14165551234`, no spaces, dashes or brackets - or it is disapproved as "Unverified Phone Number". Rejected: vanity, premium-rate, fax. Accepted: toll-free, standard, mobile, shared-cost and non-standard-cost (the last two need an "additional charges may apply" disclaimer). The number must be in service in the targeted location and relate to the advertised company (a, src 16).

**Verification, three accepted proofs (a, src 7; c, CallRail):** (1) the exact E.164 number visible in the landing page source, (2) the ad's display domain verified in Search Console and linked to the Ads account, or (3) the Google Ads conversion tag on the landing page. **Correction: there is no Google documentation stating Google places test calls.** The previous file asserted this. Treat it as unverified.

**Google forwarding numbers (a, src 9).** Google-owned number swapped into the ad, routing to the real line. **39 countries.** Free. Google tries to match your area code and falls back to toll-free if the local pool is empty. You never own it, cannot port it, and it must never appear in a citation. Display window for a non-caller is roughly 30 minutes, up to 2 hours in some markets; once someone calls, that number keeps connecting for **60 days**. Search Network only.

**Call reporting (a, src 8, 11, 12).** One account-level switch. Captures start and end time, duration, received or missed, caller country and area code, source, type, campaign, ad group, keyword and the recording. Metrics are phone impressions, phone calls and phone-through rate.

**The 15-second number is misunderstood (a, src 11).** Fifteen seconds is the **privacy threshold at which Google will show you the caller's full phone number** - never in India and Japan. It has nothing to do with conversions. The previous file conflated the two.

**The conversion threshold is a separate setting (a, src 10; c for the default).** You set the minimum call length on the "Calls from ads" conversion action. The widely reported default is 60 seconds; Google's docs describe the setting without publishing a default. **No study with a stated sample links a duration threshold to booked-job rate.** For a trade, 60 seconds is the defensible floor; raise to 90 only if the CRM shows 60-to-89-second calls are not booking.

**And since 21 April 2026 this debate is largely over in the US and Canada (a, src 13).** **AI-qualified call leads**: Google AI reads the recording and decides whether the conversation showed real purchase intent, and duration becomes the fallback used only when no recording exists. Call details show an AI summary and hashtags. Both legs must be US or Canada numbers.

**Call recording defaults changed 1 July 2026 (c, ALM Corp 3 May 2026).** Accounts that never made a selection default to recording ON. Healthcare and financial services default off. Google plays an automated disclosure, which does **not** by itself discharge two-party-consent law in states like California.

**Scheduling (a, src 7).** Call assets carry their own day and hour schedule, framed by Google as "only when your business is answering phone calls", independent of the campaign ad schedule. An after-hours tap that hits voicemail is a paid click and logs as "missed".

**Call-only ads: confirmed retired (a, src 14, 15).** **February 2026** - all options to create a new call-only ad removed. **February 2027** - all existing call-only ads stop receiving impressions. **No automatic migration.** Google requires you to add the business name and phone as call assets, build or update RSAs, then remove the old call ads.

**GoHighLevel tracking number or Google forwarding number?** For a single-location trade where Google Ads is the dominant paid channel: **Google forwarding number in the ad, CRM tracking number with dynamic number insertion on the website only.** Reasons: (1) the forwarding number is the delivery mechanism for AI-qualified call leads, so a third-party number in the ad drops you to Google's third-tier fallback signal and starves Smart Bidding; (2) the forwarding number attributes to campaign, ad group and keyword free; (3) verification is not the deciding factor - a tracking number verifies fine once Search Console is linked; (4) dynamic number insertion swaps client-side and serves crawlers the real number, so it does not damage local citations. **Switch to a CRM number in the ad when** the business runs several paid channels and needs one call log, or is outside the US and Canada where AI-qualified call leads does not apply, or needs recordings, transcripts and IVR inside the CRM. If you do, **import qualified calls back as offline conversions** - a tracking number in the ad without conversion import is the configuration that quietly starves the bidding.

---

## 6. Lead form assets

**Eligibility changed 20 July 2026 (a, src 17; c for the caveat).** The **$50,000 lifetime spend gate is gone** from Google's documentation. Current requirements: good policy history, an eligible vertical, a reachable privacy policy linked in the form, first-party advertiser only (no lead resellers, a, src 18), a conversion-focused bid strategy, and optimisation toward the Google lead form conversion goal. Responsive search ads are eligible; expanded text ads are not. For Display placements and for Search ads whose headline opens the form directly you additionally need "reputable advertiser" status - over $1,000 spend per account or over $15,000 across accounts - plus completed Advertiser Verification. Digital Applied (20 July 2026) flags that this was a documentation change and the underlying eligibility engine may not have moved; check the account rather than promising a client access.

**Campaign types (a, src 17).** Search and Performance Max are documented. 84+ countries eligible, 47 ineligible; 25+ countries added in July 2026.

**Lead quality - the weakest evidence area in this dossier.** **No study with a stated sample compares lead form quality to landing page quality.** The consistent practitioner line is more leads at lower cost per lead and lower quality, because pre-fill from the signed-in Google account removes exactly the friction that filters browsers. North Country Consulting (25 June 2026) claims mobile form-fill beats equivalent landing pages by 2 to 5x, explicitly qualified as "in our experience" with no sample. A circulating "lead forms lift conversion rate 20%" figure has no traceable source - do not cite it. A usable practitioner benchmark: if the contact rate drops below 40 to 50%, lead quality has a real problem. Google's own implicit admission is the 2026 **lead intent scores** feature, described as filtering spam and low-intent submissions.

**2026 mitigations (a, ppc.land 21 May 2026; TechWyse 2 June 2026).** A **Lead Management Dashboard** inside Google Ads shows total, new, qualified and lost leads; marking a lead qualified or lost feeds Smart Bidding a quality signal so bidding optimises for stronger leads rather than more form fills. Also **lead intent scores** and lead journey mapping. The API exposes `desired_intent` on the asset with `LOW_INTENT` and `HIGH_INTENT` [F] - `HIGH_INTENT` is the lever that trades volume for quality.

**Delivery (a, src 17).** Five methods: manual CSV (last **30 days** only), email notification, webhook, the Google Ads API (up to **60 days**), and Zapier (added July 2026). **Leads are stored 60 days.** A lead that never leaves Google is gone permanently at day 60.

**The webhook contract (a, src 55).** Configure a URL plus a key. Google POSTs JSON carrying `lead_id`, `user_column_data`, `api_version`, `form_id`, `campaign_id`, `adgroup_id`, `creative_id`, `asset_group_id`, `gcl_id`, `google_key`, `is_test`, `lead_stage`, `lead_submit_time`, `lead_source`. Respond **HTTP 200 with an empty JSON object**. Validate `google_key` before processing - it is the only authenticity check. De-duplicate on `lead_id`. **4XX is non-retryable**, so a bug in your endpoint loses the lead permanently; 5XX is retried. Ignore unrecognised fields; Google warns it will add them. "Send test data" must return 200 before the form saves.

**Do they beat a landing page for a trade?** Against: trades sell on speed and trust; emergency intent converts on a call, not a form; leads die inside the Google UI without a webhook on day one; there is no landing page to show the licence number, reviews, service area and guarantee. For: non-emergency planned work where a mobile browser will not call; after-hours coverage when the phone is not answered and a call asset would be wasted; a genuinely bad landing page as a stopgap. **Run the landing page as primary and the lead form as an after-hours and non-emergency supplement**, webhook live on day one, and 1 to 2 qualifying questions maximum - three or more cuts submissions without improving quality.

---

## 7. Business name and logo

**Two gates, both required (a, src 19).** Completed Advertiser Verification, **and Search spend in the last 28 days**. No spend in 28 days and the assets stop being eligible even after verification. Google says explicitly they are not guaranteed to serve even after verification.

**Timing (a, src 23, 19).** Verification is up to 5 business days, up to 30 in rare cases; a missed assigned deadline pauses the account and cannot be extended. Uploaded name and logo assets take up to 2 business days to review. Until then the ad shows a placeholder globe plus the display URL.

**Business name (a, src 20).** **25 characters.** Must exactly match the verified domain root or the verified legal entity name, and must be clearly present on the landing page. Brand verification (src 21) is the trademark escape hatch for a trading name. No keywords - "Emergency plumber Toronto" is rejected.

**Logo (a, src 20).** Square 1:1 only, PNG or JPG, 1200x1200 recommended, 128x128 minimum, under 5120 KB, must work in light and dark mode, must be prominent on the landing page. Rendered as a circle at 28x28 by default. Disapproved: mismatched, blurry, poorly cropped, colour-inverted or distorted, a single block of colour, or absent from the landing page.

**Levels (a, src 19).** Search takes them at account level (one per account) or campaign level, campaign winning. Performance Max is campaign level and takes up to 5 logos.

**Measured effect (a, src 39, 40).** **8% more conversions at a similar cost per conversion** for advertisers showing a business logo and name with Search ads. This is the largest Google-published figure for any asset in this dossier, and it is the reason business name and logo belongs on the critical path even though it is not one of the three build-first items.

**Google's own version (a, src 34).** "Dynamic business information" is one of the nine account-level automated assets. Turn it off once you have uploaded a real name and logo.

---

## 8. Location and affiliate location assets

**Inheritance (a, src 24).** Location assets hold no data of their own. They pull address, phone, hours, photos and videos from a linked Google Business Profile through Location Manager. To fix a wrong address or phone you edit the Business Profile, not Google Ads. You can attach all locations, a subset via Location Groups, or set "No location asset" per campaign.

**Search versus Maps (a, src 24).** On Search it appends address and phone to a normal text ad. On Maps it can appear beside, above or below Maps results including in the app. The Maps surface is the real reason a trade turns it on.

**Constraints (a, src 24, 25, 26).** Phone numbers on the profile are verified against the business. A profile marked temporarily or permanently closed stops the asset serving. Business Profile edits take up to a day; practical sync is 24 to 48 hours; unverified locations never appear. Policy requires owner approval, a recognised non-closed address, and that the service is actually available there.

**Worth it for a single-location trade? Yes (c).** It is the only asset that puts a physical address and a verified phone beside the ad, which is the exact trust signal a local plumber needs against a national lead aggregator. The exception is a service-area business with a hidden address, where the asset degrades to a city label. Automated location is one of only two automated assets practitioners consistently leave ON (c, src 73, 74).

**Affiliate location assets: not for trades (a, src 27).** Manufacturers selling through retail chains, and auto dealers, in select countries. If someone recommends them for a plumber they have confused the two.

---

## 9. Image assets on Search

**Five eligibility conditions, all required (a, src 28, 29):** account open at least **60 days**, good policy compliance history, active campaigns containing text ads, **Search spend greater than $0 in the last 30 days**, and an eligible vertical. The 60-day rule is the one that bites - a new plumbing account cannot use them for two months at any spend.

**Specs (a, src 28, 29).** PNG or JPG. **1:1 required** (300x300 minimum, 1200x1200 recommended). **1.91:1 optional** (600x314 minimum, 1200x628 recommended). Under 5120 KB. Keep important content in the centre 80%. Up to 20 per campaign; Google recommends 4 or more. **Note: 4:3 is a Performance Max and Demand Gen ratio, not a Search one** - anyone quoting 4:3 here is on an old doc.

**Eight rejection categories (a, src 29, updated 9 July 2026):** text or graphic overlay, excessive blank space, collage or composite, blurry or unclear, distorted, poorly cropped, prohibited content, and spec non-compliance. Logos baked into the image count as graphic overlay. For a trade this rules out exactly what owners want to upload: the van with the phone number painted on it, a before-and-after split, a "10% OFF" graphic, a badge collage. The one 2026 carve-out is AI disclosure labels.

**The lift figure (a, src 28).** "6% increase in click-through rate on average", Google internal data, **2 to 29 April 2023**. Three and a half years old and never refreshed; the July 2026 policy consolidation published no new number. Anyone quoting a newer image lift figure is inventing it. It is a click-through figure and says nothing about cost per lead.

**Automatic images (a, src 34).** "Dynamic image assets" scrape your landing page. Turn off at account level until a real uploaded set exists, then re-test deliberately.

---

## 10. Price and promotion assets

**Price assets (a, src 30).** Minimum 3 items, 5+ recommended, up to 8 scrollable cards. **25 characters per header and 25 per description**, per item. Each item carries a price, currency, an optional qualifier (From, Up to, Average) and an optional unit (per hour, day, week, month, year), and its own final URL. Ten languages, 20+ currencies. Available at account, campaign or ad group. **Clicks on price items cost a normal click and Google charges at most two clicks per impression** - one impression can cost you double.

**API type enum, field-verified [F]:** `BRANDS`, `EVENTS`, `LOCATIONS`, `NEIGHBORHOODS`, `PRODUCT_CATEGORIES`, `PRODUCT_TIERS`, `SERVICES`, `SERVICE_CATEGORIES`, `SERVICE_TIERS`.

**Worth it for a trade? Conditionally (c).** The "From $X" qualifier is the reason: a real published call-out or diagnostic fee sets expectation and self-qualifies price shoppers out before the click. The failure mode is a fake "From $89" that becomes $600 on site - that books calls that cancel and risks the unavailable-offers policy. Build them only where a real published fee exists.

**Promotion assets (a, src 31, 32).** Monetary or percentage discount, both with an "up to" variant. Optional occasion from a fixed 40+ list, each with a Google-set date window your dates must fall inside. Optional promo code, minimum spend, promoted item, dedicated final URL. Account, campaign or ad group, more specific overriding. **Occasion-specific assets must be created or edited within 6 months of their start date or they stop serving.** The promo code field must contain a real code and nothing else - a common disapproval. The offer must be reachable at the destination under the unavailable-offers policy.

**Worth it for a trade? Yes, more than price assets (c).** Trades almost always have a real standing offer that fits: "$49 diagnostic", "$100 off water heater install". **Use the no-occasion version** so the 6-month expiry never applies. Occasions are a bad fit for a trade and create maintenance for a seasonal spike you can serve with a scheduled non-occasion promotion instead.

---

## 11. Seller ratings and automated assets

**Seller ratings (a, src 33).** Roughly 100 or more eligible reviews - Google's wording is "most merchants" and says the number varies. Reviews from the last **24 months** are used; the "100 in the last 12 months" figure circulating is a review-vendor convention, not Google's. Minimum 3.5 stars for text ads. Sources are Google Customer Reviews, 30+ approved partners, Google-led shopping research and Search user feedback. The ad's visible URL domain must match the domain the ratings are held against.

**The caveat that matters for trades (a, src 33).** **Google Business Profile reviews do not feed seller ratings.** A plumber with 400 five-star Maps reviews is still ineligible unless collecting through Google Customer Reviews or an approved partner. Do not budget time on this.

**The nine account-level automated assets (a, src 34):** dynamic sitelinks, dynamic structured snippets, automated location assets, seller ratings, dynamic callouts, dynamic business information, dynamic image assets, automated promotions, and site visits. Each is individually switchable.

**Exact path (a, src 34):** Campaigns → Assets → Associations tab → three-dot menu → Account level automated assets → three-dot → Advanced settings → pick the asset → choose a reason → Save. **Campaign-level settings override account-level, so check both.**

**Should the automated versions be off while a hand-written set exists? Yes, with two exceptions (c, two independent sources).** Phil Taylor (20 February 2025): keep seller ratings, case-by-case on automated location and dynamic images, turn off dynamic sitelinks, callouts, snippets, longer headlines and dynamic business information, because manual versions are likely better. Olivia Lawson (21 July 2024): keep seller ratings and automated location, turn off everything else - citing a florist whose automated assets surfaced funeral arrangements and a gym whose ads promoted management software.

**Google's counter-position (a, src 35).** Dynamic sitelinks "may show alongside or instead of manually created sitelinks", and Google cites up to 3.5% more conversions for campaigns at 6 sitelinks. Note what that measures: sitelink **count**, not dynamic versus manual. **No study with a stated sample compares dynamic against manual sitelinks in either direction.** The tie-breaker is the "instead of" clause - a dynamic sitelink can displace one you wrote.

**API (a, src 51).** Read automated assets with `AssetSource = AUTOMATICALLY_CREATED`. The opt-out toggle is web UI only and cannot be scripted.

---

## 12. Asset-level reporting for assets

**What exists (a, src 42, 75, 76).** Per-asset **clicks, impressions, click-through rate, cost and average cost per click**, for sitelinks, callouts and structured snippets. Asset rows also carry an eligibility status with policy details.

**The date is confirmed and it covers the full stat set, not just conversions (a, src 75, 76).** Google's help pages for both the ad-level and campaign-level responsive search ad asset reports say verbatim: "Full performance statistics is only available for dates on or after **June 5, 2025**." Clamp `segments.date` to that floor or the query returns nothing useful.

**Which resource carries which metrics (a, src 77).** `campaign_asset`, `ad_group_asset`, `customer_asset` and `asset_field_type_view` all support impressions, clicks, click-through rate, cost, average cost per click, interactions, conversions, conversion value, cost per conversion, all-conversions, view-through conversions, and the phone metrics. **The bare `asset` resource supports conversion metrics only** - no impressions, clicks or cost. `SELECT asset.id, metrics.impressions FROM asset` will not compile. This is the most common trap.

**The segment that makes the numbers mean anything (a, src 42; c, src 64, 66).** Apply the **Click type** segment - Google's own wording - to separate clicks on the asset itself from clicks on the headline. Adalysis calls the same thing "this extension vs other". Without it the clicks column counts ad clicks while the asset was attached. Portent's worked example: 41,604 apparent sitelink clicks were 307 real ones.

**The segment that actually isolates an asset click (a, src 77).** The UI segment is **Click type**. In the API the equivalent is `segments.asset_interaction_target.interaction_on_this_asset = true`. Without it an asset row's `metrics.clicks` counts clicks anywhere on the served ad, so your sitelink click-through rate is meaningless.

**Why totals do not add up (a, src 42, 75).** Google's own example: if four sitelinks appear in one impression, each row shows 1 impression but the sitelink total row shows 1, because the total excludes duplicates when several assets served together. Google's wording is that "asset-level metrics are attributed per instance of the asset served within an ad" - one ad impression showing 4 sitelinks and 3 callouts produces 8 impression rows.

**A working query (a, src 77):**

```
SELECT campaign.name, asset.id, asset.sitelink_asset.link_text,
       campaign_asset.field_type, campaign_asset.status,
       campaign_asset.primary_status, campaign_asset.primary_status_reasons,
       metrics.impressions, metrics.clicks, metrics.ctr,
       metrics.cost_micros, metrics.conversions
FROM campaign_asset
WHERE campaign_asset.field_type = 'SITELINK'
  AND segments.date BETWEEN '2025-06-05' AND '2026-08-28'
ORDER BY metrics.impressions DESC
```

Swap in `ad_group_asset` or `customer_asset` for the other levels. `asset_field_type_view` gives one row per field type per account and is the right rollup for "are my callouts pulling weight at all".

**Performance labels (a, src 78).** `AssetPerformanceLabel` still exists as an enum (`PENDING`, `LEARNING`, `LOW`, `GOOD`, `BEST`, `NOT_APPLICABLE`) but in current versions is exposed **only on `ad_group_ad_asset_view.performance_label`** - not on `campaign_asset`, `ad_group_asset` or `customer_asset`. Google deprecated the label column for responsive search ads precisely because real statistics arrived on 5 June 2025. For sitelinks, callouts and snippets, ignore labels and read the metrics.

**When a decision is meaningful.** Two floors, from different sources:
- **(b, ppc.land 25 February 2026, sourced to Google's Abby Butler)** 500+ impressions per individual asset, and 2,000+ impressions per complete ad in the Google Search Top segment over 30 days.
- **(c, practitioner)** For a swap decision specifically: at least 1,000 asset-level impressions, at least 100 asset-attributed clicks on the losing asset, and at least 14 days. Rank by asset-attributed click-through rate; use conversions only as a tiebreak, because a local service account rarely reaches 15 to 30 conversions on a single sitelink.

Never judge an asset whose `primary_status` is anything other than eligible - a limited or disapproved asset has suppressed metrics, not bad ones. This is the strongest argument against building 12 to 20 sitelinks in a small trades account: past about 8, no single asset clears the threshold.

**Where in the UI (a, src 75, 76).** Campaigns → Assets for the campaign and account view, with an "Added by" filter that separates advertiser assets from Google AI ones. Campaigns → Ads → "View asset details" for the per-ad view, covering business logo, business name, description, headline, image, sitelink and structured snippet.

---

## 13. API specifics - field-verified [F] against google-ads-python 31.0.0, 29 August 2026

**Version, and a live problem in this repo (a, src 79, 80; [F]).** The current API version is **v25**, released 22 July 2026, sunsetting August 2027. Latest minor is v25.1 (19 August 2026), which added `TEXT_DISCLAIMER = 48` to `AssetFieldType`. **v22 sunsets October 2026** and v23 in February 2027. Google releases roughly every three to four months and sunsets about a year after release.

**[F] The installed client library in this repo (google-ads-python 31.0.0) ships v21, v22, v23 and v24 only - it cannot target v25.** The repo's scripts default to v21. That is inside the sunset window. Upgrade the library and pin to the newest version it carries before the October 2026 v22 sunset, and re-check the enum then: v24 tops out at `CLASSIC_DISPLAY_IMAGE = 47` and does not have `TEXT_DISCLAIMER`, confirming the version gap [F].

**The resource model (a, src 49, 81).** `Asset` is the shareable object. `CustomerAsset`, `CampaignAsset` and `AdGroupAsset` are the links. `AssetGroupAsset` is Performance Max only. There is **no ad-level attachment** in Google Ads.

Resource name patterns (a, src 81):
- `customers/{cid}/assets/{asset_id}`
- `customers/{cid}/customerAssets/{asset_id}~{field_type}`
- `customers/{cid}/campaignAssets/{campaign_id}~{asset_id}~{field_type}`
- `customers/{cid}/adGroupAssets/{ad_group_id}~{asset_id}~{field_type}`

On every link resource, `asset` and `field_type` are required and **immutable**; only `status` is mutable. `source`, `primary_status`, `primary_status_reasons` and `primary_status_details` are output-only.

**`final_urls` lives on `Asset`, not on `SitelinkAsset` [F].** This is the single most common sitelink bug. `SitelinkAsset` carries only the text and the scheduling fields.

**There is no `LOCATION` value in `AssetFieldType` [F].** Location assets attach through asset sets - `AssetSet` plus `CampaignAssetSet` with `AssetSetType = LOCATION_SYNC` or `LOCATION` - not through `CampaignAsset`. For a local service business this is the thing most scripts get wrong.

**Link resources carry identical fields [F]:** `resource_name`, the parent (`campaign` / `ad_group` / none for customer), `asset`, `field_type`, `source`, `status`, `primary_status`, `primary_status_details`, `primary_status_reasons`.

**Asset fields [F]:** `resource_name`, `id`, `name`, `type_`, `final_urls`, `final_mobile_urls`, `tracking_url_template`, `url_custom_parameters`, `final_url_suffix`, `source`, `policy_summary`, `field_type_policy_summaries`, plus one typed sub-message per asset type.

**Typed sub-messages [F]:**
- `sitelink_asset` · `link_text`, `description1`, `description2`, `start_date`, `end_date`, `ad_schedule_targets`
- `callout_asset` · `callout_text`, `start_date`, `end_date`, `ad_schedule_targets`
- `structured_snippet_asset` · `header`, `values`
- `call_asset` · `country_code`, `phone_number`, `call_conversion_reporting_state`, `call_conversion_action`, `ad_schedule_targets`
- `lead_form_asset` · `business_name`, `call_to_action_type`, `call_to_action_description`, `headline`, `description`, `privacy_policy_url`, `post_submit_headline`, `post_submit_description`, `fields`, `custom_question_fields`, `delivery_methods`, `post_submit_call_to_action_type`, `background_image_asset`, `desired_intent`, `custom_disclosure`
- `price_asset` · `type_`, `price_qualifier`, `language_code`, `price_offerings`
- `promotion_asset` · `promotion_target`, `discount_modifier`, `redemption_start_date`, `redemption_end_date`, `occasion`, `language_code`, `start_date`, `end_date`, `ad_schedule_targets`, `terms_and_conditions_text`, `terms_and_conditions_uri`, `percent_off`, `money_amount_off`, `promotion_code`, `orders_over_amount`, `promotion_barcode_info`, `promotion_qr_code_info`
- `image_asset` · created from `data` (raw bytes)
- Business name is a plain `text_asset` linked with field type `BUSINESS_NAME`

**AssetFieldType enum, complete [F]:** `UNSPECIFIED`, `UNKNOWN`, `HEADLINE`, `DESCRIPTION`, `MANDATORY_AD_TEXT`, `MARKETING_IMAGE`, `MEDIA_BUNDLE`, `YOUTUBE_VIDEO`, `BOOK_ON_GOOGLE`, `LEAD_FORM`, `PROMOTION`, `CALLOUT`, `STRUCTURED_SNIPPET`, `SITELINK`, `MOBILE_APP`, `HOTEL_CALLOUT`, `CALL`, `PRICE`, `LONG_HEADLINE`, `BUSINESS_NAME`, `SQUARE_MARKETING_IMAGE`, `PORTRAIT_MARKETING_IMAGE`, `LOGO`, `LANDSCAPE_LOGO`, `VIDEO`, `CALL_TO_ACTION_SELECTION`, `AD_IMAGE`, `BUSINESS_LOGO`, `HOTEL_PROPERTY`, `DEMAND_GEN_CAROUSEL_CARD`, `BUSINESS_MESSAGE`, `TALL_PORTRAIT_MARKETING_IMAGE`, `RELATED_YOUTUBE_VIDEOS`.

Note both `LOGO` and `BUSINESS_LOGO` exist. Search text ads use `BUSINESS_LOGO`.

**Other enums [F]:**
- `AssetLinkStatus` · `ENABLED`, `PAUSED`, `REMOVED`
- `CallConversionReportingState` · `DISABLED`, `USE_ACCOUNT_LEVEL_CALL_CONVERSION_ACTION`, `USE_RESOURCE_LEVEL_CALL_CONVERSION_ACTION`
- `LeadFormDesiredIntent` · `LOW_INTENT`, `HIGH_INTENT`
- `PriceExtensionType` · `BRANDS`, `EVENTS`, `LOCATIONS`, `NEIGHBORHOODS`, `PRODUCT_CATEGORIES`, `PRODUCT_TIERS`, `SERVICES`, `SERVICE_CATEGORIES`, `SERVICE_TIERS`
- `LeadFormFieldUserInputType` · `FULL_NAME`, `EMAIL`, `PHONE_NUMBER`, `POSTAL_CODE`, `STREET_ADDRESS`, `CITY`, `REGION`, `COUNTRY`, `WORK_EMAIL`, `COMPANY_NAME`, `WORK_PHONE`, `JOB_TITLE` and country-specific ID types. **There is no `FIRST_NAME` or `LAST_NAME`** - the enum offers `FULL_NAME`. `code/build_assets.py` currently requests `FIRST_NAME` and `LAST_NAME`, which is a bug.

**Limits (a, src 43).** Google publishes only account-wide ceilings: 250,000 ad-group-level assets per account, 50,000 campaign-level per account, 10,000 ad-group-level per campaign. Per-type caps (20 sitelinks, 20 callouts) are UI conventions, not published limits.

**Editing, deleting, and a correction to the docs (a, src 82).** `AssetService.MutateAssets` accepts `create` and `update` with an `update_mask`, but **there is no `remove`. Assets can never be deleted.** The "working with assets" doc page saying the service only supports create is stale, and correct only for the immutable subtypes:
- **Immutable, create only:** `text_asset`, `youtube_video_asset`, `media_bundle_asset`, `call_to_action_asset`, `hotel_property_asset`.
- **Output-only in the oneof:** `image_asset` (upload with `data` bytes on create) and `location_asset`.
- **Updatable via `update_mask`:** `sitelink_asset`, `callout_asset`, `structured_snippet_asset`, `call_asset`, `price_asset`, `promotion_asset`, `lead_form_asset`, `mobile_app_asset`, `business_message_asset`, `page_feed_asset`.

So the unlink-and-recreate pattern is mandatory for text, image and video assets, and is the right pattern anyway for a clean A/B on a sitelink, because editing in place merges the statistics.

**Retire with `REMOVED`, not `PAUSED` (a, src 51).** Paused links still count toward asset limits; removed links do not. If you cycle sitelinks, pausing will eventually hit the cap.

**`DUPLICATE_ASSET` (a, src 83).** Fires when a create carries a payload byte-identical to an existing asset in the account. Text-bearing types hit it readily. For images and media bundles Google does **not** throw - it appends a unique string to the name and creates it anyway, which is how orphan assets accumulate. The correct pattern is to query existing assets first and reuse the resource name rather than relying on the error. Related: `DUPLICATE_ASSET_NAME`, `NAME_CONFLICT_FOR_ASSET_TYPE`.

**Dry run (a).** Every mutate accepts `validate_only = true`. The server runs full validation as if it would execute, including ad policy review, and commits nothing. An empty response means clean.
- **It catches:** schema and field-combination errors, missing required fields, character-limit violations, `SCHEDULES_CANNOT_OVERLAP`, the promotion oneof conflicts, `CALL_INVALID_PHONE_NUMBER` and `CALL_INVALID_COUNTRY_CODE`, and ad policy findings.
- **It does not catch:** `DESTINATION_NOT_WORKING` and other crawler-dependent URL checks, which are asynchronous and only surface later in `asset.policy_summary`; anything depending on a resource created earlier in the same batch; and downstream serving eligibility in `primary_status_reasons`. **Correction to the previous file: a dry run is not a reliable 404 check. Crawl your own sitelink URLs separately.**
- It returns no resource names, so you cannot chain off it.

**`partial_failure` (a, src 84).** Right for a flat batch of independent creates such as 20 callouts. **Wrong** whenever a later operation references an earlier one by temporary ID - the asset-then-link pattern being the obvious case. Do not combine it with `validate_only` and assume the error list is complete; validate first, then mutate.

**Errors you will actually hit.** `LINE_TOO_WIDE` (count characters before sending) · `DUPLICATE_ASSET` · `ASSET_DATA_IS_MISSING` (the oneof was never set) · `CANNOT_MODIFY_ASSET_NAME` · `FIELD_INCOMPATIBLE_WITH_ASSET_TYPE` · `CANNOT_MODIFY_AUTOMATICALLY_CREATED_ASSET` (source is `AUTOMATICALLY_CREATED`; you can only change the link status) · `CANNOT_MODIFY_ASSET_SOURCE` · `SCHEDULES_CANNOT_OVERLAP` · the call family: `CALL_INVALID_PHONE_NUMBER`, `CALL_INVALID_COUNTRY_CODE`, `CALL_DISALLOWED_NUMBER_TYPE`, `CALL_PREMIUM_RATE_NUMBER_NOT_ALLOWED`, `CALL_VANITY_PHONE_NUMBER_NOT_ALLOWED`, `CALL_INVALID_CONVERSION_ACTION`, `CALL_CUSTOMER_CONSENT_FOR_CALL_RECORDING_REQUIRED` · the promotion pair: `PROMOTION_CANNOT_SET_PERCENT_OFF_AND_MONEY_AMOUNT_OFF`, `PROMOTION_CANNOT_SET_PROMOTION_CODE_AND_ORDERS_OVER_AMOUNT` · `NAME_REQUIRED_FOR_ASSET_TYPE` (images and media bundles) · `CUSTOMER_NOT_ON_ALLOWLIST_FOR_MESSAGE_ASSETS` and its WhatsApp variant · `LEAD_FORM_MISSING_AGREEMENT` (the Lead Form Terms of Service must be accepted once in the UI; there is no API path).

---

## 14. What changed in 2025 and 2026, dated

- **20 February 2025** - asset flexibility. Up to two unpinned RSA headlines can serve in the sitelink slot, pointing at the ad's own final URL. Pinned headlines are exempt. Confirmed permanent by ppc.land on 25 February 2026.
- **27 May 2025** - automatically created assets begin upgrading into AI Max "text customization".
- **5 June 2025** - per-asset conversion data begins.
- **1 August 2025** - the unverified-phone-number policy extends from call and location assets to message assets; existing message assets had until 1 September 2025.
- **October 2025** - business message assets require verification to serve.
- **21 April 2026** - AI-qualified call leads launches in the US and Canada. Google AI reads the recording and decides intent; duration drops to fallback.
- **1 July 2026** - call recording defaults ON for accounts that never made a selection. Healthcare and financial services default off.
- **9 July 2026** - image asset eligibility tightens to accounts 60 days old with Search spend in the last 30 days; eight rejection categories consolidated; AI disclosure labels carved out of the overlay ban.
- **20 July 2026** - the $50,000 lifetime-spend gate for lead form assets is removed from Google's documentation.
- **May and June 2026** - lead intent scores, the Lead Management Dashboard and lead journey mapping ship. Marking a lead qualified or lost feeds Smart Bidding.
- **August 2026** - Local Services Ads begin folding into Performance Max with a pay-per-lead goal for select US home-services categories.
- **5 August 2026** - Google emails advertisers confirming the 1 September migration.
- **1 September 2026** - Search campaigns still on automatically created assets, or on campaign-level broad match, are auto-upgraded to AI Max, with text customization and search term matching ON by default. Upgrades expected to conclude by end of September.
- **February 2026** - no new call-only ads. **February 2027** - existing call-only ads stop serving.
- **30 October 2025** - enforcement of the message asset verification requirement begins, rolling out over roughly four weeks (src 86).
- **13 May 2026** - API v24.1 adds `CLASSIC_DISPLAY_IMAGE = 47`. **24 June 2026** - v24.2 adds `GENERATE_LANDING_PAGE_TEXT` automation and Local Services Ads info on asset groups. **22 July 2026** - v25 adds `GENERATE_ANIMATED_IMAGES_FROM_OTHER_ASSETS` and makes `synthetic_content_info` (the AI-generated-content attestation) mutable. **19 August 2026** - v25.1 adds `TEXT_DISCLAIMER = 48` (src 80).
- **From 1 September 2026 onward** expect `AUTOMATICALLY_CREATED` assets to appear in accounts nobody added them to. Any "which asset should I swap" logic must filter `asset.source = 'ADVERTISER'` or it will rank Google's copy against yours.

**Where you cannot turn generation off, constrain it (a, src 85).** `text_guidelines` accepts up to **25 term exclusions** of 30 characters each and up to **40 messaging restrictions** of 300 characters each. For a trade this is where the NEVER SAY list and competitor names go.

---

## Myths and stale advice, with the date each changed

1. **"Sitelinks lift click-through 10 to 20%."** Google's Inside AdWords blog, **24 January 2014**. No sample, no method, describes a pre-RSA page. The only live Google figure is 3.5% more conversions at 6 sitelinks.
2. **"Four sitelinks equals a 20% click-through lift."** Not on any current Google page. Legacy help-centre copy.
3. **"Callouts lifted my click-through 300%."** InfoTrust, **6 October 2014**. Ad copy changed at the same time, no sample size.
4. **"Only 4 sitelinks show on desktop and 2 on mobile."** Google's current figures are **6 and 8**. The 4/2 numbers describe pre-2020 rendering.
5. **"Sitelinks at all levels stack."** For sitelinks, campaign and ad group **override** account (changed at least by the SA360 documentation of the override values). For **callouts and snippets it is stricter**: one ad-group asset makes every higher-level one ineligible.
6. **"A headline is always a headline."** False since **20 February 2025**.
7. **"Not repeating headline text in callouts is a best practice."** It is a **policy** and it extends to sitelink text - Google disapproves the callout (src 4).
8. **"There is a Services header for structured snippets."** There is not. It is **Service catalog**.
9. **"The 15-second call reporting threshold is when a call counts as a conversion."** It is when Google shows you the caller's number. The conversion threshold is a separate setting.
10. **"Set a 60-second minimum call length and you are done."** Superseded in the US and Canada on **21 April 2026** by AI-qualified call leads.
11. **"Call recording is off unless you turn it on."** Changed **1 July 2026** for accounts with no prior selection.
12. **"Google places test calls to verify your number."** No documentation supports this. Verification is source-code crawl, Search Console domain verification, or the conversion tag.
13. **"Google will auto-migrate my call-only ads."** It will not. Manual only, and creation already ended in February 2026.
14. **"You need $50,000 lifetime spend for lead form assets."** True until **20 July 2026**.
15. **"Lead form leads are stored 30 days."** Stored **60**; only the CSV export is capped at 30.
16. **"Lead forms lift conversion rate 20%."** Unsourced vendor number.
17. **"Image assets are 1:1 and 4:3."** For Search it is **1:1 and 1.91:1**. 4:3 belongs to Performance Max and Demand Gen.
18. **"Anyone can add image assets."** Not since the **9 July 2026** consolidation: 60 days old, spend in the last 30 days, clean policy history.
19. **"Images lift click-through 6%, so add them."** Real, but Google internal data from **April 2023**, click-through only, never refreshed.
20. **"My 400 Google Maps reviews will get me stars in ads."** Business Profile reviews do not feed seller ratings.
21. **"Seller ratings need 100 reviews in the last 12 months."** Google's stated window is **24 months**.
22. **"Business name and logo are free, just add them."** Gated behind Advertiser Verification **and** Search spend in the last 28 days.
23. **"Automatically created assets is a checkbox in the Ads tab."** Renamed **text customization** and moved into AI Max in **May 2025**.
24. **"Turning off account-level automated assets kills them everywhere."** Campaign-level settings override account-level.
25. **"You can add 20 callouts per level, that is the documented limit."** Not documented. Google publishes only account-wide asset ceilings.
26. **"Affiliate location assets are for local businesses."** Manufacturers and auto dealers only.
27. **"Occasion promotions can be set and forgotten."** They stop serving 6 months after their start date unless edited.
28. **"They are called extensions."** Renamed **assets** in 2022. Anything still saying extensions is at least four years old; check its other claims too.

---

## Rules that fell out - what an assets build should enforce

**Order and scope**
1. Build the call asset, sitelinks and callouts first. Everything else waits.
2. Start Advertiser Verification on day one in parallel, because business name and logo carry Google's largest published figure (8% more conversions) and take up to 5 business days.
3. Never claim a lift number for sitelinks, callouts or snippets. Google publishes none. Cite the mechanism.
4. Attach everything at campaign level for a single-service account; account level only for genuinely universal claims; ad group level only above roughly 20 ad groups.

**Sitelinks**
5. Build exactly 6 per campaign, never fewer than 4. Two is the serving floor, 20 is a ceiling not a target.
6. Cap link text at 25 characters, target 12 to 15 so the mobile carousel does not truncate.
7. Write both description lines or neither; the API rejects one without the other. 1 to 35 characters each.
8. Link text must be unique across the whole set - reuse is a policy violation even when destinations differ.
9. Every sitelink points at a distinct live page on the ad's own domain. Never the homepage, never the ad's final URL, never two pages with substantially the same content.
10. Fetch every sitelink URL live before writing it, and re-crawl all of them at every review.
11. Use intent targets, not navigation: pricing, emergency or same-day, reviews, financing, service areas, book now. Drop About and Contact.
12. Schedule the time-bound ones - emergency to nights and weekends, book-online to business hours, seasonal with a hard end date.
13. Write every unpinned RSA headline as if it could become a clickable link, because since 20 February 2025 two of them can. Pin any headline that must never render as one.

**Callouts**
14. Hard-cap at 25 characters, target 12 to 18 so more survive truncation.
15. Build 8 to 10; below 2 nothing serves. Only about 10 can ever show and realistically 2 to 6 do.
16. Never repeat any phrase already in an RSA headline, an RSA description, a sitelink, or another callout in the same account, campaign or ad group. This is a disapproval trigger.
17. Pick one level per branch. Any ad-group callout suppresses every campaign and account callout for that ad group, so an ad-group set must be complete on its own.
18. One claim per callout, and every number traceable to `proof.md`.
19. Ban exclamation marks, leading punctuation, decorative symbols, emoji and shouted capitals.
20. Cover four angles: speed, trust, price, guarantee.

**Structured snippets**
21. Use "Service catalog", never "Services" - the latter is not a header and will fail.
22. 6 to 10 values, each a noun phrase under 25 characters. No adjectives, no prices, no offers - promotional text in a value is a policy violation.
23. One item per value field. Never comma-join; Google adds the commas.
24. Never repeat a value within a header or across headers.
25. Ship at most 2 headers for a trade. Desktop shows 2, mobile shows 1, so a per-ad-group matrix wastes the effort.
26. Cities are banned under Neighborhoods; brands you do not carry are banned under Brands.

**Call**
27. Strict E.164, no spaces. Link Search Console and verify the display domain before adding any call asset.
28. Schedule the call asset to live-answer hours only; send after-hours clicks to a page or a lead form instead.
29. Turn call reporting on at account level and set the conversion minimum to 60 seconds as the floor.
30. In the US and Canada, decide on call recording deliberately - it defaults ON since 1 July 2026 - and confirm two-party-consent compliance.
31. Use the Google forwarding number in the ad and a CRM number with dynamic insertion on the site only. If a CRM number goes in the ad, import qualified calls back as offline conversions.
32. Never put a Google forwarding number in a citation, a footer, or on a van.

**Lead form**
33. Build the webhook before the first lead lands: validate `google_key`, de-duplicate on `lead_id`, return HTTP 200 with an empty object. A 4XX loses the lead permanently.
34. Never leave leads in the Google UI - 60-day storage, 30-day CSV.
35. Cap custom questions at 1 or 2, and set `desired_intent` to `HIGH_INTENT` when quality matters more than volume.
36. Accept the Lead Form Terms of Service in the UI first, or the API returns `LEAD_FORM_MISSING_AGREEMENT`.

**Automation and safety**
37. Turn off dynamic sitelinks, dynamic callouts, dynamic structured snippets, dynamic business information and dynamic image assets once a hand-written set exists. Leave seller ratings and automated location on. Check the campaign level too, it overrides the account.
38. Open every Search campaign's AI Max panel before 1 September 2026 and decide on text customization and search term matching, because the migration turns both on by default.
39. Every link lands PAUSED. Nothing Claude writes serves without a human enabling it.
40. Dry-run every mutate with `validate_only` first for policy and schema, then crawl every sitelink URL separately - the dry run does not catch broken destinations.
41. Judge no asset before 500 impressions and no ad before 2,000; segment by Click type, or by `segments.asset_interaction_target.interaction_on_this_asset`, or the clicks column is meaningless.

**Script mechanics**
42. Put `final_urls` on the `Asset`, never inside `sitelink_asset`.
43. Attach location assets through `AssetSet` and `CampaignAssetSet`, not `CampaignAsset` - there is no `LOCATION` field type.
44. Query and reuse existing assets before creating, or you accumulate orphans you can never delete.
45. Retire an asset by setting the link status to `REMOVED`, not `PAUSED` - paused links still count toward the limit.
46. Never use `partial_failure` in a request where a link references an asset created by a temporary ID in the same request.
47. Clamp every asset reporting query to `segments.date >= '2025-06-05'` and filter `asset.source = 'ADVERTISER'`.
48. Upgrade the client library off v21 and v22 before the October 2026 sunset, then re-check the field-type enum.

---

## Four bugs this research found in the repo

1. **Line 66** hard-codes the structured snippet header as `"Services"`. That header does not exist. Must be `"Service catalog"`.
2. **The lead form field loop** requests `FIRST_NAME` and `LAST_NAME`. Neither exists in `LeadFormFieldUserInputType`; the enum offers `FULL_NAME`.
3. **The callout list is Title Case** ("Insured & Bonded", "Financing Available") while sitelinks and the RSAs are sentence case, and nothing checks the callout text against the RSA headlines and sitelink text for the repetition policy in src 4.

4. **The installed client library tops out at API v24** and the scripts default to **v21**. v22 sunsets October 2026 and v23 in February 2027. Upgrade and pin before then.

Also worth noting: the script attaches sitelinks, callouts and snippets at **ad group** level. For callouts and snippets that silently disables every campaign and account-level equivalent for that ad group, which is fine only if the ad-group set is complete.
