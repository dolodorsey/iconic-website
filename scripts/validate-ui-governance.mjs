import fs from "node:fs";

const fail = (message) => {
  console.error(`UI GOVERNANCE FAIL: ${message}`);
  process.exitCode = 1;
};

const read = (path) => fs.readFileSync(path, "utf8");
const homePath = "src/app/_components/HomeExperience.tsx";
const summerPath = "src/app/summer-walker/page.tsx";
const pmfPath = "src/app/dj-snake-pardon-my-french/page.tsx";
const nocAssetsPath = "src/app/tampa/nightmare-on-channelside/merch/noc-assets.ts";

for (const path of [homePath, summerPath, pmfPath, nocAssetsPath]) {
  if (!fs.existsSync(path)) fail(`required source file missing: ${path}`);
}

if (process.exitCode) process.exit(process.exitCode);

const home = read(homePath);
const summer = read(summerPath);
const pmf = read(pmfPath);
const noc = read(nocAssetsPath);

function constValue(source, name) {
  const match = source.match(new RegExp(`const\\s+${name}\\s*=\\s*[\"']([^\"']+)[\"']`));
  return match?.[1] || null;
}

function objectValue(source, name) {
  const match = source.match(new RegExp(`${name}\\s*:\\s*[\"']([^\"']+)[\"']`));
  return match?.[1] || null;
}

// RULE 1 — Homepage hero/animation canvas is visual-only.
const heroMatch = home.match(/<section className="ir-home-hero[^\"]*"[\s\S]*?<\/section>/);
if (!heroMatch) {
  fail("homepage hero section was not found");
} else {
  const hero = heroMatch[0];
  const forbidden = [
    [/<h[1-6][\s>]/i, "heading"],
    [/<p[\s>]/i, "paragraph"],
    [/<Link[\s>]/, "Link/CTA"],
    [/<button[\s>]/i, "button"],
    [/ir-home-hero-copy/, "hero copy container"],
  ];
  for (const [pattern, label] of forbidden) {
    if (pattern.test(hero)) fail(`homepage animation/hero contains forbidden ${label}; all interface copy must live below the animation canvas`);
  }
}

// RULE 2 — Homepage flagship cards must use each property's actual approved destination-page visual.
const homeSummer = constValue(home, "SUMMER_VISUAL");
const pageSummer = constValue(summer, "SUMMER_VISUAL");
if (!homeSummer || homeSummer !== pageSummer) fail("Soul Symphony homepage card visual does not match the official Soul Symphony page visual");

const homePmf = constValue(home, "PMF_VISUAL");
const pagePmf = constValue(pmf, "DJ_VISUAL");
if (!homePmf || homePmf !== pagePmf) fail("Pardon My French homepage card visual does not match the official PMF page visual");

const homeTampa = constValue(home, "TAMPA_VISUAL");
const pageTampa = objectValue(noc, "headliners");
if (!homeTampa || homeTampa !== pageTampa) fail("Nightmare on Channelside homepage card visual does not match the official NOC headliners visual");

// RULE 3 — No generic stock-image sources in flagship slate cards.
const slateMatch = home.match(/<div className="ir-slate-grid">([\s\S]*?)<\/div>\s*<\/section>/);
if (!slateMatch) {
  fail("homepage flagship slate grid was not found");
} else {
  const slate = slateMatch[1];
  if (/unsplash\.com|pexels\.com|pixabay\.com|placehold\.co|placeholder/i.test(slate)) {
    fail("generic stock/placeholder imagery is forbidden in flagship cards");
  }
  const cardCount = (slate.match(/ir-slate-card/g) || []).length;
  const backgroundCount = (slate.match(/backgroundImage:/g) || []).length;
  if (cardCount < 3) fail(`expected at least 3 flagship cards; found ${cardCount}`);
  if (backgroundCount < cardCount) fail(`every flagship card must have an explicitly mapped approved visual; cards=${cardCount}, approved visual mappings=${backgroundCount}`);
}

// RULE 4 — Governance comments must stay in source so future builders see the non-negotiables where they edit.
if (!home.includes("homepage animation/hero is visual-only")) fail("homepage visual-only governance comment was removed");
if (!home.includes("Do not substitute stock, generic, recycled, or cross-property imagery")) fail("approved-card-asset governance comment was removed");

if (process.exitCode) process.exit(process.exitCode);
console.log("✓ ICONIC UI governance checks passed.");
