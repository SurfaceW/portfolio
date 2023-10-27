import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const sk = searchParams.get('sk');

  if (!sk || sk !== process.env['IMAGE_UPLOAD_SK']) {
    return NextResponse.json(new Error('invalid sk'), { status: 403 });
  }

  if (!filename) {
    return NextResponse.json(new Error('filename is required'), { status: 400 });
  }

  const blob = await put(filename, request.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
