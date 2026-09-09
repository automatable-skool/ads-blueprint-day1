---
description: A converting landing page per ad group - message match is the whole game
argument-hint: [ad group / service, optional]
---

## STEP 0. The inputs. ONE message, asked before a word of copy.

Read CLAUDE.md "## My setup" and `.env` first. Anything already recorded is never asked again. **Whatever is still missing goes into your FIRST message as one numbered list, and nothing else.** Do not plan the page, do not write copy, do not open the template.

Ask exactly this, dropping any line already answered:

> Before I build this page I need six things. They take about ten minutes total and they are the difference between a page that produces leads and a page that just looks nice.
>
> 1. **The lead webhook** - GHL, Automation, new workflow, trigger "Inbound Webhook", copy the URL. Every form on this page posts there.
> 2. **The real phone number** - the one the business actually answers. One number, no pools. Google swaps it for a forwarding number on ad traffic so calls get counted.
> 3. **Do you want a booking calendar?** Optional. If yes: GHL, Calendars, the booking calendar, copy the embed or scheduling link. **It goes on the thank-you page ONLY - never on the landing page itself.** The landing page has one job: the call or the form. If you'd rather leads only call or fill the form, say "no calendar" and I skip it everywhere.
> 4. **The Google tag ID** - `AW-XXXXXXXXX`, from Google Ads, Tools, Data manager, Google tag. If the tag has never been installed, say so and I will walk you through it here.
> 5. **The business address** - street, city, postcode. Google grades transparency and the SMS registrar needs it.
> 6. **The main city** - if I could only name ONE city on this page, which one? It goes in the H1 as the fallback, and Google fails to resolve a searcher's location on a large share of clicks, so it is the version most people read. Fully remote or national: say "remote" and I take city swapping off the page.


**Then the proof, in the same message.** The page is built to a fixed shape and every one of these has a section waiting for it. Ask for all of them at once, in one numbered list, and say plainly: **anything you don't have, I delete that section - I will not fake it.**

> And the proof. Send whatever you have, skip what you don't:
>
> 6. **Video testimonials** - up to 9. The single biggest trust driver on the page. Phone footage from a happy client beats anything produced.
> 7. **A founder video** - 30 to 60 seconds, you on camera, why you started and what you promise. Face and voice build trust faster than any copy I can write.
> 8. **Written testimonials** - as many as you have, with a real first name and what they hired you for.
> 9. **Brand logos** - companies or recognisable clients you've worked with. Six looks right.
> 10. **Your star rating and review count** - Google, Yelp, Trustpilot, Facebook, industry sites. The exact numbers, and a link so I can check them.
> 11. **Three numbers for the checkmark strip** - years in business, clients or jobs served, and the guarantee.
> 12. **Case studies** - a client, what was broken, what changed, and a number. Two is enough.
> 13. **A portfolio** - photos of finished work, if your business is one people judge by looking (photography, events, trades, renovation, landscaping). Not every business needs one.
> 14. **A lead magnet** - a PDF, checklist, tool or generator I can send the moment they enquire. If you don't have one, tell me the topic and I'll draft it.
> 15. **Your three reasons** - why someone picks you over the other three quotes. Usually price, service, or "we handle everything".
> 16. **The objections** - the real reasons people don't enquire. These become the FAQ, and it's the highest-value thing on this list.

**⛔ BUILD THE PAGE COMPLETE. EVERY SECTION, EVERY TIME. THEN I ADD OR REMOVE.** (Jono, 2 September 2026.)

Do not wait for the answers to decide what to build. **Build the full page with all 18 components present**, using what they gave you and a marked placeholder for everything else. A page missing six sections looks like a small business with nothing to say; a page with six marked slots looks like a page waiting for content, and it shows the owner exactly what is worth going and getting.

**Then hand back a numbered list of every placeholder still on the page**, one line each, so the reply is as simple as "remove 3 and 7, here's the content for 5". Removing a section is one edit. Filling one is one edit. Never make them describe the page back to you.

**How a placeholder has to look:** designed, deliberate, and obviously empty. A logo mark built from the palette. An avatar circle with initials. A case study card with the shape filled and the numbers as `[ ]`. A video tile with a play button and a label saying what belongs there. **Never a grey box, never lorem ipsum, never a stretched rectangle** - see the hero rule below, it applies to the whole page.

**⛔ AND NEVER AN INVENTED CLAIM.** The line is between furniture and claims. Furniture may be placeheld: logo marks, badge shapes, avatar circles, card layouts, portfolio tiles, the lead magnet cover. **Claims may not be, in any form** - testimonial words, client names, star ratings, review counts, years in business, job counts, results figures, guarantees. A placeholder testimonial reads exactly like a real one to everyone who sees the page, and that is fabricated proof, not a draft. Those slots ship visibly empty with the label saying what to send, or they ship not at all.

**No GoHighLevel account yet?** Say so and walk them through it rather than leaving them stuck. It is the CRM everything here posts into - leads, the speed-to-lead callback, the calendar, the offline conversion import. Community members get it for **$1/month**: https://www.skool.com/automatable/classroom/32447943?md=47d1df7d71c449baa5ab88c94340718c
Sign up, then Automation, new workflow, trigger "Inbound Webhook", copy the URL. About five minutes end to end. Already have GHL on another plan? Fine, just paste the webhook, the number and the calendar link.

Write the answers into CLAUDE.md "## My setup" and `.env` (`LEAD_WEBHOOK_URL`, `BUSINESS_PHONE`, `GHL_CALENDAR_URL`, `GOOGLE_TAG_ID`, `MAIN_CITY`). "No calendar" is an answer - record it as `GHL_CALENDAR_URL=none` so it is never asked again, and drop the calendar from every section, conversion and checklist below. **Only if I reply "skip it":** build with a clearly-marked placeholder, say plainly which of the five is dead, and never publish that page. An ads landing page with a dead form burns real money on every click.

