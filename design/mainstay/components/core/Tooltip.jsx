import React from "react";

const CSS = `
.ms-tt{position:relative;display:inline-flex}
.ms-tt__bubble{position:absolute;z-index:40;left:50%;transform:translateX(-50%);background:var(--surface-inverse);color:var(--text-inverse);font:var(--fw-medium) var(--fs-caption)/1.35 var(--font-core);padding:7px 10px;border-radius:var(--radius-sm);box-shadow:var(--shadow-md);max-width:220px;text-align:center;pointer-events:none;opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.ms-tt__bubble--top{bottom:calc(100% + 8px)}
.ms-tt__bubble--bottom{top:calc(100% + 8px)}
.ms-tt.is-open .ms-tt__bubble{opacity:1}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-tooltip-css")) {
  const el = document.createElement("style"); el.id = "ms-tooltip-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Tooltip({ children, content, placement = "top", className = "", ...rest }) {
  const [open, setOpen] = React.useState(false);
  return (
    <span
      className={["ms-tt", open ? "is-open" : "", className].filter(Boolean).join(" ")}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...rest}
    >
      {children}
      <span role="tooltip" className={"ms-tt__bubble ms-tt__bubble--" + placement}>{content}</span>
    </span>
  );
}
