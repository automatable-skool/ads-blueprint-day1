"""Pull the search terms report for the daily pass - read-only.

The data behind /search-terms. Pulls every search term that triggered an ad
in the window, with the keyword that matched it, and writes it as JSON for
Claude to judge intent on. Nothing is negated here - judging is a separate
step and pushing needs a human yes.

DEFAULT WINDOW IS LIFETIME - every search term the account has ever shown
for, up to yesterday. A pass that only looks at yesterday silently depends on
somebody running it every single day, and the first skipped week leaves a hole
nothing ever goes back for. Terms already dealt with are marked handled and
drop out of the judging queue, so a lifetime pull is not extra work - it is
the same work with nothing missed.

A term counts as ALREADY HANDLED when its status is EXCLUDED (you negated it)
or ADDED (it is one of your keywords). Everything else is unjudged, ranked by
wasted spend, and that ranking is the queue. Use --days N only when you
deliberately want a recent slice.

Usage (from the project root, so .env resolves):
  python3 code/search_terms_report.py                 # lifetime, the default
  python3 code/search_terms_report.py --days 1        # yesterday only
  python3 code/search_terms_report.py --days 30 --campaign 1234567890
  python3 code/search_terms_report.py --out code/cache/search-terms.json

Output: JSON with one row per (search term, campaign, ad group), plus the
hidden-share per campaign (keyword clicks minus search-term clicks) so the
command can say how much of the spend it cannot see.

Also computes the aggregates the report is built from, so no count is ever
reported without the rows behind it:

  ad_groups            spend and leads per ad group (VISIBLE terms only - the
                       hidden share means real spend is higher)
  sources              spend per keyword AND how the term matched, which is what
                       turns forty negatives into one keyword fix
  matched_how          broad vs phrase vs exact
  brand_split          brand and non-brand costs, so one blended target does not
                       mis-grade both. Needs --brand
  cross_ad_group_terms one search term caught by several ad groups - they compete,
                       and the data splits across all of them

The full term list is NOT duplicated into a "terms" key; it is already carried by
unjudged_terms plus already_handled_terms, and on a lifetime pull that duplicate
doubled the file for nothing.
"""

import argparse
import json
import os
import re
import sys
from datetime import date, timedelta

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402


def micros(v):
    return round((v or 0) / 1_000_000, 2)


# The account cannot have data before this; a wide floor is harmless because
# the API just returns nothing for days that do not exist.
LIFETIME_START = date(2015, 1, 1)


def window(days):
    """Yesterday back N days, or everything the account has if days is None."""
    end = date.today() - timedelta(days=1)
    start = LIFETIME_START if days is None else end - timedelta(days=days - 1)
    return start.isoformat(), end.isoformat()


def pull_terms(ga, customer_id, start, end, campaign_id=None):
    where = f"segments.date BETWEEN '{start}' AND '{end}'"
    if campaign_id:
        where += f" AND campaign.id = {campaign_id}"
    q = f"""
      SELECT
        search_term_view.search_term,
        search_term_view.status,
        segments.search_term_match_type,
        segments.keyword.info.text,
        segments.keyword.info.match_type,
        campaign.id, campaign.name, campaign.status,
        ad_group.id, ad_group.name, ad_group.status,
        metrics.impressions, metrics.clicks, metrics.cost_micros,
        metrics.conversions, metrics.conversions_value
      FROM search_term_view
      WHERE {where}
      ORDER BY metrics.cost_micros DESC
    """
    rows = {}
    for r in ga.search(customer_id=customer_id, query=q):
        key = (r.search_term_view.search_term, r.campaign.id, r.ad_group.id)
        cur = rows.setdefault(key, {
            "term": r.search_term_view.search_term,
            "status": r.search_term_view.status.name,
            "matched_how": r.segments.search_term_match_type.name,
            "keyword": r.segments.keyword.info.text,
            "keyword_match": r.segments.keyword.info.match_type.name,
            "campaign_id": str(r.campaign.id),
            "campaign": r.campaign.name,
            "campaign_status": r.campaign.status.name,
            "ad_group_id": str(r.ad_group.id),
            "ad_group": r.ad_group.name,
            "ad_group_status": r.ad_group.status.name,
            "impressions": 0, "clicks": 0, "cost": 0.0, "conversions": 0.0, "conv_value": 0.0,
        })
        cur["impressions"] += r.metrics.impressions
        cur["clicks"] += r.metrics.clicks
        cur["cost"] = round(cur["cost"] + micros(r.metrics.cost_micros), 2)
        cur["conversions"] = round(cur["conversions"] + r.metrics.conversions, 1)
        cur["conv_value"] = round(cur["conv_value"] + r.metrics.conversions_value, 2)
    return sorted(rows.values(), key=lambda x: x["cost"], reverse=True)


def brand_tokens(raw):
    """Split --brand into lowercase tokens. Empty means no brand split is possible."""
    if not raw:
        return []
    return [w.strip().lower() for w in raw.split(",") if w.strip()]


