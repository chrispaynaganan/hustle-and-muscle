"use client";

import { useState } from "react";
import { Check } from "./icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [member, setMember] = useState(false);
  const [done, setDone] = useState(false);

  // Frontend-only: no backend yet, so we just confirm the subscription locally.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <div className="flex flex-col gap-9.5">
      <div className="flex flex-col gap-4">
        <h2 className="text-heading font-medium tracking-display">Stay Up to Date</h2>
        <p className="text-base tracking-display">Subscribe now and get the latest news!</p>
      </div>

      {done ? (
        <p role="status" className="border border-brand/50 bg-brand/10 p-4 text-base">
          Thanks for subscribing{member ? ", member" : ""}! We&apos;ll send updates to <span className="font-medium">{email}</span>.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full border border-black bg-white p-4 text-base tracking-display text-black placeholder:text-graphite focus:outline-2 focus:outline-brand"
          />
          <label className="flex cursor-pointer items-center gap-4 text-base tracking-display text-slate">
            <span className="relative flex size-5 items-center justify-center">
              <input
                type="checkbox"
                checked={member}
                onChange={(e) => setMember(e.target.checked)}
                className="peer size-5 cursor-pointer appearance-none border border-black bg-mist checked:bg-brand"
              />
              <Check className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100" />
            </span>
            Are you an existing member?
          </label>
          <button type="submit" className="w-full bg-brand p-4 text-base font-medium tracking-display transition-colors hover:bg-brand-dark">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
