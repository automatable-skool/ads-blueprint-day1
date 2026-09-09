import * as React from "react";
/** Sentence-case bordered chip for filters, service areas and selected options. */
export interface TagProps {
  children?: React.ReactNode;
  /** Optional leading Lucide icon name. */
  icon?: string;
  /** When set, renders a remove affordance. */
  onRemove?: () => void;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
