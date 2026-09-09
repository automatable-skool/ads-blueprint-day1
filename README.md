# Google Ads Blueprint Pro

Run your own Google Ads with Claude Code - plan, build, launch, and optimize to profit. 16 blueprints, one repo, working API scripts included (so you never wait hours for Claude to build them).

## Quick start

1. Download this folder (or clone it) anywhere on your computer
2. Open a terminal in the folder and run `./setup.sh` once - it copies the starters into your working files. They are yours from then on; git never touches them
3. Run `claude`
4. Type `/api-setup` - submit the API application day 1 (it bakes while you build). Then `/audit` if you already run ads, or `/context-layer` if you are starting fresh

That is it. Each command walks you through exactly what it needs, the first time you run it.

## The unlock schedule

- **Days 1-7 (trial):** everything WITHOUT a 🔒 - account created, applications baking, keywords clustered into single-theme ad groups, a complete paused campaign, a converting page with tracking wired.
- **🔒 Day 7 (first billing):** the four machines - the daily search-terms pass, champion vs challenger, scale the map, and the client proposal. They land in this folder as a `git pull`.
- **Month 2 (day 30):** the optimization layer - remarketing, asset analytics, offline conversions, the dashboard.

## The path (run them in this order - it mirrors the course)

| Step | Command | What it does |
|------|---------|--------------|
| 1 | `/api-setup` | Google Ads API Basic Access - the application, step by step. Submit day 1, it bakes while you build |
| 2 | `/audit` | Already running ads? The ROAS audit - wasted spend ranked by dollars, one approval fixes it all |
| 3 | `/context-layer` | The proof file: business facts + proof, scraped then interviewed. Every ad and page reads it |
| 4 | `/keywords` | Every keyword worth bidding on, then the STAG stage: single-theme ad groups written as your account structure |
| 5 | `/account-setup` | Birth the account right: Expert Mode, the permanent settings, billing, foundation, the universal negatives |
| 6 | `/landing-page` → `/standard-pages` | The money page per ad group with tracking wired, then thank-you, the sitelink targets and the legal pages |
| 7 | `/campaign-plan` | The campaigns built through the API - everything lands PAUSED |
| 8 | `/write-ads` | The ad library + two RSAs per ad group, created PAUSED. `/scrape-competitors` first for their live ads |
| 9 | `/lsa-setup` | Local Services Ads - verification submitted, profile built (local lane) |
| 10 | `/search-terms` | 🔒 Day 7 · The daily pass - yesterday's searches googled for intent, junk blocked, converting terms harvested as keywords |
| 11 | `/ad-tests` | 🔒 Day 7 · Champion vs challenger, fortnightly - judged on cost per conversion, zeros swapped, winner promoted |
| 12 | `/scale-account` | 🔒 Day 7 · The finale - the whole account stamped from the proven template, budget-fit checked |
| 13 | `/proposal` | 🔒 Day 7 · The client proposal - built from public data, live on your own site, 7-day expiry |

**Around the path** (run when needed):

| Command | What it does |
|---------|--------------|
| `/publish` | Ship it: deploy the pages, wire the domain, set the final URLs on the ads |
| `/scrape-competitors` | Their live ads - table stakes, gaps, and a scored swipe file |
| `/audit` | Re-run any time - find everything, review the report, one approval fixes it |

## Requirements

- [Claude Code](https://claude.com/claude-code) installed
- Python 3.9+ (`pip install google-ads python-dotenv requests`)
- A Google Ads account (even brand new - `/account-setup` and `/api-setup` handle the wiring)
- Google Ads API Basic Access - `/api-setup` submits the application; everything paste-ready works while you wait
- WordPress users: the Novamira plugin + connection (lets Claude build your landing pages directly on your site) - optional, the Next.js lane needs nothing

Stuck? Post in the community - Help board answers same-day.
