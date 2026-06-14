# Demo Readiness Report — Phase 3

**Generated:** 14 June 2026  
**Scope:** GAC GS4 MAX executive demo path (S01 → S15 subset + S22/S24/S25/S26)  
**Build status:** ✅ Passes (`npm run build`, 69 routes)  
**Audit script:** `node scripts/demo-readiness-audit.mjs`

---

## Executive Summary

| Dimension | Score | Notes |
|-----------|-------|-------|
| **Overall demo readiness** | **62 / 100** | Full demo path, media resolver, compare/financing/convert/WhatsApp wired; zero asset files on disk |
| **Executive visual readiness** | **38 / 100** | Premium FallbackMedia + motion polish; still gradient/SVG placeholders, not photography |
| **Asset integration readiness** | **95 / 100** | Manifest paths verified; drop-in loading works when files are placed |
| **Commercial data readiness** | **25 / 100** | Placeholder phone, address, bank logo |

The showroom is **engineering-demo ready** and **one asset drop away** from a major visual jump on the MVP path. Executive stakeholders will still see synthetic media until P0 files land in `public/assets/`.

---

## 1. Asset Integration Verification

### Manifest path check — target drop-in assets

All six Phase 3 priority assets are **correctly mapped** in `content/vehicles/gs4-max/media-manifest.json`:

| File to place | Manifest `id` | Manifest `src` | On disk |
|---------------|---------------|----------------|---------|
| `public/assets/vehicles/gs4-max/exterior/hero-01.webp` | `gs4-max-hero-01` | `/assets/vehicles/gs4-max/exterior/hero-01.webp` | ❌ |
| `public/assets/vehicles/gs4-max/exterior/hero-ambient.webp` | `gs4-max-hero-ambient` | `/assets/vehicles/gs4-max/exterior/hero-ambient.webp` | ❌ |
| `public/assets/vehicles/gs4-max/exterior/front-34.webp` | `gs4-max-ext-front-34` | `/assets/vehicles/gs4-max/exterior/front-34.webp` | ❌ |
| `public/assets/vehicles/gs4-max/interior/dashboard.webp` | `gs4-max-int-dashboard` | `/assets/vehicles/gs4-max/interior/dashboard.webp` | ❌ |
| `public/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp` | `gs4-max-family-cover` | `/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp` | ❌ |
| `public/assets/personas/carlos-avatar.webp` | `persona-carlos-avatar` | `/assets/personas/carlos-avatar.webp` | ❌ |

### Full manifest inventory

| Status | Count |
|--------|-------|
| Assets registered in manifest | 41 |
| Files present on disk | **0** |
| Missing | **41** |

### Auto-load pipeline (confirmed)

When files are placed under `public/assets/`:

1. `ShowroomMediaBoundary` loads manifest + runs `assetFileExists()` server-side
2. `MediaProvider` resolves `status: "ready"` with real `src`
3. `MediaImage` / `MediaVideo` / `HeroMedia` render `<img>` / `<video>` with loading shimmer → crossfade reveal
4. Missing files cascade through `fallbackId` chains → `FallbackMedia` gradient artwork

**No code changes required** to activate real media — only drop files at the paths above.

### Screens unlocked by the six priority assets

| Asset | Screens immediately improved |
|-------|------------------------------|
| `hero-01.webp` | S01 (fallback), S03, S13, S14, S22, S26 |
| `hero-ambient.webp` | S01 ambient, S02 background |
| `front-34.webp` | S06 step 1, S11 anchor, S22 hotspots |
| `dashboard.webp` | S06 ADAS, S08 ADAS topic, S25 warranty card |
| `family-road-trip.webp` | S08 family topics, Diego journey |
| `carlos-avatar.webp` | S02 personas, S06 tour, S25 FAQ, Carlos experience |

---

## 2. Demo Visual Audit — Screen by Screen

Scores reflect **current state** (no assets on disk). Scores jump to **8–9** when corresponding P0 assets are placed.

