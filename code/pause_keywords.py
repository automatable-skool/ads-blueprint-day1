"""Pause keywords by ID or by text - the cleanup half of a recluster, and the fix for
dead duplicates. PAUSE only: this script never removes a keyword, so every change
reverses in one click.

Dry run by DEFAULT. Nothing is touched without --apply.

Usage (from the project root):
  python3 code/pause_keywords.py --campaign 123 --text "plumber jobs"        # every ad group in it
  python3 code/pause_keywords.py --file code/cache/keywords-pause.txt --apply

File format, one per line, ad group criterion address or campaign+text:
  adgroup:456789  criterion:111213
  campaign:1234567890  "plumber jobs"
"""

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402


def find_by_text(ga, customer_id, campaign_id, text):
    q = f"""
      SELECT ad_group.id, ad_group.name, ad_group_criterion.criterion_id,
             ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
             ad_group_criterion.status
      FROM keyword_view
      WHERE campaign.id = {campaign_id}
        AND ad_group_criterion.status = 'ENABLED'
    """
    hits = []
    for r in ga.search(customer_id=customer_id, query=q):
        if r.ad_group_criterion.keyword.text.lower() == text.lower():
            hits.append((str(r.ad_group.id), r.ad_group.name, str(r.ad_group_criterion.criterion_id),
                         r.ad_group_criterion.keyword.text, r.ad_group_criterion.keyword.match_type.name))
    return hits


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campaign", help="campaign ID (with --text)")
    ap.add_argument("--text", action="append", default=[], help="keyword text to pause everywhere in the campaign")
    ap.add_argument("--file", help="staged pause file (see format above)")
    ap.add_argument("--apply", action="store_true", help="actually pause - default is a dry run")
    a = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")

    targets = []  # (ad_group_id, criterion_id, label)
    if a.campaign and a.text:
        for t in a.text:
            hits = find_by_text(ga, customer_id, a.campaign, t)
            if not hits:
                print(f"campaign {a.campaign}: no enabled keyword \"{t}\"")
            for agid, agname, crid, text, mt in hits:
                targets.append((agid, crid, f"{agname} · \"{text}\" · {mt}"))
    if a.file:
        pair = re.compile(r"adgroup:(\d+)\s+criterion:(\d+)")
        camp = re.compile(r'campaign:(\d+)\s+"(.+)"')
        with open(a.file) as f:
            for n, line in enumerate(f, 1):
                t = line.strip()
                if not t or t.startswith("#"):
                    continue
                m = pair.search(t)
                if m:
                    targets.append((m.group(1), m.group(2), f"adgroup {m.group(1)} criterion {m.group(2)}"))
                    continue
                m = camp.search(t)
                if m:
                    for agid, agname, crid, text, mt in find_by_text(ga, customer_id, m.group(1), m.group(2)):
                        targets.append((agid, crid, f"{agname} · \"{text}\" · {mt}"))
                    continue
                sys.exit(f"{a.file}:{n}: unrecognised line: {t}")
    if not targets:
        sys.exit("Nothing to pause.")

    for _, _, label in targets:
        print(f"{'PAUSE' if a.apply else 'would pause'} · {label}")
    if not a.apply:
        print(f"\nDry run - {len(targets)} keyword(s) staged. Re-run with --apply.")
        return

    svc = client.get_service("AdGroupCriterionService")
    ops = []
    for agid, crid, _ in targets:
        op = client.get_type("AdGroupCriterionOperation")
        op.update.resource_name = f"customers/{customer_id}/adGroupCriteria/{agid}~{crid}"
        op.update.status = client.enums.AdGroupCriterionStatusEnum.PAUSED
        op.update_mask.paths.append("status")
        ops.append(op)
    try:
        svc.mutate_ad_group_criteria(customer_id=customer_id, operations=ops)
    except GoogleAdsException as e:
        sys.exit(f"API refused: {e.failure.errors[0].message}")
    print(f"\nPaused {len(ops)} keyword(s). Nothing was removed - unpause to reverse.")


if __name__ == "__main__":
    main()
