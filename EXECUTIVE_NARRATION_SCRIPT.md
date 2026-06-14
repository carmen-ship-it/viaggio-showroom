# Executive Narration Script — Viaggio Digital Showroom

**Phase 7.2 · Screen-level host narration**

These scripts are for a **premium showroom host** — not Carlos, Sofía, or Diego. The host orients the visitor, builds trust, and explains *why the next moment matters*. Persona voices remain on tour steps (S06) and topic blocks (S08).

**Rules applied throughout:**

- Do **not** read text, stats, CTAs, or headlines visible on screen.
- Add context the screen cannot show: intent, emotional framing, what to do next, and why it matters.
- Tone: consultative, calm, human, premium — never urgent or salesy.
- Language: **Spanish (Bolivia)** · `es-BO`
- Pace reference: **~125–135 words/minute** · pausa breve tras la primera frase

---

## Recording Matrix

| Screen | Asset ID (proposed) | Host | Duration | Trigger |
|--------|---------------------|------|----------|---------|
| S01 | `audio-narration-host-s01-attract` | Anfitrión/a | ~22 s | Idle loop · T+2.5 s |
| S03 | `audio-narration-host-s03-selector` | Anfitrión/a | ~28 s | Screen enter · T+1.5 s |
| S22 | `audio-narration-host-s22-hero` | Anfitrión/a | ~32 s | Hero reveal · T+2.0 s |
| S06 | `audio-narration-host-s06-tour-intro` | Anfitrión/a | ~35 s | Tour step 1 · T+1.0 s |
| S08 | `audio-narration-host-s08-topic-frame` | Anfitrión/a | ~18 s | Topic enter · T+1.0 s |
| S08 | `audio-narration-host-s08-adas` | Anfitrión/a | ~30 s | ADAS topic · T+2.0 s *(demo path)* |
| S12 | `audio-narration-host-s12-compare` | Anfitrión/a | ~33 s | Header ready · T+1.5 s |
| S26 | `audio-narration-host-s26-financing` | Anfitrión/a | ~36 s | Disclaimer visible · T+2.0 s |
| S13 | `audio-narration-host-s13-convert` | Anfitrión/a | ~38 s | Recap rendered · T+2.5 s |
| S15 | `audio-narration-host-s15-whatsapp` | Anfitrión/a | ~34 s | QR visible · T+2.0 s |

---

## S01 — Attract Loop

**On screen (do not repeat):** Cinematic footage · brand lockup · tagline *"Conocé el GAC GS4 MAX a tu ritmo"* · pulse CTA *"Tocá para empezar"*

**Host job:** Invite without selling. Signal that this is self-paced, private, and curated — not a sales pitch loop.

**Suggested voice tone:** Warm, unhurried, low register. Smile audible but not performative. Like greeting someone who just walked into a quiet premium lounge — not a megaphone on the showroom floor.

**Trigger timing:** Start **2.5 s** after attract loop begins (video settled). Replay at most once every **4 min** while idle. Stop immediately on touch.

**Approximate duration:** **22 seconds** (~48 words)

### Script

> Bienvenido a Viaggio.
>
> Acá nadie te va a apurar ni a seguir con la mirada. Este recorrido es tuyo: mirá, compará, preguntá — a tu ritmo.
>
> Cuando quieras empezar, tocá la pantalla. Te acompaño en cada paso.

**Delivery notes:**

- *"Acá nadie te va a apurar"* — slight pause after; this is the trust hook.
- Do not name the model, price, or dealership address.
- Fade under ambient music at **−24 LUFS** relative to voice.

---

## S03 — Vehicle Selector

**On screen (do not repeat):** *"Elegí tu GAC"* · GS4 MAX hero card · *"Disponible ahora"* · *"Explorar experiencia →"* · stat chips · coming-soon models (if visible)

**Host job:** Explain why the experience starts with one model today, and what happens when they choose — anticipation for the immersive hero, not a catalog readout.

**Suggested voice tone:** Confident curator. Light enthusiasm, zero hype. Think *"te muestro por dónde arrancamos"* not *"¡tenemos el mejor auto!"*

