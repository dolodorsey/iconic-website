export const NOC_MEDIA = {
  homeAnimation: "/media/noc-home.mp4",
  homeHero: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-05.png?v=1788994208",
  archiveFacade: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-04.png?v=1788994197",
  hall: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-03.png?v=1788994188",
  market: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-02.png?v=1788994179",
  headliners: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-01.png?v=1788994167",
  world21Savage: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-21-savage.png?v=1789031633",
  worldKodakBlack: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-kodak-black.png?v=1789031647",
  worldMeekMill: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-meek-mill.png?v=1789031664",
  worldDaBaby: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-dababy.png?v=1789031679",
  worldBellyGangKush: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-belly-gang-kush.png?v=1789031692",
  worldAllArtists: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-all-artists.png?v=1789031796",
  worldTampa: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-tampa.png?v=1789031807",
  worldEvent: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-event.png?v=1789031818",
} as const;

export const NOC_SCENES = [
  NOC_MEDIA.homeHero,
  NOC_MEDIA.archiveFacade,
  NOC_MEDIA.hall,
  NOC_MEDIA.market,
  NOC_MEDIA.headliners,
] as const;

export const WORLD_LANGUAGE: Record<string, { title: string; line: string; story: string; image: string }> = {
  "21-savage": {
    title: "21 SAVAGE",
    line: "OFFICIAL COLLECTION",
    story: "Official 21 Savage pieces from Nightmare on Channelside.",
    image: NOC_MEDIA.world21Savage,
  },
  "kodak-black": {
    title: "KODAK BLACK",
    line: "OFFICIAL COLLECTION",
    story: "Official Kodak Black pieces from Nightmare on Channelside.",
    image: NOC_MEDIA.worldKodakBlack,
  },
  "da-baby": {
    title: "DABABY",
    line: "OFFICIAL COLLECTION",
    story: "Official DaBaby pieces from Nightmare on Channelside.",
    image: NOC_MEDIA.worldDaBaby,
  },
  "meek-mill": {
    title: "MEEK MILL",
    line: "OFFICIAL COLLECTION",
    story: "Official Meek Mill pieces from Nightmare on Channelside.",
    image: NOC_MEDIA.worldMeekMill,
  },
  "belly-gang-kush": {
    title: "BELLY GANG KUSH",
    line: "OFFICIAL COLLECTION",
    story: "Official Belly Gang Kush pieces from Nightmare on Channelside.",
    image: NOC_MEDIA.worldBellyGangKush,
  },
  "all-artists": {
    title: "ALL ARTISTS",
    line: "FULL LINEUP COLLECTION",
    story: "Full-lineup Nightmare on Channelside pieces.",
    image: NOC_MEDIA.worldAllArtists,
  },
  tampa: {
    title: "TAMPA",
    line: "CITY COLLECTION",
    story: "Tampa and Channelside pieces from Nightmare on Channelside.",
    image: NOC_MEDIA.worldTampa,
  },
  "nightmare-on-channelside": {
    title: "NIGHTMARE ON CHANNELSIDE",
    line: "OFFICIAL EVENT COLLECTION",
    story: "The official Nightmare on Channelside event collection.",
    image: NOC_MEDIA.worldEvent,
  },
};

export function worldLanguage(slug: string, fallbackTitle: string, fallbackLine: string) {
  return WORLD_LANGUAGE[slug] || {
    title: fallbackTitle,
    line: fallbackLine,
    story: "Official Nightmare on Channelside event merchandise.",
    image: NOC_MEDIA.homeHero,
  };
}
