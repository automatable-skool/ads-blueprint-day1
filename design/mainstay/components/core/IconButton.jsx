import React from "react";
import { Icon } from "./Icon.jsx";

const CSS = `
.ms-iconbtn{display:inline-flex;align-items:center;justify-content:center;border:var(--border-w) solid transparent;border-radius:var(--radius-control);background:transparent;color:var(--text-strong);cursor:pointer;transition:var(--transition-control)}
.ms-iconbtn:focus-visible{outline:none;box-shadow:var(--shadow-ring-focus)}
.ms-iconbtn:not(:disabled):active{transform:scale(var(--press-scale))}
.ms-iconbtn:disabled{opacity:.45;cursor:not-allowed}
.ms-iconbtn--sm{width:36px;height:36px}
.ms-iconbtn--md{width:44px;height:44px}
.ms-iconbtn--lg{width:52px;height:52px}
.ms-iconbtn--ghost:not(:disabled):hover{background:var(--action-quiet-hover)}
.ms-iconbtn--outline{border-color:var(--border-default);background:var(--surface-card)}
.ms-iconbtn--outline:not(:disabled):hover{background:var(--n-50);border-color:var(--border-strong)}
.ms-iconbtn--primary{background:var(--action-primary);color:var(--action-primary-text)}
.ms-iconbtn--primary:not(:disabled):hover{background:var(--action-primary-hover)}
.ms-iconbtn--round{border-radius:var(--radius-pill)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-iconbutton-css")) {
  const el = document.createElement("style"); el.id = "ms-iconbutton-css"; el.textContent = __css; document.head.appendChild(el);
}

export function IconButton({ icon, label, variant = "ghost", size = "md", round = false, className = "", ...rest }) {
  const iconSize = size === "lg" ? 24 : size === "sm" ? 18 : 20;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={["ms-iconbtn", "ms-iconbtn--" + variant, "ms-iconbtn--" + size, round ? "ms-iconbtn--round" : "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
}
