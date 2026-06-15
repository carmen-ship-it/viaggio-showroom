# CPI-OS — Checklist Final de Screenshots (Deck Ejecutivo)

**Fecha:** 15 de junio de 2026  
**Propósito:** Lista exacta de capturas para el PDF de 10 diapositivas enviado por WhatsApp  
**Fuente deck:** [`docs/presentations/CPI_OS_EXECUTIVE_DECK_ES.md`](docs/presentations/CPI_OS_EXECUTIVE_DECK_ES.md)  
**Carpeta destino (kiosco/ops):** `docs/screenshots/executive-demo-polish/after/`  
**Carpeta destino (handoff):** `docs/screenshots/s36-handoff/`

---

## Especificación global de captura

| Parámetro | Valor |
|-----------|-------|
| **Navegador** | Chromium (Playwright) o Chrome headless |
| **Viewport kiosco** | **1920 × 1080** px |
| **Viewport tablet staff** | **1024 × 768** px *(solo alerta staff en set S36)* |
| **Device scale** | 1× |
| **Locale** | `es-BO` |
| **Modo demo** | `NEXT_PUBLIC_DEMO_MODE=true` *(obligatorio)* |
| **Tipo de captura** | Viewport only (`fullPage: false`) |
| **Chrome visible** | Sin barra de devtools · sin cursor · sin IDs de pantalla |
| **Audio gate** | Descartar modal “Toque para comenzar la experiencia con sonido” antes de capturar |

### Convención de nombres — set principal (kiosco + ops)

```
{ScreenID}-{slug-descriptivo}-1920x1080.png
```

**Ejemplos:** `S22-hero-1920x1080.png` · `S-executive-executive-1920x1080.png`

### Convención de nombres — set handoff (S36)

```
s36-{descripcion}.png
```

**Ejemplos:** `s36-customer-modal.png` · `s36-staff-alert.png`

### Script de captura automatizada

```bash
NEXT_PUBLIC_DEMO_MODE=true node scripts/capture-executive-demo-polish.mjs [baseUrl]
node scripts/capture-s36-handoff-screenshots.mjs [baseUrl]
```

---

## Inventario por diapositiva del deck (10 slides)

### Slides sin captura (diseño gráfico)

| Slide | Título | Captura | Acción |
|-------|--------|---------|--------|
| **1** | CPI-OS — Portada | Ninguna | Fondo oscuro + tipografía premium |
| **2** | La oportunidad | Ninguna | 4 íconos: Cliente · Vendedor · Gerente · Empresa |

---

### Slides con captura obligatoria

| Slide | Título | Archivo requerido | Ruta exacta | Viewport | Estado en disco |
|-------|--------|-------------------|-------------|----------|-----------------|
| **3** | Showroom premium | `S22-hero-1920x1080.png` | `/vehicles/gs4-max/hero` | 1920×1080 | ✅ Existe |
| **3** *(alt.)* | Apertura alternativa | `S01-attract-1920x1080.png` | `/` *(estado attract, sin tap)* | 1920×1080 | ✅ Existe |
| **4** | Confianza primero | `S25-faq-1920x1080.png` | `/vehicles/gs4-max/trust/faq` | 1920×1080 | ✅ Existe |
| **5** | Comparación honesta | `S12-compare-detail-1920x1080.png` | `/vehicles/gs4-max/compare/corolla-cross` | 1920×1080 | ✅ Existe |
| **6** | Decisión económica | `S26-financing-1920x1080.png` | `/vehicles/gs4-max/economics/financing` | 1920×1080 | ✅ Existe |
| **7** | El sistema recuerda | `S13-convert-1920x1080.png` | `/vehicles/gs4-max/convert` | 1920×1080 | ✅ Existe |
| **7** *(inset)* | Modal asesor | `s36-customer-modal.png` | `/vehicles/gs4-max/convert` → clic **Hablar con un asesor ahora** | 1920×1080 | ✅ Existe |
| **8** | Vendedor preparado | `S35-staff-1920x1080.png` | `/staff` | 1920×1080 | ✅ Existe |
| **9** | Visión de dirección | `S-executive-executive-1920x1080.png` | `/executive` | 1920×1080 | ✅ Existe |
| **9** *(inset opc.)* | Vista gerente | `S-manager-manager-1920x1080.png` | `/manager` | 1920×1080 | ✅ Existe |
| **10** | Explorá ahora | `S01-attract-1920x1080.png` + QR del link demo superpuesto en maquetación | `/` | 1920×1080 | ✅ Existe (+ QR en layout) |

**Total obligatorio para PDF:** 8 PNGs únicos del set polish + 1 inset handoff (+ QR generado en Keynote/PPT).

---

## Capturas complementarias (no en deck principal — backup y B-roll)

