# Research dossier - Google Ads API access and connection for a small business, 2025-2026
Built 2026-08-28 · 72 sources read · 34 rules for /api-setup
Next: merge into references/google-ads-setup.md (draft at ref-google-ads-setup.md in this folder).

Grading used throughout:
- (a) official Google documentation or Google Ads Developer Blog, read directly, date noted
- (b) Google staff answer on the official forum, or two or more independent secondary sources that agree
- (c) single blog, single forum user, or inferred from what the official docs do not say

Every claim below carries a grade and a date. Where the current repo doc disagrees with the finding, the disagreement is called out in the "Myths" section.

---

## 16 September 2026 update - developer tokens are gone

Everything below was true on 28 August 2026. On 10 September 2026 Google moved API access onto the Cloud project and sunset developer tokens. `references/google-ads-setup.md` (revised 2026-09-16) is current; where this dossier and that doc disagree, the doc wins. Sources for the revision, all (a) unless marked:

- Google Ads Developer Blog, "A new onboarding experience for Google Ads API developers", 10 September 2026 · https://ads-developers.googleblog.com/2026/09/new-onboarding-experience-for-google-ads-api.html · tokens sunset, access on the Cloud project, API Center retired, Basic automated after brand verification, pending Basic applications closed, mandatory notices go to the project's IAM owners and editors
- Developer token FAQ · https://developers.google.com/google-ads/api/docs/api-policy/developer-token · sunset 9 September 2026, 90-day activity transfer, header optional and ignored, rejection in a future major version, two known issues (Free Trial or suspended billing rejects Explorer and Basic; AUTHORIZATION_ERROR after upgrading a project that called with a Test-level token before 9 September)
- Access levels and permissible use, updated 11 September 2026 · https://developers.google.com/google-ads/api/docs/api-policy/access-levels · Test on enabling the API, Explorer from the Overview page's "Apply for access", brand verification prerequisite for Basic, Standard via "Start application" in about 10 business days, restricted services per level
- Brand verification for the Google Ads API · https://developers.google.com/google-ads/api/docs/api-policy/brand-verification · External plus In production plus Branding filled, Verify Branding, Publish branding
- Quick start · https://developers.google.com/google-ads/api/docs/get-started/make-first-call · Overview page, Upgrade access level, login-customer-id only when going through a manager
- google-ads-python 32.0.0, 9 September 2026 · developer_token optional and the header omitted when unset (read from the wheel)
- Member run, 15 September 2026 (c) · Basic approved in under a minute from the Overview page with the brand-verification notice still showing; the API Center "Apply for basic access" link now opens the App Conversion Tracking & Remarketing form

---

## Headline findings (what changed since the repo doc was written)

- **Explorer Access exists and is automatic.** Since 28 October 2025 most new developer tokens are granted Explorer Access on sign-up: production and test accounts, 2,880 operations a day on production, no application, no wait. (a) Google Ads Developer Blog, 28 Oct 2025; access-levels doc last updated 19 Aug 2026.
- **Basic Access is "up to 5 business days", not 24 to 48 hours.** The official access-levels page says 5 business days. Early 2026 had a public backlog where Google's own two-business-day target was being missed by weeks. (a) access-levels doc, 19 Aug 2026; (b) ppc.land 6 Feb 2026, ppcnewsfeed 8 Feb 2026, claudefa.st May 2026.
- **Brand verification cuts a pending Basic review to "the next few hours".** Pilot launched 7 July 2026. Requires the Cloud project's OAuth consent screen set to External, In production, with homepage, privacy policy, terms and authorised domain filled in. (a) Google Ads Developer Blog, 7 Jul 2026.
- **Testing mode on the OAuth consent screen kills the refresh token after 7 days.** Google lists this as the top cause of invalid_grant. The repo doc currently tells the user to stay in Testing mode. That is the single worst error in the current doc. (a) Google Ads API common-errors doc; Google OAuth 2.0 doc, expiration section; Google Cloud "Manage app audience" help.
- **Passkeys are required to mint a new refresh token from 5 August 2026.** Existing tokens keep working. New passkeys can take 7 days to become trusted. Service accounts are exempt. (a) Google Ads Developer Blog, 27 Jul 2026; security-requirements doc.
- **Python 3.9 is on its way out.** Library requires 3.9+ today but Google said 3.9 loses API access when v22 sunsets in late 2026; upgrade to 3.10 or newer. (a) Google Ads Developer Blog, 24 Jul 2025.
- **Google ships its own read-only MCP server.** Three tools, Explorer Access is enough. Writes still go through the client library. (a) github.com/googleads/google-ads-mcp; (b) ppc.io, claudefa.st May 2026.

---

## Sources (72)

