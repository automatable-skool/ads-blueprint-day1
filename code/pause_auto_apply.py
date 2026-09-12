"""Switch OFF auto-apply recommendations through the API - the fix for "Google is
changing your account by itself". Pauses every ENABLED recommendation subscription
the API can name (RecommendationSubscriptionService, status -> PAUSED).

Dry run by DEFAULT. Nothing is touched without --apply.

Known limit (found 11 Sep 2026 on DJNorth.ca): some subscriptions come back as type
UNKNOWN with resource name .../recommendationSubscriptions/UNKNOWN - recommendation
types Google has retired from the API but never cleared from the account. Even the
newest API version returns UNKNOWN for them, and a mutate on that name is refused.
Those are screen-only: Admin -> Recommendations auto-apply -> untick -> Save. The
script counts them and prints that path. Verify after with check_autopilot.py.

Usage (from the project root):
  python3 code/pause_auto_apply.py            # report + dry run
  python3 code/pause_auto_apply.py --apply    # pause every named ENABLED subscription
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402


def read(ga, cid):
    rows = []
    for r in ga.search(customer_id=cid, query="""
        SELECT recommendation_subscription.resource_name, recommendation_subscription.type,
               recommendation_subscription.status, recommendation_subscription.create_date_time
        FROM recommendation_subscription"""):
        s = r.recommendation_subscription
        rows.append((s.type_.name, s.status.name, s.resource_name, s.create_date_time))
    return rows


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--apply", action="store_true", help="actually pause - default is a dry run")
    a = ap.parse_args()
    client, cid = load_client()
    ga = client.get_service("GoogleAdsService")
    rows = read(ga, cid)
    enabled = [r for r in rows if r[1] == "ENABLED"]
    named = [r for r in enabled if r[0] != "UNKNOWN"]
    unknown = [r for r in enabled if r[0] == "UNKNOWN"]
    print(f"{len(rows)} subscriptions · {len(enabled)} ENABLED · {len(named)} the API can pause · {len(unknown)} screen-only\n")
    for t, st, rn, dt in rows:
        print(f"  {'->' if (t, st, rn, dt) in named else '  '} {t:45s} {st:8s} since {str(dt)[:10]}")
    if unknown:
        print(f"\n{len(unknown)} read as UNKNOWN - retired types with no API name. Only the screen clears them:\n"
              "  ads.google.com -> Admin (left sidebar, bottom) -> Recommendations auto-apply -> untick -> Save")
    if not named:
        print("\nNothing the API can pause.")
        return
    if not a.apply:
        print(f"\nDry run - {len(named)} would be paused. Re-run with --apply.")
        return
    svc = client.get_service("RecommendationSubscriptionService")
    done = 0
    for t, _, rn, _ in named:
        op = client.get_type("RecommendationSubscriptionOperation")
        op.update.resource_name = rn
        op.update.status = client.enums.RecommendationSubscriptionStatusEnum.PAUSED
        op.update_mask.paths.append("status")
        try:
            svc.mutate_recommendation_subscription(customer_id=cid, operations=[op])
            print(f"  PAUSED {t}")
            done += 1
        except GoogleAdsException as e:
            print(f"  FAILED {t}: {e.failure.errors[0].message}")
    left = [r for r in read(ga, cid) if r[1] == "ENABLED"]
    print(f"\nPaused {done}. Read-back: {len(left)} still ENABLED"
          + (f" ({sum(1 for r in left if r[0] == 'UNKNOWN')} of them screen-only)." if left else "."))


if __name__ == "__main__":
    main()
