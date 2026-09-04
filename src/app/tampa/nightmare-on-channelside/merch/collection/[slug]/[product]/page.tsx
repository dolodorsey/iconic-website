import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../merch.module.css";
import { collections, getCollection, getProductSlots } from "../../../merch-data";

type Props = { params: { slug: string; product: string } };

export function generateStaticParams() {
  return collections.flatMap((collection) =>
    getProductSlots(collection).map((product) => ({ slug: collection.slug, product: product.id }))
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const collection = getCollection(params.slug);
  const product = collection ? getProductSlots(collection).find((item) => item.id === params.product) : undefined;
  if (!collection || !product) return {};
  return { title: `${product.title} — Nightmare on Channelside | ICONIC` };
}

export default function ProductPage({ params }: Props) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();
  const product = getProductSlots(collection).find((item) => item.id === params.product);
  if (!product) notFound();
  const vars = { "--accent": collection.accent } as CSSProperties;

  return (
    <main className={styles.shell} style={vars}>
      <div className={styles.noise} />
      <section className={styles.detail}>
        <div className={styles.detailStage}>
          <div className={styles.detailShirt} />
        </div>
        <div className={styles.detailCopy}>
          <Link className={styles.back} href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>← {collection.name}</Link>
          <span className={styles.tag}>{product.type} / {product.design}</span>
          <h1>{product.title}</h1>
          <p>This product page is live as a production-ready shell. The final merch artwork, product photography, pricing, inventory and checkout connection can be inserted here as each shirt is completed.</p>
          <div className={styles.sizes}><span>S</span><span>M</span><span>L</span><span>XL</span><span>2XL</span><span>3XL</span></div>
          <div className={styles.disabledButton}>Artwork in production</div>
          <p className={styles.routeNote}>Permanent SKU route: {product.id}</p>
        </div>
      </section>
    </main>
  );
}
