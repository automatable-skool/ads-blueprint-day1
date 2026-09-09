"""Applies the conversion tracking plan for automatable.co.

Target end state — exactly 3 PRIMARY (money-tied, train Smart Bidding):
  1. Lead · Form Submit           (existing, kept primary)
  2. Phone Call 60s+ (from ads)   (created, AD_CALL, 60s threshold)
  3. Phone Call 60s+ (from website) (created, WEBSITE_CALL, 60s threshold)

Everything else PRIMARY today gets demoted to SECONDARY (observation only),
and observation-only actions are created: Form View, Scroll 90%,
Phone Call any duration.

Demotions are attempted one at a time: some system-managed action types
(Smart campaign, Google-hosted) may reject the update — failures are
reported, not fatal.
"""

import os
import sys
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
ga_service = client.get_service("GoogleAdsService")
ca_service = client.get_service("ConversionActionService")

KEEP_PRIMARY_ID = 7635960880  # Lead · Form Submit

DEMOTE_IDS = [
    849324632,   # Clicks to call
    849324875,   # Local actions - Directions
    850083061,   # Smart campaign ad clicks to call
    850084729,   # Submit lead form (older duplicate)
    858595618,   # Purchase
    7346484610,  # YouTube channel subscriptions
    7346585234,  # YouTube follow-on views
    7370461150,  # Submit lead form | GHL Survey Qualified
    7633251059,  # Demo 2.0 Delete
    7633599972,  # Demo [Delete]
]

NEW_ACTIONS = [
    # (name, type, category, primary, call_duration_seconds)
    ("Phone Call 60s+ (from ads)", "AD_CALL", "PHONE_CALL_LEAD", True, 60),
    ("Phone Call 60s+ (from website)", "WEBSITE_CALL", "PHONE_CALL_LEAD", True, 60),
    ("Form View", "WEBPAGE", "PAGE_VIEW", False, None),
    ("Scroll 90%", "WEBPAGE", "DEFAULT", False, None),
    ("Phone Call any duration (observation)", "AD_CALL", "PHONE_CALL_LEAD", False, 1),
]


def existing_action_names() -> set[str]:
    query = """
        SELECT conversion_action.name FROM conversion_action
        WHERE conversion_action.status != 'REMOVED'
    """
    return {r.conversion_action.name for r in ga_service.search(customer_id=customer_id, query=query)}


def create_new_actions(skip: set[str]) -> None:
    for name, type_name, category, primary, call_seconds in NEW_ACTIONS:
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
        if call_seconds is not None:
            ca.phone_call_duration_seconds = call_seconds
        try:
            resp = ca_service.mutate_conversion_actions(customer_id=customer_id, operations=[op])
            role = "PRIMARY" if primary else "SECONDARY"
            print(f"✓ Created {role}: {name}")
        except GoogleAdsException as ex:
            msgs = "; ".join(e.message for e in ex.failure.errors)
            print(f"✗ Could not create '{name}': {msgs}")


def set_primary_flag(action_id: int, primary: bool) -> None:
    op = client.get_type("ConversionActionOperation")
    op.update.resource_name = ca_service.conversion_action_path(customer_id, action_id)
    op.update.primary_for_goal = primary
    op.update_mask.paths.append("primary_for_goal")
    ca_service.mutate_conversion_actions(customer_id=customer_id, operations=[op])


def demote_actions() -> None:
    for action_id in DEMOTE_IDS:
        try:
            set_primary_flag(action_id, False)
            print(f"✓ Demoted to SECONDARY: [{action_id}]")
        except GoogleAdsException as ex:
            msgs = "; ".join(e.message for e in ex.failure.errors)
            print(f"✗ Could not demote [{action_id}]: {msgs}")


def show_final_state() -> None:
    query = """
        SELECT customer.auto_tagging_enabled,
               customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled
        FROM customer
    """
    for row in ga_service.search(customer_id=customer_id, query=query):
        print(f"\nAuto-tagging: {row.customer.auto_tagging_enabled}")
        ec = row.customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled
        print(f"Enhanced conversions for leads: {ec}")

    query = """
        SELECT conversion_action.id, conversion_action.name, conversion_action.type,
               conversion_action.category, conversion_action.primary_for_goal,
               conversion_action.phone_call_duration_seconds
        FROM conversion_action
        WHERE conversion_action.status != 'REMOVED'
        ORDER BY conversion_action.primary_for_goal DESC, conversion_action.id
    """
    print("\nFinal conversion actions:")
    for row in ga_service.search(customer_id=customer_id, query=query):
        a = row.conversion_action
        role = "PRIMARY  " if a.primary_for_goal else "SECONDARY"
        extra = f" ({a.phone_call_duration_seconds}s min)" if a.phone_call_duration_seconds else ""
        print(f"  {role}  [{a.id}] {a.name} — {a.type_.name}/{a.category.name}{extra}")


def main() -> None:
    try:
        create_new_actions(existing_action_names())
        demote_actions()
        set_primary_flag(KEEP_PRIMARY_ID, True)
        print(f"✓ Kept PRIMARY: [{KEEP_PRIMARY_ID}] Lead · Form Submit")
        show_final_state()
    except GoogleAdsException as ex:
        for error in ex.failure.errors:
            print(f"✗ Google Ads error: {error.message}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
