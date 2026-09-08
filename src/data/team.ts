/**
 * DIVYA URJAA — TEAM
 *
 * Single source of truth for the /team page: the people, and the page's own
 * editorial copy.
 *
 * ── FACTUAL SCOPE ────────────────────────────────────────────────────────
 * Names, roles and bios below are supplied verbatim by Chetnagram Sansthan.
 * Nothing here is inferred. No qualifications, ages, schools, awards,
 * social handles, tenure or statistics are recorded, because none were
 * supplied. Leave missing information missing.
 *
 * The one normalisation: the parent organisation is spelled "Chetnagram
 * Sansthan" throughout, matching `brand.parent` in content.ts.
 *
 * ── ADDING A PORTRAIT ────────────────────────────────────────────────────
 * Drop the file into `public/images/team/` and set `image` to its path —
 * that is the only edit required. Set `imageAlt` alongside it (a portrait
 * without alt text is a bug, not a shortcut).
 *
 *     image: "/images/team/reyansh-khaitan.jpg",
 *     imageAlt: "Reyansh Khaitan, Data Management & Sales Head of the Divya Urjaa Junior Wing",
 *
 * While `image` is null the portrait renders as a brand initials plate at
 * the identical aspect ratio, so swapping the real photograph in shifts
 * nothing on the page.
 *
 * Portraits are cropped to the frame's aspect ratio from the centre, biased
 * slightly upward so faces are not cut. Supply portrait-orientation files of
 * at least 1200px on the short edge.
 */

export type TeamSection = "leadership" | "junior";

/** Frame silhouette. Deliberately varied so no two portraits sit in the same
 *  box: `arch` is the temple-niche dome, `cut` clips one corner, `plain` is
 *  a straight editorial crop. Shapes only apply from md upward. */
export type PortraitFrame = "plain" | "arch" | "cut";

export type TeamMember = {
  /** stable key + the filename to use when the portrait arrives */
  id: string;
  name: string;
  role: string;
  bio: string;
  /** `null` until a real photograph exists. Never a stock or generated portrait. */
  image: string | null;
  /** required whenever `image` is set */
  imageAlt: string | null;
  section: TeamSection;
  frame: PortraitFrame;
};

export const team: readonly TeamMember[] = [
  /* ── leadership ─────────────────────────────────────────────────── */
  {
    id: "vibha-agarwal",
    name: "Vibha Agarwal",
    role: "Founder",
    bio: "Founder of Chetnagram Sansthan and Divya Urjaa. She established the initiative with the vision of creating sustainable livelihood opportunities for women while building a meaningful enterprise rooted in traditional products and community impact.",
    image: null,
    imageAlt: null,
    section: "leadership",
    frame: "arch",
  },
  {
    id: "chetna-agarwal",
    name: "Chetna Agarwal",
    role: "Vice President",
    bio: "Supports the organisation’s leadership, growth and community initiatives, working closely across Divya Urjaa’s programmes and operations.",
    image: null,
    imageAlt: null,
    section: "leadership",
    frame: "plain",
  },

  /* ── junior wing ────────────────────────────────────────────────── */
  {
    id: "jai-agarwal",
    name: "Jai Agarwal",
    role: "Founder & Logistics Head",
    bio: "Leads the Junior Wing and oversees day-to-day operations and logistics. He also supports marketing efforts and helps keep Divya Urjaa’s activities coordinated and moving efficiently.",
    image: null,
    imageAlt: null,
    section: "junior",
    frame: "plain",
  },
  {
    id: "aarav-agarwal",
    name: "Aarav Agarwal",
    role: "Founder & Outreach Head",
    bio: "Leads outreach efforts by directly connecting with wholesalers, businesses and prospective buyers. His role is focused on opening new sales opportunities and expanding the reach of Divya Urjaa Deepaks.",
    image: null,
    imageAlt: null,
    section: "junior",
    frame: "cut",
  },
  {
    id: "reyansh-khaitan",
    name: "Reyansh Khaitan",
    role: "Founder, Data Management & Sales Head",
    bio: "Manages sales and data records across the Junior Wing. He helps track revenue generated through Deepak sales and supports transparent management of the proceeds intended for the women artisans.",
    // A photograph exists for Reyansh but was not present in the repository
    // when this page was built. Save it as
    // `public/images/team/reyansh-khaitan.jpg` and set the two fields below.
    image: null,
    imageAlt: null,
    section: "junior",
    frame: "arch",
  },
  {
    id: "ativeer-dhoka",
    name: "Ativeer Dhoka",
    role: "Founder & Outreach Head",
    bio: "Works directly with businesses, wholesalers and potential buyers to introduce Divya Urjaa Deepaks, build relationships and create new sales opportunities.",
    image: null,
    imageAlt: null,
    section: "junior",
    frame: "plain",
  },
  {
    id: "vihaan-shringi",
    name: "Vihaan Shringi",
    role: "Logistics Head",
    bio: "Oversees logistics and operational coordination, helping ensure that activities remain organised, timelines stay on track and the team functions smoothly.",
    image: null,
    imageAlt: null,
    section: "junior",
    frame: "cut",
  },
];

export const leadership = team.filter((m) => m.section === "leadership");
export const juniorWing = team.filter((m) => m.section === "junior");

/** "Vibha Agarwal" → "VA". Used by the placeholder plate. */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

/* ------------------------------------------------------------------ */
/* PAGE COPY                                                           */
/* ------------------------------------------------------------------ */

export const teamPage = {
  hero: {
    eyebrow: "The people behind Divya Urjaa",
    lines: ["Purpose is built", "by people."],
    support:
      "From the women who shaped the vision to the next generation carrying it forward, Divya Urjaa is powered by people who turn purpose into action.",
    /** the contributions named by the organisation — no counts, no claims */
    contributions: [
      "Leadership",
      "Operations",
      "Outreach",
      "Logistics",
      "Sales",
      "Community",
    ],
  },

  leadership: {
    label: "Leadership",
    lines: ["Where the vision", "is held."],
  },

  junior: {
    label: "Junior Wing",
    lines: ["Purpose carried forward", "by the next generation."],
    support:
      "The Junior Wing brings energy to operations, outreach, sales and logistics, helping Divya Urjaa reach more homes, businesses and partners.",
    /** from the Chetnagram timeline already published in content.ts */
    formed: "Formed in 2025",
  },

  closing: {
    lines: ["Different roles.", "One shared purpose."],
    support:
      "Every contribution helps carry Divya Urjaa forward, from the people shaping the vision to the team taking it into the market.",
    ctaPrimary: { label: "Discover Our Story", href: "/our-story" },
    ctaSecondary: { label: "Explore Urjaa Deepak", href: "/urjaa-deepak" },
  },
} as const;
