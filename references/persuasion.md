# Persuasion - why a line makes someone act

Built 1 September 2026 from a 50+ source sweep: the tested classics (Hopkins, Caples, Ogilvy, Schwartz, Halbert), the academic record (Bond's conformity meta-analysis, the second-person pronoun studies, the replication audits), the large-sample ad datasets (Optmyzr, 22,000+ accounts and 1M+ ads), the CRO literature (Portent, CXL, KlientBoost, Unbounce) and Google's own policy pages.
Next: write with this open, then run the three gates in `/write-ads`.

**This file is the WHY. `references/google-ads.md` is the WHAT.** That file owns character limits, pinning, the six angles, the rejection list and the format rules. This one owns why a sentence moves someone, which is the part that does not change when Google changes its ad units.

**There is no voice file on the ads side (Jono's ruling, 1 September 2026).** An ad is not written in a personal register. How someone writes an email or a LinkedIn post is a different job from a 30-character headline, and layering a personal voice over someone else's results is what makes an ad read as fake. This file replaces that idea: persuasion is the craft, proof is the content, and `context/proof.md` is the only source of claims.

## How every claim is graded

- **(a)** Google documentation or policy page
- **(b)** A study with a stated sample size
- **(c)** Tested convention from the direct-response record - repeatedly validated, rarely with a modern sample size attached
- **(d)** Academic finding, replication status noted

---

# 1. Start with what they already know · the awareness model

Eugene Schwartz, *Breakthrough Advertising*, 1966. **The single most useful idea in this file, because search hands you the awareness level for free.** (c)

The five levels, and what the ad has to do at each:

- **Unaware** · does not know they have a problem. **Not reachable by search.** Nobody types a query for a problem they do not know they have. Do not write for this level in an ad
- **Problem aware** · feels the pain, does not know solutions exist. Query looks like "water coming through ceiling". Name the problem in their words, then the category
- **Solution aware** · knows the category, does not know you. Query is "emergency plumber". **This is where most service ads live.** The job is one reason to pick you, not an explanation of what a plumber is
- **Product aware** · knows you, has not committed. Query is your brand name, or "yourbrand reviews". The job is the objection that is actually holding them
- **Most aware** · ready, needs the offer. Brand plus intent, "yourbrand book". Just make the action obvious

**How to use it:** read the keyword, place it on the ladder, then write to that rung. Writing the wrong rung is the most common reason a technically clean ad does nothing - a problem-aware explanation shown to a solution-aware searcher wastes the headline explaining something they already know.

**The corollary that kills a lot of bad advice:** PAS (problem, agitate, solution) only works from problem-aware down. On a solution-aware search query, agitation reads as pushy, because they already know the pipe is leaking - they are three tabs deep comparing plumbers. (c)

---

# 2. What actually gets read

**Self-interest first, news second, curiosity a distant third.** John Caples ran coupon-tracked splits for decades and found a self-interest ad pulled roughly **twice** the inquiries and twice the sales of a curiosity ad. (c) Curiosity gets the click and loses the sale, which on paid search means you buy the click and get nothing.

**The headline carries it.** Unchanged from Hopkins in 1923 through to now. In an RSA that means the unpinned headline pool is where the work goes, not the descriptions. (c)

**Say the thing, do not tee it up.** "Learn more" and "click here" are on Google's own generic-CTA list. (a) A line whose job is to introduce the next line is a wasted line.

---

# 3. Specificity is the whole game

**The oldest tested finding in advertising, and the one people abandon first.** Claude Hopkins, *Scientific Advertising*, 1923: "Actual figures are not generally discounted. Specific facts, when stated, have their full weight and effect." (c)

Why it works: **a specific number is expensive to fake and a round one is free.** "Trusted by thousands" costs nothing to write. "Trusted by 1,847 businesses" reads as something someone counted.

The rules:

- **Exact beats round.** "Join 46,700 others" beats "join thousands" (c)
- **Round DOWN, never up.** 512 becomes "500+". Rounding up is a claim; rounding down is a floor you can defend
- **Date every number.** An undated countable rots into an understatement, and a stale number in an ad is a policy problem, not just a stale number
- **A number with no source is not proof.** It goes in `context/proof.md` with where it came from and when, or it does not go in an ad

**The trap:** specificity is not the same as precision theatre. "78.54%" where "78%" is the real measurement is a lie with decimal places on it.

---

# 4. The six things a service buyer is actually afraid of

Persuasion in a service ad is **objection handling**, not enthusiasm. The buyer is not asking "is this good", they are asking "will this go wrong". Every one of these is a headline waiting to happen, and most markets leave four of the six completely empty:

1. **You will not show up** · or not when you said
2. **The price will change** once you are in the house
3. **You are not qualified** · not licensed, not insured, not really a specialist
4. **I cannot reach a human** · the phone rings out, the form goes nowhere
5. **I will be stuck with you** · contracts, lock-ins, no way out
6. **This will not work for someone like me** · wrong size, wrong industry, wrong budget

**How to use it:** run the competitor swipe file against this list. The fear nobody in the market answers is your opening, and answering a fear is cheaper than inventing a differentiator.

**The best proof answers a specific fear, not a general one.** A review saying "great job" kills nothing. A review saying "I was worried about the smell, they used a low-VOC system and finished in one day" kills objection 6 outright. When distilling reviews in `/context-layer`, tag them by the fear they kill.

---

# 5. Write to one person, in their words

**Second person works, and it is one of the better-evidenced items here.** Cruz, Leonhardt and Pezzuti (2017) found second-person pronouns raise consumer involvement and brand attitude, mediated by self-referencing. (d) The effect is weaker for more collectivist audiences, which matters if you are advertising outside North America.

**Use the customer's words, not the trade's.** The phrases that repeat across reviews are the words buyers use for the outcome. "Blocked drain" is what they type; "hydro-jetting" is what you do.

**Plain language converts, and the gap is enormous.** Portent's readability study: pages at a grade 5 to 7 reading level converted at **11.1%**, against **5.3%** for professional-level writing - roughly double. Difficult words correlated with a **24.3%** conversion drop. (b) Aim for a Flesch Reading Ease of 60 to 70.

This is not dumbing down. It is removing the effort between reading and understanding, on a device, from someone who is mid-problem.

---

**The explain-it-first test.** If it is a word you only use *after* you have explained it, it cannot go in the ad. "Sprint" is a good example - it is a real thing, it is how the work is sold, and it lands beautifully on a call once someone has heard what it means. On a search results page it is a word the reader has never met, spent on a slot that could have said what they actually typed. Jono, 1 September 2026. The ad is read by someone who has had nothing explained to them yet: no call, no page, no context, three seconds. Every word has to work cold. Vocabulary you earned the right to use later belongs later - on the page, on the call, in the proposal.

# 6. What the large-sample ad data says

Optmyzr, 22,000+ accounts spending $1,500+/month, 1,000,000+ ads, published September 2024. (b) The most useful part is how much of it contradicts standard advice:

- **Sentence case beat title case** on CPA, conversion rate and ROAS. Accounts at 0% title case outperformed those at 75-100%. Title case showed no CTR advantage
- **Shorter beat longer.** Headlines under 30 characters had better CPA and CTR. Descriptions performed best at 51-60 characters, not maxed out
- **"Average" Ad Strength had the best CPA, conversion rate and ROAS.** No meaningful CTR difference across Ad Strength labels. Ad Strength is feedback, not a KPI
- **Some pinning beat no pinning and beat full pinning.** Partial pinning had the best CPA and ROAS; fully pinned ads had better CTR but worse conversions

**The through-line:** filling every character and satisfying every Google prompt optimises for the wrong thing. Write the shortest true sentence that answers a fear.

---

# 7. The click is not the job · message match

**The most exploitable finding in paid search, and it is a copy problem, not a design problem.**

- Message match produced a **212.74%** conversion lift and a **69.39%** cost-per-conversion drop in the Disruptive Advertising case published on Moz (b)
- KlientBoost recorded a **66%** lift from aligning ad copy to the landing page headline alone, with no change to offer, targeting or creative (b)
- 2026 benchmark data: CTR rose 7.49% while conversion rates fell in 13 of 14 industries. **High CTR with low conversion rate is now the default pattern, and it is a landing page problem** (b)
- Mobile is 65% of clicks and 47% of conversions. That gap is almost entirely the page (b)

**The rule:** the promise in the headline appears, in the same words, above the fold on the page. Not a synonym. The same words. If the ad says "live in 8 weeks" the page says "live in 8 weeks".

---

# 8. Social proof, and which persuasion principles survived replication

Worth knowing which of Cialdini's principles you can lean on and which are folklore. (d)

- **Social proof is the strongest.** Bond's (2005) meta-analysis across 125 Asch-type studies found a weighted effect of d = 0.89, a large effect. Franzen and Mader (2023) replicated at essentially the original rate. This one holds
- **Liking has surprisingly little compliance-specific testing.** Do not build an ad strategy on it
- **Unity, the seventh principle, lacks independent testing** to evaluate at all
- **Scarcity and urgency are real but oversold.** Reported lifts of 15-25% in ecommerce, but the effect collapses when the audience stops believing the deadline, and it trades against trust. **On a local service business almost every urgency claim is either false or already true** - "24/7" is a fact, "only 2 slots left" for a plumber is a lie

**The practical read:** reach for proof and specificity first. Reach for urgency only when the deadline is real.

---

# 9. The line you cannot cross

Persuasion stops where substantiation ends, and Google enforces this. (a)

- **Superlatives need evidence on the page.** "#1", "best", "lowest price" without substantiation is the unreliable-claims policy
- **A guarantee of results requires a clear, accessible refund policy.** A delivery guarantee is different from a results guarantee - do not blur them
- **Testimonials implying typical results need a visible disclaimer** or third-party verification. A number in a testimonial reads as what everyone gets, to Google and to the FTC
- **The ad may only repeat wording the landing page actually carries.** This is why a site saying two different things about the same guarantee blocks the whole angle

**The repo rule this feeds:** if it is not in `context/proof.md`, it does not go in an ad. Persuasion technique is never a licence to write a claim you cannot source.

---

# 10. The writing loop

1. **Read the keyword and place it on the awareness ladder** (section 1). That decides what the headline is allowed to assume
2. **Pick the fear** (section 4) that nobody in the swipe file answers
3. **Find the proof** in `context/proof.md` that kills it, with its number and date (section 3)
4. **Write the shortest true sentence** that does both, in the customer's words, sentence case, under 30 characters where you can (sections 5, 6)
5. **Check the page says the same thing** in the same words (section 7)
6. **Check it against policy** (section 9), then run the three gates in `/write-ads`

**The one-sentence version:** say a specific true thing that answers what they are afraid of, in the words they used, and make the page repeat it.

---

# 11. What this file deliberately does not do

- **It does not score lines out of 10.** Numeric scoring was dropped on 29 August 2026 - it converges every line into the same shape. The cull is the three gates in `/write-ads`
- **It does not supply copy.** Every claim comes from `context/proof.md`. This file governs the shape of a sentence, never its content
- **It does not cover format.** Character limits, pinning, keyword insertion and the rejection list live in `references/google-ads.md`
- **It does not replace testing.** Everything here is a prior, not a result. `references/ad-testing.md` owns what actually beat what in this account
