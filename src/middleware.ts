import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Define routes that require authentication
const signinRoutes = ["/lookup"]
const adminRoutes = ["/dashboard"]


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const isAuthRoute = signinRoutes.some((route) => pathname.startsWith(route))
    const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })

    if (isAuthRoute && !token) {
        const url = new URL("/login", request.url)
        url.searchParams.set("callbackUrl", encodeURI(pathname))


        return NextResponse.redirect(url)
    }
    if (isAdminRoute && (!token || token.role !== "admin")) {
        const url = new URL("/lookup", request.url)
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