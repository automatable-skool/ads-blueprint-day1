# Google Ads Blueprint Pro

You are the Google Ads engine for the business described in `context/`. Python scripts in `code/` do the heavy API work - always prefer running an existing script over writing a new one. Best-practice specs live in `references/` - read the relevant spec BEFORE building anything, and follow it exactly.

## ⛔ FIRST RUN: `./setup.sh`, before any command

The repo ships **starters**, not your files. `setup.sh` copies them into place once:

- `website-starter/` → `website/`
- `starters/context/...` and `starters/keyword-list.md` → the repo root

**Everything it creates is gitignored, and that is the point.** Your business facts, your proof file, your keyword list, your ad library and your entire site are yours alone - git never tracks them. So when an update ships, `git pull` lands cleanly instead of colliding with a month of your work.

**Updating later:** `git pull`. That is the whole procedure. If it ever reports a conflict, something that should be yours got tracked - say so rather than resolving it by hand.

**Never edit `website-starter/` or `starters/`.** They are the shipped templates. Edit `website/` and your root files.

## Compliance rule (MANDATORY)

Read `context/compliance.md` in full BEFORE making ANY change - before drafting, writing, building, or pushing anything to Google Ads or a landing page (ads, keywords, assets, pages). Don't rely on memory of it from earlier in the session; open the file again at the start of every command that changes something. Then check every change against `context/compliance.md` and the NEVER SAY list in `context/proof.md`. If it breaks a CRITICAL rule: stop, don't push, and say exactly which rule and how to fix it. MINOR rule: make the change but mention the issue in one line. Never block on a MINOR rule.

Two guardrails that never bend:
- Never use a number or claim in any ad or page unless it appears in `context/proof.md`.
- Never write an ad or page for a service or area that isn't in `context/business.md`.

## The commands, grouped

**Setup - the account itself**
| Command | What it does |
|---|---|
| `/account-setup` | Birth the account correctly - the permanent decisions, the traps |
| `/api-setup` | Google Ads API access - Cloud project, Explorer today, Basic in minutes |
| `/lsa-setup` | Local Services Ads - verification submitted, profile built (local lane) |

**Research - what to bid on**
| Command | What it does |
|---|---|
| `/keywords` | Every service keyword worth bidding on with real volume + click cost, then the STAG stage: single-theme ad groups, SERP-verified, written at the top of keyword-list.md as the account structure |
| `/context-layer` | Proof + business facts, scraped then interviewed - every ad and page reads this |
| `/scrape-competitors` | Their live ads - table stakes, gaps, and a scored swipe file |

**Build - what goes live**
| Command | What it does |
|---|---|
| `/campaign-plan` | Build the campaigns through the API - everything lands PAUSED |
| `/write-ads` | The ad library + two RSAs per ad group, created in the account PAUSED |
| `/landing-page` | A converting page per ad group - message match is the whole game |
| `/standard-pages` | The pages the campaign needs behind it - thank-you, the six sitelink targets, the legal three |
| `/publish` | Ship it: deploy the pages, wire the custom domain, set the final URLs on the ads |

**Check + fix**
| Command | What it does |
|---|---|
| `/audit` | Find everything, you review the report, then one approval fixes it all - dry-runs shown, your numbers still asked. The dashboard is built by three scripts, never by hand: `audit_dashboard_data.py --config` → `cro_score.py` (Lighthouse via `psi_speed.py`) → `build_audit_dashboard.py` |

## The flow (recommended order)

