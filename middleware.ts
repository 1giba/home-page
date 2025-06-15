import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import createIntlMiddleware from 'next-intl/middleware';

// Create the internationalization middleware handler
const intlMiddleware = createIntlMiddleware({
  // The locales that your application supports
  locales: routing.locales,

  // The default locale to use when visiting a non-localized route
  defaultLocale: 'pt-BR',

  // For default locale, don't add prefix to URL
  localePrefix: 'as-needed',
});

// Map of routes to their corresponding anchor links on the homepage
const routeToAnchorMap: Record<string, string> = {
  'about': '#about',
  'services': '#services',
  'contact': '#contact'
};

// Regular expression to detect mobile user agents
const MOBILE_USER_AGENT_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

// Main middleware function
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Handle internationalization first
  const response = intlMiddleware(request);
  
  // After locale is resolved, check if this is a mobile device and if the path matches our route map
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = MOBILE_USER_AGENT_REGEX.test(userAgent);
  
  // Only redirect if it's a mobile device and it's one of our SEO routes
  // Format of pathname could be /en-US/about or /pt-BR/services or /about (defaultLocale)
  if (isMobile) {
    // Extract the locale and path
    const segments = pathname.split('/');
    let locale = routing.defaultLocale;
    let path = '';
    
    // Handle paths with explicit locale
    if (segments.length > 2 && routing.locales.includes(segments[1])) {
      locale = segments[1];
      path = segments[2] || '';
    } 
    // Handle paths with default locale (no locale prefix)
    else if (segments.length > 1) {
      path = segments[1];
    }
    
    // If this path should be redirected to an anchor
    if (routeToAnchorMap[path]) {
      const url = new URL(request.nextUrl.origin);
      
      // Add the locale prefix if it's not the default locale
      if (locale !== routing.defaultLocale) {
        url.pathname = `/${locale}`;
      }
      
      // Add the anchor link
      url.hash = routeToAnchorMap[path];
      
      // Return a 302 (temporary) redirect
      return NextResponse.redirect(url);
    }
  }
  
  // No need to redirect, continue with the internationalization middleware's response
  return response;
}

export const config = {
  // Match only internationalized pathnames
  // Skip public files and API routes
  matcher: [
    // Match all pathnames except for
    // - API routes: /api/...
    // - Static files: /favicon.ico, /images/..., etc
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};
