"""Create the responsive search ads in Google Ads from ads-pending.md.

/write-ads WRITES the copy into ads-pending.md. This script CREATES it in the account.
Nothing is real until this runs and prints ad IDs.

    python3 code/push_ads.py --ad-group "SEO audit"           # validate only, nothing created
    python3 code/push_ads.py --ad-group "SEO audit" --push    # creates the two ads, PAUSED

One ad group and two ads per run. More than that needs --allow-batch, which is Jono's call and a
budget question first: a budget that funds one ad group properly starves three.

⛔ THIS SCRIPT NEVER CREATES A CAMPAIGN OR AN AD GROUP. EVER. UNDER ANY CIRCUMSTANCES.
It writes exactly one kind of entity: an ad, into an ad group that already exists and already has
keywords. Structure is `/campaign-plan`'s job and keywords are `/keywords`' job. An ad group that
does not exist is a STOP, never a thing to build on the way past - an ad group created here would
have no keywords behind it, so it would never serve, and the account would fill with empty shells.
(Jono, 1 September 2026.)

Rules enforced before anything is sent (they match .claude/commands/write-ads.md):
- 15 headlines, 4 descriptions per ad
- 2 or 3 keyword headlines pinned to HEADLINE_1, distinct text, and they are the only pins
  (google-ads.md section 5: that is the split test - Google rotates them and you learn which
  keyword line wins. Partial pinning beat full pinning $13.68 to $32.57 cost per lead, Optmyzr
  2026, and one pin is not a test.)
- no keyword insertion ({KeyWord:...}) - production rule, not a test slot
- headlines 30 chars, descriptions 90, counting an insertion tag as its fallback
- no duplicate lines inside an ad
- a final URL that returns 200 right now. No page for this ad group yet? It falls back to the
  home page as a placeholder (--home-url, or SITE_BASE_URL in .env) and every placeholder ad is
  named on the finish screen. A placeholder ad must be re-pointed before it is ever enabled.

Every ad lands PAUSED. Enabling is a separate, human decision after /landing-page's tracking gate passes.
"""

import argparse
import os
import re
import sys
import urllib.request
from collections import defaultdict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402

from google.ads.googleads.errors import GoogleAdsException  # noqa: E402

HEADLINE_MAX = 30
DESCRIPTION_MAX = 90
HEADLINES_PER_AD = 15
MAX_ADS_PER_GROUP = 2
PINS_MIN, PINS_MAX = 2, 3

# {loc_physical_ms} resolves to the geo criterion id of the click - never a city name, which is
# why the page needs geo-map.json to turn it back into one.
FINAL_URL_SUFFIX = "loc={loc_physical_ms}"
DESCRIPTIONS_PER_AD = 4

AD_GROUP_RE = re.compile(r"^#+\s*Ad group:\s*(.+?)\s*$")
AD_RE = re.compile(r"^#+\s*(Ad [A-Z])\b")
HEADLINES_RE = re.compile(r"^#+\s*\d*\s*headlines\s*$", re.I)
DESCRIPTIONS_RE = re.compile(r"^#+\s*\d*\s*descriptions\s*$", re.I)
NUMBERED_RE = re.compile(r"^\s*(\d+)\.\s+(.*\S)\s*$")
META_RE = re.compile(r"^\s+\d+\s*characters?\s*·")
FIELD_RE = re.compile(r"^\*\*(Final URL|Display path)[:*]*\**\s*:?\s*(.*\S)\s*$", re.I)
INSERTION_RE = re.compile(r"\{[A-Za-z]+\([^)]*\)\s*:?([^}]*)\}|\{KeyWord\s*:\s*([^}]*)\}")


def effective_len(text):
    """An insertion tag serves as its fallback, so that is what counts."""
    return len(INSERTION_RE.sub(lambda m: m.group(1) or m.group(2) or "", text))


def pick_url(value):
    """A Final URL line can carry notes ('localhost:3000 (live: https://...)'). Take the URL
    Google can actually reach - never localhost, which resolves on this machine only."""
    urls = re.findall(r"https?://[^\s)\],]+", value)
    reachable = [u for u in urls if "localhost" not in u and "127.0.0.1" not in u]
    return (reachable or urls or [value])[0].rstrip(".,")


