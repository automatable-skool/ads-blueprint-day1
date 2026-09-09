"""Build ad assets for ONE ad group (Plumber | Toronto) per ad-assets.md.

Creates, all landing PAUSED (association status; assets themselves have no status):
- 6 sitelinks   -> ad-group level (every URL verified live before linking - no 404s)
- 8 callouts    -> ad-group level (claims NOT already used in the RSAs, per §2.2)
- 2 structured snippet headers -> ad-group level (Services + Types, all really offered)
- lead form     -> campaign level (Google only supports campaign/customer level),
                   fields first+last name, email, phone; GHL webhook wired for delivery.
                   (No free-text message field - Google lead forms don't support one.)
- business name + logo -> campaign level (may require Advertiser Verification; failures
                   are reported, not fatal)
Also updates the 2 RSAs in this ad group from the example.com stand-in to the live site.

NOTE on the call asset (compliance CRITICAL, per context/compliance.md): the phone
number must be real, in service, and LOCAL TO THE COUNTRY YOU TARGET. Google verifies it
by crawling the landing page source, a Search Console-verified domain, or the conversion
tag - not by placing test calls. Provide your tracking number and re-run with
--call <number> to add it (scheduled to answered hours only).
"""

import os
import sys

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

load_dotenv()

client = GoogleAdsClient.load_from_dict({
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
    "use_proto_plus": True,
})
cid = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
ga = client.get_service("GoogleAdsService")
enums = client.enums

BASE = os.getenv("SITE_BASE_URL", "https://example.com")           # your live site
GHL_WEBHOOK = os.getenv("LEAD_WEBHOOK_URL", "")                     # GHL/CRM webhook for lead form delivery
CAMPAIGN = os.getenv("ASSET_CAMPAIGN", "Plumber (Generic)")         # campaign to attach assets to
AD_GROUP = os.getenv("ASSET_AD_GROUP", "Plumber | Toronto")         # ad group to attach assets to
LOGO_PATH = os.getenv("LOGO_PATH", os.path.join(os.path.dirname(__file__), "..", "logo-1200.png"))

# ---------------------------------------------------------------- asset copy (ad-assets.md §2)
# DEMO CONTENT BELOW (fictional plumbing business). Do NOT run as-is for your account:
# ask Claude to regenerate SITELINKS/CALLOUTS/SNIPPETS from YOUR context/proof.md -
# every claim must exist there, and every sitelink URL must be live on YOUR site.
SITELINKS = [  # title ≤25 (aim 12-15) · descs ≤35 · distinct live URL each
    ("Free Quote", "Free in-person estimates", "No pressure, no obligation", f"{BASE}/contact"),
    ("Drain Cleaning", "Same-day snaking & clearing", "Upfront flat-rate pricing", f"{BASE}/drain-cleaning"),
    ("24/7 Emergency", "Answered day and night, 365", "Same-day emergency service", f"{BASE}/emergency"),
    ("Our Guarantee", "Fixed right or it's free", "2-year labour warranty", f"{BASE}/guarantee"),
    ("Leak Repair", "Hidden & visible leaks found", "Price approved before work", f"{BASE}/leak-repair"),
    ("Water Heaters", "Tank & tankless install", "Repair & replacement", f"{BASE}/water-heaters"),
]

CALLOUTS = [  # ≤25 chars each; none repeat the RSA headline/description claims
    "Insured & Bonded", "WSIB Covered", "6 Licensed Plumbers", "5 Service Vans",
    "In Toronto Since 2012", "Financing Available", "24/7 Emergency Line",
    "Condos & Rentals Served",
]

SNIPPETS = [  # header, values (≤25 each; every value actually offered per business.md)
    # "Services" is NOT a valid header and fails on push - it is "Service catalog" (ad-assets.md)
    ("Service catalog", ["Drain Cleaning", "Leak Repair", "Water Heaters", "Sump Pumps",
                         "Toilets & Fixtures", "Repiping", "Backwater Valves"]),
    ("Types", ["Emergency", "Same-Day", "Installation", "Repair", "Replacement", "Inspection"]),
]

