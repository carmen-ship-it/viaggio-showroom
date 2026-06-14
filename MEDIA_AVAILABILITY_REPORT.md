# Media Availability Report — Viaggio Digital Showroom

**Audit date:** 14 June 2026  
**Vehicle:** GAC GS4 MAX (`gs4-max`)  
**Scope:** Phase 3A P0 assets + full `media-manifest.json` audit  
**Method:** Filesystem inspection, `MediaResolver` trace, production server verification (`npm run build && npm start -p 3001`), browser screenshots

---

## Executive Summary

| Metric | Count |
|--------|------:|
| Manifest entries | 41 |
| **Present** (primary `src` on disk) | 10 |
| **Missing** (primary `src` absent) | 31 |
| **Placeholder / fallback still active** | 31 |
| Unique physical `src` paths in manifest | 33 |
| Unique paths with real files | **6** |
| Phase 3A P0 WebP assets (requested set) | **6 / 6** at exact manifest paths |

All six Phase 3A assets were already at the correct manifest paths — no copy/move was required.

---

## Phase 3A P0 Asset Verification

| mediaId | Manifest `src` | On disk | MediaResolver | Fallback active? |
|---------|----------------|---------|---------------|------------------|
| `gs4-max-hero-01` | `/assets/vehicles/gs4-max/exterior/hero-01.webp` | yes | `ready` | no |
| `gs4-max-hero-ambient` | `/assets/vehicles/gs4-max/exterior/hero-ambient.webp` | yes | `ready` | no |
| `gs4-max-ext-front-34` | `/assets/vehicles/gs4-max/exterior/front-34.webp` | yes | `ready` | no |
| `gs4-max-int-dashboard` | `/assets/vehicles/gs4-max/interior/dashboard.webp` | yes | `ready` | no |
| `gs4-max-family-cover` | `/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp` | yes | `ready` | no |
| `persona-carlos-avatar` | `/assets/personas/carlos-avatar.webp` | yes | `ready` | no |

**Total file size (6 assets):** ~1.09 MB

---

## MediaResolver Logic (verified)

Resolution chain (`lib/media/` — read-only audit):

1. **`getMediaManifest(vehicleSlug)`** — loads `content/vehicles/{slug}/media-manifest.json`, validates against schema.
2. **`buildAvailabilityMap()`** — for each manifest entry, sets `availability[id] = assetFileExists(src)` where `assetFileExists` checks `fs.existsSync(public + src)` for paths starting with `/assets/`.
3. **`resolveMediaAsset()` / `resolveMediaFromManifest()`** — looks up `mediaId` in manifest index:
   - If file available → `{ status: "ready", src: asset.src }`
   - Else follow `asset.fallbackId` or configured chain in `lib/media/fallbacks.ts` (`VIDEO_FALLBACK_IDS`, `IMAGE_FALLBACK_IDS`)
   - Max depth 6; circular visits return `status: "placeholder"`
4. **UI rendering** (`MediaSurface` → `MediaImage` / `FallbackMedia`):
   - `ready` with `src` → renders `<img src="…">` (real file)
   - Missing / unresolvable → `FallbackMedia` using `lib/media/placeholder-library.ts` gradient catalog
   - Load error on `<img>` → retries `fallbackId`, then gradient

**Server vs client:** Server resolver (`resolve.ts`) also calls `assetFileExists()` as fallback when availability map entry is unset. Client resolver (`resolve-client.ts`) relies on the precomputed availability map from `ShowroomMediaBoundary`.

---

## Full Manifest Audit

