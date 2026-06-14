# Executive Screenshot Review — GAC GS4 MAX Demo Path

**Captured:** 14 June 2026  
**Viewport:** 1920×1080 landscape (kiosk)  
**Locale:** es-BO  
**Build:** Production (`npm run build` → `npm start`)  
**Capture script:** `scripts/capture-executive-screenshots.mjs`

Ten screens from the canonical executive demo arc (subset of S01 → S15). Screenshots live in this folder as PNG files.

---

## Capture Index

| Screen | Name | Route | File | Size |
|--------|------|-------|------|------|
| **S01** | Attract Loop | `/` | [S01-attract-loop.png](./S01-attract-loop.png) | 54 KB |
| **S03** | Vehicle Selector | `/vehicles` | [S03-vehicle-selector.png](./S03-vehicle-selector.png) | 512 KB |
| **S22** | Immersive Hero | `/vehicles/gs4-max/hero` | [S22-immersive-hero.png](./S22-immersive-hero.png) | 1.2 MB |
| **S24** | Trust Story | `/vehicles/gs4-max/trust/story` | [S24-trust-story.png](./S24-trust-story.png) | 87 KB |
| **S06** | Carlos Trust Tour (step 1) | `/vehicles/gs4-max/tour/trust` | [S06-carlos-trust-tour.png](./S06-carlos-trust-tour.png) | 796 KB |
| **S08** | ADAS Topic | `/vehicles/gs4-max/themes/safety/adas` | [S08-adas-topic.png](./S08-adas-topic.png) | 84 KB |
| **S12** | Compare Detail | `/vehicles/gs4-max/compare/corolla-cross` | [S12-compare-detail.png](./S12-compare-detail.png) | 136 KB |
| **S26** | Financing Preview | `/vehicles/gs4-max/economics/financing` | [S26-financing-preview.png](./S26-financing-preview.png) | 149 KB |
| **S13** | Conversion Hub | `/vehicles/gs4-max/convert` | [S13-conversion-hub.png](./S13-conversion-hub.png) | 222 KB |
| **S15** | WhatsApp Handoff | `/vehicles/gs4-max/whatsapp?intent=test_drive` | [S15-whatsapp-handoff.png](./S15-whatsapp-handoff.png) | 148 KB |

> **Note:** S12 is captured scrolled to the summary footer (financing CTA visible), matching the operator script in `docs/demo-walkthrough.md`.

---

## Screen-by-Screen Review

### S01 — Attract Loop
- **First impression:** Dark cinematic entry; tagline *“Conocé el GAC GS4 MAX a tu ritmo”* with *Tocá para empezar* CTA.
- **Media:** No attract-loop video visible in still; ambient hero is minimal (dark field). Narrate motion on-site.
- **Chrome:** Global header (GAC Motor Bolivia / Viaggio Motors) + Ajustes pill present.
- **Exec readiness:** Layout and typography are polished; photography/video still the main gap.

### S03 — Vehicle Selector
- **First impression:** Strong split layout — GS4 MAX hero card (Disponible ahora) + coming-soon sidebar.
- **Media:** GS4 MAX and sidebar cards show exterior photography; key stats strip (177 HP, 8 airbags, $us 42.900, garantía) reads clearly.
- **Exec readiness:** Selector UX is demo-ready; coming-soon models reuse similar imagery until per-model assets land.

### S22 — Immersive Hero
- **First impression:** Full-bleed Ken Burns hero with hotspot markers (Motor turbo, Seguridad ADAS, Tecnología, Espacio familiar).
- **Media:** Real exterior hero photography; stat strip and footer trust CTAs visible.
- **Exec readiness:** Strongest visual on the path — suitable as the “product reveal” slide in a deck.

### S24 — Trust Story (Chapter 1)
- **First impression:** *GAC en el mundo* chapter with Carlos narration card and stat callouts (3ª gen, 5★ C-NCAP, 8 airbags).
- **Media:** Text-led; trust video chapters not visible in this still (poster/fallback).
- **Exec readiness:** Copy and layout exec-quality; cinematic video chapters still placeholder.

### S06 — Carlos Trust Tour (Paso 1 de 5)
- **First impression:** Tour chrome (Carlos · Mecánico Maestro), step progress, frosted narration overlay on exterior photo.
- **Media:** Step 1 (*Motor y rendimiento*) uses real front-3/4 photography.
- **Exec readiness:** Guided-tour UX complete; remaining steps use similar placeholder/synthetic media until full asset drop.

