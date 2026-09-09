# Research dossier - setting up a new Google Ads account for a local service business, 2025-2026
Built 28 August 2026 · 66 sources read (34 Google official, 32 third party) · 31 enforceable rules
Next: use this to finish `references/account-setup.md` and tighten `.claude/commands/account-setup.md`.

Grading used throughout:
- (a) Google's own help page, policy page or developer doc, read directly
- (b) two or more reputable third parties agree, or one third party quoting Google's Ads Liaison
- (c) single source, community thread, or inferred from surrounding evidence

---

## Sources

### Google official - account, billing, settings

1. About your language, number format, time zone and currency settings · https://support.google.com/google-ads/answer/9842104 · live page 2026 · Time zone and currency "permanently set" at creation; manager accounts get one eastward time-zone reset, once.
2. About your Google Ads time zone setting · https://support.google.com/google-ads/answer/17006726 · live page 2026 · Time zone set on the billing page at signup, full or half-hour offsets, affects all time-segmented reporting; billing pages always display in Pacific time.
3. About Google Ads charges for automatic payments · https://support.google.com/google-ads/answer/2375373 · live page 2026 · Charged at the payment threshold or on the first of the month, whichever comes first; can be charged several times a month.
4. Change how often you are charged (payment threshold) · https://support.google.com/google-ads/answer/1722025 · live page 2026 · Threshold example starts at fifty dollars US and rises to two hundred or more when hit repeatedly; advertisers cannot lower it; "Edit threshold" only appears for some accounts.
5. Automatic payments · https://support.google.com/google-ads/answer/6311 · live page 2026 · Confirms threshold-or-first-of-month; raising the threshold "might not be available in all Google Ads accounts".
6. About Google Ads promotional offers · https://support.google.com/google-ads/answer/6388096 · live page 2026 · Account must be under fourteen days old at redemption; credit appears up to thirty-five days after the spend requirement is met; credit cannot count toward the spend requirement.
7. How promotional offers work with different payment settings · https://support.google.com/google-ads/answer/16915411 · live page 2026 · Sixty days to spend an earned credit; credits are lost if billing is transferred to another account; invoiced accounts must be on invoicing before redeeming.
8. About spending limits · https://support.google.com/google-ads/answer/10486637 · live page 2026 · Campaign daily spend can reach twice the average daily budget; monthly cap is daily budget times 30.4. This page is about campaigns, not an account cap.
9. About account budgets · https://support.google.com/google-ads/answer/7054229 · live page 2026 · Account budgets (formerly budget orders) exist only for monthly invoicing accounts.
10. Billing and payment suspensions · https://support.google.com/google-ads/answer/13704200 · live page 2026 · Suspension for unpaid balance, "concerns about your ability to make future payments", suspicious payment activity, chargebacks, and promo-code abuse; thirty days to verify for an appeal.
11. Google Ads account suspensions overview · https://support.google.com/google-ads/answer/9841640 · live page 2026 · Egregious violations (including Circumventing systems) suspend immediately with no warning; three-strike ladder for other repeat violations; new accounts created after a suspension are also suspended.
12. About your Google Ads account limits · https://support.google.com/google-ads/answer/6372658 · live page 2026 · Twenty negative keyword lists per account, five thousand terms per list, ten thousand negatives per campaign, ten thousand campaigns per account.
13. About account-level negative keywords · https://support.google.com/google-ads/answer/11396330 · live page 2026 · Admin then Account settings then Negative keywords; cap one thousand; broad, phrase and exact all supported; applies to Search, Performance Max, App, Shopping, Smart and Local campaigns on search and shopping inventory.
14. About negative keyword lists · https://support.google.com/google-ads/answer/2453983 · live page 2026 · Shared lists attach campaign by campaign; from August 2025 they also attach to Performance Max.
15. About auto-tagging · https://support.google.com/google-ads/answer/3095550 · live page 2026 · On by default for new accounts; required for GA4 import and offline conversion import; GA4 has no manual-tag override.
16. About applying recommendations automatically · https://support.google.com/google-ads/answer/10279006 · live page 2026 · Two bundles, "Maintain your ads" and "Grow your business"; can be switched off at any time from the Recommendations page.
17. Manage auto-apply recommendations · https://support.google.com/google-ads/answer/10276359 · live page 2026 · History tab shows which user turned each auto-apply on and when; weekly email summaries available; no manager-level "apply to all sub-accounts" switch described.
18. About optimization score · https://support.google.com/google-ads/answer/9061546 · live page 2026 · "An estimate of how well your Google Ads account is set to perform", zero to one hundred percent, moves when you apply or dismiss recommendations; not a performance measure.
19. Turn text customization on or off in Search campaigns · https://support.google.com/google-ads/answer/16738708 · live page 2026 · Automatically created assets became "text customization" inside AI Max from 27 May 2025; from September 2026 campaigns using it are upgraded to AI Max automatically; once the legacy feature is disabled it cannot be re-enabled.
20. Secure your Google Ads account: 2-Step Verification · https://support.google.com/google-ads/answer/12864186 · live page 2026 · Strongly encouraged, often required to reach support; setting lives under Admin then Access and security then Security; recovery-info changes take up to seven days to propagate.
21. Use a passkey to complete sensitive actions · https://support.google.com/google-ads/answer/16917887 · live page 2026 · Passkeys required for adding users, changing billing and account links for enforced accounts; free-mail domains (gmail, yahoo) piloted first; a new passkey takes one to two days to pair with Ads.
22. About ownership of client accounts (manager accounts) · https://support.google.com/google-ads/answer/7456532 · live page 2026 · An account created inside a manager is owned by that manager automatically; linking an existing account does not transfer ownership; client admins can always unlink.
23. About manager accounts · https://support.google.com/google-ads/answer/6139186 · live page 2026 · A manager links to accounts and administers them without owning them.
24. Link your Google Business Profile to Google Ads (Product Linking) · https://support.google.com/google-ads/answer/13450314 · live page 2026 · Assets then plus then Location, or Data Manager then Connected products; request goes to the Business Profile email for approval; unlink keeps stats.
25. About location assets · https://support.google.com/google-ads/answer/2404182 · live page 2026 · Location data comes straight from Business Profile and Maps; phone numbers verified; closed locations stop showing; Maps placement requires the link.
26. About local actions conversions · https://support.google.com/google-ads/answer/9013908 · live page 2026 · Once location assets are active and one action occurs, Google auto-creates hosted goals: Directions, Clicks to call, Website visits, Other engagements, Orders, Menu views; thirty-day click window.
27. About call reporting · https://support.google.com/google-ads/answer/2454052 · live page 2026 · Account-level setting; Google forwarding number captures duration, start time, caller number over fifteen seconds and connection status; available in forty-plus countries; numbers belong to Google and can change.
28. About data-driven attribution · https://support.google.com/google-ads/answer/6394265 · live page 2026 · DDA is the default for most conversion actions; all actions eligible regardless of volume; Google recommends two hundred conversions and two thousand interactions in thirty days for best results.
29. Updates to your enhanced conversions settings · https://support.google.com/google-ads/answer/16884284 · live page 2026 · April 2026: tags, Data Manager and API accepted simultaneously; June 2026: web and leads merge into one on/off switch; Data Processing Terms must be accepted.
30. Customer data policies · https://support.google.com/google-ads/answer/7475709 · live page 2026 · Applies to enhanced conversions for web and leads, store sales uploads, Customer Match style features; disclosure and consent required; serious or repeated violations suspend without notice.
31. About consent mode · https://support.google.com/google-ads/answer/10000067 · live page 2026 · EEA, UK and Switzerland behave differently; without it, denied-consent conversions fall back to general modelling.
32. Link Google Analytics 4 to Google Ads · https://support.google.com/analytics/answer/9379420 · live page 2026 · Editor on the GA4 property plus Admin on Ads; personalized advertising on by default; data flows within forty-eight hours.
33. Local Services Ads transition to Performance Max with pay-per-lead goals · https://support.google.com/google-ads/answer/17213585 · live page 2026 · From August 2026 US plumbing, HVAC, electrical and similar trades migrate into Google Ads; weekly budgets become daily (divided by seven); verified status carries over; name or address changes trigger a twenty-four to forty-eight hour re-review.
34. About Advanced Verification · https://support.google.com/google-ads/answer/7167635 · live page 2026 · Video call with the verification team; typically six to eight weeks; no ads on the affected searches until it passes.
35. Advanced Verification policies · https://support.google.com/google-ads/answer/7167922 · live page 2026 · Required for garage door services in the US and locksmiths in the US and Canada, both Google Ads and Local Services.
36. Advertiser verification (policy) · https://support.google.com/adspolicy/answer/9703665 · live page 2026 · Everyone eventually; triggered by suspicious behaviour, regulated verticals, brand references, feature misuse or suspension appeals; false info means loss of verification and suspension.
37. Destination requirements (policy) · https://support.google.com/adspolicy/answer/6368661 · live page 2026 · Destination mismatch = display URL domain differs from final URL, or final URL redirects to a different domain; disapproval first; at least seven days' warning before suspension.
38. Limited ad serving (policy) · https://support.google.com/adspolicy/answer/13889491 · live page 2026 · Impressions limited for "unqualified" advertisers in higher-risk scenarios; qualification weighs account maturity, policy history and verification; YouTube from September 2024, rolling out through 2026 and beyond.
39. Google Ads API security requirements · https://developers.google.com/google-ads/api/docs/oauth/security-requirements · live 2026 · 2-Step Verification required for new refresh tokens from 21 April 2026; passkeys required from 5 August 2026; existing tokens keep working.
40. Advertiser identity verification (Google Ads API) · https://developers.google.com/google-ads/api/docs/account-management/advertiser-identity-verification · live 2026 · IdentityVerificationService returns the start and complete deadlines and an action URL; requests are rate-limited.
41. Google blog, "The future of attribution is data-driven" · https://blog.google/products/ads-commerce/data-driven-attribution-new-default/ · 27 September 2021 · DDA became the default for new conversion actions from October 2021 and the data requirements were removed.

