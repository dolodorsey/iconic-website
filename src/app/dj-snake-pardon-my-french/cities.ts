export type PmfCity = {
  slug: string;
  city: string;
  state: string;
  venue: string;
  note: string;
  positioning: string;
};

export const PMF_CITIES: PmfCity[] = [
  {
    slug: "los-angeles",
    city: "Los Angeles",
    state: "California",
    venue: "SoFi Stadium",
    note: "West Coast stadium chapter of the current PMF route.",
    positioning: "A global-music market where stadium production, fashion, nightlife and creator culture can operate as one launch-scale moment.",
  },
  {
    slug: "las-vegas",
    city: "Las Vegas",
    state: "Nevada",
    venue: "Allegiant Stadium",
    note: "A nightlife-led destination market built for VIP and hospitality extensions.",
    positioning: "A destination city where premium arrival, hotel, nightlife and brand hospitality can extend the show into a full weekend economy.",
  },
  {
    slug: "dallas",
    city: "Dallas",
    state: "Texas",
    venue: "Cotton Bowl Stadium",
    note: "Texas stadium chapter with city-specific content, partners and product.",
    positioning: "A high-capacity Texas market designed for regional draw, local partner activation and city-coded merchandise.",
  },
  {
    slug: "tampa",
    city: "Tampa",
    state: "Florida",
    venue: "Raymond James Stadium",
    note: "Florida stadium chapter positioned as a full destination weekend.",
    positioning: "A Florida destination play that connects stadium energy with travel, nightlife, hospitality and regional fan traffic.",
  },
  {
    slug: "new-york",
    city: "New York",
    state: "New York",
    venue: "Citi Field",
    note: "East Coast finale market in the current five-city architecture.",
    positioning: "A global media and culture market where the PMF identity can scale through fashion, content, partners and East Coast destination traffic.",
  },
];

export function getPmfCity(slug:string){
  return PMF_CITIES.find((market)=>market.slug===slug);
}