Official Google documentation
1. Access Levels and Permissible Use - developers.google.com/google-ads/api/docs/api-policy/access-levels (last updated 19 Aug 2026)
2. Obtain a developer token - developers.google.com/google-ads/api/docs/get-started/dev-token
3. Developer token policy - developers.google.com/google-ads/api/docs/api-policy/developer-token
4. Quotas and limits - developers.google.com/google-ads/api/docs/best-practices/quotas
5. Rate limits - developers.google.com/google-ads/api/docs/best-practices/rate-limits
6. Common errors (get-started) - developers.google.com/google-ads/api/docs/get-started/common-errors
7. Common errors (best-practices, older path) - developers.google.com/google-ads/api/docs/best-practices/common-errors
8. Call structure and headers - developers.google.com/google-ads/api/docs/concepts/call-structure
9. Select an account (quick start) - developers.google.com/google-ads/api/docs/get-started/select-account
10. Make your first call - developers.google.com/google-ads/api/docs/get-started/make-first-call
11. Onboarding guide - developers.google.com/google-ads/api/docs/get-started/onboarding
12. Introduction - developers.google.com/google-ads/api/docs/get-started/introduction
13. Test accounts - developers.google.com/google-ads/api/docs/best-practices/test-accounts
14. Access levels and RMF (productionize) - developers.google.com/google-ads/api/docs/productionize/access-levels
15. Required Minimum Functionality - developers.google.com/google-ads/api/docs/api-policy/rmf
16. Google Ads API Terms - developers.google.com/google-ads/api/docs/api-policy/terms
17. Google Ads API policies (Ads Policy Help) - support.google.com/adspolicy/answer/6169371
18. OAuth overview - developers.google.com/google-ads/api/docs/oauth/overview
19. Cloud project setup - developers.google.com/google-ads/api/docs/oauth/cloud-project
20. OAuth cloud project (get-started path) - developers.google.com/google-ads/api/docs/get-started/oauth-cloud-project
21. Service accounts - developers.google.com/google-ads/api/docs/oauth/service-accounts
22. Security requirements (2SV and passkeys) - developers.google.com/google-ads/api/docs/oauth/security-requirements
23. Google OAuth 2.0, refresh token expiration - developers.google.com/identity/protocols/oauth2#expiration
24. Google Cloud, manage app audience (Testing vs In production) - support.google.com/cloud/answer/15549945
25. Google Cloud, OAuth clients and branding - support.google.com/cloud/answer/15549257
26. Google Cloud, OAuth consent screen overview - support.google.com/cloud/answer/10311615
27. Python client library overview - developers.google.com/google-ads/api/docs/client-libs/python
28. Python client configuration - developers.google.com/google-ads/api/docs/client-libs/python/configuration
29. Best practices overview - developers.google.com/google-ads/api/docs/best-practices/overview
30. Release notes - developers.google.com/google-ads/api/docs/release-notes
31. Managing invitations (user access) - developers.google.com/google-ads/api/docs/account-management/managing-invitations
32. Link accounts to a manager account (Ads Help) - support.google.com/google-ads/answer/7459601

Google Ads Developer Blog (and googblogs.com mirror where the original body did not render)
33. Explorer access is now available - 28 Oct 2025
34. Version support changes for the Python library - 24 Jul 2025
35. Google Ads API v20 sunset reminder - 29 Apr 2026
36. Google Ads API v21 sunset reminder - 26 Jun 2026
37. Multi-party approvals in the Google Ads API - Jun 2026 (effective 27 Jul 2026)
38. Accelerate Basic Access reviews with brand verification - 7 Jul 2026
39. Announcing v25 of the Google Ads API - 22 Jul 2026
40. Passkey authentication requirement - 27 Jul 2026
41. Google Ads API pilot: Secure API Access to your Manager Accounts - 3 Aug 2026
42. Introducing Agent Skills for Google Advertising - 24 Jun 2026
43. Announcing v23 of the Google Ads API - 28 Jan 2026
44. Blog label index (google_ads_api) - post list for 2026

Google Ads API forum (Google Groups and discuss.google.dev), Google staff answers
45. Basic vs Standard for cross-account access - groups.google.com/g/adwords-api/c/NtV89PsnwBI (Aug 2025)
46. Basic Access, no response after 3 weeks - groups.google.com/g/adwords-api/c/W89P2daLm_E (Mar 2024)
47. Resubmitted basic application - mail-archive.com msg108866 (Feb 2024)
48. Trouble with Basic Access, compliance follow-up went silent - discuss.google.dev/t/335133 (Mar 2026)
49. Refresh token expiring in 7 days - groups.google.com/g/adwords-api/c/vdrb2QMWXHQ (Oct 2025)
50. USER_PERMISSION_DENIED cause and fix - groups.google.com/g/adwords-api/c/FXyial7J7ew (Jan 2022)
51. API access denied, login-customer-id - groups.google.com/g/adwords-api/c/IxVJelmWLBs (Nov 2024)
52. PERMISSION DENIED resolved itself - groups.google.com/g/adwords-api/c/95o7wP7edn0 (Jan 2023)
53. Documents required for basic access - groups.google.com/g/adwords-api/c/62cBosge7nc (Feb 2024)
54. Design documentation needed? - groups.google.com/g/adwords-api/c/EDGJKKFQMKk (Apr 2012, historical)
55. DEVELOPER_TOKEN_NOT_APPROVED after moving server - groups.google.com/g/adwords-api/c/CveR8oX8lYY

