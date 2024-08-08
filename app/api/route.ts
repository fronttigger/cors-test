import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const shop = searchParams.get("shop");

  const script = `
    (function() {
      console.log('카페24 플러그인이 ${shop}에 로드되었습니다.');
      // 여기에 동적으로 생성된 JavaScript 코드를 작성합니다.
    })();
  `;

  return new NextResponse(script, {
    headers: { "Content-Type": "application/javascript" },
  });
}
