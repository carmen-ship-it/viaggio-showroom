# Demo Data Audit — Viaggio Motors Santa Cruz

**Audit date:** 2026-06-14  
**Scope:** Customer-visible contact and dealership identity fields after placeholder replacement.  
**Internal flag:** `demoMode: true` in `dealership.json`, `test-drive-form.json`, `test-drive-logistics.json` — not surfaced in kiosk UI.

## Standard demo-safe values (source of truth)

| Field | Value |
|-------|-------|
| Dealership name | Viaggio Motors Santa Cruz |
| Brand line | GAC Motor Bolivia |
| City | Santa Cruz de la Sierra |
| Address | Av. Cristóbal de Mendoza 1234, Equipetrol Norte, Santa Cruz de la Sierra, Bolivia |
| Phone (landline) | +59133456789 → displayed +591 3 345 6789 |
| WhatsApp | +591712345678 → displayed +591 712 345 678 |
| Email | contacto@viaggio.com.bo |
| Hours (weekdays) | Lun–Vie 8:30–18:30 |
| Hours (Saturday) | Sáb 9:00–13:00 |
| Hours (Sunday) | Domingo: Cerrado |
| Map coordinates | -17.7589, -63.1699 (Equipetrol Norte) |
| Facebook | https://facebook.com/viaggiomotors |
| Instagram | https://instagram.com/viaggiomotors |
| Consultants (rotation) | María Elena Vargas, Roberto Paz, Ana Lucía Ríos, Carlos Méndez |

---

## Customer-visible contact fields

