"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/lib/useReveal";

type Props = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

/** Counts once on entry, and — unlike the old site, which shipped `0+` into
 *  the server HTML and only filled it in if the count-up happened to fire —
 *  always resolves to the real figure. */
export default function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}: Props) {
  const { ref, shown } = useReveal<HTMLSpanElement>(0.95);
  const [value, setValue] = useState(to);

  // only drop to zero once we know we can animate back up
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
  }, []);

  useEffect(() => {
    if (!shown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const ms = duration * 1000;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
