import * as React from "react";

/**
 * The generic surface container — white, hairline border, 14px radius.
 */
export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  children?: React.ReactNode;
  /** outline = hairline border (default), elevated = shadow, sunken = grey fill, accent = clay tint. */
  variant?: "outline" | "elevated" | "sunken" | "accent";
  /** none / sm 16 / md 24 / lg 32 px. */
  padding?: "none" | "sm" | "md" | "lg";
  /** Adds hover lift + pointer. Implied when href is set. */
  interactive?: boolean;
  href?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export declare function Card(props: CardProps): JSX.Element;
