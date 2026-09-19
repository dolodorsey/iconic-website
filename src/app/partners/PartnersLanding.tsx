import Link from "next/link";
import { CinematicShell } from "../_cinematic";
import { NOC_MEDIA } from "../tampa/nightmare-on-channelside/merch/noc-assets";
import { PARTNER_ROLES } from "@/lib/noc-partner-roles";
import s from "./partners.module.css";

const touringNames=[
  "Lauryn Hill & The Fugees","Lil Baby","Future","Kendrick Lamar","Madonna","The Weeknd",
  "Summer Walker","DJ Snake","Marshmello","Feed The Streetz Tour","Romeo Santos","Janet Jackson",
  "Usher","Chris Brown","21 Savage","Drake","Kodak Black","J. Cole"
];

export default function PartnersLanding(){
  return <CinematicShell active="/partners">
    <section className={s.hero}>
      <img src={NOC_MEDIA.headliners} alt="Nightmare on Channelside official campaign artwork" className={s.heroArt}/>
      <div className={s.heroShade}/>
      <div className={s.heroCopy}>
        <span className={s.kicker}>ICONIC LIVE / PARTNERS + PERSONNEL</span>
        <h1>Build the room<br/>with us.</h1>
        <p>Nightmare on Channelside is the focus right now. We are building the promoters, ambassadors, models, podcasts, DJs, hosts, street teams and strategic partners who can make October 31 in Tampa move correctly.</p>
        <div className={s.heroActions}>
          <a href="#join-team" className={s.primary}>Choose your role <span>↗</span></a>
          <a href="#brands" className={s.secondary}>Brand + sponsorship <span>↗</span></a>
        </div>
      </div>
      <div className={s.heroStat}>
        <span>FIRST ACTIVE CAMPAIGN</span><strong>OCT 31 · TAMPA</strong><em>Nightmare on Channelside</em>
      </div>
    </section>

    <section className={s.origin}>
      <div className={s.originHead}>
        <span className={s.kicker}>WHY ICONIC LIVE EXISTS</span>
        <h2>Two operating histories.<br/>One live platform.</h2>
      </div>
      <div className={s.originGrid}>
        <article>
          <span className={s.number}>20+</span>
          <h3>Dr. Dorsey</h3>
          <p>Two decades across nightlife, parties, events, brand activations and culture-led hospitality. The strength is audience, rooms, relationships and understanding how people actually move through a city and a night.</p>
        </article>
        <article>
          <span className={s.number}>10+</span>
          <h3>Diesel</h3>
          <p>More than a decade working across concert and tour environments—from artist-facing touring to large-scale live execution. That experience now sits inside ICONIC LIVE.</p>
        </article>
        <article className={s.combine}>
          <span className={s.number}>NOW</span>
          <h3>Combined as ICONIC LIVE</h3>
          <p>The goal is practical: pair real touring experience with real nightlife and cultural-market experience, then build a repeatable team capable of moving across concerts, tours, activations and cities.</p>
        </article>
      </div>
      <div className={s.credits}>
        <span>TOURING + CONCERT ENVIRONMENTS HAVE INCLUDED</span>
        <div>{touringNames.map(name=><em key={name}>{name}</em>)}</div>
        <p>Listed to show the breadth of prior live-entertainment experience being brought into ICONIC LIVE—not to imply every artist or tour is an ICONIC LIVE property.</p>
      </div>
    </section>

    <section className={s.future}>
      <div className={s.sectionHead}>
        <div><span className={s.kicker}>UPCOMING</span><h2>Nightmare on Channelside.</h2></div>
        <p>Saturday, October 31, 2026 · Tampa, Florida. This is the active ICONIC LIVE campaign and the only event currently being presented on this personnel page.</p>
      </div>
      <div className={s.futureGrid}>
        <article>
          <span>01 / ACTIVE CAMPAIGN</span>
          <h3>Halloween in Tampa</h3>
          <p>Every role, application, tracking link, asset assignment, proof requirement and payment workflow on this page is being built around Nightmare on Channelside.</p>
        </article>
      </div>
      <p className={s.disclaimer}>Additional ICONIC LIVE properties remain in development and are intentionally hidden from this page for now.</p>
    </section>

    <section id="join-team" className={s.join}>
      <div className={s.sectionHead}>
        <div><span className={s.kicker}>JOIN THE NIGHTMARE ON CHANNELSIDE CAMPAIGN</span><h2>Choose the lane you can actually execute.</h2></div>
        <p>Different roles have different expectations, compensation structures and pipelines. Pick the form that matches what you do. That is how we route you correctly from day one.</p>
      </div>
      <div className={s.roleGrid}>
        {PARTNER_ROLES.map((role,i)=><Link href={`/partners/apply/${role.slug}`} className={s.roleCard} key={role.slug}>
          <div className={s.roleTop}><span>{String(i+1).padStart(2,"0")}</span><em>{role.eyebrow}</em></div>
          <h3>{role.title}</h3>
          <p>{role.short}</p>
          <div className={s.roleMeta}><span>Compensation</span><strong>{role.compensation}</strong></div>
          <div className={s.roleCta}>Open the correct form <span>↗</span></div>
        </Link>)}
      </div>
    </section>

    <section className={s.benefits}>
      <div className={s.sectionHead}>
        <div><span className={s.kicker}>CAMPAIGN BENEFITS + BONUSES</span><h2>Execute the campaign. Share in the upside.</h2></div>
        <p>Benefits are tied to an activated role, required deliverables and the final personalized packet. Access remains subject to venue, security, capacity and legal-age requirements.</p>
      </div>
      <div className={s.benefitGrid}>
        <article>
          <span>EVERY ACTIVATED PERSON</span>
          <h3>Hospitality + access</h3>
          <p>Complimentary event-day meal and beverage, VIP bar access, and credentialed access to official ICONIC LIVE after-parties associated with Nightmare on Channelside.</p>
        </article>
        <article>
          <span>PAID PROMO PERSONNEL</span>
          <h3>Additional bonus</h3>
          <p>Paid promotional personnel receive an additional campaign bonus. The amount and release trigger are stated in the personalized compensation sheet and remain tied to verified completion.</p>
        </article>
        <article>
          <span>NON-CASH PROMO PERSONNEL</span>
          <h3>Sold-out bonus package</h3>
          <p>If the event officially sells out and assigned deliverables are completed, eligible non-cash promotional personnel receive the campaign sold-out bonus package.</p>
        </article>
      </div>
      <div className={s.bonusStrip}>
        <span>SOLD-OUT BONUS PACKAGE MAY INCLUDE</span>
        <p>Massage gift certificate · additional gift selected by ICONIC LIVE · bonus merchandise · future ICONIC LIVE tickets and/or backstage-access opportunities · consideration for touring-company work · possible endorsement consideration from an individual BEVCO beverage brand.</p>
      </div>
      <p className={s.disclaimer}>Touring-company work, future backstage access and BEVCO endorsement opportunities are consideration opportunities and require separate selection, availability, approvals and agreements. Alcoholic beverage service is only for legally eligible guests.</p>
    </section>

    <section className={s.how}>
      <div className={s.sectionHead}>
        <div><span className={s.kicker}>WHAT HAPPENS AFTER YOU APPLY</span><h2>Simple on your end. Structured on ours.</h2></div>
      </div>
      <div className={s.steps}>
        {[
          ["01","Apply","Use the form for your exact role so you land in the right operating pipeline."],
          ["02","Review","Partner Ops reviews market fit, reach, experience, schedule and campaign needs."],
          ["03","Terms","Approved personnel receive role-specific duties, compensation and agreement documents."],
          ["04","Activate","You receive your personal tracking code/link, merch benefit if eligible, approved assets and schedule."],
          ["05","Execute","Posts, shifts, media placements or performance duties are verified through proof and QA."],
          ["06","Grow","Strong performers become the first people we look at for the next city, show or tour lane."]
        ].map(([n,t,b])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{b}</p></article>)}
      </div>
    </section>

    <section id="brands" className={s.brands}>
      <div>
        <span className={s.kicker}>BRANDS + SPONSORS</span>
        <h2>Want to activate around the audience instead?</h2>
        <p>ICONIC LIVE also works with brands around sponsorship, hospitality, content, on-site activation, merchandise and category opportunities. Those inquiries stay separate from personnel onboarding.</p>
      </div>
      <Link href="/access?intent=sponsorship&event=iconic-partnerships" className={s.primary}>Start a brand conversation <span>↗</span></Link>
    </section>
  </CinematicShell>;
}
