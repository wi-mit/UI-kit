import { forwardRef } from "react";
import { cx } from "@/utils/cx";
import type { BadgeProps } from "./Badge.types";
import styles from "./Badge.module.css";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "neutral", className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx(styles.root, styles[variant], className)}
      {...rest}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
