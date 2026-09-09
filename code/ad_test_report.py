"""The champion vs challenger read - read-only.

The data behind /ad-tests. Nothing is paused or promoted here - that is
ad_test_apply.py, after a human yes.

THE VERDICT IS CLICK-THROUGH RATE (Jono's ruling, 2026-08-31). Waiting for
enough conversions to call a test costs a local account months per round, and
a test you never finish teaches you nothing. Conversions are still pulled, and
when both ads have real conversion data the report cross-checks them: if the
cheaper cost per conversion belongs to the OTHER ad, that contradiction is
printed next to the verdict. It is never silently dropped, and it never
auto-overrides the call - it is there so you can look before promoting.

TWO WINDOWS, because they answer two different questions:

  - The PAIR window (--pair-days, default 14) judges champion vs challenger.
    Older data belongs to an ad that no longer exists.
  - The ASSET window is LIFETIME by default (2025-06-05 to yesterday). A
    headline's record does not reset because you built a new ad around it.
    Override with --asset-days only if you want a deliberately recent read.

Per-asset conversions do not exist before 2025-06-05 (Google), so both windows
are floored there and no flag can push them earlier.

THE LINE VIEW is the speed unlock. The same headline text is the same asset ID
everywhere it runs, so every line is aggregated across every ad, ad group and
campaign it has ever appeared in. Four ad groups running one headline gives
four times the data on that line. Judge the LINE, not the ad group. It needs
the text to match exactly - "Book today" and "Book today." are different
assets with separate histories.

PINNED AND UNPINNED ARE RANKED SEPARATELY. A headline pinned to position 1
serves on every impression by force, so its numbers are not comparable with a
headline running free. Every pin position is its own league table, the
unpinned pool is its own, and Google's auto-created assets are reported but
never ranked. Assets below the ~500-impression learning floor are listed as
untested rather than as losers - they never got an audition.

Usage (from the project root):
  python3 code/ad_test_report.py                          # 14d pair, lifetime assets
  python3 code/ad_test_report.py --pair-days 28
  python3 code/ad_test_report.py --asset-days 90          # deliberately recent asset read
  python3 code/ad_test_report.py --ad-group 1234567890
  python3 code/ad_test_report.py --out code/cache/ad-tests.json
"""
import argparse
import json
import math
import os
import sys
from datetime import date, timedelta

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402

ASSET_METRICS_FROM = date(2025, 6, 5)
# An asset needs ~500 impressions (in an ad with ~2,000) before Google rates it.
# Below this a line has not been tested - it is not a loser.
ASSET_LEARNING_IMPRESSIONS = 500


def micros(v):
    return round((v or 0) / 1_000_000, 2)


def window(days):
    """Yesterday back N days, never earlier than the per-asset data floor."""
    end = date.today() - timedelta(days=1)
    start = max(end - timedelta(days=days - 1), ASSET_METRICS_FROM)
    return start.isoformat(), end.isoformat()


def all_time_window():
    """Every day per-asset data exists for, up to yesterday."""
    end = date.today() - timedelta(days=1)
    return ASSET_METRICS_FROM.isoformat(), end.isoformat()


def derive(d):
    """Per-asset rates. Directional only - see the module docstring."""
    imp, clicks, cost, conv = d["impressions"], d["clicks"], d["cost"], d["conversions"]
    d["ctr"] = round(clicks / imp, 4) if imp else 0.0
    d["avg_cpc"] = round(cost / clicks, 2) if clicks else None
    d["conv_rate"] = round(conv / clicks, 4) if clicks else 0.0
    d["cost_per_conversion"] = round(cost / conv, 2) if conv else None
    d["conversions_per_impression"] = round(conv / imp, 5) if imp else 0.0
    d["value_per_cost"] = round(d.get("conv_value", 0.0) / cost, 2) if cost else None
    d["below_learning_floor"] = imp < ASSET_LEARNING_IMPRESSIONS
    return d


