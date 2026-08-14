"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { brandStatement } from "@/data/content";
import { EASE } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";
import RevealText from "@/components/ui/RevealText";
import ImageReveal from "@/components/ui/ImageReveal";

export default function BrandStatement() {
  const root = useRef<HTMLElement>(null);
  const slowY = useParallax(root, 9);
  const fastY = useParallax(root, -7);

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-ivory u-rhythm"
      aria-labelledby="brand-statement"
    >
      <div className="u-shell">
        {/* label + heading, offset from the grid rather than centred */}
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          <motion.p
            className="u-label text-ember lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE.urjaa }}
          >
            {brandStatement.label}
          </motion.p>

          <RevealText
            id="brand-statement"
            as="h2"
            lines={brandStatement.headline}
            className="u-display text-[clamp(2.4rem,5.4vw,4.9rem)] text-teal-700 lg:col-span-9"
          />
        </div>

        {/* asymmetric image pair — overlap, not a grid of cards */}
        <div className="relative mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-12 items-start gap-x-4">
          <motion.div
            style={{ y: slowY }}
            className="col-span-9 sm:col-span-7 lg:col-span-6"
          >
            <ImageReveal
              src="/images/process/gaushala.jpg"
              alt="An Urjaa Deepak artisan sitting beside cattle in the village gaushala"
              width={1600}
              height={1200}
              sizes="(max-width: 640px) 75vw, (max-width: 1024px) 58vw, 46vw"
              className="aspect-[4/5] w-full"
            />
            <p className="u-label mt-4 text-[10px] text-smoke">
              The gaushala · where every Deepak begins
            </p>
          </motion.div>

          <motion.div
            style={{ y: fastY }}
            className="relative z-10 col-span-8 col-start-5 -mt-[18%] sm:col-span-6 sm:col-start-7 lg:col-span-5 lg:col-start-8 lg:-mt-[22%]"
          >
            <ImageReveal
              src="/images/process/collective.jpg"
              alt="Eleven Urjaa Deepak artisans standing together with trays of freshly made deepaks"
              width={1600}
              height={1200}
              sizes="(max-width: 640px) 66vw, (max-width: 1024px) 50vw, 40vw"
              className="aspect-[5/4] w-full shadow-[0_30px_80px_-40px_rgba(17,67,80,0.55)]"
              delay={0.12}
            />
          </motion.div>
        </div>

        {/* body sits low-left, deliberately narrow */}
        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-2">
            {brandStatement.body.map((p, i) => (
              <motion.p
                key={i}
                className={`u-body text-ink/75 ${i > 0 ? "mt-5" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
                transition={{ duration: 1, ease: EASE.urjaa, delay: i * 0.08 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <motion.blockquote
              className="border-t border-saffron pt-6"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE.urjaa, delay: 0.15 }}
            >
              <p className="u-display-tight text-[clamp(1.35rem,2.1vw,1.85rem)] text-teal-700">
                {brandStatement.pull}
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
