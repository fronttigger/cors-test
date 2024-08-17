import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const cafe24ApiVersion = req.headers.get("X-Cafe24-Api-Version");

    const response = await axios.get(
      "https://medicals709.cafe24api.com/api/v2/admin/scripttags",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "05EHR6ahJ9tjcEprFm23ED",
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
