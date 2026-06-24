import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ar']
const defaultLocale = 'en'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Dashboard routes: auth protection ─────────────────────────────────────
  if (pathname.startsWith('/dashboard')) {
    let response = NextResponse.next({ request })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Refresh session — must happen before any route decision
    const { data: { user } } = await supabase.auth.getUser()

    if (!user && pathname !== '/dashboard/login') {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }

    if (user && pathname === '/dashboard/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
  }

  // ── Public routes: locale redirect ────────────────────────────────────────
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo.svg|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
}
