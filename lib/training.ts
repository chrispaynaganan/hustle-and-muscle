// Programs, GX classes and memberships. Prices from the Figma file;
// the extra programs/classes marked "sample" are placeholders to confirm.

export type Program = {
  slug: string;
  badge?: string;
  title: string;
  short: string;
  price: number;
  unit: string;
  schedule: string;
  coach: string;
  coachSlugs: string[];
  howItWorks: string;
  primaryCta: string;
  image: string;
  featured?: boolean;
  forWho: string[];
  includes: string[];
  overview: string[];
};

export const programs: Program[] = [
  {
    slug: "weight-loss-and-fat-burning",
    badge: "Most Popular",
    title: "Weight Loss and Fat Burning Program",
    short: "Lose fat while getting stronger, with a coach who keeps you accountable.",
    price: 6500,
    unit: "/6 sessions",
    schedule: "Flexible",
    coach: "Assigned upon assessment",
    coachSlugs: ["ana-reyes", "paolo-dizon"],
    howItWorks: "Personalized training focused on fat loss through strength, conditioning, and lifestyle guidance.",
    primaryCta: "Join the Program",
    image: "/images/program-1.jpg",
    featured: true,
    forWho: ["Members with a clear weight loss goal", "Beginners who want structure", "Anyone restarting after a long break"],
    includes: ["Free body composition assessment", "6 one-on-one coached sessions", "Personal workout plan", "Basic nutrition guidance", "Progress check-in at session 6"],
    overview: [
      "This is our most requested program. Your coach combines strength training, conditioning and simple nutrition habits so you lose fat without losing muscle or energy.",
      "Every session is one-on-one and scheduled around you. Between sessions you get a plan to follow on your own, so the progress keeps coming.",
    ],
  },
  {
    slug: "strength-training",
    badge: "Most Popular",
    title: "Strength Training Program",
    short: "Structured strength blocks with progressive loading for every level.",
    price: 6000,
    unit: "/6 sessions",
    schedule: "Flexible",
    coach: "Assigned upon assessment",
    coachSlugs: ["mark-santos", "luis-navarro"],
    howItWorks:
      "Members train under structured strength programs with progressive loading. One coach can handle multiple clients at different levels.",
    primaryCta: "Start Training Today",
    image: "/images/program-2.jpg",
    featured: true,
    forWho: ["Members who want to get stronger", "Lifters who want better technique", "Athletes building a base"],
    includes: ["Free strength assessment", "6 coached sessions in a small group", "Progressive program you keep", "Technique feedback on the main lifts"],
    overview: [
      "Learn to squat, hinge, press and pull with confidence. Your coach writes a progressive block for your level and adjusts the weights as you get stronger.",
      "Sessions run in small groups, so you get coaching attention at a lower price and train alongside members with the same goal.",
    ],
  },
  {
    slug: "boxing-and-muay-thai-one-on-one",
    title: "Boxing and Muay Thai 1-on-1",
    short: "Private striking sessions built around your level and goals.",
    price: 5000,
    unit: "/6 sessions",
    schedule: "Flexible",
    coach: "Coach Jay Mendoza",
    coachSlugs: ["jay-mendoza"],
    howItWorks: "Private padwork, technique and conditioning sessions for beginners and amateur competitors.",
    primaryCta: "Book Your Sessions",
    image: "/images/coach-2.jpg",
    forWho: ["Complete beginners to striking", "Members preparing for amateur bouts", "Anyone who wants a fun cardio alternative"],
    includes: ["6 private sessions", "Hand wraps on your first session", "Technique and padwork", "Fight-conditioning finishers"],
    overview: [
      "Get personal attention on stance, footwork and combinations. Sessions progress from fundamentals to padwork and light drilling as you're ready.",
    ],
  },
  {
    slug: "mobility-and-recovery",
    title: "Mobility and Recovery",
    short: "Move without pain and keep training for years.",
    price: 4500,
    unit: "/6 sessions",
    schedule: "Flexible",
    coach: "Coach Rhea Cruz",
    coachSlugs: ["rhea-cruz"],
    howItWorks: "One-on-one mobility, core and recovery work to fix stiffness and keep you training consistently.",
    primaryCta: "Book Your Sessions",
    image: "/images/coach-5.jpg",
    forWho: ["Desk workers with tight backs and hips", "Lifters who want better positions", "Members returning after time off"],
    includes: ["Movement screen", "6 one-on-one sessions", "Daily 10-minute mobility routine", "Recovery and breathing guide"],
    overview: [
      "We start with a movement screen to find what's tight, weak or stuck. Then your coach builds sessions and a short daily routine to fix it.",
      "If you have an injury, please get cleared by your doctor or physical therapist first.",
    ],
  },
];

export type GxClass = {
  slug: string;
  title: string;
  short: string;
  price: number;
  unit: string;
  coachSlug: string;
  schedule: string;
  slots: { day: string; time: string }[];
  details: string;
  slotsLeft?: number;
  featured?: boolean;
  home?: boolean;
  level: string;
  duration: string;
  bring: string[];
  overview: string[];
};

