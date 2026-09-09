# File examples - copy these shapes exactly

**Read this before writing ANY file the user will open.** `output-format.md` gives the rules; this file shows the finished product. When the two disagree, this file wins - it's the picture of what "done" looks like.

---

## The rules that make a file readable

**1. Never put a number on a page without saying what it is.** `2,400` means nothing. `2,400 searches a month` means something. `$18.40` means nothing. `$18.40 per click, top of page` means something. Four unlabelled numbers in a row is the worst thing in this document - label every one.

**2. No abbreviations the reader hasn't been taught.** CPC, CTR, QS, ROAS, CPA, SKAG, RSA, KD. Write "cost per click" or "$14 a click". If a technical term genuinely has to appear, spell it out the first time and never in a heading. STAG is the one exception - it's taught on camera and it's the core concept.

**3. Never `<br>` inside a table cell.** If content needs a line break, it isn't a table. Use a block.

**4. One thing per block, with air around it.** An ad group's name, its keywords, its negatives and its angle belong together in one visually separate block.

**5. Always show the money.** Never a bare count where a dollar figure is possible. "$2,400 a month wasted" beats "312 bad search terms". A business owner acts on dollars.

**6. Say WHY, not just what.** Every prioritised item gets a one-line reason it's in that position.

**7. Headings are plain English.** `## 1. Emergency plumber - 5 keywords` beats `## STAG_EMERG_01`.

**8. Bold the thing to act on, nothing else.**

**9. Chrome scales with content. Never pad a small file with big-file furniture.**

A 2-page map does not get the same wrapper as a 60-page one. Concretely:

- **The header is at most two lines.** What it is, and the one next action. Never a paragraph explaining the difficulty ceiling, never a block quote of caveats. A caveat like "these numbers are estimates" is ONE line, in the header, not its own section.
- **Empty sections are not written at all.** `## Started` followed by "Nothing yet" is pure noise - leave it out until something is in it. Same for "saved for later" when nothing was cut.
- **No `## How to use this` unless the file genuinely needs teaching.** If the blocks are self-evident - and a well-shaped block is - the instructions are furniture. Add it only when the file has a workflow that isn't obvious from looking at it, and cap it at three lines.
- **Section headings need at least three items to earn their place.** Two items go in the parent section.
- **Under about 10 blocks, drop the grouping headings entirely.** Just the numbered blocks, in order.

The test: **would a stranger reach the first real piece of content within two seconds of opening the file?** If they have to scroll past an explanation to get there, cut the explanation.

**The test:** could a plumber open this file, with no ads knowledge, and know exactly what to do next - in ten seconds?

---

## keyword-list.md - the services and cities worth bidding on

**One block per service, cities listed inside it. Never a grid with cities as columns.**

```markdown
# Your keyword list

8 services across 12 cities in Canada. Run `/keywords stag` next to group these
into ad groups.

---

# Worth bidding on · 8 services

## 1. Emergency plumber

Your biggest opportunity - highest volume and the most urgent searches.

- Toronto · phrase · 2,400 searches a month · around $18.40 a click
- Mississauga · phrase · 590 a month · $16.20 a click
- Brampton · phrase · 480 a month · $15.10 a click
- Hamilton · phrase · 320 a month · $13.90 a click

**Total: 3,790 searches a month across 4 cities.**

---

## 2. Drain cleaning

- Toronto · phrase · 1,900 searches a month · around $12.10 a click
- Mississauga · phrase · 320 a month · $11.40 a click
- Brampton · phrase · 260 a month · $10.80 a click

**Total: 2,480 searches a month across 3 cities.**

---

# What your budget buys

You said $2,000 a month. The average click in your market costs about
$14.20, so that is roughly **141 clicks a month**.

At a normal 6-in-100 conversion rate, about **8 leads a month**.

That is enough to properly test 2 or 3 ad groups at once. Not 9.
Spread thinner and none of them ever gives you a clear answer.

---

# Set aside · 34 keywords

**People looking for a job, not a plumber**
plumber jobs toronto · plumber salary · plumbing apprenticeship

**People wanting to do it themselves**
how to unclog a drain · drain snake rental · diy drain cleaning

**People buying parts, not hiring anyone**
plumbing supplies toronto · plumbing parts wholesale

---

# Cities with no search volume · 4

Ajax · Whitby · Pickering · Uxbridge - all under 50 searches a month
across every service, so an ad group there would never get enough
traffic to learn anything.
```

**Why this shape:** every number says what it is, each service shows its own total so the opportunity size is visible without adding up, and the budget section reads like a person explaining it rather than a table. A city-column grid wraps in every editor and dies the moment a service name runs long.

---

## keyword-list.md - the account structure section (top of the file)

**Load-bearing format - do not change the quoting.** `code/build_campaigns.py` reads this file: quoted terms become phrase-match keywords, bare single words become negative keywords.

