import axios from "axios";

export async function getAccessToken(code: string, mallId: string) {
  try {
    const response = await axios.post(
      `https://${mallId}.cafe24api.com/api/v2/oauth/token`,
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://cors-test-opal.vercel.app/auth",
      },
      {
        headers: {
          Authorization: `Basic ${window.btoa(
            `2QWZnmrfYiZSL70c9jfMzL:6ESfbSGfGkhh2fmkx34NkS`
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("OAuth 토큰 획득 실패:", error);
    throw error;
  }
}

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
