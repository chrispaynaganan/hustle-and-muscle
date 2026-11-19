"use client";

import { useState } from "react";
import { Check, ChevronDown } from "./icons";

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "url";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  half?: boolean;
  defaultValue?: string;
};

const fieldClasses =
  "w-full bg-field px-4 py-4.5 text-lg tracking-display text-white placeholder:text-smoke focus:outline-2 focus:outline-brand";

/**
 * Generic frontend-only form (referrals, job applications).
 * Validates in the browser and shows a thank-you state. Connect to a backend later.
 */
export function SimpleForm({ fields, submitLabel, successTitle, successBody }: { fields: FormField[]; submitLabel: string; successTitle: string; successBody: string }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div role="status" className="flex flex-col items-start gap-6 py-6">
        <span className="flex size-14 items-center justify-center bg-brand">
          <Check className="size-7" />
        </span>
        <h3 className="text-heading font-medium tracking-display">{successTitle}</h3>
        <p className="text-lg tracking-display text-ash">{successBody}</p>
        <button type="button" onClick={() => setDone(false)} className="cursor-pointer text-base font-medium text-brand underline-offset-4 hover:underline">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="grid gap-8 sm:grid-cols-2 sm:gap-x-6"
    >
      {fields.map((f) => (
        <div key={f.name} className={`flex flex-col gap-4 ${f.half ? "" : "sm:col-span-2"}`}>
          <label htmlFor={f.name} className="text-lg font-medium tracking-display">
            {f.label}
            {f.required === false && <span className="text-graphite"> (optional)</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea id={f.name} name={f.name} rows={4} defaultValue={f.defaultValue} required={f.required !== false} placeholder={f.placeholder} className={`${fieldClasses} resize-y`} />
          ) : f.type === "select" ? (
            <div className="relative">
              <select id={f.name} name={f.name} required={f.required !== false} defaultValue={f.defaultValue ?? ""} className={`${fieldClasses} cursor-pointer appearance-none pr-12 invalid:text-smoke`}>
                <option value="" disabled>
                  {f.placeholder ?? "Select one"}
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o} className="text-white">
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2" />
            </div>
          ) : (
            <input id={f.name} name={f.name} type={f.type ?? "text"} defaultValue={f.defaultValue} required={f.required !== false} placeholder={f.placeholder ?? f.label} className={fieldClasses} />
          )}
        </div>
      ))}
      <button type="submit" className="w-full cursor-pointer bg-brand px-4 py-5 text-base font-medium tracking-display transition-colors hover:bg-brand-dark sm:col-span-2">
        {submitLabel}
      </button>
    </form>
  );
}
