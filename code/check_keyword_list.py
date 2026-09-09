"""Fail the run when keyword-list.md breaks a structural rule.

Prose rules in keywords.md get skimmed. This does not. /keywords must run it
before it reports done, and a FAIL means the file is not finished.

    python3 code/check_keyword_list.py [keyword-list.md]

Exit 0 = clean. Exit 1 = at least one FAIL.
"""
import re
import sys
from pathlib import Path

MATCH_TYPES = {"phrase", "exact", "broad"}
# A claim that Google agrees these terms are the same intent. Worthless without
# the location and date it was pulled for - an unlocated pull returns whatever
# country the exit IP looks like and reads exactly like a real result.
OVERLAP = re.compile(r"top\s*10|share[sd]?\s+\d+\s+of|same\s+top", re.I)
DATE = re.compile(r"\b(19|20)\d{2}\b|\b\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)", re.I)


# Only these headings introduce real keywords. Anything else in a group -
# negatives, notes, "why these belong together" - is prose and gets skipped.
KW_HEADING = re.compile(r"^\*\*(primary keyword|the rest of the group|the stag|"
                        r"already in the account|add these)", re.I)
OTHER_HEADING = re.compile(r"^\*\*|^#")

# Words that describe the SELLER, not the service. Stripping them leaves the
# thing actually being bought, which is what decides whether two keywords are
# one group.
NOISE = {"agency", "agencies", "company", "companies", "firm", "firms", "service",
         "services", "consultant", "consultants", "specialist", "specialists",
         "management", "expert", "experts", "near", "me", "best", "top", "the",
         "for", "a", "in", "of", "optimization", "optimisation", "seo",
         "search", "engine"}


def keyword_lines(block):
    """Bullet lines under a keyword heading. Skips negatives and prose bullets."""
    live = False
    for line in block:
        if KW_HEADING.match(line):
            live = True
            continue
        if OTHER_HEADING.match(line):
            live = False
            continue
        if live and line.startswith("- ") and "·" in line:
            yield line


def core_service(keyword):
    """What is actually being bought, with the seller words stripped.

    "seo agency" and "seo company" both reduce to "seo" - one service.
    "local seo services" reduces to "local seo" - a different service, because
    local SEO is Google Business Profile and the map pack, not organic SEO.
    """
    words = [w for w in re.sub(r"[^a-z0-9 ]", " ", keyword.lower()).split()
             if w and w not in NOISE]
    return " ".join(words)


def parse(text):
    groups, current, campaigns = [], None, []
    for raw in text.splitlines():
        line = raw.rstrip()
        if re.match(r"^#\s+Campaign:|^##\s+Campaign:", line, re.I):
            campaigns.append(line)
        m = re.match(r"^###\s+(\d+)\.\s+(.+)$", line)
        if m:
            current = {"num": m.group(1), "name": m.group(2).split("·")[0].strip(), "lines": []}
            groups.append(current)
            continue
        if current is not None:
            current["lines"].append(line)
    return groups, campaigns


