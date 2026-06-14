# Análisis de conversión familiar — GS4 MAX MVP Showroom

Evaluación del showroom digital Viaggio desde **cuatro lentes familiares bolivianos**, cruzando implementación actual, contenido desplegado (`content/vehicles/gs4-max/`) y guiones estratégicos ([`diego-narration.md`](./diego-narration.md), [`diego-emotional-review.md`](./diego-emotional-review.md), [`gs4-max-master-content.md`](./gs4-max-master-content.md)) con arquitectura de journey ([`customer-journey.md`](../customer-journey.md), [`screen-map.md`](../screen-map.md)).

**Alcance MVP evaluado:** rutas implementadas en `app/(showroom)/` — S22 Hero, journeys por persona (S06), temas Seguridad/Tecnología (S07–S08), Garantía (S29), Prueba de manejo (S14), hub S04.

**Mercado:** Familias en Santa Cruz · ciclo de compra 7–21 días · co-decisión cónyuge/padres · WhatsApp-first.

---

## Lentes de evaluación

| Lente | Pregunta central | Señal de abandono |
|-------|------------------|-------------------|
| **Padre de dos hijos** | ¿Resuelve mi martes — colegio, Doble Vía, super? | *"Bonito, pero no sé si nos cabe"* |
| **Madre evaluando seguridad** | ¿Mis hijos van seguros atrás? ¿Y si es marca china? | *"Prefiero esperar y googlear"* |
| **Abuelo que influye** | ¿Dura? ¿Hay taller? ¿No es juguete? | *"En mi época Toyota no fallaba"* |
| **Comprador SUV Santa Cruz** | ¿Cuota, reventa, calor, ruta a Buena Vista? | *"Me gusta, pero ¿cuánto es la cuota?"* |

---

## Resumen de puntajes

Escala **0–100** · evaluación del **estado actual desplegado**, no del potencial documentado.

| Puntaje | Valor | Lectura |
|---------|-------|---------|
| **Family conversion score** | **41 / 100** | La arquitectura prevé familia; el contenido y flujos no la acompañan hasta el cierre. |
| **Trust score** | **54 / 100** | Carlos + ADAS + garantía dan base; faltan prueba social, estructura profunda y objeción china en el recorrido. |
| **Ownership imagination score** | **27 / 100** | Diego existe en docs pero no en producto — brecha crítica para familias. |
| **Test-drive conversion score** | **34 / 100** | Formulario mínimo sin logística familiar, WhatsApp ni puente al cónyuge ausente. |

### Fórmula de lectura (pesos familia Bolivia)

| Dimensión | Peso | Justificación |
|-----------|------|---------------|
| Imaginación de propiedad (Diego) | 30 % | Sin *"me veo manejando el lunes"*, no hay deseo familiar sostenido. |
| Confianza (Carlos + seguridad + garantía) | 30 % | Marca china + hijos atrás = trust gate obligatorio. |
| Co-decisión y continuidad (share, cónyuge, abuelo) | 20 % | S33/S37 ausentes rompen ciclo 7–21 días. |
| Cierre a prueba de manejo | 20 % | Acción física valida espacio y seguridad para la madre. |

---

## Mapa de decisiones familiares

Cuatro momentos psicológicos distintos. **No son intercambiables** — saltar uno genera abandono o *"lo consulto en casa"* sin herramienta.

```
S22 Hero ──► ¿Vale la pena considerarlo?
     │
     ▼
Carlos + Seguridad + Garantía ──► ¿Confío en el vehículo y en Viaggio?
     │
     ▼
Diego + Familia ──► ¿Puedo imaginar nuestra vida con este auto?
     │
     ▼
Sofía + Tecnología + Economía ──► ¿Me gusta lo suficiente para actuar?
     │
     ▼
S14 + S34 Test Drive ──► ¿Probamos en familia esta semana?
```

### 1. *"Este vehículo vale la pena considerarlo"*

| Campo | Detalle |
|-------|---------|
| **Momento ideal (journey doc)** | S22 Hero → stat strip + hotspot *Espacio familiar* · o S21 clip Diego 15 s pre-visita |
| **Momento real en MVP** | **S22** — tagline familiar + stats (garantía, consumo, pantalla, ADAS) + hotspot maletero/familia |
| **Quién cruza el umbral** | Padre (espacio, equipamiento) · Madre si ve *seguridad* o *garantía* en stats |
| **Tiempo típico** | 30–90 s en hero |

