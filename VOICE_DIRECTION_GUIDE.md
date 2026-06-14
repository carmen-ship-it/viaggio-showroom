# Voice Direction Guide — Premium Showroom Host

**Phase 7.2 · Recording & performance direction for Viaggio kiosk narration**

This guide defines how the **showroom host** should sound across screen-level scripts (`EXECUTIVE_NARRATION_SCRIPT.md`). It complements — and must not be confused with — persona direction for Carlos, Sofía, and Diego (`docs/voice-strategy.md`).

---

## 1. Voice Architecture

```
┌─────────────────────────────────────────────────────────┐
│  ANFITRIÓN/A DEL SHOWROOM (host)                        │
│  Screen intros · transitions · decision framing         │
│  S01 · S03 · S22 · S06 intro · S08 frame · S12 · S26 ·  │
│  S13 · S15                                              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼ handoff
┌─────────────────────────────────────────────────────────┐
│  PERSONAS (specialists)                                 │
│  Carlos · Sofía · Diego                                 │
│  Tour steps · topic narration blocks                    │
└─────────────────────────────────────────────────────────┘
```

| Role | Emotional job | When they speak |
|------|---------------|-----------------|
| **Host** | Orient · anticipate · build trust in the *process* | Screen entry, before visitor reads UI |
| **Carlos** | Calm technical confidence | Reliability, safety, warranty content |
| **Sofía** | Warm desire, lifestyle connection | Design, technology, value |
| **Diego** | Relatable family practicality | Daily use, space, comfort |

**Golden rule:** The host never competes with on-screen text. Personas never sell what the host already framed.

---

## 2. Host Character Profile

### Who is the host?

A senior **customer experience guide** at Viaggio Motors — not a closer, not a voice-over announcer. They greet visitors the way a premium hotel concierge welcomes a guest: present, unhurried, discreet.

### Character attributes

| Attribute | Description | On-mic behavior |
|-----------|-------------|-----------------|
| **Premium** | Controlled pace, complete sentences, no filler | No *"eh"*, *"o sea"* excessive, no upspeak |
| **Human** | Imperfect warmth — breath, micro-pauses | Sounds like a person in the room, not TTS |
| **Consultative** | Questions implied, not interrogated | *"¿me cierra la cuota?"* as empathy, not pitch |
| **Trust-first** | Acknowledges limits of digital tools | *"orientativo"*, *"cuando quieras"*, *"sin presión"* |
| **Local** | Santa Cruz sensibility | Traffic, heat, family decision culture |

### Who the host is not

- Radio retail announcer (*"¡Grandes ofertas!"*)
- Generic corporate IA (*"Bienvenido a nuestra plataforma digital"*)
- Hard closer (*"Aprovechá hoy"*)
- Spec reader or disclaimer robot

---

## 3. Casting Direction

### Voice qualities (priority order)

1. **Warm baritone or mezzo** — either gender; avoid bright "commercial" timbre
2. **Age perception: 32–48** — credible for family SUV buyer, not youthful hype
3. **Neutral Latin-American Spanish** with **Bolivian naturalness** — not forced slang
4. **Low sibilance** — kiosk speakers and showroom acoustics punish harsh *s*

### Casting red flags

- Voices that sound like airline safety videos
- Over-enunciated " announcer Spanish"
- Excessive vocal fry or whisper-ASMR trends
- Accents that read as foreign dubbing for Bolivian audience

### Recommended casting note (brief for agency)

> *"Buscamos voz de anfitrión/a premium para concesionario automotriz en Santa Cruz: cálida, pausada, consultiva. Referencia de tono: concierge de hotel cinco estrellas explicando el spa — no locutor de oferta. Español boliviano natural; 30–45 años percibidos."*

---

## 4. Performance Direction

### Pace & rhythm

| Parameter | Target |
|-----------|--------|
| Words per minute | **125–135** (host) · slower than news, faster than meditation |
| Sentence gaps | **0.4–0.7 s** between sentences |
| Comma pauses | **0.2–0.3 s** — don't rush lists |
| Opening beat | **0.5 s silence** before first word on S01, S22 |
| Closing beat | **0.3 s** after last word before fade |

