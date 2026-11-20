"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { type Lang, copy } from "@/lib/chat/copy";
import { type Intent, detectIntent, looksFilipino, normalizeMobile } from "@/lib/chat/intents";
import { type ChatPrefill, saveChatPrefill } from "@/lib/chat/prefill";
import { getCoach } from "@/lib/coaches";
import { roles as careers } from "@/lib/careers";
import { mealPlans } from "@/lib/content";
import { peso } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { contactTopics, site } from "@/lib/site";
import { getClass, getProgram, gxClasses, membershipFee, memberships } from "@/lib/training";
import { useCart } from "../cart/cart-provider";
import { ArrowRight, Close } from "../icons";
import { Magnetic } from "../motion/magnetic";
import { CoachMini, MembershipList, OfferCard, ProductOffer } from "./chat-cards";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Chip = { label: string; primary?: boolean; href?: string; external?: boolean; run?: () => void };
type Item =
  | { id: number; kind: "bot"; text: string; calm?: boolean }
  | { id: number; kind: "user"; text: string }
  | { id: number; kind: "note"; text: string }
  | { id: number; kind: "typing" }
  | { id: number; kind: "chips"; chips: Chip[]; used?: boolean }
  | { id: number; kind: "card"; node: ReactNode };
type NewItem = Item extends infer T ? (T extends Item ? Omit<T, "id"> : never) : never;
type Phase = "closed" | "opening" | "open" | "closing";
type Expect = null | "name" | "mobile" | "order";
type Goal = "lose" | "muscle" | "strength" | "fight" | "move" | "unsure";
type Pref = "coach" | "classes" | "solo";
type TopicKey = keyof typeof contactTopics;

const HIDE_TEASER_ON = ["/cart", "/checkout"];

/* ------------------------------------------------------------------ */
/* Widget                                                              */
/* ------------------------------------------------------------------ */

