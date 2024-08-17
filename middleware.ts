import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminClient } from "./app/lib/cafe24Api";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://medicals709.cafe24.com",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Cafe24-Api-Version",
};

function isExcludedPath(path: string): boolean {
  const excludedPaths = ["/api/auth"];

  return excludedPaths.some((excludedPath) => path.startsWith(excludedPath));
}

function isServerRoute(path: string) {
  return path.startsWith("/api");
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const response = NextResponse.next();

  if (!isServerRoute(path) || isExcludedPath(path)) {
    return NextResponse.next();
  }

  response.headers.set(
    "Access-Control-Allow-Origin",
    corsHeaders["Access-Control-Allow-Origin"]
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    corsHeaders["Access-Control-Allow-Methods"]
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    corsHeaders["Access-Control-Allow-Headers"]
  );

  if (request.method === "OPTIONS") {
    return response;
  }

  if (accessToken) {
    response.headers.set("Content-Type", `application/json`);
    response.headers.set("Authorization", `Bearer ${accessToken}`);
    response.headers.set("X-Cafe24-Api-Version", "2024-06-01");

    return response;
  }

  if (!accessToken && refreshToken) {
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

      response.headers.set("Content-Type", `application/json`);
      response.headers.set("Authorization", `Bearer ${accessToken}`);
      response.headers.set("X-Cafe24-Api-Version", "2024-06-01");

      return response;
    } catch (error) {
      console.error("Failed to refresh access token:", error);

      return NextResponse.redirect("/login");
    }
  }
}

export const config = {
  matcher: ["/((?!api/auth|api|_next/static|_next/image|favicon.ico).*)"],
};
