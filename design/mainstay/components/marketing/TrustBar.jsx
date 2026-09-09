import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.ms-trust{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-5) var(--space-9)}
.ms-trust--center{justify-content:center}
.ms-trust__item{display:inline-flex;align-items:center;gap:9px;font:var(--fw-medium) var(--fs-small)/1.2 var(--font-core);color:var(--text-body)}
.ms-trust__item svg{color:var(--accent-500)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-trustbar-css")) {
  const el = document.createElement("style"); el.id = "ms-trustbar-css"; el.textContent = __css; document.head.appendChild(el);
}

export function TrustBar({ items = [], align = "left", className = "", ...rest }) {
  return (
    <div className={["ms-trust", align === "center" ? "ms-trust--center" : "", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((it, i) => {
        const item = typeof it === "string" ? { label: it, icon: "circle-check" } : it;
        return (
          <span key={i} className="ms-trust__item">
            <Icon name={item.icon || "circle-check"} size={18} />
            {item.label}
          </span>
        );
      })}
    </div>
  );
}
