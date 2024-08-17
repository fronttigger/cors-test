import { NextRequest, NextResponse } from "next/server";
import { adminClient } from "./app/lib/cafe24Api";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

function isServerRoute(path: string): boolean {
  return path.startsWith("/api");
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!isServerRoute(path)) {
    return NextResponse.next();
  }

  if (accessToken) {
    console.log("accessToken if", accessToken);

    const response = NextResponse.next();

    response.headers.set("Authorization", `Bearer ${accessToken}`);
    response.headers.set("X-Cafe24-Api-Version", "2024-06-01");

    return response;
  }

  if (!accessToken && refreshToken) {
    const response = NextResponse.next();

    try {
      const tokenResponse = await adminClient.getAccessTokenUsingRefreshToken({
        refresh_token: refreshToken,
        client_id: "2QWZnmrfYiZSL70c9jfMzL",
        client_secret: "6ESfbSGfGkhh2fmkx34NkS",
      });

      const { access_token, refresh_token } = tokenResponse.data;

      adminClient.setAccessToken(access_token);

      response.cookies.set("access_token", access_token, {
        ...cookieOptions,
        maxAge: 6600, // 1시간 50분 (6600초) 동안 유효
      });
      response.cookies.set("refresh_token", refresh_token, {
        ...cookieOptions,
        maxAge: 14 * 24 * 60 * 60, // 2주 동안 유효
      });

      response.headers.set("Authorization", `Bearer ${access_token}`);
      response.headers.set("X-Cafe24-Api-Version", "2024-06-01");
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return NextResponse.redirect("/login");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
