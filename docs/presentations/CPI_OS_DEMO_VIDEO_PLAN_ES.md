# CPI-OS — Plan de Video Demo Cinematográfico

**Producto:** Sistema Operativo de Inteligencia para Compras Consideradas  
**Duración objetivo:** 4 min 15 seg (rango aceptable: 3:30 – 5:00)  
**Audiencia:** Propietarios y ejecutivos de concesionarias en Bolivia  
**Mercado de referencia:** Viaggio Motors · GAC GS4 MAX · Santa Cruz  
**Idioma:** Español (Bolivia)  
**Fecha:** Junio 2026

---

## Tesis creativa

> **"Tesla product launch meets dealership operating system."**

El video no es un tutorial de software. Es el lanzamiento de un producto que cambia cómo opera una concesionaria: el cliente vive una experiencia premium sin presión; el equipo recibe inteligencia en tiempo real; la empresa aprende cada semana.

**Hilo narrativo:** La **Familia Ríos** llega con dudas sobre una marca china, explora el GS4 MAX en el kiosco, compara con el Corolla Cross, revisa cuotas, pide un asesor — y Javier cierra la venta con contexto. Marcela supervisa el piso. Dirección ve el aprendizaje institucional el lunes.

**Voz:** Narrador masculino o femenino, tono calmado y seguro — no locutor de radio comercial. Pausas largas. La música lleva la emoción; la voz lleva el significado.

**Paleta visual:** Fondo `#0A0C10`, acentos `#C8A96E` (warm) y `#4A9B8E` (trust). Tipografía geométrica, mucho espacio negativo. Sin rojo de liquidación. Sin gritos de "¡OFERTA!"

**Música:** Piano + pads sintéticos en escenas de cliente; percusión sutil al entrar en operaciones; crescendo en el cierre de venta.

**Viewport de grabación:** Kiosco 1920×1080 landscape · Tablet operaciones 1024×768 o iPad Pro · Escritorio ejecutivo 1440×900

---

## Arquitectura del video

```
[PROLOGO]          0:00 – 0:18   Marca + promesa
[ACTO I]           0:18 – 1:45   Cliente en piso (escenas 1–6)
[PUENTE]           1:45 – 1:55   Transición "El piso despierta"
[ACTO II]          1:55 – 3:05   Operaciones en vivo (escenas 7–8)
[ACTO III]         3:05 – 3:45   Inteligencia ejecutiva (escena 9)
[EPÍLOGO]          3:45 – 4:15   Cierre de venta + tagline (escena 10)
```

**Ruta canónica de grabación (kiosco):**  
S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → *(S36)* → `/staff` → `/manager` → `/executive`

---

## Escena 0 — Prologo (no numerada en la secuencia solicitada)

| Campo | Detalle |
|-------|---------|
| **Duración** | 18 seg |
| **Narración** | *"Cada familia que entra a tu concesionaria merece la calma de un showroom premium — y tu equipo merece saber exactamente cuándo intervenir. CPI-OS conecta ambos mundos."* |
| **Grabación de pantalla** | Ninguna |
| **Motion graphics** | Logo CPI-OS + Viaggio + GAC en fade. Línea de luz horizontal que recorre la pantalla (estilo reveal Tesla). Texto: **"Sistema Operativo de Inteligencia para Compras Consideradas"** |
| **Transición** | Fade a negro → dissolve lento a plano del showroom |
| **Text overlays** | `CPI-OS` · `Viaggio Motors · Santa Cruz` |
| **Objetivo emocional** | Curiosidad + credibilidad. "Esto es serio, no es un PowerPoint." |

---

## Escena 1 — El cliente llega

