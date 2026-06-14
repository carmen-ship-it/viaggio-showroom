"use client";

import { MediaSurface } from "@/components/media/MediaSurface";
import { TrustMedia } from "@/components/media/TrustMedia";
import { cn } from "@/lib/utils/cn";

interface TrustChapterVisualProps {
  mediaId: string;
  variant?: "dark" | "light";
  className?: string;
  title?: string;
  subtitle?: string;
}

/** Trust story chapter backdrop with premium fallback when assets are missing */
export function TrustChapterVisual({
  mediaId,
  variant = "dark",
  className,
  title,
  subtitle,
}: TrustChapterVisualProps) {
  return (
    <div className={cn("relative min-h-[40vh] overflow-hidden", className)}>
      <TrustMedia mediaId={mediaId} variant={variant} opacity={0.55} />
      {(title || subtitle) ? (
        <div className="relative z-10 flex min-h-[40vh] flex-col justify-end p-8 md:p-12">
          {subtitle ? (
            <p className="text-sm italic text-white/50">{subtitle}</p>
          ) : null}
          {title ? <h2 className="mt-2 text-3xl font-light md:text-4xl">{title}</h2> : null}
        </div>
      ) : null}
    </div>
  );
}

interface WarrantyVisualCardProps {
  mediaId?: string;
  className?: string;
  compact?: boolean;
}

export function WarrantyVisualCard({
  mediaId = "warranty-timeline-5yr-150k",
  className,
  compact = false,
}: WarrantyVisualCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[var(--color-accent-warm)]/20",
        compact ? "h-32" : "h-48 md:h-56",
        className,
      )}
    >
      <MediaSurface
        mediaId={mediaId}
        className="h-full w-full"
        animate={false}
      />
    </div>
  );
}

interface SafetyVisualCardProps {
  mediaId?: string;
  className?: string;
}

export function SafetyVisualCard({
  mediaId = "gs4-max-adas-hero",
  className,
}: SafetyVisualCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[var(--color-accent-trust)]/25",
        className,
      )}
    >
      <MediaSurface mediaId={mediaId} className="aspect-[16/9] w-full" />
    </div>
  );
}

interface CompareVisualCardProps {
  anchorMediaId?: string;
  competitorMediaId?: string;
  className?: string;
}

export function CompareVisualCard({
  anchorMediaId = "gs4-max-ext-front-34",
  competitorMediaId = "compare-corolla-cross",
  className,
}: CompareVisualCardProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      <div className="overflow-hidden rounded-xl border border-[var(--color-accent-trust)]/30">
        <MediaSurface
          mediaId={anchorMediaId}
          className="aspect-[4/3]"
          animate={false}
        />
        <p className="bg-black/40 px-3 py-2 text-center text-xs font-medium text-white/80">
          GS4 MAX
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/15">
        <MediaSurface
          mediaId={competitorMediaId}
          className="aspect-[4/3]"
          animate={false}
        />
        <p className="bg-black/30 px-3 py-2 text-center text-xs text-white/60">
          Corolla Cross
        </p>
      </div>
    </div>
  );
}

interface FinancingVisualCardProps {
  className?: string;
}

export function FinancingVisualCard({ className }: FinancingVisualCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-black/8 bg-white",
        className,
      )}
    >
      <MediaSurface
        mediaId="logo-bank-partner-1"
        className="h-28 w-full"
        animate={false}
      />
    </div>
  );
}