**Trigger timing:** **1.5 s** after screen mount, once per session visit to S03.

**Approximate duration:** **28 seconds** (~62 words)

### Script

> Hoy el recorrido completo está armado alrededor del GS4 MAX — el SUV que más familias están evaluando en Santa Cruz.
>
> No es un catálogo: es una experiencia guiada. Tocá la tarjeta cuando quieras y entramos al vehículo en grande — diseño, confianza, comparación y cuota, en el orden que te sirva.
>
> Los demás modelos GAC vienen en camino; por ahora, profundizamos acá.

**Delivery notes:**

- Do not read horsepower, price, or warranty figures from the card.
- *"No es un catálogo"* — key differentiator; deliver with calm conviction.

---

## S22 — Immersive Vehicle Hero

**On screen (do not repeat):** Model name · tagline · stat strip (HP, airbags, price from, etc.) · navigation CTAs · *"¿Es confiable?"* TouchNav

**Host job:** Frame this as the emotional *first meeting* with the car — before specs and comparisons. Tell them what to notice and why the next screens exist.

**Suggested voice tone:** Cinematic but intimate. Slightly slower than S03. Premium automotive film narrator, localized for Bolivia — not a radio spot.

**Trigger timing:** **2.0 s** after hero typography finishes animating. Skip if visitor arrived via deep link and hero narration played in last **10 min**.

**Approximate duration:** **32 seconds** (~72 words)

### Script

> Antes de números y comparaciones, tomate este momento.
>
> Fijate cómo se ve el GS4 MAX en persona — proporciones, presencia, detalle. Los datos están abajo cuando los necesites; ahora importa cómo te hace sentir arrancar el día con este auto.
>
> En los próximos pasos vas a poder responder la pregunta que todos traen: *¿puedo confiar en esto para mi familia?* Empezamos por ahí cuando quieras.

**Delivery notes:**

- Never read tagline, stats, or CTA labels aloud.
- *"¿puedo confiar en esto para mi familia?"* — softer, reflective; not rhetorical shouting.
- Demo path: visitor typically taps *"¿Es confiable?"* next — host primes that without naming the button.

---

## S06 — Guided Tour Player

**On screen (do not repeat):** Tour title · step counter · step title · persona avatar · narration text · *Anterior / Siguiente*

**Host job:** Set expectations for the guided tour format — once per tour, before Carlos/Sofía/Diego speak on individual steps. Clarify duration, pacing, and purpose (trust before desire).

**Suggested voice tone:** Guide at a museum. Respectful of time. Clear boundaries: *"Carlos te explica la ingeniería; yo te cuento por qué estamos acá."*

**Trigger timing:** **1.0 s** after tour step 1 loads. **Once per tour session** — not on every step. Step-level persona narration is separate content.

**Approximate duration:** **35 seconds** (~78 words)

### Script

> Ahora entramos al tour guiado.
>
> En los próximos minutos vas a recorrer el GS4 MAX con un especialista digital — motor, seguridad, garantía, servicio en Viaggio. No hace falta memorizar: avanzá paso a paso o volvé atrás cuando quieras.
>
> La idea es simple: primero confianza, después deseo. Cuando termines, vas a saber exactamente qué profundizar — o si ya estás listo para probarlo en la calle.

**Delivery notes:**

- Do not read step 1 title or Carlos's on-screen narration block.
- If **family tour** (Diego) or **desire tour** (Sofía), swap line 3: *"primero confianza"* → *"primero la vida real en familia"* or *"primero diseño y equipamiento"* — same host voice, alternate asset IDs per tour ID.

**Alternate asset IDs:**

- `audio-narration-host-s06-tour-intro-trust` (Carlos / default demo)
- `audio-narration-host-s06-tour-intro-family` (Diego)
- `audio-narration-host-s06-tour-intro-desire` (Sofía)

---

## S08 — Topic Deep Dive

**On screen (do not repeat):** Topic title · hero headline · persona narration block · feature grid · footer CTAs

**Host job:** Two layers — (A) brief frame when any topic opens, (B) topic-specific bridge for high-traffic topics. Host never repeats Carlos/Sofía/Diego block text.

