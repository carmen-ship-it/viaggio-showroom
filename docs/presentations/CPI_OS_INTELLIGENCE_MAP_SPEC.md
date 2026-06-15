# CPI-OS — Intelligence Map Specification

**Document type:** Presentation-only executive visualization spec (NOT a customer screen)  
**Product:** CPI-OS — Sistema Operativo de Inteligencia para Compras Consideradas  
**Signature visual:** The single frame that proves CPI-OS is an **operating system**, not a kiosk  
**Audience:** Propietarios, gerentes generales, directores comerciales, inversores (diligencia)  
**Reference dealership:** Viaggio Motors · Santa Cruz de la Sierra · GAC GS4 MAX  
**Format master:** 16:9 · 3840×2160 · sRGB display / Rec.709 deliverable  
**Idioma narración:** Español (Bolivia)  
**Fecha:** Junio 2026

---

## Propósito

El **Intelligence Map** es la visualización canónica que conecta tres ideas en una sola imagen animada:

1. **Cada visita es un hilo** — clientes, vehículos, objeciones, competidores, asesores, campañas, pruebas y ventas forman un grafo vivo.
2. **Cada hilo deja inteligencia** — no solo un lead en una lista.
3. **Cientos de hilos forman un activo institucional** — el moat que sobrevive rotación de personal y abre nuevas sucursales.

No es un embudo. No es un CRM. No es un diagrama de flujo de Salesforce. Es la capa de **sistema operativo** que une experiencia de piso, coordinación humana y memoria empresarial.

**Relacionado:**

- [CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md](./CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md) — arco narrativo completo (Actos 1–6)
- [CPI_OS_PRESENTATION_GAP_AUDIT.md](./CPI_OS_PRESENTATION_GAP_AUDIT.md) — brechas de producción; escena 6.3 y 5.3 dependen de este activo
- [CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md](./CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md) — vista temporal complementaria (14 días Mendoza)
- [CPI_OS_VISUAL_PRODUCTION_PLAN.md](./CPI_OS_VISUAL_PRODUCTION_PLAN.md) — estándares de grade, easing y QC
- [CPI_OS_EXECUTIVE_NARRATIVE_ES.md](./CPI_OS_EXECUTIVE_NARRATIVE_ES.md) — lenguaje de producto para propietarios

---

## Cast y héroe de demostración

| Entidad | Valor canónico | Rol en el mapa |
|---------|----------------|----------------|
| **Familia Mendoza** | Roberto (38, ingeniero agroindustrial) · Carla (36, co-decisora) · Mateo (8) · Sofía (5) | Nodo `customer` — cluster familiar |
| **Vehículo** | GAC GS4 MAX · versión GT · gris | Nodo `vehicle` — ancla del recorrido |
| **Objeción** | *"¿Es confiable? / ¿Hay repuestos en Santa Cruz?"* | Nodo `objection` · tipo `trust` |
| **Competidor** | Toyota Corolla Cross | Nodo `competitor` |
| **Asesor** | Javier Ríos · senior · 6 años en piso | Nodo `sales_advisor` |
| **Campaña** | `instagram_equipetrol_familia_jun2026` | Nodo `campaign` |
| **Prueba de manejo** | Sábado 15:00 · familiar · unidad gris | Nodo `test_drive` |
| **Venta** | Closed Won · 14 días desde anuncio | Nodo `sale` |
| **Ubicación** | Viaggio Motors · Av. Banzer · Equipetrol | Nodo `location` |
| **Activo de conocimiento** | Tour Carlos (confianza) · FAQ repuestos | Nodo `knowledge_asset` |

### Camino héroe (obligatorio en todas las versiones)

```
Familia Mendoza
    → GAC GS4 MAX
        → Objeción de confianza (marca china / repuestos)
            → Comparación Corolla Cross
                → Javier Ríos (handoff)
                    → Prueba de manejo familiar
                        → Venta cerrada
```

Luego **zoom out**: el camino Mendoza se integra en decenas, luego cientos de recorridos paralelos que forman patrones institucionales (objeciones recurrentes, competidores dominantes, asesores de alto cierre, campañas con mejor CPL).

---

## 1. Arquitectura visual

### 1.1 Topología del grafo

Modelo: **grafo dirigido acíclico por recorrido** (DAG por journey) con **super-nodos agregados** en niveles superiores.

```
                    ┌─────────────────────────────────────┐
  L3 INSTITUTIONAL  │  Pattern clusters · Moat shell      │
                    └──────────────────┬──────────────────┘
                                       │ aggregation edges
                    ┌──────────────────▼──────────────────┐
  L2 DEALERSHIP     │  Month layer · Location hub         │
                    └──────────────────┬──────────────────┘
                                       │
                    ┌──────────────────▼──────────────────┐
  L1 SHOWROOM DAY   │  Day layer · Campaign ingress       │
                    └──────────────────┬──────────────────┘
                                       │
                    ┌──────────────────▼──────────────────┐
  L0 SINGLE JOURNEY │  Mendoza hero path (7–11 nodes)     │
                    └─────────────────────────────────────┘
```

