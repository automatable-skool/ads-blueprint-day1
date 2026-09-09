import React from "react";
import { Icon } from "./Icon.jsx";

const CSS = `
.ms-badge{display:inline-flex;align-items:center;gap:6px;height:26px;padding-inline:10px;border-radius:var(--radius-pill);font:var(--fw-semibold) var(--fs-caption)/1 var(--font-core);border:var(--border-w) solid transparent;white-space:nowrap}
.ms-badge--lg{height:32px;padding-inline:14px;font-size:var(--fs-small)}
.ms-badge--soft.is-neutral{background:var(--n-100);color:var(--n-700)}
.ms-badge--soft.is-accent{background:var(--accent-50);color:var(--accent-700)}
.ms-badge--soft.is-success{background:var(--status-success-soft);color:var(--status-success)}
.ms-badge--soft.is-warning{background:var(--status-warning-soft);color:var(--status-warning)}
.ms-badge--soft.is-danger{background:var(--status-danger-soft);color:var(--status-danger)}
.ms-badge--soft.is-info{background:var(--status-info-soft);color:var(--status-info)}
.ms-badge--solid.is-neutral{background:var(--n-900);color:var(--n-0)}
.ms-badge--solid.is-accent{background:var(--accent-500);color:var(--n-0)}
.ms-badge--solid.is-success{background:var(--status-success);color:var(--n-0)}
.ms-badge--solid.is-warning{background:var(--status-warning);color:var(--n-0)}
.ms-badge--solid.is-danger{background:var(--status-danger);color:var(--n-0)}
.ms-badge--solid.is-info{background:var(--status-info);color:var(--n-0)}
.ms-badge--outline{background:var(--surface-card);border-color:var(--border-default);color:var(--text-body)}
.ms-badge--outline.is-accent{border-color:var(--accent-200);color:var(--accent-700)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-badge-css")) {
  const el = document.createElement("style"); el.id = "ms-badge-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Badge({ children, tone = "neutral", variant = "soft", size = "md", icon, className = "", ...rest }) {
  return (
    <span className={["ms-badge", "ms-badge--" + variant, "is-" + tone, size === "lg" ? "ms-badge--lg" : "", className].filter(Boolean).join(" ")} {...rest}>
      {icon && <Icon name={icon} size={size === "lg" ? 16 : 14} />}
      {children}
    </span>
  );
}