### Dynamics

- **Default level:** mezzo-forte — clear on kiosk without shouting
- **Emphasis:** lower pitch + slight slowdown, not volume spike
- **Quoted questions** (*"¿puedo confiar…?"*): softer, inward — visitor's inner voice
- **Trust phrases** (*"sin presión"*, *"a tu ritmo"*): gentle deceleration

### Emotional arc by screen

| Screen | Entry energy | Exit energy |
|--------|--------------|-------------|
| S01 | Soft invitation | Quiet confidence |
| S03 | Curatorial | Forward-looking |
| S22 | Contemplative | Anticipatory |
| S06 | Structured calm | Motivated |
| S08 | Focused | Practical |
| S12 | Transparent | Empowered |
| S26 | Sensitive | Grounded |
| S13 | Affirming | Open choice |
| S15 | Personal | Reassured |

---

## 5. Language & Diction (es-BO)

### Preferred expressions

| Use | Instead of |
|-----|------------|
| *vos / probá / fijate* | *usted / pruebe / observe* (unless formal mode toggle) |
| *cuota orientativa* | *precio final* |
| *consultor* | *vendedor* |
| *recorrido* | *funel / customer journey* |
| *en piso* | *en tienda* (acceptable either) |
| *la doble vía* | generic "tráfico" |

### Forbidden vocabulary (host & personas)

- *"Oferta imperdible"*, *"últimas unidades"*, *"el mejor del mercado"*
- *"No te lo podés perder"*, *"apurate"*
- Guaranteed financing rates or exact prices
- Competitor disparagement by name in host scripts

### Pronunciation notes (Bolivia)

- **GAC:** *"guac"* or spelled gently — one consistent choice per session
- **Viaggio:** *vi-AH-ho* — Italian origin, don't anglicize
- **ADAS:** spell out *"a-das"* or *"asistencias"* — avoid English acronym blur
- Numbers: never spoken in host scripts (financing screen)

---

## 6. Technical Recording Spec

### File delivery

| Spec | Value |
|------|-------|
| Format | **MP3** 320 kbps CBR or **WAV** 48 kHz / 24-bit |
| Channels | Mono preferred (kiosk); stereo acceptable |
| Loudness | **−16 LUFS** integrated (host narration) |
| True peak | **≤ −1.0 dBTP** |
| Noise floor | **≤ −60 dB** |
| Room tone | Minimal — light booth or treated space |

### Mix hierarchy (playback)

```
Interaction SFX     −28 to −22 LUFS  (subtle)
Ambient music       −32 to −26 LUFS  (under voice)
Host narration      −16 LUFS         (primary)
Persona narration   −16 LUFS         (same priority as host; never overlap)
```

When host and persona could collide: **host yields** — persona blocks take precedence on S06 steps and S08 topic blocks.

### File naming

```
host-s01-attract.mp3
host-s03-selector.mp3
host-s22-hero.mp3
host-s06-tour-intro-trust.mp3
host-s08-topic-frame.mp3
host-s08-adas.mp3
host-s12-compare.mp3
host-s26-financing.mp3
host-s13-convert.mp3
host-s15-whatsapp.mp3
```

Place under:

```
public/assets/audio/narration/host/
public/assets/vehicles/gs4-max/audio/narration/host/
```

---

## 7. Trigger & Playback Direction

### When voice starts

| Screen | Start trigger | Stop / duck |
|--------|---------------|-------------|
| S01 | T+2.5 s loop | Touch anywhere · fade 400 ms |
| S03 | T+1.5 s mount | Navigate away |
| S22 | T+2.0 s after hero type | Navigate away |
| S06 | T+1.0 s step 1 only | Step 2 starts persona |
| S08 frame | T+1.0 s | Persona block or S08-B replaces |
| S08 ADAS | T+2.0 s | Navigate away |
| S12 | T+1.5 s header | Navigate away |
| S26 | T+2.0 s disclaimer | Navigate away |
| S13 | T+2.5 s recap | Navigate away |
| S15 | T+2.0 s QR | Navigate away |

