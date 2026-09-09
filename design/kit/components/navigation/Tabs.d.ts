import * as React from "react";
/** Underlined tab row; the active tab carries the amber 2px rule. */
export interface TabsProps {
  tabs?: Array<string | { value: string; label: string; icon?: string }>;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
