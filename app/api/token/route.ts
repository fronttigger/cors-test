import { NextRequest, NextResponse } from 'next/server'
import { Cafe24AdminAPIClient, Cafe24FrontAPIClient } from 'cafe24api-client'
import Auth from 'cafe24api-client/admin/endpoints/auth'
import Scripttags from 'cafe24api-client/admin/endpoints/scripttags'
import Products from 'cafe24api-client/front/endpoints/products'

const adminClient = new Cafe24AdminAPIClient({
  mallId: 'medicals709',
})
const client = new Cafe24FrontAPIClient({
  mallId: 'medicals709',
  clientId: '2QWZnmrfYiZSL70c9jfMzL',
})

Cafe24FrontAPIClient.use(Products)
Cafe24AdminAPIClient.use(Auth)
Cafe24AdminAPIClient.use(Scripttags)

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 })
    }

    const tokenResponse = await adminClient.getAccessToken({
      code,
      client_id: '2QWZnmrfYiZSL70c9jfMzL',
      client_secret: '6ESfbSGfGkhh2fmkx34NkS',
      redirect_uri: 'https://cors-test-opal.vercel.app/auth',
    })

    adminClient.setAccessToken(tokenResponse.data.access_token)
    const response = await client.retrieveACountOfProducts({})

    console.log('client front api:', response)

    return NextResponse.json(tokenResponse.data)
  } catch (error) {
    console.error('Error getting access token:', error)

    return NextResponse.json(
      { error: 'Failed to get access token' },
      { status: 500 }
    )
  }
}
