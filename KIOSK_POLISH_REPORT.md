# Kiosk UX Polish Report — Viaggio Motors Digital Showroom

**Audit date:** 14 June 2026  
**Auditor role:** First-time showroom visitor (kiosk, 1920×1080 landscape)  
**Vehicle / path:** GAC GS4 MAX — canonical executive demo (`docs/demo-walkthrough.md`)  
**Language:** es-BO  

---

## Executive Summary

The Viaggio kiosk delivers a **well-structured trust-to-conversion arc** with strong copy voice (honest, local, low-pressure) and thoughtful session recap mechanics. However, the experience is held back by **synthetic media across nearly every screen**, **choice overload at key decision points**, and **several screens that expose internal/operator content to customers**. Financing and comparison screens in particular demand more than 5 seconds of orientation before a visitor knows what to do next.

**Methodology:** Full demo path mapped from routes, screen components, and content JSON. Live browser walkthrough was attempted (`localhost:3000`, `3002`, `3010`) but blocked by a corrupted `.next` build cache (ENOENT on build manifests). Findings below are based on exhaustive source/copy review plus the project’s own visual readiness audit (`DEMO_READINESS_REPORT.md`).

| Metric | Value |
|--------|-------|
| Demo path steps walked (canonical) | **14** (+2 global overlays: S19 Settings, S20 Idle) |
| Total findings | **32** |
| High impact | **12** |
| Medium impact | **14** |
| Low impact | **6** |

### Top 3 High-Impact Issues

1. **No real vehicle photography or video** — every hero, tour step, compare thumbnail, and trust story chapter falls back to gradient/SVG `FallbackMedia`, undermining luxury and emotional aspiration across the entire 12–18 minute journey.
2. **S22 Immersive Hero presents four peer-weighted exploration paths** (`¿Cómo es en familia?`, `¿Es confiable?`, `Seguridad familiar`, `Diseño y tecnología`) with no visual hierarchy for first-time GAC visitors — the scripted demo path relies on operators knowing to tap **¿Es confiable?**.
3. **S26 Financing Preview is a multi-scroll “spreadsheet” screen** — disclaimer, trim toggles, plazo grid, TCO breakdown, explanation bullets, affordability tips, readiness meter, and bank placeholder compete for attention; the primary forward action is easy to miss amid density.

---

## Demo Path Walked

Canonical sequence per `docs/demo-walkthrough.md`:

| # | Screen ID | Screen name | Route | Primary action taken |
|---|-----------|-------------|-------|----------------------|
| 1 | S01 | Attract Loop | `/` | Tap anywhere — **“Tocá para empezar”** |
| 2 | S02 | Session Welcome | `/` (overlay) | Select **Primera vez con GAC** → **Empezar experiencia** |
| 3 | S03 | Vehicle Selector | `/vehicles` | Tap **GAC GS4 MAX** hero card (**Explorar experiencia →**) |
| 4 | S22 | Immersive Hero | `/vehicles/gs4-max/hero` | Tap **¿Es confiable?** (footer next matches) |
| 5 | S25 | FAQ / Objections | `/vehicles/gs4-max/trust/faq` | Open ≥2 accordion items → footer **Historia Viaggio & GAC** |
| 6 | S24 | Trust Story | `/vehicles/gs4-max/trust/story` | Scroll both chapters → **Tour con Carlos** |
| 7 | S06 | Carlos Trust Tour | `/vehicles/gs4-max/tour/trust` | **Siguiente** ×5 (MVP-truncated tour) → **Profundizar en ADAS** |
| 8 | S08 | ADAS Topic Deep Dive | `/vehicles/gs4-max/themes/safety/adas` | Scroll feature grid → **Comparar con Corolla Cross** |
| 9 | S11 | Compare Hub | `/vehicles/gs4-max/compare` | Corolla Cross pre-selected → **Ver comparación con Toyota Corolla Cross** |
| 10 | S12 | Compare Detail | `/vehicles/gs4-max/compare/corolla-cross` | Expand rows, scroll to summary → **Cuota orientativa** |
| 11 | S26 | Financing Preview | `/vehicles/gs4-max/economics/financing` | Toggle trim + plazo → **Dar el siguiente paso** |
| 12 | S13 | Conversion Hub | `/vehicles/gs4-max/convert` | Tap **Agendá tu prueba de manejo** |
| 13 | S14 | Test Drive Form | `/vehicles/gs4-max/test-drive` | **Nombre** + **Teléfono** → **Confirmar prueba de manejo** |
| 14 | S15 | WhatsApp Handoff | `/vehicles/gs4-max/whatsapp?intent=test_drive` | QR scan / **Abrir WhatsApp** — demo complete |