---

### S08-A — Universal topic frame (all topics)

**Suggested voice tone:** Brief, transitional. Handoff to the specialist persona.

**Trigger timing:** **1.0 s** after topic title appears. Suppressed if topic-specific script (S08-B) plays for same visit.

**Approximate duration:** **18 seconds** (~40 words)

### Script

> Este tema responde una pregunta concreta de tu proceso de decisión.
>
> Escuchá al especialista, revisá los detalles visuales, y seguí cuando quieras — sin saltarte lo que te importa.

---

### S08-B — ADAS topic (demo path exemplar)

**Context:** Visitor arrives after trust tour · screen shows ADAS features, Carlos narration on AEB/lane assist/360°

**Host job:** Explain *why* ADAS matters in Santa Cruz driving — margin, family context — without listing features already on screen.

**Suggested voice tone:** Reassuring, pragmatic. Safety without fear-mongering.

**Trigger timing:** **2.0 s** after topic mount. Replaces S08-A on this topic.

**Approximate duration:** **30 seconds** (~66 words)

### Script

> Mucha gente mira el equipamiento; pocos se preguntan qué pasa un martes a las siete de la tarde en la doble vía.
>
> Acá no hablamos de gadgets: hablamos de margen — esos dos segundos extra cuando el tráfico se frena de golpe, o cuando hay que estacionar en un espacio justo con los chicos atrás.
>
> Carlos te muestra qué trae el GS4 MAX de serie. Después, si querés, lo probamos en la calle.

**Delivery notes:**

- Do not enumerate AEB, ACC, 360° — they're visible in the feature grid.
- *"martes a las siete de la tarde"* — local, relatable; deliver conversationally.

**Other high-priority S08-B variants (future assets):**

| Topic | Asset ID | Host angle |
|-------|----------|------------|
| `engine` | `audio-narration-host-s08-engine` | Long-term ownership cost, not horsepower |
| `family-safety` | `audio-narration-host-s08-family-safety` | Decision made with partner/kids in mind |
| `warranty-terms` | `audio-narration-host-s08-warranty` | What warranty really signals from factory |

---

## S12 — Compare Detail

**On screen (do not repeat):** *"GS4 MAX vs Toyota Corolla Cross"* · win/tie counts · expandable comparison rows · persona explanations per row

**Host job:** Teach *how* to use an honest comparison — credibility of Viaggio, not winning every row.

**Suggested voice tone:** Transparent advisor. Comfortable saying the competitor is strong in places.

**Trigger timing:** **1.5 s** after header animation completes.

**Approximate duration:** **33 seconds** (~73 words)

### Script

> Comparar no es descalificar al otro auto — es entender qué estás pagando realmente.
>
> Acá vas a ver filas donde ganamos, filas donde empatan, y alguna donde el competidor lleva ventaja. Eso es a propósito: Viaggio prefiere que decidas con información completa.
>
> Tocá cada fila para ver el contexto. Al final, la pregunta no es quién gana un marcador — es cuál encaja con tu familia y tu presupuesto.

**Delivery notes:**

- Do not read win counts or row values aloud.
- *"alguna donde el competidor lleva ventaja"* — honest pause; builds executive credibility.

---

## S26 — Financing Preview

**On screen (do not repeat):** Disclaimer · trim toggles · plazo selector · cuota range · TCO breakdown · readiness meter · *"Dar el siguiente paso"*

**Host job:** Frame numbers as conversation starters with a human consultant — not commitments. Explain why monthly payment alone is incomplete.

**Suggested voice tone:** Financial-savvy friend, not bank salesperson. Clear, neutral, respectful of money sensitivity.

**Trigger timing:** **2.0 s** after disclaimer paragraph is visible.

**Approximate duration:** **36 seconds** (~80 words)

### Script

> Llegaste al momento en que muchos se preguntan: *¿me cierra la cuota?*
>
> Lo que ves acá es orientativo — rangos para que dimensiones el compromiso mensual antes de sentarte con un consultor. Jugá con versión y plazo; fijate también el costo de uso, no solo la letra del crédito.
>
> Ningún número de esta pantalla es final. El valor está en llegar a la conversación sabiendo qué preguntar — y qué ajustar.

