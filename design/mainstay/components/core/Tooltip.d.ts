import * as React from "react";

/**
 * Hover/focus hint on an inline element.
 */
export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  children?: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "bottom";
  className?: string;
}

export declare function Tooltip(props: TooltipProps): JSX.Element;
