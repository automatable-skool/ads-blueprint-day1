"""Build the top STAG ad groups from keyword-list.md via the Google Ads API. Everything lands PAUSED.

Reads the project, hardcodes nothing:
  keyword-list.md    campaigns, ad groups in file order, keywords, landing pages,
                     the LAUNCH / WATCH / HOLD markers, and the cross-group negatives table
  context/business.md  monthly ad budget, country/market, ad schedule
  .env               GOOGLE_ADS_CUSTOMER_ID

Architecture (references/stag.md section 6, campaign-plan.md):
  CAMPAIGN  = the "## Campaign:" heading the group sits under
  AD GROUP  = one per keyword group. Single theme, service only. NEVER a city ad group
  KEYWORDS  = the group's primary + rest, phrase match, NO city appended
  LOCATION  = campaign level, Presence only. That is what makes it local, not the keywords
  NEGATIVES = the cross-group table, applied at ad group level so one search lands in one group
  ADS       = NOT built here. /write-ads builds the real library via code/build_ads.py

Order is keyword-list.md order, top down. Default 3 groups, HOLD groups skipped.
No language criterion is sent: Google is removing language targeting from Search in
late September 2026 and asked API developers to stop sending it.

Usage:
  python3 code/build_campaigns.py --dry-run
  python3 code/build_campaigns.py --apply
  python3 code/build_campaigns.py --apply --groups 3 --country US
  python3 code/build_campaigns.py --apply --cities "Toronto,Hamilton" --schedule 7-19
  python3 code/build_campaigns.py --apply --geo-interest      # destination businesses only

Nothing is created without --apply.
"""

import argparse
import pathlib
import re
import sys

from google.ads.googleads.errors import GoogleAdsException

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from _common import load_client, resolve_city_geo, country_geo  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
KEYWORD_LIST = ROOT / "keyword-list.md"
BUSINESS = ROOT / "context" / "business.md"

COUNTRY_NAMES = {
    "united states": "US", "usa": "US", "us": "US", "america": "US",
    "canada": "CA", "ca": "CA",
    "united kingdom": "GB", "uk": "GB", "great britain": "GB",
    "australia": "AU", "new zealand": "NZ", "ireland": "IE",
}
WEEKDAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]
MATCH_TYPES = {"broad": "BROAD", "phrase": "PHRASE", "exact": "EXACT"}


# ------------------------------------------------------------------ parsing

def read(path):
    if not path.exists():
        sys.exit(f"Missing {path.relative_to(ROOT)}. Run /keywords first.")
    return path.read_text(encoding="utf-8")


def parse_keyword_list(text):
    """-> (groups, negative_rows). Groups are in file order, exactly as /keywords ranked them."""
    groups, negatives = [], []
    campaign, group, mode, in_neg_table = None, None, None, False

    for raw in text.splitlines():
        line = raw.strip()

        if line.lower().startswith("## cross-group negatives"):
            in_neg_table, group = True, None
            continue
        if in_neg_table:
            # `- audit · phrase · SEO services, Local SEO, PPC agency`
            # Bullets, never a table - keyword-list.md is read by a person.
            if line.startswith("- "):
                cells = [c.strip() for c in line[2:].split("·")]
                if len(cells) >= 3:
                    negatives.append(
                        {"text": cells[0], "match": cells[1].lower(), "applied_to": cells[2]})
            elif line.startswith("#"):
                in_neg_table = False
            continue

        m = re.match(r"^##\s+Campaign:\s*(.+)$", line, re.I)
        if m:
            campaign, group = m.group(1).strip(), None
            continue

        m = re.match(r"^###\s+(\d+)\.\s+(.+)$", line)
        if m:
            parts = [p.strip() for p in m.group(2).split("·")]
            name, markers = parts[0], [p.upper() for p in parts[1:]]
            group = {
                "order": int(m.group(1)), "name": name, "campaign": campaign,
                "launch": any("LAUNCH" in x for x in markers),
                "hold": any(x.startswith("HOLD") for x in markers),
                "watch": any(x.startswith("WATCH") for x in markers),
                "landing_page": None, "keywords": [],
            }
            groups.append(group)
            mode = None
            continue

        if group is None:
            continue

        m = re.match(r"^\*\*Landing page:\*\*\s*(\S+)", line)
        if m:
            group["landing_page"] = m.group(1).rstrip("·").strip()
            continue

        if re.match(r"^\*\*Primary keyword\*\*", line, re.I):
            mode = "kw"
            continue
        if re.match(r"^\*\*The rest of the group\*\*", line, re.I):
            mode = "kw"
            continue

        if line.startswith("- ") and mode == "kw":
            kw = line[2:].split("·")[0].strip().strip("*").lower()
            if kw and kw not in group["keywords"]:
                group["keywords"].append(kw)
            continue

        if line.startswith("**") or line.startswith("---") or not line:
            if line.startswith("**") or line.startswith("---"):
                mode = None

    return groups, negatives


