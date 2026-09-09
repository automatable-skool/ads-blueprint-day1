import * as React from "react";
/** Square icon-only control for toolbars, closes and compact actions. */
export interface IconButtonProps {
  /** Lucide icon name. */
  name: string;
  /** Required accessible label. */
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "secondary" | "ghost" | "brand";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
