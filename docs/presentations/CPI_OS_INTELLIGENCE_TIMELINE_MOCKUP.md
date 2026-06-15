# CPI-OS — Intelligence Timeline Mockup

**Artifact type:** Presentation-only executive visualization · Keynote / board / investor  
**Data source:** [`CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md`](./CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md)  
**Aesthetic target:** Tesla product film × Palantir Gotham × Apple keynote × Bloomberg Terminal — **not** Salesforce, HubSpot, or Zoho  

**Master format:** 3840×2160 (4K UHD) · 16:9 · 23.976 fps · safe zone 10%  
**Runtime:** 52 seconds (timeline reveal) · loopable idle 8s on final frame  
**Version:** 1.0 · Junio 2026

---

## Creative thesis

> *"Every touchpoint leaves intelligence. Every intelligence point has a dollar sign at the end."*

The audience should feel they are watching a **mission control replay** of a single high-value decision — not scrolling a CRM activity log. Time flows **left to right** on a luminous spine. Intelligence **accumulates upward** like a Palantir graph. Product screens appear as **floating glass panels** (Apple), never as nested browser chrome. Numbers tick like **Bloomberg** when depth score and revenue land.

**Forbidden:** pipeline stages, kanban columns, avatar circles with initials, sidebar navigation, "Lead #4821", generic blue SaaS gradients.

---

## Layout — 3840×2160 master

### Grid system

| Zone | X | Y | W×H | Purpose |
|------|---|---|-----|---------|
| **Header rail** | 192 | 120 | 3456×96 | Title + campaign badge + live clock |
| **Timeline spine** | 192 | 480 | 3456×8 | Horizontal progress beam |
| **Event nodes** | 192–3648 | 520 | distributed | 13 nodes · ~249px spacing |
| **Intelligence stack** | 192 | 200 | 800×240 | Depth meter + temperature + persona |
| **Screen stage** | 1200 | 680 | 1440×900 | Hero product / film inset |
| **Insight rail** | 1200 | 1640 | 1440×320 | Business value + signals (current event) |
| **Attribution Sankey** | 2680 | 680 | 1064×1280 | Mini flow IG → Venta |
| **Footer** | 192 | 2040 | 3456×48 | Viaggio · CPI-OS · "Datos orientativos piloto" |

### ASCII wireframe

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  INTELIGENCIA MENDOZA          instagram_equipetrol_familia_jun2026    14d  │
├──────────────┬──────────────────────────────────────┬───────────────────────┤
│ DEPTH  87    │                                      │   ATTRIBUTION         │
│ ████████░░   │     ┌─────────────────────┐          │   IG ──► QR           │
│ 🔴 CALIENTE  │     │  S12 Compare        │          │    ╲                  │
│ Persona:     │     │  (glass panel)      │          │     Kiosco ──► Javier │
│ Familiar     │     └─────────────────────┘          │           ╲           │
│              │                                      │            ► VENTA    │
├──────────────┴──────────────────────────────────────┴───────────────────────┤
│  ●───●───●───●───●───●───●───●───●───●───●───●  ← timeline spine (glow)     │
│  IG QR S21 Arr Kio Trust Cmp Fin Adv Jav TD FU Won                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  "Comparación honesta construye credibilidad — +22% cierre vs sin comparar" │
│  competitor: Corolla Cross · honest_loss: reventa · depth +10              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Design tokens

Align with ops / presentation canon (`#0A0C10`, `#C8A96E`, trust teal).

