# Asset Readiness Audit — Viaggio Digital Showroom

**Audit date:** 14 June 2026  
**Scope:** GAC GS4 MAX MVP demo path (S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15)  
**Inputs reviewed:**
- [docs/assets/asset-acquisition-plan.md](./assets/asset-acquisition-plan.md)
- [docs/assets/source-catalog.md](./assets/source-catalog.md)
- [docs/creative-direction.md](./creative-direction.md)
- `public/assets/` (filesystem)
- `content/**` media references
- `components/media/PlaceholderMedia.tsx` and all consumers

**Method:** Read-only inspection. No downloads. No implementation.

---

## Executive Summary

| Dimension | Status |
|-----------|--------|
| **Asset files in `public/assets/`** | 0 — scaffold only (`.gitkeep`) |
| **Media manifest in content** | Not deployed — template exists in `docs/content/templates/media-manifest.gs4-max.json` |
| **Real media resolver** | Not implemented — all surfaces render `PlaceholderMedia` gradients |
| **P0 assets acquired** | 0 / 18 |
| **MVP demo path with real media** | 0 / 16 screens |

The showroom is **functionally walkable** with gradient placeholders labeled by `mediaId`, but it does **not** meet creative-direction “product theater” standards. Every referenced asset is missing on disk.

### Readiness Scores

| Score | Value | Rationale |
|-------|-------|-----------|
| **Demo readiness** | **22 / 100** | Navigation and content JSON are wired; placeholder system covers all surfaces; zero cinematic assets, logos, videos, or persona portraits render as real media; compare (S11/S12) and financing (S26) are stub pages. |
| **Production readiness** | **6 / 100** | No acquired assets, no manifest registration, no media pipeline, no licensing sign-off, dealership contact data still placeholder, persona avatars not rendered even when defined. |

---

## Infrastructure State

### `public/assets/` — Implemented (scaffold only)

```
public/assets/
├── brand/          (.gitkeep)
├── personas/       (.gitkeep)
└── vehicles/
    ├── emkoo/      (.gitkeep)
    ├── emzoom/     (.gitkeep)
    ├── gs4-max/
    │   ├── exterior/   (.gitkeep)
    │   ├── interior/   (.gitkeep)
    │   └── lifestyle/  (.gitkeep)
    └── gs8/        (.gitkeep)
```

**No** `.webp`, `.mp4`, `.svg`, `.png`, or `.pdf` files exist anywhere under `public/assets/`.

### Rendering pipeline — Placeholder-only

All image/video surfaces route through `PlaceholderMedia` → `getPlaceholderMedia()` in `lib/media/placeholders.ts`. The component renders:

- A deterministic CSS gradient keyed by `mediaId` hash
- Optional Ken Burns–style radial pulse
- No file fetch, no `<img>`, no `<video>`, no manifest lookup

**Implication:** There are no runtime 404s today, but every `mediaId` is logically unresolved.

### Planned manifest — Template only

`docs/content/templates/media-manifest.gs4-max.json` defines 6 asset mappings with `src` paths. None are copied to `content/vehicles/gs4-max/media-manifest.json`. No application code reads manifest paths.

| Manifest `id` | Planned `src` | File exists |
|---------------|---------------|-------------|
| `gs4-max-hero-01` | `/assets/vehicles/gs4-max/hero.webp` | ✗ |
| `gs4-max-adas-hero` | `/assets/vehicles/gs4-max/interior/dashboard.webp` | ✗ |
| `gs4-max-family-cover` | `/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp` | ✗ |
| `persona-carlos-avatar` | `/assets/personas/carlos-avatar.webp` | ✗ |
| `persona-sofia-avatar` | `/assets/personas/sofia-avatar.webp` | ✗ |
| `persona-diego-avatar` | `/assets/personas/diego-avatar.webp` | ✗ |

---

## Assets Implemented

| Category | What exists | Notes |
|----------|-------------|-------|
| **Folder scaffold** | `public/assets/{brand,personas,vehicles}` | Matches `docs/folder-structure.md` |
| **Placeholder renderer** | `PlaceholderMedia` + 5 gradient variants | Used on 14+ screen components |
| **Content `mediaId` wiring** | 40+ unique IDs in JSON | IDs resolve to gradients, not files |
| **Persona schema** | `avatarMediaId` on all 3 personas | `PersonaPortrait` renders colored initials — **avatars not displayed** |
| **Global header** | Text co-brand (`brand` + `dealershipName`) | **No** `logo-viaggio-full` / `logo-gac-full` assets or references |
| **Media manifest template** | 6 entries in docs | Not integrated |

