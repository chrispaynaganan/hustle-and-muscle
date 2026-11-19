import { Fragment, type ReactNode } from "react";

/**
 * Infinite horizontal scroller. The list is repeated so each half is wider than the
 * screen, then the track slides by exactly half for a seamless loop. Hover to pause.
 */
export function Marquee({ children, label, repeat = 2 }: { children: ReactNode; label: string; repeat?: number }) {
  const copies = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-20 pr-20 lg:gap-32 lg:pr-32">
      {Array.from({ length: repeat }, (_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </ul>
  );

  return (
    <div className="pause-on-hover relative overflow-hidden mask-x-from-85%" aria-label={label} role="region">
      <div className="flex w-max motion-safe:animate-marquee">
        {copies(false)}
        {copies(true)}
      </div>
    </div>
  );
}
