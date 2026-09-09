# Research dossier - Google Local Services Ads for home services, 2025-2026
Researched 28 August 2026 · 96 sources fetched directly (WebSearch was unavailable, so searching ran through Yahoo and Brave result pages plus known Google help URLs) · Reddit was unreachable from this environment, so r/PPC evidence is limited to result-page snippets
Next: use this to rewrite `references/lsa-setup.md` (draft at `ref-lsa-setup.md` beside this file).

## How claims are graded in this dossier

- **(a)** Google's own documentation or announcement, or a named large-sample dataset (hundreds of accounts, stated period).
- **(b)** Consistent across three or more independent specialists, or a single named dataset with a stated sample of ten or more accounts.
- **(c)** A single agency, a single unsourced number, or a claim that contradicts Google. Use only with a label, or not at all.

---

## Findings by area

### 1. The migration into Google Ads - the biggest change since the product launched

- **(a)** Google, help page 17213585 (published July 2026): existing LSA campaigns are being migrated automatically into "a specialized Performance Max campaign type optimized for pay-per-lead goals". Placements stay Search and Maps only. Targeting stays keywordless. Billing stays per valid lead.
- **(a)** Scope of phase 1: United States only. Google's page names plumbing, HVAC, electrical, appliance repair, house cleaning, lawn care, roofing, pest control and moving, for "home and storefront service advertisers". Search Engine Land and Search Engine Journal (both 20 July 2026) reported the first test group as pet care, home services, wellness and education. Both lists are Google-sourced; treat them as overlapping phase-1 cohorts.
- **(a)** Timeline: phase 1 August 2026 (US). Late 2026: service-area businesses without a storefront, plus accounts with custom bidding or booking setups. 2027: non-US accounts (Canada, UK, EU) and remaining categories. Cadiente Digital (24 July 2026) confirms Canadian accounts are in the 2027 group.
- **(a)** Notice: an email 14 days before the account's migration date, a 7-day reminder, and a post-completion email, plus an in-dashboard banner (Google page; Elevarus playbook 5 August 2026).
- **(a)** What is removed: manual Max Per Lead bidding and vertical-level Target CPA. One campaign-level Target CPA applies across every category in the campaign. BBB callouts are dropped; Google says add six or more structured callouts instead.
- **(a)** Budgets: the historical average weekly budget is divided by 7 to become an average daily budget. Monthly cap becomes daily budget × 30.4 (same monthly ceiling as before).
- **(a)** Reporting: campaign-level historical performance reports do NOT transfer. Lead history does (contacts, message threads, call recordings). Download reports before the migration date. Triaza (29 July 2026) says the old dashboard holds reporting back to 1 October 2017.
- **(a)** Verification transfers automatically. No re-verification. Badge unchanged.
- **(a)** "You can't create new campaigns with pay-per-lead goals directly within Google Ads at this time" - new advertisers still sign up at g.co/localservices (Google FAQ; Triaza confirms API is update-only for existing campaigns).
- **(a)** Lead handling moves to Lead Manager in Google Ads (Goals, then Conversions, then Leads). Charged status, lead type, feedback survey, CSV download and message replies survive (Triaza, Elevarus).
- **(a)** Google, help page 17325249 (August 2026) "About pay-per-lead goals": phone calls are the required lead type; messages optional; **bookings arrive in the Google Ads version in October 2026**. Only "valid, qualified phone leads that meet minimum call duration requirements" are charged. Eligibility: US, verified GBP, supported category, screening passed.
- **(a)** Google, help page 17326561 "Best practices for pay-per-lead goals": keep rating above four stars and five or more reviews; answer calls promptly in targeted hours; reply to messages within 24 hours; do not target service areas more than two hours' drive away; up to 100 custom photos; up to 6 callouts per category; use Maximize Conversions by default and set a Target CPA only once the campaign gets more than 15 leads a month.
- **(a)** Google, help page 17325351 "About targeting for pay-per-lead goals": service areas pull from GBP, default is the county of the business address if none; categories sync from GBP and map to supported pay-per-lead categories; at least one category and one service type must be on; all target locations must be in the GBP's country; Direct Business Search means only your ad shows on your brand searches and only new-customer leads are charged.
- **(a)** Google Ads API release notes: v24.2 (24 June 2026) added `local_services_pmax_campaign_settings`, asset-group "Local Services info" (category ID and callouts), service-ID signals, and a `LOCAL_SERVICES_ADS` conversion origin. v23.2 (25 March 2026) removed the lead email field from `LocalServicesLead`.
- **(b)** Expect up to two weeks of stabilisation after migration; do not touch settings in that window (Google page; SEJ; Contractor Marketing Network 1 August 2026; WolfPack 19 August 2026).
- **(b)** Multi-category accounts with different lead economics should plan separate campaigns, since one Target CPA now covers every category (WSI 7 August 2026; Elevarus playbook).
- **(c)** Casaccio Media says "lead disputes remain available" after migration - Google's page does not say this; the feedback survey survives, manual disputes do not.

### 2. Eligibility - categories and countries