**Count of real media assets on disk: 0**

---

## Assets Missing

### P0 — Demo blockers (per acquisition plan + source catalog)

| # | Asset ID | Type | MVP screens |
|---|----------|------|-------------|
| 1 | `gs4-max-hero-01` | Image | S01 fallback, S03, S22, S11, S13 |
| 2 | `gs4-max-hero-ambient` | Image | S01/S02 ambient, S22, Sofía experience |
| 3 | `video-attract-loop` | Video | S01 (planned; **not wired in code**) |
| 4 | `gs4-max-ext-front-34` | Image | S22 Motor hot-spot, S06 step 1, S11 |
| 5 | `gs4-max-ext-silver` | Image | S03, S22, Sofía experience |
| 6 | `compare-corolla-cross` | Image | S11, S12 (**routes not implemented**) |
| 7 | `gs4-max-int-dashboard` | Image | S22 Interior, S08 ADAS, S06 step 4 |
| 8 | `gs4-max-int-rear-seats` | Image | S08 family-space |
| 9 | `gs4-max-int-360-display` | Image | S08 ADAS feature grid |
| 10 | `warranty-timeline-5yr-150k` | Graphic | S06 step 6, S25 FAQ |
| 11 | `logo-viaggio-full` | SVG/PNG | S01, S02, GlobalHeader (all screens) |
| 12 | `logo-gac-full` | SVG/PNG | S01, S02, GlobalHeader, S24 |
| 13 | `persona-carlos-avatar` | Illustration | S06, S08, S25, Carlos experience |
| 14 | `persona-sofia-avatar` | Illustration | S12 callouts, PersonaStrip |
| 15 | `persona-diego-avatar` | Illustration | S08 family, PersonaStrip |
| 16 | `video-trust-adas` | Video | S06 step 4, S08 ADAS |
| 17 | `ficha-tecnica-gs4-max` | PDF | Content QA (S08, S12 stats) |
| 18 | `price-list-orientativo` | PDF (internal) | S22 stats, S26 cuota bands |

### P1 — Demo path polish (screens in scripted walkthrough)

| Asset ID | Type | Screens | Status |
|----------|------|---------|--------|
| `video-trust-heritage` | Video | S24 Chapter A | Referenced in `trust-story.json` |
| `video-viaggio-taller` | Video | S24 Chapter B | Referenced in `trust-story.json` |
| `video-hero-ambient` | Video | S22 motion layer | Not referenced in content |
| `logo-bank-partner-1` | Logo | S26 | Financing is `PlaceholderPage` |
| `gs4-max-family-cover` | Image | S08 family, test-drive logistics | Referenced; no file |
| `viaggio-service-map-pin` | Graphic | S24 footer | Not referenced in content |
| Viaggio showroom photo | Photo | S24 Chapter B | Not referenced (videos used instead) |

### Content-referenced assets beyond P0/P1 (not on disk)

These IDs appear in `content/` but are absent from the P0 checklist. All render as placeholders.

| Asset ID | Referenced in |
|----------|---------------|
| `gs4-max-adas-hero` | `topics/adas.json` (alias target: `gs4-max-int-dashboard` per manifest template) |
| `gs4-max-family-safety-hero` | `topics/family-safety.json` |
| `gs4-max-safety-cover` | `themes/safety.json` |
| `gs4-max-reliability-cover` | `themes/reliability.json` |
| `gs4-max-technology-cover` | `themes/technology.json`, `topics/tech-overview.json` |
| `gs4-max-warranty-cover` | `themes/warranty-service.json` |
| `gs4-max-service-cover` | `topics/viaggio-service.json` |
| `gs4-max-diego-colegio` | `topics/daily-driving.json` |
| `gs4-max-diego-mediodia` | `topics/children.json` |
| `gs4-max-diego-super` | `topics/shopping.json` |
| `gs4-max-diego-buenavista` | `topics/family-trips.json` |
| `gs4-max-diego-carretera` | `topics/road-trips.json` |
| `gs4-max-diego-confort` | `topics/comfort.json` |
| `gs4-max-diego-ano1` | `topics/ownership-experience.json` |
| `viaggio-test-drive-route` | `shared/test-drive-logistics.json` |
| `emkoo-hero-01` | Coming-soon vehicle card |
| `emzoom-hero-01` | Coming-soon vehicle card |
| `gs8-hero-01` | Coming-soon vehicle card |

### Tour computed fallbacks (no hero block in topic JSON)

Trust tour steps without a `hero` block receive synthetic IDs:

