import * as React from "react";
/** White panel with a hairline border and short warm shadow — the default container. */
export interface CardProps {
  children?: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  elevation?: "none" | "xs" | "sm" | "md" | "lg";
  /** Amber 3px top rule — use for one highlighted card in a set, never all of them. */
  accent?: boolean;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
