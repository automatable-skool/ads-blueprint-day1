import * as React from "react";
/** Inline Alert for page-level messages and Toast for transient confirmations. */
export interface AlertProps {
  tone?: "positive" | "caution" | "critical" | "info";
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export interface ToastProps {
  tone?: "positive" | "caution" | "critical" | "info";
  message?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}
export declare function Alert(props: AlertProps): JSX.Element;
export declare function Toast(props: ToastProps): JSX.Element;
