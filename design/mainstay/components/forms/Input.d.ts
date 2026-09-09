import * as React from "react";

/**
 * Single-line text field with label, hint and error states.
 */
export interface InputProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Error message — replaces the hint and turns the border red. */
  error?: React.ReactNode;
  /** Leading Lucide icon inside the field. */
  icon?: string;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  className?: string;
}

export declare function Input(props: InputProps): JSX.Element;
