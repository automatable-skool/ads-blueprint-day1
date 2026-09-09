import React from "react";

const base = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
  font: "var(--type-button)", letterSpacing: "0.005em", borderRadius: "var(--radius-control)",
  border: "var(--border-hairline) solid transparent", cursor: "pointer", textDecoration: "none",
  transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
  whiteSpace: "nowrap", userSelect: "none"
};

const sizes = {
  sm: { minHeight: "var(--control-h-sm)", padding: "var(--pad-control-sm)", fontSize: "13px" },
  md: { minHeight: "var(--control-h)", padding: "var(--pad-control)" },
  lg: { minHeight: "var(--control-h-lg)", padding: "var(--pad-control-lg)", fontSize: "var(--size-body)" }
};

const variants = {
  primary: { background: "var(--surface-brand)", color: "var(--text-inverse)", borderColor: "var(--surface-brand)" },
  accent: { background: "var(--surface-accent)", color: "var(--text-on-accent)", borderColor: "var(--surface-accent)" },
  secondary: { background: "var(--surface-card)", color: "var(--text-strong)", borderColor: "var(--line-strong)" },
  ghost: { background: "transparent", color: "var(--text-brand)", borderColor: "transparent" },
  danger: { background: "var(--critical-500)", color: "var(--text-inverse)", borderColor: "var(--critical-500)" }
};

const hovers = {
  primary: { background: "var(--blue-500)", borderColor: "var(--blue-500)" },
  accent: { background: "var(--accent-700)", borderColor: "var(--accent-700)" },
  secondary: { background: "var(--ink-50)", borderColor: "var(--ink-400)" },
  ghost: { background: "var(--surface-brand-soft)" },
  danger: { background: "var(--critical-600)", borderColor: "var(--critical-600)" }
};

export function Button({
  children, variant = "primary", size = "md", block = false, disabled = false,
  href, iconLeft, iconRight, type = "button", onClick, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href ? "a" : "button";
  const css = {
    ...base, ...sizes[size], ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    ...(press && !disabled ? { transform: "translateY(var(--press-translate))", boxShadow: "var(--shadow-inset-press)" } : null),
    ...(disabled ? { opacity: 0.45, cursor: "not-allowed" } : null),
    width: block ? "100%" : undefined,
    ...style
  };
  return (
    <Tag
      href={href} type={href ? undefined : type} onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined} disabled={!href && disabled ? true : undefined}
      style={css}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      {...rest}
    >
      {iconLeft}{children}{iconRight}
    </Tag>
  );
}
