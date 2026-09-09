# Research dossier - trust signals and proof for local-service Google Ads and landing pages
Built 2026-08-28 · 92 sources · 9 finding areas · 11 myths · 33 rules for `/context-layer`
Next: merge the graded rules into `references/proof-signals-playbook.md` (draft at `ref-proof-signals-playbook.md`).

**Grading used everywhere in this file**
- (a) official - a regulator, a statute, or the platform's own help page
- (b) stated-sample - a study or survey that names its sample and year
- (c) practitioner - a vendor, agency, law-firm or trade-press write-up, with numbers where they gave them

**How this was researched.** WebSearch was unavailable. Sources came from Google's and the regulators' own pages by known URL, Google News RSS as the search index, and direct fetches. Every URL below was opened and read on 28 August 2026 unless marked "title only". Pages that were 403 or 404 on the day are not listed.

---

## The sources (92)

### Google Ads policy - official (a)

1. Google Ads Misrepresentation policy (parent) · https://support.google.com/adspolicy/answer/6020955 · 2026 · lists the ten sub-policies: unreliable claims, unclear relevance, unavailable offers, dishonest pricing, misleading representation and more
2. Google Ads Unreliable claims · https://support.google.com/adspolicy/answer/15936857 · 2026 · "claims that entice the user with an improbable result (even if this result is possible)" banned; testimonials implying typical results need "links to third-party verification or... relevant and noticeable disclaimers"; testimonials guaranteeing results need "a visible disclaimer stating that there is no guarantee of specific results"
3. Google Ads Dishonest pricing practices · https://support.google.com/adspolicy/answer/15938375 · 2026 · total price incl. fees must be disclosed; "free" trials must state the period and the auto-charge; pricing must be on the landing page in plain language
4. Google Ads Unavailable offers · https://support.google.com/adspolicy/answer/15937063 · 2026 · any offer, price or deal in the ad must be "easily found from the destination"
5. Google Ads Misleading representation · https://support.google.com/adspolicy/answer/15936666 · 2026 · names "an unlicensed home contractor claiming to be a licensed provider" as a violation; implied endorsements without consent banned
6. Google Ads Editorial policy · https://support.google.com/adspolicy/answer/6021546 · 2026 · no dedicated superlatives clause any more; punctuation, capitalisation, unidentified business rules
7. Google Ads Trademarks · https://support.google.com/adspolicy/answer/6118 · 2026 · a direct competitor's trademark in ad text is restricted on complaint
8. Google Ads Healthcare and medicines · https://support.google.com/adspolicy/answer/176031 · 2026 · local health advertisers must follow local law; certification for many categories
9. Google Ads Advertiser verification · https://support.google.com/adspolicy/answer/9703665 · 2026 · "all advertisers will eventually be required to complete advertiser verification"; verified name and location show in the ad and in the Transparency Center
10. Google Ads store (seller) ratings · https://support.google.com/google-ads/answer/2375474 · 2026 · needs about 100 eligible reviews in 24 months and 3.5 stars; Google's own claim is "on average drive a 2% improvement in click through rate"

### Local Services Ads and Business Profile - official (a)

11. LSA About ad rankings · https://support.google.com/localservices/answer/7527305 · 2026 · ranking = bid plus "how likely your ad is to result in a lead", which includes responsiveness ("missed calls may negatively affect"), search context, relevance of services and bio
12. LSA Improve your performance · https://support.google.com/localservices/answer/12492201 · 2026 · "We recommend 5 or more reviews"; average message response time may be displayed in the ad; photos help
13. LSA Reviews and ratings for providers · https://support.google.com/localservices/answer/6242661 · 2026 · reviews now governed by the Maps user-contributed content policy; providers "prohibited from offering consumers compensation in return for their reviews"
14. LSA How providers qualify · https://support.google.com/localservices/answer/6230381 · 2026 · licence, insurance and background checks; "serious or repeatedly negative customer feedback may result in lower rankings"; GBP must be linked and verified in select regions
15. LSA and GBP business details · https://support.google.com/localservices/answer/15683105 · 2026 · name, address and location type sync one way from a verified GBP into LSA
16. LSA Google Verified badge · https://support.google.com/localservices/answer/16498018 · 2026 · one badge replaces Google Guaranteed and Google Screened; "Google will be discontinuing the Money Back Guarantee"; reimbursement only for services booked before 7 December 2025
17. LSA overview · https://support.google.com/localservices/answer/6224841 · 2026 · pre-badge ads exist; Google Verified badge unavailable in auto, beauty, dining
18. LSA Canada screening · https://support.google.com/localservices/answer/12174778 · 2026 · province-level licence checks, insurance, background checks; 3 to 4 weeks
19. GBP attributes · https://support.google.com/business/answer/9049526 · 2026 · identity attributes: women-, veteran-, Black-, LGBTQ+, Asian-, Latino-, disabled-, Indigenous-owned, small business; "attributes show up on your Business Profile on Search, Maps"
20. GBP business guidelines · https://support.google.com/business/answer/3038177 · 2026 · no taglines, hours or service words in the business name
21. GBP get and reply to reviews · https://support.google.com/business/answer/7035772 · 2026 · incentives for reviews "strictly prohibited"; review link and QR code are the sanctioned ask; "a mix of positive and negative feedback often feels more trustworthy"
22. GBP prohibited and restricted content · https://support.google.com/business/answer/2622994 · 2026 · conflict-of-interest reviews (current or former employment) banned; no pressuring on premises
23. Maps user-contributed content policy · https://support.google.com/contributionpolicy/answer/7400114 · updated April 2026 · adds bans on "staff solicit a certain number of reviews" and reviews "that identify a staff member"
24. Google blog, "New ways we're protecting businesses on Maps" · https://blog.google/products-and-platforms/products/maps/new-ways-were-protecting-businesses-on-maps/ · 16 April 2026 · 292 million policy-violating reviews blocked or removed in 2025, 13 million fake profiles, 782,000 accounts restricted; review-extortion detection

