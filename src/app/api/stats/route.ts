import { NextRequest, NextResponse } from 'next/server';
import { isReqeustAuth } from '@/lib/utils';

import lookup from '@/lib/lookup';

export async function GET(req: NextRequest) {
    const stats = await lookup.getDatabaseStats()
    if (!stats) {
        return NextResponse.json({ error: 'Stats not found' }, { status: 404 });
    }

    if (!isReqeustAuth(req)) {
        return NextResponse.json({ error: 'Invalid auth' }, { status: 403 });
    }

    return NextResponse.json(stats, { status: 200 });
}