- **(a)** Google's getting-started page (Canada edition) lists 11 countries: Austria, Belgium, Canada, France, Germany, Ireland, Italy, Spain, Switzerland, United Kingdom, United States. BrightLocal's 2024 guide lists the same 11. **The existing reference file says 12 and includes the Netherlands - unconfirmed by Google, remove or mark unverified.**
- **(a)** The signup flow at ads.google.com/localservices is the only location-accurate list. Categories vary by location.
- **(b)** CallRadius (July 2026 list) counts 114 US business types: 40 home and property, 17 legal, 21 health and wellness, 9 education and care, 6 financial, 6 personal care, 5 pets, 5 automotive, 3 dining (pilot), 2 other. UK: 45 categories (28 trades nationwide, 17 legal and property in Greater London only).
- **(b)** Sterling Sky's category tracker (checked August 2026): last change was May 2026 - food and beverage in Atlanta, Boston, Indianapolis, Miami and San Jose, with restaurant and dessert/coffee restricted to those cities. Nothing new in June to August 2026. Earlier: bathroom and kitchen remodeling October 2024; five health categories February 2024.
- **(b)** Near Media, Eric Levine (ex-Google LSA, 12 February 2026): "over 100" categories live and expanding.
- **(b)** Canada categories (Arkwell Agency, 13 December 2025): window service, water damage, tree service, roofer, plumber, pest control, mover, lawn care, HVAC, electrician, appliance repair, carpet cleaner, house cleaner, junk removal - 14 home-service categories. Growth Boss (26 July 2026) adds painters, general contractors, landscapers, locksmiths as "common" - cross-check in signup.
- **(c)** Tom Waddington's markets page was last updated July 2020 (4 Canadian categories). Stale - drop it from the sources list.

### 3. Badge and guarantee

- **(a)** Google Verified replaced Google Guaranteed, Google Screened and License Verified. Rollout 20 October 2025 (JumpFly 16 September 2025; Coalmarch; Footbridge). Google blog announcement August 2025. Existing verified advertisers switched automatically.
- **(a)** Money-back guarantee discontinued with the badge change. Google's badge page: final consumer reimbursement requests by 7 December 2025, and requests had to be filed within 30 days of service. Footbridge dates the guarantee's removal to 7 November 2025 - one agency, and Google's own cutoff is what matters.
- **(a)** Badge shows "dynamically" when Google predicts it helps the consumer decide (Google blog; SEL 20 August 2025).
- **(c)** Growth Boss (Canada, July 2026) still describes a "green badge" and "$2,000 CAD" guarantee - stale, do not use.
- **(c)** eSEOspace (11 October 2025) claims a new "Verified Expertise" badge, a new "Max Per Lead" mode and "verified job reviews weighted more" - none of this appears in Google's documentation. Max Per Lead is the OLD manual mode. Treat the whole article as unreliable.

### 4. Verification - checks, timelines, failures

- **(a)** Google 6226575: US business verification via D-U-N-S number or Secretary of State registration, EIN or Department of Revenue documents. D-U-N-S application takes up to 30 days and must match the GBP's organisation name and address. Canada and EMEA: registration documents, numbers or attestation.
- **(a)** Insurance certificate must be "active and valid for at least 14 days after the time of submission" and the name on it must match the advertised business name.
- **(a)** Google 12174778 (US home-service categories): business licence and owner licence where required; general liability plus professional liability for most trades; tree service, water damage and window services need public liability only; background checks on business and owner for all, plus field professionals for electrician, garage door, HVAC, locksmith, plumber. Google states screening "averages 3-4 weeks to complete after submitting your documents".
- **(a)** Accelerated verification gives 14 days to finish the remaining steps. Profile verification can take up to 24 hours to display. **Denial cooling-off: reapply no sooner than 30 days after a first denial, 180 days after a second.**
- **(a)** Google 6230381: "advanced verification" for some categories can include review of the Google Ads account, public data, a video interview and business-registration checks. "Serious or repeatedly negative customer feedback may result in lower rankings (including not showing at all)."
- **(a)** Background checks are North America only (US and Canada). Re-evaluation is periodic; Google says "regularly", not annually.
- **(a)** GBP must be public and verified since 21 November 2024; ads without one were paused that day (FieldPulse; Google community). Duplicate GBPs risk suspension.
- **(b)** Common failure causes, consistent across Google's pages and agencies: name on the insurance certificate not matching the advertised name; certificate expiring inside 14 days; D-U-N-S or registration name/address not matching GBP; licence in a person's name that is not the owner; field-worker count understated so checks are incomplete; GBP unverified or duplicated. (Google 6226575; PPC Chief; Elevarus.) No agency published a rejection-rate figure.
- **(b)** GBP edits that change name or address trigger a 24-48 hour re-verification pause (Elevarus; Locafy).
- **(c)** PipelineOn (26 January 2026): "2-4 weeks" verification, "annual renewal". Growth Boss (Canada): "a few days to a couple of weeks". Both single-source; Google's "3-4 weeks average" wins.

### 5. Ranking factors - 2026 evidence

