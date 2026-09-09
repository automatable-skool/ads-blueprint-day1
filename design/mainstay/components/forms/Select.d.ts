import * as React from "react";

/**
 * Native select with the system's control styling and a chevron affordance.
 */
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  /** Strings or {value,label} objects. */
  options: (string | { value: string; label: string })[];
  /** Empty-value first option. */
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  className?: string;
}

export declare function Select(props: SelectProps): JSX.Element;
