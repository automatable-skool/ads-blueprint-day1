# Ad assets - what to write in the extras under the ad
Rebuilt 29 August 2026 from 87 sources · every asset has a tier, the exact limits, worked plumber examples, and the mistakes that waste the slot
Next: build the call asset, then 6 sitelinks, then 10 callouts - everything lands PAUSED, then the owner enables.

Read this before `/write-ads` builds anything at step 4, and check finished assets against the list at the bottom before enabling. Re-validate quarterly; Google's asset surface moves fast.

**Read `references/persuasion.md` alongside this file.** This one tells you what an asset IS and what fits in it; that one tells you what to put in it. Assets are where most of the persuasion budget gets wasted, because they get treated as filler once the headlines are done. The three sections that apply hardest here:

- **The six fears (section 4).** A callout is one short line, which makes it the cheapest place in the account to kill an objection. "Licensed and insured", "no overtime charges", "we answer 24/7" each answer a specific fear. "Quality workmanship" answers nothing and eats the same slot
- **Specificity (section 3).** "1,847 jobs completed" beats "thousands of jobs". Round DOWN, date it, and it has to exist in `context/proof.md` first
- **Nothing repeats.** A callout that restates a headline has spent a slot to say a thing that was already said. Assets earn their place by covering what the headlines could not fit

## How every claim is graded

- **(a)** Google documentation, policy page or API reference
- **(b)** A study or dataset with a stated sample size
- **(c)** Practitioner convention, or a single-account anecdote
- **[F]** Field-verified in this repo against the installed client library, 29 August 2026

---

## ⛔ Every asset is required

**Jono, 1 September 2026: sitelinks, callouts, structured snippets, the call asset, the lead form, the business name, the logo and messages all get built, every run.** The tiers below are a BUILD ORDER, not a menu - "tier 3" means build it third, never "build it if there is time". An asset left out is a slot a competitor fills, and the last run shipped with none of them because they were written into a file as "pending" instead of asked for. The only way one is left out is the owner asking for it in words, and then `code/push_assets.py --skip <name>` records that it was a decision. The script blocks the run otherwise.

## Build these three first

If you only have an hour, build the call asset, then sitelinks, then callouts. In that order, for this reason.

- **The call asset is first because a trades lead is a phone lead.** It is the only asset that closes the loop inside the results page. A sitelink still has to get the person to a page.
- **Sitelinks are second because they are the only asset Google's Ad Strength actually counts (a).** Ad Strength names headlines, descriptions and sitelinks. It does not name callouts or snippets.
- **Callouts are third because Google's callout policy is the only place a trust claim can live without repeating the ad (a).** Anything already in a headline is banned from a callout.

Start Advertiser Verification the same day, in parallel. Business name and logo carry **Google's largest published asset figure - 8% more conversions at a similar cost per conversion (a)** - and verification takes up to 5 business days.

**Be honest about the numbers.** There is no published study comparing lift across asset types. Every "sitelinks add 10 to 20% click-through" line in circulation is Google's blog post of **24 January 2014**, describing a results page that no longer exists. The only live Google figures are: business name and logo, 8% more conversions; six sitelinks, up to 3.5% more conversions at a similar cost per conversion; image assets, 6% more click-through from internal data of April 2023. Nothing for callouts or snippets. Say the mechanism, never quote a number you cannot source.

---

## Tier 1 - the call asset

The number the person taps. Attach at campaign level.

**The limits (a)**
- Format is strict E.164: `+14165551234`. No spaces, dashes or brackets, or it is disapproved as "Unverified Phone Number".
- Toll-free, standard, mobile, shared-cost and non-standard-cost numbers are accepted. **Vanity, premium-rate and fax numbers are rejected.**
- The number must be in service in the country you target and belong to the advertised business.
- Google verifies one of three ways: the exact number visible in the landing page source, the display domain verified in Search Console and linked to the account, or the Google Ads conversion tag on the page.
- Mobile shows a call button. Desktop shows a "Call us" button that reveals the number plus a QR code.
- Account, campaign or ad group. **Most specific level wins.**

