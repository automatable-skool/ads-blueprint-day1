"""Demote conversion actions out of bidding - including the ones the API refuses to touch directly.

Google auto-creates conversion actions you never asked for (Business Profile "Clicks to call"
and "Local actions - Directions", Smart campaign actions, YouTube subscriptions and follow-on
views). They arrive PRIMARY, which means Smart Bidding optimises toward a map-pack direction tap
with the same weight as a booked job.

Two routes, tried in order, because route 1 fails on exactly the actions you most want demoted:

  1. ConversionAction.primary_for_goal = false
     Works for actions you own. **System-managed and Google-hosted actions reject this** - that is
     the "Google refused" people hit in the UI-free path.

  2. CustomerConversionGoal.biddable = false        <- the route that actually works on them
     Conversion goals are keyed by (category, origin). A Google-hosted phone tap is
     category PHONE_CALL_LEAD + origin GOOGLE_HOSTED, while a real website call is the same
     category with origin WEBSITE - so switching the GOOGLE_HOSTED goal off removes the junk from
     bidding WITHOUT touching your real phone conversions. Google creates these goals; the API
     cannot create or remove them, but it can update them.

Usage:
  python3 code/demote_conversion_goals.py --customer 1234567890 --dry-run
  python3 code/demote_conversion_goals.py --customer 1234567890 --apply
  python3 code/demote_conversion_goals.py --customer 1234567890 --apply --name "YouTube channel subscriptions"

Nothing is changed without --apply.
"""
import argparse
import os
import pathlib
import sys

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

ROOT = pathlib.Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

REQUIRED = ["GOOGLE_ADS_DEVELOPER_TOKEN", "GOOGLE_ADS_CLIENT_ID",
            "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_REFRESH_TOKEN"]

# Auto-created by Google, almost never a real business outcome. Matched case-insensitively
# on a substring of the conversion action name.
JUNK = [
    "clicks to call",
    "local actions",
    "directions",
    "smart campaign",
    "youtube channel subscription",
    "youtube follow-on",
    "website visit",
    "driving direction",
]


def get_client(login_cid):
    missing = [k for k in REQUIRED if not os.getenv(k)]
    if missing:
        sys.exit("Missing from .env: " + ", ".join(missing) + "\nRun /api-setup first.")
    return GoogleAdsClient.load_from_dict({
        "developer_token": os.environ["GOOGLE_ADS_DEVELOPER_TOKEN"],
        "client_id": os.environ["GOOGLE_ADS_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_ADS_CLIENT_SECRET"],
        "refresh_token": os.environ["GOOGLE_ADS_REFRESH_TOKEN"],
        "login_customer_id": login_cid,
        "use_proto_plus": True,
    })


def load_actions(ga, cid):
    q = """
      SELECT conversion_action.id, conversion_action.name, conversion_action.category,
             conversion_action.origin, conversion_action.status,
             conversion_action.primary_for_goal, conversion_action.type
      FROM conversion_action
      WHERE conversion_action.status != 'REMOVED'
    """
    return [r.conversion_action for r in ga.search(customer_id=cid, query=q)]


def load_goals(ga, cid):
    q = """
      SELECT customer_conversion_goal.category, customer_conversion_goal.origin,
             customer_conversion_goal.biddable, customer_conversion_goal.resource_name
      FROM customer_conversion_goal
    """
    return [r.customer_conversion_goal for r in ga.search(customer_id=cid, query=q)]


def demote_action(client, ga, cid, action):
    """Route 1. Returns None on success, or the API's message on refusal."""
    svc = client.get_service("ConversionActionService")
    op = client.get_type("ConversionActionOperation")
    op.update.resource_name = svc.conversion_action_path(cid, action.id)
    op.update.primary_for_goal = False
    op.update_mask.paths.append("primary_for_goal")
    try:
        svc.mutate_conversion_actions(customer_id=cid, operations=[op])
        return None
    except GoogleAdsException as e:
        return "; ".join(err.message for err in e.failure.errors) or str(e)


def unbid_goal(client, cid, goal):
    """Route 2. Returns None on success, or the API's message on refusal."""
    svc = client.get_service("CustomerConversionGoalService")
    op = client.get_type("CustomerConversionGoalOperation")
    op.update.resource_name = goal.resource_name
    op.update.biddable = False
    op.update_mask.paths.append("biddable")
    try:
        svc.mutate_customer_conversion_goals(customer_id=cid, operations=[op])
        return None
    except GoogleAdsException as e:
        return "; ".join(err.message for err in e.failure.errors) or str(e)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--customer", default=os.getenv("GOOGLE_ADS_CUSTOMER_ID"))
    ap.add_argument("--apply", action="store_true", help="actually make the changes")
    ap.add_argument("--dry-run", action="store_true", help="show what would change (default)")
    ap.add_argument("--name", action="append", default=[],
                    help="demote this action by name instead of the built-in junk list; repeatable")
    args = ap.parse_args()

    if not args.customer:
        sys.exit("No customer id. Pass --customer or set GOOGLE_ADS_CUSTOMER_ID in .env")
    cid = args.customer.replace("-", "")
    login = (os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") or cid).replace("-", "")
    client = get_client(login)
    ga = client.get_service("GoogleAdsService")

    actions = load_actions(ga, cid)
    targets_names = [n.lower() for n in args.name] or JUNK
    targets = [a for a in actions
               if a.primary_for_goal and any(t in a.name.lower() for t in targets_names)]

    primaries = [a for a in actions if a.primary_for_goal]
    print(f"\n{len(actions)} conversion actions, {len(primaries)} PRIMARY.\n")
    for a in primaries:
        mark = "  ->" if a in targets else "    "
        print(f"{mark} {a.name[:52]:<54}{a.category.name:<22}{a.origin.name}")

    if not targets:
        print("\nNothing to demote - no auto-created action is currently PRIMARY.")
        return
    print(f"\n{len(targets)} to demote out of bidding.")

    if not args.apply:
        print("\nDry run. Re-run with --apply to make these changes.")
        return

    goals = {(g.category.name, g.origin.name): g for g in load_goals(ga, cid)}
    ok, viaGoal, failed = [], [], []
    for a in targets:
        err = demote_action(client, ga, cid, a)
        if err is None:
            ok.append(a.name)
            continue
        # Route 1 refused - this is expected on Google-hosted and system-managed actions.
        g = goals.get((a.category.name, a.origin.name))
        if g is None:
            failed.append((a.name, err))
        elif not g.biddable:
            viaGoal.append(f"{a.name} (goal {a.category.name}/{a.origin.name} already not biddable)")
        else:
            gerr = unbid_goal(client, cid, g)
            if gerr is None:
                viaGoal.append(f"{a.name} (goal {a.category.name}/{a.origin.name} set non-biddable)")
                g.biddable = False  # don't re-mutate the same goal for a sibling action
            else:
                failed.append((a.name, f"action: {err} | goal: {gerr}"))

    print()
    for n in ok:
        print(f"  demoted        {n}")
    for n in viaGoal:
        print(f"  out of bidding {n}")
    for n, e in failed:
        print(f"  FAILED         {n}\n                 {e[:150]}")

    if failed:
        print("\nThese are genuinely UI-only. Google Ads -> Goals -> Summary -> open each -> Secondary.")
    print(f"\n{len(ok)} demoted directly, {len(viaGoal)} removed from bidding via their goal, "
          f"{len(failed)} need a human.\n"
          "Re-run code/check_conversion_setup.py to confirm what bidding now optimises toward.")


if __name__ == "__main__":
    main()
