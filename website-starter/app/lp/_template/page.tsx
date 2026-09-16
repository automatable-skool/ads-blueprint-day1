// ⛔ THE LANDING PAGE TEMPLATE. COPY THIS FILE. DO NOT REDESIGN IT.
//
// Jono, 2 September 2026: "I want the landing page skill to build this exact page, no yoloing.
// Then people fill in their stuff from here."
//
// /landing-page copies this file to app/lp/<ad-group-slug>/page.tsx and changes NOTHING but the
// words, the photos and the numbers. Every section, its order, its layout and its component is
// already decided. There is no design pass, no "improved" section order and no new component.
//
// Built on the Mainstay design system (design/mainstay). Figtree, warm neutral ramp, clay accent,
// white and n-50 as the only two page grounds. The theme layer is app/mainstay.css.
//
// WHAT YOU CHANGE, and nothing else:
//   BUSINESS, PHONE          - the business name and the number it answers
//   every [SQUARE BRACKET]   - copy waiting for this business's words
//   photo(...) keywords      - or a real src once the business supplies photography
//   the FAQ entries          - the real reasons this business's buyers do not enquire
//
// ⛔ WHAT YOU MAY NEVER DO:
//   - invent a rating, a review count, a client count, a result or a years-in-business figure.
//     Every number here must exist in context/proof.md first. Delete the slot instead.
//   - put a stock face beside a real client's name or a real number. That is a fabricated person.
//   - add, remove or reorder a section without the owner saying so.
import type { Metadata } from "next";
import "@/app/mainstay.css";
import { SourceCapture } from "@/components/lp/SourceCapture";
import { CalmLeadForm, CalmCallLink } from "@/components/lp/CalmLeadForm";
import { MobileCtaBar } from "@/components/lp/Sections";
import { Icon } from "@/components/kit/Icon";
import { City } from "@/components/lp/City";
import { founderPoster, photo, portrait } from "@/lib/placeholders";
import {
  SectionHeading, TrustBar, Stars, StatBlock, TestimonialCard,
  FAQItem, CTABanner, Figure,
} from "@/components/kit/Mainstay";
import { AvatarCluster, ProcessSteps, CtaBlock } from "@/components/kit/Marketing";

export const metadata: Metadata = {
  title: "[Ad group service] in [Main city]",
  description:
    "[One sentence: what you do, for whom, and the guarantee from context/proof.md.]",
  robots: { index: false, follow: false },
};

const BUSINESS = "[Business name]";
// The fallback for <City>. It is MAIN_CITY from .env / context/business.md - the same string the
// ads use in {LOCATION(City):fallback}. Google fails to resolve a location on a large share of
// clicks, so this is the version most visitors read. Never "your area", never a guess.
// MAIN_CITY=none (remote or national): delete the <City> tag and write the H1 without a place.
const MAIN_CITY = "[Main city]";
const PHONE = "[+1 555 555 5555]";
// The response-time CLAIM, printed under every button. True for this business and in context/proof.md, or delete it.
const RESPONSE_TIME = "[response time, from proof.md]";

// Client marks stay distinct by GLYPH, never by a hue the kit does not ship.
const MARK_INK = ["var(--ink-700)", "var(--text-brand)", "var(--ink-500)", "var(--ink-800)", "var(--surface-brand)", "var(--ink-600)"];

const btn = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
  minHeight: "var(--control-h-lg)", padding: "0 var(--space-7)", borderRadius: "var(--radius-pill)",
  font: "var(--type-button)", textDecoration: "none", cursor: "pointer",
} as const;

const primary = { ...btn, background: "var(--surface-brand)", color: "var(--text-inverse)", border: "var(--border-hairline) solid transparent" };
const secondary = { ...btn, background: "var(--surface-card)", color: "var(--text-strong)", border: "var(--border-hairline) solid var(--line-strong)" };

