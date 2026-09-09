import * as React from "react";

/**
 * The system's primary action. Every conversion path ends in one.
 */
export interface ButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  /** Button label. */
  children?: React.ReactNode;
  /** primary = clay CTA, secondary = ink, outline = bordered white, ghost = bare, link = inline text action. */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  /** sm 36px / md 44px / lg 52px. Use lg for hero and form-submit CTAs. */
  size?: "sm" | "md" | "lg";
  /** Lucide icon name rendered before the label. */
  iconLeft?: string;
  /** Lucide icon name rendered after the label — "arrow-right" on forward CTAs. */
  iconRight?: string;
  /** Stretch to the container width (mobile CTAs, form submits). */
  fullWidth?: boolean;
  /** Show a spinner and block interaction. */
  loading?: boolean;
  disabled?: boolean;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export declare function Button(props: ButtonProps): JSX.Element;
