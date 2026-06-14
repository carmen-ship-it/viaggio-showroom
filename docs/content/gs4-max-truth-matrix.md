# GAC GS4 MAX — Truth Matrix (Master Validation Table)

**Mercado:** Bolivia  
**Distribuidor:** Viaggio Motor S.A. (Grupo Roda)  
**Alcance de revisión:** `gs4-max-master-content.md`, JSON en `content/vehicles/gs4-max/`, guiones Carlos / Sofía / Diego, plantilla compare, gap analysis existente  
**Fecha:** junio 2026  
**Perspectivas:** Product Owner · Especialista de producto vehículo · QA Lead · Gerente de operaciones Viaggio Motors  

**Propósito:** Una sola tabla de verdad para cada claim comercial antes de MVP y producción. Ningún dato se publica en showroom hasta que la columna *Conflicting values* esté vacía o documentada con disclaimer aprobado.

---

## Resumen ejecutivo

### Estado general

El repositorio contiene **dos capas de verdad desalineadas**:

| Capa | Rol | Confiabilidad para claims técnicos |
|------|-----|-----------------------------------|
| **Maestro** (`gs4-max-master-content.md`) | Fuente estratégica alineada a gac.com.bo y comunicados Viaggio/GAC | **Alta** — pendiente validación de unidad de piso |
| **JSON operativo** (`content/vehicles/gs4-max/`) | Lo que el showroom renderizará | **Baja** — stubs, metadata incompleta, conflictos internos |
| **Guiones de narración** | Voz de Carlos, Sofía, Diego | **Media** — ricos en contexto, algunos claims no verificados |
| **Compare template** | Validación racional vs Corolla Cross | **No publicar** — airbags incorrectos |

**Veredicto conjunto:** El GS4 MAX está **documentado para ventas humanas** pero **no es confiable para showroom digital** hasta resolver **9 conflictos P0** y obtener **ficha Bolivia firmada** por Viaggio/GAC.

---

### Conflictos críticos (todos los documentos)

| # | Atributo | Conflicto | Riesgo de showroom |
|---|---------|-----------|-------------------|
| 1 | **Pantalla central** | Maestro **10,1"** vs JSON / Sofía / compare **12,3"** | Cliente ve pantalla en unidad → desconfianza inmediata |
| 2 | **Airbags** | Maestro **8** vs compare template **6** vs structure.json **"múltiples"** | Claim de seguridad #1 del producto queda invalidado |
| 3 | **Transmisión Bolivia** | Maestro **7WDCT único** vs metadata **6AT / 7DCT** vs Carlos **ambas según versión** | Carlos pierde credibilidad técnica |
| 4 | **Alcance garantía** | Maestro **vehículo general 5 años** vs Carlos **motor y transmisión 5 años** | Objeción legal post-venta |
| 5 | **Versiones / trims** | Maestro **2 full equipo (4x2 + AWD)** vs Diego **"versión GT"** con asientos ventilados | Publicar GT implica trim no comercializado |
| 6 | **Precio** | Maestro **$42.900 / $48.900** vs `priceFrom: 0` vs lanzamiento histórico **$34.900** | Sin ancla de valor; objeción de subida de precio sin narrativa |
| 7 | **Tracción en metadata** | Maestro **4x2 + AWD** vs `vehicle.json` **FWD only** | Cliente AWD no encuentra su versión |
| 8 | **Mantenimiento sin costo** | Maestro detallado **3 años / 100.000 km** vs `maintenance.json` **omitido** | Promesa comercial central invisible en producto |
| 9 | **Android Auto** | Sofía **CarPlay + Android Auto inalámbrico** vs maestro **solo Apple CarPlay** | Claim de conectividad falso si no aplica |

---

### Riesgos de lanzamiento (por impacto en confianza)

