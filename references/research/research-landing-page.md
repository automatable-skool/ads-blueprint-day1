# Research dossier - landing pages for Google Ads lead-gen and local service campaigns
Built 28 August 2026 · 62 sources read · 31 rules for the /landing-page command
Next: merge the graded rules into references/landing-page-blueprint.md (draft in ref-landing-page-blueprint.md).

Grades used throughout:
- (a) Google official documentation, or a study with a stated dataset of 10,000+ pages or leads
- (b) A named study or vendor benchmark with a stated sample, or a documented A/B test
- (c) Practitioner claim, single case study, or a widely repeated number whose primary source could not be reached

---

## The 20 findings that change how the page gets built

1. Google grades landing page experience as "how relevant and useful your landing page is to people who click your ad", rated Above average / Average / Below average, as one of three Quality Score parts. Google's own help page says Quality Score "is not a key performance indicator and should not be optimized". (a) Google Ads Help, read 2026
2. Secondary summaries of the Google guidance consistently list five things: relevant and original content, transparency (who you are, what you do, what you ask for), ease of navigation, page speed, mobile experience. (b) Apexure 2026, North Country 2025, Landingi 2025
3. Above-average landing page experience plus ad relevance is cited as worth about 36% lower CPC (Search Engine Land / Tabeling 2023, via Apexure). Practitioners report 15 to 25% CPC drops from fixing page problems alone. (b)/(c)
4. Message match lifts conversion in every documented test: KlientBoost 66% lift from matching the ad's "Fully Free for Life" line to the H1; Disruptive Advertising 212% conversion lift and 69% lower cost per conversion; Unbounce reports strong match converts 2.5 to 3 times weak match. (b)
5. Core Web Vitals "good" thresholds: LCP 2.5 seconds or less, INP 200 milliseconds or less, CLS 0.1 or less, measured at the 75th percentile of real visits, mobile and desktop separately. INP replaced FID in March 2024. (a) web.dev, read 2026
6. Google/Deloitte "Milliseconds Make Millions" (March 2020, 37 brand sites, 30 million+ sessions): a 0.1 second mobile speed gain lifted retail conversions 8.4%, travel conversions 10.1%, and improved lead-gen page bounce rate by 8.3%. (a)
7. Only 48% of mobile sites pass all three Core Web Vitals (2025 Web Almanac, via corewebvitals.io). (b)
8. Unbounce Conversion Benchmark Report 2024 (41,000 pages, 464 million visits, 57 million conversions): median landing page conversion 6.6% across all industries; range 3.8% (SaaS) to 12.3% (events, legal). Home improvement median 2.6%, top quartile 19.5%. Legal median 4.4%, top quartile 25.3%. (a)
9. Same report: 83% of landing page visits are mobile, but mobile converts 8% worse than desktop. Pages written at a 5th to 7th grade reading level convert at 11.1% versus 5.3% for professional-level copy. Word count and reading time both correlate negatively with conversion (about minus 19%). (a)
10. Same report, home improvement: pages offering mixed conversion paths (call plus form plus click) convert at 4% versus the 2.6% baseline. HVAC pages do best under 200 words, general home services around 300, pest control 400 to 500. (a)
11. WordStream / LocaliQ 2025 Google Ads search benchmarks: average conversion rate across industries 7.52%; Home and Home Improvement 10.22% (down about 15% year over year); HVAC average CPC $5.31 and CPL $45.27 across 3,211 US home service campaigns. (b)
12. Removing navigation: HubSpot A/B test on 5 pages, 0 to 4% lift on top-of-funnel pages, 16 to 28% on mid-funnel pages (article updated August 2025). Case studies: Yuppiechef 3% to 6%, Career Point College 3.12% to 13.64% (nav removed AND form moved above the fold), SparkPage 9.2% to 17.6%. No published counter-case where adding nav raised conversion was found. (b)
13. Google Ads destination requirements do NOT require a nav bar. They require a working, crawlable page, a match between display and final URL, no abusive experiences (pop-ups, interstitials, disabled back button under Better Ads Standards), and original content "not replicated from another source without adding value". (a) Google Ads policy, read 2026
14. Forms: HubSpot's 40,000-page analysis shows conversion falls as fields rise; Unbounce found a dip from 3 to 7 fields then a rise again at 10 for assessment-style forms; required phone fields are the top abandonment field in Zuko's 2024 data (37% abandon, via bloggingwizard). Baymard: never split one input into several fields, never use inline-only labels, validate inline but not prematurely. NN/g: single column, labels above fields, 1 to 2 optional fields maximum, keep erroneous input on error. (a)/(b)
15. Speed to lead: MIT/InsideSales 2007 (15,000+ leads): contact odds fall about 100 times and qualify odds about 21 times between a 5-minute and a 30-minute first call. HBR 2011 audit of 2,241 companies: average response 42 hours, 23% never responded, under-1-hour responders 7 times more likely to qualify the lead. Velocify (about 3.5 million leads): call within 1 minute lifts conversion 391% versus a 2-minute delay. Hatch 2024: 88% of HVAC and home-service firms take longer than 5 minutes, about 3% respond within 1 minute. (a)/(b)
16. Phone leads dominate trades PPC: a 1,500-lead HVAC dataset (June 2022) shows 62.4% of PPC calls are ad click-to-call and 37.6% are website calls; CallRail: 60% of customers prefer calling after finding a business online; 86% will not answer an unknown number (Hiya). (b)
17. Reviews: Spiegel Research Center (Northwestern, 2017): five reviews raise purchase likelihood 270% versus none, the marginal gain flattens after five, and the sweet spot is 4.0 to 4.7 stars (a perfect 5.0 converts worse). Verified-buyer badges add 15%. (b)
18. Google misrepresentation policy: unavailable offers, promotions "not relevant to the destination", and misleading design including fake countdown timers are violations. Google reviews the ad, the site and third-party data. Repeat or egregious violations can suspend the account without prior warning. (a)
19. Doorway abuse (Google spam policies, read 2026): "multiple domain names or pages targeted at specific regions or cities that funnel users to one page" is listed as an example. John Mueller, December 2019: 1,300 city pages "sounds like doorway pages". August 2025 spam update enforced this harder. Ads landing pages are noindex so organic penalty does not apply, but the same thin pages fail the Ads "insufficient original content" rule. (a)/(b)
20. AI Max for Search (announced May 2025, global beta from late 2025): text customization writes headlines and descriptions FROM the landing page, and final URL expansion can send traffic to any relevant page on the domain, overriding pinned assets. Both are on by default when AI Max is enabled; URL exclusions are set under campaign Settings, AI Max. (a) Google Ads Help, read 2026

