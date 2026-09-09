import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Tabs({ tabs = [], value, onChange, style }) {
  const active = value ?? (typeof tabs[0] === "string" ? tabs[0] : tabs[0] && tabs[0].value);
  return (
    <div role="tablist" style={{ display: "flex", gap: "var(--space-6)", borderBottom: "var(--border-hairline) solid var(--line-hairline)", ...style }}>
      {tabs.map((t) => {
        const v = typeof t === "string" ? t : t.value;
        const l = typeof t === "string" ? t : t.label;
        const icon = typeof t === "string" ? null : t.icon;
        const on = v === active;
        return (
          <button key={v} role="tab" aria-selected={on} type="button" onClick={() => onChange && onChange(v)}
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px", padding: "0 0 10px", background: "none",
              border: 0, borderBottom: `2px solid ${on ? "var(--surface-accent)" : "transparent"}`,
              marginBottom: "-1px", cursor: "pointer", transition: "var(--transition-control)",
              font: "var(--weight-semibold) var(--size-body-sm)/1.2 var(--font-core)",
              color: on ? "var(--text-strong)" : "var(--text-muted)"
            }}>
            {icon ? <Icon name={icon} size={16} /> : null}{l}
          </button>
        );
      })}
    </div>
  );
}
