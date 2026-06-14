"use client";

import { getFallbackSpec } from "@/lib/media/placeholder-library";
import { MediaImage } from "@/components/media/MediaImage";
import { cn } from "@/lib/utils/cn";

export type LogoId = "logo-viaggio-full" | "logo-gac-full" | "logo-bank-partner-1";

interface LogoPlaceholderProps {
  logoId: LogoId;
  className?: string;
  height?: number;
  variant?: "dark" | "light";
  preferManifest?: boolean;
}

function ViaggioWordmark({ className, light }: { className?: string; light?: boolean }) {
  return (
    <svg
      viewBox="0 0 180 32"
      className={className}
      aria-label="Viaggio Motors"
      role="img"
    >
      <text
        x="0"
        y="24"
        fill={light ? "#1D1D1F" : "#FFFFFF"}
        fontSize="22"
        fontWeight="600"
        letterSpacing="0.12em"
        fontFamily="system-ui, sans-serif"
      >
        VIAGGIO
      </text>
      <text
        x="0"
        y="32"
        fill={light ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.45)"}
        fontSize="7"
        letterSpacing="0.25em"
        fontFamily="system-ui, sans-serif"
      >
        MOTORS BOLIVIA
      </text>
    </svg>
  );
}

function GacWordmark({ className, light }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 120 32" className={className} aria-label="GAC Motor" role="img">
      <rect x="0" y="4" width="28" height="24" rx="4" fill="none" stroke="#C8A96E" strokeWidth="1.5" />
      <text x="6" y="22" fill="#C8A96E" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
        GAC
      </text>
      <text
        x="36"
        y="22"
        fill={light ? "#1D1D1F" : "#FFFFFF"}
        fontSize="16"
        fontWeight="500"
        letterSpacing="0.08em"
        fontFamily="system-ui, sans-serif"
      >
        MOTOR
      </text>
    </svg>
  );
}

function BankWordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 32" className={className} aria-label="Socio financiero" role="img">
      <rect x="0" y="6" width="100" height="20" rx="6" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.12)" />
      <text x="50" y="20" textAnchor="middle" fill="rgba(0,0,0,0.35)" fontSize="9" letterSpacing="0.15em">
        SOCIO FINANCIERO
      </text>
    </svg>
  );
}

export function LogoPlaceholder({
  logoId,
  className,
  height = 28,
  variant = "dark",
  preferManifest = true,
}: LogoPlaceholderProps) {
  const spec = getFallbackSpec(logoId);
  const light = variant === "light";

  if (preferManifest) {
    return (
      <div className={cn("relative", className)} style={{ height }}>
        <MediaImage
          mediaId={logoId}
          className="h-full w-full min-w-[80px]"
          overlay={false}
          animate={false}
          objectFit="contain"
        />
      </div>
    );
  }

  const wordmark =
    logoId === "logo-gac-full" ? (
      <GacWordmark className="h-full w-auto" light={light} />
    ) : logoId === "logo-bank-partner-1" ? (
      <BankWordmark className="h-full w-auto" />
    ) : (
      <ViaggioWordmark className="h-full w-auto" light={light} />
    );

  return (
    <div
      className={cn("flex items-center", className)}
      style={{ height }}
      role="img"
      aria-label={spec.caption}
    >
      {wordmark}
    </div>
  );
}

export function CoBrandLockup({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <div className={cn("flex max-w-[min(100%,22rem)] items-center gap-3 sm:gap-4", className)}>
      <LogoPlaceholder
        logoId="logo-viaggio-full"
        height={24}
        variant={variant}
        preferManifest={false}
        className="max-w-[9rem] shrink-0"
      />
      <span
        className={cn(
          "shrink-0 text-[10px]",
          variant === "light" ? "text-black/20" : "text-white/25",
        )}
      >
        ×
      </span>
      <LogoPlaceholder
        logoId="logo-gac-full"
        height={24}
        variant={variant}
        preferManifest={false}
        className="max-w-[8rem] shrink-0"
      />
    </div>
  );
}
