'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function AuthComponent() {
  const params = useSearchParams()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getAccessToken = async (code: string) => {
    try {
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error('Failed to get access token')
      }

      const data = await response.json()
      setAccessToken(data.access_token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  useEffect(() => {
    const code = params.get('code')

    if (typeof code === 'string') {
      getAccessToken(code)
    }
  }, [params])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      {accessToken ? (
        <div>Access Token received: {accessToken}</div>
      ) : (
        <div>Getting access token...</div>
      )}
    </div>
  )
}

export default AuthComponent
