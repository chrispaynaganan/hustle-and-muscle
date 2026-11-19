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
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Solid bar once you leave the top; slides away while scrolling down, returns on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 400 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y <= 400) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-snappy ${hidden && !open ? "-translate-y-full" : "translate-y-0"} ${
          scrolled ? "bg-black/80 shadow-2xl backdrop-blur-xl" : ""
        }`}
      >
        {/* Fade behind the header so the nav stays readable over photos */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-60 bg-linear-to-b from-black from-40% to-transparent transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
        />

        <div className={`relative mx-auto max-w-site px-5 transition-all duration-500 ease-snappy md:px-10 ${scrolled ? "py-3" : "pt-6 xl:pt-12"}`}>
          {/* Contact strip */}
          <div
            className={`hidden items-center justify-end gap-6 overflow-hidden text-xs font-medium text-steel transition-all duration-500 ease-snappy lg:flex ${
              scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
            }`}
          >
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

          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "" : "lg:mt-6"}`}>
            <Link href="/" aria-label={`${site.name} home`} className="shrink-0 transition-transform duration-300 hover:scale-105">
              <Image
                src="/images/logo.png"
                alt={site.name}
                width={103}
                height={65}
                priority
                className={`w-auto transition-all duration-500 ease-snappy ${scrolled ? "h-10 lg:h-11" : "h-12 lg:h-16"}`}
              />
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
              <ul className="flex items-center gap-7">
                {mainNav.map((item) => {
                  const active = item.href === pathname || item.children?.some((c) => c.href === pathname);
                  return (
                    <li key={item.label} className="group relative">
                      <Link
                        href={item.href}
                        className={`relative flex items-center gap-2.5 py-2 text-base font-medium transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-brand after:transition-transform after:duration-300 hover:text-brand hover:after:scale-x-100 ${
                          active ? "text-brand after:scale-x-100" : "text-white after:scale-x-0"
                        }`}
                      >
                        {item.label}
                        {item.children && <ChevronDown className="size-4 transition-transform duration-300 group-hover:rotate-180" />}
                      </Link>
                      {item.children && (
                        <div className="invisible absolute top-full left-0 translate-y-2 pt-3 opacity-0 transition-all duration-300 ease-snappy group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                          <ul className="min-w-52 border border-white/10 bg-night/95 py-2 backdrop-blur-md">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className="block px-4 py-2.5 text-sm text-mist transition-all duration-200 hover:translate-x-1 hover:bg-white/5 hover:text-brand"
                                >
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
                className="group/cta flex items-center gap-4 bg-white px-6 py-3 text-base font-medium text-brand transition-colors hover:bg-brand hover:text-white active:scale-95"
              >
                Become a Member
                <ArrowRight className="size-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </nav>

            <div className="flex items-center gap-1 lg:hidden">
              <CartButton />
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex size-11 items-center justify-center text-white"
                aria-label="Open menu"
                aria-expanded={open}
              >
                <Menu className="size-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu (outside the header so the header's slide transform can't trap it) */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-black px-5 pt-6 pb-10 transition-all duration-500 ease-snappy md:px-10 lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
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
            {mainNav.map((item, i) => (
              <li
                key={item.label}
                className={`transition-all duration-500 ease-snappy ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              >
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
    </>
  );
}
