import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "../../../../_components/IconicPage";
import styles from "../giveaway.module.css";

export const metadata:Metadata={
  title:"Nightmare on Channelside Giveaway — Official Rules Draft",
  robots:{index:false,follow:false},
};

export default function RulesPage(){
  return <Shell>
    <main style={{background:"#050101",minHeight:"100vh"}}>
      <article className={styles.rules}>
        <div className={styles.rulesBanner}>DRAFT · NOT YET ACTIVE · FINAL LEGAL ENTITY, APPROVED ARVs, FILING RECEIPT AND SECURITY MUST BE INSERTED BEFORE LAUNCH</div>
        <h1>NIGHTMARE ON CHANNELSIDE<br/>OFFICIAL GIVEAWAY RULES.</h1>
        <p><strong>NO PURCHASE NECESSARY. A PURCHASE WILL NOT INCREASE YOUR CHANCES OF WINNING.</strong> Void where prohibited. These rules are a launch-preparation draft and do not open the promotion for entry.</p>

        <h2>1. Sponsor / Operator</h2>
        <p>Final filing copy must identify the exact legal Sponsor/Operator entity and mailing address. Consumer-facing branding: ICONIC LIVE — Nightmare on Channelside.</p>

        <h2>2. Promotion Period</h2>
        <p>Planned opening: September 27, 2026 at 12:00 PM Eastern Time. Planned close: October 30, 2026 at 6:00 PM Eastern Time. The final opening date is controlled by the filed/approved version of these rules and will move later if any required filing, security, inventory or QA gate remains incomplete.</p>

        <h2>3. Eligibility</h2>
        <p>Planned eligibility is legal residents of the United States who are at least 18 years old at the time of entry, except where prohibited or restricted. Employees, officers, directors, immediate family and household members of Sponsor/Operator and materially involved promotion vendors should be excluded in the final filed version. Prize-specific restrictions apply. After-party prizes, if offered, require the winner and guest to be 21+ with valid government-issued identification.</p>

        <h2>4. How to Enter</h2>
        <p>Eligible entrants may reach the official entry form through designated ICONIC LIVE text, Instagram, call-in, radio/podcast partner or other published promotional channels. Each official entry requires the entrant to complete the form and accept the current Official Rules. A social-media comment, phone call or text message by itself is not a completed sweepstakes entry unless the final rules expressly say otherwise.</p>
        <p><strong>Entry limit:</strong> one official entry per person per calendar day across the main sweepstakes, regardless of acquisition channel. Switching channels does not create additional odds.</p>

        <h2>5. Free Method / No Purchase</h2>
        <p>No ticket purchase, merchandise purchase, payment, donation or proof of purchase is required to enter or win. Ticket purchasing is a separate commercial transaction and does not increase an entrant's odds.</p>

        <h2>6. Prizes and Approximate Retail Values</h2>
        <p>The current internal planning model includes ticket pairs, merchandise packs, venue food/non-alcoholic beverage credits, VIP experiences, after-party access and a possible meet-and-greet. Exact quantities, eligibility restrictions and approved approximate retail values must replace all planning values before these rules become final. Any premium prize not fully approved before filing/launch will be removed from the final prize schedule.</p>
        <p>Transportation, lodging, parking, meals, incidental expenses and other costs are not included unless expressly stated in the final prize description. No cash redemption. Sponsor may include a pre-disclosed substitution right for a prize of equal or greater value where legally permitted and necessary because of availability or circumstances outside Sponsor's reasonable control.</p>

        <h2>7. Random Selection and Odds</h2>
        <p>Potential winners will be selected at random from the eligible entries included in the applicable drawing pool using the documented selection procedure. Odds depend on the number of eligible entries received. A selected entrant is not a confirmed winner until eligibility and any prize-specific requirements are verified.</p>

        <h2>8. Winner Notification / Claim</h2>
        <p>Potential winners will be contacted using the contact information provided at entry. Sponsor may require identity/age verification, eligibility confirmation, an affidavit/release where appropriate, and acceptance within a stated claim period. If a potential winner is ineligible, cannot be contacted, declines, or fails to respond by the deadline, an alternate may be selected according to the final rules.</p>

        <h2>9. Taxes / Expenses</h2>
        <p>Winners are responsible for taxes and expenses not expressly included in the prize. Sponsor may request tax documentation where legally required.</p>

        <h2>10. Conduct / Fraud</h2>
        <p>Automated entries, false identities, duplicate manipulation, tampering, or attempts to defeat entry limits may be rejected under objective criteria stated in the final rules. Entries will not be arbitrarily removed, and the promotion will not allocate predetermined winners to a specific partner, time period or geographic area.</p>

        <h2>11. Publicity / Platform Release</h2>
        <p>Where lawful, the final rules may authorize use of a verified winner's name, city/state, likeness or submitted content for promotion without additional compensation. Instagram, Meta, radio/podcast partners, Ticketmaster, the venue and artists are not sponsors merely because their platforms, names or services are referenced unless expressly identified as such in the final rules.</p>

        <h2>12. Privacy</h2>
        <p>Information submitted for sweepstakes administration will be used to administer entry, eligibility, winner verification, prize fulfillment, compliance and fraud prevention. Optional marketing consent is collected separately and is not required to enter.</p>

        <h2>13. Florida Compliance / Winner Records</h2>
        <p>The launch plan is being prepared under Florida's game-promotion framework. The internal provisional prize model exceeds $5,000 for the main promotion, so the program is being treated as filing/security-required unless the final approved structure and values establish otherwise. Final rules must reflect the actual filing and security arrangement before launch. Required winning-entry and winner-list records will be retained and reported according to applicable law.</p>

        <h2>14. Governing Terms</h2>
        <p>The final filed Official Rules control over promotional summaries, host reads, captions and graphics. Material advertising terms must remain consistent with the final rules.</p>

        <p style={{marginTop:46}}><Link href="/tampa/nightmare-on-channelside/giveaways">← Back to Giveaway Hub</Link></p>
      </article>
    </main>
  </Shell>;
}
