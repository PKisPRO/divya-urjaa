"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/data/content";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    // Pages opening on a dark hero get the transparent, light-on-dark header.
    // Anything else (the product page opens straight onto white studio
    // photography) gets the solid treatment immediately, so the wordmark is
    // never white-on-white.
    const hero = document.querySelector<HTMLElement>("[data-hero-dark]");

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setOverDark(hero ? hero.getBoundingClientRect().bottom > 96 : false);
      // hide on the way down, reveal on the way up — but never over the hero
      setHidden(y > 420 && y > last.current);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  /** solid = ivory bar with dark type */
  const solid = scrolled || !overDark;

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter,border-color] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          solid && !open
            ? "border-b border-teal-700/10 bg-ivory/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        {/* keeps the nav legible over the brightest part of the hero */}
        {!solid && !open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140%] bg-gradient-to-b from-teal-900/55 via-teal-900/25 to-transparent"
          />
        )}
        <div className="u-shell flex h-[76px] items-center justify-between gap-6 md:h-[88px]">
          <Link
            href="/"
            aria-label="Divya Urjaa — home"
            data-cursor="cta"
            className="group relative z-10 flex items-center gap-3"
          >
            <span className="relative h-9 w-9 shrink-0 md:h-10 md:w-10">
              <Image
                src="/images/brand/emblem.png"
                alt=""
                fill
                sizes="40px"
                className="object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[8deg]"
                priority
              />
            </span>
            <span className="relative h-[13px] w-[104px] md:h-[15px] md:w-[122px]">
              <Image
                src="/images/brand/wordmark.png"
                alt="Divya Urjaa"
                fill
                sizes="122px"
                className={[
                  "object-contain object-left transition-[filter,opacity] duration-500",
                  solid || open ? "" : "brightness-0 invert",
                ].join(" ")}
                priority
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="cta"
                  className={[
                    "group relative u-label transition-colors duration-500",
                    solid
                      ? "text-teal-700/80 hover:text-teal-700"
                      : "text-ivory/85 hover:text-ivory",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    className={[
                      "absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-saffron transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100",
                      active ? "!scale-x-100 !origin-left" : "",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/urjaa-deepak"
              data-cursor="cta"
              className={[
                "hidden rounded-full px-6 py-3 u-label transition-colors duration-500 sm:inline-flex",
                solid
                  ? "bg-teal-700 text-ivory hover:bg-saffron"
                  : "bg-ivory/10 text-ivory ring-1 ring-inset ring-ivory/35 backdrop-blur-md hover:bg-saffron hover:ring-saffron",
              ].join(" ")}
            >
              Shop
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor="cta"
              className={[
                "relative z-10 grid h-11 w-11 place-items-center rounded-full transition-colors duration-500 lg:hidden",
                open
                  ? "text-ivory"
                  : solid
                    ? "text-teal-700"
                    : "text-ivory",
              ].join(" ")}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-[9px] w-[22px]">
                <span
                  className={[
                    "absolute left-0 block h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1/2 rotate-45" : "top-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 block h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1/2 w-full -rotate-45" : "bottom-0 w-3/5",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