- **(a)** Google 7527305 lists: bid (or Maximize Leads); likelihood the lead converts, which includes responsiveness ("missed calls may negatively affect your responsiveness"), search relevance (service type, timing, location, services offered, business bio), and whether message and booking options are on ("especially during nights and weekends"); and profile quality (rating, number of reviews, average response time, use of high-quality images, verification checks completed). New wording: "Higher quality profiles, including those with images, may rank higher and may also pay lower costs per lead." Also: the auction "optimizes for the overall health and diversity of the Local Services Ads ecosystem", and when several of your locations serve one area only the highest-ranking one shows.
- **(a)** Proximity: Google's Ads Liaison, 13 May 2024 (SEJ): "proximity of a business' location is often not a key indicator of relevancy". Service-area alignment replaced raw distance. Still 2024, not 2025.
- **(a)** Google 6224859: the message response-time estimate shows on your ad once you have two or more message leads in 90 days; it is a weighted average favouring recent leads; if no hours are set, Google counts messages between 7am and 9pm.
- **(a)** Google 12492201: "We recommend 5 or more reviews. Depending on your business type, your business may need 5 reviews to show." Set service areas broadly (whole county rather than postal codes). Enable every job type you perform. Photos are reviewed against quality guidelines before publishing.
- **(a)** Google 7496631: "Star ratings and number of reviews affect how your business is ranked." Reviews are managed in GBP, not LSA. A business-specific review link sits under Business Verifications, then the Google Business Profile tab.
- **(b)** Steady Demand, March 2026 client data (published 18 April 2026, sample size not disclosed): accounts with responsiveness of 85% or higher average 53.7 leads, 77% more leads and 52% more impressions than accounts below that; messaging on = 43% more leads and 19% more impressions; accounts that hit their budget cap average 141.8 leads, roughly four times unconstrained accounts; accounts with fewer than four photos generated zero leads.
- **(b)** Near Media, Eric Levine (ex-Google, February 2026): review velocity and cadence matter more than raw count; message opt-in correlates with top performers; a "user journey" photo sequence (exterior, front desk, workspace, team) beats logos; headshots are required and differ from GBP photos; roughly 80% of searches are broad category ("plumber near me"), not specific job types.
- **(b)** Sterling Sky review studies (2022-2025): the "10 reviews" step and the "flow stops for three weeks and rankings slip" observation are Maps rankings, not LSA. Directional only.
- **(b)** Sterling Sky (27 October 2023, 124 scans over 4 days): desktop LSA unit shows 2 slots, mobile shows 3 about half the time, and Google rotates around 10 advertisers through the top spots. Smaller advertisers (under $1,000 a month) gained 25% visibility after the change.
- **(b)** Being open at search time matters: Google lists "timing" under relevance; Steady Demand and RevSquared both push 24/7 with a live answer. Hours you cannot staff hurt responsiveness (Google).
- **(c)** RevSquared (4 April 2026): answer rates above 95% "consistently outrank" 70-80%; missed-call data retained "approximately 90 days"; 74.1% of contractor calls unanswered "in a study of 13,000 calls". None sourced.
- **(c)** Boomcycle (19 January 2026) lists proximity as "heavily weighted" and "24/7 businesses rank higher" and a "50-70% of LSA leads convert" claim. Contradicts Google on proximity; unsourced elsewhere. Keep only as a myth example.
- **(c)** PipelineOn's "4.8 stars and 50+ reviews for top 3" is "multi-agency consensus" with no data behind it.
- **(c)** Max Digital Edge (5 November 2025): hang-up attacks and review bombing by competitors; "20-30% spam tax"; "90%+ answer rate" threshold. Anecdotal.

### 6. Budgets, bidding and cost per lead