def parse_budget(text):
    m = re.search(r"Monthly ad budget:\s*\$?([\d,]+)", text, re.I)
    if not m:
        m = re.search(r"budget[^\n$]*\$\s*([\d,]+)\s*(?:a|per)\s*month", text, re.I)
    if not m:
        sys.exit('No monthly budget found in context/business.md. Add a line under '
                 '"## Market and budget" reading: **Monthly ad budget: $2,000 a month**')
    return int(m.group(1).replace(",", ""))


def parse_country(text):
    m = re.search(r"Country customers search from:\s*([^\n·]+)", text, re.I)
    if not m:
        m = re.search(r"^Market:\s*([^\n·]+)", text, re.I | re.M)
    if m:
        first = re.split(r"\bfirst\b|,|/", m.group(1).strip(), maxsplit=1)[0].strip().lower()
        if first in COUNTRY_NAMES:
            return COUNTRY_NAMES[first]
    return None


def parse_schedule(text, override):
    """-> list of (DAY, start_hour, end_hour), or None for 24/7. Never guessed."""
    if override:
        if override.lower() in ("24x7", "24/7", "none"):
            return None
        m = re.match(r"^(\d{1,2})-(\d{1,2})$", override)
        if not m:
            sys.exit("--schedule takes 24x7 or START-END in 24h account time, e.g. 7-19")
        return [(d, int(m.group(1)), int(m.group(2))) for d in WEEKDAYS]

    m = re.search(r"ad schedule is\s*\*?\*?(\d{1,2})\s*(am|pm)\s*to\s*(\d{1,2})\s*(am|pm)", text, re.I)
    if m:
        to24 = lambda h, ap: (h % 12) + (12 if ap.lower() == "pm" else 0)
        start, end = to24(int(m.group(1)), m.group(2)), to24(int(m.group(3)), m.group(4))
        return [(d, start, end) for d in WEEKDAYS]

    if re.search(r"\b24/7\b|around the clock|answers?\s+24", text, re.I):
        return None

    sys.exit('Could not read the ad schedule from context/business.md "## Hours". '
             'A cheap overnight lead that dies in voicemail teaches Google to find more bad '
             'leads, so this is not guessed. Either add a line reading '
             '"the ad schedule is 6am to 2pm" or pass --schedule 7-19 (or --schedule 24x7).')


def negatives_for(group, rows, all_groups):
    """Resolve the 'Applied to' cell to this ad group's negatives."""
    out = []
    for row in rows:
        applied, hit = row["applied_to"].lower(), False
        m = re.match(r"every\s+(.+?)\s+group", applied)
        if m:
            hit = (group["campaign"] or "").lower().startswith(m.group(1).strip())
        else:
            hit = any(t.strip() == group["name"].lower() for t in applied.split(","))
        if hit and row["match"] in MATCH_TYPES:
            out.append((row["text"].lower(), MATCH_TYPES[row["match"]]))
    return out


# ------------------------------------------------------------------ building