| Step | Topic | Fallback `mediaId` |
|------|-------|-------------------|
| trust-02 | `chassis` | `gs4-max-tour-trust-02` |
| trust-03 | `brand-heritage` | `gs4-max-tour-trust-03` |
| trust-07 | `maintenance` | `gs4-max-tour-trust-07` |

Family tour generates `gs4-max-tour-diego-01` … `gs4-max-tour-diego-07` only when topic hero is absent (all Diego topics have heroes).

---

## Broken References

### Runtime HTTP 404s

**None observed** — the app never requests `/assets/*` URLs.

### Logical broken references (content → missing files)

Every `mediaId`, `heroMediaId`, `coverMediaId`, and `avatarMediaId` in active content points to a non-existent file. **40 unique IDs, 0 files.**

### Manifest `src` paths (would 404 if resolver were enabled)

| Path | Referenced by |
|------|---------------|
| `/assets/vehicles/gs4-max/hero.webp` | Manifest template |
| `/assets/vehicles/gs4-max/interior/dashboard.webp` | Manifest template |
| `/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp` | Manifest template |
| `/assets/personas/carlos-avatar.webp` | Manifest template |
| `/assets/personas/sofia-avatar.webp` | Manifest template |
| `/assets/personas/diego-avatar.webp` | Manifest template |

### Plan ↔ implementation mismatches

| Issue | Plan | Code reality |
|-------|------|--------------|
| S01 attract media | `video-attract-loop` (P0) | `app/(showroom)/page.tsx` passes `vehicle.heroMediaId` → `gs4-max-hero-01` |
| GlobalHeader logos | `logo-viaggio-full` + `logo-gac-full` | Text-only header |
| Persona avatars | Commissioned portraits (P0) | `PersonaPortrait` shows initial letter in colored circle |
| Compare flow | S11/S12 with `compare-corolla-cross` | No `compare/` route; template only in `docs/content/templates/` |
| Financing | S26 with bank logos + cuota | `PlaceholderPage` stub |
| Dealership data | Real address / WhatsApp | `dealership.json` has `+59100000000` and `[Dirección del showroom…]` placeholders |
| ADAS hero alias | `gs4-max-int-dashboard` | Content uses separate ID `gs4-max-adas-hero` (unmapped in manifest) |

---

## Placeholder References

All surfaces below render `PlaceholderMedia` (gradient + hash label). None load real assets.

| Component / screen | Screen ID | Media source |
|--------------------|-----------|--------------|
| `AttractLoop` | S01 | `attractMediaId` → `gs4-max-hero-01` |
| `WelcomeScreen` | S02 | No media (text only) |
| `VehicleSelector` | S03 | `heroMediaId` per vehicle |
| `VehicleHero` | S22 | `heroMediaId` → `gs4-max-hero-01` |
| `CarlosTrustExperienceScreen` | S25/S24 combined | `intro.mediaId`, chapter `mediaId` |
| `TrustStoryScreen` | S24 | `video-trust-heritage`, `video-viaggio-taller` |
| `TourPlayer` | S06 | Step hero or `gs4-max-tour-{stepId}` fallback |
| `HeroRenderer` / topic pages | S08 | Per-topic `mediaId` |
| `ThemeExperience` | Theme hubs | `coverMediaId` |
| `SofiaExperienceScreen` | Sofía journey | `gs4-max-hero-ambient`, nested heroes |
| `TestDriveCTA` | S14 | Vehicle `heroMediaId` |
| `TestDriveLogisticsScreen` | Test-drive prep | `gs4-max-family-cover`, route map |
| `FamilySafetyTopicScreen` | Safety topic | `gs4-max-family-safety-hero` |
| `FinancingPage` | S26 | `PlaceholderPage` (no media component) |

**Placeholder coverage: 100% of media slots** — functional for dev walkthrough, insufficient for stakeholder demo.

---

## Hero Media Readiness

| Requirement (creative direction) | Status | Gap |
|----------------------------------|--------|-----|
| S01 full-bleed `video-attract-loop` | ✗ | Code uses still `gs4-max-hero-01`; no video player |
| S01 fallback `gs4-max-hero-ambient` | ✗ | No file; reduced-motion path untested with real still |
| S03 cinematic card `gs4-max-hero-01` + `gs4-max-ext-silver` | ✗ | Gradients only |
| S22 full-bleed hero + hot-spots | ✗ | Hero placeholder; hot-spot targets exist in `vehicle.json` but no region-specific crops |
| S22 ambient `video-hero-ambient` or parallax stills | ✗ | Not referenced in implementation |
| S13 recap thumbnail `gs4-max-hero-01` | ✗ | Convert hub not audited for dedicated hero — uses vehicle data |
| Co-brand logos on attract/welcome | ✗ | Text header only |