GitHub
56. googleads/google-ads-python README
57. googleads/google-ads-python ChangeLog (31.x entries)
58. googleads/google-ads-python issue 896, Python 3.13 support (Nov 2024)
59. googleads/google-ads-php issue 990, USER_PERMISSION_DENIED after upgrade (Jan 2024)
60. googleads/google-ads-mcp README (official MCP)
61. cohnen/mcp-google-ads README (community, read-only)
62. FGRibreau/mcp-google-ads README (community, read and write with guardrails)
63. mathiaschu/google-ads-analyzer README (Claude Code skill plus MCP fork)
64. google/skills, skills/ads folder (google-ads-api-mcp-setup, quickstart, diagnostics)
65. PyPI google-ads 31.4.0 (19 Aug 2026)

Trade press and developer blogs
66. ppc.land, developer token backlog and Explorer tier - 6 Feb 2026
67. ppc.land, review time cut to hours with brand check - 7 Jul 2026
68. ppc.land, monthly releases from January 2026 - 4 Sep 2025
69. ppc.land, v19 shutdown February 2026 - 15 Dec 2025
70. ppcnewsfeed, high demand slows approvals - 8 Feb 2026
71. ppcnewsfeed, Explorer tier - 31 Oct 2025
72. ppcnewsfeed, passkey requirement - 28 Jul 2026
73. Search Engine Land, passkeys mandatory - 27 Jul 2026
74. Relevant Audience, passkeys from 5 August - Jul 2026
75. seroundtable, v22 available - 16 Oct 2025
76. seroundtable, monthly releases - 5 Sep 2025
77. Soku, Google Ads API access and brand verification 2026
78. Soku, Basic vs Standard 2026
79. Slobodan Jelisavac, Basic Access step-by-step (updated 11 Jul 2026)
80. ppc.io, three changes that opened the API to marketers
81. claudefa.st, Google Ads MCP for Claude Code (May 2026)
82. dev.to flarecanary, v21 sunset and silent breakage
83. prooflytics, v20 sunset migration checklist
84. elevarus, v20 sunset June 2026
85. almcorp, v23 guide (library version requirement)
86. adriaan-dekker.nl, Python version support changes
87. unipile, Google OAuth refresh token lifetime (2026)
88. nango.dev, invalid_grant causes
89. n2api.io, DEVELOPER_TOKEN_PROHIBITED (returned 404, listed for the search hit only, not relied on)
90. Scribd, a third-party Google Ads API design document (ROI calculator example)

Read but not usable
- Reddit and Stack Overflow: WebSearch returned no reddit.com or stackoverflow.com hits for these queries, and both DuckDuckGo and Bing fallbacks were blocked or returned generic pages. Nothing below rests on them.
- The Google sample design doc (docs.google.com 1oxtk...) redirected to a signed export URL that returned 400. Its six-section shape is taken from the existing repo doc, grade (c).

---

## Findings by area

### Access levels

- Four levels exist: Test Account Access, Explorer Access, Basic Access, Standard Access. (a) source 1, 19 Aug 2026.
- Test Account Access: test accounts only, 15,000 operations a day, granted instantly when the sign-up cannot be auto-approved. (a) sources 1, 2.
- Explorer Access: test and production, 2,880 operations a day on production, 15,000 on test, granted automatically for "most new developers" on completing onboarding. (a) sources 1, 33, 28 Oct 2025.
- Explorer blocks: account creation, user management, planning services (Keyword Planner, reach planning, audience insights), billing and payment services. (a) source 1; (b) source 66 adds audience insights and reach planning by name.
- Explorer is NOT read-only. The official restriction list does not include campaign, ad group, keyword or budget mutations, and the docs say the developer can "make API calls against your production account" at Explorer. (b) inferred from sources 1, 9, 33. Soku calls Explorer "read-only reconnaissance" - that is the blog's operating advice, not Google's rule. (c) source 77.
- Basic Access: 15,000 operations a day on production and test, review "5 business days", applied for from API Center, brand verification optional but "expedites review". (a) source 1.
- Standard Access: unlimited for most services, review "10 business days", must hold Basic first, external-user tools must give demo access and meet RMF. (a) source 1.
- "Per day" is a sliding 24-hour window, not a calendar day. (a) source 1.
- Permissible use (ad management, reporting only, keyword and recommendation research) is set at Basic and Standard only and decides which services the token may call. Changing it later is a separate form. (a) source 1.
- The 2,880 and 15,000 figures are confirmed on two official pages. (a) sources 1, 4.
- Quota error is RESOURCE_EXHAUSTED; rate-limit error is RESOURCE_TEMPORARILY_EXHAUSTED. (a) sources 4, 5.
- Rate limits are a token bucket, metered separately per client customer ID and per developer token, with no published QPS number ("varies with server load"). Planning services are 1 request per second. (a) sources 4, 5.
- Each search or search_stream request counts as one operation; paginated follow-ups do not; failed requests that return a GoogleAdsFailure still count. Max 10,000 operations per mutate request. (a) source 4.

