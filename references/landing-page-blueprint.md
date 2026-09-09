# How to build a landing page that converts at about 20%
Revised 28 August 2026 · the exact component stack, proven over years of testing and tens of thousands in ad spend, checked against 62 sources
Next: pick the offer. It sits above the fold and it is the highest-leverage element on the page.

The structure is the asset. Don't reinvent it - fill it in. Everything below uses `[bracketed placeholders]` you swap for your own business, niche and numbers, so it works for any service business.

**Read `references/persuasion.md` before you write a word into the placeholders.** The structure below is the skeleton; that file is what goes on it. Four sections carry most of the result here:

- **Message match (section 7) is worth more than any design change on this page.** A documented 212.74% conversion lift, and 66% from aligning the headline to the ad alone with no design change. The promise in the ad appears above the fold **in the same words**, not a synonym. Every point of mismatch also costs roughly 13-16% more per conversion through Quality Score
- **Reading level (section 5).** Pages at grade 5 to 7 converted at 11.1% against 5.3% for professional-level writing. Difficult words correlated with a 24.3% drop. Write for someone mid-problem, on a phone
- **The six fears (section 4).** Every block on this page either kills a specific fear or gets cut. That is the test, not "does it look finished"
- **Substantiation (section 9).** A guarantee in the ad must appear on this page in that wording, and a testimonial with a number in it needs a typical-results line beside it

**The 2026 pattern to know:** CTR rose 7.49% while conversion rates fell in 13 of 14 industries. High CTR with a low conversion rate is now the default, and it is a page problem, not an ad problem. Mobile is 65% of clicks and 47% of conversions, and that gap is almost entirely this page.

Where a line carries a grade, (a) is Google's own documentation or a study of 10,000+ pages or leads, (b) is a named study or documented test with a stated sample, (c) is a practitioner claim or house rule without a controlled test behind it. Ungraded lines are the house ruling and stay as written.

**What 20% means.** The all-industry median landing page converts at 6.6%. Home improvement pages convert at 2.6% at the median and 19.5% at the top quartile; legal pages 4.4% and 25.3% (a, Unbounce 2024, 41,000 pages). A 20% page is a top-quartile page. It needs everything below plus the speed-to-lead wiring, not the copy alone.

## Every element does one of three jobs

This is sales copy on a page, not a brochure. An element earns its place by doing one of these:

1. **Social proof** - someone like you already trusted us and was happy
2. **Results and outcomes** - here is the specific thing you get
3. **Benefits, not features** - what it does *for you*, not what it *is*

If a sentence, image or section is not doing one of those three, cut it. Little text. Mostly bullets.

The page has **one job**: get the visitor to call or fill out the form. Everything points there.

## The searcher's city, on the page as well as in the ad

The ad says their city through `{LOCATION(City)}` in the pinned headline. **The page has to agree with it, or the match breaks at the click** - and message match is the highest-lift change available here (a documented 212.74%, and 66% from the headline alone). (Jono, 2 September 2026.)

**How it works, and the one gotcha.** Google's `{loc_physical_ms}` ValueTrack parameter puts a NUMERIC geo criterion id in the URL, never a city name, and **there is no API call that converts one at request time** [F, verified 2 September 2026 - `geo_target_constant` is the only source]. So the map is pulled once and ships with the site.

1. Every ad's final URL carries it: `https://you.com/lp/plumber?loc={loc_physical_ms}`
2. `python3 code/build_geo_map.py --country CA` writes `website/lib/geo-map.json` (1,168 Canadian places, 26 KB)
3. The page uses `<City fallback="Toronto" />` from `components/lp/City.tsx`

**The fallback is not optional and it is never "your area".** Google cannot resolve a location on a large share of clicks, and the fallback serves every one of them. Write a real place the business actually covers, and read the headline out loud with the fallback in it - that is the version most people see.

**Do not city-swap a claim.** Swapping "Emergency Plumber in Hamilton" is message match. Swapping "Hamilton's #1 rated plumber" onto a page for someone who has never worked in Hamilton is a false claim that happens to be automated.

## The one law: message match

The H1 repeats the ad group's promise word for word, and the line under it repeats the ad's offer. Someone who clicked "Emergency Drain Cleaning Dallas" lands on exactly that.

- Matching the ad headline to the H1 alone lifted conversion 66% in one documented test and 212% with 69% lower cost per lead in another; strong match converts 2.5 to 3 times weak match (b)
- It is also the relevance half of Google's landing page experience rating, and above-average experience plus ad relevance is cited as worth about 36% lower cost per click (b, 2023)
- Google now writes ad headlines FROM the page when AI Max text customization is on, so a filler line on the page becomes a filler line in the ad (a, 2025)

One ad group, one page. That is the whole reason the page exists.

## The 18 components every page needs

Build every page with all of these. This is the recipe.

**Above the fold**

