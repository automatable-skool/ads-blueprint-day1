import * as React from "react";

/**
 * Row of proof numbers (years trading, jobs completed, response time).
 */
export interface StatBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  stats: { value: React.ReactNode; label: React.ReactNode }[];
  /** Hairline rules above and below. */
  bordered?: boolean;
  className?: string;
}

export declare function StatBlock(props: StatBlockProps): JSX.Element;
