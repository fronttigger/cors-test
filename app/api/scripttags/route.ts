import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const allowedOrigin = "https://medicals709.cafe24.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Cafe24-Api-Version",
  "Access-Control-Allow-Credentials": "true",
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const accessToken = req.cookies.get("access_token")?.value;
    const contentType = req.headers.get("Content-Type");
    const apiVersion = req.headers.get("X-Cafe24-Api-Version");

    const response = await axios.post(
      "https://medicals709.cafe24api.com/api/v2/admin/scripttags",
      data,
      {
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${accessToken}`,
          "X-Cafe24-Api-Version": apiVersion,
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
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    const contentType = req.headers.get("Content-Type");
    const apiVersion = req.headers.get("X-Cafe24-Api-Version");

    const response = await axios.get(
      "https://medicals709.cafe24api.com/api/v2/admin/scripttags/count",
      {
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${accessToken}`,
          "X-Cafe24-Api-Version": apiVersion,
        },
        withCredentials: true,
      }
    );

    const nextResponse = NextResponse.json(response.data, {
      status: 200,
    });

    Object.entries(corsHeaders).forEach(([key, value]) => {
      nextResponse.headers.set(key, value);
    });

    return nextResponse;
  } catch (error) {
    console.error("Error to add ScriptTag:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, {
    status: 204,
  });

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
