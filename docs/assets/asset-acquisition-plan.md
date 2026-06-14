# Asset Acquisition Plan — MVP Demo

Inventory of media assets required to deliver the **7-day kiosk MVP demo** at Viaggio Motors Santa Cruz. Scope aligns with the 16-surface demo path documented in [pre-phase2-readiness.md](../pre-phase2-readiness.md): S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15 (+ S19, S20 overlays).

**Primary vehicle:** GAC GS4 MAX (`gs4-max`)  
**Target delivery format:** WebP images (1920px+ long edge), MP4 video (H.264, 1080p), SVG/PNG logos, PDF brochures  
**Planned storage:** `public/assets/` per [folder-structure.md](../folder-structure.md)

> **Note:** This document identifies and sources assets only. Do not download or commit media until licensing, brand approval, and Viaggio sign-off are complete.

---

## Priority Legend

| Priority | Meaning |
|----------|---------|
| **P0** | Demo blocker — kiosk walkthrough fails without it |
| **P1** | Demo polish or required for a specific demo screen in the scripted path |
| **P2** | Post-MVP / Phase 2 production; acceptable to defer for 7-day demo |

---

## Hero Images

Full-bleed, cinematic stills used as primary visual anchors — not detail crops.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `gs4-max-hero-01` | GS4 MAX exterior 3/4 front (plateado or hero color) | Primary vehicle identity; product theater backdrop | GAC Motor global press kit / GAC Bolivia distributor assets | **P0** | S01 (fallback if video fails), S03 vehicle card, S22 immersive hero, S13 recap header |
| `gs4-max-hero-ambient` | GS4 MAX wide cinematic still (minimal UI overlay safe zone) | Secondary hero layer for parallax or reduced-motion fallback | GAC official marketing stills; re-crop from launch campaign | **P0** | S22, S01 attract fallback |
| `gs4-max-hero-night` | GS4 MAX exterior at dusk/night (optional variant) | Visual variety on repeat kiosk sessions | GAC press kit or local Viaggio photo shoot | **P2** | S22 (rotation), S04 hero strip (Phase 2) |
| `gs4-max-family-cover` | Family + vehicle lifestyle wide shot | Theme cover and emotional entry to family content | Local Santa Cruz photographer + Viaggio GS4 MAX unit | **P1** | S08 family-space topic hero, S06 tour step (family), S07 theme cover (Phase 2) |
| `gs4-max-compare-anchor` | GS4 MAX clean 3/4 front on neutral background | Compare hub anchor column | GAC press kit (isolated background) | **P1** | S11 Compare Hub, S12 Compare Detail (left column) |
| `gs4-max-share-hero` | GS4 MAX + 3 key stats safe crop | Shareable session summary header | Crop from `gs4-max-hero-01` or dedicated composite | **P2** | S33 Family Share Summary |

---

## Exterior Photos

Vehicle exterior angles, colors, and detail shots for exploration, configurator, and hot-spots.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `gs4-max-ext-front-34` | Front 3/4 — default hero color | Hot-spot “Motor”, gallery exterior tab | GAC press kit | **P0** | S22 hot-spot Motor, S09 Exterior (Phase 2) |
| `gs4-max-ext-rear-34` | Rear 3/4 | Maletero hot-spot, cargo topic cross-link | GAC press kit | **P1** | S22 hot-spot Maletero, S08 cargo topic (Phase 2) |
| `gs4-max-ext-side` | Full side profile | Compare visual parity, gallery | GAC press kit | **P1** | S09, S30 color render reference |
| `gs4-max-ext-rear` | Straight rear | Tailgate / license-plate area detail | GAC press kit | **P2** | S09 Detalles |
| `gs4-max-ext-headlights` | Headlight / DRL close-up | Design & exterior theme | GAC detail pack or local macro shoot | **P2** | S08 design topic, S09 Detalles |
| `gs4-max-ext-wheels` | Wheel / alloy close-up | Trim differentiation (base vs GT) | GAC press kit | **P2** | S08 trim-levels, S30 Configurator Lite |
| `gs4-max-ext-white` | Blanco exterior 3/4 | Color swatch render | GAC color pack or Viaggio inventory photo | **P1** | S30, S09 (optional wow demo) |
| `gs4-max-ext-black` | Negro exterior 3/4 | Color swatch render | GAC color pack or Viaggio inventory photo | **P1** | S30, S09 |
| `gs4-max-ext-silver` | Plata exterior 3/4 | Color swatch render (matches manifest default) | GAC color pack | **P0** | S30, S03 card, S22 |
| `gs4-max-ext-red` | Rojo exterior 3/4 | Color swatch render | GAC color pack or Viaggio inventory photo | **P1** | S30, S09 |
| `compare-corolla-cross` | Toyota Corolla Cross thumbnail | Compare target picker visual | Toyota press / stock with license clearance | **P1** | S11, S12 (Corolla Cross path — demo default) |
| `compare-tiggo-7` | Chery Tiggo 7 Pro thumbnail | Secondary compare target | Chery press / stock with license clearance | **P2** | S11, S12 |
| `compare-tucson` | Hyundai Tucson thumbnail | Aspirational compare target | Hyundai press / stock with license clearance | **P2** | S11, S12 |
| `vehicle-teaser-gs8` | GAC GS8 teaser still | Coming-soon card on selector | GAC press kit | **P2** | S03 coming-soon modal |
| `vehicle-teaser-emzoom` | GAC EMZOOM teaser still | Coming-soon card | GAC / Aion press kit | **P2** | S03 |
| `vehicle-teaser-emkoo` | GAC EMKOO teaser still | Coming-soon card | GAC press kit | **P2** | S03 |

