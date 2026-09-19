const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');

const BASE=(process.env.NOC_GIVEAWAY_BASE||'http://127.0.0.1:3000').replace(/\/$/,'');
const OUT='giveaway-evidence';
const routes=[
  {path:'/tampa/nightmare-on-channelside/giveaways',key:'giveaway-hub'},
  {path:'/tampa/nightmare-on-channelside/giveaways/official-rules',key:'official-rules'}
];
const sizes=[
  {name:'desktop',width:1440,height:1000},
  {name:'mobile',width:390,height:844}
];

const report={base:BASE,sha:process.env.GITHUB_SHA||null,started_at:new Date().toISOString(),pages:[],failures:[]};

async function settle(page){
  await page.evaluate(async()=>{
    await document.fonts.ready;
    await Promise.race([
      Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),
      new Promise(r=>setTimeout(r,10000))
    ]);
    window.scrollTo(0,0);
  });
  await page.waitForTimeout(1000);
}

(async()=>{
  await fs.mkdir(OUT+'/screenshots',{recursive:true});
  let ready=false;
  for(let i=0;i<90;i++){
    try{if((await fetch(BASE+'/api/release')).ok){ready=true;break}}catch{}
    await new Promise(r=>setTimeout(r,1000));
  }
  if(!ready) throw new Error('Local candidate did not become ready');

  const browser=await chromium.launch({headless:true});
  try{
    for(const size of sizes){
      const ctx=await browser.newContext({viewport:{width:size.width,height:size.height},reducedMotion:'reduce'});
      for(const route of routes){
        const page=await ctx.newPage();
        const row={route:route.path,viewport:size.name,width:size.width,problems:[]};
        const errors=[];
        page.on('pageerror',e=>errors.push(e.message));
        try{
          const res=await page.goto(BASE+route.path,{waitUntil:'networkidle',timeout:60000});
          row.status=res?.status();
          await settle(page);
          const state=await page.evaluate(()=>({
            title:document.title,
            h1:[...document.querySelectorAll('h1')].map(x=>x.textContent?.trim()),
            mains:document.querySelectorAll('main').length,
            scrollWidth:document.documentElement.scrollWidth,
            viewport:innerWidth,
            text:document.body.innerText,
            forms:document.querySelectorAll('form').length,
            broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.currentSrc||i.src)
          }));
          Object.assign(row,state,{errors});
          assert.equal(row.status,200,'HTTP status');
          assert.equal(row.mains,1,'Exactly one main landmark');
          assert.equal(row.h1.length,1,'Exactly one H1');
          assert(row.scrollWidth<=size.width+1,'No horizontal overflow');
          assert.equal(row.broken.length,0,'No broken images');
          assert.equal(errors.length,0,'No page exceptions');

          if(route.key==='giveaway-hub'){
            assert(row.text.replace(/\\s+/g,' ').includes('THE DOOR IS NOT OPEN YET.'),'Locked-state headline missing');
            assert(row.text.includes('NO PURCHASE NECESSARY'),'No-purchase disclosure missing');
            assert.equal(row.forms,0,'Entry form must not render before launch');
          }
          if(route.key==='official-rules'){
            assert(row.text.includes('DRAFT · NOT YET ACTIVE'),'Draft rules warning missing');
            assert(row.text.includes('NO PURCHASE NECESSARY'),'Rules no-purchase disclosure missing');
          }

          row.screenshot=`screenshots/${route.key}-${size.name}.png`;
          await page.screenshot({path:OUT+'/'+row.screenshot,fullPage:true,animations:'disabled',timeout:60000});
        }catch(e){
          row.problems.push(e.message);
          report.failures.push({route:route.path,viewport:size.name,error:e.message});
          await page.screenshot({path:`${OUT}/screenshots/failure-${route.key}-${size.name}.png`,fullPage:true}).catch(()=>{});
        }finally{
          report.pages.push(row);
          await page.close();
        }
      }
      await ctx.close();
    }
  }finally{
    await browser.close();
  }

  report.finished_at=new Date().toISOString();
  await fs.writeFile(OUT+'/report.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(report.failures.length) process.exit(1);
})().catch(async e=>{
  report.failures.push({fatal:e.stack||e.message});
  await fs.mkdir(OUT,{recursive:true});
  await fs.writeFile(OUT+'/report.json',JSON.stringify(report,null,2));
  console.error(e);
  process.exit(1);
});