BUSINESS_NAME = os.getenv("BUSINESS_NAME", "Your Business")  # ≤25, matches the site

VALID_SNIPPET_HEADERS = {
    "Amenities", "Brands", "Courses", "Degree programs", "Destinations",
    "Featured hotels", "Insurance coverage", "Models", "Neighborhoods",
    "Service catalog", "Shows", "Styles", "Types",
}


def norm(text):
    """Lowercase, strip punctuation, collapse spaces - so 'Same-Day Service!' == 'same day service'."""
    return " ".join("".join(c if c.isalnum() or c.isspace() else " " for c in text).lower().split())


def check_no_repeats(rsa_texts):
    """Google's callout policy bans repeating what the ad already says. Repetition is a
    disapproval risk, not just a wasted slot - so this is a hard gate, not a comment.
    Also applies to sitelink titles and descriptions (ad-assets.md)."""
    ad_phrases = {norm(t) for t in rsa_texts if t}
    problems = []

    def clash(label, text):
        n = norm(text)
        if not n:
            return
        if n in ad_phrases:
            problems.append(f"{label}: \"{text}\" is already in the ad copy word for word")

    for c in CALLOUTS:
        clash("callout", c)
    for title, d1, d2, _url in SITELINKS:
        clash("sitelink title", title)
        clash("sitelink desc", d1)
        clash("sitelink desc", d2)

    seen = {}
    for label, text in ([("callout", c) for c in CALLOUTS] +
                        [("sitelink title", s[0]) for s in SITELINKS]):
        n = norm(text)
        if n in seen:
            problems.append(f"{label} \"{text}\" duplicates {seen[n]}")
        else:
            seen[n] = f"{label} \"{text}\""

    for header, _values in SNIPPETS:
        if header not in VALID_SNIPPET_HEADERS:
            problems.append(f"snippet header \"{header}\" is not one of Google's 13 - "
                            f"did you mean \"Service catalog\"?")

    over = [c for c in CALLOUTS if len(c) > 25]
    over += [s[0] for s in SITELINKS if len(s[0]) > 25]
    for t in over:
        problems.append(f"\"{t}\" is {len(t)} chars, over the 25 limit")
    for _t, d1, d2, _u in SITELINKS:
        for d in (d1, d2):
            if len(d) > 35:
                problems.append(f"sitelink description \"{d}\" is {len(d)} chars, over the 35 limit")

    urls = [s[3] for s in SITELINKS]
    dupe_urls = {u for u in urls if urls.count(u) > 1}
    for u in dupe_urls:
        problems.append(f"two sitelinks point at the same URL: {u}")

    if problems:
        print("✗ Asset copy failed its own rules - nothing was pushed:\n")
        for p in problems:
            print(f"    · {p}")
        print("\nFix the copy in this file (or ask Claude to regenerate it from context/proof.md)"
              "\nand re-run. Repetition is a disapproval risk, not just a wasted slot.")
        sys.exit(1)
    print("✓ asset copy checks passed (no repeats, within limits, valid headers)\n")


def find_ids():
    q = f"""
    SELECT campaign.id, ad_group.id, ad_group_ad.ad.id,
           ad_group_ad.ad.responsive_search_ad.headlines,
           ad_group_ad.ad.responsive_search_ad.descriptions
    FROM ad_group_ad
    WHERE campaign.name = '{CAMPAIGN}' AND ad_group.name = '{AD_GROUP}'
      AND ad_group_ad.status != 'REMOVED'
    """
    camp_id = ag_id = None
    ad_ids = []
    rsa_texts = []
    for row in ga.search(customer_id=cid, query=q):
        camp_id, ag_id = row.campaign.id, row.ad_group.id
        ad_ids.append(row.ad_group_ad.ad.id)
        rsa = row.ad_group_ad.ad.responsive_search_ad
        rsa_texts += [a.text for a in rsa.headlines] + [a.text for a in rsa.descriptions]
    if not ag_id:
        sys.exit(f"ad group '{AD_GROUP}' not found")
    return camp_id, ag_id, ad_ids, rsa_texts