---

## Interior Photos

Cabin, dashboard, seats, and cargo — supports trust tour, ADAS topic, and family space demo topic.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `gs4-max-int-dashboard` | Dashboard + central 12.3" display | ADAS / technology hero; S22 Interior hot-spot | GAC interior press pack | **P0** | S08 ADAS topic (`gs4-max-adas-hero`), S22 hot-spot Interior, S06 tour ADAS step |
| `gs4-max-int-rear-seats` | Second-row seating, legroom visible | Family space demo topic (MVP minimum) | GAC interior pack or Viaggio unit shoot | **P0** | S08 family-space topic, S06 family tour step |
| `gs4-max-int-front-seats` | Driver + passenger seats, materials | Comfort / value topics | GAC interior pack | **P1** | S08 climate, S08 standard-features |
| `gs4-max-int-cargo` | Open trunk / cargo floor | Cargo & versatility topic | GAC press kit | **P1** | S08 cargo, S22 Maletero hot-spot |
| `gs4-max-int-steering` | Steering wheel + instrument cluster | Driving experience topic | GAC interior pack | **P2** | S08 handling, S09 Interior |
| `gs4-max-int-panoroof` | Panoramic roof interior view | Value / equipment differentiation | GAC press kit | **P1** | S08 standard-features, S12 compare row (techo panorámico) |
| `gs4-max-int-360-display` | Center screen showing 360° camera view | ADAS feature proof | GAC tech demo stills or staged Viaggio photo | **P1** | S08 ADAS feature grid, S06 tour step |
| `gs4-max-int-rear-ac` | Rear vents / climate controls | Santa Cruz heat narrative (Diego) | Local shoot with family context | **P2** | S08 climate, S34 A/C demo note (Phase 2) |

---

## Safety Images

Visual proof for seguridad themes, Carlos trust narrative, and objection handling.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `gs4-max-safety-adas-diagram` | ADAS sensor zones overlay (radar, camera) | Explain driver-assist systems without jargon | GAC technical marketing / adapt official diagram | **P1** | S08 ADAS, S06 trust tour step 4 |
| `gs4-max-safety-airbags` | Airbag location schematic (6 airbags) | Structure & airbags topic; honest compare context | GAC technical sheet; verify count matches Bolivia spec | **P1** | S08 structure, S12 compare row (airbags) |
| `gs4-max-safety-structure` | Body structure / high-strength steel graphic | Chassis durability tour step | GAC engineering assets | **P1** | S06 tour step 2 (chassis), S08 structure |
| `gs4-max-safety-latin-ncap` | Latin NCAP rating badge (if applicable) | Third-party trust signal for Chinese-brand objection | Latin NCAP with written permission | **P1** | S24 trust story, S25 FAQ (*¿por qué confiar?*) |
| `gs4-max-safety-family` | Child seat / family in cabin context | Family safety emotional proof | Local lifestyle shoot (Diego persona) | **P2** | S08 family-safety, S06 family tour |
| `gs4-max-safety-aeb` | Forward collision / AEB illustration | Feature grid icon companion image | GAC ADAS explainer assets | **P2** | S08 ADAS feature grid |
| `gs4-max-safety-lane` | Lane departure warning illustration | Feature grid companion | GAC ADAS explainer assets | **P2** | S08 ADAS feature grid |

---

## Technology Images

