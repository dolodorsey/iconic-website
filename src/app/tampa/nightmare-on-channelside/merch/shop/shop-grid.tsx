"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CatalogCollection, CatalogProduct } from "../catalog";

const BASE = "/tampa/nightmare-on-channelside/merch";
const PAGE_SIZE = 24;
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

type ShopProduct = Pick<CatalogProduct, "shopify_product_id" | "sku" | "collection_slug" | "title" | "product_type" | "price_cents" | "primary_image_url">;
type ShopCollection = Pick<CatalogCollection, "slug" | "name">;

export default function ShopGrid({ products, collections }: { products: ShopProduct[]; collections: ShopCollection[] }) {
  const [query, setQuery] = useState("");
  const [world, setWorld] = useState("all");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const types = useMemo(() => Array.from(new Set(products.map((product) => product.product_type).filter(Boolean))).sort(), [products]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = products.filter((product) => {
      const matchesQuery = !needle || `${product.title} ${product.product_type}`.toLowerCase().includes(needle);
      const matchesWorld = world === "all" || product.collection_slug === world;
      const matchesType = type === "all" || product.product_type === type;
      return matchesQuery && matchesWorld && matchesType;
    });
    if (sort === "price-low") next.sort((a, b) => a.price_cents - b.price_cents);
    if (sort === "price-high") next.sort((a, b) => b.price_cents - a.price_cents);
    if (sort === "az") next.sort((a, b) => a.title.localeCompare(b.title));
    return next;
  }, [products, query, world, type, sort]);

  useEffect(() => setVisible(PAGE_SIZE), [query, world, type, sort]);
  const shown = filtered.slice(0, visible);

  return (
    <>
      <div className="noc-shop-controls" aria-label="Filter Nightmare on Channelside merchandise">
        <input className="noc-shop-control noc-shop-search" type="search" placeholder="SEARCH THE DROP" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search merchandise" />
        <select className="noc-shop-control" value={world} onChange={(event) => setWorld(event.target.value)} aria-label="Filter by world">
          <option value="all">ALL WORLDS</option>
          {collections.map((collection) => <option value={collection.slug} key={collection.slug}>{collection.name}</option>)}
        </select>
        <select className="noc-shop-control" value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter by garment type">
          <option value="all">ALL GARMENTS</option>
          {types.map((productType) => <option value={productType} key={productType}>{productType}</option>)}
        </select>
        <select className="noc-shop-control" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort merchandise">
          <option value="featured">FEATURED ORDER</option>
          <option value="price-low">PRICE LOW → HIGH</option>
          <option value="price-high">PRICE HIGH → LOW</option>
          <option value="az">A → Z</option>
        </select>
      </div>

      <div className="noc-shop-results" aria-live="polite">
        <span>{filtered.length} PIECES FOUND</span>
        <span>SHOWING {Math.min(shown.length, filtered.length)} / {filtered.length}</span>
      </div>

      {shown.length ? (
        <div className="noc-shop-grid">
          {shown.map((product) => (
            <Link href={`${BASE}/collection/${product.collection_slug}/${product.sku}`} className="noc-shop-product-card" key={product.shopify_product_id}>
              <div className="noc-shop-product-stage">
                {product.primary_image_url ? <img src={product.primary_image_url} alt={product.title} loading="lazy" decoding="async" /> : null}
              </div>
              <div className="noc-shop-product-meta">
                <div><strong>{product.title}</strong><span>{product.product_type}</span></div>
                <b>{money.format(product.price_cents / 100)}</b>
              </div>
            </Link>
          ))}
        </div>
      ) : <div className="noc-shop-empty">NO PIECES MATCH THAT SEARCH. TRY ANOTHER WORLD OR GARMENT.</div>}

      {visible < filtered.length ? (
        <div className="noc-shop-load-more"><button type="button" onClick={() => setVisible((count) => count + PAGE_SIZE)}>LOAD MORE — {filtered.length - visible} REMAINING</button></div>
      ) : null}
    </>
  );
}
