import Link from "next/link";
import type { CatalogCollection, CatalogProduct } from "./catalog";
import { formatPrice } from "./catalog";
import { BagIndicator } from "./shop-client";
import { worldLanguage } from "./noc-assets";
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
        <Link href={`${BASE}/archive`}>ARCHIVE</Link>
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
        <Link href={`${BASE}/archive`}>ARCHIVE</Link>
        <Link href="/tampa/nightmare-on-channelside">EVENT</Link>
        <Link href={`${BASE}/cart`}>CART</Link>
      </nav>
      <span>NIGHTMARE ON CHANNELSIDE · TAMPA, FL · HALLOWEEN 2026</span>
    </footer>
  );
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link href={`${BASE}/collection/${product.collection_slug}/${product.sku}`} className={premium.productCard}>
      <div className={premium.productStage}>
        {product.primary_image_url ? <img src={product.primary_image_url} alt={product.title} loading="lazy" decoding="async" /> : null}
      </div>
      <div className={premium.productMeta}>
        <div><strong>{product.title}</strong><span>{product.product_type}</span></div>
        <b>{formatPrice(product.price_cents)}</b>
      </div>
    </Link>
  );
}

export function WorldCard({ collection }: { collection: CatalogCollection }) {
  const world = worldLanguage(collection.slug, collection.mood, collection.subtitle);
  return (
    <Link href={`${BASE}/collection/${collection.slug}`} className={premium.worldCard}>
      <img src={world.image} alt={`${collection.name} Nightmare on Channelside collection`} loading="lazy" decoding="async" />
      <span className={premium.worldArtist}>{collection.name}</span>
      <div className={premium.worldCopy}>
        <strong>{world.title}</strong>
        <span>{world.line}</span>
        <p>{world.story}</p>
        <em>ENTER WORLD →</em>
      </div>
    </Link>
  );
}

export function StoreSubnav() {
  return (
    <nav className={premium.subnav} aria-label="Nightmare shop sections">
      <Link href={`${BASE}/shop`}>THE DROP</Link>
      <Link href={`${BASE}/worlds`}>ARTIST WORLDS</Link>
      <Link href={`${BASE}/archive`}>NIGHTMARE ARCHIVE</Link>
      <Link href="/tampa/nightmare-on-channelside">THE EVENT</Link>
    </nav>
  );
}
