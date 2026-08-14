# Divya Urjaa — Content & Media Migration Map

Source of truth: `https://divyaurjaa.com` (Next.js, routes `/`, `/about`, `/product`, `/impact`, `/contact`)
plus the original project archive `Divya urjaa.rar` (camera originals + unpublished assets).

**Rule:** every unique meaningful item below has exactly one destination. Repeated items on the old
site are preserved once, in their strongest location.

---

## A. MEDIA INVENTORY (12 unique photos, 2 videos, 4 logo files)

### Camera originals — 5504 × 4128 (from archive, NOT the downscaled live-site versions)

| # | Original | Subject | Live-site aliases | New destination |
|---|----------|---------|-------------------|-----------------|
| 1 | `DSC08741.JPG` | Artisan laughing beside cows in the gaushala | `dsc08741.jpg`, `one-deepak-many-blessings-dsc08741.*`, `product-2.*` | Journey step 01 "The Source" + Brand Statement |
| 2 | `DSC08747.JPG` | Eleven artisans standing together with ingredients + raw deepaks | `dsc08747.jpg`, `product-1.*`, `what-is-urjaa-deepak.*` | Journey step 03 "Many Hands" + Impact page |
| 3 | `DSC08749.JPG` | Three women hand-shaping deepaks, ingredient bowl in frame | `dsc08749.jpg`, `one-deepak-many-blessings-dsc08749.*`, `product-3.*` | **HOMEPAGE HERO** + Journey step 02 |
| 4 | `DSC08763.JPG` | Portrait — Guddu devi (yellow saree) | `impact/maker-1.*` | Artisan sequence #1 |
| 5 | `DSC08765.JPG` | Portrait — Hansa Jangid (marigold saree) | `impact/maker-2.*` | Artisan sequence #2 |
| 6 | `DSC08767.JPG` | Portrait — Sangeeta Sharma (red bandhani) | `impact/maker-3.*` | Artisan sequence #3 |
| 7 | `DSC09556.JPG` | The collective on Chetnagram steps, fists raised | `about-banner-dsc09556.jpg`, `about-team.*`, `product-4.*` | Impact hero + Our Story community section |

### Product photography — 1024 × 1024

| # | Original | Subject | New destination |
|---|----------|---------|-----------------|
| 8 | `IMG_9176.PNG` | Open gift box: kraft insert, Chetnagram leaflet, clay diya, packed deepaks | Product experience — pinned scroll frame 1 + gallery |
| 9 | `IMG_9177.PNG` | Packed deepaks flat lay with stone tray | Product gallery + Gifting |
| 10 | `IMG_9178.PNG` | Closed box — Kalamkari print, "Empowering Rural Women" band | Gifting section + gallery |
| 11 | `IMG_9179.PNG` | Full box contents laid out (5 packs, camphor, clay diya, stones) | "What's in each box" + gallery |

### Flame / ritual — 768 × 1024 (only resolution that exists)

| # | Original | Subject | New destination |
|---|----------|---------|-----------------|
| 12 | `hero-light-prayer.jpg` (= `WhatsApp Image 2026-03-24`) | Tall havan flame in copper kund at home altar, Gurudev's portrait behind | Ritual sequence finale + Final Flame moment. Used dark/vignetted where its lower resolution is invisible. **Not** used as the hero — too small for full-bleed. |

### Video

The archive holds `divya-urjaa-overview.mp4` and `Divya urjaa 06 Reel caption.mp4`.
They are **byte-identical** (same MD5) — the old site had exactly one film, not two.

