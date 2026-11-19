"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Watches every [data-reveal] element (and the children of [data-reveal-group])
 * and marks it data-shown when it scrolls into view. CSS in globals.css does the animating.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("reveal-ready")) return;
    (window as unknown as { __hmReveal: boolean }).__hmReveal = true;

    // Wipe targets are fully clipped while hidden, which the browser counts as "not visible",
    // so we watch their parent instead and reveal them through this map.
    const targets = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (targets.get(entry.target) ?? []).forEach((t) => t.setAttribute("data-shown", ""));
            targets.delete(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          const el = child as HTMLElement;
          if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", group.dataset.revealGroup || "");
          el.style.setProperty("--reveal-i", String(Math.min(i, 8)));
        });
      });
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])").forEach((el) => {
        const watch = el.dataset.reveal === "wipe" && el.parentElement ? el.parentElement : el;
        const list = targets.get(watch) ?? [];
        if (!list.includes(el)) list.push(el);
        targets.set(watch, list);
        io.observe(watch);
      });
    };

    scan();
    let t: ReturnType<typeof setTimeout>;
    const mo = new MutationObserver(() => {
      clearTimeout(t);
      t = setTimeout(scan, 50);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}

/**
 * Runs before first paint: hides reveal targets only when JS is running and the
 * visitor hasn't asked for reduced motion. Falls back to showing everything after 4s.
 */
export const revealBootScript = `(function(){try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('reveal-ready');setTimeout(function(){if(!window.__hmReveal){d.classList.remove('reveal-ready')}},4000)}catch(e){}})();`;
