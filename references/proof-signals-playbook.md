# Proof Signals Playbook - the ultimate context file (proof-signals-playbook.md)
Revised 2026-08-28 · 92 sources checked · 4 corrections · 6 new sections (legal layer, lift data, review rules, interview, placement, 2024-2026 changes)
Next: `/context-layer` reads this first, then `humour-writing.md`, then runs the sweep.

The complete source matrix for `/context-layer`'s sweep: every place proof hides, the tool that extracts it, what it becomes, and the law that decides whether it can go on a page. The goal is a proof inventory so dense that pages and ads write themselves, and so clean that nothing in it can get the account suspended or the business fined.

**Grading, used on every number in this file.** (a) official: a regulator, a statute, or the platform's own help page. (b) stated-sample: a study that names its sample and year. (c) practitioner: a vendor, agency or trade-press figure. A number with no grade is a claim, and claims do not go in ads.

**Why the effort is worth it, with the sample behind each number**
- 97% of consumers read reviews for local businesses and 47% will not use a business with fewer than 20 reviews (b · BrightLocal 2026, 1,002 US adults)
- Five reviews lifts purchase likelihood 270% over none, and ratings of 4.0 to 4.7 outsell 5.0 (b · Spiegel Research Center 2017)
- A real photo of a real customer beat a stock photo by 161% on form completions (b · VWO, 160 Driving Academy)
- Three understated testimonial lines moved up the page lifted purchases 34% (b · VWO, WikiJob)
- Businesses that reply to reviews gain 0.12 stars and 12% more reviews (b · Marketing Science 2017); 80% of consumers say they are likely to use a business that answers all its reviews (b · BrightLocal 2026)
- 57% of page attention lives above the fold (b · Nielsen Norman Group 2018), so the first screen carries the proof

**What it costs.** The Apify calls are real money: `apify/website-content-crawler` runs roughly $0.50 to $5 per 1,000 pages, `compass/google-maps-reviews-scraper` is $0.30 per 1,000 reviews, `compass/crawler-google-places` from $1.50 per 1,000 places, and the social actors a dollar or two. A typical business comes in between $1 and $5. Quote the estimate before spending it. Everything else here is free.

---

## ⛔ Three rules that override the whole matrix

### 1. Relevance first. A file in their account is not proof it is theirs.

Somebody can have a twenty-year-old Google Drive, Gmail and Slack. Most of what is in them belongs to a previous business, an employer, a side project, a spouse sharing the account, or an agency's clients. **Pulling somebody else's life into the proof file is the biggest single risk in the connected-account sweep**, and it is silent: a testimonial from a company that folded in 2019 reads exactly like a current one.

**Set the identity anchors before any connected-account query runs.** Take them from `business.md` if they exist, ask for whatever is missing. They are cheap and they gate everything after them:

- The domain or domains this business owns
- The brand name, plus any former or trading name
- The legal entity name as registered
- Roughly when the business started, month and year
- The key people - the owner, and anyone who has done client work under this brand

**Then test every candidate fact against the anchors:**

- Does it name this brand, this domain, this entity, or one of these people?
- Does it fall inside the business's lifetime? **Date-bound by the life of the business, never by an arbitrary window.** Something dated before the business existed belongs to a previous company, a side project, or somebody else
- Matches none of the anchors? It is not this business's proof. Do not write it in

**Watch specifically for:** a previous business or employer · a spouse or family member sharing the account · an agency's clients read as their own · personal files · old projects that were wound down.

**Anything ambiguous is UNCONFIRMED with the ambiguity NAMED**, never quietly included:

```
"Best contractor we've ever used" · UNCONFIRMED · relevance
> Drive file, dated March 2019, business started 2022
Ask: this testimonial predates the business by two years - is it from your previous company?
```

**Hard rule: proof about a DIFFERENT business the owner ran is not automatically usable.** It can be excellent E-E-A-T for an about page ("ran a 12-person crew for nine years before starting this") and it is NOT a client result for this company. Say which one it is, every time.

Everything the gate flags gets **grouped in the read-back** so the owner can strike the lot in one pass.

### 2. MEASURE, never read. Every number on a site is a claim.

On a real run the website said 150,000 subscribers, the community page said 140,000, and the platform's own page said 153,000 that day. **Self-reported numbers on a business's own properties are stale by default.** They were true once and nobody went back.

So every number found on any owned property is a **CLAIM**, and the job is to go and measure it:

- Subscribers, followers, members · read the platform's own page or API today
- Review count and star rating · the profile itself, never the homepage badge
- Years in business · the corporate registry, not the about page
- Client count and repeat rate · the CRM or the payment processor, not the marketing copy
- Team size · LinkedIn company page or the owner, not the "meet the team" grid

**When claim and measurement disagree, record both with both dates** and flag the site copy as needing a fix. Never quietly pick one. This rule alone catches a wrong number on most sites.

### 3. Discover the properties. Never ask the owner to list them.

Owners forget the properties that matter most, the same way they forget media features. Start from the domain and derive the footprint: site footer and header icons, every social account (including a LinkedIn company page separate from the personal one), YouTube, community platforms (Skool, Circle, Discord, Substack, Patreon), review profiles, podcast appearances via Listen Notes and Apple Podcasts, the corporate registry entry, and any second domain they own. Read the list back and ask only "anything missing?"

---

## ⛔ The legal layer - what decides whether proof can go on a page (new, 2026-08-28)

Proof that cannot be substantiated is a liability with a nice font. These are the rules that turn a finding into something an ad can carry. Every one is (a) official unless marked.

### The four questions every proof item must pass

- **Can we prove it today?** A reasonable basis has to exist BEFORE the claim runs (FTC substantiation policy, 1983). In Canada a performance, efficacy or guarantee claim must rest on "an adequate and proper test", tested before the claim, with the burden on the advertiser (Competition Act s.74.01(1)(b))
- **Is it typical?** A result in a testimonial is read as what everyone gets. "Results not typical" and "individual results may vary" do not change that. Either prove the result is typical, or state plainly what people generally get (FTC Endorsement Guides, 2023 revision). Google says the same thing in its own words: testimonials implying typical results need a link to third-party verification or a noticeable disclaimer, and testimonials guaranteeing results need a visible "no guarantee, results vary" line (Google Ads Unreliable claims policy)
- **Is the evidence on file?** Hold documentary evidence, the person's contact details, and their consent for every testimonial. An unverifiable email address is not evidence (UK CAP Code 3.47 and 3.50; Ad Standards Canada Clause 7 requires a genuine and reasonably current opinion)
- **Is it on the landing page?** Any offer, price, deal or guarantee in the ad must be easily found on the destination (Google Unavailable offers). Any price or "free" must show the total with fees and the auto-charge terms (Google Dishonest pricing practices)

### Google Ads claim policies, as they stand in 2026

