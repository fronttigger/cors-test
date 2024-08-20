import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { adminClient } from '@/app/lib/cafe24Api'
import { cookies } from 'next/headers'

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  path: '/',
}

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://medicals709.cafe24.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Cafe24-Api-Version',
  'Access-Control-Allow-Credentials': 'true',
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const cookieStore = cookies()
    let accessToken = cookieStore.get('access_token')?.value
    const refreshToken = cookieStore.get('refresh_token')?.value
    const contentType = req.headers.get('Content-Type')
    const apiVersion = req.headers.get('X-Cafe24-Api-Version')

    const tokenResponse = await axios.get(
      'https://cors-test-opal.vercel.app/api/token',
      {
        headers: {
          'Content-Type': contentType,
          Authorization: `Bearer ${accessToken}`,
          'X-Cafe24-Api-Version': apiVersion,
        },
        withCredentials: true,
      }
    )

    console.log('tokenResponse.data', tokenResponse.data)

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

        cookieStore.set('access_token', access_token, {
          ...cookieOptions,
          maxAge: 6600, // 1시간 50분 (6600초) 동안 유효
        })
        cookieStore.set('refresh_token', refresh_token, {
          ...cookieOptions,
          maxAge: 14 * 24 * 60 * 60, // 2주 동안 유효
        })
      } catch (error) {
        console.error('Failed to refresh access token:', error)
        return NextResponse.redirect('/login')
      }
    }

    const response = await axios.post(
      'https://medicals709.cafe24api.com/api/v2/admin/scripttags',
      data,
      {
        headers: {
          'Content-Type': contentType,
          Authorization: `Bearer ${accessToken}`,
          'X-Cafe24-Api-Version': apiVersion,
        },
        withCredentials: true,
      }
    )

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error to add ScriptTag:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await req.json()

    console.log('data', data)
    const cookieStore = cookies()
    let accessToken = cookieStore.get('access_token')?.value
    const refreshToken = cookieStore.get('refresh_token')?.value
    const contentType = req.headers.get('Content-Type')
    const apiVersion = req.headers.get('X-Cafe24-Api-Version')

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

        cookieStore.set('access_token', access_token, {
          ...cookieOptions,
          maxAge: 6600, // 1시간 50분 (6600초) 동안 유효
        })
        cookieStore.set('refresh_token', refresh_token, {
          ...cookieOptions,
          maxAge: 14 * 24 * 60 * 60, // 2주 동안 유효
        })
      } catch (error) {
        console.error('Failed to refresh access token:', error)
        return NextResponse.redirect('/login')
      }
    }

    const response = await axios.get(
      'https://medicals709.cafe24api.com/api/v2/admin/scripttags/count',
      {
        headers: {
          'Content-Type': contentType,
          Authorization: `Bearer ${accessToken}`,
          'X-Cafe24-Api-Version': apiVersion,
        },
        withCredentials: true,
      }
    )

    const nextResponse = NextResponse.json(response.data, {
      status: 200,
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