### Third party - 2024 to 2026

42. Search Engine Land, "The truth about Google Ads recommendations (and auto-apply)" · https://searchengineland.com/google-ads-recommendations-auto-apply-465909 · 10 December 2025 · Treat optimization score as a tracker not a KPI; uncheck every auto-apply box; "Reach and spend" recommendations are the riskiest.
43. Search Engine Land, "4 Google Ads settings and recommendations worth a closer look" · https://searchengineland.com/google-ads-settings-recommendations-closer-look-484156 · 3 August 2026 · Stay out of search partners and display expansion until data says otherwise; scrutinise budget recommendations.
44. Search Engine Land, "Ginny Marvin clarifies AI Max, AI Search ads..." · https://searchengineland.com/ginny-marvin-clarifies-ai-max-ai-search-ads-and-what-advertisers-should-prioritize-after-gml-479838 · 10 June 2026 · AI Max not required for AI Overviews; "Data Strength" (enhanced conversions, tag gateway, Data Manager) is the priority.
45. Search Engine Land, "Google Ads is finally building a stronger foundation for B2B lead gen" · https://searchengineland.com/google-ads-stronger-foundation-b2b-lead-gen-485288 · 19 August 2026 · From 17 August 2026 limited-budget tCPA campaigns deliver to target; Data Manager CRM connectors; offline conversion import is the lever for lead gen.
46. Karooya, PPCChat with Ginny Marvin · https://www.karooya.com/blog/ppcchat-google-ads-questions-answered-by-ginny-marvin/ · 17 December 2025 · Phrase-match negatives for single-word exclusions (Microsoft import friendly); brand inclusions and exclusions exist because close variants match competitor brands; Washington sales tax from 1 January 2026.
47. PPCChat recap with Ginny Marvin · https://officialppcchat.com/2026/01/07/all-your-2025-google-ads-questions-answered-ppc-chat-recap-with-guest-ginny-marvin-of-google-ads/ · 7 January 2026 · Negative match types unchanged; AI Max controls at ad group level; enhanced conversions via tag needed for conversion-based lists.
48. Optmyzr, "Negative keywords in Google Ads" · https://www.optmyzr.com/blog/negative-keywords/ · 27 February 2026 · Negatives ignore close variants; overblocking is the common failure; 2024 study showed accounts with exclusions had a median CPA of $21.45 vs $18.55 without, so placement matters more than volume.
49. Optmyzr, "Why you cannot blindly trust Google Ads recommendations" · https://www.optmyzr.com/blog/why-you-cannot-blindly-trust-google-ads-recommendations/ · 12 January 2023 · Auto-applied "remove redundant keywords" deleted their own brand keyword; conversions halved, CPC up 130 percent.
50. Optmyzr, "Struggling with a low Google Ads optimization score?" · https://www.optmyzr.com/blog/google-ads-optimization-score/ · 2025 · Do not chase one hundred percent; accept only recommendations that fit the goal.
51. Cypress North, "Opting out of auto-applied recommendations" · https://cypressnorth.com/paid-search-marketing/how-to-opt-out-of-auto-applied-recommendations-in-google-ads/ · 31 January 2024 · Advertisers must opt in, but often find themselves enrolled by a previous manager or an accidental click; Google changed the redundant-keyword feature in 2023 and kept people opted in.
52. GroAS, "Negative keyword list limit: what changed in 2025" · https://www.groas.com/post/google-ads-negative-keyword-list-limit-what-changed-in-2025-how-to-use-it · 14 October 2025 · Account-level one thousand; lists officially five thousand with reports of ten thousand accepted; Performance Max ten thousand per campaign from March 2025.
53. Two Squares, "Account level negative keywords: the one list to rule them all" · https://twosquares.co.uk/blog/google-ads-account-level-negative-keywords · 19 January 2026 · Reserve the one thousand slots for universal junk; never negate "service" or "review" at account level; use phrase or exact for common words.
54. Digital Applied, "Google Limited Ad Serving hits Search: who's throttled" · https://www.digitalapplied.com/blog/google-limited-ad-serving-expands-search-2026-advertiser-guide · 16 June 2026 · Search throttle from 12 June 2026, phased to 2028; account age is an explicit signal; verification is the clearest trust signal; 39.2 million accounts suspended in 2024.
55. Coinis, "Google can now throttle your Search ads for user complaints" · https://www.coinis.com/blog/google-limited-ad-serving-search-2026 · June 2026 · New and unverified accounts running generic unbranded ads are the main targets; add brand name and logo to ads and landing pages.
56. Digital Applied, "Google Ads security: stop account hijacking in 2026" · https://www.digitalapplied.com/blog/google-ads-account-security-2026-hijacking-prevention-audit · 18 June 2026 · Five-step audit: 2SV with app or key not SMS, passkeys, least privilege, MCC hygiene, alerts; one MCC drained of tens of thousands in twenty-four hours.
57. PPC Land, "Google Ads will require passkeys for sensitive actions from July 15" · https://ppc.land/google-ads-will-require-passkeys-for-sensitive-actions-from-july-15/ · 31 May 2026 · Notifications went out 8 May 2026; shared agency logins must be broken up into individual Google accounts.
58. Kampaio, "Google Ads agency account ownership" · https://www.kampaio.com/blog/google-ads-agency-account-ownership · 27 July 2026 · Exactly one owner; Standard access is "the trap level" because it cannot unlink a manager; six other assets strand separately (payments profile, tag container, GA4, audiences, Merchant Center).
59. Web Tonic, "Google Ads MCC access vs direct access" · https://www.webtonic.io/blog/google-ads-mcc-access-vs-direct-access · 21 August 2026 · Create the account yourself on your own domain, link the agency's manager at Standard, keep Admin and billing in-house.
60. Leadsie, "How to give or request access to Google Ads accounts" · https://www.leadsie.com/blog/how-to-grant-or-request-access-to-google-ad-accounts · 13 August 2026 · Five access levels; access is account-wide, never per campaign.
61. Clikim, "Google Ads billing thresholds: the trust ladder explained" · https://clikim.com/google-ads-billing-thresholds/ · 30 July 2026 · Each successful charge raises the threshold, a failed charge lowers it; never dispute a Google charge with your bank.
62. Super Bad Ads, "Are Google Ads credits really free?" · https://www.superbadads.com/learn-digital-marketing/is-google-ad-credit-really-free · 28 March 2025 · Apply the code within fourteen days, spend within sixty; the trap is launching early to "use the credit" before tracking works.
63. Practical Ecommerce, "Essential Google Ads settings for 2025" · https://www.practicalecommerce.com/essential-google-ads-settings-for-2025 · 9 February 2025 · Uncheck search partners and Display Network on Search campaigns; presence-only location targeting; brand exclusions on non-brand campaigns; campaign-specific conversion goals instead of account default.
64. Logical Position, "How local actions conversions affect Google Ads data" · https://www.logicalposition.com/blog/how-local-actions-conversions-affect-google-ads-data · 26 March 2026 · Local actions land in All conversions and default to Secondary; promote to Primary only if calls or map views are the goal.
65. Filip Steiner, "Google Ads local actions conversions" · https://filipsteiner.com/blog/google-ads-local-actions-conversions · 14 August 2026 · Directions requests correlate with visits but are not visits; keep website conversion tracking as the primary layer.
66. Uptick Marketing, "Stop dreading Google Ads verification" · https://uptickmarketing.com/learning-center/googles-new-advertiser-verification-requirement-everything-you-need-to-know/ · 25 June 2025 · Organisation plus authorised representative both verify; three to five business days; a mortgage advertiser missed the deadline and lost ads overnight; annual re-verification expected.
67. Marmak Hub, "Google Ads advertiser verification: a 2025 master guide" · https://marmakhub.com/en/google-ads-advertiser-verification-guide/ · 1 July 2025 · Triggers include changing ownership or billing on the account; thirty-day deadline to submit; three to five business days to approve.
68. Define Digital Academy, "How to set up and use call reporting" · https://www.definedigitalacademy.com/blog/use-call-reporting-in-google-ads-to-get-more-leads · 26 November 2025 · Sixty-second minimum call length as the lead threshold.
69. Reliqus, "How to set up a Google Ads account without a campaign" · https://reliqus.com/how-to-set-up-a-new-google-ads-account-without-a-campaign/ · 9 July 2024 · Exact link text: "Are you a professional marketer? Switch to Expert Mode", then "Create an account without a campaign" bottom left, then billing country, time zone, currency, Submit.
70. Arc Intermedia, "How to set a monthly spending limit in Google Ads" · https://www.arcintermedia.com/knowledge-base/digital-advertising/how-to-set-a-monthly-spending-limit-google-ads/ · 18 September 2025 · The account-level monthly spend limit sits in manager account settings; plain accounts divide monthly budget by 30.4.

