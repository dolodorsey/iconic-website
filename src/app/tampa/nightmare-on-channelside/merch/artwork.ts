export type MerchArtwork = {
  primary: string;
  alternate: string;
  label: string;
};

export function getLocalMerchArtwork(collectionSlug: string, designNumber: number): MerchArtwork | null {
  if (collectionSlug !== "21-savage" || designNumber < 1 || designNumber > 10) return null;
  const number = String(designNumber).padStart(2, "0");
  const primary = `/nightmare-merch/21-savage/21-savage-${number}.webp`;
  return {
    primary,
    alternate: primary,
    label: `21 Savage design ${number}`,
  };
}

export function getResolvedArtwork(product: {
  collection_slug: string;
  design_number: number;
  primary_image_url?: string | null;
  secondary_image_url?: string | null;
}) {
  if (product.primary_image_url) {
    return {
      primary: product.primary_image_url,
      alternate: product.secondary_image_url || product.primary_image_url,
      label: `Design ${String(product.design_number).padStart(2, "0")}`,
      source: "catalog" as const,
    };
  }
  const local = getLocalMerchArtwork(product.collection_slug, product.design_number);
  return local ? { ...local, source: "local" as const } : null;
}
