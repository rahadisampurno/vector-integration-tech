import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async ({ params }) => {
  const { filename } = params;

  if (!filename) {
    return new Response('Filename is required', { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'uploads', 'licenses', filename);

    if (!fs.existsSync(filePath)) {
      return new Response('File not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error downloading license:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
