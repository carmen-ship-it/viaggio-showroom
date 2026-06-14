#!/usr/bin/env node
/**
 * Capture Trust Story "Viaggio en Bolivia" chapter for contrast validation.
 * Usage: node scripts/capture-trust-story-viaggio.mjs [baseUrl] [outSubdir]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const subdir = process.argv[3] ?? "after";
const outDir = path.join(root, "trust-story-contrast-audit", subdir);
const baseUrl = process.argv[2] ?? "http://localhost:3000";

const viewports = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1366x768", width: 1366, height: 768 },
];

const routes = [
  {
    id: "S24-trust-story",
    path: "/vehicles/gs4-max/trust/story",
    scrollTo: "Viaggio en Bolivia",
  },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    locale: "es-BO",
  });
  await context.addInitScript(() => {
    sessionStorage.setItem("viaggio-audio-unlocked", "1");
  });
  const page = await context.newPage();

  for (const route of routes) {
    const url = `${baseUrl}${route.path}`;
    console.log(`Capturing ${route.id} @ ${vp.name} — ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForLoadState("networkidle", { timeout: 45_000 }).catch(() => {});
    await page.waitForSelector("h2", { timeout: 45_000 });
    await page.getByRole("heading", { name: route.scrollTo }).waitFor({
      state: "visible",
      timeout: 45_000,
    });

    const scrollHost = page.locator(".snap-y").first();
    if (await scrollHost.count()) {
      await scrollHost.evaluate((el) => {
        el.scrollTop = el.clientHeight;
      });
    }
    await page.waitForTimeout(1200);

    const chapter = page.locator("section").filter({ hasText: route.scrollTo }).first();
    await chapter.waitFor({ state: "visible", timeout: 45_000 });
    await chapter.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(1500);

    const filename = `${route.id}-viaggio-bolivia-${vp.name}.png`;
    await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
    console.log(`  → ${filename}`);
  }

  await context.close();
}

await browser.close();
console.log(`Done — saved to ${outDir}`);
