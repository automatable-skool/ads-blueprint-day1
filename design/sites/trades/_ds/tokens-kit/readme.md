# Goodwork Design System

A **template** design system for local service businesses — plumbers, electricians, landscapers, wedding photographers, cleaners, small marketing shops. It is deliberately generic: one brand-neutral visual system that a small business (or an agent building for one) can adopt wholesale and re-skin by editing `tokens/colors.css` and dropping in a logo and photos.

**Sample content is fictional.** The website and app kits use "Northside Plumbing & Heating" (Hamilton, ON) as a stand-in business. Names, phone numbers, licence numbers, reviews and prices are invented placeholders — replace all of it.

## Sources

None. There was no codebase, Figma file, deck or brand guide attached to this brief; the request was for a broadly-applicable template. Everything here was authored from scratch, with two external dependencies:

- **Type:** Archivo (Google Fonts, OFL), loaded from the Google CDN in `tokens/fonts.css`. No licensed webfont binaries were supplied, so nothing is self-hosted — see Caveats.
- **Structural references** supplied by the user: [itsbearcat.com](https://itsbearcat.com/) and its [heating-repair page](https://itsbearcat.com/heating-repair/) (Bearcat Heating and Cooling, Spokane WA), plus four design screenshots — an agency site ("InSync"), a SaaS landing page ("MetaDrive"), a roofing site ("Roofora") and a cleaning site ("TreClean"). Only *structure and pattern vocabulary* were taken: promo strip, pill buttons, pill eyebrow labels, rounded photo cards, chips floating over photography, avatar-cluster social proof, numbered process steps, stat bands, membership cards, dark footers. No colours, logos, mascots, illustrations or copy were reproduced from any of them.

  Where the references disagreed, they split cleanly into two temperaments — bold/photo-led (Bearcat, Roofora, TreClean) and calm/editorial (InSync, MetaDrive) — which is why the template ships two page styles rather than one.
- **Icons:** Lucide (lucide.dev, ISC), 40 SVGs copied from `github.com/lucide-icons/lucide@main` into `assets/icons/`.

## No logo

No logo or brand mark was provided, and none was invented. Wherever a mark would go, the kits set the business name in Archivo Bold at 19px with a small uppercase licence/established line beneath it. Businesses adopting the template drop their own mark into `assets/` and swap that block.

---

## Content fundamentals

The voice is a competent tradesperson talking to a homeowner: plain, specific, unhurried. It never sells; it states facts that happen to be reassuring.

- **Person.** "We" for the business, "you" for the customer. Never "our team is committed to" — say "we answer the phone."
- **Casing.** Sentence case everywhere: headings, buttons, nav, card titles. Uppercase is reserved for eyebrows, form labels and badges (12px, `--track-label`). Never all-caps a heading.
- **Specific over superlative.** "Under two hours on average within Hamilton" beats "fast response". "Quoted $340, charged $340" beats "honest pricing". Every number must be true for the business using the template.
- **Sentence length.** Short, but not clipped into fragments. One idea per sentence, no semicolon stacking.
- **Prices are stated.** "From $149", "$29 / month", "Quoted per job" — never "affordable" or "contact for pricing" unless the price genuinely varies.
- **No exclamation marks. No emoji.** Not in UI, not in copy, not in the app. The system ships no emoji glyphs at all.
- **Buttons are verbs with the object.** "Get a free quote", "Call (905) 555-0142", "Book it", "See our work" — not "Submit", "Learn more", "Click here".
- **Errors and empties are helpful, not apologetic.** "Enter a valid email", "No jobs booked for Thursday yet" — no "Oops!", no "Something went wrong".
- **Punchy, with a straight face.** Headlines can have a bit of swagger ("Winter doesn't quit. Neither do we.", "Heat it. Cool it. Fix it."); the sentence under them is always plain and factual. Never let the joke carry the information.
- **Trust claims are concrete and checkable.** "Licensed & insured" is paired with a licence number; "1-year workmanship warranty" is a real term. Alerts use the same register: "Same-day slots are full until Friday."

Examples, verbatim from the kits:

> Winter doesn't quit. Neither do we.
> Furnaces, AC, heat pumps and mini-splits. Repaired, maintained and installed by a crew that knows the neighbourhood. Same-day service, upfront pricing.
> The cheapest repair is the one you never need. Twice a year, zero drama.
> No overtime fees. Saturday and evening call-outs are billed at the same rate as weekdays.
> We only call about this job.

---

## Visual foundations

### Colour coverage — the section rhythm

The page is **mostly white**. Blue is an event, not a backdrop.

1. **Header** — white, hairline bottom rule, dark text. The graphite promo strip sits above it.
2. **Hero** — the one big block of `--surface-brand` (`--blue-600 #0A7CFF`), bright and full-bleed. White text.
3. **Everything between** — alternating `--surface-card` (white) and `--surface-tint` (`--blue-50 #F2F8FF`, an off-white blue). The tint is barely a colour; it exists to separate neighbouring sections without a rule or a shadow.
4. **Closing CTA** — bright blue again, closing the bracket the hero opened.
5. **Footer** — `--blue-900`, the only dark block on the page.

Two saturated-blue bands per page, at the top and the bottom. `--surface-brand-deep` (`--blue-700`) is reserved for the app UI and small surfaces — **never a page-section background**; mid-page blue slabs were tried and removed for making the page feel heavy.

Never place two tinted sections next to each other, and never tint the section directly under the hero — white has to follow blue so the hero reads as a block rather than the top of a gradient.

**Neutrals must be neutral.** The bands are only half the job: if every placeholder, icon tile, avatar and eyebrow is also blue-tinted, the page reads blue no matter how white the sections are. This was the single biggest cause of "too blue" during design, because a page carries twenty-odd photo slots and only two blue bands.

The trap worth knowing about: the `--ink-*` ramp was originally a *cool* grey (`--ink-100` was #EEF3F9, blue channel 11 points above red). Every placeholder, hairline and sunken surface in both kits draws from it, so the page stayed blue even after the section backgrounds went white — and swapping placeholders from `--blue-100` to `--ink-100` changed almost nothing, because both were blue tints. The ramp is now true grey, a touch warm:

```
--ink-50  #F9F8F6   --ink-400 #9A9995   --ink-800 #272725
--ink-100 #F0EFEC   --ink-500 #73726E   --ink-900 #1A1A19
--ink-200 #E3E2DE   --ink-600 #575754
--ink-300 #C5C4BF   --ink-700 #3F3F3C
```

**Rule: keep R, G and B within about 4 points of each other across the whole `--ink-*` ramp — and in every hardcoded rgba() derived from it.** Two scrims were missed the first time round because they were written as literal rgba values rather than `var()` references: the dialog backdrop (`--surface-overlay`) still dimmed the page navy, and `--scrim-media` laid a saturated blue gradient over every photo. Both are now neutral `rgba(26,26,25,…)`, so photography reads as photography and modals dim rather than tint. If you re-skin the brand hue, grep for `rgba(` in `tokens/` as well as the ramps. If a business re-skins the brand hue, the neutrals stay put — they are what makes the one brand colour read as a deliberate choice rather than a wash. Body text is `--ink-700`, a warm near-black, not a navy.

So, by rule:

| Element | Colour |
| --- | --- |
| `MediaFrame` placeholder fill | `--ink-100` warm grey — **never** `--blue-100` |
| `ServiceCard` icon tile | `--surface-sunken`, glyph in `--text-strong` |
| `AvatarCluster` initial discs | `--surface-sunken`, initials in `--text-body` |
| `ProcessSteps` number chip | `--accent-800` graphite |
| Eyebrow labels (`.gw-label`) | `--text-muted` — the default; don't override to brand |
| Footer | `--accent-900` graphite, not `--blue-900` |

Blue is then load-bearing in exactly four places: the hero, the closing CTA, the membership price panel, and links/prices inline in text.



**Feel.** Bright, high-energy local advertising — clean white paper, a confident bright blue, a graphite accent that lands the action once per screen, heavy headline type and chunky pill buttons. Not a SaaS dashboard, and not muted or "tasteful": a service business needs to look busy, reachable and cheap to call.

**Colour.** Two hues and white. **Bright blue** is the brand and does almost all the work — `--blue-600 #0A7CFF` for the hero and primary buttons, `--blue-700` for the crew band, `--blue-900` for the footer and app sidebar, `--blue-50` for tinted panels. **Graphite** `--accent-800 #1C201E` is the single accent: the promo strip, the money action (book, join, enquire) and active states. Text on it is always white (`--text-on-accent`); `--accent-600` is its readable form on white. It is deliberately a near-black rather than a second hue — that is what the reference sites do, it reads premium, it holds contrast on white *and* on any brand colour, and it means a business can change `--blue-*` without ever restyling the accent. The accent has **four steps only** (900/800/700/600) and no pale tints — it is a near-black used at full strength, so a pale version would only ever be misused. Light neutrals come from `--ink-*`; light brand tints from `--blue-50`/`--blue-100`.

An earlier version shipped a nine-step accent whose pale end (#C2CBD6, #E3E8EE, #F4F6F9) was both blue-grey and unused — it existed only because a ramp "should" have ten steps, and its only real job was tinting icons on the hero, where it quietly added more blue. Removed. Swap the four values to change the accent everywhere. **Cool neutrals** do paper and ink — the page is pure `#FFFFFF`, hairlines `--ink-200`, body `--ink-700`, headings `--ink-900`. Nothing is pure black, and there is deliberately **no warm accent** — no orange, gold or yellow anywhere in the system. Status colours are the only other hues. Full ramps: `tokens/colors.css`.

**Type.** Archivo throughout — one family, five roles. Display 48/1.02 at `-0.032em`, H1 38, H2 29, H3 22, body 16/1.6, small 14, caption 12.5, label 12 uppercase at `0.11em`. Headlines are **black (900)** and tightly tracked — that weight is the loudest thing on the page after the blue. Bold (700) for H3, buttons, labels and the phone number (`--type-phone`, always a `tel:` link); regular (400) for prose. Measure caps at 66ch (`--container-text`).

**Spacing.** 4px-based, from 2 to 128 (`--space-1`…`--space-13`). Cards pad 24, sections breathe 96 (`--section-y`), page gutter 20, container 1200. Controls are 42px tall (34 small, 52 large) — never below 44px for primary mobile tap targets.

**Backgrounds.** Flat colour, always, and the rhythm is **blue at the ends, white in the middle**. The page opens blue — nav straight into a full `--blue-600` hero — then drops to white for the working sections (stats, services, gallery, plan, areas, reviews, FAQ), with one blue band mid-page (the crew section, `--blue-700`) to break the run, and closes blue again (CTA `--blue-600` into footer `--blue-900`). White is the majority; blue marks the beginning, the middle and the end. Four coloured moments, no more — resist a fifth. **No gradients as decoration** — the only gradient is `--scrim-media`, a bottom-up blue scrim for text over photography. No patterns, no textures, no illustration, no blobs.

**Photography.** Photography carries the page — it is the main visual, not a garnish. Real work: vans, crews, before-and-afters, finished rooms, portraits of the people who turn up. Budget generously: a hero cluster of three, a photo on every service card, a four-up job gallery, a crew band with portraits. Bright, daylight, unfiltered — no duotones, no heavy grain, no black-and-white. The system ships **no photography**; `MediaFrame` renders a labelled placeholder slot (`Van & crew`, `Before & after · boiler swap`) until the business supplies real photos. Never substitute stock or generated imagery.

**Borders and rules.** 1px hairlines in `--line-hairline` do most of the structural work; `--line-strong` outlines interactive controls. Section dividers are hairlines, not shadows or spacing alone. The accent appears as a 3px top rule on a single highlighted card and a 2px underline on the active nav item or tab. **Components that can sit on a blue band inherit their text colour** rather than hardcoding light-mode greys — `TrustRow` inherits and takes an `iconColor`, `HoursTable` takes `tone="on-brand"`. Never place a `--text-body` element straight onto blue.

**Corner radii.** Chunky on purpose: **buttons and badges are full pills**, inputs 8px, cards and dialogs 16px, media 20px, checkboxes 4px. Pills plus heavy type are what make the system read as friendly-local rather than corporate.

**Cards.** White, 1px hairline border, `--shadow-sm`, 16px radius, 24px padding. Both border *and* shadow: the border holds the shape on tinted bands, the shadow gives it weight. Hover on a linked card: `--shadow-md`, border darkens to `--line-strong`, lift `translateY(-2px)`, arrow slides 3px.

**Shadows.** Soft, cool-tinted, low opacity — xs/sm/md/lg, plus `--shadow-brand` (a blue-tinted lift used under primary CTAs). `--shadow-inset-press` for the pressed state. No inner shadows on inputs, no glows.

**Interaction states.** Hover *lightens* fills (blue 600 → 500, accent 800 → 700) and tints ghost/secondary backgrounds; it never changes size or weight. Press nudges 1px down with an inset shadow. Focus is a 2px `--blue-600` ring plus a 4px `--blue-200` halo (`--ring-focus`) — the same everywhere, including on blue bands. Disabled is 45% opacity with `not-allowed`. Links thicken their underline from 1px to 2px on hover rather than changing colour dramatically.

**Motion.** 90ms press, 140ms hover/colour, 200ms accordions and card lift, 320ms dialogs. One easing, `cubic-bezier(.2,.6,.2,1)`. No bounce, no spring, no parallax, no scroll-triggered reveals — content is present when the page loads. Fades and 2–4px translations only.

**Transparency and blur.** Almost never. Two sanctioned uses: the dialog scrim (`--surface-overlay` + `--overlay-blur`), and low-alpha white fills and borders (`rgba(255,255,255,.08–.28)`) for photo slots, pills and rules sitting on a blue band — never a light-mode grey on blue. No frosted-glass cards, no translucent nav.

**Layout.** Single 1200px column with a 20px gutter; 3-up service grids, 3-up testimonials, 4-up stat band, asymmetric 2-up for hero, plan card, areas and FAQ. One fixed element: the sticky header (promo bar + nav), so the phone number and the booking button are always on screen. Section rhythm alternates colour and photo weight: **blue** hero (2-up with a photo cluster) → white stat band → white 3×2 photo cards → white 4-up gallery → **blue** crew band → white plan → white areas → white reviews → white FAQ → **blue** CTA → **blue-900** footer. The app kit uses a fixed 236px sidebar with a scrolling content pane. Nothing else pins, floats or follows the scroll — no cookie bars, no chat bubbles, no sticky CTA rails.

---

## Iconography

- **Set:** [Lucide](https://lucide.dev) — 40 glyphs copied into `assets/icons/*.svg` and mirrored as inline path data in `components/core/Icon.jsx`. **Substitution flag:** no icon set was supplied with the brief; Lucide was chosen as the closest match to the system's 1.75px-stroke, rounded-cap drawing style. Swap it if the business has its own set.
- **One primitive.** All icons render through `<Icon name="…" />`. Never inline a hand-drawn SVG, never use an icon font, never use emoji or Unicode glyphs (✓, ★, →) as icons.
- **Stroke and size.** 1.75px stroke at every size. 14–16px inline with text, 18–20px inside controls, 22–28px as a feature mark (service cards use a 20px glyph on a 40px tinted square).
- **Colour.** `currentColor` by default: muted grey in body rows, brand colour on soft-brand chips, accent for stars and single emphasis marks. Never multicolour, never filled — except stars, which fill amber to show a rating.
- **Trade coverage.** The set deliberately spans trades — `wrench`, `hammer`, `paintbrush`, `camera`, `truck`, `leaf`, `zap`, `shield-check` — so one template serves a plumber, a photographer and a landscaper without new assets.
- **Missing a glyph?** Copy the SVG from lucide.dev into `assets/icons/` and add its inner markup to `ICONS` in `Icon.jsx`. Do not draw one.

---

## Index

Root manifest:

| Path | What it is |
| --- | --- |
| `styles.css` | Global entry point — `@import` list only. Consumers link this one file. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `base.css` |
| `components/` | React primitives, grouped by concern (below) |
| `guidelines/` | Foundation specimen cards (Colors, Type, Spacing, Brand groups) |
| `ui_kits/` | Full-screen product recreations |
| `assets/icons/` | 40 Lucide SVGs |
| `thumbnail.html` | Homepage tile for the design system |
| `SKILL.md` | Agent Skills wrapper, for use outside this project |

### Components

Each directory holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, and one `@dsCard` HTML.

- **`components/core/`** — `Icon`, `Button`, `IconButton`, `Card`, `Badge`, `Tag`
- **`components/forms/`** — `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`
- **`components/navigation/`** — `Tabs`, `StepIndicator`
- **`components/feedback/`** — `Dialog`, `Alert`, `Toast`, `Tooltip`
- **`components/marketing/`** — `ServiceCard`, `TestimonialCard`, `Rating`, `StatBlock`, `TrustRow`, `StatBand`, `PromoBar`, `PlanCard`, `ProcessSteps`, `AvatarCluster`, `ContactBar`, `HoursTable`, `FAQItem`, `MediaFrame`

**Intentional additions** (not from a source inventory — this was a from-scratch brief):
- `Icon` — required wrapper for the Lucide glyph set.
- `MediaFrame` — the template ships no photography, so photo slots need to be visible and labelled.
- The whole `marketing/` group — a local-service business lives or dies on services, reviews, hours, plans and a phone number; those are its real primitives. `PromoBar`, `StatBand` and `PlanCard` come straight from the reference site's structure. `MediaFrame` is used heavily — every photo on the site is one.

### UI kits

**Two page styles ship, one component set.** Which one a business uses depends on how its customer decides:

- `ui_kits/website/` — **bold**, for trades: plumbers, HVAC, roofers, electricians, cleaners, landscapers. Blue hero band, photo-led service cards, stat band, numbered process steps, urgency in the copy, a phone number that never leaves the screen, four-step booking dialog. Customer is choosing on speed and trust. See `ui_kits/website/README.md`.
- `ui_kits/website_studio/` — **calm**, for studios and professionals: photographers, designers, marketers, consultants, salons, therapists. White throughout, centred hero, portfolio grid, publication logos, generous whitespace, an enquiry form rather than a booking button. Customer is choosing on taste and portfolio. See `ui_kits/website_studio/README.md`.

Both use identical tokens and components — the difference is colour coverage, alignment, density and copy register, not a second design system. `ui_kits/website_studio/README.md` has the full side-by-side table.
- `ui_kits/jobs_app/` — the dispatch back office: sidebar, today's schedule with tabs, job detail, quote builder, new-job and send-quote dialogs. Customers / Invoices / Messages are deliberately blank. See `ui_kits/jobs_app/README.md`.

## Caveats

- **Fonts are CDN-loaded, not self-hosted.** No licensed binaries were provided. If you have Archivo webfont files, put them in `assets/fonts/` and replace the `@import` in `tokens/fonts.css` with `@font-face` rules.
- **No logo, no photography.** Both are placeholders by design; see above.
- **Sample business is fictional.** Do not ship the copy, prices, reviews or licence number as-is.
- **Two surfaces only.** A website and a dispatch app. If a business needs a customer portal, an invoice PDF or a slide template, those are unbuilt.
- **Colour took many rounds** (deep green → lighter → blue → yellow → gold → bright blue). The settled direction is **bright blue + one graphite accent on a mostly-white page**, with **no warm accent** — orange, yellow and gold were each explicitly rejected. Do not reintroduce them.

### Re-skinning for another business

This is a template: the palette is a *rule*, not a fixed set of hex codes. `guidelines/palette-formula.html` documents it. Every blue step is one lightness/chroma rung on a single hue; to rebrand, regenerate the `--blue-*` ramp at a new hue. The accent is hueless graphite, so it needs no adjustment at all — that is why it was chosen. Contrast pairings, hover steps and tints then hold automatically, because they were derived rather than hand-picked. The shipped default is a true blue.
