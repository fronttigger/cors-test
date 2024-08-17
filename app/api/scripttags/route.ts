import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const contentType = req.headers.get("Content-Type");
    const authorization = req.headers.get("Authorization");
    const apiVersion = req.headers.get("X-Cafe24-Api-Version");

    console.log("post", authorization);

    const response = await axios.post(
      "https://medicals709.cafe24api.com/api/v2/admin/scripttags",
      data,
      {
        headers: {
          "Content-Type": contentType,
          Authorization: authorization,
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
  const contentType = req.headers.get("Content-Type");
  const authorization = req.headers.get("Authorization");
  const apiVersion = req.headers.get("X-Cafe24-Api-Version");

  try {
    const response = await axios.get(
      "https://medicals709.cafe24api.com/api/v2/admin/scripttags/count",
      {
        headers: {
          "Content-Type": contentType,
          Authorization: authorization,
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
