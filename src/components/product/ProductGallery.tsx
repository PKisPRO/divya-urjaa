"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { product } from "@/data/content";
import { EASE } from "@/lib/motion";

export default function ProductGallery() {
  const [active, setActive] = useState(0);
  const shot = product.gallery[active];

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden bg-sand">
        <AnimatePresence mode="wait">
          <motion.div
            key={shot.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: EASE.urjaa }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              priority={active === 0}
              sizes="(max-width: 1024px) 92vw, 46vw"
              quality={92}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {product.gallery.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1} of ${product.gallery.length}`}
            aria-current={i === active}
            data-cursor="view"
            className={[
              "relative aspect-square overflow-hidden bg-sand transition-opacity duration-500",
              i === active
                ? "opacity-100 ring-1 ring-inset ring-saffron"
                : "opacity-55 hover:opacity-90",
            ].join(" ")}
          >
            <Image
              src={g.src}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
