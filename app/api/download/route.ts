import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    const name = searchParams.get('name');

    if (!url || !name) {
        return NextResponse.json({ error: 'Missing url or name' }, { status: 400 });
    }

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
        });

        const headers = new Headers();
        headers.set('Content-Disposition', `attachment; filename="${name}"`);
        headers.set('Content-Type', response.headers['content-type']);

        return new NextResponse(response.data, { headers });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
    }
}