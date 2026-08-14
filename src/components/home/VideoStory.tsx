"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { story } from "@/data/content";
import { EASE } from "@/lib/motion";
import RevealText from "@/components/ui/RevealText";

/** The overview film carries spoken testimony and burnt-in subtitles, so it
 *  is never treated as silent wallpaper: it opens on a held poster frame and
 *  plays with sound on a deliberate press. */
export default function VideoStory({
  compact = false,
}: {
  /** homepage teaser vs. full-bleed treatment on /our-story */
  compact?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    if (!v.src) {
      const small = window.matchMedia("(max-width: 860px)").matches;
      v.src = small ? "/videos/story-720.mp4" : "/videos/story-1080.mp4";
    }
    v.muted = false;
    v.controls = true;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
    setPlaying(true);
  };

  return (
    <section
      className="relative overflow-hidden bg-teal-900 text-ivory"
      aria-labelledby="video-story"
    >
      <div className={compact ? "u-shell u-rhythm" : "u-rhythm"}>
        <div className={compact ? "" : "u-shell"}>
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <motion.p
              className="u-label text-saffron lg:col-span-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE.urjaa }}
            >
              {story.video.label}
            </motion.p>
            <RevealText
              id="video-story"
              as="h2"
              lines={[story.video.headline]}
              className="u-display text-[clamp(2.2rem,4.8vw,4.2rem)] lg:col-span-9"
            />
          </div>
          <motion.p
            className="u-body mt-6 max-w-md text-ivory/60 lg:ml-[25%]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
            transition={{ duration: 1, ease: EASE.urjaa, delay: 0.1 }}
          >
            {story.video.body}
          </motion.p>
        </div>

        <motion.figure
          className={[
            "relative mt-[clamp(2.5rem,5vw,4rem)] overflow-hidden bg-teal-800",
            compact ? "" : "u-shell !px-0 max-w-none",
          ].join(" ")}
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
          transition={{ duration: 1.4, ease: EASE.urjaa }}
        >
          <div className="relative aspect-video w-full">
            <video
              ref={ref}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
              poster="/images/story/story-poster.jpg"
              playsInline
              preload="none"
              onEnded={() => setPlaying(false)}
            />

            {!playing && (
              <>
                <Image
                  src="/images/story/story-poster.jpg"
                  alt="Women artisans holding a tray of freshly made Urjaa Deepaks"
                  fill
                  sizes="100vw"
                  quality={88}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/75 via-teal-900/15 to-teal-900/25" />

                <button
                  type="button"
                  onClick={start}
                  data-cursor="cta"
                  className="group absolute inset-0 grid place-items-center"
                  aria-label="Play the Divya Urjaa overview film"
                >
                  <span className="relative grid h-[92px] w-[92px] place-items-center rounded-full border border-ivory/40 backdrop-blur-sm transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:border-saffron group-hover:bg-saffron">
                    <svg
                      width="20"
                      height="24"
                      viewBox="0 0 20 24"
                      fill="none"
                      aria-hidden
                      className="ml-1.5"
                    >
                      <path d="M0 0 L20 12 L0 24 Z" fill="currentColor" />
                    </svg>
                    <span className="absolute inset-0 -z-10 rounded-full bg-saffron/25 blur-xl transition-opacity duration-500 group-hover:opacity-0" />
                  </span>
                  <span className="u-label absolute bottom-8 text-[10px] text-ivory/70">
                    Watch the film · 43 sec
                  </span>
                </button>
              </>
            )}
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
