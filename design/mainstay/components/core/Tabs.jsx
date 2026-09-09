import React from "react";

const CSS = `
.ms-tabs{display:flex;gap:var(--space-3);border-bottom:var(--border-w) solid var(--border-subtle)}
.ms-tabs__tab{position:relative;background:none;border:0;padding:12px 4px 14px;font:var(--fw-semibold) var(--fs-body)/1 var(--font-core);color:var(--text-muted);cursor:pointer;transition:color var(--dur-fast) var(--ease-out)}
.ms-tabs__tab+.ms-tabs__tab{margin-left:var(--space-6)}
.ms-tabs__tab:hover{color:var(--text-strong)}
.ms-tabs__tab[aria-selected="true"]{color:var(--text-strong)}
.ms-tabs__tab[aria-selected="true"]::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--accent-500);border-radius:2px}
.ms-tabs__tab:focus-visible{outline:none;box-shadow:var(--shadow-ring-focus);border-radius:var(--radius-xs)}
.ms-tabs--pill{border:0;gap:var(--space-2);background:var(--surface-muted);padding:4px;border-radius:var(--radius-pill);display:inline-flex}
.ms-tabs--pill .ms-tabs__tab{padding:9px 18px;border-radius:var(--radius-pill);margin:0!important;font-size:var(--fs-small)}
.ms-tabs--pill .ms-tabs__tab[aria-selected="true"]{background:var(--surface-card);box-shadow:var(--shadow-xs)}
.ms-tabs--pill .ms-tabs__tab[aria-selected="true"]::after{display:none}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-tabs-css")) {
  const el = document.createElement("style"); el.id = "ms-tabs-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Tabs({ items = [], value, defaultValue, onChange, variant = "underline", className = "", ...rest }) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id);
  const active = value !== undefined ? value : internal;
  const select = (id) => { if (value === undefined) setInternal(id); onChange && onChange(id); };
  return (
    <div role="tablist" className={["ms-tabs", variant === "pill" ? "ms-tabs--pill" : "", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((it) => (
        <button key={it.id} role="tab" type="button" aria-selected={active === it.id} className="ms-tabs__tab" onClick={() => select(it.id)}>
          {it.label}
        </button>
      ))}
    </div>
  );
}
