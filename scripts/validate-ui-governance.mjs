import fs from "node:fs";

const fail = (message) => {
  console.error(`UI GOVERNANCE FAIL: ${message}`);
  process.exitCode = 1;
};

const read = (path) => fs.readFileSync(path, "utf8");
const homePath = "src/app/_components/HomeExperience.tsx";
const summerPath = "src/app/summer-walker/page.tsx";
const pmfPath = "src/app/dj-snake-pardon-my-french/page.tsx";
const cinematicAssetsPath = "src/app/_cinematic/assets.ts";
const nocAssetsPath = "src/app/tampa/nightmare-on-channelside/merch/noc-assets.ts";

for (const path of [homePath, summerPath, pmfPath, cinematicAssetsPath, nocAssetsPath]) {
  if (!fs.existsSync(path)) fail(`required source file missing: ${path}`);
}
if (process.exitCode) process.exit(process.exitCode);

const home = read(homePath);
const summer = read(summerPath);
const pmf = read(pmfPath);
const assets = read(cinematicAssetsPath);
const noc = read(nocAssetsPath);

function constValue(source, name) {
  const match = source.match(new RegExp(`(?:const|export const)\\s+${name}\\s*=\\s*[\"']([^\"']+)[\"']`));
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

// RULE 2 — One canonical registry owns the two tour visuals. The governed
// cinematic homepage consumes WORLDS from this registry, and destination pages
// import the exact same constants. Legacy HomeExperience may remain in source
// but is not allowed to redefine the destination art.
const registrySummer = constValue(assets, "SUMMER_VISUAL");
const registryPmf = constValue(assets, "PMF_VISUAL");
if (registrySummer !== "/api/media/drive/1bH_rd6ispK2tuiDbyJhEqMgBCxrMys5r") fail("Soul Symphony canonical artwork drift");
if (registryPmf !== "/api/media/drive/1rUT8LECF1MtVOwKAtJzZEvqFMfcmWEN9") fail("Pardon My French canonical artwork drift");
if (!/import\s*\{\s*SUMMER_VISUAL\s*\}\s*from\s*[\"']@\/app\/_cinematic\/assets[\"']/.test(summer) || !/visual=\{SUMMER_VISUAL\}/.test(summer)) fail("Soul Symphony destination must consume canonical registry art");
if (!/import\s*\{\s*PMF_VISUAL\s*\}\s*from\s*[\"']@\/app\/_cinematic\/assets[\"']/.test(pmf) || !/visual=\{PMF_VISUAL\}/.test(pmf)) fail("Pardon My French destination must consume canonical registry art");
if (!/title:\s*'Soul Symphony'[\s\S]*?src:\s*SUMMER_VISUAL/.test(assets)) fail("Soul Symphony homepage/world card must consume canonical registry art");
if (!/title:\s*'Pardon My French'[\s\S]*?src:\s*PMF_VISUAL/.test(assets)) fail("Pardon My French homepage/world card must consume canonical registry art");

const homeTampa = constValue(home, "TAMPA_VISUAL");
const pageTampa = objectValue(noc, "headliners");
if (!homeTampa || homeTampa !== pageTampa) fail("Nightmare on Channelside legacy homepage card visual does not match the official NOC headliners visual");

// RULE 3 — No generic stock-image sources in legacy flagship slate cards.
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
console.log("✓ ICONIC UI governance checks passed with canonical tour-art registry.");
