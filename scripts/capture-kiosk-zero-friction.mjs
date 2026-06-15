#!/usr/bin/env node
/**
 * Executive zero-friction path — 1920×1080 screenshots.
 * Usage: NEXT_PUBLIC_DEMO_MODE=true node scripts/capture-kiosk-zero-friction.mjs [baseUrl]
 */
import { mkdir, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const afterDir = path.join(root, "docs/screenshots/kiosk-zero-friction/after");
const beforeDir = path.join(root, "docs/screenshots/kiosk-zero-friction/before");
const polishBefore = path.join(root, "docs/screenshots/executive-demo-polish/after");
const baseUrl = process.argv[2] ?? "http://localhost:3001";

const EXEC_PATH = [
  { id: "S01", route: "/", name: "attract", action: "start" },
  { id: "S02", route: "/", name: "welcome", needsWelcome: true },
  { id: "S03", route: "/vehicles", name: "selector" },
  { id: "S22", route: "/vehicles/gs4-max/hero", name: "hero" },
  { id: "S25", route: "/vehicles/gs4-max/trust/faq", name: "faq" },
  { id: "S06", route: "/vehicles/gs4-max/tour/trust", name: "tour" },
  { id: "S08", route: "/vehicles/gs4-max/themes/safety/adas", name: "adas" },
  { id: "S11", route: "/vehicles/gs4-max/compare", name: "compare-hub" },
  { id: "S12", route: "/vehicles/gs4-max/compare/corolla-cross", name: "compare-detail" },
  { id: "S26", route: "/vehicles/gs4-max/economics/financing", name: "financing" },
  { id: "S13", route: "/vehicles/gs4-max/convert", name: "convert" },
  { id: "S14", route: "/vehicles/gs4-max/test-drive", name: "test-drive" },
  { id: "S15", route: "/vehicles/gs4-max/whatsapp", name: "whatsapp" },
  { id: "S36", route: "/vehicles/gs4-max/convert", name: "handoff-modal" },
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

async function captureScreen(page, screen, dir) {
  if (screen.id === "S02") {
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await dismissAudioGate(page);
    await page.locator('button[aria-label="Tocá para empezar"]').click({ timeout: 5000 });
    await page.waitForTimeout(1200);
  } else if (screen.id === "S36") {
    await page.goto(`${baseUrl}/vehicles/gs4-max/convert`, {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    });
    await dismissAudioGate(page);
    const advisorCta = page.getByRole("button", {
      name: /Hablar con un asesor ahora/i,
    });
    if (await advisorCta.isVisible({ timeout: 3000 }).catch(() => false)) {
      await advisorCta.click();
      await page.waitForTimeout(800);
    }
  } else {
    await page.goto(`${baseUrl}${screen.route}`, {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    });
    await dismissAudioGate(page);
  }

  if (screen.action === "start") {
    // S01: capture attract state before touch
  }

  await page.waitForTimeout(1500);

  const filename = `${screen.id}-${screen.name}-1920x1080.png`;
  await page.screenshot({ path: path.join(dir, filename), fullPage: false });

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);

  return {
    screen: screen.id,
    route: screen.route,
    filename,
    scrollHeight,
    viewportHeight,
    scrolls: scrollHeight > viewportHeight + 8,
  };
}

await mkdir(afterDir, { recursive: true });
await mkdir(beforeDir, { recursive: true });

for (const screen of EXEC_PATH) {
  const names = [
    `${screen.id}-${screen.name}-1920x1080.png`,
    `${screen.id}-attract-1920x1080.png`,
    `${screen.id}-selector-1920x1080.png`,
    `${screen.id}-hero-1920x1080.png`,
    `${screen.id}-faq-1920x1080.png`,
    `${screen.id}-tour-1920x1080.png`,
    `${screen.id}-adas-1920x1080.png`,
    `${screen.id}-compare-hub-1920x1080.png`,
    `${screen.id}-compare-detail-1920x1080.png`,
    `${screen.id}-financing-1920x1080.png`,
    `${screen.id}-convert-1920x1080.png`,
    `${screen.id}-test-drive-1920x1080.png`,
    `${screen.id}-whatsapp-1920x1080.png`,
  ];
  for (const name of names) {
    try {
      await cp(path.join(polishBefore, name), path.join(beforeDir, `${screen.id}-before-1920x1080.png`));
      break;
    } catch {
      /* try next naming */
    }
  }
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const report = [];

for (const screen of EXEC_PATH) {
  try {
    const metrics = await captureScreen(page, screen, afterDir);
    report.push({ ...metrics, status: "ok" });
    console.log(`✓ ${screen.id} scroll=${metrics.scrolls}`);
  } catch (error) {
    report.push({
      screen: screen.id,
      route: screen.route,
      status: "error",
      error: String(error),
    });
    console.error(`✗ ${screen.id}`, error);
  }
}

await browser.close();

const reportPath = path.join(root, "docs/screenshots/kiosk-zero-friction/capture-report.json");
await import("node:fs/promises").then((fs) =>
  fs.writeFile(reportPath, JSON.stringify(report, null, 2)),
);
console.log(`Report → ${reportPath}`);
