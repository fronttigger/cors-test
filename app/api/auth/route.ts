import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../../lib/cafe24Api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await getAccessToken(code);

    return NextResponse.json({ success: true, accessToken });
  } catch (error) {
    console.error("OAuth 처리 중 에러:", error);

    return NextResponse.json(
      { error: "Failed to process OAuth" },
      { status: 500 }
    );
  }
}
