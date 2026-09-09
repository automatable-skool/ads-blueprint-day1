import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.ms-faq{border-bottom:var(--border-w) solid var(--border-subtle)}
.ms-faq__q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:var(--space-5);padding:var(--space-6) 0;background:none;border:0;text-align:left;cursor:pointer;font:var(--fw-semibold) var(--fs-body-lg)/1.4 var(--font-core);letter-spacing:-0.01em;color:var(--text-strong)}
.ms-faq__q:hover{color:var(--accent-600)}
.ms-faq__chev{flex:none;color:var(--text-muted);transition:transform var(--dur-base) var(--ease-out)}
.ms-faq.is-open .ms-faq__chev{transform:rotate(180deg)}
.ms-faq__a{overflow:hidden;max-height:0;transition:max-height var(--dur-slow) var(--ease-out)}
.ms-faq.is-open .ms-faq__a{max-height:420px}
.ms-faq__a-inner{padding-bottom:var(--space-6);font:var(--type-body);color:var(--text-body);max-width:60ch}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-faq-css")) {
  const el = document.createElement("style"); el.id = "ms-faq-css"; el.textContent = __css; document.head.appendChild(el);
}

export function FAQItem({ question, answer, defaultOpen = false, open, onToggle, className = "", ...rest }) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open !== undefined ? open : internal;
  return (
    <div className={["ms-faq", isOpen ? "is-open" : "", className].filter(Boolean).join(" ")} {...rest}>
      <button type="button" className="ms-faq__q" aria-expanded={isOpen}
        onClick={() => { if (open === undefined) setInternal(!isOpen); onToggle && onToggle(!isOpen); }}>
        {question}
        <span className="ms-faq__chev"><Icon name="chevron-down" size={20} /></span>
      </button>
      <div className="ms-faq__a"><div className="ms-faq__a-inner">{answer}</div></div>
    </div>
  );
}
