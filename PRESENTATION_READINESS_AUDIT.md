# CPI-OS Presentation Readiness Audit

**Reference narrative:** [`docs/presentations/CPI_OS_EXECUTIVE_NARRATIVE_ES.md`](docs/presentations/CPI_OS_EXECUTIVE_NARRATIVE_ES.md)  
**Audit date:** 15 June 2026  
**Codebase state:** `npm run build` passes · 69 static routes · `NEXT_PUBLIC_DEMO_MODE=true` kiosk path configured

---

## Executive verdict

The software **matches the customer-facing kiosk story** well enough for a **scripted showroom walkthrough**, but **does not match the operations story** promised to vendedores, gerentes, and dirección. The narrative describes a closed loop (kiosco → tablet → tablero → reportes → aprendizaje). The build today delivers roughly the **first third** of that loop.

| Layer | Narrative promise | Implementation | Demo readiness |
|-------|-------------------|----------------|----------------|
| Showroom digital (cliente) | Kiosco completo con confianza, comparación, economía, conversión | Core path implemented; economics/config/session gaps | **68%** |
| Coordinación de piso (vendedor) | Tablet con cola, temperatura, handoff, acciones | Not built | **5%** |
| Mando gerencial | Tablero tiempo real + tendencias | Not built | **0%** |
| Dirección ejecutiva | Reportes diario/semanal/mensual/trimestral | Not built | **0%** |
| **Overall narrative match** | | | **38%** |

**Kiosk-only demo readiness** (scripted path S01→S15, no ops layer): **72%**

---

## Classification key

| Code | Meaning |
|------|---------|
| **A** | Fully Implemented — matches narrative for demo/production use |
| **B** | Partially Implemented — UI or flow exists; material gaps vs narrative |
| **C** | UI Exists But Nonfunctional — screen/copy present; no backend or ops wiring |
| **D** | Missing — not in codebase |

---

## Capability audit

### 1. Kiosk experience

**Classification: B — Partially Implemented**  
**Demo readiness: 72%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| Pantalla de atracción (video loop, toque para empezar) | ✅ | `AttractLoop` · `/` |
| Bienvenida con camino (primera vez / ya investigé) | ✅ | `WelcomeScreen` · `/` |
| Selector GS4 MAX | ✅ | `VehicleSelector` · `/vehicles` |
| Héroe inmersivo con hotspots | ⚠️ | `VehicleHero` · `/vehicles/gs4-max/hero` — hotspots **disabled in demo mode** |
| Ruta de confianza, exploración, comparación, economía | ⚠️ | Trust/compare/financing built; **TCO standalone, retoma, configurador lite missing** |
| Hub de conversión con 4 CTAs | ⚠️ | `ConversionHubScreen` · `/convert` — **no “Hablar con asesor ahora”**; share/financing hidden in demo mode |
| Reinicio por inactividad | ✅ | `IdleManager` · 3 min prompt / 5 min reset |
| Guardar sesión antes de reset | ❌ | Idle resets to S01; **no S37 save offer** |
| Ajustes de accesibilidad | ✅ | `A11yProvider` + settings overlay (hidden in demo mode) |

**Routes / pages**

| Screen | Route |
|--------|-------|
| S01 Attract | `/` |
| S02 Welcome | `/` (phase after attract) |
| S03 Vehicle selector | `/vehicles` |
| S22 Hero | `/vehicles/gs4-max/hero` |
| S20 Idle overlay | Global in `app/(showroom)/layout.tsx` |
| S19 Settings | Global overlay via `GlobalHeader` |

**Screenshot locations**

| Asset | Path |
|-------|------|
| S01 attract (demo pass) | `docs/screenshots/executive-demo-pass/after/s01-attract.png` |
| S03 vehicles | `docs/screenshots/executive-demo-pass/after/s03-vehicles.png` |
| S22 hero | `docs/screenshots/executive-demo-pass/after/s22-hero.png` |
| S01 attract (audit) | `docs/audit/screenshots/S01-attract-loop.png` |
| S03 selector (audit) | `docs/audit/screenshots/S03-vehicle-selector.png` |

**Missing UI**

- `/vehicles/[slug]/economics/tco` (S28)
- `/vehicles/[slug]/economics/trade-in` (S27)
- `/vehicles/[slug]/configure-lite` (S30)
- `/visit/[slug]` or `/v/[slug]` pre-visit QR (S21)
- S18 session summary end screen
- S36 consultant live-handoff modal
- “Hablar con un asesor ahora” on conversion hub