def is_brand(term, tokens):
    """A term is brand if any brand token appears in it. Substring, not word match -
    'acmeplumbing' and 'acme plumbing' both have to count, and brand names run together."""
    if not tokens:
        return None          # None means "not determined", never False
    flat = term.lower().replace(" ", "")
    return any(tok.replace(" ", "") in flat for tok in tokens)


# ---------------------------------------------------------------------------
# GATE 0 - intent flags. Judged on what the search MEANS, never on what it cost.
#
# Every one of these categories died at the cost gates in a real run: the waste
# was spread across thousands of terms at $1-25 each, and a per-term dollar
# threshold cannot see money shaped like that. So these run FIRST and cost is
# not part of the test.
# ---------------------------------------------------------------------------

# ⛔ THE LISTS BELOW ARE SEEDS, NOT THE VERDICT. They were first written against an
# events account, so the adjacent-service, rental and unrelated lists lean that way.
# Every hit is a HINT for the session. The verdict on each term comes from
# code/judge_terms.py, which reads THIS business from context/business.md - and no
# hit below fires on a term that also names something in '## What we do'.

# Multi-service lead marketplaces. Someone searching these wants a directory
# that resells the lead to 50 businesses, not this business.
MARKETPLACES = [
    "gigsalad", "thumbtack", "bark.com", "bark ", "gigmasters", "thebash", "the bash",
    "weddingwire", "wedding wire", "theknot", "the knot", "eventective", "poptop",
    "addtoevent", "bookings", "fiverr", "upwork", "kijiji", "craigslist", "yelp",
    "angi", "angies list", "homestars", "taskrabbit",
]

# Segment qualifiers: real demand, but a slice of the market. NEVER auto-negated -
# these are FLAGGED for the owner, because whether a slice is worth serving is a
# business call and the honest input (what share of local demand it is) is not in
# the account. Auto-negating these quietly discards a niche the owner may own.
NICHE_QUALIFIERS = [
    "persian", "punjabi", "indian", "bollywood", "desi", "korean", "chinese", "mandarin",
    "vietnamese", "filipino", "greek", "italian", "portuguese", "polish", "russian",
    "ukrainian", "arabic", "lebanese", "jewish", "hebrew", "kosher", "muslim", "islamic",
    "hindu", "sikh", "tamil", "spanish", "latin", "salsa", "reggae", "country",
    "karaoke", "silent disco", "lgbtq", "drag",
]


# Research intent - the searcher is deciding WHETHER, not choosing WHO. On a
# budget-limited search campaign this is an SEO job, not a paid one. Price queries
# are deliberately NOT here: "how much does a plumber cost" is a buyer, and
# blocking "cost" is one of the classic over-blocks.
QUESTION_SHAPE = re.compile(
    r"^(what|how|when|why|who|which|should|shall|do|does|did|can|could|is|are|was|will|would)\b",
    re.I)
PRICE_WORDS = re.compile(r"\b(cost|costs|price|prices|pricing|charge|charges|rate|rates|"
                         r"how much|fee|fees|budget|tip|worth)\b", re.I)

INFORMATIONAL = [
    "do i need", "do you need", "should i", "is it worth", "worth it", "what is a",
    "what does a", "what do", "how does", "how do i", "how to", "when to", "when should",
    "why do", "why should", "ideas", "checklist", "timeline", "etiquette", "tips",
    "guide", "meaning", "definition", "vs ", " versus ", "difference between",
    "examples", "template", "playlist", "song list", "songs for",
]


# Adjacent services - somebody else's job in the same buying moment. Seeded from
# the events trade this was first run on (the owner should not have to predict
# "confetti machine rental" in advance); harmless for other trades because it only
# fires on a term that does NOT also name what THIS business sells. Extended by
# "## What we DON'T do" in context/business.md, which the script reads itself.
#
# ⛔ Only applied when the term does NOT also name what the business sells.
# "dj and photo booth" is a real combo enquiry and must survive.
ADJACENT_SERVICES = [
    # people who are not a DJ
    "emcee", "mc", "mc for", "master of ceremonies", "host for", "compere",
    "saxophonist", "saxophone", "violinist", "violin", "cellist", "string quartet",
    "string trio", "harpist", "harp", "pianist", "piano player", "guitarist",
    "singer", "vocalist", "band", "live music", "musician", "bagpiper", "drummer",
    "percussionist", "mariachi", "steel drum",
    # other event vendors
    "wedding planner", "wedding planners", "event planner", "coordinator",
    "organizer", "organiser", "organizers", "organisers",
    "photographer", "photography", "videographer", "videography", "florist",
    "flowers", "caterer", "catering", "bakery", "cake", "officiant", "celebrant",
    "makeup artist", "hair stylist", "limo", "limousine", "transportation",
    "venue", "hall rental", "banquet", "bartender", "bar service", "security guard",
    # gear hire, which is not a booking
    "party rental", "party rentals", "equipment rental", "speaker rental",
    "speaker rentals", "microphone rental", "mic rental", "pa rental", "pa system",
    "av rental", "audio visual", "lighting rental", "uplighting rental",
    "tent rental", "table rental", "chair rental", "linen rental", "dance floor rental",
    "confetti machine", "fog machine", "smoke machine", "sparkler", "cold spark",
    "photo booth rental", "projector rental", "screen rental", "stage rental",
    "generator rental", "karaoke machine rental",
]


