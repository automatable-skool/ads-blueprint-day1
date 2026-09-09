import * as React from "react";
/** Full-width band of headline figures, directly under the hero. */
export interface StatBandProps {
  items?: Array<{ value: React.ReactNode; label: string; icon?: string }>;
  /** "tint" (default) = pale blue; "plain" = white with a bottom hairline; "brand" = solid blue with white figures. */
  tone?: "brand" | "tint" | "plain";
  style?: React.CSSProperties;
}
export declare function StatBand(props: StatBandProps): JSX.Element;
