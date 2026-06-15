# Sprint A Product Specification — Discovery, Routing & Recommendation Engines

**Version:** 1.2  
**Date:** 14 June 2026  
**Audience:** Product, engineering, sales floor, QA  
**Scope:** Behavioral specification only — no code  
**Mission:** Replace the first 5 minutes of an average salesperson at Viaggio Motors Santa Cruz  
**Vehicle:** GAC GS4 MAX (`gs4-max`)  
**Companion docs:** EXECUTIVE_TRANSFORMATION_PLAN.md · PHASE1_IMPLEMENTATION_BACKLOG.md · SPRINT_A_PSYCHOLOGY_REVIEW.md · CEO/KIOSK/MEDIA audits  

---

## Document Purpose

This specification defines four interconnected systems for Sprint A:

1. **Discovery Engine** — qualifies the buyer in ≤45 seconds through conversation, not a survey  
2. **Behavioral Intelligence Layer** — infers confidence, certainty, urgency, and reassurance need from behavior (§9)  
3. **Route Resolver** — selects which screens appear, in what order — adapted by confidence  
4. **Recommendation Engine** — surfaces exactly one primary next action per screen — adapted by salesperson mode  

A developer can implement Sprint A from this document without further business decisions.

---

## System Overview

```
S01 Attract → S02 Welcome → S02b Discovery → S22 Hero → Personalized Path → Convert
                                      │
                                      ▼
                            DiscoveryProfile (session)
                                      │
                         Behavioral signals (continuous)
                                      │
                                      ▼
                    ┌─────────────────────────────────────┐
                    │   BEHAVIORAL INTELLIGENCE LAYER     │
                    │   uncertaintyScore → ConfidenceLevel │
                    │   → SalespersonMode (V/G/R)         │
                    └─────────────────┬───────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          ▼                           ▼                           ▼
    Route Resolver            Recommendation Engine          Progress + Lead Score
    (path ± confidence)       (1 CTA × mode × concern)     Consultant handoff
```

**Invariant:** The customer never sees more than **one** primary recommended action on any screen integrated with the engine (S22, S25, S06, S08, S11, S12, S26, S13).

Secondary actions (back, optional "Profundizar") may exist but must be visually subordinate.

---

# 1. DISCOVERY FLOW (v1.1)

> Rationale: SPRINT_A_PSYCHOLOGY_REVIEW.md — conversation over survey; concerns over priorities; budget at financing only.

## 1.1 Placement in journey

| Step | Screen | Behavior |
|------|--------|----------|
| 1 | S01 Attract | Unchanged — tap to start |
| 2 | S02 Welcome | Short welcome — no path choice cards |
| 3 | **S02b Discovery** | **4-question** conversational flow |
| 4 | Routing | Completion beat → S22 Hero (skip S03 when single SKU) |

**Welcome copy (S02):**

- Headline: *"Conocé el GAC GS4 MAX a tu ritmo"*
- Subline: *"Sin presión. Cuatro preguntas rápidas — y te muestro solo lo que te sirve."*
- Primary: *"Dale, empecemos"* → Question 1

## 1.2 Flow rules

| Rule | Value |
|------|-------|
| Maximum duration | **45 seconds** (target 35 seconds) |
| Maximum taps | **4** (one per question) |
| Scroll | **Not permitted** — one question per full screen |
| Progress indicator | Soft dots or *"Una cosa más…"* — **never** *"Pregunta X de 5"* |
| Micro-acknowledgment | **0.8s** mirror line after each answer before next question |
| Back behavior | Allow back; back from Q1 → S02 |
| Language | Bolivian Spanish (es-BO) |
| Budget | **Not in discovery** — consent gate at S26 (§1.3 note) |

## 1.3 The four questions

### Question 1 — Life moment

**Frame:** *"Contame un poco — ¿qué te trae hoy a ver este SUV?"*

| Answer ID | Label | Internal value | Micro-ack |
|-----------|-------|----------------|-----------|
| `moment_first` | Es mi primera SUV — quiero acertar | `purchase_context: first_suv` | *"Primera SUV — vamos sin apuro y con claridad."* |
| `moment_upgrade` | Quiero algo mejor que lo que manejo hoy | `purchase_context: replacement` | *"Bien — veamos qué ganás con el GS4 MAX."* |
| `moment_compare` | Ya comparé otras opciones | `purchase_context: researched` | *"Perfecto — no te repito lo básico."* |

**Skippable:** No · **Idle default:** `moment_first`

---

### Question 2 — Who uses the vehicle (co-decision)

**Frame:** *"¿Quién va a usar el auto en el día a día?"*

| Answer ID | Label | Internal value | Micro-ack |
|-----------|-------|----------------|-----------|
| `users_family_kids` | Mi familia — con hijos | `family: yes`, `co_decision: family_group` | *"Con chicos — espacio y seguridad primero."* |
| `users_family_future` | Mi familia — pronto llega un bebé | `family: soon`, `co_decision: family_group` | *"Qué bueno planificar con tiempo."* |
| `users_couple` | Mi pareja y yo | `family: no`, `co_decision: partner` | *"Los dos — info clara para decidir juntos."* |
| `users_solo` | Principalmente yo | `family: no`, `co_decision: solo` | *"Entendido — directo a lo que te importa."* |

**Skippable:** No  
**Side effects:** `family: yes/soon` → `testDriveDraft.childrenAttending: true` · `co_decision: partner|family_group` → `spouseInfluence: high`

---

### Question 3 — Daily life (use pattern)

**Frame:** *"¿Cómo sería un día típico con el auto?"*  
**Chip order:** Mixto first (most common)

| Answer ID | Label | Internal value | Micro-ack |
|-----------|-------|----------------|-----------|
| `use_mixed` | Mixto — ciudad y algún viaje | `primary_use: mixed` | *"El día a día real de Santa Cruz."* |
| `use_city` | Casi todo en ciudad | `primary_use: city` | *"Tráfico y calor — lo tenemos en cuenta."* |
| `use_doble_via` | Mucha Doble Vía o carretera | `primary_use: doble_via` | *"Ahí la estabilidad y el control importan."* |

**Trim side effects:** `city`/`mixed` → `full-4x2` · `doble_via` → `full-awd` · pre-fill `routePreference`

---

### Question 4 — Primary concern (replaces priority)

**Frame:** *"¿Qué es lo que más te preocupa al elegir?"*

**Dynamic chips** — rules:

| Condition | Additional / adjusted chips |
|-----------|----------------------------|
| `family: yes/soon` | Seguridad de los chicos · Espacio (maletero, sillas) |
| `co_decision: partner` | Que mi pareja quede tranquilo/a → `concern: joint_confidence` |
| `moment_compare` | Si realmente conviene vs lo que miré → `concern: validation` |

| Answer ID | Label | Internal `concern` |
|-----------|-------|-------------------|
| `concern_trust` | Que sea confiable (marca, repuestos, taller) | `trust` |
| `concern_safety` | Seguridad de los chicos / en la ruta | `safety` |
| `concern_space` | Espacio — maletero, sillas, viajes | `space` |
| `concern_payment` | La cuota mensual y el costo total | `payment` |
| `concern_validation` | Si conviene vs lo que ya comparé | `validation` |
| `concern_joint` | Que mi pareja quede tranquilo/a | `joint_confidence` |
| `concern_equipment` | Que traiga todo de serie, sin extra | `technology` |

**Skippable:** No · **Routing driver:** `concern` (primary), then life context

**Budget (moved to S26):** *"¿Querés ver rangos de cuota orientativos? Sin compromiso."* — Yes expands calculator; No continues to test drive. Auto-expand if `concern: payment`.

---

## 1.4 Discovery completion screen (4 seconds)

**Headline + subline mirror stated concern** — examples:

| `concern` | Headline | Subline |
|-----------|----------|---------|
| `trust` | *"Tu duda de confianza es la más común."* | *"Empezamos por respuestas directas — sin vueltas de vendedor."* |
| `safety` | *"La seguridad de tu familia va primero."* | *"Te muestro cómo protege el GS4 MAX en calle real."* |
| `payment` | *"La cuota tiene que cerrar — lo entendemos."* | *"Compará valor y veamos números orientativos."* |
| `validation` | *"Ya hiciste tarea — respetamos eso."* | *"Comparación honesta, lado a lado."* |
| `joint_confidence` | *"Decidir en pareja es normal."* | *"Info clara para compartir en casa."* |

**Auto-advance:** 4 seconds OR tap *"Ver el GS4 MAX"* → S22 Hero  
**Analytics:** `discovery_completed` with full profile + **initial uncertainty seed** (§9.2)

**Initial uncertainty seed from discovery (behavioral, not displayed):**

| Discovery signal | Seed points added to `uncertaintyScore` |
|------------------|----------------------------------------|
| `moment_first` | +15 |
| `concern: trust` | +20 |
| `concern: joint_confidence` | +10 |
| `moment_compare` | −15 |
| `moment_upgrade` | −10 |
| `users_solo` + `concern: validation` | −20 |
| Discovery completed in **<20s** | −10 |
| Discovery completed in **>60s** | +15 |
| **2+ back** navigations during discovery | +20 |

---

## 1.5 Session state — DiscoveryProfile

| Field | Type | Source |
|-------|------|--------|
| `discoveryCompleted` | boolean | After Q4 |
| `discoveryCompletedAt` | ISO timestamp | Completion |
| `discoveryDurationMs` | number | Q1 start → Q4 submit |
| `discoveryBackCount` | number | Back taps during discovery |
| `purchaseContext` | `first_suv` \| `replacement` \| `researched` | Q1 |
| `family` | `yes` \| `soon` \| `no` | Q2 |
| `coDecision` | `solo` \| `partner` \| `family_group` | Q2 |
| `spouseInfluence` | `low` \| `high` | `partner` or `family_group` → high |
| `primaryUse` | `city` \| `doble_via` \| `mixed` | Q3 |
| `concern` | enum (§1.3 Q4) | Q4 — **primary routing key** |
| `primaryArchetype` | enum (§1.6) | Computed |
| `secondaryArchetype` | enum \| null | Computed |
| `recommendedTrimId` | `full-4x2` \| `full-awd` | From Q3 |
| `recommendedCompetitorId` | `corolla-cross` | Default Sprint A |
| `recommendedPlazo` | `36` \| `48` | From concern + S26 consent |
| `visitorPath` | `first_time` \| `pre_researched` | `researched` → pre_researched |
| `compareUnlockedAtStart` | boolean | `validation` or `researched` |