| Token | Hex / value | Usage |
|-------|-------------|-------|
| `--canvas` | `#0A0C10` | Full background |
| `--canvas-elevated` | `#12151C` | Panels, cards |
| `--glass` | `rgba(255,255,255,0.04)` + blur 24px | Screen stage |
| `--glass-border` | `rgba(255,255,255,0.08)` | Panel stroke |
| `--accent-gold` | `#C8A96E` | Active node, revenue, Sankey highlight |
| `--accent-trust` | `#4A9B8E` | Intelligence signals, resolved objections |
| `--accent-hot` | `#34D399` | Temperature caliente (emerald, not red alarm) |
| `--accent-warm` | `#FBBF24` | Temperature tibio |
| `--accent-cold` | `#64748B` | Pre-session |
| `--text-primary` | `#F4F4F5` @ 95% | Headlines |
| `--text-secondary` | `#A1A1AA` | Labels |
| `--text-tertiary` | `#52525B` | Timestamps |
| `--bloomberg-green` | `#3D9970` | Positive delta ticks |
| `--grid-line` | `rgba(255,255,255,0.06)` | Subtle grid |

### Typography

| Role | Family | Size @ 4K | Weight | Tracking |
|------|--------|-----------|--------|----------|
| **Display** | SF Pro Display / Inter Display | 72px | 600 | -0.02em |
| **Event label** | Inter | 28px | 500 | 0 |
| **Timestamp** | IBM Plex Mono | 22px | 400 | 0.04em |
| **Signal chip** | Inter | 20px | 500 | 0.02em |
| **Business value** | Inter | 36px | 400 | 0 · line-height 1.35 |
| **Micro label** | Inter | 18px | 600 | 0.14em uppercase |

---

## Motion behavior — global rules

| Principle | Spec |
|-----------|------|
| **Easing** | `cubic-bezier(0.4, 0, 0.2, 1)` — Apple standard |
| **Enter** | Opacity 0→1 · translateY 12px→0 · 400ms |
| **Active node** | Scale 1→1.15 · gold ring pulse 2s loop |
| **Spine progress** | Width 0→100% synced to VO · 52s total |
| **Screen crossfade** | 300ms dissolve · no hard cuts except Closed Won |
| **Number tick** | Bloomberg-style count-up 600ms on depth/revenue |
| **Parallax** | Screen stage Z-depth +2% on camera push |

**Frame rate:** Motion designed at 60fps comp · delivered 23.976 with motion blur ON for spine glow.

---

## Camera moves (virtual dolly)

The "camera" is a 2.5D transform on a root precomp / React container — not literal 3D unless AE Cinema 4D optional pass.

| Beat | Camera | Transform |
|------|--------|-----------|
| **Open (0:00)** | Wide establishing | scale 1.0 · focus full layout |
| **Act A digital (0:04–0:12)** | Push left | translateX 0→-180px · scale 1.05 · focus events 1–3 |
| **Act B showroom (0:12–0:32)** | Center on screen stage | translateX -180→+120px · scale 1.08 |
| **Act C ops (0:32–0:42)** | Push right + Sankey | translateX +120→+280px · Sankey opacity 0→1 |
| **Close (0:42–0:52)** | Pull back + revenue | scale 1.08→1.0 · all nodes lit gold |

---

## Animation sequence — beat by beat

Total **52.0s**. Event IDs match spec.

