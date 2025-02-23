import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isTauri = userAgent.includes('Tauri');
  const isWebLoginPage = request.nextUrl.pathname === '/login/web';

  // If it's a web browser (not Tauri)
  if (!isTauri) {
    // If not on web login page, redirect to web login
    if (!isWebLoginPage) {
      return NextResponse.redirect(new URL('/login/web', request.url));
    }
  } else {
    // If it's Tauri and trying to access web login, redirect to desktop login
    if (isWebLoginPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}; 