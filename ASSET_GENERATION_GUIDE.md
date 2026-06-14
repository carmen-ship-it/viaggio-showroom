# ASSET_GENERATION_GUIDE — Phase 3A (GS4 MAX Demo)

Guide for regenerating the six Phase 3A demo assets for the Viaggio Digital Showroom GS4 MAX kiosk. Use this document when Cursor `GenerateImage`, ChatGPT (DALL·E), Midjourney, or Flux is needed to refresh or extend demo media.

---

## Phase 3A overview

**Goal:** Replace gradient/SVG `FallbackMedia` placeholders with photorealistic demo-quality stills for the executive demo path (S01 → S15 subset).

**Scope (6 assets):**

| Manifest ID | Output file |
|-------------|-------------|
| `gs4-max-hero-01` | `public/assets/vehicles/gs4-max/exterior/hero-01.webp` |
| `gs4-max-hero-ambient` | `public/assets/vehicles/gs4-max/exterior/hero-ambient.webp` |
| `gs4-max-ext-front-34` | `public/assets/vehicles/gs4-max/exterior/front-34.webp` |
| `gs4-max-int-dashboard` | `public/assets/vehicles/gs4-max/interior/dashboard.webp` |
| `gs4-max-family-cover` | `public/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp` |
| `persona-carlos-avatar` | `public/assets/personas/carlos-avatar.webp` |

**Design anchors** (all exterior/lifestyle vehicle shots):

- Metallic silver (plateado) with cool highlights
- Large hexagonal mesh grille with horizontal chrome slats
- Multi-spoke dark alloy wheels (V-pattern spokes)
- Compact SUV proportions: floating roof, flush door handles, black lower cladding
- Slim horizontal LED headlights with L-shaped DRL

**Source PNGs** (Cursor `GenerateImage` output, not committed):

`~/.cursor/projects/Users-carmen-Desktop-viaggio-digital-showroom/assets/*-gen.png`

---

## Reference image locations and sources

Reference rasters live in `docs/assets/reference/gs4-max/` for generation workflows only. See also [docs/assets/reference/gs4-max/README.md](docs/assets/reference/gs4-max/README.md).

