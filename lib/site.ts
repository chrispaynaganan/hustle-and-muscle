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
    href: "/#programs",
    children: [
      { label: "General Programs", href: "/#programs" },
      { label: "Group Classes", href: "/#classes" },
      { label: "Memberships", href: "/#membership" },
    ],
  },
  {
    label: "Coaches",
    href: "/coaches",
    children: [
      { label: "Meet the Coaches", href: "/coaches" },
      { label: "Book an Assessment", href: "/contact" },
    ],
  },
  {
    label: "Meal Plans",
    href: "/meal-plans",
    children: [{ label: "Coming Soon", href: "/meal-plans" }],
  },
  {
    label: "Supplements",
    href: "/supplements",
    children: [{ label: "Coming Soon", href: "/supplements" }],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav = [
  [
    { label: "Membership", href: "/#membership" },
    { label: "Personal Training", href: "/#programs" },
    { label: "Classes", href: "/#classes" },
    { label: "Why Hustle & Muscle", href: "/about" },
  ],
  [
    { label: "Blog", href: "/about" },
    { label: "Events", href: "/about" },
    { label: "Clubs", href: "/about" },
    { label: "Refer a Friend", href: "/contact" },
  ],
  [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/contact" },
    { label: "Careers", href: "/contact" },
  ],
];

export const policyLinks = ["Club Rules", "Cookie Policy", "Privacy Policy", "Terms and Conditions"];