**Layout engine (producción):**

| Nivel | Layout | Referencia estética |
|-------|--------|---------------------|
| L0 | Path horizontal left→right con leve arco; hero path en centro | Palantir Gotham path view |
| L1 | Radial alrededor de nodo `location` | Bloomberg terminal radial |
| L2 | Force-directed 2.5D con clustering por tipo | Apple "connections" keynote |
| L3 | Esfera / domo de partículas con shell dorado | Tesla autonomy visualization |

### 1.2 Capas de composición (Z-order)

| Z | Capa | Contenido | Opacidad |
|---|------|-----------|----------|
| 0 | **Canvas** | `#0A0C10` con grain 2% · vignette suave | 100% |
| 1 | **Grid field** | Hex fino o dot grid · 8% opacity · parallax lento | 8% |
| 2 | **Edge field** | Aristas no-hero atenuadas | 15–40% |
| 3 | **Node field** | Nodos secundarios | 60–80% |
| 4 | **Hero path** | Mendoza chain · glow elevado | 100% |
| 5 | **Annotation layer** | Callouts, labels, métricas | 100% |
| 6 | **HUD chrome** | Zoom level badge · Viaggio watermark · CPI-OS mark | 90% |
| 7 | **Title safe** | Título escena · subtítulo acto | 100% |

### 1.3 Tipos de nodo

| `entityType` | Forma | Tamaño relativo (L0) | Color base | Glow |
|--------------|-------|----------------------|------------|------|
| `customer` | Círculo con avatar silueta · doble anillo si familia | 1.0× (48px @1080p) | `#E8EAED` fill · borde `#C8A96E` | Soft white 12px |
| `vehicle` | Hexágono · thumbnail GS4 | 1.2× | `#1A1D24` · acento `#C8A96E` | Gold pulse on focus |
| `objection` | Diamante | 0.85× | `#4A9B8E` (trust teal) | Teal bloom 16px |
| `competitor` | Cuadrado redondeado | 0.9× | `#3D4450` · borde ámbar `#D4A054` | Ámbar 8px |
| `sales_advisor` | Círculo · inicial "JR" | 0.95× | `#2A3040` · borde `#C8A96E` | Gold cuando activo |
| `campaign` | Pill / cápsula | 0.8× | Gradiente IG `#E1306C`→`#F77737` @ 40% sobre dark | — |
| `test_drive` | Triángulo equilátero (dirección) | 0.85× | `#4A9B8E` | Teal trail |
| `sale` | Estrella de 5 puntas · sólida | 1.1× | `#C8A96E` fill | Gold strong 24px |
| `location` | Pin / ancla hex grande | 1.4× (solo L1+) | `#1E2430` · borde `#C8A96E` | Radial gold |
| `knowledge_asset` | Documento / libro abierto | 0.75× | `#4A9B8E` @ 70% | Teal subtle |

**Estado del nodo (modifier):**

| Estado | Visual |
|--------|--------|
| `active` | Pulse 1.02× scale · 2s loop |
| `resolved` | Check micro-badge · glow teal |
| `lost` | Opacity 35% · borde rojo `#C45C5C` 1px |
| `aggregated` | Sin label individual · count badge |

### 1.4 Tipos de arista

| `edgeType` | Significado | Stroke | Animación | Ejemplo Mendoza |
|------------|-------------|--------|-----------|-----------------|
| `attribution` | Origen medible → resultado | Sólido 2px `#C8A96E` | Partículas doradas fluyen source→target | Campaign → Customer |
| `influence` | Comportamiento que cambia probabilidad | Discontinuo 1.5px `#8B9AAB` | Pulso lento | Objection → Compare |
| `resolution` | Objeción o duda resuelta por activo | Sólido 2px `#4A9B8E` | Flash teal al resolver | Knowledge Asset → Objection |
| `handoff` | Transferencia digital→humano | Sólido 3px gradient gold→white | Burst al handoff | Customer → Sales Advisor |
| `conversion` | Acción de embudo | Sólido 2.5px `#E8EAED` | Accelerate on zoom | Test Drive → Sale |
| `aggregation` | Roll-up a capa superior | Hairline 1px `#3D4450` | — | Journey → Day cluster |

**Regla de dirección:** flujo temporal izquierda→derecha en L0; radial outward en L1; inward collapse en L3.

---

## 2. Jerarquía de información (proyector a 3 metros)

Orden de lectura forzado — diseñar para sala de juntas con proyector 16:9, no para laptop.

| Prioridad | Elemento | Tamaño mínimo @4K | Tiempo en retina ejecutiva |
|-----------|----------|-------------------|----------------------------|
| **P0** | Título de nivel: *"Un recorrido"* / *"Un día en piso"* / *"Un mes"* / *"Inteligencia institucional"* | 72px Gotham Medium | 0–2s |
| **P1** | Hero path Mendoza (nodos + aristas doradas) | Nodos ≥56px equiv. | 2–15s |
| **P2** | Etiquetas de entidad en hero path solamente | 28px Inter Medium | On reveal |
| **P3** | Contador agregado: *"127 recorridos · 6 ventas · Semana 24"* | 36px tabular nums | Al zoom L1+ |
| **P4** | Patrones emergentes: *"38% objeción repuestos"* | 24px | L2–L3 |
| **P5** | Grid, nodos secundarios, chrome HUD | — | Ambiente |

