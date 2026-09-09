import React from "react";

export function Switch({ label, checked, defaultChecked, onChange, disabled = false, style }) {
  const controlled = checked !== undefined;
  const [on, setOn] = React.useState(!!defaultChecked);
  const value = controlled ? checked : on;
  const toggle = () => {
    if (disabled) return;
    if (!controlled) setOn(!value);
    onChange && onChange(!value);
  };
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, font: "var(--type-body)", color: "var(--text-body)", ...style }}>
      <button type="button" role="switch" aria-checked={value} onClick={toggle} disabled={disabled}
        style={{
          width: 40, height: 23, padding: 2, flex: "none", cursor: "inherit",
          borderRadius: "var(--radius-pill)", transition: "var(--transition-control)",
          background: value ? "var(--surface-brand)" : "var(--ink-200)",
          border: `var(--border-hairline) solid ${value ? "var(--blue-800)" : "var(--line-strong)"}`,
          display: "flex", justifyContent: value ? "flex-end" : "flex-start", alignItems: "center"
        }}>
        <span style={{ width: 17, height: 17, borderRadius: "50%", background: "var(--white)", boxShadow: "var(--shadow-xs)" }} />
      </button>
      {label}
    </label>
  );
}
