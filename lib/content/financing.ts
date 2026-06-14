import { cache } from "react";
import { contentPaths } from "./paths";
import { readJsonFile } from "./loader";

export interface CuotaRange {
  min: number;
  max: number;
}

export interface FinancingTrim {
  id: string;
  label: string;
  priceFromUsd: number;
  cuotas: Record<string, CuotaRange>;
}

export interface AffordabilityTip {
  id: string;
  title: string;
  description: string;
}

export interface ReadinessLevel {
  id: string;
  label: string;
  description: string;
}

export interface FinancingExplanation {
  headline: string;
  intro: string;
  bullets: string[];
}

export interface TcoCostRange {
  min: number;
  max: number;
}

export interface TcoPreview {
  defaultKmPerMonth: number;
  fuelLabel: string;
  maintenanceLabel: string;
  insuranceLabel: string;
  fuelMonthlyBob: TcoCostRange;
  maintenanceMonthlyBob: TcoCostRange;
  insuranceMonthlyBob: TcoCostRange;
  note: string;
}

export interface FinancingData {
  vehicleSlug: string;
  disclaimer: string;
  currency: string;
  explanation: FinancingExplanation;
  tcoPreview: TcoPreview;
  trims: FinancingTrim[];
  plazos: number[];
  affordabilityTips: AffordabilityTip[];
  readinessLevels: ReadinessLevel[];
}

export const getFinancing = cache((vehicleSlug: string): FinancingData => {
  return readJsonFile<FinancingData>(
    `${contentPaths.vehicleDir(vehicleSlug)}/financing.json`,
  );
});
