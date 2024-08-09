import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error to add ScriptTag:", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
