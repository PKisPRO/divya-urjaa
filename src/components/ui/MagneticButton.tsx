"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  tone?: "dark" | "light";
  className?: string;
  external?: boolean;
  strength?: number;
};

/** Restrained magnetism — 0.22 of the offset, capped, and only on fine
 *  pointers. Enough to feel alive, not enough to feel like a toy. */
export default function MagneticButton({
  href,
  children,
  variant = "solid",
  tone = "dark",
  className = "",
  external = false,
  strength = 0.22,
}: Props) {
  const wrap = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = wrap.current;
    if (!el || !inner.current) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const cap = 14;
    const x = Math.max(-cap, Math.min(cap, dx * strength));
    const y = Math.max(-cap, Math.min(cap, dy * strength));
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    inner.current.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
  };

  const reset = () => {
    if (wrap.current) wrap.current.style.transform = "";
    if (inner.current) inner.current.style.transform = "";
  };

  const base =
    "group relative inline-flex items-center gap-3 rounded-full px-7 py-4 u-label transition-colors duration-500 will-change-transform";

  const styles: Record<string, string> = {
    solid:
      tone === "dark"
        ? "bg-teal-700 text-ivory hover:bg-saffron hover:text-teal-900"
        : "bg-ivory text-teal-700 hover:bg-saffron hover:text-teal-900",
    outline:
      tone === "dark"
        ? "border border-teal-700/30 text-teal-700 hover:border-ember hover:text-ember"
        : "border border-ivory/35 text-ivory hover:border-saffron hover:text-saffron",
    ghost:
      tone === "dark"
        ? "text-teal-700 hover:text-ember px-0"
        : "text-ivory hover:text-saffron px-0",
  };

  return (
    <span
      ref={wrap}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <Link
        href={href}
        data-cursor="cta"
        {...(external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
        className={`${base} ${styles[variant]} ${className}`}
      >
        <span ref={inner} className="inline-flex items-center gap-3 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          {children}
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            aria-hidden
            className="translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
          >
            <path
              d="M0 5h14M10 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </span>
  );
}
