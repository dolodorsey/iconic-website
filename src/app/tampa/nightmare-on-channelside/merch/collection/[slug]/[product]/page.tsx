import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site-url";
import styles from "../../../merch.module.css";
import upgrade from "../../../merch-upgrade.module.css";
import final from "../../../merch-final.module.css";
import premium from "../../../noc-premium.module.css";
import { formatPrice, getMerchCatalog } from "../../../catalog";
import { AddToBag } from "../../../shop-client";
import { ProductCard, StoreFooter, StoreHeader } from "../../../noc-ui";

type RouteParams = { slug: string; product: string };
type Props = { params: Promise<RouteParams> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, product: productId } = await params;
  const catalog = await getMerchCatalog();
  const product = catalog.products.find((item) => item.sku === productId && item.collection_slug === slug);
  if (!product) return {};
  const path = `/tampa/nightmare-on-channelside/merch/collection/${slug}/${productId}`;
  const description = product.description || `Official Nightmare on Channelside ${product.product_type}.`;
  return {
    title: `${product.title} — Nightmare on Channelside`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "ICONIC",
      title: product.title,
      description,
      url: path,
      images: product.primary_image_url ? [{ url: product.primary_image_url, alt: product.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: product.primary_image_url ? [product.primary_image_url] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, product: productId } = await params;
  const catalog = await getMerchCatalog();
  const collection = catalog.collections.find((item) => item.slug === slug);
  const product = catalog.products.find((item) => item.sku === productId && item.collection_slug === slug);
  if (!collection || !product) notFound();

  const vars = { "--accent": collection.accent, "--secondary": collection.secondary } as CSSProperties;
  const canSell = product.variants.some((variant) => variant.available);
  const prices = product.variants.map((variant) => variant.price_cents / 100);
  const productPath = `/tampa/nightmare-on-channelside/merch/collection/${collection.slug}/${product.sku}`;
  const related = catalog.products.filter((item) => item.collection_slug === collection.slug && item.sku !== product.sku).slice(0,4);
  const front = product.primary_image_url || product.images[0];
  const back = product.secondary_image_url || product.images[1];
  const extras = product.images.filter((image) => image && image !== front && image !== back).slice(0,4);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || `Official ${collection.name} merchandise from Nightmare on Channelside Halloween 2026.`,
    image: product.images,
    sku: product.sku,
    category: product.product_type,
    brand: { "@type": "Brand", name: "Nightmare on Channelside" },
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE_URL}${productPath}`,
      priceCurrency: "USD",
      lowPrice: Math.min(...prices).toFixed(2),
      highPrice: Math.max(...prices).toFixed(2),
      offerCount: product.variants.length,
      availability: canSell ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className={`${premium.shell} ${styles.shell} ${upgrade.shell} ${final.cinematicShell}`} style={vars}>
      <StoreHeader />

      <div style={{padding:"14px clamp(18px,3vw,42px)",borderBottom:"1px solid rgba(255,255,255,.08)",fontSize:9,fontWeight:900,letterSpacing:".13em",textTransform:"uppercase",color:"rgba(255,255,255,.55)"}}>
        <Link href="/tampa/nightmare-on-channelside/merch/shop" style={{color:"inherit",textDecoration:"none"}}>SHOP</Link> / <Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`} style={{color:"inherit",textDecoration:"none"}}>{collection.name}</Link> / <span style={{color:"#fff"}}>{product.title}</span>
      </div>

      <section style={{display:"grid",gridTemplateColumns:"minmax(0,1.35fr) minmax(340px,.65fr)",gap:24,padding:"26px clamp(18px,3vw,42px) 34px",alignItems:"start",borderBottom:"1px solid rgba(255,255,255,.08)"}} className="noc-product-detail-overhaul">
        <div>
          <div style={{display:"grid",gridTemplateColumns:back?"1fr 1fr":"1fr",gap:12}} className="noc-product-dual-main">
            {front ? <figure style={{margin:0,background:"#090605",border:"1px solid rgba(255,255,255,.10)",borderRadius:14,padding:12,textAlign:"center"}}><img src={front} alt={`${product.title} front`} style={{width:"100%",height:"min(62vw,620px)",objectFit:"contain",display:"block",background:"#080503"}}/><figcaption style={{paddingTop:8,fontSize:9,fontWeight:900,letterSpacing:".14em",color:"rgba(255,255,255,.58)"}}>FRONT</figcaption></figure> : null}
            {back ? <figure style={{margin:0,background:"#090605",border:"1px solid rgba(255,255,255,.10)",borderRadius:14,padding:12,textAlign:"center"}}><img src={back} alt={`${product.title} back`} style={{width:"100%",height:"min(62vw,620px)",objectFit:"contain",display:"block",background:"#080503"}}/><figcaption style={{paddingTop:8,fontSize:9,fontWeight:900,letterSpacing:".14em",color:"rgba(255,255,255,.58)"}}>BACK</figcaption></figure> : null}
          </div>
          {extras.length ? <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:8,marginTop:10}}>{extras.map((image,index)=><div key={`${image}-${index}`} style={{border:"1px solid rgba(255,255,255,.10)",borderRadius:10,background:"#080503",padding:6}}><img src={image} alt={`${product.title} detail ${index+1}`} style={{width:"100%",aspectRatio:"1",objectFit:"contain",display:"block"}}/></div>)}</div> : null}
        </div>

        <aside style={{position:"sticky",top:96,padding:"8px 4px 0"}}>
          <Link className={styles.back} href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`}>← BACK TO {collection.name}</Link>
          <span style={{display:"block",marginTop:22,color:"#ffd978",fontSize:9,fontWeight:900,letterSpacing:".2em",textTransform:"uppercase"}}>TAMPA HALLOWEEN CAPSULE · {collection.name}</span>
          <h1 style={{fontFamily:'Didot,"Bodoni MT","Times New Roman",serif',fontSize:"clamp(42px,4.5vw,62px)",lineHeight:.92,letterSpacing:"-.04em",margin:"14px 0 12px",color:"#fff7e7"}}>{product.title}</h1>
          <div style={{fontFamily:'Didot,"Bodoni MT","Times New Roman",serif',fontSize:32,color:"#ffd978",fontWeight:800}}>{formatPrice(product.price_cents)}</div>
          <p style={{color:"rgba(255,255,255,.66)",fontSize:13,lineHeight:1.7,margin:"18px 0 22px"}}>{product.description || `Official ${collection.name} merchandise from the Nightmare on Channelside Halloween 2026 world.`}</p>

          {canSell ? <AddToBag variants={product.variants} options={product.options} productTitle={product.title} /> : <div className={styles.dropLocked}><strong>GONE DARK</strong><span>This piece is currently unavailable.</span></div>}

          <div style={{display:"grid",gap:0,marginTop:24,border:"1px solid rgba(255,255,255,.10)",borderRadius:12,overflow:"hidden"}}>
            {[
              ["PREMIUM PRODUCT","Official live-event merchandise"],
              ["LIMITED EVENT ISSUE","Tampa Halloween collection"],
              ["SECURE CHECKOUT","Shopify-powered cart + checkout"],
              ["FRONT + BACK VIEWS","See both sides before purchase"],
            ].map(([title,body])=><div key={title} style={{padding:"16px 18px",borderBottom:"1px solid rgba(255,255,255,.08)"}}><strong style={{display:"block",fontSize:9,letterSpacing:".13em",color:"#ffd978"}}>{title}</strong><span style={{display:"block",marginTop:6,color:"rgba(255,255,255,.55)",fontSize:11}}>{body}</span></div>)}
          </div>
        </aside>
      </section>

      <section style={{position:"relative",minHeight:220,overflow:"hidden",borderBottom:"1px solid rgba(255,255,255,.08)",background:"linear-gradient(125deg,#080503 0%,#24100d 62%,#5c170f 100%)"}}>
        <div style={{position:"absolute",right:"2%",top:"50%",transform:"translateY(-55%)",fontSize:"clamp(120px,20vw,260px)",fontWeight:900,lineHeight:.7,letterSpacing:"-.09em",color:"rgba(255,70,45,.09)"}}>31</div>
        <div style={{position:"absolute",left:"clamp(22px,5vw,70px)",bottom:30,maxWidth:600}}><span style={{fontSize:9,fontWeight:900,letterSpacing:".2em",color:"#ffd978"}}>FROM THE NIGHT</span><h2 style={{fontFamily:'Didot,"Bodoni MT","Times New Roman",serif',fontSize:"clamp(34px,4.2vw,52px)",lineHeight:.94,margin:"8px 0 0"}}>SAME CITY. A DARKER PLAYGROUND.</h2></div>
      </section>

      {related.length ? <section style={{padding:"34px clamp(18px,3vw,42px)"}}><div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:20,marginBottom:20}}><div><span style={{fontSize:9,fontWeight:900,letterSpacing:".2em",color:"#ffd978"}}>MORE FROM {collection.name}</span><h2 style={{fontFamily:'Didot,"Bodoni MT","Times New Roman",serif',fontSize:"clamp(34px,3.6vw,50px)",lineHeight:.96,margin:"9px 0 0"}}>KEEP SHOPPING THE COLLECTION.</h2></div><Link href={`/tampa/nightmare-on-channelside/merch/collection/${collection.slug}`} style={{color:"#ffd978",fontSize:9,fontWeight:900,letterSpacing:".14em",textDecoration:"none"}}>VIEW ALL →</Link></div><div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:10}} className="noc-related-grid">{related.map((item)=><ProductCard product={item} key={item.sku}/>)}</div></section> : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />
      <StoreFooter />
    </main>
  );
}
