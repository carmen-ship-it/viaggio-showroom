# GAC GS4 MAX — Content Gap Analysis

**Mercado:** Bolivia  
**Distribuidor:** Viaggio Motor S.A. (Grupo Roda)  
**Alcance de revisión:** Todo el contenido GS4 MAX en el repositorio — JSON en producción, documentación maestra, guiones de narración, plantillas y pantallas del showroom  
**Fecha:** junio 2026  
**Perspectivas aplicadas:** Especialista de producto GAC · Gerente de ventas Viaggio Motors · Mecánico maestro · Director de marketing

---

## Resumen ejecutivo

El repositorio tiene **dos capas de contenido desconectadas**:

1. **Capa estratégica (sólida):** `docs/content/gs4-max-master-content.md` y los guiones de Carlos, Sofía y Diego son extensos, localizados para Bolivia y alineados con objeciones reales del mercado.
2. **Capa operativa (incompleta):** `content/vehicles/gs4-max/` contiene esqueletos JSON con **1 bloque de narración por tópico** en la mayoría de casos. Las pantallas de confianza, economía y conversión son **placeholders**. Los guiones ricos no están integrados.

**Veredicto conjunto:** El GS4 MAX está **documentado para ventas** pero **no listo para educar al 80 % de preguntas pre-venta** que define la estrategia de contenido. La brecha más crítica no es copywriting — es **producción, validación de datos y despliegue** del contenido maestro al showroom digital.

| Dimensión | Estado | Riesgo comercial |
|-----------|--------|------------------|
| Producto / specs | Parcial, con conflictos | Credibilidad técnica (Carlos) |
| Confianza / marca china | Maestro sí · JSON no | Abandono en comparativa |
| Familia | Guiones sí · tour 2/7 pasos | Decisión grupal sin soporte |
| Bolivia / multi-ciudad | Maestro nacional · JSON solo SCZ | La Paz / CBBA excluidos |
| Economía (precio, cuota, TCO) | Ausente en JSON | Objeción #1 sin respuesta |
| Objeciones / FAQ | Solo en maestro | Pantalla S25 vacía |
| Comparativas | Plantilla no desplegada | Sin validación racional |
| Medios / prueba social | Planificado, no adquirido | Showroom sin credibilidad visual |

---

## Inventario de contenido existente

### Documentación y guiones (docs/)

| Activo | Ubicación | Completitud | Notas |
|--------|-----------|-------------|-------|
| Contenido maestro | `docs/content/gs4-max-master-content.md` | **Alta (~95 %)** | Hero, specs, seguridad, tecnología, confort, familia, garantía, mantenimiento, FAQ, 8 objeciones, comparativas, test drive |
| Narración Carlos | `docs/content/carlos-narration.md` | **Alta** | 8 bloques + variantes cortas; motor, transmisión, seguridad, garantía, mantenimiento |
| Narración Sofía | `docs/content/sofia-narration.md` | **Alta** | Diseño, tecnología, confort, premium, marca, CTA test drive |
| Narración Diego | `docs/content/diego-narration.md` | **Alta** | 7 escenarios familiares + transiciones + CTAs |
| Plantilla compare | `docs/content/templates/compare.gs4-max.corolla-cross.json` | **Media** | No copiada a `content/`; datos conflictivos con maestro |
| Plantilla media | `docs/content/templates/media-manifest.gs4-max.json` | **Plan** | Referencia; sin assets en `public/` |
| Plan de assets | `docs/assets/asset-acquisition-plan.md` | **Plan** | P0/P1/P2 definidos; nada adquirido |

### Contenido JSON en producción (`content/vehicles/gs4-max/`)

| Tipo | Cantidad | Completitud vs. estrategia |
|------|----------|----------------------------|
| `vehicle.json` | 1 | **Baja** — sin precio, metadata incompleta |
| Temas | 5 | **Baja** — faltan `value`, `driving` (requeridos por content-strategy) |
| Tópicos | 11 | **Muy baja** — promedio 1 bloque/tópico; ADAS es el único desarrollado (5 bloques) |
| Tours | 3 | **Baja** — Trust 8 pasos (tópicos vacíos); Family 2/7; Desire 2/7 |
| FAQ / financing / compare / specs | 0 | **Ausente** |
| Testimonials | 0 | **Ausente** |

