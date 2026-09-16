"""Which of your existing negatives are silently blocking keywords you bid on?

This failure is invisible in the UI: the blocked keyword shows **Active with zero impressions**.
Nothing warns you. Google's own Recommendations check does not reliably scan shared lists.

`/search-terms` runs a conflict check BEFORE adding a negative. Nothing audits the negatives
already in the account, which is where the damage already is. That is this script.

Scope rules it respects (a negative only reaches what it is attached to):
  account-level  -> every campaign
  shared list    -> only campaigns the list is attached to
  campaign-level -> that campaign's ad groups
  ad group-level -> that ad group only

Negative match semantics (negatives do NOT use close variants - Google matches them literally):
  broad negative  -> blocks if EVERY word of the negative appears in the keyword, any order
  phrase negative -> blocks if the negative appears as a consecutive run of words
  exact negative  -> blocks only when the keyword text is word-for-word identical

Honest limit: this compares negatives against your KEYWORD TEXT, not against live search terms.
A negative can also block queries a keyword would have matched without matching the keyword text
itself. Treat a clean run as "no keyword is being killed outright", not "no traffic is blocked".

Usage:
  python3 code/find_negative_conflicts.py --customer 1234567890
  python3 code/find_negative_conflicts.py --customer 1234567890 --days 90
"""
import argparse
import os
import pathlib
import sys
from collections import defaultdict

from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

ROOT = pathlib.Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

REQUIRED = ["GOOGLE_ADS_CLIENT_ID",
            "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_REFRESH_TOKEN"]


def get_client(login_cid):
    missing = [k for k in REQUIRED if not os.getenv(k)]
    if missing:
        sys.exit("Missing from .env: " + ", ".join(missing) + "\nRun /api-setup first.")
    return GoogleAdsClient.load_from_dict({
        "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
        "client_id": os.environ["GOOGLE_ADS_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_ADS_CLIENT_SECRET"],
        "refresh_token": os.environ["GOOGLE_ADS_REFRESH_TOKEN"],
        "login_customer_id": login_cid,
        "use_proto_plus": True,
    })


def words(t):
    return [w for w in "".join(c if c.isalnum() or c.isspace() else " " for c in t.lower()).split()]


