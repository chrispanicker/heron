import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.SANITY_WEBHOOK_SECRET) {
    return new Response('Invalid credentials', {
      status: 500,
    });
  }
  revalidatePath('/');
  return new Response(
    JSON.stringify({
      revalidated: true,
      now: Date.now(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}