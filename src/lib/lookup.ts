import { discordServers } from "@/config";

export default class Lookup {
    private static userCache: Map<string, string> = new Map<string, string>();
    private static userCacheTimeout: number = 1000 * 60 * 5; // 5 minutes

    private static async handleServersData(servers: any): Promise<{ id: string; name: string; type: string }[]> {
        if (!servers || !Array.isArray(servers)) {
            return [];
        }
        const serverList: { id: string; name: string; type: string }[] = [];
    
        for (const server of servers) {
            const match = server.match(/^(\d+):(.+)$/);
            if (!match) continue;
    
            const [_, serverId, serverName] = match;
    
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
        // const response = await fetch(`${process.env.API_BASE_URL}/lookup?id=${discordId}`, {
        //     method: 'GET',
        //     headers: {
        //         'authorization': process.env.API_KEY || "",
        //     }
        // })
        const response = await fetch(`${process.env.API_BASE_URL}/lookup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': process.env.API_KEY || "",
            },
            body: JSON.stringify({
                type: "cheater",
                searchType: "single",
                id: discordId
            })
        });
        console.log("fetchPlayerFromId")
        console.log(response)

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
}
