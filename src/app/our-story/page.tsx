import type { Metadata } from "next";
import { story, impact, SITE_URL } from "@/data/content";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import ImageReveal from "@/components/ui/ImageReveal";
import VideoStory from "@/components/home/VideoStory";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Our Story — Purpose-driven, youth-led, community-rooted",
  description:
    "Divya Urjaa began in 2016 as an initiative of Chetnagram Sansthan, started by Mrs Vibha Agarwal with the blessings of Gurudev Pandit Shri Ram Sharma Acharya.",
  alternates: { canonical: `${SITE_URL}/our-story` },
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero label={story.label} lines={story.headline} />

      {/* origin */}
      <section className="relative overflow-hidden bg-ivory u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <Reveal as="p" className="u-label text-ember lg:col-span-3">
              {story.originLabel}
            </Reveal>
            <RevealText
              as="h2"
              lines={story.originHeadline.split("\n")}
              className="u-display text-[clamp(2rem,4.4vw,3.8rem)] text-teal-700 lg:col-span-9"
            />
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5 lg:col-start-1">
              <ImageReveal
                src="/images/story/chetnagram-collective.jpg"
                alt="The women of Divya Urjaa and Chetnagram Sansthan on the steps of their community building, fists raised"
                width={2400}
                height={1800}
                sizes="(max-width: 1024px) 92vw, 42vw"
                className="aspect-[4/5] w-full"
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {story.paragraphs.map((p, i) => (
                <Reveal
                  as="p"
                  key={i}
                  delay={i * 0.05}
                  className={`u-body text-ink/75 ${i > 0 ? "mt-5" : ""}`}
                >
                  {p}
                </Reveal>
              ))}

              <Reveal
                as="blockquote"
                delay={0.1}
                className="mt-12 border-t border-saffron pt-8"
              >
                <p className="u-label text-smoke">{story.blessing.label}</p>
                <p className="u-display-tight mt-5 text-[clamp(1.3rem,2.2vw,1.85rem)] text-teal-700">
                  &ldquo;{story.blessing.quote}&rdquo;
                </p>
                <footer className="u-label mt-5 text-smoke">
                  — {story.blessing.source}
                </footer>
              </Reveal>

              {/* the household altar the blessing refers to — Gurudev's
                  portrait sits above the burning havan kund */}
              <figure className="mt-10 max-w-[17rem]">
                <ImageReveal
                  src="/images/ritual/flame-altar.jpg"
                  alt="A tall flame burning in a copper havan kund at a home altar, beneath a portrait of Gurudev Pandit Shri Ram Sharma Acharya"
                  width={768}
                  height={1024}
                  sizes="(max-width: 640px) 80vw, 17rem"
                  className="aspect-[3/4] w-full"
                />
                <figcaption className="u-label mt-4 text-[10px] text-smoke">
                  The flame at the family altar
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* the film — full-bleed on this page */}
      <VideoStory />

      {/* the NGO + timeline */}
      <section className="relative overflow-hidden bg-sand u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <Reveal as="p" className="u-label text-ember lg:col-span-3">
              {story.ngo.label}
            </Reveal>
            <div className="lg:col-span-9">
              <RevealText
                as="h2"
                lines={[story.ngo.name]}
                className="u-display text-[clamp(2.2rem,5vw,4.2rem)] text-teal-700"
              />
              <Reveal as="p" delay={0.08} className="u-lede mt-6 max-w-2xl text-ink/70">
                {story.ngo.body}
              </Reveal>
            </div>
          </div>

          <ol className="mt-[clamp(3.5rem,7vw,6rem)] lg:ml-[25%]">
            {story.timeline.map((t, i) => (
              <Reveal
                as="li"
                key={`${t.when}-${i}`}
                delay={Math.min(i, 5) * 0.04}
                className="grid gap-x-8 gap-y-2 border-t border-teal-700/15 py-7 sm:grid-cols-[9rem_1fr]"
              >
                <span className="u-label text-ember">{t.when}</span>
                <p className="u-body text-ink/75">{t.what}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal
            as="blockquote"
            className="mt-[clamp(3rem,6vw,5rem)] border-l-2 border-saffron pl-7 lg:ml-[25%]"
          >
            <p className="u-display-tight text-[clamp(1.4rem,2.5vw,2rem)] text-teal-700">
              {impact.commitment}
            </p>
            <footer className="u-label mt-4 text-smoke">
              — {impact.commitmentSource}
            </footer>
          </Reveal>
        </div>
      </section>

      {/* onward */}
      <section className="relative overflow-hidden bg-teal-700 text-ivory u-rhythm">
        <div className="u-shell flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealText
            as="h2"
            lines={["The work continues", "in the village."]}
            className="u-display max-w-2xl text-[clamp(2rem,4.2vw,3.4rem)]"
          />
          <Reveal delay={0.15} className="shrink-0">
            <MagneticButton href="/impact" variant="outline" tone="light">
              See the impact
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
