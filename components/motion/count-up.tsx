"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up to `value` the first time it scrolls into view. Server-renders the final number. */
export function CountUp({ value, suffix = "", duration = 1400 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDisplay(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 4))));
          if (p < 1) requestAnimationFrame(tick);
          else setLanded(true);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${landed ? "motion-safe:animate-bump" : ""}`}>
      {display.toLocaleString("en-PH")}
      {suffix}
    </span>
  );
}
