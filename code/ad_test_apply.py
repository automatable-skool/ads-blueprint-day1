"""Apply a called ad test: pause the loser, create the next challenger - PAUSED.

The push half of /ad-tests. Reads one JSON plan (written by Claude after the
human said yes) and does exactly what it says:
  1. pauses the losing ad (never removes it - its history stays readable)
  2. creates the new challenger RSA in the same ad group, landing PAUSED,
     same final URL as the champion unless the plan says otherwise
  3. optionally creates a rebuilt champion RSA the same way ("new_champion",
     same shape as "new_challenger"). A round where challenger lines beat
     champion lines pauses BOTH ads and creates BOTH new ads - the champion
     is never edited in place, because editing an RSA merges its stats.
Nothing is enabled by this script. The owner flips the new ads on.

Plan format (code/cache/ad-test-plan.json):
{
  "ad_group_id": "1234567890",
  "pause_ad_ids": ["111"],                      # the loser(s)
  "new_champion": { ... same shape ... },       # optional: rebuilt champion
  "new_challenger": {
    "final_url": "https://example.com/lp/emergency-plumber",
    "path1": "emergency", "path2": "plumber",   # optional
    "headlines": [
      {"text": "Emergency Plumber", "pin": "HEADLINE_1"},
      {"text": "We pick up at 2 AM"}
    ],
    "descriptions": [ {"text": "..."} ]
  }
}
Limits are checked before any call: 3-15 headlines (30 chars), 2-4
descriptions (90 chars), a DKI headline counts as its fallback text.

Usage (from the project root):
  python3 code/ad_test_apply.py --plan code/cache/ad-test-plan.json --dry-run
  python3 code/ad_test_apply.py --plan code/cache/ad-test-plan.json
"""

import argparse
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402

PIN_FIELDS = {"HEADLINE_1", "HEADLINE_2", "HEADLINE_3", "DESCRIPTION_1", "DESCRIPTION_2"}


def effective_len(text):
    m = re.fullmatch(r"\{KeyWord:(.+)\}", text, re.I)
    return len(m.group(1)) if m else len(text)


def validate(plan):
    problems = []
    if not re.fullmatch(r"\d{6,12}", str(plan.get("ad_group_id", ""))):
        problems.append("ad_group_id missing or not numeric")
    new_ads = [(k, plan.get(k)) for k in ("new_champion", "new_challenger") if plan.get(k)]
    for name, ad in new_ads:
        hs, ds = ad.get("headlines", []), ad.get("descriptions", [])
        if not (3 <= len(hs) <= 15):
            problems.append(f"{name}: {len(hs)} headlines - need 3 to 15")
        if not (2 <= len(ds) <= 4):
            problems.append(f"{name}: {len(ds)} descriptions - need 2 to 4")
        if not ad.get("final_url", "").startswith("http"):
            problems.append(f"{name}.final_url missing")
        for h in hs:
            if effective_len(h["text"]) > 30:
                problems.append(f"{name}: headline over 30 chars: {h['text']!r}")
            if h.get("pin") and h["pin"] not in PIN_FIELDS:
                problems.append(f"{name}: bad pin {h['pin']!r} on {h['text']!r}")
        for d in ds:
            if len(d["text"]) > 90:
                problems.append(f"{name}: description over 90 chars: {d['text']!r}")
        texts = [h["text"] for h in hs] + [d["text"] for d in ds]
        if len(set(texts)) != len(texts):
            problems.append(f"{name}: duplicate line inside the new ad")
    if not new_ads and not plan.get("pause_ad_ids"):
        problems.append("plan does nothing: no pause_ad_ids and no new ads")
    return problems


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--plan", required=True)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    with open(args.plan) as f:
        plan = json.load(f)
    problems = validate(plan)
    if problems:
        print("plan rejected:")
        for p in problems:
            print("  -", p)
        sys.exit(1)

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    enums = client.enums
    ag_id = str(plan["ad_group_id"])
    ops = []

    # Safety: never leave the group with zero enabled ads, never push past three.
    if not args.dry_run:
        q = f"""
          SELECT ad_group_ad.ad.id, ad_group_ad.status
          FROM ad_group_ad
          WHERE ad_group.id = {ag_id}
            AND ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD'
            AND ad_group_ad.status != 'REMOVED'
        """
        rows = list(ga.search(customer_id=customer_id, query=q))
        enabled = {str(r.ad_group_ad.ad.id) for r in rows if r.ad_group_ad.status.name == "ENABLED"}
        pausing = {str(x) for x in plan.get("pause_ad_ids", [])}
        if enabled and not (enabled - pausing):
            sys.exit("refused: this plan would pause every enabled ad in the group. "
                     "Enable the new challenger first, then pause the loser.")
        new_count = sum(1 for k in ("new_champion", "new_challenger") if plan.get(k))
        existing = {str(r.ad_group_ad.ad.id) for r in rows}
        after = len(existing - pausing) + new_count
        if new_count and after > 3:
            sys.exit(f"refused: this plan would leave {after} responsive search ads "
                     "in the group (Google's limit is 3). Pause more in the plan first.")

    for ad_id in plan.get("pause_ad_ids", []):
        op = client.get_type("MutateOperation")
        upd = op.ad_group_ad_operation.update
        upd.resource_name = ga.ad_group_ad_path(customer_id, ag_id, str(ad_id))
        upd.status = enums.AdGroupAdStatusEnum.PAUSED
        op.ad_group_ad_operation.update_mask.paths.append("status")
        ops.append(op)
        print(f"pause  ad {ad_id} in ad group {ag_id}")

    for role in ("new_champion", "new_challenger"):
        ch = plan.get(role)
        if not ch:
            continue
        op = client.get_type("MutateOperation")
        ada = op.ad_group_ad_operation.create
        ada.ad_group = ga.ad_group_path(customer_id, ag_id)
        ada.status = enums.AdGroupAdStatusEnum.PAUSED
        ada.ad.final_urls.append(ch["final_url"])
        rsa = ada.ad.responsive_search_ad
        for h in ch["headlines"]:
            a = client.get_type("AdTextAsset")
            a.text = h["text"]
            if h.get("pin"):
                a.pinned_field = getattr(enums.ServedAssetFieldTypeEnum, h["pin"])
            rsa.headlines.append(a)
        for d in ch["descriptions"]:
            a = client.get_type("AdTextAsset")
            a.text = d["text"]
            if d.get("pin"):
                a.pinned_field = getattr(enums.ServedAssetFieldTypeEnum, d["pin"])
            rsa.descriptions.append(a)
        if ch.get("path1"):
            rsa.path1 = ch["path1"]
        if ch.get("path2"):
            rsa.path2 = ch["path2"]
        ops.append(op)
        label = role.replace("new_", "")
        print(f"create {label} in ad group {ag_id}: {len(ch['headlines'])} headlines, "
              f"{len(ch['descriptions'])} descriptions, PAUSED -> {ch['final_url']}")

    if args.dry_run:
        print("\ndry run - nothing pushed")
        return

    req = client.get_type("MutateGoogleAdsRequest")
    req.customer_id = customer_id
    req.mutate_operations.extend(ops)
    res = ga.mutate(request=req)
    print(f"\ndone - {len(res.mutate_operation_responses)} operation(s) applied. New ads are PAUSED; enable them yourself.")


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"Google Ads API error (request_id {e.request_id}) - nothing applied (atomic):", file=sys.stderr)
        for err in e.failure.errors:
            print(f"  - {err.error_code}: {err.message}", file=sys.stderr)
        sys.exit(1)
