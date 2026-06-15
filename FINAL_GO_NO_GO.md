# CPI-OS — Go / No-Go Final (Entrega WhatsApp)

**Fecha:** 15 de junio de 2026  
**Escenario:** Destinatario solo · sin presentador · paquete por WhatsApp (mensaje + PDF + link)  
**Alcance:** Solo readiness de entrega — sin nuevas features ni backlog

---

## Resumen ejecutivo

| Dimensión | % | Estado |
|-----------|--:|--------|
| **Product readiness** | **72%** | Demo kiosco + ops runnable en demo mode |
| **Presentation readiness** | **68%** | Deck especificado + PNGs listos; PDF no exportado |
| **WhatsApp readiness** | **82%** | Copy final listo; falta URL estable + PDF adjunto |

### Recomendación

## **GO WITH CAVEATS**

Enviar esta noche **si** se completan 4 gates de pre-envío (abajo). No enviar link demo sin PDF y sin instrucción “tocá para empezar”.

---

## Product readiness — 72%

**Qué está listo**

| Área | Evidencia | % área |
|------|-----------|--------|
| Recorrido kiosco guiado | `demoPathRoutes` S01→S15 con polish activo | 85% |
| Comparación honesta (S12) | “Nosotros ganamos / Ellos ganan” — diferenciador real | 86% |
| Conversión + handoff (S13/S36) | Modal asesor + brief demo | 78% |
| Ops UI (`/staff`, `/manager`, `/executive`) | Presentación visual premium | 58–70% |
| Build | 69+ rutas estáticas; demo mode configurado | ✅ |

**Qué limita el score**

| Riesgo | Impacto en viewer solo |
|--------|------------------------|
| TouchNav invisible sin guía escrita | Puede perderse después de S03 |
| S24 en path canónico requiere scroll | Sensación “sitio web”, no kiosk |
| Handoff solo mismo navegador | `/staff` en celular no refleja kiosco en desktop |
| Datos ops son simulación | Credibilidad si se presenta como “en vivo” |
| Media sintética (gradientes/SVG) | Premium en UI, no en fotografía real |
| Idle reset ~5 min | Sesión se borra si el ejecutivo pausa |

**Product readiness por modo de uso**

| Modo | % |
|------|--:|
| Recorrido guiado (mensaje + PDF + TouchNav) | **85%** |
| Link demo sin guía | **55%** |
| “Ya está en producción en el piso” | **42%** |

---

## Presentation readiness — 68%

**Qué está listo**

| Entregable | Estado |
|------------|--------|
| Texto 10 slides | ✅ [`docs/presentations/CPI_OS_EXECUTIVE_DECK_ES.md`](docs/presentations/CPI_OS_EXECUTIVE_DECK_ES.md) |
| PNGs kiosco + ops (17) | ✅ `docs/screenshots/executive-demo-polish/after/` |
| PNGs handoff (4) | ✅ `docs/screenshots/s36-handoff/` |
| Mensaje WhatsApp | ✅ [`FINAL_EXECUTIVE_PACKAGE_ES.md`](FINAL_EXECUTIVE_PACKAGE_ES.md) |
| Checklist capturas | ✅ [`FINAL_SCREENSHOT_CHECKLIST.md`](FINAL_SCREENSHOT_CHECKLIST.md) |

**Qué falta**

| Gap | Impacto | Tiempo estimado |
|-----|---------|-----------------|
| PDF/PPTX exportado | **Bloqueante** para envío completo | 2–3 h maquetación |
| QR en slide 10 | Facilita apertura móvil | 15 min |
| Etiqueta “simulación ilustrativa” en slides ops | Evita malentendido | 10 min |
| Capturas regeneradas contra URL Vercel final | Consistencia deploy | 30 min |

**Presentation readiness por componente**

| Componente | % |
|------------|--:|
| Copy + narrativa | 95% |
| Assets visuales on-disk | 90% |
| PDF maquetado exportado | 0% |
| Coherencia producto ↔ deck | 82% |

---

## WhatsApp readiness — 82%

**Qué está listo**

- Mensaje final en español (completo + variante corta)
- Orden de envío: texto → PDF → link
- Rutas complementarias documentadas (`/staff`, `/executive`)
- Highlight tour de 5 min para viewer solo
- Framing “lo que es posible” — sin promesas de CRM en vivo

**Qué falta**

| Gate | Bloqueante |
|------|------------|
| URL Vercel con `NEXT_PUBLIC_DEMO_MODE=true` | Sí |
| URL probada en móvil (tap S01) | Sí |
| PDF adjunto &lt; 15 MB | Sí |
| Nombre destinatario personalizado | Recomendado |

**WhatsApp readiness sub-scores**

