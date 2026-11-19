import type { ReactNode } from "react";

type Part = string | { text: string; className: string };

/**
 * Splits a headline into words that slide up one after another on page load.
 * Pass plain strings, or { text, className } for highlighted words.
 */
export function SplitWords({ parts, delay = 0, step = 70 }: { parts: Part[]; delay?: number; step?: number }) {
  const words: { word: string; className?: string }[] = [];
  for (const part of parts) {
    const text = typeof part === "string" ? part : part.text;
    const className = typeof part === "string" ? undefined : part.className;
    for (const word of text.split(" ").filter(Boolean)) words.push({ word, className });
  }

  const out: ReactNode[] = [];
  words.forEach(({ word, className }, i) => {
    out.push(
      <span key={i} className="-mb-2 inline-block overflow-hidden pb-2 align-bottom">
        <span className={`inline-block motion-safe:animate-word ${className ?? ""}`} style={{ animationDelay: `${delay + i * step}ms` }}>
          {word}
        </span>
      </span>,
    );
    if (i < words.length - 1) out.push(" ");
  });
  return <>{out}</>;
}
