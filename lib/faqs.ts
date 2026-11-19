import { mealPlanFaqs } from "./content";

// Sample answers. Confirm policies (freezes, refunds, guest rules) with the gym before going live.
export const faqGroups = [
  {
    id: "general",
    title: "General",
    items: [
      { q: "What are your opening hours?", a: "We're open 24 hours a day, 7 days a week. Staffed hours and coach availability vary, so message us if you need help at a specific time." },
      { q: "Where are you located?", a: "B3 L5-A, Tamarind Street, Greenwoods Executive Village 1602. Free parking is available for members." },
      { q: "Is the gym beginner-friendly?", a: "Very. Every new member can book a free assessment, and our coaches are on the floor to help with equipment and form." },
      { q: "Can I visit before joining?", a: "Yes. Book a free tour through the Contact page, or buy a day pass to train for a day." },
    ],
  },
  {
    id: "membership",
    title: "Membership",
    items: [
      { q: "What's included in a membership?", a: "Unlimited 24/7 gym access, air-conditioned training floors, hot and cold showers, lockers, free Wi-Fi and free parking." },
      { q: "What is the annual membership fee?", a: "A one-time ₱2,000 fee is paid once per year when you first sign up or renew. It covers your member card and account." },
      { q: "Do longer memberships really save money?", a: "Yes. Quarterly saves ₱500, Semi-Annual saves ₱2,500, Extended saves ₱5,000, and Annual saves ₱8,000 compared to paying monthly." },
      { q: "Can I freeze my membership?", a: "Message the front desk about freezes for travel or medical reasons. Each request is reviewed case by case." },
    ],
  },
  {
    id: "training",
    title: "Programs and Classes",
    items: [
      { q: "Do I need a membership to join a program or class?", a: "Programs and class packs can be bought on their own. Many members pair them with a membership for open gym time between sessions." },
      { q: "How long are class packs valid?", a: "Class packs are valid for 2 months from your first session." },
      { q: "Can I choose my coach?", a: "For most programs your coach is assigned after your free assessment, based on your goal. You can request a specific coach and we'll do our best." },
      { q: "What if I miss a session?", a: "Let your coach know at least 12 hours before and your session can be rescheduled." },
    ],
  },
  {
    id: "shop",
    title: "Shop and Orders",
    items: [
      { q: "How do I pay for online orders?", a: "Choose GCash, Maya, card or cash at the front desk at checkout. Our team confirms every order and payment with you directly." },
      { q: "Do you deliver?", a: "We deliver within Metro Manila for a flat ₱150 fee, usually in 2 to 4 days. Pick-up at the gym is always free." },
      { q: "Can I return an item?", a: "Unopened supplements and unworn merch with tags can be exchanged within 7 days. Opened supplements can't be returned for safety reasons." },
    ],
  },
  { id: "meal-plans", title: "Meal Plans", items: mealPlanFaqs },
];
