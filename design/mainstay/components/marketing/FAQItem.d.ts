import * as React from "react";

/**
 * Single expandable question row; stack several to form an FAQ list.
 */
export interface FAQItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  question: React.ReactNode;
  answer: React.ReactNode;
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
}

export declare function FAQItem(props: FAQItemProps): JSX.Element;
