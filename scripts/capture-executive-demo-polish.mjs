#!/usr/bin/env node
/**
 * Executive demo path — 1920×1080 screenshots for polish validation.
 * Usage: NEXT_PUBLIC_DEMO_MODE=true node scripts/capture-executive-demo-polish.mjs [baseUrl]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "docs/screenshots/executive-demo-polish/after");
const beforeDir = path.join(root, "docs/screenshots/executive-demo-polish/before");
const baseUrl = process.argv[2] ?? "http://localhost:3000";

const DEMO_PATH = [
  { id: "S01", route: "/", name: "attract", action: "start" },
  { id: "S02", route: "/", name: "welcome", needsWelcome: true },
  { id: "S03", route: "/vehicles", name: "selector" },
  { id: "S22", route: "/vehicles/gs4-max/hero", name: "hero" },
  { id: "S25", route: "/vehicles/gs4-max/trust/faq", name: "faq" },
  { id: "S24", route: "/vehicles/gs4-max/trust/story", name: "trust-story" },
  { id: "S06", route: "/vehicles/gs4-max/tour/trust", name: "tour" },
  { id: "S08", route: "/vehicles/gs4-max/themes/safety/adas", name: "adas" },
  { id: "S11", route: "/vehicles/gs4-max/compare", name: "compare-hub" },
  { id: "S12", route: "/vehicles/gs4-max/compare/corolla-cross", name: "compare-detail" },
  { id: "S26", route: "/vehicles/gs4-max/economics/financing", name: "financing" },
  { id: "S13", route: "/vehicles/gs4-max/convert", name: "convert" },
  { id: "S14", route: "/vehicles/gs4-max/test-drive", name: "test-drive" },
  { id: "S15", route: "/vehicles/gs4-max/whatsapp", name: "whatsapp" },
  { id: "S35", route: "/staff", name: "staff" },
  { id: "S-manager", route: "/manager", name: "manager" },
  { id: "S-executive", route: "/executive", name: "executive" },
];

async function dismissAudioGate(page) {
  const gate = page.getByRole("button", {
    name: /Toque para comenzar la experiencia con sonido/i,
  });
  if (await gate.isVisible({ timeout: 1200 }).catch(() => false)) {
    await gate.click({ force: true, timeout: 3000 }).catch(() => undefined);
    await page.waitForTimeout(300);
  }
}

async function waitForSettle(page) {
  await page.waitForLoadState("networkidle", { timeout: 60_000 }).catch(() => {});
  await page.waitForTimeout(1500);
}

async function captureScreen(page, screen, dir) {
  await page.goto(`${baseUrl}${screen.route}`, {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });
  await dismissAudioGate(page);

  if (screen.action === "start") {
    const start = page.getByRole("button", { name: /Tocá para empezar/i });
    if (await start.isVisible().catch(() => false)) {
      await start.click();
      await page.waitForTimeout(800);
    }
  }

  if (screen.needsWelcome) {
    const empezar = page.getByRole("button", { name: /Empezar/i });
    if (await empezar.isVisible().catch(() => false)) {
      // stay on welcome for screenshot
    }
  }

  await waitForSettle(page);

  const filename = `${screen.id}-${screen.name}-1920x1080.png`;
  await page.screenshot({
    path: path.join(dir, filename),
    fullPage: false,
  });

  const metrics = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    clientHeight: document.documentElement.clientHeight,
    scrollY: window.scrollY,
  }));

  return {
    screen: screen.id,
    route: screen.route,
    file: filename,
    scrollRequired: metrics.scrollHeight > metrics.clientHeight + 24,
    scrollHeight: metrics.scrollHeight,
    viewportHeight: metrics.clientHeight,
  };
}

await mkdir(outDir, { recursive: true });
await mkdir(beforeDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  locale: "es-BO",
  deviceScaleFactor: 1,
});

await context.addInitScript(() => {
  sessionStorage.setItem("viaggio-audio-unlocked", "1");
});

const page = await context.newPage();
const results = [];

for (const screen of DEMO_PATH) {
  try {
    const result = await captureScreen(page, screen, outDir);
    results.push({ ...result, status: "ok" });
    console.log(`✓ ${screen.id} ${screen.route}`);
  } catch (error) {
    results.push({
      screen: screen.id,
      route: screen.route,
      status: "error",
      error: error instanceof Error ? error.message : String(error),
    });
    console.error(`✗ ${screen.id}`, error);
  }
}

await browser.close();

const reportPath = path.join(root, "docs/screenshots/executive-demo-polish/capture-report.json");
await import("node:fs/promises").then((fs) =>
  fs.writeFile(reportPath, JSON.stringify(results, null, 2)),
);

console.log(`\nCaptured ${results.filter((r) => r.status === "ok").length}/${DEMO_PATH.length} screens → ${outDir}`);