def confidence_ctr(a, b):
    """Two-proportion z-test on click-through rate. Returns 0-100.

    CTR is the verdict metric (Jono's ruling, 2026-08-31), so the confidence
    read has to be on the same number the call is made on. Testing significance
    on one metric and calling the winner on another is how you get verdicts
    that never reproduce.
    """
    n1, n2 = a["impressions"], b["impressions"]
    if n1 < 100 or n2 < 100:
        return 0.0
    p1, p2 = a["clicks"] / n1, b["clicks"] / n2
    p = (a["clicks"] + b["clicks"]) / (n1 + n2)
    if p <= 0 or p >= 1:
        return 0.0
    se = math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2))
    if se == 0:
        return 0.0
    z = abs(p1 - p2) / se
    return round(math.erf(z / math.sqrt(2)) * 100, 1)


def pull_ads(ga, customer_id, start, end, ad_group_id=None):
    where = (f"segments.date BETWEEN '{start}' AND '{end}' "
             f"AND ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD' AND ad_group_ad.status != 'REMOVED'")
    if ad_group_id:
        where += f" AND ad_group.id = {ad_group_id}"
    q = f"""
      SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
             ad_group_ad.ad.id, ad_group_ad.ad.name, ad_group_ad.status,
             ad_group_ad.ad_strength, ad_group_ad.ad.final_urls,
             ad_group_ad.ad.responsive_search_ad.headlines,
             ad_group_ad.ad.responsive_search_ad.descriptions,
             metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
      FROM ad_group_ad
      WHERE {where}
    """
    ads = {}
    for r in ga.search(customer_id=customer_id, query=q):
        aid = str(r.ad_group_ad.ad.id)
        rsa = r.ad_group_ad.ad.responsive_search_ad
        cur = ads.setdefault(aid, {
            "ad_id": aid,
            "label": r.ad_group_ad.ad.name or "",
            "status": r.ad_group_ad.status.name,
            "ad_strength": r.ad_group_ad.ad_strength.name,
            "final_url": list(r.ad_group_ad.ad.final_urls)[0] if r.ad_group_ad.ad.final_urls else "",
            "campaign_id": str(r.campaign.id), "campaign": r.campaign.name,
            "ad_group_id": str(r.ad_group.id), "ad_group": r.ad_group.name,
            "headlines": [{"text": h.text, "pinned": h.pinned_field.name if h.pinned_field.name != "UNSPECIFIED" else None} for h in rsa.headlines],
            "descriptions": [{"text": d.text, "pinned": d.pinned_field.name if d.pinned_field.name != "UNSPECIFIED" else None} for d in rsa.descriptions],
            "impressions": 0, "clicks": 0, "cost": 0.0, "conversions": 0.0,
        })
        cur["impressions"] += r.metrics.impressions
        cur["clicks"] += r.metrics.clicks
        cur["cost"] = round(cur["cost"] + micros(r.metrics.cost_micros), 2)
        cur["conversions"] = round(cur["conversions"] + r.metrics.conversions, 1)
    for a in ads.values():
        a["ctr"] = round(a["clicks"] / a["impressions"], 4) if a["impressions"] else 0.0
        a["conv_rate"] = round(a["conversions"] / a["clicks"], 4) if a["clicks"] else 0.0
        a["cost_per_conversion"] = round(a["cost"] / a["conversions"], 2) if a["conversions"] else None
        a["conversions_per_impression"] = round(a["conversions"] / a["impressions"], 5) if a["impressions"] else 0.0
    return ads


