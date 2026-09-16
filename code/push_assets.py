"""Create the ad assets in ads-pending.md in Google Ads. The whole set, every time.

Built against `references/ad-assets.md` - levels, limits and policy rules come from there, not
from guesswork. Read that file before changing anything here.

    python3 code/push_assets.py --ad-group "SEO audit"           # validate only, creates nothing
    python3 code/push_assets.py --ad-group "SEO audit" --push    # creates and links them

⛔ EVERY ASSET IS REQUIRED. (Jono, 1 September 2026.) Sitelinks, callouts, structured snippets,
the call asset, the lead form, the business name, the logo and messages. A missing one BLOCKS the
run - it is never a warning, never a "pending" line in a file. The only way one is left out is
someone asking for it in words, and then it is named with --skip.

⛔ NEVER CREATES A CAMPAIGN OR AN AD GROUP. EVER. It creates assets and links them. Structure is
/campaign-plan's job, keywords are /keywords' job.

**Assets go on the AD GROUP** (Jono, 1 September 2026). It is the most granular level the API has -
the only writable links are customer, campaign, ad group and asset group (Performance Max), so there
is no ad-level link to use. An ad-group asset serves under the ads in that ad group and nowhere else,
which is the behaviour the ad editor shows you. A campaign holding "SEO audit", "SEO agency" and
"SEO for trades" is three different buyers, and campaign-level sitelinks would show all three the
same links.

    ad group   sitelinks · callouts · snippets · call · messages   (everything Google allows here)
    campaign   lead form · business name · logo                     (Google allows nothing lower)

`--level campaign` moves the first three up, and it is the right call ONLY when the campaign holds
one theme - then you get the same relevance with more data per sitelink. Note the callout trap from
ad-assets.md: a single ad-group callout makes every campaign and account callout ineligible for that
ad group, so an ad-group set has to carry the universal claims too, not just the specific ones.

Inputs it cannot invent, so it names them and refuses to guess:
    --business-name "Acme Plumbing"    25 chars, matches the verified domain root or legal entity
    --logo path/to/logo.png            square 1:1, 128x128 min, under 5120 KB. NEVER generate one
                                       without Jono saying yes first - ask, show, wait
    --privacy-url https://.../privacy  Google requires it inside the lead form
    --whatsapp +14165551234            the business message asset
    LEAD_WEBHOOK_URL in .env           where a form lead lands in GoHighLevel
"""

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from _business import country as home_country  # noqa: E402
from push_ads import parse, pick_url, url_is_live  # noqa: E402

from dotenv import load_dotenv  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402

# Before argparse builds its defaults, not after - otherwise every os.getenv() default reads empty
# and the script asks for values that are sitting in .env. (1 September 2026.)
load_dotenv(os.path.join(os.getcwd(), ".env"))

SITELINK_TEXT_MAX = 25
SITELINK_LINE_MAX = 35
CALLOUT_MAX = 25
SNIPPET_VALUE_MAX = 25
BUSINESS_NAME_MAX = 25
LOGO_MAX_BYTES = 5120 * 1024
SITELINKS_REQUIRED = 6
CALLOUTS_MIN = 8

# ad-assets.md: 13 fixed headers, and "Services" is not one of them - it is "Service catalog".
SNIPPET_HEADERS = {"Amenities", "Brands", "Courses", "Degree programs", "Destinations",
                   "Featured hotels", "Insurance coverage", "Models", "Neighborhoods",
                   "Service catalog", "Shows", "Styles", "Types"}

FIELD = re.compile(r"^\s*[-*]\s*(Link text|Line one|Line two|Target)\s*:\s*(.+?)\s*$", re.I)
BULLET = re.compile(r"^\s*[-*]\s+(.+?)\s*$")
E164 = re.compile(r"^\+\d{7,15}$")
BANNED_PUNCT = re.compile(r"[!]|^\W")


def strip_count(text):
    return re.sub(r"\s*[\[(]\d+\s*(?:characters?)?[\])]\s*$", "", text).strip()


