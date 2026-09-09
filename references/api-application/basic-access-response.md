# Google Ads API - Basic Access Application Responses

Copy these answers into the Basic Access form (API Center → Apply for basic access).
Upload `design-doc.pdf` (in this folder) at Field 7.

---

## Field-by-field answers

The live form (2026) has 13 questions plus two checkboxes. Every one has an answer here - nothing gets left blank or improvised.

| # | Field | Your answer |
|---|-------|-------------|
| 1 | API contact email in API Center is accurate and up-to-date | ✓ Yes - confirm it in the API Center first; Google sends policy notices there and silence kills token access |
| 2 | Google Cloud project number (11-12 digits) | `[PROJECT NUMBER]` - Cloud Console → your project's Dashboard → "Project number" in the Project info card. All digits; a value with letters is the project *ID*, wrong field. Create the project first if you don't have one |
| 3 | Google Ads manager account (MCC) ID | `[YOUR MCC ID]` - 10 digits, formatted 123-456-7890 |
| 4 | Contact email address | `[your email]` - an inbox you check daily; a domain email (info@yourcompany.com) is preferred by the reviewers |
| 5 | Ongoing relationship with a Google representative | No |
| 6 | URL for your company's primary website | `[your website]` - the live site from /api-setup step 0, custom domain |
| 7 | Business model, the API tool, and intended audience | *(paste the paragraph below - it covers all three, audience included)* |
| 8 | Design documentation (.pdf, .doc or .rtf) | Upload `design-doc.pdf` (in this folder) |
| 9 | Is your API tool accessible to users outside your organization? | No |
| 10 | Use your token with a tool developed by someone else? | No |
| 11 | Which campaign types does your tool support? (free text, comma-separated) | Paste exactly: `Search Network only, Display Network only, Display Expansion on Search, Call-only, Demand Gen, Performance Max, Local Services` - every type you could ever run, so a new type never means a new application. Ecommerce adds `Shopping campaigns`; a business with an app adds `App campaigns` |
| 12 | Which capabilities does your tool provide? (checkboxes) | Tick: Account Management, Campaign Creation, Campaign Management, Reporting, Keyword Planning Services. Account Creation only if you will genuinely create accounts. Leave "Other" unticked - it invites a follow-up question with nothing to name |
| 13 | Primary public homepage URL where users learn about your business or access the tool | Same URL as field 6 - must be publicly reachable, never localhost or a behind-login staging link |
| - | "I acknowledge the information above is accurate" | ✓ Check |
| - | "I accept the Terms and Conditions" | ✓ Check |

---

## Field 11 - the campaign types, what each is

Tick all of them on the form. This list is what each one means and which ones you will actually run.

- **Search Network only** - text ads on Google results. The workhorse for almost everyone.
- **Display Network only** - banner ads across websites and apps. Mostly retargeting.
- **Display Expansion on Search** - Search campaign that spends leftover budget on Display. Tick it, rarely enable it.
- **App campaigns** - promoting a mobile app install.
- **Call-only** - ads where the click dials your phone. Leads that call, not click.
- **Demand Gen** - visual ads in YouTube, Discover and Gmail feeds. Prospecting.
- **Performance Max** - one goal-driven campaign across every Google surface.
- **Shopping campaigns** - product listings with image and price.
- **Local Services** - the "Google Guaranteed" pay-per-lead ads for local trades and pros.

**What you will actually run, by business type:**

- **Local service business** (trades, clinics, lawyers): Search Network first, Local Services second, Call-only if the phone is the lead. Performance Max once conversion data exists.
- **Internet business** (SaaS, agency, courses, info): Search Network first, Performance Max second. Demand Gen to build audience, Display for retargeting.
- **Ecommerce**: Shopping and Performance Max are the core. Search for brand and high-intent terms, Demand Gen for prospecting.

---

## Field 7 - Business model, tool and intended audience (paste verbatim)

> ABC Company is a licensed residential plumbing business serving homeowners across the
> Greater Toronto Area, offering leak repair, drain cleaning, water heater service, fixture
> installation, and emergency plumbing. We use Google Ads exclusively to advertise our own
> business and reach local homeowners searching for plumbing services - we do not advertise
> on behalf of any third party. We are building an internal tool that connects to our own
> Google Ads manager account to pull reporting on campaigns, ad groups, keywords, and search
> terms, to create new campaigns, and to apply a small set of optimizations we approve. The
> tool is for internal use only by our single owner/operator; it is not resold, not
> multi-tenant, and not exposed to external customers.

---

## Reminder on consistency (the #1 rejection cause)

Reviewers check that **Company name + Company URL + contact email** agree.

- Company URL: `[your website]`
- Company name on the site: **ABC Company**
- Contact email: `[your email]`

⚠️ Your contact email is a Gmail address, not a domain email matching the site. This is a
*mild* mismatch reviewers sometimes flag. If you later put the site on a custom domain
(e.g. `abcplumbing.ca`) and use `you@abcplumbing.ca`, approval odds improve. Not a hard
blocker - many single-operator applicants are approved with Gmail.

✅ The live site at the Company URL is a residential plumbing business, which matches this
local-service application. Consistent.
