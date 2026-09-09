import React from "react";

const tones = {
  neutral: { background: "var(--ink-100)", color: "var(--text-body)" },
  brand: { background: "var(--surface-brand-soft)", color: "var(--text-brand)" },
  accent: { background: "var(--surface-accent-soft)", color: "var(--text-accent)" },
  positive: { background: "var(--status-positive-bg)", color: "var(--status-positive)" },
  caution: { background: "var(--status-caution-bg)", color: "var(--status-caution)" },
  critical: { background: "var(--status-critical-bg)", color: "var(--status-critical)" },
  info: { background: "var(--status-info-bg)", color: "var(--status-info)" }
};

export function Badge({ children, tone = "neutral", dot = false, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px",
        borderRadius: "var(--radius-badge)", font: "var(--type-label)", letterSpacing: "0.04em",
        textTransform: "uppercase", whiteSpace: "nowrap", ...tones[tone], ...style
      }}
      {...rest}
    >
      {dot ? <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} /> : null}
      {children}
    </span>
  );
}
