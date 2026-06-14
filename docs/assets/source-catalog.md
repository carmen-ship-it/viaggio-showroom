# Source Catalog — MVP Demo P0 Assets

Human-facing acquisition guide for every **P0 (demo blocker)** asset defined in [asset-acquisition-plan.md](./asset-acquisition-plan.md). Use this document to collect, request, and approve media before anything is downloaded or committed to `public/assets/`.

**Primary vehicle:** GAC GS4 MAX (`gs4-max`)  
**Demo location:** Viaggio Motors Santa Cruz  
**Target formats:** WebP (1920px+ long edge), MP4 (H.264 1080p), SVG/PNG logos, PDF brochures

> **Do not download files from this document alone.** Confirm licensing and written approval (GAC Bolivia, Viaggio marketing, competitor press terms) before saving assets locally.

---

## How to Use This Catalog

1. Work **top to bottom** by category (matches the MVP checklist order).
2. For each asset, contact sources in this order: **Dealership → Manufacturer distributor → Manufacturer global → Press/media → Brochure/PDF**.
3. Record the **exact file name** and **approval contact** in your collection spreadsheet when an asset is received.
4. Cross-check specs and copy against `ficha-tecnica-gs4-max` before registering in `media-manifest.json`.

### Priority Legend

| Priority | Meaning |
|----------|---------|
| **P0** | Demo blocker — kiosk walkthrough fails without it |
| **P0-fallback** | Acceptable stand-in until primary asset is approved |
| **P0-produce** | Must be created locally; no OEM download exists |

---

## Official Channel Index

Quick reference for the five source types used throughout this catalog.

