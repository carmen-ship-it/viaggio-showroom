# Product Truth Matrix — GAC GS4 MAX

**Purpose:** Single source of truth before showroom implementation.  
**Market:** Bolivia · **Distributor:** Viaggio Motor S.A. (Grupo Roda)  
**Vehicle:** `gs4-max` · **Review date:** June 2026  

**Review lenses:** Product Manager · Compliance Reviewer · Automotive Product Specialist  

**Rule:** No claim renders as a **stat callout**, **compare row**, or **FAQ answer** until it has an **Approved value** and **Confidence ≠ Low** (or an explicit approved disclaimer).

**Authority hierarchy (after verification):**
1. GAC Motor Bolivia official documents (warranty PDF, ficha técnica Bolivia, gac.com.bo)
2. Floor unit inspection at Viaggio (showroom stock)
3. `docs/content/gs4-max-master-content.md`
4. Structured JSON in `content/vehicles/gs4-max/` — only after alignment with 1–3

---

## Executive status

| Layer | Files | Trust level for implementation |
|-------|-------|--------------------------------|
| Master content | `gs4-max-master-content.md` | **High** — strategic baseline; pending floor-unit sign-off |
| Production JSON | `content/vehicles/gs4-max/**` | **Low** — conflicts, stubs, partial hydration |
| Persona narration | `carlos-narration.md`, `sofia-narration.md`, `diego-narration.md` | **Medium** — voice OK; some claims unverified |
| Compare template | `docs/content/templates/compare.gs4-max.corolla-cross.json` | **Do not ship** — airbags wrong |
| Dealership ops | `content/shared/dealership.json` | **Do not ship** — placeholders |

**Implementation gate:** **9 P0 data conflicts** block a credible demo. Engineering may scaffold UI; **claims must not go live** until P0 rows below are closed.

---

## Legend

| Column | Meaning |
|--------|---------|
| **Current value** | What the repo says today (may be multiple) |
| **Source** | File(s) where the value appears |
| **Conflicting values** | Active disagreements across sources |
| **Approved value** | Value to implement after verification — `PENDING` until Viaggio/GAC sign-off |
| **Confidence** | **High** aligned · **Medium** partial · **Low** conflict or unverified |
| **Screens affected** | MVP routes that would render this claim |

**Priority:** **P0** demo blocker · **P1** production scale · **P2** polish

---

## 1. Product claims matrix

### Screen size (central display)

| | |
|--|--|
| **Current value** | **10,1"** (master, `experience/sofia.json`) · **12,3"** (`vehicle.json` key stat, `tech-overview.json`, `sofia-narration.md`, compare template, `source-catalog.md` asset note) |
| **Source** | `gs4-max-master-content.md` § tecnología · `vehicle.json` · `topics/tech-overview.json` · `experience/sofia.json` · `compare.gs4-max.corolla-cross.json` · `docs/assets/source-catalog.md` |
| **Conflicting values** | **10,1" vs 12,3"** across JSON and narration |
| **Approved value** | **PENDING** — measure physical unit at Viaggio showroom |
| **Confidence** | **Low** |
| **Screens affected** | S03, S22 (key stat), S08 `tech-overview`, S12 compare (Tecnología row), S06 tour step 4 (if interior media) |
| **Priority** | **P0** |

**Compliance note:** Misstated screen size is a high-visibility failure — customer will compare to the vehicle on the floor.

---

### Airbags

| | |
|--|--|
| **Current value** | **8 de serie** (master, `faq.json`, `trust-story.json` stats) · **"múltiples"** (`structure.json`) · **6** (compare template anchor) · **7** (compare template Corolla Cross target) · not counted in `adas.json` |
| **Source** | Master § seguridad · `faq.json` · `trust-story.json` · `topics/structure.json` · `topics/adas.json` · compare template |
| **Conflicting values** | **8 vs 6** in compare; structure topic vague |
| **Approved value** | **PENDING** — confirm count and positions on Bolivia unit; until then use **8** only if ficha Bolivia confirms |
| **Confidence** | **Low** (compare); **Medium** (master + FAQ aligned) |
| **Screens affected** | S03, S22 stat strip, S08 `structure`, S08 `adas`, S25 FAQ #1, S24 trust-story stats, S12 compare (Seguridad), S06 steps 4–5 |
| **Priority** | **P0** |

---

### ADAS features