# Same event, nothing to do with the service. "rsvp" is a wedding word; it is not
# a wedding-DJ enquiry, and no amount of spend makes it one.
UNRELATED = [
    "rsvp", "invitation", "invites", "save the date", "guest list", "seating chart",
    "place card", "registry", "gift list", "wedding dress", "bridal gown", "tuxedo",
    "suit rental", "wedding rings", "engagement ring", "honeymoon", "bachelorette",
    "bachelor party", "stag", "bridal shower", "vows", "speech", "speeches", "toast",
    "wedding favours", "wedding favors", "guest book", "thank you cards",
    "marriage licence", "marriage license", "prenup", "wedding insurance",
]


# Physical things a service business does not rent out. Paired with RENT_WORDS
# below as a PATTERN rather than fixed phrases, because word order flips freely:
# "speaker rental", "rent speakers", "rental of speakers" are one idea.
#
# ⛔ The service itself is deliberately absent. "rent a dj" and "dj rentals" are
# BUYING intent in this trade - in the account this was built against they carried
# $2,133 and 61.6 leads. Renting a person is hiring them.
RENTAL_OBJECTS = [
    "speaker", "speakers", "sound system", "pa system", "microphone", "mic", "amp",
    "dance floor", "stage", "riser", "tent", "marquee", "table", "tables", "chair",
    "chairs", "linen", "cutlery", "glassware", "projector", "screen", "tv", "monitor",
    "lighting", "uplighting", "light", "lights", "generator", "heater", "photo booth",
    "booth", "machine", "room", "hall", "venue", "space", "bouncy castle", "inflatable",
    "karaoke", "arcade", "casino", "furniture", "decor", "backdrop", "arch", "truss",
    "game", "games", "photo bus", "slushie", "popcorn", "candy floss", "cotton candy",
]
RENT_WORDS = ["rent ", "rents ", "rental", "rentals", "renting", "hire of", "for hire"]

# Things this business does not do, that are not a "service provider" noun.
EXTRA_JUNK = [
    "pyrotechnic", "pyrotechnics", "fireworks", "cold spark", "sparkler",
    "party entertainment", "entertainment for adults", "adult entertainment",
    "bouncy castle", "face painting", "magician", "clown", "comedian", "caricature",
    "petting zoo", "photo bus", "trackless train",
]


# Words that carry an intent to BUY, whatever the service is named.
BUY_WORDS = ["hire", "hiring", "book", "booking", "rent", "rental", "quote", "cost", "price",
             "prices", "pricing", "near me", "services", "service", "company", "companies",
             "packages", "package", "for wedding", "for my wedding", "for hire", "available"]


def transactional(term, sells):
    """Does this term name our service, or an unambiguous intent to buy it?

    The inverse test. Enumerating every non-transactional phrase is endless -
    "micro wedding vancouver" is wedding-related, names no service and asks to buy
    nothing. Asking whether the SERVICE is present catches the whole long tail at
    once. Reported for review rather than auto-negated, because a business whose
    service word is rare in queries would see this fire on everything.
    """
    if not sells:
        return True
    return any((" " + s) in term for s in sells) or any(b in term for b in BUY_WORDS)


# The searcher IS the practitioner, not the customer. Another DJ looking for tools,
# software, gear, or how to run the business - never someone hiring one.
# Distinct from the training/courses taxonomy: that is people learning the trade,
# this is people already in it, shopping for kit.
PRACTITIONER_CLEAR = [
    # named tools - no ambiguity, nobody hiring a DJ searches these
    "serato", "rekordbox", "traktor", "virtual dj", "djay", "mixxx", "ableton",
    "cdj", "cdjs", "ddj", "xdj", "sl1200", "technics", "pioneer dj", "denon dj",
    "numark", "rane", "shure", "sennheiser", "behringer", "qsc", "jbl", "mackie",
    "controller", "turntable", "turntables", "mixer", "crossfader", "cartridge",
    "stylus", "slipmat", "flight case", "bpm counter", "stem separation",
    # running the business, not buying from it
    "dj business", "start a dj", "become a dj", "dj insurance", "dj contract",
    "dj invoice", "dj pricing guide", "how to charge", "dj marketing", "dj leads",
    "dj website", "dj logo", "dj name ideas", "dj resume", "dj booking software",
]
# Real ambiguity - these need the SERP check before anyone negates them.
# "plumber app": almost certainly a tradesperson shopping for a tool, but "app" alone is
# not proof, and a wrong negative here is permanent.
PRACTITIONER_AMBIGUOUS = [
    "app", "apps", "software", "program", "plugin", "tool", "tools", "gear",
    "equipment", "setup", "kit", "speakers for dj", "lighting for dj",
    "template", "sample pack", "acapella", "stems", "transition", "beatmatch",
]


