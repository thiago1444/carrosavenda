// app/api/instagram/info/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ig = searchParams.get('username_or_id_or_url');

  if (!ig) {
    return NextResponse.json({ error: 'Missing Instagram username or ID' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${ig}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY as string, // Segura a chave da API no .env
          'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Instagram data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
