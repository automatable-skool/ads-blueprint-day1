"""Read-only audit: auto-apply recommendation subscriptions, per-campaign
auto-created asset settings, and who has access to the account."""

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


def section(title: str) -> None:
    print(f"\n=== {title} ===")


section("Auto-apply recommendation subscriptions")
try:
    q = """
        SELECT recommendation_subscription.type, recommendation_subscription.status
        FROM recommendation_subscription
    """
    rows = list(ga.search(customer_id=customer_id, query=q))
    if not rows:
        print("  (no subscriptions — auto-apply is OFF)")
    for r in rows:
        s = r.recommendation_subscription
        print(f"  · {s.type_.name}: {s.status.name}")
except GoogleAdsException as ex:
    print(f"  query failed: {'; '.join(e.message for e in ex.failure.errors)}")

section("Campaign auto-created assets (asset automation)")
try:
    q = """
        SELECT campaign.id, campaign.name, campaign.status,
               campaign.advertising_channel_type, campaign.asset_automation_settings
        FROM campaign
        WHERE campaign.status != 'REMOVED'
    """
    for r in ga.search(customer_id=customer_id, query=q):
        c = r.campaign
        settings = ", ".join(
            f"{s.asset_automation_type.name}={s.asset_automation_status.name}"
            for s in c.asset_automation_settings
        ) or "(defaults — automation ON where eligible)"
        print(f"  · [{c.id}] {c.name} ({c.status.name}, {c.advertising_channel_type.name})")
        print(f"      {settings}")
except GoogleAdsException as ex:
    print(f"  query failed: {'; '.join(e.message for e in ex.failure.errors)}")

section("Users with access")
try:
    q = """
        SELECT customer_user_access.email_address, customer_user_access.access_role,
               customer_user_access.access_creation_date_time
        FROM customer_user_access
    """
    for r in ga.search(customer_id=customer_id, query=q):
        u = r.customer_user_access
        print(f"  · {u.email_address} — {u.access_role.name} (since {u.access_creation_date_time})")
except GoogleAdsException as ex:
    print(f"  query failed: {'; '.join(e.message for e in ex.failure.errors)}")

section("Manager accounts linked")
try:
    q = """
        SELECT customer_manager_link.manager_customer, customer_manager_link.status
        FROM customer_manager_link
    """
    rows = list(ga.search(customer_id=customer_id, query=q))
    if not rows:
        print("  (none)")
    for r in rows:
        link = r.customer_manager_link
        print(f"  · {link.manager_customer} — {link.status.name}")
except GoogleAdsException as ex:
    print(f"  query failed: {'; '.join(e.message for e in ex.failure.errors)}")