| Campo | Detalle |
|-------|---------|
| **Duración** | 22 seg |
| **Narración** | *"Sábado por la mañana. Los Ríos llegan sin cita. Vieron el GS4 MAX en Instagram, pero traen la misma pregunta que muchos bolivianos: ¿puedo confiar en una marca que no conozco?"* |
| **Grabación de pantalla** | Ninguna (B-roll de showroom) |
| **Motion graphics** | Mapa sutil de Santa Cruz → pin en Av. Banzer. Reloj: 9:14. Badge flotante: `Primera visita · GAC` |
| **Transición** | Corte en seco al brillo del kiosco en modo reposo |
| **Text overlays** | `Familia Ríos` · `Kiosco 1 · Showroom Viaggio` |
| **Objetivo emocional** | Identificación. El ejecutivo reconoce a *su* cliente. |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | No — requiere filmación en locación o B-roll de stock |
| **Requiere UI nueva** | No |
| **Puede mockearse** | **Sí (recomendado)** — 8–12 seg de video cinematográfico: familia entrando, SUV físico en piso, reflejo del kiosco. Comprimir con color grade frío→cálido |

---

## Escena 2 — El cliente usa el kiosco

| Campo | Detalle |
|-------|---------|
| **Duración** | 28 seg |
| **Narración** | *"Tocan la pantalla. Sin formulario. Sin vendedor encima. El sistema les da el control desde el primer segundo."* |
| **Grabación de pantalla** | **S01** Attract Loop → touch → **S02** Welcome (*Primera vez con GAC* → *Empezar*) → **S03** Vehicle Selector → tap GS4 MAX → **S22** Immersive Hero |
| **Motion graphics** | Pulso sutil en el CTA *"Tocá para empezar"*. Zoom cinematográfico 105% al entrar S22. Highlight en stat strip: garantía · airbags · precio desde |
| **Transición** | Match cut: movimiento del dedo en vidrio físico → touch en pantalla |
| **Text overlays** | `Sin presión` · `A su ritmo` · `GAC GS4 MAX` |
| **Objetivo emocional** | Alivio. El cliente — y el dueño — sienten que esto no es un folleto digital. |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | **Sí (parcial)** — S01–S03, S22 funcionan. S01 usa placeholder (sin video loop real). Stats en S22 pueden mostrar datos de demo |
| **Requiere UI nueva** | S01 con video loop real (`video-attract-loop` en manifest). Transición cinemática S03→S22 (expand card) |
| **Puede mockearse** | Overlay de motion graphics para enmascarar placeholders. B-roll del kiosco físico en primeros 5 seg |

**Rutas:** `/` · `/vehicles` · `/vehicles/gs4-max/hero`

---

## Escena 3 — Recorrido de confianza

| Campo | Detalle |
|-------|---------|
| **Duración** | 38 seg |
| **Narración** | *"Antes de vender deseo, el sistema construye confianza. Preguntas reales. Historia local. Un mecánico que habla claro — porque en Bolivia la duda no es el precio: es la confianza."* |
| **Grabación de pantalla** | **S22** → *¿Es confiable?* → **S25** FAQ (abrir 2 ítems: marca china + garantía) → **S24** Trust Story (scroll capítulos) → **S06** Tour Carlos (pasos 1–3: motor, garantía, respuestos) |
| **Motion graphics** | Barra de progreso del tour (teal). Avatar Carlos con badge *Mecánico Maestro*. Chips de objeción resueltas que aparecen y se desvanecen: `Repuestos SCZ` · `Garantía 5 años` |
| **Transición** | Scroll-linked parallax entre FAQ y Trust Story. Dissolve a card del tour |
| **Text overlays** | `Confianza antes que deseo` · `Tour de Confianza · Carlos` |
| **Objetivo emocional** | Seguridad intelectual. El ejecutivo ve que el sistema educa, no presiona. |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | **Sí** — S25, S24, S06 son las pantallas más sólidas del build. Copy completo en español |
| **Requiere UI nueva** | Video del taller Viaggio en S24 (asset P0). Tour completo 8 pasos (MVP muestra 5) |
| **Puede mockearse** | Sustituir `PlaceholderMedia` con stills de referencia en post-producción. Narración cubre gaps visuales |

**Rutas:** `/vehicles/gs4-max/trust/faq` · `/trust/story` · `/tour/trust`

