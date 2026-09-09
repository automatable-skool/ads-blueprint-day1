import React from "react";
import { Button } from "../core/Button.jsx";

const CSS = `
.ms-cta{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-8);padding:var(--space-10) var(--space-10);border-radius:var(--radius-xl);background:var(--surface-sunken)}
.ms-cta--accent{background:var(--accent-50)}
.ms-cta--ink{background:var(--surface-inverse)}
.ms-cta--ink .ms-cta__title{color:var(--text-inverse)}
.ms-cta--ink .ms-cta__lead{color:rgba(255,255,255,.72)}
.ms-cta__title{font:var(--type-h2);letter-spacing:var(--ls-heading);color:var(--text-strong);max-width:22ch}
.ms-cta__lead{margin-top:var(--space-4);font:var(--type-lead);color:var(--text-body);max-width:46ch}
.ms-cta__actions{display:flex;flex-wrap:wrap;gap:var(--space-4)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-cta-css")) {
  const el = document.createElement("style"); el.id = "ms-cta-css"; el.textContent = __css; document.head.appendChild(el);
}

export function CTABanner({ title, lead, primaryLabel = "Get a free quote", primaryHref, secondaryLabel, secondaryHref, tone = "sunken", className = "", ...rest }) {
  return (
    <section className={["ms-cta", "ms-cta--" + tone, className].filter(Boolean).join(" ")} {...rest}>
      <div>
        <h2 className="ms-cta__title">{title}</h2>
        {lead && <p className="ms-cta__lead">{lead}</p>}
      </div>
      <div className="ms-cta__actions">
        <Button size="lg" href={primaryHref} iconRight="arrow-right">{primaryLabel}</Button>
        {secondaryLabel && (
          <Button size="lg" variant={tone === "ink" ? "ghost" : "outline"} href={secondaryHref}
            style={tone === "ink" ? { color: "var(--text-inverse)", borderColor: "var(--border-inverse)" } : undefined}>
            {secondaryLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
