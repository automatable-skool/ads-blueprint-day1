# Research dossier - Google Ads conversion tracking and audiences for lead-gen and local service businesses, 2025-2026
Built 28 August 2026 · 76 sources read (39 Google official, 37 practitioner) · findings graded (a) Google official, (b) practitioner with data or multiple corroborating sources, (c) single-source opinion or carried-forward knowledge, [V] vendor selling the thing
Next: turn "Rules that fell out" into `references/conversion-tracking.md` (draft at ref-conversion-tracking.md alongside this file).

Research method: WebSearch budget for the session ran out part-way, so the second half of the sources were fetched by direct URL. Every source below was opened and read, except the six marked "snippet only" which came from search summaries. Two sub-searches (Enhanced Conversions and consent detail, GA4 and verification detail) were covered by direct fetches of the official pages instead.

---

## Sources

### Google official - help centre and API docs

1. About enhanced conversions for leads · https://support.google.com/google-ads/answer/15713840 · 2026 (rolling) · unified setting from April 2026, June 15 2026 Data Manager cutover, hashed email and phone, "include gclid whenever possible"
2. Local Services Ads transition to Performance Max with pay-per-lead goals · https://support.google.com/google-ads/answer/17213585 · 2026 · August 2026 US migration starts, late 2026 service-area businesses, 2027 non-US, leads move to Goals then Conversions then Leads
3. Upload click conversions (API) · https://developers.google.com/google-ads/api/docs/conversions/upload-clicks · v25, 2026 · gclid, gbraid, wbraid, conversion_date_time format, order_id, user_identifiers, June 15 2026 rule for new developer tokens
4. Enhanced conversions for leads (API) · https://developers.google.com/google-ads/api/docs/conversions/enhanced-conversions/leads · v25, 2026 · one identifier type per UserIdentifier, max 5, SHA-256 after normalisation, June 15 2026 cutover
5. Create conversion actions (API) · https://developers.google.com/google-ads/api/docs/conversions/create-conversion-actions · v25 · type is immutable, counting_type default MANY_PER_CLICK, value settings rules for call types, phone_call_duration_seconds only on call types
6. Conversion goals overview (API) · https://developers.google.com/google-ads/api/docs/conversions/goals/overview · v25 · primary_for_goal replaces include_in_conversions_metric, ConversionGoalCampaignConfig customer vs campaign level
7. Conversion value rules (API) · https://developers.google.com/google-ads/api/docs/conversions/conversion-value-rules · v25 · ADD, MULTIPLY 0.5 to 10x, SET; audience, device, geo conditions; campaign rule sets beat customer rule sets
8. Customer Match get started (API) · https://developers.google.com/google-ads/api/docs/remarketing/audience-segments/customer-match/get-started · v25 · eligibility, 5,000 member recommendation, 10,000 per request, 100,000 hard cap, membership_life_span 0 to 540, infinite removed 7 April 2025
9. Deprecation and sunset (API) · https://developers.google.com/google-ads/api/docs/sunset-dates · 2026 · v25 is current, v23 and v24 still listed
10. Release notes (API) · https://developers.google.com/google-ads/api/docs/release-notes · v25.1 released 19 August 2026, v25 on 22 July 2026 (unified goals schema), v24.2 on 24 June 2026 (LSA in Performance Max)
11. Google Ads API v20 sunset reminder · https://ads-developers.googleblog.com/2026/04/google-ads-api-v20-sunset-reminder.html · April 2026 · v20 sunset 10 June 2026
12. Google Ads API v21 sunset reminder · https://ads-developers.googleblog.com/2026/06/google-ads-api-v21-sunset-reminder.html · June 2026 · v21 sunset 5 August 2026, monthly release cadence from 2026
13. Data Manager API overview · https://developers.google.com/data-manager/api · 2026 · one ingestion endpoint for audiences and conversion events across Ads, GA4, DV360, CM360, SA360, Ad Manager
14. Data Manager events:ingest reference · https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest · 2026 · 2,000 events per request, validateOnly, gclid/gbraid/wbraid plus hashed user data, per-event consent
15. Set up tracking for calls to a number on a website · https://support.google.com/google-ads/answer/6095883 · rolling · forwarding-number swap via phone snippet, one number per page with the default tag, up to an hour before ads are enabled, GTM standard tag not compatible with international formats
16. About call reporting · https://support.google.com/google-ads/answer/2454052 · rolling · the list of countries with Google forwarding numbers, caller number shown only for calls over 15 seconds
17. About phone call conversion tracking · https://support.google.com/google-ads/answer/6100664 · rolling · the five call-tracking methods
18. Understanding reported calls · https://support.google.com/google-ads/answer/9846715 · rolling · 15-second reporting threshold is distinct from the conversion minimum length
19. Manage call reporting · https://support.google.com/google-ads/answer/9141717 · rolling · account-level toggle, call recording eligibility page, turning it off removes the call signal from Smart Bidding
20. How your data segments work · https://support.google.com/google-ads/answer/2472738 · rolling · 100 active users in 30 days on every network, 30-day default and 540-day maximum membership, lists inactive 540 days close
21. About conversion windows · https://support.google.com/google-ads/answer/3123169 · rolling · click-through default 30 days, 1 to 90 range, view-through 1 day, engaged-view 3 days
22. About engaged-view conversions · https://support.google.com/google-ads/answer/10048752 · rolling · 10 seconds watched
23. About conversion counting options · https://support.google.com/google-ads/answer/3438531 · rolling · one vs every, which categories default to which
24. About primary and secondary conversion actions · https://support.google.com/google-ads/answer/11461796 · rolling · secondary is observation only unless inside a custom goal
25. About Smart Bidding · https://support.google.com/google-ads/answer/7065882 · rolling · evaluate over periods with at least 30 conversions, 50 for Target ROAS
26. About Target CPA bidding · https://support.google.com/google-ads/answer/6268632 · rolling · 30 conversions in 30 days to evaluate, works without history, bidding system change from 17 August 2026
27. About Maximize conversions · https://support.google.com/google-ads/answer/7381968 · rolling · June 2026 rename: "Maximize conversions with a target CPA" becomes "Target CPA"
28. About data-driven attribution · https://support.google.com/google-ads/answer/6394265 · rolling · default model, 200 conversions and 2,000 interactions in 30 days recommended, works below that
29. About attribution models · https://support.google.com/google-ads/answer/6259715 · rolling · only last-click and data-driven remain
30. About auto-tagging · https://support.google.com/google-ads/answer/3095550 · rolling · on by default for new accounts, needed for GA4 import and all-browser tracking
31. Auto-tagging definition · https://support.google.com/google-ads/answer/1752125 · rolling
32. GCLID definition · https://support.google.com/google-ads/answer/9744275 · rolling · case sensitive
33. Set up your web conversions · https://support.google.com/google-ads/answer/16560108 · 2025-2026 · new creation flow: category, source (Google tag or GA4), URL-based vs code-based vs GTM
34. Set up tracking for website actions (Google tag) · https://support.google.com/google-ads/answer/6331304 · rolling
35. Check conversion action status · https://support.google.com/google-ads/answer/1722021 · 2025-2026 · the five statuses: Active, Needs attention, Misconfigured, Awaiting conversions (no conversions in 7 days), Removed
36. Offline conversion imports and enhanced conversions diagnostics · https://support.google.com/google-ads/answer/2998031 · rolling · diagnostics report for missing or badly formatted user data
37. Import conversions from clicks · https://support.google.com/google-ads/answer/7012522 · rolling · wait 4 to 6 hours after creating the action before uploading, Sheets and cloud sources import up to 90 days back, Salesforce and HubSpot 14 days, gclid is case sensitive
38. About Customer Match · https://support.google.com/google-ads/answer/6299717 · rolling · policy and payment history, 90 days plus $50,000 USD lifetime spend for targeting and manual bid adjustments, 100 members updated in 540 days, Data Manager now recommended
39. Consent mode overview · https://support.google.com/google-ads/answer/10000067 · rolling · basic vs advanced, cookieless pings, no banner supplied
40. Consent mode developer guide · https://developers.google.com/tag-platform/security/guides/consent · rolling · the four parameters, default denied, update command
41. About enhanced conversions for web · https://support.google.com/google-ads/answer/9888656 · rolling · SHA-256 after normalisation, E.164 phones, strip gmail dots
42. Import GA4 key events into Google Ads · https://support.google.com/analytics/answer/10632359 · rolling · needs link plus auto-tagging, imports land as secondary to avoid double counting
43. Conversion Linker (GTM) · https://support.google.com/tagmanager/answer/7549390 · rolling · _gcl_aw and _gcl_gs cookies, not needed when a Google tag already loads on every page
44. Form Submission trigger (GTM) · https://support.google.com/tagmanager/answer/7679217 · rolling · needs a native submit event, Wait for Tags, Check Validation
45. Personalised advertising and remarketing policy · https://support.google.com/adspolicy/answer/143465 · rolling · privacy policy disclosure required, no PII in segments, EU user consent policy
46. Local Services Ads reports · https://support.google.com/localservices/answer/6226265 · rolling · charged leads by call, message, booking; mark as booked in US and Canada

