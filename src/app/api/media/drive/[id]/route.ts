import { NextRequest } from "next/server";

const DRIVE_ID=/^[A-Za-z0-9_-]{10,}$/;
export async function GET(request:NextRequest, context:{params:Promise<{id:string}>}){
  const {id}=await context.params;
  if(!DRIVE_ID.test(id)) return new Response("Invalid media id",{status:400});
  const range=request.headers.get("range");
  const upstream=await fetch(`https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`,{
    redirect:"follow",
    headers:range?{Range:range}:undefined,
    cache:"no-store",
  });
  if(!upstream.ok && upstream.status!==206) return new Response("Media unavailable",{status:upstream.status||502});
  const headers=new Headers();
  for(const key of ["content-type","content-length","content-range","accept-ranges"]){const value=upstream.headers.get(key);if(value)headers.set(key,value)}
  headers.set("Cache-Control","public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800");
  headers.set("CDN-Cache-Control","public, s-maxage=86400, stale-while-revalidate=604800");
  headers.set("Vercel-CDN-Cache-Control","public, s-maxage=86400, stale-while-revalidate=604800");
  headers.set("X-Content-Type-Options","nosniff");
  return new Response(upstream.body,{status:upstream.status,headers});
}
