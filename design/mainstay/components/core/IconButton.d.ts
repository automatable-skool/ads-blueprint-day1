import * as React from "react";

/**
 * A square, icon-only action — menu toggles, dismiss, carousel arrows.
 */
export interface IconButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  /** Lucide icon name. */
  icon: string;
  /** Accessible label — required, also used as the tooltip title. */
  label: string;
  variant?: "ghost" | "outline" | "primary";
  /** sm 36 / md 44 / lg 52 px square. md and up meet the 44px tap minimum. */
  size?: "sm" | "md" | "lg";
  /** Pill-shaped instead of the default 10px radius. */
  round?: boolean;
  className?: string;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
