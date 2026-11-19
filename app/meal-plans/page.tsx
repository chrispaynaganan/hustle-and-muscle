import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Meal Plans" };

export default function Page() {
  return <ComingSoon title="Meal Plans" blurb="Coach-built meal plans that match your training program are coming soon. Ask about nutrition guidance during your free assessment." />;
}
