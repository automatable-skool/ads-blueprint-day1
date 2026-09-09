import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Dialog({ open = true, title, description, children, footer, onClose, width = 480 }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title}
      style={{ position: "absolute", inset: 0, background: "var(--surface-overlay)", backdropFilter: "var(--overlay-blur)", display: "grid", placeItems: "center", padding: "var(--space-7)", zIndex: 40 }}>
      <div style={{ width: "100%", maxWidth: width, background: "var(--surface-card)", borderRadius: "var(--radius-sheet)", boxShadow: "var(--shadow-lg)", border: "var(--border-hairline) solid var(--line-hairline)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-5)", padding: "var(--space-7) var(--space-7) var(--space-5)" }}>
          <div style={{ display: "grid", gap: "6px" }}>
            <h3 style={{ font: "var(--type-h3)", color: "var(--text-strong)", margin: 0 }}>{title}</h3>
            {description ? <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", margin: 0 }}>{description}</p> : null}
          </div>
          {onClose ? (
            <button type="button" aria-label="Close" onClick={onClose}
              style={{ marginLeft: "auto", background: "none", border: 0, cursor: "pointer", color: "var(--text-faint)", display: "flex", padding: 4 }}>
              <Icon name="x" size={18} />
            </button>
          ) : null}
        </div>
        {children ? <div style={{ padding: "0 var(--space-7) var(--space-7)", font: "var(--type-body)", color: "var(--text-body)" }}>{children}</div> : null}
        {footer ? (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-3)", padding: "var(--space-5) var(--space-7)", borderTop: "var(--border-hairline) solid var(--line-hairline)", background: "var(--ink-50)" }}>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
