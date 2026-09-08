import type { Metadata } from "next";
import { SITE_URL } from "@/data/content";
import { juniorWing, leadership, teamPage } from "@/data/team";
import Portrait from "@/components/team/Portrait";
import TeamHero from "@/components/team/TeamHero";
import ArcRule from "@/components/team/ArcRule";
import MotionScope from "@/components/team/MotionScope";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { RayBurst } from "@/components/brand/Geometry";

export const metadata: Metadata = {
  title: "Team — The people behind the purpose",
  description:
    "The people behind Divya Urjaa: founder Vibha Agarwal, vice president Chetna Agarwal, and the Junior Wing working across operations, outreach, logistics and sales.",
  alternates: { canonical: `${SITE_URL}/team` },
};

/**
 * Compositions for the Junior Wing sequence. Cycled by index, so a sixth
 * member added to team.ts inherits the first layout rather than breaking the
 * page. Portrait size, aspect ratio, side and ground all vary — the sequence
 * should read as an editorial spread, never as a repeating card.
 *
 * DOM order is always portrait → text, so mobile stacks naturally; `lg:order`
 * does the flipping only once there are columns to flip between.
 */
const JUNIOR_LAYOUT = [
  {
    ground: "bg-ivory",
    dark: false,
    portrait: "lg:col-span-6 lg:col-start-1",
    aspect: "aspect-[4/5]",
    text: "lg:col-span-5 lg:col-start-8",
    sizes: "(max-width: 1024px) 92vw, 46vw",
    drift: 6,
    ledge: true,
  },
  {
    ground: "bg-ivory",
    dark: false,
    portrait: "lg:order-2 lg:col-span-4 lg:col-start-9",
    aspect: "aspect-[3/4]",
    text: "lg:order-1 lg:col-span-6 lg:col-start-1",
    sizes: "(max-width: 1024px) 92vw, 32vw",
    drift: 9,
    ledge: false,
  },
  {
    ground: "bg-teal-900",
    dark: true,
    portrait: "lg:col-span-6 lg:col-start-1",
    aspect: "aspect-[5/6]",
    text: "lg:col-span-5 lg:col-start-8",
    sizes: "(max-width: 1024px) 92vw, 46vw",
    drift: 5,
    ledge: false,
  },
  {
    ground: "bg-sand",
    dark: false,
    portrait: "lg:col-span-4 lg:col-start-2",
    aspect: "aspect-square",
    text: "lg:col-span-5 lg:col-start-7",
    sizes: "(max-width: 1024px) 92vw, 32vw",
    drift: 10,
    ledge: false,
  },
  {
    ground: "bg-sand",
    dark: false,
    portrait: "lg:order-2 lg:col-span-5 lg:col-start-8",
    aspect: "aspect-[4/5]",
    text: "lg:order-1 lg:col-span-5 lg:col-start-1",
    sizes: "(max-width: 1024px) 92vw, 40vw",
    drift: 7,
    ledge: true,
  },
] as const;

/** `01 —— FOUNDER`. In flow, so it can never land on top of the role the way
 *  an absolutely-positioned watermark numeral did. Echoes the `01 · Rajasthan`
 *  index on the artisans page. */
function MemberIndex({
  n,
  role,
  dark = false,
}: {
  n: string;
  role: string;
  dark?: boolean;
}) {
  return (
    <Reveal
      as="p"
      className={`u-label flex flex-wrap items-center gap-x-3.5 gap-y-1 ${
        dark ? "text-saffron" : "text-ember"
      }`}
    >
      <span className={dark ? "text-gold-soft" : "text-ember/70"}>{n}</span>
      <span
        aria-hidden
        className={`h-px w-6 shrink-0 ${dark ? "bg-gold-soft/45" : "bg-gold/70"}`}
      />
      <span>{role}</span>
    </Reveal>
  );
}