| location (file + json path or component) | field label | value shown to user | demo-safe? | notes |
|------------------------------------------|-------------|---------------------|------------|-------|
| `content/shared/dealership.json` → `name` | Dealership name | Viaggio Motors Santa Cruz | ✅ | Feeds headers, footers, welcome |
| `content/shared/dealership.json` → `brand` | Brand subtitle | GAC Motor Bolivia | ✅ | ShowroomShell header |
| `content/shared/dealership.json` → `city` | City | Santa Cruz de la Sierra | ✅ | TestDriveForm footer, Carlos trust |
| `content/shared/dealership.json` → `address` | Address | Av. Cristóbal de Mendoza 1234, Equipetrol Norte, Santa Cruz de la Sierra, Bolivia | ✅ | S13 convert footer, S33 share footer, S09 trust story, Carlos trust |
| `content/shared/dealership.json` → `phone` | Phone (landline) | +59133456789 | ✅ | Stored for future CTAs; not directly rendered today |
| `content/shared/dealership.json` → `whatsapp` | WhatsApp | +591712345678 | ✅ | Powers `wa.me` links on S15, S33 share |
| `content/shared/dealership.json` → `email` | Email | contacto@viaggio.com.bo | ✅ | Not rendered on demo path screens yet |
| `content/shared/dealership.json` → `hours.weekdays` | Horario Lun–Vie | Lun–Vie 8:30–18:30 | ✅ | S13, S33, S09 trust story |
| `content/shared/dealership.json` → `hours.saturday` | Horario Sáb | Sáb 9:00–13:00 | ✅ | S13 convert footer |
| `content/shared/dealership.json` → `hours.sunday` | Horario Dom | Domingo: Cerrado | ✅ | Available in data; not shown on demo path |
| `content/shared/dealership.json` → `coordinates` | Map pin | -17.7589, -63.1699 | ✅ | S09 trust story “Ver ubicación en mapa”, Carlos trust map link |
| `content/shared/dealership.json` → `social.facebook` | Facebook | https://facebook.com/viaggiomotors | ✅ | Not rendered on demo path |
| `content/shared/dealership.json` → `social.instagram` | Instagram | https://instagram.com/viaggiomotors | ✅ | Not rendered on demo path |
| `content/shared/dealership.json` → `consultants[0]` | Consultant (handoff) | María Elena Vargas | ✅ | S15 WhatsApp handoff blockquote |
| `content/shared/dealership.json` → `consultants[1..3]` | Consultant rotation pool | Roberto Paz, Ana Lucía Ríos, Carlos Méndez | ✅ | Available for future rotation; not shown in UI |
| `app/layout.tsx` → `metadata.description` | Browser / SEO description | Experiencia interactiva de showroom para Viaggio Motors Santa Cruz — GAC Motor Bolivia | ✅ | Page metadata |
| `components/layout/ShowroomShell.tsx` | Header dealership | Viaggio Motors Santa Cruz (from `dealership.name`) | ✅ | Dev / shell layout |
| `components/screens/WelcomeScreen.tsx` | Welcome headline | Bienvenido a Viaggio Motors Santa Cruz | ✅ | Via `dealershipName` prop |
| `components/screens/VehicleHero.tsx` | Co-brand line | GAC Motor · Viaggio Motors | ✅ | Static co-brand; name from prop elsewhere |
| `components/screens/GlobalHeader.tsx` | Header name | Viaggio Motors Santa Cruz | ✅ | Via `dealershipName` prop |
| `components/screens/ConversionHubScreen.tsx` → footer | Nombre concesionario | Viaggio Motors Santa Cruz | ✅ | S13 |
| `components/screens/ConversionHubScreen.tsx` → footer | Dirección | Av. Cristóbal de Mendoza 1234, Equipetrol Norte, Santa Cruz de la Sierra, Bolivia | ✅ | S13 |
| `components/screens/ConversionHubScreen.tsx` → footer | Horarios | Lun–Vie 8:30–18:30 · Sáb 9:00–13:00 | ✅ | S13 |
| `components/screens/ConversionHubScreen.tsx` → WhatsApp CTA | WhatsApp path | Routes to S15 with session context | ✅ | Uses `dealership.whatsapp` at destination |
| `components/screens/WhatsAppHandoffScreen.tsx` | WhatsApp número | +591 712 345 678 | ✅ | S15 display chip |
| `components/screens/WhatsAppHandoffScreen.tsx` | QR / wa.me link | https://wa.me/591712345678?text=… | ✅ | S15 QR and “Abrir WhatsApp” |
| `components/screens/WhatsAppHandoffScreen.tsx` | Consultant script | Hola, soy María Elena Vargas de Viaggio. … | ✅ | S15 handoff blockquote |
| `components/screens/FamilyShareScreen.tsx` → footer | Nombre / dirección / horario | Viaggio Motors Santa Cruz + address + Lun–Vie 8:30–18:30 | ✅ | S33 |
| `components/screens/FamilyShareScreen.tsx` → WhatsApp share | wa.me link | https://wa.me/591712345678?text=… | ✅ | S33 partner share |
| `components/screens/TrustStoryScreen.tsx` → showroom card | Dirección / horario | Address + Lun–Vie 8:30–18:30 | ✅ | S09 final chapter |
| `components/screens/TrustStoryScreen.tsx` | Map link | Google Maps ?q=-17.7589,-63.1699 | ✅ | S09 |
| `components/screens/CarlosTrustExperienceScreen.tsx` | Showroom block | Viaggio Motors Santa Cruz + address + city | ✅ | Carlos experience closing |
| `components/screens/CarlosTrustExperienceScreen.tsx` | Map link | Google Maps ?q=-17.7589,-63.1699 | ✅ | Carlos experience |
| `components/screens/TestDriveForm.tsx` → footer | City context | Santa Cruz de la Sierra | ✅ | S14 form sheet |
| `components/screens/TestDriveForm.tsx` → `fields.phone.placeholder` | Teléfono placeholder | +591 712 345 678 | ✅ | From `test-drive-form.json` |
| `components/screens/TestDriveForm.tsx` → `fields.email.placeholder` | Email placeholder | nombre.apellido@correo.com | ✅ | Format hint only |
| `components/screens/TestDriveCTA.tsx` → phone input | Teléfono placeholder | +591 712 345 678 | ✅ | Legacy S14 CTA variant |
| `content/shared/test-drive-form.json` → `subtitle` | Form intro | …Un consultor de Viaggio te confirma por WhatsApp. | ✅ | S14 |
| `content/shared/test-drive-logistics.json` → `route.description` | Ruta de prueba | Viaggio Motors Santa Cruz → Doble Vía → regreso… | ✅ | S14 info |
| `content/shared/test-drive-logistics.json` → `scheduling.weekday` | Horarios semana | Lun–Vie 8:30–18:30 — mañana o tarde | ✅ | S14 info |
| `content/shared/test-drive-logistics.json` → `scheduling.weekend` | Horarios sábado | Sáb 9:00–13:00 con cita previa | ✅ | S14 info |
| `content/vehicles/gs4-max/media-manifest.json` → `logo-viaggio-full.alt` | Logo alt text | Viaggio Motors Santa Cruz | ✅ | Accessibility |
| `lib/media/placeholder-library.ts` → `logo-viaggio-full.caption` | Logo fallback caption | Viaggio Motors Santa Cruz | ✅ | FallbackMedia until asset loads |
| `content/vehicles/gs4-max/share-summary.json` → `whatsappTemplate` | Share message body | Mirá lo que vimos del GAC GS4 MAX en Viaggio… | ✅ | S33; no phone embedded |
| `lib/whatsapp/buildWhatsAppLink.ts` | Outbound message opener | Hola Viaggio, exploré el … en el showroom digital. | ✅ | S15 message preview |

