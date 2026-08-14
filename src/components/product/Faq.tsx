"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faq } from "@/data/content";
import { EASE } from "@/lib/motion";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-t border-teal-700/15 last:border-b">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="group flex w-full items-center justify-between gap-8 py-7 text-left"
              >
                <span className="u-display-tight text-[clamp(1.15rem,1.9vw,1.5rem)] text-teal-700">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="relative grid h-8 w-8 shrink-0 place-items-center"
                >
                  <span className="absolute h-px w-4 bg-saffron" />
                  <span
                    className={`absolute h-4 w-px bg-saffron transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE.urjaa }}
                  className="overflow-hidden"
                >
                  <p className="u-body max-w-2xl pb-8 pr-12 text-ink/70">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