| | |
|--|--|
| **Current value** | **De serie:** AEB, ACC, lane-change alert, 360° camera (`adas.json`, master). **Stat:** "6+" systems (`adas.json`). **Possible but unlisted:** BSD, TJA, HMA (gap analysis). **Diego:** ACC "en versiones equipadas" vs master "full equipo de serie" |
| **Source** | `topics/adas.json` · master § seguridad activa · `diego-narration.md` · `carlos-narration.md` §4 |
| **Conflicting values** | ACC scope: full equipo vs "versiones equipadas"; closed ADAS list incomplete |
| **Approved value** | **PENDING** — official equipamiento list for both trims (Full Equipo 4x2 + AWD) |
| **Confidence** | **Medium** (named four systems); **Low** (full list + ACC scope) |
| **Screens affected** | S08 `adas`, S22 hot-spot Seguridad, S06 tour step 4, S12 compare, S25 FAQ #1 |
| **Priority** | **P0** (ACC scope) · **P1** (full ADAS list) |

**Required disclaimer (all screens):** *Las asistencias no reemplazan la atención del conductor.*

---

### Transmission

| | |
|--|--|
| **Current value** | Master: **7 velocidades automática (7WDCT)** only · `vehicle.json` metadata: **6AT / 7DCT** · Carlos: **6AT or 7DCT by version** · `experience/sofia.json` stat: **7DCT** |
| **Source** | Master hero + § tecnología + § mantenimiento · `vehicle.json` · `carlos-narration.md` §3 · `experience/sofia.json` |
| **Conflicting values** | **6AT offered in metadata/Carlos vs master 7WDCT-only for Bolivia** |
| **Approved value** | **PENDING** — confirm transmission per trim in Viaggio stock; remove non-sold option from all copy |
| **Confidence** | **Low** |
| **Screens affected** | S03 metadata, S08 `engine`, S06 tour step 1, S12 compare (if added), Carlos narration blocks |
| **Priority** | **P0** |

---

### Engine

| | |
|--|--|
| **Current value** | **1.5L Turbo / 1.5 TGDI** (Julang Power 3rd gen in master) · **177 HP / 270 Nm** (4x2) · **248 HP / 400 Nm** (AWD) · `vehicle.json`: "1.5L Turbo" only · `engine.json`: generic stub, no HP/torque · Carlos: cadena de distribución, oil every **10.000 km** |
| **Source** | Master § panorama, versiones, mantenimiento · `vehicle.json` · `topics/engine.json` · `carlos-narration.md` |
| **Conflicting values** | HP/torque absent in JSON; TGDI/Julang not in JSON; cadena/10k km only in Carlos docs |
| **Approved value** | **PENDING** — align to gac.com.bo Bolivia ficha + floor unit VIN spec |
| **Confidence** | **Medium** (displacement + turbo); **Low** (HP in customer-facing JSON) |
| **Screens affected** | S03, S22, S06 step 1, S08 `engine`, S12 compare, S28 TCO (fuel calc) |
| **Priority** | **P0** (publish HP/torque per trim) · **P1** (TGDI/Julang detail) |

---

### Warranty

| | |
|--|--|
| **Current value** | **5 años o 150.000 km** (master, `vehicle.json`, `warranty-terms.json`, `faq.json`, Carlos) · Master: **garantía general del vehículo** · Carlos / `warranty-terms.json` features: **motor y transmisión** emphasis · Exclusions: deferred to legal PDF |
| **Source** | Master § garantía · `vehicle.json` · `topics/warranty-terms.json` · `faq.json` #warranty · `carlos-narration.md` §5 |
| **Conflicting values** | **General vehicle warranty vs powertrain-only framing** in Carlos and warranty topic |
| **Approved value** | **PENDING** — legal table from GAC Bolivia PDF: component groups, durations, exclusions |
| **Confidence** | **Low** (scope wording) · **Medium** (duration numbers aligned) |
| **Screens affected** | S03, S22, S06 step 5–6, S08 `warranty-terms`, S25 FAQ #4, S24 chapter B, S29 (post-MVP), S12 compare (Garantía) |
| **Priority** | **P0** |

**Compliance note:** Do not imply full-vehicle coverage equal to powertrain unless PDF confirms.

---

### Maintenance (including sin costo)

