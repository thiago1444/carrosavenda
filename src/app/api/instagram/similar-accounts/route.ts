// app/api/instagram/similar-accounts/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ig = searchParams.get('username_or_id_or_url');

  if (!ig) {
    return NextResponse.json({ error: 'Missing Instagram username or ID' }, { status: 400 });
  }

  try {
    // Faz a requisição para a API de contas similares
    const response = await fetch(
      `https://instagram-scraper-api2.p.rapidapi.com/v1/similar_accounts?username_or_id_or_url=${ig}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '68402ccc73mshfe6d856484311bdp14dcfbjsn0c2b36d8a1eb',
          'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        },
      }
    );

    console.log(response);


    if (!response.ok) {
      throw new Error('Failed to fetch similar accounts data');
    }

    const data = await response.json();
    console.log(data);

    // Para cada conta, transformamos a imagem em base64
    const accountsWithBase64 = await Promise.all(
      data.data.items.map(async (item: any) => {
        try {
          const imageResponse = await fetch(item.profile_pic_url);
          const imageBuffer = await imageResponse.arrayBuffer();
          const base64Image = Buffer.from(imageBuffer).toString('base64');
          return {
            ...item,
            profile_pic_base64: `data:image/jpeg;base64,${base64Image}`, // Adicionando a imagem em base64
          };
        } catch (err) {
          console.error(`Failed to convert image for user ${item.username}`, err);
          return {
            ...item,
            profile_pic_base64: null, // Em caso de erro, retorna null para a imagem
          };
        }
      })
    );

    // Retornando os dados atualizados com a imagem base64
    return NextResponse.json({
      count: data.data.count,
      items: accountsWithBase64,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
