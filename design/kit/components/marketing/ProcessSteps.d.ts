import * as React from "react";
/** Numbered "how it works" steps — three or four, in cards or as a compact list. */
export interface ProcessStep {
  title: string;
  body: string;
  /** Small pill over the number, e.g. "Same-day available". */
  badge?: string;
  /** Set (even to "") to give a card step a photo slot. */
  image?: string;
  imageLabel?: string;
}
export interface ProcessStepsProps {
  steps?: ProcessStep[];
  /** "cards" (default) for the bold page style; "rows" for the calm one. */
  layout?: "cards" | "rows";
  style?: React.CSSProperties;
}
export declare function ProcessSteps(props: ProcessStepsProps): JSX.Element;
