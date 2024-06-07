import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Secret token to validate the request (optional)
  const secret = process.env.SANITY_WEBHOOK_SECRET;

  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  // Optionally validate the secret token
  const webhookSecret = req.headers.get('x-sanity-hook-secret');
  if (secret && webhookSecret !== secret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const paths = ['/']; // Add paths to revalidate as needed
    await Promise.all(paths.map(path => revalidatePath(path)));
    return NextResponse.json({ message: 'Revalidation successful' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}

// Utility function to revalidate paths
async function revalidatePath(path: string) {
  // Fetch Vercel's revalidation API to revalidate the path
  const res = await fetch(`https://${process.env.VERCEL_URL}/api/revalidate?path=${path}`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error(`Failed to revalidate path: ${path}`);
  }
}