export function ChatWidget() {
  const pathname = usePathname();
  const router = useRouter();
  const { add: addToCart } = useCart();

  const [phase, setPhase] = useState<Phase>("closed");
  const [items, setItems] = useState<Item[]>([]);
  const [lang, setLangState] = useState<Lang>("en");
  const [status, setStatus] = useState<"online" | "passing" | "notified">("online");
  const [teaser, setTeaser] = useState(false);
  const [input, setInput] = useState("");

  const t = copy[lang];
  const langRef = useRef<Lang>("en");
  const tr = () => copy[langRef.current];
  const idRef = useRef(0);
  const runRef = useRef(0); // bumps on restart to cancel flows still waiting
  const expectRef = useRef<Expect>(null);
  const bookingRef = useRef<ChatPrefill>({});
  const waitingRef = useRef<null | "booking" | "handoff">(null);
  const missesRef = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- message helpers ---------- */

  const push = useCallback((item: NewItem) => {
    const id = ++idRef.current;
    setItems((list) => [...list, { ...item, id } as Item]);
    return id;
  }, []);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, reduced() ? Math.min(ms, 150) : ms));

  async function say(text: string, opts: { calm?: boolean; think?: number } = {}) {
    const run = runRef.current;
    const typingId = push({ kind: "typing" });
    await sleep(opts.think ?? 750);
    setItems((list) => list.filter((i) => i.id !== typingId));
    if (run !== runRef.current) return false;
    push({ kind: "bot", text, calm: opts.calm });
    return true;
  }

  const user = (text: string) => push({ kind: "user", text });
  const note = (text: string) => push({ kind: "note", text });
  const card = (node: ReactNode) => push({ kind: "card", node });
  // Every set of buttons gets a way out, except mid-booking steps.
  const chips = (list: Chip[], exit = true) => {
    const c = tr();
    const hasExit = list.some((x) => [c.menu.something, c.startOver, c.askMore, c.endChat].includes(x.label));
    return push({ kind: "chips", chips: exit && !hasExit ? [...list, { label: c.menu.something, run: () => menu(true) }] : list });
  };

  function pick(itemId: number, chip: Chip) {
    // A tapped answer retires every button row above it; a link only retires its own row.
    setItems((list) => list.map((i) => (i.kind === "chips" && (i.id === itemId || !chip.href) ? { ...i, used: true } : i)));
    if (chip.href) {
      if (chip.external) return;
      router.push(chip.href);
      if (window.matchMedia("(max-width: 639px)").matches) close();
      return;
    }
    user(chip.label);
    chip.run?.();
  }

  /* ---------- effects: fly to cart, confetti ---------- */

  function flyToCart(from: HTMLElement) {
    if (reduced()) return;
    const target = Array.from(document.querySelectorAll<HTMLElement>("[data-cart-target]")).find((el) => el.offsetParent !== null);
    if (!target) return;
    const a = from.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const dot = document.createElement("div");
    dot.className = "chamfer-sm pointer-events-none fixed z-60 size-6 bg-brand";
    dot.style.left = `${a.left + a.width / 2 - 12}px`;
    dot.style.top = `${a.top + a.height / 2 - 12}px`;
    document.body.appendChild(dot);
    dot
      .animate(
        [
          { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
          { transform: `translate(${(b.left - a.left) / 2}px, ${b.top - a.top - 80}px) scale(.8) rotate(120deg)`, opacity: 1, offset: 0.5 },
          { transform: `translate(${b.left + b.width / 2 - (a.left + a.width / 2)}px, ${b.top + b.height / 2 - (a.top + a.height / 2)}px) scale(.3) rotate(240deg)`, opacity: 0.3 },
        ],
        { duration: 800, easing: "cubic-bezier(.5,0,.6,1)" },
      )
      .finished.then(() => dot.remove());
  }

  function confetti() {
    const panel = panelRef.current;
    if (!panel || reduced()) return;
    const r = panel.getBoundingClientRect();
    for (let i = 0; i < 28; i++) {
      const bit = document.createElement("span");
      bit.className = `pointer-events-none absolute z-10 size-2.5 ${i % 3 === 0 ? "bg-white" : "bg-brand"}`;
      bit.style.clipPath = "polygon(0 0, 100% 50%, 0 100%)";
      bit.style.left = `${r.width / 2}px`;
      bit.style.top = `${r.height - 160}px`;
      panel.appendChild(bit);
      const ang = Math.random() * Math.PI - Math.PI;
      const dist = 90 + Math.random() * 140;
      const x = Math.cos(ang) * dist;
      const y = Math.sin(ang) * dist;
      bit
        .animate(
          [
            { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
            { transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 540}deg)`, opacity: 1, offset: 0.6 },
            { transform: `translate(${x}px, ${y + 120}px) rotate(${Math.random() * 720}deg) scale(.6)`, opacity: 0 },
          ],
          { duration: 1400, easing: "cubic-bezier(.2,.7,.2,1)" },
        )
        .finished.then(() => bit.remove());
    }
  }

  /* ---------- cart actions ---------- */

  function addProgram(slug: string, el: HTMLElement) {
    const p = getProgram(slug)!;
    addToCart({ id: `program:${p.slug}`, slug: p.slug, kind: "program", name: p.title, detail: p.unit.replace("/", ""), price: p.price, href: `/programs/${p.slug}` }, 1, { silent: true });
    afterAdd(p.title, el);
  }
  function addClass(slug: string, el: HTMLElement) {
    const c = getClass(slug)!;
    addToCart({ id: `class:${c.slug}`, slug: c.slug, kind: "class", name: c.title, detail: c.unit.replace("/", ""), price: c.price, href: `/classes/${c.slug}` }, 1, { silent: true });
    afterAdd(c.title, el);
  }
  function addMembership(slug: string, el: HTMLElement) {
    const m = memberships.find((x) => x.slug === slug)!;
    addToCart({ id: `membership:${m.slug}`, slug: m.slug, kind: "membership", name: m.title, detail: m.unit?.replace("/", "Per "), price: m.price, href: "/membership" }, 1, { silent: true });
    afterAdd(m.title, el);
  }
  function addProduct(slug: string, option: string | undefined, el: HTMLElement) {
    const p = getProduct(slug)!;
    addToCart(
      { id: option ? `${p.slug}:${option}` : p.slug, slug: p.slug, kind: "product", name: p.name, detail: option ? `${p.options?.label}: ${option}` : undefined, price: p.price, href: `/shop/${p.slug}` },
      1,
      { silent: true },
    );
    afterAdd(p.name, el, true);
  }
  async function afterAdd(name: string, el: HTMLElement, product = false) {
    flyToCart(el);
    const c = tr();
    if (product) {
      await say(c.productAdded(name), { think: 400 });
      conclude([{ label: c.goCheckout, primary: true, href: "/checkout" }, { label: c.keepGoing, run: () => shop() }]);
      return;
    }
    await say(c.added(name), { think: 500 });
    conclude([{ label: c.menu.book, primary: true, run: () => book("assessment") }, { label: c.goCheckout, href: "/checkout" }]);
  }

  /* ---------- cards ---------- */

  const programCard = (slug: string) => {
    const p = getProgram(slug)!;
    card(<OfferCard tag={p.badge} title={p.title} price={p.price} unit={p.unit} line={p.short} href={`/programs/${p.slug}`} addLabel={tr().addToCart} addedLabel={tr().addedShort} detailsLabel={tr().details} onAdd={(el) => addProgram(slug, el)} />);
  };
  const classCard = (slug: string) => {
    const c = getClass(slug)!;
    const coach = getCoach(c.coachSlug);
    const line = `${c.schedule}${coach ? ` · ${coach.name}` : ""}${c.slotsLeft ? ` · ${tr().slotsLeft(c.slotsLeft)}` : ""}`;
    card(<OfferCard tag="GX Class" title={c.title} price={c.price} unit={c.unit} line={line} href={`/classes/${c.slug}`} addLabel={tr().addToCart} addedLabel={tr().addedShort} detailsLabel={tr().details} onAdd={(el) => addClass(slug, el)} />);
  };
  const membershipCard = (slug: string) => {
    const m = memberships.find((x) => x.slug === slug)!;
    const line = m.kind === "day-pass" ? tr().dayPass : `+ ${peso(membershipFee)} annual fee · 24/7 access`;
    card(<OfferCard tag={m.badge} title={m.title} price={m.price} unit={m.unit} line={line} href={m.kind === "day-pass" ? "/membership#day-pass" : "/membership"} addLabel={tr().addToCart} addedLabel={tr().addedShort} detailsLabel={tr().details} onAdd={(el) => addMembership(slug, el)} />);
  };
  const productCard = (slug: string) => {
    const p = getProduct(slug)!;
    card(<ProductOffer product={p} addLabel={tr().addToCart} addedLabel={tr().addedShort} detailsLabel={tr().details} onAdd={(opt, el) => addProduct(slug, opt, el)} />);
  };

  /* ---------- journeys ---------- */

  function pageGreeting() {
    const c = tr();
    if (/^\/(membership|packages)/.test(pathname)) return { text: c.greet.membership, keys: ["prices", "plan", "book"] as const };
    if (/^\/classes/.test(pathname)) return { text: c.greet.classes, keys: ["classes", "plan", "book"] as const };
    if (/^\/coaches/.test(pathname)) return { text: c.greet.coaches, keys: ["coach", "book", "plan"] as const };
    if (/^\/(shop|supplements|merch)/.test(pathname)) return { text: c.greet.shop, keys: ["shop", "orders", "book"] as const };
    if (/^\/(cart|checkout)/.test(pathname)) return { text: c.greet.checkout, keys: ["orders", "person", "shop"] as const };
    return { text: c.greet.default, keys: ["plan", "prices", "classes", "book"] as const };
  }

  type MenuKey = keyof (typeof copy)["en"]["menu"];
  const menuRun: Record<Exclude<MenuKey, "something">, () => void> = {
    plan: () => plan(),
    prices: () => prices(),
    classes: () => classes(),
    book: () => book("assessment"),
    firstTime: () => firstTime(),
    coach: () => coachMatch(),
    shop: () => shop(),
    meal: () => meal(),
    orders: () => orders(),
    member: () => member(),
    info: () => info(),
    careers: () => careersFlow(),
    person: () => handoff("other", "Talk to a person"),
  };

  function menuChips(keys: readonly Exclude<MenuKey, "something">[], withMore = true): Chip[] {
    const c = tr();
    const list: Chip[] = keys.map((k, i) => ({ label: c.menu[k], primary: i === 0 && k === "book", run: menuRun[k] }));
    if (withMore) list.push({ label: c.menu.something, run: () => menu(true) });
    return list;
  }

  async function start() {
    runRef.current++;
    expectRef.current = null;
    waitingRef.current = null;
    missesRef.current = 0;
    setStatus("online");
    setItems([]);
    const g = pageGreeting();
    if (await say(g.text, { think: 600 })) chips(menuChips(g.keys));
  }

  async function menu(all = false) {
    const c = tr();
    const keys = all
      ? (["plan", "prices", "classes", "firstTime", "coach", "book", "shop", "meal", "orders", "member", "info", "careers", "person"] as const)
      : pageGreeting().keys;
    if (await say(all ? c.everything : c.more, { think: 450 })) chips(menuChips(keys, !all), !all);
  }

  // Every finished answer ends here: optional next steps, then "ask more or end the chat?".
  async function conclude(actions: Chip[] = [], opts: { calm?: boolean } = {}) {
    if (actions.length) chips(actions, false);
    await sleep(actions.length ? 700 : 400);
    const c = tr();
    if (!(await say(c.wrapUp, { think: 500, calm: opts.calm }))) return;
    chips(
      [
        { label: c.askMore, run: () => { setStatus((s) => (s === "passing" ? "online" : s)); menu(true); } },
        { label: c.endChat, run: () => endChat() },
      ],
      false,
    );
  }

  async function endChat() {
    if (!(await say(tr().bye, { think: 500 }))) return;
    const run = runRef.current;
    await sleep(1600);
    if (run !== runRef.current) return;
    close();
    // Start fresh next time the chat is opened.
    setTimeout(() => {
      if (run !== runRef.current) return;
      runRef.current++;
      expectRef.current = null;
      waitingRef.current = null;
      missesRef.current = 0;
      setStatus("online");
      setItems([]);
    }, reduced() ? 0 : 500);
  }

  /* J1: goal discovery */
  async function plan() {
    const c = tr();
    if (!(await say(c.goalQ))) return;
    const g = c.goals;
    chips(
      (Object.keys(g) as Goal[]).map((k) => ({
        label: g[k],
        run: () => (k === "unsure" ? unsure() : k === "fight" || k === "move" ? recommend(k, "classes") : preference(k)),
      })),
    );
  }
  async function preference(goal: Goal) {
    const c = tr();
    if (!(await say(c.prefQ))) return;
    chips((Object.keys(c.prefs) as Pref[]).map((k) => ({ label: c.prefs[k], run: () => recommend(goal, k) })));
  }
  async function recommend(goal: Goal, pref: Pref) {
    const c = tr();
    type Pick = ["program" | "class" | "membership", string];
    const table: Record<string, [Pick, Pick]> = {
      "lose:coach": [["program", "weight-loss-and-fat-burning"], ["membership", "monthly"]],
      "lose:classes": [["class", "hiit-group-training"], ["class", "core-and-abs"]],
      "lose:solo": [["membership", "monthly"], ["membership", "day-pass-non-member"]],
      "muscle:coach": [["program", "strength-training"], ["membership", "monthly"]],
      "muscle:classes": [["program", "strength-training"], ["class", "hiit-group-training"]],
      "muscle:solo": [["membership", "monthly"], ["membership", "day-pass-non-member"]],
      "strength:coach": [["program", "strength-training"], ["membership", "monthly"]],
      "strength:classes": [["program", "strength-training"], ["class", "core-and-abs"]],
      "strength:solo": [["membership", "monthly"], ["program", "strength-training"]],
      "fight:classes": [["class", "boxing-fitness"], ["program", "boxing-and-muay-thai-one-on-one"]],
      "move:classes": [["class", "mobility-flow"], ["program", "mobility-and-recovery"]],
    };
    const [main, extra] = table[`${goal}:${pref}`];
    const show = ([kind, slug]: Pick) => (kind === "program" ? programCard(slug) : kind === "class" ? classCard(slug) : membershipCard(slug));
    if (!(await say(c.fits, { think: 1000 }))) return;
    show(main);
    await sleep(700);
    if (!(await say(c.alsoConsider, { think: 500 }))) return;
    show(extra);
    await sleep(500);
    conclude([{ label: c.menu.book, primary: true, run: () => book("assessment", goalLabel(goal)) }]);
  }
  const goalLabel = (goal: Goal) => copy.en.goals[goal];
  async function unsure() {
    const c = tr();
    if (await say(c.unsure)) conclude([{ label: c.menu.book, primary: true, run: () => book("assessment") }, { label: c.tryDayPass, href: "/membership#day-pass" }]);
  }

  /* J2: prices */
  async function prices() {
    const c = tr();
    if (!(await say(c.pricesIntro(peso(membershipFee))))) return;
    card(<MembershipList items={memberships.filter((m) => m.kind === "membership")} addLabel={c.addToCart} addedLabel={c.addedShort} onAdd={(m, el) => addMembership(m.slug, el)} />);
    const member = memberships.find((m) => m.slug === "day-pass-member")!;
    const non = memberships.find((m) => m.slug === "day-pass-non-member")!;
    await sleep(600);
    if (!(await say(`${c.saveMost} ${c.dayPassLine(peso(member.price), peso(non.price))}`))) return;
    conclude([{ label: c.tryDayPass, run: () => dayPass() }, { label: c.bookTour, run: () => book("tour") }, { label: c.menu.plan, run: () => plan() }]);
  }
  async function dayPass() {
    await sleep(300);
    membershipCard("day-pass-non-member");
    await sleep(600);
    conclude();
  }

  /* J3: first-timer */
  async function firstTime() {
    const c = tr();
    if (await say(c.firstTimer, { think: 900 }))
      conclude([{ label: c.menu.book, primary: true, run: () => book("assessment", "First-timer") }, { label: c.tryDayPass, href: "/membership#day-pass" }, { label: c.alexStory, href: "/stories/alex" }]);
  }

  /* J4: classes */
  async function classes() {
    const c = tr();
    if (!(await say(c.classesQ))) return;
    chips([
      { label: c.today, run: () => today() },
      ...gxClasses.map((g) => ({ label: g.title, run: () => showClass(g.slug) })),
      { label: c.fullSchedule, href: "/classes" },
    ]);
  }
  async function showClass(slug: string) {
    await sleep(300);
    classCard(slug);
    await sleep(600);
    conclude();
  }
  async function today() {
    const c = tr();
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Asia/Manila" }).format(new Date());
    const list = gxClasses.flatMap((g) => g.slots.filter((s) => s.day === day).map((s) => ({ g, s })));
    if (!list.length) {
      if (await say(c.todayNone(day))) conclude([{ label: c.fullSchedule, href: "/classes" }]);
      return;
    }
    if (!(await say(c.todayList(day, list.map(({ g, s }) => `${g.title}, ${s.time}`).join(" · "))))) return;
    chips([...list.map(({ g }) => ({ label: g.title, run: () => showClass(g.slug) })), { label: c.fullSchedule, href: "/classes" }]);
  }

  /* J5: coach match */
  async function coachMatch() {
    const c = tr();
    if (!(await say(c.coachQ))) return;
    const map: Record<Exclude<Goal, "unsure">, string[]> = {
      lose: ["ana-reyes", "paolo-dizon"],
      muscle: ["luis-navarro", "mark-santos"],
      strength: ["mark-santos", "luis-navarro"],
      fight: ["jay-mendoza"],
      move: ["rhea-cruz"],
    };
    chips(
      (Object.keys(map) as (keyof typeof map)[]).map((k) => ({
        label: c.goals[k],
        run: async () => {
          if (!(await say(tr().coachPick))) return;
          for (const slug of map[k]) {
            const coach = getCoach(slug)!;
            card(<CoachMini coach={coach} profileLabel={tr().viewProfile} bookLabel={tr().bookSession} onBook={() => { user(tr().bookSession); book("coaching", coach.name); }} />);
            await sleep(350);
          }
          await sleep(400);
          conclude();
        },
      })),
    );
  }

  /* J6: booking (lead capture) */
  async function book(topic: TopicKey, about?: string) {
    const c = tr();
    bookingRef.current = { topic: contactTopics[topic], about };
    if (!(await say(c.consent))) return;
    chips([
      { label: c.consentYes, primary: true, run: async () => { if (await say(tr().askName, { think: 400 })) expectRef.current = "name"; inputRef.current?.focus(); } },
      { label: c.consentNo, run: async () => { if (await say(tr().noWorries)) conclude(); } },
    ], false);
  }
  async function onName(text: string) {
    bookingRef.current.name = text.trim();
    expectRef.current = null;
    if (await say(tr().askMobile(text.trim().split(" ")[0]), { think: 500 })) expectRef.current = "mobile";
  }
  async function onMobile(text: string) {
    const m = normalizeMobile(text);
    if (!m) {
      await say(tr().badMobile, { think: 400 });
      return;
    }
    expectRef.current = null;
    bookingRef.current.mobile = m;
    const c = tr();
    if (!(await say(c.askMethod, { think: 400 }))) return;
    chips(c.methods.map((method) => ({ label: method, run: () => askTime(method) })), false);
  }
  async function askTime(method: string) {
    bookingRef.current.method = method;
    const c = tr();
    if (!(await say(c.askTime, { think: 400 }))) return;
    chips(c.times.map((time) => ({ label: time, run: () => finishBooking(time) })), false);
  }
  async function finishBooking(time: string) {
    const b = bookingRef.current;
    b.time = time;
    const c = tr();
    if (!(await say(c.summary(b.name ?? "", b.mobile ?? "", b.method ?? "", time.split(" ")[0])))) return;
    chips([
      {
        label: c.reviewSend,
        primary: true,
        run: () => {
          saveChatPrefill(b);
          waitingRef.current = "booking";
          router.push("/contact#inquiry");
          if (window.matchMedia("(max-width: 639px)").matches) close();
        },
      },
    ]);
  }

  /* J7: shop */
  async function shop() {
    const c = tr();
    if (!(await say(c.shopQ))) return;
    const picks: Record<keyof typeof c.shopGoals, string[]> = {
      muscle: ["whey-protein", "creatine-monohydrate"],
      energy: ["ignite-pre-workout", "electrolyte-hydration-mix"],
      recovery: ["bcaa-recovery", "electrolyte-hydration-mix"],
      health: ["daily-multivitamin", "omega-3-fish-oil"],
      merch: ["hustle-tee", "shaker-bottle"],
    };
    chips(
      (Object.keys(picks) as (keyof typeof picks)[]).map((k) => ({
        label: c.shopGoals[k],
        run: async () => {
          if (!(await say(tr().shopPick))) return;
          for (const slug of picks[k]) {
            productCard(slug);
            await sleep(350);
          }
          if (k !== "merch") note(tr().supplementSafety);
          await sleep(300);
          conclude([{ label: tr().goCheckout, href: "/checkout" }, { label: tr().keepGoing, run: () => shop() }]);
        },
      })),
    );
  }

  /* J8: orders */
  async function orders() {
    const c = tr();
    if (!(await say(c.ordersQ))) return;
    chips([
      { label: c.orderOpts.delivery, run: async () => { if (await say(tr().delivery(peso(150)))) conclude(); } },
      { label: c.orderOpts.returns, run: async () => { if (await say(tr().returns)) conclude(); } },
      { label: c.orderOpts.where, run: async () => { if (await say(tr().askOrder)) expectRef.current = "order"; } },
      { label: c.orderOpts.payment, run: async () => { if (await say(tr().paymentHandoff, { calm: true })) handoff("shop", "Payment problem with an online order", true); } },
    ]);
  }
  async function onOrder(text: string) {
    expectRef.current = null;
    const n = (text.match(/hm-?\d+/i)?.[0] ?? text.trim()).toUpperCase().replace(/^HM-?/, "HM-");
    if (await say(tr().orderHandoff(n), { think: 500 })) handoff("shop", `Order ${n}`, true);
  }

  /* J9: meal plans */
  async function meal() {
    const c = tr();
    if (!(await say(`${c.mealIntro} ${mealPlans.map((m) => m.title).join(", ")}. ${c.mealPricing}`, { think: 900 }))) return;
    chips([
      ...mealPlans.map((m) => ({ label: c.askAbout(m.title), run: () => book("meal-plan", `${m.title} meal plan`) })),
      { label: c.sampleDay, href: "/meal-plans#sample-day" },
    ]);
  }

  /* J10: member help */
  async function member() {
    const c = tr();
    if (!(await say(c.memberQ))) return;
    chips(
      (Object.keys(c.memberOpts) as (keyof typeof c.memberOpts)[]).map((k) => ({
        label: c.memberOpts[k],
        run: async () => {
          if (!(await say(tr().memberPolicy[k]))) return;
          if (k === "renew") conclude([{ label: tr().seeMemberships, href: "/membership" }]);
          else handoff("membership", `Membership help: ${copy.en.memberOpts[k]}`, true);
        },
      })),
    );
  }

  /* J11: quick info */
  async function info() {
    const c = tr();
    if (!(await say(c.info(site.address, site.phone, site.email)))) return;
    conclude([
      { label: c.openMaps, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Hustle and Muscle Fitness Gym ${site.address}`)}`, external: true },
      { label: c.bookTour, run: () => book("tour") },
    ]);
  }

  /* J12: careers and referrals */
  async function careersFlow() {
    const c = tr();
    if (!(await say(`${c.careersIntro} ${careers.map((r) => r.title).join(", ")}. ${c.referIntro}`, { think: 800 }))) return;
    conclude([{ label: c.viewRoles, href: "/careers" }, { label: c.referFriend, href: "/refer-a-friend" }]);
  }

  /* Handoff to staff (prefilled message form) */
  async function handoff(topic: TopicKey, about: string, quiet = false) {
    const c = tr();
    setStatus("passing");
    if (!quiet && !(await say(c.handoff, { think: 600 }))) return;
    if (quiet) {
      await sleep(400);
      note(c.handoff);
    }
    conclude([
      {
        label: c.openForm,
        primary: true,
        run: () => {
          saveChatPrefill({ topic: contactTopics[topic], message: `${about}. ` });
          waitingRef.current = "handoff";
          router.push("/contact#inquiry");
          if (window.matchMedia("(max-width: 639px)").matches) close();
        },
      },
    ]);
  }

  /* Guardrails */
  async function guard(intent: Intent) {
    const c = tr();
    if (intent === "emergency") {
      if (await say(c.emergency, { calm: true, think: 300 })) conclude([{ label: c.menu.person, run: () => handoff("other", "Urgent: someone may be hurt") }], { calm: true });
      return true;
    }
    if (intent === "card") {
      if (await say(c.cardWarning, { calm: true, think: 300 })) conclude([], { calm: true });
      return true;
    }
    if (intent === "injury") {
      if (await say(c.injury, { calm: true, think: 900 })) conclude([{ label: c.menu.book, primary: true, run: () => book("assessment", "Training around an injury or condition") }, { label: c.menu.person, run: () => handoff("other", "Question about an injury or condition") }], { calm: true });
      return true;
    }
    if (intent === "complaint") {
      if (await say(c.complaint, { calm: true, think: 700 })) handoff("other", "Feedback or complaint", true);
      return true;
    }
    if (intent === "minor") {
      if (await say(c.minor, { calm: true })) conclude([{ label: c.menu.book, primary: true, run: () => book("assessment", "Member under 18, with parent") }], { calm: true });
      return true;
    }
    return false;
  }

  /* ---------- typed messages ---------- */

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setItems((list) => list.map((i) => (i.kind === "chips" ? { ...i, used: true } : i)));
    user(text);

    // A card number is never handled as an answer, whatever we were waiting for.
    if (detectIntent(text) === "card") return guard("card");

    if (expectRef.current === "name") return onName(text);
    if (expectRef.current === "mobile") return onMobile(text);
    if (expectRef.current === "order") return onOrder(text);

    if (looksFilipino(text) && langRef.current === "en") setLang("fil", false);
    const intent = detectIntent(text);
    if (intent && (await guard(intent))) return;

    const routes: Partial<Record<Intent, () => void>> = {
      person: () => handoff("other", "Talk to a person"),
      plan: plan,
      prices: prices,
      firstTime: firstTime,
      classes: classes,
      coach: coachMatch,
      book: () => book("assessment"),
      shop: shop,
      orders: orders,
      meal: meal,
      member: member,
      info: info,
      careers: careersFlow,
      thanks: () => conclude(),
      greeting: () => menu(),
    };
    const go = intent ? routes[intent] : undefined;
    if (go) {
      missesRef.current = 0;
      go();
      return;
    }
    missesRef.current++;
    if (await say(tr().notSure, { think: 500 })) chips(menuChips(["plan", "prices", "classes", "book", "person"], true));
  }

  /* ---------- language ---------- */

  function setLang(l: Lang, restart = true) {
    langRef.current = l;
    setLangState(l);
    if (restart) start();
  }

  /* ---------- open / close ---------- */

  function open() {
    setTeaser(false);
    if (phase === "open" || phase === "opening") return;
    setPhase("opening");
    setTimeout(() => setPhase("open"), reduced() ? 0 : 700);
    if (!items.length) start();
    if (window.matchMedia("(pointer: fine)").matches) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 750);
  }
  function close() {
    setPhase((p) => (p === "closed" ? p : "closing"));
    setTimeout(() => {
      setPhase("closed");
      launcherRef.current?.focus({ preventScroll: true });
    }, reduced() ? 0 : 450);
  }

  // Escape closes the chat.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && phase !== "closed" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Keep the newest message in view.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: reduced() ? "auto" : "smooth" });
  }, [items]);

  // The contact form tells us when a booking or handoff message was actually sent.
  useEffect(() => {
    const onSent = async () => {
      const waiting = waitingRef.current;
      if (!waiting) return;
      waitingRef.current = null;
      if (waiting === "handoff") setStatus("notified");
      if (phase === "closed") {
        setPhase("opening");
        setTimeout(() => setPhase("open"), reduced() ? 0 : 700);
      }
      await sleep(500);
      if (await say(waiting === "booking" ? tr().booked : tr().handedOff, { think: 500 })) {
        if (waiting === "booking") confetti();
        conclude();
      }
    };
    window.addEventListener("hm:inquiry-sent", onSent);
    return () => window.removeEventListener("hm:inquiry-sent", onSent);
  });

  // One gentle teaser per visit, after 8 seconds, never on cart or checkout.
  useEffect(() => {
    if (HIDE_TEASER_ON.some((p) => pathname.startsWith(p))) return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("hm-chat-teased") === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;
    const show = setTimeout(() => {
      setTeaser(true);
      try {
        window.sessionStorage.setItem("hm-chat-teased", "1");
      } catch {
        /* ignore */
      }
    }, 8000);
    const hide = setTimeout(() => setTeaser(false), 15000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [pathname]);

  /* ---------- render ---------- */

  const visible = phase !== "closed";
  const statusText = status === "online" ? t.online : status === "passing" ? t.passing : t.notified;

  return (
    <>
      {/* Teaser bubble */}
      {teaser && !visible && (
        <div className="chamfer-sm fixed right-6 bottom-26 z-40 max-w-60 bg-white py-3 pr-9 pl-4 text-sm text-black motion-safe:animate-pop" role="status">
          <button type="button" onClick={open} className="text-left">
            {t.teaser}
          </button>
          <button type="button" onClick={() => setTeaser(false)} aria-label="Dismiss" className="absolute top-1.5 right-2 text-lg leading-none text-graphite hover:text-black">
            ×
          </button>
        </div>
      )}

      {/* Launcher */}
      <div className={`group/launch fixed right-6 bottom-6 z-40 flex items-center gap-3 transition-all duration-300 ease-snappy ${visible ? "pointer-events-none scale-50 -rotate-12 opacity-0" : ""}`}>
        <span className="hidden origin-right scale-x-0 bg-white px-3.5 py-2.5 text-sm font-medium whitespace-nowrap text-brand transition-transform duration-300 ease-snappy group-hover/launch:scale-x-100 sm:block">
          {t.ask}
        </span>
        <Magnetic strength={0.3}>
          <button
            ref={launcherRef}
            type="button"
            onClick={open}
            aria-label={t.ask}
            aria-expanded={visible}
            className="relative flex size-16 items-center justify-center rounded-full bg-brand text-lg font-extrabold tracking-display shadow-2xl transition-transform active:scale-90"
          >
            <span aria-hidden className="absolute inset-0 rounded-full border-2 border-brand motion-safe:animate-breathe" />
            <span aria-hidden className="absolute inset-0 rounded-full border-2 border-brand motion-safe:animate-ring" />
            J.R.
          </button>
        </Magnetic>
      </div>

      {/* Panel */}
      <section
        ref={panelRef}
        role="dialog"
        aria-label="Chat with Coach J.R."
        aria-hidden={!visible}
        className={`fixed inset-4 z-50 mt-auto flex flex-col bg-linear-to-br from-surface to-black sm:top-6 sm:right-6 sm:bottom-6 sm:left-auto sm:max-h-170 sm:w-100 ${
          phase === "closed" ? "invisible" : "chamfer-sm"
        } ${phase === "opening" ? "motion-safe:animate-unfold" : ""} ${phase === "closing" ? "motion-safe:animate-fold" : ""}`}
      >
        <div aria-hidden className="chamfer-sm pointer-events-none absolute inset-0 border border-brand/60" />

        <header className="relative flex items-center gap-3 border-b border-white/10 px-4 py-4">
          <div className="relative size-11 shrink-0 perspective-near">
            <div className={`relative size-full transition-transform duration-700 ease-snappy transform-3d ${status === "online" ? "" : "rotate-y-180"} ${phase === "opening" ? "motion-safe:animate-pop" : ""}`}>
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-brand text-sm font-extrabold backface-hidden">J.R.</span>
              <span className="absolute inset-0 flex rotate-y-180 items-center justify-center rounded-full bg-white text-xs font-extrabold text-brand backface-hidden">HM</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold">{status === "online" ? "Coach J.R." : t.team}</p>
            <p className="flex items-center gap-1.5 text-xs text-ash">
              <span className={`size-1.5 rounded-full ${status === "online" ? "bg-green-500" : "bg-brand"} motion-safe:animate-pulse`} />
              {statusText}
            </p>
          </div>
          <div className="flex border border-white/20 text-xs" role="group" aria-label="Language">
            {(["en", "fil"] as const).map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => lang !== l && setLang(l)} className={`px-2 py-1 uppercase ${lang === l ? "bg-white text-black" : "text-ash hover:text-white"}`}>
                {l}
              </button>
            ))}
          </div>
          <button type="button" onClick={close} aria-label="Close chat" className="flex size-8 items-center justify-center text-ash transition-all duration-300 ease-snappy hover:rotate-90 hover:text-white">
            <Close className="size-5" />
          </button>
          <span aria-hidden className={`absolute inset-x-0 -bottom-px h-0.5 origin-left bg-brand ${visible ? "motion-safe:animate-grow-x" : ""}`} style={{ animationDelay: "350ms" }} />
        </header>

        <div ref={logRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 pt-4 pb-2" aria-live="polite">
          <p className="self-center text-center text-xs text-graphite">{t.privacy}</p>
          {items.map((item) => {
            switch (item.kind) {
              case "bot":
                return (
                  <p key={item.id} className={`max-w-4/5 self-start px-3.5 py-2.5 text-sm leading-relaxed motion-safe:animate-drop-left ${item.calm ? "border-l-2 border-slate bg-neutral-800" : "bg-field"}`}>
                    {item.text}
                  </p>
                );
              case "user":
                return (
                  <p key={item.id} className="max-w-4/5 self-end bg-brand px-3.5 py-2.5 text-sm leading-relaxed motion-safe:animate-drop-right">
                    {item.text}
                  </p>
                );
              case "note":
                return (
                  <p key={item.id} className="self-center px-4 text-center text-xs text-ash motion-safe:animate-fade-up">
                    {item.text}
                  </p>
                );
              case "typing":
                return (
                  <div key={item.id} className="flex items-center gap-2.5 self-start bg-field px-3 py-2 motion-safe:animate-drop-left" aria-label={t.typing}>
                    <svg viewBox="0 0 46 26" className="h-6 w-11" aria-hidden>
                      <g className="motion-safe:animate-lift">
                        <rect x="2" y="12" width="42" height="3" rx="1.5" fill="#bbb" />
                        <rect x="4" y="5" width="5" height="17" rx="1.5" fill="#fe4203" />
                        <rect x="10" y="8" width="3" height="11" rx="1" fill="#fe4203" />
                        <rect x="37" y="5" width="5" height="17" rx="1.5" fill="#fe4203" />
                        <rect x="33" y="8" width="3" height="11" rx="1" fill="#fe4203" />
                      </g>
                    </svg>
                    <span className="text-xs text-ash">{t.typing}</span>
                  </div>
                );
              case "card":
                return (
                  <div key={item.id} className="self-stretch">
                    {item.node}
                  </div>
                );
              case "chips":
                if (item.used) return null;
                return (
                  <div key={item.id} className="flex flex-wrap gap-2 pt-0.5">
                    {item.chips.map((chip, i) => {
                      const cls = `border px-3 py-2 text-left text-sm transition-all duration-200 active:scale-95 motion-safe:animate-chip-in ${
                        chip.primary ? "border-white bg-white font-medium text-brand hover:border-brand hover:bg-brand hover:text-white" : "border-white/35 hover:border-brand hover:bg-brand/10"
                      }`;
                      return chip.external ? (
                        <a key={chip.label} href={chip.href} target="_blank" rel="noreferrer" onClick={() => pick(item.id, chip)} className={cls} style={{ animationDelay: `${i * 60}ms` }}>
                          {chip.label}
                        </a>
                      ) : (
                        <button key={chip.label} type="button" onClick={() => pick(item.id, chip)} className={cls} style={{ animationDelay: `${i * 60}ms` }}>
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>
                );
            }
          })}
        </div>

        <form onSubmit={onSend} className="flex gap-2 border-t border-white/10 px-3.5 pt-3 pb-3.5">
          <label htmlFor="chat-input" className="sr-only">
            Message
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            autoComplete="off"
            maxLength={300}
            className="min-w-0 flex-1 bg-field px-3 py-2.5 text-sm text-white placeholder:text-smoke focus:outline-2 focus:outline-brand"
          />
          <button type="submit" aria-label="Send" className="flex w-11 items-center justify-center bg-brand transition-transform duration-300 ease-snappy hover:translate-x-0.5 hover:-translate-y-0.5">
            <ArrowRight className="size-5" />
          </button>
        </form>
      </section>
    </>
  );
}
