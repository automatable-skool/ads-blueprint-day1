"""Build the optimized champion/challenger RSAs from ad-library.md via the Google Ads API.

Per google-ads.md (followed exactly):
- 2 RSAs per ad group: CHAMPION (best culled lines) + CHALLENGER (next batch) - §9
- 15 headlines each: 3 keyword variants pinned to HEADLINE_1 only (incl. DKI) + 12 unpinned - §2.1, §4
- 4 descriptions each, distinct angles; both RSAs share the final URL - §3, §9
- §9 self-review checklist runs as a validator before any API call
- EVERYTHING lands PAUSED

Guardrails applied:
- business.md rule: no ads for areas not in business.md -> out-of-area ad groups are
  SKIPPED and reported (their starter ads left untouched for the user's decision).
- proof.md: 60-minute response lines serve ONLY in the Emergency | Toronto ad group.
- "Licensed Toronto plumbers" description only in Toronto-proper ad groups.
- Replaces the placeholder starter RSAs in the groups it builds (starter copy is
  preserved in build_campaigns.py).

Final URL stays the deploy placeholder used by build_campaigns.py - swap before enabling.
"""

import os
import re
import sys
from collections import defaultdict

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

load_dotenv()

config = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
    "use_proto_plus": True,
}
client = GoogleAdsClient.load_from_dict(config)
customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")

# The landing page is built BEFORE the ads (/landing-page runs before /write-ads), so the
# real URL should exist by now. Google rejects non-resolving domains at creation
# (DESTINATION_NOT_WORKING), which is why a placeholder ever existed - it is a fallback,
# not the normal path.
FINAL_URL = os.getenv("AD_FINAL_URL") or os.getenv("SITE_BASE_URL") or ""
if not FINAL_URL:
    sys.exit(
        "No landing page URL. Set AD_FINAL_URL (this ad group's page) or SITE_BASE_URL in .env.\n"
        "Run /landing-page first - ads built against a placeholder have to be re-pointed later\n"
        "and get enabled pointing at the wrong page more often than anyone admits.\n"
        "Deliberately building ads before the page exists? Set AD_FINAL_URL=https://example.com\n"
        "and they will be re-pointed by build_assets.py."
    )
if "example.com" in FINAL_URL:
    print("!  Building ads against the example.com placeholder. These CANNOT be enabled until\n"
          "   build_assets.py re-points them at the real page. Run /landing-page.\n")

# business.md service area (Toronto + boroughs, and the named GTA cities).
# Everything else = out of area -> ad group skipped, flagged for user decision.
TORONTO_PROPER = {"Toronto", "Downtown Toronto", "East York", "North York",
                  "Etobicoke", "Scarborough", "York"}
IN_AREA = TORONTO_PROPER | {"Mississauga", "Brampton", "Vaughan", "Woodbridge",
                            "Thornhill", "Richmond Hill", "Markham"}

CAPS_OK = {"GTA", "WSIB", "BBB", "HVAC", "ASAP", "AM", "PM"}


def city_slug(city):
    slug = city.lower().replace(" ", "-")
    return slug if len(slug) <= 15 else slug.split("-")[0][:15]


# ---------------------------------------------------------------- copy (ad-library.md survivors, verbatim)

def generic_ads(city):
    to = city in TORONTO_PROPER
    pins = ([f"Plumber {city}", f"{city} Plumber", "{KeyWord:Plumber}"]
            if city else ["Licensed Plumber", "Plumbing Services", "{KeyWord:Plumber}"])
    champ_h = [
        "Fixed right or it's free", "2-year labour warranty",
        "Price approved before work", "Evenings cost the same",
        "$5M liability insurance", "BBB A+ since 2016",
        "4.9 Stars, 287 reviews", "12,000+ Jobs completed",
        "Open Mon-Sat, 7 to 7", "Track your plumber live",
        "10% seniors discount", "Book online in minutes",
    ]
    chall_h = [
        "90-day fix-it-free promise", "HomeStars winner 2022-2024",
        "Background-checked techs", "Master plumber on record",
        "No hidden fees, ever", "No overtime charges",
        "Upfront flat-rate pricing", "Free in-person quotes",
        "Family-owned since 2012", "Same-day plumbing service",
        "Talk to a real dispatcher", "Text us a photo of it",
    ]
    trust_desc = ("Licensed Toronto plumbers with upfront flat-rate pricing. 4.9 stars from 287 reviews."
                  if to else
                  "Licensed, insured, bonded - $5M liability coverage on every single job.")
    champ_d = [
        "Fixed right or it's free - if it recurs within 90 days, we return at no charge.",
        trust_desc,
        "Same-day plumbing across the GTA. Price approved by you before any work starts.",
        "Book by phone, text or online. Live tracking shows exactly when we arrive.",
    ]
    chall_d = [
        "No overtime charges, ever - evenings and weekends cost the same as weekdays.",
        "Background-checked, uniformed technicians. Know who's coming to your door.",
        "Seniors save 10% on labour. Free estimates on all non-emergency visits.",
        "Free quote first. Flat rate agreed. Work guaranteed 2 years. That's the deal.",
    ]
    return pins, (champ_h, champ_d), (chall_h, chall_d), "plumber"


