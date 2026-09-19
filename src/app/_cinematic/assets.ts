import { NOC_MEDIA } from '../tampa/nightmare-on-channelside/merch/noc-assets';

// ICONIC platform campaign art only. Never substitute these for a named tour,
// product photograph, confirmed sponsor activation or documentary event proof.
// ANIMATION ASSIGNMENT v2.1: ART.hero is exclusively derived from
// ICONIC HOMESCREEN ANI(1).mp4. ART.crowd is exclusively derived from
// ICONIC CONCERT ANI(1).mp4 and is used away from the homepage hero.
export const ART = {
  hero: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-homescreen-animation-v2.webp?v=1789373241',
  homePoster: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-homescreen-poster-v2.webp?v=1789373331',
  crowd: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-concert-animation-v2.webp?v=1789373250',
  world: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-v2-world-stage.webp?v=1789368753',
  backstage: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-v2-backstage.webp?v=1789368706',
  runway: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-v2-runway.webp?v=1789368776',
  dj: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-v2-dj-stage.webp?v=1789368795',
  artist: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-v2-artist-moment.webp?v=1789368818',
  symphonic: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-v2-symphonic-stage.webp?v=1789368849',
  crown: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-v2-crown-stage.webp?v=1789368875',
  reveal: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-v2-reveal-stage.webp?v=1789368898',
  hospitality: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-vip-hospitality.png?v=1789179973',
  media: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-platform-aftermovie-archive.png?v=1789179965',
  greekBall: 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-greek-ball-original-web.webp?v=1789370777',
} as const;
export const SUMMER_VISUAL = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-soul-symphony-verified-2026-09-15.webp?v=1789461635';
export const PMF_VISUAL = 'https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-pardon-my-french-verified-2026-09-15.webp?v=1789461645';
export const WORLDS = [
  { key: 'tampa-halloween', title: 'Nightmare on Channelside', eyebrow: 'Tampa / Halloween 2026', body: 'The music. The costumes. The whole night.', href: '/tampa-halloween', src: NOC_MEDIA.headliners, action: 'Explore Tampa', tone: 'red' },
  { key: 'summer-walker-soul-symphony', title: 'Soul Symphony', eyebrow: 'Summer Walker / Tour updates', body: 'Modern R&B. An orchestral point of view.', href: '/summer-walker', src: SUMMER_VISUAL, action: 'Explore the tour', tone: 'blush' },
  { key: 'dj-snake-pardon-my-french', title: 'Pardon My French', eyebrow: 'DJ Snake & Friends / Tour updates', body: 'Global sound. A stadium-sized ambition.', href: '/dj-snake-pardon-my-french', src: PMF_VISUAL, action: 'Explore the tour', tone: 'red' },
] as const;
export const ICONIC_MASTER_CHANNELS = [
  { key: 'live', title: 'Live', eyebrow: 'Concerts + tours', body: 'Headline shows, touring concepts and nights built for the room.', href: '/events', src: ART.world },
  { key: 'experiences', title: 'Experiences', eyebrow: 'Hospitality + culture', body: 'Arrival, atmosphere, guest flow and the moments around the stage.', href: '/experiences', src: ART.runway },
  { key: 'music', title: 'Music', eyebrow: 'Sound + performance', body: 'Artist development, programming and performance built around the audience.', href: '/music', src: ART.dj },
  { key: 'creators', title: 'Creators', eyebrow: 'People + ideas', body: 'Performers, filmmakers, photographers, hosts, producers and designers.', href: '/creators', src: ART.artist },
  { key: 'media', title: 'Media', eyebrow: 'Story + archive', body: 'Campaign creative, documentation and the visual memory of the experience.', href: '/media', src: ART.media },
] as const;
export const MERCH_ROOT = '/tampa/nightmare-on-channelside/merch';
