"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { MediaAvailabilityMap, MediaManifest, ResolvedMedia } from "@/types/media";
import { resolveMediaFromManifest } from "@/lib/media/resolve-client";

interface MediaContextValue {
  vehicleSlug: string;
  availability: MediaAvailabilityMap;
  resolve: (mediaId: string) => ResolvedMedia;
}

const MediaContext = createContext<MediaContextValue | null>(null);

interface MediaProviderProps {
  vehicleSlug: string;
  manifest: MediaManifest;
  availability: MediaAvailabilityMap;
  children: ReactNode;
}

export function MediaProvider({
  vehicleSlug,
  manifest,
  availability,
  children,
}: MediaProviderProps) {
  const resolve = useCallback(
    (mediaId: string) =>
      resolveMediaFromManifest(manifest.assets, mediaId, availability),
    [manifest.assets, availability],
  );

  const value = useMemo(
    () => ({
      vehicleSlug,
      availability,
      resolve,
    }),
    [vehicleSlug, availability, resolve],
  );

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export function useMediaContext(): MediaContextValue | null {
  return useContext(MediaContext);
}

export function useResolvedMedia(mediaId: string): ResolvedMedia | null {
  const context = useMediaContext();
  if (!context) return null;
  return context.resolve(mediaId);
}
