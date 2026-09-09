# Campaign build - the file /campaign-plan follows exactly
Rebuilt 28 August 2026 from 62 sources (Google help and API docs first, then Adalysis, Optmyzr, SEL, SEJ, ppc.land, Kirk Williams, Amalia Fowler) · one campaign per service, STAG ad groups, everything lands paused
Next: confirm the plan Claude reads out of the files, then approve it before anything touches the API.

Keep this file at `references/campaigns.md`. The build takes the campaigns and STAGs from `keyword-list.md` and creates real campaigns, ad groups, keywords and starter ads in your Google Ads account through the API, with EVERYTHING landing paused. Nothing spends a dollar until you review it in the UI and turn it on.

**How claims are graded in this file**
- (a) Google's own help or API documentation, or Google staff on record
- (b) two or more independent practitioners, or one study of 10,000+ campaigns
- (c) one source, or a house rule we have not tested yet

---

## What Claude asks before building

**Most inputs already exist in the project.** Campaigns and ranked STAGs come from `keyword-list.md`. The service area comes from `context/business.md`. Ad copy claims come from `context/proof.md`. What we don't do comes from the DON'T DO section of `context/business.md`. Compliance rules come from `context/compliance.md`. Claude must NOT re-ask anything a file already answers.

Where each input lives - and the one question left:

- **Monthly budget** - `context/business.md` "Market and budget". Claude divides by 30.4 for the daily figure and runs the two budget tests in the Budgets section to size the single campaign and say how many ad groups it can honestly test. Blank → ask once, write it there.
- **Google Ads customer ID** - `GOOGLE_ADS_CUSTOMER_ID` in `.env`, set by `/api-setup`. Never asked.
- **Which ad group goes live first** - never an open question, and never re-ranked. **The recommendation is always `keyword-list.md` order, top down**: #1 goes live, #2 and #3 are the paused bench, in that exact order. Claude states it and asks to confirm: "Recommended: <#1> live, <#2> and <#3> paused - that's your keyword-list order. Good, or swap one?" Claude does not re-score, re-sort or second-guess the list here; `/keywords` already ranked it. If you say nothing, the list order stands.
- **Landing page per ad group** - the **Landing page:** line in each ad group block at the top of `keyword-list.md`, written there by `/landing-page` when it builds the page. Missing for a group → build the campaign with the closest real page (never a 404), mark the group **page pending** in the plan, and say `/landing-page` is next. Never ask the owner for a URL.
- **Phone answering hours** - `context/business.md` "Hours" (captured by `/context-layer`). This decides the ad schedule: a cheap overnight lead that dies in voicemail teaches Google to find more bad leads. Blank → the one question this command may ask: "Does someone answer the phone 24/7, or business hours only?" Write the answer to `context/business.md`, then continue.

**Confirmation gate.** Claude summarises the full plan - campaigns, budget split, service area, schedule, landing pages, bidding - and does NOT touch the API until you explicitly say yes.

**Before the build, Claude also checks in the account** (a): the lead conversion action exists, is marked Primary, and is biddable. Since 17 November 2025 a new conversion action is no longer made account-default automatically, so a campaign built against an un-flagged action optimises for nothing.

---

## Structure: one campaign per service, STAGs not SKAGs, never city ad groups

SKAGs (single keyword ad groups) are dead (b). Google's close-variant matching means one keyword already matches every same-meaning variation, so single-keyword groups just fragment your data. The 2026 standard is STAGs: 5 to 15 same-intent keywords per ad group that can all be answered by the same ad.

```
CAMPAIGN = the service            (budget, bid strategy, location and schedule live here)
├── AD GROUP: STAG 1              (one intent, phrase match, no city in the keywords)
├── AD GROUP: STAG 2
└── AD GROUP: Generic catch-all   (carries every other STAG's trigger words as negatives)
```

**City is not an ad group** (a). Location targeting is a campaign-level setting, so an ad group named "North York" is not shown only to North York - it just holds the keyword "plumber north york", and most local searches never type a city. See `references/stag.md` section 6.

- City in the ad: location insertion in one or two RSA headlines, fallback text set
- City on the page: a URL parameter swapped into the H1 of one strong page
- City-level budget or target: only by splitting that city into its own campaign, and only once it clears roughly 30 conversions a month on its own (b). Location bid adjustments are ignored under Smart Bidding (a), so they are not a lever here.

