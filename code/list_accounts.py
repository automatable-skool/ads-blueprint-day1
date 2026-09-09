"""Lists Google Ads accounts accessible to these credentials."""

import os
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

load_dotenv()

config = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "use_proto_plus": True,
}

client = GoogleAdsClient.load_from_dict(config)
svc = client.get_service("CustomerService")
resource_names = svc.list_accessible_customers().resource_names

print("\nAccessible customer IDs:")
for rn in resource_names:
    print("  " + rn.split("/")[-1])
