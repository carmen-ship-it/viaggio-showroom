# MVP Content Readiness — GAC GS4 MAX Showroom

**Documento evaluado:** `docs/content/gs4-max-master-content.md`  
**Alcance:** Suficiencia del contenido maestro como **fuente primaria** para construir las 10 experiencias MVP del showroom digital Viaggio Motors  
**Perspectivas:** Product Owner · Creative Director · Gerente General de Concesionario · UX Architect  
**Fecha:** junio 2026  
**Supuestos MVP:** Demo kiosk Viaggio (Santa Cruz primario), rutas S22 → journeys → themes → S25 → compare → test drive, personas Carlos / Sofía / Diego

---

## Veredicto ejecutivo

El contenido maestro es **sólido como capa estratégica de copy comercial** — hero, specs, FAQ, objeciones y comparativas cualitativas están bien desarrollados. **No es suficiente por sí solo** para implementar el MVP showroom: faltan estructura por pantalla, guiones de journey por persona, datos comparativos fila a fila, señales de confianza verificables, requisitos visuales explícitos y contenido de conversión operativo (financiamiento, formulario, logística).

| Dimensión transversal | Readiness | Comentario |
|----------------------|-----------|------------|
| Copy comercial / mensajes | **8/10** | Hero, propuesta de valor, objeciones |
| Estructura implementable (bloques, rutas, IA) | **3/10** | Prosa continua; sin mapa pantalla → bloque |
| Persona journeys (Carlos / Sofía / Diego) | **4/10** | Tono genérico; guiones viven en docs separados |
| Proof points verificables | **5/10** | Claims sin fecha C-NCAP, sin testimonios, sin cifras locales |
| Requisitos visuales | **2/10** | Casi ausentes en el maestro |
| Contexto Bolivia profundo | **6/10** | Ciudades y precios USD sí; altitud, barrios, BOB no |
| Señales de confianza | **4/10** | Viaggio mencionado; sin fotos, videos, owners |
| Triggers emocionales | **5/10** | Hero variants sí; lifestyle débil en maestro |
| Oportunidades de conversión | **5/10** | Test drive copy sí; sin cuotas, campos, WhatsApp |

### Readiness global: **6.2 / 10**

**Interpretación:** El equipo puede **comenzar implementación de copy** en S22, FAQ, Warranty y Safety con adaptación mínima. **No debe** lanzar Carlos / Sofía / Diego journeys, Compare Detail ni Test Drive Experience usando solo el maestro — requiere sprint de contenido + assets + validación Viaggio antes de demo público.

**Activos complementarios existentes (fuera del maestro, no evaluados como primarios):**
- `docs/content/carlos-narration.md`, `sofia-narration.md`, `diego-narration.md` — enriquecen journeys pero no están integrados al maestro
- `docs/assets/asset-acquisition-plan.md` — define visuales MVP; no referenciados en maestro

---

## Evaluación por experiencia

### 1. S22 — Hero Experience

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **7 / 10** |
| **Qué cubre el maestro** | Titular «Maneja el Cambio», subtítulo, 4 variantes hero, 8 badges de stats, precios USD, garantía/mantenimiento en línea de apoyo |
| **Riesgos** | Sin hot-spots definidos (Motor · Interior · Maletero); sin precio BOB; conflicto pantalla 10,1" vs 12,3" en otros docs; sin dirección visual parallax/video; tagline alternativo no unificado |
| **Recomendaciones** | Añadir al maestro: 3 hot-spots con headline + topicId destino; precio BOB con disclaimer TC; spec visual «hero safe zone»; resolver tamaño pantalla con Viaggio; una variante hero default + reglas A/B por path (primera vez vs investigado) |

**Perspectivas clave**
- **PO:** Stats listos para key stat strip; falta `priceFrom` BOB y contentVersion
- **Creative:** Variantes emocional/racional/familia/valor son buenas; falta storyboard 15–30s S01 loop y still hero obligatorio
- **GM:** Precio USD presente; cliente pregunta cuota — hero no ancla valor total de propiedad
- **UX:** Necesita jerarquía tipográfica explícita (H1, subhead, stat pills, CTA primario/secundario) y reglas de emergencia post-trust-threshold

