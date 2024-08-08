"use client";

import { GetAccessTokenOutput } from "cafe24api-client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Cafe24Integration() {
  const params = useSearchParams();
  const [accessToken, setAccessToken] = useState<string>("");

  const addScriptTag = async () => {
    try {
      const response = await fetch("/api/scripttags", {
        method: "POST",
        body: JSON.stringify({ accessToken }),
      });
      const result = await response.json();

      console.log("ScriptTag 추가 결과:", result);
    } catch (error) {
      console.error("ScriptTag 추가 중 에러:", error);
    }
  };

  const getToken = async (code: string) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Failed to get access token");
      }

      const data = (await response.json()) as GetAccessTokenOutput;
      const accessToken = data.access_token;

      setAccessToken(accessToken);
    } catch (error) {
      console.error("인증 처리 중 에러:", error);
    }
  };

  useEffect(() => {
    const code = params.get("code");

    if (code) {
      getToken(code);
    }
  }, [params]);

  return (
    <div>
      <span>토큰: {accessToken}</span>
      <button onClick={addScriptTag}>ScriptTag 추가</button>
    </div>
  );
}
