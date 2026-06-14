"use client";

import type { FallbackSpec } from "@/lib/media/placeholder-library";

interface FallbackArtProps {
  spec: FallbackSpec;
  className?: string;
}

export function VehicleSilhouette({ spec, className }: FallbackArtProps) {
  const stroke = spec.accent;
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="200" cy="170" rx="160" ry="12" fill="rgba(0,0,0,0.35)" />
      <path
        d="M60 130 Q80 95 130 88 L170 82 Q200 78 230 82 L270 88 Q320 95 340 130 L350 138 Q355 145 340 148 L60 148 Q45 145 60 130Z"
        fill="rgba(255,255,255,0.06)"
        stroke={stroke}
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <path
        d="M130 88 L155 72 Q175 65 200 65 Q225 65 245 72 L270 88"
        stroke={stroke}
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <circle cx="110" cy="148" r="22" fill="rgba(0,0,0,0.4)" stroke={stroke} strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="290" cy="148" r="22" fill="rgba(0,0,0,0.4)" stroke={stroke} strokeWidth="1" strokeOpacity="0.3" />
      <rect x="175" y="95" width="50" height="28" rx="4" fill="rgba(255,255,255,0.04)" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.25" />
    </svg>
  );
}

export function CockpitSilhouette({ spec, className }: FallbackArtProps) {
  const stroke = spec.accent;
  return (
    <svg viewBox="0 0 400 240" className={className} aria-hidden fill="none">
      <path
        d="M40 180 Q60 120 120 100 L280 100 Q340 120 360 180"
        stroke={stroke}
        strokeWidth="1.5"
        strokeOpacity="0.35"
        fill="rgba(255,255,255,0.03)"
      />
      <rect x="130" y="70" width="140" height="80" rx="8" fill="rgba(0,0,0,0.3)" stroke={stroke} strokeWidth="1.2" strokeOpacity="0.45" />
      <rect x="145" y="85" width="110" height="50" rx="4" fill="rgba(74,155,142,0.15)" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.5" />
      <circle cx="90" cy="155" r="28" fill="rgba(255,255,255,0.04)" stroke={stroke} strokeWidth="1" strokeOpacity="0.3" />
      <line x1="160" y1="95" x2="240" y2="95" stroke={stroke} strokeWidth="0.6" strokeOpacity="0.25" />
      <line x1="160" y1="110" x2="220" y2="110" stroke={stroke} strokeWidth="0.6" strokeOpacity="0.2" />
      <line x1="160" y1="125" x2="200" y2="125" stroke={stroke} strokeWidth="0.6" strokeOpacity="0.15" />
    </svg>
  );
}

export function FamilySilhouette({ spec, className }: FallbackArtProps) {
  const stroke = spec.accent;
  return (
    <svg viewBox="0 0 400 220" className={className} aria-hidden fill="none">
      <ellipse cx="200" cy="185" rx="140" ry="10" fill="rgba(0,0,0,0.3)" />
      <path
        d="M80 155 Q95 125 140 118 L260 118 Q305 125 320 155"
        fill="rgba(255,255,255,0.04)"
        stroke={stroke}
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <circle cx="160" cy="100" r="14" fill="rgba(255,255,255,0.12)" stroke={stroke} strokeWidth="1" />
      <circle cx="200" cy="95" r="16" fill="rgba(255,255,255,0.15)" stroke={stroke} strokeWidth="1" />
      <circle cx="240" cy="100" r="12" fill="rgba(255,255,255,0.1)" stroke={stroke} strokeWidth="1" />
      <path d="M150 115 Q160 140 170 155" stroke={stroke} strokeWidth="1.2" strokeOpacity="0.4" />
      <path d="M190 112 Q200 145 210 160" stroke={stroke} strokeWidth="1.2" strokeOpacity="0.4" />
      <path d="M235 112 Q245 138 250 152" stroke={stroke} strokeWidth="1.2" strokeOpacity="0.35" />
    </svg>
  );
}

