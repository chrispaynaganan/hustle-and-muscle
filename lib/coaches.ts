// Sample coach profiles. Bios, specialties and years are placeholders:
// replace them with each coach's real details.

export type Coach = {
  slug: string;
  name: string;
  role: string;
  motto: string;
  image: string;
  years: number;
  bio: string[];
  specialties: string[];
  bestFor: string[];
  /** Leave empty until the coach has a page; the site then shows "Book a Session" instead. */
  facebook: string;
};

export const coaches: Coach[] = [
  {
    slug: "mark-santos",
    name: "Coach Mark Santos",
    role: "Strength and Conditioning Coach",
    motto: "Progress over perfection.",
    image: "/images/coach-1.jpg",
    years: 8,
    bio: [
      "Mark started lifting to get stronger for basketball and never looked back. He's spent close to a decade coaching everyone from total beginners to powerlifters chasing a new total.",
      "His sessions are built on simple, repeatable lifts, careful technique and steady progressive overload. Expect a clear plan, honest feedback and a lot of encouragement.",
    ],
    specialties: ["Barbell technique", "Progressive overload", "Athletic conditioning", "Beginner onboarding"],
    bestFor: ["First-time lifters", "Athletes in-season", "Anyone stuck on a plateau"],
    facebook: "",
  },
  {
    slug: "jay-mendoza",
    name: "Coach Jay Mendoza",
    role: "Boxing and Muay Thai Coach",
    motto: "Discipline builds champions.",
    image: "/images/coach-2.jpg",
    years: 10,
    bio: [
      "Jay is a former amateur fighter who now runs our boxing and Muay Thai sessions. He's known for sharp padwork and drills that leave you drenched but smiling.",
      "Whether you want to compete or just want a fun way to get fit, Jay meets you at your level and builds real fight fundamentals from day one.",
    ],
    specialties: ["Boxing fundamentals", "Muay Thai clinch and kicks", "Padwork", "Fight conditioning"],
    bestFor: ["Stress relief through striking", "Amateur competitors", "Cardio lovers"],
    facebook: "",
  },
  {
    slug: "ana-reyes",
    name: "Coach Ana Reyes",
    role: "Strength and Weight Loss Coach",
    motto: "Strong looks different on everyone.",
    image: "/images/coach-3.jpg",
    years: 6,
    bio: [
      "Ana specializes in helping members lose fat while getting stronger, not smaller and weaker. She pairs smart lifting with realistic nutrition habits.",
      "She's especially popular with members who are new to the weights area and want a coach who explains the why behind every exercise.",
    ],
    specialties: ["Fat loss programming", "Women's strength training", "Habit coaching", "Meal plan check-ins"],
    bestFor: ["Weight loss goals", "Women new to lifting", "Postpartum return to training"],
    facebook: "",
  },
  {
    slug: "paolo-dizon",
    name: "Coach Paolo Dizon",
    role: "HIIT and Conditioning Coach",
    motto: "Consistency beats intensity.",
    image: "/images/coach-4.jpg",
    years: 5,
    bio: [
      "Paolo leads our HIIT classes and brings the energy every single session. His workouts are fast, scalable and always different.",
      "Outside of class he coaches members who want better engines, whether that's for a fun run, a sport, or just keeping up with their kids.",
    ],
    specialties: ["HIIT and circuits", "Endurance building", "Kettlebell training", "Group coaching"],
    bestFor: ["Fat burn and conditioning", "Members who get bored easily", "Race preparation"],
    facebook: "",
  },
  {
    slug: "rhea-cruz",
    name: "Coach Rhea Cruz",
    role: "Mobility and Recovery Coach",
    motto: "Move better to train longer.",
    image: "/images/coach-5.jpg",
    years: 7,
    bio: [
      "Rhea helps members move without pain so they can keep training for years. Her sessions mix mobility, core strength and smart recovery.",
      "She runs our Core and Abs and Mobility Flow classes, and works one-on-one with members coming back from time off.",
    ],
    specialties: ["Mobility and flexibility", "Core strength", "Return-to-training plans", "Breathing and recovery"],
    bestFor: ["Desk workers with tight hips and backs", "Older members", "Lifters who want to move better"],
    facebook: "",
  },
  {
    slug: "luis-navarro",
    name: "Coach Luis Navarro",
    role: "Strength and Hypertrophy Coach",
    motto: "Train heavy. Recover smarter.",
    image: "/images/coach-6.jpg",
    years: 9,
    bio: [
      "Luis is our go-to coach for building muscle. He writes detailed hypertrophy blocks and tracks every set so progress is never a guess.",
      "He's competed in physique shows and now helps members build size and strength the sustainable way.",
    ],
    specialties: ["Hypertrophy programming", "Physique preparation", "Bulking and cutting phases", "Lifting form"],
    bestFor: ["Muscle gain goals", "Physique competitors", "Experienced lifters"],
    facebook: "",
  },
];

export function getCoach(slug: string) {
  return coaches.find((c) => c.slug === slug);
}