- [ ] **1. Founder video** near the top, 30 to 60 seconds - face and voice build trust faster than any copy. Their own why and their own promise, in their words. It sits high on the page because it is the closest thing to meeting them
- [ ] **2. The above-the-fold proof block** - three parts, and it sits with the headline, not below it (Jono, 2 September 2026):
  - **The rating line** - "4.9/5 from 78 reviews" with the stars drawn, beside the platform's own badge. Real numbers only, and a link that proves them
  - **Three avatar circles** - real client photos where they exist, otherwise initials in a coloured circle from the palette. Never a stock face, never a grey silhouette
  - **A checkmark list, three items** - years in business, clients or jobs served, and the guarantee. Ticks, not bullets. These are the three fastest credibility hits on the page and they are all numbers
- [ ] **3. CTA above the fold AND on every major section** - about eight times total on desktop. **Every one of them scrolls smoothly down to the form** (Jono, 2 September 2026): an anchor to the form's id, `scroll-behavior: smooth` on the root, `scroll-margin-top` on the form so the heading is not cut off, and focus moved into the first field on arrival so a keyboard or screen-reader user lands where the click promised. A CTA that jumps the viewport reads as a page reload and loses people who thought they had left. Honour `prefers-reduced-motion` and jump instantly for anyone who asked for that. Phone CTAs are the exception - a `tel:` link dials, it never scrolls
- [ ] **4. Strong offer above the fold** that resonates with the niche - see the offer formula below

**Proof**

- [ ] **5. Recognizable brands** you've worked with - a logo wall, six marks. Real logos where they exist; where they do not, designed placeholder marks that look deliberate, clearly marked for swap, never a stretched grey box
- [ ] **6. Video testimonials, nine, stacked** - the single biggest trust driver on the page. Stacked in a column, not a carousel: a carousel hides eight of them behind an arrow nobody clicks. Poster frame, play on click, never autoplay with sound. Fewer than nine? Show what exists - never pad the grid with empty tiles
- [ ] **7. Three selling points** that sell this specific company - these rotate per business
- [ ] **9. Response time** stated and repeated, for example "75 seconds" - speed signals you care
- [ ] **10. Written testimonials** in volume, 20 or more, alongside the videos
- [ ] **13. Proof badges** - Google, Yelp, Trustpilot, Facebook, industry bodies. The platform mark plus the real score and count. No score on file means the badge comes off - a badge with an invented number is fabricated proof
- [ ] **15. Case studies or portfolio, whichever fits - and sometimes neither.** Case studies for businesses judged on outcomes, a portfolio for businesses judged by looking (photography, events, trades, renovation, landscaping). Forcing both onto a page that needs neither is padding, and padding reads as thin proof

**Conversion and layout**

- [ ] **8. Little text, mostly bullet points**
- [ ] **11. Sign-up form on the page** with a few qualifying questions
- [ ] **12. Lead magnet** for filling out the form - a free PDF, tool or generator, named on the form and delivered on the thank-you page and by email
- [ ] **14. No header and no footer on AD pages. One legal line instead. Header and footer stay on SEO pages** - see the page-type rules
- [ ] **16. One inspiration screenshot for STYLE only** - copy the look, keep these components
- [ ] **17. On MOBILE, one CTA bar fixed to the bottom of the viewport**, visible the whole scroll, call on the left and the form on the right. It stays put while the page moves under it. Desktop gets the CTA repeated at every major section instead
- [ ] **18. Copy is mostly social proof, results, and benefits over features.** Every word earns its place.

## The offer - component 4, and the most important thing on the page

The offer sits above the fold and must instantly resonate with the niche. There are two ways to build it.

### Option A - the results guarantee, best for results-based services

> We'll help you increase **[result]** by **[X]%** in **[timeframe]**, or you don't pay.

Pattern variations:

- "Make your business up to **[X]x** more [profitable/efficient] in **[timeframe]** - or we [pay you / refund you]."
- "**[Number]+** qualified [leads/sales] per [week/month] in **[timeframe]** or you don't pay."

Risk-reversal options to bolt on: a money-back guarantee · "we pay you $[amount] just for showing up" · "only [N] spots this month" · an eligibility filter such as "for businesses doing $[X]/month+".

Every risk-reversal line must be literally true and recorded in `context/proof.md`. Google's misrepresentation policy names unavailable offers and misleading urgency as violations, and repeat violations can suspend the account without warning (a, read 2026).

### Option B - the emotional offer, best when a hard number doesn't fit

When you can't promise a percentage, sell the feeling and remove the fear. Frame it **positively**.

The pattern: name the fear of getting it wrong - picking the wrong provider, ruining a once-in-a-lifetime moment, wasting money. Then flip to the positive outcome: peace of mind, the experience, "focus on [what they actually care about]".

Example skeleton: **"We'll Take Care Of Everything."** + *"We hired the top [X]% of [providers] out of [large number]. We'll remove the stress from [the task] - so you can focus on [the payoff]."*

### How to pick the offer

Before writing, research the niche - search the top competitors and the buyer's real fears and desires - to find the strongest angle.

