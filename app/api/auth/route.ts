import { NextRequest, NextResponse } from "next/server";
import { adminClient } from "../../lib/cafe24Api";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const tokenResponse = await adminClient.getAccessToken({
      code,
      client_id: "2QWZnmrfYiZSL70c9jfMzL",
      client_secret: "6ESfbSGfGkhh2fmkx34NkS",
      redirect_uri: "https://cors-test-opal.vercel.app/auth",
    });

    const { access_token, refresh_token } = tokenResponse.data;

    const response = NextResponse.json({
      message: "Token acquired and stored in cookies",
    });

    response.cookies.set("access_token", access_token, {
      ...cookieOptions,
      maxAge: 7200, // 2시간 (7200초) 동안 유효
    });

    response.cookies.set("refresh_token", refresh_token, {
      ...cookieOptions,
      maxAge: 14 * 24 * 60 * 60, // 2주 동안 유효
    });

    return response;
  } catch (error) {
    console.error("Error getting access token:", error);

    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }
}
