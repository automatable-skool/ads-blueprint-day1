---
description: Ship it - deploy the pages, wire the domain, set the final URLs on the ads
---

## ⛔ Step 0 - the gates. Nothing deploys past a failure.

```
python3 code/check_css_integrity.py
python3 code/check_page_quality.py
```

Then the tracking gate: **every landing page being shipped has its TRACKING VERIFIED block in CLAUDE.md "## My setup"** (written by `/landing-page` after Tag Assistant passed). A page without the block does not ship - untracked spend is just donation. Send me back to `/landing-page` with the page named, in one line.

If a check fails - any placeholder, orphaned token, thin page - **publishing stops**. Report the failures and which command fixes them (`/landing-page` for a landing page, `/standard-pages` for the support pages). The ONLY exception: placeholders the owner explicitly told a command to leave; name each one and get a yes before deploying with them. A placeholder on a live page is the one failure a paid click sees.

## What this command ships

Everything in `website/` that the campaigns depend on, together: the landing pages under `app/lp/`, `/thank-you`, the six sitelink targets, the legal pages. There is no drip and no queue on the ads side - a campaign needs its whole destination set live at once, so this is one deploy, not a schedule.

**Deploy by lane:**
- **Static/Next.js - fully automated via GitHub + Vercel CLIs.** One-time wiring (do it now if missing, walking me through each login):
  - GitHub: check the CLI exists first - `command -v gh` → if missing, install it (`brew install gh` on Mac, `winget install GitHub.cli` on Windows) and continue, never error out. Then `gh auth status` → if not logged in, `gh auth login` (I follow the browser prompt - no GitHub account yet? The same page has "Create an account", sign up there and come back). Then `gh repo create [site-name] --private --source website/ --push` (or plain `git push` if the repo exists).
  - Vercel: `npx vercel login` (browser prompt) → `npx vercel link` in the site folder.
  - **⛔ THEN CONNECT THE REPO TO VERCEL. `vercel link` does NOT do this and it is the step everyone misses.** `link` ties your LOCAL FOLDER to a Vercel project; it does not tell Vercel to watch GitHub. Without the Git integration, pushing changes nothing - deploys only happen when someone runs `npx vercel --prod` by hand:
    ```bash
    cd website && npx vercel git connect https://github.com/<user>/<repo> --yes
    ```
    **Verify it rather than assuming** - make a trivial commit, push, and confirm a deployment appears (`npx vercel ls`) without you running a deploy command.
  - Record all three as done in CLAUDE.md "## My setup".

  - **⛔ SET THE COMMIT EMAIL FROM VERCEL. Never ask me for it, never leave the default.** Vercel rejects any deployment whose commit author it cannot match to a seat on your account - error `TEAM_ACCESS_REQUIRED`. The default git identity on a fresh Mac is something like `jono@mac.home`, a hostname that exists nowhere, so **every push deploys and every deploy is blocked, silently.** Read the real address from the API and set it:
    ```bash
    T=$(python3 -c "import json,glob,os;[print(json.load(open(f))['token']) or exit() for f in glob.glob(os.path.expanduser('~/Library/Application Support/com.vercel.cli/auth.json'))+glob.glob(os.path.expanduser('~/.local/share/com.vercel.cli/auth.json'))+glob.glob(os.path.expanduser('~/.vercel/auth.json')) if os.path.exists(f)]")
    EMAIL=$(curl -s https://api.vercel.com/v2/user -H "Authorization: Bearer $T" | python3 -c "import json,sys;print(json.load(sys.stdin)['user']['email'])")
    git config user.email "$EMAIL"
    ```
    Record the email in CLAUDE.md "## My setup". **Verify, do not assume:** push a commit and confirm the deployment reaches Building rather than Error in ~3 seconds. A 3-second Error is this check failing.

  - **⛔ FIND WHERE THE APP ACTUALLY LIVES, THEN SET VERCEL'S ROOT DIRECTORY TO IT. Detect it - never assume.** Vercel defaults Root Directory to the repo root; if `package.json` is not there, every build fails with no `package.json` found. The app root is wherever `package.json` with a `next` dependency is - **it is NOT always `website/`**:
    ```bash
    # from the repo root - first match wins, ignore node_modules
    find . -name package.json -not -path "*/node_modules/*" -maxdepth 3 \
      -exec grep -l '"next"' {} \; | head
    ```
    **Say what you found before setting it** - `package.json is at ./website, so Root Directory = website` - then set it, substituting the path you actually found:
    ```bash
    APP_DIR=website      # <- whatever the find above returned, NOT a default
    PROJECT_ID=$(python3 -c "import json;print(json.load(open('.vercel/project.json'))['projectId'])")
    ORG_ID=$(python3 -c "import json;print(json.load(open('.vercel/project.json'))['orgId'])")
    curl -s -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$ORG_ID" \
      -H "Authorization: Bearer $T" -H "Content-Type: application/json" \
      -d "{\"rootDirectory\":\"$APP_DIR\"}"
    ```
    Confirm the response echoes the path back, and record it in CLAUDE.md "## My setup".

    **The three Vercel failures in order, because each one masks the next:** Git not connected (pushes deploy nothing) → commit email not on a seat (`TEAM_ACCESS_REQUIRED`, ~3s Error) → Root Directory wrong (build fails, no `package.json` found). Fixing one reveals the next, so verify all three before calling the deploy pipeline done.

  - Every publish after that: `npm run build` locally FIRST (catch errors before they're deploy failures) → commit + push → `npx vercel --prod` → **read the deployment output and logs yourself** (`npx vercel inspect [url] --logs` on failure) - never tell me "check the Vercel dashboard": read the log, find the error, fix it, redeploy, repeat until the deploy is green.
  - Verify the live URLs return 200 before calling it shipped.
- **WordPress:** publish the drafts through Novamira (they were created as WP drafts by the page commands), verify each URL renders live.

**⛔ The custom domain - first deploy only, and ASK before assuming.** A deploy lands on `something.vercel.app`, which is a temporary address, not a business's website - and Google Ads will disapprove or distrust a `.vercel.app` destination. First question, before anything touches the account:

> "Do you own a domain for this business? If yes, paste it. If not, buy one first - about $12/year at Namecheap, Cloudflare or Porkbun - it takes five minutes and everything below depends on it."

- **They have one:** `npx vercel domains add [their-domain.com]`, then read the exact records Vercel prints and walk them through adding those at their registrar - name the click path for the registrar they actually use (GoDaddy: My Products → DNS → Add · Namecheap: Domain List → Manage → Advanced DNS · Cloudflare: the domain → DNS → Add record; **on Cloudflare set the record to DNS only, not proxied**). Then wait for it to resolve, confirm the real domain serves the site over HTTPS, and record it in CLAUDE.md "## My setup".
- **They don't:** stop here, say plainly why - final URLs, the Basic Access application, the phone snippet and every conversion tag all point at the domain, and moving later means redoing them. **Never set a `.vercel.app` URL as a final URL on an ad.**

## After the deploy - wire the account to the live URLs

1. **Fetch every shipped URL live** and show me one line per page, never a table: `path · status · N words`. Anything not 200 is not shipped.
2. **Re-run the stage-1 number-swap check on the LIVE domain** (`_googWcmGet` in the console - see `/landing-page`). The snippet was verified on the staging URL; the domain is what the ads will send traffic to.
3. **Set the final URLs on the ads through the API in the same run** - each ad group's ads point at its landing page's live URL, read from the `**Landing page:**` lines in `keyword-list.md`. Update those lines to the live domain if they still carry a staging URL.
4. **Confirm the thank-you page and privacy policy resolve on the live domain** - the conversion tag and the 10DLC registration both depend on them.
5. Landing pages stay `noindex` and out of the sitemap. **No Search Console work here** - ad pages are not meant to rank. If the site also runs the SEO track, that repo's `/publish` owns indexing.

**Close the loop:** report URLs live, which ads got final URLs, and the tracking state in one screenshot-able summary. Campaigns still PAUSED stay paused - enabling them is `/scale-account`'s call, not this command's.
