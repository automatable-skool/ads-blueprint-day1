import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.ms-field{display:flex;flex-direction:column;gap:6px;width:100%}
.ms-field__label{font:var(--fw-semibold) var(--fs-small)/1.3 var(--font-core);color:var(--text-strong)}
.ms-field__req{color:var(--accent-600);margin-left:2px}
.ms-field__hint{font:var(--fw-regular) var(--fs-caption)/1.45 var(--font-core);color:var(--text-muted)}
.ms-field__error{font:var(--fw-medium) var(--fs-caption)/1.45 var(--font-core);color:var(--status-danger)}
.ms-control{width:100%;height:var(--control-h-md);padding:0 14px;background:var(--surface-card);color:var(--text-strong);border:var(--border-w) solid var(--border-default);border-radius:var(--radius-control);transition:var(--transition-control)}
.ms-control:hover:not(:disabled){border-color:var(--border-strong)}
.ms-control:focus{outline:none;border-color:var(--accent-500);box-shadow:var(--shadow-ring-focus)}
.ms-control--lg{height:var(--control-h-lg);padding-inline:16px;font-size:var(--fs-body-lg)}
.ms-control--sm{height:var(--control-h-sm);font-size:var(--fs-small)}
.ms-control--invalid{border-color:var(--status-danger)}
.ms-control--icon{padding-left:42px}
.ms-selectwrap{position:relative;display:flex;align-items:center}
.ms-selectwrap__chev{position:absolute;right:12px;color:var(--text-muted);pointer-events:none}
.ms-select{appearance:none;-webkit-appearance:none;padding-right:38px;cursor:pointer}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-select-css")) {
  const el = document.createElement("style"); el.id = "ms-select-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Select({ label, hint, error, options = [], placeholder, size = "md", required = false, id, className = "", ...rest }) {
  const autoId = React.useId ? React.useId() : "ms-select";
  const fieldId = id || autoId;
  return (
    <div className={["ms-field", className].filter(Boolean).join(" ")}>
      {label && <label className="ms-field__label" htmlFor={fieldId}>{label}{required && <span className="ms-field__req">*</span>}</label>}
      <div className="ms-selectwrap">
        <select id={fieldId} required={required} aria-invalid={error ? true : undefined}
          className={["ms-control", "ms-select", "ms-control--" + size, error ? "ms-control--invalid" : ""].filter(Boolean).join(" ")} {...rest}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span className="ms-selectwrap__chev"><Icon name="chevron-down" size={18} /></span>
      </div>
      {error ? <span className="ms-field__error">{error}</span> : hint ? <span className="ms-field__hint">{hint}</span> : null}
    </div>
  );
}
