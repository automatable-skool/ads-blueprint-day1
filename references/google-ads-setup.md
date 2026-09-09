# Google Ads API setup - eight steps to direct access
Revised 2026-08-28 · about 30 minutes of clicks · Explorer access is instant, Basic access is up to 5 business days (hours with brand verification) · ends in a `.env` file holding six values
Next: start at Step 0 and get the website ready, then Step 1 creates the Manager account.

Work this doc top to bottom. When it's done, Claude Code talks straight to Google Ads - no Sheets, no manual uploads, full read and write access.

Grades on claims: (a) official Google docs or blog, (b) Google staff on the forum or two independent sources agreeing, (c) single source or inferred. Anything without a grade is a click path that Jono has run and confirmed.

## The six values you're collecting

```
GOOGLE_ADS_DEVELOPER_TOKEN=ABcdeFGHij1234567890
GOOGLE_ADS_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx
GOOGLE_ADS_REFRESH_TOKEN=1//xxxxxxxxxxxxxxxxxx
GOOGLE_ADS_LOGIN_CUSTOMER_ID=1234567890
GOOGLE_ADS_CUSTOMER_ID=9876543210
```

## Before you start - three things that changed in 2026

- **You probably get production access on day one.** Since 28 October 2025 most new developer tokens land at "Explorer Access": real accounts, reads and writes, 2,880 operations a day, no keyword planner. Basic Access (15,000 a day, planner unlocked) is the upgrade you apply for. (a)
- **Your OAuth app must be "In production", not "Testing".** Testing-mode refresh tokens die after 7 days. This doc used to say the opposite. (a)
- **You need a passkey on the Google account before you mint the refresh token.** Required from 5 August 2026, and a new passkey can take 7 days to become trusted. Create it at g.co/passkeys today. (a)

---

## Step 0 - Get the website ready for the reviewer

The Basic Access application (Step 3b) asks for a Company URL and a human at Google opens it. About 5 minutes with `website/`, longer if you're patching an existing site. Do it before Step 1 so nothing blocks the form later.

### What the reviewer looks for (by name)

- An **About page** with real background: who runs the business, how long, what it does. Placeholder text reads as a fake site. (a)
- A **physical business address** visible on the site - footer and contact page. (a)
- A **Privacy Policy** page with actual data-handling detail. (a)
- A **Terms of Service** page - the consent screen branding in Step 5 asks for this link too. (a)
- **Consistency:** company name on the form = name on the site = email domain where possible. Mismatched details are the most common rejection reason. (b)

### Do this

- **No site:** `website/` already has `/about`, `/privacy-policy`, `/terms`, `/contact` and an address slot. Fill `website/lib/site.config.ts`, push to GitHub, import to Vercel, add your domain. It's the site the money page lands on later, so nothing is wasted.
- **Existing site:** don't rebuild. Add the missing pages and put the address in the footer. WordPress: through the Novamira connection. Anything else: Claude writes the copy, you paste it.
- **Verify:** open all four URLs in a private window. Every one loads, the address is on screen, the business name matches what you'll type on the form.

---

## Step 1 - Create a Manager Account (MCC)

Google won't issue a developer token to a regular Ads account. You need a Manager account that *contains* your real account. Takes about 3 minutes. (a)

### Two different Customer IDs - don't mix them up

Every Google Ads account, MCC and regular alike, has its own **Customer ID** in `123-456-7890` form. They're all labelled "Customer ID" but they are different numbers for different accounts, and you end up with two.

`GOOGLE_ADS_LOGIN_CUSTOMER_ID` is the **MCC** you create in this step, the manager.

`GOOGLE_ADS_CUSTOMER_ID` is your **real Google Ads account**, the one running ads.

Both go in the `.env`. Both are stored **without hyphens** - hyphens raise `INVALID_CUSTOMER_ID`. (a)

### Do this

1. Open: https://ads.google.com/home/tools/manager-accounts/
2. Click **"Create a manager account"**
3. Account name: `Jono Catliff MCC`
4. "Are you primarily going to manage your own accounts or other people's accounts?" -> either option works. Pick **"Manage my own accounts"** if you're the only user. Both create a functional MCC that can request a developer token.
5. Country: **Canada**
6. Time zone: your local
7. Currency: **CAD**
8. Submit

### After submitting

You'll see a **"Congrats! You're all done"** screen. It does NOT show the Customer ID, so don't panic.

Click whatever button takes you forward, usually **"Explore your account"** or **"Continue to dashboard"**. You'll land in the actual MCC dashboard.

### Save this value

In the MCC dashboard, the **Customer ID** sits in the **top-right header** next to your profile avatar, formatted `123-456-7890`. If you don't see it, click your **profile avatar** - a dropdown shows your accounts with their IDs.

