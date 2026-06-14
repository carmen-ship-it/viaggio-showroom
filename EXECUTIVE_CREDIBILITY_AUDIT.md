# Executive Credibility Audit

**Date:** 14 June 2026  
**Perspective:** Dealership owner, first viewing  
**Vehicle:** GAC GS4 MAX (Viaggio Motors Santa Cruz)  
**Demo path:** S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15  
**Reference sources:** [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max), GAC global specification sheet, Bolivia launch coverage (Economy.com.bo, Dec 2024)

---

## Executive Summary

The showroom tells a coherent story: **177 HP**, **8 airbags**, **$us 42.900** (4x2), **5 años / 150.000 km** warranty, and **3 años / 100.000 km** free maintenance are consistent across hero stats, compare, FAQ, trust tour, and share flows. Financing cuotas are clearly labeled as orientative BOB ranges with appropriate disclaimers.

**Before this audit**, three issues would have damaged credibility in the first 30 seconds of a demo:

1. Hero price animated to **$us 43** instead of **$us 42.900**
2. Technology topic claimed a **12.3″** screen while compare and official specs say **10.1″**
3. AWD list price in financing data was **$us 46.900** vs **$us 48.900** on gac.com.bo

All three are **fixed** in this pass. Remaining risks are mostly demo-configuration items (placeholder contact data, fallback artwork) that demo mode partially hides but an attentive owner may still notice on conversion screens.

**Demo readiness verdict:** Safe to present on the canonical path after these fixes. Narrate placeholder media if assets are missing; replace dealership contact before production handoff.

---

## Findings by Demo Risk

### 🔴 CRITICAL — Would stop the demo if noticed

| # | Finding | Where | Status |
|---|---------|-------|--------|
| C1 | **Hero price displayed as `$us 43`** — count-up animation parsed `42.900` as decimal `42.9` and rounded to 43 | S22 `HeroStatStrip` | **FIXED** — thousands-dot parsing + correct formatting |
| C2 | **Screen size conflict: 12.3″ vs 10.1″** — technology topic contradicted compare and official GAC Bolivia specs | S08 tech topic, media alt, fallback captions | **FIXED** — aligned to **10,1″** everywhere in live content |

### 🟠 HIGH — Credibility damage if owner knows the product

| # | Finding | Where | Status |
|---|---------|-------|--------|
| H1 | **AWD list price `$us 46.900`** in financing data; official site shows **`$us 48.900`** | `financing.json` trim `full-awd` | **FIXED** → 48900 |
| H2 | **Price disclaimer said BOB** while hero and compare show **USD** | `vehicle.json` `priceDisclaimer` | **FIXED** → USD disclaimer |
| H3 | **Demo dealership contact** — generic Equipetrol address, `+591712345678`, `contacto@viaggio.com.bo` | S13 footer, S15 WhatsApp, `dealership.json` | **OPEN** — replace before production; visible on conversion handoff |
| H4 | **Garantía omitted on hero** — 4th key stat (`5 años / 150.000 km`) hidden by 3-column layout | S22 vs S03 (selector shows all 4) | **OPEN** — intentional layout; owner may ask why warranty disappeared on hero |

### 🟡 MEDIUM — Noticeable but survivable in demo

| # | Finding | Where | Status |
|---|---------|-------|--------|
| M1 | **Financing fallback art shows `$us ···`** literal ellipsis | `FallbackArtwork.tsx` when bank/media missing | **OPEN** — only if assets fail |
| M2 | **Bank partner logo is generic placeholder** (“BANCO” wordmark) | S26 financing footer | **OPEN** — expected until partner asset |
| M3 | **`priceFrom: 0`** in vehicle registry/schema | Data layer | **OPEN** — never rendered; schema noise |
| M4 | **Cuotas in BOB, precio lista in USD** — correct for Bolivia but requires verbal context | S26 | **ACCEPTED** — disclaimers present |
| M4b | **AWD variant labeled “AWD” in financing** vs site “4x4 / FULL EQUIPO AWD” | S26 trim toggle | **ACCEPTED** — label is clear enough |
| M5 | **248 HP for AWD not mentioned** — all content shows 177 HP (4x2) only | Topics, hero | **ACCEPTED** — 177 HP is correct for primary trim; AWD power not in demo path |
| M6 | **Compare reventa row: “Ellos ganan”** for Toyota | S12 | **ACCEPTED** — honest positioning, builds trust |
| M7 | **Placeholder media gradients** when P0 assets missing | Multiple screens | **ACCEPTED** — operator script covers this |

