import * as React from "react";

/**
 * Interactive chip for filtering service categories or showing removable selections.
 */
export interface TagProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  children?: React.ReactNode;
  icon?: string;
  selected?: boolean;
  /** Makes the tag a toggle button. */
  onSelect?: (e: React.MouseEvent) => void;
  /** Adds a trailing remove affordance. */
  onRemove?: (e: React.MouseEvent) => void;
  className?: string;
}

export declare function Tag(props: TagProps): JSX.Element;
