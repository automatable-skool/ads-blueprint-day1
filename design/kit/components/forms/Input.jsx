import React from "react";

const fieldShell = {
  width: "100%", minHeight: "var(--control-h)", padding: "var(--pad-control)",
  font: "var(--type-body)", color: "var(--text-strong)", background: "var(--surface-card)",
  border: "var(--border-hairline) solid var(--line-strong)", borderRadius: "var(--radius-input)",
  transition: "var(--transition-control)", outline: "none"
};

export function Field({ label, hint, error, required = false, htmlFor, children, style }) {
  return (
    <label htmlFor={htmlFor} style={{ display: "grid", gap: "6px", ...style }}>
      {label ? (
        <span style={{ font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {label}{required ? <span style={{ color: "var(--status-critical)" }}> *</span> : null}
        </span>
      ) : null}
      {children}
      {error ? <span style={{ font: "var(--type-body-sm)", color: "var(--status-critical)" }}>{error}</span>
        : hint ? <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>{hint}</span> : null}
    </label>
  );
}

export function Input({ invalid = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <input
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        ...fieldShell,
        borderColor: invalid ? "var(--status-critical)" : focus ? "var(--line-brand)" : "var(--line-strong)",
        boxShadow: focus ? "var(--ring-focus)" : "none",
        ...style
      }}
      {...rest}
    />
  );
}

export function Textarea({ rows = 4, invalid = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea
      rows={rows} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        ...fieldShell, minHeight: "auto", lineHeight: "var(--lh-body)", resize: "vertical",
        borderColor: invalid ? "var(--status-critical)" : focus ? "var(--line-brand)" : "var(--line-strong)",
        boxShadow: focus ? "var(--ring-focus)" : "none",
        ...style
      }}
      {...rest}
    />
  );
}