def build_ops(client, ga, customer_id, campaign_name, groups, plan):
    """One atomic operation list per campaign: budget -> campaign -> criteria -> ad groups -> keywords."""
    enums, ops = client.enums, []
    budget_rn = ga.campaign_budget_path(customer_id, -1)
    campaign_rn = ga.campaign_path(customer_id, -2)

    op = client.get_type("MutateOperation")
    b = op.campaign_budget_operation.create
    b.resource_name = budget_rn
    b.name = f"{campaign_name} Budget"
    b.amount_micros = plan["budget_micros"]
    b.delivery_method = enums.BudgetDeliveryMethodEnum.STANDARD
    b.explicitly_shared = False          # one budget per campaign, never shared
    ops.append(op)

    op = client.get_type("MutateOperation")
    c = op.campaign_operation.create
    c.resource_name = campaign_rn
    c.name = campaign_name
    c.status = enums.CampaignStatusEnum.PAUSED
    c.advertising_channel_type = enums.AdvertisingChannelTypeEnum.SEARCH
    c.campaign_budget = budget_rn
    c.network_settings.target_google_search = True
    c.network_settings.target_search_network = False        # search partners OFF
    c.network_settings.target_content_network = False       # Display OFF
    c.network_settings.target_partner_search_network = False
    client.copy_from(c.maximize_conversions, client.get_type("MaximizeConversions"))
    geo_type = (enums.PositiveGeoTargetTypeEnum.PRESENCE_OR_INTEREST if plan["geo_interest"]
                else enums.PositiveGeoTargetTypeEnum.PRESENCE)
    c.geo_target_type_setting.positive_geo_target_type = geo_type
    c.geo_target_type_setting.negative_geo_target_type = (
        enums.NegativeGeoTargetTypeEnum.PRESENCE)
    c.contains_eu_political_advertising = (
        enums.EuPoliticalAdvertisingStatusEnum.DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING)
    ops.append(op)

    for geo_rn in plan["geo_resource_names"]:
        op = client.get_type("MutateOperation")
        cc = op.campaign_criterion_operation.create
        cc.campaign = campaign_rn
        cc.location.geo_target_constant = geo_rn
        ops.append(op)

    # No language criterion on purpose - retired from Search in late September 2026.

    for day, start, end in (plan["schedule"] or []):
        op = client.get_type("MutateOperation")
        cc = op.campaign_criterion_operation.create
        cc.campaign = campaign_rn
        cc.ad_schedule.day_of_week = getattr(enums.DayOfWeekEnum, day)
        cc.ad_schedule.start_hour = start
        cc.ad_schedule.start_minute = enums.MinuteOfHourEnum.ZERO
        cc.ad_schedule.end_hour = end
        cc.ad_schedule.end_minute = enums.MinuteOfHourEnum.ZERO
        ops.append(op)

    ag_ops, kw_ops = [], []
    for idx, g in enumerate(groups):
        ag_rn = ga.ad_group_path(customer_id, -(10 + idx))

        op = client.get_type("MutateOperation")
        ag = op.ad_group_operation.create
        ag.resource_name = ag_rn
        ag.campaign = campaign_rn
        ag.name = g["name"]
        ag.status = enums.AdGroupStatusEnum.PAUSED
        ag.type_ = enums.AdGroupTypeEnum.SEARCH_STANDARD
        ag.ad_rotation_mode = enums.AdGroupAdRotationModeEnum.OPTIMIZE
        # The landing page is NOT set here: final URLs live on the ad, not the ad group.
        # /write-ads reads the same **Landing page:** line and puts it on the RSAs.
        ag_ops.append(op)

        for kw in g["keywords"]:                       # phrase match, no city appended
            op = client.get_type("MutateOperation")
            agc = op.ad_group_criterion_operation.create
            agc.ad_group = ag_rn
            agc.status = enums.AdGroupCriterionStatusEnum.ENABLED
            agc.keyword.text = kw
            agc.keyword.match_type = enums.KeywordMatchTypeEnum.PHRASE
            kw_ops.append(op)

        seen = set()
        for text, match in g["negatives"]:
            if (text, match) in seen or text in g["keywords"]:
                continue
            seen.add((text, match))
            op = client.get_type("MutateOperation")
            agc = op.ad_group_criterion_operation.create
            agc.ad_group = ag_rn
            agc.negative = True
            agc.keyword.text = text
            agc.keyword.match_type = getattr(enums.KeywordMatchTypeEnum, match)
            kw_ops.append(op)

    return ops + ag_ops + kw_ops


# ------------------------------------------------------------------ main

