import React from "react";
import { Icon } from "./Icon.jsx";

const sizes = { sm: 30, md: 38, lg: 46 };
const glyph = { sm: 16, md: 18, lg: 20 };

export function IconButton({ name, label, size = "md", variant = "secondary", disabled = false, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const tone = {
    secondary: { background: "var(--surface-card)", border: "var(--border-hairline) solid var(--line-strong)", color: "var(--text-strong)" },
    ghost: { background: "transparent", border: "var(--border-hairline) solid transparent", color: "var(--text-body)" },
    brand: { background: "var(--surface-brand)", border: "var(--border-hairline) solid var(--surface-brand)", color: "var(--text-inverse)" }
  }[variant];
  const hoverTone = { secondary: { background: "var(--ink-50)" }, ghost: { background: "var(--ink-100)" }, brand: { background: "var(--blue-600)" } }[variant];
  return (
    <button
      type="button" aria-label={label} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: sizes[size], height: sizes[size], display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-control)", cursor: disabled ? "not-allowed" : "pointer",
        transition: "var(--transition-control)", opacity: disabled ? 0.45 : 1,
        ...tone, ...(hover && !disabled ? hoverTone : null), ...style
      }}
      {...rest}
    >
      <Icon name={name} size={glyph[size]} />
    </button>
  );
}
