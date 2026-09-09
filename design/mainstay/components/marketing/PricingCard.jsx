import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Button } from "../core/Button.jsx";
import { Badge } from "../core/Badge.jsx";

const CSS = `
.ms-price{display:flex;flex-direction:column;gap:var(--space-5);padding:var(--space-8);background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-card)}
.ms-price--featured{border-color:var(--accent-300);box-shadow:var(--shadow-md)}
.ms-price__head{display:flex;align-items:center;justify-content:space-between;gap:var(--space-4)}
.ms-price__name{font:var(--fw-semibold) var(--fs-h4)/1.2 var(--font-core);color:var(--text-strong)}
.ms-price__amount{font:var(--fw-bold) var(--fs-h1)/1 var(--font-core);letter-spacing:var(--ls-display);color:var(--text-strong)}
.ms-price__unit{font:var(--fw-medium) var(--fs-small)/1 var(--font-core);color:var(--text-muted);margin-left:6px}
.ms-price__note{font:var(--type-small);color:var(--text-body)}
.ms-price__list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--space-4)}
.ms-price__list li{display:flex;gap:10px;font:var(--type-small);color:var(--text-body)}
.ms-price__list svg{color:var(--accent-500);margin-top:2px}
.ms-price__foot{margin-top:auto;padding-top:var(--space-3)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-pricing-css")) {
  const el = document.createElement("style"); el.id = "ms-pricing-css"; el.textContent = __css; document.head.appendChild(el);
}

export function PricingCard({ name, amount, unit, note, features = [], featured = false, badge, ctaLabel = "Book this", ctaHref, className = "", ...rest }) {
  return (
    <div className={["ms-price", featured ? "ms-price--featured" : "", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ms-price__head">
        <span className="ms-price__name">{name}</span>
        {badge && <Badge tone="accent" variant="soft">{badge}</Badge>}
      </div>
      <div><span className="ms-price__amount">{amount}</span>{unit && <span className="ms-price__unit">{unit}</span>}</div>
      {note && <p className="ms-price__note">{note}</p>}
      <ul className="ms-price__list">
        {features.map((f, i) => <li key={i}><Icon name="check" size={16} strokeWidth={2.5} />{f}</li>)}
      </ul>
      <div className="ms-price__foot">
        <Button fullWidth variant={featured ? "primary" : "outline"} href={ctaHref}>{ctaLabel}</Button>
      </div>
    </div>
  );
}