---

### 2. Carlos Journey (Tour de Confianza)

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **5 / 10** |
| **Qué cubre el maestro** | Motor, mantenimiento, garantía, seguridad ADAS, estructura, Viaggio servicio, narrativas asesor, frases honestas compare vs chinos |
| **Riesgos** | Sin 8 pasos secuenciados con duración; sin voz Carlos por paso en el maestro; mantenimiento sin costo sin detalle de ítems; sin topic transmisión; turbo+altitud FAQ superficial; tono mezcla asesor comercial con mecánico |
| **Recomendaciones** | Incorporar al maestro (o anexo journey): mapa 8 pasos = topic + script Carlos 35–55s + stat callout + CTA intermedio; tabla «qué incluye mantenimiento sin costo»; bloque altitud La Paz con límites honestos; unificar transmisión 7WDCT Bolivia |

**Perspectivas clave**
- **PO:** Tour Trust en JSON tiene 8 pasos pero topics vacíos — maestro no cierra el loop paso → copy
- **Creative:** Carlos necesita avatar intro + pausas técnicas; maestro no define momentos de «honest limitation»
- **GM:** Objeción reventa y repuestos parcialmente en FAQ, no en journey Carlos
- **UX:** Cada paso requiere: título, narration block, optional stat, progress 1/8, exit «¿Es confiable?» → S25

---

### 3. Sofía Journey (Tour de Descubrimiento)

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **4 / 10** |
| **Qué cubre el maestro** | Tecnología (pantalla, CarPlay, ADiGO, modos), confort (cuero, techo, espacio), puntos conversación premium |
| **Riesgos** | Sin contenido diseño exterior/interior emocional; Sofía guion completo está fuera del maestro; tour desire necesita 7 pasos — maestro no los define; Android Auto no confirmado; lenguaje sensorial insuficiente para deseo |
| **Recomendaciones** | Añadir sección «Diseño» al maestro: parrilla, faros LED, proporciones, interior premium; 7 pasos Sofía con arco deseo → tecnología → confort → premium → CTA test drive; confirmar o eliminar Android Auto; variantes cortas kiosk 15–20s por paso |

**Perspectivas clave**
- **PO:** Theme technology existe; theme design/value ausentes en content pack
- **Creative:** Gap más grande del MVP — hero emocional de producto vive en guion Sofía, no en maestro
- **GM:** Sofía no debe cotizar — maestro cumple; debe derivar a asesor explícitamente en cierre journey
- **UX:** Desire path no debe preceder trust para first-time visitors — maestro no define gating rules

---

### 4. Diego Journey (Tour Familiar)

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **5 / 10** |
| **Qué cubre el maestro** | Escenarios Bolivia (tráfico, carretera, niños, fin de semana), argumentos familiares, narrativa asesor, test drive familiar en CTAs |
| **Riesgos** | Solo 4 escenarios tabla — tour planificado tiene 7 pasos; sin ISOFIX, aire trasero SCZ, colegio/Doble Vía, Warnes; riesgo legal si se usa narrativa «propietario 1 año» de guion Diego externo; familia usa `structure` topic — no family-safety dedicado |
| **Recomendaciones** | Expandir maestro con 7 micro-historias Diego alineadas a tour; ISOFIX + climatización trasera + maletero carrito; regla explícita: escenarios = ilustrativos hasta testimonial real; CTA «traé a tu familia» en cada paso 3+ |

**Perspectivas clave**
- **PO:** Tour family JSON = 2/7 pasos — maestro no alcanza para completar tour MVP
- **Creative:** Diego necesita fotos lifestyle Santa Cruz — maestro no lista assetIds
- **GM:** Decisión grupal es norma — maestro menciona test drive grupal pero no S33 share summary
- **UX:** Journey Diego debe enlazar safety + family themes sin repetir copy Carlos verbatim

---