---

## Findings by area

### Message match and Quality Score

- Google's definition of landing page experience is "how relevant and useful your landing page is to people who click your ad" (a)
- Third-party breakdowns list: relevant original content, transparency, navigation ease, load speed, mobile usability (b)
- KlientBoost 66% lift from headline match; Disruptive 212% lift and 69% lower cost per conversion; Unbounce 2.5 to 3 times (b)
- Practitioner claim that pages with strong ad-to-headline alignment see about 25% lower bounce (c) roast.page 2026
- Re-crawl and re-rate lag is 1 to 4 weeks after a page change (c) North Country 2025
- "Transparency" in practice means: business name and address visible, phone visible, privacy policy linked, what happens with the form data stated (b)
- Myth (still repeated 2024 to 2026): "Quality Score is a KPI to optimise". Google says it is a diagnostic, not a KPI (a)

### Speed and Core Web Vitals

- Thresholds: LCP 2.5 seconds, INP 200 milliseconds, CLS 0.1, at the 75th percentile (a)
- 0.1 second gain: 8.4% more retail conversions, 8.3% better lead-gen bounce (a) Deloitte/Google 2020
- Only 48% of mobile sites pass all three (b) 2025 Web Almanac
- Think with Google 2017 bounce curve (primary page now redirects, number from memory): bounce probability rises 32% from 1 to 3 seconds, 90% at 5 seconds, 106% at 6 seconds, 123% at 10 seconds; 53% of mobile visits abandon a page that takes over 3 seconds (c until re-verified, but universally cited)
- Practical target used by practitioners: PageSpeed Insights mobile score above 80 and LCP under 2.5 seconds on a mid-tier Android over cellular (c)
- Google "mobile speed score" page (answer 9070516) returned 404 in August 2026, so treat the old 1 to 10 mobile speed score as retired (a)

