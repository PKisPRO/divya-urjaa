"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";
import { BrokenRing } from "@/components/brand/Geometry";

export default function PageHero({
  label,
  lines,
  intro,
  children,
}: {
  label: string;
  lines: readonly string[];
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section
      data-hero-dark
      className="relative overflow-hidden bg-teal-900 text-ivory"
    >
      <BrokenRing
        className="pointer-events-none absolute -right-[22%] -top-[38%] w-[72vw] text-gold/12"
        strokeWidth={0.4}
        gap={52}
      />
      <div className="pointer-events-none absolute -left-[10%] bottom-[-30%] h-[52vh] w-[52vh] rounded-full bg-saffron/10 blur-[120px]" />

      <div className="u-shell relative pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(9rem,16vh,12rem)]">
        <motion.p
          className="u-label text-saffron"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE.urjaa, delay: 0.15 }}
        >
          {label}
        </motion.p>

        <h1 className="u-display mt-6 max-w-5xl text-[clamp(2.6rem,7vw,6rem)]">
          {lines.map((line, i) => (
            <span key={line} className="u-line-mask">
              <motion.span
                className="u-line-inner"
                initial={{ y: "110%" }}
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

        {intro && (
          <motion.p
            className="u-lede mt-8 max-w-xl text-ivory/65"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: EASE.urjaa, delay: 0.55 }}
          >
            {intro}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  );
}

