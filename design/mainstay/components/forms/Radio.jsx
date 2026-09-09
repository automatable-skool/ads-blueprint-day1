import React from "react";

const CSS = `
.ms-radio{display:inline-flex;align-items:flex-start;gap:10px;cursor:pointer;min-height:var(--tap-min);padding:11px 0}
.ms-radio input{position:absolute;opacity:0;width:0;height:0}
.ms-radio__dot{flex:none;width:20px;height:20px;margin-top:1px;border:var(--border-w-strong) solid var(--border-strong);border-radius:var(--radius-pill);background:var(--surface-card);display:flex;align-items:center;justify-content:center;transition:var(--transition-control)}
.ms-radio__dot::after{content:"";width:8px;height:8px;border-radius:var(--radius-pill);background:var(--n-0);transform:scale(0);transition:transform var(--dur-fast) var(--ease-out)}
.ms-radio:hover .ms-radio__dot{border-color:var(--n-600)}
.ms-radio input:checked+.ms-radio__dot{background:var(--accent-500);border-color:var(--accent-500)}
.ms-radio input:checked+.ms-radio__dot::after{transform:scale(1)}
.ms-radio input:focus-visible+.ms-radio__dot{box-shadow:var(--shadow-ring-focus)}
.ms-radio__text{font:var(--type-small);color:var(--text-body)}
.ms-radio__text b{display:block;font:var(--fw-medium) var(--fs-body)/1.4 var(--font-core);color:var(--text-strong)}
.ms-radio--card{padding:14px 16px;border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-control);background:var(--surface-card);width:100%}
.ms-radio--card:hover{border-color:var(--border-default)}
.ms-radio--card:has(input:checked){border-color:var(--accent-400);background:var(--accent-50)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-radio-css")) {
  const el = document.createElement("style"); el.id = "ms-radio-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Radio({ label, description, name, value, checked, defaultChecked, onChange, disabled, card = false, className = "", ...rest }) {
  return (
    <label className={["ms-radio", card ? "ms-radio--card" : "", className].filter(Boolean).join(" ")}>
      <input type="radio" name={name} value={value} checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} {...rest} />
      <span className="ms-radio__dot" />
      <span className="ms-radio__text">{description ? <><b>{label}</b>{description}</> : label}</span>
    </label>
  );
}
