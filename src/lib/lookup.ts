import { DiscordServer } from "@/types/lookup";
import { maxDataAge, discordServers } from "@/config";

export default class Lookup {
    private static data: any = {};
    private static dataStats: any = {};
    private static lastFetch = Date.now();
  
    public static async fetchData(): Promise<void> {
      try {
        const response = await fetch(`${process.env.API_BASE_URL || ""}/all-lookup`, {
          method: 'GET',
          headers: {
            'Authorization': process.env.API_KEY || "",
          },
        });
  
        if (!response.ok) {
          console.error("Failed to fetch data:", response.status, response.statusText);
          return;
        }
        const jsonData = await response.json();

        this.data = jsonData;
        this.lastFetch = Date.now();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    public static getDataStats() {

    }



    // Server Handler
    public static async getServerFromId(id: string): Promise<DiscordServer | false> {
      return discordServers[id] || { name: "Unknown", id, type: "unknown" };
    }
  
    public static async getUserFromId(id: string): Promise<any | false> {
      if (Date.now() - Lookup.lastFetch > (maxDataAge || 12 * 60 * 60 * 1000)) {
        await Lookup.fetchData();
      }
  
      return Lookup.data[id] || false;
    }
}
  