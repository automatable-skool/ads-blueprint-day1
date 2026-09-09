import * as React from "react";
/** Customer quote with stars and attribution. Use real review text only. */
export interface TestimonialCardProps {
  quote?: string;
  name?: string;
  /** Job or location line, e.g. "Boiler replacement · Dundas". */
  detail?: string;
  rating?: number;
  /** Review platform, rendered as "via Google". */
  source?: string;
  style?: React.CSSProperties;
}
export declare function TestimonialCard(props: TestimonialCardProps): JSX.Element;
