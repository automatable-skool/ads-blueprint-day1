"""Move broad-match keywords to phrase - the fix for an account where broad took over.

Match type is immutable on a keyword, so the safe pattern is: create the PHRASE twin
(same bid, same final URL), then PAUSE the broad original. Nothing is removed, so one
click reverses any keyword. Skips any keyword whose phrase twin already exists.

Dry run by DEFAULT. Nothing is touched without --apply.

Usage (from the project root):
  python3 code/change_match_type.py                       # report every enabled broad keyword
  python3 code/change_match_type.py --campaign 123 --apply
  python3 code/change_match_type.py --min-clicks 5 --apply   # only broads with traffic
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import load_client  # noqa: E402
from google.ads.googleads.errors import GoogleAdsException  # noqa: E402


def broad_keywords(ga, customer_id, campaign_id=None, min_clicks=0):
    where = f"AND campaign.id = {campaign_id}" if campaign_id else ""
    q = f"""
      SELECT campaign.name, ad_group.id, ad_group.name,
             ad_group_criterion.criterion_id, ad_group_criterion.keyword.text,
             ad_group_criterion.cpc_bid_micros, ad_group_criterion.final_urls,
             metrics.clicks
      FROM keyword_view
      WHERE ad_group_criterion.status = 'ENABLED'
        AND ad_group_criterion.keyword.match_type = 'BROAD'
        AND ad_group_criterion.negative = FALSE
        AND segments.date DURING LAST_30_DAYS
        {where}
    """
    rows = []
    for r in ga.search(customer_id=customer_id, query=q):
        if r.metrics.clicks < min_clicks:
            continue
        rows.append(dict(campaign=r.campaign.name, ag_id=str(r.ad_group.id), ag=r.ad_group.name,
                         crit=str(r.ad_group_criterion.criterion_id),
                         text=r.ad_group_criterion.keyword.text,
                         bid=r.ad_group_criterion.cpc_bid_micros,
                         urls=list(r.ad_group_criterion.final_urls),
                         clicks=r.metrics.clicks))
    return rows


def phrase_twins(ga, customer_id):
    q = """
      SELECT ad_group.id, ad_group_criterion.keyword.text
      FROM keyword_view
      WHERE ad_group_criterion.keyword.match_type = 'PHRASE'
        AND ad_group_criterion.status != 'REMOVED'
        AND ad_group_criterion.negative = FALSE
    """
    return {(str(r.ad_group.id), r.ad_group_criterion.keyword.text.lower())
            for r in ga.search(customer_id=customer_id, query=q)}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--campaign", help="limit to one campaign ID")
    ap.add_argument("--min-clicks", type=int, default=0, help="only convert broads with at least this many clicks (30 days)")
    ap.add_argument("--apply", action="store_true", help="create phrase twins and pause the broads - default is a dry run")
    a = ap.parse_args()

    client, customer_id = load_client()
    ga = client.get_service("GoogleAdsService")

    rows = broad_keywords(ga, customer_id, a.campaign, a.min_clicks)
    if not rows:
        print("No enabled broad-match keywords match the filter.")
        return
    twins = phrase_twins(ga, customer_id)

    todo = []
    for r in rows:
        has_twin = (r["ag_id"], r["text"].lower()) in twins
        note = "phrase twin exists - will only pause the broad" if has_twin else "create phrase + pause broad"
        print(f"{'CONVERT' if a.apply else 'would convert'} · {r['campaign']} / {r['ag']} · \"{r['text']}\" · {r['clicks']} clicks · {note}")
        todo.append((r, has_twin))
    if not a.apply:
        print(f"\nDry run - {len(todo)} broad keyword(s). Re-run with --apply. Nothing gets removed, only paused.")
        return

    svc = client.get_service("AdGroupCriterionService")
    creates, pauses = [], []
    for r, has_twin in todo:
        if not has_twin:
            op = client.get_type("AdGroupCriterionOperation")
            op.create.ad_group = f"customers/{customer_id}/adGroups/{r['ag_id']}"
            op.create.status = client.enums.AdGroupCriterionStatusEnum.ENABLED
            op.create.keyword.text = r["text"]
            op.create.keyword.match_type = client.enums.KeywordMatchTypeEnum.PHRASE
            if r["bid"]:
                op.create.cpc_bid_micros = r["bid"]
            for u in r["urls"]:
                op.create.final_urls.append(u)
            creates.append(op)
        op = client.get_type("AdGroupCriterionOperation")
        op.update.resource_name = f"customers/{customer_id}/adGroupCriteria/{r['ag_id']}~{r['crit']}"
        op.update.status = client.enums.AdGroupCriterionStatusEnum.PAUSED
        op.update_mask.paths.append("status")
        pauses.append(op)
    try:
        if creates:
            svc.mutate_ad_group_criteria(customer_id=customer_id, operations=creates)
        svc.mutate_ad_group_criteria(customer_id=customer_id, operations=pauses)
    except GoogleAdsException as e:
        sys.exit(f"API refused: {e.failure.errors[0].message} - if creates went through, re-running is safe (twins are skipped).")
    print(f"\nCreated {len(creates)} phrase keyword(s), paused {len(pauses)} broad(s). Unpause to reverse.")


if __name__ == "__main__":
    main()
