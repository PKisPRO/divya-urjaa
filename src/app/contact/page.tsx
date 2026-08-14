import type { Metadata } from "next";
import { contact, EMAIL, INSTAGRAM_URL, SITE_URL, brand } from "@/data/content";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Get in touch with Divya Urjaa",
  description:
    "For bulk orders, NGO partnerships, or CSR gifting, reach out directly. We respond to every message — usually within a day or two.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label={contact.label}
        lines={contact.headline}
        intro={contact.intro}
      />

      {/* channels */}
      <section className="relative overflow-hidden bg-ivory u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {contact.channels.map((c, i) => (
              <Reveal
                as="article"
                key={c.title}
                delay={i * 0.07}
                className="border-t border-teal-700/15 pt-7"
              >
                <h2 className="u-display-tight text-[clamp(1.35rem,2.2vw,1.8rem)] text-teal-700">
                  {c.title}
                </h2>
                <p className="u-body mt-3 max-w-sm text-ink/70">{c.body}</p>
                <a
                  href={c.href}
                  {...("external" in c && c.external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  data-cursor="cta"
                  className="group mt-5 inline-flex items-center gap-2.5 text-[15px] text-teal-700 underline decoration-saffron underline-offset-4 transition-colors hover:text-ember"
                >
                  {c.value}
                  <svg
                    width="14"
                    height="9"
                    viewBox="0 0 16 10"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  >
                    <path
                      d="M0 5h14M10 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal
            as="blockquote"
            delay={0.1}
            className="mt-[clamp(3.5rem,7vw,6rem)] border-l-2 border-saffron pl-7 lg:ml-[25%]"
          >
            <p className="u-display-tight text-[clamp(1.4rem,2.6vw,2rem)] text-teal-700">
              &ldquo;{contact.quote}&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* form */}
      <section className="relative overflow-hidden bg-sand u-rhythm">
        <div className="u-shell grid gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <RevealText
              as="h2"
              lines={["Write to us."]}
              className="u-display text-[clamp(2rem,4vw,3.2rem)] text-teal-700"
            />
            <Reveal as="p" delay={0.1} className="u-body mt-6 text-ink/70">
              {contact.mediaNote}{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-teal-700 underline decoration-saffron underline-offset-4 transition-colors hover:text-ember"
              >
                {EMAIL}
              </a>
              .
            </Reveal>
            <Reveal as="p" delay={0.16} className="u-body mt-6 text-ink/70">
              {brand.parentLine}.
            </Reveal>
            <Reveal delay={0.22} className="mt-8">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="cta"
                className="group inline-flex items-center gap-3 rounded-full border border-teal-700/25 px-6 py-3.5 u-label text-teal-700 transition-colors duration-500 hover:border-saffron hover:text-ember"
              >
                Follow the journey on Instagram
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