---

## Escena 4 — Comparación con Corolla Cross

| Campo | Detalle |
|-------|---------|
| **Duración** | 32 seg |
| **Narración** | *"Comparan con honestidad. No es marketing agresivo — es una comparación donde se ve dónde gana cada uno. Porque un cliente informado compra con convicción."* |
| **Grabación de pantalla** | **S08** ADAS (footer *Comparar con Corolla Cross*) → **S11** Compare Hub → seleccionar Corolla Cross → **S12** Compare Detail (scroll filas: seguridad, garantía, equipamiento, reventa) |
| **Motion graphics** | Split-screen GS4 MAX vs Corolla Cross. Badges animados: `Nosotros ganamos` (teal) · `Ellos ganan` (gris). Highlight en fila reventa |
| **Transición** | Wipe horizontal desde centro — estilo keynote |
| **Text overlays** | `Comparación honesta` · `vs Toyota Corolla Cross` |
| **Objetivo emocional** | Respeto. El dueño piensa: *"Esto no miente al cliente."* |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | **Sí** — `CompareHubScreen` y ruta S12 implementados con contenido. Requiere trust threshold ≥2 (recorrer S24 + tour antes) |
| **Requiere UI nueva** | Fotos reales de Corolla Cross (mismo peso visual que GS4). Resolver conflicto airbags en truth matrix antes de distribución comercial |
| **Puede mockearse** | Thumbnails de competidor con stills de prensa. Motion graphics en post para enriquecer split-screen |

**Rutas:** `/vehicles/gs4-max/themes/safety/adas` · `/compare` · `/compare/corolla-cross`

---

## Escena 5 — Revisión de financiamiento

| Campo | Detalle |
|-------|---------|
| **Duración** | 26 seg |
| **Narración** | *"La cuota no es un misterio. Rangos orientativos por versión y plazo — con el disclaimer correcto. El cliente entiende el universo del pago antes de sentarse con finanzas."* |
| **Grabación de pantalla** | **S12** footer *Cuota orientativa* → **S26** Financing Preview: toggle GT/GL, plazos 24/36/48, animación de rango de cuota |
| **Motion graphics** | Números que cuentan hacia arriba (count-up) en la cuota. Chip de banco BOB. Disclaimer legal en fade inferior |
| **Transición** | Zoom out desde cifra de cuota → card de conversión |
| **Text overlays** | `Cuota orientativa` · `GT · 36 meses` · `Consultá con asesor para tasa exacta` |
| **Objetivo emocional** | Control financiero. Reduce el miedo al "sorpresón" en el escritorio. |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | **Sí** — `FinancingPreviewScreen` cableado con `financing.json`. Interactivo y demo-ready |
| **Requiere UI nueva** | Integración con tasas reales del concesionario (futuro). Logos de bancos aliados |
| **Puede mockearse** | Los rangos actuales son referenciales — válidos para demo con disclaimer visible |

**Ruta:** `/vehicles/gs4-max/economics/financing`

---

## Escena 6 — El cliente pide un asesor

| Campo | Detalle |
|-------|---------|
| **Duración** | 24 seg |
| **Narración** | *"Cuando están listos para un humano, no llenan un formulario de diez campos. Un toque. El sistema ya sabe todo lo que exploraron."* |
| **Grabación de pantalla** | **S26** → **S13** Conversion Hub (recap chips: confianza, ADAS, vs Corolla Cross, cuota 36 meses) → tap **"Quiero hablar con un asesor ahora"** → confirmación |
| **Motion graphics** | Chips del recap que vuelan hacia un nodo central *"Sesión lista para handoff"*. Pulso rojo suave en CTA de asesor. Timer: `Enviando al piso...` |
| **Transición** | Flash blanco mínimo (2 frames) → corte a tablet del vendedor |
| **Text overlays** | `Lead caliente` · `22 min de recorrido` · `Objeción resuelta: marca china` |
| **Objetivo emocional** | Momento de decisión. El cliente pide ayuda; el sistema no la desperdicia. |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | **Parcial** — S13 `ConversionHubScreen` funciona con recap dinámico, pero **no tiene card "Asesor ahora"**. CTAs actuales: prueba de manejo, WhatsApp, cuota, compartir |
| **Requiere UI nueva** | **S36 Consultant Live Handoff** — modal con confirmación, SLA de 2 min, y evento `consultant_handoff` al backend |
| **Puede mockearse** | **Sí (recomendado para video)** — Mockup Figma/After Effects del modal S36, o grabar S13 y superponer card "Asesor ahora" en post. Alternativa: usar WhatsApp handoff (S15) como proxy narrativo |

