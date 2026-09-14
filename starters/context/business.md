# Business

> Filled by `/context-layer` (scrape + interview). No ad or page ever gets written for a service or area that isn't in this file.

## What we do
<!-- Every service offered, one per line, in the words customers use. /keywords researches exactly this list - confirm it there, add to it there. -->

## Market and budget
**Country customers search from:** · **Language:** · **Business type:** local or national brand / ecommerce / internet business
**Monthly ad budget:** $______ ______ <!-- amount THEN currency code, e.g. "$2,000 CAD". Never a bare number. -->
**Account bills in:** <!-- the currency the Google Ads account itself charges in - CAD, USD, GBP... -->
<!-- /keywords and /campaign-plan read these and never ask again. Click costs differ wildly by market, so the country decides the numbers.
     ⛔ CURRENCY IS NOT OPTIONAL. /campaign-plan divides the budget by 30.4 and sets the daily budget in whatever
     the ACCOUNT bills in - it cannot convert. A $2,000 figure meant as USD, on an account billing in CAD, lands
     roughly 27% short and nothing warns you. Quoting fees in one currency and billing ads in another is common,
     so if these two lines differ, say which one the budget number is in. -->

## Service area
<!-- Cities and areas served, travel radius -->

## Hours
**Phone answered:** 24/7 by a person / business hours only / 24/7 by an answering service
**Business hours:**
<!-- /campaign-plan sets the ad schedule from this. Ads that run when nobody picks up teach Google to find leads that die in voicemail. -->

## What we DON'T do
<!-- Services not offered, jobs turned away - these seed the negative keywords -->

## Company story
<!-- Years in business, founders, team size -->

## The economics
<!-- Without these, "is $43 a lead good?" has no answer and waste has no denominator.
     /context-layer collects them once; /audit reads them every run. -->
**Average job value:** <!-- what one closed job is worth in revenue, e.g. $2,400 -->
**Close rate on a lead:** <!-- what share of leads become jobs, e.g. 35% -->
**Therefore a lead is worth:** <!-- job value x close rate - /audit computes this -->
**Break-even cost per lead:** <!-- the same number: above it you lose money on every lead -->
**Target cost per lead:** <!-- what you actually want to pay, usually well under break-even -->

<!-- If these are guesses, say so here. /audit grades any finding built on them as "Assumed"
     and prints the assumption beside every number that depends on it. -->
**How confident are these numbers?** <!-- measured from the CRM / estimated / a guess -->

## My packages
<!-- Only needed if you sell Google Ads management to clients. /proposal prices from here and stops if it's empty. Up to three, mark ONE recommended. The rule: the recommended fee sits UNDER the client's proven monthly waste. -->

### Package one
**Price:** · **Term:** · **Recommended:** yes / no
- What's included, one line each

### Package two
**Price:** · **Term:** · **Recommended:** yes / no
- What's included, one line each

## The GHL plumbing
<!-- Collected once by /context-layer. Later commands read these and never ask again.
     A blank here is a blocker, not a detail - say which are missing rather than leaving it empty. -->
**GHL phone number:** <!-- the tracking number - goes on the site and in the call asset -->
**GHL calendar link:** <!-- the booking widget - goes on /thank-you and on the proposal -->
**Inbound webhook URL:** <!-- also in .env as LEAD_WEBHOOK_URL - every form posts here -->
**New-lead workflow:** <!-- name of the existing one, or "none - /landing-page builds speed-to-lead" -->

## Terms
**Billing:** · **Notice to cancel:** · **Ad spend:** paid by the client directly to Google, never part of the fee
**Booking link:** <!-- the one action on every proposal - your GHL calendar URL -->
