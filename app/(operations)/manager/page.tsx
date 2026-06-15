import type { Metadata } from "next";
import { ManagerDashboard } from "@/components/operations/ManagerDashboard";

export const metadata: Metadata = {
  title: "Tablero gerencial · CPI-OS",
  description: "Pulso del piso en tiempo real — sesiones, SLA y embudo",
};

export default function ManagerPage() {
  return <ManagerDashboard />;
}