| Riesgo | Probabilidad | Impacto | Mitigación mínima |
|--------|--------------|---------|-------------------|
| Cliente compara pantalla showroom vs unidad física | Alta | Crítico | Medir unidad Bolivia antes de MVP |
| Compare publica 6 airbags cuando competidor tiene 7 | Alta | Crítico | Corregir template; no desplegar compare hasta P0 |
| Carlos dice 6AT disponible; stock solo 7WDCT | Media | Alto | Unificar guion a transmisión comercializada |
| Diego "un año de propiedad" sin owner real | Media | Alto | Marcar ficticio o reemplazar con testimonial verificado |
| Financiamiento / WhatsApp placeholder | Alta | Alto | Datos reales Viaggio ops antes de CTA conversión |
| Consumo WLTC 6,8 L/100 km vs 9–10 km/l ciudad sin contexto | Media | Medio | Etiquetar unidad de medida y condición (lab vs real) |
| C-NCAP 5 estrellas sin fecha / versión probada | Media | Alto | Obtener certificado o link oficial antes de badge |
| FAQ/objeciones solo en maestro, pantalla S25 vacía | Alta | Alto | Desplegar FAQ desde maestro con claims corregidos |

---

## Leyenda

| Campo | Significado |
|-------|-------------|
| **Confidence** | **Alta** = fuentes alineadas o fuente única oficial · **Media** = alineación parcial · **Baja** = conflicto activo o dato inferido |
| **Verification required** | Acción concreta para cerrar el claim |
| **Recommended source of truth** | Autoridad que debe prevalecer tras verificación |
| **Priority** | **P0** = bloquea MVP · **P1** = bloquea producción · **P2** = puede diferirse |

---

## Matriz de validación maestra

### Motor

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Denominación motor | 1.5 litros turbo / 1.5 TGDI / Julang Power 3ª gen | Maestro § mantenimiento, motor; `vehicle.json` metadata "1.5L Turbo"; `engine.json`; Carlos § motor | Maestro usa TGDI + Julang; JSON solo "1.5L Turbo" | Media | Confirmar nomenclatura oficial ficha Bolivia | Ficha técnica GAC Motor Bolivia / unidad comercial | P1 |
| Cilindrada | 1.5 L | Maestro; todos los JSON | — | Alta | Ninguna | gac.com.bo / ficha global | P2 |
| Tecnología inyección | Inyección directa 350 bar, turbo baja inercia, intercooler agua | Maestro § mantenimiento | No aparece en JSON ni guiones | Media | Validar aplica a ambas versiones Bolivia | Ficha global GAC Motor + confirmación importador | P1 |
| Cadena de distribución | Cadena (no correa) | Carlos § motor | No en maestro ni JSON | Media | Confirmar spec motor Julang en unidad Bolivia | Carlos guion solo tras validación mecánica Viaggio | P1 |
| Combustible mínimo | Gasolina 92 octanos o superior | Maestro § ficha global | No en JSON | Alta | Confirmar política garantía con 87 en provincia | gac.com.bo + términos garantía | P2 |

---

### Potencia

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Potencia 4x2 / Full Equipo | **177 HP** | Maestro (hero, versiones, FAQ) | Ausente en JSON, topics, compare | Media | Confirmar HP en unidad 4x2 Bolivia | gac.com.bo/gs4-max + ficha importador | **P0** |
| Potencia AWD / Full Equipo AWD | **248 HP** | Maestro (hero, versiones, FAQ) | Ausente en JSON; metadata sin AWD | Media | Confirmar HP versión AWD en stock | gac.com.bo/gs4-max | **P0** |
| Potencia en narración | "Rendimiento adecuado" / "empuje para adelantar" sin cifra | `engine.json`; Diego § road-trips | Sin números vs maestro explícito | Baja | Alinear JSON con cifras aprobadas o omitir HP en stubs | Maestro (post-validación) | **P0** |

---

### Torque

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Torque 4x2 | **270 Nm** | Maestro (hero, versiones, FAQ) | Ausente en JSON | Media | Confirmar en ficha Bolivia | gac.com.bo/gs4-max | **P0** |
| Torque AWD | **400 Nm** | Maestro (hero, versiones, FAQ) | Ausente en JSON | Media | Confirmar en ficha AWD | gac.com.bo/gs4-max | **P0** |

---

