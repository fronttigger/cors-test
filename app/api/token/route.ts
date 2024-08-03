import { NextRequest, NextResponse } from 'next/server'
import { Cafe24AdminAPIClient } from 'cafe24api-client'
import Auth from 'cafe24api-client/admin/endpoints/auth'

const client = new Cafe24AdminAPIClient({
  mallId: 'medicals709',
})

Cafe24AdminAPIClient.use(Auth)

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 })
    }

    const tokenResponse = await client.getAccessToken({
      code,
      client_id: '2QWZnmrfYiZSL70c9jfMzL',
      client_secret: '6ESfbSGfGkhh2fmkx34NkS',
      redirect_uri: 'https://app-test-zeta.vercel.app/auth',
    })

    client.setAccessToken(tokenResponse.data.access_token)

    return NextResponse.json({ access_token: tokenResponse.data.access_token })
  } catch (error) {
    console.error('Error getting access token:', error)
    return NextResponse.json(
      { error: 'Failed to get access token' },
      { status: 500 }
    )
  }
}
