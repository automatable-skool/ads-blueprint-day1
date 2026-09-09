import React from "react";

export function Card({ children, padding = "md", elevation = "sm", accent = false, as = "div", style, ...rest }) {
  const Tag = as;
  const pads = { none: 0, sm: "var(--space-5)", md: "var(--pad-card)", lg: "var(--pad-card-lg)" };
  return (
    <Tag
      style={{
        background: "var(--surface-card)", border: "var(--border-hairline) solid var(--line-hairline)",
        borderRadius: "var(--radius-card)", padding: pads[padding],
        boxShadow: elevation === "none" ? "none" : `var(--shadow-${elevation})`,
        borderTop: accent ? "3px solid var(--surface-accent)" : undefined,
        ...style
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
