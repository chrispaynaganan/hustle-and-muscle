import type { Metadata } from "next";
import { ChamferCard } from "@/components/chamfer-card";
import { Triangle } from "@/components/icons";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { SimpleForm } from "@/components/simple-form";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Hustle & Muscle team. See open roles for coaches and front desk staff.",
};

// Sample openings. Replace with the gym's real vacancies.
const roles = [
  {
    title: "Strength and Conditioning Coach",
    type: "Full-time",
    body: "Run personal training programs and small-group sessions for members of every level.",
    needs: ["Recognized fitness or coaching certification", "At least 2 years of coaching experience", "Great communication with beginners"],
  },
  {
    title: "GX Class Instructor",
    type: "Part-time",
    body: "Lead high-energy group classes such as HIIT, core or mobility on weekday evenings and weekends.",
    needs: ["Group fitness experience", "Energy and a strong voice", "Available evenings and weekends"],
  },
  {
    title: "Front Desk and Membership Associate",
    type: "Full-time · Shifting",
    body: "Welcome members, handle sign-ups and shop orders, and keep the gym running smoothly.",
    needs: ["Customer service experience", "Comfortable with shifting schedules", "Interest in fitness is a plus"],
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers"
        description="Love fitness and people? Help our members build the body that powers their life."
        image="/images/hero-coaches.jpg"
      />
      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <SectionHeading title="Open Roles">Don&apos;t see your role? Send us your details anyway. We&apos;re always looking for great people.</SectionHeading>
          <ul className="mt-14 grid gap-8 lg:grid-cols-3">
            {roles.map((r) => (
              <li key={r.title}>
                <ChamferCard size="sm" glow={false} className="h-full">
                  <div className="flex h-full flex-col gap-6 px-6 py-8 sm:px-10">
                    <span className="self-start border border-brand px-3 py-1.5 text-sm tracking-display text-brand">{r.type}</span>
                    <h3 className="text-3xl font-bold tracking-display lg:text-heading">{r.title}</h3>
                    <p className="text-lg tracking-display text-mist">{r.body}</p>
                    <ul className="flex flex-col gap-3 text-base tracking-display">
                      {r.needs.map((n) => (
                        <li key={n} className="flex items-start gap-3">
                          <Triangle className="mt-1 size-3 shrink-0 text-brand" />
                          {n}
                        </li>
                      ))}
                    </ul>
                    <a href="#apply" className="mt-auto pt-2 text-base font-medium text-brand hover:underline">
                      Apply for this role
                    </a>
                  </div>
                </ChamferCard>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section id="apply" className="scroll-mt-10 bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading title="Apply now">Tell us about yourself and we&apos;ll get in touch if there&apos;s a fit.</SectionHeading>
          <ChamferCard>
            <div className="px-6 py-10 sm:px-10.5">
              <SimpleForm
                submitLabel="Submit Application"
                successTitle="Application received!"
                successBody="Thanks for your interest in joining Hustle & Muscle. We'll review your details and reach out if there's a fit."
                fields={[
                  { name: "name", label: "Full Name" },
                  { name: "email", label: "Email Address", type: "email", half: true },
                  { name: "mobile", label: "Mobile Number", type: "tel", half: true },
                  { name: "role", label: "Role", type: "select", options: [...roles.map((r) => r.title), "Other"] },
                  { name: "resume", label: "Link to your resume or portfolio", type: "url", required: false, placeholder: "https://" },
                  { name: "about", label: "Why do you want to join?", type: "textarea" },
                ]}
              />
            </div>
          </ChamferCard>
        </Container>
      </section>
    </>
  );
}