export function WarrantyCard({ spec, className }: FallbackArtProps) {
  const stroke = spec.accent;
  return (
    <svg viewBox="0 0 400 120" className={className} aria-hidden fill="none">
      <line x1="40" y1="60" x2="360" y2="60" stroke={stroke} strokeWidth="2" strokeOpacity="0.5" />
      <circle cx="80" cy="60" r="18" fill="rgba(200,169,110,0.2)" stroke={stroke} strokeWidth="2" />
      <text x="80" y="65" textAnchor="middle" fill={stroke} fontSize="11" fontWeight="600">
        5
      </text>
      <circle cx="200" cy="60" r="18" fill="rgba(200,169,110,0.12)" stroke={stroke} strokeWidth="1.5" strokeOpacity="0.6" />
      <text x="200" y="65" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="500" opacity="0.8">
        3
      </text>
      <circle cx="320" cy="60" r="18" fill="rgba(200,169,110,0.08)" stroke={stroke} strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="320" y="65" textAnchor="middle" fill={stroke} fontSize="10" fontWeight="500" opacity="0.6">
        5
      </text>
      <text x="80" y="95" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
        AÑOS
      </text>
      <text x="200" y="95" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
        AÑOS
      </text>
      <text x="320" y="95" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9">
        150K KM
      </text>
    </svg>
  );
}

export function SafetyCard({ spec, className }: FallbackArtProps) {
  const stroke = spec.accent;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none">
      <path
        d="M100 30 L160 55 L160 110 Q160 155 100 175 Q40 155 40 110 L40 55 Z"
        fill="rgba(74,155,142,0.12)"
        stroke={stroke}
        strokeWidth="2"
        strokeOpacity="0.6"
      />
      <path
        d="M75 100 L95 125 L130 80"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="100" y="155" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10">
        8 AIRBAGS
      </text>
    </svg>
  );
}

export function CompareCard({ spec, className }: FallbackArtProps) {
  const left = spec.accent;
  const right = spec.secondaryAccent ?? "#8E8E93";
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden fill="none">
      <line x1="200" y1="30" x2="200" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="50" y="60" width="120" height="80" rx="8" fill="rgba(74,155,142,0.1)" stroke={left} strokeWidth="1.5" strokeOpacity="0.5" />
      <text x="110" y="108" textAnchor="middle" fill={left} fontSize="12" fontWeight="600">
        GS4 MAX
      </text>
      <rect x="230" y="60" width="120" height="80" rx="8" fill="rgba(255,255,255,0.04)" stroke={right} strokeWidth="1.5" strokeOpacity="0.5" />
      <text x="290" y="108" textAnchor="middle" fill={right} fontSize="11" fontWeight="500">
        COROLLA
      </text>
    </svg>
  );
}

export function RouteMap({ spec, className }: FallbackArtProps) {
  const stroke = spec.accent;
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden fill="none">
      <path
        d="M60 140 Q120 80 200 100 T340 60"
        stroke={stroke}
        strokeWidth="2"
        strokeOpacity="0.5"
        strokeDasharray="6 4"
        fill="none"
      />
      <circle cx="60" cy="140" r="8" fill={stroke} fillOpacity="0.6" />
      <circle cx="200" cy="100" r="6" fill={stroke} fillOpacity="0.4" />
      <circle cx="340" cy="60" r="8" fill={stroke} fillOpacity="0.6" />
      <text x="60" y="165" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">
        SHOWROOM
      </text>
      <text x="340" y="50" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">
        DOBLE VÍA
      </text>
    </svg>
  );
}

