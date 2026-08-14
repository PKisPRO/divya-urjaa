"use client";

import { useEffect, useRef, useState } from "react";

/* A shared scroll subscription for elements still waiting to be revealed.
   IntersectionObserver alone is not enough: if the viewport jumps past an
   element in a single frame — scroll restoration on reload, an anchor link,
   the End key — the observer only ever sees the element as "not intersecting"
   and the content stays hidden forever. So we also test position directly,
   and treat "already scrolled past" as revealed. */

type Pending = () => boolean;
const pending = new Set<Pending>();
let listening = false;
let frame = 0;

function flush() {
  frame = 0;
  for (const check of Array.from(pending)) {
    if (check()) pending.delete(check);
  }
  if (pending.size === 0) stop();
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(flush);
}

function start() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
}

/**
 * @param amount how far into the viewport the element's top must travel,
 *               as a fraction of viewport height (0.88 ≈ "just entering").
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  amount = 0.88,
) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const check = () => {
      const r = el.getBoundingClientRect();
      // in view, or already above it
      if (r.top < window.innerHeight * amount) {
        setShown(true);
        return true;
      }
      return false;
    };

    if (check()) return;

    pending.add(check);
    start();
    return () => {
      pending.delete(check);
      if (pending.size === 0) stop();
    };
  }, [amount]);

  return { ref, shown };
}