Infotainment, connectivity, and onboard tech — Sofía-led desire content and compare rows.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `gs4-max-tech-center-screen` | 12.3" infotainment UI hero | Technology theme cover; compare “Pantalla central” row | GAC UI marketing stills (screen on, no glare) | **P1** | S08 infotainment, S12 compare, S07 technology theme (Phase 2) |
| `gs4-max-tech-carplay` | Apple CarPlay / phone integration | Connectivity topic | GAC connectivity pack; Apple MFi guidelines for CarPlay badge | **P2** | S08 connectivity |
| `gs4-max-tech-android-auto` | Android Auto on screen | Connectivity topic | GAC pack; Google brand guidelines | **P2** | S08 connectivity |
| `gs4-max-tech-360-ui` | Panoramic camera UI on display | Technology + safety crossover | GAC tech demo stills | **P1** | S08 ADAS, S08 driver-tech |
| `gs4-max-tech-cluster` | Digital instrument cluster | Driver-tech topic | GAC interior detail pack | **P2** | S08 driver-tech, S09 Detalles |
| `gs4-max-tech-wireless-charge` | Wireless charging pad (if equipped) | Standard-features / value | GAC detail pack or Viaggio unit photo | **P2** | S08 standard-features, S12 compare |

---

## Family Lifestyle Images

Diego-led ownership imagination — Santa Cruz–recognizable contexts.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `gs4-max-life-family-road-trip` | Bolivian family beside GS4 MAX on route | Emotional anchor for family theme | **Local photographer** — Warnes, Doble Vía, or Urubó | **P1** | S08 family-space, S06 family tour, theme cover (`gs4-max-family-cover`) |
| `gs4-max-life-daily-dropoff` | School / daily errand scenario | “Un día con el GS4 MAX” topic | Local lifestyle shoot | **P2** | S08 daily-life |
| `gs4-max-life-cargo-load` | Family loading luggage / stroller | Cargo practicality proof | Local shoot at Viaggio or customer home | **P2** | S08 cargo, S08 daily-life |
| `gs4-max-life-doble-via` | GS4 MAX on Doble Vía al Norte (recognizable) | Santa Cruz driving topic | Local shoot or licensed stock with SC landmarks | **P2** | S08 santa-cruz, S06 Diego tour |
| `gs4-max-life-showroom-family` | Family welcomed in Viaggio showroom | Local trust + family crossover | Viaggio marketing team | **P1** | S24 trust story, S34 family welcome (Phase 2) |
| `gs4-max-life-heat-comfort` | Family in cooled cabin (hot day narrative) | Santa Cruz climate objection | Local shoot; authentic not staged excess | **P2** | S08 climate, S25 FAQ |

---

## Warranty Graphics

Designed infographics — not raw photography — for warranty/service storytelling.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `warranty-timeline-5yr-150k` | Horizontal timeline: 5 años / 150.000 km | Primary warranty promise visual | **Design in-house** from GAC Bolivia warranty terms PDF | **P1** | S06 tour step 6 (warranty-terms), S29 Warranty Deep-Dive (Phase 2), S25 FAQ |
| `warranty-coverage-matrix` | Covered vs not covered grid (honest exclusions) | Trust through transparency | Viaggio service manager + designer; legal review | **P1** | S29, S25 (*¿qué pasa si necesito garantía?*), S06 tour |
| `warranty-service-intervals` | Maintenance schedule visual (km / months) | Maintenance topic; TCO crossover | GAC maintenance schedule + Viaggio taller pricing | **P1** | S08 maintenance, S06 tour step 7, S28 TCO (Phase 2) |
| `warranty-claims-flow` | 3–5 step claims process diagram | Reduce fear of post-sale support | Viaggio service manager input | **P2** | S29, S24 |
| `warranty-badge-seal` | “Garantía GAC 5/150” seal graphic | Stat strip, share summary, hub cards | Designer; align with GAC brand guidelines | **P1** | S04 stat strip (Phase 2), S13 recap, S33 share |
| `viaggio-service-map-pin` | Showroom + taller location graphic | Local service credibility | Designer + real Viaggio coordinates | **P1** | S24 trust story, S13 footer map |

---

## Logos

