import {
  createContext,
  useContext,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "@/utils/cx";
import styles from "./Direction.module.css";

export type DirectionValue = "ltr" | "rtl";

type DirectionContextValue = {
  dir: DirectionValue;
};

const DirectionContext = createContext<DirectionContextValue>({ dir: "ltr" });

export type DirectionProviderProps = {
  dir?: DirectionValue;
  children: ReactNode;
};

export function DirectionProvider({
  dir = "ltr",
  children,
}: DirectionProviderProps) {
  const value = useMemo(() => ({ dir }), [dir]);
  return (
    <DirectionContext.Provider value={value}>
      <div dir={dir} className={styles.root} data-ui-dir={dir}>
        {children}
      </div>
    </DirectionContext.Provider>
  );
}

export function useDirection(): DirectionValue {
  return useContext(DirectionContext).dir;
}

export type DirectionProps = HTMLAttributes<HTMLDivElement> & {
  dir?: DirectionValue;
};

export function Direction({
  dir = "ltr",
  className,
  children,
  ...rest
}: DirectionProps) {
  return (
    <div dir={dir} className={cx(styles.root, className)} data-ui-dir={dir} {...rest}>
      {children}
    </div>
  );
}

Direction.displayName = "Direction";
DirectionProvider.displayName = "DirectionProvider";
