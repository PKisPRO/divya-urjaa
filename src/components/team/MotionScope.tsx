"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** The stylesheet neutralises CSS transitions under `prefers-reduced-motion`,
 *  but Framer's animations are JS-driven and never saw that rule. This makes
 *  every motion component inside honour the OS setting — transforms, layout
 *  and the line-mask reveals all resolve instantly. Scoped to this page so no
 *  other route's behaviour changes. */
export default function MotionScope({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