| # | Source | Native | Shipped as | Destination |
|---|--------|--------|-----------|-------------|
| V1 | `divya-urjaa-overview.mp4` (3840×2160, 43 s, 287 MB) | landscape, spoken testimony + burnt-in English subtitles | `story-1080.mp4` 20 MB · `story-720.mp4` 7.8 MB · `story-poster.jpg` | `/our-story` and `/impact` — poster-first, plays with sound on a deliberate press (it has narration, so it is never a muted background loop); homepage carries a teaser |
| V2 | `C9450.MP4` (client-supplied, 2160×3840 vertical, 6.7 s) | lit Urjaa Deepak, tall flame at a home altar | `hero-1080.mp4` 4 MB · `hero-720.mp4` 2 MB · `hero-ambient.mp4` 172 KB · `hero-flame-poster.jpg` | **Homepage hero** |
| V3 | `C9448.MP4` (client-supplied, 2160×3840 vertical, 4.3 s) | a hand adding ghee to a burning deepak | `ritual-1080.mp4` 3 MB · `ritual-720.mp4` 820 KB · `ritual-poster.jpg` | Ritual sequence (homepage + product page) — it *is* step 05, "Gradually add ghee" |

Both client clips carry a 90° rotation matrix; the rotation is baked into the
transcodes rather than left to the browser. Originals are never shipped.

**Hero composition.** The footage is 9:16, so it is never stretched across a
wide screen. Desktop puts it in an arched portal at native ratio (nothing
cropped) with a heavily blurred copy of the same film washing the viewport in
the room's own light; mobile takes it full-bleed, where a 9:16 clip in a
~9:19.5 viewport trims only the outer edges and never the centred flame.
`<Hero mode="image" />` switches the whole stage to a still without touching
the typography or layout.

### Brand assets (supplied — used as-is, never redrawn)

- `full logo.png` 6250² — full lockup (emblem + wordmark)
- `logo Divya Urjaa.png` 6250² — emblem + wordmark, transparent
- `divya_urjaa_enhanced.png` 3200² — enhanced emblem
- `text only.png` / `logo-text.webp` 3928 × 432 — wordmark only

---

## B. WRITTEN CONTENT MIGRATION

### Old `/` (homepage)

| Old content | New destination |
|---|---|
| "Urjaa Deepak · Made in Rajasthan" eyebrow | Hero eyebrow |
| "Light that heals. Pure as prayer." | Preserved — Brand Statement section |
| Hero paragraph (handcrafted diyas of cow dung, herbs, havan samagri, 50+ women) | Hero support + Brand Statement |
| "An initiative of Chetnagram Sansthan" | Header/footer + Our Story |
| Ingredient chips: Cow Dung / Natural Herbs / Havan Samagri | Ingredient experience (emoji removed) |
| Stats: 50+ artisans, 100% natural, 94% bacteria reduction (*NBRI Lucknow) | Impact story band — **real values recovered from RSC payload; old site rendered `0` pre-animation** |
| "Made by hand. Powered by purpose." | Footer signature |
| "What is Urjaa Deepak?" + body | Brand Statement / product page intro |
| "Every Deepak you light supports a woman's livelihood." | Impact connection |
| "One small flame. Three lasting blessings." + 3 benefit blocks (Spiritual/Health/Environmental) | Benefits section — restyled, emoji removed |
| Science block: 94% NBRI, 2021 Journal of Environmental Sciences, science of havan, fire gazing, "Ancient wisdom, modern proof." | Science section (product page + homepage) |
| "One deepak. Many blessings." + ₹399/box | Product experience |
| 3 testimonials (Priya S. Jaipur, Meera K. Delhi, Rajesh T. Mumbai) | Retained once, de-duplicated (old site repeated Priya twice) |

### Old `/about`