# Same city name, different country. "dj vancouver wa" is Vancouver, Washington -
# and a place-name match reads it as the served city and lets it straight through.
# The state or country marker is the only thing that separates them.
CA_PROVINCES = {"bc", "ab", "sk", "mb", "on", "qc", "nb", "ns", "pe", "nl", "yt", "nt", "nu"}
US_STATES = {
    "al","ak","az","ar","co","ct","de","fl","ga","hi","id","il","in","ia","ks","ky",
    "la","me","md","ma","mi","mn","ms","mo","mt","ne","nv","nh","nj","nm","ny","nc",
    "nd","oh","ok","or","pa","ri","sc","sd","tn","tx","ut","vt","va","wa","wv","wi","wy",
}
# Which names mean "another country" depends on where THIS business is. A Canadian
# plumber's "vancouver washington" is foreign; a Seattle plumber's is home. The home
# country comes from context/business.md ("Country customers search from") or --country.
US_NAMES = [
    "washington", "oregon", "california", "texas", "florida", "new york", "michigan",
    "ohio", "illinois", "georgia", "arizona", "nevada", "colorado", "seattle",
    "portland", "usa", "united states", "u.s.", "america",
]
CA_NAMES = [
    "canada", "ontario", "alberta", "british columbia", "quebec", "manitoba",
    "saskatchewan", "nova scotia", "new brunswick", "newfoundland", "toronto",
    "calgary", "montreal", "ottawa", "edmonton", "winnipeg",
    # not "vancouver" - Vancouver, Washington is a US city; the " bc" code check covers it
]
OVERSEAS = [
    "uk", "england", "london uk", "australia", "india", "pakistan", "philippines",
    "mexico", "dubai", "uae",
]


def foreign_names(home):
    """The place names that are abroad for this business. Unknown home = overseas only."""
    if home == "CA":
        return US_NAMES + OVERSEAS
    if home == "US":
        return CA_NAMES + OVERSEAS
    return OVERSEAS


def foreign_marker(term, home, all_places=()):
    """Return the marker that puts this term in another country, or None.

    ⛔ A two-letter code is ONLY trusted when a known place name sits immediately
    before it ("vancouver wa"). Bare position is not enough: "near me" ends in ME
    (Maine), "dj la" in LA (Louisiana), "dj co" in CO (Colorado). An early build of
    this flagged 2,965 terms and 226 CONVERTING leads as foreign - almost every
    "dj near me" in the account - which would have been the single most expensive
    negative batch this tool could produce.
    """
    for n in foreign_names(home):
        if (" " + n + " ") in term:
            return n
    # a two-letter code from the OTHER side of the border, only after a known place name
    codes = US_STATES if home == "CA" else CA_PROVINCES if home == "US" else set()
    words = term.split()
    if len(words) >= 2:
        last, prev = words[-1].strip(".,"), words[-2].strip(".,")
        if last in codes and prev in set(all_places):
            return prev + " " + last
    return None


