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

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const aboutStats = [
  { value: "500+", label: "Healthy members" },
  { value: "24/7", label: "Open every day" },
  { value: "6", label: "Certified coaches" },
  { value: "10+", label: "Partner brands" },
];

export const values = [
  { title: "Progress over perfection", body: "Every program starts from where you are today. Small, consistent wins beat crash plans." },
  { title: "Coaching for every level", body: "First-timer or competitor, our coaches assess you first and build the plan around your goal." },
  { title: "Community first", body: "Group classes, friendly staff and members who cheer each other on. You never train alone here." },
  { title: "Always open, always clean", body: "24/7 access, fully air-conditioned floors, hot and cold showers, and equipment that's looked after." },
];

/* ------------------------------------------------------------------ */
/* Meal plans                                                          */
/* ------------------------------------------------------------------ */

export const mealPlans = [
  {
    badge: "Most Popular",
    title: "Fat Loss",
    for: "Members who want to drop body fat without losing strength.",
    includes: ["Calorie and macro targets", "High-protein Filipino meals", "Weekly weigh-in and adjustments", "Eating-out guide"],
  },
  {
    title: "Lean Muscle Gain",
    for: "Lifters who want to build size and strength with a clean surplus.",
    includes: ["Surplus calories that track your lifts", "Pre- and post-workout meals", "Budget-friendly protein sources", "Bi-weekly check-ins"],
  },
  {
    title: "Performance and Maintenance",
    for: "Athletes, boxers and busy members who want steady energy.",
    includes: ["Fueling around training days", "Hydration and recovery plan", "Simple meal-prep templates", "Monthly reviews"],
  },
];

export const mealPlanSteps = [
  { title: "Free Assessment", body: "We check your body composition, routine, food preferences and any dietary restrictions." },
  { title: "Your Plan", body: "Your coach builds targets and meals around your goal, your budget and what you actually like to eat." },
  { title: "Check-ins", body: "Quick check-ins keep you on track. We review progress, cravings and energy with you." },
  { title: "Adjust and Grow", body: "As your body changes, the plan changes with it. No guesswork, no starting over." },
];

export const sampleDay = [
  { meal: "Breakfast", food: "Egg white omelette with tomatoes, garlic rice (½ cup) and black coffee" },
  { meal: "Lunch", food: "Grilled chicken inasal, ensaladang talong and 1 cup brown rice" },
  { meal: "Snack", food: "Greek yogurt with banana, or a protein shake after training" },
  { meal: "Dinner", food: "Sinigang na isda with lots of kangkong and labanos, ½ cup rice" },
];

export const mealPlanFaqs = [
  {
    q: "Do I need to be a member to get a meal plan?",
    a: "Meal plans are built by our coaches after a free assessment, so the best way to start is to book one through the Contact page.",
  },
  {
    q: "Can you work around allergies or dietary restrictions?",
    a: "Yes. Tell us about allergies, intolerances or preferences during your assessment and the plan is built around them. For medical conditions, check with your doctor first.",
  },
  {
    q: "Will I have to cook separate meals from my family?",
    a: "No. Plans use everyday Filipino dishes with adjusted portions, so you can usually eat what's on the table.",
  },
  {
    q: "How much does a meal plan cost?",
    a: "Pricing depends on the plan and how often you check in. We'll walk you through options after your assessment.",
  },
];

/* ------------------------------------------------------------------ */
/* Supplements                                                         */
/* ------------------------------------------------------------------ */

export const supplementCategories = [
  { title: "Protein", body: "Whey and plant protein to help you hit your daily target and recover between sessions.", bestFor: "Muscle gain, fat loss" },
  { title: "Pre-Workout", body: "Energy and focus for early sessions and late-night lifts. Start with a half scoop.", bestFor: "Strength, HIIT" },
  { title: "Creatine", body: "One of the most researched supplements for strength and power. 3–5 g a day, every day.", bestFor: "Strength, boxing" },
  { title: "Recovery and Hydration", body: "Electrolytes and amino acids for long sessions and hot Manila afternoons.", bestFor: "Conditioning, cardio" },
  { title: "Vitamins and Essentials", body: "Multivitamins, fish oil and vitamin D to cover the basics when your diet falls short.", bestFor: "Everyone" },
  { title: "Gym Gear", body: "Shakers, lifting straps, wraps and gloves so you can train safely and comfortably.", bestFor: "Every session" },
];

export const supplementRules = [
  { title: "Food first", body: "Supplements fill gaps. Your meal plan and training do the heavy lifting." },
  { title: "Ask your coach", body: "Your coach will tell you what's worth buying for your goal, and what isn't." },
  { title: "Check with your doctor", body: "If you're pregnant, on medication or have a medical condition, get medical advice first." },
];