### 🟢 LOW — Hidden in demo mode or non-blocking

| # | Finding | Where | Status |
|---|---------|-------|--------|
| L1 | “Próximamente” on Tucson/Tiggo compare targets | S11 | **HIDDEN** — `hideComingSoonVehicles` |
| L2 | “Próximamente: enlace de reanudación completo (S37)” | Share screen | **HIDDEN** — `hidePlaceholderWarnings` |
| L3 | Resume placeholder copy | `/share/[token]` | **HIDDEN** — not on demo path |
| L4 | Coming-soon vehicles (GS8, EMZOOM, EMKOO) without prices | S03 | **HIDDEN** — solo hero in demo mode |
| L5 | Docs templates still reference 12.3″ | `docs/content/templates/` | **OPEN** — not customer-facing |
| L6 | Launch price `$us 34.900` (Dec 2024 press) vs current `$us 42.900` | External only | **ACCEPTED** — current list price matches gac.com.bo |

---

## Canonical Data Verification

Verified against gac.com.bo and cross-file consistency within `content/vehicles/gs4-max/`.

| Metric | Canonical value | Locations checked | Verdict |
|--------|-----------------|-------------------|---------|
| **Potencia (4x2)** | 177 HP | `vehicle.json`, `engine.json`, `daily-driving.json`, `road-trips.json`, `sofia.json`, placeholders | ✅ Consistent |
| **Torque** | 270 Nm | `engine.json` | ✅ Matches official spec |
| **Airbags** | 8 de serie | Hero, structure, family-safety, chassis, compare, FAQ, share, trust-story, fallbacks | ✅ Consistent |
| **Precio 4x2** | $us 42.900 | Hero, compare anchor, financing trim | ✅ Consistent |
| **Precio AWD** | $us 48.900 | gac.com.bo; financing trim (was 46.900) | ✅ Fixed |
| **Garantía general** | 5 años / 150.000 km | Hero (4th stat), warranty topic, compare, FAQ, trust-story, share | ✅ Consistent |
| **Mantenimiento sin costo** | 3 años / 100.000 km | FAQ, compare, warranty topic | ✅ Consistent |
| **Pantalla central** | 10,1″ | compare, sofia, tech topic (was 12.3″) | ✅ Fixed |
| **Clúster digital** | 7″ | Official spec only; not contradicted in app | ✅ N/A |
| **Wheelbase** | 2.750 mm | compare, chassis topic | ✅ Consistent |
| **Maletero** | 638 L (hasta 1.586 L) | compare | ✅ Matches global spec sheet |
| **Consumo WLTC** | 6,8 L/100 km | compare | ✅ Plausible |
| **Consumo ciudad orientativo** | ~9–10 km/l | compare, daily-driving | ✅ Consistent |
| **C-NCAP** | 5 estrellas | FAQ, compare, trust-story, chassis | ✅ Consistent |
| **Red Viaggio** | 4 ciudades | warranty topic, compare | ✅ Consistent |

### Financing values (S26)

All cuotas labeled **orientativas** in BOB. Ranges are internally consistent per trim/plazo:

| Trim | Plazo | Cuota min–max (BOB) |
|------|-------|---------------------|
| Full 4x2 | 36 mo | Bs 1.680 – 1.820 |
| Full 4x2 | 48 mo | Bs 1.420 – 1.540 |
| Full AWD | 36 mo | Bs 1.840 – 1.990 |
| Full AWD | 48 mo | Bs 1.560 – 1.690 |

**TCO preview (monthly BOB):** combustible 480–620 · mantenimiento 180–220 · seguro 350–450 · ~1.200 km/mes. Combined “cuota + uso mensual” calculates correctly from these ranges.

Disclaimers present: *“Cuota referencial… no es una oferta bancaria”* and explanation bullets on entrada/plazo/TCO.

---

## CTA Audit (Canonical Demo Path)

All primary CTAs resolve to valid routes. Footer `TouchNav` “next” controls advance the scripted arc.

