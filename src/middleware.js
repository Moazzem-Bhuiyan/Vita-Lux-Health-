import { NextResponse } from 'next/server';

export function middleware(request) {
  const { nextUrl, cookies } = request;

  const token = cookies.get('vitalux_token')?.value;
  const pathname = nextUrl.pathname;

  const protectedRoutes = ['/mybookings', '/profile'];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);

    loginUrl.searchParams.set('redirect', pathname);

    return NextResponse.redirect(loginUrl);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/mybookings/:path*', '/profile/:path*'],
};