def parse_assets(path):
    """The `# Assets` section -> everything this script can build."""
    lines = open(path, encoding="utf-8").read().splitlines()
    start = next((i for i, l in enumerate(lines) if re.match(r"^#\s*Assets\s*$", l)), None)
    out = {"sitelinks": [], "callouts": [], "snippets": [], "call": "",
           "business_name": "", "whatsapp": ""}
    if start is None:
        return out

    section, sitelink, snippet = None, None, None
    for raw in lines[start + 1:]:
        m = re.match(r"^##\s+(.*)$", raw)
        if m:
            head = m.group(1).lower()
            section = ("sitelinks" if "sitelink" in head else
                       "callouts" if "callout" in head else
                       "snippets" if "snippet" in head else
                       "call" if "call asset" in head else
                       "business" if "business name" in head else
                       "messages" if "message" in head else None)
            sitelink = snippet = None
            continue
        if section == "sitelinks":
            m = re.match(r"^###\s+(.*\S)\s*$", raw)
            if m:
                sitelink = {"text": m.group(1), "line1": "", "line2": "", "url": ""}
                out["sitelinks"].append(sitelink)
                continue
            m = FIELD.match(raw)
            if m and sitelink is not None:
                key, value = m.group(1).lower(), m.group(2).strip()
                if key == "link text":
                    sitelink["text"] = strip_count(value)
                elif key == "line one":
                    sitelink["line1"] = strip_count(value)
                elif key == "line two":
                    sitelink["line2"] = strip_count(value)
                else:
                    sitelink["url"] = pick_url(value)
        elif section == "callouts":
            m = BULLET.match(raw)
            if m and not raw.lstrip().startswith("- **"):
                out["callouts"].append(strip_count(m.group(1)))
        elif section == "snippets":
            # A header line is `- Service catalog:` with its values as indented sub-bullets, one
            # per line. That shape is the repo's readability rule, not a preference - a chained
            # `a · b · c` list fails code/check_readable.py. The inline form is still accepted so
            # older files keep parsing.
            m = re.match(r"^(\s*)[-*]\s*\**([A-Za-z ]+?)\**\s*:\s*(.*?)\s*$", raw)
            if m:
                indent, header, tail = len(m.group(1)), m.group(2).strip(), m.group(3)
                values = [strip_count(v) for v in re.split(r"·|,|;|\|", tail) if v.strip()]
                out["snippets"].append({"header": header, "values": values, "_indent": indent})
                snippet = out["snippets"][-1]
                continue
            m = re.match(r"^(\s+)[-*]\s+(.*\S)\s*$", raw)
            if m and snippet is not None and len(m.group(1)) > snippet["_indent"]:
                snippet["values"].append(strip_count(m.group(2)))
        elif section == "business" and not out["business_name"]:
            m = re.match(r"^\s*[-*]\s*(?:Business )?[Nn]ame\s*:\s*(.+?)\s*$", raw)
            if m:
                out["business_name"] = strip_count(m.group(1))
        elif section in ("call", "messages"):
            found = re.search(r"(\+\d[\d\s().-]{6,}\d)", raw)
            if found and "skool.com" not in raw:
                number = re.sub(r"[\s().-]", "", found.group(1))
                key = "call" if section == "call" else "whatsapp"
                out[key] = out[key] or number
    out["snippets"] = [{"header": s["header"], "values": s["values"]}
                       for s in out["snippets"] if s["values"]]
    return out


# ------------------------------------------------------------------ validation

def check_sitelinks(assets, ad_urls, home_url, checked):
    """ad-assets.md: unique link text (reusing it is a policy violation), a distinct live page per
    link, never the home page, never the ad's own final URL, never the same page twice."""
    problems, texts, urls = [], set(), set()
    for s in assets["sitelinks"]:
        where = f"sitelink {s['text']!r}"
        if len(s["text"]) > SITELINK_TEXT_MAX:
            problems.append(f"{where}: link text {len(s['text'])} chars, max {SITELINK_TEXT_MAX}")
        if BANNED_PUNCT.search(s["text"]):
            problems.append(f"{where}: exclamation marks and leading punctuation are banned")
        if s["text"].lower() in texts:
            problems.append(f"{where}: link text reused - that is a policy violation, not a style note")
        texts.add(s["text"].lower())
        for key, label in (("line1", "line one"), ("line2", "line two")):
            if len(s[key]) > SITELINK_LINE_MAX:
                problems.append(f"{where}: {label} {len(s[key])} chars, max {SITELINK_LINE_MAX}")
        if bool(s["line1"]) != bool(s["line2"]):
            problems.append(f"{where}: the API rejects one description line without the other")

        url = s["url"].rstrip("/")
        if not url.lower().startswith("http"):
            problems.append(f"{where}: no target URL")
            s["drop"] = True
            continue
        if "localhost" in url or "127.0.0.1" in url:
            problems.append(f"{where}: localhost URL, Google cannot reach it: {url}")
            s["drop"] = True
            continue
        if url == home_url.rstrip("/"):
            problems.append(f"{where}: the home page is not a distinct destination")
        if url in ad_urls:
            problems.append(f"{where}: points at the ad's own final URL, which burns the slot")
        if url in urls:
            problems.append(f"{where}: two sitelinks on the same page get suppressed")
        urls.add(url)
        if url not in checked:
            checked[url] = url_is_live(url)
        status, err = checked[url]
        if status != 200:
            problems.append(f"{where}: page is not live yet: {url} -> {status or err} · deploy it, "
                            "then re-run and this sitelink goes up with the others")
            s["drop"] = True
    return problems


def check_callouts(assets, ad_lines, sitelink_text):
    """ad-assets.md: a callout may not repeat ad text or sitelink text - Google disapproves it."""
    problems, seen = [], set()
    for c in list(assets["callouts"]):
        if len(c) > CALLOUT_MAX:
            problems.append(f"callout {len(c)} chars, max {CALLOUT_MAX}: {c!r}")
        if BANNED_PUNCT.search(c):
            problems.append(f"callout has banned punctuation: {c!r}")
        key = c.lower()
        if key in seen:
            problems.append(f"duplicate callout: {c!r}")
        if key in ad_lines:
            problems.append(f"callout repeats ad text - that is a disapproval: {c!r}")
        if key in sitelink_text:
            problems.append(f"callout repeats sitelink text - that is a disapproval: {c!r}")
        seen.add(key)
    return problems