| Sub-área | % |
|----------|--:|
| Copy del mensaje | 95% |
| Secuencia de adjuntos | 90% |
| Link demo operativo | *pendiente deploy* |
| Autonomía del destinatario | 75% |

---

## Riesgos restantes

### Críticos (mitigar antes de enviar)

| # | Riesgo | Mitigación |
|---|--------|------------|
| 1 | Ejecutivo no toca S01 — cree que es video | Mensaje + slide 10: **“Tocá para empezar”** |
| 2 | PDF no adjunto — link solo | No enviar link sin PDF |
| 3 | Demo sin `DEMO_MODE` — chrome de desarrollo visible | Verificar variable en build Vercel |
| 4 | Ops presentados como datos reales | Pie “Vista ilustrativa” en slides 8–9 |

### Moderados (aceptables con caveats)

| # | Riesgo | Nota |
|---|--------|------|
| 5 | Explorador entra a S24 o abandona en S06 | Mensaje prescribe highlight tour corto |
| 6 | Handoff cross-device no funciona | No prometer sincronización kiosco↔celular |
| 7 | Nombre “Roberto Mendoza” pre-cargado en formulario | Framing: ejemplo ilustrativo |
| 8 | Claims compare/FAQ vs matriz de verdad | Riesgo legal si el ejecutivo es técnico — deck evita specs detallados |

### Bajos (no bloquean envío)

| # | Riesgo | Nota |
|---|--------|------|
| 9 | Sin trailer de video | No prometido en paquete WhatsApp |
| 10 | S21/S23/S37 ausentes | No linkear en mensaje |
| 11 | Media placeholder vs fotos reales | UI premium compensa parcialmente |

---

## Gates de pre-envío (obligatorios)

- [ ] Deploy Vercel con `NEXT_PUBLIC_DEMO_MODE=true`
- [ ] URL copiada en mensaje + slide 10 + QR
- [ ] Tap S01 → S02 verificado en móvil
- [ ] PDF exportado: `CPI-OS-Executive-ES.pdf` (10 slides, 16:9)
- [ ] WhatsApp: mensaje → PDF → link (en ese orden)
- [ ] Slides ops etiquetadas como simulación
- [ ] No incluir links a `/resume`, `/share`, rutas incompletas

**Si falla cualquier gate marcado:** bajar recomendación a **NO GO** hasta resolver.

---

## Matriz de decisión

| Pregunta | Respuesta |
|----------|-----------|
| ¿El producto demuestra valor sin presentador? | **Sí**, con guía escrita (PDF + mensaje) |
| ¿El PDF puede enviarse tal cual desde repo? | **No** — requiere export 2–3 h |
| ¿Los screenshots cubren el deck? | **Sí** — 21 PNGs on-disk |
| ¿El link solo basta? | **No** — 55% readiness unguided |
| ¿Enviar esta noche? | **Sí con caveats** — PDF + URL + mensaje guiado |

---

## Veredicto final

### **GO WITH CAVEATS**

**Enviar esta noche cuando:**

1. PDF maquetado y adjunto probado en WhatsApp  
2. URL demo estable con demo mode activo  
3. Mensaje incluye instrucción de primer tap y highlight tour  
4. Expectativa clara: *demo ilustrativa*, no producción en piso  

**NO GO si:**

- Solo hay link demo sin PDF ni instrucciones  
- Build sin demo mode (dev labels visibles)  
- URL no probada en móvil  
- Mensaje implica CRM en vivo o datos reales de operaciones  

---

## Referencias de auditoría

| Documento | Uso |
|-----------|-----|
| [`docs/presentations/CPI_OS_FINAL_EXECUTIVE_DEMO_AUDIT.md`](docs/presentations/CPI_OS_FINAL_EXECUTIVE_DEMO_AUDIT.md) | Scorecard pantallas + path ejecutivo |
| [`docs/presentations/CPI_OS_PRESENTATION_READINESS_REPORT.md`](docs/presentations/CPI_OS_PRESENTATION_READINESS_REPORT.md) | Readiness por dimensión |
| [`docs/presentations/ASYNC_PRESENTATION_READINESS_REPORT.md`](docs/presentations/ASYNC_PRESENTATION_READINESS_REPORT.md) | Modelo async sin presentador |
| [`FINAL_EXECUTIVE_PACKAGE_ES.md`](FINAL_EXECUTIVE_PACKAGE_ES.md) | Paquete de envío |
| [`FINAL_SCREENSHOT_CHECKLIST.md`](FINAL_SCREENSHOT_CHECKLIST.md) | Capturas del deck |

---

*Evaluación de entrega únicamente. Sin nuevas features. Sin ítems de backlog.*