**Anti-patrones (prohibidos):**

- Más de 7 labels legibles simultáneos en L0
- Leyenda de más de 4 ítems
- Funnel chart clipart o iconos de CRM
- Números sin contexto (*"42 leads"* sin atribución)
- Aristas cruzadas sobre el hero path

**Frase ancla (siempre visible L2+):**

> *"El conocimiento pertenece a la empresa — no al vendedor que se fue."*

---

## 3. Secuencia de animación (keynote)

**Duración total Version B:** 72s (rango aceptable 60–90s)  
**Sincronía:** locked a VO timestamps abajo  
**Easing global:** `cubic-bezier(0.4, 0, 0.2, 1)` — Apple standard per [Visual Production Plan](./CPI_OS_VISUAL_PRODUCTION_PLAN.md)

| Beat | Tiempo | Acción visual | Audio |
|------|--------|---------------|-------|
| **B0** | 0:00–0:04 | Fade from black · grid aparece · título *"Mapa de Inteligencia CPI-OS"* | Música pad · VO in |
| **B1** | 0:04–0:10 | Spawn nodo Campaign `instagram_equipetrol_familia_jun2026` · arista attribution a Customer | VO: origen campaña |
| **B2** | 0:10–0:16 | Customer Mendoza expande (Roberto + Carla micro-avatars) · Vehicle GS4 MAX materializa | VO: familia |
| **B3** | 0:16–0:22 | Objection trust pulsa teal · Knowledge Asset Carlos conecta resolution edge | VO: objeción |
| **B4** | 0:22–0:28 | Competitor Corolla Cross · influence edge a Compare moment | VO: comparación honesta |
| **B5** | 0:28–0:34 | Sales Advisor Javier · handoff burst desde Customer | VO: Javier |
| **B6** | 0:34–0:40 | Test Drive nodo · trail teal · Location Viaggio faint BG | VO: prueba |
| **B7** | 0:40–0:46 | Sale star ignites gold · hero path complete glow sweep L→R | VO: venta 14 días |
| **B8** | 0:46–0:52 | Camera pull back · **L0→L1** · 8 journeys same day appear | VO: zoom out día |
| **B9** | 0:52–0:60 | **L1→L2** · month aggregation · objection cluster thickens | VO: patrones |
| **B10** | 0:60–0:68 | **L2→L3** · institutional dome · hundreds of paths · moat shell | VO: activo institucional |
| **B11** | 0:68–0:72 | Hold L3 · CPI-OS logo lower-right · fade | Música resolve |

**Cámara (Version B):**

| Beat | Move | FOV |
|------|------|-----|
| B0–B7 | Dolly in lento + pan L→R siguiendo hero | 35mm equiv. |
| B8 | Zoom out 1.8× en 4s | 24mm |
| B9 | Orbit 15° + zoom 2.5× | 28mm |
| B10 | Crane up + fade to dome | 18mm wide |

---

## 4. Narrativa ejecutiva — guión VO (español Bolivia)

**Voz:** Documental premium · masculina o femenina · neutro cruceño  
**Nivel:** -3 dBFS · room tone SCZ  
**Palabras:** ~155 · ~72s a 128 wpm

---

**[0:00]**  
*Cada concesionaria genera datos. Pocas generan inteligencia.*

**[0:04]**  
*Este es el Mapa de Inteligencia de CPI-OS — no un tablero de leads. Un sistema operativo que ve el recorrido completo.*

**[0:10]**  
*Empezá con la familia Mendoza. Llegaron desde Instagram — campaña Equipetrol, junio 2026 — sin buscar un auto ese día.*

**[0:16]**  
*En el kiosco exploraron el GAC GS4 MAX. La duda no era el precio. Era la confianza: ¿es marca china? ¿Hay repuestos en Santa Cruz?*

**[0:22]**  
*El sistema registró la objeción, mostró respuestas probadas — el tour de Carlos — y cuando Roberto comparó con el Corolla Cross, no mintió: Toyota gana en reventa. GAC gana en garantía y espacio.*

**[0:28]**  
*Cuando pidieron asesor, Javier Ríos no llegó a preguntar "¿en qué te ayudo?". Llegó con contexto — en noventa segundos.*

**[0:34]**  
*Prueba de manejo familiar. Unidad gris. Sábado a las tres de la tarde. En Viaggio Motors, Equipetrol.*

**[0:40]**  
*Catorce días después: venta cerrada. Un hilo. Una historia. Una atribución de punta a punta.*

**[0:46]**  
*Pero ese sábado no fue solo la familia Mendoza. Fueron ocho recorridos en paralelo — cada uno dejando señales en el mismo mapa.*