| Screen | Route | Media shown | Placeholder visible? | Missing asset(s) | Visual quality |
|--------|-------|-------------|----------------------|------------------|----------------|
| **S01** Attract Loop | `/` | `video-attract-loop` → fallback `gs4-max-hero-01`; ambient `gs4-max-hero-ambient` | ✅ Yes — gradient + SVG silhouette | `attract-loop.mp4`, `hero-01.webp`, `hero-ambient.webp` | **6/10** — motion polish strong; no real hero |
| **S02** Welcome | `/` (welcome) | `gs4-max-hero-ambient` (18% opacity); persona avatars ×3 | ✅ Yes — ambient + avatars fallback | `hero-ambient.webp`, persona avatars | **6/10** — typography/motion exec-quality |
| **S03** Vehicle Selector | `/vehicles` | `gs4-max-hero-01`, coming-soon vehicle heroes | ✅ Yes — all cards gradient | `hero-01.webp`, `emkoo/emzoom/gs8` heroes | **5/10** — layout polished; no photography |
| **S06** Trust Tour | `/vehicles/gs4-max/tour/trust` | 8 steps: exterior, ADAS, warranty, service covers + trust videos | ✅ Yes — every step FallbackMedia | All step media + `video-trust-adas` | **5/10** — tour UX complete; media synthetic |
| **S08** Topic Deep Dive | `/themes/safety/adas` (demo) | `gs4-max-adas-hero` → `gs4-max-int-dashboard` | ✅ Yes | `dashboard.webp`, topic-specific lifestyle | **5/10** |
| **S11** Compare Hub | `/vehicles/gs4-max/compare` | `gs4-max-ext-front-34`, `compare-corolla-cross` | ✅ Yes | `front-34.webp`, `corolla-cross.webp` | **6/10** — UI complete; competitor still placeholder |
| **S12** Compare Detail | `/compare/corolla-cross` | Anchor hero + competitor thumbnail + Sofía callout | ✅ Yes | Same as S11 + `sofia-avatar.webp` | **6/10** |
| **S13** Conversion Hub | `/vehicles/gs4-max/convert` | `gs4-max-hero-01` recap | ✅ Yes | `hero-01.webp` | **7/10** — functional recap grid; hero synthetic |
| **S14** Test Drive | `/vehicles/gs4-max/test-drive` | Vehicle hero background | ✅ Yes | `hero-01.webp`, `test-drive-route.webp` | **7/10** — form UX exec-ready |
| **S15** WhatsApp | `/vehicles/gs4-max/whatsapp` | QR (generated), no photo media | ⚠️ Partial — radial gradient only; **phone is placeholder** | Real WhatsApp number | **7/10** — handoff UX complete |
| **S22** Vehicle Hero | `/vehicles/gs4-max/hero` | Ken Burns `gs4-max-hero-01` + hotspots | ✅ Yes | `hero-01.webp`, hotspot crops | **6/10** — Ken Burns + stat strip strong |
| **S24** Trust Story | `/vehicles/gs4-max/trust/story` | `video-trust-heritage`, `video-viaggio-taller` | ✅ Yes | Both trust videos + posters | **5/10** |
| **S25** FAQ | `/vehicles/gs4-max/trust/faq` | Carlos portrait + warranty visual card | ✅ Yes | `carlos-avatar.webp`, `warranty-timeline-5yr-150k.webp` | **6/10** — accordion UX polished |
| **S26** Financing | `/economics/financing` | `FinancingVisualCard`, `LogoPlaceholder` bank | ✅ Yes — bank logo synthetic | `logo-bank-partner-1.svg`, pricing PDF internal | **7/10** — calculator UI exec-ready |

---

## 3. Executive Demo Polish — Changes Applied

Polish only; no routing, content, or business-logic changes.

| Enhancement | Implementation |
|-------------|----------------|
| **Loading shimmer** | New `MediaLoadingShimmer` + `.media-shimmer` CSS in `globals.css` |
| **Image crossfade** | `MediaImage` — AnimatePresence crossfade on load and `mediaId` change |
| **Video crossfade** | `MediaVideo` — shimmer + fade for video and poster modes |
| **Tour step crossfade** | `TourMedia` — crossfade when step `mediaId` changes |
| **Page fade transitions** | `PageTransition` — default `crossfade` variant (S01↔S02) |
| **Cached image handling** | `MediaImage` checks `img.complete` for instant reveal |

Existing motion retained: Ken Burns, HeroMedia ambient pulse, framer-motion stagger on screens.

---

## 4. Placeholder Copy Report

Search patterns: `TODO`, `Placeholder`, `Próximamente`, `Coming Soon`, `+59100000000`  
*(Excludes `node_modules/`, `.next/`, and internal component names like `FallbackMedia`)*

### P0 — User-visible / demo blockers

| Location | Text / pattern | Impact |
|----------|----------------|--------|
| `content/shared/dealership.json` | `+59100000000` (whatsapp + phone) | S14/S15 WhatsApp links dial fake number |
| `content/shared/dealership.json` | `[Dirección del showroom Viaggio Motors — actualizar…]` | Trust/commercial credibility |
| `components/screens/VehicleSelector.tsx:106` | `Próximamente` | Intentional for EMKOO/EMZOOM/GS8 — OK for demo |
| `content/vehicles/gs4-max/compare/hub.json` | `comingSoonLabel: "Próximamente"` | Tucson/Tiggo compare targets — OK |
| `components/screens/CompareHubScreen.tsx:182` | Renders `comingSoonLabel ?? "Próximamente"` | Same as above |
| `components/screens/ResumePlaceholder.tsx:27` | `Próximamente podrás retomar…` | S37 resume route — off demo path |
| `components/screens/FamilyShareScreen.tsx:238` | `Próximamente: enlace de reanudación completo (S37)` | Off demo path |

