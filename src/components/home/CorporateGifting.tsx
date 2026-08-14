"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gifting, EMAIL } from "@/data/content";
import { EASE } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";
import ImageReveal from "@/components/ui/ImageReveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { RayBurst } from "@/components/brand/Geometry";

export default function CorporateGifting() {
  const root = useRef<HTMLElement>(null);
  const y = useParallax(root, 10);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-teal-700 text-ivory u-rhythm"
      aria-labelledby="gifting-heading"
    >
      <div className="pointer-events-none absolute -left-[10%] top-[12%] w-[46vw] opacity-70">
        <RayBurst className="w-full text-gold/18" rays={22} inner={30} outer={49} />
      </div>
      <div className="pointer-events-none absolute right-[8%] top-1/2 h-[46vh] w-[46vh] -translate-y-1/2 rounded-full bg-saffron/14 blur-[110px]" />

      <div className="u-shell relative">
        <div className="grid items-center gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.p
              className="u-label text-gold-soft/85"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE.urjaa }}
            >
              {gifting.label}
            </motion.p>

            <RevealText
              id="gifting-heading"
              as="h2"
              lines={gifting.headline.split("\n")}
              className="u-display mt-6 text-[clamp(2.1rem,4.4vw,3.6rem)]"
            />

            <motion.p
              className="u-body mt-6 max-w-md text-ivory/65"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE.urjaa, delay: 0.1 }}
            >
              {gifting.body}
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE.urjaa, delay: 0.2 }}
            >
              <MagneticButton
                href={`mailto:${EMAIL}?subject=Bulk%20Order%20Enquiry`}
                variant="solid"
                tone="light"
              >
                {gifting.cta}
              </MagneticButton>
            </motion.div>
          </div>

          {/* the studio photography sits on its own lit plate rather than
              floating a white rectangle straight onto the teal */}
          <motion.div style={{ y }} className="lg:col-span-6 lg:col-start-7">
            <div className="bg-ivory p-[clamp(1.25rem,3vw,2.75rem)] shadow-[0_50px_120px_-45px_rgba(0,0,0,0.75)]">
              <ImageReveal
                src="/images/product/box-closed.jpg"
                alt="The closed Urjaa Deepak box in a red block-printed sleeve reading Empowering Rural Women"
                width={1024}
                height={1024}
                sizes="(max-width: 1024px) 84vw, 44vw"
                quality={90}
                className="aspect-square w-full"
              />
              <p className="u-label mt-5 text-[10px] text-smoke">
                Urjaa Deepak · gift box
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
