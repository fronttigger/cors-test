import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { adminClient } from "@/app/lib/cafe24Api";
import { cookies } from "next/headers";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  path: "/",
};

const allowedOrigins = [
  "https://medicals709.cafe24.com",
  "https://medistorage.kr",
  "https://m.medistorage.kr",
];

const getCorsHeaders = (origin: string | null) => {
  return {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin || "")
      ? origin
      : allowedOrigins[0],
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Cafe24-Api-Version",
    "Access-Control-Allow-Credentials": "true",
  };
};

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    const data = await req.json();
    const cookieStore = cookies();
    let accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;
    const contentType = req.headers.get("Content-Type");
    const apiVersion = req.headers.get("X-Cafe24-Api-Version");

    if (!accessToken && refreshToken) {
      try {
        const tokenResponse = await adminClient.getAccessTokenUsingRefreshToken(
          {
            refresh_token: refreshToken,
            client_id: "2QWZnmrfYiZSL70c9jfMzL",
            client_secret: "6ESfbSGfGkhh2fmkx34NkS",
          }
        );

        const { access_token, refresh_token } = tokenResponse.data;
        accessToken = access_token;

        // 응답 생성 전에 쿠키를 설정하기 위해 저장
        const newCookies = {
          access_token: {
            value: access_token,
            maxAge: 6600, // 1시간 50분
          },
          refresh_token: {
            value: refresh_token,
            maxAge: 14 * 24 * 60 * 60, // 2주
          },
        };

        const response = await axios.put(
          `https://medicals709.cafe24api.com/api/v2/admin/categories/${params.id}`,
          data,
          {
            headers: {
              "Content-Type": contentType,
              Authorization: `Bearer ${accessToken}`,
              "X-Cafe24-Api-Version": apiVersion,
            },
          }
        );

        const nextResponse = NextResponse.json(response.data, {
          status: 200,
        });

        // CORS 헤더 설정
        Object.entries(corsHeaders).forEach(([key, value]) => {
          nextResponse.headers.set(key, value as string);
        });

        // 쿠키 설정
        Object.entries(newCookies).forEach(([name, { value, maxAge }]) => {
          nextResponse.cookies.set(name, value, {
            ...cookieOptions,
            maxAge,
          });
        });

        return nextResponse;
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        return NextResponse.json(
          { error: "Failed to refresh access token" },
          { status: 401 }
        );
      }
    }

    // 액세스 토큰이 있는 경우의 일반적인 요청 처리
    const response = await axios.put(
      `https://medicals709.cafe24api.com/api/v2/admin/categories/${params.id}`,
      data,
      {
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${accessToken}`,
          "X-Cafe24-Api-Version": apiVersion,
        },
      }
    );

    const nextResponse = NextResponse.json(response.data, {
      status: 200,
    });

    // CORS 헤더 설정
    Object.entries(corsHeaders).forEach(([key, value]) => {
      nextResponse.headers.set(key, value as string);
    });

    return nextResponse;
  } catch (error) {
    console.error("API Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  const response = new NextResponse(null, {
    status: 204,
  });

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value as string);
  });

  return response;
}