- **Unreliable claims** replaces the old "superlatives need third-party proof" clause. The live test is: no improbable result presented as the likely outcome, "even if this result is possible". Result-bearing testimonials carry the verification link or disclaimer above
- **Misleading representation** names "an unlicensed home contractor claiming to be a licensed provider" as a violation, bans implied endorsements without consent, and requires a business name that clearly represents the business
- **Trademarks**: a direct competitor's name in ad text is restricted on complaint. Competitor names go on the NEVER SAY list
- **Healthcare**: dentists, clinics and therapists are the advertiser's own compliance problem under local law, and many categories need certification. Ask if the trade has ad rules, every time
- **Advertiser verification** is heading to every account. The verified legal name and location print in the ad and in the Ads Transparency Center, and false verification information suspends the account. The legal entity from the relevance gate is what gets verified
- **Store (seller) ratings** need about 100 eligible reviews in 24 months from Google Customer Reviews or a listed partner (Trustpilot, Feefo and others) and a 3.5 minimum. Google's own figure for the lift is a 2% CTR improvement on average, not the 10% of older blog posts. Yelp, BBB and HomeStars reviews never feed seller ratings

### Fake reviews and testimonials - the law by country

- **United States** · 16 CFR Part 465, in force 21 October 2024. Bans fake or AI-generated reviews, any incentive conditioned on sentiment (explicitly or implicitly - "tell us how much you loved it" counts), insider reviews without a disclosure inside the review, company-controlled sites posing as independent, suppressing negatives by threat or by hiding them while claiming completeness, and bought followers. Civil penalty $51,744 per violation at adoption, $53,088 since January 2025 (c · Crowell, December 2025). Agencies and reputation firms are liable alongside the business. Enforcement is live: ten warning letters on 22 December 2025 named review gating and undisclosed employee reviews
- **Canada** · Competition Act s.74.01: false or misleading representations, and untested performance claims. s.74.1 penalties for a corporation: the greater of $10,000,000 ($15,000,000 repeat), three times the benefit, or 3% of annual worldwide gross revenue; $750,000 for an individual. Since 20 June 2025 private parties can bring deceptive-marketing cases to the Tribunal (c · BLG, Financier Worldwide). The Bureau warned in January 2024 that businesses are liable for reviews their employees post
- **United Kingdom** · DMCC Act 2024, in force 6 April 2025, grace period ended 6 July 2025. Fake reviews and concealed incentivised reviews are automatically unfair; fines up to 10% of global turnover. March 2026 investigations named discounts-for-five-stars, staff-written reviews and hidden one-star reviews. "Incentives aren't forbidden, but hiding them is" (c · Reed Smith)
- **Australia** · incentives must be given regardless of sentiment and disclosed (ACCC). Maximum corporate penalty from 28 March 2026: the greater of $100,000,000, three times the benefit, or 30% of adjusted turnover. PhotobookShop paid $39,600 (March 2026) for undisclosed gifted-product reviews and for editing a negative comment out of a review video; Hismile paid $138,600 (June 2026) for staff posing as random shoppers in testimonial videos
- **EU** · the Omnibus Directive bans commissioning fake reviews and claiming reviews are from real buyers without checks (c · text not re-read this revision; the UK and US rules are stricter and cover the same ground)

### Google's own review rules, as of April 2026

The Maps user-contributed content policy governs Google Business Profile reviews and, since July 2025, Local Services Ads reviews too. What it bans:

- Any incentive for a review - payment, discount, free goods or services - "strictly prohibited"
- Requiring or pressuring reviews on the premises
- Asking for specific content in a review
- **Staff review quotas** (added April 2026)
- **Asking customers to name a staff member** (added April 2026)
- Reviews with a conflict of interest: current or former employees, contractors, family

What is allowed: the Google review link or QR code, sent to every customer, with no strings. Google's own help page adds that "a mix of positive and negative feedback often feels more trustworthy" and tells owners to reply to all of it.

Enforcement numbers (a · Google): 292 million policy-violating reviews blocked or removed in 2025, 13 million fake profiles removed, 782,000 accounts restricted. Since about September 2025 Maps asks reviewers "Does this business offer rewards in exchange for reviews?" and deletes retroactively - reviews from August 2024 were being pulled in December 2025 (c · PPC Land). A rewards program from two years ago is a live risk today.

### Licence numbers in advertising - check the jurisdiction, every time

Four US states verified this revision require the licence number in every advertisement, and treat a website and a vehicle as advertising:

- California, Business and Professions Code 7030.5: "in all forms of advertising"
- Florida, Statutes 489.119(5)(b): "in each offer of services, business proposal, bid, contract, or advertisement, regardless of medium"
- Washington, RCW 18.27.100: "All advertising that shows the contractor's name or address shall show the contractor's current registration number"
- Arizona, ARS 32-1124: on all published, broadcast, internet and billboard advertising, unless the ad links to a site that prominently shows name and number
- Ontario: the 7-digit ECRA/ESA number "appears on their vehicles, business cards and estimates" (ESA), with a public lookup

There is no universal rule and no universal scraper. Ask the trade and the location, find the board, pull the record, and put the number and the lookup URL in the proof file. A "licensed and insured" line with no number is a claim; Google names the unlicensed-claiming-licensed case as a policy violation.

### The NEVER SAY list - what the legal layer adds

