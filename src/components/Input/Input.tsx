import { forwardRef, useId } from "react";
import { cx } from "@/utils/cx";
import type { InputProps } from "./Input.types";
import styles from "./Input.module.css";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, fullWidth = false, className, id, disabled, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  return (
    <label
      className={cx(styles.root, fullWidth && styles.fullWidth, className)}
      htmlFor={inputId}
    >
      {label ? <span className={styles.label}>{label}</span> : null}
      <input
        ref={ref}
        id={inputId}
        className={cx(styles.field, Boolean(error) && styles.invalid)}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
          undefined
        }
        {...rest}
      />
      {hint && !error ? (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
});

Input.displayName = "Input";
