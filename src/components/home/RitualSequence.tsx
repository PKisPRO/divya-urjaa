"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ritual } from "@/data/content";
import { EASE } from "@/lib/motion";

const ARCH = "50% 50% 3px 3px / 28.1% 28.1% 3px 3px";
const POSTER = "/images/ritual/ritual-poster.jpg";

/** The scene starts cold and unlit. Each step brings the flame further up
 *  until, at "Breathe", the whole frame is burning. The change is carried by
 *  brightness, saturation and bloom over the real footage — no fake fire. */
export default function RitualSequence() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start 0.85", "end 0.9"],
  });
  const lit = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.5,
  });

  const dim = useTransform(lit, [0, 0.75], [0.86, 0]);
  const sat = useTransform(lit, [0, 0.8], [0.25, 1.12]);
  const bright = useTransform(lit, [0, 0.8], [0.55, 1.06]);
  const filter = useTransform(
    [sat, bright],
    ([s, b]: number[]) => `saturate(${s}) brightness(${b})`,
  );
  const bloom = useTransform(lit, [0.25, 1], [0, 0.75]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const v = video.current;
    if (!v) return;
    const small = window.matchMedia("(max-width: 860px)").matches;
    v.src = small ? "/videos/ritual-720.mp4" : "/videos/ritual-1080.mp4";
    v.load();
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="u-grain relative overflow-hidden bg-teal-900 text-ivory u-rhythm"
      aria-labelledby="ritual-heading"
      style={{
        // @ts-expect-error custom property
        "--grain-url":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      }}
    >
      <motion.div
        style={{ opacity: bloom }}
        className="pointer-events-none absolute left-[22%] top-1/2 h-[75vh] w-[75vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/22 blur-[130px]"
      />

      <div className="u-shell relative">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
          {/* the scene */}
          <div className="lg:col-span-5 lg:sticky lg:top-[14vh] lg:self-start">
            <motion.figure
              className="relative mx-auto"
              style={{
                width: "min(76vw, 340px)",
                aspectRatio: "9 / 16",
              }}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 1.4, ease: EASE.urjaa }}
            >
              <div
                className="relative h-full w-full overflow-hidden bg-teal-800 ring-1 ring-inset ring-gold/20"
                style={{ borderRadius: ARCH }}
              >
                <motion.div style={{ filter }} className="absolute inset-0">
                  {reduced ? (
                    <Image
                      src={POSTER}
                      alt="A hand adding ghee to a burning Urjaa Deepak"
                      fill
                      sizes="(max-width: 1024px) 76vw, 340px"
                      className="object-cover"
                    />
                  ) : (
                    <video
                      ref={video}
                      className="h-full w-full object-cover"
                      poster={POSTER}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label="A hand adding ghee to a burning Urjaa Deepak"
                    />
                  )}
                </motion.div>
                <motion.div
                  style={{ opacity: dim }}
                  className="pointer-events-none absolute inset-0 bg-teal-900"
                />
              </div>
              <figcaption className="u-label mt-5 text-center text-[10px] text-ivory/40">
                Step {ritual.steps[active].n} · {ritual.steps[active].title}
              </figcaption>
            </motion.figure>
          </div>

          {/* the steps */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="u-label text-saffron">{ritual.label}</p>
            <h2
              id="ritual-heading"
              className="u-display mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]"
            >
              {ritual.headline}
            </h2>
            <p className="u-body mt-5 max-w-sm text-ivory/55">{ritual.intro}</p>

            <ol className="mt-14">
              {ritual.steps.map((s, i) => (
                <motion.li
                  key={s.n}
                  className="group border-t border-ivory/12 py-8"
                  onViewportEnter={() => setActive(i)}
                  viewport={{ margin: "-48% 0px -48% 0px" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
                    transition={{ duration: 0.95, ease: EASE.urjaa }}
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="u-label w-8 shrink-0 text-gold/70">
                        {s.n}
                      </span>
                      <div>
                        <h3 className="u-display-tight text-[clamp(1.4rem,2.4vw,1.95rem)] text-ivory">
                          {s.title}
                        </h3>
                        <p className="u-body mt-2.5 max-w-md text-ivory/60">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
