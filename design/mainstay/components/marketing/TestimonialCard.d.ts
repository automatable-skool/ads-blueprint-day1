import * as React from "react";

/**
 * Customer quote with rating and attribution.
 */
export interface TestimonialCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  quote: React.ReactNode;
  name: string;
  /** Location, job type or date. */
  meta?: React.ReactNode;
  /** 0 hides the stars. */
  rating?: number;
  variant?: "outline" | "sunken";
  className?: string;
}

export declare function TestimonialCard(props: TestimonialCardProps): JSX.Element;
