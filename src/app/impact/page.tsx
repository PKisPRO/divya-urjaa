import type { Metadata } from "next";
import { impact, artisans, SITE_URL } from "@/data/content";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import ImageReveal from "@/components/ui/ImageReveal";
import Counter from "@/components/ui/Counter";
import MagneticButton from "@/components/ui/MagneticButton";
import VideoStory from "@/components/home/VideoStory";

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

      {/* named, not counted */}
      <section className="relative overflow-hidden bg-teal-900 text-ivory u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <Reveal as="p" className="u-label text-saffron lg:col-span-3">
              {artisans.label}
            </Reveal>
            <div className="lg:col-span-9">
              <RevealText
                as="h2"
                lines={["Behind every flame,", "a name."]}
                className="u-display text-[clamp(2.2rem,5vw,4.2rem)]"
              />
              <Reveal as="p" delay={0.08} className="u-lede mt-6 max-w-xl text-ivory/60">
                {artisans.intro}
              </Reveal>
            </div>
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-10 gap-y-12 md:grid-cols-3">
            {artisans.people.map((p, i) => (
              <Reveal as="article" key={p.name} delay={i * 0.08}>
                <ImageReveal
                  src={p.image}
                  alt={p.alt}
                  width={1500}
                  height={2000}
                  sizes="(max-width: 768px) 92vw, 30vw"
                  cursor="meet"
                  className="aspect-[3/4] w-full"
                />
                <blockquote className="mt-6">
                  <p
                    lang="hi"
                    className="u-display-tight text-[clamp(1.1rem,1.7vw,1.35rem)] leading-[1.5] text-gold-soft"
                  >
                    {p.quote}
                  </p>
                  <footer className="mt-3">
                    <p className="u-body text-[14px] text-ivory/50">
                      {p.translation}
                    </p>
                    <p className="u-label mt-3 text-ivory/80">{p.name}</p>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* the film */}
      <VideoStory />

      {/* support */}
      <section className="relative overflow-hidden bg-sand u-rhythm">
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
