// Sample shop catalog. Product names, prices and stock are placeholders:
// replace them with what the gym actually sells.

export type ProductArtKind = "tub" | "pouch" | "pills" | "tee" | "tank" | "hoodie" | "cap" | "shaker" | "towel" | "duffel" | "straps";

export type Product = {
  slug: string;
  name: string;
  category: "supplements" | "merch";
  type: string;
  price: number;
  art: ProductArtKind;
  /** Main colour for the product illustration. */
  color: string;
  short: string;
  description: string;
  options?: { label: string; values: string[] };
  details: string[];
  badge?: string;
};

export const products: Product[] = [
  // Supplements
  {
    slug: "whey-protein",
    name: "Hustle Fuel Whey Protein",
    category: "supplements",
    type: "Protein · 2 lb",
    price: 2450,
    art: "tub",
    color: "#fe4203",
    short: "24 g of protein per scoop to help you recover and hit your daily target.",
    description:
      "A smooth, easy-mixing whey blend for after training or whenever you need a quick protein hit. Mixes well with water or milk.",
    options: { label: "Flavor", values: ["Chocolate", "Vanilla", "Cookies and Cream"] },
    details: ["About 30 servings", "24 g protein per scoop", "Mix 1 scoop with 250 ml water or milk"],
    badge: "Best Seller",
  },
  {
    slug: "plant-protein",
    name: "Hustle Fuel Plant Protein",
    category: "supplements",
    type: "Protein · 2 lb",
    price: 2650,
    art: "tub",
    color: "#2f8f5b",
    short: "Pea and rice protein for members who skip dairy.",
    description: "A dairy-free protein made from pea and brown rice, with a smooth texture and no chalky aftertaste.",
    options: { label: "Flavor", values: ["Chocolate", "Ube"] },
    details: ["About 28 servings", "21 g protein per scoop", "Dairy-free"],
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    category: "supplements",
    type: "Strength · 300 g",
    price: 1450,
    art: "tub",
    color: "#f5f5f5",
    short: "Pure, unflavored creatine for strength and power.",
    description: "Micronized creatine monohydrate that dissolves easily into any drink. Take it daily, training day or not.",
    details: ["60 servings of 5 g", "Unflavored", "Mix into water, juice or your shake"],
    badge: "Coach Pick",
  },
  {
    slug: "ignite-pre-workout",
    name: "Ignite Pre-Workout",
    category: "supplements",
    type: "Pre-Workout · 30 servings",
    price: 1850,
    art: "tub",
    color: "#1f1f1f",
    short: "Clean energy and focus for early sessions and late-night lifts.",
    description: "A balanced pre-workout for energy, focus and pump. Start with half a scoop to check how you respond.",
    options: { label: "Flavor", values: ["Mango", "Calamansi", "Blue Raspberry"] },
    details: ["30 servings", "Contains caffeine", "Take 20 to 30 minutes before training"],
  },
  {
    slug: "electrolyte-hydration-mix",
    name: "Electrolyte Hydration Mix",
    category: "supplements",
    type: "Hydration · 30 sticks",
    price: 890,
    art: "pouch",
    color: "#2b7de9",
    short: "Replace what you sweat out on hot Manila days.",
    description: "Single-serve sticks with sodium, potassium and magnesium. Perfect for long sessions, boxing and outdoor runs.",
    options: { label: "Flavor", values: ["Lemon", "Watermelon"] },
    details: ["30 single-serve sticks", "Low sugar", "Mix 1 stick with 500 ml water"],
  },
  {
    slug: "bcaa-recovery",
    name: "BCAA Recovery",
    category: "supplements",
    type: "Recovery · 30 servings",
    price: 1350,
    art: "pouch",
    color: "#8a3ffc",
    short: "Amino acids to sip during long or fasted sessions.",
    description: "A refreshing amino acid drink to sip through long training sessions.",
    options: { label: "Flavor", values: ["Lychee", "Green Apple"] },
    details: ["30 servings", "Zero sugar", "Sip during training"],
  },
  {
    slug: "daily-multivitamin",
    name: "Daily Multivitamin",
    category: "supplements",
    type: "Essentials · 60 tablets",
    price: 750,
    art: "pills",
    color: "#f2b705",
    short: "Cover the basics when your diet falls short.",
    description: "A once-a-day multivitamin and mineral tablet for active adults.",
    details: ["60 tablets", "1 tablet a day with food"],
  },
  {
    slug: "omega-3-fish-oil",
    name: "Omega-3 Fish Oil",
    category: "supplements",
    type: "Essentials · 90 softgels",
    price: 890,
    art: "pills",
    color: "#0f9bb5",
    short: "EPA and DHA for joints, heart and recovery.",
    description: "Purified fish oil softgels with no fishy aftertaste.",
    details: ["90 softgels", "2 softgels a day with meals"],
  },

  // Merch
  {
    slug: "hustle-tee",
    name: "Hustle Tee",
    category: "merch",
    type: "Apparel · Unisex",
    price: 750,
    art: "tee",
    color: "#111111",
    short: "Our classic logo tee in heavyweight cotton.",
    description: "A heavyweight cotton tee with the Hustle & Muscle logo on the chest. Holds its shape after many washes.",
    options: { label: "Size", values: ["S", "M", "L", "XL", "2XL"] },
    details: ["100% cotton, 220 gsm", "Unisex regular fit", "Machine wash cold"],
    badge: "Best Seller",
  },
  {
    slug: "pump-cover-hoodie",
    name: "Pump Cover Hoodie",
    category: "merch",
    type: "Apparel · Oversized",
    price: 1650,
    art: "hoodie",
    color: "#2a2a2a",
    short: "An oversized hoodie for warm-ups and air-conditioned gyms.",
    description: "A roomy fleece hoodie with a big back print. Perfect over your training gear before the first set.",
    options: { label: "Size", values: ["S", "M", "L", "XL"] },
    details: ["Cotton-poly fleece", "Oversized fit", "Kangaroo pocket"],
  },
  {
    slug: "training-tank",
    name: "Training Tank",
    category: "merch",
    type: "Apparel · Unisex",
    price: 650,
    art: "tank",
    color: "#fe4203",
    short: "A lightweight, breathable tank for heavy days.",
    description: "Moisture-wicking and cut for full range of motion on presses and pull-ups.",
    options: { label: "Size", values: ["S", "M", "L", "XL"] },
    details: ["Quick-dry fabric", "Relaxed armholes", "Machine wash cold"],
  },
  {
    slug: "logo-cap",
    name: "Logo Cap",
    category: "merch",
    type: "Accessories",
    price: 650,
    art: "cap",
    color: "#111111",
    short: "An adjustable cap with the HM monogram.",
    description: "A structured six-panel cap with an embroidered HM monogram and adjustable strap.",
    options: { label: "Color", values: ["Black", "Orange"] },
    details: ["One size fits most", "Embroidered logo"],
  },
  {
    slug: "shaker-bottle",
    name: "Shaker Bottle",
    category: "merch",
    type: "Accessories · 700 ml",
    price: 450,
    art: "shaker",
    color: "#fe4203",
    short: "A leak-proof shaker for your protein and pre-workout.",
    description: "A 700 ml shaker with a mixing ball and a snap-lock lid that won't leak in your bag.",
    options: { label: "Color", values: ["Orange", "Black"] },
    details: ["700 ml", "BPA-free", "Dishwasher safe (top rack)"],
  },
  {
    slug: "gym-towel",
    name: "Gym Towel",
    category: "merch",
    type: "Accessories",
    price: 390,
    art: "towel",
    color: "#1c1c1c",
    short: "A quick-dry microfiber towel that fits in any bag.",
    description: "Soft, absorbent and quick to dry. Follows the club rule: wipe down after every set.",
    details: ["Microfiber", "40 × 90 cm", "Quick-dry"],
  },
  {
    slug: "duffel-bag",
    name: "Duffel Bag",
    category: "merch",
    type: "Accessories",
    price: 1950,
    art: "duffel",
    color: "#151515",
    short: "A tough duffel with a separate shoe compartment.",
    description: "Room for your gear, a change of clothes and your shoes, kept separate.",
    details: ["35 L capacity", "Separate shoe pocket", "Water-resistant base"],
  },
  {
    slug: "lifting-straps",
    name: "Lifting Straps",
    category: "merch",
    type: "Accessories · Pair",
    price: 550,
    art: "straps",
    color: "#fe4203",
    short: "Padded cotton straps for heavy pulls.",
    description: "Hold on to heavy deadlifts, rows and shrugs when your grip gives out before your back does.",
    details: ["Sold as a pair", "Padded wrist", "Heavy-duty cotton"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
