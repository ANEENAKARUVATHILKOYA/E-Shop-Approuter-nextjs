import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware
 * This function runs before incoming requests are completed.
 * We will use it to simulate protecting a checkout route or inspecting cookies/headers.
 */
export function middleware(request: NextRequest) {
  // Example: Check for an authentication token or guest session cookie
  const session = request.cookies.get('session-token');

  // If a user tries to access a protected area (like checkout) without being logged in:
  if (request.nextUrl.pathname.startsWith('/checkout') && !session) {
    // Redirect them directly to the home page or a login page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Otherwise, allow the request to proceed completely normally
  return NextResponse.next();
}

/**
 * Configure which paths the middleware should run on.
 * We match our custom routes to keep performance fast.
 */
export const config = {
  matcher: ['/checkout/:path*', '/api/cart/:path*'],
};