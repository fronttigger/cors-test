import { NextRequest, NextResponse } from "next/server";
import { adminClient } from "../../lib/cafe24Api";

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

    return NextResponse.json(tokenResponse.data);
  } catch (error) {
    console.error("Error getting access token:", error);

    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }
}