**How many campaigns.** (a) Google, February 2026: consolidation is not the goal, but campaigns with the same goal should pool data; Google's floor is 15 conversions in 30 days per campaign. (a) Google, March 2026: Smart Bidding learns across the whole account, so a new campaign inherits account history from its first impression. (b) Practitioners still want 30 to 50 conversions a month before a campaign stands alone. The rule from `stag.md`:

> If it needs its own budget, bid target, schedule, or geography, it is a campaign. Otherwise it is an ad group.

**⛔ The recommendation is ONE campaign. Not three. One.** (Jono, 1 September 2026.) A new account launches with a single campaign carrying STAG ad groups by job (stag.md Shape A), one budget, one bid strategy. Recommend one, build one, say why in a line - never present a three-campaign launch as the default and never open with "how many campaigns do you want?".

- **Launch = one campaign.** Every service the account sells is an ad group inside it, not a campaign of its own
- **Earn the second campaign, never assume it.** A service splits out only once it clears about 30 conversions a month on its own, or genuinely needs its own schedule (emergency, around the clock) or a materially different cost per lead (b). That is a `/scale-account` decision weeks in, not a launch decision
- **Brand is the one exception**, and only when there is brand search worth defending - never mixed into the generic campaign (c). A brand-new account with no brand volume does not need it on day one; say so rather than building an empty second campaign
- **Multiple campaigns at launch are a mistake, not an option.** Three starved campaigns sit in learning forever while one funded campaign is already producing. If the budget tests below somehow pass for a split, that is still not permission - it is a case to put to Jono as a question, with the numbers, and let him decide

**Naming** (c). Campaigns `Search | Service | Geo`, for example `Search | Drain Cleaning | GTA`. Ad groups are the STAG theme, for example `Blocked drain`. Names must be unique in the account or the API rejects the create.

---

## Budgets: the math the build runs

- **Daily budget = monthly budget ÷ 30.4** (a), never ÷ 30. Google bills at most 30.4x the daily budget in a calendar month.
- **Any single day can spend up to 2x the daily budget** (a). Tell the owner before they see it. An ad schedule does not change the monthly cap - Google paces the full 30.4x across the active days (a).
- **Test 1, cost per lead:** daily budget per campaign should be at least 3x, ideally 5x, the expected cost per lead (b). Below that, Smart Bidding runs out of money mid-day and never sees enough auctions to learn. **Where "expected cost per lead" comes from is not optional - see Forecasting leads below.**

## Forecasting leads - never one blanket rate

**The rule: every lead number carries the conversion rate that produced it and the source of that rate, per ad group.** "134 clicks, so about 4 leads" is a hidden 3% assumption applied to every keyword equally. It is wrong in both directions - it flatters research terms and insults emergency ones - and because it is invisible, nobody ever checks it.

**Source hierarchy. Use the highest one available and SAY which you used:**

1. **The account's own conversion data**, if it has any history at all. Always beats a benchmark. Pull it before assuming anything
2. **The owner's own numbers from `context/business.md` "The economics"** - close rate on a lead, average job value, target cost per lead. That file exists precisely so this is not guesswork. If those are marked as a guess, the forecast inherits the guess and says so
3. **An industry benchmark, cited with its year.** 2026 cross-industry search average is roughly 4.4%, but the spread between top and bottom industries is 13.86 percentage points - auto repair around 14.67%, ecommerce around 2.81%, and B2B lower on longer cycles (b). A cross-industry average applied to a specific business is close to meaningless
4. **Nothing.** Then say "unknown" and give a range, never a single number dressed as a forecast

**Then adjust per ad group by intent, because this is where a blanket rate does the most damage:**

- **Emergency / immediate need** ("emergency plumber", "24 hour X") - the highest converting group in any service account. Someone with water coming through the ceiling is not comparison shopping
- **Commercial / "near me"** - high intent, immediate need implied (b)
- **Generic category** ("plumber", "seo agency") - the middle, and usually the biggest spender
- **Research and comparison** ("best X", "X vs Y", "X reviews", "X pricing") - **research-stage terms convert at 2 to 3 times lower rates than commercial and emergency intent** (b). High-intent terms have been measured at 4.85% to 7.5%+ against a fraction of a percent for informational
- **Consultant / freelancer wording** where the business sells a package - same words, different wallet. Discount it and say why

