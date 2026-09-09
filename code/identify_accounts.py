"""Identifies each accessible account: name, manager flag, currency."""

import os
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

load_dotenv()

base = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "use_proto_plus": True,
}

# The accounts this token can reach. Discovered, never hardcoded - an earlier version shipped a
# real client roster in the file. (Sanitised 3 September 2026.)
ids = [rn.split("/")[-1] for rn in
       client.get_service("CustomerService").list_accessible_customers().resource_names]

query = """
    SELECT customer.id, customer.descriptive_name,
           customer.manager, customer.currency_code, customer.status
    FROM customer
"""

print(f"{'ID':<12} {'MANAGER':<8} {'CURRENCY':<9} NAME")
print("-" * 60)
for cid in ids:
    cfg = dict(base, login_customer_id=cid)
    client = GoogleAdsClient.load_from_dict(cfg)
    svc = client.get_service("GoogleAdsService")
    try:
        for row in svc.search(customer_id=cid, query=query):
            c = row.customer
            flag = "MCC" if c.manager else "account"
            print(f"{c.id:<12} {flag:<8} {c.currency_code:<9} {c.descriptive_name}")
    except Exception as e:
        msg = str(e).splitlines()[0][:45]
        print(f"{cid:<12} {'?':<8} {'?':<9} (err: {msg})")
