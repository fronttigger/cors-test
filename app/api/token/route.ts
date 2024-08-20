import { NextRequest, NextResponse } from 'next/server'

import { adminClient } from '@/app/lib/cafe24Api'
import { cookies } from 'next/headers'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://medicals709.cafe24.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Cafe24-Api-Version',
  'Access-Control-Allow-Credentials': 'true',
}

export async function GET() {
  try {
    const cookieStore = cookies()
    let accessToken = cookieStore.get('access_token')?.value
    const refreshToken = cookieStore.get('refresh_token')?.value

    console.log('token api response', { accessToken, refreshToken })

    if (!accessToken && refreshToken) {
      try {
        const tokenResponse = await adminClient.getAccessTokenUsingRefreshToken(
          {
            refresh_token: refreshToken,
            client_id: '2QWZnmrfYiZSL70c9jfMzL',
            client_secret: '6ESfbSGfGkhh2fmkx34NkS',
          }
        )

        const { access_token, refresh_token } = tokenResponse.data

        accessToken = access_token
        adminClient.setAccessToken(access_token)

        return NextResponse.json({ access_token, refresh_token })
      } catch (error) {
        console.error('Failed to refresh access token:', error)
        return NextResponse.redirect('/login')
      }
    }

    const nextResponse = NextResponse.json({
      access_token: accessToken,
      refresh_token: refreshToken,
    })

    Object.entries(corsHeaders).forEach(([key, value]) => {
      nextResponse.headers.set(key, value)
    })

    return nextResponse
  } catch (error) {
    console.error('Error to add ScriptTag:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, {
    status: 204,
  })

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}
