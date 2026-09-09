# Research dossier - writing responsive search ads and assets for lead-gen and local service businesses, 2025-2026
Researched 28 August 2026 · 81 sources read (Google help and policy first, then the Google Ads API docs, Optmyzr's 2023, 2024 and 2026 datasets, Search Engine Land, SEJ, ppc.land, named practitioners) · testing questions deliberately NOT redone, see `references/ad-testing.md`
Next: merge the draft in `ref-google-ads.md` into `references/google-ads.md`, then re-run `/write-ads` against the new rubric.

## How every claim is graded

- **(a)** Google documentation, policy page or API reference
- **(b)** A study with a stated sample size
- **(c)** Practitioner convention or a single-account anecdote
- **[V]** Vendor-published (Optmyzr sells the tool that measures this)
- **[F]** Field-verified in this repo against the live API, August 2026

Where the fetch of an official page failed today (404 on a moved URL) the item says so and leans on the API reference from memory plus the repo's field notes.

---

## 1. What an RSA is made of, and what actually serves (a)

- 15 headlines of up to 30 characters, 4 descriptions of up to 90, two display paths of up to 15 each. Minimum 3 headlines and 2 descriptions. Double-width languages count each character as two. [S1]
- Google's own words: "usually" everything in Headline 1 and Description 1 appears; Headlines 2 and 3 and Description 2 "may appear" based on predicted performance or space. There is no guarantee beyond H1 and D1. [S1]
- **Asset flexibility, announced 20 February 2025, global, all languages, no opt-out:** the system may show ONE headline when predicted to perform better; headline text may appear at the start of a description; up to two unused headlines may serve as link-based assets in the space that used to belong only to sitelinks, pointing at the ad's final URL. Pinned assets keep behaving as pinned. [S2, S33]
- Headlines and descriptions may also be **borrowed from other RSAs in the same ad group** to complete an expanded format. So a champion and a challenger in one ad group can leak lines into each other's rendered ad. [S33]
- Campaign-level text assets: up to 3 extra headlines and 2 extra descriptions applied to every enabled RSA in the campaign, schedulable, pinnable, not counted in Ad Strength. [S33]
- Google's uplift numbers, internal data 15 to 20 August 2025: a second RSA adds about 6.6% conversions, a third about 3.7%; Poor to Excellent Ad Strength "15% more conversions on average". No sample size stated. [S1, S11]
- Google's pinning guidance: pin "2 or 3 unique headlines or descriptions to each position", never identical text to one slot (it lowers Ad Strength), and the June 2026 restatement adds the hybrid rule - pin one or two keyword headlines, let the rest rotate, keep the keyword whole inside one headline, and if a keyword runs past 30 characters put it in a description instead. [S1, S57]
- Hard limit: 3 enabled RSAs per ad group (see `ad-testing.md`, not re-verified here).

**Stale in the current rubric:** "slot 1 shows 100% of the time, slot 2 about 90%, slot 3 only sometimes" - Google now says H1 shows "usually", and since February 2025 a single-headline render is possible. The "43,680 combinations" line is marketing arithmetic with no performance claim attached; it does no work in a rubric. The "6% higher click-through for filling all 15" has no traceable source; Google's own numbers are about RSA count, not headline count. Downgrade to (c).

---

## 2. What the copy data says (b, all [V] Optmyzr unless noted)

**Optmyzr, 6 April 2026, about 20,000 accounts** (customers skew experienced): [S34, S53]

- Sentence-case headlines: $7.46 cost per acquisition, 13.35% click-through, 12.50% conversion rate, 346% return on ad spend. Title Case headlines: $27.47 cost per acquisition. A 3.7x gap. Descriptions: sentence case about $17.50 against $19.97.
- Headlines under 20 characters: $9.35 cost per acquisition, 11.77% click-through, 10.39% conversion rate. Headlines of 21 to 30 characters: $18.27, 10.52%, 8.61%.
- Descriptions of 61 to 70 characters: 12.33% click-through, $11.49 cost per acquisition, 9.21% conversion rate, the best bucket. Descriptions of 81 to 90 characters: $20.11 cost per acquisition, the worst. Under 50 characters was cheap ($9.61) but low click-through (8.90%).
- Pinning across all accounts: partial pinning $13.68 cost per acquisition and 11.88% click-through; full pinning $32.57 and 8.49%. In the 268 accounts running all three strategies, partial and none were about equal at roughly $26, full pinning $61.11 with a 4.48% conversion rate.
- Ad Strength: Average $12.43 cost per acquisition and 12.65% conversion rate; Excellent $28.68 and 4.97%. Poor had the best return on ad spend. Correlation between headline length and Ad Strength was 0.056 - Ad Strength is not measuring what converts.

**Optmyzr, 2 October 2024, 22,000+ accounts, 1M+ ads, $1,500+ monthly spend, 90+ days live:** [S35, S37, S41]

- Sentence case beat Title Case on cost per acquisition, conversion rate and return on ad spend for RSAs (Title Case edged it only on legacy expanded text ads).
- Shorter headlines won click-through and conversion rate; maxing the character count "showed minimal ROI benefits". Moderate description length won.
- Dynamic keyword insertion "produced negligible performance gains".
- Average Ad Strength beat Excellent on cost per acquisition, conversion rate and return on ad spend. Click-through barely moved between labels (0.5 to 1 point).
- "In almost all cases, advertisers who carried over ETA tactics to RSAs saw a decline."

**Optmyzr, 2023, 13,671 accounts, 93,055 RSAs, 432,343 ads for the DKI cut:** [S36]

- Fully pinned RSAs get about 3.9x fewer impressions than unpinned ones (they win on click-through and conversion rate per impression, but starve).
- Adding DKI or ad customizers raised impressions and lowered conversions per ad.
- Ad groups with two RSAs had the better conversion rate; more RSAs meant more impressions.

**Ginny Marvin (Google Ads Liaison), SEJ, 22 April 2024:** Ad Strength "is not a factor in the auction", "not a KPI", a "feedback mechanism"; pin two or three per position when you must pin. [S38]

**Kirk Williams (ZATO):** Ad Strength is "a functional guide rather than a key performance indicator"; write for the searcher, not the meter. [S60]

**Brad Geddes, Search Engine Land, 28 July 2026 - AI Max text customization tested across three accounts ($20,000+ a month, 100+ ad groups each):** about 19% of Google's auto-created assets had to be removed; B2B lead gen saw click-through up and conversion rate down sharply, test stopped at three weeks; "human-created assets still outperform AI-generated assets" in optimised campaigns; AI text only earned its keep in neglected long-tail campaigns. [S61]

**What has NO controlled data behind it (c):** numbers in headlines lift click-through; question hooks; "you" over "we"; one emotion per ad (WordStream's old emotion piece); price in the ad qualifies traffic; DKI "+15 to 25% click-through" (jjscit, July 2025, no study cited). Keep these as writing conventions, never as rules with numbers attached. [S45, S49]

---

## 3. Headline patterns that convert for a service business (c, with (b) where marked)

The angles a stressed searcher on a phone responds to, in the order the swipe file and the practitioner pieces agree on:

- **Keyword plus place** - "Emergency plumber Toronto". Pinned to H1 for relevance. Google's June 2026 note: keep the keyword whole in one headline. [S57]
- **A proof number** - "4.9 stars from 482 reviews", "15 years in the GTA". Must exist in `proof.md`. Spell out "stars". [repo F]
- **The offer** - "No callout fee today", "Free written quote". Must be live on the landing page (misrepresentation policy). [S28]
- **Speed** - "On site within 60 min". Only if true; scheduling proves it.
- **Risk reversal** - "10-year warranty", "Upfront pricing, no hidden fees". Guarantee text must be on the page. [repo compliance]
- **Call to action that matches the page** - "Call now, open 24/7", "Book online in 2 min". Google's editorial page lists generic calls to action as a fault. [S3]
- **Question hook** - "Burst pipe in Toronto?" - high click-through, contested conversion (swipe file, c).
- **"You" over "we"** - "Your plumber is TSSA licensed" (swipe file, c).

Length data says the short version of each wins: under 20 characters where meaning survives (b). Description shape: promise, proof, ask, in 61 to 70 characters (b).

**One emotion per ad, and never fear.** The misrepresentation policy names "negative life events such as death, accidents, illness" used to pressure a click as a violation. For emergency trades that rules out "water damage spreads fast" style agitation headlines - the PAS formula in the old swipe file needs its Agitation line rewritten to relief, not fear. [S28]

---

## 4. Dynamic text: keyword insertion, customizers, location (a)

- Syntax `{KeyWord:Default text}`. The default shows when the triggering keyword would push the line past its limit. Capitalisation of the word "KeyWord" controls how the inserted term is cased: `keyword` lower, `Keyword` first word capped, `KeyWord` every word capped, `KEYWord` first word all caps, `KeyWORD` last word all caps. [S30, API reference from memory]
- The IF function is **not supported** in RSAs. Countdown and location insertion are. [S20]
- Location insertion: `{LOCATION(City):Default}`, also State and Country levels (fetch of the help page failed today; syntax from memory, a).
- Ad customizers for RSAs: create a CustomizerAttribute, link values at customer, campaign or ad group level, reference as `{CUSTOMIZER.name:default}` (API sample page moved; from memory, a).
- Google's warning: keyword insertion must still comply with policy after insertion, so a broad keyword list can insert a trademark or a claim you cannot make. [S30]
- Evidence: 2023 more impressions and fewer conversions per ad; 2024 negligible. Use DKI only as the deliberate test variable, and only in a STAG whose keywords all read well inside the line. [S35, S36]

---

## 5. Google's policy for ad text - what gets an ad rejected (a)

**Editorial (support.google.com/adspolicy/answer/6021546, 14848200, 14848295, 14847994):**

- No phone number anywhere in ad text; use a call asset. The only exception is a company whose name IS a phone number, on request. [S4]
- Capitalisation "used correctly and for its intended purpose". Disallowed examples: FLOWERS, FlOwErS, F.L.O.W.E.R.S. Allowed: common abbreviations (ASAP, HVAC), coupon codes, brand and product names. A lone "FREE" is not called out by name but sits inside "excessive or gimmicky". [S5]
- Punctuation: no consecutive repeats ("flowers!!"), no symbols used for something other than their purpose, no asterisks around words, no number-for-letter swaps (f1owers), no non-standard superscripts, emoji "not supported". The page explicitly allows a conventional asterisk for a star rating ("5* hotel"). **The repo's field test (August 2026) found the unicode star glyph ★ rejected as SYMBOLS/PROHIBITED**, so the rule stands: spell out "stars". [S6, repo F]
- Spacing: no omitted or excessive spaces, no gimmick spacing. Style: standard spelling and grammar, must read like a Search result. [S3]
- Business name in ad features must be the domain or the verified legal name, no promotional wording. [S3, S19]
- No repetition of names or words inside an ad, and no repeating asset text across the ad group. [S3]
- Enforcement: editorial violations get a warning at least 7 days before any suspension; editing the ad triggers re-review in 24 to 48 hours; each ad gets 3 appeals. [S6, S32]

**Exclamation marks.** Google's current punctuation page no longer spells out "none in headlines, one per description"; it says "used correctly". The long-standing enforcement pattern, and this repo's practice, is zero in headlines and at most one in a description. Keep it - there is no upside to testing the reviewer.

**Misrepresentation (6020955):** unavailable offers ("aren't easily found from the destination"), undisclosed payment model or full cost, "clickbait tactics or sensationalist text", pressure through "negative life events", misleading identity or qualifications. Unacceptable business practices and coordinated deception suspend without warning. [S28]

**Superlatives.** No policy page names "#1" or "best". Enforcement runs through the unreliable-claims and misrepresentation lines, and practitioner guides (auditsocials 2026) list "Unbeatable", "Miracle", "Guaranteed results" among common disapprovals. The safe rule is the repo's: a superlative needs third-party proof that is visible on the landing page, otherwise it is a number instead. [S28, S42]

**Trademark (6118):** bidding on a competitor's name as a keyword is unrestricted; using it in ad text is restricted on complaint, applied on an ongoing basis to the complained advertiser's second-level domain; reseller and informational-page exceptions exist. The February 2025 narrowing (per-advertiser rather than blanket) is reported by practitioner guides, not stated on the policy page. [S31, S42]

**Healthcare (176031):** LegitScript certification for addiction treatment, telehealth and pharmacies; prescription drug names (including "Botox") off the ad and the page; no experimental treatments; no guaranteed results. [S29, S41]

**Financial (2464998):** personal-loan ads must show minimum and maximum repayment period, maximum APR and a representative example; loans at 36% APR or more are banned in the US; credit repair is banned outright; debt services need certification. [S30b]

**Business name and logo (12499303):** name must exactly match the domain or the verified legal name, 25 characters; logo square, 1200x1200 recommended, 128 minimum, PNG or JPG, under 5120 KB, must appear on the landing page, no inverted or single-colour marks; renders at 28x28 in a circle. [S19]

**Image assets (9566341, ppc.land 9 July 2026):** account at least 60 days old, active text ads with Search spend in the last 30 days, good policy history, not a restricted vertical. No text, logos or graphic overlays on the image - "immediately disapproved". [S17, S44]

**AI-generated creative labels (search summary, c):** EU, India and New York require disclosure on AI-generated or materially edited creatives; Google added a label setting in Asset Studio and Ads Editor in 2026. Text-only RSAs written by Claude are not caught by the image and video rules, but keep the label switch in mind for any image asset.

**Verification:** locksmiths (US and Canada) and garage-door companies (US) need Advanced Verification before Search ads serve; identity verification requests carry a 30-day deadline (repo compliance.md, a).

---

## 6. The trust-signal rule and the legal exposure

- **FTC Consumer Reviews and Testimonials Rule**, effective 21 October 2024: bans buying or selling fake reviews, incentivised reviews conditioned on sentiment, undisclosed insider reviews, company-controlled "independent" review sites, review suppression, and fake social-proof indicators. Civil penalties up to $51,744 per violation. First enforcement letters went to 10 companies on 22 December 2025. A truthful "4.9 stars from 482 reviews" from a real profile is fine; an inflated count or a cherry-picked "top rated" without a source is the exposure. [S46, S47]
- Google's seller-rating asset needs 100 or more eligible reviews in the trailing 24 months (older guides say 12), 3.5 stars minimum, Search only, and the rated domain must match the ad's domain. Turn off via automated assets if the number is embarrassing. [S24]
- So the rule the command enforces: **no claim without a line in `proof.md`, and no review number that is not on a live public profile the same day.** (a for the policies, c for the operating rule)

---

## 7. Ad assets, 2025-2026 (a unless marked)

**Sitelinks** [S12, S43]
- 25-character link text (12 double-width), two optional 35-character description lines that must come as a pair. Minimum 2 to show at all. Desktop shows up to 6, mobile up to 8 in a carousel.
- A sitelink click costs the same as a headline click; Google charges at most 2 clicks per impression.
- Levels: account, campaign, ad group; higher levels serve alongside lower ones.
- Google's Ad Strength page wants 6 or more sitelinks. [S11]
- Since February 2025 unused headlines compete for the same slot, so weak sitelinks lose to your own headlines.
- The "+10 to 20% click-through" number every guide repeats is Google's January 2014 blog post. It is old and pre-dates the current layout; treat as (c).

**Callouts** - 25 characters (12 double-width), non-clickable, minimum 2 to show, up to 20 per level. Google's own tip: do not repeat what the headlines already say. The dedicated help page moved today; limits confirmed via S45 and S51. (a via secondary)

**Structured snippets** [S25] - 13 fixed headers (Amenities, Brands, Courses, Degree programs, Destinations, Featured hotels, Insurance coverage, Models, Neighborhoods, Service catalog, Shows, Styles, Types). Minimum 3 values, 4 recommended, 25 characters each. Desktop shows up to 2 headers, mobile 1. "Service catalog" is the trades header, not "Services".

**Call assets** [S13, S14, S15] - number in E.164 (+14165551234, no spaces); toll-free, standard or mobile OK; vanity, premium and fax numbers rejected; the number must be visible in the site's source or the domain verified in Search Console; schedulable to answered hours; the mobile call button costs a standard click; desktop shows the number plus a QR code. Call reporting is an account-level switch that swaps in a Google forwarding number, available in 30+ countries, and captures caller data only on calls over 15 seconds; you set the seconds that count as a conversion. **Call-only ads: no new ones since February 2026, all stop serving February 2027** - the RSA plus call asset is the only path.

**Lead form assets** [S9, S10, S26, S27, S48, S50]
- Needs a privacy-policy link, a conversion-focused bid strategy, a lead-form conversion goal, RSAs only, good policy history and an eligible vertical; some formats also need $1,000+ spend and advertiser verification.
- Headline 30 characters, business name 25, description 200 (b - adsworkbench October 2025 and search snippets; the official creation page moved today).
- Google stores leads for 60 days; the CSV export only reaches back 30. Delivery: CSV, email, Google Ads API (60 days), webhook to your CRM, or Zapier. Webhook = URL plus a key you choose, an HTTP POST per submission, and a "Send test data" button that must return HTTP 200. Use `lead_id` to de-duplicate: "a single lead may be delivered more than one time".
- The Lead Form Terms of Service must be accepted once in the UI or the API returns LEAD_FORM_MISSING_AGREEMENT. [repo F]
- Google's own CRM guide says speed matters; adsworkbench quotes the old "five minutes is 21x" line, which is the 2011 Lead Response Management study, (c).

**Location assets** [S16] - link the Google Business Profile in Location Manager (or by domain lookup); phone numbers on the profile go through verification; a profile marked temporarily or permanently closed stops the asset serving; Business Profile edits take up to a day to reach Ads.

**Business name and logo** [S18, S19] - requires completed Advertiser Verification (5 to 7 business days) plus Search spend in the last 28 days. Google also crawls the site to build dynamic names and logos and may prefer its own; you can remove them.

**Price assets** [S26] - 3 to 8 items, 5+ recommended, 25-character header and description, carousel under the ad, standard click cost. Service tiers and service categories are supported types, so a fixed-price menu (drain camera $149, safety inspection $99) qualifies; variable quotes do not.

**Promotion assets** [S27] - monetary or percentage discount, optional occasion with a fixed window (Black Friday 15 October to 15 December, New Year 1 December to 28 February), optional code, and an occasion asset must be created or edited within 6 months of its start date. The offer has to be findable on the page or it is an unavailable-offer violation. [S28]

**Business message assets** - provider-based (WhatsApp, Messenger, Zalo), plain SMS gone; October 2025 added a verification step and unverified assets do not serve (search summary, c). API needs provider, starter message, provider info and a call-to-action description. [repo F]

**Image assets** - see section 5; Google's April 2023 internal figure is a 6% click-through lift. [S17]

**Seller ratings** - section 6.

**Automatically created assets → AI Max text customization** [S7, S8, S52, S54, S55, S62]
- 27 May 2025: automatically created assets began upgrading into "text customization" inside AI Max. 1 September 2026: Search campaigns still using automatically created assets, and campaigns with campaign-level broad match, are auto-upgraded to AI Max with search term matching and text customization ON.
- Text customization writes headlines and descriptions from your ads, your landing page titles, descriptions and meta tags, and generative AI; refreshed at least every 48 hours; served only "if predicted to perform better" than yours; labelled in the "Added by" column as Google's.
- **Turn it off:** Campaigns → Settings tab → tick the campaign → Edit → AI Max → Asset optimization → untick Text customization → Save. Disabling it also disables Final URL expansion. Once the legacy setting is off it cannot be re-enabled except through AI Max.
- Text guidelines (pilot, GA in 2026): up to 25 excluded terms and up to 40 instructions of 300 characters. Adalysis's example: Google labelled a trademark firm a "USPTO lawyer", a false claim. For any business with a NEVER SAY list this is the minimum if the setting is ever on.

**Asset reporting** - per-asset impressions, clicks, cost and conversions exist only for dates from 5 June 2025; the Low/Good/Best labels are deprecated; asset numbers do not sum to the ad's. Not redone here - `ad-testing.md` owns it.

---

## 8. Ad Strength - what to tell the client (a, b)

- Google: "doesn't directly influence your ad's serving eligibility", not used in Ad Rank, Quality Score or auction wins. [S11]
- Google: Poor to Excellent correlates with 15% more conversions (internal, August 2025, no sample). Optmyzr 2024 and 2026: Average beats Excellent on cost per acquisition in both datasets, and click-through barely moves. [S11, S34, S35]
- What moves the meter: 15 distinct headlines, 4 descriptions, keywords in the text, and 6+ sitelinks. Pinning lowers it. [S11, S60]
- Ruling for the rubric: log it, never write to it. The old section 7 line "Excellent correlates with 15% more clicks and conversions" stays only with Google's source and Optmyzr's contradiction beside it.

---

## 9. The API surface the command uses (a, [F] where the repo verified it)

- **Create the ad:** `AdGroupAdService.MutateAdGroupAds` with an `AdGroupAd` carrying `status = PAUSED`, `ad.final_urls`, and `ad.responsive_search_ad` holding `headlines` and `descriptions` as `AdTextAsset {text, pinned_field}` plus `path1`, `path2`. Pin values come from `ServedAssetFieldType`: HEADLINE_1, HEADLINE_2, HEADLINE_3, DESCRIPTION_1, DESCRIPTION_2. [S21, repo build_ads.py]
- **Edit versus replace:** `AdGroupAdService` can only change status after creation (AdError CANNOT_USE_AD_SUBCLASS_FOR_OPERATOR). Text edits go through `AdService.MutateAds` and keep the ad ID, which merges the stats - the reason the challenger is always a new ad. [S31b, ad-testing.md]
- **Assets:** `AssetService.MutateAssets` creates sitelink, callout, structured snippet, call, lead form, business name, business logo, image, price, promotion and business message assets. "Once an asset is uploaded ... it cannot be changed or removed programmatically" - you unlink it. Link with `CustomerAssetService`, `CampaignAssetService` or `AdGroupAssetService`, each link carrying `asset`, `field_type` (SITELINK, CALLOUT, STRUCTURED_SNIPPET, CALL, LEAD_FORM, BUSINESS_NAME, BUSINESS_LOGO, PRICE, PROMOTION, BUSINESS_MESSAGE, MARKETING_IMAGE ...) and its own `status`. [S22, S23b]
- **Text assets** can be created inline inside the ad; everything else needs its own create first. DUPLICATE_ASSET fires if two creates in one request carry identical binary data - create once, link many. [S22, S31b]
- **validate_only:** every mutate request accepts `validate_only = true`; the server runs the full validation, including ad policy review, and commits nothing. Policy failures come back as `PolicyFindingError` with `policy_finding_details.policy_topic_entries`, each entry carrying `topic`, `type` (PROHIBITED, LIMITED, FULLY_LIMITED, DESCRIPTIVE, BROADENING, AREA_OF_INTEREST_ONLY), `evidences` and `constraints`. Only findings Google marks ignorable can be resubmitted with `policy_validation_parameter.ignorable_policy_topics`. Repo field test: a non-resolving final URL fails the create with DESTINATION_NOT_WORKING or HOSTNAME_NOT_FOUND, so a dry run with `validate_only` is the cheapest policy check there is. (a from the API reference - the reference pages 404'd on today's fetch - plus repo F) [S23, S31b]
- **partial_failure:** fine for independent creates (20 callouts), wrong for anything that references a temporary ID in the same request (asset then link). [S40]
- **Errors you will actually hit:** LINE_TOO_WIDE (count before you send), INVALID_INPUT (a stray character in a URL), LEAD_FORM_MISSING_AGREEMENT (accept the terms in the UI), a missing `call_to_action_description` on business message assets that reports only as "REQUIRED". [S31b, repo F]
- **Approval status after creation:** query `ad_group_ad.policy_summary.approval_status` and `review_status`, and `asset.policy_summary`, before enabling anything. Review takes about one business day; over two, check; over a week, contact support. [S23, S42]

---

## 10. The approval workflow (repo rule, with (a) where Google sets the clock)

- Every ad and every asset link lands PAUSED. The command writes a pending-ads file the owner reads; the owner flips status in the UI or with a one-line script. Nothing Claude writes serves without a human enabling it.
- Google reviews on enable, usually inside one business day. A disapproval shows the policy in the Status column; fix by editing (auto re-review 24 to 48 hours) or appeal (3 per ad). [S32]
- An edit to a live ad keeps its ID and blends the stats. During a test, never edit - create, pause, never delete.
- The compliance gate (`context/compliance.md`) runs before the push, and `validate_only` runs the same check against Google's own reviewer for free before anything is written.

---

## 11. Competitor swipe files - benchmark, never copy (c, with the policies that bite)

- Scrape competitor ads to learn the table stakes and the gaps, tag their angles, and write to beat them. That is the point of `/scrape-competitors`.
- Copying a line is a policy problem before it is an ethics problem: their claim is not in your `proof.md` (unreliable claim), their offer is not on your page (unavailable offer), their name in your ad is a trademark complaint waiting to happen, and their review number attached to your ad is an FTC matter.
- The test: if a line survived only because a competitor runs it, it scores 0 on Differentiated and dies in the cull anyway.

---

## 12. What changed in 2025-2026 (dated)

- 28 October 2024 - call ads move to the RSA format; new call ads need a landing page and a business name. [S39]
- 20 February 2025 - asset flexibility: single headline, headline at the start of a description, up to two headlines in sitelink slots, borrowing across the ad group. [S2, S33]
- February 2025 - trademark enforcement narrowed to the complained advertiser (practitioner-reported). [S42]
- 27 May 2025 - automatically created assets begin upgrading into AI Max "text customization". [S7]
- 5 June 2025 - per-asset conversions start (data begins this date, UI followed July to October). [ad-testing.md]
- 15 to 20 August 2025 - Google's internal data behind the 6.6% and 3.7% second and third RSA numbers. [S1]
- October 2025 - business message assets need verification to serve (search summary). [S45]
- 20 October 2025 - Local Services Ads badges consolidate into "Google Verified" (search summary, out of scope for RSAs).
- 22 December 2025 - FTC's first review-rule warning letters. [S47]
- February 2026 - no new call-only ads. February 2027 - existing ones stop. [S15]
- Early 2026 - AI Max for Search generally available; text guidelines open to all. [S54, S58]
- 6 April 2026 - Optmyzr's 20,000-account RSA dataset. [S34]
- 24 June 2026 - Google's restated pinning tips (hybrid, keyword whole, 30-character rule). [S57]
- 9 July 2026 - image-asset eligibility tightens to 60-day-old accounts with recent Search spend; blur and overlays banned. [S44]
- 28 July 2026 - Brad Geddes's AI Max text test: humans still win in optimised campaigns. [S61]
- 2 August 2026 - EU AI Act Article 50 disclosure applies; Google's AI label switch covers it. [S44]
- 1 September 2026 - auto-upgrade of ACA and campaign-level broad match campaigns to AI Max. [S62]

---

## 13. Myths, with dates

1. "Headline 1 always shows" - since 20 February 2025 a single-headline render and a headline-in-description render exist; Google now says "usually".
2. "Sitelinks are the only thing in the sitelink slot" - up to two unused headlines compete for it since February 2025.
3. "Title Case is the professional default" - sentence case won 2024 and 2026 on cost per acquisition, 3.7x in 2026.
4. "Fill every character" - under-20-character headlines and 61-to-70-character descriptions won; 81 to 90 was the worst bucket.
5. "Excellent Ad Strength performs better" - not an auction factor; Average beat Excellent in both Optmyzr datasets.
6. "One star symbol is fine" - the live API rejected ★ in August 2026; the policy's allowed example is an ASCII asterisk in "5* hotel". Spell it out.
7. "DKI lifts click-through 15 to 25%" - no study; Optmyzr found more impressions, fewer conversions (2023) and negligible gains (2024).
8. "Automatically created assets is a harmless opt-in" - upgraded into AI Max text customization May 2025, forced on 1 September 2026 for ACA and broad-match campaigns, and it writes claims you did not approve.
9. "Editing an ad resets it" - it keeps the ID and merges the stats; that is why the challenger is new.
10. "Never pin" - Google says pin 2 or 3 per position when you must; partial pinning had the best cost per acquisition; only full pinning loses.
11. "Sitelinks add 10 to 20% click-through" - a 2014 Google blog number; no 2025-2026 measurement found.
12. "Leads are kept 30 days" - stored 60 days; only the CSV export is capped at 30.
13. "Call-only ads are a lead-gen staple" - creation ended February 2026, serving ends February 2027.
14. "Business name can be a keyword" - must exactly match the domain or the verified legal name.
15. "Fear sells emergencies" - Google's misrepresentation policy lists pressure through accidents and illness as a violation.

---

## 14. The rules a write-ads command should enforce

**Shape (a)**
1. 15 headlines of 30 or fewer, 4 descriptions of 90 or fewer, two paths of 15 or fewer, counted by script before the push.
2. Exactly 2 RSAs per ad group, champion and challenger, same final URL, both PAUSED on creation. (a + repo)
3. The final URL resolves today; a placeholder domain fails the create with DESTINATION_NOT_WORKING. (F)
4. Path 1 filled with the service word, path 2 with the place, lower case. (c)

**Copy (b unless marked)**
5. Sentence case in every headline and description; caps only for proper nouns, brands and real acronyms.
6. Headlines under 20 characters wherever the meaning survives; the keyword headline is the exception.
7. Descriptions written to 61 to 70 characters, never past 80.
8. At least 5 of the 6 angles across the 15 headlines; no two lines say the same thing in different words. (a - Ad Strength diversity, c)
9. Every number, rating, year, licence and guarantee traces to a line in `proof.md`; anything else is cut before scoring. (repo, FTC)
10. Review numbers match a live public profile on the day of writing. (FTC, c)
11. One emotion per ad, and never fear or a negative life event. (a - misrepresentation, c)
12. No "we", "our", "us" leading a headline; no "click here"; no padding. (c, a for generic CTA)
13. The call to action names the action the landing page actually offers - call, book, quote. (c)
14. DKI only as a declared test variable, `{KeyWord:Default}` with a default that fits, never in a regulated vertical. (b, a)

**Pinning (a, b)**
15. Pin the keyword headlines to HEADLINE_1 only - 2 or 3 of them, never identical text; everything else floats; no description pins.
16. Keyword over 30 characters goes into a description, never split across two headlines.

**Policy (a)**
17. No phone numbers in text; no exclamation marks in headlines and at most one in one description; no repeated punctuation; no emoji, arrows or star glyphs; no gimmick spacing or capitals; no ALL CAPS words except real acronyms.
18. No superlative without third-party proof visible on the landing page; no "guaranteed" without the guarantee on the page; no "free" with strings.
19. No competitor brand in ad text; no prescription drug names; no lender ad without APR and term disclosure; no addiction, telehealth or pharmacy ad without LegitScript.
20. Every offer and price in the ad is live and findable on the landing page the day the ad is enabled.
21. Locksmith and garage-door accounts do not get ads written until Advanced Verification is confirmed.
22. The `context/compliance.md` CRITICAL list runs over every line, and `validate_only` runs against Google before any real write. (repo, a)

**Assets (a)**
23. Sitelinks: 4 to 8, 25-character text (aim 12 to 15 for mobile), paired 35-character descriptions, every URL fetched live before it is written, distinct pages, no "Learn more". Six or more if the account wants the Ad Strength tick.
24. Callouts: 8 to 12, 25 characters, one claim each, nothing already in the headlines.
25. Structured snippets: two headers from Google's 13, "Service catalog" plus "Types" for trades, 4 or more values of 25 characters that appear on the page.
26. Call asset only with a real, answered, in-country E.164 number, scheduled to answered hours, with call reporting on and a conversion length set.
27. Lead form only with a privacy-policy link, the webhook plus key wired to `LEAD_WEBHOOK_URL`, "Send test data" returning 200, `lead_id` de-duplication, and the Terms accepted in the UI first.
28. Business name equals the domain or the verified legal name; logo 1200x1200 PNG that also appears on the page; nothing else passes review.
29. Text customization (AI Max) OFF in every campaign the command builds, checked by `code/disable_auto_assets.py`, and text guidelines loaded with the NEVER SAY list if a client insists on leaving it on.
30. Image assets only from accounts over 60 days old with real photography and no overlays; price assets only for fixed-price items; promotion assets only for a real dated offer that is on the page.

**Workflow (repo, a)**
31. Everything lands PAUSED; the owner enables; the command writes the pending list.
32. Never edit a live ad; a change is a new ad.
33. Ad Strength is logged in the pending file, never optimised for.
34. Competitor lines are benchmarks; a line that only exists because a competitor runs it scores 0 on Differentiated and dies.

---

## 15. Sources

**Google Ads help and policy (a)**
- S1 support.google.com/google-ads/answer/7684791 - About responsive search ads (limits, "usually" H1 and D1, pinning 2 or 3, second RSA +6.6%, internal data August 2025)
- S2 support.google.com/google-ads/answer/15967262 - Asset flexibility announcement, 20 February 2025
- S3 support.google.com/adspolicy/answer/6021546 - Editorial policy
- S4 support.google.com/adspolicy/answer/14848200 - Phone number in ad text
- S5 support.google.com/adspolicy/answer/14848295 - Capitalization
- S6 support.google.com/adspolicy/answer/14847994 - Punctuation and symbols
- S7 support.google.com/google-ads/answer/16738708 - Turn text customization on or off
- S8 support.google.com/google-ads/answer/16740321 - Text customization FAQ
- S9 support.google.com/google-ads/answer/9423234 - About lead form assets
- S10 support.google.com/google-ads/answer/16729613 - Webhook integration for a lead form
- S11 support.google.com/google-ads/answer/9921843 - About Ad Strength
- S12 support.google.com/google-ads/answer/2375416 - About sitelink assets
- S13 support.google.com/google-ads/answer/2453991 - About call assets
- S14 support.google.com/google-ads/answer/2454052 - About call reporting
- S15 support.google.com/google-ads/answer/16619010 - Transition from call ads to call assets
- S16 support.google.com/google-ads/answer/2404182 - About location assets
- S17 support.google.com/google-ads/answer/9566341 - About image assets for Search
- S18 support.google.com/google-ads/answer/12497613 - About business information
- S19 support.google.com/adspolicy/answer/12499303 - Business name and logo requirements
- S20 support.google.com/google-ads/answer/11559472 - RSAs with customized text (IF not supported)
- S24 support.google.com/google-ads/answer/2375474 - Seller ratings
- S25 support.google.com/google-ads/answer/6280012 - Structured snippets
- S26 support.google.com/google-ads/answer/7065415 - Price assets
- S27 support.google.com/google-ads/answer/7367521 - Promotion assets
- S28 support.google.com/adspolicy/answer/6020955 - Misrepresentation
- S29 support.google.com/adspolicy/answer/176031 - Healthcare and medicines
- S30 support.google.com/google-ads/answer/2454041 - Keyword insertion
- S30b support.google.com/adspolicy/answer/2464998 - Financial products and services
- S31 support.google.com/adspolicy/answer/6118 - Trademarks
- S32 support.google.com/adspolicy/answer/1704381 - Fix a disapproved ad
- S33 support.google.com/google-ads/answer/13548268 - Campaign-level headlines and descriptions (borrowing across the ad group)
- S50 support.google.com/google-ads/answer/17051188 - Lead form CRM integration best practices (60-day storage, lead_id)
- S52 support.google.com/google-ads/answer/11259373 - About text customization in Search
- S54 support.google.com/google-ads/answer/15910187 - How AI Max for Search works
- S55 support.google.com/google-ads/answer/10724897 - Text customization in Performance Max (48-hour refresh, source labels)
- S56 support.google.com/google-ads/answer/7331111 - Assets overview ("four or more asset types")
- S59 support.google.com/adspolicy/answer/6368661 - Destination requirements index

**Google Ads API (a)**
- S21 developers.google.com/google-ads/api/docs/responsive-search-ads/overview
- S22 developers.google.com/google-ads/api/docs/assets/working-with-assets
- S23 developers.google.com/google-ads/api/docs/policy-exemption/overview
- S23b developers.google.com/google-ads/api/reference (AssetFieldType enum page reached; MutateGoogleAdsRequest, ServedAssetFieldType and PolicyTopicEntry pages returned the index only today)
- S31b developers.google.com/google-ads/api/docs/common-errors (AdError, AssetError, LINE_TOO_WIDE, DUPLICATE_ASSET)
- S40 developers.google.com/google-ads/api/docs/best-practices/partial-failures
- S40b developers.google.com/google-ads/api/docs/best-practices/overview
- S40c developers.google.com/google-ads/api/docs/concepts/call-structure
- S40d developers.google.com/google-ads/api/docs/mutating/overview
- S40e developers.google.com/google-ads/webhook/docs/overview

**Studies (b)**
- S34 optmyzr.com/blog/google-rsa-performance-study - 6 April 2026, about 20,000 accounts [V]
- S35 optmyzr.com/blog/google-ad-strength-study - 2 October 2024, 22,000+ accounts, 1M+ ads [V]
- S36 optmyzr.com/blog/optmyzr-study-responsive-search-ad-performance - 2023, 13,671 accounts [V]
- S36b optmyzr.com/blog/ad-strength-responsive-search-ads - 28 March 2023 [V]
- S37 searchenginejournal.com/ad-copy-tactics-backed-by-study-of-over-1-million-google-ads - October 2024 write-up of S35
- S41 ppc.land/ad-creative-study-reveals-surprising-trends-in-google-ads-performance-2 - 9 September 2024 write-up of S35
- S53 webtonic.io/blog/responsive-search-ads - 2026 summary quoting S34 and a Benchmarketing 2026 figure (8.4% against 5.8% conversion rate, full versus pinned-heavy)
- S61 searchengineland.com/google-ads-ai-maxs-automated-ad-copy-test-483557 - Brad Geddes, 28 July 2026

**Named practitioners and trade press (c unless quoting a or b)**
- S38 searchenginejournal.com/all-your-ad-strength-questions-answered/514092 - Ginny Marvin, 22 April 2024
- S39 searchengineland.com/google-call-ads-responsive-search-ads-format-447830 - 28 October 2024
- S42 auditsocials.com/platforms/google-ads-policy-guide - 2026 disapproval guide
- S43 searchscientists.com/adwords-help-sitelink-extensions - updated 10 August 2026 (cites the 2014 Google number)
- S44 ppc.land/google-ads-bans-blurry-image-assets-and-cuts-eligibility-to-60-day-accounts - 9 July 2026
- S45 lovesdata.com/blog/google-ads-assets - March 2026
- S46 ftc.gov press release, 14 August 2024 - final rule banning fake reviews (search summary; page blocked the fetch)
- S47 ftc.gov Consumer Reviews and Testimonials Rule Q&A and the 22 December 2025 warning letters (search summary)
- S48 adsworkbench.com/blog/google-ads-lead-forms - 19 October 2025
- S49 jjscit.com/google-ads-keyword-insertion-tactics - 30 July 2025 (unsourced DKI lift; logged as a myth)
- S51 mbadv.agency/google-ads/ad-assets-and-formats - May 2026
- S57 almcorp.com/news/google-ads-pinning-headlines-descriptions-responsive-search-ads-tips - 24 June 2026
- S58 almcorp.com/blog/google-ads-updates-2026 and /google-ads-2025-year-in-review - timelines
- S60 zatomarketing.com/blog/what-is-ad-strength-in-google-ads-and-does-it-actually-matter - Kirk Williams
- S62 searchengineland.com/google-to-auto-upgrade-some-search-campaigns-to-ai-max-484428 - Anu Adegbola, 6 August 2026
- S63 adalysis.com/blog/how-to-create-effective-ai-max-text-guidelines - 21 April 2026
- S64 ppc.land/inside-googles-search-ad-design-engine-tests-assets-and-ai-in-2026 - Google's format team on asset flexibility
- S65 ppc.land/google-ads-editorial-policy-updated-for-clarity - May 2024 clarification-only update
- S66 hawksem.com/blog/healthcare-ad-restrictions - updated 9 February 2026
- S67 brandllama.com/best-practices-for-google-responsive-search-ads-in-2025
- S68 oakinteractive.com/how-to-write-google-ads-that-outsmart-the-algorithm-in-2025 - 7 July 2025
- S69 customerlabs.com/blog/webhooks-google-ads-integration-setup - webhook payload notes
- S70 searchengineland.com/creating-better-ads-in-a-world-with-only-rsas-386377 - 11 July 2022 (two RSAs per ad group, 1.7M-ad Optmyzr figure)
- S71 groas.com/post/google-ads-updates-2026-every-major-change-campaign-impact - AI label disclosure field, Q1 2026
- S72 searchengineland.com/author/andrea-cruz - index; her 2025-2026 pieces are B2B and PMax, nothing RSA-specific to cite
- S73 zatomarketing.com/blog - index
- S74 adalysis.com/blog - index (AI Max evaluation, 20 August 2026)
- S75 searchengineland.com/library/channel/ppc/google-ads - index
- S76 stackmatix, roa-marketing, wordstream, klientboost, reddit - blocked or moved today (403, 404, 522); their claims were reached through the search summaries and are not relied on for any number here

**Repo field notes [F]** - `references/google-ads.md` and `references/ad-assets.md` (August 2026 API tests: star glyph rejected, DESTINATION_NOT_WORKING at create, LEAD_FORM_MISSING_AGREEMENT, business message call-to-action description), `context/compliance.md`, `references/ad-testing.md` (94 sources, testing and asset reporting), `Gads/setup/winning-ad-copy-patterns.md` (June 2026 swipe file, mined for section 3).
