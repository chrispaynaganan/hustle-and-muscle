import Image from "next/image";
import Link from "next/link";
import { getCoach } from "@/lib/coaches";
import { monthlyInclusions } from "@/lib/content";
import { peso } from "@/lib/format";
import { contactHref } from "@/lib/site";
import { type GxClass, type Program, membershipFee, memberships } from "@/lib/training";
import { ButtonLink } from "./button";
import { AddToCartButton } from "./cart/cart-ui";
import { ChamferCard } from "./chamfer-card";
import { Triangle } from "./icons";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <ChamferCard innerClassName="flex flex-col">
      <Image src={program.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-right" />
      <div aria-hidden className="absolute inset-0 bg-black/60 lg:bg-linear-to-r lg:from-black/80 lg:via-black/40 lg:to-transparent" />
      <div className="relative flex flex-1 flex-col gap-12 px-6 py-8 sm:px-10.5 lg:max-w-138">
        <div className="flex flex-col gap-4.5">
          {program.badge && <span className="self-start bg-brand p-3 text-lg font-medium tracking-display">{program.badge}</span>}
          <h3 className="text-3xl font-bold tracking-display lg:text-heading">
            <Link href={`/programs/${program.slug}`} className="hover:text-brand">
              {program.title}
            </Link>
          </h3>
          <p className="mt-3 flex flex-wrap items-end gap-2">
            <span className="text-6xl font-bold tracking-display text-brand lg:text-price">{peso(program.price)}</span>
            <span className="text-2xl tracking-display text-mist lg:text-heading">{program.unit}</span>
          </p>
        </div>
        <dl className="flex flex-col gap-6 text-xl font-bold tracking-display lg:text-2xl">
          <div className="flex gap-2">
            <dt>Schedule:</dt>
            <dd>{program.schedule}</dd>
          </div>
          <div className="flex flex-wrap gap-2">
            <dt>Coach:</dt>
            <dd>{program.coach}</dd>
          </div>
        </dl>
        <div className="flex flex-col gap-4 text-xl tracking-display lg:gap-7.5 lg:text-2xl">
          <p className="font-semibold italic">How it Works</p>
          <p>{program.howItWorks}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-4">
          <ButtonLink href={`/programs/${program.slug}`} className="text-lg">
            {program.primaryCta}
          </ButtonLink>
          <ButtonLink href={contactHref("assessment", program.title)} variant="outline" icon={false}>
            Book a Free Assessment
          </ButtonLink>
        </div>
      </div>
    </ChamferCard>
  );
}

export function ClassCard({ gx, wide = false }: { gx: GxClass; wide?: boolean }) {
  const coach = getCoach(gx.coachSlug);
  return (
    <ChamferCard size="sm" glow={!!gx.featured} className={`h-full ${wide ? "md:col-span-2" : ""}`}>
      <div className="flex h-full flex-col gap-8 px-6 py-8 sm:px-10.5">
        <div className="flex flex-col gap-6">
          <h3 className="text-3xl font-bold tracking-display lg:text-heading">
            <Link href={`/classes/${gx.slug}`} className="hover:text-brand">
              {gx.title}
            </Link>
          </h3>
          <p className={`flex gap-2 ${wide ? "flex-wrap items-end" : "flex-col"}`}>
            <span className="text-5xl font-bold tracking-display text-brand lg:text-6xl">{peso(gx.price)}</span>
            <span className="text-2xl tracking-display text-mist">{gx.unit}</span>
          </p>
        </div>
        {coach && (
          <Link href={`/coaches/${coach.slug}`} className="flex items-center gap-4 hover:text-brand">
            <Image src={coach.image} alt="" width={64} height={64} className="size-8 rounded-full object-cover" />
            <span className="text-xl font-medium tracking-display">{coach.name}</span>
          </Link>
        )}
        <p className="text-xl font-light tracking-display italic">{wide ? gx.details : gx.schedule}</p>
        <div className="mt-auto flex flex-wrap gap-4">
          <ButtonLink href={`/classes/${gx.slug}`} className="text-lg">
            Join the Class{gx.slotsLeft ? ` (${gx.slotsLeft} slots left)` : ""}
          </ButtonLink>
          {wide && (
            <ButtonLink href={contactHref("assessment", gx.title)} variant="outline" icon={false}>
              Book a Free Assessment
            </ButtonLink>
          )}
        </div>
      </div>
    </ChamferCard>
  );
}

