import type { HTMLAttributes, ImgHTMLAttributes } from "react";

export type AvatarSize = "sm" | "md" | "lg";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
};
