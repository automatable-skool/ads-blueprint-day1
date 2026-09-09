# Keyword redundancy - which keywords actually earn their place in a group
Researched 31 August 2026 across 30 sources · every claim graded (a) Google documentation · (b) two or more independent practitioners, or one with a real dataset · (c) single source or a judgment this repo has made
Next: apply the four tests in section 3 to every STAG before writing `keyword-list.md`. Companion to `stag.md`, which decides what goes in a GROUP; this file decides what goes in the LIST.

**The question this file answers.** A group came back looking like this:

```
seo agency          27,100 · $13.30
seo company         22,200 · $13.86
seo agency near me  22,200 · $13.86
seo firm            22,200 · $13.86
seo company near me 14,800 · $16.17
best seo company     6,600 · $18.25
```

Is that a Single Theme Ad Group, or the same keyword six times? The answer is **five of the six are one keyword as far as the auction is concerned, one belongs in a different group, and the identical numbers are a reporting artefact that proves nothing either way.** All three parts have sources.

**They still all go in the ad group.** The fix is not deleting keywords, it is not presenting six variants as six decisions - see Test 2.

---

## 1. Google's own answer: duplicates do not compete, and only one can fire

This is the load-bearing fact and it is not a practitioner opinion.

> "If multiple keywords, targeting the same domain, are eligible to match the same search term, **they don't compete with each other in the auction**." · **(a)** Google Ads Help, "About similar keywords in a Google Ads account"

> "**Only one of those keywords can trigger an ad for the term.**" · **(a)** same page

**So adding a near-duplicate buys you nothing IN THE AUCTION.** It does not raise your chance of showing, it does not stack bids, and it does not widen reach. One keyword fires. That is an argument about reach, not an instruction to delete them - see Test 2 for why they still belong in the ad group.

**The selection order when several could match (a):**
1. An **exact match keyword identical to the search term** wins first.
2. Then a **phrase or broad match keyword identical to the search term**.
3. Then **relevance** - Google reads the meaning of the search term against the keywords AND the landing pages in each ad group, and only the most relevant ad groups are considered.
4. Only then **Ad Rank** breaks the tie.

Two consequences worth stating plainly:
- A keyword that is never identical to a real search, and is never the most relevant in its group, will effectively never be the one that fires. It exists to be counted, not to be used.
- Relevance is scored per ad group, landing pages included. A DIFFERENT intent in the group dilutes it; a close variant of the primary does not. (a) · **(b)** Search Engine Land

---

## 2. Close variants already cover the synonyms you were about to add

Google matches far more loosely than the words suggest, and it has for years.

**Phrase match already includes, per Google (a):** misspellings, singular and plural forms, stems (floor / flooring), abbreviations, accents, reordered words where meaning is unchanged, added or removed function words, **implied words**, and - the big one - **synonyms, paraphrases, and terms with the same search intent.**

Google's own examples (a): the keyword `bathing suits` serves searches for **swimming suits**. The keyword `images royalty free` serves **free copyright images**.

**Applied to the group above:** "seo agency", "seo company" and "seo firm" are synonyms with one search intent. Any one of them on phrase match is already eligible for all three searches, so the third one adds no reach. They still go in the ad group (Test 2) - what they do not get is three separate rows in the file implying three separate decisions. · **(a)** by the close-variant definition, **(c)** for this specific application

**Where the practitioner literature lands, consistently (b):** stop adding plural, synonym and word-order variants as separate keywords - Google groups them by intent automatically, and maintaining the variants is work with no return. Multiple independent 2026 match-type guides say this in almost identical words (Store Growers, Growth Minded, Stackmatix, NB Marketing).

---

## 3. The four tests - run these before a keyword goes in the list

### Test 1 - the same-ad test (from `stag.md`, unchanged)
Would you write the identical ad for both searches? Same ad, same group. Different ad, different group. This decides the GROUP.

### Test 2 - the close-variant test (new)
**Would one of these keywords already match the other's search on phrase match?** If yes, they are one keyword *for reach*. That does not mean delete them from the account - it means stop presenting them as separate decisions.

**Do they go in the ad group? YES.** Three reasons, and none of them is reach:
1. **An identical-to-query keyword is prioritised over a close-variant match** (a). If someone searches "seo firm" and you only own "seo agency", you match by close variant. Own "seo firm" and it is identical-to-query, which sits higher in Google's selection order - so you keep control of which ad group serves.
2. **Per-term reporting.** You find out "seo firm" converts and "seo agency" does not. Drop the variant and you lose that forever, because the search terms report is throttled by privacy thresholds.
3. **They cost nothing.** Google's own wording: duplicates "don't compete with each other in the auction". An extra close variant does not raise your bid or your spend.

**What changes is how the FILE presents them.** Six rows with six volume figures implies six decisions. There is one decision - this group - plus variants of it. So the primary gets its own line with its numbers, and the close variants go on one line beneath it, named but not itemised.

