"""Every Google Ads account this connection can reach: name, ID, currency, manager flag and the
last 30 days of spend - so the owner recognises theirs at a glance before /audit reads a number.

Read-only. No developer token needed (google-ads 32 or newer). A manager account (MCC) is opened
one level: each account underneath is read THROUGH the manager, which is the only way an account
reached via an MCC answers. The account .env points at is marked.
Usage: python3 code/list_accounts.py [--days 30]
"""
import argparse
import datetime
import os
import sys

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

load_dotenv()

REQUIRED = ("GOOGLE_ADS_CLIENT_ID", "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_REFRESH_TOKEN")
CUSTOMER_QUERY = ("SELECT customer.id, customer.descriptive_name, customer.manager, "
                  "customer.currency_code, customer.status FROM customer")
CHILDREN_QUERY = ("SELECT customer_client.id, customer_client.manager FROM customer_client "
                  "WHERE customer_client.level = 1")


def base_config():
    missing = [k for k in REQUIRED if not os.getenv(k)]
    if missing:
        sys.exit(f"Missing in .env: {missing} - /api-setup walks you through each one")
    cfg = {"client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
           "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
           "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
           "use_proto_plus": True}
    token = os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN")
    if token:
        cfg["developer_token"] = token  # optional since 9 September 2026, ignored by Google
    return cfg


def service(login_id=None):
    cfg = base_config()
    if login_id:
        cfg["login_customer_id"] = str(login_id)
    return GoogleAdsClient.load_from_dict(cfg).get_service("GoogleAdsService")


def describe(cid, login_id, days):
    """One account, read through login_id: name, manager flag, currency, status, spend in the window."""
    ga = service(login_id)
    c = next(iter(ga.search(customer_id=str(cid), query=CUSTOMER_QUERY))).customer
    spend = None
    if not c.manager:
        end = datetime.date.today()
        start = end - datetime.timedelta(days=days)
        q = f"SELECT metrics.cost_micros FROM customer WHERE segments.date BETWEEN '{start}' AND '{end}'"
        spend = sum(r.metrics.cost_micros for r in ga.search(customer_id=str(cid), query=q)) / 1e6
    return {"id": str(c.id), "name": c.descriptive_name or "(no name set)", "manager": c.manager,
            "currency": c.currency_code, "status": c.status.name, "spend": spend}


def children(mcc_id):
    ga = service(mcc_id)
    return [str(r.customer_client.id) for r in ga.search(customer_id=str(mcc_id), query=CHILDREN_QUERY)]


def dashed(cid):
    s = str(cid)
    return f"{s[:3]}-{s[3:6]}-{s[6:]}" if len(s) == 10 else s


def line(acc, days, current, indent="  "):
    mark = "   <- the account .env points at" if acc["id"] == current else ""
    if acc["manager"]:
        return f"{indent}· {acc['name']} · {dashed(acc['id'])} · manager account{mark}"
    spend = f"${acc['spend']:,.0f} {acc['currency']} spent, last {days} days" if acc["spend"] is not None else "spend not readable"
    status = "" if acc["status"] == "ENABLED" else f" · {acc['status'].lower()}"
    return f"{indent}· {acc['name']} · {dashed(acc['id'])} · {spend}{status}{mark}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=30)
    args = ap.parse_args()
    current = (os.getenv("GOOGLE_ADS_CUSTOMER_ID") or "").replace("-", "")
    client = GoogleAdsClient.load_from_dict(base_config())
    ids = [rn.split("/")[-1] for rn in client.get_service("CustomerService").list_accessible_customers().resource_names]
    print(f"\nAccounts this connection can reach ({len(ids)} direct):\n")
    seen = set()
    for cid in ids:
        try:
            acc = describe(cid, cid, args.days)
        except Exception as e:  # noqa: BLE001 - one unreadable account must not hide the others
            print(f"  · {dashed(cid)} · could not read: {str(e).splitlines()[0][:90]}")
            continue
        seen.add(cid)
        print(line(acc, args.days, current))
        if not acc["manager"]:
            continue
        for child in children(cid):
            if child in seen:
                continue
            seen.add(child)
            try:
                print(line(describe(child, cid, args.days), args.days, current, indent="      "))
            except Exception as e:  # noqa: BLE001
                print(f"      · {dashed(child)} · could not read: {str(e).splitlines()[0][:90]}")
    print("\nPut the 10 digits of the account to audit in .env as GOOGLE_ADS_CUSTOMER_ID (no dashes).")
    print("Reached through a manager account? Put the manager's 10 digits in GOOGLE_ADS_LOGIN_CUSTOMER_ID.\n")


if __name__ == "__main__":
    main()