### Developer token

- 22-character string, lives in API Center of a manager account: ads.google.com/aw/apicenter. API Center does not exist on a regular or test account. (a) sources 2, 10.
- One token per company as a rule; separate tokens for separate tools "on a case-by-case basis". (a) sources 2, 3.
- Token is tied to one Cloud project once used: "a single developer token can be used for multiple projects, but each project can use only a single developer token". Using a second manager's token from the same project gives DEVELOPER_TOKEN_PROHIBITED. (a) sources 6, 19.
- The token works against test accounts before any approval; use the production manager's token even for the test hierarchy. (a) source 13.
- Sign-up fields: API contact email, company name, company URL, plus company type, intended use and place of business (the last three from the repo doc, not enumerated on the current official page). (a) for the first three, source 2; (b) for the rest, repo doc plus CLAUDE-GUIDE.
- Individuals: company name "Individual", GitHub or LinkedIn profile URL is accepted in place of a company site. Generic URLs like test.com are rejected. (a) source 2.
- Company website must be live and functional or the application is rejected. (a) sources 2, 3.
- Google emails the API contact for clarifications; no reply means the application may not proceed. (a) sources 2, 3. Failing to respond to API team notices is itself a policy violation that can downgrade or terminate a token. (a) source 17.
- The API Center path in the UI is shown two ways across Google's own pages: Admin then API Center, and Tools then Setup then API Center. Search "API Center" in the top bar if neither is visible. (b) sources 11, repo doc.

### Basic Access application: what Google wants

- Requirements listed by Google: valid, regularly monitored contact email; active Google Ads accounts linked under the manager; optional brand verification. (a) source 1.
- The application form itself is not documented field-by-field on any official page. The 12-field shape (contact email, MCC ID, Google rep, company URL, business model, design doc PDF, who has access, use with another tool, conversion tracking or remarketing, campaign types, capabilities, two checkboxes) comes from the repo's own winning submission. (b) repo doc, basic-access-response.md.
- Design doc: forum staff say English only, "provide as much detail as you can", and a template exists. Older staff guidance says a technical overview of what the tool does and which services it calls is enough. (b) sources 53, 54.
- Sample design doc format: six sections, roughly 400 words, one wireframe. (c) repo doc; the Google sample did not render in this run.
- What a small own-account tool should say: internal use, single user, own accounts only, no third-party access, no resale, human-approved writes, named services (GoogleAdsService.search, plus the mutate services actually used). (b) repo doc, source 79, source 78.
- RMF does not apply to internal own-account tools, and applies only at Standard. (a) sources 14, 15, 17.
- Data-sharing obligations: agencies need written client consent before disclosing account data to third parties; 128-bit SSL minimum for transfers; nothing in the Terms mentions LLMs or AI tools by name. (a) sources 16, 17.
- Advice Google gave during the backlog: stay on Explorer unless Basic is genuinely needed; make sure accounts are under the right manager; complete advertiser verification; add the Cloud project number if OAuth verification was done; explain the use case clearly. (b) source 70, 8 Feb 2026.

### Approval timelines

- Official: Basic "5 business days", Standard "10 business days". (a) source 1.
- Google's own target quoted in early 2026 press: two business days for Basic; missed during the backlog. (b) sources 66, 70.
- Observed waits: 3 weeks (Mar 2024, source 46); "months" with a compliance follow-up that went silent (Mar 2026, source 48); "14-plus business days" for Basic and "four-plus weeks" for Standard (May 2026, source 81). (b)
- Brand verification: once the Cloud project shows verified, "your pending Basic Access application will be reviewed in the next few hours". Automated branding check takes minutes. Verification result expires if not published within 7 days. (a) sources 38, 26; (b) source 79.
- Repo doc's "24 to 48 hours" and command file's "24 to 72h" match neither the official figure nor 2026 experience. (b)

### Denial reasons and resubmission

