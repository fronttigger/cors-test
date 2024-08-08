import axios from "axios";

export async function getAccessToken(code: string, mallId: string) {
  try {
    const response = await axios.post(
      `https://${mallId}.cafe24api.com/api/v2/oauth/token`,
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_CAFE24_REDIRECT_URI,
      },
      {
        headers: {
          Authorization: `Basic ${window.btoa(
            `${process.env.NEXT_PUBLIC_CAFE24_CLIENT_ID}:${process.env.NEXT_PUBLIC_CAFE24_CLIENT_SECRET}`
          )}`,
          "Content-Type": "x-www-form-urlencoded",
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
        client_id: process.env.NEXT_PUBLIC_CAFE24_CLIENT_ID,
        src: `${process.env.NEXT_PUBLIC_APP_URL}/sample-script.js`,
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
