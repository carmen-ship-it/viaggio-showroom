#!/usr/bin/env node
/**
 * Phase 4 executive visual audit — capture demo-path screenshots.
 * Usage: node scripts/capture-phase4-screenshots.mjs [baseUrl]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "executive-visual-audit", "screenshots");
const baseUrl = process.argv[2] ?? "http://localhost:3000";

const screens = [
  { id: "S01", name: "attract-loop", path: "/" },
  { id: "S03", name: "vehicle-selector", path: "/vehicles" },
  { id: "S06", name: "trust-tour", path: "/vehicles/gs4-max/tour/trust" },
  { id: "S08", name: "adas-topic", path: "/vehicles/gs4-max/themes/safety/adas" },
  { id: "S11", name: "compare-hub", path: "/vehicles/gs4-max/compare" },
  { id: "S12", name: "compare-detail", path: "/vehicles/gs4-max/compare/corolla-cross" },
  { id: "S13", name: "conversion-hub", path: "/vehicles/gs4-max/convert" },
  { id: "S22", name: "immersive-hero", path: "/vehicles/gs4-max/hero" },
  { id: "S24", name: "trust-story", path: "/vehicles/gs4-max/trust/story" },
  { id: "S25", name: "faq", path: "/vehicles/gs4-max/trust/faq" },
  { id: "S26", name: "financing-preview", path: "/vehicles/gs4-max/economics/financing" },
  { id: "S15", name: "whatsapp-handoff", path: "/vehicles/gs4-max/whatsapp?intent=test_drive" },
];

async function waitForSettle(page, screenId) {
  await page.waitForLoadState("networkidle", { timeout: 45_000 }).catch(() => {});
  await page.waitForTimeout(3500);
  const hasError = await page
    .locator("text=Runtime PageNotFoundError")
    .isVisible()
    .catch(() => false);
  if (hasError) {
    throw new Error(`${screenId}: Next.js runtime error`);
  }
}

async function verifyRealMedia(page, screenId) {
  return page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img[src*='/assets/']")];
    const loaded = imgs.filter((img) => img.naturalWidth > 0 && img.naturalHeight > 0);
    const gradients = [...document.querySelectorAll("[data-media-status='placeholder']")];
    return {
      assetImages: loaded.length,
      assetSrcs: loaded.map((img) => img.getAttribute("src")).slice(0, 8),
      placeholderSurfaces: gradients.length,
    };
  });
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  locale: "es-BO",
});
const page = await context.newPage();
const results = [];

for (const screen of screens) {
  const url = `${baseUrl}${screen.path}`;
  console.log(`Capturing ${screen.id} — ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
  await waitForSettle(page, screen.id);

  if (screen.id === "S12") {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);
  }

  const mediaCheck = await verifyRealMedia(page, screen.id);
  const filename = `${screen.id}-${screen.name}.png`;
  await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
  results.push({ ...screen, filename, mediaCheck });
  console.log(`  → ${filename} (${mediaCheck.assetImages} asset images)`);
}

await browser.close();

const summaryPath = path.join(root, "executive-visual-audit", "capture-results.json");
await import("node:fs/promises").then((fs) =>
  fs.writeFile(summaryPath, JSON.stringify({ capturedAt: new Date().toISOString(), results }, null, 2)),
);
console.log(`Done. ${screens.length} screenshots in ${outDir}`);
