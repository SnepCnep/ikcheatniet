import { UserInformation } from "@/types/discord";

export default class DiscordUserService {
    private static userCache: Map<string, UserInformation> = new Map();
    private static userDoesNotExistCache: Map<string, boolean> = new Map();
    private static userCacheTimeout: number = 1000 * 60 * 25; // 25 minuten

    private static async fetchUserFromId(discordId: string): Promise<UserInformation | null> {
        try {
            const response = await fetch(`https://discord.com/api/v9/users/${discordId}`, {
                headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`,
                }
            });

            if (!response.ok) {
                return null;
            }

            const data = await response.json();
            if (!data?.id) {
                return null;
            }

            return data as UserInformation;
        } catch (error) {
            return null;
        }
    }

    public static async getUserFromId(discordId: string): Promise<UserInformation | null> {
        if (this.userDoesNotExistCache.get(discordId)) {
            return null;
        }
    
        const cachedUser = this.userCache.get(discordId);
        if (cachedUser) {
            return cachedUser;
        }

        const user = await this.fetchUserFromId(discordId);
        if (!user) {
            this.userDoesNotExistCache.set(discordId, true);
            return null;
        }

        this.userCache.set(discordId, user);

        setTimeout(() => {
            this.userCache.delete(discordId);
        }, this.userCacheTimeout);

        return user;
    }
}