| | |
|--|--|
| **Current value** | **Mantenimiento sin costo: 3 años o 100.000 km** (master, `faq.json`) · **NOT in** `maintenance.json`, `warranty-terms.json` · Oil interval **10.000 km** (Carlos only) · Post–year-3 costs: not documented |
| **Source** | Master § garantía + § mantenimiento · `faq.json` · `topics/maintenance.json` · `topics/warranty-terms.json` · `carlos-narration.md` |
| **Conflicting values** | Promised program in master/FAQ **absent from warranty and maintenance topics**; included items (oil, filters, labor) **not itemized** |
| **Approved value** | **PENDING** — Viaggio postventa itemized list of covered services + exclusions |
| **Confidence** | **Low** |
| **Screens affected** | S06 steps 6–7, S08 `maintenance`, S25 FAQ #4, S28 TCO, S12 compare (mantenimiento sin costo row) |
| **Priority** | **P0** |

---

### Fuel economy

| | |
|--|--|
| **Current value** | **6,8 L/100 km WLTC** combined (master ficha global) · **~9–10 km/l ciudad** (`vehicle.json` key stat) · Real-world disclaimers in master FAQ |
| **Source** | Master § ficha global · `vehicle.json` · Diego narration (city driving) |
| **Conflicting values** | **Different units and conditions** (lab WLTC vs real km/l) — not contradictory if labeled; **risk if shown without context** |
| **Approved value** | **PENDING** — publish both with labels: `WLTC 6,8 L/100 km (ficha global)` + `~9–10 km/l ciudad orientativo (tráfico Santa Cruz)` |
| **Confidence** | **Medium** (if labeled) · **Low** (if merged in one stat) |
| **Screens affected** | S03, S22, S12 compare (Consumo row), S28 TCO, S25 FAQ (altitude/consumo) |
| **Priority** | **P0** (labeling) · **P1** (La Paz/El Alto behavior) |

---

### Cargo capacity

| | |
|--|--|
| **Current value** | **638 L** standard · **1.586 L** seats folded (master ficha global) · `family-comfort.json`: qualitative only |
| **Source** | Master § ficha global, confort, FAQ · `topics/family-comfort.json` |
| **Conflicting values** | None numeric; **cifras absent in JSON topics** |
| **Approved value** | **PENDING** — confirm measurement standard (VDA) on Bolivia ficha |
| **Confidence** | **Medium** |
| **Screens affected** | S22 hot-spot Maletero → S08 `family-comfort`, S12 compare (Espacio), Diego tour |
| **Priority** | **P1** |

---

### Dimensions

| | |
|--|--|
| **Current value** | **4.685 × 1.901 × 1.690 mm** · wheelbase **2.750 mm** · **5** passengers · 0–100 **8,8 s** · vmax **190 km/h** (master ficha global only) |
| **Source** | Master § ficha global · no `specs.json` |
| **Conflicting values** | None — **data not deployed to JSON** |
| **Approved value** | **PENDING** — confirm Bolivia import spec unchanged |
| **Confidence** | **Medium** |
| **Screens affected** | S12 compare (Espacio), future `specs.json`, S08 topics |
| **Priority** | **P1** |

---

### Financing references

| | |
|--|--|
| **Current value** | List prices **$us 42.900** (4x2) · **$us 48.900** (AWD) (master) · **`priceFrom: 0`** (`vehicle.json`) · Historical launch **$us 34.900** (Dec 2024, master appendix) · Financing: "contact advisor" — **no `financing.json`**, no banks, no cuota bands |
| **Source** | Master § versiones, FAQ · `vehicle.json` · `content/shared/dealership.json` (placeholder) |
| **Conflicting values** | **Prices in master vs zero in JSON**; no BOB conversion |
| **Approved value** | **PENDING** — Viaggio finance desk: USD list + BOB orientativo + 24/36/48 cuota bands + partner banks + disclaimer |
| **Confidence** | **Low** |
| **Screens affected** | S03, S22, S26, S13, S14, S15, S12 compare (Precio) |
| **Priority** | **P0** |

**Compliance note:** All financing copy must include: *Cuota referencial. Tu consultor Viaggio confirma tasa exacta.*

---

### Viaggio service claims