**The real limit:** this applies to close variants of the primary, not to loose synonyms that drift from the theme. Relevance is scored across all the keywords AND landing pages in the group, so padding with terms that are merely related dilutes what the group is about. Variant of the primary: in. Different intent: its own group. Vaguely related: out.

Practical rule of thumb, all covered by close variants and therefore all redundant (a):
- singular vs plural: `plumber` / `plumbers`
- word order: `plumber toronto` / `toronto plumber`
- function words: `plumber in toronto` / `plumber toronto`
- stems: `plumbing repair` / `plumb repairs`
- **straight synonyms of the head noun**: `agency` / `company` / `firm`, `service` / `services`

### Test 3 - the "near me" test · SUPERSEDED 1 September 2026

**Add `X near me` always. Do not test it against the head term's volume.** (Jono, 1 September 2026.)

This file used to say keep it only when the Planner reported a meaningfully different figure. That was wrong, and it contradicted Test 2 three paragraphs above it. Weigh the two sides:

**Cost of adding it when Google would have merged them anyway: zero.** Google's own wording is that duplicates *"don't compete with each other in the auction"* (a). It does not raise the bid, does not raise the spend, and does not dilute anything a close variant was not already covering.

**Cost of leaving it out when Google does NOT merge them: real.** You lose the identical-to-query preference (a), so a different ad group can win the search, and you lose per-term reporting on a phrase people genuinely type - permanently, because the search terms report is throttled by privacy thresholds.

A free bet against a real loss is not a decision worth making. Add it.

And the volume figure cannot settle it anyway: section 4 of this file says identical numbers are a bucketing artefact that prove nothing about whether Google treats two terms as one query. Test 3 was asking a rounded number to answer a question it cannot answer.

### Test 4 - the modifier test (the one that splits groups)
A modifier that changes **who is searching** creates a new STAG, however similar the words look. `stag.md` section 4 already lists these; this file makes them a hard check:

**`best` / `top` / `rated`** · a comparison shopper, not sold on you yet
- their ad leads with ratings and review counts

**`cheap` / `affordable` / `budget`** · price-led
- their ad leads with upfront pricing, no hidden fees

**`cost` / `price` / `quote`** · wants a number now. These three merge with each other and nothing else
- their ad leads with a free quote in 60 seconds

**`emergency` / `24 hour` / `open now`** · has a problem right now
- their ad leads with speed and who answers the phone

**`book` / `hire` / `schedule`** · ready to buy
- their ad leads with availability

**A bare service term** · still looking for a provider at all
- their ad leads with who you are and why you

**`near me` is NOT on this list** (Jono, 1 September 2026). It reads like a modifier but it does not change who is searching - someone typing "seo agency near me" wants the same thing as someone typing "seo agency", and takes the same ad. It goes in the group. See Test 3.

**"best seo company" is a comparison shopper, not a service searcher.** Its own group, its own ad. Google's own Quality Score guidance is the authority for splitting on "keywords that can't be easily addressed by the same ad" · **(a)**, and the modifier-as-intent-layer framing is agreed across the PPC literature · **(b)** WordStream commercial intent, PPC Hero purchase-intent grouping, Channable.

---

## 4. Why identical volume numbers prove less than they look like they prove

It is tempting to read three keywords all reporting `22,200 · $13.86` as proof Google treats them as one query. **Do not make that argument - it is not what the number means.**

**Keyword Planner reports into roughly 60 predetermined volume buckets, and rounds into them.** · **(b)** Authoritas, 60 million keywords across multiple languages and countries, extracted from Google's API. Bucket examples from that study: 0 · 10 · 1,000 · 8,100 · 1,000,000 · 7,480,000. Bucket width scales with volume: adjacent mid-to-high buckets sit about **22% apart going up and 18% going down**, so any two keywords whose true volumes fall inside one band report the identical figure.

Google also **aggregates similar keywords into one reported figure** in the Planner · **(b)** Wordtracker, seoClarity, SISTRIX, Search Engine Journal all describe this behaviour. The standing example: `HDMI` and `High-Definition Multimedia Interface` report the same volume despite obviously different real demand.

**So what identical numbers actually tell you:**
- ✅ You **cannot separate these keywords on volume.** The tool is not resolving them, so volume is useless as a tiebreak here.
- ❌ They do **not** prove Google treats the terms as one query. Bucketing alone explains it.
- The redundancy conclusion still holds - but it holds because of **close variants (section 2)**, which is documented, not because of the matching numbers.

Same for the identical `$13.86`: top-of-page bid estimates are modelled and rounded too. Treat both columns as **order of magnitude**, and say so in the file.

---

## 5. What this does NOT mean - the case for keeping a keyword

Deduplication has a real limit, and Google's own recommendation overshoots it.

**Google's "Remove redundant keywords" recommendation is not a friend.** Since 19 January 2023 it spans match types and **prefers to keep the broader one**, deleting your phrase and exact keywords in favour of broad · **(b)** Search Engine Land, Optmyzr, Jordan Digital, Teach Traffic. If the keyword it deletes had the better Quality Score, you have swapped a cheaper, better-positioned keyword for a worse one. **Turn the auto-apply off.** · **(b)**

