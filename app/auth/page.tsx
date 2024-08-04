'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { GetAccessTokenOutput } from 'cafe24api-client'
import { useAccessToken } from '../store'

function AuthComponent() {
  const params = useSearchParams()
  const { accessToken, setAccessToken } = useAccessToken()
  const [error, setError] = useState<string | null>(null)

  const getAccessToken = async (code: string) => {
    try {
      const response = await fetch('/api/token', {
        method: 'POST',
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error('Failed to get access token')
      }

      const data = (await response.json()) as GetAccessTokenOutput
      const accessToken = data.access_token

      setAccessToken(accessToken)

      const response2 = await fetch('/api/scripttags', {
        method: 'POST',
        body: JSON.stringify({ accessToken }),
      })

      console.log('response2', response2)

      if (!response2.ok) {
        throw new Error('Failed to scripttags')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  useEffect(() => {
    const code = params.get('code')

    if (typeof code === 'string') {
      getAccessToken(code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