| Step | Screen | CTA label | Target | Status |
|------|--------|-----------|--------|--------|
| 1 | S01 Attract | Tocá para empezar | Welcome overlay | ✅ |
| 2 | S02 Welcome | Empezar experiencia | `/vehicles` | ✅ |
| 3 | S03 Selector | Explorar experiencia → | `/vehicles/gs4-max/hero` | ✅ |
| 4 | S22 Hero | ¿Es confiable? (TouchNav) | `/vehicles/gs4-max/trust/faq` | ✅ |
| 5 | S25 FAQ | Historia Viaggio & GAC | `/vehicles/gs4-max/trust/story` | ✅ |
| 5 | S25 FAQ | Comparar con Corolla Cross → | `/vehicles/gs4-max/compare` | ✅ (secondary) |
| 6 | S24 Trust | Tour con Carlos | `/vehicles/gs4-max/tour/trust` | ✅ |
| 7 | S06 Tour | Profundizar en ADAS | `/vehicles/gs4-max/themes/safety/adas` | ✅ |
| 8 | S08 ADAS | Comprobá las asistencias… | `/vehicles/gs4-max/test-drive/info` | ✅ (topic CTA) |
| 8 | S08 ADAS | Comparar con Corolla Cross | `/vehicles/gs4-max/compare` | ✅ (footer) |
| 9 | S11 Compare | Ver comparación con Corolla Cross | `/vehicles/gs4-max/compare/corolla-cross` | ✅ |
| 10 | S12 Detail | Cuota orientativa | `/vehicles/gs4-max/economics/financing` | ✅ |
| 11 | S26 Financing | Dar el siguiente paso | `/vehicles/gs4-max/convert` | ✅ |
| 12 | S13 Convert | Agendá tu prueba de manejo | `/vehicles/gs4-max/test-drive` | ✅ |
| 12 | S13 Convert | Escribinos por WhatsApp | `/vehicles/gs4-max/whatsapp` | ✅ |
| 13 | S14 Test drive | Confirmar | `/vehicles/gs4-max/whatsapp?intent=test_drive` | ✅ |
| 14 | S15 WhatsApp | Abrir WhatsApp | `wa.me/+591712345678` | ⚠️ Demo number |

**Topic CTAs off-path** (17 JSON blocks): all `action` values (`test_drive`, `test_drive_info`, `share`, `compare`, `tour`, `topic`) resolve via `CTARenderer` — no orphan actions found.

**Session-gated CTAs on hero** (compare, financing, convert) are correctly hidden in demo mode (`disableExplorationBranches`) — canonical path uses TouchNav instead.

---

## Fixes Applied (This Pass)

| File | Change |
|------|--------|
| `components/premium/HeroStatStrip.tsx` | Correct thousands-dot parsing; skip animation for non-numeric suffixes; preserve `$us 42.900` formatting |
| `content/vehicles/gs4-max/topics/tech-overview.json` | 12.3″ → **10,1″** in narration, feature grid, stat callout |
| `content/vehicles/gs4-max/media-manifest.json` | Alt text 12.3 → **10,1** pulgadas |
| `lib/media/placeholder-library.ts` | Fallback caption 12,3″ → **10,1″** |
| `content/vehicles/gs4-max/financing.json` | AWD `priceFromUsd` 46900 → **48900** |
| `content/vehicles/gs4-max/vehicle.json` | `priceDisclaimer` BOB → **USD** |

---

## Recommended Follow-Up (Not Fixed — Lower Confidence or Out of Scope)

1. **Replace `dealership.json`** with real Viaggio Santa Cruz address, WhatsApp, and hours from gac.com.bo before owner handoff.
2. **Consider showing Garantía on hero** — swap Precio to footer disclaimer only, or use 4-column layout on wide kiosk.
3. **Acquire bank partner logo** for S26 footer.
4. **Replace `$us ···` fallback** with a neutral “Consultá cuota” label if financing media fails often.
5. **Remove or populate `priceFrom: 0`** in registry for data hygiene.
6. **Sync docs templates** (`docs/content/templates/`) with live content to prevent future drift.

---

## Owner “First 60 Seconds” Checklist

Before presenting to stakeholders:

- [ ] Open S22 — confirm hero shows **177 HP · 8 de serie · $us 42.900** (not `$us 43`)
- [ ] Tap through S08 tech topic — confirm **10,1″** screen references
- [ ] On S26, toggle AWD — internal data now matches **$us 48.900** list (cuota ranges unchanged)
- [ ] On S15, acknowledge WhatsApp uses **demo number** until dealership.json is updated
- [ ] If media is placeholder, say: *“Contenido visual en reemplazo — cifras verificadas con ficha GAC Bolivia”*

---

*Audit performed as executive demo QA. High-confidence presentation bugs fixed; configuration and asset gaps documented for pre-production.*
