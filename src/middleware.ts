import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_AUTH_TOKEN } from "./config/apiConfig";
import { PUBLIC_ROUTES } from "./config";

// Logged out → sign-in, remembering the full path + query (e.g. an item
// permalink `/mathtrade?item=123`). Only the path goes in `redirect`, encoded,
// so its own `?`/`&` survive; useSignIn re-checks it is same-origin.
const toSignIn = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  return NextResponse.redirect(
    new URL(
      `${PUBLIC_ROUTES.DEFAULT.path}?redirect=${encodeURIComponent(
        pathname + search
      )}`,
      request.url
    )
  );
};

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_AUTH_TOKEN);

    if (!token) {
      return toSignIn(request);
    }

    return NextResponse.next();
  } catch (e) {
    return toSignIn(request);
  }
}

export const config = {
  matcher: "/mathtrade/:path*",
};
