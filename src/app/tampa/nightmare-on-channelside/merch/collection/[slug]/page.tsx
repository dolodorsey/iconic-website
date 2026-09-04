import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../merch.module.css";
import { collections, getCollection, getProductSlots } from "../../merch-data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const collection = getCollection(params.slug);
  if (!collection) return {};
  return {
    title: `${collection.name} Halloween Merch — Nightmare on Channelside | ICONIC`,
    description: `${collection.subtitle} Ten official design slots for the Nightmare on Channelside merch collection.`,
  };
}

export default function CollectionPage({ params }: Props) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();
  const products = getProductSlots(collection);
  const vars = { "--accent": collection.accent } as CSSProperties;

  return (
    <main className={styles.shell} style={vars}>
      <div className={styles.noise} />
      <header className={styles.topbar}>
        <div className={styles.brand}>ICONIC / NIGHTMARE ON CHANNELSIDE</div>
        <nav className={styles.nav}>
          <Link href="/tampa/nightmare-on-channelside/merch">Store</Link>
          <span className={styles.bag}>BAG 00</span>
        </nav>
      </header>

      <section className={styles.collectionHero}>
        <Link className={styles.back} href="/tampa/nightmare-on-channelside/merch">← All collections</Link>
        <div className={styles.collectionCode}>COLLECTION {collection.code} / 10 DESIGNS</div>
        <h1 className={styles.collectionTitle}>{collection.name}</h1>
        <div className={styles.collectionIntro}>
          <p>{collection.subtitle} Each tile below is already routed as an individual product slot so finished shirt graphics can replace placeholders without rebuilding the collection.</p>
          <span className={styles.mood}>{collection.mood}</span>
        </div>
      </section>

      <section className={styles.productGrid}>
        {products.map((product) => (
          <Link
            href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}/${product.id}`}
            className={styles.product}
            key={product.id}
          >
            <div className={styles.shirtStage}><div className={styles.shirt} /></div>
            <div className={styles.productMeta}>
              <strong>{product.title}</strong>
              <small>{product.type} / {product.design}</small>
              <div className={styles.status}>{product.status}</div>
            </div>
          </Link>
        ))}
      </section>

      <footer className={styles.footer}>
        <span>{collection.name}</span>
        <span>10 dedicated design slots</span>
        <span>ICONIC / Tampa</span>
      </footer>
    </main>
  );
}
