import { discordServers } from "@/config";

import { LookupStats } from "@/types/lookup";

export default class Lookup {
    private static userCache: Map<string, string> = new Map<string, string>();
    private static userCacheTimeout: number = 1000 * 60 * 10; // 10 minutes

    private static databaseStatsCache: Map<string, LookupStats> = new Map<string, LookupStats>();
    private static databaseStatsCacheTimeout: number = 1000 * 60 * 60; // 60 minutes

    private static async handleServersData(servers: string): Promise<{ id: string; name: string; type: string }[]> {
        if (!servers || !Array.isArray(servers)) {
            return [];
        }
        const serverList: { id: string; name: string; type: string }[] = [];

        for (const server of servers) {
            const match = server.match(/^(\d+):(.+)$/);
            if (!match) continue;

            const [, serverId, serverName] = match;

            if (discordServers[serverId]) {
                serverList.push({
                    id: serverId,
                    name: discordServers[serverId].name,
                    type: discordServers[serverId].type,
                });
            } else {
                serverList.push({
                    id: serverId,
                    name: serverName,
                    type: "other",
                });
            }
        }
        return serverList;
    }

    private static async fetchPlayerFromId(discordId: string) {
        const apiKey = ((process.env.NODE_ENV === 'development') ? process.env.DEV_API_KEY : process.env.API_KEY );
        const response = await fetch(`${process.env.API_BASE_URL}/lookup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': (apiKey || ''),
            },
            body: JSON.stringify({
                type: "cheater",
                searchType: "single",
                id: discordId
            })
        });

        if (!response.ok) {
            return []
        }
        const data = await response.json();
        if (!data || !data.entries) {
            return []
        }

        return data.entries
    }

    public static async getServersFromUserId(discordId: string) {
        const cachedUser = this.userCache.get(discordId);
        if (cachedUser) {
            return this.handleServersData(cachedUser);
        }

        const entries = await this.fetchPlayerFromId(discordId);
        if (!entries) {
            return [];
        }

        const servers = await this.handleServersData(entries);
        this.userCache.set(discordId, entries);

        setTimeout(() => {
            this.userCache.delete(discordId);
        }, this.userCacheTimeout);

        return servers;
    }

    private static async fetchDatabaseStats() {
        const response = await fetch(`${process.env.API_BASE_URL}/stats`)
        if (!response.ok) {
            return {}
        }
        const data = await response.json()
        if (!data) {
            return {}
        }
        return data
    }
    public static async getDatabaseStats() {
        if (this.databaseStatsCache.has("stats")) {
            return this.databaseStatsCache.get("stats")
        }
        const stats = await this.fetchDatabaseStats()
        if (!stats) {
            return {}
        }

        this.databaseStatsCache.set("stats", stats)
        setTimeout(() => {
            this.databaseStatsCache.delete("stats")
        }, this.databaseStatsCacheTimeout)

        return stats as LookupStats
    }
}
