"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE } from "@/lib/motion";
import { teamPage } from "@/data/team";
import { BrokenRing, RayBurst } from "@/components/brand/Geometry";

/**
 * Ivory ground, one deep-teal field bleeding in from the right, and the
 * emblem's long flowing curve drawing itself across the seam between them.
 *
 * Deliberately not the shared PageHero: every other interior page opens on a
 * full teal plate, and this one is about people on ivory. The header reads
 * the absence of `data-hero-dark` and goes solid immediately, so the wordmark
 * is never ivory-on-ivory.
 */
export default function TeamHero() {
  const root = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);

  const { eyebrow, lines, support, contributions } = teamPage.hero;

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-ivory"
      aria-labelledby="team-heading"
    >
      {/* the teal field — a soft-shouldered plate, not a rectangle */}
      <motion.div
        aria-hidden
        style={still ? undefined : { y: fieldY }}
        className="pointer-events-none absolute -right-[18%] -top-[14%] -z-10 hidden h-[124%] w-[52%] lg:block"
      >
        <motion.div
          className="relative h-full w-full bg-teal-900"
          style={{ borderRadius: "38% 0 0 44% / 46% 0 0 40%" }}
          initial={still ? false : { clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.6, ease: EASE.urjaa, delay: 0.1 }}
        >
          <BrokenRing
            className="absolute -right-[26%] top-[6%] w-[86%] text-gold/20"
            strokeWidth={0.4}
            gap={54}
          />
          <RayBurst className="absolute bottom-[14%] left-[-16%] w-[36%] text-saffron/25" rays={20} />
          <span className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-saffron/10 to-transparent" />
        </motion.div>
      </motion.div>

      {/* warm wash, mobile and desktop alike */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[14%] top-[12%] -z-10 h-[46vh] w-[46vh] rounded-full bg-gold/12 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[22%] bottom-[-18%] -z-10 h-[40vh] w-[40vh] rounded-full bg-saffron/10 blur-[110px] lg:hidden"
      />

      <motion.div
        style={still ? undefined : { y: copyY }}
        className="u-shell relative pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(9rem,16vh,12rem)]"
      >
        <div className="max-w-[52rem]">
          <motion.p
            className="u-label text-ember"
            initial={still ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE.urjaa, delay: 0.15 }}
          >
            {eyebrow}
          </motion.p>

          <h1
            id="team-heading"
            className="u-display mt-6 text-[clamp(2.6rem,7vw,6rem)] text-teal-700"
          >
            {lines.map((line, i) => (
              <span key={line} className="u-line-mask">
                <motion.span
                  className="u-line-inner"
                  initial={still ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.3,
                    ease: EASE.urjaa,
                    delay: 0.28 + i * 0.09,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="u-lede mt-8 max-w-xl text-ink/70"
            initial={still ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: EASE.urjaa, delay: 0.55 }}
          >
            {support}
          </motion.p>
        </div>

        {/* the contributions, as a quiet index rather than a claim */}
        <ul className="mt-[clamp(3rem,7vw,5.5rem)] flex flex-wrap gap-x-8 gap-y-4 border-t border-teal-700/12 pt-7 lg:max-w-[56%]">
          {contributions.map((c, i) => (
            <motion.li
              key={c}
              className="u-label text-teal-700/55"
              initial={still ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: EASE.urjaa,
                delay: 0.8 + i * 0.055,
              }}
            >
              {c}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
