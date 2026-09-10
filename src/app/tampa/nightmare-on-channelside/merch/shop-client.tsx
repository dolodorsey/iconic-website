"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CatalogOption, CatalogVariant } from "./catalog";
import styles from "./merch.module.css";
import upgrade from "./merch-upgrade.module.css";
import final from "./merch-final.module.css";

const CART_EVENT = "iconic-noc-cart-change";
const CART_API = "/api/shopify/noc/cart";
const CART_PATH = "/tampa/nightmare-on-channelside/merch/cart";

type CartItem = {
  variantId: string;
  quantity: number;
  productTitle: string;
  productHandle: string;
  collectionSlug: string;
  variantTitle: string;
  image: string | null;
  unitPriceCents: number;
  lineTotalCents: number;
  available: boolean;
};

type CartPayload = {
  source: "shopify" | "unavailable";
  items: CartItem[];
  totalQuantity: number;
  subtotalCents: number;
  checkoutUrl: string | null;
  error?: string;
};

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function track(action: string, label = "") {
  if (typeof window === "undefined") return;
  void fetch("/api/event-track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventKey: "noc_merch", action, label, path: window.location.pathname }),
    keepalive: true,
  }).catch(() => undefined);
}

async function requestCart(method = "GET", body?: Record<string, unknown>) {
  const response = await fetch(CART_API, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const payload = await response.json() as CartPayload;
  if (!response.ok) throw new Error(payload.error || "Cart request failed");
  return payload;
}

export function BagIndicator() {
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const cart = await requestCart();
      setCount(cart.totalQuantity);
    } catch {
      setCount(0);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onChange = () => void refresh();
    window.addEventListener(CART_EVENT, onChange);
    return () => window.removeEventListener(CART_EVENT, onChange);
  }, [refresh]);

  return <Link href={CART_PATH} className={styles.bag} onClick={() => track("open_cart", "header")}>CART ({String(count).padStart(2, "0")})</Link>;
}

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const safeImages = images.filter(Boolean);

  if (!safeImages.length) {
    return (
      <div className={`${styles.detailFrame} ${upgrade.detailFrame} ${final.galleryFallback}`}>
        <div className={styles.detailTee}><span>NIGHTMARE</span><b>ON CHANNELSIDE</b><em>NOC</em></div>
        <div className={styles.artworkNotice}>PRODUCT IMAGE UNAVAILABLE</div>
      </div>
    );
  }

  return (
    <div className={final.galleryShell}>
      <div className={final.galleryViewport} style={{ background: "#080303" }}>
        <img
          src={safeImages[Math.min(active, safeImages.length - 1)]}
          alt={`${title} view ${active + 1}`}
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      </div>
      {safeImages.length > 1 && (
        <div className={final.galleryTabs} role="tablist" aria-label="Product views">
          {safeImages.slice(0, 6).map((image, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              key={`${image}-${index}`}
              onClick={() => { setActive(index); track("gallery_view", String(index + 1)); }}
              className={active === index ? final.galleryTabActive : ""}
            >
              VIEW {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function AddToBag({
  variants,
  options,
  productTitle = "NOC PRODUCT",
}: {
  variants: CatalogVariant[];
  options: CatalogOption[];
  productTitle?: string;
}) {
  const firstAvailable = variants.find((variant) => variant.available) || variants[0];
  const [selection, setSelection] = useState<Record<string, string>>(() => firstAvailable?.selected_options || {});
  const [state, setState] = useState<"idle" | "adding" | "added" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => { track("view_item", productTitle); }, [productTitle]);

  const selectedVariant = useMemo(() => {
    return variants.find((variant) => options.every((option) => variant.selected_options[option.name] === selection[option.name])) || firstAvailable;
  }, [variants, options, selection, firstAvailable]);

  async function add() {
    if (!selectedVariant || !selectedVariant.available) return;
    setState("adding");
    setMessage("");
    try {
      await requestCart("POST", { variantId: selectedVariant.id, quantity: 1 });
      setState("added");
      track("add_to_cart", selectedVariant.id);
      window.dispatchEvent(new Event(CART_EVENT));
      window.setTimeout(() => setState("idle"), 1500);
    } catch (error) {
      setState("error");
      track("cart_error", "add");
      setMessage(error instanceof Error ? error.message : "Unable to add this item.");
    }
  }

  return (
    <div className={styles.buyBlock}>
      {options.map((option) => (
        <div key={option.name} style={{ marginBottom: 14 }}>
          <label className={styles.sizeLabel} htmlFor={`noc-option-${option.name}`}>SELECT {option.name.toUpperCase()}</label>
          <select
            id={`noc-option-${option.name}`}
            value={selection[option.name] || option.values[0] || ""}
            onChange={(event) => setSelection((current) => ({ ...current, [option.name]: event.target.value }))}
            style={{ width: "100%", minHeight: 48, background: "#090606", color: "#fff", border: "1px solid rgba(255,255,255,.18)", borderRadius: 8, padding: "0 14px", fontWeight: 800 }}
          >
            {option.values.map((value) => <option value={value} key={value}>{value}</option>)}
          </select>
        </div>
      ))}
      {selectedVariant && (
        <div style={{ margin: "2px 0 16px", fontWeight: 900, letterSpacing: ".08em" }}>
          {formatMoney(selectedVariant.price_cents)} {selectedVariant.available ? "" : "· SOLD OUT"}
        </div>
      )}
      <button type="button" className={styles.addButton} onClick={add} disabled={!selectedVariant?.available || state === "adding"} aria-live="polite">
        {state === "adding" ? "ADDING…" : state === "added" ? "ADDED TO CART" : "ADD TO CART"}
      </button>
      {state === "error" && <p role="alert" style={{ color: "#ff5a50", fontSize: 12 }}>{message}</p>}
      <Link href={CART_PATH} onClick={() => track("open_cart", "product")} style={{ display: "inline-block", marginTop: 14, color: "rgba(255,255,255,.72)", fontSize: 11, fontWeight: 900, letterSpacing: ".12em", textDecoration: "none" }}>VIEW CART →</Link>
    </div>
  );
}

export function CartView() {
  const [cart, setCart] = useState<CartPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const refresh = useCallback(async () => {
    try {
      setMessage("");
      const next = await requestCart();
      setCart(next);
      track("view_cart", String(next.totalQuantity));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  async function update(variantId: string, quantity: number) {
    try {
      setCart(await requestCart("PATCH", { variantId, quantity }));
      track("update_cart", `${variantId}-${quantity}`);
      window.dispatchEvent(new Event(CART_EVENT));
    } catch (error) {
      track("cart_error", "update");
      setMessage(error instanceof Error ? error.message : "Unable to update cart.");
    }
  }

  async function remove(variantId: string) {
    try {
      setCart(await requestCart("DELETE", { variantId }));
      track("remove_from_cart", variantId);
      window.dispatchEvent(new Event(CART_EVENT));
    } catch (error) {
      track("cart_error", "remove");
      setMessage(error instanceof Error ? error.message : "Unable to remove item.");
    }
  }

  if (loading) return <div style={{ padding: "80px 0", color: "rgba(255,255,255,.6)" }}>LOADING SHOPIFY CART…</div>;
  if (message && !cart) return <div role="alert" style={{ padding: "80px 0", color: "#ff5a50" }}>{message}</div>;

  const items = cart?.items || [];
  return (
    <div>
      {message && <p role="alert" style={{ color: "#ff5a50" }}>{message}</p>}
      {!items.length ? (
        <div style={{ padding: "60px 0 90px" }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: 44, margin: "0 0 18px" }}>YOUR CART IS EMPTY.</h2>
          <Link href="/tampa/nightmare-on-channelside/merch/shop" style={{ color: "#ff3b30", fontWeight: 900 }}>SHOP NOC MERCH →</Link>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gap: 12 }}>
            {items.map((item) => (
              <article className="noc-cart-item" key={item.variantId} style={{ display: "grid", gridTemplateColumns: "110px minmax(0,1fr) auto", gap: 18, alignItems: "center", padding: 16, border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, background: "rgba(255,255,255,.025)" }}>
                {item.image ? <img src={item.image} alt={item.productTitle} loading="lazy" decoding="async" style={{ width: 110, height: 110, objectFit: "contain", background: "#080303", borderRadius: 10 }} /> : <div />}
                <div>
                  <strong style={{ display: "block", fontSize: 16 }}>{item.productTitle}</strong>
                  <span style={{ display: "block", marginTop: 6, color: "rgba(255,255,255,.55)", fontSize: 12 }}>{item.variantTitle}</span>
                  <span style={{ display: "block", marginTop: 10, fontWeight: 900 }}>{formatMoney(item.unitPriceCents)}</span>
                </div>
                <div className="noc-cart-actions" style={{ display: "grid", justifyItems: "end", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button type="button" aria-label={`Decrease ${item.productTitle} quantity`} onClick={() => void update(item.variantId, Math.max(0, item.quantity - 1))} style={{ width: 34, height: 34 }}>−</button>
                    <b aria-label={`Quantity ${item.quantity}`}>{item.quantity}</b>
                    <button type="button" aria-label={`Increase ${item.productTitle} quantity`} onClick={() => void update(item.variantId, Math.min(10, item.quantity + 1))} style={{ width: 34, height: 34 }}>+</button>
                  </div>
                  <b>{formatMoney(item.lineTotalCents)}</b>
                  <button type="button" onClick={() => void remove(item.variantId)} style={{ background: "transparent", border: 0, color: "rgba(255,255,255,.48)", textDecoration: "underline", cursor: "pointer" }}>REMOVE</button>
                </div>
              </article>
            ))}
          </div>
          <div className="noc-cart-summary" style={{ marginTop: 28, padding: 24, borderTop: "1px solid rgba(255,255,255,.16)", display: "grid", gap: 14, justifyItems: "end" }}>
            <span style={{ color: "rgba(255,255,255,.55)", fontSize: 11, fontWeight: 900, letterSpacing: ".13em" }}>SUBTOTAL</span>
            <strong style={{ fontFamily: "Georgia,serif", fontSize: 38 }}>{formatMoney(cart?.subtotalCents || 0)}</strong>
            <span style={{ maxWidth: 420, textAlign: "right", color: "rgba(255,255,255,.55)", fontSize: 12, lineHeight: 1.6 }}>Shipping and taxes are calculated by Shopify at secure checkout.</span>
            {cart?.checkoutUrl && <a href={cart.checkoutUrl} onClick={() => track("begin_checkout", String(cart.totalQuantity))} style={{ minHeight: 54, display: "inline-flex", alignItems: "center", padding: "0 26px", borderRadius: 999, background: "#ff3b30", color: "#fff", textDecoration: "none", fontSize: 10, fontWeight: 900, letterSpacing: ".14em" }}>SECURE SHOPIFY CHECKOUT →</a>}
          </div>
        </>
      )}
    </div>
  );
}
