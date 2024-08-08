import axios from "axios";

export async function getAccessToken(code: string) {
  try {
    const response = await axios.post("https://api.cafe24.com/oauth/token", {
      grant_type: "authorization_code",
      code: code,
      client_id: process.env.NEXT_PUBLIC_CAFE24_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CAFE24_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_CAFE24_REDIRECT_URI,
    });

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
        src: `${process.env.NEXT_PUBLIC_APP_URL}/api/script?shop=${mallId}`,
        display_location: ["all"],
        // skin_code: [3, 4],
        integrity: "sha384-xxxx",
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
