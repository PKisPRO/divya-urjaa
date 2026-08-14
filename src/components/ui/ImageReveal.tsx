"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** overscale that settles as the mask opens */
  scaleFrom?: number;
  delay?: number;
  cursor?: "view" | "meet" | "explore" | null;
  quality?: number;
};

/** A clip reveal, not a fade: the frame opens upward and the photograph
 *  settles back from a slight overscale. Reads as light spreading. */
export default function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
  scaleFrom = 1.14,
  delay = 0,
  cursor = "view",
  quality = 86,
}: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      {...(cursor ? { "data-cursor": cursor } : {})}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={
        shown
          ? { clipPath: "inset(0% 0% 0% 0%)" }
          : { clipPath: "inset(100% 0% 0% 0%)" }
      }
      transition={{ duration: 1.35, ease: EASE.urjaa, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: scaleFrom }}
        animate={shown ? { scale: 1 } : { scale: scaleFrom }}
        transition={{ duration: 1.8, ease: EASE.urjaa, delay }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "100vw"}
            priority={priority}
            quality={quality}
            className={`object-cover ${imgClassName}`}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 1600}
            height={height ?? 1200}
            sizes={sizes}
            priority={priority}
            quality={quality}
            className={`h-full w-full object-cover ${imgClassName}`}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
