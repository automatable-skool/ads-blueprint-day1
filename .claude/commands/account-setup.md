---
description: Account setup - configure a Google Ads account correctly: security, billing traps, autopilot off, the foundation
---

Configure my Google Ads account (created during `/api-setup`) so it's born right. Walk me through one step at a time - this is where Google sets traps for beginners.

**Read `references/account-setup.md` FIRST** - the ordered checklist, the nine switches, the link order, where negatives go, security, what changed in 2024-2026, and the rules at the bottom.
---

## ⛔ FIRST: build the checklist, don't start asking questions

Before step 1, read the account and the project files, work out what is **already done**, and print the whole checklist once with the done items crossed off. Most accounts arrive half-configured; asking me about things that are already set is how this command wastes an hour.

**Where the state comes from:**
- `python3 code/test_connection.py` - is the API even talking to this account
- `python3 code/check_conversion_setup.py` - every conversion action, category, primary/secondary, counting, last fired
- `python3 code/check_autopilot.py` - auto-apply recommendations, text customization / AI Max asset optimization
- `.env` - is `GOOGLE_ADS_CUSTOMER_ID` filled in
- `CLAUDE.md` "## My setup" - everything confirmed on a previous run. This is the memory: the things no API can read (2FA, passkey, billing, time zone) live here so a second run never re-asks them
- The account itself for time zone, currency, auto-tagging, linked products, and account-level negatives

**Then print it exactly like this, done items struck through with the evidence:**

```
Account setup - 7 of 16 done

~~1. Time zone + currency locked~~ - <time zone>, <currency> (read from account)
~~2. My email owns the account~~ - confirmed 2026-08-14
~~3. 2FA on~~ - confirmed 2026-08-14
4. Passkey created - NOT DONE. Takes 1-2 days to trust, so do this first
~~5. Customer ID in .env + API connected~~ - 123-456-7890, test_connection passed
6. Billing: cap + promo credits - UNKNOWN, need to look
...
```

**The 16 items, in this order:**
1. Time zone + currency checked (permanent, existing accounts only)
2. My email owns the account, not an agency's
3. 2FA on
4. Passkey created
5. Customer ID in `.env` + API connection tested
6. Billing: account budget cap considered, promo credits claimed
7. Every existing conversion action reviewed with a decision recorded on each
8. Target primaries exist - max 3, calls primary for a local service business
9. Counting: ONE per click on every lead action · EVERY per click only for e-commerce purchases, where each sale is real money
9b. Conversion window matched to the sales cycle - never shorter than the time a lead takes to book
10. Google's auto-created goals demoted - **run `demote_conversion_goals.py --apply`, never hand this one to me**
11. Enhanced conversions for leads ON
12. Auto-apply recommendations OFF, both bundles - `python3 code/pause_auto_apply.py --apply` pauses every type the API can name; types it reports as UNKNOWN (retired from the API, still ticked on screen) need Admin → Recommendations auto-apply → untick
13. Text customization / AI Max asset optimization OFF
14. Account links: Business Profile first, then GA4
15. Account-level universal negatives pushed, every serviced city removed from the geo block
16. Read-back written to `CLAUDE.md` "## My setup"

**Rules for the checklist:**
- **Crossed off means verified**, with the evidence on the line. Never cross something off because it "should" be done or because the command reached that step.
- **Three states only:** done (struck through), NOT DONE, or UNKNOWN. Guessing is not a state. An item you cannot read gets `UNKNOWN` and gets checked.
- **Anything no API can read** - 2FA, passkey, billing method, promo credits, the Enhanced Conversions toggle, time zone on an account I didn't create - gets asked **once**, then written to `CLAUDE.md` "## My setup" with today's date. Next run it crosses off without asking.
- **Work only the open items**, top down, one at a time. Skip the struck-through ones entirely - don't re-explain them.
- **Reprint the checklist after each item** so I can watch the count go up.
- If everything is already crossed off, say so in one line and send me to `/keywords`. Don't invent work.

The numbered steps below are the detail for each item. Read them when you get to that item, not before.

---

