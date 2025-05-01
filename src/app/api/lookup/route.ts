import { NextRequest, NextResponse } from 'next/server';

import lookup from '@/lib/lookup';
import discord from '@/lib/discord';

function isValidDiscordId(discordId: string): boolean {
    const isValidFormat = /^\d+$/.test(discordId);
    const isValidLength = [17, 18, 19].includes(discordId.length);
    return isValidFormat && isValidLength;
}

function isReqeustAuth(req: NextRequest): boolean {
    const referer = req.headers.get('referer') || req.headers.get('origin');
    const origin = req.credentials === 'same-origin'

    if (!referer || !origin) {
        return false
    }

    return true
}


export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const discordId = searchParams.get('id')
    if (!discordId) {
        return NextResponse.json({ error: 'Missing discordId' }, { status: 400 });
    }

    if (!isValidDiscordId(discordId)) {
        return NextResponse.json({ error: 'Invalid discordId' }, { status: 400 });
    }

    if (!isReqeustAuth(req)) {
        return NextResponse.json({ error: 'Invalid auth' }, { status: 403 });
    }

    const user = await discord.getUserFromId(discordId)
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    let servers = await lookup.getServersFromUserId(discordId)
    if (!servers) {
        servers = []
    }

    const responseModel = {
        discordId: user.id,
        username: user.username,
        avatar: user.avatar,
        banner: user.banner,
        banner_color: user.banner_color,
        blacklistedservers: servers.map((server) => ({
            id: server.id,
            name: server.name,
            type: server.type,
        })),
    }


    return NextResponse.json(responseModel, { status: 200 });
}