const cartMembership = (slug: string) => {
  const m = memberships.find((x) => x.slug === slug)!;
  return { id: `membership:${m.slug}`, slug: m.slug, kind: "membership" as const, name: m.title, price: m.price, href: "/membership", detail: m.unit?.replace("/", "Per ") };
};

/** Monthly + longer memberships + day passes, with add-to-cart buttons. */
export function MembershipPlans() {
  const monthly = memberships.find((m) => m.slug === "monthly")!;
  const longer = memberships.filter((m) => m.kind === "membership" && m.slug !== "monthly");
  const passes = memberships.filter((m) => m.kind === "day-pass");

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2">
        <ChamferCard>
          <div className="flex flex-col gap-12 px-6 py-10 sm:px-10.5 lg:py-14">
            <div className="flex flex-col gap-4.5">
              <span className="self-start bg-brand p-3 text-lg font-medium tracking-display">{monthly.badge}</span>
              <h3 className="text-3xl font-bold tracking-display lg:text-heading">{monthly.title}</h3>
              <p className="mt-3 flex flex-wrap items-end gap-2">
                <span className="text-6xl font-bold tracking-display text-brand lg:text-price">{peso(monthly.price)}</span>
                <span className="text-2xl tracking-display text-iron lg:text-heading">/month</span>
              </p>
            </div>
            <div className="flex flex-col gap-7.5 text-xl tracking-display lg:text-2xl">
              <p className="font-semibold italic">Inclusions</p>
              <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                {monthlyInclusions.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Triangle className="size-3 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xl font-bold tracking-display lg:text-2xl">{peso(membershipFee)} Annual Membership Fee (paid once per year)</p>
            <AddToCartButton item={cartMembership("monthly")} label="Join Monthly" className="self-start text-lg" />
          </div>
        </ChamferCard>

        <div className="grid gap-8 sm:grid-cols-2">
          {longer.map((m) => (
            <ChamferCard key={m.slug} size="sm">
              <div className="flex h-full flex-col gap-7 px-6 py-8 sm:px-10.5">
                <h3 className="text-3xl font-bold tracking-display lg:text-heading">{m.title}</h3>
                <p className="text-5xl font-bold tracking-display text-brand lg:text-6xl">{peso(m.price)}</p>
                <p className="text-2xl tracking-display">{m.savings}</p>
                <AddToCartButton item={cartMembership(m.slug)} label="Join" variant="outline" className="mt-auto self-start" />
              </div>
            </ChamferCard>
          ))}
        </div>
      </div>

      <div id="day-pass" className="mt-8 grid scroll-mt-10 items-start gap-8 lg:grid-cols-2">
        <p className="max-w-196 pt-2 text-lg tracking-display md:text-2xl lg:pt-8">
          Not sure if Hustle and Muscle is right for you yet? We offer a day pass to test us out.
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {passes.map((d) => (
            <ChamferCard key={d.slug} size="sm" glow={false}>
              <div className="flex flex-col gap-4.5 px-6 py-8 sm:px-10.5">
                <p className="text-2xl tracking-display">Day Pass</p>
                <h3 className="text-3xl font-bold tracking-display lg:text-heading">{d.title.replace("Day Pass ", "").replace(/^f/, "F")}</h3>
                <p className="mt-3 text-5xl font-bold tracking-display text-neutral-400 lg:text-6xl">{peso(d.price)}</p>
                <AddToCartButton item={cartMembership(d.slug)} label="Buy Pass" variant="outline" className="self-start" />
              </div>
            </ChamferCard>
          ))}
        </div>
      </div>
    </>
  );
}