### Practitioners, press and vendors

47. Search Engine Land - Google simplifies enhanced conversions into a single switch · https://searchengineland.com/google-ads-simplifies-enhanced-conversions-into-a-single-switch-474101 · 10 April 2026 · one toggle from June 2026, automatic migration if data terms already accepted
48. Search Engine Land - sunset details for 4 attribution models · https://searchengineland.com/google-confirms-sunset-details-for-4-attribution-models-in-ads-and-analytics-433352 · 2023 · announced April, creation blocked June, migrated to data-driven October 2023, under 3 percent adoption
49. Search Engine Journal - Google removing 4 attribution models · https://www.searchenginejournal.com/google-is-removing-4-attribution-models-for-advertisers/484264/ · 2023 · corroboration
50. Search Engine Land - Customer Match minimums in Search drop to 100 · https://searchengineland.com/google-slashes-customer-match-list-minimums-in-search-campaigns-to-100-users-455912 · 23 May 2025
51. PPC Land - audience thresholds to 100 users across all networks · https://ppc.land/google-slashes-audience-targeting-thresholds-to-100-users-across-all-networks/ · 17 December 2024 · rollout timeline, Data Manager API launch December 2024, 540-day cap February 2025
52. Search Engine Land - similar audiences going away · https://searchengineland.com/google-is-getting-rid-of-similar-audiences-segments-389234 · December 2022 · May 2023 stop, August 2023 removed
53. WordStream - Google sunsetting similar audiences · https://www.wordstream.com/blog/ws/2022/12/13/google-sunsetting-similar-audiences · 13 December 2022
54. Search Engine Journal - Optmyzr Q1 2026 report · https://www.searchenginejournal.com/optmyzr-report-finds-google-ads-engagement-rising-while-efficiency-holds/573718/ · 4 May 2026 · 21,000+ accounts, lead-gen ROAS 248 to 267 percent, CPA up slightly, CTR up nearly 20 percent [V]
55. Optmyzr - value-based bidding guide · https://www.optmyzr.com/blog/value-based-bidding-guide/ · 16 July 2026 · values by lead stage, "Smart Bidding optimises toward whatever value you feed it" [V]
56. Optmyzr - enhanced conversions for leads · https://www.optmyzr.com/blog/enhanced-conversions-google-ads/ · 24 February 2022 · why ECL removed the CRM-side gclid requirement [V]
57. Optmyzr - list of available audits · http://help.optmyzr.com/en/articles/3075410-list-of-available-audits · snippet only · over-counting, under-counting and last-click audits exist as checks [V]
58. Adalysis - top 10 conversion tracking mistakes · https://www.adalysis.com/blog/the-top-10-google-ads-conversion-tracking-mistakes · 28 July 2021 · one vs every for lead gen, 30 to 60 second call threshold, consistent windows [V]
59. Simo Ahava - Consent Mode v2 for Google tags · https://www.simoahava.com/analytics/consent-mode-v2-google-tags/ · 16 January 2024, updated 7 March 2024 · ad_user_data and ad_personalization, audiences crippled without them
60. Analytics Mania (Julius Fedorovicius) - Google Ads conversion tracking with GTM · https://www.analyticsmania.com/post/google-ads-conversion-tracking-with-google-tag-manager/ · updated 11 August 2026 · Google tag on Initialization, thank-you vs custom event, uncheck "automatically detect user-provided data", April 2025 GTM changes
61. MeasureSchool - Google Ads conversion tracking · https://measureschool.com/google-ads-conversion-tracking/ · 23 October 2024 · conversion linker warning, thank-you URL vs dataLayer event
62. farsiight - offline conversion tracking in 2026 · https://www.farsiight.com/resources/offline-conversions-google-ads/ · 2026 · gclid-only is legacy, one action per funnel stage, new actions start secondary
63. ALM Corp - unified enhanced conversions settings · https://almcorp.com/blog/google-unified-enhanced-conversions-settings/ · 10 April 2026 · inventory actions and consent flows before June
64. Groas - GA4 April 2026 update and Google Ads tracking · https://www.groas.com/post/ga4-update-april-2026-what-changed-google-ads-conversion-tracking-fix · 5 May 2026 · generate_lead now needs value and currency to count as a key event, 24 to 48 hours after re-linking
65. Envision Clicks - what contractors must do before August 2026 · https://envisionclicks.com/google-ads-just-changed-conversion-tracking-again-heres-what-contractors-need-to-do-before-august-2026/ · 22 July 2026 · single global toggle, legacy upload sunset
66. SD Marketing Pros - Google Ads tracking changes 2026 · https://sdmarketingpros.com/google-ads-tracking-changes-2026/ · 15 June 2026 · consent now controlled by ad_storage in site code, one case with tracked conversions down about 90 percent after a consent change
67. Relevant Audience - enhanced conversions 2026 setup · https://www.relevantaudience.com/google-ads-en/google-ads-enhanced-conversions-2026-update/ · 22 April 2026 · account-level vs action-level toggle paths
68. MB Advertising - conversion tracking and attribution 2026 · https://www.mbadv.agency/google-ads/conversion-tracking-and-attribution · June 2026 · client-side captures about 65 percent, server-side up to 97 percent, EC median lift 5 percent Search and 17 percent YouTube (citing Google Ads Help 2025), Salesforce direct integration retired 31 May 2025, consent mode v2 required since 6 March 2024, spend-tier recommendations
69. Optimyzee - conversion tracking in 2026 · https://www.optimyzee.com/blog/google-ads-conversion-tracking-2026 · 17 March 2026 · claims 30 to 50 percent of conversions missed by standard tracking, EC recovers 5 to 30 percent, consent modelling 15 to 25 percent (unsourced)
70. Consultevo - GoHighLevel Google Ads offline conversions · https://consultevo.com/gohighlevel-google-ads-offline-conversions/ · 2025 · Settings then Integrations, event mapping by pipeline stage, tag, appointment status, call duration
71. MD Niamul - offline conversion tracking with GoHighLevel · https://mdniamul.com/blog/how-to-set-up-google-ads-offline-conversion-tracking-using-gohighlevel-crm/ · 13 January 2026 · hidden GCLID custom field, JavaScript listener plus localStorage, workflow on "Won", 24-hour buffer, 90-day window
72. Automate to Grow - GoHighLevel plus Google Ads · https://automatetogrow.com/blog/gohighlevel-google-ads-integration/ · undated · three approaches ranked, GHL numbers as call assets, UTM to contact fields
73. Lev Brovtsev - GoHighLevel Google Ads conversion tracking · https://levbrovtsev.com/articles/gohighlevel-google-ads-conversion-tracking/ · undated · "booked appointment" as the earliest stage that predicts revenue, weekly CSV reconciliation, gclids vanish on contact merges
74. Search Engine Roundtable - Google Ads gains LSA phone call leads · https://www.seroundtable.com/google-ads-gains-local-service-ads-phone-call-leads-40323.html · 28 October 2025 · Google auto-created an LSA phone call conversion action in Google Ads
75. Ignite Visibility - Local Services Ads in 2026 · https://ignitevisibility.com/google-local-services-ads-using/ · 29 July 2026 · Google Verified badge since 20 October 2025, LSA Performance Max stays on Search and Maps only, automated spam-call credits within 72 hours, CPL ranges
76. WolfPack Advising - LSA vs Google Ads · https://wolfpackadvising.com/blog/local-service-ads-vs-google-ads/ · 14 July 2026 · 2026 benchmark about $53 per LSA lead, trades $25 to $80

