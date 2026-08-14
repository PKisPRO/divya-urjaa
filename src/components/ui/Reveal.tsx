"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "p" | "li" | "article" | "blockquote" | "figure";
  amount?: number;
};

/** Standard fade-and-rise. Uses the resilient reveal hook rather than
 *  `whileInView`, so content is never left stranded off-screen. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 1,
  as = "div",
  amount,
}: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>(amount);
  const M = motion[as] as typeof motion.div;

  return (
    <M
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, ease: EASE.urjaa, delay }}
    >
      {children}
    </M>
  );
}
