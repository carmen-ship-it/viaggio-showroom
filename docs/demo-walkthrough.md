# Demo Walkthrough — Viaggio Digital Showroom

**Purpose:** Guided stakeholder demo for GAC GS4 MAX at Viaggio Motors Santa Cruz  
**Viewport:** 1920×1080 landscape kiosk  
**Language:** es-BO  
**Last updated:** 14 June 2026

---

## Canonical Demo Path (kiosk mode)

```
S01 → S02 → S03 → S22 → S25 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15
                                                              └─ S36 advisor modal
```

Set `NEXT_PUBLIC_DEMO_MODE=true` — S24 trust story is skipped; FAQ goes directly to trust tour.

Overlays: **S20** idle reset · **Inicio** home pill on deep screens

---

## Pre-Demo Checklist (Operator)

1. Confirm kiosk is on attract loop (`/`) — no stale session from prior visitor.
2. If idle prompt (S20) appears, tap **Sí, continuar** or wait for reset to S01.
3. Use path **Primera vez con GAC** on S02 — not *Ya investigué online* (that shortcut goes to Sofía).
4. Follow **Continuar** / footer **next** buttons on each screen — they advance the scripted arc.
5. On S25, open **at least two** FAQ items before continuing (builds trust copy + recap chips).
6. On S06, tap **Siguiente** through all **5** Carlos trust steps.
7. On S11, Corolla Cross is pre-selected — tap **Ver comparación**.
8. On S12, scroll to the bottom summary to surface the financing CTA strip.
9. On S14, fill **Nombre** + **Teléfono** (required), then **Confirmar** — auto-advances to S15.
10. Placeholder media is expected until P0 assets are acquired — narrate the story, not the gradients.

---

## Click-by-Click Script

| Step | Screen | Route | Action | Next control |
|------|--------|-------|--------|--------------|
| 1 | **S01** Attract Loop | `/` | Touch anywhere on screen | → S02 |
| 2 | **S02** Session Welcome | `/` (overlay) | Select **Primera vez con GAC** → **Empezar experiencia** | → S03 |
| 3 | **S03** Vehicle Selector | `/vehicles` | Tap **GAC GS4 MAX** hero card | → S22 |
| 4 | **S22** Immersive Hero | `/vehicles/gs4-max/hero` | Tap **¿Es confiable?** *or* footer **¿Es confiable?** | → S25 |
| 5 | **S25** FAQ | `/vehicles/gs4-max/trust/faq` | Open ≥2 accordion items (e.g. marca china + garantía) | Footer **Historia Viaggio & GAC** → S24 |
| 6 | **S24** Trust Story | `/vehicles/gs4-max/trust/story` | Scroll both chapters (GAC global + Viaggio local) | Footer **Tour con Carlos** → S06 |
| 7 | **S06** Carlos Trust Tour | `/vehicles/gs4-max/tour/trust` | **Siguiente** ×4 (steps 1→5) | **Profundizar en ADAS** → S08 |
| 8 | **S08** ADAS Topic | `/vehicles/gs4-max/themes/safety/adas` | Scroll feature grid + stats | Footer **Comparar con Corolla Cross** → S11 |
| 9 | **S11** Compare Hub | `/vehicles/gs4-max/compare` | Corolla Cross pre-selected | **Ver comparación con Toyota Corolla Cross** → S12 |
| 10 | **S12** Compare Detail | `/vehicles/gs4-max/compare/corolla-cross` | Expand rows; note *Ellos ganan* on reventa | Footer **Cuota orientativa** → S26 |
| 11 | **S26** Financing Preview | `/vehicles/gs4-max/economics/financing` | Toggle trim + plazo (12/24/36/48) | **Dar el siguiente paso** → S13 |
| 12 | **S13** Conversion Hub | `/vehicles/gs4-max/convert` | Review recap chips | Tap **Agendá tu prueba de manejo** card → S14 |
| 13 | **S14** Test Drive Form | `/vehicles/gs4-max/test-drive` | Name, phone, optional day/slot → **Confirmar** | Auto → S15 |
| 14 | **S15** WhatsApp Handoff | `/vehicles/gs4-max/whatsapp?intent=test_drive` | Show QR + message preview | Demo complete |

---

## Route Reference (Demo Path Only)

| Screen ID | Name | Route |
|-----------|------|-------|
| S01 | Attract Loop | `/` |
| S02 | Session Welcome | `/` (phase overlay) |
| S03 | Vehicle Selector | `/vehicles` |
| S22 | Immersive Hero | `/vehicles/gs4-max/hero` |
| S25 | Objections & FAQ | `/vehicles/gs4-max/trust/faq` |
| S24 | Trust Story | `/vehicles/gs4-max/trust/story` |
| S06 | Guided Tour (Carlos) | `/vehicles/gs4-max/tour/trust` |
| S08 | Topic Deep Dive (ADAS) | `/vehicles/gs4-max/themes/safety/adas` |
| S11 | Compare Hub | `/vehicles/gs4-max/compare` |
| S12 | Compare Detail | `/vehicles/gs4-max/compare/corolla-cross` |
| S26 | Financing Preview | `/vehicles/gs4-max/economics/financing` |
| S13 | Conversion Hub | `/vehicles/gs4-max/convert` |
| S14 | Test Drive Form | `/vehicles/gs4-max/test-drive` |
| S15 | WhatsApp Handoff | `/vehicles/gs4-max/whatsapp` |

