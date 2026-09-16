"""Opts every non-removed campaign out of auto-created text assets
(TEXT_ASSET_AUTOMATION → OPTED_OUT) and, on Performance Max, out of final URL
expansion too (FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION → OPTED_OUT). Both go in
ONE operation: Google refuses the text opt-out while URL expansion is still on
(found 11 Sep 2026 on a live account). Skips campaigns already opted out.
Dry run by DEFAULT: --apply to change anything, --enabled-only to skip paused campaigns."""

import argparse
import os
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

load_dotenv()

config = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") or None,
    "use_proto_plus": True,
}
client = GoogleAdsClient.load_from_dict(config)
customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
ga = client.get_service("GoogleAdsService")
campaign_service = client.get_service("CampaignService")

ap = argparse.ArgumentParser()
ap.add_argument("--apply", action="store_true", help="actually opt out - default is a dry run")
ap.add_argument("--enabled-only", action="store_true", help="only ENABLED campaigns")
args = ap.parse_args()

query = """
    SELECT campaign.id, campaign.name, campaign.advertising_channel_type, campaign.asset_automation_settings
    FROM campaign
    WHERE campaign.status %s
""" % ("= 'ENABLED'" if args.enabled_only else "!= 'REMOVED'")

for row in ga.search(customer_id=customer_id, query=query):
    c = row.campaign
    is_pmax = c.advertising_channel_type.name == "PERFORMANCE_MAX"
    wanted = (["FINAL_URL_EXPANSION_TEXT_ASSET_AUTOMATION"] if is_pmax else []) + ["TEXT_ASSET_AUTOMATION"]
    off = {s.asset_automation_type.name for s in c.asset_automation_settings
           if s.asset_automation_status.name == "OPTED_OUT"}
    already_off = all(w in off for w in wanted)
    if already_off:
        print(f"  · already OFF: {c.name}")
        continue

    op = client.get_type("CampaignOperation")
    op.update.resource_name = campaign_service.campaign_path(customer_id, c.id)
    setting_cls = type(client.get_type("Campaign")).AssetAutomationSetting
    for w in wanted:  # URL expansion first, text second, same operation
        op.update.asset_automation_settings.append(setting_cls(
            asset_automation_type=getattr(client.enums.AssetAutomationTypeEnum, w),
            asset_automation_status=client.enums.AssetAutomationStatusEnum.OPTED_OUT,
        ))
    op.update_mask.paths.append("asset_automation_settings")
    if not args.apply:
        print(f"  would opt out: {c.name}")
        continue
    try:
        campaign_service.mutate_campaigns(customer_id=customer_id, operations=[op])
        print(f"✓ Opted out: {c.name}")
    except GoogleAdsException as ex:
        msgs = "; ".join(e.message for e in ex.failure.errors)
        print(f"✗ Not supported for '{c.name}': {msgs}")
