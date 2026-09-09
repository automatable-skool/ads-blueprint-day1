# Lead counting - what to count now, and the ladder to counting what actually books
Researched 2 September 2026 across 20 sources (9 Google official pages, the rest White Shark Media, Search Engine Journal, One PPC, Optmyzr, Kampaio, Nimbata, MeasureSchool, Solutions 8, JumpFly, LeadsBridge, WhatConverts, Apptoto, CallRail data) · what practitioners do while an account is new, and the staged path to bidding on booked appointments instead of phone rings.

Companion to `references/conversion-tracking.md` (the setup mechanics). This file is the strategy:
which signal is primary at which stage of an account's life.

## How every claim is graded
**(a)** Google official page. **(b)** Study or stated-sample practitioner data. **(c)** Practitioner convention.

---

## The one-sentence consensus

Every source that addresses staging says the same thing: **start by bidding on the best signal you
can count today (forms + meaningful calls), and graduate to bidding on what the CRM says actually
became a lead - but only after running the deeper signal as observation-only first.** Nobody
credible jumps straight to CRM bidding on day one, and nobody credible stays on raw calls forever.

## Phase 1 · The interim setup - a new account, no history (month 1)

What most practitioners run (c, near-unanimous):

- **1-3 primary actions, every one defensible as money.** The test from the 2026 guides: if you
  could not explain to a CFO why this action is success, it is not a primary.
- **Primary: valid form submits + calls.** For local service, 50-70% of leads arrive by phone (b,
  PipelineOn), so calls MUST be a primary or Smart Bidding optimizes on half the picture.
- **Counting ONE per click on every lead action** (a). EVERY belongs to e-commerce only.
- **Everything soft goes secondary**: page views, chat starts, newsletter signups, short calls.
  Secondary shows in All conversions, never trains bidding (a).

**On call duration - the industry default vs this repo's ruling.** The common convention is a 30-60
second minimum (c, Adalysis band; 60 is the widely-cited default). Its real job is filtering
accidental mobile taps and spam, and the guides admit the threshold is arbitrary - "look through
your call history and decide" is Google's own advice (a).

**This repo's default is 1 second - any CONNECTED call counts** (Jono's ruling, 2 Sep 2026):
- The duration timer starts at CONNECT, not ring (telephony convention; Google does not publish
  it - verify from the call details report in week one, a missed call's duration row settles it).
- A fat-thumb tap cancelled while ringing never connects, so it never counts. No threshold needed.
- A voicemail pickup IS a connect - the greeting playing starts the clock. Voicemail ON is part
  of setup: without it an unanswered real lead records nothing.
- A duration threshold quietly measures the OWNER's answering habits, not lead quality. A missed
  call from a real bride is invisible at any threshold.
- Raise the threshold only if the call details report shows real junk connecting. Never pre-emptively.

**The modern alternative - AI-qualified call conversions** (a, launched 2025-26): call recording ON
lets Google's AI read the conversation and count only calls showing intent (asking about services,
scheduling, readiness to buy). Filters robocalls and spam that beat any duration threshold, and
falls back to the duration rule when recording is unavailable. US and Canada only, recording on by
default except healthcare and finance. Worth switching on wherever available - it makes the whole
duration debate obsolete.

## Phase 2 · The validation bridge (month 2)

The One PPC staging framework (c), echoed by White Shark and the 2026 guides:

1. Keep forms + calls primary.
2. **Import the CRM outcome (contact responded / appointment booked) as SECONDARY.** Watch it for
   2-4 weeks: does the volume line up, is the delay tolerable, does it fire reliably?
3. Only when the deeper signal proves consistent, has adequate volume and acceptable delay does it
   get promoted to primary - and the raw form/call actions demote to secondary the same day.
   Never run both as primary: that double-trains bidding on one business event (a).

**The booked-appointment mechanics, simplest first:**
- **Booking tool thank-you / confirmation event** → conversion. If bookings happen on a page you
  control, this is a normal website conversion and needs no import at all (c, Apptoto pattern via
  GA4 key event also works).
- **Enhanced conversions for leads** (a, Google's recommended import path): the tag captures the
  lead's email/phone at first contact; when the CRM marks them qualified or booked, upload the
  hashed email/phone and Google matches it to the ad click itself. No GCLID plumbing, works for
  phone-first leads (match on phone number), 63-day upload window.
- **GCLID offline import** (a): the classic path, 90-day window, needs the GCLID stored at
  submission time - "the upload fails silently if GCLID is not stored" (c, Kampaio).
- Upload daily where possible (a). ⛔ From **15 June 2026** these uploads move to the **Data
  Manager API** and are blocked in the Google Ads API (a) - build new import scripts against
  Data Manager, not the old endpoint.

## Phase 3 · Value on the lead (month 3+)

Once the qualified/booked signal is primary and stable, give stages values so bidding can tell a
tire-kicker from a booked job: the circulating convention is **$10 enquiry · $200 qualified ·
$1,500 booked/won** (c, JumpFly) - replace with the account's own economics from
`context/business.md` the moment they exist. Optmyzr's warning on value-based bidding (b): the
technology is never the bottleneck, the data is - values that stop reflecting reality quietly
mistrain bidding, so revisit them quarterly. This is also the stage where Target ROAS stops being
a fantasy: it is the same feedback loop, fed with revenue.

## The rules that fall out of all 20 sources

1. Primary = money. 1-3 actions, never more (c, unanimous).
2. One business event trains bidding ONCE. Call asset + website call + import of the same call =
   pick one primary, rest secondary (a).
3. New signals audition as secondary before they ever touch bidding (c, One PPC).
4. The deepest RELIABLE stage wins, not the deepest stage (c). A booked-job signal that fires
   twice a month starves Smart Bidding; stay one rung up until volume exists.
5. Never optimize toward what is merely easy to count (c, White Shark). Page views and short
   calls are diagnostics, not goals.
6. LSA is its own lane: charged per lead, not per click, and junk leads get DISPUTED for credit
   (a) - the dispute button is LSA's version of this whole file.

## Sources
Google: primary/secondary actions (11461796) · phone call conversions (6100664) · measure calls
from ads (6095882) · AI-qualified calls (16913326) · offline conversion imports (2998031) + FAQs
(10029210) · import call conversions (6301373) · enhanced conversions for leads (MeasureSchool
walkthrough) · conversion windows (3046555). Practitioner: White Shark Media lead quality ·
Search Engine Journal primary/secondary framework · One PPC staging framework · Optmyzr
value-based bidding guide · Kampaio 2026 lead quality guide · Nimbata lead scoring importation ·
Solutions 8 conversion setup · JumpFly stage values · LeadsBridge lead quality · WhatConverts
call counting · Apptoto booking conversions · PipelineOn / CallRail home-services data.