### Transmisión

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Tipo comercializado Bolivia | Automática **7 velocidades (7WDCT)** — doble embrague húmedo | Maestro (hero, tecnología, mantenimiento) | `vehicle.json` metadata: **"6AT / 7DCT"**; Carlos: **6AT o 7DCT según versión** | **Baja** | Confirmar qué caja trae cada trim en stock Bolivia; eliminar opción no vendida | Unidad de piso + lista de precios Viaggio | **P0** |
| Denominación técnica | 7WDCT | Maestro | JSON: 7DCT (abreviado) | Alta | Solo nomenclatura | Ficha GAC | P2 |
| Comportamiento / mantenimiento fluido | Revisión en servicios programados; manejo tranquilo en arranques (7DCT) | Carlos § transmisión | `maintenance.json` = 1 frase genérica | Media | Validar intervalo cambio fluido DCT | Manual propietario + taller Viaggio | P1 |

---

### Consumo de combustible

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Consumo combinado (norma) | **6,8 L/100 km (WLTC)** | Maestro § ficha global, FAQ, objeciones | No en JSON key stats | Media | Confirmar si WLTC aplica a spec export Bolivia | Ficha global GAC Motor | P1 |
| Consumo ciudad (real / orientativo) | **~9–10 km/l** con tráfico real | `vehicle.json` key stat; Diego § daily-driving | Maestro solo WLTC L/100 km — **unidades distintas**, no conflicto directo pero puede confundir | Media | Etiquetar siempre "orientativo / uso real Santa Cruz" vs "ficha WLTC" | Diego + maestro con disclaimers separados | **P0** |
| Consumo en ruta | "Rinde más que en ciudad" (cualitativo) | Diego § road-trips | Sin cifra | Baja | Opcional: km/l ruta orientativo post test interno | Viaggio test drive log | P2 |
| Variación altitud La Paz / El Alto | FAQ genérico: "motor turbo diseñado para distintas condiciones; recomendamos test drive" | Maestro FAQ | Sin dato de consumo ni rendimiento a 3.600 m | Baja | Test drive La Paz + opinión técnica Carlos documentada | Viaggio La Paz + ficha importador | **P0** |

---

### Airbags

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Cantidad total | **8 airbags de serie** | Maestro (hero, seguridad, FAQ, comparativas, objeciones) | **Compare template: 6 airbags** · `structure.json`: "múltiples airbags" · `adas.json`: sin conteo | **Baja** | Contar y listar posiciones en unidad Bolivia; corregir compare | Inspección unidad + ficha GAC Bolivia | **P0** |
| Configuración (frontales, laterales, cortina, etc.) | "Protección integral delanteros y traseros" (cualitativo) | Maestro § seguridad pasiva | Sin diagrama ni lista en JSON | Baja | Obtener diagrama oficial 8 airbags | Material GAC Motor / manual | P1 |
| Compare vs Corolla Cross | GS4 MAX 6 (template) vs Toyota 7 (template) | `compare.gs4-max.corolla-cross.json` | Maestro afirma ventaja 8 vs competencia | **Baja** | Re-verificar ambos lados con fichas 2025/2026 | Fichas versiones equivalentes Bolivia | **P0** |

---

### ADAS (asistencias al conductor)

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Frenado automático de emergencia (AEB) | De serie | Maestro; `adas.json`; Carlos; Sofía | — | Alta | Confirmar homologación Bolivia | Ficha equipamiento unidad | P1 |
| Control de crucero adaptativo (ACC) | De serie | Maestro; `adas.json`; Carlos; Diego (versiones equipadas) | Diego: "en las versiones equipadas" vs maestro "de serie" full equipo | Media | Confirmar ACC en ambos trims Full Equipo | Unidad de piso | **P0** |
| Alerta de cambio de carril (LDW/LKA) | De serie | Maestro; `adas.json`; Carlos; Sofía | — | Alta | Confirmar tipo (alerta vs asistencia activa) | Ficha GAC | P1 |
| Cámara panorámica 360° | De serie | Maestro; `adas.json`; todos los guiones | — | Alta | Demo en test drive | Unidad de piso | P1 |
| Conteo sistemas ADAS | **"6+"** sistemas (`adas.json` stat) | `adas.json` | Maestro lista 4 nombrados; gap analysis sugiere BSD, TJA, HMA posibles | Media | Lista cerrada oficial equipamiento Bolivia | Ficha importador | P1 |
| ADiGO Pilot / suite | Mencionado | Maestro § tecnología | No en JSON topics | Media | Confirmar branding ADiGO en unidad Bolivia | GAC Bolivia | P2 |
| Cuatro modos de conducción | De serie | Maestro § tecnología | No en JSON | Media | Confirmar modos y nombres en UI unidad | Manual propietario | P1 |
| Disclaimer conductor | "No reemplazan tu atención" | Maestro; Carlos; `adas.json` | — | Alta | Mantener en todo copy ADAS | Legal / GAC | P2 |