export function FinancingCard({ spec, className }: FallbackArtProps) {
  const stroke = spec.accent;
  return (
    <svg viewBox="0 0 400 120" className={className} aria-hidden fill="none">
      <rect x="40" y="30" width="320" height="60" rx="12" fill="rgba(0,0,0,0.04)" stroke={stroke} strokeWidth="1" strokeOpacity="0.15" />
      <text x="200" y="58" textAnchor="middle" fill={stroke} fontSize="28" fontWeight="500" fontFamily="monospace">
        $us ···
      </text>
      <text x="200" y="78" textAnchor="middle" fill="rgba(0,0,0,0.4)" fontSize="10">
        CUOTA ORIENTATIVA
      </text>
    </svg>
  );
}

export function PersonaIllustration({
  name,
  accent,
  className,
}: {
  name: string;
  accent: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden fill="none">
      <ellipse cx="60" cy="125" rx="35" ry="8" fill="rgba(0,0,0,0.25)" />
      <circle cx="60" cy="48" r="22" fill="rgba(255,255,255,0.08)" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" />
      <path
        d="M30 130 Q30 85 60 78 Q90 85 90 130"
        fill="rgba(255,255,255,0.06)"
        stroke={accent}
        strokeWidth="1.5"
        strokeOpacity="0.45"
      />
      <text x="60" y="54" textAnchor="middle" fill={accent} fontSize="18" fontWeight="600">
        {name.charAt(0)}
      </text>
    </svg>
  );
}

export function LogoWordmark({ spec, className }: FallbackArtProps) {
  const isGac = spec.mediaId.includes("gac");
  const isBank = spec.mediaId.includes("bank");
  const fill = isBank ? "#1D1D1F" : "#FFFFFF";

  if (isBank) {
    return <FinancingCard spec={spec} className={className} />;
  }

  return (
    <svg viewBox="0 0 240 48" className={className} aria-hidden>
      {isGac ? (
        <>
          <rect x="0" y="8" width="36" height="32" rx="5" fill="none" stroke="#C8A96E" strokeWidth="1.5" />
          <text x="8" y="30" fill="#C8A96E" fontSize="13" fontWeight="700">
            GAC
          </text>
          <text x="46" y="30" fill={fill} fontSize="18" fontWeight="500" letterSpacing="0.06em">
            MOTOR
          </text>
        </>
      ) : (
        <>
          <text x="0" y="28" fill={fill} fontSize="22" fontWeight="600" letterSpacing="0.1em">
            VIAGGIO
          </text>
          <text x="0" y="42" fill="rgba(255,255,255,0.4)" fontSize="8" letterSpacing="0.22em">
            MOTORS BOLIVIA
          </text>
        </>
      )}
    </svg>
  );
}

export function FallbackArtwork({ spec, className }: FallbackArtProps) {
  if (spec.treatment === "logo-brand") {
    return <LogoWordmark spec={spec} className={className} />;
  }
  if (spec.treatment === "persona-portrait") {
    const name = spec.label.split(" ")[0] ?? "?";
    return <PersonaIllustration name={name} accent={spec.accent} className={className} />;
  }

  switch (spec.treatment) {
    case "exterior-vehicle":
    case "cinematic-hero":
    case "coming-soon":
    case "ambient-video":
      return <VehicleSilhouette spec={spec} className={className} />;
    case "interior-cockpit":
      return <CockpitSilhouette spec={spec} className={className} />;
    case "family-journey":
    case "tour-step":
      return <FamilySilhouette spec={spec} className={className} />;
    case "warranty-card":
      return <WarrantyCard spec={spec} className={className} />;
    case "safety-card":
      return <SafetyCard spec={spec} className={className} />;
    case "compare-card":
      return <CompareCard spec={spec} className={className} />;
    case "route-map":
      return <RouteMap spec={spec} className={className} />;
    case "financing-card":
      return <FinancingCard spec={spec} className={className} />;
    case "trust-chapter":
    case "service-local":
      return <VehicleSilhouette spec={spec} className={className} />;
    default:
      return <VehicleSilhouette spec={spec} className={className} />;
  }
}