---

## Findings by area

### 1. Tag setup - Google tag, GTM, gtag.js, auto-tagging, click IDs

- The Google tag (gtag.js based, ID starts AW-) is the current base install; the old goog_report_conversion snippet still works but is legacy. (a) #34
- Auto-tagging is on by default for new accounts and appends gclid to every ad click. It is required for GA4 import, all-browser tracking and every offline import. (a) #30
- gclid is case sensitive. Uploads with a lower-cased or trimmed gclid silently match nothing. (a) #32 #37
- gbraid appears on web-to-iOS-app clicks, wbraid on iOS-app-to-web clicks. Google says send gclid and gbraid together where both exist. ONE_PER_CLICK actions and custom variables cannot be combined with gbraid or wbraid. (a) #3 #5
- The Conversion Linker stores the click ID in first-party cookies _gcl_aw and _gcl_gs. It is not needed when a Google tag already loads on every page. (a) #43
- Since April 2025, a GTM container holding a Google Ads conversion tag auto-loads the Google tag first, and the old "user-provided data" variable was replaced by the User-Provided Data Event tag. Old EC setups built the old way can stop sending hashed data. (b) #60
- Running a hand-pasted gtag snippet and a GTM container with the same conversion on one page is the most common cause of double counting. (b) #60 #61
- In GTM, load the Google tag on "Initialization - All Pages" and uncheck "Automatically detect user-provided data" so only the fields you choose are sent. (b) #60

