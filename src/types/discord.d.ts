export interface UserInformation {
    id: string;
    username: string;
    avatar: string | null;
    banner: string | null;
    banner_color: string | null;
}

export interface DiscordServer {
    name: string;
    id: string;
    type: "customer" | "community" | "cheats" | "other"
}
export interface DiscordServerMap {
    [key: string]: DiscordServer;
}