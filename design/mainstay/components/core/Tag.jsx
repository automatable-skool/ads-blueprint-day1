import React from "react";
import { Icon } from "./Icon.jsx";

const CSS = `
.ms-tag{display:inline-flex;align-items:center;gap:6px;height:32px;padding-inline:12px;border-radius:var(--radius-sm);background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);color:var(--text-body);font:var(--fw-medium) var(--fs-small)/1 var(--font-core);transition:var(--transition-control)}
.ms-tag--selectable{cursor:pointer}
.ms-tag--selectable:hover{border-color:var(--border-strong);color:var(--text-strong)}
.ms-tag--selected{background:var(--accent-50);border-color:var(--accent-300);color:var(--accent-700)}
.ms-tag__x{display:inline-flex;margin-right:-4px;padding:4px;border:0;background:none;color:inherit;opacity:.6;cursor:pointer;border-radius:var(--radius-xs)}
.ms-tag__x:hover{opacity:1;background:rgba(17,19,18,.06)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-tag-css")) {
  const el = document.createElement("style"); el.id = "ms-tag-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Tag({ children, icon, selected = false, onSelect, onRemove, className = "", ...rest }) {
  const selectable = Boolean(onSelect);
  const Tag_ = selectable ? "button" : "span";
  return (
    <Tag_
      type={selectable ? "button" : undefined}
      onClick={onSelect}
      aria-pressed={selectable ? selected : undefined}
      className={["ms-tag", selectable ? "ms-tag--selectable" : "", selected ? "ms-tag--selected" : "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
      {onRemove && (
        <button type="button" className="ms-tag__x" aria-label="Remove" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>
          <Icon name="x" size={13} />
        </button>
      )}
    </Tag_>
  );
}
