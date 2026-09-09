import * as React from "react";
/** Yellow strip pinned above the site header carrying one seasonal offer. */
export interface PromoBarProps {
  message?: string;
  /** Link text, e.g. "Get my estimate". */
  ctaLabel?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function PromoBar(props: PromoBarProps): JSX.Element;
