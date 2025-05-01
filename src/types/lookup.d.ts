export interface DiscordServer {
    name: string;
    id: string;
    type: "customer" | "community" | "cheats" | "other"
}
export interface DiscordServerMap {
    [key: string]: DiscordServer;
}