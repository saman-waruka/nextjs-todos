import { CREDENTIAL } from "@/constants/keyValue";
import { ROUTE } from "@/constants/route";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(" Activate middleware ", request.url);
  // console.log("headers", request.headers);
  if (request.url.match(/(robots|sitemap)/)) {
    return NextResponse.next();
  }

  try {
    const cookieToken = request.cookies.get(CREDENTIAL.ACCESS_TOKEN);
    if (!cookieToken) {
      const url = new URL(ROUTE.LOGIN, request.url);
      return NextResponse.redirect(url);
    }

    const token = cookieToken.value;
  } catch (error) {
    const url = new URL(ROUTE.LOGIN, request.url);
    console.error("Middleware error\n", error);
    NextResponse.redirect(url);
  }
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: ["/", `/todos/:path*`],
};