**Qué funciona:** tagline *"El SUV que tu familia merece"*; stat de garantía 5 años; hotspot a `family-comfort`; CTA *¿Es confiable?* alinea con mercado escéptico.

**Qué falla:** `priceFrom: 0` — sin ancla de valor el comprador SUV no puede ubicar el segmento; media placeholder sin Santa Cruz real; **no hay entrada directa *"Soy familia"* en hero** — default *Comenzar recorrido* va a Carlos, no a Diego; abuelo no ve taller ni años Viaggio en hero.

---

### 2. *"Confío en este vehículo"*

| Campo | Detalle |
|-------|---------|
| **Momento ideal** | S23 testimonios + S25 FAQ *marca china* → Carlos tour pasos 4–6 (ADAS, estructura, garantía) → S29 |
| **Momento real en MVP** | **Carlos Journey** (8 pasos) · tema **Seguridad** (`adas` + `structure`) · **S29 Garantía** |
| **Quién cruza el umbral** | Madre (airbags, ADAS) · Abuelo (garantía, mantenimiento, Viaggio) · Padre (motor, repuestos) |
| **Tiempo típico** | 8–15 min si completa tour confianza |

**Qué funciona:** tour Carlos 8 pasos es el journey más completo; topic `adas` tiene 5 bloques creíbles; S29 combina warranty + servicio Viaggio; orden hero → Carlos respeta regla *trust before desire*.

**Qué falla:** `structure` = **una frase** sin 8 airbags ni C-NCAP; `family-safety` referenciado pero **no existe**; **S23/S25 no implementados** — objeción china queda fuera del flujo guiado; paso 2 del tour Diego usa `structure` con persona Carlos — madre que entró por familia recibe técnico frío; **mantenimiento sin costo 3 años** (disparador abuelo/economía) ausente en S29.

---

### 3. *"Puedo imaginar tenerlo"*

| Campo | Detalle |
|-------|---------|
| **Momento ideal** | Diego Journey 7 pasos · escenas colegio 7:15 · Buena Vista · calor 12:30 · super · maletas |
| **Momento real en MVP** | **Diego Journey** = **2 pasos** · `family-comfort` (1 párrafo genérico) · `structure` (Carlos, 1 frase) |
| **Quién cruza el umbral** | Padre (rutina) · Madre (recogida al sol, sillas) · Niños no deciden pero validan espacio |
| **Tiempo típico** | 3–10 min — hoy **< 2 min** de contenido emocional |

**Qué funciona:** CTA en `family-comfort` *"Traé a tu familia a la prueba de manejo"*; guiones en `diego-narration.md` y `diego-emotional-review.md` listos para producción.

**Qué falla:** **desconexión total docs ↔ JSON** — los 7 escenarios emocionales no están desplegados; tour promete 10 min, entrega ~2; tema `family` solo tiene 1 topic; sin escena colegio, Buena Vista, carrito, botinera; **momento de imaginación no ocurre** — peor gap del MVP para familias.

---

### 4. *"Agendemos la prueba de manejo"*

| Campo | Detalle |
|-------|---------|
| **Momento ideal** | Post Diego *"subí atrás con la silla"* → S34 logística (niños bienvenidos, ruta Doble Vía) → S14 con pasajeros → S33 share al cónyuge |
| **Momento real en MVP** | CTAs `test_drive` en topics · **S14** formulario nombre + teléfono · sin S34 · sin S33 |
| **Quién cruza el umbral** | Padre (manejo) · Madre si sabe que pueden ir los chicos · Abuelo si consultor humano aparece |
| **Tiempo típico** | Decisión en 1–3 min tras pico emocional — hoy el pico no llega |

**Qué funciona:** página S14 existe; confirmación post-submit clara; copy master tiene guía completa de test drive familiar.

**Qué falla:** **S34 ausente** — madre pregunta *¿pueden venir los niños?* y el digital no responde; sin campo pasajeros/menores; sin WhatsApp (preferido en Bolivia); CTAs de test drive aparecen en tecnología **antes** de trust threshold si usuario entra por Sofía; sin S33 la frase *"lo consulto con mi esposa"* termina la sesión.

---

## Evaluación por experiencia

### S22 Hero

