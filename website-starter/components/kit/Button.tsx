"use client";
// Copied from design/kit/components/core/Button.jsx - the kit's action pill.
// One addition: `href` renders the identical pill as an <a>, for tel: links
// and in-page anchors. Nothing else changed.
import React from "react";

const FILL = {
  primary: { bg: "var(--color-primary)", fg: "var(--color-on-primary)", hover: "var(--color-primary-active)", border: "transparent" },
  secondary: { bg: "var(--surface-soft)", fg: "var(--text-ink)", hover: "var(--color-primary-pale)", border: "transparent" },
  tertiary: { bg: "var(--surface-canvas)", fg: "var(--text-ink)", hover: "var(--surface-soft)", border: "var(--line-strong)" },
  negative: { bg: "var(--color-negative)", fg: "var(--surface-canvas)", hover: "var(--color-negative-deep)", border: "transparent" },
} as const;

const SIZE = {
  sm: { padding: "8px 16px", fontSize: "var(--text-body-sm)", lineHeight: "var(--lh-body-sm)" },
  md: { padding: "12px 24px", fontSize: "var(--text-body-md)", lineHeight: "var(--lh-body-md)" },
  lg: { padding: "16px 32px", fontSize: "var(--text-body-lg)", lineHeight: "var(--lh-body-lg)" },
} as const;

export type ButtonProps = {
  variant?: keyof typeof FILL;
  size?: keyof typeof SIZE;
  children?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export function Button({
  variant = "primary", size = "md", children, iconLeft, iconRight,
  fullWidth = false, disabled = false, type = "button", onClick, href, style, ariaLabel,
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const v = FILL[variant] ?? FILL.primary;
  const css: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-sm)",
    width: fullWidth ? "100%" : "auto",
    background: hover && !disabled ? v.hover : v.bg,
    color: v.fg,
    border: "1px solid " + v.border,
    borderRadius: "var(--radius-button)",
    fontFamily: "var(--font-sans)", fontWeight: "var(--weight-semibold)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    textDecoration: "none",
    transition: "background var(--motion-fast) var(--ease-standard)",
    ...SIZE[size], ...style,
  };
  const hoverProps = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };
  if (href) {
    return (
      <a href={href} onClick={onClick} style={css} aria-label={ariaLabel} {...hoverProps}>
        {iconLeft}{children}{iconRight}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} style={css} aria-label={ariaLabel} {...hoverProps}>
      {iconLeft}{children}{iconRight}
    </button>
  );
}