If the research isn't conclusive, ask the business owner what their buyers care about most. Never guess the offer.

## Section-by-section build order

Build top to bottom in this order. The order is part of the asset - it walks a stranger from "is this real" to "I'll press the button", and it does not get rearranged to suit a business. Each section is a fill-in template.

### 1. Hero - does the most work

- **Business name and phone as plain content at the top of the hero.** Not a bar, not a nav, nothing that links anywhere else on the site. The name is text, the number is a `tel:` link.
- **Big benefit headline:** `[One short promise - the outcome they want]` - and it repeats the ad group's headline word for word
- **Subhead = the offer + proof:** `[Offer] + [proof number, e.g. "4.9 stars from [N] reviews"]`
- **3 credibility bullets:** `[trait 1]` · `[trait 2]` · `[trait 3]` (e.g. Same-day · 5-Star Rated · [N]+ jobs/year)
- **Licence and insurance line:** hiding qualifications is an "unacceptable business practice" under Google Ads policy, and it is the first thing a homeowner checks (a)
- **Both CTAs, side by side:** the phone as click-to-call, and the short form. On a 1,500-lead HVAC dataset 62% of paid calls were click-to-call from the ad or hero, and home-improvement pages that offer call AND form convert at 4% against a 2.6% baseline (b)/(a)
- **A real image, or a designed substitute.** Never a placeholder frame. A founder video can sit here instead - face to camera, 30 to 60 seconds - lazy-loaded so it never becomes the largest contentful paint (a)

### 2. Trust strip - immediately under the fold, where the first doubt lands

- Star rating with the **real average and the exact review count, source named** - Google, Yelp, Facebook, industry sites
- **Recognizable client and partner logos** where they exist. Borrowed credibility is the safe choice. Only logos of real clients in `context/proof.md`
- Scale in one line: `[N]+ [jobs] a year` · `[N] years in [city]` · `[licence number]`
- Five reviews is the floor: five raise purchase likelihood 270% over none, and the gain flattens after five (b, Spiegel 2017). Show the real average even if it is 4.7 - a 4.0 to 4.7 rating converts better than a perfect 5.0 (b)

### 3. The problem, then the promise - the bridge, kept short

- Two or three lines naming what they are dealing with right now: `[the thing that is broken, leaking, overdue, or about to cost them money]`
- Then one sentence on what you do about it: `[the promise, in the same words as the ad]`
- This is the shortest section on the page. It exists to make the visitor feel understood, not to pitch.

### 4. What you get - benefits, never features

- Headline: `[Everything that's included]`
- Bullets tied to outcomes: `[deliverable 1 → what it means for them]` · `[deliverable 2 → …]` · `[deliverable 3 → …]`
- Say what is NOT included too. Naming the boundary reads as honesty and filters the wrong lead before they cost a call.
- CTA repeats here

### 5. Proof - the trust engine, and the heaviest block on the page

- **Video testimonials** - real clients on camera. This is the single biggest lift. Nine is the target, one is better than none.
- **Written testimonials in volume, 20 or more**, each with a **real first name and date** and **specific details** - name the staff member, name the outcome. Specificity is what makes it believable.
- **Proof badges repeated** here with exact counts and the source named.
- Render reviews as static HTML, not a third-party widget. Review widgets are a known mobile speed drag (b, NN/g)

### 6. How it works - three steps

The biggest silent objection on a service page is "what actually happens if I press this button". Answer it in three steps and no more:

1. `[You call or book - takes 2 minutes]`
2. `[We [do the thing], [when]]`
3. `[You get [the outcome], [guarantee]]`

State the response time here in words: `[Average response time: 75 seconds.]` Speed signals you care, and it beats competitors who reply in days. It stays on the page only if the auto-dial actually hits it.

### 7. Results - case studies or portfolio

Choose the pattern that fits the business type - the two patterns are further down this file. Visual portfolio for trades and creative work, numbers-driven case studies for results services. Anchor every case to a number and a timeframe.

### 8. Why us - the three selling points

The three things this business is best at, chosen because they are **true and differentiating**, hammered here and echoed everywhere else on the page. Each one gets a line of proof under it, not an adjective. CTA repeats here.

### 9. Service area

The real towns served, named. Out-of-area visitors self-select out before they cost a call. One page per real service area the business can prove it works in - a template with only the city name swapped is a doorway page in Google's spam policy and "insufficient original content" under Google Ads destination rules, even when noindexed (a).

### 10. The guarantee

Risk reversal, in the **same wording as the ad**. A guarantee that appears in the ad and not on the page is a substantiation failure and a Quality Score leak. Every risk-reversal line must be literally true and recorded in `context/proof.md`.

Optional scarcity, in words only: `[We only take [N] [jobs/clients] per [period].]` No countdown timers unless the deadline is real and does not reset; a fake timer is named as misleading design in Google's misrepresentation policy (a).

### 11. What it costs

