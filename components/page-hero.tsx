import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  description: ReactNode;
  image: string;
  /** Where the photo should anchor when cropped on narrow screens. */
  imagePosition?: string;
};

export function PageHero({ title, description, image, imagePosition = "object-center" }: PageHeroProps) {
  return (
    <section className="relative flex min-h-160 items-end overflow-hidden bg-black pt-44 pb-20 lg:min-h-200 lg:items-center lg:pb-0">
      <Image src={image} alt="" fill priority sizes="100vw" className={`object-cover ${imagePosition}`} />
      <div aria-hidden className="absolute inset-0 bg-linear-to-l from-transparent to-black to-75%" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-transparent from-50% to-black" />

      <div className="relative mx-auto w-full max-w-site px-5 md:px-10">
        <div className="flex max-w-194.5 flex-col gap-8 lg:mt-30 lg:gap-12">
          <h1 className="text-6xl font-medium tracking-display md:text-8xl lg:text-page">{title}</h1>
          <p className="text-xl tracking-display md:text-lede">{description}</p>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, children, className = "" }: { title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={`flex max-w-202 flex-col gap-6 ${className}`}>
      <h2 className="text-4xl font-bold tracking-display md:text-5xl lg:text-section">{title}</h2>
      {children && <p className="text-lg tracking-display md:text-2xl">{children}</p>}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-5 md:px-10 ${className}`}>{children}</div>;
}