Search-listed but not read in full (used only to confirm consensus): Blobr, Ajala Digital, XYZ Lab and Graphed on the Expert Mode link; Higher Images, WevTEC, FlexLeads and Local Marketing Solutions on Advanced Verification for locksmiths and garage doors; Ritner Digital, North Country and Clicknify on agency ownership; Meticulosity and Optimyzd on access levels; 3plains on billing; Growth Craft on promo codes; Enrich Labs, PushLeads, Bullseye and South Arc on Local Services setup and the October 2025 Google Verified badge; Nestscale, DataFeedWatch and PPC Samurai on DDA being the default with last click the only alternative.

---

## Findings by area

### 1. Creating the account without a campaign

- (b) The signup flow steers new users into Smart Mode and a Smart campaign with a budget before anything is built. The escape link reads "Are you a professional marketer? Switch to Expert Mode", small and near the bottom. After switching, "Create an account without a campaign" appears bottom-left. Sources 69, plus Blobr, Ajala, XYZ Lab.
- (b) Smart Mode to Expert Mode is one-way. You cannot go back. Source: Blobr, Graphed.
- (a) The very next screen is the billing page where country, time zone and currency are chosen. This is the permanent-decision screen. Sources 2, 69.
- (b) A payment method is required to activate, but nothing spends until a campaign is created and enabled. Source: Ajala, XYZ Lab.

