import type { Metadata } from "next";
import { impact, SITE_URL } from "@/data/content";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import ImageReveal from "@/components/ui/ImageReveal";
import Counter from "@/components/ui/Counter";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Impact — Every deepak you light changes a life",
  description:
    "50+ women artisans. ₹5,00,000 in livelihoods supported. One village in Rajasthan, since 2016. All profits are reinvested into the welfare of the women artisans.",
  alternates: { canonical: `${SITE_URL}/impact` },
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        label={impact.label}
        lines={impact.headline}
        intro={impact.intro}
      />

      {/* the numbers */}
      <section className="relative overflow-hidden bg-ivory u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {impact.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.07}
                className="border-t-2 border-saffron pt-6"
              >
                <p className="u-display text-[clamp(2.4rem,5vw,3.8rem)] leading-none text-teal-700">
                  {"display" in s ? (
                    s.display
                  ) : (
                    <Counter to={s.value} suffix={"suffix" in s ? s.suffix : ""} />
                  )}
                </p>
                <p className="u-label mt-5 text-smoke">{s.label}</p>
              </Reveal>
            ))}
          </div>

          <Reveal
            as="blockquote"
            delay={0.1}
            className="mt-[clamp(3.5rem,7vw,6rem)] border-l-2 border-saffron pl-7 lg:ml-[25%]"
          >
            <p className="u-display-tight text-[clamp(1.5rem,2.8vw,2.2rem)] text-teal-700">
              {impact.commitment}
            </p>
            <footer className="u-label mt-5 text-smoke">
              — {impact.commitmentSource}
            </footer>
          </Reveal>
        </div>
      </section>

      {/* the collective photograph, full width */}
      <section className="relative overflow-hidden bg-sand pb-[clamp(4rem,8vw,7rem)] pt-0">
        <ImageReveal
          src="/images/story/chetnagram-collective.jpg"
          alt="The women of Divya Urjaa and Chetnagram Sansthan standing together with raised fists on the steps of their community building"
          width={2400}
          height={1800}
          sizes="100vw"
          className="aspect-[16/9] w-full"
          quality={90}
        />
        <div className="u-shell mt-8">
          <p className="u-label text-smoke">
            Chetnagram Sansthan · 187+ villages reached since 2015
          </p>
        </div>
      </section>

      {/* support */}
      <section className="relative overflow-hidden bg-ivory u-rhythm">
        <div className="u-shell grid items-end gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealText
              as="h2"
              lines={[impact.cta.headline]}
              className="u-display text-[clamp(2.2rem,5vw,4rem)] text-teal-700"
            />
            <Reveal as="p" delay={0.1} className="u-lede mt-6 max-w-lg text-ink/70">
              {impact.cta.body}
            </Reveal>
          </div>
          <Reveal delay={0.18} className="lg:col-span-4 lg:col-start-9">
            <MagneticButton href="/urjaa-deepak" variant="solid" tone="dark">
              Buy a deepak
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
