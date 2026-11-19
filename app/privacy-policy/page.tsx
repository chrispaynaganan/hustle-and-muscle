import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("privacy-policy");

export const metadata: Metadata = { title: doc.title, description: doc.intro };

export default function PrivacyPage() {
  return <LegalPage doc={doc} />;
}