| Lente | Evaluación |
|-------|------------|
| Padre | Stats útiles; falta imagen Doble Vía / colegio |
| Madre | Garantía visible; seguridad solo si explora hotspot ADAS |
| Abuelo | No ve taller, testimonios ni mantenimiento sin costo |
| Comprador SUV | Sin precio/cuota orientativa — frena consideración |

**Momento de decisión activado:** *Vale la pena considerarlo* (parcial, racional).

**Pérdida de momentum:** Tras hero, familia emocional debería ir a Diego; el CTA principal envía a **Carlos** — correcto para escépticos, **incorrecto para pareja que ya vio el auto afuera y quiere espacio**.

---

### Sofia Journey (Tour de Descubrimiento → `desire`)

| Lente | Evaluación |
|-------|------------|
| Padre | Tecnología relevante; poco vínculo con rutina familiar |
| Madre | No aborda seguridad emocional ni niños |
| Abuelo | Percibe *"más completa de su segmento"* como vendedor |
| Comprador SUV | Pantalla y ADAS sí; conflicto 12,3" vs maestro 10,1" erosiona confianza |

**Contenido desplegado:** 2 pasos, **ambos** `tech-overview` — paso 1 titulado *Diseño exterior* con topic de tecnología (mismatch).

**Momento de decisión:** *Vale la pena considerarlo* (deseo visual) — **no** confianza ni propiedad.

**Scripts documentados vs JSON:** `sofia-narration.md` es rico; JSON tiene un párrafo + grid — **pérdida ~85 % del guion**.

---

### Carlos Journey (Tour de Confianza → `trust`)

| Lente | Evaluación |
|-------|------------|
| Padre | Motor/chasis responden *¿aguanta Santa Cruz?* — topics demasiado finos |
| Madre | ADAS fuerte; estructura/airbags débil — **confianza incompleta** |
| Abuelo | Garantía + servicio Viaggio en pasos 6–8 — mejor tramo del MVP |
| Comprador SUV | Sin TCO/compare en tour — validación económica cortada |

**Momento de decisión:** *Confío en el vehículo* — **sí, en paso 4 (ADAS) y 6–8 (garantía/servicio)** si el usuario persevera.

**Pérdida de momentum:** Pasos 1–3 (motor, chasis, heritage) con narración de 1 oración — padre aburrido, madre aún sin hijos en la historia; sin handoff *"Diego te cuenta el colegio"* al terminar.

---

### Diego Journey (Tour Familiar → `family`)

| Lente | Evaluación |
|-------|------------|
| Padre | **Frustración principal** — promete familia, no entrega escenas |
| Madre | Un párrafo de confort; sin sillas ISOFIX, sin calor mediodía |
| Abuelo | Paso 2 es Carlos/estructura — fuera de personaje |
| Comprador SUV | Sin maletero 638 L narrado, sin viaje Buena Vista |

**Momento de decisión esperado:** *Imagino tenerlo* — **no se alcanza en MVP**.

| Métrica | Documentado | Desplegado |
|---------|-------------|------------|
| Pasos tour | 7 (emotional review) | **2** |
| Escenarios Diego | 7 guiones completos | **1 párrafo** |
| Colegio / Buena Vista / super | Sí en docs | **Ausente** |
| Persona en paso seguridad | Diego → Carlos handoff | **Solo Carlos** |

**Veredicto:** Experiencia **críticamente incompleta** — mayor riesgo de abandono familiar.

---

### Safety Experience (tema `safety`)

| Lente | Evaluación |
|-------|------------|
| Padre | ADAS útil para Doble Vía — Carlos acertado |
| Madre | Falta *"mis hijos atrás"* — debería abrir Diego, cerrar Carlos |
| Abuelo | 8 airbags y C-NCAP en maestro, **no en UI** |
| Comprador SUV | Buen diferenciador vs competencia si se despliega |

**Topics:** `adas` (robusto) · `structure` (esqueleto).

**Momento de decisión:** *Confío* (madre) — **solo mitad del camino**.

---

### Technology Experience (tema `technology`)

| Lente | Evaluación |
|-------|------------|
| Padre | CarPlay/Waze escenario del maestro — no narrado |
| Madre | A/C para calor mencionado en grid — sin escena recogida 12:30 |
| Abuelo | Demasiado digital; sin beneficio claro |
| Comprador SUV | Full equipo sí; superlativo *"más completa"* arriesgado |

**Momento de decisión:** *Vale la pena considerarlo* (equipamiento) — puede **saltar trust** si usuario entra directo desde hero.

---

### Warranty Experience (S29)