def check_snippets(assets):
    """ad-assets.md: 13 fixed headers, 3-10 values, 25 chars each, no promotional text."""
    problems = []
    if len(assets["snippets"]) > 2:
        problems.append(f"{len(assets['snippets'])} snippet headers - ship at most 2 for the whole "
                        "account, mobile shows one")
    for snip in assets["snippets"]:
        header = snip["header"]
        if header not in SNIPPET_HEADERS:
            hint = " · 'Services' is not a header, the one you want is 'Service catalog'" \
                if header.lower().startswith("service") else ""
            problems.append(f"snippet header {header!r} is not one of Google's 13{hint}")
        values = snip["values"]
        if not 3 <= len(values) <= 10:
            problems.append(f"snippet {header!r} has {len(values)} values, need 3 to 10")
        seen = set()
        for v in values:
            if not 1 <= len(v) <= SNIPPET_VALUE_MAX:
                problems.append(f"snippet value {len(v)} chars, max {SNIPPET_VALUE_MAX}: {v!r}")
            if v.lower() in seen:
                problems.append(f"snippet {header!r} repeats a value: {v!r}")
            seen.add(v.lower())
            if re.search(r"\bfree\b|\b24/7\b|\bbest\b|%|\$", v, re.I):
                problems.append(f"promotional text in a snippet value is a policy violation: {v!r}")
    return problems


def check_identity(opts, assets):
    problems = []
    name = opts["business_name"] or assets["business_name"]
    if name and len(name) > BUSINESS_NAME_MAX:
        problems.append(f"business name {len(name)} chars, max {BUSINESS_NAME_MAX}: {name!r}")
    logo = opts["logo"]
    if logo:
        if not os.path.exists(logo):
            problems.append(f"logo file not found: {logo}")
        elif os.path.getsize(logo) > LOGO_MAX_BYTES:
            problems.append(f"logo is {os.path.getsize(logo)//1024} KB, max 5120 KB")
        elif not logo.lower().endswith((".png", ".jpg", ".jpeg")):
            problems.append(f"logo must be PNG or JPG: {logo}")
    for label, number in (("call asset", assets["call"]), ("message asset", opts["whatsapp"] or assets["whatsapp"])):
        if number and not E164.match(number):
            problems.append(f"{label} number is not E.164 (+14165551234, no spaces or dashes): {number!r}")
    return problems


# ------------------------------------------------------------------ build

def build_ops(client, customer_id, assets, opts):
    """Every asset, in one list. Campaign level for all of them, per ad-assets.md."""
    ops, plan = [], []

    def add(configure, field_type, label):
        op = client.get_type("MutateOperation")
        configure(op.asset_operation.create)
        ops.append(op)
        plan.append((field_type, label))

    for s in assets["sitelinks"]:
        def configure(asset, s=s):
            asset.final_urls.append(s["url"])          # goes on the Asset, never inside sitelink_asset
            asset.sitelink_asset.link_text = s["text"]
            if s["line1"]:
                asset.sitelink_asset.description1 = s["line1"]
                asset.sitelink_asset.description2 = s["line2"]
        add(configure, "SITELINK", f"sitelink · {s['text']}")

    for c in assets["callouts"]:
        add(lambda asset, c=c: setattr(asset.callout_asset, "callout_text", c),
            "CALLOUT", f"callout · {c}")

    for snip in assets["snippets"]:
        def configure(asset, snip=snip):
            asset.structured_snippet_asset.header = snip["header"]
            asset.structured_snippet_asset.values.extend(snip["values"])
        add(configure, "STRUCTURED_SNIPPET", f"snippet · {snip['header']} ({len(snip['values'])})")

    if assets["call"]:
        def configure(asset):
            asset.call_asset.country_code = opts["country"]
            asset.call_asset.phone_number = assets["call"]
        add(configure, "CALL", f"call · {assets['call']}")

    name = opts["business_name"] or assets["business_name"]
    if name:
        add(lambda asset: setattr(asset.text_asset, "text", name),
            "BUSINESS_NAME", f"business name · {name}")

    if opts["logo"]:
        def configure(asset):
            asset.name = f"logo {os.path.basename(opts['logo'])}"
            asset.image_asset.data = open(opts["logo"], "rb").read()
        add(configure, "BUSINESS_LOGO", f"logo · {os.path.basename(opts['logo'])}")

    webhook = os.getenv("LEAD_WEBHOOK_URL", "").strip()
    if webhook and name and opts["privacy_url"] and not opts.get("skip_lead_form"):
        def configure(asset):
            form = asset.lead_form_asset
            form.business_name = name
            form.headline = opts["form_headline"]
            form.description = opts["form_description"]
            form.call_to_action_type = client.enums.LeadFormCallToActionTypeEnum.GET_QUOTE
            form.call_to_action_description = opts["form_cta"]
            form.privacy_policy_url = opts["privacy_url"]
            form.desired_intent = client.enums.LeadFormDesiredIntentEnum.HIGH_INTENT
            # First and last name as separate fields (Jono, 1 September 2026) - both are in
            # LeadFormFieldUserInputTypeEnum, field-verified against the live library. Separate
            # names are what the CRM wants: a merge tag greeting needs the first name on its own.
            for input_type in ("FIRST_NAME", "LAST_NAME", "EMAIL", "PHONE_NUMBER"):
                field = client.get_type("LeadFormField")
                field.input_type = getattr(client.enums.LeadFormFieldUserInputTypeEnum, input_type)
                form.fields.append(field)
            delivery = client.get_type("LeadFormDeliveryMethod")
            delivery.webhook.advertiser_webhook_url = webhook
            delivery.webhook.google_secret = opts["webhook_secret"]
            delivery.webhook.payload_schema_version = 3
            form.delivery_methods.append(delivery)
        add(configure, "LEAD_FORM", "lead form · webhook to GoHighLevel")

    whatsapp = opts["whatsapp"] or assets["whatsapp"]
    if whatsapp:
        def configure(asset):
            msg = asset.business_message_asset
            msg.message_provider = client.enums.BusinessMessageProviderEnum.WHATSAPP
            msg.whatsapp_info.country_code = opts["country"]
            msg.whatsapp_info.phone_number = whatsapp
            msg.starter_message = opts["starter_message"]
            msg.call_to_action.call_to_action_selection = \
                client.enums.BusinessMessageCallToActionTypeEnum.GET_QUOTE
            msg.call_to_action.call_to_action_description = opts["form_cta"]
        add(configure, "BUSINESS_MESSAGE", f"message · WhatsApp {whatsapp}")

    return ops, plan