### S08 — ADAS Topic
- **First impression:** Topic deep-dive header (*Asistencias al conductor*) with Carlos expert callout on ADAS de serie.
- **Media:** Dark text-first layout; dashboard/lifestyle hero not prominent in viewport.
- **Exec readiness:** Content credible for objection handling; add `dashboard.webp` for visual punch.

### S12 — Compare Detail (Corolla Cross)
- **First impression:** Honest comparison tables (Precio, Consumo, Reventa) with *Empate* / *Ellos ganan* verdict pills.
- **Media:** Table-first capture (scrolled to summary); Sofía callout and vehicle thumbnails above fold in live demo.
- **Exec readiness:** Comparison logic and copy are stakeholder-ready; competitor thumbnail still synthetic.

### S26 — Financing Preview
- **First impression:** Calculator with trim toggle (4x2 / AWD), plazo chips, and *Bs 1.680 – Bs 1.820* reference band.
- **Media:** Bank partner card uses gradient placeholder; disclaimer banner prominent.
- **Exec readiness:** Functional and legally cautious (*cuota referencial*); bank logo SVG still needed.

### S13 — Conversion Hub
- **First impression:** Session recap (*¿Cómo querés dar el siguiente paso?*) with action cards (financing, test drive, WhatsApp, share).
- **Media:** Faint hero silhouette in background; recap chips summarize trust journey.
- **Exec readiness:** Conversion routing complete; hero recap would improve with `hero-01.webp`.

### S15 — WhatsApp Handoff
- **First impression:** Dual QR layout (*WhatsApp · Viaggio Motors* + *Reanudar sesión*) with prefilled message preview.
- **Media:** Generated QR codes; no vehicle photography (by design).
- **Exec readiness:** Handoff UX complete; replace placeholder WhatsApp number before live kiosk (`+59100000000` in content).

---

## Cross-Cutting Observations

| Dimension | Assessment |
|-----------|------------|
| **Layout & motion shell** | Consistent cinematic dark theme; screen IDs visible in chrome where applicable |
| **Typography & es-BO copy** | Executive-quality; trust-first tone throughout |
| **Photography** | Hero, selector, and tour step 1 show real GS4 MAX stills; attract loop and trust video chapters lag |
| **Commercial placeholders** | Bank logo, competitor compare thumb, dealership phone/address still synthetic |
| **Navigation depth** | S13/S15/S26 show full GlobalHeader nav — expected on conversion/economics screens |

---

## Recommended Narration (Stakeholder Deck)

| Screen | One-liner |
|--------|-----------|
| S01 | *“El kiosk invita sin presión — tocá cuando quieras empezar.”* |
| S03 | *“Elegí el GS4 MAX — el único disponible hoy en Santa Cruz.”* |
| S22 | *“Acá está el vehículo — datos clave y puntos de interés en un solo vistazo.”* |
| S24 | *“Marca global con presencia verificable — no es un experimento local.”* |
| S06 | *“Carlos, nuestro mecánico maestro, te guía paso a paso.”* |
| S08 | *“ADAS de serie — margen extra en el tráfico cruceño.”* |
| S12 | *“Comparación honesta — reconocemos dónde Toyota sigue fuerte.”* |
| S26 | *“Cuota orientativa — el consultor confirma la tasa real.”* |
| S13 | *“Tu recorrido resumido — elegí cómo seguir.”* |
| S15 | *“Llevate el contexto al celular por WhatsApp.”* |

---

## Regenerating Screenshots

```bash
npm run build
npm start -- -p 3010
node scripts/capture-executive-screenshots.mjs http://localhost:3010
```

Use a **production** server for accurate renders. Turbopack dev mode can return `PageNotFoundError` on some dynamic routes during first compile.

---

## Related Docs

- Demo path script: [`docs/demo-walkthrough.md`](../docs/demo-walkthrough.md)
- Readiness scores: [`DEMO_READINESS_REPORT.md`](../DEMO_READINESS_REPORT.md)
- Asset drop checklist: [`DEMO_ASSET_STATUS.md`](../DEMO_ASSET_STATUS.md)