**Ruta objetivo:** `/vehicles/gs4-max/convert` + overlay S36

---

## Escena 7 — El vendedor recibe la alerta

| Campo | Detalle |
|-------|---------|
| **Duración** | 30 seg |
| **Narración** | *"En la tablet de Javier, la alerta no dice solo 'cliente en piso'. Dice quién es, qué comparó, qué objeción tuvo, y cómo abrir la conversación."* |
| **Grabación de pantalla** | **`/staff`** Staff Dashboard: badge *1 caliente esperando* → lead **Familia Ríos** sube en cola → panel Handoff Report → línea sugerida → tap **Reclamar lead** |
| **Motion graphics** | Notificación push estilo iOS (mock): *"Familia Ríos · Asesor solicitado · Kiosco 1"*. Timer de espera en count-up (1:34). Highlight en campos: comparación, financiamiento, objeciones |
| **Transición** | Split screen: kiosco (izq, estático) + tablet (der, activo) → full tablet |
| **Text overlays** | `Javier Morales · Asesor` · `SLA: < 2 min` · `Perfil técnico-familiar` |
| **Objetivo emocional** | Empoderamiento del vendedor. "Por fin llego preparado." |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | **Sí** — `/staff` con `StaffDashboard` y datos demo (`operations-data.ts`). Lead "Familia Ríos" pre-cargado con narrativa coherente |
| **Requiere UI nueva** | Conexión en tiempo real kiosco→tablet (WebSocket/Supabase). Push notification nativa en tablet |
| **Puede mockearse** | Notificación push en post-producción. Datos demo ya son cinematográficos — no requiere backend |

**Ruta:** `/staff`

---

## Escena 8 — La gerente ve el tablero en vivo

| Campo | Detalle |
|-------|---------|
| **Duración** | 28 seg |
| **Narración** | *"Marcela no espera al cierre de mes. Ve el pulso del piso ahora: sesiones activas, calientes en espera, pruebas del día, y si alguien está rompiendo el SLA."* |
| **Grabación de pantalla** | **`/manager`** Manager Dashboard: métricas superiores → tabla sesiones activas (Familia Ríos en *Conversión · Asesor ahora*) → roster de vendedores → embudo de conversión del día |
| **Motion graphics** | Heatmap sutil en kioscos activos. Línea de SLA en verde. Contador de sesiones que incrementa |
| **Transición** | Pull-back: tablet de Javier en piso → monitor de gerente en oficina vidriada |
| **Text overlays** | `Marcela Ríos · Gerente comercial` · `4 sesiones activas` · `SLA 94%` |
| **Objetivo emocional** | Control operativo. El dueño ve que puede gestionar sin microgestionar. |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | **Sí** — `/manager` con `ManagerDashboard` completo. Tema oscuro premium, datos demo coherentes |
| **Requiere UI nueva** | Datos en vivo (no estáticos). Reasignación de leads drag-and-drop. Alertas configurables |
| **Puede mockearse** | Datos demo son suficientes para video. B-roll de gerente mirando monitor opcional |

**Ruta:** `/manager`

---

## Escena 9 — El ejecutivo ve el reporte semanal

