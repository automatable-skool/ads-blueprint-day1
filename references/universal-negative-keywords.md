# Universal negative keywords - any service business
Consolidated June 2026 from fifteen PPC sources · one hundred and fifty universal terms plus industry sets
Next: add section A at account level today, then review the search terms report in a week.

Works for plumbers, HVAC, electricians, roofers, lawyers, dentists, cleaners and contractors. Match type is broad unless a term is marked otherwise. Re-validate this list every quarter - match-type behaviour and search trends shift.

## How to roll this out

**Day one.** Add the one hundred and fifty universal terms in section A as account-level negatives, under Admin then Account settings then Negative keywords. They apply to every Search and Shopping campaign the account ever runs, with nothing to attach and nothing to forget. The cap is one thousand terms, so this list fits easily.

**Do not use a shared list for this.** Shared negative keyword lists, under Tools then Shared Library, attach campaign by campaign and can never be applied account-wide. Use them for themed sets only. Through the API, account-level negatives are `CustomerNegativeCriterion`, not a shared list.

**Run one to two weeks on these defaults**, then pull the search terms report every week: add the new junk you see, and remove anything this list is blocking that was actually a real customer.

**Most accounts settle at roughly one hundred and fifty to two hundred and fifty negatives** after sixty days.

**Quality beats quantity.** One broad `jobs` blocks thousands of irrelevant queries. Adding fifty exact-match versions of niche junk is busywork.

---

## A. Universal negatives - paste these on day one

### A.1 Job seekers - thirty-seven terms

The biggest source of misclicks for a service business.

```
jobs
job
hiring
recruit
recruiting
recruitment
recruiter
career
careers
employment
employer
employee
salary
salaries
wage
wages
hourly pay
resume
cv
intern
interns
internship
internships
apprentice
apprentices
apprenticeship
apprenticeships
volunteer
vacancy
vacancies
vacancy
position open
hiring near me
work from home
indeed
glassdoor
ziprecruiter
```

### A.2 DIY, how-to and tutorial - twenty-eight terms

Blocks research-mode and DIY searchers who will never hire.

```
diy
do it yourself
how to
howto
how do
how do you
tutorial
tutorials
guide
guides
step by step
instructions
youtube
video
videos
template
templates
example
examples
how to fix
how to repair
how to install
how to remove
how to clean
how to replace
how to build
homemade
yourself
```

### A.3 Education, training and schools - twenty-two terms

Catches students researching the trade itself, not buyers.

```
school
schools
schooling
college
university
class
classes
course
courses
training
trainee
trained
certification
certificate
certified
license cost
licensing
license requirement
license requirements
become a
how to become
exam
```

### A.4 Free, discount and cheap - fifteen terms

Most price-shoppers do not convert. Do not add `affordable`, `quote` or `pricing` here - those are legitimate buyer signals.

```
free
freebie
giveaway
giveaways
sample
samples
trial
discount
discounted
voucher
coupon
coupons
promo code
clearance
secondhand
```

### A.5 Informational research - sixteen terms

Catches definitional and Wikipedia-style queries.

```
what is
what is a
what does
what are
meaning
definition
wikipedia
wiki
reddit
quora
forum
forums
blog
review
reviews
ratings
```

### A.6 Customer support and existing customers - eighteen terms

Usually existing customers, yours or a competitor's, looking for help rather than buying.

```
complaint
complaints
refund
refunds
return policy
cancel
cancellation
warranty claim
problem
problems
not working
broken
contact
phone number
customer service
help
login
sign in
```

### A.7 Restricted and unsafe - fourteen terms

A safety net for obvious junk Google sometimes serves on.

```
porn
adult
nude
sex
gambling
casino
weed
marijuana
cbd
crypto
bitcoin
nft
mlm
ponzi
```

---

## B. Industry sets - add only the one that matches

### B.1 Plumbing, HVAC, electrical and roofing - nineteen terms

```
parts
plumbing parts
hvac parts
electrical parts
supplies
wholesale
fitting
fittings
diagram
schematic
manual
spec sheet
torque
amperage
voltage
plumber salary
plumbing apprentice
electrician union
roofer hourly
```

### B.2 Legal services - thirteen terms

```
free consultation
free advice
pro bono
legal aid
legal services free
public defender
law school
bar exam
legal forms free
self representation
pro se
court filing fees
small claims
```

### B.3 Medical and dental - twelve terms

```
medicaid
medicare
insurance only
dental school
dentist salary
medical school
free clinic
sliding scale
clinic free
emergency room
walk in clinic
free dental
```

### B.4 Beauty and wellness - twelve terms

Salons, spas and gyms.

```
school
academy
training
diploma
certificate
license
groupon
classpass
free pass
free trial
how to do
at home
```

### B.5 Auto repair and detailing - twelve terms

```
parts
auto parts
salvage
junkyard
free estimate calculator
diy car
youtube car
manual
service manual
torque specs
oem parts
aftermarket
```

---

## C. Geographic negatives - build your own

If you serve Toronto plus fifty kilometres, block the cities and regions outside that area that compete for your service keywords.

Location targeting set to presence-only catches most of this already, but presence does not block a Toronto resident **searching for a Calgary plumber**. Geographic negatives close that gap.

Template:
```
[major city you don't serve]
[major city you don't serve]
[major city you don't serve]
[neighboring metro you don't serve]
[state/province you don't serve]
[country code you don't serve]
```

Worked example, a Toronto plumber serving the GTA only - sixteen terms:
```
calgary
edmonton
vancouver
montreal
ottawa
winnipeg
hamilton
london ontario
kitchener
windsor
USA
united states
new york
california
texas
florida
```

