---
description: The context layer - scrape PROOF and business facts from everywhere you exist, then one interview to confirm it. No voice files on the ads side. Every other command reads this.
argument-hint: [website url, optional] [focus: sweep | reviews | interview | images]
---

Build my context layer: `context/business.md` and `context/proof.md`. This is the file set every page pulls trust from - the one thing competitors can't copy. **Proof only: there are no voice files on the ads side.** See the rule below.

**⛔ THERE IS NO VOICE FILE ON THE ADS SIDE (Jono's ruling, 2026-09-01).** `/context-layer` builds **proof and business facts only**: `context/business.md` and `context/proof.md`. `context/voice.md` does not exist in this repo. Do not create it, do not read it, do not warn that it is empty, and do not write `stories.md`, `humour.md` or `vocabulary.md` - not as a draft, not as a suggestion, not even when the sweep turns up great material.

Why: **an ad is not written in a personal voice, it is written from the proof.** The claim is what wins the click. How someone writes an email or a LinkedIn post is a completely different register from a 30-character headline, and layering a personal voice on top of someone else's results is exactly what makes an ad read as fake. Anything genuinely voice-driven is the SEO track's job, where long-form copy actually needs it.

**If the sweep surfaces voice-grade material** - a funny line, a story, a phrase the owner repeats - do not write it into a file. Put it in the final report under `VOICE MATERIAL FOUND - not written, for the SEO track` with the source and date, so it is captured without being committed here.


**Focus mode:** name a stage (`/context-layer reviews`, `/context-layer sweep`) and run only that part.

**Read `references/proof-signals-playbook.md` and `references/humour-writing.md` FIRST** - the first gives the full source matrix (review platforms via Apify, the private goldmines, badges HAVE/EARNABLE, visual proof incl. real review screenshots and rendered review cards) plus the integrity line: never fabricate, provenance on everything, permission for private-channel praise. The second sets the entertainment bar - blogs are written as a standup set, and the point of the voice work is finding MY specific kind of funny (dry, dad-joke, deadpan, exaggerated) so it sounds like me, not a generic comedian.

---

## ⛔ STEP 0 - APIFY TOKEN GATE. Run this before anything else, every time.

**This command does not run without `APIFY_TOKEN`.** Check `.env` for it as the very first action - before the sweep, before any question, before reading anything else.

**If it is missing, STOP and say so plainly.** Do not start the sweep. Do not begin the interview. Do not "get started on the free sources while we sort that out" - a context layer built without the scrapers is a thin one, and it silently becomes the file every other command trusts forever.

Then walk me through it in one short message: go to **apify.com**, sign up free, Settings → Integrations → API tokens, copy the token, paste it into `.env` as `APIFY_TOKEN=...`. Free tier covers this run. Say it takes about two minutes.

**The ONLY way past this gate is me explicitly saying to continue without it.** Not silence, not "ok", not answering a different question - an explicit instruction to proceed without Apify. If I say that:
- Say in one line exactly what is now unavailable: the full Google review corpus (the Places API returns 5), Yelp and the other platforms, the rendered-site crawl, and every social actor. What is left is the free sources plus whatever I paste by hand.
- **Stamp it at the top of every file this run writes**: `> Built without APIFY_TOKEN - reviews and socials are partial. Re-run /context-layer once the token is set.`
- Put it on the outstanding list in the final report, with the pages it weakens.

The stamp is not optional. The person who opens `context/proof.md` in three weeks is not the person who agreed to skip this.

---

## 1. The sweep (the machine part)

Run every source in the playbook that's available, in parallel where possible. Website: $ARGUMENTS (ask if not given, plus social links and the owner's name). Ask once up front which of these I have access to, then sweep:

- **a. Website** - homepage, about, services, pricing, testimonials pages
- **b. Socials via Apify** (needs `APIFY_TOKEN` in .env - free tier covers this; walk me through apify.com signup if missing):
  - `apify/instagram-scraper` - follower count, bio claims, top posts, before/after content
  - `supreme_coder/linkedin-post` - posts with results, milestones, client stories
  - `agentx/tiktok-transcript` - video transcripts often contain numbers and claims said out loud that never made it to the website
