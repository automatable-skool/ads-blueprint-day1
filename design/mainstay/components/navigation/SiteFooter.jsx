import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.ms-footer{background:var(--surface-sunken);border-top:var(--border-w) solid var(--border-subtle);padding-block:var(--space-11) var(--space-8)}
.ms-footer__in{max-width:var(--container-max);margin-inline:auto;padding-inline:var(--gutter)}
.ms-footer__grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:var(--space-9)}
.ms-footer__brand{font:var(--fw-bold) 1.25rem/1 var(--font-core);letter-spacing:-0.035em;color:var(--text-strong)}
.ms-footer__brand em{font-style:normal;color:var(--accent-500)}
.ms-footer__blurb{margin-top:var(--space-4);font:var(--type-small);color:var(--text-body);max-width:34ch}
.ms-footer__contact{margin-top:var(--space-6);display:flex;flex-direction:column;gap:10px}
.ms-footer__contact a{display:inline-flex;align-items:center;gap:9px;font:var(--fw-medium) var(--fs-small)/1.3 var(--font-core);color:var(--text-strong);text-decoration:none}
.ms-footer__contact svg{color:var(--accent-500)}
.ms-footer__h{font:var(--type-eyebrow);letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--text-muted)}
.ms-footer__list{margin-top:var(--space-5);display:flex;flex-direction:column;gap:12px}
.ms-footer__list a{font:var(--fw-regular) var(--fs-small)/1.3 var(--font-core);color:var(--text-body);text-decoration:none}
.ms-footer__list a:hover{color:var(--text-strong)}
.ms-footer__bottom{margin-top:var(--space-11);padding-top:var(--space-6);border-top:var(--border-w) solid var(--border-subtle);display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--space-4);font:var(--fw-regular) var(--fs-caption)/1.4 var(--font-core);color:var(--text-muted)}
@media (max-width:820px){.ms-footer__grid{grid-template-columns:1fr 1fr}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-sitefooter-css")) {
  const el = document.createElement("style"); el.id = "ms-sitefooter-css"; el.textContent = __css; document.head.appendChild(el);
}

export function SiteFooter({
  brand = "Mainstay", brandAccent,
  blurb = "Licensed trades and professional services for homes and businesses across the county. Family-run since 2009.",
  phone = "(555) 018 2244", email = "hello@mainstay.co", address = "14 Foundry Row, Ashbourne",
  columns = [], legal = "© 2026 Mainstay Services Ltd. Licence #TR-448201.", licence,
  className = "", ...rest
}) {
  return (
    <footer className={["ms-footer", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ms-footer__in">
        <div className="ms-footer__grid">
          <div>
            <div className="ms-footer__brand">{brand}{brandAccent && <em>{brandAccent}</em>}</div>
            <p className="ms-footer__blurb">{blurb}</p>
            <div className="ms-footer__contact">
              <a href={"tel:" + phone.replace(/[^0-9+]/g, "")}><Icon name="phone" size={16} />{phone}</a>
              <a href={"mailto:" + email}><Icon name="mail" size={16} />{email}</a>
              <a href="#"><Icon name="map-pin" size={16} />{address}</a>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="ms-footer__h">{col.title}</div>
              <div className="ms-footer__list">
                {col.links.map((l) => <a key={l.label} href={l.href || "#"}>{l.label}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="ms-footer__bottom"><span>{legal}</span>{licence && <span>{licence}</span>}</div>
      </div>
    </footer>
  );
}