**Then, in the same breath, read the account's conversion actions** - `python3 code/check_conversion_setup.py`. It prints every action with its gtag label, so the page gets wired to the real labels in this run instead of asking for them later. Tracking is not a follow-up step in this command. It is built into the page as it is written.

---

**⛔ COPY THE TEMPLATE. THERE IS NO DESIGN PASS.** (Jono, 2 September 2026: "I want the landing page skill to build this exact page, no yoloing. Then people fill in their stuff from here.")

```bash
cp -r website/app/lp/_template website/app/lp/<ad-group-slug>
```

`website/app/lp/_template/page.tsx` IS the page. Every section, its order, its layout and its component is already decided and signed off. You are not designing anything - you are filling it in.

**What you change, and nothing else:**

- `BUSINESS`, `PHONE` and `MAIN_CITY` at the top. `MAIN_CITY` is the H1's `<City fallback>` - the city Google shows when it cannot resolve the click, which is most of the time. `MAIN_CITY=none`: delete the `<City>` tag and write the H1 without a place
- **Build the geo map once per country, before the first page ships:** `python3 code/build_geo_map.py --country CA` writes `website/lib/geo-map.json`. `/write-ads` appends `loc={loc_physical_ms}` to every ad, and the page turns that number into the searcher's city with it. No map file means every visitor silently sees the fallback
- every `[SQUARE BRACKET]` - the copy waiting for this business's words
- the `photo(...)` keywords, or a real `src` once the business supplies photography
- the FAQ entries, for the real reasons THIS business's buyers do not enquire
- `page="/lp/[ad-group-slug]"` on the form, so the lead is attributed

**⛔ WHAT YOU MAY NEVER DO:**

- **Reorder, add or remove a section** without me saying so. If a section genuinely does not apply, say which one and why, and wait.
- **Invent a rating, a review count, a client count, a result or a years-in-business figure.** Every number on the page must be in `context/proof.md` first. No proof, delete the slot - never a placeholder number, because a placeholder number reads exactly like a real one.
- **Put a stock face beside a real client's name or a real number.** That is not a placeholder, it is a fabricated person.
- **Write a new component.** The page is built from `components/kit/Mainstay.tsx` (`SectionHeading`, `TrustBar`, `Stars`, `StatBlock`, `ServiceCard`, `TestimonialCard`, `FAQItem`, `CTABanner`, `Figure`) plus `AvatarCluster`, `ProcessSteps` and `CtaBlock` from `components/kit/Marketing.tsx`. If something is genuinely missing, it goes in the component file so every future page gets it - never inline into one page.
- **Touch the design system.** Colours, type, spacing, radii and shadows all come from `app/mainstay.css` and the Mainstay tokens. A hex code, a one-off font size or a hand-rolled px value in a page file is a bug. `python3 code/check_css_integrity.py` catches the ones that fail silently.

**The section order, for reference only - it is already in the file:** hero with the founder video · client logo band · selected work · nine client videos · the record strip · how it works, photo right · what you get, photo left · kind words on the tinted band · case studies on the clay band · the form · the FAQ · the legal line. Two-column sections alternate sides via `.lp-flip`.

**Only when a section genuinely does not apply****Only when a section genuinely does not apply** - a portfolio for a business nobody judges by looking - is it left out, and then say so in one line. Everything else stays on the page as a slot until I remove it.

Zero new layout, zero new visual language. Building a NEW section that is not in `Sections.tsx` means the blueprint changed: add it there so every future page gets it, never inline it into one page.

**The one thing you delete on the way in: the `<header>` block and the `<footer>` block.** The template pages carry a sticky header nav and a site footer because they are website pages. An ad landing page has neither. See "No header. No footer." below - it is a hard rule, not a preference.

Build a landing page for: $ARGUMENTS (or the next ad group in the account structure section of `keyword-list.md` without one).

**Read `context/audit-results.md` first if it exists** - the "For /landing-page" section names which pages failed, why, and how much spend each one affects. Fixing a page the audit already diagnosed beats re-diagnosing it. Check the run date at the top: if it is older than the last 30 days of spend, say so and treat it as a starting point rather than fact. Head that file also carries the trust section - **if tracking is broken, say so before quoting any number from it.**

**Scout first - this is where the competitor scrape runs for the first time.** If `context/competitor-ads.md` is missing or older than 30 days, run `/scrape-competitors` now (about two minutes) before a word of page copy: their live ads AND their landing pages - the promise, the price, the proof above their fold. Your page has to beat what a searcher just saw on theirs. Read the **`# THE PAGES`** section - it ranks every competitor page by proof density, with a screenshot each.

**⛔ THE COMPARISON IS A CHECK, NOT THE STRATEGY.** (Jono, 2 September 2026.) The 18 components are the spec, and **social proof and results are the main thing** - videos, written reviews, ratings, case studies, logos, badges, the founder. Everything else on the list is a nice-to-have. The **19th thing is persuasion and good copy**, which is worth more than any element you could add.

So use the competitor read to answer one question - *is our proof deep enough* - and nothing else. **Never let it reorder the page, never let it promote a nice-to-have into the headline, and never assume a thing they all lack is therefore a thing we should lead with.** Price is the standing example: none of them showing it might mean it is an opening, or it might mean it costs them leads. That is Jono's call, never yours. Ask, do not infer.

