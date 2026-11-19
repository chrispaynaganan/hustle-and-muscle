import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M20 12H4m6-6-6 6 6 6" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function NavigationPointer(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M3.4 10.2 20 3.9c.4-.1.7.2.6.6L14.3 21c-.1.4-.7.4-.9 0l-2.8-6.9a.6.6 0 0 0-.3-.3l-6.9-2.7c-.4-.2-.4-.8 0-.9Z" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M8.4 9.6a12.6 12.6 0 0 0 6 6l1.8-1.8c.3-.3.7-.4 1-.2 1 .4 2.2.7 3.3.7.6 0 1 .4 1 1V19c0 .6-.4 1-1 1A17 17 0 0 1 3.5 3c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.2.2 2.3.6 3.3.1.4 0 .8-.2 1Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m3 7 7.4 5.2c.9.6 2.2.6 3.2 0L21 7M6 19h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3Z" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2.5} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Solid triangle used for the play button and list bullets. */
export function Triangle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6 3.5v17a.8.8 0 0 0 1.2.7l14-8.5a.8.8 0 0 0 0-1.4l-14-8.5A.8.8 0 0 0 6 3.5Z" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8Z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.6v-7h-2.3v-2.7h2.3v-2c0-2.3 1.4-3.6 3.5-3.6l2.1.1v2.4h-1.4c-1.1 0-1.4.6-1.4 1.4v1.7h2.7l-.4 2.7h-2.3v7H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Z" />
    </svg>
  );
}

export function TikTok(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.6 3c.4 2.2 1.8 3.6 4 3.9v3a7 7 0 0 1-4-1.3v6.3a6 6 0 1 1-6-6h.6v3.1a3 3 0 1 0 2.4 2.9V3h3Z" />
    </svg>
  );
}

export function Bag(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function Trash(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
