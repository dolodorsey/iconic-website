import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from '../.qa/node_modules/playwright/index.mjs';
const BASE=(process.env.QA_BASE_URL||'http://127.0.0.1:3100').replace(/\/$/,'');
const routes=['/','/events','/experiences','/music','/creators','/merch','/partners','/media'];
const completionRoutes=['/summer-walker','/summer-walker/miami','/dj-snake-pardon-my-french','/dj-snake-pardon-my-french/los-angeles','/atlanta','/atlanta/halloween','/about','/contact','/access','/book','/social','/tampa-halloween','/tampa/nightmare-on-channelside','/ball-series','/series/21-plus','/series/30-plus'];
const sizes=[{name:'desktop',width:1440,height:1000},{name:'tablet',width:768,height:1024},{name:'mobile',width:390,height:844},{name:'narrow',width:375,height:812}];
const report={commit:process.env.QA_COMMIT||'unknown',baseUrl:BASE,checkedAt:new Date().toISOString(),pages:[],completionPages:[],failures:[],notes:['Browser form tests mock delivery. They verify UI behavior, not backend persistence.','Do not label source-build screenshots as Vercel preview screenshots.']};
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
    await page.waitForTimeout(900);
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
 for(const size of [sizes[0],sizes[2]]){
  const page=await browser.newPage({viewport:{width:size.width,height:size.height},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const path of completionRoutes){const entry={path,viewport:size.name};try{const res=await page.goto(BASE+path,{waitUntil:'domcontentloaded',timeout:60000});assert(res?.ok(),'Page did not return success');await page.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,35))}scrollTo(0,0)});await page.waitForTimeout(500);entry.brokenImages=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.currentSrc||i.src));assert.equal(entry.brokenImages.length,0,'Broken image');const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));assert(dims.scroll<=dims.viewport+1,`Horizontal overflow ${JSON.stringify(dims)}`);assert.equal(await page.locator('main').count(),1,'Exactly one main landmark');assert.equal(await page.locator('h1').count(),1,'Exactly one H1');assert.equal(errors.length,0,`Browser exception: ${errors.join('; ')}`);
    if(path==='/summer-walker')assert((await page.locator('img').evaluateAll(xs=>xs.map(x=>x.getAttribute('src')))).some(x=>x?.includes('iconic-soul-symphony-verified-2026-09-15.webp')),'Soul Symphony canonical poster missing');
    if(path==='/dj-snake-pardon-my-french')assert((await page.locator('img').evaluateAll(xs=>xs.map(x=>x.getAttribute('src')))).some(x=>x?.includes('iconic-pardon-my-french-verified-2026-09-15.webp')),'PMF canonical poster missing');
    if(path==='/atlanta/halloween'){const text=await page.locator('body').innerText();assert(!text.includes('Nightmare on Channelside — ICONIC Atlanta'),'Atlanta must not impersonate Tampa property');assert(!text.includes('October 31, 2026'),'Atlanta Halloween must not publish Tampa date')}
    const title='completion-'+path.slice(1).replaceAll('/','-');await page.screenshot({path:`qa-evidence/${title}-${size.name}-full.png`,fullPage:true});entry.status='pass';
  }catch(e){entry.status='fail';entry.error=e.message;report.failures.push(`${path} completion ${size.name}: ${e.message}`);await page.screenshot({path:`qa-evidence/failure-completion-${path.slice(1).replaceAll('/','-')}-${size.name}.png`,fullPage:true}).catch(()=>{})}report.completionPages.push(entry);errors.length=0}
  await page.close();
 }
 const p=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});await p.goto(BASE,{waitUntil:'networkidle'});await p.getByTestId('motion-toggle').click();assert.equal(await p.getByTestId('home-canvas').getAttribute('data-motion'),'paused');await p.getByTestId('motion-toggle').click();assert.equal(await p.getByTestId('home-canvas').getAttribute('data-motion'),'playing');
 for(const [path,intent] of [['/music','music'],['/creators','creator'],['/media','media']]){
  let payload;await p.route('**/api/iconic-leads',async r=>{payload=r.request().postDataJSON();await r.fulfill({status:201,contentType:'application/json',body:'{"ok":true}'});});await p.route('**/api/event-track',r=>r.fulfill({status:201,contentType:'application/json',body:'{"ok":true}'}));
  await p.goto(BASE+path,{waitUntil:'networkidle'});const form=p.locator('form').last();await form.locator('[name="full_name"]').fill('ICONIC QA');await form.locator('[name="email"]').fill('iconic-ui-qa@example.com');await form.locator('button[type="submit"]').click();await p.getByText('Request received',{exact:true}).waitFor({timeout:10000});assert.equal(payload.intent,intent);assert.equal(await form.locator('[role="alert"]').count(),0,'A successful response must not become a form error');await p.unroute('**/api/iconic-leads');await p.unroute('**/api/event-track');
 }
 const personnelForms=[
  ['/partners/apply/promoter-commission','promoter_commission'],
  ['/partners/apply/promoter-comp','promoter_comp'],
  ['/partners/apply/ambassador-model','ambassador_model'],
  ['/partners/apply/podcast','podcast_partner'],
  ['/partners/apply/dj-promo','dj_promo'],
  ['/partners/apply/host-promo','host_promo'],
  ['/partners/apply/dj-performance','dj_performance'],
  ['/partners/apply/host-performance','host_performance'],
  ['/partners/apply/street-team','street_team']
 ];
 for(const [path,expectedRole] of personnelForms){
  let payload;await p.route('**/api/noc-partner-apply',async r=>{payload=r.request().postDataJSON();await r.fulfill({status:201,contentType:'application/json',body:JSON.stringify({ok:true,pipeline:'qa'})});});
  await p.goto(BASE+path,{waitUntil:'networkidle'});const form=p.locator('form').last();await form.locator('[name="full_name"]').fill('ICONIC QA');await form.locator('[name="email"]').fill('iconic-personnel-qa@example.com');await form.locator('[name="phone"]').fill('5555550199');const city=form.locator('[name="city"]');await city.selectOption({index:1});
  for(const input of await form.locator('input[required]').all()){const type=await input.getAttribute('type');const name=await input.getAttribute('name');if(['full_name','email','phone'].includes(name))continue;if(type==='checkbox'){await input.check();continue}if(type==='url')await input.fill('https://example.com/qa');else if(type==='number')await input.fill('10');else await input.fill('ICONIC QA')}
  for(const ta of await form.locator('textarea[required]').all())await ta.fill('ICONIC QA required response');
  for(const sel of await form.locator('select[required]').all()){if(await sel.getAttribute('name')==='city')continue;await sel.selectOption({index:1})}
  await form.locator('button[type="submit"]').click();await p.getByText('APPLICATION RECEIVED',{exact:true}).waitFor({timeout:10000});assert.equal(payload.requested_role,expectedRole);assert.equal(await p.locator('form [role="alert"]').count(),0,'Personnel success must not become form error');await p.unroute('**/api/noc-partner-apply');
 }
 report.formUI='pass; mocked inquiry + all nine personnel form submissions';await p.close();
}catch(e){report.failures.push(e.message);}finally{await browser.close();await fs.writeFile('qa-evidence/report.json',JSON.stringify(report,null,2));}
console.log(JSON.stringify({pages:report.pages.length,completionPages:report.completionPages.length,failures:report.failures,formUI:report.formUI},null,2));if(report.failures.length)process.exit(1);
