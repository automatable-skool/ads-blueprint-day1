import * as React from "react";

/**
 * Eyebrow + heading + lead trio that opens every marketing section.
 */
export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  /** Small uppercase clay label. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