- Unprovable superlatives (#1, best, top-rated, lowest price) unless a named third party says so on a linkable page
- Any result with no number, no timeframe, or no typical-result statement
- Competitor names in ad text
- "Guaranteed" anything that is not written on the landing page in the same words
- "Google Guaranteed" - the badge and the money-back guarantee are gone (see 2024-2026 changes)
- "Free" without the total price and the auto-charge terms beside it
- Regulated claims for the trade (health outcomes, financial returns, "cure", "risk-free")
- "Licensed" without the number and the body
- Any word the owner refuses in the interview

---

## The connected-accounts pass - runs cold, before the interview

These sources need nothing from the owner and they **shorten the interview**, because half the questions answer themselves. On a real run Fireflies and Drive were both connected and neither was touched, and between them they held a whole revenue line, the real client roster, a price said out loud and 34 proof assets.

Ranked by what they yield: meeting recordings · Google Drive · Search Console · Google Analytics · Stripe or QuickBooks · Calendar · Gmail · Slack · CRM · past Claude Code sessions. Run the relevance gate on everything they return.

### 1. Meeting recordings - the highest-value source there is

Recorded calls are buyer objections in the buyer's own words, timestamped and dated. Nothing else in this playbook comes close for persona work, and on the one live run it was also the biggest miss.

- **Where** - Fireflies, Fathom, Otter, Grain, or plain Zoom cloud recordings
- **How** - list recent transcripts, then search the corpus for objection language: "how much", "how long", "worried", "the last guy", "we tried", "what if", "guarantee", "why is it", "can you just", "my concern"
- **Keep the buyer's words verbatim** with the call date and timestamp
- **Keep the owner's answers too** - explaining the offer out loud is better voice material than anything they have written down

**What 25 recordings actually held on a real run:**

- **A whole revenue line absent from the website and from `business.md`.** The meeting titles were literally "60 Minute Consultation", "2 Hours Consultation", "4 Hours Consultation" - they sell paid consulting by the hour and nothing else said so anywhere
- **The real client roster by industry** - florist, dog training school, bookkeeper, marketing agency, ecommerce brand, art marketplace. That answers "which industries actually convert" with behaviour instead of opinion
- **A price said out loud in a live sales call** - "$3,000 plus an onboarding fee, about 10 hours"
- **Buyer objections in the buyer's own words**

**This is the primary input to `buyers.md`.** The business's own FAQ is one side of a conversation. A transcript is the other side.

**Call history surfaces contradictions the owner will not volunteer.** A person described as gone was running client calls three months ago. **Surface the tension and ask about it.** Never record the answer flat as though there was no conflict - the conflict is the information.

**Tiering:** the owner speaking is tier A. The buyer speaking is tier B, quoted and dated. **Privacy:** no third-party personal data, no credentials, and permission before naming a client.

### 2. Google Drive - find containers, then enumerate. NEVER search for files.

**Tested live, and it changed the answer completely.** A keyword search found 5 video testimonials. Enumerating the folders found 34 assets - 13 videos and 21 screenshots.

The 8 extra videos were named `IMG_2436.mov`, `2025-08-18 12-29-11.mp4`, `Zight Camera Recording 2025-07-24.mp4`. Camera defaults, invisible to any keyword search. The 21 screenshots (`Screenshot 2025-02-04 at 12.22.13 PM.png`) are almost certainly screenshots of written praise, the format this playbook calls the most persuasive proof there is, and not one of them contains a searchable word.

**The rule: media files have no body text to search, and humans do not rename them. A keyword sweep systematically misses exactly the assets that convert best.**

**Step 1 - find the containers**

```
mimeType = 'application/vnd.google-apps.folder' and (title contains 'testimonial' or title contains 'review' or title contains 'case study' or title contains 'client' or title contains 'proof' or title contains 'before' or title contains 'brand' or title contains 'press' or title contains 'photo')
```

**Step 2 - enumerate every folder found, in full**

```
parentId = '<folder id>'
```

Page all the way through it, and recurse into every child folder. **Every folder that matched, not the first one.**

**Step 3 - the keyword hunts, which work because documents have body text**

Written praise:

```
fullText contains 'testimonial' or fullText contains 'case study' or fullText contains 'thank you so much' or fullText contains 'highly recommend' or fullText contains 'saved us'
```

Commercial facts - prices, scope, named clients:

```
title contains 'proposal' or title contains 'contract' or title contains 'agreement' or title contains 'scope' or title contains 'statement of work' or title contains 'pricing'
```

Credentials:

```
title contains 'license' or title contains 'certificate' or title contains 'insurance' or title contains 'accredit' or title contains 'incorporation'
```

Long-form voice:

```
mimeType = 'application/vnd.google-apps.document' and (title contains 'newsletter' or title contains 'script' or title contains 'blog' or title contains 'about us' or title contains 'story')
```

**Step 4 - the media sweeps keywords cannot reach**

```
mimeType contains 'video/' and modifiedTime > '2024-01-01T00:00:00Z'
```

```
title contains 'Screenshot' and mimeType contains 'image/'
```

```
mimeType contains 'image/' and (title contains 'IMG_' or title contains 'DSC' or title contains 'PXL_')
```

**Step 5 - the one nobody thinks of**

```
sharedWithMe = true and (title contains 'testimonial' or title contains 'case study' or title contains 'brand' or title contains 'logo' or title contains 'contract')
```

**Clients share files INTO a Drive.** An `owner='me'` sweep skips them entirely, and they are often the best proof in there because they came from the customer.

**Four gotchas**

- **`fullText` searches title and body, so it returns nothing useful for images and video.** Never rely on it for media
- **Cap and page properly.** The first live query returned 65,000 characters and blew the context limit. Use `excludeContentSnippets: true` for discovery passes and pull snippets only once you know which files matter
- **Do not date-bound the proof hunts.** A 2023 testimonial is still a testimonial. Date-bound only the noisy media sweeps
- **Two folders can have the same name and hold completely different things.** Enumerate every match, never just the first

### 3. Search Console and Analytics - a persona from behaviour, not opinion

Usually connected, almost never used, because nothing asks for them.

- **Search Console** - top queries by clicks, top pages, and queries with high impressions and low clicks. Which queries actually convert is a persona derived from what people did
- **GA4** - top landing pages by sessions, top pages by conversions, conversion paths, city and device split, last 12 months

Top landing pages plus top converting queries outranks any opinion about who the customer is, including the owner's.

### 4. Stripe or QuickBooks - the numbers without the interview

Real client count, average deal size, retention and repeat rate. **This answers "how many clients do you have" and "what is the average job value" without asking**, and it answers them with money rather than memory.

Owner's own business only. Never a customer's card or personal data. Aggregate figures, not a customer list.

### 5. Calendar - meeting titles reveal the offer structure

The hourly consulting line surfaced from nothing but meeting titles. Sweep recurring meetings, client call names, and anything with a duration, a package name or a price in the title. Cross-check against the site's stated services - a service on the calendar but not on the site is either real and unmarketed, or dead. Both are worth knowing.

### 6. Gmail - sent mail is VOICE, received mail is PROOF

**A naive search fails.** A plain inbox search for "thank you" returned about 3 usable signals in 50 threads on a real run, the rest being hotel bookings, invoices, tax returns and influencer spam. Use the queries below and tune the exclusions to the inbox. Four different jobs, run separately.

Voice, what they wrote:

```
from:me newer_than:2y -in:chats -subject:(invoice OR receipt OR quote OR payment OR scheduled)
from:me newer_than:2y -in:chats subject:(how OR why OR update OR "here's")
```

Voice, their own outbound marketing. Longer-form and more deliberate than anything written to a single customer, and frequently where the origin story lives. The classic miss is looking only for "emails I wrote to customers" and skipping the newsletter:

```
from:me to:me subject:(newsletter OR issue OR broadcast OR "this week")
from:(mailchimp.com OR sendgrid.net OR mailerlite.com OR convertkit.com OR leadconnectorhq.com) subject:(campaign OR broadcast OR sent)
```

Proof, what came in:

```
to:me ("thank you" OR amazing OR lifesaver OR "you saved" OR "highly recommend" OR testimonial) -from:noreply -from:no-reply -from:notifications -subject:(invoice OR receipt OR payment OR unsubscribe OR order) -category:promotions -category:social -category:updates
to:me ("would recommend" OR "referred you" OR "sent you" OR "your name came up") -from:noreply -category:promotions
```

Payment and accounting mail - registry-checkable credentials sitting in an inbox. On a real run the legal entity "1532461 B.C. LTD" came out of a payment-processor payout notification:

```
subject:(payout OR remittance OR "payment received" OR "deposit of") -category:promotions
("incorporation number" OR "business number" OR "registered as" OR "legal name" OR LTD OR LLC OR "Inc.") -category:promotions -from:noreply
```

**Report how many threads each query returned and how many were usable**, so a dead query is visible rather than silently treated as an empty inbox.

**Permission before use.** Praise that arrived by email is private-channel proof. It needs the customer's written OK, kept on file with their contact details, before it goes public - that is the CAP 3.50 consent rule and the FTC's evidence standard in one step. Draft the one-line ask in the same breath as the find.

### 7. Slack, CRM and past sessions

- **Slack** - for anyone with a team, this is where wins get posted and praise gets screenshotted. Search the wins, general and client channels
- **CRM (GHL or equivalent)** - total client count, repeat-customer rate, years of relationship data, review requests answered
- **Support tickets and DMs** where customers say "this is incredible"
- **Past Claude Code sessions** - see the section further down

---

## The rest of the source matrix

### 8. The website's own data payload - what the page does not render

**The JavaScript bundle.** React and Next sites ship the entire dataset to the browser and render a slice of it. On a real run the page showed 9 testimonials and the bundle held 58, and the complete FAQ was in there too, collapsed behind accordions and invisible to every crawler. This one step roughly six-timesed the proof haul.

- Pull the HTML, collect the script sources: `/_next/static/chunks/*.js` (Next), `/assets/*.js` (Vite), `/static/js/*.js` (Create React App)
- Check the HTML itself for a `__NEXT_DATA__` tag or `self.__next_f.push` payloads - often the whole dataset sits there
- Grep the chunks for the data keys: `quote`, `testimonial`, `author`, `review`, `question`, `answer`, `faq`, `price`, `tier`, `plan`, `result`
- **Report both counts:** rendered on the page versus present in the bundle

**Form fields.** Every booking, contact and application form. Record **every dropdown option verbatim**. A revenue dropdown reading "Under $25K / $25K-$50K / $50K-$100K / $100K-$250K / $250K+" is the business stating who it will and will not take, in its own words, in public. Every service business has one and nobody thinks of it as a source. Capture every select option, every required field, every qualifying question, and the submit-button wording.

**How to crawl.** `apify/website-content-crawler` with the crawler set to `playwright:firefox`. Most sites are client-rendered, so curl returns an empty shell and a raw HTTP crawler returns nothing. **Never use WebFetch to extract a fact** - it is a summariser, it returns a paraphrase, and a paraphrase cannot be quoted. WebFetch is only for checking that a page exists.

**Sweep for VIDEO, not just text.** Every embedded player (YouTube, Vimeo, Wistia, Loom, a raw `<video>` tag) and every testimonial block with a video thumbnail. Video testimonials are invisible to a text scrape. Count them explicitly.

### 9. ⛔ Apify - ship only tested actor IDs

**At 5,000 users a wrong actor ID is a silent zero, not an error.** It does not throw, it returns an empty array, and an empty array reads exactly like "this business has no LinkedIn". Only the IDs below have actually been run.

**Verified working:**

- `apify/website-content-crawler` - set the crawler to `playwright:firefox`
- `compass/google-maps-reviews-scraper` - the full Google review corpus with text, dates, star, reviewer, and the owner's response text and date. $0.30 per 1,000 reviews, about 54,000 users, 99.6% run success (c · Apify store, August 2026). **Run this FIRST for any local business** - most local service businesses have 40 to 400 real Google reviews sitting there, which is their entire proof file in one call
- `compass/crawler-google-places` - takes a search term plus a location and returns the whole map pack: `reviewsCount`, `totalScore`, `reviewsDistribution`, `imagesCount`, `additionalInfo` (attributes), `peopleAlsoSearch`. From $1.50 per 1,000 places. This is the competitor audit in one call
- `apify/instagram-scraper` - follower count, bio claims, top posts, before/after photo posts
- `clockworks/tiktok-scraper` - posts, captions and numbers said out loud that never made the website
- `streamers/youtube-scraper` - channel and video data
- `trudax/reddit-scraper-lite` - posts, comments and keyword search, no login. **The buyer-fear source**: reviews are public and polite, calls have the seller listening, Reddit is buyers talking to each other with nothing at stake. Feeds `context/buyers.md`. **Language and fear only, never proof** - it is anonymous, so a number in a comment is not evidence

**Verified broken:**

- `supreme_coder/linkedin-post` returned zero for a live profile and **failed silently**. Do not treat it as the LinkedIn source. Try it if you like, then fall back to the LinkedIn company page and an advanced Google search (`site:linkedin.com/in "[owner name]"`), and **report the zero out loud**

**Retired this revision:** `conceivable_extension/multi-platform-review-scraper`. Checked 28 August 2026: 10 total users, no ratings, and its own README says it "had never actually been run live" before a late addendum. It is a wrapper that calls `compass/google-maps-reviews-scraper`, `tri_angle/yelp-scraper`, `maxcopell/tripadvisor-reviews` and `memo23/trustpilot-scraper-ppe` underneath. Call those directly. The earlier "$0.002 per review" cost line came from this wrapper and is also retired.

**Wrong ID, now retired:** `agentx/tiktok-transcript` is not what worked. Use `clockworks/tiktok-scraper`.

**Every actor that returns nothing gets a loud line in the report: "LinkedIn - skipped, zero results."** Never a silent pass, never an empty result written up as an absence of proof.

**Ranked additions, untested from these repos:**

- `tri_angle/yelp-scraper` - about 6,900 users on the store; the Yelp route
- **Google Ads Transparency Center** actors (`xtech/google-ad-transparency-scraper`, `scrapesage/google-ads-transparency-scraper`, `automation-lab/google-ads-scraper`) - for COMPETITORS' ads, not the owner's proof. None has been run; test one and report a zero out loud
- **Trustpilot, G2 and Capterra** - B2B and software businesses
- **YouTube TRANSCRIPTS, not just video metadata.** A channel with hundreds of videos is the deepest voice sample that will ever exist for that person. The live run read only titles and left the whole corpus on the floor
- **No tested actor exists for BBB, HomeStars, Houzz or Angi** (store searched August 2026). Use `apify/website-content-crawler` on the profile URL

### 10. Review platforms - what to pull and why the API is not enough

- **Why scrape instead of the API:** Google's Places API returns "up to five reviews" and Yelp's Fusion endpoint "up to three review excerpts" (a · both API docs). Scraping is the only way to get the full corpus
- **Google first, always.** LSA reviews are Google reviews (managed in GBP since July 2025), seller ratings come only from Google Customer Reviews and listed partners, and 71% of consumers start on Google (b · BrightLocal 2026). Every other platform is a landing-page signal, not a ranking signal
- **Industry platforms by trade:** Angi, HomeAdvisor and Houzz (home services) · HomeStars (Canada) · Healthgrades and Zocdoc (medical) · Avvo (legal) · TheKnot and WeddingWire (events). Crawl the profile page
- **Extract:** exact star rating and exact count per platform · EVERY quote, each tagged speed, price, quality or trust · the phrases customers repeat verbatim, because those become ad copy · reviewer names and locations for attribution · **the date of every review**, because recency is now a proof property · **the owner's response and its date**, because response rate is a proof property too
- **Compute, do not eyeball:** reviews per month over the last 12 months (velocity) · share of reviews from the last 90 days (recency) · share of reviews with an owner reply and median reply time (responsiveness) · the rating distribution (a 4.8 from 200 fives and 40 ones reads differently from a steady 4.8)

### 11. ⛔ Review rules the proof file enforces (new, 2026-08-28)

These are what the review machine is allowed to do. Every one traces to the legal layer above.

- Ask every customer, using the Google review link or QR code, with nothing attached. No gifts, no discounts, no draws, no "if you were happy"
- No staff targets, no "mention my name", no asking on the premises
- No reviews from staff, family, contractors or the owner, on any platform
- Reply to every review inside a week, negatives first, no template. 50% of consumers are put off by templated replies (b · BrightLocal 2026)
- Never remove, hide or threaten over a negative. Reply to it
- Display the real rating and the real count. Never round up. A perfect 5.0 from a handful reads as fake and sells worse than a 4.7 (b · Spiegel 2017)
- Page-facing review quotes come from the last 90 days where the corpus allows; 74% of consumers want a review from the last three months (b · BrightLocal 2026)
- The benchmark is the current top 3 in the map pack for the money keyword, computed from `compass/crawler-google-places`, never a universal number. Match their count and beat their monthly rate
- If a past rewards program exists, say so in the proof file. Maps now asks reviewers whether the business offered rewards and deletes retroactively

### 12. Checkable credentials - public registries

The gap between "licensed and insured" and "license #58211, active since 2009, verify here" is the gap between a claim and a fact. **Nothing else in this playbook outranks a public record.**

- **Trade licensing boards** - state or provincial contractor, electrical, plumbing, HVAC, gas. Returns licence number, status, original issue date
- **Business registry** - Companies House (UK), Secretary of State (US), provincial corporate registry (CA). Legal name, incorporation date, officers. This is how "established 2011" becomes provable, and it doubles as the identity anchor for the relevance gate and the name Google Ads verification will print
- **Professional bodies** - law society, medical college, CPA body, engineering association
- **Manufacturer and vendor partner directories** - Lennox Premier Dealer, Trex Pro, Google Partner, HubSpot certified. Most trades run a tiered dealer programme with a public locator, and it is both a checkable credential and a recognisable badge
- **BBB profile** - rating, accreditation date, complaint history. Landing-page proof only: BBB callouts are being retired from Local Services Ads in the 2026 migration
- **Extract:** the number, the issue date, the verification URL. Always the URL, because a credential nobody can check is a claim

**These are per-jurisdiction, so there is no universal scraper.** Ask the trade and the location, find the right board, then pull the record or walk the owner to it. Where the jurisdiction requires the number in advertising (see the legal layer), write that requirement into the proof file so every ad and page inherits it.

### 13. Press and authority - advanced search and Semrush

- Google: `"[owner name]"`, `"[company]" review`, `"[owner]" interview OR podcast OR featured`. Media features are top-tier E-E-A-T and owners ALWAYS forget them
- Semrush backlinks report: every linking domain is a potential feature, award list or partner mention worth quoting
- "Best [service] in [city]" roundups that already include the business - quote them, link them

### 14. Badges - earned trust marks

- **Platform badges they may already have** - the LSA **Google Verified** badge (one badge, replacing Google Guaranteed and Google Screened), BBB Accredited seal, Angi Super Service Award, Houzz badges, industry association marks
- **GBP identity attributes** - women-owned, veteran-owned, Black-owned, LGBTQ+ owned, Asian-owned, Latino-owned, disabled-owned, Indigenous-owned, small business. They show on the profile in Search and Maps (a · Google). Only where the attribute is set or the owner confirms it; "family-owned" is not a Google attribute, so it is an interview confirm
- **Credential badges** - licensed, insured, bonded, with the license NUMBER, plus certifications and years in business
- **Official embeds** - Google has no native review embed. Third-party widgets (EmbedSocial, Taggbox, WiserReview class) connect via the Places API for live badges. For static sites, render the badge from scraped data (count, stars, "on Google") with a link to the profile. **The rendered number must match the profile on the day**, or the badge is a misleading representation
- **The earnable list** - badges the business qualifies for but has not claimed. Flag these as 30-minute wins
- **Recognition beats volume.** Recognised seals raise perceived security; obscure ones barely move it (b · Baymard). Keep to the 3 to 5 badge ceiling

### 15. Visual proof

- **Real review screenshots** - a screenshot of an actual Google or Facebook review with stars and platform chrome visible reads as undeniably real, and outperforms a styled quote because it looks native rather than designed. This is why the Drive `Screenshot` sweep matters so much
- **Rendered review cards** - take REAL scraped reviews and render branded card images for pages and posts
- **Customer and job photos** - before and afters from Drive, socials, or the owner's phone, catalogued into `proof/images/` with an index entry. Real beats stock by a wide margin: +161% on one service-business form (b · VWO)
- **Video testimonials** - phone quality beats none. 85% of people say a video has convinced them to buy (b · Wyzowl 2025). There is no study behind the "80% conversion lift" figure that circulates; do not quote it

### 16. The GBP itself, beyond reviews

- **Customer-uploaded photos** on the profile - real job photos nobody staged, often the only honest visual proof available. Respect attribution rules
- **Attributes** - pull them as proof slots (see badges)
- **Business name** - no taglines, hours, or service words in it. Ads verification and LSA both read the GBP name, so a decorated name breaks three things at once

**The Q&A section is GONE. Do not look for it.** Google discontinued Business Profile Q&A on 3 November 2025 (API killed the same day, public sections removed from December 2025). It is replaced by **Ask Maps**, which generates answers live from the website, the reviews and the profile fields. Objection research now comes from sales calls and reviews, and the way to influence Ask Maps is to put the answers on the website. See the FAQ seed section in `gbp-setup.md`.

### 17. Authority and scale

- **YouTube channel** - transcripts (spoken numbers that never reached the website), measured subscriber count, praise in comments
- **LinkedIn company page** - verifiable team size, founding year, follower count
- **Podcast indexes** (Listen Notes, Apple Podcasts) - guest appearances owners forget they did
- **Chamber of Commerce and trade association member lists** - membership with a join date
- **Local sponsorship pages** - sports teams, charities, school programmes. Strong support for family-owned and community positioning
- **Glassdoor and Indeed** - team size and culture claims. **Read before quoting**, since this one cuts both ways

### 18. Category-specific

Sweep only where they apply: G2 and Capterra (B2B software) · app store reviews (if they ship an app) · Shopify, Etsy or Amazon storefront reviews (product businesses) · Google Scholar or patents (technical and engineering firms).

### 19. Past Claude Code sessions - numbers said out loud while working

`~/.claude/projects/` holds one folder per project and one `.jsonl` per session. Run `code/mine_transcripts.py` to sweep them.

People state real numbers conversationally while working that they never write down anywhere public. "The client was paying 4K a month before we took over." "We saved them about 60% of their ad spend." None of that is on the website or in a review, and the owner will not mention it in an interview because to him it is just context.

**What to search for:** currency amounts and percentages in any form · result language ("we saved", "went from X to Y", "doubled", "3x") · timelines · counts of subscribers, leads, clients or jobs · month and year references that date a milestone · anything after the phrase "the client".

**⛔ Everything here is UNCONFIRMED until the owner confirms it.** Conversational numbers are frequently estimates, targets or outright hypotheticals. "Say the client is doing 40K a month" is a worked example, and the transcript does not mark the difference. **A hypothetical quoted as a result is inventing proof.**

**⛔ Relevance applies hardest here.** One projects folder holds every business the owner has ever touched, including clients' businesses and side projects. Run the anchors before anything leaves this sweep.

**⛔ Privacy - three hard limits.** Only facts about the owner's OWN business, never a client's or a competitor's numbers · never a credential, key, token or connection string, dropped rather than redacted · never a third party's personal data.

Output goes to a scratch candidate list the owner works through, never straight into `context/proof/`.

### 20. Competitor ads - where their proof claims live (new, 2026-08-28)

The competitor proof audit scores what a buyer sees on the page and the profile. Their ads are the third place, and they show which proof each competitor is paying to push.

- **Google Ads Transparency Center** - every verified advertiser's creatives by format, region and date range, with the payer name since May 2025. It does not show spend, keywords or expired ads, and unverified advertisers are absent (c · Social Media Examiner 2023, Influencer Marketing Hub 2025). Record the proof claims in their headlines: rating, count, years, licence, guarantee, response time
- **Semrush Advertising Research** - ad copy and estimated traffic cost by keyword; estimates only (c · Semrush 2026)
- **Meta Ad Library** - same job for social. Not opened from these repos; cite by name
- **What to write down:** for each of the top 3, the proof claims in their ads, and whether each claim is substantiated on their landing page. A competitor claiming "5-star rated" with a 4.3 profile is a gap you can take honestly

### Explicitly NOT sources

- **Court and lien records** - a negative check, not proof, and storing it is a liability
- **Data brokers and people-search sites** - frequently wrong, and citing one is a bad look
- **Anything requiring a number to be inferred, estimated or rounded up**
- **Fake-screenshot and fake-review generators** - inventing proof, and a federal offence in four countries

---

## ⛔ Getting proof out of the owner - the interview technique (new, 2026-08-28)

The command already runs the tick list and the one-at-a-time pass. This is how the yeses get turned into something an ad can carry.

- **Obstacle first, then result.** "What nearly stopped you hiring them?" gets the objection; "what happened after?" gets the result in the customer's own frame. The six-question order that works: obstacle, result, the one feature that mattered, three other benefits, would you recommend and why, anything to add (c · Psychotactics)
- **Specific past jobs, never generalities.** "Tell me about the last three you finished" beats "what results do you usually get". People answer hypotheticals with what they wish were true (c · The Mom Test)
- **Every result gets four parts or goes back:** what · for who · the number · the timeframe. Then the fifth: is that typical, and if not, what is? That fifth part is what the FTC and Google both require before a testimonial with a number can run
- **The exact guarantee.** Not "we guarantee our work" but the words, the trigger, the remedy and the time limit. Those words go on the landing page verbatim, because Google requires the offer on the page and Canada treats an untested guarantee as a reviewable claim
- **The never-say list, from their mouth.** Ask "what do competitors say that makes you angry?" and "what would you never let us write?" Superlatives, competitor names and regulated claims go on it by default; the owner's own bans go on top
- **Confirm the scraped number, do not ask cold.** "The profile shows 84 reviews at 4.7 today, the site says 100+ - the site is stale, yes?" A confirm takes two seconds and yields a correction; an open question yields an essay
- **Evidence in the same breath.** A yes on a testimonial is followed by "who is it from, do we have their OK in writing, and where is the file?" Consent and contact details on file are the CAP standard and the FTC's evidence expectation

## Voice - sample it, never ask for it (new, 2026-08-28)

- **Real writing beats self-description every time.** Owners describe their voice wrong and write it right. Sent mail, newsletters, LinkedIn posts, TikTok transcripts and YouTube transcripts are the voice on record; the interview confirms the draft, it does not create it
- **Customers' words are half the voice.** The phrases that repeat across reviews are the words buyers use to describe the outcome, and they belong on the page. Plain, customer-grade language converts better: pages at a grade 5 to 7 reading level convert 56% better than grade 8 to 9 (b · Unbounce 2024)
- **Understated beats hyped.** The testimonials that lifted WikiJob 34% were deliberately unenthusiastic (b · VWO). Do not polish a real quote into a fake one
- **Numbers never live in voice files.** They go to the proof inventory with source and date. One file owns numbers

## Proof placement - where it goes on the page (new, 2026-08-28)

- **First screen carries the strip:** real rating and count, licence number, years or jobs, one result with a number. 57% of viewing time is above the fold and 74% in the first two screens (b · Nielsen Norman Group 2018)
- **Testimonials sit beside the CTA, and both sides get tested.** Moving three lines of testimonial higher lifted purchases 34% (b · VWO). The "68% better below the CTA" figure in circulation has no study behind it; do not repeat it
- **Rating widgets match the profile on the day.** A schema or badge rating that disagrees with the GBP is a misleading representation and does more damage than none
- **Result-bearing testimonials carry their disclosure** on the same screen: either "typical" with proof on file or "most customers see X"
- **A logo wall lives where the decision is made,** not on a credentials page nobody opens
- **Response-time promises go near the phone number,** and only if the CRM can prove the median. LSA can print the average message response time in the ad, and from 1 October 2026 a missed call over 20 seconds is a billed lead, so the promise has a cost behind it

---

## ⛔ Capture EVERYTHING. Never a curated sample.

**The proof file is an inventory, not a highlight reel.** Every review quote, every number, every credential, every story. Not the best four.

- **A sample gets recycled.** Four quotes across forty pages means the same four quotes on forty pages, and a reader who checks two pages sees the trick immediately
- **The right proof is page-specific.** A speed quote belongs on the emergency page, a price quote on the pricing page. You cannot match proof to a page from a shortlist
- **You cannot know now what a page will need later.** The quote that seems unremarkable today is the exact objection-killer on a page written in three months
- **Volume IS the moat.** Forty real review quotes is a thing a competitor cannot fake. Four is a testimonial section

No top-N, no "the strongest ones", no cutting for length. If the list runs to 200 quotes, it runs to 200 quotes. `output-format.md`'s 10-item cap applies to what is DISPLAYED in a section, never to what is stored.

The only filters are truth and relevance: real, sourced, dated, and belonging to THIS business.

## The integrity line (never cross it)

- **NEVER fabricate.** Fake-screenshot generators exist for LinkedIn posts and review images. Using one is inventing proof: it breaks the never-invent rule, poisons every real claim on the site, and is an FTC violation. Every visual is generated FROM a real scraped review with a live source
- **Provenance on everything.** Every item carries its source and date ("Google review, 2026-03-14, [link]"). Unverifiable means tagged UNCONFIRMED until the owner confirms
- **Never borrow another business's proof.** Including a previous business the same owner ran. It is E-E-A-T for an about page, never a client result for this one
- **Permission for private-channel proof.** Praise from emails, Slack, DMs or a recorded call needs the customer's OK before it goes public. Draft the one-line ask ("Loved this note - mind if we quote you on the site? Happy to use first name only"). Offering anonymity raises yes-rates. Keep the OK and the contact details on file
- **Platform display rules.** Don't doctor platform chrome, don't cherry-pick a 5.0 impression when the profile shows 4.6. Display the real rating, because the honesty IS the trust signal
- **No number in an ad unless it is in the proof file.** This is the enforcement mechanism for every rule above. `context/proof.md` is the only approved source; an ad or page that carries a figure not in it is rejected at review, not fixed at review

---

## What changed 2024 to 2026 - the dated list

- **21 October 2024** · FTC Consumer Reviews and Testimonials Rule in force; $53,088 per violation since January 2025; first warning letters 22 December 2025
- **January 2024** · Competition Bureau warns businesses are liable for employee-posted reviews
- **20 June 2025** · Canada: private parties can bring deceptive-marketing cases to the Competition Tribunal
- **6 April 2025** · UK DMCC Act fake-review ban in force; grace ended 6 July 2025; five investigations announced 27 March 2026
- **28 March 2026** · Australia's maximum corporate penalty rises to the greater of $100M, three times benefit, or 30% of adjusted turnover; PhotobookShop (March) and Hismile (June) penalised over undisclosed and staged reviews
- **April 2025** · Google Maps adds warning alerts for profiles with removed suspicious reviews; 240M+ violating reviews removed in 2024
- **July 2025** · LSA review management moves into Google Business Profile
- **September 2025 onward** · Maps asks reviewers whether the business offered rewards; retroactive deletions
- **3 November 2025** · GBP Q&A removed; Ask Maps replaces it
- **7 December 2025** · last date for services eligible under the LSA money-back guarantee; Google Guaranteed and Google Screened replaced by one Google Verified badge
- **April 2026** · Maps policy bans staff review quotas and staff-name requests; 292M violating reviews removed in 2025
- **August 2026 onward** · LSA migrates into Google Ads as pay-per-lead Performance Max; BBB callouts retired; business details sync one way from GBP; history does not transfer
- **1 October 2026** · a missed LSA call over 20 seconds in business hours is a billed lead
- **Where buyers look now** · Google 71%, AI tools 45% (from 6% in 2025), Apple Maps 27% (b · BrightLocal 2026). The review corpus feeds AI answers too, so it is the one proof asset that works in every channel

## Output spec

Everything lands in the proof inventory (SEO: `context/proof.md` · Ads: `context/proof.md`) with source and date, images into the images folder with index entries, quote bank tagged by what each quote proves and dated, badge list split into HAVE and EARNABLE, a "permission pending" list for private-channel finds, a **"relevance unclear" list** for anything the identity anchors could not place, and a **"substantiation" line on every result** saying what proves it and whether it is typical.

**Every number carries both values when they disagree:** the site's claim with its date, and the measured value with its date.

**Every source that returned zero is named in the report**, so a broken actor or a dead query is visible instead of reading as an absence of proof.

**The NEVER SAY section is mandatory**, seeded from the legal layer and finished in the interview.

## Key sources

Official (a)
- [Google Ads Unreliable claims](https://support.google.com/adspolicy/answer/15936857) · [Dishonest pricing](https://support.google.com/adspolicy/answer/15938375) · [Unavailable offers](https://support.google.com/adspolicy/answer/15937063) · [Misleading representation](https://support.google.com/adspolicy/answer/15936666) · [Trademarks](https://support.google.com/adspolicy/answer/6118) · [Advertiser verification](https://support.google.com/adspolicy/answer/9703665) · [Store ratings](https://support.google.com/google-ads/answer/2375474)
- [LSA ad rankings](https://support.google.com/localservices/answer/7527305) · [LSA performance](https://support.google.com/localservices/answer/12492201) · [LSA reviews](https://support.google.com/localservices/answer/6242661) · [Google Verified badge](https://support.google.com/localservices/answer/16498018) · [GBP attributes](https://support.google.com/business/answer/9049526) · [GBP reviews help](https://support.google.com/business/answer/7035772) · [Maps content policy](https://support.google.com/contributionpolicy/answer/7400114) · [Google blog, protecting businesses on Maps, April 2026](https://blog.google/products-and-platforms/products/maps/new-ways-were-protecting-businesses-on-maps/)
- [FTC fake reviews rule press release](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials) · [FTC Endorsement Guides FAQ](https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking) · [FTC substantiation policy](https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation) · [FTC featuring reviews guide](https://www.ftc.gov/business-guidance/resources/featuring-online-customer-reviews-guide-platforms)
- [Competition Act s.74.01](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html) · [s.74.1](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.1.html) · [Ad Standards Canada code](https://adstandards.ca/code/the-code-online/) · [CMA regime in force](https://www.gov.uk/government/news/cma-to-boost-consumer-and-business-confidence-as-new-consumer-protection-regime-comes-into-force) · [CMA five investigations](https://www.gov.uk/government/news/fake-and-misleading-reviews-5-businesses-under-cma-investigation) · [CAP testimonials](https://www.asa.org.uk/advice-online/testimonials-and-endorsements.html) · [ACCC online reviews](https://www.accc.gov.au/business/advertising-and-promotions/managing-online-reviews) · [ACCC penalties](https://www.accc.gov.au/business/business-rights-responsibilities/fines-penalties) · [ACCC PhotobookShop](https://www.accc.gov.au/media-release/photobookshop-pays-penalties-for-influencer-reviews)
- [California BPC 7030.5](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7030.5) · [Florida 489.119](http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0489/Sections/0489.119.html) · [Washington RCW 18.27.100](https://app.leg.wa.gov/rcw/default.aspx?cite=18.27.100) · [Arizona ARS 32-1124](https://www.azleg.gov/ars/32/01124.htm) · [Ontario ESA](https://esasafe.com/contractors/licensing/advertising-requirements/)
- [Places API, five reviews](https://developers.google.com/maps/documentation/places/web-service/legacy/details) · [Yelp API, three reviews](https://docs.developer.yelp.com/reference/v3_business_reviews)

Stated-sample (b)
- [BrightLocal Local Consumer Review Survey 2026](https://www.brightlocal.com/research/local-consumer-review-survey/) · [2025 edition](https://www.brightlocal.com/research/local-consumer-review-survey-2025/) · [BrightLocal Google reviews study 2018](https://www.brightlocal.com/research/google-reviews-study/) · [Whitespark ranking factors 2026](https://whitespark.ca/local-search-ranking-factors/) · [Localogy on Local Falcon 2026](https://www.localogy.com/2026/02/google-review-competition-varies-by-industry/)
- [Spiegel Research Center 2017](https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/) · [Proserpio and Zervas, Marketing Science 2017](https://pubsonline.informs.org/doi/10.1287/mksc.2017.1043) · [ReviewTrackers 2022](https://www.reviewtrackers.com/reports/online-reviews-survey/)
- [NNG scrolling and attention 2018](https://www.nngroup.com/articles/scrolling-and-attention/) · [NNG trustworthy design](https://www.nngroup.com/articles/trustworthy-design/) · [Stanford web credibility](https://credibility.stanford.edu/guidelines/index.html) · [Baymard trust seals](https://baymard.com/blog/perceived-security-of-payment-form) · [VWO real photo test](https://vwo.com/blog/stock-image-or-real-image) · [VWO WikiJob](https://vwo.com/success-stories/wikijob/) · [Unbounce benchmark 2024](https://unbounce.com/conversion-benchmark-report/) · [Wyzowl 2025](https://www.wyzowl.com/video-marketing-statistics/)

Practitioner (c)
- [National Law Review, fifteen things about the FTC rule](https://natlawreview.com/article/what-are-fifteen-things-advertisers-need-know-about-ftcs-consumer-reviews-and) · [Crowell, first warning letters](https://www.crowell.com/en/insights/client-alerts/keeping-it-real-ftc-targets-fake-reviews-in-first-consumer-review-rule) · [LawFuel, Google reviews under enforcement](https://www.lawfuel.com/what-google-reviews-for-businesses-look-like-under-active-ftc-enforcement/) · [Reed Smith, UK fake reviews](https://www.reedsmith.com/en/perspectives/2025/08/the-truth-about-fake-reviews-what-businesses-need-to-know) · [BLG, Bill C-59](https://www.blg.com/en/insights/2024/07/false-advertising-and-greenwashing-bill-c-59-changes-to-competition-act) · [SmartCompany, Hismile](https://www.smartcompany.com.au/marketing/hismile-fined-138600-social-videos-staff-posed-random-shoppers/)
- [PPC Land, Maps review policy April 2026](https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/) · [PPC Land, rewards prompt](https://ppc.land/google-maps-is-now-asking-users-if-businesses-paid-for-their-reviews/) · [PPC Land, LSA into Google Ads](https://ppc.land/google-folds-local-services-ads-into-google-ads-cuts-historical-reports/) · [PPC Land, missed calls billed](https://ppc.land/google-charges-local-services-advertisers-for-missed-calls-over-20-seconds/) · [SEJ, LSA into Google Ads](https://www.searchenginejournal.com/google-is-bringing-local-services-ads-into-google-ads/) · [SEJ, Maps fake review upgrade 2025](https://www.searchenginejournal.com/google-maps-gets-an-upgrade-to-combat-fake-reviews/)
- [Apify Google Maps reviews scraper](https://apify.com/compass/google-maps-reviews-scraper) · [Apify Google Places crawler](https://apify.com/compass/crawler-google-places) · [Apify website content crawler](https://apify.com/apify/website-content-crawler) · [Social Media Examiner, Ads Transparency Center](https://www.socialmediaexaminer.com/how-to-research-your-competition-with-google-ads-transparency-center/) · [Influencer Marketing Hub, ad libraries](https://influencermarketinghub.com/meta-google-ads-libraries/) · [Semrush, competitor ad spend](https://www.semrush.com/blog/competitor-ad-spend/)
- [Psychotactics, six testimonial questions](https://www.psychotactics.com/six-questions-testimonials/) · [The Mom Test](https://www.momtestbook.com/) · [ReplyOnTheFly review benchmarks](https://www.replyonthefly.com/blog/how-many-google-reviews-do-you-need) · [Google Drive search terms](https://developers.google.com/drive/api/guides/ref-search-terms) · [Gmail search operators](https://support.google.com/mail/answer/7190) · [GA4 schema](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)

---

## What changed in this revision

**Kept verbatim (Jono's rulings):** the three override rules (relevance, measure, discover), the connected-accounts pass including the Drive enumeration method and the Gmail queries, the JavaScript-bundle and form-field rules, the Apify silent-zero rule, the GBP Q&A note, the past-sessions privacy limits, Capture EVERYTHING, and the integrity line. One sentence was added to the integrity line (the no-number-outside-the-proof-file enforcement) and one paragraph to Gmail (permission on file).

**Corrected, with dates**
- The header statistics. "92% hesitate", "50 milliseconds", "badges lift 22 to 42%", "photos beat text by 35%", "72% trust user photos" and "video testimonials up to 80%" were vendor round-up figures with no named study. Replaced with graded numbers and their samples (28 August 2026)
- `conceivable_extension/multi-platform-review-scraper` retired: 10 users, no ratings, README admits it had never been run live. The "$0.002 per review" cost line went with it. `compass/google-maps-reviews-scraper` ($0.30 per 1,000) and `compass/crawler-google-places` are now the named, verified actors, and `tri_angle/yelp-scraper` is the untested Yelp route (28 August 2026)
- "Google Verified (LSA)" in the badges section was ahead of the file's own text elsewhere; the whole file now reflects one Google Verified badge, Google Guaranteed and Google Screened retired, money-back guarantee discontinued with a 7 December 2025 cutoff
- BBB moved from ad callout to landing-page proof only, following the LSA migration into Google Ads (August 2026)
- "Video testimonials are the highest-converting proof format" softened to the measured claim (85% say video convinced them, Wyzowl 2025); the 80% lift figure is named as a myth

**Added**
- The legal layer: substantiation before the claim, typical-result disclosure, evidence and consent on file, offer-on-the-page; the FTC rule with the $53,088 penalty; Canada's s.74.01 and s.74.1 amounts and the June 2025 private right of action; UK DMCC; Australia's March 2026 penalty ceiling and two 2026 cases; Google's April 2026 Maps policy bans; licence-in-advertising statutes for four US states and Ontario; the NEVER SAY seed list
- Review rules the proof file enforces, with the graded data behind each
- Interview technique (objection-first, four-part results plus typicality, exact guarantee wording, never-say list from the owner)
- Voice section (sample, never ask; customer words; understated beats hyped; numbers never in voice files)
- Proof placement with the NNG and VWO numbers, and the retraction of the "68% below the CTA" figure
- Competitor ads as a proof-audit source (Transparency Center, Semrush, Meta Ad Library)
- The dated 2024 to 2026 change list, including LSA into Google Ads, missed-call billing from 1 October 2026, and where buyers look now
- Grading on every number, and a graded Key sources list

**Flagged for `competitor-proof-audit.md` (not edited here):** the "GBP Q&A" row is dead since November 2025; the "social proof below the CTA converts better" line rests on an unsourced figure and should read "beside the CTA, both sides tested"; the "8 to 10 reviews a month" velocity figure is practitioner-grade and should defer to the computed top-3 rate.