| Lente | Evaluación |
|-------|------------|
| Padre | 5 años tranquiliza cuota larga |
| Madre | Seguridad financiera indirecta |
| Abuelo | **Mejor pantalla para abuelo** — si llega hasta aquí |
| Comprador SUV | Falta mantenimiento sin costo y comparación 3 vs 5 años |

**Momento de decisión:** *Confío en el vehículo* y *costo predecible* — segundo solo a ADAS.

**Pérdida de momentum:** S29 no enlaza a Diego *"así se siente el año uno"* ni a S34 test drive familiar.

---

### Test Drive Experience (S14)

| Lente | Evaluación |
|-------|------------|
| Padre | Formulario funcional pero impersonal |
| Madre | **Sin respuesta niños / sillas / A/C en ruta** |
| Abuelo | No sabe duración ni qué llevar |
| Comprador SUV | Sin WhatsApp; sin pre-fill de versión 4x2/AWD |

**Momento de decisión:** *Agendemos* — **solo si momentum previo existió**; hoy pocos llegan con emoción suficiente.

**Master content vs MVP:** maestro tiene guía antes/durante/después; S14 solo captura nombre y teléfono.

---

## Flujo familiar ideal vs flujo MVP real

| Etapa | Ideal (journey + screen-map) | MVP actual | Brecha |
|-------|------------------------------|------------|--------|
| Llegada | S02 path · grupo 2 m | Parcial / hub simple | P1 |
| Hero | S22 + físico alineado | S22 sin media local | P1 |
| Confianza | S23→S25→Carlos | Solo Carlos journey | **P0** |
| Familia | Diego 7 escenas | Diego 2 pasos finos | **P0** |
| Deseo | Sofía post-Diego | Sofía 2× mismo topic | P1 |
| Economía | S28 TCO + S26 cuota | Financiamiento page; sin TCO | **P0** |
| Cierre | S34→S14→S33 | Solo S14 | **P0** |
| Post-visita | S37 resume | No existe | **P0** |

---

## Gaps — pérdida de momentum emocional

### GAP-F01 — Diego Journey vacío frente a documentación

| Campo | Detalle |
|-------|---------|
| **Dónde** | `/journey/diego` · `tours/family.json` (2/7 pasos) |
| **Por qué pierde momentum** | La familia entra buscando *"¿caben mis hijos?"* y recibe copy genérico en < 90 s. El cerebro no construye escena alguna — decisión pospuesta. |
| **Quién abandona** | Padre (decepción) · Madre (no validada) |
| **Mejora** | Desplegar 7 pasos del emotional review: colegio → chicos → compras → Buena Vista → carretera → confort → propiedad. Integrar guiones mejorados en JSON. Handoff paso 2: Diego emocional → Carlos airbags. |
| **Prioridad** | **P0** |

---

### GAP-F02 — Sin prueba social local (S23) en el arco de confianza

| Campo | Detalle |
|-------|---------|
| **Dónde** | Entre S22 y Carlos journey · objeción *marca china* |
| **Por qué** | En Bolivia la confianza familiar viene de **vecino / pariente que tiene GAC**, no de specs. Sin testimonio Equipetrol/Plan 3000, la madre y el abuelo mantienen escudo. |
| **Mejora** | Implementar S23 con 3–5 familias SCZ (barrio, km, trim). Enlazar desde hero *¿Es confiable?* y tras FAQ. |
| **Prioridad** | **P0** |

---

### GAP-F03 — Seguridad familiar sin capa emocional (Diego + Carlos)

| Campo | Detalle |
|-------|---------|
| **Dónde** | Tema `safety` · topic `structure` · `family-safety` ausente |
| **Por qué** | Madre necesita *"los cinturones van bien y duermo tranquila"*, luego datos (8 airbags, C-NCAP). Hoy solo Carlos genérico. |
| **Mejora** | Crear `family-safety` topic: bloque 1 Diego (ISOFIX, recogida al sol), bloque 2 Carlos (8 airbags, C-NCAP). Expandir `structure` con stats del maestro. |
| **Prioridad** | **P0** |

---

### GAP-F04 — S33 Family Share ausente en momento de pico

