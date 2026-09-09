"""Validate-only the trust + value RSAs and dump policy topics + offending text."""

from dotenv import load_dotenv
import os
import sys
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

# Set AD_GROUP_RESOURCE in .env, or pass it as the first argument.
AD_GROUP_RES = os.getenv("AD_GROUP_RESOURCE") or (sys.argv[1] if len(sys.argv) > 1 else "")
if not AD_GROUP_RES:
    sys.exit("Give an ad group: AD_GROUP_RESOURCE in .env, or "
             "python3 code/diagnose_rsa.py customers/<id>/adGroups/<id>")
FINAL_URL = os.getenv("SITE_BASE_URL", "https://example.com")
PINNED = ["Emergency Plumber Toronto", "Toronto Emergency Plumber", "24/7 Emergency Plumber"]

CASES = {
    "trust": {
        "unpinned": ["Licensed & Insured", "4.9★ Rated Plumbers", "15 Years in the GTA",
            "Background-Checked Techs", "Upfront Flat-Rate Pricing", "No Hidden Fees",
            "10-Year Workmanship Warranty", "Same-Day Service", "Trusted Local Plumbers",
            "Call Now · 24/7", "Family-Owned Plumbers", "Free Quote in 2 Min"],
        "descriptions": [
            "Licensed, insured and background-checked Toronto plumbers serving the GTA 24 hours a day.",
            "Upfront flat-rate pricing with no hidden fees and a 10-year workmanship warranty.",
            "Rated 4.9★ by hundreds of local customers. Family-owned and trusted for 15 years.",
            "Call now or book online for fast, reliable emergency plumbing across Toronto."],
    },
    "value": {
        "unpinned": ["No Callout Fee Today", "Upfront Flat-Rate Pricing", "No Hidden Fees, Ever",
            "Free Written Quote", "Same-Day Service", "Licensed & Insured",
            "Fixed Price, No Surprises", "Affordable Toronto Plumbers", "Open 24/7",
            "Book Online Today", "Blocked Drain & Leak Repair", "Get a Free Quote Fast"],
        "descriptions": [
            "Transparent flat-rate pricing with no callout fee and no hidden charges, ever.",
            "Know the fixed price before any work starts. Licensed Toronto plumbers, same-day.",
            "Free written quote in minutes for leaks, clogs, burst pipes and water heaters.",
            "Book online today or call for fast, affordable emergency plumbing across the GTA."],
    },
}

load_dotenv()
client = GoogleAdsClient.load_from_dict({
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
    "use_proto_plus": True,
})
CID = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
E = client.enums
adsvc = client.get_service("AdGroupAdService")

for label, rsa in CASES.items():
    op = client.get_type("AdGroupAdOperation"); aga = op.create
    aga.ad_group = AD_GROUP_RES
    aga.status = E.AdGroupAdStatusEnum.PAUSED
    aga.ad.final_urls.append(FINAL_URL)
    sa = aga.ad.responsive_search_ad
    sa.path1, sa.path2 = "emergency", "toronto"
    for t in PINNED:
        h = client.get_type("AdTextAsset"); h.text = t
        h.pinned_field = E.ServedAssetFieldTypeEnum.HEADLINE_1
        sa.headlines.append(h)
    for t in rsa["unpinned"]:
        h = client.get_type("AdTextAsset"); h.text = t
        sa.headlines.append(h)
    for t in rsa["descriptions"]:
        d = client.get_type("AdTextAsset"); d.text = t
        sa.descriptions.append(d)
    req = client.get_type("MutateAdGroupAdsRequest")
    req.customer_id = CID
    req.operations.append(op)
    req.validate_only = True
    try:
        adsvc.mutate_ad_group_ads(request=req)
        print(f"[{label}] OK")
    except GoogleAdsException as ex:
        print(f"[{label}] REJECTED:")
        for err in ex.failure.errors:
            for entry in err.details.policy_finding_details.policy_topic_entries:
                texts = []
                for ev in entry.evidences:
                    if ev.text_list.texts:
                        texts += list(ev.text_list.texts)
                print(f"   topic={entry.topic!r} type={entry.type_.name} evidence={texts}")
