import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ICONIC",
    short_name: "ICONIC",
    description: "Concerts, festivals, comedy and arena-scale live entertainment.",
    start_url: "/",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#050507",
  };
}
