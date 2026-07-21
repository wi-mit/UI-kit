import { forwardRef } from "react";
import { cx } from "@/utils/cx";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      className,
      children,
      type = "button",
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          styles.root,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          loading && styles.loading,
          className,
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? <span className={styles.spinner} aria-hidden /> : leftIcon}
        <span className={styles.label}>{children}</span>
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
