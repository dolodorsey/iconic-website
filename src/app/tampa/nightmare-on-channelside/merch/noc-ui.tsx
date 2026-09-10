import Link from "next/link";
import type { CatalogCollection, CatalogProduct } from "./catalog";
import { formatPrice } from "./catalog";
import { worldLanguage } from "./noc-assets";
import { BagIndicator } from "./shop-client";
import premium from "./noc-premium.module.css";

const BASE = "/tampa/nightmare-on-channelside/merch";

export function StoreHeader() {
  return (
    <header className={`${premium.header} noc-mobile-header`}>
      <Link href={BASE} className={`${premium.logo} noc-mobile-logo`}>ICONIC</Link>
      <nav className={`${premium.nav} noc-mobile-nav`} aria-label="Nightmare store navigation">
        <Link href={BASE}>HOME</Link>
        <Link href={`${BASE}/shop`}>SHOP</Link>
        <Link href={`${BASE}/worlds`}>WORLDS</Link>
        <Link href="/tampa/nightmare-on-channelside">EVENT</Link>
      </nav>
      <div className={`${premium.tools} noc-mobile-tools`}><BagIndicator /></div>
    </header>
  );
}

export function StoreFooter() {
  return (
    <footer className={premium.footer}>
      <div className={premium.footerBrand}>
        <strong>ICONIC</strong>
        <p>Live entertainment turned into collectible culture.</p>
      </div>
      <nav aria-label="Nightmare footer navigation">
        <Link href={`${BASE}/shop`}>SHOP</Link>
        <Link href={`${BASE}/worlds`}>WORLDS</Link>
        <Link href="/tampa/nightmare-on-channelside">EVENT</Link>
        <Link href={`${BASE}/cart`}>CART</Link>
        <Link href={`${BASE}/policies`}>POLICIES</Link>
      </nav>
      <span>NIGHTMARE ON CHANNELSIDE · TAMPA, FL · HALLOWEEN 2026</span>
    </footer>
  );
}

function ProductViews({ product }: { product: CatalogProduct }) {
  const front = product.primary_image_url;
  const back = product.secondary_image_url;

  if (!front && !back) return null;

  return (
    <div className={`noc-product-glance ${back ? "noc-product-glance--pair" : "noc-product-glance--single"}`}>
      {front ? (
        <figure>
          <img src={front} alt={`${product.title} front view`} loading="lazy" decoding="async" />
          <figcaption>FRONT</figcaption>
        </figure>
      ) : null}
      {back ? (
        <figure>
          <img src={back} alt={`${product.title} back view`} loading="lazy" decoding="async" />
          <figcaption>BACK</figcaption>
        </figure>
      ) : null}
    </div>
  );
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link href={`${BASE}/collection/${product.collection_slug}/${product.sku}`} className={`${premium.productCard} noc-product-card-v2`}>
      <ProductViews product={product} />
      <div className={`${premium.productMeta} noc-product-meta-v2`}>
        <div><strong>{product.title}</strong><span>{product.product_type}</span></div>
        <b>{formatPrice(product.price_cents)}</b>
      </div>
    </Link>
  );
}

export function WorldCard({ collection, products: _products }: { collection: CatalogCollection; products: CatalogProduct[] }) {
  const identity = worldLanguage(collection.slug, collection.name, collection.subtitle);
  return (
    <Link href={`${BASE}/collection/${collection.slug}`} className="noc-world-card-v3">
      <div className="noc-world-artist-stage">
        <img
          src={identity.image}
          alt={`${collection.name} Nightmare on Channelside collection artwork`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="noc-world-card-copy">
        <span className="noc-world-kicker">OFFICIAL NOC COLLECTION</span>
        <strong className="noc-world-name">{collection.name}</strong>
        <em>SHOP {collection.name} →</em>
      </div>
    </Link>
  );
}

export function StoreSubnav() {
  return (
    <nav className={premium.subnav} aria-label="Nightmare shop sections">
      <Link href={`${BASE}/shop`}>SHOP ALL</Link>
      <Link href={`${BASE}/worlds`}>COLLECTIONS</Link>
      <Link href="/tampa/nightmare-on-channelside">THE EVENT</Link>
    </nav>
  );
}
