import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from '../.qa/node_modules/playwright/index.mjs';
const BASE=(process.env.QA_BASE_URL||'http://127.0.0.1:3100').replace(/\/$/,'');
const routes=['/','/events','/experiences','/music','/creators','/merch','/partners','/media'];
const sizes=[{name:'desktop',width:1440,height:1000},{name:'tablet',width:768,height:1024},{name:'mobile',width:390,height:844},{name:'narrow',width:375,height:812}];
const report={commit:process.env.QA_COMMIT||'unknown',baseUrl:BASE,checkedAt:new Date().toISOString(),pages:[],failures:[],notes:['Browser form tests mock delivery. They verify UI behavior, not backend persistence.','Do not label source-build screenshots as Vercel preview screenshots.']};
await fs.mkdir('qa-evidence',{recursive:true});
for(let i=0;i<30;i++){try{if((await fetch(BASE)).ok)break;}catch{}await new Promise(r=>setTimeout(r,1000));}
const browser=await chromium.launch({headless:true});
try{
 for(const size of sizes){
  const page=await browser.newPage({viewport:{width:size.width,height:size.height},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const path of routes){
   const entry={path,viewport:size.name,errors:[]};
   try{
    const res=await page.goto(BASE+path,{waitUntil:'networkidle',timeout:60000});assert(res?.ok(),'Page did not return success');
    await page.locator('[data-design-version="2.0.0"]').waitFor();
    await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);await document.fonts.ready;});
    await page.waitForTimeout(1800);
    entry.brokenImages=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>({src:i.currentSrc||i.src,alt:i.alt})));
    entry.imageSizes=await page.locator('img').evaluateAll(imgs=>imgs.map(i=>({src:i.currentSrc||i.src,width:i.naturalWidth,height:i.naturalHeight})));
    assert.equal(entry.brokenImages.length,0,'Broken image');
    const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));assert(dimensions.scroll<=dimensions.viewport+1,`Horizontal overflow ${JSON.stringify(dimensions)}`);
    assert.equal(await page.locator('main').count(),1,'Exactly one main landmark');assert.equal(await page.locator('h1').count(),1,'Exactly one H1');
    assert.equal(errors.length,0,`Browser exception: ${errors.join('; ')}`);
    if(path==='/'){
     const canvas=page.getByTestId('home-canvas');assert.equal((await canvas.innerText()).trim(),'','No text over homepage motion');assert.equal(await canvas.locator('h1,h2,h3,p,a,button,span').count(),0,'No text/CTA elements inside canvas');
     const hb=await canvas.boundingBox(),h1=await page.locator('h1').boundingBox(),nav=await page.getByTestId('site-header').boundingBox();assert(h1.y>=hb.y+hb.height,'H1 must be below canvas');assert(nav.y+nav.height<=hb.y+1,'Header must not overlap canvas');
     assert.equal(await canvas.getAttribute('data-motion'),'paused','Reduced motion must pause');
    }
    const title=path==='/'?'home':path.slice(1);await page.screenshot({path:`qa-evidence/${title}-${size.name}-viewport.png`,fullPage:false});await page.screenshot({path:`qa-evidence/${title}-${size.name}-full.png`,fullPage:true});
    entry.status='pass';
   }catch(e){entry.status='fail';entry.errors.push(e.message);report.failures.push(`${path} ${size.name}: ${e.message}`);await page.screenshot({path:`qa-evidence/failure-${path==='/'?'home':path.slice(1)}-${size.name}.png`,fullPage:true}).catch(()=>{});}
   report.pages.push(entry);errors.length=0;
  }
  await page.close();
 }
 const p=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});await p.goto(BASE,{waitUntil:'networkidle'});await p.getByTestId('motion-toggle').click();assert.equal(await p.getByTestId('home-canvas').getAttribute('data-motion'),'paused');await p.getByTestId('motion-toggle').click();assert.equal(await p.getByTestId('home-canvas').getAttribute('data-motion'),'playing');
 for(const [path,intent] of [['/music','music'],['/creators','creator'],['/partners','sponsorship'],['/media','media']]){
  let payload;await p.route('**/api/iconic-leads',async r=>{payload=r.request().postDataJSON();await r.fulfill({status:201,contentType:'application/json',body:'{"ok":true}'});});await p.route('**/api/event-track',r=>r.fulfill({status:201,contentType:'application/json',body:'{"ok":true}'}));
  await p.goto(BASE+path,{waitUntil:'networkidle'});const form=p.locator('form').last();await form.locator('[name="full_name"]').fill('ICONIC QA');await form.locator('[name="email"]').fill('iconic-ui-qa@example.com');await form.locator('button[type="submit"]').click();await p.getByText('Request received',{exact:true}).waitFor({timeout:10000});assert.equal(payload.intent,intent);assert.equal(await form.locator('[role="alert"]').count(),0,'A successful response must not become a form error');await p.unroute('**/api/iconic-leads');await p.unroute('**/api/event-track');
 }
 report.formUI='pass; mocked network only';await p.close();
}catch(e){report.failures.push(e.message);}finally{await browser.close();await fs.writeFile('qa-evidence/report.json',JSON.stringify(report,null,2));}
console.log(JSON.stringify({pages:report.pages.length,failures:report.failures,formUI:report.formUI},null,2));if(report.failures.length)process.exit(1);
