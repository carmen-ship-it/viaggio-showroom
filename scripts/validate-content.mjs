import fs from "fs";
import path from "path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const root = process.cwd();
const schemaDir = path.join(root, "docs", "schemas");
const contentDir = path.join(root, "content");

const ajv = new Ajv({ allErrors: true, strict: false, validateSchema: false });
addFormats(ajv);

function stripMeta(schema) {
  const { $id, ...rest } = schema;
  delete rest.$schema;
  return { $id, ...rest };
}

for (const file of fs.readdirSync(schemaDir)) {
  if (!file.endsWith(".schema.json")) continue;
  const raw = JSON.parse(fs.readFileSync(path.join(schemaDir, file), "utf-8"));
  const schema = stripMeta(raw);
  ajv.addSchema(schema, schema.$id ?? file);
}

function validate(schemaFile, data, label) {
  const raw = JSON.parse(
    fs.readFileSync(path.join(schemaDir, schemaFile), "utf-8"),
  );
  const schema = stripMeta(raw);
  const validateFn = ajv.getSchema(schema.$id) ?? ajv.compile(schema);
  if (!validateFn(data)) {
    console.error(`FAIL ${label}`, validateFn.errors);
    process.exitCode = 1;
    return false;
  }
  console.log(`OK ${label}`);
  return true;
}

validate(
  "vehicle-registry.schema.json",
  JSON.parse(fs.readFileSync(path.join(contentDir, "vehicles/registry.json"))),
  "registry",
);

const personasFile = JSON.parse(
  fs.readFileSync(path.join(contentDir, "personas/personas.json")),
);
for (const persona of personasFile.personas) {
  validate("persona.schema.json", persona, `persona:${persona.id}`);
}

validate(
  "dealership.schema.json",
  JSON.parse(fs.readFileSync(path.join(contentDir, "shared/dealership.json"))),
  "dealership",
);

const gs4Dir = path.join(contentDir, "vehicles/gs4-max");
validate(
  "vehicle.schema.json",
  JSON.parse(fs.readFileSync(path.join(gs4Dir, "vehicle.json"))),
  "vehicle:gs4-max",
);

for (const file of fs.readdirSync(path.join(gs4Dir, "themes"))) {
  if (!file.endsWith(".json")) continue;
  validate(
    "theme.schema.json",
    JSON.parse(fs.readFileSync(path.join(gs4Dir, "themes", file))),
    `theme:${file}`,
  );
}

for (const file of fs.readdirSync(path.join(gs4Dir, "topics"))) {
  if (!file.endsWith(".json")) continue;
  validate(
    "topic.schema.json",
    JSON.parse(fs.readFileSync(path.join(gs4Dir, "topics", file))),
    `topic:${file}`,
  );
}

for (const file of fs.readdirSync(path.join(gs4Dir, "tours"))) {
  if (!file.endsWith(".json")) continue;
  validate(
    "tour.schema.json",
    JSON.parse(fs.readFileSync(path.join(gs4Dir, "tours", file))),
    `tour:${file}`,
  );
}

const mediaManifestPath = path.join(gs4Dir, "media-manifest.json");
if (fs.existsSync(mediaManifestPath)) {
  validate(
    "media-manifest.schema.json",
    JSON.parse(fs.readFileSync(mediaManifestPath, "utf-8")),
    "media-manifest:gs4-max",
  );
}