| Campo | Detalle |
|-------|---------|
| **Duración** | 35 seg |
| **Narración** | *"El lunes, dirección no recibe una planilla. Recibe inteligencia: qué objeciones crecieron, contra quién se comparan, qué mensajes convierten, y cuánto ingreso atribuyó el showroom digital esta semana."* |
| **Grabación de pantalla** | **`/executive`** Executive Dashboard: KPIs (118 visitas, 47 leads, 22 pruebas, 8 ventas, USD 284.500) → gráficos de tendencia → top objeciones → competidores (Corolla Cross: 31 comparaciones) → insights automáticos |
| **Motion graphics** | Barras de tendencia que crecen. Insight cards que aparecen uno a uno. Línea de atribución: `Kiosco → Lead → Venta` |
| **Transición** | Slow zoom out desde gráfico → escritorio ejecutivo. Cambio de tempo musical |
| **Text overlays** | `Semana 10–15 Jun 2026` · `+15% ingresos atribuidos` · `CPI-OS Intelligence` |
| **Objetivo emocional** | Visión estratégica. "Esto es un activo que crece, no un gasto de marketing." |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | **Sí** — `/executive` con `ExecutiveDashboard`, KPIs, `TrendChart`, objeciones y competidores |
| **Requiere UI nueva** | Export PDF, envío automático lunes 07:00, integración CRM para ventas reales |
| **Puede mockearse** | Datos demo son presentables. Ajustar cifras a metas del concesionario piloto si es necesario |

**Ruta:** `/executive`

---

## Escena 10 — La venta se cierra

| Campo | Detalle |
|-------|---------|
| **Duración** | 30 seg |
| **Narración** | *"Javier no repite quince minutos de catálogo. Llega con contexto. Los Ríos firman el GS4 MAX — y el sistema registra no solo la venta, sino el camino que la hizo posible. La próxima familia con la misma duda encontrará un concesionario que ya aprendió."* |
| **Grabación de pantalla** | B-roll: Javier con familia junto al vehículo → handshake → **`/staff`** lead marcado *Venta cerrada* (mock) → flash de atribución en **`/executive`** (+1 venta) |
| **Motion graphics** | Línea de tiempo resumida (10 nodos en 5 seg). Badge final: `Venta atribuida · Sesión kiosco`. Logo CPI-OS + tagline |
| **Transición** | Fade to black → logo hold 3 seg |
| **Text overlays** | `GAC GS4 MAX GT · Gris` · `Venta atribuida` · `CPI-OS — Tu concesionaria piensa, aprende y vende mejor.` |
| **Objetivo emocional** | Cierre emocional + ambición. El ejecutivo quiere esto en *su* piso. |

### Viabilidad de producción

| Estado | Notas |
|--------|-------|
| **Grabable en build actual** | **No** — no hay flujo de cierre de venta ni estado "won" en UI |
| **Requiere UI nueva** | Acción *Marcar venta cerrada* en S35 + sync CRM + tarjeta de atribución en S38/reporte |
| **Puede mockearse** | **Sí (recomendado)** — B-roll de entrega de llaves + motion graphics de línea de tiempo. Overlay de KPI +1 en executive dashboard |

---

## Resumen de viabilidad por escena

| # | Escena | Duración | Build actual | UI nueva | Mock |
|---|--------|----------|--------------|----------|------|
| 1 | Cliente llega | 0:22 | — | — | **B-roll** |
| 2 | Usa kiosco | 0:28 | **Parcial** | S01 video | Overlay MG |
| 3 | Confianza | 0:38 | **Sí** | Assets video | Stills en post |
| 4 | Compara Corolla Cross | 0:32 | **Sí** | Fotos competidor | Thumbnails |
| 5 | Financiamiento | 0:26 | **Sí** | Tasas reales | — |
| 6 | Pide asesor | 0:24 | **Parcial** | **S36** | **Modal mock** |
| 7 | Alerta vendedor | 0:30 | **Sí** | Real-time sync | Push mock |
| 8 | Tablero gerente | 0:28 | **Sí** | Live data | — |
| 9 | Reporte ejecutivo | 0:35 | **Sí** | PDF/CRM | — |
| 10 | Venta cierra | 0:30 | — | Cierre + CRM | **B-roll + MG** |
| | **Prologo** | 0:18 | — | — | MG |
| | **Puente** | 0:10 | — | — | MG |
| | **TOTAL** | **~4:15** | | | |

