# Google Ads API - Standard access, if you ever need it

Nobody in this track needs Standard access. Basic (15,000 operations a day, Keyword Planner included) is automated and lands in minutes - `/api-setup` step 4. Standard is for tools that serve other people or need unlimited operations, and it is still a real review by Google's compliance team.

## What Standard is

- **Unlimited operations a day** on production and test accounts. Individual services keep their own rate limits
- **Granted only** to developers who need unlimited operations - large companies, or tools used by many advertisers
- **Manual review**, about 10 business days, with the compliance team emailing questions along the way. Reply the same day or the application stalls
- **Brand verification first** - the Cloud project must pass it before applying, same as Basic
- **Tools with external users** must give Google demo sign-in access and meet the Required Minimum Functionality. Your own accounts only means neither applies

## How to start it

Google Cloud Console → Google Ads API Overview page (https://console.cloud.google.com/google/ads-apis/overview) → current level shows Basic → expand **Upgrade access level** → Next access level: Standard → **Start application**. Never from API Center inside Google Ads - anything submitted there is not processed.

## What it asks, and the answers

Google does not publish the Standard form field by field. It asks what the tool does and who uses it. The answers below cover every question the old reviewed application asked, so nothing is improvised on the day.

**Contact email** · an inbox you check daily, ideally on your own domain
The compliance team writes here with follow-ups. An unanswered follow-up is a denial.

**Company name and website** · exactly the name on the live site, and the site from `/api-setup` step 0
The name on the form, the name on the site, the app name on the OAuth consent screen and the email domain must all agree. A mismatch is the number one cause of a clarification email.

**Google Cloud project number** · all digits
Cloud Console → the project's Dashboard → Project info card → "Project number". A value with letters is the project ID - wrong field.

**Manager account ID** · only if you reach the ads account through one, formatted 123-456-7890
The ads account's own ID in this field gets bounced back.

**Ongoing relationship with a Google representative** · No

**Business model, the tool, and its audience** · paste and adapt to the business:

> ABC Company is a licensed residential plumbing business serving homeowners across the
> Greater Toronto Area, offering leak repair, drain cleaning, water heater service, fixture
> installation, and emergency plumbing. We use Google Ads exclusively to advertise our own
> business and reach local homeowners searching for plumbing services - we do not advertise
> on behalf of any third party. We are building an internal tool that connects to our own
> Google Ads account to pull reporting on campaigns, ad groups, keywords, and search
> terms, to create new campaigns, and to apply a small set of optimizations we approve. The
> tool is for internal use only by our single owner/operator; it is not resold, not
> multi-tenant, and not exposed to external customers.

**Is the tool accessible to users outside your organisation** · No

**Do you use the access with a tool developed by someone else** · No

**Campaign types** · list every type you could ever run, so a new type never means a new application
Paste: Search Network only, Display Network only, Display Expansion on Search, Call-only, Demand Gen, Performance Max, Local Services. Ecommerce adds Shopping campaigns; a business with an app adds App campaigns.

**Capabilities** · Account Management, Campaign Creation, Campaign Management, Reporting, Keyword Planning Services
Account Creation only if you will genuinely create accounts. Leave "Other" unticked - it invites a follow-up question with nothing to name.

**Design documentation** · upload `design-doc.pdf` from this folder, adapted to the business (below)

## The campaign types, what each is

- **Search Network only** - text ads on Google results. The workhorse for almost everyone
- **Display Network only** - banner ads across websites and apps. Mostly retargeting
- **Display Expansion on Search** - a Search campaign that spends leftover budget on Display. List it, rarely enable it
- **App campaigns** - promoting a mobile app install
- **Call-only** - ads where the click dials your phone. Leads that call, not click
- **Demand Gen** - visual ads in YouTube, Discover and Gmail feeds. Prospecting
- **Performance Max** - one goal-driven campaign across every Google surface
- **Shopping campaigns** - product listings with image and price
- **Local Services** - the "Google Guaranteed" pay-per-lead ads for local trades and pros

## The design doc

The single most important attachment. Match Google's sample shape - six short sections, about 400 words, one wireframe-quality mockup. More text is more places for a reviewer's concern to land.

- **Company name** - one line
- **Business model** - three or four sentences: what you do, what you sell, that you only advertise for sites you own
- **Tool access and use** - one paragraph: internal, single user, no external users
- **Tool design** - two paragraphs: how data flows in and out, writes only when a human triggers them, every new entity lands paused
- **API services called** - four bullets at most, naming the actual service, for example `GoogleAdsService.search`
- **Tool mockups** - one screenshot of a wireframe-quality dashboard

Never mention third-party services or AI vendors. Never invent capabilities like a "recommendations engine". Never use a polished marketing mockup - it reads as external users. Write it as `design-doc.md`, open it in any markdown viewer, print to PDF, and check it with `python3 code/preflight_basic_access.py --standard --url <site> --name "<name>" --email <email> --address "<address>" --use-case <file>`.

## Why applications get denied

- Company URL not live, or a placeholder domain
- A clarification email that went unanswered
- The ads account's ID given where the manager ID was asked for
- Restricted services (Keyword Planner, account creation) requested with no reason in the design doc
- A design doc that is thin, or describes a tool for other people's accounts while the form says internal
- A keyword-research-only tool. Google's own words in a denial: "Tools that offer only keyword research are not allowed." Describe the full loop: research, campaign builds, negatives, reporting
- A third-party connector described as your tool - "I want to pipe data into X"
- A vague use case - "automation", "data analysis", "AI tool" with no business context
- A policy-suspended account among the ones the project calls

Denial is a form problem, not a verdict. The email names the gap: fix that one thing and resubmit the same application. Reply inside the original compliance email thread - it is the only place the compliance team reads. Forum moderators cannot see or speed up a case.
