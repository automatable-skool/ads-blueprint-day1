# Account setup - birthing a Google Ads account correctly
Built 28 August 2026 from 66 sources · two permanent decisions · nine switches · 31 rules
Next: run `/account-setup` and work the checklist top to bottom, stopping at each PERMANENT line.

Grading: (a) Google's own page · (b) two or more reputable sources agree · (c) single source or inferred. Re-check anything marked (c) before relying on it.

---

## The two decisions you cannot undo

**Time zone** · PERMANENT on a serving account · (a)
- Governs every time-segmented report and every ad schedule forever
- Billing pages ignore it and always show Pacific time
- Manager accounts get one reset, eastward only, once. Serving accounts get none
- Pick the time zone of the city the business serves, not where the agency sits (c)

**Currency** · PERMANENT · (a)
- No exceptions, no support ticket, no manager-account loophole
- Match the currency the business banks in
- The only fix is a new account, and historical data does not move with it

Both are chosen on the billing screen right after "Create an account without a campaign". Say them out loud, then click Submit.

---

## The ordered checklist

`/account-setup` runs this as a live checklist: it reads the account and `CLAUDE.md` "## My setup" first, crosses off everything already verified, and only works the open items. Anything no API can read (2FA, passkey, billing, time zone) is asked once and recorded in `CLAUDE.md` so the next run skips it.

### Step 1 - Create the account without a campaign · (b)

- Go to ads.google.com, sign in with the business owner's Google account on the business domain
- The flow pushes Smart Mode and a Smart campaign with a budget. Do not fill it in
- Find the small link near the bottom: "Are you a professional marketer? Switch to Expert Mode"
- Then "Create an account without a campaign", bottom left
- Smart to Expert is one-way. Good. You never want back
- Billing screen: country, TIME ZONE, CURRENCY. Stop. Read them back. Submit
- Click "Explore your account". Copy the ten-digit customer ID from the top right into `.env` as `GOOGLE_ADS_CUSTOMER_ID` and into CLAUDE.md "## My setup"

### Step 2 - Ownership and access · (a)

- The account is created by, and owned by, the business. Never inside an agency's manager account. An account born inside a manager is owned by that manager automatically; a linked account is not
- Owner holds Admin. Only Admin can unlink a manager. Standard can edit everything and remove nobody, which is why it is the trap level
- Helpers arrive through a manager-account link at Standard. Nobody gets Billing unless they pay the bills
- The same Google account owns the payments profile, the tag container, the GA4 property, the Business Profile and any Merchant Center. These strand separately on a bad exit (b)

### Step 3 - Security · (a)

- 2-Step Verification on for every user: Admin then Access and security then Security. Authenticator app or hardware key, not SMS (b)
- Create a passkey on the owner's device now. It takes one to two days to pair with Ads, and adding users, changing billing or changing links requires it on enforced accounts since 15 July 2026
- The Google Ads API requires 2SV on new refresh tokens since 21 April 2026 and passkeys since 5 August 2026
- Quarterly: list users, remove anyone who left

### Step 4 - Billing · (a)

