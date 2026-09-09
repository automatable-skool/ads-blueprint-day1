import * as React from "react";
/** Utility strip above the header: phone, email, service area, hours. */
export interface ContactBarProps {
  phone?: string;
  email?: string;
  /** Service area line, e.g. "Serving Hamilton & Burlington". */
  area?: string;
  hours?: string;
  tone?: "brand" | "muted";
  style?: React.CSSProperties;
}
export declare function ContactBar(props: ContactBarProps): JSX.Element;