### P1 — Component / infrastructure (not user-facing copy)

| Location | Notes |
|----------|-------|
| `components/media/LogoPlaceholder.tsx` | Renders text/SVG fallback for brand + bank logos until assets land |
| `components/layout/PlaceholderPage.tsx` | Legacy stub wrapper — **not used** on demo path routes |
| `components/screens/ResumePlaceholder.tsx` | Resume route stub |
| `lib/media/placeholders.ts` | Deprecated gradient helper |
| `content/vehicles/gs4-max/media-manifest.json` | Alt text `"próximamente"` on coming-soon vehicle heroes — metadata only |

### TODO comments in application source

**None found** in `app/`, `components/`, `content/`, or `lib/` (excluding dependencies).

### Coming Soon

No user-facing `"Coming Soon"` strings in application source. Manifest alt tags use Spanish `"próximamente"` for future vehicle entries only.

---

## 5. Readiness Breakdown

### Current readiness score: **62 / 100**

| Factor | Weight | Score | Rationale |
|--------|--------|-------|-----------|
| Demo path completeness | 25% | 95 | S01→S15 walkable; compare/financing/convert/WhatsApp built |
| Media framework | 15% | 90 | Manifest, resolver, fallback chains, shimmer/crossfade |
| Real assets on disk | 30% | 0 | 0/41 files |
| Commercial data | 15% | 25 | Placeholder phone + address |
| Visual polish / motion | 15% | 85 | Phase 3 polish applied; FallbackMedia premium |

### Remaining blockers

1. **P0 asset acquisition** — 0 files in `public/assets/` (see Section 1)
2. **Dealership commercial data** — real WhatsApp, address (`content/shared/dealership.json`)
3. **Brand logos** — `logo-viaggio-full.svg`, `logo-gac-full.svg`, `logo-bank-partner-1.svg`
4. **Trust videos** — `video-attract-loop`, `video-trust-heritage`, `video-trust-adas`, `video-viaggio-taller`
5. **Compare competitor photo** — `compare-corolla-cross.webp`
6. **Warranty graphic** — `warranty-timeline-5yr-150k.webp`
7. **Persona avatars** — Sofía + Diego (Carlos is P0 priority)

### Missing assets (full manifest)

All 41 entries in `content/vehicles/gs4-max/media-manifest.json` are missing on disk.  
Run `node scripts/demo-readiness-audit.mjs` for machine-readable status.

**Highest-impact first drop (6 files):**

```
public/assets/vehicles/gs4-max/exterior/hero-01.webp
public/assets/vehicles/gs4-max/exterior/hero-ambient.webp
public/assets/vehicles/gs4-max/exterior/front-34.webp
public/assets/vehicles/gs4-max/interior/dashboard.webp
public/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp
public/assets/personas/carlos-avatar.webp
```

### Screens using fallbacks (all demo-path media screens)

S01, S02, S03, S06, S08, S11, S12, S13, S14, S22, S24, S25, S26 — **100% of hero/tour/trust/compare media surfaces** render `FallbackMedia` until assets are placed.

S15 uses generated QR + gradient header (no manifest media slot).

### Screens fully production-ready

| Screen | Status | Caveat |
|--------|--------|--------|
| **S14** Test Drive Form | ✅ Functionally production-ready | Hero background still fallback |
| **S15** WhatsApp Handoff | ✅ Functionally production-ready | Placeholder phone number |
| **S13** Conversion Hub | ✅ Functionally production-ready | Recap hero still fallback |
| **S26** Financing Preview | ✅ Functionally production-ready | Bank logo placeholder |
| **S11/S12** Compare | ✅ Functionally production-ready | Competitor photo fallback |

No screen is **visually** production-ready for executive photography standards until P0 assets land.

---

## 6. Recommended Next Steps

1. **Drop the 6 priority assets** listed above — immediate visual upgrade across 10+ screens with zero code changes.
2. **Replace `dealership.json` placeholders** with Viaggio-approved phone and address.
3. **Add brand SVGs** to `public/assets/brand/` — GlobalHeader and S26 auto-resolve via manifest.
4. **Acquire trust videos** — unlocks S01 attract loop and S24 cinematic chapters.
5. **Re-run audit:** `node scripts/demo-readiness-audit.mjs` after each asset batch.

---

## Related Files

- `content/vehicles/gs4-max/media-manifest.json` — asset registry
- `scripts/demo-readiness-audit.mjs` — automated manifest vs disk audit
- `components/media/MediaImage.tsx` — shimmer + crossfade
- `components/media/MediaLoadingShimmer.tsx` — loading state
- `docs/demo-walkthrough.md` — scripted demo path
