"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/data/content";
import { EASE } from "@/lib/motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { BrokenRing } from "@/components/brand/Geometry";

export type HeroMode = "video" | "image";

type Props = {
  /** Swap the stage between the flame film and a still photograph.
   *  Nothing else in this component depends on which one is showing. */
  mode?: HeroMode;
  /** used when mode === "image" */
  imageSrc?: string;
  imageAlt?: string;
};

const POSTER = "/images/hero/hero-flame-poster.jpg";
const MEDIA_ALT =
  "An Urjaa Deepak burning on a copper plate at a home altar in Rajasthan";

/**
 * The footage is vertical 9:16. Rather than stretch or letterbox it:
 *
 *  · desktop — it becomes an arched portal in the right-hand column, at its
 *    native ratio so nothing is cropped, while a heavily blurred copy of the
 *    same film washes the rest of the viewport in the room's own light. The
 *    wide screen is filled with real brand light instead of black bars.
 *  · mobile  — it goes full-bleed, which is close to its natural framing
 *    (9:16 into a ~9:19.5 viewport crops only the outer edges, never the
 *    centred flame), with the type sitting over a scrim.
 */
export default function Hero({
  mode = "video",
  imageSrc = "/images/hero/hero-shaping.jpg",
  imageAlt = "Three women shaping Urjaa Deepaks by hand in a Rajasthan village",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const ambient = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* pick the rendition, and stop decoding once the hero leaves the screen */
  useEffect(() => {
    if (mode !== "video" || reduced) return;
    const v = video.current;
    const a = ambient.current;
    if (!v) return;

    const small = window.matchMedia("(max-width: 860px)").matches;
    v.src = small ? "/videos/hero-720.mp4" : "/videos/hero-1080.mp4";
    v.load();

    const play = () => {
      v.play().catch(() => {});
      a?.play().catch(() => {});
    };
    play();

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) play();
        else {
          v.pause();
          a?.pause();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [mode, reduced]);

  const showFilm = mode === "video" && !reduced;
  const still = mode === "video" ? POSTER : imageSrc;
  const stillAlt = mode === "video" ? MEDIA_ALT : imageAlt;

  return (
    <section
      ref={root}
      className="relative isolate min-h-[100svh] overflow-hidden bg-teal-900 text-ivory"
      aria-label="Divya Urjaa"
      data-hero-dark
    >
      {/* ── ambient light field (desktop) ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        {showFilm ? (
          <video
            ref={ambient}
            className="h-full w-full scale-[1.35] object-cover opacity-[0.42] blur-[70px] saturate-[1.15]"
            src="/videos/hero-ambient.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden
            tabIndex={-1}
          />
        ) : (
          <Image
            src={still}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-[1.35] object-cover opacity-[0.42] blur-[70px] saturate-[1.15]"
          />
        )}
        <div className="absolute inset-0 bg-teal-900/45" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_72%_45%,transparent_0%,rgba(10,42,51,0.55)_60%,rgba(10,42,51,0.9)_100%)]" />
      </div>

      {/* slow arc behind the stage */}
      <motion.div
        className="pointer-events-none absolute right-[6%] top-1/2 -z-[5] hidden w-[52vw] -translate-y-1/2 lg:block"
        initial={{ rotate: -8, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE.urjaa, delay: 0.4 }}
      >
        <BrokenRing className="w-full text-gold/20" strokeWidth={0.35} gap={54} />
      </motion.div>

      <div className="u-shell relative flex min-h-[100svh] flex-col justify-end pb-[clamp(2.75rem,7vh,4.5rem)] pt-24 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-0 lg:pt-0">
        {/* ── stage ────────────────────────────────────────────────── */}
        <motion.figure
          style={{ y: stageY }}
          className="absolute inset-0 z-0 m-0 flex items-start justify-center lg:relative lg:inset-auto lg:z-auto lg:order-2 lg:col-span-6 lg:col-start-7 lg:items-center lg:justify-end xl:col-span-5 xl:col-start-8"
        >
          <motion.div
            className="relative h-full w-full lg:h-auto lg:w-auto"
            initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE.urjaa, delay: 0.25 }}
          >
            {/* the warm bloom the flame throws onto the page (desktop) */}
            <div
              className="pointer-events-none absolute -inset-x-[45%] -inset-y-[18%] -z-10 hidden rounded-full bg-[radial-gradient(closest-side,rgba(230,146,54,0.34),rgba(230,146,54,0.09)_55%,transparent_78%)] blur-2xl motion-safe:animate-[flameBloom_5.5s_ease-in-out_infinite] lg:block"
              aria-hidden
            />

            <div
              className="u-arch relative h-full w-full overflow-hidden bg-teal-800 lg:h-[clamp(340px,66svh,650px)] lg:w-auto lg:max-w-[80vw] lg:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.75)] lg:ring-1 lg:ring-inset lg:ring-gold/25"
              style={{ aspectRatio: "9 / 16" }}
            >
              {showFilm ? (
                <video
                  ref={video}
                  className="absolute inset-0 h-full w-full object-cover"
                  poster={POSTER}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  aria-label={MEDIA_ALT}
                  onCanPlay={() => setReady(true)}
                />
              ) : (
                <Image
                  src={still}
                  alt={stillAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
              )}

              {/* poster held underneath until the first frame decodes */}
              {showFilm && !ready && (
                <Image
                  src={POSTER}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-900/45 via-transparent to-teal-900/20" />
            </div>
          </motion.div>

          <figcaption className="sr-only">{MEDIA_ALT}</figcaption>
        </motion.figure>

        {/* mobile scrim so the type reads over the film */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-teal-900 via-teal-900/55 to-teal-900/5 lg:hidden"
        />

        {/* ── copy ─────────────────────────────────────────────────── */}
        <motion.div
          style={{ y: copyY }}
          className="relative z-10 lg:order-1 lg:col-span-6 lg:py-32"
        >
          <motion.p
            className="u-label text-gold-soft/90"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE.urjaa, delay: 0.5 }}
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="u-display mt-4 text-[clamp(2.75rem,8.4vw,7.4rem)] lg:mt-7">
            {hero.headline.map((line, i) => (
              <span key={line} className="u-line-mask">
                <motion.span
                  className="u-line-inner"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.35,
                    ease: EASE.urjaa,
                    delay: 0.62 + i * 0.1,
                  }}
                >
                  {i === 1 ? (
                    <>
                      shaped by{" "}
                      <span className="italic text-gold-soft">hand.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="u-lede mt-5 max-w-md text-ivory/70 lg:mt-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE.urjaa, delay: 0.95 }}
          >
            {hero.support}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 lg:mt-10"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE.urjaa, delay: 1.08 }}
          >
            <MagneticButton
              href={hero.ctaPrimary.href}
              variant="solid"
              tone="light"
            >
              {hero.ctaPrimary.label}
            </MagneticButton>
            <MagneticButton
              href={hero.ctaSecondary.href}
              variant="outline"
              tone="light"
            >
              {hero.ctaSecondary.label}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-7 left-[var(--shell)] z-10 hidden items-center gap-3 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <span className="u-label text-[10px] text-ivory/45">
          {hero.scrollHint}
        </span>
        <span className="relative block h-px w-16 overflow-hidden bg-ivory/20">
          <span className="absolute inset-y-0 left-0 w-1/3 bg-saffron motion-safe:animate-[scrollCue_2.6s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
        </span>
      </motion.div>

      {/* darkens as the next section arrives */}
      <motion.div
        style={{ opacity: veil }}
        className="pointer-events-none absolute inset-0 z-20 bg-teal-900"
        aria-hidden
      />
    </section>
  );
}
