import * as React from "react";
/** Star rating with optional numeric value and review count. Stars are brand blue on light
 * surfaces and white on blue ones — they use --star-* tokens, never the accent. */
export interface RatingProps {
  /** 0–5; rounded to whole stars. */
  value?: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  /** "on-brand" switches to white stars for use on a blue band. */
  tone?: "default" | "on-brand";
  style?: React.CSSProperties;
}
export declare function Rating(props: RatingProps): JSX.Element;
