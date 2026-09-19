const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ORIGIN = process.env.PREVIEW_ORIGIN;
const TOKEN = process.env.VERCEL_SHARE_TOKEN;
const SHA = process.env.GITHUB_SHA || "unknown";
if (!ORIGIN) throw new Error("Missing screenshot target origin");

const outDir = path.join(process.cwd(), "visual-evidence");
fs.mkdirSync(outDir, { recursive: true });

const routes = [
  { key:"home", path:"/" },
  { key:"merch", path:"/merch" },
  { key:"noc-merch", path:"/tampa/nightmare-on-channelside/merch" },
  { key:"noc-shop", path:"/tampa/nightmare-on-channelside/merch/shop" },
  { key:"soul-symphony", path:"/summer-walker" },
  { key:"pmf", path:"/dj-snake-pardon-my-french" },
  { key:"partners", path:"/partners" },
];
const views = [
  { key:"desktop", width:1440, height:1000 },
  { key:"tablet", width:1024, height:1366 },
  { key:"mobile", width:390, height:844 },
];

const results = { sha: SHA, origin: ORIGIN, captured_at:new Date().toISOString(), checks:[], screenshots:[] };
const failures = [];

function urlFor(route){
  const u = new URL(route, ORIGIN);
  if (TOKEN) u.searchParams.set("_vercel_share", TOKEN);
  return u.toString();
}
function check(name, pass, details={}){
  results.checks.push({name, pass, ...details});
  if(!pass) failures.push({name, ...details});
}

(async()=>{
  const browser = await chromium.launch({headless:true});
  for (const view of views){
    const context = await browser.newContext({ viewport:{width:view.width,height:view.height}, deviceScaleFactor:1 });
    const page = await context.newPage();

    for (const route of routes){
      const response = await page.goto(urlFor(route.path), {waitUntil:"networkidle", timeout:120000});
      await page.waitForTimeout(700);
      const status = response ? response.status() : null;
      check(`${route.key} ${view.key} HTTP`, status && status < 400, {status});

      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyText: document.body.innerText.slice(0,5000),
      }));
      check(`${route.key} ${view.key} no-horizontal-overflow`, metrics.scrollWidth <= metrics.clientWidth + 2, metrics);

      const autoDialog = await page.locator('[role="dialog"][aria-label="Install ICONIC"]').count();
      check(`${route.key} ${view.key} install-not-auto-open`, autoDialog === 0, {autoDialog});

      const file = `${route.key}__${view.key}__${SHA.slice(0,12)}.png`;
      await page.screenshot({path:path.join(outDir,file), fullPage:true});
      results.screenshots.push({route:route.path, viewport:view.key, width:view.width, height:view.height, file});

      if(route.key==="home"){
        const masterCount = await page.locator('[data-asset-namespace="ICONIC_MASTER"] [data-master-channel]').count();
        check(`home ${view.key} governed-master-assets`, masterCount===5, {masterCount});
        const collectionLinks = await page.locator('a[href*="/merch/collection/"]').count();
        check(`home ${view.key} no-hardcoded-artist-collection-links`, collectionLinks===0, {collectionLinks});
      }
      if(route.key==="merch"){
        const text = metrics.bodyText.toLowerCase();
        check(`merch ${view.key} product-first-copy`, !text.includes("choose your collection") && !text.includes("artist collections"), {});
        const collectionLinks = await page.locator('a[href*="/merch/collection/"]').count();
        check(`merch ${view.key} no-public-collection-links`, collectionLinks===0, {collectionLinks});
      }
      if(route.key==="noc-shop"){
        const text = metrics.bodyText.toLowerCase();
        check(`noc-shop ${view.key} no-shop-by-artist-ui`, !text.includes("shop by artist") && !text.includes("pick your side"), {});
        const directProduct = await page.locator('a[href*="/merch/product/"]').count();
        check(`noc-shop ${view.key} direct-product-links-present`, directProduct>0, {directProduct});
      }
      if(route.key==="partners"){
        const parentHero = page.locator('[data-testid="partners-parent-hero"] img').first();
        const parentSrc = await parentHero.getAttribute("src");
        check(`partners ${view.key} parent-hero-is-iconic-master`, Boolean(parentSrc?.includes("iconic-platform-vip-hospitality")), {parentSrc});
        const campaign = page.locator('[data-testid="active-nightmare-campaign"]');
        const campaignCount = await campaign.count();
        check(`partners ${view.key} one-nightmare-campaign-block`, campaignCount===1, {campaignCount});
        if(campaignCount){
          const campaignSrc = await campaign.locator("img").first().getAttribute("src");
          check(`partners ${view.key} nightmare-art-is-contained`, Boolean(campaignSrc?.includes("noc-site-scene")), {campaignSrc});
          const box = await campaign.boundingBox();
          check(`partners ${view.key} nightmare-feature-has-real-width`, Boolean(box && box.width >= view.width*0.78), {box});
        }
      }
    }

    // Explicit install state: normal page has no install overlay; install opens only through ?install=1.
    await page.goto(urlFor("/"), {waitUntil:"networkidle", timeout:120000});
    await page.waitForTimeout(700);
    const installEntry = await page.locator('a[href*="install=1"]').count();
    check(`home ${view.key} install-entry-in-navigation`, installEntry>0, {installEntry});
    const fixedInstall = await page.locator('button[aria-label="Get ICONIC app"]').count();
    check(`home ${view.key} no-persistent-install-overlay-button`, fixedInstall===0, {fixedInstall});

    const installUrl = new URL("/", ORIGIN);
    installUrl.searchParams.set("install","1");
    if (TOKEN) installUrl.searchParams.set("_vercel_share",TOKEN);
    await page.goto(installUrl.toString(), {waitUntil:"networkidle", timeout:120000});
    await page.waitForTimeout(350);
    const dialog = page.locator('[role="dialog"][aria-label="Install ICONIC"]');
    check(`home ${view.key} install-dialog-explicit-query`, await dialog.count()===1, {});
    const file = `home-install__${view.key}__${SHA.slice(0,12)}.png`;
    await page.screenshot({path:path.join(outDir,file), fullPage:false});
    results.screenshots.push({route:"/",viewport:view.key,state:"install",file});
    const floatingQr = await page.locator('aside[aria-label="Scan to install app"]').count();
    check(`home ${view.key} no-floating-install-qr`, floatingQr===0, {floatingQr});

    await context.close();
  }

  // Legacy collection browser must redirect to product-first shop.
  const context = await browser.newContext({ viewport:{width:1440,height:1000} });
  const page = await context.newPage();
  await page.goto(urlFor("/tampa/nightmare-on-channelside/merch/worlds"), {waitUntil:"networkidle", timeout:120000});
  check("legacy-worlds-redirects-to-shop", page.url().includes("/tampa/nightmare-on-channelside/merch/shop"), {finalUrl:page.url()});
  await context.close();

  fs.writeFileSync(path.join(outDir,"qa.json"), JSON.stringify({...results, failures}, null, 2));
  await browser.close();

  console.log(JSON.stringify({checks:results.checks.length, failures:failures.length, outDir}, null, 2));
  if(failures.length) process.exit(1);
})().catch(err=>{
  fs.writeFileSync(path.join(outDir,"fatal.txt"), String(err && err.stack || err));
  console.error(err);
  process.exit(1);
});
