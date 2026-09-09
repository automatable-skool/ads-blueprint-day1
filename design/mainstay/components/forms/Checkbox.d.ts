import * as React from "react";

/**
 * Single checkbox, optionally with a description line.
 */
export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  label?: React.ReactNode;
  /** Secondary line under the label. */
  description?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
