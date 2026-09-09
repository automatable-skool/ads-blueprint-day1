# Conversion tracking - what the account must measure before a dollar is spent
Written August 2026, revised 1 September 2026 · one primary per real lead path, everything else secondary · 33 rules the `/landing-page` command enforces

Strategy companion: `references/lead-counting-playbook.md` - which signal is primary at which stage of the account's life, interim through CRM-fed. This file is the setup mechanics.
Next: run `/landing-page`, then send one real test lead and one real test call before any campaign leaves PAUSED.

Grades on every claim. **(a)** Google documentation or API reference. **(b)** Practitioner with data or two or more sources agreeing. **(c)** Single source or carried-forward convention, verify live. **[V]** Published by a company selling the thing.

The one idea: Smart Bidding learns from primary conversions and nothing else. Every rule below exists to keep the primaries honest. Optmyzr (2026, [V]): "Smart Bidding will optimise toward whatever value you feed it, and it does that quickly and relentlessly."

---

## The setup order - do these in sequence, each one is checked before the next

1. **Account basics.** Time zone and currency confirmed (both permanent). Auto-tagging on (a). Call reporting on at account level (a). Enhanced conversions on at Goals then Settings, one toggle since June 2026 (a).
2. **The tag.** One path only: the Google tag on every page, or GTM with the Google tag on "Initialization - All Pages". Never both (b). Conversion Linker only if there is no Google tag on every page (a).
3. **The thank-you page.** Exists at `/thank-you`, noindex, out of the sitemap, no navigation. See standard-pages.md. Without it, form tracking falls back to click triggers that break silently.
4. **Conversion actions.** Created by `code/setup_conversion_tracking.py`, read back by `code/check_conversion_setup.py`. The plan is in the next section.
5. **Calls.** Call asset on the ads, phone snippet on the site number, minimum call length read back from the account. Call reporting ON and call recording ON, with Google's recorded-call announcement and the owner's confirmation.
6. **Consent.** Any site with visitors in the EEA or UK gets consent mode v2 through a consent banner before any audience is built (b).
7. **Verify in Tag Assistant.** Connect the live page at https://tagassistant.google.com/, then fire every lead path the page has - submit the form, tap the number, book a slot - and read the tag list back: Google tag fired, Conversion Linker present, one request per action with the right label, and no duplicate request. Then read the action status back from the account. **Close with the TRACKING VERIFIED block** - one dated block naming what fired, written into CLAUDE.md "## My setup" under the page's URL. That block is the finish line; without it in My setup, tracking is unverified no matter what the chat said.
8. **Audiences.** The warm-pixel audience via `code/setup_warm_pixel_audience.py`, observation only.
9. **Offline import.** Only once leads are flowing and the CRM stage that predicts revenue is agreed.
10. **Graduation plan.** Recorded in CLAUDE.md under "## My setup", not acted on.

---

## The conversion action plan for a service business

**One primary per real lead path, tied to money, training Smart Bidding. Three of them:**

- Lead form submit · type Webpage · category Submit lead form · counts One per click · data-driven · 30-day click window
- Phone call from ads over the minimum length · type Calls from ads · category Phone call lead · One per click · 30-day window
- Phone call from the website over the minimum length · type Calls from website · category Phone call lead · One per click · 30-day window

