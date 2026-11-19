"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/lib/site";
import { CartButton } from "./cart/cart-ui";
import { ArrowRight, ChevronDown, Close, Mail, Menu, NavigationPointer, Phone } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      {/* Fade behind the header so the nav stays readable over photos */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-60 bg-linear-to-b from-black from-40% to-transparent" />

      <div className="relative mx-auto max-w-site px-5 pt-6 md:px-10 xl:pt-12">
        {/* Contact strip */}
        <div className="hidden items-center justify-end gap-6 text-xs font-medium text-steel lg:flex">
          <span className="flex items-center gap-4">
            <NavigationPointer className="size-5 text-brand" />
            {site.address}
          </span>
          <a href={site.phoneHref} className="flex items-center gap-4 transition-colors hover:text-white">
            <Phone className="size-5 text-brand" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
            <Mail className="size-5 text-brand" />
            {site.email}
          </a>
        </div>

        <div className="flex items-center justify-between lg:mt-6">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Image src="/images/logo.png" alt={site.name} width={103} height={65} priority className="h-12 w-auto lg:h-16" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => {
                const active = item.href === pathname;
                return (
                  <li key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 py-2 text-base font-medium transition-colors hover:text-brand ${active ? "text-brand" : "text-white"}`}
                    >
                      {item.label}
                      {item.children && <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />}
                    </Link>
                    {item.children && (
                      <div className="invisible absolute top-full left-0 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                        <ul className="min-w-52 border border-white/10 bg-night/95 py-2 backdrop-blur-md">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link href={child.href} className="block px-4 py-2.5 text-sm text-mist transition-colors hover:bg-white/5 hover:text-brand">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <CartButton className="-mx-4" />
            <Link
              href="/membership"
              className="flex items-center gap-4 bg-white px-6 py-3 text-base font-medium text-brand transition-colors hover:bg-brand hover:text-white"
            >
              Become a Member
              <ArrowRight className="size-5" />
            </Link>
          </nav>

          <div className="flex items-center gap-1 lg:hidden">
          <CartButton />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex size-11 items-center justify-center text-white lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="size-7" />
          </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-black px-5 pt-6 pb-10 transition-opacity duration-300 md:px-10 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <Image src="/images/logo.png" alt={site.name} width={103} height={65} className="h-12 w-auto" />
          <button type="button" onClick={() => setOpen(false)} className="flex size-11 items-center justify-center" aria-label="Close menu">
            <Close className="size-7" />
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-10 flex-1 overflow-y-auto">
          <ul className="flex flex-col divide-y divide-white/10">
            {mainNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="block py-4 text-3xl font-medium tracking-display transition-colors hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/membership" className="mt-8 flex items-center justify-center gap-4 bg-brand px-6 py-4 text-lg font-medium">
          Become a Member
          <ArrowRight className="size-5" />
        </Link>
        <div className="mt-6 space-y-2 text-sm text-steel">
          <p>{site.address}</p>
          <p>
            <a href={site.phoneHref}>{site.phone}</a> · <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </header>
  );
}
