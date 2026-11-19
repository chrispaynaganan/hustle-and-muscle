import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("cookie-policy");

export const metadata: Metadata = { title: doc.title, description: doc.intro };

export default function CookiePage() {
  return <LegalPage doc={doc} />;
}