def parse(path):
    """ads-pending.md -> [{ad_group, final_url, path1, path2, ads: [{name, headlines, descriptions}]}]"""
    groups, group, ad, bucket = [], None, None, None
    for raw in open(path, encoding="utf-8").read().splitlines():
        m = AD_GROUP_RE.match(raw)
        if m:
            group = {"ad_group": m.group(1), "final_url": "", "path1": "", "path2": "", "placeholder": False, "placeholder_reason": "", "ads": []}
            groups.append(group)
            ad = bucket = None
            continue
        if group is None:
            continue
        m = FIELD_RE.match(raw)
        if m:
            key, value = m.group(1).lower(), m.group(2).strip()
            if key == "final url":
                group["final_url"] = pick_url(value)
            else:
                parts = [p for p in value.strip("/").split("/") if p]
                group["path1"] = parts[0] if parts else ""
                group["path2"] = parts[1] if len(parts) > 1 else ""
            continue
        m = AD_RE.match(raw)
        if m:
            ad = {"name": m.group(1), "headlines": [], "descriptions": []}
            group["ads"].append(ad)
            bucket = None
            continue
        if HEADLINES_RE.match(raw):
            bucket = "headlines"
            continue
        if DESCRIPTIONS_RE.match(raw):
            bucket = "descriptions"
            continue
        if ad is None or bucket is None:
            continue
        if META_RE.match(raw):
            if bucket == "headlines" and ad["headlines"] and "PIN H1" in raw.upper():
                ad["headlines"][-1]["pinned"] = True
            continue
        m = NUMBERED_RE.match(raw)
        if m:
            ad[bucket].append({"text": m.group(2), "pinned": False})
    return [g for g in groups if g["ads"]]