### 2. Permanent settings

- (a) Time zone: "permanently set when you set up your account", cannot be updated on a serving account. Manager accounts get one reset, eastward only. Source 1, 2.
- (a) Currency: "permanently set", no exceptions at all. Source 1.
- (a) Time zone governs every time-segmented report and ad schedule. Billing pages ignore it and always show Pacific time. Source 2.
- (a) Moving to a new account to fix either one means historical data does not move. Source 2.
- (c) Practical corollary: pick the time zone of the city the business serves, not where the owner or agency sits, because ad schedules and day-of-week reports are read by the business.

### 3. Billing, thresholds, credits, caps

- (a) Automatic payments charge at the payment threshold or on the first of the month, whichever comes first, and can fire several times a month. Sources 3, 5.
- (a) The threshold starts low (Google's example is fifty dollars US) and climbs when hit repeatedly (two hundred or more). You cannot lower it. "Edit threshold" only appears on some accounts and only raises it. Source 4.
- (b) The threshold is a trust ladder, not a spend cap. Failed charges walk it back down. Sources 61, 3plains.
- (a) Chargebacks against a legitimate Google charge suspend the account. Sources 10, 11.
- (a) Promo credit eligibility: account under fourteen days old at redemption, valid payment method, no prior Google Ads for the same business. Credit arrives up to thirty-five days after the spend requirement, applies only to future spend, and cannot be used to satisfy the requirement. Source 6.
- (a) Sixty days to spend an earned credit. Credit is lost if billing is transferred. Source 7.
- (b) The trap is launching early or over-spending to "use the credit". Treat it as a modest discount on spend you were doing anyway. Source 62.
- (a) Account budgets (a hard cap across campaigns) exist only for monthly invoicing accounts. Source 9.
- (c) Some accounts see "Manage spend limit" under Billing then Summary, and manager accounts can set a monthly account spend limit that pauses everything at the cap and resets on the first. Availability varies by account and country. Sources 70, 7ten, CtrlB. Grade (c) because Google's own spending-limits page describes only campaign-level limits.
- (a) Without an account cap, the real ceiling is the sum of campaign daily budgets times 30.4, with any single day allowed to hit twice the daily budget. Source 8.
- (b) Sales-managed accounts may be required to pay by ACH rather than card, and there is no opt-out of that segment designation. Source 46.
- (a) Washington State sales tax on digital advertising from 1 January 2026; exemptions filed under Billing. Sources 46, 47.

### 4. Ownership, access, manager accounts

- (a) An account created inside a manager account is owned by that manager automatically. Linking an existing account does not transfer ownership. Client-side Admins can always unlink a manager. Source 22.
- (b) Only Admin can remove a manager. Standard is "the trap level": it can edit everything but cannot unlink. Sources 58, 59, 60.
- (b) Standard advice for a business hiring help: create the account yourself on your own Google account, link the agency's manager at Standard, keep Admin and billing in-house. Sources 58, 59.
- (b) Assets that strand separately on a bad exit: payments profile, tag or GTM container, GA4 property, remarketing audiences, Merchant Center. Own all of them on the business's Google account. Source 58.
- (a) Five access levels: Admin, Standard, Read-only, Billing, Email-only. Access is account-wide, never per campaign. Source 60 and Leadsie, Meticulosity.
- (a) A manager account is what the Google Ads API needs for a developer token; a plain account cannot apply. Existing `references/google-ads-setup.md`, plus source 39.

### 5. Security

- (a) 2-Step Verification: strongly encouraged, not enforced on the UI; frequently required to reach support. Setting under Admin then Access and security then Security. Source 20.
- (a) The Google Ads API requires 2SV for any new refresh token from 21 April 2026, and passkeys from 5 August 2026. Existing tokens keep working. Source 39.
- (a) Passkeys for sensitive actions (adding users, billing changes, account-link changes) are enforced for notified accounts; free-mail domains piloted first; a new passkey takes one to two days to pair with Ads. Source 21.
- (b) Enforcement date for sensitive actions was 15 July 2026 with notices sent 8 May 2026; shared agency logins must be split into individual accounts. Sources 57, 56.
- (b) Use an authenticator app or hardware key, not SMS. Audit users quarterly and remove departed staff. Source 56.
- (b) Google reported 39.2 million advertiser accounts suspended in 2024, up 209 percent on 2023. Source 54.

### 6. Verification

- (a) Advertiser verification is rolling out to everyone; triggers include regulated verticals, brand references in ads, suspicious behaviour, ownership or billing changes, and suspension appeals. False information means loss of verification and suspension. Sources 36, 67.
- (b) Timeline: thirty days to start once notified, then thirty days to complete; miss it and ads pause. Review takes three to five business days. Sources 66, 67, Marmak, YoYoFu, WebOptech.
- (a) The API exposes both deadlines and an action URL via IdentityVerificationService. Source 40.
- (b) Organisations verify the business (registration, tax document) and an authorised representative verifies with government ID. Annual re-verification expected. Source 66.
- (a) Advanced Verification is required for garage door services in the US and locksmiths in the US and Canada, on both Google Ads and Local Services. Includes a video call, typically six to eight weeks, and no ads on those searches until it passes. Sources 34, 35.
- (b) Health care verticals cannot run pre-badge Local Services ads either. Source: Optymizer, Local Marketing Solutions.
- (a) Local Services Ads for US home services trades are migrating into Google Ads as Performance Max with pay-per-lead goals from August 2026; verified status carries over; a name or address change triggers a twenty-four to forty-eight hour re-review. Source 33.
- (b) October 2025: Google Guaranteed and Google Screened badges replaced by a single Google Verified check; the money-back guarantee ended 7 November 2025. Sources: Enrich Labs, PushLeads.

### 7. Links: Business Profile, GA4, Search Console, Merchant Center, Tag Manager

- (a) Business Profile link: Assets then plus then Location, or Data Manager then Connected products. The request emails the Business Profile owner for approval. Unlinking keeps stats. Sources 24, 25.
- (a) The link is what makes location assets and Maps placement possible; location data is pulled straight from Business Profile; closed locations stop showing. Source 25.
- (a) Once location assets are active and one action occurs, Google auto-creates hosted "local actions" goals: Directions, Clicks to call, Website visits, Other engagements, plus Orders and Menu views for eligible verticals. Source 26.
- (b) These land as Secondary by default and sit in All conversions; check anyway, and promote only if calls or map actions are the true goal. Sources 64, 65.
- (a) GA4 link: Editor on the property plus Admin on Ads; personalized advertising is on by default; data appears within forty-eight hours. Source 32.
- (a) Auto-tagging is on by default and is what GA4 import and offline import depend on. Source 15.
- (b) Search Console link enables the paid-and-organic report; Merchant Center link is only needed for Shopping or Performance Max with a feed; Tag Manager is a deployment choice, not a link. Sources: Analyzify, One Scales, MBADV.

### 8. Conversion setup at account level

- (a) DDA is the default for most conversion actions with no data threshold. Source 28, 41.
- (b) Only DDA and last click remain selectable; first click, linear, time decay and position-based were retired. Sources: Nestscale, DataFeedWatch, Mavlers.
- (a) Enhanced conversions requires accepting the Data Processing Terms; from June 2026 web and leads are one switch; from April 2026 tags, Data Manager and API feed at once. Source 29.
- (a) Customer data policies: disclose sharing, get consent where required, no sensitive-category conversions; serious violations suspend without notice. Source 30.
- (a) Consent mode matters for EEA, UK and Switzerland traffic; without it denied-consent conversions are modelled generically. Source 31.
- (b) Campaign conversion goals should be set per campaign, not left on "account default", once more than one goal exists. Source 63.
- (a) Call reporting is an account-level switch; a Google forwarding number captures duration, start time and caller number for calls over fifteen seconds; numbers belong to Google and can change. Source 27.
- (b) Sixty seconds is the common minimum call length for a lead conversion. Source 68.
- (b) Ginny Marvin, June 2026: "Data Strength" (enhanced conversions, tag gateway, Data Manager) is what advertisers should prioritise. Source 44.
- (a) From 17 August 2026 limited-budget tCPA campaigns deliver to target instead of overperforming it. Source 45.

### 9. The nine switches

- (a) Auto-apply recommendations: two bundles, "Maintain your ads" and "Grow your business"; switch off from the Recommendations page; History tab shows who turned any on and when. Sources 16, 17.
- (b) Auto-apply is opt-in, but accounts routinely turn up enrolled via a previous manager, an accidental click, or a Google feature change that kept people opted in. Check it, do not assume. Source 51.
- (b) The riskiest categories are "Reach and spend" (budget raises, broad match, search partners, display expansion). Source 42, 43.
- (b) Real damage on record: auto-applied "remove redundant keywords" deleted Optmyzr's brand keyword, conversions halved, CPC up 130 percent. Source 49.
- (a) Optimization score is an estimate that moves when you apply or dismiss suggestions. It is not performance. Source 18, 42.
- (a) Automatically created assets became "text customization" inside AI Max on 27 May 2025; campaigns with it on are auto-upgraded to AI Max in September 2026; disable the legacy feature and it cannot be re-enabled. Turn it off per campaign under AI Max then Asset optimization. Source 19.
- (b) Search partners and Display Network are ticked by default on a new Search campaign; untick both. Presence-only location targeting instead of "presence or interest". Sources 63, 43, Growth Minded, Linear.

### 10. Negatives at account level

- (a) Account-level negatives: Admin then Account settings then Negative keywords; cap one thousand; broad, phrase and exact; apply to Search, Performance Max, App, Shopping, Smart and Local campaigns on search and shopping inventory. Source 13.
- (a) Shared lists: twenty per account, five thousand per list, attached campaign by campaign; Performance Max accepts them since August 2025. Sources 12, 14.
- (b) Reports of ten thousand accepted per list in late 2025; official line still five thousand. Source 52.
- (a) Negative keywords do not match close variants, plurals or synonyms. Sources 48, 47.
- (b) Ginny Marvin's stated best practice: phrase match for single-word negatives (also imports cleanly to Microsoft Ads). Source 46.
- (b) What must not go at account level: any brand term you bid on, competitor names if a conquest campaign exists or is planned, high-intent modifiers (near me, cost, price, affordable, best, hire, emergency), and blunt common words like "service" or "review". Sources 53, 48, existing `universal-negative-keywords.md` section F.
- (b) Optmyzr's 2024 data: accounts using exclusions had a worse median CPA than those without, which they read as overblocking. Keep the account list to universal junk. Source 48.
- (b) Brand inclusions and exclusions (brand lists in the shared library) are the tool for stopping close variants matching competitor brands, not account negatives. Source 46, 63.

### 11. Policy pitfalls that kill new accounts

- (a) Circumventing systems is an egregious violation: immediate suspension, no warning, and any new account you create afterwards is suspended too. Source 11.
- (a) Billing suspensions: unpaid balance, doubts about future payments (declined cards), suspicious payment activity, chargebacks, promo-code abuse. Thirty days to verify for an appeal. Source 10.
- (a) Destination mismatch (display URL domain not matching final URL, or a redirect to another domain) gets a disapproval and at least seven days' warning before any suspension. Source 37.
- (b) Common new-account suspension patterns in 2025 community threads: brand-new account plus a prepaid or virtual card, a mismatch between the payments profile name and the verified business, and a second account opened to dodge a first. Sources: SF Digital, Google Ads Community threads.
- (b) Business name and logo must be present on the landing page (business operations verification checks this). Source: Oyova.

### 12. The new-account throttle

- (a) Limited ad serving restricts impressions for advertisers Google has not yet qualified; account maturity, policy history and verification status are explicit inputs. Started on YouTube September 2024, rolling out through 2026 and beyond. Source 38.
- (b) It reached Search on 12 June 2026, phased through 2028; new accounts face a trust-building period regardless of compliance; generic unbranded ads and ads naming other brands are the top triggers; verification is the fastest way out. Sources 54, 55.
- (c) The older folk claim that "every new account is throttled for two weeks" is not documented anywhere; what is documented is the qualification system above. Expect low impression share for the first weeks and treat verification, clear branding and consistent payment as the fix.

### 13. What the Google Ads API needs on day one

- (a) A manager account (the API Center only appears there), a developer token application, a Google Cloud project with the Ads API enabled, an OAuth consent screen, and a refresh token generated under a user with 2SV and, from 5 August 2026, a passkey. Existing `references/google-ads-setup.md` plus source 39.
- (a) Developer tokens inactive between January and June 2026 do not receive legacy API access for enhanced conversions for leads uploads. Source 29.
- (a) Account-level negatives are `CustomerNegativeCriterion`; verification state is `IdentityVerificationService`. Sources 40, existing reference.

### 14. What changed 2024 to 2026 (dated)

- September 2024 · Limited ad serving begins on YouTube. Source 38.
- 27 May 2025 · Automatically created assets renamed text customization and moved into AI Max. Source 19.
- June and July 2025 · Verification deadlines hit finance and Local Services advertisers. Source 66.
- August 2025 · Negative keyword lists attach to Performance Max; PMax negatives raised to ten thousand in March 2025. Sources 14, 52.
- October 2025 · Google Guaranteed and Google Screened replaced by Google Verified; guarantee ended 7 November 2025. Sources: Enrich Labs, PushLeads.
- 1 January 2026 · Washington State sales tax on ad spend. Source 46.
- 21 April 2026 · API requires 2SV for new refresh tokens. Source 39.
- April 2026 · Enhanced conversions accepts tags, Data Manager and API at once. Source 29.
- June 2026 · Enhanced conversions web and leads become one switch. Source 29.
- 12 June 2026 · Limited ad serving extends to Search. Source 54.
- 15 July 2026 · Passkeys required for sensitive UI actions on enforced accounts. Source 57.
- 5 August 2026 · API requires passkeys. Source 39.
- August 2026 · Local Services Ads begin migrating into Google Ads as Performance Max pay-per-lead for US home services. Source 33.
- 17 August 2026 · Limited-budget tCPA campaigns deliver to target. Source 45.
- September 2026 · Campaigns with text customization on are auto-upgraded to AI Max. Source 19.

---

## Myths and stale advice, with dates

- "Apply a shared negative list to the whole account." Wrong since account-level negatives shipped (2022). Shared lists attach per campaign; the account list is a separate setting under Account settings. Source 13, 14.
- "Time zone can be changed once." Only for manager accounts, only eastward, only once. Serving accounts: never. Source 1.
- "DDA needs three hundred conversions." That threshold was removed in October 2021. Source 41.
- "Choose position-based or time decay." Retired; only DDA and last click remain. Sources: Nestscale, DataFeedWatch.
- "Turn off auto-created assets in account settings." Renamed text customization on 27 May 2025 and now lives inside AI Max per campaign. Source 19.
- "Google Guaranteed badge." Replaced by Google Verified in October 2025; the guarantee itself ended 7 November 2025. Sources: Enrich Labs, PushLeads.
- "Promo credit lands instantly." Up to thirty-five days after the spend requirement, and only if the account was under fourteen days old when redeemed. Source 6.
- "You can set an account budget cap on any account." Account budgets are monthly-invoicing only; card accounts get campaign daily budgets and, in some accounts, a spend-limit toggle. Sources 9, 70.
- "Auto-apply is on by default for new accounts." It is opt-in, but enrolment by a previous manager, a stray click, or a Google feature change is common enough that you must check. Source 51.
- "A destination mismatch suspends you instantly." Disapproval first, then at least seven days' warning. Source 37.
- "2FA is optional for API users." Required from 21 April 2026; passkeys from 5 August 2026. Source 39.
- "Every new account is throttled for exactly two weeks." Undocumented. What exists is limited ad serving with account age as one signal. Sources 38, 54.
- "Negative keyword lists max out at five thousand." Official line, but ten thousand was being accepted in late 2025; do not build a process on the overage. Source 52.
- "Verification is only for finance and pharma." Everyone eventually; locksmiths and garage doors need Advanced Verification with a video call. Sources 35, 36.
- "Local actions goals inflate your primary conversions." They default to Secondary; verify rather than assume. Source 64.

---

## Rules an account-setup command should enforce

1. (b) Escape Smart Mode before anything else: "Switch to Expert Mode" then "Create an account without a campaign". No campaign is created on setup day.
2. (a) Time zone and currency are read back aloud and confirmed before Submit; both are permanent on a serving account.
3. (c) Time zone is the business's service-area time zone, not the agency's.
4. (a) Currency matches the currency the business banks in; mismatches cannot be fixed later.
5. (b) The account is created under the business owner's Google account on the business domain, never inside an agency manager account.
6. (a) The owner holds Admin; helpers get Standard via a manager link; nobody gets Billing unless they pay the bills.
7. (a) 2-Step Verification on for every user, authenticator app or key rather than SMS; a passkey created before day one so it has paired before any user or billing change.
8. (a) One stable card in the business's legal name; no prepaid or virtual cards; never charge back a Google invoice.
9. (a) Payment threshold is read and recorded; the command explains it is a trust ladder, not a cap.
10. (a) Promo code applied only if the account is under fourteen days old; the budget is set from the plan, not from the credit.
11. (c) If Billing then Summary shows "Manage spend limit", set it to the monthly ceiling; otherwise the ceiling is the sum of daily budgets times 30.4.
12. (a) Auto-tagging confirmed on.
13. (a) Both auto-apply bundles unchecked, and the History tab checked for any prior enrolment.
14. (a) Text customization off in every Search campaign built later, and the legacy automatically created assets setting off at account level if still visible.
15. (b) Optimization score is recorded as a number and ignored as a target.
16. (a) Enhanced conversions on, Data Processing Terms accepted, and consent mode noted if any EEA, UK or Swiss traffic exists.
17. (a) Call reporting on at account level; a sixty-second call conversion created as a primary lead action.
18. (a) Business Profile linked and approved from the Business Profile owner's inbox; local actions goals checked and left Secondary unless calls or directions are the goal.
19. (a) GA4 linked with Admin on Ads and Editor on GA4; Search Console linked; Merchant Center skipped unless there is a product feed.
20. (a) Every conversion action left on data-driven attribution.
21. (a) Universal negatives go in Admin then Account settings then Negative keywords, not a shared list; cap one thousand.
22. (b) Single-word negatives are phrase match; multi-word are phrase; exact only for one precise query.
23. (b) The account list never contains the business's own brand, competitor names while a conquest campaign exists or is planned, or high-intent modifiers such as near me, cost, price, affordable, best, hire, emergency.
24. (b) Blunt common words such as service, review, repair, install stay out of the account list.
25. (a) Advertiser verification is started the day the notice arrives; the thirty-plus-thirty-day clocks are logged.
26. (a) Locksmith (US, Canada) and garage door (US) businesses budget six to eight weeks for Advanced Verification before any spend is expected.
27. (a) Display URL domain equals final URL domain; no cross-domain redirects; business name and logo visible on the landing page.
28. (a) One account per business; a suspended account is appealed, never replaced.
29. (b) Search partners and Display Network are unticked on every Search campaign built later; location targeting is presence-only.
30. (b) Brand exclusions and inclusions are handled with brand lists, not negatives.
31. (a) The ten-digit customer ID, the manager ID, time zone, currency and threshold are written to `.env` and CLAUDE.md the moment they exist.
32. (a) Nothing runs until the read-back summary is produced and approved: time zone, currency, auto-tagging, both auto-apply bundles, text customization, conversions, links, negatives, users, 2SV, verification status.