# What Google's asset statuses actually mean, in words. Attached is not the same as showing, and
# "I cannot see it" is almost always one of these rather than a failed write. (Jono, 1 Sept 2026.)
STATUS_MEANING = {
    "ASSET_UNDER_REVIEW": "under review by Google · normally clears in up to 2 business days, nothing to do",
    "ASSET_DISAPPROVED": "DISAPPROVED · a business name must match the verified domain root or legal "
                         "entity exactly and carry no keywords; a logo must be square 1:1, at least "
                         "128x128, under 5120 KB, and appear on the landing page",
    "ASSET_LINK_PAUSED": "the link is paused · enable it when the campaign goes live",
    "ASSET_LINK_REMOVED": "the link was removed",
    "CAMPAIGN_PAUSED": "the campaign is paused, so nothing serves yet",
    "CAMPAIGN_REMOVED": "the campaign is removed",
    "AD_GROUP_PAUSED": "the ad group is paused, so nothing serves yet",
    "AD_GROUP_REMOVED": "the ad group is removed",
}


def explain_statuses(client, customer_id, campaign_name, ad_group_name):
    """Read every asset back out of the account and say, in plain words, why each one is or is not
    showing. Two gates catch people out and neither is a bug: business name and logo need completed
    Advertiser Verification AND search spend in the last 28 days, and a paused campaign serves
    nothing at all."""
    ga = client.get_service("GoogleAdsService")
    rows = []
    for level, query in (
        ("campaign", f"""SELECT campaign.name, campaign_asset.field_type, campaign_asset.primary_status,
              campaign_asset.primary_status_reasons FROM campaign_asset
              WHERE campaign.name = '{campaign_name}' AND campaign_asset.status = 'ENABLED'"""),
        ("ad group", f"""SELECT ad_group.name, ad_group_asset.field_type, ad_group_asset.primary_status,
              ad_group_asset.primary_status_reasons FROM ad_group_asset
              WHERE ad_group.name = '{ad_group_name}' AND ad_group_asset.status = 'ENABLED'"""),
    ):
        for r in ga.search(customer_id=customer_id, query=query):
            link = r.campaign_asset if level == "campaign" else r.ad_group_asset
            rows.append((level, link.field_type.name, link.primary_status.name,
                         [x.name for x in link.primary_status_reasons]))
    if not rows:
        return
    print("\nWhat Google says about each one - attached is not the same as showing:")
    counts = {}
    for level, field, status, reasons in rows:
        counts.setdefault((level, field, status, tuple(reasons)), 0)
        counts[(level, field, status, tuple(reasons))] += 1
    for (level, field, status, reasons), n in sorted(counts.items()):
        note = " · ".join(STATUS_MEANING.get(x, x) for x in reasons)
        many = f" x{n}" if n > 1 else ""
        print(f"  {field}{many} ({level}) · {status}" + (f" · {note}" if note else ""))
    print("  Business name and logo also need completed Advertiser Verification AND search spend in")
    print("  the last 28 days before they can serve, whatever their review status says.")