| Screen ID | Archivo | Ruta exacta | Viewport | Uso | Estado |
|-----------|---------|-------------|----------|-----|--------|
| S02 | `S02-welcome-1920x1080.png` | `/` *(fase welcome post-tap S01)* | 1920×1080 | Backup slide visitante | ✅ |
| S03 | `S03-selector-1920x1080.png` | `/vehicles` | 1920×1080 | Backup multi-vehículo | ✅ |
| S06 | `S06-tour-1920x1080.png` | `/vehicles/gs4-max/tour/trust` | 1920×1080 | Backup educación Carlos | ✅ |
| S08 | `S08-adas-1920x1080.png` | `/vehicles/gs4-max/themes/safety/adas` | 1920×1080 | Backup seguridad | ✅ |
| S11 | `S11-compare-hub-1920x1080.png` | `/vehicles/gs4-max/compare` | 1920×1080 | Backup previo a S12 | ✅ |
| S14 | `S14-test-drive-1920x1080.png` | `/vehicles/gs4-max/test-drive` | 1920×1080 | Backup conversión | ✅ |
| S15 | `S15-whatsapp-1920x1080.png` | `/vehicles/gs4-max/whatsapp` | 1920×1080 | Backup canal Bolivia | ✅ |
| S24 | `S24-trust-story-1920x1080.png` | `/vehicles/gs4-max/trust/story` | 1920×1080 | **No usar en deck** — scroll 2651px | ✅ *(omitir)* |

---

## Set handoff S36 (4 archivos)

| Archivo | Ruta | Viewport | Preparación | Slide |
|---------|------|----------|-------------|-------|
| `s36-conversion-cta.png` | `/vehicles/gs4-max/convert` | 1920×1080 | Estado antes del modal | Backup slide 7 |
| `s36-customer-modal.png` | `/vehicles/gs4-max/convert` → **Hablar con un asesor ahora** | 1920×1080 | Modal visible | **Slide 7 inset** |
| `s36-staff-alert.png` | `/staff` | **1024×768** | Seed handoff en localStorage antes de reload | Backup slide 8 |
| `s36-manager-handoff.png` | `/manager` | 1920×1080 | Seed handoff | Backup slide 9 |

---

## Checklist de verificación pre-envío

### Obligatorio (bloquea PDF)

- [ ] `S22-hero-1920x1080.png` — sin wireframe SVG sobre el vehículo
- [ ] `S25-faq-1920x1080.png` — al menos una pregunta expandida *(opcional en captura)*
- [ ] `S12-compare-detail-1920x1080.png` — badges “Nosotros ganamos / Ellos ganan” visibles sin scroll
- [ ] `S26-financing-1920x1080.png` — cuota orientativa visible sin scroll
- [ ] `S13-convert-1920x1080.png` — chips de resumen + CTA asesor visibles
- [ ] `s36-customer-modal.png` — timer/modal legible
- [ ] `S35-staff-1920x1080.png` — tarjeta de handoff visible
- [ ] `S-executive-executive-1920x1080.png` — KPI strip + gráficos sin recorte
- [ ] `S01-attract-1920x1080.png` — tagline + precio “Desde $us 42.900” legibles
- [ ] Ningún PNG muestra etiquetas `S##` de desarrollo
- [ ] PDF exportado 16:9 · nombre `CPI-OS-Executive-ES.pdf` · &lt; 15 MB

### Recomendado (calidad)

- [ ] Regenerar capturas contra URL Vercel final (no solo localhost)
- [ ] `S36-modal-1920x1080.png` en carpeta polish *(consistencia visual — hoy usar `s36-customer-modal.png`)*
- [ ] Slide 10 incluye QR del link demo embebido
- [ ] Ops slides llevan pie de slide: *“Vista ilustrativa — simulación”*

---

## Capturas explícitamente excluidas del deck

| Pantalla | Motivo |
|----------|--------|
| S04 Vehicle hub | Lista de links — aspecto interno |
| S24 Trust story | Scroll largo — rompe sensación kiosk |
| S37 Resume | Muestra “Próximamente” |
| S21 Pre-visit QR | Ruta no implementada |
| S23 Testimonials | Ruta no implementada |

---

## Mapa rápido: ruta → archivo

| Ruta | Archivo |
|------|---------|
| `/` | `S01-attract-1920x1080.png` |
| `/` *(welcome)* | `S02-welcome-1920x1080.png` |
| `/vehicles` | `S03-selector-1920x1080.png` |
| `/vehicles/gs4-max/hero` | `S22-hero-1920x1080.png` |
| `/vehicles/gs4-max/trust/faq` | `S25-faq-1920x1080.png` |
| `/vehicles/gs4-max/trust/story` | `S24-trust-story-1920x1080.png` *(no deck)* |
| `/vehicles/gs4-max/tour/trust` | `S06-tour-1920x1080.png` |
| `/vehicles/gs4-max/themes/safety/adas` | `S08-adas-1920x1080.png` |
| `/vehicles/gs4-max/compare` | `S11-compare-hub-1920x1080.png` |
| `/vehicles/gs4-max/compare/corolla-cross` | `S12-compare-detail-1920x1080.png` |
| `/vehicles/gs4-max/economics/financing` | `S26-financing-1920x1080.png` |
| `/vehicles/gs4-max/convert` | `S13-convert-1920x1080.png` |
| `/vehicles/gs4-max/test-drive` | `S14-test-drive-1920x1080.png` |
| `/vehicles/gs4-max/whatsapp` | `S15-whatsapp-1920x1080.png` |
| `/staff` | `S35-staff-1920x1080.png` |
| `/manager` | `S-manager-manager-1920x1080.png` |
| `/executive` | `S-executive-executive-1920x1080.png` |

---

*21 PNGs on-disk cubren el deck completo. Acción restante: maquetar PDF e insertar QR en slide 10.*
