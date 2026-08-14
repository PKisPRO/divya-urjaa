"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { finale } from "@/data/content";
import { EASE } from "@/lib/motion";
import MagneticButton from "@/components/ui/MagneticButton";
import RevealText from "@/components/ui/RevealText";
import { BrokenRing } from "@/components/brand/Geometry";

const FlameCanvas = dynamic(() => import("@/components/webgl/FlameCanvas"), {
  ssr: false,
});

export default function FinalFlame() {
  const root = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end end"],
  });
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-25, 12]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[105svh] items-center overflow-hidden bg-teal-900 text-ivory"
      aria-labelledby="finale-heading"
    >
      {/* the energy resolves into a flame — anchored to the floor of the
          section so its tip tapers into the type rather than being clipped */}
      <div className="pointer-events-none absolute bottom-[2%] left-1/2 h-[60%] w-[min(88vw,520px)] -translate-x-1/2">
        <FlameCanvas intensity={1} />
      </div>

      <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-[46vh] w-[46vh] -translate-x-1/2 rounded-full bg-saffron/14 blur-[120px]" />

      {/* the emblem, held quietly behind the flame */}
      <motion.div
        style={{ rotate: ringRotate, scale: ringScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(78vw,620px)] -translate-x-1/2 -translate-y-1/2"
      >
        <BrokenRing className="w-full text-gold/18" strokeWidth={0.35} gap={46} />
      </motion.div>

      <div className="u-shell relative z-10 flex w-full flex-col items-center pb-[clamp(14rem,34vh,22rem)] pt-[clamp(4rem,10vh,7rem)] text-center">
        <motion.div
          className="relative h-16 w-16 opacity-90 md:h-20 md:w-20"
          initial={{ opacity: 0, scale: 0.86 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
          transition={{ duration: 1.3, ease: EASE.urjaa }}
        >
          <Image
            src="/images/brand/emblem.png"
            alt=""
            fill
            sizes="80px"
            className="object-contain"
          />
        </motion.div>

        <RevealText
          id="finale-heading"
          as="h2"
          delay={0.12}
          className="u-display mt-10 text-[clamp(2.6rem,7.5vw,6.2rem)]"
          lines={[
            finale.headline.split("\n")[0],
            <span key="l2" className="italic text-gold-soft">
              {finale.headline.split("\n")[1]}
            </span>,
          ]}
        />

        <motion.p
          className="u-lede mt-8 max-w-md text-ivory/60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
          transition={{ duration: 1.1, ease: EASE.urjaa, delay: 0.28 }}
        >
          {finale.body}
        </motion.p>

        <motion.div
          className="mt-11"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
          transition={{ duration: 1.1, ease: EASE.urjaa, delay: 0.4 }}
        >
          <MagneticButton href="/urjaa-deepak" variant="solid" tone="light">
            {finale.cta}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
