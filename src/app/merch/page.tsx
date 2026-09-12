import type { Metadata } from "next";
import Link from "next/link";
import PlatformShell from "@/app/_components/PlatformShell";
import { getMerchCatalog } from "@/app/tampa/nightmare-on-channelside/merch/catalog";
import { COLLECTION_ART, NOC_MEDIA } from "@/app/tampa/nightmare-on-channelside/merch/noc-assets";

export const metadata: Metadata = {
  title: "Merch Vault",
  description: "Shop ICONIC LIVE event merchandise and join Summer Walker and DJ Snake tour drop lists.",
  openGraph: {
    title: "Merch Vault | ICONIC LIVE",
    description: "Event capsules, artist collections and limited tour merchandise from ICONIC LIVE.",
    type: "website",
    images: [{url:NOC_MEDIA.market}],
  },
};

const artistSlugs = ["21-savage","kodak-black","da-baby","meek-mill","belly-gang-kush"] as const;
const futureDrops = [
  { title:"SUMMER WALKER", line:"SOUL SYMPHONY TOUR DROP", src:"https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-summer-walker-soul-symphony.jpg?v=1789170574", href:"/access?intent=merch&event=summer-walker-soul-symphony" },
  { title:"DJ SNAKE", line:"PARDON MY FRENCH DROP", src:"https://cdn.shopify.com/s/files/1/0759/7506/5791/files/iconic-dj-snake-pardon-my-french.jpg?v=1789170586", href:"/access?intent=merch&event=dj-snake-pardon-my-french" },
];

export default async function MerchPage(){
  const catalog = await getMerchCatalog();
  const bySlug = new Map(catalog.collections.map((collection) => [collection.slug, collection]));
  const productFor = (slug:string) => catalog.products.find((product) => product.collection_slug === slug);

  return <PlatformShell>
    <div className="ov-page">
      <section className="ov-merch-hero">
        <img src={NOC_MEDIA.market} alt="ICONIC live merchandise collections" fetchPriority="high"/>
        <div className="ov-merch-hero-copy">
          <div className="ov-kicker">ICONIC LIVE PRESENTS</div>
          <h1 className="ov-display">SHOP THE LINEUP.</h1>
          <p className="ov-copy">Tampa Halloween artist collections are live now. Tour drops for Summer Walker and DJ Snake remain separated so every property keeps its own visual world.</p>
          <div className="ov-actions"><Link className="ov-btn" href="/tampa/nightmare-on-channelside/merch/shop">Shop Tampa Halloween →</Link><Link className="ov-btn ghost" href="/access?intent=merch">Join Drop Access</Link></div>
        </div>
      </section>

      <section style={{padding:"28px 0 34px",borderBottom:"1px solid rgba(226,176,74,.26)"}}>
        <div className="ov-shell">
          <div className="ov-section-label"><span>TAMPA HALLOWEEN COLLECTIONS</span><small>ARTIST-SPECIFIC MERCH · REAL SHOPIFY PRODUCT VIEWS</small></div>
          <div className="ov-merch-collections">
            {artistSlugs.map((slug) => {
              const collection = bySlug.get(slug);
              const product = productFor(slug);
              if (!collection) return null;
              return <Link href={`/tampa/nightmare-on-channelside/merch/collection/${slug}`} className="ov-merch-collection-card" key={slug}>
                <div className="ov-merch-collection-art"><img src={COLLECTION_ART[slug]} alt={collection.name}/><div className="ov-merch-collection-name">{collection.name}</div></div>
                <div className="ov-merch-collection-meta">
                  <span>SHOP COLLECTION →</span>
                  {product ? <div className="ov-mini-product-pair">
                    {product.primary_image_url ? <figure><img src={product.primary_image_url} alt={`${product.title} front`}/><figcaption>FRONT</figcaption></figure> : null}
                    {product.secondary_image_url ? <figure><img src={product.secondary_image_url} alt={`${product.title} back`}/><figcaption>BACK</figcaption></figure> : null}
                  </div> : null}
                </div>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section style={{padding:"34px 0",borderBottom:"1px solid rgba(226,176,74,.26)",background:"rgba(226,176,74,.015)"}}>
        <div className="ov-shell">
          <div className="ov-section-label"><span>MORE FROM NIGHTMARE ON CHANNELSIDE</span><small>FULL LINEUP · TAMPA · OFFICIAL EVENT</small></div>
          <div className="ov-property-strip">
            {[
              ["ALL ARTISTS","Full Lineup Collection",COLLECTION_ART["all-artists"],"all-artists"],
              ["TAMPA","City Collection",COLLECTION_ART.tampa,"tampa"],
              ["NIGHTMARE ON CHANNELSIDE","Official Event Collection",COLLECTION_ART["nightmare-on-channelside"],"nightmare-on-channelside"],
              ["SHOP ALL","Full Live Catalog",NOC_MEDIA.homeHero,"shop"],
            ].map(([title,meta,src,slug]) => <Link key={title} className="ov-property-card" href={slug === "shop" ? "/tampa/nightmare-on-channelside/merch/shop" : `/tampa/nightmare-on-channelside/merch/collection/${slug}`}><img src={src} alt={title}/><div className="ov-property-card-copy"><strong>{title}</strong><span>{meta} →</span></div></Link>)}
          </div>
        </div>
      </section>

      <section style={{padding:"34px 0"}}>
        <div className="ov-shell">
          <div className="ov-section-label"><span>NEXT DROPS</span><small>SEPARATE TOUR WORLDS · ACCESS LIST FIRST</small></div>
          <div className="ov-gallery-grid">
            {futureDrops.map((drop) => <Link href={drop.href} className="ov-gallery-card" key={drop.title} style={{color:"inherit",textDecoration:"none"}}><img src={drop.src} alt={drop.title}/><strong>{drop.title}<br/><span style={{fontSize:15,color:"#ffd978"}}>{drop.line}</span></strong></Link>)}
            <Link href="/access?intent=merch" className="ov-access-card" style={{color:"inherit",textDecoration:"none"}}><div className="ov-kicker">MERCH ACCESS</div><h3>GET THE DROP BEFORE THE CROWD.</h3><p className="ov-copy">Future event and tour capsules stay gated to their own release lists.</p><span className="ov-btn ghost">Join Access →</span></Link>
          </div>
        </div>
      </section>

      <div className="ov-trust-strip">
        <div><b>OFFICIAL EVENT MERCH</b><span>Artist, city and show-specific collections.</span></div>
        <div><b>FRONT + BACK VIEWS</b><span>Quick-glance product presentation throughout the shop.</span></div>
        <div><b>LIVE SHOPIFY INVENTORY</b><span>Real variants and real checkout, not placeholders.</span></div>
        <div><b>SECURE CHECKOUT</b><span>Cart and checkout remain isolated to the NOC catalog.</span></div>
      </div>
    </div>
  </PlatformShell>;
}
