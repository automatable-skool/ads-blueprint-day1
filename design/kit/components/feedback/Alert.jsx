import React from "react";
import { Icon } from "../core/Icon.jsx";

const tones = {
  positive: { icon: "circle-check", color: "var(--status-positive)", bg: "var(--status-positive-bg)" },
  caution: { icon: "triangle-alert", color: "var(--status-caution)", bg: "var(--status-caution-bg)" },
  critical: { icon: "triangle-alert", color: "var(--status-critical)", bg: "var(--status-critical-bg)" },
  info: { icon: "info", color: "var(--status-info)", bg: "var(--status-info-bg)" }
};

export function Alert({ tone = "info", title, children, style }) {
  const t = tones[tone];
  return (
    <div role="status" style={{ display: "flex", gap: "var(--space-4)", padding: "var(--space-5)", background: t.bg, border: `var(--border-hairline) solid ${t.color}`, borderRadius: "var(--radius-card)", ...style }}>
      <Icon name={t.icon} size={18} color={t.color} style={{ marginTop: 1 }} />
      <div style={{ display: "grid", gap: "3px" }}>
        {title ? <strong style={{ font: "var(--weight-semibold) var(--size-body-sm)/1.4 var(--font-core)", color: "var(--text-strong)" }}>{title}</strong> : null}
        {children ? <div style={{ font: "var(--type-body-sm)", color: "var(--text-body)" }}>{children}</div> : null}
      </div>
    </div>
  );
}

export function Toast({ tone = "positive", message, action, onClose, style }) {
  const t = tones[tone];
  return (
    <div role="status" style={{
      display: "flex", alignItems: "center", gap: "var(--space-4)", padding: "12px 14px",
      background: "var(--surface-inverse)", color: "var(--text-inverse)", borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-lg)", font: "var(--type-body-sm)", maxWidth: 420, ...style
    }}>
      <Icon name={t.icon} size={17} color={tone === "positive" ? "var(--blue-300)" : "var(--ink-300)"} />
      <span style={{ flex: 1 }}>{message}</span>
      {action}
      {onClose ? (
        <button type="button" aria-label="Dismiss" onClick={onClose} style={{ background: "none", border: 0, cursor: "pointer", color: "var(--ink-300)", display: "flex" }}>
          <Icon name="x" size={15} />
        </button>
      ) : null}
    </div>
  );
}
