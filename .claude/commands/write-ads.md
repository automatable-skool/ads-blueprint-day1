---
description: One ad group - the ad library + its two RSAs, written to the gap the scout found, culled by three gates, and CREATED in the account PAUSED
argument-hint: [ad group name] [focus: library | gates | rsas | assets]
---

Write my ads. Read `references/persuasion.md` (WHY a line makes someone act - the awareness ladder, the six fears, specificity) and `references/google-ads.md` (WHAT the ad must look like - the anatomy, the six angles, the policy rules), then `context/proof.md` + `context/business.md` + `context/compliance.md`.

**Read persuasion.md BEFORE google-ads.md.** Format rules applied to a line that was never going to persuade anyone produce a compliant ad nobody clicks. Place every keyword on the awareness ladder first (persuasion.md section 1) - that decides what the headline is allowed to assume - then pick the fear from section 4 that the competitor swipe file shows nobody answers.

**Focus mode:** `library`, `gates`, `rsas`, `push`, `assets` run just that stage. No focus = the full flow.

**⛔ THE DELIVERABLE IS ADS IN THE ACCOUNT, NOT A FILE.** `ads-pending.md` is a staging file, not the output. This command is not finished until `code/push_ads.py --push` has run and printed real ad IDs. Copy sitting in a markdown file is worth nothing, and "6 ads built" reads like something happened in the account when nothing did. If the push cannot happen, the FIRST line of the finish screen says **NOTHING WAS CREATED** and why - never buried under the copy. (Jono, 1 September 2026, after six ads sat in a file for a day looking done.)

**⛔ THIS COMMAND NEVER CREATES A CAMPAIGN OR AN AD GROUP. EVER. UNDER ANY CIRCUMSTANCES.** (Jono, 1 September 2026.) It writes one kind of thing: ads, into an ad group that already exists and already has keywords. Not "I'll just create the ad group so the ads have somewhere to go". Not "it was missing so I added it". An ad group created here has no keywords behind it, so it never serves - it just makes the account look built while doing nothing. Missing ad group or missing campaign: **STOP and say so**, `/campaign-plan` owns the structure and `/keywords` owns the keywords. `push_ads.py` refuses to send anything that is not an ad, and refuses an ad group with zero keywords, so this is enforced in code as well as here. Do not work around it - not with `build_campaigns.py`, not with a one-off script, not by hand in the UI.

**The one thing that decides whether this works: persuasion, not compliance.** A line that passes every rule and says nothing loses to a competitor line that says one true, specific thing. The gates below exist to stop bad lines wasting an impression slot - they cannot find the winner. Real money finds the winner later, in `/ad-tests`.

---

## 0. Preflight - the audit, the scout, and the pages the assets point at

**Read `context/audit-results.md` if it exists.** The "For /write-ads" section names the ad groups running one ad, the ones with CTR below the account average, and the assets missing account-wide. That is a ready-made brief - do not rediscover it. Respect the trust section at the top of that file: if calls are uncounted, every CTR and conversion-rate judgement in it is measured on a censored sample.


**Pages first - an ad cannot exist without a page.** A responsive search ad requires a final URL at creation, so `/landing-page` runs BEFORE this command. Check two things before writing a word of copy:

- **The money page for each ad group** - fetch it. **Not 200, or not built yet? Point the ad at the HOME PAGE as a placeholder and carry on.** (Jono, 1 September 2026.) A missing page is not a reason to leave the account empty - Google only requires a URL that loads, and the home page loads. `push_ads.py` does this fallback automatically and names every placeholder ad group. What you owe me in return is loud: the ad group is listed as a placeholder on the finish screen, and a placeholder ad is NEVER enabled until `/landing-page` builds the real page and the ad is re-pointed. If the home page itself is dead, the site is not deployed and nothing can be created at all - say that first.
- **The six sitelink targets** (`/pricing`, `/emergency`, `/reviews`, `/areas-served`, `/guarantee`, `/book-now` or `/quote`) **plus `/thank-you`** - any missing, tell me to run `/standard-pages`, it takes minutes.

