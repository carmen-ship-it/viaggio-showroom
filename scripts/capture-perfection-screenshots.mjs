#!/usr/bin/env node
/**
 * Phase 6 executive perfection pass — full demo path screenshots @ 1920×1080.
 * Walks the canonical demo path so session state (compare unlock) is realistic.
 * Usage: node scripts/capture-perfection-screenshots.mjs [baseUrl] [outSubdir]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const subdir = process.argv[3] ?? "before";
const outDir = path.join(root, "executive-perfection-audit", subdir);
const baseUrl = process.argv[2] ?? "http://localhost:3000";

const demoSteps = [
  { id: "S01", name: "attract-loop", capture: "direct", path: "/" },
  { id: "S02", name: "welcome", capture: "tap-attract" },
  { id: "S03", name: "vehicle-selector", path: "/vehicles" },
  { id: "S22", name: "immersive-hero", path: "/vehicles/gs4-max/hero" },
  { id: "S25", name: "faq", path: "/vehicles/gs4-max/trust/faq" },
  { id: "S24", name: "trust-story", path: "/vehicles/gs4-max/trust/story" },
  { id: "S06", name: "trust-tour", path: "/vehicles/gs4-max/tour/trust" },
  { id: "S08", name: "adas-topic", path: "/vehicles/gs4-max/themes/safety/adas" },
  { id: "S11", name: "compare-hub", navigateViaClick: "Comparar con Corolla Cross" },
  { id: "S12", name: "compare-detail", navigateViaClick: "Ver comparación con Toyota Corolla Cross", scrollEnd: true },
  { id: "S26", name: "financing-preview", navigateViaClick: "Cuota orientativa" },
  { id: "S13", name: "conversion-hub", navigateViaClick: "Dar el siguiente paso" },
  { id: "S14", name: "test-drive", navigateViaClick: "Agendá tu prueba de manejo", waitExtra: 1500 },
  { id: "S15", name: "whatsapp-handoff", path: "/vehicles/gs4-max/whatsapp?intent=test_drive" },
];

async function waitForSettle(page, extra = 0) {
  await page.waitForLoadState("networkidle", { timeout: 45_000 }).catch(() => {});
  await page.waitForTimeout(3000 + extra);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  locale: "es-BO",
});
const page = await context.newPage();

  for (const step of demoSteps) {
    if (step.capture === "tap-attract") {
      console.log(`Capturing ${step.id} — welcome after attract tap`);
      await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded", timeout: 90_000 });
      await waitForSettle(page);
      await page.locator('button[aria-label="Tocá para empezar"]').click();
      await page.waitForTimeout(1500);
    } else if (step.navigateViaClick) {
      console.log(`Capturing ${step.id} — via TouchNav from prior screen`);
      await page
        .locator(
          `a:has-text("${step.navigateViaClick}"), button:has-text("${step.navigateViaClick}")`,
        )
        .first()
        .click();
      await waitForSettle(page, step.waitExtra ?? 0);
    } else {
    const url = `${baseUrl}${step.path}`;
    console.log(`Capturing ${step.id} — ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await waitForSettle(page, step.waitExtra ?? 0);
  }

  if (step.scrollEnd) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
  }

  const filename = `${step.id}-${step.name}.png`;
  await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
  console.log(`  → ${filename}`);
}

await browser.close();
console.log(`Done. ${demoSteps.length} screenshots in ${outDir}`);
