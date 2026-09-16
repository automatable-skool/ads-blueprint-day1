---
description: Build the campaigns through the API - everything lands PAUSED
---

Build my campaigns. Read `references/campaigns.md` FIRST and follow it exactly.

**Requires:** the `# Your account structure` section at the top of `keyword-list.md` (run `/keywords`; if the file has research but no structure section yet, offer to run `/keywords stag` now). The monthly budget comes from `context/business.md` "Market and budget" - if it's blank, ask once and write it there. This is where the budget decision lives: the two tests below decide how many campaigns it can honestly fund.

**Nothing gets asked that a file answers.** Customer ID from `.env`. Budget and hours from `context/business.md` (hours set the ad schedule - 24/7 only where a person answers). Each ad group's landing page from its `**Landing page:**` line in `keyword-list.md`; a group without one gets the closest real page and a **page pending** flag, never a question.

**The architecture (from the account structure section):**
- Campaigns = service
- Ad groups = STAG (single-theme, service only). **Never city ad groups** - see `references/stag.md` section 6
- Keywords = the cluster's synonyms, phrase match, **no city appended**
- Location = campaign level, whole service area, set to **Presence**. That is what makes it local, not the keywords
- City appears in the AD via location insertion (1-2 RSA headlines, fallback text set), and on the page via a URL parameter

**⛔ ONE campaign. The recommendation is always a single campaign - never three.** (Jono, 1 September 2026.) Every service the account sells is a STAG ad group inside that one campaign, sharing one budget and one bid strategy. State it as the recommendation with a one-line reason; do not ask how many campaigns, and do not offer a multi-campaign launch as an option. A second campaign is earned later through `/scale-account`, or raised with me as a question if the numbers genuinely argue for it - see `references/campaigns.md` "How many campaigns".

**Build via `code/build_campaigns.py` - three ad groups MAXIMUM inside that one campaign, and only one goes live.** The first three groups in `keyword-list.md`'s Pending order. **That file has no "next up" list and does not need one - its own numbering IS the order, top down. #1 live, #2 and #3 paused.** Never ask me which keyword or group to start with as an open question, and never re-rank the list here (`/keywords` already did that). Read it top down, state the three in that order as the recommendation, and ask me to confirm or swap. Recommend first, then ask. All three land PAUSED; I enable only the first, with the whole budget. The other two sit built-but-paused as the bench. **Every other ad group in the map stays in `keyword-list.md` and nowhere else** - nothing is created in the account until `/scale-account` stamps it from the proven template. A brand-new account with nine live ad groups spreads the budget too thin for any of them to learn (see `references/scaling.md`). Confirm the 9 campaign settings per the spec, especially:
- Search network only - UNTICK Display network and search partners (Google pre-ticks both; they burn local budgets)
- Location targeting on **"Presence"**, never "Presence or interest" (the leak is real; size it from the account's own geographic report, never a blog percentage). **The one exception (Jono, 2026-08-29): businesses whose customers are NOT in the area yet** - hotels, tours, vacation rentals, destination weddings, relocation services - keep "Presence or interest", because the buyer is searching about the place from somewhere else. Read the business type and services in `context/business.md`; if it is that kind of business, say so and set interest on purpose
- **The broad-match campaign toggle OFF** - it defaults ON under Smart Bidding since July 2024 and silently converts every phrase keyword to broad on save; campaigns left with it on auto-upgrade to AI Max in September 2026
- Text customization (the old "automatically created assets") OFF and final URL expansion OFF
- **Bidding at launch: Maximise Conversions** (Jono's ruling, matches the course) - with one caveat from the data: a brand-new account can serve nothing for a week on Maximise Conversions; if that happens, switch to Maximise Clicks with a cost-per-click cap for 2-4 weeks, then back. Target CPA at ~30 conversions in 30 days, set from the last 30 days plus 10-20%, never aspirationally. Never target ROAS on flat lead values
- **Language: send nothing.** Google is removing language targeting from Search in late September 2026 and asked API developers to stop sending the criterion - the "English constant 1000" line is retired
- **Ad rotation: Optimize** (Smart Bidding forces it anyway; "rotate evenly" no longer exists)
- **Goal: Leads, measured by the primary conversions only** - the campaign's conversion goals are the account's primaries, never a secondary; if the lead action isn't marked Primary and biddable (`/account-setup` step 4, or `/landing-page`'s tracking gate), stop and say so
- **Ad schedule from `context/business.md` "Hours":** 24/7 only where a person answers; everything else business hours
- **One budget per campaign, never shared** - Emergency's wallet can't be drained by Generic
- **Exclude every other country** (Jono's rule, 2026-08-29, local and national businesses; internet businesses selling worldwide skip it). Presence-only targeting limits who sees the ads; the exclusion list closes the gaps it leaves - VPNs, bots, mis-located traffic - so the campaign can never serve abroad. `python3 code/exclude_other_countries.py --campaign <id> --keep <CC>` right after the campaign is created, idempotent, `--all-search` for every Search campaign at once. The country code comes from `context/business.md` "Market and budget"
- **The budget math sizes the one campaign, it does not multiply it:** daily budget = monthly ÷ 30.4; the campaign needs at least 3x (ideally 5x) the expected cost per lead per day AND at least 10 clicks a day. Report both numbers and say plainly how many ad groups that budget can honestly test at once. It is still ONE campaign either way

- **⛔ NEVER use one blanket conversion rate across the account (added 1 September 2026 after a run did exactly that).** A forecast like "134 clicks, so about 4 leads" is a hidden 3% assumption applied to every keyword equally, and it is wrong in both directions: it flatters the research terms and it insults the emergency ones. **Every lead forecast must state the rate it used, per ad group, and where that rate came from.** See `references/campaigns.md`, "Forecasting leads", for the source hierarchy and the intent tiers. Never print a lead number without the rate and the source beside it
- **Negatives live at ACCOUNT level, never campaign level (Jono's ruling, 1 September 2026).** Do not attach a shared negative list to a campaign and do not add campaign-level negative keywords. The account-level list (Admin → Account settings → Negative keywords, pushed by `/account-setup`) already applies to every campaign, so a campaign-level copy is a second place to maintain the same thing and a second place for it to go stale. The only negatives a build writes are **ad group level**: each specific STAG's trigger words negated on the groups they do not define, so one search lands in one ad group
- **⛔ Checking the account list: `shared_set.member_count` reports 0 for `ACCOUNT_LEVEL_NEGATIVE_KEYWORDS` and is not to be trusted** [F, 1 September 2026]. It reads as an empty list when the list is full. Count the members with `SELECT shared_criterion.keyword.text FROM shared_criterion WHERE shared_set.id = <id>` instead. Never tell the owner their negatives are missing on the strength of `member_count`
- Confirm the lead conversion action is Primary and biddable before the build (the November 2025 goals change)

**Starter RSAs:** none from this command. `/write-ads` writes them from `context/proof.md` and `code/push_ads.py` creates them PAUSED - an ad group with no ad serves nothing, which is exactly right until the copy is approved.

**EVERYTHING LANDS PAUSED.** Nothing spends until I review and flip it on myself.

**If the API isn't approved yet:** build the entire plan paste-ready instead - campaign settings table, ad groups, keywords with match types, budget split - formatted so I can enter it by hand today. Note which script re-runs it via API once `/api-setup` lands.

Finish: show me the account tree that now exists (or the paste-ready plan), and point me to `/write-ads`.