---

## Matriz de grabación — Qué capturar esta semana

### Listo para screen recording (sin código nuevo)

1. **S02 → S03 → S22** — Entrada al producto  
2. **S25 → S24 → S06** — Arco de confianza (mejor material visual del build)  
3. **S08 → S11 → S12** — Comparación (completar trust threshold antes de grabar)  
4. **S26** — Financiamiento interactivo  
5. **S13** — Hub de conversión con chips de recap poblados  
6. **`/staff`** — Alerta Familia Ríos + handoff report  
7. **`/manager`** — Pulso del piso  
8. **`/executive`** — Reporte semanal  

### Bloqueantes P0 antes de grabación final

| Prioridad | Entrega | Escena impactada |
|-----------|---------|------------------|
| P0 | **S36** modal *"Quiero hablar con un asesor ahora"* en S13 | 6, 7 |
| P0 | Video loop S01 o B-roll que lo reemplace | 2 |
| P1 | Card *Asesor ahora* prominente en S13 (highlightPrimary) | 6 |
| P1 | Al menos 3 assets hero reales (GS4 MAX) | 2, 3, 4 |
| P2 | Estado *Venta cerrada* en staff dashboard | 10 |

### Mocks recomendados para primera versión del video

| Elemento | Herramienta | Esfuerzo |
|----------|-------------|----------|
| Llegada al showroom | Filmación iPhone + grade | 2 horas |
| Modal S36 | Figma → After Effects o screen comp | 4 horas |
| Push notification tablet | Motion template | 1 hora |
| Entrega de llaves / cierre | Stock o filmación en piso | 2 horas |
| Línea de tiempo venta | Motion graphics | 3 horas |

---

## Guía de estilo — Motion y transiciones

| Momento | Estilo | Referencia |
|---------|--------|------------|
| Cliente en kiosco | Dissolves lentos, parallax suave, reveals 600 ms | Apple product film |
| Datos en pantalla | Count-up numérico, chips que orbitan | Tesla AI Day overlays |
| Operaciones (staff/manager) | Cortes más rápidos, split-screen, UI clara sobre fondo oscuro | Stripe Dashboard promos |
| Ejecutivo | Zoom out épico, gráficos que respiran | Palantir / enterprise keynote |
| Entre actos | Flash blanco 2f + cambio de música | Product launch pacing |

**Reglas:**
- Nunca más de 2 text overlays simultáneos  
- Narración siempre termina 0.5 seg antes del corte  
- Sonido de touch en kiosco (sutil) — silencio en dashboards  
- Respetar `prefers-reduced-motion` en versión accesible alternativa  

---

## Script de narración completo (referencia)

