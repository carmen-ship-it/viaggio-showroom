import type { ReactNode } from "react";
import { ShowroomMediaBoundary } from "@/components/media/ShowroomMediaBoundary";

interface VehicleLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function VehicleLayout({
  children,
  params,
}: VehicleLayoutProps) {
  const { slug } = await params;

  return (
    <ShowroomMediaBoundary vehicleSlug={slug}>{children}</ShowroomMediaBoundary>
  );
}
