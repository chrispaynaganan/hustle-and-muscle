import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { Container, PageHero } from "@/components/page-hero";
import Link from "next/link";
import { coaches } from "@/lib/coaches";
import { contactHref } from "@/lib/site";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Coaches",
  description: "Meet the Hustle & Muscle coaching team: strength, boxing, HIIT, mobility, and more.",
};

export default function CoachesPage() {
  return (
    <>
      <PageHero title="Coaches" description={site.description} image="/images/hero-coaches.jpg" />

      <section className="bg-linear-to-b from-black to-surface pt-12 pb-24 lg:pt-22 lg:pb-30">
        <Container>
          <ul data-reveal-group className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach) => (
              <li key={coach.name} className="group relative aspect-portrait overflow-hidden bg-mist">
                <Link href={`/coaches/${coach.slug}`} aria-label={`View ${coach.name}'s profile`} className="absolute inset-0">
                  <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </Link>
                {/* Frosted panel */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 bg-white/10 px-6 pt-10 pb-8 backdrop-blur-2xl sm:px-9">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-medium tracking-display xl:text-heading">
                      <Link href={`/coaches/${coach.slug}`} className="hover:text-brand">
                        {coach.name}
                      </Link>
                    </h2>
                    <p className="text-base font-medium tracking-display">{coach.role}</p>
                  </div>
                  <p className="text-base font-light tracking-display italic">&ldquo;{coach.motto}&rdquo;</p>
                  <div className="mt-2 grid grid-cols-2 gap-4 xl:gap-6">
                    {coach.facebook ? (
                      <ButtonLink href={coach.facebook} target="_blank" rel="noreferrer" className="gap-2 px-3 text-sm xl:gap-4 xl:text-base">
                        View Facebook
                      </ButtonLink>
                    ) : (
                      <ButtonLink href={contactHref("coaching", coach.name)} className="gap-2 px-3 text-sm xl:gap-4 xl:text-base">
                        Book a Session
                      </ButtonLink>
                    )}
                    <ButtonLink href={`/coaches/${coach.slug}`} variant="outline" className="gap-2 px-3 text-sm xl:gap-4 xl:text-base">
                      View Profile
                    </ButtonLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
