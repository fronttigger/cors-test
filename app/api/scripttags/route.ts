import { NextRequest, NextResponse } from "next/server";
import { addScriptTag } from "../../lib/cafe24Api";

export async function POST(req: NextRequest) {
  const { accessToken, mallId } = await req.json();

  try {
    const result = await addScriptTag(accessToken, mallId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("ScriptTag 추가 중 에러:", error);

    return NextResponse.json(
      { error: "Failed to add ScriptTag" },
      { status: 500 }
    );
  }
}