def flag_terms(rows, not_offered, serve_areas, all_places, sells=None, home_country=""):
    """Tag every term with the intent categories it hits. Cost plays no part.

    not_offered  - services this business does not sell, from context/business.md
                   "## What we DON'T do". Empty means the check cannot run and
                   the report must say so rather than reporting a clean result.
    serve_areas  - places this business does serve, from "## Service area".
    all_places   - every place name worth recognising, so a term naming a place
                   NOT in serve_areas is out of area.
    """
    for t in rows:
        term = " " + t["term"].lower() + " "
        f = []
        sells_too = any((" " + s) in term for s in (sells or []))
        for w in PRACTITIONER_CLEAR:
            if (" " + w) in term:
                f.append("practitioner:" + w); break
        if not f:
            for w in PRACTITIONER_AMBIGUOUS:
                if (" " + w + " ") in term:
                    # ⛔ Never negated on the pattern alone. Goes to the SERP check.
                    f.append("practitioner_verify:" + w); break
        for w in UNRELATED:
            if not sells_too and (" " + w) in term:
                f.append("unrelated:" + w); break
        for w in EXTRA_JUNK:
            if not f and not sells_too and (" " + w) in term:
                f.append("other_service:" + w); break
        # The rental PATTERN - rent/hire + a physical object we do not rent out.
        # Order-independent on purpose, and it never fires on our own service.
        if not f and any(r in term for r in RENT_WORDS):
            obj = next((o for o in sorted(RENTAL_OBJECTS, key=len, reverse=True)
                        if (" " + o + " ") in term), None)
            if obj and not any((" " + s + " ") in term for s in (sells or [])):
                f.append("other_service:rental of " + obj)
        for w in not_offered:
            if w and w in term:
                f.append(("combo:" if sells_too else "not_offered:") + w); break
        if not any(x.startswith(("not_offered", "combo")) for x in f):
            for w in ADJACENT_SERVICES:
                # Short tokens ("mc") need both boundaries or they match inside words.
                hit = (" " + w + " ") in term if len(w) <= 3 else (" " + w) in term
                if hit:
                    # ⛔ A term naming BOTH our service and someone else's is not a
                    # free pass. They want a package we half-fill, so we do not
                    # qualify - it is a separate category, not a keep.
                    f.append(("combo:" if sells_too else "other_service:") + w)
                    break
        # A marketplace or a competitor is a different VENDOR for the same service,
        # not a different service. "dj bark" and "dj daula" still want a DJ, so a
        # term naming our service alongside them stays. Only the bare platform goes.
        for w in MARKETPLACES:
            if w in term and not sells_too:
                f.append("marketplace:" + w.strip()); break
        # A question-shaped query is a blog-post query. Matching the SHAPE catches
        # the whole long tail; matching phrases ("what to ask a dj") never will.
        q = QUESTION_SHAPE.match(term.strip())
        if q:
            # Price questions are split out on purpose. "how much does a plumber
            # cost" is a buyer researching budget, and blocking "cost" is one of the
            # classic over-blocks - so it is flagged separately for the owner to call.
            kind = "price_question" if PRICE_WORDS.search(term) else "informational"
            f.append(kind + ":" + q.group(1))
        if not f:
            for w in INFORMATIONAL:
                if w in term:
                    f.append("informational:" + w.strip()); break
        for w in NICHE_QUALIFIERS:
            if (" " + w + " ") in term or term.strip().startswith(w + " "):
                f.append("niche:" + w); break
        fm = foreign_marker(term, home_country, all_places or ())
        if fm:
            f.append("out_of_country:" + fm)
        if not fm and all_places:
            # Longest place name first. "vancouver island" is NOT Vancouver, and a
            # shortest-match scan silently reads it as a served city.
            named, seen = [], term
            for c in sorted(all_places, key=len, reverse=True):
                if (" " + c + " ") in seen:
                    named.append(c)
                    seen = seen.replace(" " + c + " ", " ")
            outside = [c for c in named if c not in serve_areas]
            if outside:
                f.append("out_of_area:" + outside[0])
        if not f and not transactional(term, sells or []):
            f.append("no_service_named:names no service and asks to buy nothing")
        t["flags"] = f
    return rows


def flag_summary(rows):
    """Group flagged terms by category so no count is reported without its rows."""
    out = {}
    for t in rows:
        for f in t.get("flags", []):
            cat, _, val = f.partition(":")
            c = out.setdefault(cat, {"terms": 0, "cost": 0.0, "conversions": 0.0, "by_value": {}})
            c["terms"] += 1
            c["cost"] = round(c["cost"] + t["cost"], 2)
            c["conversions"] = round(c["conversions"] + t["conversions"], 1)
            v = c["by_value"].setdefault(val, {"terms": 0, "cost": 0.0, "conversions": 0.0})
            v["terms"] += 1
            v["cost"] = round(v["cost"] + t["cost"], 2)
            v["conversions"] = round(v["conversions"] + t["conversions"], 1)
    for cat, c in out.items():
        c["by_value"] = dict(sorted(c["by_value"].items(), key=lambda kv: -kv[1]["cost"]))
        # A category that converted is not junk. Say so rather than staging it.
        c["action"] = ("VERIFY on the SERP before negating - pattern is not proof" if cat == "practitioner_verify"
                       else "FLAG ONLY - owner decides" if cat == "niche"
                       else "REVIEW as a group - not transactional for this service" if cat == "no_service_named"
                       else "FLAG - wants a package we half-fill, so we do not qualify" if cat == "combo"
                       else "REVIEW - it converted" if c["conversions"] > 0
                       else "negate on intent, cost is not the test")
    return out


def derive(rows, tokens):
    """Per-term fields the report needs, computed once here rather than in the prompt."""
    for t in rows:
        c, v, k = t["conversions"], t["conv_value"], t["clicks"]
        t["brand"] = is_brand(t["term"], tokens)
        t["cost_per_conversion"] = round(t["cost"] / c, 2) if c else None
        t["value_per_conversion"] = round(v / c, 2) if c else None
        t["roas"] = round(v / t["cost"], 2) if t["cost"] else None
        t["ctr"] = round(k / t["impressions"], 4) if t["impressions"] else None
    return rows


