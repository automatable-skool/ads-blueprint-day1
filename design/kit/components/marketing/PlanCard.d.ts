import * as React from "react";
/** Membership / maintenance-plan card: price panel on the brand colour, perks beside it. */
export interface PlanCardProps {
  /** Formatted price, e.g. "$34.99". */
  price?: string;
  period?: string;
  title?: string;
  description?: string;
  perks?: string[];
  /** Small print under the price, e.g. "12 month minimum". */
  footnote?: string;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function PlanCard(props: PlanCardProps): JSX.Element;