| Time | Beat | Visual | Motion | VO start |
|------|------|--------|--------|----------|
| **0:00–0:03** | **Cold open** | Black → grid fades in · spine only · no nodes | Grid opacity 0→0.4 · 2s | — |
| **0:03–0:04** | **Title** | "INTELIGENCIA MENDOZA" · campaign chip | Title slide up | *"Catorce días."* |
| **0:04–0:07** | **E1 Instagram** | Node 1 ignites · EXT_IG thumb 9:16 left of stage | Node pulse · spine 8% | *"Un anuncio en Instagram."* |
| **0:07–0:09** | **E2 QR** | Node 2 · scan line SFX · UTM chip flies to Sankey | Particle IG→QR | *"Un escaneo."* |
| **0:09–0:12** | **E3 Pre-visit** | S21 glass panel · Carlos clip badge | Depth 0→22 tick | *"Confianza antes del showroom."* |
| **0:12–0:15** | **E4 Arrival** | B-roll inset or S01 loop · "Sábado 10:28" | Time jump typography · +2d flash | *"El sábado, llegan solos."* |
| **0:15–0:18** | **E5 Kiosk** | S02 resume banner highlight | Token match shimmer | *"El kiosco recuerda."* |
| **0:18–0:23** | **E6 Trust** | Montage S25→S06→S08 · 3-up strip | Fast ken burns · depth 45→68 | *"Carlos baja el muro."* |
| **0:23–0:27** | **E7 Compare** | S12 full · **ámbar row hold 2s** | Honest row glow pulse | *"Dicen la verdad. Ganan confianza."* |
| **0:27–0:30** | **E8 Finance** | S26 toggle 36m · cuota $412 tick | Number roll | *"La cuota hace tangible el sueño."* |
| **0:30–0:33** | **E9 Advisor** | S36 modal · red edge pulse (subtle) | Alert ring · temp → hot | *"Roberto pide un humano."* |
| **0:33–0:36** | **E10 Javier** | S35 brief · opening line typewriter | SLA 1:32 badge · depth 87 | *"Noventa segundos. Con contexto."* |
| **0:36–0:39** | **E11 Test drive** | Film strip or S34 · 4 occupants icon | Spine 85% | *"La prueba valida, no explica."* |
| **0:39–0:43** | **E12 Follow-up** | S33 + WhatsApp · abuela bubble | Secondary decider node branches up | *"La abuela pregunta. El sistema responde."* |
| **0:43–0:49** | **E13 Closed Won** | GS4 gris delivery · **USD 28,900** hero | All nodes gold · Sankey complete · confetti subtle | *"Catorce días. Venta atribuida."* |
| **0:49–0:52** | **Hold** | Full graph lit · CPI-OS logo micro | Idle pulse on revenue | *"Eso es inteligencia que se queda en la empresa."* |

---

## Voiceover script — español Bolivia (~52s)

Narrador: voz documental premium · -3 dBFS · pausas marcadas.

| Time | Copy |
|------|------|
| 0:03 | *Catorce días.* |
| 0:04 | *Un anuncio en Instagram — familia, garantía, Equipetrol.* |
| 0:07 | *Un escaneo. La campaña queda atada.* |
| 0:09 | *Antes de pisar Viaggio, ya resolvieron: ¿es confiable?* |
| 0:12 | *El sábado llegan solos. Nadie los presiona.* |
| 0:15 | *El kiosco recuerda lo de anoche. Sin formulario.* |
| 0:18 | *Carlos y Diego bajan el muro — marca china, repuestos, familia.* |
| 0:23 | *Comparan con el Corolla Cross. Dicen la verdad. Ganan confianza.* |
| 0:27 | *Treinta y seis meses. Cuota orientativa. Retoma del Etios.* |
| 0:30 | *Roberto pide un asesor. La visita deja de ser anónima.* |
| 0:33 | *Javier llega en noventa segundos — con el brief completo.* |
| 0:36 | *Cuatro en la prueba. Validan emoción, no catálogo.* |
| 0:39 | *Tres días después, la abuela pregunta por la garantía en WhatsApp.* |
| 0:43 | *Catorce días desde el anuncio. GS4 MAX gris. Venta cerrada.* |
| 0:49 | *Veintiocho mil novecientos dólares — atribuidos, aprendidos, repetibles.* |
| 0:51 | *Eso es CPI-OS.* |

---

## Screenshot requirements per beat

Capture at **3840×2160** or scale 2× from device frames. Store under `docs/screenshots/intelligence-timeline/`.

