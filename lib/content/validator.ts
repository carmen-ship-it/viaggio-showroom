import Ajv, { type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";
import { SCHEMA_ROOT } from "./paths";

const ajv = new Ajv({ allErrors: true, strict: false, validateSchema: false });
addFormats(ajv);

const schemaCache = new Map<string, ValidateFunction>();
let schemasRegistered = false;

function stripMeta(schema: Record<string, unknown>): Record<string, unknown> {
  const copy = { ...schema };
  delete copy.$schema;
  return copy;
}

function registerSchemas(): void {
  if (schemasRegistered) return;

  const schemaFiles = fs
    .readdirSync(SCHEMA_ROOT)
    .filter((file) => file.endsWith(".schema.json"));

  for (const file of schemaFiles) {
    const schemaPath = path.join(SCHEMA_ROOT, file);
    const raw = JSON.parse(fs.readFileSync(schemaPath, "utf-8")) as Record<
      string,
      unknown
    >;
    const schema = stripMeta(raw);
    const id = (schema.$id as string | undefined) ?? file;
    ajv.addSchema(schema, id);
  }

  schemasRegistered = true;
}

function loadSchema(schemaFile: string): ValidateFunction {
  registerSchemas();

  const cached = schemaCache.get(schemaFile);
  if (cached) return cached;

  const schemaPath = path.join(SCHEMA_ROOT, schemaFile);
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8")) as {
    $id?: string;
  };
  const validate = ajv.getSchema(schema.$id ?? "") ?? ajv.compile(schema);
  schemaCache.set(schemaFile, validate);
  return validate;
}

export class ContentValidationError extends Error {
  constructor(
    message: string,
    public readonly errors: unknown,
  ) {
    super(message);
    this.name = "ContentValidationError";
  }
}

export function validateContent<T>(
  schemaFile: string,
  data: unknown,
  context: string,
): T {
  const validate = loadSchema(schemaFile);
  if (validate(data)) {
    return data as T;
  }

  throw new ContentValidationError(
    `Content validation failed for ${context}`,
    validate.errors,
  );
}
