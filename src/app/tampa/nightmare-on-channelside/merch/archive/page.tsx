import type { Metadata } from "next";
import { NOC_MEDIA, NOC_SCENES } from "../noc-assets";
import { StoreFooter, StoreHeader, StoreSubnav } from "../noc-ui";
import premium from "../noc-premium.module.css";

export const metadata: Metadata = {
  title: "Nightmare Archive — Channelside Tampa",
  description: "The visual world behind Nightmare on Channelside — Tampa, the arena, the artists and the merch culture.",
};

const labels = [
  ["THE GRAND HALL", "REAL ARTISTS. REAL NIGHTMARES."],
  ["NIGHTMARE ARCHIVE", "MUSIC LIVES FOREVER."],
  ["HALL OF HEADLINERS", "A DIFFERENT KIND OF NIGHTMARE."],
  ["THE MERCH MARKET", "THE CONCERT SPILLS INTO THE CITY."],
  ["THE GATES", "ONE NIGHT. ONE ARENA. NO ESCAPE."],
];

export default function NightmareArchivePage() {
  return (
    <main className={premium.shell}>
      <StoreHeader />
      <section className={premium.collectionHero}>
        <img src={NOC_MEDIA.archiveFacade} alt="Nightmare Archive Tampa" />
        <div className={premium.collectionHeroCopy}>
          <span>THE VISUAL WORLD</span>
          <h1>NIGHTMARE ARCHIVE.</h1>
          <p>The campaign is bigger than a product grid. This is the museum, the city, the arena and the culture surrounding the night.</p>
        </div>
      </section>
      <StoreSubnav />
      <div className={premium.container}>
        <section className={premium.intro}>
          <span className={premium.eyebrow}>TAMPA · HALLOWEEN 2026</span>
          <h2 className={premium.display}>THE NIGHT HAS LORE.</h2>
          <p className={premium.body}>Built like an exhibition instead of filler imagery. Every scene lives here on a permanent CDN asset so the archive cannot collapse into blank boxes.</p>
        </section>
        <section className={premium.archiveGrid} aria-label="Nightmare on Channelside campaign archive">
          {NOC_SCENES.map((scene, index) => (
            <figure className={premium.archiveFrame} key={scene}>
              <img src={scene} alt={`Nightmare on Channelside campaign archive scene ${index + 1}`} />
              <figcaption className={premium.archiveLabel}><span>{labels[index][0]}</span><strong>{labels[index][1]}</strong></figcaption>
            </figure>
          ))}
        </section>
      </div>
      <StoreFooter />
    </main>
  );
}
