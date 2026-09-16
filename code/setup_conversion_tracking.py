"""Sets up conversion tracking: auto-tagging ON, primary + secondary conversion actions.

Primaries (train Smart Bidding, one per real lead path, max 3):
  1. Lead Form Submission            (webpage, SUBMIT_LEAD_FORM)
  2. Phone Call 60s+ (from ads)      (AD_CALL, 60s threshold)
  3. Phone Call 60s+ (from website)  (WEBSITE_CALL, 60s threshold)

Secondaries (observation only):
  - Form View                        (webpage, PAGE_VIEW)
  - Scroll 90%                       (webpage, DEFAULT)
  - Phone Call any duration          (AD_CALL, 1s threshold — observes short calls)

Idempotent: skips any action whose name already exists.
Note: Enhanced Conversions cannot be toggled via the API — the script reports its
status; flip it on in the UI (Goals > Conversions > Settings > Enhanced conversions).
"""

import os
import sys
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

load_dotenv()

REQUIRED_ENV = [
    "GOOGLE_ADS_CLIENT_ID",
    "GOOGLE_ADS_CLIENT_SECRET",
    "GOOGLE_ADS_REFRESH_TOKEN",
    "GOOGLE_ADS_CUSTOMER_ID",
]
missing = [k for k in REQUIRED_ENV if not os.getenv(k)]
if missing:
    sys.exit(f"Missing env vars: {', '.join(missing)}")

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
ga_service = client.get_service("GoogleAdsService")

ACTIONS = [
    # (name, type, category, primary, call_duration_seconds)
    ("Lead Form Submission", "WEBPAGE", "SUBMIT_LEAD_FORM", True, None),
    ("Phone Call 60s+ (from ads)", "AD_CALL", "PHONE_CALL_LEAD", True, 60),
    ("Phone Call 60s+ (from website)", "WEBSITE_CALL", "PHONE_CALL_LEAD", True, 60),
    ("Form View", "WEBPAGE", "PAGE_VIEW", False, None),
    ("Scroll 90%", "WEBPAGE", "DEFAULT", False, None),
    ("Phone Call any duration (observation)", "AD_CALL", "PHONE_CALL_LEAD", False, 1),
]


def existing_action_names() -> set[str]:
    query = """
        SELECT conversion_action.name
        FROM conversion_action
        WHERE conversion_action.status != 'REMOVED'
    """
    rows = ga_service.search(customer_id=customer_id, query=query)
    return {row.conversion_action.name for row in rows}


def enable_auto_tagging() -> None:
    customer_service = client.get_service("CustomerService")
    op = client.get_type("CustomerOperation")
    op.update.resource_name = customer_service.customer_path(customer_id)
    op.update.auto_tagging_enabled = True
    op.update_mask.paths.append("auto_tagging_enabled")
    customer_service.mutate_customer(customer_id=customer_id, operation=op)
    print("✓ Auto-tagging: ON")


def create_actions(skip: set[str]) -> None:
    ca_service = client.get_service("ConversionActionService")
    operations = []
    for name, type_name, category, primary, call_seconds in ACTIONS:
        if name in skip:
            print(f"  · exists, skipped: {name}")
            continue
        op = client.get_type("ConversionActionOperation")
        ca = op.create
        ca.name = name
        ca.type_ = client.enums.ConversionActionTypeEnum[type_name]
        ca.category = client.enums.ConversionActionCategoryEnum[category]
        ca.status = client.enums.ConversionActionStatusEnum.ENABLED
        ca.primary_for_goal = primary
        ca.counting_type = client.enums.ConversionActionCountingTypeEnum.ONE_PER_CLICK
        ca.click_through_lookback_window_days = 30
        ca.value_settings.default_value = 0.0
        ca.value_settings.always_use_default_value = False
        if call_seconds is not None:
            ca.phone_call_duration_seconds = call_seconds
        operations.append(op)
    if operations:
        response = ca_service.mutate_conversion_actions(
            customer_id=customer_id, operations=operations
        )
        for result in response.results:
            print(f"✓ Created: {result.resource_name}")


def show_final_state() -> None:
    query = """
        SELECT customer.auto_tagging_enabled,
               customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled
        FROM customer
    """
    for row in ga_service.search(customer_id=customer_id, query=query):
        print(f"\nAuto-tagging: {row.customer.auto_tagging_enabled}")
        ec = row.customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled
        print(f"Enhanced conversions for leads: {ec} (toggle in UI if False)")

    query = """
        SELECT conversion_action.id, conversion_action.name, conversion_action.type,
               conversion_action.category, conversion_action.primary_for_goal,
               conversion_action.status, conversion_action.phone_call_duration_seconds
        FROM conversion_action
        WHERE conversion_action.status != 'REMOVED'
        ORDER BY conversion_action.primary_for_goal DESC
    """
    print("\nConversion actions:")
    for row in ga_service.search(customer_id=customer_id, query=query):
        a = row.conversion_action
        role = "PRIMARY  " if a.primary_for_goal else "SECONDARY"
        extra = f" ({a.phone_call_duration_seconds}s min)" if a.phone_call_duration_seconds else ""
        print(f"  {role}  [{a.id}] {a.name} — {a.type_.name}/{a.category.name}{extra}")


def main() -> None:
    try:
        enable_auto_tagging()
        create_actions(existing_action_names())
        show_final_state()
    except GoogleAdsException as ex:
        for error in ex.failure.errors:
            print(f"✗ Google Ads error: {error.message}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
