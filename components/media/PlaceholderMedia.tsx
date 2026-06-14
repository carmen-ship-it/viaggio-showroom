"use client";

import { FallbackMedia, type FallbackMediaProps } from "@/components/media/FallbackMedia";

/** @deprecated Use FallbackMedia — kept for backward compatibility */
export type PlaceholderMediaProps = FallbackMediaProps;

/** Premium placeholder renderer — delegates to FallbackMedia */
export function PlaceholderMedia(props: PlaceholderMediaProps) {
  return (
    <FallbackMedia
      {...props}
      showCaption={props.showLabel ?? false}
      showLabel={props.showLabel}
    />
  );
}

// Re-export legacy helper for any direct imports
export { getPlaceholderMedia } from "@/lib/media/placeholders";
export { getFallbackSpec } from "@/lib/media/placeholder-library";
