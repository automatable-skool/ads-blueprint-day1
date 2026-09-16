"""
Create a warm-pixel remarketing audience (anyone who visited the domain),
then optionally attach it to an ad group as RLSA observation with a bid modifier.

Args:
  --domain         e.g. acmeplumbing.com
  --name           Audience name (default derived from domain)
  --lookback       Membership lifespan in days (default 540, max 540)
  --ad-group-id    Numeric ad group ID to attach to (optional)
  --bid-modifier   Percentage above base bid (default 50 → +50%, i.e. multiplier 1.5)

Output:
  Prints JSON with user_list_resource_name and (if attached) ad_group_criterion.
"""
import argparse
import json
import os
import pathlib
import sys
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

ROOT = pathlib.Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")


def get_client() -> GoogleAdsClient:
    config = {
        "developer_token": os.environ["GOOGLE_ADS_DEVELOPER_TOKEN"],
        "client_id": os.environ["GOOGLE_ADS_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_ADS_CLIENT_SECRET"],
        "refresh_token": os.environ["GOOGLE_ADS_REFRESH_TOKEN"],
        "login_customer_id": os.environ["GOOGLE_ADS_LOGIN_CUSTOMER_ID"],
        "use_proto_plus": True,
    }
    return GoogleAdsClient.load_from_dict(config)


def find_existing_userlist(client: GoogleAdsClient, cid: str, name: str) -> str | None:
    svc = client.get_service("GoogleAdsService")
    query = f"""
      SELECT user_list.resource_name, user_list.id
      FROM user_list
      WHERE user_list.name = '{name}'
      LIMIT 1
    """
    for row in svc.search(customer_id=cid, query=query):
        return row.user_list.resource_name
    return None


def create_warm_pixel_audience(
    client: GoogleAdsClient,
    cid: str,
    name: str,
    domain: str,
    lookback: int,
) -> str:
    """Rule-based user list: anyone whose visited URL contains the domain."""
    svc = client.get_service("UserListService")
    op = client.get_type("UserListOperation")
    ul = op.create

    ul.name = name
    ul.description = (
        f"Anyone who has visited any page on {domain} in the last {lookback} days. "
        "Populated by the global gtag installed on the landing pages."
    )
    ul.membership_status = client.enums.UserListMembershipStatusEnum.OPEN
    ul.membership_life_span = lookback

    # Build the URL-contains rule.
    rule_item = client.get_type("UserListRuleItemInfo")
    rule_item.name = "url__"  # Reserved name targeting the URL of the pageview
    rule_item.string_rule_item.operator = (
        client.enums.UserListStringRuleItemOperatorEnum.CONTAINS
    )
    rule_item.string_rule_item.value = domain

    rule_item_group = client.get_type("UserListRuleItemGroupInfo")
    rule_item_group.rule_items.append(rule_item)

    # Wrap as a flexible rule with a 540-day lookback (max).
    operand = client.get_type("FlexibleRuleOperandInfo")
    operand.rule.rule_item_groups.append(rule_item_group)
    operand.lookback_window_days = lookback

    ul.rule_based_user_list.flexible_rule_user_list.inclusive_rule_operator = (
        client.enums.UserListFlexibleRuleOperatorEnum.AND
    )
    ul.rule_based_user_list.flexible_rule_user_list.inclusive_operands.append(operand)

    response = svc.mutate_user_lists(customer_id=cid, operations=[op])
    return response.results[0].resource_name


def attach_to_ad_group(
    client: GoogleAdsClient,
    cid: str,
    ad_group_id: str,
    user_list_resource_name: str,
    bid_modifier_pct: float,
) -> str:
    """Attach the user list to the ad group as an Observation criterion with bid modifier."""
    svc = client.get_service("AdGroupCriterionService")
    op = client.get_type("AdGroupCriterionOperation")
    c = op.create

    c.ad_group = f"customers/{cid}/adGroups/{ad_group_id}"
    c.user_list.user_list = user_list_resource_name
    c.bid_modifier = 1.0 + (bid_modifier_pct / 100.0)
    c.status = client.enums.AdGroupCriterionStatusEnum.ENABLED

    response = svc.mutate_ad_group_criteria(customer_id=cid, operations=[op])
    return response.results[0].resource_name


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--domain", required=True)
    p.add_argument("--name", default=None)
    p.add_argument("--lookback", type=int, default=540)
    p.add_argument("--ad-group-id", default=None)
    p.add_argument("--bid-modifier", type=float, default=50.0)
    args = p.parse_args()

    cid = os.environ["GOOGLE_ADS_CUSTOMER_ID"].replace("-", "")
    client = get_client()

    name = args.name or f"Warm pixel · all visitors · {args.domain} · {args.lookback}d"

    existing = find_existing_userlist(client, cid, name)
    if existing:
        print(f"⚠ Audience '{name}' already exists: {existing}", file=sys.stderr)
        user_list_resource_name = existing
    else:
        try:
            user_list_resource_name = create_warm_pixel_audience(
                client, cid, name, args.domain, args.lookback
            )
            print(f"✓ Created audience: {user_list_resource_name}", file=sys.stderr)
        except GoogleAdsException as e:
            print(f"✗ Failed to create audience: {e}", file=sys.stderr)
            return 1

    result: dict = {
        "user_list_resource_name": user_list_resource_name,
        "name": name,
    }

    if args.ad_group_id:
        try:
            criterion_rn = attach_to_ad_group(
                client, cid, args.ad_group_id, user_list_resource_name, args.bid_modifier
            )
            print(f"✓ Attached to ad group {args.ad_group_id}: {criterion_rn}", file=sys.stderr)
            result["ad_group_criterion_resource_name"] = criterion_rn
            result["bid_modifier_pct"] = args.bid_modifier
        except GoogleAdsException as e:
            print(f"✗ Failed to attach to ad group: {e}", file=sys.stderr)
            result["attach_error"] = str(e)

    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
