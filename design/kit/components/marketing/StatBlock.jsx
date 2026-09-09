import React from "react";
import { Icon } from "../core/Icon.jsx";

export function StatBlock({ value, label, icon, align = "left", style }) {
  return (
    <div style={{ display: "grid", gap: "4px", justifyItems: align === "center" ? "center" : "start", textAlign: align, ...style }}>
      {icon ? <Icon name={icon} size={18} color="var(--text-accent)" style={{ marginBottom: 2 }} /> : null}
      <strong style={{ font: "var(--weight-semibold) var(--size-h2)/1 var(--font-core)", letterSpacing: "var(--track-heading)", color: "var(--text-strong)" }}>{value}</strong>
      <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

export function TrustRow({ items = [], iconColor, style }) {
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
