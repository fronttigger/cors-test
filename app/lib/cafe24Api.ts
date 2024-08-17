import axios from "axios";

import { Cafe24AdminAPIClient } from "cafe24api-client";
import Auth from "cafe24api-client/admin/endpoints/auth";
import Scripttags from "cafe24api-client/admin/endpoints/scripttags";
import Autodisplay from "cafe24api-client/admin/endpoints/autodisplay";

export const adminClient = new Cafe24AdminAPIClient({
  mallId: "medicals709",
});

Cafe24AdminAPIClient.use(Auth);
Cafe24AdminAPIClient.use(Scripttags);
Cafe24AdminAPIClient.use(Autodisplay);

export async function addScriptTag(accessToken: string, mallId: string) {
  try {
    const response = await axios.post(
      `https://${mallId}.cafe24api.com/api/v2/admin/scripttags`,
      {
        src: `https://cors-test-opal.vercel.app//sample-script.js`,
        display_location: ["all"],
        // skin_code: [3, 4],
        integrity:
          "sha384-vEazbUWAEPBDqwaocPEyHMVV65yuy+RXzVYb6nQ0Mzb1Pdo9E8HaIktc9EsdfqJV",
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
