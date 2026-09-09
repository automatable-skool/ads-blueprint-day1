# Competitor proof audit - what they show that you cannot

The checklist `/context-layer` runs against the top 3 competitors, every time. It answers one question: **what proof does a buyer see on their page that they do not see on yours?**

The output is not a list of what you have. It is a **priority-ordered work order**, scored, with the biggest gap first.

---

## How the scoring works

Every signal below carries a fixed **Impact** score, 1-10, set from the research at the bottom of this file. That number never changes per client - it is what the signal is worth to any service business.

For each signal, score two things:

- **You** · 0-10, what a stranger can actually see on your site or profile today. Not what exists in a folder.
- **Them** · 0-10, the best of the top 3 competitors.

**Gap = Them minus You. Priority = Impact + Gap.** Sort descending. That is the file.

A signal where you already beat them scores a negative gap and sinks. A high-impact signal where they have it and you have nothing floats to the top, which is the entire point.

**Score what is VISIBLE, never what exists.** Sixty testimonials in a folder is a 0. The buyer cannot see the folder.

---

## The checklist

### Reviews and ratings

| Signal | Impact | What to check on them |
|---|---|---|
| **Google review count vs the map pack** | 10 | The benchmark is not universal, it is the average of the current top 3. Beat it or you are invisible |
| **Review velocity** | 9 | New reviews per month. ~8-10/month sustains a position; a burst then silence reads worse than steady |
| **Star rating** | 8 | Below 4.0 suppresses. Perfect 5.0 with 6 reviews reads fake |
| **Owner response rate** | 7 | Responded-to reviews signal an active business. Check whether they reply to the bad ones |
| **Third-party platforms** | 8 | Clutch, G2, Trustpilot, industry directories. B2B buyers check these before the site |

### Proof of work

| Signal | Impact | What to check on them |
|---|---|---|
| **Case studies with real numbers** | 9 | The most underused high-value signal there is. Count theirs. A "case study" with no number is a brochure |
| **Video testimonials** | 9 | Highest-converting asset available. Most competitors have zero - this is usually the widest open lane |
| **Named client logos** | 8 | Recognisable names. Note whether the logos sit where a buyer decides, or on a credentials page nobody opens |
| **Client company size named** | 7 | "We work with 8-figure operators" is proof the buyer reads instantly. Almost nobody states it |
| **Before/after screenshots, dashboards** | 8 | Hard proof beats a quote. Check whether theirs are real screenshots or illustrations |
| **Scale numbers** | 6 | Projects completed, hours saved, money generated, people helped. Lifetime totals, defensible |

### Who you are

| Signal | Impact | What to check on them |
|---|---|---|
| **Original photos, not stock** | 8 | Real team, real office, real work. Stock registers as a trust gap instantly, even when the visitor cannot say why |
| **Named author with credentials** | 8 | Bylines on content, real bio, real photo. The Experience half of E-E-A-T, and it decides AI citation too |
| **Team page with real bios** | 7 | Who actually does the work. Raters and buyers both read the About page carefully |
| **Years in business / since [year]** | 5 | Cheap, checkable, and most competitors state it |
| **Physical address and a real phone** | 6 | A form-only contact page is a trust hole |
| **Verifiable legal entity** | 6 | Registry record, company number, linkable. Rare and cheap |

### Credentials

| Signal | Impact | What to check on them |
|---|---|---|
| **Certifications and partner badges** | 7 | Google Partner, platform certs, trade bodies. **3-5 badges is the sweet spot** - more reduces credibility |
| **Licence, insurance, bonding** | 7 | Numbers and insurer named, not "fully insured". Table stakes in trades, differentiating in B2B |
| **Awards** | 5 | Include the year. An award from 2019 shown undated reads as decline |
| **Press and media** | 6 | Podcasts, features, guest posts, talks. The small ones count |

### Commercial terms

| Signal | Impact | What to check on them |
|---|---|---|
| **Transparent pricing** | 7 | A real number beats "request a quote". Check whether any of the three actually prints one |
| **Guarantee / risk reversal** | 7 | What they promise and what happens when it fails. Specific beats generous-sounding |
| **The 3-5 outcomes delivered** | 6 | Framed as the result, not the activity. "I do SEO" vs "top 3 for your main keywords in 4-6 months" |