**Missing backend**

- Persistent session store across kiosk reset
- Real-time session broadcast to staff tablets
- Campaign/QR attribution on entry

---

### 2. Customer experience

**Classification: B — Partially Implemented**  
**Demo readiness: 68%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| Experiencia premium sin jerga de embudo | ✅ | Kiosk copy, cinematic shell, demo mode strips dev labels |
| Tres guías: Carlos, Sofía, Diego | ✅ | Journey tours + persona experience screens |
| Comparación honesta, cuota orientativa | ✅ | Compare + financing screens |
| Mensajes “sin presión / a tu ritmo” | ✅ | Welcome, conversion, FAQ copy |
| Prueba de manejo, WhatsApp, asesor, resumen familiar | ⚠️ | Test drive + WhatsApp + share built; **asesor ahora not operational** |
| QR Instagram / parabrisas antes de visita | ❌ | No S21 route |
| Continuar sesión días después | ❌ | `ResumePlaceholder` stub only |
| Cónyuge recibe resumen en celular | ⚠️ | Share token page works; **no decider tracking** |

**Routes / pages**

| Flow | Route |
|------|-------|
| Entry | `/` → `/vehicles` → `/vehicles/gs4-max/hero` |
| Persona journeys | `/vehicles/gs4-max/journey/{carlos\|sofia\|diego}` |
| Persona experiences | `/vehicles/gs4-max/experience/{carlos\|sofia}` |
| Conversion | `/vehicles/gs4-max/convert` |
| Test drive | `/vehicles/gs4-max/test-drive` |
| WhatsApp | `/vehicles/gs4-max/whatsapp` |
| Family share | `/vehicles/gs4-max/share` · `/vehicles/gs4-max/share/[token]` |
| Resume (stub) | `/vehicles/gs4-max/resume` |

**Screenshot locations**

- `docs/screenshots/executive-demo-pass/after/s06-tour-trust.png`
- `docs/screenshots/executive-demo-pass/after/s08-adas.png`
- `docs/screenshots/executive-demo-pass/after/s24-trust-story.png`
- `docs/screenshots/executive-demo-pass/after/s25-faq.png`
- `docs/audit/screenshots/S08-adas-topic.png`

**Missing UI**

- Pre-visit mobile landing (S21)
- Functional resume / continue-session (S37)
- Consultant-request modal with wait timer (S36)
- WhatsApp bridge with intent chips mid-journey (S32)

**Missing backend**

- Session persistence (Supabase or equivalent)
- Share-open / secondary-decider analytics
- WhatsApp confirmation and test-drive reminders

---

### 3. Vehicle experience

**Classification: B — Partially Implemented**  
**Demo readiness: 65%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| GS4 MAX héroe con datos clave | ✅ | `VehicleHero` + `keyStats` from content |
| Hotspots: motor, seguridad, interior, maletero | ⚠️ | Implemented; **hidden when `disableExplorationBranches`** |
| Tour Carlos (confianza técnica) | ✅ | `/tour/trust` · `TourPlayer` |
| Tour Diego (familia) | ✅ | `/journey/diego` |
| Tour Sofía (deseo/valor) | ✅ | `/journey/sofia` |
| Temas y profundización (ADAS, familia, etc.) | ✅ | `/themes/[themeId]/[topicId]` |
| Garantía profunda | ✅ | `/trust/warranty` |
| Galería de colores/interior | ❌ | `routes.gallery` defined; **no page** |
| Configurador ligero (color, versión, stock) | ❌ | **No route or screen** |
| Vehicle home hub rico (S04) | ⚠️ | `/vehicles/[slug]` is a **minimal link hub**, not narrative hub |

**Routes / pages**

| Screen | Route |
|--------|-------|
| S22 Hero | `/vehicles/gs4-max/hero` |
| S04 Hub (minimal) | `/vehicles/gs4-max` |
| S06 Trust tour | `/vehicles/gs4-max/tour/trust` |
| S08 Topics | `/vehicles/gs4-max/themes/safety/adas` (etc.) |
| S29 Warranty | `/vehicles/gs4-max/trust/warranty` |
| Diego/Sofía journeys | `/vehicles/gs4-max/journey/diego` · `.../sofia` |

**Screenshot locations**

- `docs/screenshots/executive-demo-pass/after/s22-hero.png`
- `docs/screenshots/executive-demo-pass/after/s06-tour-trust.png`
- `docs/audit/screenshots/S22-immersive-hero.png`

**Missing UI**

