import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "./icons";

type Variant = "solid" | "outline" | "ghost" | "brand";

const variants: Record<Variant, string> = {
  solid: "bg-white text-brand hover:bg-brand hover:text-white",
  outline: "border border-white text-white hover:bg-white hover:text-black",
  ghost: "text-white hover:text-brand",
  brand: "bg-brand text-white hover:bg-brand-dark",
};

export function buttonClasses(variant: Variant = "solid", extra = "") {
  return `inline-flex min-h-12 items-center justify-center gap-4 px-6 py-3 text-center text-base font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${variants[variant]} ${extra}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  icon?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "solid", icon = true, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link {...props} className={buttonClasses(variant, className)}>
      <span>{children}</span>
      {icon && <ArrowUpRight className="size-6 shrink-0" />}
    </Link>
  );
}
