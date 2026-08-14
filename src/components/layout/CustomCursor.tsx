"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "default" | "view" | "explore" | "meet" | "cta";

const LABEL: Record<Mode, string> = {
  default: "",
  view: "View",
  explore: "Explore",
  meet: "Meet",
  cta: "",
};

/** Desktop-only pointer. Reads `data-cursor` from whatever is hovered.
 *  Never mounts on touch devices or under reduced-motion. */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [active, setActive] = useState(false);
  const [woken, setWoken] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setActive(true);
    document.documentElement.dataset.cursor = "on";

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      setWoken(true);
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const next = (el?.getAttribute("data-cursor") as Mode) || "default";
      setMode((m) => (m === next ? m : next));
    };

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  if (!active) return null;

  const labelled = mode !== "default" && mode !== "cta";

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[90] hidden transition-opacity duration-300 md:block ${
        woken ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={ring}
        className="fixed left-0 top-0 grid place-items-center rounded-full border border-saffron/70 transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: labelled ? 84 : mode === "cta" ? 52 : 34,
          height: labelled ? 84 : mode === "cta" ? 52 : 34,
          backgroundColor: labelled ? "rgba(230,146,54,0.92)" : "transparent",
          borderColor: labelled ? "rgba(230,146,54,0)" : undefined,
        }}
      >
        <span
          className="u-label text-[9px] text-ivory transition-opacity duration-300"
          style={{ opacity: labelled ? 1 : 0, letterSpacing: "0.2em" }}
        >
          {LABEL[mode]}
        </span>
      </div>
      <div
        ref={dot}
        className="fixed left-0 top-0 h-[5px] w-[5px] rounded-full bg-saffron transition-opacity duration-300"
        style={{ opacity: labelled ? 0 : 1 }}
      />
    </div>
  );
}