### The profile and the technical layer

| Signal | Impact | What to check on them |
|---|---|---|
| **GBP completeness** | 8 | Categories, every service listed separately, attributes, hours, description |
| **GBP photo count and recency** | 7 | Volume and how recent. A profile last photographed in 2022 is a gap you can take |
| **GBP posting cadence** | 6 | How often, and what they post. **This doubles as the what-not-to-write lane for `/gbp-posts`** |
| **GBP Q&A** | 5 | Whether real questions are answered, and whether they seeded their own |
| **Trust schema** | 6 | LocalBusiness, Organization, AggregateRating, Person, sameAs. **AggregateRating must match the GBP** - a mismatch actively destroys trust |
| **SSL, speed, mobile** | 5 | Table stakes. Only appears in the report when it is failing |
| **Social following** | 4 | Per platform, measured. Lowest-value signal here - it is founder credibility, not client proof |

### Placement, not just presence

Having the proof and burying it scores as not having it:

- **Social proof below the CTA converts better than above it.** A testimonial in the footer is decoration.
- **A logo wall on its own page is a page nobody visits.** Logos belong where the judgment is being formed.
- **A credentials page nobody opens is a 2, not an 8.** Score placement into the "You" number.

---

## ⛔ Do NOT score the profile rows by hand. One Apify call returns the whole map pack.

`compass/crawler-google-places` takes a **search term plus a location** rather than a single business URL, so one run returns every competitor in the pack with the numbers already in it. This is the difference between an afternoon of manual checking and a 90-second call, and it is why the profile section of this checklist is not guesswork.

**Run it first, on the money keyword plus the city.** Then score `Them` from the returned rows and only `You` by hand.

What comes back per place, mapped to the rows above:

| Field | Fills this row |
|---|---|
| `totalScore` | Star rating |
| `reviewsCount` | Review count vs the map pack - **this is the benchmark, computed, not guessed** |
| `reviewsDistribution` | Whether a 4.8 is 200 fives and 40 ones, or genuinely consistent |
| review text, dates, owner responses | Review velocity and owner response rate |
| `imagesCount` | GBP photo count |
| `categories` | GBP category choice |
| `additionalInfo` | Attributes - service options, payment, accessibility |
| questions and answers | GBP Q&A |
| `peopleAlsoSearch` | **The real competitor set, from Google rather than from the owner's opinion** |

**Pricing:** about $1.50 per 1,000 places, plus a detail-page charge for reviews and images. A ten-competitor audit is cents.

**Two things this settles for free:**

- **The review benchmark stops being a guess.** The research says the only meaningful number is the current top 3's average. That is now a computed field, not an estimate.
- **`peopleAlsoSearch` corrects the competitor list.** Owners routinely name the rival who annoys them rather than the one taking their clicks. Cross-check the owner's list against this and say out loud when they differ.

**Reviews at depth:** `compass/Google-Maps-Reviews-Scraper` for the full corpus with text, dates and owner responses - Google's own Places API returns only five.

**⛔ Untested, per the playbook's actor rule.** Google Ads Transparency has several competing actors (`xtech/google-ad-transparency-scraper`, `scrapesage/google-ads-transparency-scraper`, `automation-lab/google-ads-scraper`) and none has been run from these repos. Useful for seeing which offers and angles competitors are paying to push. **Test one before relying on it, and report a zero out loud** - a wrong actor ID returns an empty array, not an error, and an empty array reads exactly like "this competitor runs no ads".

---

## Running it

1. **Identify the top 3.** The actual map pack for the money keyword, in the client's actual city - not who the owner thinks the competitors are. Use the Apify run above rather than an opinion.
2. **Score every row.** Impact is fixed, You and Them get set per client. Never skip a row: a row you cannot check is `UNKNOWN`, which is different from 0.
3. **Sort by priority.** Write it as an ordered list, biggest gap first.
4. **Name the cost and the effort on the top 5.** "They have 84 reviews, you have 0" plus what it takes to close it. A gap with no effort estimate does not get actioned.
5. **Flag what YOU win.** Two or three lines. It is what the copy should lead with, and it is the only part of this file that is good news.