### Review APIs and scrapers - official (a) and practitioner (c)

25. Places API (legacy) Place Details · https://developers.google.com/maps/documentation/places/web-service/legacy/details · (a) · "A JSON array of up to five reviews"
26. Yelp Fusion Reviews endpoint · https://docs.developer.yelp.com/reference/v3_business_reviews · (a) · "returns up to three review excerpts"
27. Apify `compass/google-maps-reviews-scraper` · https://apify.com/compass/google-maps-reviews-scraper · (c) · $0.30 per 1,000 reviews; returns owner response text and date; ~54,000 users, 99.6% success
28. Apify `compass/crawler-google-places` · https://apify.com/compass/crawler-google-places · (c) · from $1.50 per 1,000 places; reviewsCount, totalScore, reviewsDistribution, additionalInfo, peopleAlsoSearch; ~580,000 users
29. Apify `conceivable_extension/multi-platform-review-scraper` · https://apify.com/conceivable_extension/multi-platform-review-scraper · (c) · 10 total users, 0 ratings, README says "this actor had never actually been run live before this addend[um]"; it is a wrapper calling compass, tri_angle, maxcopell and memo23 actors
30. Apify store search "yelp reviews" · https://apify.com/store?search=yelp%20reviews · (c) · `tri_angle/yelp-scraper` 6,900 users; no BBB, HomeStars, Houzz or Angi actor listed

### FTC and US law - official (a) and law-firm (c)

31. FTC press release, final rule banning fake reviews · https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials · 14 August 2024 · (a) · bans fake or AI-generated reviews, incentives conditioned on sentiment, undisclosed insider reviews, company-controlled review sites, review suppression, fake social-media indicators; effective 60 days after Federal Register publication (21 October 2024)
32. FTC Endorsement Guides, "What people are asking" · https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking · 2023 revision · (a) · "Statements like 'Results not typical' or 'Individual results may vary' won't change that interpretation"; either prove the result is typical or disclose the generally expected result
33. FTC Policy Statement on Advertising Substantiation · https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation · 1983 · (a) · advertisers must "have a reasonable basis for advertising claims before they are disseminated"
34. FTC, Featuring online customer reviews: a guide for platforms · https://www.ftc.gov/business-guidance/resources/featuring-online-customer-reviews-guide-platforms · (a) · "Don't ask for reviews only from people you think will leave positive ones"; incentives must not be conditioned "explicitly or implicitly" on positivity
35. National Law Review, "Fifteen things advertisers need to know about the FTC's Consumer Reviews and Testimonials Rule" · https://natlawreview.com/article/what-are-fifteen-things-advertisers-need-know-about-ftcs-consumer-reviews-and · 17 November 2025 · (c) · effective 21 October 2024; agencies and reputation firms are liable; "Tell us how much you loved..." implies sentiment and violates; insider disclosure must be inside the review
36. Crowell and Moring, first Consumer Review Rule warning letters · https://www.crowell.com/en/insights/client-alerts/keeping-it-real-ftc-targets-fake-reviews-in-first-consumer-review-rule · 24 December 2025 · (c) · 10 warning letters on 22 December 2025; penalty up to $53,088 per violation
37. Regulatory Oversight, FTC warns companies · https://www.regulatoryoversight.com/2026/01/ftc-warns-companies-over-deceptive-online-review-practices/ · 30 January 2026 · (c) · practices flagged include incentives for positive-only reviews and employee reviews without disclosure
38. LawFuel, Google reviews under active FTC enforcement · https://www.lawfuel.com/what-google-reviews-for-businesses-look-like-under-active-ftc-enforcement/ · 28 April 2026 · (c) · review gating listed as prohibited; LendingClub $18M (2022) for suppressing negatives

### Canada - official (a) and law-firm (c)

