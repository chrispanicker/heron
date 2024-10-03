import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('Revalidation request received')  
//   const secret = request.nextUrl.searchParams.get('secret')
  const secret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET || 'webhooktest'
  console.log('Expected secret:', secret);
  console.log('Received secret:', secret);

  if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_SECRET) {
    console.log('Invalid secret provided')
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }
  
  const path = request.nextUrl.searchParams.get('path') || '/'
  console.log(`Revalidating path: ${path}`)
//   testing
  try {
    revalidatePath(path)
    console.log('Revalidation successful')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error('Revalidation failed:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}