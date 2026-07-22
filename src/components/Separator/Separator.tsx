import { forwardRef } from "react";
import { cx } from "@/utils/cx";
import type { SeparatorProps } from "./Separator.types";
import styles from "./Separator.module.css";

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    {
      orientation = "horizontal",
      decorative = true,
      className,
      role,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cx(styles.root, styles[orientation], className)}
        role={decorative ? "none" : (role ?? "separator")}
        aria-orientation={decorative ? undefined : orientation}
        {...rest}
      />
    );
  },
);

Separator.displayName = "Separator";