### Auto-pause behavior

- Tab hidden → pause host and persona
- Master mute → immediate silence
- Headphone mode → host unchanged; ambient ducks further
- Idle reset (S20) → hard stop all narration

### Repetition policy

| Script | Max repeats per session |
|--------|-------------------------|
| S01 idle | 1× per 4 min idle |
| All others | 1× per screen visit |

---

## 8. Persona Handoff Cues

When host finishes, persona begins — avoid **double intros**.

**Example — S06 trust tour, step 1:**

1. **Host (35 s):** *"Ahora entramos al tour guiado…"* → ends
2. **Pause:** 0.8 s
3. **Carlos (step block):** Technical engine narration from content JSON

**Host must not say:** *"Te presento a Carlos"* — avatar and UI already identify persona.

**Example — S08 ADAS:**

1. **Host (30 s):** Santa Cruz margin framing → ends
2. **Pause:** 0.6 s
3. **Carlos (block):** Feature-level ADAS explanation

---

## 9. Accessibility & Kiosk Modes

| Mode | Host behavior |
|------|---------------|
| Master muted | No host playback |
| Narration auto-play off | Show `NarrationControls` — host track available on tap |
| Headphone mode | Full host level; ambient reduced in mix |
| Reduce motion | Host timing unchanged; no dependency on animation |
| High contrast / text scale | No script change — voice is independent |

**Optional future:** Short host variant (~15 s) for repeat visitors — asset suffix `-short`.

---

## 10. Session Recording Workflow

### Pre-session

1. Director reads full `EXECUTIVE_NARRATION_SCRIPT.md` aloud once
2. Talent records **scratch track** for S22 + S13 — approve tone before batch
3. Confirm **one consistent "GAC" and "Viaggio" pronunciation**

### Session order (efficiency)

1. All host scripts in emotional arc order: S01 → S03 → S22 → S06 → S08 → S12 → S26 → S13 → S15
2. Pickups only for flagged lines
3. Room tone 10 s at end for edit padding

### Director sign-off per take

- [ ] Adds value beyond screen
- [ ] No visible UI text echoed
- [ ] Duration within target ±3 s
- [ ] Bolivian naturalness — not over-performed
- [ ] Premium calm maintained under time pressure

---

## 11. Reference Tone Board

Use as **directional mood**, not imitation:

| Reference | Borrow | Avoid |
|-----------|--------|-------|
| Premium hotel concierge welcome | Unhurried warmth, personal address | Hospitality clichés |
| Documentary narrator (automotive art film) | Contemplative S22 pacing | Pretentious abstraction |
| Trusted financial advisor (first meeting) | S26 sensitivity | Cold institutional tone |
| Knowledgeable friend at dinner | S12 honesty about trade-offs | Casual slang overload |

---

## 12. Relationship to Existing Docs

| Document | Scope |
|----------|-------|
| `EXECUTIVE_NARRATION_SCRIPT.md` | Word-for-word host scripts + triggers |
| `docs/voice-strategy.md` | Carlos / Sofía / Diego persona copy |
| `docs/content/carlos-narration.md` | Persona tour scripts (step-level) |
| `AUDIO_EXPERIENCE_PLAN.md` | Playback architecture |
| `AUDIO_IMPLEMENTATION.md` | Engineering integration |

---

## 13. Quick Director Card (printable)

```
HOST = concierge, not closer
PACE = 125–135 wpm · breathe between sentences
TRUST = orientativo · sin presión · a tu ritmo
LOCAL = Santa Cruz · familia · doble vía
NEVER = read screen · quote prices · hype
HANDOFF = pause 0.6–0.8 s · let persona speak
LOUDNESS = −16 LUFS · mono · clean booth
```

---

*Phase 7.2 · Voice direction guide · Viaggio Digital Showroom · June 2026*