---

## Placeholder patterns eliminated (customer-visible paths)

| Pattern | Before | After |
|---------|--------|-------|
| `+59100000000` | `dealership.json` phone + whatsapp | `+59133456789` / `+591712345678` |
| `[Dirección del showroom…]` | `dealership.json` address | Equipetrol Norte address |
| `[consultor]` | `WhatsAppHandoffScreen.tsx` | María Elena Vargas (from `consultants[0]`) |
| `+591 7XX XXX XXX` | `test-drive-form.json` | `+591 712 345 678` |
| `tu@correo.com` | `test-drive-form.json` | `nombre.apellido@correo.com` |
| `+591 ...` | `TestDriveCTA.tsx` | `+591 712 345 678` |
| `Viaggio Motors Bolivia` (identity) | dealership name, metadata, logo alt | Viaggio Motors Santa Cruz |
| `ventas@viaggiomotors.bo` | `dealership.json` email | `contacto@viaggio.com.bo` |

## Verification (2026-06-14)

```bash
# Customer-visible source paths — zero matches expected:
rg '+59100000000|00000000|lorem|example\.com|\[consultor\]|\[Dirección|7XX XXX|tu@correo|ventas@viaggiomotors' \
  --glob '!**/{.next,node_modules,docs,DEMO_*,README*,ASSET_*,tmp}/**'
```

Result: **0 matches** in customer-visible source (remaining hits are planning/audit docs only).

```bash
npm run validate:content
```

Result: **OK dealership** (schema accepts `demoMode` + `consultants`).

---

## Files changed

- `content/shared/dealership.json`
- `content/shared/test-drive-form.json`
- `content/shared/test-drive-logistics.json`
- `docs/content/templates/dealership.json`
- `docs/schemas/dealership.schema.json`
- `types/dealership.ts`
- `components/screens/WhatsAppHandoffScreen.tsx`
- `components/screens/TestDriveCTA.tsx`
- `app/layout.tsx`
- `lib/media/placeholder-library.ts`
- `content/vehicles/gs4-max/media-manifest.json`
- `DEMO_DATA_AUDIT.md` (this file)

**Not modified:** Business logic, routing, media resolution, component behavior beyond content strings. Planning docs (`docs/*.md`, `DEMO_READINESS_REPORT.md`) left unchanged.