def emergency_ads(city):
    to = city == "Toronto"  # proof.md: 60-min response inside Toronto ONLY
    pins = ([f"Emergency Plumber {city}", f"{city} Emergency Plumber", "{KeyWord:Emergency Plumber}"]
            if city else ["Emergency Plumber", "24 Hour Plumber", "{KeyWord:Emergency Plumber}"])
    champ_h = [
        "60-Min response in Toronto" if to else "Same-day emergency service",
        "We pick up at 2 AM", "2 AM costs what 2 PM costs",
        "No emergency surcharge", "Fixed right or it's free",
        "2-year labour warranty", "$5M liability insurance",
        "Background-checked techs", "4.9 Stars, 287 reviews",
        "12,000+ Jobs completed", "14 Years of 2 AM calls",
        "Call now - we're awake",
    ]
    chall_h = [
        "The 3 AM plumbers", "Track your plumber live",
        "Open now - 24/7, 365", "Burst pipe? On our way",
        "Water everywhere? Call now", "Stop the leak tonight",
        "No overtime charges, ever", "Upfront price before work",
        "90-day fix-it-free promise", "BBB A+ since 2016",
        "HomeStars winner 2022-2024", "Call now, sleep tonight",
    ]
    champ_d = [
        ("On site within 60 minutes inside Toronto. 24/7, 365 days a year." if to else
         "Emergency response across the GTA - same-day, day or night, every day."),
        "No overtime charges ever: 2 AM costs exactly what 2 PM costs.",
        "Burst pipe? Flooding basement? Real humans answer 24/7. Call now.",
        "Licensed, insured emergency plumbers - $5M coverage, background-checked.",
    ]
    chall_d = [
        "Fixed right or it's free, backed by a 2-year labour warranty.",
        "Live tracking link shows your plumber's ETA the moment we dispatch.",
        "4.9 stars from 287 reviews. 12,000+ jobs. We've seen your emergency before.",
        "We stop the damage first: shut-off, containment, then the real repair.",
    ]
    return pins, (champ_h, champ_d), (chall_h, chall_d), "emergency"


def drain_ads(city):
    pins = ([f"Drain Cleaning {city}", f"{city} Drain Cleaning", "{KeyWord:Drain Cleaning}"]
            if city else ["Drain Cleaning", "Drain Snaking", "{KeyWord:Drain Cleaning}"])
    champ_h = [
        "Clog back in 90 days? Free", "Price approved before work",
        "$5M liability insurance", "4.9 Stars, 287 reviews",
        "12,000+ Jobs completed", "Same-day drain cleaning",
        "Cleared the day you call", "Camera drain inspections",
        "We scope before we snake", "Priced by job, not hour",
        "10% seniors discount", "Book online in minutes",
    ]
    chall_h = [
        "Fixed right or it's free", "2-year labour warranty",
        "BBB A+ since 2016", "Background-checked techs",
        "HomeStars winner 2022-2024", "Track your plumber live",
        "Camera proof of the clog", "Find it first, fix it once",
        "Draining slow? Fixed today", "No hidden fees, ever",
        "Stop plunging. Call us", "Book before it backs up",
    ]
    champ_d = [
        "Clog back within 90 days? We come back and clear it free.",
        "We scope before we snake: right diagnosis, right tool, one visit.",
        "Same-day drain cleaning and snaking, GTA-wide. Upfront flat-rate price.",
        "Text a photo of the drain and we arrive with the right machine.",
    ]
    chall_d = [
        "Camera inspection finds the real blockage - see the clog on screen.",
        "Flat rate approved by you before the snake comes off the van.",
        "Licensed drain plumbers - not a franchise, not a rental snake.",
        "4.9 stars from 287 reviews. 12,000+ jobs including thousands of drains.",
    ]
    return pins, (champ_h, champ_d), (chall_h, chall_d), "drain-cleaning"


BUILDERS = {"Plumber (Generic)": generic_ads,
            "Emergency Plumber": emergency_ads,
            "Drain Cleaning": drain_ads}

BANNED = [r"!", r"#1", r"\bbest\b", r"\btop.rated\b", r"\blowest\b", r"\bcheapest\b",
          r"(?<!\d)\d{3}[-. ]\d{4}(?!\d)", r"[→★]", r"\.\.\.", r"\bguaranteed cheapest\b"]


def effective_len(h):
    """DKI counts as its fallback text for the 30-char check."""
    m = re.fullmatch(r"\{KeyWord:(.+)\}", h)
    return len(m.group(1)) if m else len(h)


