export interface PlaceholderMediaConfig {
  gradient: string;
  label: string;
  aspect?: "video" | "photo" | "square";
}

function hashMediaId(mediaId: string): number {
  let hash = 0;
  for (let i = 0; i < mediaId.length; i += 1) {
    hash = (hash << 5) - hash + mediaId.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const GRADIENTS = [
  "linear-gradient(135deg, #0b0d10 0%, #1a2332 45%, #2a3038 100%)",
  "linear-gradient(160deg, #0f1419 0%, #1e3a5f 50%, #14171c 100%)",
  "linear-gradient(145deg, #14171c 0%, #2d1f1a 40%, #0b0d10 100%)",
  "linear-gradient(120deg, #0b0d10 0%, #1a2e1a 55%, #1c2028 100%)",
  "linear-gradient(155deg, #10141a 0%, #3d2e1f 35%, #0b0d10 100%)",
];

export function getPlaceholderMedia(mediaId: string): PlaceholderMediaConfig {
  const index = hashMediaId(mediaId) % GRADIENTS.length;
  const readable = mediaId.replace(/[-_]/g, " ").toUpperCase();

  return {
    gradient: GRADIENTS[index],
    label: readable,
    aspect: mediaId.includes("hero") || mediaId.includes("loop") ? "video" : "photo",
  };
}
