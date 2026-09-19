import { redirect } from "next/navigation";

const SHOP = "/tampa/nightmare-on-channelside/merch/shop";

export default function NightmareWorldsPage() {
  // Artist/collection browsing is intentionally disabled until every live
  // product has passed subject-to-artist QA. Keep commerce product-first.
  redirect(SHOP);
}
