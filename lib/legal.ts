// Starter legal and policy text. This is a general template, not legal advice:
// have it reviewed and adjusted before the site is used by real customers.

export type LegalDoc = {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body?: string[]; list?: string[] }[];
};

const updated = "November 2026";
export const legalUpdated = updated;

export const legalDocs: LegalDoc[] = [
  {
    slug: "club-rules",
    title: "Club Rules",
    intro: "These rules keep Hustle & Muscle safe, clean and welcoming for everyone. By using the gym, you agree to follow them.",
    sections: [
      {
        heading: "Access and membership",
        list: [
          "Always tap in with your own member card or QR code. Access cards can't be shared or lent.",
          "Guests must buy a day pass and sign a waiver at the front desk.",
          "Members under 18 need written consent from a parent or guardian.",
        ],
      },
      {
        heading: "On the training floor",
        list: [
          "Wear proper training clothes and closed, clean shoes at all times.",
          "Wipe down benches and equipment after every use. Towels are required.",
          "Re-rack weights and return dumbbells, plates and accessories after use.",
          "Don't drop dumbbells or barbells except on designated lifting platforms.",
          "Share equipment during busy hours and allow others to work in between sets.",
          "Use collars on loaded barbells and ask for a spotter on heavy lifts.",
        ],
      },
      {
        heading: "Respect and conduct",
        list: [
          "Treat members, coaches and staff with respect. Harassment of any kind isn't tolerated.",
          "Only Hustle & Muscle coaches may give paid personal training on the premises.",
          "Keep music on headphones and phone calls short.",
          "Ask before filming, and never record other members without their consent.",
        ],
      },
      {
        heading: "Facilities",
        list: [
          "Lockers are for use while you train. Items left overnight may be removed.",
          "Hustle & Muscle isn't responsible for lost or stolen items. Please lock up valuables.",
          "No smoking, vaping, alcohol or illegal substances anywhere in the gym.",
          "Report damaged equipment or injuries to staff immediately.",
        ],
      },
      {
        heading: "Breaking the rules",
        body: ["Staff may give a warning, ask a member to leave for the day, or suspend or cancel a membership for serious or repeated violations."],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    intro:
      "Hustle & Muscle respects your privacy. This policy explains what personal information we collect, why we collect it and how we protect it, in line with the Philippine Data Privacy Act of 2012 (Republic Act No. 10173).",
    sections: [
      {
        heading: "Information we collect",
        list: [
          "Contact details you give us, such as your name, mobile number, email and address.",
          "Membership details, such as your plan, start date and attendance.",
          "Fitness information you choose to share during assessments, such as goals, measurements and health notes.",
          "Order details from the online shop, such as items purchased and delivery address.",
          "Basic website usage data collected through cookies (see our Cookie Policy).",
        ],
      },
      {
        heading: "How we use it",
        list: [
          "To manage your membership, programs, classes and orders.",
          "To contact you about inquiries, bookings, payments and deliveries.",
          "To design safe, effective training and meal plans for you.",
          "To send news and offers, only if you subscribe. You can unsubscribe at any time.",
        ],
      },
      {
        heading: "Sharing your information",
        body: [
          "We don't sell your personal information. We only share it with service providers who help us run the gym, such as payment processors and couriers, and only as needed to provide the service. We may also disclose information when required by law.",
        ],
      },
      {
        heading: "Keeping it safe",
        body: [
          "We use reasonable physical, technical and organizational measures to protect your data. Only authorized staff can access member records, and we keep information only as long as needed for the purposes above or as required by law.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You have the right to be informed, to access, correct or delete your personal data, to object to processing, and to file a complaint with the National Privacy Commission. To make a request, contact us using the details below.",
        ],
      },
      {
        heading: "Contact us",
        body: ["Email hustleandmusclegym247@gmail.com or call 0995 122 3189 for any privacy concern."],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    intro: "This policy explains how the Hustle & Muscle website uses cookies and similar technologies.",
    sections: [
      {
        heading: "What are cookies?",
        body: ["Cookies are small files stored in your browser. They help websites remember information between visits, like the items in your cart."],
      },
      {
        heading: "How we use them",
        list: [
          "Essential storage: keeps your shopping cart and checkout working. This is stored in your browser and isn't used to track you.",
          "Analytics (if enabled): helps us understand which pages are popular so we can improve the site. This data is aggregated and anonymous.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can clear or block cookies and site data in your browser settings at any time. If you block essential storage, your cart may not be saved between visits.",
        ],
      },
      {
        heading: "Changes",
        body: ["We may update this policy from time to time. The latest version will always be on this page."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms and Conditions",
    intro: "These terms apply to Hustle & Muscle memberships, programs, classes and online purchases. Please read them before joining or ordering.",
    sections: [
      {
        heading: "Memberships",
        list: [
          "Membership prices are shown on the Membership page. A ₱2,000 annual membership fee applies once per year.",
          "Memberships are personal and non-transferable.",
          "Membership periods start on your first day of access and aren't extended for days not used, except for approved freezes.",
          "You must be in good health to train. Consult a doctor before starting if you have a medical condition, are pregnant or are recovering from an injury.",
        ],
      },
      {
        heading: "Programs and classes",
        list: [
          "Program sessions and class packs must be used within their validity period (class packs: 2 months from first session).",
          "Cancel or reschedule program sessions at least 12 hours in advance, or the session may be counted as used.",
          "Class schedules and coaches may change. We'll notify affected members as early as possible.",
        ],
      },
      {
        heading: "Online orders",
        list: [
          "Prices are in Philippine pesos and may change without notice. The price at the time of your order applies.",
          "Orders are confirmed once our team contacts you and payment is received.",
          "Pick-up orders not collected within 14 days may be cancelled.",
          "Unopened supplements and unworn merch with tags can be exchanged within 7 days. Opened supplements can't be returned.",
        ],
      },
      {
        heading: "Payments and refunds",
        body: [
          "Memberships, programs and class packs are non-refundable once access has started, except where required by law or approved by management.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "You train at your own risk. Hustle & Muscle is not liable for injuries, loss or damage except where caused by our negligence. Follow coach instructions and the Club Rules at all times.",
        ],
      },
      {
        heading: "Changes to these terms",
        body: ["We may update these terms. Continued use of the gym or website after changes means you accept the updated terms."],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug)!;
}
