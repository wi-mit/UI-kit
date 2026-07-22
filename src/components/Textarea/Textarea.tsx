import { forwardRef, useId } from "react";
import { cx } from "@/utils/cx";
import type { TextareaProps } from "./Textarea.types";
import styles from "./Textarea.module.css";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, hint, error, fullWidth = false, className, id, disabled, ...rest },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const hintId = `${fieldId}-hint`;
    const errorId = `${fieldId}-error`;

    return (
      <label
        className={cx(styles.root, fullWidth && styles.fullWidth, className)}
        htmlFor={fieldId}
      >
        {label ? <span className={styles.label}>{label}</span> : null}
        <textarea
          ref={ref}
          id={fieldId}
          className={cx(styles.field, Boolean(error) && styles.invalid)}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [hint ? hintId : null, error ? errorId : null]
              .filter(Boolean)
              .join(" ") || undefined
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
  },
);

Textarea.displayName = "Textarea";
