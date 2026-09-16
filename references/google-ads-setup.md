# Google Ads API setup - eight steps to direct access
Revised 2026-09-16 · about 25 minutes of clicks · Explorer access is instant, Basic access lands minutes after brand verification · ends in a `.env` file holding five values
Next: start at Step 0 and get the website ready, then Step 1 creates the Cloud project.

Work this doc top to bottom. When it's done, Claude Code talks straight to Google Ads - no Sheets, no manual uploads, full read and write access.

Grades on claims: (a) official Google docs or blog, (b) Google staff on the forum or two independent sources agreeing, (c) single source or inferred. Anything without a grade is a click path that Jono or a member has run and confirmed.

## The five values you're collecting

```
GOOGLE_ADS_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx
GOOGLE_ADS_REFRESH_TOKEN=1//xxxxxxxxxxxxxxxxxx
GOOGLE_ADS_CUSTOMER_ID=9876543210
GOOGLE_ADS_LOGIN_CUSTOMER_ID=1234567890
```

The last one only if you reach the ads account through a manager account - blank otherwise.

There is no developer token any more. A `GOOGLE_ADS_DEVELOPER_TOKEN` line in an older `.env` can stay filled, stay blank or be deleted: the API has ignored it since 9 September 2026 and the scripts in `code/` treat it as optional. (a)

## Before you start - what changed on 10 September 2026