### Above-the-fold anatomy for service pages

- One dominant CTA; homepages with 20+ exit points are what the "navigation" signal penalises (b)
- Instapage "attention ratio 1:1" is the practitioner framing (c)
- Click-to-call is the primary mobile action: 62.4% of trades PPC calls never touch the site (b); 60% prefer calling (b) CallRail
- Mixed CTA pages (call plus form) convert 4% versus 2.6% for home improvement (a) Unbounce 2024
- 41% of online bookings arrive after hours (b) Jobber 2025, so the form must work when nobody answers the phone
- Sticky bottom CTA bar on mobile: no published controlled test found in this pass; keep as house rule (c)
- Word count: HVAC under 200 words, home services about 300, pest control 400 to 500, legal declines steadily with length (a) Unbounce 2024
- Reading level 5th to 7th grade converts 11.1% versus 5.3% (a)

### Forms

- Conversion falls with field count in HubSpot's 40,000-page set (a); Unbounce 2026 figures quoted by third parties: 1 field 13.4%, 3 fields 10.1%, 5 fields 7.8%, 7 fields 5.3%, 9 fields 3.6% (b)
- Exception: qualifying questions on assessment-style forms can raise conversion because the visitor sees personal benefit (b) Cobloom
- Required phone field is the top abandonment cause (37%) (b) Zuko 2024 via bloggingwizard; for a call-back service the phone IS the lead, so keep it and make it the second field, with tel input type
- Multi-step forms convert 86% higher than single-step in HubSpot data (b) - useful when a qualifying dropdown is needed
- Baymard: never split a phone number into three boxes, never inline-only labels, positive inline validation (a)
- NN/g: single column, labels above, mark optional not required, keep input on error, action-word button (a)
- Button text as the outcome ("Get My Free Quote") is house rule; no controlled test found (c)

### Social proof placement

- Five reviews give the 270% lift, gains flatten after five, 4.0 to 4.7 stars beats 5.0 (b) Spiegel 2017
- NN/g: social proof works where it "removes decision-making uncertainty", so place it at the decision point; too few counts backfire; review widgets slow mobile pages (b)
- Google Ads "unacceptable business practices" covers hiding licensing or qualifications, so licence and insurance lines are a policy hedge as well as a trust signal (a)
- Review count with the source named (Google, 4.9 stars, 312 reviews) beats a bare star row: house rule, supported by Spiegel's verified-badge 15% (b)
- Fake or invented reviews: Google August 2025 spam update names fake reviews; FTC rule on fake reviews took effect October 2024 (b)

### Benchmarks

- Unbounce 2024: overall 6.6% median; home improvement 2.6% median, 19.5% top quartile; legal 4.4% median, 25.3% top quartile; financial 8.4%; SaaS 3.8% (a)
- WordStream 2025: 7.52% average search conversion; home and home improvement 10.22%; HVAC CPL $45.27 (b)
- Invoca 60-million-call analysis: phone leads convert at 37% across industries (b) 2024 press release
- A "20% page" is therefore a top-quartile home-services page, not the median. The blueprint's 20% claim holds only for pages that also fix speed-to-lead and call handling (b)

### Dedicated page versus site page with navigation

- Evidence for stripping nav: HubSpot 0 to 28%, Yuppiechef 100%, Career Point 336% (with form moved), OptinMonster 47% lower CPA (b)
- Evidence for keeping nav: none found as a conversion lift. The arguments for keeping some links are policy and trust, not conversion: Google transparency wants contact details and a privacy policy reachable; 10DLC needs a privacy policy link on the form page; AI Max final URL expansion and Google's crawler need the page reachable (a)
- Resolution: no header nav on ad pages; a minimal footer with address, phone, privacy, terms; page noindex; page linked from nowhere public but crawlable by the Ads bot (a)/(b)
- Myth: "ad landing pages need full site nav for Quality Score". No Google source says this. What Google grades is ease of finding what the visitor came for (a)

