import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Supplements" };

export default function Page() {
  return <ComingSoon title="Supplements" blurb="Our curated supplement lineup from trusted partners is coming soon. Ask our coaches what fits your goals." />;
}