### 5. Safety Experience (Theme Seguridad)

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **7 / 10** |
| **Qué cubre el maestro** | Pasiva (8 airbags, C-NCAP, estructura UHSS), activa (AEB, ACC, LDW, 360°), puntos conversación, frases cierre, cross-link test drive |
| **Riesgos** | Sin diagrama airbags / lista posiciones; sin fecha o versión probada C-NCAP; ADAS lista incompleta vs posible equipamiento Bolivia; sin topic family-safety (ISOFIX); sin visual spec C-NCAP badge |
| **Recomendaciones** | Añadir: configuración 8 airbags nominal; link/badge C-NCAP; disclaimer ADAS «no reemplaza atención»; topic ISOFIX; fila compare seguridad con valores exactos Corolla Cross |

**Perspectivas clave**
- **PO:** ADAS es el topic JSON más desarrollado — maestro alimenta feature_grid copy
- **Creative:** Necesita split layout pasivo vs activo + iconografía sistema por sistema
- **GM:** Fuerte diferenciador vs competencia — priorizar prueba visual 360° en demo
- **UX:** Safety theme = 2 topics (adas, structure) — maestro debe separar copy por topicId, no sección única

---

### 6. Technology Experience (Theme Tecnología)

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **6 / 10** |
| **Qué cubre el maestro** | Pantalla, CarPlay, ADiGO Space/Pilot, 7WDCT, modos conducción, hardware LED/18"/sensores |
| **Riesgos** | Un solo bloque narrativo; sin descripción UX por feature (qué ve el usuario al usar ACC); ADiGO naming puede confundir vs «control crucero adaptativo»; sin Android Auto; sin hot-spot dashboard image spec |
| **Recomendaciones** | Desglosar 4–6 feature cards con título + 1 frase beneficio + 1 frase «cómo se usa»; pantalla confirmada Bolivia; captura UI 360° en pantalla central; modos conducción con nombres exactos en español Bolivia |

**Perspectivas clave**
- **PO:** tech-overview JSON = 1 frase — maestro necesita split en blocks implementables
- **Creative:** Sofía voice para technology — importar tono desde guion externo al maestro
- **GM:** «Full equipo» es argumento venta — repetir en cada feature card footer
- **UX:** Technology theme debe cross-link Safety (ADAS overlap) sin duplicar — maestro no define canonical source

---

### 7. Warranty Experience (Theme Garantía + S29)

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **7 / 10** |
| **Qué cubre el maestro** | Tabla 5 años / 150.000 km + 3 años mantenimiento sin costo; qué comunicar; puntos conversación; disclaimer; showrooms 4 ciudades; postventa Viaggio |
| **Riesgos** | Sin desglose ítems mantenimiento sin costo (aceite, filtros, mano obra); sin exclusiones garantía; sin PDF términos; sin foto taller; maintenance y warranty duplican mensaje sin IA clara |
| **Recomendaciones** | Tabla dual con íconos: Garantía vs Mantenimiento; checklist servicios incluidos (pendiente Viaggio); link documento oficial; integrar S24 trust story Viaggio+GAC en anexo maestro |

**Perspectivas clave**
- **PO:** S29 Warranty Deep-Dive necesita más profundidad que theme landing — maestro trata ambos igual
- **Creative:** Visual timeline «Año 1–5» fuerte para kiosk
- **GM:** Diferencial #1 vs Toyota — enfatizar en primer scroll warranty screen
- **UX:** Split warranty-terms vs viaggio-service vs maintenance topics — maestro mezcla los tres

---

### 8. FAQ Experience (S25 — Objections & FAQ)

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **8 / 10** |
| **Qué cubre el maestro** | 15 FAQ categorizadas; 8 objeciones con respuesta + prueba sugerida; tono honesto en reventa y marca china |
| **Riesgos** | Sin orden de prioridad accordion MVP (top 5 demo); sin categorías UI; faltan FAQs P0 Bolivia: tiempo repuestos, bancos financiamiento, altitud profunda; objeciones no taggeadas por persona (Carlos vs Sofía) |
| **Recomendaciones** | Marcar 5 FAQ + 5 objeciones «MVP demo»; añadir repuestos/bancos/seguro orientativo; mapear cada objeción → pantalla destino (compare, warranty, test drive); JSON schema faq item en apéndice maestro |

