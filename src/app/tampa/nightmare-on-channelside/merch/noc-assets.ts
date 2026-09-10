export const NOC_MEDIA = {
  homeAnimation: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-home-hero-hq2.webp?v=1789034116",
  homeHero: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-05.png?v=1788994208",
  archiveFacade: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-04.png?v=1788994197",
  hall: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-03.png?v=1788994188",
  market: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-02.png?v=1788994179",
  headliners: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-01.png?v=1788994167",
} as const;

export const COLLECTION_ART: Record<string, string> = {
  "21-savage": "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-21-savage_122317aa-8dc9-4e48-afa9-2c5a385a11a4.png?v=1789033224",
  "kodak-black": "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-kodak-black_493a477e-bfe6-4d60-95e9-a2ec38513d6e.png?v=1789033242",
  "da-baby": "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-dababy_1946f414-ab52-4963-999f-4196dabdb73a.png?v=1789033260",
  "meek-mill": "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-meek-mill_c7f493ca-0f78-4a04-a025-715e139fd213.png?v=1789033278",
  "belly-gang-kush": "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-belly-gang-kush_a1aaf76b-f1de-4e51-8c9f-d58571bf8150.png?v=1789033305",
  "all-artists": "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-all-artists_9974924d-e1de-4e64-b05a-2cc62651c3c2.png?v=1789033324",
  tampa: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-tampa_e79cb5d0-e894-43c1-92b2-8c48eec0bc77.png?v=1789033337",
  "nightmare-on-channelside": "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-world-nightmare-on-channelside.png?v=1789033357",
};

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
    image: COLLECTION_ART["21-savage"],
  },
  "kodak-black": {
    title: "KODAK BLACK",
    line: "OFFICIAL COLLECTION",
    story: "Official Kodak Black pieces from Nightmare on Channelside.",
    image: COLLECTION_ART["kodak-black"],
  },
  "da-baby": {
    title: "DABABY",
    line: "OFFICIAL COLLECTION",
    story: "Official DaBaby pieces from Nightmare on Channelside.",
    image: COLLECTION_ART["da-baby"],
  },
  "meek-mill": {
    title: "MEEK MILL",
    line: "OFFICIAL COLLECTION",
    story: "Official Meek Mill pieces from Nightmare on Channelside.",
    image: COLLECTION_ART["meek-mill"],
  },
  "belly-gang-kush": {
    title: "BELLY GANG KUSH",
    line: "OFFICIAL COLLECTION",
    story: "Official Belly Gang Kush pieces from Nightmare on Channelside.",
    image: COLLECTION_ART["belly-gang-kush"],
  },
  "all-artists": {
    title: "ALL ARTISTS",
    line: "FULL LINEUP COLLECTION",
    story: "Full-lineup Nightmare on Channelside pieces.",
    image: COLLECTION_ART["all-artists"],
  },
  tampa: {
    title: "TAMPA",
    line: "CITY COLLECTION",
    story: "Tampa and Channelside pieces from Nightmare on Channelside.",
    image: COLLECTION_ART.tampa,
  },
  "nightmare-on-channelside": {
    title: "NIGHTMARE ON CHANNELSIDE",
    line: "OFFICIAL EVENT COLLECTION",
    story: "The official Nightmare on Channelside event collection.",
    image: COLLECTION_ART["nightmare-on-channelside"],
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
