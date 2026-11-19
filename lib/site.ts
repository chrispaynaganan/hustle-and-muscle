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
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
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
    href: "/membership",
    children: [
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