**A calendar booking on the thank-you page is never a conversion action** (Jono's ruling, 1 September 2026): everyone who reaches that page already fired the form conversion, so a booking tag counts one lead twice - the exact double-count rule 2 below bans. Bookings live in GHL, and the booked-appointment stage reaches Google through the offline import, where a stage is worth sending at all. Do not exceed one primary per lead path - a fourth primary means something soft got promoted.

**Secondaries, observation only, never inside a bidding goal:**

- Form view · Webpage · Page view
- Scroll 90 percent · Webpage · Other
- Phone call, any length · Calls from ads · shows the short calls the primary hides

**Why these settings (a unless marked):**

- **One per click.** A refresh of the thank-you page or a second call from the same click is not a second lead. Google defaults website and imported actions to Every, and the API default is Every, so the script sets it explicitly.
- **Data-driven attribution.** The default since 2023 and the only model beside last-click. First-click, linear, time-decay and position-based were retired in October 2023; the API rejects them.
- **30-day click window on every action.** Google's default, range 1 to 90. Identical windows across actions so bidding compares like with like (b, Adalysis). View-through stays at 1 day and cannot be set on call actions.
- **Primary flag set explicitly.** The API field is `primary_for_goal`; the old "include in conversions" box is read-only now.
- **New actions start secondary** and are promoted after the first verified conversions land (b, farsiight 2026). The three above are the exception because the plan is known.
- **Values.** Left at zero until real CRM numbers exist. See "Values by stage" below.

**Conversion goals.** Actions are configured at account level. The moment a campaign customises its goals it stops inheriting account changes (a), so `/campaign-plan` leaves goals on the account default.

---

## Forms - event first, thank-you page second

- **Where the form exposes a success callback** (the `/landing-page` forms do), the conversion fires from that event: a dataLayer push and a Custom Event trigger in GTM, or a direct gtag event call (b).
- **The thank-you URL is the fallback**, not a second trigger. Both on one action double counts (b).
- **GTM's Form Submission trigger needs a real browser submit event.** AJAX forms, React or Vue forms, GoHighLevel embeds, Typeform and Calendly iframes never fire it (a for the mechanism, b for the list). An embedded GoHighLevel calendar is the clearest case: wire the booking conversion to GHL's appointment-booked webhook or the confirmation redirect, never to a click on the iframe.
- **The thank-you page is noindex, out of the sitemap, and unreachable from navigation.** A thank-you URL that ranks or gets bookmarked fills the count with non-leads (b).
- **The form payload carries gclid, keyword and source** into the CRM. gclid is case sensitive and stored exactly as received (a). Test the ugly paths: multi-step funnels, calendar-first bookings, and contact merges, which is where gclids vanish (b, Brovtsev).

---

## Calls

**Five ways Google can count a call (a):** calls from ads (call assets, call-only ads, location assets); calls to a number on the website via a Google forwarding number; clicks on a number on a mobile page; call-ad clicks without a forwarding number (Google estimates); imported call conversions from a call tracker or CRM.

- **Call reporting on at account level first.** Without it there is no call conversion at all, and switching it off later removes the call signal from Smart Bidding (a).
- **Website calls swap the number** for a Google forwarding number via the phone snippet - a second gtag config call carrying the website-call action's label and `phone_conversion_number`, placed after the Google tag. The legacy `wcm/loader.js` snippet is for pages without gtag and defines nothing on a gtag page. One number per page with the default tag, up to an hour before it starts serving, and the GTM standard tag does not handle international number formats (a).
- **Forwarding numbers exist in about 30 countries** including Canada, the US, the UK, Australia and Ireland. The list changes; the command reads Google's page live rather than trusting a cached list (a).
- **Minimum call length: the repo default is 1 second - any connected call counts.** (Jono's ruling, 2 September 2026, reaffirmed 7 September 2026: "60 seconds muddies the water. Three things have to happen for a call to count - they call, the company picks up, and the call lasts a minute - and the company picking up is not a guarantee. Someone who hits voicemail is still a qualified lead. I am not going to lose a lead because the business missed the phone.") The timer starts at CONNECT, not at ring: a fat-thumb tap cancelled during ringing never connects and never counts, and a voicemail pickup IS a connect - the greeting playing starts the clock. So a connect means a real person with intent reached the business or its voicemail, and that is a lead. The old 60-second default and the 30-60 practitioner band (b, Adalysis) exist for accounts drowning in spam calls - raise the threshold only if the call details report shows real junk connecting, never pre-emptively. Google does not publish where the timer starts (c); verify in week one from the call details report - a missed call's duration row settles it. Voicemail ON is part of setup: without it, an unanswered real lead records nothing.
- **The 15-second figure is a reporting threshold**, not the conversion minimum: the caller's number shows only for calls over 15 seconds (a).
- **Call recording is switched on**, after the owner confirms and with Google's recorded-call announcement left on. It has its own eligibility page and two-party consent law applies in many places, so the announcement is not optional (a for the setting, c for the legal note).
- **Local Services Ads.** Google auto-created an LSA phone call action in Google Ads in October 2025 (b). From August 2026, US LSA accounts move into Google Ads as Performance Max with pay-per-lead goals; leads sit under Goals then Conversions then Leads, weekly budgets become daily averages, manual bidding goes, and historical LSA reports do not transfer, so screenshot them first (a). Non-US accounts follow in 2027 (a). The badge is Google Verified since 20 October 2025 (b). The command checks the LSA call action is not double counted against the ads call action.

---

## Enhanced conversions

- **What it is.** The form's email and phone are normalised (lowercase, trimmed, phone in E.164, gmail dots removed), hashed with SHA-256, and sent with the conversion so Google can match the lead to a signed-in account that saw the ad (a).
- **One toggle since June 2026.** "For web" and "for leads" merged at Goals then Settings, with an opt-out per action. Accounts that had accepted the customer data terms migrated automatically (a). The account flag is readable by API; the toggle itself is UI only (a).
- **The lift.** Google's help pages read for this file carried no number. MB Advertising cites Google Ads Help 2025 for a median lift of 5 percent on Search and 17 percent on YouTube (b). Google's own case study of "26 percent" has no method (c). Treat it as recovering leads that were already happening, not new leads.
- **In GTM,** uncheck "Automatically detect user-provided data" and send only the fields you choose through the User-Provided Data Event tag; the old variable-based setup was replaced in April 2025 and can silently stop sending (b, Analytics Mania 2026).
- **For leads,** the same hashed email or phone is the key when the CRM outcome is uploaded later, with the gclid alongside whenever it exists (a). Google now calls gclid-only import "legacy" (a).

---

## Offline import - the CRM tells Google which clicks became customers

- **Which stage to send.** The earliest stage that predicts revenue at your volume. For most local businesses that is booked appointment; add won when volume supports it (b, Brovtsev, farsiight). One action per stage, each with its own value.
- **Paths.** GoHighLevel's native integration at Settings then Integrations maps pipeline stage, opportunity status, tag, appointment status and call duration to conversion actions (b). Google Sheets scheduled import pulls up to 90 days back (a). Zapier and HubSpot connectors exist; the Salesforce direct integration was retired 31 May 2025 (b). Custom code uses the API.
- **The API changed in 2026.** From 15 June 2026, `UploadClickConversions` fails for any developer token with no prior upload history; new pipelines use the Data Manager API (`events:ingest`, 2,000 events per request, `validateOnly` for dry runs) (a). The command checks token history before touching the old service.
- **Upload rules (a).** Wait 4 to 6 hours after creating an upload action before the first upload or reporting slips two days. `conversion_date_time` carries the timezone offset. `order_id` makes re-uploads idempotent. Consent fields populated. gclid case preserved.
- **The window.** The click must fall inside the action's click window (30 days here, 90 maximum). A six-month sales cycle cannot be attributed to the click (a).
- **Reconcile weekly** against a CSV export; webhooks drop silently (c, Brovtsev).
- **Expect a lag.** Imported conversions appear 24 to 48 hours after upload (b).

---

## Consent - required for any EEA or UK visitor, regardless of where the business is

- **Consent mode v2** adds `ad_user_data` and `ad_personalization` to `ad_storage` and `analytics_storage`. Default denied, updated on banner interaction (a). Required for EEA and UK traffic since March 2024 (b).
- **Without it,** conversions keep firing but lose modelling; audiences and remarketing stop (b, Simo Ahava).
- **Advanced mode over basic.** Basic blocks tags until consent and sends nothing on refusal; advanced sends cookieless pings so Google can model (a).
- **June 2026 change.** Google moved the control from the GA "Google signals" setting to the `ad_storage` signal in site code and removed a fallback that covered broken banners; one agency reports a client losing about 90 percent of tracked conversions after a similar change (c).
- **Canada and US only sites** carry no Google-enforced requirement today, but a consent banner is still the practical path if any EEA or UK traffic lands (b).
- **Remarketing needs a privacy policy that says so,** and no personal data in any audience rule (a).

---

## GA4 - link it, do not double count

- Importing GA4 key events needs the link plus auto-tagging. Imports land as secondary specifically so they do not bid against a Google Ads tag on the same form (a).
- One primary per real-world event: the Google Ads tag is primary, the GA4 import stays secondary (b).
- April 2026: `generate_lead` needs value and currency to count as a key event, and re-linking takes 24 to 48 hours to flow (c, single source).

---

## Verification - the checklist the command runs

- Auto-tagging reads back true (a)
- Enhanced conversions flag reads back true (a)
- Call reporting reads back on (a)
- Every action listed with type, category, primary flag, counting, window and status; exactly three primaries
- Google tag seen on the landing page, the thank-you page and the pricing page in Tag Assistant
- One real form submission, one real booking and one tap-to-call each produce ONE conversion request carrying the right label, with no duplicate request - read straight off the Tag Assistant tag list
- The number swap checked in two stages: stage 1 on the live page with `?gclid=test` - read `window.google_wcc_status`: `"no ad click"` is a PASS (the script asked Google for a number carrying the real number, the call label and the click id; Google declined only because the click is synthetic), undefined means the phone config never registered (`_googWcmGet` no longer exists - Google's script does the swapping itself; never install `wcm/loader.js`). Stage 2 once a campaign runs - the call lands in the calls report. Never click your own ad to test (c on synthetic gclids - practitioner convention, not Google-documented)
- One real call over the minimum length shows in the call reporting column within 24 hours
- Action status is Active or Awaiting conversions; "Awaiting conversions" means nothing in 7 days and is a finding once traffic is live; Misconfigured means the tag is broken (a)
- Enhanced conversions diagnostics show no formatting errors (a)
- Consent banner offers real accept and reject in an incognito window and the signals change (b)
- Thank-you page returns noindex and is absent from sitemap.xml

**Data lags to expect (a unless marked).** Web conversions inside 3 hours, all within 24. Imports 24 to 48 hours. New upload actions 4 to 6 hours before the first upload. Conversions report by click date, so last week keeps rising for 30 days.

---

## Audiences

- **Every network needs 100 active users in 30 days** (Search was 1,000 until late 2024) (a). Membership default 30 days, maximum 540; unlimited was removed 7 April 2025 (a).
- **The warm-pixel audience** is all visitors, rule "URL contains the domain", 540 days, attached to Search ad groups as observation (c on observation semantics, a on the cap). Narrowing to ad clickers cuts the pool 70 to 90 percent on a small account (c, repo).
- **Customer Match** for observation needs only good policy and payment history; targeting and manual bid adjustments need 90 days and $50,000 USD lifetime spend (a). Google recommends 5,000 or more members for a list to actually serve; 100 is only the eligibility floor (a). First-party data only, uploaded through the Data Manager API (a).
- **Similar audiences no longer exist** (removed August 2023); optimised targeting and audience expansion replaced them (a).
- **Smart Bidding ignores manual audience bid adjustments**, so the +50 percent on the warm pixel only matters under manual or Maximize clicks (c, carried forward).
- API errors `INVALID_TAG_FOR_PERSONALIZED_ADS` and `USER_LIST_NOT_ELIGIBLE` mean personalised ads is off in Admin then Preferences, or the Customer Match policy has not been accepted (c, repo).

---

## Bidding graduation and values by stage

- **Maximize Conversions at launch, no target** (Jono's ruling, matches `/campaign-plan` and the course). It needs no history, and with calls counting from 1 second the account has conversion signal from day one. Maximize Clicks is the fallback only, for a brand-new account that serves nothing for a week - it buys the cheapest clicks, not the best ones. **Target CPA** at about 30 conversions in 30 days, set from the last 30 days plus 10-20%; **Target ROAS** only past about 50 valued conversions a month (a for the 30 and 50 evaluation thresholds, b for using them as graduation gates).
- Target CPA works with no history, but Google's suggested target is the last 30 days adjusted for conversion delay (a). Google changed the bidding system on 17 August 2026 and warned of temporary swings on Target CPA campaigns (a). "Maximize conversions with a target CPA" was renamed "Target CPA" in June 2026 (a).
- **Values by stage,** set only once CRM numbers exist: form or call at a base value, booked appointment higher, won highest, all from average job value times close rate. Conversion value rules can then scale by location or audience (a). Revisit quarterly; the commonest failure is a value nobody updated (b, Optmyzr [V]).
- **Bad tracking mistrains bidding three ways (b):** Every counting on a form, a primary on a soft action, and double counting across tag plus GA4 import.
- **Counting is a business-model decision (a):** ONE per click for lead gen - a person who submits the form twice is one lead. EVERY per click for e-commerce - a second purchase is a second sale. The API default is EVERY, so every lead action created by hand or by script must be flipped.
- **The conversion window matches the sales cycle (a):** click-through windows run 1-90 days, default 30. A window shorter than the time a lead takes to book silently drops real conversions and starves Smart Bidding. Ask the owner the typical lead-to-booked time and set the window past it; shorten below 30 only with a measured reason.

---

## What changed 2024 to 2026

- October 2023 · rules-based attribution models removed, data-driven becomes the default (a)
- August 2023 · similar audiences removed (a)
- March 2024 · consent mode v2 required for EEA and UK traffic (b)
- 2024 · GA4 "conversions" renamed "key events" (c on the date)
- December 2024 to May 2025 · audience minimum drops to 100 users on every network; Data Manager API launches (a)
- April 2025 · GTM auto-loads the Google tag ahead of any Google Ads tag; user-provided data moves to its own event tag (b)
- 7 April 2025 · unlimited Customer Match membership removed, 540-day cap (a)
- 31 May 2025 · Salesforce direct import retired (b)
- 20 October 2025 · Google Verified replaces Google Guaranteed and Google Screened (b)
- October 2025 · LSA phone call action appears inside Google Ads (b)
- April 2026 · user-provided data accepted from tag, Data Manager and API at once (a)
- June 2026 · one enhanced conversions toggle; "Maximize conversions with a target CPA" renamed Target CPA; consent control moves to `ad_storage` in site code (a, a, c)
- 15 June 2026 · `UploadClickConversions` blocked for developer tokens with no upload history (a)
- 22 July 2026 · Google Ads API v25 with the unified goals schema; v25.1 on 19 August (a)
- 17 August 2026 · bidding system change, temporary Target CPA swings (a)
- August 2026 · US Local Services Ads begin migrating into Google Ads as Performance Max pay-per-lead (a)

---

## Myths that still circulate

- "Pick first-click to see the funnel" · gone since October 2023
- "Search remarketing needs 1,000 users" · 100 since late 2024
- "Enhanced conversions for web and for leads are two features" · one toggle since June 2026
- "Just upload gclids from the CRM" · Google calls that legacy; hashed email or phone plus gclid is the path
- "Consent mode is a GA4 thing" · it gates Google Ads audiences and modelling on EEA and UK traffic
- "Install gtag and GTM, to be safe" · that is the commonest cause of double counting
- "Skip enhanced conversions on day one, it is only 5 percent" · true for the Search median, but the toggle is account-wide now, so there is no setup cost to skip
- "The status goes Unverified then Recording conversions" · the vocabulary is Active, Needs attention, Misconfigured, Awaiting conversions, Removed
- "Set membership to unlimited" · 540-day cap since April 2025
- "Google Guaranteed" · Google Verified since October 2025

---

## The rules `/landing-page` enforces

1. One primary per real lead path and no more: form submit, ads call over the minimum, website call over the minimum. Never a calendar-booking action - the form conversion already counted that lead (b)
2. Every primary is tied to money; views, scrolls, short calls and form starts are never primary (a)
3. One per click on every lead action, set explicitly (a)
4. Data-driven attribution everywhere; the retired models are never offered (a)
5. 30-day click window on every action, identical across actions; view-through 1 day and never on call actions (a)
6. Auto-tagging on and read back (a)
7. One tag path per site, one conversion tag per real-world event (b)
8. Google tag on every page including the thank-you page; Conversion Linker only when there is no Google tag everywhere (a)
9. Form conversion fires from the success event where one exists; thank-you URL is the fallback and is noindex, out of the sitemap, no navigation (b)
10. Never both the event and the URL on one action (b)
11. Minimum call length read back from the account; repo default 1 second - any connected call is a lead, voicemail pickup included; raise only on observed spam, never pre-emptively (Jono 2026-09-02)
12. Call reporting on before any call action, with the warning that turning it off blanks the signal (a)
13. Business country checked against the live forwarding-number list before promising website call tracking (a)
14. Call recording ON, with Google's recorded-call announcement left on and the owner's explicit confirmation first - it is how the owner screens leads and audits keyword quality. Two-party consent law applies in many places, which is why the announcement stays (a for the setting, c for the legal note)
15. Enhanced conversions on at account level, hashed email and phone sent from the form, flag read back by API (a)
16. Offline import sends a revenue-predicting stage with gclid plus hashed email or phone, keyed on order_id, with consent fields (b)
17. New offline pipelines target the Data Manager API; token history checked before using the old service (a)
18. 4 to 6 hours after creating an upload action before the first upload; imports expected 24 to 48 hours later (a)
19. gclid stored case-exact in a hidden field plus local storage and tested through multi-step, calendar-first and merge paths (a, b)
20. GA4 imports stay secondary when a Google Ads tag covers the same event (a)
21. Any EEA or UK traffic means consent mode v2, advanced mode, default denied, through a banner, before any audience (b)
22. Privacy policy discloses remarketing and tracking before any segment is created (a)
23. Verification is Tag Assistant on the live page with every lead path fired - form, tap-to-call, booking - the tag list read back line by line with no duplicate request, plus the number swap seen live with a gclid on the URL, then status read back; Awaiting conversions past 7 days of live traffic is a finding (a)
24. New actions beyond the three start secondary and are promoted after verified conversions (b)
25. No Target CPA before about 30 conversions a month; no Target ROAS before about 50 valued ones; recorded, not acted on (a, b)
26. Values by stage from average job value times close rate, set once CRM data exists, revisited quarterly (b)
27. Warm pixel is all visitors, 540 days, observation only on Search (c, a)
28. No audience called ready under 100 active users; Customer Match not expected to serve under about 5,000 (a)
29. Never similar audiences, never unlimited membership (a)
30. Secondaries never enter a bidding goal without the owner saying so (a)
31. The closing read-back lists every action with type, category, primary flag, counting, window and status, plus auto-tagging, enhanced conversions, call reporting and consent state (repo)
32. LSA accounts checked for the auto-created LSA call action so it is not counted twice; US accounts told to screenshot LSA history before the August 2026 migration (a)
33. Time zone and currency confirmed before any action is created (a, repo)

---

## Sources

Google Ads Help: enhanced conversions for leads (15713840), LSA transition to Performance Max (17213585), call reporting (2454052), website call tracking (6095883), phone call conversion tracking (6100664), reported calls (9846715), manage call reporting (9141717), data segments (2472738), conversion windows (3123169), counting options (3438531), primary and secondary actions (11461796), Smart Bidding (7065882), Target CPA (6268632), Maximize conversions (7381968), data-driven attribution (6394265), attribution models (6259715), auto-tagging (3095550), conversion status (1722021), import from clicks (7012522), diagnostics (2998031), Customer Match (6299717), consent mode (10000067), enhanced conversions for web (9888656), set up web conversions (16560108). Google Analytics Help: import key events (10632359). Tag Manager Help: Conversion Linker (7549390), Form Submission trigger (7679217). Google Ads policy: personalised advertising (143465).

Google Ads API docs: upload-clicks, enhanced-conversions/leads, create-conversion-actions, goals/overview, conversion-value-rules, customer-match/get-started, release-notes, sunset-dates; developer blog v20 and v21 sunset reminders (April, June 2026). Data Manager API: overview and events:ingest reference.

Practitioners: Search Engine Land (10 April 2026; 23 May 2025; 2023 attribution sunset; December 2022 similar audiences), Search Engine Journal (2023; 4 May 2026 Optmyzr report), PPC Land (17 December 2024), Optmyzr (16 July 2026; 24 February 2022), Adalysis (28 July 2021), Simo Ahava (16 January 2024), Analytics Mania (11 August 2026), MeasureSchool (23 October 2024), farsiight (2026), ALM Corp (10 April 2026), Groas (5 May 2026), Envision Clicks (22 July 2026), SD Marketing Pros (15 June 2026), Relevant Audience (22 April 2026), MB Advertising (June 2026), Optimyzee (17 March 2026), Consultevo (2025), MD Niamul (13 January 2026), Automate to Grow, Lev Brovtsev, Search Engine Roundtable (28 October 2025), Ignite Visibility (29 July 2026), WolfPack Advising (14 July 2026), WordStream (13 December 2022). Full list with URLs in the research dossier.