def pull_assets(ga, customer_id, start, end, ad_group_id=None):
    """Per-asset numbers - what the UI shows under 'View asset details'.

    Keyed by (asset_id, field_type, pinned_field) so the SAME headline text is
    aggregated across every ad, ad group and campaign it has ever run in. Pin
    position is part of the key on purpose: a headline pinned to position 1
    serves on every impression by force, so its numbers are not comparable with
    the same text running free.
    """
    where = (f"segments.date BETWEEN '{start}' AND '{end}' "
             f"AND ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD'")
    if ad_group_id:
        where += f" AND ad_group.id = {ad_group_id}"
    q = f"""
      SELECT ad_group_ad.ad.id, ad_group.id, ad_group.name, campaign.id, campaign.name,
             ad_group_ad_asset_view.field_type,
             ad_group_ad_asset_view.pinned_field,
             ad_group_ad_asset_view.enabled,
             ad_group_ad_asset_view.source,
             asset.id, asset.text_asset.text,
             metrics.impressions, metrics.clicks, metrics.cost_micros,
             metrics.conversions, metrics.conversions_value
      FROM ad_group_ad_asset_view
      WHERE {where}
    """
    per_ad, per_line = {}, {}
    for r in ga.search(customer_id=customer_id, query=q):
        v = r.ad_group_ad_asset_view
        aid = str(r.ad_group_ad.ad.id)
        text = r.asset.text_asset.text
        field = v.field_type.name
        pin = v.pinned_field.name if v.pinned_field.name != "UNSPECIFIED" else None
        gen = v.source.name == "AUTOMATICALLY_CREATED"
        m = r.metrics

        cur = per_ad.setdefault((aid, field, text), {
            "ad_id": aid, "asset_id": str(r.asset.id), "field": field, "text": text,
            "pinned": pin, "google_generated": gen, "enabled": v.enabled,
            "impressions": 0, "clicks": 0, "cost": 0.0, "conversions": 0.0, "conv_value": 0.0,
        })
        line = per_line.setdefault((str(r.asset.id), field, pin), {
            "asset_id": str(r.asset.id), "field": field, "text": text, "pinned": pin,
            "google_generated": gen,
            "ad_ids": set(), "ad_groups": set(), "campaigns": set(),
            "impressions": 0, "clicks": 0, "cost": 0.0, "conversions": 0.0, "conv_value": 0.0,
        })
        line["ad_ids"].add(aid)
        line["ad_groups"].add(r.ad_group.name)
        line["campaigns"].add(r.campaign.name)
        for d in (cur, line):
            d["impressions"] += m.impressions
            d["clicks"] += m.clicks
            d["cost"] = round(d["cost"] + micros(m.cost_micros), 2)
            d["conversions"] = round(d["conversions"] + m.conversions, 1)
            d["conv_value"] = round(d["conv_value"] + m.conversions_value, 2)

    lines = []
    for d in per_line.values():
        d["ad_count"] = len(d["ad_ids"])
        d["ad_groups"] = sorted(d["ad_groups"])
        d["campaigns"] = sorted(d["campaigns"])
        d["ad_ids"] = sorted(d["ad_ids"])
        d["pooled"] = d["ad_count"] > 1
        lines.append(derive(d))
    return [derive(a) for a in per_ad.values()], lines