- **Developer tokens are gone.** Google sunset them on 9 September 2026. Access levels now sit on the **Google Cloud project that owns your OAuth client ID and secret**. Existing tokens keep working as a no-op; Google will reject the header in a future major API version, so new code does not send it. (a)
- **Sign-up and access management moved to Google Cloud Console.** The Google Ads API Overview page (https://console.cloud.google.com/google/ads-apis/overview) shows your level and holds the upgrade buttons. API Center in Google Ads is deprecated: anything applied for there is not processed, and its "Apply for basic access" link now opens the App Conversion Tracking & Remarketing API application - a different API, with a red banner saying so. (a)
- **No manager account needed** for the API. You need one only to manage several accounts through it. (a)
- **Basic access is automated** - reviewed within minutes of submission once the project has passed brand verification, which is now a prerequisite for Basic and Standard. Every Basic application that was pending on 10 September was closed; those applicants reapply from the Overview page. (a)
- **Your OAuth app must be "In production", not "Testing".** Testing-mode refresh tokens die after 7 days, and brand verification only runs on an External, published app. (a)
- **You need 2-step verification and a passkey** on the Google account before you mint the refresh token (2SV since 21 April 2026, passkeys since 5 August 2026). A new passkey can take up to 7 days to become trusted - create it at g.co/passkeys today. (a)

---

## Step 0 - Get the website ready

Brand verification (Step 3) checks the site behind your OAuth consent screen, and Basic access needs it. If you ever apply for Standard, a human at Google opens the same site. About 5 minutes with `website/`, longer if you're patching an existing site. Do it before Step 1 so nothing blocks the verification later.

### What gets checked (by name)

- A **home page** that is live on a **domain you own** - the authorised domain on the consent screen must match it. (a)
- A **Privacy Policy** page and a **Terms of Service** page with real content - both are linked from the consent screen's Branding tab and fetched during verification. (a)
- An **About page** with real background and a **physical business address** visible on the site - what a Standard reviewer looks for, and what makes the site read as a real business. (a)
- **Consistency:** the app name on the consent screen, the name on the site and the email domain should agree. (b)

### Do this

- **No site:** `website/` already has `/about`, `/privacy-policy`, `/terms`, `/contact` and an address slot. Fill `website/lib/site.config.ts`, push to GitHub, import to Vercel, add your domain. It's the site the money page lands on later, so nothing is wasted.
- **Existing site:** don't rebuild. Add the missing pages and put the address in the footer. WordPress: through the Novamira connection. Anything else: Claude writes the copy, you paste it.
- **Verify:** open all four URLs in a private window. Every one loads, the address is on screen, the business name matches what goes on the consent screen.

---

## Step 1 - Create the Google Cloud project and enable the API

The access level, the OAuth client and the brand verification all live on one Cloud project. Takes about 4 minutes. Billing is optional. (a)

**One clean project for this repo.** Never reuse a project an agency or another tool has used - its access level and its verification are theirs, not yours. (a)

**Billing: off, or a paid account - never the Free Trial.** Google's open known issue (checked 16 September 2026): a project on the Google Cloud Free Trial, or with a suspended or disabled billing account, is rejected for Explorer ("does not meet the eligibility criteria") and for Basic ("requires a successfully verified OAuth brand profile") even after brand verification passes. Fix: upgrade the project to a paid tier, or remove billing from it entirely, wait a few minutes, apply again. (a)

### Do this

1. Open: https://console.cloud.google.com
2. Top bar -> project dropdown -> **"New Project"**
3. Project name: `google-ads-dashboard`
4. Click **Create**
5. Wait about 10 seconds for it to provision, then make sure it's selected in the top-bar dropdown
6. Enable the API: https://console.cloud.google.com/flows/enableapi?apiid=googleads.googleapis.com -> **Enable** (or search "Google Ads API" in the top bar and click Enable on its page)
7. Enabling grants the project **Test access** automatically: test accounts only, 15,000 operations a day. Step 2 lifts it to production. (a)

### Save this value

Write the project name into CLAUDE.md "## My setup". Nothing goes in `.env` yet.

---

## Step 2 - Apply for Explorer access (production, today)

Explorer is production reads and writes at 2,880 operations a day, granted automatically in most cases. Takes about 3 minutes. (a)

### Do this

1. Open the **Google Ads API Overview page**: https://console.cloud.google.com/google/ads-apis/overview with your project selected. Same page by clicks: search "Google Ads API" in the top bar -> open it -> **Manage** -> **Manage access level**.
2. The page shows **Current access level: Test**.
3. Expand **Upgrade access level**. **Next access level** reads **Explorer**.
4. Click **Apply for access**.
5. Google reviews it automatically and the level flips to Explorer, usually straight away. (a)

### What the application asks

Google does not document the sign-up questions field by field. (c) Expect the things the old token form asked - a contact email, the company name and website, what kind of company you are, what the tool does. Answer as what you are:

**Company type - Advertiser.** You manage your OWN business's Google Ads. Highest approval rate. Agency/SEM is for a roster of unrelated client accounts; Affiliate and Independent Google Ads Developer trigger extra scrutiny and only apply if they are genuinely you. (b)

**Intended use - paste this:**

```
Internal automation tool for managing my own Google Ads account. The tool pulls reporting data via the Google Ads API and runs analysis on search terms, keyword performance, Quality Score, and campaign metrics. It surfaces optimization recommendations in an internal dashboard that I use to manage my ad spend and improve ROAS. Read-heavy use of GoogleAdsService.search for reports across campaign, ad group, keyword, and search-term resources. Limited write operations: occasional keyword and negative-keyword-list mutations to apply recommendations I approve. The tool is internal - not exposed to external customers, no third-party access, no resale. Estimated daily API calls: 5,000.
```

**Consistency:** the company name, the website and the email domain should agree. `dana@whitfieldelectrical.com` with `whitfieldelectrical.com` and "Whitfield Electrical" is good. A Gmail contact is a mild mismatch, not a blocker. (b)

### What Explorer cannot do

Planning services are blocked at Explorer: Keyword Planner ideas and volumes, reach planning, audience insights. So are account creation, user management and the billing services. Every command in this repo runs on Explorer except the Keyword Planner volume pull in `/keywords`, which is what Basic (Step 4) unlocks. (a)

### Save this value

Record "Explorer, [date]" in CLAUDE.md "## My setup".

---

## Step 3 - OAuth consent screen and brand verification

Required before Google lets you create OAuth credentials, and brand verification is the prerequisite for Basic. Takes about 8 minutes. (a)

### The Testing-mode trap

- An External app in **Testing** status issues refresh tokens that **expire after 7 days**. Google lists this as the number one cause of `invalid_grant`. (a)
- The fix is **In production**. An unverified production app just shows a "Google hasn't verified this app" warning and is capped at 100 lifetime users - irrelevant for one person. (a)
- A refresh token minted while the app was in Testing keeps its 7-day life even after you switch. Switch first, then mint. (b)
- Brand verification only runs on an app that is External and In production. Internal or Testing silently disqualifies it. (a)

### Do this

1. Left sidebar (hamburger menu) -> **APIs & Services** -> **OAuth consent screen** (Google also calls this page "Google Auth Platform"; same thing)
2. **Overview** tab -> **Get started**. App name `Google Ads Dashboard`, User support email your email, Developer contact email your email -> **Create**. (a)
3. **Audience** tab -> User type **External** (click "Make external" if it defaulted to Internal; Internal only exists inside a Workspace organisation) -> **Publish app** so the status reads **In production**. (a)
4. **Branding** tab - every field, all from the Step 0 site, all on the domain you own: (a)
  - App name: `Google Ads Dashboard`
  - App logo: the business logo, square
  - Application home page: your website
  - Privacy policy link: the real page on your site
  - Terms of service link: the real page on your site
  - Authorised domain: your site's domain
5. **Save**.
6. A **Scopes** page, if it appears -> save without adding any. The `adwords` scope is requested at token time, not here.

### Brand verification

1. On the **Branding** tab, click **Verify Branding**. The automated check takes a few minutes. (a)
2. If it fails, the page lists the errors and what to fix. Usual causes: consent screen still Internal or Testing, a home page, privacy or terms URL that does not resolve, a domain you don't own. Fix, re-run. (a)
3. When it passes, click **Publish branding**. Do it within 7 days or the result lapses to "Need to re-verify". (a for the button, b for the 7 days)

Skip this only if this Cloud project already holds Basic or Standard, transferred from a pre-September token - existing access holders are encouraged to verify, not required. (a)

---

## Step 4 - Apply for Basic access (minutes, not weeks)

Basic is 15,000 operations a day and unlocks the planning services. The review is automated. Takes about 2 minutes plus the wait. (a)

### Do this

1. Back on the **Google Ads API Overview page**: https://console.cloud.google.com/google/ads-apis/overview
2. **Current access level: Explorer**. Expand **Upgrade access level**. **Next access level: Basic**.
3. Check the panel shows no warning that brand verification is incomplete. If it does, finish Step 3 first. (a)
4. Click **Apply for access**.
5. The page says the application is under review and to check back in a few minutes. It flips to Basic, and the approval email lands at the same time. (a; a member ran it on 15 September 2026, under a minute)

### Two things to know

- **The prerequisite may not be enforced yet.** On 15 September 2026 a member clicked Apply with the "brand verification needs to be completed" notice still showing, and was approved. If the button is clickable, click it - but do Step 3 regardless: Google's docs call verification a prerequisite, and the rejection email for unverified projects says "Basic Access requires a successfully verified OAuth brand profile". (c for the observation, a for the rule)
- **Rejected although Branding shows verified** -> the Free Trial or suspended-billing known issue in Step 1. Fix billing, wait a few minutes, apply again - or use a fresh project. (a)

### Save this value

Record "Basic, [date]" in CLAUDE.md "## My setup". Nothing changes in `.env` - the same OAuth client now carries the higher level.

### Standard access - only if you ever need it

Unlimited operations, granted only to large companies or tools that serve many advertisers. Overview page -> Next access level: Standard -> **Start application** -> a manual audit by the compliance team, about 10 business days, with emailed questions you must answer promptly. Tools with external users give demo sign-in access and must meet the Required Minimum Functionality. Nobody in this track needs it. The paste-ready answers, the design doc and the denial reasons, if you ever do: `references/api-application/standard-access-response.md`. (a)

---

## Step 5 - Create OAuth credentials

This generates the `client_id` and `client_secret` your code will use. Takes about 3 minutes.

### Do this

1. Left sidebar -> **APIs & Services** -> **Credentials**
2. Click **+ Create Credentials** at the top -> **OAuth client ID**
3. Application type: **Desktop app** (Web app is only for a hosted callback URL) (a)
4. Name: `google-ads-cli`
5. Click **Create**
6. A popup appears with **Client ID** and **Client secret** - click **Download JSON** and save it as `credentials.json` in the repo root. It is gitignored, and `code/get_refresh_token.py` reads it in Step 7.

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

**This client is what carries the access level.** Every API call made with it gets this project's level. Credentials from another project get that project's level - the source of most "it worked for my agency but not for me" confusion. (a)

---

## Step 6 - Account IDs (the manager account is optional now)

Every Google Ads account, manager and regular alike, has a **Customer ID** in `123-456-7890` form. Two can matter here. (a)

`GOOGLE_ADS_CUSTOMER_ID` is the **account running the ads**. Always required. Top-right of Google Ads, next to your avatar.

`GOOGLE_ADS_LOGIN_CUSTOMER_ID` is a **manager account (MCC)**, and only if you reach the ads account through one. Leave it blank if you authenticate straight into the ads account. (a)

Both are stored **without hyphens** - hyphens raise `INVALID_CUSTOMER_ID`. (a)

**Do you want a manager account at all?** The API no longer needs one. `/account-setup` still builds one, for ownership reasons that have nothing to do with the API: the manager is the thing you own while an agency comes and goes, and it is the only way to run several accounts through one set of credentials. (a for the API rule)

### No regular Ads account yet

Create it at ads.google.com and read these three lines BEFORE clicking through the signup - Google won't warn you:

- **Time zone and currency are PERMANENT.** Google shows the dropdowns and never says they can't be changed. Pick the time zone the business actually operates in and the currency it wants to be billed in - the only fix later is a brand new account.
- **Skip the Smart campaign.** The signup flow pushes a budget and a campaign before anything is built. Use the small "Switch to Expert Mode" / "Create an account without a campaign" link at the bottom. `/campaign-plan` builds the real campaigns later.
- **Your own email owns the account** - never an agency's.

### Creating a manager account (only if you want one)

1. Open: https://ads.google.com/home/tools/manager-accounts/
2. Click **"Create a manager account"**
3. Account name: `<Your Name> MCC`
4. "Are you primarily going to manage your own accounts or other people's accounts?" -> either option works. Pick **"Manage my own accounts"** if you're the only user.
5. Country, time zone and currency: the business's own
6. Submit

You'll see a **"Congrats! You're all done"** screen. It does NOT show the Customer ID, so don't panic. Click whatever button takes you forward, usually **"Explore your account"** or **"Continue to dashboard"**. In the MCC dashboard the **Customer ID** sits in the **top-right header** next to your profile avatar. Strip the dashes, then paste into `.env` as `GOOGLE_ADS_LOGIN_CUSTOMER_ID=1234567890`.

### Linking the ads account to the manager (only if you made one)

Google says the link can show as pending for up to 24 hours after you accept, so do this before you need it. (a)

1. Inside the MCC -> **Accounts** icon (left sidebar) -> **"Sub-account settings"** -> **plus button** -> **"Link existing account"** (a)
2. Enter the ads account's Customer ID -> **Preview** -> **Send request**
3. Google emails the ads account's owner from `ads-account-noreply@google.com`, subject *"You have a pending request to link your account to a Manager account"* -> open it -> **ACCEPT REQUEST**, signed in as that account's owner
4. If the email never arrives: open the ads account directly -> **Admin** -> **Access and security** -> **Managers** tab -> the pending request is under **Link request** -> **Accept**. (a) The bell icon top right shows it too.

### Save this value

Take the ads account's Customer ID, strip the dashes, and paste into `.env` as `GOOGLE_ADS_CUSTOMER_ID=9876543210`.

---

## Step 7 - Generate the refresh token

The refresh token is the permission slip Claude uses to act on your Ads account. Generated once, used for as long as it stays alive. Takes about 2 minutes.

### Before you run it

- The Google account you sign in with must have **Admin or Standard access to the ads account** - or to the manager account, if you go through one - or every call fails with `USER_PERMISSION_DENIED`. (b)
- That account needs **2-step verification** (forced since 21 April 2026) and a **passkey** (forced since 5 August 2026). A brand-new passkey may need 7 days before Google trusts it, so set it up at g.co/passkeys ahead of time. (a)
- The consent screen must already be **In production** (Step 3). (a)
- Never use the OAuth Playground for this - its tokens are revoked after 24 hours. (b)
- Python **3.10 or newer**. 3.9 still installs today but Google has said it loses API access when v22 sunsets in October 2026. (a)
- The library: `pip install --upgrade "google-ads>=32" python-dotenv google-auth-oauthlib`. **google-ads 32.0.0 (9 September 2026) is the first version that makes API calls without a developer token**; on anything older the scripts in `code/` stop with an upgrade message. (a)

### Do this

In this repo: `python3 code/get_refresh_token.py` - it reads `credentials.json` from Step 5. Outside the repo, save this script as `get_refresh_token.py` next to your `.env`:

```python
"""Generates a Google Ads refresh token.

Run: python3 get_refresh_token.py
Opens browser -> "Allow" -> token is printed to your terminal.
"""

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

1. Run it. The browser opens.
2. Sign in with the **Google account that has access to the ads account** (or the manager). Complete the passkey prompt. Click **Allow** through the warning ("Google hasn't verified this app" - that's fine, it's your own app).
3. Browser shows "The authentication flow has completed."
4. Look at your terminal - the refresh token is printed. Copy it.

### Save this value

Paste into `.env` as `GOOGLE_ADS_REFRESH_TOKEN=...`.

### Keep it alive

- Mint it once and keep it. Each Google account can hold 100 live refresh tokens per client ID; past that, the oldest dies silently. (a)
- A token unused for 6 months is invalidated. Run the Step 8 test at least monthly. (a)

---

## Step 8 - Verify everything works

Catch any setup errors now, before you waste filming time. Takes about a minute. Explorer is enough to run it the same day; Test access only works against test accounts.

### Do this

In this repo: `python3 code/test_connection.py`. Outside the repo, save this as `test_connection.py`:

```python
"""Tests the Google Ads API connection.

Reads creds from .env, pulls one campaign to confirm everything works.
No developer token - the access level comes from the Cloud project behind the OAuth client.
Needs google-ads 32.0.0 or newer.
"""

from dotenv import load_dotenv
import os
from google.ads.googleads.client import GoogleAdsClient

load_dotenv()

config = {
   "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
   "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
   "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
   "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") or None,
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

Install deps (google-ads 32.0.0 or newer, which calls without a developer token and speaks API v25): (a)

```bash
pip install --upgrade "google-ads>=32" python-dotenv
```

Run it:

```bash
python3 test_connection.py
```

If you see your campaigns listed, you're done. Claude Code can now manage your Google Ads at this project's access level.

---

## Common errors and their fixes

One bullet per error. Grades: all (a) from Google's common-errors page or the developer-token FAQ unless marked.

- **`CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION`** (API v25 and newer) or **`ACTION_NOT_PERMITTED`** (older versions) - the Cloud project is at Test access and you called a production account. Overview page -> apply for Explorer (Step 2).
- **`AUTHORIZATION_ERROR`** on production right after an upgrade, when this project made API calls with a Test-level developer token before 9 September 2026 - Google's known issue, fix rolling out. Workaround: a new Cloud project, apply for Explorer there.
- **"Basic Access requires a successfully verified OAuth brand profile"** while Branding shows verified, or Explorer refused as **"does not meet the eligibility criteria"** - the Free Trial or suspended-billing known issue (Step 1). Upgrade to a paid tier or remove billing, wait a few minutes, apply again.
- **`DEVELOPER_TOKEN_INVALID`**, **`DEVELOPER_TOKEN_NOT_APPROVED`**, **`DEVELOPER_TOKEN_PROHIBITED`** - a library older than 32.0.0 sent an empty or made-up token. Upgrade the library and leave the token line blank or delete it; a real pre-September token is harmless either way. (b)
- **`USER_PERMISSION_DENIED`** ("User doesn't have permission to access customer") - `GOOGLE_ADS_LOGIN_CUSTOMER_ID` has hyphens, or is the ads account ID instead of the manager ID, or names a manager the Google account that minted the refresh token cannot access, or the manager-client link was never accepted; or it is blank but you can only reach the account through a manager. Fix the ID, re-check Step 6, and if needed re-run Step 7 with an account that has access. (b for the OAuth-account cause)
- **`NOT_ADS_USER`** - the Google account that authorised has no Google Ads access at all. Invite it to the account (Admin, Access and security, Users) or re-run Step 7 with the right account.
- **`CUSTOMER_NOT_ENABLED`** - the Ads account never finished signup or was cancelled. Finish signup in the Google Ads UI or reactivate it.
- **`CUSTOMER_NOT_FOUND`** - account created minutes ago, backend not ready. Wait 5 minutes, then retry every 30 seconds.
- **`INVALID_CUSTOMER_ID`** or **`CLIENT_CUSTOMER_ID_INVALID`** - hyphens in the ID, or wrong length. Both `.env` IDs are 10 digits, no dashes.
- **`OAUTH_TOKEN_INVALID`** - the Authorization header holds the wrong string. The library builds this for you; if you see it, the client ID, secret or refresh token is mismatched.
- **`ACCESS_TOKEN_SCOPE_INSUFFICIENT`** - the refresh token was minted without the `adwords` scope. Re-run Step 7.
- **`invalid_grant`** ("Token has been expired or revoked") - the consent screen was in Testing (7-day life), the token sat unused 6 months, you revoked it, or the 100-token cap pushed it out. Set the app to In production (Step 3), then re-run Step 7.
- **`RESOURCE_EXHAUSTED`** - daily operations quota hit: 2,880 on Explorer, 15,000 on Basic, on a rolling 24-hour window. Stop for the day, batch operations, or apply for Basic.
- **`RESOURCE_TEMPORARILY_EXHAUSTED`** - per-second rate limit. Back off a few seconds and retry; cap concurrent requests.
- **Planning services fail on Explorer** - Keyword Planner, reach planning and audience insights are blocked at Explorer. Apply for Basic (Step 4).
- **`403` after it was working before** - the refresh token expired or was revoked (6 months idle, Testing-mode token, password or security change). Re-run Step 7.
- **Permission error that clears on its own after a few hours** - reported on the forum with no code change. Retry before rebuilding. (c)

---

## API versions - keep this current

- Google now ships a new API version every month and four major versions a year. Each major lives 12 months, then every request to it fails on the sunset date with no grace period. (a)
- Live today: v22 (dies October 2026), v23 (dies February 2027), v24 (dies May 2027), v25 (released 22 July 2026; v25.2 in September 2026). Target **v25**. (a)
- Already dead: v19 (11 February 2026), v20 (10 June 2026), v21 (5 August 2026). (a)
- Latest `google-ads` library: **32.0.0, 9 September 2026** - the first version that makes API calls without a developer token, and the minimum the scripts in `code/` accept without one. Python 3.9 to 3.14 today; use 3.10 or newer because 3.9 loses access at the v22 sunset. (a)
- Before every version bump, search the code for pinned version strings and removed enum values. Metrics that come back empty instead of erroring are the tell. (c)
- The Cloud Console's **APIs & Services** metrics page shows which API versions and methods your project is actually calling. (a)

---

## Reads through MCP, writes through the library

- Google's own MCP server (`github.com/googleads/google-ads-mcp`) is read-only: three tools, `search`, `list_accessible_customers`, `get_resource_metadata`. Explorer Access is enough. Install with `claude mcp add google-ads-mcp -- pipx run --spec git+https://github.com/googleads/google-ads-mcp.git google-ads-mcp` and give it `GOOGLE_PROJECT_ID` and, if you go through a manager, `GOOGLE_ADS_LOGIN_CUSTOMER_ID`. The September 2026 release calls without a developer token. (a)
- Google's Agent Skills repo has `google-ads-api-mcp-setup` and `google-ads-api-quickstart` for the same install: `npx skills add google/skills/skills/ads`. (a)
- Writes (campaign builds, negatives, budgets) go through the Python library in `code/`, and every new entity lands **PAUSED** for human review. (b)
- Hosted MCP brokers work by putting your account under their Cloud project and their terms. Not for this repo. (c)

---

## Summary checklist

- [ ] Step 0 - Live site with home, about, privacy and terms pages on a domain you own
- [ ] Step 1 - Cloud project created, Google Ads API enabled, level shows Test, billing off or paid (never Free Trial)
- [ ] Step 2 - Explorer applied for on the Overview page, level shows Explorer
- [ ] Step 3 - Consent screen External and **In production**, branding filled, **Verify Branding** passed, **Publish branding** clicked
- [ ] Step 4 - Basic applied for on the Overview page, level shows Basic
- [ ] Step 5 - OAuth client created, `credentials.json` saved, `GOOGLE_ADS_CLIENT_ID` and `GOOGLE_ADS_CLIENT_SECRET` in `.env`
- [ ] Step 6 - `GOOGLE_ADS_CUSTOMER_ID` saved; `GOOGLE_ADS_LOGIN_CUSTOMER_ID` only if you go through a manager
- [ ] Step 7 - Passkey ready, google-ads 32.0.0 or newer installed, refresh token generated and saved
- [ ] Step 8 - `test_connection.py` lists campaigns
- [ ] Monthly - run `test_connection.py` so the refresh token never idles 6 months

When all boxes are ticked, Claude has full direct access to Google Ads. No Sheets, no CSVs, no manual steps.

---

## Already had a developer token before 9 September 2026?

- Nothing to redo. Google looked at 90 days of API logs and gave every Cloud project that used your token the token's access level. (a)
- Check it: the Overview page for your project should show the same level API Center showed. If it doesn't, apply for the level again from the Overview page. A token that was never used, or unused for 90 days, transferred nothing. (a)
- A Basic application pending on 10 September was closed, not denied. Reapply from the Overview page; it lands in minutes. (a)
- Code: leave `GOOGLE_ADS_DEVELOPER_TOKEN` in `.env` or delete it. The scripts in `code/` treat it as optional; upgrade the library to 32.0.0 or newer so the header is never sent. (a)

---

## Security notes

**Never commit `.env` to git.** Add `.env`, `.env.*`, `*credentials.json` and `*-token.json` to `.gitignore` before writing any credential, and read the file to confirm.

**The refresh token is the master key.** Anyone with it plus the client secret can manage your Ads account at this project's access level. Treat it like a password.

**If you ever suspect a leak**, go to https://myaccount.google.com/permissions, revoke "Google Ads Dashboard", and re-run Step 7.

**Who Google emails now.** Mandatory service announcements go to the owner and editor users on the Cloud project's IAM page (☰ -> IAM & Admin -> IAM), not to an API Center contact. Keep an inbox you read on that list. (a)

**For unattended jobs** (cron, servers), a service account is the safer choice: no passkey prompt, survives staff changes. Add its email as a user on the Ads account under Admin, Access and security, Users; raise it to Admin manually if needed. The access level then comes from the project that owns the service account. (a)

**Google's August 2026 pilot** lets you allowlist which Cloud projects may do account, user and billing operations under your MCC. Opt-in only for now; worth joining once the tool is stable. (a)

---

## What changed in this revision

Revised 2026-09-16 against Google's 10 September 2026 announcement ("A new onboarding experience for Google Ads API developers"), the developer-token FAQ, the access-levels page (updated 11 September 2026), the brand-verification guide, google-ads-python 32.0.0, and one member's run on 15 September 2026.

- **Developer tokens removed everywhere.** Sunset 9 September 2026; access levels sit on the Cloud project behind the OAuth client. Five `.env` values, not six.
- **Steps reordered around the Cloud project**: project and Test access (1), Explorer from the Overview page (2), consent screen plus brand verification (3), Basic from the Overview page (4), credentials (5), account IDs with the manager optional (6), refresh token (7), verify (8).
- **API Center retired** and named as a trap: its "Apply for basic access" link now opens the App Conversion Tracking & Remarketing form.
- **Basic access**: automated, minutes, brand verification prerequisite. The 13-field form, the design doc and the denial list moved to `references/api-application/standard-access-response.md`, where they still apply.
- **New errors**: `CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION`, `ACTION_NOT_PERMITTED`, the post-upgrade `AUTHORIZATION_ERROR` known issue, and the Free Trial billing rejection.
- **Library**: google-ads 32.0.0 required to call without a token; token optional in `code/_common.py` and `code/test_connection.py`.
- **Kept verbatim**: the Step 0 site checks, the consent-screen trap, the credentials click path, the manager-account and linking click paths, the refresh-token script and lifetime rules, the checklist shape, the API versions cadence, the MCP section, the leak-response steps.
