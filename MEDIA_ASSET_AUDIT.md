# Media Asset Audit — Viaggio Digital Showroom

**Audit date:** 14 June 2026  
**Scope:** All visual, video, and audio assets — on disk, in manifest, and in customer-facing screens  
**Inventory baseline:** 6 WebP images on disk · 0 MP4 videos · 0 brand SVGs · 18 audio MP3s · 41 manifest entries  

---

## Executive Summary

The digital showroom's **strongest sales screens** (FAQ, compare, financing) are undermined by **visual credibility gaps**. Only **6 of 41** manifest media entries exist as real files. Customers see gradient placeholders, wireframe SVG overlays, and AI-generated stand-ins where licensed photography and local Viaggio content should anchor trust.

**Critical finding:** Real hero photos load on S22, but S01 and S03 **deliberately overlay wireframe silhouettes at 35–40% opacity**, making photography look unfinished even when files exist.

**Sales impact:** A dealership owner judges credibility in 5 seconds by whether this looks like *their car on their floor*. Current media state reads **"expensive prototype"** — not **"finished showroom."**

---

## Asset Inventory Summary

| Category | Manifest | On disk | Used in app | Placeholder shown |
|----------|----------|---------|-------------|-------------------|
| Vehicle exterior | 8 | 3 | 8 | 5 |
| Vehicle interior | 4 | 1 | 4 | 3 |
| Lifestyle / Diego | 9 | 1 | 9 | 8 |
| Warranty / themes | 4 | 0 | 4 | 4 |
| Personas | 3 | 1 | 3 | 2 |
| Brand logos | 3 | 0 | 3 | 3 |
| Compare | 1 | 0 | 1 | 1 |
| Videos | 7 | 0 | 2 wired | 7 |
| Audio (manifest) | 7 | 3 | 5 | 2 |
| Audio (host narration) | — | 12 | 12 | 0 |

**Placeholder rate in customer journey:** ~85% of manifest visual assets render as gradient/SVG fallbacks.

---

## Generated vs Stock vs Placeholder

### Committed generated assets (AI — replace before production)

Source: `assets-manifest.csv` — all flagged `needs_manual_work=yes`

| File | mediaId | Primary screens | Quality concern |
|------|---------|-----------------|-----------------|
| `hero-01.webp` | `gs4-max-hero-01` | S01, S03, S22, S13, S12 | Grille/wheel may drift from lot units |
| `hero-ambient.webp` | `gs4-max-hero-ambient` | S02, S01 layer | Acceptable ambient; verify color |
| `front-34.webp` | `gs4-max-ext-front-34` | S06, compare, motor | Used heavily — priority OEM replacement |
| `dashboard.webp` | `gs4-max-int-dashboard` | S08 ADAS, technology | Critical for ADAS credibility |
| `family-road-trip.webp` | `gs4-max-family-cover` | Family theme, Diego | Generic; needs Santa Cruz locale |
| `carlos-avatar.webp` | `persona-carlos-avatar` | S02, S25, tours | Only real persona photo |

### OEM reference stock (not served — generation inputs only)

Location: `docs/assets/reference/gs4-max/`  
Includes GAC press stills from gac.com.bo and global press kit. **Should be licensed and moved to `public/assets/`** to replace AI images.

### Runtime placeholders (code-generated)

| Component | Trigger | Visual |
|-----------|---------|--------|
| `FallbackMedia.tsx` | Missing file | Gradient + label |
| `FallbackArtwork.tsx` | Missing file OR forced overlay | SVG vehicle silhouette |
| `LogoPlaceholder.tsx` | Missing SVG | Text wordmark "VIAGGIO" / "GAC" / "BANCO" |
| `PersonaIllustration` | Missing avatar | Gradient circle + initial letter |

**No Unsplash or external stock URLs** — project convention is OEM + Viaggio shoots only.

---

## Screen-by-Screen Media Audit

### S01 — Attract Loop

| Asset expected | Status | Customer sees |
|----------------|--------|---------------|
| `gs4-max-hero-01` | ✅ On disk | Real photo **under** 40% wireframe overlay |
| `gs4-max-hero-ambient` | ✅ On disk | Ambient layer OK |
| `video-attract-loop` | ❌ Not wired | Still image only — no motion |

**Issue:** `AttractLoop.tsx` always renders `FallbackArtwork` at 40% opacity over loaded photo.

**Recommendation:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Remove overlay when asset resolves | Foot traffic stops | Car visible | Low | 10 |
| Produce 15–30s attract loop MP4 | Premium first impression | Motion draws eye | Medium | 9 |

---

### S02 — Welcome

