#!/usr/bin/env node
/**
 * Capture audit screenshots for S01/S03/S06/S08/S22/S25 at 1920×1080.
 * Usage: node scripts/capture-audit-screenshots.mjs [baseUrl]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "docs/audit/screenshots");
const baseUrl = process.argv[2] ?? "http://localhost:3000";

const screens = [
  { id: "S01", name: "attract-loop", path: "/" },
  { id: "S03", name: "vehicle-selector", path: "/vehicles" },
  { id: "S06", name: "trust-tour", path: "/vehicles/gs4-max/tour/trust" },
  { id: "S08", name: "adas-topic", path: "/vehicles/gs4-max/themes/safety/adas" },
  { id: "S22", name: "immersive-hero", path: "/vehicles/gs4-max/hero" },
  { id: "S25", name: "faq", path: "/vehicles/gs4-max/trust/faq" },
];

async function waitForSettle(page) {
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});
  await page.waitForTimeout(2500);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  locale: "es-BO",
});
const page = await context.newPage();

for (const screen of screens) {
  const url = `${baseUrl}${screen.path}`;
  console.log(`Capturing ${screen.id} — ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await waitForSettle(page);

  const filename = `${screen.id}-${screen.name}.png`;
  await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
  console.log(`  → ${filename}`);
}

await browser.close();
console.log(`Done. ${screens.length} screenshots in ${outDir}`);
