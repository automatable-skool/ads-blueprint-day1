import React from "react";

const CSS = `
.ms-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:var(--space-8)}
.ms-stats--bordered{border-top:var(--border-w) solid var(--border-subtle);border-bottom:var(--border-w) solid var(--border-subtle);padding-block:var(--space-8)}
.ms-stat__value{font:var(--fw-bold) var(--fs-h1)/1 var(--font-core);letter-spacing:var(--ls-display);color:var(--text-strong)}
.ms-stat__label{margin-top:8px;font:var(--type-small);color:var(--text-muted)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-statblock-css")) {
  const el = document.createElement("style"); el.id = "ms-statblock-css"; el.textContent = __css; document.head.appendChild(el);
}

export function StatBlock({ stats = [], bordered = false, className = "", ...rest }) {
  return (
    <div className={["ms-stats", bordered ? "ms-stats--bordered" : "", className].filter(Boolean).join(" ")} {...rest}>
      {stats.map((s, i) => (
        <div key={i}>
          <div className="ms-stat__value">{s.value}</div>
          <div className="ms-stat__label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
