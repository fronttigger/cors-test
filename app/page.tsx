import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const authUrl = `https://medicals709.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=2QWZnmrfYiZSL70c9jfMzL&state=app_install&redirect_uri=https://cors-test-opal.vercel.app/auth&scope=mall.read_product,mall.write_product`;

    window.location.href = authUrl;
  }, []);

  return (
    <main>
      <h1>카페24 앱 플러그인</h1>
    </main>
  );
}
