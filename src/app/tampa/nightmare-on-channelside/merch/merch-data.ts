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
  { name: "21 SAVAGE", slug: "21-savage", code: "01", subtitle: "Stage menace. Cold steel. Tampa after midnight.", mood: "SAVAGE AFTER DARK", accent: "#f4ff2f", secondary: "#a8b100" },
  { name: "KODAK BLACK", slug: "kodak-black", code: "02", subtitle: "Florida pressure under a blood-red sky.", mood: "PROJECT RED MOON", accent: "#ffb000", secondary: "#6d3d00" },
  { name: "DA BABY", slug: "da-baby", code: "03", subtitle: "High-impact chaos built for the front row.", mood: "MIDNIGHT PRESSURE", accent: "#ff3b30", secondary: "#6b0906" },
  { name: "MEEK MILL", slug: "meek-mill", code: "04", subtitle: "Dreamchaser energy with arena-level pressure.", mood: "DREAMS AFTER MIDNIGHT", accent: "#d8d8ff", secondary: "#4b4c7a" },
  { name: "BELLY GANG KUSH", slug: "belly-gang-kush", code: "05", subtitle: "Southern street energy after the lights go red.", mood: "BELLY GANG AFTER HOURS", accent: "#7cff6b", secondary: "#1d5f18" },
  { name: "YK NIECE", slug: "yk-niece", code: "06", subtitle: "Sweet poison, flash photography and dollhouse horror.", mood: "NIECE AFTER DARK", accent: "#ff72d2", secondary: "#712552" },
  { name: "BABY DRILL", slug: "baby-drill", code: "07", subtitle: "Underground, distressed and built for the pit.", mood: "DRILL AFTER DARK", accent: "#ff6438", secondary: "#6e2411" },
  { name: "DIAMOND THE BODY", slug: "diamond-the-body", code: "08", subtitle: "Chrome, diamonds and after-hours glamour.", mood: "DIAMOND AFTER MIDNIGHT", accent: "#d5f4ff", secondary: "#3a6877" },
  { name: "ALL ARTISTS", slug: "all-artists", code: "09", subtitle: "One stage. One nightmare. The entire bill.", mood: "THE FULL CAST", accent: "#ffffff", secondary: "#666666" },
  { name: "CHEEKSBOSSMAN GEMG", slug: "cheeksbossman-gemg", code: "10", subtitle: "Boss energy, Tampa attitude and poster-wall chaos.", mood: "BOSS AFTER DARK", accent: "#45e7ff", secondary: "#16606b" },
  { name: "TAMPA", slug: "tampa", code: "11", subtitle: "Channelside nights. 813 stamped. Tampa forever.", mood: "813 AFTER DARK", accent: "#63ffbf", secondary: "#1c6a50" },
  { name: "NIGHTMARE ON CHANNELSIDE", slug: "nightmare-on-channelside", code: "12", subtitle: "The signature event issue. Built for 10.31.26.", mood: "OFFICIAL NIGHTMARE", accent: "#f4ff2f", secondary: "#8d9600" },
  { name: "HALLOWEEN / CULTURE", slug: "halloween-culture", code: "13", subtitle: "Horror nostalgia, streetwear and Halloween mythology.", mood: "CULTURE OF FEAR", accent: "#ff5a1f", secondary: "#74280d" },
  { name: "HALLOWEEN 2027", slug: "halloween-2027", code: "14", subtitle: "Future archive pieces built to live beyond one concert night.", mood: "THE NEXT NIGHTMARE", accent: "#9d7bff", secondary: "#3a296d" },
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