def already_linked(client, customer_id, campaign_name, ad_group_name):
    """What is already attached, so a re-run tops up instead of duplicating.

    Running twice used to leave 18 callouts where 9 were written - the script built everything from
    the file every time and never looked at the account first. (Jono, 1 September 2026.)"""
    ga = client.get_service("GoogleAdsService")
    seen = {"CALLOUT": set(), "SITELINK": set(), "STRUCTURED_SNIPPET": set(),
            "CALL": set(), "BUSINESS_NAME": set(), "BUSINESS_LOGO": set(),
            "LEAD_FORM": set(), "BUSINESS_MESSAGE": set()}
    queries = (
        f"""SELECT ad_group.name, ad_group_asset.field_type, asset.callout_asset.callout_text,
             asset.sitelink_asset.link_text, asset.structured_snippet_asset.header,
             asset.call_asset.phone_number FROM ad_group_asset
             WHERE ad_group.name = '{ad_group_name}' AND ad_group_asset.status = 'ENABLED'""",
        f"""SELECT campaign.name, campaign_asset.field_type, asset.text_asset.text,
             asset.callout_asset.callout_text, asset.sitelink_asset.link_text,
             asset.structured_snippet_asset.header, asset.call_asset.phone_number
             FROM campaign_asset WHERE campaign.name = '{campaign_name}'
             AND campaign_asset.status = 'ENABLED'""",
    )
    for q in queries:
        for r in ga.search(customer_id=customer_id, query=q):
            link = r.campaign_asset if "campaign_asset" in q else r.ad_group_asset
            ft = link.field_type.name
            key = (r.asset.callout_asset.callout_text or r.asset.sitelink_asset.link_text
                   or r.asset.structured_snippet_asset.header or r.asset.call_asset.phone_number
                   or getattr(r.asset, "text_asset").text or ft)
            seen.setdefault(ft, set()).add(key.strip().lower())
    return seen


def drop_existing(assets, opts, seen):
    """Remove from this run anything already attached, and say what was skipped."""
    skipped = []
    keep = []
    for s in assets["sitelinks"]:
        (skipped if s["text"].strip().lower() in seen["SITELINK"] else keep).append(s)
    assets["sitelinks"] = keep
    skipped = [f"sitelink · {s['text']}" for s in skipped]

    keep = []
    for c in assets["callouts"]:
        if c.strip().lower() in seen["CALLOUT"]:
            skipped.append(f"callout · {c}")
        else:
            keep.append(c)
    assets["callouts"] = keep

    keep = []
    for snip in assets["snippets"]:
        if snip["header"].strip().lower() in seen["STRUCTURED_SNIPPET"]:
            skipped.append(f"snippet · {snip['header']}")
        else:
            keep.append(snip)
    assets["snippets"] = keep

    if assets["call"] and assets["call"].strip().lower() in seen["CALL"]:
        skipped.append(f"call · {assets['call']}")
        assets["call"] = ""
    name = opts["business_name"] or assets["business_name"]
    if name and name.strip().lower() in seen["BUSINESS_NAME"]:
        skipped.append(f"business name · {name}")
        opts["business_name"] = assets["business_name"] = ""
    if opts["logo"] and seen["BUSINESS_LOGO"]:
        skipped.append("logo · already attached")
        opts["logo"] = ""
    if seen["LEAD_FORM"]:
        skipped.append("lead form · already attached")
        opts["skip_lead_form"] = True
    if seen["BUSINESS_MESSAGE"]:
        skipped.append("message · already attached")
        opts["whatsapp"] = ""
    return skipped


def assert_assets_only(ops):
    """The hard boundary: assets and their campaign links, never structure."""
    allowed = {"asset_operation", "campaign_asset_operation", "ad_group_asset_operation"}
    for op in ops:
        which = op._pb.WhichOneof("operation")
        if which not in allowed:
            sys.exit(f"REFUSING TO SEND: built a {which}. This script only creates assets - "
                     "never campaigns, never ad groups.")


# Jono, 1 September 2026: put them on the AD GROUP. That is the most granular level the API has -
# there is no ad-level asset link (customer, campaign, ad group, asset group are the only four), and
# ad-group assets serve only under the ads in that ad group. Everything Google permits there goes
# there. The three below are campaign-only because Google does not accept them at ad group level.
AD_GROUP_LEVEL = {"SITELINK", "CALLOUT", "STRUCTURED_SNIPPET", "CALL", "BUSINESS_MESSAGE"}
CAMPAIGN_ONLY = {"LEAD_FORM", "BUSINESS_NAME", "BUSINESS_LOGO"}


def link_ops(client, campaign, ad_group, resources, plan, level):
    """Service-specific assets follow --level; everything else is always campaign level."""
    ops = []
    for resource, (field_type, _) in zip(resources, plan):
        op = client.get_type("MutateOperation")
        if field_type in AD_GROUP_LEVEL and level == "adgroup":
            link = op.ad_group_asset_operation.create
            link.ad_group = ad_group
        else:
            link = op.campaign_asset_operation.create
            link.campaign = campaign
        link.asset = resource
        link.field_type = getattr(client.enums.AssetFieldTypeEnum, field_type)
        ops.append(op)
    return ops


def mutate(client, customer_id, ops, validate_only):
    ga = client.get_service("GoogleAdsService")
    req = client.get_type("MutateGoogleAdsRequest")
    req.customer_id = customer_id
    req.mutate_operations.extend(ops)
    req.validate_only = validate_only
    req.partial_failure = False
    return ga.mutate(request=req)


def failed_indexes(exc):
    """Which operations Google rejected, so the rest can still go up."""
    hits = set()
    for err in exc.failure.errors:
        if not err.location:
            continue
        for fp in err.location.field_path_elements:
            if fp.field_name == "operations" and fp.index is not None:
                hits.add(fp.index)
    return hits


