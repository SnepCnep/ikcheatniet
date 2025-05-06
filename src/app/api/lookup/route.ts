import { NextRequest, NextResponse } from 'next/server';
import { isReqeustAuth } from '@/lib/utils';

import lookup from '@/lib/lookup';
import discord from '@/lib/discord';
import rateLimit from "@/lib/rateLimit"

function isValidDiscordId(discordId: string): boolean {
    const isValidFormat = /^\d+$/.test(discordId);
    const isValidLength = [17, 18, 19].includes(discordId.length);
    return isValidFormat && isValidLength;
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

    if (!rateLimit(req)) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
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
