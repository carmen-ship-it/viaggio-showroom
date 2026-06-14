const STORAGE_PREFIX = "viaggio-resume";

export function createResumeToken(): string {
  return Math.random().toString(36).slice(2, 12);
}

export function getOrCreateResumeToken(vehicleSlug: string): string {
  if (typeof window === "undefined") return "";

  const key = `${STORAGE_PREFIX}-${vehicleSlug}`;
  const stored = localStorage.getItem(key);
  if (stored) return stored;

  const token = createResumeToken();
  localStorage.setItem(key, token);
  return token;
}

export function buildResumeUrl(origin: string, vehicleSlug: string, token: string): string {
  return `${origin}/vehicles/${vehicleSlug}/resume?token=${token}`;
}