Silence on price is one of the biggest exits on a service page. Say something true: a starting price, a typical range, a per-unit figure, or plainly how pricing works and what changes it. "We quote after a 5-minute call, and the quote is fixed" is a legitimate answer. Refusing to mention money at all is not.

### 12. FAQ - the reasons they DON'T enquire, answered

Not general questions about the service. **The FAQ answers the reasons somebody reads this whole page and still closes the tab** (Jono, 2 September 2026), which makes it the highest-value block on the page after the proof.

Ask the owner directly: what do people say when they don't go ahead? Those exact sentences become the questions, in the customer's words, not tidied up. Five to seven of them.

The ones that show up for almost every service business:

- **"How much is this going to cost?"** - answer with a real range or a starting figure. "It depends" is the answer that loses the lead
- **"How do I know you won't disappear / do a bad job?"** - the guarantee, the licence, the insurance, the years
- **"What happens after I fill this in?"** - the exact next step and the callback time. Uncertainty about what happens next kills more forms than price
- **"Am I too small / too big for you?"** - say who this is for and who it is not. Disqualifying openly raises the fill rate from the people who do fit
- **"Why you and not the other three quotes I'm getting?"** - the three selling points, restated as an answer
- **"Do I have to commit to anything?"** - the terms, plainly

**Answer them straight and short.** An FAQ that dodges reads worse than no FAQ, because the reader came to it already suspicious. If an answer is genuinely bad news, say it plainly - it costs one lead who was never going to buy and wins three who now believe the rest of the page.

### 13. The close - form, phone, guarantee

The last thing before the legal line, and the second conversion point on the page.

- **The form again**, same fields, with the response-time line beside it
- **No calendar widget here, or anywhere on the landing page.** The calendar lives on the thank-you page only - on the landing page it would compete with the form and the call, and a page with three asks converts like a page with none
- **The phone number**, one more time
- **The guarantee restated**, because doubt peaks at the moment of action
- Button copy that affirms the choice: "Yes! I Want A Quote Now"

**The form spec - FOUR FIELDS. First name, last name, email, phone. Nothing else.** (Jono, 2 September 2026.) No segmenting dropdown, no postcode, no revenue band, no "how did you hear about us", no message box. Every extra field is a reason to close the tab, and the qualifying happens on the call where it is free. Conversion falls as fields rise across 40,000 pages (a, HubSpot). Conversion falls as fields rise across 40,000 pages (a, HubSpot), the exception being qualifying questions the visitor sees as benefiting them (b). Phone is the lead for a call-back service, so it stays and uses a `tel` input. Never split a phone number into boxes, never rely on placeholder-only labels, put labels above the fields, single column, keep what they typed when an error shows (a, Baymard and NN/g). Never add a fifth field to this page. If qualifying questions are genuinely needed, they belong on the thank-you page or the call, after the lead is already captured.

**A lead magnet raises the fill rate** where one fits: a free PDF such as "[Top N mistakes to avoid when [doing the thing]]", a free tool, or a generator.

**SMS consent on the form.** An unchecked checkbox reading "[Business] may text me about my request. Msg and data rates may apply. Reply STOP to cancel, HELP for help." Submitting must not depend on it. Since February 2025 US carriers block texts from unregistered numbers, and registration is refused without this wording and a privacy policy that says mobile opt-in data is never shared with third parties for marketing (a, Twilio and HighLevel 10DLC guidance).

### 14. The legal line - and nothing after it

One centred line, small type, directly under the close: `[Business name] · [street address, city] · [phone] · [Privacy Policy] · [Terms]`.

Two links, both new-tab, and that is every link on the page besides the CTAs. It exists because Google grades transparency, the 10DLC registrar needs a reachable privacy policy on the form page, and the Ads bot must be able to crawl the page. **It is one line. It is not a footer.**

### Running the whole page

- **Mobile:** one sticky call bar pinned to the bottom, always visible
- **Desktop:** the CTA repeats on every major section
- **Email capture, if the business wants one:** desktop exit-intent only, never on page load, never on a phone. A popup on an ad page is a liability - Google Ads disapproves destinations with pop-ups and interstitials that break the Better Ads Standards (a), and Google Search has treated intrusive mobile interstitials as a negative signal since 2017 (b). The mobile equivalent is the sticky call bar.

### The thank-you page

Its own URL, `/thank-you`, because that URL is where the conversion tag fires.

- A warm confirmation - "You're the best!" or "Thank you" - and the callback time stated in minutes
- **The GHL calendar embedded. Always.** (Jono, 2 September 2026.) This is the highest-intent moment on the whole site - they just raised their hand, so let them book while they still want to. A thank-you page that only says "we'll be in touch" throws that moment away. For emergency trades the phone number sits above the calendar, but the calendar is still there
- **The lead magnet delivered here and by email** - the PDF, checklist or tool promised on the form. It is the reason the page is worth landing on and the first thing that proves you deliver what you say
- The phone number, for anyone who does not want to wait
- `noindex`, out of the sitemap, no navigation, no second ask (a)

