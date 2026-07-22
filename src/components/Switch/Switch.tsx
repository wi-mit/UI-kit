import { forwardRef, useId, useState } from "react";
import { cx } from "@/utils/cx";
import type { SwitchProps } from "./Switch.types";
import styles from "./Switch.module.css";

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked = false,
    onCheckedChange,
    label,
    description,
    className,
    id,
    disabled,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const isControlled = checked !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isChecked = isControlled ? checked : uncontrolled;

  return (
    <button
      ref={ref}
      id={switchId}
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      data-checked={isChecked}
      className={cx(styles.root, className)}
      onClick={() => {
        const next = !isChecked;
        if (!isControlled) setUncontrolled(next);
        onCheckedChange?.(next);
      }}
      {...rest}
    >
      <span className={styles.track} aria-hidden>
        <span className={styles.thumb} />
      </span>
      {label || description ? (
        <span className={styles.content}>
          {label ? <span className={styles.label}>{label}</span> : null}
          {description ? (
            <span className={styles.description}>{description}</span>
          ) : null}
        </span>
      ) : null}
    </button>
  );
});

Switch.displayName = "Switch";
