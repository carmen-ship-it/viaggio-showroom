import type { Metadata } from "next";
import { StaffDashboard } from "@/components/operations/StaffDashboard";

export const metadata: Metadata = {
  title: "Panel de piso · CPI-OS",
  description: "Tablet del vendedor — cola priorizada y handoff inteligente",
};

export default function StaffPage() {
  return <StaffDashboard />;
}