### Pantallas del showroom (app/)

Todas las rutas GS4 MAX renderizan `PlaceholderPage`. El contenido JSON existe pero **no se consume visualmente** en esta fase de fundación.

---

## Revisión por rol

### Especialista de producto GAC

**Fortalezas en maestro**
- Posicionamiento tercera generación GS4 y eslogan «Maneja el Cambio»
- Dos versiones comercializadas (4x2 / AWD) con HP, torque y precios USD
- ADAS de serie, C-NCAP 5 estrellas, 8 airbags como diferenciales centrales
- Ficha técnica global (dimensiones, maletero 638 L, consumo WLTC)
- Programa garantía 5 años + mantenimiento sin costo 3 años

**Brechas de producto**

| Brecha | Detalle | Prioridad |
|--------|---------|-----------|
| Conflictos de datos no resueltos | Pantalla: maestro 10,1" vs JSON 12,3" · Airbags: maestro 8 vs compare template 6 · Transmisión: maestro 7WDCT vs metadata `6AT / 7DCT` · Precio: maestro $42.900/$48.900 vs `priceFrom: 0` | **P0** |
| Lista ADAS incompleta | Maestro menciona AEB, ACC, LDW, 360°; JSON solo 4 sistemas; faltan BSD, TJA, HMA, etc. si aplican en Bolivia | **P1** |
| Sin ficha `specs.json` | Dimensiones, peso, capacidad remolque, despeje, ángulos, presión neumáticos | **P1** |
| Sin guía 4x2 vs AWD | Diferencia de potencia (177 vs 248 HP) sin árbol de decisión para cliente | **P1** |
| Sin contenido de colores / trim | Disponibilidad de colores Bolivia no documentada en JSON | **P2** |
| Sin topic diseño exterior | Tour Desire usa `tech-overview` para «Diseño exterior» — mismatch semántico | **P1** |
| Equipamiento GT / versiones | Diego menciona asientos ventilados, portón eléctrico «en versión que lo trae»; maestro Bolivia dice «full equipo único» — requiere alineación | **P0** |
| Android Auto | Sofía lo menciona; maestro solo Apple CarPlay | **P1** |

**Contenido débil**
- `structure.json`: una frase genérica; no menciona 8 airbags ni C-NCAP
- `engine.json`: sin Julang Power, TGDI, 350 bar, cifras HP/torque por versión
- `tech-overview.json`: una frase; sin ADiGO, modos de conducción, 7WDCT

---

### Gerente de ventas Viaggio Motors

**Fortalezas en maestro**
- Precios de lista USD y disclaimer comercial
- Puntos de conversación comparativos vs Corolla Cross, Tucson/Sportage, SUVs chinos
- Guía completa de test drive (antes / durante / después)
- Red de showrooms en 4 ciudades con direcciones
- Objeciones con respuesta + prueba sugerida

**Brechas comerciales**

| Brecha | Detalle | Prioridad |
|--------|---------|-----------|
| FAQ / objeciones no desplegadas | 8 objeciones en maestro; pantalla S25 = placeholder | **P0** |
| Financiamiento ausente | S26 placeholder; sin bandas de cuota 24/36/48, sin BOB, sin entidades | **P0** |
| Precio en hub del vehículo | `priceFrom: 0` impide ancla de valor | **P0** |
| Compare no en `content/` | Cliente no puede validar vs Corolla Cross en showroom | **P0** |
| Compare incompleto | Estrategia pide 3 rivales (Corolla Cross, Tiggo 7/Haval, Tucson); solo existe plantilla 1 | **P1** |
| TCO / costo de propiedad | Maestro lo menciona; sin pantalla S28 ni topic `resale-value` | **P0** |
| Trade-in | Sin contenido de permuta (S27) | **P1** |
| Test drive / conversión | S14, S34, S13 = placeholders; sin formulario, logística familiar | **P0** |
| WhatsApp con contexto | `dealership.json` tiene teléfono placeholder `+59100000000` | **P0** |
| Cotización compartible | Sin resumen para cónyuge (S33 family share) | **P1** |
| Promociones vigentes | Maestro dice «consultar»; sin mecanismo de actualización mensual | **P1** |

