import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Authentication is commented out for now
  /*
  // Get the path of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/register" || path === "/" || path.startsWith("/u/")

  // Get the token from the cookies
  const token = request.cookies.get("auth_token")?.value || ""

  // Redirect logic
  if (isPublicPath && token) {
    // If user is on a public path but has a token, redirect to dashboard
    if (path !== "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  if (!isPublicPath && !token) {
    // If user is on a protected path but doesn't have a token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }
  */

  return NextResponse.next()
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*", "/u/:path*"],
}
