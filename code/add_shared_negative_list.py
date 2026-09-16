"""Create the universal negative keyword list in Google Ads.

Builds a SHARED Negative Keyword List named "Universal Service Business
Negatives v1" in the account named by GOOGLE_ADS_CUSTOMER_ID, and with --attach
attaches it to every enabled Search campaign so it applies account-wide.

The list is UNIVERSAL: job seekers, DIY, education, freebies, support, restricted.
No trade words and no place names - a shared list reaches every campaign forever,
so the services you do not sell and the cities you do not serve are campaign
negatives from context/business.md (via /account-setup and /search-terms), never
here. Any term that names a service in context/business.md is held back.

Dry run by default. --apply pushes. Idempotent: find-or-create the shared set,
and only add keywords that are not already in it. Safe to re-run.

  python3 code/add_shared_negative_list.py                  # show the list
  python3 code/add_shared_negative_list.py --apply --attach # push and attach
"""

import os
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
import _business as biz

load_dotenv()

config = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
    "use_proto_plus": True,
}
client = GoogleAdsClient.load_from_dict(config)
customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")

LIST_NAME = "Universal Service Business Negatives v1"

# --- The list (match-typed). BROAD = single junk words, PHRASE = ordered multi-word.
BROAD = [
    # job seekers
    "jobs", "job", "hiring", "recruit", "recruiting", "recruitment", "recruiter",
    "career", "careers", "employment", "employer", "employee", "salary", "salaries",
    "wage", "wages", "resume", "cv", "intern", "interns", "internship", "internships",
    "apprentice", "apprentices", "apprenticeship", "apprenticeships", "volunteer",
    "vacancy", "vacancies", "indeed", "glassdoor", "ziprecruiter",
    # diy / how-to
    "diy", "howto", "tutorial", "tutorials", "guide", "guides", "instructions",
    "youtube", "video", "videos", "template", "templates", "example", "examples",
    "homemade", "yourself",
    # education
    "school", "schools", "schooling", "college", "university", "class", "classes",
    "course", "courses", "training", "trainee", "trained", "certification",
    "certificate", "certified", "licensing", "exam",
    # free / discount
    "free", "freebie", "giveaway", "giveaways", "sample", "samples", "trial",
    "discount", "discounted", "voucher", "coupon", "coupons", "clearance", "secondhand",
    # informational
    "meaning", "definition", "wikipedia", "wiki", "reddit", "quora", "forum",
    "forums", "blog", "review", "reviews", "ratings",
    # support
    "complaint", "complaints", "refund", "refunds", "cancel", "cancellation",
    "problem", "problems", "broken", "contact", "help", "login",
    # restricted
    "porn", "adult", "nude", "sex", "gambling", "casino", "weed", "marijuana",
    "cbd", "crypto", "bitcoin", "nft", "mlm", "ponzi",
    # parts shoppers (a product, not a job)
    "parts", "supplies", "wholesale", "diagram", "schematic", "manual",
    # ⛔ no place names and no trade words here. A shared list reaches every campaign
    # forever; the cities you do not serve and the jobs you do not do come from
    # context/business.md as campaign negatives, never from a universal list.
]
PHRASE = [
    "hourly pay", "position open", "hiring near me", "work from home",
    "do it yourself", "how to", "how do", "how do you", "step by step",
    "how to fix", "how to repair", "how to install", "how to remove",
    "how to clean", "how to replace", "how to build",
    "license cost", "license requirement", "license requirements", "become a",
    "how to become", "promo code", "what is", "what is a", "what does", "what are",
    "return policy", "warranty claim", "not working", "phone number",
    "customer service", "sign in",
    "spec sheet",
]

ga = client.get_service("GoogleAdsService")
mt_enum = client.enums.KeywordMatchTypeEnum


def find_shared_set():
    q = f"""
        SELECT shared_set.resource_name, shared_set.name, shared_set.status
        FROM shared_set
        WHERE shared_set.type = 'NEGATIVE_KEYWORDS'
          AND shared_set.name = '{LIST_NAME}'
          AND shared_set.status != 'REMOVED'
    """
    for row in ga.search(customer_id=customer_id, query=q):
        return row.shared_set.resource_name
    return None


def create_shared_set():
    svc = client.get_service("SharedSetService")
    op = client.get_type("SharedSetOperation")
    s = op.create
    s.name = LIST_NAME
    s.type_ = client.enums.SharedSetTypeEnum.NEGATIVE_KEYWORDS
    resp = svc.mutate_shared_sets(customer_id=customer_id, operations=[op])
    return resp.results[0].resource_name


def existing_terms(shared_set_rn):
    q = f"""
        SELECT shared_criterion.keyword.text, shared_criterion.keyword.match_type
        FROM shared_criterion
        WHERE shared_criterion.shared_set = '{shared_set_rn}'
          AND shared_criterion.type = 'KEYWORD'
    """
    out = set()
    for row in ga.search(customer_id=customer_id, query=q):
        kw = row.shared_criterion.keyword
        out.add((kw.text.lower(), kw.match_type.name))
    return out


