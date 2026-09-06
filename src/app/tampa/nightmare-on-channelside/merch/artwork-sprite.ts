export const FINISHED_21_SAVAGE_SPRITE = "/nightmare-merch/21-savage/21-savage-sprite.webp";

const positions = [
  "0% 0%", "100% 0%", "0% 25%", "100% 25%", "0% 50%",
  "100% 50%", "0% 75%", "100% 75%", "0% 100%", "100% 100%",
];

export function getFinishedSpriteArtwork(collectionSlug: string, designNumber: number) {
  if (collectionSlug !== "21-savage" || designNumber < 1 || designNumber > 10) return null;
  return {
    url: FINISHED_21_SAVAGE_SPRITE,
    position: positions[designNumber - 1],
    label: `21 Savage design ${String(designNumber).padStart(2, "0")}`,
  };
}
