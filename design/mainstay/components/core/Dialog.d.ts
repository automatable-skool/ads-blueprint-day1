import * as React from "react";

/**
 * Modal overlay for booking confirmation, callback requests and short forms.
 */
export interface DialogProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Right-aligned action row. */
  footer?: React.ReactNode;
  /** md 520px / lg 760px. */
  size?: "md" | "lg";
  className?: string;
}

export declare function Dialog(props: DialogProps): JSX.Element;
