import type { Metadata } from "next";
import { ChamferCard } from "@/components/chamfer-card";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { StepList } from "@/components/sections";
import { SimpleForm } from "@/components/simple-form";

export const metadata: Metadata = {
  title: "Refer a Friend",
  description: "Bring a friend to Hustle & Muscle. When they join, you both get rewarded.",
};

// Sample reward. Confirm the real referral offer with the gym.
const steps = [
  { title: "Send their details", body: "Fill in the form with your friend's name and number. Let them know we'll be reaching out." },
  { title: "They visit and join", body: "Your friend gets a free assessment and a tour, then signs up for any membership." },
  { title: "You both get rewarded", body: "Once they join, you both get one free week added to your membership." },
];

export default function ReferPage() {
  return (
    <>
      <PageHero
        title="Refer a Friend"
        description="Training is better together. Bring a friend to Hustle & Muscle and you both get a free week when they join."
        image="/images/interview.jpg"
      />
      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <SectionHeading title="How it Works" />
          <div className="mt-14">
            <StepList steps={steps} columns={3} />
          </div>
        </Container>
      </section>
      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading title={<>One free week, <span className="text-brand">each.</span></>}>
              There&apos;s no limit to how many friends you can refer. Rewards are added once your friend&apos;s membership is active.
            </SectionHeading>
            <p className="text-base tracking-display text-graphite">Referred friends must be new members. One reward per new member. Rewards can&apos;t be exchanged for cash.</p>
          </div>
          <ChamferCard hover={false}>
            <div className="px-6 py-10 sm:px-10.5">
              <SimpleForm
                submitLabel="Send Referral"
                successTitle="Referral sent!"
                successBody="Thanks for spreading the word. We'll reach out to your friend and let you know when they join."
                fields={[
                  { name: "your-name", label: "Your Name", half: true },
                  { name: "your-mobile", label: "Your Mobile Number", type: "tel", half: true },
                  { name: "friend-name", label: "Friend's Name", half: true },
                  { name: "friend-mobile", label: "Friend's Mobile Number", type: "tel", half: true },
                  { name: "friend-goal", label: "What's their goal?", type: "select", options: ["Lose weight", "Build muscle", "Get stronger", "Learn boxing or Muay Thai", "Not sure yet"] },
                  { name: "note", label: "Anything we should know?", type: "textarea", required: false, placeholder: "e.g. best time to call" },
                ]}
              />
            </div>
          </ChamferCard>
        </Container>
      </section>
    </>
  );
}