Brand marks, co-brand lockups, and partner logos — SVG preferred for UI; PNG @2x fallback.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `logo-viaggio-full` | Viaggio Motors Bolivia horizontal logo | Global header, attract co-branding | Viaggio brand kit (official vector) | **P0** | S01, S02, all vehicle screens (GlobalHeader) |
| `logo-viaggio-mark` | Viaggio icon / monogram | Compact header, favicon source | Viaggio brand kit | **P1** | S19, mobile S21 (Phase 2) |
| `logo-gac-full` | GAC Motor full logo | Co-branding with Viaggio | GAC Bolivia / GAC global brand portal | **P0** | S01, S02, GlobalHeader, S24 GAC global section |
| `logo-gac-mark` | GAC icon | Compact placements | GAC brand portal | **P1** | Footer, loading states |
| `logo-cobrand-lockup` | Viaggio + GAC approved lockup | Attract loop, welcome, print QR collateral | Joint approval Viaggio + GAC Bolivia marketing | **P1** | S01, S02, windshield QR print |
| `logo-latin-ncap` | Latin NCAP logo (if rating used) | Third-party credibility | Latin NCAP media kit + permission | **P2** | S24, S25 |
| `logo-bank-partner-1` | Primary financing partner logo | Financing preview trust | Viaggio finance desk — authorized partner assets | **P1** | S26 Financing Preview |
| `logo-bank-partner-2` | Secondary financing partner logo | Financing preview | Viaggio finance desk | **P2** | S26 |
| `logo-bank-partner-3` | Tertiary partner (if applicable) | Financing preview | Viaggio finance desk | **P2** | S26 |
| `persona-carlos-avatar` | Carlos digital guide portrait | Persona strip, tour narration | **Commission** — Viaggio-approved character design | **P0** | S02, S06, S08, S25, global PersonaStrip |
| `persona-sofia-avatar` | Sofía digital guide portrait | Persona strip, compare callouts | Commission | **P0** | S02, S12 Sofía rows, global PersonaStrip |
| `persona-diego-avatar` | Diego digital guide portrait | Persona strip, family content | Commission | **P0** | S02, S08 family, global PersonaStrip |

---

## Videos

Silent or muted-by-default loops preferred for kiosk; captions optional for testimonials.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `video-attract-loop` | GS4 MAX cinematic attract loop (15–30s, seamless) | Draw floor traffic when kiosk idle | GAC global launch reel (edit loop); license from GAC Bolivia | **P0** | S01 Attract Loop |
| `video-hero-ambient` | Subtle hero ambient loop (10–20s) | S22 motion layer behind hot-spots | GAC marketing B-roll; slow pan exterior/interior | **P1** | S22 Immersive Hero |
| `video-trust-engine` | Engine / performance clip (15–30s) | Carlos trust tour step 1 | GAC technical B-roll | **P1** | S06 tour step 1 (engine) |
| `video-trust-chassis` | Build quality / factory clip (15–30s) | Carlos trust tour step 2 | GAC manufacturing assets | **P1** | S06 tour step 2 |
| `video-trust-heritage` | GAC global brand reel (30s) | OEM credibility in trust story | GAC Bolivia marketing | **P1** | S24 trust story, S06 tour step 3 |
| `video-trust-adas` | ADAS / 360° demo clip (15–30s) | Feature proof for safety-minded buyers | GAC ADAS demo; overlay es-BO captions in edit | **P0** | S08 ADAS topic, S06 tour step 4 |
| `video-trust-structure` | Safety structure / crash test B-roll (15–30s) | Airbags & structure tour step | GAC safety campaign | **P1** | S06 tour step 5 |
| `video-viaggio-taller` | Viaggio service bay process (45–60s) | Local post-sale trust | **Produce** — Viaggio service manager + local videographer | **P1** | S24 trust story, S29 warranty (Phase 2) |
| `video-testimonial-01` | Owner testimonial #1 (30–60s, Santa Cruz) | Social proof — Chinese brand skepticism | **Produce** — Viaggio customer (Equipetrol professional) | **P2** | S23 (optional wow); S21 pre-visit (Phase 2) |
| `video-testimonial-02` | Owner testimonial #2 (family buyer) | Social proof diversity | Produce — Plan 3000 customer | **P2** | S23 |
| `video-testimonial-03` | Owner testimonial #3 (commuter) | Social proof diversity | Produce — Urubó / Doble Vía owner | **P2** | S23 |
| `video-carlos-trust-30s` | Carlos on-camera trust clip (30s) | Pre-visit mobile entry | Edit from tour clips + Viaggio overlay | **P2** | S21 Pre-Visit QR |
| `video-previsit-vertical` | Vertical silent clip (15s) | Social campaign QR landing | Edit from attract + testimonial | **P2** | S21 |

---

## Brochures

PDF documents for download, consultant handoff, and content verification — not primary kiosk UI, but needed for spec accuracy and Phase 2 specs screen.

