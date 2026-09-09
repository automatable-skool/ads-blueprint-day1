import * as React from "react";

/**
 * Small non-interactive status or attribute marker.
 */
export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  children?: React.ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
  /** soft = tinted background (default), solid = filled, outline = bordered white. */
  variant?: "soft" | "solid" | "outline";
  size?: "md" | "lg";
  /** Optional leading Lucide icon. */
  icon?: string;
  className?: string;
}

export declare function Badge(props: BadgeProps): JSX.Element;