39. Competition Act s.74.01 · https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html · (a) · a performance, efficacy or life claim "not based on an adequate and proper test thereof, the proof of which lies on the person making the representation" is reviewable
40. Competition Act s.74.1 · https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.1.html · (a) · corporations: greater of $10,000,000 ($15,000,000 subsequent), three times the benefit, or 3% of annual worldwide gross revenues; individuals $750,000
41. BLG, Bill C-59 changes · https://www.blg.com/en/insights/2024/07/false-advertising-and-greenwashing-bill-c-59-changes-to-competition-act · July 2024 · (c) · testing must be done before the claim is made; private access to the Tribunal from 20 June 2025
42. Financier Worldwide, private enforcement shift · https://www.financierworldwide.com/the-strategic-shift-in-private-enforcement-of-canadas-competition-laws · July 2025 · (c) · private parties can seek leave for s.74.01 deceptive marketing from 20 June 2025
43. Ad Standards Canada, Canadian Code of Advertising Standards · https://adstandards.ca/code/the-code-online/ · (a) · Clause 7: testimonials "must reflect the genuine, reasonably current opinion"; Clause 1: advertiser must substantiate on request
44. Competition Bureau warning on employee-posted reviews · reported by Canadian Lawyer and Global News, 19 to 24 January 2024 · (c, title only via Google News RSS; the Bureau page and both articles were unreachable on the day) · businesses liable for reviews their employees post

### UK, Australia, EU - official (a) and law-firm (c)

45. GOV.UK, new consumer protection regime in force · https://www.gov.uk/government/news/cma-to-boost-consumer-and-business-confidence-as-new-consumer-protection-regime-comes-into-force · 7 April 2025 · (a) · DMCC Act 2024 adds fake reviews to the banned list; fines up to 10% of global turnover
46. GOV.UK, five businesses under CMA investigation for reviews · https://www.gov.uk/government/news/fake-and-misleading-reviews-5-businesses-under-cma-investigation · 27 March 2026 · (a) · undisclosed discounts for five-star reviews, staff-written reviews, suppressed one-star reviews all named
47. Reed Smith, the truth about fake reviews · https://www.reedsmith.com/en/perspectives/2025/08/the-truth-about-fake-reviews-what-businesses-need-to-know · August 2025 · (c) · "Incentives aren't forbidden, but hiding them is"; grace period ended 6 July 2025
48. ASA/CAP, Testimonials and endorsements · https://www.asa.org.uk/advice-online/testimonials-and-endorsements.html · updated 31 July 2026 · (a) · CAP 3.47: hold documentary evidence and contact details; 3.50: consent; unverifiable email alone is insufficient evidence
49. ACCC, Managing online reviews · https://www.accc.gov.au/business/advertising-and-promotions/managing-online-reviews · (a) · incentives must apply regardless of sentiment and be disclosed; Service Seeking $600,000, HealthEngine $2.9M
50. ACCC, Fines and penalties · https://www.accc.gov.au/business/business-rights-responsibilities/fines-penalties · (a) · from 28 March 2026 the maximum for a corporation is the greater of $100,000,000, three times the benefit, or 30% of adjusted turnover
51. ACCC, PhotobookShop pays penalties · https://www.accc.gov.au/media-release/photobookshop-pays-penalties-for-influencer-reviews · 24 March 2026 · (a) · $39,600 for telling 107 influencers not to disclose gifted product; editing a negative comment out of a review video
52. SmartCompany, Hismile fined $138,600 · https://www.smartcompany.com.au/marketing/hismile-fined-138600-social-videos-staff-posed-random-shoppers/ · 15 June 2026 · (c) · employees posing as random shoppers in testimonial videos
53. Lexology, fake and misleading reviews: the global crackdown · 31 March 2026 · (c, title only, paywalled) · cross-jurisdiction round-up

### Lift data - stated-sample (b)

