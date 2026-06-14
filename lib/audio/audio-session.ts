const PLAYED_PREFIX = "viaggio-host-played:";
const COOLDOWN_PREFIX = "viaggio-host-cooldown:";

export function wasHostTrackPlayed(sessionKey: string): boolean {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(`${PLAYED_PREFIX}${sessionKey}`) === "1";
}

export function markHostTrackPlayed(sessionKey: string): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(`${PLAYED_PREFIX}${sessionKey}`, "1");
}

export function clearHostTrackPlayed(sessionKey: string): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(`${PLAYED_PREFIX}${sessionKey}`);
}

export function isHostTrackOnCooldown(sessionKey: string, cooldownMs: number): boolean {
  if (typeof sessionStorage === "undefined") return false;
  const raw = sessionStorage.getItem(`${COOLDOWN_PREFIX}${sessionKey}`);
  if (!raw) return false;
  const elapsed = Date.now() - Number(raw);
  return elapsed < cooldownMs;
}

export function markHostTrackCooldown(sessionKey: string): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(`${COOLDOWN_PREFIX}${sessionKey}`, String(Date.now()));
}

export function clearAllHostSessionKeys(): void {
  if (typeof sessionStorage === "undefined") return;
  for (let i = sessionStorage.length - 1; i >= 0; i -= 1) {
    const key = sessionStorage.key(i);
    if (key?.startsWith(PLAYED_PREFIX) || key?.startsWith(COOLDOWN_PREFIX)) {
      sessionStorage.removeItem(key);
    }
  }
}

export const AUDIO_UNLOCK_KEY = "viaggio-audio-unlocked";

export function isAudioUnlockedPersisted(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(AUDIO_UNLOCK_KEY) === "1";
}

export function persistAudioUnlocked(): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(AUDIO_UNLOCK_KEY, "1");
}

export function clearAudioUnlocked(): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(AUDIO_UNLOCK_KEY);
}
