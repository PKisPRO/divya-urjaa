"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

/** The emblem's arc, flattened into a rule and drawn on entry. Used where a
 *  section changes ground colour, so the seam reads as one continuous line of
 *  energy rather than a border. */
export default function ArcRule({
  className = "",
  tone = "dark",
  flip = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  flip?: boolean;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.95);

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1000 40"
        fill="none"
        preserveAspectRatio="none"
        className={[
          "h-[clamp(1.75rem,4vw,2.75rem)] w-full",
          tone === "dark" ? "text-teal-700/25" : "text-gold/30",
          flip ? "rotate-180" : "",
        ].join(" ")}
      >
        <motion.path
          d="M0 36 C 240 36, 300 4, 500 4 C 700 4, 760 36, 1000 36"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={shown ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 1.8, ease: EASE.urjaa },
            opacity: { duration: 0.4 },
          }}
        />
      </svg>
    </div>
  );
}