def main():
    path = Path(sys.argv[1] if len(sys.argv) > 1 else "keyword-list.md")
    if not path.exists():
        sys.exit(f"FAIL  {path} not found")
    text = path.read_text()
    groups, campaigns = parse(text)
    fails, warns = [], []

    if len(campaigns) > 1:
        fails.append(f"{len(campaigns)} campaigns. The launch build is ONE campaign - "
                     f"every service is an ad group inside it. See references/campaigns.md.")

    if not groups:
        fails.append("No `### N. Group name` headings found - nothing to check.")

    services = {}
    for g in groups:
        label = f"group {g['num']} ({g['name']})"
        kws = list(keyword_lines(g["lines"]))

        # 1. Match type on every keyword, phrase by default, always written out.
        for line in kws:
            parts = [p.strip() for p in line[2:].split("·")]
            if len(parts) < 2 or parts[1].lower() not in MATCH_TYPES:
                fails.append(f"{label}: no match type on `{parts[0][:40]}` - "
                             f"every keyword needs `keyword · phrase · volume · cost`")
            if not any(re.search(r"\d", p) for p in parts[2:]):
                fails.append(f"{label}: no volume on `{parts[0][:40]}`")

        # 3. One group = one service. This is the check that catches two different
        #    services merged into one ad group - the failure that produced an
        #    "SEO agency" group quietly holding the local SEO terms too.
        cores = {}
        for line in kws:
            kw = line[2:].split("·")[0].strip().strip("*")
            c = core_service(kw)
            if c:
                cores.setdefault(c, []).append(kw)
        # Two shapes, one dangerous.
        #
        #   SUPERSET - one core is another plus a qualifier: "seo" vs "local seo",
        #   "plumber" vs "emergency plumber". The qualifier NARROWS to a different
        #   service rather than varying the same one. High precision, so it fails.
        #
        #   DISJOINT - "ppc" vs "sem" vs "paid search". Usually synonyms for one
        #   job. Warned, never blocked.
        #
        # An earlier version failed every multi-stem group and made the file carry
        # a justification line to get past it. That put checker scaffolding into a
        # document a human has to read, which is worse than the bug. The file stays
        # clean; the warning goes to whoever is running it.
        # THE MODIFIER TEST - references/keyword-redundancy.md section 3 Test 4,
        # and stag.md section 4 List B. Not a shape heuristic: a named list of
        # modifiers that change WHO is searching, so the ad has to change too.
        #
        # Four earlier versions of this check tried to infer the split from token
        # shape and each one traded a false positive for a false negative. There
        # is no token rule that separates "roofers vs plumbers" from "ppc vs
        # google ads" - they are the identical shape. The repo already had the
        # answer as a sourced list; this now uses it.
        BUCKETS = {
            "comparison": {"best", "top", "rated", "leading", "reviews"},
            "price-led": {"cheap", "affordable", "budget", "low", "inexpensive"},
            "wants a number": {"cost", "price", "pricing", "quote", "rates", "fees"},
            "urgent": {"emergency", "urgent", "24", "hour", "now", "same", "day"},
            "ready to buy": {"book", "hire", "schedule"},
        }
        present = {}
        for line in kws:
            kw = line[2:].split("·")[0].strip().lower()
            words = set(re.sub(r"[^a-z0-9 ]", " ", kw).split())
            found = next((n for n, ws in BUCKETS.items() if words & ws), "bare service")
            present.setdefault(found, []).append(kw)
        if len(present) > 1:
            named = " | ".join(f"{n}: {v[0]}" for n, v in present.items())
            fails.append(
                f"{label}: {len(present)} different searchers in one group - {named}. "
                f"A modifier that changes WHO is searching needs its own ad, so its "
                f"own group (keyword-redundancy.md Test 4). `cost`/`price`/`quote` "
                f"merge with each other and nothing else.")

        # Everything else only warns. Two keywords can be the same job in one trade
        # and different jobs in another - "local plumber" is a plumber, "local seo"
        # is not seo - and no word list settles that. A human does.
        if len(cores) > 1 and len(present) == 1:
            warns.append(f"{label}: {len(cores)} stems ({' | '.join(sorted(cores))}). "
                         f"Same ad for all? If not, split.")

        # Volume order is the whole reason the list is scannable: the owner reads
        # top down and stops when the numbers stop being worth it.
        def vol_of(l):
            m = re.search(r"·\s*([\d,]+)\s*(?:searches\s*)?a month", l)
            return int(m.group(1).replace(",", "")) if m else -1

        block, seen_rest = [], False
        for l in g["lines"]:
            if l.startswith("**The rest of the group**"):
                seen_rest = True
                continue
            if seen_rest and l.startswith("- "):
                block.append(l)
            elif seen_rest and l.strip() and not l.startswith("- "):
                break
        vols = [vol_of(l) for l in block if vol_of(l) >= 0]
        if vols != sorted(vols, reverse=True):
            fails.append(f"{label}: the group is not in volume order, biggest first.")
        if vols and kws:
            pv = vol_of(kws[0])
            if pv >= 0 and pv < max(vols):
                fails.append(f"{label}: the primary is not the biggest term in the group. "
                             f"Either promote the biggest one, or two intents got merged.")

        # A keyword is in the group or it is not. Naming one you agree belongs and
        # then deferring it leaves the group wrong and admits it in writing.
        for line in g["lines"]:
            if re.search(r"missing,?\s*add|add on the next|to add later|"
                         r"not included yet|consider adding", line, re.I):
                fails.append(f"{label}: `{line.strip()[:55]}` defers a keyword. "
                             f"Put it in the list now, in volume order - it takes the "
                             f"primary slot if it is the biggest - or leave it out.")

        # 5. Any SERP-overlap claim must carry the location and date it was pulled for.
        for line in g["lines"]:
            if OVERLAP.search(line) and not DATE.search(line):
                fails.append(f"{label}: overlap claim with no date or location - "
                             f"`{line.strip()[:60]}`. An unlocated pull returns the wrong "
                             f"country and reads exactly like a real result.")

    for w in warns:
        print(f"WARN  {w}")
    for f in fails:
        print(f"FAIL  {f}")
    if fails:
        print(f"\n{len(fails)} failure(s). keyword-list.md is not finished.")
        sys.exit(1)
    print(f"PASS  {len(groups)} groups, 1 campaign, every keyword has a match "
          f"type and a volume.")


if __name__ == "__main__":
    main()