**Perspectivas clave**
- **PO:** Mejor sección del maestro para despliegue directo a S25
- **Creative:** Accordion con icono objeción + respuesta corta + «profundizar» link
- **GM:** «Prueba sugerida» por objeción es gold para capacitación vendedores — preservar en UI
- **UX:** First-time path debe surface S25 antes de compare — maestro no define pero FAQ está listo

---

### 9. Comparison Experience (S11 / S12)

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **6 / 10** |
| **Qué cubre el maestro** | Tablas cualitativas vs Corolla Cross, Tucson/Sportage, SUVs chinos; frases comparativas; notas honestas «ellos ganan» reventa; 7 diferenciales transversales |
| **Riesgos** | Sin valores fila a fila implementables (anchorValue / targetValue / verdict); sin filas Precio y Consumo con números; solo 1 competidor detallado; sin fecha actualización compare; airbags en template legacy decía 6 — maestro dice 8 |
| **Recomendaciones** | Exportar 3 compare targets completos: Corolla Cross (P0), Tiggo 7 o Haval (P1), Tucson (P1); mínimo 5 categorías × 4 filas con verdict; fila reventa verdict target_wins explícito; disclaimer «specs competidor verificados [fecha]» |

**Perspectivas clave**
- **PO:** Compare Detail renderer necesita datos estructurados — maestro es narrativo, no schema-ready
- **Creative:** Badges «Nosotros ganamos» / «Ellos ganan» requieren copy corto por fila — parcialmente presente
- **GM:** Carlos persona en filas seguridad/garantía — maestro no asigna personaId
- **UX:** S12 exit CTA → S34 test drive — maestro no conecta compare win moment a conversión

---

### 10. Test Drive Experience (S14 / S34)

| Campo | Evaluación |
|-------|------------|
| **Readiness** | **7 / 10** |
| **Qué cubre el maestro** | Invitación, 4 variantes contexto, guía 6 puntos durante prueba, antes/después, CTAs, cierre post-prueba |
| **Riesgos** | Sin copy S34 logística (duración, ruta demo, política familia, documentos); sin labels formulario S14; sin mensaje confirmación WhatsApp; sin horarios showroom en CTA; sin versión 4x2 vs AWD selector copy |
| **Recomendaciones** | Añadir bloque «Logística test drive Viaggio»: 20–30 min, licencia, acompañantes bienvenidos, ruta Banzer sugerida; field labels ES; post-submit message; integrar con dealership.json real |

**Perspectivas clave**
- **PO:** conversion-strategy pide S34 antes S14 — maestro solo cubre mitad del flujo
- **Creative:** Variantes invitación listas para cards pre-formulario
- **GM:** «Sin presión» alineado a premium — bien logrado
- **UX:** Checklist 6 puntos = tour script asesor humano — considerar printable / staff tablet sync

---

## Matriz resumen por experiencia

| Experiencia | Readiness | Bloqueante MVP | Esfuerzo para cerrar |
|-------------|-----------|----------------|---------------------|
| S22 Hero | 7 | Medio | 1–2 días copy + assets P0 |
| Carlos Journey | 5 | **Alto** | 1 sprint (guiones + topics) |
| Sofía Journey | 4 | **Alto** | 1 sprint (diseño + 7 pasos) |
| Diego Journey | 5 | **Alto** | 1 sprint (7 escenarios + ISOFIX) |
| Safety | 7 | Bajo | 2–3 días + diagrama |
| Technology | 6 | Medio | 3–4 días feature cards |
| Warranty | 7 | Medio | 2 días + validación Viaggio |
| FAQ | 8 | Bajo | 1–2 días estructurar JSON |
| Comparison | 6 | Medio | 3–5 días research + 3 targets |
| Test Drive | 7 | Medio | 2 días logística + form copy |
| **Promedio** | **6.2** | — | **~4–6 semanas** contenido + assets |

