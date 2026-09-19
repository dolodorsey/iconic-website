import { redirect } from "next/navigation";

const SHOP = "/tampa/nightmare-on-channelside/merch/shop";

export default function CollectionPage() {
  // Public artist/subject collection landing pages remain closed until
  // exact product-to-subject visual QA is complete. Product detail routes
  // stay available through the product-first storefront.
  redirect(SHOP);
}