### 2. Conversion actions - primary vs secondary, counting, attribution, windows, categories

- Primary actions feed the Conversions column and Smart Bidding. Secondary actions are observation only and sit in All conversions, unless they are put inside a custom goal, in which case they bid. (a) #24
- The API field is primary_for_goal; include_in_conversions_metric is read-only now. Set it explicitly on every action. (a) #6
- Counting: "One" per click for lead gen, "Every" for purchases. Google defaults website and imported actions to Every; calls from ads and website calls default to One. The API default is MANY_PER_CLICK, so a script that does not set counting_type gets Every. (a) #23 #5
- Attribution: data-driven is the default and last-click is the only alternative. First-click, linear, time-decay and position-based were blocked for new actions in June 2023 and migrated in October 2023 (adoption was under 3 percent). The API throws CANNOT_SET_RULE_BASED_ATTRIBUTION_MODELS. (a) #28 #29 #48 #49
- Data-driven works at any volume but Google recommends 200 conversions and 2,000 ad interactions in 30 days for a robust model. (a) #28
- Click-through window default 30 days, range 1 to 90 in the UI; view-through 1 day default; engaged-view 3 days default and counts after 10 seconds of a video ad. (a) #21 #22
- The API narrows some ranges by type: view-through cannot be set on call actions; phone_call_duration_seconds only on AD_CALL and WEBSITE_CALL; always_use_default_value must be true on call actions; type is immutable after creation. (a) #5
- Categories for lead gen are chosen at creation (Submit lead form, Contact, Book appointment, Request quote, Phone call lead). The new flow picks category first, then source (Google tag vs GA4), then URL-based vs code-based vs GTM. (a) #33
- Conversion goals are configured at customer level by default; once a campaign customises its goals it stops inheriting account-level changes. (a) #6
- Value rules can ADD, MULTIPLY (0.5x to 10x) or SET a value by audience, device or location; campaign rule sets override customer rule sets. (a) #7

