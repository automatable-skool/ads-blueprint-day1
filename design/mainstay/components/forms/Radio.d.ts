import * as React from "react";

/**
 * Radio input; `card` turns it into a selectable panel for booking options.
 */
export interface RadioProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  /** Bordered panel style — used for time-slot and package pickers. */
  card?: boolean;
  className?: string;
}

export declare function Radio(props: RadioProps): JSX.Element;
