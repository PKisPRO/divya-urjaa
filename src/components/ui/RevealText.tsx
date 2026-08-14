"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";
import type { ElementType, ReactNode } from "react";

type Props = {
  /** one entry per visual line — line breaks are authored, not automatic */
  lines: readonly string[] | readonly ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  id?: string;
};

/** Each line rides up out of its own overflow mask. The mask is the effect —
 *  no fading, so the type stays crisp at large sizes. */
export default function RevealText({
  lines,
  as = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  id,
}: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  // `as` is intentionally loose (h1…h4, p, div); the cast keeps the union
  // from exploding while still rendering the requested tag.
  const Tag = as as "div";

  return (
    <Tag className={className} id={id} ref={ref}>
      {lines.map((line, i) => (
        <span key={i} className="u-line-mask">
          <motion.span
            className={`u-line-inner ${lineClassName}`}
            initial={{ y: "108%" }}
            animate={shown ? { y: "0%" } : { y: "108%" }}
            transition={{
              duration: 1.1,
              ease: EASE.urjaa,
              delay: delay + i * 0.075,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
