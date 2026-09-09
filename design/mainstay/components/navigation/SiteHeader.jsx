import React from "react";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";

const CSS = `
.ms-header{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.86);backdrop-filter:saturate(160%) blur(12px);border-bottom:var(--border-w) solid var(--border-subtle)}
.ms-header__strip{background:var(--surface-inverse);color:rgba(255,255,255,.82);font:var(--fw-medium) var(--fs-caption)/1 var(--font-core)}
.ms-header__strip-in{display:flex;align-items:center;justify-content:space-between;gap:var(--space-6);height:38px;max-width:var(--container-max);margin-inline:auto;padding-inline:var(--gutter)}
.ms-header__strip span{display:inline-flex;align-items:center;gap:7px}
.ms-header__bar{display:flex;align-items:center;gap:var(--space-8);height:76px;max-width:var(--container-max);margin-inline:auto;padding-inline:var(--gutter)}
.ms-header__brand{font:var(--fw-bold) 1.3125rem/1 var(--font-core);letter-spacing:-0.035em;color:var(--text-strong);text-decoration:none;white-space:nowrap}
.ms-header__brand em{font-style:normal;color:var(--accent-500)}
.ms-header__nav{display:flex;align-items:center;gap:var(--space-7);margin-left:var(--space-4)}
.ms-header__link{font:var(--fw-medium) var(--fs-small)/1 var(--font-core);color:var(--text-body);text-decoration:none;padding:8px 0;transition:color var(--dur-fast) var(--ease-out)}
.ms-header__link:hover,.ms-header__link[aria-current="page"]{color:var(--text-strong)}
.ms-header__link[aria-current="page"]{font-weight:var(--fw-semibold)}
.ms-header__right{margin-left:auto;display:flex;align-items:center;gap:var(--space-5)}
.ms-header__phone{display:inline-flex;align-items:center;gap:8px;font:var(--fw-semibold) var(--fs-body)/1 var(--font-core);color:var(--text-strong);text-decoration:none}
.ms-header__phone svg{color:var(--accent-500)}
.ms-header__burger{display:none}
@media (max-width:900px){.ms-header__nav{display:none}.ms-header__burger{display:inline-flex}.ms-header__phone span{display:none}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-siteheader-css")) {
  const el = document.createElement("style"); el.id = "ms-siteheader-css"; el.textContent = __css; document.head.appendChild(el);
}

export function SiteHeader({
  brand = "Mainstay",
  brandAccent,
  links = [{ label: "Services", href: "#" }, { label: "About", href: "#" }, { label: "Reviews", href: "#" }, { label: "Contact", href: "#" }],
  activeHref,
  phone = "(555) 018 2244",
  ctaLabel = "Get a free quote",
  onCta, onNavigate, note = "Same-day callouts · Licensed & insured",
  hours = "Mon–Sat, 7am–6pm",
  className = "", ...rest
}) {
  return (
    <header className={["ms-header", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ms-header__strip">
        <div className="ms-header__strip-in">
          <span><Icon name="badge-check" size={14} />{note}</span>
          <span><Icon name="clock" size={14} />{hours}</span>
        </div>
      </div>
      <div className="ms-header__bar">
        <a className="ms-header__brand" href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(links[0] && "#home"); }}>
          {brand}{brandAccent && <em>{brandAccent}</em>}
        </a>
        <nav className="ms-header__nav">
          {links.map((l) => (
            <a key={l.href + l.label} className="ms-header__link" href={l.href}
              aria-current={activeHref === l.href ? "page" : undefined}
              onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(l.href); } }}>{l.label}</a>
          ))}
        </nav>
        <div className="ms-header__right">
          <a className="ms-header__phone" href={"tel:" + phone.replace(/[^0-9+]/g, "")}>
            <Icon name="phone" size={17} /><span>{phone}</span>
          </a>
          <Button onClick={onCta}>{ctaLabel}</Button>
          <span className="ms-header__burger"><IconButton icon="menu" label="Menu" variant="outline" /></span>
        </div>
      </div>
    </header>
  );
}
