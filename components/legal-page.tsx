import Link from "next/link";
import { type LegalDoc, legalDocs, legalUpdated } from "@/lib/legal";
import { Triangle } from "./icons";
import { Container } from "./page-hero";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="bg-linear-to-b from-black to-surface pt-40 pb-24 lg:pt-56">
      <Container className="grid items-start gap-12 lg:grid-cols-4 lg:gap-16">
        <nav aria-label="Policies" className="flex flex-wrap gap-3 lg:sticky lg:top-8 lg:mt-36 lg:flex-col lg:gap-4">
          {legalDocs.map((d) => (
            <Link
              key={d.slug}
              href={`/${d.slug}`}
              aria-current={d.slug === doc.slug ? "page" : undefined}
              className={`border px-4 py-2 text-base tracking-display transition-colors lg:border-0 lg:border-l-2 lg:py-1 ${d.slug === doc.slug ? "border-brand text-brand" : "border-white/20 hover:text-brand"}`}
            >
              {d.title}
            </Link>
          ))}
        </nav>

        <article data-reveal-group className="flex max-w-196 flex-col gap-12 lg:col-span-3">
          <header className="flex flex-col gap-6">
            <h1 className="text-5xl font-medium tracking-display md:text-7xl lg:text-8xl">{doc.title}</h1>
            <p className="text-base tracking-display text-graphite">Last updated {legalUpdated}</p>
            <p className="text-xl tracking-display text-mist">{doc.intro}</p>
          </header>
          {doc.sections.map((s, i) => (
            <section key={s.heading} className="flex flex-col gap-5 border-t border-white/10 pt-10">
              <h2 className="text-2xl font-bold tracking-display lg:text-heading">
                <span className="text-brand">{String(i + 1).padStart(2, "0")}.</span> {s.heading}
              </h2>
              {s.body?.map((p) => (
                <p key={p} className="text-lg tracking-display text-mist">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="flex flex-col gap-3 text-lg tracking-display text-mist">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Triangle className="mt-1.5 size-3 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </Container>
    </section>
  );
}
