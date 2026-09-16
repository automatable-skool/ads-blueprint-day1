# The audit config - what the dashboard scripts read

One JSON file per account at `code/cache/<customer>-audit-config.json`. Claude writes it from `context/business.md`, `references/google-ads-audit.md` and the owner's answers BEFORE the first run of `code/audit_dashboard_data.py --config`. Every key below is present every time; a list may be empty, never missing. Never fill it from another account's facts.

The example is ABC Company, the fictional Toronto plumber from `references/examples/business-example.md`.

```json
{
  "business": "ABC Company",
  "domain": "abcplumbing.example",
  "currency": "CAD",
  "cities": ["toronto", "east york", "north york", "etobicoke", "scarborough", "mississauga", "brampton"],
  "service_words": ["plumber", "plumbing", "drain cleaning", "water heater"],
  "brand_terms": ["abc company", "abc plumbing", "abcplumbing"],
  "job_value": 2400,
  "close_rate": 0.35,
  "economics_confidence": "estimated",
  "economics_note": "Owner, 6 August 2026: a closed job averages $2,400; about 35 in 100 leads book.",
  "benchmark": {"category": "Home and home improvement", "ctr": 6.47, "cpc": 8.33, "cvr": 8.05, "cpl": 90.92},
  "lsa": {"eligible": true, "reason": "Plumber in Canada: one of the 14 home-service categories live there"},
  "must_exclude_countries": ["United States"],
  "far_places": ["hamilton", "oshawa", "barrie", "ottawa", "montreal"],
  "held_places": ["vaughan", "markham"],
  "not_sold": ["commercial plumbing", "septic", "well pump", "gas line", "furnace", "boiler", "pool", "hot tub", "irrigation", "sprinkler", "appliance repair"],
  "universal_junk": ["jobs", "salary", "apprenticeship", "school", "course", "diy", "how to", "parts", "supplies", "free", "reddit"]
}
```

## Key by key

- **business** and **domain**: the name as the owner says it, and the site the ads land on. The `--anonymise` flag swaps both for placeholders.
- **currency**: what the account bills in - `context/business.md`, "Account bills in".
- **cities**: the service area, lowercase, spelled the way campaign names and page URLs spell them. The own-city and city checks read this list.
- **service_words**: two to five lowercase words naming what is sold. The headline and theme checks read them; empty means those checks can never pass.
- **brand_terms**: every spelling of the business's own name, lowercase. Brand searches are never junk, and the Performance Max brand recipe names these.
- **job_value** and **close_rate**: "The economics" in `context/business.md`. close_rate is a fraction: 0.35 means 35 in 100 leads book.
- **economics_confidence** and **economics_note**: measured, estimated or guess, plus the owner's sentence. A guess grades every profit line Assumed.
- **benchmark**: the row for this trade from "2026 benchmarks" in `references/google-ads-audit.md` - category, ctr, cpc, cvr, cpl as printed there. Never invent a regional multiplier.
- **lsa**: eligible true or false with the reason, from `references/lsa-setup.md` (country plus category).
- **must_exclude_countries**: the countries every campaign has to exclude - the neighbours Google would otherwise show ads in.
- **far_places**: towns and regions the business does not serve that show up in location reports. Spend there counts as outside the service area.
- **held_places**: towns to ASK about before calling them waste - borderline or converting. Never negated without the owner.
- **not_sold**: "What we DON'T do" from `context/business.md`, lowercase. A search term naming one of these is junk.
- **universal_junk**: the universal starter negatives from `references/universal-negative-keywords.md`, lowercase. The coverage check counts how many the account already blocks.