- **(a)** Weekly budget; monthly maximum = weekly × 30.4 ÷ 7. Hard ceiling - ads stop for the month once reached. Mid-month changes apply to the remaining days (Google 7434558).
- **(a)** Three modes until migration: Maximize Leads (recommended; Google suggests a budget that allows at least 10 leads a week and about two weeks to learn), Target CPL (September 2024; manual bidders who switched saw more leads, automated bidders who switched saw fewer), Max Per Lead (manual cap). After migration: Maximize Conversions, optional campaign-level Target CPA only above 15 leads a month (Google 17326561).
- **(a)** Message leads are priced dynamically: by message type (standard, Request a Quote) and "whether the customer has contacted other Local Services advertisers" (Google 7195435). The flat 50% discount is gone (Husky Digital, June 2026; Coalmarch still says "approximately half").
- **(a)** SearchLight Digital LSA benchmark, 1-28 February 2026, 888 contractors, $6.72M spend, 126,650 leads: electrical $39, HVAC $51, general $54, plumbing $57, drain and sewer $59, blended $53; book rate 43.9%; cost per paying customer $233; average ticket $1,826; closed ROAS 7.84x (HVAC 9.55x, electrical 8.52x, plumbing 6.85x).
- **(b)** SearchLight roofing LSA, Q1 2026, 10 contractors, $95,733: $79 average and $72 median per lead, 39.3% book rate, about $731 per paying customer, 4.82x closed ROAS, CPL fell 19% from January to March.
- **(b)** SearchLight garage door LSA, January-April 2026, 12 contractors, $123,399: $49 per lead (25th percentile $26, 75th $53), 38% book rate, $198 per paying customer.
- **(b)** The Media Captain, 26 August 2025, 100+ clients: personal injury $249, roofer $162, HVAC $80, fencing $71, plumbing $69, estate law $45, painter $40, landscaper $39, handyman $34, locksmith $34, dog training $30. Over 90% of leads arrive by phone. Around 6-7% of spend comes back as credits.
- **(b)** LSA versus Search, same publisher and period: SearchLight Google Ads benchmark, January 2026, 816 HVAC and plumbing contractors, $14.88M: blended $104 per lead (branded $34, non-branded $149, Performance Max $72); non-branded book rate 37.6% and $804 per paying customer; branded 55.3% and $104. So LSA at $53 per lead and $233 per customer versus non-branded Search at $149 and $804 - LSA roughly 3.5x cheaper per customer, but Search tickets run higher ($2,465 vs $1,826 per Enrich Labs' reading of the same data).
- **(b)** LocaliQ, April 2024 to March 2025, 3,211 US search campaigns: median search CPL $90.92 overall; plumbing $129.02; HVAC $127.74 to $129.02; electricians $93.69; roofing $228.15; cleaning $46.99; handyman $54.05.
- **(c)** Sharpen Marketing 2025 ranges: HVAC $35-60, electricians $40-70, plumbers $45-80, cleaners $20-40. Growth Boss Canada: $25-75 CAD. Single-agency, no samples.
- **(c)** PipelineOn: "$25-80 per lead in 2026", "40% cost increase since 2023", "67% of contractors say quality declined". Unsourced.

### 7. Lead types, messages, bookings, missed calls

- **(a)** Valid leads: a text, email or voicemail; a direct call; a missed call you return and reach; a booking request (Google 7195435). Out-of-hours contacts, research-only calls, cancellations and referrals to competitors are not charged.
- **(a)** Booking leads: Google 12059717 says "currently available only in the US", opt-in via a booking partner, not for healthcare or tax. Google 7195435 says "US and Canada" - the two pages disagree; no Canadian partner path exists, so treat as US only. In the Google Ads version bookings launch October 2026.
- **(a)** Reserve with Google partner list (google.com/maps/reserve/partners) includes **LeadConnector** (HighLevel's white-label brand). HighLevel's help article "Setting Up Reserve with Google for Local Services Ads" (updated 3 August 2026): configure Google Organic Booking (Calendars, Calendar Settings, Connections), upload a service feed, link the LSA account to the GBP in Google Ads; Google takes one to two weeks to approve feeds; removal shows in 24-48 hours; inconsistent service names delay approval.
- **(a)** Messaging and booking options are a stated ranking input, "especially during nights and weekends" (Google 7527305).
- **(b)** Message share by trade (99 Calls, January 2026, updated July 2026, client data): house cleaning about 78%, carpet cleaning 68%, water damage 35%, electrician 22%, plumber 18%. Emergency trades skew to phone.
- **(c)** Blue Grid Media (12 March 2026): messages 15-25% of leads; close rate 18-25% for messages versus 25-35% for calls; messages answered inside 3 minutes close at 28-32%, after 10 minutes at 12%. Illustrative ranges, no sample.
- **(b)** Husky Digital (June 2026): keep messaging on only if you can reply within minutes in business hours and the cost per booked job holds; otherwise off. Steady Demand's 43% figure argues for on. The reconciled rule: on, with a reply SLA.
- **(a)** Missed calls hurt responsiveness (Google). A returned missed call that connects is still a charged lead.
- **(a)** The standalone LSA mobile app was retired 6 January 2025 (Coalmarch; Footbridge).

### 8. Lead credits and disputes

- **(a)** Manual disputes removed mid-2024 (Blue Corona 24 July 2024; completed August 2024). Automated credits: Google's system checks leads at intake and re-checks charged leads; credits typically within 30 days; some poor leads handled inside 24 hours; statuses are Not charged, Charged, In review, Credited. No credits for healthcare, tax specialists or EMEA advertisers. No credits for "job type not serviced" or "geo not serviced".
- **(a)** Rating: Leads, then "Rate this lead", five-point scale; "Very dissatisfied" with a reason is what triggers review (Google 15100654; Infintech January 2025 lists the seven reasons).
- **(b)** Rate within 30 days of the lead (BG Collective April 2026; Founders Resource August 2026; Max Digital Edge). Google's page does not print a window - treat 30 days as the safe assumption.
- **(b)** Automated assessment runs about 72 hours (CallRadius; Founders Resource; PipelineOn).
- **(c)** BG Collective: 15-25% of flagged leads get credited under the automated system, versus 50%+ under manual disputes. Single agency.
- **(b)** Recovered spend runs about 6-7% of LSA spend on passively managed accounts (Media Captain, 100+ accounts; repeated by CallRadius and PipelineOn).
- **(c)** CallRadius: "45% of raw LSA leads are unbookable". Darren Shaw (Whitespark), February 2025, reported a flood of out-of-area and out-of-industry leads after disputes ended - qualitative, no numbers.
- **(c) Stale, do not copy:** OmniLocal (July 2024) and Appliance Marketing Pros (July 2026) still describe a "Dispute this lead" button, "3-5 business days" review and "40 days" credits. The button no longer exists.

### 9. Profile, job types, service area

- **(a)** Enable every job type you perform; broad category searches are on by default and turning them off "may result in a decrease in leads"; the toggle is account-wide across industries; deselecting all job types does not stop category leads - pause the ad instead (Google 12491364).
- **(a)** Adding an industry sends you back into verification for that industry.
- **(a)** Service area: Google recommends broad (whole county) in the LSA help; the Google Ads pay-per-lead best-practice page adds a ceiling of two hours' drive. Areas can be included and excluded down to postal code.
- **(b)** About 80% of volume is broad category (Near Media, ex-Google).
- **(b)** Photos: minimum four real photos or the account may not serve at all (Steady Demand data); Google reviews photos before publishing; up to 100 photos after migration.
- **(a)** Direct Business Search is on by default; only new-customer leads are charged; toggle under Profile & Budget, then Settings (Google 14545473).

### 10. Speed to lead

- **(a)** MIT/InsideSales Lead Response Management study: 15,000+ leads, 100,000+ call attempts, six companies, three years; a 21x drop in odds of qualifying when response stretches from 5 to 30 minutes. It is about qualifying and contacting, not closing.
- **(b)** Google's own pay-per-lead best practice: answer calls promptly and reply to messages within 24 hours - that is the floor, not the target.
- **(c)** Hatch (via PipelineOn): review requests sent within two hours get a 42% response versus 6% after two days; multi-touch follow-up 89.86% versus 8.56% single-touch on HVAC. Vendor data.
- **(c)** LeadAngel: 78% of buyers choose the first responder; average industry response 47 hours. Vendor data.

### 11. Stacking LSA with Search and Maps

- **(b)** Recommended stack (Valley Marketing Group June 2026; SpeedMobi August 2026; SearchLight data): LSA first as the cheapest lead source; a small branded Search campaign ($34 per lead, 55% book rate in SearchLight's January 2026 data) to protect the brand; non-branded Search only to fill volume gaps. Run both "once LSAs are full and answered fast".
- **(b)** Common HVAC split cited as 60% LSA / 40% Search (PipelineOn, "multi-contractor consensus" - no data).
- **(b)** Sterling Sky, 110 lawyer GBP listings, 2020: LSAs arriving on the page cut GBP click-through from 3.22% to 3.03%, about five actions a month per listing. Old, but the only measured cannibalisation study.
- **(b)** Media Captain consumer survey: 27.78% prefer clicking LSA versus 11% standard text ads; Maps 41.27%.
- **(c)** WebFX 2026 study (via Kansas City Star, unreachable): Local Pack appears on 98% of home-service queries; LSA and Search ads less consistent. Could not verify.

### 12. Other 2025-2026 changes

- **(a)** Review requests moved to GBP in July 2024; reviews sync to LSA (FieldPulse).
- **(a)** LSAs on Google Maps since mid-2024 (Coalmarch).
- **(a)** Booking links auto-pulled from GBP since February 2025 (SEL; existing file).
- **(a)** Direct Business Search live and on by default.
- **(a)** Google Ads API: `LocalServicesLead` and lead conversations are readable; lead email removed March 2026; Performance Max local-services fields June 2026; no API creation of pay-per-lead campaigns yet.

---

## Myths, with dates

- "Google Guaranteed green badge and $2,000 money-back guarantee." Ended 20 October 2025; final consumer claims 7 December 2025.
- "Dispute bad leads with a button." Gone since July-August 2024; rate "Very dissatisfied" instead.
- "Out-of-area and wrong-service leads get credited." Not since mid-2024.
- "Proximity is the top ranking factor." Google said otherwise on 13 May 2024.
- "Message leads are always half price." Dynamic pricing since 2025.
- "Download the LSA app." Retired 6 January 2025.
- "You need a Google Ads account first." Not until your account migrates; after migration LSA lives inside Google Ads.
- "Photos don't affect ranking." Google's ranking page now says image-rich profiles "may rank higher and may also pay lower costs per lead".
- "Set a tight service area to avoid junk leads." Google says broad (county level); the fix for junk is accurate job types plus fast answering, not a small radius. The two-hour drive ceiling is the outer limit.
- "LSA is available in 12 countries including the Netherlands." Google lists 11; no Netherlands.
- "Weekly budgets." From migration onward it is a daily average × 30.4.

---

## Rules an LSA command should enforce (graded)

1. (a) Run the eligibility checker at ads.google.com/localservices with category plus postal code before anything else; no other list is location-accurate.
2. (a) Require a public, verified Google Business Profile with matching name, address and phone before signup; never create a second profile.
3. (a) Submit licence, insurance and background checks on day one; Google's average is 3-4 weeks and nothing serves until it clears.
4. (a) Insurance certificate must be valid at least 14 days past submission and carry the exact advertised business name.
5. (a) US: get the D-U-N-S number started immediately (up to 30 days) and match its name and address to GBP.
6. (a) Count every field worker honestly - electrician, garage door, HVAC, locksmith and plumber need worker background checks.
7. (a) If verification is denied, do not resubmit for 30 days (180 after a second denial) - fix the cause first.
8. (a) Reach five Google reviews before expecting to show; keep the rating above four stars.
9. (a) Turn on every job type you genuinely perform and are licensed for, and nothing else - mismatched leads are billable with no credit.
10. (a) Leave broad category searches on; turning them off is account-wide and cuts leads.
11. (a) Set the service area at county level or wider, capped at two hours' drive; exclude only towns you would decline.
12. (a) Set hours you can answer live; missed calls lower responsiveness and ranking.
13. (b) Turn messaging on with a reply target under five minutes in business hours; if nobody can reply, turn it off rather than leave messages unanswered.
14. (a) Upload at least four real photos on day one (team, trucks, work in progress); add headshots; no logos as photos.
15. (a) Start on Maximize Leads with a budget that allows at least 10 leads a week; give it two weeks before judging.
16. (a) Do not use manual bidding on a new account; it is being removed and Target CPA needs 15+ leads a month to work.
17. (a) Budget math: monthly cap = weekly × 30.4 ÷ 7 today; daily × 30.4 after migration.
18. (b) Plan budget from the trade's measured cost per lead (SearchLight February 2026) and a 40% book rate, then track cost per paying customer, not cost per lead.
19. (a) Answer every LSA call live; return every missed call within minutes - a returned call that connects is charged whether or not you spoke first.
20. (a) Rate every bad lead "Very dissatisfied" with a reason inside 30 days; expect credits within 30 days and do not expect credits for wrong-area or wrong-service leads.
21. (b) Review the leads inbox weekly and rate leads in batches; do not rate good leads badly - over-flagging trains Google to send fewer.
22. (a) Keep Direct Business Search on; it costs nothing for returning customers.
23. (a) Do not advertise or promise a Google money-back guarantee anywhere.
24. (a) Before migration: export every report from the LSA dashboard, screenshot bios and callouts, write down current CPL ceilings by category, and verify GBP name, address and hours.
25. (a) After migration: leave settings alone for two weeks; then set one campaign-level Target CPA only if leads exceed 15 a month; add six structured callouts to replace BBB.
26. (b) Split categories with different lead economics into separate campaigns after migration.
27. (a) Canada: plan for calls and messages only; bookings are US only; migration comes in 2027.
28. (a) Renew licence and insurance a month early; re-verification is periodic.
29. (b) Ask for a Google review within two hours of job completion using the GBP review link; aim for a steady weekly flow.
30. (b) Stack LSA with a small branded Search campaign; add non-branded Search only when LSA is capped and answered fast.
31. (a) Log the verification submission date, migration notice date and export date in the project's setup record.
32. (c) Treat any published "X% more leads from Y" as directional unless the sample and period are stated.

---

## Sources (96, numbered)

### Google, primary

1. Local Services Ads ranking factors - https://support.google.com/localservices/answer/7527305
2. Automated lead credits - https://support.google.com/localservices/answer/15100654
3. About the Google Verified badge - https://support.google.com/localservices/answer/16498018
4. How you are charged for leads - https://support.google.com/localservices/answer/7195435
5. Screening and verification process - https://support.google.com/localservices/answer/6226575
6. How bidding works - https://support.google.com/localservices/answer/10125017
7. Edit your budget, monthly maximum formula - https://support.google.com/localservices/answer/7434558
8. Improve your performance, five reviews - https://support.google.com/localservices/answer/12492201
9. Direct Business Search - https://support.google.com/localservices/answer/14545473
10. Booking leads - https://support.google.com/localservices/answer/12059717
11. Getting started, Canada edition, country list - https://support.google.com/localservices/answer/6224841
12. Edit industries, service areas and job types - https://support.google.com/localservices/answer/12491364
13. Transition to Performance Max with pay-per-lead goals - https://support.google.com/google-ads/answer/17213585
14. US business screening requirements - https://support.google.com/localservices/answer/12174778
15. Reviews and ratings - https://support.google.com/localservices/answer/7496631
16. Target cost per lead bidding, September 2024 - https://support.google.com/localservices/answer/15332320
17. Manage leads, response-time display rules - https://support.google.com/localservices/answer/6224859
18. How providers qualify - https://support.google.com/localservices/answer/6230381
19. About pay-per-lead goals for Performance Max - https://support.google.com/google-ads/answer/17325249
20. Best practices for pay-per-lead goals - https://support.google.com/google-ads/answer/17326561
21. Targeting for pay-per-lead goals - https://support.google.com/google-ads/answer/17325351
22. Google blog, Google Verified, August 2025 - https://blog.google/products/ads-commerce/google-verified-august-2025/
23. Google Ads Community announcement thread, July 2026 - https://support.google.com/google-ads/thread/456909801
24. Google Ads API release notes, v23.2 and v24.2 - https://developers.google.com/google-ads/api/docs/release-notes
25. Reserve with Google partner list - https://www.google.com/maps/reserve/partners

### Trade press

26. Search Engine Land, LSA comes to Google Ads via Performance Max, 20 July 2026 - https://searchengineland.com/local-services-ads-come-to-google-ads-via-performance-max-482692
27. Search Engine Land, help doc for pay-per-lead goals, 5 August 2026 - https://searchengineland.com/google-releases-help-doc-for-performance-max-pay-per-lead-goals-484297
28. Search Engine Land, Verified badge, 20 August 2025 - https://searchengineland.com/google-local-services-ads-verified-badge-461001
29. Search Engine Journal, LSA into Google Ads, 20 July 2026 - https://www.searchenginejournal.com/google-is-bringing-local-services-ads-into-google-ads/582816/
30. Search Engine Journal, migration audit webinar, 25 August 2026 - https://www.searchenginejournal.com/google-local-services-ads-performance-max-webinar/586879/
31. Search Engine Journal, proximity not a factor, 13 May 2024 - https://www.searchenginejournal.com/google-proximity-not-a-factor-for-local-service-ads-rankings/516196/
32. Search Engine Roundtable, transition, 21 July 2026 - https://www.seroundtable.com/google-local-services-ads-transition-google-ads-41717.html
33. WordStream, LSA meets PMax, 13 August 2026 - https://www.wordstream.com/blog/google-ads-lsa-pmax-update
34. LocaliQ, LSA 101, updated August 2026 - https://localiq.com/blog/local-services-ads/
35. LocaliQ, 2025 home services search benchmarks - https://localiq.com/blog/home-services-search-advertising-benchmarks/
36. Near Media, Eric Levine ex-Google, 12 February 2026 - https://www.nearmedia.co/ep-243-p2-the-truth-about-google-local-service-ads-rankings-reviews-photo-strategy-w-eric-levine/

### Benchmark data

37. SearchLight Digital, LSA cost per lead by trade, February 2026 - https://searchlightdigital.io/google-local-service-ads-cost-per-lead/
38. SearchLight Digital, HVAC and plumbing Google Ads CPL, January 2026 - https://searchlightdigital.io/what-is-a-good-cost-per-lead-for-hvac-google-ads/
39. SearchLight Digital, roofing LSA CPL, Q1 2026 - https://searchlightdigital.io/roofing-google-lsa-cost-per-lead/
40. SearchLight Digital, garage door LSA CPL, Jan-Apr 2026 - https://searchlightdigital.io/garage-door-google-lsa-cost-per-lead/
41. SearchLight Digital, book rate benchmarks, May-June 2026 - https://searchlightdigital.io/book-rate-benchmarks-home-services/
42. SearchLight Digital benchmark hub - https://searchlightdigital.io/benchmark-hub/
43. The Media Captain, LSA stats and CPL, 26 August 2025 - https://www.themediacaptain.com/google-local-service-ad-statistics/
44. Steady Demand, performance insights March 2026 - https://www.steadydemand.com/local-services-ads-performance-insights-what-is-driving-more-leads-right-now-march-2026-update/
45. Steady Demand, LSA management page - https://www.steadydemand.com/lsa.html
46. Sterling Sky, review count and ranking - https://www.sterlingsky.ca/number-of-reviews-impact-ranking/
47. Sterling Sky, LSA category tracker - https://www.sterlingsky.ca/google-local-services-ads-category-list-changes-lsa/
48. Sterling Sky, desktop slots cut to two, October 2023 - https://www.sterlingsky.ca/google-just-made-a-massive-change-to-local-services-ads-what-you-need-to-know/
49. Sterling Sky, LSA impact on GBP clicks, 110 listings, 2020 - https://www.sterlingsky.ca/local-services-ads-gmb-impact/
50. 99 Calls, message lead share by industry, 2026 - https://99calls.com/blog/how-message-lead-volume-quality-vary-by-industry-and-why-that-matters-in-lsas
51. PipelineOn, 2026 home service benchmarks roundup, 21 May 2026 - https://pipelineon.com/blog/home-service-marketing-benchmarks-2026/
52. Marketing Code, LSA $53 vs Ads $104, 29 May 2026 - https://www.marketingcode.com/trade-marketing-lsa-53-cpl-agentic-booking-shift-may-2026/
53. Lead Response Management study, MIT/InsideSales - https://www.leadresponsemanagement.org/lrm_study/

### Migration coverage (agencies)

54. Elevarus, LSA to Google Ads guide, 24 July 2026 - https://elevarus.com/local-services-ads-google-ads-transition/
55. Elevarus, operator playbook, 5 August 2026 - https://elevarus.com/local-services-ads-migration-performance-max-operator-playbook/
56. Footbridge Media, migration FAQ, 19 August 2026 - https://www.footbridgemedia.com/marketing-tips/google-local-services-ads-migration-2026
57. Footbridge Media, five changes July 2024 to November 2025 - https://www.footbridgemedia.com/marketing-tips/5-changes-google-local-service-ads-contractors-should-know
58. Odyssey New Media, August 2026 - https://www.odysseynewmedia.com/2026/08/google-local-services-ads-are-migrating-to-performance-max/
59. White Shark Media, migration checklist, 19 August 2026 - https://whitesharkmedia.com/blog/local-services-ads-migration-google-ads/
60. TechWyse, pay-per-lead PMax documented, 6 August 2026 - https://www.techwyse.com/news/platform-updates/google-performance-max-pay-per-lead-goals-lsa
61. Enrich Labs, LSA guide 2026 - https://www.enrichlabs.ai/blog/google-local-service-ads-complete-guide-2026
62. Digital Applied, 20 July 2026 - https://www.digitalapplied.com/blog/local-services-ads-performance-max-pay-per-lead-2026
63. Casaccio Media, July 2026 - https://www.casacciomedia.com/blog/lsa-to-pmax-migration
64. Contractor Marketing Network, 1 August 2026 - https://contractormarketingnetwork.com/2026/08/01/google-local-services-ads-pmax-update-contractors/
65. Cadiente Digital, Canada timing, 24 July 2026 - https://cadientedigital.ca/2026/07/24/local-services-ads-moving-google-ads/
66. Triaza, 29 July 2026 - https://triaza.com/blog/advertising/lsa-performance-max-migration/
67. Locafy, 25 July 2026 - https://locafy.com/blog/local-services-ads-migration-google-ads
68. WolfPack Advising, 19 August 2026 - https://wolfpackadvising.com/blog/google-local-service-ads-management-pmax/
69. Relevant Audience, 21 July 2026 - https://www.relevantaudience.com/google-ads-en/google-lsa-performance-max-migration/
70. One Media Society, 2026 - https://www.onemediasociety.com/journal/google-local-services-ads-google-ads-migration-2026
71. Creatik Lab, 2 August 2026 - https://www.creatiklab.com/en/blog/local-services-ads-performance-max-migration-2026
72. WSI World, 7 August 2026 - https://www.wsiworld.com/blog/local-services-ads-are-moving-into-google-ads

### Credits, junk leads, disputes

73. Blue Corona, dispute deprecation, 24 July 2024 - https://www.bluecorona.com/blog/google-local-service-ads-lead-dispute-deprecation
74. BG Collective, dispute bad leads, 2 April 2026 - https://www.bgcollective.com/solutions-lab/dispute-bad-leads-local-services-ads
75. Coalmarch, 2024-2025 updates, 9 December 2025 - https://www.coalmarch.com/resources/blog/google-lsa-automated-credits-verified-badge-updates
76. CallRadius, junk leads, 18 May 2026 - https://callradius.io/institute/too-many-spam-junk-lsa-leads.html
77. CallRadius, message vs phone leads, 30 March 2026 - https://callradius.io/institute/message-leads-vs-phone-leads-lsa.html
78. CallRadius, placement above map pack, 11 March 2026 - https://callradius.io/institute/how-local-services-ads-rank-above-map-pack.html
79. CallRadius, 114 eligible industries, July 2026 - https://callradius.io/lsa-industries.html
80. Contractor Marketing Network, spam leads, 4 August 2026 - https://contractormarketingnetwork.com/2026/08/04/spotting-filtering-spam-leads-local-services-ads/
81. Max Digital Edge, LSA spam and competitor fraud, 5 November 2025 - https://www.maxdigitaledge.com/insights/fix-google-local-service-ads-spam
82. Founders Resource, disputes 2026, 19 August 2026 - https://www.foundersresource.com/blog/how-to-dispute-local-service-ads-leads
83. Infintech Designs, lead grading, 14 January 2025 - https://www.infintechdesigns.com/local-services-ads-leads-complete-guide/
84. Acadia Marketing Maine, disputing leads, 4 July 2026 - https://www.acadiamarketingmaine.com/learn/local-services-ads/disputing-lsa-leads
85. PipelineOn, LSA for home services (Darren Shaw quote), 19 May 2026 - https://pipelineon.com/blog/google-local-services-ads-home-service/
86. OmniLocal, disputing leads (stale, July 2024) - https://www.omnilocal.com/posts/disputing-leads-on-google-local-services-ads
87. Appliance Marketing Pros, dispute guide (stale process, July 2026) - https://appliancemarketingpros.com/blog/dispute-bad-leads/

### Ranking, profile, messages, stacking, Canada, booking

88. RevSquared, rank higher on LSA, 4 April 2026 - https://revsquared.ai/blog/how-to-rank-higher-google-local-services-ads
89. Boomcycle, ranking factors, 19 January 2026 - https://boomcycle.com/blog/google-local-service-ads-ranking-factors/
90. Blue Grid Media, message leads vs calls, 12 March 2026 - https://bluegridmedia.com/lsa-message-leads-vs-phone-calls
91. Husky Digital, are message leads worth it, June 2026 - https://husky-digital.com/insights/lsa-message-leads-worth-it/
92. Valley Marketing Group, LSA vs Search 2026, 8 June 2026 - https://thevalleymarketinggroup.com/blog/google-lsa-vs-google-search-ads-service-businesses/
93. SpeedMobi, LSA vs Google Ads, 21 August 2026 - https://www.speedmobi.com/lsa-vs-google-ads
94. Arkwell Agency, Canada category list, 13 December 2025 - https://arkwellagency.com/google-local-ads-canada-full-complete-list-of-all-industries-businesses-that-qualify-for-google-local-services-ads-glsa-arkwell-agency-innisfil-toronto-barrie-on/
95. HighLevel help, Reserve with Google for LSA, updated 3 August 2026 - https://help.gohighlevel.com/support/solutions/articles/48001217374-setting-up-reserve-with-google-for-local-services-ads
96. HighLevel, Reserve with Google + LSA page - https://www.gohighlevel.com/reserve-lsa

Also read and set aside as stale or unreliable: Tom Waddington markets page (2020), PrimeLSA categories (February 2025, still shows two badges), BrightLocal LSA guide (January 2024), Growth Boss Canada (July 2026, still describes the guarantee), eSEOspace October 2025 (unverifiable claims), JumpFly badge post (16 September 2025, used for the 20 October date only), FieldPulse November 2024 (used for the 21 November date), Sharpen Marketing calculator, PPC Chief guide (blocked), Whitespark Q4 2025 roundup (no LSA items), WebFX LSA guide (June 2025), Innovative Group (July 2026, repeats proximity).

Reddit: r/PPC threads were found (`comments/1by7w6k` on LSA for HVAC, `comments/166q5vu` on plumber PPC pricing) but reddit.com and old.reddit.com are blocked in this environment, so no first-hand numbers from Reddit are included.
