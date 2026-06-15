# CPI-OS Presentation Gap Backlog

**Source of truth:** [`docs/presentations/CPI_OS_EXECUTIVE_NARRATIVE_ES.md`](docs/presentations/CPI_OS_EXECUTIVE_NARRATIVE_ES.md)  
**Companion:** [`PRESENTATION_READINESS_AUDIT.md`](PRESENTATION_READINESS_AUDIT.md)  
**Date:** 15 June 2026

This backlog lists **only** capabilities explicitly promised in the executive narrative that are **not fully implemented** in the current codebase. Items are grouped by narrative section. No new architecture or features are proposed beyond closing these gaps.

**Priority key**

| P | Meaning |
|---|---------|
| **P0** | Blocks the “un día en la concesionaria” story or executive demo credibility |
| **P1** | Promised in narrative but deferrable for kiosk-only demo |
| **P2** | Promised for full product; lower immediate presentation risk |

---

## P0 — Blocks the full narrative demo

### GAP-P0-01 · Tablet del vendedor (cola de operaciones)

**Narrative refs:** §4, §6, §12, §14, escenario “9:42 — Handoff humano”

**Promised**

- Cola de clientes ordenada por prioridad (frío, tibio, caliente)
- Alertas cuando alguien pide “Quiero un asesor ahora”
- Reclamar lead, unirse a sesión del kiosco, actualizar estado
- Acciones: contactado, calificado, financiamiento, prueba, venta cerrada o perdida con motivo

**Current state:** No `/staff` route, no tablet UI, no handoff API

**Gap type:** Missing UI + missing backend

---

### GAP-P0-02 · Temperatura del lead (frío / tibio / caliente)

**Narrative refs:** §6, §9, §14, §15, §20, escenario “temperatura: tibio, subiendo → caliente”

**Promised**

- Traducir comportamiento en temperatura y siguiente mejor acción
- Tarjetas con código de color en tablet
- Distribución frío/tibio/caliente en tablero gerencial
- Temporizador de espera — no dejar calientes más de 2 minutos

**Current state:** Client `trustSignals` counter only; no tier labels, no SLA timer, no queue sort

**Gap type:** Missing backend + missing UI (depends on GAP-P0-01)

---

### GAP-P0-03 · Handoff report para el vendedor

**Narrative refs:** §6, §12, §14, escenario Javier abre con contexto de comparación y cuota

**Promised**

- Resumen expandible: vehículo, temas explorados, comparación, cuota, perfil (técnico/familiar/valor), objeciones, línea sugerida de apertura

**Current state:** `SessionRecap` chips and WhatsApp message preview are customer-side only; no consultant-facing brief

**Gap type:** Missing UI + missing backend (session → lead enrichment)

---

### GAP-P0-04 · “Hablar con un asesor ahora” operativo

**Narrative refs:** §5 paso 5, §11 conversión, escenario 9:42

**Promised**

- CTA en kiosco que dispara alerta inmediata al vendedor
- Temporizador en tablet del vendedor
- Cliente puede esperar o seguir explorando

**Current state:** No S36 modal; no `consultant_handoff` wired to staff; conversion hub omits this path in demo mode

**Gap type:** Missing UI + missing backend

---

### GAP-P0-05 · Tablero del gerente (tiempo real)

**Narrative refs:** §7, §15, escenario “Marcela ve el tablero: 4 sesiones activas…”

**Promised**

- Sesiones activas en kioscos y profundidad
- Handoffs sin atender (alerta roja si superan umbral)
- Pruebas de manejo confirmadas hoy
- Vendedores disponibles u ocupados
- Reasignación de leads

**Current state:** No management dashboard route or components

**Gap type:** Missing UI + missing backend

---

### GAP-P0-06 · Reportes ejecutivos (dirección)

**Narrative refs:** §7, §16, escenario “el lunes, dirección verá el reporte semanal…”

**Promised**

- Reporte diario: visitas digitales, leads, calientes atendidos a tiempo %, ventas origen digital
- Reporte semanal: embudo completo, tiempo primer contacto, asistencia pruebas, ranking SLA, top objeciones y comparaciones
- Reporte mensual: ingresos atribuidos, CPL, mix de entrada, impacto resumen familiar, ciclo de decisión
- Reporte trimestral: evolución cierre, estacionalidad, ROI marketing, % objeciones con respuesta probada

**Current state:** No reporting surfaces; analytics events not persisted server-side

**Gap type:** Missing UI + missing backend

---

### GAP-P0-07 · Persistencia de leads y sesiones

**Narrative refs:** §4, §8, §20 (“captura automática del recorrido”), escenario cierre con atribución

