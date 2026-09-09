# Output format - how every file in this repo must look

**EVERY markdown file. No exceptions.** Keyword maps, audits, plans, findings, queues, registries, drafts - and equally `context/business.md` and `context/proof.md`. There is no such thing as an "internal" file here. A file that is hard to read is a file nobody checks, and unchecked files are how wrong facts reach a live page.

**Re-read every file you wrote before you finish a command.** If it fails the test below, fix it before replying. This is not a review step to skip when the run went long.

---

## ⛔ THE SPLIT - decide this before writing a single line

**If a human needs to read it, it goes in the human file. If only Claude needs it, it goes in `references/`.**

This is the rule that keeps every file short. Most bloat is not bad writing, it is **the wrong material in the file** - reasoning, methodology, caveats, decision history and trade-off analysis living inside a file whose job is to be a checkable list.


**The test:** would the owner ever DO something differently because of this paragraph? No means cut it or move it to `references/`.

Worked example. `context/proof.md` exists so a human can check "am I allowed to say this?" So it holds the claim and its source, and nothing else. It does NOT hold a paragraph weighing whether a 213 area code hurts local trust in Vancouver, or which schema type to use as a result. That is Claude's reasoning, the owner will never act on it, and it triples the length of the one file they most need to scan.

**Two things this kills on sight:**
- **Reasoning written into a data file.** If you found something worth explaining, put the conclusion in the file and the explanation in chat.
- **History nobody needs.** "Re-verified on the 13th, then superseded on the 18th, originally sourced from..." A fact needs its source and its date. It does not need its biography.

---

## The five bans (learned the hard way)

**1. No tables. Period.** Not "where a list works" - EVER, in any file a member opens. A markdown table is a spreadsheet in disguise: pipes and alignment that collapse the moment one cell runs long, unreadable on a phone, unreadable in a plain editor. The owner has banned them repeatedly. The house shape is the **keyword-map block**: a `##` heading per item, bold field labels, values on the same line with `·` separators, and `-` bullet lists for enumerations. Data that genuinely only makes sense as a grid belongs in `code/` for scripts, not in a deliverable. (Tables rendered on WEB PAGES - a pricing table on a service page, a comparison table in a blog post - are different: those are HTML on the site, good for readers and AI extraction, and stay.)

**2. No raw payloads as deliverables.** No YAML blocks, JSON, CSV, ISO timestamps, field names, record IDs or API shapes in any file a human opens. `account_name: "accounts/[ACCOUNT_ID]"` is not information, it is a hole with quotes around it. Machine formats get built at send time and cached under `code/`.

**3. No bare numbers.** `viral hooks (37)` - is that searches, difficulty, position? Label it in words or leave it out.

**4. No walls.** No paragraph of `·`-separated items. No list past 10 items without a `+ 23 more` line. No unbroken block longer than about four lines. Whitespace and headings do the grouping that columns were doing.

**5. No jargon a business owner would not use.** "Update", not `"Call to action"`. "Button · Book", not `cta_action: BOOK`. "Tuesday 18 August", not `2026-08-18T00:00:00-07:00`. If a word only exists because some API needs it, it does not belong in a file.


**6. Bullets are the DEFAULT for any list of things.** One item per line, each on its own bullet. Never a `·`-separated run inside a bold line:

Never: **Funeral · personal injury · oncology · bankruptcy · addiction · divorce**

Always:
- Funeral and cremation
- Personal injury
- Oncology and serious illness

The `·` separator is only for a handful of short attributes on ONE item ("Coupon · FREEAUDIT · Runs · 18 to 25 August"). The moment it is listing separate things, it becomes bullets.

**7. Delete retired things. Never document them.** A section explaining what NOT to use is wasted space and a trap - somebody will read it and use it. If an offer, number, claim or file is retired, remove it. The only exception is one line at the point of confusion when a stale version is still live somewhere public.


**8. No archive folders. Delete instead.** Git holds every previous version of every file, so an `archive/` folder is a second copy of something nobody will read, in a place they have to scroll past. When a file is superseded, overwrite it. When content is retired, remove it.

**The shape to copy:** `references/examples/keyword-map-example.md`. Block per item, bold label, plain sentence underneath, every number spelled out in words. That file is the bar.

---

## Why these rules exist (the research)

Not opinion. Eye-tracking and technical-writing research says the same three things, and every rule above falls out of them.

**People read about a fifth of what is on a page.** They scan. Writing as though a file will be read start to finish is writing for a reader who does not exist.

**They scan in two shapes.** The **F-pattern** - hard across the top, weaker across a second line, then down the left edge. And the **layer-cake pattern** - jumping heading to heading and skipping the prose in between. Two consequences:

- **Headings must carry the meaning on their own.** Someone reading only your headings should get the whole answer. "Before any of these go out" works; "Notes" and "Overview" and "Section 3" are wasted lines.
- **Front-load every line.** The decision goes first, the reasoning second. The left edge and the first few words are the only part guaranteed to be read.

**Chunking beats density.** Miller's research puts short-term memory at five to nine items, which is why the 10-item cap and the `+ 23 more` rule exist. Groups of similar size and scope are faster to scan, understand and remember than one long list.

