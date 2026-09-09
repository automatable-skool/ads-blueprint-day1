import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.ms-check{display:inline-flex;align-items:flex-start;gap:10px;cursor:pointer;min-height:var(--tap-min);padding:11px 0}
.ms-check input{position:absolute;opacity:0;width:0;height:0}
.ms-check__box{flex:none;width:20px;height:20px;margin-top:1px;border:var(--border-w-strong) solid var(--border-strong);border-radius:var(--radius-xs);background:var(--surface-card);display:flex;align-items:center;justify-content:center;color:transparent;transition:var(--transition-control)}
.ms-check:hover .ms-check__box{border-color:var(--n-600)}
.ms-check input:checked+.ms-check__box{background:var(--accent-500);border-color:var(--accent-500);color:var(--n-0)}
.ms-check input:focus-visible+.ms-check__box{box-shadow:var(--shadow-ring-focus)}
.ms-check input:disabled+.ms-check__box{background:var(--surface-muted);border-color:var(--border-default)}
.ms-check__text{font:var(--type-small);color:var(--text-body)}
.ms-check__text b{display:block;font:var(--fw-medium) var(--fs-body)/1.4 var(--font-core);color:var(--text-strong)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-checkbox-css")) {
  const el = document.createElement("style"); el.id = "ms-checkbox-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Checkbox({ label, description, checked, defaultChecked, onChange, disabled, className = "", ...rest }) {
  return (
    <label className={["ms-check", className].filter(Boolean).join(" ")}>
      <input type="checkbox" checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} {...rest} />
      <span className="ms-check__box"><Icon name="check" size={14} strokeWidth={3} /></span>
      <span className="ms-check__text">{description ? <><b>{label}</b>{description}</> : label}</span>
    </label>
  );
}