def url_is_live(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (push_ads.py)"})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return resp.status, ""
    except Exception as exc:  # noqa: BLE001 - any failure means Google will reject it too
        return None, str(exc)


def resolve_final_url(group, checked_urls, home_url):
    """Jono's rule (1 September 2026): an ad group with no page of its own - or one that does not
    load - points at the HOME PAGE as a placeholder so the ad can still be created. Placeholder ads
    are named on the finish screen and must be re-pointed before they are ever enabled."""
    def live(url):
        if url not in checked_urls:
            checked_urls[url] = url_is_live(url)
        return checked_urls[url]

    url = group["final_url"]
    if url.lower().startswith("http"):
        status, err = live(url)
        if status == 200:
            return []
        group["placeholder_reason"] = f"its own page is dead ({status or err})"
    else:
        group["placeholder_reason"] = "no page built for it yet"

    if not home_url:
        return [f"{group['ad_group']}: {group['placeholder_reason']} and no home page to fall back on - "
                "pass --home-url or set SITE_BASE_URL in .env"]
    status, err = live(home_url)
    if status != 200:
        return [f"{group['ad_group']}: {group['placeholder_reason']}, and the home page placeholder "
                f"is dead too: {home_url} -> {status or err}. Deploy the site first."]
    group["final_url"] = home_url
    group["placeholder"] = True
    return []


def validate(group, ad):
    """Every rule that can be checked without spending an API call."""
    problems = []
    where = f"{group['ad_group']} · {ad['name']}"
    heads, descs = ad["headlines"], ad["descriptions"]

    if len(heads) != HEADLINES_PER_AD:
        problems.append(f"{len(heads)} headlines, need {HEADLINES_PER_AD}")
    if len(descs) != DESCRIPTIONS_PER_AD:
        problems.append(f"{len(descs)} descriptions, need {DESCRIPTIONS_PER_AD}")

    # google-ads.md section 5: 2 or 3 distinct keyword lines pinned to HEADLINE_1, nothing else.
    pinned = [i for i, h in enumerate(heads) if h["pinned"]]
    if not 2 <= len(pinned) <= 3:
        problems.append(f"{len(pinned)} headlines pinned to HEADLINE_1, need 2 or 3 · they are the "
                        "split test, Google rotates them and you learn which keyword line wins")
    if pinned and pinned != list(range(len(pinned))):
        problems.append("the pinned keyword headlines must be the first ones in the list, "
                        f"they are at {[i + 1 for i in pinned]}")
    pinned_text = [heads[i]["text"].strip().lower() for i in pinned]
    if len(set(pinned_text)) != len(pinned_text):
        problems.append("two pinned headlines have identical text - Google's guidance is distinct lines")

    for h in heads:
        if effective_len(h["text"]) > HEADLINE_MAX:
            problems.append(f"headline {effective_len(h['text'])} chars: {h['text']!r}")
        if "{KeyWord" in h["text"]:
            problems.append(f"keyword insertion is a production rule against: {h['text']!r}")
    for d in descs:
        if len(d["text"]) > DESCRIPTION_MAX:
            problems.append(f"description {len(d['text'])} chars: {d['text']!r}")

    for label, lines in (("headline", heads), ("description", descs)):
        seen = set()
        for line in lines:
            key = line["text"].strip().lower()
            if key in seen:
                problems.append(f"duplicate {label}: {line['text']!r}")
            seen.add(key)

    return [f"{where}: {p}" for p in problems]


def keyword_counts(client, customer_id, ad_group_ids):
    """An ad group with no keywords cannot serve, so an ad in it is dead on arrival."""
    ga = client.get_service("GoogleAdsService")
    ids = ", ".join(str(i) for i in ad_group_ids)
    query = f"""
        SELECT ad_group.id, ad_group_criterion.criterion_id
        FROM ad_group_criterion
        WHERE ad_group.id IN ({ids})
          AND ad_group_criterion.type = 'KEYWORD'
          AND ad_group_criterion.negative = FALSE
          AND ad_group_criterion.status != 'REMOVED'
    """
    counts = defaultdict(int)
    for row in ga.search(customer_id=customer_id, query=query):
        counts[row.ad_group.id] += 1
    return counts


def assert_ads_only(ops):
    """Belt and braces on the rule above: the only operation this script may ever send is the
    creation of an ad inside an existing ad group. Anything else is a bug, and it stops here."""
    for op in ops:
        which = op._pb.WhichOneof("operation")
        if which != "ad_group_ad_operation":
            sys.exit(f"REFUSING TO SEND: built a {which}. This script only ever creates ads - "
                     "never campaigns, never ad groups.")
        if op.ad_group_ad_operation._pb.WhichOneof("operation") != "create":
            sys.exit("REFUSING TO SEND: this script only creates ads, it never edits or removes them.")


def resolve_ad_groups(client, customer_id, names):
    ga = client.get_service("GoogleAdsService")
    quoted = ", ".join("'" + n.replace("'", "\\'") + "'" for n in names)
    query = f"""
        SELECT ad_group.id, ad_group.name, campaign.name
        FROM ad_group
        WHERE ad_group.name IN ({quoted}) AND ad_group.status != 'REMOVED'
    """
    found = defaultdict(list)
    for row in ga.search(customer_id=customer_id, query=query):
        found[row.ad_group.name].append((row.ad_group.id, row.campaign.name))
    return found


def build_operation(client, customer_id, ad_group_id, group, ad):
    ga = client.get_service("GoogleAdsService")
    enums = client.enums
    op = client.get_type("MutateOperation")
    ada = op.ad_group_ad_operation.create
    ada.ad_group = ga.ad_group_path(customer_id, ad_group_id)
    ada.status = enums.AdGroupAdStatusEnum.PAUSED
    ada.ad.final_urls.append(group["final_url"])
    # Carry the searcher's location through to the landing page so its H1 can say their city.
    # ValueTrack belongs in the final URL SUFFIX, not glued onto the URL itself - Google appends
    # it to every destination and it survives a URL change. `?loc=` is read by
    # website/components/lp/City.tsx against the map from code/build_geo_map.py.
    # (Jono, 2 September 2026.)
    ada.ad.final_url_suffix = FINAL_URL_SUFFIX
    rsa = ada.ad.responsive_search_ad
    for h in ad["headlines"]:
        asset = client.get_type("AdTextAsset")
        asset.text = h["text"]
        if h["pinned"]:
            asset.pinned_field = enums.ServedAssetFieldTypeEnum.HEADLINE_1
        rsa.headlines.append(asset)
    for d in ad["descriptions"]:
        asset = client.get_type("AdTextAsset")
        asset.text = d["text"]
        rsa.descriptions.append(asset)
    if group["path1"]:
        rsa.path1 = group["path1"][:15]
    if group["path2"]:
        rsa.path2 = group["path2"][:15]
    return op


def mutate(client, customer_id, ops, validate_only):
    ga = client.get_service("GoogleAdsService")
    req = client.get_type("MutateGoogleAdsRequest")
    req.customer_id = customer_id
    req.mutate_operations.extend(ops)
    req.validate_only = validate_only
    req.partial_failure = False
    return ga.mutate(request=req)


def report_failure(exc):
    print(f"\n✗ Google rejected the write (request_id {exc.request_id}) - nothing was created:")
    for err in exc.failure.errors:
        loc = ""
        if err.location:
            loc = ",".join(str(fp.index) for fp in err.location.field_path_elements
                           if fp.index is not None)
        print(f"  - [{loc}] {err.error_code}: {err.message}")


def main():
    ap = argparse.ArgumentParser(description="Create the RSAs in ads-pending.md in Google Ads.")
    ap.add_argument("--file", default="ads-pending.md")
    ap.add_argument("--ad-group", action="append", default=[],
                    help="the ad group to push. One per run - that is the rule, not a suggestion.")
    ap.add_argument("--allow-batch", action="store_true",
                    help="push more than one ad group in a run. Only when the owner asked for more than "
                         "one in words, and only when the budget funds them.")
    ap.add_argument("--home-url", default=os.getenv("SITE_BASE_URL", ""),
                    help="home page used as the placeholder final URL for an ad group whose "
                         "landing page does not exist yet. Defaults to SITE_BASE_URL in .env.")
    ap.add_argument("--push", action="store_true",
                    help="actually create the ads. Without it this is validate-only.")
    args = ap.parse_args()

    if not os.path.exists(args.file):
        sys.exit(f"No {args.file}. Run /write-ads first - this script only pushes what it wrote.")

    groups = parse(args.file)
    if args.ad_group:
        wanted = {n.lower() for n in args.ad_group}
        groups = [g for g in groups if g["ad_group"].lower() in wanted]
    if not groups:
        sys.exit("No ad groups matched. Check the '# Ad group: <name>' headings in the file.")

    print(f"Read {args.file}: {len(groups)} ad groups, "
          f"{sum(len(g['ads']) for g in groups)} ads.\n")

    # Jono's rule (1 September 2026): one ad group, two ads. Ad groups cost budget, and a budget that
    # funds one properly starves three - so widening the scope is a decision he makes, never a default.
    if not args.allow_batch:
        if len(groups) > 1:
            print("BLOCKED - this run covers more than one ad group:")
            for g in groups:
                print(f"  - {g['ad_group']}")
            print("\nOne ad group per run. Pass --ad-group \"<name>\" to pick one.")
            print("Genuinely pushing several? --allow-batch, and check the budget funds them first.")
            sys.exit(1)
        over = [g for g in groups if len(g["ads"]) > MAX_ADS_PER_GROUP]
        if over:
            for g in over:
                print(f"BLOCKED - {g['ad_group']} has {len(g['ads'])} ads. "
                      f"The number is {MAX_ADS_PER_GROUP}: two RSAs per ad group, no more.")
            print("\nThree ads fragment the data - Optmyzr's 13,671-account study says conversion rate")
            print("peaks at two. Cut the extras, or --allow-batch if you know why you are overriding it.")
            sys.exit(1)

    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.getcwd(), ".env"))
    home_url = (args.home_url or os.getenv("SITE_BASE_URL", "")).strip()

    checked_urls, problems = {}, []
    for g in groups:
        problems += resolve_final_url(g, checked_urls, home_url)
        for ad in g["ads"]:
            problems += validate(g, ad)
    if problems:
        print("BLOCKED - fix these before anything can be created:")
        for p in problems:
            print("  -", p)
        sys.exit(1)
    print("✓ Local checks passed (counts, limits, 2-3 pins on HEADLINE_1, no insertion, URLs live)\n")

    placeholders = [g for g in groups if g.get("placeholder")]
    if placeholders:
        print(f"!  {len(placeholders)} ad groups point at the HOME PAGE as a placeholder:")
        for g in groups:
            if g.get("placeholder"):
                print(f"   - {g['ad_group']} · {g['placeholder_reason']} -> {home_url}")
        print("   These are placeholders. Run /landing-page and re-point them BEFORE enabling.\n")

    client, customer_id = load_client()
    if not customer_id:
        sys.exit("No GOOGLE_ADS_CUSTOMER_ID in ./.env")

    found = resolve_ad_groups(client, customer_id, [g["ad_group"] for g in groups])
    missing = [g["ad_group"] for g in groups if g["ad_group"] not in found]
    if missing:
        print("BLOCKED - these ad groups do not exist in the account:")
        for name in missing:
            print(f"  - {name}")
        print("\nThis script does NOT create them, and never will - an ad group built here would have")
        print("no keywords behind it and would never serve. Run /campaign-plan for the structure and")
        print("/keywords for the keywords, then run this again.")
        sys.exit(1)
    ambiguous = [n for n, hits in found.items() if len(hits) > 1]
    if ambiguous:
        print("BLOCKED - the same ad group name exists in more than one campaign:")
        for name in ambiguous:
            for ag_id, camp in found[name]:
                print(f"  - {name}: id {ag_id} in {camp}")
        sys.exit(1)

    ag_ids = [found[g["ad_group"]][0][0] for g in groups]
    counts = keyword_counts(client, customer_id, ag_ids)
    empty = [(g["ad_group"], found[g["ad_group"]][0][0]) for g in groups
             if counts.get(found[g["ad_group"]][0][0], 0) == 0]
    if empty:
        print("BLOCKED - these ad groups have no keywords, so an ad in them can never serve:")
        for name, ag_id in empty:
            print(f"  - {name} (id {ag_id}) · 0 keywords")
        print("\nRun /keywords for this ad group first. Ads are not the missing piece here.")
        sys.exit(1)

    ops, index = [], []
    for g in groups:
        ag_id, campaign = found[g["ad_group"]][0]
        for ad in g["ads"]:
            ops.append(build_operation(client, customer_id, ag_id, g, ad))
            index.append((campaign, g["ad_group"], ad["name"], g.get("placeholder", False)))

    assert_ads_only(ops)
    try:
        mutate(client, customer_id, ops, validate_only=True)
    except GoogleAdsException as exc:
        report_failure(exc)
        sys.exit(1)
    print(f"✓ Google validated all {len(ops)} ads (validate_only) - no policy or format rejections\n")

    if not args.push:
        print("Nothing was created. These ads do NOT exist in the account.")
        print("Run again with --push to create them (they land PAUSED).")
        return

    try:
        response = mutate(client, customer_id, ops, validate_only=False)
    except GoogleAdsException as exc:
        report_failure(exc)
        sys.exit(1)

    print(f"✓ CREATED {len(ops)} ads in Google Ads, all PAUSED:\n")
    lines = []
    for (campaign, ad_group, ad_name, placeholder), result in zip(index, response.mutate_operation_responses):
        resource = result.ad_group_ad_result.resource_name
        ad_id = resource.rsplit("~", 1)[-1]
        flag = " · HOME PAGE PLACEHOLDER, re-point before enabling" if placeholder else ""
        line = f"{campaign} · {ad_group} · {ad_name} · ad id {ad_id} · PAUSED{flag}"
        lines.append(line)
        print("  " + line)

    os.makedirs("context", exist_ok=True)
    with open(os.path.join("context", "ads-live.md"), "a", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")
    print("\nLogged to context/ads-live.md. Verify in the account, then pass /landing-page's tracking gate before enabling anything.")


if __name__ == "__main__":
    main()