- **c. Advanced Google searches** - `"[owner name]"`, `"[company name]"`, `"[company name]" review`, `"[owner name]" interview OR podcast OR featured` - press mentions, podcast appearances, award lists, directory reviews. Media features are top-tier proof and owners always forget them.
- **d. Semrush** - backlinks report for the domain: every site that links here is potentially an article, feature or partner mention worth quoting.
- **Your own past Claude Code sessions** - run `python3 code/mine_transcripts.py`. It reads `~/.claude/projects/*/*.jsonl` and pulls every line where a real number, result, timeline or client outcome was said in passing. **This is the highest-yield source in the whole sweep** because people state real figures conversationally while working and never write them down anywhere public. Everything it returns is UNCONFIRMED until confirmed - a worked example ("say the client is doing 40K a month") reads identically to a real result in a transcript. Privacy: the owner's own business only, never a credential, never a third party's data. Full rules in the playbook.
- **e. The private goldmines** (via the connected MCPs - only the ones I confirm): **Gmail** - thank-you emails, testimonials, "you saved us" messages, and every email I've written to a customer (that's my real voice on record); **Google Drive** - case studies, before/after photos, contracts proving big-name clients, certificates; **Slack** - praise and wins shared internally; **CRM (GHL)** - client count, repeat-customer rate, review requests answered. This is where the best proof hides, because nobody thinks of it as proof.