def blocks(neg_text, neg_match, kw_text):
    """Does this negative block this keyword's own text?"""
    n, k = words(neg_text), words(kw_text)
    if not n:
        return False
    if neg_match == "EXACT":
        return n == k
    if neg_match == "PHRASE":
        return any(k[i:i + len(n)] == n for i in range(len(k) - len(n) + 1))
    return all(w in k for w in n)          # BROAD


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--customer", default=os.getenv("GOOGLE_ADS_CUSTOMER_ID"))
    ap.add_argument("--days", type=int, default=30)
    args = ap.parse_args()
    if not args.customer:
        sys.exit("No customer id. Pass --customer or set GOOGLE_ADS_CUSTOMER_ID in .env")
    cid = args.customer.replace("-", "")
    login = (os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") or cid).replace("-", "")
    ga = get_client(login).get_service("GoogleAdsService")

    # ---- active keywords, with performance so we can rank the damage
    kws = []
    q = f"""
      SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
             ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
             metrics.impressions, metrics.clicks, metrics.conversions, metrics.cost_micros
      FROM keyword_view
      WHERE ad_group_criterion.status = 'ENABLED'
        AND ad_group_criterion.negative = FALSE
        AND campaign.status = 'ENABLED'
        AND segments.date DURING LAST_{args.days}_DAYS
    """
    for r in ga.search(customer_id=cid, query=q):
        kws.append({
            "campaign_id": r.campaign.id, "campaign": r.campaign.name,
            "ad_group_id": r.ad_group.id, "ad_group": r.ad_group.name,
            "text": r.ad_group_criterion.keyword.text,
            "match": r.ad_group_criterion.keyword.match_type.name,
            "impr": r.metrics.impressions, "clicks": r.metrics.clicks,
            "conv": r.metrics.conversions, "cost": r.metrics.cost_micros / 1e6,
        })
    if not kws:
        print("No enabled keywords with data in the window. Nothing to check.")
        return

    negs = []   # (text, match, scope_label, predicate(kw) -> bool)

    # ---- account-level (v24: keyword negatives at account level only exist as
    #      ACCOUNT_LEVEL_NEGATIVE_KEYWORDS shared sets attached via negative_keyword_list;
    #      customer_negative_criterion.keyword.* is not a queryable field any more)
    account_lists = set()
    for r in ga.search(customer_id=cid, query="""
        SELECT customer_negative_criterion.negative_keyword_list.shared_set,
               customer_negative_criterion.type
        FROM customer_negative_criterion
        WHERE customer_negative_criterion.type = 'NEGATIVE_KEYWORD_LIST'"""):
        ss = r.customer_negative_criterion.negative_keyword_list.shared_set
        if ss:
            account_lists.add(ss)

    # ---- shared lists, and which campaigns they reach
    list_campaigns = defaultdict(set)
    for r in ga.search(customer_id=cid, query="""
        SELECT campaign_shared_set.shared_set, campaign_shared_set.campaign
        FROM campaign_shared_set WHERE campaign_shared_set.status = 'ENABLED'"""):
        list_campaigns[r.campaign_shared_set.shared_set].add(
            int(r.campaign_shared_set.campaign.split("/")[-1]))
    for r in ga.search(customer_id=cid, query="""
        SELECT shared_criterion.keyword.text, shared_criterion.keyword.match_type,
               shared_criterion.shared_set, shared_set.name
        FROM shared_criterion WHERE shared_set.type = 'NEGATIVE_KEYWORDS'"""):
        sc = r.shared_criterion
        if sc.shared_set in account_lists:
            negs.append((sc.keyword.text, sc.keyword.match_type.name,
                         f"ACCOUNT LIST '{r.shared_set.name}'", lambda kw: True))
            continue
        camps = list_campaigns.get(sc.shared_set, set())
        label = f"LIST '{r.shared_set.name}'" + ("" if camps else " (attached to nothing)")
        negs.append((sc.keyword.text, sc.keyword.match_type.name, label,
                     (lambda cs: (lambda kw: kw["campaign_id"] in cs))(camps)))

    # ---- campaign level
    for r in ga.search(customer_id=cid, query="""
        SELECT campaign.id, campaign.name, campaign_criterion.keyword.text,
               campaign_criterion.keyword.match_type
        FROM campaign_criterion
        WHERE campaign_criterion.negative = TRUE AND campaign_criterion.type = 'KEYWORD'"""):
        negs.append((r.campaign_criterion.keyword.text, r.campaign_criterion.keyword.match_type.name,
                     f"CAMPAIGN '{r.campaign.name}'",
                     (lambda c: (lambda kw: kw["campaign_id"] == c))(r.campaign.id)))

    # ---- ad group level
    for r in ga.search(customer_id=cid, query="""
        SELECT ad_group.id, ad_group.name, ad_group_criterion.keyword.text,
               ad_group_criterion.keyword.match_type
        FROM ad_group_criterion
        WHERE ad_group_criterion.negative = TRUE AND ad_group_criterion.type = 'KEYWORD'"""):
        negs.append((r.ad_group_criterion.keyword.text, r.ad_group_criterion.keyword.match_type.name,
                     f"AD GROUP '{r.ad_group.name}'",
                     (lambda g: (lambda kw: kw["ad_group_id"] == g))(r.ad_group.id)))

    print(f"\n{len(kws)} enabled keywords · {len(negs)} negatives in scope · last {args.days} days\n")

    hits = []
    for text, match, scope, reaches in negs:
        for kw in kws:
            if reaches(kw) and blocks(text, match, kw["text"]):
                hits.append((kw, text, match, scope))

    if not hits:
        print("No negative blocks a keyword you bid on, by keyword text.\n"
              "Note: this checks keyword TEXT. A negative can still block search terms a keyword\n"
              "would otherwise have matched - that only shows up in the search terms report.")
        return

    # rank: conversions lost first, then spend, then the silent zero-impression case
    hits.sort(key=lambda h: (-h[0]["conv"], -h[0]["cost"], h[0]["impr"]))
    crit = [h for h in hits if h[0]["conv"] > 0]
    silent = [h for h in hits if h[0]["conv"] == 0 and h[0]["impr"] == 0]
    other = [h for h in hits if h not in crit and h not in silent]

    def show(rows, title, note):
        if not rows:
            return
        print(f"{title}\n{note}\n")
        for kw, text, match, scope in rows:
            print(f'  "{kw["text"]}" ({kw["match"]})  in {kw["campaign"]} / {kw["ad_group"]}')
            print(f'      blocked by  "{text}" [{match}] at {scope}')
            print(f'      {kw["impr"]} impressions · {kw["clicks"]} clicks · '
                  f'{kw["conv"]:.0f} conversions · ${kw["cost"]:,.2f}\n')

    show(crit, "⛔ BLOCKING KEYWORDS THAT CONVERTED",
         "   These earned you leads and a negative is now suppressing them. Fix first.")
    show(silent, "⚠  SILENTLY DEAD - active, zero impressions",
         "   The symptom the UI never shows you. Almost certainly the negative's doing.")
    show(other, "·  Blocked, still getting impressions",
         "   Partially suppressed, or the negative was added recently.")

    print(f"{len(crit)} converting · {len(silent)} silently dead · {len(other)} partial\n"
          "Remove the negative, or push it to a narrower level where it is still true.\n"
          "Limit: keyword text only. Blocked SEARCH TERMS need the search terms report.")


if __name__ == "__main__":
    main()
