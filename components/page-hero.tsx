import Image from "next/image";
import type { ReactNode } from "react";
import { SplitWords } from "./motion/split-words";

type PageHeroProps = {
  title: string;
  description: ReactNode;
  image: string;
  /** Where the photo should anchor when cropped on narrow screens. */
  imagePosition?: string;
  /** Smaller title for long names (program and class pages). */
  compact?: boolean;
};

export function PageHero({ title, description, image, imagePosition = "object-center", compact = false }: PageHeroProps) {
  return (
    <section className="relative flex min-h-160 items-end overflow-hidden bg-black pt-44 pb-20 lg:min-h-200 lg:items-center lg:pb-0">
      <div aria-hidden className="parallax absolute inset-0">
        <Image src={image} alt="" fill priority sizes="100vw" className={`object-cover motion-safe:animate-hero-zoom ${imagePosition}`} />
      </div>
      <div aria-hidden className="absolute inset-0 bg-linear-to-l from-transparent to-black to-75%" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-transparent from-50% to-black" />

      <div className="relative mx-auto w-full max-w-site px-5 md:px-10">
        <div className="flex max-w-194.5 flex-col gap-8 lg:mt-30 lg:gap-12">
          <h1 className={`font-medium tracking-display ${compact ? "text-5xl leading-tight md:text-7xl" : "text-6xl md:text-8xl lg:text-page"}`}>
            <SplitWords parts={[title]} delay={150} />
          </h1>
          <div aria-hidden className="h-1 w-24 origin-left bg-brand motion-safe:animate-grow-x" style={{ animationDelay: "500ms" }} />
          <p className="-mt-2 text-xl tracking-display motion-safe:animate-fade-up md:text-lede lg:-mt-6" style={{ animationDelay: "600ms" }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, children, className = "" }: { title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div data-reveal className={`flex max-w-202 flex-col gap-6 ${className}`}>
      <h2 className="text-4xl font-bold tracking-display md:text-5xl lg:text-section">{title}</h2>
      {children && <p className="text-lg tracking-display md:text-2xl">{children}</p>}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-5 md:px-10 ${className}`}>{children}</div>;
}