**Objeciones en maestro pero sin refuerzo en JSON**

| Objeción | En maestro | En JSON/tours |
|----------|------------|---------------|
| «Es marca china» | Sí | No |
| «Prefiero Toyota/Hyundai/Kia» | Sí | Compare template parcial |
| «¿Valor de reventa?» | Sí | **No** |
| «¿Repuestos y servicio?» | Sí | `viaggio-service` = 1 frase, solo SCZ |
| «Muy caro para marca desconocida» | Sí | No |
| «Esperar color/promoción» | Sí | No |
| «Turbo consume / complica mantenimiento» | Sí | `maintenance` = 1 frase |
| «Necesito consultarlo en familia» | Sí | No |

**Objeciones ausentes en todo el corpus**

| Objeción | Por qué importa en Bolivia | Prioridad |
|--------|----------------------------|-----------|
| «¿Cuánto demora un repuesto?» | Top miedo post-compra en marcas nuevas | **P0** |
| «¿Cuánto cuesta el seguro?» | Decisión por cuota total, no solo vehículo | **P1** |
| «¿Aguanta altura en La Paz / El Alto?» | FAQ maestro genérico; sin contenido técnico profundo | **P0** |
| «¿Por qué subió el precio desde lanzamiento?» | Discrepancia $34.900 (dic. 2024) vs $42.900 actual sin narrativa | **P1** |
| «¿Qué banco financia GAC?» | Sin respuesta en ningún activo | **P0** |
| «¿Puedo usar gasolina 87?» | Maestro dice 92+; objeción común en ruta | **P2** |
| «¿Tiene historial de recalls?» | Transparencia proactiva para marca china | **P2** |

---

### Mecánico maestro (Carlos)

**Fortalezas**
- Guiones Carlos son técnicamente creíbles: cadena de distribución, intervalos 10.000 km, límites honestos de ADAS
- Tour Trust incluye motor → chasis → marca → ADAS → estructura → garantía → mantenimiento → servicio
- Tono «sin filtro» alineado con confianza en marca china

**Brechas técnicas**

| Brecha | Detalle | Prioridad |
|--------|---------|-----------|
| Guiones no integrados | Carlos-narration.md tiene 8 bloques; JSON topics tienen ~20 palabras cada uno | **P0** |
| Transmisión sin topic dedicado | Guion completo en docs; no existe `transmission.json` | **P1** |
| Mantenimiento sin costo no explicado | Maestro detalla 3 años/100.000 km; `maintenance.json` no lo menciona | **P0** |
| Detalle de servicios incluidos | Qué cubre exactamente «sin costo» (aceite, filtros, mano de obra) — pendiente validación Viaggio | **P0** |
| Intervalos y costos post-garantía | Sin tabla de servicios 10k/20k/40k en BOB estimados | **P1** |
| Turbo / altitud | Sin explicación mecánica de comportamiento a 3.600 m (La Paz) | **P0** |
| 7WDCT vs 6AT | Guion Carlos explica ambas; stock Bolivia aparentemente solo 7WDCT — unificar | **P0** |
| Chasis genérico | `chassis.json` = 1 frase; sin suspensión McPherson, geometría, protección bajo motor | **P1** |
| Estructura sin C-NCAP | No referencia certificación ni configuración de 8 airbags | **P0** |
| Durabilidad en polvo/calor | Carlos guion menciona filtros en temporada seca SCZ; no en JSON | **P1** |

**Señales de confianza técnica faltantes**
- Video o diagrama de zonas de acero UHSS
- Foto de taller Viaggio con técnico certificado GAC
- Historial de servicio digital / app
- Número de unidades GS4 vendidas en Bolivia (social proof cuantificado)

---

### Director de marketing