### 3. Form submits - thank-you page vs event

- Thank-you page view is the simplest trigger and the one Google's own flow calls "URL-based", but it counts every visit to that URL: direct, refresh, bookmark, crawler. (b) #60 #61
- GTM's Form Submission trigger needs a real DOM submit event. AJAX and React or Vue forms, GoHighLevel embeds, Typeform and Calendly iframes never fire it. The fix is a dataLayer.push from the form's success callback and a Custom Event trigger. (a for the trigger, b for the workaround) #44 #60
- Practitioner consensus 2024-2026: event trigger where the vendor exposes a success callback, thank-you URL as the fallback, never both on the same action. (b) #60 #61
- The thank-you page needs noindex and must be out of the sitemap or the count fills with organic and crawler hits. (b) #60, repo standard-pages.md

### 4. Phone calls

- Five methods: calls from ads (call assets, call-only ads, location assets), calls to a number on the website via forwarding-number swap, clicks on a number on a mobile site, call-ad clicks without a forwarding number (Google estimates), and imported call conversions. (a) #17
- Website call tracking swaps your number for a Google forwarding number via a phone snippet after the Google tag; one number per page with the default tag; up to an hour before it starts serving; the GTM standard tag does not handle international formats. (a) #15
- Google forwarding numbers exist in about 30 countries including Canada, the US, the UK, Australia, Ireland, Germany, France, Spain, Italy, India, Brazil and Mexico. The live list changes; re-read #16 rather than caching it. (a) #16
- The caller's number is only shown for calls over 15 seconds. That is a reporting threshold, not the conversion minimum. (a) #16 #18
- The conversion minimum call length is advertiser-set. The 60-second default is widely reported and is what the repo scripts use, but the official pages read in this pass did not print the number. Read it back from the account rather than assume it. (c, verify live) #15 #17
- Adalysis and most agencies recommend 30 to 60 seconds as the threshold; the repo standard is 60. (b) #58
- Calls from ads and website calls default to One per click. (a) #23
- Turning call reporting off at account level removes the call signal from Smart Bidding. (a) #19
- Call recording is a separate eligibility setting and two-party consent law applies in many places; never switch it on silently. (a for the setting, c for the legal note) #19
- Local Services Ads: Google auto-created an LSA phone call conversion action in Google Ads in October 2025; from August 2026 US LSA accounts migrate to Performance Max with pay-per-lead goals, leads appear under Goals then Conversions then Leads, weekly budgets become daily averages, manual bidding goes away, historical LSA reports do not transfer (screenshot them). Non-US accounts migrate in 2027. (a) #2 #74
- LSA badge: Google Guaranteed and Google Screened became Google Verified on 20 October 2025. Spam and robocalls get auto-credited within 72 hours. (b) #75
- LSA cost per lead benchmark 2026: about $53 average, trades $25 to $80. (b)[V] #76

### 5. Enhanced Conversions

- Web: capture email, phone, name or address at conversion, normalise (lowercase, trim, E.164 phone, strip gmail dots), SHA-256, send with the conversion. Matched against signed-in Google accounts. (a) #41
- Leads: same hashed data captured at the form, then the offline outcome is uploaded keyed on the hashed email or phone plus gclid where available. Google still says include the gclid whenever possible. (a) #1 #4
- One identifier type per UserIdentifier object, up to five per conversion; never hash country, state, city or postcode. (a) #4
- Lift: Google's own pages read here carried no number. MB Advertising cites Google Ads Help 2025 for a median lift of 5 percent on Search and 17 percent on YouTube; Google's EC for leads page shows a "26 percent boost" case study with no method. The old SOP's "about 5 percent" line matches the Search figure. (b for the 5 percent, c for 26 percent) #68 #1
- April 2026: Google accepts user-provided data from tags, Data Manager and API at the same time. June 2026: EC for web and EC for leads became one toggle at Goals then Settings, with an opt-out per action. Existing users who accepted the customer data terms migrated automatically. (a) #1 #47 #63 #67
- The account-level flag is readable from the API (customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled) but the toggle itself is UI only. (a, matches repo script note) #5