Do NOT get to the assets stage and discover it. If I choose to carry on without the sitelink pages, build the ads, mark sitelinks **pending**, and say so on the finish screen. The money page is the one exception to the home-page fallback below only in this sense: use the real page when it exists, the home page when it does not, and say which every time.

**Ask for the phone number NOW, not at the assets step.** A trade's leads arrive by phone, and an ad with no call asset is the single biggest hole you can ship - it is also the one thing this command cannot invent. Ask in the first message of the run, alongside the webhook (`LEAD_WEBHOOK_URL`), so there is time to get them before the push. Both come from GoHighLevel - $1/month through the community perk: https://www.skool.com/automatable/classroom/32447943?md=47d1df7d71c449baa5ab88c94340718c - sign up, get the number, then Automation, new workflow, trigger "Inbound Webhook", copy the URL. Already recorded in CLAUDE.md "## My setup"? Use it and never ask again. **The number never goes in the ad text** - Google rejects that - it goes in the call asset, where it becomes a tap-to-call button. Still no number at the end of the run: the ads ship, and the FIRST line of the finish screen says the ads are running without a call asset and what that costs.

**Ask about the business name and logo in the same breath.** They carry Google's largest published asset figure - 8% more conversions at a similar cost per conversion - and both were missing from the last run. Two questions, asked BEFORE anything is built:

- **The business name**, 25 characters, matching the verified domain root or legal entity exactly, no keywords in it, and visibly present on the landing page.
- **A logo.** Square 1:1 is required (min 128x128, 1200x1200 recommended), 4:1 landscape optional. PNG or JPG, under 5MB, the mark filling the frame with no padding, and it must be legible at the size of a favicon.

**No logo exists? Offer to make one, then ⛔ WAIT FOR A YES.** (Jono, 1 September 2026.) Never generate a logo and present it as done - a logo is identity, it ends up on the site, the invoices and the van, and it is not a thing this command gets to decide on its own. Ask first, show what you would make, get the word, then build it. Same for the business name if the legal name and the trading name differ - that is a question, not a guess.

**Both gated behind Advertiser Verification** (up to 5 business days) plus search spend in the last 28 days, so start verification the day the account is set up. Not verified yet is fine and expected - record the name and the logo now so they go live the moment it clears, and say on the finish screen that they are waiting on verification rather than missing.

**The scout report.** `context/competitor-ads.md` should already exist - `/landing-page` runs `/scrape-competitors` before it builds the page. Missing or older than 30 days: run it now, it takes about two minutes. Writing ads without it is writing blind into a market you have not read, and it costs you the only thing that makes your copy different.

**Read the GAPS section first, before anything else.** Those are the claims nobody in the market is making. That is where the persuasive lines come from, and it is the only part of this file you cannot get from `proof.md`.

---

## 1. The library - write to the gap, not to a quota

**⛔ THE SCOPE IS WHAT I ASKED FOR. NOTHING MORE.** (Jono, 1 September 2026, after a run produced six ads across three ad groups nobody asked for.)

**The default is one ad group and two ads. That is the whole job.** Build for the ad group named in $ARGUMENTS and nothing else. Not the next one that looks empty, not the other two in the same campaign, not "while I was in there". An ad group I did not name does not get a library, does not get copy, does not get a heading in `ads-pending.md`.

**No argument given:** name the next ad group in the account structure section of `keyword-list.md` that has no ads yet, say it back to me in one line, and build that one only.

**More than one only when I ask in words** - "do 3", "the top three", "all of them". Then do exactly that number, say which ones, and say it before you start. Never widen the scope on your own, and never treat a file that already holds other ad groups as permission to refresh them. **`/scale-account` counts as asking in words for every ad group it stamps** - inside that chain, each new group gets this command's full flow (library, gates, RSAs, assets), one group at a time. (Jono, 2026-09-01)

