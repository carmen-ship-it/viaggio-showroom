import type { ReactNode } from "react";
import {
  getMediaAvailability,
  getMediaManifest,
} from "@/lib/media/server";
import { MediaProvider } from "@/components/media/MediaProvider";

interface ShowroomMediaBoundaryProps {
  vehicleSlug: string;
  children: ReactNode;
}

export function ShowroomMediaBoundary({
  vehicleSlug,
  children,
}: ShowroomMediaBoundaryProps) {
  const manifest = getMediaManifest(vehicleSlug);
  const availability = getMediaAvailability(vehicleSlug);

  return (
    <MediaProvider
      vehicleSlug={vehicleSlug}
      manifest={manifest}
      availability={availability}
    >
      {children}
    </MediaProvider>
  );
}