def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--apply", action="store_true", help="actually create. Without it, dry run.")
    ap.add_argument("--dry-run", action="store_true", help="default; print the plan and stop")
    ap.add_argument("--groups", type=int, default=3, help="how many ad groups to build (default 3)")
    ap.add_argument("--country", help="ISO code for national targeting, e.g. US. Overrides business.md")
    ap.add_argument("--cities", help="comma-separated cities for a local service area")
    ap.add_argument("--schedule", help="24x7 or START-END in 24h account time, e.g. 7-19")
    ap.add_argument("--geo-interest", action="store_true",
                    help="Presence OR interest. ONLY for destination businesses whose customers "
                         "are not in the area yet (hotels, tours, relocation)")
    args = ap.parse_args()

    kw_text, biz_text = read(KEYWORD_LIST), read(BUSINESS)
    groups, neg_rows = parse_keyword_list(kw_text)
    if not groups:
        sys.exit("No ad groups found in keyword-list.md. Run /keywords stag to build the "
                 "account structure section first.")

    buildable = [g for g in groups if not g["hold"] and g["keywords"]]
    held = [g for g in groups if g["hold"]]
    selected = buildable[:args.groups]
    if not selected:
        sys.exit("Every group in keyword-list.md is marked HOLD. Nothing to build.")
    for g in selected:
        g["negatives"] = negatives_for(g, neg_rows, groups)

    monthly = parse_budget(biz_text)
    daily_micros = round(monthly / 30.4 * 1_000_000 / 10_000) * 10_000
    schedule = parse_schedule(biz_text, args.schedule)

    client, customer_id = load_client()
    if not customer_id:
        sys.exit("GOOGLE_ADS_CUSTOMER_ID missing from .env. Run /api-setup.")
    ga = client.get_service("GoogleAdsService")

    geo_names, geo_rns = [], []
    if args.cities:
        cc = (args.country or parse_country(biz_text) or "").upper() or None
        for city in [c.strip() for c in args.cities.split(",") if c.strip()]:
            rn, _ = resolve_city_geo(client, city, cc)
            geo_names.append(city)
            geo_rns.append(rn)
    else:
        code = (args.country or parse_country(biz_text) or "").upper()
        rn = country_geo(code)
        if not rn:
            sys.exit(f"Could not work out the target country (read {code!r} from business.md). "
                     "Pass --country US, or --cities for a local service area.")
        geo_names, geo_rns = [code], [rn]

    plan = {"budget_micros": daily_micros, "schedule": schedule,
            "geo_resource_names": geo_rns, "geo_interest": args.geo_interest}

    by_campaign = {}
    for g in selected:
        by_campaign.setdefault(g["campaign"] or "Search", []).append(g)

    # ------------------------------------------------------------ the plan
    sched = "24/7" if schedule is None else f"{schedule[0][1]}:00-{schedule[0][2]}:00 Mon-Fri"
    print(f"\nAccount {customer_id}")
    print(f"Budget  ${monthly:,}/mo -> ${daily_micros / 1_000_000:.2f}/day per campaign, not shared")
    print(f"Geo     {', '.join(geo_names)} · {'Presence OR interest' if args.geo_interest else 'Presence only'}")
    print(f"Sched   {sched}")
    print(f"Groups  {len(selected)} of {len(buildable)} buildable"
          f"{f' ({len(held)} on HOLD, skipped)' if held else ''}, in keyword-list.md order\n")

    for i, g in enumerate(selected):
        tag = " · LAUNCH THIS ONE" if g["launch"] else (" · WATCH" if g["watch"] else "")
        role = "live once you enable it" if i == 0 else "paused bench"
        print(f"  {g['order']}. {g['name']}{tag}  [{role}]")
        print(f"     campaign: {g['campaign']}")
        print(f"     page:     {g['landing_page'] or '** PAGE PENDING - run /landing-page **'}")
        print(f"     keywords: {len(g['keywords'])} phrase · {', '.join(g['keywords'][:3])}"
              f"{' ...' if len(g['keywords']) > 3 else ''}")
        print(f"     negatives: {len(g['negatives'])} at ad group level\n")

    if held:
        print(f"  On HOLD, not built: {', '.join(g['name'] for g in held)}\n")

    if not args.apply:
        print("Dry run. Nothing created. Re-run with --apply.\n")
        return

    failures = []
    for campaign_name, gs in by_campaign.items():
        ops = build_ops(client, ga, customer_id, campaign_name, gs, plan)
        print(f"-> {campaign_name}: {len(ops)} operations "
              f"({len(gs)} ad groups, {sum(len(g['keywords']) for g in gs)} keywords, 0 ads) ... ",
              end="", flush=True)
        try:
            req = client.get_type("MutateGoogleAdsRequest")
            req.customer_id = customer_id
            req.mutate_operations.extend(ops)
            req.response_content_type = client.enums.ResponseContentTypeEnum.MUTABLE_RESOURCE
            resp = ga.mutate(request=req)
            rn = next(r.campaign_result.resource_name for r in resp.mutate_operation_responses
                      if r._pb.HasField("campaign_result"))
            print(f"created {rn}")
        except GoogleAdsException as e:
            print(f"\nFAILED atomically (request_id {e.request_id}) - this campaign rolled back "
                  f"cleanly, others unaffected:")
            for err in e.failure.errors:
                print(f"  - {err.error_code}: {err.message}")
            failures.append(campaign_name)

    print()
    if failures:
        print(f"Failed: {', '.join(failures)} - fix and rerun.")
        sys.exit(1)
    print("Everything created PAUSED. Nothing spends until you enable it in the UI.")
    print("No ads were built - run /write-ads next (code/build_ads.py).")


if __name__ == "__main__":
    main()
