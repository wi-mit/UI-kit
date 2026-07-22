import { forwardRef } from "react";
import { cx } from "@/utils/cx";
import type { AlertProps } from "./Alert.types";
import styles from "./Alert.module.css";

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = "info", title, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cx(styles.root, styles[variant], className)}
      {...rest}
    >
      {title ? <div className={styles.title}>{title}</div> : null}
      {children ? <div className={styles.body}>{children}</div> : null}
    </div>
  );
});

Alert.displayName = "Alert";