### Hero readiness score: **5 / 100**

Hot-spot coordinates and stat strip copy are ready; visual layer is entirely placeholder.

---

## Tour Media Readiness

### Carlos Trust Tour (`content/vehicles/gs4-max/tours/trust.json`) — 8 steps

| Step | Title | Resolved `mediaId` | Asset on disk | Creative-direction match |
|------|-------|-------------------|---------------|--------------------------|
| 1 | Motor y rendimiento | `gs4-max-ext-front-34` | ✗ | Static engine/front 3/4 — OK mapping |
| 2 | Chasis y durabilidad | `gs4-max-tour-trust-02` | ✗ | Plan: structure still; **no topic hero defined** |
| 3 | GAC en el mundo | `gs4-max-tour-trust-03` | ✗ | Plan: heritage clip; **no topic hero** |
| 4 | Asistencias al conductor | `gs4-max-adas-hero` | ✗ | Plan: `video-trust-adas`; code renders static placeholder |
| 5 | Estructura y airbags | `gs4-max-ext-front-34` | ✗ | Reuses exterior — acceptable fallback |
| 6 | Garantía GAC | `warranty-timeline-5yr-150k` | ✗ | Designed graphic — **P0-produce** |
| 7 | Mantenimiento programado | `gs4-max-tour-trust-07` | ✗ | No topic hero |
| 8 | Servicio en Viaggio | `gs4-max-service-cover` | ✗ | Local service cover — not in P0 list |

**MVP plan specified 5 steps; implementation has 8.** Steps 2, 3, 7 lack dedicated assets in acquisition plan.

### Family Tour (`tours/family.json`) — 7 Diego steps

All steps have topic-level hero `mediaId`s (lifestyle IDs). **0 / 7 assets on disk.**

### Tour readiness score: **8 / 100**

Tour JSON and narration content exist; media layer is 100% placeholder. No video playback in `TourPlayer`.

---

## Trust Media Readiness

Trust surfaces span S25 (FAQ), S24 (trust story), S06 (tour), and Carlos experience.

| Surface | Required assets (plan) | Referenced in content | On disk |
|---------|---------------------|----------------------|---------|
| S25 FAQ | `persona-carlos-avatar` | `experience/carlos.json` → intro background | ✗ |
| S25 optional | `gs4-max-safety-latin-ncap` | Not referenced | ✗ |
| S24 GAC chapter | `video-trust-heritage`, GAC logo | `trust-story.json` | ✗ |
| S24 Viaggio chapter | `video-viaggio-taller`, showroom photo | `trust-story.json` (video only) | ✗ |
| S06 ADAS step | `video-trust-adas` | Via `adas` topic → `gs4-max-adas-hero` | ✗ |
| S06 warranty | `warranty-timeline-5yr-150k` | `warranty-terms.json` | ✗ |
| Persona portraits | 3 commissioned avatars | `personas.json` | ✗ (not rendered) |
| Safety proxy | `gs4-max-int-dashboard` + ficha PDF | Dashboard ID used; PDF not in repo | ✗ |

### Trust readiness score: **10 / 100**

Copy and structure are demo-ready; trust *visual proof* (OEM reel, taller video, warranty infographic, NCAP badge, real avatars) is entirely absent.

---

## MVP Demo Path — Screen-by-Screen Asset Status

| Screen | Key assets required | Real media | Placeholder |
|--------|---------------------|------------|-------------|
| S01 Attract | `video-attract-loop`, logos | ✗ | ✓ |
| S02 Welcome | logos, ambient hero (optional) | ✗ | partial (no hero) |
| S03 Selector | `gs4-max-hero-01`, `gs4-max-ext-silver` | ✗ | ✓ |
| S22 Hero | hero + hot-spot crops + ambient video | ✗ | ✓ |
| S25 FAQ | `persona-carlos-avatar` | ✗ | ✓ |
| S24 Trust story | `video-trust-heritage`, `video-viaggio-taller` | ✗ | ✓ |
| S06 Tour | 8 step media IDs (see above) | ✗ | ✓ |
| S08 Topic | ADAS + family heroes | ✗ | ✓ |
| S11 Compare hub | `compare-corolla-cross`, anchor hero | **N/A** — not built | — |
| S12 Compare detail | Same + persona callouts | **N/A** — not built | — |
| S26 Financing | `price-list-orientativo`, bank logo | **N/A** — stub page | — |
| S13 Convert | recap hero, Viaggio logo | ✗ | partial |
| S14 Test drive | optional sheet background | ✗ | ✓ |
| S15 WhatsApp | QR (generated), `logo-viaggio-full` | partial (QR TBD) | — |