export const gxClasses: GxClass[] = [
  {
    slug: "hiit-group-training",
    title: "HIIT Group Training",
    short: "High-intensity full-body workouts for fat burn and conditioning.",
    price: 3500,
    unit: "/10 sessions",
    coachSlug: "paolo-dizon",
    schedule: "Fridays, 6:30 PM to 7:30 PM",
    slots: [{ day: "Friday", time: "6:30 PM" }],
    details:
      "Enter the world of high-intensity full body workouts focused on fat burn and conditioning. Every Friday at 6:30 PM to 7:30 PM.",
    slotsLeft: 10,
    featured: true,
    home: true,
    level: "All levels",
    duration: "60 minutes",
    bring: ["Towel", "Water bottle", "Training shoes"],
    overview: [
      "Short work intervals, quick rests and a room full of energy. Every movement has an easier and harder option, so beginners and regulars train side by side.",
    ],
  },
  {
    slug: "core-and-abs",
    title: "Core and Abs",
    short: "A focused core session for strength, posture and a stronger midsection.",
    price: 3000,
    unit: "/10 sessions",
    coachSlug: "rhea-cruz",
    schedule: "Wednesdays, 7:00 PM to 8:00 PM",
    slots: [{ day: "Wednesday", time: "7:00 PM" }],
    details: "Wednesdays at 7PM–8PM",
    home: true,
    level: "All levels",
    duration: "60 minutes",
    bring: ["Towel", "Water bottle"],
    overview: [
      "Planks, carries, anti-rotation work and controlled ab training. A stronger core means better lifts and a happier lower back.",
    ],
  },
  {
    slug: "boxing-fitness",
    title: "Boxing Fitness",
    short: "Learn real boxing fundamentals while getting a serious workout.",
    price: 5500,
    unit: "/12 sessions",
    coachSlug: "jay-mendoza",
    schedule: "Mondays and Tuesdays, 7:00 PM",
    slots: [
      { day: "Monday", time: "7:00 PM" },
      { day: "Tuesday", time: "7:00 PM" },
    ],
    details: "Mondays and Tuesdays at 7PM",
    home: true,
    level: "Beginner to intermediate",
    duration: "60 minutes",
    bring: ["Hand wraps", "Boxing gloves (loaners available)", "Water bottle"],
    overview: [
      "Footwork, combinations, bag rounds and partner drills. No sparring, just great technique and conditioning.",
    ],
  },
  {
    slug: "muay-thai-fundamentals",
    title: "Muay Thai Fundamentals",
    short: "Kicks, knees, elbows and clinch work for beginners.",
    price: 5500,
    unit: "/12 sessions",
    coachSlug: "jay-mendoza",
    schedule: "Thursdays at 7:00 PM, Saturdays at 10:00 AM",
    slots: [
      { day: "Thursday", time: "7:00 PM" },
      { day: "Saturday", time: "10:00 AM" },
    ],
    details: "Thursdays at 7PM and Saturdays at 10AM",
    level: "Beginner",
    duration: "60 minutes",
    bring: ["Hand wraps", "Shin guards (loaners available)", "Water bottle"],
    overview: ["The art of eight limbs, taught from the ground up. Build balance, power and confidence in a supportive group."],
  },
  {
    slug: "mobility-flow",
    title: "Mobility Flow",
    short: "A slower class to open tight hips, shoulders and backs.",
    price: 2500,
    unit: "/10 sessions",
    coachSlug: "rhea-cruz",
    schedule: "Sundays, 9:00 AM",
    slots: [{ day: "Sunday", time: "9:00 AM" }],
    details: "Sundays at 9AM",
    level: "All levels",
    duration: "45 minutes",
    bring: ["Mat (provided)", "Comfortable clothes"],
    overview: ["The perfect recovery day class. Guided mobility, stretching and breathing to help you feel and move better."],
  },
];

export type Membership = {
  slug: string;
  title: string;
  price: number;
  unit?: string;
  savings?: string;
  badge?: string;
  note?: string;
  kind: "membership" | "day-pass";
};

export const membershipFee = 2000;

export const memberships: Membership[] = [
  { slug: "monthly", title: "Monthly Membership", price: 2500, unit: "/month", badge: "Most Flexible", kind: "membership" },
  { slug: "quarterly", title: "Quarterly Membership", price: 7000, savings: "Save ₱500", unit: "/3 months", kind: "membership" },
  { slug: "semi-annual", title: "Semi-Annual Membership", price: 12500, savings: "Save ₱2,500", unit: "/6 months", kind: "membership" },
  { slug: "extended", title: "Extended Membership", price: 17500, savings: "Save ₱5,000", unit: "/9 months", kind: "membership" },
  { slug: "annual", title: "Annual Membership", price: 22000, savings: "Save ₱8,000", unit: "/12 months", kind: "membership" },
  { slug: "day-pass-member", title: "Day Pass for Members", price: 200, unit: "/day", kind: "day-pass" },
  { slug: "day-pass-non-member", title: "Day Pass for Non-Members", price: 250, unit: "/day", kind: "day-pass" },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}

export function getClass(slug: string) {
  return gxClasses.find((c) => c.slug === slug);
}
