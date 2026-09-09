import React from "react";
import { Icon } from "./Icon.jsx";

export function Tag({ children, icon, onRemove, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 10px",
        border: "var(--border-hairline) solid var(--line-hairline)", background: "var(--surface-card)",
        borderRadius: "var(--radius-control)", font: "var(--type-body-sm)", color: "var(--text-body)", ...style
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={14} color="var(--text-muted)" /> : null}
      {children}
      {onRemove ? (
        <button type="button" aria-label="Remove" onClick={onRemove}
          style={{ border: 0, background: "none", padding: 0, cursor: "pointer", color: "var(--text-faint)", display: "flex" }}>
          <Icon name="x" size={13} />
        </button>
      ) : null}
    </span>
  );
}