**Promised**

- Sistema registra intereses y dudas automáticamente
- Cada registro CRM tiene historia, intención y lección
- Venta atribuida a sesión de kiosco

**Current state:** `POST /api/leads` returns ephemeral mock; session state is in-memory client only; `lib/crm/` is schema-only

**Gap type:** Missing backend

---

## P1 — Promised in narrative; kiosk demo can proceed without

### GAP-P1-01 · Configurador ligero

**Narrative refs:** §11 “Configurador ligero”, §13 recorrido etapa 7

**Promised**

- Selección de color y versión
- Vista del vehículo en color elegido
- Indicación de unidades disponibles en showroom

**Current state:** No `/configure-lite` route

**Gap type:** Missing UI (+ stock feed backend)

---

### GAP-P1-02 · Calculadora de costo mensual (TCO) standalone

**Narrative refs:** §11 “Economía del dueño”, §13 etapa 6

**Promised**

- Combustible con precio local, seguro orientativo, mantenimiento
- Costo mensual estimado como dueño

**Current state:** TCO preview embedded in `FinancingPreviewScreen`; no dedicated `/economics/tco` screen

**Gap type:** Missing UI (partial logic exists in financing content)

---

### GAP-P1-03 · Retoma (vehículo actual)

**Narrative refs:** §11 retoma, §5 paso 5, escenario finanzas con retoma Etios

**Promised**

- Cliente indica vehículo actual para que el asesor lo tenga en cuenta
- Captura en formulario de prueba de manejo

**Current state:** No `/economics/trade-in`; test drive form has extended fields but no dedicated retoma flow to S27

**Gap type:** Missing UI

---

### GAP-P1-04 · Continuar sesión / guardar antes de reset

**Narrative refs:** §5 paso 5, §11 usabilidad, §18 tabla etapa 1 y 12, escenario Claudia reabre enlace

**Promised**

- Guardar sesión para continuar otro día
- Enlace “Continuar mi sesión” en celular
- Oferta de guardar antes de reset por inactividad

**Current state:** `ResumePlaceholder` stub at `/resume`; `IdleManager` resets without save prompt; resume token generated for WhatsApp but resume page nonfunctional

**Gap type:** UI exists but nonfunctional + missing backend

---

### GAP-P1-05 · Resumen familiar completo en payload

**Narrative refs:** §11 conversión, escenario “foto del vehículo, tres puntos clave, comparación, cuota, garantía”

**Promised**

- WhatsApp al cónyuge con comparación con Corolla Cross y cuota orientativa vistas en kiosco

**Current state:** `share-summary.json` static template; session compare/financing not consistently merged into share payload

**Gap type:** Partial implementation — missing dynamic enrichment

---

### GAP-P1-06 · Pre-visita por QR (Instagram / parabrisas)

**Narrative refs:** §4, §5 paso 1, §12 celular del cliente, §19 marketing

**Promised**

- Escanear QR antes de llegar: vista previa, tres razones de confianza, WhatsApp
- Atribución de campaña

**Current state:** No `/visit/[slug]` or `/v/[slug]` route

**Gap type:** Missing UI + missing backend (UTM/campaign)

---

### GAP-P1-07 · Testimonios / prueba social local (S23)

**Narrative refs:** §11 ruta de confianza, §13 “tres guías” + credibilidad local

**Promised**

- Testimonios de dueños en Santa Cruz como parte de la ruta de confianza

**Current state:** No `/trust/testimonials` route

**Gap type:** Missing UI + content

---

### GAP-P1-08 · Confirmación y recordatorio de prueba por WhatsApp

**Narrative refs:** §7, §18 tabla, escenario confirmación WhatsApp 10:00

**Promised**

- Mensaje automático con dirección, qué traer, nombre del asesor
- Coordinador verifica pruebas confirmadas

**Current state:** Test drive submits to mock API only; no WhatsApp automation or coordinator view

**Gap type:** Missing backend (+ GAP-P0-05 for coordinator visibility)

---

### GAP-P1-09 · Motivos de pérdida registrados

**Narrative refs:** §6, §8, §15, §16, §18, escenario “eligió competidor — Hyundai Tucson”

**Promised**

- Cierre obligatorio con razón: precio, financiamiento, competidor, timing
- Patrones visibles en reporte de dirección

**Current state:** No consultant UI to log loss reason; no reporting

**Gap type:** Missing UI + missing backend (depends on GAP-P0-01, GAP-P0-06)

---

### GAP-P1-10 · Aprendizaje institucional acumulado

**Narrative refs:** §8, §16 reporte mensual, §20 cadena de inteligencia

