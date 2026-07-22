import { forwardRef, useEffect, useId, useRef } from "react";
import { cx } from "@/utils/cx";
import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.css";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      description,
      indeterminate = false,
      className,
      id,
      disabled,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const localRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (localRef.current) {
        localRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <label
        className={cx(styles.root, className)}
        htmlFor={inputId}
        data-disabled={disabled || undefined}
      >
        <span className={styles.control}>
          <input
            ref={(node) => {
              localRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            id={inputId}
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            {...rest}
          />
          <span className={styles.box} aria-hidden>
            <svg className={styles.mark} viewBox="0 0 12 12" fill="none">
              {indeterminate ? (
                <path
                  d="M2.5 6h7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2.5 6.5 5 9l4.5-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </span>
        </span>
        {label || description ? (
          <span className={styles.content}>
            {label ? <span className={styles.label}>{label}</span> : null}
            {description ? (
              <span className={styles.description}>{description}</span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
