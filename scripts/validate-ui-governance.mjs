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
for (const path of [homePath, summerPath, pmfPath, cinematicAssetsPath, nocAssetsPath]) if (!fs.existsSync(path)) fail(`required source file missing: ${path}`);
if (process.exitCode) process.exit(process.exitCode);
const home = read(homePath),summer = read(summerPath),pmf = read(pmfPath),assets = read(cinematicAssetsPath),noc = read(nocAssetsPath);
function constValue(source, name) {const match = source.match(new RegExp(`(?:const|export const)\\s+${name}\\s*=\\s*[\"']([^\"']+)[\"']`));return match?.[1] || null;}
function objectValue(source, name) {const match = source.match(new RegExp(`${name}\\s*:\\s*[\"']([^\"']+)[\"']`));return match?.[1] || null;}

const heroMatch = home.match(/<section className="ir-home-hero[^\"]*"[\s\S]*?<\/section>/);
if (!heroMatch) fail("homepage hero section was not found");
else {const hero=heroMatch[0];for(const [pattern,label] of [[/<h[1-6][\s>]/i,"heading"],[/<p[\s>]/i,"paragraph"],[/<Link[\s>]/,"Link/CTA"],[/<button[\s>]/i,"button"],[/ir-home-hero-copy/,"hero copy container"]]) if(pattern.test(hero)) fail(`homepage animation/hero contains forbidden ${label}; all interface copy must live below the animation canvas`);}

// One canonical registry owns each tour visual. Stable CDN mirrors are allowed
// only for the exact verified source art; changing the filename is a governed
// artwork change and must be reviewed with screenshots.
const registrySummer = constValue(assets, "SUMMER_VISUAL");
const registryPmf = constValue(assets, "PMF_VISUAL");
if (!registrySummer?.includes("iconic-soul-symphony-verified-2026-09-15.webp")) fail("Soul Symphony canonical artwork drift");
if (!registryPmf?.includes("iconic-pardon-my-french-verified-2026-09-15.webp")) fail("Pardon My French canonical artwork drift");
if (!/import\s*\{\s*SUMMER_VISUAL\s*\}\s*from\s*[\"']@\/app\/_cinematic\/assets[\"']/.test(summer) || !/visual=\{SUMMER_VISUAL\}/.test(summer)) fail("Soul Symphony destination must consume canonical registry art");
if (!/import\s*\{\s*PMF_VISUAL\s*\}\s*from\s*[\"']@\/app\/_cinematic\/assets[\"']/.test(pmf) || !/visual=\{PMF_VISUAL\}/.test(pmf)) fail("Pardon My French destination must consume canonical registry art");
if (!/title:\s*'Soul Symphony'[\s\S]*?src:\s*SUMMER_VISUAL/.test(assets)) fail("Soul Symphony homepage/world card must consume canonical registry art");
if (!/title:\s*'Pardon My French'[\s\S]*?src:\s*PMF_VISUAL/.test(assets)) fail("Pardon My French homepage/world card must consume canonical registry art");

const homeTampa=constValue(home,"TAMPA_VISUAL"),pageTampa=objectValue(noc,"headliners");
if (!homeTampa || homeTampa !== pageTampa) fail("Nightmare on Channelside legacy homepage card visual does not match the official NOC headliners visual");
const slateMatch=home.match(/<div className="ir-slate-grid">([\s\S]*?)<\/div>\s*<\/section>/);
if(!slateMatch) fail("homepage flagship slate grid was not found");
else {const slate=slateMatch[1];if(/unsplash\.com|pexels\.com|pixabay\.com|placehold\.co|placeholder/i.test(slate))fail("generic stock/placeholder imagery is forbidden in flagship cards");const cardCount=(slate.match(/ir-slate-card/g)||[]).length,backgroundCount=(slate.match(/backgroundImage:/g)||[]).length;if(cardCount<3)fail(`expected at least 3 flagship cards; found ${cardCount}`);if(backgroundCount<cardCount)fail(`every flagship card must have an explicitly mapped approved visual; cards=${cardCount}, approved visual mappings=${backgroundCount}`);}
if(!home.includes("homepage animation/hero is visual-only"))fail("homepage visual-only governance comment was removed");
if(!home.includes("Do not substitute stock, generic, recycled, or cross-property imagery"))fail("approved-card-asset governance comment was removed");
if(process.exitCode)process.exit(process.exitCode);
console.log("✓ ICONIC UI governance checks passed with verified stable tour-art mirrors.");
