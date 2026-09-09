import * as React from "react";

/**
 * Five-star rating row for reviews and trust bars.
 */
export interface StarsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  /** 0–5, rounded to whole stars. */
  rating?: number;
  size?: number;
  /** Trailing text, e.g. "4.9 · 312 reviews". */
  label?: string;
  className?: string;
}

export declare function Stars(props: StarsProps): JSX.Element;
