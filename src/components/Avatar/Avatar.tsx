import { forwardRef, useState } from "react";
import { cx } from "@/utils/cx";
import type { AvatarProps } from "./Avatar.types";
import styles from "./Avatar.module.css";

function initials(value?: string) {
  if (!value) return "?";
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt = "", fallback, size = "md", className, imgProps, ...rest },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      ref={ref}
      className={cx(styles.root, styles[size], className)}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={() => setFailed(true)}
          {...imgProps}
        />
      ) : (
        <span className={styles.fallback} aria-hidden={!fallback && !alt}>
          {initials(fallback || alt)}
        </span>
      )}
    </span>
  );
});

Avatar.displayName = "Avatar";
