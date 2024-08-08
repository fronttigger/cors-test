import axios from "axios";

import { Cafe24AdminAPIClient } from "cafe24api-client";
import Auth from "cafe24api-client/admin/endpoints/auth";
import Scripttags from "cafe24api-client/admin/endpoints/scripttags";

export const adminClient = new Cafe24AdminAPIClient({
  mallId: "medicals709",
});

Cafe24AdminAPIClient.use(Auth);
Cafe24AdminAPIClient.use(Scripttags);

export async function addScriptTag(accessToken: string, mallId: string) {
  try {
    const response = await axios.post(
      `https://${mallId}.cafe24api.com/api/v2/admin/scripttags`,
      {
        client_id: "2QWZnmrfYiZSL70c9jfMzL",
        src: `https://cors-test-opal.vercel.app//sample-script.js`,
        display_location: ["all"],
        // skin_code: [3, 4],
        integrity:
          "sha384-LenAMWRJufmjmcvzxQVpaKY01J6tFKejnQVKQBkksNzvAZodIt7MFZI32RUHSkoS",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("ScriptTag 추가 실패:", error);

    throw error;
  }
}