Strip the dashes, then paste into `.env` as `GOOGLE_ADS_LOGIN_CUSTOMER_ID=1234567890`.

---

## Step 2 - Link your real Google Ads account to the MCC

The MCC is the manager. You also need your real account inside it. Takes about 2 minutes plus 30 seconds to accept. Google says the link can show as pending for up to 24 hours after you accept, so do this before you need it. (a)

### Do this

1. Inside the MCC -> **Accounts** icon (left sidebar) -> **"Sub-account settings"** -> **plus button** -> **"Link existing account"** (a)
2. Enter your real Google Ads Customer ID (the wedding business one, or whichever account you're filming with)
3. Click **Preview**, then **Send request**
4. Google sends an **invitation email** to the email associated with the destination (real) Google Ads account
  - Sender: `ads-account-noreply@google.com`
  - Subject: *"You have a pending request to link your account to a Manager account"*
  - If your MCC and real account use the same Gmail, the email lands in that same inbox
  - If they use different Google logins, the email goes to the destination account's email
5. Open that email -> click the **ACCEPT REQUEST** button
6. The link opens Google Ads -> **you must be signed in as the destination account owner** to accept
  - If you're signed into a different Google account, Google will say so - click your profile -> switch account -> sign in as the right one
  - Then click **Accept** on the link request page

If the email never arrives, check spam. Failing that, open the destination Google Ads account directly -> **Admin** -> **Access and security** -> **Managers** tab -> the pending request is under **Link request** -> **Accept**. (a) The bell icon (notifications) top right shows it too.

### Save this value

Take the real account's Customer ID, the one you just linked, and strip the dashes.

Paste into `.env` as `GOOGLE_ADS_CUSTOMER_ID=9876543210`.

---

## Step 3 - Get the developer token, then apply for Basic Access

Two forms. The first gives you the token (usually with instant Explorer Access). The second is the reviewed Basic Access application. About 8 minutes of form filling.

### Do this

1. Confirm you're inside the **MCC** - the top bar shows Manager Account and a `123-456-7890`-style ID. API Center does NOT appear in regular Google Ads accounts or test accounts. (a)
2. Left sidebar -> **Admin** -> **API Center**. Google's own pages also describe it as **Tools** -> **Setup** -> **API Center**. If you can't find it, type **"API Center"** into the search bar at the top. (a)
3. You'll see the API access form. Fill it with the copy below.

### Form fields, in order

**API contact email** - auto-filled with your email. Google emails this address with clarification questions during review, and "if you can't be reached, Google might not continue with your application". Use an inbox you check daily. (a)

**Company name** - your public-facing brand, which must match the website at the URL below. Solo builders with no company site can write `Individual`. (a)

**Company URL** - `https://your-actual-site.com`. Must be live and functional; placeholder domains like test.com are rejected. Individuals may give a GitHub or LinkedIn profile URL instead. (a)

**Company type** - **Advertiser**. See below for why, and when to choose differently.

**Intended use** - paste the paragraph below.

**Principal place of business** - your country.

**Terms and conditions** - check the box.

### One golden rule: consistency

Your email domain, Company URL and Company name should all agree. Google's written rule is only that the site is live and the email is monitored; the consistency rule is what has worked in practice and is repeated across every guide. (b)

Good: `jono@jonocatliff.com` with `jonocatliff.com` and "Jono Catliff".

Bad: `someone@gmail.com` with `random-site.io` and "12345 Canada Inc."

A Gmail contact address is a mild mismatch, not a blocker - this exact application was approved with one. (b)

### Which Company type to choose

**Advertiser** - you're managing your OWN business's Google Ads, even via an MCC. Highest approval rate, fastest review.

**Agency/SEM** - you're managing multiple unrelated client accounts and can prove a client roster.

**Affiliate** - you're an affiliate marketer. Triggers extra compliance scrutiny, so only pick it if this is genuinely you.

**Independent Google Ads Developer** - you're building a SaaS tool that OTHER Google Ads users will adopt. Triggers questions about end-users and security.

For 99% of people building an internal dashboard for their own business, **Advertiser is the right call.**

### Copy this into "Intended use"

```
Internal automation tool for managing my own Google Ads accounts via my MCC. The tool pulls reporting data via the Google Ads API and runs analysis on search terms, keyword performance, Quality Score, and campaign metrics. It surfaces optimization recommendations in an internal dashboard that I use to manage my ad spend and improve ROAS. Read-heavy use of GoogleAdsService.search for reports across campaign, ad group, keyword, and search-term resources. Limited write operations: occasional keyword and negative-keyword-list mutations to apply recommendations I approve. The tool is internal - not exposed to external customers, no third-party access, no resale. Estimated daily API calls: 5,000.
```

Then submit. After submitting you'll see a developer token string, an **access level**, and a button, **"Apply for basic access"**.

### Read the access level before doing anything else

- **Explorer Access, Approved** - this is what most people get now. Your token already works on your real account: reads and writes, 2,880 operations a day, but no Keyword Planner, no account creation, no user management, no billing. (a) Skip ahead and do Steps 4 to 8 today; come back and apply for Basic when you want the planner or more volume.
- **Test Account Access, Pending** - Google couldn't auto-review you. The token works on test accounts only until Basic is approved. (a) Apply for Basic now, then do Steps 4 to 7 while it bakes.

Either way, **save the token now** - the string never changes when the level goes up. Paste it into `.env` as `GOOGLE_ADS_DEVELOPER_TOKEN=...`.

### Step 3a-2 - Every documented reason applications get denied (checked 2026-08-29)

Read this before filling a single field. Each line is something Google or its staff have actually stated; the grade says how solid it is.

**Reachability and identity**
- **Unmonitored contact email.** "Google's API compliance team might reach out to this email address during the review process for clarifications. If you can't be reached, Google might not continue with your application." Use an inbox you check daily; reply the same day. (a)
- **Website not live or not real.** "If the website is not live, Google might not be able to process your application and reject it." Placeholder domains (`test.com`, `example.com`) are refused outright. Step 0 covers what the reviewer looks for on the site. (a)
- **Details that don't match.** Company name on the form, name on the site, email domain: reviewers cross-check them. Mismatches are the most common cause of a clarification email, and an unanswered clarification is a denial. (b)
- **Unlinked accounts.** "Ensure you have linked all of your active Google Ads accounts to the Google Ads manager account" that holds the token. An Ads account floating outside the MCC looks like a hidden client. (a)

**The use case**
- **Keyword-research-only tools.** Google's own words in a denial: "Tools that offer only keyword research are not allowed." Describe the full loop: research, campaign builds, negatives, reporting. (b)
- **Third-party connectors described as your tool.** Applications that amount to "I want to pipe data into X" have been refused as "not a permissible use case". Your application is for YOUR tool managing YOUR accounts. (b)
- **Vague use case.** "Automation", "data analysis", "AI tool" with no business context. Say what it reads, what it writes, that every change lands paused for a human. (b)
- **Claiming external users when there are none, or hiding them when there are.** Basic Access for your own accounts is the honest, simplest lane. If you say other advertisers use your tool, Google can ask for demo sign-in access and the Required Minimum Functionality applies. Don't drift into that lane by accident. (a)
- **Functionality that doesn't match the application.** Policy: tools are used "only for Google Ads campaign creation, management, or reporting", and "functionality must match your approved token application". Don't describe a scraper, a search-results scraper, or anything that resells Google data. (a)

**The design doc (Step 3c)**
- Missing, thin, or over-explained. Most non-identity rejections come from here. Match Google's sample shape: six short sections, about 400 words, one mockup. No mention of third-party tools or LLM vendors, which only invites questions. (b)

**Account standing**
- **Policy violations on an account under the MCC.** All API users "must comply with the Google Ads policies". A suspended or policy-flagged account inside the manager is a red flag for the token review. Fix it first. (a)
- **A token left unused.** Not a denial, but "Google may revoke your API token if it's not used consecutively for 90 days". `test_connection.py` on a cron keeps it warm. (a)

**Things the internet claims that Google's docs do not support** (c - single blog, unverified, do not repeat to members as fact)
- "$1,000 minimum historical spend" - no Google source says this.
- "Individual developers are denied" - Google's own form accepts `Individual` as the company name with a GitHub or LinkedIn URL.
- "30% of applications are rejected" - no source.

**Run the script first.** `code/preflight_basic_access.py` checks everything above that a machine can see (pages live and real, name + address on the site, email domain, design doc shape, use-case wording) and prints the three manual checks. A FAIL blocks submission.

**If denied anyway:** the email names the gap. Fix that one thing, resubmit. Denial is a form problem, not a verdict, and resubmissions are reviewed.

Sources: Google Ads API docs - dev-token, access-levels, api-policy/access-levels; Google Ads API policies (adspolicy 6169371); adwords-api forum thread PPzJOn6DJMA (keyword-only denial); airbyte issue #1981 (connector denial).

### Step 3b - Apply for Basic Access, the form that gets reviewed

Thirteen fields plus two checkboxes (the live 2026 form; it may be titled "Standard Access Application" - same form, Google routes both through it). Google's stated requirements are a monitored contact email, active Google Ads accounts linked under the manager, and (optional) brand verification. The paste-ready answers, field by field, live in `references/api-application/basic-access-response.md` - use that file, it matches the live form's numbering.

**Fields 1 to 6 - who you are**

1. API contact email is up-to-date - check the box
2. Google Cloud project number - 11-12 digits, from the Cloud project's Dashboard → Project info card. NOT the alphanumeric project ID. Create the project before opening this form.
3. MCC ID - your MCC Customer ID, for example `123-456-7890`. A client ID here gets bounced back.
4. Contact email - use a domain email (`you@yourdomain.com`), which is more credible than Gmail. Fall back to Gmail if you don't have one.
5. Ongoing relationship with Google rep - No
6. Company URL - the URL that matches your Company name and email domain

**Fields 7 to 13 - what the tool does**

7. Business model, tool and intended audience - the paste-ready paragraph in `basic-access-response.md`
8. **Design documentation PDF** - required upload, see Step 3c below
9. Tool accessible outside your organization - No
10. Use with someone else's tool - No
11. Campaign types - free text, comma-separated. **⛔ LIST EVERY TYPE YOU COULD EVER RUN - under-listing means a whole new application the day you try another type (Jono's ruling, 3 September 2026).** Paste: `Search Network only, Display Network only, Display Expansion on Search, Call-only, Demand Gen, Performance Max, Local Services` (ecommerce adds `Shopping campaigns`; an app adds `App campaigns`).
12. Capabilities - checkboxes. **Tick Account Management, Campaign Creation, Campaign Management, Reporting, Keyword Planning Services. Same rule: under-ticking forces a resubmit.** Leave "Other" unticked - it invites a follow-up question with nothing to name.
13. Primary public homepage URL - same as field 6; must be publicly reachable, never localhost or behind a login.

Then check both checkboxes at the bottom.

### Step 3c - Build the design doc PDF

**This PDF is the single most important part of the application.** Most rejections come from a missing, weak, or over-explained design doc. Google staff say: English only, "provide as much detail as you can", and a technical overview of what the tool does and which services it calls is enough. (b)

**Match Google's sample format** - same 6 sections, similar length, about 400 words plus one mockup. Sample: https://docs.google.com/document/d/1oxtkAuxoZF15GYdDvR021QXKrDX0VL9M5t8r7sW7-3o/edit (c - the sample did not render in the 2026-08-28 check; the shape below is what was approved)

**Do NOT over-explain.** More text means more places for reviewer concerns to surface.

**Do NOT mention third-party services** - LLMs, analytics tools, anything that "processes" data. It's an implementation detail that raises questions the sample doesn't.

**Do NOT invent capabilities** like "recommendations engine" or "AI analysis." Describe the tool as it actually behaves at the data-flow level.

**The mockup must look like a wireframe**, not a polished marketing asset. Polished mockups suggest external users.

**The six sections of the design doc:**

1. **Company Name** - one line
2. **Business Model** - 3 to 4 sentences: what you do, what you sell, and that you only advertise for sites you own
3. **Tool Access/Use** - one paragraph: internal use only, no external users, single-user
4. **Tool Design** - 2 paragraphs: how data flows in and out, user-initiated writes only, new entities land paused
5. **API Services Called** - 4 bullets max, each naming the actual Google Ads service, for example `GoogleAdsService.search`
6. **Tool Mockups** - one screenshot of a wireframe-quality dashboard

Examples and templates: `design-doc.md` and `design-doc-combined.html` in `references/api-application/`.

### How to generate the PDF

If you already have a markdown file and a screenshot, open the markdown in Typora or Notion and export to PDF.

If you're using the templates in this folder, open `design-doc-combined.html` in Chrome -> File -> Print -> Save as PDF.

Or via terminal on macOS:

```bash
cd references/api-application
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 --headless --disable-gpu --no-pdf-header-footer \
 --print-to-pdf="design-doc.pdf" \
 --print-to-pdf-no-header \
 "file://$(pwd)/design-doc-combined.html"
```

Upload the resulting PDF to Field 7.

### How long Basic Access takes

- Google's official figure: **up to 5 business days**. (a)
- Real waits in 2026: a public backlog from February 2026 pushed many applications to 2 to 4 weeks. (b)
- **Brand verification cuts a pending review to "the next few hours"** (pilot since 7 July 2026). It is done on the Cloud project in Step 5, so finish Steps 4 and 5 the same day you submit. (a)
- When approved, the SAME token string starts working at the new level and you get an email. Nothing to re-run. Token activation can lag the email by about an hour. (b)

### If Google writes back, or says no

Denial is a form problem, not a verdict. The known triggers: (a) for the first two, (b) for the rest

- Company URL not live, or a placeholder domain
- The clarification email went unanswered - Google drops applications it cannot get a reply on
- A client Customer ID was given where the MCC ID was required
- Restricted services (Keyword Planner, account creation) requested with no reason in the design doc
- Design doc too thin, or describing a tool for other people's accounts while the form says internal
- Company name, URL and email domain that do not look like the same business

How to resubmit:

- Reply **inside the original compliance email thread**. That is the only place the compliance team reads. Forum moderators say they cannot see or speed up compliance cases. (b)
- If you need a new case, open it from API Center and quote the case ID from the first email (format `0-0###########0`). (b)
- Fix the one specific gap, resubmit the same form. Do not rewrite everything.
- Expect 1 to 4 weeks for a compliance reply during busy periods. (b)

### Do not worry about RMF

"Required Minimum Functionality" applies only to Standard Access tokens used by tools with external users. Internal own-account tools are exempt. (a)

---

## Step 4 - Create a Google Cloud project

The Google Ads API runs through Google Cloud, not Google Ads, so you need a Cloud project to authenticate. Takes about 4 minutes. Billing is optional. (a)

**One project per developer token.** A project binds to the first developer token it is used with; using another manager's token from the same project fails with `DEVELOPER_TOKEN_PROHIBITED`. If you ever switch managers, make a new project. (a)

### Do this

1. Open: https://console.cloud.google.com
2. Top bar -> project dropdown -> **"New Project"**
3. Project name: `google-ads-dashboard`
4. Click **Create**
5. Wait about 10 seconds for it to provision, then make sure it's selected in the top-bar dropdown
6. In the search bar at the top, type: **Google Ads API**
7. Click the API result -> click **Enable**

---

## Step 5 - Set up the OAuth consent screen (and brand verification)

Required before Google lets you create OAuth credentials. Takes about 6 minutes. This is where the old version of this doc was wrong.

### The Testing-mode trap

- An External app in **Testing** status issues refresh tokens that **expire after 7 days**. Google lists this as the number one cause of `invalid_grant`. (a)
- The fix is **In production**. An unverified production app just shows a "Google hasn't verified this app" warning and is capped at 100 lifetime users - irrelevant for one person. (a)
- A refresh token minted while the app was in Testing keeps its 7-day life even after you switch. Switch first, then mint. (b)

### Do this

1. Left sidebar (hamburger menu) -> **APIs & Services** -> **OAuth consent screen** (Google now calls this page "Google Auth Platform" in places; same thing)
2. User Type: **External** -> **Create**. Internal only exists inside a Workspace organisation. (a)
3. Fill the form: App name is `Google Ads Dashboard`, User support email is your email, Developer contact email is your email.
4. **Branding** - fill these in, they are what brand verification checks: (a)
  - Application home page: your website
  - Privacy policy link: a real page on your site
  - Terms of service link: a real page on your site
  - Authorised domain: your site's domain
5. Click **Save and Continue**
6. **Scopes** page -> click **Save and Continue**, don't add any here
7. **Audience** / publishing status -> click **Publish app** so the status reads **In production**. Do not stay in Testing. (a)
8. **Summary** -> **Back to Dashboard**

### Brand verification - the fast path for Basic Access

Optional, but it is the only thing that turns a 5-business-day (or 3-week) Basic review into a few hours. (a)

1. Your developer token must be associated with this Cloud project. That happens automatically the first time you make any API call using this project's OAuth credentials and your token - the call can even fail. Do Steps 6 to 8 first, then come back. (b)
2. On the consent screen's **Branding** tab, click **Verify branding**. The automated check takes a few minutes. (a)
3. When it passes, click **Publish branding** within 7 days or it lapses to "Need to re-verify". (a)
4. Once the project shows verified, Google reviews the pending Basic application "in the next few hours". (a)

Skip this if the token already holds Basic or Standard, or if this Cloud project was already verified for another Google API. (a)

---

## Step 6 - Create OAuth credentials

This generates the `client_id` and `client_secret` your code will use. Takes about 3 minutes.

### Do this

1. Left sidebar -> **APIs & Services** -> **Credentials**
2. Click **+ Create Credentials** at the top -> **OAuth client ID**
3. Application type: **Desktop app** (Web app is only for a hosted callback URL) (a)
4. Name: `google-ads-cli`
5. Click **Create**
6. A popup appears with **Client ID** and **Client secret** - click **Download JSON** and save it somewhere safe, outside git

### Save these values

Open the downloaded JSON. You'll see:

```json
{
 "installed": {
   "client_id": "1234567890-xxxxxxxxxxxx.apps.googleusercontent.com",
   "client_secret": "GOCSPX-xxxxxxxxxxxxxxxxxxxx",
   ...
 }
}
```

Paste `client_id` into `.env` as `GOOGLE_ADS_CLIENT_ID=...` and `client_secret` into `.env` as `GOOGLE_ADS_CLIENT_SECRET=...`.

---

## Step 7 - Generate the refresh token

The refresh token is the permission slip Claude uses to act on your Ads account. Generated once, used for as long as it stays alive. Takes about 2 minutes.

### Before you run it

- The Google account you sign in with must have **Admin or Standard access to the MCC**, or every call fails with `USER_PERMISSION_DENIED`. (b)
- That account needs **2-step verification** (forced since 21 April 2026) and a **passkey** (forced from 5 August 2026 for new tokens). A brand-new passkey may need 7 days before Google trusts it, so set it up at g.co/passkeys ahead of time. (a)
- The consent screen must already be **In production** (Step 5). (a)
- Never use the OAuth Playground for this - its tokens are revoked after 24 hours. (b)
- Python **3.10 or newer**. 3.9 still installs today but Google has said it loses API access when v22 sunsets in October 2026. (a)

### Do this

1. Save this script as `get_refresh_token.py` in the same folder as your `.env`:

```python
"""Generates a Google Ads refresh token.

Run: python3 get_refresh_token.py
Opens browser -> "Allow" -> token is printed to your terminal.
"""

import os
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/adwords"]

client_id = input("Paste your CLIENT_ID: ").strip()
client_secret = input("Paste your CLIENT_SECRET: ").strip()

client_config = {
   "installed": {
       "client_id": client_id,
       "client_secret": client_secret,
       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
       "token_uri": "https://oauth2.googleapis.com/token",
       "redirect_uris": ["http://localhost"],
   }
}

flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
creds = flow.run_local_server(port=0, prompt="consent", access_type="offline")

print("\n\n=== YOUR REFRESH TOKEN ===")
print(creds.refresh_token)
print("==========================\n")
print("Paste this into .env as GOOGLE_ADS_REFRESH_TOKEN")
```

2. Install the one dependency:

```bash
pip install google-auth-oauthlib
```

3. Run it:

```bash
python3 get_refresh_token.py
```

4. Browser opens. Sign in with the **same Google account that has access to the MCC**. Complete the passkey prompt. Click **Allow** through the warning ("Google hasn't verified this app" - that's fine, it's your own app).
5. Browser shows "The authentication flow has completed."
6. Look at your terminal - the refresh token is printed. Copy it.

### Save this value

Paste into `.env` as `GOOGLE_ADS_REFRESH_TOKEN=...`.

### Keep it alive

- Mint it once and keep it. Each Google account can hold 100 live refresh tokens per client ID; past that, the oldest dies silently. (a)
- A token unused for 6 months is invalidated. Run the Step 8 test at least monthly. (a)

---

## Step 8 - Verify everything works

Catch any setup errors now, before you waste filming time. Takes about a minute. With Explorer Access you can run this the same day; with Test Account Access, wait for the Basic email.

### Do this

Save this as `test_connection.py`:

```python
"""Tests the Google Ads API connection.

Reads creds from .env, pulls one campaign to confirm everything works.
"""

from dotenv import load_dotenv
import os
from google.ads.googleads.client import GoogleAdsClient

load_dotenv()

config = {
   "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
   "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
   "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
   "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
   "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
   "use_proto_plus": True,
}

client = GoogleAdsClient.load_from_dict(config)
ga_service = client.get_service("GoogleAdsService")

customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
query = """
   SELECT campaign.id, campaign.name, campaign.status
   FROM campaign
   LIMIT 5
"""

response = ga_service.search(customer_id=customer_id, query=query)
print("\nConnection works. First 5 campaigns:\n")
for row in response:
   print(f"  - {row.campaign.name} ({row.campaign.status.name})")
```

Install deps (google-ads 31.4.x as of August 2026, which speaks API v25.1): (a)

```bash
pip install --upgrade google-ads python-dotenv
```

Run it:

```bash
python3 test_connection.py
```

If you see your campaigns listed, you're done. Claude Code can now manage your Google Ads. This first successful call is also what binds your developer token to the Cloud project for brand verification (Step 5).

---

## Common errors and their fixes

One bullet per error. Grades: all (a) from Google's common-errors page unless marked.

- **`DEVELOPER_TOKEN_INVALID`** - typo, or the token is in the wrong header (usually the refresh token pasted by mistake). Copy the token again from API Center.
- **`DEVELOPER_TOKEN_NOT_APPROVED`** ("Non-approved developer tokens can only be used with test accounts") - the token is at Test Account Access and you pointed it at a real account. Wait for Basic, or check whether API Center now shows Explorer. Works on your laptop but fails on the server usually means the server config holds a production customer ID. (b)
- **`DEVELOPER_TOKEN_PROHIBITED`** ("not allowed with the project") - this Cloud project was already used with a different manager's token. Create a new Cloud project (Step 4).
- **`USER_PERMISSION_DENIED`** ("User doesn't have permission to access customer") - `GOOGLE_ADS_LOGIN_CUSTOMER_ID` is missing, has hyphens, or is the client ID instead of the MCC ID; or the Google account that minted the refresh token has no access to that MCC; or the MCC-client link was never accepted or was removed. Fix the ID, re-check Step 2, and if needed re-run Step 7 with an account that has MCC access. (b for the OAuth-account cause)
- **`NOT_ADS_USER`** - the Google account that authorised has no Google Ads access at all. Invite it to the account (Admin, Access and security, Users) or re-run Step 7 with the right account.
- **`CUSTOMER_NOT_ENABLED`** - the Ads account never finished signup or was cancelled. Finish signup in the Google Ads UI or reactivate it.
- **`CUSTOMER_NOT_FOUND`** - account created minutes ago, backend not ready. Wait 5 minutes, then retry every 30 seconds.
- **`INVALID_CUSTOMER_ID`** or **`CLIENT_CUSTOMER_ID_INVALID`** - hyphens in the ID, or wrong length. Both `.env` IDs are 10 digits, no dashes.
- **`OAUTH_TOKEN_INVALID`** - the Authorization header holds the wrong string. The library builds this for you; if you see it, the client ID, secret or refresh token is mismatched.
- **`ACCESS_TOKEN_SCOPE_INSUFFICIENT`** - the refresh token was minted without the `adwords` scope. Re-run Step 7.
- **`invalid_grant`** ("Token has been expired or revoked") - the consent screen was in Testing (7-day life), the token sat unused 6 months, you revoked it, or the 100-token cap pushed it out. Set the app to In production (Step 5), then re-run Step 7.
- **`RESOURCE_EXHAUSTED`** - daily operations quota hit: 2,880 on Explorer, 15,000 on Basic, on a rolling 24-hour window. Stop for the day, batch operations, or apply for Basic.
- **`RESOURCE_TEMPORARILY_EXHAUSTED`** - per-second rate limit. Back off a few seconds and retry; cap concurrent requests.
- **Planning services fail on Explorer** - Keyword Planner, reach planning and audience insights are blocked at Explorer. Apply for Basic with Keyword Planning Services ticked.
- **`403` after it was working before** - the refresh token expired or was revoked (6 months idle, Testing-mode token, password or security change). Re-run Step 7.
- **Permission error that clears on its own after a few hours** - reported on the forum with no code change. Retry before rebuilding. (c)

---

## API versions - keep this current

- Google now ships a new API version every month and four major versions a year. Each major lives 12 months, then every request to it fails on the sunset date with no grace period. (a)
- Live today: v22 (dies October 2026), v23 (dies February 2027), v24 (dies May 2027), v25 (released 22 July 2026). Target **v25**. (a)
- Already dead: v19 (11 February 2026), v20 (10 June 2026), v21 (5 August 2026). (a)
- Latest `google-ads` library: 31.4.x, Python 3.9 to 3.14 today; use 3.10 or newer because 3.9 loses access at the v22 sunset. (a)
- Before every version bump, search the code for pinned version strings and removed enum values. Metrics that come back empty instead of erroring are the tell. (c)
- The Cloud Console's **APIs & Services** metrics page shows which API versions and methods your project is actually calling. (a)

---

## Reads through MCP, writes through the library

- Google's own MCP server (`github.com/googleads/google-ads-mcp`) is read-only: three tools, `search`, `list_accessible_customers`, `get_resource_metadata`. Explorer Access is enough. Install with `claude mcp add google-ads-mcp -- pipx run --spec git+https://github.com/googleads/google-ads-mcp.git google-ads-mcp` and give it `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_PROJECT_ID` and `GOOGLE_ADS_LOGIN_CUSTOMER_ID`. (a)
- Google's Agent Skills repo has `google-ads-api-mcp-setup` and `google-ads-api-quickstart` for the same install: `npx skills add google/skills/skills/ads`. (a)
- Writes (campaign builds, negatives, budgets) go through the Python library in `code/`, and every new entity lands **PAUSED** for human review. (b)
- Hosted "no developer token needed" MCP brokers work by putting your account under their token and their terms. Not for this repo. (c)

---

## Summary checklist

- [ ] Step 1 - MCC created, `GOOGLE_ADS_LOGIN_CUSTOMER_ID` saved
- [ ] Step 2 - Real account linked and accepted, `GOOGLE_ADS_CUSTOMER_ID` saved
- [ ] Step 3 - Developer token saved, access level read (Explorer or Test), Basic application submitted
- [ ] Step 4 - Google Cloud project created, Ads API enabled
- [ ] Step 5 - OAuth consent screen External and **In production**, branding fields filled
- [ ] Step 6 - OAuth credentials created, `GOOGLE_ADS_CLIENT_ID` and `GOOGLE_ADS_CLIENT_SECRET` saved
- [ ] Step 7 - Passkey ready, refresh token generated, `GOOGLE_ADS_REFRESH_TOKEN` saved
- [ ] Step 8 - Test connection passes (same day on Explorer)
- [ ] Step 5 again - Verify branding, publish branding, Basic approval lands within hours
- [ ] Monthly - run `test_connection.py` so the refresh token never idles 6 months

When all boxes are ticked, Claude has full direct access to Google Ads. No Sheets, no CSVs, no manual steps.

---

## Security notes

**Never commit `.env` to git.** Add `.env`, `.env.*`, `*credentials.json` and `*-token.json` to `.gitignore` before writing any credential, and read the file to confirm.

**The refresh token is the master key.** Anyone with it plus the client secret and developer token can manage your Ads account. Treat it like a password.

**If you ever suspect a leak**, go to https://myaccount.google.com/permissions, revoke "Google Ads Dashboard", and re-run Step 7.

**For unattended jobs** (cron, servers), a service account is the safer choice: no passkey prompt, survives staff changes. Add its email as a user on the Ads account under Admin, Access and security, Users; raise it to Admin manually if needed. (a)

**Google's August 2026 pilot** lets you allowlist which Cloud projects may do account, user and billing operations under your MCC. Opt-in only for now; worth joining once the tool is stable. (a)

---

## What changed in this revision

Revised 2026-08-28 against 72 sources (Google docs and blog first, then forum, GitHub, trade press). Grades added to every claim that is not a click path Jono has run.

- **Added the Explorer Access level** (launched 28 October 2025): most new tokens now get production reads and writes at 2,880 operations a day with no application. Step 3 now tells the user to read the access level and, on Explorer, run the connection test the same day.
- **Corrected the Basic Access timeline** from "24 to 48 hours" to Google's official "up to 5 business days", with the 2026 backlog noted and brand verification (7 July 2026) added as the hours-long fast path.
- **Reversed the OAuth consent screen advice.** The old Step 5 said stay in Testing and don't publish; Testing-mode refresh tokens expire after 7 days. Step 5 now requires External plus In production, and explains the unverified-app warning is harmless for one user.
- **Added brand verification** to Step 5 (homepage, privacy policy, terms, authorised domain, Verify branding, Publish branding within 7 days) and noted the token-to-project binding that happens on the first API call.
- **Added the passkey and 2-step verification requirements** for minting new refresh tokens (2SV since 21 April 2026, passkeys from 5 August 2026, 7-day trust delay) to Step 7.
- **Added a denial and resubmission section**: the six documented triggers, reply-inside-the-case-email rule, case ID format, and the 1 to 4 week compliance reply window.
- **Rewrote the errors section as a bullet list** and added `DEVELOPER_TOKEN_PROHIBITED`, `NOT_ADS_USER`, `CUSTOMER_NOT_ENABLED`, `CUSTOMER_NOT_FOUND`, `INVALID_CUSTOMER_ID`, `OAUTH_TOKEN_INVALID`, `ACCESS_TOKEN_SCOPE_INSUFFICIENT`, `RESOURCE_EXHAUSTED`, `RESOURCE_TEMPORARILY_EXHAUSTED` and the Explorer planning-services block.
- **Added an API versions section**: monthly cadence, 12-month lifetime, dead versions (v19, v20, v21), live versions, target v25, library 31.4.x, Python 3.10 or newer.
- **Added the MCP section**: Google's official read-only server and Agent Skills for reads, the Python library for writes, everything landing paused.
- **Updated the Step 2 click path** to the 2026 UI (Accounts icon, Sub-account settings, plus button) and the client-side acceptance path (Admin, Access and security, Managers).
- **Added "Individual" company name and GitHub or LinkedIn URL** for solo builders, the one-project-per-token rule, refresh-token lifetime rules (6 months idle, 100-token cap, no OAuth Playground), and the service-account alternative.
- **Kept verbatim**: the six `.env` values, the MCC creation steps, the company type guidance, the intended-use paragraph, the 12-field Basic form, the design doc rules and six sections, both Python scripts, the checklist shape, and the leak-response steps.
- **Retired**: "Testing mode is fine for personal use", "24 to 48 hours", "Test Access only until Basic is approved" as a blanket statement, and the table-shaped error section.