**[0:52]**  
*En un mes: ciento veintisiete sesiones. Treinta y una pruebas. Seis ventas. Y un patrón que se repite — la objeción de repuestos en cuatro de cada diez visitas primerizas.*

**[0:60]**  
*Eso es inteligencia institucional. No vive en la cabeza de Javier. Vive en la empresa. Cuando Javier se va de vacaciones, el conocimiento se queda. Cuando abren Warnes, no empiezan de cero.*

**[0:68]**  
*CPI-OS. Un sistema operativo — no un kiosco.*

---

## 5. Requisitos de motion graphics

| Dimensión | Especificación |
|-----------|----------------|
| **Resolución master** | 3840×2160 · safe zone 10% todos los lados |
| **Frame rate** | 23.976 fps (film) · 60 fps opcional Version C live demo |
| **Color space** | Rec.709 · sRGB web deliverable |
| **Grade** | Canvas `#0A0C10` · Acto 6 +10% saturación golden · sin crush en negros |
| **Accent** | `#C8A96E` — attribution, sale, advisor active |
| **Trust** | `#4A9B8E` — objections resolved, test drive, knowledge |
| **Text UI** | Inter / SF Pro · labels `#E8EAED` · secondary `#8B9AAB` |
| **Title** | Gotham Medium o equivalent sans premium |
| **Easing** | `cubic-bezier(0.4, 0, 0.2, 1)` · overshoot máx 1.02× |
| **Partículas attribution** | Max 120 simultáneas · size 2–4px · gold `#C8A96E` @ 80% · speed 180px/s |
| **Partículas L3 dome** | Max 2000 instancias · GPU instancing · alpha falloff distance |
| **Glow** | Gaussian bloom 8–24px · threshold solo en hero y sale |
| **Grain** | 2% overlay fijo · no en UI text |
| **Export** | ProRes 422 HQ (master) · H.265 40Mbps (projection) · PNG sec para QC |

**Audio bed (Version B):**

| Elemento | Nivel |
|----------|-------|
| Música | -18 dBFS bajo VO |
| VO | -3 dBFS |
| Handoff burst SFX (B5) | -12 dBFS · 0.4s |
| Sale ignite (B7) | -14 dBFS · shimmer 0.6s |

---

## 6. Ubicación en presentación

### 6.1 Film / storyboard

| Acto | Escena | Uso del Intelligence Map | Duración |
|------|--------|--------------------------|----------|
| **5** | 5.3 Atribución ventas | **Inset PIP** — Sankey simplificado deriva del hero path L0 | 0:08–0:14 |
| **6** | 6.3 Memoria institucional | **Fullscreen** — Version B beats B8–B11 (zoom L1→L3) | 0:20 |
| **6** | 6.4 Futuro retail | **Flash frame** — L3 dome 1.5s en montaje | 0:02 |

**Reemplaza:** animación genérica "red de nodos" descrita en storyboard 6.3 — este spec es la fuente de verdad.

### 6.2 Executive deck (Keynote / PDF)

| Slide | Contenido |
|-------|-----------|
| Después de "¿Qué es CPI-OS?" | Version A static — L0 hero path |
| Antes de ROI / piloto | Version A — L3 institutional con métricas Semana 24 |
| Cierre sección moat | Quote + L3 still |

### 6.3 Investor diligence

| Material | Versión |
|----------|---------|
| Data room PDF | Version A L2 + L3 side-by-side |
| Live demo day | Version C interactive — presenter drives zoom |
| Due diligence FAQ | JSON schema appendix (sección 9) |

### 6.4 Gap audit closure

Cierra brechas documentadas en [CPI_OS_PRESENTATION_GAP_AUDIT.md](./CPI_OS_PRESENTATION_GAP_AUDIT.md):

- Rank **#14** — Institutional memory node network (6.3)
- Rank **#4** — Sankey Mendoza path (5.3) — L0 hero path es el upstream del Sankey
- Owner need: *"Proof CPI-OS is an asset, not SaaS"*

---

## 7. Niveles de zoom

| Nivel | Nombre | Nodos visibles | Métrica ancla | Transición |
|-------|--------|----------------|---------------|------------|
| **L0** | Single Journey | 7–11 (hero Mendoza) | *"14 días · Instagram → Venta"* | Default / double-click reset |
| **L1** | Showroom Day | ~8 journeys · 40–60 nodes | *"Sábado 10:30 · 8 recorridos activos"* | Zoom out 1.8× from L0 |
| **L2** | Dealership Month | ~120 journeys · 400–800 nodes | *"Semana 24 · 127 sesiones · 6 ventas"* | Cluster by entity type |
| **L3** | Institutional Moat | Aggregated clusters · 2k+ edges | *"720 nodos · 6 meses · patrones emergentes"* | Dome + particle shell |

**Comportamiento al cambiar nivel:**

- Hero path Mendoza permanece resaltado (gold) hasta L3, donde se convierte en *ejemplo iluminado* dentro del domo.
- Labels individuales se ocultan al pasar L1; solo clusters con count.
- Objection y Competitor clusters ganan grosor de arista proporcional a frecuencia.

