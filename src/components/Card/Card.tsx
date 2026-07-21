import { forwardRef } from "react";
import { cx } from "@/utils/cx";
import type { CardProps } from "./Card.types";
import styles from "./Card.module.css";

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, description, footer, children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(styles.root, className)} {...rest}>
      {(title || description) && (
        <header className={styles.header}>
          {title ? <h3 className={styles.title}>{title}</h3> : null}
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </header>
      )}
      {children ? <div className={styles.body}>{children}</div> : null}
      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </div>
  );
});

Card.displayName = "Card";
