"""Generates a Google Ads refresh token.

Reads client config from credentials.json, opens a browser for consent,
and prints the refresh token. Run: python3 get_refresh_token.py
"""

import json
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/adwords"]

with open("credentials.json") as f:
    client_config = json.load(f)

flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
creds = flow.run_local_server(port=0, prompt="consent", access_type="offline")

print("\n\n=== YOUR REFRESH TOKEN ===")
print(creds.refresh_token)
print("==========================\n")