**⛔ THE GATE: WOULD THEY CHOOSE OURS OVER THEIRS?** (Jono, 2 September 2026 - the same gate `/write-ads` uses on headlines, applied after the click instead of before it.) The ad wins the click by beating their ad. The page has to win the job by beating their page, and the visitor is comparing - they have three tabs open right now.

Before writing a section, do this and show it to me:

1. **Take the top three pages by proof density** from `# THE PAGES` and list what sits above their fold: the rating and count, the guarantee, the price, the named clients, the video, the years.
2. **Put our above-the-fold beside theirs** and answer one question: on proof alone, does ours win? Not "is ours nice". Does a person with three tabs open pick this one?
3. **Name every proof element they have that we do not.** That list is the most valuable output of this whole command, because each line is a thing to go and get - and it goes straight into the intake ask above.
4. **Name the one thing we have that none of them do.** That is the page's reason to exist, and it belongs above the fold, not in section nine.

**What the comparison MAY change:** how much proof we gather, and how much of it goes above the fold. **What it may NOT change:** the section order, the headline's promise, or whether we lead on price. Those come from the blueprint and from Jono.

**Then turn it into the build, because a comparison nobody acts on is a diary entry.** Write this block into `context/landing-page-brief.md` before any code, one line per decision, never a table:

```
above the fold · they lead with · we lead with · who wins
- SavClicks · 4.9 stars, 380 reviews, 5 brand logos · our 8-week guarantee, no rating yet · THEM on proof, US on risk
- <competitor> · <their strongest element> · <ours> · <the honest verdict>

we must MATCH (they all have it, its absence reads as a red flag)
- a star rating with a count · a named guarantee · a real price or range · a face

we must BEAT (their weakest common element, and where we go hard)
- nobody names the buyer · nobody says what happens after the form · nobody puts a date on delivery

our one unmatched thing, and it goes above the fold
- <the claim none of them can make>
```

**The three rules that turn that block into a page.**

1. **Match every element they ALL have.** When four of four competitors show a rating and we show none, the visitor does not think "no rating" - they think "something is wrong with this one". Absence is a claim.
2. **Beat them where they are all weak, and put it above the fold** rather than in section nine. Their common weakness is the only place a new advertiser wins outright, and it is usually the same three things: nobody names who the service is NOT for, nobody says what happens after the form, and nobody puts a date on anything.
3. **Never copy their structure, only their proof bar.** Their page order is theirs; the blueprint's order is the one that converts. What you take from them is the STANDARD - if the best of them puts nine proof elements above the fold, nine is the number to beat, not eight.

**Report it back as one line before building:** "They lead on rating and volume, we lead on the guarantee and the date. We match on X, we beat on Y, and we are short a rating - that is the one thing to go and get."

**If they out-proof us and we cannot close the gap today, say so plainly.** A page that loses the proof fight is a budget problem, not a design problem, and the honest answer is "get these three things, then we ship" - not more copy. Never quietly build a page you know is second best. `/write-ads` reuses the same file later.

