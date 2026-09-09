import React from "react";
import { Icon } from "../core/Icon.jsx";

/** Full-width band of headline figures on the brand colour. */
export function StatBand({ items = [], tone = "tint", style }) {
  const dark = tone === "brand";
  const bg = dark ? "var(--surface-brand)" : tone === "plain" ? "var(--surface-card)" : "var(--surface-tint)";
  return (
    <div style={{ background: bg, color: dark ? "var(--white)" : "var(--text-strong)", borderBottom: tone === "plain" ? "var(--border-hairline) solid var(--line-hairline)" : undefined, ...style }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.max(items.length, 1)}, 1fr)`, gap: "var(--space-7)", padding: "var(--space-7) var(--gutter)" }}>
        {items.map((i) => (
          <div key={i.label} style={{ display: "grid", gap: "3px" }}>
            {i.icon ? <Icon name={i.icon} size={17} color={dark ? "var(--accent-800)" : "var(--blue-600)"} style={{ marginBottom: 3 }} /> : null}
            <strong style={{ font: "var(--weight-black) 30px/1 var(--font-core)", letterSpacing: "var(--track-display)" }}>{i.value}</strong>
            <span style={{ font: "var(--type-body-sm)", color: dark ? "var(--blue-100)" : "var(--text-muted)" }}>{i.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