def add_criteria(shared_set_rn, want):
    have = existing_terms(shared_set_rn)
    todo = [(t, mt) for (t, mt) in want if (t.lower(), mt) not in have]
    if not todo:
        print("  all terms already present — nothing to add")
        return 0
    svc = client.get_service("SharedCriterionService")
    ops = []
    for text, mt in todo:
        op = client.get_type("SharedCriterionOperation")
        c = op.create
        c.shared_set = shared_set_rn
        c.keyword.text = text
        c.keyword.match_type = getattr(mt_enum, mt)
        ops.append(op)
    # mutate in batches of 1000 (operation limit per request is high; stay safe)
    added = 0
    for i in range(0, len(ops), 1000):
        resp = svc.mutate_shared_criteria(customer_id=customer_id, operations=ops[i:i + 1000])
        added += len(resp.results)
    return added


def enabled_search_campaigns():
    q = """
        SELECT campaign.id, campaign.name, campaign.advertising_channel_type
        FROM campaign
        WHERE campaign.status = 'ENABLED'
          AND campaign.advertising_channel_type = 'SEARCH'
    """
    return [(r.campaign.id, r.campaign.name,
             r.campaign.resource_name) for r in ga.search(customer_id=customer_id, query=q)]


def attached_campaign_sets(shared_set_rn):
    q = f"""
        SELECT campaign_shared_set.campaign
        FROM campaign_shared_set
        WHERE campaign_shared_set.shared_set = '{shared_set_rn}'
          AND campaign_shared_set.status != 'REMOVED'
    """
    return {r.campaign_shared_set.campaign for r in ga.search(customer_id=customer_id, query=q)}


def attach(shared_set_rn, campaigns):
    already = attached_campaign_sets(shared_set_rn)
    todo = [c for c in campaigns if c[2] not in already]
    if not todo:
        return 0
    svc = client.get_service("CampaignSharedSetService")
    ops = []
    for _id, _name, camp_rn in todo:
        op = client.get_type("CampaignSharedSetOperation")
        css = op.create
        css.campaign = camp_rn
        css.shared_set = shared_set_rn
        ops.append(op)
    resp = svc.mutate_campaign_shared_sets(customer_id=customer_id, operations=ops)
    return len(resp.results)


def main():
    import argparse
    global LIST_NAME
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--apply", action="store_true", help="create the list and add the terms - default is a dry run")
    ap.add_argument("--attach", action="store_true", help="also attach the list to every enabled Search campaign")
    ap.add_argument("--name", help="shared list name (default: the name set at the top of this file)")
    args = ap.parse_args()
    if args.name:
        LIST_NAME = args.name

    want = [(t, "BROAD") for t in BROAD] + [(t, "PHRASE") for t in PHRASE]
    # ⛔ Never push a negative that names what this business sells ("## What we do").
    sells = biz.sells()
    held = [(t, mt) for t, mt in want if any(w and (w in t.lower() or t.lower() in w) for w in sells)]
    want = [w for w in want if w not in held]
    n_broad = sum(1 for _, m in want if m == "BROAD")
    print(f"Account {customer_id} | list '{LIST_NAME}' | {len(want)} terms "
          f"({n_broad} broad, {len(want) - n_broad} phrase)")
    if held:
        print(f"held back {len(held)} term(s) that name a service in context/business.md: "
              + ", ".join(f'"{t}"' for t, _ in held))
    if not args.apply:
        for t, mt in want:
            print(f"  {mt:6s} {t}")
        print("\nDRY RUN - nothing changed. Re-run with --apply, plus --attach to attach it to the enabled Search campaigns.")
        return

    rn = find_shared_set()
    if rn:
        print(f"• Shared set exists: {rn}")
    else:
        rn = create_shared_set()
        print(f"• Created shared set: {rn}")

    added = add_criteria(rn, want)
    print(f"• Negative keywords added this run: {added}")

    if not args.attach:
        print("\n• Not attached (pass --attach). A shared list only works on the campaigns it is attached to.")
    else:
        camps = enabled_search_campaigns()
        if not camps:
            print("\n• No enabled Search campaigns yet - list is created and ready to "
                  "attach when you launch one.")
        else:
            print(f"\n• Found {len(camps)} enabled Search campaign(s):")
            for _id, name, _rn in camps:
                print(f"    - {name} ({_id})")
            n = attach(rn, camps)
            print(f"• Attached the list to {n} campaign(s) this run "
                  f"({len(camps) - n} already attached).")

    print(f"\n✓ Done. '{LIST_NAME}' is in the account.")

if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"\n✗ Google Ads API error (request_id {e.request_id}):")
        for err in e.failure.errors:
            print(f"  - {err.error_code}: {err.message}")
        raise