**Standard pages first - check, then run `/standard-pages` only if they are missing.** Fetch `/thank-you` and the six sitelink targets. All 200 already (because `/scale-account` phase 3 built them, or a previous session did)? Say so and move on - do not rebuild them. Any missing: run `/standard-pages` now, in this same session, because `/write-ads` fails later without them. Read `references/standard-pages.md` and confirm every page in it exists before a campaign is enabled: **`/thank-you` with conversion tracking wired and the calendar embedded** (without a distinct thank-you URL the account's conversion data is unreliable and Smart Bidding trains on noise), plus the six sitelink targets Google Ads needs - `/services/`, `/about`, `/contact`, `/quote`, `/reviews`, `/pricing` - and a privacy policy, which Google Ads REQUIRES for remarketing. Missing any of these is a blocker, not a nice-to-have.

**Read `references/persuasion.md` first, then `references/landing-page-blueprint.md`.** Persuasion.md section 7 is the one that matters most here: message match is worth more than any design change (a documented 212.74% lift, and a 66% lift from aligning the headline alone). The promise in the ad appears in the SAME WORDS above the fold - not a synonym. Section 5 sets the reading level: grade 5 to 7 converted at 11.1% against 5.3% for professional-level writing.

**Read `references/landing-page-blueprint.md` SECOND** - the exact section order and component stack behind a top-quartile page. The structure is the asset: fill it in, never reinvent it, never re-order it. Every element does one of three jobs (social proof / results / benefits-not-features) or gets cut. `references/examples/landing-page-example.html` shows a finished one.


## ⛔ No header. No footer. This is the page's shape.

(Jono's ruling, 1 September 2026, replacing the old "keep the nav and footer" line.)

An ad landing page has **one job** and every exit is a leak. So:

- **No header, no nav, no logo bar with links.** Delete the whole `<header>` element from the copied page. The business name and phone live INSIDE the hero as plain content, not as a bar - the name as text, the number as a `tel:` link. Nothing in it navigates anywhere else on the site.
- **No footer.** Delete the whole `<footer>` element. No sitemap, no service list, no social row, no second nav.
- **What replaces the footer is one legal line**, centred, small, directly under the final form: `[Business name] · [street address, city] · [phone] · [Privacy Policy] · [Terms]`. Two links, both opening in a new tab, and that is the entire set of links on the page besides the CTAs. That line exists because Google grades transparency (who you are, what you ask for), the 10DLC SMS registrar refuses registration without a reachable privacy policy, and the Ads bot has to be able to crawl the page. It is one line. It is not a footer.
- Removing navigation lifted conversion 0 to 4% on cold pages and 16 to 28% on warm pages in HubSpot's five-page test, and doubled or better in single-site cases. No published test shows adding nav to an ad page raising conversion.
- The page is `noindex`, out of `sitemap.xml`, and never blocked in `robots.txt`.

**SEO and standard pages are the opposite** and keep both header and footer - they need navigation to rank and to be browsed. This rule is about `app/lp/` only.


## ⛔ The bar: this has to be genuinely beautiful, not merely correct

**This page is the member's proof that they can do this.** It is the first thing their prospect sees after paying for the click. A technically perfect page that looks cheap loses the job before anyone reads a word - people decide whether a business is real in about half a second, and they decide it on the design.

So the standard is not "did it build". The standard is: **would a stranger believe a real business paid for this?**

**The look is already decided - do not design one.** `website/` ships two finished styles and a picker (`cd website && npm run dev`): **bold** (trades - loud, phone-forward) and **calm** (professional services - quiet, credential-led). The style pick lives in CLAUDE.md "## My setup"; if it isn't there, show me both and ask which. Everything below describes what the template already does - your job is to keep it intact while the words change, not to rebuild it.

**What the template gives you, and what you must not break:**

- **A hero that lands on its own.** One clear promise, real imagery or a designed substitute, and enough room to breathe. Never a placeholder, never a wall of text, never three competing calls to action.
- **Rhythm down the page.** Sections alternate surface and spacing so the eye is led rather than dumped. A visitor should feel movement as they scroll, not one continuous white field.
- **Real images, used large.** The owner's photos, their van, their work, their face. Big enough to matter. Real photography beats stock, stock beats illustration, and an empty slot beats all three at looking broken.
- **Proof designed in, not appended.** Review stars, counts, credentials and numbers placed where doubt happens and styled to be seen.
- **Type that has a hierarchy.** Display, heading, body, label - each doing a different job, each visibly different.
- **Generous whitespace.** Cramped is the most common tell of an amateur build. When in doubt, add space.
- **Mobile designed first**, because most local service traffic is a phone.

**Two habits that produce it:**

1. **Copy the template's sections. Never rebuild them from memory.** Everything above is already solved inside the chosen style's pages. The failure mode is writing a fresh card or button and landing on a plain bordered box.

   **This is now enforced, because saying it three times did not work.** A build read this rule, hand-wrote `lp-*` helper classes, inherited the kit's tokens (right blue, right font) and none of its design - and `next build` passed. `code/check_css_integrity.py` now fails any page under `app/lp/` that is missing the template's structural signature: the brand-surface hero, `gw-container`, the `--space-*` scale, and at least three different surface tones down the page. **Run it before you show me anything.** If it fails, you wrote the page instead of copying it - open `app/calm/page.tsx`, take the sections, swap the words.
2. **Screenshot every page and LOOK at it before showing me.** Not "did it compile" - does it look good. If it does not, fix it before I see it. Showing me a page you have not looked at is how a placeholder box reaches a live site.

**The 9 out of 10 gate applies to the visual, not just the copy.** Score it honestly: hero impact, visual rhythm, image quality, proof placement, typography, spacing. Under a 9, say exactly what is dragging it down and fix it. "It's fine" is not a score, and a page that merely functions is a 6.

**Colour:** the accent is the nine `--blue-*` values in `app/ds.css`. Their brand colour regenerates that ramp on the same lightness ladder - the graphite accent stays. That is the only colour change this command makes.

**Their own brand instead of the template - only if I ask for it.** Then: a kit from https://getdesign.md/ via https://claude.ai/design, a kit they already have, a screenshot (https://dribbble.com/), or one brand colour plus an adjective. Drop it in `design/kit/`. **Real kit files only, never a prose summary.** From a screenshot, extract exact hexes and type scale rather than approximating, and re-check white-over-accent contrast. Never pause a build to ask about design - a paused build means ads pointing at nothing.


## The section order - build it top to bottom, in this order, every time

Full detail per section is in `references/landing-page-blueprint.md`. This is the running order, and it does not get re-arranged to suit a business:

1. **Hero.** Message-matched H1 (the ad group's promise, word for word), offer line under it, three credibility bullets, licence and insurance line, the call button and the form side by side, star rating with the real review count. Business name and phone as plain content, no nav.
2. **Trust strip.** Badges, review counts with the source named, client logos, years in business, jobs per year. Immediately under the fold, where the first doubt lands.
3. **The problem, then the promise.** Two or three lines naming what they are dealing with right now, then the one sentence that says what you do about it. Short - this is the bridge, not the pitch.
4. **What you get.** Benefits, not features. Bullets. What is included, what is not, what happens to their problem.
5. **Proof.** Video testimonials and written reviews with real first names and dates. The heaviest block on the page.
6. **How it works - three steps.** Call or book, we show up and do X, you get Y. This kills the "what actually happens if I press the button" fear, which is the biggest silent objection on a service page.
7. **Results.** Case studies with numbers, or a portfolio grid, whichever fits the business type.
8. **Why us - the three selling points.** The same three the business hammers everywhere, plus the stated response time.
9. **Service area.** The real towns. Out-of-area visitors self-select out before they cost a call.
10. **The guarantee.** Risk reversal, stated in the same words as the ad.
11. **What it costs.** Price framing, a range, or how pricing works. Silence on price is the second biggest exit.
12. **FAQ.** The top three objections answered honestly from `context/proof.md`: price, timing, guarantee.
13. **The close.** Form number two, the phone number, the guarantee restated. No calendar widget - that lives on `/thank-you` only. This is the last thing before the legal line.
14. **The legal line.** One line, as specified above. No footer.

Running the whole page: **one sticky call bar on mobile**, CTAs repeating on every major section on desktop.

**The one law: message match.** The H1 repeats the ad group's promise word-for-word. Someone who clicked "Emergency Drain Cleaning Dallas" lands on exactly that - this is both a conversion lever AND a Quality Score lever (relevancy triangle: keyword → ad → page = cheaper clicks).

**Build (Next.js + Tailwind, deployable to Vercel; or on WordPress through the Novamira connection - created as a DRAFT page, message-matched slug, no site nav on it):**
- Every form posts to `LEAD_WEBHOOK_URL` with the stashed `gclid`, keyword, campaign and UTMs in the payload
- Every phone number is `BUSINESS_PHONE`, one number, plain text, identical format in the display text and the `tel:` href
- If a calendar was wanted: it is `GHL_CALENDAR_URL`, embedded on `/thank-you` only - never on the landing page. "No calendar": the thank-you page runs on the callback time and the phone number
- Sub-2s mobile load: WebP images, no popups, minimal JS


**⛔ THE EXIT GATE - run it, or the build is not finished.**

Instructions get skipped. These are mechanical, so they cannot be:

```
python3 code/check_css_integrity.py
python3 code/check_page_quality.py /lp/[slug]
python3 code/check_conversion_setup.py
```

**A failing check means the page does not get shown to me.** Fix it and re-run until it passes.

`check_css_integrity.py` catches what nothing else can: an undefined `var(--token)` or a className no stylesheet defines are both LEGAL CSS, so `next build` passes, no error appears, and the page just renders flat. Regenerating the `--blue-*` ramp is exactly when a token gets orphaned. **A green build is not proof the design survived.**

**Why this exists:** a build read the template, then wrote a completely different design with 18 invented colours and zero template sections. Nothing caught it, because "follow the template" is an instruction and instructions are not enforcement.

**⛔ Six build failures that make a templated page look unbuilt. Check every one before showing me the page.**

**1. NEVER ship a placeholder box.** A grey rectangle with "a photo of the owner working, natural light" written inside it is a build artifact, and in a hero it makes the entire page read as unfinished. If there is no real image yet, the hero gets a DESIGNED alternative instead - a stacked proof card, a real screenshot of their work, a stat block, a review card rendered from a real review, or a full-width type-led hero with no image slot at all. **A hero must look finished on the day it is built.** Ask for the photo separately and swap it in later. The frame's label text ("CREW & VAN", "JOB PHOTO") gets deleted with the frame, never left rendering on top of a real photo.

**2. A page that is 100% white is not using the design system.** `app/ds.css` ships surface tokens - page, card, raised, alternate - and they exist to give a page rhythm. Alternate section surfaces down the page so it reads as sections rather than one flat wall. If every band is white, the colour system was skipped.

**3. Copy the template's sections. Never approximate them.** A bordered rectangle with a small outline icon in the corner is not a card, it is a box - and it is what you get when a section is rebuilt from memory instead of lifted from the chosen style's pages. Read the section, use it.

**4. Proof gets designed, never footnoted.** Review stars, client numbers, licence and credentials are the highest-converting elements on the page. They get real visual weight - a proof bar, cards, large numerals. Styling them as 12px muted text at the bottom of the hero wastes the strongest asset the business has.

**5. Use the whole type scale.** A 60px headline and then everything at 16px is two sizes, not a scale. The system defines display, heading, subheading, body, small and label - a page that skips the middle has no hierarchy and reads flat.

**6. The header or footer survived the copy.** Search the built page for `<header` and `<footer`. Either one present means the delete in step 1 did not happen, and the page now has a dozen exits on it. This is the most common failure of all, because the template ships with both.

**Before showing me the page, screenshot it and LOOK at it.** Ask: does this look like a real business paid for it, or does it look like a template with the content swapped? If a placeholder box is visible anywhere above the fold, it is not ready to show.

## ⛔ TRACKING IS PART OF THIS COMMAND, IN THIS RUN. THERE IS NO SEPARATE `/tracking`

(Jono's ruling, 1 September 2026: there is no case where a landing page gets built without tracking, and no case where tracking gets built on a page that is not a landing page. So it lives here and `/tracking` was deleted. Updated the same day: the tag IDs and labels are collected in STEP 0 and the page ships wired. Tracking is never a second prompt at the end of the run.)

**The split:** `/account-setup` step 8 creates the account-level conversion actions and never touches the website. `/landing-page` wires the page to them, so the pages actually produce conversions. Neither does the other's job.

**Read `references/conversion-tracking.md` before wiring any of this** - the setup order, the conversion plan for a service business, calls, Enhanced Conversions, offline import, consent, the verification checklist, audiences, and the rules at the bottom. Do not invent thresholds.

**Nothing goes live before this section passes.** Untracked spend is just donation.

### 1. Every lead path on the page is a counted conversion. All four, if the business has all four.

A service business converts in four ways, and the page wires every one that applies:

- **Phone call from the website (PRIMARY).** Google's phone snippet - a second gtag config call carrying the website-call action's label and `phone_conversion_number` (never the legacy `wcm/loader.js` pair, which defines nothing on a gtag page) - installed right after the Google tag on every page, pointed at the one real number. For ad visitors only, Google swaps the displayed number AND the `tel:` link for a Google forwarding number, routes the call to the real phone, records the duration and ties it to the exact keyword and ad. **Call reporting ON at account level and call recording ON** (the recording is the point - it is how the owner screens the lead, hears which keyword produced a tyre-kicker, and settles a "they never called me back" dispute). Two-party consent applies in many places, so Google's own recorded-call announcement stays on and the owner confirms recording before it is switched on. Rules that make the swap work: the number is plain text (never inside an image), written in ONE consistent format everywhere it appears (display text and `tel:` href match), one number per page, and the business country is on Google's live forwarding-number list (Canada, US, UK, Australia are - check the page, don't trust memory). It can take up to an hour after install before the swap starts serving.
- **Phone call from the ad itself (PRIMARY).** Call assets and call-only ads use a Google forwarding number too - nothing on the page; the conversion action comes from `/account-setup` and `/write-ads` builds the call asset.
- **Form submission (PRIMARY).** Fires the conversion from the form's success event where one exists, with the `/thank-you` URL as the fallback - never both on one action, that double counts. The stashed source fields ride along in the GHL webhook payload, which is what makes Enhanced Conversions and offline import possible later.
- **Calendar booking (NOT a conversion - Jono's ruling, 1 September 2026).** The calendar lives on `/thank-you` only, and everyone who reaches it already fired the form conversion - counting the booking too would be two conversions for one lead, and our own rule bans two primaries for one business event. The booking is follow-through, tracked in GHL (the appointment-booked workflow), never in Google Ads. No `BOOK_APPOINTMENT` action, no booking tag, nothing to verify in Tag Assistant.

Plus, on every page, built in by default: **source capture.** On landing, grab `gclid` plus keyword, campaign and UTM params from the URL and stash them (sessionStorage) so every later action carries its origin. The `tel:` link also fires an event with the stashed keyword to the GHL webhook before dialling, so GHL knows which keyword rang the phone even when Google only counts taps.

### 2. Wire the page to the account's actions. This command NEVER creates them.

`/account-setup` step 8 owns every conversion action - which ones exist, primary or secondary, counting, call-length threshold, Enhanced Conversions, call reporting. This command's job is the other half: making a page that actually FIRES them.

`python3 code/check_conversion_setup.py` was already run in STEP 0 and printed each action with its gtag label. Wire each label into the page now:

- **Form submit** → success event, `/thank-you` as fallback
- **Website call** → Google's phone snippet, after the Google tag, on the one real number
- **Ads call** → nothing on the page; `/write-ads` builds the call asset
- **Offline import** → the page captures `gclid` case-exact and posts it with the lead, which is what makes step 5 possible later

**If a primary the page needs does not exist, STOP and send me to `/account-setup`.** Do not create it from here, do not half-fix it, and do not build the page as if it were tracked. Name the missing action in one line: "there is no website-call action, so every call this page produces is invisible - run `/account-setup` step 8 first."

**The rules the page is checked against** (full detail in `references/conversion-tracking.md`): one primary per real lead path and no more · every primary tied to real money · calls primary for a local service or Google bids half-blind · counting ONE per click on every lead action · never two primaries for one business event, the GA4 import stays secondary · Enhanced Conversions ON · auto-tagging ON · call reporting ON at account level · conversion window matched to the time-lag report · EEA or UK traffic means consent mode v2 with all four signals. Read them back; if any is wrong, that is an `/account-setup` finding, reported here and fixed there.

### 3. ⛔ Verify it live with Tag Assistant, in this run, before the page is called done.

This is the step that gets skipped, so it is a gate. **Do not report the page as finished until I have pasted the Tag Assistant output back to you and you have confirmed it.**

Say this to me, with the link, as soon as the page is deployed or staged:

> Open **https://tagassistant.google.com/** → "Add domain" → paste `[the page URL]` → Connect. A second window opens with the live page in debug mode. In that window:
>
> 1. Submit the form with real details. Watch for the conversion event to appear in the Tag Assistant list.
> 2. Tap the phone number. Watch for the click event.
>
> Then **paste back everything in the left-hand tag list** - tag names, IDs and the "Fired"/"Not fired" state - and I will confirm each one against the account's conversion actions.

When they paste it, check line by line and say plainly which tags are firing, which are missing, and what the fix is for each. Expect and check for: the Google tag (`AW-…`) fired on page load · Conversion Linker present · one conversion request per lead action carrying the right label · **no duplicate request for the same action** (the commonest failure, and it silently doubles every number in the account) · the phone snippet present.

Also verify, and say which of these you could not:

- **The number swap - two stages, and you run stage 1 yourself, in this run.**
  - **The snippet is a gtag config call, not the old loader.** `gtag('config', 'AW-[id]/[website-call label]', { phone_conversion_number: '[the business number]' })`, right after the base config. The label comes off `code/check_conversion_setup.py`. **Do not install `wcm/loader.js` + `_googWcmGet`** - that is the legacy snippet for pages without gtag, and on a gtag page the function never gets defined (found live, 1 September 2026: loader 200, function absent, hours lost).
  - **Stage 1 - the moment the page is deployed. Five minutes, costs nothing, and Google itself gives the verdict.** Open the LIVE deployed page (never localhost) with `?gclid=test` on the URL and read Google's own status flag in the console: `window.google_wcc_status`. It is set by Google's call-tracking script after it asks for a forwarding number, and it is the whole answer:
    - **`"no ad click"` = PASS.** The tag loaded, pulled `call-tracking_9.js`, sent your number, the call label and the click id - and Google declined a number because the gclid is invented, which is exactly what it should do. Nothing left to fix on the page.
    - **A forwarding number served / status success** = serving already.
    - **Flag undefined** = the phone config never registered - check the dataLayer for the `AW-[id]/[call label]` entry carrying `phone_conversion_number`, and that the call-tracking script loaded.
    Run it yourself through the browser tooling where available. **The displayed number will NOT swap at stage 1** - Google only allocates forwarding numbers to genuine ad traffic. Read the flag, say which case it is.
  - **Stage 2 - the definitive one, needs a campaign switched on.** Once a campaign runs, the first real ad visitor sees the swapped number and the call shows in the Google Ads calls report - check it inside the first 48 hours of spend and read it back.
  - **Never click your own ad to test it.** That is invalid-click territory, it costs money, and Google filters it anyway.
  - Honesty note: whether a synthetic gclid alone triggers the swap is practitioner convention, not something Google documents. What Google documents is that the number changes for visitors who arrived from an ad.
- **The webhook.** A test submit ARRIVED in GHL. Not "the code posts to it" - it arrived, and the payload carries `gclid`, keyword and campaign.
- **The calendar** (only if one was wanted, on `/thank-you`). A test booking ARRIVED in GHL. No Google Ads tag on it - the form conversion already counted this lead.
- **The thank-you page.** Fires the form conversion, has the calendar on it, is `noindex` and out of the sitemap.

**Until a real test conversion has been seen in Tag Assistant, tracking is BROKEN, not "probably fine".**

**When every check above has passed, say so in one unmistakable block** - this is how anyone reading the chat later knows tracking is actually finished, not assumed:

> ✅ **TRACKING VERIFIED - [date]**
> Form → fired once, label `AW-…/…`, lead arrived in GHL with gclid
> Call → phone snippet live, stage-1 swap check run (result stated), recording on · stage 2 due in the first 48h of spend
> Booking → test booking arrived in GHL, no Ads tag by design *(or: no calendar - skipped by choice)*
> No duplicates in Tag Assistant. This page can take paid clicks.

Then write the same block, with the date, into CLAUDE.md "## My setup" under the page's URL. A page without this block in My setup has NOT had its tracking verified, whatever the chat said. If a line failed, the block does not get written - name what failed instead.

### 4. The account-level prerequisites (owned by `/account-setup`, verified here)

Do not redo them on every page - check them, and if any is off, say so and send me to `/account-setup` rather than half-fixing it from a page build:
- Auto-apply recommendations OFF both bundles, auto-created assets / AI Max text customization OFF - verify with `code/check_autopilot.py`
- Auto-tagging ON, time zone and currency correct (both permanent - warn loudly if wrong)
- Call reporting ON, call recording ON with the owner's confirmation
- Account links that matter for this business: GBP first, then GA4

### 5. Offline conversions and the warm audience - this is what the page's `gclid` capture is for

When GHL knows a lead became a booked job, that value goes back to Google: the page captures `gclid` on every form and every booking, and it imports through the Data Manager API - `UploadClickConversions` is blocked for new developer tokens since 15 June 2026 and Google calls gclid-only import legacy. Build the warm-pixel audience via `code/setup_warm_pixel_audience.py`: lists need 100 active users on every network to serve, 540-day cap, Customer Match needs about 5,000 to actually run.

### 6. Bidding graduation plan

Record it, don't act yet: Maximise Conversions at launch → tCPA at ~30 conversions/month → tROAS past ~50 with real values. Note it in CLAUDE.md under "## My setup".

## ⛔ THE LAST SWEEP - does every line obey the brand kit?

**Run this AFTER all the proof is in and before the verdict.** (Jono, 2 September 2026.) Proof gets added in a hurry, and a hurried section is where invented colours and one-off font sizes get in. One of them is enough to make the whole page look homemade - and it will not error, because an undefined custom property is legal CSS.

```
python3 code/check_css_integrity.py      # every var(--token) resolves, headings restored
```

Then read the diff by eye, and fix anything that is not in `website/app/ds.css`:

- **No raw colour, anywhere.** No hex, no `rgba()`, no `hsl()`. Greys come from `--ink-*`, brand from `--surface-brand` / `--text-brand`, states from `--status-*`, overlays from `--surface-overlay`. Six things that need to look different get six different GLYPHS, never six hues the kit does not ship.
- **No font declaration that is not a `--type-*` token.** `var(--type-display)`, `--type-h2`, `--type-h3`, `--type-h4`, `--type-body`, `--type-body-lg`, `--type-body-sm`, `--type-caption`, `--type-label`. A one-off `40px/1` is how a page ends up with nine sizes and no hierarchy.
- **No spacing that is not `--space-*`.** The scale runs to 128px; section padding lives at the top of it, not at `--space-8`. Cramped sections are the most common way a correct page still looks cheap.
- **No shadow or radius that is not a token** - `--shadow-sm/md/lg`, `--radius-card/control/input/media`.
- **Surfaces alternate.** `--surface-page` and `--surface-tint` down the page, so it reads as sections rather than one flat wall. If every band is the same, the colour system was skipped.

**⛔ An undefined token is the failure that hides.** `--type-heading` does not exist in this kit; `--type-h2` does. Get one wrong and the declaration is dropped at computed-value time, the element inherits base ink, and the page renders flat with a green build. `check_css_integrity.py` is the only thing that sees it - a real page shipped with four of them before this rule existed.

**Then look at it.** `python3 code/screenshot_page.py <url>` and open both shots. The kit sweep proves the page obeys the system; only your eyes prove it is beautiful. If it obeys the kit and still looks wrong, say so plainly - that is a kit conversation, not a licence to invent values in one page.

## ⛔ THE VERDICT - is this page actually better than theirs?

**Every run ends with a straight answer to that question.** (Jono, 2 September 2026.) The comparison at the start decided what to build; this one says whether it worked, and it is the only part of this command I actually want to read.

**Look at the page first, do not grade it from the code.** `python3 code/screenshot_page.py <url>` writes a desktop and a mobile shot. Open both. The competitor screenshots are already in `context/competitor-pages/`, so put ours beside theirs.

**Count proof elements above the fold** - the same measure `# THE PAGES` ranks them by, so the number is comparable. One point each, and only if a real visitor would see it without scrolling: a star rating with a count · a review platform badge · faces · a named guarantee · a price or range · a delivery date · client logos · a video · a specific number tied to a claim · a licence, insurance or credential.

**Then say it plainly, in this shape:**

```
verdict · <ours> proof elements above the fold vs <best competitor> at <theirs>
- we beat them on · <the two or three things>
- they beat us on · <the honest list>
- rank · <n> of <total advertisers scraped>
- the one thing that would flip it · <the single highest-value gap>
```

**Say "theirs is better" when it is.** A page that loses on proof loses on proof whatever the design looks like, and the fix is going and getting the missing thing - a rating, a case study with a number, a guarantee - not another pass on the copy. Telling me the page is great when SavClicks has nine proof elements above their fold and we have four is the most expensive kind of politeness: I spend real money per click finding out.

**Re-run the verdict after anything is added.** It is a two-minute check and it is the only measure of this page that matters before spend starts.

## ⛔ THE PAGE IS NOT DONE UNTIL THIS PASSES

(Jono, 1 September 2026: the two most important parts of a landing page are where the lead GOES and whether the lead is COUNTED, and a run shipped a page without either.)

The tracking layer is not a section of the build, it is the point of it. A beautiful page that loses the lead is worth less than an ugly one that keeps it. **Do not tell me a page is finished until every line below is verified, out loud, one at a time:**

**Where the lead goes**
- [ ] `LEAD_WEBHOOK_URL` is set, is a real GHL inbound webhook, and is not a placeholder
- [ ] **Test submit sent, and I confirmed it arrived in GHL.** Not "the code posts to it" - it arrived
- [ ] Calendar, if wanted: `GHL_CALENDAR_URL` embedded on `/thank-you` ONLY (never on the landing page), and a test booking arrived in GHL. "No calendar": recorded in My setup, skipped everywhere
- [ ] `BUSINESS_PHONE` is the one real number, identical format in display text and `tel:` href, everywhere on the page
- [ ] The payload carries `gclid`, keyword and campaign, so the lead can be matched back to the click later
- [ ] Speed-to-lead workflow fires: form submit rings my phone, fallback SMS to the lead if I miss it. Tested live

**Whether the lead is counted**
- [ ] Google tag on the page, Conversion Linker present
- [ ] Google's phone snippet installed AFTER the tag, pointed at the one real number
- [ ] **Number swap stage 1 run on the live page** - `window.google_wcc_status` read back plainly (`"no ad click"` = wired, pending live traffic; undefined = phone config never registered; stage 2 queued for the first 48 hours of spend)
- [ ] Call reporting ON and call recording ON, with the announcement, owner confirmed
- [ ] Form conversion fires once - from the success event, or the thank-you URL, never both
- [ ] Thank-you page exists, fires the form conversion, has the calendar on it if one was wanted, is `noindex` and out of the sitemap
- [ ] **Tag Assistant output pasted back and confirmed line by line** - every lead action fired, none twice
- [ ] `code/check_conversion_setup.py` read back: one primary per lead path, calls primary, counting ONE per click
- [ ] Auto-tagging ON, Enhanced Conversions ON
- [ ] `code/check_autopilot.py` clean - auto-apply and auto-created assets still OFF

**The page's shape**
- [ ] No `<header>` in the built page. No `<footer>`. One legal line under the final form
- [ ] Sections run in the blueprint's order, 1 through 14
- [ ] **The H1 names the service, in the ad group's words.** Read the H1 back next to the ad group's pinned headline: the service or promise appears word for word, then the city. A clever line with no service in it ("Your profile is what they see before your website") is a message-match break, no matter how good it reads. Say both strings
- [ ] `noindex`, out of the sitemap, not blocked in robots.txt
- [ ] **City swap verified on the live page:** open `/lp/<slug>?loc=<a real id from geo-map.json>` and read the H1 back with that city in it, then open it with no `?loc=` and read `MAIN_CITY` back. Say both strings

**Say which of these you could not verify and why.** An unverified line is a broken line - say so plainly rather than listing it as done. **Never report a page as finished with an unticked box in this list.**

**Speed to lead - wire it with the page (the single biggest lever on lead-to-booked rate):**
- The form's GHL webhook triggers an auto-dial workflow: GHL calls MY phone the second a form fills, then bridges to the lead - answering in 60 seconds instead of 4 hours is the difference between booked and ghosted
- Walk me through the GHL side, exact clicks: Automation → workflow → trigger: the form's inbound webhook → action: Call (whisper: "new lead from [page]") → fallback SMS to the lead if I miss it ("got your request, calling you shortly")
- If a calendar was wanted, a booking gets its own workflow: confirmation SMS immediately, reminder the morning of
- Test it live with me: submit the form, confirm my phone rings
- Bonus for LSA users: answer speed is ALSO an LSA ranking factor - this system pays twice

**Compliance:** every claim from `context/proof.md` only; check `context/compliance.md` before shipping. No fake countdown timers, no invented reviews - both are CRITICAL violations. **No popup on an ads landing page** - an entry or timed email-capture popup breaks Google's destination policy and your own no-popups rule; the only sanctioned version is desktop exit-intent, never on mobile. Set expectations honestly: Unbounce's 2024 medians are 6.6% all-industry and 2.6% for home improvement, with the top quartile near 20% - the blueprint is built to reach the top quartile, not to promise it.

**Deliver:** the page deployed (or staged), and **write its URL into the ad group's block at the top of `keyword-list.md`** as the `**Landing page:**` line - that is how `/campaign-plan` and `/write-ads` find it, so nobody is ever asked for a URL. If the ad group already has a live campaign, set the final URL on its ads through the API in the same run. The TRACKING VERIFIED block must be in CLAUDE.md "## My setup" before this page sees a single paid click. When clicks arrive but don't convert, `references/cro-cheatsheet.md` is the diagnostic.
