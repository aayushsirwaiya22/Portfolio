import { useId } from "react";

// Projects without a real screenshot still need a preview, so each one gets
// a generated "plate": a technical drawing built from the project's own
// accent colour. The four variants are deliberately different compositions
// so the section never reads as four copies of the same grey box.
const VARIANTS = ["survey", "contour", "elevation", "orbit"];

export default function ProjectArtwork({ accent, variant = 0, className = "" }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const kind = VARIANTS[variant % VARIANTS.length];
  const gridId = `plate-grid-${uid}`;
  const washId = `plate-wash-${uid}`;

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="var(--border-strong)" strokeWidth="1" />
        </pattern>
        <linearGradient id={washId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.08" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="var(--surface-sunken)" />
      <rect width="800" height="500" fill={`url(#${gridId})`} />
      <rect width="800" height="500" fill={`url(#${washId})`} />

      {kind === "survey" && (
        <g>
          <g fill="none" stroke={accent} strokeWidth="2">
            <circle cx="400" cy="250" r="162" />
            <circle cx="400" cy="250" r="104" strokeOpacity="0.45" />
          </g>
          <circle cx="400" cy="250" r="46" fill={accent} />
          <g stroke={accent} strokeOpacity="0.6" strokeWidth="1.5">
            <path d="M140 250H660" />
            <path d="M400 26V474" />
          </g>
          <g fill="none" stroke={accent} strokeOpacity="0.85" strokeWidth="2">
            <path d="M108 64h30M123 49v30" />
            <path d="M662 436h30M677 421v30" />
          </g>
        </g>
      )}

      {kind === "contour" && (
        <g>
          <g fill="none" stroke={accent} strokeWidth="2">
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse
                key={i}
                cx={268 + i * 52}
                cy={252 - i * 20}
                rx={100 + i * 44}
                ry={58 + i * 26}
                strokeOpacity={0.92 - i * 0.14}
              />
            ))}
          </g>
          <circle cx="268" cy="252" r="30" fill={accent} />
          <path
            d="M268 252L476 172"
            stroke={accent}
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeOpacity="0.7"
          />
        </g>
      )}

      {kind === "elevation" && (
        <g>
          <g fill={accent}>
            {[72, 138, 98, 186, 124, 62, 154].map((h, i) => (
              <rect
                key={i}
                x={108 + i * 84}
                y={404 - h}
                width="48"
                height={h}
                fillOpacity={0.2 + i * 0.09}
              />
            ))}
          </g>
          <g stroke={accent} strokeOpacity="0.55" strokeWidth="1.5">
            <path d="M78 404H722" />
            <path d="M78 404v-9M722 404v-9" />
          </g>
          <g fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1.5">
            <path d="M78 130h644" />
            <path d="M78 130v-9M722 130v-9" />
          </g>
        </g>
      )}

      {kind === "orbit" && (
        <g>
          <g fill="none" stroke={accent} strokeWidth="2">
            <circle cx="378" cy="250" r="182" strokeOpacity="0.22" />
            <circle cx="378" cy="250" r="124" strokeOpacity="0.42" />
            <circle cx="378" cy="250" r="68" strokeOpacity="0.66" />
          </g>
          <path
            d="M196 432L604 66"
            stroke={accent}
            strokeWidth="2"
            strokeDasharray="7 9"
            strokeOpacity="0.7"
            fill="none"
          />
          <circle cx="604" cy="66" r="30" fill={accent} />
          <circle cx="196" cy="432" r="11" fill="none" stroke={accent} strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}
