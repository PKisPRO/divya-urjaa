"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { journey } from "@/data/content";
import { EASE } from "@/lib/motion";
import ImageReveal from "@/components/ui/ImageReveal";
import RevealText from "@/components/ui/RevealText";

function Step({
  step,
  index,
}: {
  step: (typeof journey.steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const flip = index % 2 === 1;
  const square = "square" in step && step.square;

  return (
    <div
      ref={ref}
      className="grid items-center gap-x-12 gap-y-8 lg:grid-cols-12"
    >
      <motion.div
        style={{ y }}
        className={[
          square ? "lg:col-span-5" : "lg:col-span-7",
          flip
            ? square
              ? "lg:order-2 lg:col-start-8"
              : "lg:order-2 lg:col-start-6"
            : "lg:col-start-1",
        ].join(" ")}
      >
        <ImageReveal
          src={step.image}
          alt={step.alt}
          width={square ? 1024 : 1600}
          height={square ? 1024 : 1200}
          sizes={square ? "(max-width: 1024px) 92vw, 40vw" : "(max-width: 1024px) 92vw, 56vw"}
          className={`${square ? "aspect-square" : "aspect-[4/3]"} w-full`}
        />
      </motion.div>

      <div
        className={[
          "lg:col-span-4",
          flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9",
        ].join(" ")}
      >
        <div className="flex items-baseline gap-4">
          <span className="u-label text-ember">{step.n}</span>
          <span className="h-px flex-1 bg-teal-700/20" />
        </div>
        <RevealText
          as="h3"
          lines={[step.title]}
          className="u-display mt-5 text-[clamp(1.9rem,3.4vw,2.9rem)] text-teal-700"
        />
        <motion.p
          className="u-body mt-5 text-ink/70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE.urjaa, delay: 0.1 }}
        >
          {step.body}
        </motion.p>
      </div>
    </div>
  );
}

export default function JourneySequence() {
  return (
    <section
      className="relative overflow-hidden bg-ivory u-rhythm"
      aria-labelledby="journey-heading"
    >
      <div className="u-shell">
        <div className="grid gap-x-12 gap-y-5 lg:grid-cols-12">
          <motion.p
            className="u-label text-ember lg:col-span-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "9999px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE.urjaa }}
          >
            {journey.label}
          </motion.p>
          <RevealText
            id="journey-heading"
            as="h2"
            lines={["From Rajasthan", "to your home."]}
            className="u-display text-[clamp(2.4rem,5.4vw,4.9rem)] text-teal-700 lg:col-span-9"
          />
        </div>

        <div className="mt-[clamp(4rem,8vw,7rem)] flex flex-col gap-[clamp(4.5rem,9vw,8rem)]">
          {journey.steps.map((s, i) => (
            <Step key={s.n} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
