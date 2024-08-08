import { NextResponse } from "next/server";
import { adminClient } from "../../lib/cafe24Api";

export async function POST() {
  try {
    const response = await adminClient.createAScriptTag({
      src: "https://cors-test-opal.vercel.app/sample-script.js",
      display_location: ["all"],
      skin_no: 1,
      shop_no: [3, 4],
      integrity:
        "sha384-LenAMWRJufmjmcvzxQVpaKY01J6tFKejnQVKQBkksNzvAZodIt7MFZI32RUHSkoS",
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error to add ScriptTag:", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
