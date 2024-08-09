"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function App() {
  const params = useSearchParams();

  useEffect(() => {
    const mallId = params.get("mall_id");

    if (!mallId) {
      return;
    }

    const authUrl = `https://${mallId}.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=2QWZnmrfYiZSL70c9jfMzL&state=app_install&redirect_uri=https://cors-test-opal.vercel.app/auth&scope=mall.read_product,mall.write_product,mall.read_application,mall.write_application`;
    window.location.href = authUrl;
  }, [params]);

  return (
    <main>
      <h1>카페24 앱 플러그인</h1>
    </main>
  );
}

export default App;