| Asset ID | Asset | Purpose | Recommended Source | Priority | Screen Usage |
|----------|-------|---------|-------------------|----------|--------------|
| `brochure-gs4-max-es` | GAC GS4 MAX customer brochure (Spanish) | Source of truth for specs, features, copy | GAC Bolivia distributor | **P1** | Content production reference; S10 download link (Phase 2) |
| `ficha-tecnica-gs4-max` | Technical spec sheet PDF | Verify stat callouts (consumo, dimensiones, ADAS list) | GAC Bolivia | **P0** | Content QA for S08, S12, S04 stat strip; S10 Specs (Phase 2) |
| `warranty-booklet-excerpt` | GAC warranty terms excerpt (es) | Accurate coverage / exclusion copy | GAC Bolivia + Viaggio legal | **P1** | S29, S25 FAQ, warranty graphics production |
| `price-list-orientativo` | Viaggio orientative price list (internal) | `priceFrom`, trim labels, S26 cuota bands | Viaggio sales manager — **not for public download** | **P0** | S26 Financing Preview, S13 recap, S30 (Phase 2) |
| `compare-one-pager` | GS4 MAX vs Corolla Cross summary PDF | Consultant leave-behind; family share | **Create** from compare JSON + design | **P2** | S33 Family Share, consultant tablet |
| `maintenance-schedule-pdf` | Official maintenance schedule | Service interval graphic source | GAC after-sales | **P1** | Warranty graphics, S08 maintenance topic |

---

## MVP Demo Minimum Bundle (P0 Checklist)

Assets that must be acquired or approved before the 7-day kiosk demo:

| Category | Minimum assets |
|----------|----------------|
| Hero images | `gs4-max-hero-01`, `gs4-max-hero-ambient` |
| Exterior photos | `gs4-max-ext-front-34`, `gs4-max-ext-silver`, `compare-corolla-cross` |
| Interior photos | `gs4-max-int-dashboard`, `gs4-max-int-rear-seats` |
| Safety images | Use ADAS dashboard + GAC technical PDF until diagrams ready |
| Technology images | Reuse `gs4-max-int-dashboard` and `gs4-max-int-360-display` for demo |
| Family lifestyle | `gs4-max-life-family-road-trip` **or** stock placeholder with Viaggio shoot scheduled |
| Warranty graphics | `warranty-timeline-5yr-150k` (designer — 1 day turnaround) |
| Logos | `logo-viaggio-full`, `logo-gac-full`, three persona avatars |
| Videos | `video-attract-loop`, `video-trust-adas` (+ static fallback for other tour steps) |
| Brochures | `ficha-tecnica-gs4-max`, `price-list-orientativo` (internal) |

---

## Recommended Acquisition Sequence

1. **Day 0–1:** Request GAC Bolivia press kit (hero, exterior, interior, ADAS video, ficha técnica, warranty PDF). Collect Viaggio + GAC logo vectors.
2. **Day 1–2:** Viaggio sales approves orientative pricing and cuota bands. Finance provides bank partner logo permissions.
3. **Day 2–3:** Designer produces warranty timeline + coverage matrix from official PDFs.
4. **Day 2–4:** Commission persona avatars (3). Edit attract loop from GAC reel.
5. **Day 3–5:** Local shoot — showroom exterior, taller B-roll, one family lifestyle set (can defer testimonials to Phase 2).
6. **Day 5–7:** WebP optimization, alt text in Spanish (Bolivia), manifest entries in `media-manifest.json`.

---

## Asset Naming & Manifest

When assets are acquired, register each file in:

- **Path:** `public/assets/vehicles/gs4-max/` (vehicle media), `public/assets/brand/` (logos), `public/assets/personas/` (avatars)
- **Manifest:** `src/content/vehicles/gs4-max/media-manifest.json` (see [media-manifest template](../content/templates/media-manifest.gs4-max.json))
- **Alt text:** Spanish (Bolivia), descriptive, include model name and context for accessibility (S19)

---

## Licensing & Approval

| Source type | Requirement |
|-------------|-------------|
| GAC official assets | Written approval from GAC Motor Bolivia for digital showroom + kiosk display |
| Viaggio photography | Viaggio Motors marketing sign-off |
| Competitor imagery | Press kit or licensed stock only; no scraped web images |
| Bank logos | Partner brand guidelines + authorized use letter |
| Latin NCAP | Permission if badge displayed |
| Customer testimonials | Signed release form (video + photo) |

---

## Related Documents

- [Pre-Phase 2 Readiness — Asset Checklist §10](../pre-phase2-readiness.md)
- [Screen Map](../screen-map.md) — screen IDs (S01–S37)
- [Content Strategy](../content-strategy.md) — format and production notes
- [Folder Structure](../folder-structure.md) — `public/assets/` layout

---

*Last updated: June 2025 — MVP demo scope for Viaggio Digital Showroom, GAC GS4 MAX launch.*
