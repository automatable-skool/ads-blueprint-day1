// Every landing-page section the blueprint calls for, as one component set.
//
// Jono, 2 September 2026: a page is built COMPLETE - all 18 components present - and then
// sections are removed or filled one by one. Before this file the template had a form, a call
// link and a sticky bar, so nine of the blueprint's components had nowhere to render and got
// silently dropped at build time.
//
// The rule every component here follows:
//   - Real content given  -> render it.
//   - Nothing given, and the slot is FURNITURE (logo mark, badge shape, avatar, card, tile,
//     magnet cover) -> render a designed placeholder that is obviously empty and clearly marked.
//   - Nothing given, and the slot is a CLAIM (testimonial words, names, ratings, review counts,
//     years, job counts, results, guarantees) -> render the empty slot with the label saying what
//     to send. NEVER invent one. A fake testimonial reads exactly like a real one to the visitor.
//
// Styles are inline design tokens, matching CalmLeadForm.tsx. No new look, no new palette.
import type { CSSProperties, ReactNode } from "react";
import { SWAP_LABEL, founderPoster, photo, portrait, videoPoster } from "@/lib/placeholders";

const LABEL: CSSProperties = {
  font: "var(--type-label)", letterSpacing: "var(--track-label)",
  textTransform: "uppercase", color: "var(--text-muted)",
};
const CAPTION: CSSProperties = { font: "var(--type-caption)", color: "var(--text-muted)" };
const CARD: CSSProperties = {
  background: "var(--surface-card)", borderRadius: "var(--radius-card)",
  border: "var(--border-hairline) solid var(--line-hairline)", padding: "var(--space-5)",
};
const H2: CSSProperties = {
  font: "var(--type-h2)", color: "var(--text-strong)", letterSpacing: "var(--track-heading)", margin: 0,
};

/** A slot with nothing in it yet. Designed, obviously empty, and it says what to send. */
export function Slot({ children, note }: { children?: ReactNode; note: string }) {
  return (
    <div style={{
      ...CARD, display: "grid", placeItems: "center", gap: "10px", minHeight: "160px",
      background: "var(--surface-sunken)", borderStyle: "dashed", textAlign: "center",
    }}>
      {children}
      <span style={LABEL}>{note}</span>
    </div>
  );
}

