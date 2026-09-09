import React from "react";

const CSS = `
.ms-sh{display:flex;flex-direction:column;gap:var(--space-4);max-width:640px}
.ms-sh--center{align-items:center;text-align:center;margin-inline:auto}
.ms-sh__eyebrow{font:var(--type-eyebrow);letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--text-accent)}
.ms-sh__title{font:var(--type-h2);letter-spacing:var(--ls-heading);color:var(--text-strong)}
.ms-sh__lead{font:var(--type-lead);color:var(--text-body)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-sectionheading-css")) {
  const el = document.createElement("style"); el.id = "ms-sectionheading-css"; el.textContent = __css; document.head.appendChild(el);
}

export function SectionHeading({ eyebrow, title, lead, align = "left", as = "h2", className = "", ...rest }) {
  const Title = as;
  return (
    <div className={["ms-sh", align === "center" ? "ms-sh--center" : "", className].filter(Boolean).join(" ")} {...rest}>
      {eyebrow && <span className="ms-sh__eyebrow">{eyebrow}</span>}
      <Title className="ms-sh__title">{title}</Title>
      {lead && <p className="ms-sh__lead">{lead}</p>}
    </div>
  );
}
