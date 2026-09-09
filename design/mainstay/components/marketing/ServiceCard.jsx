import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.ms-service{display:flex;flex-direction:column;gap:var(--space-4);padding:var(--space-7);background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-card);text-decoration:none;color:inherit;transition:var(--transition-card)}
a.ms-service:hover{box-shadow:var(--shadow-card-hover);transform:translateY(-2px);border-color:var(--border-default)}
.ms-service__icon{width:44px;height:44px;border-radius:var(--radius-md);background:var(--accent-50);color:var(--accent-600);display:flex;align-items:center;justify-content:center}
.ms-service__title{font:var(--fw-semibold) var(--fs-h4)/1.3 var(--font-core);letter-spacing:var(--ls-heading);color:var(--text-strong)}
.ms-service__body{font:var(--type-small);color:var(--text-body)}
.ms-service__meta{margin-top:auto;padding-top:var(--space-4);display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);border-top:var(--border-w) solid var(--border-subtle)}
.ms-service__price{font:var(--fw-semibold) var(--fs-small)/1 var(--font-core);color:var(--text-strong)}
.ms-service__cta{display:inline-flex;align-items:center;gap:6px;font:var(--fw-semibold) var(--fs-small)/1 var(--font-core);color:var(--text-link)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-servicecard-css")) {
  const el = document.createElement("style"); el.id = "ms-servicecard-css"; el.textContent = __css; document.head.appendChild(el);
}

export function ServiceCard({ icon = "wrench", title, description, price, cta = "Learn more", href, className = "", ...rest }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag href={href} className={["ms-service", className].filter(Boolean).join(" ")} {...rest}>
      <span className="ms-service__icon"><Icon name={icon} size={22} /></span>
      <span className="ms-service__title">{title}</span>
      {description && <span className="ms-service__body">{description}</span>}
      {(price || href) && (
        <span className="ms-service__meta">
          {price && <span className="ms-service__price">{price}</span>}
          {href && <span className="ms-service__cta">{cta}<Icon name="arrow-right" size={15} /></span>}
        </span>
      )}
    </Tag>
  );
}