| Beat | Asset ID | Source | Required frame |
|------|----------|--------|----------------|
| E1 | `TL-01-ig-reel.png` | Mock / film | Reel hero + campaign badge visible |
| E2 | `TL-02-qr-scan.png` | Film insert | QR in frame · optional |
| E3 | `TL-03-s21.png` | S21 mock | Trust strip + Carlos thumb |
| E4 | `TL-04-s01-attract.png` | Product | S01 with GS4 physical (composite) |
| E5 | `TL-05-s02-resume.png` | Product | Resume banner "Continuamos…" |
| E6 | `TL-06-trust-montage.png` | Composite | S25 + S06 + S08 triptych |
| E7 | `TL-07-s12-honest.png` | Product | **"Ellos ganan" row ≥2s in video** |
| E8 | `TL-08-s26-finance.png` | Product | 36m · $412 · GT gris |
| E9 | `TL-09-s36-modal.png` | Mock | "Consultor en breve" modal |
| E10 | `TL-10-s35-brief.png` | `/staff` | Mendoza handoff + opening line |
| E11 | `TL-11-testdrive.png` | Film or S34 | Logistics confirm |
| E12 | `TL-12-s33-whatsapp.png` | Mock composite | Share + abuela bubble |
| E13 | `TL-13-closed-won.png` | Mock | Delivery + revenue badge |

**QC:** No dev labels · español Bolivia · Mendoza / Corolla Cross / Etios names consistent with spec.

---

## Implementation path 1 — Figma

### File structure

```
CPI_OS_Intelligence_Timeline.fig
├── 🎨 Styles
│   ├── Colors (tokens above)
│   └── Text styles (Display, Mono, Chip)
├── 🧩 Components
│   ├── Timeline/Node [variant: event id × state: idle|active|complete]
│   ├── Timeline/Spine
│   ├── Panel/GlassScreen
│   ├── Panel/InsightRail
│   ├── Meter/DepthScore
│   ├── Meter/Temperature
│   ├── Sankey/AttributionMini
│   └── Chip/IntelligenceSignal
└── 📐 Frames
    ├── MASTER_3840x2160
    ├── STORYBOARD_52s (13 frames @ key beats)
    └── EXPORT_4K_PNG (per beat)
```

### Component: `Timeline/Node`

| Property | Type | Values |
|----------|------|--------|
| `eventId` | variant | instagram_ad … closed_won |
| `state` | variant | idle · active · complete |
| `timestamp` | text | from spec |
| `showIcon` | boolean | channel icon for E1,E2,E12 |

**Active state:** 2px ring `#C8A96E` · shadow `0 0 32px rgba(200,169,110,0.4)` · label opacity 100%.

### Prototype flow

- Frame 1 → 13: **After delay** matching beat table · **Smart animate** spine width + node state  
- **Interactive deck mode:** Click node → jump to frame with that event active (for live presenter)

### Handoff

- Export tokens as JSON to match React CSS variables  
- Export icons SVG 24×24: instagram, qr, kiosk, tablet, whatsapp, trophy

---

## Implementation path 2 — After Effects

### Project hierarchy

```
CPI_OS_Intelligence_Timeline.aep
├── 01_PRECOMP_assets/
│   ├── screens/          ← PNG seq from screenshots
│   ├── nodes/
│   └── sankey/
├── 02_PRECOMP_timeline_spine
├── 03_PRECOMP_ui_hud
├── 04_MASTER_3840x2160
└── 05_RENDER_ProRes4444
```

### Main comp `04_MASTER` layers (bottom → top)

| Layer | Content | Notes |
|-------|---------|-------|
| 1 | `BG_grid` | Shape layer · 6% opacity grid |
| 2 | `Spine_precomp` | Trim paths 0→100% · 52s · glow CC |
| 3 | `Nodes_precomp` | 13 nulls · sequential opacity |
| 4 | `Sankey_precomp` | Trim + particle stroke |
| 5 | `HUD_left` | Depth + temp meters |
| 6 | `Screen_stage` | Glass panel · content swap per beat |
| 7 | `Insight_rail` | Text linked to JSON (DataClay or manual) |
| 8 | `Camera_null` | Scale/position keyframes per camera table |
| 9 | `Title_safe` | Header + footer |

### Key easing

- Spine trim: `easeInOut` via `[0.4, 0, 0.2, 1]` expression on `linear()`  
- Depth counter: `Math.round(linear(time,...))` on slider  
- Gold pulse: `loopOut` opacity 90↔100% on active node

### Audio

- VO track · music bed -18dB under VO  
- SFX: scan chime E2 · UI whoosh E5 · handoff alert E9 · revenue stamp E13

