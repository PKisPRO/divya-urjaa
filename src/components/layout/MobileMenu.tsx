"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { nav, INSTAGRAM_URL, EMAIL, brand } from "@/data/content";
import { EASE } from "@/lib/motion";
import { BrokenRing } from "@/components/brand/Geometry";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-teal-700 lg:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
          transition={{ duration: 0.85, ease: EASE.urjaa }}
        >
          {/* emblem geometry, very quiet */}
          <BrokenRing className="pointer-events-none absolute -right-[28%] top-[8%] w-[85vw] text-gold/15" />
          <div className="pointer-events-none absolute -left-24 bottom-[-15%] h-[60vh] w-[60vh] rounded-full bg-saffron/10 blur-[90px]" />

          <div className="u-shell flex h-[76px] shrink-0 items-center">
            <span className="relative h-9 w-9">
              <Image
                src="/images/brand/emblem.png"
                alt=""
                fill
                sizes="36px"
                className="object-contain"
              />
            </span>
          </div>

          <nav
            className="u-shell flex flex-1 flex-col justify-center gap-1"
            aria-label="Mobile"
          >
            {nav.map((item, i) => (
              <span key={item.href} className="u-line-mask">
                <motion.span
                  className="u-line-inner"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "110%", transition: { duration: 0.3 } }}
                  transition={{
                    duration: 0.9,
                    ease: EASE.urjaa,
                    delay: 0.18 + i * 0.06,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="u-display block py-1.5 text-[clamp(2.6rem,12vw,4rem)] text-ivory"
                  >
                    {item.label}
                  </Link>
                </motion.span>
              </span>
            ))}
          </nav>

          <motion.div
            className="u-shell shrink-0 pb-10 pt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE.urjaa, delay: 0.42 }}
          >
            <div className="h-px w-full bg-ivory/15" />
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/urjaa-deepak"
                onClick={onClose}
                className="inline-flex w-fit items-center gap-3 rounded-full bg-saffron px-7 py-4 u-label text-teal-900"
              >
                Shop Urjaa Deepak
              </Link>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="u-label text-ivory/70 transition-colors hover:text-saffron"
              >
                Follow the journey on Instagram
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm text-ivory/60 transition-colors hover:text-ivory"
              >
                {EMAIL}
              </a>
              <p className="u-label mt-2 text-[10px] text-ivory/35">
                {brand.parentLine}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
