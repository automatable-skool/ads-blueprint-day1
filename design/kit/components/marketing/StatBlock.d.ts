import * as React from "react";
/** Single proof figure, plus TrustRow for licence/insurance/guarantee claims. */
export interface StatBlockProps {
  value?: React.ReactNode;
  label?: string;
  icon?: string;
  align?: "left" | "center";
  style?: React.CSSProperties;
}
export interface TrustRowProps {
  items?: string[];
  /** Tick colour; defaults to currentColor so the row inherits from its container. Pass --blue-600 on white. */
  iconColor?: string;
  style?: React.CSSProperties;
}
export declare function StatBlock(props: StatBlockProps): JSX.Element;
export declare function TrustRow(props: TrustRowProps): JSX.Element;