**What to write and set**
- Schedule it to the hours a human answers. Google's own framing is "only when your business is answering phone calls". An after-hours tap that hits voicemail is a paid click and logs as a missed call.
- Turn call reporting on at account level. That is what swaps in a Google forwarding number.
- Set the "Calls from ads" conversion minimum to 1 second - any connected call is a lead, voicemail pickup included (Jono's ruling, `conversion-tracking.md`). Raise it only if the call details report shows real junk connecting, never pre-emptively.

**Which number - GoHighLevel or Google's?** For a single-location trade where Google Ads is the main paid channel: **Google forwarding number in the ad, GoHighLevel number with dynamic insertion on the website only.** Since 21 April 2026 the forwarding number is how Google's AI reads the recording and decides whether the call showed real buying intent (US and Canada). Put a third-party number in the ad and you drop to Google's weakest fallback signal and starve the bidding. Switch to a GoHighLevel number in the ad only when the business runs several paid channels and needs one call log, or is outside the US and Canada - and then **import qualified calls back as offline conversions**, or you have quietly broken Smart Bidding.

**⛔ The call recording Terms have to be accepted in the UI before the API will create a call asset [F, 1 September 2026].** Google returns `CALL_CUSTOMER_CONSENT_FOR_CALL_RECORDING_REQUIRED` and there is no API field for the consent - it does not live on `Customer.call_reporting_setting`, and every `call_conversion_reporting_state` (DISABLED, account-level, resource-level, unset) is refused identically. Probed four ways on a live account before writing this down. Accept it once in Google Ads under Settings, then the asset creates normally. Call reporting being enabled is NOT the same thing and does not satisfy it.

**Never put a Google forwarding number on a van, a business card, the website footer, or in a citation.** It is Google's property and can be reassigned.

**Two things that changed**
- **Call-only ads are finished (a).** No new ones since February 2026; all stop serving February 2027. There is no automatic migration - a responsive search ad plus a call asset is the only path.
- **Call recording defaults ON since 1 July 2026** for accounts that never made a choice. Google plays an automated disclosure, which does not by itself satisfy two-party-consent law in places like California. Decide deliberately.

**The 15-second number is not what you think.** Fifteen seconds is when Google will show you the caller's phone number. It has nothing to do with conversions. The conversion length is a separate setting.

**API [F]:** `call_asset` · `country_code`, `phone_number`, `call_conversion_reporting_state`, `call_conversion_action`, `ad_schedule_targets`. Field type `CALL`.

---

## Tier 1 - sitelinks

Two to eight extra links under the ad, each to its own page.

**The limits (a)**
- Link text: **25 characters**, 12 in double-width languages. Aim for 12 to 15 so it survives the mobile carousel.
- Descriptions: two lines of **1 to 35 characters**. They come as a pair - the API rejects one without the other.
- **Minimum 2 to show at all.** Desktop shows up to 6, mobile up to 8 in a carousel. Video and Demand Gen show 4.
- You can create 20 per level. **Build 6.** Google's Ad Strength wants 6 or more, and Google's own figure of 3.5% more conversions is measured at 6.
- Account, campaign or ad group. Campaign and ad group **override** account.
- Schedulable by date, day and hour, with a mobile device preference.

**Level follows the words, and campaign is not automatically the answer (Jono, 1 September 2026).** Account level cross-contaminates a multi-service account - a roofing ad showing plumbing links. But a campaign does the same thing the moment it holds more than one theme: a campaign with "SEO audit", "SEO agency" and "SEO for trades" in it is three different buyers, and one campaign-level sitelink set shows all three the same links.

**Jono's ruling, 1 September 2026: put them on the AD GROUP.** It is the most granular level that exists - the API's only writable asset links are customer, campaign, ad group and asset group (Performance Max), so there is no ad-level link, and an ad-group asset serves under the ads in that ad group and nowhere else. The cost is real and second-order: the data splits so thin no single sitelink reaches the 500 impressions a read needs. Showing the wrong links to two thirds of your traffic is the bigger loss. `code/push_assets.py` defaults to `--level adgroup`; `--level campaign` is the override for a campaign that genuinely holds one theme.

**Expect 3 or 4 of your 6 to actually render (c).** That is normal.

**Are descriptions worth writing? Yes.** They are free, they do not cost you sitelink slots, and they are the only place to pre-qualify a click. But they show only when Google predicts they help, and they rarely show on mobile - which is most trades traffic. So write them, and never put the value proposition inside them.

**What they should point at.** Intent, not navigation. Drop About and Contact entirely: the call asset already handles contact, and nobody with a burst pipe is shopping for your company history. The six that earn their place for a trade:

- Pricing or upfront cost
- Emergency or same-day
- Reviews
- Financing
- Service areas
- Book online or free quote

**Worked example, a Toronto plumber**

- `Upfront pricing` · `Flat rate, quoted first` · `No surprise charges` → /pricing
- `24/7 emergency` · `On site within 60 minutes` · `Answered day and night` → /emergency · scheduled to nights and weekends
- `Read 482 reviews` · `4.9 stars from real jobs` · `Named, dated, verified` → /reviews
- `Financing from $0 down` · `Approval in 2 minutes` · `Repipes and water heaters` → /financing
- `Areas we serve` · `Toronto and the GTA` · `Same-day in most suburbs` → /areas-served
- `Book online` · `Pick your slot in 60 seconds` · `Confirmation by text` → /book · scheduled to business hours

Every one of those is 25 characters or fewer, each description line 35 or fewer, and each points at a different real page.

**The mistakes that waste the slot**
- **Reusing link text is a policy violation (a)**, even when the two links go to different pages. Google's own wording: using the same link text for more than one sitelink.
- **The sitelink domain must match the ad's domain (a).** Narrow exceptions exist for named third parties like YouTube and LinkedIn, and then the link text has to carry the full domain.
- **Two sitelinks pointing at the same page, or at pages with substantially the same content, get suppressed.** Google has enforced this since 2012.
- **Pointing a sitelink at the ad's own final URL** burns the slot.
- **Linking the homepage.** It is not a distinct destination.
- **Duplicating a headline word for word** spends an extra line saying the same thing twice.
- **404s.** Fetch every URL live before writing it, and re-crawl all six at every review. Build the page first if it does not exist.
- **Attention-grabbing punctuation** - exclamation marks, leading punctuation, arrow symbols - is banned (a).

**Your own headlines now compete for the slot (a).** Since 20 February 2025, up to two unpinned responsive search ad headlines can serve in the sitelink slot, pointing at the ad's own final URL. Google confirmed in February 2026 that this is permanent, not a test. Two consequences: **write every unpinned headline so it would still make sense as a clickable link**, and **pin any headline that must never render as one** - pinning is the only control, and there is no opt-out.

**API [F]:** `sitelink_asset` · `link_text`, `description1`, `description2`, `start_date`, `end_date`, `ad_schedule_targets`. Field type `SITELINK`. **`final_urls` goes on the `Asset`, not inside `sitelink_asset`** - this is the most common sitelink bug.

---

## Tier 1 - callouts

Short claims under the ad. Not clickable.

**The limits (a)**
- **25 characters**, 12 in double-width languages. Aim for 12 to 18 so more survive truncation.
- **Minimum 2 to serve. Up to 10 can show**, depending on spacing, browser and device - realistically 2 to 6 on desktop.
- Build 8 to 10. The "20 per level" everyone quotes is a UI convention, not a documented limit.
- Desktop renders them on one line separated by dots. Mobile and tablet wrap them into a paragraph.
- Schedulable by date, day and hour. **Mobile preference only** - there is no desktop-only option.

**Pick one level and stay there.** Callouts do not stack the way sitelinks do. **A single ad-group callout makes every campaign and account callout ineligible for that ad group (a).** So if you add any at ad group level, that set has to be complete on its own.

**The repetition rule is a policy, not a tip (a).** Google's exact wording: callout text "can't repeat within a callout or from other callouts, ad text, or sitelink text within the same ad group, campaign, or account." Their example: if the ad says "Free shipping", a callout saying "Free shipping" is **disapproved**. Check every callout against the responsive search ad headlines, the descriptions, and the sitelink text before writing it.

**What job do they do?** They are not clickable, so they cannot earn a click. They do two things: add vertical height so the next advertiser gets pushed down, and carry a trust or eligibility claim that will not fit in the ad. Assets are an input to Ad Rank and an ad needs a minimum Ad Rank before extras show at all - that is the defensible argument. **They do not raise Ad Strength; Google does not name them there.**

**Worked example, a Toronto plumber** - character count in brackets

- `Licensed and insured` [20] - the highest-trust eligibility signal in the trades, and it is checkable
- `Same-day service` [16] - answers the one thing an emergency searcher needs
- `No overtime charges` [19] - the top objection on a 9pm burst pipe, and most competitors do charge it
- `Flat-rate pricing` [17] - kills the "what will this end up costing" fear, and it is concrete where "great prices" is not
- `Free on-site estimates` [22] - a real offer stated as an attribute
- `On site in 60 minutes` [21] - a number, not an adjective
- `Serving Toronto since '12` [25] - local proof and longevity in one slot, and it beats "family owned" because it carries a date
- `Background-checked techs` [24] - the stranger-in-my-house objection, which nothing else in the ad addresses
- `Financing from $0 down` [22] - unlocks the repipe and water-heater jobs where price is the only blocker
- `2-year labour warranty` [22] - risk reversal

Set design: the first four are the always-on account-level core. `On site in 60 minutes` and the emergency line get scheduled. `Serving Toronto since '12` belongs at campaign level if you run city campaigns - but remember, if you ever add an ad-group callout, you have to repeat the core four down there.

**Bad examples and why**
- `24/7 Support!` - the exclamation mark is a policy violation and "support" is not what a plumber sells.
- `Best Plumber in Toronto` - a superlative with no third-party proof.
- `24/7 · Licensed · Insured · Bonded` - four claims in one slot. One claim per callout.
- Anything already in a headline. That is a disapproval, not a style note.

**Rules**
- One claim per callout.
- Every number traceable to `proof.md`. Spell out "stars".
- Cover four angles: speed, trust, price, guarantee.
- Differentiated beats generic. If every competitor runs it, it is wasted.

**API [F]:** `callout_asset` · `callout_text`, `start_date`, `end_date`, `ad_schedule_targets`. Field type `CALLOUT`.

---

## Tier 2 - business name and logo

Worth a slot in tier 2 only because it is gated. On the numbers it would be tier 1.

**The gates - both required (a)**
- Completed **Advertiser Verification**. Up to 5 business days, up to 30 in rare cases. If Google assigns you a deadline and you miss it, the account pauses and the deadline cannot be extended.
- **Search spend in the last 28 days.** No spend, no serving, even after verification.
- Uploaded assets then take up to 2 business days to review. Until they clear, the ad shows a placeholder globe plus the display URL.

**Business name (a)**
- **25 characters.**
- Must exactly match the **verified domain root** or the verified legal entity name, and must be clearly present on the landing page. **This is not the brand name, and the difference is not cosmetic** - on a live account on 1 September 2026 the brand name ("Acme") was disapproved while the verified domain (`acme.co`) was accepted. When the Google Ads account is named after the domain, use the domain. Keep the brand name for the lead form's `business_name`, which has no such rule.
- **No keywords.** "Emergency plumber Toronto" is rejected.
- A different trading name needs brand verification against an active trademark.

**Logo (a)**
- Square 1:1 only. PNG or JPG. **1200x1200 recommended, 128x128 minimum, under 5120 KB.**
- Must read in light and dark mode. Rendered as a circle at 28x28, so fine detail and edge-to-edge artwork are destroyed.
- Must appear on the landing page. Google checks.
- Disapproved: blurry, poorly cropped, colour-inverted, distorted, a single block of colour, or mismatched to the business.

**⛔ A disapproved business name CANNOT be fixed by creating it again [F, 1 September 2026].** Google deduplicates text assets: creating an asset with identical text resolves to the SAME asset id and it keeps its old verdict. On a live account, the brand name was disapproved, recreated, and came back as the same asset id with `ASSET_DISAPPROVED` still on it. The only route is **Appeal** in the UI on that asset. Reason **Dispute decision** when the landing page did not change - claiming "Made changes to comply" for a change never made is what triggers Google's limit on appeals. Scope it to **business names**, not every extension in the account.

**The disapproval you will actually hit is "Business Information - Name Prominence."** The name has to be readable as TEXT on the landing page - `<title>`, the header wordmark and the footer all count, an SVG logo with no text does not - and it has to match the advertiser's verified identity. Worth knowing: on that same account, the brand form was disapproved while the Google Ads account was still named after the domain, and the domain form went straight to review. If the brand form keeps failing, put the wordmark in the H1 area of the page, or fall back to the domain form. Check the page before appealing: fetch it and count the visible occurrences of the name.

**Turn off "Dynamic business information"** once you have uploaded a real name and logo, or Google's crawled version can serve instead.

**API [F]:** business name is a plain `text_asset` linked with field type `BUSINESS_NAME`. The logo is an `image_asset` created from raw `data` bytes and linked with field type `BUSINESS_LOGO`.

---

## Tier 2 - location assets

The only asset that puts a real address and a verified phone beside the ad. Worth it for a trade.

- **It holds no data of its own (a).** It pulls address, phone, hours and photos from a linked Google Business Profile through Location Manager. To fix a wrong address, edit the Business Profile, not Google Ads.
- On Search it appends the address and phone. **On Maps it can appear beside, above or below Maps results, including in the app** - that is the real reason to turn it on.
- Phone numbers on the profile are verified against the business, so a tracking number that does not match the profile is the usual failure.
- **A profile marked temporarily or permanently closed stops the asset serving.** Do not mark yourself closed over a holiday.
- Allow 24 to 48 hours for a link or an edit to sync. Unverified locations never appear.
- The service must actually be available at the address.

**Service-area business with a hidden address:** the asset degrades to little more than a city label. Some operators leave it off rather than imply a walk-in premises. Judgement call.

**Affiliate location assets are not for trades (a).** They exist for manufacturers selling through retail chains, and for auto dealers. If someone recommends them for a plumber, they have confused the two.

**API [F]:** location assets attach through `AssetSet` and `CampaignAssetSet`, **not `CampaignAsset`** - there is no `LOCATION` value in the field-type enum.

---

## Tier 3 - structured snippets

A fixed header plus a list. Not clickable. Ten minutes of work, low ceiling.

**The limits (a)**
- **13 fixed headers:** Amenities, Brands, Courses, Degree programs, Destinations, Featured hotels, Insurance coverage, Models, Neighborhoods, Service catalog, Shows, Styles, Types.
- **"Services" is not a header. It is "Service catalog."** Using "Services" fails.
- **3 values minimum to create, 4 or more recommended, 10 maximum**, each 1 to 25 characters.
- Desktop shows up to 2 headers. **Mobile shows 1.** That single-header cap on mobile is why this is tier 3 for a trade.
- Account, campaign or ad group; more granular overrides higher.

**Which headers a trade can honestly use (a)**
- **Service catalog** - Google's definition is "services performed in exchange for money". This is the primary one.
- **Types** - variations of a category.
- **Brands** - only brands you genuinely carry and install.
- **Neighborhoods** - sub-regions or districts within a city. **City names are explicitly banned**, which is how most trades misuse it. Skip unless you truly serve named districts.

**Ship at most 2 headers for the whole account.** Do not build a per-ad-group snippet matrix - the mobile cap kills the return.

**Worked example, a Toronto plumber**

**Service catalog:** Drain cleaning · Water heater repair · Burst pipe repair · Sewer line repair · Leak detection · Toilet repair · Repiping · Sump pump install

Every value is a literal service performed for money, which is the exact policy definition, so it will not be disapproved. All under 25 characters. Eight values gives Google room to pick the three or four that match the query, so even the single mobile header lands three real service names under the ad.

**Brands:** Rheem · Navien · Bradford White · Moen · Rinnai · Kohler

Real manufacturers the business actually installs. Catches brand-modified searches like "Rheem water heater repair near me" and signals proper equipment rather than generic parts. Short values mean more render before truncation.

**Deliberately not in either snippet:** "Free estimates", "24/7", "Emergency", "Best plumber". The first two are promotional claims, which is a **policy violation in a snippet value**. The third is not a service name. The fourth is unverifiable. All belong in callouts, if anywhere.

**Callout or snippet? One line.** Callouts sell the value, snippets enumerate the offering. "24/7 emergency service" is a callout. "Drain cleaning" is a snippet value. Never the reverse.

**The mistakes**
- **Header-value mismatch.** Google names this the most likely reason snippets get disapproved.
- **Repeating a value** within a header or across headers.
- **Comma-joining two items into one value field.** Enter them separately; Google adds the commas.
- **Promotional text in a value.**
- Brands under Types. Cities under Neighborhoods.

**API [F]:** `structured_snippet_asset` · `header`, `values`. Field type `STRUCTURED_SNIPPET`.

---

## Tier 3 - lead form

Run it as an after-hours and non-emergency supplement, never as the main path.

**Eligibility, and it loosened on 20 July 2026 (a)**
- The **$50,000 lifetime spend gate is gone** from Google's documentation. Check the account rather than promising a client access - it was a documentation change and the engine may not have moved.
- Still required: good policy history, an eligible vertical, a reachable privacy policy linked in the form, a conversion-focused bid strategy, and optimisation toward the Google lead form conversion goal. Responsive search ads only.
- Display placements and Search ads whose headline opens the form directly additionally need over $1,000 spend on the account (or $15,000 across accounts) plus Advertiser Verification.
- First-party advertisers only. No lead resellers.

**The storage trap (a).** Leads live in Google for **60 days**. The CSV export only reaches back **30**. A lead that never leaves Google is gone permanently at day 60. **Wire the webhook before the first lead lands.**

**The webhook contract (a)**
- A URL plus a key you choose. Google sends one HTTP POST per submission.
- **Respond HTTP 200 with an empty JSON object.**
- **Validate `google_key`** before processing - it is the only authenticity check there is.
- **De-duplicate on `lead_id`.** Google says a lead can arrive more than once.
- **4XX is non-retryable** - a bug in your endpoint loses the lead permanently. 5XX is retried.
- Ignore fields you do not recognise; Google warns it will add more.
- "Send test data" must return 200 before the form saves. Confirm the row lands in GoHighLevel.

**What to write**
- Fields: **first name, last name, email, phone.** `FIRST_NAME`, `LAST_NAME`, `FULL_NAME` and `COMPANY_NAME` are all in `LeadFormFieldUserInputTypeEnum` [F, re-verified 1 September 2026 against the installed library]. **Use first and last as separate fields** (Jono, 1 September 2026) - the CRM wants them apart, because a greeting merge tag needs the first name on its own and "Hi John Smith," reads like a bill. An earlier version of this file claimed FIRST_NAME and LAST_NAME did not exist. They do; the claim was wrong and it shipped into the push script.
- **One or two qualifying questions maximum.** Three or more cuts submissions without improving quality.
- There is no free-text message field, so never promise one.
- Set `desired_intent` to `HIGH_INTENT` when quality matters more than volume.

**Lead quality, honestly.** No study with a stated sample compares lead form quality to landing page quality. The consistent practitioner line is more leads, lower cost per lead, lower quality - because pre-fill from a signed-in Google account removes exactly the friction that filters browsers. A usable benchmark: **if the contact rate drops below 40 to 50%, the quality problem is real.** Google's own 2026 lead intent scores feature is an implicit admission.

**When not to use it**
- Emergency intent. A burst pipe converts on a call, not a form.
- Any offer that needs the licence number, the reviews, the service area and the guarantee visible. That is a landing page job.
- Any account with no webhook wired on day one.

**Accept the Lead Form Terms of Service in the Google Ads screen first**, or the API returns `LEAD_FORM_MISSING_AGREEMENT`. There is no API path for the agreement.

**API [F]:** `lead_form_asset` · `business_name`, `headline`, `description`, `privacy_policy_url`, `call_to_action_type`, `call_to_action_description`, `post_submit_headline`, `post_submit_description`, `fields`, `custom_question_fields`, `delivery_methods`, `desired_intent`, `custom_disclosure`. Field type `LEAD_FORM`.

---

## Tier 3 - business messages

**Required by Jono (1 September 2026), and thinner on evidence than everything above it - treat this section as the honest state of what is known, not a settled spec.**

The old click-to-message SMS extension is gone. What exists now is the business message asset, which hands the searcher off to a chat thread instead of a call or a form. It is the third contact path beside the phone and the lead form, and it catches the person who will not call and will not fill anything in.

**What the API takes [F]** - field-verified against the installed client library, 1 September 2026:
- `business_message_asset` · `message_provider` (WHATSAPP, FACEBOOK_MESSENGER, ZALO), `whatsapp_info` (`country_code` + `phone_number`), `starter_message`, `call_to_action` (`call_to_action_selection` from APPLY_NOW, BOOK_NOW, CONTACT_US, GET_INFO, GET_OFFER, GET_QUOTE, GET_STARTED, LEARN_MORE, plus a description). Field type `BUSINESS_MESSAGE`.
- The number is E.164, same as the call asset, and it has to be a real WhatsApp Business number the business controls.
- The starter message is what lands in the thread pre-typed. Write it as the customer, not as the business: "Hi, I'd like a quote for a burst pipe" beats "How can we help?"

**⛔ SMS is the one you want, and the API cannot build it yet (1 September 2026).** Google added SMS to message assets on 11 July 2026 - a native Google Messages preview with a "Send message" prompt, a 140-character starter message, and conversions folded into the existing account-level message asset goals. Setup is simpler than WhatsApp Business, which is the whole point for a trade. **But `BusinessMessageProviderEnum` in the installed client offers only WHATSAPP, FACEBOOK_MESSENGER and ZALO**, and the newest published `google-ads` library (31.4.0, December 2025) predates the launch, so upgrading does not fix it. **Build the SMS message asset in the Google Ads UI**, and never substitute a WhatsApp asset for it - a WhatsApp asset on a number that is not a WhatsApp Business line does not serve. Re-check the enum each quarter; the moment SMS appears, `push_assets.py` should build it.

**What is NOT established here:** no lift figure, no sample, no Google-published comparison against a call asset or a lead form. Serving eligibility by country and vertical has not been verified against a live account in this repo. `push_assets.py` builds it and lets Google's `validate_only` be the arbiter - if it comes back rejected, that answer goes in this section rather than being worked around.

**Whose number.** A normal GoHighLevel number is fine for SMS - it does not have to be a WhatsApp-only line (Jono, 1 September 2026). The same logic as the call asset: a message thread is a real conversation, so it belongs on the number the business actually answers, and the replies have to land somewhere a human reads within minutes. An unanswered WhatsApp is worse than no message asset, because the searcher has already chosen the slowest path they were willing to take.

---

## Tier 4 - build only if the condition is true

**Promotion asset - build one, no occasion.** A trade almost always has a real standing offer that fits: "$49 diagnostic", "$100 off water heater install". Use the **no-occasion** version so the 6-month expiry never applies. Occasion-specific assets must be created or edited within 6 months of their start date or they stop serving, and nobody buys a furnace because it is Mother's Day. The promo code field must contain a real code and nothing else. The offer has to be findable on the landing page or it is an unavailable-offer violation.

**Price asset - only with a real published fee.** 3 items minimum, 5 or more recommended, up to 8 cards, 25 characters per header and 25 per description. Use the "From" qualifier. A real call-out or diagnostic fee ("Drain camera, from $149") self-qualifies price shoppers out before the click, which is the whole game. A fake "From $89" that becomes $600 on site books calls that cancel. **One impression can be charged for two clicks**, so a price set that draws browsers doubles the cost of that impression.

**Image assets - only after 60 days.** The account must be open at least 60 days, have active text ads, clean policy history and Search spend above zero in the last 30 days. Square 1:1 is required at 300x300 minimum, 1200x1200 recommended; 1.91:1 is optional at 600x314 minimum. Under 5120 KB. Important content in the centre 80%. **Text, logos and graphic overlays are disapproved on sight**, along with blur, collages, distortion and bad crops - which rules out exactly what an owner wants to upload: the van with the phone number painted on it, a before-and-after split, a "10% off" graphic. Shoot real photos of real work. Google's lift figure is 6% click-through from internal data of **April 2023** and has never been refreshed; it says nothing about cost per lead. Judge them on cost per lead.

**Seller ratings - do not chase them.** **Google Business Profile reviews do not feed seller ratings.** Four hundred five-star Maps reviews earn nothing here. You need roughly 100+ reviews from the last 24 months through Google Customer Reviews or an approved partner, at 3.5 stars or better. Most single-location trades will never qualify. Put the effort into the Business Profile instead, which feeds the location asset.

**Skip entirely:** app assets unless an app exists · affiliate location assets, which are for manufacturers and auto dealers · occasion-based promotions.

---

## Turn Google's own versions off

Google writes nine kinds of asset for you by default. Once you have a hand-written set, most of them can only displace it.

**Turn off:** dynamic sitelinks · dynamic callouts · dynamic structured snippets · dynamic business information · dynamic image assets · automated promotions · site visits.

**Leave on:** seller ratings · automated location assets.

**The path (a):** Campaigns → Assets → Associations tab → three-dot menu → Account level automated assets → three-dot → Advanced settings → pick the asset → choose a reason → Save.

**Check the campaign level too. It overrides the account level.** Turning something off at account level does not guarantee it is off on a campaign with its own setting.

**Why.** Google's dynamic sitelinks "may show alongside **or instead of** manually created sitelinks". No study compares dynamic against manual in either direction, so this is a control decision, not a performance one - and the "instead of" clause is the tie-breaker. The documented failures are real: a florist whose automated assets surfaced funeral arrangements, a gym whose ads promoted management software.

**The 1 September 2026 deadline.** Search campaigns still on automatically created assets, or on campaign-level broad match, are auto-upgraded to AI Max with **text customization and search term matching ON by default**. Google emailed advertisers on 5 August 2026; upgrades run through end of September. Off-switch: Campaigns → Settings → tick the campaign → Edit → AI Max → Asset optimization → untick Text customization → Save. Disabling it also disables final URL expansion. `code/disable_auto_assets.py` does this and checks it.

If a client insists on keeping it, load text guidelines: up to **25 excluded terms** of 30 characters and up to **40 instructions** of 300 characters. Start with the NEVER SAY list.

From September 2026 onward, expect assets you did not write to appear in the account. Filter them out of any performance read.

---

## Where to attach each asset

Assets are reusable objects. The link is separate, and the link carries its own status.

**The split that decides the level: does the text change with the service or the buyer?**

- **Ad group level (the default):** sitelinks, callouts, structured snippets, the call asset and messages - everything Google accepts this low. These carry service-specific words, and the wrong words in front of the wrong buyer costs more than thin data. Remember the callout trap - an ad-group set must carry the universal claims too, because one ad-group callout makes every campaign and account callout ineligible there.
- **Campaign level:** the lead form only. Google accepts nothing lower for it.
- **Account level:** universals - "Licensed and insured", "4.9 stars from 482 reviews". Business name and logo (one per account).
- **Campaign level:** everything else by default. Theme-specific claims and the sitelink set.
- **Ad group level:** only above roughly 20 ad groups, and only when a service genuinely needs its own set.

**The level rules - checked against Google's own page on 29 August 2026, because the older "most specific level wins" advice is out of date:**
- **Sitelinks POOL, they do not override (a).** Google: sitelinks created at higher levels "are eligible to serve with sitelinks created at lower levels when they're predicted to improve your performance", and Google picks the best from the eligible pool. So a campaign set and an account set compete together rather than one replacing the other.
- **Callouts and structured snippets:** the older documentation described a most-specific-level-wins model, and Google's current asset pages describe the same pooled, performance-predicted selection used for sitelinks. **Treat this as unverified (c) rather than a rule** - the safe build is a complete set at ONE level, which is correct under either model.
- **Practical rule that survives both models: pick one level per asset type and make that set complete.** Do not split a callout set across two levels hoping they add up.

**For a single-STAG build, put everything at campaign level.** The ad editor's asset panel only displays campaign-level associations, so ad-group assets serve fine but look invisible there. There is no ad-level attachment in Google Ads at all.

**Field notes [F]**
- When a STAG needs its own assets and the client wants to see them in the editor, link the same asset at both levels. Double-linking is harmless; the ad-group link wins.
- Associations carry their own enabled or paused status, separate from the asset and the campaign, and paused associations are invisible in the summary views. To see what exists, use the Assets page, Table view, status filter "All", or query `campaign_asset` and `ad_group_asset` in GAQL.
- Spend is gated by campaign, ad group and ad status, so "everything lands paused" is satisfied with enabled associations under a paused campaign when demo visibility matters.
- **Assets can never be deleted.** Sitelink, callout, snippet, call, price, promotion and lead form assets can be updated with an `update_mask`; text, image and video assets cannot. To retire one cleanly, set the link status to **`REMOVED`, not `PAUSED`** - paused links still count toward the account's asset limit.
- Create once, link many, or `DUPLICATE_ASSET` fires. Query existing assets and reuse them rather than relying on the error - for images Google silently renames and creates a second copy instead of failing.
- Documented limits are account-wide only: 250,000 ad-group-level assets per account, 50,000 campaign-level, 10,000 ad-group-level per campaign. The "20 per type per level" figure is a UI convention.

---

## Reading the numbers afterwards

- Per-asset **impressions, clicks, click-through rate, cost and conversions** exist for sitelinks, callouts and snippets, but **only for dates from 5 June 2025**. Clamp every query to that floor.
- **Segment by Click type**, or the clicks column counts clicks anywhere on the ad, not on the asset. One agency's worked example: 41,604 apparent sitelink clicks were 307 real ones.
- **Totals do not equal the sum of the rows.** If four sitelinks appear in one impression, each row shows 1 impression and the total row shows 1.
- **The bare `asset` resource carries conversion metrics only** - no impressions, clicks or cost. Query `campaign_asset` or `ad_group_asset` instead.
- **Performance labels (Low, Good, Best) are deprecated** for these assets. Read the metrics.
- **Judge nothing early.** 500 impressions on an asset and 2,000 on the ad before the data means anything; for a swap decision, 100 asset-attributed clicks and 14 days. Never judge an asset whose status is anything but eligible - a limited asset has suppressed numbers, not bad ones.
- **Filter to advertiser-created assets** before ranking, or you are comparing your copy against Google's.

---

## Before you enable anything

**Call asset**
- [ ] Real, in-service, in-country number in E.164 with no spaces
- [ ] Search Console linked and the display domain verified
- [ ] Scheduled to hours a human answers
- [ ] Call reporting on at account level, conversion length set to 1 second
- [ ] Call recording decision made deliberately, consent law checked

**Sitelinks**
- [ ] 6 at campaign level, never fewer than 4
- [ ] Link text 25 or fewer, aiming 12 to 15; both description lines written, 35 or fewer each
- [ ] Every URL fetched live today, each a distinct page on the ad's own domain
- [ ] No homepage, no ad final URL, no near-duplicate pages, no reused link text
- [ ] Intent targets only - no About, no Contact, no bare Blog
- [ ] Emergency and seasonal ones scheduled

**Callouts**
- [ ] 8 to 10 at one level, 25 characters or fewer each
- [ ] Every one checked against the ad headlines, the descriptions and the sitelink text - repetition is a disapproval
- [ ] One claim each, every number in `proof.md`, "stars" spelled out
- [ ] No exclamation marks, symbols or shouted capitals
- [ ] Four angles covered: speed, trust, price, guarantee

**Structured snippets**
- [ ] Header is "Service catalog", never "Services"
- [ ] 6 to 10 values, each a noun under 25 characters, no offers or adjectives
- [ ] One item per field, no repeats within or across headers
- [ ] Every value is on the landing page

**Business name and logo**
- [ ] Advertiser Verification complete, Search spend in the last 28 days
- [ ] Name 25 or fewer, matches the domain or legal name, no keywords, visible on the page
- [ ] Logo square 1200x1200 PNG, no text, readable in dark mode, present on the landing page

**Lead form**
- [ ] Privacy policy link live, conversion bid strategy and lead form goal set
- [ ] Webhook wired to `LEAD_WEBHOOK_URL`, "Send test data" returned 200, row landed in GoHighLevel
- [ ] `google_key` validated, `lead_id` de-duplicated
- [ ] One or two qualifying questions maximum
- [ ] Terms of Service accepted in the UI first

**The campaign**
- [ ] Dynamic sitelinks, callouts, snippets, business information and images all OFF at account and campaign level
- [ ] Seller ratings and automated location left ON
- [ ] Text customization OFF, checked by script
- [ ] Every association PAUSED or under a PAUSED campaign
- [ ] Nothing enabled by Claude; the owner enables

---

## What changed in this revision

- **Priority is now stated and defended.** The file opens with "build these three first" - call asset, sitelinks, callouts - and says out loud that no study comparing lift across asset types exists, so the order comes from mechanics. The three Google-published figures (8% for name and logo, 3.5% at six sitelinks, 6% for images in April 2023) are the only numbers quoted, each with its source.
- **Every asset now says what to write.** Six worked plumber sitelinks with live descriptions and targets, ten worked callouts with character counts and the reason each works, two worked snippets with the values that would be disapproved and why. The previous file listed asset types and limits; it never said what to put in them.
- **Sitelink targets rewritten from navigation to intent.** About and Contact are dropped; pricing, emergency, reviews, financing, service areas and book-now replace them. The repo's `standard-pages.md` six-page list is right as a site build but wrong as a sitelink set.
- **Callout level behaviour corrected.** The previous file said "higher levels serve alongside lower ones" for everything. That is true for sitelinks only. For callouts and snippets, one granular asset makes every higher-level one ineligible.
- **The callout repetition rule upgraded from tip to policy**, with Google's verbatim wording, and extended to sitelink text - which nothing in the repo currently checks.
- **"Services" flagged as a broken header.** It is "Service catalog". An early demo script once hard-coded the wrong one.
- **The 15-second call figure corrected.** It is when Google shows you the caller's number, not when a call counts as a conversion. The conversion length is a separate setting; this repo sets it to 1 second.
- **"Google places test calls" removed.** No Google documentation supports it. Verification is source-code crawl, Search Console, or the conversion tag.
- **Call assets gained** the GoHighLevel versus Google forwarding number ruling with its reasoning, the AI-qualified call leads change of 21 April 2026, and the call recording default of 1 July 2026.
- **Lead forms gained** the removal of the $50,000 gate on 20 July 2026, the full webhook contract including the 4XX-loses-the-lead rule, the `FULL_NAME` correction (there is no `FIRST_NAME` or `LAST_NAME`), the `desired_intent` lever, and the honest note that no lead-quality study exists.
- **New: location assets** - what they inherit, what they add on Maps, and the closed-profile trap.
- **New: reading the numbers** - the 5 June 2025 data floor, the Click type segment, why totals do not sum, and the impression thresholds before a swap decision means anything.
- **Seller ratings corrected:** Google Business Profile reviews do not feed them, so most trades will never qualify. Stop chasing it.
- **Image assets corrected:** the ratios are 1:1 and 1.91:1 for Search, not 4:3. The 6% figure is dated to April 2023 and never refreshed.
- **Automated assets expanded to all nine types** with the exact navigation path and the note that campaign-level settings override account-level.
- **The 1 September 2026 AI Max migration** given its own dated block with the off-switch and the text-guidelines fallback.
- **API notes tightened [F]** against the installed library: `final_urls` lives on `Asset` not `SitelinkAsset`; there is no `LOCATION` field type, location goes through asset sets; assets can be updated but never deleted; retire with `REMOVED` not `PAUSED`; `validate_only` does **not** catch broken destinations, so crawl URLs separately.
