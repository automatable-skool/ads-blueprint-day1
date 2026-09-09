import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Rating } from "./Rating.jsx";

export function TestimonialCard({ quote, name, detail, rating = 5, source, style }) {
  return (
    <figure style={{
      margin: 0, display: "grid", gap: "var(--space-5)", padding: "var(--pad-card)",
      background: "var(--surface-card)", border: "var(--border-hairline) solid var(--line-hairline)",
      borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", ...style
    }}>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Rating value={rating} size={15} />
        <Icon name="quote" size={18} color="var(--ink-200)" />
      </span>
      <blockquote style={{ margin: 0, font: "var(--type-body-lg)", color: "var(--text-strong)", textWrap: "pretty" }}>{quote}</blockquote>
      <figcaption style={{ display: "grid", gap: "2px", borderTop: "var(--border-hairline) solid var(--line-hairline)", paddingTop: "var(--space-4)" }}>
        <strong style={{ font: "var(--weight-semibold) var(--size-body-sm)/1.3 var(--font-core)", color: "var(--text-strong)" }}>{name}</strong>
        {detail ? <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>{detail}</span> : null}
        {source ? <span style={{ font: "var(--type-caption)", color: "var(--text-faint)" }}>via {source}</span> : null}
      </figcaption>
    </figure>
  );
}