---

## Exact Asset List Still Needed for MVP Demo

Minimum set to replace placeholders on the **scripted 16-screen demo path** and pass creative-direction review. Ordered by acquisition priority.

### Must acquire or produce (18 P0)

```
gs4-max-hero-01
gs4-max-hero-ambient
video-attract-loop
gs4-max-ext-front-34
gs4-max-ext-silver
compare-corolla-cross
gs4-max-int-dashboard
gs4-max-int-rear-seats
gs4-max-int-360-display
warranty-timeline-5yr-150k
logo-viaggio-full
logo-gac-full
persona-carlos-avatar
persona-sofia-avatar
persona-diego-avatar
video-trust-adas
ficha-tecnica-gs4-max          # PDF — content QA, not kiosk display
price-list-orientativo         # PDF — internal pricing for S26 bands
```

### Strongly recommended for demo path (5 P1)

```
video-trust-heritage           # S24 Chapter A
video-viaggio-taller         # S24 Chapter B
gs4-max-family-cover         # S08 family-space, test-drive logistics
logo-bank-partner-1            # S26 (once financing UI is built)
viaggio-service-map-pin        # S24 footer (or text-only fallback)
```

### Content-alias resolution (map before manifest registration)

| Content ID | Resolve to |
|------------|------------|
| `gs4-max-adas-hero` | `gs4-max-int-dashboard` (or dedicated ADAS crop) |
| `gs4-max-technology-cover` | `gs4-max-int-dashboard` or tech hero still |
| `gs4-max-reliability-cover` | `gs4-max-ext-front-34` |
| `gs4-max-safety-cover` | `gs4-max-int-dashboard` or safety diagram (P1) |
| `gs4-max-warranty-cover` | `warranty-timeline-5yr-150k` |
| `gs4-max-service-cover` | Viaggio showroom/taller photo (produce) |

### Tour step gaps requiring new assets or topic hero blocks

| Fallback ID | Recommended asset |
|-------------|-------------------|
| `gs4-max-tour-trust-02` | `gs4-max-safety-structure` (P1) or chassis still |
| `gs4-max-tour-trust-03` | `video-trust-heritage` frame or GAC heritage still |
| `gs4-max-tour-trust-07` | `warranty-service-intervals` graphic (P1) |

### Implementation prerequisites (not assets, but demo blockers)

1. Wire `video-attract-loop` on S01 (currently `gs4-max-hero-01`)
2. Integrate `media-manifest.json` + real media component (replace or augment `PlaceholderMedia`)
3. Render `logo-viaggio-full` / `logo-gac-full` in `GlobalHeader`
4. Render `avatarMediaId` in `PersonaPortrait` / `TourPlayer`
5. Build compare routes (S11/S12) before `compare-corolla-cross` is visible
6. Replace S26 `PlaceholderPage` with financing UI
7. Update `dealership.json` with real address and WhatsApp number

---

## Licensing & Approval Status

Per acquisition plan — **no evidence of completed approvals** in repository:

- [ ] GAC Bolivia kiosk display license
- [ ] Viaggio marketing sign-off on photography/graphics
- [ ] Toyota press terms for `compare-corolla-cross`
- [ ] Persona commission approval
- [ ] Sales manager approval on `price-list-orientativo`
- [ ] Bank partner logo authorization

---

## Recommended Next Steps (audit-only recommendations)

1. **Day 0–1:** Request GAC Bolivia press kit + ficha técnica via Viaggio; collect logo vectors.
2. **Day 1–2:** Sales approves orientative pricing; designer starts `warranty-timeline-5yr-150k`.
3. **Day 2–4:** Commission persona avatars; edit `video-attract-loop` and `video-trust-adas` from GAC Video Center (with license).
4. **Day 3–5:** Local Viaggio shoot for `gs4-max-ext-silver`, `gs4-max-family-cover`, taller B-roll.
5. **Day 5–7:** Register assets in `content/vehicles/gs4-max/media-manifest.json`, implement media resolver, replace placeholders on MVP path screens.

---

## Related Documents

- [Asset Acquisition Plan](./assets/asset-acquisition-plan.md)
- [Source Catalog](./assets/source-catalog.md)
- [Creative Direction](./creative-direction.md)
- [Media Manifest Template](./content/templates/media-manifest.gs4-max.json)
- [Folder Structure](./folder-structure.md)

---

*Audit complete — no files downloaded, no code modified.*