- One card in the business's legal name. No prepaid, no virtual, no personal card with a different name (b)
- Automatic payments charge at the payment threshold or on the first of the month, whichever is first. The threshold starts low (Google's example is fifty dollars US) and climbs as you hit it. You cannot lower it. It is a trust ladder, not a cap
- Never dispute a Google charge with the bank. A chargeback suspends the account
- Promo credit: only if the account is under fourteen days old at redemption. Credit lands up to thirty-five days after the spend requirement, applies to future spend only, and expires sixty days after it lands. The budget comes from the plan, never from the credit
- Spend ceiling: if Billing then Summary shows "Manage spend limit", set it to the monthly ceiling (c). Otherwise the ceiling is the sum of campaign daily budgets times 30.4, and any single day can reach twice a daily budget. Account budgets proper exist only on monthly invoicing

### Step 5 - Verification · (a)

- Advertiser verification reaches everyone eventually. Triggers: regulated vertical, brand names in ads, ownership or billing changes, suspicious signals, a suspension appeal
- Clock: thirty days to start after the notice, thirty days to finish. Miss it and ads pause. Review is three to five business days (b)
- Organisation verifies with registration and a tax document; an authorised person verifies with government ID. Expect to redo it yearly (b)
- Locksmiths in the US and Canada, garage door services in the US: Advanced Verification, with a video call, six to eight weeks, and no ads on those searches until it passes. Health care cannot run pre-badge Local Services ads either (b)
- Business name and logo visible on the landing page; the business operations check looks for it (b)

### Step 6 - The nine switches

Work these in order. Each one is a line in the read-back.

1. **Auto-tagging ON** · Admin then Account settings then Auto-tagging · on by default, confirm it · (a)
2. **Auto-apply "Maintain your ads" OFF** · `python3 code/pause_auto_apply.py --apply` pauses every type the API can name; types it reports as UNKNOWN are retired from the API and need Admin then Recommendations auto-apply then untick · (a)
3. **Auto-apply "Grow your business" OFF** · same screen, then open the History tab and confirm nobody enrolled the account earlier · (a)
4. **Text customization OFF** · per Search campaign, AI Max then Asset optimization, untick Text customization. This is the old "automatically created assets", renamed 27 May 2025. Campaigns left on are force-upgraded to AI Max in September 2026. If the legacy account-level toggle is still visible, turn it off; it cannot be turned back on · (a)
5. **Enhanced conversions ON** · Goals then Settings, accept the Data Processing Terms. Web and leads are one switch since June 2026. Note consent mode if any EEA, UK or Swiss traffic exists · (a)
6. **Call reporting ON** · Account settings then Call reporting. A Google forwarding number captures duration, start time and caller number over fifteen seconds. The number belongs to Google and can change · (a)
7. **2-Step Verification ON** for every user, passkey created · (a)
8. **Local actions goals checked** after the Business Profile link · they arrive as Secondary; leave them there unless calls or directions are the actual goal · (b)
9. **Payment threshold recorded** and, where offered, the account spend limit set · (a) and (c)

Optimization score: write the number down, then ignore it. It is Google's estimate of how many suggestions you have accepted, zero to one hundred percent, and it moves when you dismiss things. It is not performance (a).

### Step 7 - Links · (a)

- **Business Profile** · Assets then plus then Location, or Data Manager then Connected products. The request emails the Business Profile owner; approve it from that inbox. This is what makes location assets and Maps placement possible, and it is what triggers the auto-created local actions goals in switch 8
- **GA4** · from GA4 Admin then Google Ads links. Needs Editor on GA4 and Admin on Ads. Personalized advertising is on by default. Data flows within forty-eight hours. Auto-tagging is the dependency
- **Search Console** · link it for the paid-and-organic report (b)
- **Merchant Center** · skip unless there is a product feed. Shopping and feed-based Performance Max need it; a plumber does not (b)
- **Tag Manager** · a deployment choice for the Google tag, not an account link. Own the container on the business account (b)

### Step 8 - Conversion goals at account level · (a)

- **MANDATORY, never skipped (Jono's ruling, 2026-08-31).** This step is not a pointer to another command and not optional. An account with the wrong goals bids toward the wrong thing with every dollar, and nothing downstream corrects it. Read the account first with `code/check_conversion_setup.py`, then walk EVERY existing action with the owner one at a time - each gets a verdict and a choice: keep · demote to secondary · change the counting · delete. The owner may keep what is already there; they may not leave without a decision on each one. Create the missing primaries after, never before, the audit. Re-verify with the same script and record the final set in CLAUDE.md "## My setup"
- The audit exists because most existing accounts arrive wrong in a predictable way: a page view or a click set as primary, a duplicated GA4 import competing with the native tag, calls not counted at all, or lead actions left on the API's default Every counting (which double-counts). None of these announce themselves
- Every conversion action stays on data-driven attribution. It is the default, has no volume threshold, and last click is the only other option left
- Primary actions: lead form, sixty-second call, booked appointment. Secondary: page views, local actions, anything a bidder should not chase (b)
- Once more than one goal exists, campaigns built later choose their goals explicitly instead of "account default" (b)
- Customer data policy: disclose the sharing, get consent where the law requires it, never send sensitive-category conversions. Serious violations suspend without notice

### Step 9 - Universal negatives · (a)

- Where: Admin then Account settings then Negative keywords. Not a shared list. Shared lists attach campaign by campaign and can never cover the whole account
- Cap: one thousand terms. Applies to Search, Performance Max, App, Shopping, Smart and Local campaigns on search and shopping inventory
- Match: phrase for single words and for multi-word phrases; exact only for one precise query you want blocked alone (b, Ginny Marvin). Negatives never match close variants, plurals or synonyms, so carry both `job` and `jobs`
- Source: `references/universal-negative-keywords.md` section A, plus the DON'T list in `context/business.md`
- Push: `code/add_account_negatives.py` as `CustomerNegativeCriterion`, or stage the paste block

### Step 10 - The read-back

One block the owner can screenshot:
- Time zone and currency, with a loud warning if either is wrong
- Customer ID and manager ID
- Auto-tagging, both auto-apply bundles, text customization
- Enhanced conversions and terms, call reporting
- Conversion actions with primary or secondary
- Links: Business Profile, GA4, Search Console
- Account negatives count
- Users with access level, 2SV and passkey status
- Verification status and any running deadline
- Payment threshold and spend limit

Next: `/api-setup` if the API is not connected yet, then `/keywords`.

---

## Negatives placement rules

- Account list holds universal junk only: jobs, DIY, education, free, informational, support, unsafe · (b)
- Never in the account list: the business's own brand; competitor names while a conquest campaign exists or is planned; near me, cost, price, affordable, best, hire, local, emergency · (b)
- Never in the account list: blunt common words such as service, review, repair, install. They block buyers · (b)
- Competitor brands you do not want to match: brand exclusions via a brand list in the shared library, not negatives. Close variants match competitor brands by design, and brand lists are Google's answer · (b)
- Themed sets (competitors, off-area cities, parts and wholesale) go in shared lists, twenty per account, five thousand per list officially. Ten thousand has been accepted since late 2025; do not build on the overage · (a) and (b)
- Performance Max accepts shared lists since August 2025 and up to ten thousand campaign negatives · (a)
- Weekly search-terms pass adds five to fifteen negatives for six weeks, then one to three. Optmyzr's 2024 data shows accounts that overblock end up with worse CPA than accounts with no negatives at all · (b)

---

## Policy traps that end new accounts

- **Circumventing systems** · immediate suspension, no warning, and every new account opened afterwards is suspended too. One account per business. Appeal, never replace · (a)
- **Unpaid balance or "concerns about future payments"** · declined cards, prepaid cards, a payments-profile name that does not match the verified business · (a) and (b)
- **Suspicious payment activity, chargebacks, promo-code abuse** · billing suspension; thirty days to verify for an appeal · (a)
- **Destination mismatch** · display URL domain must equal final URL domain; no redirect to another domain; tracking templates must land on the same content. Disapproval first, then at least seven days' warning · (a)
- **Landing page without a business name and logo** · fails business operations verification and feeds the throttle below · (b)

---

## The new-account throttle

- Limited ad serving caps impressions for advertisers Google has not yet qualified. Account age, policy history and verification status are named inputs. YouTube since September 2024, Search since 12 June 2026, phasing through 2028 · (a) and (b)
- Top triggers on Search: generic unbranded ads where the advertiser is unclear, ads naming other brands without stating the relationship, and persistent user complaints · (b)
- The fix is the same list as above: complete verification the day it is offered, put the brand name and logo in ads and on the landing page, keep one stable payment method, keep targeting narrow while trust builds · (b)
- The "two-week throttle" people quote is not documented. Expect low impression share for the first weeks and treat it as the qualification period · (c)

---

## What the API needs on day one

- A manager account: optional for the API since 10 September 2026, but it is what you own while agencies come and go, and the only way to run several accounts through one set of credentials. Link the serving account into it. Two customer IDs result: `GOOGLE_ADS_LOGIN_CUSTOMER_ID` (manager, blank if you skip the manager) and `GOOGLE_ADS_CUSTOMER_ID` (serving) · (a)
- A Cloud project with the Ads API enabled and Explorer access (instant), an OAuth consent screen that passes brand verification (Basic in minutes), and a refresh token - no developer token since 9 September 2026 · see `references/google-ads-setup.md`
- The user generating the refresh token has 2SV (required since 21 April 2026) and a passkey (required since 5 August 2026) · (a)
- Account negatives are `CustomerNegativeCriterion`; verification deadlines come from `IdentityVerificationService`, which is rate-limited, so poll rarely · (a)

---

## What changed 2024 to 2026

- September 2024 · limited ad serving starts on YouTube · (a)
- March 2025 · Performance Max negatives raised from one hundred to ten thousand per campaign · (b)
- 27 May 2025 · automatically created assets renamed text customization, moved inside AI Max · (a)
- June and July 2025 · verification deadlines hit finance and Local Services advertisers; the thirty-plus-thirty pattern becomes standard · (b)
- August 2025 · shared negative lists attach to Performance Max · (a)
- October 2025 · Google Guaranteed and Google Screened replaced by one Google Verified check; the guarantee ended 7 November 2025 · (b)
- 1 January 2026 · Washington State sales tax on ad spend; exemptions under Billing · (b)
- 21 April 2026 · API requires 2SV for new refresh tokens · (a)
- April 2026 · enhanced conversions accepts tags, Data Manager and API at once · (a)
- June 2026 · enhanced conversions for web and leads become one switch · (a)
- 12 June 2026 · limited ad serving reaches Search · (b)
- 15 July 2026 · passkeys required for sensitive actions on notified accounts · (b)
- 5 August 2026 · API requires passkeys · (a)
- August 2026 · US home-services Local Services Ads begin migrating into Google Ads as Performance Max pay-per-lead; weekly budgets become daily divided by seven; name or address changes trigger a twenty-four to forty-eight hour re-review · (a)
- 17 August 2026 · limited-budget target CPA campaigns deliver to target instead of beating it · (b)
- September 2026 · campaigns with text customization on are auto-upgraded to AI Max · (a)

---

## Myths, dated

- "Apply one shared negative list to the whole account" · wrong since account-level negatives shipped in 2022; the account list is a separate setting · (a)
- "Time zone can be changed once" · manager accounts only, eastward only · (a)
- "DDA needs three hundred conversions" · threshold removed October 2021 · (a)
- "Pick position-based or time decay" · retired; DDA or last click only · (b)
- "Turn off auto-created assets in account settings" · renamed text customization May 2025, now per campaign under AI Max · (a)
- "Get the Google Guaranteed badge" · replaced October 2025 · (b)
- "The promo credit is instant free money" · up to thirty-five days after the spend requirement, account under fourteen days old, sixty days to spend · (a)
- "Set an account budget on any account" · monthly invoicing only · (a)
- "Auto-apply is on by default" · opt-in, but enrolment by a previous manager or a Google feature change is common; check the History tab · (b)
- "Destination mismatch is instant suspension" · disapproval, then seven days' warning · (a)
- "2FA is optional for the API" · required since April 2026, passkeys since August 2026 · (a)
- "New accounts are throttled for exactly two weeks" · undocumented; limited ad serving with account age as one signal is what exists · (c)
- "Verification is only for finance and pharma" · everyone eventually; locksmiths and garage doors need the video-call version · (a)
- "Local actions goals inflate primary conversions" · they arrive Secondary; verify rather than assume · (b)

---

## Rules the command enforces

1. (b) Escape Smart Mode first; no campaign is created on setup day
2. (a) Time zone and currency read back aloud before Submit; both permanent
3. (c) Time zone is the service area's, not the agency's
4. (a) Currency matches the business's bank currency
5. (b) Account created on the owner's Google account on the business domain, never inside an agency manager
6. (a) Owner holds Admin; helpers get Standard via manager link; Billing only for whoever pays
7. (a) 2SV on for every user, app or key not SMS; passkey created day one
8. (a) One stable card in the business's legal name; no prepaid or virtual cards; never charge back
9. (a) Payment threshold recorded and explained as a trust ladder
10. (a) Promo code only if the account is under fourteen days old; budget from the plan, not the credit
11. (c) Spend limit set where offered; otherwise ceiling = daily budgets times 30.4
12. (a) Auto-tagging on
13. (a) Both auto-apply bundles off; History tab checked
14. (a) Text customization off per Search campaign; legacy toggle off if visible
15. (b) Optimization score recorded, never targeted
16. (a) Enhanced conversions on, Data Processing Terms accepted, consent mode noted for EEA, UK, Swiss traffic
17. (a) Call reporting on; sixty-second call conversion as a primary lead action
18. (a) Business Profile linked and approved; local actions goals left Secondary unless calls or directions are the goal
19. (a) GA4 linked (Admin on Ads, Editor on GA4); Search Console linked; Merchant Center only with a feed
20. (a) Every conversion action on data-driven attribution
21. (a) Universal negatives in Account settings, not a shared list; cap one thousand
22. (b) Phrase match for single and multi-word negatives; exact only for one precise query
23. (b) Own brand, competitor names (while a conquest campaign exists or is planned) and high-intent modifiers never in the account list
24. (b) Blunt common words such as service, review, repair, install never in the account list
25. (a) Verification started the day the notice arrives; both thirty-day clocks logged
26. (a) Locksmith (US, Canada) and garage door (US) budget six to eight weeks for Advanced Verification before any spend
27. (a) Display URL domain equals final URL domain; no cross-domain redirects; name and logo on the landing page
28. (a) One account per business; suspended accounts are appealed, never replaced
29. (b) Search partners and Display Network unticked on every Search campaign; location targeting presence-only
30. (b) Brand exclusions handled with brand lists, not negatives
31. (a) Customer ID, manager ID, time zone, currency and threshold written to `.env` and CLAUDE.md the moment they exist; nothing runs until the read-back is approved