---

## 1. Contenido faltante (transversal)

| ID | Gap | Impacto MVP | Prioridad |
|----|-----|-------------|-----------|
| MC-01 | Mapa pantalla → sección maestro → topicId / block type | Implementación | **P0** |
| MC-02 | Guiones journey 8 + 7 + 7 pasos integrados al maestro | Carlos / Sofía / Diego | **P0** |
| MC-03 | Precio BOB + tipo de cambio disclaimer | Hero, compare, FAQ | **P0** |
| MC-04 | Financiamiento: bandas cuota 24/36/48 (aunque S26 no está en lista, conversion lo exige) | Test drive → cierre | **P0** |
| MC-05 | Compare estructurado fila a fila (3 competidores) | S11/S12 | **P0** |
| MC-06 | Detalle mantenimiento sin costo (ítems incluidos) | Carlos, Warranty | **P0** |
| MC-07 | S24 Viaggio & GAC Trust Story (showroom, Grupo Roda, historia local) | Trust antes compare | **P0** |
| MC-08 | Topic diseño exterior/interior (Sofía) | Desire journey | **P1** |
| MC-09 | Topic altitud La Paz / El Alto técnico | FAQ, Carlos | **P0** |
| MC-10 | Topic family-safety (ISOFIX, airbags traseros) | Diego, Safety | **P0** |
| MC-11 | specs.json equivalente en maestro (tabs S10) | Power users | **P1** |
| MC-12 | TCO / reventa topic honesto | Compare, FAQ | **P1** |
| MC-13 | Formulario test drive: labels, validación, confirmación | S14 | **P0** |
| MC-14 | S34 logística test drive completa | Test drive | **P0** |
| MC-15 | dealership operativo: WhatsApp, horarios, dirección Banzer | Todos CTAs | **P0** |

---

## 2. Proof points faltantes

| Proof point | En maestro | Necesario para MVP |
|-------------|------------|-------------------|
| C-NCAP 5 estrellas con fecha / versión probada | Mención | Badge + link verificable |
| Configuración 8 airbags (posiciones) | Conteo | Diagrama o lista |
| Unidades GS4/GAC vendidas Bolivia | No | Cifra Viaggio/GAC aprobada |
| Años GAC en Bolivia | Vago | Dato concreto |
| Testimonial propietario local | No | Mínimo 1 quote o video |
| Taller Viaggio + técnico certificado | Mención | Foto/video |
| Showroom Viaggio real | Direcciones | Fotos locales |
| Tiempo entrega repuestos | No | FAQ con rango honesto |
| Logos bancos / financieras partner | No | S26 + FAQ financiamiento |
| Documento garantía PDF | No | Link S29 |
| Primicia regional / Expocruz | Mención breve | Línea trust marketing |
| Consumo real km/l Bolivia | No en maestro | 9–10 km/l ciudad con disclaimer |

---

## 3. Requisitos visuales faltantes (no definidos en maestro)

El maestro es **text-only**. Para MVP kiosk, cada experiencia requiere assets explícitos (ver `docs/assets/asset-acquisition-plan.md`).

| Prioridad | Asset / visual | Experiencias |
|-----------|----------------|--------------|
| **P0** | `gs4-max-hero-01`, hero video loop S01 | S22, S03 |
| **P0** | `gs4-max-int-dashboard`, `gs4-max-adas-hero` | Technology, Safety, S22 hot-spot |
| **P0** | `gs4-max-int-rear-seats` | Diego, Family |
| **P0** | Diagrama 8 airbags o C-NCAP badge | Safety |
| **P0** | `gs4-max-compare-anchor`, `compare-corolla-cross` | Comparison |
| **P0** | Avatar Carlos / Sofía / Diego | All journeys |
| **P0** | Fotos showroom + taller Viaggio | Warranty, S24 trust |
| **P1** | `gs4-max-int-360-display`, pano roof | Technology, Safety demo |
| **P1** | Lifestyle Santa Cruz (Warnes, familia) | Diego journey |
| **P1** | Timeline garantía ilustrada | Warranty |
| **P2** | Color swatches, hero night | Post-MVP |