**A gap you can close this week outranks a bigger gap that takes six months.** Say which is which - a 30-minute Clutch profile beats a year of review collection as the first move, even though reviews score higher.

---

## The research this is built on

Roughly 65 sources, August 2026. The numbers worth remembering:

**Reviews.** 71% of consumers regularly read reviews for local businesses. Review counts needed to reach the map-pack median vary enormously by industry - B2B services 10-30, electricians ~56, roofers ~79, plumbers ~215, dentists ~346 - so **the only benchmark that means anything is the current top 3 in that city**. Once at the benchmark, velocity (~8-10/month) matters more than total.

**Social proof.** Visitors form a trust judgment in about 50 milliseconds. 92% of consumers read testimonials, and fewer than 1 in 4 marketers put social proof on their landing pages at all. Positioning it below the CTA rather than above lifts conversion meaningfully. Around 90% of business decision-makers say social proof shapes vendor choice.

**Case studies.** 42% of B2B buyers name case studies the most influential content in their decision, and roughly 73% call them crucial. Consistently described as the most powerful and most underused B2B trust signal. Quantified outcomes are what does the work - an unquantified case study does not count.

**Video.** Video testimonials materially outperform written ones. Most local competitors have none, which makes it the widest open lane on this list for the least money.

**Badges.** 83% of users trust sites carrying third-party certification badges, and third-party review-platform badges are among the strongest single lifts available. But **3-5 is the ceiling** - past that, more badges reduce credibility.

**Photography.** Real photos beat stock by a wide margin in controlled tests - one swap of stock for a real customer lifted signups ~35%, and sites using authentic team photos measure markedly higher trust scores. Visitors clock stock instantly. Your competitors are often using the same stock image.

**E-E-A-T.** Trustworthiness is the load-bearing one: strong Experience, Expertise and Authority still fail if Trust is weak. Named authors with real credentials, first-hand detail, original photos and visible dates are the signals - and in 2026 they decide whether AI Overviews and assistants cite the page at all.

**Schema.** Organization and LocalBusiness schema with a verifiable legal entity, `sameAs` links, and AggregateRating that **matches the GBP**. A schema rating that disagrees with the profile rating does more damage than no schema.

**Guarantees.** Risk reversal moves conversion because the buyer reads it as the seller's own confidence. Most businesses running generous guarantees report claim rates under 5-10%, well below the conversion lift.

Sources: [Search Engine Land](https://searchengineland.com/local-seo-sprints-a-90-day-plan-for-service-businesses-in-2026-469059) · [Localogy review benchmarks](https://www.localogy.com/2026/02/google-review-competition-varies-by-industry/) · [ReplyOnTheFly benchmarks](https://www.replyonthefly.com/blog/how-many-google-reviews-do-you-need) · [Flint trust-signal stats](https://www.flint.com/articles/landing-page-trust-signal-conversion-statistics) · [ProveSrc social proof stats](https://provesrc.com/blog/social-proof-statistics/) · [Aspiration B2B credibility checklist](https://blog.aspiration.marketing/en/b2b-credibility-checklist-website-elements-for-brand-confidence) · [Oktopost trust signals](https://www.oktopost.com/blog/trust-signals/) · [CXL stock vs real photos](https://cxl.com/blog/stock-photography-vs-real-photos-cant-use/) · [VWO real-image test](https://vwo.com/blog/stock-image-or-real-image) · [Ranking Lens E-E-A-T checklist](https://blog.rankinglens.com/eeat-checklist-2026) · [MapRanks GBP competitor audit](https://www.mapranks.com/2026/08/14/google-business-profile-competitor-audit/) · [Koanthic review schema](https://koanthic.com/en/review-schema-markup-complete-guide-examples-2026/) · [Conversion Sciences risk reversal](https://conversionsciences.com/eliminate-risk-and-bump-your-lead-conversion-rate/)
