export type SoulSymphonyCity = {
  slug: string;
  city: string;
  state: string;
  date: string;
  venue: string;
  positioning: string;
};

export const SOUL_SYMPHONY_CITIES: SoulSymphonyCity[] = [
  {slug:"atlanta",city:"Atlanta",state:"GA",date:"October 3, 2026",venue:"State Farm Arena",positioning:"The home-market opening chapter: culture, R&B, premium hospitality and hometown energy at arena scale."},
  {slug:"miami",city:"Miami",state:"FL",date:"October 10, 2026",venue:"Kaseya Center",positioning:"A destination-nightlife market where Soul Symphony can extend into luxury hospitality, fashion, travel and partner moments."},
  {slug:"dallas",city:"Dallas",state:"TX",date:"October 17, 2026",venue:"American Airlines Center",positioning:"A major Texas arena market with strong regional draw, premium seating demand and localized sponsor opportunities."},
  {slug:"washington-dc",city:"Washington, DC",state:"DC",date:"October 24, 2026",venue:"Capital One Arena",positioning:"A high-value East Coast market built around culture, professional audiences, premium hospitality and regional travel."},
  {slug:"philadelphia",city:"Philadelphia",state:"PA",date:"October 31, 2026",venue:"Wells Fargo Center",positioning:"A Halloween-night arena chapter with strong music culture, city-specific creative and collectible tour commerce."},
  {slug:"new-york",city:"New York",state:"NY",date:"November 7, 2026",venue:"Madison Square Garden",positioning:"The flagship media-market chapter: global visibility, fashion, celebrity hospitality and major partner potential."},
  {slug:"chicago",city:"Chicago",state:"IL",date:"November 14, 2026",venue:"United Center",positioning:"A Midwest anchor with arena scale, deep R&B demand and strong regional travel economics."},
  {slug:"detroit",city:"Detroit",state:"MI",date:"November 21, 2026",venue:"Little Caesars Arena",positioning:"A music-heritage market where emotion, live instrumentation and premium visual storytelling can feel especially native."},
  {slug:"houston",city:"Houston",state:"TX",date:"December 5, 2026",venue:"Toyota Center",positioning:"A high-growth Southern market connecting R&B culture, nightlife, hospitality and strong sponsor relationships."},
  {slug:"los-angeles",city:"Los Angeles",state:"CA",date:"December 12, 2026",venue:"Crypto.com Arena",positioning:"The West Coast finale chapter: entertainment-industry visibility, fashion, content capture and premium partner hospitality."},
];

export function getSoulSymphonyCity(slug:string){
  return SOUL_SYMPHONY_CITIES.find((market)=>market.slug===slug);
}