def push_what_google_accepts(client, customer_id, ops, plan, validate_only, attempts=6):
    """Jono, 1 September 2026: one rejected asset must never take the other ten down with it.

    Google usually names the operation index it hated, so that one is dropped and the rest are sent
    again. Some errors (CallAsset consent, for one) arrive with no index at all - then each asset is
    validated on its own to find which ones Google actually refuses."""
    refused = []
    for _ in range(attempts):
        if not ops:
            return None, [], refused
        try:
            return mutate(client, customer_id, ops, validate_only), plan, refused
        except GoogleAdsException as exc:
            reasons = {}
            for err in exc.failure.errors:
                for fp in (err.location.field_path_elements if err.location else []):
                    if fp.field_name == "operations" and fp.index is not None:
                        reasons[fp.index] = err.message
            if not reasons:
                reasons = probe_each(client, customer_id, ops)
                if not reasons:
                    report_failure(exc)
                    return None, [], refused
            for i in sorted(reasons):
                refused.append((plan[i][1], reasons[i]))
            ops = [o for i, o in enumerate(ops) if i not in reasons]
            plan = [p for i, p in enumerate(plan) if i not in reasons]
    return None, [], refused


def probe_each(client, customer_id, ops):
    """Validate one asset at a time to find which ones Google refuses. Used when the batch error
    carries no operation index, which is how the CallAsset consent error arrives."""
    bad = {}
    for i, op in enumerate(ops):
        try:
            mutate(client, customer_id, [op], validate_only=True)
        except GoogleAdsException as exc:
            bad[i] = exc.failure.errors[0].message if exc.failure.errors else "rejected by Google"
    return bad


def report_failure(exc):
    print(f"\n✗ Google rejected the write (request_id {exc.request_id}) - nothing was created:")
    for err in exc.failure.errors:
        print(f"  - {err.error_code}: {err.message}")
        if "LEAD_FORM_MISSING_AGREEMENT" in str(err.error_code):
            print("    Accept the Lead Form Terms of Service in the Google Ads UI first. "
                  "There is no API path for the agreement.")


