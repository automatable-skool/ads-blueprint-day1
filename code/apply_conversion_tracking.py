"""Applies the standard conversion tracking plan to the account in .env.

Target end state - exactly 3 PRIMARY (money-tied, train Smart Bidding):
  1. Your lead action (the form or call action you name with --keep)
  2. Phone Call 60s+ (from ads)      (created, AD_CALL, 60s threshold)
  3. Phone Call 60s+ (from website)  (created, WEBSITE_CALL, 60s threshold)

Everything else PRIMARY today gets demoted to SECONDARY (observation only),
and observation-only actions are created: Form View, Scroll 90%,
Phone Call any duration.

Nothing about any account is written into this file. The action to keep is
named on the command line, by exact name or numeric id, and the actions to
demote are discovered from the account at run time. Dry run by default.

  python3 code/apply_conversion_tracking.py --keep "Lead - Form Submit"
  python3 code/apply_conversion_tracking.py --keep 1234567890 --apply

Demotions are attempted one at a time: some system-managed action types
(Smart campaign, Google-hosted) may reject the update - failures are
reported, not fatal.
"""

import argparse
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
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") or None,
    "use_proto_plus": True,
}
client = GoogleAdsClient.load_from_dict(config)
customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
ga_service = client.get_service("GoogleAdsService")
ca_service = client.get_service("ConversionActionService")

NEW_ACTIONS = [
    # (name, type, category, primary, call_duration_seconds)
    ("Phone Call 60s+ (from ads)", "AD_CALL", "PHONE_CALL_LEAD", True, 60),
    ("Phone Call 60s+ (from website)", "WEBSITE_CALL", "PHONE_CALL_LEAD", True, 60),
    ("Form View", "WEBPAGE", "PAGE_VIEW", False, None),
    ("Scroll 90%", "WEBPAGE", "DEFAULT", False, None),
    ("Phone Call any duration (observation)", "AD_CALL", "PHONE_CALL_LEAD", False, 1),
]
NEW_PRIMARY_NAMES = {name for name, _, _, primary, _ in NEW_ACTIONS if primary}


def live_actions() -> list[dict]:
    query = """
        SELECT conversion_action.id, conversion_action.name, conversion_action.primary_for_goal
        FROM conversion_action
        WHERE conversion_action.status != 'REMOVED'
    """
    return [{"id": r.conversion_action.id, "name": r.conversion_action.name,
             "primary": r.conversion_action.primary_for_goal}
            for r in ga_service.search(customer_id=customer_id, query=query)]


def resolve_keep(keep: list[str], actions: list[dict]) -> list[dict]:
    """Each --keep is an exact action name or a numeric id. Unknown ones stop the run."""
    out = []
    for k in keep:
        hit = [a for a in actions if str(a["id"]) == k.strip() or a["name"] == k.strip()]
        if not hit:
            names = "\n  ".join(f'[{a["id"]}] {a["name"]}' for a in actions)
            sys.exit(f"--keep {k!r} matches no conversion action. The account has:\n  {names}")
        out.append(hit[0])
    return out


def create_new_actions(skip: set[str], apply: bool) -> None:
    for name, type_name, category, primary, call_seconds in NEW_ACTIONS:
        role = "PRIMARY" if primary else "SECONDARY"
        if name in skip:
            print(f"  · exists, skipped: {name}")
            continue
        if not apply:
            print(f"  would create {role}: {name}")
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
            ca_service.mutate_conversion_actions(customer_id=customer_id, operations=[op])
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


def demote_others(actions: list[dict], keep_ids: set[int], apply: bool) -> None:
    """Every PRIMARY action that is not kept and is not one this script creates."""
    for a in actions:
        if not a["primary"] or a["id"] in keep_ids or a["name"] in NEW_PRIMARY_NAMES:
            continue
        if not apply:
            print(f"  would demote to SECONDARY: [{a['id']}] {a['name']}")
            continue
        try:
            set_primary_flag(a["id"], False)
            print(f"✓ Demoted to SECONDARY: [{a['id']}] {a['name']}")
        except GoogleAdsException as ex:
            msgs = "; ".join(e.message for e in ex.failure.errors)
            print(f"✗ Could not demote [{a['id']}] {a['name']}: {msgs}")


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
        print(f"  {role}  [{a.id}] {a.name} - {a.type_.name}/{a.category.name}{extra}")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--keep", action="append", required=True,
                    help="conversion action to keep PRIMARY - exact name or numeric id; repeatable")
    ap.add_argument("--apply", action="store_true", help="make the changes - default is a dry run")
    args = ap.parse_args()
    try:
        actions = live_actions()
        keep = resolve_keep(args.keep, actions)
        keep_ids = {a["id"] for a in keep}
        print(f"Account {customer_id} · {'APPLYING' if args.apply else 'DRY RUN'}")
        print("Keeping PRIMARY: " + ", ".join(f'[{a["id"]}] {a["name"]}' for a in keep))
        create_new_actions({a["name"] for a in actions}, args.apply)
        demote_others(actions, keep_ids, args.apply)
        if args.apply:
            for a in keep:
                if not a["primary"]:
                    set_primary_flag(a["id"], True)
                    print(f"✓ Set PRIMARY: [{a['id']}] {a['name']}")
            show_final_state()
        else:
            print("\nDRY RUN - nothing changed. Re-run with --apply.")
    except GoogleAdsException as ex:
        for error in ex.failure.errors:
            print(f"✗ Google Ads error: {error.message}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
