# Research dossier - competitor ad intelligence for Google Search, 2025-2026
Built 28 August 2026 · 78 sources read · WebSearch was unavailable, so every source was fetched by URL, via GitHub, or run live through the Semrush MCP
Next: fold the graded rules at the bottom into `references/competitor-intelligence.md` and the `/scrape-competitors` command.

## How to read the grades

- **(a)** - Google's own documentation, a primary legal text, or something observed first-hand during this run
- **(b)** - a reputable secondary source or a vendor's own published claim about its own product
- **(c)** - inference or practitioner opinion, stated because a scout needs a working rule even where nobody has published a study

Where a source could not be reached (Search Engine Land, WordStream, Reddit, Optmyzr's blog index, several Semrush KB pages) it is said so. Nothing below is attributed to a page that was not actually read.

---

## Findings by area

### 1. The Ads Transparency Center - what it shows

- **Scope.** A "searchable repository of advertisers and the ads they've served on Google platforms like Search, Display, Gmail, and YouTube", searchable by advertiser or website name, filterable "by details like date and targeted location". (a) Google Ads transparency policy, answer 13733850
- **Advertiser identity.** Verified advertisers show "the advertiser's legal name, or trademark name and location" with a "verified" badge. Unverified advertisers show the payments profile name and location with an "unverified" badge. (a) answer 13733850
- **Payer name split, May-June 2025.** Since May 2025 Google displays the payment profile name as the payer where it differs from the verified name; agencies' client payment profiles are the payer name; from June 2025 advertisers can edit the displayed payer name under billing. Posted 30 April 2025. (a) answer 16189141. Practical effect: the name on an ad can be an agency or a holding company, so match by domain, not by name.
- **EU extras.** For EU regions the Center also shows "Targeting information", "Total number of recipients for each ad" and a "Subject matter label of the ad (at times Google-generated)". (a) answer 13733850. This is the DSA Article 39 repository built into the same tool. (a) DSA Article 39 text
- **Per-creative fields.** Format (text, image, video), first shown and last shown dates, regions shown, a rendered preview of the ad, and for EU ads the reach range. (b) three Apify actor docs and the ducnhd README, all reading the same live endpoints in 2026
- **Political ads.** Separate section at adstransparency.google.com/political, which now also owns the old transparencyreport.google.com political-ads URL (301 redirect observed 28 August 2026). (a) Political ads show spend and impression ranges, unlike commercial ads. (b) SEJ, March 2023
- **Launch.** Announced March 2023, rolled out worldwide "over the next few weeks". (b) SEJ, TechCrunch, 29 March 2023
- **Platform filter cut-off.** One actor documents that the platform (Search vs YouTube vs Shopping) filter "applies only to ads shown after September 4, 2023". (b) scrapesage actor doc
- **Retention.** Google's help page does not state a retention window for commercial ads. (a) Observed in the example file and in actor docs: creatives with last-shown dates months old are still listed, and one actor claims "campaign dates since 2018". (b) Treat commercial-ad history as "long but unspecified" and never claim a hard window.

### 2. The Ads Transparency Center - what it hides

- **No spend, no impressions, no clicks, no keywords, no landing page performance** for commercial ads. Every actor doc says the same: "no impression or budget figures", "does not return: raw ad copy/text content, click-through rates, impression counts, conversion data". (b) ducnhd README, scrapesage, automation-lab docs; consistent with Google's help page which lists none of these. (a)
- **Text of text ads arrives as a rendered preview, not as fields.** The Center serves a preview image or rendered HTML; headlines and descriptions must be transcribed from it. (b) ducnhd README (`format: rendered_preview`), scrapesage ("does not return raw ad copy/text"). This is why the example file says "Transcribed from Google's rendered previews".
- **Ad counts are approximate.** "Ad counts from Google are approximate ranges only." (b) scrapesage. The declared count can exceed the fetchable creatives: "3 of 20 advertisers tested returned no creatives" despite a declared count, because Google "keeps advertisers whose ads have stopped running and still reports a count for them". (b) ducnhd README, measured 6 August 2026
- **Which variant of an RSA was served is invisible.** The Center shows creatives, not the headline combinations Google assembled per auction. (c) Inference from RSA mechanics (a) answer 7684791: up to 15 headlines and 4 descriptions are combined dynamically.
- **Not a complete record.** "The Transparency Center covers ads Google chooses to disclose. It is not a complete record of an advertiser's spend." (b) ducnhd README

### 3. The Ads Transparency Center - API, scraping, rate limits, terms

- **No official public API for commercial ads.** "Ads Transparency has no official public API and Google's Terms of Service restrict automated access." (b) ducnhd README. Google's own page says only that "Regulators may receive API access to data about ads served outside the EEA". (a) answer 13733850
- **Rate limit observed.** "Google rate-limits this endpoint per IP - about 25 requests from a single address was enough to earn a 429 in testing." (b) ducnhd README, measured 6 August 2026. Actors handle this with proxy rotation and caching.
- **Region parameter trap.** One actor: "region is Google's internal enum, not a country code, and a wrong value returns zero ads with no error." (b) ducnhd README. Another accepts ISO codes but for only 15 markets. (b) xtech. The existing `competitor-proof-audit.md` rule stands: **an empty array is not "no ads"** - it is a wrong parameter until proven otherwise.
- **Terms.** Access is governed by "Ads Transparency Center terms of service" at adstransparency.google.com/terms. (a) answer 13733850. The terms page itself would not render through a plain fetch on 28 August 2026 (JS app shell only). Google's general Terms of Service ban "using automated means to access content from any of our services in violation of the machine-readable instructions on our web pages (for example, robots.txt files)". (a) policies.google.com/terms
- **robots.txt.** adstransparency.google.com/robots.txt returned 404 on 28 August 2026, so there is no machine-readable disallow on that host. (a) www.google.com/robots.txt disallows `/search` for general user agents. (a) So live-SERP scraping of google.com is against Google's stated machine-readable instructions; reading the Transparency Center is not, but is still restricted by the Center's own terms.
- **Apify actors, priced 2026.** `solidcode/ads-transparency-scraper` $4 per 1,000 results, 170+ regions, 1,733 users, 100% success rate, returns first/last shown dates and preview URLs, "landing page information is not extracted". `scrapesage/google-ads-transparency-scraper` from $2 per 1,000 ad results, has an advertisers mode and a monitor mode that bills only for new ads, 704 users. `xtech/google-ad-transparency-scraper` $25 a month rental, 15 markets, up to 100 targets per run, includes impression ranges and targeting signals where public. `automation-lab/google-ads-scraper` $0.005 per run plus $0.001 per ad, 1,000 ads per advertiser cap, returns verification status. (b) each actor's Apify page, 28 August 2026. None has been run from this repo - the untested-actor rule in `competitor-proof-audit.md` still applies.

### 4. Auction Insights

- **Metrics for Search.** Impression share, overlap rate, outranking share, position above rate, top of page rate, absolute top of page rate. Shopping gets three. Performance Max is segmented into Search and Shopping. (a) answer 2579754
- **Threshold.** Competitors "won't be included" in the report when their impression share is below 10%. Google does not publish the minimum-activity threshold for the report to exist at all. (a) answer 2579754
- **Definition.** Impression share is "the number of impressions you received divided by the estimated number of impressions you were eligible to receive". Eligibility includes auctions where the ad could show at up to 2x the current bid and excludes those needing a 1,000%+ increase. (a) answers 2579754 and 2497703
- **Limits.** Search partners excluded; a competitor's impression share in your report can differ from their own numbers; Shopping data from October 2014, Performance Max from November 2021. (a) answer 2579754. The interface shows roughly "5-10 competitors" per report. (b) Adalysis, 2019
- **It is in the API.** Google Ads API exposes `segments.auction_insight_domain` ("Domain (visible URL) of a participant in the Auction Insights report") and six metrics: `auction_insight_search_impression_share`, `_overlap_rate`, `_outranking_share`, `_position_above_rate`, `_top_impression_percentage`, `_absolute_top_impression_percentage`. (a) googleapis segments.proto and metrics.proto, v25. This corrects the older Adalysis note that only Data Studio exports existed. Google Ads Scripts reporting docs do not mention auction insights. (a)
- **How to read it.** Separate "impression competitors" (share auctions, do not share customers) from true competitors; segment brand vs non-brand; compare week over week to spot budget depletion; note that geography and season move the competitor set. (b) Adalysis, two articles
- **Requires an account.** Auction Insights is only available inside a running Google Ads account with impressions. For an outside-in audit before launch it does not exist - the scout must lean on the Center and live SERPs. (c)

### 5. Impression-share signals

- Lost impression share (budget) and (rank) are the two levers; a "-" means insufficient traffic or a new keyword, allow 24-48 hours. (a) answer 2497703
- For a scout, a competitor's high impression share plus high position-above rate means they are outbidding, not out-writing; copy will not fix that alone. (c) Consistent with the Adalysis Firebird Tours example ("above us 80% of the time"). (b)

### 6. Third-party PPC spy tools - what they can and cannot tell you

- **iSpionage is gone.** "iSpionage has officially shut down as of 07/09/2025." (a) tapclicks.com/ispionage, read 28 August 2026. Any guide still recommending it is stale.
- **Semrush Advertising Research** shows paid keywords with positions, ad copies, ads history back to 2012, estimated traffic cost, landing pages, and asks "Why is data in Advertising Research different from what I have in Google Ads?" - i.e. it is independently sampled, not from the account. (b) Semrush feature page. The MCP exposes three reports: `resource_adwords` (keywords, positions, CPC, traffic estimates), `resource_adwords_unique` (unique ad copies with title, text, visible URL, landing URL), `domain_adwords_historical` (12 months of monthly keyword history with ad text). (a) Semrush MCP schema
- **Semrush coverage gap for local advertisers, observed.** On 28 August 2026, `resource_adwords_unique` returned NOTHING FOUND for antaplumbing.com and rotorooter.ca in the Canadian database, and `domain_adwords_historical` returned nothing for antaplumbing.com. mrrooter.ca returned two rows (September 2025 snapshot, "Mr. Rooter of Edmonton - No Overtime Charge", CPC $11.22 and $11.09, coverage 8.33%). (a) First-hand. These are advertisers with dozens of live creatives in the Transparency Center per the example file. **Third-party tools under-count local service advertisers badly.**
- **SpyFu says the same, with numbers.** "Local HVAC advertiser: SpyFu found 73 keywords vs Semrush's zero", "Plumber in Denver: SpyFu surfaced 277 keywords against Semrush's single keyword". (b) SpyFu, 4 February 2026 - a vendor comparison, so discount it, but it matches the first-hand Semrush result above.
- **SpyFu's sampling rate.** Increased "from monthly to hundreds of times per day", a "600-1,000x expansion" from early 2026; "4+ months of ad pattern history"; and a hard caveat: "Before December 2025, blank entries in Ad History don't indicate absence of ads - they reflect limited data availability during that period." (b) SpyFu, 16 January and 19 February 2026
- **Accuracy of estimated spend.** No vendor published a validation study against real accounts. SpyFu's own blog index has no accuracy article; Semrush's KB search returned nothing; Ahrefs' accuracy pages were 404. (a) Observed. Treat estimated monthly budget and estimated clicks as order-of-magnitude only. (c)
- **Ad longevity as a proxy.** "Long-running ads signal effective messaging, as advertisers paid repeatedly to maintain them" and Ad History shows "which messages survived months of testing and which disappeared". (b) SpyFu, February 2026. Same principle in the GitHub competitor-ad-intelligence skill: "Long-running ads reveal what converts. New ads reveal what they're testing." (b) Reasonable, with two caveats: a long run can also mean nobody is managing the account, and Transparency Center first/last dates are per creative, not per headline. (c)

### 7. The live-SERP method

- **Google's own advice is not to search for your own ads**: the Ad Preview and Diagnosis tool "avoids accumulating ad impressions and impacting your performance statistics", and previews can vanish "once campaigns reach daily budget limits". (a) answer 148778. Read across: a competitor's ad missing at 4pm may simply be a spent budget, not a paused campaign.
- **Location is estimated from device location, account addresses, search history and IP**; Google always resolves to a general area larger than 3 sq km with 1,000+ users. (a) websearch answer 179386. A scout must set location explicitly (UULE or a SERP API location parameter), not rely on being "in" the city.
- **Presence vs presence-or-interest targeting** means a competitor's ad can show to people outside the city, and a Toronto scout can see ads from outside Toronto. (a) answer 1722043
- **Ad scheduling** lets advertisers restrict hours and days; an ad seen at 10am may not run at 10pm. (a) answer 2404244. Monthly spend still targets 30.4 times the daily budget. (a)
- **Ad rotation and RSAs** mean the same competitor shows different headline combinations per query and per hour, so one capture is one sample of a distribution, not "their ad". (a) answer 7684791. Google's own advice on RSAs: pin at most one or two headlines and let the rest rotate. (a)
- **How many samples.** Nobody publishes a number. SpyFu's move from monthly to "hundreds of times per day" is the only published data point on sampling density. (b) Working rule, graded (c): three captures per money keyword per day (morning, midday, evening) on two days including one weekend day, mobile and desktop each, equals twelve captures per keyword. Fewer than three captures cannot separate a scheduled ad from a paused one.
- **SERP APIs return ads as structured fields.** SerpApi returns title, description, displayed_link, link, position, block_position (top, bottom, middle, right), sitelinks, extensions, source, rating, reviews, and takes a location string. (b) serpapi.com/google-ads. DataForSEO targets "a particular region, district, or even GPS coordinates" at $0.60 to $2.00 per 1,000 SERPs. (b) Apify `apify/google-search-scraper` has a paid-results add-on, `locationUule`, `mobileResults`, from $1.80 per 1,000 pages. (b)
- **Google is making SERP capture harder, August 2026.** Google confirmed on 26 August 2026 that search result links now route through `google.com/goto` redirects, "nearly a 100% rollout across several residential ip providers", and the parameters "can't be decoded, so providers will have to follow the redirect links". (b) Search Engine Roundtable, 26 August 2026. PPC Land puts the cost at "500 to 1,000 requests per results page where one request sufficed". (b) 28 August 2026. Google's statement: "a technical measure against evolving forms of abuse". (b) Expect SERP API prices and failure rates to move; the Transparency Center is the stable source.
- **Do not label your own hand-searches as data.** A signed-in browser with history is personalised; an incognito window still carries IP location. (a) answer 179386. Use the Ad Preview tool in a Google Ads account, or a SERP API with an explicit location, for anything you count.

### 8. Reading competitor copy - claim taxonomy, table stakes, gaps

- **The five angles used by the repo** (offer, speed, price, trust, risk-reversal) map onto what Google's own policies police: offers must be "easily found from the destination", pricing must not create "a false or misleading impression of the cost", and claims must not "entice the user with an improbable result". (a) misrepresentation policy, answer 6020955
- **Superlatives.** Google does not ban "#1" outright, but an unverifiable superlative fails the unreliable-claims test. (a) answer 6020955; the example file's "Voted #1 GTA Plumbers" treatment is right.
- **Phone numbers in ad text** are an editorial violation. (a) answer 6021546. Competitors doing it (GTA Restoration in the example) are running on borrowed time - do not count that as a lane.
- **Reviews and stars inside ads** come from seller ratings and Local Services, an account asset, not copy. (b) example file; consistent with Google's asset docs. (a)
- **Sitelinks**: 25 characters, minimum 2, up to 6 on desktop and 8 on mobile; Google claims "up to 3.5% more conversions" from six per campaign and "15% more conversions" moving ad strength from Poor to Excellent. (a) answer 2375416. **Call assets**: E.164, verified number, shown by algorithm on "historical performance", billed at standard CPC. (a) answer 2453991. Count a competitor's assets as claims too - a "$25 Off Today" sitelink is an offer claim.
- **Ad strength is not performance.** Optmyzr's study of about 20,000 accounts, 6 April 2026: "Average" strength ads had the lowest CPA ($12.43) and "Excellent" the worst ($28.68); headlines under 20 characters CPA $9.35 vs $18.27; sentence case beat title case 3.7x on CPA ($7.46 vs $27.47); partial pinning beat full pinning ($13.68 vs $32.57). (b) So a competitor's polished, title-cased, five-angle headline is not evidence it works.
- **Short beats long.** Under-20-character headlines and 61-70 character descriptions performed best in the same study. (b) Optmyzr 2026. The swipe-file rubric should reward compression.
- **Benchmarks for context.** 2026 search averages: CPC $5.42, CTR 6.64%, CVR 8.18%, CPL $66.69; home services CPC $8.33 and CPL $90.92; legal CPC $9.87 and CPL $131.63. (b) LocaliQ 2026. Landing pages: median conversion 6.6% across 41,000+ pages; paid search 10.9%; 5th-7th grade reading level converts 11.1%, 56% higher than 8th-9th grade; word count correlates negatively (-18.6%). (b) Unbounce 2024
- **Hook taxonomy from elsewhere.** The GitHub competitor-ad-intelligence skill clusters by fear/loss, outcome, question, social proof, contrarian, empathy, product-led. (b) Useful for social; for Search the repo's five commercial angles plus "capability", "identity" and "method" (already used in the example file) are the better fit. (c)

### 9. Competitor landing pages

- **Google grades landing page experience** as one of three Quality Score components, rated above average, average, below average against other advertisers over 90 days. (a) answer 2404197. Its published advice: match intent, keep the ad's promise, mobile first, speed. (a) answer 6167130
- **Destination policy**: display URL domain must match the final URL domain, no redirects to other domains, no pages "replicated from another source without adding value", phone numbers must be "in service in the location you're targeting". (a) answer 6368661
- **Trust factors** (NN/g): design quality, upfront disclosure of price and fees, comprehensive and current content, connection to the rest of the web ("people trust these external sources more than company-sponsored content"). (b) NN/g
- **Grading rubric inputs**: one message, one CTA, message match to the ad, load under 3 seconds on mobile, real testimonials with names and photos, multi-step forms. (b) Unbounce best practices; Contentsquare's four questions (one message, efficient elements, trustworthy enough to leave contact details, converts). (b)
- **Getting them.** The Transparency Center does not extract landing pages (solidcode doc). Landing URLs come from SERP captures (`link` field) or from Semrush `resource_adwords_unique` (`url` column) where coverage exists. (a)/(b)
- **Proof grading already exists** in `competitor-proof-audit.md`; the scout should grade only ad-to-page message match, offer presence, and price visibility, then hand proof scoring to that file. (c)

### 10. Ethics, policy and law of copying and competitor bidding

- **Copyright does not protect ad lines.** "Words and short phrases, such as names, titles, and slogans, are uncopyrightable", including "mottos, slogans, or other short expressions". (a) US Copyright Office Circular 33, revised March 2021. So "never copy a competitor line" is a quality and trademark rule, not a copyright one.
- **Trademark in ad text.** Google restricts a trademark in ad text after a complaint from the owner, "in any ads that use the same second-level domain", with at least 7 days' warning before suspension. Keywords and second-level domains are not restricted. Resellers and informational sites are exceptions. (a) answers 6118 and 2562124
- **Complaints are per advertiser, not industry-wide.** Google "will only review complaints identifying specific advertisers and their URLs within the countries and industries in which trademark owners have demonstrated trademark rights". (a) answer 2562124. Wikipedia dates the older industry-wide restriction as running "until 2023". (b) No 2024-2026 trademark entry appears in Google's policy change logs. (a) Change log topics for 2024, 2025, 2026 read 28 August 2026.
- **Bidding on a competitor's brand keyword is lawful in the US** - Lens.com did not infringe by buying "1800 CONTACTS" as a keyword (10th Circuit, 2013). (b) Wikipedia. The FTC lost its case against 1-800 Contacts' no-bidding agreements on appeal (2nd Circuit, 11 June 2021), so such private agreements can also be lawful. (a) FTC case page
- **EU**: courts "have been slow to issue clear guidance"; most cases settle. (b) Wikipedia keyword advertising. The CJEU and Interflora pages could not be fetched; grade EU brand-bidding as "lawful if the ad does not confuse origin", (c).
- **Practical stance for the scout**: record competitor brand terms as a separate cluster, never put a competitor's mark in ad text, and treat any competitor doing it as a compliance note, not a lane. (c) Matches the repo's existing "we never copy them".

### 11. Scraping law and limits

- **US**: hiQ v LinkedIn (9th Cir. 2019, reaffirmed April 2022) - scraping public pages is not a CFAA violation; but hiQ was found in November 2022 to have breached LinkedIn's user agreement and settled. (b) Wikipedia. Meta v Bright Data (January 2024) and X v Bright Data (May 2024): scraping public data did not breach terms; bypassing CAPTCHAs was distinguished from accessing password-protected content. (b) Wikipedia Bright Data, Apify legal blog
- **EU**: DSM Directive Article 4 allows text and data mining for any purpose unless the rightsholder opts out in machine-readable form (robots.txt). In force 6 June 2019, transposed by 7 June 2021. (b) Wikipedia. GDPR treats publicly available personal data as still personal. (b) Apify blog
- **Contract**: clickwrap terms are enforceable; browsewrap rarely unless prominent. (b) Apify blog
- **Google's terms** ban automated access "in violation of the machine-readable instructions" and "bypassing our systems or protective measures". (a) Rate-limit dodging by proxy rotation is arguably bypassing a protective measure. (c) Cloudflare's page on the topic was 403 and is not cited.
- **Working rule**: read the Transparency Center at human pace, cache, never rotate proxies from this repo, prefer a paid actor (the actor operator carries the terms risk), and never store personal data. (c)

### 12. Refresh cadence and re-scout triggers

- No PPC source publishes a "30 days" rule. HubSpot's content-competitor guidance is weekly for posts, monthly for rankings, quarterly for full audits, with triggers on rank shifts, major new initiatives, distribution changes and algorithm updates. (b) HubSpot
- Adalysis: compare Auction Insights week over week to catch budget depletion; competitor sets move with geography and season. (b)
- SpyFu: 4+ months of ad-pattern history at hundreds of samples a day is what it takes to see "where competitors ramped budgets and pulled back". (b)
- **Working rule, (c)**: full re-scout every 30 days (matches the Transparency Center's date filter granularity and the 30.4-day budget month); interim re-scout when Auction Insights shows a new domain above 10% impression share, when a top-3 competitor's creative count changes by a third, on a seasonal boundary for the vertical, or when a competitor files a trademark complaint.

### 13. Using the scout in an outside-in audit

- Before an account exists there is no Auction Insights, no impression share and no waste number. The outside-in audit can only produce a gap list: claims nobody runs, offers nobody prints, assets nobody uses. (c) Consistent with `feedback_audit_inference_on_call` in memory: data plus book the call, no pre-call prescriptions.
- Google's own benchmarks (Ad strength, sitelinks) are the only numbers a stranger can quote about a competitor without an account, and Optmyzr shows Ad strength does not predict performance. (b) So the audit reports **what they say and what they leave unsaid**, never "what they spend".

### 14. What changed 2024-2026

- **June 2024**: optional affiliation verification added to advertiser verification. (a) answer 14875612
- **November 2024**: verification help centre reorganised, no enforcement change (posted January 2025). (a) answer 15576964
- **April 25 2023 to 2024**: Google Search designated a VLOSE under the DSA; compliance from 25 August 2023; EU targeting and reach data live in the Center. (b) Wikipedia DSA, (a) answer 13733850
- **April-June 2025**: payer name displayed separately from verified name; editable from June 2025. (a) answer 16189141
- **9 July 2025**: iSpionage shut down. (a)
- **October 2025**: EU political ads restricted under Regulation 2024/900 (TTPA); Google's policy page cites it. (a) answer 6014595. The Google blog post announcing the EU pause could not be fetched; grade the "Google paused EU political ads" line (b).
- **December 2025 to February 2026**: SpyFu's PPC data expansion; pre-December-2025 gaps are not evidence of absence. (b)
- **July 2026**: AI-generated ad disclosure required; "How this ad was made" appears in the My Ad Center panel and on ads in the EU, India and New York State. (b) SEJ, 13 July 2026
- **August 2026**: google.com/goto redirects on search results, confirmed 26 August 2026, breaking cheap SERP capture. (b)
- **Not changed**: no trademark policy entry in the 2024, 2025 or 2026 change logs. (a)

---

## Myths, with dates

- **"The Transparency Center shows what competitors spend."** False for commercial ads; spend and impression ranges exist only for political ads. (a) 13733850, (b) SEJ 2023
- **"The Transparency Center only keeps 30 days."** Unsupported; Google publishes no window, actors return creatives with last-shown dates months old, and one claims dates since 2018. (a)/(b) 2026
- **"An empty result means they run no ads."** False; wrong region enum, rate-limit 429s and advertisers with a declared count but zero fetchable creatives all return empty. (b) ducnhd, 6 August 2026
- **"Auction Insights is UI-only, no API."** False since the Google Ads API added `segments.auction_insight_domain` and six metrics; Adalysis' 2019 Data-Studio workaround is stale. (a) googleapis proto v25
- **"Semrush or SpyFu know their keywords."** They sample; Semrush returned nothing for two active Toronto plumbing advertisers on 28 August 2026, and SpyFu says its own history before December 2025 has blanks that are not absences. (a)/(b)
- **"iSpionage is a good PPC spy tool."** It closed 9 July 2025. (a)
- **"Excellent ad strength means the competitor's ad is good."** Optmyzr, April 2026: Excellent had the worst CPA of the four ratings. (b)
- **"Copying a competitor's headline is copyright infringement."** Short phrases are not copyrightable; the real risks are trademark and looking identical. (a) Circular 33
- **"Bidding on a competitor's brand is illegal."** Lawful as a keyword in the US; the restriction is the mark in ad text after a complaint. (a)/(b)
- **"Search for the keyword yourself and you have seen their ads."** One personalised, IP-located, time-of-day sample of a rotating RSA. (a) 148778, 179386, 2404244, 7684791
- **"Google restricts a trademark industry-wide once complained about."** Per advertiser and per second-level domain since at least 2023. (a) 2562124, (b) Wikipedia

---

## Rules a scout command should enforce (graded)

1. Scout only the top 3 clusters in keyword-map.md; depth beats breadth. (c) existing command, kept
2. Identify competitors from the live SERP and the Places actor's `peopleAlsoSearch`, not from the owner's list. (b) competitor-proof-audit.md
3. Pull the Transparency Center by advertiser domain, never by name alone, because the displayed payer name can be an agency since May 2025. (a)
4. Record per creative: advertiser, domain, format, first shown, last shown, regions, transcribed headlines, descriptions, assets. (b)
5. Filter to text ads last shown inside the current 30-day window for "live"; keep older creatives as "dormant", never as "running". (c)
6. Cap at 12 live creatives per advertiser and say the cap out loud. (c) existing example
7. An empty return is a failure until a second method confirms it - re-run with region unset, then check the SERP. (b)
8. Never scrape with proxy rotation or above human pace from this repo; use a paid actor or read by hand. (a) Google ToS, (c)
9. Never store personal data from any source; advertiser and creative records only. (b)
10. Live-SERP sample: three times a day, two days including a weekend day, mobile and desktop, location set explicitly by UULE or API location, never a signed-in browser. (c), built on (a)
11. Count an ad as "running" on the SERP only if seen in at least two of the samples; one sighting is "seen once". (c)
12. Record block position (top or bottom) and the Sponsored label per sighting; top-of-page presence is a rank signal. (b) SerpApi fields
13. Dedupe claims into one ranked list by angle: offer, speed, price, trust, risk-reversal, capability, identity, method. (c) existing command plus example file
14. Count assets as claims: a sitelink or promotion asset carrying an offer joins the offer count. (a) asset docs
15. Table stakes = claims run by half or more of live advertisers; gaps = claims run by nobody; overcrowded = claims run by everyone with no number attached. (c)
16. Every gap must be paired with a real proof point from context/proof.md or marked "no proof, do not use". (c) existing command
17. Flag every competitor compliance breach (phone number in text, unverifiable superlative, offer absent from the page) as "not a lane". (a) 6021546, 6020955
18. Never place a competitor's trademark in ad text; competitor brand terms go in a separate cluster with its own copy. (a) 6118
19. Never copy a competitor line verbatim or with one word swapped; the swipe file is calibration only. (c) existing command
20. Score swipe lines on the rubric in references/google-ads.md, judging proof against the competitor's own visible proof and differentiation against the claim list. (c) existing example
21. Reward compression in the swipe score: sub-20-character headlines and 61-70 character descriptions have the published edge. (b) Optmyzr 2026
22. Ignore Ad strength as a quality signal for competitor ads. (b) Optmyzr 2026
23. Treat ad longevity as a weak positive for paying copy, never as proof; note when a long-running ad is the only ad, which reads as an unmanaged account. (b)/(c)
24. Treat third-party spend and keyword estimates as order of magnitude and label them "estimated"; a zero from Semrush or SpyFu for a local advertiser is a coverage gap, not evidence. (a) first-hand
25. Do not cite iSpionage. (a)
26. Pull landing pages from SERP captures or Semrush unique ads, grade only message match, offer present, price visible; hand proof scoring to competitor-proof-audit.md. (c)
27. In the EU, record targeting and reach from the Center; outside the EU, never claim reach. (a)
28. For political or election clusters, use the political section and note that spend shown there does not exist for commercial ads. (a)
29. Auction Insights, when an account exists, is pulled through the API with `segments.auction_insight_domain` and joined to the scout by domain; competitors under 10% impression share will be missing. (a)
30. Refresh every 30 days; re-scout early on a new domain above 10% impression share, a one-third change in a top-3 competitor's creative count, a seasonal boundary, or a trademark complaint. (c)
31. Date every file with the scout date and the live-window dates; findings without a window are unusable next month. (c)
32. Write "no ads found" only with the method, the region setting and the date beside it. (b)
33. Never label a hand search as data in the file; only Ad Preview, SERP API captures and Center pulls are countable. (a) 148778

---

## Sources (78)

Google documentation and primary texts

1. Google Ads Help, About the Auction Insights report - support.google.com/google-ads/answer/2579754
2. Google Ads Help, About impression share - support.google.com/google-ads/answer/2497703
3. Google Ads Help, Ad Preview and Diagnosis tool - support.google.com/google-ads/answer/148778
4. Google Ads Help, Location targeting options - support.google.com/google-ads/answer/1722043
5. Google Ads Help, Ad scheduling - support.google.com/google-ads/answer/2404244
6. Google Ads Help, Responsive search ads - support.google.com/google-ads/answer/7684791
7. Google Ads Help, Sitelink assets - support.google.com/google-ads/answer/2375416
8. Google Ads Help, Call assets - support.google.com/google-ads/answer/2453991
9. Google Ads Help, Ad strength - support.google.com/google-ads/answer/9142254
10. Google Ads Help, Quality Score and landing page experience - support.google.com/google-ads/answer/2404197
11. Google Ads Help, 5 ways to use Quality Score - support.google.com/google-ads/answer/6167130
12. Google Ads policy, Ads transparency - support.google.com/adspolicy/answer/13733850
13. Google Ads policy, Advertiser verification - support.google.com/adspolicy/answer/9703665
14. Google Ads policy, Timelines for advertiser verification - support.google.com/adspolicy/answer/15588490
15. Google Ads policy, Trademarks - support.google.com/adspolicy/answer/6118
16. Google Ads policy, Trademark complaints - support.google.com/adspolicy/answer/2562124
17. Google Ads policy, Misrepresentation - support.google.com/adspolicy/answer/6020955
18. Google Ads policy, Editorial - support.google.com/adspolicy/answer/6021546
19. Google Ads policy, Destination requirements - support.google.com/adspolicy/answer/6368661
20. Google Ads policy, Political content - support.google.com/adspolicy/answer/6014595
21. Google Ads policy, Verification and transparency topic index - support.google.com/adspolicy/topic/9646742
22. Google Ads policy change log 2024 - support.google.com/adspolicy/topic/16090031
23. Google Ads policy change log 2025 - support.google.com/adspolicy/topic/16083443
24. Google Ads policy change log 2026 - support.google.com/adspolicy/topic/16794025
25. Google Ads policy, Update to Ads Transparency policy, 30 April 2025 - support.google.com/adspolicy/answer/16189141
26. Google Ads policy, Advertiser verification update, 21 January 2025 - support.google.com/adspolicy/answer/15576964
27. Google Ads policy, Advertiser verification update, 7 June 2024 - support.google.com/adspolicy/answer/14875612
28. Google Ads policy, Political content update Chile, 6 October 2025 - support.google.com/adspolicy/answer/16522620 and 16630040
29. Google Ads policy, Political content update New Zealand, 10 August 2026 - support.google.com/adspolicy/answer/17369892
30. Google Terms of Service - policies.google.com/terms
31. Google Search Help, How Google determines location - support.google.com/websearch/answer/179386
32. google.com/robots.txt (read 28 August 2026)
33. adstransparency.google.com/robots.txt (404, read 28 August 2026)
34. adstransparency.google.com and /political (JS shell only through a plain fetch)
35. Google Ads API, segments.proto v25 (auction_insight_domain) - github.com/googleapis/googleapis
36. Google Ads API, metrics.proto v25 (six auction_insight metrics) - github.com/googleapis/googleapis
37. Google Ads Scripts, Reports feature page - developers.google.com/google-ads/scripts/docs/features/reports
38. Google Europe blog, Complying with the Digital Services Act, August 2023 - blog.google
39. DSA Article 39 text - eu-digital-services-act.com
40. US Copyright Office, Circular 33, Works Not Protected by Copyright, revised March 2021
41. FTC, In the Matter of 1-800 Contacts, case page (2016 complaint, 2021 Second Circuit)

Vendor documentation and first-hand runs

42. Apify, solidcode/ads-transparency-scraper
43. Apify, scrapesage/google-ads-transparency-scraper
44. Apify, xtech/google-ad-transparency-scraper
45. Apify, automation-lab/google-ads-scraper
46. Apify, apify/google-search-scraper
47. Apify Store index (64,000+ actors, $5 monthly free credit)
48. GitHub, ducnhd/apify-actor-ads-transparency README, measured 6 August 2026 (429 after ~25 requests per IP)
49. GitHub, github/awesome-copilot competitor-ad-intelligence SKILL.md (GooseWorks, 2026)
50. Semrush MCP, paid_search_research report list and schemas (first-hand, 28 August 2026)
51. Semrush MCP, resource_adwords_unique and domain_adwords_historical runs for antaplumbing.com, rotorooter.ca, mrrooter.ca in the CA database (first-hand, 28 August 2026)
52. Semrush, Advertising Research feature page
53. SpyFu, More PPC Data, 16 January 2026
54. SpyFu, Turn SpyFu's PPC Tools into True Market Intelligence, 19 February 2026
55. SpyFu, SpyFu vs Semrush PPC showdown, 4 February 2026
56. SpyFu, PPC Competitor Analysis, 10 June 2025
57. SpyFu, 14 Best Competitor Analysis Tools, 27 May 2026
58. TapClicks, iSpionage shutdown notice (closed 9 July 2025)
59. SerpApi, Google Ad Results API
60. DataForSEO, Google SERP API pricing and geo-targeting
61. Adthena, resources index (brand protection, market exposure)

Trade press, studies and practitioner guides

62. Search Engine Journal, Google Ads Transparency Center launch, March 2023
63. TechCrunch, Google launches Ads Transparency Center, 29 March 2023
64. Search Engine Journal, Google Ads requires disclosure for AI-generated content, 13 July 2026
65. Search Engine Roundtable, google.com/goto tracking parameters confirmed, 26 August 2026
66. PPC Land, The week AI agents got the ad account, 28 August 2026
67. Search Engine Land, Google Ads verification badges, 27 March 2023
68. Optmyzr, Google RSA performance study, about 20,000 accounts, 6 April 2026
69. Adalysis, Use your Auction Insights data to differentiate your ads
70. Adalysis, Finding competitive data insights using the Auction Insights report
71. Adalysis, Auction Insights Data Studio template, 11 June 2019
72. LocaliQ, Search advertising benchmarks 2026
73. Unbounce, Conversion Benchmark Report 2024
74. Unbounce, Landing page best practices
75. Contentsquare (formerly Hotjar), Landing page optimization guide
76. Nielsen Norman Group, Trustworthy design
77. HubSpot, Competitive analysis kit (cadence and triggers)
78. Apify blog, Is web scraping legal (hiQ, Meta v Bright Data, DSM Directive, GDPR)

Encyclopaedic references used for legal history

- Wikipedia: hiQ Labs v. LinkedIn; Bright Data (Meta 2024, X 2024); Web scraping legal issues; Keyword advertising; 1-800 Contacts, Inc. v. Lens.com, Inc.; Digital Services Act; Directive on Copyright in the Digital Single Market; Google Ads (trademark history)

Could not be reached on 28 August 2026 and are not cited: Search Engine Land articles (403), WordStream (403), Reddit r/PPC (blocked), Optmyzr blog posts on Auction Insights (404), Semrush KB advertising articles (404), Karooya, Klientboost, Lunio, Neil Patel and Instapage competitor-bidding posts (404), CXL (403), Ahrefs accuracy posts (404), Google's EU political-ads blog post (404), the CJEU and Interflora Wikipedia pages (404), DuckDuckGo and Bing result pages (captcha or junk).
