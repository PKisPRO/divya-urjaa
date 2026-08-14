"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { product } from "@/data/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Three real photographs stacked in CSS 3D space. No invented geometry —
 *  the depth comes from perspective, shadow and staged motion, which is far
 *  more honest (and better looking) than a modelled box that isn't the
 *  actual product. */
const FRAMES = [
  {
    src: "/images/product/box-closed.jpg",
    alt: "The closed Urjaa Deepak box in a red block-printed sleeve reading Empowering Rural Women",
    caption: "The box",
    body: "Wrapped in a block-printed sleeve, packed in the village it came from.",
  },
  {
    src: "/images/product/box-open.jpg",
    alt: "An open Urjaa Deepak gift box with the Chetnagram Sansthan leaflet, a clay diya and packed handmade deepaks",
    caption: "Opened",
    body: "A Chetnagram Sansthan leaflet, a clay diya, and thirty deepaks resting under it.",
  },
  {
    src: "/images/product/box-contents.jpg",
    alt: "The full contents of one Urjaa Deepak box laid out — five packs of deepaks, camphor, a terracotta diya and decorative stones",
    caption: "Everything inside",
    body: product.contents,
  },
];

export default function ProductExperience() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce), (max-width: 1023px)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          if (!desktop) {
            gsap.set(".pe-frame", { clearProps: "all", opacity: 1 });
            gsap.set(".pe-copy", { clearProps: "all", opacity: 1 });
            return;
          }

          const frames = gsap.utils.toArray<HTMLElement>(".pe-frame");
          const copies = gsap.utils.toArray<HTMLElement>(".pe-copy");

          gsap.set(frames, {
            autoAlpha: 0,
            rotateX: 16,
            rotateY: -14,
            z: -260,
            scale: 0.92,
          });
          gsap.set(frames[0], {
            autoAlpha: 1,
            rotateX: 6,
            rotateY: -7,
            z: 0,
            scale: 1,
          });
          gsap.set(copies, { autoAlpha: 0, y: 26 });
          gsap.set(copies[0], { autoAlpha: 1, y: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=280%",
              pin: ".pe-stage",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          });

          for (let i = 1; i < frames.length; i++) {
            tl.to(
              frames[i - 1],
              {
                autoAlpha: 0,
                rotateX: -12,
                rotateY: 12,
                z: 220,
                scale: 1.06,
                ease: "none",
              },
              i - 1,
            )
              .to(
                frames[i],
                {
                  autoAlpha: 1,
                  rotateX: 6,
                  rotateY: -7,
                  z: 0,
                  scale: 1,
                  ease: "none",
                },
                i - 1,
              )
              .to(
                copies[i - 1],
                { autoAlpha: 0, y: -22, ease: "none" },
                i - 1,
              )
              .to(copies[i], { autoAlpha: 1, y: 0, ease: "none" }, i - 0.62);
          }

          // final beat: the purchase panel resolves
          tl.fromTo(
            ".pe-buy",
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, ease: "none" },
            frames.length - 1.1,
          );
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative bg-ivory text-ink lg:h-[380vh]"
      aria-labelledby="product-experience"
    >
      <div className="pe-stage relative flex min-h-[100svh] items-center overflow-hidden py-24 lg:py-0">
        <div className="pointer-events-none absolute left-[68%] top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-[110px]" />

        <div className="u-shell grid w-full items-center gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* copy rail */}
          <div className="lg:col-span-5 lg:col-start-1">
            <p className="u-label text-ember">{product.name}</p>
            <h2
              id="product-experience"
              className="u-display mt-5 text-[clamp(2.3rem,4.6vw,4.2rem)] text-teal-700"
            >
              {product.headline}
            </h2>
            <p className="u-body mt-5 max-w-sm text-ink/70">{product.intro}</p>

            {/* stacked captions — only one visible at a time on desktop */}
            <div className="relative mt-10 lg:h-[132px]">
              {FRAMES.map((f, i) => (
                <div
                  key={f.caption}
                  className="pe-copy lg:absolute lg:inset-0 mt-8 lg:mt-0"
                >
                  <p className="u-label text-ember">
                    {String(i + 1).padStart(2, "0")} · {f.caption}
                  </p>
                  <p className="u-body mt-3 max-w-sm text-ink/75">{f.body}</p>
                </div>
              ))}
            </div>

            <div className="pe-buy mt-10 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-teal-700/20 pt-7">
              <div>
                <p className="u-label text-smoke">Price</p>
                <p className="u-display mt-2 text-[clamp(2rem,3vw,2.6rem)] text-teal-700">
                  {product.priceLabel}
                  <span className="ml-2 align-middle text-[13px] font-normal not-italic text-smoke">
                    {product.priceUnit}
                  </span>
                </p>
              </div>
              <Link
                href="/urjaa-deepak"
                data-cursor="explore"
                className="group inline-flex items-center gap-3 rounded-full bg-saffron px-7 py-4 u-label text-teal-900 transition-colors duration-500 hover:bg-teal-700 hover:text-ivory"
              >
                Explore the Deepak
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                  <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* dimensional stage */}
          <div
            className="lg:col-span-6 lg:col-start-7"
            style={{ perspective: "1400px" }}
          >
            <div
              className="relative mx-auto aspect-square w-full max-w-[min(78vw,560px)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {FRAMES.map((f, i) => (
                <figure
                  key={f.src}
                  data-cursor="explore"
                  className="pe-frame relative lg:absolute lg:inset-0 mt-10 lg:mt-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 1024px) 78vw, 45vw"
                    quality={90}
                    className="h-full w-full rounded-[2px] object-cover shadow-[0_40px_100px_-45px_rgba(17,67,80,0.55)]"
                    priority={i === 0}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
