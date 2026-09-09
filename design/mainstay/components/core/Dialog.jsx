import React from "react";
import { IconButton } from "./IconButton.jsx";

const CSS = `
.ms-dialog__scrim{position:fixed;inset:0;z-index:60;background:rgba(17,19,18,.42);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:var(--space-7);animation:ms-dialog-in var(--dur-base) var(--ease-out)}
.ms-dialog{position:relative;width:100%;max-width:520px;background:var(--surface-card);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);padding:var(--space-8);animation:ms-dialog-rise var(--dur-base) var(--ease-out)}
.ms-dialog--wide{max-width:760px}
.ms-dialog__close{position:absolute;top:14px;right:14px}
.ms-dialog__title{font:var(--type-h3);letter-spacing:var(--ls-heading);color:var(--text-strong);padding-right:36px}
.ms-dialog__desc{margin-top:var(--space-3);color:var(--text-body)}
.ms-dialog__body{margin-top:var(--space-6)}
.ms-dialog__footer{display:flex;justify-content:flex-end;gap:var(--space-4);margin-top:var(--space-8)}
@keyframes ms-dialog-in{from{opacity:0}to{opacity:1}}
@keyframes ms-dialog-rise{from{opacity:0;transform:translateY(8px) scale(.99)}to{opacity:1;transform:none}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-dialog-css")) {
  const el = document.createElement("style"); el.id = "ms-dialog-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Dialog({ open, onClose, title, description, children, footer, size = "md" }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="ms-dialog__scrim" onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : undefined} className={"ms-dialog" + (size === "lg" ? " ms-dialog--wide" : "")}>
        {onClose && <span className="ms-dialog__close"><IconButton icon="x" label="Close" size="sm" onClick={onClose} /></span>}
        {title && <div className="ms-dialog__title">{title}</div>}
        {description && <p className="ms-dialog__desc">{description}</p>}
        {children && <div className="ms-dialog__body">{children}</div>}
        {footer && <div className="ms-dialog__footer">{footer}</div>}
      </div>
    </div>
  );
}
