"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { artisans } from "@/data/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Desktop: the procession travels sideways while the portraits counter-drift,
 *  so the women read as a sequence of individuals rather than a row of
 *  testimonial cards. Only the track is pinned — the heading scrolls away
 *  first, which leaves the full viewport for portrait plus words.
 *  Mobile: the same content simply stacks. */
export default function ArtisanSequence() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pin = root.current?.querySelector<HTMLElement>(".as-pin");
          const track = root.current?.querySelector<HTMLElement>(".as-track");
          if (!pin || !track) return;

          const distance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);
          const span = () => distance() + window.innerHeight * 0.5;

          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${span()}`,
              pin: true,
              scrub: 0.9,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          gsap.fromTo(
            ".as-portrait",
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: pin,
                start: "top top",
                end: () => `+=${span()}`,
                scrub: 1.1,
                invalidateOnRefresh: true,
              },
            },
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
      className="relative overflow-hidden bg-teal-900 text-ivory"
      aria-labelledby="artisans-heading"
    >
      {/* heading scrolls normally, then hands the viewport to the procession */}
      <div className="u-shell pb-[clamp(3rem,6vw,5rem)] pt-[clamp(4.5rem,10vw,8rem)]">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <p className="u-label text-saffron lg:col-span-3">{artisans.label}</p>
          <div className="lg:col-span-9">
            <h2
              id="artisans-heading"
              className="u-display max-w-3xl text-[clamp(2.3rem,5vw,4.4rem)]"
            >
              {artisans.headline}
            </h2>
            <p className="u-body mt-6 max-w-md text-ivory/60">
              {artisans.intro}
            </p>
          </div>
        </div>
      </div>

      <div className="as-pin relative flex items-center overflow-hidden lg:h-[100svh]">
        <div className="as-track flex w-max gap-[clamp(1.25rem,3vw,3.5rem)] px-[var(--shell)] pb-14 max-lg:w-full max-lg:flex-col lg:pb-0">
          {artisans.people.map((p, i) => (
            <article
              key={p.name}
              className="group relative w-[min(84vw,420px)] shrink-0 lg:w-auto"
            >
              <div
                data-cursor="meet"
                className="relative aspect-[3/4] overflow-hidden bg-teal-800 lg:h-[min(58vh,540px)] lg:w-auto"
                style={{ aspectRatio: "3 / 4" }}
              >
                <div className="as-portrait absolute inset-0 scale-[1.14]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 84vw, 420px"
                    quality={88}
                    className="object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-900/85 via-teal-900/5 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                  <p className="u-label text-[10px] text-gold-soft/80">
                    {String(i + 1).padStart(2, "0")} · Rajasthan
                  </p>
                  <h3 className="u-display mt-2 text-[clamp(1.7rem,2.6vw,2.3rem)]">
                    {p.name}
                  </h3>
                </div>
              </div>

              <blockquote className="mt-6 max-w-[min(84vw,420px)]">
                <p
                  lang="hi"
                  className="u-display-tight text-[clamp(1.1rem,1.7vw,1.4rem)] leading-[1.5] text-gold-soft"
                >
                  {p.quote}
                </p>
                <footer className="u-body mt-2.5 text-[14px] text-ivory/50">
                  {p.translation}
                </footer>
              </blockquote>
            </article>
          ))}

          {/* closing panel of the procession */}
          <div className="flex w-[min(84vw,360px)] shrink-0 flex-col justify-center lg:w-[min(28vw,380px)]">
            <p className="u-display text-[clamp(1.6rem,2.6vw,2.2rem)] text-ivory/90">
              Fifty more women
              <br />
              work beside them.
            </p>
            <Link
              href="/artisans"
              data-cursor="meet"
              className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-ivory/25 px-7 py-4 u-label transition-colors duration-500 hover:border-saffron hover:text-saffron"
            >
              Meet the artisans
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                aria-hidden
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              >
                <path
                  d="M0 5h14M10 1l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
