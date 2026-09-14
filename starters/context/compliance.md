# Google Ads Compliance Rules

Save this file as `context/compliance.md` in your project. It was distilled from ~80 sources, including Google's official policy pages, current as of August 2026.

How it works: every rule is either CRITICAL or MINOR.

- **CRITICAL** = Google disapproves the ad, suspends the account, or it's against the law. Claude blocks the change and tells you why.
- **MINOR** = costs you money or performance, but nothing gets banned. Claude makes the change anyway and just mentions it, or asks one quick follow-up.

The rule that makes Claude enforce this automatically is at the bottom - paste it into your CLAUDE.md.

## CRITICAL - Claude blocks the change

### Ad text
- No phone numbers in ad text. Use a call asset instead. (Also: your number must be real, in service, and local to the country you target - Google now makes test calls to check.)
- No exclamation marks in headlines. Max one, in a description only.
- No repeated punctuation or symbols (!!, ???, $$$), no emojis, no decorative symbols.
- No ALL CAPS words. Real acronyms are fine: HVAC, ASAP, USA.
- No gimmick spelling or spacing: "FR33", "S-A-L-E", "F R E E".
- Real spelling and grammar. Ads with typos get disapproved.

### Claims and pricing
- No "#1", "best", "top rated", or "lowest price" unless a third party verified it AND that proof is visible on the landing page.
- Every price or offer in an ad must be live and easy to find on the page. The classic trap: a seasonal-offer ad left running after the promo ended.
- Disclose ALL fees upfront - call-out fees, dispatch charges, emergency surcharges. Google's pricing policy calls out emergency services (locksmiths, repairs) by name.
- Nothing is "free" unless it's actually free with no strings.
- If you advertise a guarantee, the real guarantee or refund policy must be on the landing page.
- Testimonials with specific results ("saved me $3,000") need a visible "results may vary" note.
- Never imply affiliation you don't have - "Google-certified", "city-approved", a utility's name. Faking identity is an instant suspension with no warning.
- Reviews and review counts in ads must be real. Fake or paid-for reviews break Google policy AND the FTC's fake review rule - fines run over $50,000 per violation.
- Nothing goes in an ad unless it's in proof.md.

### Landing pages
- The page loads, has no broken links, and works on mobile. A down page = disapproved ad.
- The display URL domain must match where the click actually lands. No redirects to a different domain - this is the #1 trigger for account suspensions.
- Real content about the actual service. Thin one-page lead shells with no real information get disapproved.
- Business name, contact info, and a privacy policy on the page. Any form collecting personal info must be on https.
- No popups that block the content or trap the user (countdowns, un-closeable overlays, hijacked back button). A normal delayed or exit popup is fine.
- The page delivers exactly what the ad promised. Ad says drain cleaning, page is about drain cleaning, at the price the ad said.

### Verification deadlines
- Locksmiths (US and Canada) and garage door companies (US): Advanced Verification is required BEFORE any Search ads can run. Start it immediately - it takes 6-8 weeks and you only get one appeal.
- If Google asks you to verify your identity or business, you have 30 days. Miss it and the account is paused.

## MINOR - Claude mentions it or asks, but doesn't block

- Competitor names in ad text. Since 2025 this is only enforced when the competitor files a complaint, and it's ad-level only - but keep names out of ad text anyway. Bidding on competitor names as keywords is fully allowed.
- Repeating the same word or phrase over and over in one ad.
- Weak match between the keyword, the ad, and the page. Not a violation - it just raises your cost per click.
- Slow landing pages. Costs you Quality Score and money, not compliance - unless the page times out completely.
- Generic calls to action like "click here".
- New or unverified accounts get throttled impressions until Google trusts them. Nothing to fix - just expect it.
- Call-only ads are being retired (no new ones after Feb 2026, gone Feb 2027). Use regular ads with call assets instead.

## Industry rules - HAVE CLAUDE FILL THIS IN

This section is different for every business. Have Claude research your trade and location and write in what applies. When a rule below applies to you, it's CRITICAL.

- **License number in ads:** several US states require your license number in ALL advertising, including online ads and landing pages - California, Arizona, Nevada, Florida, and Oregon do, and Texas requires it for HVAC and plumbing. In Canada, Ontario requires it for electrical work (ECRA/ESA) and Quebec for all construction (RBQ). Check your own state or province board and write the exact rule here.
- **Advertiser Verification:** if you're a locksmith or garage door company, write your verification status and dates here.
- **Restricted claims:** anything your trade legally can't say in advertising in your state or province.

## The rule for your CLAUDE.md

Paste this into your project's CLAUDE.md:

> Before pushing ANY change to Google Ads or a landing page - ads, keywords, assets, pages - check it against @context/compliance.md and the NEVER SAY list in @context/proof.md. If it breaks a CRITICAL rule, stop, don't push, and tell me exactly which rule and how to fix it. If it only trips a MINOR rule, make the change but mention the issue in one line, or ask one quick follow-up question if you need my call. Never block on a MINOR rule.
