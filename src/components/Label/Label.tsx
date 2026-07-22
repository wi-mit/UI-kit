import { forwardRef } from "react";
import { cx } from "@/utils/cx";
import type { LabelProps } from "./Label.types";
import styles from "./Label.module.css";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required = false, className, children, ...rest },
  ref,
) {
  return (
    <label ref={ref} className={cx(styles.root, className)} {...rest}>
      {children}
      {required ? (
        <span className={styles.required} aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
});

Label.displayName = "Label";
