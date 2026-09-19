export type PartnerFieldType = "text" | "number" | "url" | "textarea" | "select" | "checkbox";

export type PartnerField = {
  id: string;
  label: string;
  type: PartnerFieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
};

export type PartnerRole = {
  slug: string;
  requestedRole: string;
  pipelineKey: "noc_partner_program" | "noc_media_podcast" | "noc_performance_talent" | "noc_street_team";
  eyebrow: string;
  title: string;
  short: string;
  compensation: string;
  commitment: string;
  fields: PartnerField[];
};

export const PARTNER_ROLES: PartnerRole[] = [
  {
    slug:"promoter-commission",
    requestedRole:"promoter_commission",
    pipelineKey:"noc_partner_program",
    eyebrow:"TICKET CONVERSION",
    title:"Promoter — 10% Commission",
    short:"For promoters who want to build measurable ticket sales through their network, database, nightlife reach or community.",
    compensation:"10% of eligible settled ticket revenue attributed to your assigned code/link.",
    commitment:"Consistent promotion, code/link usage, weekly activity and final-week intensity.",
    fields:[
      {id:"promotion_experience",label:"Promoter / nightlife experience",type:"textarea",required:true,placeholder:"Tell us what you have promoted, where, and for how long."},
      {id:"audience_size",label:"Reach / database size",type:"text",required:true,placeholder:"IG audience, SMS list, email list, groups, community reach, etc."},
      {id:"ticket_sales_history",label:"Ticket sales history",type:"textarea",required:true,placeholder:"Best examples of events where you drove paid attendance."},
      {id:"activation_plan",label:"How would you move tickets for Tampa?",type:"textarea",required:true,placeholder:"Specific channels, communities, venues, group chats, nightlife, campus or travel strategy."},
      {id:"team_size",label:"Do you have your own promo team?",type:"text",placeholder:"If yes, how many people?"}
    ]
  },
  {
    slug:"promoter-comp",
    requestedRole:"promoter_comp",
    pipelineKey:"noc_partner_program",
    eyebrow:"AWARENESS + GROUP BUILD",
    title:"Promoter — Comp Tickets",
    short:"For connected people who can create real social repetition and bring groups without a cash retainer.",
    compensation:"Comp access is earned after verified campaign deliverables; additional rewards may be performance-based.",
    commitment:"Assigned posts/stories, final-72-hour support, personal code/link and proof submission.",
    fields:[
      {id:"community_reach",label:"Who do you reach?",type:"textarea",required:true,placeholder:"Nightlife crowd, campus, professional network, creators, local community, group chats, etc."},
      {id:"expected_group_size",label:"Expected group size",type:"number",required:true,placeholder:"How many people can you realistically influence to attend?"},
      {id:"activation_plan",label:"How would you activate your audience?",type:"textarea",required:true,placeholder:"Be specific: stories, group chats, nightlife, events, content, campus, travel groups."},
      {id:"preferred_comp_use",label:"How would you use your comp access?",type:"text",placeholder:"Personal attendance, creator guest, content partner, etc."}
    ]
  },
  {
    slug:"ambassador-model",
    requestedRole:"ambassador_model",
    pipelineKey:"noc_partner_program",
    eyebrow:"CONTENT + CULTURE",
    title:"Ambassador / Model",
    short:"For creators and culture-facing personalities who can make the event visible through strong personal content.",
    compensation:"Merch benefit + approved comp access + optional ticket commission; select priority talent may receive a flat campaign fee.",
    commitment:"Approved content, assigned posting cadence, final-week support and proof submission.",
    fields:[
      {id:"content_style",label:"Your content style",type:"textarea",required:true,placeholder:"Fashion, nightlife, lifestyle, comedy, beauty, music, campus, travel, etc."},
      {id:"audience_size",label:"Audience size / average views",type:"text",required:true,placeholder:"Followers plus typical story/Reel/TikTok views."},
      {id:"portfolio_url",label:"Portfolio / media kit / strongest content link",type:"url",required:true,placeholder:"https://"},
      {id:"apparel_size",label:"Apparel size",type:"select",required:true,options:["XS","S","M","L","XL","2XL","3XL","Other"]},
      {id:"camera_ready",label:"Available for scheduled campaign shoots / appearances?",type:"select",required:true,options:["Yes","Sometimes / depends on schedule","Digital promotion only"]}
    ]
  },
  {
    slug:"podcast",
    requestedRole:"podcast_partner",
    pipelineKey:"noc_media_podcast",
    eyebrow:"MEDIA + TRUST",
    title:"Podcast / Media Partner",
    short:"For shows and outlets that can give the event meaningful integration—not just a logo placement.",
    compensation:"Trade/commission or contracted media fee based on audience, integration depth and deliverables.",
    commitment:"Pre-event integration, on-screen graphic where agreed, social cutdowns, show-note link/code and proof.",
    fields:[
      {id:"show_name",label:"Show / outlet name",type:"text",required:true,placeholder:"Podcast, YouTube show, radio show or media outlet."},
      {id:"platforms",label:"Distribution platforms",type:"text",required:true,placeholder:"YouTube, Spotify, Apple, Instagram, TikTok, radio, web, etc."},
      {id:"avg_views_listens",label:"Average views / listens",type:"text",required:true,placeholder:"Typical episode and short-form performance."},
      {id:"media_kit_url",label:"Media kit / show link",type:"url",required:true,placeholder:"https://"},
      {id:"integration_options",label:"What inventory can you provide?",type:"textarea",required:true,placeholder:"Episode mention, 5–10 minute segment, graphic overlay, lower-third, host read, clips, stories, show notes, guest interview, etc."}
    ]
  },
  {
    slug:"dj-promo",
    requestedRole:"dj_promo",
    pipelineKey:"noc_partner_program",
    eyebrow:"NIGHTLIFE INFLUENCE",
    title:"DJ — Promo Only",
    short:"For DJs whose audience and nightlife credibility can move awareness without implying a booked performance.",
    compensation:"Comp/commission or select promo fee depending on campaign value and verified deliverables.",
    commitment:"Promotion only. A separate signed performance addendum is required before any public performance claim.",
    fields:[
      {id:"dj_profile_url",label:"DJ profile / music link",type:"url",required:true,placeholder:"https://"},
      {id:"current_residencies",label:"Current venues / residencies",type:"textarea",required:true,placeholder:"Where do you currently play or have recurring audience access?"},
      {id:"audience_size",label:"Audience / average reach",type:"text",required:true,placeholder:"Followers, story reach, venue reach, database, etc."},
      {id:"promo_plan",label:"How would you promote the concert?",type:"textarea",required:true,placeholder:"Social, venue mic mentions where permitted, crowd/network, content, group chats, etc."}
    ]
  },
  {
    slug:"host-promo",
    requestedRole:"host_promo",
    pipelineKey:"noc_partner_program",
    eyebrow:"PERSONALITY + REACH",
    title:"Host — Promo Only",
    short:"For hosts and personalities who can amplify the show through their audience without implying an on-stage booking.",
    compensation:"Comp/commission or select promo fee based on reach and verified deliverables.",
    commitment:"Promotion only. A separate signed stage/performance addendum is required before any hosting claim.",
    fields:[
      {id:"host_reel_url",label:"Host reel / strongest content link",type:"url",required:true,placeholder:"https://"},
      {id:"current_platforms",label:"Where do you currently host / appear?",type:"textarea",required:true,placeholder:"Clubs, radio, podcasts, shows, nightlife, events, social platforms."},
      {id:"audience_size",label:"Audience / average reach",type:"text",required:true,placeholder:"Followers, story views, event reach, database, etc."},
      {id:"promo_plan",label:"How would you promote the concert?",type:"textarea",required:true,placeholder:"Specific content and community plan."}
    ]
  },
  {
    slug:"dj-performance",
    requestedRole:"dj_performance",
    pipelineKey:"noc_performance_talent",
    eyebrow:"EVENT-DAY TALENT",
    title:"DJ — Performance Set",
    short:"For DJs being considered for an actual event-day set plus defined promotional obligations.",
    compensation:"Negotiated performance fee plus any separately approved promotional or ticket-sales compensation.",
    commitment:"Performance addendum, production compliance, call time, set delivery and campaign promotion.",
    fields:[
      {id:"dj_profile_url",label:"DJ profile / booking page",type:"url",required:true,placeholder:"https://"},
      {id:"live_set_url",label:"Live-set video / mix",type:"url",required:true,placeholder:"https://"},
      {id:"music_style",label:"Music style / programming lane",type:"text",required:true,placeholder:"Hip-hop, open format, R&B, house, etc."},
      {id:"technical_requirements",label:"Technical requirements",type:"textarea",required:true,placeholder:"Preferred equipment, inputs, microphone, special production needs."},
      {id:"fee_expectation",label:"Performance fee expectation",type:"text",required:true,placeholder:"Your normal or requested range."},
      {id:"travel_ready",label:"Can you be in Tampa on October 31?",type:"select",required:true,options:["Yes — local / confirmed availability","Yes — travel required","Need to confirm availability"]}
    ]
  },
  {
    slug:"host-performance",
    requestedRole:"host_performance",
    pipelineKey:"noc_performance_talent",
    eyebrow:"STAGE + AUDIENCE",
    title:"Host — Stage / Performance",
    short:"For hosts being considered for actual on-stage duties, crowd engagement and approved sponsor/event reads.",
    compensation:"Negotiated performance fee plus any separately approved promotional compensation.",
    commitment:"Stage addendum, production briefing, call time, sponsor/event copy accuracy and campaign promotion.",
    fields:[
      {id:"host_reel_url",label:"Host reel / live-event footage",type:"url",required:true,placeholder:"https://"},
      {id:"live_event_experience",label:"Live-event hosting experience",type:"textarea",required:true,placeholder:"Concerts, festivals, arenas, nightlife, radio, corporate events, etc."},
      {id:"sponsor_read_experience",label:"Sponsor / scripted-read experience",type:"textarea",required:true,placeholder:"Tell us about brand reads, timing, cueing or stage-direction experience."},
      {id:"fee_expectation",label:"Performance fee expectation",type:"text",required:true,placeholder:"Your normal or requested range."},
      {id:"travel_ready",label:"Can you be in Tampa on October 31?",type:"select",required:true,options:["Yes — local / confirmed availability","Yes — travel required","Need to confirm availability"]}
    ]
  },
  {
    slug:"street-team",
    requestedRole:"street_team",
    pipelineKey:"noc_street_team",
    eyebrow:"FIELD EXECUTION",
    title:"Street Team — Paid",
    short:"For dependable field personnel who can execute approved routes, shifts, distribution and proof-of-work.",
    compensation:"Paid verified shifts based on the assigned rate/schedule and supervisor approval.",
    commitment:"On-time shifts, approved zones/materials, lawful placement, QR tracking and photo/count proof.",
    fields:[
      {id:"field_experience",label:"Street / field promo experience",type:"textarea",required:true,placeholder:"Flyering, posters, campuses, nightlife, retail, experiential or brand-team work."},
      {id:"shift_availability",label:"Availability",type:"textarea",required:true,placeholder:"Days, evenings, weekends and final-week availability."},
      {id:"transportation",label:"Reliable transportation?",type:"select",required:true,options:["Yes","No","Sometimes / shared transportation"]},
      {id:"preferred_areas",label:"Areas you know best",type:"text",required:true,placeholder:"Neighborhoods, campuses, nightlife districts, retail corridors."},
      {id:"supervisor_experience",label:"Can you supervise a small field crew?",type:"select",required:true,options:["Yes — experienced","Possibly","No — team member only"]}
    ]
  }
];

export const PARTNER_ROLE_MAP = Object.fromEntries(PARTNER_ROLES.map(role => [role.slug, role])) as Record<string, PartnerRole>;
export const PARTNER_REQUESTED_ROLE_MAP = Object.fromEntries(PARTNER_ROLES.map(role => [role.requestedRole, role])) as Record<string, PartnerRole>;

export const FUTURE_PIPELINE = [
  {title:"Nightmare on Channelside",detail:"Tampa is the first assignment. Atlanta is being targeted for December 2026, subject to final confirmation.",status:"TOUR EXPANSION"},
  {title:"Summer Walker — Soul Symphony",detail:"A multi-city symphonic live concept in the ICONIC LIVE development pipeline.",status:"PLANNED TOUR"},
  {title:"DJ Snake — Pardon My French",detail:"A multi-city touring concept in development.",status:"PLANNED TOUR"},
  {title:"More ICONIC LIVE properties",detail:"Additional concerts, comedy, 21+/30+ series, cultural events, nightlife and brand activations will continue to enter the pipeline.",status:"ONGOING"}
] as const;

export function getPartnerRole(slug:string){ return PARTNER_ROLE_MAP[slug] || null; }
