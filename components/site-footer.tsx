import Image from "next/image";
import Link from "next/link";
import { footerNav, policyLinks, site } from "@/lib/site";
import { Facebook, Instagram, TikTok } from "./icons";
import { NewsletterForm } from "./newsletter-form";

const socialLinks = [
  { label: "Instagram", href: site.socials.instagram, Icon: Instagram },
  { label: "Facebook", href: site.socials.facebook, Icon: Facebook },
  { label: "TikTok", href: site.socials.tiktok, Icon: TikTok },
].filter((s) => s.href);

export function SiteFooter() {
  return (
    <footer className="bg-linear-to-t from-black to-surface-deep">
      <div className="mx-auto flex max-w-site flex-col gap-14 px-5 py-15 md:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full max-w-152 flex-col gap-9.5">
          <Link href="/" aria-label={`${site.name} home`}>
            <Image src="/images/logo.png" alt={site.name} width={103} height={65} className="h-16 w-auto" />
          </Link>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-8 text-sm tracking-display sm:grid-cols-3">
            {footerNav.map((column, i) => (
              <ul key={i} className="flex flex-col gap-5">
                {column.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-6">
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition-colors hover:text-brand">
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          )}

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-base tracking-display">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-sm tracking-display text-slate">
            Copyright © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>

        <div className="w-full lg:max-w-127">
          <NewsletterForm />
        </div>
      </div>
    </footer>
  );
}