**And the budget decides this, not the copy.** (Jono, 1 September 2026.) Ad groups are not free - each one needs enough spend to collect clicks, and a budget that feeds one properly starves three. Read the monthly budget in `context/business.md` before you widen anything: at $2,000 a month, one ad group has a chance to learn and three share the same money three ways and none of them reach statistical anything. Writing ads for ad groups the budget cannot fund is not thoroughness - it is building copy that will sit paused forever, and it makes the account look busy while learning nothing. If I ask for three and the budget does not support three, say so in one line before you write a word.

**Why this matters beyond the rule:** the library below is sized per ad group. Three ad groups written in one pass produced one library stretched three ways - 78 headlines shared instead of ~100 each - so every ad got a quarter of the selection pressure it was supposed to have. Batching does not save time, it quietly lowers the ceiling on every ad in the batch.

Build `ad-library.md` for that ad group.

**⛔ NO PREAMBLE IN THE LIBRARY FILE. LINES ONLY.** (Jono, 1 September 2026.) It opens on the first `## Angle:` heading and nothing above it. No header, no counts of what was written or killed, no "read this before the lines", no awareness-ladder essay, no restating where the market gaps are, no explaining what is deliberately absent, no next-step line. All of that is chat, and it belongs in the chat reply if anywhere. The file is a working list that `/ad-tests` reads to pull the next batch - every paragraph above the lines is something a human has to scroll past forever.

**How many.** Three times what ships, and no more. Two ads ship 30 headlines and 8 descriptions per ad group, so: **about 100 headlines and 24 descriptions per ad group**, plus one shared pool of roughly 60 trust lines that work in any campaign. Three-to-one is enough selection pressure to matter. Past that you stop writing new lines and start rewording, because a trade business has fifteen to twenty real proof points and six angles, and that is the actual ceiling. **The library grows in `/ad-tests`**, one batch per round, as losers retire - it is not front-loaded on day one for ad groups that are not live yet.

**Write in this order, and say the order out loud:**
1. **The gaps** - every claim in the scout's empty bucket that `proof.md` can back. These are the differentiated lines and they are the reason the ad wins. Write them first, while the page is blank.
2. **The table stakes** - the claims most rivals run. You match these or you look like the amateur. They are necessary and they are not what makes you different.
3. **The rest of the angles** - fill out the six angles in `references/google-ads.md` section 3 so the ad has range to test.

**Every line carries its angle tag** (offer / speed / price / trust / risk-reversal / the ask) and **every number traces to `context/proof.md`**. A claim with no line in the proof file does not go in the library at all, not in a smaller font.

**Section 9 of `references/google-ads.md` is the WRITING BRIEF, not a scoring gate.** Aim at all six things while writing - a real number, a real offer, a risk reversal, the keyword up front, reads in two seconds, provable. Do not turn it into a score out of 10 (see the gates below for why).

Headlines 30 characters, descriptions 90. Count them as you write.

---

## 2. Three gates. That is the whole cull.

A ten-point rubric was here and it is gone on purpose: it measured compliance, and it quietly converged every line toward the same shape (number plus offer plus short), which kills the angle range the ad needs to learn anything. Three gates instead, in this order.

**Gate 1 - mechanical. No judgement, no debate.** Kill on sight: over the character limit (a keyword-insertion line counts as its fallback text), anything on the auto-rejection list in `references/google-ads.md` section 7, any claim not in `proof.md`, any NEVER SAY word from `context/compliance.md`, near-duplicates of a line already in the pool. Report the count killed, not the lines.

**Gate 2 - would they click ours instead of theirs?** That is the entire gate, in those words. (Jono, 1 September 2026.)

Not "is this a good line". Not "does it rank in the top half". **Put your line beside the market's best three in that angle, taken from the scout's swipe file, and ask one question: does the person searching click OURS over THEIRS?** One reader, on a phone, who has already read three competitors' ads and has no reason to care about you. If the answer is anything other than yes, the line dies. Not "it's close". Not "it ranks second". Second place in a search result is a competitor's click.

