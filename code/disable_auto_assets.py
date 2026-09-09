"""Opts every non-removed campaign out of auto-created text assets
(TEXT_ASSET_AUTOMATION → OPTED_OUT). Skips campaigns already opted out;
reports campaign types that don't support the setting."""

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
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
    "use_proto_plus": True,
}
client = GoogleAdsClient.load_from_dict(config)
customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
ga = client.get_service("GoogleAdsService")
campaign_service = client.get_service("CampaignService")

query = """
    SELECT campaign.id, campaign.name, campaign.asset_automation_settings
    FROM campaign
    WHERE campaign.status != 'REMOVED'
"""

for row in ga.search(customer_id=customer_id, query=query):
    c = row.campaign
    already_off = any(
        s.asset_automation_type.name == "TEXT_ASSET_AUTOMATION"
        and s.asset_automation_status.name == "OPTED_OUT"
        for s in c.asset_automation_settings
    )
    if already_off:
        print(f"  · already OFF: {c.name}")
        continue

    op = client.get_type("CampaignOperation")
    op.update.resource_name = campaign_service.campaign_path(customer_id, c.id)
    setting_cls = type(client.get_type("Campaign")).AssetAutomationSetting
    setting = setting_cls(
        asset_automation_type=client.enums.AssetAutomationTypeEnum.TEXT_ASSET_AUTOMATION,
        asset_automation_status=client.enums.AssetAutomationStatusEnum.OPTED_OUT,
    )
    op.update.asset_automation_settings.append(setting)
    op.update_mask.paths.append("asset_automation_settings")
    try:
        campaign_service.mutate_campaigns(customer_id=customer_id, operations=[op])
        print(f"✓ Opted out: {c.name}")
    except GoogleAdsException as ex:
        msgs = "; ".join(e.message for e in ex.failure.errors)
        print(f"✗ Not supported for '{c.name}': {msgs}")
