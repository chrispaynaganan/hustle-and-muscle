"use client";

import { useState } from "react";
import { Check, ChevronDown } from "@/components/icons";

const fieldClasses =
  "w-full bg-field px-4 py-4.5 text-lg tracking-display text-white placeholder:text-smoke focus:outline-2 focus:outline-brand";

const contactMethods = ["Call", "Text / SMS", "Email", "Facebook Messenger"];
const helpTopics = ["Membership", "Personal training program", "Group classes", "Free assessment", "Something else"];
const bestTimes = ["Morning (6AM to 12PM)", "Afternoon (12PM to 6PM)", "Evening (6PM to 10PM)"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  // Frontend-only: there's no backend yet, so the form confirms locally.
  // Hook this up to an API route, Formspree, or a server action later.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted(String(data.get("name") || "").split(" ")[0] || "there");
  }

  if (submitted) {
    return (
      <div role="status" className="flex flex-col items-start gap-6 py-10">
        <span className="flex size-14 items-center justify-center bg-brand">
          <Check className="size-7" />
        </span>
        <h3 className="text-heading font-medium tracking-display">Thanks, {submitted}!</h3>
        <p className="text-lg tracking-display text-ash">
          Your inquiry is in. Our team will reach out using your preferred contact method to set up your free assessment.
        </p>
        <button type="button" onClick={() => setSubmitted(null)} className="text-base font-medium text-brand underline-offset-4 hover:underline">
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <Field label="Full Name" id="name">
        <input id="name" name="name" required autoComplete="name" placeholder="Full Name" className={fieldClasses} />
      </Field>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
        <Field label="Mobile Number" id="mobile">
          <input id="mobile" name="mobile" type="tel" required autoComplete="tel" placeholder="Mobile Number" className={fieldClasses} />
        </Field>
        <Field label="Email Address" id="email">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="Email Address" className={fieldClasses} />
        </Field>
      </div>

      <Field label="Preferred Contact Method" id="method">
        <Select id="method" name="method" placeholder="Preferred Contact Method" options={contactMethods} />
      </Field>

      <Field label="What can we help you with?" id="topic">
        <Select id="topic" name="topic" placeholder="What can we help you with?" options={helpTopics} />
      </Field>

      <Field label="Best time to contact you" id="time">
        <Select id="time" name="time" options={bestTimes} />
      </Field>

      <Field label="Message" id="message">
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Tell us your goal, experience level, and when you want to start."
          className={`${fieldClasses} resize-y`}
        />
      </Field>

      <label className="flex cursor-pointer items-center gap-4 text-base font-medium tracking-display text-fog">
        <span className="relative flex size-5 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            name="consent"
            required
            className="peer size-5 cursor-pointer appearance-none border border-neutral-400 bg-white checked:border-brand checked:bg-brand"
          />
          <Check className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100" />
        </span>
        I agree to be contacted about my inquiry
      </label>

      <button type="submit" className="w-full bg-brand px-4 py-5 text-base font-medium tracking-display transition-colors hover:bg-brand-dark">
        Send Inquiry
      </button>
    </form>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className="text-lg font-medium tracking-display">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({ id, name, options, placeholder }: { id: string; name: string; options: string[]; placeholder?: string }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required
        defaultValue={placeholder ? "" : options[0]}
        className={`${fieldClasses} cursor-pointer appearance-none pr-12 invalid:text-smoke`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o} className="text-white">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-white" />
    </div>
  );
}
