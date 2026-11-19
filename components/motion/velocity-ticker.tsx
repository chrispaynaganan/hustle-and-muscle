"use client";

import { Fragment, useEffect, useRef } from "react";
import { Triangle } from "../icons";

const BASE_SPEED = 60; // px per second when the page is still

/**
 * Bold slogan strip that drifts on its own, speeds up with scroll speed
 * and flips direction when you scroll back up.
 */
export function VelocityTicker({ phrases }: { phrases: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let dir = -1;
    let boost = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let frame = 0;
    let visible = true;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const loop = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) {
        dir = dy > 0 ? -1 : 1;
        boost = Math.min(boost + Math.abs(dy) * 0.6, 1600);
      }
      boost *= 0.92; // ease back to cruising speed
      if (visible) {
        const half = el.scrollWidth / 2;
        x += dir * (BASE_SPEED + boost) * dt;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        el.style.transform = `translate3d(${x}px,0,0)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {[0, 1].map((r) => (
        <Fragment key={r}>
          {phrases.map((p, i) => (
            <span key={`${r}-${i}`} className="flex items-center">
              <span className={`px-8 text-5xl font-bold tracking-display whitespace-nowrap uppercase lg:px-12 lg:text-price ${i % 2 ? "text-black" : "text-white"}`}>
                {p}
              </span>
              <Triangle className="size-6 shrink-0 text-black lg:size-8" />
            </span>
          ))}
        </Fragment>
      ))}
    </div>
  );

  return (
    <section aria-label={phrases.join(", ")} className="relative overflow-hidden bg-black py-10 lg:py-16">
      <div className="-mx-10 -rotate-2 bg-brand py-5 shadow-2xl lg:py-7">
        <div ref={track} className="flex w-max will-change-transform">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
