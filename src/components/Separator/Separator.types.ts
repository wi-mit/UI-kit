import type { HTMLAttributes } from "react";

export type SeparatorOrientation = "horizontal" | "vertical";

export type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
};
