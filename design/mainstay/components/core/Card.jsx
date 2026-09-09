import React from "react";

const CSS = `
.ms-card{display:block;background:var(--surface-card);border-radius:var(--radius-card);border:var(--border-w) solid var(--border-subtle);transition:var(--transition-card);text-decoration:none;color:inherit}
.ms-card--elevated{box-shadow:var(--shadow-card);border-color:transparent}
.ms-card--sunken{background:var(--surface-sunken);border-color:transparent}
.ms-card--accent{background:var(--surface-accent-soft);border-color:var(--accent-100)}
.ms-card--interactive{cursor:pointer}
.ms-card--interactive:hover{box-shadow:var(--shadow-card-hover);transform:translateY(-2px);border-color:var(--border-default)}
.ms-card--interactive:active{transform:translateY(0)}
.ms-card--interactive:focus-visible{outline:none;box-shadow:var(--shadow-ring-focus)}
.ms-card--p4{padding:var(--space-5)}
.ms-card--p5{padding:var(--space-7)}
.ms-card--p6{padding:var(--space-8)}
.ms-card--p0{padding:0}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-card-css")) {
  const el = document.createElement("style"); el.id = "ms-card-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Card({ children, variant = "outline", padding = "md", interactive = false, href, as, className = "", ...rest }) {
  const pad = { none: "p0", sm: "p4", md: "p5", lg: "p6" }[padding] || "p5";
  const Tag = href ? "a" : as || "div";
  return (
    <Tag
      href={href}
      className={["ms-card", "ms-card--" + variant, "ms-card--" + pad, interactive || href ? "ms-card--interactive" : "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