1. `/account-setup` - birth the account right: Expert Mode (skip the Smart-campaign trap), the two PERMANENT settings (time zone + currency), billing, 2FA, then the foundation (conversion goals, autopilot off) + the universal negatives. New accounts start here; existing accounts run it as a verification pass.
2. `/api-setup` - connect the Google Ads API, day 1 (since 10 September 2026 there is no developer token and no form: Explorer access is instant and runs everything except the Planner pull, Basic lands minutes after brand verification). **No setup command exists** - every credential is just-in-time: each command checks its own prerequisites the first time it runs (env check + `code/test_connection.py` before any API work) and walks the user through exactly what it needs, right there. Commands record state in CLAUDE.md "## My setup" so nothing gets asked twice.
3. `/context-layer` - scrape + interview: business facts and proof
4. `/keywords` - the keywords worth bidding on, qualified on Planner data, then clustered into single-theme ad groups → one file, `keyword-list.md`, account structure at the top
5. `/campaign-plan` - build campaigns through the API (everything lands PAUSED)
6. `/write-ads` - the ad library + two RSAs per ad group, created in the account PAUSED via `code/push_ads.py`
7. `/landing-page` - a converting page per ad group, then `/standard-pages` in the same session for the thank-you page, the six sitelink targets and the legal three (`/write-ads` fails later without them, and the page's tracking gate cannot be verified without `/thank-you`). **Tracking lives inside `/landing-page`, in the same run** - the webhook, phone number, calendar link and Google tag ID are collected in its first message, the page ships wired to every lead path (form, website call, ads call), and it is verified in Tag Assistant before the page is called done. There is no separate `/tracking`
8. `/publish` - deploy everything, wire the domain, set the final URLs on the ads
9. Any time: `/audit` (find everything, review, one approval fixes it all) · `/write-ads scout` · `/scrape-competitors`

## Hard rules

- **Link only what the member needs to open - never inventory code (CRITICAL).** A response links a file ONLY when the member is expected to click it: a page to preview (prefer the localhost URL), a config they must paste a value into, a registry or report worth reading. Use markdown links relative to the project root - `[keyword-map.md](keyword-map.md)` - never bare absolute paths. Everything else - components, page code, internals - is never listed. No "Files changed:" blocks, no linking 12 files one by one: nobody reads a code tour, and it buries the one thing that matters. Say what changed in outcomes ("all seven sections rebuilt, preview here"), and if a run wrote many pages, link the registry that lists them, not each page.
- **Every page you build gets a URL I can CLICK, every time (CRITICAL).** A link to the source file lets me read code. I want to see the page. So any command that creates or edits a page ends with the viewable URL, not just the file path:
  - **Local first, always:** `http://localhost:3000/services/drain-cleaning`. If the dev server is not running, start it (`npm run dev` in `website/`) and give me the link - do not tell me to start it myself.
  - **Live URL too, once it exists:** after `/publish`, give both, and say which is which.
  - **One line per page, clickable, no exceptions.** Built twelve pages? Twelve links. "12 pages created" with no URLs is not an acceptable answer, same as the file-link rule.
  - **Never describe a page instead of linking it.** "The drain cleaning page is live" is useless. `http://localhost:3000/services/drain-cleaning` takes one second to check and is the only way I can actually review the work.
  - This applies to `/build-website`, `/service-page`, `/blog-post`, `/review-generator`, `/scale-map` and the ads `/landing-page` - anything that puts a page on a screen.
- **Everything you build IN the Google Ads account gets a clickable link too (CRITICAL).** Same rule as pages, same reason: I want to open it and look at it, not read that it exists. Any command that creates or changes something in the account ends with a link straight to that thing in the Google Ads UI - campaign, ad group, keywords, ads, conversion action, negative list, budget, whatever was touched.
  - **Build the link from the customer ID in `.env`**, digits only, no dashes. The account ID is the `__c` parameter:
    - Campaigns · `https://ads.google.com/aw/campaigns?__c=CUSTOMERID`
    - Ad groups in one campaign · `https://ads.google.com/aw/adgroups?campaignId=CAMPAIGNID&__c=CUSTOMERID`
    - Keywords · `https://ads.google.com/aw/keywords?campaignId=CAMPAIGNID&__c=CUSTOMERID`
    - Ads · `https://ads.google.com/aw/ads?campaignId=CAMPAIGNID&__c=CUSTOMERID`
    - Conversions · `https://ads.google.com/aw/conversions?__c=CUSTOMERID`
  - **The build scripts print the links.** Any script that creates an entity gets the ID back in the API response, so it ends by printing the deep link for every entity it made. Never hand back a bare resource name or a numeric ID on its own - `customers/1234/campaigns/5678` is not something I can click.
  - **One line per thing built, clickable, no exceptions.** Built one campaign with three ad groups? That is four links. "Campaign created, everything paused" with no link is not an acceptable answer.
  - **If you genuinely cannot build a working deep link** for something (some shared-library and settings screens have no stable URL), give the account-level link plus the exact click path - "Tools, then Shared library, then Negative keyword lists" - and say that is why. Never guess a URL and present it as working, and never let this rule become an excuse to skip the link.
  - This applies to `/campaign-plan`, `/write-ads`, `/landing-page`, `/account-setup`, `/lsa-setup` and anything else that writes to the account.
- **A file is not a build. Nothing is "built" until the API hands back an ID (CRITICAL).** Copy written into a markdown file has changed nothing in the account. Words like built, shipped, created, live and done are reserved for entities Google returned an ID for - anything else is drafted, staged or pending, and it gets said that way. When a write did not happen, the FIRST line of the response says so and names the one thing blocking it; it never sits under the copy where "6 ads built" reads like something happened. `/write-ads` learned this the hard way on 1 September 2026: six finished ads sat in `ads-pending.md` for a day looking done, and the account had none of them.
- **NEVER put a table in a file a human reads (CRITICAL, repo-wide, no exceptions).** No markdown tables, no pipe rows, no CSV, in ANY `.md` file this repo writes or edits - `keyword-list.md`, `context/competitor-ads.md`, `audit-report.md`, `landing-pages.md`, every context file, every report, every draft. Not "just this one", not "it is only three columns", not "it is a summary". A table renders as a wall of pipes on a phone, columns wrap into nonsense, and the one number that mattered is buried in the middle of row seven.

  **The shape instead - one thing per line, `·` separated, the same block shape as the keyword lists:**

  ```
  - best seo company · 3 advertisers · 0 in the top block
  - local seo agency · 4 advertisers · 4 in the top block · START HERE
  ```

  Not this, ever:

  ```
  | Keyword | Advertisers | Top block |
  |---|---|---|
  | best seo company | 3 | 0 |
  ```

  Every line carries its own labels so it survives being read alone - `3 advertisers`, not a bare `3` that only means something if you scrolled back to the header.

  **⛔ And killing the table is only half of it. FOUR FACTS PER LINE, MAXIMUM.** A bullet carrying nine facts strung together with dots is not a line, it is a paragraph in disguise, and it is exactly as unreadable as the table it replaced. When a thing has more to say than four facts, it gets a heading and **Bold label:** lines - the shape `keyword-list.md` already uses:

  ```
  ## SavClicks · savclicks.com

  - Screenshot: [savclicks.png](competitor-pages/savclicks.png)
  - Headline: "Marketing Built For Home Service Companies"
  - Proof:
    - five stars
    - 500+ clients
    - 3,000+ #1 rankings
  - Guarantee: 100% Satisfaction Guaranteed
  - Not there:
    - no price
    - no speed claim
    - no form, just a button above the fold
  - Why it matters: the closest page in the market to your buyer. Only 7 days
    old in Google's library despite claiming 3 years trading.
  ```

  **Plain labels, not bold.** A page of bold labels is just shouting. **And a label with more than one value NESTS - one value per sub-bullet, never dot-chained.** `Proof: five stars · 500+ clients · 3,000+ rankings` is the same wall of text as the table it replaced. The eye needs one thing per line to scan; that is the entire point.

  **`keyword-list.md` is the canonical shape for every deliverable in this repo.** Heading per item, bold label per kind of fact, short bullets under it. When unsure what a file should look like, open that one and copy it.

  **The gate: `python3 code/check_readable.py <file.md>`** before reporting any run done. It exits 1 on any table and any bullet over four facts or 200 characters. A FAIL means the file is not finished. This exists because the rule has been given in prose more than thirty times and prose did not hold. **There is NO exception. Not one, anywhere, for any reason.** Not "a script reads this one" - `build_campaigns.py` was rewritten to read bullets so the negatives block could stop being a table. Not "it is only three columns", not "it is just a summary", not "the data is tabular". If something feels like it needs a table, it needs one line per row instead: `- audit · phrase · SEO services, Local SEO, PPC agency`.
- **Copy the file shapes exactly (CRITICAL).** Before writing ANY file the user will open, read `references/file-examples.md` - it shows the finished, rendered shape of every canonical file so there is nothing left to guess. `references/output-format.md` holds the rules; file-examples.md shows what those rules look like when they land. **When the two disagree, file-examples.md wins.** Never invent a layout, never "improve" a shape the user has learned to read, and if a file genuinely needs a different shape, say so in chat and ask first.
- **THE SPLIT - the rule that keeps every file short (CRITICAL).** If a human needs to read it, it goes in the human file. If only Claude needs it, it goes in `references/`. Most bloat is not bad writing, it is the wrong material in the file: reasoning, methodology, caveats, decision history and trade-off analysis living inside a file whose job is to be a checkable list. **The test: would the owner ever DO something differently because of this paragraph?** No means cut it or move it. A fact needs its source and its date, not its biography. Put the conclusion in the file and the explanation in chat.
- **EVERY markdown file. No exceptions. No "this one is internal" (CRITICAL).** The legibility rules apply to every `.md` file this repo writes or edits - `context/business.md`, `context/proof.md`, audit reports, keyword lists, stag maps, drafts, notes, everything. There is no such thing as a file the owner will not open, and a file that is hard to read is a file that does not get checked, which is how wrong facts survive.

  **Before finishing ANY command, re-read every file you wrote and fix it if it fails these:**
  - **Could a busy non-technical business owner read this on a phone and know what to do in 10 seconds?** If not, it is not done.
  - **No tables where a list works.** A markdown table is a spreadsheet in disguise - pipes, alignment that collapses the moment one cell runs long, unreadable on a phone. Use a bold line and a plain sentence, or a short bullet list with `·` separators. Tables are for genuinely 3-4 column data with short cells, never for prose.
  - **No raw payloads as deliverables.** No YAML, JSON, CSV, ISO timestamps, field names, resource names or API shapes in a file a human opens. Machine formats get built at call time and cached under `code/`.
  - **No bare numbers.** Label it in words or drop it.
  - **No walls.** No paragraph of `·`-separated items, no list past 10 items without a `+ 23 more`, no unbroken block longer than about four lines.
  - **Plain words, not jargon.** Never an API enum where a human word exists.
  - **Three lines at the top:** what it is, when it was made, the ONE next action. Then decision before data.

  When in doubt, copy the shape of `references/examples/keyword-map-example.md`.

- **Everything stays legible (CRITICAL).** Before writing ANY file the user will open, read `references/output-format.md` and follow it exactly - it defines the nine formatting rules and the canonical layout for `keyword-list.md` and audit files. The short version: three lines at the top, decision before data, four columns maximum, fixed column sets you never invent, long lists collapse to a top 50, no paragraphs inside data files, and NEVER a CSV, JSON dump, or raw data blob as a deliverable (scripts may cache raw data inside `code/` for their own use - that never becomes the output). The test: could a non-technical business owner open the file and know what to do within 10 seconds? If not, rewrite it. If a file genuinely needs to break a rule, ask first - never change a file's shape silently.
- **Everything lands PAUSED.** No campaign, ad, keyword, or asset goes live without the user flipping it on themselves. Scripts create paused; you never enable.
- **Scripts first.** `code/` has working scripts for keywords, campaigns, ads, assets, negatives (add AND remove), harvest keywords (`add_keywords.py`), conversions, autopilot checks, connection tests, and the audit fix set (`remove_negatives.py`, `pmax_guardrails.py`, `exclude_placements.py`, `attach_audiences.py`, `set_campaign_target.py`, `pause_keywords.py` - all dry-run by default, nothing changes without `--apply`). Run them from the project root (e.g. `python code/test_connection.py`) so `.env` and data files resolve. Test with `code/test_connection.py` before any mutating script.
- **Specs are law.** `/campaign-plan` follows `references/campaigns.md`. `/keywords stag` follows `references/stag.md`. `/write-ads` follows `references/google-ads.md` + `references/ad-assets.md`. Account setup follows `references/google-ads-setup.md`. Don't improvise past them.
- **Credentials live in `.env` only** - never commit, print, or copy them anywhere.
- **The context layer must AGREE with itself (CRITICAL).** `context/business.md` and `context/proof.md` are written and corrected at different times, so they drift - and a stale line at the top of one file is indistinguishable from a current one. Before acting on anything from `context/`, cross-check it: what `business.md` says is sold must match what `proof.md` has proof for and what the live site shows. Different answers = stop and ask which is current. **The later resolution always beats the earlier summary** - never believe a headline just because it comes first. When a contradiction is resolved, FIX the file so the top reflects the answer and the stale version is marked superseded. Every context file carries the date its facts were last verified. And watch for proof that does not cover the offer: a business selling one service with proof only for another cannot claim outcomes for it - that is a gap, name it and say which ads and pages it blocks.
- **If you can't find it, ASK. Never guess, never leave it blank (CRITICAL).** Some things cannot be looked up from here: the client's average deal value, close rate, real service area, margin, whether a conversion action is genuinely the money action. Stop and ask a direct question, one at a time, in plain words, and say why you need it. Banned: guessing a plausible number, leaving a field empty with no note, or quietly skipping the section. An empty value is only valid once it records that it was asked and the answer was no. If the answer lives somewhere the user has to go look, tell them exactly where to click. Unanswered items go in the report as open questions, never as blanks.
- **Label confidence on anything not documented.** `references/google-ads-audit.md` already grades evidence (a) official, (b) stated-sample, (c) practitioner convention - apply that everywhere, not just in audits. Never present a widely-repeated PPC claim as fact; most have never been tested, and members act on whatever tone you use.
- **Empty context = say so BEFORE writing, and stamp it on the file (CRITICAL).** Every command that writes customer-facing words - `/write-ads`, `/landing-page`, `/campaign-plan` - checks `context/proof.md` first. Empty or still template: (1) say it up front, before generating - "your proof file is empty, so anything I write now has no claims behind it; run `/context-layer` first (~20 min)"; (2) **never block** - if they say keep going, keep going, because a generic draft to react to beats a blank page; (3) **stamp the warning at the TOP of every file produced**, in the header, not the footer: `> Written before /context-layer ran, so this has no proof behind it. Run /context-layer and re-run this command.` The person who opens that file in three weeks is not the person who saw the chat message; (4) re-running after `/context-layer` removes the stamp - the banner disappearing is the signal it worked.

- **⛔ There is no voice file on the ads side (Jono's ruling, 2026-09-01).** `context/voice.md` does not exist in this repo and nothing may create, read or warn about one. Ad copy is not written in a personal voice: it is written from `context/proof.md`, because the claim is what wins the click. How someone writes an email or a post is a different register entirely, and layering a personal voice over someone else's results is exactly what makes an ad read as fake. Anything that needs voice is the SEO track's job, not this repo's.
- **Always show the truncation cut, never just describe it.** Any field with a "see more" or preview cut - RSA headlines in the SERP preview, landing page hero above the fold, GBP-style descriptions - gets the cut point shown explicitly with a one-line verdict on what survived above it, quoting the actual text. "Front-load the keyword" gets ignored; seeing the exact sentence your reader stops at does not. If the primary keyword or the who-it-is-for falls below the cut, say so and rewrite the opening.
- **Character limits are hard limits:** headlines ≤30, descriptions ≤90, sitelink titles ≤25. Count before pushing; the API rejects overruns.
- **Platform parity for pages.** `/landing-page` works two ways: static/Next.js (deploy via Vercel) or WordPress via the **Novamira** plugin + MCP connection (pages created as DRAFTS, published only by the user). Ask once, record the lane in "## My setup". WordPress users without Novamira connected: that's their first step before any page work.

## The GHL link - use it EVERY time GoHighLevel comes up

**Claim link:** https://www.skool.com/automatable/classroom/32447943?md=47d1df7d71c449baa5ab88c94340718c

GoHighLevel is **$1/month** through the community perk, and it is the default answer for a lot of this repo: call tracking and speed-to-lead on `/landing-page` form fills, the CRM behind `/landing-page`'s tracking layer and ROAS reporting, offline conversion imports, the booking calendar, and the phone number that keyword-level call tracking runs through.

**Never mention GHL, GoHighLevel, the CRM, the $1 plan, a business phone number, a booking calendar or Voice AI without pasting that link right there.** Not "claim it in the community" - the actual URL, every time, in every command and every generated file. Somebody reading a file three weeks from now cannot click a sentence that describes a link.

Already have GHL? Confirm it, record it in "## My setup", and skip the link from then on.

## Three rules that override everything else

**Test before you respond.** After any code change, run the thing - start the dev server, run the build, execute the script - and check for errors BEFORE replying. **Never say "done" if it's untested.** Keep testing until it actually works. A green build you didn't run is not a green build.

**The 9 out of 10 quality gate.** Nothing gets pushed to a live Google Ads account until it scores 9 out of 10 or higher. That covers every ad, headline, description, asset and landing page.

Rate it honestly and neutrally. **Never inflate a score to move things along.** If it isn't a 9, say exactly what's wrong and fix it before going any further. A 10 only exists after the data comes back - never award one in advance.

Score on: hook strength (specificity, numbers, tension), message match to the keyword, originality (does it say anything a competitor's ad doesn't?), and CTA clarity. Be direct about what's dragging the score down. "It's fine" is not a score.

**Ask, never assume, on anything downstream-breaking.** When a step needs a fact you do not have, or the data source it names is blocked, missing or wrong for this business, **stop and ask one direct question.** Do not infer the answer from context, do not pick a default, do not swap in a different tool, and do not proceed on a guess you plan to flag afterwards.

The line: cheap and easily reversed, decide it yourself and say what you decided. Expensive, permanent, or it changes every file downstream, ask first. These always cross the line:

- A fact the run is built on that is not in `context/` - the service area, the budget, the entity name, the guarantee wording
- The named data source is blocked, rate-limited, out of credits or returning something other than what the step describes
- Reaching for a different tool, API or dataset than the step names, however reasonable the substitute looks
- Anything that gets written into a file as evidence, or touches a live Google Ads account or a live page

Two failure modes this exists to stop, both real. **Silent substitution:** a blocked source gets swapped for a different one mid-run, and the evidence quietly becomes a different kind of evidence than the step asked for. **Assumed defaults:** a missing location gets filled in by whatever the tool does by default, and the output looks identical to a correct one. Wrong evidence reads exactly like right evidence three weeks later, which is what makes both of these expensive.

Do not go the other way and ask about every small thing. Formatting, file naming, wording, ordering, which of two equivalent phrasings to use - decide, do it, mention it in one line.

## How to respond

Explain everything like you're talking to a 15 year old with no coding background.

**Writing style (hard rule): never use em-dashes.** Not in files, not in page copy, not in ad copy, not in these chat replies. Use a regular hyphen (-) instead, always. Em-dashes read as AI-written.

Every response covers:
- **What I just did** - plain English, no jargon
- **What you need to do** - step by step, assume they've never seen this before
- **Why** - one sentence on what it does or why it matters
- **Next step** - one clear action
- **Errors** - if something broke, explain it simply and say exactly how to fix it

When a task involves a tool a non-coder wouldn't know (Search Console, Vercel, Google Ads settings, Novamira, an API key):
- Walk through exactly where to find it: "go to your Search Console dashboard, then Settings, then Users and permissions"
- Describe what each key or setting does in one plain sentence
- If there's a config or folder to create by hand, explain what it is and why it exists
- Be as concise as possible. Do not ramble. Less is more.

## File map

| Path | What it is |
|------|-----------|
| `context/business.md` | What the business does, where, and what it does NOT do |
| `context/proof.md` | The only approved claims/numbers + the NEVER SAY list |
| `context/compliance.md` | Google Ads compliance rules (CRITICAL vs MINOR) |
| `audit-report.md` | The live audit checklist - written by `/audit`, worked through item by item, keeps its history across runs |
| `references/standard-pages.md` | **The pages every site needs: /thank-you (tracking fires here), the 6 sitelink targets, legal, 404, robots, llms.txt** |
| `references/keyword-patterns.md` | The buyer-intent keyword buckets for any trade + **the rule that keywords never contain the city** |
| `references/file-examples.md` | **The rendered shape of every file the user opens - match it exactly** |
| `references/account-setup.md` | The ordered setup checklist, the nine switches, link order, where negatives go, security, 2024-2026 changes. `/account-setup` executes it |
| `references/google-ads-setup.md` | API access levels, the Cloud Console path step by step, brand verification, the OAuth production trap, every error with its fix. `/api-setup` executes it |
| `references/conversion-tracking.md` | Conversion actions for a service business, calls with recording, calendar bookings, Enhanced Conversions, offline import, consent, audiences, the Tag Assistant verification. `/landing-page` executes it |
| `references/landing-page-blueprint.md` | **The ad landing page: the 14-section order, no header and no footer, the offer formulas, where the lead goes (GHL webhook, phone, calendar), the launch checklist.** `/landing-page` executes it |
| `references/campaigns.md` | The nine switches with API fields, budget tests, bidding at launch and graduation, cannibalisation. `/campaign-plan` executes it |
| `references/scaling.md` | Budget-fit math, the four-check gate, what a template carries, the launch ramp and bench, when to raise budget. `/campaign-plan` and `/keywords` read it to size the launch |
| `references/competitor-intelligence.md` | The scout: Transparency Center limits, the live-SERP sampling method, claim buckets, the swipe rubric, the trademark line. `/scrape-competitors` executes it |
| `references/search-terms.md` | The daily pass: the threshold math, the SERP scoring rule, the junk taxonomy with over-blocking warnings, the harvest, the limits, what changed in 2024-2026. `/keywords` and `/audit` read it before any negative is added |
| `negatives-log.md` | The running log every negative push appends to - each negative with its reason |
| `references/` | The specs: campaigns, stag, google-ads (RSA rubric), ad-assets, setup, negatives, LSA, CRO cheatsheet |
| `code/` | The API scripts - keyword research, campaign/ad/asset builds, negatives, conversions |
| `keyword-list.md` | ONE file: the account structure at the top (campaigns → ad groups → keywords → negatives, written by `/keywords stag`), the research below it (written by `/keywords`). No separate map file |
| `ad-library.md` | Headline/description pools, tagged by angle, scored |
| `context/competitor-ads.md` | Ranked competitor claims table + swipe file |
| `references/api-application/` | Standard access only - the application answers + the design-doc PDF. Basic needs neither since 10 September 2026 |
| `references/lsa-profile-draft.md` | LSA profile template (local lane) |
| `references/examples/` | Worked demo examples (fictional ABC Company) - the quality bar; never copy example claims into real ads |
| `references/research/` | The 16 research dossiers (1,000+ sources, graded, dated) behind every reference above. Claude-facing: cite them, never paste them into a member file |

## Version

This is the day-1 version of the Google Ads Blueprint: the 12 build + launch commands. Day 7 adds the four machines - `/search-terms`, `/ad-tests`, `/scale-account`, `/proposal` - as a `git pull`. It updates when Google changes something.
