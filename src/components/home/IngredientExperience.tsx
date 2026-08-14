"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ingredients } from "@/data/content";
import { EASE } from "@/lib/motion";
import { RayBurst } from "@/components/brand/Geometry";

export default function IngredientExperience() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const spin = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const drift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-teal-700 text-ivory u-rhythm"
      aria-labelledby="ingredients"
    >
      <div className="u-shell">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <motion.p
            className="u-label text-saffron lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE.urjaa }}
          >
            {ingredients.label}
          </motion.p>
          <motion.h2
            id="ingredients"
            className="u-display max-w-[22ch] text-[clamp(1.9rem,3.6vw,3.1rem)] lg:col-span-8"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
            transition={{ duration: 1.05, ease: EASE.urjaa, delay: 0.08 }}
          >
            {ingredients.lead}
          </motion.h2>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid items-start gap-x-14 gap-y-12 lg:grid-cols-12">
          {/* the deepak, held still while the recipe scrolls past */}
          <div className="lg:col-span-6 lg:sticky lg:top-[18vh]">
            <motion.div style={{ y: drift }} className="relative mx-auto w-full max-w-[520px]">
              {/* a corona, hugging the rim — the emblem's sunburst, quieted */}
              <motion.div style={{ rotate: spin }} className="absolute inset-0 -m-[7%]">
                <RayBurst
                  className="h-full w-full text-gold/45"
                  rays={24}
                  inner={44}
                  outer={50}
                />
              </motion.div>

              <div className="relative aspect-square overflow-hidden rounded-full ring-1 ring-inset ring-gold/25">
                <Image
                  src="/images/product/deepaks-flatlay.jpg"
                  alt="Handmade Urjaa Deepaks with cotton wicks, photographed from above"
                  fill
                  sizes="(max-width: 1024px) 80vw, 44vw"
                  quality={90}
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,transparent_58%,rgba(17,67,80,0.45))]" />
              </div>

              {/* the active ingredient names itself over the image */}
              <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
                <motion.span
                  key={active}
                  className="u-label rounded-full bg-ivory px-5 py-2.5 text-[10px] text-teal-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE.urjaa }}
                >
                  {ingredients.items[active].name}
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* the recipe */}
          <ol className="lg:col-span-6 lg:col-start-7">
            {ingredients.items.map((item, i) => (
              <motion.li
                key={item.name}
                className="border-t border-ivory/15 py-9 first:border-t-0 first:pt-0"
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE.urjaa }}
              >
                <motion.div
                  initial={{ opacity: 0.4 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-40% 0px -40% 0px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="u-label text-saffron">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="u-display-tight text-[clamp(1.6rem,2.9vw,2.4rem)] text-ivory">
                      {item.name}
                    </h3>
                  </div>
                  <p className="u-body mt-4 max-w-md pl-[calc(2ch+1.25rem)] text-ivory/65">
                    {item.body}
                  </p>
                </motion.div>
              </motion.li>
            ))}

            <motion.div
              className="border-t border-ivory/15 pt-9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE.urjaa }}
            >
              <p className="u-label text-gold-soft/70">Also in the blend</p>
              <p className="u-display-tight mt-3 text-[clamp(1.35rem,2.2vw,1.8rem)] text-gold-soft">
                {ingredients.also}
              </p>
              <p className="u-body mt-5 max-w-md text-ivory/60">
                {ingredients.closing}
              </p>
            </motion.div>
          </ol>
        </div>
      </div>
    </section>
  );
}
