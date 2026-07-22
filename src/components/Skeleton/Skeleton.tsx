import { forwardRef } from "react";
import { cx } from "@/utils/cx";
import type { SkeletonProps } from "./Skeleton.types";
import styles from "./Skeleton.module.css";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      width = "100%",
      height = "1rem",
      rounded = "md",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cx(styles.root, styles[rounded], className)}
        style={{ width, height, ...style }}
        aria-hidden
        {...rest}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
