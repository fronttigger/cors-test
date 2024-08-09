"use client";

import { GetAccessTokenOutput } from "cafe24api-client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { adminClient } from "../lib/cafe24Api";
import axios from "axios";

export default function Cafe24Integration() {
  const params = useSearchParams();
  const [accessToken, setAccessToken] = useState<string>("");

  const addScriptTag = async (token: string) => {
    try {
      const response = await fetch("/api/scripttags", {
        method: "POST",
        body: JSON.stringify({
          scriptTag: {
            src: `${process.env.NEXT_PUBLIC_APP_URL}/api/script?shop=medicals709`,
            display_location: "all",
          },
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Cafe24-Api-Version": "2024-06-01",
        },
      });

      const data = await response.json();

      return data;
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

      setAccessToken(data.access_token);
      adminClient.setAccessToken(data.access_token);

      return data.access_token;
    } catch (error) {
      console.error("인증 처리 중 에러:", error);
    }
  };

  useEffect(() => {
    const code = params.get("code");

    if (code) {
      getToken(code).then((token) =>
        addScriptTag(token || "").then((data) => console.log(data))
      );
    }
  }, [params]);

  return (
    <div>
      <span>토큰: {accessToken}</span>
    </div>
  );
}