## The three selling points - component 7

Every business picks **three** things it's best at and hammers them the whole page. They rotate per company. A common strong trio:

1. **Price** - affordable, best value
2. **Customer service** - fast response, dedicated point of contact
3. **Taking care of everything** - start to finish, all-in-one, no stress

Pick the three that are **true and differentiating** for the specific business, then repeat them in every section.

## Case study and portfolio patterns - component 15

Choose the pattern that fits the business type.

### Pattern A - visual portfolio

For creative and visual services: photo, video, design, events, trades. Use it when the work itself is the proof.

- A clickable image grid, 20 or more pieces of real work, each captioned with `[client first name + date]`
- A scale line up top: `[Completed [N]+ [jobs] this year]`
- Scarcity on quality: `[From [large number] candidates we selected the top [X]%]`
- The same component stack around it - logos, video testimonials, response time, FAQ, repeated CTAs

### Pattern B - numbers-driven case studies

For results and ROI services: agencies, automation, marketing, consulting. Use it when outcomes are the proof, and always anchor to a number plus a timeframe.

Each case study must show **specific numbers achieved in a specific timeframe.** Fill this template per case study:

> **[Client first name or initials]**
> [Business type, city]
>
> [1-2 sentence situation: the painful before-state and what it was blocking]
>
> **Saved:** [$ amount / time] - [what it replaced]
> **Results:** [metric 1, e.g. leads/week] · [metric 2, e.g. show rate]
>
> "[Short quote with hard outcomes - include rates and timeframes]"

Filled illustrative skeleton - replace everything in brackets, and do not use real names:

> **[Initials]**
> [Service business, city]
>
> [Business was doing [task] manually. [Overhead] was blocking it from scaling.]
>
> **Saved:** [$X/yr] - [replaced [role/tool]]
> **Results:** [N]+ [leads]/wk · [X]% [show/close] rate
>
> "[From [start state] to [end state], the team only has to [tiny action]. Everything else is automated. [Headline outcome].]"

## Copy principles - component 18

**Benefits over features, always.** Not "[professional equipment included]" on its own, but "[so you can focus on [the payoff]]". Tie every feature to the outcome.

**Social proof everywhere.** Names, dates, logos, badges, star ratings. Specific beats vague.

**Results with numbers.** "Top [X]% of [N]+", "[75] seconds", "[N]+ jobs/year", "$[X]/yr saved", "[X]% show rate". Numbers are believable, adjectives aren't.

**Little text.** Bullets beat paragraphs. The eye scans.

**Every word earns its place.** If it doesn't sell, prove, or move toward the form, delete it.

**Repeat the differentiators.** The three selling points and the response time recur the whole way down.

**Speed as a selling point.** A stated, repeated response time such as "[75] seconds" signals you care, and beats competitors who reply in days.

**Write for a 12-year-old.** Pages at a 5th to 7th grade reading level convert at 11.1% against 5.3% for professional-level copy, and word count correlates negatively with conversion (a, Unbounce 2024). Length by niche: emergency trades and HVAC under 200 words, standard home services about 300, complex services such as pest control 400 to 500, legal as short as the proof allows (a).

## Ad pages have no header and no footer - component 14

**Ad page, paid traffic: no header, no footer, no nav of any kind.** Zero exits. The page has one job, calling, booking or filling the form.

- **Delete the header.** No sticky bar, no logo row with links, no phone bar that doubles as navigation. The business name and phone live inside the hero as plain content - name as text, number as a `tel:` link, neither of them navigating anywhere.
- **Delete the footer.** No sitemap, no service list, no social row, no second nav. A footer on an ad page is a dozen exits at the exact moment the visitor has finished reading and is deciding.
- **One legal line replaces it**, centred and small, directly under the final form: `[Business name] · [street address, city] · [phone] · [Privacy Policy] · [Terms]`. Two links, both new-tab. Google grades "transparency" (who you are, what you do, what you ask for), the 10DLC registrar needs the privacy link reachable from the form page, and the Ads bot must be able to crawl the page (a). One line covers all three.
- Removing navigation lifted conversion 0 to 4% on cold pages and 16 to 28% on warm pages in HubSpot's five-page test, and doubled or better in single-site cases (b). No published test shows adding nav to an ad page raising conversion.
- The page is `noindex` and left out of `sitemap.xml`, never blocked in `robots.txt` (a).

**Watch for the template's own header and footer surviving the copy.** Landing pages are duplicated from a full website template that ships with both. Search the built page for `<header` and `<footer` before calling it done - this is the commonest way an ad page ends up leaking.

**SEO page, organic traffic:** header nav and footer nav both stay. The page needs site navigation and internal links to rank, and real browsing needs them too. Same for the standard pages - about, services, contact, legal.

## Mobile and desktop handle the CTA differently - components 3 and 17

**Desktop:** the CTA repeats on every major section, about eight times down the page.