| Campo | Detalle |
|-------|---------|
| **Dónde** | Post compare / post Diego / pre salida · customer-journey variantes B y E |
| **Por qué** | *"Lo consulto con mi esposa"* = fin de sesión sin herramienta. En SCZ 60 %+ decisiones involucran cónyuge; momentum muere en el estacionamiento. |
| **Mejora** | Implementar S33: imagen hero + 3 bullets (espacio, seguridad, garantía) + compare si existe. CTA en cierre Diego y S29. |
| **Prioridad** | **P0** |

---

### GAP-F05 — Test drive sin logística familiar (S34)

| Campo | Detalle |
|-------|---------|
| **Dónde** | Antes de S14 · `TestDriveCTA.tsx` |
| **Por qué** | Madre bloquea con *¿pueden ir los niños? ¿cuánto dura?* Formulario solo pide nombre — no reduce ansiedad. No-shows y *"después te llamo"*. |
| **Mejora** | S34: 20–30 min, ruta Doble Vía, niños bienvenidos, carnet, demo A/C si calor. Campos S14: pasajeros, edades, *¿trae silla?* |
| **Prioridad** | **P0** |

---

### GAP-F06 — Hero default envía a Carlos, no ofrece bifurcación familia

| Campo | Detalle |
|-------|---------|
| **Dónde** | S22 `TouchNav` · CTAs inferiores |
| **Por qué** | Pareja con chicos en piso físico quiere espacio **antes** de motor turbo. Carlos primero enfría deseo o agota tiempo antes de Diego. |
| **Mejora** | Tercer CTA: *"¿Cómo es en familia?"* → Diego journey. Mantener *¿Es confiable?* para escépticos. |
| **Prioridad** | **P1** |

---

### GAP-F07 — Mantenimiento sin costo invisible en garantía

| Campo | Detalle |
|-------|---------|
| **Dónde** | S29 · `warranty-terms.json` |
| **Por qué** | Abuelo y comprador SUV deciden por **costo predecible**. Maestro destaca 3 años sin costo; UI solo 5 años km — mitad del argumento perdida. |
| **Mejora** | Timeline dual en S29: garantía 5/150k + mantenimiento 3/100k sin costo. Carlos narración comparativa honesta vs 3 años estándar. |
| **Prioridad** | **P0** |

---

### GAP-F08 — Economía familiar (cuota/TCO) fuera del recorrido emocional

| Campo | Detalle |
|-------|---------|
| **Dónde** | S28 TCO · S26 financing · post-Diego |
| **Por qué** | En Bolivia se compra la **cuota**, no el USD 42.900. Padre imagina el auto pero frena sin rango mensual — vuelve a WhatsApp sin contexto. |
| **Mejora** | Tras paso propiedad Diego → S26 orientativo · S28 con YPF SCZ default. Disclaimer claro. |
| **Prioridad** | **P0** |

---

### GAP-F09 — Sofía journey duplicado y desconectado de familia

| Campo | Detalle |
|-------|---------|
| **Dónde** | `tours/desire.json` · tema technology |
| **Por qué** | Dos pasos idénticos rompen inmersión. Sofía antes de trust activa escepticismo en primera visita GAC. Sin puente *"tu esposa va a querer ver la pantalla así"* — pierde co-decisión. |
| **Mejora** | Pasos distintos: diseño + interior + conectividad. Colocar Sofía **después** de Diego en tour completo. Integrar guiones `sofia-narration.md`. |
| **Prioridad** | **P1** |

---

### GAP-F10 — CTAs test drive prematuros en tecnología

| Campo | Detalle |
|-------|---------|
| **Dónde** | `tech-overview.json` CTA · hero enlace tecnología |
| **Por qué** | Usuario salta a Sofía → *probá en test drive* antes de ADAS/garantía — madre dice *"todavía no confío"*. |
| **Mejora** | Gating: CTA primario test drive solo tras ≥3 señales trust (ADAS + warranty + FAQ item) o journey Carlos ≥50 %. |
| **Prioridad** | **P1** |

---

### GAP-F11 — Conflicto de datos pantalla / equipamiento

| Campo | Detalle |
|-------|---------|
| **Dónde** | `tech-overview` 12,3" · maestro 10,1" · Diego menciona GT/ventilados vs full equipo único |
| **Por qué** | Madre y abuelo castigan inconsistencia — *"si mienten en la pantalla, ¿qué más?"* |
| **Mejora** | Validar unidad Bolivia con Viaggio; unificar JSON y maestro; disclaimers versión en Diego. |
| **Prioridad** | **P0** |

---

### GAP-F12 — Sin puente físico-digital en hero

