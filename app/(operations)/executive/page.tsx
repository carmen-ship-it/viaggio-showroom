import type { Metadata } from "next";
import { ExecutiveDashboard } from "@/components/operations/ExecutiveDashboard";

export const metadata: Metadata = {
  title: "Reporte ejecutivo · CPI-OS",
  description: "Inteligencia de negocio — visitas, conversión y aprendizaje institucional",
};

export default function ExecutivePage() {
  return <ExecutiveDashboard />;
}
