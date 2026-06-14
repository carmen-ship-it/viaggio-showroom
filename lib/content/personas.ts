import { cache } from "react";
import type { Persona, PersonaId } from "@/types/persona";
import { contentPaths } from "./paths";
import { readJsonFile } from "./loader";
import { validateContent } from "./validator";

interface PersonaFile {
  personas: Persona[];
}

export const getPersonas = cache((): Persona[] => {
  const data = readJsonFile<PersonaFile>(contentPaths.personas());
  return data.personas.map((persona, index) =>
    validateContent<Persona>(
      "persona.schema.json",
      persona,
      `persona:${index}`,
    ),
  );
});

export const getPersona = cache((personaId: PersonaId): Persona => {
  const persona = getPersonas().find((p) => p.id === personaId);
  if (!persona) {
    throw new Error(`Persona not found: ${personaId}`);
  }
  return persona;
});