**Across ad groups, a "redundant" keyword is a control, not waste.** Adalysis documented one account where a single search term was being served by **12 different ad groups** with wildly different performance; adding the term as an explicit keyword in the right group and negating it elsewhere **dropped CPA and raised conversions.** · **(b)** Adalysis

**The distinction this file draws:**
- Inside one ad group: a near-duplicate costs nothing and earns per-term reporting, so it stays. Diluting the group is Test 4's job to prevent, not a redundancy question.
- Across ad groups: an explicit keyword is how you decide WHICH group owns a search. Keep it, and add the cross-group negative that enforces it. `stag.md` step 7, unchanged.

---

## 6. How the group at the top should have been written

```
### 1. SEO agency · LAUNCH THIS ONE

**Primary keyword**
- seo agency · phrase · 27,100 searches a month · $13.30 a click

**The rest of the group**
- seo company · phrase · 22,200 a month · $13.86
- seo firm · phrase · 22,200 a month · $13.86
- seo agency near me · phrase · 22,200 a month · $13.86
- seo company near me · phrase · 14,800 a month · $16.17
```

Every keyword on its own line, with its match type and its numbers. The identical 22,200 figures are a bucketing artefact (section 4) and are not a reason to hide a keyword or to merge three into an unnumbered line - they are simply a number you cannot use as a tiebreak. Say that once at the top of the file and move on.

`best seo company` is the only one that leaves, and it leaves because of Test 4, not because of redundancy:

```
### 2. Best SEO company · comparison shoppers

**Primary keyword**
- best seo company · phrase · 6,600 searches a month · $18.25 a click

**Notes:** this searcher is comparing providers, not looking for one - the ad leads with ratings and a review count. Cut entirely if there is no third-party review profile to cite, because the ad cannot be written honestly.
```

---

## 7. The rules

1. Only one keyword can fire for a search term, and duplicates do not compete. (a)
2. Phrase match already covers plurals, word order, function words, stems, implied words, synonyms and same-intent paraphrases. Do not list them separately. (a)
3. The primary keyword is the highest-volume term in the group. The rest are listed under it in volume order. (c)
4. Close variants of the primary DO go in the ad group - they cost nothing, they win the identical-to-query preference, and they earn per-term reporting. **Every one gets its own line with its match type, its volume and its click cost, exactly like every other keyword** (Jono, 1 September 2026). This reverses the old rule that put them on one shared unnumbered line: every keyword in this file is going into a live account and will spend money, so every keyword is shown the same way. If a term is not worth looking its numbers up, it is not worth bidding on and it does not belong in the file. (a)/(c)
5. `near me` always goes in. Never tested against the head term's volume - adding it costs nothing, leaving it out costs the identical-to-query preference and its per-term reporting. See Test 3. (c)
6. `best` · `top` · `rated` · `cheap` · `affordable` · `budget` split into their own STAG, always. `cost` · `price` · `quote` merge with each other and no one else. (a)/(b)
7. Identical volume figures are a bucketing artefact and are never cited as evidence that two terms are one query. Cite close variants instead. (b)
8. Volume and bid columns are order of magnitude. The file says so once, at the top. (b)
9. Inside a group, cut the redundant keyword. Across groups, keep it and add the cross-group negative. (a)/(b)
10. Never enable Google's auto-apply for "Remove redundant keywords" - it keeps the broader match type and can delete your better-Quality-Score keyword. (b)

---

## Sources

**Google documentation (a):** Keyword close variants (answer 9342105) · About similar keywords in a Google Ads account (answer 2756257) · How matching works (answer 14997606) · About keyword matching options (answer 7478529) · Search Ads 360 keyword matching options (answer 9322511) · Quality Score guidance on splitting ad groups.

**Datasets and multi-source (b):** Authoritas, 60 million keyword search-volume bucket analysis · Search Engine Land on keyword selection preferences (2019 and 2021) and on the January 2023 redundant-keyword recommendation change · Adalysis, "Should you remove redundant keywords?" (the 12-ad-group case) · Optmyzr on automatic keyword deduplication · Search Engine Journal keyword prioritization guide and search-volume guide · WordStream keyword prioritization and commercial-intent keywords · Wordtracker on Planner grouping · seoClarity and SISTRIX on Planner volume differences · Store Growers, Growth Minded, Stackmatix and NB Marketing 2026 match-type guides.

**Single source or practitioner convention (c):** Cypress North match-type best practices · Key Principles, Neil Patel, Papaya Search and Browser Media on close variants · Clicksinmind on keywords per ad group · PPC Mastery on consolidation · Groas on 2026 practices that no longer work · Tripledart on campaign structure · PPC Hero on purchase-intent grouping · Channable on PPC keyword research · Jordan Digital and Teach Traffic on the redundant-keyword change.