**Mobile:** ONE sticky CTA bar pinned to the bottom that scrolls with the user, instead of repeating CTAs inline. Always visible, never in the way. It is a click-to-call button first, "Get a quote" second, and it sits above the phone's home-bar safe area.

83% of landing page visits are on a phone and mobile converts 8% worse than desktop (a, Unbounce 2024), so the phone layout is designed first and the desktop version is the adaptation.

## Speed - the page loads in under 2.5 seconds on a real phone

- Targets are Google's Core Web Vitals "good" thresholds at the 75th percentile: largest contentful paint 2.5 seconds or less, interaction to next paint 200 milliseconds or less, layout shift 0.1 or less (a)
- A 0.1 second gain on mobile lifted conversions 8.4% in retail and cut lead-gen page bounce 8.3% across 37 sites and 30 million sessions (a, Google and Deloitte 2020)
- Only 48% of mobile sites pass all three, so passing is a competitive edge, not table stakes (b, Web Almanac 2025)
- How: WebP or AVIF images sized to the slot, hero image preloaded, founder video lazy-loaded, no third-party review or chat widget in the initial render, fonts limited to two, no popups
- Test on a mid-tier Android over cellular with PageSpeed Insights, not on office wifi (c)

## Where the lead goes - the GHL webhook, the phone and the calendar

Three destinations, and the page is not finished until all three are live and tested. This is the half of a landing page that nobody screenshots and everybody skips.

**1. The GHL inbound webhook - every form on the page posts here.**

- Built in GoHighLevel: Automation, new workflow, trigger "Inbound Webhook", copy the URL. Stored as `LEAD_WEBHOOK_URL`.
- The payload carries the lead's fields PLUS the stashed `gclid`, keyword, campaign and UTMs, so the CRM knows which search produced the lead and the outcome can be sent back to Google later.
- The same webhook triggers the speed-to-lead auto-dial below.
- **A form that posts nowhere is worse than no form.** The click was already paid for. A page with a dead webhook never gets published.

**2. One real phone number - `BUSINESS_PHONE`, everywhere on the page.**

- One number. No pools, no per-page numbers. The business's name, address and phone stay consistent for local search.
- Plain text, never inside an image, in ONE consistent format, with the display text and the `tel:` href matching exactly. Google's forwarding-number swap fails on any of those.
- Google's phone snippet sits right after the Google tag on every page. For ad traffic Google swaps the displayed number and the `tel:` link for a forwarding number, routes the call through, records it, and ties it to the exact keyword. Call reporting must be ON at account level or none of it counts.
- **Call recording ON**, with Google's recorded-call announcement left on and the owner's confirmation first. The recording is what lets the owner screen a lead, hear which keyword produced a tyre-kicker, and settle a "nobody called me back" dispute. Two-party consent law applies in many places, which is exactly why the announcement stays.
- The `tel:` link also fires the stashed keyword to the GHL webhook before dialling, so the CRM has keyword-level call attribution even when Google only counts the tap.

**3. The GHL calendar - `GHL_CALENDAR_URL`, on the thank-you page ONLY. Only if the owner wants one.**

- Asked once, up front. "No calendar" is recorded and the widget, its conversion action and its checklist lines are all skipped - a phone-and-form page is a complete page.
- **Never on the landing page itself.** The landing page sells the call and the form. The calendar is the follow-through for someone who has already converted - that moment happens on `/thank-you`, not beside the pitch.

- **A booking is NOT a Google Ads conversion.** Everyone who reaches `/thank-you` already fired the form conversion - tagging the booking too counts one lead twice. The booking lives in GHL: the appointment-booked workflow sends the confirmation SMS and updates the pipeline stage, and that stage flows back to Google through the offline import if anywhere.
- When the business has one, it goes on the thank-you page too - that is the highest-intent moment on the whole site.

## Tracking - every page ships instrumented