**Fortalezas**
- Hero variants A/B en maestro (emocional, racional, familia, valor)
- Mensaje «Maneja el Cambio» y narrativa de lanzamiento regional en Bolivia
- Diego con escenarios lifestyle auténticos (Warnes, Doble Vía, Equipetrol)
- Sofía con arco deseo → premium → test drive bien estructurado
- Estrategia de contenido define pesos por pilar y KPIs

**Brechas de marketing**

| Brecha | Detalle | Prioridad |
|--------|---------|-----------|
| Contenido no publicado | ~540 líneas de maestro + ~230 líneas Diego sin reflejo en producto | **P0** |
| Sin testimoniales | Estrategia P0: mínimo 3 videos locales (Equipetrol, Plan 3000, Urubó) | **P0** |
| Sin fotos Viaggio | Showroom, taller, equipo — señal #1 de confianza local | **P0** |
| Hero / video atractivo | Asset plan P0: `gs4-max-hero-01`, loop S01 — no existen | **P0** |
| Tagline inconsistente | Maestro: «Maneja el Cambio» · JSON: «El SUV que tu familia merece...» | **P1** |
| Alcance geográfico | JSON limitado a Santa Cruz; maestro cubre 4 ciudades | **P0** |
| Sin contenido Grupo Roda | Maestro menciona empresa 100 % boliviana; JSON no | **P1** |
| Sin campaña lanzamiento Bolivia | «Primicia regional» no está en ningún topic | **P1** |
| Redes / UTM / QR pre-visita | Sin contenido de campaña digital | **P2** |
| Tema `value` ausente | 10 % del peso estratégico sin tema ni topics | **P1** |
| Tour Complete (16 pasos) | No existe | **P2** |
| Media manifest no desplegado | Bloques `hero`, `feature_grid` referencian mediaIds inexistentes | **P0** |

**Contenido débil para marketing**
- `brand-heritage.json`: genérico; sin cifras (millones de unidades, mercados, años en Bolivia)
- Themes descriptions: funcionales pero no diferenciadores
- Family theme: «Santa Cruz» en description excluye resto del país

---

## Brechas por categoría

### 1. Contenido faltante

#### P0 — Bloquea confianza y conversión

