import Link from "next/link";
import Image from "next/image";
import { BrokenRing } from "@/components/brand/Geometry";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-teal-900 text-ivory">
      <BrokenRing
        className="pointer-events-none absolute -right-[18%] -top-[30%] w-[66vw] text-gold/12"
        strokeWidth={0.4}
      />
      <div className="u-shell relative py-32">
        <div className="relative h-14 w-14">
          <Image
            src="/images/brand/emblem.png"
            alt=""
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>
        <p className="u-label mt-8 text-saffron">404</p>
        <h1 className="u-display mt-5 max-w-2xl text-[clamp(2.2rem,6vw,4.5rem)]">
          This flame isn&rsquo;t lit.
        </h1>
        <p className="u-lede mt-6 max-w-md text-ivory/60">
          The page you were looking for has moved or never existed.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-ivory px-7 py-4 u-label text-teal-700 transition-colors duration-500 hover:bg-saffron hover:text-ivory"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
