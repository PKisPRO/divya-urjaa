import type { Metadata } from "next";
import {
  product,
  ingredients,
  science,
  testimonials,
  EMAIL,
  SITE_URL,
} from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import ProductGallery from "@/components/product/ProductGallery";
import Faq from "@/components/product/Faq";
import RitualSequence from "@/components/home/RitualSequence";
import MagneticButton from "@/components/ui/MagneticButton";
import { FlameGlyph } from "@/components/brand/Geometry";

export const metadata: Metadata = {
  title: "Urjaa Deepak — The sacred diya, reimagined",
  description:
    "₹399 per box. Each box contains 30 Urjaa Deepaks with wick, one clay diya and camphor. Handmade from cow dung, sesame and over 200 plus natural herbs and ingredients, and havan samagri by 50+ women artisans in Rajasthan.",
  alternates: { canonical: `${SITE_URL}/urjaa-deepak` },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  sku: product.sku,
  description:
    "A handmade diya of cow dung, sesame and over 200 plus natural herbs and ingredients, and havan samagri, crafted by 50+ women artisans in a Rajasthan village. Each box contains 30 Urjaa Deepaks with wick, one clay diya and camphor.",
  image: [`${SITE_URL}/images/product/box-open.jpg`],
  brand: { "@type": "Brand", name: "Divya Urjaa" },
  offers: {
    "@type": "Offer",
    price: String(product.price),
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/urjaa-deepak`,
  },
};

export default function ProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* buy panel */}
      <section className="relative overflow-hidden bg-ivory pb-[clamp(4rem,8vw,6rem)] pt-[clamp(8rem,15vh,11rem)]">
        <div className="u-shell grid items-start gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ProductGallery />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal as="p" className="u-label text-ember">
              {product.name}
            </Reveal>
            <RevealText
              as="h1"
              lines={["The sacred diya,", "reimagined."]}
              className="u-display mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] text-teal-700"
            />

            <Reveal delay={0.1} className="mt-8 flex items-baseline gap-4">
              <span className="u-display text-[clamp(2.2rem,3.6vw,3rem)] text-teal-700">
                {product.priceLabel}
              </span>
              <span className="u-label text-smoke">{product.priceUnit}</span>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <h2 className="u-label text-smoke">What&rsquo;s in each box</h2>
              <p className="u-body mt-3 text-ink/75">{product.contents}</p>
            </Reveal>

            <Reveal delay={0.18} className="mt-8 border-t border-teal-700/15 pt-6">
              <dl className="flex flex-wrap gap-x-12 gap-y-4">
                <div>
                  <dt className="u-label text-smoke">SKU</dt>
                  <dd className="mt-2 text-[15px] text-ink/80">{product.sku}</dd>
                </div>
                <div>
                  <dt className="u-label text-smoke">Availability</dt>
                  <dd className="mt-2 text-[15px] text-ink/80">
                    {product.availability}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.22} className="mt-10">
              <MagneticButton
                href={`mailto:${EMAIL}?subject=Urjaa%20Deepak%20Order`}
                variant="solid"
                tone="dark"
              >
                Order Urjaa Deepak
              </MagneticButton>
              <p className="u-body mt-5 max-w-sm text-[14px] text-smoke">
                {product.checkoutNote}
              </p>
            </Reveal>

            <Reveal delay={0.26} className="mt-8 border-t border-teal-700/15 pt-6">
              <p className="u-body text-ink/70">
                Every box you order is a wage for a woman in one Rajasthan
                village.{" "}
                <a
                  href="/impact"
                  className="text-teal-700 underline decoration-saffron underline-offset-4 transition-colors hover:text-ember"
                >
                  See the impact
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ingredients */}
      <section className="relative overflow-hidden bg-teal-700 text-ivory u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <Reveal as="p" className="u-label text-gold-soft/85 lg:col-span-3">
              {ingredients.label}
            </Reveal>
            <RevealText
              as="h2"
              lines={[ingredients.lead]}
              className="u-display max-w-[24ch] text-[clamp(1.7rem,3.2vw,2.8rem)] lg:col-span-9"
            />
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-10 gap-y-12 md:grid-cols-3 lg:ml-[25%]">
            {ingredients.items.map((item, i) => (
              <Reveal
                as="article"
                key={item.name}
                delay={i * 0.08}
                className="border-t border-ivory/20 pt-6"
              >
                <FlameGlyph className="h-6 w-6 text-saffron" />
                <h3 className="u-display-tight mt-5 text-[clamp(1.35rem,2.2vw,1.8rem)]">
                  {item.name}
                </h3>
                <p className="u-body mt-3 text-ivory/65">{item.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12 lg:ml-[25%]">
            <p className="u-label text-gold-soft/70">Also in the blend</p>
            <p className="u-display-tight mt-3 text-[clamp(1.3rem,2.2vw,1.75rem)] text-gold-soft">
              {ingredients.also}
            </p>
            <p className="u-body mt-4 max-w-2xl text-ivory/60">
              {ingredients.closing}
            </p>
          </Reveal>
        </div>
      </section>

      {/* the ritual */}
      <RitualSequence />

      {/* the science */}
      <section className="relative overflow-hidden bg-sand u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <Reveal as="p" className="u-label text-ember lg:col-span-3">
              {science.label}
            </Reveal>
            <div className="lg:col-span-9">
              <RevealText
                as="h2"
                lines={[science.headline]}
                className="u-display text-[clamp(2.2rem,5vw,4.2rem)] text-teal-700"
              />
              <Reveal as="p" delay={0.08} className="u-lede mt-6 max-w-xl text-ink/70">
                {science.intro}
              </Reveal>
            </div>
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-10 gap-y-12 md:grid-cols-2 lg:ml-[25%]">
            {science.findings.map((f, i) => (
              <Reveal
                key={f.figure}
                delay={i * 0.08}
                className="border-t-2 border-saffron pt-6"
              >
                <p className="u-display text-[clamp(2.8rem,6vw,4.5rem)] leading-none text-teal-700">
                  {f.figure}
                </p>
                <p className="u-body mt-4 text-ink/75">{f.body}</p>
                <p className="u-label mt-4 text-smoke">— {f.source}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-10 gap-y-10 md:grid-cols-2 lg:ml-[25%]">
            {science.notes.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.08}>
                <h3 className="u-display-tight text-[clamp(1.2rem,2vw,1.5rem)] text-teal-700">
                  {n.title}
                </h3>
                <p className="u-body mt-3 text-ink/70">{n.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-14 lg:ml-[25%]">
            <p className="u-display text-[clamp(1.6rem,3vw,2.4rem)] text-ember">
              {science.closing}
            </p>
          </Reveal>
        </div>
      </section>

      {/* voices */}
      <section className="relative overflow-hidden bg-ivory u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <Reveal as="p" className="u-label text-ember lg:col-span-3">
              {testimonials.label}
            </Reveal>
            <RevealText
              as="h2"
              lines={[testimonials.headline]}
              className="u-display text-[clamp(2rem,4.4vw,3.6rem)] text-teal-700 lg:col-span-9"
            />
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-10 gap-y-12 md:grid-cols-3">
            {testimonials.items.map((t, i) => (
              <Reveal
                as="blockquote"
                key={t.name}
                delay={i * 0.08}
                className="border-t border-teal-700/15 pt-6"
              >
                <p className="u-display-tight text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.55] text-teal-700">
                  {t.quote}
                </p>
                <footer className="u-label mt-5 text-smoke">
                  {t.name} · {t.location}
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="relative overflow-hidden bg-sand u-rhythm">
        <div className="u-shell">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <Reveal as="p" className="u-label text-ember lg:col-span-3">
              FAQ
            </Reveal>
            <RevealText
              as="h2"
              lines={["Questions,", "gently answered."]}
              className="u-display text-[clamp(2rem,4.4vw,3.6rem)] text-teal-700 lg:col-span-9"
            />
          </div>
          <div className="mt-[clamp(2.5rem,5vw,4rem)] lg:ml-[25%]">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
