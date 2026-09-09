import React from "react";
import { Icon } from "../core/Icon.jsx";

export function StepIndicator({ steps = [], current = 0, style }) {
  return (
    <ol style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", listStyle: "none", margin: 0, padding: 0, ...style }}>
      {steps.map((s, i) => {
        const done = i < current, on = i === current;
        return (
          <li key={s} style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                width: 24, height: 24, borderRadius: "50%", display: "grid", placeItems: "center", flex: "none",
                font: "var(--type-label)",
                background: done ? "var(--surface-brand)" : on ? "var(--surface-accent)" : "var(--surface-card)",
                color: done ? "var(--text-inverse)" : on ? "var(--text-on-accent)" : "var(--text-faint)",
                border: `var(--border-hairline) solid ${done ? "var(--blue-800)" : on ? "var(--accent-900)" : "var(--line-hairline)"}`
              }}>
                {done ? <Icon name="check" size={13} strokeWidth={2.5} /> : i + 1}
              </span>
              <span style={{ font: on || done ? "var(--weight-semibold) var(--size-body-sm)/1.2 var(--font-core)" : "var(--type-body-sm)", color: on || done ? "var(--text-strong)" : "var(--text-muted)" }}>{s}</span>
            </span>
            {i < steps.length - 1 ? <span style={{ width: 28, height: 1, background: "var(--line-hairline)" }} /> : null}
          </li>
        );
      })}
    </ol>
  );
}