---

# VERSION A — Static Slide (production-ready)

## A.1 Layout 16:9

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [HUD] CPI-OS Intelligence Map          L0 · Un recorrido    Viaggio   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ○ Campaign ──► ● Mendoza ──► ⬡ GS4 MAX ──◇ Trust obj ──► □ Corolla  │
│                      │                              │                    │
│                      └──────────► ○ Javier ──► △ Test ──► ★ Sale       │
│                                                                          │
│   [callout 1]                    [callout 2]              [callout 3]    │
│   Origen medible                 Objeción → activo        14 días        │
├──────────────────────────────────────────────────────────────────────────┤
│  El conocimiento pertenece a la empresa — no al vendedor que se fue.     │
└──────────────────────────────────────────────────────────────────────────┘
```

**Dimensiones Figma:** 1920×1080 frame · export @2× = 3840×2160

## A.2 Typography

| Rol | Font | Size @1080p | Weight | Color |
|-----|------|-------------|--------|-------|
| Slide title | Gotham | 36px | Medium | `#E8EAED` |
| Level badge | Inter | 14px | Semibold | `#C8A96E` |
| Node label | Inter | 16px | Medium | `#E8EAED` |
| Callout title | Inter | 12px | Semibold | `#8B9AAB` |
| Callout body | Inter | 18px | Regular | `#E8EAED` |
| Footer quote | Gotham | 20px | Book Italic | `#8B9AAB` |

## A.3 Color tokens (Figma styles)

| Token | Hex | Uso |
|-------|-----|-----|
| `canvas/base` | `#0A0C10` | Background |
| `accent/gold` | `#C8A96E` | Hero path · sale |
| `trust/teal` | `#4A9B8E` | Objection · resolution |
| `surface/elevated` | `#1A1D24` | Node fill |
| `border/subtle` | `#3D4450` | Grid · secondary edges |
| `text/primary` | `#E8EAED` | Labels |
| `text/secondary` | `#8B9AAB` | Callouts |
| `competitor/amber` | `#D4A054` | Competitor border |
| `campaign/ig` | `#E1306C` | Campaign node gradient start |

## A.4 Annotation callouts (obligatorios — L0 slide)

| # | Ancla | Título | Cuerpo |
|---|-------|--------|--------|
| 1 | Campaign → Customer | **Atribución** | Instagram Equipetrol → familia en showroom |
| 2 | Objection → Knowledge | **Resolución** | Objeción de confianza → tour Carlos + FAQ repuestos |
| 3 | Sale node | **Ciclo** | 14 días · QR → kiosco → Javier → cierre |

## A.5 Figma frame structure

```
📁 CPI_OS_Intelligence_Map.fig
├── 🎨 Styles (color tokens)
├── 📐 Components
│   ├── Node/Customer
│   ├── Node/Vehicle
│   ├── Node/Objection
│   ├── Node/Competitor
│   ├── Node/Advisor
│   ├── Node/Campaign
│   ├── Node/TestDrive
│   ├── Node/Sale
│   ├── Node/Location
│   ├── Node/KnowledgeAsset
│   ├── Edge/Attribution
│   ├── Edge/Influence
│   ├── Edge/Resolution
│   ├── Edge/Handoff
│   └── HUD/Chrome
├── 🖼 Slides
│   ├── A_L0_Hero_Path
│   ├── A_L1_Showroom_Day
│   ├── A_L2_Dealership_Month
│   └── A_L3_Institutional_Moat
└── 📤 Export / 3840x2160 PNG
```

## A.6 Variante L3 (segunda slide estática)

- Dome composition centrada
- Tres cluster labels: *"Objeciones"* · *"Competidores"* · *"Cierres"*
- Métricas: `127 sesiones` · `31 pruebas` · `6 ventas` · `38% repuestos`
- Mendoza path como hilo dorado tenue en el hemisferio frontal

---

# VERSION B — Animated Keynote Sequence (production-ready)

## B.1 Spec summary

| Campo | Valor |
|-------|-------|
| Duración | 72s (aceptable 60–90s) |
| Resolución | 3840×2160 |
| Herramienta primary | After Effects 2024+ |
| Plugin opcional | Cavalry (L3 particles) · Plexus (fallback) |

## B.2 Comp tree (After Effects)

```
CPI_OS_INTELLIGENCE_MAP_MASTER.aep
├── 01_PRECOMP_grid_field
├── 02_PRECOMP_nodes_library          ← all node types
├── 03_PRECOMP_edges_library          ← edge types + particle presets
├── 04_PRECOMP_L0_hero_mendoza        ← beats B1–B7
├── 05_PRECOMP_L1_showroom_day
├── 06_PRECOMP_L2_dealership_month
├── 07_PRECOMP_L3_institutional_moat
├── 08_PRECOMP_camera_rig
├── 09_PRECOMP_hud_titles
├── 10_MASTER_72s                     ← VO + music + SFX
└── 11_EXPORT_4K_PRORES
```

