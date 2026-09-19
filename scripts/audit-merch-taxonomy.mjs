const SHOPIFY_PRODUCTS_URL =
  process.env.ICONIC_NOC_PRODUCTS_URL ||
  "https://1tnkwp-vn.myshopify.com/collections/nightmare-on-channelside/products.json?limit=250";

const requiredTags = ["brand:noc","event:noc-2026","noc-2026"];
const expected = {
  "21-savage": [/^21 SAVAGE\b/i],
  "kodak-black": [/^KODAK BLACK\b/i],
  "dababy": [/^DA ?BABY\b/i],
  "meek-mill": [/^MEEK MILL\b/i],
  "bellygang-kush": [/^BELLY ?GANG KUSH\b/i,/^BELLYGANG KUSH\b/i],
  "yk-niece": [/^YK NIECE\b/i],
  "baby-drill": [/^BABY DRILL\b/i],
  "diamond-the-body": [/^DIAMOND THE BODY\b/i],
  "cheeksbossman-gemg": [/^CHEEKSBOSSMAN GEMG\b/i],
  tampa: [/^TAMPA\b/i],
  noc: [/^NOC\b/i],
  "halloween-culture": [/^HALLOWEEN\b/i],
  "halloween-2027": [/^HALLOWEEN\b/i],
};

function tagsOf(value){
  if(Array.isArray(value)) return value.map(String).map(v=>v.trim()).filter(Boolean);
  if(typeof value==="string") return value.split(",").map(v=>v.trim()).filter(Boolean);
  return [];
}

function subjectOf(tags){
  return tags.filter(tag=>tag.startsWith("subject:")).map(tag=>tag.slice(8));
}

const response = await fetch(SHOPIFY_PRODUCTS_URL, {
  headers: { accept:"application/json", "user-agent":"ICONIC-merch-taxonomy-audit/2.0" },
  cache:"no-store",
});
if(!response.ok){
  console.error(`Merch taxonomy audit could not load Shopify catalog: ${response.status}`);
  process.exit(2);
}

const payload=await response.json();
const products=Array.isArray(payload.products)?payload.products:[];
if(!products.length){
  console.error("Merch taxonomy audit found no live products.");
  process.exit(2);
}

const failures=[];
const counts={};
for(const product of products){
  const tags=tagsOf(product.tags);
  if(!requiredTags.every(tag=>tags.includes(tag))) continue;

  const subjects=subjectOf(tags);
  if(subjects.length!==1){
    failures.push({id:String(product.id),title:product.title,reason:"subject_tag_count",subjects});
    continue;
  }

  const subject=subjects[0];
  counts[subject]=(counts[subject]||0)+1;

  let pass=false;
  if(subject==="visual-qa-pending"){
    pass=tags.includes("qa:visual-identity-pending") &&
      tags.includes("tier:visual-qa-pending") &&
      /^NIGHTMARE ON CHANNELSIDE — /i.test(product.title);
  }else if(subject==="all-artist"){
    pass=/^ALL ARTIST\b/i.test(product.title) ||
      (/^NOC\b/i.test(product.title) && tags.includes("tier:lineup"));
  }else{
    const patterns=expected[subject];
    pass=Boolean(patterns?.some(pattern=>pattern.test(product.title)));
  }

  if(!pass){
    failures.push({
      id:String(product.id),
      title:product.title,
      reason:"subject_title_mismatch",
      subject,
      relevantTags:tags.filter(tag=>tag.startsWith("subject:")||tag.startsWith("tier:"))
    });
  }
}

const audited=Object.values(counts).reduce((sum,n)=>sum+n,0);
const result={source:SHOPIFY_PRODUCTS_URL,totalLive:products.length,audited,counts,failures};
console.log(JSON.stringify(result,null,2));

if(failures.length){
  console.error(`Merch taxonomy QA failed: ${failures.length} real subject-tag issue(s).`);
  process.exit(1);
}

console.log("PASS: Shopify subject taxonomy is structurally consistent. Visual subject QA remains a separate screenshot/manual-review gate.");
