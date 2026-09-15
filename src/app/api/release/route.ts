export const dynamic = 'force-dynamic';
export async function GET() {
  return Response.json({project:'iconic-website',commit:process.env.VERCEL_GIT_COMMIT_SHA||process.env.GITHUB_SHA||'local'}, {headers:{'Cache-Control':'no-store'}});
}
