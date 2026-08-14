"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ENERGY_CURVE } from "@/components/brand/Geometry";

/** Urjaa, drawn. One thin trail derived from the emblem's flowing curve —
 *  the same line that reads as hair, fabric and rising smoke. It draws itself
 *  as you travel through the light half of the page, dips behind the imagery,
 *  and is gone before the flame takes over. Purely decorative. */
export default function EnergyPath({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start 0.9", "end 0.35"],
  });
  const draw = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });
  const opacity = useTransform(draw, [0, 0.04, 0.88, 1], [0, 1, 1, 0]);

  return (
    <div ref={wrap} className="relative">
      <svg
        className="pointer-events-none absolute left-0 top-0 -z-0 hidden h-full w-full md:block"
        viewBox="0 0 100 920"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="urjaaTrail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e69236" stopOpacity="0" />
            <stop offset="12%" stopColor="#e69236" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#dba655" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f6de9b" stopOpacity="0.15" />
          </linearGradient>
          <filter id="urjaaGlow" x="-60%" y="-10%" width="220%" height="120%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={ENERGY_CURVE}
          fill="none"
          stroke="url(#urjaaTrail)"
          strokeWidth="0.7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#urjaaGlow)"
          style={{ pathLength: draw, opacity }}
        />
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