def validate_ad(campaign, group, pins, heads, descs):
    """google-ads.md §9 checklist, automated."""
    problems = []
    all_h = pins + heads
    if len(all_h) != 15:
        problems.append(f"{len(all_h)} headlines (need 15)")
    if len(descs) != 4:
        problems.append(f"{len(descs)} descriptions (need 4)")
    if len(set(all_h)) != len(all_h) or len(set(descs)) != len(descs):
        problems.append("duplicate asset within ad")
    for h in all_h:
        if effective_len(h) > 30:
            problems.append(f"headline >30: '{h}' ({effective_len(h)})")
        for w in re.findall(r"\b[A-Z]{2,}\b", re.sub(r"\{KeyWord:[^}]+\}", "", h)):
            if w not in CAPS_OK:
                problems.append(f"caps word '{w}' in '{h}'")
    for d in descs:
        if len(d) > 90:
            problems.append(f"description >90: '{d}' ({len(d)})")
    for t in all_h + descs:
        for pat in BANNED:
            if re.search(pat, t, re.I):
                problems.append(f"banned {pat!r} in '{t}'")
    return [f"{campaign} | {group}: {p}" for p in problems]


# ---------------------------------------------------------------- account state
ga = client.get_service("GoogleAdsService")
enums = client.enums

Q = """
SELECT campaign.name, ad_group.id, ad_group.name, ad_group_ad.ad.id
FROM ad_group_ad
WHERE campaign.name IN ('Emergency Plumber','Plumber (Generic)','Drain Cleaning')
  AND ad_group_ad.status != 'REMOVED'
ORDER BY campaign.name, ad_group.name
"""


def main():
    groups = defaultdict(list)
    for row in ga.search(customer_id=customer_id, query=Q):
        groups[(row.campaign.name, row.ad_group.name, row.ad_group.id)].append(row.ad_group_ad.ad.id)

    plan, skipped, problems = [], [], []
    for (camp, ag_name, ag_id), old_ads in sorted(groups.items()):
        label = ag_name.split(" | ")[-1]
        city = None if label == "Core" else label
        if city and city not in IN_AREA:
            skipped.append((camp, ag_name))
            continue
        pins, champ, chall, path1 = BUILDERS[camp](city)
        p2 = city_slug(city) if city else None
        for role, (heads, descs) in (("champion", champ), ("challenger", chall)):
            problems += validate_ad(camp, ag_name, pins, heads, descs)
        plan.append((camp, ag_name, ag_id, old_ads, pins, champ, chall, path1, p2))

    if problems:
        print("VALIDATION FAILED (§9 checklist):")
        for p in problems:
            print("  -", p)
        sys.exit(1)
    print(f"✓ §9 validation passed for {len(plan) * 2} RSAs across {len(plan)} ad groups\n")

    # one mutate per campaign: create champion+challenger, remove starter ads
    by_camp = defaultdict(list)
    for item in plan:
        by_camp[item[0]].append(item)

    for camp, items in by_camp.items():
        ops = []
        n_new = n_removed = 0
        for _, ag_name, ag_id, old_ads, pins, champ, chall, path1, p2 in items:
            ag_rn = ga.ad_group_path(customer_id, ag_id)
            for heads, descs in (champ, chall):
                op = client.get_type("MutateOperation")
                ada = op.ad_group_ad_operation.create
                ada.ad_group = ag_rn
                ada.status = enums.AdGroupAdStatusEnum.PAUSED
                ada.ad.final_urls.append(FINAL_URL)
                rsa = ada.ad.responsive_search_ad
                for h in pins:
                    a = client.get_type("AdTextAsset")
                    a.text = h
                    a.pinned_field = enums.ServedAssetFieldTypeEnum.HEADLINE_1
                    rsa.headlines.append(a)
                for h in heads:
                    a = client.get_type("AdTextAsset")
                    a.text = h
                    rsa.headlines.append(a)
                for d in descs:
                    a = client.get_type("AdTextAsset")
                    a.text = d
                    rsa.descriptions.append(a)
                rsa.path1 = path1
                if p2:
                    rsa.path2 = p2
                ops.append(op)
                n_new += 1
            for ad_id in old_ads:
                op = client.get_type("MutateOperation")
                op.ad_group_ad_operation.remove = ga.ad_group_ad_path(customer_id, ag_id, ad_id)
                ops.append(op)
                n_removed += 1

        print(f"→ {camp}: {len(items)} ad groups, +{n_new} RSAs (paused), "
              f"-{n_removed} starter RSAs ... ", end="", flush=True)
        req = client.get_type("MutateGoogleAdsRequest")
        req.customer_id = customer_id
        req.mutate_operations.extend(ops)
        try:
            ga.mutate(request=req)
            print("✓")
        except GoogleAdsException as e:
            print(f"\n✗ FAILED atomically (request_id {e.request_id}) - rolled back:")
            for err in e.failure.errors:
                loc = ",".join(str(fp.index) for fp in err.location.field_path_elements
                               if fp.index is not None) if err.location else ""
                print(f"  - [{loc}] {err.error_code}: {err.message}")
            sys.exit(1)

    print(f"\n✓ Built {len(plan) * 2} RSAs in {len(plan)} ad groups. EVERYTHING PAUSED.")
    if skipped:
        print(f"\n⚠ SKIPPED {len(skipped)} ad groups - city not in business.md service area")
        print("  (starter ads left untouched; expand business.md or remove these groups):")
        for camp, ag in skipped:
            print(f"  - {camp} | {ag}")


if __name__ == "__main__":
    main()