```markdown
# Your account structure

1 campaign · 9 ad groups · 47 keywords
Everything will be built PAUSED. Nothing spends until you turn it on.

---

# Campaign: Emergency

Roughly $16 to $22 a click. The most urgent searches, and the most expensive.

---

## 1. Emergency plumber

**Keywords** (phrase match)
"emergency plumber" · "24 hour plumber" · "urgent plumber" ·
"after hours plumber" · "same day plumber"

(No city in any keyword. Location is a campaign setting - whole service
area, Presence. City goes in the ad via location insertion.)

**Blocked from this group**
free · diy · how to · jobs · cost · quote

**What the ad should say**
Speed. Answered in 60 seconds, on site within the hour.


---

## 2. Burst pipe

**Keywords** (phrase match)
"burst pipe repair" · "pipe leak emergency" · "water leak repair" ·
"flooded basement plumber"

**Blocked from this group**
insurance · claim · diy · how to

**What the ad should say**
Damage control. Stop the water now, not tomorrow.


---

# Watch these · 2

Grouped together for now, but they may need splitting once real
search data comes in.

**Drain cleaning** - "hydro jetting" might be a commercial job
rather than a household one. Check after 4 weeks of search terms.

---

# Too small to survive alone · 1

**Sump pump** - about 380 views a week. An ad group needs roughly
1,000 a week to produce a clear answer, so fold this into
Emergency plumber rather than starving it.

---

# Keywords blocked across groups

Any word that defines one group is blocked on every group it doesn't define.
Without this, your general "plumber" ad shows to people searching
"emergency plumber" and your structure falls apart.

**On the general plumber group:** emergency · 24 hour · urgent ·
drain · burst · quote · cost

**On the emergency group:** drain · quote · cost · cheap

---

## How to use this

1. Run `/campaign-plan` to build this. Everything lands paused.
2. The quote marks matter - quoted means a keyword, bare means blocked.
3. Between 3 and 8 keywords per group. More than 15 means two groups got merged.
4. Check the watch list after 4 weeks of real search data.
5. Fold the small groups upward if they still can't pull 1,000 views a week.
```

---

## Account audit report

Ranked by dollars, never grouped by category.

```markdown
# Account audit

Last 30 days · $4,180 spent · 22 leads · $190 a lead

---

## The headline

**You are wasting $1,340 a month.**

That's 32 cents of every dollar. Recovered, it's about 7 more
leads a month at your current rate.

---

## The 6 problems, most expensive first

### 1. People looking for jobs, not plumbers

312 searches for things like "plumber jobs toronto" and
"plumbing apprenticeship" clicked your ads.

**Costing you:** $610 a month. Zero leads from any of them.

**The fix:** block those words. 10 minutes.

---

### 2. Your location setting is wrong

It's set to "presence or interest", which shows your ads to
people who merely searched about Toronto - including someone
in another country reading about it.

**Costing you:** $380 a month.

**The fix:** switch to "presence". One click.

---

### 3. Search partners is still ticked

Google pre-ticks this. It shows your ads on other websites,
not Google search.

**Costing you:** $210 a month.

**The fix:** untick it.

---

## Needs your approval before I change anything · 3

- What · Why · The risk
- "plumbing courses" keyword · $140 spent, no leads, 60 days · none - clearly job seekers
- Sump pump ad group · 380 views a week, no data in 6 weeks · it may just need more time

Nothing here has been paused or deleted.

---

## Not enough information yet · 2

**"hydro jetting toronto"** - only 11 clicks so far. Too early to
judge. Worth another look at 40 clicks.

---

## Your next 3 moves

1. Block the job-seeker words - biggest saving, takes 10 minutes
2. Fix the location setting - one click, stops a fifth of your local waste
3. Re-run `/landing-page`'s tracking gate before touching any bids
```

**Why this shape:**
- **Every finding carries a dollar figure.** A business owner can't rank problems without one.
- **"Not enough information yet" is its own section,** so nothing gets killed prematurely.
- **The cause is explained in plain English** - "presence or interest" means nothing until you say it shows ads to someone in another country reading about Toronto.

---

## ad-library.md

```markdown
# Your ad library

42 headlines · 18 descriptions · 4 angles
Next step: `/write-ads` builds these into real ads per group.

---

## Angle: Speed

Your strongest angle - your response time is genuinely better
than everyone else advertising in your area.

- **On Site Within 60 Minutes** (25 characters)
  From your proof file: average response time
- **24/7 Emergency Plumber** (22 characters)
  From your proof file: opening hours

---

## Angle: Trust

- **412 Five-Star Reviews** (21 characters)
  From your proof file: review count
- **Licensed and Insured Since 2009** (31 characters - too long, max is 30)
  From your proof file: licence number
```

---

## How to use this

1. Before writing a user-facing file, find its shape above and match it exactly.
2. New kind of file? Apply the nine rules and use blocks, not dense tables.
3. The rules in `output-format.md` still apply - this file shows how they land.
4. If a file genuinely needs a different shape, say so in chat and ask. Never change a file's shape silently.
5. Every file you write gets a clickable markdown link in your response.

---

## competitor-ads.md - the scout file

**Three top-level sections, in this order, and nothing else.** No appendix, no gaps section, no auction table, no "what this sweep could not see", no separate angles list. Copy this shape exactly.

````
# Competitor ads

