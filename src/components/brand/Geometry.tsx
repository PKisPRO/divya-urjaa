/**
 * Geometry abstracted from the Divya Urjaa emblem.
 *
 * The emblem is built from four ideas: a broken circular ring (two arcs that
 * chase each other), a sunburst, a flame/lotus petal, and a long flowing
 * curve that becomes hair, fabric and leaf. Those four shapes — not the logo
 * itself — are what recur across the site as framing, transitions and trails.
 */

export function BrokenRing({
  className = "",
  strokeWidth = 1,
  gap = 38,
}: {
  className?: string;
  strokeWidth?: number;
  /** degrees of open space at each end of the two arcs */
  gap?: number;
}) {
  const r = 49;
  // rounded: Math.sin/cos are not bit-identical between Node and the browser,
  // and the raw values differ in the last digit, which trips hydration
  const round = (n: number) => Number(n.toFixed(3));
  const arc = (from: number, to: number) => {
    const p = (deg: number) => {
      const a = ((deg - 90) * Math.PI) / 180;
      return [round(50 + r * Math.cos(a)), round(50 + r * Math.sin(a))];
    };
    const [x1, y1] = p(from);
    const [x2, y2] = p(to);
    const large = to - from > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <path
        d={arc(gap / 2, 180 - gap / 2)}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d={arc(180 + gap / 2, 360 - gap / 2)}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export function RayBurst({
  className = "",
  rays = 16,
  inner = 17,
  outer = 46,
}: {
  className?: string;
  rays?: number;
  inner?: number;
  outer?: number;
}) {
  const round = (n: number) => Number(n.toFixed(3));
  const lines = Array.from({ length: rays }, (_, i) => {
    const a = ((i * 360) / rays - 90) * (Math.PI / 180);
    const len = i % 2 ? inner + (outer - inner) * 0.45 : outer;
    return {
      x1: round(50 + inner * Math.cos(a)),
      y1: round(50 + inner * Math.sin(a)),
      x2: round(50 + len * Math.cos(a)),
      y2: round(50 + len * Math.sin(a)),
      key: i,
    };
  });
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      {lines.map((l) => (
        <line
          key={l.key}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="currentColor"
          strokeWidth="0.7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/** The flame/petal at the heart of the emblem — a teardrop with a pinched tip
 *  and shoulders that flare like a lotus. */
export const FLAME_PATH =
  "M50 4 C 57 22, 72 32, 72 50 C 72 66, 62 78, 50 78 C 38 78, 28 66, 28 50 C 28 32, 43 22, 50 4 Z";

export function FlameGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 82" fill="none" className={className} aria-hidden>
      <path d={FLAME_PATH} fill="currentColor" />
    </svg>
  );
}

/** The long S-curve that reads as hair, sari fabric and rising smoke.
 *  Used as the scrolling energy trail. */
export const ENERGY_CURVE =
  "M 50 0 C 50 90, 8 120, 8 210 C 8 300, 92 320, 92 410 C 92 500, 22 520, 22 610 C 22 700, 78 716, 62 800 C 54 842, 50 880, 50 920";
