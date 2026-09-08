import { science } from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import { BrokenRing } from "@/components/brand/Geometry";

/**
 * "Backed by Science" on the homepage.
 *
 * Same approved copy as the `/urjaa-deepak` section — one `science` object in
 * content.ts feeds both, so no claim can drift between them. The composition
 * differs on purpose: the product page states the science on sand, at length,
 * to a reader already deciding. Here it follows Benefits directly — the proof
 * arriving straight after the three blessings it backs — so it cuts to deep
 * teal between two light sections, leads with the two figures, and keeps the
 * closing line as a left rail rather than a footer: a held beat in the
 * scroll, not a second essay.
 */
export default function ScienceStory() {
  return (
    <section
      className="relative overflow-hidden bg-teal-900 text-ivory u-rhythm"
      aria-labelledby="science-home"
    >
      <BrokenRing
        className="pointer-events-none absolute -right-[16%] -top-[30%] w-[58vw] text-gold/10"
        strokeWidth={0.4}
        gap={50}
      />
      <div className="pointer-events-none absolute -left-[10%] bottom-[-26%] h-[46vh] w-[46vh] rounded-full bg-saffron/10 blur-[120px]" />

      <div className="u-shell relative">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <Reveal as="p" className="u-label text-saffron lg:col-span-3">
            {science.label}
          </Reveal>
          <div className="lg:col-span-9">
            <RevealText
              id="science-home"
              as="h2"
              lines={[science.headline]}
              className="u-display text-[clamp(2.2rem,4.8vw,4.2rem)]"
            />
            <Reveal as="p" delay={0.08} className="u-lede mt-6 max-w-xl text-ivory/60">
              {science.intro}
            </Reveal>
          </div>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* the closing line holds the rail the eyebrow started */}
          <Reveal delay={0.06} className="lg:col-span-3">
            <p className="u-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] text-gold-soft">
              {science.closing}
            </p>
          </Reveal>

          <div className="lg:col-span-9">
            <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
              {science.findings.map((f, i) => (
                <Reveal
                  key={f.figure}
                  delay={i * 0.08}
                  className="border-t-2 border-saffron pt-6"
                >
                  <p className="u-display text-[clamp(2.8rem,6vw,4.5rem)] leading-none text-gold-soft">
                    {f.figure}
                  </p>
                  <p className="u-body mt-4 text-ivory/75">{f.body}</p>
                  <p className="u-label mt-4 text-ivory/50">— {f.source}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-10 gap-y-9 md:grid-cols-2">
              {science.notes.map((n, i) => (
                <Reveal
                  key={n.title}
                  delay={i * 0.08}
                  className="border-t border-ivory/15 pt-6"
                >
                  <h3 className="u-display-tight text-[clamp(1.2rem,2vw,1.5rem)] text-ivory">
                    {n.title}
                  </h3>
                  <p className="u-body mt-3 text-ivory/60">{n.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
