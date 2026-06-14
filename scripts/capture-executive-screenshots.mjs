#!/usr/bin/env node
/**
 * Capture executive demo screenshots at 1920×1080 kiosk viewport.
 * Usage: node scripts/capture-executive-screenshots.mjs [baseUrl]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "demo-review");
const baseUrl = process.argv[2] ?? "http://localhost:3000";

const screens = [
  { id: "S01", name: "Attract Loop", path: "/" },
  { id: "S03", name: "Vehicle Selector", path: "/vehicles" },
  { id: "S22", name: "Immersive Hero", path: "/vehicles/gs4-max/hero" },
  { id: "S24", name: "Trust Story", path: "/vehicles/gs4-max/trust/story" },
  { id: "S06", name: "Carlos Trust Tour", path: "/vehicles/gs4-max/tour/trust" },
  { id: "S08", name: "ADAS Topic", path: "/vehicles/gs4-max/themes/safety/adas" },
  { id: "S12", name: "Compare Detail", path: "/vehicles/gs4-max/compare/corolla-cross" },
  { id: "S26", name: "Financing Preview", path: "/vehicles/gs4-max/economics/financing" },
  { id: "S13", name: "Conversion Hub", path: "/vehicles/gs4-max/convert" },
  {
    id: "S15",
    name: "WhatsApp Handoff",
    path: "/vehicles/gs4-max/whatsapp?intent=test_drive",
  },
];

async function hasRuntimeError(page) {
  return page
    .locator("text=Runtime PageNotFoundError")
    .isVisible()
    .catch(() => false);
}

async function waitForSettle(page, screenId) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    await page.waitForLoadState("networkidle", { timeout: 45_000 }).catch(() => {});
    await page.waitForTimeout(attempt === 0 ? 3500 : 5000);
    if (!(await hasRuntimeError(page))) return;
    console.warn(`  ${screenId}: runtime error on attempt ${attempt + 1}, reloading…`);
    await page.reload({ waitUntil: "domcontentloaded", timeout: 60_000 });
  }
  if (await hasRuntimeError(page)) {
    throw new Error(`${screenId}: page still shows Next.js runtime error after retries`);
  }
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
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
  await waitForSettle(page, screen.id);

  if (screen.id === "S12") {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);
  }

  const filename = `${screen.id}-${screen.name.toLowerCase().replace(/\s+/g, "-")}.png`;
  await page.screenshot({
    path: path.join(outDir, filename),
    fullPage: false,
  });
  console.log(`  → ${filename}`);
}

await browser.close();
console.log(`Done. ${screens.length} screenshots in ${outDir}`);