def rank_within_pins(assets):
    """Rank assets against others on the SAME pin only, worst first.

    You cannot compare a headline pinned to position 1 with one running free -
    the pinned one serves on every impression by force. So every pin position
    is its own league table, and the unpinned pool is its own. Google's
    auto-created assets are reported but never ranked.
    """
    buckets = {}
    for a in assets:
        if a["google_generated"]:
            continue
        key = f'{a["field"]}:{a["pinned"] or "UNPINNED"}'
        buckets.setdefault(key, []).append(a)
    out = {}
    for key, items in buckets.items():
        eligible = [x for x in items if not x["below_learning_floor"]]
        untested = [x for x in items if x["below_learning_floor"]]
        eligible.sort(key=lambda x: (x["ctr"], x["clicks"]))
        out[key] = {
            "ranked_worst_first": [
                {"text": x["text"], "impressions": x["impressions"], "clicks": x["clicks"],
                 "conversions": x["conversions"], "conversions_per_impression": x["conversions_per_impression"],
                 "ctr": x["ctr"], "avg_cpc": x["avg_cpc"], "conv_rate": x["conv_rate"],
                 "cost_per_conversion": x["cost_per_conversion"]}
                for x in eligible],
            "untested_insufficient_data": [
                {"text": x["text"], "impressions": x["impressions"],
                 "needs_impressions": ASSET_LEARNING_IMPRESSIONS - x["impressions"]}
                for x in untested],
            "comparable_count": len(eligible),
        }
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--pair-days", type=int, default=14,
                    help="window for the champion-vs-challenger read (default 14). Assets are always lifetime.")
    ap.add_argument("--asset-days", type=int,
                    help="cap the asset read to the last N days instead of lifetime (rarely what you want)")
    ap.add_argument("--min-age-days", type=int, default=14,
                    help="a pair younger than this is not callable - a read that early is noise")
    ap.add_argument("--ad-group", help="numeric ad group ID to restrict to")
    ap.add_argument("--min-group-clicks", type=int, default=100,
                    help="clicks needed ACROSS BOTH ADS COMBINED before the pair is callable - "
                         "not per ad and not per headline")
    ap.add_argument("--out")
    args = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")
    p_start, p_end = window(args.pair_days)
    a_start, a_end = window(args.asset_days) if args.asset_days else all_time_window()

    ads = pull_ads(ga, customer_id, p_start, p_end, args.ad_group)
    assets, lines = pull_assets(ga, customer_id, a_start, a_end, args.ad_group)
    by_ad = {}
    for a in assets:
        by_ad.setdefault(a["ad_id"], []).append(a)

    groups = {}
    for a in ads.values():
        g = groups.setdefault(a["ad_group_id"], {
            "campaign": a["campaign"], "campaign_id": a["campaign_id"],
            "ad_group": a["ad_group"], "ad_group_id": a["ad_group_id"],
            "ads": [], "clicks": 0, "conversions": 0.0,
        })
        a["assets"] = sorted(by_ad.get(a["ad_id"], []), key=lambda x: x["impressions"], reverse=True)
        # Ranked inside pin buckets - a pinned headline is only comparable with
        # others on the same pin, never with the free-floating pool.
        a["ranking_by_pin"] = rank_within_pins(a["assets"])
        a["google_generated_assets"] = [x["text"] for x in a["assets"] if x["google_generated"]]
        a["has_google_generated_assets"] = bool(a["google_generated_assets"])
        g["ads"].append(a)
        g["clicks"] += a["clicks"]
        g["conversions"] += a["conversions"]

    report = []
    for g in groups.values():
        live = [a for a in g["ads"] if a["status"] == "ENABLED"]
        g["live_ad_count"] = len(live)
        g["group_has_conversions"] = g["conversions"] > 0
        g["callable"] = g["clicks"] >= args.min_group_clicks and len(live) >= 2
        served = [a for a in live if a["impressions"] > 0]
        ranked = sorted(served, key=lambda a: -a["ctr"])
        g["winner_ad_id"] = ranked[0]["ad_id"] if ranked else None
        g["winner_ctr"] = ranked[0]["ctr"] if ranked else None
        top2 = sorted(live, key=lambda a: a["impressions"], reverse=True)[:2]
        g["confidence_pct"] = confidence_ctr(top2[0], top2[1]) if len(top2) == 2 else 0.0
        # Reported, never decisive - so a conversion signal that contradicts the
        # CTR call is visible rather than silently discarded.
        with_conv = [a for a in live if a["conversions"] > 0]
        if len(with_conv) == len(live) and len(live) == 2:
            cheap = min(live, key=lambda a: a["cost_per_conversion"])
            g["conversion_crosscheck"] = {
                "cheapest_cost_per_conversion_ad_id": cheap["ad_id"],
                "agrees_with_ctr_winner": cheap["ad_id"] == g["winner_ad_id"],
            }
        else:
            g["conversion_crosscheck"] = None
        # Absolute zero-conversion swaps only mean something when the group
        # converted SOMEWHERE. Otherwise it is a page or tracking problem.
        g["absolute_swap_rule_applies"] = g["group_has_conversions"]
        if not g["callable"]:
            g["note"] = f"not callable yet: {g['clicks']} clicks across {len(live)} live ad(s), need {args.min_group_clicks} and 2"
        elif not ranked:
            g["note"] = "no impressions on either live ad - nothing to read"
        elif g["confidence_pct"] >= 80:
            cc = g["conversion_crosscheck"]
            g["note"] = "callable - click-through decides, confidence is at or above 80%"
            if cc and not cc["agrees_with_ctr_winner"]:
                g["note"] += " | HEADS UP: the other ad has the cheaper cost per conversion - worth a look before you promote"
        else:
            g["note"] = f"two ads, enough clicks, but only {g['confidence_pct']}% confidence on click-through - not yet"
        report.append(g)

    lines_sorted = sorted(lines, key=lambda x: (-x["ad_count"], -x["conversions"]))
    result = {
        "account": customer_id,
        "pair_window": {"start": p_start, "end": p_end, "days": args.pair_days,
                        "note": "judges champion vs challenger only"},
        "asset_window": {"start": a_start, "end": a_end,
                         "lifetime": args.asset_days is None,
                         "note": "a headline keeps its record across every ad it has run in; "
                                 "floor is 2025-06-05, when per-asset conversions begin"},
        "thresholds": {
            "min_clicks_per_pair": args.min_group_clicks,
            "min_clicks_per_pair_note": "clicks across BOTH ads combined, not per ad and not per headline",
            "call_at_confidence_pct": 80,
            "min_age_days": args.min_age_days,
            "asset_learning_impressions": ASSET_LEARNING_IMPRESSIONS,
            "asset_gate_note": "a headline is gated on IMPRESSIONS, not clicks - and on its lifetime "
                               "total pooled across every ad it has run in, which is how a line clears "
                               "the floor long before any single ad could get it there",
        },
        "reading_rules": {
            "verdict_metric": "click-through rate (Jono's ruling, 2026-08-31)",
            "rank_on": "ctr, within pin buckets only - a pinned asset is never compared with a free one",
            "reported_not_decisive": ["avg_cpc", "conv_rate", "cost_per_conversion", "conversions_per_impression"],
            "why": "waiting for conversion volume on a local account costs months per test. Conversions are "
                   "still pulled and cross-checked so a contradiction is visible, never silently dropped. "
                   "Asset-level rates are directional anyway: Google credits every SERVED asset a full "
                   "conversion, so asset numbers never sum to the ad's",
        },
        "ad_group_count": len(report),
        "callable_count": sum(1 for g in report if g["callable"]),
        "line_count": len(lines_sorted),
        "pooled_line_count": sum(1 for l in lines_sorted if l["pooled"]),
        "lines": lines_sorted,
        "ad_groups": sorted(report, key=lambda g: g["clicks"], reverse=True),
    }
    text = json.dumps(result, indent=2)
    if args.out:
        os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
        with open(args.out, "w") as f:
            f.write(text)
        print(f"wrote {len(report)} ad groups ({result['callable_count']} callable), "
              f"{len(lines_sorted)} lines ({result['pooled_line_count']} running in more than one ad) "
              f"to {args.out}")
        print(f"  pair window {p_start}..{p_end} | asset window {a_start}..{a_end}"
              f"{' (lifetime)' if args.asset_days is None else ''}")
    else:
        print(text)


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"Google Ads API error (request_id {e.request_id}):", file=sys.stderr)
        for err in e.failure.errors:
            print(f"  - {err.error_code}: {err.message}", file=sys.stderr)
        sys.exit(1)
