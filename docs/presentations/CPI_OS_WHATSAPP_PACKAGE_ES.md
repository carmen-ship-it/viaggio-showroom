# CPI-OS — Paquete Ejecutivo WhatsApp (Español)

**Objetivo:** Enviar esta noche a dueños, gerentes generales y directores comerciales.  
**Tono:** Inspirador · Innovador · Premium · Positivo  
**Enfoque:** *Lo que es posible.* — sin mencionar problemas, fallas ni ineficiencias.

---

## Mensaje WhatsApp (copiar y enviar)

```
Buenas tardes, [Nombre]. 👋

Le comparto algo que estuve viendo para concesionarias de alta consideración.

Se llama CPI-OS — Sistema Operativo de Inteligencia para Compras Consideradas.

Imaginá cada visita al showroom convirtiéndose en:
→ una experiencia premium para el cliente
→ contexto real para el vendedor
→ aprendizaje acumulado para la dirección

📄 Primero: abra el PDF adjunto (10 diapositivas, 3 minutos de lectura).

🖥 Después: explore el demo en vivo:
[PEGAR_URL_VERCEL_AQUÍ]

Para empezar: toque cualquier parte de la pantalla del vehículo.

Rutas sugeridas:
• Kiosco cliente → link principal (tocá para empezar)
• Panel vendedor → [URL]/staff
• Vista dirección → [URL]/executive

Son 5 minutos. Sin instalación. Sin registro.

Cuando lo vea, me encantaría saber qué le resonó.

Saludos,
[Tu nombre]
```

### Variante corta (si el ejecutivo prefiere brevedad)

```
[Nombre], le comparto CPI-OS: inteligencia para concesionarias de alta consideración.

📄 PDF adjunto — 10 slides, 3 min
🖥 Demo: [URL] — toque la pantalla para empezar

Cliente · Vendedor · Dirección — en un solo flujo.

¿Lo vemos esta semana?
```

---

## Resumen ejecutivo (para PDF página 1 o mensaje de seguimiento)

**CPI-OS** es el Sistema Operativo de Inteligencia para Compras Consideradas: la capa que conecta la experiencia del cliente en el showroom, la coordinación del equipo de ventas y el aprendizaje de la empresa.

No reemplaza su CRM. Lo complementa con contexto real: qué exploró el cliente, qué comparó, qué nivel de interés tiene y cuál es el siguiente paso recomendado.

Diseñado para vehículos donde la decisión lleva tiempo, involucra a la familia y exige confianza antes que presión — como el GAC GS4 MAX en Santa Cruz.

**En cinco minutos puede ver:** el kiosco táctil, la comparación honesta con competidores, el resumen inteligente de visita, el panel del vendedor con contexto, y el tablero de dirección con tendencias semanales.

---

## Colocación del PDF

| Elemento | Instrucción |
|----------|-------------|
| **Archivo** | Exportar desde [`CPI_OS_EXECUTIVE_DECK_ES.md`](./CPI_OS_EXECUTIVE_DECK_ES.md) → `CPI-OS-Executive-ES.pdf` |
| **Envío WhatsApp** | Adjuntar PDF en el mismo hilo del mensaje introductorio |
| **Orden** | 1) Mensaje de texto → 2) PDF adjunto → 3) Link demo en mensaje o mensaje separado inmediato |
| **Nombre visible** | `CPI-OS — Inteligencia para Concesionarias.pdf` |
| **Tamaño** | 10 diapositivas · 16:9 · &lt; 15 MB |

**Si el PDF no está listo esta noche:** Enviar link demo primero con mensaje corto; PDF en seguimiento dentro de 24h. No enviar link sin contexto.

---

## Colocación del link demo

| Elemento | Instrucción |
|----------|-------------|
| **URL base** | Vercel Preview con `NEXT_PUBLIC_DEMO_MODE=true` |
| **URL principal** | Raíz del deploy: `https://[proyecto].vercel.app/` |
| **Instrucción obligatoria** | *“Toque cualquier parte de la pantalla para comenzar”* |
| **Rutas adicionales** | Incluir `/staff` y `/executive` en el mensaje para ejecutivos que quieren ver operaciones |
| **No incluir en mensaje** | `/resume`, `/share`, rutas sin terminar |
| **Alias estable** | Si existe Preview Branch Alias, usarlo en lugar de URL con hash |

### Secuencia recomendada para el ejecutivo

1. Abrir PDF (3 min) — entender la visión
2. Abrir link principal → tocar pantalla → seguir botones inferiores
3. Opcional: abrir `/staff` en segunda pestaña para ver panel vendedor
4. Opcional: abrir `/executive` para vista de dirección

### Highlight tour (5 min, sin guía humana)

| Paso | Ruta | Qué ver |
|------|------|---------|
| 1 | `/` | Tocar pantalla → Empezar → GS4 MAX |
| 2 | TouchNav → hero | Vehículo inmersivo + hotspots |
| 3 | TouchNav → compare | Tabla honesta vs Corolla Cross |
| 4 | TouchNav → convert | Resumen + “Asesor ahora” |
| 5 | `/staff` | Brief de handoff |

---

## Checklist pre-envío (esta noche)

- [ ] `NEXT_PUBLIC_DEMO_MODE=true` en build Vercel
- [ ] URL copiada y probada en móvil (tap en S01 funciona)
- [ ] PDF exportado y adjunto probado en WhatsApp
- [ ] Nombre del destinatario personalizado en mensaje
- [ ] Rutas `/staff` y `/executive` verificadas
- [ ] Sin mencionar “datos en vivo” — la demo es experiencia ilustrativa

---

## Email alternativo (si WhatsApp no es canal principal)

**Asunto:** CPI-OS — Experiencia ejecutiva (PDF + demo en vivo)

Estimado/a [Nombre],

Adjunto la presentación ejecutiva de CPI-OS y un enlace para explorar la experiencia en vivo.

**PDF:** 10 diapositivas — experiencia del cliente, panel del vendedor y vista de dirección.

**Demo:** [VERCEL_URL] — toque la pantalla inicial para comenzar. Exploración sugerida: 5 minutos.

Rutas complementarias:
- Panel vendedor: [URL]/staff
- Vista dirección: [URL]/executive

Quedo atento/a para una conversación breve.

Saludos,  
[Firma]

---

## Párrafo de introducción (one-pager, sitio web, o portada PDF)

CPI-OS es el sistema operativo de inteligencia para concesionarias que venden productos de alta consideración: unifica la experiencia premium del cliente en kiosco, la coordinación del equipo de ventas con contexto real, y el aprendizaje institucional de la empresa — para que cada visita genere más confianza, más pruebas de manejo calificadas, y más conocimiento acumulado mes a mes.

---

*Paquete listo para envío. Reemplazar `[PEGAR_URL_VERCEL_AQUÍ]` y `[Nombre]` antes de enviar.*