**The sweep fills all three layers:**
- `context/business.md` - **this file is thin by default and thin is useless.** Every page ever written reads it, so a half-page summary means every page is written from a half-page summary. Cover all of it, and where the sweep cannot reach, that becomes an interview question rather than a shrug:
  - **The offer** - every service, its real name, its price, what is included, what it is NOT. The exact words they sell it in
  - **Who it is for** - the customer they want more of, and the one they turn down
  - **How it is delivered** - the actual steps, the timeline, who does what, what the client has to do
  - **Service area** - cities, radius, remote or on-site, and where they will NOT go
  - **⛔ THE MAIN CITY - ask it as its own question, never infer it.** (Jono, 2 September 2026.) One city, the one most customers are in. It becomes the fallback for `{LOCATION(City)}` in every ad's pinned headline AND the fallback in the landing page H1, and Google fails to resolve a location on a large share of clicks - so this is the version most people actually read, not an edge case. Ask plainly: "If I could only name ONE city in your ads, which one?" Record it as `MAIN_CITY` in `.env` and in the "Market and budget" block of `business.md`. A business with no single main city - fully remote, or national - answers "remote" and it is recorded as `MAIN_CITY=none`, which turns city insertion off everywhere rather than leaving a guess in the ad.
  - **Hours** - business hours, and whether a PERSON answers the phone 24/7, business hours only, or an answering service. The site usually claims it; the owner confirms it. `/campaign-plan` sets the ad schedule from this line
  - **Market and budget** (the "Market and budget" block in `business.md` - `/keywords` and `/campaign-plan` read it and never ask again): the country customers search from, the language they search in, the business type (local or national brand / ecommerce / internet business), and the monthly ad budget. The sweep can infer the first three from the site and confirm them; **the budget is always asked, never inferred, and ALWAYS with its currency** - one direct question: "What's your monthly ad budget, ad spend only, not my fee - and is that in the currency the Google Ads account bills in?"

  **⛔ Write the currency into the file with the number** (added 1 September 2026 after a budget landed 27% short). `/campaign-plan` divides this by 30.4 and sets the daily budget in **whatever currency the account bills in** - it cannot convert, and Google will not tell it the number was meant as something else. A business quoting fees in USD on an account billing in CAD is normal and is exactly where this goes wrong. Record it as `**Monthly ad budget:** $2,000 CAD a month`, never a bare `$2,000`. If the account currency and the budget currency differ, say so on the line and state which one the number is in.
  - **⛔ The GHL plumbing - ask for all four, they block later commands.** Every one of these is asked for by a later command anyway, and being asked mid-build is how a page ships without a working form. Collect them once, here, and write them into `business.md` so nothing asks twice:
    - **The GHL phone number** - the tracking number that call reporting and the speed-to-lead workflow run through. This is the number that goes on the site and in the call asset. `/write-ads` stops without it and marks the call asset pending
    - **The GHL calendar link** - the booking widget. It goes on `/thank-you`, which is the highest-intent moment on the site, and on the proposal as its one action
    - **The inbound webhook URL** (`LEAD_WEBHOOK_URL` in `.env`) - GHL → Automation → new workflow → trigger "Inbound Webhook" → copy the URL. Every form on every page posts here. `/landing-page` refuses to start without it
    - **The new-lead workflow** - does one exist that fires when that webhook receives a lead? If not, say so: `/landing-page` builds the speed-to-lead version (rings the owner's phone, bridges to the lead, fallback SMS if missed). If one already exists, get its name so nothing builds a duplicate
    **No GoHighLevel yet?** Walk them through it rather than leaving a blank: it is $1/month through the community perk, and about five minutes to the webhook. Record which of the four are still missing at the top of `business.md` rather than leaving empty fields that read as done.

  - **The DON'T list** - services they don't offer, jobs they refuse, the words they refuse to use. This drives the keyword cut list, so a thin DON'T list means a wasteful map
  - **Guarantees, terms, payment** - anything a page will need to state
  - **The story** - founded when, by whom, why, what changed since
  - **The stack** - only what they confirm they run. Never inferred
  - **Competitors** - who they lose to and what those people say
  - **Every section carries its tier and date.** No dateless facts
- `context/proof.md` - every credential, number, promise, testimonial, media feature
- `context/proof/reviews/` - review quotes found anywhere, catalogued with source
- No voice file. Voice-grade material the sweep finds is reported in the summary, never committed. See the rule at the top.

**Real writing beats self-description every time** - people describe their voice wrong and write it right. So the more the sweep finds, the shorter the interview gets: rich sweep = a ~10 min confirm-and-refine; genuine blank slate = the full ~20 min interview.

### ⛔ Sources are NOT equal. Tag every fact with its tier.

The single biggest failure of this command is writing a scraped guess in the same confident prose as something the owner said out loud. Every line carries its tier and its date:

- **A · The owner said it.** Highest. Overrides everything below it, always, even if the site still says otherwise.
- **B · The live site says it, today.** Trustworthy for offers, prices and services. Beats anything from a codebase or an older snapshot.
- **C · Scraped from somewhere else** - a repo, socials, a cached page, an old PDF. **Plausible, frequently stale.** Never written as fact. Tag `UNCONFIRMED (C)` and ask.
- **D · Inferred by me.** Never written down at all. See the ban below.

When tiers disagree, the higher one wins and the loser is marked superseded with its date. Never average two sources into a sentence that is true of neither.

### ⛔ NEVER infer these. Ask, or leave the gap visible.

These read completely plausible and are wrong constantly, because they are the details a business changes without updating anything:

- **The tool stack.** Never write "n8n and Make.com for orchestration" or "Notion or Airtable for boards" because a repo mentioned them or because that is what this kind of business usually uses. Ask what they actually run.
- **The delivery model.** "Done-with-you", "done-for-you", "handover", "retainer", "sprint" - these are positioning words with money attached. Use their words, not a category label that seems to fit.
- **Service area and delivery method.** "Delivered remotely across Canada" is a claim about where they will take work. Ask.
- **Team size, seniority, who does the work.**
- **Anything with a number in it.** That belongs to `context/proof.md` and its own rules.

If it is not tier A or B, it is a question, not a sentence. **A visible gap is worth more than a confident guess** - the gap gets filled in 20 seconds, the guess ships to a live page and nobody catches it.

Everything else lands tagged **UNCONFIRMED** with its tier, source and date ("C · LinkedIn post, Mar 2026" / "B · live site, 18 Aug 2026"). Facts only; skip marketing fluff like "best in town". Sources I don't have access to get listed as skipped, not silently dropped.

## 2. Reviews

**Scrape first, paste only as fallback.** With `APIFY_TOKEN` set, run `compass/google-maps-reviews-scraper` on the Business Profile (about $0.30 per 1,000 reviews - the only way to get the full Google corpus, since the Places API returns just five) and `tri_angle/yelp-scraper` where the business is on Yelp. The old multi-platform actor is retired from this playbook: it has 10 users and a README admitting it was never run live.

**The legal layer, before any review or result goes on a page** (all official, dated in `references/proof-signals-playbook.md`): the FTC fake-review rule (in force 21 October 2024, up to $53,088 per violation, first warning letters December 2025) bans fabricated, incentivised-undisclosed, and insider reviews; results in testimonials need a "results may vary" line; Canada's Competition Act needs an "adequate and proper test" behind any performance claim; Google Maps now asks reviewers whether the business offered a reward and deletes retroactively. Google Guaranteed and Google Screened merged into one **Google Verified** badge, and the money-back guarantee ended 7 December 2025 - never write the old names. Licence numbers must appear in ads in some jurisdictions (California, Florida, Washington, Arizona, Ontario among them) - check the playbook for the member's. Add the trade-specific platforms from the playbook where the business is listed. **Only if there is no token** (and after offering the free apify.com signup) fall back to: ask me to paste my Google reviews from the GBP dashboard - and say plainly that the paste covers Google alone, so the other platforms are being skipped.

Save whatever comes back to `context/proof/reviews/reviews-raw.md`, then distill into `context/proof.md`: exact star rating + review count, and the phrases customers repeat (their words). **The full quote bank is its own file, `context/proof/reviews/quote-bank.md`** - EVERY single quote, never a shortlist, each tagged by what it proves (speed, price, quality, trust) and by whether it is paid client work or community praise. It lives separately because a complete bank runs to dozens of quotes and would bury the claims list `proof.md` exists to hold; `proof.md` links to it. Never round anything up. Catalogue any screenshots I drop into `context/proof/reviews/` in `reviews-index.md`.

The words customers use about me are worth capturing - report them in the final summary as voice material, but do NOT write them to a file.

## 3. ⛔ The interview - MANDATORY. This is the command, not an optional extra.

**You may not write the final files while a single UNCONFIRMED item remains.** Skipping this and shipping the sweep as finished prose is the failure mode of this whole command - it produces a file that looks complete, reads confidently, and is wrong in a handful of specific places nobody thinks to check.

**How to run it, and these are not suggestions:**

- **ONE question at a time. Stop. Wait for the answer.** Never a numbered list of twelve questions - that gets one reply answering three of them and the other nine are silently dropped.
- **Never ask an open question where a confirm will do.** "What tools do you use?" is work for them. "The repo mentions n8n and Make.com - is that what you actually run?" takes two seconds and gets a correction instead of an essay.
- **Show the tier when you ask.** "This came off an old codebase, so it may be stale" tells them how hard to look, and it is why they bother correcting rather than nodding it through.
- **Batch by topic, not by file.** All the offer questions, then all the delivery questions, then proof. Jumping between topics makes people give shallower answers.
- **Count it out loud.** "14 things to confirm, this is 3 of 14." People finish what they can see the end of.
- **Every correction is tier A from that moment**, and it overwrites whatever the sweep said. Say what changed.

### ⛔ The competitor proof audit - run it BEFORE the tick list

**Read `references/competitor-proof-audit.md` and run it against the actual top 3 in the map pack** - not who the owner thinks the competitors are. It runs first because it changes what you ask for: a slot all three competitors fill and this business does not is the reason they lose the click, and that gap decides the order of everything after it.

Score every row - **Impact** is fixed in that file, **You** and **Them** get set per client, **Priority = Impact + (Them - You)**. Score what is VISIBLE: sixty testimonials in a folder is a 0, because the buyer cannot see the folder. Write it into the proof file as a priority-ordered list, biggest gap first, with cost and effort named on the top 5 and the two or three signals where this business WINS flagged - that is what the copy leads with. **A gap closable this week outranks a bigger one that takes six months.**

### ⛔ The proof slots - find first, then ONE tick list, then depth on the yeses

Social proof never surfaces on its own. Work a named slot for every kind of it, and mark each **FOUND** (with source and date), **MISSING**, or **NONE**. A blank slot means nobody looked.

**Never ask for what the sweep can get.** Follower counts, certifications on a LinkedIn profile, press in the backlink data, years in business from the registry - measure them, then confirm the number. An owner asked to look up their own subscriber count is being made to do your job.

The slots: press and media · recognisable brand names · client company size (7- and 8-figure) · video testimonials · case studies with screenshots or dashboards · the best 4-6 results · total projects completed · lifetime hours saved · lifetime money generated · people helped · years of experience · certifications and partner badges · licence, insurance and bonding · online following per platform · the 3-5 outcomes reliably delivered · awards. **Add rows when the sweep surfaces a kind of proof this list does not name.**

**⛔ Pass 1 - ONE clickable multi-select. Never a typed checkbox list. This overrides the one-question-at-a-time rule above.**

Use the **AskUserQuestion tool with `multiSelect: true`** so the owner CLICKS what they have. Never paste a markdown `- [ ]` list and ask them to type it back, retype it with x's, or "just list the ones you have" - that is asking a busy owner to do data entry, and it is the single fastest way to get this abandoned.

Batch every still-MISSING slot into up to 4 questions of up to 4 options each (16 slots in one call), grouped so the headers read plainly - for example **Media** (press/podcasts/TV, recognisable brand names, awards, a Clutch/G2/Trustpilot profile), **Evidence** (video testimonials, case studies with screenshots or dashboards, workspace or team photos, a guarantee you honour), **Credentials** (certifications or partner badges, licence, insurance, bonding), **Reach** (following worth stating, 7- or 8-figure clients, any result with a number). If more than 16 slots remain, run a second call - never fall back to a typed list.

Say the rule once, in the question text: **anything not selected is marked NONE and never asked about again.** No detail yet - detail on an empty slot is wasted, and fifteen questions in sequence gets abandoned around question six.

**Pass 2 - now one at a time, through the ticked boxes ONLY.** The checkbox filter is what makes this affordable: four yeses is four real conversations, and the eleven noes were settled in one line without being asked about. Say the shape up front - "four ticked, I'll take them one at a time, then we're done" - then get the specifics, the permission and the file on each. **Never go one-at-a-time on an unticked slot.** A no is settled permanently.

**⛔ "Yes, that exists" is not the end of the slot. Get the file.** Anything that is an asset - videos, screenshots, dashboards, logos, certificates, licence documents, press clippings - gets collected in the same breath with the destination named. `FOUND` means the file is on disk. **`CONFIRMED - AWAITING UPLOAD` is its own state**, it goes on the outstanding list with the page it blocks, and it gets chased once in the final report. A logo or client name with no yes on record is `PERMISSION PENDING` and stays unusable until it changes.

**⛔ Press and brand mentions mean GO GET THE LOGO.** "Featured on X" as a line of text has to be believed; a logo is recognised before it is read. Name the file and the destination in the same message - *"grab their podcast artwork or site header, save it into `context/proof/logos/`"* - and get the episode or article URL alongside it, because an unlinkable claim eventually gets challenged.

**⛔ THE ECONOMICS - collected here, once, before anything else in this pass.** `context/business.md`
"## The economics" is read by /audit and /search-terms on every run, and until 2 September 2026 no
skill actually collected it - the template's comment claimed this command does, and it did not. An
account without these numbers can only compare a cost per lead to itself: every profitability finding
gets graded Assumed. Ask with ONE AskUserQuestion call, three things:

- **Average job value** - what one closed job is worth in revenue
- **Close rate on a lead** - what share of leads become jobs
- **How confident** - measured from the CRM / estimated / a guess

Compute and write the rest into "The economics" yourself: lead value (job value x close rate),
break-even cost per lead (the same number), and leave target cost per lead for the owner to confirm
at roughly half of break-even. Estimates are fine if the owner can defend the math out loud - write
the reasoning beside the number. A guess is still worth writing down: /audit will grade on it
honestly. Never substitute an industry average for the owner's own number.

**⛔ The numbers every business already has - these are never NONE.** Most slots can legitimately come back empty. This group cannot: **years in business** (registry date, domain age, first invoice - confirm, never ask cold) · **jobs, projects or clients completed** lifetime · **customers served** · **hours saved, money generated, people reached** · **cities or regions served** · **team size**. If the sweep cannot compute one it goes on the tick list as a fill-in-the-number, not a yes/no - the answer is always a number. Estimates are fine if the owner can defend the math out loud, and write the reasoning down beside it. **Round DOWN** (512 becomes "500+") and **date every one**, because they compound and an undated countable rots into an understatement. Cheapest credibility on a page, most commonly left off entirely.

**⛔ Weak proof costs more than no proof.** An empty space says nothing; a weak signal says *this is the best they had*. Flag and HOLD, do not publish: no-name logos in an as-seen-in strip (one real name alone beats one real name plus five fillers) · numbers that undersell (3 reviews, 40 followers, "saved a client $400" - withhold the number, keep the fact) · ratings under ~4.0, or a perfect 5.0 from a handful · undated or 3-year-old awards and press · anonymous testimonials ("J.S., business owner") · unrecognised certifications, remembering the 3-5 badge ceiling. Say it in one line without arguing: *"3 Google reviews on the page hurts more than leaving it off - that's what the review machine fixes first."* **Record it as `HOLD - too weak to publish` with the threshold that flips it** ("publish once past 20 reviews") so it gets revisited rather than re-argued next run.

**A result without a number and a timeframe does not go in.** Send it back for the missing part. Lifetime totals can be estimates if the owner can defend the math out loud - round down. Never invent a slot's contents: MISSING is a fine state for a file to be in.

**If they want to stop early:** fine, but never quietly fill the rest in. Whatever is still unconfirmed stays tagged in the file with the open question written next to it, and the report names how many are outstanding and which pages they block.

Walk every UNCONFIRMED item for confirm/correct, then fill the gaps the scrape couldn't know.

**Proof side:**
- Business: full service list, best customers, exact service area + travel radius, and what I DON'T do (those become the no-page list)
- Numbers: years in, jobs done, 2-3 best results as "what · for who · result-with-number · timeframe" - reject entries missing any of the four parts
- Credentials: license number, insurance, bonding, certifications, media features (even small ones), recognizable clients, following with real counts
- Identity: family-owned, veteran-owned, locally owned since [year], background-checked, 24/7 - only what's true
- Promises: guarantee, response time, warranty, offers. If I have no guarantee, suggest 2-3 I could realistically offer
- Author: name, photo, one-line title (for bylines + author schema)

**Voice side: NOT ASKED HERE.** No tone, humour, vocabulary or story questions - those belong to the SEO-side `/context-layer`, which has the spoken material to ground them. Asking them here burns interview time to produce a file this command is not allowed to write.

**Two things that ARE captured, because they are proof and buyer facts, not voice:**
- **Stories with a number in them** - the save-the-day job, the worst job, the biggest result. A story with a number is proof, so it goes in `context/proof.md` as a result.
- **Buyer profile** - who actually hires me, what they are worried about at the moment they search, what makes them pick one company over another. That drives keyword intent and ad angles, so it goes in `business.md`.

## 4. Lock it

- Add the NEVER SAY section to context/proof.md (unprovable superlatives, competitor names, regulated claims for my trade - ask if my industry has ad rules)
- Put the three rules at the top, remove every UNCONFIRMED tag
- Show me every file so I can check that each line is real

## 5. Organize images

If photos are in `context/proof/images/`, rename them descriptively, sort into folders, and update `images-index.md` (title, summary, path, tags).

---

**⛔ Before finishing: cross-check the files against each other.** These get written and corrected at different times, so they drift, and a stale line at the top of one is indistinguishable from a current one. Verify, out loud, and report each as a line:

- **What `business.md` says is sold** vs **what `context/proof.md` has proof for** vs **what the live site actually shows today.** All three must agree on the offer, the prices and the service list. Any mismatch: name it, say which is current, and FIX the stale file rather than noting it.
- **Superseded facts get marked superseded, at the top, not buried.** An old offer described in paragraph one with a correction on line 39 is how a whole keyword map ends up targeting a business that no longer exists. That has already happened once.
- **Every file gets the date its facts were last verified**, in its header.
- **Name proof gaps, don't just note them.** If they sell a service with no result in the proof file for it, say which pages that blocks. Selling SEO with only automation results means service pages can describe the offer but cannot claim an outcome.

**Finish with the test.** Take my three best claims and check each one against `context/proof.md`: is there a real, dated, sourced result behind it? Show them side by side. If a claim has no proof entry, it cannot go in an ad - say which pages that blocks. **Do not run a voice rewrite test here** - there are no voice files on the ads side to grade.