Write the three rival lines down next to yours so the comparison is real and checkable later. A yes/no on a line judged alone drifts generous by the twentieth one; a line judged against the actual copy running today cannot.

**When a whole angle cannot beat the market, say so plainly** - that angle is where they are strong, and you match rather than fight. Recording that honestly is worth more than a survivor list that flatters the writing. The speed angle on the SEO agency group is the example: "Get Quality Leads In 7 Days" beats "live in 8 weeks" on the clock, and the only reason anything survived there is that eight weeks carries a remedy attached to it.

**⛔ THE GATE DOES NOT LOWER. THE WRITING GOES AGAIN.** (Jono, 1 September 2026.) Two ads need 30 headlines and 8 descriptions, so **30 headlines must survive gate 2, full stop.** Fewer than 30 survivors - or an angle wiped out entirely, or zero left - is not a result to report and it is never a reason to ship the best of a bad set. Go back and write more, in that angle, against those same three rival lines, and run them through the gate again. Loop until 30 stand up. Three or four passes is normal and it is the job, not a failure.

**What to change on the rewrite, because writing the same thing again gets the same verdict:** go back to the scout's GAPS bucket for a claim nobody is making · go back to `context/proof.md` for a number nobody else can say · answer a fear from `references/persuasion.md` section 4 that the three rival lines leave untouched. If you genuinely cannot beat the market in an angle after two passes, say so, and take the extra survivors from an angle where you win - the variety floor in gate 3 still has to hold.

**If proof.md is too thin to write 30 winners**, that is the finding, and it is worth more than 30 weak lines: say exactly which claims are missing, because that is a 20-minute `/context-layer` run, not a copywriting problem.

**Report per angle:** the three rival lines, which of yours beat them, and what died. Not a spreadsheet.

**Gate 3 - the variety floor.** After the two gates above, **at least four of the six angles must still have survivors, and no single angle may hold more than a third of the pool.** If the survivors are thirty speed lines, the cull has quietly produced one ad written six ways and the test that follows will learn nothing. When an angle empties out, go back and write more of it rather than shipping without it.

**Report:** what survived per angle, what the forced ranking killed, and the one line you would put money on. Not a spreadsheet.

---

## 3. The two ads

**Exactly two responsive search ads, for the one ad group in scope.** Two is the number - not three, not "one more while we are here", and not a second ad group's pair appended below. Google's own numbers say a second ad is worth about 6.6% more conversions, and the largest study of the question (Optmyzr, 13,671 accounts) found two is where conversion rate peaks - three fragments the data. Both ads are built now, from the survivors, and Google serves both and learns which combinations win.

**Do not call them champion and challenger yet.** Nothing has competed. That frame, and which one wins, belongs to `/ad-tests` once there are clicks to read.

**Each ad:** 15 headlines, 4 descriptions, every slot filled.

**Pinning - 2 or 3 keyword headlines on HEADLINE_1, and nothing else anywhere.** They are written out, they are distinct from each other, and they are the split test: Google rotates them in the first slot and you learn which keyword line wins. One pin is not a test, it is a decision made without data. Google's own June 2026 guidance is 2 or 3 unique lines per pinned position, never identical text. Everything else - the other 12 or 13 headlines and all 4 descriptions - stays unpinned. Partial pinning came in at $13.68 cost per lead against $32.57 for full pinning in Optmyzr's 2026 set, and fully pinned ads take about 3.9x fewer impressions, so the pin on HEADLINE_1 buys relevance and STAG discipline at no cost. It lowers Ad Strength; that is expected and it is not chased.

**⛔ THE CITY GOES IN THE PINNED HEADLINES, NOT A SPARE ONE.** (Jono, 2 September 2026.) The keywords are bare by design - location targeting does the geography - so the **ad** is the only place the searcher sees their own city, and headline 1 is the only slot guaranteed to serve. Putting it in an unpinned headline means it usually does not show at all, which is what the last run did.

