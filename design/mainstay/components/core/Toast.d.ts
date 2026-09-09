import * as React from "react";

/**
 * Transient confirmation or error notice, typically after a form submit.
 */
export interface ToastProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  tone?: "success" | "danger" | "warning" | "info";
  title?: React.ReactNode;
  message?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export declare function Toast(props: ToastProps): JSX.Element;