- `/vehicles/[slug]/gallery` (S09)
- `/vehicles/[slug]/specs` (S10)
- `/vehicles/[slug]/configure-lite` (S30)
- Rich S04 hub (trust row, economics row, theme grid per screen-map)

**Missing backend**

- Showroom stock / units-available feed for configurator badge
- Color/trim inventory sync

---

### 4. Family summary flow

**Classification: B — Partially Implemented**  
**Demo readiness: 55%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| “Enviar resumen a mi familia” desde kiosco | ✅ | `FamilyShareScreen` · `/share` |
| WhatsApp con puntos clave, comparación, cuota | ⚠️ | Template from `share-summary.json` + session topics; **compare/cuota not always in payload** |
| Enlace móvil para cónyuge | ✅ | `/share/[token]` compact view |
| Cónyuge reabre sesión / fragmento de tour | ❌ | Resume stub; no deep-link to Carlos tour from share |
| Señal “decisor secundario activo” en panel | ❌ | No staff panel |
| Impacto en segundas visitas (reporting) | ❌ | No analytics pipeline |

**Routes / pages**

| Screen | Route |
|--------|-------|
| S33 Share (kiosk) | `/vehicles/gs4-max/share` |
| S33 recipient (mobile) | `/vehicles/gs4-max/share/[token]` |

**Screenshot locations**

- None captured in `docs/screenshots/` or `docs/audit/screenshots/` for S33

**Missing UI**

- Share payload with compare verdict + financing selection embedded
- Recipient “Tengo preguntas” → WhatsApp CTA (narrative §12 S33)
- Resume link on share (marked “Próximamente” in `FamilyShareScreen.tsx`)

**Missing backend**

- Server-generated share tokens (today: `localStorage` + random client token)
- `share_opened` / `secondary_decider_active` events
- Attribution of spouse return visits to original session

---

### 5. Trust journey

**Classification: B — Partially Implemented**  
**Demo readiness: 75%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| FAQ honestas (marca china, repuestos, reventa, garantía) | ✅ | `FAQScreen` · `/trust/faq` |
| Historia GAC global + Viaggio local | ✅ | `TrustStoryScreen` · `/trust/story` |
| Tour con Carlos (motor, chasis, garantía) | ✅ | `/tour/trust` + `/experience/carlos` |
| Profundización seguridad / ADAS | ✅ | `/themes/safety/adas` |
| Testimonios locales (S23) | ❌ | **No `/trust/testimonials` route** |
| Trust signal gating before desire/financing | ✅ | `SessionProvider` trust counters |

**Routes / pages**

| Screen | Route |
|--------|-------|
| S25 FAQ | `/vehicles/gs4-max/trust/faq` |
| S24 Trust story | `/vehicles/gs4-max/trust/story` |
| Carlos experience | `/vehicles/gs4-max/experience/carlos` |
| S06 Trust tour | `/vehicles/gs4-max/tour/trust` |
| S29 Warranty | `/vehicles/gs4-max/trust/warranty` |

**Screenshot locations**

- `docs/screenshots/executive-demo-pass/after/s25-faq.png`
- `docs/screenshots/executive-demo-pass/after/s24-trust-story.png`
- `docs/screenshots/executive-demo-pass/after/s06-tour-trust.png`
- `docs/audit/screenshots/S25-faq.png` · `S06-trust-tour.png`

**Missing UI**

- S23 Social proof hub (`/trust/testimonials`)

**Missing backend**

- Verified testimonial metadata / video hosting
- Objection-frequency aggregation (“repuestos en 4 de 10 visitas”)

---

### 6. Competitor comparison

**Classification: A — Fully Implemented** *(MVP scope: Corolla Cross)*  
**Demo readiness: 80%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| Elegir competidor (ej. Corolla Cross) | ✅ | `CompareHubScreen` |
| Tabla lado a lado por categorías | ✅ | `CompareDetailScreen` |
| Badges “Ellos ganan” / “Nosotros ganamos” | ✅ | `CompareVerdictBadge` |
| Honest reventa loss row | ✅ | Content-driven verdicts in compare JSON |
| CTA post-comparación (prueba, compartir) | ✅ | Links to test drive / convert |

**Routes / pages**

| Screen | Route |
|--------|-------|
| S11 Compare hub | `/vehicles/gs4-max/compare` |
| S12 Compare detail | `/vehicles/gs4-max/compare/corolla-cross` |

**Screenshot locations**

- `docs/screenshots/executive-demo-pass/after/s11-compare.png`

**Missing UI**

