import React from "react";

export function Radio({ label, name, value, checked, onChange, disabled = false, style, ...rest }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, font: "var(--type-body)", color: "var(--text-body)", ...style }}>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled}
        onChange={() => onChange && onChange(value)}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} {...rest} />
      <span style={{
        width: 19, height: 19, flex: "none", borderRadius: "50%", display: "grid", placeItems: "center",
        background: "var(--surface-card)", transition: "var(--transition-control)",
        border: `var(--border-strong) solid ${checked ? "var(--blue-700)" : "var(--line-strong)"}`
      }}>
        {checked ? <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--surface-brand)" }} /> : null}
      </span>
      {label}
    </label>
  );
}

export function RadioGroup({ name, options = [], value, onChange, direction = "vertical", style }) {
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: direction === "vertical" ? "column" : "row", gap: direction === "vertical" ? "var(--space-4)" : "var(--space-6)", ...style }}>
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return <Radio key={v} name={name} value={v} label={l} checked={value === v} onChange={onChange} />;
      })}
    </div>
  );
}