- Documented triggers: company URL not live or generic; unanswered clarification email; customer ID given where a manager ID was required; unjustified request for restricted services (planning, account creation). (a) sources 2, 3; (b) sources 46, 47, 48.
- Consistency between company name, company URL and contact email domain is the repo's own top rejection cause; Google's pages only require the URL be live and the email monitored. Treat name-URL-email consistency as (b): sensible, widely repeated, not an official rule.
- Resubmission path: reply inside the original compliance case email, or open a new case from API Center quoting the case ID (format 0-0###########0). Forum moderators cannot see or speed up compliance reviews. Compliance inquiries were quoted at 1 to 4 weeks. (b) sources 45, 47, 48.
- Denial is not final; the same form can be resubmitted after fixing the gap. (b) sources 47, repo command file.

### Website requirement

- Live, functional company URL is mandatory for the developer token itself. (a) source 2.
- Brand verification (the fast-track) additionally needs an application homepage, a privacy policy link, a terms of service link, and an authorised domain on the OAuth branding tab. So a bare landing page without a privacy policy blocks the fast path. (a) source 38; (b) source 79.
- No official statement that an "about page" or a physical address is required. (c) - do not promise it.

### Google Cloud project and OAuth

- Create a project, enable Google Ads API, billing optional. One dev token per project (see above). (a) sources 19, 20.
- Consent screen user type: External unless the Google account lives in a Workspace organisation (Internal needs a Cloud Organisation). (a) source 24.
- Publishing status Testing: up to 100 test users, warning screen, and "authorisations by a test user will expire seven days from the time of consent", refresh tokens included. (a) sources 24, 23.
- Publishing status In production: any Google account may authorise. An unverified app requesting sensitive scopes shows an "unverified app" warning and is capped at 100 total new users for the project's life. For a one-person tool that cap is irrelevant. (a) source 24.
- Fix for the 7-day expiry: switch to In production, then mint a new refresh token. Tokens minted while in Testing keep the 7-day expiry even after the switch. (a) source 6; (b) source 49, Oct 2025.
- Other refresh token deaths: unused 6 months; user revoked; more than 100 live refresh tokens per Google account per client ID (oldest silently revoked); password change only matters for Gmail scopes; Workspace admin policies. (a) source 23.
- OAuth Playground tokens are revoked after 24 hours - never use it to mint the production token. (b) source 87 plus WebSearch snippet.
- Client type: Desktop app for a local script; Web app only if you run a hosted callback. The adwords scope is https://www.googleapis.com/auth/adwords. (a) sources 10, 60; (b) repo doc.
- Service accounts are the alternative: add the service account email as a user on the Ads account (Admin, Access and security, Users), up to 20 accounts per email, admin role must be raised manually. Exempt from the passkey rule. (a) sources 21, 22, 40.
- ACCESS_TOKEN_SCOPE_INSUFFICIENT means the token was minted without the adwords scope. (a) source 6.

### Login-customer-id and customer-id

- customer-id is the account the request operates on. login-customer-id is the account you authenticated as. Both 10 digits, no hyphens. (a) source 8.
- When access to the client comes through a manager, login-customer-id is required and must be the manager's ID; omitting it gives USER_PERMISSION_DENIED. (a) sources 8, 9, 10.
- If you authenticate with credentials that own the client account directly, login-customer-id may be omitted or set to the client ID. (a) source 9.
- Hyphens in an ID raise INVALID_CUSTOMER_ID or CLIENT_CUSTOMER_ID_INVALID. (a) sources 6, 9.
- Google's Aug 2026 pilot ("Secure API Access to your Manager Accounts") adds an allowlist so only approved Cloud projects can do account, user and billing operations under a protected manager. Opt-in for now. (a) source 41.

### Linking the manager to the client account

- Manager side: Accounts icon, Sub-account settings, plus button, Link existing account, enter Customer ID(s), Preview, Send request. (a) source 32.
- Client side: Admin, Access and security, Managers tab, Link request, Accept. Also arrives by email; also in bulk from the manager's "Received link requests". (a) source 32.
- Status can take up to 24 hours to leave pending after acceptance. (a) source 31 (stated for user invitations; treat as (b) for manager links).
- Multi-party approvals from 27 July 2026 apply to user invitations, permission changes and access removal through the API, not to manager-client linking in the UI. (a) source 37.

### Connection errors and fixes

- DEVELOPER_TOKEN_INVALID: typo, or the token placed in the wrong header (often the refresh token pasted by mistake). Copy again from API Center. (a) source 7.
- DEVELOPER_TOKEN_NOT_APPROVED: token is Test-only and the target is a production account. Apply for Basic, or use Explorer if granted. Works on localhost then fails on the server usually means the server points at a production customer ID. (a) source 6; (b) source 55.
- DEVELOPER_TOKEN_PROHIBITED: this Cloud project is already bound to a different manager's token. Make a new project. (a) source 6.
- USER_PERMISSION_DENIED: login-customer-id missing or wrong, or the OAuth user has no access to that manager, or the manager-client link was removed. Fix: set the manager ID without hyphens, and mint the refresh token with a Google account that actually has access. (a) source 6; (b) sources 50, 51, 59.
- NOT_ADS_USER: the Google account that authorised has no Google Ads access at all. Invite it to the account or re-authorise with the right account. (a) source 6.
- CUSTOMER_NOT_ENABLED: signup never finished or the account is cancelled. Finish signup or reactivate. (a) source 6.
- CUSTOMER_NOT_FOUND: brand-new account, backend not ready. Wait 5 minutes, retry every 30 seconds. (a) source 7.
- INVALID_CUSTOMER_ID or CLIENT_CUSTOMER_ID_INVALID: hyphens or wrong length. (a) sources 6, 9.
- OAUTH_TOKEN_INVALID: the access token header holds the wrong thing. (a) source 6.
- ACCESS_TOKEN_SCOPE_INSUFFICIENT: re-authorise with the adwords scope. (a) source 6.
- invalid_grant: refresh token expired (7-day Testing rule), revoked, unused 6 months, or 100-token cap. Switch to In production and re-mint. (a) sources 6, 23; (b) sources 87, 88.
- RESOURCE_EXHAUSTED: daily operations quota hit for the access level. RESOURCE_TEMPORARILY_EXHAUSTED: per-second rate limit, back off and retry. (a) sources 4, 5.
- TWO_STEP_VERIFICATION_NOT_ENROLLED: the older 2SV error; since 21 April 2026 Google forces 2SV at token minting time instead. (a) source 22.
- Intermittent PERMISSION_DENIED that clears after a few hours with no change has been reported. (c) source 52.

### API versioning and cadence

- From January 2026: monthly releases, four major versions a year, each major live for 12 months, minors are additive and non-breaking. (a) sources 30, 68, 76.
- Sunsets: v19 on 11 Feb 2026; v20 on 10 Jun 2026; v21 on 5 Aug 2026; v22 in October 2026; v23 February 2027; v24 May 2027. Requests to a sunset version fail from that date with no grace period. (a) sources 35, 36, 69; (b) sources 68, 83, 84.
- Releases: v22 on 15 Oct 2025; v23 on 28 Jan 2026; v24 on 22 Apr 2026; v24.2 on 24 Jun 2026; v25 on 22 Jul 2026; v25.1 on 19 Aug 2026. (a) sources 30, 39; (b) source 75.
- As of 28 Aug 2026 the live majors are v22 (dying October), v23, v24, v25. New code should target v25. (a) source 30.
- Silent breakage on version bumps: removed enum values fall through, metrics go empty rather than error, renamed fields return proto defaults. Search the codebase for pinned version strings before each bump. (c) source 82.
- The Cloud Console's APIs and Services metrics page shows which versions and methods you are calling. (a) sources 35, 36.

### Python client library

- pip install google-ads. Latest 31.4.0 released 19 Aug 2026, "Requires Python >=3.9, <3.15", ships v25.1. Library 31.0.0 dropped API v20. (a) sources 27, 57, 65.
- Google's stated plan: a major release in Q4 2025 incompatible with 3.9 and supporting 3.14; 3.8 lost access at v19 sunset (Feb 2026); 3.9 loses access at v22 sunset (late 2026). PyPI metadata still says 3.9 in August 2026, so the cut has not landed yet. Rule: use 3.10 or newer. (a) source 34; (b) sources 86, 65.
- v23 needed library 25.0.0 or newer. (c) source 85.
- Configuration: google-ads.yaml, environment variables prefixed GOOGLE_ADS_ (DEVELOPER_TOKEN, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, LOGIN_CUSTOMER_ID, USE_PROTO_PLUS, JSON_KEY_FILE_PATH, LINKED_CUSTOMER_ID, LOGGING), a YAML string, or a dict. use_proto_plus is optional; developer_token is the only required field. (a) source 28.
- Test the install with examples/basic_operations/get_campaigns.py. (a) source 27.

### MCP servers

- Official googleads/google-ads-mcp: tools search, get_resource_metadata, list_accessible_customers; run with pipx from the git URL; auth via FastMCP OAuth proxy, Application Default Credentials with the adwords scope, or the Python client config; env GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_PROJECT_ID, optional GOOGLE_ADS_LOGIN_CUSTOMER_ID; Explorer Access is enough. (a) source 60.
- Read-only by design; described that way by two independent write-ups. (b) sources 80, 81. Google's Agent Skills repo (24 Jun 2026) includes google-ads-api-mcp-setup, google-ads-api-quickstart and google-ads-api-account-diagnostics, installable with npx skills add google/skills/skills/ads. (a) sources 42, 64.
- Community servers that write: FGRibreau/mcp-google-ads (39 write tools, two-step confirm, dry-run default, entities created PAUSED, audit log), mathiaschu/google-ads-analyzer (6 write tools). cohnen/mcp-google-ads is read-only. (b) sources 61, 62, 63.
- Hosted brokers (Pipeboard) skip the developer token application entirely by using their own token; that means your data flows through their token and their terms. (c) source 81.
- Pattern for this repo: read through the official MCP, write through the Python library with everything landing paused. (b) sources 80, 81, repo command file.

### Security

- Never commit .env, the OAuth client JSON, or token files. Add .env, .env.*, *credentials.json, *-token.json to .gitignore. (b) repo docs; standard practice.
- The refresh token plus client secret plus developer token together give full account control. Revoke at myaccount.google.com/permissions and re-mint if leaked. (b) repo doc.
- 2SV forced at token minting since 21 Apr 2026; passkey forced for enforced users from 5 Aug 2026; new passkeys may need 7 days to become trusted. Create the passkey at g.co/passkeys before the day you plan to run the refresh-token script. (a) sources 22, 40.
- Keep a refresh token alive with a token exchange at least every 6 months; a monthly connection test is enough. (a) source 23; (b) source 87.
- Do not mint more than a handful of refresh tokens per client; the cap is 100 per account per client ID, oldest silently revoked. (a) source 23.

### 2025-2026 changes, in date order

- 24 Jul 2025: Python library version support plan announced. (a)
- 6 Aug 2025: v21 released. (b)
- 4 Sep 2025: monthly cadence from January 2026 announced. (b)
- 15 Oct 2025: v22 released. (b)
- 28 Oct 2025: Explorer Access launched. (a)
- 28 Jan 2026: v23 released. (a)
- 6 Feb 2026: Google acknowledges application backlog, adds reviewers. (b)
- 11 Feb 2026: v19 sunset. (b)
- 21 Apr 2026: 2SV enforced when minting new refresh tokens. (a)
- 22 Apr 2026: v24 released. (a)
- 28 Apr 2026: official Google Ads MCP published (date from ppc.io; the GitHub README carries no date). (c)
- 10 Jun 2026: v20 sunset. (a)
- 24 Jun 2026: v24.2, Agent Skills for Google Advertising. (a)
- 7 Jul 2026: brand verification pilot for Basic Access. (a)
- 22 Jul 2026: v25 released. (a)
- 27 Jul 2026: multi-party approvals live; passkey requirement announced. (a)
- 3 Aug 2026: Secure API Access pilot for manager accounts. (a)
- 5 Aug 2026: v21 sunset; passkey requirement rollout begins. (a)
- 19 Aug 2026: v25.1 and google-ads 31.4.0. (a)
- October 2026: v22 sunset, and the stated point where Python 3.9 loses access. (a)

---

## Myths, with the date they stopped being true

- "Basic Access takes 24 to 48 hours." Official figure is up to 5 business days; the early-2026 backlog ran weeks. Brand verification is the only hours-long path. Stale since at least Feb 2026. (a)
- "Leave the OAuth consent screen in Testing, no need to publish." Wrong since Google introduced the 7-day expiry for Testing-status tokens (documented on the OAuth page well before 2025 and named as the number one invalid_grant cause on the Ads API errors page). Must be In production. (a)
- "A new token can only touch test accounts until Basic is approved." False since 28 Oct 2025 for most sign-ups, which receive Explorer Access with production reads and writes at 2,880 operations a day. Still true for the minority landed on Test Account Access. (a)
- "Explorer is read-only." Not in the docs. Explorer blocks account creation, user management, planning and billing services; it does not block campaign or keyword mutations. Blog advice to treat it as read-only is advice, not a rule. (b)
- "The developer token works with any Cloud project." A project binds to the first token it is used with; a second manager's token gives DEVELOPER_TOKEN_PROHIBITED. (a)
- "Python 3.9 is fine." Supported today, scheduled to lose access at the v22 sunset in October 2026. (a)
- "Any 2025 API version will keep working." v19 died Feb 2026, v20 June 2026, v21 5 Aug 2026, v22 October 2026. (a)
- "You can mint a refresh token with just a password." 2SV forced since 21 Apr 2026; passkey required for enforced users from 5 Aug 2026. (a)
- "A refresh token lasts forever." It dies after 6 months unused, or when the 100-per-client cap pushes it out, or when Testing status kills it at 7 days. (a)
- "A Gmail contact address gets you rejected." No official rule; the repo's own Gmail application was approved. Keep as a mild risk, not a blocker. (b)
- "You need an about page and a physical address on the site." No official source says so. What is required: a live site (token) and a homepage, privacy policy and terms (brand verification fast-track). (c)
- "Forum moderators can chase the compliance team." They say plainly they cannot. Reply inside the case email or open a new case from API Center with the case ID. (b)

---

## Rules an /api-setup command should enforce

Access and application
1. Check the token's access level in API Center before anything else; if it already says Explorer, run the connection test immediately and let the Basic application bake in parallel. (a)
2. Treat Explorer as production read-and-write at 2,880 operations a day with planning services blocked; do not tell the user it is read-only. (b)
3. Quote Basic review as "up to 5 business days, often longer in 2026"; never promise 24 to 48 hours. (a)
4. Offer brand verification on the Cloud project as the fast path and do it before or right after submitting Basic; it needs External, In production, homepage, privacy policy, terms and an authorised domain. (a)
5. Before applying, confirm the company URL is live, not a placeholder, and that the site has a privacy policy page; if the site lacks one, write it first. (a) for live site, (b) for privacy policy as fast-track requirement.
6. Individuals without a company site use "Individual" as company name and a GitHub or LinkedIn URL. (a)
7. Give the MCC Customer ID (not the client ID) wherever the form asks for a manager ID. (b)
8. Request only the services and campaign types the tool actually uses; asking for planning or account creation without a reason draws a clarification email. (b)
9. Describe the tool as internal, single-user, own accounts only, no third-party access, human-approved writes; name the services (GoogleAdsService.search, the mutate services used). (b)
10. The API contact email must be an inbox the user checks daily; set a reminder to look for a compliance email for 10 business days. (a)
11. On denial or a clarification request: reply inside the same case email, fix the specific gap, and quote the case ID; if a new case is needed, open it from API Center. Never post the case publicly. (b)
12. Do not tell the user RMF applies to them; it is Standard-only and exempts internal own-account tools. (a)

Cloud project and OAuth
13. One Cloud project per developer token; if a project was ever used with another manager's token, create a fresh project. (a)
14. Consent screen: External, and publishing status In production before minting the refresh token. Never leave it in Testing. (a)
15. If a refresh token was minted while the project was in Testing, re-mint it after switching to In production; the old one still dies at 7 days. (a)
16. Client type Desktop app for local scripts; scope https://www.googleapis.com/auth/adwords only. (a)
17. Never mint the production refresh token in the OAuth Playground; it is revoked after 24 hours. (b)
18. Before running the refresh-token script, confirm the Google account has 2SV and a passkey that is at least 7 days old (since 5 Aug 2026). (a)
19. Mint one refresh token and keep it; do not regenerate on every run, the cap is 100 per client and the oldest dies silently. (a)
20. Keep the token alive with a monthly connection test; 6 months unused kills it. (a)
21. Prefer a service account for unattended jobs; it is exempt from the passkey rule and survives staff changes. Add its email as a user on the Ads account. (a)

IDs and linking
22. Store both IDs without hyphens: GOOGLE_ADS_LOGIN_CUSTOMER_ID is the manager, GOOGLE_ADS_CUSTOMER_ID is the account running ads. (a)
23. Mint the refresh token with a Google account that has Admin or Standard access to the manager account, or USER_PERMISSION_DENIED follows. (b)
24. Link the client to the manager and confirm acceptance from the client side (Admin, Access and security, Managers) before the first call; allow up to 24 hours for pending to clear. (a)
25. Run list_accessible_customers as the first diagnostic when any permission error appears. (b)

Library and versions
26. Require Python 3.10 or newer; refuse to proceed on 3.9 with a note that access ends at the v22 sunset in October 2026. (a)
27. Install the latest google-ads (31.4.x as of Aug 2026) and target the newest major (v25); never pin a version within 60 days of its sunset. (a)
28. Record the pinned API version in .env or config and put its sunset date next to it. (b)
29. Before any version bump, grep the code for removed enum values and renamed fields; empty metrics are a symptom, not a success. (c)

Errors
30. Map every connection error to its fix in the doc as a bullet list: DEVELOPER_TOKEN_INVALID, DEVELOPER_TOKEN_NOT_APPROVED, DEVELOPER_TOKEN_PROHIBITED, USER_PERMISSION_DENIED, NOT_ADS_USER, CUSTOMER_NOT_ENABLED, CUSTOMER_NOT_FOUND, INVALID_CUSTOMER_ID, OAUTH_TOKEN_INVALID, ACCESS_TOKEN_SCOPE_INSUFFICIENT, invalid_grant, RESOURCE_EXHAUSTED, RESOURCE_TEMPORARILY_EXHAUSTED. (a)
31. On RESOURCE_TEMPORARILY_EXHAUSTED, back off and retry; on RESOURCE_EXHAUSTED, stop for the day or apply for Basic. (a)

MCP and writes
32. Reads go through the official read-only google-ads-mcp (Explorer is enough); writes go through the Python library with every new entity created PAUSED. (b)
33. Do not route the user's account through a hosted third-party token broker without saying that their data then flows under someone else's developer token and terms. (c)

Security
34. .gitignore must contain .env, .env.*, *credentials.json, *-token.json before any credential is written; verify by reading the file, not by assuming. (b)
