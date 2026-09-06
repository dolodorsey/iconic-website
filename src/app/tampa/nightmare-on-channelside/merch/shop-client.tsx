"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import styles from "./merch.module.css";
import upgrade from "./merch-upgrade.module.css";

const BAG_KEY = "iconic-nightmare-bag";
const BAG_EVENT = "iconic-nightmare-bag-change";

type BagItem = {
  sku: string;
  title: string;
  size: string;
  qty: number;
  priceCents: number;
};

type GalleryArtwork = {
  url: string;
  position: string;
  label: string;
} | null;

function readBag(): BagItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(BAG_KEY) || "[]") as BagItem[];
  } catch {
    return [];
  }
}

export function BagIndicator() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => setCount(readBag().reduce((sum, item) => sum + item.qty, 0));
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(BAG_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(BAG_EVENT, refresh);
    };
  }, []);

  return <span className={styles.bag}>CART ({String(count).padStart(2, "0")})</span>;
}

export function ProductGallery({
  artwork,
  collectionName,
  designNumber,
}: {
  artwork: GalleryArtwork;
  collectionName: string;
  designNumber: number;
}) {
  const [view, setView] = useState<"front" | "detail" | "back">("front");
  const number = String(designNumber).padStart(2, "0");
  const artVars = artwork ? {
    "--merch-art": `url("${artwork.url}")`,
    "--merch-pos": artwork.position,
  } as CSSProperties : undefined;

  if (!artwork) {
    return (
      <div className={`${styles.detailFrame} ${upgrade.detailFrame} ${upgrade.galleryFallback}`}>
        <span className={styles.detailNumber}>{number}</span>
        <div className={styles.detailTee}><span>{collectionName}</span><b>NIGHTMARE<br/>ON CHANNELSIDE</b><em>{number}</em></div>
        <div className={styles.artworkNotice}>COMING SOON · FINAL ART IN PRODUCTION</div>
      </div>
    );
  }

  return (
    <div className={upgrade.galleryShell}>
      <div className={upgrade.galleryViewport} style={artVars} aria-label={artwork.label}>
        {view === "front" && <div className={`${upgrade.finishedArtwork} ${upgrade.galleryFront}`} />}
        {view === "detail" && <div className={`${upgrade.finishedArtwork} ${upgrade.galleryDetail}`} />}
        {view === "back" && (
          <div className={upgrade.backMockup}>
            <span>NIGHTMARE</span><b>ON CHANNELSIDE</b><em>{collectionName}</em><small>BACK GARMENT PREVIEW</small>
          </div>
        )}
        <span className={upgrade.galleryNumber}>{number}</span>
      </div>
      <div className={upgrade.galleryTabs} role="tablist" aria-label="Product views">
        <button type="button" onClick={() => setView("front")} className={view === "front" ? upgrade.galleryTabActive : ""}>FRONT</button>
        <button type="button" onClick={() => setView("detail")} className={view === "detail" ? upgrade.galleryTabActive : ""}>DETAIL</button>
        <button type="button" onClick={() => setView("back")} className={view === "back" ? upgrade.galleryTabActive : ""}>BACK</button>
      </div>
    </div>
  );
}

export function AddToBag({
  sku,
  title,
  priceCents,
  sizes,
}: {
  sku: string;
  title: string;
  priceCents: number;
  sizes: string[];
}) {
  const [size, setSize] = useState(sizes.includes("L") ? "L" : sizes[0]);
  const [added, setAdded] = useState(false);

  function add() {
    const bag = readBag();
    const existing = bag.find((item) => item.sku === sku && item.size === size);
    if (existing) existing.qty += 1;
    else bag.push({ sku, title, size, qty: 1, priceCents });
    window.localStorage.setItem(BAG_KEY, JSON.stringify(bag));
    window.dispatchEvent(new Event(BAG_EVENT));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className={styles.buyBlock}>
      <div className={styles.sizeLabel}>SELECT SIZE</div>
      <div className={styles.sizes}>
        {sizes.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setSize(item)}
            className={item === size ? styles.sizeActive : ""}
            aria-pressed={item === size}
          >
            {item}
          </button>
        ))}
      </div>
      <button type="button" className={styles.addButton} onClick={add}>
        {added ? "ADDED TO CART" : "ADD TO CART"}
      </button>
    </div>
  );
}