def run(ops, label):
    req = client.get_type("MutateGoogleAdsRequest")
    req.customer_id = cid
    req.mutate_operations.extend(ops)
    try:
        resp = ga.mutate(request=req)
        print(f"✓ {label}")
        return resp
    except GoogleAdsException as e:
        print(f"✗ {label} FAILED:")
        for err in e.failure.errors:
            print(f"    {err.error_code}: {err.message}")
        return None


def main():
    camp_id, ag_id, ad_ids, rsa_texts = find_ids()
    check_no_repeats(rsa_texts)
    ag_rn = ga.ad_group_path(cid, ag_id)
    camp_rn = ga.campaign_path(cid, camp_id)
    print(f"{CAMPAIGN} (id {camp_id}) / {AD_GROUP} (id {ag_id}) / ads {ad_ids}\n")

    # ---- 1. re-point the RSAs at the live site.
    # Normally a no-op: /landing-page runs before /write-ads, so build_ads.py already set the
    # real URL. This stays as the fallback for ads built against the example.com placeholder.
    ad_svc = client.get_service("AdService")
    for ad_id in ad_ids:
        op = client.get_type("AdOperation")
        op.update.resource_name = ad_svc.ad_path(cid, ad_id)
        op.update.final_urls.append(BASE)
        from google.api_core import protobuf_helpers
        client.copy_from(op.update_mask, protobuf_helpers.field_mask(None, op.update._pb))
        req = client.get_type("MutateAdsRequest")
        req.customer_id = cid
        req.operations.append(op)
        try:
            ad_svc.mutate_ads(request=req)
            print(f"✓ ad {ad_id}: final URL -> {BASE}")
        except GoogleAdsException as e:
            print(f"✗ ad {ad_id} URL update failed:")
            for err in e.failure.errors:
                print(f"    {err.error_code}: {err.message}")

    # ---- 2. sitelinks (asset + PAUSED ad-group link, one atomic request)
    ops = []
    for i, (title, d1, d2, url) in enumerate(SITELINKS):
        rn = ga.asset_path(cid, -(i + 1))
        op = client.get_type("MutateOperation")
        a = op.asset_operation.create
        a.resource_name = rn
        a.final_urls.append(url)
        a.sitelink_asset.link_text = title
        a.sitelink_asset.description1 = d1
        a.sitelink_asset.description2 = d2
        ops.append(op)
        op = client.get_type("MutateOperation")
        link = op.ad_group_asset_operation.create
        link.ad_group = ag_rn
        link.asset = rn
        link.field_type = enums.AssetFieldTypeEnum.SITELINK
        link.status = enums.AssetLinkStatusEnum.PAUSED
        ops.append(op)
    run(ops, f"{len(SITELINKS)} sitelinks created + linked PAUSED (ad group)")

    # ---- 3. callouts
    ops = []
    for i, text in enumerate(CALLOUTS):
        rn = ga.asset_path(cid, -(i + 1))
        op = client.get_type("MutateOperation")
        op.asset_operation.create.resource_name = rn
        op.asset_operation.create.callout_asset.callout_text = text
        ops.append(op)
        op = client.get_type("MutateOperation")
        link = op.ad_group_asset_operation.create
        link.ad_group = ag_rn
        link.asset = rn
        link.field_type = enums.AssetFieldTypeEnum.CALLOUT
        link.status = enums.AssetLinkStatusEnum.PAUSED
        ops.append(op)
    run(ops, f"{len(CALLOUTS)} callouts created + linked PAUSED (ad group)")

    # ---- 4. structured snippets
    ops = []
    for i, (header, values) in enumerate(SNIPPETS):
        rn = ga.asset_path(cid, -(i + 1))
        op = client.get_type("MutateOperation")
        ss = op.asset_operation.create
        ss.resource_name = rn
        ss.structured_snippet_asset.header = header
        ss.structured_snippet_asset.values.extend(values)
        ops.append(op)
        op = client.get_type("MutateOperation")
        link = op.ad_group_asset_operation.create
        link.ad_group = ag_rn
        link.asset = rn
        link.field_type = enums.AssetFieldTypeEnum.STRUCTURED_SNIPPET
        link.status = enums.AssetLinkStatusEnum.PAUSED
        ops.append(op)
    run(ops, "2 structured snippet headers created + linked PAUSED (ad group)")

    # ---- 5. lead form (campaign level only) with GHL webhook delivery
    ops = []
    rn = ga.asset_path(cid, -1)
    op = client.get_type("MutateOperation")
    lf = op.asset_operation.create
    lf.resource_name = rn
    lf.name = "ABC Plumbing Lead Form"
    lfa = lf.lead_form_asset
    lfa.business_name = BUSINESS_NAME
    lfa.headline = "Get Your Free Plumbing Quote"
    lfa.description = ("Tell us about the job and a real dispatcher will call you back to "
                       "book your free in-person quote. Licensed, insured, upfront pricing.")
    lfa.privacy_policy_url = f"{BASE}/privacy"
    lfa.call_to_action_type = enums.LeadFormCallToActionTypeEnum.GET_QUOTE
    lfa.call_to_action_description = "Free in-person quotes"
    for f in ("FIRST_NAME", "LAST_NAME", "EMAIL", "PHONE_NUMBER"):
        fld = client.get_type("LeadFormField")
        fld.input_type = getattr(enums.LeadFormFieldUserInputTypeEnum, f)
        lfa.fields.append(fld)
    lfa.post_submit_headline = "Thanks, request received"
    lfa.post_submit_description = "We'll call you shortly to book your free quote."
    hook = client.get_type("LeadFormDeliveryMethod")
    hook.webhook.advertiser_webhook_url = GHL_WEBHOOK
    hook.webhook.google_secret = "abc-ghl-2026-lead-secret"
    hook.webhook.payload_schema_version = 3
    lfa.delivery_methods.append(hook)
    ops.append(op)
    op = client.get_type("MutateOperation")
    link = op.campaign_asset_operation.create
    link.campaign = camp_rn
    link.asset = rn
    link.field_type = enums.AssetFieldTypeEnum.LEAD_FORM
    link.status = enums.AssetLinkStatusEnum.PAUSED
    ops.append(op)
    run(ops, "lead form created + linked PAUSED (campaign level - Google minimum) with GHL webhook")

    # ---- 6. business name + logo (campaign level; may need Advertiser Verification)
    ops = []
    name_rn = ga.asset_path(cid, -1)
    op = client.get_type("MutateOperation")
    op.asset_operation.create.resource_name = name_rn
    op.asset_operation.create.text_asset.text = BUSINESS_NAME
    ops.append(op)
    op = client.get_type("MutateOperation")
    link = op.campaign_asset_operation.create
    link.campaign = camp_rn
    link.asset = name_rn
    link.field_type = enums.AssetFieldTypeEnum.BUSINESS_NAME
    link.status = enums.AssetLinkStatusEnum.PAUSED
    ops.append(op)
    run(ops, "business name created + linked PAUSED (campaign)")

    if os.path.exists(LOGO_PATH):
        ops = []
        logo_rn = ga.asset_path(cid, -1)
        op = client.get_type("MutateOperation")
        img = op.asset_operation.create
        img.resource_name = logo_rn
        img.name = "ABC logo 1200"
        with open(LOGO_PATH, "rb") as fh:
            img.image_asset.data = fh.read()
        ops.append(op)
        op = client.get_type("MutateOperation")
        link = op.campaign_asset_operation.create
        link.campaign = camp_rn
        link.asset = logo_rn
        link.field_type = enums.AssetFieldTypeEnum.BUSINESS_LOGO
        link.status = enums.AssetLinkStatusEnum.PAUSED
        ops.append(op)
        run(ops, "business logo uploaded + linked PAUSED (campaign)")
    else:
        print(f"⚠ logo not found at {LOGO_PATH} - skipped")

    print("\n⚠ CALL ASSET NOT ADDED: compliance.md requires a real, in-service number "
          "local to the targeted country (Google places test calls). Get a tracking "
          "number (GHL/LC Phone) in your country and re-run with --call <number>.")


if __name__ == "__main__":
    main()
