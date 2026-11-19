import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("terms");

export const metadata: Metadata = { title: doc.title, description: doc.intro };

export default function TermsPage() {
  return <LegalPage doc={doc} />;
}
