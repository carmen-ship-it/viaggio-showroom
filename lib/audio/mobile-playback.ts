/** Inline silent WAV — primes mobile browsers inside a user gesture without audible output. */
export const SILENT_WAV_DATA_URI =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA=";

export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/.test(navigator.userAgent);
}

/** True for phone/tablet browsers where autoplay policies are strictest. */
export function isMobileBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return isIOS() || isAndroid();
}

/** Apply attributes recommended for inline playback on iOS Safari. */
export function configureMobileAudioElement(element: HTMLAudioElement): void {
  element.setAttribute("playsinline", "true");
  element.setAttribute("webkit-playsinline", "true");
}