```
[PROLOGO]
Cada familia que entra a tu concesionaria merece la calma de un showroom premium —
y tu equipo merece saber exactamente cuándo intervenir.
CPI-OS conecta ambos mundos.

[1 — LLEGADA]
Sábado por la mañana. Los Ríos llegan sin cita.
Vieron el GS4 MAX en Instagram, pero traen la misma pregunta que muchos bolivianos:
¿puedo confiar en una marca que no conozco?

[2 — KIOSCO]
Tocan la pantalla. Sin formulario. Sin vendedor encima.
El sistema les da el control desde el primer segundo.

[3 — CONFIANZA]
Antes de vender deseo, el sistema construye confianza.
Preguntas reales. Historia local. Un mecánico que habla claro —
porque en Bolivia la duda no es el precio: es la confianza.

[4 — COMPARACIÓN]
Comparan con honestidad. No es marketing agresivo —
es una comparación donde se ve dónde gana cada uno.
Porque un cliente informado compra con convicción.

[5 — FINANCIAMIENTO]
La cuota no es un misterio. Rangos orientativos por versión y plazo —
con el disclaimer correcto.
El cliente entiende el universo del pago antes de sentarse con finanzas.

[PUENTE]
El piso despierta.

[6 — ASESOR]
Cuando están listos para un humano, no llenan un formulario de diez campos.
Un toque. El sistema ya sabe todo lo que exploraron.

[7 — VENDEDOR]
En la tablet de Javier, la alerta no dice solo "cliente en piso".
Dice quién es, qué comparó, qué objeción tuvo, y cómo abrir la conversación.

[8 — GERENTE]
Marcela no espera al cierre de mes.
Ve el pulso del piso ahora: sesiones activas, calientes en espera,
pruebas del día, y si alguien está rompiendo el SLA.

[9 — EJECUTIVO]
El lunes, dirección no recibe una planilla. Recibe inteligencia:
qué objeciones crecieron, contra quién se comparan,
qué mensajes convierten, y cuánto ingreso atribuyó el showroom digital esta semana.

[10 — CIERRE]
Javier no repite quince minutos de catálogo. Llega con contexto.
Los Ríos firman el GS4 MAX — y el sistema registra no solo la venta,
sino el camino que la hizo posible.
La próxima familia con la misma duda encontrará un concesionario que ya aprendió.

[TAGLINE]
CPI-OS. Tu concesionaria piensa, aprende y vende mejor.
```

**Palabras totales:** ~290 · **Velocidad de lectura:** ~68 palabras/min → ~4:15 con pausas

---

## Checklist de producción

### Pre-producción
- [ ] Aprobar protagonista: Familia Ríos (alineado con `CPI_OS_EXECUTIVE_NARRATIVE_ES.md`)
- [ ] Confirmar locutor/a (es-BO, voseo opcional)
- [ ] Componer o licenciar música (3 stems: cliente / operaciones / cierre)
- [ ] Resolver mock S36 o implementar en build
- [ ] Limpiar sesión kiosco antes de cada take (`SessionProvider` reset)

### Grabación
- [ ] Kiosco en 1920×1080, modo demo, navegador sin chrome
- [ ] Tablet en `/staff` con lead Familia Ríos seleccionado
- [ ] Monitor en `/manager` y `/executive`
- [ ] B-roll showroom si hay acceso a Viaggio Motors

### Post-producción
- [ ] Color grade unificado (desaturación −8%, sombras elevadas)
- [ ] Subtítulos ES + versión sin voz (música + overlays)
- [ ] Export: 4K master · 1080p web · 60 seg teaser vertical (escenas 2+7+9)

---

## Entregables

| Entregable | Formato | Uso |
|------------|---------|-----|
| **Demo completo** | MP4 16:9 · 3:30–4:30 | Presentaciones a dueños, ferias, web |
| **Teaser 60 seg** | MP4 9:16 y 16:9 | Instagram, WhatsApp ejecutivos |
| **Cut silencioso** | MP4 + SRT | Presentador en vivo en sala |
| **Stills** | PNG por escena | Pitch deck, propuestas |

---

## Referencias cruzadas

| Documento | Uso en este plan |
|-----------|------------------|
| [CPI_OS_EXECUTIVE_NARRATIVE_ES.md](./CPI_OS_EXECUTIVE_NARRATIVE_ES.md) | Personajes (Ríos, Javier, Marcela), arco narrativo |
| [demo-walkthrough.md](../demo-walkthrough.md) | Ruta canónica de grabación kiosco |
| [creative-direction.md](../creative-direction.md) | Paleta, tipografía, motion language |
| [demo-readiness-scorecard.md](../demo-readiness-scorecard.md) | Estado de pantallas al 14 Jun 2026 |
| [screen-map.md](../screen-map.md) | IDs S01–S37 |
| `lib/demo/operations-data.ts` | Datos demo para escenas 7–9 |

---

*Documento de planificación creativa — no requiere build desplegado para aprobarse. La primera versión del video puede producirse con 70% screen capture del build actual + 30% mock/B-roll.*
