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

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error to add ScriptTag:", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await axios.get(
      "https://medicals709.cafe24api.com/api/v2/admin/scripttags/count",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 05EHR6ahJ9tjcEprFm23ED",
          "X-Cafe24-Api-Version": "2024-06-01",
        },
        withCredentials: true,
      }
    );

    return new Response(response.data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error to add ScriptTag:", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