---

## Fallback Paths

Use these if the visitor diverges or a control is missed.

| Situation | Fallback |
|-----------|----------|
| Skipped S25 FAQ | From S22 tap **¿Es confiable?** or navigate to `/vehicles/gs4-max/trust/faq` |
| Skipped trust story | From S25 footer **Historia Viaggio & GAC** or `/vehicles/gs4-max/trust/story` |
| Skipped tour | From S24 footer **Tour con Carlos** or `/vehicles/gs4-max/tour/trust` |
| Skipped ADAS topic | From tour end **Profundizar en ADAS** or hot-spot **SEGURIDAD** on S22 |
| Compare blocked | Complete S24 + 1 tour step (trust ≥2) *or* visit ADAS topic first |
| Missed financing | From S12 footer **Cuota orientativa** or S13 card **Ver cuota orientativa** |
| Missed conversion hub | From S26 **Dar el siguiente paso** or `/vehicles/gs4-max/convert` |
| Test drive without S14 page | On S13 tap footer **Agendar ahora** (opens sheet modal) |
| WhatsApp without test drive | From S13 tap **Escribinos por WhatsApp** → `/vehicles/gs4-max/whatsapp` |
| Session timeout | S20 idle prompt → **Sí, continuar**; after 5 min → auto reset to S01 |
| Accessibility | Global header → Settings (S19): text size, contrast, reduce motion |
| Pre-researched visitor | S02 **Ya investigué online** → Sofía experience (non-canonical; avoid in stakeholder demo) |

---

## Demo Operator Notes

### Trust gating (demo-safe)

- **Compare (S11)** unlocks after **2+ trust signals** *or* after visiting the **ADAS** topic (S08). Following the canonical path always satisfies this — no hidden gestures required.
- **Financing / convert CTAs** on S22 remain tertiary until deeper trust; the demo path reaches S26 after compare, not from the hero.
- Do **not** lead with Sofía desire content before the trust arc — Chinese-brand skeptics bounce if desire runs first.

### Narration beats (suggested)

| Screen | One-line beat |
|--------|----------------|
| S01 | *“Sin presión — explorá el GS4 MAX a tu ritmo.”* |
| S02 | *“Vos elegís el camino; nosotros acompañamos.”* |
| S22 | *“Acá está el vehículo — datos clave abajo.”* |
| S25 | *“Las dudas normales, respondidas con honestidad.”* |
| S24 | *“Marca global + respaldo local en Santa Cruz.”* |
| S06 | *“Carlos te guía sin vender.”* |
| S08 | *“ADAS de serie — margen en el tráfico real.”* |
| S12 | *“Ellos ganan en reventa — nosotros en equipamiento y garantía.”* |
| S26 | *“Cuota orientativa — el consultor confirma la tasa.”* |
| S13 | *“Tu recorrido resumido — elegí cómo seguir.”* |
| S15 | *“Llevate el contexto al celular por WhatsApp.”* |

### Known demo limitations (non-blocking for navigation)

| Item | Status |
|------|--------|
| Hero / tour / trust media | Gradient placeholders (`PlaceholderMedia`) — 0 files in `public/assets/` |
| `dealership.json` WhatsApp | Placeholder `+59100000000` — QR works structurally, not production number |
| `dealership.json` address | Placeholder copy |
| Bank partner logo | `LogoPlaceholder` on S26 |
| Share / consultant paths on S13 | Functional routes; share is P2 polish, consultant is mock |
| S34 Test Drive Logistics | Optional detour before S14 — canonical path goes direct to S14 |

### Timing

- Full scripted path: **12–18 minutes** with narration  
- Minimum viable demo (trust + compare + convert): **8–10 minutes** skipping FAQ depth

### Reset between visitors

- **S19 → Reiniciar sesión** (confirm) → returns to welcome/attract  
- **S20** auto-reset after extended idle → S01

---

## Emotional Arc (Reference)

```
Curiosity → Relief → Excitement → Wonder → Trust → Confidence → Validation → Ownership
 S01       S02       S03          S22      S25/S24  S06/S08      S11/S12/S26  S13–S15
```

---

## Related Documents

- [Implementation Map](./implementation-map.md) — screen build map
- [Creative Direction](./creative-direction.md) — visual system + transitions
- [Asset Readiness Audit](./asset-readiness-audit.md) — media gaps
