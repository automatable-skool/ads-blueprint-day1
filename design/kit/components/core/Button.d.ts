import * as React from "react";
/**
 * Primary action control: green for the main path, amber for "call now / book" moments.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = green fill; accent = amber (one per screen); secondary = outlined; ghost = text; danger = destructive. */
  variant?: "primary" | "accent" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  disabled?: boolean;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