### 6. Offline import - CRM to Google

- Paths: Google Sheets scheduled import, cloud storage, Zapier, HubSpot and Salesforce connectors (Salesforce direct retired 31 May 2025), GoHighLevel native integration, or the API. (a) #37 #68
- Wait 4 to 6 hours after creating an upload action before the first upload, or reporting slips by two days. Sheets and cloud sources pull up to 90 days back; Salesforce, HubSpot and database sources 14 days. (a) #37
- conversion_date_time must be "yyyy-mm-dd HH:mm:ss+|-HH:mm" with the offset. Use order_id to make re-uploads idempotent. Populate consent. (a) #3
- Hard date: from 15 June 2026, UploadClickConversions fails for any developer token with no prior upload history. New builds go to the Data Manager API (events:ingest, 2,000 events per request, validateOnly for dry runs). Existing tokens keep working for now. (a) #3 #4 #14
- Google now calls gclid-only import "legacy" and recommends Enhanced Conversions for Leads. (a via #1, b via #62)
- GoHighLevel: the native Google Ads integration lives at Settings then Integrations and maps pipeline stage, opportunity status, tag added, appointment status and call duration to conversion actions. gclid is captured into a hidden custom field via a small listener plus localStorage; calls and chat need a cookie-based fallback workflow. Allow 24 hours before expecting data. gclids vanish on contact merges and multi-step funnels, so test those paths. (b) #70 #71 #72 #73
- Practitioner rule for the stage to send: the earliest stage that predicts revenue at your volume, which for most local businesses is "booked appointment", with "won" added when volume supports it. (b) #73 #62
- Reconcile the API feed against a weekly CSV export; webhooks drop silently. (c) #73

### 7. Consent mode v2

- Four parameters: ad_storage, analytics_storage, ad_user_data, ad_personalization. Default denied, update on banner interaction. (a) #40
- Required for EEA and UK traffic since March 2024 (Simo: enforcement window March 2024; MB: 6 March 2024) regardless of where the business is. Without ad_user_data and ad_personalization granted, audience building and remarketing stop; conversion tracking keeps firing but loses modelling. (b) #59 #68
- Basic mode blocks tags until consent (no signal at all on refusal); advanced mode sends cookieless pings and lets Google model conversions. (a) #39
- June 2026: Google moved the control from the GA "Google signals" setting to the ad_storage signal in site code and removed a fallback that covered broken consent setups; one reported case lost about 90 percent of tracked conversions after a similar change. (c, single agency source) #66
- Canada and the US have no Google-enforced consent requirement today, but any site with EEA or UK visitors is in scope, and a CMP is the practical way to send the signals. (b) #59 #66
- Remarketing also needs a privacy policy that discloses it, and no PII in any segment. (a) #45

### 8. GA4 linking and importing key events

- Importing GA4 key events needs the link plus auto-tagging. Imported actions land as secondary specifically so they do not double-bid against an existing Google Ads tag on the same form. (a) #42
- April 2026 GA4 change: generate_lead needs value and currency to count as a key event; purchase needs a unique transaction_id within 24 hours. Re-link and allow 24 to 48 hours. (c, single source) #64
- Practitioner rule: one primary per real-world event. Google Ads tag primary, GA4 import secondary, or the reverse, never both primary. (b) #60 #42

### 9. Verification and status

- The status vocabulary is now Active, Needs attention, Misconfigured (tag broken, nothing recording), Awaiting conversions (nothing in 7 days), Removed. Older labels "Unverified", "No recent conversions", "Tag inactive" appear in older guides. (a) #35
- Tag Assistant (tagassistant.google.com) and GTM preview are the verification tools; a conversion shows in Google Ads within about 24 hours, most within 3 hours. (a) #60 #61
- Enhanced conversions have their own diagnostics report for badly formatted or missing user data. (a) #36
- Playwright can assert the conversion request to googleadservices.com or googletagmanager.com with the send_to label, which is what the repo's old SOP did. (c, repo)

### 10. Smart Bidding data needs and mistraining

- Google: evaluate any Smart Bidding strategy over a period with at least 30 conversions (50 for Target ROAS). Target CPA works with no history, but the recommendation uses the last 30 days adjusted for conversion delay. (a) #25 #26
- Practitioner shorthand: about 30 conversions a month before a target, about 50 with real values before Target ROAS. Matches the repo's graduation plan. (b) repo tracking.md, #55
- 17 August 2026: Google changed the bidding system and warned of temporary fluctuations on Target CPA campaigns. June 2026: "Maximize conversions with a target CPA" was renamed "Target CPA". (a) #26 #27
- Bad tracking mistrains bidding in three ways: counting Every on a form (refreshes inflate), a primary on a soft action (page view, short call), and double counting across tag plus GA4 import. Optmyzr: "Smart Bidding optimises toward whatever value you feed it, quickly and relentlessly." (b) #55 #58
- Client-side tags capture roughly 65 percent of real conversions per MB Advertising; other agency figures range 50 to 70 percent. Treat as directional. (c)[V] #68 #69

### 11. Value-based bidding for leads

- Assign a static value per action by stage: form or call at a base value, booked appointment higher, won highest, all derived from average job value times close rate. Google's conversion value rules can then scale by location or audience. (b) #55 #62 #7
- Do not start on Target ROAS for leads until values are real (from the CRM) and there are about 50 valued conversions a month. (b) #25 #55
- Revisit values quarterly; the most common failure is a value nobody has updated. (b)[V] #55

### 12. Audiences - remarketing, warm pixel, Customer Match

- Every network now needs 100 active users in 30 days (Search used to be 1,000). Rolled out quietly from May 2024, standardised December 2024, press caught Search Customer Match in May 2025. (a) #20 #50 #51
- Membership default 30 days, maximum 540. Infinite Customer Match lifespan was removed 7 April 2025. Lists unused for 540 days close. (a) #20 #8
- Google recommends 5,000+ members for a Customer Match list to actually serve; 100 is the eligibility floor. (a) #8
- Customer Match targeting and manual bid adjustments need 90 days of history and $50,000 USD lifetime spend; observation use needs only good policy and payment history. First-party data only. Data Manager API is the recommended upload path now; the Google Ads API path uses OfflineUserDataJobService (10,000 per request recommended, 100,000 cap, run within 5 days). (a) #38 #8
- Similar audiences were removed in August 2023; use optimised targeting or audience expansion instead. (a) #52 #53
- Observation vs targeting on Search: observation reports and allows bid adjustments without restricting reach; targeting restricts the ad group to the list. Smart Bidding ignores manual audience bid adjustments. (c, carried forward, not re-verified against a live page this pass)
- The "warm pixel" all-visitors audience: rule "URL contains domain", 540 days, attached as observation. The API errors INVALID_TAG_FOR_PERSONALIZED_ADS and USER_LIST_NOT_ELIGIBLE mean personalised ads is off in Admin then Preferences, or the Customer Match policy has not been accepted. (c, repo SOP)

### 13. Data lags

- Web conversions usually appear within 3 hours, all within 24. Imported conversions appear after the next scheduled import plus processing, so 24 to 48 hours is normal. New upload actions need 4 to 6 hours before the first upload. GA4 imports 24 to 48 hours after linking. (a) #37 #42, (b) #60 #64
- Conversions report by click date by default, so last week's numbers keep rising for the length of the window. (a) #21

### 14. Google Ads API

- v25 is current (v25.1 on 19 August 2026), monthly cadence since 2026, v20 sunset 10 June 2026, v21 sunset 5 August 2026. (a) #9 #10 #11 #12
- Services: ConversionActionService (create and update), ConversionUploadService (UploadClickConversions, UploadCallConversions; new tokens blocked from 15 June 2026), UserListService (RuleBasedUserList with flexible rules; CrmBasedUserList), OfflineUserDataJobService (Customer Match), ConversionValueRuleService, ConversionGoalCampaignConfig. (a) #5 #3 #8 #7 #6
- Data Manager API: audiencemembers:ingest and events:ingest, OAuth scope https://www.googleapis.com/auth/datamanager. (a) #13 #14

---

## Myths and stale advice, with the date they went stale

- "Pick first-click or position-based to see the funnel" - gone June to October 2023. (a)
- "Last-click is the default" - data-driven has been the default since 2023. (a)
- "Search remarketing needs 1,000 users" - 100 since December 2024 to May 2025. (a)
- "Similar audiences" - removed August 2023. (a)
- "Set list membership to unlimited" - 540-day cap, infinite removed 7 April 2025. (a)
- "Enhanced Conversions for web and for leads are separate features you choose between" - one toggle since June 2026. (a)
- "Just upload gclids from the CRM" - Google calls gclid-only legacy; hashed email or phone plus gclid is the recommended path since 2026. (a)
- "Build a fresh UploadClickConversions integration" - blocked for new developer tokens from 15 June 2026; use Data Manager. (a)
- "Consent mode is a GA4 thing" - required for Google Ads audiences and modelling on EEA and UK traffic since March 2024. (b)
- "Install gtag and GTM both, to be safe" - double counts, and worse since GTM auto-loads the Google tag (April 2025). (b)
- "The status will say Unverified then Recording conversions" - the vocabulary is Active, Needs attention, Misconfigured, Awaiting conversions, Removed. (a)
- "Enhanced Conversions add about 5 percent so skip them on day one" (the old SOP) - true for Search median but Google made the toggle account-wide and automatic in June 2026, so there is no setup cost left to avoid. (b)
- "Google Guaranteed badge" - it is Google Verified since 20 October 2025. (b)
- "LSA is a separate dashboard" - US accounts migrate into Google Ads Performance Max from August 2026. (a)
- "GA4 conversions" - called key events since 2024; the mechanism is unchanged. (c on the date)
- "Maximize conversions with a target CPA" - renamed Target CPA in June 2026. (a)

---

## Rules that fell out - what a tracking command should enforce

1. Exactly three primaries for a local service business: form submit, call from ads over the minimum length, call from the website over the minimum length. Everything else secondary. (b)
2. Every primary is tied to money. Page views, scrolls, short calls and form starts are never primary. (a)
3. Counting is One per click on every lead action. Set counting_type explicitly; the API default is Every. (a)
4. Attribution is data-driven on every action; the command never offers the retired models. (a)
5. Click-through window 30 days on all actions and identical across them; view-through left at 1 day; never set view-through on call actions. (a)
6. Auto-tagging on, verified by reading customer.auto_tagging_enabled back. (a)
7. One tag path per site: GTM or the Google tag, never both, and one conversion tag per real-world event. (b)
8. The Google tag loads on every page including the thank-you page; Conversion Linker only when there is no Google tag on every page. (a)
9. Form conversion fires from the form's success event where the form exposes one; thank-you URL is the fallback, and it is noindex, out of the sitemap, and never reachable from navigation. (b)
10. Never both the event trigger and the thank-you URL on the same action. (b)
11. Minimum call length is read back from the account after creation, not assumed; the repo default is 60 seconds and the acceptable band is 30 to 60. (c on the default, b on the band)
12. Call reporting on at account level before creating any call action; the command warns that turning it off later blanks the call signal. (a)
13. Check the business country is on the forwarding-number list before promising website call tracking; the list is re-read live, never cached. (a)
14. Call recording is never enabled by the command; it is flagged as a legal decision. (a)
15. Enhanced conversions on at account level (one toggle since June 2026); the form sends hashed email and phone, normalised before hashing, and the command checks the flag via the API. (a)
16. Offline import is a stage that predicts revenue (booked appointment first, won second), uploaded with gclid plus hashed email or phone, keyed on order_id, sent with consent fields. (b)
17. New offline pipelines built after 15 June 2026 target the Data Manager API; the command checks whether the developer token has upload history before touching UploadClickConversions. (a)
18. Wait 4 to 6 hours after creating an upload action before the first upload; expect imported conversions 24 to 48 hours later. (a)
19. gclid is stored exactly as received (case sensitive) in a hidden field plus localStorage, and tested through multi-step and calendar-first paths and contact merges. (a) (b)
20. GA4 key events imported into Google Ads stay secondary when a Google Ads tag already covers the same event. One primary per real event. (a)
21. Any site with EEA or UK visitors runs consent mode v2 in advanced mode through a CMP, default denied, before any audience is built. (b)
22. Privacy policy discloses remarketing and conversion tracking before any data segment is created. (a)
23. Verification is a real test submission and a real test call seen in Tag Assistant or a network assertion, then the action status read back; "Awaiting conversions" for more than 7 days after launch is a finding. (a)
24. New actions start secondary and are promoted to primary only after the first verified conversions land. (b)
25. No Target CPA before about 30 conversions a month; no Target ROAS before about 50 valued conversions a month. Recorded as a graduation plan, not acted on. (a) (b)
26. Values by stage are set once real CRM numbers exist, from average job value times close rate, and revisited quarterly. (b)
27. The warm-pixel audience is all visitors, 540 days, attached as observation only; never targeting on a Search ad group. (c on observation semantics, a on the 540 cap)
28. Audience lists are not called "ready" under 100 active users, and not expected to perform under about 5,000 for Customer Match. (a)
29. Never propose similar audiences or unlimited membership. (a)
30. Secondary actions never go inside a custom goal used for bidding unless the owner has explicitly said so. (a)
31. The account read-back at the end lists every action with type, category, primary flag, counting, window, and status, plus auto-tagging, enhanced conversions, call reporting and consent state, so the owner can screenshot it. (repo convention)
32. Any LSA account is checked for the auto-created LSA phone call action so it is not double counted against the ads call action, and US accounts are warned to screenshot LSA history before the August 2026 migration. (a)
33. Time zone and currency are confirmed before any action is created, because conversion values inherit the account currency and both are permanent. (a, repo)
