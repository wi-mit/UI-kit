import type { HTMLAttributes } from "react";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  width?: string | number;
  height?: string | number;
  rounded?: "md" | "lg" | "full";
};
