import React from "react";

export function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, style, ...rest }) {
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
      <input type="checkbox" checked={value} onChange={toggle} disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} {...rest} />
      <span style={{
        width: 19, height: 19, flex: "none", display: "grid", placeItems: "center",
        borderRadius: "var(--radius-xs)", transition: "var(--transition-control)",
        background: value ? "var(--surface-brand)" : "var(--surface-card)",
        border: `var(--border-strong) solid ${value ? "var(--blue-700)" : "var(--line-strong)"}`
      }}>
        {value ? (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        ) : null}
      </span>
      {label}
    </label>
  );
}
