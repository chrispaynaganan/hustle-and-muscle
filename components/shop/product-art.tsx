import type { ProductArtKind } from "@/lib/products";

/**
 * Illustrated product shots drawn in SVG, so the shop works without product photography.
 * Swap for real photos later by replacing <ProductArt> with next/image.
 */
export function ProductArt({ kind, color, className = "" }: { kind: ProductArtKind; color: string; className?: string }) {
  const light = isLight(color);
  const ink = light ? "#111111" : "#ffffff";
  const accent = color.toLowerCase() === "#fe4203" ? "#ffffff" : "#fe4203";

  return (
    <svg viewBox="0 0 400 400" role="img" aria-hidden className={className}>
      <defs>
        <radialGradient id={`glow-${kind}-${color.slice(1)}`} cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#fe4203" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fe4203" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`shade-${kind}-${color.slice(1)}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
          <stop offset="35%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#glow-${kind}-${color.slice(1)})`} />
      <ellipse cx="200" cy="335" rx="120" ry="14" fill="#000" opacity="0.5" />
      <Shape kind={kind} color={color} ink={ink} accent={accent} shade={`url(#shade-${kind}-${color.slice(1)})`} />
    </svg>
  );
}

function Monogram({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) {
  // Simplified HM block monogram from the logo.
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <rect x="0" y="0" width="60" height="38" fill="none" stroke={fill} strokeWidth="3" />
      <rect x="8" y="7" width="9" height="24" />
      <rect x="17" y="15" width="8" height="8" />
      <rect x="25" y="7" width="9" height="24" />
      <rect x="36" y="7" width="7" height="24" />
      <rect x="45" y="7" width="7" height="24" />
    </g>
  );
}

