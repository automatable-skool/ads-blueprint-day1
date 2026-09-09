// The Goodwork kit's marketing primitives, ported verbatim from
// design kit `components/marketing/*.jsx`. Nothing here is invented - every value is the kit's.
//
// These were missing from this repo, which is why landing pages had hand-rolled section markup
// that drifted from the system. (2 September 2026.)
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";

/* ---------------------------------------------------------------- MediaFrame */

/** Photo slot. The kit ships NO photography, so this renders a labelled placeholder until a real
 *  `src` is supplied. Kit rule: "Never substitute stock or generated imagery." */
export function MediaFrame({ src, alt = "", label = "Photo", ratio = "4 / 3", radius = "var(--radius-media)", children, style }: {
  src?: string; alt?: string; label?: string; ratio?: string; radius?: string; children?: ReactNode; style?: CSSProperties;
}) {
  return (
    <div style={{ position: "relative", aspectRatio: ratio, borderRadius: radius, overflow: "hidden", background: "var(--ink-100)", border: "var(--border-hairline) solid var(--line-hairline)", ...style }}>
      {src ? <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (
        <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", gap: "8px", alignContent: "center", color: "var(--text-faint)" }}>
          <Icon name="image" size={22} />
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase" }}>{label}</span>
        </span>
      )}
      {children ? <div style={{ position: "absolute", inset: 0 }}>{children}</div> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- Rating */

export function Rating({ value = 5, count, size = 16, showValue = false, style }: {
  value?: number; count?: number; size?: number; showValue?: boolean; style?: CSSProperties;
}) {
  const full = Math.round(value);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", ...style }}>
      <span style={{ display: "inline-flex", gap: "2px" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Icon key={i} name="star" size={size} strokeWidth={1.5}
            color={i < full ? "var(--star-filled)" : "var(--star-empty)"}
            style={{ fill: i < full ? "var(--star-filled)" : "transparent" }} />
        ))}
      </span>
      {showValue ? <strong style={{ font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)", color: "var(--text-strong)" }}>{value.toFixed(1)}</strong> : null}
      {count !== undefined ? <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>({count} reviews)</span> : null}
    </span>
  );
}

/* ---------------------------------------------------------------- AvatarCluster */

/** Overlapping initial discs plus a rating line. Discs are `--surface-sunken` warm grey with the
 *  initials in `--text-body` - never brand-tinted, per the kit's neutrals rule. */
export function AvatarCluster({ people = [], rating, label, size = 34, style }: {
  people?: (string | { initials: string; src?: string })[];
  rating?: string; label?: string; size?: number; style?: CSSProperties;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-4)", ...style }}>
      <span style={{ display: "inline-flex" }}>
        {people.map((p, i) => {
          const initials = typeof p === "string" ? p : p.initials;
          const src = typeof p === "string" ? undefined : p.src;
          return (
            <span key={initials + i} title={initials} style={{
              width: size, height: size, borderRadius: "50%", marginLeft: i ? -size * 0.32 : 0,
              border: "2px solid var(--surface-card)",
              background: src ? `center/cover url(${src})` : "var(--surface-sunken)",
              color: "var(--text-body)", display: "grid", placeItems: "center", overflow: "hidden",
              font: "var(--weight-bold) 11px/1 var(--font-core)", zIndex: people.length - i,
            }}>{src ? null : initials}</span>
          );
        })}
      </span>
      <span style={{ display: "grid", gap: "2px" }}>
        {rating !== undefined && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <Rating value={Number(rating)} size={15} />
            <strong style={{ font: "var(--weight-bold) var(--size-body-sm)/1 var(--font-core)", color: "var(--text-strong)" }}>{rating}/5</strong>
          </span>
        )}
        {label && <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>{label}</span>}
      </span>
    </span>
  );
}

/* ---------------------------------------------------------------- TestimonialCard */

export function TestimonialCard({ quote, name, detail, rating = 5, source, style }: {
  quote: string; name: string; detail?: string; rating?: number; source?: string; style?: CSSProperties;
}) {
  return (
    <figure style={{
      margin: 0, display: "grid", gap: "var(--space-5)", padding: "var(--pad-card)",
      background: "var(--surface-card)", border: "var(--border-hairline) solid var(--line-hairline)",
      borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", ...style,
    }}>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Rating value={rating} size={15} />
        <Icon name="quote" size={18} color="var(--ink-200)" />
      </span>
      <blockquote style={{ margin: 0, font: "var(--type-body-lg)", color: "var(--text-strong)", textWrap: "pretty" }}>{quote}</blockquote>
      <figcaption style={{ display: "grid", gap: "2px", borderTop: "var(--border-hairline) solid var(--line-hairline)", paddingTop: "var(--space-4)" }}>
        <strong style={{ font: "var(--weight-semibold) var(--size-body-sm)/1.3 var(--font-core)", color: "var(--text-strong)" }}>{name}</strong>
        {detail && <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>{detail}</span>}
        {source && <span style={{ font: "var(--type-caption)", color: "var(--text-faint)" }}>via {source}</span>}
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- StatBlock, TrustRow */

export function StatBlock({ value, label, icon, align = "left", style }: {
  value: string; label: string; icon?: string; align?: "left" | "center"; style?: CSSProperties;
}) {
  return (
    <div style={{ display: "grid", gap: "4px", justifyItems: align === "center" ? "center" : "start", textAlign: align, ...style }}>
      {icon && <Icon name={icon} size={18} color="var(--text-accent)" style={{ marginBottom: 2 }} />}
      <strong style={{ font: "var(--weight-semibold) var(--size-h2)/1 var(--font-core)", letterSpacing: "var(--track-heading)", color: "var(--text-strong)" }}>{value}</strong>
      <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

export function TrustRow({ items = [], iconColor, style }: { items?: string[]; iconColor?: string; style?: CSSProperties }) {
  return (
    <ul style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-6)", listStyle: "none", margin: 0, padding: 0, color: "var(--text-body)", ...style }}>
      {items.map((t) => (
        <li key={t} style={{ display: "inline-flex", alignItems: "center", gap: "8px", font: "var(--type-body-sm)", color: "inherit" }}>
          <Icon name="shield-check" size={16} color={iconColor || "currentColor"} />{t}
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- Eyebrow, Tag, ProcessSteps, FAQItem */

/** Section label. No pill, no grey box - brand-coloured text with an icon.
 *
 *  ⛔ DELIBERATE DEVIATION FROM THE KIT. Goodwork's colour table says eyebrow labels are
 *  `--text-muted` and "don't override to brand", and the calm style draws them as a pill on
 *  `--surface-sunken`. Jono overruled both on 2 September 2026: the grey pill reads as a stray
 *  UI chip above every heading. Kept: the label type role, the uppercase casing and the tracking. */
export function Eyebrow({ icon, children, align = "left", tone = "default" }: {
  icon?: string; children: ReactNode; align?: "left" | "center"; tone?: "default" | "on-brand";
}) {
  const ink = tone === "on-brand" ? "var(--white)" : "var(--text-brand)";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "7px", width: "fit-content",
      alignSelf: align === "center" ? "center" : "start",
      justifySelf: align === "center" ? "center" : "start",
      font: "var(--type-label)", letterSpacing: "var(--track-label)",
      textTransform: "uppercase", color: ink,
    }}>
      {icon && <Icon name={icon} size={14} color={ink} />}{children}
    </span>
  );
}

export function Tag({ icon, children }: { icon?: string; children: ReactNode }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px",
      borderRadius: "var(--radius-pill)", border: "var(--border-hairline) solid var(--line-hairline)",
      font: "var(--type-body-sm)", color: "var(--text-body)",
    }}>
      {icon && <Icon name={icon} size={14} color="var(--text-muted)" />}{children}
    </span>
  );
}

/** Numbered steps. The number chip is `--accent-800` graphite, per the kit's colour table. */
export function ProcessSteps({ steps = [] }: { steps?: { title: string; body: string }[] }) {
  return (
    <ol style={{ display: "grid", gap: "var(--space-6)", margin: 0, padding: 0, listStyle: "none" }}>
      {steps.map((s, i) => (
        <li key={s.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-5)", alignItems: "start" }}>
          <span style={{
            width: 30, height: 30, borderRadius: "50%", background: "var(--surface-accent)",
            color: "var(--text-on-accent)", display: "grid", placeItems: "center",
            font: "var(--weight-bold) 13px/1 var(--font-core)",
          }}>{i + 1}</span>
          <span style={{ display: "grid", gap: "4px" }}>
            <strong style={{ font: "var(--type-h4)", color: "var(--text-strong)" }}>{s.title}</strong>
            <span style={{ font: "var(--type-body)", color: "var(--text-body)" }}>{s.body}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} style={{ borderBottom: "var(--border-hairline) solid var(--line-hairline)", padding: "var(--space-7) 0" }}>
      <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-5)", font: "var(--type-h4)", color: "var(--text-strong)" }}>
        {question}
        <Icon name="arrow-right" size={17} color="var(--text-muted)" />
      </summary>
      <p style={{ margin: "var(--space-4) 0 0", font: "var(--type-body)", color: "var(--text-body)", maxWidth: "var(--container-text)" }}>{answer}</p>
    </details>
  );
}

/* ---------------------------------------------------------------- CtaBlock */

/** The CTA that repeats at every major section, with the response time under it.
 *
 *  Blueprint component 3: a CTA above the fold AND on every major section, about eight times on
 *  desktop. Component 9: the response time stated and repeated - speed is the single easiest
 *  thing to promise and the one a visitor is actually weighing while they decide whether to
 *  bother. (Jono, 2 September 2026.)
 *
 *  ⛔ `responseTime` is a CLAIM. It must be true for this business and it must be in
 *  context/proof.md before it ships. Never carry the example figure over from another page. */
export function CtaBlock({ label = "Get my free graded audit", href = "#lead-form", responseTime, align = "left", tone = "default" }: {
  label?: string; href?: string; responseTime?: string; align?: "left" | "center"; tone?: "default" | "on-brand";
}) {
  const onBrand = tone === "on-brand";
  return (
    <div className="lp-section-cta" style={{
      gap: "10px", justifyItems: align === "center" ? "center" : "start",
      textAlign: align, paddingTop: "var(--space-9)",
    }}>
      <a href={href} data-l style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
        minHeight: "var(--control-h-lg)", padding: "0 var(--space-7)", borderRadius: "var(--radius-pill)",
        background: onBrand ? "var(--white)" : "var(--surface-brand)",
        color: onBrand ? "var(--text-strong)" : "var(--text-inverse)", font: "var(--type-button)",
        textDecoration: "none", boxShadow: onBrand ? "var(--shadow-md)" : "var(--shadow-brand)",
      }}>
        {label}<Icon name="arrow-right" size={17} />
      </a>
      {responseTime && (
        <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", font: "var(--type-body-sm)", color: onBrand ? "var(--blue-100)" : "var(--text-muted)" }}>
          <Icon name="clock" size={15} color={onBrand ? "var(--blue-100)" : "var(--text-muted)"} />Average response time: {responseTime}
        </span>
      )}
    </div>
  );
}
