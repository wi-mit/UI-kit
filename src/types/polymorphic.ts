import type { ComponentPropsWithoutRef, ElementType } from "react";

export type PolymorphicProps<E extends ElementType, P> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P> & {
    as?: E;
  };
