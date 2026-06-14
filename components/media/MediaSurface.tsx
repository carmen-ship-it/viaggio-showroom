"use client";

import { useResolvedMedia } from "@/components/media/MediaProvider";
import { MediaImage } from "@/components/media/MediaImage";
import { MediaVideo } from "@/components/media/MediaVideo";
import { FallbackMedia } from "@/components/media/FallbackMedia";

interface MediaSurfaceProps {
  mediaId: string;
  className?: string;
  overlay?: boolean;
  showLabel?: boolean;
  animate?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  objectFit?: "cover" | "contain";
  preferPosterOnReducedMotion?: boolean;
}

export function MediaSurface({
  mediaId,
  className,
  overlay = true,
  showLabel = false,
  animate = true,
  loop = true,
  muted = true,
  autoPlay = true,
  objectFit = "cover",
  preferPosterOnReducedMotion = true,
}: MediaSurfaceProps) {
  const resolved = useResolvedMedia(mediaId);

  if (!resolved) {
    return (
      <FallbackMedia
        mediaId={mediaId}
        className={className}
        overlay={overlay}
        showLabel={showLabel}
        animate={animate}
      />
    );
  }

  if (resolved.type === "video") {
    return (
      <MediaVideo
        mediaId={mediaId}
        className={className}
        overlay={overlay}
        loop={loop}
        muted={muted}
        autoPlay={autoPlay}
        objectFit={objectFit}
        preferPosterOnReducedMotion={preferPosterOnReducedMotion}
      />
    );
  }

  return (
    <MediaImage
      mediaId={mediaId}
      className={className}
      overlay={overlay}
      showLabel={showLabel}
      animate={animate}
      objectFit={objectFit}
    />
  );
}
