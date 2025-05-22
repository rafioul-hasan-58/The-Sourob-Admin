import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/login";

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const userInfo = await getUser();

  // Allow access to /login and any subpath (like query strings)
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // If not logged in, redirect to login
  if (!userInfo) {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, req.url)
    );
  }

  // If logged in, allow access
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