| | |
|--|--|
| **Current value** | Exclusive distributor · **100% boliviana** Grupo Roda · Taller + repuestos originales · Técnicos certificados GAC · **4 cities** (master addresses) · `viaggio-service.json`: **Santa Cruz only** in emphasis · `dealership.json`: **placeholder** address/WhatsApp `+59100000000` |
| **Source** | Master § mantenimiento showrooms · `topics/viaggio-service.json` · `trust-story.json` · `faq.json` · `content/shared/dealership.json` |
| **Conflicting values** | National network in master/FAQ vs SCZ-only tone in service topic; **dealership JSON not real** |
| **Approved value** | **PENDING** — verified addresses, hours, WhatsApp, service bay proof (photo/video) |
| **Confidence** | **Low** (ops data) · **Medium** (city list in FAQ/trust-story) |
| **Screens affected** | S24, S06 step 8, S08 `viaggio-service`, S25 FAQ #2/#5, S13–S15 conversion, footer global |
| **Priority** | **P0** |

---

### National support claims

| | |
|--|--|
| **Current value** | Showrooms/service: **Santa Cruz (4 points), La Paz, El Alto, Cochabamba** (master, `faq.json`, `trust-story.json`) · **No coverage** claimed for Trinidad, Tarija, Sucre, Beni · Altitude: generic FAQ (test drive in your city) |
| **Source** | Master § mantenimiento · `faq.json` · `trust-story.json` · `carlos-objection-analysis.md` |
| **Conflicting values** | National cities listed in FAQ but **not in `viaggio-service.json` or `dealership.json`** |
| **Approved value** | **PENDING** — official GAC Motor Bolivia network map + honest "no workshop in city X" guidance |
| **Confidence** | **Medium** (four cities) · **Low** (province/out-of-network) |
| **Screens affected** | S25 FAQ #2/#8, S24 chapter B, S08 `viaggio-service`, S29, map CTAs |
| **Priority** | **P0** (four cities + contacts) · **P1** (altitude topic) |

---

## 2. Secondary claims (compliance-sensitive)

| Claim | Current value | Source | Conflict | Approved value | Confidence | Screens | Priority |
|-------|---------------|--------|----------|----------------|------------|---------|----------|
| C-NCAP rating | 5 estrellas | Master, FAQ, trust-story | No test date/version/link; absent in `structure`/`adas` | **PENDING** — certificate metadata | Medium | S22, S25, S24, S12 | **P0** |
| Trims Bolivia | Full Equipo 4x2 + AWD only | Master | Diego "GT" / ventilated seats; electric tailgate "versión que lo trae" | **PENDING** — equipamiento checklist | Low | All persona content | **P0** |
| Android Auto | Sofía: wireless AA | Master: CarPlay only | **AA claimed vs not in master** | **PENDING** — unit test | Low | Sofía topics, S08 tech | **P0** |
| Apple CarPlay | De serie | Master, sofia experience | Wired vs wireless unspecified | **PENDING** | Medium | S08, experience/sofia | P1 |
| Resale / depreciation | Honest — no % promised | `faq.json`, objection analysis | No dedicated topic | Qualitative only until market data | Medium | S25 #3, S12 | P1 |
| Repuestos lead time | Not documented | Objection analysis P0 gap | — | **PENDING** — Viaggio postventa SLA | Low | S25 #2 | **P0** |
| Seguro vehicular | Not documented | Gap analysis | — | **PENDING** — orientativo or broker referral | Low | S28, S25 | P1 |
| Bancos / financieras | Not named | Master FAQ generic | — | **PENDING** — partner list | Low | S26 | **P0** |
| WhatsApp / phone | `+59100000000` placeholder | `dealership.json` | — | **PENDING** — real Viaggio number | Low | S15, S13, S14 | **P0** |
| Tagline | "Maneja el Cambio" vs familia SCZ | Master vs `vehicle.json` | Two taglines | **PENDING** — marketing lock | Medium | S01, S03, S22 | P1 |

---

## 3. Missing content inventory

### Missing content topics

