import React from "react";
import { Icon } from "./Icon.jsx";

const CSS = `
.ms-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font:var(--type-button);letter-spacing:-0.01em;border:var(--border-w) solid transparent;border-radius:var(--radius-control);cursor:pointer;text-decoration:none;white-space:nowrap;transition:var(--transition-control);-webkit-tap-highlight-color:transparent}
.ms-btn:disabled,.ms-btn[aria-disabled="true"]{cursor:not-allowed;opacity:.45}
.ms-btn:not(:disabled):active{transform:scale(var(--press-scale))}
.ms-btn:focus-visible{outline:none;box-shadow:var(--shadow-ring-focus)}
.ms-btn--sm{height:var(--control-h-sm);padding-inline:var(--control-px-sm);font-size:var(--fs-small)}
.ms-btn--md{height:var(--control-h-md);padding-inline:var(--control-px-md)}
.ms-btn--lg{height:var(--control-h-lg);padding-inline:var(--control-px-lg);font-size:var(--fs-body-lg)}
.ms-btn--primary{background:var(--action-primary);color:var(--action-primary-text);box-shadow:var(--shadow-xs)}
.ms-btn--primary:not(:disabled):hover{background:var(--action-primary-hover)}
.ms-btn--primary:not(:disabled):active{background:var(--action-primary-press)}
.ms-btn--secondary{background:var(--action-secondary);color:var(--text-inverse)}
.ms-btn--secondary:not(:disabled):hover{background:var(--action-secondary-hover)}
.ms-btn--outline{background:var(--surface-card);color:var(--text-strong);border-color:var(--border-default)}
.ms-btn--outline:not(:disabled):hover{background:var(--n-50);border-color:var(--border-strong)}
.ms-btn--ghost{background:transparent;color:var(--text-strong)}
.ms-btn--ghost:not(:disabled):hover{background:var(--action-quiet-hover)}
.ms-btn--link{background:transparent;color:var(--text-link);height:auto;padding:0;border-radius:var(--radius-xs)}
.ms-btn--link:not(:disabled):hover{color:var(--text-link-hover);text-decoration:underline;text-underline-offset:3px}
.ms-btn--block{display:flex;width:100%}
.ms-btn__spin{animation:ms-btn-spin .9s linear infinite}
@keyframes ms-btn-spin{to{transform:rotate(360deg)}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-button-css")) {
  const el = document.createElement("style"); el.id = "ms-button-css"; el.textContent = __css; document.head.appendChild(el);
}

export function Button({
  children, variant = "primary", size = "md", iconLeft, iconRight,
  fullWidth = false, loading = false, disabled = false, href, type = "button", className = "", ...rest
}) {
  const Tag = href ? "a" : "button";
  const iconSize = size === "lg" ? 22 : size === "sm" ? 16 : 18;
  const cls = ["ms-btn", "ms-btn--" + variant, "ms-btn--" + size, fullWidth ? "ms-btn--block" : "", className]
    .filter(Boolean).join(" ");
  return (
    <Tag
      className={cls}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled || loading}
      aria-disabled={href && (disabled || loading) ? true : undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Icon name="loader" size={iconSize} className="ms-btn__spin" />}
      {!loading && iconLeft && <Icon name={iconLeft} size={iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </Tag>
  );
}