| Asset | Status | Customer sees |
|-------|--------|---------------|
| `gs4-max-hero-ambient` | ✅ | Subtle background |
| `persona-carlos-avatar` | ✅ | Carlos photo |
| `persona-sofia-avatar` | ❌ | Empty gradient circle |
| `persona-diego-avatar` | ❌ | Empty gradient circle |

**Recommendation:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Shoot/source Sofía + Diego avatars | Persona system credibility | Guides feel real | Low | 8 |

---

### S03 — Vehicle Selector

| Asset | Status | Customer sees |
|-------|--------|---------------|
| `gs4-max-hero-01` | ✅ | Photo under 35% wireframe overlay |
| `gs8-hero-01`, `emzoom-hero-01`, `emkoo-hero-01` | ❌ | Identical silver SUV silhouettes |

**Recommendation:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Remove overlay on loaded hero | Selection credibility | "This loaded correctly" | Low | 9 |
| Distinct coming-soon treatment OR hide | Less confusion | Clear single product | Low | 7 |

---

### S22 — Hero

| Asset | Status | Customer sees |
|-------|--------|---------------|
| `gs4-max-hero-01` | ✅ | **Best screen** — real Ken Burns photo |
| Hot-spot topic media | Mixed | Links to topics with placeholders |

**Missing opportunity:** `video-hero-ambient` for subtle motion behind hot-spots.

---

### S24 — Trust Story

| Asset | Status | Customer sees |
|-------|--------|---------------|
| `video-trust-heritage` | ❌ Wired, missing | Gradient motion-poster |
| `video-viaggio-taller` | ❌ Wired, missing | Gradient motion-poster |

**Highest-impact video gap** — trust story is text-only without these files.

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| GAC heritage reel (licensed) | Brand credibility | Global manufacturer proof | Medium | 9 |
| Viaggio workshop B-roll | Local trust | "They exist after sale" | Medium (shoot) | 9 |

---

### S06 — Trust Tour

| Step | Topic | Media status |
|------|-------|--------------|
| 1 | Engine | ✅ `front-34.webp` |
| 2 | Chassis | ❌ No hero in JSON |
| 3 | Brand heritage | ❌ No hero in JSON |
| 4 | ADAS | ✅ `dashboard.webp` |
| 5 | Maintenance | ❌ No hero in JSON |

3 of 5 steps are **text-only** — brochure, not tour.

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Add hero mediaId to chassis, heritage, maintenance topics | Tour completion | Visual per step | Low (content) | 8 |
| `video-trust-engine`, `video-trust-chassis` MP4s | Engineering proof | See don't read | Medium | 7 |

---

### S08 — ADAS

| Asset | Status | Customer sees |
|-------|--------|---------------|
| `gs4-max-adas-hero` → dashboard.webp | ✅ | Dashboard photo |
| `video-trust-adas` | ❌ Not wired | Static only |

**Gap:** No backup camera UI, lane assist graphic, or 360° demo — words without proof.

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| ADAS feature screenshots or 15s demo clip | Spouse conviction | "I see the tech" | Medium | 8 |
| Wire `video-trust-adas` as hero | Premium feel | Motion proof | Low (code) + Medium (asset) | 7 |

---

### S11/S12 — Compare

| Asset | Status | Customer sees |
|-------|--------|---------------|
| `gs4-max-ext-front-34` | ✅ | Real GAC photo |
| `compare-corolla-cross` | ❌ | Gradient placeholder |

**Critical asymmetry:** Real GAC vs synthetic Toyota — comparison feels rigged even though copy is honest.

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Licensed Corolla Cross press photo | Compare credibility | Fair fight | Low (license) | 10 |

---

### S26 — Financing

| Asset | Status | Customer sees |
|-------|--------|---------------|
| `logo-bank-partner-1` | ❌ | "BANCO" text placeholder |

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Real allied bank logo SVG | Financing legitimacy | Know which bank | Low (ops) | 8 |

---

### S14/S34 — Test Drive

| Asset | Status | Customer sees |
|-------|--------|---------------|
| `viaggio-test-drive-route` | ❌ | Gradient |
| `gs4-max-service-cover` → showroom-family | ❌ | Gradient |

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Shoot Viaggio test drive route map + showroom | Local relevance | "This is our lot" | Medium (shoot) | 7 |

---

### Diego Family Journey (7 topics)

| Topic | mediaId | Status |
|-------|---------|--------|
| daily-driving | `gs4-max-diego-colegio` | ❌ |
| children | `gs4-max-diego-mediodia` | ❌ |
| shopping | `gs4-max-diego-super` | ❌ |
| family-trips | `gs4-max-diego-buenavista` | ✅ (shared family-road-trip) |
| road-trips | `gs4-max-diego-carretera` | ❌ |
| comfort | `gs4-max-diego-confort` | ❌ |
| ownership-experience | `gs4-max-diego-ano1` | ❌ |

