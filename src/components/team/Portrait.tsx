"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";
import { initialsOf, type PortraitFrame } from "@/data/team";
import { BrokenRing } from "@/components/brand/Geometry";

type Props = {
  name: string;
  role: string;
  image: string | null;
  imageAlt: string | null;
  /** aspect + width classes for the frame — varied per composition */
  className?: string;
  frame?: PortraitFrame;
  sizes?: string;
  /** parallax drift in percent of the image's own height; 0 disables it */
  drift?: number;
  delay?: number;
  priority?: boolean;
  /** a thin gold rule offset behind the frame, for depth */
  ledge?: boolean;
  /** the section behind this portrait is deep teal — the initials plate has
   *  to lift off it rather than sink into it */
  onDark?: boolean;
  quality?: number;
};

const FRAME_CLASS: Record<PortraitFrame, string> = {
  plain: "rounded-[2px]",
  arch: "u-frame-arch",
  cut: "u-frame-cut",
};

/**
 * One portrait. Three things happen, all quietly:
 *
 *  · the frame opens upward as a clip reveal (never a fade — the crop stays
 *    crisp) while the photograph settles back from a slight overscale;
 *  · the photograph drifts against the scroll inside its frame. The inner
 *    wrapper is inset negatively by more than the drift, so no edge is ever
 *    exposed;
 *  · on a fine pointer the frame tilts a few degrees toward the cursor.
 *
 * With no `image`, the same frame renders a brand initials plate at the
 * identical aspect ratio. Swapping the real photograph in later moves
 * nothing on the page.
 */
export default function Portrait({
  name,
  role,
  image,
  imageAlt,
  className = "",
  frame = "plain",
  sizes = "(max-width: 1024px) 92vw, 44vw",
  drift = 5,
  delay = 0,
  priority = false,
  ledge = false,
  onDark = false,
  quality = 90,
}: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const tilt = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  /** stable per-person coin flip, so plate geometry alternates without a prop */
  const ringSide =
    name.split("").reduce((n, c) => n + c.charCodeAt(0), 0) % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${drift}%`, `${-drift}%`]);

  /* restrained Z-depth: ±3.2°, fine pointers only, and the CSS transition
     carries the settle so no rAF loop is needed */
  const onMove = (e: React.PointerEvent) => {
    const el = tilt.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 6.4}deg) rotateX(${-py * 6.4}deg) scale(1.012)`;
  };

  const reset = () => {
    if (tilt.current) tilt.current.style.transform = "";
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: "1400px" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {ledge && (
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 translate-x-[3%] translate-y-[3%] border border-gold/35 ${FRAME_CLASS[frame]}`}
        />
      )}

      <div
        ref={tilt}
        className="relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={ref}
          className={[
            "relative h-full w-full overflow-hidden bg-teal-800",
            FRAME_CLASS[frame],
            onDark && image ? "ring-1 ring-inset ring-ivory/12" : "",
          ].join(" ")}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={
              shown
                ? { clipPath: "inset(0% 0% 0% 0%)" }
                : { clipPath: "inset(100% 0% 0% 0%)" }
            }
            transition={{ duration: 1.35, ease: EASE.urjaa, delay }}
          >
            {image ? (
              <>
                <motion.div
                  className="absolute inset-[-8%]"
                  style={still ? undefined : { y }}
                  initial={{ scale: 1.1 }}
                  animate={shown ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 1.8, ease: EASE.urjaa, delay }}
                >
                  <Image
                    src={image}
                    alt={imageAlt ?? ""}
                    fill
                    sizes={sizes}
                    quality={quality}
                    priority={priority}
                    className="object-cover object-[50%_35%]"
                  />
                </motion.div>

                {/* colour grading, kept light — a warm cast and a teal footing
                    so portraits sit in the palette. No skin smoothing. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-saffron/[0.06] mix-blend-overlay"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent"
                />
              </>
            ) : (
              /* ── initials plate ─────────────────────────────────────
                 aria-hidden: the name and role sit beside it as real text,
                 so announcing them again is noise.

                 The emblem arc and the ember glow swap corners per person, so
                 a page of plates never looks mass-produced. Initials are sized
                 in `cqw` — against the frame, not the viewport — so they hold
                 their proportion whether the frame is a 320px square or an
                 800px feature. */
              <div
                aria-hidden
                className={[
                  "absolute inset-0 grid place-items-center bg-gradient-to-br",
                  onDark
                    ? "from-teal-600 via-teal-500 to-teal-700 ring-1 ring-inset ring-gold/25"
                    : "from-teal-800 via-teal-700 to-teal-900",
                ].join(" ")}
                style={{ containerType: "inline-size" }}
              >
                <BrokenRing
                  className={[
                    "pointer-events-none absolute w-[78%] text-gold/25",
                    ringSide
                      ? "-right-[20%] -top-[14%]"
                      : "-left-[20%] -bottom-[16%] rotate-[168deg]",
                  ].join(" ")}
                  strokeWidth={0.5}
                  gap={46}
                />
                <span
                  className={[
                    "pointer-events-none absolute h-[46%] w-[64%] rounded-full bg-saffron/12 blur-[70px]",
                    ringSide ? "-bottom-[22%] left-[-14%]" : "-top-[20%] right-[-12%]",
                  ].join(" ")}
                />

                <span className="relative flex flex-col items-center px-[8%] text-center">
                  <span
                    className="u-display leading-none text-gold-soft"
                    style={{ fontSize: "clamp(1.9rem, 17cqw, 5rem)" }}
                  >
                    {initialsOf(name)}
                  </span>
                  <span className="mt-[6%] h-px w-9 bg-gold/45" />
                  <span className="mt-[7%] max-w-[24ch] text-[10px] font-semibold uppercase leading-[1.8] tracking-[0.16em] text-ivory/55">
                    {role}
                  </span>
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
