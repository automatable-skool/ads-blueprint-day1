import * as React from "react";

/**
 * Full-width closing block that ends a page or section.
 */
export interface CTABannerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  title: React.ReactNode;
  lead?: React.ReactNode;
  primaryLabel?: React.ReactNode;
  primaryHref?: string;
  secondaryLabel?: React.ReactNode;
  secondaryHref?: string;
  /** sunken grey (default), accent tint, or ink. */
  tone?: "sunken" | "accent" | "ink";
  className?: string;
}

export declare function CTABanner(props: CTABannerProps): JSX.Element;
