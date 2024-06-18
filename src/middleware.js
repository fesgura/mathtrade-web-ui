import { NextResponse } from "next/server";
import { COOKIE_AUTH_TOKEN } from "./config/apiConfig";
import { PUBLIC_ROUTES } from "./config";

export async function middleware(request) {
  try {
    const token = request.cookies.get(COOKIE_AUTH_TOKEN);

    if (!token) {
      return NextResponse.redirect(
        new URL(
          PUBLIC_ROUTES.DEFAULT.path + "?redirect=" + request.url,
          request.url
        )
      );
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(
      new URL(
        PUBLIC_ROUTES.DEFAULT.path + "?redirect=" + request.url,
        request.url
      )
    );
  }
}

export const config = {
  matcher: "/mathtrade/:path*",
};