**The rule: TWO of the three pinned keyword headlines carry `{LOCATION(City):fallback}`. Not one, not "better if" - two, every ad group, every run (Jono, 7 September 2026). The third pinned line stays bare so the slot never collapses to duplicates when the fallback fires.** Pinning and insertion are independent - a pinned headline can carry an insertion tag, and it still rotates against the other pinned lines in slot 1.

```
1. Plumber {LOCATION(City):Toronto}      [PIN H1]  keyword + city
2. Emergency Plumber {LOCATION(City):GTA} [PIN H1]  keyword + city, different fallback
3. 24/7 Emergency Plumber                 [PIN H1]  keyword, no city
```

**Never make all three identical once the fallback fires.** Google cannot always resolve a city, and when it cannot every insertion line collapses to its fallback. Three lines that all become "Plumber Toronto" is duplicate text in one pinned slot, which is a policy problem, not just a wasted slot. So: **different fallbacks on each, and keep one pinned line with no insertion at all** as the safety net.

**⛔ THE AD HANDS THE CITY TO THE PAGE.** (Jono, 2 September 2026.) Saying their city in the headline and then landing them on a page that says something else breaks the match at the click, which is where it costs the most. `push_ads.py` sets the ad's **final URL suffix** to `loc={loc_physical_ms}` automatically - the suffix, not the URL itself, because Google appends it to every destination and it survives a page move. Verify it is on the ad before you call the run done. The page reads it with `<City fallback={MAIN_CITY} />` against `website/lib/geo-map.json`, built once by `python3 code/build_geo_map.py --country XX`. No map file, no swap - the page just shows the fallback to everyone, silently.

**⛔ THE FALLBACK IS THE MAIN CITY, AND IF I HAVE NOT TOLD YOU IT, ASK.** (Jono, 2 September 2026.) Read `MAIN_CITY` from `.env` and the "Market and budget" block of `context/business.md` first. Not there? **Put it in your FIRST message with the phone number and the webhook** - one line: "If I could only name ONE city in your ads, which one?" Never guess it from the account's time zone, the address, or the first city in the keyword list. It is the fallback in every pinned headline and the fallback in the landing page H1, and Google fails to resolve a location on a large share of clicks, so it is the version most people read. `MAIN_CITY=none` (remote or national) means city insertion comes out of the ads entirely rather than shipping a guess.

**The character count is the FALLBACK, not the tag.** `Plumber {LOCATION(City):Toronto}` counts as `Plumber Toronto` - 15 characters. Write the fallback as a phrase that reads properly on its own, because it will serve: a real city or region you actually cover, never "your area".

**No keyword insertion, and it is not a test either.** Dynamic keyword insertion (`{KeyWord:...}`) raised impressions and *lowered* conversions per ad in Optmyzr's 2023 set, and showed no significant improvement in their 2024 one. Two large samples agree, so this is a production rule, not a test slot: the question is already answered and a test would only spend real money confirming it.

**Copy rules that come from the data, not taste:** sentence case (about $7.46 against $27.47 cost per lead versus Title Case, roughly 20,000 accounts, 2026), descriptions written to 61-70 characters, headlines short where the meaning survives.

**The display path is not a slogan.** `automatable.co/seo/sprint` - "sprint" is our word for how we sell, and it means nothing to someone searching. Both path fields get words the searcher already has in their head: the service and the intent, taken from the keyword. `/seo/audit`, `/seo/for-trades`, `/plumber/emergency`. Never a product name, a package name, an internal label, or a word that only makes sense after a sales call. **The test: is this a word I only say after I have explained it?** Then it does not go in the ad - it has to work cold, on a phone, from someone who has had nothing explained to them. That applies to the headlines and descriptions too, not just the paths (`references/persuasion.md` section 5). Fifteen characters each, and it does not have to match the real URL - it just has to be true to the page. If a path adds nothing the headline does not already say, leave it empty rather than filling it. (Jono, 1 September 2026.)

