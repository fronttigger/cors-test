import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const data = req.json();

  const authorizationHeader = req.headers.get("authorization");
  const cafe24ApiVersion = req.headers.get("X-Cafe24-Api-Version");

  try {
    const response = await axios.post(
      "https://medicals709.cafe24api.com/api/v2/admin/scripttags",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationHeader,
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
    console.error("Error to add ScriptTag:", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
