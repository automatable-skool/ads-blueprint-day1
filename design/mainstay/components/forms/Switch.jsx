import React from "react";

const CSS = `
.ms-switch{display:inline-flex;align-items:center;gap:12px;cursor:pointer;min-height:var(--tap-min)}
.ms-switch input{position:absolute;opacity:0;width:0;height:0}
.ms-switch__track{flex:none;width:44px;height:26px;border-radius:var(--radius-pill);background:var(--n-300);padding:3px;transition:background-color var(--dur-base) var(--ease-out)}
.ms-switch__knob{display:block;width:20px;height:20px;border-radius:var(--radius-pill);background:var(--n-0);box-shadow:var(--shadow-xs);transition:transform var(--dur-base) var(--ease-out)}
.ms-switch input:checked+.ms-switch__track{background:var(--accent-500)}
.ms-switch input:checked+.ms-switch__track .ms-switch__knob{transform:translateX(18px)}
.ms-switch input:focus-visible+.ms-switch__track{box-shadow:var(--shadow-ring-focus)}
.ms-switch input:disabled+.ms-switch__track{opacity:.5}
.ms-switch__label{font:var(--fw-medium) var(--fs-body)/1.4 var(--font-core);color:var(--text-strong)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-switch-css")) {
  const el = document.createElement("style"); el.id = "ms-switch-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Switch({ label, checked, defaultChecked, onChange, disabled, className = "", ...rest }) {
  return (
    <label className={["ms-switch", className].filter(Boolean).join(" ")}>
      <input type="checkbox" role="switch" checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} {...rest} />
      <span className="ms-switch__track"><span className="ms-switch__knob" /></span>
      {label && <span className="ms-switch__label">{label}</span>}
    </label>
  );
}
