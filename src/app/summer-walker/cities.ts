export type SoulSymphonyCity = {
  slug: string;
  city: string;
  state: string;
  date: string;
  venue: string;
  positioning: string;
};

// These are the venue-specific city concepts explicitly shown in the supplied
// Soul Symphony tour deck. The deck positions the overall property as a 10-city
// experience, but it does not provide confirmed dates for these venue pages.
export const SOUL_SYMPHONY_CITIES: SoulSymphonyCity[] = [
  {slug:"miami",city:"Miami",state:"FL",date:"Date to be announced",venue:"Kaseya Center",positioning:"A destination market where Soul Symphony can extend through premium hospitality, nightlife, travel, city activations and brand partnerships."},
  {slug:"dallas",city:"Dallas",state:"TX",date:"Date to be announced",venue:"American Airlines Center",positioning:"A major Texas market with strong R&B demand, premium hospitality potential, regional draw and localized partnership opportunities."},
  {slug:"washington-dc",city:"Washington, DC",state:"DC",date:"Date to be announced",venue:"Capital One Arena",positioning:"An East Coast market with cultural reach, professional audiences, premium hospitality and strong regional access."},
  {slug:"philadelphia",city:"Philadelphia",state:"PA",date:"Date to be announced",venue:"Wells Fargo Center",positioning:"A music-driven market with deep R&B affinity, cultural legacy, premium audience potential and city-specific activation opportunities."},
  {slug:"new-orleans",city:"New Orleans",state:"LA",date:"Date to be announced",venue:"Smoothie King Center",positioning:"A globally recognized music city where soul, nightlife, hospitality and cultural memory naturally extend the Soul Symphony experience."},
];

export function getSoulSymphonyCity(slug:string){
  return SOUL_SYMPHONY_CITIES.find((market)=>market.slug===slug);
}