## B.3 Beat breakdown con timestamps VO

| Comp | In | Out | Dur | Contenido | VO sync |
|------|----|-----|-----|-----------|---------|
| `04_L0` | 0:00 | 0:46 | 46s | Hero path build | §4 líneas 1–7 |
| `05_L1` | 0:46 | 0:52 | 6s | 8 journeys spawn | §4 línea 8 |
| `06_L2` | 0:52 | 1:00 | 8s | Month clusters | §4 línea 9 |
| `07_L3` | 1:00 | 1:08 | 8s | Dome + moat | §4 línea 10 |
| `09_HUD` | 0:00 | 1:12 | 72s | Titles per level | — |
| `10_MASTER` | — | — | 72s | Audio mix | Full §4 |

## B.4 Camera keyframes

| Time | Position | Zoom | Rotation |
|------|----------|------|----------|
| 0:00 | Hero left third | 100% | 0° |
| 0:40 | Sale node center | 110% | 0° |
| 0:46 | Pull back | 55% | 0° |
| 0:52 | Orbit start | 40% | -15° |
| 1:00 | Crane up | 25% | -25° |
| 1:08 | Hold dome | 25% | -25° |

## B.5 Deliverables Version B

| Archivo | Formato |
|---------|---------|
| `CPI_OS_INTELLIGENCE_MAP_72s_v01.mov` | ProRes 422 HQ |
| `CPI_OS_INTELLIGENCE_MAP_72s_v01.mp4` | H.265 · 4K |
| `CPI_OS_INTELLIGENCE_MAP_72s_v01_es-BO.wav` | VO solo |
| `CPI_OS_INTELLIGENCE_MAP_72s_MUSIC.wav` | M&E |

---

# VERSION C — Interactive Demo (production-ready)

## C.1 Approach

**Recomendado:** React 19 + **React Three Fiber** (Three.js) con overlay HTML para labels.  
**Alternativa ligera:** Canvas 2D + D3-force (si no hay GPU en venue).  
**No usar:** Screenshot carousel — debe sentirse vivo.

## C.2 Interaction model

| Input | Acción |
|-------|--------|
| **Scroll / pinch** | Zoom L0↔L3 con snap en niveles |
| **Click nodo** | Panel lateral: entidad + métricas + link a timeline spec |
| **Click hero path** | Aislar Mendoza · dim 40% otros nodos |
| **Key 0–3** | Jump directo a L0–L3 |
| **Key R** | Reset camera |
| **Auto mode** | Reproduce beats B0–B11 (72s) sin input — para proyección |

## C.3 Zoom levels (camera)

| Level | `camera.z` | `nodeScale` | `maxLabels` | `physics` |
|-------|------------|-------------|-------------|-------------|
| L0 | 8 | 1.0 | 11 | Off |
| L1 | 14 | 0.7 | 8 clusters | Light |
| L2 | 22 | 0.4 | 4 clusters | Medium |
| L3 | 35 | 0.15 | 3 + HUD | Full dome |

## C.4 Props / data schema (React)

```typescript
interface IntelligenceMapProps {
  data: IntelligenceGraph;
  initialLevel?: 0 | 1 | 2 | 3;
  highlightPathId?: string;          // "journey-mendoza-gs4-jun2026"
  autoPlay?: boolean;
  onNodeSelect?: (nodeId: string) => void;
  onLevelChange?: (level: 0 | 1 | 2 | 3) => void;
  locale?: "es-BO";
  presentationMode?: boolean;        // hides debug, locks 60fps target
}
```

## C.5 Performance budget (live presentation)

| Métrica | Target | Máximo |
|---------|--------|--------|
| FPS | 60 | 45 mínimo |
| First paint | < 1.5s | 2.5s |
| Nodes L3 | 800 instanced | 1200 |
| Edges L3 | 2000 batched lines | 3000 |
| GPU memory | < 256MB | 512MB |
| Bundle (gzip) | < 180KB map chunk | 280KB |

**Fallback:** si FPS < 30 por 3s → degradar a Version A PNG sequence autoplay.

## C.6 Route propuesta (no implementar en este doc)

`/present/intelligence-map` — presentation-only · no index · `noindex` · auth opcional para diligence.

---

## 8. JSON schema — graph data

