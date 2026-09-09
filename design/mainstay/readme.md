# Mainstay Design System

A light, minimal, conversion-focused design system for **local service businesses** — trades (plumbing, heating, electrical, carpentry, decorating, grounds) and the professional services that sit alongside them (property legals, accounts, compliance). It is built to be handed to thousands of small operators as a website template: opinionated enough that a non-designer cannot make it ugly, plain enough that any business name can sit on top of it.

**Mainstay is a placeholder brand name, not a real company.** No logo, photography, brand guidelines, codebase or Figma file were supplied for this system — it was authored from a written brief. Everywhere a logo would go, the business name is set in type (see *Wordmark*). Every image position is a labelled placeholder. Replace the name, the phone number and the photos; keep everything else.

## Sources

| Source | Detail |
| --- | --- |
| Brief | Chat brief only: "design system for a local service business (trades + professional services)… simple, minimal, modern, designed for conversions, beautiful, light, one accent colour, whites and shades." |
| Codebase | None provided. |
| Figma | None provided. |
| Decks / documents | None provided. |
| Fonts | **Substituted.** No brand font files were given. Figtree (Google Fonts, SIL OFL) is used as the single core face, loaded from `fonts.gstatic.com` in `tokens/fonts.css`. If you have real brand fonts, send them and the swap is a one-file change. |
| Icons | **Substituted.** [Lucide](https://lucide.dev) (ISC licence), copied into `assets/icons/` from `github.com/lucide-icons/lucide` at `main`. 43 glyphs chosen for trades and conversion contexts. |

## What the product is

One business, several service lines, one phone number. The website exists to do three things, in order:

1. Get the visitor to call, or send a quote request.
2. Prove the business is licensed, insured, local and reviewed.
3. Publish prices, because most competitors won't.

Everything in this system serves that hierarchy. The only surface is a marketing website (see `ui_kits/website/`) — there is no app, no dashboard, no docs site.

## Content fundamentals

**Voice.** Plain, specific, local. The register is a competent tradesperson who answers the phone themselves — direct, unhurried, never salesy.

- **"We" for the business, "you" for the customer.** "We'll call you back within the hour." Never "the company" or "our clients".
- **Sentence case everywhere.** Headings, buttons, labels, nav. The only uppercase is the 12px eyebrow label (`--type-eyebrow`, +8% tracking).
- **Short sentences. Concrete nouns. No adjectives you can't evidence.** Write "17 years, 6,400 jobs, 4.9 from 312 reviews", not "trusted", "leading" or "premier".
- **Numbers over claims.** A price, a response time, a licence number, an arrival window. If it can be measured, publish the measurement.
- **No jargon, no industry throat-clearing.** Write: *"Blocked drain? We'll be there today. Fixed price, quoted before we start."* Not: *"Leveraging decades of industry-leading expertise to deliver best-in-class plumbing solutions."*
- **Objection-handling copy sits next to the button, not in a FAQ ten screens down.** "No call-out fee. No obligation." under the submit; "Answered 7am–8pm, 7 days" under the phone number.
- **Emoji: never.** Not in headings, buttons, badges or reviews. Icons carry the same job with more dignity.
- **Contractions yes** ("we'll", "won't", "it's"). **Exclamation marks no.**
- **Headlines are promises about time or certainty**: "Fixed today, not next week." / "Prices published, not negotiated." / "Two minutes, then we'll call to confirm."
- **Button labels are first-person outcomes**: "Get a free quote", "Book same-day", "Request my quote". Never "Submit", "Learn more" on a CTA, or "Click here".

## Visual foundations

**The idea:** white paper, hairline rules, one warm accent. Nothing glows, nothing floats far, nothing moves without being touched.

- **Colour.** A warm-leaning neutral ramp (`--n-0` … `--n-950`) does almost all the work; **clay** (`--accent-500` `#C1552F`) is the single chromatic brand colour and is reserved for: primary buttons, links, eyebrow labels, icon marks, the rating star, active tab underlines and selected states. Four muted status hues (green / amber / red / blue) appear only as feedback. There is no dark mode and no second brand hue. At most two background colours on a page: white and `--n-50`; ink (`--n-950`) appears only in the header strip and at most one CTA banner.
- **Type.** Figtree at five weights. Display 44→64px fluid at -3% tracking; headings -1.8%; body 16px/1.65 capped at ~60 characters; lead 18px/1.6. Labels are 12px semibold uppercase at +8%. No second family — hierarchy comes from weight and size, never from a decorative face.
- **Spacing.** 4px base. Sections breathe on a fluid `--section-y` of 56–104px; the container is 1160px with a 24px gutter. Inside cards: 24px default, 32px for feature cards. Vertical rhythm is generous — whitespace is the system's main luxury signal.
- **Backgrounds.** Flat colour only. **No gradients, no textures, no patterns, no hero images behind text, no full-bleed photography.** Sections alternate white / `--n-50` to segment the page. Photography, when a business supplies it, sits inside a rounded 14px frame beside the copy — never behind it.
- **Imagery.** Real, warm, daylight photographs of actual people, vans and finished jobs. Slightly warm white balance, no filters, no grain, no black and white. Stock photography of models in hard hats is explicitly off-brand. All image slots in this system ship as labelled grey placeholders describing the shot to commission.
- **Borders.** 1px `--border-subtle` (`--n-200`) is the default separator; `--border-default` (`--n-300`) on form controls; 1.5px on checkbox and radio marks so they read at a glance. Hairlines, not boxes: prefer a single top/bottom rule over a full outline where it will do.
- **Cards.** White, 14px radius, 1px hairline border, no shadow by default. `elevated` swaps the border for `--shadow-sm`. Interactive cards lift `translateY(-2px)` and go to `--shadow-md` on hover. Never nest an elevated card inside another.
- **Shadows.** Four steps, all neutral-black at low alpha and generously blurred: `xs` (control lip), `sm` (resting card), `md` (hover, quote form), `lg` (dialogs, toasts). No coloured shadows, no inner glows. One `--shadow-ring-focus` (3px clay at 28%) is the focus treatment on every control.
- **Radii.** 4 / 6 / 10 / 14 / 20 / 28 / pill. Controls 10px, cards 14px, banners and dialogs 20px, badges and chips pill. Consistency matters more than the exact value — never mix three radii in one component.
- **Hover states.** Buttons darken one accent step (500→600); outline and ghost buttons take an `--n-50` wash; links darken and gain a full-opacity underline; cards lift and deepen their shadow; nav links go from body colour to ink. Nothing changes size on hover except cards (2px).
- **Press states.** `scale(0.985)` at 90ms plus one further colour step (600→700). No ripples.
- **Focus.** Always visible: a 3px clay ring at 28% opacity, or the 2px browser outline offset by 2px on non-control elements. Never removed.
- **Animation.** One easing curve (`--ease-out`, `cubic-bezier(.22,.8,.24,1)`) and four durations: 90ms press, 140ms hover, 200ms reveal, 320ms accordion. Fades and short translations only — no bounce, no spring, no parallax, no scroll-triggered reveals, no counters ticking up. `prefers-reduced-motion` zeroes every duration.
- **Transparency and blur.** Exactly two places: the sticky header (white at 86% with a 12px backdrop blur) and the dialog scrim (ink at 42% with a 2px blur). Nowhere else — no frosted cards, no glassmorphism.
- **Layout rules.** One sticky element per page (the header, 76px plus a 38px ink strip). No sticky footers, no floating chat bubbles, no interstitials. The phone number appears at least three times per page: header strip, header bar, footer. On mobile the nav collapses to a burger but the phone number never does.
- **Tap targets.** 44px minimum on every interactive element, including checkbox and radio rows.

## Iconography

- **Set:** Lucide, copied into `assets/icons/` (43 SVGs) and inlined by the `Icon` component. 24×24 grid, 2px stroke, round caps and joins, `currentColor`.
- **Sizes:** 16 inline with small text, 20 default, 22–24 in buttons and service marks, 18 in trust bars. Stroke stays at 2 up to 32px, then 1.75.
- **Fills:** stroke-only everywhere, with one exception — the rating star in `Stars`, which is filled clay.
- **Colour:** icons inherit text colour by default. Clay is used for icons that mark a conversion or reassurance point (phone, shield-check, circle-check, service marks); neutral elsewhere.
- **Service glyphs:** droplets (plumbing), thermometer (heating), plug-zap (electrical), hammer (carpentry), paint-roller (decorating), leaf (grounds), scale (legals), calculator (accounts), hard-hat, truck, ruler, wrench.
- **No emoji. No unicode symbols as icons** (✓ ★ → are all drawn glyphs). **No icon fonts.** Never hand-roll an SVG — if a glyph is missing, take it from Lucide and drop it in `assets/icons/`.
- **Logo:** none. The wordmark is the business name in Figtree Bold at -3.5% tracking, optionally with a second word in clay (`Main`**`stay`**). Do not draw a mark.

## Files

| Path | What it is |
| --- | --- |
| `styles.css` | Entry point — `@import` list only. Consumers link this one file. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `base.css` (element resets + `.ms-container`, `.ms-eyebrow`). |
| `components/` | React primitives, grouped by concern. Each has `.jsx`, `.d.ts` and `.prompt.md`, plus one card HTML per directory. |
| `guidelines/` | 16 foundation specimen cards (colour, type, spacing, shape, motion, brand). |
| `ui_kits/website/` | The four-screen click-through marketing site. Start at `index.html`. |
| `templates/service-website/` | Starting template consumers copy: a one-page conversion site (`ServiceWebsite.dc.html`) with business name, phone and closing-banner tone as tweaks. |
| `assets/icons/` | 43 Lucide SVGs. |
| `SKILL.md` | Agent-skill wrapper for use outside this project. |

## Components

**core** — `Icon`, `Button`, `IconButton`, `Badge`, `Tag`, `Card`, `Tabs`, `Tooltip`, `Dialog`, `Toast`
**forms** — `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`
**marketing** — `SectionHeading`, `Stars`, `ServiceCard`, `TestimonialCard`, `StatBlock`, `FAQItem`, `CTABanner`, `TrustBar`, `PricingCard`, `QuoteForm`
**navigation** — `SiteHeader`, `SiteFooter`

### Intentional additions

No source defined a component inventory, so this is an authored set: the standard primitives plus the marketing and navigation families a service-business site cannot be built without. Two deliberate additions worth naming:

- **`Icon`** — a wrapper over the copied Lucide glyphs, so no screen ever pastes raw SVG.
- **`QuoteForm`** — the conversion centrepiece. It is a composite rather than a primitive, but every page in the category needs the same five fields and the same success state, and leaving it to each implementer is where these templates usually fall apart.

## Using it

```html
<link rel="stylesheet" href="styles.css">
```

```jsx
import { Button } from "./components/core/Button.jsx";
import { QuoteForm } from "./components/marketing/QuoteForm.jsx";

<Button size="lg" iconRight="arrow-right">Get a free quote</Button>
```

Rules of thumb: one primary button per view; one ink surface per page; never introduce a second accent colour; never remove the focus ring; keep body copy under 60 characters a line; and if you are adding a section, ask first whether it moves someone closer to calling.