| Source type | Organization | Primary URL | What to request here |
|-------------|--------------|-------------|----------------------|
| **Official source website** | GAC Motor Bolivia (product site) | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | On-page hero imagery, “Ficha técnica” link, pricing, Bolivia-specific copy |
| **Official brochure source** | GAC Motor Bolivia + global catalogue | [gac.com.bo](https://www.gac.com.bo) · [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | Ficha técnica (es), warranty booklet, maintenance schedule |
| **Official manufacturer source** | GAC Motor International | [gac-motor.com GS4 MAX hub](https://www.gac-motor.com/en/models/gacmotor/gs4max/overview.html) | Wallpaper ZIP, catalogue PDF, performance/safety stills, video B-roll |
| **Official dealership source** | Viaggio Motor S.A. (Grupo Roda) | [viaggio.com.bo](https://viaggio.com.bo) · [GAC showroom locator](https://www.gac.com.bo) | Brand kit, logo vectors, internal pricing, local unit photography, persona brief |
| **Official press/media source** | Launch coverage + OEM media center | [GAC Video Center](https://www.gac-motor.com/en/media/video.html) · [InfoDiez launch article](https://www.infodiez.com/viaggio-presento-la-nueva-gs4-max-la-evolucion-del-diseno-y-la-tecnologia-de-gac-motor/) | Launch event photos, editorial stills, licensed B-roll |

### Key contacts (request via dealership)

| Need | Contact path |
|------|----------------|
| GAC Bolivia press kit + kiosk display license | Viaggio marketing → GAC Motor Bolivia national office |
| Logo vectors + co-brand lockup | Viaggio marketing (`viaggio.com.bo` contact form) |
| Internal orientative pricing | Viaggio Santa Cruz sales manager |
| Persona avatar commission | Viaggio marketing + approved designer |
| Warranty graphic source PDF | Viaggio service manager + GAC Bolivia after-sales |

---

## P0 Asset Checklist (Quick Reference)

| Category | Asset IDs |
|----------|-----------|
| Hero | `gs4-max-hero-01`, `gs4-max-hero-ambient`, `video-attract-loop` |
| Exterior | `gs4-max-ext-front-34`, `gs4-max-ext-silver`, `compare-corolla-cross` |
| Interior | `gs4-max-int-dashboard`, `gs4-max-int-rear-seats` |
| Safety | Proxy: `gs4-max-int-dashboard` + technical PDF (until diagrams ready) |
| Technology | Reuse: `gs4-max-int-dashboard`, `gs4-max-int-360-display` |
| Warranty | `warranty-timeline-5yr-150k` |
| Logos | `logo-viaggio-full`, `logo-gac-full`, `persona-carlos-avatar`, `persona-sofia-avatar`, `persona-diego-avatar` |
| Brochures | `ficha-tecnica-gs4-max`, `price-list-orientativo` |
| Safety video | `video-trust-adas` |

---

## Hero

### `gs4-max-hero-01` — GS4 MAX exterior 3/4 front (plata / hero color)

Primary vehicle identity; product theater backdrop. Screens: S01 fallback, S03 card, S22 immersive hero, S13 recap.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Hero still (on-page) | P0 | Reference crop for Bolivia-market color; verify against inventory unit |
| Official brochure source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | Print-ready hero spread | P0-fallback | Extract high-res spread if press ZIP unavailable; confirm color name |
| Official manufacturer source | [GS4 MAX Wallpaper ZIP](https://www.gac-motor.com/static/en/model/wallpaper/GS4-MAX.zip) | Hi-res still pack | **P0** | Select 3/4 front plateado; export WebP 1920px+ |
| Official manufacturer source | [GS4 MAX Overview](https://www.gac-motor.com/en/models/gacmotor/gs4max/overview.html) | Page hero imagery | P0-fallback | Screenshot reference only — prefer ZIP originals |
| Official dealership source | Viaggio Santa Cruz showroom — [gac.com.bo locations](https://www.gac.com.bo) | Inventory unit photo | P0-fallback | Shoot 3/4 front if OEM kit delayed; match plata default |
| Official press/media source | [InfoDiez — GS4 MAX Bolivia launch](https://www.infodiez.com/viaggio-presento-la-nueva-gs4-max-la-evolucion-del-diseno-y-la-tecnologia-de-gac-motor/) | Event photography | P0-fallback | Editorial stills; request hi-res from Viaggio PR |

---

### `gs4-max-hero-ambient` — Wide cinematic still (UI safe zone)

Secondary hero layer; parallax and reduced-motion fallback. Screens: S22, S01 attract fallback.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Wide banner still | P0-fallback | Identify widest on-page crop with negative space for UI overlay |
| Official brochure source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | Landscape spread | P0 | Crop center-weighted; leave top/bottom safe for hot-spot chrome |
| Official manufacturer source | [GS4 MAX Wallpaper ZIP](https://www.gac-motor.com/static/en/model/wallpaper/GS4-MAX.zip) | Ultra-wide still | **P0** | Pick environmental wide shot; re-crop to 16:9 kiosk aspect |
| Official manufacturer source | [GAC Video Center](https://www.gac-motor.com/en/media/video.html) | B-roll frame grab | P0-fallback | Extract keyframe from GS4 MAX reel if still insufficient |
| Official dealership source | Viaggio marketing photo archive / [Instagram @viaggiomotors](https://instagram.com/viaggiomotors) | Lifestyle wide | P0-fallback | Local Santa Cruz context if OEM ambient lacks regional feel |
| Official press/media source | [Magazine Management — GS4 MAX launch](https://www.magazinemanagement.gm-bolivia.com/gac-motor-lanza-la-nueva-gs4-max-en-bolivia-reafirmando-su-liderazgo-en-el-mercado-de-suvs/) | Event wide shots | P0-fallback | Request permission for kiosk use via Viaggio |

---

### `video-attract-loop` — Cinematic attract loop (15–30 s, seamless)

Draws floor traffic when kiosk idle. Screen: S01 Attract Loop.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Embedded promo clip | P0-fallback | Reference only — likely not loop-safe |
| Official brochure source | — | — | — | Not applicable for video |
| Official manufacturer source | [GAC Video Center](https://www.gac-motor.com/en/media/video.html) | Launch reel / B-roll | **P0** | License GS4 MAX exterior reel; edit seamless 15–30 s loop, mute default |
| Official manufacturer source | [GS4 MAX Wallpaper ZIP](https://www.gac-motor.com/static/en/model/wallpaper/GS4-MAX.zip) | Companion motion assets | P0-fallback | Check ZIP for bundled video before separate edit |
| Official dealership source | Viaggio marketing → GAC Bolivia | Approved kiosk reel | **P0** | Request Bolivia-localized edit with written display permission |
| Official press/media source | [GAC News](https://www.gac-motor.com/en/media/news.html) | Campaign video links | P0-fallback | Source alternate angles if primary reel unavailable |

**Static fallback:** Use `gs4-max-hero-01` if video license is pending.

---

## Exterior

### `gs4-max-ext-front-34` — Front 3/4, default hero color

Hot-spot “Motor”; gallery exterior tab. Screens: S22 Motor hot-spot, S09 (Phase 2).

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Exterior still | P0-fallback | Match default trim/color to Bolivia listing |
| Official brochure source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | Front 3/4 render | P0 | Clean angle for hot-spot anchor |
| Official manufacturer source | [GS4 MAX Wallpaper ZIP](https://www.gac-motor.com/static/en/model/wallpaper/GS4-MAX.zip) | Front 3/4 hi-res | **P0** | Primary source; isolate motor area for hot-spot target |
| Official manufacturer source | [GS4 MAX Specification](https://www.gac-motor.com/en/models/gacmotor/gs4max/specification.html) | Spec-page imagery | P0-fallback | Secondary angle reference |
| Official dealership source | Viaggio inventory unit — Av. Banzer showrooms | Unit photography | P0-fallback | Shoot if press kit color mismatch |
| Official press/media source | [Economy.com.bo — GS4 MAX launch](https://www.economy.com.bo/articulo/life/llego-bolivia-nueva-gs4-max-evolucion-diseno-tecnologia-gac-motor/20241207121654016247.html) | Launch exterior stills | P0-fallback | Editorial backup |

---

### `gs4-max-ext-silver` — Plata exterior 3/4

Color swatch render (manifest default). Screens: S30, S03 card, S22.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Color swatch / hero | P0 | Confirm plata is listed color; capture on-page swatch |
| Official brochure source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | Color panel page | P0 | Verify color name against Bolivia ficha |
| Official manufacturer source | [GS4 MAX Wallpaper ZIP](https://www.gac-motor.com/static/en/model/wallpaper/GS4-MAX.zip) | Plata/silver 3/4 | **P0** | Default configurator swatch; consistent lighting with `gs4-max-hero-01` |
| Official manufacturer source | [Spanish GS4 MAX MX datasheet index](https://en.gac.autoclub.eu/manuals.php?ddlb_category=12) | Regional color sheet | P0-fallback | Cross-check Latin America color naming |
| Official dealership source | Viaggio Santa Cruz stock — [gac.com.bo](https://www.gac.com.bo) | Inventory plata unit | **P0** | Photograph actual unit if OEM plata differs from lot stock |
| Official press/media source | [Qamasa — Viaggio GS4 MAX launch](https://www.qamasa.com/viaggio-presento-la-nueva-gs4-max-la-evolucion-del-diseno-y-la-tecnologia-de-gac-motor.html) | Event silver unit | P0-fallback | Identify plata vehicle from launch coverage |

---

### `compare-corolla-cross` — Toyota Corolla Cross thumbnail

Compare target picker visual (demo default). Screens: S11, S12.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [toyota.com Corolla Cross gallery](https://www.toyota.com/corollacross/photo-gallery/) | Consumer gallery still | P0-fallback | Reference only — not licensed for kiosk |
| Official brochure source | [Toyota Canada — Corolla Cross product info](https://media.toyota.ca/en/models/corolla-cross.html) | Product PDF / specs | P0-fallback | Spec verification for compare rows |
| Official manufacturer source | [Toyota USA Newsroom — 2024 Corolla Cross](https://pressroom.toyota.com/vehicle/2024-toyota-corolla-cross/) | Press gallery | **P0** | Download 3/4 exterior; crop to compare thumbnail |
| Official manufacturer source | [Toyota USA Newsroom — 2026 Corolla Cross Hybrid album](https://pressroom.toyota.com/album/2026-toyota-corolla-cross-hybrid/) | Hi-res album | P0-fallback | Newer model year if 2024 pack unavailable |
| Official dealership source | — | — | — | Do not use competitor dealer scraped images |
| Official press/media source | [Toyota Canada Image Gallery](https://media.toyota.ca/en/models/corolla-cross.html) | Editorial gallery | P0 | Alternate press portal; confirm editorial-use terms |

**Licensing note:** Toyota press assets require editorial/comparative use compliance. Document approval before kiosk display.

---

## Interior

### `gs4-max-int-dashboard` — Dashboard + central 12.3" display

ADAS / technology hero; Interior hot-spot. Screens: S08 ADAS, S22 Interior hot-spot, S06 tour ADAS step. Also reused for **Safety** and **Technology** P0 proxies.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Interior hero still | P0 | Confirm Bolivia spec (screen size, UI language) |
| Official brochure source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | Dashboard spread | P0 | Feature callout reference for ADAS copy QA |
| Official manufacturer source | [GS4 MAX Wallpaper ZIP](https://www.gac-motor.com/static/en/model/wallpaper/GS4-MAX.zip) | Interior hi-res | **P0** | Primary dashboard shot; screen on, minimal glare |
| Official manufacturer source | [GS4 MAX Performance](https://www.gac-motor.com/en/models/gacmotor/gs4max/performance.html) | Tech feature stills | P0 | ADAS and cockpit detail sections |
| Official dealership source | Viaggio demo unit interior shoot | Staged dashboard photo | P0-fallback | Capture live UI if OEM stills show wrong locale |
| Official press/media source | [GAC Video Center](https://www.gac-motor.com/en/media/video.html) | Interior B-roll frame | P0-fallback | Extract frame if still pack lacks dashboard |

---

### `gs4-max-int-rear-seats` — Second-row seating, legroom visible

Family space demo topic (MVP minimum). Screens: S08 family-space, S06 family tour step.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Interior still | P0-fallback | Check for second-row visibility on page |
| Official brochure source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | Rear seat spread | P0 | Legroom dimension callouts for copy alignment |
| Official manufacturer source | [GS4 MAX Wallpaper ZIP](https://www.gac-motor.com/static/en/model/wallpaper/GS4-MAX.zip) | Rear cabin hi-res | **P0** | Wide second-row shot; emphasize space for Diego narrative |
| Official manufacturer source | [GS4 MAX Performance](https://www.gac-motor.com/en/models/gacmotor/gs4max/performance.html) | Space / comfort still | P0-fallback | Alternate angle |
| Official dealership source | Viaggio GS4 MAX demo unit — Santa Cruz | Local interior shoot | **P0** | Shoot with door open, legroom visible; preferred if OEM lacks family context |
| Official press/media source | [InfoDiez — GS4 MAX launch](https://www.infodiez.com/viaggio-presento-la-nueva-gs4-max-la-evolucion-del-diseno-y-la-tecnologia-de-gac-motor/) | Event interior access | P0-fallback | Request hi-res from Viaggio PR |

---

## Safety

No dedicated P0 safety diagram exists for the 7-day demo. Per the acquisition plan, use **`gs4-max-int-dashboard`** plus official technical documents until `gs4-max-safety-adas-diagram` and related P1 assets are produced.

### P0 proxy bundle — ADAS dashboard + technical PDF

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Safety copy block | P0 | 8 airbags + C-NCAP claims; verify against ficha |
| Official brochure source | [ficha-tecnica-gs4-max](#ficha-tecnica-gs4-max--technical-spec-sheet-pdf) (request via gac.com.bo) | Technical PDF | **P0** | Source of truth for ADAS list, airbag count, safety specs |
| Official manufacturer source | [GS4 MAX Performance — Safety section](https://www.gac-motor.com/en/models/gacmotor/gs4max/performance.html) | ADAS explainer stills | P0 | Temporary feature-grid imagery until diagrams ready |
| Official manufacturer source | [GS4 MAX Specification](https://www.gac-motor.com/en/models/gacmotor/gs4max/specification.html) | Safety spec table | P0 | Cross-check sensor features vs Bolivia trim |
| Official dealership source | Viaggio service manager | Bolivia spec confirmation | **P0** | Validate airbag count and ADAS list for local trim |
| Official press/media source | [GAC Global — Bolivia market news](https://www.gacgroup.com/en/news/article/leading-the-new-energy-transformation-in-the-americas--all-new-s7-lands-in-bolivia--reshaping-high-end-mobility-in-south-america-with-chinese-smart-manufacturing-257) | OEM credibility copy | P0-fallback | Trust narrative support (not diagram source) |

**Recommended MVP approach:** Display `gs4-max-int-dashboard` on S08 ADAS topic and S06 tour step 4; cite ficha técnica for stat callouts.

---

### `video-trust-adas` — ADAS / 360° demo clip (15–30 s)

Feature proof for safety-minded buyers. Screens: S08 ADAS topic, S06 tour step 4.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Feature video embed | P0-fallback | Reference clip subject matter |
| Official brochure source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | ADAS feature pages | P0 | Script es-BO captions from brochure feature names |
| Official manufacturer source | [GAC Video Center](https://www.gac-motor.com/en/media/video.html) | ADAS / 360° demo reel | **P0** | Primary B-roll; overlay Spanish captions in edit |
| Official manufacturer source | [GS4 MAX Performance](https://www.gac-motor.com/en/models/gacmotor/gs4max/performance.html) | Embedded tech clips | P0-fallback | Secondary clip source |
| Official dealership source | Viaggio demo unit screen recording | Staged 360° UI capture | P0-fallback | Record center screen showing camera view if OEM clip unavailable |
| Official press/media source | [GAC News — special topics](https://www.gac-motor.com/en/media/topics.html) | Campaign ADAS features | P0-fallback | Alternate reel segments |

**Static fallback:** Use `gs4-max-int-dashboard` (and `gs4-max-int-360-display` when acquired) if video license is pending.

---

## Technology

Per MVP minimum bundle, **reuse interior assets** — no separate P0 technology pack required for day-one demo.

### P0 reuse — `gs4-max-int-dashboard` (primary)

See [Interior → `gs4-max-int-dashboard`](#gs4-max-int-dashboard--dashboard--central-123-display) for full source table.

**Recommended usage:** S08 infotainment topic, technology theme cover, compare “Pantalla central” row (S12).

---

### P0 reuse — `gs4-max-int-360-display` — Center screen showing 360° camera UI

ADAS feature proof (acquire alongside dashboard if possible). Screens: S08 ADAS feature grid, S06 tour step.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | 360° feature mention | P0-fallback | Confirm feature is standard on Bolivia trim |
| Official brochure source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | 360° camera page | P0 | Feature name and icon reference |
| Official manufacturer source | [GS4 MAX Performance](https://www.gac-motor.com/en/models/gacmotor/gs4max/performance.html) | 360° UI still | **P0** | Screen-on proof image for feature grid |
| Official manufacturer source | [GAC Video Center](https://www.gac-motor.com/en/media/video.html) | 360° demo frame | P0-fallback | Extract UI frame from `video-trust-adas` source reel |
| Official dealership source | Viaggio demo unit | Staged screen photo | **P0** | Photograph live 360° view on showroom vehicle |
| Official press/media source | [InfoDiez — GS4 MAX launch](https://www.infodiez.com/viaggio-presento-la-nueva-gs4-max-la-evolucion-del-diseno-y-la-tecnologia-de-gac-motor/) | Tech demo photos | P0-fallback | Event close-ups of center screen |

---

## Warranty

### `warranty-timeline-5yr-150k` — Horizontal timeline: 5 años / 150.000 km

Primary warranty promise visual. Screens: S06 tour step 6, S25 FAQ.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo](https://www.gac.com.bo) | Warranty promise banner | P0 | Copy source: “5 años ó 150.000 Km de Garantía” |
| Official brochure source | Warranty booklet excerpt (request from GAC Bolivia) | Warranty PDF | **P0** | Designer source of truth for coverage terms |
| Official manufacturer source | [GS4 MAX Specification](https://www.gac-motor.com/en/models/gacmotor/gs4max/specification.html) | Global warranty reference | P0-fallback | Cross-check; Bolivia terms may differ |
| Official manufacturer source | [GAC Global corporate site](https://www.gacgroup.com/en/) | Brand warranty policy | P0-fallback | OEM credibility context only |
| Official dealership source | Viaggio service manager + in-house designer | **Produced infographic** | **P0-produce** | **Create** timeline graphic from official PDF; 1-day designer turnaround |
| Official press/media source | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Public warranty messaging | P0 | Align headline copy with customer-facing site |

**Collection workflow:** (1) Obtain warranty PDF from Viaggio/GAC Bolivia → (2) Legal review exclusions → (3) Designer exports PNG/WebP timeline → (4) Viaggio sign-off.

---

## Logos

### `logo-viaggio-full` — Viaggio Motors Bolivia horizontal logo

Global header, attract co-branding. Screens: S01, S02, GlobalHeader (all vehicle screens).

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [viaggio.com.bo](https://viaggio.com.bo) | Header logo (reference) | P0-fallback | Identify correct mark; do not scrape raster |
| Official brochure source | Viaggio printed collateral / price sheets | Logo on letterhead | P0-fallback | Trace reference for vector accuracy |
| Official manufacturer source | — | — | — | Not applicable |
| Official dealership source | Viaggio marketing brand kit | **SVG / AI vector** | **P0** | Request official horizontal logo package |
| Official press/media source | [Facebook — Viaggio Motors](https://facebook.com/viaggiomotors) | Profile / cover assets | P0-fallback | Request original vector from marketing, not social download |

**Format:** SVG preferred; PNG @2x fallback. Store in `public/assets/brand/`.

---

### `logo-gac-full` — GAC Motor full logo

Co-branding with Viaggio. Screens: S01, S02, GlobalHeader, S24 GAC global section.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo](https://www.gac.com.bo) | Header logo (reference) | P0-fallback | Bolivia-market lockup reference |
| Official brochure source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | Embedded vector/raster logo | P0-fallback | Extract only if vector kit unavailable |
| Official manufacturer source | [GAC Motor Brand hub](https://www.gac-motor.com/en/brand/) | Global brand assets | **P0** | Request official GAC Motor logo vector |
| Official dealership source | Viaggio marketing → GAC Bolivia | Approved Bolivia logo pack | **P0** | Preferred source — includes distributor-approved usage rules |
| Official press/media source | [GAC News](https://www.gac-motor.com/en/media/news.html) | Press release headers | P0-fallback | Logo clarity reference only |

**Format:** SVG preferred; PNG @2x fallback. Store in `public/assets/brand/`.

---

### `persona-carlos-avatar` — Carlos digital guide portrait

Persona strip, tour narration. Screens: S02, S06, S08, S25, global PersonaStrip.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | — | — | — | Not applicable — commissioned asset |
| Official brochure source | — | — | — | Not applicable |
| Official manufacturer source | — | — | — | Not applicable |
| Official dealership source | Viaggio marketing + approved character designer | **Commissioned illustration** | **P0-produce** | Trust persona; professional, approachable, es-BO market |
| Official press/media source | — | — | — | Not applicable |

**Brief inputs:** [carlos-narration.md](../content/carlos-narration.md) · persona schema in `docs/schemas/persona.schema.json`

---

### `persona-sofia-avatar` — Sofía digital guide portrait

Persona strip, compare callouts. Screens: S02, S12 Sofía rows, global PersonaStrip.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | — | — | — | Not applicable — commissioned asset |
| Official brochure source | — | — | — | Not applicable |
| Official manufacturer source | — | — | — | Not applicable |
| Official dealership source | Viaggio marketing + approved character designer | **Commissioned illustration** | **P0-produce** | Desire persona; style must match Carlos/Diego set |
| Official press/media source | — | — | — | Not applicable |

**Brief inputs:** [sofia-narration.md](../content/sofia-narration.md)

---

### `persona-diego-avatar` — Diego digital guide portrait

Persona strip, family content. Screens: S02, S08 family, global PersonaStrip.

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | — | — | — | Not applicable — commissioned asset |
| Official brochure source | — | — | — | Not applicable |
| Official manufacturer source | — | — | — | Not applicable |
| Official dealership source | Viaggio marketing + approved character designer | **Commissioned illustration** | **P0-produce** | Family persona; warm, relatable, Santa Cruz context |
| Official press/media source | — | — | — | Not applicable |

**Brief inputs:** [diego-narration.md](../content/diego-narration.md)

---

## Brochures

### `ficha-tecnica-gs4-max` — Technical spec sheet PDF

Source of truth for specs, features, copy QA. Screens: content QA for S08, S12, S04 stat strip; S10 Specs (Phase 2).

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) — “Ficha técnica” CTA | Bolivia ficha PDF | **P0** | Primary download; verify trim names and ADAS list |
| Official brochure source | [gac.com.bo](https://www.gac.com.bo) — per-model ficha links | Technical PDF | **P0** | Backup path if GS4 MAX page link changes |
| Official manufacturer source | [GS4 MAX Specification](https://www.gac-motor.com/en/models/gacmotor/gs4max/specification.html) | Global spec table | P0 | Cross-check dimensions, power, consumption (WLTC) |
| Official manufacturer source | [Spanish GS4 MAX datasheets index](https://en.gac.autoclub.eu/manuals.php?ddlb_category=12) | Regional PDF (`GAC-GS4-Max-2025-MX`) | P0-fallback | Latin America reference; confirm Bolivia deltas with Viaggio |
| Official dealership source | Viaggio sales / after-sales | Bolivia ficha (email) | **P0** | Request latest revision if web link is stale |
| Official press/media source | [GS4 MAX Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf) | Global catalogue | P0-fallback | Feature imagery + global specs; not a substitute for Bolivia ficha |

---

### `price-list-orientativo` — Viaggio orientative price list (internal)

Powers `priceFrom`, trim labels, S26 cuota bands. **Not for public download.**

| Source type | URL | Asset type | Priority | Recommended usage |
|-------------|-----|------------|----------|-------------------|
| Official source website | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Public list prices | P0 | Reference: GS4 MAX Full Equipo $us 42.900 · AWD $us 48.900 (confirm current) |
| Official brochure source | — | — | — | Not applicable — internal document |
| Official manufacturer source | — | — | — | Not applicable — Viaggio commercial data |
| Official dealership source | Viaggio Santa Cruz sales manager | **Internal price sheet** | **P0-produce** | Orientative pricing, trim labels, financing cuota bands for S26/S13 |
| Official press/media source | [InfoDiez — launch pricing](https://www.infodiez.com/viaggio-presento-la-nueva-gs4-max-la-evolucion-del-diseno-y-la-tecnologia-de-gac-motor/) | Launch price reference | P0-fallback | Historical launch price ($us 34.900); do not use without sales confirmation |

**Security note:** Store internally only. Never commit to `public/` or expose in kiosk download UI.

---

## Recommended Collection Sequence

Aligned with [asset-acquisition-plan.md § Recommended Acquisition Sequence](./asset-acquisition-plan.md#recommended-acquisition-sequence):

| Day | Action | Assets unlocked |
|-----|--------|-----------------|
| **0–1** | Email GAC Bolivia (via Viaggio) for press kit ZIP, ficha técnica, warranty PDF, kiosk display license | Hero, exterior, interior, brochures, video source reels |
| **0–1** | Collect Viaggio + GAC logo vectors from marketing | `logo-viaggio-full`, `logo-gac-full` |
| **1–2** | Sales approves orientative pricing sheet | `price-list-orientativo` |
| **2–3** | Designer produces warranty timeline from official PDF | `warranty-timeline-5yr-150k` |
| **2–4** | Commission persona avatars (3) | `persona-*-avatar` |
| **2–4** | Editor loops attract reel + ADAS clip from GAC Video Center | `video-attract-loop`, `video-trust-adas` |
| **3–5** | Request Toyota press album download; local Viaggio unit shoot if OEM color mismatch | `compare-corolla-cross`, `gs4-max-ext-silver` |
| **5–7** | WebP optimization, es-BO alt text, manifest registration | All P0 assets → `media-manifest.json` |

---

## Licensing Checklist (Before Download)

| Source | Requirement |
|--------|-------------|
| GAC official assets | Written approval from GAC Motor Bolivia for digital showroom + kiosk display |
| Viaggio photography / produced graphics | Viaggio Motors marketing sign-off |
| Toyota / competitor press imagery | Press kit terms + comparative use documented |
| Commissioned personas | Viaggio brand approval on final portraits |
| Internal pricing sheet | Sales manager approval; no public distribution |

---

## Related Documents

- [Asset Acquisition Plan](./asset-acquisition-plan.md) — full P0/P1/P2 inventory
- [GS4 MAX Master Content](../content/gs4-max-master-content.md) — copy and spec references
- [Folder Structure](../folder-structure.md) — `public/assets/` layout
- [Pre-Phase 2 Readiness §10](../pre-phase2-readiness.md) — demo path asset checklist

---

*Last updated: June 2025 — MVP P0 source catalog for Viaggio Digital Showroom, GAC GS4 MAX.*
