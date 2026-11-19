import type { ReactNode } from "react";

type ChamferCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  size?: "md" | "sm";
  /** Glowing orange edge, as on the featured cards in the design. */
  glow?: boolean;
};

/**
 * Card with the cut top-right / bottom-left corners from the Figma file.
 * The outer layer paints the 1px border, the inner layer the surface.
 */
export function ChamferCard({ children, className = "", innerClassName = "", size = "md", glow = true }: ChamferCardProps) {
  const shape = size === "md" ? "chamfer" : "chamfer-sm";
  const edge = glow
    ? "bg-linear-to-br from-brand via-brand/40 to-brand"
    : "bg-linear-to-br from-white/25 via-white/5 to-white/20";

  return (
    <div className={`${shape} ${edge} p-px ${className}`}>
      <div className={`${shape} relative h-full overflow-hidden bg-linear-to-br from-surface to-black ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
