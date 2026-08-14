"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE } from "@/lib/motion";

/** A teal curtain retracts upward on arrival, with the emblem holding for a
 *  beat behind it. Navigation is never blocked — the curtain plays over the
 *  already-rendered page — and it unmounts as soon as it has swept clear, so
 *  nothing is left overlaying the document. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const [curtain, setCurtain] = useState<string | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCurtain(pathname);
    const id = window.setTimeout(() => setCurtain(null), 1150);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE.urjaa, delay: 0.2 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {curtain && (
          <motion.div
            key={curtain}
            className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
            initial={{ y: 0 }}
            animate={{ y: "-105%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE.urjaa, delay: 0.1 }}
          >
            <div className="relative h-full w-full bg-teal-700">
              <motion.div
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 1.12 }}
                transition={{ duration: 0.45, ease: EASE.urjaa }}
              >
                <Image
                  src="/images/brand/emblem.png"
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </motion.div>

              {/* curved trailing edge, echoing the emblem's arc */}
              <svg
                className="absolute left-0 top-full h-[12vh] w-full text-teal-700"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M0 0 Q 50 12 100 0 Z" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
