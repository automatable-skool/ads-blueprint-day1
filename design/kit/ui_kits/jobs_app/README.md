# Dispatch app kit — the back office

What the owner actually looks at all day: today's board, one job in detail, and the quote they need to get out before dinner. Same tokens and components as the website kit, denser layout.

Sample data is fictional.

## Files

| File | Contents |
| --- | --- |
| `index.html` | Mounts the app; owns view / tab / selection / dialog / toast state |
| `AppShell.jsx` | `AppShell` — blue-900 sidebar with counts, top bar, content pane |
| `Screens.jsx` | `Schedule`, `JobDetail`, `QuoteBuilder`, `Placeholder`, plus the `JOBS` fixture |

## What's interactive

- Sidebar switches between Schedule, Quotes and the deliberately-blank screens.
- Schedule tabs: Today / This week / Unassigned (the last filters to jobs with no tech and shows a caution alert).
- Clicking a job row selects it and updates the detail card.
- **New job** opens a four-field dialog and confirms into a toast.
- **Send quote** opens a confirmation dialog, then toasts.

## Deliberate blanks

Customers, Invoices and Messages render a `Placeholder` explaining they aren't part of the template. Nothing was invented to fill the sidebar.