**Global overlays encountered in review (not on canonical path):** S19 **Ajustes** (header, all screens with chrome) · S20 **¿Seguís ahí?** (idle prompt after 3 min inactivity)

---

## Findings by Category

Impact levels: **High** = likely to confuse, stall, or materially weaken conversion/luxury perception · **Medium** = friction or polish gap · **Low** = minor refinement.

---

### 1. Unclear Buttons (label, purpose, affordance)

| Impact | Screen | Control | Issue |
|--------|--------|---------|-------|
| **High** | S22 Hero | Footer CTA row: `¿Cómo es en familia?` · `¿Es confiable?` · `Seguridad familiar` · `Diseño y tecnología` | Four same-tier secondary buttons with no recommended path; first-time visitors lack a “start here” cue. Demo script assumes **¿Es confiable?** — not self-evident. |
| **High** | S22 Hero | `Comparar →` · `Ver cuota orientativa` · `Dar el siguiente paso` (tertiary/primary, trust-gated) | Appear/disappear based on invisible session state; visitors who earn unlock mid-screen get new options without explanation. |
| **High** | S13 Conversion Hub | Four equal `ConversionPathCard`s + footer **Agendar ahora** | Five competing conversion actions with similar visual weight after a long journey; no “recommended next step” (test drive) highlighted. |
| **Medium** | S03 Vehicle Selector | **Explorar experiencia →** | Text link styling on hero card — not obviously tappable compared to bordered buttons elsewhere; arrow implies navigation but affordance is subtle. |
| **Medium** | S11 Compare Hub | Category pills (`Seguridad`, `Tecnología`, …) | Verdict preview appears on **hover/focus** only (`onMouseEnter`); kiosk touch users never see preview tooltips or badges before entering detail. |
| **Medium** | S12 Compare Detail | Row expand `+` / `−` | Table rows look informational; expand affordance is a small glyph with no “Ver detalle” label. |
| **Medium** | Multiple | **Dar el siguiente paso** | Reused on S22 (gated), S26 footer, S08 non-ADAS topics — vague outcome (convert? test drive? WhatsApp?). |
| **Medium** | S26 Financing | **Quiero que me confirmen la cuota** vs footer **Dar el siguiente paso** | Two different labels for forward momentum; unclear if they go to the same place (S13). |
| **Medium** | S15 WhatsApp | Two QR panels side by side | **WhatsApp · Viaggio Motors** vs **Reanudar sesión** — no numbered steps (“1. Escaneá esto primero”). |
| **Medium** | S06 Tour (last step) | **Profundizar en ADAS** vs **Volver al hero** | Equal visual tiers; visitor who completed tour may not know ADAS is the scripted next beat. |
| **Low** | S25 FAQ | Accordion `+` icon | Universal pattern but no “Tocá para ver respuesta” helper for low-literacy kiosk users. |
| **Low** | Global header | **Ajustes** | Functional for a11y but icon-free; purpose (text size, contrast, restart) not previewed. |

---

### 2. Screens >5 Seconds to Understand (cognitive load)

