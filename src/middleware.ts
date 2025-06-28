import { NextResponse, type NextRequest } from "next/server"

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""
  const currentHost = hostname.replace(`.${domainUrl}`, "")

  const url = request.nextUrl.clone()

  console.log({ currentHost })

  if (
    currentHost === "www" ||
    currentHost === "localhost" ||
    currentHost === domainUrl ||
    currentHost === ""
  ) {
    return NextResponse.next()
  }

  console.log("middleware", request.nextUrl.pathname)
  url.pathname = `/${currentHost}${url.pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
}
