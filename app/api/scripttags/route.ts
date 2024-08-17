import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const allowedOrigin = "https://medicals709.cafe24.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Cafe24-Api-Version",
};

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

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  console.log("api route handler accessToken @@@@", accessToken);

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token is missing" },
      { status: 401 }
    );
  }

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

    return NextResponse.json(response.data, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error to add ScriptTag:", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: corsHeaders,
  });
}