- Additional competitors beyond Corolla Cross (Tucson, Tiggo — shown as “Próximamente”)
- S31 comparison shortlist
- “Compartir comparación” → family share integration from S12

**Missing backend**

- Compare-choice analytics feed to marketing (narrative §19)

---

### 7. Vendor tablet

**Classification: D — Missing**  
**Demo readiness: 5%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| Tablet de piso `/staff` | ❌ | **No route group, no components** |
| Cola priorizada frío / tibio / caliente | ❌ | — |
| Alerta “Quiero un asesor ahora” | ❌ | — |
| Reclamar lead | ❌ | — |
| Unirse a sesión del kiosco | ❌ | — |
| Actualizar estado (contactado, calificado, perdido) | ❌ | — |
| Modo presentación (mismo contenido, mediado) | ❌ | — |

**Routes / pages**

- None. `consultant_tablet` appears only in `types/path-instance.ts` (schema contract).

**Screenshot locations**

- None

**Missing UI**

- Entire S35 Staff Dashboard
- S36 Consultant Live Handoff (customer modal + staff alert)
- S16 handoff card / QR for consultant scan

**Missing backend**

- `/api/handoff`, lead queue API, Supabase Realtime or polling
- Consultant auth / device PIN
- Session mirror route

**Note:** `WhatsAppHandoffScreen` includes *marketing copy* about consultant handoff (“Un consultor te atiende en breve”) but triggers **no staff alert** — customer-only UI.

---

### 8. Lead temperature

**Classification: D — Missing**  
**Demo readiness: 0%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| Clasificación frío / tibio / caliente | ❌ | No scoring model in app |
| Cola ordenada por temperatura | ❌ | No staff UI |
| Temporizador 2 min para calientes | ❌ | — |
| Escalación a gerente | ❌ | — |
| Señales: profundidad, comparación, cuota, asesor | ⚠️ | Client `trustSignals`, `financingInterestFlagged`, `topicsVisited` — **not mapped to temperature** |

**Routes / pages**

- None

**Screenshot locations**

- None

**Missing UI**

- Temperature badges on lead cards
- SLA countdown timer
- Tier distribution charts (manager view)

**Missing backend**

- Lead scoring engine (narrative §20: capturar → contextualizar → priorizar → aprender)
- Server-side score persistence
- Threshold rules (e.g. compare + financing → caliente)

---

### 9. Handoff report

**Classification: B — Partially Implemented** *(customer-side context only)*  
**Demo readiness: 25%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| Informe: vehículo, temas, comparación, cuota, perfil, objeciones | ⚠️ | `SessionRecap` chips + `buildWhatsAppMessage()` — **client session only** |
| Línea sugerida para abrir conversación | ⚠️ | Static script on `WhatsAppHandoffScreen` (not dynamic from session) |
| Informe expandible en tablet del vendedor | ❌ | No S35 |
| Handoff en <2 min con temporizador | ❌ | Copy only (“usualmente menos de 2 minutos”) |

**Routes / pages**

| Artifact | Route / location |
|----------|------------------|
| Session recap (customer) | `/vehicles/gs4-max/convert` |
| WhatsApp context preview | `/vehicles/gs4-max/whatsapp` |
| Lead POST with `sessionContext` | `POST /api/leads` (ephemeral mock) |

**Screenshot locations**

- None dedicated to handoff report

**Missing UI**

- S35 handoff brief drawer (narrative §12, §14)
- Objections-detected panel
- Persona affinity % (técnico / familiar / valor)

**Missing backend**

- Lead record enriched from session on S36 request
- Consultant claim / assignment
- CRM export of handoff payload

---

### 10. Manager dashboard

**Classification: D — Missing**  
**Demo readiness: 0%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| Tiempo real: sesiones en kiosco, handoffs sin atender, pruebas hoy | ❌ | — |
| Reasignación de leads | ❌ | — |
| Embudo semanal: sesión → lead → prueba → venta | ❌ | — |
| Motivos de pérdida, temas más vistos | ❌ | — |
| Ranking vendedores por SLA | ❌ | — |
| Brechas stock vs interés | ❌ | — |

**Routes / pages**

- None (`/management`, `/staff`, or Zoho-embedded views absent)

**Screenshot locations**

- None

**Missing UI**

- Entire management dashboard (narrative §7, §15)
- SLA alert banner (red when handoffs exceed threshold)
- Test-drive coordinator view

**Missing backend**

- Analytics warehouse / Supabase aggregates
- `trackEvent` today dispatches `window` CustomEvent only — **no server ingestion**
- CRM sync for pipeline stages