**Promised**

- Objeciones frecuentes, pruebas que convencen, puntos de abandono, efectividad marketing
- Conclusiones automáticas (“esta semana, la objeción de reventa subió…”)

**Current state:** Governance types and docs exist; no aggregation or insight delivery

**Gap type:** Missing backend + missing UI

---

## P2 — Narrative promises with lower kiosk-demo risk

### GAP-P2-01 · Galería y especificaciones

**Narrative refs:** §11 exploración (galería fotos), §13

**Promised**

- Galería interior, colores, detalles
- Specs completas como escape hatch

**Current state:** `routes.gallery` and `routes.specs` defined; no pages

**Gap type:** Missing UI

---

### GAP-P2-02 · Modo presentación en tablet del consultor

**Narrative refs:** §12 “Tablet en manos del consultor (modo presentación)”

**Promised**

- Mismo contenido que kiosco, mediado por humano junto al vehículo o sala de espera

**Current state:** No presentation mode flag or consultant-led entry on S02

**Gap type:** Missing UI (depends on GAP-P0-01)

---

### GAP-P2-03 · Hub de vehículo rico (navegación por temas)

**Narrative refs:** §11 exploración libre, §13

**Promised**

- Grid de temas, fila de economía, enlaces rápidos de confianza desde hub central

**Current state:** `/vehicles/[slug]` is minimal link list, not decision-oriented hub described in screen-map

**Gap type:** Partial UI — needs enrichment to match narrative

---

### GAP-P2-04 · Brechas de stock vs interés (color / versión)

**Narrative refs:** §7 mensual, §15 tendencia

**Promised**

- Detectar brechas entre lo que el cliente busca y stock disponible

**Current state:** No inventory integration or manager view

**Gap type:** Missing backend + missing UI

---

### GAP-P2-05 · Integración CRM (complemento, no reemplazo)

**Narrative refs:** §3, §10, escenario “En el CRM va el contrato”

**Promised**

- CPI-OS alimenta al CRM con contexto; cierre comercial en CRM

**Current state:** `lib/crm/close-join.ts` for join-rate calculation only; no Zoho/sync integration

**Gap type:** Missing backend

---

### GAP-P2-06 · Media de producción (fotografía / video real)

**Narrative refs:** §11 pantalla de atracción, héroe, tours, contexto boliviano

**Promised**

- Video en bucle GS4 MAX en calles de Santa Cruz
- Imágenes reales del vehículo

**Current state:** 0/41 manifest assets on disk; fallback gradients/SVG

**Gap type:** Content/assets (not code) — affects presentation quality, not route coverage

---

## Backlog summary

| Priority | Items | Theme |
|----------|-------|-------|
| **P0** | 7 | Operations layer: tablet, temperatura, handoff, gerencia, reportes, persistencia |
| **P1** | 10 | Customer completion: configurator, TCO, retoma, resume, share enrichment, QR pre-visita, testimonios, WhatsApp ops, pérdidas, aprendizaje |
| **P2** | 6 | Polish + CRM + assets + hub richness |

**Total gaps:** 23 (all traced to explicit narrative promises)

---

## Suggested closure order for presentation credibility

Aligns with narrative story arc, not new architecture:

1. **GAP-P0-07** — Persist sessions and leads (foundation for everything ops)
2. **GAP-P0-01 + GAP-P0-02 + GAP-P0-03 + GAP-P0-04** — Vendor tablet with temperature and handoff (enables “9:42” scene)
3. **GAP-P0-05 + GAP-P0-06** — Manager dashboard and executive reports (enables “cierre del día” and “lunes dirección” scenes)
4. **GAP-P1-04 + GAP-P1-05** — Resume + family share enrichment (enables familia Ríos epilogue)
5. **GAP-P1-01 + GAP-P1-02 + GAP-P1-03** — Configurator, TCO, retoma (completes §11 economics)
6. **GAP-P2-06** — Asset drop (visual credibility for owner walkthrough)

---

## Out of scope for this backlog

The following are **not** listed because they are **not** explicit product promises in `CPI_OS_EXECUTIVE_NARRATIVE_ES.md`:

- Conversational sales brain / PCM
- LATAM federation
- Governance gate certification UI
- MKIE shock classifier
- Investor diligence frameworks
- Any net-new capability not described in the narrative document

---

*Backlog derived solely from [`CPI_OS_EXECUTIVE_NARRATIVE_ES.md`](docs/presentations/CPI_OS_EXECUTIVE_NARRATIVE_ES.md). Implementation status verified against current `app/` routes and `components/` screens.*
