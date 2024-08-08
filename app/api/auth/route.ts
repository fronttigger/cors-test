import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../../lib/cafe24Api";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  try {
    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is missing" },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken(code, "medicals709");

    return NextResponse.json({ success: true, accessToken });
  } catch (error) {
    console.error("OAuth 처리 중 에러:", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
