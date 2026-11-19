import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { ChamferCard } from "@/components/chamfer-card";
import { Triangle } from "@/components/icons";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand, Faq, SplitImage, StepList } from "@/components/sections";
import { mealPlanFaqs, mealPlanSteps, mealPlans, sampleDay } from "@/lib/content";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meal Plans",
  description: "Coach-built meal plans for fat loss, muscle gain and performance, made with everyday Filipino food.",
};

export default function MealPlansPage() {
  return (
    <>
      <PageHero
        title="Meal Plans"
        description="Training builds the engine. Food is the fuel. Get a plan built around your goal, your budget and the food you already love."
        image="/images/program-1.jpg"
        imagePosition="object-right"
      />

      {/* Plans */}
      <section id="plans" className="scroll-mt-10 bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <SectionHeading title="Eat for your goal.">Three starting points. Your coach fine-tunes the details after your assessment.</SectionHeading>
          <div data-reveal-group className="mt-14 grid gap-8 lg:grid-cols-3">
            {mealPlans.map((plan) => (
              <ChamferCard key={plan.title} glow={!!plan.badge}>
                <div className="flex h-full flex-col gap-8 px-6 py-8 sm:px-10">
                  <div className="flex flex-col gap-4.5">
                    {plan.badge ? (
                      <span className="self-start bg-brand p-3 text-lg font-medium tracking-display">{plan.badge}</span>
                    ) : (
                      <span aria-hidden className="hidden h-13 lg:block" />
                    )}
                    <h3 className="text-3xl font-bold tracking-display lg:text-heading">{plan.title}</h3>
                    <p className="text-lg tracking-display text-mist">{plan.for}</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className="text-xl font-semibold tracking-display italic">What you get</p>
                    <ul className="flex flex-col gap-4 text-lg tracking-display">
                      {plan.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Triangle className="mt-1.5 size-3 shrink-0 text-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-2">
                    <ButtonLink href={contactHref("meal-plan", `${plan.title} meal plan`)} variant={plan.badge ? "solid" : "outline"}>
                      Ask About This Plan
                    </ButtonLink>
                  </div>
                </div>
              </ChamferCard>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-10 bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container>
          <SectionHeading title="How it Works">No fad diets and no copy-paste plans. Just steady progress you can keep up.</SectionHeading>
          <div className="mt-14">
            <StepList steps={mealPlanSteps} />
          </div>
        </Container>
      </section>

      {/* Sample day */}
      <section id="sample-day" className="scroll-mt-10 bg-black py-20 lg:py-24">
        <Container>
          <SplitImage image="/images/consult-coach.png" alt="Hustle & Muscle coach" reverse>
            <SectionHeading title="A sample day">
              Real food, local favorites, sensible portions. Here&apos;s what a day on the Fat Loss plan can look like.
            </SectionHeading>
            <ol data-reveal-group className="w-full divide-y divide-white/10 border-y border-white/10">
              {sampleDay.map((item) => (
                <li key={item.meal} className="grid gap-2 py-5 sm:grid-cols-4 sm:gap-6">
                  <span className="text-lg font-semibold tracking-display text-brand italic">{item.meal}</span>
                  <span className="text-lg tracking-display sm:col-span-3">{item.food}</span>
                </li>
              ))}
            </ol>
            <p className="text-base tracking-display text-graphite italic">Sample only. Your coach sets your actual portions and targets.</p>
          </SplitImage>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faqs" className="scroll-mt-10 bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-3 lg:gap-20">
          <SectionHeading title="FAQs" />
          <div className="lg:col-span-2">
            <Faq items={mealPlanFaqs} />
          </div>
        </Container>
      </section>

      <CtaBand title="Not sure where to start?" cta="Book a Free Consultation">
        Your free consultation covers body composition, dietary restrictions and goals, so your plan fits from day one.
      </CtaBand>
    </>
  );
}