| File | Source | Use |
|------|--------|-----|
| `ref-755b2df1.png` | [GAC Motor GS4 MAX global overview](https://www.gac-motor.com/en/models/gacmotor/gs4max/overview.html) | Silver front 3/4 — hero, motor hot-spot, lifestyle |
| `ref-gs4max-white.webp` | GAC global product grid (CDN) | Side profile, proportions, wheels |
| `ref-front-grille.webp` | [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) | Grille detail, headlight DRL |
| `ref-poster.jpg` | gac.com.bo launch video poster | Ambient / cinematic lighting reference |
| `ref-93136d4a.webp` | GAC global site | Side profile alternate |
| Additional `ref-*.png` | GAC global overview page JSON | Supplementary angles and detail crops |

**Official channels for fresh references:**

- **GAC global:** [GS4 MAX hub](https://www.gac-motor.com/en/models/gacmotor/gs4max/overview.html) · [Wallpaper ZIP](https://www.gac-motor.com/static/en/model/wallpaper/GS4-MAX.zip) · [Performance](https://www.gac-motor.com/en/models/gacmotor/gs4max/performance.html) · [Video Center](https://www.gac-motor.com/en/media/video.html)
- **GAC Bolivia:** [gac.com.bo/gs4-max](https://www.gac.com.bo/gs4-max) · [Catalogue PDF](https://www.gac-motor.com/static/en/model/catalogue/GS4-MAX-Catalogue.pdf)
- **Viaggio dealership:** [viaggio.com.bo](https://viaggio.com.bo) — local unit photography, brand kit, persona brief

---

## Exact prompts (Phase 3A)

Copy verbatim; adjust only if reference set changes.

### 1. `hero-01.webp` (`gs4-max-hero-01`)

**References:** `ref-755b2df1.png`, `ref-front-grille.webp`

```
Photorealistic cinematic hero photograph, GAC GS4 MAX compact SUV in metallic silver paint, front three-quarter angle facing camera left, on polished dark studio floor with subtle reflection. Large chrome diamond-pattern grille, slim LED headlights, multi-spoke dark alloy wheels, black roof rails, premium SUV proportions exactly matching reference vehicle. Dramatic automotive lighting, slight desaturation, cool highlights, 16:9 1920x1080 composition with negative space upper third for UI overlay. No logos, no license plate text, demo showroom quality.
```

### 2. `hero-ambient.webp` (`gs4-max-hero-ambient`)

**References:** `ref-755b2df1.png`, `ref-gs4max-white.webp`

```
Wide cinematic ambient photograph, GAC GS4 MAX silver SUV parked at golden hour on a scenic road near Santa Cruz de la Sierra Bolivia, tropical lowland landscape with lush green palms and distant Andean foothills under warm sunset sky. Vehicle at three-quarter front angle, small in frame leaving generous sky and foreground for kiosk UI safe zones. Photorealistic, family-friendly, authentic Bolivian highway context (Doble Vía style), color grade slightly desaturated with lifted shadows. 16:9 ultra wide, no people, no text.
```

### 3. `front-34.webp` (`gs4-max-ext-front-34`)

**References:** `ref-755b2df1.png`, `ref-front-grille.webp`

```
Photorealistic automotive product photo, GAC GS4 MAX silver compact SUV front three-quarter view optimized for motor hot-spot detail, camera slightly lower emphasizing front grille, hood lines, headlight DRL signature and front wheel. Matching reference: large mesh grille with horizontal chrome slats, flush door handles, multi-spoke alloy wheels. Clean neutral gradient background, sharp focus on front end, 16:9 demo quality, no text overlays.
```

### 4. `dashboard.webp` (`gs4-max-int-dashboard`)

**References:** `ref-755b2df1.png` (exterior identity anchor)

```
Photorealistic automotive photograph of GAC GS4 MAX compact SUV interior dashboard. Driver perspective from rear seat showing full cockpit: dual 12.3-inch digital screens (instrument cluster and floating central touchscreen), black leather seats with red stitching, silver trim accents, steering wheel with GAC logo, panoramic sunroof visible, modern premium cabin. Soft natural daylight, minimal glare on screens showing navigation map. Cinematic color grade slightly desaturated cool highlights. 16:9 aspect ratio, ultra sharp demo quality, no people, no text overlays.
```

### 5. `family-road-trip.webp` (`gs4-max-family-cover`)

**References:** `ref-755b2df1.png`

```
Photorealistic lifestyle photograph, Bolivian family of four (parents and two children) standing proudly beside a silver GAC GS4 MAX SUV on a sunny day near Santa Cruz Bolivia. Tropical greenery, warm natural light, authentic casual clothing, joyful but not staged-excessive expressions. Vehicle matches reference silver GS4 MAX with correct grille and wheels. Road trip ready with open rear door visible. 16:9 cinematic composition, diverse Santa Cruz family representation, no brand logos on clothing, demo marketing quality.
```

### 6. `carlos-avatar.webp` (`persona-carlos-avatar`)

**References:** none (text-only generation)

```
Professional portrait illustration of Carlos, 48-year-old Bolivian master mechanic digital guide for Viaggio Motors Santa Cruz. Warm approachable face, short dark hair with grey at temples, calm confident expression, wearing navy Viaggio polo shirt. Head and shoulders portrait, soft studio lighting, steel blue accent background (#4A6FA5), premium automotive showroom style, semi-realistic digital illustration not cartoon, trustworthy expert demeanor. Square composition suitable for avatar crop.
```

---

## Post-processing pipeline (sharp)

Run from repo root after saving source PNGs. Requires `sharp` (already in project `node_modules`).

```bash
node <<'EOF'
const sharp = require('sharp');
const fs = require('fs');

const assets = [
  { src: 'PATH/hero-01-gen.png', dest: 'public/assets/vehicles/gs4-max/exterior/hero-01.webp', width: 1920, height: 1080 },
  { src: 'PATH/hero-ambient-gen.png', dest: 'public/assets/vehicles/gs4-max/exterior/hero-ambient.webp', width: 1920, height: 1080 },
  { src: 'PATH/front-34-gen.png', dest: 'public/assets/vehicles/gs4-max/exterior/front-34.webp', width: 1920, height: 1080 },
  { src: 'PATH/dashboard-gen.png', dest: 'public/assets/vehicles/gs4-max/interior/dashboard.webp', width: 1920, height: 1080 },
  { src: 'PATH/family-road-trip-gen.png', dest: 'public/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp', width: 1920, height: 1080 },
  { src: 'PATH/carlos-avatar-gen.png', dest: 'public/assets/personas/carlos-avatar.webp', width: 1024, height: 1024 },
];

async function processAsset({ src, dest, width, height }) {
  fs.mkdirSync(require('path').dirname(dest), { recursive: true });
  await sharp(src)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .modulate({ saturation: 0.92, brightness: 1.02 })
    .webp({ quality: 88, effort: 6 })
    .toFile(dest);
}

(async () => {
  for (const asset of assets) await processAsset(asset);
})();
EOF
```

**Parameters:**

| Step | Setting |
|------|---------|
| Resize | `fit: 'cover'`, `position: 'centre'` — 1920×1080 (vehicle) or 1024×1024 (avatar) |
| Color grade | `modulate({ saturation: 0.92, brightness: 1.02 })` — matches showroom cool/desaturated look |
| Export | WebP `quality: 88`, `effort: 6` |

**Verify output:**

```bash
file public/assets/vehicles/gs4-max/exterior/hero-01.webp
node -e "require('sharp')('public/assets/vehicles/gs4-max/exterior/hero-01.webp').metadata().then(console.log)"
```

---

## External tool workflows

### ChatGPT (DALL·E 3 / GPT-4o image)

1. Upload reference images from `docs/assets/reference/gs4-max/` (vehicle shots: `ref-755b2df1.png` + role-specific refs per table above).
2. Paste the exact prompt for the target asset.
3. Request **16:9** for vehicle/lifestyle shots, **1:1** for Carlos avatar.
4. Download PNG at highest resolution; run sharp pipeline above.
5. **Img2img tip:** Start with “Match the attached GAC GS4 MAX reference exactly — grille, wheels, silver paint, proportions” before the scene prompt.

### Midjourney

1. Upload reference to Discord; copy image URL or use `/describe` to validate grille/wheel match.
2. Use `--cref` (character/style reference) or `--sref` with `ref-755b2df1.png` for exterior consistency.
3. Example structure:
   ```
   /imagine prompt: [paste prompt] --ar 16:9 --style raw --sref [ref URL] --sw 100
   ```
4. For avatar: `--ar 1:1`, no `--sref`; add `--stylize 250` for semi-realistic illustration.
5. Upscale (U1–U4) → download PNG → sharp pipeline.

### Flux (Black Forest Labs / Replicate / ComfyUI)

1. **Img2img:** Set reference image to `ref-755b2df1.png` (strength 0.35–0.55 for exteriors; 0.25–0.40 for lifestyle with people).
2. Add `ref-front-grille.webp` as secondary ControlNet/IP-Adapter input for grille fidelity on `hero-01` and `front-34`.
3. Prompt: paste exact text; negative prompt: `cartoon, wrong grille, wrong wheels, text, watermark, license plate, distorted logo`.
4. Output 1920×1080 or 1536×864 minimum before sharp resize.
5. Carlos avatar: text-to-image only, 1024×1024, CFG 3.5–5.

### Cursor GenerateImage (used for Phase 3A)

```text
GenerateImage({
  description: "<exact prompt>",
  filename: "<name>-gen.png",
  reference_image_paths: ["docs/assets/reference/gs4-max/ref-755b2df1.png", ...]
})
```

Then run the sharp post-processing script.

---

## Licensing note

- **Demo AI-generated assets** in `public/assets/` are **pending Viaggio Motors and GAC Bolivia marketing approval**. They are suitable for internal executive demos only until replaced with licensed OEM photography or approved local shoots.
- **OEM reference rasters** in `docs/assets/reference/` are for generation reference only — do not copy directly into `public/` without distributor license.
- **Lifestyle imagery** with identifiable people requires **signed model releases** before production/kiosk deployment.
- **Persona avatars** require **Viaggio brand sign-off** on likeness, attire, and diversity representation.

For production acquisition paths, see [docs/assets/source-catalog.md](docs/assets/source-catalog.md) and [docs/assets/asset-acquisition-plan.md](docs/assets/asset-acquisition-plan.md).

---

## Related files

| File | Purpose |
|------|---------|
| [assets-manifest.csv](assets-manifest.csv) | Machine-readable inventory of Phase 3A outputs |
| [DEMO_ASSET_STATUS.md](DEMO_ASSET_STATUS.md) | Generated vs missing vs manual-work tracker |
| [content/vehicles/gs4-max/media-manifest.json](content/vehicles/gs4-max/media-manifest.json) | Runtime media ID → path mapping |
