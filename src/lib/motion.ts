/** Shared motion vocabulary. Movement here is meant to read as flame, breath
 *  and drifting light — long tails, soft entries, nothing mechanical. */

export const EASE = {
  /** primary reveal — fast out of the gate, very long settle */
  urjaa: [0.16, 1, 0.3, 1] as const,
  /** symmetrical, used for scene/state changes */
  flame: [0.65, 0, 0.35, 1] as const,
  /** gentle drift */
  drift: [0.33, 0.9, 0.28, 1] as const,
};

export const CSS_EASE = {
  urjaa: "cubic-bezier(0.16, 1, 0.3, 1)",
  flame: "cubic-bezier(0.65, 0, 0.35, 1)",
};

export const DUR = {
  reveal: 1.05,
  slow: 1.5,
  quick: 0.5,
};

/** Line-mask reveal used by RevealText and heading entrances. */
export const lineReveal = {
  hidden: { y: "110%" },
  show: (i = 0) => ({
    y: "0%",
    transition: { duration: DUR.reveal, ease: EASE.urjaa, delay: 0.06 * i },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE.urjaa, delay: 0.07 * i },
  }),
};

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
