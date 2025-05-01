import { NextRequest, NextResponse } from 'next/server';

import lookup from '@/lib/lookup';

// function isReqeustAuth(req: NextRequest): boolean {
//     const referer = req.headers.get('referer') || req.headers.get('origin');
//     const origin = req.credentials === 'same-origin'

//     if (!referer || !origin) {
//         return false
//     }

//     return true
// }


export async function GET(req: NextRequest) {
    const stats = await lookup.getDatabaseStats()
    if (!stats) {
        return NextResponse.json({ error: 'Stats not found' }, { status: 404 });
    }

    // if (!isReqeustAuth(req)) {
    //     return NextResponse.json({ error: 'Invalid auth' }, { status: 403 });
    // }

    return NextResponse.json(stats, { status: 200 });
}
