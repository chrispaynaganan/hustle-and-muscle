import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "About Us" };

export default function Page() {
  return <ComingSoon title="About Us" blurb="The story behind Hustle & Muscle, our team, and our community is on its way. In the meantime, drop by the gym or send us a message." />;
}
