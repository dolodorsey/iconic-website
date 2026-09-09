export const NOC_MEDIA = {
  homeHero: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-05.png?v=1788994208",
  archiveFacade: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-04.png?v=1788994197",
  hall: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-03.png?v=1788994188",
  market: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-02.png?v=1788994179",
  headliners: "https://cdn.shopify.com/s/files/1/0759/7506/5791/files/noc-site-scene-01.png?v=1788994167",
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
    title: "SAVAGE MODE",
    line: "HEADLINER AFTER DARK",
    story: "The headline issue. Heavy silhouettes, arena energy and the pieces that enter before the lights go down.",
    image: NOC_MEDIA.headliners,
  },
  "kodak-black": {
    title: "PROJECT NIGHT",
    line: "FLORIDA PRESSURE",
    story: "Built for Tampa heat after midnight — Kodak issue pieces with the city baked into the artwork.",
    image: NOC_MEDIA.archiveFacade,
  },
  "da-baby": {
    title: "NO CURFEW",
    line: "CHAOS IN MOTION",
    story: "Fast, loud and built like the night is already running late.",
    image: NOC_MEDIA.market,
  },
  "meek-mill": {
    title: "DREAMS AFTER DARK",
    line: "ARENA PRESSURE",
    story: "Big-stage pieces for the part of the night where the whole building feels alive.",
    image: NOC_MEDIA.hall,
  },
  "belly-gang-kush": {
    title: "BELLY GANG",
    line: "STREET ISSUE",
    story: "Raw event pieces cut from the street side of the Nightmare universe.",
    image: NOC_MEDIA.market,
  },
  "all-artists": {
    title: "THE BILL",
    line: "ONE STAGE. EVERY NAME.",
    story: "The full-lineup issue — one collection built around the entire night.",
    image: NOC_MEDIA.homeHero,
  },
  tampa: {
    title: "813 AFTER MIDNIGHT",
    line: "TAMPA FOREVER",
    story: "City-stamped pieces for the people who know exactly what Channelside feels like after dark.",
    image: NOC_MEDIA.archiveFacade,
  },
  "nightmare-on-channelside": {
    title: "THE NIGHTMARE",
    line: "OFFICIAL EVENT ISSUE",
    story: "The core event collection. No artist required — just the night, the arena and the mark.",
    image: NOC_MEDIA.headliners,
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