| Topic ID | Purpose | Source material exists? | Screens | Priority |
|----------|---------|-------------------------|---------|----------|
| `resale-value` | Honest reventa / TCO framing | Master objeción + `carlos-objection-analysis.md` | S25, S12, S28 | **P0** |
| `transmission` | 7WDCT / DCT heat / traffic | `carlos-narration.md` §3 | S06, S08 reliability | **P0** |
| `altitude-la-paz` | La Paz / El Alto turbo behavior | Master FAQ + objection analysis | S25, S08 | **P0** |
| `family-safety` | ISOFIX + airbags for families | Diego + master; referenced in `adas.json` relatedTopicIds | S08, family tour | **P0** |
| `specs` | Full dimension/weight/clearance sheet | Master ficha global | S08, S12 | **P1** |
| `value` theme + topics | Equipamiento-serie, costo-propiedad | Master compare + Sofía | S04, S12 | **P1** |
| `driving` theme + topics | 4 modos conducción | Master § tecnología | S08, desire tour | **P1** |
| `cargo-space` | 638 L / 1.586 L proof | Master | S22 maletero, S08 | **P1** |
| `design-exterior` | Desire tour semantic fix | Sofía narration | S06 desire (currently misuses `tech-overview`) | **P1** |
| `parts-availability` | Stock / lead times | Objection analysis | S25, `viaggio-service` | **P0** |
| `financing` content file | Cuota bands | — | S26 | **P0** |
| `testimonials` | Owner social proof | — | S23 | **P0** |

### Missing objection topics (S25 / FAQ)

Present in master, **partially** in `faq.json` (5/8+):

| Objection | In `faq.json`? | Gap | Priority |
|-----------|----------------|-----|----------|
| Es marca china | ✅ #1 | Needs C-NCAP proof asset | P0 |
| Repuestos Santa Cruz | ✅ #2 | Missing lead-time detail | P0 |
| Reventa | ✅ #3 | No `resale-value` topic | P0 |
| Garantía letra chica | ✅ #4 | No exclusion summary / PDF link | P0 |
| Viaggio post-venta | ✅ #5 | No taller video proof | P0 |
| Prefiero Toyota/Hyundai | ❌ | Compare only partial | P1 |
| Muy caro marca desconocida | ❌ | Needs Sofía + TCO | P1 |
| Turbo complica mantenimiento | ❌ | Carlos maintenance link weak | P1 |
| ¿Por qué subió el precio? | ❌ | $34.900 → $42.900 narrative | P1 |
| ¿Qué banco financia? | ❌ | S26 empty | **P0** |
| ¿Aguanta altura? | ❌ | FAQ generic in master only | **P0** |
| ¿Cuánto demora un repuesto? | ❌ | Objection analysis P0 | **P0** |
| ¿Cuánto cuesta el seguro? | ❌ | — | P1 |

### Missing compare data

| Compare target | File status | Data gaps | Priority |
|--------------|-------------|-----------|----------|
| Toyota Corolla Cross | Template only — **not in `content/`** | **Airbags 6→must be 8**; missing Espacio, Precio, Consumo, **Reventa** rows; screen size conflict | **P0** |
| Chery Tiggo 7 / Haval H6 | Not created | Strategy requires honest Chinese-SUV row | P1 |
| Hyundai Tucson | Not created | Aspirational benchmark | P1 |
| WLTC vs real consumo | Not in compare | Needs disclaimer row | P0 |
| Reventa row (*Ellos ganan*) | Not in template | Required for trust per implementation-map | **P0** |

### Missing trust proof (assets + content)

| Proof type | Status | Source plan | Screens | Priority |
|------------|--------|-------------|---------|----------|
| C-NCAP badge + metadata | Text only | `gs4-max-safety-latin-ncap` / GAC cert | S25, S24, S08 | **P0** |
| 8-airbag diagram | Not acquired | GAC brochure / manual | S08 `structure` | **P0** |
| Viaggio showroom photo (real) | Not in `public/` | Local shoot — `source-catalog.md` | S24 | **P0** |
| Taller / service bay video | Not acquired | `video-viaggio-taller` P0-produce | S24, S06 step 8 | **P0** |
| Warranty timeline graphic | P0-produce | `warranty-timeline-5yr-150k` | S06, S29 | **P0** |
| Warranty PDF link | Not linked | `warranty-booklet-excerpt` | S29, S25 | P1 |
| Owner testimonial (≥1) | Absent | Viaggio client video/quote | S23 | **P0** |
| `persona-carlos-avatar` | P0-produce | Design commission | S25, S06, S08 | **P0** |
| `ficha-tecnica-gs4-max` | Not in repo | gac.com.bo PDF | QA / compliance | **P0** |
| `price-list-orientativo` | Internal only | Viaggio finance | S26 — never public raw | **P0** |
| Bank partner logos | Absent | Viaggio finance | S26 | P1 |
| Floor unit inspection checklist | Not archived | Ops — sign-off document | Gates all P0 claims | **P0** |