**Delivery notes:**

- Never read BOB/USD figures, trim names, or plazo months from UI.
- *"¿me cierra la cuota?"* — empathetic, slightly quieter.

---

## S13 — Conversion Hub

**On screen (do not repeat):** *"¿Cómo querés dar el siguiente paso?"* · session recap chips · path cards (test drive, WhatsApp, financing, share) · dealership footer

**Host job:** Acknowledge the journey so far. Differentiate paths without pushing one. Humanize the handoff.

**Suggested voice tone:** Warm closure of a consultation. *"Ya hiciste el trabajo difícil"* energy.

**Trigger timing:** **2.5 s** after session recap chips finish rendering.

**Approximate duration:** **38 seconds** (~84 words)

### Script

> Llegaste lejos en pocos minutos — eso ya dice algo sobre tu interés.
>
> Ahora elegís cómo seguir: probarlo en la calle con tu familia, escribirnos por WhatsApp con todo lo que ya exploraste, o compartir un resumen con quien decide con vos.
>
> No hay respuesta correcta. Hay una que te resulte más cómoda hoy. Nosotros estamos en piso cuando quieras dar el paso — sin formularios eternos ni presión.

**Delivery notes:**

- Do not read recap chip labels or card titles.
- If recap is sparse (early exit), alternate line 1: *"Aunque hayas visto poco, este es buen momento para preguntar en persona."*

---

## S15 — WhatsApp Handoff

**On screen (do not repeat):** QR codes · message preview · phone number · consultant script quote · resume token

**Host job:** Explain the human bridge — what the consultant receives, response time, privacy — without reading the pre-filled message.

**Suggested voice tone:** Personal, reassuring. Transition from digital to human relationship.

**Trigger timing:** **2.0 s** after primary QR panel is visible.

**Approximate duration:** **34 seconds** (~75 words)

### Script

> Este paso conecta lo digital con una persona real de Viaggio.
>
> Escaneá el código o abrí WhatsApp: tu recorrido viaja en el mensaje — temas que viste, comparación, cuota orientativa — para que no empieces de cero.
>
> En piso solemos responder en minutos. Si preferís seguir explorando acá, también podés. La conversación queda abierta cuando te sirva.

**Delivery notes:**

- Do not read message preview, phone digits, or consultant name from screen.
- *"no empieces de cero"* — relief tone; many visitors fear repeating themselves.

---

## Implementation Notes

### Priority recording order (executive demo path)

1. S01 → S22 → S06 intro → S08 ADAS → S12 → S26 → S13 → S15 → S03

### Integration (Phase 7 audio architecture)

Register assets in `lib/audio/assets.ts` and wire via `lib/audio/screen-tracks.ts`:

```typescript
S22: {
  screenId: "S22",
  ambientAssetId: "audio-ambient-showroom",
  narrationAssetId: "audio-narration-host-s22-hero",
  autoPlayNarration: true,
},
```

Host narration uses the **`narration`** channel but should **preempt** only when no persona track is playing.

### What stays on persona voices (not this document)

| Content | Voice | Document |
|---------|-------|----------|
| Tour step blocks | Carlos / Sofía / Diego | `docs/content/*-narration.md` |
| Topic narration blocks | Persona per block | Content JSON + schemas |
| Screen host framing | Anfitrión/a showroom | This document |

---

## Quality Checklist (before recording)

- [ ] Script adds information not visible on screen
- [ ] No price, stat, or CTA label read aloud
- [ ] No superlatives (*"el mejor"*, *"imperdible"*, *"único"*)
- [ ] Bolivian Spanish — *vos*, *probá*, *fijate* where natural
- [ ] Duration within ±3 s of target at 125–135 wpm
- [ ] Trigger timing tested against screen animation completion
- [ ] Master mute and headphone mode respected in playback QA

---

*Phase 7.2 · Executive narration content · Viaggio Digital Showroom · June 2026*