---

## D. Competitor brands - decide case by case

**Do not block them in your main SKAG campaign.** Competitor searches are mid-funnel and convert two to three times better than generic queries.

**Do block them everywhere except your Competitor Conquest campaign,** so those queries route to the ads built for them.

**No Conquest campaign yet?** Add your top five to ten local competitors as broad account-level negatives, so you stop paying for brand-mismatched clicks in the meantime.

```
[competitor 1]
[competitor 2]
[competitor 3]
[competitor 4]
[competitor 5]
```

---

## E. Which match type to use

**Broad** is the default, a bare word. Use it for single-word universal junk: `jobs`, `free`, `how`, `diy`.

**Phrase** is `"in quotes"`. Use it for multi-word phrases where the word order matters: `"how to fix"`, `"plumber salary"`.

**Exact** is `[in brackets]`. Use it for one precise query you want blocked without blocking its variants: `[plumber jobs near me]`.

**Negative broad does not cover close variants or synonyms.** Blocking `jobs` still leaves `job` and `hiring` serving your ads. That is why a real list carries both `job` and `jobs`.

---

## F. Nine terms that look like negatives but are not

Every one of these blocks real buyers.

**affordable** · Reads like a cheap shopper, but "affordable plumber" is budget-conscious and ready to buy.

**near me** · Looks vague. It is one of the three highest-converting modifiers there is.

**quote** · Looks like research. "Get a quote" is lead-form intent.

**price** and **pricing** · Look like tyre-kickers. "Plumber pricing Toronto" is late-funnel, high intent.

**cost** · Same as above, high-intent comparison shopping.

**best** · Looks like research. "Best plumber Toronto" is a comparison shopper close to deciding.

**hire** · Looks like someone researching how to hire. "Hire a plumber" is direct buyer intent.

**local** · Looks vague. It carries strong geographic intent.

**emergency** · This is your best keyword, not a negative.

---

## G. The weekly maintenance pass - fifteen minutes

1. Open Google Ads, then Insights and reports, then Search terms
2. Set the date range to the last seven days
3. Sort by cost, highest first
4. For each term, decide:
  - **Converted?** Skip it
  - **Spent twenty dollars or more with zero conversions?** Add it as a campaign negative - phrase match if multi-word, broad if single
  - **Borderline: low cost, no conversions, but plausible intent?** Mark it and wait one more week
5. Bulk-add the negatives in one operation

Expect five to fifteen new negatives a week for the first six weeks, then one to three.

---

## H. Adding the whole list through the API

Paste this prompt into Claude Code:

```
You are Claude Code. Add the following universal negative keyword list to my
Google Ads account (customer ID {your_customer_id}) as ACCOUNT-LEVEL negative
keywords, using CustomerNegativeCriterion through the API - one criterion per
term. Do NOT use a shared negative keyword list; shared lists attach per
campaign, and this list must cover every campaign the account ever runs.


Use BROAD match type for all entries unless the term contains quotes or brackets
(in which case use phrase or exact match respectively).


When you're done, read the account-level negatives back and confirm the count.


Negatives:
[paste sections A.1 through A.7 above - one term per line]
```

The script is `code/add_shared_negative_list.py` - dry run by default, `--apply` to push, `--attach` to attach it to the enabled Search campaigns. It holds back any term that names a service in `context/business.md`.

---

## Sources

- [GroAS · Google Ads Negative Keyword Strategy In 2026](https://www.groas.com/post/google-ads-negative-keyword-strategy-2026-campaign-level-ai-max-pmax-industry-lists)
- [GroAS · 300+ Comprehensive List by Category, Campaign Type, Industry](https://www.groas.com/post/google-ads-negative-keywords-list-2026-comprehensive-guide-by-category-industry)
- [GroAS · The Complete 2026 List (500+ Keywords by Industry)](https://www.groas.com/post/negative-keywords-for-google-ads-the-complete-2026-list-500-keywords-by-industry)
- [Launchcodex · 3,000+ negative keywords for PPC 2026](https://launchcodex.com/blog/performance-marketing/negative-keyword-list-ppc/)
- [PPCChief · 500+ Terms to Copy-Paste into Google Ads](https://ppcchief.com/resources/negative-keyword-list)
- [Search Scientists · 800-keyword Universal List](https://www.searchscientists.com/universal-negative-keywords/)
- [Lionel Z · Strategy and Master Lists 2026](https://lionelz.com/en/blog/negative-keywords-google-ads/)
- [Ilyas Marketing Hub · Complete 2026 Guide](https://ilyasmarketinghub.com/google-ads-negative-keywords/)
- [Level Agency · Big List of 1,500+ PPC Negatives](https://www.level.agency/perspectives/negative-keyword-list/)
- [PPC.io · 150+ Examples by Industry](https://ppc.io/blog/negative-keywords-examples)
- [PPC.co · Negative Keyword List Building Guide](https://ppc.co/blog/negative-keywords)
- [MediaSpearhead · Google Ads Keywords by Industry](https://mediaspearhead.com/google-ads-keywords-by-industry/)
- [Mancini Digital · Negative Keyword List Tutorial](https://www.mancinidigital.com/how-to-use-the-google-ads-negative-keyword-list/)
- [KeywordMe · 8 Types of Negative Keyword Lists](https://www.keywordme.io/blog/negative-keywords-list-for-google-ads)
- [Store Growers · Complete Guide to Negative Keywords](https://www.storegrowers.com/negative-keywords/)
- [Google Ads Help · About negative keyword lists](https://support.google.com/google-ads/answer/2453983)
