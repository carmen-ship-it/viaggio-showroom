import { cn } from "@/lib/utils/cn";

type OverlayVariant = "hero" | "chapter-dark" | "chapter-light" | "vignette" | "theater";

interface CinematicOverlayProps {
  variant?: OverlayVariant;
  className?: string;
}

export function CinematicOverlay({
  variant = "hero",
  className,
}: CinematicOverlayProps) {
  if (variant === "hero") {
    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[var(--canvas-deep)]/85 to-transparent",
            className,
          )}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[var(--canvas-deep)]/90 via-[var(--canvas-deep)]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,12,16,0.35)_100%)]" />
      </>
    );
  }

  if (variant === "chapter-dark") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--canvas-deep)]/60 via-transparent to-[var(--canvas-deep)]/80",
          className,
        )}
      />
    );
  }

  if (variant === "chapter-light") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--canvas-light)]/90 via-transparent to-white/20",
          className,
        )}
      />
    );
  }

  if (variant === "theater") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.65)_100%)]",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(10,12,16,0.45)_100%)]",
        className,
      )}
    />
  );
}
