// Sample job openings. Replace with the gym's real vacancies.

export type Role = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  about: string[];
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  schedule: string;
};

export const roles: Role[] = [
  {
    slug: "strength-and-conditioning-coach",
    title: "Strength and Conditioning Coach",
    type: "Full-time",
    summary: "Run personal training programs and small-group sessions for members of every level.",
    about: [
      "You'll coach members one-on-one and in small groups through our General Programs, from first-timers learning to squat to experienced lifters chasing new numbers.",
      "You'll also run free assessments for new members and help match them with the right program, class or membership.",
    ],
    responsibilities: [
      "Run free assessments and write personalized training plans",
      "Coach one-on-one and small-group program sessions",
      "Track client progress and adjust programs every block",
      "Keep the training floor safe and help members with equipment and form",
    ],
    requirements: [
      "Recognized fitness or coaching certification",
      "At least 2 years of coaching experience",
      "Strong technique on the main barbell lifts",
      "Great communication with beginners",
    ],
    perks: ["Free gym membership", "Commission on programs you coach", "Continuing education support", "Staff discount on supplements and merch"],
    schedule: "5 days a week, shifting schedule including some early mornings or evenings",
  },
  {
    slug: "gx-class-instructor",
    title: "GX Class Instructor",
    type: "Part-time",
    summary: "Lead high-energy group classes such as HIIT, core or mobility on weekday evenings and weekends.",
    about: [
      "You'll plan and lead group exercise classes for 10 to 20 members at a time, keeping every session safe, scalable and fun.",
    ],
    responsibilities: [
      "Plan and lead scheduled GX classes",
      "Offer easier and harder options for every movement",
      "Welcome new members and help them settle in",
      "Keep class attendance records",
    ],
    requirements: ["Group fitness teaching experience", "Energy and a strong, clear voice", "Available weekday evenings and weekends", "CPR or first aid training is a plus"],
    perks: ["Free gym membership", "Per-class pay", "Staff discount on supplements and merch"],
    schedule: "3 to 5 classes a week, evenings and weekends",
  },
  {
    slug: "front-desk-and-membership-associate",
    title: "Front Desk and Membership Associate",
    type: "Full-time · Shifting",
    summary: "Welcome members, handle sign-ups and shop orders, and keep the gym running smoothly.",
    about: [
      "You're the first face members see. You'll handle check-ins, memberships, payments and online shop orders, and make everyone feel at home.",
    ],
    responsibilities: [
      "Greet members and guests and manage check-ins",
      "Process memberships, renewals, day passes and payments",
      "Prepare online shop orders for pick-up and delivery",
      "Answer calls, messages and walk-in inquiries",
      "Help keep the gym clean and organized",
    ],
    requirements: ["Customer service or sales experience", "Comfortable with shifting schedules, including nights", "Organized and good with basic computer tasks", "Interest in fitness is a plus"],
    perks: ["Free gym membership", "Sales incentives", "Staff discount on supplements and merch"],
    schedule: "5 days a week, rotating morning, afternoon and night shifts",
  },
];

export function getRole(slug: string) {
  return roles.find((r) => r.slug === slug);
}

export function applicationFields(defaultRole?: string) {
  return [
    { name: "name", label: "Full Name" },
    { name: "email", label: "Email Address", type: "email" as const, half: true },
    { name: "mobile", label: "Mobile Number", type: "tel" as const, half: true },
    { name: "role", label: "Role", type: "select" as const, options: [...roles.map((r) => r.title), "Other"], defaultValue: defaultRole },
    { name: "resume", label: "Link to your resume or portfolio", type: "url" as const, required: false, placeholder: "https://" },
    { name: "about", label: "Why do you want to join?", type: "textarea" as const },
  ];
}
