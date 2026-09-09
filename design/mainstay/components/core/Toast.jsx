import React from "react";
import { Icon } from "./Icon.jsx";
import { IconButton } from "./IconButton.jsx";

const CSS = `
.ms-toast{display:flex;gap:var(--space-4);align-items:flex-start;width:100%;max-width:420px;background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-md);box-shadow:var(--shadow-lg);padding:var(--space-5)}
.ms-toast__icon{margin-top:1px}
.ms-toast.is-success .ms-toast__icon{color:var(--status-success)}
.ms-toast.is-danger .ms-toast__icon{color:var(--status-danger)}
.ms-toast.is-warning .ms-toast__icon{color:var(--status-warning)}
.ms-toast.is-info .ms-toast__icon{color:var(--status-info)}
.ms-toast__title{font:var(--fw-semibold) var(--fs-body)/1.35 var(--font-core);color:var(--text-strong)}
.ms-toast__msg{margin-top:3px;font:var(--type-small);color:var(--text-body)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-toast-css")) {
  const el = document.createElement("style"); el.id = "ms-toast-css"; el.textContent = __css; document.head.appendChild(el);
}

const TONE_ICON = { success: "circle-check", danger: "triangle-alert", warning: "triangle-alert", info: "info" };

export function Toast({ tone = "success", title, message, onDismiss, className = "", ...rest }) {
  return (
    <div role="status" className={["ms-toast", "is-" + tone, className].filter(Boolean).join(" ")} {...rest}>
      <span className="ms-toast__icon"><Icon name={TONE_ICON[tone] || "info"} size={20} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div className="ms-toast__title">{title}</div>}
        {message && <div className="ms-toast__msg">{message}</div>}
      </div>
      {onDismiss && <IconButton icon="x" label="Dismiss" size="sm" onClick={onDismiss} />}
    </div>
  );
}
