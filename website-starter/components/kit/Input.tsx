"use client";
// Copied from design/kit/components/core/Input.jsx - white fill, 1px ink border,
// 12px radius, semibold label above. Added the plain HTML attributes a lead form
// needs (required, autoComplete, inputMode) - passed straight through.
import React from "react";

export function Input({
  label, value, defaultValue, onChange, placeholder, type = "text", name, id,
  helpText, error, disabled = false, prefix, suffix, fullWidth = true, style,
  required, autoComplete, inputMode,
}: {
  label?: string; value?: string; defaultValue?: string; onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string; type?: string; name: string; id?: string; helpText?: string; error?: string;
  disabled?: boolean; prefix?: React.ReactNode; suffix?: React.ReactNode; fullWidth?: boolean;
  style?: React.CSSProperties; required?: boolean; autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || name;
  const borderColor = error ? "var(--color-negative)" : "var(--border-strong)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", width: fullWidth ? "100%" : "auto", ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-semibold)", lineHeight: "var(--lh-body-sm)", color: "var(--text-ink)" }}>{label}</label>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: "var(--space-sm)",
        background: "var(--surface-canvas)",
        border: "1px solid " + borderColor,
        boxShadow: focus ? "0 0 0 1px " + borderColor : "none",
        borderRadius: "var(--radius-input)",
        padding: "12px 16px",
        opacity: disabled ? 0.5 : 1,
      }}>
        {prefix}
        <input
          id={inputId} name={name} type={type} value={value} defaultValue={defaultValue} placeholder={placeholder}
          disabled={disabled} onChange={onChange} required={required} autoComplete={autoComplete} inputMode={inputMode}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md)", lineHeight: "var(--lh-body-md)",
            color: "var(--text-ink)",
          }}
        />
        {suffix}
      </div>
      {(error || helpText) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", lineHeight: "var(--lh-caption)", color: error ? "var(--color-negative-darkest)" : "var(--text-mute)" }}>{error || helpText}</span>
      )}
    </div>
  );
}