**Recomendación Creative Director:** Añadir al maestro un apéndice «Media binding» — tabla topicId → mediaId → alt text → crop safe zone.

---

## 4. Contexto local Bolivia faltante o superficial

| Elemento | Estado en maestro | Acción |
|----------|-------------------|--------|
| 4 ciudades + direcciones | ✅ Completo | Mantener actualizado |
| Precio USD | ✅ | Añadir BOB |
| Santa Cruz rutas (Doble Vía, Equipetrol, Warnes) | Parcial (narrativa asesor) | Diego journey explícito |
| Barrios SCZ (Plan 3000, Urubó, Equipetrol) | No | Testimonial metadata |
| La Paz / El Alto altitud | FAQ genérico | Topic técnico Carlos |
| Calor 35 °C+ / aire trasero | Implícito | Diego children block |
| Polvo / filtros temporada seca | No | Carlos maintenance |
| Financiamiento bancos locales | No | FAQ + S26 |
| Seguro vehicular Bolivia | No | FAQ orientativo |
| Combustible 92 vs 87 | Parcial | FAQ provincia |
| Eslogan «Maneja el Cambio» vs tagline familia | Conflicto | Unificar |
| Consumo km/l real vs WLTC | Solo WLTC global | Doble presentación honesta |
| Cochabamba / Fexco lanzamiento | Mención indirecta | Trust signal opcional |

---

## 5. Señales de confianza faltantes

| Señal | MVP crítico | Fuente sugerida |
|-------|-------------|-----------------|
| Testimonial ×1 mínimo | Sí | Cliente Viaggio verificado |
| Foto showroom Banzer | Sí | Shoot local |
| Video taller / servicio | Sí | Viaggio marketing |
| Grupo Roda / 100% boliviano | Sí | Ampliar S24 |
| GAC global scale (millones unidades) | Sí | brand-heritage con cifra |
| Viaggio exclusivo distribuidor | Parcial | Logo lockup co-brand |
| WhatsApp número real | Sí | Ops Viaggio |
| Partner financiero | Sí | Finance desk |
| Honest «ellos ganan» en compare | Sí | Ya en maestro — implementar |
| Certificado garantía / sello GAC | Deseable | PDF oficial |

**Riesgo GM:** Lanzar MVP sin testimonial + foto local = «folleto digital de marca china», no showroom Viaggio.

---

## 6. Triggers emocionales faltantes

| Trigger | Presente | Ausente |
|---------|----------|---------|
| Primera impresión premium (Sofía) | Hero variants | Diseño sensorial, «presencia» |
| Protección familiar | Safety copy | Visual niños + ISOFIX story |
| Orgullo local (Viaggio boliviano) | Mención | Narrativa emocional Grupo Roda |
| Alivio económico (mantenimiento cubierto) | Tabla warranty | «3 años sin pagar servicio» hero moment |
| Control / margen (ADAS) | Funcional | Demo 360° «salvó en cochera» |
| Pertenencia (familia decide junta) | Test drive grupal | S33 share «mostrale a tu esposa» |
| Aspiration (AWD fin de semana) | Escenario tabla | Visual ruta + modo off-road |
| Curiosidad tecnológica | ADiGO naming | UI screenshot CarPlay conectado |

---

## 7. Oportunidades de conversión faltantes

| Momento | En maestro | Falta |
|---------|------------|-------|
| Post-hero trust exit | No | CTA «¿Es confiable?» → S25 |
| Post-safety / post-warranty | Frases cierre | Contextual CTA emergente |
| Compare «nosotros ganamos» row | Tablas | CTA inline «Comprobalo en test drive» |
| FAQ objeción resuelta | Prueba sugerida | Button → acción (S34, S12, topic) |
| Fin de Carlos tour | No | Soft CTA compare o test drive |
| Fin Sofía tour | CTA test drive en guion externo | Integrar al maestro |
| Fin Diego tour | Invitación familia | Link S33 share |
| Post test drive submit | Cierre copy | Confirmación + WhatsApp + consultant S36 |
| Economics path | No | S26 cuota — top objeción Bolivia |
| Idle / resume | No | S37 token copy |

