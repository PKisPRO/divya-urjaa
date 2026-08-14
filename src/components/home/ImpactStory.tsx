"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { impact } from "@/data/content";
import { EASE } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";
import Counter from "@/components/ui/Counter";
import ImageReveal from "@/components/ui/ImageReveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ImpactStory() {
  const root = useRef<HTMLElement>(null);
  const y = useParallax(root, 8);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-sand u-rhythm"
      aria-labelledby="impact-heading"
    >
      <div className="u-shell">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <motion.p
            className="u-label text-ember lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE.urjaa }}
          >
            {impact.label}
          </motion.p>
          <RevealText
            id="impact-heading"
            as="h2"
            lines={impact.headline}
            className="u-display text-[clamp(2.4rem,5.4vw,4.9rem)] text-teal-700 lg:col-span-9"
          />
        </div>

        <motion.p
          className="u-lede mt-8 max-w-lg text-ink/70 lg:ml-[25%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE.urjaa, delay: 0.1 }}
        >
          {impact.intro}
        </motion.p>

        {/* oversized editorial statistics */}
        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-8 gap-y-12 sm:grid-cols-3">
          {impact.headlineStats.map((s, i) => (
            <motion.div
              key={s.label}
              className="border-t border-teal-700/25 pt-6"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE.urjaa, delay: i * 0.08 }}
            >
              <p className="u-display text-[clamp(3.4rem,8vw,6rem)] leading-[0.85] text-teal-700">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="u-label mt-5 text-smoke">{s.label}</p>
              {"note" in s && s.note && (
                <p className="mt-2 text-[12px] text-smoke/70">{s.note}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* the collective + the commitment */}
        <div className="mt-[clamp(4rem,8vw,7rem)] grid items-end gap-x-12 gap-y-10 lg:grid-cols-12">
          <motion.div style={{ y }} className="lg:col-span-7">
            <ImageReveal
              src="/images/story/chetnagram-collective.jpg"
              alt="The women of Divya Urjaa and Chetnagram Sansthan standing together with raised fists on the steps of their community building"
              width={2400}
              height={1800}
              sizes="(max-width: 1024px) 92vw, 56vw"
              className="aspect-[4/3] w-full"
            />
          </motion.div>

          <div className="lg:col-span-5">
            <motion.blockquote
              className="border-l-2 border-saffron pl-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE.urjaa }}
            >
              <p className="u-display-tight text-[clamp(1.5rem,2.6vw,2.15rem)] text-teal-700">
                {impact.commitment}
              </p>
              <footer className="u-label mt-5 text-smoke">
                — {impact.commitmentSource}
              </footer>
            </motion.blockquote>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE.urjaa, delay: 0.12 }}
            >
              <MagneticButton href="/impact" variant="outline" tone="dark">
                See the full impact
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