**Behavioral Intelligence fields (§9):**

| Field | Type | Description |
|-------|------|-------------|
| `uncertaintyScore` | 0–100+ | Running sum of behavioral signals |
| `confidenceLevel` | `HIGH` \| `MEDIUM` \| `LOW` | Derived from uncertaintyScore |
| `salespersonMode` | `VALIDATOR` \| `GUIDE` \| `REASSURER` | Derived from confidenceLevel |
| `urgencyLevel` | `LOW` \| `MEDIUM` \| `HIGH` | Derived from pace signals |
| `needForReassurance` | boolean | `LOW` confidence OR `concern: trust` + score >50 |

## 1.6 Archetype assignment (concern-first)

| Priority | Condition | Primary archetype |
|----------|-----------|-------------------|
| 1 | `concern: validation` OR `moment_compare` | Compare-first researcher |
| 2 | `concern: trust` OR (`moment_first` without validation) | Skeptical Chinese-brand |
| 3 | `concern: joint_confidence` OR (`family: yes/soon` + high spouse influence) | Family-first |
| 4 | `concern: safety` OR `concern: space` with kids | Family-first |
| 5 | `concern: payment` | Budget-first |
| 6 | `concern: technology` | Technology-first |
| 7 | `moment_upgrade` | Upgrade buyer |
| 8 | `concern: safety` without kids | Safety-first |
| Default | — | Skeptical Chinese-brand |

---

# 2. CUSTOMER SEGMENTS

## 2.1 Family-first buyer

| Dimension | Detail |
|-----------|--------|
| **Trigger** | `family: yes/soon` + `priority: safety OR space` |
| **Main fears** | Kids not safe; no room for stroller/seats; spouse will veto |
| **Main motivations** | Protect family; simplify daily logistics (school, súper, trips) |
| **Main objections** | *"¿Entran los chicos cómodos?"* · *"¿Maletero para cochecito?"* · *"¿ISOFIX?"* |
| **Desired outcome** | Spouse agrees; book family test drive with kids welcome |
| **Persona lead** | Diego |
| **Proof screens** | `family-safety` topic → compare (Espacio + Seguridad rows) → financing → test drive |
| **Max screens to test drive** | **7** |

---

## 2.2 Safety-first buyer

| Dimension | Detail |
|-----------|--------|
| **Trigger** | `priority: safety` (and not family-first primary) |
| **Main fears** | Crash risk; ADAS gimmicks; Chinese build quality |
| **Main motivations** | Certified protection; peace of mind on Doble Vía |
| **Main objections** | *"¿Cuántos airbags?"* · *"¿C-NCAP es real?"* · *"¿El ADAS funciona?"* |
| **Desired outcome** | Confidence that safety claims are verified, not marketing |
| **Persona lead** | Carlos |
| **Proof screens** | FAQ (china-brand OR warranty) → ADAS → compare (Seguridad) → financing → test drive |
| **Max screens** | **8** |

---

## 2.3 Budget-first buyer

| Dimension | Detail |
|-----------|--------|
| **Trigger** | `priority: price` |
| **Main fears** | Monthly payment trap; hidden costs; bad resale |
| **Main motivations** | Maximum equipamiento per boliviano; predictable ownership cost |
| **Main objections** | *"¿Cuánto es la cuota real?"* · *"¿Qué incluye la garantía?"* · *"¿Vale vs Toyota usado?"* |
| **Desired outcome** | Know if monthly all-in fits budget before talking to consultant |
| **Persona lead** | Sofía (value) + Carlos (TCO honesty) |
| **Proof screens** | Compare (Precio + Garantía + Consumo) → financing (default plazo) → test drive |
| **Max screens** | **6** |
| **Trust compression** | One FAQ item (resale) optional — skip trust tour |

---

## 2.4 Technology-first buyer

| Dimension | Detail |
|-----------|--------|
| **Trigger** | `priority: technology` |
| **Main fears** | Outdated infotainment; paying extra for features; electronics failures |
| **Main motivations** | Full-equipment from day one; CarPlay; ADAS; 360° camera |
| **Main objections** | *"¿Qué trae de serie vs Corolla?"* · *"¿La pantalla es buena?"* |
| **Desired outcome** | See feature advantage vs competitor versions |
| **Persona lead** | Sofía |
| **Proof screens** | ADAS → compare (Tecnología rows) → financing → test drive |
| **Max screens** | **6** |

---

## 2.5 Compare-first researcher

| Dimension | Detail |
|-----------|--------|
| **Trigger** | `purchaseContext: researched` |
| **Main fears** | Wasting time on basics; biased comparison; salesperson spin |
| **Main motivations** | Validate online research; honest side-by-side; quick cuota check |
| **Main objections** | *"Ya vi specs — ¿qué gana el GS4?"* · *"¿Reventa?"* |
| **Desired outcome** | Confirm GS4 MAX beats cross-shop on value; schedule test drive |
| **Persona lead** | Sofía + Carlos (honest compare) |
| **Proof screens** | Hero (brief) → compare hub → compare detail → financing → test drive |
| **Max screens** | **5** |
| **Special rule** | **Compare unlocked immediately** — bypass trust gate |

---

## 2.6 Upgrade buyer

| Dimension | Detail |
|-----------|--------|
| **Trigger** | `purchaseContext: replacement` |
| **Main fears** | Downgrade from current car; losing reliability; bad trade terms |
| **Main motivations** | More space/tech; better warranty; lower maintenance |
| **Main objections** | *"¿Es mejor que lo que tengo?"* · *"¿Cuánto vale mi usado?"* (defer to consultant) |
| **Desired outcome** | Rational upgrade justification; test drive comparison vs current car |
| **Persona lead** | Carlos |
| **Proof screens** | Hero → compare → financing → test drive (trust on demand via link) |
| **Max screens** | **5** |
| **Special rule** | Compare unlocked after hero view (1 trust signal = hero) |

---

## 2.7 Skeptical Chinese-brand buyer