| Campo | Detalle |
|-------|---------|
| **Dónde** | S22 · customer-journey stage 3 |
| **Por qué** | Familia toca kiosk junto al GS4 MAX real — si el digital no dice *"este es el de afuera"*, hay desconexión y desconfianza. |
| **Mejora** | Modo windshield QR: badge *"El mismo vehículo que tenés al lado"* · hotspot maletero → *abrí la cajuela ahora*. |
| **Prioridad** | **P1** |

---

### GAP-F13 — WhatsApp ausente en conversión

| Campo | Detalle |
|-------|---------|
| **Dónde** | S14 · S32 bridge |
| **Por qué** | Familias bolivianas coordinan por WhatsApp — formulario kiosk se siente formal y olvidable. |
| **Mejora** | S32 con pre-fill: modelo, temas vistos, *"quiero test drive con familia"*. Paridad CTA en S14. |
| **Prioridad** | **P1** |

---

### GAP-F14 — Abuelo sin narrativa dedicada

| Campo | Detalle |
|-------|---------|
| **Dónde** | Todo el MVP |
| **Por qué** | En SCZ suegro/abuelo veta por durabilidad y servicio. Solo Carlos paso 8 aborda taller — tarde y técnico. |
| **Mejora** | Bloque S29 *"Para quien pregunta si dura"* · testimonio owner 60+ km · mano a taller Viaggio. |
| **Prioridad** | **P2** |

---

### GAP-F15 — Sesión no sobrevive idle (S37)

| Campo | Detalle |
|-------|---------|
| **Dónde** | S20 reset · post-visita |
| **Por qué** | Familia vuelve en 10 días con cónyuge — progreso perdido. Ciclo 7–21 días roto. |
| **Mejora** | S20 ofrece guardar · S37 resume WhatsApp link. |
| **Prioridad** | **P1** (P0 si launch depende de co-decisión) |

---

### GAP-F16 — Compare y validación racional ausentes en nav familiar

| Campo | Detalle |
|-------|---------|
| **Dónde** | S11/S12 no en `buildVehicleNav` principal |
| **Por qué** | Padre compara mentalmente con Corolla Cross — sin tabla honesta, confía en Google, no en Viaggio. |
| **Mejora** | Compare en hub · fila familia Diego en S12 · share vía S33. |
| **Prioridad** | **P1** |

---

## Matriz: experiencia × momento de decisión

| Experiencia | Vale la pena | Confío | Imagino tenerlo | Test drive |
|-------------|:-----------:|:------:|:---------------:|:----------:|
| S22 Hero | ●●●○ | ●○○○ | ●○○○ | ○○○○ |
| Carlos Journey | ●●○○ | ●●●○ | ○○○○ | ●○○○ |
| Diego Journey | ●○○○ | ○○○○ | ●○○○ | ●○○○ |
| Sofía Journey | ●●○○ | ○○○○ | ●○○○ | ●○○○ |
| Safety | ●●○○ | ●●●○ | ●○○○ | ●●○○ |
| Technology | ●●●○ | ●○○○ | ●○○○ | ●●○○ |
| Warranty S29 | ●●○○ | ●●●● | ●●○○ | ●●○○ |
| Test Drive S14 | ○○○○ | ○○○○ | ○○○○ | ●●○○ |

● = soporte actual fuerte · ○ = débil o ausente

---

## Recorrido recomendado para familia SCZ (post-correcciones P0)

Orden que maximiza conversión según journey doc + emotional review:

```
S22 Hero (stat garantía + CTA familia)
  → Diego Journey completo (colegio → Buena Vista)
  → Safety: family-safety + ADAS
  → S29 Garantía (+ mantenimiento sin costo)
  → S23 Testimonio familia similar
  → Sofía Journey (diseño + pantalla)
  → S26 Cuota orientativa
  → S34 Logística test drive familiar
  → S14 Formulario (+ pasajeros)
  → S33 Share al cónyuge si no vino
```

**Tiempo objetivo:** 22–28 min con pareja · 12–15 min si solo padre pre-validado.

---

## Puntuación detallada por dimensión

### Family conversion score: **41 / 100**

