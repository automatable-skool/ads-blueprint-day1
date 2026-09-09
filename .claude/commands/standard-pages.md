---
description: The pages every campaign needs behind it - thank-you, the six sitelink targets, the legal three
---

Build the pages the ads need to point at. Run this in the same session as `/landing-page` - the money page is where people land, these are everything else the campaign depends on.

**Read `references/standard-pages.md` FIRST** - what each page must contain, the four rules that decide whether sitelinks actually serve, and why the thank-you page is the one nothing works without.

## ⛔ TEMPLATE-FIRST. Half these pages already exist - copy them, never write them.

(Jono's ruling, 1 September 2026: the design template IS the standard pages. A stub page styled "minimally to the design system" is not a page, and hand-written standard pages are how a site ends up with three design languages.)

`website/` ships the chosen style's REAL subpages under `app/bold/` and `app/calm/` - About, Contact, Services, and a blog index, fully designed (dev-only routes; they 404 in production by design).

**⛔ Five pages are ALREADY BUILT and are not this command's to touch:** `/`, `/about`, `/contact`, `/privacy-policy` and `/terms` render from `lib/site.config.ts` and were filled with the real business by `/api-setup`. Never copy template demo pages over them - that would replace real reviewed content with fictional-business copy. If one of them needs more depth, the fix is the config or a conversation, not an overwrite. When you add a page here, add its route to the `pages` array in `app/sitemap.ts` - `/api-setup` trimmed it to the built pages.

- **Pages the template has a designed version of (Services):** COPY the chosen style's version over the root stub - `app/calm/services/page.tsx` → `app/services/page.tsx` - then swap the words from `context/business.md`. Strip the style-picker paths (`/calm/...` links become `/...`). Zero new layout.
- **Pages the template lacks (/thank-you, /pricing, /reviews, /quote, /emergency, /areas-served, /guarantee, the legal three):** build them FROM the chosen style's sections, exactly like `/landing-page` does - open the style's pages, lift the section that fits (card grid for pricing tiers, testimonial figures for reviews, the FAQ accordion for guarantee terms), swap the words. A page assembled from template sections looks shipped; a page written from memory looks like a stub with longer text.
- **These pages keep the site's header and footer.** They are site furniture and sitelink targets, not ad landing pages - the no-header/no-footer rule is `/landing-page`'s, not this command's.
- **The exit gate is mechanical:** `python3 code/check_css_integrity.py` after building, and screenshot each page and LOOK at it. A page that renders as one centred text column used the stub, not the template.

**Why this exists as its own step:** `/write-ads` builds six sitelinks, and Google will not show a sitelink that points at a 404, a thin page, or the same page as the ad. `/landing-page`'s tracking gate cannot verify a conversion without a distinct thank-you URL. Both of those fail *later*, during the campaign build, when they are expensive to fix. Build the pages first.

**1. `/thank-you` - build this one first, it is the highest-stakes page on the site.**
Every conversion redirects here and the tracking event fires on load. It needs a real confirmation line in my voice, **what happens next with a time** ("we'll call you back within 30 minutes during business hours"), the clickable phone number, the conversion snippet, `noindex` in the head, and exclusion from `sitemap.xml`. No nav that pulls them back into browsing before the event fires, and no second ask. Without a distinct thank-you URL tracking falls back on event triggers that break silently and undercount.

**Ask me for the GHL calendar link and put it on this page.** Someone who has just filled the form is the most motivated they will ever be - the thank-you page should let them book right then rather than wait for a callback. Embed the calendar, or link it as the one action under the confirmation line. If `context/business.md` has no booking link, ask for it before building the page, and write it back there so nothing asks twice.

Ask me whether phone and form conversions need separating - if they do, build `/thank-you-call` too, since they carry different value.

**2. The six sitelink targets - INTENT, not navigation.**
About and Contact are site furniture. They still get built (step 3) because trust and citations need them, but they are **not** sitelink targets, because nobody clicks "About" on their way to booking a plumber. Build these six:

| Page | What makes it worth a click |
|---|---|
| `/pricing` | Real numbers or honest ranges, what's included, what changes the price. Filters tyre-kickers before the click costs money |
| `/emergency` | Availability, response window, what counts as an emergency, the direct number |
| `/reviews` | Real quotes with names and sources, the star rating, review schema - highest-trust sitelink and it feeds rich results |
| `/areas-served` | Every city or district, linked. Doubles as the city-page hub if the site also runs SEO |
| `/guarantee` | The guarantee in plain words, what it covers, how to claim it |
| `/book-now` or `/quote` | The conversion page - short form, response-time promise, what happens next |

Swap a page only if my business genuinely has no version of it (a business with no emergency service should not have an `/emergency` page) - and if I drop one, tell me which sitelink slot goes empty and pick a replacement from `references/standard-pages.md`.

**Four rules that decide whether these actually serve:**
- Each page must be **genuinely different** - Google suppresses sitelinks leading to near-identical content
- **Never point a sitelink at the same page as the ad's final URL** - it wastes the slot
- Sitelink descriptions are 35 characters, two lines. **Write them now**, while the page's value proposition is fresh, and save them into the page notes so `/write-ads` reuses them instead of inventing new ones
- Four sitelinks minimum to serve reliably; six gives Google room to choose

**3. The legal three - verify, don't rebuild.** `/privacy-policy` (Google Ads **requires** it for remarketing and most verticals), `/terms`, and `/about` + `/contact` already exist - `/api-setup` built them from `lib/site.config.ts` before the API application. Fetch all four live and confirm 200 with real content. If the business now runs tracking the privacy policy doesn't mention, that's a config/copy conversation - not a template overwrite.

**4. Ship and verify.** Run `python3 code/check_css_integrity.py` first - a failing check means a page was written instead of copied. Then deploy them the same way `/landing-page` deploys (Vercel push, or WordPress draft through the Novamira connection). Then **fetch every URL live** and show me one line per page, **never a table**: `path · status · N words`. Anything not 200, or thin enough to read as a placeholder, is not done. Record the verified list in CLAUDE.md "## My setup" so `/write-ads` can trust it.

**Compliance:** every claim from `context/proof.md` only; check `context/compliance.md` before shipping. A guarantee page that promises something the business does not actually honour is a CRITICAL violation, not a copy choice. No invented prices on `/pricing` - if I do not have real numbers, ask me for them or build the page around what changes the price instead.

Next: `/write-ads` builds the sitelink assets against these URLs and will refuse any that 404.
