import type { Metadata } from "next";
import Image from "next/image";
import { artisans, impact, journey, SITE_URL } from "@/data/content";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import ImageReveal from "@/components/ui/ImageReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Artisans — The hands behind every flame",
  description:
    "Meet the women who shape each Urjaa Deepak by hand in a Rajasthan village — Guddu devi, Hansa Jangid and Sangeeta Sharma, and the fifty who work beside them.",
  alternates: { canonical: `${SITE_URL}/artisans` },
};

export default function ArtisansPage() {
  return (
    <>
      <PageHero
        label={artisans.label}
        lines={["The hands behind", "every flame."]}
        intro={artisans.intro}
      />

      {/* full-bleed editorial features */}
      <section className="relative overflow-hidden bg-ivory">
        {artisans.people.map((p, i) => (
          <article
            key={p.name}
            className="u-shell grid items-center gap-x-14 gap-y-8 py-[clamp(3.5rem,8vw,7rem)] lg:grid-cols-12"
          >
            <div
              className={[
                "lg:col-span-5",
                i % 2 ? "lg:order-2 lg:col-start-8" : "lg:col-start-1",
              ].join(" ")}
            >
              <ImageReveal
                src={p.image}
                alt={p.alt}
                width={1500}
                height={2000}
                sizes="(max-width: 1024px) 92vw, 40vw"
                cursor="meet"
                className="aspect-[3/4] w-full"
                quality={90}
              />
            </div>

            <div
              className={[
                "lg:col-span-6",
                i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7",
              ].join(" ")}
            >
              <Reveal as="p" className="u-label text-ember">
                {String(i + 1).padStart(2, "0")} · Rajasthan
              </Reveal>
              <RevealText
                as="h2"
                lines={[p.name]}
                className="u-display mt-4 text-[clamp(2.2rem,5vw,4rem)] text-teal-700"
              />
              <Reveal as="blockquote" delay={0.1} className="mt-8">
                <p
                  lang="hi"
                  className="u-display-tight text-[clamp(1.35rem,2.4vw,1.95rem)] leading-[1.5] text-ember"
                >
                  {p.quote}
                </p>
                <footer className="u-body mt-4 text-ink/60">
                  {p.translation}
                </footer>
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      {/* the collective */}
      <section className="relative overflow-hidden bg-teal-900 text-ivory u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <Reveal as="p" className="u-label text-saffron lg:col-span-3">
              The collective
            </Reveal>
            <div className="lg:col-span-9">
              <RevealText
                as="h2"
                lines={["Fifty more women", "work beside them."]}
                className="u-display text-[clamp(2.2rem,5vw,4.2rem)]"
              />
              <Reveal as="p" delay={0.08} className="u-lede mt-6 max-w-xl text-ivory/60">
                {journey.steps[2].body}
              </Reveal>
            </div>
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <ImageReveal
              src="/images/process/collective.jpg"
              alt="Eleven Urjaa Deepak artisans standing together with trays of freshly made deepaks"
              width={2400}
              height={1800}
              sizes="100vw"
              className="aspect-[16/9] w-full"
              quality={90}
            />
          </div>

          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {impact.stats.slice(0, 3).map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className="border-t border-ivory/20 pt-6"
              >
                <p className="u-display text-[clamp(2rem,4vw,3rem)] leading-none text-gold-soft">
                  {"display" in s
                    ? s.display
                    : `${s.value}${"suffix" in s ? s.suffix : ""}`}
                </p>
                <p className="u-label mt-4 text-ivory/50">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* at work */}
      <section className="relative overflow-hidden bg-sand u-rhythm">
        <div className="u-shell grid items-center gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ImageReveal
              src="/images/process/shaping.jpg"
              alt="Three women shaping Urjaa Deepaks by hand, with a bowl of natural ingredients beside them"
              width={2400}
              height={1800}
              sizes="(max-width: 1024px) 92vw, 48vw"
              className="aspect-[4/3] w-full"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <RevealText
              as="h2"
              lines={["Skill that was", "always there."]}
              className="u-display text-[clamp(1.9rem,3.8vw,3rem)] text-teal-700"
            />
            <Reveal as="p" delay={0.1} className="u-body mt-6 text-ink/75">
              Patience, craft, an inherited knowledge of traditional ingredients
              — what the women of this village lacked was never ability, only
              market access.
            </Reveal>
            <Reveal delay={0.16} className="mt-9">
              <MagneticButton href="/impact" variant="outline" tone="dark">
                What that changed
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* quiet gaushala note */}
      <section className="relative overflow-hidden bg-ivory u-rhythm">
        <div className="u-shell grid items-center gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealText
              as="h2"
              lines={["It begins", "in the gaushala."]}
              className="u-display text-[clamp(1.9rem,3.8vw,3rem)] text-teal-700"
            />
            <Reveal as="p" delay={0.1} className="u-body mt-6 text-ink/75">
              {journey.steps[0].body}
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/process/gaushala.jpg"
                alt="An Urjaa Deepak artisan sitting beside cattle in the village gaushala"
                fill
                sizes="(max-width: 1024px) 92vw, 48vw"
                quality={88}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