**Remember how Google serves since 20 February 2025:** a headline can appear alone, inside the description slot, or in a sitelink slot. Every line has to stand up by itself, out of order, next to any other line.

**`ads-pending.md` holds THIS ad group only.** Replace the file, do not append to it. If it still holds a previous run's ad groups, they are done or they are stale - either way they are not this run's job, and leaving them in the file means the push script sees ad groups I never asked for.

**Write the ads to `ads-pending.md`** in the exact shape `push_ads.py` parses - `# Ad group: <name>`, then `**Final URL:**` and `**Display path:**`, then `## Ad A` / `## Ad B`, each with `### 15 headlines` and `### 4 descriptions` as numbered lists, each line followed by its indented `NN characters · angle` note, and `· PIN H1` on the one pinned headline. That file is the input to the push, not the deliverable.

---

## 4. Create them. This is the step that makes them real.

**⛔ NOT OPTIONAL, AND NOT A SEPARATE COMMAND.** `/write-ads` ends in the account, not in a file.

Policy checklist first (`references/google-ads.md`): no phone numbers in the text, no star glyph even though the ASCII "5*" is allowed, no fear framing, superlatives only with third-party proof visible on the page. Then:

```
python3 code/push_ads.py --ad-group "<the ad group>"           # validate only, creates nothing
python3 code/push_ads.py --ad-group "<the ad group>" --push    # creates them, PAUSED
```

The script refuses more than one ad group or more than two ads in a run - that is the scope rule enforced in code, not just written down. Always pass `--ad-group`. The first run checks the counts, the 30/90 limits (an insertion tag counts as its fallback), the single pin on headline 1, no keyword insertion, no duplicates, that the final URL returns 200, and that the ad group exists - then hands the whole batch to Google with `validate_only` so policy rejections surface before anything is created. Show me that output. **Then run it again with `--push`.**

**Definition of done: Google returned ad IDs.** The script prints one line per ad - campaign, ad group, Ad A/B, ad id, PAUSED - and appends them to `context/ads-live.md`. No ad IDs means no ads. Never say "built", "shipped" or "done" without them.

**When the push genuinely cannot run**, there are only three reasons and each has an owner:
- **The home page is dead** - the site is not deployed. Nothing can be created; Google policy-checks the URL at creation. Deploy first.
- **The ad group does not exist** - `/campaign-plan` has not run. Run it, then push.
- **Credentials missing or the account is not linked** - `code/test_connection.py` says which.

Say which one it is on the FIRST line of the finish screen, with the exact command that clears it. A missing landing page is NOT on this list - that is a home-page placeholder, not a blocker.

---

## 5. Assets

**Read `references/ad-assets.md` and `references/persuasion.md` FIRST** - ad-assets sets the tier order, the exact limits, worked examples and the mistakes that waste a slot; persuasion.md decides what goes in them. A callout is one short line, which makes it the cheapest slot in the account to kill an objection - use the six fears in section 4, and never let an asset repeat a headline. **Assets get created, not described - same rule as the ads.** Write them into the `# Assets` section of `ads-pending.md`, then:

```
python3 code/push_assets.py --ad-group "<the ad group>" \
    --business-name "<25 chars>" --logo <file> --privacy-url <url> --whatsapp +1...
python3 code/push_assets.py --ad-group "<the ad group>" ... --push
```

**⛔ AFTER THE PUSH, READ THE STATUS BACK AND EXPLAIN IT IN PLAIN WORDS.** (Jono, 1 September 2026.) "Created" is not "showing", and the gap between them is where every "I don't see it" comes from. `push_assets.py` prints this automatically from `primary_status_reasons`; your job is to say what each one means for me, in one line each, with what to do about it:

