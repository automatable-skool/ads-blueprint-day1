#!/usr/bin/env python3
"""Mine past Claude Code session transcripts for proof candidates.

Reads ~/.claude/projects/*/*.jsonl, keeps ONLY what the human typed (never
assistant output, never tool results), and pulls sentences that contain a
number, a result claim or a timeline. Everything it finds is a CANDIDATE and
stays UNCONFIRMED until the owner confirms it.

Plain standard library. No dependencies.

  python3 mine_transcripts.py --out candidates.md
  python3 mine_transcripts.py --limit 25
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

DEFAULT_ROOT = Path.home() / ".claude" / "projects"

# ---------------------------------------------------------------------------
# Privacy - these lines are dropped entirely, never written to the output file
# ---------------------------------------------------------------------------

CREDENTIAL_PATTERNS = [
    re.compile(p, re.I)
    for p in (
        r"\b(api[_ -]?key|secret|password|passwd|token|bearer|auth[_ -]?header)\b",
        r"\bsk-[A-Za-z0-9_\-]{12,}",
        r"\b(pat|ghp|gho|github_pat)_[A-Za-z0-9_\-]{10,}",
        r"\bAKIA[0-9A-Z]{12,}",
        r"\bkey[A-Za-z0-9]{14,}\b",          # Airtable record/api style ids
        r"-----BEGIN [A-Z ]*PRIVATE KEY",
        r"\b[A-Za-z0-9_\-]{32,}\.[A-Za-z0-9_\-]{16,}\.[A-Za-z0-9_\-]{16,}",  # jwt
        r"\b[A-Z_]{4,}=[^\s]{12,}",           # ENV_VAR=longvalue
    )
]

# Third-party personal data - not the owner's own business facts
THIRD_PARTY_PATTERNS = [
    re.compile(p, re.I)
    for p in (
        r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}",     # email address
        r"\b(?:\+?1[ .\-]?)?\(?\d{3}\)?[ .\-]\d{3}[ .\-]\d{4}\b",  # phone number
        r"\b\d{1,5}\s+[A-Z][a-z]+\s+(street|st|avenue|ave|road|rd|drive|dr|blvd)\b",
        # A cited link means the number belongs to somebody else's business or
        # a published study, not to the owner. Not his proof to claim.
        r"https?://",
        r"\(self-reported|\bcompetitor\b|\bcase study by\b",
    )
]

# Noise that is machine text, not something a person stated
NOISE_PATTERNS = [
    re.compile(p, re.I)
    for p in (
        r"^\s*<(ide_selection|system-reminder|command-name|local-command|bash-)",
        r"caveat: the messages below",
        r"^\s*[\{\[]",                      # pasted json
        r"</?(div|span|script|html|body)\b",
        r"^\s*(https?://\S+\s*)+$",         # a bare url dump
        r"\b(localhost:\d+|node_modules|\.tsx?\b|\.jsonl?\b|npm run|git \w+)\b",
        r"^\s*\d+\s*\|",                    # numbered code paste
        r"(error|traceback|exception|stack trace|warning:)\b",
        r"lighthouse|status code|http/\d",
        r"\*\*",                            # markdown pasted back from a report
        r"·",                               # our own report formatting, pasted back
        r"\b(searches? (a|per) month|search volume|cpc|keyword difficulty|kd\b)",
        r"^\s*(cut|keep|drop|remove|add|use|make|build|write|fix|change|set)\b",
        r"^\s*\|",                          # table row pasted back
        r"</?result>|</?task>|</?output>",  # agent output pasted back
        r"^\s*#{1,6}\s",                    # a pasted heading
    )
]

# ---------------------------------------------------------------------------
# What counts as a proof candidate
# ---------------------------------------------------------------------------

MONEY = re.compile(
    r"(?:[$£€]\s?\d[\d,]*(?:\.\d+)?\s*(?:k|m|b|mm)?\b"
    r"|\b\d[\d,]*(?:\.\d+)?\s*(?:k|m)?\s*(?:dollars|usd|cad|gbp|eur)\b"
    r"|\b\d[\d,]*(?:\.\d+)?\s*(?:k|m)?\s*(?:mrr|arr|in revenue|in sales|in profit)\b)",
    re.I,
)
PERCENT = re.compile(r"\b\d{1,3}(?:\.\d+)?\s?%|\b\d{1,3}\s?percent\b", re.I)
CHANGE = re.compile(
    r"\b(we saved|i saved|saved (?:them|him|her|us|me)|went from|grew from|"
    r"increased|decreased|reduced|cut (?:it|the|our|their)|doubled|tripled|"
    r"\d+\s?x (?:the|our|their|more|growth|roi|return)|scaled to|up from|"
    r"down from|jumped to|dropped to)\b",
    re.I,
)
TIMELINE = re.compile(
    r"\bin (?:under |about |roughly |less than |just )?"
    r"(?:a|an|one|two|three|four|five|six|seven|eight|nine|ten|\d{1,3})\s?"
    r"(?:day|days|week|weeks|month|months|year|years)\b",
    re.I,
)
AUDIENCE = re.compile(
    r"\b\d[\d,]*(?:\.\d+)?\s?(?:k|m)?\+?\s*"
    r"(?:subscriber|subscribers|follower|followers|member|members|view|views|"
    r"lead|leads|client|clients|customer|customers|student|students|"
    r"install|installs|signup|signups|sign-ups|calls booked|bookings)\b",
    re.I,
)

CATEGORIES = [
    ("Money and revenue", MONEY),
    ("Percentages and rates", PERCENT),
    ("Before and after changes", CHANGE),
    ("Timelines", TIMELINE),
    ("Audience and client counts", AUDIENCE),
]

SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+|\n+")
MIN_LEN = 25
MAX_LEN = 320


# ---------------------------------------------------------------------------
# Reading transcripts
# ---------------------------------------------------------------------------


def human_texts(path: Path):
    """Yield (timestamp, text) for messages the human actually typed."""
    try:
        handle = path.open("r", encoding="utf-8", errors="replace")
    except OSError as exc:
        print(f"skipped {path.name}: {exc}", file=sys.stderr)
        return
    with handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                record = json.loads(line)
            except (ValueError, TypeError):
                continue  # malformed line, move on
            if not isinstance(record, dict):
                continue
            if record.get("type") != "user":
                continue
            if record.get("isSidechain"):
                continue  # subagent traffic, not the owner talking
            message = record.get("message")
            if not isinstance(message, dict):
                continue
            content = message.get("content")
            stamp = record.get("timestamp")
            blocks = [content] if isinstance(content, str) else content
            if not isinstance(blocks, list):
                continue
            for block in blocks:
                if isinstance(block, str):
                    yield stamp, block
                elif isinstance(block, dict) and block.get("type") == "text":
                    text = block.get("text")
                    if isinstance(text, str):
                        yield stamp, text


def pretty_date(stamp) -> str:
    if not isinstance(stamp, str):
        return "date unknown"
    try:
        cleaned = stamp.replace("Z", "+00:00")
        moment = datetime.fromisoformat(cleaned).astimezone(timezone.utc)
    except ValueError:
        return "date unknown"
    return moment.strftime("%A %-d %B %Y") if os.name != "nt" else moment.strftime("%A %d %B %Y")


# ---------------------------------------------------------------------------
# Filtering and classifying
# ---------------------------------------------------------------------------


def matches_any(patterns, text) -> bool:
    return any(p.search(text) for p in patterns)


def tidy(sentence: str) -> str:
    sentence = re.sub(r"\s+", " ", sentence).strip(" -*#>`")
    if len(sentence) > MAX_LEN:
        sentence = sentence[: MAX_LEN - 3].rstrip() + "..."
    return sentence


def classify(sentence: str):
    return [name for name, pattern in CATEGORIES if pattern.search(sentence)]


def scan(root: Path, limit=None):
    files = sorted(root.glob("*/*.jsonl"))
    if limit:
        files = files[:limit]

    found = {}          # normalised sentence -> record
    seen_sentences = set()
    stats = {
        "sessions": 0,
        "unreadable": 0,
        "human_messages": 0,
        "dropped_credentials": 0,
        "dropped_third_party": 0,
        "dropped_noise": 0,
        "duplicates": 0,
    }

    for path in files:
        stats["sessions"] += 1
        got_any = False
        for stamp, text in human_texts(path):
            got_any = True
            stats["human_messages"] += 1
            for raw in SENTENCE_SPLIT.split(text):
                sentence = tidy(raw)
                if len(sentence) < MIN_LEN:
                    continue
                if matches_any(NOISE_PATTERNS, sentence):
                    stats["dropped_noise"] += 1
                    continue
                buckets = classify(sentence)
                if not buckets:
                    continue
                if matches_any(CREDENTIAL_PATTERNS, sentence):
                    stats["dropped_credentials"] += 1
                    continue
                if matches_any(THIRD_PARTY_PATTERNS, sentence):
                    stats["dropped_third_party"] += 1
                    continue
                key = re.sub(r"[^a-z0-9]+", "", sentence.lower())[:160]
                if key in seen_sentences:
                    stats["duplicates"] += 1
                    continue
                seen_sentences.add(key)
                found[key] = {
                    "sentence": sentence,
                    "date": pretty_date(stamp),
                    "project": path.parent.name,
                    "buckets": buckets,
                }
        if not got_any:
            stats["unreadable"] += 1
    return found, stats


# ---------------------------------------------------------------------------
# Writing the output file (see references/output-format.md)
# ---------------------------------------------------------------------------


def readable_project(name: str) -> str:
    name = name.replace("-Users-jonocatliff-Documents-", "").replace("-", " ")
    return name.strip() or "unknown project"


def score(record) -> int:
    """Rough usefulness ranking - a money or change claim beats a bare timeline."""
    weight = {
        "Money and revenue": 4,
        "Before and after changes": 4,
        "Audience and client counts": 3,
        "Percentages and rates": 2,
        "Timelines": 1,
    }
    return sum(weight[b] for b in record["buckets"])


def write_report(found, stats, out_path: Path):
    today = datetime.now().strftime("%Y-%m-%d")
    lines = [
        "# Transcript proof candidates",
        f"Built {today} · {stats['sessions']} sessions read · "
        f"{len(found)} candidate facts · none confirmed yet",
        "Next: mark each line true, wrong or private before any of it reaches a proof file.",
        "",
        "## Read this before using a single line",
        "",
        "- Every line below is UNCONFIRMED. People state numbers loosely while working.",
        "- A number said out loud is often an estimate, a target, or a hypothetical.",
        "- A hypothetical quoted as a result is inventing proof. Confirm first, always.",
        "- Lines about anyone else's business were dropped, not stored.",
        "",
        "## Strongest looking candidates",
        "",
    ]

    ranked = sorted(found.values(), key=lambda r: (-score(r), r["sentence"]))
    if ranked:
        for record in ranked[:10]:
            lines.append(
                f"- **{record['date']}** · {readable_project(record['project'])}\n"
                f"  \"{record['sentence']}\""
            )
    else:
        lines.append("- Nothing matched. Widen the patterns or check the transcript folder.")
    lines.append("")

    for name, _ in CATEGORIES:
        group = [r for r in ranked if name in r["buckets"]]
        if not group:
            continue
        lines.append(f"## {name} ({len(group)} lines)")
        lines.append("")
        for record in group[:50]:
            lines.append(
                f"- **{record['date']}** · {readable_project(record['project'])}\n"
                f"  \"{record['sentence']}\""
            )
        if len(group) > 50:
            lines.append(f"- + {len(group) - 50} more in this group, not shown")
        lines.append("")

    lines += [
        "## What was left out on purpose",
        "",
        f"- Lines holding a key, token or password: {stats['dropped_credentials']} dropped, never written down",
        f"- Lines holding someone else's email, phone or address: {stats['dropped_third_party']} dropped",
        f"- Lines that were code, errors or pasted output: {stats['dropped_noise']} skipped",
        f"- Repeat sentences already captured once: {stats['duplicates']} skipped",
        f"- Session files with nothing a human typed: {stats['unreadable']} skipped",
        "",
        "## How to use this",
        "",
        "1. Read each line and mark it true, wrong, or private.",
        "2. For anything true, write down where the number actually came from.",
        "3. Move only confirmed lines into the proof inventory, with that source.",
        "4. Delete this file once it has been worked through - it is a worksheet, not a record.",
        "",
    ]

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text("\n".join(lines), encoding="utf-8")


def main(argv=None):
    parser = argparse.ArgumentParser(
        description="Mine past Claude Code sessions for proof candidates."
    )
    parser.add_argument(
        "--root", default=str(DEFAULT_ROOT), help="folder holding the session files"
    )
    parser.add_argument(
        "--limit", type=int, default=None, help="only read this many session files"
    )
    parser.add_argument(
        "--out",
        default="transcript-proof-candidates.md",
        help="where to write the candidate list",
    )
    args = parser.parse_args(argv)

    root = Path(args.root).expanduser()
    if not root.is_dir():
        print(f"No transcript folder at {root}", file=sys.stderr)
        return 1

    found, stats = scan(root, args.limit)
    out_path = Path(args.out).expanduser()
    write_report(found, stats, out_path)

    print(f"Sessions read: {stats['sessions']}")
    print(f"Human messages read: {stats['human_messages']}")
    print(f"Candidate facts: {len(found)}")
    print(f"Dropped for credentials: {stats['dropped_credentials']}")
    print(f"Dropped as someone else's personal data: {stats['dropped_third_party']}")
    print(f"Written to: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
