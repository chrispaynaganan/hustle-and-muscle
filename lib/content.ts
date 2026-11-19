export const heroQuotes = [
  "Cozy and comfortable to be in! I recommend this place lalo na ang staff. Warm ng welcome lalo na si Ate Clarisse!",
  "Cozy and comfortable to be in! I recommend this place lalo na ang staff. Warm ng welcome lalo na si Ate Clarisse!",
];

export const partners = [
  { name: "Blitz", src: "/images/partner-1.png", width: 480, height: 127 },
  { name: "VeritasPay", src: "/images/partner-2.png", width: 480, height: 103 },
  { name: "Shua", src: "/images/partner-3.png", width: 480, height: 126 },
  { name: "Ghost", src: "/images/partner-4.png", width: 331, height: 160 },
  { name: "Athlene", src: "/images/partner-5.png", width: 480, height: 119 },
  { name: "Garmin", src: "/images/partner-6.png", width: 480, height: 129 },
];

export type Program = {
  badge?: string;
  title: string;
  price: string;
  unit: string;
  schedule: string;
  coach: string;
  howItWorks: string;
  primaryCta: string;
  image: string;
};

export const generalPrograms: Program[] = [
  {
    badge: "Most Popular",
    title: "Weight Loss and Fat Burning Program",
    price: "₱6,500",
    unit: "/6 sessions",
    schedule: "Flexible",
    coach: "Assigned upon assessment",
    howItWorks: "Personalized training focused on fat loss through strength, conditioning, and lifestyle guidance.",
    primaryCta: "Join the Program",
    image: "/images/program-1.jpg",
  },
  {
    badge: "Most Popular",
    title: "Strength Training Program",
    price: "₱6,000",
    unit: "/6 sessions",
    schedule: "Flexible",
    coach: "Assigned upon assessment",
    howItWorks:
      "Members train under structured strength programs with progressive loading. One coach can handle multiple clients at different levels.",
    primaryCta: "Start Training Today",
    image: "/images/program-2.jpg",
  },
];

export type GroupClass = {
  title: string;
  price: string;
  unit: string;
  coach: string;
  details: string;
  slotsLeft?: number;
  featured?: boolean;
};

export const groupClasses: GroupClass[] = [
  {
    title: "HIIT Group Training",
    price: "₱3,500",
    unit: "/10 sessions",
    coach: "Coach Alex",
    details:
      "Enter the world of high-intensity full body workouts focused on fat burn and conditioning. Every Friday at 6:30 PM to 7:30 PM.",
    slotsLeft: 10,
    featured: true,
  },
  {
    title: "Core and Abs",
    price: "₱3,000",
    unit: "/10 sessions",
    coach: "Coach Alex",
    details: "Wednesdays at 7PM–8PM",
  },
  {
    title: "Boxing Fitness",
    price: "₱5,500",
    unit: "/12 sessions",
    coach: "Coach Alex",
    details: "Mondays and Tuesdays at 7PM",
  },
];

export const monthlyInclusions = [
  "Unlimited Gym Access",
  "24/7 Access",
  "Fully Air-Conditioned",
  "Hot & Cold Showers",
  "Spacious Lockers",
  "Free Wi-Fi",
  "Free Parking",
];

export const longerMemberships = [
  { title: "Quarterly Membership", price: "₱7,000", savings: "Save ₱500" },
  { title: "Semi-Annual Membership", price: "₱12,500", savings: "Save ₱2,500" },
  { title: "Extended Membership", price: "₱17,500", savings: "Save ₱5,000" },
  { title: "Annual Membership", price: "₱22,000", savings: "Save ₱8,000" },
];

export const dayPasses = [
  { title: "For Members", price: "₱200" },
  { title: "For Non-Members", price: "₱250" },
];

export const testimonials = [
  {
    name: "Sharon",
    rating: 5,
    quote:
      "I've been hitting up Hustle & Muscle Fitness for two weeks now, and I have to say, it's fantastic! The atmosphere is super motivating, and the trainers really know their stuff. I feel stronger and more energized every day!",
  },
  {
    name: "Lisa",
    rating: 4,
    quote:
      "For the past 10 months, I've been going to Hustle & Muscle Fitness, and I absolutely love it! The vibe is super motivating, and the trainers are awesome. I feel stronger and more energized every day!",
  },
  {
    name: "James",
    rating: 4,
    quote:
      "After spending some time at various gyms, I finally decided to join Hustle & Muscle Fitness, and I couldn't be happier! The vibe here is incredibly motivating, and the trainers are top-notch. I'm feeling stronger and more energized every single day!",
  },
];

export const coaches = [
  { name: "Coach Mark Santos", role: "Strength and Conditioning Coach", motto: "Progress over perfection.", image: "/images/coach-1.jpg" },
  { name: "Coach Jay Mendoza", role: "Boxing and Muay Thai Coach", motto: "Discipline builds champions.", image: "/images/coach-2.jpg" },
  { name: "Coach Ana Reyes", role: "Strength and Weight Loss Coach", motto: "Strong looks different on everyone.", image: "/images/coach-3.jpg" },
  { name: "Coach Paolo Dizon", role: "HIIT and Conditioning Coach", motto: "Consistency beats intensity.", image: "/images/coach-4.jpg" },
  { name: "Coach Rhea Cruz", role: "Mobility and Recovery Coach", motto: "Move better to train longer.", image: "/images/coach-5.jpg" },
  { name: "Coach Luis Navarro", role: "Strength and Hypertrophy Coach", motto: "Train heavy. Recover smarter.", image: "/images/coach-6.jpg" },
];

export const contactSteps = [
  { title: "Send your Inquiry", body: "Fill out the form with your goal and preferred program. It takes less than a minute." },
  { title: "We Contact You", body: "Our team reaches out using your preferred contact method to answer questions and confirm details." },
  { title: "Free Assessment", body: "Visit the gym for a quick fitness assessment and program recommendation based on your goals." },
  { title: "Start Training", body: "Choose your program, lock in your schedule, and start training right away." },
];
