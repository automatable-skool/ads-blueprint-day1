# Calm page style — studios and professionals

The second of the template's two page styles. Same tokens and components as the bold style; different temperament.

**Use it for:** photographers, designers, marketers, consultants, salons, therapists, tutors, event planners — anyone whose customer is choosing on taste and portfolio rather than urgency.

**Don't use it for:** emergency trades. Nobody with a burst pipe wants a centred hero and generous whitespace.

Sample business is fictional (Halden & Reyes, a Hamilton photography studio).

## What makes it "calm"

| | Bold style | Calm style |
| --- | --- | --- |
| Hero | Full blue band, left-aligned, 2-up with photo cluster | White, centred, one wide photo below |
| Colour | Blue hero, blue mid-band, blue CTA + footer | White throughout; one `--surface-sunken` band, dark footer |
| Nav | Blue, phone number, accent CTA | White, pill nav items, one primary CTA |
| Type | Headline shouts, short punchy lines | Same weights, longer sentences, more room |
| Proof | Stat band, review count, licence badges | Publication logos, avatar cluster, quiet stats |
| Density | 13 sections, offer-driven | 10 sections, portfolio-driven |
| Promo bar | Yes | No |

## Files

| File | Contents |
| --- | --- |
| `index.html` | Mounts the site; owns route / enquiry / toast state |
| `StudioChrome.jsx` | `StudioHeader` (translucent white, pill nav), `StudioFooter` (dark, four columns) |
| `StudioSections.jsx` | `Eyebrow`, `StudioHero`, `StudioProof`, `StudioWork`, `StudioServices`, `StudioProcess`, `StudioWords`, `StudioPricing`, `StudioQuestions`, `StudioEnquiry` |

## Section order

1. **Header** — sticky, translucent white, pill nav, one primary CTA.
2. **Hero** — centred: eyebrow pill, 48px headline, one sentence, two buttons, avatar cluster, then a 21:9 photo.
3. **Featured in** — publication wordmarks in `--ink-300`. Delete it if the business has no press.
4. **Selected work** — four 3:4 portrait frames. The portfolio is the pitch.
5. **Services** — three cards, first one accented, each with a price and an enquire link.
6. **Process** — tall photo beside `ProcessSteps layout="rows"`.
7. **Kind words** — the one tinted band: three testimonials plus two quiet stats.
8. **Album club** — `PlanCard`, the recurring offer.
9. **Questions** — FAQ beside service-area chips.
10. **Enquiry** — real form in a card, next to a studio photo.
11. **Footer** — dark, four columns.

## What's interactive

- Pill nav marks the active item; **Enquire** (header, hero, every service card, the plan) opens the enquiry dialog.
- The in-page enquiry form's submit button toasts directly.
- FAQ rows expand; the first is open.

## Photography

11 labelled `MediaFrame` placeholders. This style leans hardest on real photography — with placeholders it looks sparse by design, and comes alive as soon as a portfolio is dropped in.
