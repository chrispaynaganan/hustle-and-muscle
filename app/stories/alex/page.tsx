import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/page-hero";
import { CtaBand } from "@/components/sections";

export const metadata: Metadata = {
  title: "Alex's Story",
  description: "Alex, a member for 3 years, shares her experience at Hustle & Muscle Fitness Gym.",
};

// Sample interview. Replace with Alex's real answers, or add a video by setting `videoUrl`
// to a YouTube embed link (e.g. https://www.youtube.com/embed/VIDEO_ID).
const videoUrl = "";

const interview = [
  { q: "What brought you to Hustle & Muscle?", a: "I wanted a gym close to home that was open late. I stayed because of the people. The staff knew my name by my second week." },
  { q: "What was your first month like?", a: "Honestly, intimidating at first. My coach started me with the basics and checked in every session, so I never felt lost on the floor." },
  { q: "What's changed for you since?", a: "I'm stronger than I've ever been and I actually look forward to training. It stopped being a chore and became part of my week." },
  { q: "What would you tell someone who's nervous to start?", a: "Book the free assessment. Nobody here expects you to know everything on day one. Just show up and the rest follows." },
];

export default function AlexStoryPage() {
  return (
    <>
      <section className="bg-linear-to-b from-black to-surface pt-40 pb-20 lg:pt-56 lg:pb-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10 flex gap-2 text-sm tracking-display text-graphite">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-mist">Member Stories</span>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="chamfer relative aspect-video overflow-hidden lg:col-span-7">
              {videoUrl ? (
                <iframe src={videoUrl} title="Alex's interview" allow="encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 size-full" />
              ) : (
                <Image src="/images/interview.jpg" alt="Alex talking with a coach at Hustle & Muscle" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              )}
            </div>
            <div className="flex flex-col gap-8 lg:col-span-5">
              <p className="text-lg font-medium tracking-display text-brand">Member Story</p>
              <blockquote className="text-3xl font-semibold tracking-display italic lg:text-quote">
                <span className="text-brand">Joining Hustle &amp; Muscle changed how I see fitness.</span> I feel stronger, more confident, and
                actually excited to show up.
              </blockquote>
              <p className="text-xl font-light tracking-display text-graphite italic">Alex, member for 3 years</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container>
          <div className="flex max-w-196 flex-col gap-12">
            <h1 className="text-4xl font-bold tracking-display md:text-5xl lg:text-section">The full interview</h1>
            {interview.map((item) => (
              <div key={item.q} className="flex flex-col gap-4 border-t border-white/10 pt-8">
                <h2 className="text-2xl font-medium tracking-display text-brand lg:text-heading">{item.q}</h2>
                <p className="text-lg tracking-display text-mist md:text-xl">{item.a}</p>
              </div>
            ))}
            <div className="flex flex-wrap gap-4 pt-4">
              <ButtonLink href="/why-hustle-and-muscle">More Member Reviews</ButtonLink>
              <ButtonLink href="/membership" variant="outline" icon={false}>
                Start Your Story
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title="Your first step is free.">Book a free assessment and see why members like Alex stay for years.</CtaBand>
    </>
  );
}