**How to present it.** Per ad group: clicks (budget share ÷ that group's own CPC from `keyword-list.md`, which already varies by group) × the stated rate = leads, with the rate and its source on the line. Then a total. Never a single account-wide number.

**Label the confidence.** If the rate came from a benchmark rather than the account, the forecast is **Assumed** and every number downstream of it is flagged the same way. An assumed forecast presented as a projection is how a member sets a budget on a number nobody ever checked.
- **Test 2, clicks:** daily budget ÷ the market's average cost per click should give at least 10 clicks a day (b).
- **These tests do not choose the campaign count - the count is already one.** They exist to size the single campaign's budget honestly and to tell the owner what that budget can and cannot test. Run them, report them, then build one campaign. One campaign clearing 15 conversions a month beats three that each get five.
- **If a split is ever genuinely on the table**, weight by expected lead value and search volume from `keyword-list.md`, never equal thirds - and put it to Jono as a question with the numbers rather than building it. Emergency usually earns the biggest share because it converts at the highest value.
- **Shared budgets: only with a portfolio bid strategy attached** (a). Google's own data says the pair yields about 13% more Search conversions; without the portfolio strategy, one campaign can swallow the entire shared budget and hide a weak one (b).

---

## Bidding: what to launch on and when to graduate

- **Launch on Maximize Conversions, no target** (Jono's ruling, 2026-08-29, matches the course). Google says you no longer need a bank of data first, because the model learns account-wide (a), and an account with 15+ conversions in the last 30 days on the lead action is in the best case.
- **The one caveat, from the data (b):** a documented brand-new campaign on Maximize Conversions served zero impressions for 7 days while Maximize Clicks spent its $100 a day immediately. So: if a new account serves nothing for a week, switch to Maximize Clicks with a max cost-per-click cap for 2 to 4 weeks, then back to Maximize Conversions. Manual CPC is the fallback if a bid cap is not enough control. Enhanced CPC no longer exists (a, gone since March 2025).
- **Add a Target CPA at 30 conversions in 30 days on that campaign** (a). First target = last-30-day CPA plus 10 to 20%, then lower it 10 to 15% every two weeks (b). Google's own recommended target is the last-30-day CPA adjusted for conversion lag (a).
- **Never Target ROAS for leads with flat values** (b). Every lead worth the same means tCPA. tROAS only after offline conversion import feeds real, differing values back.
- **Learning period is about 7 days, 1 to 2 weeks in practice** (b). It resets on a strategy switch, a target change, a budget move over 20% in a week, a conversion action change, or a pause and re-enable. Don't touch the strategy for 2 weeks after any change; cap budget moves at 20% a week.
- **Bid adjustments under Smart Bidding** (a): only a -100% device exclusion is honoured. Location and schedule adjustments are ignored, and a device adjustment on tCPA changes the target, not the bid. On Maximize Clicks and Manual CPC they still work.

---

## The nine switches, every campaign, spelled out

Google pre-ticks each of these the way that spends more. The build sets the opposite explicitly, never by omission.

- **1. Networks: Google Search only** (a). Search partners are included by default and Google's own doc says partner clicks "may not always reflect highly targeted traffic". Display expansion is set TRUE in Google's own API sample. Set `target_search_network` false, `target_partner_search_network` false, `target_content_network` false. Adalysis: partners are usually under 5% of clicks at a lower conversion rate, and belong off on any budget-limited campaign (b).
- **2. Location: Presence only** (a). The API default is `PRESENCE_OR_INTEREST`, which serves to anyone anywhere who searched your city. Set `positive_geo_target_type = PRESENCE`. Direction is settled; the "20 to 35% of budget" waste figure repeated online is one vendor's client data (c).
- **3. Broad match keywords setting: OFF, explicitly** (a). With conversion-based Smart Bidding this setting converts every phrase and exact keyword to broad on save. The new-campaign UI pre-ticks it since July 2024 (b). Any campaign with it on is auto-upgraded to AI Max between 1 and 30 September 2026 (a).
- **4. AI Max for Search: OFF at launch** (a). Turning it on enables search term matching and text customisation, and final URL expansion switches on by default with it. Google claims 7% more conversions with the full suite versus search term matching alone, internal 2026 data (a). Revisit only with a mature negative list and 30+ conversions a month (c).
- **5. Text customisation and automatically created assets: OFF** (a). Legacy automatically created assets became "text customization" on 27 May 2025; once disabled it cannot be re-enabled. Campaigns still using it are auto-upgraded to AI Max in September 2026 with search term matching AND text customisation on.
- **6. Final URL expansion: OFF** (a). It cannot exist without text customisation, so switch 5 kills it. No Dynamic Search Ads either - their AI Max migration begins February 2027 (a).
- **7. Language: send nothing** (a). Campaign-level language targeting is removed from Search in late September 2026 and Google told API developers to stop sending language criteria. The 2025 version of this announcement slipped nine months, so the setting may still be visible for a few weeks; leave it alone and write the ads and pages in the market's language.
- **8. Ad rotation and devices: untouched** (a). Optimise is the default and Smart Bidding forces it; campaign-level rotation is unsupported in the API, so don't set it. No device adjustments at launch.
- **9. Auto-applied recommendations: OFF at account level** (b), and decline every prompt to "Activate", "Optimize" or "Apply" inside the campaign.

**Two required fields that are not switches**
- `contains_eu_political_advertising = DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` on every create (a). Required since 3 September 2025; since 1 April 2026 an account with undeclared campaigns fails campaign mutates account-wide.
- Conversion goals: account-default (a), which is what lets campaigns learn from each other. Campaign-specific "Leads" only if the account also carries a purchase or other goal that would pollute the lead campaigns.

**Ad schedule: from the Step 0 answer** (c). 24/7 only if someone answers the phone; otherwise a hard schedule. Under Smart Bidding the schedule is honoured as on/off but a "-40% overnight" adjustment does nothing (a), so the choice is binary. Judge later on cost per converted lead, not cost per lead (b).

---

## Locations: the service area on Presence, every other country excluded

**Presence is the rule; "Presence or interest" is for businesses whose customers come from elsewhere** (Jono, 2026-08-29): hotels, tours, vacation rentals, destination services. Their buyer searches about the place before arriving, so filtering to people physically present would remove the whole market. Every local service business stays on Presence.

- One `geo_target_constant` per city or region from `GeoTargetConstantService.SuggestGeoTargetConstants`, or one proximity target with a radius (a). Up to 10,500 location targets and 500 proximity targets per campaign (a).
- Pick the unit that matches how the business dispatches (b): postcodes or a radius for dense metros, county for legal and medical, radius when drive time is the limit. Tighten with booked-job data; never widen before it.
- **Exclude every other country** (Jono's rule, 2026-08-29, local and national businesses). Presence-only targeting limits who sees the ads, and the exclusion list closes the gaps it leaves - VPNs, bots, mis-located traffic. `code/exclude_other_countries.py --keep <CC>` does it at creation, idempotent. A practitioner claim that exclusions are capped at about 120 could not be found on Google's own pages (checked 29 August 2026) and is not relied on; if the API ever rejects the batch, the script's partial-failure mode reports exactly which rows.
- Exclude specific suburbs or postcodes only when booked-job data shows consistently poor-fit leads from them (b).

---

## Keywords: phrase match, 5 to 15 per STAG, one search routes to one ad group

- Phrase match, all of them, no city appended (c, house rule). Close variants already cover plurals, misspellings, reorderings and same-meaning terms (a), so no match-type duplicates and no "near me" variants.
- **Exact match is not exact** (a). Since close variants, exact includes synonyms and same-intent rewrites, and there is no opt-out.
- **Documented exception** (b): Adalysis' 16,825-campaign study found exact match had the lowest cost per lead under Target CPA, and on low-data accounts running Maximize Conversions broad beat phrase. Kirk Williams (June 2026) starts SMBs on exact. House rule stays phrase; the top two or three money terms per STAG may also be added as exact once the campaign has data.
- Cap: 20 keywords per ad group is the ceiling (b); 5 to 15 is the house range.
- **Cannibalisation** (b). When two ad groups or two campaigns can match one search, Google picks by Ad Rank, not relevance, and your data splits. The fix is negatives, never pausing:
  - every STAG carries the other STAGs' trigger words as negatives
  - every service campaign carries the other services' trigger words as negatives (for example "furnace" negative in the AC campaign)
  - the account-level negative list (universal junk) already covers every campaign - nothing is attached at campaign level (Jono's ruling, 1 September 2026)
  - brand terms are negatives in every non-brand campaign
- Limits (a): 10,000 negatives per campaign, 5,000 per shared list, 20 lists per manager account.

---

## Starter ads: 2 RSAs per ad group

Two RSAs per ad group, not three. Google's own recommendation is "at least 2", and Optmyzr's studies across a million-plus ads found 2 is the sweet spot - a third spreads thin data on low-volume accounts.

Per RSA:

- **8 to 12 headlines, not a padded 15.** Short headlines win: under 20 characters had roughly half the cost per lead of long ones in Optmyzr's data. Max 30 characters each.
- **Headline 1 is the keyword, pinned to position 1. Pin nothing else.** Partial pinning beats both full pinning and no pinning.
- **City comes from location insertion** in one or two headlines with fallback text set, never from the keyword.
- **Remaining headlines:** proof from proof.md (review count, years, licence), the offer, response time and a call CTA. Every claim must exist in proof.md and pass context/compliance.md, no exceptions.
- **3 descriptions, 60 to 70 characters each.** Mid-length outperforms maxed-out 90s. Each must stand alone: one proof, one offer, one CTA. Sentence case, not Title Case.
- **Paths:** /[service] /[city], 15 characters each - the API rejects longer.
- **Ignore Ad Strength.** It does not affect the auction, and "Average" ads routinely beat "Excellent" ones. Fix "Poor" because it flags structural gaps, but never chase "Excellent" by unpinning or padding.

---

## How Claude builds it through the API

- Use the latest API version and client library (v25 is current in Google's docs). Releases are monthly since 2026 - never pin an old version.
- **One atomic Mutate per campaign tree** (a): budget (temp ID -1) → campaign (-2, referencing -1) → campaign criteria (locations, schedule, campaign negatives) → ad groups (-3 onward) → ad group criteria (keywords, ad group negatives) → ad group ads. Temp IDs are negative, unique across the whole request, and only referenced after they are defined.
- **Group operations by resource type, don't interleave** (a). Request `MUTABLE_RESOURCE` response content so the real IDs come back without a second call.
- **Do NOT use `partial_failure` with temp IDs.** The build is all-or-nothing per campaign, so one bad campaign never half-builds.
- **Status PAUSED on the campaign, every ad group and every ad at creation.** Nothing serves until you enable it in the UI.
- Campaign create carries: `advertising_channel_type = SEARCH`, the four network flags from switch 1, `geo_target_type_setting.positive_geo_target_type = PRESENCE`, the bidding oneof, `contains_eu_political_advertising`, and no language criterion, no ad rotation field.
- Maximize Conversions is a proto oneof. In Python declare it with `campaign.maximize_conversions.target_cpa_micros = 0` (or `SetInParent()` on the underlying proto) - plain attribute access silently fails, and `client.get_type(...)()` is not callable on some SDK versions.
- Proto-plus repeated fields use `.append(op)`, not `.add()`.
- RSA pinning: `pinned_field = HEADLINE_1` on the keyword headline asset only.
- If anything fails partway, the atomic mutate rolls that campaign back cleanly. Fix the error and rerun that campaign only. Common rejects: duplicate campaign name, path over 15 characters, missing EU field.

---

## Verify before you enable

Claude reads this back from the API and you check it in the UI.

- [ ] Campaigns all PAUSED, budgets matching the approved split, daily = monthly ÷ 30.4
- [ ] Networks: Google Search only - Display AND search partners unchecked
- [ ] Locations: your service area, "Presence" selected (not "Presence or interest"), every other country excluded
- [ ] Broad match setting OFF - keywords still phrase match
- [ ] AI Max OFF, text customisation OFF, final URL expansion OFF, no Dynamic Search Ads
- [ ] "Doesn't have EU political ads" shown on every campaign
- [ ] Bidding matches the launch rule: Maximize Conversions with no target. Maximize Clicks with a cap only as the fallback for an account that served nothing for a week; no Target CPA yet
- [ ] Conversion goals: account-default, lead action Primary and biddable
- [ ] Each campaign: STAG ad groups named by theme, no city ad groups
- [ ] 5 to 15 phrase keywords per ad group, cross-STAG and cross-service negatives in place at AD GROUP level, account-level list confirmed non-empty via `shared_criterion` (never `member_count`)
- [ ] 2 RSAs per ad group, keyword pinned to headline 1, nothing else pinned, location insertion with fallback
- [ ] Every ad claim traceable to proof.md; compliance check passed
- [ ] Ad schedule matches your phone answering reality
- [ ] Final URLs load (no 404s) and match the service

**Normal-looking "errors" on a paused campaign.** "This keyword can't run ads" (it's paused, that's why), Quality Score showing "-", all metrics at 0, and Ad Strength "Average". None of these need fixing before launch.

**After enabling.** Check the Search Terms report daily for the first week and weekly after; add junk as negatives, never as new keywords. First conversions typically land within 5 to 10 days at normal local budgets. Do not touch bidding, targets or budget for 14 days, and never move budget more than 20% in a week.

**Performance Max is not part of the launch** (b). Optmyzr's 24,702-campaign study found PMax underperformed when run beside Search, and Search beat PMax about twice as often on conversion rate. If it is ever added, cap it at 10 to 25% of budget with brand and Search terms excluded. Note for US home services: Local Services Ads are becoming a pay-per-lead Performance Max campaign inside Google Ads from August 2026 (a); that is a separate channel and does not change this build.

---

## The 2026 calendar this file tracks

- 3 September 2025: EU political ads field required on every API campaign create
- 17 November 2025: new conversion actions no longer become account-default automatically
- 1 April 2026: accounts with undeclared campaigns fail campaign mutates
- 15 April 2026: AI Max leaves beta
- 1 to 30 September 2026: campaigns using automatically created assets or the campaign-level broad match setting are auto-upgraded to AI Max
- Late September 2026: campaign-level language targeting removed from Search
- February 2027: Dynamic Search Ads sunset and migration to AI Max begins

---

## What changed in this revision

- **Structure corrected to match stag.md and the /campaign-plan command.** The previous file built a Core ad group plus one ad group per city with the city appended to keywords. That contradicts stag.md section 6 (city is the axis you do not split on) and the command ("never city ad groups"). Ad groups are now STAGs; city comes from location insertion and a URL parameter. Naming changed from `Service | Geo` ad groups to `Search | Service | Geo` campaigns with STAG-theme ad groups.
- **Campaign count is now a budget decision, not a fixed three.** Added the two budget tests (3 to 5x cost per lead, 10 clicks a day) and the rule to fall back to one campaign with three STAG ad groups when the split fails them. Added Google's February 2026 15-in-30 floor and March 2026 account-wide learning statement, which soften the old "Smart Bidding learns per campaign" line.
- **Bidding at launch reconciled with the command.** The old file said Maximize Conversions from day one; the command said Manual or Maximize Clicks. Now: Maximize Conversions if the account already has 15+ conversions in 30 days, otherwise Maximize Clicks with a cap for 2 to 4 weeks. Added the tCPA graduation path with numbers, the tROAS-for-leads ban, learning-period triggers and the 20% budget rule. Noted Enhanced CPC is gone (March 2025).
- **The nine switches are spelled out** with the exact API field per switch and the September 2026 auto-upgrade consequence for anyone who leaves the broad match setting or automatically created assets on. Added that final URL expansion is on by default inside AI Max and depends on text customisation, and that disabling automatically created assets is permanent.
- **Language changed from "set English constant 1000" to "send nothing"** per Google's 13 August 2026 notice that Search language targeting is removed late September 2026 and API developers should stop sending the criterion.
- **Country exclusion lists kept, by Jono's ruling (2026-08-29).** The research draft had retired them on a claimed 120-exclusion cap that Google's pages do not show; the rule stands and `code/exclude_other_countries.py` implements it.
- **Bid adjustments corrected.** Schedule and location adjustments are ignored under Smart Bidding, so "-40% overnight" and "-90% to +900% by city" only work on Maximize Clicks or Manual CPC. Ad schedule is now a hard on/off decision under Smart Bidding; city budgets need their own campaign.
- **Conversion goal check added** for the 17 November 2025 change: verify the lead action is Primary and biddable before the build; account-default unless a purchase goal exists.
- **EU field date corrected** to 3 September 2025 for creates, with the 1 April 2026 account-wide enforcement added.
- **Match type exception documented.** Phrase stays the house default, but the Adalysis 16,825-campaign study and Kirk Williams' June 2026 SMB guidance (start exact) are recorded, with permission to add top money terms as exact once data exists.
- **Cannibalisation section added**: Ad Rank picks the winner, negatives are the only durable fix. Superseded 1 September 2026 - negatives are account level plus ad group level only, never campaign level.
- **Performance Max and LSA notes added** with the Optmyzr 24,702-campaign numbers, the 10 to 25% cap, and the August 2026 LSA-to-PMax transition for US home services.
- **Grading legend added** and every claim marked (a), (b) or (c). Unchanged: everything paused, Search only, Presence, phrase match, 2 RSAs, 8 to 12 headlines, pin headline 1 only, 3 descriptions at 60 to 70 characters, ignore Ad Strength, the atomic Mutate rules, and the four questions Claude asks.