### Collapsed content, accordions, mobile-first

- Google: "You can have a different design on mobile ... moving content into accordions or tabs; just make sure that the content is equivalent" (a) mobile-first indexing docs, read 2026
- Mobile-first indexing is complete; Google crawls with the smartphone agent (a)
- 83% of landing page traffic is mobile, converts 8% worse (a) Unbounce 2024
- FAQ in an accordion is fine for Ads and organic; hide nothing the H1 promises (a)

### Doorway risk for service-plus-city pages

- Google spam policy example: pages "targeted at specific regions or cities that funnel users to one page" (a)
- RicketyRoo 2025: swapping the city name in boilerplate is duplication; a legitimate city page has local reviews, photos, job examples, local FAQ, honest "we travel to" wording (b)
- Ads-only city pages should be noindex; but the Ads "insufficient original content" rule still applies, so each needs at least the local proof block and service-area map (a)
- Rule of thumb from the same sources: one page per real service area you can prove you work in, not one per suburb you can spell (b)

### Thank-you page and booking calendar

- Standard-pages reference already requires a distinct /thank-you URL for the conversion event (house rule, matches Google's conversion tracking model) (a)
- Setting the callback time on the thank-you page ("we call within 5 minutes during hours") is the house rule; supported by Housecall Pro 2025: 97% of homeowners say response speed influences hiring (b)
- Embedding a self-booking calendar on the thank-you page: no controlled data found in this pass; logical for consult-style services, wrong for emergency trades where the phone rings first (c)
- Thank-you page must be noindex and out of the sitemap or the conversion count fills with organic visits (a)

### Speed to lead and SMS

- 5 minutes versus 30: 100 times contact odds, 21 times qualify odds (a) MIT/InsideSales 2007
- Under 1 minute: 391% (b) Velocify, roughly 3.5 million leads
- 88% of home-service firms miss 5 minutes; 63.5% of companies never respond (RevenueHero 2024) (b)
- 86% will not answer an unknown number (Hiya) and 73% want caller ID identification, so the SMS auto-reply is what makes the callback get answered (b)
- Since February 2025 US carriers block SMS from unregistered 10DLC numbers outright (b) Zavu/CallHub 2025
- A2P 10DLC web-form consent (Twilio, GHL): unchecked checkbox, business named, message type and frequency, "Message and data rates may apply", "Reply STOP to cancel, HELP for help", privacy policy link, and the policy must say mobile opt-in data is never shared with third parties for marketing. Consent must not be required to submit the form (a)
- Canada: GHL notes separate Canadian 10DLC registration rules from 2025 (b)

### Call tracking on the page

- Google's own model: enhanced conversions for leads hashes email or phone from the form and matches to the click; offline conversion import needs the GCLID stored with the lead. Google now recommends enhanced conversions for leads over plain GCLID import (a)
- Enhanced conversions requires auto-tagging on and the Google tag or GTM (a)
- One number versus a pool: no conversion data either way. Pools break name-address-phone consistency for local SEO and Google Business Profile; a single number with the gclid and keyword stashed in sessionStorage and posted on tel: click gives keyword-level attribution without pools (c) house rule, consistent with the CallRail LSA guidance that LSA calls use Google's own forwarding anyway

### Popups and countdown timers

- Google Ads destination experience: pop-ups and interstitials that violate Better Ads Standards are a disapproval reason (a)
- Google Search: intrusive interstitials on mobile have been a ranking signal since January 2017; small banners and legally required dialogs are exempt (b, primary blog post did not load)
- Fake countdown timers are named under misleading design in the misrepresentation policy (a)
- Real deadlines stated honestly are allowed; a timer that resets on reload is not (a)
- Email-capture popup on an ad page conflicts with all of the above on mobile; if used at all it is desktop exit-intent only (b)

### Templates versus uniqueness

- Google Ads "insufficient original content": pages "replicated from another source without adding value" or built solely to serve ads are disapproved (a)
- A shared template with unique H1, offer, proof, service specifics and service area passes; the same page with a city swapped does not (a)/(b)
- Text customization now writes ad copy FROM the page, so filler copy on the page becomes filler in the ad (a)

### A/B testing under Smart Bidding

- Google Ads custom experiments: cookie-based split recommended, 50/50 split recommended, one live experiment per campaign, up to 5 scheduled (a)
- Landing page test = duplicate the campaign in an experiment, change only the final URLs (b) Prime Digital, DataFeedWatch 2025
- Wait out the learning phase: 1 to 2 weeks for low volume; aim for 50 to 100 conversions per arm before deciding; 6 weeks is safer with Smart Bidding (b)
- Do not judge days 1 to 3, and evaluate cost per lead and lead quality, not conversion rate alone (b)
- Practical floor: about 30 to 50 conversions a month or the test cannot resolve (b)

### Accessibility basics

- WCAG 2.2 SC 2.5.8 target size minimum 24 by 24 CSS pixels, level AA, with spacing and inline exceptions (a) W3C
- Text contrast 4.5 to 1 for body text (WCAG 1.4.3, AA) (a)
- Visible labels above fields (Baymard, NN/g) double as the accessibility requirement (a)
- Practical: tel and email input types, form fields with real label elements, focus states, alt text on proof images (a)

### 2025 to 2026 changes

- AI Max for Search: announced May 2025, global beta by October 2025; Google claims about 14% more conversions at similar CPA; text customization reads the landing page; final URL expansion on by default with AI Max, excludable per URL (a)
- Google Ads "unavailable offers" policy page refreshed 2025 with landing-page examples (a)
- August 2025 spam update: doorway pages, fake reviews, thin auto-generated pages hit harder (b)
- February 2025 carrier cut-off for unregistered 10DLC (b)
- Home improvement search conversion rate fell about 15% year over year while CPCs rose (b) WordStream 2025

---

## Myths, with dates

- "Quality Score is a KPI" - Google's Quality Score help page says it is not, read August 2026 (a)
- "Ad landing pages need full site navigation for Quality Score" - no Google source; every published test shows removing nav lifts conversion, HubSpot 2025 update (b)
- "Shorter is always better for forms" - Unbounce's own data shows the curve rises again for qualifying forms; Cobloom summary 2024 (b)
- "5-star rating is best" - Spiegel 2017: 4.0 to 4.7 converts better than 5.0 (b)
- "Content hidden in accordions is devalued" - Google mobile-first docs say accordions are fine if content is equivalent, read 2026 (a)
- "20% is a normal landing page conversion rate" - Unbounce 2024 median is 6.6%; 20% is top-quartile home services (a)
- "Countdown timers are banned" - only fake ones; honest deadlines are allowed under misrepresentation policy, read 2026 (a)
- "One page per city is free SEO" - doorway abuse example in Google's spam policy; Mueller 2019; 2025 spam update (a)
- "Speed-to-lead 391% is a 2025 study" - it is Velocify data from about 2012, still valid, but cite it as such (b)
- "Mobile speed score in Google Ads" - the help page is gone as of August 2026; use PageSpeed Insights and CrUX instead (a)

---

## The 31 rules a /landing-page command should enforce

1. H1 repeats the ad group's promise word for word; the offer line under it repeats the ad's offer (a)
2. One dominant CTA above the fold: click-to-call button on mobile, short form on desktop; the same CTA repeated after each proof block (b)
3. No header navigation on an ad page; a minimal footer with business name, address, phone, privacy and terms links (a)/(b)
4. Page is noindex and excluded from the sitemap, but crawlable, and never blocked in robots.txt (a)
5. LCP 2.5 seconds or less, INP 200 milliseconds or less, CLS 0.1 or less on a mid-tier phone over cellular; WebP or AVIF images, no third-party review widgets that block render (a)
6. Copy at a 5th to 7th grade reading level; HVAC and emergency trades under 200 words, standard home services about 300, complex services up to 500 (a)
7. Form is 3 to 4 fields: name, phone (tel input, second field), what do you need (dropdown), optional postcode; never split a phone number, never inline-only labels, labels above fields (a)
8. Button text names the outcome, never "Submit" (c, house rule)
9. Phone number is the same real number everywhere on the site; no number pools; the tel: link fires the stashed gclid and keyword to the webhook before dialling (c, house rule)
10. Capture gclid, campaign, ad group, keyword and UTMs on landing into sessionStorage and send them with every form post and call click (a)
11. Enhanced conversions for leads on: hashed email or phone leaves the form; auto-tagging on (a)
12. Distinct /thank-you URL fires the conversion; it is noindex, out of the sitemap, states the callback time, shows the phone number, has no nav and no second ask (a)
13. Proof at the point of doubt: star rating with the exact count and the source named, licence and insurance line in the hero, guarantee restated beside the form (b)
14. Minimum five real reviews shown; show the real average even if it is 4.7, never round to 5.0 (b)
15. Real photos of the owner, team, vehicles and jobs; no stock, no placeholder boxes (c, house rule, plus Google "original content")
16. Service-area block with the real towns served so out-of-area visitors self-select out (b)
17. FAQ in an accordion is allowed; the three objections it answers are price, timing, guarantee (a)
18. No popups on mobile, no interstitials, no disabled back button; desktop exit-intent only if ever (a)
19. No fake countdown timers, no "only 3 spots" unless it is literally true and documented in proof.md (a)
20. Every claim traces to context/proof.md; no invented reviews, no borrowed logos (a)
21. One page per ad group, but a service-plus-city page only for a city with its own local proof (reviews, photos, jobs); city-swap templates are disapproved as insufficient original content (a)
22. Sticky bottom call bar on mobile, one only, above the OS safe area (c, house rule)
23. Touch targets 24 by 24 CSS pixels minimum (44 preferred), body text contrast 4.5 to 1, real label elements, alt text on proof images (a)
24. Speed-to-lead wired before the page goes live: webhook triggers the auto-dial to the owner's phone, and an SMS to the lead within 60 seconds that names the business (a)/(b)
25. The form carries an unchecked SMS consent checkbox with the 10DLC wording, and submitting does not depend on it (a)
26. Privacy policy states mobile opt-in data is never shared with third parties for marketing, and is linked from the form (a)
27. If AI Max is on, add URL exclusions for every page that is not a converting page, or turn final URL expansion off for the campaign (a)
28. Page copy is written knowing text customization will quote it: no filler lines, every sentence is a claim you would put in an ad (a)
29. Landing page tests run as a Google Ads custom experiment, cookie split 50/50, only the final URL changed, minimum 50 to 100 conversions per arm and 3 to 6 weeks, judged on cost per lead and lead quality (a)/(b)
30. Target: top-quartile for the niche (home services 19.5%, legal 25.3%), and call it a fail below the niche median (home improvement 2.6%, legal 4.4%, all-industry 6.6%) (a)
31. After launch, re-check landing page experience in Google Ads 2 to 4 weeks later; Below average triggers the CRO cheatsheet top to bottom (b)

---

## Sources (62)

1. Google Ads Help, About Quality Score (answer 6167118), read August 2026
2. Google Ads Help, Landing page experience within Quality Score (answer 2404197), read August 2026
3. Google Ads Policy, Destination requirements (answer 6368661), read August 2026
4. Google Ads Policy, Misrepresentation (answer 6020955), read August 2026
5. Google Ads Policy, Misrepresentation: unavailable offers (answer 15937063), 2025
6. Google Ads Help, About final URL expansion in Search (answer 16230205), 2025
7. Google Ads Help, How AI Max for Search campaigns works (answer 15910187), 2025
8. Google Ads Help, Enhanced conversions for leads (answer 11347292), read August 2026
9. Google Ads Help, Offline conversion import with GCLID (answer 2998031), read August 2026
10. Google Ads Help, About custom experiments (answer 6261395), read August 2026
11. Google Search Central, Spam policies, doorway abuse section, read August 2026
12. Google Search Central, Mobile-first indexing best practices, read August 2026
13. Google Search Central, Understanding page experience, read August 2026
14. web.dev, Web Vitals thresholds, read August 2026
15. Deloitte Ireland and Google, Milliseconds Make Millions, March 2020
16. Unbounce, Conversion Benchmark Report 2024 (overview)
17. Unbounce, Conversion Benchmark Report, home improvement industry page
18. Unbounce, Conversion Benchmark Report, legal industry page
19. Unbounce, Average landing page conversion rates Q4 2024
20. Unbounce, What's a good conversion rate (41,000 pages)
21. WordStream / LocaliQ, Google Ads Benchmarks 2025
22. WordStream, Google Ads Benchmarks 2026
23. WordStream, Conversion rate benchmarks by industry
24. HubSpot, Should you remove navigation from landing pages (5-page A/B test), updated August 2025
25. CXL, Should you use navigation on landing pages (blocked on fetch; findings via SeedProd summary)
26. SeedProd, Should landing pages have navigation, 2025
27. Cobloom, Form fields and conversion rates: is less really more
28. Bloggingwizard, Landing page statistics 2026 (Zuko 2024 phone-field figure, Unbounce field-count figures)
29. Digital Applied, Landing page statistics 2026
30. Baymard Institute, Mobile form usability: never use inline labels
31. Baymard Institute, Avoid splitting single input entities
32. Baymard Institute, Usability testing of inline form validation
33. Nielsen Norman Group, Social proof in the user experience
34. Nielsen Norman Group, Website forms usability guidelines
35. Spiegel Research Center, Northwestern, How online reviews influence sales, 2017
36. KlientBoost, Message match, case studies
37. Web Tonic, Message match 2026 (Disruptive Advertising 212% figure)
38. roast.page, Landing page statistics 2026
39. Apexure, Below average landing page experience, 2026 (Tabeling 2023 CPC figure)
40. North Country Consulting, Landing page experience score and CPC, 2025
41. Landingi, Google Ads Quality Score factors, 2025
42. Stackmatix, Google Ads landing page alignment
43. corewebvitals.io, Core Web Vitals explained 2026 (Web Almanac 2025 pass rate)
44. Christoph Olivier Consulting, Page speed statistics 2026
45. Harvard Business Review, The short life of online sales leads, March 2011
46. AInora, Lead response time: every study, updated June 2026 (HBR and MIT/InsideSales numbers)
47. LeadAngel, Speed to lead statistics (Velocify 391% attribution)
48. Apten, Speed-to-lead benchmarks 2026 (Hatch 2024, RevenueHero 2024, Hennessey 2025)
49. CallRail, 31 home services marketing statistics 2026
50. The Data Driven Trades, Breaking down Google PPC leads: click-to-call vs website calls, June 2022
51. Invoca, 60 million call analysis press release, 2024
52. Search Engine Land, AI Max for Search: everything you need to know, October 2025
53. Jyll, AI Max for Search campaigns explained, August 2025
54. AdAlign, Google AI Max final URL expansion and ad-to-page governance, 2025
55. Prime Digital, Google Ads landing page testing: how to run a proper A/B test, 2025
56. DataFeedWatch, Google Ads experiments full guide, 2025
57. Karooya, Google Ads experiments in 2025
58. Twilio, Improving your chances of A2P 10DLC registration approval
59. HighLevel Support, A2P 10DLC campaign approval best practices
60. Zavu, 10DLC registration deadlines and requirements 2025
61. W3C, Understanding WCAG 2.2 SC 2.5.8 Target Size (Minimum)
62. Search Engine Roundtable, John Mueller on city landing pages as doorway pages, December 2019
63. RicketyRoo, Location pages: what crosses the line to doorway abuse, 2025
64. The Search Studios, Google's August 2025 spam update explained
65. Think with Google, Mobile page speed industry benchmarks, 2017 (primary now redirects; numbers cited from memory, grade c)

Not reached this pass (search budget exhausted): Optmyzr Quality Score study, Instapage attention ratio page (404), Reddit r/PPC threads (blocked), Klipfolio. None of the rules above depend on them.
