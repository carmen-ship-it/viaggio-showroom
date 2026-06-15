# CPI-OS — Paquete Ejecutivo Final (WhatsApp)

**Fecha:** 15 de junio de 2026  
**Destinatario:** Dueño / gerente general / director comercial — **solo, sin presentador**  
**Canal:** WhatsApp (mensaje + PDF + link demo)  
**Tono:** Inspirador · Premium · Positivo · *Lo que es posible.*

---

## Mensaje WhatsApp final (copiar y enviar)

```
Buenas tardes, [Nombre]. 👋

Le comparto CPI-OS — Sistema Operativo de Inteligencia para Compras Consideradas.

Imaginá cada visita al showroom convirtiéndose en:
→ experiencia premium para el cliente
→ contexto real para el vendedor
→ aprendizaje acumulado para la dirección

📄 Primero: abra el PDF adjunto (10 diapositivas, 3 minutos).

🖥 Después: explore el demo en vivo:
[PEGAR_URL_DEMO_AQUI]

Para empezar: toque la pantalla del vehículo donde dice “Tocá para empezar”.

Recorrido sugerido (5 minutos, sin registro):
1) Link principal → toque pantalla → Empezar → GS4 MAX
2) Siga los botones inferiores (TouchNav) hasta la comparación
3) Panel vendedor → [URL]/staff
4) Vista dirección → [URL]/executive

Son 5 minutos. Sin instalación.

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

## URL demo (placeholder)

| Campo | Valor |
|-------|-------|
| **URL principal (kiosco)** | `[PEGAR_URL_DEMO_AQUI]` |
| **Panel vendedor** | `[PEGAR_URL_DEMO_AQUI]/staff` |
| **Vista dirección** | `[PEGAR_URL_DEMO_AQUI]/executive` |
| **Build requerido** | Vercel con `NEXT_PUBLIC_DEMO_MODE=true` |
| **Nombre PDF adjunto** | `CPI-OS — Inteligencia para Concesionarias.pdf` |

**Antes de enviar:** Probar la URL en móvil. Confirmar que el tap en S01 avanza a la bienvenida.

---

## Orden de visualización recomendado

El destinatario está solo. El paquete debe guiarlo sin voz humana.

| Paso | Qué hacer | Duración |
|------|-----------|----------|
| **1** | Leer el mensaje WhatsApp | 30 s |
| **2** | Abrir y leer el PDF (10 slides) | 3 min |
| **3** | Abrir el link demo en el navegador | — |
| **4** | Seguir el recorrido guiado abajo | 5 min |
| **5** | *(Opcional)* Abrir `/staff` y `/executive` en pestañas nuevas | 2 min |

**Orden del PDF (deck):** Portada → Oportunidad → Cliente → Confianza → Comparación → Financiamiento → Sistema recuerda → Vendedor → Dirección → Explorá ahora.

**Orden del demo en vivo (highlight tour — sin presentador):**

| # | Pantalla | Ruta | Acción del destinatario |
|---|----------|------|-------------------------|
| 1 | S01 Attract | `/` | **Tocar la pantalla** (“Tocá para empezar”) |
| 2 | S02 Welcome | `/` | Tocar **Empezar** |
| 3 | S03 Selector | `/vehicles` | Tocar tarjeta **GS4 MAX** |
| 4 | S22 Hero | `/vehicles/gs4-max/hero` | Observar vehículo + franja de datos; usar TouchNav inferior |
| 5 | S25 FAQ | TouchNav → confianza | Abrir **una** pregunta (ej. marca china) |
| 6 | S12 Compare | TouchNav → comparar | Leer filas “Nosotros ganamos / Ellos ganan” |
| 7 | S26 Financing | TouchNav → financiamiento | Ver cuota orientativa (no hacer scroll) |
| 8 | S13 Convert | TouchNav → convertir | Leer resumen de visita |
| 9 | S36 Handoff | En S13 → **Hablar con un asesor ahora** | Ver modal “Tu asesor está en camino” |
| 10 | S35 Staff | `[URL]/staff` (nueva pestaña) | Leer brief de handoff y apertura sugerida |
| 11 | Executive | `[URL]/executive` *(opcional)* | Ver KPIs y tendencias semanales |

**Pantallas a omitir en recorrido solo:** S04 (hub interno), S24 (scroll largo), S37 (próximamente), rutas no listadas arriba.

---

## Pantallas clave (las que venden la historia)

| Pantalla | Por qué importa sin narrador |
|----------|------------------------------|
| **S01 Attract** | Primera impresión premium — “sin presión” |
| **S22 Hero** | Producto protagonista — sensación Tesla/Apple |
| **S12 Compare** | Diferenciador: comparación honesta con Corolla Cross |
| **S13 Convert** | “El sistema recuerda” — resumen de la visita |
| **S36 Modal** | Puente humano — asesor con contexto |
| **S35 Staff** | Vendedor preparado antes de hablar |
| **S-executive** | Visión de dirección — inteligencia semanal |

---

## Qué debe tocar primero

**En el demo en vivo:** la pantalla completa de S01 (Attract Loop).

- Buscar el botón o área **“Tocá para empezar”** sobre la imagen del GS4 MAX.
- **No** usar la barra de URL ni el menú del navegador para navegar.
- **No** abrir `/staff` o `/executive` antes de pasar por S12 y S13 — pierde el arco narrativo.

**En el PDF:** diapositiva 1 (portada), luego avanzar en orden.

**En WhatsApp:** el PDF adjunto **antes** del link demo (contexto antes de exploración libre).

---

## Orden de envío en WhatsApp

1. Mensaje de texto (personalizado con nombre)
2. PDF adjunto
3. Link demo (mismo hilo o mensaje inmediato siguiente)

---

## Qué NO decir en el mensaje

- “Datos en vivo” / “ya está corriendo en el piso”
- “Integración CRM activa”
- Links a `/resume`, `/share`, o rutas incompletas
- Promesas de handoff entre dispositivos distintos (kiosco → celular)

**Framing correcto:** *“Demo ilustrativa de lo que es posible”* — experiencia premium + visión operativa.

---

## Archivos de soporte en repo

| Archivo | Uso |
|---------|-----|
| [`docs/presentations/CPI_OS_EXECUTIVE_DECK_ES.md`](docs/presentations/CPI_OS_EXECUTIVE_DECK_ES.md) | Texto literal de las 10 slides |
| [`docs/screenshots/executive-demo-polish/after/`](docs/screenshots/executive-demo-polish/after/) | PNGs para maquetar PDF |
| [`docs/screenshots/s36-handoff/`](docs/screenshots/s36-handoff/) | Modal e inset de handoff |
| [`FINAL_SCREENSHOT_CHECKLIST.md`](FINAL_SCREENSHOT_CHECKLIST.md) | Capturas requeridas y convención de nombres |
| [`FINAL_GO_NO_GO.md`](FINAL_GO_NO_GO.md) | Veredicto de envío esta noche |

---

*Reemplazar `[PEGAR_URL_DEMO_AQUI]`, `[Nombre]` y `[Tu nombre]` antes de enviar.*
