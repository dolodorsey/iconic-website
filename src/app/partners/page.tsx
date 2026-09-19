import type { Metadata } from "next";
import PartnersLanding from "./PartnersLanding";

export const metadata:Metadata={
  title:"Partners + Personnel",
  description:"Join ICONIC LIVE as a promoter, ambassador, model, podcast/media partner, DJ, host or street-team member—or explore brand and sponsorship opportunities.",
};

// Preserve the governed route contract while using the expanded Partners implementation.
const CinematicPartners = PartnersLanding;
export default CinematicPartners;