| ID | Contenido | Fuente sugerida | Pantalla / asset |
|----|-----------|-----------------|------------------|
| C-P0-01 | FAQ + 8 objeciones como JSON estructurado | `gs4-max-master-content.md` § FAQ + objeciones | S25 |
| C-P0-02 | Financiamiento: bandas cuota BOB 24/36/48 por versión | Viaggio finance desk | S26 |
| C-P0-03 | Precio lista BOB + USD en `vehicle.json` | gac.com.bo | S03, S22 |
| C-P0-04 | Compare Corolla Cross en `content/` (datos corregidos) | Maestro + research | S11, S12 |
| C-P0-05 | Topic `resale-value` / TCO 3 años | Carlos + finance | S28 |
| C-P0-06 | Expansión topics: estructura (8 airbags, C-NCAP), engine (specs), warranty (mantenimiento sin costo) | Maestro | S08, tours |
| C-P0-07 | Integrar guiones Carlos/Diego/Sofía en blocks JSON | docs/content/*-narration.md | Todos los topics |
| C-P0-08 | `dealership.json` real: WhatsApp, dirección Banzer, horarios | Viaggio ops | Footer, CTAs |
| C-P0-09 | Test drive: copy + campos + logística familiar | conversion-strategy | S14, S34 |
| C-P0-10 | Topic altitud / La Paz-El Alto | Maestro FAQ + Carlos técnico | S25, reliability |
| C-P0-11 | Media P0: hero, dashboard, ADAS, rear seats | asset-acquisition-plan | S22, topics |
| C-P0-12 | Testimonial mínimo ×1 (video o quote verificado) | Viaggio clientes | S23 |

#### P1 — Completa arco de decisión

| ID | Contenido | Notas |
|----|-----------|-------|
| C-P1-01 | Compare Tiggo 7 / Haval H6 | Posicionamiento honesto marca china |
| C-P1-02 | Compare Hyundai Tucson | Benchmark aspiracional |
| C-P1-03 | Tema `value` + topics: equipamiento-serie, costo-propiedad | 10 % peso estratégico |
| C-P1-04 | Tema `driving` + topics: modos-conduccion, manejo-ruta | 5 % peso estratégico |
| C-P1-05 | Topic diseño exterior/interior (separar de tech-overview) | Tour Desire |
| C-P1-06 | Topic transmisión 7WDCT | Guion Carlos ya escrito |
| C-P1-07 | Topics Diego: daily-driving, children, shopping, road-trips, ownership | 7 guiones → 7 topics |
| C-P1-08 | Topic family-safety (ISOFIX, airbags traseros) | Referenciado en adas.json, no existe |
| C-P1-09 | Topic cargo / maletero 638 L | Maestro + asset plan |
| C-P1-10 | Topic climatización altitud/calor | Diego confort + Bolivia |
| C-P1-11 | Guía decisión 4x2 vs AWD | Maestro versiones |
| C-P1-12 | Trade-in intent copy | S27 |
| C-P1-13 | Family share summary | S33 |
| C-P1-14 | Red Viaggio multi-ciudad en `viaggio-service` | Maestro § showrooms |
| C-P1-15 | `specs.json` completo | Ficha técnica |
| C-P1-16 | Tour Family expandido a 7 pasos | content-strategy |
| C-P1-17 | Tour Desire expandido a 7 pasos | content-strategy |
| C-P1-18 | Android Auto confirmado o eliminado de copy | Alineación producto |
| C-P1-19 | Narrativa cambio de precio lanzamiento → lista actual | Transparencia |
| C-P1-20 | Seguro: rango orientativo o «consultar corredor» | Objeción común |

#### P2 — Polish y escala

| ID | Contenido | Notas |
|----|-----------|-------|
| C-P2-01 | Tour Complete 16 pasos | Post-launch |
| C-P2-02 | Compare GS8 interno | Cuando GS8 content pack exista |
| C-P2-03 | Colores / configurador lite | S30 |
| C-P2-04 | Contenido campaña QR / UTM | Marketing digital |
| C-P2-05 | Testimonials ×3 con metadata barrio | content-strategy Phase 3 |
| C-P2-06 | Hero night variant, share hero | asset plan P2 |
| C-P2-07 | Recall / transparencia historial | Confianza proactiva |
| C-P2-08 | Gasolina 87 vs 92 FAQ | Uso en provincia |
| C-P2-09 | Contenido EMKOO/EMZOOM cross-sell | Hub vehículos |
| C-P2-10 | Batería híbrido futuro | Solo si aplica modelo |

---

### 2. Contenido débil (existe pero insuficiente)

| Asset | Problema | Acción | Prioridad |
|-------|----------|--------|-----------|
| `structure.json` | 1 bloque, sin 8 airbags ni C-NCAP | Reescribir con maestro § seguridad pasiva | **P0** |
| `engine.json` | Sin cifras, sin Julang/TGDI | Expandir con guion Carlos § motor | **P0** |
| `maintenance.json` | No menciona 3 años sin costo | Añadir programa + intervalos | **P0** |
| `warranty-terms.json` | Solo garantía; omite mantenimiento | Tabla dual cobertura | **P0** |
| `viaggio-service.json` | Solo Santa Cruz, 1 frase | 4 ciudades + taller | **P1** |
| `family-comfort.json` | Genérico vs Diego rico | 4+ blocks + escenarios | **P0** |
| `tech-overview.json` | Usado como «diseño» en tour | Separar topics | **P1** |
| `brand-heritage.json` | Sin cifras ni historia GS4 | Maestro § contexto marca | **P1** |
| `chassis.json` | 1 frase | Suspensión + calle boliviana | **P1** |
| `adas.json` | Mejor topic; falta C-NCAP cross-link | Añadir stat 8 airbags + cert | **P1** |
| `vehicle.json` tagline | Solo familia/SCZ | Variantes hero maestro | **P1** |
| `compare` template | 6 airbags (incorrecto vs maestro 8) | Corregir antes de publicar | **P0** |
| Tours family/desire | 2 pasos c/u | Expandir + topics correctos | **P0** |
| Theme descriptions | Funcionales, no emocionales | Copy Sofía/Diego | **P2** |

---

### 3. Señales de confianza faltantes

| Señal | Estado | Prioridad |
|-------|--------|-----------|
| Certificación C-NCAP visual (logo, fecha, link) | Texto en maestro only | **P0** |
| 8 airbags diagrama / lista | Mencionado, no ilustrado | **P0** |
| Fotos showroom Viaggio real | Placeholder dealership | **P0** |
| Fotos taller + técnico certificado | Asset plan P1 | **P0** |
| Testimonial propietario local | Ausente | **P0** |
| Grupo Roda / 100 % boliviano | Maestro only | **P1** |
| Años GAC en Bolivia | Maestro vago; sin cifra | **P1** |
| Unidades vendidas GS4/GS4 MAX Bolivia | Ausente | **P1** |
| Repuestos en stock / tiempo entrega | Objeción sin respuesta | **P0** |
| Garantía documento PDF link | Ausente | **P1** |
| Partner financiero logos | Ausente | **P0** |
| WhatsApp número real verificado | Placeholder | **P0** |
| Dirección física en cada pantalla conversión | conversion-strategy P0 | **P0** |
| Historial mantenimiento digital | Mencionado Carlos guion, no content | **P2** |

---

### 4. Mensajería familiar faltante o débil

| Elemento | docs Diego | JSON / tours | Prioridad |
|----------|------------|--------------|-----------|
| Escenario colegio + Doble Vía diario | Sí | No | **P0** |
| ISOFIX / sillas infantiles | Sí | No | **P0** |
| Aire trasero en calor SCZ | Sí | No | **P0** |
| Viaje Warnes / Buena Vista / abuelos | Sí | No | **P1** |
| Compras super / mall / cámara 360° | Sí | No | **P1** |
| Invitar familia al test drive | Maestro + Diego | No en convert | **P0** |
| Esposa como co-decidora | Diego § children | No | **P0** |
| Compartir resumen WhatsApp cónyuge | conversion-strategy | No | **P1** |
| Tour familiar 7 pasos | Plan 7 | Solo 2 | **P0** |
| Maletero carrito / coche bebé | Diego | No | **P1** |
| Experiencia propiedad 1 año | Diego (narrativa demo) | No — **requiere owner real** | **P1** |
| Inclusividad familia extendida | Checklist Diego | No explícito | **P2** |

**Riesgo:** Diego guion menciona «versión GT» y «asientos ventilados» que el maestro comercial Bolivia no confirma como versión separada. Validar antes de publicar — riesgo legal y de confianza.

---

### 5. Mensajería Bolivia-específica faltante o débil

| Elemento | Maestro | JSON / app | Prioridad |
|----------|---------|------------|-----------|
| 4 ciudades (SCZ, LP, El Alto, CBBA) | Sí, direcciones | JSON solo SCZ | **P0** |
| Altitud La Paz / El Alto | FAQ genérico | Sin topic | **P0** |
| Precio BOB + tipo cambio disclaimer | Parcial | No | **P0** |
| Consumo real km/l ciudad (9–10) | vehicle.json stat | Sin contexto altitud/carga | **P1** |
| Calor 35 °C+ / cabin heat soak | Diego guion | No en JSON | **P1** |
| Polvo temporada seca / filtros | Carlos guion | No en JSON | **P1** |
| Rutas locales (Doble Vía, Cotoca, Pantanal) | Diego guion | No en JSON | **P1** |
| YPF / Petrobras contexto combustible | content-strategy | No | **P2** |
| Barrios SCZ (Equipetrol, Plan 3000, Urubó) | pre-phase2-readiness | No | **P1** |
| Lanzamiento primicia regional | Maestro | No en topics | **P1** |
| Viaggio exclusivo GAC Bolivia | Maestro | Parcial | **P1** |
| Eslogan «Maneja el Cambio» | Maestro hero | No en vehicle.json | **P1** |
| Español boliviano consistente | Maestro/Diego/Carlos | JSON neutro | **P2** |
| Financiamiento bancos locales | Ausente | Ausente | **P0** |
| Seguro vehicular Bolivia | Ausente | Ausente | **P1** |

---

## Conflictos de datos — resolver antes de publicar (P0)

| Campo | Fuente A | Fuente B | Resolución requerida |
|-------|----------|----------|---------------------|
| Pantalla central | Maestro: 10,1" | vehicle.json / topics / Sofía: 12,3" | Verificar unidad piso Bolivia |
| Airbags | Maestro: 8 | compare template: 6 | Unificar; compare debe reflejar realidad |
| Transmisión | Maestro: 7WDCT | vehicle metadata: 6AT / 7DCT | Confirmar stock; eliminar opción no vendida |
| Precio | Maestro: $42.900 / $48.900 | vehicle priceFrom: 0 | Actualizar + BOB |
| Tracción metadata | Maestro: 4x2 + AWD | vehicle metadata: FWD only | Añadir AWD variant metadata |
| Mantenimiento sin costo | Maestro detallado | maintenance.json: omitido | Incluir en warranty + maintenance |
| Versión GT | Diego guion | Maestro: full equipo único | Viaggio/GAC confirmar equipamiento |
| Propiedad 1 año Diego | Narrativa first-person | Sin owner verificado | Reemplazar con testimonial real o marcar ficticio |

---

## Matriz de priorización consolidada

### P0 — Hacer primero (confianza + conversión + credibilidad)

1. **Resolver conflictos de datos** (pantalla, airbags, transmisión, precio, versiones)
2. **Desplegar FAQ/objeciones** desde maestro a JSON (S25)
3. **Financiamiento orientativo BOB** con disclaimer (S26)
4. **Precio en vehicle.json** + key stats alineados al maestro
5. **Expandir topics críticos:** structure, engine, warranty, maintenance, family-comfort
6. **Integrar guiones Carlos** en tour Trust (contenido real, no stubs)
7. **Compare Corolla Cross** corregido en `content/`
8. **dealership.json** datos reales Viaggio
9. **Topic altitud** La Paz / El Alto
10. **Repuestos / tiempo entrega** en FAQ
11. **Media P0** (hero, interior, ADAS, family)
12. **Testimonial ×1** mínimo
13. **Test drive copy + CTA** (S14)
14. **Red 4 ciudades** en servicio/garantía
15. **Topics familiares P0:** ISOFIX, daily driving, invitación familia test drive

### P1 — Segunda ola (decisión completa)

1. Compare Tiggo 7 + Tucson
2. Temas `value` y `driving` + topics
3. Topics Diego restantes (shopping, road-trips, ownership con owner real)
4. Topic diseño, transmisión, cargo, climatización
5. TCO / resale-value
6. Trade-in, family share
7. Tours Family y Desire a 7 pasos
8. specs.json
9. Grupo Roda, historia marca, lanzamiento Bolivia
10. Barrios / rutas locales en copy
11. Android Auto alineación
12. Narrativa cambio precio
13. Seguro orientativo
14. brand-heritage enriquecido

### P2 — Tercera ola (escala y polish)

1. Tour Complete 16 pasos
2. Testimonials ×3 con video
3. Configurador colores
4. Campaña QR/UTM
5. Cross-sell modelos GAC
6. Hero variants, share summary creative
7. FAQ gasolina 87, recalls
8. Theme copy emocional
9. Contenido combustible YPF/Petrobras

---

## Cobertura vs. content-strategy (GS4 MAX launch)

| Requisito estrategia | Objetivo | Actual | Gap |
|---------------------|----------|--------|-----|
| Temas | 7–8 | 5 | −2 (value, driving) |
| Topics por tema | 3–4 c/u (~23 total) | 11 (mayoría 1 block) | ~12 topics |
| Blocks por topic | 3–4 mín | 1 promedio | ~30 blocks |
| Tours Trust/Family/Desire | 8 / 7 / 7 pasos | 8 / 2 / 2 | Family −5, Desire −5 |
| Compare targets | 3 | 0 desplegados (1 template) | −3 |
| Trust screens | S23–S25 | Placeholders | 100 % |
| Economics | S26–S28 | Placeholders | 100 % |
| Persona narration en topics | 100 % | ~10 % | 90 % |
| Visual block por topic | 100 % | ~9 % (solo ADAS hero) | 91 % |
| Viaggio-approved claims | Requerido | No auditado | Pendiente |

**Estimación de esfuerzo contenido:** ~70–90 bloques JSON + 3 compare files + FAQ + financing + specs + integración media — **4–6 semanas** con aprobación Viaggio/GAC en paralelo (no 7 días).

---

## Recomendaciones por rol (acciones inmediatas)

### Especialista GAC
- Emitir ficha Bolivia definitiva: pantalla, airbags, ADAS lista, transmisión, colores, Android Auto
- Validar texto C-NCAP (fecha prueba, versión probada)
- Aprobar compare rows antes de publicar

### Gerente de ventas Viaggio
- Entregar bandas financiamiento BOB, bancos, WhatsApp real, direcciones 4 ciudades
- Confirmar qué incluye «mantenimiento sin costo» ítem por ítem
- Facilitar 1–3 clientes para testimonial / ownership story

### Mecánico maestro
- Revisar guiones Carlos vs ficha final (transmisión, intervalos, turbo+altitud)
- Redactar topic altitud con lenguaje honesto (test drive en ciudad del cliente)

### Director de marketing
- Priorizar shoot Viaggio (showroom + taller + familia SCZ) sobre stock GAC genérico
- Unificar tagline «Maneja el Cambio» en vehicle.json y campaña
- Planificar actualización mensual precios/compare

---

## Definición de «done» por prioridad

### P0 done cuando
- [ ] Cero conflictos de datos entre maestro, JSON y compare
- [ ] S25 FAQ live con 8+ objeciones
- [ ] S26 financing con bandas BOB disclaimer
- [ ] Precio visible en hub vehículo
- [ ] Topics Trust y Family con ≥3 blocks y ≥1 visual cada uno
- [ ] Compare Corolla Cross publicado
- [ ] WhatsApp y dirección reales en toda conversión
- [ ] Media P0 en pantalla (no placeholders rotos)
- [ ] ≥1 testimonial o quote verificado

### P1 done cuando
- [ ] 3 compare targets live
- [ ] Temas value + driving completos
- [ ] Tours Family/Desire en 7 pasos
- [ ] 7 topics Diego integrados
- [ ] specs.json + TCO/resale topic
- [ ] Red 4 ciudades en contenido servicio

### P2 done cuando
- [ ] Tour Complete, configurador, campaña QR
- [ ] 3 video testimonials
- [ ] CMS o pipeline contenido sin deploy dev

---

## Apéndice — Mapa fuente → destino

| Contenido maestro (sección) | Destino JSON / pantalla | Estado |
|-----------------------------|-------------------------|--------|
| Mensaje hero | `vehicle.json`, S22 | Parcial |
| Panorama vehículo | `vehicle.json`, topic brand | Parcial |
| Seguridad | topics adas, structure | Débil |
| Tecnología | topic tech-overview | Débil |
| Confort | topic family-comfort | Débil |
| Familia | tour family, Diego topics | Guiones only |
| Garantía | warranty-terms, S24 | Débil |
| Mantenimiento | maintenance | Débil |
| FAQ | S25 faq.json | **Ausente** |
| Objeciones | S25 faq.json | **Ausente** |
| Comparativos | compare/*.json | Template only |
| Test drive | S14, S34 | Placeholder |
| Showrooms Bolivia | viaggio-service, dealership | Parcial |

---

*Documento de análisis interno. No constituye oferta comercial. Los precios, garantías y equipamiento deben confirmarse con GAC Motor Bolivia y Viaggio Motors antes de publicación.*

*Fuentes revisadas: `content/vehicles/gs4-max/**`, `docs/content/gs4-max-master-content.md`, `docs/content/*-narration.md`, `docs/content/templates/*`, `docs/content-strategy.md`, `docs/assets/asset-acquisition-plan.md`, `content/shared/dealership.json`.*