---

### Pantallas (tamaños)

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Pantalla central táctil | **10,1"** | Maestro (tecnología, compare notes, apéndice discrepancias) | **`vehicle.json` key stat: 12,3"** · **`tech-overview.json`**: 12,3" · **Sofía § tecnología**: 12,3" · **Compare**: 12,3" | **Baja** | **Medir unidad comercial Bolivia**; actualizar todos los activos al valor único | Unidad de piso Viaggio (P0 blocker) | **P0** |
| Cluster / pantalla conductor | No documentado | — | — | Baja | Obtener spec si aplica (ej. 7" digital) | Ficha GAC | P2 |

---

### Volumen de carga (maletero)

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Capacidad estándar | **638 L** | Maestro § ficha global, confort, FAQ | `family-comfort.json`: "maletero versátil" sin cifra; Diego: cualitativo | Media | Confirmar método medición VDA vs SAE | Ficha global GAC Motor | P1 |
| Capacidad asientos abatidos | **1.586 L** | Maestro | No en JSON | Media | Idem | Ficha global GAC Motor | P1 |
| Piso plano / respaldos abatibles | Sí (cualitativo) | Diego § compras | No spec en maestro | Media | Verificar en unidad | Unidad de piso | P2 |
| Portón trasero eléctrico | "En la versión que lo trae" (Diego) | Diego § compras | Maestro: **full equipo único** sin mencionar portón eléctrico | **Baja** | Confirmar si incluido en Full Equipo Bolivia | Lista equipamiento Viaggio | **P0** |

---

### Dimensiones

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| L × A × H | **4.685 × 1.901 × 1.690 mm** | Maestro § ficha global | Ausente en JSON (`specs.json` no existe) | Media | Confirmar no varía spec export Bolivia | gac-motor.com specification | P1 |
| Distancia entre ejes | **2.750 mm** | Maestro § ficha global, confort | Ausente en JSON | Media | Idem | Ficha global GAC | P1 |
| Capacidad ocupantes | 5 pasajeros | Maestro | Implícito en todos los guiones | Alta | Ninguna | Maestro | P2 |
| Aceleración 0–100 km/h | **8,8 s** | Maestro § ficha global | No en otros docs | Media | Confirmar versión medida (4x2 vs AWD) | Ficha global | P2 |
| Velocidad máxima | **190 km/h** | Maestro § ficha global | No en otros docs | Media | Idem | Ficha global | P2 |
| Despeje / ángulos / peso / remolque | No documentado | — | — | Baja | Completar `specs.json` | Ficha importador | P1 |

---

### Garantía

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Garantía general vehículo | **5 años o 150.000 km** (lo que ocurra primero) | Maestro § garantía, FAQ, hero | `warranty-terms.json`: alineado en headline | Media | Obtener PDF términos vigentes GAC Bolivia | Documento legal GAC Motor Bolivia | **P0** |
| Alcance componentes | Maestro: **garantía general del vehículo** (defectos fabricación) | Maestro § garantía | **Carlos § garantía: "motor y transmisión — el corazón del auto"**; resto "coberturas específicas" | **Baja** | Legal Viaggio: tabla completa por componente ( carrocería, pintura, batería, ADAS, etc.) | PDF garantía oficial | **P0** |
| Cobertura motor/transmisión | 5 años / 150.000 km (implícito en maestro; explícito en Carlos) | Carlos; maestro | Redacción distinta puede confundir al cliente | Media | Unificar copy: general vs powertrain | Legal GAC Bolivia | **P0** |
| Exclusiones | "Según términos y condiciones oficiales" | Maestro disclaimer | No detalladas en JSON | Baja | Publicar resumen + link PDF | Legal Viaggio | P1 |
| Activación garantía | Taller Viaggio autorizado | Maestro; `warranty-terms.json`; `viaggio-service.json` | — | Alta | Confirmar procedimiento | Viaggio ops | P1 |

---

### Mantenimiento

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Mantenimiento sin costo | **3 años o 100.000 km** (lo que ocurra primero) | Maestro (hero, garantía, FAQ, objeciones, comparativas) | **`maintenance.json`: NO menciona** · **`warranty-terms.json`: NO menciona** | **Baja** | **Lista ítem por ítem** qué incluye (aceite, filtros, mano de obra, exclusiones) | Viaggio finance / postventa | **P0** |
| Intervalo servicio aceite | **Cada 10.000 km** | Carlos § motor | Maestro: "intervalos definidos por fabricante" sin cifra | Media | Confirmar intervalo oficial Bolivia | Manual mantenimiento GAC | **P0** |
| Ejecución | Talleres autorizados Viaggio | Maestro; Carlos; JSON service topics | `viaggio-service.json` solo menciona Santa Cruz | Media | Confirmar talleres LP, El Alto, CBBA | Viaggio ops | P1 |
| Post programa (costos estimados) | No documentado | — | — | Baja | Tabla servicios 10k/20k/40k BOB orientativos | Viaggio taller | P1 |
| Condiciones locales (polvo, calor) | Filtros en temporada seca | Carlos § mantenimiento | No en JSON | Media | Validar recomendación con taller SCZ | Viaggio taller | P2 |

---

### Ejemplos de financiamiento

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Precio lista USD 4x2 | **$us 42.900** — GS4 MAX Full Equipo | Maestro (hero, versiones, FAQ) | `vehicle.json` **`priceFrom: 0`** | **Baja** | Actualizar JSON + confirmar vigencia junio 2026 | gac.com.bo/gs4-max | **P0** |
| Precio lista USD AWD | **$us 48.900** — GS4 MAX Full Equipo AWD | Maestro | Ausente en JSON | **Baja** | Idem | gac.com.bo/gs4-max | **P0** |
| Precio lanzamiento histórico | **$us 34.900** (dic. 2024) | Maestro apéndice | vs lista actual — sin narrativa en contenido cliente | Media | Preparar respuesta objeción "¿por qué subió?" | Viaggio comercial | P1 |
| Precio BOB | "Consultar asesor" / disclaimer orientativo | Maestro; `vehicle.json` priceDisclaimer | Sin tipo de cambio ni monto | Baja | Banda BOB + disclaimer TC del día | Viaggio finance desk | **P0** |
| Cuotas ejemplo (24/36/48 meses) | No existe | — | Gap analysis P0 | Baja | Bandas orientativas por versión con disclaimer | Viaggio finance desk | **P0** |
| Entidades financieras | "Condiciones varían según entidad" | Maestro FAQ | Sin nombres de bancos | Baja | Lista partners aprobados + logos | Viaggio finance | **P0** |
| Requisitos / simulación | Contactar asesor | Maestro FAQ | — | Alta | Mantener derivación humana | Viaggio comercial | P2 |

---

### Calificaciones de seguridad

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| C-NCAP | **5 estrellas** | Maestro (hero, seguridad, FAQ, objeciones, comparativas) | **`structure.json`: sin mención** · **`adas.json`: sin mención** | Media | Fecha prueba, versión probada, link certificado | c-ncap.org / comunicado GAC | **P0** |
| Estructura UHSS | Acero ultra alta resistencia en zonas críticas | Maestro § seguridad pasiva | `structure.json`: "alta resistencia" genérico | Media | Material técnico GAC | Ficha global | P1 |
| Homologación ADAS Bolivia | "Sistemas homologados" (maestro narrativa) | Maestro § seguridad | Sin certificado citado | Baja | Confirmar con importador | Viaggio / GAC Bolivia | P1 |
| Otros ratings (Latin NCAP, etc.) | No documentado | — | — | Baja | Verificar si aplica mercado Bolivia | GAC export | P2 |

---

### Intervalos de servicio

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Primer servicio / intervalo base | **10.000 km** (aceite) | Carlos § motor | Maestro no especifica km | Media | Tabla completa oficial | Manual mantenimiento GAC | **P0** |
| Servicios incluidos "sin costo" | "Servicios programados de fábrica" (genérico) | Maestro § garantía | Sin desglose | Baja | Enumerar servicios 1º, 2º, 3º... incluidos | Viaggio postventa | **P0** |
| Historial digital | Mencionado | Carlos § mantenimiento | No en JSON | Baja | Confirmar si operativo en Bolivia | Viaggio CRM / taller | P2 |

---

### Trims disponibles en Bolivia

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| GS4 MAX Full Equipo | 4x2 · 177 HP · 270 Nm · **$us 42.900** | Maestro § versiones | `vehicle.json` drivetrain **FWD only**; sin precio | Media | Confirmar stock y colores | gac.com.bo + Viaggio inventario | **P0** |
| GS4 MAX Full Equipo AWD | 4x4 · 248 HP · 400 Nm · **$us 48.900** | Maestro § versiones | No reflejado en metadata JSON | Media | Confirmar disponibilidad AWD en red | Viaggio inventario | **P0** |
| "Full equipo único" (sin trims base) | Sí — una sola versión equipada por tracción | Maestro (versiones, FAQ, compare notes) | Diego: **"versión GT"** asientos ventilados; portón eléctrico "versión que lo trae" | **Baja** | **Confirmar: ¿existe GT u otras variantes en Bolivia?** | Viaggio/GAC Bolivia | **P0** |
| Equipamiento serie Full Equipo | Cuero, techo panorámico, pantalla, CarPlay, 360°, ADAS | Maestro FAQ precio | Sofía añade **Android Auto inalámbrico**; Diego añade **ISOFIX** (no negado, no confirmado en maestro) | Media | Checklist equipamiento unidad vs maestro | Lista equipamiento importador | **P0** |
| Colores disponibles | "Consultar disponibilidad" | Maestro § versiones | No documentado | Baja | Paleta oficial Bolivia | Viaggio inventario | P2 |
| Model year | **2025** | `vehicle.json`; registry | Maestro no especifica MY | Alta | Confirmar MY unidades en stock | Viaggio inventario | P1 |

---

## Claims adicionales transversales (no en lista principal pero afectan confianza)

| Attribute | Current value | Source document(s) | Conflicting values | Confidence | Verification required | Recommended source of truth | Priority |
|-----------|---------------|-------------------|---------------------|------------|----------------------|------------------------------|----------|
| Tagline oficial | **"Maneja el Cambio"** | Maestro hero | `vehicle.json`: "El SUV que tu familia merece..." | Media | Unificar campaña y producto | Marketing GAC Bolivia | P1 |
| Conectividad Apple CarPlay | De serie | Maestro | — | Alta | Confirmar wired vs wireless | Unidad de piso | P1 |
| Conectividad Android Auto | **Inalámbrico de serie** | Sofía § tecnología | Maestro: **solo Apple CarPlay** | **Baja** | Confirmar o eliminar de Sofía | Unidad de piso | **P0** |
| ISOFIX trasero | Sí | Diego § children | No en maestro ni JSON | Media | Confirmar puntos ISOFIX | Unidad / manual | P1 |
| Asientos ventilados | Versión GT (Diego) | Diego § confort | Maestro full equipo no los lista | **Baja** | Confirmar equipamiento real | Viaggio | **P0** |
| Red Viaggio | SCZ (4 puntos), La Paz, El Alto, Cochabamba | Maestro § mantenimiento | JSON topics: **solo Santa Cruz** · `dealership.json`: **placeholder** | **Baja** | Direcciones, WhatsApp, teléfonos reales | viaggio.com.bo / gac.com.bo | **P0** |
| Generación producto | Tercera generación GS4 | Maestro | `brand-heritage.json`: genérico | Alta | Ninguna | Maestro | P2 |
| Narrativa propiedad 1 año (Diego) | First-person ownership | Diego § ownership-experience | Sin propietario verificado | **Baja** | Testimonial real o marcar "escenario ilustrativo" | Viaggio clientes | **P0** |

---

## Priorización de verificación

### P0 — Debe verificarse antes del lanzamiento MVP

Bloquean credibilidad del showroom y exposición legal/comercial.

| ID | Atributo / acción | Owner sugerido | Entregable |
|----|-------------------|----------------|------------|
| P0-01 | **Pantalla central: 10,1" vs 12,3"** — medir unidad Bolivia | Viaggio producto | Valor único + actualización maestro, JSON, Sofía, compare |
| P0-02 | **Airbags: confirmar 8** — corregir compare (6 → valor real) | GAC Bolivia + QA | Lista posiciones + compare row corregido |
| P0-03 | **Transmisión comercializada** — eliminar 6AT si no aplica | Viaggio inventario | Metadata + guion Carlos unificado |
| P0-04 | **Trims Bolivia** — confirmar solo Full Equipo 4x2 + AWD; resolver "GT" Diego | Viaggio/GAC | Checklist equipamiento firmado |
| P0-05 | **Alcance garantía** — general vs powertrain; PDF vigente | Legal Viaggio | Tabla componentes unificada en copy |
| P0-06 | **Mantenimiento sin costo** — ítems incluidos/excluidos | Viaggio postventa | FAQ + warranty-terms + maintenance JSON |
| P0-07 | **Precio USD + BOB** en `vehicle.json` | Viaggio comercial | priceFrom + disclaimer TC |
| P0-08 | **Potencia/torque por versión** en JSON topics | GAC Bolivia | engine.json + hero stats |
| P0-09 | **Android Auto** — confirmar o eliminar de Sofía | Unidad de piso | Guion corregido |
| P0-10 | **C-NCAP** — fecha, versión, link certificado | GAC marketing | Badge con metadata verificable |
| P0-11 | **ACC "de serie"** vs Diego "versiones equipadas" | Unidad de piso | Copy unificado |
| P0-12 | **Intervalo servicio 10.000 km** + servicios incluidos sin costo | Viaggio taller | Tabla mantenimiento |
| P0-13 | **Financiamiento** — bandas cuota, bancos, disclaimer | Viaggio finance | S26 content (aunque MVP use maestro) |
| P0-14 | **dealership.json** — WhatsApp, dirección real | Viaggio ops | JSON actualizado |
| P0-15 | **Consumo** — etiquetar WLTC vs km/l real; no mezclar sin contexto | QA content | key stats + Diego disclaimer |
| P0-16 | **Altitud La Paz/El Alto** — respuesta técnica honesta | Viaggio LP + Carlos | FAQ topic |
| P0-17 | **Diego ownership 1 año** — testimonial real o disclaimer ficticio | Marketing Viaggio | Guion etiquetado |
| P0-18 | **Portón eléctrico / asientos ventilados** — incluidos o no | Viaggio producto | Eliminar o confirmar en maestro |
| P0-19 | **Compare Corolla Cross** — no publicar hasta airbags + pantalla corregidos | QA | Gate de deploy |
| P0-20 | **structure.json** — publicar 8 airbags + C-NCAP o no publicar topic | QA content | Topic expandido |

---

### P1 — Debe verificarse antes de producción (post-MVP, pre-escala)

Completa arco de decisión y reduce objeciones en ventas asistidas.

| ID | Atributo / acción | Owner sugerido |
|----|-------------------|----------------|
| P1-01 | Dimensiones, maletero 638/1.586 L en `specs.json` | GAC Bolivia |
| P1-02 | Lista ADAS completa (BSD, TJA, HMA, etc.) | GAC Bolivia |
| P1-03 | ADiGO Pilot, 4 modos conducción — nombres UI | Unidad de piso |
| P1-04 | Cuatro modos conducción documentados | Producto |
| P1-05 | ISOFIX confirmado + topic family-safety | Producto |
| P1-06 | Apple CarPlay wired vs wireless | Unidad de piso |
| P1-07 | Red 4 ciudades en JSON (no solo maestro) | Viaggio ops |
| P1-08 | Narrativa cambio precio $34.900 → $42.900 | Comercial |
| P1-09 | Compare Tucson + Tiggo/Haval (datos verificados) | Ventas + QA |
| P1-10 | TCO / reventa — claims conservadores | Finance + Carlos |
| P1-11 | Seguro vehicular — rango orientativo o derivación | Viaggio |
| P1-12 | Tiempo entrega repuestos (FAQ objeción) | Postventa |
| P1-13 | TGDI / Julang / 350 bar en engine topic | GAC |
| P1-14 | Cadena distribución confirmada | Taller Viaggio |
| P1-15 | Model year 2025 confirmado en stock | Inventario |
| P1-16 | PDF garantía linkable desde showroom | Legal |
| P1-17 | Despeje, peso, remolque en specs | Ficha importador |
| P1-18 | Integrar guiones Carlos completos en JSON | Content team |
| P1-19 | Unificar tagline "Maneja el Cambio" | Marketing |

---

### P2 — Puede verificarse después del lanzamiento

Mejora polish; no bloquea demo kiosk con disclaimers adecuados.

| ID | Atributo / acción | Owner sugerido |
|----|-------------------|----------------|
| P2-01 | Colores disponibles / configurador | Inventario |
| P2-02 | Consumo ruta km/l orientativo | Test interno |
| P2-03 | Gasolina 87 vs 92 en provincia | Postventa |
| P2-04 | Historial recalls / transparencia | GAC Bolivia |
| P2-05 | Cluster digital tamaño | Ficha |
| P2-06 | Velocidad máxima / 0-100 en specs UI | Ficha global |
| P2-07 | Unidades vendidas Bolivia (social proof) | Viaggio comercial |
| P2-08 | Años GAC en Bolivia (cifra) | Marketing |
| P2-09 | Historial mantenimiento digital | CRM |
| P2-10 | Latin NCAP u otros ratings | GAC export |

---

## Mapa de fuentes revisadas

| Documento | Ruta | Rol en matriz |
|-----------|------|---------------|
| Contenido maestro | `docs/content/gs4-max-master-content.md` | Fuente primaria recomendada (post-validación unidad) |
| Vehículo hub | `content/vehicles/gs4-max/vehicle.json` | Metadata showroom — **alta densidad de conflictos** |
| Topics (×11) | `content/vehicles/gs4-max/topics/*.json` | Claims parciales; mayoría stubs |
| Tours (×3) | `content/vehicles/gs4-max/tours/*.json` | Estructura; no añade specs |
| Themes (×5) | `content/vehicles/gs4-max/themes/*.json` | Navegación; scope geográfico SCZ |
| Compare template | `docs/content/templates/compare.gs4-max.corolla-cross.json` | **No publicar** — airbags incorrectos |
| Carlos | `docs/content/carlos-narration.md` | Técnico; conflictos transmisión/garantía |
| Sofía | `docs/content/sofia-narration.md` | Pantalla 12,3"; Android Auto |
| Diego | `docs/content/diego-narration.md` | Consumo km/l; GT; ownership ficticio |
| FAQ | Maestro § FAQ + objeciones | **No existe JSON faq** — contenido solo en maestro |
| Gap analysis | `docs/content/gs4-max-content-gap-analysis.md` | Referencia cruzada conflictos |
| Dealership | `content/shared/dealership.json` | Placeholder — no usar en producción |

---

## Definición de "truth matrix cerrada"

La matriz se considera **cerrada para MVP** cuando:

- [ ] Cero filas con Confidence **Baja** en atributos P0
- [ ] Compare template corregido y aprobado por Viaggio ventas
- [ ] `vehicle.json` alineado al maestro en pantalla, precio, tracción, transmisión
- [ ] PDF garantía + programa mantenimiento sin costo referenciados
- [ ] Unidad de piso inspeccionada con checklist firmado (Producto + QA + Taller)
- [ ] Guiones Diego/Sofía/Carlos revisados contra checklist unificado
- [ ] FAQ desplegada con claims P0 verificados únicamente

---

## Recomendación operativa (Operations Manager)

**Orden de trabajo sugerido (semana 1):**

1. Inspección unidad de piso Viaggio → checklist P0-01 a P0-12 en una sola sesión (Producto + Mecánico + QA).
2. Legal entrega PDF garantía + desglose mantenimiento sin costo → actualizar maestro § garantía.
3. Finance entrega precio BOB + bandas cuota + bancos → actualizar vehicle.json.
4. QA bloquea deploy de compare y tech-overview hasta cierre pantalla/airbags.
5. Content team aplica valor único a todos los activos; ningún stub con cifras en producción.

**Regla de showroom:** Si un claim no está en esta matriz con Confidence **Alta** o **Media** alineada, **no se renderiza como stat callout** — solo como copy cualitativo con disclaimer.

---

*Documento de validación interna. No constituye oferta comercial. Tras verificación Viaggio/GAC, archivar versión firmada como `gs4-max-truth-matrix.approved.md` con fecha y responsables.*