- **`ASSET_UNDER_REVIEW`** · Google is reviewing it, normally up to 2 business days. Nothing to do.
- **`ASSET_DISAPPROVED`** · it will never show as-is, and **recreating it does nothing** - Google dedupes identical text into the same asset id, verdict included. The only route is Appeal in the UI, reason "Dispute decision" when the page never changed. For a business name the usual policy is Name Prominence: fetch the landing page and count the visible occurrences of the name before appealing. For a business name that means it does not match the verified domain root or legal entity exactly, or it carries a keyword. For a logo it means it breaks square 1:1, 128x128 minimum, under 5120 KB, or it is not on the landing page.
- **Business name and logo gated twice** · they need completed **Advertiser Verification** AND **search spend in the last 28 days**. On a new campaign they will read PENDING or NOT_ELIGIBLE and that is expected. Say so instead of letting me hunt for them.
- **Campaign or ad group paused** · nothing serves and no preview populates. Say it out loud, because a paused account looks identical to a broken one.
- **Where to look** · sitelinks, callouts and snippets live on the AD GROUP, so they are in the Assets view filtered to that ad group, NOT in the ad editor - that screen reads campaign level and will look empty.

Never end a run with an asset in an unexplained state. Every one is live, under review, disapproved with a named reason, or waiting on something only the account owner can click.

**The script blocks the run if any asset is missing** and prints the exact thing to go and get. That is the enforcement - the rule is not left to memory. **Definition of done: Google returned asset IDs**, printed per asset and logged to `context/ads-live.md`. **Assets go on the AD GROUP** (Jono, 1 September 2026). It is the most granular level the API has - the only writable asset links are customer, campaign, ad group and asset group (Performance Max), so there is no ad-level link to use, and an ad-group asset serves under the ads in that ad group and nowhere else. Sitelinks, callouts, snippets, the call asset and messages all go there. Only the lead form, business name and logo sit at campaign level, because Google accepts nothing lower for them. `--level campaign` moves the rest up, and only for a campaign that holds one theme. `build_assets.py` is the old hardcoded Toronto-plumbing demo - it is not the push path.

**Then turn Google's automated versions off** - `code/disable_auto_assets.py`. Dynamic sitelinks can serve *instead of* the ones you just wrote.

**⛔ EVERY ASSET IS REQUIRED. ALL OF THEM. EVERY RUN.** (Jono, 1 September 2026.) Sitelinks, callouts, structured snippets, the call asset, the lead form, the business name, the logo, and messages. The tiers in `references/ad-assets.md` are a **build order, not a menu** - "tier 3" means build it third, never "build it if there is time". Nothing here is optional, nothing gets written into the file as "pending", and nothing is quietly dropped because an input was missing. **The only way an asset is left out is me asking for it to be left out, in words** - and then it is recorded with `--skip <name>` so the decision is visible.

**Build order** - the tiers exist because no study with a stated sample compares lift across asset types, so the order is defended on mechanics rather than invented percentages:
1. **The call asset.** A trade's leads arrive by phone. E.164 format (`+15555550100`, no spaces or dashes), a real number, in service.

   **⛔ Ask me to do this before the push, because the API cannot:** in Google Ads, **Settings → Account settings → Call reporting**, and accept the **call recording Terms of Service**. Without it Google returns `CALL_CUSTOMER_CONSENT_FOR_CALL_RECORDING_REQUIRED` and the call asset cannot be created at all - probed four ways on a live account, every `call_conversion_reporting_state` is refused identically, and call reporting already being enabled does NOT satisfy it. It is one click and it takes a minute. Say it in the FIRST message of the run alongside the phone number, not after the push fails.