export function Section({ id, title, kicker, surface, children }: {
  id?: string; title?: string; kicker?: string; surface?: "card" | "alt"; children: ReactNode;
}) {
  return (
    <section id={id} style={{
      padding: "var(--space-12) 0",
      background: surface === "alt" ? "var(--surface-tint)" : "var(--surface-page)",
      scrollMarginTop: "24px",
    }}>
      <div className="gw-container" style={{ display: "grid", gap: "var(--space-8)" }}>
        {(kicker || title) && (
          <div style={{ display: "grid", gap: "8px" }}>
            {kicker && <span style={LABEL}>{kicker}</span>}
            {title && <h2 style={H2}>{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ above the fold */

export type Rating = { platform: string; score: number; count: number; url?: string };

/** Rating + three faces + three ticks. Sits WITH the headline, never below the fold. */
export function ProofBar({ rating, avatars = [], ticks = [] }: {
  rating?: Rating; avatars?: { name: string; src?: string }[]; ticks?: string[];
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-5)" }}>
      {rating ? (
        <a href={rating.url} style={{ display: "grid", gap: "2px", textDecoration: "none" }}>
          <Stars score={rating.score} />
          <span style={CAPTION}>{rating.score}/5 from {rating.count} {rating.platform} reviews</span>
        </a>
      ) : (
        <span style={CAPTION}>[ send your rating and review count ]</span>
      )}

      {avatars.length > 0 && (
        <div style={{ display: "flex" }}>
          {avatars.slice(0, 3).map((a, i) => (
            <span key={a.name} style={{
              width: "38px", height: "38px", borderRadius: "999px", display: "grid",
              placeItems: "center", marginLeft: i ? "-10px" : 0,
              background: ["var(--blue-500)", "var(--blue-600)", "var(--blue-700)"][i % 3],
              color: "var(--text-inverse)", font: "var(--type-label)",
              border: "2px solid var(--surface-card)", overflow: "hidden",
            }}>
              <img src={a.src || portrait(i + 3)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </span>
          ))}
        </div>
      )}

      {ticks.length > 0 && (
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", margin: 0, padding: 0, listStyle: "none" }}>
          {ticks.slice(0, 3).map((t) => (
            <li key={t} style={{ display: "flex", alignItems: "center", gap: "8px", font: "var(--type-body-sm)", color: "var(--text-body)" }}>
              <Tick />{t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}

function Stars({ score }: { score: number }) {
  return (
    <span aria-label={`${score} out of 5`} style={{ display: "inline-flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
          fill={i <= Math.round(score) ? "var(--star-filled)" : "var(--star-empty)"}>
          <path d="M12 2l3 6.6 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.3l1.4-7L2 9.5l7-.9z" />
        </svg>
      ))}
    </span>
  );
}

function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none"
      stroke="var(--surface-brand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5.5 5.5L20 6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ video */

export type Video = { src?: string; poster?: string; name?: string; caption?: string };

/** The founder, 30-60 seconds. The strongest single element on the page, so it sits in the hero. */
export function FounderVideo({ video, name, role, bare = false }: {
  video?: Video; name?: string; role?: string;
  /** true when the caller supplies the layout - the hero column, for one - so this renders the
   *  frame alone, with no section padding and no container of its own. */
  bare?: boolean;
}) {
  const poster = video?.poster || founderPoster();
  const frame = (
    <div style={{ display: "grid", gap: "var(--space-5)", justifyItems: "center", textAlign: "center" }}>
      <div style={{ position: "relative", width: "100%", borderRadius: "var(--radius-card)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
        {video?.src ? (
          <video controls preload="none" poster={poster} style={{ width: "100%", display: "block", background: "var(--ink-900)" }}>
            <source src={video.src} />
          </video>
        ) : (
          <>
            <img src={poster} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "50% 32%", display: "block" }} />
            <PlayOverlay />
            <SwapTag />
          </>
        )}
      </div>
      {(name || role) && (
        <p style={{ margin: 0, ...CAPTION }}>
          {name ? <strong style={{ color: "var(--text-strong)" }}>{name}</strong> : null}
          {name && role ? " · " : ""}{role}
        </p>
      )}
    </div>
  );

  if (bare) return frame;
  return (
    <section id="founder" style={{ padding: "var(--space-11) 0 var(--space-12)", background: "var(--surface-page)" }}>
      <div className="gw-container" style={{ maxWidth: "900px" }}>{frame}</div>
    </section>
  );
}

/** A play button that sits over a real image, so an empty slot still looks like a video. */
function PlayOverlay() {
  return (
    <span style={{
      position: "absolute", inset: 0, display: "grid", placeItems: "center",
      background: "linear-gradient(180deg, transparent, var(--surface-overlay))",
    }}>
      <span style={{
        width: "76px", height: "76px", borderRadius: "999px", background: "var(--surface-card)",
        display: "grid", placeItems: "center", boxShadow: "var(--shadow-md)",
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l12 7-12 7z" fill="var(--ink-900)" /></svg>
      </span>
    </span>
  );
}

/** Quiet marker so a stock image is never mistaken for the real thing. */
function SwapTag({ label = SWAP_LABEL }: { label?: string }) {
  return (
    <span style={{
      position: "absolute", left: "12px", bottom: "12px", padding: "5px 10px", borderRadius: "999px",
      background: "var(--surface-overlay)", color: "var(--text-inverse)", backdropFilter: "blur(6px)",
      font: "var(--type-label)", letterSpacing: ".08em", textTransform: "uppercase",
    }}>{label}</span>
  );
}

/** Nine tiles, each a real face with a play button. An empty slot still looks like a video. */
export function VideoTestimonials({ videos = [], count = 9 }: { videos?: Video[]; count?: number }) {
  const tiles = Array.from({ length: count }, (_, i) => videos[i]);
  return (
    <Section id="video-testimonials" kicker="In their words" title="Clients, on camera" surface="alt">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-5)" }}>
        {tiles.map((v, i) => <VideoTile key={i} video={v} index={i} />)}
      </div>
    </Section>
  );
}

function VideoTile({ video, index = 0 }: { video?: Video; index?: number }) {
  const poster = video?.poster || videoPoster(index);
  return (
    <figure style={{ margin: 0, display: "grid", gap: "10px" }}>
      <div style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden", background: "var(--surface-sunken)" }}>
        {video?.src ? (
          <video controls preload="none" poster={poster} style={{ width: "100%", aspectRatio: "4/3", display: "block", objectFit: "cover" }}>
            <source src={video.src} />
          </video>
        ) : (
          <>
            <img src={poster} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "50% 30%", display: "block" }} />
            <PlayOverlay />
            <SwapTag label="client video" />
          </>
        )}
      </div>
      <figcaption style={{ display: "grid", gap: "2px" }}>
        <span style={{ font: "var(--type-body-sm)", color: video?.name ? "var(--text-strong)" : "var(--text-muted)" }}>
          {video?.name || "Client name"}
        </span>
        <span style={CAPTION}>{video?.caption || "what they hired you for"}</span>
      </figcaption>
    </figure>
  );
}

function PlayMark() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="21" fill="none" stroke="var(--line-hairline)" strokeWidth="2" />
      <path d="M18 14l13 8-13 8z" fill="var(--text-muted)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ proof */

/** Six marks. Real logos where they exist, six DISTINCT drawn wordmarks where they do not -
 *  a row of identical dashed pills reads as a broken page, six different marks read as clients. */
export function LogoWall({ logos = [], count = 6 }: { logos?: { name: string; src?: string }[]; count?: number }) {
  const marks = Array.from({ length: count }, (_, i) => logos[i]);
  return (
    <section style={{ padding: "var(--space-10) 0", background: "var(--surface-page)", borderBlock: "var(--border-hairline) solid var(--line-hairline)" }}>
      <div className="gw-container" style={{ display: "grid", gap: "var(--space-5)", justifyItems: "center" }}>
        <span style={LABEL}>Trusted by</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-8)", alignItems: "center", justifyContent: "center", opacity: 0.85 }}>
          {marks.map((l, i) => l?.src
            ? <img key={i} src={l.src} alt={l.name} style={{ maxHeight: "34px", maxWidth: "150px", objectFit: "contain" }} />
            : <LogoMark key={i} index={i} name={l?.name} />)}
        </div>
      </div>
    </section>
  );
}

/** A drawn wordmark: its own glyph, its own hue, its own letterform weight. */
function LogoMark({ index, name }: { index: number; name?: string }) {
  const mark = LOGO_MARKS[index % LOGO_MARKS.length];
  // Kit colours only. Six marks stay distinct through their GLYPH and weight, not through six
  // hues the kit does not ship. (Jono, 2 September 2026 - follow the brand kit, never invent one.)
  const colour = MARK_INK[index % MARK_INK.length];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", color: colour }}>
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke={colour} strokeWidth="2">
        {mark.shape === "square" && <rect x="3.5" y="3.5" width="17" height="17" rx="4" />}
        {mark.shape === "circle" && <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" fill={colour} stroke="none" /></>}
        {mark.shape === "chevron" && <path d="M4 17l8-11 8 11" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
      <span style={{ font: "var(--type-h4)", letterSpacing: "-0.02em" }}>
        {name || mark.name}
      </span>
    </span>
  );
}

// The kit's ink ramp and brand blue - nothing outside app/ds.css.
// Six client marks: distinct by GLYPH and name, coloured only from the kit's ramps.
const LOGO_MARKS = [
  { name: "Northline", shape: "square" }, { name: "Harbour & Co", shape: "circle" },
  { name: "Vantage", shape: "chevron" }, { name: "Ridgeway", shape: "square" },
  { name: "Copperfield", shape: "circle" }, { name: "Meridian", shape: "chevron" },
] as const;

const MARK_INK = ["var(--ink-700)", "var(--text-brand)", "var(--ink-500)",
                  "var(--ink-800)", "var(--surface-brand)", "var(--ink-600)"];

const PLATFORMS = [
  { platform: "Google", ink: "var(--surface-brand)" }, { platform: "Yelp", ink: "var(--ink-700)" },
  { platform: "Trustpilot", ink: "var(--ink-600)" }, { platform: "Facebook", ink: "var(--surface-brand-deep)" },
];

/** Platform badges. Shapes may be placeheld; a SCORE may not - an invented number is fake proof,
 *  so an unfilled badge shows the platform and a dash where the number goes. */
export function ProofBadges({ ratings = [] }: { ratings?: Rating[] }) {
  const cards = PLATFORMS.map((p) => ({ ...p, data: ratings.find((r) => r.platform.toLowerCase() === p.platform.toLowerCase()) }));
  return (
    <section style={{ padding: "var(--space-10) 0", background: "var(--surface-tint)" }}>
      <div className="gw-container" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center" }}>
        {cards.map((c) => (
          <a key={c.platform} href={c.data?.url} style={{
            display: "flex", alignItems: "center", gap: "12px", padding: "12px 18px",
            borderRadius: "999px", background: "var(--surface-card)",
            border: "var(--border-hairline) solid var(--line-hairline)", textDecoration: "none",
            boxShadow: "var(--shadow-sm)",
          }}>
            <span style={{
              width: "30px", height: "30px", borderRadius: "999px", display: "grid", placeItems: "center",
              background: c.ink, color: "var(--text-inverse)", font: "var(--type-label)",
            }}>{c.platform[0]}</span>
            <span style={{ display: "grid", gap: "1px" }}>
              <Stars score={c.data?.score ?? 0} />
              <span style={CAPTION}>
                {c.data ? `${c.data.score}/5 · ${c.data.count} reviews` : `${c.platform} · score to add`}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export type Quote = { text: string; name: string; role?: string; src?: string };

export function WrittenTestimonials({ quotes = [] }: { quotes?: Quote[] }) {
  return (
    <Section id="testimonials" kicker="Reviews" title="What clients say">
      {quotes.length === 0 ? (
        <Slot note="Send written reviews - the words, a first name, and what they hired you for. I will not write these" />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-5)" }}>
          {quotes.map((q, i) => (
            <blockquote key={i} style={{ ...CARD, margin: 0, display: "grid", gap: "12px" }}>
              <Stars score={5} />
              <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>{q.text}</p>
              <footer style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  width: "32px", height: "32px", borderRadius: "999px", display: "grid", placeItems: "center",
                  background: "var(--surface-brand)", color: "var(--text-inverse)",
                  font: "var(--type-label)", overflow: "hidden",
                }}>
                  <img src={q.src || portrait(i)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </span>
                <span style={{ display: "grid" }}>
                  <span style={{ font: "var(--type-body-sm)", color: "var(--text-strong)" }}>{q.name}</span>
                  {q.role && <span style={CAPTION}>{q.role}</span>}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      )}
    </Section>
  );
}

export type CaseStudy = { client: string; problem: string; result: string; metrics?: string[] };

export function CaseStudies({ studies = [], count = 2 }: { studies?: CaseStudy[]; count?: number }) {
  const empty = Math.max(0, count - studies.length);
  return (
    <Section id="results" kicker="Case studies" title="Real results" surface="alt">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-5)" }}>
        {studies.map((c) => (
          <article key={c.client} style={{ ...CARD, display: "grid", gap: "12px", padding: 0, overflow: "hidden" }}>
            <img src={photo("office,meeting", 900, 500, 21)} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }} />
            <span style={{ ...LABEL, padding: "0 var(--space-5)" }}>{c.client}</span>
            <p style={{ margin: 0, padding: "0 var(--space-5)", font: "var(--type-body)", color: "var(--text-body)" }}>{c.problem}</p>
            <p style={{ margin: 0, padding: "0 var(--space-5) var(--space-5)", font: "var(--type-h4)", color: "var(--text-strong)" }}>{c.result}</p>
            {c.metrics && (
              <ul style={{ display: "grid", gap: "6px", margin: 0, padding: 0, listStyle: "none" }}>
                {c.metrics.map((m) => (
                  <li key={m} style={{ display: "flex", gap: "8px", alignItems: "center", font: "var(--type-body-sm)" }}><Tick />{m}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
        {Array.from({ length: empty }).map((_, i) => (
          <article key={i} style={{ ...CARD, padding: 0, overflow: "hidden", display: "grid", gap: "12px" }}>
            <div style={{ position: "relative" }}>
              <img src={photo("office,team", 900, 500, 22 + i)} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
              <SwapTag label="case study" />
            </div>
            <div style={{ padding: "0 var(--space-5) var(--space-5)", display: "grid", gap: "8px" }}>
              <span style={LABEL}>Client name</span>
              <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-muted)" }}>
                What was broken, what changed, and one number.
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/** For businesses judged by looking. Drop the whole section where it does not apply. */
export function Portfolio({ images = [], count = 8 }: { images?: { src: string; alt: string }[]; count?: number }) {
  const empty = Math.max(0, count - images.length);
  return (
    <Section id="portfolio" kicker="Our work" title="Recent work">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-4)" }}>
        {images.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt}
            style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: "var(--radius-card)" }} />
        ))}
        {Array.from({ length: empty }).map((_, i) => (
          <div key={i} style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            <img src={photo("workshop,craft", 800, 600, 31 + i)} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
            <SwapTag label="your work" />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ why us, magnet, FAQ */

export function ThreeReasons({ reasons = [] }: { reasons?: { title: string; body: string }[] }) {
  const empty = Math.max(0, 3 - reasons.length);
  return (
    <Section id="why-us" kicker="Why us" title="Three reasons people pick us" surface="alt">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-5)" }}>
        {reasons.slice(0, 3).map((r) => (
          <div key={r.title} style={{ ...CARD, display: "grid", gap: "10px" }}>
            <Tick />
            <h3 style={{ margin: 0, font: "var(--type-h3)", color: "var(--text-strong)" }}>{r.title}</h3>
            <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>{r.body}</p>
          </div>
        ))}
        {Array.from({ length: empty }).map((_, i) => (
          <Slot key={i} note="Price, service, or we handle everything - in your words" />
        ))}
      </div>
    </Section>
  );
}

export function LeadMagnet({ title, blurb, cover, ctaLabel }: { title?: string; blurb?: string; cover?: string; ctaLabel?: string }) {
  return (
    <Section id="lead-magnet" kicker="Free, sent the moment you enquire">
      <div style={{ ...CARD, display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "var(--space-5)", alignItems: "center" }}>
        <div style={{ display: "grid", gap: "10px" }}>
          <h3 style={{ margin: 0, font: "var(--type-h3)", color: "var(--text-strong)" }}>
            {title || "[ the free guide, checklist or tool you send ]"}
          </h3>
          <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>
            {blurb || "Name the topic and I'll draft it. It arrives on the thank-you page and by email."}
          </p>
          <CtaButton label={ctaLabel} />
        </div>
        {cover
          ? <img src={cover} alt="" style={{ width: "140px", borderRadius: "var(--radius-input)" }} />
          : <div style={{ position: "relative", width: "160px" }}>
              <img src={photo("report,document", 480, 640, 41)} alt=""
                style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: "var(--radius-input)", display: "block", boxShadow: "var(--shadow-lg)" }} />
            </div>}
      </div>
    </Section>
  );
}

/** The reasons people DON'T enquire, answered straight. Not general service questions. */
export function Faq({ items = [] }: { items?: { q: string; a: string }[] }) {
  return (
    <Section id="faq" kicker="Before you enquire" title="Fair questions" surface="alt">
      {items.length === 0 ? (
        <Slot note="Send the real reasons people don't go ahead - price, trust, what happens next, am I too small, why you over the other quotes" />
      ) : (
        <div style={{ display: "grid", gap: "12px", maxWidth: "760px" }}>
          {items.map((f) => (
            <details key={f.q} style={{ ...CARD }}>
              <summary style={{ cursor: "pointer", font: "var(--type-h4)", color: "var(--text-strong)" }}>{f.q}</summary>
              <p style={{ margin: "10px 0 0", font: "var(--type-body)", color: "var(--text-body)" }}>{f.a}</p>
            </details>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ CTAs */

/** Scrolls to the form. Smooth scroll and scroll-margin are set in app/globals.css. */
export function CtaButton({ label = "Get my free quote", target = "#lead-form", style }: {
  label?: string; target?: string; style?: CSSProperties;
}) {
  return (
    <a href={target} data-cta="form" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
      minHeight: "var(--control-h)", padding: "var(--pad-control)", borderRadius: "var(--radius-control)",
      background: "var(--surface-brand)", color: "var(--text-inverse)", textDecoration: "none",
      font: "var(--type-button)", ...style,
    }}>{label}</a>
  );
}

/** Desktop: repeated between sections. One line of copy, one button. */
export function CtaBand({ line, label }: { line: string; label?: string }) {
  return (
    <section style={{ padding: "var(--space-10) 0", background: "var(--surface-brand-soft)" }}>
      <div className="gw-container" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ margin: 0, font: "var(--type-h3)", color: "var(--text-strong)" }}>{line}</p>
        <CtaButton label={label} />
      </div>
    </section>
  );
}

/** Mobile only: fixed to the bottom of the viewport for the whole scroll. Call left, form right. */
export function MobileCtaBar({ phone, label = "Get my quote" }: { phone: string; label?: string }) {
  return (
    <div className="lp-mobile-cta" style={{
      // display comes from globals.css (.lp-mobile-cta): grid on phones, none on
      // desktop. Inline display here would beat the media query and show the bar everywhere.
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 50,
      gridTemplateColumns: "1fr 1fr", gap: "10px",
      padding: "10px calc(env(safe-area-inset-left) + 12px) calc(env(safe-area-inset-bottom) + 10px)",
      background: "var(--surface-card)", borderTop: "var(--border-hairline) solid var(--line-hairline)",
    }}>
      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} data-cta="call" style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: "var(--control-h)",
        borderRadius: "var(--radius-control)", border: "var(--border-hairline) solid var(--line-hairline)",
        color: "var(--text-strong)", textDecoration: "none", font: "var(--type-button)",
      }}>Call now</a>
      <CtaButton label={label} />
    </div>
  );
}
