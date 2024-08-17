import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { adminClient } from "./app/lib/cafe24Api";

function isServerRoute(path: string) {
  return path.startsWith("/api");
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (!isServerRoute(path)) {
    return NextResponse.next();
  }

  const response = await handleApiRequest(request);

  return response;
}

async function handleApiRequest(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  console.log("accessToken", accessToken);

  // 액세스 토큰 검증
  //   if (isTokenExpired(accessToken)) {
  //     const refreshToken = request.cookies.get("refreshToken")?.value;
  //     if (!refreshToken) {
  //       return handleUnauthorized(request);
  //     }

  //     // 리프레시 토큰으로 새 액세스 토큰 발급
  //     const newTokens = await refreshAccessToken(refreshToken);

  //     if (!newTokens) {
  //       return handleUnauthorized(request);
  //     }

  //     accessToken = newTokens.accessToken;

  //     // 새 토큰을 쿠키에 설정
  //     const response = NextResponse.next();
  //     response.cookies.set("accessToken", newTokens.accessToken, {
  //       httpOnly: true,
  //     });
  //     response.cookies.set("refreshToken", newTokens.refreshToken, {
  //       httpOnly: true,
  //     });

  //     return response;
  //   }

  // 유효한 액세스 토큰이 있는 경우
  const response = NextResponse.next();
  response.headers.set("Authorization", `Bearer ${accessToken}`);
  return response;
}

function isTokenExpired(token: string) {
  // 토큰 만료 여부 확인 로직
  // JWT를 사용한다면 decode하여 exp 필드를 확인
  // 예시:
  // const decodedToken = jwt.decode(token);
  // return decodedToken.exp * 1000 < Date.now();
}

async function refreshAccessToken(refreshToken: string) {
  // 리프레시 토큰을 사용하여 새 액세스 토큰 발급 로직
  // 예시:
  // const response = await fetch('your-auth-server/refresh', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ refreshToken }),
  // });
  // if (response.ok) {
  //   const data = await response.json();
  //   return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  // }
  // return null;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