| Old content | New destination |
|---|---|
| "Purpose-driven. Youth-led. Community-rooted." | `/our-story` hero |
| Founding story: began 2016, Chetnagram Sansthan, Mrs Vibha Agarwal, blessings of Gurudev Pandit Shri Ram Sharma Acharya | `/our-story` origin |
| SHG paragraph, Junior Wing 2025, skill/market-access paragraph, "commerce where origin matters" | `/our-story` narrative |
| Blessings & leadership pull-quote | `/our-story` quote moment |
| Overview video + "See the story in motion." | `/our-story` cinematic video |
| Chetnagram Sansthan description (since 2015, 187+ villages) | `/our-story` NGO section |
| Full timeline: 2015 founded → 2016 Divya Urjaa → Reach 187 villages → 6 ongoing programmes → 2025 Junior Wing | `/our-story` timeline |
| "All profits are reinvested into the welfare and development of the women artisans." | `/our-story` + Impact |
| 7-step ritual (Place → Wick → Kapoor → Light → Ghee & mantra → Breathe → Ash) | Ritual sequence (homepage + product page) |
| 4 FAQs incl. answers recovered from JS bundle (₹399/box·30 deepaks; 15–20 min burn; safe, no chemicals; yes for havan) | Product page FAQ |

### Old `/product`

| Old content | New destination |
|---|---|
| "Urjaa Deepak — The sacred diya, reimagined." | `/urjaa-deepak` hero |
| ₹399 per box, SKU UD-001, quantity picker, In stock · ready to ship | Product page purchase block |
| "Each box contains 30 Urjaa Deepaks with wick, one clay diya…, and camphor (kapoor)." | What's in each box |
| "Checkout with bank transfer or UPI · upload payment screenshot" | Purchase note — preserved verbatim |
| Ingredients: cow dung, sesame, natural herbs, havan samagri + per-ingredient bodies | Ingredient experience |
| "The full recipe also includes many other natural ingredients…" | Ingredient closing note |
| 4-image gallery | Product gallery |

### Old `/impact`

| Old content | New destination |
|---|---|
| "Every deepak you light changes a life." + measurement paragraph | `/impact` hero |
| Stats: 50+ Women Artisans, ₹5,00,000 Livelihoods Supported, Rajasthan, 2016 Year Established | `/impact` statistics |
| "Behind every flame, a name." | Artisan sequence heading |
| Guddu devi — "हर दीपक के साथ, एक घर और मज़बूत होता है।" | Artisan #1 |
| Hansa Jangid — "हर दीपक में एक कहानी है — हमारी।" | Artisan #2 |
| Sangeeta Sharma — "गाँव की मिट्टी से बना, हमारी मेहनत से सजा।" | Artisan #3 |
| "Support by buying." block | Impact CTA |

### Old `/contact`

| Old content | New destination |
|---|---|
| "Get in touch." + response-time paragraph | `/contact` hero |
| `info.divyaurja@gmail.com` | Contact — general + media |
| Instagram handle | **Replaced** with `https://www.instagram.com/divya___urjaa/` |
| Media enquiries block | Contact — media |
| "Every conversation is an opportunity…" quote | Contact quote |
| Form: name, email, subject (General/Bulk/Partnership/Media), message | Contact form |

---

## C. CORRECTIONS APPLIED

1. **Instagram** — old site links `instagram.com/divya__urjaa/` (two underscores, suspended) in header,
   footer, contact page and mobile menu. Every occurrence replaced with
   `https://www.instagram.com/divya___urjaa/` (three underscores). Zero references to the old handle remain.
2. **Counters** — old site shipped `0+` / `0%` / `0` in server HTML because the count-up only ran on
   viewport entry. Real targets read from the RSC payload: `50`, `100`, `94`, `2016`.
3. **Broken hero asset** — `hero-light-prayer.jpg` intermittently 503s on the live host; served locally.
4. **Duplicate testimonial** — old site rendered Priya S. twice in the marquee; kept once.
5. **Video weight** — 183 MB / 287 MB source files transcoded for web delivery.

## D. HELD BACK PENDING CLIENT CONFIRMATION

- Two phone numbers are printed on the product packaging sleeve (visible in `IMG_9178` /
  `box-closed.jpg`). They appear nowhere on the current website, so they are **not published** in
  this build and are not reproduced here. Confirm they are current before adding them to `/contact`.
