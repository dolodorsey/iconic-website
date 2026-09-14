import { notFound, redirect } from 'next/navigation';
import { getMerchCatalog } from '../../catalog';

// Resolve product handles to the existing collection-scoped product route.
// Catalog isolation and canonical product pages remain unchanged.
export default async function ProductEntry({params}:{params:Promise<{sku:string}>}) {
  const {sku}=await params;
  const catalog=await getMerchCatalog();
  const product=catalog.products.find(p=>p.sku===sku&&p.is_active);
  if(!product)notFound();
  redirect(`/tampa/nightmare-on-channelside/merch/collection/${product.collection_slug}/${encodeURIComponent(product.sku)}`);
}
