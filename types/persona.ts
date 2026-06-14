export type PersonaId = "carlos" | "sofia" | "diego";
export type PersonaPurpose = "trust" | "desire" | "ownership";

export interface Persona {
  id: PersonaId;
  name: string;
  role: string;
  purpose: PersonaPurpose;
  avatarMediaId: string;
  voiceTraits: string[];
  colorAccent: string;
  introLine: string;
}

export interface PersonaRegistry {
  personas: Persona[];
}