### Render

- **ProRes 4444** master · **H.264** review · **PNG seq** for React texture optional

---

## Implementation path 3 — React component

Presentation-only. Not routed in customer app — embed in keynote shell or `/present/intelligence-timeline` demo route.

### Suggested stack

| Concern | Library |
|---------|---------|
| Animation | `motion` (Framer Motion) or `@react-spring/web` |
| Timeline scrub | `requestAnimationFrame` + progress prop OR `useMotionValue` |
| Data | Import JSON from spec |
| Typography | `next/font` Inter + IBM Plex Mono |

### Component API

```typescript
interface IntelligenceTimelineProps {
  /** Full document per SPEC JSON */
  data: IntelligenceTimelineDocument;
  /** 0–1 autoplay progress; if undefined, use autoplay */
  progress?: number;
  /** Autoplay duration ms */
  durationMs?: number; // default 52000
  /** Show presenter controls */
  controls?: boolean;
  /** Reduce motion — static final frame */
  reducedMotion?: boolean;
  /** Callback when event becomes active */
  onEventActive?: (eventId: IntelligenceEventId) => void;
  className?: string;
}
```

### State machine

```
idle → playing → (paused) → complete
         │
         └─ event_index: 0..12 synced to progress
```

| State | `progress` range | Active event |
|-------|------------------|--------------|
| playing | 0.00–0.08 | instagram_ad |
| playing | 0.08–0.13 | qr_scan |
| … | … | … |
| complete | 1.00 | closed_won (all nodes complete) |

Use beat table times / 52s for thresholds.

### File structure (suggested)

```
components/presentation/IntelligenceTimeline/
├── IntelligenceTimeline.tsx      # root + camera transform
├── TimelineSpine.tsx
├── TimelineNode.tsx
├── GlassScreenStage.tsx
├── InsightRail.tsx
├── DepthMeter.tsx
├── AttributionSankey.tsx
├── useTimelinePlayback.ts
├── beat-map.ts                   # time → eventId
└── types.ts                      # mirrors SPEC schema
```

### Key animations (Framer Motion example)

```typescript
// Node active ring
const nodeVariants = {
  idle: { scale: 1, boxShadow: "0 0 0 rgba(200,169,110,0)" },
  active: {
    scale: 1.15,
    boxShadow: "0 0 32px rgba(200,169,110,0.4)",
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  complete: { scale: 1, opacity: 0.9 },
};

// Camera push — apply to motion.div wrapper
// animate={{ x: cameraX, scale: cameraScale }}
```

### Presenter controls

- **Space:** play/pause  
- **←/→:** previous/next event (snap progress)  
- **R:** restart  
- Progress scrubber (optional) for rehearsal

### Performance

- Preload 13 screen PNGs  
- `will-change: transform` on camera wrapper only  
- Target 60fps on M1 iPad Pro for live keynote backup

---

## Anti-patterns (do not ship)

| Pattern | Why it fails |
|---------|--------------|
| Kanban columns | CRM smell |
| Lead score as plain number without story | Software not intelligence |
| Stock photo businessmen shaking hands | Breaks Viaggio authenticity |
| Zoho/HubSpot color palette | Wrong brand |
| More than 3 lines of text per insight rail | Keynote illegibility |
| Red alarm UX for "hot" lead | Use emerald — respect, not panic |

---

## Deliverables checklist

- [ ] Figma master + 13 storyboard frames  
- [ ] AE master comp 52s ProRes  
- [ ] VO es-BO recorded and aligned  
- [ ] 13 screenshot assets in `docs/screenshots/intelligence-timeline/`  
- [ ] React component with JSON import + presenter controls  
- [ ] Embedded in Act 5.3 Sankey beat of full presentation film  

---

## Control de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 15 Jun 2026 | Mockup inicial — layout, motion, triple implementation path |

---

*Datos: [`CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md`](./CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md) · Presentación: [Gap Audit](./CPI_OS_PRESENTATION_GAP_AUDIT.md) · [Storyboard](./CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md)*
