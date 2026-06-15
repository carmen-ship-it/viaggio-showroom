import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPI-OS Operations",
  description: "Paneles operativos CPI-OS — Viaggio Motors Santa Cruz",
};

export default function OperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
