import React from "react";
import { Icon } from "../core/Icon.jsx";
import { MediaFrame } from "./MediaFrame.jsx";

/* Numbered "how it works" steps. layout="cards" gives each step a photo slot
   (the bold page style); layout="rows" is a compact numbered list (the calm style). */
export function ProcessSteps({ steps = [], layout = "cards", style }) {
  if (layout === "rows") {
    return (
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-5)", ...style }}>
        {steps.map((s, i) => (
          <li key={s.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-5)", alignItems: "start", paddingBottom: "var(--space-5)", borderBottom: i < steps.length - 1 ? "var(--border-hairline) solid var(--line-hairline)" : "none" }}>
            <span style={{ font: "var(--weight-black) 20px/1 var(--font-core)", letterSpacing: "var(--track-heading)", color: "var(--text-muted)", width: 28 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ display: "grid", gap: 4 }}>
              <strong style={{ font: "var(--type-h4)", color: "var(--text-strong)" }}>{s.title}</strong>
              <span style={{ font: "var(--type-body-sm)", color: "var(--text-body)" }}>{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: `repeat(${Math.max(steps.length, 1)}, 1fr)`, gap: "var(--space-5)", ...style }}>
      {steps.map((s, i) => (
        <li key={s.title} style={{ display: "grid", gap: "var(--space-4)", padding: "var(--space-5)", background: "var(--surface-card)", border: "var(--border-hairline) solid var(--line-hairline)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", alignContent: "start" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <span style={{ width: 28, height: 28, borderRadius: "var(--radius-sm)", background: "var(--accent-800)", color: "var(--white)", display: "grid", placeItems: "center", font: "var(--weight-black) 12px/1 var(--font-core)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {s.badge ? (
              <span style={{ font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", background: "var(--surface-sunken)", color: "var(--text-body)", padding: "3px 8px", borderRadius: "var(--radius-pill)" }}>{s.badge}</span>
            ) : null}
          </span>
          {s.image !== undefined ? <MediaFrame ratio="16 / 10" label={s.imageLabel || "Photo"} radius="var(--radius-sm)" /> : null}
          <strong style={{ font: "var(--type-h4)", color: "var(--text-strong)" }}>{s.title}</strong>
          <span style={{ font: "var(--type-body-sm)", color: "var(--text-body)" }}>{s.body}</span>
        </li>
      ))}
    </ol>
  );
}
