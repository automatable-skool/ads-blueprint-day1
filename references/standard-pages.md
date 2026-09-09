# Standard pages - build these on every site, every time
Written August 2026 · one thank-you page, six sitelink pages, three legal pages, four technical files
Next: build `/thank-you` with tracking wired, before any form goes live.

These are not optional. The thank-you page is where conversion tracking fires, and the sitelink pages are what Google Ads needs before it will show sitelinks at all. A site without them cannot measure anything and cannot run ads properly.

**`/standard-pages` builds these**, run alongside `/landing-page` in the same session. `/landing-page`'s tracking gate cannot be verified without `/thank-you`, and `/write-ads` cannot build sitelink assets without the six pages below - it fetches every URL live and refuses any that 404.

---

## 1. The thank-you page at `/thank-you`

The most-skipped page on any build, and the one everything else depends on. Every conversion - form fill, booking, call-back request - redirects here. It is the only reliable place a conversion event can fire.

**Must have:**
- A real confirmation message in the owner's voice, not "Thank you for your submission"
- **What happens next, with a time:** "We'll call you back within 30 minutes during business hours" - this is the single biggest reducer of buyer's remorse and no-shows
- The phone number, clickable, in case they don't want to wait
- **The booking calendar, embedded or as the one action.** This is the highest-intent moment on the site and a dead-end thank-you page wastes it. Source it from `context/business.md` "Booking link"; if it is empty, ask and write it back
- The conversion tracking snippet (Google Ads conversion, GA4 event, and any Meta/pixel) firing on page load
- `noindex` in the head - it must never appear in search results, or the conversion count becomes garbage
- **Excluded from sitemap.xml**

**Must NOT have:**
- Navigation that pulls them back into browsing before the event fires
- Any second ask ("now follow us on Instagram") that dilutes the moment

Without a distinct thank-you URL, tracking has to fall back on click or event triggers, which break silently and undercount.

Consider a second variant, `/thank-you-call`, if phone and form conversions need separating - different value, different optimisation signal.

---

## 2. The six sitelink pages

Google Ads sitelinks need real, distinct, useful pages behind them. Google will not show sitelinks pointing at anchors on the same page, and thin duplicates get disapproved or ignored. These are also the Layer-1 set the SEO pyramid needs, so they get built once and used by both tracks.

**The six are INTENT pages, not navigation.** About and Contact are site furniture: they must exist (see section 3) but they are not sitelink targets, because nobody clicks "About" on the way to booking a plumber. `/write-ads` will not use them. (c)

**Pricing** at `/pricing`
Real numbers or honest ranges, what's included, what changes the price. Filters tyre-kickers before the click costs money.

**Emergency** at `/emergency`
Availability, the response window, what counts as an emergency, the direct number. Trades and anything where speed is the pitch.

**Areas served** at `/areas-served`
Every city or district, linked with descriptive anchors. Doubles as the city-page hub if the site also runs SEO.

**Guarantee** at `/guarantee`
The guarantee in plain words, what it covers, how to claim it. Only build it if the business genuinely honours one - a guarantee page that overstates is a compliance problem, not a copy choice.

**Reviews** at `/reviews`
Real review quotes with names and sources, the star rating, review schema. Highest-trust sitelink, and it feeds rich results.

**Book now** at `/book-now` (or `/quote`)
The conversion page - short form, what happens next, response-time promise. The money sitelink, and the target every blog post bridges to.

### Swaps, when one of the six does not apply

A business with no emergency service should not have an `/emergency` page. Swap in from this list and say which slot changed:

- `/services/` - a real hub page linking every service with descriptive anchors. Never a bare list
- `/financing` - anything with a large ticket price
- `/faq` - FAQ schema, and it feeds AI overviews directly (if the site also runs SEO)
- `/free-estimate` - where the estimate itself is the offer

Never swap in About or Contact. Below four sitelinks they stop serving reliably, so a dropped page needs a replacement, not a gap.

### Four rules that decide whether sitelinks actually serve

- **Each page must be genuinely different.** Google suppresses sitelinks that lead to near-identical content
- **Never point a sitelink at the same page as the ad's final URL** - it wastes the slot
- Descriptions on sitelinks are 35 characters, two lines. Write them when the page is built, while the value proposition is fresh
- Minimum four sitelinks for them to serve reliably; six gives Google room to choose

---

## 3. The legal and trust pages

Cheap to build, and their absence is a live problem. Google Ads **requires** a privacy policy for remarketing and for most verticals, and missing legal pages are a documented trust signal for both users and quality raters.

**Privacy policy** at `/privacy-policy`
Required by Google Ads for remarketing and data collection. Must mention cookies, forms and any pixel in use.

**Terms** at `/terms`
Required for anything taking payment or bookings.

**Accessibility** at `/accessibility`
Optional, but it is a real trust signal and it is one page.

Link all three in the footer, never in the main nav.

---

## 4. The technical must-haves

Built by `/build-website`, verified by `/audit`.

- **`/404`** - a real page with the search box, links to the Layer-1 set, and the phone number. A dead end loses a customer who was already looking for you
- **`robots.txt`** - allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended (if the site also runs SEO), and points at the sitemap
- **`sitemap.xml`** - mirrors the pyramid exactly. Excludes `/thank-you` and the legal pages
- **`llms.txt`** - the AI-readable summary of what the business does (if the site also runs SEO)

---

## The build order

1. Home plus the Layer-1 set (`/services/`, `/blog/`, `/about`, `/contact`, `/quote`)
2. `/thank-you` **with tracking wired** - before any form goes live, or the first conversions are lost forever
3. `/reviews` and `/pricing` - the remaining sitelink targets
4. Legal pages in the footer
5. `/404`, robots, sitemap, llms.txt
6. Then, and only then, the ad-group landing pages from `keyword-list.md`

## How to use this

1. `/landing-page` builds sections 1 to 4 before any campaign goes live.
2. `/landing-page` (Ads) and `/publish` (SEO) both assume `/thank-you` exists - if it doesn't, stop and build it.
3. `/audit` flags any missing standard page as a finding, not a suggestion - a missing `/thank-you` is a CRITICAL finding, because it means the account's conversion data is unreliable.
4. Existing site? Check which of these already exist before building - never duplicate a page the owner already has under a different URL.
5. Sitelink descriptions get written at build time and stored with the page, so `/write-ads` isn't inventing them cold months later.
