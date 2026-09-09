import * as React from "react";
/** Text input, multiline textarea, and the Field label/hint/error wrapper they sit in. */
export interface FieldProps {
  label?: string;
  hint?: string;
  /** When set, replaces the hint and turns the message red. */
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { invalid?: boolean }
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { invalid?: boolean; rows?: number }
export declare function Field(props: FieldProps): JSX.Element;
export declare function Input(props: InputProps): JSX.Element;
export declare function Textarea(props: TextareaProps): JSX.Element;
