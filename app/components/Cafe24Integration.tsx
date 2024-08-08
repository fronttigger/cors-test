"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Cafe24Integration() {
  const params = useSearchParams();
  const [accessToken, setAccessToken] = useState<string>("");
  const [mallId, setMallId] = useState<string>("");

  useEffect(() => {
    const code = params.get("code");

    if (code) {
      fetch(`/api/auth?code=${code}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.accessToken) {
            setAccessToken(data.accessToken);
            setMallId("medicals709");
          }
        })
        .catch((error) => console.error("인증 처리 중 에러:", error));
    }
  }, [params]);

  const addScriptTag = async () => {
    if (accessToken && mallId) {
      try {
        const response = await fetch("/api/scripttags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, mallId }),
        });
        const result = await response.json();

        console.log("ScriptTag 추가 결과:", result);
      } catch (error) {
        console.error("ScriptTag 추가 중 에러:", error);
      }
    }
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <p>인증 완료</p>
          <button onClick={addScriptTag}>ScriptTag 추가</button>
        </div>
      ) : (
        <p>인증이 필요합니다</p>
      )}
    </div>
  );
}
