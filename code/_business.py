"""Read the member's business from context/business.md - the one place every script
gets it from. Nothing in code/ names a trade, a city or a brand; this file reads them.

Written 16 September 2026, the day a member could not point judge_terms.py at a gym
because the script had a wedding DJ company written into it.

The starter business.md has fixed headings (What we do · What we DON'T do · Service
area) but members reshape the file, so the section finder is tolerant: it takes the
first heading whose words match and returns '' when none does. Callers must treat an
empty result as "not known" and say so - never as "the business sells nothing".
"""
import os
import re

BUSINESS_MD = "context/business.md"
ENV = ".env"


def read(path=BUSINESS_MD):
    """The whole business file, or '' when it does not exist yet."""
    try:
        with open(path, encoding="utf-8") as f:
            return f.read()
    except OSError:
        return ""


def _strip(md):
    md = re.sub(r"<!--.*?-->", "", md, flags=re.S)      # the starter's editor hints are not facts
    return re.sub(r"\*\*(.*?)\*\*", r"\1", md)            # bold markers


def section(md, *needles):
    """Text under the first heading containing any needle (case-insensitive), up to the
    next heading of the same or a higher level. '' when no heading matches."""
    lines = _strip(md).split("\n")
    for i, line in enumerate(lines):
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if not m:
            continue
        level, title = len(m.group(1)), m.group(2).lower()
        if not any(n.lower() in title for n in needles):
            continue
        out = []
        for nxt in lines[i + 1:]:
            m2 = re.match(r"^(#{1,6})\s+", nxt)
            if m2 and len(m2.group(1)) <= level:
                break
            out.append(nxt)
        return "\n".join(out).strip()
    return ""


def items(text):
    """Bullets, lines and comma-separated fragments -> lowercase phrases, deduped."""
    out, seen = [], set()
    for line in text.split("\n"):
        line = re.sub(r"^\s*#{1,6}\s*", "", line)              # a sub-heading inside the section
        line = re.sub(r"^\s*[-*•]+\s*|^\s*\d+[.)]\s*", "", line)  # bullet or numbering
        line = re.sub(r"\s*·.*$", "", line)                     # trailing "· A · Jono, 1 Sep" tier notes
        line = re.sub(r"\(.*?\)", "", line).strip()             # parentheticals
        if not line or line.endswith(":"):
            continue
        for part in re.split(r",|;| and | & |/| - ", line):
            p = part.strip().strip(".").lower()
            # a phrase, not a sentence: short, no dates, no "the ..." clauses, no money, no links
            if (2 <= len(p) <= 40 and not p.startswith(("http", "$", "the ", "a ", "an ", "not "))
                    and not re.search(r"\b(19|20)\d\d\b|[.!?]", p) and p not in seen):
                seen.add(p)
                out.append(p)
    return out


def _env_value(key, path=ENV):
    v = os.environ.get(key, "")
    if v:
        return v.strip().strip('"').strip("'")
    try:
        with open(path, encoding="utf-8") as f:
            for line in f:
                if line.startswith(key + "="):
                    return line.split("=", 1)[1].split("#")[0].strip().strip('"').strip("'")
    except OSError:
        pass
    return ""


def name(md=None):
    """The business name: BUSINESS_NAME in .env, else the first H1 of business.md
    unless it is the starter's bare "# Business"."""
    n = _env_value("BUSINESS_NAME")
    if n:
        return n
    md = read() if md is None else md
    m = re.search(r"^#\s+(.+)$", _strip(md), re.M)
    if m and m.group(1).strip().lower() not in ("business", "business.md"):
        return m.group(1).strip()
    return ""


def brand_tokens(raw=None):
    """Brand tokens, lowercase. From a comma list when given, else derived from the
    business name: 'Acme Plumbing' -> ['acme plumbing', 'acmeplumbing'];
    'DJing.ca' -> ['djing.ca', 'djingca', 'djing', 'djing ca']. Empty when nothing is known."""
    if raw:
        return [t.strip().lower() for t in raw.split(",") if t.strip()]
    n = name().lower().strip()
    if not n:
        return []
    toks = [n, n.replace(" ", "")]
    if "." in n:                                     # a domain used as a name
        stem = n.split(".")[0]
        toks += [stem, n.replace(".", " ")]
    out, seen = [], set()
    for t in toks:
        if len(t) >= 3 and t not in seen:
            seen.add(t)
            out.append(t)
    return out


def is_brand(term, tokens):
    """Substring on purpose, spaces removed: 'acmeplumbing' and 'acme plumbing' both count."""
    if not tokens:
        return False
    flat = term.lower().replace(" ", "")
    return any(t.replace(" ", "") in flat for t in tokens)


def sells():
    return items(section(read(), "what we do", "what we sell", "services offered", "allowed to sell"))


def not_offered():
    return items(section(read(), "don't do", "dont do", "do not do", "never sell", "not offered", "what we don"))


def service_areas():
    return items(section(read(), "service area", "areas served", "areas we serve", "cities served"))
