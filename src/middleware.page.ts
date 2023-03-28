import { chainMiddlewares, withHeaders, withLogging } from '@/shared/lib/next/middlewares';

export default chainMiddlewares([withLogging, withHeaders]);

export const config = {
  matcher: [
    '/',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|static/images|_next/static|_next/image|site.webmanifest|robots.txt).*)',
  ],
};