---

## 4. Screen exposure map (claims at risk)

| Screen | Route | Claims rendered today | Highest-risk conflicts |
|--------|-------|----------------------|------------------------|
| S03 | `/vehicles` | HP, airbags, price, garantía stat | Price 0; screen 12.3"; no AWD price |
| S22 | `/vehicles/gs4-max/hero` | Garantía, precio, airbags, C-NCAP, consumo | Screen, price, airbags unverified |
| S25 | `/vehicles/gs4-max/trust/faq` | 8 airbags, C-NCAP, 4 cities, warranty, maintenance | Warranty scope; no proof assets |
| S24 | `/vehicles/gs4-max/trust/story` | GAC global, 4 cities, 5★/8 airbags | Showroom/taller media missing |
| S06 | `/tour/trust` | Motor, ADAS, warranty via topics | Thin topic stubs; transmission conflict |
| S08 | `/themes/.../topics` | ADAS list, screen 12.3", structure vague | Screen, airbags, ACC scope |
| S11–S12 | `/compare` | Airbags, screen, garantía | **6 airbags — do not deploy** |
| S26 | `/economics/financing` | Price, cuota | No data file |
| S13–S15 | convert / WhatsApp | Dealership contact | Placeholder phone |

---

## 5. Approved values workspace (fill after verification)

*Compliance reviewer completes this section; implementation uses **only** these cells.*

| Claim | Approved value | Verified by | Date | Evidence |
|-------|----------------|-------------|------|----------|
| Pantalla central | | | | |
| Airbags (count) | | | | |
| Transmission (Bolivia) | | | | |
| HP / torque 4x2 | | | | |
| HP / torque AWD | | | | |
| Warranty scope (plain language) | | | | |
| Maintenance sin costo (items) | | | | |
| Consumo WLTC | | | | |
| Consumo ciudad orientativo | | | | |
| Maletero L | | | | |
| Precio USD 4x2 / AWD | | | | |
| Precio BOB orientativo | | | | |
| Android Auto (Y/N) | | | | |
| C-NCAP (date / link) | | | | |
| WhatsApp Viaggio | | | | |

---

## 6. Priority action list

### P0 — Must fix before demo

| ID | Action | Owner | Blocks |
|----|--------|-------|--------|
| P0-01 | Floor unit inspection — screen, airbags, transmission, ADAS, CarPlay/AA | Viaggio producto + taller | S22, S08, S12, compare |
| P0-02 | Resolve **8 vs 6 airbags**; block compare deploy until fixed | QA + GAC Bolivia | S11, S12 |
| P0-03 | Resolve **10,1" vs 12,3"**; single value all JSON + narration | QA content | S03, S08, S12, Sofía |
| P0-04 | Unify **transmission** — remove 6AT if not sold | Viaggio inventario | vehicle.json, Carlos |
| P0-05 | Legal **warranty PDF** + plain-language scope table | Legal Viaggio | S25, S08 warranty |
| P0-06 | **Maintenance sin costo** itemized list in warranty + maintenance topics | Postventa | S06, S08, S25 |
| P0-07 | **Prices** USD + BOB in `vehicle.json`; create `financing.json` | Finance | S03, S26 |
| P0-08 | **dealership.json** real WhatsApp, address Banzer, hours | Ops | S13–S15 |
| P0-09 | **HP/torque** per trim in `engine.json` + S03 card | GAC Bolivia | S03, S22 |
| P0-10 | Confirm **GT / ventilated seats / power tailgate** — remove or approve | Producto | Diego, Sofía |
| P0-11 | **Android Auto** — confirm or strip from Sofía | Unidad piso | tech topics |
| P0-12 | **C-NCAP** certificate metadata before badge | GAC marketing | S25, S24 |
| P0-13 | Deploy **faq.json** to S25 with proof suggestions; add missing P0 objections | Content | S25 |
| P0-14 | **Compare Corolla Cross** — fix + add reventa row; copy to `content/` | Ventas + QA | S11, S12 |
| P0-15 | Acquire **P0 media**: hero, dashboard, taller photo/video, Carlos avatar | Creative | S01, S22, S24 |
| P0-16 | Create topics: **`resale-value`**, **`altitude-la-paz`**, **`parts-availability`** | Content + Carlos | S25, S08 |
| P0-17 | Label **WLTC vs km/l** separately in all fuel claims | QA | S22, S12, S28 |
| P0-18 | **Repuestos lead time** FAQ answer | Postventa | S25 |
| P0-19 | **structure.json** — publish 8 airbags + C-NCAP or hide topic | Content | S06 step 5 |
| P0-20 | Gate rule: **no stat callout** with Confidence Low | Engineering + PM | All screens |

