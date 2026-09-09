import React from "react";
import { Icon } from "../core/Icon.jsx";

export function PlanCard({ price, period = "per month", title, description, perks = [], footnote, action, style }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: ".72fr 1.28fr", borderRadius: "var(--radius-card)", overflow: "hidden", border: "var(--border-hairline) solid var(--line-hairline)", boxShadow: "var(--shadow-sm)", background: "var(--surface-card)", ...style }}>
      <div style={{ background: "var(--surface-brand-deep)", color: "var(--white)", display: "grid", alignContent: "center", justifyItems: "center", gap: "2px", padding: "var(--space-7)" }}>
        <strong style={{ font: "var(--weight-black) 34px/1 var(--font-core)", letterSpacing: "var(--track-display)" }}>{price}</strong>
        <span style={{ font: "var(--type-body-sm)", color: "var(--blue-200)" }}>{period}</span>
        {footnote ? <span style={{ font: "var(--type-caption)", color: "var(--blue-300)", marginTop: 6, textAlign: "center" }}>{footnote}</span> : null}
      </div>
      <div style={{ padding: "var(--space-7)", display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
        <h3 style={{ font: "var(--type-h3)", color: "var(--text-strong)", margin: 0 }}>{title}</h3>
        {description ? <p style={{ font: "var(--type-body-sm)", color: "var(--text-body)", margin: 0 }}>{description}</p> : null}
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4) var(--space-6)", listStyle: "none", margin: 0, padding: 0 }}>
          {perks.map((p) => (
            <li key={p} style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--weight-semibold) var(--size-body-sm)/1.3 var(--font-core)", color: "var(--text-body)" }}>
              <Icon name="check" size={15} strokeWidth={2.5} color="var(--blue-600)" />{p}
            </li>
          ))}
        </ul>
        {action ? <div style={{ marginTop: "var(--space-2)" }}>{action}</div> : null}
      </div>
    </div>
  );
}