/** Section header: eyebrow + h2 on the left, anything else pushed right. The calm kit's pattern. */
/** Mainstay's SectionHeading, with the optional right-hand slot this page needs. */
function Head({ eyebrow, title, lead, aside }: { eyebrow: string; title: string; lead?: string; aside?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-7)", marginBottom: "var(--space-9)", flexWrap: "wrap" }}>
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
      {aside && <div style={{ marginLeft: "auto" }}>{aside}</div>}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <SourceCapture />
      <main className="mainstay" style={{ background: "var(--surface-page)", color: "var(--text-body)" }}>

        {/* Business name and phone as plain content. No nav - this is an ad page. */}
        <div className="gw-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", padding: "var(--space-7) 0" }}>
          <span style={{ font: "var(--type-h4)", color: "var(--text-strong)" }}>{BUSINESS}</span>
          <CalmCallLink phone={PHONE} style={{ ...secondary, minHeight: "var(--control-h)" }} />
        </div>

        {/* 2 · Hero - centred, then one wide photo. The calm style's signature. */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container" style={{ display: "grid", gap: "var(--space-8)", justifyItems: "center", textAlign: "center", maxWidth: "880px" }}>
            {/* The eyebrow opens on the reader's problem, not our service list. An uppercase label is
                the wrong shape for a sentence, so this one is sentence case at body size and keeps
                only the brand colour. (Jono, 2 September 2026.) */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", font: "var(--type-body-lg)", color: "var(--text-brand)" }}>
              <Icon name="search" size={18} color="var(--text-brand)" />
              [The question your buyer is already asking, in their words]
            </span>
            <h1 style={{ font: "var(--type-display-xl)", letterSpacing: "var(--track-display)", color: "var(--text-strong)", margin: 0, maxWidth: "20ch" }}>
              [The promise, in the words of the ad] in <City fallback={MAIN_CITY} />
            </h1>
            <p style={{ font: "var(--type-body-lg)", color: "var(--text-muted)", margin: 0, maxWidth: "52ch" }}>
              [One sentence: what you do, and the guarantee. Plain, no adjectives you cannot evidence.]
            </p>
            <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
              <a href="#lead-form" className="ms-btn ms-btn--primary" data-l>[Primary action, e.g. Get my free quote] <Icon name="arrow-right" size={17} /></a>
              <CalmCallLink phone={PHONE} className="ms-btn ms-btn--outline" />
            </div>
            {/* Three proof points under the promise - blueprint component 2.
                ⛔ Each one must exist in context/proof.md with a source. No proof for a slot?
                Delete the slot - never soften it into something plausible. */}
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-7)", justifyContent: "center", margin: 0, padding: 0, listStyle: "none" }}>
              {[
                ["shield-check", "[The guarantee, word for word from proof.md]"],
                ["clock", "[Years in business or since-year, from proof.md]"],
                ["users", "[A count - jobs, customers or reviews - from proof.md]"],
              ].map(([icon, text]) => (
                <li key={text} style={{ display: "inline-flex", alignItems: "center", gap: "8px", font: "var(--type-body-sm)", color: "var(--text-body)" }}>
                  <Icon name={icon} size={17} color="var(--text-brand)" />{text}
                </li>
              ))}
            </ul>

            {/* ⛔ A rating is a CLAIM. Add rating="4.9" ONLY as the real platform score and count from
                context/proof.md. No review platform on file? Leave the rating off and keep the label. */}
            <AvatarCluster people={["AB", "CD", "EF", "GH"]} label="[Who it is for, in one line]" style={{ marginTop: "var(--space-2)" }} />

          </div>
          {/* The founder, on camera, directly under the promise. Full width - the face is the
              strongest element on the page and a 900px cap wasted the first screen.
              A randomuser portrait is 512px and went soft at this size, so the frame pulls a
              full-resolution photograph instead. (Jono, 2 September 2026.) */}
          <div className="gw-container" style={{ marginTop: "var(--space-9)" }}>
            <Figure ratio="16 / 9" label="Founder video · 30-60 seconds"
              src={photo("businessman,office", 1600, 900, 147)}>
              <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                <span style={{ width: 88, height: 88, borderRadius: "50%", background: "var(--surface-card)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-lg)" }}>
                  <Icon name="play" size={30} color="var(--text-strong)" style={{ fill: "var(--text-strong)", marginLeft: 4 }} />
                </span>
              </span>
            </Figure>
          </div>
        </section>

        {/* Client logos - six marks, distinct by glyph, coloured only from the kit's ramps.
            Real logos replace these one at a time as client permission comes in. */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--surface-tint)" }}>
          <div className="gw-container" style={{ display: "grid", gap: "var(--space-5)", justifyItems: "center" }}>
            <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>Trusted by</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-9)", alignItems: "center", justifyContent: "center" }}>
              {[
                ["Northline", "square"], ["Harbour & Co", "circle"], ["Vantage", "chevron"],
                ["Ridgeway", "square"], ["Copperfield", "circle"], ["Meridian", "chevron"],
              ].map(([name, shape], i) => (
                <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: "9px", color: MARK_INK[i % MARK_INK.length] }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
                    {shape === "square" && <rect x="3.5" y="3.5" width="17" height="17" rx="4" />}
                    {shape === "circle" && <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></>}
                    {shape === "chevron" && <path d="M4 17l8-11 8 11" strokeLinecap="round" strokeLinejoin="round" />}
                  </svg>
                  <span style={{ font: "var(--type-h4)", letterSpacing: "-0.02em" }}>{name}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · Selected work - the portfolio is the pitch. Four 3:4 frames. */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container">
            <Head eyebrow="Selected work" title="[Recent jobs, in four photos]" />
            <div className="lp-4up" style={{ display: "grid", gap: "var(--space-7)" }}>
              {[
                ["[Job one · before]", "office"],
                ["[Job one · after]", "laptop"],
                ["[Job two]", "meeting"],
                ["[Job three]", "desk"],
              ].map(([l, kw], i) => (
                <Figure key={l} ratio="3 / 4" label={l} src={photo(kw, 600, 800, 110 + i)} />
              ))}
            </div>
            <CtaBlock responseTime={RESPONSE_TIME} />
          </div>
        </section>

        {/* 5 · Video testimonials - nine, the blueprint's number. Each a labelled frame. */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container">
            <Head eyebrow="Watch them say it" title="Nine clients, unscripted" />
            <div className="lp-3up" style={{ display: "grid", gap: "var(--space-7)" }}>
              {Array.from({ length: 9 }, (_, i) => (
                <Figure key={i} ratio="4 / 3" label={`Client video ${i + 1}`} src={portrait(i + 11)}
                  style={{ background: "var(--ink-100)" }}>
                  <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                    <span style={{ width: 58, height: 58, borderRadius: "50%", background: "var(--surface-card)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-md)" }}>
                      <Icon name="play" size={20} color="var(--text-strong)" style={{ fill: "var(--text-strong)", marginLeft: 2 }} />
                    </span>
                  </span>
                </Figure>
              ))}
            </div>
            <CtaBlock responseTime={RESPONSE_TIME} />
          </div>
        </section>

        {/* 3 · Featured in - wordmarks and PUBLIC numbers only (a platform count anyone can check). No invented press. */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container" style={{ display: "grid", gap: "var(--space-6)", justifyItems: "center" }}>
            <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>Where the record is public</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-9)", justifyContent: "center" }}>
              {["[Public number one]", "[Public number two]", "[Public number three]"].map((l) => (
                <span key={l} style={{ font: "var(--weight-bold) 17px/1 var(--font-core)", letterSpacing: "-0.02em", color: "var(--ink-600)" }}>{l}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 6 · Process - tall photo beside the steps. */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container lp-2up-media lp-flip" style={{ display: "grid", gap: "var(--space-10)", alignItems: "center" }}>
            <Figure ratio="4 / 5" label="The build, in your account" src={photo("workspace,screen", 800, 1000, 130)} />
            <div style={{ display: "grid", gap: "var(--space-6)" }}>
              <div style={{ display: "grid", gap: "var(--space-4)" }}>
                <span className="ms-sh__eyebrow">How it works</span>
                <h2 style={{ margin: 0, font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-strong)" }}>Four steps, and the first costs nothing</h2>
              </div>
              <ProcessSteps steps={[
                { title: "[Step one - the free first step]", body: "[What happens and how fast, one line]" },
                { title: "[Step two]", body: "[One line]" },
                { title: "[Step three - the work]", body: "[One line]" },
                { title: "[Step four - what they are left with]", body: "[One line]" },
              ]} />
              <CtaBlock responseTime={RESPONSE_TIME} />
            </div>
          </div>
        </section>

        {/* What you get - two columns: a photo, and what the build actually contains.
            It was a four-card grid, which read as four separate products rather than one build. */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container lp-2up-media" style={{ display: "grid", gap: "var(--space-12)", alignItems: "center" }}>
            <Figure ratio="4 / 5" label="The build, in your account" src={photo("workspace,screen", 800, 1000, 130)} />
            <div style={{ display: "grid", gap: "var(--space-7)" }}>
              <div style={{ display: "grid", gap: "var(--space-4)" }}>
                <span className="ms-sh__eyebrow">What you get</span>
                <h2 style={{ margin: 0, font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-strong)" }}>
                  [What you get, as a headline]
                </h2>
                <p style={{ margin: 0, font: "var(--type-body-lg)", color: "var(--text-muted)" }}>
                  [One line on why it comes as a package]
                </p>
              </div>
              <div style={{ display: "grid", gap: "var(--space-6)" }}>
                {[
                  { icon: "circle-check", title: "[Included item one]", body: "[One line]" },
                  { icon: "circle-check", title: "[Included item two]", body: "[One line]" },
                  { icon: "circle-check", title: "[Included item three]", body: "[One line]" },
                                ].map((c) => (
                  <div key={c.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-5)", alignItems: "start" }}>
                    <span style={{ width: 38, height: 38, borderRadius: "var(--radius-sm)", background: "var(--surface-sunken)", display: "grid", placeItems: "center", flex: "0 0 auto" }}>
                      <Icon name={c.icon} size={19} color="var(--text-brand)" />
                    </span>
                    <span style={{ display: "grid", gap: "4px" }}>
                      <strong style={{ font: "var(--type-h4)", color: "var(--text-strong)" }}>{c.title}</strong>
                      <span style={{ font: "var(--type-body)", color: "var(--text-body)" }}>{c.body}</span>
                    </span>
                  </div>
                ))}
              </div>
              <CtaBlock responseTime={RESPONSE_TIME} />
            </div>
          </div>
        </section>

        {/* 7 · Kind words - THE ONE TINTED BAND. --surface-sunken, never blue tint. */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--surface-sunken)" }}>
          <div className="gw-container">
            <Head eyebrow="Kind words" title="What clients said afterwards"
              aside={<StatBlock stats={[
                { value: "[number]", label: "[what it measures, from proof.md]" },
                { value: "[number]", label: "[what it measures, from proof.md]" },
              ]} />} />
            <div className="lp-3up" style={{ display: "grid", gap: "var(--space-7)" }}>
              <TestimonialCard rating={5} quote="[Review one, word for word from context/proof/reviews/quote-bank.md]" name="[Reviewer]" meta="[What they hired you for · the platform it is on]" />
              <TestimonialCard rating={5} quote="[Review two, word for word]" name="[Reviewer]" meta="[What they hired you for · the platform it is on]" />
              <TestimonialCard rating={5} quote="[Review three, word for word]" name="[Reviewer]" meta="[What they hired you for · the platform it is on]" />
            </div>
            <CtaBlock responseTime={RESPONSE_TIME} />
          </div>
        </section>

        {/* 8 · Real results - two case studies from proof.md, labelled as exactly what they are. */}
        <section style={{ padding: "var(--section-y) 0", background: "var(--surface-brand)" }}>
          <div className="gw-container">
            <Head eyebrow="Case studies" title="Two builds, and what they saved" />
            <div className="lp-2up" style={{ display: "grid", gap: "var(--space-7)" }}>
              {[
                { who: "[Client one - type, city]", name: "[Client name]", face: portrait(2), num: "[Result number]", per: "[what it measures, e.g. saved a year]",
                  body: "[The problem they came with, one line]",
                  marks: ["[Outcome one, from proof.md]", "[Outcome two, from proof.md]"] },
                { who: "[Client two - type, city]", name: "[Client name]", face: portrait(9), num: "[Result number]", per: "[what it measures]",
                  body: "[The problem they came with, one line]",
                  marks: ["[Outcome one, from proof.md]", "[Outcome two, from proof.md]"] },
              ].map((c) => (
                <article key={c.who} style={{ display: "grid", gap: "var(--space-6)", padding: "var(--space-8)", background: "var(--surface-card)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-lg)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-4)", flexWrap: "wrap" }}>
                    <strong style={{ font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-brand)" }}>{c.num}</strong>
                    <span style={{ font: "var(--type-h4)", color: "var(--text-muted)" }}>{c.per}</span>
                  </div>
                  <p style={{ margin: 0, font: "var(--type-body-lg)", color: "var(--text-body)" }}>{c.body}</p>
                  <ul style={{ display: "grid", gap: "10px", margin: 0, padding: 0, listStyle: "none" }}>
                    {c.marks.map((m) => (
                      <li key={m} style={{ display: "flex", gap: "10px", alignItems: "center", font: "var(--type-body-sm)", color: "var(--text-body)" }}>
                        <Icon name="circle-check" size={17} color="var(--text-brand)" />{m}
                      </li>
                    ))}
                  </ul>
                  <Figure ratio="16 / 9" label={`${c.who} · on camera`} src={c.face}>
                    <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                      <span style={{ width: 58, height: 58, borderRadius: "50%", background: "var(--surface-card)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-md)" }}>
                        <Icon name="play" size={20} color="var(--text-strong)" style={{ fill: "var(--text-strong)", marginLeft: 2 }} />
                      </span>
                    </span>
                  </Figure>
                  {/* Attribution: who said it, then the disclaimer as its own quiet line.
                      Both were stacked as one block and read like fine print nobody would trust. */}
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", borderTop: "var(--border-hairline) solid var(--line-hairline)", paddingTop: "var(--space-6)" }}>
                    <span style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", background: `center/cover url(${c.face})` }} />
                    <span style={{ display: "grid", gap: "1px" }}>
                      <strong style={{ font: "var(--type-h4)", color: "var(--text-strong)" }}>{c.name}</strong>
                      <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>{c.who}</span>
                    </span>
                    <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "6px", font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-faint)" }}>
                      <Icon name="badge-check" size={14} color="var(--text-faint)" />Paying client
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <p style={{ margin: "var(--space-7) 0 0", font: "var(--type-body-sm)", color: "var(--blue-100)", maxWidth: "var(--container-text)" }}>
              [What kind of results these are, honestly - e.g. two paying clients, not an average]. Results vary and are not typical.
            </p>
            <CtaBlock responseTime={RESPONSE_TIME} tone="on-brand" />
          </div>
        </section>

        {/* 10 · The close. The form sits in a card with the reassurance beside it - the numbered
            steps that were here read as a second How-it-works and buried the form. */}
        <section id="lead-form" style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container lp-2up-form" style={{ display: "grid", gap: "var(--space-12)", alignItems: "start" }}>
            <div style={{ display: "grid", gap: "var(--space-6)" }}>
              <span className="ms-sh__eyebrow">[The free first step]</span>
              <h2 style={{ margin: 0, font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-strong)", maxWidth: "14ch" }}>
                [The close - what they get, in the words of the ad]
              </h2>
              <p style={{ margin: 0, font: "var(--type-body-lg)", color: "var(--text-muted)", maxWidth: "var(--container-text)" }}>
                [What happens after they send the form, and how fast. One sentence.]
              </p>
              <TrustBar items={["[Trust line one]", "[Trust line two]", "[The guarantee, from proof.md]"]} />
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "var(--border-hairline) solid var(--line-hairline)" }}>
                <AvatarCluster people={["AB", "CD", "EF"]} size={30} label={`Average response time: ${RESPONSE_TIME}`} />
              </div>
            </div>
            <div style={{ padding: "var(--space-9)", background: "var(--surface-card)", border: "var(--border-hairline) solid var(--line-hairline)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-md)" }}>
              <CalmLeadForm business={BUSINESS} phone={PHONE} page="/lp/[ad-group-slug]" />
            </div>
          </div>
        </section>

        {/* 9 · Questions - FAQ beside the coverage chips. */}
        <section style={{ padding: "var(--section-y) 0" }}>
          <div className="gw-container lp-2up-faq" style={{ display: "grid", gap: "var(--space-10)", alignItems: "start" }}>
            <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "start" }}>
              <span className="ms-sh__eyebrow">Questions</span>
              <h2 style={{ margin: 0, font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-strong)" }}>Before you enquire</h2>
              <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>
                Anything not covered here, ask on the call. We answer properly, not with a template.
              </p>
            </div>
            <div>
              {[
                { question: "[The objection buyers raise most, in their words]", answer: "[The honest answer, two sentences at most]" },
                { question: "[What does it cost?]", answer: "[The price or range from context/business.md - or exactly how they get one]" },
                { question: "[Objection three]", answer: "[Honest answer]" },
                { question: "[Objection four]", answer: "[Honest answer]" },
                { question: "[Objection five]", answer: "[Honest answer]" },
              ].map((q, i) => <FAQItem key={q.question} {...q} defaultOpen={i === 0} />)}
            </div>
          </div>
        </section>

        {/* The legal line, and nothing after it. */}
        <div className="gw-container" style={{ padding: "var(--space-8) 0 var(--space-12)", borderTop: "var(--border-hairline) solid var(--line-hairline)", display: "flex", gap: "var(--space-5)", flexWrap: "wrap", justifyContent: "space-between" }}>
          <span style={{ font: "var(--type-caption)", color: "var(--text-faint)" }}>
            {BUSINESS} · [legal entity] · [registered address]
          </span>
          <span style={{ display: "flex", gap: "var(--space-5)" }}>
            <a href="/privacy-policy" style={{ font: "var(--type-caption)", color: "var(--text-muted)" }}>Privacy</a>
            <a href="/terms" style={{ font: "var(--type-caption)", color: "var(--text-muted)" }}>Terms</a>
          </span>
        </div>
      </main>
      <MobileCtaBar phone={PHONE} label="[Action]" />
    </>
  );
}