def main():
    ap = argparse.ArgumentParser(description="Create every ad asset in ads-pending.md.")
    ap.add_argument("--file", default="ads-pending.md")
    ap.add_argument("--ad-group", required=True,
                    help="the ad group whose campaign the assets attach to, and whose ad copy the "
                         "callouts are checked against")
    ap.add_argument("--home-url", default=os.getenv("SITE_BASE_URL", ""))
    ap.add_argument("--business-name",
                    default=os.getenv("BUSINESS_NAME_ASSET", "") or os.getenv("BUSINESS_NAME", ""),
                    help="the business name ASSET, which must match the VERIFIED DOMAIN ROOT or the "
                         "verified legal entity exactly - 'acme.co', not 'Acme'. "
                         "Set BUSINESS_NAME_ASSET in .env; BUSINESS_NAME stays the brand name the "
                         "lead form uses. (Jono, 1 September 2026 - the brand name was disapproved.)")
    ap.add_argument("--logo", default=os.getenv("LOGO_PATH", ""),
                    help="square PNG or JPG. NEVER generate one without an explicit yes.")
    ap.add_argument("--privacy-url",
                    default=os.getenv("PRIVACY_POLICY_URL", "")
                    or (os.getenv("SITE_BASE_URL", "").rstrip("/") + "/privacy"
                        if os.getenv("SITE_BASE_URL") else ""))
    ap.add_argument("--call", default="",
                    help="the call asset number. Defaults to BUSINESS_PHONE in .env - never ask for "
                         "a value the repo already holds.")
    ap.add_argument("--message-number", "--whatsapp", dest="message_number",
                    default=os.getenv("MESSAGE_NUMBER", "") or os.getenv("WHATSAPP_NUMBER", ""),
                    help="the number that receives message replies. Falls back to BUSINESS_PHONE - "
                         "a normal GoHighLevel number texts fine, it does not have to be a "
                         "WhatsApp-only line. (Jono, 1 September 2026.)")
    ap.add_argument("--country", default=os.getenv("ADS_COUNTRY_CODE") or os.getenv("COUNTRY") or home_country() or "US",
                    help="two-letter country for the call and message assets. Default: COUNTRY in .env, else context/business.md")
    ap.add_argument("--starter-message", default="Hi, I'd like a quote.")
    ap.add_argument("--form-headline", default="Get your free graded audit")
    ap.add_argument("--form-description", default="Tell us where to send it. No sales call needed.")
    ap.add_argument("--form-cta", default="Send me the audit")
    ap.add_argument("--webhook-secret", default=os.getenv("LEAD_WEBHOOK_SECRET", ""),
                    help="the key your endpoint validates as google_key. Required with the webhook.")
    ap.add_argument("--skip", action="append", default=[],
                    choices=["sitelinks", "callouts", "snippets", "call", "leadform",
                             "businessname", "logo", "messages"],
                    help="leave one asset type out. ONLY when the owner asked for it in words.")
    ap.add_argument("--level", choices=["adgroup", "campaign"], default="adgroup",
                    help="AD GROUP is the default and the most granular level the API has. Only the "
                         "lead form, business name and logo go campaign-wide, because Google does "
                         "not accept them lower. --level campaign moves the rest up.")
    ap.add_argument("--push", action="store_true", help="actually create and link them")
    args = ap.parse_args()

    if not os.path.exists(args.file):
        sys.exit(f"No {args.file}. Run /write-ads first.")

    assets = parse_assets(args.file)
    # .env is the source of truth for the things the business already recorded. Read them before
    # asking - the last run asked Jono for a phone number and a business name that were both sitting
    # in .env the whole time. (1 September 2026.)
    def clean(number):
        return re.sub(r"[\s().-]", "", number or "")
    assets["call"] = clean(args.call) or clean(assets["call"]) or clean(os.getenv("BUSINESS_PHONE", ""))
    groups = [g for g in parse(args.file) if g["ad_group"].lower() == args.ad_group.lower()]
    ad_lines = {line["text"].strip().lower()
                for g in groups for ad in g["ads"]
                for line in ad["headlines"] + ad["descriptions"]}
    ad_urls = {g["final_url"].rstrip("/") for g in groups if g["final_url"].startswith("http")}
    sitelink_text = {s["text"].lower() for s in assets["sitelinks"]}
    home_url = (args.home_url or os.getenv("SITE_BASE_URL", "")).strip()
    opts = {"business_name": args.business_name.strip(), "logo": args.logo.strip(),
            "privacy_url": args.privacy_url.strip(), "whatsapp": clean(args.message_number) or clean(os.getenv("BUSINESS_PHONE", "")),
            "country": args.country, "starter_message": args.starter_message,
            "form_headline": args.form_headline, "form_description": args.form_description,
            "form_cta": args.form_cta, "webhook_secret": args.webhook_secret}

    print(f"Read {args.file}: {len(assets['sitelinks'])} sitelinks · {len(assets['callouts'])} "
          f"callouts · {len(assets['snippets'])} snippet headers · call "
          f"{assets['call'] or 'NONE'} · message {opts['whatsapp'] or assets['whatsapp'] or 'NONE'}\n")

    webhook = os.getenv("LEAD_WEBHOOK_URL", "").strip()
    name = opts["business_name"] or assets["business_name"]

    # Jono, 1 September 2026: this used to block the run. It reports instead. Everything that CAN be
    # created goes up; anything that cannot is listed at the end with the one thing that fixes it.
    gaps = []
    if len(assets["sitelinks"]) < SITELINKS_REQUIRED:
        gaps.append(f"only {len(assets['sitelinks'])} sitelinks written, six is the target · "
                    "Ad Strength wants six and Google's 3.5% figure is measured at six")
    if len(assets["callouts"]) < CALLOUTS_MIN:
        gaps.append(f"only {len(assets['callouts'])} callouts, build {CALLOUTS_MIN} to 10")
    if not assets["snippets"]:
        gaps.append("no structured snippets · add `- Service catalog:` with 3 to 10 values")
    if not assets["call"]:
        gaps.append("no call asset · set BUSINESS_PHONE in .env or pass --call. A trades lead is a "
                    "phone lead")
    if not name:
        gaps.append("no business name · set BUSINESS_NAME in .env. Name and logo carry Google's "
                    "largest published figure, 8% more conversions")
    if not opts["logo"]:
        gaps.append("no logo · set LOGO_PATH in .env or pass --logo. Square PNG or JPG, 1200x1200")
    if not (webhook and name and opts["privacy_url"] and opts["webhook_secret"]):
        gaps.append("lead form not built · needs LEAD_WEBHOOK_URL, LEAD_WEBHOOK_SECRET, a live "
                    "privacy policy URL and a business name")
    if not (opts["whatsapp"] or assets["whatsapp"]):
        gaps.append("no message asset · set MESSAGE_NUMBER or BUSINESS_PHONE in .env")
    if args.skip:
        print("!  Left out by explicit request: " + ", ".join(args.skip) + "\n")

    checked = {}
    problems = (check_sitelinks(assets, ad_urls, home_url, checked)
                + check_callouts(assets, ad_lines, sitelink_text)
                + check_snippets(assets)
                + check_identity(opts, assets))
    dropped = [s for s in assets["sitelinks"] if s.get("drop")]
    assets["sitelinks"] = [s for s in assets["sitelinks"] if not s.get("drop")]
    if problems:
        print("Not going up in this run, and why:")
        for p in problems:
            print("  -", p)
        print()
    if assets["sitelinks"] or assets["callouts"] or assets["snippets"] or assets["call"]:
        print(f"Building {len(assets['sitelinks'])} sitelinks · {len(assets['callouts'])} callouts · "
              f"{len(assets['snippets'])} snippets · call {'yes' if assets['call'] else 'no'}\n")

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    query = f"""
        SELECT ad_group.id, campaign.id, campaign.name FROM ad_group
        WHERE ad_group.name = '{args.ad_group.replace("'", "\\'")}' AND ad_group.status != 'REMOVED'
    """
    hits = [(r.campaign.id, r.campaign.name, r.ad_group.id)
            for r in ga.search(customer_id=customer_id, query=query)]
    if not hits:
        sys.exit(f"BLOCKED - ad group {args.ad_group!r} does not exist. This script does NOT create "
                 "it. Run /campaign-plan for the structure and /keywords for the keywords.")
    if len({c for c, _, _ in hits}) > 1:
        sys.exit(f"BLOCKED - {args.ad_group!r} exists in more than one campaign: "
                 + ", ".join(n for _, n, _ in hits))
    campaign_id, campaign_name, ad_group_id = hits[0]
    campaign = ga.campaign_path(customer_id, campaign_id)
    ad_group = ga.ad_group_path(customer_id, ad_group_id)

    siblings = [r.ad_group.name for r in ga.search(
        customer_id=customer_id,
        query=f"SELECT ad_group.name FROM ad_group WHERE campaign.id = {campaign_id} "
              "AND ad_group.status != 'REMOVED'")]
    print(f"Campaign {campaign_name!r} holds {len(siblings)} ad groups: {', '.join(siblings)}")
    if args.level == "campaign" and len(siblings) > 1:
        print("!  --level campaign puts these sitelinks, callouts and snippets in front of EVERY one")
        print("   of those ad groups. Only right if they are all the same theme.\n")
    else:
        print(f"   Service-specific assets go on {args.ad_group!r} only. "
              "Universal ones go campaign-wide.\n")

    for name_, key in (("sitelinks", "sitelinks"), ("callouts", "callouts"), ("snippets", "snippets")):
        if name_ in args.skip:
            assets[key] = []
    if "call" in args.skip:
        assets["call"] = ""
    if "logo" in args.skip:
        opts["logo"] = ""
    if "messages" in args.skip:
        opts["whatsapp"] = assets["whatsapp"] = ""
    if "businessname" in args.skip:
        opts["business_name"] = assets["business_name"] = ""
    if "leadform" in args.skip:
        opts["skip_lead_form"] = True

    seen = already_linked(client, customer_id, campaign_name, args.ad_group)
    skipped = drop_existing(assets, opts, seen)
    if skipped:
        print("Already attached, so not rebuilt:")
        for line in skipped:
            print("  -", line)
        print()

    ops, plan = build_ops(client, customer_id, assets, opts)
    if not ops:
        print("Everything in the file is already attached to the account. Nothing to add.")
        explain_statuses(client, customer_id, campaign_name, args.ad_group)
        return
    assert_assets_only(ops)
    # One rejected asset must never take the others down with it. Google names the operation index
    # it hated, so that one is dropped and the rest are sent again. (Jono, 1 September 2026.)
    _, plan, refused = push_what_google_accepts(client, customer_id, ops, plan, validate_only=True)
    if refused:
        print("Google refused these, so they are dropped and everything else still goes up:")
        for label, why in refused:
            print(f"  - {label} · {why}")
        print()
    survivors = {label for _, label in plan}
    all_ops, all_plan = build_ops(client, customer_id, assets, opts)
    ops = [o for o, (_, label) in zip(all_ops, all_plan) if label in survivors]
    plan = [pl for pl in all_plan if pl[1] in survivors]
    if not ops:
        print("Google refused every asset in this run. Each reason is above.")
        return
    print(f"✓ Google validated {len(ops)} assets (validate_only)\n")

    if not args.push:
        print(f"Nothing was created. These assets do NOT exist in {campaign_name}.")
        print("Run again with --push to create and link them.")
        if gaps:
            print("\nGaps that would remain, each a single fix:")
            for g in gaps:
                print("  -", g)
        return

    created, plan, refused = push_what_google_accepts(client, customer_id, ops, plan,
                                                     validate_only=False)
    if created is None:
        print("Nothing was created. Reasons above.")
        return
    for label, why in refused:
        print(f"!  dropped · {label} · {why}")
    resources = [r.asset_result.resource_name for r in created.mutate_operation_responses]

    links = link_ops(client, campaign, ad_group, resources, plan, args.level)
    assert_assets_only(links)
    # Linking gets the same treatment as creating: an asset that is already linked from an earlier
    # run must not stop the new ones going up. (Jono, 1 September 2026.)
    _, linked_plan, link_refused = push_what_google_accepts(client, customer_id, links, plan,
                                                           validate_only=False)
    for label, why in link_refused:
        note = " · already linked from an earlier run" if "ALREADY_EXISTS" in why.upper() else ""
        print(f"!  not linked · {label} · {why}{note}")

    linked_labels = {label for _, label in linked_plan}
    print(f"✓ CREATED {len(ops)} assets, {len(linked_labels)} newly linked on {campaign_name}:\n")
    lines = [f"{campaign_name} · "
             f"{args.ad_group + ' · ' if field_type in AD_GROUP_LEVEL and args.level == 'adgroup' else ''}"
             f"{label} · {resource.rsplit('/', 1)[-1]}"
             for (field_type, label), resource in zip(plan, resources)]
    for line in lines:
        print("  " + line)
    os.makedirs("context", exist_ok=True)
    with open(os.path.join("context", "ads-live.md"), "a", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")
    if gaps:
        print("\nHow to make this set stronger - each one is a single fix:")
        for g in gaps:
            print("  -", g)
    explain_statuses(client, customer_id, campaign_name, args.ad_group)
    print("\nLogged to context/ads-live.md. Now turn Google's automated versions off - "
          "code/disable_auto_assets.py.")


if __name__ == "__main__":
    main()
