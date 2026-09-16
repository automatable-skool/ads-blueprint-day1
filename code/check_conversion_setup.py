"""Shows current conversion tracking state: actions, auto-tagging, enhanced conversions."""

import os
import re
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

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
ga_service = client.get_service("GoogleAdsService")
customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")

customer_query = """
    SELECT
      customer.id,
      customer.auto_tagging_enabled,
      customer.conversion_tracking_setting.conversion_tracking_id,
      customer.conversion_tracking_setting.conversion_tracking_status,
      customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled,
      customer.call_reporting_setting.call_reporting_enabled,
      customer.call_reporting_setting.call_conversion_reporting_enabled
    FROM customer
"""
for row in ga_service.search(customer_id=customer_id, query=customer_query):
    c = row.customer
    print(f"Customer: {c.id}")
    print(f"  Auto-tagging enabled: {c.auto_tagging_enabled}")
    print(f"  Conversion tracking ID: {c.conversion_tracking_setting.conversion_tracking_id}")
    print(f"  Conversion tracking status: {c.conversion_tracking_setting.conversion_tracking_status.name}")
    print(f"  Enhanced conversions for leads: {c.conversion_tracking_setting.enhanced_conversions_for_leads_enabled}")
    print(f"  Call reporting enabled: {c.call_reporting_setting.call_reporting_enabled}")
    print(f"  Call conversion reporting: {c.call_reporting_setting.call_conversion_reporting_enabled}")

action_query = """
    SELECT
      conversion_action.id,
      conversion_action.name,
      conversion_action.type,
      conversion_action.category,
      conversion_action.status,
      conversion_action.primary_for_goal,
      conversion_action.counting_type,
      conversion_action.phone_call_duration_seconds,
      conversion_action.tag_snippets
    FROM conversion_action
    WHERE conversion_action.status != 'REMOVED'
"""
def send_to_labels(action) -> list[str]:
    """Pull every AW-XXXX/label pair out of an action's event snippets."""
    labels = []
    for snippet in action.tag_snippets:
        for text in (snippet.event_snippet, snippet.global_site_tag):
            for match in re.findall(r"[\'\"]send_to[\'\"]\s*:\s*[\'\"]([^\'\"]+)[\'\"]", text or ""):
                if match not in labels:
                    labels.append(match)
    return labels


print("\nExisting conversion actions:")
found = False
for row in ga_service.search(customer_id=customer_id, query=action_query):
    a = row.conversion_action
    found = True
    role = "PRIMARY" if a.primary_for_goal else "SECONDARY"
    print(f"  · [{a.id}] {a.name} - {a.type_.name}/{a.category.name} - {role} - {a.status.name}")
    # The gtag label is what the landing page actually needs. Printing it here
    # is why /landing-page never has to ask for conversion labels in a second
    # prompt - they are read off the account in the same run that builds the page.
    for label in send_to_labels(a):
        print(f"        send_to: {label}")
if not found:
    print("  (none)")
