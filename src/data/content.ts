/**
 * DIVYA URJAA — content source of truth.
 *
 * Every string here is migrated verbatim (or losslessly re-composed) from the
 * previous divyaurjaa.com. Nothing meaningful was invented. See MIGRATION.md
 * for the item-by-item map.
 *
 * The single deliberate override: the Instagram handle. The old site linked
 * `divya__urjaa` (two underscores), which is suspended. The live account is
 * `divya___urjaa` (three underscores).
 */

export const INSTAGRAM_URL = "https://www.instagram.com/divya___urjaa/";
export const EMAIL = "info.divyaurja@gmail.com";
export const SITE_URL = "https://divyaurjaa.com";

export const brand = {
  name: "Divya Urjaa",
  tagline: "Light. Heal. Empower.",
  signature: "Made by hand. Powered by purpose.",
  parent: "Chetnagram Sansthan",
  parentLine: "An initiative of Chetnagram Sansthan",
  descriptor:
    "Sacred, handcrafted diyas from the hands of Rajasthan's village women.",
} as const;

export const nav = [
  { label: "Our Story", href: "/our-story" },
  { label: "Urjaa Deepak", href: "/urjaa-deepak" },
  { label: "Artisans", href: "/artisans" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Urjaa Deepak · Made in Rajasthan",
  /** Old site headline, preserved as the brand statement further down. */
  headline: ["A flame", "shaped by hand."],
  support: "A livelihood illuminated with every light.",
  ctaPrimary: { label: "Discover Urjaa Deepak", href: "/urjaa-deepak" },
  ctaSecondary: { label: "Meet the Women Behind It", href: "/artisans" },
  scrollHint: "Scroll",
} as const;

/* ------------------------------------------------------------------ */
/* BRAND STATEMENT — old homepage intro                                */
/* ------------------------------------------------------------------ */

export const brandStatement = {
  label: "From Rajasthan, with purpose",
  headline: ["Light that heals.", "Pure as prayer."],
  body: [
    "Urjaa Deepak — handcrafted diyas of cow dung, natural herbs, havan samagri, and other traditional ingredients. Made by 50+ women artisans in Rajasthan.",
    "Urjaa Deepak is a handmade diya crafted by 50+ women from a small village in Rajasthan. It brings together cow dung, natural herbs, havan samagri, and other traditional ingredients — purifying the air, elevating spiritual practice, and making daily puja simpler and more meaningful.",
  ],
  pull: "Every Deepak you light supports a woman's livelihood.",
} as const;

/* ------------------------------------------------------------------ */
/* BENEFITS — "One small flame. Three lasting blessings."              */
/* ------------------------------------------------------------------ */

export const benefits = {
  label: "Why Urjaa Deepak",
  headline: "One small flame.\nThree lasting blessings.",
  intro:
    "Every Urjaa Deepak unites spiritual depth, scientific rigor, and ecological care — all in one handcrafted ritual object.",
  items: [
    {
      kind: "Spiritual Benefits",
      title: "Elevates your Pooja",
      body: "The sacred smoke radiates positive energy and creates an atmosphere of calm and devotion. Ideal for daily puja and small havans.",
    },
    {
      kind: "Health Benefits",
      title: "Purifies the Air",
      body: "Kills harmful airborne germs and bacteria. Eliminates foul odours and reduces indoor pollutants naturally. Anti-radioactive — supports a calmer, cleaner space.",
    },
    {
      kind: "Environmental Benefits",
      title: "Good for the Earth",
      body: "100% biodegradable. The ash acts as a natural fertiliser. No plastic, no chemicals — only what nature provides.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* SCIENCE                                                             */
/* ------------------------------------------------------------------ */

export const science = {
  label: "The Science",
  headline: "Backed by Science.",
  intro:
    "What our grandmothers always knew, modern research has begun to prove.",
  closing: "Ancient wisdom, modern proof.",
  findings: [
    {
      figure: "94%",
      body: "reduction in indoor bacteria within 1 hour",
      source: "National Botanical Research Institute, Lucknow",
    },
    {
      figure: "2021",
      body: "Journal of Environmental Sciences: cow dung biochar significantly reduced E. coli & Staphylococcus aureus",
      source: "Journal of Environmental Sciences",
    },
  ],
  notes: [
    {
      title: "The science of havan",
      body: "The medicinal smoke and the act of fire invocation help calm the brain, promoting the release of essential chemicals like serotonin and dopamine, which are vital for focus and memory.",
    },
    {
      title: "Fire gazing",
      body: "By focusing on the flame, children can naturally enhance their neural pathways, transitioning between Alpha and Beta brain waves to boost attention and cognitive speed.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* PRODUCT                                                             */
/* ------------------------------------------------------------------ */

export const product = {
  name: "Urjaa Deepak",
  sku: "UD-001",
  tagline: "The sacred diya, reimagined.",
  price: 399,
  priceLabel: "₹399",
  priceUnit: "per box",
  availability: "In stock · ready to ship",
  contents:
    "Each box contains 30 Urjaa Deepaks with wick, one clay diya to place the Urjaa Deepaks in, and camphor (kapoor).",
  checkoutNote:
    "Checkout with bank transfer or UPI · upload payment screenshot",
  headline: "One deepak. Many blessings.",
  intro:
    "Handcrafted in small batches. Every box ships direct from our village artisans to your altar.",
  gallery: [
    {
      src: "/images/product/box-open.jpg",
      alt: "An open Urjaa Deepak gift box with the Chetnagram Sansthan leaflet, a clay diya and packed handmade deepaks",
    },
    {
      src: "/images/product/box-contents.jpg",
      alt: "The full contents of one Urjaa Deepak box laid out — five packs of deepaks, camphor, a terracotta diya and decorative stones",
    },
    {
      src: "/images/product/box-closed.jpg",
      alt: "The closed Urjaa Deepak box in a red block-printed sleeve reading Empowering Rural Women",
    },
    {
      src: "/images/product/deepaks-flatlay.jpg",
      alt: "Handmade Urjaa Deepaks with cotton wicks, packed and photographed from above",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* INGREDIENTS — only what the old site confirms                       */
/* ------------------------------------------------------------------ */

export const ingredients = {
  label: "Inside the Deepak",
  lead: "Each Urjaa Deepak brings together cow dung, sesame, natural herbs, and havan samagri — blended by hand so the burn stays true to the ritual.",
  items: [
    {
      name: "Cow Dung",
      body: "Used in Ayurveda for centuries. Purifies air, acts as a natural insect repellent, and forms the sacred base of every Deepak.",
    },
    {
      name: "Natural Herbs",
      body: "A thoughtful blend of dried herbs that supports a steady burn and a clean, devotional fragrance.",
    },
    {
      name: "Havan Samagri",
      body: "Traditional havan samagri is folded into the mix so the smoke carries the intention of yajna — suited for both daily puja and small havans.",
    },
  ],
  /** Named in the product lead sentence on the old site. */
  also: "Sesame",
  closing:
    "The full recipe also includes many other natural ingredients, each chosen for how it burns, how it smells, and how it serves the ritual — nothing chemical, nothing hidden.",
} as const;

/* ------------------------------------------------------------------ */
/* RITUAL — the seven steps                                            */
/* ------------------------------------------------------------------ */

export const ritual = {
  label: "The Ritual",
  headline: "How to light the Urjaa Deepak",
  intro: "Seven small steps. One quiet, sacred ritual.",
  steps: [
    {
      n: "01",
      title: "Place",
      body: "Place the Urjaa Deepak in a safe diya stand — copper or clay works best.",
    },
    { n: "02", title: "Wick", body: "Insert the wick into the Urjaa Deepak." },
    {
      n: "03",
      title: "Kapoor",
      body: "Sprinkle a little kapoor (camphor) into the Deepak.",
    },
    { n: "04", title: "Light", body: "Light the Deepak." },
    {
      n: "05",
      title: "Ghee & mantra",
      body: "Gradually add ghee while reciting any mantra of your choice.",
    },
    {
      n: "06",
      title: "Breathe",
      body: "Breathe calmly as the entire Deepak lights up — not only the wick — and let the sacred glow fill your space.",
    },
    {
      n: "07",
      title: "Ash",
      body: "After pooja, the ash can be used as a natural fertiliser.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* ARTISANS                                                            */
/* ------------------------------------------------------------------ */

export const artisans = {
  label: "The makers",
  headline: "The hands behind every flame.",
  intro:
    "The women who shape each Urjaa Deepak by hand — in their own words.",
  people: [
    {
      name: "Guddu devi",
      quote: "हर दीपक के साथ, एक घर और मज़बूत होता है।",
      translation: "With every deepak, one more home grows stronger.",
      image: "/images/artisans/guddu-devi.jpg",
      alt: "Guddu devi, an Urjaa Deepak artisan, photographed in a yellow saree outside her home",
    },
    {
      name: "Hansa Jangid",
      quote: "हर दीपक में एक कहानी है — हमारी।",
      translation: "In every deepak there is a story — ours.",
      image: "/images/artisans/hansa-jangid.jpg",
      alt: "Hansa Jangid, an Urjaa Deepak artisan, photographed in a marigold saree outside her home",
    },
    {
      name: "Sangeeta Sharma",
      quote: "गाँव की मिट्टी से बना, हमारी मेहनत से सजा।",
      translation: "Made from the soil of our village, adorned by our labour.",
      image: "/images/artisans/sangeeta-sharma.jpg",
      alt: "Sangeeta Sharma, an Urjaa Deepak artisan, photographed in a red and orange saree outside her home",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* JOURNEY — process, built from the real photographs                  */
/* ------------------------------------------------------------------ */

export const journey = {
  label: "The Journey",
  headline: "From Rajasthan to your home.",
  steps: [
    {
      n: "01",
      title: "The source",
      body: "It begins in the gaushala. Cow dung — the sacred base of every Deepak — is gathered fresh, the way it has been used in Ayurveda for centuries.",
      image: "/images/process/gaushala.jpg",
      alt: "An Urjaa Deepak artisan sitting beside cattle in the village gaushala",
    },
    {
      n: "02",
      title: "Shaped by hand",
      body: "Cow dung, sesame, natural herbs and havan samagri are blended and pressed into shape by hand — no machines, no moulds beyond a simple tray.",
      image: "/images/process/shaping.jpg",
      alt: "Three women shaping Urjaa Deepaks by hand, with a bowl of natural ingredients beside them",
    },
    {
      n: "03",
      title: "Many hands",
      body: "More than fifty women work together across the village. Skill that was always there — patience, craft, an inherited knowledge of traditional ingredients — finally meets a market.",
      image: "/images/process/collective.jpg",
      alt: "Eleven Urjaa Deepak artisans standing together with trays of freshly made deepaks",
    },
    {
      n: "04",
      title: "Boxed with care",
      body: "Dried deepaks are packed with a cotton wick, a clay diya and camphor, wrapped in a block-printed sleeve, and sent from this village to altars across India.",
      image: "/images/product/box-contents.jpg",
      alt: "The full contents of an Urjaa Deepak box arranged neatly from above",
      /** studio flat-lay — square, so it is not cropped like the reportage */
      square: true,
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* IMPACT — real counter targets recovered from the old RSC payload    */
/* ------------------------------------------------------------------ */

export const impact = {
  label: "Our Impact",
  headline: ["Every deepak you light", "changes a life."],
  intro:
    "We measure success not in units sold, but in households strengthened, skills paid for, and dignity restored.",
  stats: [
    { value: 50, suffix: "+", label: "Women Artisans" },
    { display: "₹5,00,000", label: "Livelihoods Supported" },
    { display: "Rajasthan", label: "Village in Rajasthan" },
    { value: 2016, label: "Year Established" },
  ],
  headlineStats: [
    { value: 50, suffix: "+", label: "Women Artisans Employed" },
    { value: 100, suffix: "%", label: "Natural Ingredients" },
    {
      value: 94,
      suffix: "%",
      label: "Reduction in Airborne Bacteria",
      note: "NBRI Lucknow study",
    },
  ],
  commitment:
    "All profits are reinvested into the welfare and development of the women artisans.",
  commitmentSource: "Our commitment",
  cta: {
    headline: "Support by buying.",
    body: "The most direct way to support these women is to buy a deepak. Every order is a wage, a meal, a step forward.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* OUR STORY                                                           */
/* ------------------------------------------------------------------ */

export const story = {
  label: "About Divya Urjaa",
  headline: ["Purpose-driven.", "Youth-led. Community-rooted."],
  originLabel: "Our Story",
  originHeadline:
    "Rooted in Chetnagram.\nBuilt with the women of one Rajasthan village.",
  paragraphs: [
    "Divya Urjaa began in 2016 as an initiative of Chetnagram Sansthan. It was started by Mrs Vibha Agarwal, President of Chetnagram Sansthan, with the blessings of Gurudev Pandit Shri Ram Sharma Acharya.",
    "Through this initiative, self-help groups (SHGs) and other underprivileged women were brought together and involved in the making of Urjaa Deepak. Since then, it has provided them with meaningful opportunities and has positively transformed their lives.",
    "In 2025, the Junior Wing of Chetnagram Sansthan was formed — and has since helped support and carry this work forward.",
    "We saw that the women of this village had real skill — patience, craft, an inherited knowledge of traditional ingredients — but limited market access. Chetnagram built a bridge: fair livelihoods, dignified work, and a product worthy of every home altar.",
    "Today, handcrafted deepaks travel from this village into homes across India. Every order is a vote for commerce where origin, intention, and impact matter.",
  ],
  blessing: {
    label: "Blessings & leadership",
    quote:
      "With the blessings of Gurudev Pandit Shri Ram Sharma Acharya, and under the leadership of Mrs Vibha Agarwal, Divya Urjaa carries light from our village into yours.",
    source: "Chetnagram Sansthan",
  },
  video: {
    label: "About Divya Urjaa",
    headline: "See the story in motion.",
    body: "A short overview of who we are, what we make, and the women behind every flame.",
  },
  ngo: {
    label: "The NGO behind us",
    name: "Chetnagram Sansthan",
    body: "A community-rooted NGO operating in rural Rajasthan since 2015 — reaching 187+ villages with medical camps, plantation drives, women's livelihood programmes, and Divya Urjaa.",
  },
  timeline: [
    { when: "2015", what: "Chetnagram Sansthan founded" },
    {
      when: "2016",
      what: "Divya Urjaa begins — Chetnagram Sansthan initiative (Mrs Vibha Agarwal, with blessings of Gurudev Pandit Shri Ram Sharma Acharya)",
    },
    {
      when: "Reach",
      what: "Chetnagram has helped over 187 villages since it began — expanding outreach across rural Rajasthan.",
    },
    {
      when: "Ongoing",
      what: "Women empowerment through skill development camps: stitching, beauty, yoga, technology",
    },
    {
      when: "Ongoing",
      what: "Cleanliness drives, nasha mukti, renovation of anganbadi schools — community-led and ongoing",
    },
    { when: "Ongoing", what: "Kanyadan for the needy — ongoing" },
    {
      when: "Ongoing",
      what: "Punswan sanskar — pooja for pregnant women — ongoing",
    },
    { when: "Ongoing", what: "Free medical camps for villagers — ongoing" },
    { when: "Ongoing", what: "Annual plantation drives — ongoing" },
    {
      when: "2025",
      what: "Junior Wing of Chetnagram Sansthan formed — supports Divya Urjaa today",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* GIFTING — supported by the old contact page's bulk/CSR copy         */
/* ------------------------------------------------------------------ */

export const gifting = {
  label: "Corporate & festive gifting",
  headline: "A gift with meaning\nbeyond the moment.",
  body: "For bulk orders, NGO partnerships, or CSR gifting, reach out directly. Each box arrives in a block-printed sleeve, handmade by the women of one Rajasthan village.",
  cta: "Enquire for Bulk Orders",
} as const;

/* ------------------------------------------------------------------ */
/* TESTIMONIALS — de-duplicated (old site repeated the first)          */
/* ------------------------------------------------------------------ */

export const testimonials = {
  label: "From our community",
  headline: "Carried into homes across India.",
  items: [
    {
      quote:
        "Lighting the Urjaa Deepak every morning has changed our puja routine completely. The fragrance is so calming.",
      name: "Priya S.",
      location: "Jaipur",
    },
    {
      quote:
        "Such a meaningful product. Love that it supports village women and is 100% natural.",
      name: "Meera K.",
      location: "Delhi",
    },
    {
      quote: "Burns cleanly, no harsh smoke. Perfect for our daily havan.",
      name: "Rajesh T.",
      location: "Mumbai",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* FAQ — answers recovered from the old JS bundle                      */
/* ------------------------------------------------------------------ */

export const faq = [
  {
    q: "What is the price of Urjaa Deepak?",
    a: "Pricing is ₹399 per box — not per single Deepak. Each box contains 30 Urjaa Deepaks with wick, one clay diya to place the Urjaa Deepaks in, and camphor (kapoor).",
  },
  {
    q: "How long does one Deepak burn?",
    a: "About 15–20 minutes if you keep adding ghee gradually as it burns.",
  },
  {
    q: "Is it safe for children and pets?",
    a: "Yes. All ingredients are 100% natural with no chemical additives.",
  },
  {
    q: "Can it be used for havan?",
    a: "Absolutely — it is designed specifically for both daily puja and small havans.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* CONTACT                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  label: "Contact",
  headline: ["Get in", "touch."],
  intro:
    "For bulk orders, NGO partnerships, or CSR gifting, reach out directly. We respond to every message — usually within a day or two.",
  quote:
    "Every conversation is an opportunity — for partnership, for purpose, or for a single, well-lit deepak.",
  mediaNote: "For media enquiries, email us at",
  subjects: ["General Enquiry", "Bulk Order", "Partnership", "Media"],
  channels: [
    {
      title: "General enquiries",
      body: "Questions about the Deepak, your order, or the ritual itself.",
      href: `mailto:${EMAIL}`,
      value: EMAIL,
    },
    {
      title: "Corporate & bulk orders",
      body: "Festive gifting, CSR programmes and volume pricing.",
      href: `mailto:${EMAIL}?subject=Bulk%20Order`,
      value: EMAIL,
    },
    {
      title: "Partnerships",
      body: "NGO collaborations and work with Chetnagram Sansthan.",
      href: `mailto:${EMAIL}?subject=Partnership`,
      value: EMAIL,
    },
    {
      title: "Follow the journey",
      body: "New batches, the women behind them, and light from the village.",
      href: INSTAGRAM_URL,
      value: "@divya___urjaa",
      external: true,
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* FINAL MOMENT                                                        */
/* ------------------------------------------------------------------ */

export const finale = {
  headline: "Every flame\ncarries a story.",
  body: "One box. Thirty deepaks. Fifty women whose work you can hold in your hand.",
  cta: "Bring Urjaa Home",
} as const;