---

## P0 — Content gaps (bloquean demo MVP creíble)

1. **Resolver conflictos de datos** — pantalla 10,1" vs 12,3", airbags 8 everywhere, transmisión 7WDCT única, precio BOB+USD, AWD metadata  
2. **Integrar guiones persona al maestro** — Carlos 8 pasos, Sofía 7, Diego 7 (o anexo `gs4-max-journey-scripts.md` referenciado como parte del bundle primario)  
3. **Compare Corolla Cross estructurado** — JSON-ready rows con verdicts honestos  
4. **FAQ/objeciones → schema S25** — top 5 + 5 MVP demo ordenados  
5. **Mantenimiento sin costo detallado** — validado por Viaggio finance/service  
6. **S24 trust story** — Viaggio + GAC + foto local (copy nuevo)  
7. **Test drive S34 + S14 copy** — logística + form labels + confirmación  
8. **dealership.json real** — WhatsApp, Banzer, horarios  
9. **Media P0 binding table** — hero, dashboard, rear seats, compare, avatars  
10. **Testimonial ×1** — quote verificado con nombre/barrio/occupation  
11. **Topic altitud + repuestos FAQ** — objeciones #1 post-compra Bolivia  
12. **Financiamiento orientativo BOB** — aunque pantalla economics; conversion path lo requiere  

---

## P1 — Content gaps (completan arco de decisión)

1. Compare Tiggo 7 / Haval + Hyundai Tucson completos  
2. Sección Diseño Sofía en maestro + topic dedicado  
3. Topic transmisión 7WDCT (Carlos)  
4. Topic cargo / maletero 638 L  
5. Topic climatización altitud/calor  
6. TCO / reventa honesto  
7. Family-safety ISOFIX  
8. specs tab content (motor, dimensiones, equipamiento, consumo)  
9. S33 family share summary copy  
10. Trade-in intent (S27) una página  
11. Android Auto confirmar o eliminar globalmente  
12. Narrativa cambio precio $34.900 → $42.900  
13. Seguro orientativo FAQ  
14. Barrios/rutas SCZ en Diego  
15. Apéndice media binding completo  

---

## Recommended content sprint backlog

### Sprint 0 — Validación (3–5 días, paralelo, bloqueante)

| # | Entrega | Owner | Output |
|---|---------|-------|--------|
| S0-1 | Ficha Bolivia definitiva GAC/Viaggio | GAC producto | Pantalla, ADAS lista, transmisión, colores, Android Auto |
| S0-2 | Mantenimiento sin costo ítem por ítem | Viaggio servicio | Tabla incluido/excluido |
| S0-3 | Bandas financiamiento BOB 24/36/48 | Viaggio finance | JSON ranges + disclaimer |
| S0-4 | WhatsApp + dirección + horarios reales | Viaggio ops | dealership.json |
| S0-5 | Resolver conflictos maestro vs JSON | Content + PO | contentVersion bump |

### Sprint 1 — MVP copy deployable (1 semana)

| # | Entrega | Fuente | Pantallas |
|---|---------|--------|-----------|
| S1-1 | Hero pack: hot-spots, BOB price, CTA rules | Maestro § hero | S22 |
| S1-2 | FAQ + objeciones JSON (10 MVP items) | Maestro § FAQ | S25 |
| S1-3 | Warranty + maintenance expanded topics | Maestro § garantía | S29, themes |
| S1-4 | Safety topics split: adas + structure + ISOFIX | Maestro § seguridad | S08 |
| S1-5 | Technology feature cards (6) | Maestro § tecnología | S08 |
| S1-6 | Compare Corolla Cross complete | Maestro § compare | S11, S12 |
| S1-7 | Test drive + logistics copy | Maestro § test drive | S14, S34 |
| S1-8 | S24 trust story draft | Nuevo + maestro § contexto | S24 |

