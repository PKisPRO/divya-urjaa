"use client";

import { useState } from "react";
import { contact, EMAIL } from "@/data/content";

/** No backend exists for this site, so rather than pretend to submit, the form
 *  composes a properly-addressed email. Nothing is silently dropped. */
export default function ContactForm() {
  const [subject, setSubject] = useState<string>(contact.subjects[0]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const body = `${message}\n\n—\n${name}${email ? ` · ${email}` : ""}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full border-b border-teal-700/25 bg-transparent py-4 text-[15px] text-ink outline-none transition-colors placeholder:text-smoke/70 focus:border-saffron";

  return (
    <form onSubmit={onSubmit} className="grid gap-y-7">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="u-label text-smoke">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`mt-3 ${field}`}
          />
        </div>
        <div>
          <label htmlFor="email" className="u-label text-smoke">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`mt-3 ${field}`}
          />
        </div>
      </div>

      <fieldset>
        <legend className="u-label text-smoke">Subject</legend>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {contact.subjects.map((s) => (
            <label
              key={s}
              className={[
                "cursor-pointer rounded-full border px-5 py-2.5 u-label transition-colors duration-300",
                subject === s
                  ? "border-saffron bg-saffron text-teal-900"
                  : "border-teal-700/25 text-teal-700 hover:border-saffron",
              ].join(" ")}
            >
              <input
                type="radio"
                name="subject"
                value={s}
                checked={subject === s}
                onChange={() => setSubject(s)}
                className="sr-only"
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="u-label text-smoke">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us what you need."
          className={`mt-3 resize-y ${field}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          data-cursor="cta"
          className="group inline-flex items-center gap-3 rounded-full bg-teal-700 px-8 py-4 u-label text-ivory transition-colors duration-500 hover:bg-saffron"
        >
          Send message
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            aria-hidden
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
          >
            <path
              d="M0 5h14M10 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="text-[13px] text-smoke">
          Opens your mail app, addressed to {EMAIL}.
        </p>
      </div>
    </form>
  );
}
