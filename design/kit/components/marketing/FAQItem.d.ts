import * as React from "react";
/** One expandable question row. Stack several with no wrapper; hairlines separate them. */
export interface FAQItemProps {
  question?: string;
  answer?: React.ReactNode;
  defaultOpen?: boolean;
  style?: React.CSSProperties;
}
export declare function FAQItem(props: FAQItemProps): JSX.Element;
