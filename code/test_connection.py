"""Tests the Google Ads API connection by pulling a few campaigns.

No developer token needed since 9 September 2026 - the access level comes from the Cloud project
behind the OAuth client. Needs google-ads 32.0.0 or newer (pip install --upgrade google-ads).
"""

import os
import sys
from importlib.metadata import version

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

load_dotenv()

config = {
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") or None,
    "use_proto_plus": True,
}
missing = [k for k, v in config.items() if not v and k != "login_customer_id"]
if missing:
    sys.exit(f"Missing in .env: {missing} - /api-setup walks you through each one")

token = os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN")
if token:
    config["developer_token"] = token  # optional since 9 September 2026, ignored by Google
elif int(version("google-ads").split(".")[0]) < 32:
    sys.exit("google-ads 32.0.0 or newer is needed to call the API without a developer token: "
             "pip install --upgrade google-ads")

client = GoogleAdsClient.load_from_dict(config)
ga_service = client.get_service("GoogleAdsService")

customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
query = """
    SELECT campaign.id, campaign.name, campaign.status
    FROM campaign
    LIMIT 5
"""

response = ga_service.search(customer_id=customer_id, query=query)
print("\n✓ Connection works. First 5 campaigns:\n")
for row in response:
    print(f"  · {row.campaign.name} ({row.campaign.status.name})")
