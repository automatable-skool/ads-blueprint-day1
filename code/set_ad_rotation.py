"""Set ad rotation to OPTIMIZE (Google serves the ad expected to do best) on live Search campaigns.
Dry run by default; --apply writes. Prints a read-back after the write and the revert line.
Usage: python3 code/set_ad_rotation.py [--apply] [--campaign-ids 1,2,3]
Revert: same script with --rotation ROTATE_INDEFINITELY --apply on the same ids.
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.api_core import protobuf_helpers  # noqa: E402


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--rotation", default="OPTIMIZE", choices=["OPTIMIZE", "CONVERSION_OPTIMIZE", "ROTATE_INDEFINITELY"])
    ap.add_argument("--campaign-ids", default="")
    args = ap.parse_args()
    client, cid = load_client()
    ga = client.get_service("GoogleAdsService")
    want = {int(x) for x in args.campaign_ids.split(",") if x.strip()}
    rows = list(ga.search(customer_id=cid, query=(
        "SELECT campaign.id, campaign.name, campaign.status, campaign.ad_serving_optimization_status FROM campaign "
        "WHERE campaign.status='ENABLED' AND campaign.advertising_channel_type='SEARCH'")))
    todo = [r for r in rows if r.campaign.ad_serving_optimization_status.name != args.rotation and (not want or r.campaign.id in want)]
    for r in rows:
        print(f"{r.campaign.id} {r.campaign.name[:40]:40} {r.campaign.ad_serving_optimization_status.name}"
              + ("  -> " + args.rotation if r in todo else ""))
    if not todo:
        print("nothing to change"); return
    if not args.apply:
        print(f"dry run: {len(todo)} campaigns would change; add --apply"); return
    svc = client.get_service("CampaignService")
    ops = []
    for r in todo:
        op = client.get_type("CampaignOperation")
        op.update.resource_name = svc.campaign_path(cid, r.campaign.id)
        op.update.ad_serving_optimization_status = client.enums.AdServingOptimizationStatusEnum[args.rotation]
        client.copy_from(op.update_mask, protobuf_helpers.field_mask(None, op.update._pb))
        ops.append(op)
    res = svc.mutate_campaigns(customer_id=cid, operations=ops)
    print(f"written: {len(res.results)} campaigns")
    back = list(ga.search(customer_id=cid, query=(
        "SELECT campaign.id, campaign.ad_serving_optimization_status FROM campaign WHERE campaign.id IN ("
        + ",".join(str(r.campaign.id) for r in todo) + ")")))
    print("read back:", {b.campaign.id: b.campaign.ad_serving_optimization_status.name for b in back})
    before = {r.campaign.id: r.campaign.ad_serving_optimization_status.name for r in todo}
    print("revert: python3 code/set_ad_rotation.py --rotation " + next(iter(before.values())) + " --apply --campaign-ids " + ",".join(str(i) for i in before))


if __name__ == "__main__":
    main()
