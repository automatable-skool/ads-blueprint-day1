import * as React from "react";
/** Modal sheet for confirmations and short forms. Positioned absolute — mount inside a relative container. */
export interface DialogProps {
  open?: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  /** Footer actions, right-aligned on a sunken bar. */
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
