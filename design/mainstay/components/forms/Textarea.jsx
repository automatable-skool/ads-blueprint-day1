import React from "react";

const CSS = `
.ms-field{display:flex;flex-direction:column;gap:6px;width:100%}
.ms-field__label{font:var(--fw-semibold) var(--fs-small)/1.3 var(--font-core);color:var(--text-strong)}
.ms-field__req{color:var(--accent-600);margin-left:2px}
.ms-field__hint{font:var(--fw-regular) var(--fs-caption)/1.45 var(--font-core);color:var(--text-muted)}
.ms-field__error{font:var(--fw-medium) var(--fs-caption)/1.45 var(--font-core);color:var(--status-danger)}
.ms-textarea{width:100%;min-height:120px;padding:12px 14px;background:var(--surface-card);color:var(--text-strong);border:var(--border-w) solid var(--border-default);border-radius:var(--radius-control);font:var(--type-body);resize:vertical;transition:var(--transition-control)}
.ms-textarea::placeholder{color:var(--n-400)}
.ms-textarea:hover:not(:disabled){border-color:var(--border-strong)}
.ms-textarea:focus{outline:none;border-color:var(--accent-500);box-shadow:var(--shadow-ring-focus)}
.ms-textarea--invalid{border-color:var(--status-danger)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-textarea-css")) {
  const el = document.createElement("style"); el.id = "ms-textarea-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Textarea({ label, hint, error, rows = 4, required = false, id, className = "", ...rest }) {
  const autoId = React.useId ? React.useId() : "ms-textarea";
  const fieldId = id || autoId;
  return (
    <div className={["ms-field", className].filter(Boolean).join(" ")}>
      {label && <label className="ms-field__label" htmlFor={fieldId}>{label}{required && <span className="ms-field__req">*</span>}</label>}
      <textarea id={fieldId} rows={rows} required={required} aria-invalid={error ? true : undefined}
        className={["ms-textarea", error ? "ms-textarea--invalid" : ""].filter(Boolean).join(" ")} {...rest} />
      {error ? <span className="ms-field__error">{error}</span> : hint ? <span className="ms-field__hint">{hint}</span> : null}
    </div>
  );
}