def roll_up(rows, key_fields, label_fields):
    """Generic spend/lead rollup. Used for ad groups and for the source view."""
    out = {}
    for t in rows:
        k = tuple(t[f] for f in key_fields)
        cur = out.setdefault(k, {f: t[f] for f in label_fields} |
                             {"terms": 0, "impressions": 0, "clicks": 0,
                              "cost": 0.0, "conversions": 0.0, "conv_value": 0.0})
        cur["terms"] += 1
        for m in ("impressions", "clicks"):
            cur[m] += t[m]
        for m in ("cost", "conversions", "conv_value"):
            cur[m] = round(cur[m] + t[m], 2)
    for cur in out.values():
        c = cur["conversions"]
        cur["cost_per_conversion"] = round(cur["cost"] / c, 2) if c else None
        cur["zero_conversion_cost"] = None
    return sorted(out.values(), key=lambda x: -x["cost"])


def ad_group_rollup(rows):
    """Per ad group, with the zero-lead spend that drives the negatives batch.

    NOTE: this sums VISIBLE terms only. The hidden share means real ad group spend
    is higher. The campaign block carries the true figure.
    """
    out = roll_up(rows,
                  ["campaign_id", "ad_group_id"],
                  ["campaign_id", "campaign", "ad_group_id", "ad_group"])
    zero = {}
    for t in rows:
        if t["conversions"] == 0:
            k = (t["campaign_id"], t["ad_group_id"])
            zero[k] = round(zero.get(k, 0.0) + t["cost"], 2)
    for cur in out:
        cur["zero_conversion_cost"] = zero.get((cur["campaign_id"], cur["ad_group_id"]), 0.0)
        cur["spend_basis"] = "visible terms only - hidden share not included"
    return out


def source_view(rows):
    """Which keyword and which match type let the traffic in.

    This is what turns forty negatives into one keyword fix: if one broad keyword
    is spawning most of the zero-lead spend, the keyword is the problem.
    """
    out = roll_up(rows,
                  ["campaign_id", "ad_group_id", "keyword", "matched_how"],
                  ["campaign_id", "campaign", "ad_group_id", "ad_group",
                   "keyword", "keyword_match", "matched_how"])
    zero = {}
    for t in rows:
        if t["conversions"] == 0:
            k = (t["campaign_id"], t["ad_group_id"], t["keyword"], t["matched_how"])
            zero[k] = round(zero.get(k, 0.0) + t["cost"], 2)
    for cur in out:
        k = (cur["campaign_id"], cur["ad_group_id"], cur["keyword"], cur["matched_how"])
        cur["zero_conversion_cost"] = zero.get(k, 0.0)
    return out


def matched_how_split(rows):
    """Spend and leads by how the term matched - broad vs phrase vs exact."""
    return roll_up(rows, ["matched_how"], ["matched_how"])


def brand_split(rows, tokens):
    """Brand and non-brand judged separately - a blended target mis-grades both."""
    if not tokens:
        return {"available": False,
                "why": "no --brand tokens passed, so every threshold below is blended "
                       "and brand traffic is inflating it"}
    out = {"available": True}
    for name, want in (("brand", True), ("non_brand", False)):
        sub = [t for t in rows if t["brand"] is want]
        cost = round(sum(t["cost"] for t in sub), 2)
        conv = round(sum(t["conversions"] for t in sub), 1)
        out[name] = {
            "terms": len(sub), "cost": cost, "conversions": conv,
            "cost_per_conversion": round(cost / conv, 2) if conv else None,
        }
    return out


def cross_ad_group_terms(rows):
    """The same search term caught by more than one ad group.

    ⛔ These keywords do NOT compete with each other in the auction - Google states
    that directly, and saying otherwise is factually wrong (see
    references/keyword-redundancy.md and google-ads-audit.md). Only one of them can
    fire. The real damage is that you cannot predict WHICH ad and WHICH landing page
    the searcher gets, and the performance data splits across every copy.
    """
    by_term = {}
    for t in rows:
        by_term.setdefault(t["term"], []).append(t)
    out = []
    for term, hits in by_term.items():
        groups = {(h["campaign_id"], h["ad_group_id"]) for h in hits}
        if len(groups) < 2:
            continue
        out.append({
            "term": term,
            "ad_group_count": len(groups),
            "cost": round(sum(h["cost"] for h in hits), 2),
            "conversions": round(sum(h["conversions"] for h in hits), 1),
            "landing_in": sorted(
                ({"campaign": h["campaign"], "ad_group": h["ad_group"],
                  "keyword": h["keyword"], "matched_how": h["matched_how"],
                  "cost": h["cost"], "conversions": h["conversions"]}
                 for h in hits),
                key=lambda x: -x["cost"]),
        })
    return sorted(out, key=lambda x: -x["cost"])


