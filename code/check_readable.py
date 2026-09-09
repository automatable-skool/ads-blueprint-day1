"""Fail any file a human reads that is formatted as AI slop.

Two things get shipped over and over no matter how many times the rule is
written in prose: markdown tables, and one bullet carrying nine facts strung
together with dots. Both are unreadable on a phone, which is where these files
get read. Prose did not stop it. This does.

    python3 code/check_readable.py context/competitor-ads.md keyword-list.md
    python3 code/check_readable.py --all

Exit 0 = clean. Exit 1 = at least one FAIL.

The shape every deliverable copies is keyword-list.md: a heading per item, a
**Bold label:** for each kind of fact, short bullets under it. Not one line
holding the whole story.
"""
import re
import sys
from pathlib import Path

MAX_FACTS = 4          # `a · b · c · d` is the ceiling. Five is a paragraph pretending to be a line.
MAX_CHARS = 200        # a bullet longer than this is prose that needs its own lines
SKIP = ("references/research/", "code/", "node_modules/", ".claude/commands/")


def check(path):
    fails = []
    lines = path.read_text().splitlines()
    in_fence = False
    for n, raw in enumerate(lines, 1):
        line = raw.strip()
        if line.startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence or not line:
            continue

        # A table. There is one legitimate one in the whole repo and a script owns it.
        if line.startswith("|") and line.endswith("|"):
            fails.append((n, "TABLE", "Tables are unreadable on a phone. One labelled "
                                     "line per thing, or a **Bold label:** section."))
            continue

        # A group's note is ONE line. Wrapping it into a paragraph turns a
        # keyword list into a diary, and the keywords stop being findable.
        if line.startswith("**Notes:**"):
            nxt = lines[n] if n < len(lines) else ""
            if nxt.strip() and not nxt.lstrip().startswith(("#", "-", "*", "|", "---")):
                fails.append((n, "NOTES WRAPS ONTO ANOTHER LINE",
                              "A note is one line. Cut it until it fits, or drop it."))
            elif len(line) > MAX_CHARS + 60:
                fails.append((n, f"{len(line)}-CHAR NOTE",
                              "A note is one line. Keep the decision, drop the reasoning."))
            continue

        if not line.startswith(("- ", "* ")):
            continue

        body = line[2:]

        # `- Proof: five stars · 500+ clients · 3,000+ rankings` - a label with a
        # list behind it. The list goes underneath as sub-bullets, one value a
        # line. Dot-chaining a label's values is the same wall of text as a table.
        # Bold labels shout. Plain ones read. Catch `**Proof:**` and `Proof:` alike.
        # Only `**Label:**` counts. `**A scale number.** Founder credibility...` is
        # emphasis inside a sentence, which is fine.
        bold_label = re.match(r"^\*\*([A-Z][^*]{0,40}?):\*\*\s*(.+)$", body)
        plain = re.sub(r"\*\*", "", body)
        labelled = re.match(r"^([A-Z][^:]{0,40}?):\s*(.+)$", plain)

        if bold_label and bold_label.group(2).strip():
            fails.append((n, "BOLD LABEL",
                          f"`{bold_label.group(1)}` is a bold label. Plain labels only - "
                          f"`- {bold_label.group(1)}: ...`. A page of bold is shouting."))
            continue

        if labelled and len([v for v in labelled.group(2).split("·") if v.strip()]) > 1:
            fails.append((n, "LABEL WITH A CHAINED LIST",
                          f"`{labelled.group(1)}:` carries several values on one line. "
                          f"Put them underneath as sub-bullets, one value per line."))
            continue

        facts = [f for f in body.split("·") if f.strip()]

        if len(facts) > MAX_FACTS:
            fails.append((n, f"{len(facts)} FACTS ON ONE LINE",
                          f"`{facts[0].strip()[:34]}...` carries {len(facts)}. "
                          f"Max is {MAX_FACTS}. Give each kind of fact its own "
                          f"**Bold label:** line, the way keyword-list.md does."))
        elif len(body) > MAX_CHARS:
            fails.append((n, f"{len(body)}-CHAR BULLET",
                          f"`{body[:34]}...` is a paragraph. Break it into labelled "
                          f"lines, or make it a sentence under a heading."))
    return fails


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if "--all" in sys.argv:
        paths = [p for p in Path(".").rglob("*.md")
                 if not any(s in str(p) for s in SKIP)]
    else:
        paths = [Path(a) for a in args]
    if not paths:
        sys.exit("usage: check_readable.py <file.md> [...]  |  --all")

    total = 0
    for p in sorted(paths):
        if not p.exists():
            print(f"FAIL  {p} not found")
            total += 1
            continue
        for n, kind, msg in check(p):
            print(f"FAIL  {p}:{n}  {kind}\n      {msg}")
            total += 1
    if total:
        print(f"\n{total} unreadable line(s). Fix them before reporting the run done.")
        sys.exit(1)
    print(f"PASS  {len(paths)} file(s) readable - no tables, nothing over "
          f"{MAX_FACTS} facts a line.")


if __name__ == "__main__":
    main()
