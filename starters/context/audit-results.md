# Audit results

<!-- Written by /audit every run. Read by the commands that fix things.
     This is the FINDINGS record - the durable one. Its two siblings:
       audit-report.html  the thing you show, rewritten each run
       audit-report.md    the checklist you tick off, appended, keeps its history
     Structured by the command that consumes each section, not by audit tier,
     so each command greps only its own heading. -->

**Account:** <!-- name (10-digit ID) -->
**Window:** <!-- the date range audited -->
**Run:** <!-- date -->
**Scope:** <!-- all campaigns, or which slice -->

⛔ **Stale after 30 days.** A command reading this must check the run date and say so if it is
older than the account's last 30 days of spend. Findings describe the account as it was.

---

## Trust these numbers?

<!-- The caveat that sits over everything else. If tracking is broken, every number below
     and every number in the other two files is provisional, and each consuming command
     must say so rather than acting confidently on it. -->

**Conversion tracking:** <!-- healthy / partly blind / broken -->
**What is not being counted:** <!-- e.g. every phone call - 3 call actions primary, all recording zero -->
**Hidden search-term share:** <!-- % - above 40% downgrades every negative-keyword conclusion -->
**Account conversion rate used for n_min:** <!-- and whether it is understated because of the above -->

---

## For /landing-page

<!-- Which pages failed and why. Message match, destination, speed, form, CTA. -->

| Ad group | Lands on | Fault | Monthly spend affected |
|---|---|---|---|

**Pages to rebuild, worst first:**

---

## For /write-ads

<!-- Ad groups with one ad, weak CTR, missing assets, weak claims. -->

| Ad group | Ads running | CTR vs account | Missing assets |
|---|---|---|---|

**Ad groups not testing anything:**
**Assets absent account-wide:**

---

## For /keywords

<!-- Structure faults: duplicates, thin groups, converting terms not yet keywords. -->

**Keywords in more than one ad group** (all of them, with the groups each appears in):

**Ad groups under 1,000 impressions a week:**
**Converting search terms that are not keywords anywhere:**

---

## For /search-terms

<!-- The watch list and the negative starter list. Full lists, never counts. -->

**Not yet conclusive - watch these** (spend, clicks, clicks of n_min):

**Negatives ready to paste** (every one, with match type and level):

**Ask first** (ambiguous, with the reason):

**Negatives already blocking keywords you bid on:**

---

## For /campaign-plan

<!-- Structure faults worth not repeating when anything new gets built. -->

---

## For /landing-page (tracking)

<!-- Conversion actions to create, demote or fix. -->

---

## Not for /proposal

⛔ `/proposal` is zero-access by design and **must never read this file.** It is built only from
public data. Anything here came from inside an account and has no place in a lead magnet.

---

## What could not be measured

<!-- One line each, with what would close it. Never omitted, never silently dropped. -->
