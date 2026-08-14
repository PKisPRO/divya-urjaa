"use client";

import { useScroll, useTransform, type MotionValue } from "motion/react";
import type { RefObject } from "react";

/** Vertical drift tied to a section's progress through the viewport.
 *  `distance` is in percent of the element's own height. */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance = 12,
): MotionValue<string> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], [`${distance}%`, `${-distance}%`]);
}
