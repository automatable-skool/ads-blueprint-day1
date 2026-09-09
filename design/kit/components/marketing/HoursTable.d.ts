import * as React from "react";
/** Opening-hours list; today's row is tinted cyan. */
export interface HoursTableProps {
  rows?: Array<{ day: string; hours: string }>;
  /** Zero-based index of today's row. */
  todayIndex?: number;
  /** "on-brand" swaps rules, today's tint and cell colours for white-on-blue. */
  tone?: "light" | "on-brand";
  style?: React.CSSProperties;
}
export declare function HoursTable(props: HoursTableProps): JSX.Element;
