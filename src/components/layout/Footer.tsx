import Link from "next/link";
import Image from "next/image";
import { nav, brand, EMAIL, INSTAGRAM_URL } from "@/data/content";
import { BrokenRing } from "@/components/brand/Geometry";

function InstagramMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
      strokeWidth="1.4"
      stroke="currentColor"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-900 text-ivory">
      <BrokenRing
        className="pointer-events-none absolute -right-[18%] -top-[45%] w-[70vw] text-gold/10"
        strokeWidth={0.5}
      />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[40vh] w-[80vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-saffron/12 blur-[120px]" />

      <div className="u-shell relative pb-12 pt-[clamp(4rem,9vw,7rem)]">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* identity */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="relative h-11 w-11">
                <Image
                  src="/images/brand/emblem.png"
                  alt=""
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </span>
              <span className="relative h-[15px] w-[128px]">
                <Image
                  src="/images/brand/wordmark.png"
                  alt="Divya Urjaa"
                  fill
                  sizes="128px"
                  className="object-contain object-left brightness-0 invert"
                />
              </span>
            </div>
            <p className="u-display mt-7 text-[clamp(1.6rem,2.6vw,2.1rem)] text-ivory">
              {brand.tagline}
            </p>
            <p className="u-body mt-4 text-ivory/60">
              {brand.descriptor} An initiative of{" "}
              <span className="text-gold-soft">{brand.parent}</span>.
            </p>
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <h2 className="u-label text-ivory/40">Explore</h2>
            <ul className="mt-6 space-y-3.5">
              <li>
                <Link
                  href="/"
                  className="group inline-flex text-[15px] text-ivory/75 transition-colors hover:text-saffron"
                >
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex text-[15px] text-ivory/75 transition-colors hover:text-saffron"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h2 className="u-label text-ivory/40">Get in touch</h2>
            <ul className="mt-6 space-y-3.5">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-[15px] text-ivory/75 underline-offset-4 transition-colors hover:text-saffron hover:underline"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2.5 text-[15px] text-ivory/75 transition-colors hover:text-saffron"
                >
                  <InstagramMark className="h-[18px] w-[18px]" />
                  @divya___urjaa
                </a>
              </li>
            </ul>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-ivory/20 px-5 py-3 u-label text-ivory/80 transition-colors hover:border-saffron hover:text-saffron"
            >
              Follow the journey
              <svg
                width="14"
                height="9"
                viewBox="0 0 16 10"
                fill="none"
                aria-hidden
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                <path
                  d="M0 5h14M10 1l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-ivory/12" />

        <div className="mt-6 flex flex-col gap-3 text-[12px] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Divya Urjaa. All rights reserved.
          </p>
          <p className="u-label text-[10px] text-ivory/35">{brand.signature}</p>
        </div>
      </div>
    </footer>
  );
}