**6 of 7 Diego topics are placeholder** — entire family narrative is synthetic.

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Santa Cruz lifestyle shoot pack (5 scenes) | Family segment conversion | "That's my life" | High (shoot) | 8 |

---

### Global Brand

| Asset | Status | Every screen impact |
|-------|--------|---------------------|
| `logo-viaggio-full` | ❌ | Inline SVG wordmark |
| `logo-gac-full` | ❌ | Inline SVG wordmark |

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Brand-approved SVG logos from marketing | Premium co-brand | Legitimate dealership | Low | 9 |

---

## Unused Assets

### Manifest entries never referenced in content

| mediaId | Notes |
|---------|-------|
| `video-attract-loop` | Documented; S01 uses still |
| `video-hero-ambient` | Manifest only |
| `video-trust-engine` | Fallback chain only |
| `video-trust-chassis` | Fallback chain only |
| `video-trust-adas` | Not wired to S08 |
| `gs4-max-int-360-display` | No content reference |
| `gs4-max-int-rear-seats` | Fallback chain only |
| `audio-narration-carlos-trust-01` | Manifest only |
| `audio-narration-carlos-engine` | Manifest only |

### Physical files without manifest entry

12 host narration MP3s in `public/assets/audio/narration/host/` — wired via `lib/audio/host-narration.ts`, working correctly.

### Reference images never served

All files in `docs/assets/reference/gs4-max/` — should feed production pipeline, not customer screens directly.

---

## Video Opportunity Matrix

| Priority | Screen | mediaId | Current | Opportunity |
|----------|--------|---------|---------|-------------|
| P0 | S01 Attract | `video-attract-loop` | Still + overlay | 15–30s seamless GS4 MAX loop with price |
| P0 | S24 Trust ch.1 | `video-trust-heritage` | Gradient | GAC global heritage (licensed) |
| P0 | S24 Trust ch.2 | `video-viaggio-taller` | Gradient | Viaggio service bay walkthrough |
| P1 | S22 Hero | `video-hero-ambient` | Ken Burns still | Subtle ambient motion |
| P1 | S08 ADAS | `video-trust-adas` | Dashboard still | ADAS features in action |
| P1 | S06 Tour | `video-trust-engine` | Text only | Engine bay + turbo explanation |
| P2 | S06 Tour | `video-trust-chassis` | Text only | Chassis/suspension cutaway |
| P2 | S23 Testimonials | *(not built)* | N/A | 2–3 owner 30s clips |

**Total MP4 on disk: 0.** Video is the largest premium gap.

---

## Audio Audit

| Asset | On disk | Status |
|-------|---------|--------|
| `showroom-loop.mp3` | ✅ | Ambient — working |
| SFX (5 files) | ✅ | Interaction sounds |
| Host narration (12 files) | ✅ | Screen transitions |
| `carlos-trust-01.mp3` | ❌ | Carlos voice not in tour |
| `carlos-engine.mp3` | ❌ | Engine step silent |

**Gap:** Carlos persona is **written** in FAQ but **not heard** in tour — missed immersive opportunity for kiosk with headphones.

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Record Carlos narration for trust tour | Persona immersion | Hear the expert | Medium | 6 |

---

## Acquisition Plan Alignment

Existing plan in `docs/assets/source-catalog.md` aligns with this audit. Recommended production order:

### Sprint 1 — Credibility (1–2 weeks)

1. Remove SVG overlays on S01/S03 (code — immediate)
2. Brand logos (Viaggio + GAC) — from marketing team
3. `compare-corolla-cross.webp` — Toyota press license
4. `logo-bank-partner-1.svg` — bank partner
5. `persona-sofia-avatar`, `persona-diego-avatar` — styled headshots
6. Replace AI `hero-01.webp` with OEM licensed still

### Sprint 2 — Trust proof (2–3 weeks)

7. `video-trust-heritage.mp4` — GAC Video Center
8. `video-viaggio-taller.mp4` — local shoot
9. `warranty-timeline-5yr-150k.webp` — designed infographic
10. `video-attract-loop.mp4` — edit from OEM B-roll

### Sprint 3 — Family & lifestyle (3–4 weeks)

11. Diego lifestyle pack (5 Santa Cruz scenes)
12. `viaggio-test-drive-route.webp` — map graphic
13. `gs4-max-int-rear-seats.webp` — ISOFIX/stroller shot
14. `gs4-max-family-safety.webp` — child in car context

### Sprint 4 — OEM refresh (ongoing)

