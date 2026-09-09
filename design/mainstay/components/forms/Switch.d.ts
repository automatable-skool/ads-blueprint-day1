import * as React from "react";

/**
 * Binary preference toggle — used in settings rows, not in booking forms.
 */
export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
}

export declare function Switch(props: SwitchProps): JSX.Element;
