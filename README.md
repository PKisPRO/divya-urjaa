# Divya Urjaa

A rebuild of divyaurjaa.com — every piece of the old site's content and media
carried across, none of its layout. See [MIGRATION.md](./MIGRATION.md) for the
item-by-item map and [`src/data/content.ts`](./src/data/content.ts) for the
single source of truth for copy.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Stack

Next.js 15 (App Router, all routes static) · TypeScript · Tailwind v4 ·
GSAP + ScrollTrigger (pinned sequences) · Motion (component reveals) ·
Lenis (smooth scroll) · React Three Fiber (the closing flame, lazy-loaded).

## Structure

```
src/
  app/            routes: / · /our-story · /urjaa-deepak · /artisans · /impact · /contact
  components/
    layout/       Header · MobileMenu · Footer · PageTransition · SmoothScroll · CustomCursor
    home/         Hero · BrandStatement · Benefits · ProductExperience · IngredientExperience
                  JourneySequence · ArtisanSequence · VideoStory · ImpactStory
                  CorporateGifting · RitualSequence · FinalFlame · EnergyPath
    brand/        Geometry — the emblem abstracted into arcs, rays and a flame path
    webgl/        FlameCanvas (lazy) + FlameScene (shader flame + embers)
    ui/           RevealText · ImageReveal · Reveal · MagneticButton · Counter · PageHero
  data/content.ts every migrated string
  lib/            motion tokens · useReveal · useParallax
public/images/    brand · hero · process · artisans · story · product · ritual
public/videos/    hero · ritual · story (1080 + 720 renditions)
```

## The hero

`<Hero mode="video" />` renders the flame film; `<Hero mode="image" />` renders a
still. The typography and layout are identical either way — swapping is a
one-word change in [`src/app/page.tsx`](./src/app/page.tsx).

The footage is vertical (9:16). Desktop frames it as an arched portal at native
ratio — nothing is cropped — while a heavily blurred, low-bitrate copy of the
same film fills the rest of the viewport with the room's own light, so a wide
screen never shows bars. Mobile takes it full-bleed, where the crop only trims
the outer edges and never the centred flame.

## Notes for whoever picks this up

- **Colour.** Bright saffron measures ~2.6:1 on ivory, so accent *text* on light
  grounds uses `--color-ember` (≥5:1). Saffron stays for graphics, fills and
  anything on deep teal, where it passes comfortably.
- **Reveals.** Use `useReveal` / `<Reveal>` rather than raw `whileInView`. It
  also treats "already scrolled past" as revealed, so reload-scroll-restoration
  and anchor jumps can't strand content off-screen. Where `whileInView` is used
  directly, the viewport margin is expanded upward (`9999px 0px -10% 0px`) for
  the same reason.
- **Masked headings.** Never put `whileInView` on the inner span of a
  `.u-line-mask`: it's clipped by the mask, so the observer never fires and the
  line stays hidden forever. `RevealText` observes the container instead.
- **Generated SVG.** Round any coordinate computed with `Math.sin`/`cos` — Node
  and the browser disagree in the last digit and it trips hydration.
- **Don't run `next dev` and `next build` at once.** They share `.next`; the dev
  server will clobber the production output and leave a build that serves a
  stale CSS hash.

`.devtools/` holds the Playwright harnesses used to check this build:
`audit.mjs` (viewports, overflow, console, broken images), `behaviour.mjs`
(Instagram sweep, keyboard, reduced motion, WebGL-off, link resolution) and
`migration.mjs` (every old-site string and asset). Run them against a server on
the port set at the top of each file.