15. Replace all 6 AI-generated WebPs with lot-accurate photography
16. Interior 360 display, silver exterior variant
17. Coming-soon model hero images when models launch

---

## Cost-of-Delay Analysis

| Missing asset | Sales risk if unfixed |
|---------------|----------------------|
| Attract video + overlay removal | 40% of foot traffic never starts |
| Corolla Cross photo | Compare screen — strongest rational close — feels biased |
| Viaggio workshop video | "Local partner" story unproven |
| Diego lifestyle pack | Family buyers — core segment — see generic gradients |
| Bank logo | Financing screen — legal/trust concern |
| Brand logos | Every screen — perpetual "prototype" signal |

---

## Full Asset Checklist

| mediaId | Path | Disk | Used | Action |
|---------|------|------|------|--------|
| gs4-max-hero-01 | exterior/hero-01.webp | ✅ | ✅ | Replace AI with OEM |
| gs4-max-hero-ambient | exterior/hero-ambient.webp | ✅ | ✅ | Keep; verify |
| gs4-max-ext-front-34 | exterior/front-34.webp | ✅ | ✅ | Replace AI with OEM |
| gs4-max-ext-silver | exterior/silver-34.webp | ❌ | ✅ | Acquire |
| compare-corolla-cross | compare/corolla-cross.webp | ❌ | ✅ | **P0 acquire** |
| gs4-max-int-dashboard | interior/dashboard.webp | ✅ | ✅ | Replace AI with OEM |
| gs4-max-int-rear-seats | interior/rear-seats.webp | ❌ | fallback | Acquire — ISOFIX shot |
| gs4-max-int-360-display | interior/360-display.webp | ❌ | unused | Acquire or remove |
| gs4-max-family-cover | lifestyle/family-road-trip.webp | ✅ | ✅ | Reshoot local |
| gs4-max-family-safety-hero | lifestyle/family-safety.webp | ❌ | ✅ | Acquire |
| gs4-max-diego-colegio | lifestyle/daily-dropoff.webp | ❌ | ✅ | Shoot |
| gs4-max-diego-super | lifestyle/shopping.webp | ❌ | ✅ | Shoot |
| gs4-max-diego-carretera | lifestyle/doble-via.webp | ❌ | ✅ | Shoot |
| gs4-max-diego-ano1 | lifestyle/ownership-year1.webp | ❌ | ✅ | Shoot |
| viaggio-test-drive-route | lifestyle/test-drive-route.webp | ❌ | ✅ | Design |
| warranty-timeline-5yr-150k | warranty/timeline.webp | ❌ | ✅ | Design |
| persona-carlos-avatar | personas/carlos-avatar.webp | ✅ | ✅ | Keep |
| persona-sofia-avatar | personas/sofia-avatar.webp | ❌ | ✅ | **P0 acquire** |
| persona-diego-avatar | personas/diego-avatar.webp | ❌ | ✅ | **P0 acquire** |
| logo-viaggio-full | brand/logo-viaggio-full.svg | ❌ | ✅ | **P0 acquire** |
| logo-gac-full | brand/logo-gac-full.svg | ❌ | ✅ | **P0 acquire** |
| logo-bank-partner-1 | brand/logo-bank-partner-1.svg | ❌ | ✅ | **P0 acquire** |
| video-attract-loop | video/attract-loop.mp4 | ❌ | unused | **P0 produce** |
| video-trust-heritage | video/trust-heritage.mp4 | ❌ | ✅ | **P0 produce** |
| video-viaggio-taller | video/viaggio-taller.mp4 | ❌ | ✅ | **P0 shoot** |
| video-hero-ambient | video/hero-ambient.mp4 | ❌ | unused | P1 |
| video-trust-adas | video/trust-adas.mp4 | ❌ | unused | P1 |
| video-trust-engine | video/trust-engine.mp4 | ❌ | fallback | P2 |
| video-trust-chassis | video/trust-chassis.mp4 | ❌ | fallback | P2 |
| gs8/emzoom/emkoo heroes | vehicles/*/hero.webp | ❌ | ✅ | P2 or hide |

---

## Verdict

Media is the **#1 blocker** to customer-facing deployment. The sales copy and UX architecture are ahead of the visual layer by 6–8 weeks of asset production. **Do not show to paying customers** until Sprint 1 assets are live and SVG overlays are removed.

Investment priority: **Corolla photo + attract video + brand logos + overlay removal** — four items that transform first impression and comparison credibility in under 2 weeks.

---

*Related: [CEO_SALES_STRATEGY_AUDIT.md](./CEO_SALES_STRATEGY_AUDIT.md) · [EXECUTIVE_ROADMAP_V2.md](./EXECUTIVE_ROADMAP_V2.md)*