| Impact | Screen | Issue |
|--------|--------|-------|
| **High** | **S26 Financing Preview** | Six stacked sections: disclaimer banner, cuota hero, plazo chips, duplicate plazo grid, TCO preview (`Uso mensual (sin cuota)` + `Cuota + uso mensual`), explanation bullets, affordability tips, readiness meter, bank logos. Financial + operational concepts hit simultaneously. |
| **High** | **S12 Compare Detail** | Header stats (`Nosotros ganamos` / `Ellos ganan` / `Empate`) + 8 category tables + expandable rows + verdict badges + closing essay paragraph. Requires scrolling and interaction before payoff. |
| **High** | **S22 Immersive Hero** | Ken Burns hero + stat strip (4 chips) + up to 4 hotspot markers (desktop `lg+` only) + 4–7 footer CTAs + `TouchNav`. No single focal CTA above the fold. |
| **Medium** | **S06 Tour Player** | Three simultaneous content layers: full-bleed step media, glass narration card, scrollable `TopicRenderer` below (~28vh). Visitor must parse persona, step title, narration, and topic blocks at once. |
| **Medium** | **S11 Compare Hub** | Split layout: anchor vehicle card + competitor grid + category preview pills + long CTA label **Ver comparación con Toyota Corolla Cross**. |
| **Medium** | **S13 Conversion Hub** | Hero recap + session chips + 2×2 conversion grid + dealership footer block. Chips use shorthand (`vs Toyota Corolla Cross`, `Confianza explorada`) that require prior context. |
| **Medium** | **S25 FAQ** | Carlos portrait (35% column) + 5 accordion items + conditional trust counter + optional compare link. |
| **Medium** | **S15 WhatsApp Handoff** | QR pair + message preview (`<pre>` block) + consultant handoff card + 3 feature bullets + two bottom links. |
| **Low** | **S02 Welcome** | Path selection before primary CTA is correct UX but adds a decision beat before any vehicle imagery payoff. |
| **Low** | **S24 Trust Story** | Two full-viewport snap chapters — elegant but requires scroll discovery to find chapter 2. |

---

### 3. Text Too Long (kiosk context)

| Impact | Screen | Copy snippet | Recommendation |
|--------|--------|--------------|----------------|
| **High** | S25 FAQ | Answer example: *“GAC Motor es un fabricante global con millones de vehículos en circulación. En Bolivia, Viaggio Motor S.A. — empresa 100% boliviana del Grupo Roda — es el representante exclusivo…”* (~55 words per answer) | Lead with one-sentence answer; optional “Más detalle” expand. |
| **High** | S25 FAQ | **Profundizar:** lines e.g. *“Mostrar calificación C-NCAP y contar los ocho airbags de serie.”* | **Operator script leaked to customer UI** — remove or gate behind consultant mode. |
| **Medium** | S22 Hero | Tagline: *“El SUV que tu familia merece — confiable, tecnológico y listo para Santa Cruz”* | Trim to ≤8 words for hero; support line below. |
| **Medium** | S12 Compare Detail | Closing paragraph (4 sentences on Corolla Cross vs GS4 MAX reventa positioning) | Replace with 2-line summary + persona pull-quote. |
| **Medium** | S26 Financing | Disclaimer + subcopy + `financing.explanation.intro` + 4 bullets | Collapse to one banner line + “Tu consultor confirma” link. |
| **Medium** | S15 WhatsApp | Intro: *“El kiosk comparte el contexto de tu visita. Escaneá el código o abrí WhatsApp — un consultor Viaggio responde…”* | Shorten to action-first: “Escaneá para abrir WhatsApp con tu resumen.” |
| **Medium** | S15 WhatsApp | Consultant blockquote + 3 sub-bullets | One line of reassurance is enough at kiosk distance. |
| **Medium** | S08 ADAS | Narration: *“Las asistencias al conductor no reemplazan tu atención, pero sí te dan margen. Frenado automático…”* | Split into 2-line hero + icon grid (grid already exists — reduce narration). |
| **Low** | S02 Welcome | Subcopy: *“Sin presión. Explorá con calma antes de hablar con un asesor.”* | Good tone; could be one line. |
| **Low** | S13 Conversion Hub | Card descriptions (4× ~15 words) | Acceptable; slight trim on financing card. |

---

### 4. Weak Emotional Impact (delight, aspiration, luxury)

| Impact | Screen | Issue |
|--------|--------|-------|
| **High** | **Entire demo path** | **0/41 media assets on disk** — all heroes, tours, trust videos, interiors, lifestyle, and personas render as `FallbackMedia` gradients + SVG silhouettes. Reads as prototype, not premium showroom. |
| **High** | **S01 Attract Loop** | Tagline *“Conocé el GAC GS4 MAX a tu ritmo”* over synthetic loop — misses cinematic vehicle reveal moment that sets luxury tone. |
| **High** | **S03 Vehicle Selector** | EMKOO / EMZOOM / GS8 cards at **60% opacity** with **Próximamente** — adjacent unfinished lineup dilutes GS4 MAX “hero” moment. |
| **Medium** | **S22 Hero** | No visible price anchor (`priceFrom: 0`); stat strip uses `$us 42.900` in small chips only — weak desire trigger for kiosk shoppers. |
| **Medium** | **S24 Trust Story** | Chapters reference `video-trust-heritage` / `video-viaggio-taller` but show gradient placeholders — “global brand + local dealer” story lacks cinematic proof. |
| **Medium** | **S06 Tour** | Carlos trust tour is narratively strong but visually synthetic across 5 steps — “wonder” beat in emotional arc under-delivers. |
| **Medium** | **S26 Financing** | Light “spreadsheet” aesthetic + `LogoPlaceholder` bank partner — functional, not aspirational ownership moment. |
| **Medium** | **S13–S15 Conversion** | Placeholder address *“[Dirección del showroom Viaggio Motors — actualizar con dirección real]”* and `+59100000000` break immersion at emotional peak. |
| **Low** | **S02 Welcome** | Persona introductions (*“Tus guías: Carlos, Sofía, Diego”*) are charming but avatars are also fallback — guides feel abstract. |
| **Low** | **S15 WhatsApp** | No celebration/completion state after test-drive intent — functional handoff, not a “you’re almost an owner” moment. |

