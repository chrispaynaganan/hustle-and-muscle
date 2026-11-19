import { coaches } from "./coaches";

export const site = {
  name: "Hustle & Muscle",
  tagline: "Build the Body That Powers Your Life.",
  description:
    "We are dedicated to helping you achieve your fitness goals and improve your overall health and well-being.",
  address: "B3 L5-A, Tamarind Street, Greenwoods Executive Village 1602",
  phone: "0995 122 3189",
  phoneHref: "tel:+639951223189",
  email: "hustleandmusclegym247@gmail.com",
  // Add the gym's real profile URLs here. Empty ones are hidden in the footer.
  socials: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "Packages",
    href: "/packages",
    children: [
      { label: "All Packages", href: "/packages" },
      { label: "Memberships", href: "/membership" },
      { label: "General Programs", href: "/programs" },
      { label: "GX Classes", href: "/classes" },
    ],
  },
  {
    label: "Coaches",
    href: "/coaches",
    children: [
      { label: "Meet the Coaches", href: "/coaches" },
      ...coaches.map((c) => ({ label: c.name.replace("Coach ", ""), href: `/coaches/${c.slug}` })),
    ],
  },
  {
    label: "Meal Plans",
    href: "/meal-plans",
    children: [
      { label: "Plans by Goal", href: "/meal-plans#plans" },
      { label: "How it Works", href: "/meal-plans#how-it-works" },
      { label: "Sample Day", href: "/meal-plans#sample-day" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Supplements", href: "/supplements" },
      { label: "Merch", href: "/merch" },
      { label: "All Products", href: "/shop" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav = [
  [
    { label: "Membership", href: "/membership" },
    { label: "Personal Training", href: "/programs" },
    { label: "Classes", href: "/classes" },
    { label: "Why Hustle & Muscle", href: "/why-hustle-and-muscle" },
  ],
  [
    { label: "About Us", href: "/about" },
    { label: "Meal Plans", href: "/meal-plans" },
    { label: "Supplements", href: "/supplements" },
    { label: "Merch", href: "/merch" },
    { label: "Refer a Friend", href: "/refer-a-friend" },
  ],
  [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Careers", href: "/careers" },
    { label: "Coaches", href: "/coaches" },
  ],
];

export const policyLinks = [
  { label: "Club Rules", href: "/club-rules" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
];

/** Topics for the contact form's "What can we help you with?" dropdown. */
export const contactTopics = {
  assessment: "Free assessment",
  membership: "Membership",
  program: "Personal training program",
  classes: "Group classes",
  "meal-plan": "Meal plan",
  coaching: "Session with a specific coach",
  tour: "Gym tour",
  shop: "Shop order",
  other: "Something else",
} as const;

export type ContactTopic = keyof typeof contactTopics;

/** Link to the contact form with the topic (and optional subject) pre-filled. */
export function contactHref(topic: ContactTopic, about?: string) {
  const q = new URLSearchParams({ topic });
  if (about) q.set("about", about);
  return `/contact?${q.toString()}#inquiry`;
}
