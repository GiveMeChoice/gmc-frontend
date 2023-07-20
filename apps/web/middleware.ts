import { NextRequest, NextResponse } from 'next/server';
const isPasswordEnabled = !!process.env.ACCESS_TOKEN;
export async function middleware(req: NextRequest) {
  if (isPasswordEnabled && !req.nextUrl.pathname.startsWith('/access')) {
    const accessToken = req.cookies.get('ACCESS_TOKEN_VALIDATED');
    if (!accessToken) {
      return NextResponse.redirect(new URL('/access', req.url));
    }
  } else if (!isPasswordEnabled && req.nextUrl.pathname.startsWith('/access')) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
