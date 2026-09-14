import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const read=p=>fs.readFileSync(p,'utf8');
const base='src/app/_cinematic/';
const sources=['index.tsx','MotionCanvas.tsx','assets.ts'].map(p=>read(base+p));
const [site,motion,assets]=sources;
const extract=(text,name)=>text.match(new RegExp(`(?:const|export const)\\s+${name}\\s*=\\s*['\"]([^'\"]+)['\"]`))?.[1];
assert.equal(extract(assets,'SUMMER_VISUAL'),extract(read('src/app/summer-walker/page.tsx'),'SUMMER_VISUAL'),'Soul Symphony artwork drift');
assert.equal(extract(assets,'PMF_VISUAL'),extract(read('src/app/dj-snake-pardon-my-french/page.tsx'),'DJ_VISUAL'),'PMF artwork drift');
assert.match(assets,/src: NOC_MEDIA\.headliners/,'NOC must use its own approved artwork');
assert.match(assets,/hero:\s*['\"][^'\"]*iconic-homescreen-animation-v2\.webp/,'Homepage must use the owner-supplied HOMESCREEN ANI derivative');
assert.match(assets,/homePoster:\s*['\"][^'\"]*iconic-homescreen-poster-v2\.webp/,'Homepage reduced-motion/pause poster missing');
assert.match(assets,/crowd:\s*['\"][^'\"]*iconic-concert-animation-v2\.webp/,'Events must use the owner-supplied CONCERT ANI derivative');
assert.doesNotMatch(assets,/hero:\s*['\"][^'\"]*iconic-concert-animation/,'Concert animation may not replace homepage animation');
assert.doesNotMatch(assets,/crowd:\s*['\"][^'\"]*iconic-homescreen-animation/,'Homescreen animation may not be repurposed as the Events animation');
assert.match(assets,/greekBall:\s*['\"][^'\"]*iconic-greek-ball-original-web\.webp/,'Greek Ball must use stable original artwork');
assert.match(site,/w\.src/,'World cards must consume the semantic registry');
assert.match(site,/p\.primary_image_url/,'Products must use actual product images');
assert.match(site,/formatPrice\(p\.price_cents\)/,'Products must use actual catalog prices');
assert.match(site,/getMerchCatalog\(\)/,'Live catalog integration must remain');
assert.match(site,/<MotionCanvas\/>/,'Homepage motion must remain');
assert.match(site,/<Intro eyebrow="ICONIC \/ LIVE ENTERTAINMENT & CULTURE"/,'Homepage H1 must remain outside canvas');
assert.match(site,/CinematicEvents[\s\S]*?<Opener src=\{ART\.crowd\}/,'Events page must use CONCERT ANI away from homepage');
assert.match(motion,/ART\.homePoster\s*:\s*ART\.hero/,'Pause/reduced-motion must swap the homescreen animation to its static poster');
assert.match(motion,/ICONIC HOMESCREEN ANI\(1\)\.mp4/,'Homepage source provenance comment/data must remain');
for(const phrase of ['HALLOWS','LEGACY BOMBER','ORIGINS','ICONIC x NIKE','ALLIANZ ARENA','VEUVE CLICQUOT','iconic.world','No fake product grids','No recycled campaign photography','Move through the platform without visual clutter']) assert(!sources.join('\n').includes(phrase),`Disallowed mockup or internal copy: ${phrase}`);
for(const pattern of [/gallery\s*\[.*%/,/gallery\.slice\(/,/placehold\.co|picsum\.photos|unsplash\.com/]) assert(!pattern.test(sources.join('\n')),'Random or placeholder imagery is forbidden');
const parsed=ts.createSourceFile('MotionCanvas.tsx',motion,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
let canvases=0;
function visit(node){
 if(ts.isJsxElement(node)){
  const attrs=node.openingElement.attributes.properties;
  const isCanvas=attrs.some(a=>ts.isJsxAttribute(a)&&a.name.getText(parsed)==='data-testid'&&a.initializer&&ts.isStringLiteral(a.initializer)&&a.initializer.text==='home-canvas');
  if(isCanvas){canvases++;for(const c of node.children){if(ts.isJsxText(c))assert(!c.text.trim(),'Canvas must contain no visible text');else if(ts.isJsxSelfClosingElement(c)){assert.equal(c.tagName.getText(parsed),'img','Only the approved animation image/paused poster is allowed inside canvas');assert(!c.attributes.properties.some(a=>ts.isJsxAttribute(a)&&a.name.getText(parsed).startsWith('on')),'Canvas image must not carry interaction handlers');}else if(ts.isJsxExpression(c)){assert(!c.expression,'Canvas may only contain whitespace/comment expressions');}else assert.fail('Canvas must not accept nested text, components or interactive content');}}
 }
 ts.forEachChild(node,visit);
}
visit(parsed);assert.equal(canvases,1,'Exactly one clean homepage canvas required');
for(const [route,exportName] of [['','Home'],['events','Events'],['music','Music'],['creators','Creators'],['experiences','Experiences'],['partners','Partners'],['media','Media'],['merch','Merch']])assert.match(read(`src/app/${route?route+'/':''}page.tsx`),new RegExp(`Cinematic${exportName}`),'Live route must use governed component');
assert.match(read(base+'cinematic.module.css'),/prefers-reduced-motion/,'Reduced motion required');
assert.match(motion,/data-testid="motion-toggle"/,'Pause control must remain outside canvas');
assert(fs.existsSync('docs/ICONIC_UI_PRODUCTION_STANDARD.md'),'Preserve v1 SOP');
assert(fs.existsSync('docs/standards/iconic-v2/README.md'),'v2 standard required');
assert(fs.existsSync('docs/standards/iconic-v2/ANIMATION_ASSET_ASSIGNMENT_2.1.md'),'v2.1 animation assignment standard required');
console.log('PASS: ICONIC cinematic governance, exact animation assignment, clean canvas, correct property art and live commerce contracts.');