22 advertisers · 12 of 98 Transparency Center creatives captured · 8 of 12 landing pages read · desktop + mobile · United States, server-side geo · 1 September 2026
No LSA block on any keyword. Re-scout by 1 October.
**Next: run `/write-ads`.** Gate 2 ranks your line against the market's best three in the same angle, from this file.

---

# The read

**Days running is the grade.** An advertiser who has paid to keep a creative alive for 900 days
has tested it against everything else they tried and it won. Nobody keeps a loser running.
98 dated creatives exist for these 12 advertisers and 54 have run 200+ days, so roughly 86
remain for a second pass.

Never put a number, credential or result in an ad unless it is in `context/proof.md`.

---

## NOISE · counted once, never an angle

"Full Service" · "Award-Winning Marketing Agency" · "Industry-Leading Results" · "Grow Your Business"

---

**The pattern.** The four longest-running ads in the market are the plainest, and none opens on
the advertiser's name. Three of the four open on the reader's problem. Method and risk-reversal
dominate longevity; the newest ads lean on adjectives.

---

# THE ADS · the lines worth stealing

## Method · the longest-running angle in the market

- Shown 5/22 ads · 23% · An AI or diagnosis angle
  - "If your CAC is climbing and your conversions are flat, it's not a bid problem, it's a strategy problem." · Black Propeller · description, over the 90-char limit · 103 chars · 1,421 days
    - [picture](competitor-ads/blackpropeller.png)
    - [desktop](competitor-ads/serp-google-ads-agency-desktop.png)
    - Notes: Diagnoses before it sells. Names two symptoms the reader already has, then reframes the cause. The picture shows four working sitelinks, the most of any ad captured.
  - "Stop wasting money on poor performing campaigns" · Mike Ncube · headline · 46 chars · 902 days
    - [picture](competitor-ads/mikencube.png)
    - Notes: Opens on the loss, not the gain.
- Shown 0/22 ads · 0% · Independence, teaching the client to run it · NOBODY RUNS THIS

---

## Identity · the disqualifier

- Shown 1/22 ads · 5% · Who it is NOT for
  - "For US businesses hiring, not job seekers" · Scout Talented · description · 41 chars · no dates
    - Notes: The only line in the entire sweep that turns anyone away.

---

# THE PAGES · ranked by proof density

The proof stack is the copyable asset and it is what a new advertiser is always short of.
Ranked by how much verifiable proof sits above the fold, and how many kinds.

## 1. SavClicks · savclicks.com · 9 proof elements

[screenshot](competitor-pages/savclicks.png)

- Headline: "Marketing Built For Home Service Companies"
- Proof stack: five stars · 500+ clients · 3,000+ #1 rankings · 15,000+ leads
- Badges: Google · Meta · Webflow
- Guarantee: 100% Satisfaction Guaranteed
- Action: one button above the fold, no form
- Missing: no price, no speed claim
- **Worth copying:** four different KINDS of number, not four of the same.
````

**The rules this shape encodes:**
- **Three levels of bullet, never four.** Count line · quoted entry · then links and one `Notes:` bullet.
- **The quoted line is plain text.** No bold on the quote or the days running - bold is for headings only. Bolding everything means nothing stands out.
- **`Shown N/M ads · X%` on every count line.** Both numbers and the percentage. `7/21` alone makes the reader do arithmetic; `33%` alone hides the sample size.
- **Every count line has entries nested under it**, except a zero, which has nothing to quote and reads `Shown 0/22 ads · 0% · <the thing> · NOBODY RUNS THIS`.
- **One `Notes:` bullet per entry**, holding what the line does mechanically AND anything the picture shows the text cannot. No `Notes:` at all if there is nothing worth saying - never pad it.
- **Split an angle into its own heading when the lines split.** Identity ran as three: naming the buyer, the city or region, the disqualifier. A heading with one member is a finding.
- **Sort entries by days running** inside each count. That is the grade.
- **The notes judge the LINE, never the owner.** "Opens on the loss, not the gain" teaches writing. "You should run this because you have no reviews" is advice about the reader and is banned.

**⛔ Every entry carries its ASSET TYPE and CHARACTER COUNT (Jono, 1 September 2026).**

`"the line" · Advertiser · headline|description|sitelink|callout · N chars · N days`

**Why it is not optional.** `/write-ads` gate 2 ranks my 30-character headline against the market's best three in the same angle. Without the type and the count it ranks a headline against a 103-character description, which is apples to oranges - that line could never BE a headline. Gate 2 compares like with like: headlines against headlines, descriptions against descriptions.

Count the characters of the quoted text and print it. Where a line exceeds the limit for its type, say so on the line - `description, over the 90-char limit · 103 chars` - because that tells me Google is truncating it and the advertiser has not noticed.

**⛔ Days running is per-CREATIVE where the Transparency Center gives it per-creative.** Do not credit a sitelink with the advertiser's longest-running creative and imply that specific line is 1,421 days old. Where only an advertiser-level maximum is known, write it as `1,421 days on the longest-running ad in the market` rather than a bare `1,421 days`, so the claim stays honest.