export default function TeamPage() {
  const [vibha, chetna] = leadership;

  return (
    <MotionScope>
      <TeamHero />

      {/* ── LEADERSHIP · the founder ──────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-ivory pb-[clamp(3.5rem,8vw,6.5rem)] pt-[clamp(2rem,5vw,4rem)]"
        aria-labelledby="leadership-heading"
      >
        <ArcRule className="u-shell mb-[clamp(2.5rem,6vw,4.5rem)]" tone="dark" />

        <div className="u-shell">
          <div className="grid gap-x-14 gap-y-6 lg:grid-cols-12">
            <Reveal as="p" className="u-label text-ember lg:col-span-3">
              {teamPage.leadership.label}
            </Reveal>
            <RevealText
              as="h2"
              id="leadership-heading"
              lines={teamPage.leadership.lines}
              className="u-display text-[clamp(2rem,4.4vw,3.6rem)] text-teal-700 lg:col-span-9"
            />
          </div>

          {vibha && (
            <article className="mt-[clamp(3rem,7vw,5.5rem)] grid items-center gap-x-14 gap-y-10 lg:grid-cols-12">
              <Portrait
                name={vibha.name}
                role={vibha.role}
                image={vibha.image}
                imageAlt={vibha.imageAlt}
                frame={vibha.frame}
                className="aspect-[4/5] w-full lg:col-span-5 lg:col-start-1"
                sizes="(max-width: 1024px) 92vw, 40vw"
                drift={6}
                ledge
                priority={Boolean(vibha.image)}
              />

              <div className="lg:col-span-6 lg:col-start-7">
                <div>
                  <MemberIndex n="01" role={vibha.role} />
                  <RevealText
                    as="h3"
                    id={`${vibha.id}-name`}
                    lines={[vibha.name]}
                    className="u-display mt-4 text-[clamp(2.3rem,5.2vw,4.25rem)] text-teal-700"
                  />
                  <Reveal
                    as="p"
                    delay={0.1}
                    className="u-lede mt-8 max-w-xl text-ink/75"
                  >
                    {vibha.bio}
                  </Reveal>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* ── LEADERSHIP · vice president ───────────────────────────── */}
      {chetna && (
        <section
          className="relative overflow-hidden bg-sand u-rhythm"
          aria-labelledby={`${chetna.id}-name`}
        >
          <RayBurst
            className="pointer-events-none absolute -left-[12%] top-[10%] w-[30vw] text-gold/15"
            rays={22}
          />

          <div className="u-shell grid items-center gap-x-14 gap-y-10 lg:grid-cols-12">
            <div className="lg:order-1 lg:col-span-6 lg:col-start-1">
              <div>
                <MemberIndex n="02" role={chetna.role} />
                <RevealText
                  as="h3"
                  id={`${chetna.id}-name`}
                  lines={[chetna.name]}
                  className="u-display mt-4 text-[clamp(2.1rem,4.6vw,3.6rem)] text-teal-700"
                />
                <Reveal
                  as="p"
                  delay={0.1}
                  className="u-body mt-7 max-w-lg text-ink/75"
                >
                  {chetna.bio}
                </Reveal>
              </div>
            </div>

            <Portrait
              name={chetna.name}
              role={chetna.role}
              image={chetna.image}
              imageAlt={chetna.imageAlt}
              frame={chetna.frame}
              className="aspect-[3/4] w-full lg:order-2 lg:col-span-4 lg:col-start-9"
              sizes="(max-width: 1024px) 92vw, 32vw"
              drift={9}
            />
          </div>
        </section>
      )}

      {/* ── JUNIOR WING · the turn ────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-teal-900 text-ivory u-rhythm"
        aria-labelledby="junior-heading"
      >
        <RayBurst
          className="pointer-events-none absolute -right-[8%] -top-[10%] w-[38vw] text-saffron/20"
          rays={24}
        />
        <div className="pointer-events-none absolute -left-[12%] bottom-[-24%] h-[48vh] w-[48vh] rounded-full bg-saffron/12 blur-[110px]" />

        <div className="u-shell relative">
          <div className="grid gap-x-14 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Reveal as="p" className="u-label text-saffron">
                {teamPage.junior.label}
              </Reveal>
              <Reveal as="p" delay={0.08} className="u-label mt-3 text-ivory/35">
                {teamPage.junior.formed}
              </Reveal>
            </div>

            <div className="lg:col-span-9">
              <RevealText
                as="h2"
                id="junior-heading"
                lines={teamPage.junior.lines}
                className="u-display text-[clamp(2.2rem,5.2vw,4.4rem)]"
              />
              <Reveal
                as="p"
                delay={0.12}
                className="u-lede mt-7 max-w-2xl text-ivory/65"
              >
                {teamPage.junior.support}
              </Reveal>
            </div>
          </div>

          {/* the wing, named — an index for what follows */}
          <ul className="mt-[clamp(3rem,7vw,5rem)] flex flex-wrap gap-x-7 gap-y-3.5 border-t border-ivory/15 pt-7 lg:ml-[25%]">
            {juniorWing.map((m, i) => (
              <Reveal
                as="li"
                key={m.id}
                delay={i * 0.06}
                y={12}
                duration={0.8}
                className="u-label text-gold-soft/70"
              >
                {m.name}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── JUNIOR WING · the sequence ────────────────────────────── */}
      {juniorWing.map((m, i) => {
        const L = JUNIOR_LAYOUT[i % JUNIOR_LAYOUT.length];
        const n = String(i + 1).padStart(2, "0");

        return (
          <section
            key={m.id}
            className={`relative overflow-hidden ${L.ground} ${
              L.dark ? "text-ivory" : ""
            } py-[clamp(3rem,7vw,6rem)]`}
            aria-labelledby={`${m.id}-name`}
          >
            <div className="u-shell grid items-center gap-x-14 gap-y-10 lg:grid-cols-12">
              <Portrait
                name={m.name}
                role={m.role}
                image={m.image}
                imageAlt={m.imageAlt}
                frame={m.frame}
                className={`${L.aspect} w-full ${L.portrait}`}
                sizes={L.sizes}
                drift={L.drift}
                ledge={L.ledge}
                onDark={L.dark}
              />

              <div className={L.text}>
                <div>
                  <MemberIndex n={n} role={m.role} dark={L.dark} />
                  <RevealText
                    as="h3"
                    id={`${m.id}-name`}
                    lines={[m.name]}
                    className={[
                      "u-display mt-4 text-[clamp(2rem,4.4vw,3.5rem)]",
                      L.dark ? "text-ivory" : "text-teal-700",
                    ].join(" ")}
                  />
                  <Reveal
                    as="p"
                    delay={0.1}
                    className={[
                      "u-body mt-7 max-w-lg",
                      L.dark ? "text-ivory/65" : "text-ink/75",
                    ].join(" ")}
                  >
                    {m.bio}
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CLOSING ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-teal-700 text-ivory u-rhythm">
        <RayBurst
          className="pointer-events-none absolute -bottom-[22%] left-[-10%] w-[34vw] text-gold/15"
          rays={20}
        />

        <div className="u-shell relative grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <RevealText
            as="h2"
            lines={teamPage.closing.lines}
            className="u-display text-[clamp(2.1rem,4.8vw,3.8rem)] lg:col-span-7"
          />

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal as="p" className="u-body text-ivory/70">
              {teamPage.closing.support}
            </Reveal>
            <Reveal delay={0.14} className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton href={teamPage.closing.ctaPrimary.href} tone="light">
                {teamPage.closing.ctaPrimary.label}
              </MagneticButton>
              <MagneticButton
                href={teamPage.closing.ctaSecondary.href}
                variant="outline"
                tone="light"
              >
                {teamPage.closing.ctaSecondary.label}
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>
    </MotionScope>
  );
}