**Three heading levels maximum, and never skip one.** H2 straight to H4 breaks the document outline and breaks screen readers. If a file needs a fourth level, it is two files.

**Headings name the task, not the topic.** "Posting one by hand" beats "Publishing". People scan for the thing they are trying to do.

**Plain language is understood faster AND trusted more.** Jargon does not read as expertise, it reads as friction. Google's own documentation style guide reports meaningfully higher user satisfaction for docs written to a consistent plain style.

Sources: [Scannability and eye-tracking patterns](https://kweri.co.uk/learn/scannability) · [Chunking for accessible content](https://dkconsultingcolorado.com/2024/04/30/chunking-for-more-accessible-online-content/) · [Google markdown style guide](https://google.github.io/styleguide/docguide/style.html) · [Plain language guidelines](https://digital.gov/guides/plain-language)

---

**Then read [file-examples.md](file-examples.md)** - this file has the rules, that one has the finished pictures. When the two disagree, file-examples.md wins.

The test, every time: **could a non-technical business owner open this file and know what to do within 10 seconds?**

---

## The nine rules

**1. Three lines at the top. Nothing else.** Every file opens with what it is, when it was made, and the one next action. No preamble, no methodology, no "I analysed 1,000 keywords and here's what I found."

```
# Keyword map
Built 2026-08-12 · 47 pages to build · 12 quick wins
Next: run /service-page on row 1.
```

**2. Lead with the decision, not the data.** The first section is always what to do first - top 10, quick wins, next actions. The full list goes below it. Nobody scrolls 300 rows to find the starting point.

**3. The block shape, always the same.** One `##` block per item (`## Service page: Google Ads management`), bold field labels with the value on the same line (`**Status:** written + linked · keyword-map row 2`), `-` bullets with `·` separators for enumerations (`- local seo company · 18,100 a month · Medium (46)`). Same file name = same fields every time, in every repo, on every run. If a run genuinely needs a different field, say so out loud and ask - never silently change the shape of a file the user has learned to read. keyword-map.md is the reference specimen.

**4. Long lists collapse.** Show the top 50 blocks. Everything else goes under `## The rest (N more)` as one-line bullets. A 1,000-item file is a data dump wearing a markdown costume.

**5. No paragraphs inside data files.** No explanation between blocks, no field full of sentences. If context is needed, it goes in ONE `## How to use this` block at the very bottom, as numbered steps.

**6. Numbers look the same everywhere.** Thousands separators (`1,200` not `1200`). Currency named once where it first appears (`$2,400 CAD`). One decimal maximum. Always labelled in words - `18,100 searches a month`, never a bare `18,100`.

**7. One status vocabulary, fixed.** `Not started` · `Building` · `Live`. Nothing else. No emoji, no checkboxes, no percentages.

**8. Never CSV, JSON, TSV, or a raw data blob as a deliverable.** If a tool or API returns raw data, convert it before saving. Raw responses may be cached in `code/` for scripts to read, never handed to the user as the output.

**Nesting:** one level of bullets. If you are reaching for a third level, it is a new section.

---

## The canonical files

### keyword-map.md - THE keyword file (merged 2026-08-13)

**One file, not two.** `keyword-list.md` is retired - clusters, volume, difficulty and build order all live in `keyword-map.md` now. Nobody should cross-reference two documents to make one decision.

Each row is a root keyword + its cluster, prioritised for quick wins, hubs before spokes. See [file-examples.md](file-examples.md) for the exact rendered shape.

### context/competitor-ads.md - the scout file

**Same block shape as `keyword-list.md`: a `---` between every section, and bold labels instead of paragraphs.** The reader is scanning for one decision at a time, so each block opens with what it is (`**The gap:**`, `**The read:**`, `**The count:**`, `**Your proof:**`, `**The catch:**`, `**Why it matters:**`) and the fact follows on the same line.

Rules that keep it scannable:
- **A `---` before every `##`**, not just between top-level sections. Long unbroken runs are where readers stop.
- **Bullets over prose.** A list of claims is a list, never a paragraph with `·` separators buried in it.
- **One idea per bullet**, competitor attributed with ` · ` at the end.
- **Blockers are marked `⛔` in the heading**, so a skim catches them.
- **Screenshots link by relative path** - `[screenshot](context/competitor-pages/name.png)` and `context/competitor-ads/name.png` - so they open from the markdown.
- **The closing section is what the sweep could NOT see.** A blank is never a finding, and every tool failure gets said in those words.

### keyword-list.md, the account structure section - the ad group structure

**Same block shape as `keyword-map.md` in the SEO repo: primary first, then the rest, every line carrying its own numbers.** One keyword per line - never a run-on `·` list, because a reader cannot compare volumes across a paragraph.

**The file splits into Built and Pending, the same way `keyword-map.md` splits into Written and To build.** An owner opening the file sees what already exists in the account before what does not.

```
# Your account structure
1 campaign · 9 ad groups · 47 keywords
Volume and click costs: Google Keyword Planner, Toronto + commuter belt, English, 31 August 2026.
Next: /campaign-plan to build these, everything lands PAUSED.

---

# Built · 2

## Campaign: Emergency

### 1. Emergency plumber · LAUNCH THIS ONE

**Primary keyword**
- emergency plumber · phrase · 2,400 searches a month · $18.40 a click

**The STAG** (1-15 keywords)
- 24 hour plumber · phrase · 880 a month · $16.20
- urgent plumber · phrase · 590 a month · $17.10
- emergency plumber toronto · phrase · 320 a month · $19.80
- plumber open now · phrase · 210 a month · $15.40


---

# Pending · 7

On the bench. Built by `/campaign-plan`, everything PAUSED, in this order - highest intent and highest volume first. A group moves up to Built once it exists in the account.

## 3. Water heater repair

**Primary keyword**
- water heater repair · phrase · 1,900 searches a month · $14.60 a click
...
```

**Built vs Pending is checked against the API, never against this file.** A group is Built when it exists in the account, not when someone ticked it here. Re-verify on every run and correct the file if the account disagrees - the account wins.

**The rules for this block:**
- **The primary keyword is the highest-volume term in the group.** It names the ad group, and it is the term the ad's headline must match. If the highest-volume term is not the one you would name the group after, that is the signal two intents got merged - split it. Everything else is the STAG, listed under it in volume order, biggest first.
- **1 to 15 keywords in the STAG.** Below 1 there is no group; above 15 two intents got merged and it needs splitting.
- **Every keyword carries its match type**, second on the line, right after the keyword itself: `keyword · match type · volume · click cost`. **The default is phrase and it is written out every time** - never left implied by a heading, never omitted because "they are all phrase anyway". The owner is reading a list of things about to go live in an account; match type is the single setting that decides how wide each one casts, so it belongs on the line with the keyword, not in a note above it. Allowed values: `phrase` (the default for everything), `exact`, `broad`. A keyword that is not phrase needs a reason on the line or in the group's note - broad especially, since it is the one that spends fastest.
- **Every keyword carries volume and click cost for the targeted location**, on its own line. A keyword with no number beside it is not research, it is a guess.
- **Volume is pulled for the service area, not the country.** The header names the location, the language and the date the numbers came from.
- **No ad copy, no angles, no positioning.** What the ad says is `/write-ads`, after `/scrape-competitors` has found the gaps. A keyword file that pre-writes the angle has guessed at it before any competitor data exists.
- **Cross-group negatives do NOT repeat inside every group.** They go in ONE table in this section (see below). Repeating them per group reads as "why is it blocking things already" and buries the keywords.

```
## Cross-group negatives

One search must route to one ad group. Each specific group's trigger words are negatives on the generic group. This table is what `/campaign-plan` attaches; nothing here is blocking anything yet.

- emergency · phrase · Plumbing (Generic)
- 24 hour · phrase · Plumbing (Generic)
- water heater · phrase · Plumbing (Generic), Emergency
```

**Load-bearing convention - do not change it.** `code/build_campaigns.py` parses `keyword-list.md`, including the `## Cross-group negatives` table: each negative is one bullet, `- text · match · applied to` - the second field sets the match type (broad/phrase/exact) and the third names the ad groups, or `every <campaign> group` for a whole campaign. Keep the table shape and the `### N. Group name · MARKER` headings exactly as shown - the parser reads the numbering for order and the markers for LAUNCH / WATCH / HOLD.

One ad group per heading. Keywords on one line separated by ` · `. If an ad group needs more than about 8 keywords it is probably two STAGs - flag it rather than letting the line run long.

### Audit and findings files

Findings are ranked by what it costs to ignore them, never grouped by category. One block per finding, worst first:

```
### 1. Your sitemap doesn't exist

One sentence saying the problem in plain English.

**What it costs you:** the consequence, with a number in it.
**The fix:** the command or the action · Impact: High
```

Impact vocabulary is `High` · `Medium` · `Low` - never a severity taxonomy with five levels. Never a compliance-style checklist of things that passed - only what needs doing, plus a one-line count of what was fine.

---

## How to use this

1. Before writing any user-facing file, check whether it is one of the canonical files above. If it is, match the template exactly.
2. If it is a new kind of file, apply the nine rules and keep it to four columns.
3. When a file gets long, collapse it - top 50 visible, the rest below.
4. If you think a file genuinely needs to break one of these rules, say so in chat and ask first. Do not change a file's shape silently.

## Linking files in the response (MANDATORY)

Writing the file is only half the job - the user has to be able to open it.

Every file you create, rewrite or edit gets a **clickable markdown link** in your response, using the path relative to the project root:

- `[keyword-map.md](keyword-map.md)`
- `[emergency-plumber.md](website/content/services/emergency-plumber.md)`
- `[context/proof.md](context/proof.md)`

Rules:
- **Never** name a file in prose without linking it ("I updated your keyword map" - which file? where?)
- **Never** paste a bare absolute path - it isn't clickable and it's unreadable
- **Never** summarise without links - "12 pages created" must be 12 links
- More than three files? Group them under a short **Files** heading at the end of the response
- Link the file even when the change was small - the user decides what's worth opening, not you

The test: can the user get to every single thing you just wrote with one click, without hunting through folders?
