# UI kit — local service website

A four-screen click-through marketing site for a trades / professional-services business. It is the reference application for this design system: every screen is composed from the published components, with no bespoke UI.

Open `index.html`. The header nav switches screens in place.

| File | Screen | Notes |
| --- | --- | --- |
| `index.html` | Shell | Header, footer, in-page routing between the four screens |
| `HomeScreen.jsx` | Home | Hero with inline QuoteForm, service grid, proof stats, three-step explainer, reviews, FAQ, ink CTA |
| `ServicesScreen.jsx` | Services | Filterable service grid, emergency-cover block, service detail FAQ |
| `PricingScreen.jsx` | Pricing | Per-visit vs care-plan toggle, three pricing cards, small-print FAQ |
| `ContactScreen.jsx` | Book a visit | Three-step booking flow, direct contact card, areas covered, callback dialog |
| `shared.jsx` | — | `Photo` placeholder, `Section` wrapper, and the sample service / review / area data |

## Conversion structure

Each screen keeps a phone number and a quote path visible at all times: the ink strip in the header, the header CTA, an in-content CTA, and the footer contact block. The home hero puts the quote form above the fold rather than below the copy — for this category, form-in-hero consistently outperforms a scroll-to-form.

## Imagery

No photography ships with this system. Every image position renders a labelled `Photo` placeholder describing the shot to commission. Replace them with the business's own photos — real vans, real people, real jobs. Stock photography undercuts the trust the rest of the page is trying to build.
