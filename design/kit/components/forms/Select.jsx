import React from "react";

export function Select({ options = [], placeholder, invalid = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ position: "relative", ...style }}>
      <select
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: "100%", minHeight: "var(--control-h)", padding: "var(--pad-control)", paddingRight: "38px",
          font: "var(--type-body)", color: "var(--text-strong)", background: "var(--surface-card)",
          border: `var(--border-hairline) solid ${invalid ? "var(--status-critical)" : focus ? "var(--line-brand)" : "var(--line-strong)"}`,
          borderRadius: "var(--radius-input)", boxShadow: focus ? "var(--ring-focus)" : "none",
          appearance: "none", outline: "none", transition: "var(--transition-control)"
        }}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => {
          const value = typeof o === "string" ? o : o.value;
          const label = typeof o === "string" ? o : o.label;
          return <option key={value} value={value}>{label}</option>;
        })}
      </select>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--text-muted)" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