---

### 11. Executive reporting

**Classification: D — Missing**  
**Demo readiness: 0%**

| Narrative promise | Status | Evidence |
|-------------------|--------|----------|
| Reporte diario (5 min) | ❌ | — |
| Reporte semanal (embudo, SLA, objeciones, comparaciones) | ❌ | — |
| Reporte mensual (atribución digital, CPL, resumen familiar) | ❌ | — |
| Reporte trimestral (ROI marketing, patrones estacionales) | ❌ | — |
| Conclusiones en español, no tablas técnicas | ❌ | — |

**Routes / pages**

- None

**Screenshot locations**

- None

**Missing UI**

- All executive report surfaces
- Export for junta / marca importadora

**Missing backend**

- `lib/crm/close-join.ts` computes join-rate for governance gates only — **not wired to UI**
- `types/path-instance.ts`, `lib/governance/*` are specification scaffolding
- No report generation, scheduling, or WhatsApp delivery to GM

---

## Summary matrix

| # | Capability | Class | Demo % | Primary routes |
|---|------------|-------|--------|----------------|
| 1 | Kiosk experience | **B** | 72% | `/`, `/vehicles`, `/vehicles/gs4-max/hero`, … |
| 2 | Customer experience | **B** | 68% | Journey, convert, test-drive, whatsapp, share |
| 3 | Vehicle experience | **B** | 65% | `/hero`, `/tour/*`, `/themes/*`, `/warranty` |
| 4 | Family summary flow | **B** | 55% | `/share`, `/share/[token]` |
| 5 | Trust journey | **B** | 75% | `/trust/faq`, `/trust/story`, `/tour/trust` |
| 6 | Competitor comparison | **A** | 80% | `/compare`, `/compare/corolla-cross` |
| 7 | Vendor tablet | **D** | 5% | — |
| 8 | Lead temperature | **D** | 0% | — |
| 9 | Handoff report | **B** | 25% | `/convert`, `/whatsapp`, `POST /api/leads` |
| 10 | Manager dashboard | **D** | 0% | — |
| 11 | Executive reporting | **D** | 0% | — |

**Count:** A=1 · B=7 · C=0 · D=3

---

## Demo path vs narrative “un día en la concesionaria”

| Narrative beat | Demoable today? |
|----------------|---------------|
| Familia toca kiosco, elige primera vez con GAC | ✅ |
| Ruta de confianza + tour Carlos | ✅ |
| Comparan con Corolla Cross | ✅ |
| Ven cuota orientativa | ✅ |
| Roberto pide “hablar con asesor” → alerta en tablet Javier | ❌ |
| Javier reclama lead con handoff contextual | ❌ |
| Marcela ve tablero (4 sesiones, 0 alertas rojas) | ❌ |
| Resumen familiar por WhatsApp a Claudia | ⚠️ UI yes; ops tracking no |
| Cierre del día: métricas en tablero + reporte a dirección | ❌ |
| Venta atribuida a sesión de kiosco en CRM | ❌ |

---

## Asset and commercial blockers (affects presentation quality)

| Blocker | Impact on demo |
|---------|----------------|
| 0 of 41 manifest media files on disk (`public/assets/`) | Gradient/SVG fallbacks instead of photography/video |
| Demo mode hides exploration branches, share, financing on convert hub | Narrative “exploración libre” and family CTA not visible in default demo |
| `POST /api/leads` returns mock ID — **no persistence** | Cannot show lead appearing on tablet |
| Analytics client-only (`viaggio-analytics` event) | No proof of “la empresa aprende” |

---

## Recommended presentation stance

| Audience | Safe to demo | Do not claim |
|----------|--------------|--------------|
| Propietario / GM (kiosco) | Scripted path S01→S15 with `NEXT_PUBLIC_DEMO_MODE=true` | Tablet, tablero, reportes, temperatura de leads |
| Director comercial | Compare + financing + test drive capture | Priorización de cola, SLA 2 min, motivos de pérdida |
| Marketing | Trust + compare content | Atribución QR Instagram → venta |
| Marca importadora | Product experience, confianza GAC | KPIs mensuales atribuidos al showroom digital |

---

*Audit produced by comparing `app/`, `components/`, `lib/`, and `content/` against [`CPI_OS_EXECUTIVE_NARRATIVE_ES.md`](docs/presentations/CPI_OS_EXECUTIVE_NARRATIVE_ES.md). No features invented beyond narrative scope.*