function Shape({ kind, color, ink, accent, shade }: { kind: ProductArtKind; color: string; ink: string; accent: string; shade: string }) {
  switch (kind) {
    case "tub":
      return (
        <g>
          <rect x="120" y="92" width="160" height="34" rx="8" fill="#151515" />
          <rect x="112" y="120" width="176" height="210" rx="14" fill={color} />
          <rect x="112" y="120" width="176" height="210" rx="14" fill={shade} />
          <rect x="112" y="178" width="176" height="86" fill={ink} opacity="0.08" />
          <Monogram x={170} y={150} fill={ink} />
          <text x="200" y="222" textAnchor="middle" fontSize="20" fontWeight="700" fill={ink} fontFamily="system-ui, sans-serif">HUSTLE FUEL</text>
          <rect x="150" y="238" width="100" height="6" fill={accent} />
        </g>
      );
    case "pouch":
      return (
        <g>
          <path d="M130 90h140l12 240H118Z" fill={color} />
          <path d="M130 90h140l12 240H118Z" fill={shade} />
          <rect x="130" y="90" width="140" height="18" fill="#000" opacity="0.25" />
          <Monogram x={170} y={150} fill={ink} />
          <text x="200" y="225" textAnchor="middle" fontSize="18" fontWeight="700" fill={ink} fontFamily="system-ui, sans-serif">HUSTLE FUEL</text>
          <rect x="155" y="240" width="90" height="5" fill={accent} />
        </g>
      );
    case "pills":
      return (
        <g>
          <rect x="150" y="96" width="100" height="40" rx="6" fill="#f5f5f5" />
          <rect x="140" y="130" width="120" height="200" rx="18" fill={color} />
          <rect x="140" y="130" width="120" height="200" rx="18" fill={shade} />
          <rect x="140" y="180" width="120" height="96" fill="#fff" opacity="0.9" />
          <Monogram x={176} y={194} s={0.8} fill="#111" />
          <text x="200" y="260" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111" fontFamily="system-ui, sans-serif">HUSTLE FUEL</text>
        </g>
      );
    case "tee":
    case "tank":
      return (
        <g>
          {kind === "tee" ? (
            <path d="M150 80c10 18 90 18 100 0l70 34-24 52-30-12v170H134V154l-30 12-24-52Z" fill={color} />
          ) : (
            <path d="M160 80c6 30 74 30 80 0h18c-2 40 10 60 20 74v170H122V154c10-14 22-34 20-74Z" fill={color} />
          )}
          <path d="M150 80c10 18 90 18 100 0" fill="none" stroke="#000" strokeOpacity="0.3" strokeWidth="6" />
          <Monogram x={170} y={150} fill={ink} />
          <text x="200" y="212" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="2" fill={ink} fontFamily="system-ui, sans-serif">HUSTLE &amp; MUSCLE</text>
        </g>
      );
    case "hoodie":
      return (
        <g>
          <path d="M160 70c0-14 80-14 80 0l20 20 64 40-28 66-26-14v162H130V182l-26 14-28-66 64-40Z" fill={color} />
          <path d="M170 76c4 34 56 34 60 0" fill="#000" opacity="0.35" />
          <rect x="150" y="262" width="100" height="48" rx="6" fill="#000" opacity="0.18" />
          <Monogram x={170} y={160} fill={ink} />
          <path d="M192 104v40M208 104v40" stroke={ink} strokeWidth="3" />
        </g>
      );
    case "cap":
      return (
        <g>
          <path d="M100 250c0-90 50-130 100-130s100 40 100 130Z" fill={color} />
          <path d="M100 250c0-90 50-130 100-130s100 40 100 130Z" fill={shade} />
          <path d="M90 248h230c30 0 40 30 0 34H120c-30 0-40-34-30-34Z" fill="#000" opacity="0.6" />
          <circle cx="200" cy="124" r="6" fill="#000" opacity="0.4" />
          <Monogram x={170} y={176} fill={accent} />
        </g>
      );
    case "shaker":
      return (
        <g>
          <rect x="160" y="70" width="80" height="26" rx="6" fill="#111" />
          <rect x="150" y="92" width="100" height="36" rx="6" fill="#222" />
          <path d="M152 128h96l-8 200h-80Z" fill={color} />
          <path d="M152 128h96l-8 200h-80Z" fill={shade} />
          <Monogram x={176} y={200} s={0.8} fill={ink} />
          {[160, 180, 280, 300].map((y) => (
            <rect key={y} x="234" y={y} width="10" height="2" fill={ink} opacity="0.5" />
          ))}
        </g>
      );
    case "towel":
      return (
        <g>
          <path d="M110 120h180v180c0 20-20 30-40 30H110Z" fill={color} />
          <path d="M110 120h180v40H110Z" fill="#000" opacity="0.25" />
          <path d="M250 300c0 20 20 30 40 30V300Z" fill="#000" opacity="0.3" />
          <rect x="110" y="260" width="180" height="8" fill="#fe4203" />
          <Monogram x={170} y={190} fill="#fff" />
        </g>
      );
    case "duffel":
      return (
        <g>
          <path d="M160 160c0-60 80-60 80 0" fill="none" stroke="#333" strokeWidth="12" />
          <rect x="80" y="160" width="240" height="160" rx="70" fill={color} />
          <rect x="80" y="160" width="240" height="160" rx="70" fill={shade} />
          <path d="M110 200h180" stroke="#fe4203" strokeWidth="5" strokeDasharray="10 6" />
          <Monogram x={170} y={232} fill="#fff" />
        </g>
      );
    case "straps":
      return (
        <g>
          <path d="M120 100c-20 0-30 20-30 40v150c0 20 20 30 40 30h20V100Z" fill="#222" />
          <rect x="130" y="100" width="40" height="230" rx="6" fill={color} />
          <rect x="230" y="70" width="40" height="230" rx="6" fill={color} />
          <path d="M270 70c20 0 30 20 30 40v150c0 20-20 30-40 30" fill="none" stroke="#222" strokeWidth="18" />
          <text x="150" y="220" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" transform="rotate(-90 150 220)" fontFamily="system-ui, sans-serif">HUSTLE</text>
          <text x="250" y="190" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" transform="rotate(-90 250 190)" fontFamily="system-ui, sans-serif">MUSCLE</text>
        </g>
      );
  }
}

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
}
