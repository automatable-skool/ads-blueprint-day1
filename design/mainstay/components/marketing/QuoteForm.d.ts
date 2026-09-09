import * as React from "react";

/**
 * The system's conversion centrepiece — a short lead-capture form with a built-in success state.
 */
export interface QuoteFormProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Options for the service select. */
  services?: string[];
  submitLabel?: React.ReactNode;
  /** Reassurance line under the button. */
  footnote?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export declare function QuoteForm(props: QuoteFormProps): JSX.Element;
