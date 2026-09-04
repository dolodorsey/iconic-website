export type MerchCollection = {
  name: string;
  slug: string;
  code: string;
  subtitle: string;
  mood: string;
  accent: string;
  secondary: string;
};

export const collections: MerchCollection[] = [
  { name: "21 SAVAGE", slug: "21-savage", code: "01", subtitle: "Slasher rap. Cold steel. Atlanta after midnight.", mood: "SAVAGE MODE", accent: "#f4ff2f", secondary: "#a8b100" },
  { name: "KODAK BLACK", slug: "kodak-black", code: "02", subtitle: "Florida heat warped through a Halloween lens.", mood: "PROJECT NIGHT", accent: "#ffb000", secondary: "#6d3d00" },
  { name: "DA BABY", slug: "da-baby", code: "03", subtitle: "High-impact graphics built like a horror movie poster.", mood: "BABY ON BOARD", accent: "#ff3b30", secondary: "#6b0906" },
  { name: "MEEK MILL", slug: "meek-mill", code: "04", subtitle: "Dreams, nightmares, speed and pressure.", mood: "DREAMCHASER", accent: "#d8d8ff", secondary: "#4b4c7a" },
  { name: "BELLY GANG KUSH", slug: "belly-gang-kush", code: "05", subtitle: "Southern street energy with grimy collectible graphics.", mood: "BELLY GANG", accent: "#7cff6b", secondary: "#1d5f18" },
  { name: "YK NIECE", slug: "yk-niece", code: "06", subtitle: "Sweet poison. Flash photography. Dollhouse horror.", mood: "NIECE AFTER DARK", accent: "#ff72d2", secondary: "#712552" },
  { name: "BABY DRILL", slug: "baby-drill", code: "07", subtitle: "Underground, distressed, industrial and dangerous.", mood: "DRILL NIGHT", accent: "#ff6438", secondary: "#6e2411" },
  { name: "DIAMOND THE BODY", slug: "diamond-the-body", code: "08", subtitle: "Luxury danger. Chrome, diamonds and after-hours glamour.", mood: "BODY HORROR", accent: "#d5f4ff", secondary: "#3a6877" },
  { name: "ALL ARTISTS", slug: "all-artists", code: "09", subtitle: "The full bill in one collectible concert capsule.", mood: "FULL LINEUP", accent: "#ffffff", secondary: "#666666" },
  { name: "CHEEKSBOSSMAN GEMG", slug: "cheeksbossman-gemg", code: "10", subtitle: "Boss graphics, Tampa attitude and bootleg-poster chaos.", mood: "BOSS MODE", accent: "#45e7ff", secondary: "#16606b" },
  { name: "TAMPA", slug: "tampa", code: "11", subtitle: "813 culture, Channelside nights and Florida iconography.", mood: "813 FOREVER", accent: "#63ffbf", secondary: "#1c6a50" },
  { name: "NIGHTMARE ON CHANNELSIDE", slug: "nightmare-on-channelside", code: "12", subtitle: "The official event collection. Limited, numbered, permanent.", mood: "OFFICIAL EVENT", accent: "#f4ff2f", secondary: "#8d9600" },
  { name: "HALLOWEEN / CULTURE", slug: "halloween-culture", code: "13", subtitle: "Black culture, horror nostalgia, streetwear and Halloween mythology.", mood: "CULTURE OF FEAR", accent: "#ff5a1f", secondary: "#74280d" },
  { name: "HALLOWEEN 2027", slug: "halloween-2027", code: "14", subtitle: "Future archive pieces built to live beyond one concert night.", mood: "NEXT NIGHTMARE", accent: "#9d7bff", secondary: "#3a296d" },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductSlots(collection: MerchCollection) {
  return Array.from({ length: 10 }, (_, index) => ({
    id: `${collection.slug}-${String(index + 1).padStart(2, "0")}`,
    design: `DESIGN ${String(index + 1).padStart(2, "0")}`,
    title: `${collection.name} / DROP ${String(index + 1).padStart(2, "0")}`,
    type: index % 5 === 4 ? "LIMITED TEE" : "GRAPHIC TEE",
    status: "ARTWORK IN PRODUCTION",
  }));
}
