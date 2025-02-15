import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is not logged in and trying to access any page other than login or auth-success
  if (!session && 
      !req.nextUrl.pathname.startsWith('/login') && 
      !req.nextUrl.pathname.startsWith('/auth-success')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If user is logged in and trying to access login page, redirect to dashboard
  if (session && req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If user is logged in and accessing root, redirect to dashboard
  if (session && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)', '/']
}; 