54. BrightLocal Local Consumer Review Survey 2026 · https://www.brightlocal.com/research/local-consumer-review-survey/ · 1,002 US adults · (b) · 97% read local reviews; 68% require 4 stars, 31% require 4.5+; 74% want a review from the last three months, 44% the last month; 47% will not use a business with under 20 reviews; 80% likely to use a business that responds to all reviews, 42% unlikely if it ignores them; 45% now use ChatGPT or AI tools to find reviews (6% in 2025); 71% use Google (83% in 2025)
55. BrightLocal Local Consumer Review Survey 2025 · https://www.brightlocal.com/research/local-consumer-review-survey-2025/ · 1,026 US adults · (b) · 63% expect a reply within two to seven days; recency and volume expectations softened in 2025 then hardened again in 2026
56. BrightLocal Google Reviews Study 2018 · https://www.brightlocal.com/research/google-reviews-study/ · 93,845 businesses · (b) · average 39 reviews, 4.42 stars; top-3 map pack averages 47 reviews vs 38 for positions 7 to 10
57. Whitespark Local Search Ranking Factors 2026 · https://whitespark.ca/local-search-ranking-factors/ · expert survey · (b) · review signals about 20 to 25% of pack ranking; high Google rating #6, quantity of text reviews #9, recency #11, sustained influx #14, keywords in reviews #36
58. Localogy on Local Falcon whitepaper · https://www.localogy.com/2026/02/google-review-competition-varies-by-industry/ · 50 million+ US local results · 2 February 2026 · (b) · "enough" reviews is set by competition density and location, not a universal number
59. Spiegel Research Center, how online reviews influence sales · https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/ · 2017 · (b) · five reviews lifts purchase likelihood 270%; purchase probability peaks at 4.0 to 4.7 stars and falls near 5.0; verified-buyer badge +15%
60. Proserpio and Zervas, Marketing Science 36(5) · https://pubsonline.informs.org/doi/10.1287/mksc.2017.1043 · 2017 · (b) · hotels that respond to reviews gain 0.12 stars and 12% more reviews
61. ReviewTrackers Online Reviews Survey · https://www.reviewtrackers.com/reports/online-reviews-survey/ · 48,000+ locations · January 2022 · (b) · purchases most influenced at 4.2 to 4.5 stars; 53% expect a reply to a negative review within a week; 45% more likely to visit a business that replies to negatives
62. Nielsen Norman Group, scrolling and attention · https://www.nngroup.com/articles/scrolling-and-attention/ · 120 participants, 130,000 fixations · 2018 · (b) · 57% of viewing time above the fold, 74% in the first two screens
63. Nielsen Norman Group, trustworthiness in web design · https://www.nngroup.com/articles/trustworthy-design/ · 2016 · (b) · four factors: design quality, up-front disclosure, comprehensive current content, connected to the rest of the web (review sites, third parties)
64. Stanford Web Credibility guidelines · https://credibility.stanford.edu/guidelines/index.html · 4,500 people over three years · (b) · make it easy to verify, show a real organisation (physical address), highlight expertise, show honest people behind the site
65. Baymard, perceived security of payment forms · https://baymard.com/blog/perceived-security-of-payment-form · 1,026 respondents (2025 wave) · (b) · 19% abandoned for not trusting the site with card details; recognised seals beat obscure ones; even a homemade seal raised perceived security
66. VWO, 160 Driving Academy · https://vwo.com/blog/stock-image-or-real-image · circa 2019 · (b) · real student photo vs stock: +161% form completions at 98% confidence
67. VWO, WikiJob · https://vwo.com/success-stories/wikijob/ · circa 2019 · (b) · three lines of understated testimonials moved higher on the page: +34% purchases
68. Unbounce Conversion Benchmark Report 2024 · https://unbounce.com/conversion-benchmark-report/ · 41,000 pages, 464M visitors · (b) · pages written at grade 5 to 7 convert at 11.1%, 56% higher than grade 8 to 9; word count and reading time correlate negatively
69. Wyzowl Video Marketing Statistics 2025 · https://www.wyzowl.com/video-marketing-statistics/ · 266 respondents · (b) · 85% say a video convinced them to buy; no "80% conversion lift from video testimonials" figure exists in the report
70. Search Engine Journal, Google Maps upgrade against fake reviews · https://www.searchenginejournal.com/google-maps-gets-an-upgrade-to-combat-fake-reviews/ · 7 April 2025 · (b, Google-reported) · 240M+ violating reviews removed in 2024, 12M+ fake profiles

### Practitioner and trade press (c)

71. PPC Land, Google tightens Maps review policy · https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/ · 17 April 2026 · staff quotas and staff-name requests now explicit violations
72. PPC Land, Maps asks users if businesses paid for reviews · https://ppc.land/google-maps-is-now-asking-users-if-businesses-paid-for-their-reviews/ · 5 June 2026 · "Does this business offer rewards in exchange for reviews?" prompt since about September 2025; retroactive deletions of year-old reviews
73. PPC Land, LSA folds into Google Ads · https://ppc.land/google-folds-local-services-ads-into-google-ads-cuts-historical-reports/ · 20 July 2026 · Performance Max pay-per-lead; BBB callouts retired; review management moved to GBP in July 2025; US home services from August 2026, non-US 2027
74. Search Engine Journal, LSA into Google Ads · https://www.searchenginejournal.com/google-is-bringing-local-services-ads-into-google-ads/ · 20 July 2026 · reports do not transfer; business details sync from GBP
75. PPC Land, missed calls charged · https://ppc.land/google-charges-local-services-advertisers-for-missed-calls-over-20-seconds/ · 25 August 2026 · from 1 October 2026 a missed call over 20 seconds in business hours is a billed lead
76. Social Media Examiner, Ads Transparency Center for competitor research · https://www.socialmediaexaminer.com/how-to-research-your-competition-with-google-ads-transparency-center/ · 25 July 2023 · shows creatives, formats, regions, date ranges; no spend, no keywords, unverified advertisers absent
77. Influencer Marketing Hub, Meta and Google ad libraries · https://influencermarketinghub.com/meta-google-ads-libraries/ · 4 November 2025 · payer-name field since May 2025; expired campaigns disappear
78. Semrush, competitor ad spend · https://www.semrush.com/blog/competitor-ad-spend/ · 1 July 2026 · Advertising Research gives keyword-level ad copy and estimated traffic cost; estimates only
79. BrightLocal, Google Local Services Ads guide · https://www.brightlocal.com/learn/google-local-services-ads/ · 18 January 2024 · Google Guaranteed capped reimbursement at $2,000 lifetime (now discontinued, see 16)
80. ReplyOnTheFly, how many Google reviews do you need · https://www.replyonthefly.com/blog/how-many-google-reviews-do-you-need · updated 19 August 2026 · home services average 20 to 60 reviews, 10+ minimum; suggests 2 to 5 new reviews a month
81. Search Engine Journal, 18 online review statistics · https://www.searchenginejournal.com/online-review-statistics/ · 7 November 2024 · Podium: 3.4 stars is the minimum acceptable; 56% changed their view after a business response
82. Flint, landing page trust signal statistics · https://www.flint.com/articles/landing-page-trust-signal-conversion-statistics · 2026 · round-up; most figures unsourced (see myths)
83. ProveSrc, social proof statistics · https://provesrc.com/blog/social-proof-statistics/ · 2026 · round-up; "video testimonials up to 80%", "customer photos +35%", "92% hesitate" carry no named study
84. Psychotactics, Six questions to get outstanding testimonials · https://www.psychotactics.com/six-questions-testimonials/ · Sean D'Souza · the objection-first interview: "What was the obstacle or hesitation that would have prevented you from buying?" then the result, the feature, three other benefits, would you recommend and why, anything to add
85. The Mom Test · https://www.momtestbook.com/ · Rob Fitzpatrick · ask about specific past behaviour, not opinions or hypotheticals; everyone tells you what you want to hear
86. BBB, Get accredited · https://www.bbb.org/get-accredited · 2026 · six months in business, annual dues; no trust-lift data published
87. Conversion Sciences, risk reversal · https://conversionsciences.com/eliminate-risk-and-bump-your-lead-conversion-rate/ · practitioner guide, no test numbers
88. Localogy / Search Engine Land 2026 local sprints (already cited in competitor-proof-audit.md) · retained as (c)

