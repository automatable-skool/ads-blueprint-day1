import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.ms-stars{display:inline-flex;align-items:center;gap:2px}
.ms-stars__on{color:var(--star-filled)}
.ms-stars__off{color:var(--star-empty)}
.ms-stars__label{margin-left:8px;font:var(--fw-medium) var(--fs-small)/1 var(--font-core);color:var(--text-body)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-stars-css")) {
  const el = document.createElement("style"); el.id = "ms-stars-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Stars({ rating = 5, size = 16, label, className = "", ...rest }) {
  const full = Math.round(rating);
  return (
    <span className={["ms-stars", className].filter(Boolean).join(" ")} aria-label={label || rating + " out of 5"} {...rest}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={i < full ? "ms-stars__on" : "ms-stars__off"}>
          <svg viewBox="0 0 24 24" width={size} height={size} fill={i < full ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "block" }}>
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </svg>
        </span>
      ))}
      {label && <span className="ms-stars__label">{label}</span>}
    </span>
  );
}
