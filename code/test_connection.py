"""Tests the Google Ads API connection by pulling a few campaigns."""

import os
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

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
