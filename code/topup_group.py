"""Find real keywords to fill a thin ad group, from the pull you already paid for.

A STAG under 3 keywords cannot gather enough impressions to prove anything, so
`/keywords` must top it up, merge it, or cut it. "Top it up from the Planner's
related terms" was an instruction with no mechanism behind it, which is the same
as no instruction. This is the mechanism.

    python3 code/topup_group.py --all
    python3 code/topup_group.py "google ads audit" --limit 8

--all reads every group in keyword-list.md and seeds from EVERY keyword in the
group, not just the primary (Jono, 1 September 2026). A group's synonyms pull
back different neighbours - "ppc audit" and "google ads audit" are the same job
and do not return the same list - so seeding off the primary alone leaves most
of the pull unread.

Costs nothing: this searches the candidate file you already paid for. If it comes
up empty the pull itself is exhausted, and a fresh one is still cheap - the
Planner API takes 20 seed keywords per request, so a whole group is ONE request
and the whole account is about three:

    python3 code/pull_keywords.py --city "<area>" --seeds "kw1,kw2,kw3,..."
"""
import argparse
import csv
import re
from pathlib import Path

CANDIDATES = ["code/cache/candidates-fresh.csv", "code/cache/candidates.csv"]
METRICS = ["code/cache/stem-metrics-fresh.csv", "code/cache/stem-metrics.csv"]

# Words that mean the searcher wants a tool, a job or a lesson - never a buyer.
JUNK = {"tool", "tools", "software", "checker", "analyzer", "analyser", "generator",
        "plugin", "extension", "template", "course", "certification", "training",
        "jobs", "job", "salary", "free", "tutorial", "example", "examples", "pdf",
        "reddit", "youtube", "vs", "alternative", "alternatives", "best", "top",
        "reviews", "review", "cheap", "affordable", "semrush", "ahrefs", "moz",
        "ubersuggest", "yoast", "surfer", "screaming"}

# Filler that changes a keyword's wording but not the keyword.
STOP = {"and", "the", "a", "an", "of", "for", "in", "to", "your", "my", "best"}


def first(paths):
    for p in paths:
        if Path(p).exists():
            return Path(p)
    return None


def load(path, vol="v"):
    if not path:
        return {}
    out = {}
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            kw = (row.get("keyword") or "").strip().lower()
            if kw:
                out[kw] = row
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("stem", nargs="?", help="a keyword to find neighbours for")
    ap.add_argument("--all", action="store_true",
                    help="every group in the file, seeded from every keyword in it")
    ap.add_argument("--file", default="keyword-list.md")
    ap.add_argument("--limit", type=int, default=10)
    args = ap.parse_args()

    cands = load(first(CANDIDATES))
    if not cands:
        raise SystemExit("No candidate pull found. Run /keywords volume first.")
    mets = load(first(METRICS))

    text = Path(args.file).read_text() if Path(args.file).exists() else ""
    used = {l[2:].split("·")[0].strip().lower()
            for l in text.splitlines() if l.startswith("- ") and "·" in l}

    def sig(kw):
        """A keyword's identity ignoring word order and filler."""
        return frozenset(w for w in re.sub(r"[^a-z0-9 ]", " ", kw.lower()).split()
                         if w and w not in STOP)

    def metrics(kw):
        r = cands.get(kw, {})
        return (r.get("v"), r.get("cpc"))

    def neighbours(seeds):
        """Candidates containing all the words of ANY seed - genuinely new ones only.

        Google reports a whole cluster of close variants at one figure, so a
        substring search returns the SAME keyword reworded: "services seo",
        "seo services seo" and "and seo services" all come back at 74,000 and
        $61.23 alongside "seo services". Adding those to a group adds nothing -
        phrase match already catches them - and pushes the group past 15 for no
        reason. Two filters kill them:
          - same word set once order and filler are ignored
          - identical volume AND identical click cost to a seed, which is
            Google telling you it is the same term
        """
        seed_sigs = {sig(x) for x in seeds}
        seed_metrics = {metrics(x) for x in seeds if metrics(x) != (None, None)}
        out = {}
        for seed in seeds:
            words = [w for w in re.sub(r"[^a-z0-9 ]", " ", seed.lower()).split() if w]
            if not words:
                continue
            for kw, row in cands.items():
                if kw in used or kw in out or not all(w in kw for w in words):
                    continue
                if set(kw.split()) & JUNK:
                    continue
                if sig(kw) in seed_sigs:
                    continue                       # the same words, reshuffled
                try:
                    out[kw] = int(float(row.get("v") or 0))
                except ValueError:
                    pass

        # NOT deduped by volume+cost. "seo firm" and "seo agency" both read
        # 22,200 at $13.86 because Google prices them as one cluster, but they
        # are different words for the same intent and BOTH belong in the group
        # (Jono, 1 September 2026). Dropping one because its metrics match would
        # throw away exactly what this is for: new avenues into the same intent.
        #
        # Only the word-set filter above runs, which kills grammatical junk -
        # "services seo", "and seo services" - while keeping real synonyms.
        return sorted(((v, k) for k, v in out.items()), reverse=True)

    def show(hits, limit):
        for vol, kw in hits[:limit]:
            m = mets.get(kw)
            if m and m.get("cpc_low") and float(m["cpc_low"]) > 0:
                cost = f"${float(m['cpc_low']):.2f} to ${float(m['cpc_high']):.2f}"
            else:
                c = cands[kw].get("cpc")
                cost = f"${float(c):.2f}" if c and float(c) > 0 else "no bid data yet"
            print(f"- {kw} · phrase · {vol:,} a month · {cost}")

    if args.all:
        groups, current = [], None
        for line in text.splitlines():
            m = re.match(r"^###\s+\d+\.\s+(.+)$", line)
            if m:
                current = {"name": m.group(1).split("·")[0].strip(), "kws": []}
                groups.append(current)
            elif current is not None and line.startswith("- ") and "·" in line:
                if any(c.isdigit() for c in line):
                    current["kws"].append(line[2:].split("·")[0].strip().lower())
        if not groups:
            raise SystemExit(f"No groups found in {args.file}.")
        for g in groups:
            hits = neighbours(g["kws"])
            print(f"\n## {g['name']} · {len(g['kws'])} keywords now · "
                  f"{len(hits)} neighbour(s) found")
            if hits:
                show(hits, args.limit)
            else:
                print("  Pull exhausted. Merge this group or cut it.")
        print("\nOnly keep the ones you would write the SAME ad for. "
              "Volume ranks them; it does not judge intent.")
        return

    if not args.stem:
        raise SystemExit("Give a keyword, or --all for every group.")
    hits = neighbours([args.stem])
    if not hits:
        print(f"Nothing left in the pull for \"{args.stem}\". Merge the group or cut it.")
        return
    print(f"{len(hits)} candidate(s) for \"{args.stem}\", biggest first. "
          f"Only keep the ones you would write the SAME ad for:\n")
    show(hits, args.limit)


if __name__ == "__main__":
    main()
