import type { Metadata } from "next";
import Link from "next/link";
import { Shell, drive } from "../../../_components/IconicPage";
import GiveawayClient from "./GiveawayClient";
import styles from "./giveaway.module.css";

const FLYER=drive("1Ub439rjM3-SwK67udFKh6f2q5SwDF_U1");

export const metadata:Metadata={
  title:"Nightmare on Channelside Official Giveaway | ICONIC LIVE",
  description:"Official Nightmare on Channelside promotional giveaway hub for Tampa Halloween 2026.",
  robots:{index:false,follow:false},
};

export default function GiveawayPage(){
  return <Shell>
    <main className={styles.wrap}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>ICONIC LIVE · TAMPA · OFFICIAL GIVEAWAY CONTROL</div>
          <h1>WIN YOUR WAY<br/>INTO THE<br/>NIGHTMARE.</h1>
          <p>Tickets. Official merch. Food and beverage credits. Premium experience drops. One controlled giveaway engine tied directly to Nightmare on Channelside.</p>
          <div className={styles.badges}><span>No Purchase Necessary</span><span>One Entry / Person / Day</span><span>Official Rules Control</span><span>October 31 · Tampa</span></div>
        </div>
        <div className={styles.heroVisual}><img src={FLYER} alt="Nightmare on Channelside official concert flyer"/></div>
      </section>

      <section className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.prizes}>
            <article className={styles.prize}><span>DROP 01</span><strong>Ticket Pairs</strong><p>Official event-ticket inventory released through controlled drawings.</p></article>
            <article className={styles.prize}><span>DROP 02</span><strong>Merch Packs</strong><p>Official Nightmare merchandise from approved event inventory.</p></article>
            <article className={styles.prize}><span>DROP 03</span><strong>Food + Beverage</strong><p>Venue-approved food and non-alcoholic beverage credits.</p></article>
            <article className={styles.prize}><span>PREMIUM</span><strong>Experience Drops</strong><p>VIP, after-party or artist-access experiences appear only after exact inventory and approvals are confirmed.</p></article>
          </div>

          <GiveawayClient/>

          <div style={{maxWidth:920,margin:"28px auto 0",display:"flex",gap:16,justifyContent:"space-between",flexWrap:"wrap",fontSize:10,color:"rgba(255,255,255,.48)"}}>
            <Link href="/tampa/nightmare-on-channelside" style={{color:"inherit"}}>← Event Home</Link>
            <Link href="/tampa/nightmare-on-channelside/giveaways/official-rules" style={{color:"inherit"}}>Official Rules / Current Draft →</Link>
          </div>
        </div>
      </section>
    </main>
  </Shell>;
}