Archivo canónico propuesto: `docs/schemas/intelligence-graph.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://viaggio.bo/schemas/intelligence-graph.schema.json",
  "title": "IntelligenceGraph",
  "description": "Presentation graph for CPI-OS Intelligence Map — Version A/B/C",
  "type": "object",
  "required": ["graphId", "meta", "nodes", "edges", "heroPathId"],
  "properties": {
    "graphId": { "type": "string" },
    "meta": { "$ref": "#/$defs/GraphMeta" },
    "nodes": {
      "type": "array",
      "items": { "$ref": "#/$defs/GraphNode" },
      "minItems": 1
    },
    "edges": {
      "type": "array",
      "items": { "$ref": "#/$defs/GraphEdge" }
    },
    "heroPathId": {
      "type": "string",
      "description": "ID of the primary journey path for L0 highlight"
    },
    "clusters": {
      "type": "array",
      "items": { "$ref": "#/$defs/GraphCluster" }
    }
  },
  "$defs": {
    "GraphMeta": {
      "type": "object",
      "required": ["dealership", "period", "zoomLevel"],
      "properties": {
        "dealership": { "type": "string", "const": "viaggio-motors-scz" },
        "location": { "type": "string" },
        "period": { "type": "string", "description": "e.g. week-24-jun-2026" },
        "zoomLevel": { "type": "integer", "enum": [0, 1, 2, 3] },
        "metrics": {
          "type": "object",
          "properties": {
            "sessions": { "type": "integer" },
            "testDrives": { "type": "integer" },
            "sales": { "type": "integer" },
            "avgCycleDays": { "type": "number" }
          }
        }
      }
    },
    "EntityType": {
      "type": "string",
      "enum": [
        "customer",
        "vehicle",
        "objection",
        "competitor",
        "sales_advisor",
        "campaign",
        "test_drive",
        "sale",
        "location",
        "knowledge_asset"
      ]
    },
    "NodeState": {
      "type": "string",
      "enum": ["active", "resolved", "lost", "aggregated"]
    },
    "GraphNode": {
      "type": "object",
      "required": ["id", "entityType", "label"],
      "properties": {
        "id": { "type": "string" },
        "entityType": { "$ref": "#/$defs/EntityType" },
        "label": { "type": "string" },
        "sublabel": { "type": "string" },
        "state": { "$ref": "#/$defs/NodeState" },
        "position": {
          "type": "object",
          "properties": {
            "x": { "type": "number" },
            "y": { "type": "number" },
            "z": { "type": "number" }
          }
        },
        "metadata": { "type": "object" },
        "count": {
          "type": "integer",
          "description": "For aggregated nodes at L2+"
        }
      }
    },
    "EdgeType": {
      "type": "string",
      "enum": [
        "attribution",
        "influence",
        "resolution",
        "handoff",
        "conversion",
        "aggregation"
      ]
    },
    "GraphEdge": {
      "type": "object",
      "required": ["id", "source", "target", "edgeType"],
      "properties": {
        "id": { "type": "string" },
        "source": { "type": "string" },
        "target": { "type": "string" },
        "edgeType": { "$ref": "#/$defs/EdgeType" },
        "weight": { "type": "number", "minimum": 0, "maximum": 1 },
        "label": { "type": "string" },
        "temporalOrder": { "type": "integer" }
      }
    },
    "GraphCluster": {
      "type": "object",
      "required": ["id", "entityType", "nodeIds"],
      "properties": {
        "id": { "type": "string" },
        "entityType": { "$ref": "#/$defs/EntityType" },
        "label": { "type": "string" },
        "nodeIds": { "type": "array", "items": { "type": "string" } },
        "dominantPattern": { "type": "string" }
      }
    }
  }
}
```

### 8.1 Fixture hero — `intelligence-graph-mendoza-hero.json`

```json
{
  "graphId": "viaggio-week24-hero",
  "meta": {
    "dealership": "viaggio-motors-scz",
    "location": "Viaggio Motors · Equipetrol",
    "period": "week-24-jun-2026",
    "zoomLevel": 0,
    "metrics": { "sessions": 127, "testDrives": 31, "sales": 6, "avgCycleDays": 14 }
  },
  "heroPathId": "journey-mendoza-gs4-jun2026",
  "nodes": [
    { "id": "campaign-ig-equipetrol-jun2026", "entityType": "campaign", "label": "instagram_equipetrol_familia_jun2026" },
    { "id": "customer-mendoza", "entityType": "customer", "label": "Familia Mendoza", "sublabel": "Roberto · Carla" },
    { "id": "vehicle-gs4-max", "entityType": "vehicle", "label": "GAC GS4 MAX", "sublabel": "GT · Gris" },
    { "id": "objection-trust-china", "entityType": "objection", "label": "¿Es confiable?", "state": "resolved" },
    { "id": "knowledge-carlos-tour", "entityType": "knowledge_asset", "label": "Tour Carlos · Confianza" },
    { "id": "competitor-corolla-cross", "entityType": "competitor", "label": "Toyota Corolla Cross" },
    { "id": "advisor-javier-rios", "entityType": "sales_advisor", "label": "Javier Ríos" },
    { "id": "testdrive-mendoza-sat", "entityType": "test_drive", "label": "Prueba familiar", "sublabel": "Sáb 15:00" },
    { "id": "location-viaggio-equipetrol", "entityType": "location", "label": "Viaggio Motors" },
    { "id": "sale-mendoza-closed", "entityType": "sale", "label": "Venta cerrada", "state": "resolved" }
  ],
  "edges": [
    { "id": "e1", "source": "campaign-ig-equipetrol-jun2026", "target": "customer-mendoza", "edgeType": "attribution", "temporalOrder": 1 },
    { "id": "e2", "source": "customer-mendoza", "target": "vehicle-gs4-max", "edgeType": "influence", "temporalOrder": 2 },
    { "id": "e3", "source": "vehicle-gs4-max", "target": "objection-trust-china", "edgeType": "influence", "temporalOrder": 3 },
    { "id": "e4", "source": "knowledge-carlos-tour", "target": "objection-trust-china", "edgeType": "resolution", "temporalOrder": 4 },
    { "id": "e5", "source": "objection-trust-china", "target": "competitor-corolla-cross", "edgeType": "influence", "temporalOrder": 5 },
    { "id": "e6", "source": "customer-mendoza", "target": "advisor-javier-rios", "edgeType": "handoff", "temporalOrder": 6 },
    { "id": "e7", "source": "advisor-javier-rios", "target": "testdrive-mendoza-sat", "edgeType": "conversion", "temporalOrder": 7 },
    { "id": "e8", "source": "testdrive-mendoza-sat", "target": "sale-mendoza-closed", "edgeType": "conversion", "temporalOrder": 8 },
    { "id": "e9", "source": "location-viaggio-equipetrol", "target": "customer-mendoza", "edgeType": "attribution", "temporalOrder": 0 }
  ]
}
```

