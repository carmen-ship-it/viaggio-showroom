#!/usr/bin/env node
/**
 * S36 consultant handoff — capture presentation screenshots.
 * Usage: node scripts/capture-s36-handoff-screenshots.mjs [baseUrl]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "docs/screenshots/s36-handoff");
const baseUrl = process.argv[2] ?? "http://localhost:3000";

const HANDOFF_SEED = {
  id: "handoff-screenshot-seed",
  customerName: "Familia Mendoza",
  vehicle: "GAC GS4 MAX GT · Gris",
  temperature: "hot",
  interestSummary:
    "Comparó con Corolla Cross · Cuota 36 meses · Retoma Etios 2018 · Interés en espacio familiar",
  kioskId: "Kiosco 1",
  status: "pending",
  triggeredAt: new Date(Date.now() - 45_000).toISOString(),
  comparisonViewed: "Toyota Corolla Cross",
  financingViewed: "36 meses · cuota orientativa USD 412",
  topicsExplored: [
    "FAQ confianza",
    "Repuestos Santa Cruz",
    "Tour Carlos · garantía",
    "ADAS · cámaras",
    "Comparación",
    "Cuota orientativa",
  ],
  objections: ["Marca china", "Repuestos locales"],
  suggestedOpening:
    "Vi que compararon el GS4 MAX con el Corolla Cross y miraron la cuota a 36 meses con retoma del Etios.",
  persona: "mixto",
  sessionMinutes: 22,
};

async function dismissAudioGate(page) {
  const gate = page.getByRole("button", {
    name: /Toque para comenzar la experiencia con sonido/i,
  });
  if (await gate.isVisible().catch(() => false)) {
    await gate.click();
    await page.waitForTimeout(500);
  }
}

async function waitForSettle(page) {
  await page.waitForLoadState("networkidle", { timeout: 45_000 }).catch(() => {});
  await page.waitForTimeout(2000);
}

async function seedHandoff(page) {
  await page.evaluate((handoff) => {
    window.localStorage.setItem("viaggio-s36-handoffs", JSON.stringify([handoff]));
    window.dispatchEvent(new CustomEvent("viaggio-handoff-change"));
  }, HANDOFF_SEED);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

// Kiosk 1920×1080 — conversion CTA
{
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: "es-BO",
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/vehicles/gs4-max/convert`, {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });
  await waitForSettle(page);
  await dismissAudioGate(page);
  await page.screenshot({
    path: path.join(outDir, "s36-conversion-cta.png"),
    fullPage: false,
  });
  await context.close();
}

// Kiosk 1920×1080 — modal after CTA
{
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: "es-BO",
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/vehicles/gs4-max/convert`, {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });
  await waitForSettle(page);
  await dismissAudioGate(page);
  await page.getByRole("button", { name: /Hablar con un asesor ahora/i }).click();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outDir, "s36-customer-modal.png"),
    fullPage: false,
  });
  await context.close();
}

// Staff tablet 1024×768
{
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    locale: "es-BO",
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/staff`, {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });
  await seedHandoff(page);
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForSettle(page);
  await dismissAudioGate(page);
  await page.screenshot({
    path: path.join(outDir, "s36-staff-alert.png"),
    fullPage: false,
  });
  await context.close();
}

// Manager desktop 1440×900
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "es-BO",
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/manager`, {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });
  await seedHandoff(page);
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForSettle(page);
  await dismissAudioGate(page);
  await page.screenshot({
    path: path.join(outDir, "s36-manager-handoff.png"),
    fullPage: false,
  });
  await context.close();
}

await browser.close();
console.log(`S36 screenshots saved to ${outDir}`);
