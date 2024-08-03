import { NextRequest, NextResponse } from 'next/server'
import { client } from '../token/route'

export async function POST(req: NextRequest) {
  try {
    client.createAScriptTag({
      src: 'https://cors-test-opal.vercel.app/sample-script.js',
      shop_no: 1,
      skin_no: [3, 4],
      display_location: 'all',
      integrity:
        'sha384-UttGu98Tj02YSyWJ5yU0dHmx4wisywedBShWqEz+TL3vFOCXdeMWmo6jMVR8IdFo',
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