| mediaId | file path (manifest `src`) | detected | fallback still active? |
|---------|---------------------------|----------|------------------------|
| `video-attract-loop` | `/assets/vehicles/gs4-max/video/attract-loop.mp4` | no | yes |
| `gs4-max-hero-01` | `/assets/vehicles/gs4-max/exterior/hero-01.webp` | yes | no |
| `gs4-max-hero-ambient` | `/assets/vehicles/gs4-max/exterior/hero-ambient.webp` | yes | no |
| `video-hero-ambient` | `/assets/vehicles/gs4-max/video/hero-ambient.mp4` | no | yes |
| `gs4-max-ext-front-34` | `/assets/vehicles/gs4-max/exterior/front-34.webp` | yes | no |
| `gs4-max-ext-silver` | `/assets/vehicles/gs4-max/exterior/silver-34.webp` | no | yes |
| `compare-corolla-cross` | `/assets/vehicles/gs4-max/compare/corolla-cross.webp` | no | yes |
| `gs4-max-int-dashboard` | `/assets/vehicles/gs4-max/interior/dashboard.webp` | yes | no |
| `gs4-max-adas-hero` | `/assets/vehicles/gs4-max/interior/dashboard.webp` | yes | no |
| `gs4-max-int-rear-seats` | `/assets/vehicles/gs4-max/interior/rear-seats.webp` | no | yes |
| `gs4-max-int-360-display` | `/assets/vehicles/gs4-max/interior/360-display.webp` | no | yes |
| `gs4-max-family-cover` | `/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp` | yes | no |
| `gs4-max-family-safety-hero` | `/assets/vehicles/gs4-max/lifestyle/family-safety.webp` | no | yes |
| `gs4-max-technology-cover` | `/assets/vehicles/gs4-max/interior/dashboard.webp` | yes | no |
| `gs4-max-service-cover` | `/assets/vehicles/gs4-max/lifestyle/showroom-family.webp` | no | yes |
| `warranty-timeline-5yr-150k` | `/assets/vehicles/gs4-max/warranty/timeline-5yr-150k.webp` | no | yes |
| `video-trust-adas` | `/assets/vehicles/gs4-max/video/trust-adas.mp4` | no | yes |
| `video-trust-heritage` | `/assets/vehicles/gs4-max/video/trust-heritage.mp4` | no | yes |
| `video-viaggio-taller` | `/assets/vehicles/gs4-max/video/viaggio-taller.mp4` | no | yes |
| `video-trust-engine` | `/assets/vehicles/gs4-max/video/trust-engine.mp4` | no | yes |
| `video-trust-chassis` | `/assets/vehicles/gs4-max/video/trust-chassis.mp4` | no | yes |
| `logo-viaggio-full` | `/assets/brand/logo-viaggio-full.svg` | no | yes |
| `logo-gac-full` | `/assets/brand/logo-gac-full.svg` | no | yes |
| `persona-carlos-avatar` | `/assets/personas/carlos-avatar.webp` | yes | no |
| `persona-sofia-avatar` | `/assets/personas/sofia-avatar.webp` | no | yes |
| `persona-diego-avatar` | `/assets/personas/diego-avatar.webp` | no | yes |
| `gs4-max-diego-colegio` | `/assets/vehicles/gs4-max/lifestyle/daily-dropoff.webp` | no | yes |
| `gs4-max-diego-super` | `/assets/vehicles/gs4-max/lifestyle/shopping.webp` | no | yes |
| `gs4-max-diego-buenavista` | `/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp` | yes | no |
| `gs4-max-diego-carretera` | `/assets/vehicles/gs4-max/lifestyle/doble-via.webp` | no | yes |
| `gs4-max-diego-confort` | `/assets/vehicles/gs4-max/interior/rear-seats.webp` | no | yes |
| `gs4-max-diego-ano1` | `/assets/vehicles/gs4-max/lifestyle/ownership-year1.webp` | no | yes |
| `gs4-max-diego-mediodia` | `/assets/vehicles/gs4-max/lifestyle/daily-dropoff.webp` | no | yes |
| `gs4-max-safety-cover` | `/assets/vehicles/gs4-max/lifestyle/family-safety.webp` | no | yes |
| `gs4-max-reliability-cover` | `/assets/vehicles/gs4-max/exterior/front-34.webp` | yes | no |
| `gs4-max-warranty-cover` | `/assets/vehicles/gs4-max/warranty/timeline-5yr-150k.webp` | no | yes |
| `logo-bank-partner-1` | `/assets/brand/logo-bank-partner-1.svg` | no | yes |
| `emkoo-hero-01` | `/assets/vehicles/emkoo/hero.webp` | no | yes |
| `emzoom-hero-01` | `/assets/vehicles/emzoom/hero.webp` | no | yes |
| `gs8-hero-01` | `/assets/vehicles/gs8/hero.webp` | no | yes |
| `viaggio-test-drive-route` | `/assets/vehicles/gs4-max/lifestyle/test-drive-route.webp` | no | yes |

**Fallback active = yes** when the primary file is missing *or* resolution ends in a gradient (`FallbackMedia`) because the fallback chain cannot reach a file on disk.

---

## Before vs After Placeholder Coverage

| Dimension | Before (14 Jun baseline) | After Phase 3A |
|-----------|--------------------------|----------------|
| Real files under `public/assets/` | 0 | **6 unique WebP** (+ 4 manifest aliases sharing those paths → 10 entries `ready`) |
| Unique manifest `src` paths with files | 0 / 33 | **6 / 33** (18%) |
| Manifest entries showing gradient for primary ID | 41 / 41 (100%) | **31 / 41** (76%) |
| Demo path hero/attract surfaces | 100% gradient | **S01, S03, S22 show real vehicle photography**; S25 shows Carlos portrait |
| P0 acquisition plan (16 manifest IDs) | 0 / 16 | **6 / 16** direct files (+ aliases boost visible coverage) |

Sources: [docs/asset-readiness-audit.md](docs/asset-readiness-audit.md), [docs/demo-readiness-scorecard.md](docs/demo-readiness-scorecard.md)

---

## Screen Screenshots (Demo Path)

Captured against production build at `http://localhost:3001` (14 June 2026).

| Screen | Route | Screenshot | Visual state |
|--------|-------|------------|--------------|
| S01 Attract | `/` | `docs/audit/screenshots/s01-attract.png` | Real `hero-ambient` + `hero-01` images in DOM; dark cinematic overlay |
| S03 Vehicle selector | `/vehicles` | `docs/audit/screenshots/s03-vehicles.png` | GS4 MAX card + coming-soon cards show real hero fallback imagery |
| S06 Trust tour | `/vehicles/gs4-max/tour/trust` | `docs/audit/screenshots/s06-tour-trust.png` | Tour step 1 shows `front-34.webp`; HTTP 200 verified |
| S08 ADAS topic | `/vehicles/gs4-max/themes/safety/adas` | `docs/audit/screenshots/s08-adas-topic.png` | Dashboard hero via `gs4-max-adas-hero` alias |
| S22 Immersive hero | `/vehicles/gs4-max/hero` | `docs/audit/screenshots/s22-hero.png` | Full-bleed `hero-01.webp` confirmed (`1920px` wide) |
| S25 FAQ | `/vehicles/gs4-max/trust/faq` | `docs/audit/screenshots/s25-faq.png` | Carlos avatar + FAQ accordion; warranty graphic still gradient |

**Screenshot count:** 6 screens documented.

**Note:** Cursor browser automation intermittently threw a client-side exception on `/tour/trust` while production `curl` returned 200; screenshot captured from stable production session.

---

## Supporting Docs Status

| File | Status |
|------|--------|
| `ASSET_GENERATION_GUIDE.md` | exists |
| `assets-manifest.csv` | exists |
| `DEMO_ASSET_STATUS.md` | created (this audit) |

---

*Audit only — no application code, routing, or resolver logic modified.*