### P1 — Fix before production scale

| ID | Action |
|----|--------|
| P1-01 | `specs.json` — dimensions, maletero, clearance |
| P1-02 | Full ADAS list + 4 driving modes |
| P1-03 | Compare Tiggo 7/Haval + Tucson |
| P1-04 | Themes `value` + `driving` + topics |
| P1-05 | Tours family/desire expand to 7 steps |
| P1-06 | `family-safety`, `transmission`, `cargo-space` topics |
| P1-07 | Remaining FAQ objections (Toyota, turbo, precio subió, seguro) |
| P1-08 | 4-city addresses in `viaggio-service.json` |
| P1-09 | Warranty PDF link; post–year-3 service cost table BOB |
| P1-10 | Tagline unify "Maneja el Cambio" |
| P1-11 | ISOFIX confirmation + Diego family topics |
| P1-12 | Testimonials ×3 with metadata |

### P2 — Future

| ID | Action |
|----|--------|
| P2-01 | Color palette / configurador lite |
| P2-02 | Recall history transparency FAQ |
| P2-03 | Gasolina 87 vs 92 provincia |
| P2-04 | YPF/Petrobras fuel price defaults in TCO |
| P2-05 | Tour complete 16 steps |
| P2-06 | Latin NCAP if applicable |
| P2-07 | Units sold Bolivia social proof metric |
| P2-08 | Digital service history / app |

---

## 7. Implementation gate checklist

Demo may expose UI shells, but **claims go live** only when:

- [ ] All P0 rows in §1 have **Approved value** filled in §5
- [ ] Compare airbags + screen match approved values
- [ ] `vehicle.json` `priceFrom` ≠ 0; financing disclaimer on S26
- [ ] `dealership.json` WhatsApp is real and tested (`wa.me`)
- [ ] No Confidence **Low** on stats shown in S03, S22, S12, S25
- [ ] C-NCAP and warranty claims link to verifiable evidence or use qualified copy
- [ ] Diego ownership / GT claims removed or testimonial-backed
- [ ] `carlos-objection-analysis.md` P0 objections have FAQ or topic coverage
- [ ] `source-catalog.md` P0 assets acquired or approved fallback documented
- [ ] Signed archive: `product-truth-matrix.approved.md` (post Viaggio/GAC review)

---

## 8. Source documents reviewed

| Document | Role |
|----------|------|
| `docs/content/gs4-max-master-content.md` | Primary strategic claims |
| `docs/content/carlos-objection-analysis.md` | Objection gaps + trust signals |
| `docs/content/gs4-max-content-gap-analysis.md` | Inventory + conflict registry |
| `docs/implementation-map.md` | Screen-to-claim binding (MVP 17 screens) |
| `docs/assets/source-catalog.md` | Trust proof acquisition |
| `content/vehicles/gs4-max/vehicle.json` | Hub stats + metadata |
| `content/vehicles/gs4-max/faq.json` | S25 objection copy |
| `content/vehicles/gs4-max/trust-story.json` | S24 chapters |
| `content/vehicles/gs4-max/topics/*.json` (11) | Topic-level claims |
| `content/vehicles/gs4-max/tours/*.json` (3) | Journey structure |
| `content/vehicles/gs4-max/themes/*.json` (5) | Theme scope |
| `content/vehicles/gs4-max/experience/sofia.json` | Sofía experience — **10,1" conflict** |
| `content/shared/dealership.json` | Ops contact — placeholder |
| `docs/content/templates/compare.gs4-max.corolla-cross.json` | Compare — **blocked** |

**Related (superseded for implementation gate):** `docs/content/gs4-max-truth-matrix.md` — detailed attribute tables; this document is the **single entry point** for engineering and compliance.

---

*Internal use only. Not a commercial offer. Approved values require Viaggio Motors + GAC Motor Bolivia written confirmation.*