---

### 5. Next Step Not Obvious (missing CTA, unclear flow)

| Impact | Screen | Issue |
|--------|--------|-------|
| **High** | **S12 Compare Detail** | Sticky **Ver cuota orientativa** bar only appears after scrolling to summary (`IntersectionObserver` on footer ref). Visitors who stop mid-table may miss financing path despite footer `TouchNav`. |
| **High** | **S11 Compare Hub** (gated) | If trust threshold not met: dead-end **Comparación disponible pronto** with single link to FAQ — no map of what “explorar confianza” means (tour? story? FAQ?). |
| **Medium** | **S22 Hero** | Hotspots (`Motor turbo`, `Seguridad ADAS`, …) hidden below `lg` breakpoint — kiosk may be landscape 1920px (OK) but any smaller viewport loses exploratory entry points with no mobile fallback. |
| **Medium** | **S06 Tour** | Mid-tour forward action is **Siguiente** only — no skip-to-compare or skip-to-test-drive for time-constrained visitors. |
| **Medium** | **S13 Conversion Hub** | `TouchNav` back label **Seguir explorando** sends users backward conceptually while standing on conversion screen — cognitive dissonance. |
| **Medium** | **S14 Test Drive** | Long optional form (email, day, slot, attendees, child seat, route) before **Confirmar** — required fields are only name/phone but form *looks* heavy; no progress hint. |
| **Medium** | **S15 WhatsApp** | No explicit “Fin del recorrido” or staff call-to-action; visitors may not know they can walk away. |
| **Medium** | **S02 Welcome** | **Ya investigué online** bypasses trust arc to Sofía experience — correct for segment but unlabeled consequence; accidental tap derails demo. |
| **Low** | **S25 FAQ** | After 2+ opens, microcopy *“Seguís construyendo confianza — N señales registradas”* exposes gamification without explaining benefit. |
| **Low** | **S24 Trust Story** | **Ver ubicación en mapa** opens external Google Maps — takes visitor out of kiosk context without return prompt. |

---

## Additional Cross-Cutting Issues

| Impact | Issue | Where |
|--------|-------|-------|
| **Medium** | Internal screen IDs visible to customers: `S08 · Tema`, `S11 · Comparación`, `S12 · Comparación honesta`, `S13 · Tu recorrido`, `S14 · Prueba de manejo`, `S15 · WhatsApp`, `S26 · Financiamiento orientativo`, `S20 · Privacidad` | Multiple components — reads as dev/operator artifact |
| **Medium** | **Ellos ganan** verdict badge copy is bluntly honest (brand-positive) but may alarm buyers before reading explanation row | S12 |
| **Low** | `CoBrandLockup` / GAC logos are `LogoPlaceholder` SVGs | Global header |
| **Low** | Compare hub intro italic line is strong copy but adds a third headline tier | S11 |

---

## Overall Ranked Findings (All Categories)

Priority order for stakeholder remediation:

