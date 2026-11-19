"use client";

import { useRef } from "react";

/**
 * Pulls its child gently toward the cursor (desktop mice only), then springs back.
 * Use sparingly, on the one main call to action in a section.
 */
export function Magnetic({ children, strength = 0.25, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const enabled = () =>
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onMove(e: React.PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${Math.max(-12, Math.min(12, x))}px, ${Math.max(-10, Math.min(10, y))}px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`inline-block transition-transform duration-300 ease-snappy ${className}`}>
      {children}
    </span>
  );
}
