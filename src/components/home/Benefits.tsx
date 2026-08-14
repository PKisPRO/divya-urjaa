"use client";

import { motion } from "motion/react";
import { benefits } from "@/data/content";
import { EASE } from "@/lib/motion";
import RevealText from "@/components/ui/RevealText";
import { FlameGlyph } from "@/components/brand/Geometry";

export default function Benefits() {
  return (
    <section
      className="relative overflow-hidden bg-sand u-rhythm"
      aria-labelledby="benefits-heading"
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
            {benefits.label}
          </motion.p>
          <RevealText
            id="benefits-heading"
            as="h2"
            lines={benefits.headline.split("\n")}
            className="u-display text-[clamp(2.2rem,5vw,4.4rem)] text-teal-700 lg:col-span-9"
          />
        </div>

        <motion.p
          className="u-lede mt-8 max-w-xl text-ink/70 lg:ml-[25%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE.urjaa, delay: 0.1 }}
        >
          {benefits.intro}
        </motion.p>

        {/* three columns divided by rules, not boxed into cards */}
        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-10 gap-y-14 md:grid-cols-3">
          {benefits.items.map((b, i) => (
            <motion.article
              key={b.title}
              className="relative md:border-l md:border-teal-700/15 md:pl-8 md:first:border-l-0 md:first:pl-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE.urjaa, delay: i * 0.1 }}
            >
              <FlameGlyph
                className={[
                  "h-7 w-7",
                  i === 0 ? "text-saffron" : i === 1 ? "text-teal-500" : "text-gold",
                ].join(" ")}
              />
              <p className="u-label mt-6 text-smoke">{b.kind}</p>
              <h3 className="u-display-tight mt-3 text-[clamp(1.5rem,2.4vw,2rem)] text-teal-700">
                {b.title}
              </h3>
              <p className="u-body mt-4 text-ink/70">{b.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
