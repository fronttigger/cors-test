import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const Authorization = req.headers.get("Authorization");
    const cafe24ApiVersion = req.headers.get("X-Cafe24-Api-Version");

    const response = await axios.post(
      "https://medicals709.cafe24api.com/api/v2/admin/scripttags",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization,
          "X-Cafe24-Api-Version": cafe24ApiVersion,
        },
        withCredentials: true,
      }
    );

    console.log("response", response);

    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error to add ScriptTag:", err as AxiosError);

    // 에러 응답 데이터 출력 및 전송
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
      console.error("Response headers:", err.response.headers);
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