| Factor | Puntos (max) | Otorgado | Nota |
|--------|:------------:|:--------:|------|
| Co-decisión (S33, share, cónyuge en copy) | 20 | 4 | Copy en docs; producto ausente |
| Rutina familiar (Diego escenas) | 25 | 5 | 1 párrafo vs 7 escenarios |
| Confianza para madre/abuelo | 20 | 11 | ADAS + S29 salvavidas |
| Cierre accionable | 20 | 7 | S14 sin S34/WhatsApp |
| Continuidad 7–21 días | 15 | 0 | Sin S37 |
| **Total** | **100** | **41** | |

### Trust score: **54 / 100**

| Factor | Puntos (max) | Otorgado |
|--------|:------------:|:--------:|
| Carlos tour profundidad | 25 | 14 |
| ADAS / safety | 20 | 16 |
| Garantía S29 | 20 | 15 |
| Prueba social S23 | 15 | 0 |
| FAQ objeciones S25 | 10 | 5 |
| Consistencia datos | 10 | 4 |
| **Total** | **100** | **54** |

### Ownership imagination score: **27 / 100**

| Factor | Puntos (max) | Otorgado |
|--------|:------------:|:--------:|
| Diego journey desplegado | 35 | 6 |
| Escenas SCZ (calor, colegio, Buena Vista) | 25 | 4 |
| Equipaje / chicos / super | 20 | 3 |
| Año uno propiedad | 10 | 0 |
| Media lifestyle local | 10 | 0 |
| Handoffs persona | 10 | 4 |
| **Total** | **100** | **27** |

### Test-drive conversion score: **34 / 100**

| Factor | Puntos (max) | Otorgado |
|--------|:------------:|:--------:|
| S14 existencia y UX | 20 | 12 |
| S34 logística familiar | 25 | 0 |
| CTAs contextuales Diego | 15 | 8 |
| Gating post-trust | 15 | 6 |
| WhatsApp S32 | 15 | 0 |
| Post-submit consultant bridge | 10 | 0 |
| **Total** | **100** | **34** |

---

## Priorización consolidada

| Prioridad | Gaps | Impacto familiar |
|-----------|------|------------------|
| **P0** | F01 Diego completo · F02 S23 · F03 family-safety · F04 S33 · F05 S34 · F07 mantenimiento sin costo · F08 TCO/cuota · F11 datos | Desbloquea imaginación, confianza y cierre |
| **P1** | F06 bifurcación hero · F09 Sofía · F10 CTA gating · F12 físico-digital · F13 WhatsApp · F15 S37 · F16 compare | Reduce fricción y abandono co-decisión |
| **P2** | F14 narrativa abuelo · media Santa Cruz · S09 gallery lifestyle | Profundiza, no bloquea MVP |

---

## Métricas sugeridas (familia)

| Evento | Hipótesis |
|--------|-----------|
| `hero_family_cta_tapped` | Bifurcación familia vs confianza |
| `diego_step_completed` (por step) | Dónde se pierde imaginación |
| `family_safety_topic_viewed` | Madre engagement |
| `share_initiated` (S33) | Co-decisión activada |
| `test_drive_logistics_viewed` | Pre-conversión S14 |
| `test_drive_requested` + `passengers_count` | Conversión familiar real |
| `session_resumed` (S37) | Ciclo 7–21 días |

---

## Conclusión

El MVP tiene **columna vertebral correcta**: hero familiar, Carlos tour largo, ADAS sólido, garantía S29, arquitectura S33/S34 en documentación. Pero para una familia en Santa Cruz el showroom **aún no cuenta la historia que ya está escrita** — los guiones Diego/Sofía/Carlos viven en `docs/` mientras el producto muestra esqueletos JSON.

**El momento más caro perdido:** entre *"confío en el motor"* y *"me veo el domingo en Buena Vista"* — hoy hay un vacío de ~8 minutos de contenido emocional que la competencia reemplaza con vendedor humano. Sin cerrar ese gap, el kiosk delega la conversión al consultor en lugar de **pre-calentar** a la familia para la prueba de manejo.

**Acción inmediata de mayor ROI:** desplegar tour Diego 7 pasos (F01) + S34 logística familiar (F05) + bloque family-safety (F03) — tres cambios que suben ownership imagination y test-drive conversion sin rediseñar la app.

---

*Fuentes: [`diego-narration.md`](./diego-narration.md) · [`diego-emotional-review.md`](./diego-emotional-review.md) · [`gs4-max-master-content.md`](./gs4-max-master-content.md) · [`customer-journey.md`](../customer-journey.md) · [`screen-map.md`](../screen-map.md) · `content/vehicles/gs4-max/` · `app/(showroom)/`*
