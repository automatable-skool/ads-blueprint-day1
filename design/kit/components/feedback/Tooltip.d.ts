import * as React from "react";
/** Dark hover label for icon-only controls. Keep it to a few words. */
export interface TooltipProps {
  label: string;
  children?: React.ReactNode;
  placement?: "top" | "bottom" | "right";
  style?: React.CSSProperties;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
