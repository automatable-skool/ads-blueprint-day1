import * as React from "react";
/** Single-choice control, plus RadioGroup for the common stacked/inline set. */
export interface RadioProps {
  label?: React.ReactNode;
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export interface RadioGroupProps {
  name?: string;
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  direction?: "vertical" | "horizontal";
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