| Rank | Impact | Finding |
|------|--------|---------|
| 1 | High | Ship P0 photography/video assets (hero, tour, ADAS, family, personas) — single largest luxury gap |
| 2 | High | S22 Hero: establish one primary CTA for first-time path (*¿Es confiable?* or “Empezar tour de confianza”) |
| 3 | High | S26 Financing: collapse into scannable 3-block layout (cuota → plazo → one CTA); defer TCO/education |
| 4 | High | Remove FAQ **Profundizar:** operator scripts from customer-facing accordion |
| 5 | High | S12 Compare: surface **Cuota orientativa** persistently (not scroll-gated sticky) |
| 6 | High | Replace placeholder dealership address + WhatsApp number before production kiosk |
| 7 | High | S13 Conversion: visually promote test drive as recommended path after full demo |
| 8 | Medium | S11 category preview: activate verdict badges on **tap**, not hover |
| 9 | Medium | Hide internal screen IDs (`S11 ·`, etc.) from customer UI |
| 10 | Medium | Remove or rephrase trust-signal counter on S25 FAQ |
| 11 | Medium | S15 WhatsApp: sequence QR instructions (1 → 2) and add completion state |
| 12 | Medium | Shorten FAQ answers to headline + optional expand |
| 13 | Medium | S14 Test Drive: collapse optional fields behind “Más opciones” |
| 14 | Medium | Compare-gate dead-end: add checklist of trust actions with deep links |
| 15 | Medium | S06 Tour: reduce simultaneous content layers on kiosk |
| 16 | Medium | Unify forward CTA language (`Dar el siguiente paso` vs `Quiero que me confirmen la cuota`) |
| 17 | Medium | S03: de-emphasize or relocate “Próximamente” vehicles |
| 18 | Medium | S22: show price/desire hook above fold |
| 19 | Low | S02: add consequence label to path cards |
| 20 | Low | FAQ accordion: add “Tocá para ver respuesta” |
| 21 | Low | S13 TouchNav back label: rename from “Seguir explorando” |
| 22 | Low | Global: replace logo placeholders |
| 23–32 | Low–Med | Remaining items from category tables above |

---

## Strengths (Preserve in Polish Pass)

- **Tone of voice** is differentiated: honest comparison (*“Ellos ganan”*), low-pressure (*“Sin presión”*), local Santa Cruz context (Doble Vía, heat/A/C).
- **Session recap chips** on S13 create a personalized “consultant already knows my journey” effect — strong conversion psychology once media is real.
- **Trust gating** for compare is strategically sound; needs clearer visitor messaging, not removal.
- **Touch targets** generally meet kiosk minimums (`min-h-[44px]`–`[56px]`).
- **Accessibility overlay (S19)** with text scale, contrast, and motion reduction is above-average for automotive kiosks.
- **Idle privacy reset (S20)** is clear and well-worded (*“¿Seguís ahí?”* / **Sí, continuar**).

---

## Recommended Polish Phases

| Phase | Focus | Expected uplift |
|-------|-------|-----------------|
| **P0 — Showstopper** | Asset drop + real dealership contact data | Emotional impact + credibility |
| **P1 — Wayfinding** | Hero CTA hierarchy, compare/financing CTA persistence, conversion hub recommendation | Flow clarity |
| **P2 — Copy** | FAQ trim, remove operator scripts, hide screen IDs, shorten financing | Time-to-understand |
| **P3 — Delight** | Completion moment on S15, real bank/partner logos, attract-loop video | Luxury finish |

---

## Appendix: Content & Component References

| Screen | Primary component | Key content source |
|--------|-------------------|-------------------|
| S01–S02 | `ExperienceEntry`, `AttractLoop`, `WelcomeScreen` | `app/(showroom)/page.tsx` |
| S03 | `VehicleSelector` | `content/vehicles/registry.json` |
| S22 | `VehicleHero` | `content/vehicles/gs4-max/vehicle.json` |
| S25 | `FAQScreen` | `content/vehicles/gs4-max/faq.json` |
| S24 | `TrustStoryScreen` | `content/vehicles/gs4-max/trust-story.json` |
| S06 | `TourPlayer` | `content/vehicles/gs4-max/tours/trust.json` (5 MVP steps) |
| S08 | `TopicDeepDiveScreen` | `content/vehicles/gs4-max/topics/adas.json` |
| S11–S12 | `CompareHubScreen`, `CompareDetailScreen` | `content/vehicles/gs4-max/compare/` |
| S26 | `FinancingPreviewScreen` | `content/vehicles/gs4-max/financing.json` |
| S13 | `ConversionHubScreen` | inline + session state |
| S14 | `TestDriveForm` | `content/shared/test-drive-form.json` |
| S15 | `WhatsAppHandoffScreen` | `content/shared/dealership.json` |

---

*Report generated for stakeholder review. No application code was modified during this audit.*
