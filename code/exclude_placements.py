"""Exclude placements account-wide - the fix for junk YouTube/Display placements that
Performance Max spends on. Account-level negative criteria apply to PMax, Display
and video; there is no per-campaign "switch YouTube off" in the API.

Dry run by DEFAULT. Nothing is touched without --apply.

Usage (from the project root):
  python3 code/exclude_placements.py --report                 # top spending placements, 30 days
  python3 code/exclude_placements.py --site spam-site.com --apply
  python3 code/exclude_placements.py --channel UCxxxxxxxx --apply
  python3 code/exclude_placements.py --file code/cache/placements-exclude.txt --apply

File format, one per line:
  site: spam-site.com
  channel: UCxxxxxxxxxxxxxxxxxxxxxx
  video: dQw4w9WgXcQ
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402


def report(ga, customer_id):
    q = """
      SELECT group_placement_view.display_name, group_placement_view.placement_type,
             group_placement_view.target_url, metrics.cost_micros, metrics.clicks, metrics.conversions
      FROM group_placement_view
      WHERE segments.date DURING LAST_30_DAYS
      ORDER BY metrics.cost_micros DESC
      LIMIT 40
    """
    rows = list(ga.search(customer_id=customer_id, query=q))
    if not rows:
        print("No placement rows in the last 30 days.")
        return
    for r in rows:
        cost = r.metrics.cost_micros / 1e6
        print(f"- {r.group_placement_view.display_name} · {r.group_placement_view.placement_type.name}"
              f" · ${cost:,.2f} · {r.metrics.clicks} clicks · {r.metrics.conversions:.1f} leads"
              f" · {r.group_placement_view.target_url}")


def existing(ga, customer_id):
    q = """
      SELECT customer_negative_criterion.resource_name, customer_negative_criterion.type,
             customer_negative_criterion.placement.url,
             customer_negative_criterion.youtube_channel.channel_id,
             customer_negative_criterion.youtube_video.video_id
      FROM customer_negative_criterion
    """
    have = set()
    for r in ga.search(customer_id=customer_id, query=q):
        c = r.customer_negative_criterion
        have.add(c.placement.url or c.youtube_channel.channel_id or c.youtube_video.video_id)
    return have


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--report", action="store_true", help="show where placement money went, then exit")
    ap.add_argument("--site", action="append", default=[], help="website URL to exclude (repeatable)")
    ap.add_argument("--channel", action="append", default=[], help="YouTube channel ID to exclude")
    ap.add_argument("--video", action="append", default=[], help="YouTube video ID to exclude")
    ap.add_argument("--file", help="staged exclusions file (see format above)")
    ap.add_argument("--apply", action="store_true", help="actually exclude - default is a dry run")
    a = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")

    if a.report:
        report(ga, customer_id)
        return

    wants = [("site", s) for s in a.site] + [("channel", c) for c in a.channel] + [("video", v) for v in a.video]
    if a.file:
        with open(a.file) as f:
            for n, line in enumerate(f, 1):
                t = line.strip()
                if not t or t.startswith("#"):
                    continue
                if ":" not in t:
                    sys.exit(f"{a.file}:{n}: expected 'site:|channel:|video: value', got: {t}")
                kind, val = (x.strip() for x in t.split(":", 1))
                if kind not in ("site", "channel", "video"):
                    sys.exit(f"{a.file}:{n}: unknown kind '{kind}'")
                wants.append((kind, val))
    if not wants:
        sys.exit("Nothing to do - use --report, or give --site/--channel/--video/--file.")

    have = existing(ga, customer_id)
    todo = [(k, v) for k, v in wants if v not in have]
    for k, v in wants:
        if v in have:
            print(f"already excluded · {k} · {v}")
    for k, v in todo:
        print(f"{'EXCLUDE' if a.apply else 'would exclude'} · {k} · {v}")
    if not todo:
        return
    if not a.apply:
        print(f"\nDry run - {len(todo)} exclusion(s) staged. Re-run with --apply.")
        return

    svc = client.get_service("CustomerNegativeCriterionService")
    ops = []
    for kind, val in todo:
        op = client.get_type("CustomerNegativeCriterionOperation")
        if kind == "site":
            op.create.placement.url = val
        elif kind == "channel":
            op.create.youtube_channel.channel_id = val
        else:
            op.create.youtube_video.video_id = val
        ops.append(op)
    try:
        svc.mutate_customer_negative_criteria(customer_id=customer_id, operations=ops)
    except GoogleAdsException as e:
        sys.exit(f"API refused: {e.failure.errors[0].message}")
    print(f"\nExcluded {len(ops)} placement(s), account-wide (covers PMax).")
    print("See them: Tools > Content suitability > Excluded placements, or "
          f"https://ads.google.com/aw/contentexclusions?__c={customer_id}")


if __name__ == "__main__":
    main()
