'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

function App() {
  const params = useSearchParams()

  useEffect(() => {
    const mallId = params.get('mall_id')

    if (!mallId) {
      return
    }

    const authUrl = `https://${mallId}.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=2QWZnmrfYiZSL70c9jfMzL&state=app_install&redirect_uri=https://app-test-zeta.vercel.app/auth&scope=mall.read_product,mall.write_product`
    window.location.href = authUrl
  }, [params])

  return (
    <p>
      앱실행 완료
      <a id='token-url'>API 자격증명 얻기</a>
    </p>
  )
}

export default App
