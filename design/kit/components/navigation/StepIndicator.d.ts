import * as React from "react";
/** Numbered progress row for quote and booking flows. */
export interface StepIndicatorProps {
  steps?: string[];
  /** Zero-based index of the current step; earlier steps render as complete. */
  current?: number;
  style?: React.CSSProperties;
}
export declare function StepIndicator(props: StepIndicatorProps): JSX.Element;
