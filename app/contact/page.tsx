import type { Metadata } from "next";
import Image from "next/image";
import { ChamferCard } from "@/components/chamfer-card";
import { Triangle } from "@/components/icons";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { contactSteps } from "@/lib/content";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Send an inquiry, book a free assessment, and start training at Hustle & Muscle.",
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Hustle and Muscle Fitness Gym ${site.address}`)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" description={site.description} image="/images/hero-contact.jpg" imagePosition="object-right" />

      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-22">
        <Container>
          <SectionHeading title="How it Works">
            We value your fitness journey. That is why we want you to have the best of the best. Along with your training with us are
            partners who make your goal much more attainable.
          </SectionHeading>

          <ol className="mt-14 grid gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-12">
            {contactSteps.map((step) => (
              <li key={step.title} className="flex gap-4">
                <Triangle className="mt-1 size-5 shrink-0 text-brand" />
                <div className="flex flex-col gap-4 lg:gap-6">
                  <h3 className="text-2xl font-medium tracking-display lg:text-heading">{step.title}</h3>
                  <p className="text-lg tracking-display text-ash">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="inquiry" className="bg-linear-to-b from-surface to-black pt-20 pb-24 lg:pt-30 lg:pb-30">
        <Container>
          <SectionHeading title="Any Questions?">
            Tell us a bit about your goals and we&apos;ll help you find the right program, membership, or coach.
          </SectionHeading>

          <div className="mt-14 grid items-start gap-8 lg:mt-20 lg:grid-cols-2">
            <ChamferCard>
              <div className="px-6 py-10 sm:px-10.5 lg:py-16">
                <ContactForm />
              </div>
            </ChamferCard>

            <div className="flex flex-col gap-6">
              <ChamferCard>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="group relative block aspect-square sm:aspect-video lg:aspect-square">
                  <Image
                    src="/images/map.png"
                    alt="Map showing Hustle and Muscle Fitness Gym near Narra Street, Greenwoods Executive Village"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-6 bottom-6 bg-white px-4 py-2 text-sm font-medium text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    Open in Google Maps
                  </span>
                </a>
              </ChamferCard>
              <dl className="grid gap-6 text-base tracking-display sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-graphite">Visit</dt>
                  <dd className="mt-1">{site.address}</dd>
                </div>
                <div>
                  <dt className="text-sm text-graphite">Call</dt>
                  <dd className="mt-1">
                    <a href={site.phoneHref} className="hover:text-brand">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-graphite">Email</dt>
                  <dd className="mt-1 break-all">
                    <a href={`mailto:${site.email}`} className="hover:text-brand">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
