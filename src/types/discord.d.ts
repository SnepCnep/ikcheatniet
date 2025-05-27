export interface UserInformation {
    id: string;
    username: string;
    avatar: string | null;
    banner: string | null;
    banner_color: string | null;
}

export interface DiscordServer {
    name: string;
    type: "customer" | "community" | "cheats" | "reseller" | "spoofer" | "other"
}
export interface DiscordServerMap {
    [key: string]: DiscordServer;
}