---

## 9. Screenshot y asset requirements

| Asset ID | Descripción | Tamaño | Escena / Uso | Prioridad |
|----------|-------------|--------|--------------|-----------|
| **IM-01** | L0 hero path PNG still | 3840×2160 | Deck · thumbnail | P0 |
| **IM-02** | L3 institutional dome PNG | 3840×2160 | Deck moat · diligence | P0 |
| **IM-03** | Version B 72s ProRes | 4K | Storyboard 6.3 | P0 |
| **IM-04** | Node component sheet (all types) | 2048×2048 | Figma handoff | P0 |
| **IM-05** | Edge particle preset preview | 1920×1080 | AE reference | P1 |
| **IM-06** | Mendoza avatar silhouettes | SVG | Customer node | P1 |
| **IM-07** | GS4 MAX thumbnail hex | 512×512 | Vehicle node | P1 |
| **IM-08** | JSON fixture committed | — | `docs/fixtures/intelligence-graph-mendoza-hero.json` | P0 |
| **IM-09** | Sankey derivative still (from L0) | 3840×2160 | Storyboard 5.3 inset | P0 |
| **IM-10** | Split: Map L0 + Timeline 14d | 3840×2160 | Cross-link [Timeline Spec](./CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md) | P1 |

**Directoría de entrega:**

```
docs/presentations/assets/intelligence-map/
├── IM-01_L0_hero_4k.png
├── IM-02_L3_moat_4k.png
├── IM-03_animation_72s.mov
├── IM-04_node_sheet.png
└── fixtures/
    └── intelligence-graph-mendoza-hero.json
```

---

## 10. QC checklist — antes del estreno ejecutivo

### Visual

- [ ] Hero path Mendoza trazable sin pausa en ≤ 8s (L0)
- [ ] Máximo 7 labels legibles en L0 @ 3m proyector
- [ ] Color canvas exacto `#0A0C10` — no navy genérico
- [ ] Gold `#C8A96E` solo en attribution / sale / active advisor — no decorativo
- [ ] Trust teal `#4A9B8E` en objection resolution — no confundir con "success green" CRM
- [ ] Sin iconografía Salesforce / funnel clipart / pipeline stages
- [ ] "Ellos ganan en reventa" **no** aplica aquí — es compare UI; mapa muestra nodo competidor sin juicio visual falso

### Narrativa

- [ ] Campaña `instagram_equipetrol_familia_jun2026` nombrada en VO y nodo
- [ ] Javier Ríos — no "vendedor genérico"
- [ ] 14 días ciclo mencionado en B7 y callout 3
- [ ] Frase moat: *"El conocimiento pertenece a la empresa…"* en L2+
- [ ] Cierre: *"sistema operativo — no un kiosco"*

### Técnico

- [ ] Safe zone 10% en todos los textos
- [ ] 72s Version B sync VO ±2 frames
- [ ] Partículas ≤ budgets §5
- [ ] Version C ≥ 45 FPS en MacBook Pro M1 / projector 1080p
- [ ] JSON fixture valida contra schema §8
- [ ] Cross-link a Timeline Spec funcional (relative path)

### Integración presentación

- [ ] Storyboard 6.3 usa IM-03 — no animación genérica previa
- [ ] Gap audit items #4 y #14 marcados resueltos cuando IM-01+IM-03 entregados
- [ ] Executive deck incluye IM-01 + IM-02
- [ ] Datos piloto marcados "orientativo" si se muestran métricas L2

### Audio

- [ ] VO es-BO · -3 dBFS
- [ ] Música no compite con VO
- [ ] Handoff SFX en B5 presente y no intrusivo

---

## 11. Control de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 15 Jun 2026 | Spec inicial — arquitectura, 3 versiones producción, schema, QC |

---

*CPI-OS · Viaggio Motors · Santa Cruz, Bolivia · Junio 2026*
