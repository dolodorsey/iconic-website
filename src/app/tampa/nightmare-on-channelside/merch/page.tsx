import type { Metadata } from "next";
import Link from "next/link";
import styles from "./merch.module.css";
import { collections } from "./merch-data";

export const metadata: Metadata = {
  title: "Nightmare on Channelside — Official Merch | ICONIC",
  description: "Official Nightmare on Channelside Halloween concert merchandise from ICONIC, organized by artist, Tampa, event and culture collections.",
};

const marquee = [...collections, ...collections];

export default function NightmareMerchPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.noise} />

      <header className={styles.topbar}>
        <div className={styles.brand}>ICONIC / NIGHTMARE ON CHANNELSIDE</div>
        <nav className={styles.nav}>
          <Link href="/tampa">Tampa</Link>
          <a href="#collections">Collections</a>
          <span className={styles.bag}>BAG 00</span>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>Official concert merchandise / Tampa / Halloween</div>
          <h1 className={styles.title}>Wear The <span>Nightmare.</span></h1>
          <p className={styles.lede}>Fourteen separate collections. Ten graphic drops per collection. Built like an archive, not a souvenir stand.</p>
          <div className={styles.ctaRow}>
            <a className={styles.cta} href="#collections">Enter the collections</a>
            <Link className={styles.ctaGhost} href="/tampa">Back to ICONIC Tampa</Link>
          </div>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.portal} />
          <div className={styles.crosshair} />
          <div className={styles.stamp}>Tampa / Limited / 2026</div>
        </div>
      </section>

      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {marquee.map((collection, index) => <span key={`${collection.slug}-${index}`}>{collection.name}</span>)}
        </div>
      </div>

      <section className={styles.section} id="collections">
        <div className={styles.sectionHead}>
          <h2>Choose your nightmare.</h2>
          <p>Every artist and theme lives in its own world. No blended graphics. No generic event merch. Each collection has ten dedicated shirt concepts ready for artwork.</p>
        </div>
        <div className={styles.grid}>
          {collections.map((collection) => (
            <Link
              href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}
              key={collection.slug}
              className={styles.card}
              style={{ "--accent": collection.accent } as React.CSSProperties}
            >
              <span className={styles.cardNumber}>COLLECTION / {collection.code}</span>
              <span className={styles.cardMood}>{collection.mood}</span>
              <div className={styles.cardVisual} />
              <strong className={styles.cardTitle}>{collection.name}</strong>
              <span className={styles.cardSub}>{collection.subtitle}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.statement}>
        <p>This is not merch. This is the <em>evidence.</em></p>
      </section>

      <footer className={styles.footer}>
        <span>ICONIC / NIGHTMARE ON CHANNELSIDE</span>
        <span>14 collections / 140 design slots</span>
        <span>Tampa, Florida</span>
      </footer>
    </main>
  );
}
