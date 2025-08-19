import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const authRoutes = ["/lookup"]
const noUserRoutes = ["/admindash"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route requires authentication
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  const isNoUserRoute = noUserRoutes.some((route) => pathname.startsWith(route))

  // Get the token
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })

  if ((isAuthRoute || isNoUserRoute) && !token) {
    console.log("User is not authenticated, redirecting to login")
    const url = new URL("/", request.url)
    return NextResponse.redirect(url)
  }

  const isStaff = token?.role === "admin" || token?.role === "owner" || false
  if (isNoUserRoute && !isStaff) {
    const url = new URL("/", request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