### Sprint 2 — Persona journeys (1 semana)

| # | Entrega | Fuente | Pantallas |
|---|---------|--------|-----------|
| S2-1 | Carlos tour 8 steps → topic blocks | Maestro + carlos-narration.md | S06 trust |
| S2-2 | Sofía tour 7 steps + design section | Maestro + sofia-narration.md | S06 desire |
| S2-3 | Diego tour 7 steps + ISOFIX/calor | Maestro + diego-narration.md | S06 family |
| S2-4 | Altitud topic + repuestos FAQ | Nuevo Carlos | S25, reliability |
| S2-5 | Testimonial ×1 integrated | Viaggio clientes | S23, Diego optional |

### Sprint 3 — Conversion + compare depth (1 semana)

| # | Entrega | Fuente | Pantallas |
|---|---------|--------|-----------|
| S3-1 | Compare Tiggo 7 + Tucson | Maestro + research | S11, S12 |
| S3-2 | TCO / reventa topic | Maestro objeción + finance | S28, FAQ |
| S3-3 | Financiamiento preview copy | S0-3 output | S26 |
| S3-4 | Family share summary | conversion-strategy | S33 |
| S3-5 | specs.json content | Maestro § panorama | S10 |

### Sprint 4 — Assets + polish (1 semana, overlap con Sprint 2–3)

| # | Entrega | Owner | Blocker for |
|---|---------|-------|-------------|
| S4-1 | Media P0 shoot / acquire | Marketing + Viaggio | S22, Safety, Tech |
| S4-2 | Showroom + taller photo set | Viaggio local | S24, Warranty |
| S4-3 | Media binding table in maestro | Creative | All themes |
| S4-4 | Viaggio/GAC co-brand approval | Legal + GAC | FAQ objeción china |
| S4-5 | UAT copy walkthrough kiosk | PO + GM | Demo sign-off |

---

## Definición de «MVP content ready»

El maestro (bundle primario + journey scripts + media binding) estará **MVP ready** cuando:

- [ ] Readiness promedio experiencias ≥ **8/10**
- [ ] Cero conflictos de datos entre maestro, compare y vehicle metadata
- [ ] Las 10 experiencias tienen copy block-level implementable sin inventar texto en dev
- [ ] Media P0 adquirido y vinculado por mediaId
- [ ] ≥1 testimonial verificado publicado
- [ ] dealership datos reales en todos CTAs
- [ ] Financiamiento orientativo BOB live (S26) o disclaimer explícito en hero/compare
- [ ] Viaggio + GAC firman FAQ objeción «marca china» y filas compare sensibles
- [ ] Walkthrough 14-pantalla demo script completable sin placeholder rotos

**Estado actual vs. gate:** 6.2/10 — **no ready** para demo público; **ready** para Sprint 1 implementación paralela en FAQ, Hero copy draft y Warranty text.

---

## Apéndice — Bundle de contenido primario recomendado

Para que el maestro sea verdaderamente la fuente única MVP, consolidar:

```
docs/content/
├── gs4-max-master-content.md          ← estrategia + copy comercial (actual)
├── gs4-max-journey-scripts.md         ← NEW: Carlos 8 + Sofía 7 + Diego 7 pasos
├── gs4-max-screen-binding.md          ← NEW: pantalla → bloques → mediaIds
├── gs4-max-compare-data.md            ← NEW: 3 targets fila a fila
└── mvp-content-readiness.md           ← este documento
```

Hasta que existan los tres archivos «NEW», el readiness real del **bundle** sube a ~**7.5/10**; con assets P0 adquiridos, ~**8.5/10** — apto para demo stakeholder en Viaggio Banzer.

---

*Evaluación basada en `gs4-max-master-content.md`, screen-map MVP (S22, S06, S07, S08, S25, S29, S11, S12, S14, S34), tours JSON, guiones persona en `docs/content/*-narration.md`, y criterios demo en `pre-phase2-readiness.md`.*
