"""Who you actually lose to - Auction Insights straight from the API.

Only works once the account has impressions. For a brand-new account this is empty,
and that is expected: the outside-in scout (/scrape-competitors) covers that case.

Google hides competitors under 10% impression share, so a short list is not a small market.

Usage:
  python3 code/auction_insights.py --customer 9876543210 --days 30
  python3 code/auction_insights.py --customer 9876543210 --days 30 --by-campaign
"""
import argparse
import os
import pathlib
import sys
from collections import defaultdict

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

ROOT = pathlib.Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

# Auction-insight metrics carry their own prefix. The plain metrics.search_*
# names are a different report and the API rejects them beside the segment.
METRICS = [
    "metrics.auction_insight_search_impression_share",
    "metrics.auction_insight_search_overlap_rate",
    "metrics.auction_insight_search_outranking_share",
    "metrics.auction_insight_search_position_above_rate",
    "metrics.auction_insight_search_top_impression_percentage",
    "metrics.auction_insight_search_absolute_top_impression_percentage",
]


REQUIRED = ["GOOGLE_ADS_CLIENT_ID",
            "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_REFRESH_TOKEN"]


def get_client(login_cid):
    missing = [k for k in REQUIRED if not os.getenv(k)]
    if missing:
        sys.exit("Missing from .env: " + ", ".join(missing) +
                 "\nRun /api-setup to fill these in, then try again.")
    return GoogleAdsClient.load_from_dict({
        "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
        "client_id": os.environ["GOOGLE_ADS_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_ADS_CLIENT_SECRET"],
        "refresh_token": os.environ["GOOGLE_ADS_REFRESH_TOKEN"],
        "login_customer_id": login_cid,
        "use_proto_plus": True,
    })


def pct(v):
    return f"{v * 100:5.1f}%" if v else "    -"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--customer", default=os.getenv("GOOGLE_ADS_CUSTOMER_ID"))
    ap.add_argument("--days", type=int, default=30)
    ap.add_argument("--by-campaign", action="store_true", help="break the table out per campaign")
    args = ap.parse_args()

    if not args.customer:
        sys.exit("No customer id. Pass --customer or set GOOGLE_ADS_CUSTOMER_ID in .env")
    cid = args.customer.replace("-", "")
    login = (os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") or cid).replace("-", "")

    fields = ["segments.auction_insight_domain"] + METRICS
    if args.by_campaign:
        fields.insert(0, "campaign.name")
    # auction_insight_domain is not filterable in WHERE - drop the blanks in Python.
    query = f"""
        SELECT {', '.join(fields)}
        FROM campaign
        WHERE segments.date DURING LAST_{args.days}_DAYS
    """

    service = get_client(login).get_service("GoogleAdsService")
    try:
        rows = [r for r in service.search(customer_id=cid, query=query)
                if r.segments.auction_insight_domain]
    except Exception as e:  # noqa: BLE001 - surface the API's own message, it is the useful part
        msg = str(e)
        if "have access to metrics" in msg:
            sys.exit("Your access level cannot read auction-insight metrics - Basic access does not\n"
                     "include them. Nothing to fix in this script. Pull the report by hand instead:\n"
                     "Google Ads -> Campaigns -> Insights and reports -> Auction insights.")
        if "auction_insight" in msg or "PROHIBITED" in msg or "UNRECOGNIZED" in msg:
            sys.exit("This API version rejected the auction-insight segment. Pull the report from the "
                     "UI instead: Campaigns -> Insights and reports -> Auction insights, then paste it in.")
        sys.exit(msg.strip().splitlines()[0])

    if not rows:
        print("No auction insights yet.\n"
              "Expected on a new account - Google needs impressions first, and it hides anyone under\n"
              "10% impression share. Use /scrape-competitors for the outside-in view until this fills in.")
        return

    agg = defaultdict(lambda: defaultdict(float))
    counts = defaultdict(int)
    for r in rows:
        key = (r.campaign.name, r.segments.auction_insight_domain) if args.by_campaign else (r.segments.auction_insight_domain,)
        m = r.metrics
        agg[key]["is"] += m.auction_insight_search_impression_share or 0
        agg[key]["overlap"] += m.auction_insight_search_overlap_rate or 0
        agg[key]["outrank"] += m.auction_insight_search_outranking_share or 0
        agg[key]["above"] += m.auction_insight_search_position_above_rate or 0
        agg[key]["top"] += m.auction_insight_search_top_impression_percentage or 0
        counts[key] += 1

    print(f"\nAuction insights - last {args.days} days, customer {cid}\n")
    label = "campaign / domain" if args.by_campaign else "domain"
    print(f"{label:<44}{'imp share':>10}{'overlap':>10}{'they beat you':>15}{'you outrank':>13}")
    print("-" * 92)
    ordered = sorted(agg.items(), key=lambda kv: -kv[1]["is"] / counts[kv[0]])
    for key, m in ordered:
        n = counts[key]
        name = " / ".join(key)
        print(f"{name[:43]:<44}{pct(m['is']/n):>10}{pct(m['overlap']/n):>10}"
              f"{pct(m['above']/n):>15}{pct(m['outrank']/n):>13}")

    print("\nHow to read it:")
    print("  imp share     - how often they showed, out of the auctions they entered")
    print("  overlap       - how often you both showed in the same auction (your real rivals)")
    print("  they beat you - when you both showed, how often they ranked above you")
    print("  you outrank   - how often you showed above them, or showed when they did not")
    print("\nAnyone under 10% impression share is hidden by Google. A short list is not a small market.")


if __name__ == "__main__":
    main()