### Licence-in-advertising statutes - official (a)

89. California Business and Professions Code 7030.5 · https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7030.5 · licence number "in all forms of advertising"
90. Florida Statutes 489.119(5)(b) · http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0489/Sections/0489.119.html · number "in each offer of services, business proposal, bid, contract, or advertisement, regardless of medium"; vehicles too
91. Washington RCW 18.27.100 · https://app.leg.wa.gov/rcw/default.aspx?cite=18.27.100 · "All advertising that shows the contractor's name or address shall show the contractor's current registration number"
92. Arizona ARS 32-1124 · https://www.azleg.gov/ars/32/01124.htm · number on all published, broadcast, internet and billboard advertising, unless the ad links to a site that prominently shows name and number; plus Ontario ESA, "Finding the right contractor" · https://esasafe.com/contractors/licensing/advertising-requirements/ · the 7-digit ECRA/ESA number "appears on their vehicles, business cards and estimates"

---

## Findings by area

### 1. What lifts clicks and conversions, with the sample

**Reviews on the page and in the profile**
- (b) Five reviews lifts purchase likelihood 270% over none; the marginal gain flattens after five (Spiegel 2017, #59)
- (b) Purchase probability peaks at 4.0 to 4.7 stars and drops toward 5.0 (Spiegel 2017); purchases most influenced at 4.2 to 4.5 (ReviewTrackers 2022, #61)
- (b) 68% of consumers require at least 4 stars, 31% require 4.5 or better, 10% only accept 5.0 (BrightLocal 2026, #54)
- (b) 47% will not use a business with fewer than 20 reviews (BrightLocal 2026)
- (b) Top-3 pack listings average 47 reviews vs 38 for positions 7 to 10 (BrightLocal 2018, #56); the only benchmark that transfers is the current top 3 in that city (Local Falcon 2026, #58)
- (a) Google's own seller-rating claim is a 2% CTR improvement, not the "up to 10%" of older blog posts (#10)
- (a) LSA needs 5 or more reviews to show reliably (#12)

**Recency and velocity**
- (b) 74% want a review from the last three months, 44% from the last month (BrightLocal 2026)
- (b) Recency is the #11 pack ranking factor and "sustained influx" is #14 in the 2026 expert survey; review signals are about a fifth of pack ranking and rose again this year (Whitespark 2026, #57)
- (c) Velocity targets in the trade press range from 2 to 5 a month (ReplyOnTheFly 2026, #80) to 8 to 10 a month (competitor-proof-audit.md). Neither is measured. The defensible rule is "match or beat the top 3's monthly rate"

**Owner responses**
- (b) Businesses that respond earn 0.12 stars more and 12% more reviews (Marketing Science 2017, #60)
- (b) 80% are likely to use a business that responds to all reviews; 42% unlikely to use one that ignores them; 50% put off by templated replies; 81% expect a reply within a week (BrightLocal 2026)
- (b) 45% more likely to visit a business that replies to negative reviews (ReviewTrackers 2022)
- (a) Google itself says "a mix of positive and negative feedback often feels more trustworthy" and recommends replying (#21)

**Photos, video, testimonials on the landing page**
- (b) Real student photo vs stock: +161% form completions (VWO, #66)
- (b) Three understated testimonial lines moved higher on the page: +34% purchases (VWO WikiJob, #67)
- (b) 85% of people say a video convinced them to buy (Wyzowl 2025, #69). No study gives a conversion lift for video testimonials specifically
- (b) Pages at grade 5 to 7 reading level convert 56% better than grade 8 to 9 (Unbounce 2024, #68) - plain customer language beats polished copy

**Badges, seals, credentials**
- (b) Recognised seals raise perceived security more than obscure ones; the visual cue matters more than the technical guarantee (Baymard, #65)
- (b) "Make it easy to verify" and "show a real organisation with a physical address" are the top two credibility guidelines from 4,500 people (Stanford, #64)
- (a) Google names "an unlicensed home contractor claiming to be a licensed provider" as a policy violation (#5), so licence claims must be true and checkable
- (c) No public test isolates "family owned", "years in business" or "background-checked" as ad-copy variables. They are supported indirectly: identity attributes surface on Maps (#19), and small-business trust surveys, but treat any lift number as a guess

**Guarantees and response-time promises**
- (a) Google discontinued the LSA money-back guarantee (claims cutoff 7 December 2025, #16), so "Google Guaranteed" can no longer be the guarantee on the page
- (a) LSA can display the average message response time in the ad, and "quick response times can drive greater consumer engagement" (#12)
- (a) From 1 October 2026 a missed call over 20 seconds is a billed lead (#75), so a response-time promise now has a cost behind it
- (c) No clean public A/B test on guarantees for local services was found. The playbook's "claim rates under 5 to 10%" line stays practitioner-grade

### 2. Google Ads policy on claims

- (a) Superlatives and results: the current rule is "Unreliable claims" (#2). It does not use the word "superlative" any more. The operative tests are: no improbable result presented as the likely outcome; testimonials implying typical results need a link to third-party verification or a noticeable disclaimer; testimonials guaranteeing results need a visible "no guarantee, results vary" disclaimer
- (a) Pricing: total price including fees, the billing model, and "free" trial terms must be disclosed, and pricing must be on the landing page (#3)
- (a) Offers: any price, deal or CTA in the ad must be easily found on the destination (#4)
- (a) Identity: no implied endorsement, no claiming a licence you do not hold, business name must clearly represent the business (#5)
- (a) Competitor names: a direct competitor's trademark in ad text is restricted on complaint (#7)
- (a) Health trades: local law compliance is the advertiser's job and many categories need certification (#8)
- (a) Verification: the verified legal name and location show in the ad and in the Transparency Center; false verification info suspends the account (#9)
- (a) Seller ratings need about 100 eligible reviews in 24 months from Google Customer Reviews or a listed partner and a 3.5 minimum (#10)

### 3. Fake-review and testimonial law by country

**United States**
- (a) 16 CFR Part 465, effective 21 October 2024 (#31, #35). Bans: fake or AI-generated reviews; buying reviews with a required sentiment; insider reviews without a clear disclosure inside the review; company-controlled sites posing as independent; suppressing reviews by threat or by hiding negatives while claiming completeness; fake followers
- (c) Civil penalty per violation: $51,744 at adoption, adjusted to $53,088 in January 2025 (#36, #37). Agencies and reputation firms carry liability (#35)
- (a) Endorsement Guides: a result in a testimonial is read as typical unless you either prove it is typical or state what people generally get; "results not typical" does not fix it (#32)
- (a) Substantiation: a reasonable basis must exist before the claim runs (#33)
- (a) Review solicitation: ask everyone, not only likely-positive customers; an incentive cannot be conditioned on positivity even implicitly (#34); "Tell us how much you loved it" is an implicit condition (#35)
- (c) Enforcement is live: 10 warning letters on 22 December 2025 (#36); review gating and undisclosed employee reviews are on the list (#37, #38)

**Canada**
- (a) s.74.01(1)(a) false or misleading representation; (1)(b) any performance, efficacy or life claim must rest on "an adequate and proper test", proof on the advertiser, done before the claim (#39, #41)
- (a) Penalties: corporations the greater of $10M ($15M repeat), three times the benefit, or 3% of worldwide gross revenue; individuals $750,000 (#40)
- (c) Private parties can bring deceptive-marketing cases at the Tribunal from 20 June 2025 (#41, #42)
- (a) Ad Standards Code Clause 7: testimonials must reflect a genuine and reasonably current opinion (#43)
- (c) The Bureau warned in January 2024 that businesses are liable for reviews employees post (#44)

**United Kingdom**
- (a) DMCC Act 2024 in force 6 to 7 April 2025: fake reviews and concealed incentivised reviews are automatically unfair; fines up to 10% of global turnover (#45); grace period ended 6 July 2025 (#47)
- (a) March 2026 investigations name discounts-for-five-stars, staff-written reviews and hidden one-star reviews (#46)
- (a) CAP 3.47 to 3.50: hold documentary evidence, contact details and consent for every testimonial (#48)

**Australia**
- (a) Incentives must be given regardless of sentiment and disclosed (#49); maximum penalty for a corporation from 28 March 2026 is the greater of $100M, three times the benefit or 30% of adjusted turnover (#50)
- (a) PhotobookShop $39,600 for undisclosed gifted-product reviews and editing a negative out of a video (24 March 2026, #51); Hismile $138,600 for staff posing as random shoppers (June 2026, #52)

**EU** - the Omnibus Directive (2019/2161, applied from May 2022) bans claiming reviews are from real buyers without reasonable checks and bans submitting or commissioning fake reviews. EUR-Lex was unreachable on the day; treat as (c) until the annex is read

### 4. Which review platforms matter for LSA and Ads

- (a) LSA reviews are Google reviews, governed by the Maps content policy (#13), managed in GBP since July 2025 (#73), and the profile must be a verified GBP that the LSA account manager also owns or manages (#14, #15)
- (a) Ranking is bid plus lead likelihood: responsiveness, search context, relevance of services and bio (#11). Negative feedback "may result in lower rankings" (#14)
- (a) Seller ratings in Search ads come from Google Customer Reviews and listed partners (Trustpilot, Feefo and others), never from Yelp or BBB (#10)
- (c) BBB callouts are retired when LSA moves into Google Ads (August 2026 onward, #73), so BBB is a landing-page signal only
- (b) Where buyers look: Google 71%, AI tools 45%, Apple Maps 27% (BrightLocal 2026). AI answers are built from the review corpus, so the same reviews now feed two channels

### 5. Scraping and verifying proof

- (a) Google's API returns five reviews, Yelp's returns three (#25, #26). Full corpus needs a scraper
- (c) `compass/google-maps-reviews-scraper` is the tested Google route, $0.30 per 1,000 reviews, with owner responses and dates (#27). `compass/crawler-google-places` returns the whole pack with counts, distribution and peopleAlsoSearch (#28)
- (c) The multi-platform wrapper the playbook calls "verified" has 10 users, no ratings and a README admitting it had never been run live (#29). Call the underlying actors directly
- (c) Yelp: `tri_angle/yelp-scraper` (6,900 users). No tested actor exists for BBB, HomeStars, Houzz or Angi; use `apify/website-content-crawler` on the profile URL (#30)
- (a) Licence lookups are per jurisdiction. California, Florida, Washington and Arizona require the number in every ad (#89 to #92); Ontario's ECRA/ESA number appears on vehicles, cards and estimates, and there is a public lookup
- Rule that follows from #33, #39 and #48: a scraped figure is a claim, not proof. It is UNCONFIRMED until the owner confirms it and the substantiation exists

### 6. Interview technique for extracting proof

- (c) Objection-first ordering pulls specific results: obstacle, then result, then the feature, then three other benefits, then recommend-and-why (#84)
- (c) Ask about specific past behaviour and numbers, never opinions or hypotheticals; people tell you what you want to hear (#85)
- (a) The legal shape of a usable result is "what, for who, number, timeframe" plus either proof it is typical or a statement of what is typical (#32); and evidence on file with contact details (#48)
- (a) The exact guarantee wording matters because it becomes a policy object: it must be on the page (#4) and, in Canada, a guarantee that is not honoured or not tested is reviewable (#39)

### 7. Voice capture

- (b) Plain, customer-grade language converts better than polished copy (Unbounce 2024)
- (b) Understated testimonials outperformed enthusiastic ones in the WikiJob test (#67)
- (c) No study was found that tests self-described voice against sampled voice. The command's existing ruling stands as practitioner-grade: real writing beats self-description

### 8. Proof placement

- (b) 57% of viewing time is above the fold and 74% in the first two screens (NNG 2018, #62), so the top proof strip has to carry rating, count, licence and one result
- (b) Testimonials moved higher on the page lifted purchases 34% (#67)
- (c) The "68% better below the CTA" figure circulating in round-ups (#82) has no named study behind it. The competitor-proof-audit line "social proof below the CTA converts better than above it" should be downgraded to "next to the CTA, both sides tested"

### 9. Competitor proof audit sources

- (c) Google Ads Transparency Center: creatives, formats, regions, dates, verified payer name since May 2025; no spend, no keywords, expired ads disappear (#76, #77)
- (c) Semrush Advertising Research: ad copy and estimated traffic cost per keyword (#78)
- (c) `compass/crawler-google-places` on the money keyword: the pack's counts, ratings, distribution, photos, attributes and the real competitor set (#28)
- (a) GBP attributes are visible on the competitor's profile and are a proof slot in their own right (#19)
- Note for competitor-proof-audit.md: the "GBP Q&A" row (impact 5) is dead since Google removed Q&A in November 2025; replace with "Ask Maps answer quality"

---

## Myths, with the date they died

1. "Seller ratings lift CTR up to 10%" - Google's own page now says 2% on average (checked 28 August 2026, #10)
2. "Google Guaranteed reimburses up to $2,000" - guarantee discontinued, claims only for services booked before 7 December 2025 (#16)
3. "Google Screened / Google Guaranteed badges" - both replaced by one Google Verified badge (2025, #16, #17)
4. "Results not typical" protects a testimonial - it does not, and never did under the Guides; the 2023 revision says so in plain words (#32)
5. "Incentivised reviews are fine if you ask everyone" - true for the FTC rule only if the incentive is not conditioned on sentiment and is disclosed (#34, #35); on Google any incentive is a policy violation regardless (#21, #23); in the UK a concealed incentive is automatically unfair since April 2025 (#45)
6. "Employees can review as long as they had the service" - conflict-of-interest reviews are banned on Google (#22); undisclosed insider reviews are banned by the FTC rule (#31); the Bureau warned about it in January 2024 (#44)
7. "Staff review targets are a management tool" - explicit Google violation since April 2026 (#23, #71)
8. "Video testimonials lift conversion 80%" - no study; Wyzowl's 80% is app downloads after demo videos (#69, #83)
9. "Social proof converts 68% better below the CTA" - unsourced round-up number (#82)
10. "GBP Q&A is a proof source" - removed 3 November 2025; Ask Maps generates answers from the site and reviews (existing playbook, confirmed by #24 timeline)
11. "Google Ads requires third-party proof for any superlative" - the old editorial clause is gone; the live rule is Unreliable claims, which targets improbable results and result-bearing testimonials (#2, #6). Superlatives are still a Canadian and UK substantiation problem (#39, #48), so the NEVER SAY list keeps them

---

## Rules a context-layer command should enforce (33)

**Substantiation and the proof file**
1. (a) No number, result, guarantee or price appears in an ad or page unless it is in `context/proof.md` with source and date - FTC substantiation policy, Competition Act 74.01, CAP 3.47
2. (a) A result needs what, for who, the number, the timeframe, and either proof it is typical or a line saying what is typical - FTC Guides 2023, Google Unreliable claims
3. (a) Every testimonial on file has the person's contact details and consent recorded - CAP 3.47 and 3.50
4. (a) Performance and guarantee claims are tested before they run, and the test is filed - Competition Act 74.01(1)(b)
5. (c) Scraped numbers are claims. Tag UNCONFIRMED until the owner confirms and the measurement is repeated on the platform's own page
6. (a) Any guarantee that goes in an ad is written on the landing page in the same words - Google Unavailable offers
7. (a) Any price or "free" in an ad is live on the landing page with fees and the auto-charge terms - Google Dishonest pricing
8. (a) A licence claim carries the number, the issuing body and the lookup URL - Google Misleading representation; state statutes
9. (a) In California, Florida, Washington and Arizona (and check every other jurisdiction) the licence number goes in every ad and on the page - BPC 7030.5, FS 489.119, RCW 18.27.100, ARS 32-1124
10. (a) Competitor names stay out of ad text - Google Trademarks; and out of comparative claims without substantiation - Competition Act

**Reviews**
11. (a) Never offer anything for a review, ever, on Google - GBP policy; and never condition any incentive anywhere on sentiment - FTC rule
12. (a) Ask every customer, not the happy ones; no gating - FTC platform guide, Google policy
13. (a) No staff quotas, no "mention my name" requests, no asking on the premises - Maps policy April 2026
14. (a) No reviews from employees, family, contractors or the owner - Google conflict of interest, FTC insider rule
15. (a) Never suppress, hide or threaten over a negative review; reply to it - FTC rule, CMA cases
16. (b) Display the real rating and the real count; do not round up, do not show a 5.0 from six reviews - Spiegel, BrightLocal
17. (b) Reply to every review, including negatives, within a week, without a template - BrightLocal 2026, Marketing Science 2017
18. (b) Recency is a proof property: a quote bank entry carries its date, and page-facing reviews come from the last 90 days - BrightLocal 2026, Whitespark 2026
19. (b) The review benchmark is the current top 3 in the pack for the money keyword, computed, not a universal number - BrightLocal 2018, Local Falcon 2026
20. (a) Use the Google review link or QR code as the only ask mechanism - GBP help

**Sweep and scrape**
21. (c) Google reviews come from `compass/google-maps-reviews-scraper`; the pack from `compass/crawler-google-places`; Yelp from `tri_angle/yelp-scraper`; everything else via `apify/website-content-crawler` - drop the multi-platform wrapper
22. (a) The API is not the corpus: Places returns five reviews, Yelp three
23. (c) Every actor that returns zero is reported as "skipped, zero results", never as absence of proof
24. (a) Pull GBP identity attributes as proof slots: veteran-, women-, family-, Indigenous-owned only where the attribute is set or the owner confirms it
25. (c) Competitor ads come from the Ads Transparency Center (creatives, regions, dates) and Semrush (ad copy, keyword cost); neither shows spend

**Interview and voice**
26. (c) Ask objection first, then result with the number, then the feature - Psychotactics six questions
27. (c) Ask about specific past jobs, never "what do you usually get" - Mom Test
28. (a) Capture the exact guarantee wording and the exact refund path; those words become policy objects on the page
29. (c) Build the NEVER SAY list in the interview: superlatives, competitor names, regulated claims for the trade, and any word the owner refuses
30. (b) Voice is sampled from the owner's real writing and the customers' review language; self-description is a confirm step, not a source - Unbounce readability, WikiJob understated testimonials

**Placement and display**
31. (b) Rating, count, licence number and one result sit in the first screen; 57% of attention lives there - NNG 2018
32. (b) Testimonials sit next to the CTA, tested both sides; no "below converts 68% better" claim - VWO WikiJob, unsourced round-up
33. (a) Aggregate-rating schema must match the GBP number on the day; a mismatch is a misleading representation - existing audit rule, Google Misleading representation

---

## Open items the research could not settle
- The Competition Bureau's January 2024 employee-review release and Fasken's June 2025 note were only reachable as titles; the statutory text (#39, #40) covers the substance
- No public A/B data on "family owned", "years in business", "24/7" or response-time promises in ad copy; keep testing them as variables, not production rules
- The EU Omnibus annex was unreachable; the UK and US rules are stricter and cover the same practices
- The July 2026 LSA policy update reported by ALM could not be read; the Google Verified badge page and the migration coverage carry the material changes
