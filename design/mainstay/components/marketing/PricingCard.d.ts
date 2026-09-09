import * as React from "react";

/**
 * Fixed-price package card for service tiers or callout rates.
 */
export interface PricingCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  name: React.ReactNode;
  amount: React.ReactNode;
  /** e.g. "/ visit". */
  unit?: React.ReactNode;
  note?: React.ReactNode;
  features?: React.ReactNode[];
  /** Clay border + shadow, primary CTA. */
  featured?: boolean;
  badge?: React.ReactNode;
  ctaLabel?: React.ReactNode;
  ctaHref?: string;
  className?: string;
}

export declare function PricingCard(props: PricingCardProps): JSX.Element;
