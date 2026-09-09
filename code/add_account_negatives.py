"""Builds the all-PHRASE universal negative keyword list as a shared set and
attaches it at the ACCOUNT level via CustomerNegativeCriterion
(negative_keyword_list), so it applies to every campaign the account ever
runs — including future ones. Idempotent.

Source: universal-negative-keywords.md sections A.1-A.7 (150 universal terms)
plus the "What We DON'T Do" section of context/business.md.
"""

import os
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

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
ga = client.get_service("GoogleAdsService")

# A.1 Job seekers
JOB_SEEKERS = [
    "jobs", "job", "hiring", "recruit", "recruiting", "recruitment", "recruiter",
    "career", "careers", "employment", "employer", "employee", "salary", "salaries",
    "wage", "wages", "hourly pay", "resume", "cv", "intern", "interns",
    "internship", "internships", "apprentice", "apprentices", "apprenticeship",
    "apprenticeships", "volunteer", "vacancy", "vacancies", "position open",
    "hiring near me", "work from home", "indeed", "glassdoor", "ziprecruiter",
]
# A.2 DIY / how-to
DIY = [
    "diy", "do it yourself", "how to", "howto", "how do", "how do you",
    "tutorial", "tutorials", "guide", "guides", "step by step", "instructions",
    "youtube", "video", "videos", "template", "templates", "example", "examples",
    "how to fix", "how to repair", "how to install", "how to remove",
    "how to clean", "how to replace", "how to build", "homemade", "yourself",
]
# A.3 Education
EDUCATION = [
    "school", "schools", "schooling", "college", "university", "class", "classes",
    "course", "courses", "training", "trainee", "trained", "certification",
    "certificate", "certified", "license cost", "licensing",
    "license requirement", "license requirements", "become a", "how to become", "exam",
]
# A.4 Free / discount
FREE = [
    "free", "freebie", "giveaway", "giveaways", "sample", "samples", "trial",
    "discount", "discounted", "voucher", "coupon", "coupons", "promo code",
    "clearance", "secondhand",
]
# A.5 Informational
INFO = [
    "what is", "what is a", "what does", "what are", "meaning", "definition",
    "wikipedia", "wiki", "reddit", "quora", "forum", "forums", "blog",
    "review", "reviews", "ratings",
]
# A.6 Support / existing customers
SUPPORT = [
    "complaint", "complaints", "refund", "refunds", "return policy", "cancel",
    "cancellation", "warranty claim", "problem", "problems", "not working",
    "broken", "contact", "phone number", "customer service", "help",
    "login", "sign in",
]
# A.7 Restricted
RESTRICTED = [
    "porn", "adult", "nude", "sex", "gambling", "casino", "weed", "marijuana",
    "cbd", "crypto", "bitcoin", "nft", "mlm", "ponzi",
]
# From context/business.md — "What We DON'T Do"
DONT_DO = [
    "commercial", "industrial", "new construction", "builder", "builders",
    "septic", "septic tank", "well drilling", "well pump",
    "gas line", "gas fitter", "gas fitting",
    "hvac", "furnace", "furnaces", "boiler", "boilers", "radiant heating",
    "pool", "pools", "hot tub", "irrigation", "sprinkler", "sprinklers",
    "appliance repair", "dishwasher repair", "washing machine repair",
    "hamilton", "oshawa", "barrie",
    "parts", "parts store", "supplies", "wholesale",
]

ALL_TERMS = (JOB_SEEKERS + DIY + EDUCATION + FREE + INFO + SUPPORT
             + RESTRICTED + DONT_DO)


LIST_NAME = "Account-Level Universal Negatives (All Phrase)"


def find_or_create_shared_set() -> str:
    q = f"""
        SELECT shared_set.resource_name FROM shared_set
        WHERE shared_set.type = 'ACCOUNT_LEVEL_NEGATIVE_KEYWORDS'
          AND shared_set.name = '{LIST_NAME}'
          AND shared_set.status != 'REMOVED'
    """
    for row in ga.search(customer_id=customer_id, query=q):
        return row.shared_set.resource_name
    svc = client.get_service("SharedSetService")
    op = client.get_type("SharedSetOperation")
    op.create.name = LIST_NAME
    op.create.type_ = client.enums.SharedSetTypeEnum.ACCOUNT_LEVEL_NEGATIVE_KEYWORDS
    resp = svc.mutate_shared_sets(customer_id=customer_id, operations=[op])
    return resp.results[0].resource_name


def existing_terms(shared_set_rn: str) -> set[str]:
    q = f"""
        SELECT shared_criterion.keyword.text FROM shared_criterion
        WHERE shared_criterion.shared_set = '{shared_set_rn}'
          AND shared_criterion.type = 'KEYWORD'
    """
    return {r.shared_criterion.keyword.text.lower()
            for r in ga.search(customer_id=customer_id, query=q)}


def add_terms(shared_set_rn: str, terms: list[str]) -> int:
    have = existing_terms(shared_set_rn)
    todo = [t for t in terms if t.lower() not in have]
    if not todo:
        return 0
    svc = client.get_service("SharedCriterionService")
    ops = []
    for text in todo:
        op = client.get_type("SharedCriterionOperation")
        c = op.create
        c.shared_set = shared_set_rn
        c.keyword.text = text
        c.keyword.match_type = client.enums.KeywordMatchTypeEnum.PHRASE
        ops.append(op)
    added = 0
    for i in range(0, len(ops), 1000):
        resp = svc.mutate_shared_criteria(customer_id=customer_id, operations=ops[i:i + 1000])
        added += len(resp.results)
    return added


def attach_to_account(shared_set_rn: str) -> None:
    q = """
        SELECT customer_negative_criterion.negative_keyword_list.shared_set
        FROM customer_negative_criterion
        WHERE customer_negative_criterion.type = 'NEGATIVE_KEYWORD_LIST'
    """
    attached = {r.customer_negative_criterion.negative_keyword_list.shared_set
                for r in ga.search(customer_id=customer_id, query=q)}
    if shared_set_rn in attached:
        print("  · already attached at account level")
        return
    svc = client.get_service("CustomerNegativeCriterionService")
    op = client.get_type("CustomerNegativeCriterionOperation")
    op.create.negative_keyword_list.shared_set = shared_set_rn
    svc.mutate_customer_negative_criteria(customer_id=customer_id, operations=[op])
    print("  ✓ attached at account level (applies to all current and future campaigns)")


def verify(shared_set_rn: str) -> None:
    count = len(existing_terms(shared_set_rn))
    print(f"\nVerification: list contains {count} negative keywords (all PHRASE match)")


def main() -> None:
    # de-dupe while preserving order
    seen: set[str] = set()
    terms = [t for t in ALL_TERMS if not (t.lower() in seen or seen.add(t.lower()))]
    rn = find_or_create_shared_set()
    print(f"List: '{LIST_NAME}' ({rn})")
    added = add_terms(rn, terms)
    print(f"✓ {len(terms)} unique PHRASE terms; added {added} this run\n\nAttaching to account:")
    attach_to_account(rn)
    verify(rn)


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"✗ Google Ads API error (request_id {e.request_id}):")
        for err in e.failure.errors:
            print(f"  - {err.message}")
        raise SystemExit(1)