| Dimension | Detail |
|-----------|--------|
| **Trigger** | `purchaseContext: first_suv` (default) or fallback |
| **Main fears** | Brand won't last; no parts; dealer disappears; resale collapse |
| **Main motivations** | Not making a mistake; family safety without overpaying Toyota |
| **Main objections** | *"Es chino"* · *"¿Hay repuestos en Santa Cruz?"* · *"¿Viaggio responde?"* |
| **Desired outcome** | Trust Viaggio + GAC enough to justify test drive |
| **Persona lead** | Carlos |
| **Proof screens** | FAQ → trust story (compressed) → ADAS → compare → financing → test drive |
| **Max screens** | **9** (compressed vs today's 14) |

---

## 2.4 Segment summary matrix

| Archetype | Persona | Compare unlock | Trust depth | Target min |
|-----------|---------|----------------|-------------|------------|
| Family-first | Diego | After family-safety topic | Low | 7 screens |
| Safety-first | Carlos | After FAQ + ADAS | Medium | 8 screens |
| Budget-first | Sofía/Carlos | After hero | Low | 6 screens |
| Technology-first | Sofía | After ADAS | Low | 6 screens |
| Compare-first | Sofía/Carlos | **Immediate** | Minimal | 5 screens |
| Upgrade | Carlos | After hero | Minimal | 5 screens |
| Skeptical | Carlos | After 2 trust screens | High (compressed) | 9 screens |

---

# 3. ROUTE RESOLVER

## 3.1 Resolver inputs

| Input | Source |
|-------|--------|
| `DiscoveryProfile` | Session — required after S02b |
| `currentScreenId` | Active screen |
| `sessionProgress` | Progress model (§5) |
| `trustSignals` | Existing session counter |
| `topicsVisited` | Existing session list |
| `compareCompleted` | Boolean — compare detail footer seen |
| `financingViewed` | Boolean |
| `testDriveSubmitted` | Boolean |

## 3.2 Screen identifiers (route nodes)

| Node ID | Route path | Description |
|---------|------------|-------------|
| `hero` | `/vehicles/gs4-max/hero` | S22 |
| `faq` | `/vehicles/gs4-max/trust/faq` | S25 |
| `trust_story` | `/vehicles/gs4-max/trust/story` | S24 compressed mode |
| `trust_tour` | `/vehicles/gs4-max/tour/trust` | S06 kiosk-short (3 steps) |
| `adas` | `/vehicles/gs4-max/themes/safety/adas` | S08 |
| `family_safety` | `/vehicles/gs4-max/themes/safety/family-safety` | S08 variant |
| `family_comfort` | `/vehicles/gs4-max/themes/family/family-comfort` | Family space proof |
| `compare_hub` | `/vehicles/gs4-max/compare` | S11 |
| `compare_detail` | `/vehicles/gs4-max/compare/corolla-cross` | S12 |
| `financing` | `/vehicles/gs4-max/economics/financing` | S26 |
| `convert` | `/vehicles/gs4-max/convert` | S13 |
| `test_drive` | `/vehicles/gs4-max/test-drive` | S14 |
| `whatsapp` | `/vehicles/gs4-max/whatsapp` | S15 |

**S03 Vehicle Selector:** Skipped when registry has one available vehicle (GS4 MAX only).

## 3.3 Path templates (ordered node lists)

### PATH_A — Compare-first researcher

```
hero → compare_hub → compare_detail → financing → test_drive
```

Optional branch (secondary CTA only): `faq` if idle >60s on compare  

**Trust gate:** Bypassed (`compareUnlockedAtStart: true`)

---

### PATH_B — Upgrade buyer

```
hero → compare_hub → compare_detail → financing → test_drive
```

Optional: `faq` linked as *"¿Dudas sobre la marca?"* — never in main sequence  

**Trust gate:** Unlocked after `hero` viewed (1 signal)

---

### PATH_C — Budget-first buyer

```
hero → compare_hub → compare_detail → financing → test_drive
```

Optional prepend if `purchaseContext: first_suv`: `faq` (resale item pre-selected) — **only if** user taps "Todavía tengo dudas"  

**Trust gate:** Unlocked after hero  

---

### PATH_D — Technology-first buyer

```
hero → adas → compare_hub → compare_detail → financing → test_drive
```

**Trust gate:** Unlocked after `adas` visited  

---

### PATH_E — Family-first buyer

```
hero → family_safety → compare_hub → compare_detail → financing → test_drive
```

If `priority: space` over `safety`: swap `family_safety` → `family_comfort`  

**Trust gate:** Unlocked after `family_safety` or `family_comfort`  

---

### PATH_F — Safety-first buyer

```
hero → faq → adas → compare_hub → compare_detail → financing → test_drive
```

FAQ pre-opens objection: `china-brand` if `first_suv`; `warranty` if `replacement`  

**Trust gate:** Unlocked after `faq` + `adas` (2 signals)  

---

### PATH_G — Skeptical Chinese-brand buyer

```
hero → faq → trust_story_compressed → adas → compare_hub → compare_detail → financing → test_drive
```

`trust_story_compressed` = single-screen 3-card mode (not scroll chapters)  

**Trust gate:** Unlocked after `faq` + (`trust_story_compressed` OR `adas`)  

**Kiosk alternative (time pressure):** Drop `trust_story_compressed` if `sessionDuration > 4min` before compare — go `faq → adas → compare`  

---

## 3.4 Master routing table — next node by archetype + current screen

**Legend:** → next required node · (opt) optional branch · — not in path

| Current screen | Compare-first | Upgrade | Budget | Technology | Family | Safety | Skeptical |
|----------------|---------------|---------|--------|------------|--------|--------|-----------|
| `discovery_complete` | hero | hero | hero | hero | hero | hero | hero |
| `hero` | compare_hub | compare_hub | compare_hub | adas | family_safety* | faq | faq |
| `faq` | — | (opt) | (opt) | — | — | adas | trust_story_compressed |
| `trust_story_compressed` | — | — | — | — | — | — | adas |
| `family_safety` | — | — | — | — | compare_hub | — | — |
| `family_comfort` | — | — | — | — | compare_hub | — | — |
| `adas` | — | — | — | compare_hub | — | compare_hub | compare_hub |
| `compare_hub` | compare_detail | compare_detail | compare_detail | compare_detail | compare_detail | compare_detail | compare_detail |
| `compare_detail` | financing | financing | financing | financing | financing | financing | financing |
| `financing` | test_drive | test_drive | test_drive | test_drive | test_drive | test_drive | test_drive |
| `test_drive` | whatsapp | whatsapp | whatsapp | whatsapp | whatsapp | whatsapp | whatsapp |

*`family_safety` or `family_comfort` per priority (§3.3 PATH_E)

## 3.5 Compare gate override rules

| Archetype | `canShowCompare` true when |
|-----------|---------------------------|
| Compare-first | Discovery completes |
| Upgrade | `hero` viewed |
| Budget-first | `hero` viewed |
| Technology-first | `adas` topic visited |
| Family-first | `family_safety` OR `family_comfort` visited |
| Safety-first | `faq` visited AND `adas` visited |
| Skeptical | `faq` visited AND (`trust_story_compressed` OR `adas` visited) |

**When gated** (should not occur on-path; recovery only):

Show: *"Te falta {n} paso(s) para comparar"* + tap cards to exact missing node(s) from path template.

## 3.6 FAQ objection pre-selection

| Archetype / condition | Pre-selected FAQ item ID |
|-----------------------|--------------------------|
| Skeptical / first_suv | `china-brand` |
| Safety-first | `china-brand` or `warranty` |
| Budget-first | `resale` |
| Family-first | `warranty` |
| Upgrade | `resale` |
| Compare-first | None — show tile picker |
| Technology-first | None — skip FAQ in main path |

## 3.7 Financing defaults from discovery

| Input | Default trim | Default plazo | Highlight message |
|-------|--------------|---------------|-------------------|
| `primary_use: city` | `full-4x2` | 36 | *"Para ciudad, la 4x2 suele alcanzar"* |
| `primary_use: doble_via` | `full-awd` | 36 | *"Para Doble Vía, muchos eligen AWD"* |
| `primary_use: mixed` | `full-4x2` | 36 | *"4x2 full equipo — equilibrio en Santa Cruz"* |
| `concern: payment` at S26 | per use | **48** | *"Plazo más largo para cuota menor"* |
| S26 budget consent: mid range | per use | **36** | *"36 meses suele ser el equilibrio"* |
| S26 budget consent: declined | per use | **36** | no budget copy |

---

# 4. RECOMMENDATION ENGINE

> **v1.2:** Base recommendations from archetype + `concern` (below). **Final copy** selected by `salespersonMode` per §9.5. Hesitation patterns may override once per §9.6.

## 4.1 Output contract (every integrated screen)

Each recommendation returns:

| Field | Description |
|-------|-------------|
| `primaryLabel` | Button text — max 40 characters |
| `primaryHref` | Next route from resolver |
| `reasonLine` | One sentence — salesperson voice, max 120 characters |
| `personaId` | `carlos` \| `sofia` \| `diego` \| `system` |
| `personaAttribution` | Optional *"Carlos · Mecánico Maestro"* |
| `progressHint` | Optional *"Paso 2 de 5 — Confiaste"* |

**UI rule:** One pulsing primary button. `TouchNav` next duplicates this href. Back remains available. Secondary links ≤2, text-only, below fold.

---

## 4.2 S22 — Hero

### Default recommendations by archetype

| Archetype | primaryLabel | primaryHref | reasonLine (persona) |
|-----------|--------------|-------------|----------------------|
| Compare-first | Compará con honestidad | compare_hub | *"Ya investigaste — veamos cómo se compara con lo que miraste."* (Sofía) |
| Upgrade | Compará con tu referencia | compare_hub | *"Reemplazás tu auto — mirá lado a lado qué ganás en equipamiento."* (Carlos) |
| Budget-first | Ver si el precio cierra | compare_hub | *"Priorizás la cuota — primero veamos precio y garantía vs la competencia."* (Sofía) |
| Technology-first | Ver la tecnología de serie | adas | *"Querés equipamiento — te muestro el ADAS y la pantalla incluidos."* (Sofía) |
| Family-first | Ver seguridad familiar | family_safety* | *"Con hijos en el auto — empecemos por cómo los protege el GS4 MAX."* (Diego) |
| Safety-first | Resolver tu duda principal | faq | *"La seguridad es lo primero — arranquemos con tus preguntas directas."* (Carlos) |
| Skeptical | ¿Es confiable? | faq | *"Muchos llegan con la misma duda de marca — te respondo sin vueltas."* (Carlos) |

*`family_comfort` if `priority: space`

### Alternative triggers (override default)

| Condition | Override primaryLabel | primaryHref | reasonLine |
|-----------|----------------------|-------------|------------|
| `sessionDuration > 180s` on hero without exit | Siguiente paso recomendado | resolver next | *"Llevás un rato mirando — te sugiero el mejor siguiente paso."* |
| `trustSignals >= 4` AND `!compareCompleted` | Compará ahora | compare_hub | *"Ya construiste confianza — es buen momento para comparar."* |
| `compareCompleted` AND `!financingViewed` | Ver cuota orientativa | financing | *"Comparaste — veamos si la cuota calza en tu presupuesto."* |
| `financingViewed` AND `!testDriveSubmitted` | Agendar prueba de manejo | test_drive | *"Ya viste la cuota — lo mejor es manejarlo 20 minutos."* |

---

## 4.3 S25 — FAQ

### Default (first visit)

| Archetype | primaryLabel | primaryHref | reasonLine |
|-----------|--------------|-------------|------------|
| Skeptical | Seguir: respaldo Viaggio | trust_story_compressed | *"Resolviste la duda de marca — ahora el respaldo local de Viaggio."* (Carlos) |
| Safety-first | Ver seguridad ADAS | adas | *"Con la confianza en la marca — mirá las asistencias y airbags."* (Carlos) |
| Budget-first | Comparar precio y valor | compare_hub | *"Entendiste la reventa — comparemos equipamiento y garantía."* (Sofía) |
| Family-first | — | (not in path) | — |
| Others (opt visit) | Comparar ahora | compare_hub | *"Con las dudas claras — comparemos con datos."* (Carlos) |

**FAQ interaction rule:** On first visit, show **objection tiles** (not accordion-first). After one answer viewed → show primary recommendation.

### Alternative triggers

| Condition | Override |
|-----------|----------|
| `topicsVisited` includes `adas` | Comparar con Corolla Cross → compare_hub |
| `compareUnlockedAtStart` | Comparar ahora → compare_hub |
| `objectionViewed: resale` AND archetype budget | Ver cuota orientativa → financing (skip compare if `compareCompleted`) |
| Idle >90s | Agendar prueba → test_drive (if `trustSignals >= 2`) |

---

## 4.4 S06 — Trust Tour (skeptical path only, compressed)

**Availability:** Only on PATH_G. Kiosk-short = 3 steps: motor → ADAS proof → mantenimiento.

| Step | primaryLabel | primaryHref | reasonLine |
|------|--------------|-------------|------------|
| 1–2 | Siguiente | next tour step | *"Paso {n} de 3 — sin apuro."* (Carlos) |
| 3 (final) | Ver asistencias ADAS | adas | *"Viste motor y mantenimiento — cerramos con seguridad activa."* (Carlos) |

### Alternative

| Condition | Override |
|-----------|----------|
| User taps Skip (always visible) | Saltar al comparador → compare_hub if gate met; else → adas |
| `sessionDuration > 240s` | Saltar tour → adas |

---

## 4.5 S08 — ADAS (and family-safety topic)

### S08 ADAS

| Archetype | primaryLabel | primaryHref | reasonLine |
|-----------|--------------|-------------|------------|
| Technology-first | Comparar tecnología | compare_hub | *"Viste el ADAS de serie — comparemos con lo que trae el Corolla Cross."* (Sofía) |
| Safety-first | Comparar seguridad | compare_hub | *"8 airbags y ADAS certificado — veamos cómo queda vs la competencia."* (Carlos) |
| Skeptical | Comparar con honestidad | compare_hub | *"La seguridad está certificada — ahora la comparación honesta."* (Carlos) |
| Family-first | — | (uses family_safety screen) | — |

### S08 Family-safety (family path)

| Archetype | primaryLabel | primaryHref | reasonLine |
|-----------|--------------|-------------|------------|
| Family-first | Comparar espacio y valor | compare_hub | *"Viste cómo protege a tu familia — comparemos espacio y equipamiento."* (Diego) |

### Alternative triggers (both)

| Condition | Override |
|-----------|----------|
| `compareCompleted` | Ver cuota → financing |
| `!canShowCompare` (recovery) | Resolver duda de marca → faq |

---

## 4.6 S11 — Compare Hub

### Default (compare unlocked)

| Archetype | primaryLabel | primaryHref | reasonLine |
|-----------|--------------|-------------|------------|
| All | Ver comparación con Corolla Cross | compare_detail | *"Toyota es la referencia en Santa Cruz — mirá dónde gana cada uno."* (Carlos) |

Pre-selected competitor: `corolla-cross` (only live target Sprint A).

### Gated state (recovery — not on-path)

| Condition | primaryLabel | primaryHref | reasonLine |
|-----------|----------|-------------|------------|
| Missing `faq` | Ir a preguntas frecuentes | faq | *"Un paso rápido de confianza — después comparás con datos."* |
| Missing `adas` | Ver seguridad ADAS | adas | *"Mirá las asistencias de serie — y después la comparación."* |
| Missing both | Primero: tu mayor duda | faq | *"Te faltan 2 temas — empezá por la duda que más te pesa."* |

### Alternative

| Condition | Override |
|-----------|----------|
| `compareCompleted` | Ver cuota orientativa → financing |
| `budget_range: under_1500` | Ver comparación (highlight Precio) → compare_detail with scroll hint to Precio category |

---

## 4.7 S12 — Compare Detail

### Default (first visit)

| Archetype | primaryLabel | primaryHref | reasonLine |
|-----------|--------------|-------------|------------|
| All | Ver si la cuota te alcanza | financing | *"9 ventajas claras — veamos si el pago mensual calza en tu caso."* (Sofía) |

**Above-fold companion copy (not a second CTA):**  
*"Toyota gana en reventa hoy. Ganás en equipamiento, garantía y cuota — veamos los números."*

### Alternative triggers

| Condition | Override primaryLabel | primaryHref | reasonLine |
|-----------|----------------------|-------------|------------|
| `priority: price` OR `budget_range` set | Calcular tu cuota | financing | *"El precio te preocupa — revisemos rangos orientativos sin compromiso."* |
| `family: yes/soon` | Ver cuota familiar | financing | *"El espacio cierra — veamos el costo mensual para tu familia."* |
| `targetWins >= 2` viewed (resale fear) | Ver costo total de propiedad | financing | *"La reventa preocupa — la garantía y el mantenimiento sin costo ayudan al balance."* (Carlos) |
| `financingViewed` | Agendar prueba de manejo | test_drive | *"Los números cierran — lo mejor es manejarlo en Santa Cruz."* |
| `sessionDuration > 300s` on S12 | Agendar prueba | test_drive | Hesitation breaker |

---

## 4.8 S26 — Financing

### Default (first visit)

| Archetype | primaryLabel | primaryHref | reasonLine |
|-----------|--------------|-------------|------------|
| All | Agendar prueba de manejo | test_drive | *"La cuota es orientativa — probalo 20 minutos y decidís con más claridad."* (Diego) |

**Default display:** One trim (from discovery) + one plazo + cuota range + TCO monthly total — above fold.

### Alternative triggers

| Condition | Override primaryLabel | primaryHref | reasonLine |
|-----------|----------------------|-------------|------------|
| `budget_range: null` AND `priority: price` | Confirmar por WhatsApp | whatsapp?intent=financing | *"Sin presupuesto claro — un consultor te simula con bancos aliados."* |
| `family: yes/soon` | Prueba familiar | test_drive | *"Traé a tu familia — el espacio atrás se siente en la prueba."* |
| `financingInterestFlagged` (user tapped "simular crédito") | Escribinos por WhatsApp | whatsapp?intent=financing | *"Querés simular tu crédito — te ayudamos por WhatsApp con tus datos."* |
| `compareCompleted` AND `trustSignals < 2` | (rare) | faq | Recovery only |

---

## 4.9 S13 — Conversion Hub

### Default

| Archetype | primaryLabel | primaryHref | reasonLine |
|-----------|--------------|-------------|------------|
| All | Agendar prueba de manejo | test_drive | *"El siguiente paso ideal: manejarlo vos mismo en Santa Cruz."* (system) |

### Alternative triggers

| Condition | Override primaryLabel | primaryHref | reasonLine |
|-----------|----------------------|-------------|------------|
| `testDriveDraft` partial / `financingInterestFlagged` | Confirmar por WhatsApp | whatsapp | *"Seguimos por WhatsApp con el contexto de tu visita."* |
| `family: yes/soon` AND spouse not in draft | Compartir con tu pareja | share | *"Decisión en familia — mandale un resumen a tu pareja."* (secondary only — primary stays test drive unless `hesitation: spouse`) |
| `hesitation: high` (§5.3) | Escribinos sin compromiso | whatsapp | *"Sin presión — un mensaje y te respondemos cuando quieras."* |
| `salesReadinessScore >= 75` | Agendar prueba ahora | test_drive (highlight urgent) | *"Estás listo — coordinemos la prueba esta semana."* |

**S13 rule:** Even with alternatives, **only one** primary pulsing CTA. WhatsApp is never primary unless test drive already submitted or `hesitation: high` + `financingViewed`.

---

## 4.10 Recommendation priority stack (conflict resolution)

When multiple triggers fire, apply highest priority:

| Priority | Trigger |
|----------|---------|
| 1 | `testDriveSubmitted` → whatsapp confirm |
| 2 | Resolver mandatory next node (path template) |
| 3 | `hesitation: high` → test_drive OR whatsapp per §4.9 |
| 4 | Progress-based (`compareCompleted` → financing → test_drive) |
| 5 | Archetype default |
| 6 | `sessionDuration` timeout overrides |

---

# 5. DECISION PROGRESSION MODEL

## 5.1 The five stages (customer-facing)

Displayed as minimal progress strip — never more than 5 labels:

```
Conociste → Confiaste → Comparaste → Te alcanzó → Probaste
```

| Stage | Customer meaning | Sales meaning |
|-------|------------------|---------------|
| **Conociste** | I understand what this vehicle is | Qualified lead — discovery + hero |
| **Confiaste** | I trust this brand/dealer enough to keep going | Objection reduced — trust proof consumed |
| **Comparaste** | I know how it stacks vs my alternative | Rational validation complete |
| **Te alcanzó** | The monthly cost feels possible | Affordability objection addressed |
| **Probaste** | I committed to next physical step | Conversion event captured |

## 5.2 Stage advancement events

| Stage | Required events (any path) | Minimum screens |
|-------|---------------------------|-----------------|
| **Conociste** | `discovery_completed` AND `hero` viewed | S02b + S22 |
| **Confiaste** | `trust_threshold_met` — see §5.2.1 | Varies 1–3 |
| **Comparaste** | `compare_detail` viewed AND `comparison_completed` signal | S12 |
| **Te alcanzó** | `financing` viewed AND (`financingSelection` saved OR `financingInterestFlagged`) | S26 |
| **Probaste** | `test_drive` form submitted OR `whatsapp_click` with intent `test_drive` | S14 or S15 |

### 5.2.1 Trust threshold by archetype

| Archetype | `Confiaste` fires when |
|-----------|------------------------|
| Compare-first | `compare_detail` viewed (trust implicit) |
| Upgrade | `hero` + `compare_detail` viewed |
| Budget-first | `compare_detail` viewed |
| Technology-first | `adas` visited |
| Family-first | `family_safety` or `family_comfort` visited |
| Safety-first | `faq` item viewed + `adas` visited |
| Skeptical | `faq` item viewed + (`trust_story_compressed` viewed OR `adas` visited) |

## 5.3 Hesitation signals

| Signal ID | Detection | Weight |
|-----------|-----------|--------|
| `idle_prompt_shown` | IdleManager overlay triggered | Medium |
| `back_navigation_count >= 2` | Same session, 2 min window | Medium |
| `screen_dwell > 90s` | No progression event on current screen | High |
| `screen_dwell > 180s` | Same | Critical |
| `compare_gate_hit` | User landed on gated S11 | High |
| `faq_accordion_only` | Opened 3+ items without recommended CTA tap | Medium |
| `financing_toggle_only` | Changed trim/plazo 4+ times without next | Medium |
| `convert_hub_revisit` | S13 visited 2+ times | High |
| `spouse_hesitation` | `family: yes` + `test_drive` abandoned + `share` not visited | High |

**Hesitation level:**

- **Low:** 0–1 medium signals  
- **Medium:** 2 medium OR 1 high  
- **High:** 1 critical OR 2+ high OR 3+ medium  

**Engine response to high hesitation:** Shorten copy; recommend `test_drive` with *"Sin compromiso — solo 20 minutos"* OR `whatsapp` if `financingViewed`.

## 5.4 Stage satisfaction by screen

| Screen | Satisfies stage |
|--------|-----------------|
| S02b Discovery | Conociste (partial) |
| S22 Hero | Conociste (complete) |
| S25 FAQ | Confiaste (partial — skeptical, safety) |
| S24 trust_story_compressed | Confiaste (skeptical) |
| S06 trust tour short | Confiaste (partial — skeptical) |
| S08 ADAS / family-safety | Confiaste (technology, safety, family, skeptical) |
| S11/S12 Compare | Comparaste |
| S26 Financing | Te alcanzó |
| S14 Test drive | Probaste |
| S15 WhatsApp (test_drive intent) | Probaste (soft) |

---

# 6. LEAD SCORING

## 6.1 Sales Readiness Score (0–100)

Computed at session end and updated on each progression event. Consultant sees score on lead payload.

### High-intent signals (+points)

| Signal | Points | Cap |
|--------|--------|-----|
| `test_drive` form submitted | +35 | once |
| `whatsapp_click` intent=test_drive | +30 | once |
| `financingSelection` saved with trim + plazo | +15 | once |
| `comparison_completed` (S12 footer) | +12 | once |
| `financingInterestFlagged` | +10 | once |
| `discovery_completed` with `budget_range` set | +8 | once |
| `family: yes` + `childrenAttending` pre-fill | +5 | once |
| `sessionDuration` 3–8 min (sweet spot) | +5 | once |

### Medium-intent signals (+points)

| Signal | Points |
|--------|--------|
| `adas` or `family_safety` visited | +6 |
| `faq` item viewed | +5 |
| `compare_hub` visited | +4 |
| `financing` viewed | +4 |
| `trust_signals >= 3` | +3 |
| `share` screen visited | +3 |
| `spouseAttending` flagged in draft | +3 |

### Low-intent / negative signals (−points)

| Signal | Points |
|--------|--------|
| `sessionDuration < 60s` | −15 |
| `idle_reset` (full session reset) | −20 |
| `compare_gate_hit` without recovery | −8 |
| `back_navigation_count >= 4` | −5 |
| `screen_dwell > 180s` on single screen (stuck) | −5 |
| No discovery completed | −10 |

**Score bounds:** Floor 0, ceiling 100. Round to integer.

## 6.2 Readiness tiers

| Score | Tier | Label (consultant) | Follow-up priority |
|-------|------|--------------------|--------------------|
| 75–100 | **Hot** | Listo para prueba / cierre inicial | **P1 — within 5 minutes** |
| 50–74 | **Warm** | Comparó o vio cuota — necesita empujón | **P2 — within 15 minutes** |
| 25–49 | **Curious** | Exploró — sin compromiso claro | **P3 — same day** |
| 0–24 | **Cold** | Pasó de largo o abandonó temprano | **P4 — optional follow-up** |

## 6.3 Consultant follow-up playbook by tier

| Tier | Recommended action |
|------|---------------------|
| Hot | Approach in showroom: *"Vi que querés agendar prueba del GS4 MAX — ¿mañana o el fin de semana?"* |
| Warm | WhatsApp if captured: reference compare target + cuota range from session |
| Curious | Soft WhatsApp: *"¿Te quedó alguna duda sobre la marca o la cuota?"* |
| Cold | Do not chase unless `phone` captured on partial form |

## 6.4 Lead payload fields (consultant-facing)

| Field | Source |
|-------|--------|
| `salesReadinessScore` | §6.1 |
| `tier` | §6.2 |
| `primaryArchetype` | DiscoveryProfile |
| `discoverySummary` | Human sentence auto-generated |
| `recommendedTrimId` | DiscoveryProfile |
| `compareTarget` | Session |
| `financingSelection` | Session |
| `topicsVisited` | Session |
| `hesitationLevel` | §5.3 |
| `progressStage` | Latest stage reached |
| `followUpPriority` | P1–P4 |

**Discovery summary template:**  
*"{archetype_label} · {family label} · Uso {primary_use} · Prioridad {priority}{budget suffix}"*  

Example: *"Familia con hijos · Uso mixto · Prioridad seguridad · Cuota Bs 1.500–2.000"*

---

# 7. SUCCESS METRICS — Sprint A

## 7.1 Primary KPIs (30-day targets post-launch)

| KPI | Definition | Baseline (est.) | Sprint A target | Measurement |
|-----|------------|-----------------|-----------------|-------------|
| **Discovery completion rate** | `discovery_completed` / `session_start` | N/A (new) | **≥85%** | Analytics |
| **Discovery time (p50)** | Ms from Q1 to completion | N/A | **≤45s** | Analytics |
| **Compare engagement rate** | Sessions with `compare_detail` view / discovery completed | ~40% | **≥65%** | Analytics |
| **Financing engagement rate** | Sessions with `financing` view / compare completed | ~55% | **≥70%** | Analytics |
| **Test-drive initiation rate** | `test_drive` form page views with submit attempt / sessions | ~8% | **≥12%** | Analytics |
| **Test-drive completion rate** | Submitted / form page views | ~50% | **≥65%** | Analytics + API |
| **WhatsApp handoff rate** | `whatsapp_click` / sessions reaching S13 | ~12% | **≥18%** | Analytics |
| **Time to first CTA tap** | Ms from discovery complete to first recommended CTA | ~8 min | **≤90s** | Analytics |
| **Time to test drive submit (p50)** | Discovery complete → submit | ~12 min | **≤5 min** | Analytics |
| **Compare gate abandon rate** | Gated S11 exits without recovery / gated visits | ~40% | **≤10%** | Analytics |

## 7.2 Secondary KPIs

| KPI | Target |
|-----|--------|
| Recommended CTA tap rate (vs total CTA taps) | ≥70% |
| Archetype path adherence (next node matches resolver) | ≥80% |
| Sessions reaching `Confiaste` stage | ≥75% |
| Sessions reaching `Comparaste` stage | ≥60% |
| Hot lead tier (score ≥75) share | ≥20% of completions |
| Lead payload includes discovery profile | 100% |

## 7.3 Quality guardrails (must not regress)

| Guardrail | Threshold |
|-----------|-----------|
| FAQ content accuracy | No copy changes in Sprint A — routing only |
| Compare honesty | No change to verdict data |
| Financing disclaimer visible | 100% of S26 views |
| Single primary CTA compliance | 100% on integrated screens (QA checklist) |

## 7.4 Sprint A acceptance test (manual)

**Five persona walkthroughs** — standing, 1920×1080, no scroll for decisions:

| # | Discovery profile | Max time | Must end at |
|---|-------------------|----------|-------------|
| 1 | Compare-first researcher | 4 min | Test drive submit |
| 2 | Family-first (2 kids, safety) | 5 min | Test drive submit |
| 3 | Skeptical first SUV | 6 min | Test drive submit |
| 4 | Budget-first (cuota Bs 1.500–2.000) | 4 min | Financing viewed + test drive initiated |
| 5 | Technology-first | 4 min | Compare + financing viewed |

**Pass criteria:** Each walkthrough uses only recommended primary CTAs to progress (except explicit back).

---

# 8. COMPLETE BEHAVIORAL SPEC — IMPLEMENTATION CHECKLIST

## 8.1 New customer-facing surfaces

| ID | Surface | Description |
|----|---------|-------------|
| S02b | Discovery flow | 5 questions + completion beat |
| — | Progress strip | 5-stage model global |
| — | RecommendedNextStep | Single CTA component on 8 screens |
| — | Compare gate recovery | Enhanced S11 gated state |
| S24c | Trust story compressed | Single-screen 3-card mode (skeptical path) |

## 8.2 Modified behaviors (no new routes except compressed trust)

| Screen | Behavior change |
|--------|-----------------|
| S02 Welcome | Remove path choice; single "Empezar" → discovery |
| S03 Selector | Auto-skip to hero when single SKU |
| S22 Hero | One recommended CTA; archetype-driven |
| S25 FAQ | Tile-first objection; pre-selected item; one recommendation after view |
| S06 Tour | Short path only for skeptical; 3 steps |
| S08 ADAS / family-safety | One recommendation out |
| S11 Compare | Gate recovery + archetype pre-select |
| S12 Compare | Recommendation prioritizes financing; reventa counter copy |
| S26 Financing | Discovery defaults; recommend test drive not convert hub |
| S13 Convert | One primary; hesitation-aware |

## 8.3 Session state additions (behavioral contract)

```
DiscoveryProfile { ... }           // §1.5
BehavioralIntelligenceState {      // §9
  uncertaintyScore
  confidenceLevel
  salespersonMode
  urgencyLevel
  needForReassurance
  signalLog[]                      // last 20 signals for consultant
  hesitationPatterns[]
}
progressStage                      // §5
hesitationLevel                    // §5.3 + §9.6
salesReadinessScore                // §6 (lead score — separate from uncertainty)
archetypePathTemplate              // PATH_A–G, modified by §9.4
mandatoryNextNode                  // resolver + confidence overlay
```

## 8.4 Analytics events (Sprint A)

| Event | When | Properties |
|-------|------|------------|
| `discovery_started` | Q1 shown | — |
| `discovery_question_answered` | Each Q | `questionId`, `answerId`, `dwellMs` |
| `discovery_completed` | Q4 done | full profile, `discoveryDurationMs` |
| `uncertainty_signal` | Any §9.2 signal fires | `signalId`, `delta`, `newScore` |
| `confidence_level_changed` | Threshold crossed | `from`, `to`, `mode` |
| `salesperson_mode_changed` | Mode switch | `VALIDATOR` \| `GUIDE` \| `REASSURER` |
| `hesitation_pattern_detected` | §9.6 pattern | `patternId`, `intervention` |
| `recommended_cta_shown` | Screen render | `screenId`, `mode`, `confidenceLevel` |
| `consultant_handoff_generated` | S14/S15 | full §9.8 payload |

## 8.5 Content assets required (JSON copy only — no photo/video)

| Asset | Purpose |
|-------|---------|
| `content/shared/discovery.json` | Questions, labels, framing copy |
| `content/shared/archetype-messages.json` | Completion beat sublines per archetype |
| `content/shared/recommendations.json` | All `reasonLine` variants (optional externalization) |
| `content/shared/trust-story-compressed.json` | 3-card skeptical proof |

## 8.6 Explicit non-goals for Sprint A

- No new comparison targets (Tucson, GS8, trim compare) — Sprint D  
- No kiosk-short test drive form — Sprint B  
- No one-screen layout reflow for S12/S26 — Sprint B  
- No TCO sliders — Sprint D  
- No staff dashboard — Phase 2  
- No media production  

---

## 8.7 The 5-minute salesperson script (reference walkthrough)

How the digital salesperson should behave for a **skeptical family buyer** (`first_suv`, `family_yes`, `priority_safety`, `budget_1500_2000`):

| Time | System says / does |
|------|-------------------|
| 0:00 | *"Sin presión. En 1 minuto te muestro lo que te importa."* |
| 0:45 | Discovery complete → *"Perfecto — con hijos, la seguridad va primero."* |
| 1:00 | Hero → rec: *"Con hijos en el auto — empecemos por cómo los protege el GS4 MAX."* |
| 1:30 | Family-safety topic |
| 2:00 | Rec: *"Viste cómo protege a tu familia — comparemos espacio y equipamiento."* |
| 2:30 | Compare verdict — 9/1/6 above fold |
| 3:00 | Rec: *"9 ventajas claras — veamos si el pago mensual calza."* |
| 3:30 | Financing — 4x2, 48 meses, Bs 1.500–2.000 band highlighted |
| 4:00 | Rec: *"Probá 20 minutos con tu familia — sin compromiso."* |
| 4:30 | Test drive — name + phone + day (Sprint B short form; Sprint A uses full form with discovery pre-fill) |
| 5:00 | WhatsApp handoff with full discovery + session recap |

**That is the replacement standard for the first 5 minutes.**

---

## Appendix A — Discovery question copy (v1.1, final)

| Q | Framing | Chips |
|---|---------|-------|
| 1 | ¿Qué te trae hoy a ver este SUV? | Primera SUV · Mejorar mi auto actual · Ya comparé otras opciones |
| 2 | ¿Quién va a usar el auto en el día a día? | Familia con hijos · Pronto bebé · Mi pareja y yo · Principalmente yo |
| 3 | ¿Cómo sería un día típico? | Mixto · Ciudad · Doble Vía / carretera |
| 4 | ¿Qué es lo que más te preocupa? | Confiable · Seguridad · Espacio · Cuota · Convence vs lo que miré · Pareja tranquila · Todo de serie |

Budget: **S26 only** — *"¿Querés ver cuotas orientativas?"*

## Appendix B — Path template quick reference

| PATH | Archetype | Base sequence | HIGH confidence trim |
|------|-----------|---------------|----------------------|
| A | Compare-first | hero → compare → finance → test drive | Skip hero dwell → compare |
| B | Upgrade | hero → compare → finance → test drive | Skip hero → compare |
| C | Budget | hero → compare → finance → test drive | Skip hero → compare |
| D | Technology | hero → adas → compare → finance → test drive | Skip adas → compare |
| E | Family | hero → family_safety → compare → finance → test drive | family_safety → compare |
| F | Safety | hero → faq → adas → compare → finance → test drive | faq → compare |
| G | Skeptical | hero → faq → trust_compressed → adas → compare → finance → test drive | faq → compare (drop trust) |

---

# 9. BEHAVIORAL INTELLIGENCE LAYER

> Sits **above** Discovery, Route Resolver, and Recommendation Engine.  
> Infers confidence, certainty, urgency, and reassurance need from **behavior** — like an experienced salesperson reading body language at 3 meters.  
> **No additional questions.** The kiosk watches pace, depth, loops, and commitment.

## 9.0 Layer position and invariants

```
Inputs:  DiscoveryProfile + continuous behavioral events
Process: uncertaintyScore (running) → confidenceLevel → salespersonMode
Outputs: Route modifiers · CTA copy variant · Carlos/Diego frequency · Consultant handoff
```

| Invariant | Rule |
|-----------|------|
| Customer never sees "confidence score" | Internal only |
| Mode shifts are invisible | Copy and pace change; no labels |
| One primary CTA always | Mode changes **wording**, not choice count |
| Re-score on every material event | Score monotonic within session until reset |
| Floor consultant trust | Handoff always includes human-readable interpretation |

**Terminology:**

| Term | Meaning |
|------|---------|
| `uncertaintyScore` | Internal 0–100+ scale — **higher = less confident, needs more reassurance** |
| `confidenceLevel` | `HIGH` \| `MEDIUM` \| `LOW` — inverse of uncertainty bands |
| `certainty` | Willingness to advance without re-proof (pace + low back-nav) |
| `urgency` | Desire to finish quickly (fast discovery, fast CTA taps, low dwell) |
| `needForReassurance` | Boolean — Carlos-heavy copy, trust milestones enforced |

---

## 9.1 CONFIDENCE MODEL

### HIGH_CONFIDENCE

| Dimension | Description |
|-----------|-------------|
| **Customer mindset** | *"I know what I want — show me numbers and let me drive it."* Already compared online; impatient with basics; treats kiosk as calculator + scheduler. |
| **Typical behavior** | Discovery in **<25s**; few or no back taps; skips optional content; reaches compare within **90s**; expands few compare rows; financing viewed **<45s**; taps first recommended CTA consistently. |
| **Typical concerns** | Validation (*"Am I right that this beats Corolla?"*), payment fit, availability — **not** brand survival. |
| **Sales approach** | **VALIDATOR mode** — respect expertise; shorten path; honest compare; fast track to test drive; minimal Carlos; no trust lecture. |

---

### MEDIUM_CONFIDENCE

| Dimension | Description |
|-----------|-------------|
| **Customer mindset** | *"I'm interested but I'm still weighing it."* Open to guidance; reads content; may need one proof point before next step. |
| **Typical behavior** | Discovery **25–50s**; 0–1 back taps; views 1–2 proof screens fully; compare table partially expanded; financing toggles trim/plazo 1–2 times; follows recommended CTAs with **30–90s** dwell per screen. |
| **Typical concerns** | Mixed — safety OR payment OR trust depending on `concern`; may need spouse alignment. |
| **Sales approach** | **GUIDE mode** — balanced path per archetype; mirror discovery concern; one proof screen per stage; Carlos for facts, Diego for family. |

---

### LOW_CONFIDENCE

| Dimension | Description |
|-----------|-------------|
| **Customer mindset** | *"I want this but I'm afraid of making a mistake."* Chinese-brand anxiety; money fear; spouse veto; information overload. |
| **Typical behavior** | Discovery **>50s** or **2+ backs**; FAQ **2+ items** opened; trust story re-read; compare visited **2+ times**; financing entered then exited; idle prompt triggered; convert hub revisited; avoids test drive CTA. |
| **Typical concerns** | Trust, resale, hidden costs, *"¿Y si me arrepiento?"* |
| **Sales approach** | **REASSURER mode** — Carlos prominent; enforce trust milestone before compare; shorter sentences; normalize fear; offer WhatsApp exit; never rush to close. |

---

## 9.2 SIGNALS — Behavioral scoring table

**Scoring rule:** Each signal adds to `uncertaintyScore` (positive = more uncertain). Some signals subtract. Score recalculated on every event. Cap negative total at **0** for classification; log raw for analytics.

### Discovery phase signals

| Signal ID | Detection | Δ Score | Interpretation |
|-----------|-----------|---------|----------------|
| `DISC_FAST` | Discovery duration **<20s** | **−12** | Decisive; likely researched or urgent |
| `DISC_NORMAL` | Discovery duration **20–60s** | **0** | Neutral |
| `DISC_SLOW` | Discovery duration **>60s** | **+12** | Uncertainty or distraction |
| `DISC_BACK_1` | 1 back during discovery | **+5** | Mild second thoughts |
| `DISC_BACK_2PLUS` | 2+ backs during discovery | **+18** | High indecision at qualification |
| `DISC_CONCERN_TRUST` | Selected `concern: trust` | **+15** | Seed — brand anxiety |
| `DISC_CONCERN_PAYMENT` | Selected `concern: payment` | **+8** | Financial anxiety |
| `DISC_MOMENT_FIRST` | Selected `moment_first` | **+10** | Inexperience |
| `DISC_MOMENT_COMPARE` | Selected `moment_compare` | **−15** | Pre-sold on process |
| `DISC_PARTNER` | `co_decision: partner` | **+6** | Joint veto risk |

### Navigation and pace signals

| Signal ID | Detection | Δ Score | Interpretation |
|-----------|-----------|---------|----------------|
| `NAV_BACK_3PLUS` | 3+ back navigations (session) | **+15** | Lost or disagreeing with path |
| `NAV_ROUTE_SWITCH` | 2+ non-recommended nav pills used | **+12** | Ignoring guide — own agenda or confusion |
| `NAV_REC_CTA_FOLLOW` | Tapped recommended CTA 3+ times in row | **−10** | Trust in system guidance |
| `NAV_REC_CTA_IGNORE` | Ignored recommended CTA 2+ times | **+14** | Mismatch or low trust in kiosk |
| `IDLE_PROMPT` | IdleManager overlay shown | **+10** | Distracted or disengaging |
| `IDLE_RESET` | Session reset from idle | **+25** | Abandon — treat as new cold session if returns |

### Content engagement signals (depth)

| Signal ID | Detection | Δ Score | Interpretation |
|-----------|-----------|---------|----------------|
| `FAQ_1_ITEM` | 1 FAQ item viewed | **0** | Normal trust check |
| `FAQ_2PLUS` | 2+ FAQ items in session | **+10** | Multiple objections active |
| `FAQ_DWELL_90` | >90s on FAQ without advance | **+8** | Stuck on fear |
| `TRUST_STORY_COMPLETE` | Compressed trust story completed | **−8** | Trust building worked |
| `TRUST_STORY_SKIP` | Skipped trust on skeptical path | **+5** | Impatient OR already trust |
| `TOUR_STEP_SLOW` | >45s per tour step (×2 steps) | **+6** | Reading anxiety |
| `ADAS_VIEW` | ADAS or family-safety viewed | **−4** | Engaged with proof |
| `ADAS_DWELL_120` | >120s on ADAS without advance | **+7** | Overwhelmed or skeptical |
| `COMPARE_HUB` | Compare hub viewed | **−5** | Rational evaluation started |
| `COMPARE_DETAIL` | Compare detail viewed | **−8** | Serious buyer signal |
| `COMPARE_REVISIT` | Compare detail 2nd visit | **+12** | Stuck on decision |
| `COMPARE_ROW_EXPAND_5PLUS` | 5+ rows expanded | **−3** | Thorough — slight certainty boost |
| `COMPARE_ROW_EXPAND_0` | 0 rows expanded, quick exit | **+4** | Avoidance or overwhelm |
| `FINANCING_VIEW` | S26 viewed | **−5** | Commercial readiness |
| `FINANCING_TOGGLE_4PLUS` | Trim/plazo changed 4+ times | **+10** | Payment anxiety |
| `FINANCING_EXIT_FAST` | <15s on financing then leave | **+8** | Price shock |
| `FINANCING_CONSENT_NO` | Declined cuota preview | **+6** | Money defensiveness |
| `TEST_DRIVE_OPEN` | S14 opened | **−12** | Strong intent |
| `TEST_DRIVE_ABANDON` | S14 opened, no submit | **+15** | Last-mile fear |
| `TEST_DRIVE_SUBMIT` | Form submitted | **−20** | Conversion — freeze score at submit |
| `WHATSAPP_CLICK` | WhatsApp handoff tapped | **−8** | Intent to continue |
| `SHARE_INITIATED` | Family share opened | **−4** | Joint decision active |

### Urgency signals (separate `urgencyLevel`, do not add to uncertainty)

| Signal ID | Detection | Urgency |
|-----------|-----------|---------|
| `URG_DISC_FAST` + `DISC_MOMENT_COMPARE` | Both true | **HIGH** |
| `URG_REC_TAP_FAST` | Median CTA tap <8s after screen load (3+ screens) | **HIGH** |
| `URG_DWELL_SLOW` | Median screen dwell >120s (3+ screens) | **LOW** |
| `URG_IDLE` | Idle prompt before compare | **LOW** |

**Default urgency:** `MEDIUM`

---

## 9.3 CONFIDENCE CLASSIFICATION — Thresholds

**Primary classification** (evaluate after discovery complete, then continuously):

| `uncertaintyScore` | `confidenceLevel` | `salespersonMode` | `needForReassurance` |
|--------------------|-------------------|-------------------|----------------------|
| **0 – 28** | `HIGH_CONFIDENCE` | `VALIDATOR` | `false` |
| **29 – 62** | `MEDIUM_CONFIDENCE` | `GUIDE` | `false` |
| **63 – 100** | `LOW_CONFIDENCE` | `REASSURER` | `true` |
| **101+** | `LOW_CONFIDENCE` (extended) | `REASSURER` | `true` + WhatsApp bias |

**Hysteresis (prevent flicker):** Mode only changes when score crosses threshold **±5** boundary for **2 consecutive events**. Example: drops from 30 to 27 → stays MEDIUM until ≤23.

**Override rules (immediate, ignore hysteresis):**

| Condition | Force level |
|-----------|-------------|
| `TEST_DRIVE_SUBMIT` | Treat as HIGH intent regardless of score |
| `TEST_DRIVE_ABANDON` | Force LOW |
| `concern: trust` AND `uncertaintyScore < 40` | Floor at MEDIUM — never VALIDATOR on trust concern |
| `moment_compare` AND score would be LOW | Cap at MEDIUM — researchers aren't always anxious |
| `COMPARE_REVISIT` + `FINANCING_TOGGLE_4PLUS` | Force LOW |

**Certainty sub-score (internal, optional display to consultant):**

```
certaintyIndex = 100 - uncertaintyScore (clamped 0-100)
```

---

## 9.4 ROUTING ADAPTATION — Confidence modifies path

**Base path** from §3 (archetype). **Confidence overlay** trims or extends.

### Global routing rules by confidence

| Rule | HIGH | MEDIUM | LOW |
|------|------|--------|-----|
| Trust content before compare | **Skip** if `concern ≠ trust` | Per archetype | **Enforce** — block compare until FAQ or trust node visited |
| `trust_story_compressed` | **Skip** | Skeptical only | **Required** on skeptical path |
| `trust_tour` | Never | Never (Sprint A) | Never |
| Compare gate | **Open at hero** if validation path | Per §3.5 | **Closed** until trust milestone |
| Max screens before test drive | **4** | Per archetype | Per archetype + allow **+1** reassurance screen |
| Auto-skip hero dwell | **Yes** (3s max) | No | No — allow hero soak |
| Financing before test drive | Optional skip if `TEST_DRIVE_OPEN` | Standard | **Require** financing view unless `FINANCING_CONSENT_NO` |

### Routing table — node inclusion by confidence (skeptical PATH_G example)

| Node | HIGH | MEDIUM | LOW |
|------|------|--------|-----|
| `hero` | ✓ brief | ✓ | ✓ extended dwell OK |
| `faq` | Skip → compare | ✓ | ✓ **required** |
| `trust_story_compressed` | Skip | ✓ | ✓ **required** |
| `adas` | Optional | ✓ | ✓ |
| `compare_hub` | ✓ immediate | ✓ after trust | ✓ after trust + ADAS |
| `financing` | ✓ | ✓ | ✓ before test drive |
| `test_drive` | ✓ | ✓ | ✓ (soft CTA copy) |

### Routing table — compare-first PATH_A

| Node | HIGH | MEDIUM | LOW |
|------|------|--------|-----|
| `hero` | Skip / 3s | ✓ | ✓ |
| `compare_hub` | ✓ immediate | ✓ immediate | ✓ after optional FAQ link |
| `faq` | Secondary only | If idle >60s | **Recommend before compare** if score >55 |

### Routing table — family PATH_E

| Node | HIGH | MEDIUM | LOW |
|------|------|--------|-----|
| `family_safety` | ✓ fast | ✓ | ✓ + Diego copy |
| `share` | After compare if partner | After compare | **Before financing** if `spouseInfluence: high` |
| `compare` | ✓ | ✓ | ✓ — highlight Espacio + Seguridad |

### Trust milestone definition (for LOW compare gate)

**Trust milestone met** when any **two** of:

- `FAQ_1_ITEM` with dwell >20s  
- `TRUST_STORY_COMPLETE`  
- `ADAS_VIEW` with dwell >30s  
- `family_safety` viewed  

---

## 9.5 RECOMMENDATION ADAPTATION — CTA copy by mode

**Formula:** `[Mode tone] + [Concern mirror] + [Action]`  
Persona: VALIDATOR → Sofía/Carlos brief · GUIDE → balanced · REASSURER → Carlos/Diego warm

### S22 — Hero

| Mode | primaryLabel | reasonLine |
|------|--------------|------------|
| **VALIDATOR** (HIGH) | Compará con honestidad | *"Ya sabés lo básico — veamos lado a lado con datos."* |
| **GUIDE** (MEDIUM) | Resolvamos tu mayor preocupación | *"Mencionaste {concern_label} — empecemos por ahí."* |
| **REASSURER** (LOW) | Empecemos por tu mayor duda | *"Es normal tener dudas — vamos paso a paso, sin presión."* (Carlos) |

**Concern variants (GUIDE/REASSURER):** `trust` → confianza · `safety` → seguridad familiar · `payment` → si el valor cierra · `validation` → si conviene comparar

---

### S25 — FAQ / Trust

| Mode | primaryLabel | reasonLine |
|------|--------------|------------|
| **VALIDATOR** | Ir a la comparación | *"Con la info clave — comparemos con números reales."* |
| **GUIDE** | Ver seguridad en la práctica | *"Respondiste la duda de marca — ahora mirá cómo protege en calle."* |
| **REASSURER** | Conocé a Viaggio en Santa Cruz | *"La marca es una cosa — quién te respalda después, otra. Mirá esto."* (Carlos) |

---

### S06 / S24 — Trust tour / Trust story

| Mode | primaryLabel | reasonLine |
|------|--------------|------------|
| **VALIDATOR** | Saltar al comparador | *"Si ya te cierra el respaldo — comparemos directo."* |
| **GUIDE** | Siguiente: seguridad ADAS | *"Viste el respaldo — cerramos con seguridad activa."* |
| **REASSURER** | Seguir: por qué Viaggio responde | *"Muchas familias preguntan lo mismo — mirá el taller y el respaldo local."* (Carlos) |

---

### S11 — Compare hub

| Mode | primaryLabel | reasonLine |
|------|--------------|------------|
| **VALIDATOR** | Ver comparación con Corolla Cross | *"Veamos cómo se compara — sin vueltas."* |
| **GUIDE** | Ver comparación honesta | *"Antes de decidir — mirá dónde gana cada uno."* |
| **REASSURER** | Comparar con tranquilidad | *"Te mostramos dónde ganamos y dónde no — sin ocultar nada."* (Carlos) |

**Gated LOW:** *"Primero una respuesta rápida"* → FAQ — *"Un minuto de confianza — después comparás con datos."*

---

### S12 — Compare detail

| Mode | primaryLabel | reasonLine |
|------|--------------|------------|
| **VALIDATOR** | Ver cuota orientativa | *"9 a 1 en equipamiento — veamos si los números te cierran."* |
| **GUIDE** | Ver si la cuota calza | *"Comparaste — ahora el costo mensual orientativo."* |
| **REASSURER** | Ver el costo total con calma | *"Toyota gana en reventa hoy — muchas familias eligen GS4 por lo que usan cada día. Veamos si te cierra."* (Carlos) |

---

### S26 — Financing

| Mode | primaryLabel | reasonLine |
|------|--------------|------------|
| **VALIDATOR** | Agendar prueba de manejo | *"Los números son orientativos — manejarlo aclara más que la pantalla."* |
| **GUIDE** | Agendar prueba de manejo | *"Si el rango te parece razonable — probalo 20 minutos."* |
| **REASSURER** | Probar sin compromiso | *"La cuota la confirma tu consultor — primero sentí el auto en tu ruta."* (Carlos) |

**If `FINANCING_TOGGLE_4PLUS`:** REASSURER overrides → WhatsApp: *"Un consultor te simula sin presión — cuando quieras."*

---

### S14 — Test drive

| Mode | primaryLabel | reasonLine |
|------|--------------|------------|
| **VALIDATOR** | Confirmar prueba | *"20 minutos — coordinamos día y listo."* |
| **GUIDE** | Agendar prueba de manejo | *"Lo mejor es manejarlo — ¿qué día te viene bien?"* |
| **REASSURER** | Reservar sin compromiso | *"No es comprar — es probar con calma. Dejá nombre y WhatsApp."* (Diego) |

**Partner variant (all modes):** *"Prueba en pareja"* — *"Que lo manejen los dos."*

---

## 9.6 HESITATION DETECTION

Patterns are **combinations** of signals. On detection → trigger intervention + CTA override once.

| Pattern ID | Behavioral signature | Interpretation | Intervention | Recommended CTA |
|------------|---------------------|----------------|--------------|-----------------|
| `HESITATE_DWELL` | Single screen dwell **>120s**, no CTA | Overwhelmed or reading alone | Shorten copy; pulse CTA; Carlos one-liner | Same screen — softer label: *"Cuando quieras, seguimos"* |
| `HESITATE_COMPARE_LOOP` | `COMPARE_REVISIT` + score rising | Can't reconcile reventa fear | Inject reventa counter on S12 | *"Ver costo total, no solo reventa"* → financing |
| `HESITATE_FINANCE_LOOP` | `FINANCING_TOGGLE_4PLUS` | Payment anxiety spiral | Hide toggles; show single number + disclaimer | WhatsApp financing intent |
| `HESITATE_TRUST_LOOP` | FAQ **2+** + back to FAQ | Brand fear dominant | Force trust_story_compressed | *"Mirá quién te respalda en Santa Cruz"* |
| `HESITATE_CONVERT_STALL` | S13 **2+** visits, no test drive | Decision paralysis | Collapse to 1 card; REASSURER mode | WhatsApp *"Seguimos por chat"* |
| `HESITATE_TEST_DRIVE_FEAR` | `TEST_DRIVE_ABANDON` | Last-step commitment fear | Skip form length; emphasize no obligation | *"Solo nombre y WhatsApp — coordinamos después"* |
| `HESITATE_SPOUSE` | `spouseInfluence: high` + compare done + no share | Waiting for partner | Surface share primary once | *"Mandá esto a tu pareja"* → share |
| `HESITATE_ROUTE_LOST` | `NAV_ROUTE_SWITCH` + `NAV_BACK_3PLUS` | Confused by kiosk | Reset recommended path banner | *"Te sugiero el mejor siguiente paso"* → resolver next |

**Hesitation level (feeds §5.3):**

- **Low:** 0–1 patterns  
- **Medium:** 2 patterns OR 1 high-severity (`TEST_DRIVE_ABANDON`, `COMPARE_LOOP`)  
- **High:** 2+ high-severity OR `IDLE_RESET`

---

## 9.7 SALESPERSON MODES

### VALIDATOR (maps from HIGH_CONFIDENCE, with overrides)

| Attribute | Definition |
|-----------|------------|
| **Tone** | Peer-to-peer; respects homework; no condescension |
| **Copy style** | Short; data-forward; *"Veamos"* / *"Comparemos"*; minimal disclaimers |
| **CTA style** | Imperative, fast — *"Ver comparación"* / *"Confirmar prueba"* |
| **Routing preference** | Shortest path; skip trust; compare → finance → drive |
| **Persona** | Sofía lead; Carlos only for compare honesty |

---

### GUIDE (maps from MEDIUM_CONFIDENCE)

| Attribute | Definition |
|-----------|------------|
| **Tone** | Warm professional; *"Te muestro"* / *"Mencionaste"* |
| **Copy style** | Mirror `concern`; one proof per step; balanced |
| **CTA style** | Explanatory — *"Resolvamos…"* / *"Veamos si calza"* |
| **Routing preference** | Archetype path per §3 |
| **Persona** | Carlos + Diego + Sofía per topic |

---

### REASSURER (maps from LOW_CONFIDENCE)

| Attribute | Definition |
|-----------|------------|
| **Tone** | Calm; normalizing; *"Es normal"* / *"Sin presión"* / *"Muchas familias"* |
| **Copy style** | Shorter sentences; fewer numbers first; feelings before specs |
| **CTA style** | Soft — *"Empecemos por…"* / *"Cuando quieras"* / *"Sin compromiso"* |
| **Routing preference** | Trust milestones; Carlos on every screen; WhatsApp acceptable |
| **Persona** | Carlos primary; Diego for family; Sofía subdued |

### Mode map summary

| confidenceLevel | salespersonMode | urgency HIGH modifier |
|-----------------|-----------------|----------------------|
| HIGH | VALIDATOR | Shorten path −1 screen |
| MEDIUM | GUIDE | None |
| LOW | REASSURER | Never shorten; allow WhatsApp |

**Urgency HIGH + MEDIUM confidence:** Behave like VALIDATOR on routing only — copy stays GUIDE.

---

## 9.8 CONSULTANT HANDOFF

Generated automatically on **test drive submit** or **WhatsApp click**. Sent to: lead API, WhatsApp context block, consultant tablet (future S35).

### Handoff payload structure

```
consultantBrief {
  generatedAt
  buyerArchetype          // e.g. "Family-first"
  primaryConcern          // human label from concern
  coDecision              // solo | partner | family_group
  confidenceLevel         // HIGH | MEDIUM | LOW
  salespersonMode         // VALIDATOR | GUIDE | REASSURER
  certaintyIndex          // 0-100
  urgencyLevel            // LOW | MEDIUM | HIGH
  needForReassurance      // boolean
  hesitationPatterns[]    // pattern IDs
  screensViewed[]         // ordered, deduped
  trustMilestonesMet[]    // faq, adas, compare, financing
  compareTarget           // e.g. "Corolla Cross"
  financingSelection      // trim + plazo if set
  recommendedApproach     // 1-2 sentences — REQUIRED
  openingScript           // suggested first line in Spanish
  avoid                 // 1 line — what NOT to do
}
```

### `recommendedApproach` templates

| Archetype | concern | confidence | Approach text |
|-----------|---------|------------|---------------|
| Family-first | safety | LOW | *"Begin with ownership stories and child safety — avoid opening with price. Offer family test drive. Spouse may need to see rear space."* |
| Skeptical | trust | LOW | *"Lead with Viaggio local service and warranty — not global brand slides. Acknowledge Chinese-brand question directly. Do not rush financing."* |
| Compare-first | validation | HIGH | *"Buyer did homework — confirm compare findings, offer test drive quickly. Skip trust lecture."* |
| Budget-first | payment | MEDIUM | *"Validate TCO vs competitor — show cuota simulation with real banks. Watch for payment anxiety toggles on kiosk."* |
| Any | joint_confidence | any | *"Joint decision — offer to include partner on test drive or send share summary before close."* |

### Example handoff (narrative)

> **Family-first buyer.** Main concern: trust in brand. **Confidence: LOW.** Co-decision: partner involved. Viewed FAQ (china-brand, warranty), ADAS, compare vs Corolla Cross. Hesitation: compare revisited twice; financing toggled 5×.  
> **Recommended approach:** Begin with ownership stories and Viaggio service support — not price. Acknowledge marca china openly. Offer paired test drive. Send share link if partner not present.  
> **Opening script:** *"Vi que miraste la comparación con Toyota — ¿qué te quedó dando vueltas en la cabeza?"*  
> **Avoid:** Opening with discount or cuota before trust settled.

### Spanish `openingScript` examples by mode

| Mode | Script |
|------|--------|
| VALIDATOR | *"Vi que comparaste bien el GS4 — ¿querés coordinar la prueba o tenés una duda puntual?"* |
| GUIDE | *"Vi que te importó {concern} — ¿qué parte querés que miremos juntos?"* |
| REASSURER | *"Muchos llegan con la misma duda de marca — ¿qué fue lo que más te pesó en pantalla?"* |

---

## 9.9 Implementation contract (behavioral only)

### Recalculation triggers

Recompute `uncertaintyScore` and evaluate classification on:

- Discovery complete  
- Every screen exit (with dwell time)  
- Every recommended CTA tap or ignore  
- Compare row expand/collapse batch  
- Financing trim/plazo change  
- Idle prompt  
- Test drive open/submit/abandon  
- WhatsApp click  

### Integration points

| System | Receives from BIL |
|--------|-----------------|
| Route Resolver | `confidenceLevel`, `needForReassurance`, `urgencyLevel`, hesitation patterns |
| Recommendation Engine | `salespersonMode`, `confidenceLevel`, `concern`, hesitation override |
| Progress strip | No change — customer-facing stages unchanged |
| Lead score (§6) | Independent — readiness vs uncertainty are separate dimensions |
| Consultant handoff | Full §9.8 payload |

### What BIL must NOT do

- Ask new questions  
- Show confidence label to customer  
- Block test drive permanently — only soften CTA  
- Force WhatsApp except as **recommended** CTA under REASSURER + payment spiral  
- Override honest compare content  

### Acceptance criteria (BIL)

- [ ] Customer with fast discovery + compare in <90s → HIGH by hero exit  
- [ ] Customer with trust concern + 2 FAQ + compare revisit → LOW by compare  
- [ ] Mode hysteresis prevents flicker on borderline scores  
- [ ] REASSURER never uses VALIDATOR copy on same screen  
- [ ] Consultant handoff readable in <10 seconds by floor staff  
- [ ] No additional taps vs v1.1 discovery  

---

*End of Sprint A Product Specification v1.2 — ready for implementation.*