def pull_campaign_totals(ga, customer_id, start, end, campaign_id=None):
    """Keyword-level clicks/cost per campaign, to compute the hidden share."""
    where = f"segments.date BETWEEN '{start}' AND '{end}' AND campaign.advertising_channel_type = 'SEARCH'"
    if campaign_id:
        where += f" AND campaign.id = {campaign_id}"
    q = f"""
      SELECT campaign.id, campaign.name,
             metrics.clicks, metrics.cost_micros, metrics.conversions
      FROM campaign
      WHERE {where}
    """
    out = {}
    for r in ga.search(customer_id=customer_id, query=q):
        c = out.setdefault(str(r.campaign.id), {"campaign": r.campaign.name, "clicks": 0, "cost": 0.0, "conversions": 0.0})
        c["clicks"] += r.metrics.clicks
        c["cost"] = round(c["cost"] + micros(r.metrics.cost_micros), 2)
        c["conversions"] = round(c["conversions"] + r.metrics.conversions, 1)
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--days", type=int, default=None,
                    help="window ending yesterday. Omit for LIFETIME (the default) - "
                         "already-handled terms are filtered out, so nothing is re-judged")
    ap.add_argument("--campaign", help="numeric campaign ID to restrict to")
    ap.add_argument("--customer", help="10-digit customer ID to pull, digits only. Defaults to "
                                       "GOOGLE_ADS_CUSTOMER_ID in .env. Use this rather than editing "
                                       ".env when the connection reaches more than one account - "
                                       "a silently wrong account is the worst outcome here")
    ap.add_argument("--not-offered", help="comma-separated services this business does NOT sell, "
                                          "from context/business.md '## What we DON\'T do'. Without it "
                                          "the wrong-service check cannot run and the report must say so")
    ap.add_argument("--sells", help="comma-separated words naming what this business DOES sell "
                                    "(e.g. \"dj,disc jockey\"). A term naming both this and another "
                                    "service is a combo enquiry and is never flagged")
    ap.add_argument("--serve-areas", help="comma-separated places this business DOES serve, from "
                                          "'## Service area'. Anything else named in a term is out of area")
    ap.add_argument("--places", help="comma-separated place names to recognise. Defaults to the "
                                     "serve-areas plus any place already seen in the account's campaign names")
    ap.add_argument("--brand", help="comma-separated brand tokens (the business name and its "
                                    "variants) so brand and non-brand get judged on separate "
                                    "thresholds. Without it every threshold is blended")
    ap.add_argument("--country", help="two-letter home country (CA, US, GB, AU...). Default: the "
                                      "'Country customers search from' line in context/business.md. "
                                      "Decides which place names count as another country")
    ap.add_argument("--out", help="write JSON here instead of stdout")
    args = ap.parse_args()

    client, customer_id = load_client()
    if args.customer:
        customer_id = args.customer.replace("-", "").strip()
    if not customer_id:
        sys.exit("No account to pull. Pass --customer or set GOOGLE_ADS_CUSTOMER_ID in .env")
    if not customer_id.isdigit() or len(customer_id) != 10:
        sys.exit(f"Customer ID must be 10 digits, got {customer_id!r}")
    # Say which account, always. A report against the wrong account looks completely normal.
    print(f"pulling account {customer_id}", file=sys.stderr)
    ga = client.get_service("GoogleAdsService")
    start, end = window(args.days)

    # The business inputs come from context/business.md and .env unless passed by hand.
    # Nothing about the business is written into this script.
    import _business as biz
    auto = []
    if not args.sells and biz.sells():
        args.sells = ",".join(biz.sells()); auto.append(f"--sells ({len(biz.sells())}) from business.md")
    if not args.not_offered and biz.not_offered():
        args.not_offered = ",".join(biz.not_offered()); auto.append(f"--not-offered ({len(biz.not_offered())}) from business.md")
    if not args.serve_areas and biz.service_areas():
        args.serve_areas = ",".join(biz.service_areas()); auto.append(f"--serve-areas ({len(biz.service_areas())}) from business.md")
    if not args.brand and biz.brand_tokens():
        args.brand = ",".join(biz.brand_tokens()); auto.append("--brand from BUSINESS_NAME")
    country = (args.country or biz.country() or "").upper()
    auto.append(f"--country {country}" + ("" if args.country else " from business.md") if country
                else "--country UNKNOWN (only overseas markers checked; set it in business.md)")
    print("business inputs: " + (" · ".join(auto) if auto else "none auto-filled"), file=sys.stderr)
    for flag, val in (("--sells", args.sells), ("--not-offered", args.not_offered),
                      ("--serve-areas", args.serve_areas), ("--brand", args.brand)):
        if not val:
            print(f"  {flag} is EMPTY - fill context/business.md (or pass it); the report must say "
                  f"that check did not run", file=sys.stderr)

    tokens = brand_tokens(args.brand)
    not_offered = brand_tokens(args.not_offered)
    serve_areas = brand_tokens(args.serve_areas)
    places = brand_tokens(args.places) or serve_areas
    terms = derive(pull_terms(ga, customer_id, start, end, args.campaign), tokens)
    # Recognise every place named in a campaign, so a term naming another city is
    # caught even when --places was not passed.
    for t_ in terms:
        for part in re.split(r"[-/|,]", t_["campaign"].lower()):
            w = part.strip()
            if w and 3 <= len(w) <= 18 and w.isalpha() and w not in places:
                places.append(w)
    terms = flag_terms(terms, not_offered, serve_areas, places, brand_tokens(args.sells), home_country=country)
    totals = pull_campaign_totals(ga, customer_id, start, end, args.campaign)

    visible = {}
    for t in terms:
        v = visible.setdefault(t["campaign_id"], {"clicks": 0, "cost": 0.0})
        v["clicks"] += t["clicks"]
        v["cost"] = round(v["cost"] + t["cost"], 2)

    hidden = []
    for cid, c in totals.items():
        seen = visible.get(cid, {"clicks": 0, "cost": 0.0})
        hidden_clicks = max(c["clicks"] - seen["clicks"], 0)
        share = round(hidden_clicks / c["clicks"], 3) if c["clicks"] else 0.0
        # The dollar version. "42% of clicks" is abstract; "$65,051 of your spend cannot be
        # traced to a search" is the sentence an owner actually reacts to.
        hidden_cost = round(max(c["cost"] - seen["cost"], 0), 2)
        cost_share = round(hidden_cost / c["cost"], 3) if c["cost"] else 0.0
        # Hidden clicks are usually dearer than visible ones (Hero Conf UK 2026: +38% CPC).
        # When this account disagrees, that is worth saying rather than quoting the study.
        cpc_v = round(seen["cost"] / seen["clicks"], 2) if seen["clicks"] else None
        cpc_h = round(hidden_cost / hidden_clicks, 2) if hidden_clicks else None
        hidden.append({
            "campaign_id": cid, "campaign": c["campaign"],
            "keyword_clicks": c["clicks"], "visible_term_clicks": seen["clicks"],
            "hidden_clicks": hidden_clicks, "hidden_share": share,
            "cost": c["cost"], "visible_term_cost": seen["cost"],
            "hidden_cost": hidden_cost, "hidden_cost_share": cost_share,
            "visible_cpc": cpc_v, "hidden_cpc": cpc_h,
            "conversions": c["conversions"],
            "avg_cost_per_conversion": round(c["cost"] / c["conversions"], 2) if c["conversions"] else None,
        })

    handled = [t for t in terms if t.get("status") in ("EXCLUDED", "ADDED")]
    unjudged = [t for t in terms if t.get("status") not in ("EXCLUDED", "ADDED")]
    unjudged.sort(key=lambda t: -t["cost"])

    result = {
        "account": customer_id,
        "window": {"start": start, "end": end, "days": args.days,
                   "lifetime": args.days is None,
                   "note": "lifetime by default - already-handled terms are separated out below, "
                           "so a missed week is never a hole"},
        "queue": {
            "unjudged_count": len(unjudged),
            "already_handled_count": len(handled),
            "note": "EXCLUDED = you already negated it. ADDED = it is one of your keywords. "
                    "Judge the unjudged list, ranked by wasted spend.",
            "unjudged_wasted_spend": round(sum(t["cost"] for t in unjudged if t["conversions"] == 0), 2),
        },
        "unjudged_terms": unjudged,
        "already_handled_terms": handled,
        "term_count": len(terms),
        "total_cost": round(sum(t["cost"] for t in terms), 2),
        "total_conv_value": round(sum(t["conv_value"] for t in terms), 2),
        "zero_conversion_cost": round(sum(t["cost"] for t in terms if t["conversions"] == 0), 2),
        "campaigns": hidden,

        # Aggregates. Every one of these exists so a finding can be stated with the
        # rows behind it - a count with no list is the thing this report kept doing.
        "ad_groups": ad_group_rollup(terms),
        "sources": source_view(terms),
        "matched_how": matched_how_split(terms),
        "brand_split": brand_split(terms, tokens),
        "cross_ad_group_terms": cross_ad_group_terms(terms),

        # GATE 0. Judged on intent, never on cost. Every category here died at the
        # dollar gates in a real run because the money was spread, not stacked.
        "intent_flags": flag_summary(terms),
        "intent_inputs": {
            "not_offered": not_offered,
            "sells": brand_tokens(args.sells),
            "serve_areas": serve_areas,
            "not_offered_available": bool(not_offered),
            "serve_areas_available": bool(serve_areas),
            "home_country": country or None,
            "note": "Empty not_offered or serve_areas means that check DID NOT RUN. "
                    "Report it as not measured; never as a clean result.",
        },
    }
    text = json.dumps(result, indent=2)
    if args.out:
        os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
        with open(args.out, "w") as f:
            f.write(text)
        print(f"wrote {len(terms)} search terms for {start}..{end} to {args.out}")
    else:
        print(text)


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"Google Ads API error (request_id {e.request_id}):", file=sys.stderr)
        for err in e.failure.errors:
            print(f"  - {err.error_code}: {err.message}", file=sys.stderr)
        sys.exit(1)