- On landing, capture `gclid`, campaign, ad group, keyword and UTMs into sessionStorage; every form post and every tel: click sends them to the webhook (a, Google offline conversion model)
- **One conversion per lead path the page actually has:** form submit, website call over the minimum length, and calls from the ad itself. Each one is a real lead and each one is primary. A calendar booking on `/thank-you` is NOT one - that lead already fired the form conversion. Views, scrolls, form starts and widget clicks never are
- Enhanced conversions for leads: the hashed email or phone leaves the form with the click, auto-tagging on, Google tag or Tag Manager in place. Google now recommends this over plain GCLID import (a)
- The form conversion fires on `/thank-you`, or from the form's success event - never both on one action (a)
- **Verify in Tag Assistant before the page is called done.** Connect the live URL at https://tagassistant.google.com/, then submit the form, tap the number and book a slot, and read the tag list: the Google tag fired, Conversion Linker present, one conversion request per action carrying the right label, and no duplicate request. A duplicate silently doubles every number in the account and is the commonest tracking failure there is
- The phone snippet is a second gtag config call - `gtag('config', 'AW-[id]/[call label]', { phone_conversion_number: '[number]' })` - never the legacy `wcm/loader.js` + `_googWcmGet` pair, which silently defines nothing on a gtag page. Tested in two stages: stage 1 the moment the page is live - load it with `?gclid=test` and read `window.google_wcc_status` in the console; `"no ad click"` is a PASS (Google's script asked for a number with your label and click id, and declined only because the click is invented), undefined means the phone config never registered. The display does NOT swap at stage 1 - Google only allocates forwarding numbers to genuine ad traffic. Stage 2 once a campaign runs - the first real ad visitor sees the swap and the call lands in the calls report. Never click your own ad to test it (c for the synthetic-gclid convention, a for the rest)
- If AI Max is on for the campaign, either add URL exclusions for every non-converting page or turn final URL expansion off; otherwise Google can send the click to any page on the domain and override pinned headlines (a, 2025)

## Speed to lead - wired before the page goes live

The page's conversion rate is only half the number. Between a 5-minute and a 30-minute first call, the odds of reaching the lead fall about 100 times and the odds of qualifying them about 21 times (a, MIT and InsideSales, 15,000+ leads). Calling inside 1 minute lifts conversion 391% over a 2-minute wait (b, Velocify, about 3.5 million leads). 88% of home-service firms take longer than 5 minutes and 3% answer inside 1 minute (b, Hatch 2024), so the bar is low.

- The form's webhook triggers the auto-dial: the owner's phone rings, then bridges to the lead
- An SMS goes to the lead within 60 seconds naming the business and the number that will call, because 86% of people will not answer an unknown number (b, Hiya)
- That SMS needs the consent checkbox on the form and a registered 10DLC campaign; unregistered traffic has been blocked by US carriers since February 2025 (a)
- The stated response time on the page ("75 seconds") is the number this system actually hits, or it comes off the page

## Accessibility basics - four lines, always

- Tap targets at least 24 by 24 CSS pixels, 44 preferred for the call button (a, WCAG 2.2)
- Body text contrast at least 4.5 to 1 against its background (a)
- Real `label` elements above every field, `tel` and `email` input types, visible focus states (a)
- Alt text on every proof photo naming what it shows ("Owner Mike Reyes fitting a boiler in Leeds")

## Testing the page - only as a Google Ads experiment

- Duplicate the campaign as a custom experiment, cookie-based 50/50 split, change only the final URLs (a)/(b)
- Leave it 3 to 6 weeks and 50 to 100 conversions per arm; Smart Bidding relearns for 1 to 2 weeks after the change, so ignore days 1 to 3 (b)
- Judge on cost per lead and lead quality, not conversion rate alone (b)
- Below about 30 to 50 conversions a month the test cannot resolve; fix the CRO cheatsheet items instead (b)
- Re-check the landing page experience rating in Google Ads 2 to 4 weeks after any page change; Below average sends you to `references/cro-cheatsheet.md` top to bottom (b)

## Copy the style, never the structure - component 16

You can hand in a screenshot of any site you like for the look and feel - colours, fonts, spacing, vibe - and match the style to that reference.

But the components and structure in this blueprint stay fixed. Style is the skin, this stack is the skeleton. Never trade a converting component for a prettier layout.

## Optional polish

- **Localization toggle**, for example English and French, if the market is bilingual - widens reach without rebuilding
- **FAQ section** near the bottom to kill remaining objections - pricing, logistics, "what if" worries - with each answer ending in a soft CTA
- **Click-to-call** as the primary hero CTA for high-intent local buyers, with the form as the secondary path
- Nothing about the calendar is optional polish: it goes on `/thank-you` when the owner wants one, and nowhere else

## Check this before you launch

**The offer and the top of the page**

- [ ] H1 repeats the ad group headline word for word, offer line repeats the ad's offer
- [ ] Offer is above the fold and niche-specific, researched or confirmed with the owner
- [ ] Sections run in the build order, 1 through 14, unchanged
- [ ] 3 credibility bullets plus licence and insurance line above the fold

**The proof**

- [ ] Logo wall of recognizable brands, all in proof.md
- [ ] 9 video testimonials and 20+ written testimonials, with real names and dates; never fewer than 5 reviews shown, real average shown
- [ ] Proof badges from Google, Yelp, Facebook and industry sites with exact counts, repeated
- [ ] Three selling points chosen and repeated throughout
- [ ] Response time stated and repeated, and the auto-dial actually hits it
- [ ] Case study or portfolio block matching the business type, with numbers if results-based
- [ ] Service area block with real towns

**The conversion path**

- [ ] Form is 3 to 4 fields, labels above, tel input, segmenting dropdown, outcome button text, guarantee beside it, plus a lead magnet
- [ ] Unchecked SMS consent checkbox with the 10DLC wording, privacy policy linked
- [ ] Second form in the close section - no calendar widget anywhere on the landing page; email capture is desktop exit-intent only, never a mobile popup
- [ ] Urgency and scarcity close in words, no timers, plus an objection-handling section
- [ ] Thank-you page at its own URL, noindex, fires the conversion, states the callback time, with the GHL calendar embedded if one was wanted
- [ ] Desktop has a CTA on every section. Mobile has one sticky bottom call bar
- [ ] Ad page has NO header and NO footer - one legal line under the final form. SEO page keeps both
- [ ] Copy is bullets, benefits, social proof and numbers, at a 5th to 7th grade reading level, every word earning its place
- [ ] Everything points to the call or the form

**Speed, tracking, policy**

- [ ] LCP 2.5 seconds or less on a mid-tier phone over cellular, layout shift 0.1 or less
- [ ] gclid, keyword and UTMs captured on landing and sent with every form post and call click
- [ ] Enhanced conversions for leads on, auto-tagging on, call reporting on, call recording on with the announcement
- [ ] Every lead path the page has wired to its own conversion action: form, website call, ads call. Never a booking tag - the form conversion already counted that lead
- [ ] Tag Assistant run on the live URL: form and tap-to-call fired, none twice
- [ ] The TRACKING VERIFIED block written into CLAUDE.md "## My setup" with the date - unwritten means unverified
- [ ] Number swap seen live with a gclid on the URL
- [ ] Test lead AND test booking confirmed as arrived in GHL, not just posted
- [ ] Page noindex, out of the sitemap, not blocked in robots.txt
- [ ] AI Max URL exclusions set, or final URL expansion off
- [ ] Every claim, logo, review and guarantee traces to context/proof.md; compliance.md checked
- [ ] Tap targets 24 pixels or larger, contrast 4.5 to 1, real labels
- [ ] Speed-to-lead tested live: form submitted, owner's phone rang, lead got the SMS

## What changed in this revision

**1 September 2026 - Jono's rulings after a live build**

- **No header AND no footer on ad pages.** The old version kept a four-line footer; it is now one centred legal line under the final form. Same transparency and 10DLC coverage, zero exits (Jono's ruling)
- **The section order rebuilt as a real landing page flow**: hero, trust strip, problem/promise, what you get, proof, how it works, results, why us, service area, guarantee, price, FAQ, close, legal line. The old order opened with a marketplace vetting story that only fitted one kind of business
- **Two new sections that were missing entirely**: "how it works" in three steps (the biggest silent objection on a service page) and "what it costs" (the second biggest exit)
- **New section: where the lead goes** - the GHL inbound webhook, the one real phone number with recording, and the GHL calendar. None of the three were named in this file before
- **The calendar (when the owner wants one) sits on `/thank-you` only and is never a Google Ads conversion** - the form conversion already counted that lead, and two primaries for one business event is the double-count our own rules ban. Bookings are tracked in GHL
- **Call recording is now ON** by default with the announcement and the owner's confirmation, reversing the old "never enabled" line. Recording is how the owner screens leads and audits keyword quality
- **Tag Assistant verification is part of the build**, not a follow-up: connect the live URL, fire all three lead paths, read the tag list back, confirm no duplicates

**28 August 2026**

- Component 12 (email-capture popup) changed to desktop exit-intent only, never on mobile: Google Ads destination policy disapproves pop-ups and interstitials, and it contradicted the "no popups" rule in the command (a)
- Component 14 refined: no header nav stays, but ad pages now carry a four-line footer (name, address, phone, privacy, terms) for Google's transparency signal, 10DLC registration and crawlability (a)
- Added "The one law: message match" with the 66% and 212% lifts and the AI Max text-customization warning (b)/(a)
- Added the form spec: 3 to 4 fields, labels above, tel input, no split fields, two-step when more questions are needed, SMS consent checkbox wording (a)/(b)
- Added the review floor of five and the "show the real 4.7" rule from Spiegel (b)
- Added the speed section with Core Web Vitals thresholds and the Deloitte 0.1 second data (a)
- Added the tracking section: gclid capture, enhanced conversions for leads, one number no pools, AI Max URL exclusions (a)/(c)
- Added the speed-to-lead section with the 5-minute and 1-minute data, the SMS rule and the February 2025 10DLC cut-off (a)/(b)
- Added the service-plus-city rule: one page per provable area, city-swap templates are doorway pages (a)
- Added the testing section: Google Ads custom experiment only, 50 to 100 conversions per arm, judge on cost per lead (a)/(b)
- Added four accessibility lines from WCAG 2.2 (a)
- Added reading-level and word-count-by-niche guidance from Unbounce 2024 (a)
- Reframed the 20% claim as top-quartile, with the 2024 medians stated (a)
- Countdown timers now explicitly banned unless real; scarcity stays in words (a)
- Thank-you page now specified as its own noindex URL that fires the conversion, with the calendar as an option for consult services (a)/(c)
- Launch checklist extended with a "Speed, tracking, policy" block
- All 18 components, the offer formulas, the three selling points, the case-study patterns and the copy principles kept verbatim as the house ruling
