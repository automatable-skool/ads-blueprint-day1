# Website kit — customer-facing marketing site

A single-page local service site, structured the way high-converting trade sites are: an offer strip, a phone number that never leaves the screen, proof before persuasion, and one booking action repeated all the way down.

Sample business is fictional (Northside Heating & Cooling, Hamilton ON). Replace all copy, prices, licence numbers and reviews.

## Files

| File | Contents |
| --- | --- |
| `index.html` | Mounts the site and owns route / booking / toast state |
| `Chrome.jsx` | `SiteHeader` (promo bar + sticky blue nav + phone + Book instantly), `SiteFooter` |
| `Sections.jsx` | `Hero`, `Proof` (stat band), `Services`, `Gallery`, `Crew`, `Club`, `Areas`, `Reviews`, `Questions`, `ClosingCTA` |
| `BookingFlow.jsx` | `BookingFlow` — four-step dialog: job → details → time → confirm |

## What's interactive

- Nav links set the active item (amber underline); they don't navigate — this is a single view.
- **Book instantly**, hero CTA, every service card, **Join now** and the closing CTA all open the booking dialog.
- The dialog steps forward and back through the step indicator, then confirms into a toast.
- FAQ rows expand; the first is open by default.

## Section order, and why

1. **Promo bar** — one seasonal offer, the only full-width cyan.
2. **Nav** — blue-800 band, phone number and one accent button. Sticky.
3. **Hero** — full `--blue-600` band: review pill, 48px white headline, one sentence, two buttons, three-photo cluster, trust row.
4. **Stat band** — four figures on white with a bottom hairline (`tone="plain"`), so the hero reads as one solid blue block.
5. **Services** — 3×2 grid of `ServiceCard`, each with a 16:9 photo slot and the icon inset over it.
6. **Gallery** — four-up recent jobs; before/after belongs here.
7. **Crew** — the mid-page blue band (`--blue-700`): big crew photo, three portraits, "who turns up" copy.
8. **Comfort Club** — `PlanCard`, the one recurring offer.
9. **Service areas** — `Tag` chips; local SEO surface.
10. **Reviews** — average score plus three verbatim quotes.
11. **Questions** — FAQ next to a member callout.
12. **Closing CTA** — the one blue band, book or call.
13. **Footer** — blue-900, service columns, contact, hours.

Four coloured moments: nav + hero (blue, top), crew band (blue, middle), CTA + footer (blue, bottom). Everything between is white.

## Photography

Every image is a labelled `MediaFrame` placeholder — 14 slots in total (`Crew & van`, `On the job`, `Finished install`, six service cards, four gallery shots, the crew band and three portraits). The template ships no photography; drop real job photos in and the layout is unchanged.
