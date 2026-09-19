import { redirect } from "next/navigation";

const SHOP = "/tampa/nightmare-on-channelside/merch/shop";

export default function NightmareWorldsPage() {
  // Collection browsing stays closed until taxonomy + visual subject QA are complete.
  redirect(SHOP);
}
