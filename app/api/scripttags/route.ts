import { NextRequest, NextResponse } from 'next/server'
import { Cafe24AdminAPIClient } from 'cafe24api-client'
import Auth from 'cafe24api-client/admin/endpoints/auth'

import Scripttags from 'cafe24api-client/admin/endpoints/scripttags'

const client = new Cafe24AdminAPIClient({
  mallId: 'medicals709',
})

Cafe24AdminAPIClient.use(Auth)
Cafe24AdminAPIClient.use(Scripttags)

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json()
    client.setAccessToken(accessToken)

    client.createAScriptTag({
      src: 'https://cors-test-opal.vercel.app/sample-script.js',
      shop_no: 1,
      skin_no: [3, 4],
      display_location: 'all',
      integrity:
        'sha384-NPHQoqJqlJ/LJucYZFhNBNU1q4Isc0uMDBbIwRZSJcee6K6McWYABxqbX14hsWS+',
    })

    return NextResponse.json({
      status: 200,
    })
  } catch (error) {
    console.error('Error getting access token:', error)

    return NextResponse.json(
      { error: 'Failed to get access token' },
      { status: 500 }
    )
  }
}