**1. Existing account only - the two PERMANENT settings.** If this account was created before the track (by me or an agency), check time zone and currency once: Admin → Account settings. Both are unchangeable - if either is wrong, say so now, because the only fix is a new account. If I created the account during `/api-setup`, skip this - it was covered there.

**2. Ownership + security:** 2FA on AND a passkey created today - passkeys are required for adding users or changing billing (since 15 July 2026) and for minting API refresh tokens (since 5 August 2026), and they take 1-2 days to trust. MY email owns the account (never an agency's) - if an agency owns it, get ownership transferred before anything else. Note the 10-digit customer ID into `.env` (`GOOGLE_ADS_CUSTOMER_ID`) and CLAUDE.md "## My setup". Expect the new-account throttle: Google's limited ad serving (Search since 12 June 2026) uses account age as a signal - nothing to fix, just expect thin impressions for the first weeks.

**3. Billing traps.** Google already took the payment method at signup, so don't redo that. Two things it didn't do: recommend an account-level budget cap if Google's UI offers one for my country, and check for signup promo credits ("spend $X get $Y") - claim if available, but never let the promo dictate the budget.

**3b. ⛔ THE ECONOMICS ON FILE, OR COLLECTED NOW.** Open `context/business.md` "## The economics".
If average job value, close rate and confidence are filled, cross this off and move on. If any is
blank, ask the three questions in one AskUserQuestion call (job value · close rate · measured/
estimated/guess) and write the section - the same collection /context-layer does, because whichever
command runs first should catch it. Every bid strategy and every /search-terms threshold is a
multiple of these numbers; an account set up without them is bidding blind and every downstream
finding gets graded Assumed. Takes one minute, never skipped.

**4. ⛔ CONVERSION GOALS - MANDATORY, NEVER SKIPPED.** This is not a pointer to another command and it is not optional. An account whose goals are wrong bids toward the wrong thing with every dollar it spends, and nothing downstream can fix it. If I ask to skip this, refuse, say why in one line, and carry on with the step.

**You must go through every existing action with me, one at a time.** I am allowed to keep what is already there - I am not allowed to leave without a decision on each one.

1. **Read the account first, never propose blind.** Run `python3 code/check_conversion_setup.py` and show me what already exists: every conversion action, its category, primary or secondary, its counting setting, and whether it has fired in the last 30 days. Most existing accounts arrive with something wrong here - a page view as primary, a duplicate GA4 import, calls not counted at all.
2. **Say what the target looks like for MY business**, read from `context/business.md` "Market and budget" - the primaries for that model per `references/conversion-tracking.md`. Do not ask cold; propose, then confirm.
3. **Go action by action.** For each one already in the account give me a one-line verdict and a choice: **keep as is · demote to secondary · change the counting · delete**. Name the reason ("this fires on every page view, so Smart Bidding is chasing browsing"). A stale action that has not fired in 30 days gets flagged, not silently kept.
4. **Then the gaps.** Anything the model needs that does not exist yet gets created via `code/setup_conversion_tracking.py` / `code/apply_conversion_tracking.py`.
4b. **Demote Google's auto-created actions with the script, and never declare them UI-only without running it.** `python3 code/demote_conversion_goals.py --customer <id> --dry-run`, then `--apply`. Google auto-creates "Clicks to call", "Local actions - Directions", Smart campaign actions and YouTube subscriptions as PRIMARY, so bidding chases a map-pack direction tap as hard as a booked job. `primary_for_goal = false` **is** refused on Google-hosted actions - that is the refusal everyone hits - but the goal-level route (`CustomerConversionGoal.biddable = false`, keyed on category + origin) takes them out of bidding, and the script falls back to it automatically. A Google-hosted phone tap is `PHONE_CALL_LEAD/GOOGLE_HOSTED` while a real website call is `PHONE_CALL_LEAD/WEBSITE`, so the junk goes and the real conversions stay. **Only what the script prints as FAILED is genuinely a hand job** - name those individually with the click path, never the whole list.

⛔ **Evidence gate (added 2026-08-31 after a run got this wrong).** You may not tell me "Google refused" or "this is a hand job" for a conversion action unless you have **actually run `demote_conversion_goals.py --apply`** and can paste the FAILED line for that specific action. The `primary_for_goal` refusal on Google-hosted actions is EXPECTED and is not the answer - it is the reason route 2 exists. A dry run is not evidence either; dry runs never fail. If you find yourself about to hand me a list of actions to demote by hand in the UI, stop: run the script first. **Enhanced conversions (4c) is the only genuinely UI-only item in this step** - everything else in the demote list is the script's job.
4c. **Enhanced conversions - read it, then hand it over.** This one really is UI-only for the toggle: the API exposes `customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled` as a read and it flips on as a side effect of uploading through the API, with no direct mutate. Query it alongside `accepted_customer_data_terms` so I know whether it is one click or a terms acceptance first, then give me the path: Goals → Settings → Enhanced conversions → on.
5. **The rules that do not bend** (full detail in `references/conversion-tracking.md`): max 3 primaries, each tied to real money · calls MUST be primary for a local service business or Google bids half-blind · minimum call length 1 second - any CONNECTED call is a lead (ring-hangups never connect, voicemail pickup counts), voicemail ON, raise the threshold only on observed spam · counting is ONE per click for every lead action (the API default is Every and that double-counts) - EVERY per click belongs only to e-commerce purchases, where a second sale is a second conversion · never two primaries for one business event · Enhanced Conversions ON, auto-tagging ON · **the conversion window matches the sales cycle**: if leads take weeks to book, a short window undercounts and Smart Bidding starves on data that was actually there - read the typical lead-to-booked time from the owner, set the click-through window comfortably past it (the 30-day default is right for most local service; never shorten it below the cycle).
6. **Verify, do not assume.** Re-run `code/check_conversion_setup.py` and read the final state back. Until a real test conversion has been seen, tracking is BROKEN, not "probably fine" - and I need to know that in those words.

⛔ **GATE.** Do not move to step 5 until every existing action has a decision recorded and the target primaries exist. Record the final set in CLAUDE.md "## My setup".

⛔ **This step sets up the account-level goals and NOTHING on the website.** No tags, no snippets, no thank-you page, no landing pages. Creating the actions here is half the job; `/landing-page` wires the pages to them so they actually fire. Never build or edit a page from this command - say "run `/landing-page` next" instead.

**5. The rest of the foundation stack** - run in order:
- **Autopilot off** → auto-apply recommendations OFF both bundles. "Auto-created assets" is now **text customization inside AI Max**, per campaign (since 27 May 2025): Campaigns → Settings → AI Max → Asset optimization → untick. Campaigns still on the legacy setting are force-upgraded to AI Max in September 2026. Verify with `code/check_autopilot.py` + `code/disable_auto_assets.py`.
- **Account links** → Google Business Profile first (it's what switches on location assets and the Maps surface: Tools → Data manager → Connected products → Business Profile → link; up to 24 hours to sync), then GA4 if there's a site. When GBP links, Google auto-creates "Clicks to call" and "Local actions" conversion goals - confirm they arrived as SECONDARY and demote any that didn't. Merchant Center, Search Console, Tag Manager only if they apply.
- **Universal negatives** → two different places, never confused: **account-level negatives** are their own setting (Admin → Account settings → Negative keywords; cap 1,000; apply to Search, PMax, Shopping and more) and hold the universal 40-60 only - jobs, DIY, education. A **shared list** can never be account-wide; it attaches per campaign and holds the category blocks. Read `references/universal-negative-keywords.md`, phrase match for single words, add anything from `context/business.md`'s DON'T list. **The geo block is the trap: REMOVE every city I actually serve from it** - the stock list blocks neighbouring cities, and blocking one I serve kills real traffic silently. ⛔ Confirm the list with me, then push via `code/add_account_negatives.py` (API live) or stage it paste-ready (API still baking), and verify no serviced city ended up in it. Never at account level: your own brand, competitor names, or high-intent modifiers (cheap, near me, license, reviews, cost, emergency).

**6. The read-back.** One summary I can screenshot: time zone, currency, auto-tagging, conversion actions, linked accounts, autopilot status, the shared negative list, 2FA + passkey. Flag anything off. Next: `/keywords`.
