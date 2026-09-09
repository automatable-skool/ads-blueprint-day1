import * as React from "react";

/**
 * Multi-line field for job descriptions.
 */
export interface TextareaProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  rows?: number;
  required?: boolean;
  className?: string;
}

export declare function Textarea(props: TextareaProps): JSX.Element;
