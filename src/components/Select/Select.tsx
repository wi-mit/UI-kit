import { forwardRef, useId } from "react";
import { cx } from "@/utils/cx";
import type { SelectProps } from "./Select.types";
import styles from "./Select.module.css";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    hint,
    error,
    fullWidth = false,
    options,
    placeholder,
    className,
    id,
    disabled,
    defaultValue,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;

  return (
    <label
      className={cx(styles.root, fullWidth && styles.fullWidth, className)}
      htmlFor={selectId}
    >
      {label ? <span className={styles.label}>{label}</span> : null}
      <select
        ref={ref}
        id={selectId}
        className={cx(styles.field, Boolean(error) && styles.invalid)}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
          undefined
        }
        defaultValue={
          defaultValue ?? (placeholder && rest.value === undefined ? "" : undefined)
        }
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
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

Select.displayName = "Select";
