import * as React from "react";
/** Small uppercase status pill: job state, licence claims, "24/7", availability. */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: "neutral" | "brand" | "accent" | "positive" | "caution" | "critical" | "info";
  dot?: boolean;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