2. **Six sitelinks**, on INTENT targets (pricing, emergency, reviews, financing, areas served, book now) rather than navigation - About and Contact are site furniture. Reuse the descriptions `/standard-pages` wrote. **Fetch every URL live, refuse anything not 200**, never the home page, never the ad's own final URL, never the same page twice, and never reuse link text - that last one is a policy violation, not a style note.
3. **Eight to ten callouts** carrying claims that are NOT in the RSA headlines, the descriptions, or the sitelink text. Repetition there is a disapproval, not a wasted slot.
4. **Structured snippets.** One or two headers for the whole account, from Google's fixed 13. **"Services" is not a header - it is "Service catalog."** Three to ten values, each a literal thing sold, never a promotional claim.
5. **The lead form.** Full name, email, phone. Needs `LEAD_WEBHOOK_URL` and `LEAD_WEBHOOK_SECRET` in `.env` plus a privacy policy URL, and the Lead Form Terms accepted in the UI first. Leads die inside Google at 60 days without the webhook.
6. **Business name and logo.** Google's largest published figure, 8% more conversions. Both gated behind **Advertiser Verification** plus **search spend in the last 28 days** - so they will read PENDING or NOT_ELIGIBLE on a brand new campaign and that is expected, not a failure. Start verification the same day. After the push, read `campaign_asset.primary_status_reasons` and say which it is: `ASSET_UNDER_REVIEW` means wait up to 2 business days, `ASSET_DISAPPROVED` means the name does not match the verified domain or legal entity, or the logo breaks the square 1:1, 128x128, under 5120 KB rules.
7. **Messages.** WhatsApp business message asset - the third contact path for the person who will not call and will not fill in a form.

**A set at one level must be complete on its own.** A single ad-group callout makes every campaign and account callout ineligible for that ad group - so an ad-group callout set carries the universal claims too. Never split a set across levels hoping they add up.

**Both of these were asked for in preflight. If they are still missing at this point, that is the finish screen's first line, not a footnote.**

- **The phone number for the call asset.** It has to be a real, in-service number in the same country as the account - Google places test calls. The GHL number is the right one, because it is the number the call tracking and the speed-to-lead workflow already run through.
- **The webhook for the lead form asset** (`LEAD_WEBHOOK_URL` in `.env`), so a form lead lands in the CRM instead of an inbox nobody watches.

**No GoHighLevel yet?** Say so and walk me through it rather than skipping the assets. It is **$1/month** through the community perk: https://www.skool.com/automatable/classroom/32447943?md=47d1df7d71c449baa5ab88c94340718c - sign up, get the number, then Automation, new workflow, trigger "Inbound Webhook", copy the URL. About five minutes. Already have GHL? Confirm it, record both in CLAUDE.md "## My setup", and never ask again.

Missing either one: build every other asset, mark that one **pending**, and say which asset is not running and what it costs to leave it off. Never invent a phone number.

---

**Compliance gate:** before any push, check every line against `context/compliance.md` and the NEVER SAY list in `context/proof.md`. CRITICAL breaks stop the push and name the rule.

**Finish - the account status FIRST, the copy second.** Line one is what exists in Google Ads right now. Nothing about the writing goes above it.

```
CREATED IN THE ACCOUNT · <n> ads · <campaign> · <ad group> · ad ids <...> · PAUSED
```
or
```
NOTHING WAS CREATED · <the one reason> · clears with <the exact command>
```

Then, **one line per wire, never a table**:

- Each ad · ad id · final URL · the page it points at, fetched live · **REAL PAGE** or **HOME PAGE PLACEHOLDER** · status
- Each of the 6 sitelinks · target URL · status · the description used
- Call asset · the number, or **PENDING - no GHL number given**
- Lead form asset · webhook set, or **PENDING - no `LEAD_WEBHOOK_URL`**
- Callouts / snippets · count built, and that none repeat the RSAs

Then the writing: survivors per angle, and the one line you would put money on.

Anything PENDING or PLACEHOLDER gets named out loud with what it costs to leave it off - never buried under the copy. Then the next step: `/landing-page` for any placeholder ad group (it wires the tracking too, and nothing is enabled until its tracking gate passes), then `/ad-tests` in a fortnight once clicks exist.
